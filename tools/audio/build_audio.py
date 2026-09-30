"""Procedural sound design for Open Backrooms.

Every sound is synthesised from noise, oscillators, modal resonators and
convolution. Output: public/assets/audio/<name>.ogg (Vorbis) + .m4a (AAC)
plus a manifest.json listing variants.

Run: python tools/audio/build_audio.py
"""
import json
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg
import numpy as np
import soundfile as sf
from scipy import signal

SR = 44100
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "assets" / "audio"
TMP = ROOT / "tools" / "out" / "wav"
rng = np.random.default_rng(2024)
MANIFEST = {}


# ------------------------------------------------------------------ primitives
def t(dur):
    return np.arange(int(dur * SR)) / SR


def white(dur):
    return rng.standard_normal(int(dur * SR))


def pink(dur):
    n = int(dur * SR)
    w = rng.standard_normal(n)
    b = [0.049922035, -0.095993537, 0.050612699, -0.004408786]
    a = [1, -2.494956002, 2.017265875, -0.522189400]
    return signal.lfilter(b, a, w) * 3.5


def brown(dur):
    x = np.cumsum(white(dur))
    x = signal.sosfilt(signal.butter(1, 20, "hp", fs=SR, output="sos"), x)
    return x / (np.abs(x).max() + 1e-9)


def lp(x, f, o=2):
    return signal.sosfilt(signal.butter(o, min(f, SR / 2 - 100), "lp", fs=SR, output="sos"), x)


def hp(x, f, o=2):
    return signal.sosfilt(signal.butter(o, f, "hp", fs=SR, output="sos"), x)


def bp(x, lo, hi, o=2):
    return signal.sosfilt(signal.butter(o, [lo, min(hi, SR / 2 - 100)], "bp", fs=SR, output="sos"), x)


def peak(x, f, q=8.0):
    b, a = signal.iirpeak(f, q, fs=SR)
    return signal.lfilter(b, a, x)


def env_exp(dur, decay, attack=0.001):
    tt = t(dur)
    e = np.exp(-tt / decay)
    a = np.clip(tt / max(attack, 1e-5), 0, 1)
    return e * a


def env_ar(n, a, r):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    if na:
        e[:na] = np.linspace(0, 1, na) ** 2
    if nr:
        e[-nr:] *= np.linspace(1, 0, nr) ** 2
    return e


def bell(n, skew=0.4):
    x = np.linspace(0, 1, n)
    k = np.where(x < skew, x / skew, (1 - x) / (1 - skew))
    return np.sin(np.clip(k, 0, 1) * np.pi / 2) ** 2


def modal(dur, freqs, decays, amps, exc=None):
    tt = t(dur)
    out = np.zeros_like(tt)
    for f, d, a in zip(freqs, decays, amps):
        out += a * np.sin(2 * np.pi * f * tt + rng.uniform(0, 6.28)) * np.exp(-tt / d)
    if exc is not None:
        out = signal.fftconvolve(exc, out)[: len(tt)]
    return out


def mix(*xs):
    n = max(len(x) for x in xs)
    out = np.zeros(n)
    for x in xs:
        out[: len(x)] += x
    return out


def place(buf, x, at, gain=1.0):
    i = int(at * SR)
    if i >= len(buf):
        return buf
    n = min(len(x), len(buf) - i)
    buf[i:i + n] += x[:n] * gain
    return buf


def pad(x, dur):
    n = int(dur * SR)
    return np.concatenate([x, np.zeros(max(0, n - len(x)))])[:n] if len(x) < n else x


def norm(x, peak_db=-1.0):
    m = np.abs(x).max() + 1e-9
    return x / m * 10 ** (peak_db / 20)


def fade(x, fi=0.002, fo=0.01):
    x = x.copy()
    a, b = int(fi * SR), int(fo * SR)
    if a:
        x[:a] *= np.linspace(0, 1, a)
    if b:
        x[-b:] *= np.linspace(1, 0, b)
    return x


def loopify(x, xf=0.5):
    """Crossfade tail into head so the buffer loops seamlessly."""
    n = int(xf * SR)
    head, body, tail = x[:n], x[n:-n], x[-n:]
    w = np.linspace(0, 1, n)
    mixed = tail * np.cos(w * np.pi / 2) + head * np.sin(w * np.pi / 2)
    return np.concatenate([body[: len(body)], mixed]) if len(body) else x


def ir(dur, rt60, lp_start=8000, lp_end=800, stereo=True, early=(), density=1.0, seed=0):
    r = np.random.default_rng(seed)
    n = int(dur * SR)
    tt = np.arange(n) / SR
    chans = []
    for c in range(2 if stereo else 1):
        nz = r.standard_normal(n) * np.exp(-6.91 * tt / rt60)
        if density < 1:
            nz *= (r.random(n) < density)
        # time-varying low-pass: split into bands and decay highs faster
        hi = hp(nz, 2500) * np.exp(-6.91 * tt / (rt60 * 0.35))
        mid = bp(nz, 400, 2500) * np.exp(-6.91 * tt / (rt60 * 0.7))
        lo = lp(nz, 400)
        y = lo + mid + hi * 0.6
        for dt_, g in early:
            i = int((dt_ + r.uniform(-0.0005, 0.0005)) * SR)
            if i < n:
                y[i] += g * (1 if r.random() > 0.5 else -1)
        y[: int(0.002 * SR)] *= np.linspace(0, 1, int(0.002 * SR))
        chans.append(y)
    y = np.stack(chans, -1)
    return y / np.abs(y).max()


def conv(x, h, wet=0.4, dry=1.0):
    if h.ndim == 2:
        h = h.mean(1)
    y = signal.fftconvolve(x, h)[: len(x) + len(h) - 1]
    y = y / (np.abs(y).max() + 1e-9) * np.abs(x).max()
    out = np.zeros(len(y))
    out[: len(x)] += x * dry
    return out + y * wet


BIG_IR = ir(4.0, 3.2, seed=11, early=[(0.03, 0.4), (0.051, 0.3), (0.083, 0.25)])
OFFICE_IR = ir(1.2, 0.55, seed=12, early=[(0.004, 0.6), (0.007, 0.45), (0.011, 0.35), (0.017, 0.3), (0.023, 0.2)])


def distant(x, cutoff=900, wet=0.9, dry=0.15):
    return lp(conv(x, BIG_IR, wet, dry), cutoff)


# ------------------------------------------------------------------ writing
def write(name, x, loop=False, stereo=False):
    TMP.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)
    x = np.asarray(x, dtype=np.float64)
    if not loop and x.ndim == 1:
        x = fade(x, 0.0005, 0.02)
    wav = TMP / f"{name}.wav"
    sf.write(wav, np.clip(x, -1, 1).astype(np.float32), SR, subtype="PCM_16")
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    subprocess.run([ff, "-y", "-loglevel", "error", "-i", str(wav), "-c:a", "libvorbis", "-q:a", "4", str(OUT / f"{name}.ogg")], check=True)
    subprocess.run([ff, "-y", "-loglevel", "error", "-i", str(wav), "-c:a", "aac", "-b:a", "128k" if stereo else "96k", "-movflags", "+faststart", str(OUT / f"{name}.m4a")], check=True)
    base = name.rsplit("_", 1)
    key = base[0] if len(base) == 2 and base[1].isdigit() else name
    MANIFEST.setdefault(key, []).append(name)
    print(f"  {name:28s} {len(x) / SR:5.2f}s")


