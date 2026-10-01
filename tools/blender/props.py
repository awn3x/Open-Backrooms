"""Hard-surface props: outlets, switches, light fixtures, vents, exits, level props.

Materials named "tex:<name>" are swapped in-engine for the matching PBR set
from public/assets/textures. Materials named "Lens", "Bulb", "Tube", "Glow*"
are treated as emissive surfaces the engine can flicker.
"""
import math
import random
from pathlib import Path

import bpy
import bake as BK  # noqa: F401  (must precede bmesh)
import bmesh
from mathutils import Vector
from PIL import Image, ImageDraw, ImageFont

from common import *  # noqa

TMP = Path(__file__).resolve().parents[2] / "tools" / "out" / "tmp"
FONT_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_C = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default(size=size)


# ------------------------------------------------------------------ materials
def M():
    return dict(
        ivory=mat("Plastic_Ivory", (0.80, 0.74, 0.58), 0.32),
        bakelite=mat("Plastic_Bakelite", (0.23, 0.13, 0.07), 0.25),
        white=mat("Plastic_White", (0.86, 0.85, 0.80), 0.3),
        hole=mat("Hole", (0.01, 0.01, 0.01), 0.9),
        brass=mat("Brass", (0.75, 0.6, 0.35), 0.35, 1.0),
        steel=mat("Steel", (0.62, 0.62, 0.6), 0.35, 1.0),
        copper=mat("Copper", (0.85, 0.45, 0.28), 0.3, 1.0),
        wire_blk=mat("Wire_Black", (0.02, 0.02, 0.02), 0.4),
        wire_wht=mat("Wire_White", (0.8, 0.8, 0.78), 0.4),
        paint=mat("PaintedMetal", (0.86, 0.86, 0.83), 0.35),
        reflector=mat("Reflector", (0.9, 0.9, 0.88), 0.25),
        dark=mat("Dark", (0.02, 0.02, 0.02), 0.8),
        led=mat("Glow_LED", (0.05, 0.4, 0.05), 0.4, emit=(0.1, 1.0, 0.15), emit_strength=2.0),
    )


def cutter(name, size, loc, material):
    c = box(name, size, loc, material)
    return c


def cut_many(target, cutters):
    for c in cutters:
        md = target.modifiers.new("bool", "BOOLEAN")
        md.object = c
        md.operation = "DIFFERENCE"
        md.solver = "EXACT"
        md.material_mode = "TRANSFER"
        apply_modifiers(target)
        bpy.data.objects.remove(c, do_unlink=True)


def plate(m, w=0.070, h=0.114, t=0.005, material=None):
    p = box("plate", (w, t, h), (0, -t / 2, 0), material or m["ivory"], bevel=0.0018, segs=3)
    apply_modifiers(p)
    return p


def screw(m, z, material):
    s = cyl("screw", 0.0034, 0.0014, (0, -0.0055, z), (math.pi / 2, 0, 0), material, 20)
    slot = box("slot", (0.0055, 0.004, 0.0006), (0, -0.0065, z), m["hole"])
    s.rotation_euler[1] = random.uniform(0, math.pi)
    cut_many(s, [slot])
    return s


def duplex_face(m, z, material, ground=True, round_face=False):
    if round_face:
        f = cyl("face", 0.0145, 0.004, (0, -0.0055, z), (math.pi / 2, 0, 0), material, 32)
    else:
        f = cyl("face", 0.0195, 0.004, (0, -0.0055, z), (math.pi / 2, 0, 0), material, 40)
        clip = box("clip", (0.05, 0.02, 0.029), (0, -0.0055, z), material)
        md = f.modifiers.new("i", "BOOLEAN")
        md.object = clip
        md.operation = "INTERSECT"
        md.solver = "EXACT"
        apply_modifiers(f)
        bpy.data.objects.remove(clip, do_unlink=True)
        md = f.modifiers.new("bevel", "BEVEL")
        md.width = 0.0008
        md.segments = 2
        apply_modifiers(f)
    cuts = [
        cutter("hot", (0.0019, 0.01, 0.0072), (0.0064, -0.0075, z + 0.0035), m["hole"]),
        cutter("neu", (0.0021, 0.01, 0.0088), (-0.0064, -0.0075, z + 0.0035), m["hole"]),
    ]
    if ground:
        g = cyl("gnd", 0.0026, 0.01, (0, -0.0075, z - 0.0085), (math.pi / 2, 0, 0), m["hole"], 20)
        flat = box("gflat", (0.01, 0.012, 0.004), (0, -0.0075, z - 0.0085 - 0.0036), m["hole"])
        md = g.modifiers.new("d", "BOOLEAN")
        md.object = flat
        md.operation = "DIFFERENCE"
        apply_modifiers(g)
        bpy.data.objects.remove(flat, do_unlink=True)
        cuts.append(g)
    cut_many(f, cuts)
    return f


def outlet_duplex():
    reset()
    m = M()
    p = plate(m)
    parts = [p, duplex_face(m, 0.0195, m["ivory"]), duplex_face(m, -0.0195, m["ivory"]), screw(m, 0, m["ivory"])]
    ob = join(parts, "Outlet")
    decimate(ob, 0.45)
    shade_smooth(ob, 30)
    export("outlet_duplex")
    preview("outlet_duplex", (0, 0, 0), 0.22, 10, -25)


def outlet_twoprong():
    reset()
    m = M()
    p = plate(m, material=m["bakelite"])
    parts = [p, duplex_face(m, 0.0195, m["bakelite"], ground=False, round_face=True),
             duplex_face(m, -0.0195, m["bakelite"], ground=False, round_face=True), screw(m, 0, m["brass"])]
    ob = join(parts, "Outlet")
    decimate(ob, 0.45)
    shade_smooth(ob, 30)
    export("outlet_twoprong")
    preview("outlet_twoprong", (0, 0, 0), 0.22, 10, -25)


def outlet_gfci():
    reset()
    m = M()
    p = plate(m, material=m["white"])
    cut_many(p, [cutter("open", (0.034, 0.02, 0.068), (0, -0.003, 0), m["hole"])])
    body = box("body", (0.0335, 0.009, 0.0675), (0, -0.0035, 0), m["white"], bevel=0.0012, segs=2)
    apply_modifiers(body)
    cuts = []
    for z in (0.022, -0.022):
        cuts += [cutter("hot", (0.0019, 0.01, 0.0072), (0.0064, -0.008, z + 0.0035), m["hole"]),
                 cutter("neu", (0.0021, 0.01, 0.0088), (-0.0064, -0.008, z + 0.0035), m["hole"])]
        cuts.append(cyl("gnd", 0.0026, 0.01, (0, -0.008, z - 0.0085), (math.pi / 2, 0, 0), m["hole"], 20))
    cut_many(body, cuts)
    test = box("test", (0.012, 0.004, 0.0065), (0, -0.0085, 0.0045), mat("Button_Test", (0.12, 0.12, 0.12), 0.4), bevel=0.0008)
    reset_b = box("reset", (0.012, 0.004, 0.0065), (0, -0.0085, -0.0045), m["white"], bevel=0.0008)
    led = sphere("led", 0.0012, (0.012, -0.008, 0.0), m["led"], segs=8, rings=6)
    screws = [screw(m, 0.049, m["white"]), screw(m, -0.049, m["white"])]
    ob = join([p, body, test, reset_b, led] + screws, "Outlet")
    decimate(ob, 0.45)
    shade_smooth(ob, 30)
    export("outlet_gfci")
    preview("outlet_gfci", (0, 0, 0), 0.22, 10, -25)


