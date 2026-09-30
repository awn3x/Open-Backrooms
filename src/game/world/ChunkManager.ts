// Streams chunks around the player: asks the worker for geometry + light field,
// uploads them into shared atlases, spawns unique objects and pickups.

import * as THREE from 'three';
import { CHUNK, LEVELS, type LevelDef } from '../levels/levels';
import { LayoutCache, L_FLICKER, L_ON, type ChunkLayout, type LightFix, type Pickup, type ExitInfo } from './layout';
import { LM_MAX, lmTexels } from './lightfield';
import type { ChunkMeshes, GeoData, Protos } from './mesher';
import { WU, makeWorldMaterial } from '../render/materials';
import { loadTexSet, loadTexture, type Tier } from '../assets';
import { hash01 } from '../core/rng';

export interface LoadedChunk {
  cx: number;
  cz: number;
  slot: number;
  group: THREE.Group;
  layout: ChunkLayout;
  lightmap: Uint8Array;
  sparks: { x: number; y: number; z: number; nx: number; nz: number }[];
}

function toGeometry(g: GeoData): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(g.pos, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(g.nrm, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(g.uv, 2));
  if (g.col) geo.setAttribute('color', new THREE.BufferAttribute(g.col, 4));
  if (g.mat) geo.setAttribute('aMat', new THREE.BufferAttribute(g.mat, 4));
  geo.setIndex(new THREE.BufferAttribute(g.idx, 1));
  geo.computeBoundingSphere();
  return geo;
}

export class ChunkManager {
  readonly def: LevelDef;
  readonly cache: LayoutCache;
  readonly root = new THREE.Group();
  readonly chunks = new Map<number, LoadedChunk>();
  private pending = new Set<number>();
  private workers: Worker[] = [];
  private rr = 0;
  private slots: number;
  private lmAtlas: THREE.DataTexture;
  private tileAtlas: THREE.DataTexture | null = null;
  private chunkState: THREE.DataTexture;
  private dirtyLM = false;
  private dirtyTiles = false;
  private mats!: Record<string, THREE.Material>;
  radius: number;
  onChunkLoaded?: (c: LoadedChunk) => void;
  onChunkUnloaded?: (c: LoadedChunk) => void;
  private gen = 0;

  constructor(
    public seed: number,
    public level: number,
    protos: Protos,
    radius: number,
  ) {
    this.def = LEVELS[level];
    this.cache = new LayoutCache(seed, level, 400);
    this.radius = radius;
    this.slots = radius * 2 + 3;
    const { R, T, S } = lmTexels(level);
    const A = this.slots * R;
    this.lmAtlas = new THREE.DataTexture(new Uint8Array(A * A * 4), A, A, THREE.RGBAFormat);
    this.lmAtlas.magFilter = THREE.LinearFilter;
    this.lmAtlas.minFilter = THREE.LinearFilter;
    this.lmAtlas.needsUpdate = true;
    WU.uLM.value = this.lmAtlas;
    WU.uLMInfo.value.set(S, this.slots, R, T);
    this.chunkState = new THREE.DataTexture(new Uint8Array(this.slots * this.slots * 4).fill(255), this.slots, this.slots, THREE.RGBAFormat);
    this.chunkState.needsUpdate = true;
    WU.uChunkState.value = this.chunkState;
    if (this.def.tile > 0) {
      const tpc = CHUNK * Math.round(this.def.cell / this.def.tile);
      const A2 = this.slots * tpc;
      this.tileAtlas = new THREE.DataTexture(new Uint8Array(A2 * A2), A2, A2, THREE.RedFormat);
      this.tileAtlas.magFilter = THREE.NearestFilter;
      this.tileAtlas.minFilter = THREE.NearestFilter;
      this.tileAtlas.needsUpdate = true;
      WU.uTileTex.value = this.tileAtlas;
      WU.uTileInfo.value.set(this.def.tile, tpc, this.slots, 1);
    } else {
      WU.uTileInfo.value.w = 0;
      WU.uTileTex.value = this.chunkState;
    }
    WU.uWallH.value = this.def.height;
    const n = Math.min(3, Math.max(1, (navigator.hardwareConcurrency || 4) - 2));
    for (let i = 0; i < n; i++) {
      const w = new Worker(new URL('./worldgen.worker.ts', import.meta.url), { type: 'module' });
      w.postMessage({ type: 'protos', protos });
      w.onmessage = (e) => this.onMessage(e.data);
      this.workers.push(w);
    }
  }

