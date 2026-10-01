"""Tune synthesis parameters against the YAMNet critic (evolutionary search).
Run with the TensorFlow venv: YAMNET=~/yamnet ~/venv/tf/bin/python tools/audio/tune.py scream
Prints the best parameter presets to paste into build_audio.py."""
import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
import build_audio as B  # noqa: E402
import critic as C  # noqa: E402

BAD_VOICE = ["Siren", "Emergency vehicle", "Civil defense siren", "Vehicle", "Chainsaw", "Whistle", "Music", "Sine wave", "Alarm", "Steam whistle", "Power tool", "Engine", "Buzzer", "Bird vocalization, bird call, bird song"]


def search(make, ranges, want, avoid, n0=60, rounds=4, pop=24, seed=0, keep=3):
    r = np.random.default_rng(seed)
    keys = list(ranges)

    def rand():
        return {k: float(r.uniform(*ranges[k])) for k in keys}

    def mutate(p, sc):
        q = dict(p)
        for k in keys:
            if r.random() < 0.5:
                lo, hi = ranges[k]
                q[k] = float(np.clip(q[k] + r.normal(0, (hi - lo) * sc), lo, hi))
        return q

    def fit(p):
        vals = []
        for s in (1, 2):  # two random seeds so a lucky take doesn't win
            f, _ = C.target(make(p, s), want, avoid)
            vals.append(f)
        return float(np.mean(vals))

    pool = [(fit(p), p) for p in (rand() for _ in range(n0))]
    pool.sort(key=lambda t: -t[0])
    for rd in range(rounds):
        parents = pool[:6]
        kids = [mutate(parents[i % len(parents)][1], 0.15 / (rd + 1)) for i in range(pop)]
        pool = sorted(pool[:12] + [(fit(p), p) for p in kids], key=lambda t: -t[0])
        print(f"  round {rd}: best {pool[0][0]:.3f}", flush=True)
    return pool[:keep]


def main():
    what = sys.argv[1]
    out = {}
    if what == "scream":
        R = dict(f0a=(200, 700), f0b=(350, 1400), rise=(0.05, 0.4), fall=(0.1, 0.6), vib_r=(3, 9), vib_d=(0, 0.12),
                 jit=(0, 0.1), fjit=(0, 0.06), sub=(0, 0.8), am_f=(20, 160), am_d=(0, 0.9), chaos=(0, 8), breath=(0.1, 1.5),
                 fs=(0.8, 1.3), q=(1, 5), drive=(1, 6), vowel=(0, 1))
        B.SCREAM_PRESETS[:] = [{}]
        mk = lambda p, s: B.scream(900 + s, 0, 1.6, **p)
        best = search(mk, R, ["Screaming"], BAD_VOICE, seed=1)
        R2 = dict(R, f0a=(80, 200), f0b=(120, 320), sub=(0.3, 1.0), drive=(3, 8))
        roar = search(mk, R2, ["Roar", "Growling", "Screaming"], BAD_VOICE, seed=2, keep=1)
        for f, p in best + roar:
            _, s = C.target(mk(p, 7), ["Screaming"], [])
            print(f"{f:.3f}", C.top(s))
        out = [p for _, p in best + roar]
    if what == "sting":
        R = dict(hit=(0.3, 1.3), size=(0.6, 1.6), metal=(0.0, 1.0), lo=(40, 90), lo_n=(2, 4), lo_g=(0.2, 1.2), lo_p=(0, 0.6),
                 hi=(300, 1600), hi_n=(2, 5), hi_step=(1, 2), hi_g=(0.2, 1.2), hi_p=(0, 1.0), gliss=(-0.15, 0.15), trem=(0, 14),
                 hi_fade=(0.3, 1.5), attack=(0.002, 0.05), swell=(0.3, 1.5), drive=(1.0, 2.0))
        avoid = ["Tubular bells", "Ding", "Jingle, tinkle", "Bell", "Church bell", "Chime", "Wind chime", "Television", "Harmonica", "Telephone", "Beep, bleep", "Siren", "Guitar"]
        mk = lambda p, s: B.sting_param(1000 + s, **p)
        best = search(mk, R, ["Scary music"], avoid, seed=3, keep=4)
        Rc = dict(R, hi=(500, 1400), trem=(4, 16))
        mkc = lambda p, s: B.sting_param(1100 + s, crescendo=True, **p)
        cres = search(mkc, Rc, ["Scary music"], avoid, seed=4, keep=1)
        for f, p in best:
            _, s = C.target(mk(p, 7), ["Scary music"], [])
            print(f"{f:.3f}", C.top(s))
        for f, p in cres:
            _, s = C.target(mkc(p, 7), ["Scary music"], [])
            print(f"crescendo {f:.3f}", C.top(s))
        out = {"hit": [p for _, p in best], "crescendo": [p for _, p in cres]}
    if what == "jumpscare":
        out = []
        for i in range(4):
            best = max(((C.target(B.jumpscare(i, sd), ["Screaming"], BAD_VOICE + ["Cat", "Meow", "Baby cry, infant cry", "Crying, sobbing"])[0], sd) for sd in range(1000 + i * 100, 1000 + i * 100 + 12)))
            print(i, best, flush=True)
            out.append(best[1])
    print(json.dumps(out, indent=None))


if __name__ == "__main__":
    main()
