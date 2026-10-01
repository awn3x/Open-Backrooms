"""YAMNet (AudioSet) critic used to tune synthesis: score(x) -> per-class max-frame scores.
See eval_yamnet.py for setup."""
import csv
import os
import sys
from pathlib import Path

import numpy as np
from scipy import signal

Y = Path(os.environ.get("YAMNET", Path.home() / "yamnet"))
sys.path.insert(0, str(Y))
import params as yparams  # noqa: E402
import yamnet as ynet  # noqa: E402

_P = yparams.Params()
_M = ynet.yamnet_frames_model(_P)
_M.load_weights(str(Y / "yamnet.h5"))
NAMES = [r["display_name"] for r in csv.DictReader(open(Y / "yamnet_class_map.csv"))]
IDX = {n: i for i, n in enumerate(NAMES)}


def scores(x, sr=44100):
    x = np.asarray(x, np.float32)
    if sr != 16000:
        x = signal.resample_poly(x, 160, 441).astype(np.float32)
    x = x / (np.abs(x).max() + 1e-9) * 0.9
    x = np.concatenate([x, np.zeros(8000, np.float32)])
    s, _, _ = _M(x)
    return np.asarray(s)


def target(x, want, avoid=(), sr=44100, agg="max"):
    """Fitness: best target-class score minus the worst of the classes to avoid."""
    s = scores(x, sr)
    s = s.max(0) if agg == "max" else np.sort(s, 0)[-3:].mean(0)
    w = max(s[IDX[c]] for c in want)
    a = max((s[IDX[c]] for c in avoid), default=0.0)
    return float(w - 0.5 * a), s


def top(s, k=4):
    i = np.argsort(s)[::-1][:k]
    return ", ".join(f"{NAMES[j]} {s[j]:.2f}" for j in i)
