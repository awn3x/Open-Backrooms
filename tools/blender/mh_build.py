"""Realistic characters from the MakeHuman CC0 base mesh.

Source data (CC0, https://github.com/makehumancommunity/makehuman):
  data/3dobjs/base.obj, data/rigs/default.mhskel, data/rigs/default_weights.mhw,
  data/targets/macrodetails/*.target

We morph the base with macro targets, derive a reduced 59-bone game skeleton
from MakeHuman's joints (merging MakeHuman's own weights), dress the avatar
with clothing shells cut from the body, key animation clips in armature-space
axes (so bone roll never matters), and export glTF.

Usage: python tools/blender/mh_build.py [avatar crawler watcher dweller]
Env: MH_DATA=/path/to/makehuman/makehuman/data
"""
import json
import math
import os
import random
import sys
from pathlib import Path

import bpy  # noqa: F401  (must precede bmesh/mathutils)
import bmesh
import numpy as np
from mathutils import Matrix, Quaternion, Vector

sys.path.insert(0, str(Path(__file__).parent))
from common import MODELS, PREVIEW, apply_modifiers, export, link, mat, reset  # noqa: E402
import bake as BK  # noqa: E402

MH = Path(os.environ.get("MH_DATA", "/home/user/makehumancommunity/makehuman/makehuman/data"))

# ------------------------------------------------------------------ loading
_OBJ = None


def load_obj():
    global _OBJ
    if _OBJ:
        return _OBJ
    verts, faces, groups, uvs, fuv = [], [], [], [], []
    g = None
    for line in open(MH / "3dobjs/base.obj"):
        if line.startswith("v "):
            verts.append([float(x) for x in line.split()[1:4]])
        elif line.startswith("vt "):
            uvs.append([float(x) for x in line.split()[1:3]])
        elif line.startswith("g "):
            g = line.split()[1]
        elif line.startswith("f "):
            tok = line.split()[1:]
            faces.append([int(t.split("/")[0]) - 1 for t in tok])
            fuv.append([int(t.split("/")[1]) - 1 if "/" in t and t.split("/")[1] else -1 for t in tok])
            groups.append(g)
    global _UV
    _UV = (np.array(uvs), fuv)
    _OBJ = (np.array(verts), faces, groups)
    return _OBJ


_UV = None


def load_target(name):
    d = np.zeros((len(load_obj()[0]), 3))
    p = MH / "targets" / name
    for line in open(p):
        if line.startswith("#") or not line.strip():
            continue
        a = line.split()
        d[int(a[0])] = [float(a[1]), float(a[2]), float(a[3])]
    return d


def morph(targets):
    v = load_obj()[0].copy()
    for name, w in targets:
        v += load_target(name) * w
    return v


SKEL = json.load(open(MH / "rigs/default.mhskel"))
WEIGHTS = json.load(open(MH / "rigs/default_weights.mhw"))["weights"]

# ------------------------------------------------------------------ game skeleton
SIDES = (".L", ".R")
KEEP = ["root", "spine05", "spine04", "spine03", "spine02", "spine01", "neck01", "neck02", "neck03", "head", "jaw"]
for s in SIDES:
    KEEP += [f"clavicle{s}", f"shoulder01{s}", f"upperarm01{s}", f"upperarm02{s}", f"lowerarm01{s}", f"lowerarm02{s}", f"wrist{s}",
             f"finger1-1{s}", f"finger1-2{s}"]
    for n in (2, 3, 4, 5):
        KEEP += [f"finger{n}-1{s}", f"finger{n}-2{s}"]
    KEEP += [f"pelvis{s}", f"upperleg01{s}", f"upperleg02{s}", f"lowerleg01{s}", f"lowerleg02{s}", f"foot{s}", f"toe1-1{s}"]
KEEPSET = set(KEEP)


def mapped(bone):
    """Nearest kept ancestor (toes collapse into toe1-1, finger tips into -2)."""
    b = bone
    if b.startswith("toe") and not b.startswith("toe1-1"):
        return "toe1-1" + b[-2:]
    if b.startswith("finger") and b[-4:-2] == "-3":
        return b[:-4] + "-2" + b[-2:]
    while b and b not in KEEPSET:
        b = SKEL["bones"][b]["parent"]
    return b or "root"


def joint_pos(verts, name):
    return verts[SKEL["joints"][name]].mean(0)


def to_blender(p):
    """MakeHuman decimetres, Y-up, facing +Z  ->  Blender metres, Z-up, facing -Y."""
    p = np.asarray(p) * 0.1
    return Vector((p[0], -p[2], p[1]))


# ------------------------------------------------------------------ build
BODY_HELPERS = {"body"}


