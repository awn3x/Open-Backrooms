// Non-merged world objects: hub furniture (safe base), pickups, exits.

import * as THREE from 'three';
import { loadGLTF } from './assets';
import { patchEntityMaterial } from './render/materials';
import type { ChunkManager, LoadedChunk } from './world/ChunkManager';
import type { Collider, Box } from './world/collision';
import type { Pickup } from './world/layout';
import { LEVELS } from './levels/levels';

export interface Interactable {
  id: string;
  kind: 'shop' | 'locker' | 'board' | 'pickup' | 'exit' | 'couch';
  pos: THREE.Vector3;
  radius: number;
  label: string;
  data?: unknown;
}

const templates = new Map<string, THREE.Object3D>();

export async function template(name: string): Promise<THREE.Object3D> {
  let t = templates.get(name);
  if (!t) {
    const g = await loadGLTF(name);
    t = g.scene;
    t.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      m.castShadow = true;
      m.receiveShadow = true;
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      m.material = mats.map((mm) => {
        const s = (mm as THREE.MeshStandardMaterial).clone();
        if (s.name.startsWith('Glow')) s.emissiveIntensity = 3;
        return patchEntityMaterial(s);
      }) as unknown as THREE.Material;
      if (Array.isArray(m.material) && m.material.length === 1) m.material = m.material[0];
    });
    templates.set(name, t);
  }
  return t.clone(true);
}

export const HUB_CENTER = new THREE.Vector3(1.22, 0, 1.22);

export class WorldObjects {
  root = new THREE.Group();
  interactables: Interactable[] = [];
  private pickupMeshes = new Map<number, THREE.Object3D>();
  consumed = new Set<number>();
  exitObj: THREE.Object3D | null = null;
  exitAnim: THREE.Object3D | null = null;
  private hubBoxes: Box[] = [];

  constructor(
    private world: ChunkManager,
    private collider: Collider,
  ) {}

  async buildHub() {
    if (this.world.level !== 0) return;
    const c = LEVELS[0].cell;
    const t = LEVELS[0].wallThick / 2;
    const N = -2 * c + t;
    const E = 3 * c - t;
    const W = -2 * c + t;
    const S = 3 * c - t;
    const place = async (name: string, x: number, y: number, z: number, rot: number) => {
      const o = await template(name);
      o.position.set(x, y, z);
      o.rotation.y = rot;
      this.root.add(o);
      return o;
    };
    await Promise.all([
      place('lockers', -1.4, 0, N, 0),
      place('kiosk', E - 0.36, 0, -2.4, -Math.PI / 2),
      place('bulletin_board', W, 1.45, -2.2, Math.PI / 2),
      place('couch', -2.6, 0, S - 0.45, Math.PI),
      place('safe_sign', E, 2.3, 1.22, -Math.PI / 2),
      place('safe_sign', E + 2 * t, 2.3, 1.22, Math.PI / 2),
      place('safe_sign', W, 2.3, 1.22, Math.PI / 2),
      place('safe_sign', W - 2 * t, 2.3, 1.22, -Math.PI / 2),
      place('office_chair', 3.2, 0, 4.2, 0.6),
    ]);
    this.hubBoxes = [
      { x0: -2.4, z0: N, x1: -0.45, z1: N + 0.48 },
      { x0: E - 0.72, z0: -2.87, x1: E, z1: -1.93 },
      { x0: -3.55, z0: S - 0.9, x1: -1.65, z1: S },
    ];
    this.collider.extra.push(...this.hubBoxes);
    this.interactables.push(
      { id: 'shop', kind: 'shop', pos: new THREE.Vector3(E - 1.1, 1, -2.4), radius: 1.6, label: 'Supply Kiosk' },
      { id: 'locker', kind: 'locker', pos: new THREE.Vector3(-1.4, 1, N + 1.0), radius: 1.7, label: 'Your Locker' },
      { id: 'board', kind: 'board', pos: new THREE.Vector3(W + 0.9, 1.4, -2.2), radius: 1.8, label: 'Bulletin Board' },
      { id: 'couch', kind: 'couch', pos: new THREE.Vector3(-2.6, 0.5, S - 1.2), radius: 1.4, label: 'Rest' },
    );
  }