def switch_plate():
    reset()
    m = M()
    p = plate(m)
    cut_many(p, [cutter("open", (0.0105, 0.02, 0.024), (0, -0.003, 0), m["hole"])])
    body = box("yoke", (0.0105, 0.002, 0.024), (0, -0.0025, 0), m["hole"])
    lever = box("lever", (0.0075, 0.016, 0.009), (0, -0.009, 0.003), m["ivory"], bevel=0.0012)
    lever.rotation_euler = (math.radians(-18), 0, 0)
    ob = join([p, body, lever, screw(m, 0.030, m["ivory"]), screw(m, -0.030, m["ivory"])], "Switch")
    decimate(ob, 0.5)
    shade_smooth(ob, 30)
    export("switch_plate")
    preview("switch_plate", (0, 0, 0), 0.22, 10, -25)


def wire(name, pts, r, material):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = r
    cu.bevel_resolution = 2
    sp = cu.splines.new("NURBS")
    sp.points.add(len(pts) - 1)
    for i, p in enumerate(pts):
        sp.points[i].co = (*p, 1)
    sp.use_endpoint_u = True
    sp.order_u = 3
    ob = bpy.data.objects.new(name, cu)
    link(ob)
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(ob.evaluated_get(dg))
    mo = bpy.data.objects.new(name, me)
    link(mo)
    bpy.data.objects.remove(ob, do_unlink=True)
    me.materials.append(material)
    return mo


def outlet_broken():
    """Plate hanging off one screw, receptacle pulled out on its wires, dark box behind."""
    reset()
    m = M()
    rng = random.Random(7)
    hole = box("boxhole", (0.052, 0.002, 0.078), (0, -0.0005, 0), mat("Hole_Soot", (0.015, 0.012, 0.01), 0.9))
    pl = plate(m)
    cut_many(pl, [cutter("c1", (0.03, 0.02, 0.03), (0.035, -0.003, -0.057), m["hole"])])  # broken corner
    for f in pl.data.polygons:
        pass
    pl.location = (0, -0.0005, 0)
    pl.rotation_euler = (0, math.radians(28), 0)
    # pivot around the top screw: move so the top screw hole stays near original
    pl.location = (0.018, -0.0015, -0.012)
    dev = box("device", (0.034, 0.028, 0.105), (0.01, -0.035, -0.09), m["ivory"], bevel=0.002)
    dev.rotation_euler = (math.radians(55), math.radians(-12), math.radians(8))
    ear_t = box("strap", (0.012, 0.002, 0.13), (0.01, -0.03, -0.088), m["steel"])
    ear_t.rotation_euler = dev.rotation_euler
    wires = []
    for i, (col, off) in enumerate(((m["wire_blk"], -0.008), (m["wire_wht"], 0.0), (m["copper"], 0.008))):
        pts = [(off, 0.0, -0.01 + 0.005 * i), (off * 1.5, -0.015, -0.03), (off + 0.004, -0.03, -0.06 - rng.random() * 0.01), (0.01 + off * 0.5, -0.035, -0.075)]
        wires.append(wire(f"w{i}", pts, 0.0014 if i < 2 else 0.0009, col))
    parts = [hole, pl, dev, ear_t] + wires
    ob = join(parts, "OutletBroken")
    decimate(ob, 0.4)
    shade_smooth(ob, 35)
    export("outlet_broken")
    preview("outlet_broken", (0, -0.02, -0.04), 0.35, 15, -40)


def floor_box():
    reset()
    m = M()
    lid = cyl("lid", 0.055, 0.004, (0, 0, 0.002), (0, 0, 0), m["brass"], 40)
    md = lid.modifiers.new("bevel", "BEVEL")
    md.width = 0.0015
    md.segments = 2
    apply_modifiers(lid)
    caps = [cyl(f"cap{i}", 0.012, 0.003, (0.022 * (1 if i else -1), 0, 0.004), (0, 0, 0), m["brass"], 24) for i in range(2)]
    ob = join([lid] + caps, "FloorBox")
    shade_smooth(ob, 30)
    export("floor_box")


# ------------------------------------------------------------------ lighting
def troffer_frame(m, lens_mat=None):
    W, L = 0.60, 1.21
    parts = []
    # trim ring flush with the ceiling (z=0), 20mm wide
    t = 0.02
    for sx, sy, lx, ly in ((W, t, 0, L / 2 - t / 2), (W, t, 0, -L / 2 + t / 2), (t, L, W / 2 - t / 2, 0), (t, L, -W / 2 + t / 2, 0)):
        parts.append(box("trim", (sx, sy, 0.006), (lx, ly, -0.003), m["paint"], bevel=0.0015))
    # sloped reflector walls from trim up to the lens
    bm = bmesh.new()
    o = [(-W / 2 + t, -L / 2 + t, 0), (W / 2 - t, -L / 2 + t, 0), (W / 2 - t, L / 2 - t, 0), (-W / 2 + t, L / 2 - t, 0)]
    i = [(x * 0.97, y * 0.985, 0.012) for x, y, _ in o]
    vo = [bm.verts.new(p) for p in o]
    vi = [bm.verts.new(p) for p in i]
    for k in range(4):
        bm.faces.new((vo[k], vo[(k + 1) % 4], vi[(k + 1) % 4], vi[k]))
    bmesh.ops.reverse_faces(bm, faces=bm.faces[:])
    parts.append(new_obj("reflector", bm, m["reflector"]))
    # housing (above ceiling, closes the gap)
    parts.append(box("housing", (W, L, 0.09), (0, 0, 0.06), m["dark"]))
    if lens_mat is not None:
        bm = bmesh.new()
        vs = [bm.verts.new(p) for p in i]
        f = bm.faces.new(vs[::-1])
        uv = bm.loops.layers.uv.new("UVMap")
        for lp, (u, v) in zip(f.loops, ((0, 0), (0, 1), (1, 1), (1, 0))[::-1]):
            lp[uv].uv = (u, v)
        parts.append(new_obj("lens", bm, lens_mat))
    return parts


def troffer():
    reset()
    m = M()
    lens = mat("Lens", (1, 1, 1), 0.2, emit=(1, 0.97, 0.9), emit_strength=4.0)
    parts = troffer_frame(m, lens)
    ob = join(parts, "Troffer")
    export("troffer")
    preview("troffer", (0, 0, 0), 1.8, -35, -20)