def variants(name, fn, n):
    for i in range(n):
        write(f"{name}_{i}", fn(i))


# ------------------------------------------------------------------ footsteps

def grains(dur, n, t0, t1, lo, hi, amp_env=None, width=0.0015, seed=None):
    """Stochastic micro-impacts (PhISEM-style): n tiny noise grains between t0..t1."""
    r = np.random.default_rng(seed)
    x = np.zeros(int(dur * SR))
    for _ in range(n):
        at = r.uniform(t0, t1)
        w = width * r.uniform(0.5, 1.6)
        L = max(8, int(w * SR))
        gr = r.standard_normal(L) * np.exp(-np.linspace(0, 5, L))
        a = r.uniform(0.3, 1.0) * (amp_env(at) if amp_env else 1.0)
        place(x, gr * a, at)
    return bp(x, lo, hi, 2)

def step_carpet(i, run=False):
    """Soft-soled shoe on damp commercial carpet: dull heel roll, fibre scuff, toe-off."""
    r = np.random.default_rng(1000 + i + (500 if run else 0))
    d = 0.5
    x = np.zeros(int(d * SR))
    heel_len = r.uniform(0.018, 0.035) * (0.7 if run else 1.0)
    # heel roll: dense low grains -> soft thud with texture
    env = lambda at: np.exp(-((at - 0.004) / heel_len) ** 2)
    h = grains(d, int(r.uniform(60, 110)), 0.0, heel_len * 1.6, 60, 900, env, 0.002, r.integers(1e9))
    place(x, h * 1.4, 0.0)
    # body of the step through the floor (low, short)
    thump = lp(white(0.09), r.uniform(140, 220), 3) * env_exp(0.09, r.uniform(0.012, 0.02), 0.003)
    place(x, thump * 0.9, 0.0)
    # fibre scuff: filtered noise swell, brighter when running
    sl = r.uniform(0.05, 0.1)
    sc = bp(white(sl), 700, 3800 if run else 2600) * bell(int(sl * SR), 0.3) * (0.16 if run else 0.07)
    place(x, sc, r.uniform(0.01, 0.03))
    # toe-off: a smaller grain cluster
    toe_at = r.uniform(0.11, 0.17) * (0.65 if run else 1.0)
    t2 = grains(d, int(r.uniform(20, 45)), 0.0, 0.02, 80, 1200, None, 0.0015, r.integers(1e9))
    place(x, t2 * 0.45, toe_at)
    # damp carpet: a faint wet 'tack' as the sole lifts (not bubbles)
    if r.random() < 0.6:
        tack = bp(white(0.03), 1200, 3500) * env_exp(0.03, 0.006) * 0.05
        place(x, tack, toe_at + 0.02)
    x = lp(x, 5200 if run else 3800)
    return norm(conv(x, OFFICE_IR, 0.08), -3 if run else -6)


def step_concrete(i):
    """Rubber sole on bare concrete with grit: short heel knock, sandy grit, big room tail."""
    r = np.random.default_rng(2000 + i)
    d = 0.45
    x = np.zeros(int(d * SR))
    env = lambda at: np.exp(-((at - 0.003) / 0.012) ** 2)
    place(x, grains(d, int(r.uniform(40, 70)), 0.0, 0.02, 120, 2500, env, 0.0012, r.integers(1e9)) * 1.3, 0.0)
    place(x, lp(white(0.05), 320, 2) * env_exp(0.05, 0.01, 0.002) * 0.7, 0.0)
    # grit under the sole: sparse bright ticks over the stance
    place(x, grains(d, int(r.uniform(10, 26)), 0.005, 0.16, 2500, 9000, None, 0.0006, r.integers(1e9)) * 0.35, 0.0)
    toe_at = r.uniform(0.09, 0.13)
    place(x, grains(d, int(r.uniform(15, 30)), 0.0, 0.012, 150, 3000, None, 0.001, r.integers(1e9)) * 0.55, toe_at)
    place(x, bp(white(0.06), 1500, 6000) * bell(int(0.06 * SR), 0.3) * 0.06, toe_at)
    return norm(conv(x, OFFICE_IR, 0.18), -6)


def step_metal(i):
    d = 0.7
    x = np.zeros(int(d * SR))
    base = rng.uniform(280, 360)
    ratios = [1, 2.32, 3.9, 5.7, 8.1]
    m = modal(0.6, [base * r * rng.uniform(0.98, 1.02) for r in ratios], [0.25, 0.15, 0.09, 0.06, 0.04], [0.5, 0.35, 0.25, 0.15, 0.1])
    hit = lp(white(0.03), 1200) * env_exp(0.03, 0.006)
    place(x, m * 0.6 + pad(hit, 0.6) * 0.8, 0.002)
    # grate rattle: a few decaying re-hits
    for k in range(rng.integers(2, 5)):
        place(x, modal(0.12, [rng.uniform(1500, 3500)], [0.02], [0.2]), 0.02 + k * rng.uniform(0.015, 0.03))
    place(x, modal(0.3, [base * 1.1], [0.1], [0.3]) * 0.5, rng.uniform(0.09, 0.13))
    return norm(x, -6)


def step_water(i):
    """Shallow puddle: low slap, broadband splash with several sub-splashes, drips back."""
    r = np.random.default_rng(3000 + i)
    d = 0.7
    x = np.zeros(int(d * SR))
    place(x, lp(white(0.06), 260) * env_exp(0.06, 0.014) * 0.9, 0.0)
    for k in range(r.integers(3, 6)):
        L = r.uniform(0.04, 0.12)
        sp = bp(white(L), r.uniform(600, 1200), r.uniform(4000, 9000)) * env_exp(L, L / 3, 0.002)
        place(x, sp * r.uniform(0.3, 0.7), r.uniform(0.0, 0.08))
    for k in range(r.integers(3, 8)):
        place(x, grains(0.03, 6, 0, 0.01, 1500, 6000, None, 0.0008, r.integers(1e9)) * 0.2, r.uniform(0.12, 0.45))
    return norm(conv(x, OFFICE_IR, 0.12), -6)


def land(kind):
    x = np.zeros(int(0.8 * SR))
    place(x, lp(white(0.15), 180, 3) * env_exp(0.15, 0.04), 0)
    place(x, np.sin(2 * np.pi * 55 * t(0.25)) * env_exp(0.25, 0.07), 0)
    if kind == "carpet":
        place(x, step_carpet(0, True) * 0.7, 0.01)
    elif kind == "concrete":
        place(x, step_concrete(0) * 0.8, 0.0)
        place(x, step_concrete(1) * 0.5, 0.07)
    else:
        place(x, step_metal(0) * 0.9, 0.0)
        place(x, step_metal(1) * 0.6, 0.06)
    return norm(x, -3)


def cloth(i):
    d = rng.uniform(0.25, 0.5)
    n = int(d * SR)
    am = np.abs(lp(white(d), 30)) * 3
    x = bp(white(d), 1500, 9000) * am * bell(n, rng.uniform(0.2, 0.6))
    x += bp(white(d), 300, 1200) * am * 0.3 * bell(n, 0.4)
    return norm(x, -12)


