"""Procedural surface materials for characters, baked to textures with Cycles.

Each material is a node network (noise mottling, veins, cavity dirt from mesh pointiness,
pores, ribs, cracks, knit / denim / cotton weaves, stains). `bake()` renders them into a
shared UV atlas — albedo, ORM (G = roughness) and a tangent-space normal map — and swaps
every material for a plain image-based Principled BSDF that the glTF exporter understands.
"""
import bpy
import numpy as np


class G:
    """Tiny node-graph helper."""

    def __init__(self, m):
        m.use_nodes = True
        self.m = m
        self.n = m.node_tree.nodes
        self.l = m.node_tree.links
        self.n.clear()
        self.out = self.node("ShaderNodeOutputMaterial")
        self.bsdf = self.node("ShaderNodeBsdfPrincipled")
        self.link(self.bsdf.outputs[0], self.out.inputs[0])
        tc = self.node("ShaderNodeTexCoord")
        self.obj = tc.outputs["Object"]
        self.geo = self.node("ShaderNodeNewGeometry")
        sep = self.node("ShaderNodeSeparateXYZ")
        self.link(self.obj, sep.inputs[0])
        self.x, self.y, self.z = sep.outputs[0], sep.outputs[1], sep.outputs[2]

    def node(self, t, **props):
        nd = self.n.new(t)
        for k, v in props.items():
            setattr(nd, k, v)
        return nd

    def link(self, a, b):
        self.l.new(a, b)

    def val(self, sock, v):
        if hasattr(sock, "default_value"):
            sock.default_value = v

    def inp(self, nd, name, v):
        """Connect a socket or set a constant."""
        s = nd.inputs[name]
        if isinstance(v, bpy.types.NodeSocket):
            self.link(v, s)
        else:
            s.default_value = v

    def noise(self, scale, detail=4.0, rough=0.55, distort=0.0, vec=None, w=None):
        nd = self.node("ShaderNodeTexNoise", noise_dimensions="4D" if w is not None else "3D")
        self.link(vec or self.obj, nd.inputs["Vector"])
        nd.inputs["Scale"].default_value = scale
        nd.inputs["Detail"].default_value = detail
        nd.inputs["Roughness"].default_value = rough
        nd.inputs["Distortion"].default_value = distort
        if w is not None:
            nd.inputs["W"].default_value = w
        return nd.outputs["Fac"]

    def voronoi_edge(self, scale, vec=None, rand=1.0):
        nd = self.node("ShaderNodeTexVoronoi", feature="DISTANCE_TO_EDGE")
        self.link(vec or self.obj, nd.inputs["Vector"])
        nd.inputs["Scale"].default_value = scale
        nd.inputs["Randomness"].default_value = rand
        return nd.outputs["Distance"]

    def wave(self, scale, kind="BANDS", direction="Z", profile="SIN", distort=0.0, detail=0.0, vec=None):
        nd = self.node("ShaderNodeTexWave", wave_type=kind, bands_direction=direction, wave_profile=profile)
        self.link(vec or self.obj, nd.inputs["Vector"])
        nd.inputs["Scale"].default_value = scale
        nd.inputs["Distortion"].default_value = distort
        nd.inputs["Detail"].default_value = detail
        return nd.outputs["Fac"]

    def ramp(self, fac, a, b, lo=0.0, hi=1.0):
        """Map fac through lo..hi to a value/colour between a and b."""
        nd = self.node("ShaderNodeValToRGB")
        self.link(fac, nd.inputs[0])
        e = nd.color_ramp.elements
        e[0].position, e[1].position = lo, hi
        e[0].color = (*a, 1) if isinstance(a, tuple) else (a, a, a, 1)
        e[1].color = (*b, 1) if isinstance(b, tuple) else (b, b, b, 1)
        return nd.outputs[0]

    def mix(self, fac, a, b, blend="MIX"):
        nd = self.node("ShaderNodeMix", data_type="RGBA", blend_type=blend)
        nd.clamp_factor = True
        for i, v in ((0, fac), (6, a), (7, b)):
            s = nd.inputs[i]
            if isinstance(v, bpy.types.NodeSocket):
                self.link(v, s)
            elif isinstance(v, tuple):
                s.default_value = (*v, 1)
            else:
                s.default_value = v if i == 0 else (v, v, v, 1)
        return nd.outputs[2]

    def math(self, op, a, b=0.0, clamp=False):
        nd = self.node("ShaderNodeMath", operation=op)
        nd.use_clamp = clamp
        for i, v in enumerate((a, b)):
            if isinstance(v, bpy.types.NodeSocket):
                self.link(v, nd.inputs[i])
            else:
                nd.inputs[i].default_value = v
        return nd.outputs[0]

    def band(self, sock, lo, hi, soft=0.02):
        """1 inside [lo, hi] with soft edges, else 0."""
        a = self.node("ShaderNodeMapRange", interpolation_type="SMOOTHSTEP")
        self.link(sock, a.inputs["Value"])
        a.inputs["From Min"].default_value, a.inputs["From Max"].default_value = lo - soft, lo + soft
        b = self.node("ShaderNodeMapRange", interpolation_type="SMOOTHSTEP")
        self.link(sock, b.inputs["Value"])
        b.inputs["From Min"].default_value, b.inputs["From Max"].default_value = hi + soft, hi - soft
        return self.math("MULTIPLY", a.outputs[0], b.outputs[0])

    def cavity(self, lo=0.46, hi=0.53):
        return self.ramp(self.geo.outputs["Pointiness"], 1.0, 0.0, lo, hi)  # 1 in creases

    def finish(self, color, rough, height, bump=0.35, dist=0.02, metal=0.0):
        self.inp(self.bsdf, "Base Color", color)
        self.inp(self.bsdf, "Roughness", rough)
        self.bsdf.inputs["Metallic"].default_value = metal
        if height is not None:
            bn = self.node("ShaderNodeBump")
            bn.inputs["Strength"].default_value = bump
            bn.inputs["Distance"].default_value = dist
            self.link(height, bn.inputs["Height"])
            self.link(bn.outputs[0], self.bsdf.inputs["Normal"])


