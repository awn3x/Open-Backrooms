// Deterministic chunk layout generation (pure: safe in workers and on every peer).
//
// Grid conventions (cells are `def.cell` metres):
//   cell (gx, gz) spans x in [gx, gx+1)*cell, z in [gz, gz+1)*cell
//   wallZ(gx, gz): wall on the line x = gx*cell between cells (gx-1,gz) and (gx,gz)
//   wallX(gx, gz): wall on the line z = gz*cell between cells (gx,gz-1) and (gx,gz)
// A chunk owns the edges on its min sides, so every edge has exactly one owner.

import { CHUNK, LEVELS, type LevelDef } from '../levels/levels';
import { Rng, fbm, hash01, hash32 } from '../core/rng';

export const Z_NORMAL = 0;
export const Z_OPEN = 1;
export const Z_MAZE = 2;
export const Z_DARK = 3;
export const Z_WET = 4;
export const Z_EXIT = 5;
export const Z_HUB = 6;

/** The safe base around spawn on Level 0 (inclusive cell bounds). */
export const HUB = { gx0: -2, gx1: 2, gz0: -2, gz1: 2 };
export const inHub = (level: number, gx: number, gz: number) => level === 0 && gx >= HUB.gx0 && gx <= HUB.gx1 && gz >= HUB.gz0 && gz <= HUB.gz1;

export const L_ON = 0;
export const L_FLICKER = 1;
export const L_DEAD = 2;
export const L_HANGING = 3; // dropped fixture, dead, may spark

export interface LightFix {
  x: number;
  z: number;
  rot: number; // 0 = long axis along Z
  state: number;
  accent: boolean;
  gx: number;
  gz: number;
}

export type PropKind =
  | 'outlet_duplex'
  | 'outlet_twoprong'
  | 'outlet_gfci'
  | 'outlet_broken'
  | 'switch_plate'
  | 'vent_wall'
  | 'vent_ceiling'
  | 'office_chair'
  | 'wet_floor_sign'
  | 'crate'
  | 'pallet'
  | 'pipe_valve'
  | 'pipe_gauge'
  | 'floor_box';

export interface Prop {
  kind: PropKind;
  x: number;
  y: number;
  z: number;
  /** yaw so the model's +Z (front) faces the room */
  rot: number;
  spark?: boolean;
  scale?: number;
}

export interface Decal {
  tile: number; // atlas index 0..15
  x: number;
  y: number;
  z: number;
  nx: number;
  nz: number; // wall normal (ny implied 0) or floor if both 0
  w: number;
  h: number;
  flip: boolean;
  alpha: number;
}

export interface Pickup {
  id: number;
  kind: 'almond';
  x: number;
  y: number;
  z: number;
}

export interface Pipe {
  // axis aligned run
  x0: number;
  y0: number;
  z0: number;
  x1: number;
  y1: number;
  z1: number;
  r: number;
  tint: number;
}

export interface ExitInfo {
  gx: number;
  gz: number;
  x: number;
  z: number;
  rot: number;
}

export interface ChunkLayout {
  level: number;
  cx: number;
  cz: number;
  wallX: Uint8Array;
  wallZ: Uint8Array;
  zone: Uint8Array;
  pillar: Uint8Array;
  lights: LightFix[];
  props: Prop[];
  decals: Decal[];
  pickups: Pickup[];
  pipes: Pipe[];
  /** ceiling tile states for drop ceilings: 0-3 stain variants, 4 missing, 5 light, 6 vent */
  tiles: Uint8Array | null;
  exit: ExitInfo | null;
}

const N = CHUNK;

export const floorDiv = (a: number, b: number) => Math.floor(a / b);
export const mod = (a: number, b: number) => ((a % b) + b) % b;

