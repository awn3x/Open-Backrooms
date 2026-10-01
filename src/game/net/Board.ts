// Global bulletin board, shared by every player through the public Nostr relays.
// Notes are signed events (NIP-78 app data) with a NIP-40 expiration, so relays drop them
// when they lapse. The board resets every 30 days; paying more BC (earned in-game only)
// keeps a note up for longer. Every field of every incoming note is re-validated here:
// expiry is recomputed from the note's own timestamp and tier, never trusted.

import { nostr, type NEvent } from './Nostr';
import { censor, sanitize } from '../ui/profanity';

export const BOARD_KIND = 30078;
const TAG = 'open-backrooms-board-v1';
const DAY = 86400000;
export const CYCLE = 30 * DAY;
const EPOCH = Date.UTC(2026, 0, 1);
const MAX_PER_AUTHOR = 3;
/** how many notes physically fit on the cork board in the base; the rest go to the overflow pile */
export const BOARD_SLOTS = 12;

export interface Tier {
  id: 'month' | 'quarter' | 'year' | 'forever';
  name: string;
  cycles: number; // board resets survived (Infinity = never cleared)
  price: number;
}
export const TIERS: Tier[] = [
  { id: 'month', name: 'Until the next reset', cycles: 1, price: 20 },
  { id: 'quarter', name: 'Survives 2 resets (~90 days)', cycles: 3, price: 150 },
  { id: 'year', name: 'Survives 11 resets (~1 year)', cycles: 12, price: 1500 },
  { id: 'forever', name: 'Permanent', cycles: Infinity, price: 1_000_000 },
];

export interface Note {
  id: string;
  author: string; // pubkey
  name: string;
  text: string;
  t: number; // ms
  tier: Tier['id'];
  expires: number; // ms, Infinity for permanent
  mine: boolean;
}

export const cycleOf = (t: number) => Math.floor((t - EPOCH) / CYCLE);
export const nextReset = (now = Date.now()) => EPOCH + (cycleOf(now) + 1) * CYCLE;
export function expiryFor(t: number, tier: Tier): number {
  return tier.cycles === Infinity ? Infinity : EPOCH + (cycleOf(t) + tier.cycles) * CYCLE;
}

function parse(e: NEvent): Note | null {
  let d: Record<string, unknown>;
  try {
    d = JSON.parse(e.content);
  } catch {
    return null;
  }
  const t = e.created_at * 1000;
  if (t > Date.now() + 10 * 60000) return null; // no post-dating to dodge the reset
  const tier = TIERS.find((x) => x.id === d.tier) ?? TIERS[0];
  const text = censor(sanitize(String(d.text ?? ''), 160));
  if (text.length < 3) return null;
  return {
    id: e.id,
    author: e.pubkey,
    name: censor(sanitize(String(d.name ?? 'Wanderer'), 24)) || 'Wanderer',
    text,
    t,
    tier: tier.id,
    expires: expiryFor(t, tier),
    mine: e.pubkey === nostr.pubkey,
  };
}

export class Board {
  notes = new Map<string, Note>();
  /** fired for notes that arrive after the board was opened for this session (the "ping") */
  onNew?: (n: Note) => void;
  onChange?: () => void;
  /** persistent listeners (the 3D board in the base), unlike onChange which the open panel owns */
  readonly listeners = new Set<() => void>();
  private since = Date.now();
  private unsub: (() => void) | null = null;

  connect() {
    if (this.unsub) return;
    this.load();
    this.unsub = nostr.subscribe({ kinds: [BOARD_KIND], '#t': [TAG], limit: 500 }, (e) => {
      const n = parse(e);
      if (!n || this.notes.has(n.id)) return;
      this.notes.set(n.id, n);
      if (n.t > this.since && !n.mine) this.onNew?.(n);
      this.save();
      this.changed();
    });
  }

  /** Active notes, newest first; permanent notes first, then at most a few per author. */
  list(): Note[] {
    const now = Date.now();
    const per = new Map<string, number>();
    return [...this.notes.values()]
      .filter((n) => n.expires > now)
      .sort((a, b) => (b.expires === Infinity ? 1 : 0) - (a.expires === Infinity ? 1 : 0) || b.t - a.t)
      .filter((n) => {
        const c = (per.get(n.author) ?? 0) + 1;
        per.set(n.author, c);
        return c <= MAX_PER_AUTHOR || n.expires === Infinity;
      });
  }

  async post(name: string, text: string, tier: Tier) {
    const t = Date.now();
    const exp = expiryFor(t, tier);
    const tags = [['d', 'n' + t.toString(36)], ['t', TAG]];
    if (exp !== Infinity) tags.push(['expiration', String(Math.floor(exp / 1000))]);
    const e = await nostr.publish(BOARD_KIND, JSON.stringify({ name, text, tier: tier.id, v: 1 }), tags);
    const n = parse(e);
    if (n) {
      this.notes.set(n.id, n);
      this.save();
      this.changed();
    }
  }

  /**
   * Notes split into those pinned on the physical board and the overflow pile.
   * First come, first pinned: permanent notes, then the oldest notes hold the slots until
   * they expire, so a note posted to a full board lands in the overflow pile (newest first).
   */
  split(): { pinned: Note[]; overflow: Note[] } {
    const byAge = this.list().sort((a, b) => (b.expires === Infinity ? 1 : 0) - (a.expires === Infinity ? 1 : 0) || a.t - b.t);
    return { pinned: byAge.slice(0, BOARD_SLOTS), overflow: byAge.slice(BOARD_SLOTS).reverse() };
  }

  get full() {
    return this.list().length >= BOARD_SLOTS;
  }

  private changed() {
    this.onChange?.();
    for (const l of this.listeners) l();
  }

  private load() {
    queueMicrotask(() => this.changed());
    try {
      const arr = JSON.parse(localStorage.getItem('ob.board2') || '[]') as Note[];
      for (const n of arr) if (n && typeof n.id === 'string') this.notes.set(n.id, { ...n, expires: n.expires ?? Infinity, mine: n.author === nostr.pubkey });
    } catch {
      /* ignore */
    }
  }

  private save() {
    try {
      const keep = this.list().slice(0, 300).map((n) => ({ ...n, expires: n.expires === Infinity ? null : n.expires }));
      localStorage.setItem('ob.board2', JSON.stringify(keep));
    } catch {
      /* ignore */
    }
  }
}

export const board = new Board();
