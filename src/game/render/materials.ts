// World materials: MeshStandardMaterial patched to use the baked light field as
// indirect irradiance (with fake normal-map response), realtime lights mostly
// as specular sheen, world-space grime/wetness, ceiling tile atlas and lit fog.

import * as THREE from 'three';
import { LM_MAX } from '../world/lightfield';

export type Surf = 'wall' | 'floor' | 'ceil' | 'prop' | 'lens' | 'decal' | 'pipe' | 'plenum' | 'entity';

export const WU = {
  uLM: { value: null as THREE.Texture | null },
  uLMInfo: { value: new THREE.Vector4(39, 6, 119, 117) }, // chunk size m, slots, tile texels, inner texels
  uChunkState: { value: null as THREE.Texture | null },
  uPower: { value: new THREE.Vector4(0, 0, 1e6, 0) },
  uLightCol: { value: new THREE.Color(1, 0.93, 0.75) },
  uAccentCol: { value: new THREE.Color(1, 0.1, 0.05) },
  uLightGain: { value: 1.0 },
  uAmbient: { value: 0.01 },
  uFogCol: { value: new THREE.Color(0.6, 0.55, 0.3) },
  uFogDensity: { value: 0.03 },
  uCamE: { value: 0.5 },
  uTime: { value: 0 },
  uTileTex: { value: null as THREE.Texture | null },
  uTileInfo: { value: new THREE.Vector4(0.6096, 64, 6, 0) }, // tile m, tiles per chunk, slots, enabled
  uWallH: { value: 2.74 },
  uWet: { value: 0.3 },
  uRtDiffuse: { value: 0.18 },
  uFlash: { value: 1.0 },
};

const COMMON = /* glsl */ `
#define LM_MAX ${LM_MAX.toFixed(3)}
uniform sampler2D uLM;
uniform vec4 uLMInfo;
uniform sampler2D uChunkState;
uniform vec4 uPower;
uniform vec3 uLightCol;
uniform vec3 uAccentCol;
uniform float uLightGain;
uniform float uAmbient;
uniform vec3 uFogCol;
uniform float uFogDensity;
uniform float uCamE;
uniform float uTime;
uniform sampler2D uTileTex;
uniform vec4 uTileInfo;
uniform float uWallH;
uniform float uWet;
uniform float uRtDiffuse;
varying vec3 vWPos;
varying vec3 vWNrm;
float gDiffScale = 1.0;

float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y);
}
float fbm2(vec2 p) { return vn(p) * 0.55 + vn(p * 2.03 + 7.1) * 0.3 + vn(p * 4.1 + 3.3) * 0.15; }

vec2 lmSlot(vec2 xz, out vec2 local) {
  vec2 cw = xz / uLMInfo.x;
  vec2 ci = floor(cw);
  local = cw - ci;
  return mod(ci, uLMInfo.y);
}
vec4 lmFetch(vec2 xz) {
  vec2 local;
  vec2 slot = lmSlot(xz, local);
  vec2 texel = 1.0 + local * uLMInfo.w;
  return texture2D(uLM, (slot * uLMInfo.z + texel) / (uLMInfo.y * uLMInfo.z));
}
vec4 chunkState(vec2 xz) {
  vec2 local;
  vec2 slot = lmSlot(xz, local);
  return texture2D(uChunkState, (slot + 0.5) / uLMInfo.y);
}
float powerAt(vec3 p) {
  if (uPower.w < 0.5) return 1.0;
  return 1.0 - smoothstep(uPower.z, uPower.z + 4.0, length(p.xz - uPower.xy));
}
vec3 lmIrr(vec3 p, out float ao) {
  vec4 s = lmFetch(p.xz);
  vec4 cs = chunkState(p.xz);
  float pw = powerAt(p);
  ao = s.a;
  return ((s.r * s.r + s.g * s.g * cs.r) * uLightCol * pw + s.b * s.b * uAccentCol) * LM_MAX * uLightGain;
}
float lmLum(vec2 xz) { vec4 s = lmFetch(xz); return s.r * s.r + s.g * s.g + s.b * s.b; }
float lightLink(float link, vec3 p) {
  if (link < 0.5) return 1.0;
  float pw = powerAt(p);
  if (link < 1.5) return pw;
  return chunkState(p.xz).r * pw;
}
`;

function patch(mat: THREE.MeshStandardMaterial, surf: Surf) {
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, WU);
    sh.defines = sh.defines || {};
    sh.defines['SURF_' + surf.toUpperCase()] = '';
    const hasMat = surf === 'prop' || surf === 'lens';
    sh.vertexShader = sh.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