def build_character(name, targets, include=("body",), stretch=None, skin=(0.72, 0.55, 0.46), eyes=True, teeth=False, dress=True, rough=0.55):
    reset()
    verts, faces, groups = load_obj()
    v = morph(targets)
    ground = v[:, 1][np.array([i for f, g in zip(faces, groups) if g == "body" for i in f])].min()
    v[:, 1] -= ground
    if stretch:
        v = stretch(v)

    keep_groups = set(include)
    if eyes:
        keep_groups |= {"helper-l-eye", "helper-r-eye"}
    if teeth:
        keep_groups |= {"helper-upper-teeth", "helper-lower-teeth", "helper-tongue"}
    sel = [(f, g) for f, g in zip(faces, groups) if g in keep_groups]
    used = sorted({i for f, _ in sel for i in f})
    remap = {o: n for n, o in enumerate(used)}

    # vertex weights, merged into the game skeleton
    vw = [dict() for _ in used]
    for bone, lst in WEIGHTS.items():
        tb = mapped(bone)
        for vi, w in lst:
            if vi in remap:
                d = vw[remap[vi]]
                d[tb] = d.get(tb, 0) + w
    # helpers (eyes, teeth) have no weights: pin to head / jaw
    for f, g in sel:
        for i in f:
            d = vw[remap[i]]
            if not d:
                d["jaw" if ("lower-teeth" in g or "tongue" in g) else "head"] = 1.0

    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bverts = [bm.verts.new(to_blender(v[o])) for o in used]
    mat_idx = {"body": 0, "helper-l-eye": 1, "helper-r-eye": 1, "helper-upper-teeth": 2, "helper-lower-teeth": 2, "helper-tongue": 3}
    uvl = bm.loops.layers.uv.new("UVMap")
    uvs, fuv = _UV
    face_uv = {id(f): fu for f, fu in zip(faces, fuv)}
    for f, g in sel:
        try:
            bf = bm.faces.new([bverts[remap[i]] for i in f])
            bf.material_index = mat_idx.get(g, 0)
            bf.smooth = True
            fu = face_uv[id(f)]
            # helpers (eyes / teeth) share UV space with the body in MakeHuman's default layout:
            # squeeze them into a spare corner so baking never overwrites skin
            for lp, ui in zip(bf.loops, fu):
                u, w = uvs[ui] if ui >= 0 else (0.0, 0.0)
                if g != "body":
                    u, w = 0.955 + u * 0.04, 0.955 + w * 0.04
                lp[uvl].uv = (u, w)
        except ValueError:
            pass
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    link(ob)
    me.materials.append(mat(f"{name}_Skin", skin, rough))
    me.materials.append(mat("Eye", (0.85, 0.83, 0.8), 0.15))
    me.materials.append(mat("Teeth", (0.78, 0.72, 0.58), 0.35))
    me.materials.append(mat("Tongue", (0.45, 0.12, 0.12), 0.4))
    groups_bl = {b: ob.vertex_groups.new(name=b) for b in KEEP}
    for i, d in enumerate(vw):
        s = sum(d.values()) or 1
        for b, w in d.items():
            if w / s > 0.01:
                groups_bl[b].add([i], w / s, "REPLACE")

    arm = build_armature(name, v)
    return ob, arm, v, vw, used


def build_armature(name, v):
    ad = bpy.data.armatures.new(name + "_rig")
    arm = bpy.data.objects.new(name + "_rig", ad)
    link(arm)
    bpy.context.view_layer.objects.active = arm
    bpy.ops.object.mode_set(mode="EDIT")
    ebs = {}
    for b in KEEP:
        info = SKEL["bones"][b]
        eb = ad.edit_bones.new(b)
        eb.head = to_blender(joint_pos(v, info["head"]))
        eb.tail = to_blender(joint_pos(v, info["tail"]))
        if (eb.tail - eb.head).length < 1e-4:
            eb.tail = eb.head + Vector((0, 0, 0.02))
        # roll from MakeHuman's rotation plane (only cosmetic: clips are keyed in armature axes)
        pl = SKEL["planes"].get(info["rotation_plane"]) if info.get("rotation_plane") else None
        if pl:
            p1, p2, p3 = (to_blender(joint_pos(v, j)) for j in pl)
            n = (p2 - p1).cross(p3 - p2)
            if n.length > 1e-6:
                eb.align_roll(n.normalized())
        ebs[b] = eb
    for b in KEEP:
        p = SKEL["bones"][b]["parent"]
        while p and p not in KEEPSET:
            p = SKEL["bones"][p]["parent"]
        if p:
            ebs[b].parent = ebs[p]
    bpy.ops.object.mode_set(mode="OBJECT")
    for pb in arm.pose.bones:
        pb.rotation_mode = "QUATERNION"
    return arm


def attach(ob, arm):
    md = ob.modifiers.new("arm", "ARMATURE")
    md.object = arm
    ob.parent = arm


# ------------------------------------------------------------------ clothing
def dominant(vw_i):
    return max(vw_i.items(), key=lambda kv: kv[1])[0] if vw_i else "root"


def region_of(bone):
    if bone.startswith(("spine", "clavicle", "shoulder", "upperarm", "lowerarm")):
        return "top"
    if bone.startswith(("pelvis", "upperleg", "lowerleg")) or bone == "root":
        return "legs"
    if bone.startswith(("foot", "toe")):
        return "shoes"
    return "skin"


