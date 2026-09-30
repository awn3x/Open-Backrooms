// Shared humanoid avatar for remote players, AI companions and mimics:
// skinned glTF with blended walk/run/crouch clips, a flashlight and a name tag.

import * as THREE from 'three';
import { clone as skClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { loadGLTF } from '../assets';
import { patchEntityMaterial } from '../render/materials';

let tpl: Promise<{ scene: THREE.Object3D; clips: THREE.AnimationClip[] }> | null = null;
function template() {
  if (!tpl)
    tpl = loadGLTF('avatar').then((g) => {
      g.scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        m.castShadow = true;
        m.frustumCulled = false;
        const src = (Array.isArray(m.material) ? m.material : [m.material]) as THREE.MeshStandardMaterial[];
        const mats = src.map((mm) => {
          const s = mm.clone();
          if (m.geometry.getAttribute('color')) s.vertexColors = true;
          if (s.name.startsWith('Glow')) s.emissiveIntensity = 4;
          return patchEntityMaterial(s);
        });
        m.material = mats.length === 1 ? mats[0] : mats;
      });
      return { scene: g.scene, clips: g.animations };
    });
  return tpl;
}

export const OUTFITS: Record<string, number> = {
  hoodie_olive: 0xffffff,
  hoodie_red: 0xff8f86,
  hoodie_blue: 0x9fb8ff,
  hazmat_yellow: 0xfff08a,
  janitor_grey: 0xc8c8c8,
};

function nameTag(text: string) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 64;
  const g = c.getContext('2d')!;
  g.font = '28px VT323, monospace';
  g.textAlign = 'center';
  g.fillStyle = 'rgba(0,0,0,0.45)';
  const w = Math.min(250, g.measureText(text).width + 20);
  g.fillRect(128 - w / 2, 14, w, 36);
  g.fillStyle = '#e8e2c8';
  g.fillText(text, 128, 42);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: true, transparent: true }));
  s.scale.set(0.9, 0.225, 1);
  s.position.y = 2.0;
  return s;
}

export class Avatar {
  root = new THREE.Group();
  mixer: THREE.AnimationMixer | null = null;
  actions = new Map<string, THREE.AnimationAction>();
  cur = '';
  light: THREE.SpotLight | null = null;
  tag: THREE.Sprite | null = null;
  ready: Promise<void>;
  constructor(name: string, withLight = true, outfit = 'hoodie_olive') {
    this.ready = template().then(({ scene, clips }) => {
      const o = skClone(scene);
      const tint = OUTFITS[outfit] ?? 0xffffff;
      o.traverse((x) => {
        const m = x as THREE.Mesh;
        if (m.isMesh && !Array.isArray(m.material)) {
          m.material = (m.material as THREE.MeshStandardMaterial).clone();
          (m.material as THREE.MeshStandardMaterial).color.set(tint);
          patchEntityMaterial(m.material as THREE.MeshStandardMaterial);
        }
      });
      this.root.add(o);
      this.mixer = new THREE.AnimationMixer(o);
      for (const c of clips) this.actions.set(c.name, this.mixer.clipAction(c));
      this.play('idle');
    });
    if (name) {
      this.tag = nameTag(name);
      this.root.add(this.tag);
    }
    if (withLight) {
      const l = new THREE.SpotLight(0xfff1dc, 0, 16, 0.4, 0.6, 1.8);
      l.position.set(-0.28, 1.2, 0.2);
      const t = new THREE.Object3D();
      t.position.set(-0.28, 0.9, 6);
      this.root.add(l, t);
      l.target = t;
      this.light = l;
    }
  }
  play(name: string) {
    if (name === this.cur || !this.actions.has(name)) return;
    const next = this.actions.get(name)!;
    next.reset().play();
    const prev = this.actions.get(this.cur);
    if (prev) prev.crossFadeTo(next, 0.25, false);
    this.cur = name;
  }
  /** Choose a clip from ground speed & crouch. */
  locomote(speed: number, crouch: boolean, dt: number) {
    if (crouch) this.play(speed > 0.2 ? 'crouchwalk' : 'crouch');
    else if (speed > 2.6) this.play('run');
    else if (speed > 0.25) this.play('walk');
    else this.play('idle');
    if (this.mixer) {
      this.mixer.timeScale = this.cur === 'walk' ? Math.max(0.6, speed / 1.4) : this.cur === 'run' ? speed / 4.2 : 1;
      this.mixer.update(dt);
    }
  }
  setFlashlight(on: boolean) {
    if (this.light) this.light.intensity = on ? 22 : 0;
  }
  dispose() {
    this.root.removeFromParent();
    this.mixer?.stopAllAction();
  }
}