# ------------------------------------------------------------------ surfaces
def skin(m, base, blotch, vein=None, rough=0.5, wet=0.0, ribs=None, cracks=None, crack_col=(0.4, 0.08, 0.04),
         sockets=(), socket_col=(0.05, 0.03, 0.03), dirt=(0.18, 0.14, 0.1), redness=None, pores=1.0, mottle=1.0,
         scalp=None, hair_col=(0.06, 0.04, 0.03), brows=None, lips=None, lip_col=(0.5, 0.26, 0.24), stubble=0.0):
    """Human / creature skin. ribs=(z0, z1, spacing) in rest-pose metres; sockets=[(x,y,z,r)] darkened eye sockets."""
    g = G(m)
    big = g.noise(3.5, 6, 0.6)
    small = g.noise(22, 3, 0.5, distort=0.6)
    col = g.mix(g.ramp(big, 0.0, 1.0, 0.3, 0.7), base, blotch)
    bruise = g.ramp(g.noise(1.6, 4, 0.6, distort=0.5), 0, 1, 0.6, 0.75)
    col = g.mix(g.math("MULTIPLY", bruise, 0.5 * mottle), col, tuple(c * 0.55 for c in blotch))
    col = g.mix(g.math("MULTIPLY", g.ramp(small, 0.0, 1.0, 0.45, 0.8), 0.35 * mottle), col, blotch)
    height = g.math("MULTIPLY", small, 0.25)
    pore = g.noise(260, 2, 0.5)
    height = g.math("ADD", height, g.math("MULTIPLY", pore, 0.06 * pores))
    if redness:
        # warm flush: soft patches wherever the body is thin-skinned (approximated by low pointiness + noise)
        flush = g.math("MULTIPLY", g.ramp(g.noise(6, 3), 0, 1, 0.5, 0.75), 0.35)
        col = g.mix(flush, col, redness)
    if vein:
        warp = g.noise(4, 2, distort=2.5)
        vv = g.node("ShaderNodeVectorMath", operation="ADD")
        g.link(g.obj, vv.inputs[0])
        g.link(warp, vv.inputs[1])
        lines = g.ramp(g.voronoi_edge(7, vv.outputs[0]), 1.0, 0.0, 0.0, 0.025)
        mask = g.ramp(g.noise(2.5, 2), 0, 1, 0.45, 0.65)
        vmask = g.math("MULTIPLY", lines, mask)
        col = g.mix(g.math("MULTIPLY", vmask, 0.85), col, vein)
        height = g.math("ADD", height, g.math("MULTIPLY", vmask, 0.12))
    if ribs:
        z0, z1, sp = ribs
        s = g.math("SINE", g.math("MULTIPLY", g.z, 6.2832 / sp))
        rib = g.math("POWER", g.math("MULTIPLY", g.math("ADD", s, 1.0), 0.5), 3.0)
        chest = g.math("MULTIPLY", g.band(g.z, z0, z1, 0.05), g.band(g.math("ABSOLUTE", g.x), 0.04, 0.2, 0.04))
        rib = g.math("MULTIPLY", rib, chest)
        height = g.math("ADD", height, g.math("MULTIPLY", rib, 1.4))
        col = g.mix(g.math("MULTIPLY", g.math("SUBTRACT", chest, rib), 0.35), col, blotch)
        # spine knuckles down the back
        spine = g.math("MULTIPLY", g.band(g.x, -0.018, 0.018, 0.012), g.band(g.z, z0 - 0.25, z1 + 0.12, 0.05))
        knob = g.math("POWER", g.math("MULTIPLY", g.math("ADD", g.math("SINE", g.math("MULTIPLY", g.z, 6.2832 / 0.034)), 1.0), 0.5), 2.0)
        height = g.math("ADD", height, g.math("MULTIPLY", g.math("MULTIPLY", spine, knob), 1.2))
    if cracks:
        c = g.ramp(g.voronoi_edge(cracks), 1.0, 0.0, 0.0, 0.04)
        cm = g.math("MULTIPLY", c, g.ramp(g.noise(3, 2), 0, 1, 0.3, 0.6))
        col = g.mix(cm, col, crack_col)
        height = g.math("SUBTRACT", height, g.math("MULTIPLY", cm, 0.5))
    for (sx, sy, sz, r) in sockets:
        d = g.node("ShaderNodeVectorMath", operation="DISTANCE")
        g.link(g.obj, d.inputs[0])
        d.inputs[1].default_value = (sx, sy, sz)
        dark = g.ramp(d.outputs["Value"], 1.0, 0.0, r * 0.35, r)
        col = g.mix(dark, col, socket_col)
        height = g.math("SUBTRACT", height, g.math("MULTIPLY", dark, 0.9))
    cav = g.cavity()
    col = g.mix(g.math("MULTIPLY", cav, 0.85), col, dirt)
    hair_mask = None
    if scalp:
        # short hair painted onto the scalp: hairline rises toward the forehead, strands + bump
        top, front = scalp
        hz = g.math("ADD", g.z, g.math("MULTIPLY", g.math("SUBTRACT", g.y, front), 0.8))
        edge = g.noise(60, 2)
        hz = g.math("ADD", hz, g.math("MULTIPLY", edge, 0.012))
        hair_mask = g.band(hz, top - 0.062, top + 5.0, 0.008)
        strands = g.wave(420, kind="BANDS", direction="Z", distort=8.0, detail=3.0)
        hc = g.mix(g.math("MULTIPLY", strands, 0.45), hair_col, tuple(min(1, c * 2.4) for c in hair_col))
        col = g.mix(hair_mask, col, hc)
        height = g.math("ADD", height, g.math("MULTIPLY", g.math("MULTIPLY", strands, hair_mask), 0.5))
    grime = g.ramp(g.noise(2.2, 5, 0.6), 0, 1, 0.55, 0.8)
    low = g.ramp(g.z, 1.0, 0.0, 0.0, 0.55)  # hands/feet/knees in the dirt (rest pose: low z)
    col = g.mix(g.math("MULTIPLY", g.math("MAXIMUM", grime, low), 0.45), col, dirt)
    if brows:
        # eyebrows: a soft hairy band above each eye (mirrored with |x|)
        ax = g.math("ABSOLUTE", g.x)
        for (cx, cy, cz) in brows[:1]:
            cx = abs(cx)
            band_z = g.band(g.math("SUBTRACT", g.z, g.math("MULTIPLY", g.math("POWER", g.math("SUBTRACT", ax, cx + 0.004), 2.0), -9.0)), cz + 0.013, cz + 0.022, 0.0025)
            band_x = g.band(ax, cx - 0.021, cx + 0.025, 0.004)
            front = g.band(g.y, -5.0, cy + 0.004, 0.004)
            bm = g.math("MULTIPLY", g.math("MULTIPLY", band_z, band_x), front)
            hairs = g.ramp(g.wave(900, kind="BANDS", direction="X", distort=4.0, detail=2.0), 0, 1, 0.3, 0.8)
            bmask = g.math("MULTIPLY", bm, g.math("ADD", 0.45, g.math("MULTIPLY", hairs, 0.55)))
            col = g.mix(g.math("MULTIPLY", bmask, 0.92), col, hair_col)
            height = g.math("ADD", height, g.math("MULTIPLY", bmask, 0.25))
    if lips:
        lx, ly, lz = lips
        ex = g.math("POWER", g.math("DIVIDE", g.x, 0.025), 2.0)
        ez = g.math("POWER", g.math("DIVIDE", g.math("SUBTRACT", g.z, lz), 0.0095), 2.0)
        lm = g.math("MULTIPLY", g.ramp(g.math("ADD", ex, ez), 1.0, 0.0, 0.55, 1.0), g.band(g.y, -5.0, ly + 0.012, 0.006))
        col = g.mix(g.math("MULTIPLY", lm, 0.7), col, lip_col)
        if stubble:
            jaw = g.math("MULTIPLY", g.band(g.z, lz - 0.07, lz + 0.016, 0.01), g.band(g.math("ABSOLUTE", g.x), 0.0, 0.065, 0.012))
            jaw = g.math("MULTIPLY", jaw, g.band(g.y, -5.0, ly + 0.05, 0.01))
            jaw = g.math("MULTIPLY", jaw, g.math("SUBTRACT", 1.0, lm))
            dots = g.ramp(g.noise(1400, 1), 0, 1, 0.52, 0.62)
            col = g.mix(g.math("MULTIPLY", g.math("MULTIPLY", jaw, dots), stubble), col, hair_col)
    rgh = g.math("SUBTRACT", rough, g.math("MULTIPLY", g.ramp(g.noise(9, 3), 0, 1, 0.4, 0.8), wet))
    if hair_mask is not None:
        rgh = g.math("ADD", rgh, g.math("MULTIPLY", hair_mask, 0.25))
    g.finish(col, rgh, height, bump=0.6, dist=0.012)


