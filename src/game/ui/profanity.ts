// Lightweight profanity filter with leetspeak normalisation. Applied to chat
// (toggleable) and always to bulletin board posts.

const WORDS = [
  'fuck', 'shit', 'bitch', 'cunt', 'dick', 'cock', 'pussy', 'asshole', 'bastard', 'slut', 'whore', 'fag', 'faggot',
  'nigger', 'nigga', 'retard', 'twat', 'wank', 'wanker', 'bollocks', 'prick', 'motherfucker', 'dildo', 'porn', 'rape',
  'nazi', 'kys', 'spic', 'chink', 'kike', 'tranny', 'cum', 'jizz', 'boob', 'tits', 'penis', 'vagina', 'hitler',
];

const LEET: Record<string, string> = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', $: 's', '!': 'i', '|': 'i', '+': 't' };

function norm(s: string) {
  return s
    .toLowerCase()
    .split('')
    .map((c) => LEET[c] ?? c)
    .join('')
    .replace(/(.)\1{2,}/g, '$1$1');
}

const RX = new RegExp(`(${WORDS.map((w) => w.split('').join('[^a-z]*')).join('|')})`, 'gi');

export function containsProfanity(s: string): boolean {
  RX.lastIndex = 0;
  return RX.test(norm(s));
}

/** Replace offending words with asterisks, preserving length. */
export function censor(s: string): string {
  const n = norm(s);
  let out = s.split('');
  RX.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = RX.exec(n))) {
    for (let i = m.index; i < m.index + m[0].length && i < out.length; i++) if (/\S/.test(out[i])) out[i] = '*';
  }
  return out.join('');
}

export function sanitize(s: string, max = 160): string {
  return s.replace(/[\u0000-\u001f<>]/g, '').slice(0, max).trim();
}