def tube(name, length, loc, rot, m, broken=False):
    tm = mat("Tube", (0.95, 0.95, 0.93), 0.2, emit=(1.0, 0.97, 0.9), emit_strength=3.0)
    L = length * (0.45 if broken else 1.0)
    t = cyl(name, 0.013, L, loc, rot, tm, 16)
    parts = [t]
    for s in (-1, 1) if not broken else (-1,):
        d = Vector((0, 0, s * (L / 2 + 0.008)))
        d.rotate(t.rotation_euler)
        parts.append(cyl(name + "cap", 0.0135, 0.016, tuple(Vector(loc) + d), rot, m["steel"], 16))
    if broken:
        # jagged end: a few shards
        rng = random.Random(3)
        for k in range(5):
            d = Vector((rng.uniform(-0.01, 0.01), rng.uniform(-0.01, 0.01), L / 2 + rng.uniform(0, 0.02)))
            d.rotate(t.rotation_euler)
            sh = box("shard", (0.004, 0.001, rng.uniform(0.01, 0.03)), tuple(Vector(loc) + d), tm)
            sh.rotation_euler = (rng.uniform(-0.6, 0.6), rng.uniform(-0.6, 0.6), rng.uniform(0, 3))
            parts.append(sh)
    return parts


def troffer_hanging():
    """A troffer that has dropped out of the grid on one side, hanging by its wiring."""
    reset()
    m = M()
    W, L = 0.60, 1.21
    pan = box("pan", (W - 0.04, L - 0.04, 0.004), (0, 0, 0.07), m["reflector"])
    parts = troffer_frame(m, None)[:4] + [pan]
    for k, x in enumerate((-0.16, 0.0, 0.16)):
        for s in (-1, 1):
            parts.append(box("tomb", (0.03, 0.02, 0.05), (x, s * (L / 2 - 0.05), 0.045), m["white"]))
        parts += tube(f"tube{k}", 1.13, (x, 0.0 if k != 1 else -0.3, 0.035), (math.pi / 2, 0, 0), m, broken=(k == 1))
    frame = join(parts, "TrofferHanging")
    # hinge along the +Y short edge: rotate about X through y=L/2
    for v in frame.data.vertices:
        v.co.y -= L / 2
    frame.rotation_euler = (math.radians(38), 0, 0)
    apply_transforms(frame)
    for v in frame.data.vertices:
        v.co.y += L / 2
    housing = box("housing", (W, L, 0.09), (0, 0, 0.06), m["dark"])
    w1 = wire("flex", [(0.1, 0.4, 0.1), (0.12, 0.2, -0.05), (0.1, 0.0, -0.3), (0.08, -0.05, -0.45)], 0.006, mat("Conduit", (0.5, 0.5, 0.48), 0.4, 1.0))
    ob = join([frame, housing, w1], "TrofferHanging")
    shade_smooth(ob, 30)
    export("troffer_hanging")
    preview("troffer_hanging", (0, 0.2, -0.3), 2.6, 0, -70)


def vent_ceiling():
    reset()
    m = M()
    S = 0.6
    parts = []
    t = 0.03
    for sx, sy, lx, ly in ((S, t, 0, S / 2 - t / 2), (S, t, 0, -S / 2 + t / 2), (t, S, S / 2 - t / 2, 0), (t, S, -S / 2 + t / 2, 0)):
        parts.append(box("rim", (sx, sy, 0.01), (lx, ly, -0.005), m["paint"], bevel=0.003))
    n = 24
    for k in range(n):
        y = -S / 2 + t + (k + 0.5) * (S - 2 * t) / n
        s = box("louver", (S - 2 * t, 0.018, 0.0015), (0, y, 0.004), m["paint"])
        s.rotation_euler = (math.radians(45), 0, 0)
        parts.append(s)
    parts.append(box("duct", (S - 2 * t, S - 2 * t, 0.2), (0, 0, 0.12), m["dark"]))
    ob = join(parts, "VentCeiling")
    export("vent_ceiling")
    preview("vent_ceiling", (0, 0, 0), 1.1, -40, -20)


def vent_wall():
    reset()
    m = M()
    W, H = 0.30, 0.16
    rim = box("rim", (W, 0.012, H), (0, -0.006, 0), m["paint"], bevel=0.003)
    cut_many(rim, [cutter("o", (W - 0.03, 0.04, H - 0.03), (0, 0, 0), m["dark"])])
    parts = [rim, box("back", (W - 0.03, 0.002, H - 0.03), (0, 0.03, 0), m["dark"])]
    for k in range(7):
        z = -H / 2 + 0.015 + (k + 0.5) * (H - 0.03) / 7
        s = box("louver", (W - 0.03, 0.02, 0.0015), (0, -0.004, z), m["paint"])
        s.rotation_euler = (math.radians(-40), 0, 0)
        parts.append(s)
    ob = join(parts, "VentWall")
    export("vent_wall")
    preview("vent_wall", (0, 0, 0), 0.6, 10, -30)


# ------------------------------------------------------------------ pickups & exits
def label_texture(path, text_lines, bg, fg, size=(512, 256), accent=None):
    img = Image.new("RGB", size, bg)
    d = ImageDraw.Draw(img)
    if accent:
        d.rectangle([0, size[1] * 0.72, size[0], size[1] * 0.8], fill=accent)
        d.ellipse([size[0] * 0.04, size[1] * 0.15, size[0] * 0.2, size[1] * 0.55], outline=accent, width=6)
    y = size[1] * 0.14
    for txt, fs in text_lines:
        f = font(FONT_B, fs)
        w = d.textlength(txt, font=f)
        d.text(((size[0] - w) / 2 + (size[0] * 0.06 if accent else 0), y), txt, fill=fg, font=f)
        y += fs * 1.15
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path)
    return path


def almond_water():
    reset()
    lbl = label_texture(TMP / "almond_label.png", [("ALMOND", 72), ("WATER", 72), ("500 mL  •  STILL", 26)],
                        (236, 226, 200), (86, 58, 30), accent=(170, 120, 60))
    prof = [(0.0, 0.0), (0.029, 0.0), (0.0315, 0.004), (0.0325, 0.012), (0.031, 0.03), (0.0325, 0.045), (0.0325, 0.13),
            (0.0315, 0.15), (0.026, 0.172), (0.017, 0.188), (0.0135, 0.196), (0.0135, 0.206)]
    bm = bmesh.new()
    seg = 32
    rings = []
    for r, z in prof:
        ring = [bm.verts.new((r * math.cos(a / seg * 2 * math.pi), r * math.sin(a / seg * 2 * math.pi), z)) for a in range(seg)]
        rings.append(ring)
    for k in range(len(rings) - 1):
        for a in range(seg):
            bm.faces.new((rings[k][a], rings[k][(a + 1) % seg], rings[k + 1][(a + 1) % seg], rings[k + 1][a]))
    plastic = mat("Glass_Bottle", (0.9, 0.93, 0.95), 0.08, alpha=0.35, transmission=1.0)
    bottle = new_obj("bottle", bm, plastic)
    shade_smooth(bottle, 80)
    liquid = cyl("liquid", 0.0305, 0.158, (0, 0, 0.081), (0, 0, 0), mat("Liquid_Almond", (0.93, 0.9, 0.82), 0.1, alpha=0.8), 32)
    cap = cyl("cap", 0.0148, 0.018, (0, 0, 0.212), (0, 0, 0), mat("Cap", (0.92, 0.92, 0.9), 0.4), 32)
    # label band with UVs wrapping around
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    top, bot = [], []
    for a in range(seg + 1):
        ang = a / seg * 2 * math.pi
        bot.append(bm.verts.new((0.0331 * math.cos(ang), 0.0331 * math.sin(ang), 0.052)))
        top.append(bm.verts.new((0.0331 * math.cos(ang), 0.0331 * math.sin(ang), 0.122)))
    for a in range(seg):
        f = bm.faces.new((bot[a], bot[a + 1], top[a + 1], top[a]))
        for lp, (u, v) in zip(f.loops, ((a / seg, 0), ((a + 1) / seg, 0), ((a + 1) / seg, 1), (a / seg, 1))):
            lp[uvl].uv = (u, v)
    label = new_obj("label", bm, image_mat("Label_Almond", lbl, 0.6))
    shade_smooth(label, 80)
    ob = join([bottle, liquid, cap, label], "AlmondWater")
    export("almond_water")
    preview("almond_water", (0, 0, 0.1), 0.45, 10, -20)