def eye(m, centres, iris=(0.2, 0.11, 0.05), sclera=(0.85, 0.82, 0.76), dead=False):
    """Eyeballs: iris, pupil and limbal ring around each eye's forward (-Y) axis, veined sclera, wet."""
    g = G(m)
    rs = []
    for (cx, cy, cz) in centres:
        dx = g.math("SUBTRACT", g.x, cx)
        dz = g.math("SUBTRACT", g.z, cz)
        r = g.math("SQRT", g.math("ADD", g.math("MULTIPLY", dx, dx), g.math("MULTIPLY", dz, dz)))
        r = g.math("ADD", r, g.math("MULTIPLY", g.band(g.y, cy - 0.002, 5.0, 0.002), 1.0))  # back of the eye: no iris
        rs.append(r)
    r = rs[0] if len(rs) == 1 else g.math("MINIMUM", rs[0], rs[1])
    veins = g.ramp(g.voronoi_edge(90), 1.0, 0.0, 0.0, 0.03)
    col = g.mix(g.math("MULTIPLY", veins, 0.35), sclera, (0.6, 0.22, 0.2))
    if dead:
        col = g.mix(1.0, col, (0.015, 0.012, 0.012))
        g.finish(col, 0.04, None)
        return
    stri = g.ramp(g.noise(160, 3), 0, 1, 0.3, 0.8)
    irc = g.mix(stri, iris, tuple(min(1, c * 1.9) for c in iris))
    col = g.mix(g.ramp(r, 1.0, 0.0, 0.0058, 0.0064), col, irc)
    col = g.mix(g.math("MULTIPLY", g.band(r, 0.0054, 0.0066, 0.0006), 0.7), col, (0.03, 0.02, 0.015))
    col = g.mix(g.ramp(r, 1.0, 0.0, 0.0021, 0.0026), col, (0.005, 0.005, 0.005))
    g.finish(col, 0.05, None)


