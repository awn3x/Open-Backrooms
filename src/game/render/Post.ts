// Custom post chain (no dependencies):
//   scene (HDR half-float + depth) -> bloom mip chain -> composite A: camera
//   motion blur, bloom, exposure, AgX, grade -> composite B: camcorder/VHS
//   (chroma bleed, aberration, grain, vignette, tracking) -> screen.

import * as THREE from 'three';

const VS = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

function fsMat(fs: string, uniforms: Record<string, THREE.IUniform>, defines: Record<string, string | number> = {}) {
  return new THREE.ShaderMaterial({ vertexShader: VS, fragmentShader: fs, uniforms, defines, depthTest: false, depthWrite: false });
}

const BRIGHT = /* glsl */ `
uniform sampler2D tSrc; uniform vec2 uTexel; uniform float uThreshold;
varying vec2 vUv;
void main() {
  vec3 c = vec3(0.0);
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0, -1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0,  1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0,  1.0)).rgb;
  c *= 0.25;
  float l = max(max(c.r, c.g), c.b);
  float k = max(l - uThreshold, 0.0) / max(l, 1e-4);
  gl_FragColor = vec4(min(c * k, vec3(40.0)), 1.0);
}`;

const DOWN = /* glsl */ `
uniform sampler2D tSrc; uniform vec2 uTexel;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tSrc, vUv).rgb * 4.0;
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0, -1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0,  1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0,  1.0)).rgb;
  gl_FragColor = vec4(c / 8.0, 1.0);
}`;

const UP = /* glsl */ `
uniform sampler2D tSrc; uniform sampler2D tPrev; uniform vec2 uTexel; uniform float uMix;
varying vec2 vUv;
void main() {
  vec3 c = vec3(0.0);
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0, 0.0)).rgb * 2.0;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0, 0.0)).rgb * 2.0;
  c += texture2D(tSrc, vUv + uTexel * vec2(0.0, -1.0)).rgb * 2.0;
  c += texture2D(tSrc, vUv + uTexel * vec2(0.0,  1.0)).rgb * 2.0;
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0, -1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0,  1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0,  1.0)).rgb;
  c /= 12.0;
  gl_FragColor = vec4(texture2D(tPrev, vUv).rgb + c * uMix, 1.0);
}`;

