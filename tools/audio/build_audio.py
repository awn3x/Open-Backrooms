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
def step_carpet(i, run=False):
    d = 0.45
    x = np.zeros(int(d * SR))
    # heel: dull low thump through carpet + pad
    th = lp(white(0.08), 260 + rng.uniform(-40, 60), 3) * env_exp(0.08, 0.018, 0.002)
    body = np.sin(2 * np.pi * rng.uniform(62, 85) * t(0.12)) * env_exp(0.12, 0.03, 0.003) * 0.6
    place(x, th * 1.2, 0.005)
    place(x, body, 0.005)
    # fibre scrunch
    fib = bp(white(0.14), 1200, 7000) * bell(int(0.14 * SR), 0.25) * 0.10
    place(x, fib, 0.012)
    # damp squelch: mid band with bubbly modulation
    sq = bp(white(0.2), 250, 1100) * bell(int(0.2 * SR), 0.2) * (0.5 + 0.5 * np.abs(np.sin(2 * np.pi * rng.uniform(25, 45) * t(0.2)))) * 0.28
    place(x, sq, 0.03)
    for _ in range(rng.integers(1, 4)):
        f0 = rng.uniform(900, 2400)
        bub = np.sin(2 * np.pi * np.cumsum(np.linspace(f0, f0 * 1.4, int(0.012 * SR))) / SR) * env_exp(0.012, 0.004)
        place(x, bub * 0.05, rng.uniform(0.04, 0.14))
    # toe roll-off
    toe = lp(white(0.06), 400) * env_exp(0.06, 0.012, 0.004) * 0.5
    place(x, toe, rng.uniform(0.09, 0.14) * (0.6 if run else 1.0))
    place(x, bp(white(0.1), 1500, 6000) * bell(int(0.1 * SR), 0.3) * 0.06, 0.13)
    return norm(x, -3 if run else -6)


def step_concrete(i):
    d = 0.4
    x = np.zeros(int(d * SR))
    click = hp(white(0.006), 1800) * env_exp(0.006, 0.0012) * 0.5
    body = modal(0.15, [rng.uniform(140, 190), rng.uniform(300, 420), rng.uniform(700, 900)], [0.03, 0.018, 0.01], [0.6, 0.35, 0.2])
    thump = lp(white(0.05), 300) * env_exp(0.05, 0.012) * 0.8
    place(x, click, 0.002)
    place(x, body, 0.002)
    place(x, thump, 0.002)
    # grit
    g = (rng.random(int(0.12 * SR)) < 0.004) * rng.standard_normal(int(0.12 * SR))
    place(x, hp(g, 3000) * 0.4 * bell(len(g), 0.1), 0.02)
    toe = hp(white(0.005), 1500) * env_exp(0.005, 0.001) * 0.25
    place(x, toe, rng.uniform(0.08, 0.12))
    place(x, modal(0.08, [rng.uniform(200, 260)], [0.015], [0.3]), rng.uniform(0.08, 0.12))
    return norm(conv(x, OFFICE_IR, 0.12), -6)


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
    d = 0.6
    x = np.zeros(int(d * SR))
    spl = bp(white(0.2), 700, 6000) * env_exp(0.2, 0.05, 0.004) * 0.6
    place(x, spl, 0.0)
    place(x, lp(white(0.06), 300) * env_exp(0.06, 0.015), 0.0)
    for _ in range(rng.integers(4, 9)):
        f0 = rng.uniform(500, 1800)
        L = rng.uniform(0.01, 0.03)
        bub = np.sin(2 * np.pi * np.cumsum(np.linspace(f0, f0 * rng.uniform(1.3, 2.0), int(L * SR))) / SR) * env_exp(L, L / 3)
        place(x, bub * rng.uniform(0.1, 0.25), rng.uniform(0.01, 0.3))
    place(x, bp(white(0.25), 400, 3000) * bell(int(0.25 * SR), 0.2) * 0.25, rng.uniform(0.12, 0.2))
    return norm(x, -6)


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
def breath_cycle(inhale, exhale, pause, voice=0.0, mouth=False, gain=1.0):
    ni, ne = int(inhale * SR), int(exhale * SR)
    inh = bp(white(inhale), 900 if not mouth else 600, 5500) * bell(ni, 0.7)
    inh = peak(inh, 2600, 3) * 0.6 + inh
    exh = bp(white(exhale), 250 if mouth else 400, 3500) * bell(ne, 0.25)
    for f, g in ((650, 1.0), (1150, 0.7), (2400, 0.4)) if mouth else ((900, 0.6), (1800, 0.5), (3000, 0.3)):
        exh += peak(exh, f, 4) * g * 0.4
    if voice > 0:
        f0 = 170 + rng.uniform(-20, 20)
        ph = np.cumsum(f0 * (1 + 0.03 * np.sin(2 * np.pi * 5 * t(exhale))) + rng.standard_normal(ne) * 4) / SR
        v = signal.sawtooth(2 * np.pi * ph) * bell(ne, 0.3) * voice
        v = peak(lp(v, 1600), 550, 3) + peak(lp(v, 1600), 950, 4) * 0.5
        exh += v * 0.4
    x = np.concatenate([inh * 0.55, np.zeros(int(0.05 * SR)), exh, np.zeros(int(pause * SR))])
    return x * gain


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
    """Fluorescent tube hum for the positional light field (loop)."""
    d = 6.0
    tt = t(d)
    x = np.zeros_like(tt)
    for h, a in ((1, 1.0), (2, 0.55), (3, 0.35), (4, 0.18), (5, 0.12), (7, 0.06), (9, 0.04)):
        x += a * np.sin(2 * np.pi * 120 * h * tt + rng.uniform(0, 6))
    x *= 1 + 0.05 * np.sin(2 * np.pi * 0.5 * tt)
    whine = np.sin(2 * np.pi * 15600 * tt) * 0.01
    hiss = hp(white(d), 5000) * 0.02
    return norm(x * 0.5 + whine + hiss, -6)