def knit(m, col, rough=0.85, grime=(0.2, 0.18, 0.15)):
    g = G(m)
    rib = g.wave(160, direction="Z")
    fuzz = g.noise(90, 4, 0.7)
    c = g.mix(g.math("MULTIPLY", fuzz, 0.25), col, tuple(x * 0.7 for x in col))
    c = g.mix(g.math("MULTIPLY", g.cavity(0.47, 0.52), 0.5), c, grime)
    c = g.mix(g.math("MULTIPLY", g.ramp(g.noise(5, 3), 0, 1, 0.55, 0.8), 0.25), c, grime)
    h = g.math("ADD", g.math("MULTIPLY", g.wave(160, direction="X", distort=2.0), 0.4), g.math("MULTIPLY", fuzz, 0.3))
    g.finish(c, rough, g.math("ADD", h, g.math("MULTIPLY", rib, 0.3)), bump=0.25, dist=0.004)


def denim(m, col=(0.08, 0.12, 0.22), rough=0.8):
    g = G(m)
    rot = g.node("ShaderNodeVectorMath", operation="ADD")
    g.link(g.obj, rot.inputs[0])
    twill = g.wave(220, direction="DIAGONAL")
    fade = g.ramp(g.noise(4, 4), 0, 1, 0.4, 0.75)
    c = g.mix(g.math("MULTIPLY", twill, 0.35), col, (0.55, 0.6, 0.68))
    c = g.mix(g.math("MULTIPLY", fade, 0.45), c, (0.32, 0.38, 0.5))
    c = g.mix(g.math("MULTIPLY", g.cavity(0.47, 0.52), 0.6), c, (0.05, 0.05, 0.07))
    g.finish(c, rough, g.math("MULTIPLY", twill, 0.5), bump=0.2, dist=0.003)


