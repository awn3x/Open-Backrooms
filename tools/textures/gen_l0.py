"""Level 0 textures: wallpaper, carpet, ceiling tile atlas, troffer lens, decal atlas."""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).parent))
from texlib import *  # noqa

OUT = Path(__file__).resolve().parents[2] / "public" / "assets" / "textures"
N = 2048


def grid(n):
    ys, xs = np.mgrid[0:n, 0:n]
    return xs / n, ys / n


def wallpaper():
    seed(11)
    u, v = grid(N)  # 1 m x 1 m
    px = 1.0 / N
    # --- printed motif: columns of small hollow diamonds with dots between
    colw = 0.05
    roww = 0.0625
    ci = np.floor(u / colw)
    cx = (ci + 0.5) * colw
    voff = np.where(ci % 2 == 0, 0.0, roww * 0.5)
    ri = np.floor((v + voff) / roww)
    cy = (ri + 0.5) * roww - voff
    dx = np.abs(u - cx)
    dy = np.abs(v - cy)
    dia = dx + dy * 0.72
    r = 0.0105
    outer = 1 - smoothstep(r - px, r + px, dia)
    inner = 1 - smoothstep(r * 0.55 - px, r * 0.55 + px, dia)
    diamond = np.clip(outer - inner, 0, 1)
    # little stems above/below the diamond give it a leaf/fleur feel
    stem = (1 - smoothstep(0.0008 - px, 0.0008 + px, dx)) * (1 - smoothstep(r * 1.75, r * 1.85, dy)) * smoothstep(r * 1.0, r * 1.1, dy)
    # dots midway between columns
    ddx = np.abs(u - (ci + 1.0) * colw)
    ddx = np.minimum(ddx, np.abs(u - ci * colw))
    dcy = (np.floor((v) / roww) + 0.5) * roww
    dot = 1 - smoothstep(0.0022 - px, 0.0022 + px, np.sqrt(ddx ** 2 + (v - dcy) ** 2))
    # pin stripes on column edges (faint)
    stripe = 1 - smoothstep(0.0004, 0.0004 + px * 1.5, np.minimum(np.abs(u - ci * colw), np.abs(u - (ci + 1) * colw)))
    ink = np.clip(diamond + stem * 0.8 + dot * 0.7 + stripe * 0.25, 0, 1)
    # printing imperfections: ink density varies, misregistration blur
    ink = blur(ink, 0.8) * (0.75 + 0.35 * fbm(N, 24, 4))

    # --- paper
    grain = fbm(N, 64, 5)
    fibres = fft_noise(N, 150, 600, 0.3, aniso=(1.0, 0.25))
    streak = fft_noise(N, 3, 40, 1.0, aniso=(1.0, 0.08))  # vertical roll streaks
    blotch = fbm(N, 2, 4)

    base = srgb([0.80, 0.71, 0.43])
    col = np.ones((N, N, 3)) * base
    col *= (0.965 + 0.05 * grain[..., None] + 0.025 * fibres[..., None])
    col *= (0.975 + 0.04 * streak[..., None])
    col *= (0.97 + 0.05 * blotch[..., None])
    inkcol = srgb([0.66, 0.56, 0.30])
    col = lerp(col, col * (inkcol / base), ink * 0.55)

    # --- seams every 0.5 m (roll width); slightly lifted, darker line + faint glue stain
    sd = np.minimum(np.abs(u - 0.0), np.minimum(np.abs(u - 0.5), np.abs(u - 1.0)))
    seam = 1 - smoothstep(0.0, 0.0012, sd)
    glue = (1 - smoothstep(0.0, 0.006, sd)) * (0.6 + 0.4 * fbm(N, 16, 3))
    col *= (1 - 0.18 * seam[..., None])
    col = lerp(col, col * srgb([0.93, 0.88, 0.75]), glue * 0.35)

    h = 0.5 + 0.12 * grain + 0.06 * fibres + 0.15 * ink - 0.35 * seam + 0.1 * glue
    rough = np.clip(0.80 + 0.08 * grain - 0.12 * ink + 0.05 * glue, 0, 1)
    nrm = height_to_normal(h, 5.0)
    ao = ao_from_height(h, 3, 1.2)
    save_set(OUT, "l0_wallpaper", col, nrm, rough, ao)
    return col