  async loadMaterials(tier: Tier) {
    const d = this.def;
    const [wall, floor, ceil, lens, decals] = await Promise.all([
      loadTexSet(d.tex.wall, tier),
      loadTexSet(d.tex.floor, tier),
      d.tex.ceil ? loadTexSet(d.tex.ceil, tier) : Promise.resolve(null),
      loadTexture(`textures/${tier}/l0_lens.webp`, true, false),
      loadTexture(`textures/${tier}/decals.webp`, true, false),
    ]);
    const pipeSet = d.id === 2 ? await loadTexSet('l2_pipe', tier) : null;
    const ceilSet = ceil ?? wall;
    this.mats = {
      walls: makeWorldMaterial('wall', wall),
      floor: makeWorldMaterial('floor', floor),
      ceil: makeWorldMaterial('ceil', ceilSet, d.tile > 0 ? {} : { color: new THREE.Color(0.7, 0.7, 0.7) }),
      plenum: makeWorldMaterial('plenum', {}, { color: 0x050505 }),
      lens: makeWorldMaterial('lens', { map: lens }),
      props: makeWorldMaterial('prop'),

      decals: makeWorldMaterial('decal', { map: decals }),
      pipes: makeWorldMaterial('pipe', pipeSet ?? {}),
    };
    if (d.tile > 0) {
      // ceiling atlas texture must not repeat-wrap between variants
      for (const t of [ceil!.map, ceil!.normalMap, ceil!.orm]) t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    }
  }

  key(cx: number, cz: number) {
    return LayoutCache.key(cx, cz);
  }

  slotOf(cx: number, cz: number) {
    const s = this.slots;
    return (((cz % s) + s) % s) * s + (((cx % s) + s) % s);
  }

  /** Stream chunks around a world position. */
  update(x: number, z: number): number {
    const S = CHUNK * this.def.cell;
    const pcx = Math.floor(x / S);
    const pcz = Math.floor(z / S);
    const R = this.radius;
    const want: [number, number, number][] = [];
    for (let dz = -R; dz <= R; dz++)
      for (let dx = -R; dx <= R; dx++) {
        const cx = pcx + dx;
        const cz = pcz + dz;
        // distance from player to chunk rectangle
        const qx = Math.max(cx * S - x, 0, x - (cx + 1) * S);
        const qz = Math.max(cz * S - z, 0, z - (cz + 1) * S);
        const d = Math.hypot(qx, qz);
        if (d > R * S * 0.92) continue;
        const k = this.key(cx, cz);
        if (!this.chunks.has(k) && !this.pending.has(k)) want.push([d, cx, cz]);
      }
    want.sort((a, b) => a[0] - b[0]);
    for (const [, cx, cz] of want.slice(0, 4 - Math.min(this.pending.size, 4))) this.request(cx, cz);
    // unload
    for (const [k, c] of this.chunks) {
      const cd = Math.max(Math.abs(c.cx - pcx), Math.abs(c.cz - pcz));
      if (cd > R + 1) this.unload(k);
      else {
        // tiny props only matter up close (and fog hides them anyway)
        const sm = c.group.getObjectByName('small');
        if (sm) {
          const qx = Math.max(c.cx * S - x, 0, x - (c.cx + 1) * S);
          const qz = Math.max(c.cz * S - z, 0, z - (c.cz + 1) * S);
          sm.visible = Math.hypot(qx, qz) < 18;
        }
      }
    }
    if (this.dirtyLM) {
      this.lmAtlas.needsUpdate = true;
      this.dirtyLM = false;
    }
    if (this.dirtyTiles && this.tileAtlas) {
      this.tileAtlas.needsUpdate = true;
      this.dirtyTiles = false;
    }
    return want.length + this.pending.size;
  }

  private request(cx: number, cz: number) {
    const k = this.key(cx, cz);
    this.pending.add(k);
    const w = this.workers[this.rr++ % this.workers.length];
    w.postMessage({ type: 'chunk', seed: this.seed, level: this.level, cx, cz, id: this.gen });
  }

  /** Force-load the 3x3 around a position synchronously-ish (used at spawn). */
  async prime(x: number, z: number): Promise<void> {
    await new Promise<void>((res) => {
      const tick = () => {
        if (this.update(x, z) === 0) res();
        else setTimeout(tick, 30);
      };
      tick();
    });
  }