varying vec3 vWPos;
varying vec3 vWNrm;
${hasMat ? 'attribute vec4 aMat; varying vec4 vMat;' : ''}`,
      )
      .replace(
        '#include <project_vertex>',
        `#include <project_vertex>
{
  vec4 wp = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
  wp = instanceMatrix * wp;
  #endif
  #ifdef USE_BATCHING
  wp = batchingMatrix * wp;
  #endif
  vWPos = (modelMatrix * wp).xyz;
  vWNrm = normalize(mat3(modelMatrix) * objectNormal);
  ${hasMat ? 'vMat = aMat;' : ''}
}`,
      );

    let fs = sh.fragmentShader;
    fs = fs.replace('#include <common>', `#include <common>\n${COMMON}\n${hasMat ? 'varying vec4 vMat;' : ''}`);

    // --- per-surface texture coordinates (ceiling tile atlas lookups)
    const uvSetup =
      surf === 'ceil'
        ? `
  vec2 tUvC = vMapUv * 0.5;
  vec2 tUv = vMapUv;
  if (uTileInfo.w > 0.5) {
    vec2 tc = floor(vWPos.xz / uTileInfo.x);
    vec2 slot = mod(floor(tc / uTileInfo.y), uTileInfo.z);
    vec2 within = mod(tc, uTileInfo.y);
    float st = floor(texture2D(uTileTex, (slot * uTileInfo.y + within + 0.5) / (uTileInfo.y * uTileInfo.z)).r * 255.0 + 0.5);
    if (st > 3.5) discard;
    vec2 f = fract(vWPos.xz / uTileInfo.x);
    float q = st;
    // atlas is 2x2 variants; image row 0 (variants 0,1) sits at the top (v in 0.5..1)
    tUv = vec2((mod(q, 2.0) + f.x) * 0.5, (1.0 - floor(q / 2.0)) * 0.5 + f.y * 0.5);
  }
  vec2 tDx = dFdx(tUvC);
  vec2 tDy = dFdy(tUvC);`
        : `
  vec2 tUv = vMapUv;
  vec2 tUvC = vMapUv;
  vec2 tDx = dFdx(tUvC);
  vec2 tDy = dFdy(tUvC);`;

    fs = fs.replace('void main() {', `void main() {\n#ifdef USE_MAP\n${uvSetup}\n#endif`);
    const S = (chunk: string, from: RegExp, to: string) => (THREE.ShaderChunk as Record<string, string>)[chunk].replace(from, to);
    fs = fs
      .replace('#include <map_fragment>', S('map_fragment', /texture2D\( map, vMapUv \)/g, 'textureGrad( map, tUv, tDx, tDy )'))
      .replace('#include <normal_fragment_begin>', S('normal_fragment_begin', /vNormalMapUv/g, 'tUvC'))
      .replace('#include <normal_fragment_maps>', S('normal_fragment_maps', /texture2D\( normalMap, vNormalMapUv \)/g, 'textureGrad( normalMap, tUv, tDx, tDy )'))
      .replace('#include <roughnessmap_fragment>', S('roughnessmap_fragment', /texture2D\( roughnessMap, vRoughnessMapUv \)/g, 'textureGrad( roughnessMap, tUv, tDx, tDy )'))
      .replace('#include <metalnessmap_fragment>', S('metalnessmap_fragment', /texture2D\( metalnessMap, vMetalnessMapUv \)/g, 'textureGrad( metalnessMap, tUv, tDx, tDy )'))
      .replace('#include <aomap_fragment>', S('aomap_fragment', /texture2D\( aoMap, vAoMapUv \)/g, 'textureGrad( aoMap, tUv, tDx, tDy )'));

    // --- albedo grime / variation
    fs = fs.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
#if defined(SURF_WALL)
  {
    float along = dot(vWPos.xz, abs(vWNrm.zx));
    float seg = h21(floor(vec2(along / 2.4384, dot(vWPos.xz, abs(vWNrm.xz)) * 7.0)));
    float big = fbm2(vec2(along, vWPos.y) * 0.25 + vWPos.xz * 0.05);
    diffuseColor.rgb *= 0.9 + 0.12 * big + 0.05 * (seg - 0.5);
    float low = 1.0 - smoothstep(0.0, 0.45, vWPos.y);
    diffuseColor.rgb *= mix(vec3(1.0), vec3(0.72, 0.66, 0.55), low * (0.55 + 0.45 * fbm2(vec2(along * 3.0, vWPos.y * 8.0))));
    float top = smoothstep(uWallH - 0.5, uWallH, vWPos.y);
    diffuseColor.rgb *= 1.0 - top * 0.12 * fbm2(vec2(along * 2.0, 0.0));
  }
