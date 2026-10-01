"""Organic characters: skin-modifier bodies on generated skeletons, weighted by
bone distance, with keyframed clips exported to glTF.

Characters face Blender -Y (three.js +Z).
"""
import math
import random

import bpy  # noqa: F401
import bmesh
from mathutils import Vector

from common import *  # noqa


# ------------------------------------------------------------------ noise for skin colour
def _hash(x, y, z):
    h = math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453
    return h - math.floor(h)


def vnoise(p, f):
    x, y, z = p.x * f, p.y * f, p.z * f
    xi, yi, zi = math.floor(x), math.floor(y), math.floor(z)
    xf, yf, zf = x - xi, y - yi, z - zi
    u = xf * xf * (3 - 2 * xf)
    v = yf * yf * (3 - 2 * yf)
    w = zf * zf * (3 - 2 * zf)
    def c(a, b, cc):
        return _hash(xi + a, yi + b, zi + cc)
    x00 = c(0, 0, 0) * (1 - u) + c(1, 0, 0) * u
    x10 = c(0, 1, 0) * (1 - u) + c(1, 1, 0) * u
    x01 = c(0, 0, 1) * (1 - u) + c(1, 0, 1) * u
    x11 = c(0, 1, 1) * (1 - u) + c(1, 1, 1) * u
    return (x00 * (1 - v) + x10 * v) * (1 - w) + (x01 * (1 - v) + x11 * v) * w


def fbm3(p, f=4, o=4):
    a, t, s = 0.5, 0.0, 0.0
    for _ in range(o):
        t += a * vnoise(p, f)
        s += a
        a *= 0.5
        f *= 2.0
    return t / s


# ------------------------------------------------------------------ skeleton -> skinned mesh
def mirror(spec):
    """Duplicate every '.L' joint as '.R' with x negated."""
    out = dict(spec)
    for k, (parent, pos, r) in spec.items():
        if k.endswith(".L"):
            p = parent[:-2] + ".R" if parent and parent.endswith(".L") else parent
            out[k[:-2] + ".R"] = (p, (-pos[0], pos[1], pos[2]), r)
    return out


def build_body(name, spec, subdiv=1, steps=3, material=None):
    """spec: joint -> (parent, (x,y,z), radius or (rx, ry))."""
    bm = bmesh.new()
    idx = {}
    radii = []
    order = list(spec.keys())
    for j in order:
        parent, pos, r = spec[j]
        idx[j] = bm.verts.new(pos)
        radii.append(r)
    bm.verts.ensure_lookup_table()
    extra = []
    for j in order:
        parent, pos, r = spec[j]
        if not parent:
            continue
        pp, _, pr = spec[parent][1], None, spec[parent][2]
        prev = idx[parent]
        for s in range(1, steps):
            t = s / steps
            p = Vector(pp).lerp(Vector(pos), t)
            v = bm.verts.new(p)
            ra = pr if not isinstance(pr, tuple) else pr
            rb = r
            if isinstance(ra, tuple) or isinstance(rb, tuple):
                ra2 = ra if isinstance(ra, tuple) else (ra, ra)
                rb2 = rb if isinstance(rb, tuple) else (rb, rb)
                rr = (ra2[0] + (rb2[0] - ra2[0]) * t, ra2[1] + (rb2[1] - ra2[1]) * t)
            else:
                rr = ra + (rb - ra) * t
            extra.append(rr)
            bm.edges.new((prev, v))
            prev = v
        bm.edges.new((prev, idx[j]))
    me = bpy.data.meshes.new(name + "_skel")
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name + "_skel", me)
    link(ob)
    sk = ob.modifiers.new("skin", "SKIN")
    sk.use_smooth_shade = True
    allr = radii + extra
    for i, r in enumerate(allr):
        rr = r if isinstance(r, tuple) else (r, r)
        me.skin_vertices[0].data[i].radius = rr
    me.skin_vertices[0].data[0].use_root = True
    ss = ob.modifiers.new("sub", "SUBSURF")
    ss.levels = subdiv
    ss.render_levels = subdiv
    dg = bpy.context.evaluated_depsgraph_get()
    body_me = bpy.data.meshes.new_from_object(ob.evaluated_get(dg))
    bpy.data.objects.remove(ob, do_unlink=True)
    body = bpy.data.objects.new(name, body_me)
    link(body)
    if material:
        body_me.materials.append(material)
    for p in body_me.polygons:
        p.use_smooth = True
    return body


