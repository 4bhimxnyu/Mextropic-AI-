# Mextropic — Design & Motion Specification

Extracted from Figma file `lqn7ySvScG1B6s8IE2BDOw`, page **iteration 5 — light v2**,
frame **Mextropic — Landing v2** (`170:7`), plus the Blender source at `hero3d/lab.py`.

Every number here was read off the file, not estimated. Where a figure is unverified
product data rather than a design value, it is marked **UNVERIFIED**.

---

## 1. Canvas

| Property | Value |
|---|---|
| Frame width | 1440px |
| Frame height | 7089px |
| Layout | Vertical auto-layout, gap 0 |
| Frame padding | `102 / 0 / 0 / 0` (top inset clears the fixed nav) |
| Fixed children | 1 — the nav is pinned, everything else scrolls |
| Content width | **1240px** |
| Side gutter | **100px** each side |

The 102px top padding exists solely to compensate for the pinned nav so no section shifts
when the nav becomes fixed. Do not remove one without the other.

---

## 2. Colour

Figma collection `Mextropic — Landing (2026)` (`VariableCollectionId:147:6`), three modes.
**Light is the shipped mode.**

| Token | Light | Navy | Light · Orange | Role |
|---|---|---|---|---|
| `bg/page` | `#ffffff` | `#080d18` | `#ffffff` | Page canvas |
| `surface/soft` | `#f5f8fc` | — | — | FAQ band |
| `surface/tint` | `#e7edf4` | — | — | Domain band, footer, glass fill |
| `text/primary` | `#111111` | `#e7edf4` | `#111111` | Headings, metric figures |
| `text/secondary` | `#4b5563` | `#6a8dab` | `#4b5563` | Body copy |
| `text/muted` | `#64748b` | `#4a6880` | `#64748b` | Captions, fine print |
| `border/default` | `#e2e8f0` | `#26384b` | `#e2e8f0` | All hairlines |
| `border/strong` | `#cbd5e1` | — | — | Muted fills |
| `accent/primary` | `#5a67d8` | — | `#fe6b1b` | Links, status, primary CTA |
| `accent/brand` | `#6674dc` | — | — | Secondary accent |

`text/muted` was added during the Refero alignment pass. It is `#64748b`, **not** the
reference's `#8f8f8f`: that value measures 3.0:1 on white and fails WCAG AA for small
text. `#64748b` measures **4.76:1**.

### Accent discipline

The accent is reserved for **status, confirmations, tags and one filled CTA**. It is never
a heading, never a background, never a border, never decoration. Metric figures are
`text/primary`, not accent — a metric is a heading, not a status.

### Section backgrounds

The page runs as one continuous tone ramp. Each section's start colour equals its
predecessor's end colour, so there are no colour steps at any boundary:

```
Hero / Credibility / How it works   #ffffff
Assay domains                       #e7edf4   (flat band)
Track it live                       #ffffff -> #ffffff (62%) -> #f4f7fc
Numerical highlights                #f4f7fc -> #ffffff         (bridge)
Final CTA                           #ffffff -> #edf3fa (50%) -> #dde8f6
FAQ                                 #f5f8fc
Footer                              #e7edf4
```

Separation between sections comes from a **1px `#e2e8f0` top rule**, not from a colour
change. Every section carries one except Hero, Nav and Numerical highlights — the last is
deliberately ruleless so the metrics read as belonging to the dashboard above it.

---

## 3. Typography

**Geist** and **Geist Mono**. Weight never exceeds Medium — headlines are Regular and get
their presence from size and negative tracking, not weight.

| Role | Font | Size | Tracking | Line height |
|---|---|---|---|---|
| Display | Geist Regular | 64px | −6% | 100% |
| H1 / section major | Geist Regular | 44px | −5% | 100% |
| H2 / section | Geist Regular | 30px | −5% | 110% |
| H3 / card title | Geist Regular | 18px | −2% | 130% |
| Lead | Geist Regular | 16px | −2% | 150% |
| Body | Geist Regular | 14px | 0 | 150% |
| Body emphasis | Geist Medium | 14px | 0 | 150% |
| Small | Geist Regular | 13px | 0 | 150% |
| Eyebrow / label | Geist Mono Regular | 11px | **+7.1%** | auto, uppercase |
| Data / tabular | Geist Mono Regular | 12px | 0 | auto |
| Caption (sentence) | Geist Mono Regular | 13px | 0 | auto |
| Footer wordmark | Geist Regular | 176px | −6% | 100% |