def carpet():
    seed(21)
    # 0.5 m tile of short loop-pile carpet
    f1, f2 = worley(N, 180, seed_=5, jitter=0.9)
    loops = 1 - np.clip(f1 * 1.6, 0, 1)
    f1b, _ = worley(N, 260, seed_=6, jitter=1.0)
    loops2 = 1 - np.clip(f1b * 1.8, 0, 1)
    fib = fft_noise(N, 300, 1000, 0.0)
    tone = fbm(N, 6, 5)
    rows = 0.5 + 0.5 * np.sin(np.mgrid[0:N, 0:N][0] / N * np.pi * 2 * 180)  # tufting rows
    h = 0.55 * loops + 0.3 * loops2 + 0.15 * fib + 0.06 * rows
    h = normalize(h)
    base = srgb([0.63, 0.54, 0.32])
    col = np.ones((N, N, 3)) * base
    col *= (0.72 + 0.42 * h[..., None])
    # individual lighter / darker strands
    strand = fft_noise(N, 200, 800, 0.0)
    col = lerp(col, col * srgb([1.12, 1.08, 0.95]), smoothstep(0.75, 0.95, strand) * 0.6)
    col = lerp(col, col * srgb([0.7, 0.66, 0.6]), smoothstep(0.8, 0.98, 1 - strand) * 0.5)
    col *= (0.93 + 0.12 * tone[..., None])
    rough = np.clip(0.9 + 0.08 * (1 - h), 0, 1)
    nrm = height_to_normal(h, 7.0)
    ao = np.clip(ao_from_height(h, 2, 2.2) * (0.75 + 0.25 * h), 0, 1)
    save_set(OUT, "l0_carpet", col, nrm, rough, ao)


def ceiling_tile(variant, n=1024):
    seed(31 + variant)
    u, v = grid(n)  # one 0.61 m tile
    edge = np.minimum(np.minimum(u, 1 - u), np.minimum(v, 1 - v)) * 0.61  # metres to edge
    tbar = 1 - smoothstep(0.0115, 0.0125, edge)
    reveal = smoothstep(0.012, 0.022, edge)  # bevelled tile edge

    # fissures: thin ridged noise lines, randomly oriented
    fis = np.zeros((n, n))
    for k in range(3):
        a = fft_noise(n, 10, 60, 0.6, aniso=(1.0, 0.6 + 0.4 * k))
        fis = np.maximum(fis, 1 - smoothstep(0.0, 0.03, np.abs(a - 0.5)))
    fis *= smoothstep(0.35, 0.7, fbm(n, 8, 3))
    pits = smoothstep(0.82, 0.93, fft_noise(n, 90, 250, 0.0))
    grain = fbm(n, 30, 5)

    base = srgb([0.83, 0.81, 0.73])
    col = np.ones((n, n, 3)) * base
    col *= (0.95 + 0.06 * grain[..., None])
    col *= (1 - 0.14 * fis[..., None]) * (1 - 0.35 * pits[..., None])
    h = 0.55 + 0.08 * grain - 0.25 * fis - 0.3 * pits

    # stains
    if variant > 0:
        blob = fbm(n, 2, 5)
        cx, cy = 0.3 + 0.4 * RNG.random(), 0.3 + 0.4 * RNG.random()
        rad = np.sqrt((u - cx) ** 2 + (v - cy) ** 2)
        size = [0, 0.22, 0.42, 0.55][variant]
        m = smoothstep(size, size * 0.4, rad + (blob - 0.5) * 0.35)
        tide = np.clip(np.abs(np.gradient(blur(m, 1.5))[0]) + np.abs(np.gradient(blur(m, 1.5))[1]), 0, 1)
        tide = normalize(tide) * m.clip(0, 1) ** 0.1
        # multiple rings
        rings = 0.5 + 0.5 * np.sin((rad + (blob - 0.5) * 0.35) * [0, 90, 70, 55][variant])
        stain_col = srgb([0.62, 0.50, 0.30]) if variant < 3 else srgb([0.45, 0.40, 0.30])
        amt = [0, 0.35, 0.55, 0.8][variant]
        col = lerp(col, col * (stain_col / base), m * amt * (0.8 + 0.2 * rings))
        col = lerp(col, col * srgb([0.55, 0.42, 0.25]), np.clip(tide * 1.6, 0, 1) * amt)
        if variant == 3:
            mould = smoothstep(0.55, 0.75, fft_noise(n, 30, 120, 0.2)) * m
            col = lerp(col, srgb([0.2, 0.22, 0.16]), mould * 0.6)
            h -= 0.1 * m  # sagging, slightly lumpy

    # edge treatment
    col = lerp(col, col * 0.78, (1 - reveal) * (1 - tbar))
    h = h * reveal + 0.3 * (1 - reveal)
    tcol = srgb([0.88, 0.88, 0.86]) * (0.96 + 0.04 * grain[..., None])
    col = lerp(col, tcol, tbar)
    h = np.where(tbar > 0.5, 1.0, h)
    rough = np.clip(0.93 - 0.5 * tbar + 0.02 * grain, 0, 1)
    return col, h, rough


