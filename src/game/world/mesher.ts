// Builds merged, draw-call-friendly geometry for one chunk (pure, runs in the worker).

import { CHUNK, LEVELS, type LevelDef } from '../levels/levels';
import { L_DEAD, L_FLICKER, L_HANGING, type ChunkLayout, type Pipe, Z_OPEN } from './layout';
import { hash01 } from '../core/rng';

export interface GeoData {
  pos: Float32Array;
  nrm: Float32Array;
  uv: Float32Array;
  col?: Float32Array; // rgba
  mat?: Float32Array; // rough, metal, emissive, lightLinked(0 none,1 steady,2 flicker)
  idx: Uint32Array;
}

export interface ProtoPart {
  name: string;
  pos: Float32Array;
  nrm: Float32Array;
  uv: Float32Array | null;
  idx: Uint32Array;
  color: [number, number, number];
  rough: number;
  metal: number;
  emissive: number;
}
export type Protos = Record<string, ProtoPart[]>;

export class GeoBuilder {
  pos: number[] = [];
  nrm: number[] = [];
  uv: number[] = [];
  col: number[] = [];
  mat: number[] = [];
  idx: number[] = [];
  n = 0;
  constructor(
    private withCol = false,
    private withMat = false,
  ) {}
  v(x: number, y: number, z: number, nx: number, ny: number, nz: number, u: number, w: number, c?: number[], m?: number[]) {
    this.pos.push(x, y, z);
    this.nrm.push(nx, ny, nz);
    this.uv.push(u, w);
    if (this.withCol) this.col.push(...(c ?? [1, 1, 1, 1]));
    if (this.withMat) this.mat.push(...(m ?? [0.8, 0, 0, 0]));
    return this.n++;
  }
  tri(a: number, b: number, c: number) {
    this.idx.push(a, b, c);
  }
  /** quad from 4 corners in CCW order seen from the normal side */
  quad(p: number[][], n: number[], uv: number[][], c?: number[], m?: number[]) {
    const a = this.v(p[0][0], p[0][1], p[0][2], n[0], n[1], n[2], uv[0][0], uv[0][1], c, m);
    const b = this.v(p[1][0], p[1][1], p[1][2], n[0], n[1], n[2], uv[1][0], uv[1][1], c, m);
    const d = this.v(p[2][0], p[2][1], p[2][2], n[0], n[1], n[2], uv[2][0], uv[2][1], c, m);
    const e = this.v(p[3][0], p[3][1], p[3][2], n[0], n[1], n[2], uv[3][0], uv[3][1], c, m);
    this.idx.push(a, b, d, a, d, e);
  }
  /**
   * Horizontal square split into an n×n grid. A chunk-sized single quad (~39 m) loses depth
   * precision when clipped at grazing angles, which let the plenum show through the ceiling.
   */
  plane(x0: number, z0: number, size: number, y: number, up: boolean, uv: (x: number, z: number) => number[], n = 16) {
    const d = size / n;
    for (let j = 0; j < n; j++)
      for (let i = 0; i < n; i++) {
        const a = x0 + i * d;
        const b = z0 + j * d;
        const P = up ? [[a, b + d], [a + d, b + d], [a + d, b], [a, b]] : [[a, b], [a + d, b], [a + d, b + d], [a, b + d]];
        this.quad(P.map(([x, z]) => [x, y, z]), [0, up ? 1 : -1, 0], P.map(([x, z]) => uv(x, z)));
      }
  }
  /** axis-aligned box, world-space UVs scaled by 1/s; faces masked by `faces` (+x,-x,+y,-y,+z,-z) */
  box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, s: number, faces = 0b111111, c?: number[], m?: number[]) {
    const U = (a: number) => a / s;
    if (faces & 1) this.quad([[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]], [1, 0, 0], [[U(-z1), U(y0)], [U(-z0), U(y0)], [U(-z0), U(y1)], [U(-z1), U(y1)]], c, m);
    if (faces & 2) this.quad([[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], [-1, 0, 0], [[U(z0), U(y0)], [U(z1), U(y0)], [U(z1), U(y1)], [U(z0), U(y1)]], c, m);
    if (faces & 4) this.quad([[x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]], [0, 1, 0], [[U(x0), U(-z1)], [U(x1), U(-z1)], [U(x1), U(-z0)], [U(x0), U(-z0)]], c, m);
    if (faces & 8) this.quad([[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]], [0, -1, 0], [[U(x0), U(z0)], [U(x1), U(z0)], [U(x1), U(z1)], [U(x0), U(z1)]], c, m);
    if (faces & 16) this.quad([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], [0, 0, 1], [[U(x0), U(y0)], [U(x1), U(y0)], [U(x1), U(y1)], [U(x0), U(y1)]], c, m);
    if (faces & 32) this.quad([[x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0]], [0, 0, -1], [[U(-x1), U(y0)], [U(-x0), U(y0)], [U(-x0), U(y1)], [U(-x1), U(y1)]], c, m);
  }
  /** Append a prototype part with transform (translate + yaw + scale). */
  proto(part: ProtoPart, x: number, y: number, z: number, rot: number, s: number, c?: number[], m?: number[], uvRemap?: (u: number, v: number) => [number, number]) {
    const cr = Math.cos(rot);
    const sr = Math.sin(rot);
    const base = this.n;
    const P = part.pos;
    const Nn = part.nrm;
    for (let i = 0; i < P.length / 3; i++) {
      const px = P[i * 3] * s;
      const py = P[i * 3 + 1] * s;
      const pz = P[i * 3 + 2] * s;
      const nx = Nn[i * 3];
      const ny = Nn[i * 3 + 1];
      const nz = Nn[i * 3 + 2];
      let u = part.uv ? part.uv[i * 2] : 0;
      let w = part.uv ? part.uv[i * 2 + 1] : 0;
      if (uvRemap) [u, w] = uvRemap(u, w);
      this.v(x + px * cr + pz * sr, y + py, z - px * sr + pz * cr, nx * cr + nz * sr, ny, -nx * sr + nz * cr, u, w, c, m);
    }
    for (let i = 0; i < part.idx.length; i++) this.idx.push(base + part.idx[i]);
  }
  build(): GeoData | null {
    if (!this.n) return null;
    return {
      pos: new Float32Array(this.pos),
      nrm: new Float32Array(this.nrm),
      uv: new Float32Array(this.uv),
      col: this.withCol ? new Float32Array(this.col) : undefined,
      mat: this.withMat ? new Float32Array(this.mat) : undefined,
      idx: new Uint32Array(this.idx),
    };
  }
}