def exit_door():
    """Metal fire door with push bar and an illuminated EXIT sign. Origin: floor, centre of opening."""
    reset()
    m = M()
    W, H, T = 0.91, 2.03, 0.045
    frame_m = mat("DoorFrame", (0.30, 0.31, 0.30), 0.45, 0.6)
    door_m = mat("DoorPaint", (0.28, 0.34, 0.31), 0.5, 0.2)
    parts = []
    fw = 0.05
    parts.append(box("jambL", (fw, 0.14, H + fw), (-W / 2 - fw / 2, 0, (H + fw) / 2), frame_m, bevel=0.004))
    parts.append(box("jambR", (fw, 0.14, H + fw), (W / 2 + fw / 2, 0, (H + fw) / 2), frame_m, bevel=0.004))
    parts.append(box("head", (W + 2 * fw, 0.14, fw), (0, 0, H + fw / 2), frame_m, bevel=0.004))
    parts.append(box("void", (W, 0.02, H), (0, 0.06, H / 2), m["dark"]))
    frame = join(parts, "Frame")
    # door slab, origin at hinge (left edge)
    slab = box("slab", (W - 0.006, T, H - 0.01), (W / 2, 0, (H - 0.01) / 2 + 0.005), door_m, bevel=0.003)
    kick = box("kick", (W - 0.05, 0.002, 0.25), (W / 2, -T / 2 - 0.001, 0.15), m["steel"])
    bar = cyl("bar", 0.015, W * 0.72, (W * 0.52, -T / 2 - 0.06, 1.0), (0, math.pi / 2, 0), m["steel"], 20)
    ends = [box("be", (0.06, 0.06, 0.09), (x, -T / 2 - 0.03, 1.0), m["steel"], bevel=0.008) for x in (W * 0.14, W * 0.9)]
    hinges = [cyl("hinge", 0.008, 0.1, (0.0, -T / 2, z), (0, 0, 0), m["steel"], 12) for z in (0.25, 1.0, 1.8)]
    door = join([slab, kick, bar] + ends + hinges, "Door")
    door.data.name = "Door"
    for v in door.data.vertices:
        v.co.x -= 0.0  # slab already spans x in [0, W]: hinge edge at the object origin
    door.location = (-W / 2, 0, 0)
    # EXIT sign
    tex = TMP / "exit_sign.png"
    img = Image.new("RGB", (512, 256), (40, 8, 8))
    d = ImageDraw.Draw(img)
    f = font(FONT_C, 170)
    wtxt = d.textlength("EXIT", font=f)
    d.text(((512 - wtxt) / 2, 30), "EXIT", fill=(255, 40, 30), font=f)
    d.polygon([(40, 128), (80, 98), (80, 158)], fill=(255, 40, 30))
    d.polygon([(472, 128), (432, 98), (432, 158)], fill=(255, 40, 30))
    tex.parent.mkdir(parents=True, exist_ok=True)
    img.save(tex)
    housing = box("sign", (0.34, 0.06, 0.2), (0, -0.03, H + fw + 0.16), m["white"], bevel=0.006)
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    cz = H + fw + 0.16
    vs = [bm.verts.new(p) for p in ((-0.16, -0.0605, cz - 0.09), (0.16, -0.0605, cz - 0.09), (0.16, -0.0605, cz + 0.09), (-0.16, -0.0605, cz + 0.09))]
    fc = bm.faces.new(vs)
    for lp, uv in zip(fc.loops, ((0, 0), (1, 0), (1, 1), (0, 1))):
        lp[uvl].uv = uv
    bmesh.ops.reverse_faces(bm, faces=[fc]) if fc.normal.y > 0 else None
    face = new_obj("signface", bm, image_mat("Glow_Exit", tex, 0.3, emissive=True))
    sign = join([housing, face], "ExitSign")
    export("exit_door")
    preview("exit_door", (0, 0, 1.2), 4.0, 8, -25)


def hatch():
    """Floor maintenance hatch (Level 1 exit). Origin at floor centre; Lid pivots on its -Y edge."""
    reset()
    m = M()
    S = 0.9
    frame_m = mat("tex:l2_floor", (0.5, 0.5, 0.48), 0.5, 0.8)
    hazard = mat("HazardYellow", (0.75, 0.58, 0.06), 0.55)
    parts = []
    for sx, sy, lx, ly in ((S + 0.1, 0.05, 0, S / 2 + 0.025), (S + 0.1, 0.05, 0, -S / 2 - 0.025), (0.05, S, S / 2 + 0.025, 0), (0.05, S, -S / 2 - 0.025, 0)):
        parts.append(box("angle", (sx, sy, 0.01), (lx, ly, 0.005), hazard, bevel=0.002))
    parts.append(box("shaft", (S, S, 0.02), (0, 0, -1.2), m["dark"]))
    frame = join(parts, "HatchFrame")
    lid = box("lid", (S - 0.01, S - 0.01, 0.02), (0, 0, 0.01), frame_m, bevel=0.003)
    handle = torus("handle", 0.05, 0.007, (0, S * 0.3, 0.025), (0, math.pi / 2, 0), m["steel"], 20, 8)
    lidob = join([lid, handle], "Lid")
    for v in lidob.data.vertices:
        v.co.y += S / 2  # hinge edge (-Y) at the origin
    lidob.location = (0, -S / 2, 0)
    auto_uv(lidob, 1.0)
    export("hatch")
    preview("hatch", (0, 0, 0), 2.2, 45, -20)