def skin_material(name, base_rgb, rough=0.5, spec_tint=None):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes["Principled BSDF"]
    ca = nt.nodes.new("ShaderNodeVertexColor")
    ca.layer_name = "Col"
    mix = nt.nodes.new("ShaderNodeMix")
    mix.data_type = "RGBA"
    mix.blend_type = "MULTIPLY"
    mix.inputs["Factor"].default_value = 1.0
    mix.inputs[6].default_value = (*base_rgb, 1)
    nt.links.new(ca.outputs["Color"], mix.inputs[7])
    nt.links.new(mix.outputs[2], b.inputs["Base Color"])
    b.inputs["Roughness"].default_value = rough
    return m


def paint_vertices(ob, fn):
    me = ob.data
    if "Col" not in me.color_attributes:
        me.color_attributes.new("Col", "BYTE_COLOR", "POINT")
    ca = me.color_attributes["Col"]
    for v in me.vertices:
        c = fn(v.co)
        ca.data[v.index].color = (*c, 1.0)


def build_armature(name, spec):
    arm_d = bpy.data.armatures.new(name + "_rig")
    arm = bpy.data.objects.new(name + "_rig", arm_d)
    link(arm)
    bpy.context.view_layer.objects.active = arm
    for o in bpy.context.selected_objects:
        o.select_set(False)
    arm.select_set(True)
    bpy.ops.object.mode_set(mode="EDIT")
    ebs = {}
    root_j = next(j for j, v in spec.items() if not v[0])
    rp = Vector(spec[root_j][1])
    rb = arm_d.edit_bones.new(root_j)
    rb.head = rp
    rb.tail = rp + Vector((0, 0, 0.12))
    rb.align_roll(Vector((0, -1, 0)))
    ebs[root_j] = rb
    for j, (parent, pos, r) in spec.items():
        if not parent:
            continue
        eb = arm_d.edit_bones.new(j)
        eb.head = Vector(spec[parent][1])
        eb.tail = Vector(pos)
        if (eb.tail - eb.head).length < 1e-4:
            eb.tail = eb.head + Vector((0, 0, 0.01))
        ebs[j] = eb
    for j, (parent, pos, r) in spec.items():
        if not parent:
            continue
        eb = ebs[j]
        # parent is the bone that ends at our head joint
        eb.parent = ebs[parent]
        eb.use_connect = False
        d = (eb.tail - eb.head).normalized()
        z = Vector((1, 0, 0)).cross(d)
        if z.length < 0.2:
            z = Vector((0, 0, 1)) if abs(d.z) < 0.9 else Vector((0, -1, 0))
        eb.align_roll(z.normalized())
    bpy.ops.object.mode_set(mode="OBJECT")
    for pb in arm.pose.bones:
        pb.rotation_mode = "XYZ"
    return arm


def seg_dist(p, a, b):
    ab = b - a
    t = max(0.0, min(1.0, (p - a).dot(ab) / max(ab.length_squared, 1e-9)))
    return (a + ab * t - p).length


def skin_to(body, arm, spec, rigid=None, exclude=()):
    """Distance-based weights, top-3 bones. rigid: {vertex_index: bone} overrides."""
    bones = []
    root_j = next(j for j, v in spec.items() if not v[0])
    for j, (parent, pos, r) in spec.items():
        if not parent or j in exclude:
            continue
        bones.append((j, Vector(spec[parent][1]), Vector(pos)))
    groups = {j: body.vertex_groups.new(name=j) for j, _, _ in bones}
    groups[root_j] = body.vertex_groups.new(name=root_j)
    for v in body.data.vertices:
        if rigid and v.index in rigid:
            groups[rigid[v.index]].add([v.index], 1.0, "REPLACE")
            continue
        ds = sorted(((seg_dist(v.co, a, b), j) for j, a, b in bones))[:3]
        ws = [(1.0 / (d * d + 1e-4)) ** 2 for d, _ in ds]
        s = sum(ws)
        for (d, j), w in zip(ds, ws):
            if w / s > 0.02:
                groups[j].add([v.index], w / s, "REPLACE")
    md = body.modifiers.new("arm", "ARMATURE")
    md.object = arm
    body.parent = arm


