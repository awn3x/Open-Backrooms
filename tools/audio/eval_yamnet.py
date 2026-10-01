"""Check generated sounds with Google's YAMNet AudioSet classifier (521 classes).

For each sound we report what the classifier thinks it hears (top classes, max over
0.96 s frames) and the score of the classes it *should* be heard as. A sound that the
classifier can't place is usually one a person won't believe either.

Setup (separate venv, TensorFlow):
  python -m venv ~/venv/tf && ~/venv/tf/bin/pip install tensorflow-cpu soundfile resampy
  mkdir ~/yamnet && cd ~/yamnet  # yamnet.py params.py features.py yamnet_class_map.csv from
  # github.com/tensorflow/models/tree/master/research/audioset/yamnet, weights from
  # https://storage.googleapis.com/audioset/yamnet.h5
Run: YAMNET=~/yamnet ~/venv/tf/bin/python tools/audio/eval_yamnet.py [glob ...]
"""
import csv
import fnmatch
import os
import sys
from pathlib import Path

import numpy as np
import resampy
import soundfile as sf

Y = Path(os.environ.get("YAMNET", Path.home() / "yamnet"))
sys.path.insert(0, str(Y))
import params as yparams  # noqa: E402
import yamnet as ynet  # noqa: E402

WAV = Path(__file__).resolve().parents[2] / "tools" / "out" / "wav"

# what each sound is supposed to be (any of these classes counts)
EXPECT = {
    "crawler_scream": ["Screaming", "Yell", "Roar", "Growling", "Howl", "Shout"],
    "jumpscare": ["Screaming", "Scary music", "Bang", "Slam", "Thump, thud", "Yell", "Roar"],
    "sting_crawler": ["Scary music", "Bang", "Slam", "Thump, thud", "Orchestra", "String section", "Bowed string instrument", "Music"],
    "sting_watcher": ["Scary music", "String section", "Bowed string instrument", "Violin, fiddle", "Orchestra", "Music"],
    "sting_smiler": ["Scary music", "Bang", "Clang", "Hiss", "String section", "Music"],
    "sting_mimic": ["Scary music", "Bang", "Thump, thud", "Breathing", "Music"],
    "step_carpet": ["Walk, footsteps"],
    "step_concrete": ["Walk, footsteps"],
    "step_metal": ["Walk, footsteps", "Clang"],
    "breath_in": ["Breathing", "Gasp", "Pant"],
    "breath_out": ["Breathing", "Pant", "Sigh"],
    "breath_panic": ["Breathing", "Pant", "Gasp"],
    "heartbeat": ["Heart sounds, heartbeat"],
    "hum": ["Hum", "Mains hum", "Buzz"],
    "crawler_click": ["Clicking", "Tick", "Crack"],
    "knock": ["Knock"],
    "slam": ["Slam", "Door", "Bang"],
    "drip": ["Drip"],
    "smiler_hiss": ["Hiss"],
    "door_open": ["Door"],
}


def main():
    p = yparams.Params()
    model = ynet.yamnet_frames_model(p)
    model.load_weights(str(Y / "yamnet.h5"))
    names = [r["display_name"] for r in csv.DictReader(open(Y / "yamnet_class_map.csv"))]
    idx = {n: i for i, n in enumerate(names)}
    pats = sys.argv[1:] or [k + "*" for k in EXPECT]
    rows = []
    for f in sorted(WAV.glob("*.wav")):
        if not any(fnmatch.fnmatch(f.stem, pt) for pt in pats):
            continue
        x, sr = sf.read(f, dtype="float32")
        if x.ndim > 1:
            x = x.mean(1)
        if sr != p.sample_rate:
            x = resampy.resample(x, sr, p.sample_rate)
        x = np.concatenate([x, np.zeros(int(p.sample_rate * 0.5), np.float32)])
        scores, _, _ = model(x)
        s = np.asarray(scores).max(0)
        top = np.argsort(s)[::-1][:4]
        key = next((k for k in EXPECT if f.stem.startswith(k)), None)
        want = EXPECT.get(key, [])
        best = max(((s[idx[w]], w) for w in want if w in idx), default=(0.0, "-"))
        rank = min((int(np.where(np.argsort(s)[::-1] == idx[w])[0][0]) + 1 for w in want if w in idx), default=999)
        rows.append((f.stem, best, rank))
        tops = ", ".join(f"{names[i]} {s[i]:.2f}" for i in top)
        print(f"{f.stem:20s} want {best[1]:22s} {best[0]:.2f} (rank {rank:3d}) | hears: {tops}")
    ok = sum(1 for _, (sc, _), rk in rows if rk <= 3 or sc >= 0.3)
    print(f"\n{ok}/{len(rows)} sounds recognised as intended (target class in top 3 or score >= 0.30)")


if __name__ == "__main__":
    main()