def ceiling_atlas():
    parts = [ceiling_tile(i) for i in range(4)]
    n = 1024
    col = np.zeros((2 * n, 2 * n, 3))
    h = np.zeros((2 * n, 2 * n))
    rough = np.zeros((2 * n, 2 * n))
    for i, (c, hh, r) in enumerate(parts):
        y, x = (i // 2) * n, (i % 2) * n
        col[y:y + n, x:x + n] = c
        h[y:y + n, x:x + n] = hh
        rough[y:y + n, x:x + n] = r
    nrm = height_to_normal(h, 6.0)
    ao = ao_from_height(h, 3, 1.5)
    save_set(OUT, "l0_ceiling", col, nrm, rough, ao)


def lens():
    """Troffer prismatic lens emissive maps, 2 variants side by side (each 0.61 x 1.22 m)."""
    seed(41)
    w, hgt = 512, 1024
    out = np.zeros((hgt, 2 * w, 3))
    ys, xs = np.mgrid[0:hgt, 0:w]
    u, v = xs / w, ys / hgt
    prism = (np.abs(((xs * 0.61 / w) / 0.004) % 1 - 0.5) + np.abs(((ys * 1.22 / hgt) / 0.004) % 1 - 0.5))
    prism = 0.93 + 0.07 * prism
    edge = np.minimum(np.minimum(u * 0.61, (1 - u) * 0.61), np.minimum(v * 1.22, (1 - v) * 1.22))
    frame = smoothstep(0.018, 0.024, edge)
    # three tubes behind the lens -> brighter bands
    tubes = np.zeros_like(u)
    for t in (0.25, 0.5, 0.75):
        tubes += np.exp(-((u - t) ** 2) / (2 * 0.07 ** 2))
    tubes = 0.72 + 0.28 * tubes / tubes.max()
    ends = smoothstep(0.0, 0.12, v) * smoothstep(0.0, 0.12, 1 - v)
    ends = 0.7 + 0.3 * ends
    for var in range(2):
        seed(41 + var)
        specks = smoothstep(0.93, 0.98, fft_noise(hgt, 80, 200, 0.0)[:, :w]) * smoothstep(0.55, 1.0, v)
        grime = fbm(hgt, 3, 4)[:, :w]
        b = prism * tubes * ends * (0.92 + 0.08 * grime) * (1 - 0.7 * specks)
        colr = np.stack([b * 1.0, b * 0.985, b * 0.93], -1)
        if var == 1:  # dying: one tube dark, yellow-brown dirty lens
            dead = np.exp(-((u - 0.75) ** 2) / (2 * 0.12 ** 2))
            colr *= (1 - 0.65 * dead)[..., None]
            colr *= srgb([1.0, 0.9, 0.7])
        colr = colr * frame[..., None] + srgb([0.55, 0.55, 0.52]) * (1 - frame[..., None])
        out[:, var * w:(var + 1) * w] = colr
    d = OUT / "hi"
    d.mkdir(parents=True, exist_ok=True)
    img = Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8))
    img.save(d / "l0_lens.webp", quality=90)
    (OUT / "lo").mkdir(parents=True, exist_ok=True)
    img.resize((512, 512), Image.LANCZOS).save(OUT / "lo" / "l0_lens.webp", quality=90)


