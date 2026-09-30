// Shared humanoid avatar for remote players, AI companions and mimics:
// skinned glTF with blended walk/run/crouch clips, a flashlight and a name tag.

import * as THREE from 'three';
import { clone as skClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { loadGLTF } from '../assets';
import { patchEntityMaterial } from '../render/materials';
import { blobShadow } from '../render/blob';

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
  hoodie_red: 0xff6a5c,
  hoodie_blue: 0x7f9dff,
  hazmat_yellow: 0xffe35a,
  janitor_grey: 0xb0b0b0,
};

function nameTag(text: string) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 64;
  const g = c.getContext('2d')!;
  g.font = '600 22px Inter, system-ui, sans-serif';
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
      // only the hoodie takes the outfit colour; skin, denim, hair and shoes stay as modelled
      o.traverse((x) => {
        const m = x as THREE.Mesh;
        if (!m.isMesh) return;
        const list = (Array.isArray(m.material) ? m.material : [m.material]) as THREE.MeshStandardMaterial[];
        const next = list.map((mm) => {
          if (!/hoodie/i.test(mm.name)) return mm;
          const c = mm.clone();
          c.color.multiply(new THREE.Color(tint));
          return patchEntityMaterial(c);
        });
        m.material = next.length === 1 ? next[0] : next;
      });
      this.root.add(o, blobShadow(0.42, 0.34));
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
    else if (speed > 3.6) this.play('run');
    else if (speed > 0.25) this.play('walk');
    else this.play('idle');
    if (this.mixer) {
      // clips are authored at 2.0 m/s (walk), 5.0 m/s (run) and 1.2 m/s (crouch walk)
      this.mixer.timeScale = this.cur === 'walk' ? Math.max(0.5, speed / 2.0) : this.cur === 'run' ? speed / 5.0 : this.cur === 'crouchwalk' ? Math.max(0.5, speed / 1.2) : 1;
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
