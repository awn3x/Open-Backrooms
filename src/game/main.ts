import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import { Game } from './Game';
import { UI } from './ui/UI';
import { Net } from './net/Net';
import { settings } from './core/Settings';
import { LEVELS } from './levels/levels';
import { hashString } from './core/rng';
import { nostr } from './net/Nostr';
import { roomIdFor, parseRoom, type GameMode } from './net/Lobby';
import { board } from './net/Board';
import { findPath } from './entities/Pathfinding';

const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) && !('ontouchend' in document && innerWidth > 1100);
if (isMobile) {
  const d = document.createElement('div');
  d.id = 'mobile-warn';
  d.innerHTML = 'OPEN BACKROOMS needs a keyboard &amp; mouse.<br><br>Please visit on a PC, Mac or laptop.';
  document.body.append(d);
}

const canvas = document.getElementById('c') as HTMLCanvasElement;
const game = new Game(canvas);

const params = new URLSearchParams(location.search);
const hashParams = new URLSearchParams(location.hash.slice(1));
const inviteRoom = params.get('room');
const invitePass = hashParams.get('k') ?? '';

function siteUrl() {
  return location.origin + location.pathname.replace(/index\.html$/, '');
}

let busy = false;
async function launch(kind: 'solo' | 'ai' | 'online', seed: string, label: string, mode: GameMode = 'escape', level = 0) {
  game.menuMode = false;
  game.mode = kind;
  game.runMode = mode;
  game.startLevel = mode === 'endless' ? level : 0;
  if (kind !== 'ai') board.connect();
  game.entities.authority = true;
  game.run = 0;
  game.bots.enabled = false;
  for (const b of game.bots.list) b.avatar.dispose();
  game.bots.list = [];
  if (kind === 'ai') game.bots.enable(2);
  game.roomSeed = hashString(seed);
  ui.enterGame(kind === 'online');
  await game.enterLevel(game.startLevel);
  ui.titleCard(game.startLevel === 0 ? 'THE BASE' : LEVELS[game.startLevel].name.toUpperCase(), mode === 'endless' ? `${label} · Endless` : label);
  game.input.lock();
}

/** Turn an invite value (room id, `name~host`, or a bare legacy name) into a room id. */
function toRoomId(v: string): string {
  v = v.trim();
  if (/^public:(NA|SA|EU|AF|AS|OC):\d{1,2}$/.test(v) || parseRoom(v)) return v;
  const m = /^([a-z0-9_-]{1,32})~([0-9a-f]{16})$/.exec(v.toLowerCase());
  if (m) return `room:${m[1]}~${m[2]}`;
  return 'room:' + v.toLowerCase().replace(/[^a-z0-9-_]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32);
}
const inviteFor = (id: string, pass: string) => `${siteUrl()}?room=${encodeURIComponent(id.replace(/^room:/, ''))}${pass ? '#k=' + encodeURIComponent(pass) : ''}`;