// ------------------------------------------------------------------ zones
export function zoneAt(seed: number, def: LevelDef, gx: number, gz: number): number {
  const s = def.zoneScale;
  // gentle spawn area
  if (Math.abs(gx) < 5 && Math.abs(gz) < 5) return Z_NORMAL;
  const dark = fbm(seed ^ 0x51a3, gx / (s * 0.8), gz / (s * 0.8), 3);
  if (dark > def.darkZone) return Z_DARK;
  const shape = fbm(seed ^ 0x2b7c, gx / s, gz / s, 3);
  if (shape > 0.64) return Z_OPEN;
  if (shape < 0.34) return Z_MAZE;
  const wet = fbm(seed ^ 0x77e1, gx / (s * 0.6), gz / (s * 0.6), 2);
  if (wet > def.wetZone) return Z_WET;
  return Z_NORMAL;
}

export function exitCell(seed: number, def: LevelDef): { gx: number; gz: number } {
  const a = hash01(seed, def.id, 991) * Math.PI * 2;
  const d = def.exitDistance[0] + hash01(seed, def.id, 992) * (def.exitDistance[1] - def.exitDistance[0]);
  return { gx: Math.round((Math.cos(a) * d) / def.cell), gz: Math.round((Math.sin(a) * d) / def.cell) };
}

/** Deterministic spawn cell (open, lit) near the origin. */
export function spawnPoint(def: LevelDef, run: number): { x: number; z: number } {
  const c = def.cell;
  return { x: (0.5 + (run % 3)) * c, z: 0.5 * c };
}