def dress_up(body, arm, outfit_color=(0.3, 0.33, 0.27), specs=None):
    """Cut clothing shells from the body by dominant bone and offset them outward."""
    me = body.data
    groups = {g.index: g.name for g in body.vertex_groups}
    region = []
    for vtx in me.vertices:
        best = max(vtx.groups, key=lambda g: g.weight, default=None)
        region.append(region_of(groups[best.group]) if best else "skin")
    specs = specs or {
        "top": ("Hoodie", outfit_color, 0.92, 0.014),
        "legs": ("Denim", (0.13, 0.17, 0.26), 0.85, 0.008),
        "shoes": ("Shoe", (0.09, 0.09, 0.1), 0.6, 0.009),
    }
    # region per face by vote; seams between garments go to the garment, never skin
    face_reg = {}
    for p in me.polygons:
        if p.material_index != 0:
            continue
        votes = {}
        for i in p.vertices:
            votes[region[i]] = votes.get(region[i], 0) + 1
        clothes = {k: n for k, n in votes.items() if k != "skin"}
        if votes.get("skin", 0) > len(p.vertices) / 2 or not clothes:
            face_reg[p.index] = "skin"
        else:
            face_reg[p.index] = max(clothes.items(), key=lambda kv: kv[1])[0]
    pieces = []
    for reg, (mname, col, rough, off) in specs.items():
        keep = {i for i, r in face_reg.items() if r == reg}
        if not keep:
            continue
        bm = bmesh.new()
        bm.from_mesh(me)
        bm.faces.ensure_lookup_table()
        bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.index not in keep], context="FACES")
        loose = [v for v in bm.verts if not v.link_faces]
        bmesh.ops.delete(bm, geom=loose, context="VERTS")
        cm = bpy.data.meshes.new(mname)
        bm.to_mesh(cm)
        bm.free()
        cob = bpy.data.objects.new(mname, cm)
        link(cob)
        for gname in [vg.name for vg in body.vertex_groups]:
            cob.vertex_groups.new(name=gname)
        cm.materials.clear()
        cm.materials.append(mat(mname, col, rough))
        for p in cm.polygons:
            p.material_index = 0
            p.use_smooth = True
        cm.update()
        for vtx in cm.vertices:
            vtx.co += vtx.normal * off
        sol = cob.modifiers.new("sol", "SOLIDIFY")
        sol.thickness = off * 1.2
        sol.offset = -1
        sol.use_rim = True
        apply_modifiers(cob)
        pieces.append(cob)
    # remove body faces now hidden under clothes
    bm = bmesh.new()
    bm.from_mesh(me)
    bm.faces.ensure_lookup_table()
    kill = [f for f in bm.faces if face_reg.get(f.index, "skin") != "skin"]
    bmesh.ops.delete(bm, geom=kill, context="FACES")
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_faces], context="VERTS")
    bm.to_mesh(me)
    bm.free()
    return pieces


def hair_cap(body, color=(0.07, 0.05, 0.04)):
    """Short hair: scalp faces above the brow, pushed out with a little clumping."""
    me = body.data
    head_z = max(v.co.z for v in me.vertices)
    ys = [v.co.y for v in me.vertices if v.co.z > head_z - 0.25]
    front_y = min(ys)
    faces = []
    for p in me.polygons:
        if p.material_index != 0:
            continue
        c = p.center
        up = c.z > head_z - 0.105 + max(0.0, (c.y - front_y) - 0.04) * -0.9
        if up and c.z > head_z - 0.2 and p.normal.z > -0.2 and not (p.normal.y < -0.6 and c.z < head_z - 0.06):
            faces.append(p.index)
    if not faces:
        return None
    bm = bmesh.new()
    bm.from_mesh(me)
    bm.faces.ensure_lookup_table()
    keep = set(faces)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.index not in keep], context="FACES")
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_faces], context="VERTS")
    hm = bpy.data.meshes.new("Hair")
    bm.to_mesh(hm)
    bm.free()
    sb = bmesh.new()
    sb.from_mesh(me)
    sb.faces.ensure_lookup_table()
    bmesh.ops.delete(sb, geom=[sb.faces[i] for i in faces], context="FACES")
    sb.to_mesh(me)
    sb.free()
    hob = bpy.data.objects.new("Hair", hm)
    link(hob)
    for g in body.vertex_groups:
        hob.vertex_groups.new(name=g.name)
    hm.materials.append(mat("Hair", color, 0.55))
    hm.update()
    rng = random.Random(3)
    for vtx in hm.vertices:
        vtx.co += vtx.normal * (0.009 + rng.random() * 0.004)
    for p in hm.polygons:
        p.use_smooth = True
    sol = hob.modifiers.new("sol", "SOLIDIFY")
    sol.thickness = 0.008
    sol.offset = -1
    apply_modifiers(hob)
    return hob


def rigid_piece(obj, bone):
    """Weight a prop mesh entirely to one bone."""
    g = obj.vertex_groups.new(name=bone)
    g.add(list(range(len(obj.data.vertices))), 1.0, "REPLACE")


def join_all(objs, name):
    for o in bpy.context.selected_objects:
        o.select_set(False)
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join()
    ob = bpy.context.view_layer.objects.active
    ob.name = name
    return ob


def decimate(ob, ratio):
    md = ob.modifiers.new("dec", "DECIMATE")
    md.ratio = ratio
    apply_modifiers(ob)


# ------------------------------------------------------------------ animation (armature-space axes)
X = Vector((1, 0, 0))  # character's left
Y = Vector((0, 1, 0))  # character's back
Z = Vector((0, 0, 1))  # up
D = math.radians


def rot(pb, axis, deg):
    """Rotate a pose bone about an armature-space axis through its head (relative to its parent)."""
    B = pb.bone.matrix_local.to_3x3()
    q = Quaternion(axis, D(deg))
    local = (B.inverted() @ q.to_matrix() @ B).to_quaternion()
    pb.rotation_quaternion = local @ pb.rotation_quaternion


def move(pb, x=0.0, y=0.0, z=0.0):
    """Translate a pose bone by an armature-space offset (X left, Y back, Z up)."""
    pb.location = pb.bone.matrix_local.to_3x3().inverted() @ Vector((x, y, z))


def P(arm, n):
    return arm.pose.bones.get(n)


def clear(arm):
    for pb in arm.pose.bones:
        pb.rotation_quaternion = (1, 0, 0, 0)
        pb.location = (0, 0, 0)
        pb.scale = (1, 1, 1)


def key_all(arm, f):
    for pb in arm.pose.bones:
        pb.keyframe_insert("rotation_quaternion", frame=f)
        pb.keyframe_insert("scale", frame=f)
        if pb.parent is None:
            pb.keyframe_insert("location", frame=f)