def add_rigid(body, parts, bone):
    """Join extra meshes into body; return {vertex_index: bone} for them."""
    n0 = len(body.data.vertices)
    for o in bpy.context.selected_objects:
        o.select_set(False)
    for p in parts:
        apply_modifiers(p) if p.modifiers else None
        p.select_set(True)
    body.select_set(True)
    bpy.context.view_layer.objects.active = body
    bpy.ops.object.join()
    return {i: bone for i in range(n0, len(body.data.vertices))}


# ------------------------------------------------------------------ animation
def make_clip(arm, name, frames, pose_fn, loop=True):
    act = bpy.data.actions.new(name)
    act.use_fake_user = True
    if arm.animation_data is None:
        arm.animation_data_create()
    arm.animation_data.action = act
    n = frames
    for f in range(n + (1 if loop else 0)):
        t = (f % n) / n if loop else f / max(n - 1, 1)
        for pb in arm.pose.bones:
            pb.rotation_euler = (0, 0, 0)
            pb.location = (0, 0, 0)
        pose_fn(arm.pose.bones, t, f)
        for pb in arm.pose.bones:
            pb.keyframe_insert("rotation_euler", frame=f + 1)
            if pb.parent is None:
                pb.keyframe_insert("location", frame=f + 1)
    # push to NLA so the exporter sees every action
    tr = arm.animation_data.nla_tracks.new()
    tr.name = name
    tr.strips.new(name, 1, act)
    arm.animation_data.action = None
    return act


def rot(pb, x=0.0, y=0.0, z=0.0):
    e = pb.rotation_euler
    pb.rotation_euler = (e[0] + x, e[1] + y, e[2] + z)


def B(bones, name):
    return bones.get(name)


TAU = math.tau


def finalize(name, arm, body, animations=True):
    body.name = name
    for pb in arm.pose.bones:
        pb.rotation_euler = (0, 0, 0)
        pb.location = (0, 0, 0)
    export(name.lower(), [arm], animations=animations)


# ------------------------------------------------------------------ crawler / hound
def crawler_spec(six=False, neck_len=0.2, scale=1.0):
    s = {
        "hips": (None, (0, 0.35, 0.72), (0.11, 0.1)),
        "spine1": ("hips", (0, 0.05, 0.76), (0.075, 0.07)),
        "spine2": ("spine1", (0, -0.25, 0.8), (0.14, 0.12)),
        "neck": ("spine2", (0, -0.25 - neck_len, 0.84), 0.045),
        "head": ("neck", (0, -0.35 - neck_len * 1.3, 0.8), (0.085, 0.1)),
        "snout": ("head", (0, -0.5 - neck_len * 1.3, 0.74), (0.065, 0.06)),
        "hip.L": ("hips", (0.11, 0.37, 0.7), 0.075),
        "thigh.L": ("hip.L", (0.22, 0.12, 0.42), 0.05),
        "shin.L": ("thigh.L", (0.2, 0.46, 0.08), 0.032),
        "foot.L": ("shin.L", (0.2, 0.3, 0.012), 0.022),
        "shoulder.L": ("spine2", (0.17, -0.22, 0.82), 0.06),
        "upperarm.L": ("shoulder.L", (0.4, -0.28, 0.58), 0.036),
        "forearm.L": ("upperarm.L", (0.32, -0.5, 0.06), 0.028),
        "hand.L": ("forearm.L", (0.32, -0.6, 0.02), 0.026),
    }
    for k, dx in enumerate((-0.035, 0.0, 0.035)):
        s[f"fingerA{k}.L"] = ("hand.L", (0.32 + dx, -0.7, 0.012), 0.011)
        s[f"fingerB{k}.L"] = (f"fingerA{k}.L", (0.32 + dx * 1.3, -0.8, 0.004), 0.008)
    if six:
        s["shoulder2.L"] = ("spine1", (0.13, -0.02, 0.8), 0.05)
        s["upperarm2.L"] = ("shoulder2.L", (0.42, 0.0, 0.62), 0.03)
        s["forearm2.L"] = ("upperarm2.L", (0.5, -0.12, 0.04), 0.024)
        s["hand2.L"] = ("forearm2.L", (0.5, -0.24, 0.01), 0.018)
    s = mirror(s)
    if scale != 1.0:
        s = {k: (p, tuple(c * scale for c in pos), tuple(x * scale for x in r) if isinstance(r, tuple) else r * scale) for k, (p, pos, r) in s.items()}
    return s