  private onMessage(msg: { type: string; id: number; seed: number; level: number; cx: number; cz: number; layout: ChunkLayout; meshes: ChunkMeshes; lightmap: Uint8Array }) {
    if (msg.type !== 'chunk' || msg.seed !== this.seed || msg.level !== this.level || msg.id !== this.gen) return;
    const k = this.key(msg.cx, msg.cz);
    this.pending.delete(k);
    if (this.chunks.has(k)) return;
    const slot = this.slotOf(msg.cx, msg.cz);
    for (const [ok, oc] of this.chunks) if (oc.slot === slot) this.unload(ok);
    this.cache.put(msg.layout);
    const group = new THREE.Group();
    group.name = `chunk ${msg.cx},${msg.cz}`;
    for (const [name, g] of Object.entries(msg.meshes)) {
      if (!g) continue;
      const mat = name === 'small' ? this.mats.props : this.mats[name];
      if (!mat) continue;
      const mesh = new THREE.Mesh(toGeometry(g), mat);
      mesh.matrixAutoUpdate = false;
      mesh.name = name;
      if (name === 'decals') mesh.renderOrder = 1;
      mesh.castShadow = name === 'walls' || name === 'props' || name === 'pipes';
      mesh.receiveShadow = true;
      group.add(mesh);
    }
    // write light field + tiles into atlases
    const { R } = lmTexels(this.level);
    const A = this.slots * R;
    const sx = slot % this.slots;
    const sz = Math.floor(slot / this.slots);
    const dst = this.lmAtlas.image.data as Uint8Array;
    for (let v = 0; v < R; v++) dst.set(msg.lightmap.subarray(v * R * 4, (v + 1) * R * 4), ((sz * R + v) * A + sx * R) * 4);
    this.dirtyLM = true;
    if (this.tileAtlas && msg.layout.tiles) {
      const T = Math.round(Math.sqrt(msg.layout.tiles.length));
      const A2 = this.slots * T;
      const td = this.tileAtlas.image.data as Uint8Array;
      for (let v = 0; v < T; v++) td.set(msg.layout.tiles.subarray(v * T, (v + 1) * T), (sz * T + v) * A2 + sx * T);
      this.dirtyTiles = true;
    }
    const sparks = msg.layout.props.filter((p) => p.spark).map((p) => ({ x: p.x, y: p.y, z: p.z, nx: Math.sin(p.rot), nz: Math.cos(p.rot) }));
    const lc: LoadedChunk = { cx: msg.cx, cz: msg.cz, slot, group, layout: msg.layout, lightmap: msg.lightmap, sparks };
    this.chunks.set(k, lc);
    this.root.add(group);
    this.onChunkLoaded?.(lc);
  }

  private unload(k: number) {
    const c = this.chunks.get(k);
    if (!c) return;
    this.root.remove(c.group);
    c.group.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh && m.geometry) m.geometry.dispose();
    });
    this.chunks.delete(k);
    this.onChunkUnloaded?.(c);
  }

  /** per-frame: flicker states per chunk slot */
  updateStates(time: number) {
    const d = this.chunkState.image.data as Uint8Array;
    for (const c of this.chunks.values()) {
      d[c.slot * 4] = Math.round(flicker(c.cx, c.cz, time) * 255);
    }
    this.chunkState.needsUpdate = true;
  }

  /** Light field energy at a point (CPU sample of the baked map). */
  sampleE(x: number, z: number): number {
    const { R, T, S } = lmTexels(this.level);
    const cx = Math.floor(x / S);
    const cz = Math.floor(z / S);
    const c = this.chunks.get(this.key(cx, cz));
    if (!c) return 0;
    const u = Math.min(R - 1, Math.max(0, Math.floor(1 + ((x - cx * S) / S) * T)));
    const v = Math.min(R - 1, Math.max(0, Math.floor(1 + ((z - cz * S) / S) * T)));
    const k = (v * R + u) * 4;
    const f = flicker(cx, cz, WU.uTime.value);
    const r = c.lightmap[k] / 255;
    const g = c.lightmap[k + 1] / 255;
    const b = c.lightmap[k + 2] / 255;
    return (r * r + g * g * f + b * b * 0.5) * LM_MAX;
  }

  /** Lights near a point (for realtime light assignment, audio hum). */
  lightsNear(x: number, z: number, radius: number, out: (LightFix & { key: number; chunk: LoadedChunk })[] = []) {
    out.length = 0;
    const S = CHUNK * this.def.cell;
    const r2 = radius * radius;
    const pcx = Math.floor(x / S);
    const pcz = Math.floor(z / S);
    for (let dz = -1; dz <= 1; dz++)
      for (let dx = -1; dx <= 1; dx++) {
        const c = this.chunks.get(this.key(pcx + dx, pcz + dz));
        if (!c) continue;
        for (const l of c.layout.lights) {
          if (l.state !== L_ON && l.state !== L_FLICKER) continue;
          const ddx = l.x - x;
          const ddz = l.z - z;
          if (ddx * ddx + ddz * ddz < r2) out.push(Object.assign({ key: l.gx * 100003 + l.gz, chunk: c }, l));
        }
      }
    return out;
  }

  pickups(): Pickup[] {
    const out: Pickup[] = [];
    for (const c of this.chunks.values()) out.push(...c.layout.pickups);
    return out;
  }

  exitInfo(): ExitInfo | null {
    for (const c of this.chunks.values()) if (c.layout.exit) return c.layout.exit;
    return null;
  }

  dispose() {
    this.gen++;
    for (const k of [...this.chunks.keys()]) this.unload(k);
    for (const w of this.workers) w.terminate();
    this.workers = [];
    this.lmAtlas.dispose();
    this.tileAtlas?.dispose();
    this.chunkState.dispose();
    for (const m of Object.values(this.mats ?? {})) m.dispose();
  }
}

/** Deterministic flicker pattern for a chunk's flicker circuit (0..1). */
export function flicker(cx: number, cz: number, t: number): number {
  const ph = hash01(cx, cz, 404) * 100;
  const win = Math.floor(t * 0.35 + ph);
  const active = hash01(win, cx, cz) < 0.45;
  if (!active) return 1;
  const s = Math.floor(t * 14 + ph * 3);
  const r = hash01(s, cx, cz, 9);
  if (r < 0.3) return 0.05;
  if (r < 0.45) return 0.4 + r;
  return 1;
}