# ------------------------------------------------------------------ body
def breath_one(kind, r, mouth=True, strength=1.0, voice=0.0):
    """One breath (inhale or exhale): pink airflow through vocal-tract formants."""
    if kind == "in":
        L = r.uniform(0.35, 0.7) / (0.6 + 0.4 * strength)
        src = pink(L) + white(L) * 0.15
        form = [(r.uniform(900, 1300), 3.0, 0.8), (r.uniform(2200, 2800), 4.0, 0.6), (r.uniform(3800, 4600), 5.0, 0.3)]
        shape = bell(int(L * SR), 0.75) ** 1.3
    else:
        L = r.uniform(0.45, 0.9) / (0.6 + 0.4 * strength)
        src = pink(L)
        form = [(r.uniform(500, 750), 2.5, 1.0), (r.uniform(1050, 1400), 3.0, 0.7), (r.uniform(2300, 2700), 4.0, 0.35)]
        if not mouth:
            form = [(r.uniform(250, 350), 2.0, 0.8), (r.uniform(1900, 2300), 5.0, 0.4)]  # nasal
        shape = bell(int(L * SR), 0.18) ** 1.1
    y = np.zeros_like(src)
    for f0, q, g_ in form:
        y += peak(src, f0, q) * g_
    y = lp(hp(y, 180), 5500)
    y *= shape
    if voice > 0 and kind == "out":
        n = len(y)
        f0 = r.uniform(170, 220) * (1 - 0.15 * np.linspace(0, 1, n)) * (1 + 0.012 * r.standard_normal(n).cumsum() / np.sqrt(n))
        ph = np.cumsum(f0) / SR
        pulses = np.clip(np.sin(2 * np.pi * ph), 0, 1) ** 6
        v = sum(peak(pulses, f, q) * g_ for f, q, g_ in form)
        y += lp(v, 3000) * voice * shape * 0.5
    return y * strength


def breath_cycle(inhale, exhale, pause, voice=0.0, mouth=False, gain=1.0):
    r = np.random.default_rng()
    return np.concatenate([breath_one("in", r, mouth), np.zeros(int(0.04 * SR)), breath_one("out", r, mouth, voice=voice), np.zeros(int(pause * SR))]) * gain


def breath_loop(kind):
    parts = []
    tot = 0
    L = {"calm": 16, "tired": 12, "panic": 10}[kind]
    while tot < L:
        if kind == "calm":
            c = breath_cycle(rng.uniform(1.2, 1.6), rng.uniform(1.6, 2.1), rng.uniform(0.6, 1.2), gain=rng.uniform(0.7, 1.0))
        elif kind == "tired":
            c = breath_cycle(rng.uniform(0.45, 0.6), rng.uniform(0.55, 0.75), rng.uniform(0.02, 0.1), mouth=True, gain=rng.uniform(0.85, 1.0))
        else:
            c = breath_cycle(rng.uniform(0.25, 0.4), rng.uniform(0.3, 0.45), rng.uniform(0.0, 0.08), voice=0.35 if rng.random() < 0.35 else 0.0, mouth=True, gain=rng.uniform(0.7, 1.0))
        parts.append(c)
        tot += len(c) / SR
    x = np.concatenate(parts)
    return norm(loopify(x, 0.3), -8)


def heartbeat():
    x = np.zeros(int(0.9 * SR))
    for at, g, f in ((0.0, 1.0, 52), (0.28, 0.65, 60)):
        tt = t(0.2)
        s = np.sin(2 * np.pi * np.cumsum(np.linspace(f * 1.4, f, len(tt))) / SR) * env_exp(0.2, 0.05, 0.006)
        s = mix(s, lp(white(0.2), 120) * env_exp(0.2, 0.03) * 0.5)
        place(x, s * g, at)
    return norm(lp(x, 200), -2)


def tinnitus():
    d = 12
    tt = t(d)
    x = np.sin(2 * np.pi * 7400 * tt) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.07 * tt)) * 0.3
    x += np.sin(2 * np.pi * 7430 * tt) * 0.15
    return norm(loopify(x, 1.0), -18)


# ------------------------------------------------------------------ electrical
def buzz(dur, f=120, bright=4000, jitter=0.0):
    tt = t(dur)
    ph = 2 * np.pi * f * tt + jitter * np.cumsum(rng.standard_normal(len(tt))) / SR
    x = np.sign(np.sin(ph)) * 0.5 + signal.sawtooth(ph * 2) * 0.3
    return lp(x, bright)


def tube_flicker(i):
    d = rng.uniform(0.6, 1.4)
    x = np.zeros(int(d * SR))
    at = 0.0
    while at < d - 0.15:
        L = rng.uniform(0.03, 0.2)
        b = buzz(L, 120, rng.uniform(2500, 6000)) * env_ar(int(L * SR), 0.003, 0.01) * rng.uniform(0.2, 0.5)
        place(x, b, at)
        place(x, modal(0.05, [rng.uniform(3500, 5200)], [0.008], [0.4]), at)  # starter tink
        at += L + rng.uniform(0.02, 0.2)
    return norm(conv(x, OFFICE_IR, 0.2), -8)


def ballast_click():
    x = modal(0.25, [180, 420, 1250, 3100], [0.05, 0.03, 0.015, 0.006], [0.5, 0.4, 0.3, 0.2])
    return norm(conv(x, OFFICE_IR, 0.25), -6)


def power_down():
    d = 5.0
    x = np.zeros(int(d * SR))
    thunk = mix(lp(white(0.4), 150, 3) * env_exp(0.4, 0.1), modal(1.0, [48, 96, 310], [0.3, 0.2, 0.1], [1, 0.5, 0.3]))
    place(x, thunk, 0.0)
    tt = t(3.5)
    f = 120 * np.exp(-tt * 0.4)
    ph = 2 * np.pi * np.cumsum(f) / SR
    hum = (np.sin(ph) + 0.5 * np.sin(2 * ph) + 0.3 * np.sin(3 * ph) + 0.2 * np.sin(5 * ph)) * np.exp(-tt * 1.2)
    place(x, hum * 0.4, 0.05)
    return norm(distant(x, 3000, 0.6, 1.0), -2)


def power_up():
    d = 3.5
    x = np.zeros(int(d * SR))
    place(x, modal(1.0, [60, 140, 520], [0.2, 0.1, 0.05], [1, 0.5, 0.3]), 0.0)
    at = 0.3
    for k in range(6):
        L = rng.uniform(0.05, 0.25)
        place(x, buzz(L) * env_ar(int(L * SR), 0.002, 0.01) * 0.3, at)
        at += L + rng.uniform(0.05, 0.25)
    tt = t(1.5)
    ph = 2 * np.pi * np.cumsum(120 * (1 - 0.3 * np.exp(-tt * 3))) / SR
    place(x, (np.sin(ph) + 0.4 * np.sin(2 * ph)) * np.clip(tt * 2, 0, 1) * 0.25, at)
    return norm(distant(x, 4000, 0.5, 1.0), -2)


