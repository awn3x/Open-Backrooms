// Serverless P2P multiplayer (WebRTC via Trystero over public relays).
//  * Public worlds: region-sharded rooms (NA/SA/EU/AF/AS/OC), auto-overflow when full.
//  * Custom rooms: any name (+ optional password) -> shareable link.
// Each level has an authority (oldest peer id on that level) that simulates entities.

import * as THREE from 'three';
import { joinRoom, selfId, type Room } from 'trystero';
import type { Game } from '../Game';
import { Avatar } from '../entities/Avatar';
import type { EntitySnap, Target } from '../entities/EntityManager';
import { settings, profile } from '../core/Settings';
import { censor, sanitize } from '../ui/profanity';
import type { Voice } from '../audio/AudioEngine';

export const APP_ID = 'open-backrooms-v1';
export const MAX_PEERS = 8;

export type Region = 'NA' | 'SA' | 'EU' | 'AF' | 'AS' | 'OC';
export const REGION_NAMES: Record<Region, string> = { NA: 'North America', SA: 'South America', EU: 'Europe', AF: 'Africa', AS: 'Asia', OC: 'Oceania' };

export function detectRegion(): Region {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  if (/^America\/(Sao_Paulo|Argentina|Santiago|Bogota|Lima|Caracas|Montevideo|La_Paz|Asuncion|Guayaquil)/.test(tz)) return 'SA';
  if (tz.startsWith('America/') || tz.startsWith('US/') || tz.startsWith('Canada/')) return 'NA';
  if (tz.startsWith('Europe/') || tz === 'GMT' || tz.startsWith('Atlantic/')) return 'EU';
  if (tz.startsWith('Africa/')) return 'AF';
  if (tz.startsWith('Australia/') || tz.startsWith('Pacific/')) return 'OC';
  if (tz.startsWith('Asia/') || tz.startsWith('Indian/')) return 'AS';
  return 'EU';
}

export interface BoardPost {
  id: string;
  name: string;
  text: string;
  t: number;
  paid: number;
}

export function loadBoard(): BoardPost[] {
  try {
    return JSON.parse(localStorage.getItem('ob.board') || '[]');
  } catch {
    return [];
  }
}
function saveBoard(posts: BoardPost[]) {
  try {
    localStorage.setItem('ob.board', JSON.stringify(posts.slice(-80)));
  } catch {
    /* ignore */
  }
}

interface Peer {
  id: string;
  name: string;
  outfit: string;
  level: number;
  avatar: Avatar;
  pos: THREE.Vector3;
  target: THREE.Vector3;
  yaw: number;
  speed: number;
  crouch: boolean;
  flash: boolean;
  alive: boolean;
  lastSeen: number;
  voice?: { src: MediaStreamAudioSourceNode; gain: GainNode; panner: PannerNode; filter: BiquadFilterNode; el: HTMLAudioElement; level: AnalyserNode };
  talking: boolean;
  stepPhase: number;
  ping: number;
}

export class Net {
  room: Room | null = null;
  roomId = '';
  label = '';
  peers = new Map<string, Peer>();
  board: BoardPost[] = loadBoard();
  onChat?: (name: string, text: string, system?: boolean) => void;
  onBoard?: () => void;
  onPeers?: () => void;
  private sendPose!: (d: ArrayBuffer, o?: { target?: string }) => Promise<void>;
  private sendHello!: (d: Record<string, string | number>, o?: { target?: string }) => Promise<void>;
  private sendEnt!: (d: EntitySnap[]) => Promise<void>;
  private sendChatA!: (d: { n: string; t: string }) => Promise<void>;
  private sendBoardA!: (d: BoardPost[], o?: { target?: string }) => Promise<void>;
  private sendPickA!: (d: number) => Promise<void>;
  private poseT = 0;
  private entT = 0;
  private pingT = 0;
  private mic: MediaStream | null = null;
  pttDown = false;
  micOn = false;
  root = new THREE.Group();

