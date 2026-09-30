// DOM user interface: boot, main menu, online lobby, HUD, chat, shop,
// lockers, bulletin board, settings, pause, death/ending.

import './ui.css';
import { settings, saveSettings, profile, saveProfile, spend, onCoins } from '../core/Settings';
import type { Game } from '../Game';
import { detectRegion, REGION_NAMES, type Region, loadBoard } from '../net/Net';
import { censor, containsProfanity, sanitize } from './profanity';
import { LEVELS } from '../levels/levels';
import { OUTFITS } from '../entities/Avatar';

const $ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector(sel) as T;
const h = (html: string) => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild as HTMLElement;
};
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export interface MenuActions {
  solo: () => void;
  ai: () => void;
  publicWorld: (region: Region) => void;
  createRoom: (name: string, password: string) => void;
  joinRoom: (name: string, password: string) => void;
  leave: () => void;
  applySettings: () => void;
}

interface ShopItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  kind: 'consumable' | 'upgrade' | 'outfit';
}

const SHOP: ShopItem[] = [
  { id: 'almond', name: 'Almond Water', desc: 'Restores sanity and stamina. Press Q to drink.', price: 15, kind: 'consumable' },
  { id: 'battery', name: 'Battery Pack', desc: 'Fresh cells for your flashlight. Press R to swap.', price: 10, kind: 'consumable' },
  { id: 'torch_pro', name: 'Heavy-Duty Torch', desc: 'Brighter beam, battery lasts twice as long.', price: 150, kind: 'upgrade' },
  { id: 'hoodie_red', name: 'Red Hoodie', desc: 'So your friends can find you in the yellow.', price: 60, kind: 'outfit' },
  { id: 'hoodie_blue', name: 'Blue Hoodie', desc: 'A calm colour for an uncalm place.', price: 60, kind: 'outfit' },
  { id: 'janitor_grey', name: 'Janitor Coveralls', desc: 'Someone has to mop Level 0.', price: 90, kind: 'outfit' },
  { id: 'hazmat_yellow', name: 'Hazmat Suit', desc: 'Offers no protection. Looks great.', price: 200, kind: 'outfit' },
];

const ITEM_NAMES: Record<string, string> = { almond: 'Almond Water', battery: 'Battery Pack' };
export const BOARD_COST = 20;

export class UI {
  root: HTMLElement;
  hud: HTMLElement;
  private promptEl: HTMLElement;
  private chatEl: HTMLElement;
  private chatInput: HTMLInputElement;
  private toastsEl: HTMLElement;
  private modal: HTMLElement | null = null;
  private chatOpen = false;
  private chatFadeT = 0;
  private titleT = 0;
  inGame = false;
  online = false;
  onlineLink = '';
  region: Region = detectRegion();

