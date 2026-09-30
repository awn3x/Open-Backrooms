// The game orchestrator: renderer, level lifecycle, main loop and the glue
// between world, player, audio, entities, networking and UI.

import * as THREE from 'three';
import { Input } from './core/Input';
import { settings, profile, saveProfile, earn } from './core/Settings';
import { PRESETS, detectQuality, DynamicRes, type Preset } from './core/Quality';
import { hashString, hash32, clamp, damp } from './core/rng';
import { LEVELS, type LevelDef } from './levels/levels';
import { ChunkManager } from './world/ChunkManager';
import { Collider } from './world/collision';
import { spawnPoint, Z_DARK, Z_WET, inHub } from './world/layout';
import { WU } from './render/materials';
import { Post } from './render/Post';
import { LightRig, powerAt } from './render/Lights';
import { Sparks } from './render/Sparks';
import { Player, type StepEvent } from './player/Player';
import { AudioEngine, type Voice } from './audio/AudioEngine';
import { loadProtos, setMaxAnisotropy } from './assets';
import type { Protos } from './world/mesher';
import { WorldObjects, HUB_CENTER, type Interactable } from './WorldObjects';
import { EntityManager, type Entity } from './entities/EntityManager';
import type { Net } from './net/Net';
import type { UI } from './ui/UI';
import { Bots } from './entities/Bots';

export type Mode = 'solo' | 'ai' | 'online';

export interface GameEvents {
  onDeath?: (by: string) => void;
  onEscape?: (level: number) => void;
  onLevel?: (def: LevelDef) => void;
}

/** Seconds into the catch when the image and sound cut to black; matches the hard cut in jumpscare_* sounds. */
const SCARE_CUT = 1.25;

export class Game {
  renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(78, 1, 0.04, 90);
  input: Input;
  audio = new AudioEngine();
  post!: Post;
  preset!: Preset;
  dyn!: DynamicRes;
  protos!: Protos;
  world: ChunkManager | null = null;
  collider!: Collider;
  player!: Player;
  lights!: LightRig;
  sparks: Sparks;
  objects: WorldObjects | null = null;
  entities: EntityManager;
  bots: Bots;
  net: Net | null = null;
  ui!: UI;
  mode: Mode = 'solo';
  roomSeed = 0;
  run = 0;
  level = 0;
  time = 0;
  levelTime = 0;
  running = false;
  paused = false;
  menuMode = false;
  sanity = 1;
  private clock = new THREE.Timer();
  private breathT = 0;
  private breathOut = -1;
  private ambience: Voice[] = [];
  private hum: (Voice | null)[] = [];
  private heartT = 0;
  private eventT = 8;
  private sparkT = 1;
  private coinDist = 0;
  private surviveT = 0;
  private powerEvt: { t: number; dir: number; r: number } | null = null;
  private fade = 1;
  /** active jumpscare: the entity that caught us and how far into it we are */
  private scare: { e: Entity; t: number; q0: THREE.Quaternion; cut: boolean } | null = null;
  // always in the scene (intensity 0 when idle) so a scare never triggers a shader recompile
  private scareLight = new THREE.PointLight(0xffe0c2, 0, 3.2, 2);
  private fadeTarget = 0;
  private transitioning = false;
  private nearIt: Interactable | null = null;
  events: GameEvents = {};
  debug = { fps: 0, calls: 0, tris: 0 };

  constructor(public canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', stencil: false });
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.info.autoReset = false;
    this.input = new Input(canvas);
    this.sparks = new Sparks(this.scene);
    this.scene.add(this.camera);
    this.scene.add(this.scareLight);
    this.entities = new EntityManager(this);
    this.bots = new Bots(this);
    window.addEventListener('resize', () => this.resize());
  }