def crawler_face(spec, mouth_mat, tooth_mat, eye_mat):
    hp = Vector(spec["head"][1])
    sp = Vector(spec["snout"][1])
    parts = []
    parts.append(sphere("mouth", 0.06, tuple(sp + Vector((0, -0.035, -0.04))), mouth_mat, (1.2, 0.7, 1.0), 16, 10))
    rng = random.Random(5)
    for row, dz in ((0, 0.0), (1, -0.05)):
        for k in range(14):
            a = (k / 13 - 0.5) * 2.6
            p = sp + Vector((math.sin(a) * 0.07, -0.035 - math.cos(a) * 0.045, -0.01 + dz * 1.5))
            t = cyl("tooth", 0.005, rng.uniform(0.025, 0.045), tuple(p), (0, 0, 0), tooth_mat, 6, r2=0.0005)
            if row == 0:
                t.rotation_euler = (math.pi, 0, 0)
            t.rotation_euler[0] += rng.uniform(-0.3, 0.3)
            parts.append(t)
    for sx in (-1, 1):
        parts.append(sphere("eye", 0.018, tuple(hp + Vector((sx * 0.045, -0.07, 0.025))), eye_mat, (1, 0.6, 0.8), 10, 8))
    return parts


def skin_paint(base_var=0.25, bruise=(0.55, 0.35, 0.4), vein=(0.45, 0.42, 0.5)):
    def f(co):
        n = fbm3(co, 6, 4)
        v = abs(vnoise(co, 22) - 0.5) < 0.03
        c = [1.0 - base_var * 0.5 + base_var * n] * 3
        b = max(0.0, fbm3(co + Vector((5, 5, 5)), 3, 3) - 0.55) * 2.5
        c = [c[i] * (1 - b) + bruise[i] * b for i in range(3)]
        if v:
            c = [c[i] * 0.8 + vein[i] * 0.2 for i in range(3)]
        return c
    return f


def crawl_pose(six=False):
    def fn(bones, t, f):
        ph = t * TAU
        hips = B(bones, "hips")
        hips.location = (math.sin(ph * 2) * 0.006, 0, abs(math.sin(ph)) * 0.02)
        rot(hips, y=math.sin(ph) * 0.12)
        rot(B(bones, "spine1"), z=math.sin(ph) * 0.1)
        rot(B(bones, "spine2"), z=-math.sin(ph) * 0.14, x=math.sin(ph * 2) * 0.04)
        rot(B(bones, "neck"), z=math.sin(ph) * 0.15)
        rot(B(bones, "head"), x=math.sin(ph * 2 + 1) * 0.1, y=math.sin(ph * 0.5) * 0.2)
        for side, off in ((".L", 0.0), (".R", math.pi)):
            a = ph + off
            rot(B(bones, "upperarm" + side), x=math.sin(a) * 0.55, z=(1 if side == ".L" else -1) * 0.1 * math.cos(a))
            rot(B(bones, "forearm" + side), x=max(0, math.cos(a)) * 0.6)
            rot(B(bones, "hand" + side), x=-math.sin(a) * 0.4)
            l = a + math.pi
            rot(B(bones, "thigh" + side), x=math.sin(l) * 0.5)
            rot(B(bones, "shin" + side), x=-max(0, math.cos(l)) * 0.7)
            for k in range(3):
                rot(B(bones, f"fingerA{k}{side}"), x=max(0, math.cos(a)) * 0.5)
            if six:
                a2 = a + math.pi * 0.5
                rot(B(bones, "upperarm2" + side), x=math.sin(a2) * 0.5)
                rot(B(bones, "forearm2" + side), x=max(0, math.cos(a2)) * 0.5)
    return fn