def spark(i):
    d = rng.uniform(0.3, 0.9)
    n = int(d * SR)
    x = np.zeros(n)
    rate = rng.uniform(400, 1400)
    imp = (rng.random(n) < rate / SR) * rng.standard_normal(n) * (rng.random(n) ** 2)
    burst = np.clip(lp(np.abs(white(d)), 12) * 8, 0, 1)
    x += hp(imp, 2000) * burst * 3
    x += buzz(d, 60, 3000, 30) * burst * 0.25
    pop = hp(white(0.01), 500) * env_exp(0.01, 0.002)
    place(x, pop * 2, 0.0)
    return norm(conv(x, OFFICE_IR, 0.2), -3)


def outlet_buzz():
    d = 8
    x = buzz(d, 60, 1800, 5) * 0.3 + np.sin(2 * np.pi * 120 * t(d)) * 0.4
    x *= 1 + 0.3 * lp(white(d), 8)
    imp = (rng.random(int(d * SR)) < 30 / SR) * rng.standard_normal(int(d * SR))
    x += hp(imp, 2500) * 2
    return norm(loopify(x, 0.5), -10)


def hum_loop():
    """Magnetic ballast: full-wave-rectified 60 Hz (a 120 Hz buzz rich in harmonics),
    housing resonances, a fizz of arcing noise locked to the mains cycle, rare crackles."""
    d = 6.0
    tt = t(d)
    jit = 1 + 0.004 * lp(white(d), 3) * 20
    ph = 2 * np.pi * 60 * np.cumsum(jit) / SR
    rect = np.abs(np.sin(ph))
    buzz = np.tanh((rect - 0.62) * 3.0)
    body = sum(peak(buzz, f, q) * g_ for f, q, g_ in ((120, 4, 1.0), (240, 6, 0.8), (360, 8, 0.5), (720, 10, 0.35), (1150, 8, 0.25)))
    fizz = lp(hp(white(d), 2000), 6000) * np.abs(np.sin(ph)) ** 10 * 0.06
    crack = (np.random.default_rng(7).random(len(tt)) < 3 / SR) * np.random.default_rng(8).standard_normal(len(tt))
    crack = lp(hp(crack, 2000), 7000) * 0.5
    x = lp(body * 0.6, 4000) + fizz + crack
    x *= 1 + 0.06 * np.sin(2 * np.pi * 0.37 * tt)
    return norm(loopify(x, 0.5), -6)


# ------------------------------------------------------------------ ambience
def amb_l0():
    """Level 0 room tone: HVAC air, a far-off chorus of ballasts, faint building rumble."""
    d = 30
    tt = t(d)
    air = lp(pink(d), 420, 3) * 0.55
    rumble = lp(brown(d), 55) * 0.45
    chorus = np.zeros_like(tt)
    for k in range(5):
        ph = 2 * np.pi * 60 * (1 + np.random.default_rng(k).uniform(-0.002, 0.002)) * tt
        chorus += np.tanh((np.abs(np.sin(ph)) - 0.6) * 3)
    chorus = lp(peak(chorus, 120, 3) + peak(chorus, 240, 4) * 0.6, 900)
    chorus = conv(chorus / 5, BIG_IR, 0.9, 0.2) * 0.12
    x = air + rumble + chorus[: len(air)]
    x *= 1 + 0.1 * lp(white(d), 0.3) * 20
    return norm(loopify(x, 2.0), -14)


def amb_l1():
    d = 40
    tt = t(d)
    wind = np.zeros_like(tt)
    nz = pink(d)
    lfo = 0.5 + 0.5 * np.sin(2 * np.pi * tt / 13) * np.sin(2 * np.pi * tt / 7.3)
    wind = bp(nz, 120, 700) * (0.3 + 0.7 * lfo)
    x = wind * 0.6 + lp(brown(d), 50) * 0.6
    for k in range(6):
        place(x, distant(modal(0.8, [rng.uniform(80, 200), rng.uniform(300, 600)], [0.2, 0.1], [1, 0.5]) * 0.2, 500) * 0.3, rng.uniform(1, d - 5))
    return norm(loopify(x, 2.0), -12)


def amb_l2():
    d = 30
    tt = t(d)
    motor = sum(a * np.sin(2 * np.pi * f * tt) for f, a in ((50, 1), (100, 0.6), (150, 0.3), (51.3, 0.5), (300, 0.08)))
    motor *= 0.6 + 0.4 * np.sin(2 * np.pi * tt / 9)
    hiss = hp(pink(d), 2500) * (0.5 + 0.5 * np.sin(2 * np.pi * tt / 11)) * 0.15
    x = motor * 0.25 + hiss + lp(brown(d), 80) * 0.4
    for k in range(8):
        place(x, distant(modal(0.6, [rng.uniform(300, 900), rng.uniform(1200, 2400)], [0.15, 0.08], [1, 0.5]) * 0.15, 1500), rng.uniform(1, d - 5))
    return norm(loopify(x, 2.0), -12)


def tape_hiss():
    d = 10
    x = hp(pink(d), 3000) * 0.6 + hp(white(d), 8000) * 0.2
    x *= 1 + 0.08 * np.sin(2 * np.pi * 0.9 * t(d))
    return norm(loopify(x, 0.5), -20)


# ------------------------------------------------------------------ distant events
def knock(i):
    x = np.zeros(int(2.0 * SR))
    n = rng.integers(2, 5)
    gap = rng.uniform(0.18, 0.4)
    for k in range(n):
        m = modal(0.3, [rng.uniform(90, 130), rng.uniform(220, 300), rng.uniform(500, 700)], [0.06, 0.03, 0.015], [1, 0.6, 0.3])
        m = mix(m, lp(white(0.02), 800) * env_exp(0.02, 0.004))
        place(x, m, 0.05 + k * gap * rng.uniform(0.85, 1.15))
    return norm(distant(x, 1200, 0.8, 0.4), -3)


def slam():
    x = np.zeros(int(1.0 * SR))
    place(x, lp(white(0.3), 250, 3) * env_exp(0.3, 0.06) * 1.5, 0)
    place(x, modal(0.5, [70, 160, 380, 900], [0.12, 0.08, 0.05, 0.02], [1, 0.7, 0.4, 0.2]), 0)
    for k in range(4):
        place(x, modal(0.1, [rng.uniform(1500, 3000)], [0.015], [0.2]), 0.03 + k * 0.02)
    return norm(distant(x, 1000, 1.0, 0.3), -1)


def howl(i):
    d = rng.uniform(3.0, 5.0)
    tt = t(d)
    f0 = rng.uniform(150, 210) * (1 - 0.25 * tt / d) * (1 + 0.02 * np.sin(2 * np.pi * 5.5 * tt))
    ph = 2 * np.pi * np.cumsum(f0) / SR
    src = signal.sawtooth(ph) + 0.3 * rng.standard_normal(len(tt))
    k = np.clip(tt / d, 0, 1)
    out = np.zeros_like(tt)
    # vowel morph oo -> ah
    for f1, f2 in ((300, 700), (850, 1250)):
        pass
    oo = peak(src, 320, 6) + peak(src, 780, 8) * 0.5
    ah = peak(src, 820, 6) + peak(src, 1200, 8) * 0.6
    out = oo * (1 - k) + ah * k
    out *= bell(len(tt), 0.3)
    if i == 1:  # pitched-down, broken variant
        out = signal.resample(out, int(len(out) * 1.4))
        out = np.tanh(out * 3)
    return norm(distant(out, 1100, 1.0, 0.1), -3)


