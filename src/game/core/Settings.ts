// Persistent settings + profile (coins, locker, cosmetics). localStorage only;
// all access is wrapped because storage can be unavailable (private windows).

export type Quality = 'low' | 'medium' | 'high' | 'ultra';

export interface Settings {
  name: string;
  sensitivity: number;
  fov: number;
  invertY: boolean;
  quality: Quality | 'auto';
  vhs: number;
  grain: number;
  motionBlur: number;
  headBob: number;
  master: number;
  sfx: number;
  ambience: number;
  voice: number;
  micMode: 'ptt' | 'open' | 'off';
  chat: boolean;
  profanityFilter: boolean;
  showFps: boolean;
  rawInput: boolean;
}

export const DEFAULTS: Settings = {
  name: '',
  sensitivity: 1,
  fov: 78,
  invertY: false,
  quality: 'auto',
  vhs: 0.1,
  grain: 0.12,
  motionBlur: 0.45,
  headBob: 0.6,
  master: 0.9,
  sfx: 1,
  ambience: 1,
  voice: 1,
  micMode: 'ptt',
  chat: true,
  profanityFilter: true,
  showFps: false,
  rawInput: false,
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}
function write(key: string, v: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {
    /* storage unavailable */
  }
}

const ADJ = ['Lost', 'Damp', 'Quiet', 'Humming', 'Yellow', 'Pale', 'Wandering', 'Static', 'Hollow', 'Flickering'];
const NOUN = ['Wanderer', 'Tenant', 'Moth', 'Clerk', 'Signal', 'Drifter', 'Janitor', 'Echo', 'Visitor', 'Surveyor'];

export const settings: Settings = read('ob.settings2', DEFAULTS);
// carry the player's name over from the previous settings version
if (!settings.name) settings.name = read<{ name?: string }>('ob.settings', {}).name ?? '';
if (!settings.name) settings.name = ADJ[Math.floor(Math.random() * ADJ.length)] + NOUN[Math.floor(Math.random() * NOUN.length)] + Math.floor(Math.random() * 90 + 10);

export function saveSettings() {
  write('ob.settings2', settings);
}

// ------------------------------------------------------------------ profile
export interface Profile {
  coins: number;
  totalEarned: number;
  escapes: number;
  deaths: number;
  bestTime: number;
  locker: Record<string, number>;
  inventory: Record<string, number>;
  owned: string[];
  outfit: string;
  flashlight: string;
}

export const profile: Profile = read('ob.profile', {
  coins: 25,
  totalEarned: 0,
  escapes: 0,
  deaths: 0,
  bestTime: 0,
  locker: {},
  inventory: { almond: 1 },
  owned: ['hoodie_olive', 'torch_basic'],
  outfit: 'hoodie_olive',
  flashlight: 'torch_basic',
} as Profile);

export function saveProfile() {
  write('ob.profile', profile);
}

let coinListener: ((delta: number, reason: string) => void) | null = null;
export function onCoins(fn: (delta: number, reason: string) => void) {
  coinListener = fn;
}
/** Coins are only ever earned by playing. There is no purchase path for real money. */
export function earn(amount: number, reason: string) {
  amount = Math.round(amount);
  if (amount <= 0) return;
  profile.coins += amount;
  profile.totalEarned += amount;
  saveProfile();
  coinListener?.(amount, reason);
}
export function spend(amount: number): boolean {
  if (profile.coins < amount) return false;
  profile.coins -= amount;
  saveProfile();
  coinListener?.(-amount, '');
  return true;
}