def twitch_pose(seed=3):
    rng = random.Random(seed)
    keys = sorted(rng.sample(range(80), 6))
    targets = [(rng.uniform(-0.5, 0.5), rng.uniform(-0.9, 0.9), rng.uniform(-0.4, 0.4)) for _ in keys]

    def fn(bones, t, f):
        ph = t * TAU
        rot(B(bones, "spine2"), x=math.sin(ph) * 0.03)
        rot(B(bones, "spine1"), x=-math.sin(ph) * 0.02)
        cur = (0, 0, 0)
        for k, tg in zip(keys, targets):
            if f >= k:
                cur = tg
        # snap twitch: jump to new orientation within a frame, hold
        rot(B(bones, "head"), x=cur[0] * 0.5, y=cur[1] * 0.6, z=cur[2] * 0.4)
        rot(B(bones, "neck"), y=cur[1] * 0.3)
        for side in (".L", ".R"):
            for k in range(3):
                rot(B(bones, f"fingerA{k}{side}"), x=0.2 + 0.2 * math.sin(ph * 3 + k))
    return fn


def lunge_pose(bones, t, f):
    # t: 0..1 over the clip. wind-up then explosive extension
    w = math.sin(min(t / 0.35, 1) * math.pi / 2)
    e = max(0, (t - 0.35) / 0.65)
    e = 1 - (1 - e) ** 3
    hips = B(bones, "hips")
    hips.location = (0, 0.06 * w - 0.25 * e, -0.08 * w + 0.12 * e)
    rot(B(bones, "spine2"), x=-0.25 * w + 0.35 * e)
    rot(B(bones, "head"), x=0.4 * w - 0.6 * e)
    for side in (".L", ".R"):
        rot(B(bones, "upperarm" + side), x=0.3 * w - 1.1 * e)
        rot(B(bones, "forearm" + side), x=0.6 * w - 0.4 * e)
        rot(B(bones, "thigh" + side), x=-0.4 * w + 0.6 * e)
        rot(B(bones, "shin" + side), x=0.6 * w - 0.5 * e)


def make_crawler(name, six=False, neck=0.2, skin=(0.78, 0.74, 0.7), scale=1.0, bruise=(0.55, 0.35, 0.4)):
    reset()
    spec = crawler_spec(six, neck, scale)
    skin_m = skin_material(name + "_Skin", skin, 0.42)
    body = build_body(name, spec, subdiv=1, steps=3, material=skin_m)
    paint_vertices(body, skin_paint(0.3, bruise))
    arm = build_armature(name, spec)
    face = crawler_face(spec, mat("Mouth", (0.08, 0.01, 0.01), 0.3), mat("Teeth", (0.75, 0.7, 0.55), 0.35), mat("EyeVoid", (0.0, 0.0, 0.0), 0.05))
    rigid = add_rigid(body, face, "head")
    skin_to(body, arm, spec, rigid)
    paint_vertices(body, lambda co: (1, 1, 1)) if False else None
    make_clip(arm, "crawl", 24, crawl_pose(six))
    make_clip(arm, "idle", 80, twitch_pose(len(name)))
    make_clip(arm, "lunge", 18, lunge_pose, loop=False)
    finalize(name, arm, body)
    return arm, body


def crawler():
    make_crawler("Crawler")
    preview("crawler", (0, -0.1, 0.45), 2.4, 12, -55)


def dweller():
    make_crawler("Dweller", six=True, neck=0.45, skin=(0.32, 0.24, 0.2), scale=1.15, bruise=(0.2, 0.05, 0.03))
    preview("dweller", (0, -0.1, 0.5), 2.8, 12, -55)


