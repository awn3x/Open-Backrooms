// Web Audio engine: buses, convolution reverb per level, HRTF spatial sources
// with wall occlusion, a positional fluorescent-hum field and body sounds.

import * as THREE from 'three';
import { assetUrl, audioExt, loadAudioManifest, type AudioManifest } from '../assets';
import { settings } from '../core/Settings';

export interface PlayOpts {
  pos?: THREE.Vector3 | { x: number; y: number; z: number };
  gain?: number;
  rate?: number;
  loop?: boolean;
  reverb?: number;
  bus?: 'sfx' | 'amb' | 'ui' | 'voice' | 'sting';
  hrtf?: boolean;
  refDistance?: number;
  maxDistance?: number;
  variant?: number;
  occlude?: boolean;
  pan?: number;
}

export interface Voice {
  src: AudioBufferSourceNode;
  gain: GainNode;
  panner?: PannerNode;
  filter?: BiquadFilterNode;
  pos?: THREE.Vector3;
  occlude: boolean;
  sting?: boolean;
  baseGain: number;
  stop: (fade?: number) => void;
  setPos: (x: number, y: number, z: number) => void;
}

export class AudioEngine {
  ctx: AudioContext;
  master: GainNode;
  buses: Record<string, GainNode> = {};
  reverb: ConvolverNode;
  reverbIn: GainNode;
  private duckGain: GainNode;
  private stingOut: GainNode;
  private buffers = new Map<string, AudioBuffer>();
  private loading = new Map<string, Promise<AudioBuffer | null>>();
  private manifest: AudioManifest = {};
  private ext = audioExt();
  voices = new Set<Voice>();
  losFn: ((ax: number, az: number, bx: number, bz: number) => boolean) | null = null;
  private listenerPos = new THREE.Vector3();
  private occlT = 0;

