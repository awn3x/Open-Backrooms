// AI companions for "AI mode": capable wanderers who follow you, scout ahead,
// light the dark, grab almond water, and flee from entities.

import * as THREE from 'three';
import type { Game } from '../Game';
import type { LevelDef } from '../levels/levels';
import { Avatar } from './Avatar';
import { findPath } from './Pathfinding';
import { inHub } from '../world/layout';
import type { Target } from './EntityManager';
import { profile, saveProfile } from '../core/Settings';

const BOT_NAMES = ['Marisol', 'Dex', 'Okonkwo', 'Juniper', 'Tomasz', 'Priya', 'Hollis'];

class Bot {
  pos = new THREE.Vector3();
  yaw = 0;
  path: [number, number][] = [];
  repath = 0;
  alive = true;
  flash = false;
  speed = 0;
  mode: 'follow' | 'scout' | 'flee' = 'follow';
  modeT = 0;
  respawn = 0;
  constructor(
    public name: string,
    public avatar: Avatar,
  ) {}
}

export class Bots {
  list: Bot[] = [];
  root = new THREE.Group();
  enabled = false;
  def: LevelDef | null = null;
  constructor(private game: Game) {
    game.scene.add(this.root);
  }

  names() {
    return this.list.map((b) => b.name);
  }

  enable(n: number) {
    this.enabled = true;
    for (let i = 0; i < n; i++) {
      const name = BOT_NAMES[(i + Math.floor(Math.random() * BOT_NAMES.length)) % BOT_NAMES.length];
      const av = new Avatar(name, true, ['hoodie_red', 'hoodie_blue', 'janitor_grey'][i % 3]);
      const b = new Bot(name, av);
      this.root.add(av.root);
      this.list.push(b);
    }
  }

  setLevel(def: LevelDef) {
    this.def = def;
    const p = this.game.player.pos;
    this.list.forEach((b, i) => {
      b.pos.set(p.x + Math.cos(i * 2) * 1.2, 0, p.z + Math.sin(i * 2) * 1.2);
      b.path = [];
      b.alive = true;
      b.avatar.root.visible = true;
    });
  }

  targets(): Target[] {
    return this.list.map((b) => ({ id: 'bot:' + b.name, x: b.pos.x, z: b.pos.z, alive: b.alive, lit: b.flash, bot: true }));
  }

  update(dt: number) {
    if (!this.enabled || !this.def || !this.game.world) return;
    const def = this.def;
    const g = this.game;
    const me = g.player.pos;
    const cache = g.world!.cache;
    const cell = def.cell;
    for (const b of this.list) {
      if (!b.alive) {
        b.respawn -= dt;
        if (b.respawn <= 0) {
          b.alive = true;
          b.pos.set(me.x + 1, 0, me.z + 1);
          b.avatar.root.visible = true;
        }
        continue;
      }
      // danger check
      let danger: THREE.Vector3 | null = null;
      for (const e of g.entities.list) {
        const d = Math.hypot(e.pos.x - b.pos.x, e.pos.z - b.pos.z);
        if (d < 12 && e.visible > 0.5 && g.collider.los(b.pos.x, b.pos.z, e.pos.x, e.pos.z)) danger = e.pos;
        if (d < 0.9 && (e.state === 'chase' || e.kind === 'watcher') && !inHub(def.id, Math.floor(b.pos.x / cell), Math.floor(b.pos.z / cell))) {
          b.alive = false;
          b.respawn = 20;
          b.avatar.root.visible = false;
          g.audio.play('crawler_scream', { pos: b.pos, gain: 0.8, occlude: true });
          g.ui?.toast(`${b.name} was taken. They'll find their way back to base.`);
        }
      }
      b.modeT -= dt;
      if (danger) {
        b.mode = 'flee';
        b.modeT = 4;
      } else if (b.modeT <= 0) {
        b.mode = Math.random() < 0.25 ? 'scout' : 'follow';
        b.modeT = 6 + Math.random() * 8;
      }
      let goal: { x: number; z: number };
      let speed = 1.4;
      const dMe = Math.hypot(me.x - b.pos.x, me.z - b.pos.z);
      if (b.mode === 'flee' && danger) {
        goal = { x: b.pos.x + (b.pos.x - danger.x) * 2 + (me.x - b.pos.x) * 0.5, z: b.pos.z + (b.pos.z - danger.z) * 2 + (me.z - b.pos.z) * 0.5 };
        speed = 4.0;
      } else if (b.mode === 'scout') {
        const f = new THREE.Vector3(0, 0, -1).applyQuaternion(g.camera.quaternion);
        goal = { x: me.x + f.x * 7, z: me.z + f.z * 7 };
        speed = dMe > 10 ? 2.8 : 1.5;
      } else {
        goal = { x: me.x, z: me.z };
        speed = dMe > 8 ? 3.6 : dMe > 3 ? 1.6 : 0;
      }
      // grab nearby almond water for the team
      for (const it of g.objects?.interactables ?? []) {
        if (it.kind === 'pickup' && Math.hypot(it.pos.x - b.pos.x, it.pos.z - b.pos.z) < 1.0) {
          g.objects!.consume(it.data as number);
          g.ui?.toast(`${b.name} found Almond Water and passed it to you.`);
          profile.inventory.almond = (profile.inventory.almond ?? 0) + 1;
          saveProfile();
          break;
        }
      }
      b.repath -= dt;
      if (b.repath <= 0) {
        b.repath = 0.8;
        const p = findPath(cache, Math.floor(b.pos.x / cell), Math.floor(b.pos.z / cell), Math.floor(goal.x / cell), Math.floor(goal.z / cell), undefined, 800);
        b.path = p ? p.slice(1) : [];
      }
      let tx = goal.x;
      let tz = goal.z;
      if (b.path.length) {
        tx = (b.path[0][0] + 0.5) * cell;
        tz = (b.path[0][1] + 0.5) * cell;
        if (Math.hypot(tx - b.pos.x, tz - b.pos.z) < cell * 0.4) b.path.shift();
      }
      const dx = tx - b.pos.x;
      const dz = tz - b.pos.z;
      const d = Math.hypot(dx, dz);
      let moved = 0;
      if (speed > 0 && d > 0.2) {
        const st = Math.min(d, speed * dt);
        const r = g.collider.resolve(b.pos.x + (dx / d) * st, b.pos.z + (dz / d) * st, 0.28);
        moved = Math.hypot(r.x - b.pos.x, r.z - b.pos.z);
        b.pos.x = r.x;
        b.pos.z = r.z;
        b.yaw = Math.atan2(dx, dz);
      } else if (dMe < 5) b.yaw = Math.atan2(me.x - b.pos.x, me.z - b.pos.z);
      b.speed = b.speed * 0.8 + (moved / Math.max(dt, 1e-4)) * 0.2;
      b.flash = g.world!.sampleE(b.pos.x, b.pos.z) < 0.12;
      b.avatar.setFlashlight(b.flash);
      b.avatar.root.position.copy(b.pos);
      const dy = ((b.yaw - b.avatar.root.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      b.avatar.root.rotation.y += dy * Math.min(1, dt * 6);
      b.avatar.locomote(b.speed, false, dt);
    }
  }
}