def clip(arm, name, frames, pose, loop=True):
    act = bpy.data.actions.new(name)
    act.use_fake_user = True
    if arm.animation_data is None:
        arm.animation_data_create()
    for tr in arm.animation_data.nla_tracks:
        tr.mute = True
    for f in range(frames + (1 if loop else 0)):
        t = (f % frames) / frames if loop else f / max(frames - 1, 1)
        # pose with no action attached, so depsgraph updates (used by aim/ground) don't re-evaluate keys
        arm.animation_data.action = None
        clear(arm)
        pose(arm, t)
        arm.animation_data.action = act
        key_all(arm, f + 1)
    arm.animation_data.action = None
    for tr in arm.animation_data.nla_tracks:
        tr.mute = False
    tr = arm.animation_data.nla_tracks.new()
    tr.name = name
    tr.strips.new(name, 1, act)
    clear(arm)


def arm_rest_angles(arm):
    """How far each upper arm hangs from vertical in the MakeHuman rest pose (degrees)."""
    out = {}
    for s in SIDES:
        b = arm.data.bones[f"upperarm01{s}"]
        d = (b.tail_local - b.head_local).normalized()
        out[s] = math.degrees(math.atan2(abs(d.x), -d.z))
    return out


def aim(pb, target, amount=1.0):
    """Rotate a bone (in armature space) so its rest direction points at `target`."""
    b = pb.bone
    d = (b.tail_local - b.head_local).normalized()
    q = d.rotation_difference(Vector(target).normalized())
    if amount != 1.0:
        q = Quaternion().slerp(q, amount)
    B = b.matrix_local.to_3x3()
    local = (B.inverted() @ q.to_matrix() @ B).to_quaternion()
    pb.rotation_quaternion = local @ pb.rotation_quaternion


def aim_world(arm, pb, target):
    """Point a bone along an armature-space direction given the current (evaluated) pose."""
    bpy.context.view_layer.update()
    M = pb.matrix.copy()
    cur = (M.to_3x3() @ Vector((0, 1, 0))).normalized()
    q = cur.rotation_difference(Vector(target).normalized())
    head = M.translation.copy()
    pb.matrix = Matrix.Translation(head) @ q.to_matrix().to_4x4() @ Matrix.Translation(-head) @ M


def ground(arm, bones, clearance=0.0):
    """Shift the root so the lowest of the given bone ends touches z = clearance."""
    bpy.context.view_layer.update()
    low = min(min(arm.pose.bones[b].head.z, arm.pose.bones[b].tail.z) for b in bones)
    root = arm.pose.bones["root"]
    B = root.bone.matrix_local.to_3x3()
    world = B @ Vector(root.location)
    world.z += clearance - low
    root.location = B.inverted() @ world


def arms_down(arm, rest, extra=0.0, side_out=8.0):
    """Relaxed arms hanging at the sides (from MakeHuman's A-pose), elbows slightly bent."""
    so = math.sin(math.radians(side_out))
    for s, sgn in ((".L", 1), (".R", -1)):
        aim_world(arm, P(arm, f"upperarm01{s}"), (sgn * so, 0.02, -1.0))
        bend = math.radians(10 + extra)
        aim_world(arm, P(arm, f"lowerarm01{s}"), (sgn * so * 0.6, -math.sin(bend), -math.cos(bend)))
        aim_world(arm, P(arm, f"wrist{s}"), (sgn * so * 0.4, -math.sin(bend) * 0.8, -1.0))


def g(p, c, w):
    d = min(abs(p - c), 1 - abs(p - c))
    return math.exp(-(d / w) ** 2)


def leg_cycle(arm, s, p, amp=1.0, knee_amp=1.0, crouch=0.0):
    hip = -(7 + 18 * math.cos(2 * math.pi * p)) * amp - crouch * 75
    knee = (14 * g(p, 0.12, 0.08) + 58 * g(p, 0.72, 0.12)) * knee_amp + crouch * 105
    ankle = -9 * g(p, 0.0, 0.06) + 16 * g(p, 0.58, 0.07) - crouch * 30
    rot(P(arm, f"upperleg01{s}"), X, hip)
    rot(P(arm, f"lowerleg01{s}"), X, knee)
    rot(P(arm, f"foot{s}"), X, -ankle * 0.6)
    rot(P(arm, f"toe1-1{s}"), X, 22 * g(p, 0.56, 0.06))


