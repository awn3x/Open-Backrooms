"""Shared Blender (bpy) helpers for the Open Backrooms asset pipeline.

Run with a Python that has the `bpy` module (pip install bpy==4.5.4).
Conventions: metres, Blender Z-up. glTF export converts to Y-up, so a model
whose front faces Blender -Y ends up facing +Z in three.js.
"""
import math
import os
from pathlib import Path

import bpy  # noqa: F401  (must precede bmesh)
import bmesh
from mathutils import Matrix, Vector

ROOT = Path(__file__).resolve().parents[2]
MODELS = ROOT / "public" / "assets" / "models"
PREVIEW = Path(os.environ.get("PREVIEW_DIR", ROOT / "tools" / "out" / "previews"))


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.unit_settings.system = "METRIC"
    sc.render.fps = 30


def mat(name, color, rough=0.5, metal=0.0, emit=None, emit_strength=1.0, alpha=None, transmission=0.0):
    m = bpy.data.materials.get(name)
    if m:
        return m
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*color, 1.0)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if emit is not None:
        b.inputs["Emission Color"].default_value = (*emit, 1.0)
        b.inputs["Emission Strength"].default_value = emit_strength
    if alpha is not None:
        b.inputs["Alpha"].default_value = alpha
        m.blend_method = "BLEND" if hasattr(m, "blend_method") else None
    if transmission:
        b.inputs["Transmission Weight"].default_value = transmission
    return m


def image_mat(name, image_path, rough=0.5, metal=0.0, emissive=False):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes["Principled BSDF"]
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = bpy.data.images.load(str(image_path))
    nt.links.new(tex.outputs["Color"], b.inputs["Base Color"])
    if emissive:
        nt.links.new(tex.outputs["Color"], b.inputs["Emission Color"])
        b.inputs["Emission Strength"].default_value = 1.0
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    return m


def link(obj):
    bpy.context.scene.collection.objects.link(obj)
    return obj


def new_obj(name, bm, material=None):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    link(ob)
    if material is not None:
        me.materials.append(material)
    return ob


def box(name, size, loc=(0, 0, 0), material=None, bevel=0.0, segs=2):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=Vector(size), verts=bm.verts)
    ob = new_obj(name, bm, material)
    ob.location = loc
    if bevel > 0:
        md = ob.modifiers.new("bevel", "BEVEL")
        md.width = bevel
        md.segments = segs
        md.limit_method = "ANGLE"
    return ob


def cyl(name, r, depth, loc=(0, 0, 0), rot=(0, 0, 0), material=None, verts=24, r2=None, cap=True):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=cap, cap_tris=False, segments=verts, radius1=r, radius2=r if r2 is None else r2, depth=depth)
    ob = new_obj(name, bm, material)
    ob.location = loc
    ob.rotation_euler = rot
    return ob


def sphere(name, r, loc=(0, 0, 0), material=None, scale=(1, 1, 1), segs=16, rings=10):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=segs, v_segments=rings, radius=r)
    ob = new_obj(name, bm, material)
    ob.location = loc
    ob.scale = scale
    return ob


def torus(name, R, r, loc=(0, 0, 0), rot=(0, 0, 0), material=None, major=32, minor=10):
    bm = bmesh.new()
    for i in range(major):
        a = i / major * 2 * math.pi
        for j in range(minor):
            b = j / minor * 2 * math.pi
            x = (R + r * math.cos(b)) * math.cos(a)
            y = (R + r * math.cos(b)) * math.sin(a)
            z = r * math.sin(b)
            bm.verts.new((x, y, z))
    bm.verts.ensure_lookup_table()
    for i in range(major):
        for j in range(minor):
            a = i * minor + j
            b = ((i + 1) % major) * minor + j
            c = ((i + 1) % major) * minor + (j + 1) % minor
            d = i * minor + (j + 1) % minor
            bm.faces.new((bm.verts[a], bm.verts[b], bm.verts[c], bm.verts[d]))
    ob = new_obj(name, bm, material)
    ob.location = loc
    ob.rotation_euler = rot
    return ob


def boolean(target, cutter, op="DIFFERENCE"):
    md = target.modifiers.new("bool", "BOOLEAN")
    md.object = cutter
    md.operation = op
    md.solver = "EXACT"
    apply_modifiers(target)
    bpy.data.objects.remove(cutter, do_unlink=True)


def apply_modifiers(ob):
    dg = bpy.context.evaluated_depsgraph_get()
    ev = ob.evaluated_get(dg)
    me = bpy.data.meshes.new_from_object(ev)
    old = ob.data
    ob.modifiers.clear()
    ob.data = me
    bpy.data.meshes.remove(old)