def elevator():
    """Level 2 exit. Origin: floor, centre of the door opening, facing -Y. DoorL/DoorR slide in X."""
    reset()
    m = M()
    W, H = 1.1, 2.1
    brushed = mat("BrushedSteel", (0.66, 0.66, 0.64), 0.28, 1.0)
    frame_m = mat("ElevFrame", (0.45, 0.45, 0.44), 0.35, 1.0)
    parts = [
        box("jl", (0.12, 0.2, H + 0.12), (-W / 2 - 0.06, 0, (H + 0.12) / 2), frame_m, bevel=0.004),
        box("jr", (0.12, 0.2, H + 0.12), (W / 2 + 0.06, 0, (H + 0.12) / 2), frame_m, bevel=0.004),
        box("hd", (W + 0.24, 0.2, 0.12), (0, 0, H + 0.06), frame_m, bevel=0.004),
        box("sill", (W + 0.2, 0.25, 0.01), (0, 0.02, 0.005), m["steel"]),
    ]
    # cab interior
    cab_w = mat("CabWall", (0.55, 0.5, 0.42), 0.4, 0.8)
    D = 1.5
    parts += [
        box("cabL", (0.02, D, H), (-W / 2 - 0.05, 0.1 + D / 2, H / 2), cab_w),
        box("cabR", (0.02, D, H), (W / 2 + 0.05, 0.1 + D / 2, H / 2), cab_w),
        box("cabB", (W + 0.1, 0.02, H), (0, 0.1 + D, H / 2), cab_w),
        box("cabF", (W + 0.1, D, 0.02), (0, 0.1 + D / 2, 0.0), mat("CabFloor", (0.12, 0.11, 0.1), 0.7)),
        box("cabC", (W + 0.1, D, 0.02), (0, 0.1 + D / 2, H), m["dark"]),
        box("cabLight", (W * 0.7, D * 0.6, 0.01), (0, 0.1 + D / 2, H - 0.015), mat("Glow_Cab", (1, 1, 1), 0.3, emit=(1.0, 0.92, 0.75), emit_strength=3.0)),
        box("rail", (0.03, 0.03, W), (0, 0.1 + D - 0.06, 0.95), m["steel"]),
    ]
    parts[-1].rotation_euler = (0, math.pi / 2, 0)
    # call panel and indicator
    parts += [
        box("panel", (0.1, 0.01, 0.22), (W / 2 + 0.25, -0.005, 1.1), brushed, bevel=0.002),
        box("ind", (0.4, 0.02, 0.1), (0, -0.11, H + 0.22), frame_m, bevel=0.003),
    ]
    frame = join(parts, "ElevatorFrame")
    btn_up = cyl("up", 0.014, 0.008, (W / 2 + 0.25, -0.012, 1.14), (math.pi / 2, 0, 0), mat("Glow_Button", (0.9, 0.6, 0.2), 0.3, emit=(1.0, 0.55, 0.15), emit_strength=3.0), 20)
    btn_dn = cyl("dn", 0.014, 0.008, (W / 2 + 0.25, -0.012, 1.06), (math.pi / 2, 0, 0), m["steel"], 20)
    ind = box("indface", (0.3, 0.004, 0.06), (0, -0.122, H + 0.22), mat("Glow_Indicator", (0.8, 0.2, 0.1), 0.3, emit=(1.0, 0.18, 0.08), emit_strength=2.0))
    join([btn_up, btn_dn, ind], "ElevatorLights")
    dl = box("DoorL", (W / 2, 0.03, H), (-W / 4, -0.03, H / 2), brushed, bevel=0.002)
    dr = box("DoorR", (W / 2, 0.03, H), (W / 4, -0.03, H / 2), brushed, bevel=0.002)
    apply_modifiers(dl)
    apply_modifiers(dr)
    export("elevator")
    preview("elevator", (0, 0, 1.1), 4.2, 5, -25)


# ------------------------------------------------------------------ level props
def office_chair():
    reset()
    fabric = mat("ChairFabric", (0.12, 0.13, 0.16), 0.9)
    plastic = mat("ChairPlastic", (0.05, 0.05, 0.05), 0.45)
    chrome = mat("Chrome", (0.8, 0.8, 0.8), 0.15, 1.0)
    parts = [
        box("seat", (0.48, 0.46, 0.08), (0, 0, 0.47), fabric, bevel=0.03, segs=3),
        box("back", (0.44, 0.06, 0.5), (0, 0.24, 0.8), fabric, bevel=0.03, segs=3),
        box("spine", (0.06, 0.03, 0.3), (0, 0.24, 0.52), plastic),
        cyl("gas", 0.025, 0.3, (0, 0, 0.29), (0, 0, 0), chrome, 16),
        cyl("hub", 0.04, 0.05, (0, 0, 0.12), (0, 0, 0), plastic, 16),
    ]
    parts[1].rotation_euler = (math.radians(-8), 0, 0)
    for k in range(5):
        a = k / 5 * 2 * math.pi
        leg = box("leg", (0.04, 0.3, 0.03), (math.sin(a) * 0.15, math.cos(a) * 0.15, 0.1), plastic)
        leg.rotation_euler = (0, 0, -a)
        parts.append(leg)
        parts.append(sphere("caster", 0.028, (math.sin(a) * 0.3, math.cos(a) * 0.3, 0.03), plastic, segs=10, rings=6))
    ob = join(parts, "OfficeChair")
    shade_smooth(ob, 40)
    ob.rotation_euler = (0, math.radians(12), math.radians(20))  # tipped slightly, abandoned
    export("office_chair")
    preview("office_chair", (0, 0, 0.5), 2.0, 15, -30)


def wet_floor_sign():
    reset()
    tex = label_texture(TMP / "wetfloor.png", [("CAUTION", 70), ("WET FLOOR", 56)], (228, 180, 12), (20, 18, 10), (512, 512))
    yel = image_mat("SignYellow", tex, 0.45)
    parts = []
    for s in (-1, 1):
        bm = bmesh.new()
        uvl = bm.loops.layers.uv.new("UVMap")
        vs = [bm.verts.new(p) for p in ((-0.15, s * 0.14, 0.0), (0.15, s * 0.14, 0.0), (0.12, s * 0.01, 0.62), (-0.12, s * 0.01, 0.62))]
        f = bm.faces.new(vs if s < 0 else vs[::-1])
        for lp, uv in zip(f.loops, ((0, 0), (1, 0), (0.9, 1), (0.1, 1)) if s < 0 else ((0.1, 1), (0.9, 1), (1, 0), (0, 0))):
            lp[uvl].uv = uv
        ob = new_obj("panel", bm, yel)
        sol = ob.modifiers.new("s", "SOLIDIFY")
        sol.thickness = 0.008
        apply_modifiers(ob)
        parts.append(ob)
    parts.append(box("hinge", (0.24, 0.03, 0.03), (0, 0, 0.63), mat("SignPlastic", (0.9, 0.7, 0.05), 0.5), bevel=0.01))
    join(parts, "WetFloor")
    export("wet_floor_sign")
    preview("wet_floor_sign", (0, 0, 0.3), 1.3, 10, -30)