export interface ChunkMeshes {
  walls: GeoData | null;
  floor: GeoData | null;
  ceil: GeoData | null;
  plenum: GeoData | null;
  lens: GeoData | null;
  props: GeoData | null;
  small: GeoData | null;
  decals: GeoData | null;
  pipes: GeoData | null;
}

const PIPE_TINTS = [
  [0.32, 0.4, 0.3],
  [0.55, 0.2, 0.14],
  [0.34, 0.38, 0.44],
  [0.6, 0.5, 0.28],
];

function pipe(b: GeoBuilder, p: Pipe) {
  const seg = p.r > 0.1 ? 12 : 8;
  const ax = p.x1 - p.x0;
  const az = p.z1 - p.z0;
  const len = Math.hypot(ax, az);
  const dx = ax / len;
  const dz = az / len;
  // perpendicular basis: side (horizontal) and up
  const sx = -dz;
  const sz = dx;
  const tint = [...PIPE_TINTS[p.tint % PIPE_TINTS.length], 1];
  const ring = (r: number, t0: number, t1: number, cap: boolean) => {
    const base = b.n;
    for (let k = 0; k <= seg; k++) {
      const a = (k / seg) * Math.PI * 2;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      const nx = sx * ca;
      const ny = sa;
      const nz = sz * ca;
      for (const t of [t0, t1]) {
        b.v(p.x0 + dx * t + nx * r, p.y0 + ny * r, p.z0 + dz * t + nz * r, nx, ny, nz, (p.x0 * dx + p.z0 * dz + t) / 1.0, (k / seg) * r * 6.28, tint);
      }
    }
    for (let k = 0; k < seg; k++) {
      const a = base + k * 2;
      b.tri(a, a + 1, a + 2);
      b.tri(a + 1, a + 3, a + 2);
    }
    if (cap) {
      // flat ring faces for flanges
      for (const [t, sgn] of [
        [t0, -1],
        [t1, 1],
      ] as const) {
        const cb = b.n;
        b.v(p.x0 + dx * t, p.y0, p.z0 + dz * t, dx * sgn, 0, dz * sgn, 0, 0, tint);
        for (let k = 0; k <= seg; k++) {
          const a = (k / seg) * Math.PI * 2;
          b.v(p.x0 + dx * t + sx * Math.cos(a) * r, p.y0 + Math.sin(a) * r, p.z0 + dz * t + sz * Math.cos(a) * r, dx * sgn, 0, dz * sgn, Math.cos(a) * 0.2, Math.sin(a) * 0.2, tint);
        }
        for (let k = 0; k < seg; k++) sgn > 0 ? b.tri(cb, cb + 2 + k, cb + 1 + k) : b.tri(cb, cb + 1 + k, cb + 2 + k);
      }
    }
  };
  ring(p.r, 0, len, false);
  ring(p.r * 1.3, 0.02, 0.07, true);
}

