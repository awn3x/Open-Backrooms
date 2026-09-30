// Realtime light rig: a fixed pool of point lights assigned to the most
// relevant nearby fixtures (smoothly faded to hide re-assignment), plus the
// player's shadow-casting flashlight.

import * as THREE from 'three';
import type { ChunkManager } from '../world/ChunkManager';
import { flicker } from '../world/ChunkManager';
import { L_FLICKER } from '../world/layout';
import { WU } from './materials';

interface Slot {
  light: THREE.PointLight;
  key: number;
  w: number;
  target: number;
}

export function powerAt(x: number, z: number): number {
  const p = WU.uPower.value;
  if (p.w < 0.5) return 1;
  const d = Math.hypot(x - p.x, z - p.y);
  const t = Math.min(1, Math.max(0, (d - p.z) / 4));
  return 1 - t * t * (3 - 2 * t);
}

export class LightRig {
  slots: Slot[] = [];
  flashlight: THREE.SpotLight;
  flashTarget = new THREE.Object3D();
  private near: ReturnType<ChunkManager['lightsNear']> = [];
  private emitY = 2.6;

  constructor(
    scene: THREE.Scene,
    count: number,
    shadows: boolean,
    shadowSize: number,
  ) {
    for (let i = 0; i < count; i++) {
      const l = new THREE.PointLight(0xffffff, 0, 9, 2);
      l.castShadow = false;
      scene.add(l);
      this.slots.push({ light: l, key: -1, w: 0, target: 0 });
    }
    const f = new THREE.SpotLight(0xfff1dc, 0, 22, 0.42, 0.55, 1.8);
    f.castShadow = shadows;
    f.shadow.mapSize.set(shadowSize, shadowSize);
    f.shadow.bias = -0.0008;
    f.shadow.normalBias = 0.02;
    f.shadow.camera.near = 0.1;
    f.shadow.camera.far = 22;
    f.shadow.radius = 3;
    f.target = this.flashTarget;
    scene.add(f, this.flashTarget);
    this.flashlight = f;
  }

  setLevel(emitY: number, color: THREE.Color) {
    this.emitY = emitY;
    for (const s of this.slots) s.light.color.copy(color);
  }

  update(world: ChunkManager, cam: THREE.Camera, dt: number, time: number, gain: number) {
    const p = cam.position;
    const fwd = new THREE.Vector3();
    cam.getWorldDirection(fwd);
    this.near = world.lightsNear(p.x, p.z, 16, this.near);
    // score by brightness potential, distance, and whether it is in front
    const scored = this.near
      .map((l) => {
        const dx = l.x - p.x;
        const dz = l.z - p.z;
        const d = Math.hypot(dx, dz);
        const front = d > 0.01 ? (dx * fwd.x + dz * fwd.z) / d : 1;
        return { l, s: (1 + 0.6 * Math.max(front, -0.3)) / (d * d + 6) };
      })
      .sort((a, b) => b.s - a.s)
      .slice(0, this.slots.length);
    const want = new Map(scored.map((o) => [o.l.key, o.l]));
    // release slots whose light is no longer wanted
    for (const s of this.slots) if (s.key >= 0 && !want.has(s.key)) s.target = 0;
    for (const [key] of want) {
      if (this.slots.some((s) => s.key === key)) continue;
      const free = this.slots.find((s) => s.key < 0) ?? this.slots.find((s) => s.target === 0 && s.w < 0.05);
      if (free) {
        free.key = key;
        free.w = 0;
      }
    }
    for (const s of this.slots) {
      const l = want.get(s.key);
      if (l) {
        s.target = 1;
        let inten = powerAt(l.x, l.z);
        if (l.state === L_FLICKER) inten *= flicker(l.chunk.cx, l.chunk.cz, time);
        if (l.accent) inten *= 0.8;
        s.light.position.set(l.x, this.emitY, l.z);
        s.light.userData.inten = inten;
        if (l.accent) s.light.color.copy(WU.uAccentCol.value);
        else s.light.color.copy(WU.uLightCol.value);
      }
      s.w += (s.target - s.w) * Math.min(1, dt * 3);
      if (s.target === 0 && s.w < 0.01) s.key = -1;
      s.light.intensity = s.key < 0 ? 0 : s.w * (s.light.userData.inten ?? 1) * 6 * gain;
    }
  }
}