def crate():
    reset()
    rng = random.Random(4)
    parts = []
    W, D, H = 1.0, 0.8, 0.7
    tones = [mat(f"Wood{i}", (0.42 + 0.06 * i, 0.3 + 0.04 * i, 0.17 + 0.02 * i), 0.8) for i in range(4)]
    for side in (-1, 1):
        for k in range(5):
            z = 0.07 + k * (H - 0.08) / 5 + 0.06
            parts.append(box("plank", (W, 0.02, 0.12), (0, side * D / 2, z), rng.choice(tones), bevel=0.003))
            parts.append(box("plank", (0.02, D, 0.12), (side * W / 2, 0, z), rng.choice(tones), bevel=0.003))
    for k in range(6):
        parts.append(box("lid", (W, D / 6 - 0.01, 0.02), (0, -D / 2 + (k + 0.5) * D / 6, H + 0.01), rng.choice(tones), bevel=0.003))
    for sx in (-1, 1):
        for sy in (-1, 1):
            parts.append(box("post", (0.07, 0.07, H), (sx * (W / 2 - 0.02), sy * (D / 2 - 0.02), H / 2 + 0.01), tones[0], bevel=0.004))
    parts.append(box("inner", (W - 0.04, D - 0.04, H - 0.1), (0, 0, H / 2 + 0.03), mat("Dark", (0.02, 0.02, 0.02), 0.9)))
    ob = join(parts, "Crate")
    decimate(ob, 0.5)
    export("crate")
    preview("crate", (0, 0, 0.4), 3.0, 20, -35)


def pallet():
    reset()
    rng = random.Random(9)
    tones = [mat(f"Pal{i}", (0.5 + 0.05 * i, 0.4 + 0.04 * i, 0.26), 0.85) for i in range(3)]
    parts = []
    for k in range(7):
        parts.append(box("top", (1.2, 0.1, 0.02), (0, -0.5 + k * 1.0 / 6, 0.13), rng.choice(tones), bevel=0.002))
    for x in (-0.55, 0, 0.55):
        parts.append(box("str", (0.1, 1.0, 0.1), (x, 0, 0.07), rng.choice(tones), bevel=0.003))
    for k in range(3):
        parts.append(box("bot", (1.2, 0.1, 0.02), (0, -0.45 + k * 0.45, 0.01), rng.choice(tones), bevel=0.002))
    join(parts, "Pallet")
    export("pallet")


def lamp_highbay():
    reset()
    alu = mat("Aluminium", (0.7, 0.7, 0.68), 0.3, 1.0)
    bm = bmesh.new()
    prof = [(0.03, 0.0), (0.05, -0.02), (0.12, -0.08), (0.2, -0.2), (0.23, -0.28)]
    seg = 32
    rings = [[bm.verts.new((r * math.cos(a / seg * 2 * math.pi), r * math.sin(a / seg * 2 * math.pi), z)) for a in range(seg)] for r, z in prof]
    for k in range(len(rings) - 1):
        for a in range(seg):
            bm.faces.new((rings[k][a], rings[k + 1][a], rings[k + 1][(a + 1) % seg], rings[k][(a + 1) % seg]))
    bell = new_obj("bell", bm, alu)
    sol = bell.modifiers.new("s", "SOLIDIFY")
    sol.thickness = 0.003
    apply_modifiers(bell)
    shade_smooth(bell, 60)
    rod = cyl("rod", 0.012, 0.6, (0, 0, 0.3), (0, 0, 0), mat("Steel", (0.6, 0.6, 0.6), 0.4, 1.0), 12)
    box_ = cyl("ballast", 0.08, 0.1, (0, 0, 0.05), (0, 0, 0), alu, 24)
    bulb = sphere("bulb", 0.06, (0, 0, -0.15), mat("Bulb_Sodium", (1, 0.8, 0.5), 0.2, emit=(1.0, 0.62, 0.28), emit_strength=6.0), (1, 1, 1.4), 16, 10)
    hb = join([bell, rod, box_, bulb], "HighBay")
    decimate(hb, 0.35)
    export("lamp_highbay")
    preview("lamp_highbay", (0, 0, -0.1), 1.3, -10, -30)


def lamp_caged():
    reset()
    steel = mat("CageSteel", (0.2, 0.2, 0.19), 0.5, 1.0)
    base = cyl("base", 0.07, 0.04, (0, 0, -0.02), (0, 0, 0), steel, 24)
    socket = cyl("socket", 0.03, 0.05, (0, 0, -0.06), (0, 0, 0), mat("Porcelain", (0.85, 0.83, 0.78), 0.3), 16)
    bulb = sphere("bulb", 0.04, (0, 0, -0.12), mat("Bulb_Warm", (1, 0.9, 0.7), 0.2, emit=(1.0, 0.75, 0.45), emit_strength=5.0), (1, 1, 1.3), 16, 10)
    parts = [base, socket, bulb]
    for z, r in ((-0.06, 0.07), (-0.12, 0.075), (-0.18, 0.06)):
        parts.append(torus("ring", r, 0.003, (0, 0, z), (0, 0, 0), steel, 24, 6))
    for k in range(6):
        a = k / 6 * 2 * math.pi
        w = wire("bar", [(0.07 * math.cos(a), 0.07 * math.sin(a), -0.04), (0.078 * math.cos(a), 0.078 * math.sin(a), -0.12), (0.05 * math.cos(a), 0.05 * math.sin(a), -0.2), (0, 0, -0.215)], 0.003, steel)
        parts.append(w)
    cl = join(parts, "CagedLamp")
    decimate(cl, 0.2)
    export("lamp_caged")
    preview("lamp_caged", (0, 0, -0.1), 0.7, 10, -30)


def pipe_valve():
    reset()
    red = mat("ValveRed", (0.5, 0.06, 0.04), 0.5, 0.3)
    iron = mat("tex:l2_pipe", (0.35, 0.33, 0.3), 0.6, 0.6)
    body = sphere("body", 0.09, (0, 0, 0), iron, (1, 1.2, 1), 20, 12)
    neck = cyl("stem", 0.03, 0.16, (0, 0, 0.1), (0, 0, 0), iron, 16)
    wheel = torus("wheel", 0.11, 0.012, (0, 0, 0.19), (0, 0, 0), red, 32, 8)
    spokes = []
    for k in range(4):
        s = box("spoke", (0.22, 0.012, 0.01), (0, 0, 0.19), red)
        s.rotation_euler = (0, 0, k * math.pi / 4)
        spokes.append(s)
    hub = cyl("hub", 0.02, 0.03, (0, 0, 0.19), (0, 0, 0), red, 12)
    flanges = [cyl("fl", 0.12, 0.03, (0, s * 0.11, 0), (math.pi / 2, 0, 0), iron, 24) for s in (-1, 1)]
    ob = join([body, neck, wheel, hub] + spokes + flanges, "Valve")
    shade_smooth(ob, 40)
    auto_uv(ob, 2.0)
    export("pipe_valve")
    preview("pipe_valve", (0, 0, 0.08), 0.9, 25, -30)


