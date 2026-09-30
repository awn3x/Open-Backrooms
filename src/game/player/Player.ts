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
  onStep?: (e: StepEvent) => void;
  onBump?: (speed: number) => void;

  private phase = 0;
  private lastFoot = 0;
  private bobAmp = 0;
  private roll = 0;
  private yawVel = 0;
  private lastYaw = 0;
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
    const sens = 0.0021 * settings.sensitivity;
    if (!this.frozen) {
      this.yaw -= inp.mouseDX * sens + (pad ? pad.lx * dt * 2.6 : 0);
      this.pitch -= (inp.mouseDY * sens + (pad ? pad.ly * dt * 2.0 : 0)) * (settings.invertY ? -1 : 1);
      this.pitch = clamp(this.pitch, -1.45, 1.45);
    }

    // --- intent
    let mx = 0;
    let mz = 0;
    if (!this.frozen && this.alive) {
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
    const maxSpeed = this.crouching ? 0.85 : this.sprinting ? 4.3 + this.fear * 0.5 : 1.45;
    // stamina
    if (this.sprinting) this.stamina = Math.max(0, this.stamina - dt * 0.11);
    else this.stamina = Math.min(1, this.stamina + dt * (ml > 0.1 ? 0.06 : 0.12));

    // --- acceleration toward target velocity in world space
    const sy = Math.sin(this.yaw);
    const cy = Math.cos(this.yaw);
    const tx = (mx * cy + mz * sy) * maxSpeed;
    const tz = (-mx * sy + mz * cy) * maxSpeed;
    const accel = ml > 0.1 ? (this.sprinting ? 5.5 : 7.5) : 9.5;
    const k = damp(accel, dt);
    this.vel.x = lerp(this.vel.x, tx, k);
    this.vel.z = lerp(this.vel.z, tz, k);

    // jump
    if (this.onGround && !this.frozen && inp.hit('Space') && !this.crouching && this.stamina > 0.1) {
      this.vy = 3.1;
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
        this.spring.kick(0, -this.landVel * 0.35, 0);
        this.rotSpring.kick(-this.landVel * 0.02, 0, (Math.random() - 0.5) * 0.02);
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
        this.spring.kick(-r.nx * into * 0.05, -0.05 * into, -r.nz * into * 0.05);
        this.rotSpring.kick(0.03 * into, 0, (Math.random() - 0.5) * 0.06 * into);
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
    const stride = this.sprinting ? 1.05 : this.crouching ? 0.5 : 0.72;
    if (this.onGround) this.phase += (moved / stride) * Math.PI;
    const foot = Math.floor(this.phase / Math.PI);
    if (foot !== this.lastFoot && this.onGround && speed > 0.25) {
      this.lastFoot = foot;
      const loud = this.crouching ? 0.12 : this.sprinting ? 1 : 0.4;
      this.onStep?.({ foot: foot % 2 === 0 ? -1 : 1, speed, loudness: loud });
      // footfall dip
      this.spring.kick(0, -0.08 * (this.sprinting ? 1.6 : 1), 0);
    }
    if (speed < 0.2) this.lastFoot = foot;

    // --- head motion
    const hb = settings.headBob;
    const targetAmp = clamp(speed / 1.45, 0, 3) * hb;
    this.bobAmp = lerp(this.bobAmp, targetAmp, damp(6, dt));
    const ph = this.phase;
    const bobY = (Math.cos(ph * 2) * -0.5 - 0.5) * 0.024 * this.bobAmp; // dips twice per cycle
    const bobX = Math.sin(ph) * 0.018 * this.bobAmp;
    // yaw velocity lean
    const dy = this.yaw - this.lastYaw;
    this.lastYaw = this.yaw;
    this.yawVel = lerp(this.yawVel, dy / Math.max(dt, 1e-4), damp(10, dt));
    this.strafe = lerp(this.strafe, mx, damp(5, dt));
    const targetRoll = (Math.sin(ph) * 0.009 * this.bobAmp - this.strafe * 0.018 * hb - clamp(this.yawVel, -4, 4) * 0.006 * hb);
    this.roll = lerp(this.roll, targetRoll, damp(8, dt));
    // breathing: faster with exertion / fear
    const exertion = clamp((1 - this.stamina) * 1.4 + this.fear * 0.8, 0, 1.6);
    this.breath += dt * (1.3 + exertion * 2.2);
    const breathY = Math.sin(this.breath) * (0.004 + exertion * 0.006) * hb;
    const breathP = Math.sin(this.breath + 0.6) * (0.0025 + exertion * 0.004) * hb;
    // handheld tremor
    const tr = (0.0016 + this.fear * 0.006 + (this.sprinting ? 0.003 : 0)) * hb;
    const tt = this.time * (0.9 + this.fear * 2.5);
    const tp = n1(tt, 1) * tr;
    const ty = n1(tt, 2) * tr;
    const trl = n1(tt * 0.7, 3) * tr * 1.5;

    this.spring.step(dt);
    this.rotSpring.step(dt);

    const eyeTarget = this.crouching ? 1.0 : 1.62;
    this.eye = lerp(this.eye, eyeTarget, damp(this.crouching ? 9 : 6, dt));
    const cam = this.camera;
    cam.position.set(this.pos.x, this.pos.y + this.eye + bobY + breathY + this.spring.x.y, this.pos.z);
    // lateral sway along the right vector
    cam.position.x += cy * bobX + this.spring.x.x;
    cam.position.z += -sy * bobX + this.spring.x.z;
    const e = new THREE.Euler(this.pitch + breathP + tp + this.rotSpring.x.x - (this.bobAmp * 0.004 * Math.abs(Math.sin(ph))), this.yaw + ty + this.rotSpring.x.y, this.roll + trl + this.rotSpring.x.z, 'YXZ');
    cam.quaternion.setFromEuler(e);
    // FOV: sprint & fear
    const fovT = settings.fov + (this.sprinting ? 4 : 0) - this.fear * 6;
    cam.fov = lerp(cam.fov, fovT, damp(3, dt));
    cam.updateProjectionMatrix();
  }

  get speed() {
    return Math.hypot(this.vel.x, this.vel.z);
  }
}