  applyQuality() {
    const gl = this.renderer.getContext();
    const q = settings.quality === 'auto' ? detectQuality(gl) : settings.quality;
    this.preset = PRESETS[q];
    setMaxAnisotropy(Math.min(this.preset.aniso, this.renderer.capabilities.getMaxAnisotropy()));
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, this.preset.pixelRatioCap));
    this.dyn = new DynamicRes(this.preset.scale, Math.min(0.5, this.preset.scale));
    const s = { scale: this.preset.scale, blurSamples: settings.motionBlur > 0 ? this.preset.blurSamples : 0, blur: settings.motionBlur, bloom: this.preset.bloom, vhs: settings.vhs, grain: settings.grain, msaa: this.preset.msaa, ssao: this.preset.ssao };
    if (!this.post) this.post = new Post(this.renderer, s);
    else {
      this.post.s = s;
      this.post.buildComposite();
    }
    this.renderer.shadowMap.enabled = this.preset.shadows;
    this.resize();
    return q;
  }

  resize() {
    const w = innerWidth;
    const h = innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    const pr = this.renderer.getPixelRatio();
    this.post?.setSize(Math.round(w * pr), Math.round(h * pr));
  }

  async boot(progress: (f: number, label: string) => void) {
    progress(0.05, 'Starting renderer');
    this.applyQuality();
    progress(0.1, 'Loading models');
    this.protos = await loadProtos((f) => progress(0.1 + f * 0.4, 'Loading models'));
    progress(0.55, 'Loading sound');
    await this.audio.init();
    await this.audio.preload([
      'step_carpet', 'step_concrete', 'step_metal', 'step_water', 'land_carpet', 'land_concrete', 'land_metal', 'cloth',
      'breath_in', 'breath_out', 'breath_panic', 'heartbeat', 'hum', 'spark', 'tube_flicker', 'ballast_click',
      'ui_click', 'ui_hover', 'bottle_open', 'drink',
    ]);
    progress(0.8, 'Almost there');
    void this.audio.preload(['knock', 'slam', 'howl', 'running', 'drip', 'power_down', 'power_up', 'crawler_click', 'crawler_rasp', 'crawler_scream', 'crawler_step', 'watcher_drone', 'smiler_drone', 'smiler_hiss', 'sting_crawler', 'sting_watcher', 'sting_smiler', 'sting_mimic', 'jumpscare', 'door_open', 'hatch_open', 'elevator_ding', 'elevator_doors', 'pipe_groan', 'steam_hiss', 'dweller_knock', 'dweller_groan', 'tinnitus', 'outlet_buzz']);
    this.lights = new LightRig(this.scene, this.preset.lights, this.preset.shadows, this.preset.shadowSize);
    progress(1, 'Ready');
  }

  seedFor(level: number) {
    // in multiplayer every peer shares a world per level; solo runs differ each escape
    return this.mode === 'online' ? hash32(this.roomSeed, level) : hash32(this.roomSeed, level, this.run);
  }

  async start(mode: Mode, roomSeed: string | number, level = 0) {
    this.mode = mode;
    this.roomSeed = typeof roomSeed === 'number' ? roomSeed : hashString(roomSeed);
    this.running = true;
    await this.enterLevel(level);
    this.clock.reset();
    this.loop();
  }

  async enterLevel(level: number, at?: { x: number; z: number }) {
    this.transitioning = true;
    this.level = level;
    const def = LEVELS[level];
    // tear down
    this.world?.dispose();
    if (this.world) this.scene.remove(this.world.root);
    this.objects?.dispose();
    if (this.objects) this.scene.remove(this.objects.root);
    for (const a of this.ambience) a.stop(0.8);
    for (const h of this.hum) h?.stop(0.3);
    this.hum = [];
    this.powerEvt = null;
    WU.uPower.value.w = 0;

    const seed = this.seedFor(level);
    const world = new ChunkManager(seed, level, this.protos, this.preset.radius);
    await world.loadMaterials(this.preset.tier);
    this.world = world;
    this.scene.add(world.root);
    this.collider = new Collider(world.cache);
    if (!this.player) {
      this.player = new Player(this.camera, this.input, this.collider);
      this.player.onStep = (e) => this.footstep(e);
      this.player.onBump = (s) => this.audio.play('cloth', { gain: 0.3 * s, rate: 0.8 });
    }
    this.player.collider = this.collider;
    this.objects = new WorldObjects(world, this.collider);
    this.scene.add(this.objects.root);
    world.onChunkLoaded = (c) => void this.objects?.syncChunk(c);
    world.onChunkUnloaded = (c) => this.objects?.unloadChunk(c);
    await this.objects.buildHub();

    // level look
    WU.uLightCol.value.setRGB(...def.lightColor);
    WU.uAccentCol.value.setRGB(...def.accentColor);
    WU.uAmbient.value = def.ambient;
    WU.uFogCol.value.setRGB(...def.fogColor);
    WU.uBounceCol.value.setRGB(...def.bounceColor);
    WU.uFogDensity.value = def.fogDensity;
    WU.uWet.value = def.id === 1 ? 0.8 : def.id === 2 ? 0.3 : 0.25;
    const g = this.post.composite.uniforms;
    (g.uTint.value as THREE.Vector3).set(...def.grade.tint);
    g.uSat.value = def.grade.saturation;
    g.uContrast.value = def.grade.contrast;
    g.uLift.value = def.grade.lift;
    g.uExposure.value = def.exposure;
    this.post.vhs.uniforms.uHaze.value = def.id === 2 ? 0.6 : 0;
    const emitY = def.fixture === 'troffer' ? def.height - 0.08 : def.fixture === 'highbay' ? def.height - 1.3 : def.height - 0.2;
    this.lights.setLevel(emitY, WU.uLightCol.value);
    this.camera.far = def.id === 1 ? 120 : 80;

    const sp = at ?? (level === 0 ? { x: HUB_CENTER.x, z: HUB_CENTER.z } : spawnPoint(def, this.run));
    this.player.teleport(sp.x, sp.z, level === 0 ? Math.PI * 0.75 : 0);
    this.player.alive = true;
    this.player.frozen = false;
    await world.prime(sp.x, sp.z);

    // audio
    void this.audio.setReverb(def.audio.ir);
    await this.audio.preload([def.audio.amb]);
    const amb = this.audio.play(def.audio.amb, { loop: true, gain: 0.55, bus: 'amb' });
    this.ambience = [amb].filter(Boolean) as Voice[];
    this.hum = this.lights.slots.map(() => null);

    this.entities.setLevel(def, seed);
    this.bots.setLevel(def);
    this.levelTime = 0;
    this.sanity = Math.max(this.sanity, 0.6);
    this.post.resetHistory(this.camera);
    this.fade = 1;
    this.fadeTarget = 0;
    this.transitioning = false;
    this.events.onLevel?.(def);
    this.net?.onLevelChanged(level);
  }

  // ------------------------------------------------------------------ audio helpers
  surfaceAt(x: number, z: number): string {
    const def = LEVELS[this.level];
    if (!this.world) return 'step_carpet';
    const zone = this.world.cache.zone(Math.floor(x / def.cell), Math.floor(z / def.cell));
    if (def.surface === 'carpet') return zone === Z_WET && Math.random() < 0.5 ? 'step_water' : 'step_carpet';
    if (def.surface === 'concrete') return zone === Z_WET && Math.random() < 0.6 ? 'step_water' : 'step_concrete';
    return 'step_metal';
  }

  private footstep(e: StepEvent) {
    const def = LEVELS[this.level];
    const p = this.player.pos;
    if (e.landing) {
      this.audio.play(`land_${def.surface}`, { gain: 0.5 + 0.4 * e.loudness, reverb: 0.25 });
    } else {
      const name = this.surfaceAt(p.x, p.z);
      const g = (this.player.crouching ? 0.25 : this.player.sprinting ? 0.95 : 0.5) * (name === 'step_metal' ? 0.7 : 1);
      this.audio.play(name, { gain: g, rate: 0.94 + Math.random() * 0.12, pan: e.foot * 0.18, reverb: this.player.sprinting ? 0.3 : 0.18 });
      if (Math.random() < (this.player.sprinting ? 0.5 : 0.18)) this.audio.play('cloth', { gain: 0.12 + (this.player.sprinting ? 0.1 : 0), rate: 0.9 + Math.random() * 0.2 });
    }
    this.entities.noise(p.x, p.z, e.loudness * (e.landing ? 16 : 18), 'player');
    this.net?.sendStep(e.loudness);
  }

  // ------------------------------------------------------------------ loop
  private loop = () => {
    if (!this.running) return;
    requestAnimationFrame(this.loop);
    this.clock.update();
    const raw = this.clock.getDelta();
    this.debug.fps = this.debug.fps * 0.95 + (1 / Math.max(raw, 1e-3)) * 0.05;
    const dt = Math.min(raw, 1 / 20);
    this.frame(dt);
  };

  frame(dt: number) {
    const world = this.world;
    if (!world || this.transitioning) {
      this.input.endFrame();
      return;
    }
    this.time += dt;
    this.levelTime += dt;
    WU.uTime.value = this.time;
    const p = this.player;
    const inp = this.input;

    if (this.menuMode) {
      // slow cinematic drift through the base for the main menu
      p.frozen = true;
      p.update(dt);
      const t = this.time * 0.05;
      this.camera.position.set(HUB_CENTER.x + Math.cos(t) * 1.6, 1.55 + Math.sin(this.time * 0.7) * 0.015, HUB_CENTER.z + Math.sin(t) * 1.6);
      this.camera.rotation.set(0.02 + Math.sin(this.time * 0.31) * 0.02, -t * 1.6 + 2.2, Math.sin(this.time * 0.23) * 0.01, 'YXZ');
    } else if (!this.paused) {
      p.frozen = false;
      p.update(dt);
      // flashlight
      if (inp.hit('KeyF') || (inp.pad()?.flash && !this.lastPadFlash)) {
        p.flashlight = !p.flashlight;
        this.audio.play('ui_click', { gain: 0.5, rate: 0.6 });
      }
      this.lastPadFlash = !!inp.pad()?.flash;
      if (inp.hit('KeyE') || inp.hit('Mouse0') || inp.pad()?.use) this.interact();
    }

    world.update(p.pos.x, p.pos.z);
    world.updateStates(this.time);

    // flashlight rig follows the camera with a slight lag (hand-held)
    const fl = this.lights.flashlight;
    const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
    fl.position.copy(this.camera.position).addScaledVector(right, 0.18).add(new THREE.Vector3(0, -0.2, 0));
    const tgt = this.camera.position.clone().addScaledVector(fwd, 6);
    this.lights.flashTarget.position.lerp(tgt, damp(14, dt));
    const flick = p.battery < 0.15 ? (Math.random() < 0.1 ? 0.2 : 1) : 1;
    fl.intensity = p.flashlight ? 38 * flick * (0.4 + 0.6 * Math.min(1, p.battery * 3)) : 0;
    const pro = profile.flashlight === 'torch_pro';
    if (pro) fl.intensity *= 1.5;
    if (p.flashlight) p.battery = Math.max(0, p.battery - dt / (pro ? 840 : 420));
    if (p.battery <= 0) p.flashlight = false;

    // power-down events
    this.updatePower(dt);

    this.lights.update(world, this.camera, dt, this.time, 1);
    WU.uCamE.value = world.sampleE(p.pos.x, p.pos.z) * powerAt(p.pos.x, p.pos.z) + (p.flashlight ? 0.25 : 0);

    // gameplay
    const def = LEVELS[this.level];
    const gx = Math.floor(p.pos.x / def.cell);
    const gz = Math.floor(p.pos.z / def.cell);
    const zone = world.cache.zone(gx, gz);
    const safe = inHub(this.level, gx, gz);
    const light = WU.uCamE.value;
    this.entities.update(dt, safe || this.menuMode);
    this.bots.update(dt);
    const threat = this.entities.threat(p.pos);
    // sanity: drains in the dark and near entities, recovers in light & the hub
    const dark = light < 0.15 || zone === Z_DARK;
    this.sanity = clamp(this.sanity + dt * (safe ? 0.05 : dark ? -0.006 : 0.0015) - dt * threat * 0.03, 0, 1);
    p.fear = clamp(threat * 1.2 + (1 - this.sanity) * 0.5 + (dark && !p.flashlight ? 0.15 : 0), 0, 1);
    this.post.composite.uniforms.uDesat.value = (1 - this.sanity) * 0.5;
    this.post.vhs.uniforms.uGlitch.value = Math.max(0, threat - 0.6) * 0.6 + (this.sanity < 0.2 ? 0.1 * Math.random() : 0);
    if (this.scare) this.updateScare(dt);

    // coins for surviving and exploring (never for real money)
    if (!safe && p.alive && !this.menuMode) {
      this.coinDist += p.speed * dt;
      this.surviveT += dt;
      if (this.coinDist > 60) {
        this.coinDist = 0;
        earn(1 + this.level, 'exploring');
      }
      if (this.surviveT > 90) {
        this.surviveT = 0;
        earn(2 + this.level, 'survived');
      }
    }

    this.objects?.update(this.time);
    const near = this.objects?.nearest(p.pos) ?? null;
    if (near !== this.nearIt) {
      this.nearIt = near;
      this.ui?.prompt(near ? near.label : null, near?.kind);
    }

    this.updateAudio(dt, zone, safe, threat);
    this.sparks.update(dt);
    this.net?.update(dt);

    // fades
    this.fade += (this.fadeTarget - this.fade) * Math.min(1, dt * 2.5);
    this.post.composite.uniforms.uFade.value = this.fade;

    // dynamic resolution
    if (this.dyn.sample(dt)) {
      this.post.s.scale = this.dyn.scale;
      this.resize();
    }
    this.renderer.info.reset();
    this.post.render(this.scene, this.camera, this.time);
    this.debug.calls = this.renderer.info.render.calls;
    this.debug.tris = this.renderer.info.render.triangles;
    this.ui?.update(dt);
    this.audio.updateListener(this.camera, dt);
    inp.endFrame();
  }
  private lastPadFlash = false;

  private updateAudio(dt: number, zone: number, safe: boolean, threat: number) {
    const p = this.player;
    // breathing: only when winded or frightened; each breath is a separate take, paced by exertion
    const winded = clamp(((1 - p.stamina) - 0.25) / 0.75, 0, 1);
    const scared = clamp((p.fear - 0.35) / 0.65, 0, 1);
    const need = Math.max(winded, scared);
    if (need > 0.02 && p.alive && !this.menuMode) {
      this.breathT -= dt;
      const period = 2.8 - need * 1.9;
      if (this.breathT <= 0) {
        this.breathT = period * (0.9 + Math.random() * 0.2);
        this.breathOut = period * 0.42;
        this.audio.play('breath_in', { gain: 0.08 + need * 0.2, rate: 0.96 + Math.random() * 0.08 });
      }
      if (this.breathOut > 0) {
        this.breathOut -= dt;
        if (this.breathOut <= 0) this.audio.play(scared > 0.5 && Math.random() < 0.5 ? 'breath_panic' : 'breath_out', { gain: 0.1 + need * 0.24, rate: 0.95 + Math.random() * 0.08 });
      }
    } else this.breathT = Math.min(this.breathT, 0.4);
    // heartbeat
    if (p.fear > 0.35 && p.alive) {
      this.heartT -= dt;
      if (this.heartT <= 0) {
        this.heartT = 60 / (70 + p.fear * 80);
        this.audio.play('heartbeat', { gain: (p.fear - 0.3) * 0.9 });
      }
    }
    // fluorescent hum follows the realtime light slots
    this.lights.slots.forEach((s, i) => {
      let v = this.hum[i];
      if (!v && s.key >= 0) {
        v = this.audio.play('hum', { loop: true, gain: 0, pos: s.light.position, bus: 'amb', hrtf: false, refDistance: 1.0, maxDistance: 18, rate: 0.98 + ((s.key % 7) / 7) * 0.05 });
        this.hum[i] = v;
      }
      if (v) {
        v.setPos(s.light.position.x, s.light.position.y, s.light.position.z);
        const lvl = LEVELS[this.level].id === 0 ? 0.1 : 0.06;
        v.gain.gain.setTargetAtTime(s.light.intensity > 0.01 ? lvl * Math.min(1, s.light.intensity / 6) : 0, this.audio.ctx.currentTime, 0.05);
      }
    });
    // random flicker ticks from nearby flickering lights
    if (Math.random() < dt * 0.4) {
      const s = this.lights.slots[Math.floor(Math.random() * this.lights.slots.length)];
      if (s.key >= 0 && s.light.intensity < 3 && s.light.intensity > 0.05) this.audio.play('tube_flicker', { pos: s.light.position, gain: 0.35, reverb: 0.2 });
    }
    // sparking outlets nearby
    this.sparkT -= dt;
    if (this.sparkT <= 0 && this.world) {
      this.sparkT = 0.8 + Math.random() * 2.5;
      for (const c of this.world.chunks.values())
        for (const s of c.sparks) {
          const d = Math.hypot(s.x - p.pos.x, s.z - p.pos.z);
          if (d < 14 && Math.random() < 0.35) {
            this.sparks.burst(s.x, s.y + 0.02, s.z, s.nx, s.nz, 10 + Math.floor(Math.random() * 25));
            this.audio.play('spark', { pos: { x: s.x, y: s.y, z: s.z }, gain: 0.8, reverb: 0.3, occlude: true });
            this.entities.noise(s.x, s.z, 6, 'spark');
          }
        }
    }
    // distant events
    this.eventT -= dt;
    if (this.eventT <= 0 && !safe) {
      this.eventT = 14 + Math.random() * 30;
      const lvl = LEVELS[this.level].id;
      const pool = lvl === 2 ? ['pipe_groan', 'steam_hiss', 'dweller_knock', 'drip', 'knock', 'slam'] : lvl === 1 ? ['drip', 'slam', 'howl', 'knock', 'running'] : ['knock', 'slam', 'howl', 'running', 'knock', 'drip'];
      const name = pool[Math.floor(Math.random() * pool.length)];
      const a = Math.random() * Math.PI * 2;
      const r = 10 + Math.random() * 20;
      this.audio.play(name, { pos: { x: p.pos.x + Math.cos(a) * r, y: 1.5, z: p.pos.z + Math.sin(a) * r }, gain: 0.8, refDistance: 6, maxDistance: 80, reverb: 0.5 });
      if (Math.random() < 0.12 && lvl !== 2 && this.levelTime > 90) this.startPowerDown();
    }
    void zone;
    void threat;
  }

  startPowerDown() {
    if (this.powerEvt) return;
    this.powerEvt = { t: 0, dir: -1, r: 70 };
    this.audio.play('power_down', { gain: 0.9, reverb: 0.4 });
    WU.uPower.value.set(this.player.pos.x, this.player.pos.z, 70, 1);
  }

  private updatePower(dt: number) {
    const e = this.powerEvt;
    if (!e) return;
    e.t += dt;
    const P = WU.uPower.value;
    if (e.dir < 0) {
      e.r = Math.max(-5, e.r - dt * 45);
      if (e.t > 9) {
        e.dir = 1;
        e.t = 0;
        P.x = this.player.pos.x;
        P.y = this.player.pos.z;
        this.audio.play('power_up', { gain: 0.8, reverb: 0.4 });
      }
    } else {
      e.r += dt * 30;
      if (e.r > 90) {
        this.powerEvt = null;
        P.w = 0;
        return;
      }
    }
    P.z = e.r;
  }

  // ------------------------------------------------------------------ interaction
  interact() {
    const it = this.nearIt;
    if (!it) return;
    this.audio.resume();
    switch (it.kind) {
      case 'pickup': {
        this.objects?.consume(it.data as number);
        profile.inventory.almond = (profile.inventory.almond ?? 0) + 1;
        saveProfile();
        this.audio.play('bottle_open', { gain: 0.5 });
        earn(3, 'almond water');
        this.ui?.toast('Almond Water +1');
        this.net?.sendPickup(it.data as number);
        break;
      }
      case 'exit':
        void this.useExit();
        break;
      case 'shop':
      case 'locker':
      case 'board':
        this.ui?.openPanel(it.kind);
        break;
      case 'couch':
        this.sanity = Math.min(1, this.sanity + 0.3);
        this.ui?.toast('You rest for a moment. The hum is almost comforting.');
        break;
    }
  }

  drinkAlmond() {
    if ((profile.inventory.almond ?? 0) <= 0) return false;
    profile.inventory.almond--;
    saveProfile();
    this.sanity = Math.min(1, this.sanity + 0.45);
    this.player.stamina = 1;
    this.audio.play('drink', { gain: 0.6 });
    return true;
  }

  async useExit() {
    if (this.transitioning) return;
    const def = LEVELS[this.level];
    this.player.frozen = true;
    this.audio.play(def.exit === 'door' ? 'door_open' : def.exit === 'hatch' ? 'hatch_open' : 'elevator_ding', { gain: 0.9, reverb: 0.3 });
    if (def.exit === 'elevator') setTimeout(() => this.audio.play('elevator_doors', { gain: 0.7 }), 600);
    const reward = 25 + def.id * 20 + Math.max(0, Math.round(60 - this.levelTime / 10));
    earn(reward, `escaped ${def.name}`);
    this.fadeTarget = 1;
    await new Promise((r) => setTimeout(r, 1800));
    this.events.onEscape?.(this.level);
    if (this.level < LEVELS.length - 1) await this.enterLevel(this.level + 1);
    else {
      profile.escapes++;
      if (!profile.bestTime || this.time < profile.bestTime) profile.bestTime = this.time;
      saveProfile();
      earn(100, 'reached the surface?');
      this.run++;
      this.ui?.showEnding();
      await this.enterLevel(0);
    }
  }

  async die(by: string, ent?: Entity) {
    if (!this.player.alive) return;
    this.player.alive = false;
    this.player.frozen = true;
    profile.deaths++;
    profile.inventory = {}; // carried items are lost; the locker keeps what you stored
    saveProfile();
    this.post.composite.uniforms.uFadeCol.value.setRGB(0, 0, 0);
    // everything else drops out; the catch sound has its own loud bus and cuts itself at SCARE_CUT
    this.audio.hush(0.04);
    this.audio.play('jumpscare', { gain: 1, bus: 'sting' });
    if (ent) {
      this.scare = { e: ent, t: 0, q0: this.camera.quaternion.clone(), cut: false };
      this.entities.held = ent;
      ent.visible = 1;
      ent.obj.visible = true;
      ent.obj.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) (m.material as THREE.MeshStandardMaterial).opacity = 1;
      });
      ent.play(ent.actions.has('grab') ? 'grab' : ent.actions.has('lunge') ? 'lunge' : ent.actions.has('run') ? 'run' : 'walk', 0.05, true);
      this.ui?.root.classList.add('scaring');
      // timed in game time so the picture and the sound's hard cut stay together even at low frame rates
      await this.until(() => !this.scare || this.scare.cut);
      this.ui?.root.classList.remove('scaring');
      this.events.onDeath?.(by);
      await this.until(() => !this.scare || this.scare.t >= SCARE_CUT + 1.5);
    } else {
      this.events.onDeath?.(by);
      this.post.vhs.uniforms.uGlitch.value = 1;
      this.fadeTarget = 1;
      await new Promise((r) => setTimeout(r, 2600));
    }
    this.endScare();
    this.run++;
    this.sanity = 0.8;
    this.ui?.toast('You wake up back at the base.');
    await this.enterLevel(0);
  }

  private until(cond: () => boolean) {
    return new Promise<void>((res) => {
      const tick = () => (cond() ? res() : setTimeout(tick, 30));
      tick();
    });
  }

  /** test hook: freeze the jumpscare timeline so frames can be inspected */
  debugHoldScare = false;

  /** The catch: snap to face it, it lunges into your face, impact flash + shake, then a hard cut to black. */
  private updateScare(dt: number) {
    const s = this.scare!;
    if (!this.debugHoldScare) s.t += dt;
    const cam = this.camera;
    const e = s.e;
    const u = this.post.vhs.uniforms;
    const calm = settings.reduceFlashes;
    if (s.t >= SCARE_CUT) {
      if (!s.cut) {
        s.cut = true;
        this.fade = this.fadeTarget = 1;
        this.post.composite.uniforms.uFade.value = 1;
        this.audio.hush(0.02);
        this.scareLight.intensity = 0;
        e.obj.visible = false;
      }
      u.uShock.value = 0;
      u.uGlitch.value = 0;
      return;
    }
    // horizontal direction to where it caught us (or straight ahead if it's round a corner)
    const eye = cam.position.clone();
    const dir = new THREE.Vector3(e.pos.x - eye.x, 0, e.pos.z - eye.z);
    const seen = dir.lengthSq() > 0.01 && dir.lengthSq() < 16 && this.collider.los(eye.x, eye.z, e.pos.x, e.pos.z);
    if (!seen) dir.set(0, 0, -1).applyQuaternion(s.q0).setY(0);
    dir.normalize();
    const DIST: Record<string, number> = { crawler: 0.5, dweller: 0.55, watcher: 0.7, smiler: 0.5, mimic: 0.45 };
    const rush = 1 - Math.min(1, s.t / 0.16);
    const dist = (DIST[e.kind] ?? 0.5) + 1.1 * rush * rush;
    // quadrupeds rear up at you so you get the face, not the back
    const rear = e.kind === 'crawler' || e.kind === 'dweller' ? -1.15 * Math.min(1, s.t / 0.2) - 0.25 : 0;
    e.obj.position.set(eye.x + dir.x * dist, 0, eye.z + dir.z * dist);
    e.obj.rotation.set(rear, Math.atan2(-dir.x, -dir.z), 0, 'YXZ');
    if (e.kind === 'smiler') e.obj.position.y = eye.y - 0.1;
    e.obj.updateMatrixWorld(true);
    const headBone = e.obj.getObjectByName('head');
    const head = headBone ? headBone.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0.08, 0)) : e.obj.position.clone();
    if (headBone) {
      // move the whole body so its face sits `dist` in front of our eyes; tall ones keep their height
      const want = new THREE.Vector3(eye.x + dir.x * dist, e.kind === 'watcher' ? head.y : eye.y - 0.03, eye.z + dir.z * dist);
      const off = want.clone().sub(head);
      e.obj.position.add(off);
      head.copy(want);
    }
    // camera snaps onto its face (120 ms), then gets shaken
    const m = new THREE.Matrix4().lookAt(eye, head, new THREE.Vector3(0, 1, 0));
    const qt = new THREE.Quaternion().setFromRotationMatrix(m);
    const k = Math.min(1, s.t / 0.12);
    cam.quaternion.copy(s.q0).slerp(qt, 1 - (1 - k) ** 3);
    const shake = (calm ? 0.35 : 1) * (0.25 + 0.75 * Math.max(0, 1 - s.t / SCARE_CUT));
    const j = () => (Math.random() - 0.5) * 2;
    cam.position.add(new THREE.Vector3(j(), j(), j()).multiplyScalar(0.03 * shake));
    cam.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(j() * 0.03 * shake, j() * 0.03 * shake, j() * 0.05 * shake)));
    cam.fov = settings.fov - 14 * Math.min(1, s.t / 0.08);
    cam.updateProjectionMatrix();
    // light its face from just in front of us, flickering
    this.scareLight.position.copy(eye).addScaledVector(dir, 0.25).add(new THREE.Vector3(0, 0.25, 0));
    this.scareLight.intensity = (calm ? 3 : 4) + Math.random() * (calm ? 1 : 5);
    u.uShock.value = calm ? 0 : s.t < 0.07 ? 1 : Math.max(0, 0.35 - s.t) * 0.6;
    u.uGlitch.value = 0.35 + 0.65 * Math.max(0, 1 - s.t / 0.5);
    this.fadeTarget = 0;
  }

  private endScare() {
    if (this.scare) this.scare.e.obj.visible = true;
    this.scare = null;
    this.entities.held = null;
    this.scareLight.intensity = 0;
    this.post.vhs.uniforms.uShock.value = 0;
  }
}