// ------------------------------------------------------------------ generation
export function genChunk(seed: number, levelId: number, cx: number, cz: number): ChunkLayout {
  const def = LEVELS[levelId];
  const rng = new Rng(hash32(seed, levelId, cx, cz, 0xc0ffee));
  const gx0 = cx * N;
  const gz0 = cz * N;
  const idx = (i: number, j: number) => j * N + i;

  const zone = new Uint8Array(N * N);
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) zone[idx(i, j)] = zoneAt(seed, def, gx0 + i, gz0 + j);

  const wallX = new Uint8Array(N * N).fill(1);
  const wallZ = new Uint8Array(N * N).fill(1);

  // 1. spanning-tree maze over the chunk's cells (Kruskal)
  const parent = new Int32Array(N * N).map((_, k) => k);
  const find = (a: number): number => {
    while (parent[a] !== a) {
      parent[a] = parent[parent[a]];
      a = parent[a];
    }
    return a;
  };
  const edges: [number, number, number][] = []; // [kind 0=wallZ 1=wallX, i, j]
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      if (i > 0) edges.push([0, i, j]);
      if (j > 0) edges.push([1, i, j]);
    }
  rng.shuffle(edges);
  const removed: [number, number, number][] = [];
  for (const e of edges) {
    const [k, i, j] = e;
    const a = idx(i, j);
    const b = k === 0 ? idx(i - 1, j) : idx(i, j - 1);
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      (k === 0 ? wallZ : wallX)[a] = 0;
    } else removed.push(e);
  }

  // 2. open up remaining walls according to zone
  for (const [k, i, j] of removed) {
    const z = zone[idx(i, j)];
    const p = z === Z_OPEN ? def.openness[1] : z === Z_MAZE ? def.openness[2] : def.openness[0];
    if (rng.chance(p)) (k === 0 ? wallZ : wallX)[idx(i, j)] = 0;
  }

  // 3. carve open rooms
  const nRooms = rng.int(def.rooms[0], def.rooms[1]);
  for (let r = 0; r < nRooms; r++) {
    const w = rng.int(3, 7);
    const h = rng.int(3, 7);
    const i0 = rng.int(1, N - w - 1);
    const j0 = rng.int(1, N - h - 1);
    for (let j = j0; j < j0 + h; j++)
      for (let i = i0; i < i0 + w; i++) {
        if (i > i0) wallZ[idx(i, j)] = 0;
        if (j > j0) wallX[idx(i, j)] = 0;
      }
  }
  // 4. enclosed office rooms with doorways
  for (let r = 0; r < def.enclosedRooms; r++) {
    if (!rng.chance(0.6)) continue;
    const w = rng.int(2, 4);
    const h = rng.int(2, 4);
    const i0 = rng.int(1, N - w - 1);
    const j0 = rng.int(1, N - h - 1);
    for (let j = j0; j < j0 + h; j++)
      for (let i = i0; i < i0 + w; i++) {
        if (i > i0) wallZ[idx(i, j)] = 0;
        if (j > j0) wallX[idx(i, j)] = 0;
      }
    for (let i = i0; i < i0 + w; i++) {
      wallX[idx(i, j0)] = 1;
      wallX[idx(i, j0 + h)] = 1;
    }
    for (let j = j0; j < j0 + h; j++) {
      wallZ[idx(i0, j)] = 1;
      wallZ[idx(i0 + w, j)] = 1;
    }
    // doorways
    wallX[idx(rng.int(i0, i0 + w - 1), rng.chance(0.5) ? j0 : j0 + h)] = 0;
    wallZ[idx(rng.chance(0.5) ? i0 : i0 + w, rng.int(j0, j0 + h - 1))] = 0;
  }

  // 5. exit room
  const ex = exitCell(seed, def);
  let exit: ExitInfo | null = null;
  const eli = ex.gx - gx0;
  const elj = ex.gz - gz0;
  if (eli >= 1 && eli < N - 2 && elj >= 1 && elj < N - 2) {
    for (let j = elj - 1; j <= elj + 1; j++)
      for (let i = eli - 1; i <= eli + 1; i++) {
        zone[idx(i, j)] = Z_EXIT;
        if (i > eli - 1) wallZ[idx(i, j)] = 0;
        if (j > elj - 1) wallX[idx(i, j)] = 0;
      }
    if (def.exit === 'hatch') {
      exit = { gx: ex.gx, gz: ex.gz, x: (ex.gx + 0.5) * def.cell, z: (ex.gz + 0.5) * def.cell, rot: 0 };
    } else {
      // door against the min-X wall of the exit cell, facing +X
      wallZ[idx(eli - 1, elj)] = 1;
      exit = { gx: ex.gx, gz: ex.gz, x: (ex.gx - 1) * def.cell + def.wallThick / 2, z: (ex.gz + 0.5) * def.cell, rot: Math.PI / 2 };
    }
  }

  // 6. repair connectivity inside the chunk
  repair(wallX, wallZ, rng);

  // 7. chunk borders (min sides) — keep a few openings so the world stays connected
  const borderRng = (axis: number) => new Rng(hash32(seed, levelId, cx, cz, axis, 0xb0de));
  for (const axis of [0, 1]) {
    const br = borderRng(axis);
    const opens = new Set<number>();
    const nOpen = br.int(2, 5);
    while (opens.size < nOpen) opens.add(br.int(0, N - 1));
    for (let k = 0; k < N; k++) {
      const z = axis === 0 ? zone[idx(0, k)] : zone[idx(k, 0)];
      const p = z === Z_OPEN ? 0.85 : z === Z_MAZE ? 0.15 : 0.45;
      const open = opens.has(k) || br.chance(p);
      if (axis === 0) wallZ[idx(0, k)] = open ? 0 : 1;
      else wallX[idx(k, 0)] = open ? 0 : 1;
    }
  }

  // 7b. the hub: open interior, solid perimeter with a doorway on each side
  if (levelId === 0) {
    for (let j = 0; j < N; j++)
      for (let i = 0; i < N; i++) {
        const gx = gx0 + i;
        const gz = gz0 + j;
        const a = inHub(0, gx, gz);
        if (a) zone[idx(i, j)] = Z_HUB;
        const bz = inHub(0, gx - 1, gz);
        if (a || bz) wallZ[idx(i, j)] = a && bz ? 0 : gz === 0 ? 0 : 1;
        const bx = inHub(0, gx, gz - 1);
        if (a || bx) wallX[idx(i, j)] = a && bx ? 0 : gx === 0 ? 0 : 1;
      }
  }

  // 8. pillars on interior vertices with no walls
  const pillar = new Uint8Array(N * N);
  if (def.pillarChance > 0)
    for (let j = 1; j < N; j++)
      for (let i = 1; i < N; i++) {
        const z = zone[idx(i, j)];
        if (z !== Z_OPEN && !(def.id === 1 && z !== Z_MAZE)) continue;
        const free = !wallZ[idx(i, j)] && !wallZ[idx(i, j - 1)] && !wallX[idx(i, j)] && !wallX[idx(i - 1, j)];
        const regular = def.id === 1 ? i % 2 === 0 && j % 2 === 0 : true;
        if (free && regular && rng.chance(def.pillarChance)) pillar[idx(i, j)] = 1;
      }

  const layout: ChunkLayout = {
    level: levelId,
    cx,
    cz,
    wallX,
    wallZ,
    zone,
    pillar,
    lights: [],
    props: [],
    decals: [],
    pickups: [],
    pipes: [],
    tiles: null,
    exit,
  };
  populate(layout, def, seed, rng, ex);
  return layout;
}

