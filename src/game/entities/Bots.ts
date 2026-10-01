// AI companions for "AI mode". They behave like decent co-op players:
//  * follow your actual route (a breadcrumb trail) in a loose formation, matching your pace,
//    crouching when you crouch; smooth steering with string-pulled paths, never bunching up;
//  * scout a little way ahead into real, reachable corridors when you slow down;
//  * react to each entity the right way — run from crawlers, stare down (and freeze) the Watcher
//    with their torches, kill their light and back off from Smilers — and mark threats, Almond
//    Water and the exit with on-screen pings (no chat or voice in AI mode);
//  * pick up Almond Water and hand it over when you need it;
//  * never get stuck: progress watchdog, repath/sidestep, and an out-of-sight catch-up.

import * as THREE from 'three';
import type { Game } from '../Game';
import type { LevelDef } from '../levels/levels';
import { Avatar } from './Avatar';
import { findPath } from './Pathfinding';
import { inHub } from '../world/layout';
import type { Target } from './EntityManager';
import { profile, saveProfile } from '../core/Settings';

const BOT_NAMES = ['Marisol', 'Dex', 'Okonkwo', 'Juniper', 'Tomasz', 'Priya', 'Hollis'];
const DIRS: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

type Mode = 'follow' | 'scout' | 'flee' | 'watch' | 'avoid' | 'give' | 'idle';

class Bot {
  pos = new THREE.Vector3();
  vel = new THREE.Vector2();
  yaw = 0;
  lookYaw = 0;
  path: [number, number][] = [];
  repath = 0;
  alive = true;
  flash = false;
  mode: Mode = 'follow';
  modeT = 0;
  respawn = 0;
  carry = 0; // almond water bottles
  stuckT = 0;
  pathKey = '';
  /** absolute trail index this bot has reached (see Bots.trailBase) */
  trailAt = -1;
  /** where the bot was at the start of the current stuck-check window */
  checkPos = new THREE.Vector3();
  progT = 0;
  sideT = 0;
  sideDir = 1;
  stepPhase = 0;
  idleLookT = 0;
  scoutGoal: { x: number; z: number } | null = null;
  threatSeen = new Set<number>();
  constructor(
    public name: string,
    public avatar: Avatar,
    public slot: number,
  ) {}
}

export class Bots {
  list: Bot[] = [];
  root = new THREE.Group();
  enabled = false;
  def: LevelDef | null = null;
  private trail: THREE.Vector3[] = [];
  /** absolute index of trail[0]; grows as old breadcrumbs are dropped */
  private trailBase = 0;
  private stillT = 0;
  private exitKnown = false;
  private pingedItems = new Set<string>();
  constructor(private game: Game) {
    game.scene.add(this.root);
  }

  names() {
    return this.list.map((b) => b.name);
  }

  enable(n: number) {
    this.enabled = true;
    const start = Math.floor(Math.random() * BOT_NAMES.length);
    for (let i = 0; i < n; i++) {
      const name = BOT_NAMES[(start + i) % BOT_NAMES.length];
      const av = new Avatar(name, true, ['hoodie_red', 'hoodie_blue', 'janitor_grey'][i % 3]);
      const b = new Bot(name, av, i);
      this.root.add(av.root);
      this.list.push(b);
    }
  }

  setLevel(def: LevelDef) {
    this.def = def;
    const p = this.game.player.pos;
    this.trail = [p.clone()];
    this.trailBase = 0;
    this.exitKnown = false;
    this.pingedItems.clear();
    this.list.forEach((b, i) => {
      b.pos.set(p.x + Math.cos(i * 2) * 1.2, 0, p.z + Math.sin(i * 2) * 1.2);
      b.vel.set(0, 0);
      b.path = [];
      b.trailAt = -1;
      b.checkPos.copy(b.pos);
      b.alive = true;
      b.mode = 'follow';
      b.avatar.root.visible = true;
    });
  }

  targets(): Target[] {
    return this.list.map((b) => ({ id: 'bot:' + b.name, x: b.pos.x, z: b.pos.z, alive: b.alive, lit: b.flash, bot: true, fx: Math.sin(b.yaw), fz: Math.cos(b.yaw) }));
  }