const COMPOSITE = /* glsl */ `
#include <common>
#include <tonemapping_pars_fragment>
uniform sampler2D tScene; uniform sampler2D tDepth; uniform sampler2D tBloom; uniform sampler2D tAO; uniform float uAO;
uniform mat4 uInvViewProj; uniform mat4 uPrevViewProj;
uniform float uBlur; uniform float uBloom; uniform float uExposure;
uniform vec3 uTint; uniform float uSat; uniform float uContrast; uniform float uLift;
uniform float uFade; uniform vec3 uFadeCol; uniform float uDesat; uniform float uRed;
varying vec2 vUv;
void main() {
  vec3 col = texture2D(tScene, vUv).rgb;
  #if BLUR_SAMPLES > 0
  if (uBlur > 0.001) {
    float d = texture2D(tDepth, vUv).x;
    vec4 ndc = vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
    vec4 wp = uInvViewProj * ndc; wp /= wp.w;
    vec4 pc = uPrevViewProj * wp;
    vec2 prev = (pc.xy / pc.w) * 0.5 + 0.5;
    vec2 vel = (vUv - prev) * uBlur;
    float vl = length(vel);
    if (vl > 0.04) vel *= 0.04 / vl;
    if (vl > 0.0005) {
      vec3 acc = col;
      float jitter = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
      for (int i = 1; i < BLUR_SAMPLES; i++) {
        float t = (float(i) + jitter) / float(BLUR_SAMPLES) - 0.5;
        acc += texture2D(tScene, vUv + vel * t).rgb;
      }
      col = acc / float(BLUR_SAMPLES);
    }
  }
  #endif
  if (uAO > 0.0) { float ao = texture2D(tAO, vUv).r; col *= mix(1.0, ao * ao, uAO); }
  col += texture2D(tBloom, vUv).rgb * uBloom;
  col *= uExposure;
  col = AgXToneMapping(col);
  // grade
  col = col * uTint;
  float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(l), col, uSat * (1.0 - uDesat));
  col = (col - 0.5) * uContrast + 0.5;
  col = col + uLift * (1.0 - col);
  col = mix(col, col * vec3(1.25, 0.55, 0.5), uRed);
  col = mix(col, uFadeCol, uFade);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

const VHS = /* glsl */ `
uniform sampler2D tSrc; uniform vec2 uRes; uniform float uTime; uniform float uAmt; uniform float uGrain;
uniform float uGlitch; uniform float uVignette; uniform float uHaze; uniform float uSharpen; uniform float uFxaa; uniform float uShock; uniform float uLens;
varying vec2 vUv;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float luma(vec3 c) { return sqrt(dot(c, vec3(0.299, 0.587, 0.114))); }
vec3 fxaa(vec2 uv, vec2 px) {
  vec3 rgbM = texture2D(tSrc, uv).rgb;
  vec3 rgbNW = texture2D(tSrc, uv + vec2(-1.0, -1.0) * px).rgb;
  vec3 rgbNE = texture2D(tSrc, uv + vec2(1.0, -1.0) * px).rgb;
  vec3 rgbSW = texture2D(tSrc, uv + vec2(-1.0, 1.0) * px).rgb;
  vec3 rgbSE = texture2D(tSrc, uv + vec2(1.0, 1.0) * px).rgb;
  float lM = luma(rgbM), lNW = luma(rgbNW), lNE = luma(rgbNE), lSW = luma(rgbSW), lSE = luma(rgbSE);
  float lMin = min(lM, min(min(lNW, lNE), min(lSW, lSE)));
  float lMax = max(lM, max(max(lNW, lNE), max(lSW, lSE)));
  if (lMax - lMin < max(0.0312, lMax * 0.125)) return rgbM;
  vec2 dir = vec2(-((lNW + lNE) - (lSW + lSE)), ((lNW + lSW) - (lNE + lSE)));
  float red = max((lNW + lNE + lSW + lSE) * 0.03125, 1.0 / 128.0);
  float rcp = 1.0 / (min(abs(dir.x), abs(dir.y)) + red);
  dir = clamp(dir * rcp, -8.0, 8.0) * px;
  vec3 a = 0.5 * (texture2D(tSrc, uv + dir * (1.0 / 3.0 - 0.5)).rgb + texture2D(tSrc, uv + dir * (2.0 / 3.0 - 0.5)).rgb);
  vec3 b = a * 0.5 + 0.25 * (texture2D(tSrc, uv + dir * -0.5).rgb + texture2D(tSrc, uv + dir * 0.5).rgb);
  float lB = luma(b);
  return (lB < lMin || lB > lMax) ? a : b;
}
void main() {
  // real-lens character: slight barrel distortion (wide-angle phone/camcorder lens), scaled so edges stay filled
  vec2 cc = vUv - 0.5;
  float r2 = dot(cc * vec2(uRes.x / uRes.y, 1.0), cc * vec2(uRes.x / uRes.y, 1.0));
  vec2 uv = 0.5 + cc * (1.0 + uLens * r2) / (1.0 + uLens * 0.32);
  // only a scare/death glitch displaces the image; normal play is clean
  float jitter = (hash(vec2(floor(uv.y * 240.0), floor(uTime * 30.0))) - 0.5);
  uv.x += jitter * 0.02 * uGlitch;
  uv.y += uGlitch * 0.01 * sin(uTime * 90.0);
  uv += uHaze * 0.0012 * vec2(sin(uv.y * 60.0 + uTime * 3.0), cos(uv.x * 50.0 + uTime * 2.3));
  vec2 px = 1.0 / uRes;
  vec3 col = uFxaa > 0.5 ? fxaa(uv, px) : texture2D(tSrc, uv).rgb;
  // contrast-adaptive sharpening (AMD CAS-style, 4 neighbours)
  vec3 n = texture2D(tSrc, uv + vec2(0.0, -px.y)).rgb;
  vec3 s2 = texture2D(tSrc, uv + vec2(0.0, px.y)).rgb;
  vec3 e = texture2D(tSrc, uv + vec2(px.x, 0.0)).rgb;
  vec3 w = texture2D(tSrc, uv + vec2(-px.x, 0.0)).rgb;
  vec3 mn = min(col, min(min(n, s2), min(e, w)));
  vec3 mx = max(col, max(max(n, s2), max(e, w)));
  vec3 amp = sqrt(clamp(min(mn, 1.0 - mx) / max(mx, 1e-4), 0.0, 1.0));
  vec3 wgt = -amp * mix(0.125, 0.2, uSharpen);
  col = clamp((col + (n + s2 + e + w) * wgt) / (1.0 + 4.0 * wgt), 0.0, 1.0);
  // very faint tape character: slight chroma offset toward the edges
  // lateral chromatic aberration grows toward the frame edges, as on real glass
  float ca = (0.0006 + 0.004 * uGlitch) * uAmt + 0.03 * uShock + uLens * 0.012 * r2;
  float cm = clamp(0.5 * uAmt + uShock + uLens * 4.0, 0.0, 1.0);
  col.r = mix(col.r, texture2D(tSrc, uv + cc * ca).r, cm);
  col.b = mix(col.b, texture2D(tSrc, uv - cc * ca).b, cm);
  // fine film grain, strongest in shadows
  float g = hash(uv * uRes + fract(uTime * 7.13) * 100.0) - 0.5;
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col += g * uGrain * (0.025 + 0.04 * (1.0 - lum));
  float v = smoothstep(0.9, 0.25, length(cc * vec2(1.0, 0.8)));
  col *= mix(1.0, v, uVignette);
  // jumpscare impact frame: blown-out flash with a red cast at the edges
  col = mix(col, vec3(1.0, 0.93, 0.88) * mix(1.0, 0.55, 1.0 - v) + vec3(0.3, 0.0, 0.0) * (1.0 - v), clamp(uShock, 0.0, 1.0) * 0.85);
  gl_FragColor = vec4(sRGBTransferOETF(vec4(max(col, 0.0), 1.0)).rgb, 1.0);
}`;

const SSAO = /* glsl */ `
uniform sampler2D tDepth; uniform mat4 uProj; uniform mat4 uInvProj; uniform vec2 uTexel; uniform float uRadius; uniform float uTime;
varying vec2 vUv;
vec3 viewPos(vec2 uv) {
  float d = texture2D(tDepth, uv).x;
  vec4 p = uInvProj * vec4(uv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
  return p.xyz / p.w;
}
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  float d = texture2D(tDepth, vUv).x;
  if (d >= 1.0) { gl_FragColor = vec4(1.0); return; }
  vec3 P = viewPos(vUv);
  vec3 N = normalize(cross(dFdx(P), dFdy(P)));
  float occ = 0.0;
  float a0 = hash(vUv * 731.0) * 6.2831;
  const int S = 10;
  for (int i = 0; i < S; i++) {
    float t = (float(i) + 0.5) / float(S);
    float ang = a0 + float(i) * 2.39996;
    float r = uRadius * t * t * 0.9 + 0.05;
    vec3 dir = normalize(vec3(cos(ang) * sqrt(1.0 - t), sin(ang) * sqrt(1.0 - t), sqrt(t) + 0.2));
    // orient hemisphere around N
    vec3 up = abs(N.z) < 0.99 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
    vec3 T = normalize(cross(up, N));
    vec3 B = cross(N, T);
    vec3 sp = P + (T * dir.x + B * dir.y + N * dir.z) * r;
    vec4 cp = uProj * vec4(sp, 1.0);
    vec2 suv = cp.xy / cp.w * 0.5 + 0.5;
    if (suv.x < 0.0 || suv.x > 1.0 || suv.y < 0.0 || suv.y > 1.0) continue;
    float sz = viewPos(suv).z;
    float range = smoothstep(0.0, 1.0, uRadius / abs(P.z - sz));
    occ += (sz >= sp.z + 0.02 ? 1.0 : 0.0) * range;
  }
  float ao = 1.0 - occ / float(S);
  gl_FragColor = vec4(vec3(ao), 1.0);
}`;

const AOBLUR = /* glsl */ `
uniform sampler2D tSrc; uniform vec2 uTexel;
varying vec2 vUv;
void main() {
  float s = 0.0;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) s += texture2D(tSrc, vUv + vec2(float(x), float(y)) * uTexel * 1.5).r;
  gl_FragColor = vec4(vec3(s / 9.0), 1.0);
}`;

export interface PostSettings {
  scale: number;
  blurSamples: number;
  blur: number;
  bloom: number;
  vhs: number;
  grain: number;
  msaa: number;
  ssao: boolean;
}

export class Post {
  private sceneRT!: THREE.WebGLRenderTarget;
  private ldrRT!: THREE.WebGLRenderTarget;
  private aoRT!: THREE.WebGLRenderTarget;
  private aoBlurRT!: THREE.WebGLRenderTarget;
  private ssao = fsMat(SSAO, { tDepth: { value: null }, uProj: { value: new THREE.Matrix4() }, uInvProj: { value: new THREE.Matrix4() }, uTexel: { value: new THREE.Vector2() }, uRadius: { value: 0.55 }, uTime: { value: 0 } });
  private aoBlur = fsMat(AOBLUR, { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() } });
  private bloomRTs: THREE.WebGLRenderTarget[] = [];
  private upRTs: THREE.WebGLRenderTarget[] = [];
  private quad: THREE.Mesh;
  private qScene = new THREE.Scene();
  private qCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private bright = fsMat(BRIGHT, { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() }, uThreshold: { value: 1.0 } });
  private down = fsMat(DOWN, { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() } });
  private up = fsMat(UP, { tSrc: { value: null }, tPrev: { value: null }, uTexel: { value: new THREE.Vector2() }, uMix: { value: 1 } });
  composite!: THREE.ShaderMaterial;
  vhs = fsMat(VHS, {
    tSrc: { value: null },
    uRes: { value: new THREE.Vector2() },
    uTime: { value: 0 },
    uAmt: { value: 0.5 },
    uGrain: { value: 1 },
    uGlitch: { value: 0 },
    uShock: { value: 0 },
    uLens: { value: 0.06 },
    uVignette: { value: 0.25 },
    uSharpen: { value: 0.5 },
    uFxaa: { value: 1 },
    uHaze: { value: 0 },
  });
  private prevVP = new THREE.Matrix4();
  private tmp = new THREE.Matrix4();
  private w = 1;
  private h = 1;
  private black = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));

  constructor(
    private renderer: THREE.WebGLRenderer,
    public s: PostSettings,
  ) {
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.bright);
    this.quad.frustumCulled = false;
    this.qScene.add(this.quad);
    this.buildComposite();
    void this.black;
  }

  buildComposite() {
    this.composite?.dispose();
    this.composite = fsMat(
      COMPOSITE,
      {
        tScene: { value: null },
        tDepth: { value: null },
        tBloom: { value: null },
        uInvViewProj: { value: new THREE.Matrix4() },
        uPrevViewProj: { value: new THREE.Matrix4() },
        uBlur: { value: 0.5 },
        uBloom: { value: 0.1 },
        tAO: { value: null },
        uAO: { value: 0 },
        uExposure: { value: 1 },
        uTint: { value: new THREE.Vector3(1, 1, 1) },
        uSat: { value: 1 },
        uContrast: { value: 1 },
        uLift: { value: 0 },
        uFade: { value: 0 },
        uFadeCol: { value: new THREE.Color(0, 0, 0) },
        uDesat: { value: 0 },
        uRed: { value: 0 },
        toneMappingExposure: { value: 1 },
      },
      { BLUR_SAMPLES: this.s.blurSamples },
    );
  }

  setSize(w: number, h: number) {
    this.w = w;
    this.h = h;
    const sw = Math.max(2, Math.round(w * this.s.scale));
    const sh = Math.max(2, Math.round(h * this.s.scale));
    this.sceneRT?.dispose();
    this.ldrRT?.dispose();
    for (const r of [...this.bloomRTs, ...this.upRTs]) r.dispose();
    const depth = new THREE.DepthTexture(sw, sh);
    depth.type = THREE.UnsignedIntType;
    this.sceneRT = new THREE.WebGLRenderTarget(sw, sh, { type: THREE.HalfFloatType, depthTexture: depth, depthBuffer: true, samples: this.s.msaa });
    this.aoRT?.dispose();
    this.aoBlurRT?.dispose();
    this.aoRT = new THREE.WebGLRenderTarget(Math.max(1, sw >> 1), Math.max(1, sh >> 1), { type: THREE.UnsignedByteType, depthBuffer: false });
    this.aoBlurRT = new THREE.WebGLRenderTarget(Math.max(1, sw >> 1), Math.max(1, sh >> 1), { type: THREE.UnsignedByteType, depthBuffer: false });
    this.sceneRT.texture.colorSpace = THREE.LinearSRGBColorSpace;
    this.ldrRT = new THREE.WebGLRenderTarget(sw, sh, { type: THREE.UnsignedByteType, depthBuffer: false });
    this.ldrRT.texture.minFilter = THREE.LinearFilter;
    this.bloomRTs = [];
    this.upRTs = [];
    let bw = sw >> 1;
    let bh = sh >> 1;
    for (let i = 0; i < 5; i++) {
      const o = { type: THREE.HalfFloatType, depthBuffer: false } as const;
      this.bloomRTs.push(new THREE.WebGLRenderTarget(Math.max(1, bw), Math.max(1, bh), o));
      this.upRTs.push(new THREE.WebGLRenderTarget(Math.max(1, bw), Math.max(1, bh), o));
      bw >>= 1;
      bh >>= 1;
    }
    (this.vhs.uniforms.uRes.value as THREE.Vector2).set(w, h);
  }

  private pass(mat: THREE.ShaderMaterial, target: THREE.WebGLRenderTarget | null) {
    this.quad.material = mat;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.qScene, this.qCam);
  }

  render(scene: THREE.Scene, camera: THREE.PerspectiveCamera, time: number) {
    const r = this.renderer;
    r.setRenderTarget(this.sceneRT);
    r.render(scene, camera);

    // bloom
    const b0 = this.bloomRTs[0];
    this.bright.uniforms.tSrc.value = this.sceneRT.texture;
    (this.bright.uniforms.uTexel.value as THREE.Vector2).set(1 / this.sceneRT.width, 1 / this.sceneRT.height);
    this.pass(this.bright, b0);
    for (let i = 1; i < this.bloomRTs.length; i++) {
      const src = this.bloomRTs[i - 1];
      this.down.uniforms.tSrc.value = src.texture;
      (this.down.uniforms.uTexel.value as THREE.Vector2).set(1 / src.width, 1 / src.height);
      this.pass(this.down, this.bloomRTs[i]);
    }
    const n = this.bloomRTs.length;
    let prevTex = this.bloomRTs[n - 1].texture;
    for (let i = n - 2; i >= 0; i--) {
      const src = i === n - 2 ? this.bloomRTs[n - 1] : this.upRTs[i + 1];
      this.up.uniforms.tSrc.value = src.texture;
      this.up.uniforms.tPrev.value = this.bloomRTs[i].texture;
      (this.up.uniforms.uTexel.value as THREE.Vector2).set(1 / src.width, 1 / src.height);
      this.up.uniforms.uMix.value = 0.9;
      this.pass(this.up, this.upRTs[i]);
      prevTex = this.upRTs[i].texture;
    }

    // ambient occlusion (half res + blur)
    const cu0 = this.composite.uniforms;
    if (this.s.ssao) {
      const su = this.ssao.uniforms;
      su.tDepth.value = this.sceneRT.depthTexture;
      (su.uProj.value as THREE.Matrix4).copy(camera.projectionMatrix);
      (su.uInvProj.value as THREE.Matrix4).copy(camera.projectionMatrixInverse);
      this.pass(this.ssao, this.aoRT);
      this.aoBlur.uniforms.tSrc.value = this.aoRT.texture;
      (this.aoBlur.uniforms.uTexel.value as THREE.Vector2).set(1 / this.aoRT.width, 1 / this.aoRT.height);
      this.pass(this.aoBlur, this.aoBlurRT);
      cu0.tAO.value = this.aoBlurRT.texture;
      cu0.uAO.value = 0.85;
    } else cu0.uAO.value = 0;

    // composite
    const vp = this.tmp.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    const cu = this.composite.uniforms;
    (cu.uInvViewProj.value as THREE.Matrix4).copy(vp).invert();
    (cu.uPrevViewProj.value as THREE.Matrix4).copy(this.prevVP);
    this.prevVP.copy(vp);
    cu.tScene.value = this.sceneRT.texture;
    cu.tDepth.value = this.sceneRT.depthTexture;
    cu.tBloom.value = prevTex;
    cu.uBlur.value = this.s.blur;
    cu.uBloom.value = this.s.bloom;
    this.pass(this.composite, this.ldrRT);

    const vu = this.vhs.uniforms;
    vu.tSrc.value = this.ldrRT.texture;
    vu.uTime.value = time;
    vu.uAmt.value = this.s.vhs;
    vu.uGrain.value = this.s.grain;
    vu.uFxaa.value = this.s.msaa > 0 ? 0 : 1;
    this.pass(this.vhs, null);
  }

  /** Reset motion blur history (after teleports). */
  resetHistory(camera: THREE.PerspectiveCamera) {
    this.prevVP.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  }

  get size() {
    return [this.w, this.h];
  }
}
