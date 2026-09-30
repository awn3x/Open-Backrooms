"""Level 1 (concrete habitable zone) and Level 2 (pipe dreams) textures."""
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
from texlib import *  # noqa

OUT = Path(__file__).resolve().parents[2] / "public" / "assets" / "textures"
N = 2048


def grid(n):
    ys, xs = np.mgrid[0:n, 0:n]
    return xs / n, ys / n


def concrete_wall():
    """2.4 m tile, formwork panels 1.2 x 0.6 m with tie holes."""
    seed(51)
    u, v = grid(N)
    X, Y = u * 2.4, v * 2.4
    px = 2.4 / N
    # panel seams
    sx = np.minimum(X % 1.2, 1.2 - X % 1.2)
    sy = np.minimum(Y % 0.6, 0.6 - Y % 0.6)
    seam = 1 - smoothstep(0.0, 0.004, np.minimum(sx, sy))
    # tie holes at 0.3 m inset positions
    hx = np.minimum((X - 0.3) % 0.6, 0.6 - (X - 0.3) % 0.6)
    hy = np.minimum((Y - 0.3) % 0.6, 0.6 - (Y - 0.3) % 0.6)
    hd = np.sqrt(hx ** 2 + hy ** 2)
    hole = 1 - smoothstep(0.011, 0.011 + px * 2, hd)
    ring = (1 - smoothstep(0.018, 0.024, hd)) * (1 - hole)
    pits = smoothstep(0.86, 0.95, fft_noise(N, 120, 500, 0.0))
    big = fbm(N, 3, 6)
    mid = fbm(N, 24, 5)
    streak = fft_noise(N, 4, 60, 0.9, aniso=(1.0, 0.05))
    # panel-to-panel tone difference (each pour panel slightly different)
    pid = (np.floor(X / 1.2) * 7 + np.floor(Y / 0.6) * 13) % 5
    ptone = 0.96 + 0.02 * pid
    base = srgb([0.56, 0.55, 0.52])
    col = np.ones((N, N, 3)) * base
    col *= (0.9 + 0.12 * big[..., None]) * (0.96 + 0.06 * mid[..., None]) * ptone[..., None]
    col = lerp(col, col * srgb([0.8, 0.78, 0.72]), smoothstep(0.55, 0.9, streak) * 0.5)
    col = lerp(col, srgb([0.78, 0.78, 0.74]), smoothstep(0.7, 0.95, big) * 0.2)  # efflorescence
    col *= (1 - 0.4 * seam[..., None]) * (1 - 0.5 * pits[..., None])
    col = lerp(col, srgb([0.12, 0.11, 0.1]), hole)
    col *= (1 - 0.15 * ring[..., None])
    h = 0.5 + 0.1 * mid + 0.05 * big - 0.3 * pits - 0.25 * seam - 0.5 * hole + 0.05 * ring
    rough = np.clip(0.88 + 0.08 * mid - 0.1 * smoothstep(0.55, 0.9, streak), 0, 1)
    save_set(OUT, "l1_wall", col, height_to_normal(h, 5.0), rough, ao_from_height(h, 4, 1.5))


def concrete_floor():
    """2 m tile, troweled slab with a control joint along the edges, cracks, stains."""
    seed(61)
    u, v = grid(N)
    X, Y = u * 2.0, v * 2.0
    edge = np.minimum(np.minimum(X, 2 - X), np.minimum(Y, 2 - Y))
    joint = 1 - smoothstep(0.0, 0.005, edge)
    big = fbm(N, 2, 6)
    mid = fbm(N, 16, 5)
    fine = fft_noise(N, 200, 800, 0.0)
    trowel = fft_noise(N, 6, 40, 1.0, aniso=(0.3, 1.0))
    stains = smoothstep(0.6, 0.85, fbm(N, 4, 5))
    oil = smoothstep(0.75, 0.9, fbm(N, 3, 4))
    # crack network: ridge lines of low-frequency noise
    cr = fft_noise(N, 3, 12, 0.8)
    crack = (1 - smoothstep(0.0, 0.006, np.abs(cr - 0.5))) * smoothstep(0.45, 0.7, fbm(N, 4, 3))
    base = srgb([0.47, 0.46, 0.43])
    col = np.ones((N, N, 3)) * base
    col *= (0.82 + 0.25 * big[..., None]) * (0.96 + 0.06 * mid[..., None]) * (0.97 + 0.04 * fine[..., None])
    col *= (0.97 + 0.05 * trowel[..., None])
    col = lerp(col, col * srgb([0.85, 0.83, 0.78]), stains * 0.35)
    col = lerp(col, col * 0.8, oil * 0.35)
    col *= (1 - 0.55 * np.maximum(crack, joint)[..., None])
    h = 0.5 + 0.05 * mid + 0.03 * fine - 0.4 * crack - 0.5 * joint
    rough = np.clip(0.62 + 0.18 * mid - 0.15 * trowel + 0.1 * stains - 0.25 * oil, 0.2, 1)
    save_set(OUT, "l1_floor", col, height_to_normal(h, 4.0), rough, ao_from_height(h, 3, 1.2))