def pipe_gauge():
    reset()
    tex = TMP / "gauge.png"
    img = Image.new("RGB", (256, 256), (230, 226, 210))
    d = ImageDraw.Draw(img)
    d.ellipse([6, 6, 250, 250], outline=(20, 20, 20), width=6)
    for k in range(11):
        a = math.radians(225 - k * 27)
        r0, r1 = 100, 118
        d.line([(128 + r0 * math.cos(a), 128 - r0 * math.sin(a)), (128 + r1 * math.cos(a), 128 - r1 * math.sin(a))], fill=(20, 20, 20), width=4)
    d.arc([22, 22, 234, 234], -45 - 50, -45, fill=(190, 20, 10), width=10)
    a = math.radians(225 - 8.7 * 27)
    d.line([(128, 128), (128 + 95 * math.cos(a), 128 - 95 * math.sin(a))], fill=(160, 20, 10), width=6)
    d.ellipse([118, 118, 138, 138], fill=(20, 20, 20))
    f = font(FONT_B, 22)
    d.text((100, 170), "PSI", fill=(20, 20, 20), font=f)
    tex.parent.mkdir(parents=True, exist_ok=True)
    img.save(tex)
    body = cyl("case", 0.06, 0.03, (0, -0.015, 0), (math.pi / 2, 0, 0), mat("Brass", (0.75, 0.6, 0.35), 0.35, 1.0), 32)
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    n = 32
    c = bm.verts.new((0, -0.0305, 0))
    ring = [bm.verts.new((0.055 * math.cos(a / n * 2 * math.pi), -0.0305, 0.055 * math.sin(a / n * 2 * math.pi))) for a in range(n)]
    for a in range(n):
        f = bm.faces.new((c, ring[(a + 1) % n], ring[a]))
        for lp in f.loops:
            co = lp.vert.co
            lp[uvl].uv = (0.5 + co.x / 0.11, 0.5 + co.z / 0.11)
    face = new_obj("face", bm, image_mat("GaugeFace", tex, 0.2))
    stem = cyl("stem", 0.01, 0.08, (0, -0.015, -0.09), (0, 0, 0), mat("Brass", (0.75, 0.6, 0.35), 0.35, 1.0), 12)
    join([body, face, stem], "Gauge")
    export("pipe_gauge")
    preview("pipe_gauge", (0, 0, 0), 0.4, 10, -10)


def pipe_bracket():
    reset()
    steel = mat("tex:l2_pipe", (0.3, 0.3, 0.3), 0.6, 0.7)
    strap = torus("strap", 0.105, 0.006, (0, 0, 0), (math.pi / 2, 0, 0), steel, 32, 6)
    rod = cyl("rod", 0.008, 0.4, (0, 0, 0.3), (0, 0, 0), steel, 8)
    ob = join([strap, rod], "Bracket")
    auto_uv(ob, 2)
    export("pipe_bracket")


ALL = [outlet_duplex, outlet_twoprong, outlet_gfci, outlet_broken, switch_plate, floor_box, troffer, troffer_hanging,
       vent_ceiling, vent_wall, almond_water, exit_door, hatch, elevator, office_chair, wet_floor_sign, crate, pallet,
       lamp_highbay, lamp_caged, pipe_valve, pipe_gauge, pipe_bracket]


# ------------------------------------------------------------------ hub base
def lockers():
    """Row of 5 old steel school/staff lockers: chipped green-grey paint, rust running from vents and hinges,
    dents, a padlock on one. Origin: floor, back against the wall, facing -Y."""
    reset()
    m = M()
    paint = bpy.data.materials.new("LockerPaint")
    BK.paint_metal(paint, (0.2, 0.26, 0.23), rust=0.7, chip=0.8, streaks=0.9)
    parts = []
    W, H, D = 0.38, 1.85, 0.45
    rng = __import__("random").Random(5)
    for k in range(5):
        x = (k - 2) * W
        parts.append(box("body", (W - 0.004, D, H), (x, -D / 2, H / 2 + 0.08), paint, bevel=0.006))
        door = box("door", (W - 0.03, 0.014, H - 0.06), (x, -D - 0.004, H / 2 + 0.08), paint, bevel=0.004)
        vents = [box("vent", (W - 0.12, 0.03, 0.009), (x, -D - 0.008, H - 0.1 - v * 0.028), paint) for v in range(6)]
        vents += [box("vent", (W - 0.12, 0.03, 0.009), (x, -D - 0.008, 0.3 - v * 0.028), paint) for v in range(4)]
        cut_many(door, vents)
        # a dent in some doors
        if rng.random() < 0.5:
            for vt in door.data.vertices:
                d = ((vt.co.x - x) ** 2 + (vt.co.z - 0.9) ** 2) ** 0.5
                if d < 0.12 and vt.co.y < -D:
                    vt.co.y += 0.01 * (1 - d / 0.12)
        parts.append(door)
        parts.append(box("handle", (0.022, 0.035, 0.13), (x + W / 2 - 0.05, -D - 0.022, 1.0), paint, bevel=0.005))
        for hz in (0.35, 1.0, 1.65):
            parts.append(cyl("hinge", 0.008, 0.06, (x - W / 2 + 0.02, -D - 0.01, hz), (0, 0, 0), paint, 8))
        parts.append(box("plate", (0.07, 0.004, 0.028), (x, -D - 0.013, 1.55), paint))
    lock = cyl("padlock", 0.022, 0.012, (0.02 + W / 2 - 0.05, -D - 0.05, 0.93), (1.5708, 0, 0), m["steel"], 16)
    shackle = torus("shackle", 0.014, 0.003, (0.02 + W / 2 - 0.05, -D - 0.05, 0.955), (1.5708, 0, 0), m["steel"])
    parts += [lock, shackle]
    parts.append(box("base", (5 * W, D, 0.08), (0, -D / 2, 0.04), paint))
    ob = join(parts, "Lockers")
    BK.bake_prop(ob, "lockers", 1024)
    export("lockers")


def armchair():
    """The lone worn armchair: a faded mustard 70s/80s club chair with rolled arms, a sagging seat cushion,
    button tufting and short tapered wooden legs. Origin: floor centre, facing -Y."""
    reset()
    fab = bpy.data.materials.new("ArmchairFabric")
    BK.upholstery(fab, (0.42, 0.28, 0.08), wear=0.7, stains=0.6, rib=0.8)
    leg = bpy.data.materials.new("ArmchairLeg")
    BK.wood(leg, (0.22, 0.12, 0.05))
    parts = [
        box("base", (0.86, 0.8, 0.26), (0, 0, 0.29), fab, bevel=0.06, segs=4),
        box("back", (0.86, 0.22, 0.62), (0, 0.32, 0.68), fab, bevel=0.09, segs=4),
        box("armL", (0.17, 0.78, 0.36), (-0.4, 0.01, 0.5), fab, bevel=0.075, segs=4),
        box("armR", (0.17, 0.78, 0.36), (0.4, 0.01, 0.5), fab, bevel=0.075, segs=4),
        box("seat", (0.62, 0.62, 0.13), (0, -0.06, 0.47), fab, bevel=0.05, segs=4),
        box("backcushion", (0.6, 0.12, 0.44), (0, 0.19, 0.74), fab, bevel=0.05, segs=4),
    ]
    for p in parts:
        p.modifiers.new("sub", "SUBSURF").levels = 2
    # sag the seat cushion and tuft the back with buttons
    seat, bc = parts[4], parts[5]
    for vt in seat.data.vertices:
        d = (vt.co.x ** 2 + (vt.co.y + 0.06) ** 2) ** 0.5
        if vt.co.z > 0.47:
            vt.co.z -= 0.035 * max(0.0, 1 - d / 0.35)
    btn = mat("ArmchairButton", (0.25, 0.16, 0.05), 0.6)
    for bx in (-0.17, 0.0, 0.17):
        for bz in (0.62, 0.84):
            parts.append(sphere("button", 0.012, (bx, 0.125, bz), btn, (1, 0.6, 1), 8, 6))
    for sx in (-0.36, 0.36):
        for sy in (-0.32, 0.32):
            parts.append(cyl("leg", 0.022, 0.16, (sx, sy, 0.08), (0, 0, 0), leg, 10, r2=0.014))
    ob = join(parts, "Armchair")
    shade_smooth(ob, 60)
    BK.bake_prop(ob, "armchair", 1024)
    export("armchair")