const ui = new UI(game, {
  solo: async (mode, level) => {
    if (busy) return;
    busy = true;
    ui.onlineLink = '';
    await launch('solo', 'solo-' + Date.now(), 'Solo · offline', mode, level);
    busy = false;
  },
  ai: async (mode, level) => {
    if (busy) return;
    busy = true;
    ui.onlineLink = '';
    await launch('ai', 'ai-' + Date.now(), 'AI companions · offline', mode, level);
    ui.toast('Two wanderers found you. They seem to know the way… mostly.');
    busy = false;
  },
  publicWorld: async (region) => {
    if (busy) return;
    busy = true;
    const net = ensureNet();
    net.mode = 'escape';
    net.startLevel = 0;
    const id = await net.joinPublic(region, (s) => ui.status(s));
    ui.onlineLink = '';
    await launch('online', id, net.label);
    ui.toast(`Connected to ${net.label}. ${net.peers.size} other${net.peers.size === 1 ? '' : 's'} here.`);
    busy = false;
  },
  createRoom: async (name, pass, mode, level) => {
    if (busy) return;
    busy = true;
    const net = ensureNet();
    ui.status('Opening your room…');
    const id = roomIdFor(name, nostr.pubkey);
    net.mode = mode;
    net.startLevel = mode === 'endless' ? level : 0;
    net.region = ui.region;
    await net.join(id, name, pass, true);
    ui.onlineLink = inviteFor(id, pass);
    await launch('online', id, `Room "${name}"`, mode, level);
    ui.toast('Room open and listed in Browse Games. Press TAB to copy the invite link.');
    busy = false;
  },
  joinRoom: async (value, pass) => {
    if (busy) return;
    busy = true;
    const net = ensureNet();
    const id = toRoomId(value);
    ui.status('Connecting…');
    net.mode = 'escape';
    net.startLevel = 0;
    const n = await net.join(id, parseRoom(id)?.name ?? id, pass);
    if (n === 0 && !id.startsWith('public:')) {
      net.leave();
      ui.status(pass ? 'Could not reach the host: wrong password, or the room has closed.' : 'Could not reach the host. The room may have closed, or it needs a password.');
      busy = false;
      return;
    }
    ui.onlineLink = id.startsWith('room:') ? inviteFor(id, pass) : '';
    await launch('online', id, net.label.startsWith('public:') ? net.label : `Room "${parseRoom(id)?.name ?? net.label}"`, net.mode, net.startLevel);
    busy = false;
  },
  kick: (peerId) => void game.net?.kick(peerId),
  leave: async () => {
    game.net?.leave();
    game.net = null;
    ui.onlineLink = '';
    game.bots.enabled = false;
    for (const b of game.bots.list) b.avatar.dispose();
    game.bots.list = [];
    game.menuMode = true;
    game.paused = false;
    game.input.unlock();
    game.mode = 'solo';
    game.roomSeed = hashString('menu');
    await game.enterLevel(0);
    ui.showMenu();
  },
  applySettings: () => {
    game.audio.applyVolumes();
    game.post.s.vhs = settings.vhs;
    game.post.s.grain = settings.grain;
    game.post.s.blur = settings.motionBlur;
    game.input.raw = settings.rawInput;
  },
});
game.ui = ui;
game.input.raw = settings.rawInput;

function ensureNet() {
  if (!game.net) {
    const net = new Net(game);
    net.onChat = (n, t, sys) => ui.chatMessage(n, t, sys);
    net.onRoomConfig = (mode, level) => {
      net.mode = mode;
      net.startLevel = level;
    };
    net.onKicked = () => {
      ui.actions.leave();
      setTimeout(() => ui.toast('You were removed from the room by the host.'), 1500);
    };
    game.net = net;
  }
  return game.net;
}

game.events.onLevel = (def) => {
  if (!game.menuMode && def.id > 0) ui.titleCard(def.name.toUpperCase(), def.subtitle);
};
game.events.onDeath = (by) => ui.showDeath(by);
// the bulletin board "pings" you when someone pins a new note
board.onNew = (n) => {
  if (!ui.inGame || game.mode === 'ai') return;
  ui.toast(`New note on the bulletin board from ${n.name}.`);
  game.audio.play('ui_click', { bus: 'ui', rate: 1.6 });
};

// pointer lock <-> pause
canvas.addEventListener('click', () => {
  if (ui.inGame && !ui.modalOpen) {
    game.audio.resume();
    game.input.lock();
  }
});
game.input.onLockChange = (locked) => {
  if (!locked && ui.inGame && !ui.modalOpen && !busy) ui.openPause();
  if (locked) game.paused = false;
};

const boot = ui.bootScreen(async () => {
  game.audio.resume();
  if (inviteRoom) {
    game.menuMode = true;
    await game.start('solo', 'menu', 0);
    ui.showMenu();
    ui.status('Joining invite…');
    await ui.actions.joinRoom(inviteRoom, invitePass);
    return;
  }
  game.menuMode = true;
  await game.start('solo', 'menu', 0);
  ui.showMenu();
});

game
  .boot((f, l) => boot.progress(f, l))
  .then(() => boot.ready())
  .catch((e) => {
    console.error(e);
    boot.error('This browser could not start WebGL2. Try Chrome, Edge, Firefox or Safari 16+.');
  });

// debug handle for automated screenshots
(window as unknown as { __game: Game; __levels: typeof LEVELS }).__game = game;
(window as unknown as { __levels: typeof LEVELS }).__levels = LEVELS;
(window as unknown as { __findPath: typeof findPath }).__findPath = findPath;
