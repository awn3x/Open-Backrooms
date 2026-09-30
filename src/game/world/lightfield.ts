// Per-chunk baked light field. Every fixture's contribution is summed with
// soft wall occlusion (grid DDA from 3 points on the emitter), plus contact AO
// near walls. Channels: R steady lights, G flickering lights, B accent-coloured
// lights, A ambient occlusion. Values are sqrt-encoded (E = v^2 * LM_MAX).

import { CHUNK, LEVELS } from '../levels/levels';
import { L_FLICKER, L_ON, LayoutCache, type LightFix, floorDiv } from './layout';

export const LM_PER_M = 3;
export const LM_MAX = 6.0;

export function lmTexels(level: number): { T: number; R: number; S: number } {
  const S = CHUNK * LEVELS[level].cell;
  const T = Math.round(S * LM_PER_M);
  return { T, R: T + 2, S };
}

/** true when the straight segment a->b crosses a wall edge */
export function blocked(cache: LayoutCache, cell: number, ax: number, az: number, bx: number, bz: number): boolean {
  let gx = Math.floor(ax / cell);
  let gz = Math.floor(az / cell);
  const tx = Math.floor(bx / cell);
  const tz = Math.floor(bz / cell);
  const dx = bx - ax;
  const dz = bz - az;
  const sx = dx > 0 ? 1 : -1;
  const sz = dz > 0 ? 1 : -1;
  const tdx = dx !== 0 ? Math.abs(cell / dx) : Infinity;
  const tdz = dz !== 0 ? Math.abs(cell / dz) : Infinity;
  let tmx = dx !== 0 ? ((sx > 0 ? (gx + 1) * cell - ax : ax - gx * cell) / Math.abs(dx)) : Infinity;
  let tmz = dz !== 0 ? ((sz > 0 ? (gz + 1) * cell - az : az - gz * cell) / Math.abs(dz)) : Infinity;
  for (let guard = 0; guard < 64; guard++) {
    if (gx === tx && gz === tz) return false;
    if (tmx < tmz) {
      if (tmx > 1) return false;
      if (cache.wallZ(sx > 0 ? gx + 1 : gx, gz)) return true;
      gx += sx;
      tmx += tdx;
    } else {
      if (tmz > 1) return false;
      if (cache.wallX(gx, sz > 0 ? gz + 1 : gz)) return true;
      gz += sz;
      tmz += tdz;
    }
  }
  return false;
}

export function computeLightmap(cache: LayoutCache, cx: number, cz: number): Uint8Array {
  const def = LEVELS[cache.level];
  const { T, R, S } = lmTexels(cache.level);
  const c = def.cell;
  const px = S / T;
  const ox = cx * S;
  const oz = cz * S;
  const out = new Uint8Array(R * R * 4);
  const reach = def.id === 1 ? 16 : def.id === 2 ? 9 : 10;
  const h0 = def.height * (def.fixture === 'highbay' ? 0.62 : 0.85);
  const h2 = h0 * h0;

  // gather lights in a 3x3 chunk neighbourhood
  const lights: LightFix[] = [];
  for (let dz = -1; dz <= 1; dz++)
    for (let dx = -1; dx <= 1; dx++) {
      const L = cache.get(cx + dx, cz + dz);
      for (const l of L.lights) if (l.state === L_ON || l.state === L_FLICKER) lights.push(l);
    }
  // emitter sample offsets (troffers are long along Z)
  const off = def.fixture === 'troffer' ? [-0.45, 0, 0.45] : [-0.15, 0.15];

  // gather wall segments for AO (3x3 cells around each texel resolved via cache)
  const aoR = 0.9;
  for (let v = 0; v < R; v++) {
    const z = oz + (v - 1 + 0.5) * px;
    for (let u = 0; u < R; u++) {
      const x = ox + (u - 1 + 0.5) * px;
      let eR = 0;
      let eG = 0;
      let eB = 0;
      for (const l of lights) {
        const ddx = l.x - x;
        const ddz = l.z - z;
        const d2 = ddx * ddx + ddz * ddz;
        if (d2 > reach * reach) continue;
        let vis = 0;
        for (const o of off) if (!blocked(cache, c, x, z, l.x, l.z + o)) vis++;
        if (!vis) continue;
        vis /= off.length;
        const w = 1 - Math.pow(d2 / (reach * reach), 2);
        const e = ((def.lightIntensity * h2) / Math.pow(d2 + h2, 1.5)) * h0 * w * w * vis;
        if (l.accent) eB += e;
        else if (l.state === L_FLICKER) eG += e;
        else eR += e;
      }
      // contact AO from nearby wall lines
      const gx = Math.floor(x / c);
      const gz = Math.floor(z / c);
      const fx = x - gx * c;
      const fz = z - gz * c;
      let dmin = aoR;
      if (cache.wallZ(gx, gz)) dmin = Math.min(dmin, fx);
      if (cache.wallZ(gx + 1, gz)) dmin = Math.min(dmin, c - fx);
      if (cache.wallX(gx, gz)) dmin = Math.min(dmin, fz);
      if (cache.wallX(gx, gz + 1)) dmin = Math.min(dmin, c - fz);
      // pillars at the four corners
      const ps = def.pillarSize / 2;
      for (const [px_, pz_] of [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]) {
        if (cache.pillar(gx + px_, gz + pz_)) {
          const qx = Math.max(Math.abs(x - (gx + px_) * c) - ps, 0);
          const qz = Math.max(Math.abs(z - (gz + pz_) * c) - ps, 0);
          dmin = Math.min(dmin, Math.hypot(qx, qz));
        }
      }
      const t = Math.max(0, Math.min(1, dmin / aoR));
      const ao = 0.45 + 0.55 * t * t * (3 - 2 * t);
      const k = (v * R + u) * 4;
      out[k] = Math.min(255, Math.sqrt(eR / LM_MAX) * 255 + 0.5);
      out[k + 1] = Math.min(255, Math.sqrt(eG / LM_MAX) * 255 + 0.5);
      out[k + 2] = Math.min(255, Math.sqrt(eB / LM_MAX) * 255 + 0.5);
      out[k + 3] = ao * 255;
    }
  }
  return out;
}

export { floorDiv };
