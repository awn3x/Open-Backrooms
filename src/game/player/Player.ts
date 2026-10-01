// First-person body: acceleration-based movement at real human speeds,
// stamina, crouch, jump, and a layered head-motion model (gait bob & sway,
// footfall dip, lean into turns/strafes, breathing, handheld tremor, spring
// impulses) so the camera feels carried by a person.

import * as THREE from 'three';
import { clamp, damp, lerp } from '../core/rng';
import type { Input } from '../core/Input';
import type { Collider } from '../world/collision';
import { settings } from '../core/Settings';

export interface StepEvent {
  foot: -1 | 1;
  speed: number;
  loudness: number; // 0..1 how far entities hear it
  landing?: boolean;
}

class Spring {
  v = new THREE.Vector3();
  x = new THREE.Vector3();
  constructor(
    private k = 90,
    private d = 12,
  ) {}
  kick(x: number, y: number, z: number) {
    this.v.x += x;
    this.v.y += y;
    this.v.z += z;
  }
  step(dt: number) {
    const ax = -this.k * this.x.x - this.d * this.v.x;
    const ay = -this.k * this.x.y - this.d * this.v.y;
    const az = -this.k * this.x.z - this.d * this.v.z;
    this.v.x += ax * dt;
    this.v.y += ay * dt;
    this.v.z += az * dt;
    this.x.addScaledVector(this.v, dt);
  }
}

// cheap smooth 1D noise for tremor
function n1(t: number, seed: number) {
  const i = Math.floor(t);
  const f = t - i;
  const h = (k: number) => {
    const s = Math.sin((k + seed * 17.13) * 127.1) * 43758.5453;
    return s - Math.floor(s) - 0.5;
  };
  const u = f * f * (3 - 2 * f);
  return h(i) * (1 - u) + h(i + 1) * u;
}

export class Player {
  pos = new THREE.Vector3(0, 0, 0);
  vel = new THREE.Vector3();
  yaw = 0;
  pitch = 0;
  eye = 1.62;
  crouching = false;
  sprinting = false;
  stamina = 1;
  fear = 0; // 0..1 set by the game from entity proximity / darkness
  radius = 0.28;
  flashlight = false;
  battery = 1;
  onGround = true;
  vy = 0;
  alive = true;
  frozen = false;
  /** sitting on a couch / armchair: look around freely, no walking */
  seated: { x: number; z: number } | null = null;
  onStep?: (e: StepEvent) => void;
  onBump?: (speed: number) => void;

  private phase = 0;
  private lastFoot = 0;
  private bobAmp = 0;
  private roll = 0;
  private strafe = 0;
  private breath = 0;
  private spring = new Spring(80, 11);
  private rotSpring = new Spring(60, 9);
  private time = 0;
  private landVel = 0;
  distance = 0;

  constructor(
    public camera: THREE.PerspectiveCamera,
    private input: Input,
    public collider: Collider,
  ) {}

  teleport(x: number, z: number, yaw = this.yaw) {
    this.pos.set(x, 0, z);
    this.vel.set(0, 0, 0);
    this.yaw = yaw;
    this.pitch = 0;
  }

  kick(pitch: number, yaw: number, roll: number) {
    this.rotSpring.kick(pitch, yaw, roll);
  }