function repair(wallX: Uint8Array, wallZ: Uint8Array, rng: Rng) {
  const idx = (i: number, j: number) => j * N + i;
  const seen = new Uint8Array(N * N);
  const flood = () => {
    seen.fill(0);
    const q = [0];
    seen[0] = 1;
    while (q.length) {
      const c = q.pop()!;
      const i = c % N;
      const j = (c / N) | 0;
      if (i > 0 && !wallZ[idx(i, j)] && !seen[c - 1]) (seen[c - 1] = 1), q.push(c - 1);
      if (i < N - 1 && !wallZ[idx(i + 1, j)] && !seen[c + 1]) (seen[c + 1] = 1), q.push(c + 1);
      if (j > 0 && !wallX[idx(i, j)] && !seen[c - N]) (seen[c - N] = 1), q.push(c - N);
      if (j < N - 1 && !wallX[idx(i, j + 1)] && !seen[c + N]) (seen[c + N] = 1), q.push(c + N);
    }
  };
  for (let guard = 0; guard < 400; guard++) {
    flood();
    const cand: [number, number][] = [];
    for (let j = 0; j < N; j++)
      for (let i = 0; i < N; i++) {
        const c = idx(i, j);
        if (seen[c]) continue;
        if (i > 0 && seen[c - 1]) cand.push([0, c]);
        if (i < N - 1 && seen[c + 1]) cand.push([0, c + 1]);
        if (j > 0 && seen[c - N]) cand.push([1, c]);
        if (j < N - 1 && seen[c + N]) cand.push([1, c + N]);
      }
    if (!cand.length) return;
    const [k, c] = rng.pick(cand);
    (k === 0 ? wallZ : wallX)[c] = 0;
  }
}