  // ------------------------------------------------------------------ helpers
  private cell(x: number, z: number): [number, number] {
    const c = this.def!.cell;
    return [Math.floor(x / c), Math.floor(z / c)];
  }

  /** point on the player's trail `dist` metres back from the player */
  private trailPoint(dist: number): THREE.Vector3 {
    const t = this.trail;
    let acc = 0;
    for (let i = t.length - 1; i > 0; i--) {
      const seg = t[i].distanceTo(t[i - 1]);
      if (acc + seg >= dist) return t[i].clone().lerp(t[i - 1], (dist - acc) / seg);
      acc += seg;
    }
    return t[0].clone();
  }

  /** absolute trail index `dist` metres back from the player */
  private trailIndexBack(dist: number): number {
    const t = this.trail;
    let acc = 0;
    for (let i = t.length - 1; i > 0; i--) {
      acc += t[i].distanceTo(t[i - 1]);
      if (acc >= dist) return this.trailBase + i - 1;
    }
    return this.trailBase;
  }

  /**
   * Pure pursuit along the player's breadcrumbs: aim at the farthest crumb (up to this bot's slot
   * in the line) that is in clear view. Null if the bot has lost the trail (then A* takes over).
   */
  private followTrail(b: Bot, back: number): THREE.Vector3 | null {
    const t = this.trail;
    if (t.length < 2) return null;
    const goalAbs = this.trailIndexBack(back);
    const from = Math.max(this.trailBase, b.trailAt < 0 ? goalAbs - 40 : b.trailAt - 2);
    for (let a = goalAbs; a >= from; a--) {
      const q = t[a - this.trailBase];
      if (q && this.clear(b.pos.x, b.pos.z, q.x, q.z, 0.3)) {
        if (b.trailAt < 0 || a > b.trailAt) b.trailAt = a;
        return q;
      }
    }
    return null;
  }

  /** how far the bot is behind its place in line, measured along the trail when it's on it */
  private trailGap(b: Bot, back: number, goal: THREE.Vector3): number {
    const goalAbs = this.trailIndexBack(back);
    if (b.trailAt < this.trailBase) return Math.hypot(goal.x - b.pos.x, goal.z - b.pos.z);
    let d = 0;
    const t = this.trail;
    const s0 = b.trailAt - this.trailBase;
    const s1 = goalAbs - this.trailBase;
    if (s0 >= s1) return Math.hypot(goal.x - b.pos.x, goal.z - b.pos.z);
    d += Math.hypot(t[s0].x - b.pos.x, t[s0].z - b.pos.z);
    for (let i = s0; i < s1; i++) d += t[i].distanceTo(t[i + 1]);
    return d;
  }

  /** breadth-first over open cells: pick the best-scoring cell within `depth` steps */
  private bestCell(from: [number, number], depth: number, score: (gx: number, gz: number) => number): { x: number; z: number } | null {
    const cache = this.game.world!.cache;
    const c = this.def!.cell;
    const seen = new Set<string>([from.join(',')]);
    let frontier = [from];
    let best: [number, number] | null = null;
    let bestS = -Infinity;
    for (let d = 0; d < depth; d++) {
      const next: [number, number][] = [];
      for (const [x, z] of frontier)
        for (let k = 0; k < 4; k++) {
          if (!cache.open(x, z, k)) continue;
          const n: [number, number] = [x + DIRS[k][0], z + DIRS[k][1]];
          const key = n.join(',');
          if (seen.has(key)) continue;
          seen.add(key);
          next.push(n);
          const s = score(n[0], n[1]);
          if (s > bestS) {
            bestS = s;
            best = n;
          }
        }
      frontier = next;
    }
    return best ? { x: (best[0] + 0.5) * c, z: (best[1] + 0.5) * c } : null;
  }

  /** line of sight wide enough for a body (two rays offset by the radius): no corner snagging */
  private clear(ax: number, az: number, bx: number, bz: number, r = 0.34) {
    const col = this.game.collider;
    const dx = bx - ax;
    const dz = bz - az;
    const d = Math.hypot(dx, dz) || 1;
    const ox = (-dz / d) * r;
    const oz = (dx / d) * r;
    return col.los(ax + ox, az + oz, bx + ox, bz + oz) && col.los(ax - ox, az - oz, bx - ox, bz - oz);
  }

