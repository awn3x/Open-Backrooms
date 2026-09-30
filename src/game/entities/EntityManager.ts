// Entities + tension director. The session authority (solo player, or the
// multiplayer host for a level) simulates; other peers interpolate snapshots.

import * as THREE from 'three';
import { clone as skClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import type { Game } from '../Game';
import type { EntityKind, LevelDef } from '../levels/levels';
import { loadGLTF } from '../assets';
import { patchEntityMaterial } from '../render/materials';
import { blobShadow } from '../render/blob';
import { findPath } from './Pathfinding';
import { inHub, Z_DARK } from '../world/layout';
import { clamp, damp, Rng } from '../core/rng';

export interface Target {
  id: string;
  x: number;
  z: number;
  alive: boolean;
  lit: boolean; // flashlight on
  bot?: boolean;
}

export interface EntitySnap {
  i: number;
  k: EntityKind;
  x: number;
  z: number;
  y: number;
  a: string;
  v: number;
  m?: string;
}

const KIND_MODEL: Record<EntityKind, string> = { crawler: 'crawler', dweller: 'dweller', watcher: 'watcher', smiler: 'smiler', mimic: 'avatar' };
const KIND_COLOR: Record<EntityKind, number> = { crawler: 0xc9c0b6, dweller: 0x6b4e40, watcher: 0x1a1a1c, smiler: 0x000000, mimic: 0xffffff };

class Entity {
  obj: THREE.Object3D;
  mixer: THREE.AnimationMixer | null = null;
  actions = new Map<string, THREE.AnimationAction>();
  anim = '';
  pos = new THREE.Vector3();
  yaw = 0;
  state: 'wander' | 'investigate' | 'chase' | 'stalk' | 'lunge' | 'flee' | 'lurk' = 'wander';
  path: [number, number][] = [];
  pathT = 0;
  goal: { x: number; z: number } | null = null;
  target: Target | null = null;
  timer = 0;
  life = 0;
  seen = 0;
  voice: import('../audio/AudioEngine').Voice | null = null;
  visible = 1;
  stepT = 0;
  twitchT = 0;
  netTarget = new THREE.Vector3();
  mimicName = '';
  constructor(
    public id: number,
    public kind: EntityKind,
    obj: THREE.Object3D,
    clips: THREE.AnimationClip[],
  ) {
    this.obj = obj;
    if (clips.length) {
      this.mixer = new THREE.AnimationMixer(obj);
      for (const c of clips) this.actions.set(c.name, this.mixer.clipAction(c));
    }
  }
  play(name: string, fade = 0.25, once = false) {
    if (this.anim === name || !this.actions.has(name)) return;
    const next = this.actions.get(name)!;
    next.reset();
    if (once) {
      next.setLoop(THREE.LoopOnce, 1);
      next.clampWhenFinished = true;
    }
    next.play();
    const prev = this.actions.get(this.anim);
    if (prev) prev.crossFadeTo(next, fade, false);
    this.anim = name;
  }
}

export class EntityManager {
  root = new THREE.Group();
  list: Entity[] = [];
  def: LevelDef | null = null;
  authority = true;
  private rng = new Rng(1);
  private nextId = 1;
  private spawnT = 60;
  private tension = 0;
  private templates = new Map<string, { scene: THREE.Object3D; clips: THREE.AnimationClip[] }>();
  private noiseEvents: { x: number; z: number; r: number; t: number }[] = [];
  private frustum = new THREE.Frustum();
  private tmpM = new THREE.Matrix4();
  remoteTargets: () => Target[] = () => [];
  onChase?: () => void;

  constructor(private game: Game) {
    game.scene.add(this.root);
  }

  async template(kind: EntityKind) {
    const name = KIND_MODEL[kind];
    let t = this.templates.get(name);
    if (!t) {
      const g = await loadGLTF(name);
      g.scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        m.castShadow = true;
        m.frustumCulled = false;
        const mats = Array.isArray(m.material) ? m.material : [m.material];
        const pm = mats.map((mm) => {
          const s = (mm as THREE.MeshStandardMaterial).clone();
          if (m.geometry.getAttribute('color')) s.vertexColors = true;
          if (!s.name.startsWith('Glow') && !['Teeth', 'Mouth', 'EyeVoid'].includes(s.name)) s.color.set(KIND_COLOR[kind]);
          if (kind === 'watcher') s.roughness = 0.3;
          if (s.name.startsWith('Glow')) {
            s.emissiveIntensity = 6;
            s.toneMapped = false;
          }
          return patchEntityMaterial(s);
        });
        m.material = pm.length === 1 ? pm[0] : pm;
      });
      t = { scene: g.scene, clips: g.animations };
      this.templates.set(name, t);
    }
    return t;
  }

  setLevel(def: LevelDef, seed: number) {
    for (const e of this.list) this.remove(e);
    this.list = [];
    this.def = def;
    this.rng = new Rng(seed ^ 0x5eed);
    this.spawnT = def.id === 0 ? 75 : 35;
    this.tension = 0;
    for (const k of def.entities) void this.template(k);
  }

  private remove(e: Entity) {
    this.root.remove(e.obj);
    e.voice?.stop(0.5);
    e.mixer?.stopAllAction();
  }

  noise(x: number, z: number, r: number, _src: string) {
    this.noiseEvents.push({ x, z, r, t: 3 });
  }

  targets(): Target[] {
    const p = this.game.player;
    const out: Target[] = [{ id: 'me', x: p.pos.x, z: p.pos.z, alive: p.alive, lit: p.flashlight }];
    out.push(...this.remoteTargets());
    out.push(...this.game.bots.targets());
    return out;
  }

  /** 0..1 how threatened the local player should feel */
  threat(pos: THREE.Vector3): number {
    let t = 0;
    for (const e of this.list) {
      if (e.visible < 0.2) continue;
      const d = Math.hypot(e.pos.x - pos.x, e.pos.z - pos.z);
      const los = this.game.collider.los(pos.x, pos.z, e.pos.x, e.pos.z);
      const base = e.state === 'chase' || e.state === 'lunge' ? 1 : 0.55;
      t = Math.max(t, base * clamp(1 - d / (los ? 22 : 10), 0, 1));
    }
    return t;
  }

  private cellOf(x: number, z: number) {
    const c = this.def!.cell;
    return [Math.floor(x / c), Math.floor(z / c)] as const;
  }

  private visibleToCamera(p: THREE.Vector3, h = 1.2): boolean {
    const cam = this.game.camera;
    this.tmpM.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.tmpM);
    const s = new THREE.Sphere(new THREE.Vector3(p.x, h, p.z), 0.6);
    if (!this.frustum.intersectsSphere(s)) return false;
    return this.game.collider.los(cam.position.x, cam.position.z, p.x, p.z);
  }

  private async spawn(kind: EntityKind, x: number, z: number) {
    const t = await this.template(kind);
    const obj = t.clips.length ? skClone(t.scene) : t.scene.clone(true);
    const e = new Entity(this.nextId++, kind, obj, t.clips);
    e.pos.set(x, 0, z);
    obj.position.copy(e.pos);
    if (kind !== 'smiler') obj.add(blobShadow(kind === 'watcher' ? 0.45 : 0.7, kind === 'watcher' ? 0.35 : 0.5));
    this.root.add(obj);
    this.list.push(e);
    e.play(kind === 'watcher' || kind === 'mimic' ? 'idle' : 'idle');
    const snd = kind === 'crawler' || kind === 'dweller' ? 'crawler_rasp' : kind === 'watcher' ? 'watcher_drone' : kind === 'smiler' ? 'smiler_drone' : null;
    if (snd) e.voice = this.game.audio.play(snd, { loop: true, pos: e.pos, gain: kind === 'watcher' ? 0.5 : 0.7, refDistance: kind === 'watcher' ? 3 : 1.5, maxDistance: 40, occlude: true, reverb: 0.3 });
    if (kind === 'mimic') {
      const names = this.game.net?.peerNames() ?? [];
      e.mimicName = names.length ? names[Math.floor(Math.random() * names.length)] : this.game.bots.names()[0] ?? 'Wanderer';
    }
    return e;
  }

  /** Pick a spawn cell out of sight, 14-30 m from the player, never in the hub. */
  private spawnSpot(needDark = false): { x: number; z: number } | null {
    const def = this.def!;
    const p = this.game.player.pos;
    const cache = this.game.world!.cache;
    for (let i = 0; i < 40; i++) {
      const a = this.rng.range(0, Math.PI * 2);
      const r = this.rng.range(14, 30);
      const x = p.x + Math.cos(a) * r;
      const z = p.z + Math.sin(a) * r;
      const [gx, gz] = this.cellOf(x, z);
      if (inHub(def.id, gx, gz)) continue;
      const cx = (gx + 0.5) * def.cell;
      const cz = (gz + 0.5) * def.cell;
      if (this.game.collider.los(p.x, p.z, cx, cz) && !needDark) continue;
      if (needDark && cache.zone(gx, gz) !== Z_DARK && this.game.world!.sampleE(cx, cz) > 0.08) continue;
      if (!findPath(cache, gx, gz, Math.floor(p.x / def.cell), Math.floor(p.z / def.cell), (x2, z2) => inHub(def.id, x2, z2), 900)) continue;
      return { x: cx, z: cz };
    }
    return null;
  }

  private director(dt: number, playerSafe: boolean) {
    const def = this.def!;
    const g = this.game;
    this.tension = clamp(this.tension + dt * (playerSafe ? -0.05 : 0.004 + def.id * 0.002), 0, 1);
    this.spawnT -= dt;
    const max = playerSafe ? 0 : 1 + Math.floor(this.tension * (2 + def.id)) + Math.max(0, this.remoteTargets().length > 0 ? 1 : 0);
    if (this.spawnT <= 0 && this.list.length < max) {
      this.spawnT = this.rng.range(25, 55) * (1.2 - this.tension * 0.6);
      const p = g.player.pos;
      const [gx, gz] = this.cellOf(p.x, p.z);
      const dark = g.world!.cache.zone(gx, gz) === Z_DARK || g.world!.sampleE(p.x, p.z) < 0.08;
      let kinds = def.entities.filter((k) => k !== 'smiler' || dark);
      if (!dark) kinds = kinds.filter((k) => k !== 'smiler');
      const kind = this.rng.pick(kinds);
      const spot = this.spawnSpot(kind === 'smiler');
      if (spot) void this.spawn(kind, spot.x, spot.z);
    }
    // despawn far or old entities
    for (const e of [...this.list]) {
      const d = Math.hypot(e.pos.x - g.player.pos.x, e.pos.z - g.player.pos.z);
      if (d > 60 || (e.life > 150 && e.state !== 'chase') || (playerSafe && e.life > 20 && d > 12)) {
        this.remove(e);
        this.list.splice(this.list.indexOf(e), 1);
      }
    }
  }

  update(dt: number, playerSafe: boolean) {
    if (!this.def || !this.game.world) return;
    for (const n of this.noiseEvents) n.t -= dt;
    this.noiseEvents = this.noiseEvents.filter((n) => n.t > 0);
    if (this.authority) this.director(dt, playerSafe);
    const targets = this.targets();
    for (const e of this.list) {
      e.life += dt;
      if (this.authority) this.think(e, dt, targets);
      else {
        e.pos.lerp(e.netTarget, damp(8, dt));
      }
      // presentation
      e.obj.position.copy(e.pos);
      const dy = ((e.yaw - e.obj.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      e.obj.rotation.y += dy * Math.min(1, dt * (e.state === 'chase' ? 12 : 5));
      e.obj.visible = e.visible > 0.05;
      if (e.mixer) {
        // crawlers move in unsettling stop-motion bursts
        e.twitchT -= dt;
        if ((e.kind === 'crawler' || e.kind === 'dweller') && e.state !== 'chase' && e.twitchT > 0) {
          /* hold pose */
        } else e.mixer.update(dt);
        if (e.twitchT < -0.3 && Math.random() < dt * 0.8) e.twitchT = 0.08 + Math.random() * 0.25;
      }
      if (e.kind === 'smiler') {
        e.obj.position.y = 1.4 + Math.sin(e.life * 1.3) * 0.05;
        e.obj.lookAt(this.game.camera.position.x, e.obj.position.y, this.game.camera.position.z);
        e.obj.scale.setScalar(0.9 + e.visible * 0.1);
        e.obj.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.isMesh) (m.material as THREE.MeshStandardMaterial).opacity = e.visible;
        });
      }
      e.voice?.setPos(e.pos.x, 1.2, e.pos.z);
      // lethal contact for the local player
      const me = this.game.player;
      if (me.alive && e.visible > 0.5) {
        const d = Math.hypot(e.pos.x - me.pos.x, e.pos.z - me.pos.z);
        const reach = e.kind === 'watcher' ? 1.1 : e.kind === 'smiler' ? 0.9 : 0.85;
        const [gx, gz] = this.cellOf(me.pos.x, me.pos.z);
        if (d < reach && (e.state === 'chase' || e.state === 'lunge' || e.kind === 'watcher') && !inHub(this.def.id, gx, gz)) {
          void this.game.die(e.kind);
          this.game.camera.lookAt(e.pos.x, 1.3, e.pos.z);
        }
      }
    }
  }

  private moveAlong(e: Entity, speed: number, dt: number) {
    const def = this.def!;
    const cache = this.game.world!.cache;
    e.pathT -= dt;
    if (e.goal && (e.pathT <= 0 || !e.path.length)) {
      e.pathT = 0.6;
      const [sx, sz] = this.cellOf(e.pos.x, e.pos.z);
      const [tx, tz] = this.cellOf(e.goal.x, e.goal.z);
      e.path = findPath(cache, sx, sz, tx, tz, (x, z) => inHub(def.id, x, z), 1500) ?? [];
      if (e.path.length > 1) e.path.shift();
    }
    let wx: number;
    let wz: number;
    if (e.path.length > 0) {
      const [cx, cz] = e.path[0];
      wx = (cx + 0.5) * def.cell;
      wz = (cz + 0.5) * def.cell;
      const [gx, gz] = this.cellOf(e.pos.x, e.pos.z);
      if (gx === cx && gz === cz && Math.hypot(wx - e.pos.x, wz - e.pos.z) < def.cell * 0.45) e.path.shift();
      if (e.path.length === 0 && e.goal) {
        wx = e.goal.x;
        wz = e.goal.z;
      }
    } else if (e.goal) {
      wx = e.goal.x;
      wz = e.goal.z;
    } else return 0;
    const dx = wx - e.pos.x;
    const dz = wz - e.pos.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.05) return 0;
    const step = Math.min(d, speed * dt);
    const nx = e.pos.x + (dx / d) * step;
    const nz = e.pos.z + (dz / d) * step;
    const r = this.game.collider.resolve(nx, nz, 0.3);
    e.pos.x = r.x;
    e.pos.z = r.z;
    e.yaw = Math.atan2(dx, dz);
    return step / dt;
  }

  private think(e: Entity, dt: number, targets: Target[]) {
    const def = this.def!;
    const g = this.game;
    const alive = targets.filter((t) => t.alive && !inHub(def.id, ...this.cellOf(t.x, t.z)));
    let nearest: Target | null = null;
    let nd = Infinity;
    for (const t of alive) {
      const d = Math.hypot(t.x - e.pos.x, t.z - e.pos.z);
      if (d < nd) {
        nd = d;
        nearest = t;
      }
    }
    const losTo = (t: Target) => g.collider.los(e.pos.x, e.pos.z, t.x, t.z);

    switch (e.kind) {
      case 'crawler':
      case 'dweller':
      case 'mimic': {
        const chaseSpeed = e.kind === 'mimic' ? 4.6 : e.kind === 'dweller' ? 4.2 : 4.0;
        if (nearest && nd < (e.kind === 'dweller' ? 16 : 20) && losTo(nearest) && (nd < 7 || nearest.lit || g.world!.sampleE(nearest.x, nearest.z) > 0.12)) {
          if (e.kind === 'mimic' && e.state !== 'chase' && nd > 4) {
            // mimics walk toward you like a person would, then turn
            e.state = 'stalk';
          } else {
            if (e.state !== 'chase') {
              g.audio.play(e.kind === 'mimic' ? 'static_burst' : 'crawler_scream', { pos: e.pos, gain: 0.9, reverb: 0.4, occlude: true });
              if (nearest.id === 'me') g.audio.play('sting_spot', { gain: 0.55 });
              this.onChase?.();
            }
            e.state = 'chase';
            e.target = nearest;
            e.timer = 6;
          }
        }
        if (e.state === 'stalk' && nearest) {
          e.goal = { x: nearest.x, z: nearest.z };
          const sp = this.moveAlong(e, 1.35, dt);
          e.play(sp > 0.2 ? 'walk' : 'idle');
          if (nd < 4.5) e.state = 'chase';
          break;
        }
        if (e.state === 'chase' && e.target) {
          const t = alive.find((a) => a.id === e.target!.id);
          if (!t) {
            e.state = 'wander';
            break;
          }
          e.goal = { x: t.x, z: t.z };
          if (losTo(t)) e.timer = 6;
          e.timer -= dt;
          const dd = Math.hypot(t.x - e.pos.x, t.z - e.pos.z);
          if (dd < 2.2 && e.kind !== 'mimic') e.play('lunge', 0.1, true);
          else e.play(e.kind === 'mimic' ? 'run' : 'crawl', 0.15);
          const sp = this.moveAlong(e, chaseSpeed, dt);
          if (e.mixer && e.kind !== 'mimic') e.mixer.timeScale = 0.6 + sp / 2.5;
          e.stepT -= dt * (sp / 1.2);
          if (e.stepT <= 0) {
            e.stepT = 1;
            g.audio.play('crawler_step', { pos: e.pos, gain: 0.7, occlude: true, reverb: 0.3 });
          }
          if (e.timer <= 0) {
            e.state = 'investigate';
            e.goal = { x: t.x, z: t.z };
          }
          break;
        }
        // hearing
        for (const n of this.noiseEvents) {
          if (Math.hypot(n.x - e.pos.x, n.z - e.pos.z) < n.r) {
            e.state = 'investigate';
            e.goal = { x: n.x, z: n.z };
            e.timer = 10;
          }
        }
        if (e.state === 'investigate') {
          e.timer -= dt;
          const sp = this.moveAlong(e, 2.2, dt);
          e.play(e.kind === 'mimic' ? 'walk' : 'crawl');
          if (e.mixer && e.kind !== 'mimic') e.mixer.timeScale = 0.5 + sp / 3;
          if (e.timer <= 0 || (e.goal && Math.hypot(e.goal.x - e.pos.x, e.goal.z - e.pos.z) < 1)) e.state = 'wander';
          if (Math.random() < dt * 0.5) g.audio.play('crawler_click', { pos: e.pos, gain: 0.6, occlude: true });
          break;
        }
        // wander
        if (!e.goal || Math.hypot(e.goal.x - e.pos.x, e.goal.z - e.pos.z) < 1 || Math.random() < dt * 0.05) {
          const a = this.rng.range(0, Math.PI * 2);
          e.goal = { x: e.pos.x + Math.cos(a) * 10, z: e.pos.z + Math.sin(a) * 10 };
          // drift toward players over time so encounters happen
          if (nearest && Math.random() < 0.5) e.goal = { x: (e.goal.x + nearest.x) / 2, z: (e.goal.z + nearest.z) / 2 };
        }
        const sp = this.moveAlong(e, e.kind === 'mimic' ? 1.1 : 1.0, dt);
        e.play(sp > 0.2 ? (e.kind === 'mimic' ? 'walk' : 'crawl') : 'idle');
        if (e.mixer && e.kind !== 'mimic') e.mixer.timeScale = sp > 0.2 ? 0.5 : 1;
        if (Math.random() < dt * 0.15) g.audio.play(e.kind === 'dweller' ? 'dweller_knock' : 'crawler_click', { pos: e.pos, gain: 0.5, occlude: true, reverb: 0.4 });
        break;
      }
      case 'watcher': {
        // moves only when no one is looking
        const watched = this.visibleToCamera(e.pos, 1.6) || this.remoteTargets().some((t) => t.lit && Math.hypot(t.x - e.pos.x, t.z - e.pos.z) < 15 && losTo(t));
        if (nearest) {
          e.goal = { x: nearest.x, z: nearest.z };
          if (!watched) {
            this.moveAlong(e, nd > 10 ? 4.5 : 2.6, dt);
            e.play('walk', 0.1);
            e.state = 'chase';
          } else {
            e.play('idle', 0.05);
            e.yaw = Math.atan2(nearest.x - e.pos.x, nearest.z - e.pos.z);
            e.seen += dt;
            if (e.seen > 0.5 && e.seen < 0.6) g.audio.play('sting_spot', { gain: 0.35, rate: 0.7 });
          }
        }
        if (e.life > 70 && watched === false && nd > 18) e.life = 999;
        break;
      }
      case 'smiler': {
        // lurks in the dark; being lit makes it charge
        if (!nearest) break;
        const tl = g.world!.sampleE(e.pos.x, e.pos.z);
        const litOn = alive.find((t) => t.lit && Math.hypot(t.x - e.pos.x, t.z - e.pos.z) < 14 && losTo(t));
        const pointed = litOn && litOn.id === 'me' ? this.visibleToCamera(e.pos, 1.4) : !!litOn;
        if (tl > 0.2 && e.state !== 'chase') e.visible = Math.max(0, e.visible - dt);
        else e.visible = Math.min(1, e.visible + dt * 0.5);
        if (pointed) e.seen += dt;
        else e.seen = Math.max(0, e.seen - dt * 0.5);
        if (e.seen > 1.2 && e.state !== 'chase') {
          e.state = 'chase';
          e.target = litOn!;
          e.timer = 7;
          g.audio.play('smiler_hiss', { pos: e.pos, gain: 1, reverb: 0.4 });
          if (litOn!.id === 'me') g.audio.play('sting_spot', { gain: 0.6 });
        }
        if (e.state === 'chase' && e.target) {
          const t = alive.find((a) => a.id === e.target!.id);
          if (t) {
            e.goal = { x: t.x, z: t.z };
            this.moveAlong(e, 5.2, dt);
          }
          e.timer -= dt;
          if (e.timer <= 0) e.state = 'lurk';
        } else {
          e.state = 'lurk';
          // hover at the edge of the light, keep distance
          if (nd < 6) {
            e.goal = { x: e.pos.x + (e.pos.x - nearest.x), z: e.pos.z + (e.pos.z - nearest.z) };
            this.moveAlong(e, 1.2, dt);
          }
        }
        if (e.visible <= 0 && e.life > 5) e.life = 999;
        break;
      }
    }
  }

  // ------------------------------------------------------------------ networking
  snapshot(): EntitySnap[] {
    return this.list.map((e) => ({ i: e.id, k: e.kind, x: +e.pos.x.toFixed(2), z: +e.pos.z.toFixed(2), y: +e.yaw.toFixed(2), a: e.anim, v: +e.visible.toFixed(2), m: e.mimicName || undefined }));
  }

  async applySnapshot(snaps: EntitySnap[]) {
    const ids = new Set(snaps.map((s) => s.i));
    for (const e of [...this.list])
      if (!ids.has(e.id)) {
        this.remove(e);
        this.list.splice(this.list.indexOf(e), 1);
      }
    for (const s of snaps) {
      let e = this.list.find((x) => x.id === s.i);
      if (!e) {
        e = await this.spawn(s.k, s.x, s.z);
        this.nextId--;
        e.id = s.i;
      }
      e.netTarget.set(s.x, 0, s.z);
      e.yaw = s.y;
      e.visible = s.v;
      if (s.a) e.play(s.a);
      e.state = s.a === 'crawl' || s.a === 'run' || s.a === 'lunge' ? 'chase' : 'wander';
    }
  }
}
