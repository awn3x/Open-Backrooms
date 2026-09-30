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
uniform sampler2D tScene; uniform sampler2D tDepth; uniform sampler2D tBloom;
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
uniform float uGlitch; uniform float uVignette; uniform float uHaze;
varying vec2 vUv;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
vec3 rgb2yiq(vec3 c) { return vec3(dot(c, vec3(0.299, 0.587, 0.114)), dot(c, vec3(0.596, -0.274, -0.322)), dot(c, vec3(0.211, -0.523, 0.312))); }
vec3 yiq2rgb(vec3 c) { return vec3(c.x + 0.956 * c.y + 0.621 * c.z, c.x - 0.272 * c.y - 0.647 * c.z, c.x - 1.106 * c.y + 1.703 * c.z); }
void main() {
  vec2 uv = vUv;
  // mild barrel distortion
  vec2 cc = uv - 0.5;
  uv = 0.5 + cc * (1.0 + dot(cc, cc) * 0.06 * uAmt);
  // tracking: a thin band that rarely drifts through, and glitch jolts
  float band = smoothstep(0.012, 0.0, abs(uv.y - fract(uTime * 0.043)));
  float jitter = (hash(vec2(floor(uv.y * 240.0), floor(uTime * 30.0))) - 0.5);
  uv.x += band * 0.004 * uAmt + jitter * (0.0006 * uAmt + 0.02 * uGlitch);
  uv.y += uGlitch * 0.01 * sin(uTime * 90.0);
  // heat haze (level 2)
  uv += uHaze * 0.0018 * vec2(sin(uv.y * 60.0 + uTime * 3.0), cos(uv.x * 50.0 + uTime * 2.3));
  vec2 px = 1.0 / uRes;
  // chroma resolution loss: luma sharp, chroma smeared horizontally
  float ca = (0.0012 + 0.004 * uGlitch) * uAmt;
  vec2 dir = (uv - 0.5);
  vec3 c0 = texture2D(tSrc, uv).rgb;
  vec3 y = rgb2yiq(c0);
  vec3 ch = vec3(0.0);
  for (int i = -3; i <= 3; i++) ch += rgb2yiq(texture2D(tSrc, uv + vec2(float(i) * 1.6 * uAmt, 0.0) * px).rgb);
  ch /= 7.0;
  vec3 col = yiq2rgb(vec3(y.x, mix(y.y, ch.y, uAmt), mix(y.z, ch.z, uAmt)));
  col.r = mix(col.r, texture2D(tSrc, uv + dir * ca).r, 0.6);
  col.b = mix(col.b, texture2D(tSrc, uv - dir * ca).b, 0.6);
  // luma-weighted grain (stronger in the shadows), animated per frame
  float g = hash(uv * uRes + fract(uTime * 7.13) * 100.0) - 0.5;
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col += g * uGrain * (0.055 + 0.07 * (1.0 - lum));
  // faint scanline / tape noise
  col *= 1.0 - 0.025 * uAmt * sin(uv.y * uRes.y * 1.5);
  col += band * 0.04 * uAmt;
  // vignette
  float v = smoothstep(0.85, 0.2, length(cc * vec2(1.0, 0.8)));
  col *= mix(1.0, v, uVignette);
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) col = vec3(0.0);
  gl_FragColor = vec4(sRGBTransferOETF(vec4(max(col, 0.0), 1.0)).rgb, 1.0);
}`;

export interface PostSettings {
  scale: number;
  blurSamples: number;
  blur: number;
  bloom: number;
  vhs: number;
  grain: number;
}

export class Post {
  private sceneRT!: THREE.WebGLRenderTarget;
  private ldrRT!: THREE.WebGLRenderTarget;
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
    uVignette: { value: 0.55 },
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
    this.sceneRT = new THREE.WebGLRenderTarget(sw, sh, { type: THREE.HalfFloatType, depthTexture: depth, depthBuffer: true });
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
