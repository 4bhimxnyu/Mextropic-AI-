"""Mextropic hero â€” an automated lab bench, built procedurally.

A 96-well plate fills column by column while a pipette head tracks across it,
sample vials ride a rail behind, and an instrument block sits at each end.
Everything loops: the plate empties and the vials advance exactly one pitch.

blender.exe -b -P lab.py -- <outdir> [still|anim] [frames] [width]
"""
import bpy, math, sys, os, random
from mathutils import Vector

argv = sys.argv[sys.argv.index("--")+1:] if "--" in sys.argv else []
OUT    = argv[0] if argv else "."
MODE   = argv[1] if len(argv) > 1 else "still"
FRAMES = int(argv[2]) if len(argv) > 2 else 180
WIDTH  = int(argv[3]) if len(argv) > 3 else 2048

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE_NEXT'
scene.render.resolution_x = WIDTH
scene.render.resolution_y = int(WIDTH*1100/2560)
scene.render.fps = 24
scene.view_settings.view_transform = 'Standard'
scene.view_settings.look = 'None'
scene.view_settings.exposure = 0.0          # the scene is light; hold it off the clip point
ev = scene.eevee
ev.taa_render_samples = 48
for a in ("use_raytracing", "use_shadows"):
    if hasattr(ev, a): setattr(ev, a, True)

def rgb(h, a=1.0):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16)/255 for i in (0, 2, 4)) + (a,)

def mat(name, base, rough=0.35, metal=0.0, coat=0.0, emit=None, es=1.0, alpha=1.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = base
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if "Coat Weight" in b.inputs: b.inputs["Coat Weight"].default_value = coat
    if emit is not None:
        b.inputs["Emission Color"].default_value = emit
        b.inputs["Emission Strength"].default_value = es
    if alpha < 1.0:
        b.inputs["Alpha"].default_value = alpha
        m.blend_method = 'BLEND'
    return m

# a deliberate value ladder: dark instruments, mid bench, light plate, saturated liquid
M_BENCH  = mat("bench",  rgb("#F3F6FB"), rough=0.55)
M_BENCH2 = mat("bench2", rgb("#DCE4F0"), rough=0.56)
M_PLATE  = mat("plate",  rgb("#FDFEFF"), rough=0.26, coat=0.5)
M_WELL   = mat("well",   rgb("#BDC8DA"), rough=0.44)
M_LIQ    = mat("liquid", rgb("#3B49CE"), rough=0.20, coat=0.45)
M_LIQ2   = mat("liquid2",rgb("#6674DC"), rough=0.20, coat=0.45)
M_STEEL  = mat("steel",  rgb("#AFBCCF"), rough=0.30, metal=0.7)
M_WHITE  = mat("white",  rgb("#FBFCFE"), rough=0.36)
M_DARK   = mat("dark",   rgb("#1F2B49"), rough=0.36)
M_GLASS  = mat("glass",  rgb("#E8F0FB"), rough=0.08, coat=1.0, alpha=0.30)
M_ACCENT = mat("accent", rgb("#5A67D8"), rough=0.28, emit=rgb("#6674DC"), es=1.2)

def box(name, loc, scale, material, bev=0.012):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    ob = bpy.context.active_object; ob.name = name; ob.scale = scale
    ob.data.materials.append(material)
    bpy.ops.object.modifier_add(type='BEVEL')
    ob.modifiers["Bevel"].width = bev; ob.modifiers["Bevel"].segments = 3
    return ob

def cyl(name, loc, r, d, material, verts=28):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=d, vertices=verts, location=loc)
    ob = bpy.context.active_object; ob.name = name
    ob.data.materials.append(material); bpy.ops.object.shade_smooth()
    return ob

# ---------------------------------------------------------------- bench
box("bench", (0, 0, -0.35), (34, 11, 0.5), M_BENCH)
# bench.edge removed — read as a floating slab on a white ground

# ---------------------------------------------------------------- 96-well plate
COLS, ROWS = 12, 8
PITCH = 0.62
PW, PD = COLS*PITCH + 0.5, ROWS*PITCH + 0.5
box("plate.body", (0, 0, 0.16), (PW, PD, 0.32), M_PLATE)
box("plate.lip",  (0, 0, 0.33), (PW - 0.26, PD - 0.26, 0.06), M_WELL)
WELLS = []
for c in range(COLS):
    for r in range(ROWS):
        x = (c - (COLS-1)/2)*PITCH
        y = (r - (ROWS-1)/2)*PITCH
        cyl(f"well.{c}.{r}", (x, y, 0.30), PITCH*0.38, 0.16, M_WELL, verts=20)
        liq = cyl(f"liq.{c}.{r}", (x, y, 0.335), PITCH*0.34, 0.17, M_LIQ if (c+r) % 3 else M_LIQ2, verts=20)
        liq["col"] = c
        WELLS.append(liq)