  constructor() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AC({ latencyHint: 'interactive' });
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    comp.attack.value = 0.005;
    comp.release.value = 0.2;
    this.master = this.ctx.createGain();
    this.master.connect(comp).connect(this.ctx.destination);
    // ambience runs through a ducker so scares can pull the room out from under you
    this.duckGain = this.ctx.createGain();
    this.duckGain.connect(this.master);
    for (const b of ['sfx', 'amb', 'ui', 'voice']) {
      const g = this.ctx.createGain();
      g.connect(b === 'amb' ? this.duckGain : this.master);
      this.buses[b] = g;
    }
    // stingers and jumpscares: their own hard limiter, bypassing the master compressor so hits stay loud
    const lim = this.ctx.createDynamicsCompressor();
    lim.threshold.value = -2;
    lim.knee.value = 0;
    lim.ratio.value = 20;
    lim.attack.value = 0.001;
    lim.release.value = 0.08;
    this.stingOut = this.ctx.createGain();
    this.buses.sting = this.ctx.createGain();
    this.buses.sting.connect(lim).connect(this.stingOut).connect(this.ctx.destination);
    this.reverb = this.ctx.createConvolver();
    this.reverbIn = this.ctx.createGain();
    const rvOut = this.ctx.createGain();
    rvOut.gain.value = 0.9;
    this.reverbIn.connect(this.reverb).connect(rvOut).connect(this.buses.sfx);
    this.applyVolumes();
  }

  applyVolumes() {
    this.master.gain.value = settings.master;
    this.buses.sfx.gain.value = settings.sfx;
    this.buses.amb.gain.value = settings.ambience;
    this.buses.voice.gain.value = settings.voice;
    this.buses.ui.gain.value = 0.8;
    this.buses.sting.gain.value = settings.sfx;
    this.stingOut.gain.value = settings.master;
  }

  /** Pull ambience (room tone, hum) down by `depth` (0..1), hold, then recover. */
  duck(depth: number, attack = 0.15, hold = 1, release = 2.5) {
    const g = this.duckGain.gain;
    const t = this.ctx.currentTime;
    g.cancelScheduledValues(t);
    g.setValueAtTime(g.value, t);
    g.linearRampToValueAtTime(1 - depth, t + attack);
    g.setValueAtTime(1 - depth, t + attack + hold);
    g.linearRampToValueAtTime(1, t + attack + hold + release);
  }

  /** Silence everything except stingers (the jumpscare's hard cut). */
  hush(fade = 0.08) {
    for (const v of this.voices) if (!v.sting) v.stop(fade);
  }

  async init() {
    this.manifest = await loadAudioManifest();
  }

  resume() {
    if (this.ctx.state !== 'running') void this.ctx.resume();
  }

  variants(name: string): string[] {
    return this.manifest[name] ?? [name];
  }

  load(file: string): Promise<AudioBuffer | null> {
    const b = this.buffers.get(file);
    if (b) return Promise.resolve(b);
    let p = this.loading.get(file);
    if (!p) {
      p = fetch(assetUrl(`audio/${file}.${this.ext}`))
        .then((r) => r.arrayBuffer())
        .then((a) => this.ctx.decodeAudioData(a))
        .then((buf) => {
          this.buffers.set(file, buf);
          return buf;
        })
        .catch(() => null);
      this.loading.set(file, p);
    }
    return p;
  }

  async preload(names: string[]) {
    await Promise.all(names.flatMap((n) => this.variants(n).map((f) => this.load(f))));
  }

  async setReverb(ir: string) {
    const b = await this.load(ir);
    if (b) this.reverb.buffer = b;
  }

  /** Play a (random variant of a) sound. Returns null if not loaded yet. */
  play(name: string, o: PlayOpts = {}): Voice | null {
    const vs = this.variants(name);
    const file = vs[o.variant ?? Math.floor(Math.random() * vs.length)] ?? name;
    const buf = this.buffers.get(file);
    if (!buf) {
      void this.load(file);
      return null;
    }
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = !!o.loop;
    src.playbackRate.value = o.rate ?? 1;
    const gain = ctx.createGain();
    const base = o.gain ?? 1;
    gain.gain.value = base;
    let node: AudioNode = src;
    let filter: BiquadFilterNode | undefined;
    if (o.occlude) {
      filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 20000;
      node.connect(filter);
      node = filter;
    }
    node.connect(gain);
    let panner: PannerNode | undefined;
    let out: AudioNode = gain;
    if (o.pos) {
      panner = ctx.createPanner();
      panner.panningModel = o.hrtf === false ? 'equalpower' : 'HRTF';
      panner.distanceModel = 'inverse';
      panner.refDistance = o.refDistance ?? 1.2;
      panner.maxDistance = o.maxDistance ?? 60;
      panner.rolloffFactor = 1.2;
      panner.positionX.value = o.pos.x;
      panner.positionY.value = o.pos.y;
      panner.positionZ.value = o.pos.z;
      gain.connect(panner);
      out = panner;
    } else if (o.pan) {
      const sp = ctx.createStereoPanner();
      sp.pan.value = o.pan;
      gain.connect(sp);
      out = sp;
    }
    out.connect(this.buses[o.bus ?? 'sfx']);
    if (o.reverb) {
      const send = ctx.createGain();
      send.gain.value = o.reverb;
      out.connect(send).connect(this.reverbIn);
    }
    src.start();
    const v: Voice = {
      src,
      gain,
      panner,
      filter,
      pos: o.pos ? new THREE.Vector3(o.pos.x, o.pos.y, o.pos.z) : undefined,
      occlude: !!o.occlude,
      sting: o.bus === 'sting',
      baseGain: base,
      stop: (fade = 0.05) => {
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(0, t + fade);
        try {
          src.stop(t + fade + 0.02);
        } catch {
          /* already stopped */
        }
      },
      setPos: (x, y, z) => {
        if (!panner) return;
        const t = ctx.currentTime;
        panner.positionX.setTargetAtTime(x, t, 0.03);
        panner.positionY.setTargetAtTime(y, t, 0.03);
        panner.positionZ.setTargetAtTime(z, t, 0.03);
        v.pos?.set(x, y, z);
      },
    };
    this.voices.add(v);
    src.onended = () => this.voices.delete(v);
    if (o.occlude && v.pos) this.occludeVoice(v);
    return v;
  }

  private occludeVoice(v: Voice) {
    if (!v.filter || !v.pos || !this.losFn) return;
    const L = this.listenerPos;
    const clear = this.losFn(L.x, L.z, v.pos.x, v.pos.z);
    const t = this.ctx.currentTime;
    v.filter.frequency.setTargetAtTime(clear ? 18000 : 900, t, 0.08);
    v.gain.gain.setTargetAtTime(v.baseGain * (clear ? 1 : 0.55), t, 0.08);
  }

  updateListener(cam: THREE.Camera, dt: number) {
    const l = this.ctx.listener;
    const p = cam.position;
    this.listenerPos.copy(p);
    const f = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
    const u = new THREE.Vector3(0, 1, 0).applyQuaternion(cam.quaternion);
    const t = this.ctx.currentTime;
    if (l.positionX) {
      l.positionX.setTargetAtTime(p.x, t, 0.01);
      l.positionY.setTargetAtTime(p.y, t, 0.01);
      l.positionZ.setTargetAtTime(p.z, t, 0.01);
      l.forwardX.setTargetAtTime(f.x, t, 0.01);
      l.forwardY.setTargetAtTime(f.y, t, 0.01);
      l.forwardZ.setTargetAtTime(f.z, t, 0.01);
      l.upX.setTargetAtTime(u.x, t, 0.01);
      l.upY.setTargetAtTime(u.y, t, 0.01);
      l.upZ.setTargetAtTime(u.z, t, 0.01);
    } else {
      (l as unknown as { setPosition: (...a: number[]) => void }).setPosition(p.x, p.y, p.z);
      (l as unknown as { setOrientation: (...a: number[]) => void }).setOrientation(f.x, f.y, f.z, u.x, u.y, u.z);
    }
    this.occlT += dt;
    if (this.occlT > 0.12) {
      this.occlT = 0;
      for (const v of this.voices) if (v.occlude) this.occludeVoice(v);
    }
  }

  stopAll() {
    for (const v of this.voices) v.stop(0.3);
  }
}

/** Looping bed that crossfades between named layers by weight. */
export class LayerBed {
  voices = new Map<string, Voice>();
  constructor(
    private a: AudioEngine,
    private names: string[],
    private bus: 'sfx' | 'amb' = 'sfx',
  ) {}
  update(weights: Record<string, number>) {
    for (const n of this.names) {
      const w = weights[n] ?? 0;
      let v = this.voices.get(n);
      if (!v && w > 0.01) {
        v = this.a.play(n, { loop: true, gain: 0, bus: this.bus }) ?? undefined;
        if (v) this.voices.set(n, v);
      }
      if (v) v.gain.gain.setTargetAtTime(w, this.a.ctx.currentTime, 0.4);
    }
  }
  stop() {
    for (const v of this.voices.values()) v.stop(0.5);
    this.voices.clear();
  }
}