#elif defined(SURF_FLOOR)
  {
    float big = fbm2(vWPos.xz * 0.09);
    float mid = fbm2(vWPos.xz * 0.6 + 3.0);
    diffuseColor.rgb *= 0.86 + 0.2 * big + 0.06 * mid;
    float wetM = smoothstep(0.58, 0.72, fbm2(vWPos.xz * 0.12 + 11.0)) * uWet;
    diffuseColor.rgb *= 1.0 - wetM * 0.35;
    // traffic wear down the middle of corridors is not knowable here; add subtle track noise
  }
#elif defined(SURF_CEIL)
  diffuseColor.rgb *= 0.94 + 0.08 * fbm2(vWPos.xz * 0.15);
#elif defined(SURF_PLENUM)
  diffuseColor.rgb = vec3(0.02);
#endif`,
    );
    // --- per-vertex material for props
    if (hasMat) {
      fs = fs.replace(
        '#include <metalnessmap_fragment>',
        `#include <metalnessmap_fragment>
  metalnessFactor = vMat.y;`,
      );
      fs = fs.replace(
        '#include <roughnessmap_fragment>',
        `#include <roughnessmap_fragment>
  roughnessFactor = max(vMat.x, 0.05);`,
      );
    }
    if (surf === 'floor') {
      fs = fs.replace(
        '#include <roughnessmap_fragment>',
        `#include <roughnessmap_fragment>
  {
    float wetM = smoothstep(0.58, 0.72, fbm2(vWPos.xz * 0.12 + 11.0)) * uWet;
    roughnessFactor = mix(roughnessFactor, 0.12, wetM);
  }`,
      );
    }
    // --- emissive
    if (surf === 'prop') {
      fs = fs.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>\n  totalEmissiveRadiance = vColor.rgb * vMat.z * lightLink(vMat.w, vWPos) * 3.0;`);
    }
    if (surf === 'lens') {
      fs = fs.replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
  totalEmissiveRadiance = sampledDiffuseColor.rgb * vColor.rgb * vMat.z * lightLink(vMat.w, vWPos) * 9.0;
  diffuseColor.rgb *= 0.12;`,
      );
    }

    // --- realtime point lights contribute mostly specular
    fs = fs.replace(
      '#include <lights_physical_pars_fragment>',
      THREE.ShaderChunk.lights_physical_pars_fragment.replace(
        'reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );',
        'reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F ) * gDiffScale;',
      ),
    );
    fs = fs.replace(
      '#include <lights_fragment_begin>',
      THREE.ShaderChunk.lights_fragment_begin
        .replace('#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )', 'gDiffScale = uRtDiffuse;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )')
        .replace('#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )', 'gDiffScale = 1.0;\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )'),
    );

    // --- baked light field as indirect irradiance
    const irr = {
      wall: `
      float ao;
      vec3 sp = vWPos + vec3(vWNrm.x, 0.0, vWNrm.z) * 0.32;
      vec3 E = lmIrr(sp, ao);
      float hprof = mix(0.62, 1.0, smoothstep(0.0, 1.0, vWPos.y)) * mix(1.0, 0.78, smoothstep(uWallH - 0.7, uWallH, vWPos.y));
      float cao = mix(0.55, 1.0, smoothstep(0.0, 0.3, vWPos.y)) * mix(0.7, 1.0, smoothstep(0.0, 0.2, uWallH - vWPos.y));
      float gx = lmLum(sp.xz + vec2(0.4, 0.0)) - lmLum(sp.xz - vec2(0.4, 0.0));
      float gz = lmLum(sp.xz + vec2(0.0, 0.4)) - lmLum(sp.xz - vec2(0.0, 0.4));
      vec3 Lw = normalize(vec3(gx * 3.0, 0.9, gz * 3.0) + vec3(vWNrm.x, 0.0, vWNrm.z) * 0.6);
      vec3 nW = inverseTransformDirection(normal, viewMatrix);
      float bump = clamp(dot(nW, Lw) / max(dot(vWNrm, Lw), 0.25), 0.35, 1.7);
      irradiance += (E * hprof * cao * mix(1.0, bump, 0.85) * 0.85 + uAmbient) * PI;`,
      floor: `
      float ao;
      vec3 E = lmIrr(vWPos, ao);
      float gx = lmLum(vWPos.xz + vec2(0.35, 0.0)) - lmLum(vWPos.xz - vec2(0.35, 0.0));
      float gz = lmLum(vWPos.xz + vec2(0.0, 0.35)) - lmLum(vWPos.xz - vec2(0.0, 0.35));
      vec3 Lf = normalize(vec3(gx * 2.5, 1.0, gz * 2.5));
      vec3 nW = inverseTransformDirection(normal, viewMatrix);
      float bump = clamp(dot(nW, Lf) / max(Lf.y, 0.3), 0.4, 1.5);
      irradiance += (E * ao * mix(1.0, bump, 0.9) + uAmbient * ao) * PI;`,
      ceil: `
      float ao;
      vec3 E = lmIrr(vWPos, ao);
      irradiance += (E * 0.26 * (0.55 + 0.45 * ao) + uAmbient) * PI;`,
      plenum: `
      float ao;
      vec3 E = lmIrr(vWPos, ao);
      irradiance += E * 0.02 * PI;`,
      prop: `
      float ao;
      vec3 E = lmIrr(vWPos + vWNrm * 0.15, ao);
      float up = 0.55 + 0.45 * vWNrm.y;
      irradiance += (E * mix(0.6, 1.0, ao) * up + uAmbient) * PI;`,
      pipe: `
      float ao;
      vec3 E = lmIrr(vWPos + vWNrm * 0.15, ao);
      irradiance += (E * (0.5 + 0.3 * vWNrm.y) + uAmbient) * PI;`,
      lens: `
      float ao;
      vec3 E = lmIrr(vWPos, ao);
      irradiance += E * 0.1 * PI;`,
      decal: `
      float ao;
      vec3 sp = vWPos + vec3(vWNrm.x, 0.0, vWNrm.z) * 0.32;
      vec3 E = lmIrr(sp, ao);
      float cao = abs(vWNrm.y) > 0.5 ? ao : mix(0.55, 1.0, smoothstep(0.0, 0.3, vWPos.y));
      irradiance += (E * cao * (abs(vWNrm.y) > 0.5 ? 1.0 : 0.85) + uAmbient) * PI;`,
      entity: `
      float ao;
      vec3 E = lmIrr(vWPos + vWNrm * 0.2, ao);
      irradiance += (E * (0.5 + 0.35 * vWNrm.y) + uAmbient) * PI;`,
    }[surf];
    fs = fs.replace('#include <lights_fragment_end>', `{${irr}}\n#include <lights_fragment_end>`);

    // --- lit fog
    fs = fs.replace(
      '#include <fog_fragment>',
      `{
  float fd = length(vWPos - cameraPosition);
  float ff = 1.0 - exp(-uFogDensity * uFogDensity * fd * fd);
  float el = lmLum(vWPos.xz) * LM_MAX * uLightGain * powerAt(vWPos);
  vec3 fogL = uFogCol * (0.5 * el + 0.5 * uCamE) * 0.55;
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogL, ff);
}`,
    );
    sh.fragmentShader = fs;
  };
  mat.customProgramCacheKey = () => 'world-' + surf;
}