Two rules carry most of the weight:

1. **Never bold a headline.** Tight leading plus negative tracking is what makes display
   type read as architectural rather than shouty.
2. **11px +7.1% uppercase is a LABEL style.** A sentence set in it is unreadable — caps
   destroy word shape and the tracking stretches it. Sentence-length fine print uses the
   13px mono caption role at 0 tracking instead.

Geist Mono owns every label, metric unit, eyebrow, schema field and code line.

---

## 4. Spacing

### Section table

| Section | Height | Padding `T/R/B/L` | Inner gap | Content |
|---|---|---|---|---|
| Nav wrap | 103 | `22/100/12/100` | 0 | 1240 |
| Hero | 1017 | `72/0/0/0` | 0 | 1440 |
| Credibility strip | 120 | `36/100/36/100` | 32 | — |
| How it works | 1046 | `140/100/140/100` | 56 | 1240 |
| Assay domains | 953 | `140/0/140/0` | 56 | 1440 (bleeds) |
| Track it live | 1056 | `140/100/64/100` | 56 | 1240 |
| Numerical highlights | 328 | `64/100/64/100` | 40 | 1240 |
| Final CTA | 1104 | `64/100/140/100` | 56 | 1240 |
| FAQ | 819 | `140/100/140/100` | 56 | 1240 |
| Footer | 544 | `0/0/0/0` | 0 | 1440 |

### The rhythm rule

Standard section padding is **140px** top and bottom. Where two sections belong together,
the closing gap is split evenly at **64 + 64 = 128px**. That is why Track it live is
`140/…/64`, Numerical highlights is `64/…/64` and Final CTA is `64/…/140`: the metrics
panel sits in a 128px gap on both sides, binding it to the dashboard above and the CTA
below. **Shared gaps are split across both sections, never dumped on one.**

### Internal

- Two-column splits (`Steps split`, `FAQ split`, `Footer top`) use an **80px** column gap.
- Metric columns: 4 × 310px, `20/24/0/0` padding, 1px top rule each.
- Metrics panel inner padding: **40px** all round.

---

## 5. Components

| Component | Size | Radius | Fill | Border | Shadow |
|---|---|---|---|---|---|
| Nav bar | 1240×69 | 999 | `#ffffff` @72% | `#e2e8f0` | `0 12px 36px #101828@10%` |
| Intake form | 1240×616 | 20 | `#ffffff` | `#e2e8f0` | `0 18px 48px #121c33@10%` |
| Dashboard panel | 1240×660 | 20 | `#ffffff` | `#e2e8f0` | `0 18px 44px #121c33@10%` |
| Domain card | 300×250 | 16 | photo + tint + scrim | — | — |
| Card button | 136×32 | 999 | `#ffffff` @94% | — | — |
| Card grip | 28×28 | 8 | `#ffffff` @16% | — | — |
| Metrics glass panel | 1240×200 | 16 | `#e7edf4` @50% | `#dbe3ee` | none, `backdrop-blur 24` |

Nav padding `12/14/12/22`, item gap 36. Form padding `40/44/34/44`, field gap 22.

**The glass panel.** A *white* translucent fill over a near-white ground is invisible —
measured, it differed from its background by 1–5 levels. Glass on a light ground must be
slightly **cooler and darker** than the paper. The `backdrop-blur` is declared but has
nothing to bite on, because the only thing behind it is a smooth gradient, and blurring a
smooth gradient returns the same gradient. It reads as a translucent pane, not frost.