def shade_smooth(ob, angle=35):
    for p in ob.data.polygons:
        p.use_smooth = True
    try:
        ob.data.set_sharp_from_angle(angle=math.radians(angle))
    except Exception:
        pass


def auto_uv(ob, scale=1.0):
    """Box-project UVs in world units (1 UV = 1/scale metres)."""
    me = ob.data
    if not me.uv_layers:
        me.uv_layers.new(name="UVMap")
    uv = me.uv_layers.active.data
    mw = ob.matrix_world
    for p in me.polygons:
        n = p.normal
        ax = max(range(3), key=lambda i: abs(n[i]))
        for li in p.loop_indices:
            co = mw @ me.vertices[me.loops[li].vertex_index].co
            if ax == 0:
                u, v = co.y, co.z
            elif ax == 1:
                u, v = co.x, co.z
            else:
                u, v = co.x, co.y
            uv[li].uv = (u * scale, v * scale)


def join(objs, name):
    for o in bpy.context.selected_objects:
        o.select_set(False)
    for o in objs:
        apply_modifiers(o) if o.modifiers else None
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join()
    ob = bpy.context.view_layer.objects.active
    ob.name = name
    ob.data.name = name
    apply_transforms(ob)  # origin -> world origin, so authored coordinates are the pivot
    return ob


def apply_transforms(ob):
    for o in bpy.context.selected_objects:
        o.select_set(False)
    ob.select_set(True)
    bpy.context.view_layer.objects.active = ob
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)


def decimate(ob, ratio):
    md = ob.modifiers.new("dec", "DECIMATE")
    md.ratio = ratio
    md.use_collapse_triangulate = True
    apply_modifiers(ob)


def export(name, objects=None, animations=False):
    MODELS.mkdir(parents=True, exist_ok=True)
    for o in bpy.context.scene.objects:
        o.select_set(False)
    objs = objects if objects is not None else list(bpy.context.scene.objects)
    for o in objs:
        o.select_set(True)
        for c in o.children_recursive:
            c.select_set(True)
    path = MODELS / f"{name}.glb"
    kwargs = dict(
        filepath=str(path),
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_texcoords=True,
        export_normals=True,
        export_materials="EXPORT",
        export_image_format="WEBP",
        export_animations=animations,
    )
    if animations:
        kwargs.update(export_animation_mode="ACTIONS", export_skins=True, export_force_sampling=True, export_frame_step=1,
                      export_vertex_color="ACTIVE")
    try:
        bpy.ops.export_scene.gltf(**kwargs)
    except TypeError:
        kwargs["export_image_format"] = "AUTO"
        bpy.ops.export_scene.gltf(**kwargs)
    print(f"  exported {path.name} ({path.stat().st_size // 1024} KB)")
    return path


def preview(name, target=(0, 0, 0), dist=0.5, elev=15, azim=-30, res=384, lens=50, samples=24, light=3.0):
    """Quick Cycles CPU render for visual inspection."""
    PREVIEW.mkdir(parents=True, exist_ok=True)
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    sc.cycles.samples = samples
    sc.cycles.use_denoising = False
    sc.render.resolution_x = res
    sc.render.resolution_y = res
    sc.render.film_transparent = False
    if not sc.world:
        sc.world = bpy.data.worlds.new("w")
    sc.world.use_nodes = True
    sc.world.node_tree.nodes["Background"].inputs[0].default_value = (0.18, 0.17, 0.14, 1)
    sc.world.node_tree.nodes["Background"].inputs[1].default_value = 0.6
    cam_data = bpy.data.cameras.new("pc")
    cam_data.lens = lens
    cam_data.clip_start = 0.005
    cam = bpy.data.objects.new("pc", cam_data)
    link(cam)
    t = Vector(target)
    e, a = math.radians(elev), math.radians(azim)
    cam.location = t + Vector((math.sin(a) * math.cos(e), -math.cos(a) * math.cos(e), math.sin(e))) * dist
    d = (t - cam.location).normalized()
    cam.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()
    sc.camera = cam
    ld = bpy.data.lights.new("pl", "AREA")
    ld.energy = light * dist * dist * 40
    ld.size = dist
    lo = bpy.data.objects.new("pl", ld)
    lo.location = cam.location + Vector((dist * 0.5, 0, dist * 0.8))
    lo.rotation_euler = (t - lo.location).to_track_quat("-Z", "Y").to_euler()
    link(lo)
    sc.render.filepath = str(PREVIEW / f"{name}.png")
    bpy.ops.render.render(write_still=True)
    bpy.data.objects.remove(cam, do_unlink=True)
    bpy.data.objects.remove(lo, do_unlink=True)