# ------------------------------------------------------------------ humanoids
def humanoid_spec(h=1.75, thin=1.0, hunch=0.0, arm_len=1.0, head_r=0.1):
    k = h / 1.75
    s = {
        "hips": (None, (0, 0, 0.98 * k), (0.15 * thin, 0.11 * thin)),
        "spine1": ("hips", (0, 0.0, 1.18 * k), (0.14 * thin, 0.1 * thin)),
        "spine2": ("spine1", (0, 0.01 + hunch * 0.1, 1.4 * k), (0.17 * thin, 0.11 * thin)),
        "neck": ("spine2", (0, -hunch * 0.15, 1.52 * k), 0.05 * thin),
        "head": ("neck", (0, -hunch * 0.3 - 0.02, 1.62 * k), (head_r * 0.85, head_r)),
        "headtop": ("head", (0, -hunch * 0.33 - 0.02, 1.72 * k), head_r * 0.8),
        "hip.L": ("hips", (0.09, 0, 0.95 * k), 0.085 * thin),
        "thigh.L": ("hip.L", (0.1, -0.01, 0.52 * k), 0.06 * thin),
        "shin.L": ("thigh.L", (0.1, 0.02, 0.08 * k), 0.045 * thin),
        "foot.L": ("shin.L", (0.1, -0.14 * k, 0.03), 0.042 * thin),
        "shoulder.L": ("spine2", (0.18 * thin + 0.02, 0.01 + hunch * 0.1, 1.44 * k), 0.06 * thin),
        "upperarm.L": ("shoulder.L", (0.22 * thin + 0.03, 0.03 + hunch * 0.1, 1.44 * k - 0.29 * k * arm_len), 0.045 * thin),
        "forearm.L": ("upperarm.L", (0.24 * thin + 0.03, 0.0 + hunch * 0.05, 1.44 * k - 0.54 * k * arm_len), 0.036 * thin),
        "hand.L": ("forearm.L", (0.245 * thin + 0.03, 0.0, 1.44 * k - 0.62 * k * arm_len), 0.035 * thin),
    }
    return s


def walk_pose(speed=1.0, crouch=0.0, stride=1.0):
    def fn(bones, t, f):
        ph = t * TAU
        hips = B(bones, "hips")
        hips.location = (0, 0, -crouch * 0.35 + abs(math.cos(ph)) * 0.025 * speed - 0.02 * speed)
        rot(hips, y=math.sin(ph) * 0.06 * speed, z=math.sin(ph) * 0.05)
        rot(B(bones, "spine1"), x=-0.05 * speed - crouch * 0.25, z=-math.sin(ph) * 0.05)
        rot(B(bones, "spine2"), x=-0.04 * speed - crouch * 0.2, z=-math.sin(ph) * 0.08)
        rot(B(bones, "neck"), x=crouch * 0.3)
        for side, off in ((".L", 0.0), (".R", math.pi)):
            a = ph + off
            sgn = 1 if side == ".L" else -1
            rot(B(bones, "thigh" + side), x=-math.sin(a) * 0.45 * stride * speed ** 0.5 - crouch * 0.9)
            knee = max(0.0, -math.cos(a)) * 0.9 * speed ** 0.6 + 0.08 + crouch * 1.5
            rot(B(bones, "shin" + side), x=knee)
            rot(B(bones, "foot" + side), x=-crouch * 0.6 + math.sin(a) * 0.15)
            rot(B(bones, "upperarm" + side), x=math.sin(a) * 0.35 * speed + crouch * 0.2, z=sgn * 0.06)
            rot(B(bones, "forearm" + side), x=-0.2 - speed * 0.5 * (0.6 + 0.4 * math.sin(a)))
    return fn


def idle_pose(crouch=0.0):
    def fn(bones, t, f):
        ph = t * TAU
        hips = B(bones, "hips")
        hips.location = (math.sin(ph) * 0.006, 0, -crouch * 0.35)
        rot(B(bones, "spine2"), x=math.sin(ph * 2) * 0.015 - crouch * 0.2)
        rot(B(bones, "spine1"), x=-crouch * 0.25)
        rot(B(bones, "head"), y=math.sin(ph) * 0.08)
        for side in (".L", ".R"):
            rot(B(bones, "thigh" + side), x=-crouch * 0.9)
            rot(B(bones, "shin" + side), x=crouch * 1.5 + 0.05)
            rot(B(bones, "foot" + side), x=-crouch * 0.6)
            rot(B(bones, "forearm" + side), x=-0.15 - crouch * 0.3)
    return fn


