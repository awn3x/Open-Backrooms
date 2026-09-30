/// <reference lib="webworker" />
// Chunk generation worker: layout -> meshes -> baked light field.

import { LayoutCache } from './layout';
import { computeLightmap } from './lightfield';
import { buildChunk, type GeoData, type Protos } from './mesher';

let protos: Protos = {};
const caches = new Map<string, LayoutCache>();

function cacheFor(seed: number, level: number) {
  const k = seed + ':' + level;
  let c = caches.get(k);
  if (!c) {
    c = new LayoutCache(seed, level, 128);
    caches.set(k, c);
    if (caches.size > 4) caches.delete(caches.keys().next().value!);
  }
  return c;
}

function transferables(g: GeoData | null, out: ArrayBuffer[]) {
  if (!g) return;
  out.push(g.pos.buffer as ArrayBuffer, g.nrm.buffer as ArrayBuffer, g.uv.buffer as ArrayBuffer, g.idx.buffer as ArrayBuffer);
  if (g.col) out.push(g.col.buffer as ArrayBuffer);
  if (g.mat) out.push(g.mat.buffer as ArrayBuffer);
}

self.onmessage = (e: MessageEvent) => {
  const msg = e.data;
  if (msg.type === 'protos') {
    protos = msg.protos;
    return;
  }
  if (msg.type === 'chunk') {
    const { seed, level, cx, cz, id } = msg;
    const cache = cacheFor(seed, level);
    const layout = cache.get(cx, cz);
    const meshes = buildChunk(layout, protos);
    const lightmap = computeLightmap(cache, cx, cz);
    const tr: ArrayBuffer[] = [lightmap.buffer as ArrayBuffer];
    for (const g of Object.values(meshes)) transferables(g, tr);
    // layout arrays are copied (not transferred) because the cache keeps them
    (self as unknown as Worker).postMessage({ type: 'chunk', id, seed, level, cx, cz, layout, meshes, lightmap }, tr);
  }
};
