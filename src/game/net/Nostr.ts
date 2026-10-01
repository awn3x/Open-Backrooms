// Minimal Nostr client over the same public relays Trystero signals through.
// Used for things that must reach everyone without a WebRTC mesh:
//  * the server browser (ephemeral room listings, re-announced by hosts), and
//  * the global bulletin board (stored events with a NIP-40 expiration tag).
// Every incoming event's id and Schnorr signature are verified before use.

import { schnorr } from '@noble/secp256k1';
import { defaultRelayUrls } from 'trystero/nostr';

export interface NEvent {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
  sig: string;
}
export type Filter = Record<string, unknown>;

const RELAYS = 6;
const enc = new TextEncoder();
const hex = (b: Uint8Array) => Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
const unhex = (s: string) => new Uint8Array((s.match(/../g) ?? []).map((h) => parseInt(h, 16)));
const sha256 = async (s: string) => new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s)));
const isHex = (s: unknown, n: number) => typeof s === 'string' && s.length === n && /^[0-9a-f]+$/.test(s);

/** This browser's key: stable so you can manage your own board notes, never tied to anything personal. */
function loadKey(): Uint8Array {
  try {
    const k = localStorage.getItem('ob.nkey');
    if (k && isHex(k, 64)) return unhex(k);
  } catch {
    /* private mode */
  }
  const sk = schnorr.keygen().secretKey;
  try {
    localStorage.setItem('ob.nkey', hex(sk));
  } catch {
    /* ignore */
  }
  return sk;
}

async function eventId(e: Omit<NEvent, 'id' | 'sig'>) {
  return hex(await sha256(JSON.stringify([0, e.pubkey, e.created_at, e.kind, e.tags, e.content])));
}

export async function verifyEvent(e: NEvent): Promise<boolean> {
  try {
    if (!e || !isHex(e.id, 64) || !isHex(e.pubkey, 64) || !isHex(e.sig, 128)) return false;
    if (typeof e.content !== 'string' || !Array.isArray(e.tags) || !Number.isFinite(e.created_at)) return false;
    if ((await eventId(e)) !== e.id) return false;
    return await schnorr.verifyAsync(unhex(e.sig), unhex(e.id), unhex(e.pubkey));
  } catch {
    return false;
  }
}

type Sub = { filter: Filter; on: (e: NEvent) => void; seen: Set<string> };

class Pool {
  private socks: WebSocket[] = [];
  private subs = new Map<string, Sub>();
  private sk = loadKey();
  readonly pubkey = hex(schnorr.getPublicKey(this.sk));
  private started = false;

  private start() {
    if (this.started) return;
    this.started = true;
    const urls = [...defaultRelayUrls].sort(() => Math.random() - 0.5).slice(0, RELAYS);
    for (const u of urls) this.connect(u.startsWith('wss://') ? u : `wss://${u}`);
  }

  private connect(url: string, delay = 0) {
    setTimeout(() => {
      let ws: WebSocket;
      try {
        ws = new WebSocket(url);
      } catch {
        return;
      }
      ws.onopen = () => {
        for (const [id, s] of this.subs) ws.send(JSON.stringify(['REQ', id, s.filter]));
      };
      ws.onmessage = (m) => void this.onMessage(m.data);
      ws.onclose = () => {
        this.socks = this.socks.filter((x) => x !== ws);
        if (delay < 60000) this.connect(url, Math.max(2000, delay * 2));
      };
      ws.onerror = () => ws.close();
      this.socks.push(ws);
    }, delay);
  }

  private async onMessage(raw: unknown) {
    if (typeof raw !== 'string' || raw.length > 20000) return;
    let msg: unknown;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }
    if (!Array.isArray(msg) || msg[0] !== 'EVENT') return;
    const sub = this.subs.get(String(msg[1]));
    const e = msg[2] as NEvent;
    if (!sub || !e || sub.seen.has(e.id)) return;
    sub.seen.add(e.id);
    if (sub.seen.size > 5000) sub.seen.clear();
    if (await verifyEvent(e)) sub.on(e);
  }

  subscribe(filter: Filter, on: (e: NEvent) => void): () => void {
    this.start();
    const id = 'ob' + Math.random().toString(36).slice(2, 10);
    this.subs.set(id, { filter, on, seen: new Set() });
    for (const ws of this.socks) if (ws.readyState === 1) ws.send(JSON.stringify(['REQ', id, filter]));
    return () => {
      this.subs.delete(id);
      for (const ws of this.socks) if (ws.readyState === 1) ws.send(JSON.stringify(['CLOSE', id]));
    };
  }

  async sign(text: string): Promise<string> {
    return hex(await schnorr.signAsync(await sha256(text), this.sk));
  }

  async publish(kind: number, content: string, tags: string[][]): Promise<NEvent> {
    this.start();
    const base = { pubkey: this.pubkey, created_at: Math.floor(Date.now() / 1000), kind, tags, content };
    const id = await eventId(base);
    const sig = hex(await schnorr.signAsync(unhex(id), this.sk));
    const e: NEvent = { ...base, id, sig };
    const send = () => {
      for (const ws of this.socks) if (ws.readyState === 1) ws.send(JSON.stringify(['EVENT', e]));
    };
    if (this.socks.some((w) => w.readyState === 1)) send();
    else setTimeout(send, 2500);
    return e;
  }
}

export const nostr = new Pool();

/** Sign / verify an arbitrary statement with this browser's key (host proofs, kicks). */
export async function signText(text: string): Promise<string> {
  return nostr.sign(text);
}
export async function verifyText(text: string, sig: unknown, pubkey: unknown): Promise<boolean> {
  try {
    if (!isHex(sig, 128) || !isHex(pubkey, 64)) return false;
    return await schnorr.verifyAsync(unhex(sig as string), await sha256(text), unhex(pubkey as string));
  } catch {
    return false;
  }
}
