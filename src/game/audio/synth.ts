// Small procedural sounds made at load time instead of shipped as files.

/** Seamless duct-air loop: pink-ish noise, band-limited like air through a louvered grille, with a slow
 * gusting swell and a faint blower tone far down the duct. */
export function ventAir(ctx: BaseAudioContext, seconds = 6): AudioBuffer {
  const sr = ctx.sampleRate;
  const n = Math.floor(sr * seconds);
  const buf = ctx.createBuffer(2, n, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    // Paul Kellet's pink noise
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    let lp = 0;
    let hp = 0;
    let prev = 0;
    let seed = 1234 + ch * 777;
    const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
    for (let i = 0; i < n; i++) {
      const w = rnd();
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856;
      b4 = 0.55 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.016898;
      const pink = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
      // ~2.2 kHz low-pass, ~120 Hz high-pass
      lp += (pink - lp) * 0.27;
      hp = 0.983 * (hp + lp - prev);
      prev = lp;
      const t = i / sr;
      // gusts: whole-number cycles over the loop so it wraps cleanly
      const gust = 0.72 + 0.18 * Math.sin((2 * Math.PI * 1 * t) / seconds + ch) + 0.1 * Math.sin((2 * Math.PI * 3 * t) / seconds + 2 * ch);
      const tone = 0.012 * Math.sin(2 * Math.PI * 58 * t) + 0.006 * Math.sin(2 * Math.PI * 116 * t + 1);
      d[i] = hp * gust * 0.9 + tone;
    }
    // crossfade the tail into the head so the loop has no seam
    const xf = Math.floor(sr * 0.5);
    for (let i = 0; i < xf; i++) {
      const a = i / xf;
      d[i] = d[i] * a + d[n - xf + i] * (1 - a);
    }
    const out = d.slice(0, n - xf);
    d.fill(0);
    d.set(out);
  }
  // trim to the crossfaded length
  const len = n - Math.floor(sr * 0.5);
  const res = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) res.copyToChannel(buf.getChannelData(ch).subarray(0, len), ch);
  return res;
}

/** A sheet-metal duct flexing: a dull "bonk" with a short ringing tail. */
export function ductTick(ctx: BaseAudioContext, seed = 1): AudioBuffer {
  const sr = ctx.sampleRate;
  const n = Math.floor(sr * 0.9);
  const buf = ctx.createBuffer(1, n, sr);
  const d = buf.getChannelData(0);
  let s = seed * 9301 + 49297;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
  const modes = [
    [142 + seed * 9, 1, 7],
    [311 + seed * 13, 0.55, 11],
    [587 + seed * 7, 0.3, 16],
    [1043 + seed * 21, 0.14, 24],
  ];
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    let v = 0;
    for (const [f, a, k] of modes) v += a * Math.sin(2 * Math.PI * f * t) * Math.exp(-k * t);
    const click = rnd() * Math.exp(-t * 300) * 0.6;
    const attack = Math.min(1, t / 0.002);
    d[i] = (v * 0.35 + click) * attack;
  }
  return buf;
}