# ---------------------------------------------------------------- decals
def _marker_path(draw, pts, width, color, rng):
    for i in range(len(pts) - 1):
        (x0, y0), (x1, y1) = pts[i], pts[i + 1]
        steps = int(max(abs(x1 - x0), abs(y1 - y0)) / 2) + 1
        for s in range(steps):
            t = s / steps
            x = x0 + (x1 - x0) * t + rng.normal(0, 0.6)
            y = y0 + (y1 - y0) * t + rng.normal(0, 0.6)
            ww = width * (0.85 + 0.3 * rng.random())
            a = int(color[3] * (0.75 + 0.25 * rng.random()))
            draw.ellipse([x - ww / 2, y - ww / 2, x + ww / 2, y + ww / 2], fill=color[:3] + (a,))


def decals():
    """4x4 atlas of 512 px RGBA decals."""
    S = 512
    atlas = np.zeros((4 * S, 4 * S, 4))
    ys, xs = np.mgrid[0:S, 0:S]
    u, v = xs / S, ys / S

    def put(i, rgba):
        y, x = (i // 4) * S, (i % 4) * S
        atlas[y:y + S, x:x + S] = rgba

    # 0-3 water streaks running down from the top edge
    for i in range(4):
        seed(100 + i)
        cols = fft_noise(S, 3, 40, 0.8, aniso=(1.0, 0.02))
        streaks = smoothstep(0.5, 0.9, cols)
        length = 0.35 + 0.6 * fbm(S, 2, 3)
        fade = smoothstep(length, length * 0.2, v)
        top = smoothstep(0.35, 0.0, v)
        side = smoothstep(0.0, 0.2, u) * smoothstep(0.0, 0.2, 1 - u)
        a = np.clip((streaks * fade * 0.8 + top * 0.5 * fbm(S, 4, 4)) * side, 0, 1)
        tide = np.clip(np.abs(np.gradient(blur(a, 2))[0]) * 30, 0, 1)
        c = np.ones((S, S, 3)) * srgb([0.45, 0.34, 0.18])
        c = lerp(c, srgb([0.3, 0.22, 0.12]), tide)
        put(i, np.dstack([c, np.clip(a * 0.75 + tide * 0.3, 0, 1)]))
    # 4-5 mould / grime patches rising from the floor
    for i in range(2):
        seed(110 + i)
        n1 = fbm(S, 4, 6)
        spots = smoothstep(0.6, 0.8, fft_noise(S, 20, 90, 0.3))
        base = smoothstep(0.1, 1.0, v) * smoothstep(0.0, 0.25, u) * smoothstep(0.0, 0.25, 1 - u)
        a = np.clip((n1 * 0.7 + spots * 0.6) * base * 1.3 - 0.25, 0, 1)
        c = lerp(np.ones((S, S, 3)) * srgb([0.28, 0.27, 0.16]), srgb([0.12, 0.13, 0.08]), spots)
        put(4 + i, np.dstack([c, a]))
    # 6-7 scuffs
    for i in range(2):
        seed(120 + i)
        img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        dr = ImageDraw.Draw(img)
        rng = np.random.default_rng(120 + i)
        for _ in range(14):
            x = rng.uniform(60, 450)
            y = rng.uniform(300, 480)
            l = rng.uniform(20, 120)
            ang = rng.normal(0, 0.25)
            _marker_path(dr, [(x, y), (x + np.cos(ang) * l, y + np.sin(ang) * l)], rng.uniform(2, 7), (25, 22, 18, 110), rng)
        a = np.asarray(img).astype(float) / 255
        a[..., 3] = blur(a[..., 3], 1.2)
        put(6 + i, a)
    # 8-11 marker arrows pointing +U (right), different hands
    for i in range(4):
        rng = np.random.default_rng(130 + i)
        img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        dr = ImageDraw.Draw(img)
        colr = [(120, 20, 18, 235), (20, 18, 16, 235), (120, 20, 18, 235), (35, 30, 60, 235)][i]
        y = 256 + rng.normal(0, 10)
        w = rng.uniform(9, 15)
        x0, x1 = 70 + rng.normal(0, 10), 430 + rng.normal(0, 10)
        mid = [(x0 + (x1 - x0) * t, y + np.sin(t * 3 + i) * rng.uniform(2, 10)) for t in np.linspace(0, 1, 12)]
        _marker_path(dr, mid, w, colr, rng)
        hl = rng.uniform(70, 110)
        _marker_path(dr, [(x1 - hl, y - hl * 0.8), mid[-1]], w, colr, rng)
        _marker_path(dr, [(x1 - hl, y + hl * 0.8), mid[-1]], w, colr, rng)
        a = np.asarray(img).astype(float) / 255
        # drips from the paint
        for _ in range(int(rng.integers(1, 5))):
            dx = int(rng.uniform(x0, x1))
            dl = int(rng.uniform(15, 80))
            a[int(y):int(y) + dl, dx - 1:dx + 2, :3] = np.array(colr[:3]) / 255
            a[int(y):int(y) + dl, dx - 1:dx + 2, 3] = np.linspace(0.8, 0.0, dl)[:, None]
        put(8 + i, a)
    # 12 tally marks, 13 crack
    rng = np.random.default_rng(140)
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    dr = ImageDraw.Draw(img)
    for g in range(4):
        gx = 60 + g * 110
        for k in range(4):
            x = gx + k * 18
            _marker_path(dr, [(x + rng.normal(0, 3), 190), (x + rng.normal(0, 3), 320)], 5, (30, 26, 22, 220), rng)
        if g < 3:
            _marker_path(dr, [(gx - 10, 300), (gx + 70, 210)], 5, (30, 26, 22, 220), rng)
    a = np.asarray(img).astype(float) / 255
    put(12, a)
    seed(141)
    crack = np.zeros((S, S))
    x, y = 256.0, 20.0
    ang = np.pi / 2
    for _ in range(600):
        ang += rng.normal(0, 0.25)
        ang = 0.8 * ang + 0.2 * (np.pi / 2)
        x += np.cos(ang) * 0.8
        y += np.sin(ang) * 0.8
        if 0 <= int(y) < S and 0 <= int(x) < S:
            crack[int(y), int(x)] = 1
        if rng.random() < 0.01:
            bx, by, ba = x, y, ang + rng.choice([-1, 1]) * 0.9
            for _ in range(int(rng.uniform(30, 120))):
                ba += rng.normal(0, 0.3)
                bx += np.cos(ba) * 0.8
                by += np.sin(ba) * 0.8
                if 0 <= int(by) < S and 0 <= int(bx) < S:
                    crack[int(by), int(bx)] = 0.8
    crack = np.clip(blur(crack, 0.7) * 3, 0, 1)
    put(13, np.dstack([np.ones((S, S, 3)) * 0.12, crack * 0.9]))
    # 14 floor wet patch (albedo darkening + alpha); 15 soot plume above an outlet
    seed(150)
    blob = fbm(S, 3, 5)
    rad = np.sqrt((u - 0.5) ** 2 + (v - 0.5) ** 2)
    wet = smoothstep(0.45, 0.2, rad + (blob - 0.5) * 0.3)
    put(14, np.dstack([np.ones((S, S, 3)) * srgb([0.22, 0.18, 0.1]), wet * 0.75]))
    seed(151)
    plume = smoothstep(0.5, 0.0, np.abs(u - 0.5) * (1.6 - v) * 1.5) * smoothstep(0.0, 0.8, v)
    plume *= (0.6 + 0.4 * fbm(S, 5, 5))
    put(15, np.dstack([np.ones((S, S, 3)) * 0.05, np.clip(plume * 1.1, 0, 1)]))

    for tier, sz in (("hi", None), ("lo", 1024)):
        d = OUT / tier
        d.mkdir(parents=True, exist_ok=True)
        save_rgba(d / "decals.webp", atlas, 90, sz)


if __name__ == "__main__":
    wallpaper()
    carpet()
    ceiling_atlas()
    lens()
    decals()
    print("L0 textures done")