def cotton(m, col, stain=(0.45, 0.36, 0.2), stains=0.6, rough=0.82, grime=(0.25, 0.22, 0.18)):
    g = G(m)
    weave = g.math("ADD", g.wave(300, direction="X"), g.wave(300, direction="Z"))
    blot = g.ramp(g.noise(3.2, 5, 0.65, distort=0.8), 0, 1, 0.58, 0.7)
    c = g.mix(g.math("MULTIPLY", blot, stains), col, stain)
    c = g.mix(g.math("MULTIPLY", g.ramp(g.noise(11, 4), 0, 1, 0.55, 0.75), stains * 0.5), c, stain)
    c = g.mix(g.math("MULTIPLY", g.cavity(0.47, 0.52), 0.7), c, grime)
    wrinkle = g.noise(7, 3, 0.5, distort=1.0)
    g.finish(c, rough, g.math("ADD", g.math("MULTIPLY", weave, 0.15), g.math("MULTIPLY", wrinkle, 0.6)), bump=0.3, dist=0.006)


def leather(m, col, rough=0.55, sole=(0.72, 0.7, 0.66), sole_z=0.035):
    g = G(m)
    grain = g.noise(140, 3, 0.6)
    c = g.mix(g.math("MULTIPLY", g.ramp(g.noise(8, 3), 0, 1, 0.4, 0.8), 0.3), col, tuple(x * 1.6 for x in col))
    c = g.mix(g.band(g.z, -1.0, sole_z, 0.004), c, sole)
    c = g.mix(g.math("MULTIPLY", g.cavity(0.47, 0.53), 0.6), c, (0.04, 0.04, 0.04))
    g.finish(c, rough, g.math("MULTIPLY", grain, 0.3), bump=0.2, dist=0.004)