  update(dt: number) {
    this.time += dt;
    const inp = this.input;
    const pad = inp.pad();
    const sens = 0.0032 * settings.sensitivity;
    if (!this.frozen) {
      this.yaw -= inp.mouseDX * sens + (pad ? pad.lx * dt * 2.6 : 0);
      this.pitch -= (inp.mouseDY * sens + (pad ? pad.ly * dt * 2.0 : 0)) * (settings.invertY ? -1 : 1);
      this.pitch = clamp(this.pitch, -1.45, 1.45);
    }

    // --- intent
    let mx = 0;
    let mz = 0;
    if (!this.frozen && this.alive && !this.seated) {
      if (inp.down('KeyW') || inp.down('ArrowUp')) mz -= 1;
      if (inp.down('KeyS') || inp.down('ArrowDown')) mz += 1;
      if (inp.down('KeyA') || inp.down('ArrowLeft')) mx -= 1;
      if (inp.down('KeyD') || inp.down('ArrowRight')) mx += 1;
      if (pad) {
        mx += pad.mx;
        mz += pad.mz;
      }
    }
    const ml = Math.hypot(mx, mz);
    if (ml > 1) {
      mx /= ml;
      mz /= ml;
    }
    const wantCrouch = !this.frozen && (inp.down('KeyC') || inp.down('ControlLeft') || !!pad?.crouch);
    this.crouching = wantCrouch;
    const wantSprint = !this.crouching && (inp.down('ShiftLeft') || inp.down('ShiftRight') || !!pad?.sprint) && mz < 0;
    const exhausted = this.stamina < 0.05;
    this.sprinting = wantSprint && !exhausted && ml > 0.1;
    const maxSpeed = this.crouching ? 1.4 : this.sprinting ? 5.4 : 2.9;
    // stamina
    if (this.sprinting) this.stamina = Math.max(0, this.stamina - dt * 0.09);
    else this.stamina = Math.min(1, this.stamina + dt * (ml > 0.1 ? 0.08 : 0.16));

    // --- acceleration toward target velocity in world space
    const sy = Math.sin(this.yaw);
    const cy = Math.cos(this.yaw);
    const tx = (mx * cy + mz * sy) * maxSpeed;
    const tz = (-mx * sy + mz * cy) * maxSpeed;
    const accel = ml > 0.1 ? 14 : 16;
    const k = damp(accel, dt);
    this.vel.x = lerp(this.vel.x, tx, k);
    this.vel.z = lerp(this.vel.z, tz, k);

    // jump
    if (this.onGround && !this.frozen && inp.hit('Space') && !this.crouching && this.stamina > 0.1) {
      this.vy = 3.6;
      this.onGround = false;
      this.stamina -= 0.08;
    }
    if (!this.onGround) {
      this.vy -= 9.81 * dt;
      this.pos.y += this.vy * dt;
      if (this.pos.y <= 0) {
        this.pos.y = 0;
        this.onGround = true;
        this.landVel = -this.vy;
        this.spring.kick(0, -this.landVel * 0.25, 0);
        this.onStep?.({ foot: 1, speed: this.landVel, loudness: clamp(this.landVel / 4, 0.3, 1), landing: true });
        this.vy = 0;
      }
    }

    // --- move with collision
    const ox = this.pos.x;
    const oz = this.pos.z;
    const nx = this.pos.x + this.vel.x * dt;
    const nz = this.pos.z + this.vel.z * dt;
    const r = this.collider.resolve(nx, nz, this.radius);
    this.pos.x = r.x;
    this.pos.z = r.z;
    if (r.hit) {
      const into = -(this.vel.x * r.nx + this.vel.z * r.nz);
      if (into > 2.2) {
        this.onBump?.(into);
        this.spring.kick(-r.nx * into * 0.02, -0.02 * into, -r.nz * into * 0.02);
      }
      // remove velocity into the wall
      if (into > 0) {
        this.vel.x += r.nx * into;
        this.vel.z += r.nz * into;
      }
    }
    const moved = Math.hypot(this.pos.x - ox, this.pos.z - oz);
    this.distance += moved;
    const speed = moved / Math.max(dt, 1e-4);

    // --- gait phase (one footfall per half cycle)
    const stride = this.sprinting ? 1.35 : this.crouching ? 0.7 : 0.9;
    if (this.onGround) this.phase += (moved / stride) * Math.PI;
    const foot = Math.floor(this.phase / Math.PI);
    if (foot !== this.lastFoot && this.onGround && speed > 0.25) {
      this.lastFoot = foot;
      const loud = this.crouching ? 0.12 : this.sprinting ? 1 : 0.4;
      this.onStep?.({ foot: foot % 2 === 0 ? -1 : 1, speed, loudness: loud });
    }
    if (speed < 0.2) this.lastFoot = foot;

    // --- head motion: positional only, so aim never drifts
    const hb = settings.headBob;
    const targetAmp = clamp(speed / 2.9, 0, 1.6) * hb;
    this.bobAmp = lerp(this.bobAmp, targetAmp, damp(8, dt));
    const ph = this.phase;
    const bobY = (Math.cos(ph * 2) * 0.5 - 0.5) * 0.012 * this.bobAmp;
    const bobX = Math.sin(ph) * 0.008 * this.bobAmp;
    this.strafe = lerp(this.strafe, mx, damp(6, dt));
    this.roll = lerp(this.roll, -this.strafe * 0.008 * hb, damp(6, dt));
    // gentle breathing rise/fall when standing still (position only)
    const exertion = clamp((1 - this.stamina) * 1.4, 0, 1);
    this.breath += dt * (1.2 + exertion * 1.6);
    const breathY = Math.sin(this.breath) * (0.0025 + exertion * 0.004) * hb;
    // fear tremor only when genuinely threatened
    const tr = Math.max(0, this.fear - 0.5) * 0.004 * hb;
    const tp = n1(this.time * 3, 1) * tr;
    const ty = n1(this.time * 3, 2) * tr;

    this.spring.step(dt);
    this.rotSpring.step(dt);

    const eyeTarget = this.seated ? 1.08 : this.crouching ? 1.05 : 1.65;
    if (this.seated) {
      this.pos.x += (this.seated.x - this.pos.x) * Math.min(1, dt * 6);
      this.pos.z += (this.seated.z - this.pos.z) * Math.min(1, dt * 6);
    }
    this.eye = lerp(this.eye, eyeTarget, damp(12, dt));
    const cam = this.camera;
    cam.position.set(this.pos.x, this.pos.y + this.eye + bobY + breathY + this.spring.x.y, this.pos.z);
    cam.position.x += cy * bobX + this.spring.x.x;
    cam.position.z += -sy * bobX + this.spring.x.z;
    const e = new THREE.Euler(this.pitch + tp + this.rotSpring.x.x, this.yaw + ty + this.rotSpring.x.y, this.roll + this.rotSpring.x.z, 'YXZ');
    cam.quaternion.setFromEuler(e);
    const fovT = settings.fov + (this.sprinting ? 3 : 0);
    cam.fov = lerp(cam.fov, fovT, damp(4, dt));
    cam.updateProjectionMatrix();
  }

  get speed() {
    return Math.hypot(this.vel.x, this.vel.z);
  }
}
