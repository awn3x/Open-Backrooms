"""Tileable procedural texture helpers (numpy).

Everything here is periodic on the image domain so the resulting textures tile
seamlessly. Noise is built by band-limiting white noise in the frequency
domain, which is periodic by construction.
"""
import numpy as np
from PIL import Image
from scipy import ndimage

RNG = np.random.default_rng(1337)


def seed(s):
    global RNG
    RNG = np.random.default_rng(s)


def fft_noise(n, lo, hi, beta=1.0, aniso=(1.0, 1.0)):
    """Tileable noise with energy between frequencies lo..hi (cycles per tile)."""
    w = RNG.standard_normal((n, n))
    f = np.fft.fftfreq(n) * n
    fx, fy = np.meshgrid(f * aniso[0], f * aniso[1])
    r = np.sqrt(fx * fx + fy * fy) + 1e-6
    band = (r >= lo) & (r <= hi)
    amp = np.where(band, r ** (-beta), 0.0)
    out = np.real(np.fft.ifft2(np.fft.fft2(w) * amp))
    return normalize(out)


def fbm(n, base=4, octaves=6, gain=0.55, aniso=(1.0, 1.0)):
    out = np.zeros((n, n))
    amp = 1.0
    tot = 0.0
    freq = base
    for _ in range(octaves):
        out += amp * (fft_noise(n, freq * 0.7, freq * 1.4, 0.0, aniso) - 0.5)
        tot += amp
        amp *= gain
        freq *= 2
        if freq > n / 2:
            break
    return normalize(out / tot)


def normalize(a):
    lo, hi = np.percentile(a, 0.5), np.percentile(a, 99.5)
    return np.clip((a - lo) / (hi - lo + 1e-9), 0, 1)


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def blur(a, sigma):
    return ndimage.gaussian_filter(a, sigma, mode="wrap")


def worley(n, cells, seed_=None, jitter=1.0):
    """Tileable F1/F2 worley noise. Returns (f1, f2) normalized by cell size."""
    rng = np.random.default_rng(seed_) if seed_ is not None else RNG
    off = 0.5 + (rng.random((cells, cells, 2)) - 0.5) * jitter
    ys, xs = np.mgrid[0:n, 0:n] / n * cells
    f1 = np.full((n, n), 1e9)
    f2 = np.full((n, n), 1e9)
    cy = np.floor(ys).astype(int)
    cx = np.floor(xs).astype(int)
    for dy in (-1, 0, 1):
        for dx in (-1, 0, 1):
            gy = cy + dy
            gx = cx + dx
            o = off[gy % cells, gx % cells]
            py = gy + o[..., 0]
            px = gx + o[..., 1]
            d = np.sqrt((py - ys) ** 2 + (px - xs) ** 2)
            f2 = np.where(d < f1, f1, np.minimum(f2, d))
            f1 = np.minimum(f1, d)
    return f1, f2


def height_to_normal(h, strength):
    """Tangent-space normal map (OpenGL convention, +Y up) from a height map."""
    dx = (np.roll(h, -1, 1) - np.roll(h, 1, 1)) * 0.5
    dy = (np.roll(h, -1, 0) - np.roll(h, 1, 0)) * 0.5
    nx = -dx * strength
    ny = dy * strength
    nz = np.ones_like(h)
    l = np.sqrt(nx * nx + ny * ny + nz * nz)
    return np.stack([nx / l, ny / l, nz / l], -1) * 0.5 + 0.5


def ao_from_height(h, radius=6, strength=1.0):
    b = blur(h, radius)
    return np.clip(1.0 - np.maximum(b - h, 0) * strength * 4.0, 0, 1)


def lerp(a, b, t):
    t = np.asarray(t)
    if t.ndim == 2 and np.ndim(a) >= 1 and np.shape(a)[-1:] == (3,):
        t = t[..., None]
    return a + (b - a) * t


def srgb(c):
    return np.array(c, dtype=np.float64)


def save_rgb(path, rgb, quality=90, size=None):
    img = Image.fromarray((np.clip(rgb, 0, 1) * 255 + 0.5).astype(np.uint8), "RGB")
    if size and img.size[0] != size:
        img = img.resize((size, size), Image.LANCZOS)
    img.save(path, "WEBP", quality=quality, method=6)


def save_rgba(path, rgba, quality=90, size=None):
    img = Image.fromarray((np.clip(rgba, 0, 1) * 255 + 0.5).astype(np.uint8), "RGBA")
    if size and img.size[0] != size:
        img = img.resize((size, size), Image.LANCZOS)
    img.save(path, "WEBP", quality=quality, method=6)


def save_set(outdir, name, albedo, normal, rough, ao=None, metal=None, sizes=(("hi", None), ("lo", 1024))):
    """Writes <name>_albedo, <name>_normal, <name>_orm (R=AO,G=rough,B=metal)."""
    n = albedo.shape[0]
    if ao is None:
        ao = np.ones((n, n))
    if metal is None:
        metal = np.zeros((n, n))
    orm = np.stack([ao, rough, metal], -1)
    for tier, sz in sizes:
        d = outdir / tier
        d.mkdir(parents=True, exist_ok=True)
        save_rgb(d / f"{name}_albedo.webp", albedo, 88, sz)
        save_rgb(d / f"{name}_normal.webp", normal, 80, sz)
        save_rgb(d / f"{name}_orm.webp", orm, 80, sz)
