import { describe, expect, it } from 'vitest';
import { CHUNK, LEVELS } from '../src/game/levels/levels';
import { LayoutCache, genChunk, exitCell } from '../src/game/world/layout';
import { computeLightmap } from '../src/game/world/lightfield';

const SEED = 123456;

describe('world generation', () => {
  for (const def of LEVELS) {
    it(`is deterministic (${def.name})`, () => {
      const a = genChunk(SEED, def.id, 3, -2);
      const b = genChunk(SEED, def.id, 3, -2);
      expect(Array.from(a.wallX)).toEqual(Array.from(b.wallX));
      expect(Array.from(a.wallZ)).toEqual(Array.from(b.wallZ));
      expect(a.lights.length).toBe(b.lights.length);
      expect(a.props.length).toBe(b.props.length);
    });

    it(`is connected across a 5x5 chunk area (${def.name})`, () => {
      const cache = new LayoutCache(SEED, def.id);
      const R = 2;
      const min = -R * CHUNK;
      const max = (R + 1) * CHUNK - 1;
      const W = max - min + 1;
      const seen = new Uint8Array(W * W);
      const q: [number, number][] = [[0, 0]];
      seen[(0 - min) * W + (0 - min)] = 1;
      while (q.length) {
        const [gx, gz] = q.pop()!;
        const nb: [number, number, number][] = [
          [gx + 1, gz, 0],
          [gx - 1, gz, 1],
          [gx, gz + 1, 2],
          [gx, gz - 1, 3],
        ];
        for (const [nx, nz, d] of nb) {
          if (nx < min || nz < min || nx > max || nz > max) continue;
          const k = (nz - min) * W + (nx - min);
          if (seen[k] || !cache.open(gx, gz, d)) continue;
          seen[k] = 1;
          q.push([nx, nz]);
        }
      }
      let reached = 0;
      for (const s of seen) reached += s;
      // everything in the bounded region must be reachable from the spawn
      expect(reached / (W * W)).toBeGreaterThan(0.995);
    });

    it(`bakes a lightmap quickly (${def.name})`, () => {
      const cache = new LayoutCache(SEED, def.id);
      const t0 = performance.now();
      const lm = computeLightmap(cache, 0, 0);
      const ms = performance.now() - t0;
      let lit = 0;
      for (let i = 0; i < lm.length; i += 4) if (lm[i] > 20) lit++;
      expect(lit).toBeGreaterThan(100);
      expect(ms).toBeLessThan(1500);
    });
  }

  it('places the exit away from spawn', () => {
    for (const def of LEVELS) {
      const e = exitCell(SEED, def);
      expect(Math.hypot(e.gx, e.gz) * def.cell).toBeGreaterThan(def.exitDistance[0] - 5);
    }
  });
});
