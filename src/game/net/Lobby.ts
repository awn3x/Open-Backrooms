// Server browser: hosts announce their rooms every 15 s as short-lived signed Nostr events;
// browsers collect the ones heard in the last 45 s. Nothing is stored anywhere.

import { nostr, type NEvent } from './Nostr';
import { censor, sanitize } from '../ui/profanity';
import type { Region } from './Net';

export const LOBBY_KIND = 21492; // ephemeral range: relays forward, never store
const TAG = 'open-backrooms-lobby-v1';
const REGIONS = ['NA', 'SA', 'EU', 'AF', 'AS', 'OC'];

export type GameMode = 'escape' | 'endless';

export interface Listing {
  id: string; // room id to join
  name: string;
  region: Region;
  mode: GameMode;
  level: number;
  players: number;
  max: number;
  locked: boolean;
  host: string; // announcing pubkey
  seen: number; // ms timestamp of last announcement
}

/** Room ids: `public:EU:3` for region worlds, `room:<name>~<host key prefix>` for hosted rooms. */
export const hostTag = (pubkey: string) => pubkey.slice(0, 16);
export const roomIdFor = (name: string, pubkey: string) => `room:${name}~${hostTag(pubkey)}`;
export function parseRoom(id: string): { name: string; host: string } | null {
  const m = /^room:([a-z0-9_-]{1,32})~([0-9a-f]{16})$/.exec(id);
  return m ? { name: m[1], host: m[2] } : null;
}

function validate(e: NEvent): Listing | null {
  let d: Record<string, unknown>;
  try {
    d = JSON.parse(e.content);
  } catch {
    return null;
  }
  const id = String(d.id ?? '');
  const pub = /^public:(NA|SA|EU|AF|AS|OC):([1-9]|1[0-2])$/.test(id);
  const room = parseRoom(id);
  if (!pub && !room) return null;
  // a hosted room can only be announced by its own host key
  if (room && room.host !== hostTag(e.pubkey)) return null;
  const region = String(d.region);
  if (!REGIONS.includes(region)) return null;
  if (Math.abs(e.created_at * 1000 - Date.now()) > 120000) return null;
  const players = Math.max(1, Math.min(8, Math.floor(Number(d.players) || 1)));
  return {
    id,
    name: censor(sanitize(String(d.name ?? (room?.name || id)), 32)),
    region: region as Region,
    mode: d.mode === 'endless' ? 'endless' : 'escape',
    level: Math.max(0, Math.min(2, Math.floor(Number(d.level) || 0))),
    players,
    max: 8,
    locked: !!d.locked && !pub,
    host: e.pubkey,
    seen: Date.now(),
  };
}

/** The address this copy of the game is served from (e.g. https://awn3x.github.io/Open-Backrooms/). */
export function siteUrl() {
  return location.origin + location.pathname.replace(/index\.html$/, '');
}

/** Room names as they appear in invite links: lowercase, a-z 0-9 - _ */
export const slugName = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32);

/** hosts re-announce every 15 s, so after this long listening the room list is complete */
const WARM_MS = 16000;

export class Lobby {
  listings = new Map<string, Listing>();
  onChange?: () => void;
  private unsub: (() => void) | null = null;
  private since = 0;

  browse() {
    if (this.unsub) return;
    this.since = Date.now();
    this.unsub = nostr.subscribe({ kinds: [LOBBY_KIND], '#t': [TAG], since: Math.floor(Date.now() / 1000) - 60 }, (e) => {
      const l = validate(e);
      if (!l) return;
      this.listings.set(l.id, l);
      this.onChange?.();
    });
  }

  stop() {
    this.unsub?.();
    this.unsub = null;
  }

  /** Live hosted rooms with this name, busiest first (names are unique, so normally 0 or 1). */
  byName(name: string): Listing[] {
    return this.list().filter((l) => parseRoom(l.id)?.name === name);
  }

  /** Resolves once the list has heard a full announce cycle (immediately if it already has). */
  async warm(onWait?: (secondsLeft: number) => void) {
    this.browse();
    while (Date.now() - this.since < WARM_MS) {
      onWait?.(Math.ceil((WARM_MS - (Date.now() - this.since)) / 1000));
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  /** Is `name` hosted by someone other than `pubkey`? Waits for a full announce cycle first. */
  async taken(name: string, pubkey: string, onWait?: (s: number) => void) {
    await this.warm(onWait);
    return this.byName(name).some((l) => l.host !== pubkey);
  }

  /** Find the room id for an invite name, listening up to a full announce cycle for it. */
  async resolve(name: string, onWait?: (s: number) => void): Promise<string | null> {
    this.browse();
    for (;;) {
      const hit = this.byName(name)[0];
      if (hit) return hit.id;
      if (Date.now() - this.since >= WARM_MS) return null;
      onWait?.(Math.ceil((WARM_MS - (Date.now() - this.since)) / 1000));
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  /** live listings, freshest-first */
  list(region?: Region): Listing[] {
    const now = Date.now();
    for (const [k, l] of this.listings) if (now - l.seen > 45000) this.listings.delete(k);
    return [...this.listings.values()].filter((l) => !region || l.region === region).sort((a, b) => b.players - a.players || b.seen - a.seen);
  }

  announce(l: Omit<Listing, 'host' | 'seen' | 'max'>) {
    void nostr.publish(LOBBY_KIND, JSON.stringify({ ...l, v: 1 }), [['t', TAG]]);
  }
}

export const lobby = new Lobby();