  constructor(private game: Game) {
    game.scene.add(this.root);
    game.entities.remoteTargets = () => this.targets();
  }

  get selfId() {
    return selfId;
  }

  /** Join a room id; resolves with the number of peers seen after a short settle. */
  async join(roomId: string, label: string, password?: string): Promise<number> {
    this.leave();
    this.roomId = roomId;
    this.label = label;
    const room = joinRoom({ appId: APP_ID, password: password || undefined }, roomId);
    this.room = room;
    const [sendPose, getPose] = act<ArrayBuffer>(room, 'pose');
    const [sendHello, getHello] = act<Record<string, string | number>>(room, 'hello');
    const [sendEnt, getEnt] = act<EntitySnap[]>(room, 'ent');
    const [sendChat, getChat] = act<{ n: string; t: string }>(room, 'chat');
    const [sendBoard, getBoard] = act<BoardPost[]>(room, 'board');
    const [sendPick, getPick] = act<number>(room, 'pick');
    this.sendPose = sendPose;
    this.sendHello = sendHello;
    this.sendEnt = sendEnt;
    this.sendChatA = sendChat;
    this.sendBoardA = sendBoard;
    this.sendPickA = sendPick;

    room.onPeerJoin = (id) => {
      void this.sendHello(this.hello(), { target: id });
      void this.sendBoardA(this.board.slice(-40), { target: id });
      if (this.mic) room.addStream(this.mic, { target: id });
    };
    room.onPeerLeave = (id) => {
      const p = this.peers.get(id);
      if (p) {
        this.onChat?.('', `${p.name} disconnected.`, true);
        p.avatar.dispose();
        p.voice?.el.remove();
      }
      this.peers.delete(id);
      this.onPeers?.();
    };
    getHello((d, { peerId }) => {
      let p = this.peers.get(peerId);
      const name = sanitize(String(d.name ?? 'Wanderer'), 24);
      if (!p) {
        const av = new Avatar(name, true, String(d.outfit ?? 'hoodie_olive'));
        this.root.add(av.root);
        p = { id: peerId, name, outfit: String(d.outfit), level: Number(d.level) || 0, avatar: av, pos: new THREE.Vector3(), target: new THREE.Vector3(), yaw: 0, speed: 0, crouch: false, flash: false, alive: true, lastSeen: performance.now(), talking: false, stepPhase: 0, ping: 0 };
        this.peers.set(peerId, p);
        this.onChat?.('', `${name} joined.`, true);
        void this.sendHello(this.hello(), { target: peerId });
      }
      p.name = name;
      p.level = Number(d.level) || 0;
      this.onPeers?.();
    });
    getPose((buf, { peerId }) => {
      const p = this.peers.get(peerId);
      if (!p || !(buf instanceof ArrayBuffer) || buf.byteLength < 28) return;
      const f = new Float32Array(buf);
      p.target.set(f[0], f[6], f[1]);
      p.yaw = f[2];
      p.speed = f[3];
      const flags = f[4] | 0;
      p.crouch = !!(flags & 1);
      p.flash = !!(flags & 2);
      p.alive = !!(flags & 4);
      p.talking = !!(flags & 8);
      p.level = f[5] | 0;
      p.lastSeen = performance.now();
    });
    getEnt((snaps, { peerId }) => {
      if (this.authorityId() === peerId) void this.game.entities.applySnapshot(snaps);
    });
    getChat((d, { peerId }) => {
      const p = this.peers.get(peerId);
      if (!settings.chat) return;
      const text = sanitize(String(d.t ?? ''), 200);
      this.onChat?.(p?.name ?? 'someone', settings.profanityFilter ? censor(text) : text);
    });
    getBoard((posts) => {
      if (!Array.isArray(posts)) return;
      let changed = false;
      for (const bp of posts.slice(-80)) {
        if (!bp || typeof bp.id !== 'string' || this.board.some((b) => b.id === bp.id)) continue;
        this.board.push({ id: bp.id.slice(0, 40), name: sanitize(String(bp.name), 24), text: censor(sanitize(String(bp.text), 160)), t: Number(bp.t) || Date.now(), paid: Number(bp.paid) || 0 });
        changed = true;
      }
      if (changed) {
        this.board.sort((a, b) => a.t - b.t);
        saveBoard(this.board);
        this.onBoard?.();
      }
    });
    getPick((id) => this.game.objects?.consume(Number(id)));
    room.onPeerStream = (stream, peerId) => this.attachVoice(peerId, stream);

    await new Promise((r) => setTimeout(r, 3500));
    return this.peers.size;
  }