**Domain cards** are three stacked layers — `Photo` (full bleed), `Tint` (full bleed),
`Scrim` (bottom 140px) — then `Grip` top-left and `Footer` bottom. The footer is
bottom-aligned at a fixed 104px so its content never shifts the card.

---

## 6. Motion

Figma's timeline for this frame is `170:7`, **24 seconds**. Figma motion is **time-based
only — there is no scroll trigger**, so anything below described as scroll-driven is a
specification for the build, not something the Figma file performs.

### 6.1 Hero lab loop

Rendered in Blender, not keyframed in Figma. In Figma it is a 360-layer flipbook (stacked
images with HOLD opacity keyframes) purely because Figma cannot hold video.

**In the build, use the video.** `hero-lab.mp4` + `.webm`, poster `hero-poster.jpg`.

- Source render: 360 frames at 60fps = **6 seconds**
- Shipped asset is **ping-pong**: the render followed by its own reverse, 718 frames /
  **11.97s**, so the plain `loop` attribute gives a continuous to-and-fro
- The duplicate frames at both turnarounds are dropped in the encode
  (`reverse,trim=start_frame=1:end_frame=359`), so neither the hand-over nor the loop
  point stutters
- Do **not** reverse in JS by stepping `currentTime` backwards — that is a seek per
  frame and judders at 1718x770/60fps. Bake the reverse into the file
- Starts within **0.5s** of load
- `<source>` order: **MP4 first, then WebM.** Safari's WebM support is partial and can
  pass `canPlayType` then fail to decode. Skip AV1 — M1/M2 lack hardware decode.

### 6.2 Tick ring — "Four steps to data"

**It is a radial dial, not a bar.** Frame `304:6`, 640×470. 72 tick rectangles of
5×46px arranged on a circle, one every **5°**, inner radius **150px**, outer radius
**196px**. The centre holds "Pilot cycle" (Geist 22px) above the percentage (Geist Mono
13px, accent). The whole section is a two-column split: heading + dial on the left, dek
+ the four steps on the right, steps dimmed to **0.34** until active.

In CSS each tick is placed at the centre with `transform-origin: 50% 0` and
`transform: rotate(Ndeg) translateY(-196px)`, which rotates first and then pushes the
tick out along its own rotated axis.

Each tick carries a `fills` keyframe track on the 24s timeline.

- Idle `#e2e8f0`; active colour varies per tick around the ring, sweeping `#2b56d1` (blue)
  → `#7d67b3` (violet) → `#f77f67` (orange) → back to blue
- Each tick lights **70ms** after the one before it — a travelling pulse
- Lights with `EASE_OUT`, extinguishes with `EASE_IN_AND_OUT` over 300ms
- Full sweep out and back within the 24s loop

### 6.3 Metrics reveal

| Element | Tracks | Start | End |
|---|---|---|---|
| Glass panel | `OPACITY` 0→1 | 0s | 0.45s |
| `500+` | `OPACITY` + `TRANSLATION_Y` | 0.12s | 0.62s |
| `79` | same | 0.21s | 0.71s |
| `24 hrs` | same | 0.30s | 0.80s |
| `3–4 wks` | same | 0.39s | 0.89s |

Rise **14px**, duration **500ms**, stagger **90ms**, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
The panel settles first so the columns land onto a surface that already exists.

Every keyframe track's `baseValue` is set to the **end** state. Figma renders a node's
resting value, not t=0 — setting the base to the start value yields an invisible section
in every screenshot and export.

**Figma cannot count up.** Keyframes interpolate numeric *properties*, not text content,
so `500+` ticking from zero has to be built in code.

### 6.4 Scroll progress — build-only

Not expressible in Figma. The readout steps `0 → 25 → 50 → 75 → 100%` on the way down and
exactly reverses on the way up, clamped at both ends.

Map progress to the **section's own extent**, never a fixed viewport window:

```js
const travel = section.height + viewportHeight * 0.5;
const raw    = (viewportHeight * 0.85 - rect.top) / travel;
const p      = Math.min(1, Math.max(0, raw));
const active = Math.round(p * 4);          // 0..4 -> 0/25/50/75/100
```