  private visibleToPlayer(p: THREE.Vector3) {
    const cam = this.game.camera;
    const v = p.clone().setY(1.2).project(cam);
    if (v.z > 1 || Math.abs(v.x) > 1.1 || Math.abs(v.y) > 1.1) return false;
    return this.game.collider.los(cam.position.x, cam.position.z, p.x, p.z);
  }

  private ping(pos: THREE.Vector3, kind: 'threat' | 'item' | 'exit', label: string) {
    // no on-screen callouts (by request): bots communicate only through what they do
    void pos;
    void kind;
    void label;
  }

  // ------------------------------------------------------------------ per frame
  update(dt: number) {
    if (!this.enabled || !this.def || !this.game.world) return;
    const g = this.game;
    const def = this.def;
    const me = g.player.pos;
    const cell = def.cell;
    // breadcrumb trail of where the player has actually walked
    const last = this.trail[this.trail.length - 1];
    if (!last || last.distanceTo(me) > 0.6) {
      this.trail.push(me.clone());
      if (this.trail.length > 160) {
        this.trail.shift();
        this.trailBase++;
      }
    }
    this.stillT = g.player.speed < 0.3 ? this.stillT + dt : 0;
    const exitIt = g.objects?.interactables.find((i) => i.kind === 'exit');

    for (const b of this.list) {
      if (!b.alive) {
        b.respawn -= dt;
        if (b.respawn <= 0 && !this.visibleToPlayer(this.trailPoint(6))) {
          b.alive = true;
          b.trailAt = -1;
          b.pos.copy(this.trailPoint(6));
          b.avatar.root.visible = true;
        }
        continue;
      }
      const inBase = inHub(def.id, ...this.cell(b.pos.x, b.pos.z));

      // --- perception
      let threat: { pos: THREE.Vector3; kind: string; id: number } | null = null;
      let td = Infinity;
      for (const e of g.entities.list) {
        const d = Math.hypot(e.pos.x - b.pos.x, e.pos.z - b.pos.z);
        if (e.kind !== 'faceling' && d < 16 && e.visible > 0.4 && d < td && g.collider.los(b.pos.x, b.pos.z, e.pos.x, e.pos.z)) {
          threat = { pos: e.pos, kind: e.kind, id: e.id };
          td = d;
        }
        if (d < 0.9 && (e.state === 'chase' || e.kind === 'howler') && !inBase) {
          b.alive = false;
          b.respawn = 25;
          b.avatar.root.visible = false;
          b.avatar.setFlashlight(false);
          g.audio.play('crawler_scream', { pos: b.pos, gain: 0.8, occlude: true });
        }
      }
      if (!b.alive) continue;
      if (threat && !b.threatSeen.has(threat.id)) {
        b.threatSeen.add(threat.id);
        this.ping(threat.pos, 'threat', threat.kind === 'howler' ? "Don't look away" : threat.kind === 'smiler' ? 'Lights off' : 'Run');
        g.audio.play('breath_in', { pos: b.pos, gain: 0.35, rate: 1.1, occlude: true });
      }
      if (exitIt && !this.exitKnown && Math.hypot(exitIt.pos.x - b.pos.x, exitIt.pos.z - b.pos.z) < 18 && g.collider.los(b.pos.x, b.pos.z, exitIt.pos.x, exitIt.pos.z)) {
        this.exitKnown = true;
        this.ping(exitIt.pos.clone(), 'exit', 'Way out');
      }
      // pick up Almond Water, point out what they can't carry
      for (const it of g.objects?.interactables ?? []) {
        if (it.kind !== 'pickup') continue;
        const d = Math.hypot(it.pos.x - b.pos.x, it.pos.z - b.pos.z);
        if (d < 1.0 && b.carry < 2) {
          g.objects!.consume(it.data as number);
          b.carry++;
          g.audio.play('bottle_open', { pos: b.pos, gain: 0.3, rate: 1.3 });
        } else if (d < 10 && !this.pingedItems.has(it.id) && g.collider.los(b.pos.x, b.pos.z, it.pos.x, it.pos.z)) {
          this.pingedItems.add(it.id);
          this.ping(it.pos.clone(), 'item', 'Almond Water');
        }
      }

      // --- decide
      const p = g.player;
      const dMe = Math.hypot(me.x - b.pos.x, me.z - b.pos.z);
      const needs = b.carry > 0 && (g.sanity < 0.5 || p.stamina < 0.2) && (profile.inventory.almond ?? 0) === 0;
      b.modeT -= dt;
      if (threat && !inBase) {
        b.mode = threat.kind === 'howler' ? 'watch' : threat.kind === 'smiler' ? 'avoid' : 'flee';
        b.modeT = 3;
      } else if (needs) b.mode = 'give';
      else if (b.modeT <= 0 || b.mode === 'give') {
        const still = this.stillT > 2.5;
        b.mode = still ? (b.slot === 0 && Math.random() < 0.5 ? 'scout' : 'idle') : 'follow';
        b.modeT = still ? 5 + Math.random() * 4 : 2;
        b.scoutGoal = null;
      }

      // --- goal & speed
      let goal = this.trailPoint(2.2 + b.slot * 1.4);
      let speed = 0;
      const pace = Math.max(1.6, p.speed);
      // when following, walk the player's own breadcrumbs (always walkable) instead of re-planning
      let trailTarget: THREE.Vector3 | null = null;
      let crouch = p.crouching && dMe < 12;
      let look: number | null = null;
      switch (b.mode) {
        case 'follow': {
          trailTarget = this.followTrail(b, 2.2 + b.slot * 1.4);
          const behind = this.trailGap(b, 2.2 + b.slot * 1.4, goal);
          // keep pace, and run faster than a sprinting player to close a gap (players top out at 5.4)
          speed = behind < 0.4 ? 0 : Math.min(6.2, pace + Math.max(0, behind - 0.8) * 1.4);
          break;
        }
        case 'give':
          goal = me.clone();
          speed = dMe > 1.6 ? Math.min(5, 1.5 + dMe) : 0;
          if (dMe < 1.8) {
            b.carry--;
            profile.inventory.almond = (profile.inventory.almond ?? 0) + 1;
            saveProfile();
            b.mode = 'follow';
          }
          break;
        case 'scout': {
          if (!b.scoutGoal) {
            const f = new THREE.Vector3(0, 0, -1).applyQuaternion(g.camera.quaternion);
            const toward = exitIt && this.exitKnown ? exitIt.pos : me.clone().addScaledVector(f, 20);
            b.scoutGoal = this.bestCell(this.cell(me.x, me.z), 5, (gx, gz) => {
              const x = (gx + 0.5) * cell;
              const z = (gz + 0.5) * cell;
              const dm = Math.hypot(x - me.x, z - me.z);
              return -Math.hypot(x - toward.x, z - toward.z) * 0.3 - Math.abs(dm - 9) + Math.random() * 2;
            });
          }
          goal = b.scoutGoal ? new THREE.Vector3(b.scoutGoal.x, 0, b.scoutGoal.z) : goal;
          speed = dMe > 14 ? 0 : 1.8;
          if (dMe > 15) b.mode = 'follow';
          break;
        }
        case 'idle': {
          goal = this.trailPoint(2.2 + b.slot * 1.4);
          trailTarget = this.followTrail(b, 2.2 + b.slot * 1.4);
          const behind = this.trailGap(b, 2.2 + b.slot * 1.4, goal);
          speed = behind > 1.2 ? Math.min(4, 1.4 + behind * 0.5) : 0;
          b.idleLookT -= dt;
          if (b.idleLookT <= 0) {
            b.idleLookT = 1.5 + Math.random() * 2.5;
            // glance down an open corridor, or at you
            const [gx, gz] = this.cell(b.pos.x, b.pos.z);
            const open = [0, 1, 2, 3].filter((k) => g.world!.cache.open(gx, gz, k));
            if (open.length && Math.random() < 0.75) {
              const k = open[Math.floor(Math.random() * open.length)];
              b.lookYaw = Math.atan2(DIRS[k][0], DIRS[k][1]);
            } else b.lookYaw = Math.atan2(me.x - b.pos.x, me.z - b.pos.z);
          }
          look = b.lookYaw;
          break;
        }
        case 'flee': {
          const t = threat?.pos ?? b.pos;
          const safe = this.bestCell(this.cell(b.pos.x, b.pos.z), 6, (gx, gz) => {
            const x = (gx + 0.5) * cell;
            const z = (gz + 0.5) * cell;
            return Math.hypot(x - t.x, z - t.z) - 0.4 * Math.hypot(x - me.x, z - me.z) + (inHub(def.id, gx, gz) ? 20 : 0);
          });
          if (safe) goal = new THREE.Vector3(safe.x, 0, safe.z);
          speed = 5.0;
          crouch = false;
          break;
        }
        case 'watch': {
          // keep the Watcher in the torch beam: it can't move while someone is looking
          const t = threat!.pos;
          look = Math.atan2(t.x - b.pos.x, t.z - b.pos.z);
          const d = Math.hypot(t.x - b.pos.x, t.z - b.pos.z);
          if (d < 5) {
            goal = b.pos.clone().addScaledVector(new THREE.Vector3(b.pos.x - t.x, 0, b.pos.z - t.z).normalize(), 2);
            speed = 1.0; // back away slowly, still facing it
          }
          break;
        }
        case 'avoid': {
          const t = threat!.pos;
          goal = b.pos.clone().addScaledVector(new THREE.Vector3(b.pos.x - t.x, 0, b.pos.z - t.z).normalize(), 4);
          look = Math.atan2(b.pos.x - t.x, b.pos.z - t.z); // eyes off it
          speed = 2.2;
          break;
        }
      }

      // --- path: A* over cells, then string-pull to the farthest waypoint in line of sight
      const gcell = this.cell(goal.x, goal.z);
      const bcell = this.cell(b.pos.x, b.pos.z);
      b.repath -= dt;
      const key = gcell.join(',');
      // collider.los only knows walls, not corner pillars: shortcut only along straight runs of cells
      const sameCell = gcell[0] === bcell[0] && gcell[1] === bcell[1];
      const inLine = gcell[0] === bcell[0] || gcell[1] === bcell[1];
      const direct = !!trailTarget || sameCell || (inLine && Math.hypot(goal.x - b.pos.x, goal.z - b.pos.z) < cell * 3 && this.clear(b.pos.x, b.pos.z, goal.x, goal.z));
      // keep a path until the goal cell changes (re-planning every tick flips between equal routes)
      if (speed > 0 && !direct && (key !== b.pathKey || !b.path.length || b.repath <= 0)) {
        b.repath = 3;
        b.pathKey = key;
        const pth = gcell[0] === bcell[0] && gcell[1] === bcell[1] ? null : findPath(g.world!.cache, bcell[0], bcell[1], gcell[0], gcell[1], undefined, 900);
        b.path = pth ? pth.slice(1) : [];
      }
      let tx = trailTarget ? trailTarget.x : goal.x;
      let tz = trailTarget ? trailTarget.z : goal.z;
      if (!direct && b.path.length) {
        // drop waypoints we've reached, then string-pull through the next few that are in clear view
        while (b.path.length > 1 && Math.hypot((b.path[0][0] + 0.5) * cell - b.pos.x, (b.path[0][1] + 0.5) * cell - b.pos.z) < cell * 0.45) b.path.shift();
        let k = 0;
        const [c0x, c0z] = this.cell(b.pos.x, b.pos.z);
        for (let i = 0; i < Math.min(b.path.length, 5); i++) {
          const rowX = b.path.slice(0, i + 1).every((q) => q[0] === c0x);
          const rowZ = b.path.slice(0, i + 1).every((q) => q[1] === c0z);
          if ((rowX || rowZ) && this.clear(b.pos.x, b.pos.z, (b.path[i][0] + 0.5) * cell, (b.path[i][1] + 0.5) * cell)) k = i;
          else break;
        }
        tx = (b.path[k][0] + 0.5) * cell;
        tz = (b.path[k][1] + 0.5) * cell;
      }

      // --- steering: seek + separation from the player and the other bots
      const want = new THREE.Vector2(tx - b.pos.x, tz - b.pos.z);
      const dist = want.length();
      if (dist > 0.05) want.multiplyScalar(Math.min(speed, dist * 2.5) / dist);
      else want.set(0, 0);
      const sep = new THREE.Vector2();
      const push = (x: number, z: number, r: number) => {
        const dx = b.pos.x - x;
        const dz = b.pos.z - z;
        const d = Math.hypot(dx, dz);
        if (d < r && d > 1e-3) sep.add(new THREE.Vector2(dx / d, dz / d).multiplyScalar((r - d) * 3));
      };
      push(me.x, me.z, 1.3);
      for (const o of this.list) if (o !== b && o.alive) push(o.pos.x, o.pos.z, 1.2);
      want.add(sep);
      if (b.sideT > 0) {
        // unsticking: slide along whatever is in the way rather than pushing straight into it
        b.sideT -= dt;
        const l = want.length() || speed;
        want.set(-want.y, want.x).setLength(l * b.sideDir).add(want.clone().multiplyScalar(0.3));
      }
      const accel = speed > 0 ? 10 : 14;
      const dv = want.clone().sub(b.vel);
      const maxDv = accel * dt;
      if (dv.length() > maxDv) dv.setLength(maxDv);
      b.vel.add(dv);
      if (b.vel.length() > 6.2) b.vel.setLength(6.2);
      const r = g.collider.resolve(b.pos.x + b.vel.x * dt, b.pos.z + b.vel.y * dt, 0.28);
      const moved = Math.hypot(r.x - b.pos.x, r.z - b.pos.z);
      b.pos.x = r.x;
      b.pos.z = r.z;
      const actual = moved / Math.max(dt, 1e-4);

      // --- watchdog: stuck means "trying to move but not actually going anywhere" (the goal itself
      // moves with the player, so distance-to-goal can't tell). Re-plan and slide sideways; if that
      // keeps failing, catch up out of sight.
      b.progT += dt;
      if (speed < 0.5 || dist < 0.6) {
        b.progT = 0;
        b.stuckT = Math.max(0, b.stuckT - dt);
        b.checkPos.copy(b.pos);
      } else if (b.progT > 1.2) {
        const went = Math.hypot(b.pos.x - b.checkPos.x, b.pos.z - b.checkPos.z);
        if (went < Math.min(1.0, speed * 1.2 * 0.35)) {
          b.stuckT += b.progT;
          b.path = [];
          b.pathKey = '';
          b.trailAt = -1;
          b.sideT = 0.6;
          b.sideDir = -b.sideDir;
        } else b.stuckT = Math.max(0, b.stuckT - b.progT);
        b.progT = 0;
        b.checkPos.copy(b.pos);
      }
      const far = dMe > 40 || b.stuckT > 5;
      if (far && !this.visibleToPlayer(b.pos)) {
        const back = this.trailPoint(5 + b.slot * 1.5);
        if (!this.visibleToPlayer(back) || dMe > 60) {
          b.pos.copy(back);
          b.vel.set(0, 0);
          b.path = [];
          b.trailAt = -1;
          b.stuckT = 0;
          b.checkPos.copy(b.pos);
        }
      }

      // --- presentation
      // face where we're heading, but ignore the little shoves from separation so bodies don't twitch
      if (look === null && actual > 0.6 && b.vel.length() > 0.6) look = Math.atan2(b.vel.x, b.vel.y);
      if (look === null && dMe < 4 && b.mode === 'follow') look = Math.atan2(me.x - b.pos.x, me.z - b.pos.z);
      if (look !== null) b.yaw = look;
      b.flash = b.mode === 'watch' || (b.mode !== 'avoid' && g.world!.sampleE(b.pos.x, b.pos.z) < 0.12);
      b.avatar.setFlashlight(b.flash);
      b.avatar.root.position.copy(b.pos);
      const dy = ((b.yaw - b.avatar.root.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      b.avatar.root.rotation.y += dy * Math.min(1, dt * 7);
      b.avatar.locomote(actual, crouch, dt);
      // footsteps, like any other player
      if (actual > 0.3) {
        b.stepPhase += (actual * dt) / (actual > 3.6 ? 1.35 : crouch ? 0.7 : 0.9);
        if (b.stepPhase >= 1) {
          b.stepPhase = 0;
          g.audio.play(g.surfaceAt(b.pos.x, b.pos.z), { pos: { x: b.pos.x, y: 0.1, z: b.pos.z }, gain: crouch ? 0.15 : actual > 3.6 ? 0.75 : 0.4, occlude: true, reverb: 0.3, hrtf: false, rate: 0.95 + Math.random() * 0.1 });
        }
      }
    }
  }
}