def running_steps():
    x = np.zeros(int(4.0 * SR))
    at = 0.2
    gap = 0.34
    for k in range(10):
        place(x, step_carpet(k, True), at, 1.0 - k * 0.07)
        gap *= 0.97
        at += gap * rng.uniform(0.92, 1.08)
    return norm(distant(x, 900, 0.9, 0.2), -4)


def pipe_groan(i):
    d = rng.uniform(2.0, 3.5)
    tt = t(d)
    f = rng.uniform(55, 90) * (1 + 0.3 * np.sin(2 * np.pi * tt / d * rng.uniform(0.5, 1.5)))
    ph = 2 * np.pi * np.cumsum(f) / SR
    stick = (np.sin(ph) > 0.7).astype(float) * rng.uniform(0.5, 1.0, len(tt))
    x = lp(stick, 2000)
    for fr in (f.mean() * 2.1, f.mean() * 3.7, 420, 780):
        x += peak(x, fr, 20) * 0.5
    x *= bell(len(tt), 0.5)
    return norm(distant(x, 1600, 0.6, 0.6), -4)


def steam_hiss():
    d = 2.5
    x = hp(white(d), 1200) * env_ar(int(d * SR), 0.03, 1.2)
    x = x * (1 + 0.2 * lp(white(d), 20) * 5)
    return norm(conv(x, OFFICE_IR, 0.3), -6)


def drip(i):
    x = np.zeros(int(1.2 * SR))
    f0 = rng.uniform(700, 1400)
    L = 0.02
    b = np.sin(2 * np.pi * np.cumsum(np.linspace(f0, f0 * 2.2, int(L * SR))) / SR) * env_exp(L, 0.008)
    place(x, b, 0.0)
    place(x, hp(white(0.004), 2000) * env_exp(0.004, 0.001) * 0.3, 0.0)
    return norm(distant(x, 5000, 0.5, 0.8), -6)


# ------------------------------------------------------------------ entities
def crawler_click(i):
    x = np.zeros(int(0.6 * SR))
    n = rng.integers(2, 6)
    for k in range(n):
        c = hp(white(0.003), 1000) * env_exp(0.003, 0.0006)
        c = mix(c, modal(0.03, [rng.uniform(1200, 3200), rng.uniform(400, 800)], [0.004, 0.008], [0.6, 0.4]))
        place(x, c, 0.01 + k * rng.uniform(0.03, 0.09))
    sq = bp(white(0.15), 300, 1500) * bell(int(0.15 * SR), 0.3) * 0.15
    place(x, sq, rng.uniform(0.02, 0.2))
    return norm(x, -3)


def crawler_rasp():
    """Wet, laboured breathing with vocal fry (irregular glottal clicks) for crawlers."""
    d = 8
    n = int(d * SR)
    r = np.random.default_rng(66)
    y = np.zeros(n)
    at = 0.0
    while at < d - 1.2:
        L = r.uniform(0.5, 1.1)
        m = int(L * SR)
        rate = r.uniform(25, 55)
        ticks = (r.random(m) < rate / SR) * r.uniform(0.4, 1.0, m)
        src = lp(ticks, 2500) + pink(L) * 0.25
        seg = peak(src, r.uniform(350, 500), 4) + peak(src, r.uniform(900, 1200), 5) * 0.6 + peak(src, 2600, 7) * 0.2
        seg *= bell(m, r.uniform(0.2, 0.5))
        place(y, seg, at)
        at += L + r.uniform(0.15, 0.6)
    y = np.tanh(y * 3)
    return norm(loopify(y, 0.4), -6)


def crawler_step(i):
    x = np.zeros(int(0.35 * SR))
    place(x, lp(white(0.05), 200) * env_exp(0.05, 0.01), 0)
    for k in range(rng.integers(2, 5)):
        place(x, mix(modal(0.03, [rng.uniform(600, 1500)], [0.006], [0.3]), hp(white(0.002), 2000) * 0.2), 0.02 + k * rng.uniform(0.015, 0.04))
    return norm(x, -6)


def drone(freqs, d=20, noise_amt=0.2, crackle=0.0, lpf=400):
    tt = t(d)
    x = np.zeros_like(tt)
    for f in freqs:
        x += np.sin(2 * np.pi * f * tt + 0.3 * np.sin(2 * np.pi * 0.1 * tt + rng.uniform(0, 6)))
    x += lp(white(d), lpf) * noise_amt * 4
    if crackle:
        imp = (rng.random(len(tt)) < crackle / SR) * rng.standard_normal(len(tt))
        x += hp(imp, 1500) * 3
    x *= 0.7 + 0.3 * np.sin(2 * np.pi * tt / d * 3)
    return norm(loopify(x, 1.0), -4)


def smiler_hiss():
    d = 1.6
    tt = t(d)
    x = hp(white(d), 900) * env_ar(len(tt), 0.3, 0.3)
    imp = (rng.random(len(tt)) < 900 / SR) * rng.standard_normal(len(tt))
    x += hp(imp, 2500) * 2.5
    ph = 2 * np.pi * np.cumsum(np.linspace(90, 60, len(tt))) / SR
    x += np.tanh(signal.sawtooth(ph) * 3) * 0.3 * bell(len(tt), 0.6)
    return norm(conv(x, OFFICE_IR, 0.3), -2)


def dweller_knock(i):
    x = np.zeros(int(2.5 * SR))
    n = rng.integers(3, 7)
    at = 0.05
    base = rng.uniform(180, 260)
    for k in range(n):
        m = modal(0.8, [base, base * 2.4, base * 4.1, base * 6.9], [0.3, 0.2, 0.1, 0.05], [1, 0.6, 0.4, 0.2])
        place(x, m, at)
        at += rng.uniform(0.15, 0.35)
    return norm(distant(x, 3000, 0.6, 0.6), -3)


def dweller_groan():
    d = 3.0
    tt = t(d)
    f = 70 * (1 + 0.15 * np.sin(2 * np.pi * tt / d))
    src = signal.sawtooth(2 * np.pi * np.cumsum(f + rng.standard_normal(len(tt)) * 6) / SR)
    x = peak(src, 300, 5) + peak(src, 650, 7) * 0.6
    x = np.tanh(x * 2) * bell(len(tt), 0.4)
    return norm(conv(x, OFFICE_IR, 0.4), -3)


