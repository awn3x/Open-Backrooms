// Quality presets + GPU-based auto detection + dynamic resolution.

import type { Quality } from './Settings';
import type { Tier } from '../assets';

export interface Preset {
  scale: number;
  lights: number;
  shadows: boolean;
  shadowSize: number;
  blurSamples: number;
  radius: number;
  tier: Tier;
  aniso: number;
  bloom: number;
  pixelRatioCap: number;
  msaa: number;
  ssao: boolean;
}

export const PRESETS: Record<Quality, Preset> = {
  low: { scale: 0.7, lights: 3, shadows: false, shadowSize: 512, blurSamples: 0, radius: 1, tier: 'lo', aniso: 4, bloom: 0.07, pixelRatioCap: 1, msaa: 0, ssao: false },
  medium: { scale: 0.75, lights: 5, shadows: true, shadowSize: 1024, blurSamples: 6, radius: 2, tier: 'hi', aniso: 8, bloom: 0.08, pixelRatioCap: 1.5, msaa: 0, ssao: true },
  high: { scale: 0.85, lights: 8, shadows: true, shadowSize: 1024, blurSamples: 8, radius: 2, tier: 'hi', aniso: 16, bloom: 0.08, pixelRatioCap: 2, msaa: 4, ssao: true },
  ultra: { scale: 1.0, lights: 12, shadows: true, shadowSize: 2048, blurSamples: 12, radius: 3, tier: 'hi', aniso: 16, bloom: 0.08, pixelRatioCap: 2, msaa: 4, ssao: true },
};

export function detectQuality(gl: WebGLRenderingContext | WebGL2RenderingContext): Quality {
  let r = '';
  try {
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    r = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)).toLowerCase();
  } catch {
    /* ignore */
  }
  if (/swiftshader|llvmpipe|software|basic render/.test(r)) return 'low';
  if (/apple m[1-9]|apple gpu|rtx|radeon rx|geforce gtx 1[06-9]|geforce gtx 2|arc a7/.test(r)) return 'high';
  if (/apple|m1|radeon|geforce|nvidia/.test(r)) return 'medium';
  if (/intel|uhd|iris|mali|adreno|powervr/.test(r)) return 'low';
  return 'medium';
}

/** Adjusts render scale to hold a frame-time target. */
export class DynamicRes {
  private acc = 0;
  private n = 0;
  scale: number;
  constructor(
    public max: number,
    public min = 0.5,
  ) {
    this.scale = max;
  }
  /** returns true when the scale changed */
  sample(dt: number): boolean {
    this.acc += dt;
    this.n++;
    if (this.acc < 1.5) return false;
    const avg = this.acc / this.n;
    this.acc = 0;
    this.n = 0;
    const prev = this.scale;
    if (avg > 1 / 45) this.scale = Math.max(this.min, this.scale - 0.08);
    else if (avg < 1 / 58 && this.scale < this.max) this.scale = Math.min(this.max, this.scale + 0.04);
    return Math.abs(prev - this.scale) > 0.001;
  }
}