  /** Region matchmaking: fill shard 1, overflow to 2, 3, ... */
  async joinPublic(region: Region, onStatus?: (s: string) => void): Promise<string> {
    for (let shard = 1; shard <= 12; shard++) {
      const id = `public:${region}:${shard}`;
      onStatus?.(`Searching ${REGION_NAMES[region]} world #${shard}...`);
      const n = await this.join(id, `${REGION_NAMES[region]} #${shard}`);
      if (n < MAX_PEERS) return id;
    }
    return this.roomId;
  }

  leave() {
    for (const p of this.peers.values()) {
      p.avatar.dispose();
      p.voice?.el.remove();
    }
    this.peers.clear();
    void this.room?.leave();
    this.room = null;
  }

  private hello() {
    return { name: settings.name, outfit: profile.outfit, level: this.game.level, v: 1 };
  }

  peerNames() {
    return [...this.peers.values()].map((p) => p.name);
  }

  /** The authority for our current level: lowest id among peers on this level (incl. us). */
  authorityId(): string {
    const ids = [selfId, ...[...this.peers.values()].filter((p) => p.level === this.game.level).map((p) => p.id)];
    return ids.sort()[0];
  }

  targets(): Target[] {
    return [...this.peers.values()].filter((p) => p.level === this.game.level).map((p) => ({ id: p.id, x: p.pos.x, z: p.pos.z, alive: p.alive, lit: p.flash }));
  }

  onLevelChanged(_level: number) {
    void this.sendHello?.(this.hello());
  }

  sendStep(_loud: number) {
    /* remote footsteps are synthesised from pose speed */
  }

  sendPickup(id: number) {
    void this.sendPickA?.(id);
  }

  chat(text: string) {
    text = sanitize(text, 200);
    if (!text || !this.room) return;
    void this.sendChatA({ n: settings.name, t: text });
    this.onChat?.(settings.name, settings.profanityFilter ? censor(text) : text);
  }

  postBoard(text: string, paid: number) {
    const post: BoardPost = { id: selfId + ':' + Date.now().toString(36), name: settings.name, text: censor(sanitize(text, 160)), t: Date.now(), paid };
    this.board.push(post);
    saveBoard(this.board);
    void this.sendBoardA?.([post]);
    this.onBoard?.();
  }

  // ------------------------------------------------------------------ voice
  async enableMic(): Promise<boolean> {
    if (this.mic) return true;
    try {
      this.mic = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      for (const t of this.mic.getAudioTracks()) t.enabled = settings.micMode === 'open';
      this.room?.addStream(this.mic);
      this.micOn = true;
      return true;
    } catch {
      return false;
    }
  }

  setTalking(on: boolean) {
    if (!this.mic) return;
    const live = settings.micMode === 'open' || (settings.micMode === 'ptt' && on);
    for (const t of this.mic.getAudioTracks()) t.enabled = live;
    this.pttDown = on;
  }

  private attachVoice(peerId: string, stream: MediaStream) {
    const p = this.peers.get(peerId);
    if (!p) return;
    const ctx = this.game.audio.ctx;
    // Chrome only pulls remote WebRTC audio into WebAudio when an element plays it
    const el = document.createElement('audio');
    el.srcObject = stream;
    el.muted = true;
    void el.play().catch(() => {});
    document.body.appendChild(el);
    const src = ctx.createMediaStreamSource(stream);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 16000;
    const gain = ctx.createGain();
    const panner = ctx.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1.5;
    panner.maxDistance = 40;
    panner.rolloffFactor = 1.4;
    const level = ctx.createAnalyser();
    level.fftSize = 256;
    src.connect(level);
    src.connect(filter).connect(gain).connect(panner).connect(this.game.audio.buses.voice);
    const send = ctx.createGain();
    send.gain.value = 0.25;
    panner.connect(send).connect(this.game.audio.reverbIn);
    p.voice = { src, gain, panner, filter, el, level };
  }