def hair(m, col, rough=0.5):
    g = G(m)
    strands = g.wave(180, kind="BANDS", direction="Y", distort=6.0, detail=2.0)
    c = g.mix(g.math("MULTIPLY", strands, 0.5), col, tuple(min(1, x * 2.2) for x in col))
    c = g.mix(g.math("MULTIPLY", g.cavity(0.47, 0.52), 0.6), c, tuple(x * 0.4 for x in col))
    g.finish(c, rough, g.math("MULTIPLY", strands, 0.6), bump=0.4, dist=0.004)


def nylon(m, col, rough=0.6):
    g = G(m)
    rip = g.math("ADD", g.wave(90, direction="X"), g.wave(90, direction="Z"))
    c = g.mix(g.math("MULTIPLY", g.ramp(g.noise(6, 3), 0, 1, 0.5, 0.8), 0.3), col, tuple(x * 0.6 for x in col))
    c = g.mix(g.math("MULTIPLY", g.cavity(0.46, 0.53), 0.7), c, (0.03, 0.03, 0.03))
    g.finish(c, rough, g.math("MULTIPLY", rip, 0.25), bump=0.25, dist=0.004)


# ------------------------------------------------------------------ props
def paint_metal(m, paint, rust=0.6, chip=0.6, streaks=0.6, rough=0.45, steel=(0.42, 0.42, 0.42)):
    """Old painted sheet steel: paint variation, chipped edges showing steel and rust, rust running down."""
    g = G(m)
    rust_col = (0.3, 0.13, 0.05)
    dark_rust = (0.14, 0.06, 0.03)
    c = g.mix(g.math("MULTIPLY", g.ramp(g.noise(4, 4), 0, 1, 0.35, 0.75), 0.25), paint, tuple(x * 0.75 for x in paint))
    c = g.mix(g.math("MULTIPLY", g.ramp(g.noise(30, 3), 0, 1, 0.5, 0.8), 0.15), c, tuple(min(1, x * 1.2) for x in paint))
    # rust streaks: vertical, distorted, patchy
    wq = g.node("ShaderNodeVectorMath", operation="MULTIPLY")
    g.link(g.obj, wq.inputs[0])
    wq.inputs[1].default_value = (1.0, 1.0, 0.12)
    st = g.ramp(g.wave(9, kind="BANDS", direction="X", distort=6.0, detail=3.0, vec=wq.outputs[0]), 0, 1, 0.55, 0.9)
    st = g.math("MULTIPLY", st, g.ramp(g.noise(2.2, 4), 0, 1, 0.45, 0.7))
    st = g.math("MULTIPLY", st, streaks)
    c = g.mix(g.math("MULTIPLY", st, 0.75), c, rust_col)
    # chips on convex edges
    edge = g.ramp(g.geo.outputs["Pointiness"], 0.0, 1.0, 0.52, 0.6)
    chipm = g.math("MULTIPLY", edge, g.ramp(g.noise(18, 5, 0.7), 0, 1, 0.45, 0.6))
    chipm = g.math("MINIMUM", g.math("MULTIPLY", chipm, chip * 2.0), 1.0)
    bare = g.mix(g.ramp(g.noise(9, 3), 0, 1, 0.4, 0.6), steel, rust_col)
    c = g.mix(chipm, c, bare)
    # rust blooms
    bloom = g.math("MULTIPLY", g.ramp(g.noise(1.5, 6, 0.65), 0, 1, 0.62, 0.75), rust)
    c = g.mix(bloom, c, g.mix(g.noise(40, 3), rust_col, dark_rust))
    c = g.mix(g.math("MULTIPLY", g.cavity(0.45, 0.5), 0.75), c, (0.04, 0.035, 0.03))
    rgh = g.math("ADD", rough, g.math("MULTIPLY", g.math("ADD", bloom, st), 0.4))
    h = g.math("ADD", g.math("MULTIPLY", g.noise(60, 4), 0.15), g.math("MULTIPLY", bloom, g.noise(80, 3)))
    g.finish(c, rgh, g.math("SUBTRACT", h, g.math("MULTIPLY", chipm, 0.3)), bump=0.3, dist=0.004)