# ------------------------------------------------------------------ scares
def strings(d, notes, attack=0.01, decay=0.35, sustain=0.45, release=0.6, ponticello=0.0, voices=6, gliss=0.0, tremolo=0.0, seed=0, fade=0.0):
    """Bowed string section: detuned voices with vibrato/jitter, bow noise and body resonances.
    ponticello pushes energy into the glassy upper partials; gliss bends pitch by that ratio over d."""
    r = np.random.default_rng(seed)
    n = int(d * SR)
    tt = np.arange(n) / SR
    out = np.zeros(n)
    bend = 1 + gliss * (tt / d) ** 1.5
    for f in notes:
        for _ in range(voices):
            det = 2 ** (r.uniform(-14, 14) / 1200)
            vib = 1 + 0.0035 * np.sin(2 * np.pi * r.uniform(4.8, 6.2) * tt + r.uniform(0, 6)) * np.clip(tt / 0.4, 0, 1)
            jit = 1 + 0.004 * lp(r.standard_normal(n), 18) * 12
            fi = f * det * vib * jit * bend
            ph = 2 * np.pi * np.cumsum(fi) / SR
            kmax = int(min(40, 9000 / f))
            v = np.zeros(n)
            for k in range(1, kmax + 1):
                a = (1 / k) * r.uniform(0.6, 1.2) * (1 + ponticello * 3 * (k > 4) * min(1, k / 12))
                v += a * np.sin(k * ph + r.uniform(0, 6))
            out += v * r.uniform(0.7, 1.0)
    out /= np.abs(out).max() + 1e-9
    bow = bp(r.standard_normal(n), 1500, 8000) * (0.04 + 0.1 * ponticello)
    body = out * 0.5 + peak(out, 280, 3) * 0.6 + peak(out, 460, 4) * 0.5 + peak(out, 1050, 5) * 0.35 + peak(out, 2600, 4) * (0.25 + ponticello)
    if ponticello:
        body += hp(out, 2500) * ponticello * 1.5
    y = lp(body + bow, 11000)
    na = max(1, int(attack * SR))
    env = np.ones(n) * sustain
    env[:na] = np.linspace(0, 1, na) ** 1.5
    nd = int(decay * SR)
    seg = env[na:na + nd]
    env[na:na + nd] = sustain + (1 - sustain) * np.exp(-np.linspace(0, 4, len(seg)))
    nr = int(release * SR)
    env[-nr:] *= np.linspace(1, 0, nr) ** 2
    if fade:
        env[na:] *= np.exp(-(tt[na:] - tt[na]) / fade)
    if tremolo:
        env *= 1 - 0.5 * (0.5 + 0.5 * np.sin(2 * np.pi * tremolo * tt))
    return y * env


def impact(seed, size=1.0, metal=0.8):
    """Layered film hit: pitch-dropping sub, drywall/wood slam, inharmonic metal crash, transient crack."""
    r = np.random.default_rng(seed)
    d = 3.5
    n = int(d * SR)
    tt = np.arange(n) / SR
    f = 26 + 38 * np.exp(-tt / (0.18 * size))
    sub = np.tanh(np.sin(2 * np.pi * np.cumsum(f) / SR) * 2.2) * np.exp(-tt / (0.75 * size))
    slam = lp(r.standard_normal(n), 900) * np.exp(-tt / 0.07) * 1.6
    slam += modal(d, [r.uniform(80, 100), r.uniform(130, 160), r.uniform(200, 240), r.uniform(310, 360)], [0.25, 0.18, 0.12, 0.08], [1, 0.8, 0.6, 0.4])
    b = r.uniform(170, 260)
    ratios = [1, 1.47, 2.09, 2.56, 3.14, 3.9, 4.22, 5.4, 6.8, 8.1, 9.7]
    mt = modal(d, [b * q * r.uniform(0.98, 1.02) for q in ratios], [r.uniform(0.25, 0.9) / (1 + 0.12 * j) for j in range(len(ratios))], [r.uniform(0.3, 1) / (1 + 0.15 * i) for i in range(len(ratios))])
    mt = hp(mt, 150) * metal
    crack = hp(r.standard_normal(int(0.03 * SR)), 1200) * env_exp(0.03, 0.005) * 2.5
    x = sub * 1.3 + slam * 0.7 + mt * 0.6
    place(x, crack, 0.0)
    x = conv(x, BIG_IR, 0.45)[:n]
    return np.tanh(x / (np.abs(x).max() + 1e-9) * 1.8)


def reverse_swell(src, d):
    """Reversed reverb bloom of `src`, rising over d seconds and stopping dead at the end."""
    wet = conv(src, BIG_IR, 1.0, 0.0)
    wet = wet[::-1][-int(d * SR):]
    k = np.linspace(0, 1, len(wet))
    return wet * k ** 2.2


def scream(seed, style=0, d=1.8):
    """Creature scream: LF-ish glottal source with jitter/shimmer, subharmonic roar, breath noise,
    moving throat/mouth formants and an ingressive gasp before it."""
    r = np.random.default_rng(seed)
    n = int(d * SR)
    k = np.linspace(0, 1, n)
    wob = lp(r.standard_normal(n), 9) * 30
    if style == 0:   # rising shriek that cracks at the end
        f0 = 420 + 620 * np.clip(k / 0.18, 0, 1) - 380 * np.clip((k - 0.75) / 0.25, 0, 1)
        F = ([850, 1350, 2900, 3900], [1000, 1900, 3200, 4200]); sub, drive, br = 0.25, 2.8, 0.35
    elif style == 1:  # broken wail: pitch sobbing, voice breaking in and out
        f0 = 560 + 140 * np.sin(2 * np.pi * 2.6 * k * d) + 200 * k
        F = ([750, 1200, 2700, 3700], [900, 1500, 3000, 4000]); sub, drive, br = 0.15, 2.2, 0.45
    elif style == 2:  # guttural roar
        f0 = 120 + 60 * np.clip(k / 0.2, 0, 1) - 30 * k
        F = ([520, 950, 2400, 3300], [650, 1100, 2600, 3500]); sub, drive, br = 0.7, 4.5, 0.3
    else:             # clicking fry accelerating into a shriek
        f0 = 35 + 900 * np.clip((k - 0.25) / 0.2, 0, 1) ** 1.5
        F = ([800, 1300, 2800, 3800], [950, 1700, 3100, 4100]); sub, drive, br = 0.3, 3.0, 0.35
    f0 = f0 * (1 + 0.06 * np.sin(2 * np.pi * r.uniform(5, 8) * k * d + r.uniform(0, 6)) * np.clip(k / 0.2, 0, 1))
    f0 = f0 * (1 + 0.035 * lp(r.standard_normal(n), 25) * 14) * (1 + 0.02 * lp(r.standard_normal(n), 120) * 25)
    brk = np.ones(n)
    for _ in range(r.integers(2, 5)):  # yodel-like register breaks
        a = r.uniform(0.2, 0.9)
        brk *= 1 + r.choice([-0.25, 0.3]) * ((k > a) & (k < a + r.uniform(0.04, 0.12)))
    f0 = np.maximum(20, lp(f0 * brk, 60) + wob)
    ph = np.cumsum(f0) / SR
    p = ph % 1.0
    glot = np.where(p < 0.6, 0.5 * (1 - np.cos(np.pi * p / 0.6)), np.cos(0.5 * np.pi * (p - 0.6) / 0.25).clip(0))
    src = np.diff(glot, prepend=0) * SR / 800
    src *= 1 + sub * np.sign(np.sin(np.pi * ph))            # period doubling
    src *= 1 + 0.25 * lp(r.standard_normal(n), 60) * 6       # shimmer
    src *= 1 + 0.35 * np.sin(2 * np.pi * r.uniform(35, 60) * np.arange(n) / SR) * (style == 2)  # growl flutter
    if style == 1:
        src *= np.clip(0.4 + np.sin(2 * np.pi * 3.3 * k * d + 1) * 2, 0, 1)
    breath = bp(r.standard_normal(n), 900, 7000) * br * 6
    ex = src + breath * (0.4 + 0.6 * np.abs(np.sin(np.pi * ph * 0.5)))
    y = np.zeros(n)
    br *= 1.6
    breath = breath * 1.6
    ex = src + breath * (0.4 + 0.6 * np.abs(np.sin(np.pi * ph * 0.5)))
    for (a, b), g, q in zip(zip(*F), (1.0, 0.8, 0.7, 0.45), (2.2, 2.8, 3.5, 4.5)):
        y += peak(ex, a, q) * g * (1 - k) + peak(ex, b, q) * g * k
    y += hp(ex, 3500) * 0.15
    y = np.tanh(y / (np.abs(y).max() + 1e-9) * drive)
    y *= env_ar(n, 0.02, 0.35 if style != 0 else 0.5)
    # ingressive gasp
    gl = 0.28
    gasp = bp(r.standard_normal(int(gl * SR)), 700, 4500) * np.linspace(0, 1, int(gl * SR)) ** 2
    gasp = peak(gasp, r.uniform(1100, 1500), 3) + gasp * 0.4
    out = np.zeros(int(gl * SR) + n)
    place(out, gasp * 0.35, 0.0)
    place(out, y, gl + 0.03)
    return out


