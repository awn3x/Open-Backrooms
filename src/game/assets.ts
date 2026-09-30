// Asset loading: level texture sets, glTF models (as scene templates and as
// flattened prototypes for chunk merging), and the audio manifest.

import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { ProtoPart, Protos } from './world/mesher';

// The game page lives at <site>/play/; assets are published at <site>/assets/.
function siteRoot(): string {
  let p = location.pathname;
  if (!p.endsWith('/') && !/\.html?$/.test(p)) p += '/';
  p = p.replace(/[^/]*$/, ''); // strip file name
  p = p.replace(/play\/$/, '');
  return location.origin + p;
}
const BASE = siteRoot() + 'assets/';

export function assetUrl(path: string) {
  return BASE + path;
}

const texLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

export type Tier = 'hi' | 'lo';

export interface TexSet {
  map: THREE.Texture;
  normalMap: THREE.Texture;
  orm: THREE.Texture;
}

let maxAniso = 8;
export function setMaxAnisotropy(n: number) {
  maxAniso = n;
}

export function loadTexture(path: string, srgb: boolean, repeat = true): Promise<THREE.Texture> {
  return new Promise((res, rej) =>
    texLoader.load(
      assetUrl(path),
      (t) => {
        t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
        if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.anisotropy = maxAniso;
        t.generateMipmaps = true;
        t.minFilter = THREE.LinearMipmapLinearFilter;
        res(t);
      },
      undefined,
      rej,
    ),
  );
}

export async function loadTexSet(name: string, tier: Tier): Promise<TexSet> {
  const [map, normalMap, orm] = await Promise.all([
    loadTexture(`textures/${tier}/${name}_albedo.webp`, true),
    loadTexture(`textures/${tier}/${name}_normal.webp`, false),
    loadTexture(`textures/${tier}/${name}_orm.webp`, false),
  ]);
  return { map, normalMap, orm };
}

const gltfCache = new Map<string, Promise<GLTF>>();
export function loadGLTF(name: string): Promise<GLTF> {
  let p = gltfCache.get(name);
  if (!p) {
    p = gltfLoader.loadAsync(assetUrl(`models/${name}.glb`));
    gltfCache.set(name, p);
  }
  return p;
}

/** Flatten a glTF scene into transform-baked prototype parts (one per primitive). */
export function toProto(gltf: GLTF): ProtoPart[] {
  const parts: ProtoPart[] = [];
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh || (mesh as THREE.SkinnedMesh).isSkinnedMesh) return;
    const g = mesh.geometry.index ? mesh.geometry : mesh.geometry;
    const pos = g.getAttribute('position') as THREE.BufferAttribute;
    const nrm = g.getAttribute('normal') as THREE.BufferAttribute;
    const uv = g.getAttribute('uv') as THREE.BufferAttribute | undefined;
    const m = mesh.matrixWorld;
    const nm = new THREE.Matrix3().getNormalMatrix(m);
    const v = new THREE.Vector3();
    const P = new Float32Array(pos.count * 3);
    const Nn = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(m);
      P.set([v.x, v.y, v.z], i * 3);
      v.fromBufferAttribute(nrm, i).applyMatrix3(nm).normalize();
      Nn.set([v.x, v.y, v.z], i * 3);
    }
    const idx = g.index ? new Uint32Array(g.index.array) : new Uint32Array(pos.count).map((_, i) => i);
    const mat = mesh.material as THREE.MeshStandardMaterial;
    const em = mat.emissive ? mat.emissive.r + mat.emissive.g + mat.emissive.b : 0;
    const c = mat.color ?? new THREE.Color(1, 1, 1);
    // linear colour; emissive parts use their emission colour
    const col: [number, number, number] = em > 0 ? [mat.emissive.r, mat.emissive.g, mat.emissive.b] : [c.r, c.g, c.b];
    parts.push({
      name: mat.name || 'mat',
      pos: P,
      nrm: Nn,
      uv: uv ? new Float32Array(uv.array) : null,
      idx,
      color: col,
      rough: mat.roughness ?? 0.6,
      metal: mat.metalness ?? 0,
      emissive: em > 0 ? (mat.emissiveIntensity ?? 1) : 0,
    });
  });
  return parts;
}

export const PROTO_NAMES = [
  'outlet_duplex',
  'outlet_twoprong',
  'outlet_gfci',
  'outlet_broken',
  'switch_plate',
  'vent_wall',
  'vent_ceiling',
  'office_chair',
  'wet_floor_sign',
  'crate',
  'pallet',
  'pipe_valve',
  'pipe_gauge',
  'floor_box',
  'troffer',
  'troffer_hanging',
  'lamp_highbay',
  'lamp_caged',
];

export async function loadProtos(onProgress?: (f: number) => void): Promise<Protos> {
  const out: Protos = {};
  let done = 0;
  await Promise.all(
    PROTO_NAMES.map(async (n) => {
      out[n] = toProto(await loadGLTF(n));
      onProgress?.(++done / PROTO_NAMES.length);
    }),
  );
  return out;
}

// ------------------------------------------------------------------ audio
export type AudioManifest = Record<string, string[]>;
let manifest: Promise<AudioManifest> | null = null;
export function loadAudioManifest(): Promise<AudioManifest> {
  if (!manifest) manifest = fetch(assetUrl('audio/manifest.json')).then((r) => r.json());
  return manifest;
}

export function audioExt(): 'ogg' | 'm4a' {
  const a = document.createElement('audio');
  const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
  if (!isSafari && a.canPlayType('audio/ogg; codecs="vorbis"')) return 'ogg';
  return 'm4a';
}