def upholstery(m, col, rough=0.9, wear=0.6, stains=0.5, rib=0.0):
    """Old fabric furniture: fibres (optionally corduroy ribs), faded worn high spots, stains, dust in seams."""
    g = G(m)
    fib = g.noise(260, 3, 0.7)
    c = g.mix(g.math("MULTIPLY", fib, 0.3), col, tuple(x * 0.7 for x in col))
    if rib:
        r = g.wave(140, direction="X")
        c = g.mix(g.math("MULTIPLY", r, 0.25 * rib), c, tuple(x * 0.65 for x in col))
    hi = g.ramp(g.geo.outputs["Pointiness"], 0.0, 1.0, 0.5, 0.58)
    c = g.mix(g.math("MULTIPLY", hi, wear), c, tuple(min(1, x * 1.35 + 0.05) for x in col))
    blot = g.ramp(g.noise(2.6, 5, 0.65, distort=0.7), 0, 1, 0.6, 0.72)
    c = g.mix(g.math("MULTIPLY", blot, stains), c, tuple(x * 0.55 for x in col))
    c = g.mix(g.math("MULTIPLY", g.cavity(0.44, 0.5), 0.8), c, (0.05, 0.04, 0.03))
    h = g.math("ADD", g.math("MULTIPLY", fib, 0.25), g.math("MULTIPLY", g.noise(5, 3), 0.3))
    if rib:
        h = g.math("ADD", h, g.math("MULTIPLY", g.wave(140, direction="X"), 0.4 * rib))
    g.finish(c, rough, h, bump=0.35, dist=0.004)


def wood(m, col, rough=0.55, scuff=0.5):
    g = G(m)
    grain = g.wave(14, kind="RINGS", direction="Z", distort=8.0, detail=4.0)
    c = g.mix(g.math("MULTIPLY", grain, 0.45), col, tuple(x * 0.55 for x in col))
    c = g.mix(g.math("MULTIPLY", g.ramp(g.geo.outputs["Pointiness"], 0, 1, 0.52, 0.6), scuff), c, tuple(min(1, x * 1.5) for x in col))
    c = g.mix(g.math("MULTIPLY", g.cavity(0.45, 0.5), 0.7), c, (0.04, 0.03, 0.02))
    g.finish(c, rough, g.math("MULTIPLY", grain, 0.2), bump=0.2, dist=0.003)


def cork(m):
    g = G(m)
    sp = g.noise(400, 2, 0.7)
    c = g.mix(g.ramp(sp, 0, 1, 0.4, 0.7), (0.5, 0.33, 0.18), (0.68, 0.5, 0.3))
    c = g.mix(g.math("MULTIPLY", g.ramp(g.noise(3, 3), 0, 1, 0.55, 0.75), 0.4), c, (0.32, 0.22, 0.12))
    # old pin holes
    holes = g.ramp(g.voronoi_edge(70), 0.0, 1.0, 0.0, 0.02)
    c = g.mix(g.math("MULTIPLY", g.math("SUBTRACT", 1.0, holes), 0.0), c, (0.1, 0.07, 0.04))
    g.finish(c, 0.95, g.math("MULTIPLY", sp, 0.5), bump=0.35, dist=0.003)


def plastic(m, col, rough=0.5, scuff=0.5):
    g = G(m)
    c = g.mix(g.math("MULTIPLY", g.ramp(g.noise(6, 3), 0, 1, 0.4, 0.8), 0.2), col, tuple(x * 0.8 for x in col))
    sc = g.ramp(g.wave(120, kind="BANDS", direction="DIAGONAL", distort=12.0, detail=2.0), 0, 1, 0.85, 0.95)
    c = g.mix(g.math("MULTIPLY", sc, scuff * 0.5), c, tuple(min(1, x * 1.4 + 0.1) for x in col))
    c = g.mix(g.math("MULTIPLY", g.cavity(0.45, 0.5), 0.7), c, (0.05, 0.05, 0.05))
    g.finish(c, g.math("ADD", rough, g.math("MULTIPLY", sc, 0.2)), g.math("MULTIPLY", sc, 0.1), bump=0.15, dist=0.002)