# ---------------------------------------------------------------- pipette head on a gantry
box("gantry.rail", (0, 0.9, 2.05), (PW + 3.4, 0.18, 0.18), M_STEEL)
box("gantry.postL", (-(PW/2 + 1.6), 0.9, 1.02), (0.20, 0.20, 2.05), M_STEEL)
box("gantry.postR", ((PW/2 + 1.6), 0.9, 1.02), (0.20, 0.20, 2.05), M_STEEL)
head = box("pipette.head", (0, 0.0, 1.74), (1.05, PD*0.92, 0.30), M_DARK)
stripe = box("pipette.stripe", (0, -PD*0.46 - 0.01, 1.74), (0.86, 0.04, 0.11), M_ACCENT)
tips = []
for r in range(ROWS):
    y = (r - (ROWS-1)/2)*PITCH
    t = cyl(f"tip.{r}", (0, y, 1.20), 0.06, 0.78, M_WHITE, verts=12)
    t.parent = head
    tips.append(t)
carriage = box("pipette.carriage", (0, 0.9, 2.05), (0.55, 0.46, 0.34), M_STEEL)
head.parent = carriage
stripe.parent = head
for t in tips + [stripe]: t.matrix_parent_inverse = head.matrix_world.inverted()
head.matrix_parent_inverse = carriage.matrix_world.inverted()

# ---------------------------------------------------------------- vial rail behind
VIALS = []
RAIL_Y, RAIL_PITCH = 6.2, 1.5
box("rail", (0, RAIL_Y, 0.09), (34, 1.0, 0.18), M_BENCH2)
box("rail.groove", (0, RAIL_Y, 0.19), (34, 0.56, 0.04), M_DARK)
for i in range(30):
    x = -21 + i*RAIL_PITCH
    v = cyl(f"vial.{i}", (x, RAIL_Y, 0.60), 0.21, 0.82, M_GLASS, verts=20)
    fill = cyl(f"vfill.{i}", (x, RAIL_Y, 0.44), 0.17, 0.44, M_LIQ2 if i % 3 else M_LIQ, verts=20)
    cap = cyl(f"cap.{i}", (x, RAIL_Y, 1.04), 0.22, 0.11, M_ACCENT if i % 4 == 0 else M_DARK, verts=20)
    for ch in (fill, cap):
        ch.parent = v
        ch.matrix_parent_inverse = v.matrix_world.inverted()
    VIALS.append(v)

# ---------------------------------------------------------------- instruments either side
# instruments removed — see note above

# ---------------------------------------------------------------- world + lights
world = bpy.data.worlds.new("w"); scene.world = world; world.use_nodes = True
wnt = world.node_tree; bgn = wnt.nodes["Background"]
coord = wnt.nodes.new("ShaderNodeTexCoord"); sep = wnt.nodes.new("ShaderNodeSeparateXYZ")
ramp = wnt.nodes.new("ShaderNodeValToRGB")
ramp.color_ramp.elements[0].position = 0.35; ramp.color_ramp.elements[0].color = rgb("#FFFFFF")
ramp.color_ramp.elements[1].position = 0.66; ramp.color_ramp.elements[1].color = rgb("#FFFFFF")
wnt.links.new(coord.outputs["Generated"], sep.inputs["Vector"])
wnt.links.new(sep.outputs["Z"], ramp.inputs["Fac"])
wnt.links.new(ramp.outputs["Color"], bgn.inputs[0])
bgn.inputs[1].default_value = 1.0

def area(name, loc, rot, size, power, colour):
    bpy.ops.object.light_add(type='AREA', location=loc, rotation=rot)
    L = bpy.context.active_object; L.name = name
    L.data.size = size; L.data.energy = power; L.data.color = colour[:3]
area("key",  (-9, -12, 13), (math.radians(44), 0, math.radians(-32)), 12, 1450, rgb("#FFFFFF"))
area("fill", (12, -10, 5),  (math.radians(70), 0, math.radians(44)),  16, 320,  rgb("#E8F1FF"))
area("rim",  (0, 14, 7),    (math.radians(-58), 0, 0),                18, 600,  rgb("#DCE8FA"))

# ---------------------------------------------------------------- camera: low banner three-quarter
bpy.ops.object.camera_add(location=(8.2, -18.2, 8.6), rotation=(math.radians(69), 0, math.radians(24)))
cam = bpy.context.active_object; scene.camera = cam
cam.data.lens = 50
cam.data.dof.use_dof = True
cam.data.dof.focus_distance = 19.5
cam.data.dof.aperture_fstop = 3.2