  /** Called whenever the chunk set changes. */
  async syncChunk(c: LoadedChunk) {
    for (const p of c.layout.pickups) await this.spawnPickup(p);
    if (c.layout.exit && !this.exitObj) await this.spawnExit(c.layout.exit.x, c.layout.exit.z, c.layout.exit.rot);
  }

  unloadChunk(c: LoadedChunk) {
    for (const p of c.layout.pickups) {
      const m = this.pickupMeshes.get(p.id);
      if (m) {
        this.root.remove(m);
        this.pickupMeshes.delete(p.id);
        this.interactables = this.interactables.filter((i) => i.id !== 'p' + p.id);
      }
    }
  }

  private async spawnPickup(p: Pickup) {
    if (this.consumed.has(p.id) || this.pickupMeshes.has(p.id)) return;
    const o = await template('almond_water');
    o.position.set(p.x, p.y, p.z);
    o.rotation.y = (p.id % 628) / 100;
    if (p.y === 0 && p.id % 3 === 0) {
      o.rotation.z = Math.PI / 2;
      o.position.y = 0.033;
    }
    this.pickupMeshes.set(p.id, o);
    this.root.add(o);
    this.interactables.push({ id: 'p' + p.id, kind: 'pickup', pos: new THREE.Vector3(p.x, p.y + 0.1, p.z), radius: 1.3, label: 'Almond Water', data: p.id });
  }

  consume(id: number) {
    this.consumed.add(id);
    const m = this.pickupMeshes.get(id);
    if (m) this.root.remove(m);
    this.pickupMeshes.delete(id);
    this.interactables = this.interactables.filter((i) => i.id !== 'p' + id);
  }

  private async spawnExit(x: number, z: number, rot: number) {
    const def = this.world.def;
    const name = def.exit === 'door' ? 'exit_door' : def.exit === 'hatch' ? 'hatch' : 'elevator';
    const o = await template(name);
    o.position.set(x, 0, z);
    o.rotation.y = rot;
    this.exitObj = o;
    this.exitAnim = o.getObjectByName('Door') ?? o.getObjectByName('Lid') ?? null;
    this.root.add(o);
    const f = new THREE.Vector3(Math.sin(rot), 0, Math.cos(rot));
    const label = def.exit === 'door' ? 'Exit' : def.exit === 'hatch' ? 'Maintenance Hatch' : 'Elevator';
    this.interactables.push({ id: 'exit', kind: 'exit', pos: new THREE.Vector3(x, 1, z).addScaledVector(f, def.exit === 'hatch' ? 0 : 0.8), radius: 1.8, label });
    // a light over the exit so it reads as special
    const l = new THREE.PointLight(def.exit === 'elevator' ? 0xffd08a : 0xff3a2a, 2.5, 6, 2);
    l.position.set(x, def.height - 0.4, z).addScaledVector(f, 1);
    o.add(l);
    l.position.set(0, def.height - 0.4, 1);
  }

  nearest(pos: THREE.Vector3): Interactable | null {
    let best: Interactable | null = null;
    let bd = Infinity;
    for (const it of this.interactables) {
      const d = Math.hypot(it.pos.x - pos.x, it.pos.z - pos.z);
      if (d < it.radius && d < bd) {
        bd = d;
        best = it;
      }
    }
    return best;
  }

  update(time: number) {
    // pickups glint gently
    for (const [id, m] of this.pickupMeshes) m.position.y += Math.sin(time * 2 + id) * 0.0002;
  }

  dispose() {
    this.root.clear();
    this.interactables = [];
    this.pickupMeshes.clear();
    this.exitObj = null;
    this.collider.extra = this.collider.extra.filter((b) => !this.hubBoxes.includes(b));
  }
}