def bake_prop(ob, name, res=1024, margin=0.004):
    """Smart-unwrap a joined prop and bake its procedural materials."""
    for o in bpy.context.view_layer.objects:
        o.select_set(False)
    ob.select_set(True)
    bpy.context.view_layer.objects.active = ob
    if not ob.data.uv_layers:
        ob.data.uv_layers.new(name="UVMap")
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.uv.smart_project(angle_limit=1.15, island_margin=margin)
    bpy.ops.object.mode_set(mode="OBJECT")
    return bake([ob], name, res=res)


# ------------------------------------------------------------------ baking
def bake(objs, name, res=1024, samples=4):
    """Bake every material on `objs` into one shared UV atlas and replace them with image materials."""
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    sc.cycles.samples = samples
    sc.render.bake.margin = 8
    sc.render.bake.use_selected_to_active = False
    imgs = {}
    for key, cs in (("col", "sRGB"), ("rgh", "Non-Color"), ("nrm", "Non-Color")):
        im = bpy.data.images.new(f"{name}_{key}", res, res, alpha=False, float_buffer=False)
        im.colorspace_settings.name = cs
        imgs[key] = im
    mats = []
    for o in objs:
        for s in o.data.materials:
            if s and s not in mats:
                mats.append(s)
    keep = [m for m in mats if m.name.startswith("Glow") or m.name.startswith("Label") or any(n.type == "TEX_IMAGE" and n.name != "BAKE" for n in m.node_tree.nodes)]
    dummy = bpy.data.images.new(f"{name}_dummy", 8, 8)
    targets = {}
    for m in keep:
        t = m.node_tree.nodes.new("ShaderNodeTexImage")
        t.name = "BAKE_DUMMY"
        t.image = dummy
        m.node_tree.nodes.active = t
    mats = [m for m in mats if m not in keep]
    for m in mats:
        t = m.node_tree.nodes.new("ShaderNodeTexImage")
        t.name = "BAKE"
        targets[m] = t
    for o in bpy.context.view_layer.objects:
        o.select_set(False)
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    for key, btype, extra in (("col", "DIFFUSE", dict(pass_filter={"COLOR"})), ("rgh", "ROUGHNESS", {}), ("nrm", "NORMAL", dict(normal_space="TANGENT"))):
        for m, t in targets.items():
            t.image = imgs[key]
            m.node_tree.nodes.active = t
        for m in keep:
            m.node_tree.nodes.active = m.node_tree.nodes["BAKE_DUMMY"]
        bpy.ops.object.bake(type=btype, use_clear=True, margin=8, **extra)
        print(f"    baked {name}_{key}")
    # ORM: R = occlusion (1), G = roughness, B = metallic (0)
    px = np.array(imgs["rgh"].pixels[:]).reshape(res, res, 4)
    orm = np.zeros_like(px)
    orm[..., 0] = 1.0
    orm[..., 1] = px[..., 0]
    orm[..., 3] = 1.0
    imgs["rgh"].pixels[:] = orm.ravel()
    for m in keep:
        m.node_tree.nodes.remove(m.node_tree.nodes["BAKE_DUMMY"])
    for im in imgs.values():
        im.pack()
    # swap in image-based materials the glTF exporter maps 1:1 (baseColor, metallicRoughness, normal)
    for m in mats:
        g = G(m)
        col = g.node("ShaderNodeTexImage", image=imgs["col"])
        orm_n = g.node("ShaderNodeTexImage", image=imgs["rgh"])
        nrm = g.node("ShaderNodeTexImage", image=imgs["nrm"])
        g.link(col.outputs["Color"], g.bsdf.inputs["Base Color"])
        sep = g.node("ShaderNodeSeparateColor")
        g.link(orm_n.outputs["Color"], sep.inputs[0])
        g.link(sep.outputs["Green"], g.bsdf.inputs["Roughness"])
        g.link(sep.outputs["Blue"], g.bsdf.inputs["Metallic"])
        nm = g.node("ShaderNodeNormalMap")
        g.link(nrm.outputs["Color"], nm.inputs["Color"])
        g.link(nm.outputs["Normal"], g.bsdf.inputs["Normal"])
    return imgs