def _master(x, drive=1.4, peak_db=-0.5):
    x = np.tanh(x / (np.abs(x).max() + 1e-9) * drive)
    return norm(x, peak_db)


STING_PRE = 0.5  # seconds of lead-in before the hit in every sting_* file (the game schedules to it)


def sting_crawler(i):
    r = np.random.default_rng(300 + i)
    d = STING_PRE + 3.2
    x = np.zeros(int(d * SR))
    hit = impact(310 + i, size=1.0 + 0.15 * i, metal=0.7)
    low = strings(2.8, [r.choice([55, 58.3, 61.7]) * m for m in (1, 1.06, 1.5)], 0.008, 0.25, 0.3, 0.8, 0.1, 5, seed=320 + i, fade=0.9)
    high = strings(2.6, [r.uniform(700, 900) * m for m in (1, 1.059, 1.122, 1.414)], 0.005, 0.15, 0.25, 0.8, 0.5, 5, gliss=-0.08, seed=330 + i, fade=0.5)
    stab = mix(hit, low * 0.8, high * 0.55)
    place(x, reverse_swell(stab, STING_PRE) * 1.0, 0.0)
    place(x, stab, STING_PRE)
    return _master(x, 1.25)


def sting_watcher(i):
    r = np.random.default_rng(400 + i)
    d = 4.2
    x = np.zeros(int(d * SR))
    cl = strings(d, [r.uniform(900, 1100) * m for m in (1, 1.059, 1.189, 1.26)], 2.8, 0.1, 1.0, 0.6, 0.6, 6, gliss=0.05, tremolo=11 + i * 2, seed=410 + i)
    sub = np.sin(2 * np.pi * np.cumsum(np.linspace(31, 27, len(x))) / SR) * np.linspace(0, 1, len(x)) ** 2
    lo = strings(d, [r.choice([49, 51.9]) * m for m in (1, 1.414)], 3.0, 0.1, 1.0, 0.5, 0.2, 4, seed=420 + i)
    x += cl * 0.6 + sub * 0.5 + lo * 0.5
    thud = impact(430 + i, size=0.6, metal=0.2)
    place(x, thud * 0.5, d - 0.7)
    return _master(x, 1.2, -1.5)


def sting_smiler(i):
    r = np.random.default_rng(500 + i)
    d = STING_PRE + 3.0
    x = np.zeros(int(d * SR))
    inhale = hp(r.standard_normal(int(STING_PRE * SR)), 1800) * np.linspace(0, 1, int(STING_PRE * SR)) ** 3
    place(x, inhale * 0.6, 0.0)
    hit = impact(510 + i, size=0.8, metal=1.4)
    scr = strings(2.6, [r.uniform(1300, 1600) * m for m in (1, 1.059, 1.414)], 0.004, 0.15, 0.3, 0.8, 0.7, 5, gliss=-0.12, seed=520 + i, fade=0.6)
    place(x, mix(hit, scr * 0.6), STING_PRE)
    return _master(lp(x, 9000), 1.25)


def sting_mimic(i):
    r = np.random.default_rng(600 + i)
    d = STING_PRE + 3.0
    x = np.zeros(int(d * SR))
    b = breath_one("in", r, mouth=True, strength=1.0, voice=0.5)
    b = signal.resample(b, int(len(b) / 0.62))[::-1]
    b = b[-int(STING_PRE * SR):] if len(b) > STING_PRE * SR else b
    place(x, norm(b, -6), STING_PRE - len(b) / SR)
    hit = impact(610 + i, size=0.9, metal=0.5)
    cl = strings(2.6, [r.uniform(180, 220) * m for m in (1, 1.189, 1.414, 1.498)], 0.006, 0.3, 0.3, 0.9, 0.3, 5, seed=620 + i, fade=0.8)
    place(x, mix(hit, cl * 0.7), STING_PRE)
    return _master(x, 1.25)


def jumpscare(i):
    """The catch: a close, dry scream + huge hit + shrieking strings, then a hard cut to silence."""
    r = np.random.default_rng(700 + i)
    d = 3.2
    cut = 1.25
    x = np.zeros(int(d * SR))
    sc = scream(710 + i, style=[0, 2, 3, 0][i], d=1.4)
    sc = sc[int(0.28 * SR):]  # no gasp: it's in your face
    hit = impact(720 + i, size=1.3, metal=1.0)
    shriek = strings(cut, [r.uniform(1100, 1400) * m for m in (1, 1.059, 1.122, 1.414)], 0.003, 0.3, 0.8, 0.02, 0.6, 6, gliss=0.15, seed=730 + i)
    low = strings(cut, [r.choice([41.2, 43.7]) * m for m in (1, 1.06)], 0.003, 0.2, 0.6, 0.02, 0.2, 4, seed=740 + i)
    body = mix(hit * 1.1, sc * 1.2, shriek * 0.6, low * 0.6)
    body = _master(body, 2.2, -0.3)
    nc = int(cut * SR)
    body[nc - int(0.012 * SR):nc] *= np.linspace(1, 0, int(0.012 * SR))
    body[nc:] = 0
    place(x, body[: int(d * SR)], 0.0)
    ring = bp(r.standard_normal(int(1.8 * SR)), 3900, 4300, 2) * np.linspace(1, 0, int(1.8 * SR)) ** 2 * 0.03
    place(x, ring, cut + 0.35)
    return x


# ------------------------------------------------------------------ interactions & UI
def bottle_open():
    x = np.zeros(int(0.8 * SR))
    for k in range(18):
        place(x, hp(white(0.003), 2500) * env_exp(0.003, 0.0008), 0.02 + k * rng.uniform(0.01, 0.025))
    place(x, modal(0.1, [2200, 3400], [0.02, 0.01], [0.5, 0.3]), 0.42)
    return norm(x, -6)