// ------------------------------------------------------------------ population
function populate(L: ChunkLayout, def: LevelDef, seed: number, rng: Rng, ex: { gx: number; gz: number }) {
  const c = def.cell;
  const gx0 = L.cx * N;
  const gz0 = L.cz * N;
  const idx = (i: number, j: number) => j * N + i;
  const H = def.height;
  const t = def.wallThick;

  // --- lights
  const [pa, pb] = def.lightPattern;
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      const gx = gx0 + i;
      const gz = gz0 + j;
      if (((gx % pa) + pa) % pa !== 0 || ((gz % pb) + pb) % pb !== 0) continue;
      const z = L.zone[idx(i, j)];
      let state = L_ON;
      const r = rng.next();
      if (z === Z_DARK) state = rng.chance(0.07) ? L_FLICKER : L_DEAD;
      else if (r < def.deadChance) state = rng.chance(def.id === 0 ? 0.25 : 0.1) ? L_HANGING : L_DEAD;
      else if (r < def.deadChance + def.flickerChance) state = L_FLICKER;
      if (z === Z_EXIT || z === Z_HUB || (Math.abs(gx) < 4 && Math.abs(gz) < 4)) state = L_ON;
      const accent = def.accentChance > 0 && rng.chance(def.accentChance);
      let x = (gx + 0.5) * c;
      let zz = (gz + 0.5) * c;
      if (def.fixture === 'caged') {
        // wall-mounted cage lamps sit by a wall if there is one
        x += rng.range(-0.3, 0.3);
        zz += rng.range(-0.3, 0.3);
      }
      L.lights.push({ x, z: zz, rot: 0, state, accent, gx, gz });
    }

  // --- drop-ceiling tile states
  if (def.tile > 0) {
    const tpc = Math.round(c / def.tile); // tiles per cell (4)
    const T = N * tpc;
    const tiles = new Uint8Array(T * T);
    for (let k = 0; k < T * T; k++) {
      const tx = k % T;
      const tz = (k / T) | 0;
      const z = L.zone[idx((tx / tpc) | 0, (tz / tpc) | 0)];
      const h = hash01(seed, gx0 * tpc + tx, gz0 * tpc + tz, 17);
      const stain = z === Z_WET ? 0.22 : 0.035;
      let s = 0;
      if (h < stain * 0.25) s = 3;
      else if (h < stain * 0.6) s = 2;
      else if (h < stain) s = 1;
      if (h > 0.996 || (z === Z_WET && h > 0.985) || (z === Z_DARK && h > 0.97)) s = 4;
      tiles[k] = s;
    }
    for (const lf of L.lights) {
      // troffer occupies 1x2 tiles in the middle of its cell (long axis along Z)
      const tx = Math.floor((lf.x - gx0 * c) / def.tile - 0.5);
      const tz = Math.floor((lf.z - gz0 * c) / def.tile - 1);
      for (let dz = 0; dz < 2; dz++) if (tx >= 0 && tz + dz >= 0 && tx < T && tz + dz < T) tiles[(tz + dz) * T + tx] = lf.state === L_HANGING ? 4 : 5;
      lf.x = gx0 * c + (tx + 0.5) * def.tile;
      lf.z = gz0 * c + (tz + 1) * def.tile;
    }
    // occasional ceiling return vents
    for (let k = 0; k < 3; k++) {
      const tx = rng.int(1, T - 2);
      const tz = rng.int(1, T - 2);
      if (tiles[tz * T + tx] < 4 && rng.chance(0.5)) {
        tiles[tz * T + tx] = 6;
        L.props.push({ kind: 'vent_ceiling', x: gx0 * c + (tx + 0.5) * def.tile, y: H, z: gz0 * c + (tz + 0.5) * def.tile, rot: 0 });
      }
    }
    L.tiles = tiles;
  }

  // --- wall-face props & decals
  const ex_dx = (ex.gx + 0.5) * c;
  const ex_dz = (ex.gz + 0.5) * c;
  const faces: { x: number; z: number; ax: number; az: number; nx: number; nz: number; zone: number }[] = [];
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      const gx = gx0 + i;
      const gz = gz0 + j;
      if (L.wallZ[idx(i, j)]) {
        // wall along Z at x = gx*c; faces toward -X and +X
        const x = gx * c;
        const zc = (gz + 0.5) * c;
        faces.push({ x: x - t / 2, z: zc, ax: 0, az: 1, nx: -1, nz: 0, zone: L.zone[idx(Math.max(i - 1, 0), j)] });
        faces.push({ x: x + t / 2, z: zc, ax: 0, az: 1, nx: 1, nz: 0, zone: L.zone[idx(i, j)] });
      }
      if (L.wallX[idx(i, j)]) {
        const z = gz * c;
        const xc = (gx + 0.5) * c;
        faces.push({ x: xc, z: z - t / 2, ax: 1, az: 0, nx: 0, nz: -1, zone: L.zone[idx(i, Math.max(j - 1, 0))] });
        faces.push({ x: xc, z: z + t / 2, ax: 1, az: 0, nx: 0, nz: 1, zone: L.zone[idx(i, j)] });
      }
    }
  const exitDist = Math.hypot(ex_dx - (gx0 + N / 2) * c, ex_dz - (gz0 + N / 2) * c);
  for (const f of faces) {
    const rot = Math.atan2(f.nx, f.nz); // model +Z -> normal
    const along = (o: number) => ({ x: f.x + f.ax * o, z: f.z + f.az * o });
    // outlets
    if (rng.chance(def.outletChance)) {
      const o = rng.range(-c * 0.35, c * 0.35);
      const p = along(o);
      const r = rng.next();
      let kind: PropKind = 'outlet_duplex';
      if (r > 0.62) kind = 'outlet_twoprong';
      if (r > 0.78) kind = 'outlet_gfci';
      if (r > 0.88) kind = 'outlet_broken';
      if (def.id === 2 && kind === 'outlet_duplex') kind = rng.chance(0.5) ? 'outlet_broken' : 'outlet_twoprong';
      const spark = kind === 'outlet_broken' ? rng.chance(0.45) : rng.chance(0.02);
      const y = kind === 'outlet_broken' ? 0.4 : rng.chance(0.85) ? 0.36 : 1.1;
      L.props.push({ kind, x: p.x + f.nx * 0.001, y, z: p.z + f.nz * 0.001, rot, spark });
      if (spark || kind === 'outlet_broken')
        L.decals.push({ tile: 15, x: p.x, y: y + 0.28, z: p.z, nx: f.nx, nz: f.nz, w: 0.35, h: 0.6, flip: false, alpha: spark ? 0.9 : 0.5 });
    } else if (rng.chance(0.04)) {
      const p = along(rng.chance(0.5) ? c * 0.38 : -c * 0.38);
      L.props.push({ kind: 'switch_plate', x: p.x + f.nx * 0.001, y: 1.22, z: p.z + f.nz * 0.001, rot });
    } else if (rng.chance(0.02)) {
      const p = along(rng.range(-0.5, 0.5));
      L.props.push({ kind: 'vent_wall', x: p.x + f.nx * 0.001, y: rng.chance(0.5) ? 0.2 : H - 0.35, z: p.z + f.nz * 0.001, rot });
    }
    // decals
    const wet = f.zone === Z_WET;
    if (rng.chance(wet ? 0.5 : 0.1)) {
      const p = along(rng.range(-c * 0.3, c * 0.3));
      const hh = rng.range(0.8, 1.8);
      L.decals.push({ tile: rng.int(0, 3), x: p.x, y: H - hh / 2, z: p.z, nx: f.nx, nz: f.nz, w: rng.range(0.6, 1.4), h: hh, flip: rng.chance(0.5), alpha: rng.range(0.5, 1) });
    }
    if (rng.chance(wet ? 0.45 : 0.06)) {
      const p = along(rng.range(-c * 0.3, c * 0.3));
      const hh = rng.range(0.3, 0.8);
      L.decals.push({ tile: rng.int(4, 5), x: p.x, y: hh / 2, z: p.z, nx: f.nx, nz: f.nz, w: rng.range(0.6, 1.6), h: hh, flip: rng.chance(0.5), alpha: rng.range(0.5, 1) });
    }
    if (rng.chance(0.05)) {
      const p = along(rng.range(-c * 0.3, c * 0.3));
      L.decals.push({ tile: rng.int(6, 7), x: p.x, y: 0.3, z: p.z, nx: f.nx, nz: f.nz, w: 0.8, h: 0.8, flip: rng.chance(0.5), alpha: 0.8 });
    }
    // arrows pointing (mostly) toward the exit
    if (exitDist < 450 && rng.chance(def.id === 2 ? 0.04 : 0.045)) {
      const dx = ex_dx - f.x;
      const dz = ex_dz - f.z;
      const len = Math.hypot(dx, dz) || 1;
      const d = (f.ax * dx + f.az * dz) / len;
      if (Math.abs(d) > 0.35) {
        const liar = rng.chance(0.12);
        let dirSign = d > 0 ? 1 : -1;
        if (liar) dirSign = -dirSign;
        // decal +U runs along (ax,az) rotated so that it faces outwards; compute whether U maps to +along
        const uAlong = f.nz !== 0 ? (f.nz > 0 ? 1 : -1) : f.nx > 0 ? -1 : 1;
        const p = along(rng.range(-0.4, 0.4));
        L.decals.push({ tile: rng.int(8, 11), x: p.x, y: rng.range(1.1, 1.6), z: p.z, nx: f.nx, nz: f.nz, w: 0.7, h: 0.7, flip: dirSign !== uAlong, alpha: 0.95 });
      }
    }
    if (rng.chance(0.006)) {
      const p = along(0);
      L.decals.push({ tile: rng.chance(0.5) ? 12 : 13, x: p.x, y: rng.range(0.9, 1.7), z: p.z, nx: f.nx, nz: f.nz, w: 0.7, h: 0.7, flip: false, alpha: 0.9 });
    }
  }

  // --- floor decals, props and pickups inside cells
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      const gx = gx0 + i;
      const gz = gz0 + j;
      const z = L.zone[idx(i, j)];
      const cxm = (gx + 0.5) * c;
      const czm = (gz + 0.5) * c;
      if ((z === Z_WET && rng.chance(0.35)) || rng.chance(def.id === 1 ? 0.12 : 0.02))
        L.decals.push({ tile: 14, x: cxm + rng.range(-0.6, 0.6), y: 0.003, z: czm + rng.range(-0.6, 0.6), nx: 0, nz: 0, w: rng.range(1, 2.6), h: rng.range(1, 2.6), flip: rng.chance(0.5), alpha: rng.range(0.4, 0.9) });
      if (Math.abs(gx) < 3 && Math.abs(gz) < 3) continue;
      if (rng.chance(def.almondChance * (z === Z_DARK ? 2 : 1)))
        L.pickups.push({ id: hash32(seed, def.id, gx, gz, 77), kind: 'almond', x: cxm + rng.range(-0.5, 0.5), y: 0, z: czm + rng.range(-0.5, 0.5) });
      if (def.id === 0) {
        if (rng.chance(0.004)) L.props.push({ kind: 'office_chair', x: cxm + rng.range(-0.6, 0.6), y: 0, z: czm + rng.range(-0.6, 0.6), rot: rng.range(0, 6.28) });
        if (z === Z_WET && rng.chance(0.012)) L.props.push({ kind: 'wet_floor_sign', x: cxm, y: 0, z: czm, rot: rng.range(0, 6.28) });
      } else if (def.id === 1) {
        if (rng.chance(z === Z_OPEN ? 0.06 : 0.025)) {
          const n = rng.int(1, 3);
          for (let k = 0; k < n; k++)
            L.props.push({ kind: rng.chance(0.7) ? 'crate' : 'pallet', x: cxm + rng.range(-1, 1), y: 0, z: czm + rng.range(-1, 1), rot: Math.round(rng.range(0, 4)) * (Math.PI / 2) + rng.range(-0.1, 0.1) });
          if (rng.chance(0.5)) L.pickups.push({ id: hash32(seed, def.id, gx, gz, 78), kind: 'almond', x: cxm + 0.6, y: 0.72, z: czm });
        }
      }
    }

  // --- level 2 pipes along walls and ceilings
  if (def.id === 2) {
    const tints = 4;
    for (let j = 0; j < N; j++)
      for (let i = 0; i < N; i++) {
        const gx = gx0 + i;
        const gz = gz0 + j;
        const tint = hash32(seed, gx >> 2, gz >> 2) % tints;
        if (L.wallZ[idx(i, j)]) {
          const x = gx * c;
          const n = 1 + (hash32(seed, gx, gz, 5) % 3);
          for (let k = 0; k < n; k++) {
            const side = (k + gx) % 2 === 0 ? 1 : -1;
            const r = [0.04, 0.07, 0.11][mod(k + gz, 3)];
            const y = H - 0.18 - k * 0.24;
            L.pipes.push({ x0: x + side * (t / 2 + r + 0.03), y0: y, z0: gz * c - 0.001, x1: x + side * (t / 2 + r + 0.03), y1: y, z1: (gz + 1) * c + 0.001, r, tint: (tint + k) % tints });
          }
        }
        if (L.wallX[idx(i, j)]) {
          const z = gz * c;
          const n = 1 + (hash32(seed, gx, gz, 6) % 3);
          for (let k = 0; k < n; k++) {
            const side = (k + gz) % 2 === 0 ? 1 : -1;
            const r = [0.05, 0.08, 0.04][mod(k + gx, 3)];
            const y = H - 0.22 - k * 0.22;
            L.pipes.push({ x0: gx * c - 0.001, y0: y, z0: z + side * (t / 2 + r + 0.03), x1: (gx + 1) * c + 0.001, y1: y, z1: z + side * (t / 2 + r + 0.03), r, tint: (tint + k + 1) % tints });
          }
        }
        // big overhead mains every few rows
        if (((gz % 4) + 4) % 4 === 1) L.pipes.push({ x0: gx * c, y0: H - 0.16, z0: (gz + 0.3) * c, x1: (gx + 1) * c, y1: H - 0.16, z1: (gz + 0.3) * c, r: 0.14, tint: 3 });
        if (hash01(seed, gx, gz, 55) < 0.03) {
          const onX = L.wallZ[idx(i, j)] === 1;
          if (onX)
            L.props.push({ kind: hash01(seed, gx, gz, 56) < 0.5 ? 'pipe_valve' : 'pipe_gauge', x: gx * c + t / 2 + 0.2, y: H - 0.55, z: (gz + 0.5) * c, rot: Math.PI / 2 });
        }
      }
  }
}