# ---------------------------------------------------------------- animation
if MODE == "sweep":
    scene.frame_start, scene.frame_end = 1, FRAMES
    x0, x1 = -(PW/2 - 0.4), (PW/2 - 0.4)
    carriage.location = (x0, 0.9, 2.05); carriage.keyframe_insert("location", frame=1)
    carriage.location = (x1, 0.9, 2.05); carriage.keyframe_insert("location", frame=FRAMES)
    for fc in carriage.animation_data.action.fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = 'BEZIER'; kp.easing = 'EASE_IN_OUT'
    # the carriage is eased, so its speed is not constant — read the actual animated
    # x position back off the f-curve and fill each column as the head really reaches it.
    # (Timing the fill linearly against frame number drifts out of sync with the head.)
    xfc = next(fc for fc in carriage.animation_data.action.fcurves
               if fc.data_path == "location" and fc.array_index == 0)
    xs = [xfc.evaluate(f) for f in range(1, FRAMES + 1)]
    def frame_at_x(target):
        for i, xv in enumerate(xs):
            if xv >= target:
                return i + 1
        return FRAMES
    for liq in WELLS:
        c = liq["col"]
        on = frame_at_x((c - (COLS-1)/2)*PITCH)
        liq.scale = (1, 1, 0.04); liq.keyframe_insert("scale", frame=1)
        liq.scale = (1, 1, 0.04); liq.keyframe_insert("scale", frame=max(2, on-1))
        liq.scale = (1, 1, 1.0);  liq.keyframe_insert("scale", frame=min(FRAMES, on+20))
    for i, v in enumerate(VIALS):
        sx = v.location.copy()
        v.keyframe_insert("location", frame=1)
        v.location = (sx.x + RAIL_PITCH, sx.y, sx.z)
        v.keyframe_insert("location", frame=FRAMES)
        for fc in v.animation_data.action.fcurves:
            for kp in fc.keyframe_points:
                kp.interpolation = 'BEZIER'; kp.easing = 'EASE_IN_OUT'
    scene.render.image_settings.file_format = 'PNG'
    scene.render.filepath = os.path.join(OUT, "s_")
    bpy.ops.render.render(animation=True)
elif MODE == "anim":
    scene.frame_start, scene.frame_end = 1, FRAMES
    SWEEP = int(FRAMES*0.78)          # the head crosses the plate, then returns
    x0, x1 = -(PW/2 - 0.4), (PW/2 - 0.4)
    carriage.location = (x0, 0.9, 2.05); carriage.keyframe_insert("location", frame=1)
    carriage.location = (x1, 0.9, 2.05); carriage.keyframe_insert("location", frame=SWEEP)
    carriage.location = (x0, 0.9, 2.05); carriage.keyframe_insert("location", frame=FRAMES+1)
    # wells fill as the head passes their column, then drain together before the loop
    for liq in WELLS:
        c = liq["col"]
        on = 1 + (c/(COLS-1))*(SWEEP-1)
        liq.scale = (1, 1, 0.04); liq.keyframe_insert("scale", frame=1)
        liq.scale = (1, 1, 0.04); liq.keyframe_insert("scale", frame=max(2, on-1))
        liq.scale = (1, 1, 1.0);  liq.keyframe_insert("scale", frame=min(FRAMES, on+7))
        liq.scale = (1, 1, 1.0);  liq.keyframe_insert("scale", frame=FRAMES-10)
        liq.scale = (1, 1, 0.04); liq.keyframe_insert("scale", frame=FRAMES+1)
    # vials advance exactly one pitch, so the rail loops seamlessly
    for v in VIALS:
        s = v.location.copy()
        v.keyframe_insert("location", frame=1)
        v.location = (s.x + RAIL_PITCH, s.y, s.z)
        v.keyframe_insert("location", frame=FRAMES+1)
        for fc in v.animation_data.action.fcurves:
            for kp in fc.keyframe_points: kp.interpolation = 'LINEAR'
    scene.render.image_settings.file_format = 'PNG'
    scene.render.filepath = os.path.join(OUT, "f_")
    bpy.ops.render.render(animation=True)
else:
    for liq in WELLS:                  # a partly-run plate reads better as a still
        liq.scale = (1, 1, 1.0 if liq["col"] < 7 else 0.04)
    carriage.location = (0.4, 0.9, 2.05)
    scene.render.image_settings.file_format = 'PNG'
    scene.render.filepath = os.path.join(OUT, "lab_still.png")
    bpy.ops.render.render(write_still=True)
print("DONE", MODE, scene.render.filepath)