def humanoid_clips(arm, name):
    rest = arm_rest_angles(arm)
    root = P(arm, "root")

    def idle(a, t, crouch=0.0):
        arms_down(a, rest, extra=10 + crouch * 20)
        b = math.sin(t * 2 * math.pi)
        rot(P(a, "spine03"), X, 1.2 * b + crouch * 18)
        rot(P(a, "spine01"), X, crouch * 10)
        rot(P(a, "neck01"), X, -crouch * 20)
        rot(P(a, "head"), Z, 4 * math.sin(t * 2 * math.pi + 1))
        for s in SIDES:
            if crouch:
                rot(P(a, f"upperleg01{s}"), X, -80 * crouch)
                rot(P(a, f"lowerleg01{s}"), X, 115 * crouch)
                rot(P(a, f"foot{s}"), X, -25 * crouch)
            for n in (2, 3, 4, 5):
                rot(P(a, f"finger{n}-1{s}"), X, -18)
        move(root, 0.004 * math.sin(t * 2 * math.pi), 0, 0)
        if crouch:
            ground(a, ["foot.L", "foot.R", "toe1-1.L", "toe1-1.R"])

    def walk(a, t, amp=1.0, run=False, crouch=0.0):
        arms_down(a, rest, extra=(70 if run else 12) + crouch * 20)
        for s, off in ((".L", 0.0), (".R", 0.5)):
            p = (t + off) % 1.0
            leg_cycle(a, s, p, amp=amp * (1.35 if run else 1.0), knee_amp=(1.7 if run else 1.0) * amp, crouch=crouch)
            sw = math.cos(2 * math.pi * (p + 0.5))
            rot(P(a, f"upperarm01{s}"), X, -(22 if run else 14) * sw * amp - 4)
            for n in (2, 3, 4, 5):
                rot(P(a, f"finger{n}-1{s}"), X, -30 if run else -18)
        ph = 2 * math.pi * t
        rot(P(a, "spine05"), Z, 5 * math.sin(ph) * amp)
        rot(P(a, "spine02"), Z, -7 * math.sin(ph) * amp)
        rot(P(a, "spine03"), X, (12 if run else 3) + crouch * 20)
        rot(P(a, "neck01"), X, -(8 if run else 2) - crouch * 18)
        bob = -(0.035 if run else 0.022) * amp * (0.5 + 0.5 * math.cos(4 * math.pi * t))
        move(root, 0.012 * math.sin(ph) * amp, 0, bob)
        if crouch:
            ground(a, ["toe1-1.L", "toe1-1.R", "foot.L", "foot.R"], 0.02 * (0.5 + 0.5 * math.cos(4 * math.pi * t)))

    clip(arm, "idle", 120, lambda a, t: idle(a, t))
    clip(arm, "walk", 27, lambda a, t: walk(a, t))
    clip(arm, "run", 16, lambda a, t: walk(a, t, run=True))
    clip(arm, "crouch", 90, lambda a, t: idle(a, t, crouch=1.0))
    clip(arm, "crouchwalk", 35, lambda a, t: walk(a, t, amp=0.7, crouch=1.0))
    return rest


# ------------------------------------------------------------------ previews (frame strips)
def strip(arm, clip_name, frames, name, side=True):
    from PIL import Image

    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    sc.cycles.samples = 6
    sc.cycles.use_denoising = False
    if not sc.world:
        sc.world = bpy.data.worlds.new("w")
    sc.world.use_nodes = True
    sc.world.node_tree.nodes["Background"].inputs[0].default_value = (0.6, 0.58, 0.52, 1)
    sc.world.node_tree.nodes["Background"].inputs[1].default_value = 1.4
    sc.render.resolution_x = 256
    sc.render.resolution_y = 384
    cam_d = bpy.data.cameras.new("c")
    cam_d.type = "ORTHO"
    cam_d.ortho_scale = 2.6
    cam = bpy.data.objects.new("c", cam_d)
    link(cam)
    cam.location = (6, 0, 1.0) if side else (0, -6, 1.0)
    cam.rotation_euler = (math.radians(90), 0, math.radians(90 if side else 0))
    sc.camera = cam
    act = bpy.data.actions[clip_name]
    for tr in arm.animation_data.nla_tracks:
        tr.mute = True
    arm.animation_data.action = act
    tiles = []
    PREVIEW.mkdir(parents=True, exist_ok=True)
    n = 8
    for k in range(n):
        f = 1 + int(k * frames / n)
        sc.frame_set(f)
        sc.render.filepath = str(PREVIEW / f"_f{k}.png")
        bpy.ops.render.render(write_still=True)
        tiles.append(Image.open(sc.render.filepath).convert("RGB"))
    s = Image.new("RGB", (256 * n, 384))
    for k, im in enumerate(tiles):
        s.paste(im, (k * 256, 0))
    s.save(PREVIEW / f"strip_{name}_{clip_name}_{'side' if side else 'front'}.png")
    arm.animation_data.action = None
    for tr in arm.animation_data.nla_tracks:
        tr.mute = False
    bpy.data.objects.remove(cam, do_unlink=True)


def finish(name, body_parts, arm, export_name, previews):
    for o in body_parts:
        o.parent = arm
        if not any(m.type == "ARMATURE" for m in o.modifiers):
            attach(o, arm)
    for clip_name, frames in previews:
        strip(arm, clip_name, frames, export_name, side=True)
    strip(arm, previews[0][0], previews[0][1], export_name, side=False)
    clear(arm)
    export(export_name, [arm], animations=True)



# ------------------------------------------------------------------ surfacing helpers
def eye_centres(v):
    """Rest-pose eye positions (Blender space) from MakeHuman's eye helper groups."""
    verts, faces, groups = load_obj()
    out = []
    for side in ("helper-l-eye", "helper-r-eye"):
        idx = sorted({i for f, g in zip(faces, groups) if g == side for i in f})
        out.append(to_blender(v[idx].mean(0)))
    return out


def smooth_face(body, iterations=30):
    """Erase the face: relax the front of the head until nose, lips and brows melt into a blank mask."""
    me = body.data
    zs = [vt.co.z for vt in me.vertices]
    top = max(zs)
    bm = bmesh.new()
    bm.from_mesh(me)
    ys = [vt.co.y for vt in bm.verts if vt.co.z > top - 0.3]
    front = min(ys)
    # only the face plate (front 6 cm of the head, between chin and brow); keep the skull's volume
    head = [vt for vt in bm.verts if top - 0.34 < vt.co.z < top - 0.08 and vt.co.y < front + 0.05 and abs(vt.co.x) < 0.075]
    for _ in range(iterations):
        bmesh.ops.smooth_vert(bm, verts=head, factor=0.5, use_axis_x=True, use_axis_y=True, use_axis_z=True)
    bm.to_mesh(me)
    bm.free()
    me.update()