// wall vent opening (matches the grille's inner frame in tools/blender/props.py vent_wall) and duct depth
const VENT_W = 0.27;
const VENT_H = 0.13;
const VENT_DEPTH = 0.045;

export function buildChunk(L: ChunkLayout, protos: Protos): ChunkMeshes {
  const def: LevelDef = LEVELS[L.level];
  const c = def.cell;
  const H = def.height;
  const t = def.wallThick;
  const N = CHUNK;
  const gx0 = L.cx * N;
  const gz0 = L.cz * N;
  const X0 = gx0 * c;
  const Z0 = gz0 * c;
  const S = N * c;
  const idx = (i: number, j: number) => j * N + i;
  const ws = def.tex.wallScale;
  const eps = 0.0015;

  // ---------------------------------------------------------------- walls & pillars
  const walls = new GeoBuilder();
  const props = new GeoBuilder(true, true);
  // wall vents are real openings: find the face each one sits on, so that face is built with a hole
  const vents = L.props.filter((p) => p.kind === 'vent_wall');
  const ventOn = (nx: number, nz: number, plane: number, a0: number, a1: number) =>
    vents.find((p) => Math.abs(Math.sin(p.rot) - nx) < 0.01 && Math.abs(Math.cos(p.rot) - nz) < 0.01 && Math.abs((nx ? p.x : p.z) - plane) < 0.01 && (nx ? p.z : p.x) > a0 && (nx ? p.z : p.x) < a1);
  /** one side of a wall box, with the vent's opening cut out and a duct cavity behind it */
  const wallSide = (nx: number, nz: number, plane: number, a0: number, a1: number): boolean => {
    const v = ventOn(nx, nz, plane, a0, a1);
    if (!v) return false;
    const ac = nx ? v.z : v.x;
    const h0 = ac - VENT_W / 2;
    const h1 = ac + VENT_W / 2;
    const y0 = v.y - VENT_H / 2;
    const y1 = v.y + VENT_H / 2;
    const fwd = nx < 0 || nz > 0; // box() winds these faces with a increasing
    const sg = fwd ? 1 : -1;
    const P = (a: number, y: number, d = 0) => (nx ? [plane - nx * d, y, a] : [a, y, plane - nz * d]);
    const rect = (b0: number, b1: number, yb: number, yt: number) => {
      const [s0, s1] = fwd ? [b0, b1] : [b1, b0];
      walls.quad([P(s0, yb), P(s1, yb), P(s1, yt), P(s0, yt)], [nx, 0, nz], [[(sg * s0) / ws, yb / ws], [(sg * s1) / ws, yb / ws], [(sg * s1) / ws, yt / ws], [(sg * s0) / ws, yt / ws]]);
    };
    rect(a0, h0, 0, H);
    rect(h1, a1, 0, H);
    rect(h0, h1, 0, y0);
    rect(h0, h1, y1, H);
    // duct: sheet-metal sides and a dark back, so the grille reads as a hole into the wall
    const D = VENT_DEPTH;
    const side = [0.16, 0.16, 0.15, 1];
    const back = [0.025, 0.025, 0.025, 1];
    const m = [0.55, 0.6, 0, 0];
    const face = (q: number[][], n: number[], col: number[]) => {
      // wind CCW as seen from the normal side
      const e1 = [q[1][0] - q[0][0], q[1][1] - q[0][1], q[1][2] - q[0][2]];
      const e2 = [q[2][0] - q[0][0], q[2][1] - q[0][1], q[2][2] - q[0][2]];
      const cr = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
      if (cr[0] * n[0] + cr[1] * n[1] + cr[2] * n[2] < 0) q.reverse();
      props.quad(q, n, [[0, 0], [1, 0], [1, 1], [0, 1]], col, m);
    };
    const ax = nx ? [0, 0, 1] : [1, 0, 0]; // direction of increasing a
    face([P(h0, y0), P(h1, y0), P(h1, y0, D), P(h0, y0, D)], [0, 1, 0], side); // floor of the duct
    face([P(h0, y1), P(h1, y1), P(h1, y1, D), P(h0, y1, D)], [0, -1, 0], side);
    face([P(h0, y0), P(h0, y1), P(h0, y1, D), P(h0, y0, D)], ax, side);
    face([P(h1, y0), P(h1, y1), P(h1, y1, D), P(h1, y0, D)], ax.map((k) => -k), side);
    face([P(h0, y0, D), P(h1, y0, D), P(h1, y1, D), P(h0, y1, D)], [nx, 0, nz], back);
    return true;
  };
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      const gx = gx0 + i;
      const gz = gz0 + j;
      if (L.wallZ[idx(i, j)]) {
        const x = gx * c;
        const a0 = gz * c - t / 2 + eps;
        const a1 = (gz + 1) * c + t / 2 - eps;
        let faces = 0b110011;
        if (vents.length) {
          if (wallSide(1, 0, x + t / 2, a0, a1)) faces &= ~1;
          if (wallSide(-1, 0, x - t / 2, a0, a1)) faces &= ~2;
        }
        walls.box(x - t / 2, 0, a0, x + t / 2, H, a1, ws, faces);
      }
      if (L.wallX[idx(i, j)]) {
        const z = gz * c;
        const a0 = gx * c - t / 2 + eps;
        const a1 = (gx + 1) * c + t / 2 - eps;
        let faces = 0b110011;
        if (vents.length) {
          if (wallSide(0, 1, z + t / 2, a0, a1)) faces &= ~16;
          if (wallSide(0, -1, z - t / 2, a0, a1)) faces &= ~32;
        }
        walls.box(a0, 0, z - t / 2, a1, H, z + t / 2, ws, faces);
      }
      if (L.pillar[idx(i, j)]) {
        const ps = def.pillarSize / 2;
        walls.box(gx * c - ps, 0, gz * c - ps, gx * c + ps, H, gz * c + ps, ws, 0b110011);
      }
    }
  // Level 1: heavy ceiling beams
  if (def.id === 1) {
    for (let j = 0; j < N; j++) {
      const z = (gz0 + j) * c;
      walls.box(X0, H - 0.5, z - 0.2, X0 + S, H, z + 0.2, ws, 0b111011);
    }
  }

  // ---------------------------------------------------------------- floor / ceiling
  const floor = new GeoBuilder();
  const fs = def.tex.floorScale;
  floor.plane(X0, Z0, S, 0, true, (x, z) => [x / fs, -z / fs]);
  const ceil = new GeoBuilder();
  const cs = def.tile > 0 ? def.tile : ws;
  ceil.plane(X0, Z0, S, H, false, (x, z) => [x / cs, z / cs]);
  let plenum: GeoData | null = null;
  if (def.tile > 0) {
    const pb = new GeoBuilder();
    pb.plane(X0, Z0, S, H + 0.45, false, (x, z) => [(x - X0) / S, (z - Z0) / S]);
    plenum = pb.build();
  }

  // ---------------------------------------------------------------- lights
  const lens = new GeoBuilder(true, true);
  const linkOf = (state: number) => (state === L_FLICKER ? 2 : state === L_DEAD || state === L_HANGING ? 0 : 1);
  for (const lf of L.lights) {
    const link = linkOf(lf.state);
    const col = lf.accent ? def.accentColor : def.lightColor;
    if (def.fixture === 'troffer') {
      if (lf.state === L_HANGING) {
        for (const part of protos.troffer_hanging ?? [])
          props.proto(part, lf.x, H, lf.z - 0.6096, lf.rot, 1, [...part.color, 1], [part.rough, part.metal, 0, 0]);
        continue;
      }
      const dying = hash01(lf.gx, lf.gz, 3) < 0.25 || lf.state === L_FLICKER;
      for (const part of protos.troffer ?? []) {
        if (part.name === 'Lens') {
          lens.proto(part, lf.x, H, lf.z, lf.rot, 1, [col[0], col[1], col[2], 1], [0.2, 0, link ? 1 : 0.0, link], (u, v) => [u * 0.5 + (dying ? 0.5 : 0), v]);
        } else props.proto(part, lf.x, H, lf.z, lf.rot, 1, [...part.color, 1], [part.rough, part.metal, 0, 0]);
      }
    } else {
      const kind = def.fixture === 'highbay' ? 'lamp_highbay' : 'lamp_caged';
      const y = def.fixture === 'highbay' ? H - 0.95 : H;
      for (const part of protos[kind] ?? []) {
        const em = part.emissive > 0;
        props.proto(part, lf.x, y, lf.z, lf.rot, 1, em ? [col[0], col[1], col[2], 1] : [...part.color, 1], [part.rough, part.metal, em ? (link ? 2.5 : 0.02) : 0, em ? link : 0]);
      }
      if (def.fixture === 'highbay') {
        // rod extension up to the ceiling beam
        props.box(lf.x - 0.012, y + 0.6, lf.z - 0.012, lf.x + 0.012, H, lf.z + 0.012, 1, 0b110011, [0.5, 0.5, 0.5, 1], [0.4, 1, 0, 0]);
      }
    }
  }

  // ---------------------------------------------------------------- props
  const small = new GeoBuilder(true, true);
  const SMALL = new Set(['outlet_duplex', 'outlet_twoprong', 'outlet_gfci', 'outlet_broken', 'switch_plate', 'floor_box', 'vent_wall', 'pipe_gauge']);
  for (const p of L.props) {
    const parts = protos[p.kind];
    if (!parts) continue;
    const dst = SMALL.has(p.kind) ? small : props;
    for (const part of parts) {
      const em = part.emissive > 0;
      dst.proto(part, p.x, p.y, p.z, p.rot, p.scale ?? 1, [...part.color, 1], [part.rough, part.metal, em ? part.emissive * 0.5 : 0, 0]);
    }
  }
  // Level 1: hazard bands on pillars, painted floor lines
  if (def.id === 1) {
    const ps = def.pillarSize / 2 + 0.004;
    for (let j = 0; j < N; j++)
      for (let i = 0; i < N; i++) {
        if (L.pillar[idx(i, j)]) {
          const x = (gx0 + i) * c;
          const z = (gz0 + j) * c;
          for (let k = 0; k < 2; k++) {
            const y0 = 0.1 + k * 0.5;
            props.box(x - ps, y0, z - ps, x + ps, y0 + 0.25, z + ps, 1, 0b110011, k === 0 ? [0.75, 0.56, 0.06, 1] : [0.08, 0.08, 0.08, 1], [0.6, 0, 0, 0]);
          }
        }
        if (L.zone[idx(i, j)] === Z_OPEN && hash01(gx0 + i, gz0 + j, 91) < 0.3 && !L.wallZ[idx(i, j)]) {
          const x = (gx0 + i) * c;
          const z = (gz0 + j) * c;
          props.quad([[x - 0.05, 0.004, z + c], [x + 0.05, 0.004, z + c], [x + 0.05, 0.004, z], [x - 0.05, 0.004, z]], [0, 1, 0], [[0, 0], [1, 0], [1, 1], [0, 1]], [0.72, 0.6, 0.2, 1], [0.7, 0, 0, 0]);
        }
      }
  }

  // ---------------------------------------------------------------- decals
  const decals = new GeoBuilder(true);
  for (const d of L.decals) {
    const col = d.tile % 4;
    const row = Math.floor(d.tile / 4);
    let u0 = col / 4 + 0.002;
    let u1 = (col + 1) / 4 - 0.002;
    const v0 = 1 - (row + 1) / 4 + 0.002;
    const v1 = 1 - row / 4 - 0.002;
    if (d.flip) [u0, u1] = [u1, u0];
    const cc = [1, 1, 1, d.alpha];
    if (d.nx === 0 && d.nz === 0) {
      const y = d.y;
      decals.quad([[d.x - d.w / 2, y, d.z + d.h / 2], [d.x + d.w / 2, y, d.z + d.h / 2], [d.x + d.w / 2, y, d.z - d.h / 2], [d.x - d.w / 2, y, d.z - d.h / 2]], [0, 1, 0], [[u0, v0], [u1, v0], [u1, v1], [u0, v1]], cc);
    } else {
      const ux = d.nz * (d.w / 2);
      const uz = -d.nx * (d.w / 2);
      const ox = d.x + d.nx * 0.004;
      const oz = d.z + d.nz * 0.004;
      const y0 = Math.max(0.005, d.y - d.h / 2);
      const y1 = Math.min(H - 0.005, d.y + d.h / 2);
      decals.quad([[ox - ux, y0, oz - uz], [ox + ux, y0, oz + uz], [ox + ux, y1, oz + uz], [ox - ux, y1, oz - uz]], [d.nx, 0, d.nz], [[u0, v0], [u1, v0], [u1, v1], [u0, v1]], cc);
    }
  }

  // ---------------------------------------------------------------- pipes
  const pipes = new GeoBuilder(true);
  for (const p of L.pipes) pipe(pipes, p);

  return {
    walls: walls.build(),
    floor: floor.build(),
    ceil: ceil.build(),
    plenum,
    lens: lens.build(),
    props: props.build(),
    small: small.build(),
    decals: decals.build(),
    pipes: pipes.build(),
  };
}