# ------------------------------------------------------------------ ambience
def amb_l0():
    d = 30
    tt = t(d)
    air = lp(pink(d), 380, 3) * 0.6
    rumble = lp(brown(d), 60) * 0.5
    x = air + rumble + hp(white(d), 6000) * 0.008
    x *= 1 + 0.12 * lp(white(d), 0.3) * 20
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
    d = 8
    tt = t(d)
    rate = 38 + 12 * np.sin(2 * np.pi * tt / 3.1) + rng.standard_normal(len(tt)) * 3
    ph = np.cumsum(rate) / SR
    pulses = (np.diff(np.floor(ph), prepend=0) > 0).astype(float) * (0.5 + rng.random(len(tt)))
    src = lp(pulses, 3000) + white(d) * 0.08
    breath = 0.5 + 0.5 * np.sin(2 * np.pi * tt / 1.7)
    x = (peak(src, 450, 5) + peak(src, 1100, 6) * 0.6 + peak(src, 2600, 8) * 0.3) * breath
    x = np.tanh(x * 2)
    return norm(loopify(x, 0.4), -6)


def crawler_scream():
    d = 1.8
    tt = t(d)
    x = np.zeros_like(tt)
    for k in range(5):
        f = (300 + 700 * np.clip(tt / 0.4, 0, 1)) * rng.uniform(0.96, 1.04) * (1 + 0.04 * np.sin(2 * np.pi * rng.uniform(6, 11) * tt))
        x += signal.sawtooth(2 * np.pi * np.cumsum(f) / SR)
    x += white(d) * 1.5
    x = peak(x, 2800, 3) + peak(x, 3600, 5) * 0.7 + hp(x, 1500) * 0.3
    x = np.tanh(x * 1.5) * env_ar(len(tt), 0.02, 0.8)
    return norm(conv(x, OFFICE_IR, 0.3), -1)


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


def sting(kind):
    d = 3.0
    tt = t(d)
    x = np.zeros_like(tt)
    if kind == "spot":
        for f in (110, 116.5, 155, 233, 247):
            x += signal.sawtooth(2 * np.pi * f * tt) * 0.3
        x = lp(x, 2500) * env_exp(d, 0.9, 0.005)
        x += np.sin(2 * np.pi * np.cumsum(np.linspace(80, 30, len(tt))) / SR) * env_exp(d, 0.6) * 1.2
        scr = np.sin(2 * np.pi * np.cumsum(np.linspace(2600, 3400, len(tt))) / SR) * env_exp(d, 0.5) * 0.15
        x += scr
    else:  # chase pulse
        for k in range(8):
            p = np.sin(2 * np.pi * 45 * t(0.3)) * env_exp(0.3, 0.08) + lp(white(0.3), 150) * env_exp(0.3, 0.04)
            place(x, p, k * 0.375)
        x += signal.sawtooth(2 * np.pi * np.cumsum(np.linspace(220, 330, len(tt))) / SR) * 0.08 * np.clip(tt / d, 0, 1)
    return norm(conv(x, BIG_IR, 0.3), -1)


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


def vhs_insert():
    x = np.zeros(int(2.2 * SR))
    place(x, modal(0.3, [220, 900, 2400], [0.05, 0.03, 0.01], [1, 0.5, 0.3]), 0.0)
    place(x, modal(0.3, [180, 700], [0.06, 0.02], [1, 0.4]), 0.35)
    tt = t(1.4)
    whir = (np.sin(2 * np.pi * np.cumsum(60 + 40 * np.clip(tt * 3, 0, 1)) / SR) * 0.3 + bp(white(1.4), 400, 2000) * 0.2) * env_ar(len(tt), 0.1, 0.4)
    place(x, whir, 0.6)
    return norm(x, -6)


def static_burst():
    d = 0.9
    x = white(d) * env_ar(int(d * SR), 0.005, 0.5)
    sweep = np.linspace(4000, 800, len(x))
    x = hp(x, 400) * 0.7 + lp(x, 3000) * 0.3
    return norm(x * (0.7 + 0.3 * np.sign(np.sin(2 * np.pi * 60 * t(d)))), -3)


def death():
    d = 3.0
    x = white(d) * env_ar(int(d * SR), 0.005, 1.5)
    place(x, crawler_scream() * 0.8, 0.0)
    tt = t(1.5)
    tape = np.sin(2 * np.pi * np.cumsum(np.linspace(200, 20, len(tt))) / SR) * 0.6
    place(x, tape, 1.3)
    return norm(np.tanh(x * 2), -1)


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
    for k in ("calm", "tired", "panic"):
        write(f"breath_{k}", breath_loop(k), loop=True)
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
    write("tape_hiss", tape_hiss(), loop=True)
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
    write("crawler_scream", crawler_scream())
    variants("crawler_step", crawler_step, 4)
    write("watcher_drone", drone([36.7, 55.0, 73.4, 36.9], 20, 0.15, 0, 200), loop=True)
    write("smiler_drone", drone([55, 58.3, 61.7, 110.5], 15, 0.3, 200, 600), loop=True)
    write("smiler_hiss", smiler_hiss())
    variants("dweller_knock", dweller_knock, 3)
    write("dweller_groan", dweller_groan())
    write("sting_spot", sting("spot"))
    write("sting_chase", sting("chase"))
    print("interaction")
    write("bottle_open", bottle_open())
    write("drink", drink())
    write("ui_click", ui_click())
    write("ui_hover", ui_hover())
    write("vhs_insert", vhs_insert())
    write("static_burst", static_burst())
    write("death", death())
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