  constructor(
    private game: Game,
    public actions: MenuActions,
  ) {
    this.root = $('#ui');
    this.hud = h(`<div id="hud" class="hidden">
      <div class="coins"></div>
      <div class="level"></div>
      <div class="fps"></div>
      <div class="talk hidden">● Talking</div>
      <div class="safe hidden">Safe zone</div>
      <div class="cross"></div>
      <div class="prompt hidden"></div>
      <div class="stamina"><i></i></div>
      <div class="bat hidden"><span class="cell"><span class="fill"></span></span></div>
      <div class="inv"></div>
      <div id="title-card"></div>
    </div>`);
    this.root.append(this.hud);
    this.promptEl = $('.prompt', this.hud);
    this.chatEl = h(`<div id="chat" class="hidden"><div class="log"></div><input class="hidden interactive" maxlength="200" placeholder="Say something… (Enter to send, Esc to cancel)"></div>`);
    this.root.append(this.chatEl);
    this.chatInput = $('input', this.chatEl) as HTMLInputElement;
    this.toastsEl = h(`<div id="toasts"></div>`);
    this.root.append(this.toastsEl);
    this.root.append(h(`<div id="fade"></div>`));

    onCoins((d, reason) => {
      if (d > 0) this.toast(`+${d} BC${reason ? ' · ' + reason : ''}`, 'coin');
      this.refreshCoins();
    });
    this.chatInput.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        const t = this.chatInput.value.trim();
        if (t) this.game.net?.chat(t);
        this.closeChat();
      } else if (e.key === 'Escape') this.closeChat();
    });
    window.addEventListener('keydown', (e) => this.onKey(e));
    window.addEventListener('keyup', (e) => {
      if (e.code === 'KeyV') this.game.net?.setTalking(false);
    });
  }

  // ------------------------------------------------------------------ boot
  bootScreen(onStart: () => void) {
    const el = h(`<div id="boot" class="interactive"><div class="inner">
      <div class="play">OPEN BACKROOMS</div>
      <div class="bar"><i></i></div>
      <div class="label">Loading…</div>
      <button class="start hidden">CLICK TO ENTER</button>
      <div class="warn">Headphones recommended. Contains flashing lights, loud sudden sounds and themes of isolation.<br>Free forever. No accounts, no payments — coins are earned by playing.</div>
    </div></div>`);
    this.root.append(el);
    const bar = $('.bar i', el);
    const label = $('.label', el);
    const btn = $('.start', el);
    btn.onclick = () => {
      el.remove();
      onStart();
    };
    return {
      progress: (f: number, l: string) => {
        bar.style.width = `${Math.round(f * 100)}%`;
        label.textContent = l;
      },
      ready: () => {
        label.textContent = 'Ready.';
        btn.classList.remove('hidden');
      },
      error: (msg: string) => {
        label.textContent = msg;
        label.style.color = 'var(--danger)';
      },
    };
  }

  // ------------------------------------------------------------------ menu
  showMenu() {
    this.inGame = false;
    this.hud.classList.add('hidden');
    this.chatEl.classList.add('hidden');
    this.closeModal();
    $('#menu')?.remove();
    const el = h(`<div id="menu" class="screen interactive"><div class="col">
      <div class="logo">OPEN<br>BACKROOMS<small>NOCLIP INTO THE YELLOW</small></div>
      <div class="menu-list">
        <button class="mbtn" data-a="solo">Play Solo</button>
        <button class="mbtn" data-a="ai">Play with AI<small>companions</small></button>
        <button class="mbtn" data-a="online">Online<small>public worlds &amp; custom rooms</small></button>
        <button class="mbtn" data-a="settings">Settings</button>
        <button class="mbtn" data-a="how">How to Play</button>
      </div>
      <div class="profile-strip">
        <span>NAME <input class="name" maxlength="20" value="${esc(settings.name)}"></span>
        <span class="coin">${profile.coins} BC</span>
        <span>ESCAPES ${profile.escapes}</span>
      </div>
      <div class="foot">Free &amp; open source. Backrooms Coins (BC) are earned in-game only — no real money, ever.</div>
    </div></div>`);
    this.root.prepend(el);
    const nameIn = $('.name', el) as HTMLInputElement;
    nameIn.addEventListener('change', () => {
      const n = sanitize(nameIn.value, 20);
      settings.name = containsProfanity(n) || !n ? settings.name : n;
      nameIn.value = settings.name;
      saveSettings();
    });
    nameIn.addEventListener('keydown', (e) => e.stopPropagation());
    el.querySelectorAll<HTMLButtonElement>('.mbtn').forEach((b) => {
      b.onmouseenter = () => this.game.audio.play('ui_hover', { bus: 'ui', gain: 0.5 });
      b.onclick = () => {
        this.game.audio.play('ui_click', { bus: 'ui' });
        const a = b.dataset.a;
        if (a === 'solo') this.actions.solo();
        else if (a === 'ai') this.actions.ai();
        else if (a === 'online') this.openOnline();
        else if (a === 'settings') this.openSettings();
        else if (a === 'how') this.openHow();
      };
    });
  }

  hideMenu() {
    $('#menu')?.remove();
  }

  enterGame(online: boolean) {
    this.inGame = true;
    this.online = online;
    this.hideMenu();
    this.closeModal();
    this.hud.classList.remove('hidden');
    this.chatEl.classList.toggle('hidden', !online || !settings.chat);
    this.refreshCoins();
  }

  status(text: string) {
    const s = $('.status', this.modal ?? document.body);
    if (s) s.textContent = text;
  }

  // ------------------------------------------------------------------ modals
  private openModal(inner: string): HTMLElement {
    this.closeModal();
    const wrap = h(`<div class="modal-wrap interactive"><div class="panel">${inner}<button class="close">ESC ✕</button></div></div>`);
    this.root.append(wrap);
    $('.close', wrap).onclick = () => this.closeModal(true);
    wrap.addEventListener('mousedown', (e) => {
      if (e.target === wrap) this.closeModal(true);
    });
    wrap.querySelectorAll('input,textarea,select').forEach((i) => i.addEventListener('keydown', (e) => (e as KeyboardEvent).key !== 'Escape' && e.stopPropagation()));
    this.modal = wrap;
    this.game.input.unlock();
    return wrap;
  }

  closeModal(resume = false) {
    this.modal?.remove();
    this.modal = null;
    if (resume && this.inGame) this.resume();
  }

  get modalOpen() {
    return !!this.modal;
  }

  resume() {
    this.game.paused = false;
    this.game.input.lock();
  }

  openOnline() {
    const w = this.openModal(`<h2>ONLINE</h2><div class="sub">Peer-to-peer, free, no accounts. Your connection goes straight to other players.</div>
      <div class="tabs"><button class="tab on" data-t="public">Public World</button><button class="tab" data-t="create">Create Room</button><button class="tab" data-t="join">Join Room</button></div>
      <div data-p="public">
        <div class="field"><label>Region (auto-detected)</label></div>
        <div class="region-pick">${(Object.keys(REGION_NAMES) as Region[]).map((r) => `<button data-r="${r}" class="${r === this.region ? 'on' : ''}">${REGION_NAMES[r]}</button>`).join('')}</div>
        <p class="sub">You'll join the busiest world in your region with free slots (up to 8 players each). Everyone there shares the same Backrooms.</p>
        <button class="btn primary go-public">JOIN PUBLIC WORLD</button>
      </div>
      <div data-p="create" class="hidden">
        <div class="field"><label>Room name (becomes your invite link)</label><input type="text" class="rname" maxlength="32" placeholder="e.g. level-zero-crew"></div>
        <div class="field"><label>Password (optional)</label><input type="password" class="rpass" maxlength="40"></div>
        <button class="btn primary go-create">CREATE &amp; ENTER</button>
      </div>
      <div data-p="join" class="hidden">
        <div class="field"><label>Room name or invite link</label><input type="text" class="jname" maxlength="200" placeholder="room name or https://…/play/?room=…"></div>
        <div class="field"><label>Password (if any)</label><input type="password" class="jpass" maxlength="40"></div>
        <button class="btn primary go-join">JOIN</button>
      </div>
      <div class="status" style="margin-top:14px"></div>`);
    w.querySelectorAll<HTMLButtonElement>('.tab').forEach((t) => {
      t.onclick = () => {
        w.querySelectorAll('.tab').forEach((x) => x.classList.toggle('on', x === t));
        w.querySelectorAll<HTMLElement>('[data-p]').forEach((p) => p.classList.toggle('hidden', p.dataset.p !== t.dataset.t));
      };
    });
    w.querySelectorAll<HTMLButtonElement>('.region-pick button').forEach((b) => {
      b.onclick = () => {
        this.region = b.dataset.r as Region;
        w.querySelectorAll('.region-pick button').forEach((x) => x.classList.toggle('on', x === b));
      };
    });
    const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9-_]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32);
    $('.go-public', w).onclick = () => this.actions.publicWorld(this.region);
    $('.go-create', w).onclick = () => {
      const n = slug(($('.rname', w) as HTMLInputElement).value);
      if (!n) return this.status('Pick a room name.');
      if (containsProfanity(n)) return this.status('Choose a different room name.');
      this.actions.createRoom(n, ($('.rpass', w) as HTMLInputElement).value);
    };
    $('.go-join', w).onclick = () => {
      let v = ($('.jname', w) as HTMLInputElement).value.trim();
      let pass = ($('.jpass', w) as HTMLInputElement).value;
      try {
        const u = new URL(v);
        v = u.searchParams.get('room') ?? v;
        const k = new URLSearchParams(u.hash.slice(1)).get('k');
        if (k && !pass) pass = k;
      } catch {
        /* plain name */
      }
      const n = slug(v);
      if (!n) return this.status('Enter a room name or link.');
      this.actions.joinRoom(n, pass);
    };
  }

  openHow() {
    this.openModal(`<h2>HOW TO PLAY</h2><div class="sub">If you're not careful and you noclip out of reality in the wrong areas, you'll end up in the Backrooms.</div>
      <div class="list">
        <div class="item"><span><span class="kbd">WASD</span>Move</span><span><span class="kbd">SHIFT</span>Sprint (loud)</span></div>
        <div class="item"><span><span class="kbd">C</span>Crouch (quiet)</span><span><span class="kbd">SPACE</span>Jump</span></div>
        <div class="item"><span><span class="kbd">F</span>Flashlight</span><span><span class="kbd">E</span>Interact</span></div>
        <div class="item"><span><span class="kbd">Q</span>Drink Almond Water</span><span><span class="kbd">R</span>Swap battery</span></div>
        <div class="item"><span><span class="kbd">T</span>Chat (online)</span><span><span class="kbd">V</span>Push-to-talk (online)</span></div>
        <div class="item"><span><span class="kbd">TAB</span>Players</span><span><span class="kbd">ESC</span>Pause</span></div>
      </div>
      <p class="sub" style="margin-top:16px">You start at the <b>Base</b>, a safe zone with a supply kiosk, lockers and a bulletin board. Leave it to explore. Follow the scrawled arrows to find the exit of each level. Level 0 → Level 1 → Level 2 → ???</p>
      <p class="sub">Entities: some hunt by <b>sound</b> (walk or crouch), one only moves when <b>nobody is looking</b>, and some things in the dark hate <b>light</b>. Sanity drains in darkness. Almond Water helps.</p>
      <p class="sub">You earn Backrooms Coins by exploring, surviving, finding Almond Water and escaping. Spend them at the kiosk or on bulletin notes. There is no way to buy coins with money.</p>`);
  }

  openSettings() {
    const w = this.openModal(`<h2>SETTINGS</h2>
      <div class="tabs"><button class="tab on" data-t="video">Video</button><button class="tab" data-t="audio">Audio</button><button class="tab" data-t="controls">Controls</button><button class="tab" data-t="social">Social</button></div>
      <div data-p="video">
        <div class="field"><label>Quality</label><select class="q">${['auto', 'low', 'medium', 'high', 'ultra'].map((q) => `<option ${settings.quality === q ? 'selected' : ''}>${q}</option>`).join('')}</select></div>
        ${this.slider('fov', 'Field of view', 60, 100, 1)}
        ${this.slider('vhs', 'Old tape look', 0, 1, 0.05)}
        ${this.slider('grain', 'Film grain', 0, 1, 0.02)}
        ${this.slider('motionBlur', 'Motion blur', 0, 1.2, 0.05)}
        ${this.slider('headBob', 'Head motion', 0, 1.5, 0.05)}
        ${this.check('showFps', 'Show FPS')}
        ${this.check('reduceFlashes', 'Reduce flashes and screen shake (jumpscares)')}
      </div>
      <div data-p="audio" class="hidden">
        ${this.slider('master', 'Master', 0, 1, 0.05)}
        ${this.slider('sfx', 'Effects', 0, 1.5, 0.05)}
        ${this.slider('ambience', 'Ambience', 0, 1.5, 0.05)}
        ${this.slider('voice', 'Voice chat', 0, 2, 0.05)}
        <div class="field"><label>Microphone</label><select class="mic"><option value="ptt" ${settings.micMode === 'ptt' ? 'selected' : ''}>Push-to-talk (V)</option><option value="open" ${settings.micMode === 'open' ? 'selected' : ''}>Open mic</option><option value="off" ${settings.micMode === 'off' ? 'selected' : ''}>Off</option></select></div>
      </div>
      <div data-p="controls" class="hidden">
        ${this.slider('sensitivity', 'Mouse sensitivity', 0.1, 5, 0.05)}
        ${this.check('invertY', 'Invert Y axis')}
        ${this.check('rawInput', 'Raw mouse input (ignore OS acceleration)')}
        <p class="sub">Gamepads are supported (left stick move, right stick look, A interact, Y flashlight, LB sprint, B crouch).</p>
      </div>
      <div data-p="social" class="hidden">
        ${this.check('chat', 'Show text chat (online)')}
        ${this.check('profanityFilter', 'Filter bad words in chat')}
        <p class="sub">Bulletin board notes are always filtered. Nothing you type is stored on any server — messages go directly to players in your room.</p>
      </div>`);
    w.querySelectorAll<HTMLButtonElement>('.tab').forEach((t) => {
      t.onclick = () => {
        w.querySelectorAll('.tab').forEach((x) => x.classList.toggle('on', x === t));
        w.querySelectorAll<HTMLElement>('[data-p]').forEach((p) => p.classList.toggle('hidden', p.dataset.p !== t.dataset.t));
      };
    });
    w.querySelectorAll<HTMLInputElement>('input[type=range]').forEach((r) => {
      r.oninput = () => {
        (settings as unknown as Record<string, number>)[r.name] = parseFloat(r.value);
        (r.nextElementSibling as HTMLOutputElement).value = r.value;
        saveSettings();
        this.actions.applySettings();
      };
    });
    w.querySelectorAll<HTMLInputElement>('input[type=checkbox]').forEach((c) => {
      c.onchange = () => {
        (settings as unknown as Record<string, boolean>)[c.name] = c.checked;
        saveSettings();
        this.actions.applySettings();
        this.chatEl.classList.toggle('hidden', !this.online || !settings.chat || !this.inGame);
      };
    });
    ($('.q', w) as HTMLSelectElement).onchange = (e) => {
      settings.quality = (e.target as HTMLSelectElement).value as typeof settings.quality;
      saveSettings();
      this.toast('Quality applies on the next level load.');
    };
    ($('.mic', w) as HTMLSelectElement).onchange = (e) => {
      settings.micMode = (e.target as HTMLSelectElement).value as typeof settings.micMode;
      saveSettings();
      if (settings.micMode !== 'off') void this.game.net?.enableMic();
      this.game.net?.setTalking(false);
    };
  }

  private slider(key: keyof typeof settings, label: string, min: number, max: number, step: number) {
    const v = settings[key] as number;
    return `<div class="slider"><span>${label}</span><input type="range" name="${key}" min="${min}" max="${max}" step="${step}" value="${v}"><output>${v}</output></div>`;
  }
  private check(key: keyof typeof settings, label: string) {
    return `<label class="check"><input type="checkbox" name="${key}" ${settings[key] ? 'checked' : ''}>${label}</label>`;
  }

  openPause() {
    const net = this.game.net;
    const players = net ? [...net.peers.values()] : [];
    const w = this.openModal(`<h2>PAUSED</h2><div class="sub">${LEVELS[this.game.level].name} — ${LEVELS[this.game.level].subtitle}${this.online ? ` · ${esc(net?.label ?? '')}` : ''}</div>
      ${this.onlineLink ? `<div class="field"><label>Invite link</label><div class="linkbox"><input type="text" readonly value="${esc(this.onlineLink)}"><button class="btn copy">COPY</button></div></div>` : ''}
      ${this.online ? `<div class="field"><label>Players (${players.length + 1}/8)</label><div class="list players"><div class="item"><span>${esc(settings.name)} (you)</span><span class="ping">L${this.game.level}</span></div>${players.map((p) => `<div class="item"><span>${esc(p.name)}</span><span class="ping">L${p.level} · ${Math.round(p.ping)}ms</span></div>`).join('')}</div></div>` : ''}
      <div class="row" style="margin-top:10px"><button class="btn primary resume">RESUME</button><button class="btn settings">SETTINGS</button><button class="btn how">CONTROLS</button><button class="btn leave">LEAVE TO MENU</button></div>`);
    $('.resume', w).onclick = () => this.closeModal(true);
    $('.settings', w).onclick = () => this.openSettings();
    $('.how', w).onclick = () => this.openHow();
    $('.leave', w).onclick = () => this.actions.leave();
    const c = w.querySelector('.copy') as HTMLButtonElement | null;
    if (c)
      c.onclick = () => {
        void navigator.clipboard?.writeText(this.onlineLink);
        c.textContent = 'COPIED';
      };
    this.game.paused = true;
  }

  openPanel(kind: 'shop' | 'locker' | 'board') {
    if (kind === 'shop') this.openShop();
    else if (kind === 'locker') this.openLocker();
    else this.openBoard();
  }

  private openShop() {
    const render = () => {
      const w = this.openModal(`<h2>SUPPLY KIOSK</h2><div class="sub">Balance: <b style="color:var(--accent)">${profile.coins} BC</b> — earned by exploring, surviving and escaping. No real money accepted (or possible).</div>
        <div class="grid">${SHOP.map((it) => {
          const owned = it.kind !== 'consumable' && (profile.owned.includes(it.id) || (it.id === 'torch_pro' && profile.flashlight === 'torch_pro'));
          const worn = it.kind === 'outfit' && profile.outfit === it.id;
          return `<div class="card ${owned ? 'owned' : ''}"><h3>${it.name}</h3><p>${it.desc}</p>
            ${it.kind === 'consumable' ? `<p>You have: ${profile.inventory[it.id] ?? 0}</p>` : ''}
            <div class="row" style="justify-content:space-between"><span class="price">${owned ? (worn ? 'WEARING' : 'OWNED') : it.price + ' BC'}</span>
            ${owned ? (it.kind === 'outfit' && !worn ? `<button class="btn" data-wear="${it.id}">WEAR</button>` : '') : `<button class="btn primary" data-buy="${it.id}" ${profile.coins < it.price ? 'disabled' : ''}>BUY</button>`}</div></div>`;
        }).join('')}</div>`);
      w.querySelectorAll<HTMLButtonElement>('[data-buy]').forEach((b) => {
        b.onclick = () => {
          const it = SHOP.find((s) => s.id === b.dataset.buy)!;
          if (!spend(it.price)) return;
          if (it.kind === 'consumable') profile.inventory[it.id] = (profile.inventory[it.id] ?? 0) + 1;
          else if (it.kind === 'upgrade') {
            profile.owned.push(it.id);
            profile.flashlight = it.id;
          } else {
            profile.owned.push(it.id);
            profile.outfit = it.id;
          }
          saveProfile();
          this.game.audio.play('ui_click', { bus: 'ui', rate: 1.3 });
          render();
        };
      });
      w.querySelectorAll<HTMLButtonElement>('[data-wear]').forEach((b) => {
        b.onclick = () => {
          profile.outfit = b.dataset.wear!;
          saveProfile();
          render();
        };
      });
    };
    render();
  }

  private openLocker() {
    const render = () => {
      const keys = [...new Set([...Object.keys(profile.inventory), ...Object.keys(profile.locker)])].filter((k) => ITEM_NAMES[k]);
      const w = this.openModal(`<h2>YOUR LOCKER</h2><div class="sub">Items in your locker stay safe when you die. Items you carry are lost if you're taken.</div>
        <div class="list">${keys.map((k) => `<div class="item"><span>${ITEM_NAMES[k]}</span><span>Carrying <b>${profile.inventory[k] ?? 0}</b> · Stored <b>${profile.locker[k] ?? 0}</b></span>
          <span class="row"><button class="btn" data-store="${k}" ${(profile.inventory[k] ?? 0) < 1 ? 'disabled' : ''}>STORE →</button><button class="btn" data-take="${k}" ${(profile.locker[k] ?? 0) < 1 ? 'disabled' : ''}>← TAKE</button></span></div>`).join('') || '<p class="sub">Empty. Buy supplies at the kiosk.</p>'}</div>
        <p class="sub" style="margin-top:14px">Outfits owned: ${profile.owned.filter((o) => OUTFITS[o] !== undefined).length} · Escapes: ${profile.escapes} · Deaths: ${profile.deaths} · Lifetime BC: ${profile.totalEarned}</p>`);
      w.querySelectorAll<HTMLButtonElement>('[data-store]').forEach((b) => {
        b.onclick = () => {
          const k = b.dataset.store!;
          profile.inventory[k]--;
          profile.locker[k] = (profile.locker[k] ?? 0) + 1;
          saveProfile();
          render();
        };
      });
      w.querySelectorAll<HTMLButtonElement>('[data-take]').forEach((b) => {
        b.onclick = () => {
          const k = b.dataset.take!;
          profile.locker[k]--;
          profile.inventory[k] = (profile.inventory[k] ?? 0) + 1;
          saveProfile();
          render();
        };
      });
    };
    render();
  }

  openBoard() {
    const net = this.game.net;
    const posts = (net?.board ?? loadBoard()).slice().reverse();
    const canPost = this.online && !!net;
    const w = this.openModal(`<h2>BULLETIN BOARD</h2><div class="sub">${canPost ? `Pin a note for everyone in this world. Costs <b style="color:var(--accent)">${BOARD_COST} BC</b> (earned in-game). Keep it friendly — notes are filtered.` : 'The board is only connected in online worlds. (AI mode has no board, chat or voice.)'}</div>
      <div class="posts">${posts.length ? posts.map((p, i) => `<div class="post" style="--r:${((i * 37) % 5) - 2}deg">${esc(p.text)}<div class="meta">— ${esc(p.name)} · ${new Date(p.t).toLocaleDateString()}</div></div>`).join('') : '<p class="sub">No notes yet. Be the first to leave a warning.</p>'}</div>
      ${canPost ? `<div class="field" style="margin-top:16px"><label>Your note (max 160)</label><textarea class="note" maxlength="160" placeholder="e.g. Arrows near the wet carpet LIE. Head for the red ones."></textarea></div>
      <div class="row"><button class="btn primary pin" ${profile.coins < BOARD_COST ? 'disabled' : ''}>PIN NOTE — ${BOARD_COST} BC</button><span class="status"></span></div>` : ''}`);
    const pin = w.querySelector('.pin') as HTMLButtonElement | null;
    if (pin)
      pin.onclick = () => {
        const text = sanitize(($('.note', w) as HTMLTextAreaElement).value, 160);
        if (text.length < 3) return this.status('Write a little more.');
        if (containsProfanity(text)) return this.status('Please keep notes appropriate.');
        if (!spend(BOARD_COST)) return this.status('Not enough BC.');
        net!.postBoard(censor(text), BOARD_COST);
        this.toast('Note pinned.');
        this.openBoard();
      };
  }

  // ------------------------------------------------------------------ in-game feedback
  prompt(label: string | null, kind?: string) {
    if (!label) {
      this.promptEl.classList.add('hidden');
      return;
    }
    const verb = kind === 'pickup' ? 'Take' : kind === 'exit' ? 'Enter' : kind === 'couch' ? 'Sit' : 'Use';
    this.promptEl.innerHTML = `<i>E</i> ${verb} ${esc(label)}`;
    this.promptEl.classList.remove('hidden');
  }

  toast(text: string, cls = '') {
    const t = h(`<div class="toast ${cls}">${esc(text)}</div>`);
    this.toastsEl.append(t);
    setTimeout(() => t.remove(), 4200);
    while (this.toastsEl.children.length > 5) this.toastsEl.firstElementChild?.remove();
  }

  chatMessage(name: string, text: string, system = false) {
    const log = $('.log', this.chatEl);
    const m = h(`<div class="msg ${system ? 'sys' : ''}">${system ? '' : `<b>${esc(name)}</b>`}${esc(text)}</div>`);
    log.append(m);
    while (log.children.length > 40) log.firstElementChild?.remove();
    this.chatEl.classList.remove('faded');
    this.chatFadeT = 8;
  }

  private openChat() {
    if (!this.online || !settings.chat) return;
    this.chatOpen = true;
    this.chatInput.classList.remove('hidden');
    this.chatEl.classList.remove('faded');
    this.game.input.enabled = false;
    setTimeout(() => this.chatInput.focus(), 0);
  }
  private closeChat() {
    this.chatOpen = false;
    this.chatInput.value = '';
    this.chatInput.classList.add('hidden');
    this.chatInput.blur();
    this.game.input.enabled = true;
    this.game.canvas.focus();
  }

  titleCard(title: string, sub: string) {
    const t = $('#title-card', this.hud);
    t.innerHTML = `${esc(title)}<small>${esc(sub)}</small>`;
    t.classList.add('show');
    this.titleT = 4;
  }

  showDeath(by: string) {
    const words: Record<string, string> = { crawler: 'IT HEARD YOU', watcher: 'YOU LOOKED AWAY', smiler: 'IT SMILED BACK', dweller: 'SOMETHING IN THE PIPES', mimic: 'THAT WASN\'T THEM' };
    const d = h(`<div class="death osd">${words[by] ?? 'SIGNAL LOST'}</div>`);
    this.root.append(d);
    setTimeout(() => d.remove(), 2600);
  }

  showEnding() {
    const w = this.openModal(`<h2>DAYLIGHT?</h2><div class="sub">The elevator opened onto a parking lot. Real sun. Real air. You blinked — and the hum came back.</div>
      <p>You escaped all three levels. +100 BC. Total escapes: ${profile.escapes}.</p>
      <p class="sub">The Backrooms reshuffle every time you enter. Go again?</p>
      <button class="btn primary">NOCLIP AGAIN</button>`);
    $('.btn', w).onclick = () => this.closeModal(true);
  }

  refreshCoins() {
    $('.coins', this.hud).textContent = `${profile.coins} BC`;
    const strip = document.querySelector('.profile-strip .coin');
    if (strip) strip.textContent = `${profile.coins} BC`;
  }

  private onKey(e: KeyboardEvent) {
    if (!this.inGame || this.chatOpen) return;
    const t = e.target as HTMLElement;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
    if (e.code === 'Escape') {
      if (this.modal) this.closeModal(true);
      return;
    }
    if (this.modal) return;
    if (e.code === 'KeyT' || e.code === 'Enter') {
      e.preventDefault();
      this.openChat();
    } else if (e.code === 'KeyV' && !e.repeat && this.online) {
      if (settings.micMode === 'ptt') void this.game.net?.enableMic().then(() => this.game.net?.setTalking(true));
    } else if (e.code === 'KeyQ') {
      if (this.game.drinkAlmond()) this.toast('You drink the Almond Water. The walls stop breathing.');
      else this.toast('No Almond Water. Buy some at the base kiosk.');
    } else if (e.code === 'KeyR') {
      if ((profile.inventory.battery ?? 0) > 0) {
        profile.inventory.battery--;
        saveProfile();
        this.game.player.battery = 1;
        this.game.audio.play('ui_click', { rate: 0.5 });
        this.toast('Fresh batteries.');
      } else this.toast('No spare batteries.');
    } else if (e.code === 'Tab') {
      e.preventDefault();
      this.openPause();
    }
  }

  update(dt: number) {
    const g = this.game;
    if (!this.inGame) return;
    const p = g.player;
    const bat = $('.bat', this.hud);
    bat.classList.toggle('hidden', !p.flashlight);
    ($('.bat .fill', this.hud) as HTMLElement).style.width = `${Math.round(p.battery * 100)}%`;
    const def = LEVELS[g.level];
    $('.level', this.hud).textContent = `${def.name} · ${def.subtitle}`;
    $('.fps', this.hud).textContent = settings.showFps ? `${Math.round(g.debug.fps)} FPS · ${g.debug.calls} DC` : '';
    const st = $('.stamina', this.hud);
    st.style.opacity = p.stamina < 0.98 ? '1' : '0';
    ($('i', st) as HTMLElement).style.width = `${p.stamina * 100}%`;
    $('.inv', this.hud).innerHTML = `<span><b>${profile.inventory.almond ?? 0}</b> Almond Water <i>Q</i></span><span><b>${profile.inventory.battery ?? 0}</b> Batteries <i>R</i></span>`;
    $('.talk', this.hud).classList.toggle('hidden', !(g.net?.pttDown || (settings.micMode === 'open' && g.net?.micOn)));
    const c = def.cell;
    const inBase = g.level === 0 && Math.abs(p.pos.x / c - 0.5) < 2.5 && Math.abs(p.pos.z / c - 0.5) < 2.5;
    $('.safe', this.hud).classList.toggle('hidden', !inBase);
    if (this.titleT > 0) {
      this.titleT -= dt;
      if (this.titleT <= 0) $('#title-card', this.hud).classList.remove('show');
    }
    if (this.chatFadeT > 0) {
      this.chatFadeT -= dt;
      if (this.chatFadeT <= 0 && !this.chatOpen) this.chatEl.classList.add('faded');
    }
  }
}