def player():
    reset()
    spec = mirror(humanoid_spec())
    m = skin_material("Avatar", (1, 1, 1), 0.75)
    body = build_body("Avatar", spec, subdiv=1, steps=3, material=m)
    hood = sphere("hood", 0.12, (0, 0.06, 1.55), m, (1.05, 0.9, 0.7), 14, 8)
    torch = cyl("torch", 0.018, 0.16, (-0.275, -0.05, 0.8), (math.pi / 2, 0, 0), mat("TorchBody", (0.05, 0.05, 0.05), 0.35, 0.8), 12)
    lensm = mat("Glow_Torch", (1, 1, 0.9), 0.2, emit=(1.0, 0.95, 0.8), emit_strength=4.0)
    tl = cyl("torchlens", 0.02, 0.01, (-0.275, -0.135, 0.8), (math.pi / 2, 0, 0), lensm, 12)
    rig_hood = add_rigid(body, [hood], "spine2")
    rig_torch = add_rigid(body, [torch, tl], "hand.R")
    rig = {**rig_hood, **rig_torch}
    arm = build_armature("Avatar", spec)

    def cloth(co):
        z = co.z
        if z < 0.1:
            return (0.08, 0.08, 0.08)  # shoes
        if z < 0.95:
            n = fbm3(co, 20, 3)
            return (0.16 + 0.03 * n, 0.2 + 0.03 * n, 0.3 + 0.04 * n)  # jeans
        if z > 1.52 and co.y < 0.02 and abs(co.x) < 0.12:
            return (0.74, 0.56, 0.46)  # face
        if abs(co.x) > 0.24 and z < 0.9:
            return (0.7, 0.53, 0.44)  # hands
        n = fbm3(co, 12, 3)
        return (0.27 + 0.03 * n, 0.29 + 0.03 * n, 0.24 + 0.03 * n)  # olive hoodie

    paint_vertices(body, cloth)
    skin_to(body, arm, spec, rig, exclude=("headtop",))
    make_clip(arm, "idle", 90, idle_pose(0))
    make_clip(arm, "walk", 32, walk_pose(1.0))
    make_clip(arm, "run", 20, walk_pose(2.2, stride=1.3))
    make_clip(arm, "crouch", 90, idle_pose(1.0))
    make_clip(arm, "crouchwalk", 40, walk_pose(0.8, crouch=1.0))
    finalize("Avatar", arm, body)
    preview("avatar", (0, 0, 0.9), 3.6, 8, -30)


def watcher():
    reset()
    spec = mirror(humanoid_spec(h=2.55, thin=0.55, hunch=0.6, arm_len=1.55, head_r=0.085))
    spec["hand.L"] = ("forearm.L", (spec["forearm.L"][1][0], -0.03, spec["forearm.L"][1][2] - 0.14), 0.02)
    spec["hand.R"] = ("forearm.R", (-spec["forearm.L"][1][0], -0.03, spec["forearm.L"][1][2] - 0.14), 0.02)
    for side, sx in ((".L", 1), (".R", -1)):
        hp = spec["hand" + side][1]
        for k, dx in enumerate((-0.02, 0.0, 0.02)):
            spec[f"fingerA{k}{side}"] = ("hand" + side, (hp[0] + dx * sx, hp[1] - 0.01, hp[2] - 0.12), 0.008)
            spec[f"fingerB{k}{side}"] = (f"fingerA{k}{side}", (hp[0] + dx * 1.4 * sx, hp[1] - 0.03, hp[2] - 0.24), 0.005)
    m = skin_material("Watcher_Skin", (0.1, 0.1, 0.11), 0.28)
    body = build_body("Watcher", spec, subdiv=1, steps=3, material=m)
    paint_vertices(body, lambda co: [0.8 + 0.4 * fbm3(co, 8, 3)] * 3)
    arm = build_armature("Watcher", spec)
    skin_to(body, arm, spec, exclude=("headtop",))

    def sway(bones, t, f):
        ph = t * TAU
        rot(B(bones, "spine2"), z=math.sin(ph) * 0.03, x=math.sin(ph * 2) * 0.01)
        rot(B(bones, "head"), y=math.sin(ph) * 0.04)
        for side in (".L", ".R"):
            rot(B(bones, "upperarm" + side), x=math.sin(ph + (0 if side == ".L" else 1)) * 0.04)

    def tilt(bones, t, f):
        e = math.sin(min(t / 0.6, 1.0) * math.pi / 2)
        rot(B(bones, "head"), y=e * 1.4, x=-e * 0.2)
        rot(B(bones, "neck"), y=e * 0.3)
        for side in (".L", ".R"):
            for k in range(3):
                rot(B(bones, f"fingerA{k}{side}"), x=e * 0.5)

    make_clip(arm, "idle", 120, sway)
    make_clip(arm, "tilt", 90, tilt, loop=False)
    make_clip(arm, "walk", 48, walk_pose(0.8, stride=1.2))
    finalize("Watcher", arm, body)
    preview("watcher", (0, 0, 1.3), 5.2, 8, -25)


