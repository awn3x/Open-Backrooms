// A* over the layout cell graph (4-neighbour), bounded search.

import type { LayoutCache } from '../world/layout';

export function findPath(cache: LayoutCache, sx: number, sz: number, tx: number, tz: number, blocked?: (gx: number, gz: number) => boolean, maxNodes = 2500): [number, number][] | null {
  if (sx === tx && sz === tz) return [[tx, tz]];
  const key = (x: number, z: number) => (x + 32768) * 65536 + (z + 32768);
  const open: { k: number; x: number; z: number; g: number; f: number }[] = [];
  const came = new Map<number, number>();
  const gScore = new Map<number, number>();
  const h = (x: number, z: number) => Math.abs(x - tx) + Math.abs(z - tz);
  const sk = key(sx, sz);
  open.push({ k: sk, x: sx, z: sz, g: 0, f: h(sx, sz) });
  gScore.set(sk, 0);
  const closed = new Set<number>();
  let expanded = 0;
  const DIRS: [number, number, number][] = [
    [1, 0, 0],
    [-1, 0, 1],
    [0, 1, 2],
    [0, -1, 3],
  ];
  while (open.length && expanded < maxNodes) {
    let bi = 0;
    for (let i = 1; i < open.length; i++) if (open[i].f < open[bi].f) bi = i;
    const cur = open[bi];
    open[bi] = open[open.length - 1];
    open.pop();
    if (closed.has(cur.k)) continue;
    closed.add(cur.k);
    expanded++;
    if (cur.x === tx && cur.z === tz) {
      const path: [number, number][] = [[cur.x, cur.z]];
      let k = cur.k;
      while (came.has(k)) {
        k = came.get(k)!;
        path.push([Math.floor(k / 65536) - 32768, (k % 65536) - 32768]);
      }
      return path.reverse();
    }
    for (const [dx, dz, d] of DIRS) {
      if (!cache.open(cur.x, cur.z, d)) continue;
      const nx = cur.x + dx;
      const nz = cur.z + dz;
      if (blocked?.(nx, nz)) continue;
      const nk = key(nx, nz);
      if (closed.has(nk)) continue;
      const g = cur.g + 1;
      if (g < (gScore.get(nk) ?? Infinity)) {
        gScore.set(nk, g);
        came.set(nk, cur.k);
        open.push({ k: nk, x: nx, z: nz, g, f: g + h(nx, nz) });
      }
    }
  }
  return null;
}