A fixed window saturates at 100% early and then sits there for the rest of the section, so
scrolling further appears to do nothing. Use `Math.round`, not `Math.floor` — floor makes
100% reachable only at exactly p=1.

### 6.5 Nav

Fixed to the top. Below 24px scroll it is transparent; past that it gains the `#ffffff`@72%
fill, the hairline and the shadow. The shadow's parent must **not** clip — a clipping
parent silently caps every shadow on a child.

### 6.6 Accessibility

- Honour `prefers-reduced-motion: reduce` — show final states, run nothing.
- The 6s auto-playing hero needs a pause control to satisfy **WCAG 2.2.2** (Level A).
- Provide a `<noscript>` poster fallback.

---

## 7. Blender render — `hero3d/lab.py`

Blender 4.2.9 LTS, headless via `bpy`.

| Setting | Value |
|---|---|
| Engine | `BLENDER_EEVEE_NEXT` |
| Resolution | 2560 × 1100 (aspect 1100/2560) |
| Frames | 180 (rendered at 360 for the 60fps flipbook) |
| View transform | **`Standard`** |
| Look | `None` |
| Exposure | `0.0` |
| Camera | loc `(8.2, −18.2, 8.6)`, rot `(69°, 0, 24°)`, **50mm** |

### The tonemapper finding

The render first read dull and grey against the white page — measured page 252 vs render
145–155. Raising exposure only reached 183/198. **The cause was the tonemapper, not the
exposure:** AgX compresses highlights and cannot resolve to near-white. Switching to
`Standard` with a white world fixed it, and the key light then had to come *down* from
3900 to 1450.

### Materials

| Name | Base | Roughness | Notes |
|---|---|---|---|
| bench | `#F3F6FB` | 0.55 | |
| bench2 | `#DCE4F0` | 0.56 | |
| plate | `#FDFEFF` | 0.26 | coat 0.5 |
| well | `#BDC8DA` | 0.44 | |
| liquid | `#3B49CE` | 0.20 | coat 0.45 |
| liquid2 | `#6674DC` | 0.20 | coat 0.45 |
| steel | `#AFBCCF` | 0.30 | metal 0.7 |
| white | `#FBFCFE` | 0.36 | |
| dark | `#1F2B49` | 0.36 | |
| glass | `#E8F0FB` | 0.08 | coat 1.0, alpha 0.30 |
| accent | `#5A67D8` | 0.28 | emissive `#6674DC` @1.2 |

### Lighting

| Light | Location | Size | Power | Colour |
|---|---|---|---|---|
| key | `(−9, −12, 13)` | 12 | **1450** | `#FFFFFF` |
| fill | `(12, −10, 5)` | 16 | 320 | `#E8F1FF` |
| rim | `(0, 14, 7)` | 18 | 600 | `#DCE8FA` |

### Plate and the sync rule

96-well plate, **12 columns × 8 rows**. The carriage sweeps across, filling wells as it
passes.

The carriage motion is **eased**, so well-fill timing must be derived from the carriage's
*evaluated* position, not from a linear frame count:

```python
xfc = next(fc for fc in carriage.animation_data.action.fcurves
           if fc.data_path == "location" and fc.array_index == 0)
xs  = [xfc.evaluate(f) for f in range(1, FRAMES + 1)]
```

**General rule: if you ease a driver, anything timed against it must derive from the
driver's evaluated value**, or it desynchronises.

---

## 8. Content status

These figures appear in the design and are **UNVERIFIED**:

- **500+** scientists — needs a definition of active / affiliated / accessible
- **79 assays across 14 domains** — the domain list totals **70** across **12** domains
- **24 hours** to quote, **3–4 weeks** to data — start point and conditions undefined
- Dashboard numbers 128 / 96 / 12 / 3 are illustrative
- Office addresses are a placeholder
- Institution logos (IIT Madras, Stanford, UCSF) need permission before publication

Per-domain assay counts were removed from the cards, so the 70-vs-79 discrepancy is no
longer visible on the page. It is resolved by omission, not reconciliation.