  // ------------------------------------------------------------------ per frame
  update(dt: number) {
    if (!this.room) return;
    const g = this.game;
    const me = g.player;
    this.poseT -= dt;
    if (this.poseT <= 0) {
      this.poseT = 1 / 20;
      const f = new Float32Array([me.pos.x, me.pos.z, me.yaw, me.speed, (me.crouching ? 1 : 0) | (me.flashlight ? 2 : 0) | (me.alive ? 4 : 0) | (this.pttDown || settings.micMode === 'open' ? 8 : 0), g.level, me.pos.y]);
      void this.sendPose(f.buffer);
    }
    // entity authority
    const auth = this.authorityId() === selfId;
    g.entities.authority = auth;
    if (auth) {
      this.entT -= dt;
      if (this.entT <= 0) {
        this.entT = 0.1;
        if (this.peers.size) void this.sendEnt(g.entities.snapshot());
      }
    }
    this.pingT -= dt;
    const doPing = this.pingT <= 0;
    if (doPing) this.pingT = 3;
    const now = performance.now();
    for (const p of this.peers.values()) {
      if (doPing) void this.room.ping(p.id).then((ms) => (p.ping = ms)).catch(() => {});
      const same = p.level === g.level;
      p.avatar.root.visible = same && p.alive && now - p.lastSeen < 5000;
      if (p.pos.lengthSq() === 0) p.pos.copy(p.target);
      p.pos.lerp(p.target, Math.min(1, dt * 10));
      p.avatar.root.position.copy(p.pos);
      const dy = ((p.yaw + Math.PI - p.avatar.root.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      p.avatar.root.rotation.y += dy * Math.min(1, dt * 10);
      p.avatar.locomote(p.speed, p.crouch, dt);
      p.avatar.setFlashlight(p.flash && same);
      // remote footsteps
      if (same && p.speed > 0.3) {
        p.stepPhase += (p.speed * dt) / (p.speed > 3 ? 1.05 : 0.72);
        if (p.stepPhase >= 1) {
          p.stepPhase = 0;
          g.audio.play(g.surfaceAt(p.pos.x, p.pos.z), { pos: { x: p.pos.x, y: 0.1, z: p.pos.z }, gain: p.crouch ? 0.2 : p.speed > 3 ? 0.9 : 0.5, occlude: true, reverb: 0.3, hrtf: false });
        }
      }
      if (p.voice) {
        const t = g.audio.ctx.currentTime;
        p.voice.panner.positionX.setTargetAtTime(p.pos.x, t, 0.05);
        p.voice.panner.positionY.setTargetAtTime(1.6, t, 0.05);
        p.voice.panner.positionZ.setTargetAtTime(p.pos.z, t, 0.05);
        const clear = g.collider.los(me.pos.x, me.pos.z, p.pos.x, p.pos.z);
        p.voice.filter.frequency.setTargetAtTime(clear ? 16000 : 1100, t, 0.1);
        p.voice.gain.gain.setTargetAtTime(same ? (clear ? 1 : 0.6) : 0, t, 0.1);
      }
    }
  }
}

function act<T>(room: Room, name: string): [(d: T, o?: { target?: string }) => Promise<void>, (cb: (d: T, ctx: { peerId: string }) => void) => void] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a = room.makeAction<any>(name);
  return [(d, o) => a.send(d, o ? { target: o.target } : undefined), (cb) => (a.onMessage = (d: T, ctx: { peerId: string }) => cb(d, ctx))];
}

export type { Voice };