export interface SurfaceMaps {
  map?: THREE.Texture | null;
  normalMap?: THREE.Texture | null;
  orm?: THREE.Texture | null;
}

export function makeWorldMaterial(surf: Surf, maps: SurfaceMaps = {}, params: THREE.MeshStandardMaterialParameters = {}) {
  const m = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1,
    metalness: surf === 'pipe' ? 1 : 0,
    ...params,
  });
  if (maps.map) m.map = maps.map;
  if (maps.normalMap) {
    m.normalMap = maps.normalMap;
    m.normalScale.set(1, 1);
  }
  if (maps.orm) {
    m.roughnessMap = maps.orm;
    m.metalnessMap = maps.orm;
    m.aoMap = maps.orm;
    m.aoMapIntensity = 1;
  }
  if (surf === 'prop' || surf === 'lens' || surf === 'pipe') m.vertexColors = true;
  if (surf === 'decal') {
    m.vertexColors = true;
    m.transparent = true;
    m.depthWrite = false;
    m.polygonOffset = true;
    m.polygonOffsetFactor = -2;
    m.polygonOffsetUnits = -2;
  }
  patch(m, surf);
  return m;
}

/** Patch an arbitrary MeshStandardMaterial (e.g. glTF entities, pickups) to use the light field. */
export function patchEntityMaterial(m: THREE.MeshStandardMaterial) {
  patch(m, 'entity');
  return m;
}