// ------------------------------------------------------------------ world query cache
export class LayoutCache {
  private map = new Map<number, ChunkLayout>();
  private order: number[] = [];
  private lastK = NaN;
  private last: ChunkLayout | null = null;
  constructor(
    public seed: number,
    public level: number,
    private cap = 256,
  ) {}
  static key(cx: number, cz: number) {
    return (cx + 32768) * 65536 + (cz + 32768);
  }
  get(cx: number, cz: number): ChunkLayout {
    const k = LayoutCache.key(cx, cz);
    if (k === this.lastK) return this.last!;
    let v = this.map.get(k);
    if (!v) {
      v = genChunk(this.seed, this.level, cx, cz);
      this.map.set(k, v);
      this.order.push(k);
      if (this.order.length > this.cap) this.map.delete(this.order.shift()!);
    }
    this.lastK = k;
    this.last = v;
    return v;
  }
  has(cx: number, cz: number) {
    return this.map.has(LayoutCache.key(cx, cz));
  }
  put(l: ChunkLayout) {
    const k = LayoutCache.key(l.cx, l.cz);
    if (!this.map.has(k)) this.order.push(k);
    this.map.set(k, l);
    if (k === this.lastK) this.last = l;
  }
  wallZ(gx: number, gz: number): number {
    const L = this.get(gx >> 4, gz >> 4);
    return L.wallZ[(gz & 15) * N + (gx & 15)];
  }
  wallX(gx: number, gz: number): number {
    const L = this.get(gx >> 4, gz >> 4);
    return L.wallX[(gz & 15) * N + (gx & 15)];
  }
  pillar(gx: number, gz: number): number {
    const L = this.get(gx >> 4, gz >> 4);
    return L.pillar[(gz & 15) * N + (gx & 15)];
  }
  zone(gx: number, gz: number): number {
    const L = this.get(gx >> 4, gz >> 4);
    return L.zone[(gz & 15) * N + (gx & 15)];
  }
  /** can you walk from cell (gx,gz) one step in dir (0:+x 1:-x 2:+z 3:-z) */
  open(gx: number, gz: number, dir: number): boolean {
    switch (dir) {
      case 0:
        return !this.wallZ(gx + 1, gz);
      case 1:
        return !this.wallZ(gx, gz);
      case 2:
        return !this.wallX(gx, gz + 1);
      default:
        return !this.wallX(gx, gz);
    }
  }
}