def surface(parts, name, res=1024):
    BK.bake(parts, name, res=res)

# ------------------------------------------------------------------ characters
RACE_MALE = [("macrodetails/caucasian-male-young.target", 0.5), ("macrodetails/african-male-young.target", 0.25), ("macrodetails/asian-male-young.target", 0.25)]


def backpack(arm):
    """A proper day pack: rounded body, front pocket, top handle and two shoulder straps."""
    sp = arm.data.bones["spine02"].head_local
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=(0.29, 0.13, 0.4), verts=bm.verts)
    bmesh.ops.bevel(bm, geom=bm.edges[:], offset=0.05, segments=4, affect="EDGES")
    pocket = bmesh.new()
    bmesh.ops.create_cube(pocket, size=1.0)
    bmesh.ops.scale(pocket, vec=(0.22, 0.06, 0.17), verts=pocket.verts)
    bmesh.ops.bevel(pocket, geom=pocket.edges[:], offset=0.025, segments=3, affect="EDGES")
    bmesh.ops.translate(pocket, vec=(0, 0.075, -0.09), verts=pocket.verts)
    me = bpy.data.meshes.new("Backpack")
    pocket.to_mesh(me)
    pocket.free()
    bm.from_mesh(me)
    for sx in (-0.08, 0.08):  # shoulder straps: thin bands over the shoulders to the hips
        st = bmesh.new()
        bmesh.ops.create_cube(st, size=1.0)
        bmesh.ops.scale(st, vec=(0.05, 0.015, 0.44), verts=st.verts)
        bmesh.ops.translate(st, vec=(sx, -0.1, 0.02), verts=st.verts)
        st.to_mesh(me)
        st.free()
        bm.from_mesh(me)
    bmesh.ops.translate(bm, vec=sp + Vector((0, 0.19, 0.03)), verts=bm.verts)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new("Backpack", me)
    link(ob)
    for p in me.polygons:
        p.use_smooth = True
    # box-project UVs into the spare top-right region of the atlas
    me.uv_layers.new(name="UVMap")
    uvl = me.uv_layers[0].data
    for p in me.polygons:
        for li in p.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co - sp
            n = p.normal
            a, b = (co.y, co.z) if abs(n.x) > max(abs(n.y), abs(n.z)) else (co.x, co.z) if abs(n.y) > abs(n.z) else (co.x, co.y)
            uvl[li].uv = (0.83 + (a + 0.3) * 0.13, 0.855 + (b + 0.3) * 0.13)
    m = bpy.data.materials.new("Backpack")
    BK.nylon(m, (0.2, 0.07, 0.05))
    me.materials.append(m)
    rigid_piece(ob, "spine02")
    return ob


def collar(arm, material, r=0.068, thick=0.02, drop=0.0, back=0.012):
    """A soft ring round the neck that hides the cut edge of a garment."""
    n = arm.data.bones["neck01"].head_local
    bm = bmesh.new()
    bmesh.ops.create_circle(bm, cap_ends=False, radius=1.0, segments=24)
    geom = bmesh.ops.extrude_edge_only(bm, edges=bm.edges[:])["geom"]
    bmesh.ops.translate(bm, vec=(0, 0, 1.0), verts=[g for g in geom if isinstance(g, bmesh.types.BMVert)])
    for vt in bm.verts:
        up = vt.co.z
        vt.co.x *= r + thick * (1 - up)
        vt.co.y *= (r + thick * (1 - up)) * 1.1
        vt.co.z = up * 0.035
    bmesh.ops.translate(bm, vec=n + Vector((0, back, -0.03 - drop)), verts=bm.verts)
    me = bpy.data.meshes.new("Collar")
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new("Collar", me)
    link(ob)
    me.uv_layers.new(name="UVMap")
    for p in me.polygons:
        for li in p.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            me.uv_layers[0].data[li].uv = (0.84 + (math.atan2(co.y - n.y, co.x - n.x) / 6.2832 + 0.5) * 0.1, 0.965 + (co.z - n.z + 0.05) * 0.3)
    sol = ob.modifiers.new("sol", "SOLIDIFY")
    sol.thickness = 0.006
    apply_modifiers(ob)
    for p in ob.data.polygons:
        p.use_smooth = True
    ob.data.materials.append(bpy.data.materials[material])
    rigid_piece(ob, "neck01")
    return ob


def avatar():
    body, arm, v, vw, used = build_character("Avatar", RACE_MALE, skin=(0.72, 0.53, 0.43))
    pieces = dress_up(body, arm)
    hair = None
    top = max(vt.co.z for vt in body.data.vertices)
    front = min(vt.co.y for vt in body.data.vertices if vt.co.z > top - 0.25)
    BK.skin(body.data.materials[0], (0.74, 0.55, 0.45), (0.62, 0.4, 0.32), rough=0.5, wet=0.1,
            redness=(0.78, 0.42, 0.36), dirt=(0.42, 0.3, 0.24), mottle=0.4, scalp=(top, front), hair_col=(0.06, 0.035, 0.022))
    BK.knit(bpy.data.materials["Hoodie"], (0.62, 0.62, 0.6))  # neutral: the game tints it per outfit
    BK.denim(bpy.data.materials["Denim"])
    BK.leather(bpy.data.materials["Shoe"], (0.08, 0.08, 0.09))
    pack = backpack(arm)
    parts = [body] + pieces + ([hair] if hair else []) + [pack, collar(arm, "Hoodie", r=0.07, thick=0.03)]
    ob = join_all(parts, "Avatar")
    decimate(ob, 0.5)
    surface([ob], "avatar", 1024)
    attach(ob, arm)
    humanoid_clips(arm, "Avatar")
    finish("Avatar", [ob], arm, "avatar", [("walk", 27), ("run", 16), ("crouchwalk", 35)])


