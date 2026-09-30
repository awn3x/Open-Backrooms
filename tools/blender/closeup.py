"""Close-up turntable renders of an exported character, lit like a Backrooms corridor.
Usage: python tools/blender/closeup.py <model> <clip> <frame> <outdir>"""
import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

name, clip, frame, out = sys.argv[1], sys.argv[2], int(sys.argv[3]), Path(sys.argv[4])
root = Path(__file__).resolve().parents[2]
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(root / "public/assets/models" / f"{name}.glb"))
sc = bpy.context.scene
arm = next(o for o in sc.objects if o.type == "ARMATURE")
act = bpy.data.actions.get(clip) or next((a for a in bpy.data.actions if a.name.startswith(clip)), None)
if act:
    arm.animation_data_create()
    arm.animation_data.action = act
    sc.frame_set(frame)
dg = bpy.context.evaluated_depsgraph_get()
pts = []
for o in sc.objects:
    if o.type == "MESH":
        ev = o.evaluated_get(dg)
        pts += [ev.matrix_world @ v.co for v in ev.data.vertices]
lo = Vector((min(p.x for p in pts), min(p.y for p in pts), min(p.z for p in pts)))
hi = Vector((max(p.x for p in pts), max(p.y for p in pts), max(p.z for p in pts)))
ctr = (lo + hi) / 2
size = max(hi - lo)
hb = arm.pose.bones.get("head")
head = arm.matrix_world @ ((hb.head + hb.tail) / 2) if hb else max(pts, key=lambda p: p.z)

sc.render.engine = "CYCLES"
sc.cycles.device = "CPU"
sc.cycles.samples = 48
sc.render.resolution_x, sc.render.resolution_y = 640, 800
sc.view_settings.view_transform = "AgX"
world = bpy.data.worlds.new("w")
world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = (0.05, 0.045, 0.03, 1)
world.node_tree.nodes["Background"].inputs[1].default_value = 0.4
sc.world = world
# floor + two warm fluorescent panels overhead, a dim cool fill
bpy.ops.mesh.primitive_plane_add(size=20, location=(0, 0, 0))
fl = bpy.context.active_object
m = bpy.data.materials.new("floor")
m.use_nodes = True
m.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.35, 0.28, 0.12, 1)
fl.data.materials.append(m)
for x, y, e in ((0.6, -1.2, 110), (-1.0, 1.0, 50)):
    bpy.ops.object.light_add(type="AREA", location=(x, y, max(2.7, hi.z + 0.6)))
    L = bpy.context.active_object
    L.data.energy = e
    L.data.size = 1.2
    L.data.color = (1.0, 0.93, 0.75)
bpy.ops.object.light_add(type="POINT", location=(-1.5, -1.5, 1.2))
bpy.context.active_object.data.energy = 25
bpy.context.active_object.data.color = (0.7, 0.8, 1.0)


def shoot(target, dist, fname, lens=50, elev=8, azim=-28):
    bpy.ops.object.camera_add()
    cam = bpy.context.active_object
    cam.data.lens = lens
    a, e = math.radians(azim), math.radians(elev)
    cam.location = target + Vector((math.sin(a) * dist, -math.cos(a) * dist, math.sin(e) * dist))
    cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
    sc.camera = cam
    sc.render.filepath = str(out / fname)
    bpy.ops.render.render(write_still=True)


out.mkdir(parents=True, exist_ok=True)
shoot(ctr, size * 1.9, f"{name}_body.png", lens=40)
fwd = (arm.matrix_world.to_3x3() @ (hb.matrix.to_3x3() @ Vector((0, 0, 1)))) if hb else Vector((0, -1, 0))
az = math.degrees(math.atan2(fwd.x, -fwd.y)) if hb else -20
shoot(head, 0.7, f"{name}_face.png", lens=60, elev=6, azim=az - 25 + float(__import__("os").environ.get("AZ", "0")))
print("done")
