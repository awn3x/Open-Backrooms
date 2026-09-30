// Electrical spark bursts from damaged outlets: additive particles with
// gravity plus a brief blue-white light flash.

import * as THREE from 'three';

const MAX = 256;

export class Sparks {
  points: THREE.Points;
  private pos = new Float32Array(MAX * 3);
  private vel = new Float32Array(MAX * 3);
  private life = new Float32Array(MAX);
  private next = 0;
  flash: THREE.PointLight;
  private flashT = 0;

  constructor(scene: THREE.Scene) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    g.setAttribute('life', new THREE.BufferAttribute(this.life, 1));
    const m = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `attribute float life; varying float vL; void main(){ vL = life; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * mv; gl_PointSize = life > 0.0 ? (18.0 * life + 2.0) / -mv.z : 0.0; }`,
      fragmentShader: `varying float vL; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(d)); gl_FragColor = vec4(vec3(1.0, 0.85, 0.55) * (4.0 + 20.0 * vL) , a * vL); }`,
    });
    this.points = new THREE.Points(g, m);
    this.points.frustumCulled = false;
    scene.add(this.points);
    this.flash = new THREE.PointLight(0xa8c8ff, 0, 6, 2);
    scene.add(this.flash);
  }

  burst(x: number, y: number, z: number, nx: number, nz: number, n = 24) {
    for (let i = 0; i < n; i++) {
      const k = this.next++ % MAX;
      this.pos.set([x + nx * 0.02, y, z + nz * 0.02], k * 3);
      const s = 1 + Math.random() * 2.5;
      this.vel.set([nx * s + (Math.random() - 0.5) * 2, Math.random() * 2.2, nz * s + (Math.random() - 0.5) * 2], k * 3);
      this.life[k] = 0.4 + Math.random() * 0.6;
    }
    this.flash.position.set(x + nx * 0.2, y + 0.1, z + nz * 0.2);
    this.flashT = 0.12;
  }

  update(dt: number) {
    for (let i = 0; i < MAX; i++) {
      if (this.life[i] <= 0) continue;
      this.life[i] -= dt * 1.6;
      this.vel[i * 3 + 1] -= 9.8 * dt;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      if (this.pos[i * 3 + 1] < 0.01) {
        this.pos[i * 3 + 1] = 0.01;
        this.vel[i * 3 + 1] *= -0.3;
        this.vel[i * 3] *= 0.5;
        this.vel[i * 3 + 2] *= 0.5;
      }
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.life.needsUpdate = true;
    this.flashT -= dt;
    this.flash.intensity = this.flashT > 0 ? 6 * (Math.random() * 0.6 + 0.4) : 0;
  }
}