def emaciated(tall=1.0):
    def f(v):
        v = v.copy()
        v[:, 1] *= tall
        v[:, 0] *= 0.9
        v[:, 2] *= 0.9
        return v
    return f


def crawler_clips(arm, neck_scale=1.0, jaw=26):
    rest = arm_rest_angles(arm)
    root = P(arm, "root")

    def base(a, t):
        # long arms / fingers, gaping jaw, body pitched forward onto all fours
        for sd in SIDES:
            for b in ("upperarm01", "lowerarm01"):
                P(a, f"{b}{sd}").scale = (1, 1.3, 1)
            for n in (2, 3, 4, 5):
                P(a, f"finger{n}-1{sd}").scale = (1, 1.5, 1)
                P(a, f"finger{n}-2{sd}").scale = (1, 1.5, 1)
        for n in ("neck01", "neck02"):
            P(a, n).scale = (1, neck_scale, 1)
        # children inherit scale: keep the skull its real size on a stretched neck
        P(a, "neck03").scale = (1, 1 / (neck_scale * neck_scale), 1)
        rot(P(a, "jaw"), X, jaw)
        rot(root, X, 72)
        for sd, sgn in ((".L", 1), (".R", -1)):
            aim_world(a, P(a, f"upperleg01{sd}"), (sgn * 0.2, 0.1, -1.0))
            aim_world(a, P(a, f"lowerleg01{sd}"), (sgn * 0.05, 1.0, -0.08))
            aim_world(a, P(a, f"foot{sd}"), (0, 1.0, 0.25))
            aim_world(a, P(a, f"upperarm01{sd}"), (sgn * 0.45, -0.35, -1.0))
            aim_world(a, P(a, f"lowerarm01{sd}"), (sgn * 0.15, -0.2, -1.0))
            aim_world(a, P(a, f"wrist{sd}"), (sgn * 0.1, -1.0, -0.15))
        aim_world(a, P(a, "neck01"), (0, -1.0, 0.35))
        aim_world(a, P(a, "head"), (0, -1.0, 0.15))

    def crawl(a, t):
        base(a, t)
        for s, off in ((".L", 0.0), (".R", 0.5)):
            p = (t + off) % 1.0
            q = (p + 0.5) % 1.0  # opposite arm leads (diagonal gait)
            rot(P(a, f"upperarm01{s}"), X, -28 * math.cos(2 * math.pi * q))
            rot(P(a, f"lowerarm01{s}"), X, 30 * g(q, 0.7, 0.14))
            rot(P(a, f"upperleg01{s}"), X, -22 * math.cos(2 * math.pi * p))
            rot(P(a, f"lowerleg01{s}"), X, 25 * g(p, 0.7, 0.14))
        ph = 2 * math.pi * t
        rot(P(a, "spine03"), Z, 8 * math.sin(ph))
        rot(P(a, "spine05"), Z, -6 * math.sin(ph))
        rot(P(a, "neck02"), Z, 10 * math.sin(ph + 1))
        ground(a, [f"{b}{sd}" for b in ("lowerleg01", "wrist", "finger3-2") for sd in SIDES], 0.02 * abs(math.sin(ph)))

    twitches = [(0.1, (12, -30)), (0.35, (-10, 45)), (0.55, (20, 5)), (0.8, (-15, -50))]

    def idle(a, t):
        base(a, t)
        rot(P(a, "spine03"), X, 2 * math.sin(t * 2 * math.pi))
        cur = (0, 0)
        for k, tw in twitches:
            if t >= k:
                cur = tw
        rot(P(a, "head"), X, cur[0])
        rot(P(a, "head"), Z, cur[1])
        ground(a, [f"{b}{sd}" for b in ("lowerleg01", "wrist", "finger3-2") for sd in SIDES])

    def lunge(a, t):
        base(a, t)
        w = math.sin(min(t / 0.35, 1) * math.pi / 2)
        e = max(0.0, (t - 0.35) / 0.65)
        e = 1 - (1 - e) ** 3
        rot(P(a, "spine03"), X, -12 * w + 18 * e)
        for s in SIDES:
            rot(P(a, f"upperarm01{s}"), X, 20 * w - 75 * e)
            rot(P(a, f"lowerarm01{s}"), X, -20 * e)
        rot(P(a, "jaw"), X, 15 * e)
        ground(a, [f"{b}{sd}" for b in ("lowerleg01", "wrist", "finger3-2") for sd in SIDES], 0.15 * e)
        rb = root.bone.matrix_local.to_3x3()
        root.location = Vector(root.location) + rb.inverted() @ Vector((0, 0.1 * w - 0.45 * e, 0))

    clip(arm, "crawl", 24, crawl)
    clip(arm, "idle", 80, idle)
    clip(arm, "lunge", 18, lunge, loop=False)