def pipe_metal():
    """1 m tile of painted, chipped, rusty steel. Albedo tinted in-shader per pipe."""
    seed(71)
    u, v = grid(N)
    big = fbm(N, 3, 6)
    mid = fbm(N, 20, 5)
    chips = smoothstep(0.72, 0.76, fbm(N, 48, 5)) * smoothstep(0.45, 0.7, big)
    rust_bloom = np.clip(blur(chips, 3) * 1.5, 0, 1) * 0.8
    streak = smoothstep(0.5, 0.9, fft_noise(N, 4, 50, 0.8, aniso=(0.05, 1.0)))
    paint = srgb([0.80, 0.80, 0.78])  # neutral, tinted by the material colour
    rust = srgb([0.36, 0.19, 0.09])
    steel = srgb([0.42, 0.40, 0.38])
    col = np.ones((N, N, 3)) * paint * (0.9 + 0.1 * mid[..., None])
    col = lerp(col, col * srgb([0.75, 0.62, 0.5]), streak * 0.5)
    col = lerp(col, rust * (0.8 + 0.4 * mid[..., None]), np.clip(rust_bloom * 0.6 + chips * 0.8, 0, 1))
    col *= (0.9 + 0.1 * fbm(N, 16, 4)[..., None])  # grime
    exposed = chips * smoothstep(0.4, 0.6, mid)
    col = lerp(col, steel, exposed * 0.6)
    h = 0.6 - 0.25 * chips + 0.08 * mid * rust_bloom
    rough = np.clip(0.55 + 0.35 * rust_bloom + 0.1 * mid - 0.2 * exposed, 0, 1)
    metal = np.clip(exposed * 0.8, 0, 1)
    # albedo alpha channel = paint mask so the shader can tint paint only
    save_set(OUT, "l2_pipe", col, height_to_normal(h, 4.0), rough, ao_from_height(h, 3, 1.0), metal)


def block_wall():
    """1.6 m tile of painted concrete block (400 x 200 mm)."""
    seed(81)
    u, v = grid(N)
    X, Y = u * 1.6, v * 1.6
    row = np.floor(Y / 0.2)
    Xo = X + (row % 2) * 0.2
    jx = np.minimum(Xo % 0.4, 0.4 - Xo % 0.4)
    jy = np.minimum(Y % 0.2, 0.2 - Y % 0.2)
    joint = 1 - smoothstep(0.004, 0.008, np.minimum(jx, jy))
    bid = (np.floor(Xo / 0.4) * 17 + row * 31) % 7
    btone = 0.95 + 0.015 * bid
    pits = smoothstep(0.8, 0.92, fft_noise(N, 150, 600, 0.0))
    mid = fbm(N, 20, 5)
    big = fbm(N, 2, 5)
    drip = smoothstep(0.55, 0.9, fft_noise(N, 4, 60, 0.9, aniso=(1.0, 0.05)))
    base = srgb([0.62, 0.61, 0.56])
    col = np.ones((N, N, 3)) * base * btone[..., None]
    col *= (0.93 + 0.1 * mid[..., None]) * (0.8 + 0.25 * big[..., None])
    col = lerp(col, col * srgb([0.6, 0.5, 0.38]), drip * 0.5 * smoothstep(0.3, 0.8, big))
    col *= (1 - 0.35 * joint[..., None]) * (1 - 0.3 * pits[..., None])
    h = 0.6 + 0.05 * mid - 0.35 * joint - 0.2 * pits
    rough = np.clip(0.8 + 0.1 * mid - 0.15 * drip, 0, 1)
    save_set(OUT, "l2_wall", col, height_to_normal(h, 5.0), rough, ao_from_height(h, 4, 1.4))


def grate_floor():
    """1 m tile of worn diamond plate steel."""
    seed(91)
    u, v = grid(N)
    X, Y = u * 1.0, v * 1.0
    p = 0.03
    # diamond plate: alternating oriented lozenges
    cx = np.floor(X / p)
    cy = np.floor(Y / p)
    fx = (X / p) % 1 - 0.5
    fy = (Y / p) % 1 - 0.5
    alt = ((cx + cy) % 2) * 2 - 1
    ax = (fx + fy * alt) * 0.7071
    ay = (fy - fx * alt) * 0.7071
    lozenge = 1 - smoothstep(0.9, 1.1, (ax / 0.34) ** 2 + (ay / 0.08) ** 2)
    wear = fbm(N, 6, 5)
    rust = smoothstep(0.62, 0.85, fbm(N, 10, 6)) * 0.6
    grime = fbm(N, 30, 4)
    col = np.ones((N, N, 3)) * srgb([0.45, 0.44, 0.42]) * (0.85 + 0.2 * grime[..., None])
    col = lerp(col, srgb([0.62, 0.61, 0.58]), lozenge * (0.35 + 0.5 * smoothstep(0.4, 0.8, wear)))
    col = lerp(col, srgb([0.33, 0.18, 0.09]) * (0.8 + 0.3 * grime[..., None]), rust * 0.85)
    h = 0.4 + 0.5 * lozenge - 0.05 * rust
    rough = np.clip(0.45 + 0.4 * rust + 0.1 * grime - 0.2 * lozenge * wear, 0, 1)
    metal = np.clip(0.9 - rust, 0, 1)
    save_set(OUT, "l2_floor", col, height_to_normal(h, 5.0), rough, ao_from_height(h, 3, 1.2), metal)


if __name__ == "__main__":
    concrete_wall()
    concrete_floor()
    pipe_metal()
    block_wall()
    grate_floor()
    print("L1/L2 textures done")