def drink():
    x = np.zeros(int(2.4 * SR))
    for k in range(3):
        L = 0.35
        g = bp(white(L), 150, 900) * bell(int(L * SR), 0.3)
        g = peak(g, 300 + k * 30, 5) + g * 0.3
        place(x, g, 0.2 + k * 0.62)
        place(x, lp(white(0.08), 400) * env_exp(0.08, 0.02) * 0.8, 0.45 + k * 0.62)
    return norm(x, -4)


def ui_click():
    return norm(modal(0.06, [1800, 3600], [0.008, 0.004], [1, 0.4]), -10)


def ui_hover():
    return norm(modal(0.05, [1200], [0.006], [1]), -16)


def door_open():
    x = np.zeros(int(2.0 * SR))
    place(x, modal(0.2, [900, 1900, 3300], [0.03, 0.015, 0.008], [1, 0.5, 0.3]), 0.0)
    L = 1.1
    tt = t(L)
    rate = 20 + 50 * np.abs(np.sin(2 * np.pi * tt * 0.6))
    ph = np.cumsum(rate) / SR
    pulses = (np.diff(np.floor(ph), prepend=0) > 0).astype(float)
    cr = lp(pulses, 5000)
    cr = peak(cr, 520, 12) + peak(cr, 1250, 14) * 0.7 + peak(cr, 2100, 16) * 0.4
    place(x, cr * bell(len(tt), 0.5) * 2, 0.15)
    return norm(conv(x, OFFICE_IR, 0.3), -4)


def hatch_open():
    x = np.zeros(int(2.5 * SR))
    place(x, modal(0.6, [240, 560, 1320], [0.2, 0.1, 0.05], [1, 0.6, 0.3]), 0)
    place(x, door_open() * 0.6, 0.1)
    place(x, modal(1.0, [95, 210, 480], [0.3, 0.2, 0.1], [1, 0.6, 0.4]) * 1.2, 1.3)
    return norm(conv(x, BIG_IR, 0.3), -2)


def elevator_ding():
    x = modal(3.0, [1318, 1318 * 2.0, 1318 * 2.76, 1318 * 5.4], [1.0, 0.5, 0.3, 0.15], [1, 0.4, 0.3, 0.1])
    x2 = modal(3.0, [1046, 2092, 2887], [1.0, 0.5, 0.3], [1, 0.4, 0.3])
    y = np.zeros(int(3.6 * SR))
    place(y, x, 0)
    place(y, x2, 0.5)
    return norm(conv(y, OFFICE_IR, 0.3), -4)


def elevator_doors():
    d = 2.5
    tt = t(d)
    motor = (np.sin(2 * np.pi * np.cumsum(90 + 30 * bell(len(tt), 0.5)) / SR) * 0.4 + bp(white(d), 200, 1500) * 0.3) * bell(len(tt), 0.2)
    x = motor
    place(x, modal(0.4, [300, 800], [0.1, 0.05], [1, 0.5]), 2.2)
    return norm(conv(x, OFFICE_IR, 0.3), -4)


# ------------------------------------------------------------------ build
def main():
    print("footsteps")
    variants("step_carpet", lambda i: step_carpet(i), 8)
    variants("step_concrete", step_concrete, 8)
    variants("step_metal", step_metal, 8)
    variants("step_water", step_water, 6)
    for k in ("carpet", "concrete", "metal"):
        write(f"land_{k}", land(k))
    variants("cloth", cloth, 5)
    print("body")
    r = np.random.default_rng(77)
    for i in range(8):
        write(f"breath_in_{i}", norm(breath_one("in", r, mouth=True, strength=r.uniform(0.7, 1.0)), -3))
        write(f"breath_out_{i}", norm(breath_one("out", r, mouth=True, strength=r.uniform(0.7, 1.0)), -3))
    for i in range(6):
        write(f"breath_panic_{i}", norm(breath_one("out", r, mouth=True, strength=1.0, voice=0.6), -3))
    write("heartbeat", heartbeat())
    write("tinnitus", tinnitus(), loop=True)
    print("electrical")
    variants("tube_flicker", tube_flicker, 4)
    write("ballast_click", ballast_click())
    write("power_down", power_down())
    write("power_up", power_up())
    variants("spark", spark, 4)
    write("outlet_buzz", outlet_buzz(), loop=True)
    write("hum", hum_loop(), loop=True)
    print("ambience")
    write("amb_l0", amb_l0(), loop=True)
    write("amb_l1", amb_l1(), loop=True)
    write("amb_l2", amb_l2(), loop=True)
    print("distant")
    variants("knock", knock, 3)
    write("slam", slam())
    variants("howl", howl, 2)
    write("running", running_steps())
    variants("pipe_groan", pipe_groan, 3)
    write("steam_hiss", steam_hiss())
    variants("drip", drip, 4)
    print("entities")
    variants("crawler_click", crawler_click, 4)
    write("crawler_rasp", crawler_rasp(), loop=True)
    for i in range(4):
        write(f"crawler_scream_{i}", norm(conv(scream(800 + i, style=i, d=[1.7, 2.0, 1.6, 2.1][i]), OFFICE_IR, 0.3), -1))
    variants("crawler_step", crawler_step, 4)
    write("watcher_drone", drone([36.7, 55.0, 73.4, 36.9], 20, 0.15, 0, 200), loop=True)
    write("smiler_drone", drone([55, 58.3, 61.7, 110.5], 15, 0.3, 200, 600), loop=True)
    write("smiler_hiss", smiler_hiss())
    variants("dweller_knock", dweller_knock, 3)
    write("dweller_groan", dweller_groan())
    print("scares")
    variants("sting_crawler", sting_crawler, 3)
    variants("sting_watcher", sting_watcher, 3)
    variants("sting_smiler", sting_smiler, 3)
    variants("sting_mimic", sting_mimic, 2)
    variants("jumpscare", jumpscare, 4)
    print("interaction")
    write("bottle_open", bottle_open())
    write("drink", drink())
    write("ui_click", ui_click())
    write("ui_hover", ui_hover())
    write("door_open", door_open())
    write("hatch_open", hatch_open())
    write("elevator_ding", elevator_ding())
    write("elevator_doors", elevator_doors())
    print("impulse responses")
    write("ir_l0", ir(1.4, 0.6, seed=21, early=[(0.004, 0.6), (0.0075, 0.5), (0.012, 0.35), (0.019, 0.3), (0.027, 0.2)]) * 0.9, loop=True, stereo=True)
    write("ir_l1", ir(4.5, 3.4, seed=22, early=[(0.021, 0.5), (0.047, 0.35), (0.09, 0.3), (0.13, 0.2)]) * 0.9, loop=True, stereo=True)
    l2 = ir(2.4, 1.5, seed=23, early=[(0.003, 0.7), (0.006, 0.6), (0.009, 0.5), (0.012, 0.45), (0.015, 0.4), (0.018, 0.35)])
    for c in range(2):
        l2[:, c] += peak(l2[:, c], 740, 30) * 0.3 + peak(l2[:, c], 1480, 40) * 0.2
    write("ir_l2", l2 / np.abs(l2).max() * 0.9, loop=True, stereo=True)
    (OUT / "manifest.json").write_text(json.dumps(MANIFEST, indent=1))
    print(f"{sum(len(v) for v in MANIFEST.values())} sounds")


if __name__ == "__main__":
    main()