def smiler():
    """Smiler (lore): a too-wide glowing grin of uneven teeth and two glowing eyes, hanging in the dark on a
    body you can't quite see. Static; jittered and faded in-engine."""
    reset()
    glow = mat("Glow_Smile", (0.95, 0.93, 0.85), 0.3, emit=(1.0, 0.98, 0.88), emit_strength=6.0)
    gum = mat("Glow_Gum", (0.3, 0.05, 0.04), 0.5, emit=(0.5, 0.06, 0.04), emit_strength=1.2)
    eye = mat("Glow_SmileEye", (1, 1, 0.9), 0.3, emit=(1.0, 0.97, 0.85), emit_strength=8.0)
    shadow = mat("Shadow", (0.0, 0.0, 0.0), 1.0)
    parts = []
    rng = random.Random(12)
    for row in (0, 1):
        n = 34
        for k in range(n):
            if rng.random() < 0.1:
                continue  # missing teeth
            t = k / (n - 1)
            a = (t - 0.5) * 2.9
            x = math.sin(a) * 0.32
            z = -0.12 + (1 - math.cos(a)) * 0.12 + (0.0 if row == 0 else -0.05)
            hgt = 0.055 * (1 - abs(t - 0.5) * 0.9) * rng.uniform(0.55, 1.5)
            w = rng.uniform(0.011, 0.02)
            tooth = box("tooth", (w, 0.012, hgt), (x, -math.cos(a) * 0.065, z - (hgt / 2 if row == 0 else -hgt / 2) + (0.02 if row == 0 else -0.02)), glow, bevel=0.003)
            tooth.rotation_euler = (rng.uniform(-0.15, 0.15), rng.uniform(-0.25, 0.25) - a * 0.35, -a * 0.4)
            parts.append(tooth)
        # a thin dim gum line behind each row
        for k in range(18):
            t = k / 17
            a = (t - 0.5) * 2.9
            gz = -0.12 + (1 - math.cos(a)) * 0.12 + (0.022 if row == 0 else -0.072)
            parts.append(box("gum", (0.04, 0.008, 0.01), (math.sin(a) * 0.32, -math.cos(a) * 0.06 + 0.006, gz), gum, bevel=0.003))
    for sx, sc in ((-1, 1.0), (1, 0.82)):  # mismatched eyes
        e = sphere("eye", 0.045 * sc, (sx * 0.17, -0.02, 0.16 + (0.012 if sx > 0 else 0)), eye, (1.5, 0.5, 0.36), 16, 10)
        e.rotation_euler = (0, -sx * 0.32, sx * 0.08)
        parts.append(e)
    # amorphous shadow mass (noise-displaced), not an egg
    body = sphere("body", 0.5, (0, 0.38, -0.25), shadow, (1.0, 0.75, 1.7), 24, 16)
    for vt in body.data.vertices:
        c = vt.co
        n = math.sin(c.x * 9 + c.z * 4) * math.sin(c.y * 7 + c.z * 11) * 0.25 + math.sin(c.z * 23) * 0.06
        vt.co = c * (1 + n)
    parts.append(body)
    join(parts, "Smiler")
    export("smiler")
    preview("smiler", (0, 0, 0), 1.6, 0, 0)


ALL = [smiler]  # people and creatures now come from mh_build.py (MakeHuman-based)
