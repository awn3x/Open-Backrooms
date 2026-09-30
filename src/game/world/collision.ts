// Circle-vs-AABB collision against the layout grid plus extra static boxes.

import { LEVELS } from '../levels/levels';
import type { LayoutCache } from './layout';

export interface Box {
  x0: number;
  z0: number;
  x1: number;
  z1: number;
}

export class Collider {
  extra: Box[] = [];
  private boxes: Box[] = [];
  constructor(public cache: LayoutCache) {}

  gather(x: number, z: number, reach = 1): Box[] {
    const def = LEVELS[this.cache.level];
    const c = def.cell;
    const t = def.wallThick / 2;
    const gx = Math.floor(x / c);
    const gz = Math.floor(z / c);
    const out = this.boxes;
    out.length = 0;
    for (let j = gz - reach; j <= gz + reach; j++)
      for (let i = gx - reach; i <= gx + reach; i++) {
        if (this.cache.wallZ(i, j)) out.push({ x0: i * c - t, z0: j * c - t, x1: i * c + t, z1: (j + 1) * c + t });
        if (this.cache.wallX(i, j)) out.push({ x0: i * c - t, z0: j * c - t, x1: (i + 1) * c + t, z1: j * c + t });
        if (this.cache.pillar(i, j)) {
          const p = def.pillarSize / 2;
          out.push({ x0: i * c - p, z0: j * c - p, x1: i * c + p, z1: j * c + p });
        }
      }
    for (const b of this.extra) if (b.x1 > x - 4 && b.x0 < x + 4 && b.z1 > z - 4 && b.z0 < z + 4) out.push(b);
    return out;
  }

  /** Resolve a circle against nearby boxes; returns corrected position and whether we hit something. */
  resolve(x: number, z: number, r: number): { x: number; z: number; hit: boolean; nx: number; nz: number } {
    const boxes = this.gather(x, z);
    let hit = false;
    let nx = 0;
    let nz = 0;
    for (let it = 0; it < 3; it++) {
      let moved = false;
      for (const b of boxes) {
        const cx = Math.max(b.x0, Math.min(x, b.x1));
        const cz = Math.max(b.z0, Math.min(z, b.z1));
        let dx = x - cx;
        let dz = z - cz;
        const d2 = dx * dx + dz * dz;
        if (d2 >= r * r) continue;
        let d = Math.sqrt(d2);
        if (d < 1e-5) {
          // centre inside the box: push out along the shallowest axis
          const pen = [x - b.x0, b.x1 - x, z - b.z0, b.z1 - z];
          const m = pen.indexOf(Math.min(...pen));
          dx = m === 0 ? -1 : m === 1 ? 1 : 0;
          dz = m === 2 ? -1 : m === 3 ? 1 : 0;
          d = 0;
          x += dx * (pen[m] + r);
          z += dz * (pen[m] + r);
        } else {
          const push = r - d;
          x += (dx / d) * push;
          z += (dz / d) * push;
          dx /= d;
          dz /= d;
        }
        nx = dx;
        nz = dz;
        hit = true;
        moved = true;
      }
      if (!moved) break;
    }
    return { x, z, hit, nx, nz };
  }

  /** Line of sight between two points at eye height (walls only). */
  los(ax: number, az: number, bx: number, bz: number): boolean {
    const def = LEVELS[this.cache.level];
    const c = def.cell;
    let gx = Math.floor(ax / c);
    let gz = Math.floor(az / c);
    const tx = Math.floor(bx / c);
    const tz = Math.floor(bz / c);
    const dx = bx - ax;
    const dz = bz - az;
    const sx = dx > 0 ? 1 : -1;
    const sz = dz > 0 ? 1 : -1;
    const tdx = dx !== 0 ? Math.abs(c / dx) : Infinity;
    const tdz = dz !== 0 ? Math.abs(c / dz) : Infinity;
    let tmx = dx !== 0 ? (sx > 0 ? (gx + 1) * c - ax : ax - gx * c) / Math.abs(dx) : Infinity;
    let tmz = dz !== 0 ? (sz > 0 ? (gz + 1) * c - az : az - gz * c) / Math.abs(dz) : Infinity;
    for (let g = 0; g < 200; g++) {
      if (gx === tx && gz === tz) return true;
      if (tmx < tmz) {
        if (tmx > 1) return true;
        if (this.cache.wallZ(sx > 0 ? gx + 1 : gx, gz)) return false;
        gx += sx;
        tmx += tdx;
      } else {
        if (tmz > 1) return true;
        if (this.cache.wallX(gx, sz > 0 ? gz + 1 : gz)) return false;
        gz += sz;
        tmz += tdz;
      }
    }
    return true;
  }
}
