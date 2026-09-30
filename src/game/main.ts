import '@fontsource/vt323';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import { Game } from './Game';
import { UI } from './ui/UI';
import { Net } from './net/Net';
import { settings } from './core/Settings';
import { LEVELS } from './levels/levels';
import { hashString } from './core/rng';

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
async function launch(kind: 'solo' | 'ai' | 'online', seed: string, label: string) {
  game.menuMode = false;
  game.mode = kind;
  game.run = 0;
  game.bots.enabled = false;
  for (const b of game.bots.list) b.avatar.dispose();
  game.bots.list = [];
  if (kind === 'ai') game.bots.enable(2);
  game.roomSeed = hashString(seed);
  ui.enterGame(kind === 'online');
  await game.enterLevel(0);
  ui.titleCard('THE BASE', label);
  game.input.lock();
}

const ui = new UI(game, {
  solo: async () => {
    if (busy) return;
    busy = true;
    ui.onlineLink = '';
    await launch('solo', 'solo-' + Date.now(), 'Solo · offline');
    busy = false;
  },
  ai: async () => {
    if (busy) return;
    busy = true;
    ui.onlineLink = '';
    await launch('ai', 'ai-' + Date.now(), 'AI companions · offline');
    ui.toast('Two wanderers found you. They seem to know the way… mostly.');
    busy = false;
  },
  publicWorld: async (region) => {
    if (busy) return;
    busy = true;
    const net = ensureNet();
    const id = await net.joinPublic(region, (s) => ui.status(s));
    ui.onlineLink = '';
    await launch('online', id, net.label);
    ui.toast(`Connected to ${net.label}. ${net.peers.size} other${net.peers.size === 1 ? '' : 's'} here.`);
    busy = false;
  },
  createRoom: async (name, pass) => {
    if (busy) return;
    busy = true;
    const net = ensureNet();
    ui.status('Opening your room…');
    await net.join('room:' + name, name, pass);
    ui.onlineLink = `${siteUrl()}?room=${encodeURIComponent(name)}${pass ? '#k=' + encodeURIComponent(pass) : ''}`;
    await launch('online', 'room:' + name, `Room "${name}"`);
    ui.toast('Room open. Press TAB to copy the invite link.');
    busy = false;
  },
  joinRoom: async (name, pass) => {
    if (busy) return;
    busy = true;
    const net = ensureNet();
    ui.status('Connecting…');
    await net.join('room:' + name, name, pass);
    ui.onlineLink = `${siteUrl()}?room=${encodeURIComponent(name)}${pass ? '#k=' + encodeURIComponent(pass) : ''}`;
    await launch('online', 'room:' + name, `Room "${name}"`);
    busy = false;
  },
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
  },
});
game.ui = ui;

function ensureNet() {
  if (!game.net) {
    const net = new Net(game);
    net.onChat = (n, t, sys) => ui.chatMessage(n, t, sys);
    game.net = net;
  }
  return game.net;
}

game.events.onLevel = (def) => {
  if (!game.menuMode && def.id > 0) ui.titleCard(def.name.toUpperCase(), def.subtitle);
};
game.events.onDeath = (by) => ui.showDeath(by);

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
  game.audio.play('vhs_insert', { bus: 'ui', gain: 0.8 });
  if (inviteRoom) {
    const name = inviteRoom.toLowerCase().replace(/[^a-z0-9-_]+/g, '-').slice(0, 32);
    game.menuMode = true;
    await game.start('solo', 'menu', 0);
    ui.showMenu();
    ui.status('Joining invite…');
    await ui.actions.joinRoom(name, invitePass);
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