def crawler():
    targets = [("macrodetails/caucasian-male-young.target", 1.0), ("macrodetails/universal-male-young-minmuscle-minweight.target", 1.0)]
    body, arm, v, vw, used = build_character("Crawler", targets, stretch=emaciated(1.05), eyes=False, teeth=True)
    sockets = [(e.x, e.y, e.z, 0.03) for e in eye_centres(v)]
    # pale, bloodless, mottled skin; ribs and spine push through; hollow black eye sockets
    BK.skin(body.data.materials[0], (0.42, 0.4, 0.35), (0.36, 0.24, 0.25), vein=(0.16, 0.2, 0.32), rough=0.42, wet=0.35,
            ribs=(1.04, 1.36, 0.034), sockets=sockets, socket_col=(0.015, 0.01, 0.01), dirt=(0.12, 0.09, 0.06), mottle=1.4)
    BK.skin(bpy.data.materials["Teeth"], (0.62, 0.55, 0.36), (0.35, 0.28, 0.16), rough=0.3, dirt=(0.2, 0.12, 0.06))
    decimate(body, 0.6)
    surface([body], "crawler", 1024)
    attach(body, arm)
    crawler_clips(arm, jaw=40)
    finish("Crawler", [body], arm, "crawler", [("crawl", 24), ("lunge", 18)])


def dweller():
    targets = [("macrodetails/caucasian-male-young.target", 1.0), ("macrodetails/universal-male-young-minmuscle-minweight.target", 1.0)]
    body, arm, v, vw, used = build_character("Dweller", targets, stretch=emaciated(1.12), eyes=False, teeth=True)
    sockets = [(e.x, e.y, e.z, 0.032) for e in eye_centres(v)]
    # charred, split, oily skin from the boiler tunnels
    BK.skin(body.data.materials[0], (0.16, 0.1, 0.08), (0.05, 0.035, 0.03), rough=0.5, wet=0.4, ribs=(1.08, 1.42, 0.036),
            cracks=9, crack_col=(0.45, 0.1, 0.05), sockets=sockets, socket_col=(0.0, 0.0, 0.0), dirt=(0.02, 0.015, 0.01))
    BK.skin(bpy.data.materials["Teeth"], (0.5, 0.42, 0.26), (0.2, 0.15, 0.08), rough=0.35)
    decimate(body, 0.6)
    surface([body], "dweller", 1024)
    attach(body, arm)
    crawler_clips(arm, neck_scale=1.6, jaw=46)
    finish("Dweller", [body], arm, "dweller", [("crawl", 24)])


def watcher():
    """A 'Faceling': a too-tall office worker with no face, in a sweat-stained shirt and slacks."""
    body, arm, v, vw, used = build_character(
        "Watcher", [("macrodetails/caucasian-male-young.target", 0.8), ("macrodetails/universal-male-young-minmuscle-minweight.target", 0.7)],
        stretch=emaciated(1.26), eyes=False)
    smooth_face(body)
    pieces = dress_up(body, arm, specs={
        "top": ("Shirt", (0.7, 0.68, 0.6), 0.85, 0.008),
        "legs": ("Slacks", (0.1, 0.1, 0.11), 0.8, 0.008),
        "shoes": ("Shoe", (0.05, 0.04, 0.035), 0.5, 0.008),
    })
    BK.skin(body.data.materials[0], (0.4, 0.37, 0.33), (0.3, 0.28, 0.26), vein=(0.28, 0.27, 0.33), rough=0.3, wet=0.25,
            dirt=(0.2, 0.18, 0.15), pores=0.3, mottle=0.4)
    BK.cotton(bpy.data.materials["Shirt"], (0.82, 0.8, 0.72), stain=(0.55, 0.43, 0.2), stains=0.8)
    BK.cotton(bpy.data.materials["Slacks"], (0.09, 0.09, 0.1), stain=(0.16, 0.14, 0.11), stains=0.4, rough=0.75, grime=(0.05, 0.05, 0.05))
    BK.leather(bpy.data.materials["Shoe"], (0.05, 0.035, 0.025), rough=0.35, sole=(0.04, 0.04, 0.04))
    body = join_all([body] + pieces + [collar(arm, "Shirt", r=0.047, thick=0.006, back=0.006)], "Watcher")
    decimate(body, 0.55)
    surface([body], "watcher", 1024)
    attach(body, arm)
    rest = arm_rest_angles(arm)
    root = P(arm, "root")

    def stoop(a):
        arms_down(a, rest, extra=4, side_out=4)
        for s in SIDES:
            for b in ("upperarm01", "lowerarm01"):
                P(a, f"{b}{s}").scale = (1, 1.25, 1)
            for n in (2, 3, 4, 5):
                P(a, f"finger{n}-1{s}").scale = (1, 1.5, 1)
        rot(P(a, "spine02"), X, 14)
        rot(P(a, "neck01"), X, 22)
        rot(P(a, "head"), X, -10)

    def idle(a, t):
        stoop(a)
        rot(P(a, "spine03"), Z, 2 * math.sin(t * 2 * math.pi))

    def tilt(a, t):
        stoop(a)
        e = math.sin(min(t / 0.6, 1.0) * math.pi / 2)
        rot(P(a, "head"), Y, 70 * e)
        for s in SIDES:
            for n in (2, 3, 4, 5):
                rot(P(a, f"finger{n}-1{s}"), X, -35 * e)

    def walk(a, t):
        stoop(a)
        for s, off in ((".L", 0.0), (".R", 0.5)):
            p = (t + off) % 1.0
            leg_cycle(a, s, p, amp=1.2, knee_amp=0.8)
        move(root, 0, 0, -0.015 * (0.5 + 0.5 * math.cos(4 * math.pi * t)))

    clip(arm, "idle", 120, idle)
    clip(arm, "tilt", 90, tilt, loop=False)
    clip(arm, "walk", 40, walk)
    finish("Watcher", [body], arm, "watcher", [("walk", 40), ("tilt", 90)])


ALL = {"avatar": avatar, "crawler": crawler, "dweller": dweller, "watcher": watcher}

if __name__ == "__main__":
    for n in sys.argv[1:] or ALL:
        print(f"[{n}]")
        ALL[n]()