def kiosk():
    """Supply kiosk / vending terminal with a glowing screen. Origin floor centre, facing -Y."""
    reset()
    m = M()
    body = mat("KioskBody", (0.62, 0.6, 0.55), 0.5, 0.3)
    parts = [box("cab", (0.9, 0.7, 1.9), (0, 0, 0.95), body, bevel=0.02)]
    glass = box("window", (0.62, 0.02, 1.0), (-0.08, -0.355, 1.2), mat("KioskGlass", (0.05, 0.07, 0.08), 0.05, 0.2), bevel=0.004)
    parts.append(glass)
    for r in range(4):
        parts.append(box("shelf", (0.6, 0.3, 0.01), (-0.08, -0.2, 0.78 + r * 0.24), m["steel"]))
        for c in range(4):
            parts.append(cyl("can", 0.03, 0.12, (-0.3 + c * 0.14, -0.25, 0.85 + r * 0.24), (0, 0, 0), mat(f"Item{(r + c) % 3}", [(0.8, 0.7, 0.4), (0.6, 0.2, 0.15), (0.3, 0.5, 0.6)][(r + c) % 3], 0.4), 12))
    parts.append(box("screen", (0.16, 0.02, 0.1), (0.33, -0.36, 1.35), mat("Glow_Kiosk", (0.2, 1, 0.5), 0.3, emit=(0.25, 1.0, 0.55), emit_strength=3.0)))
    parts.append(box("keypad", (0.14, 0.02, 0.18), (0.33, -0.36, 1.12), m["steel"], bevel=0.004))
    parts.append(box("slot", (0.5, 0.05, 0.12), (-0.08, -0.34, 0.35), m["dark"]))
    parts.append(box("sign", (0.86, 0.02, 0.2), (0, -0.36, 1.8), mat("Glow_KioskSign", (1, 0.8, 0.3), 0.3, emit=(1.0, 0.72, 0.25), emit_strength=2.5)))
    join(parts, "Kiosk")
    export("kiosk")
    preview("kiosk", (0, 0, 1.0), 3.2, 8, -30)


def bulletin_board():
    """Cork board 1.6 x 1.0, wall mounted: origin at its back centre, facing -Y."""
    reset()
    wood = mat("BoardFrame", (0.35, 0.22, 0.12), 0.6)
    cork = mat("Cork", (0.62, 0.45, 0.28), 0.95)
    parts = [box("cork", (1.5, 0.02, 0.9), (0, -0.012, 0), cork)]
    for sx, sz, lx, lz in ((1.6, 0.05, 0, 0.475), (1.6, 0.05, 0, -0.475), (0.05, 1.0, 0.775, 0), (0.05, 1.0, -0.775, 0)):
        parts.append(box("frame", (sx, 0.035, sz), (lx, -0.018, lz), wood, bevel=0.006))
    join(parts, "Board")
    export("bulletin_board")
    preview("bulletin_board", (0, 0, 0), 2.4, 5, -15)


def couch():
    """Old three-seat sofa: soft rolled shapes, sagging cushions, faded brown corduroy."""
    reset()
    fab = bpy.data.materials.new("CouchFabric")
    BK.upholstery(fab, (0.24, 0.17, 0.11), wear=0.6, stains=0.55, rib=1.0)
    leg = bpy.data.materials.new("CouchLeg")
    BK.wood(leg, (0.12, 0.07, 0.04))
    parts = [
        box("seat", (1.8, 0.8, 0.22), (0, 0, 0.3), fab, bevel=0.06, segs=4),
        box("back", (1.8, 0.24, 0.6), (0, 0.3, 0.62), fab, bevel=0.09, segs=4),
        box("armL", (0.2, 0.82, 0.5), (-0.9, 0, 0.45), fab, bevel=0.09, segs=4),
        box("armR", (0.2, 0.82, 0.5), (0.9, 0, 0.45), fab, bevel=0.09, segs=4),
    ]
    cushions = []
    for k in range(3):
        c = box("cushion", (0.56, 0.7, 0.13), (-0.58 + k * 0.58, -0.02, 0.475), fab, bevel=0.05, segs=4)
        cushions.append(c)
        parts.append(c)
        parts.append(box("backcushion", (0.55, 0.14, 0.42), (-0.58 + k * 0.58, 0.16, 0.73), fab, bevel=0.06, segs=4))
    for p in parts:
        p.modifiers.new("sub", "SUBSURF").levels = 2
    for k, c in enumerate(cushions):
        cx = -0.58 + k * 0.58
        for vt in c.data.vertices:
            d = ((vt.co.x - cx) ** 2 + (vt.co.y + 0.05) ** 2) ** 0.5
            if vt.co.z > 0.47:
                vt.co.z -= (0.03 + 0.015 * (k == 1)) * max(0.0, 1 - d / 0.3)
    for sx in (-0.85, 0.85):
        for sy in (-0.3, 0.3):
            parts.append(cyl("foot", 0.025, 0.2, (sx, sy, 0.1), (0, 0, 0), leg, 10, r2=0.016))
    ob = join(parts, "Couch")
    shade_smooth(ob, 60)
    BK.bake_prop(ob, "couch", 1024)
    export("couch")


def safe_sign():
    reset()
    tex = TMP / "safe_sign.png"
    img = Image.new("RGB", (1024, 256), (8, 30, 14))
    d = ImageDraw.Draw(img)
    f = font(FONT_C, 150)
    w = d.textlength("SAFE ZONE", font=f)
    d.text(((1024 - w) / 2, 40), "SAFE ZONE", fill=(90, 255, 140), font=f)
    tex.parent.mkdir(parents=True, exist_ok=True)
    img.save(tex)
    housing = box("housing", (1.3, 0.06, 0.34), (0, -0.03, 0), mat("SignHousing", (0.1, 0.1, 0.1), 0.5), bevel=0.01)
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    vs = [bm.verts.new(p) for p in ((-0.62, -0.0605, -0.15), (0.62, -0.0605, -0.15), (0.62, -0.0605, 0.15), (-0.62, -0.0605, 0.15))]
    fc = bm.faces.new(vs)
    for lp, uv in zip(fc.loops, ((0, 0), (1, 0), (1, 1), (0, 1))):
        lp[uvl].uv = uv
    face = new_obj("face", bm, image_mat("Glow_Safe", tex, 0.3, emissive=True))
    join([housing, face], "SafeSign")
    export("safe_sign")
    preview("safe_sign", (0, 0, 0), 2.0, 0, 0)


ALL += [lockers, kiosk, bulletin_board, couch, safe_sign, armchair]
