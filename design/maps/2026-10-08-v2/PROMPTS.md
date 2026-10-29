---
id: 20261009-maps-v2-prompts
title: "UNDERFALL — ชุด prompt ภาพแมพ v2"
tags: [maps, design]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-design-current]
summary: "ปัจจุบัน: UNDERFALL — ชุด prompt ภาพแมพ v2; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime"
status: current-prompt-record
aliases: ["design/maps/2026-10-08-v2/PROMPTS.md"]
design_baseline: UF-DESIGN-2026-10-09
---

# UNDERFALL — ชุด prompt ภาพแมพ v2

> **พรอมต์/ผลสร้างตามประวัติของชุดที่เลือก:** การใช้งานปัจจุบันต้องตาม [design-current.md](../../../design-current.md) โดยเฉพาะพิกัดUF-LAYOUT-2026-10-09และหน้าVoidที่เปิดหลังต้นไม้ ไม่เขียนทับข้อความpromptเดิมเพื่อให้เหมือนว่าใช้สร้างใหม่แล้ว

เครื่องมือ: built-in image_gen ของ Codex; ไม่ใช้ CLI/API สำรอง; opaque PNG
แยกหนึ่งคำขอต่อหนึ่งภาพ ทุกภาพที่เลือกบันทึกในโปรเจกต์ รุ่น v1 ไม่ถูกแก้
สัดส่วน 25%/45% เป็นเป้าภาพและข้อกำหนดตอนสร้างจริง ไม่ใช่ผลวัด collision

## รอบ A — ฐานขยายกลางงาน

ภาพฐานแปดไฟล์ถูกเก็บใน inputs/pass-a หลังคำขอเพิ่มเปอร์เซ็นต์ ภายในปราสาทใช้ v1

### 01 — ป่าต้นเรื่อง

Input: [v1](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v1/01-r00-forest-and-sacred-grove-v1b.png>)
Baseline: [pass-a](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/01-r00-forest-and-sacred-grove-pass-a.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL pixel RPG map revision, design preview, NOT runtime screenshot.
Input image 1 is the EDIT TARGET and the locked art-style reference. Preserve its high-quality crisp 8-bit pixel-art tiles, top-down orthogonal gameplay view with visible north-facing walls, biome palette, light temperature, landmarks, recognizable room/building styles, tiny hero scale, opaque charcoal background and landscape map-board presentation. Change layout only as needed to INCREASE ACTUAL WALKABLE FLOOR SPACE; this is not image upscaling or merely larger decorative scenery. Make the revised playable ground visibly more spacious than input. Reduce repeated trees/obstructing props and use previously wasted gaps. Do not zoom in, shrink the tiny character, flatten the art, switch to isometric, add painterly textures or change existing lore. Keep chest C / cyan memory M / gold SAVE star S / secret D design markers and their reachable approaches. Existing short labels and legend may remain but no prose paragraphs. Preserve room order and branch identities; closed progress gates can't have open adjacent bypasses. Pixel-perfect hard edges, no watermark. Landscape 1536x1024.
Area-specific edit:
Widen the existing pale dirt routes and all usable bridges to roughly three or four tiny-character widths by pulling dense trees back, not by scaling character or zooming. Enlarge the starting circular blue-flower clearing and one central exploration clearing. Keep both root-blocked chest and separate root-blocked onward passage obvious, with a small C-flame cue as the existing teaching gate. Preserve the upper-right enclosed waterfall grove, fox-marked split rock, old-ring chest, all optional alcoves and transient floating MAIN RIFT at far right without masonry pillars. Grove remains optional; never route all players through it. No extra puzzle or new doors.
```

### 02 — รูน

Input: [v1](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v1/02-r01-expanded-ruins-v1b.png>)
Baseline: [pass-a](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/02-r01-expanded-ruins-pass-a.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL pixel RPG map revision, design preview, NOT runtime screenshot.
Input image 1 is the EDIT TARGET and the locked art-style reference. Preserve its high-quality crisp 8-bit pixel-art tiles, top-down orthogonal gameplay view with visible north-facing walls, biome palette, light temperature, landmarks, recognizable room/building styles, tiny hero scale, opaque charcoal background and landscape map-board presentation. Change layout only as needed to INCREASE ACTUAL WALKABLE FLOOR SPACE; this is not image upscaling or merely larger decorative scenery. Make the revised playable ground visibly more spacious than input. Reduce repeated trees/obstructing props and use previously wasted gaps. Do not zoom in, shrink the tiny character, flatten the art, switch to isometric, add painterly textures or change existing lore. Keep chest C / cyan memory M / gold SAVE star S / secret D design markers and their reachable approaches. Existing short labels and legend may remain but no prose paragraphs. Preserve room order and branch identities; closed progress gates can't have open adjacent bypasses. Pixel-perfect hard edges, no watermark. Landscape 1536x1024.
Area-specific edit:
Expand actual purple-tiled walking floors of rooms and hallways, and enlarge the leaf/SAVE lobby to an open rest courtyard. Keep all existing tutorial rooms and their relative story order: flower garden, encounter, safe shoe-gift vestibule, six plates, three wall switches, dummy, spike-grid, long independence corridor, independent puzzles/rests/shops, final color rooms, Toriel house exit. Show small brass puzzle-gate barriers at three-wall-switch room exit and at final color-room exits; no open side route bypassing them. Preserve separate leaf-path lower inset. Final labels/symbols EXACT: WEST BLUE CIRCLE, SOUTH RED TRIANGLE, EAST GREEN STAR. Do not change correct colors to yellow. Keep spike-grid and leaf puzzle internals as reference footprint, only add safe standing margins; don't invent new solutions. No phone gift in vestibule. Enlarge rooms by reducing vacant charcoal inter-room gaps, not shrinking pixels.
```

### 04 — เมืองหิมะ

Input: [v1](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v1/04-r02-snowdin-expanded-v1b.png>)
Baseline: [pass-a](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/04-r02-snowdin-expanded-pass-a.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL pixel RPG map revision, design preview, NOT runtime screenshot.
Input image 1 is the EDIT TARGET and the locked art-style reference. Preserve its high-quality crisp 8-bit pixel-art tiles, top-down orthogonal gameplay view with visible north-facing walls, biome palette, light temperature, landmarks, recognizable room/building styles, tiny hero scale, opaque charcoal background and landscape map-board presentation. Change layout only as needed to INCREASE ACTUAL WALKABLE FLOOR SPACE; this is not image upscaling or merely larger decorative scenery. Make the revised playable ground visibly more spacious than input. Reduce repeated trees/obstructing props and use previously wasted gaps. Do not zoom in, shrink the tiny character, flatten the art, switch to isometric, add painterly textures or change existing lore. Keep chest C / cyan memory M / gold SAVE star S / secret D design markers and their reachable approaches. Existing short labels and legend may remain but no prose paragraphs. Preserve room order and branch identities; closed progress gates can't have open adjacent bypasses. Pixel-perfect hard edges, no watermark. Landscape 1536x1024.
Area-specific edit:
Expand snow-covered walkable ground substantially. Main trails and bridges at least three or four tiny-character widths. A genuinely open town square before INN/SHOP with clear floor larger than those buildings' footprints; buildings and trees around its edges, not in its center. Enlarge first-Sans clearing. Keep lower-left ice puzzle area; place a small closed gate ONLY at that ice-course exit connecting onward to town, with a tiny cyan P1 designer annotation. Keep optional fishing/forest loop accessed after this gate rather than bypassing it. Keep upper-right cave C4 a normal chest, no violet dimensional portal. Existing left FROM RUINS, right TO LANTERN MEADOW. Preserve cold cyan-purple snow and warm lamps.
```

### 05 — ทุ่งโคมลอย

Input: [v1](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v1/05-r06-lantern-meadow-v1.png>)
Baseline: [pass-a](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/05-r06-lantern-meadow-pass-a.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL pixel RPG map revision, design preview, NOT runtime screenshot.
Input image 1 is the EDIT TARGET and the locked art-style reference. Preserve its high-quality crisp 8-bit pixel-art tiles, top-down orthogonal gameplay view with visible north-facing walls, biome palette, light temperature, landmarks, recognizable room/building styles, tiny hero scale, opaque charcoal background and landscape map-board presentation. Change layout only as needed to INCREASE ACTUAL WALKABLE FLOOR SPACE; this is not image upscaling or merely larger decorative scenery. Make the revised playable ground visibly more spacious than input. Reduce repeated trees/obstructing props and use previously wasted gaps. Do not zoom in, shrink the tiny character, flatten the art, switch to isometric, add painterly textures or change existing lore. Keep chest C / cyan memory M / gold SAVE star S / secret D design markers and their reachable approaches. Existing short labels and legend may remain but no prose paragraphs. Preserve room order and branch identities; closed progress gates can't have open adjacent bypasses. Pixel-perfect hard edges, no watermark. Landscape 1536x1024.
Area-specific edit:
Expand the grass paths, stream bridges and central tea-village floor to several-character-width clear routes. Make the central cobbled social plaza a broad open gathering space with stalls, seats and trees on the edges. Create a second quieter broad grass rest clearing in upper flower field, without filling it with dense flower props. Keep chest/memory clues, piers, lower loop and large upper-right hollow tree and D1 timeline door. Main west-to-east route stays OPEN with no forced puzzle. Place a discreet three-lantern hint grouping only in optional secluded tree/door approach; no extra portal or exterior sunshine. Preserve underground lantern-lit teal/green/amber palette.
```

### 06 — น้ำตก

Input: [v1](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v1/06-r03-waterfall-and-guard-paths-v1.png>)
Baseline: [pass-a](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/06-r03-waterfall-and-guard-paths-pass-a.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL pixel RPG map revision, design preview, NOT runtime screenshot.
Input image 1 is the EDIT TARGET and the locked art-style reference. Preserve its high-quality crisp 8-bit pixel-art tiles, top-down orthogonal gameplay view with visible north-facing walls, biome palette, light temperature, landmarks, recognizable room/building styles, tiny hero scale, opaque charcoal background and landscape map-board presentation. Change layout only as needed to INCREASE ACTUAL WALKABLE FLOOR SPACE; this is not image upscaling or merely larger decorative scenery. Make the revised playable ground visibly more spacious than input. Reduce repeated trees/obstructing props and use previously wasted gaps. Do not zoom in, shrink the tiny character, flatten the art, switch to isometric, add painterly textures or change existing lore. Keep chest C / cyan memory M / gold SAVE star S / secret D design markers and their reachable approaches. Existing short labels and legend may remain but no prose paragraphs. Preserve room order and branch identities; closed progress gates can't have open adjacent bypasses. Pixel-perfect hard edges, no watermark. Landscape 1536x1024.
Area-specific edit:
Expand actual land terraces and all main wooden bridges to three or four character widths; keep blue water and waterfalls dominant at scenic edges but increase walkable ground. Enlarge village market landing into a genuinely open safe social plaza. Before the guard-route entrance, show one focused water-level puzzle: safe broad platform, small lever, short missing bridge gap and visible closed gate on the ONLY onward connection; tiny P1 note. Keep alternative treasure loops on approach side until this gate opens, not an early route around it. Guard arena/training terraces remain open, uncluttered. Preserve waterfalls, echo-flower mural route, lower chest recesses and ordinary hidden alcove D1; don't turn it into dimensional scientist portal.
```

### 07 — เขตทดลอง

Input: [v1](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v1/07-r04-laboratory-industrial-stage-v1.png>)
Baseline: [pass-a](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/07-r04-laboratory-industrial-stage-pass-a.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL pixel RPG map revision, design preview, NOT runtime screenshot.
Input image 1 is the EDIT TARGET and the locked art-style reference. Preserve its high-quality crisp 8-bit pixel-art tiles, top-down orthogonal gameplay view with visible north-facing walls, biome palette, light temperature, landmarks, recognizable room/building styles, tiny hero scale, opaque charcoal background and landscape map-board presentation. Change layout only as needed to INCREASE ACTUAL WALKABLE FLOOR SPACE; this is not image upscaling or merely larger decorative scenery. Make the revised playable ground visibly more spacious than input. Reduce repeated trees/obstructing props and use previously wasted gaps. Do not zoom in, shrink the tiny character, flatten the art, switch to isometric, add painterly textures or change existing lore. Keep chest C / cyan memory M / gold SAVE star S / secret D design markers and their reachable approaches. Existing short labels and legend may remain but no prose paragraphs. Preserve room order and branch identities; closed progress gates can't have open adjacent bypasses. Pixel-perfect hard edges, no watermark. Landscape 1536x1024.
Area-specific edit:
Increase actual cool-blue tiled laboratory walking floors, wide safe grated factory bridges and purple stage approach. Create a spacious unobstructed maintenance/control plaza before factory. Add one readable power-routing puzzle alcove: 3 rotateable straight/corner pipe modules between square source and closed bridge controller, tiny P1; gate only across its onward factory connection. Keep room boundaries, left entrance and right exit, two separate stage zones and B1 True Lab inset. Preserve sad living amorphous patients with caring beds, no gore. No walking in lava or new heat-proof item mechanic. Keep actual paths several tiny-character widths; consoles/tubes/tables at edges.
```

### 08 — สถานีลืมเวลา

Input: [v1](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v1/08-r07-forgotten-station-v1.png>)
Baseline: [pass-a](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/08-r07-forgotten-station-pass-a.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL pixel RPG map revision, design preview, NOT runtime screenshot.
Input image 1 is the EDIT TARGET and the locked art-style reference. Preserve its high-quality crisp 8-bit pixel-art tiles, top-down orthogonal gameplay view with visible north-facing walls, biome palette, light temperature, landmarks, recognizable room/building styles, tiny hero scale, opaque charcoal background and landscape map-board presentation. Change layout only as needed to INCREASE ACTUAL WALKABLE FLOOR SPACE; this is not image upscaling or merely larger decorative scenery. Make the revised playable ground visibly more spacious than input. Reduce repeated trees/obstructing props and use previously wasted gaps. Do not zoom in, shrink the tiny character, flatten the art, switch to isometric, add painterly textures or change existing lore. Keep chest C / cyan memory M / gold SAVE star S / secret D design markers and their reachable approaches. Existing short labels and legend may remain but no prose paragraphs. Preserve room order and branch identities; closed progress gates can't have open adjacent bypasses. Pixel-perfect hard edges, no watermark. Landscape 1536x1024.
Area-specific edit:
Expand main station concourse, stairways and lower garden loop. Central cafe/parcel square should have a large clear walkable floor, enough for relaxed wandering, with cafe tables, crates and greenery on edges rather than filling the plaza. Widen the upper train platform too. Preserve static train car, large clock and secluded upper-right violet D1 door. No mandatory puzzle blocks main left-to-right path. An optional clock-maintenance access panel is visible near D1 approach, giving a puzzle clue, not an extra door or required quest. Remain an underground quiet gray-plum station with warm lamps; no working transport teleport to castle.
```

### 09 — เมืองหน้าปราสาท

Input: [v1](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v1/09-r05-royal-town-castle-approach-v1.png>)
Baseline: [pass-a](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/09-r05-royal-town-castle-approach-pass-a.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL pixel RPG map revision, design preview, NOT runtime screenshot.
Input image 1 is the EDIT TARGET and the locked art-style reference. Preserve its high-quality crisp 8-bit pixel-art tiles, top-down orthogonal gameplay view with visible north-facing walls, biome palette, light temperature, landmarks, recognizable room/building styles, tiny hero scale, opaque charcoal background and landscape map-board presentation. Change layout only as needed to INCREASE ACTUAL WALKABLE FLOOR SPACE; this is not image upscaling or merely larger decorative scenery. Make the revised playable ground visibly more spacious than input. Reduce repeated trees/obstructing props and use previously wasted gaps. Do not zoom in, shrink the tiny character, flatten the art, switch to isometric, add painterly textures or change existing lore. Keep chest C / cyan memory M / gold SAVE star S / secret D design markers and their reachable approaches. Existing short labels and legend may remain but no prose paragraphs. Preserve room order and branch identities; closed progress gates can't have open adjacent bypasses. Pixel-perfect hard edges, no watermark. Landscape 1536x1024.
Area-specific edit:
Make the central fountain plaza truly spacious with a wide clear annulus for walking, main avenue and bridges several-character-width, broad castle forecourt reached by wide stairs. Push buildings, lampposts, flower planters to edges without changing their architecture or palette. Preserve left entry, royal castle locked main gate on top, hidden chests, library, side gardens, water channels. No new mandatory puzzle between town rest and final story; castle main gate remains story-controlled. Keep underground lighting and no surface daylight/sky. Do not remove all narrow optional alleyways; contrast broad main routes with intimate optional alleys.
```

## รอบ B — ผลเลือกตามคำขอเพิ่ม 25%/45% และประตูอาคาร

### 01 — ป่าต้นเรื่อง

Input (edit target / style locked): [ภาพฐาน](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/01-r00-forest-and-sacred-grove-pass-a.png>)
Selected: [ผล](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/01-r00-forest-and-sacred-grove-v2.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL game-map design preview, not implementation.
Input image 1: EDIT TARGET and authoritative APPROVED ART STYLE. Preserve crisp 8-bit pixel art, top-down orthogonal view, original biome palette/lighting, small-character scale, iconic scenery, charcoal margins, C/M/S/D markers and landscape1536x1024 map-board framing. User requests FURTHER expansion: increase the actual clear walking WIDTH of connecting paths/bridges/stairs by approximately25% relative to this input; expand the usable walking AREA of selected scenic plazas by approximately45%. Move edge vegetation/furniture/building placement as needed; do NOT achieve this by scaling the whole image, shrinking the player or changing camera zoom. Prioritize spacious traversable ground, preserve intimate OPTIONAL nooks. Keep all main story landmark order and optional chest/memory branches. No jump skills, no unlocked story shortcuts, no new plot events. Add ordinary building doors ONLY as specified. Small E labels beside ordinary thresholds mean ENTERABLE and are NOT violet timeline doors. No text paragraphs, no gore, no photorealism, no 3D isometric, no watermark. Maintain original style and restrained bright palette.
Specific requested change:
Selected +45% scenic walking floors: initial flower clearing and waterfall-grove viewing terrace. Keep woods enclosing the route, optional grove/ring/N branch and transient rift. No new building.
```

### 02 — รูน

Input (edit target / style locked): [ภาพฐาน](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/02-r01-expanded-ruins-pass-a.png>)
Selected: [ผล](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/02-r01-expanded-ruins-v2.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL game-map design preview, not implementation.
Input image 1: EDIT TARGET and authoritative APPROVED ART STYLE. Preserve crisp 8-bit pixel art, top-down orthogonal view, original biome palette/lighting, small-character scale, iconic scenery, charcoal margins, C/M/S/D markers and landscape1536x1024 map-board framing. User requests FURTHER expansion: increase the actual clear walking WIDTH of connecting paths/bridges/stairs by approximately25% relative to this input; expand the usable walking AREA of selected scenic plazas by approximately45%. Move edge vegetation/furniture/building placement as needed; do NOT achieve this by scaling the whole image, shrinking the player or changing camera zoom. Prioritize spacious traversable ground, preserve intimate OPTIONAL nooks. Keep all main story landmark order and optional chest/memory branches. No jump skills, no unlocked story shortcuts, no new plot events. Add ordinary building doors ONLY as specified. Small E labels beside ordinary thresholds mean ENTERABLE and are NOT violet timeline doors. No text paragraphs, no gore, no photorealism, no 3D isometric, no watermark. Maintain original style and restrained bright palette.
Specific requested change:
Selected +45% area: independent leaf/SAVE courtyard. Add safe margins to instructional rooms, not extra mandatory puzzles. Spider bake-stall can have a tiny walk-in side bakery with clearly accessible ordinary door E1 on the resting corridor, but keep existing spider shop and Nap corridor. WEST BLUE CIRCLE / SOUTH RED TRIANGLE / EAST GREEN STAR unchanged. Keep the marked visual routes illustrative of sequenced rooms rather than adding open bypasses.
```

### 04 — เมืองหิมะ

Input (edit target / style locked): [ภาพฐาน](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/04-r02-snowdin-expanded-pass-a.png>)
Selected: [ผล](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/04-r02-snowdin-expanded-v2.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL game-map design preview, not implementation.
Input image 1: EDIT TARGET and authoritative APPROVED ART STYLE. Preserve crisp 8-bit pixel art, top-down orthogonal view, original biome palette/lighting, small-character scale, iconic scenery, charcoal margins, C/M/S/D markers and landscape1536x1024 map-board framing. User requests FURTHER expansion: increase the actual clear walking WIDTH of connecting paths/bridges/stairs by approximately25% relative to this input; expand the usable walking AREA of selected scenic plazas by approximately45%. Move edge vegetation/furniture/building placement as needed; do NOT achieve this by scaling the whole image, shrinking the player or changing camera zoom. Prioritize spacious traversable ground, preserve intimate OPTIONAL nooks. Keep all main story landmark order and optional chest/memory branches. No jump skills, no unlocked story shortcuts, no new plot events. Add ordinary building doors ONLY as specified. Small E labels beside ordinary thresholds mean ENTERABLE and are NOT violet timeline doors. No text paragraphs, no gore, no photorealism, no 3D isometric, no watermark. Maintain original style and restrained bright palette.
Specific requested change:
Selected +45% area: town square and first-Sans clearing. Explicit ordinary enterable buildings with clear door thresholds: existing twin-roof house E1 (shared Sans/Papyrus home), INN E3, SHOP E4, and add a compact cozy GRILLBY'S bar building E2 along plaza edge, NOT in the open center. Retain C4 ordinary cave. Correct P1 gating: ice course lower-left console controls full-width CLOSED gates on both central horizontal bridge and northern river bridge toward town; lower route east of course also gated under same flag. No free entry via upper loop. Preserve region boundaries, west Ruins entrance, east meadow exit.
```

### 05 — ทุ่งโคมลอย

Input (edit target / style locked): [ภาพฐาน](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/05-r06-lantern-meadow-pass-a.png>)
Selected: [ผล](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/05-r06-lantern-meadow-v2.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL game-map design preview, not implementation.
Input image 1: EDIT TARGET and authoritative APPROVED ART STYLE. Preserve crisp 8-bit pixel art, top-down orthogonal view, original biome palette/lighting, small-character scale, iconic scenery, charcoal margins, C/M/S/D markers and landscape1536x1024 map-board framing. User requests FURTHER expansion: increase the actual clear walking WIDTH of connecting paths/bridges/stairs by approximately25% relative to this input; expand the usable walking AREA of selected scenic plazas by approximately45%. Move edge vegetation/furniture/building placement as needed; do NOT achieve this by scaling the whole image, shrinking the player or changing camera zoom. Prioritize spacious traversable ground, preserve intimate OPTIONAL nooks. Keep all main story landmark order and optional chest/memory branches. No jump skills, no unlocked story shortcuts, no new plot events. Add ordinary building doors ONLY as specified. Small E labels beside ordinary thresholds mean ENTERABLE and are NOT violet timeline doors. No text paragraphs, no gore, no photorealism, no 3D isometric, no watermark. Maintain original style and restrained bright palette.
Specific requested change:
Selected +45% area: central tea plaza and upper grass scenic clearing. Set front tea-shop/cottage door E1 visibly enterable, shop counter INSIDE the cottage rather than only street stall. Keep some outdoor seating and stalls. No puzzle across main travel; hollow tree/D1 optional only.
```

### 06 — น้ำตก

Input (edit target / style locked): [ภาพฐาน](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/06-r03-waterfall-and-guard-paths-pass-a.png>)
Selected: [ผล](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/06-r03-waterfall-and-guard-paths-v2.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL game-map design preview, not implementation.
Input image 1: EDIT TARGET and authoritative APPROVED ART STYLE. Preserve crisp 8-bit pixel art, top-down orthogonal view, original biome palette/lighting, small-character scale, iconic scenery, charcoal margins, C/M/S/D markers and landscape1536x1024 map-board framing. User requests FURTHER expansion: increase the actual clear walking WIDTH of connecting paths/bridges/stairs by approximately25% relative to this input; expand the usable walking AREA of selected scenic plazas by approximately45%. Move edge vegetation/furniture/building placement as needed; do NOT achieve this by scaling the whole image, shrinking the player or changing camera zoom. Prioritize spacious traversable ground, preserve intimate OPTIONAL nooks. Keep all main story landmark order and optional chest/memory branches. No jump skills, no unlocked story shortcuts, no new plot events. Add ordinary building doors ONLY as specified. Small E labels beside ordinary thresholds mean ENTERABLE and are NOT violet timeline doors. No text paragraphs, no gore, no photorealism, no 3D isometric, no watermark. Maintain original style and restrained bright palette.
Specific requested change:
Selected +45% area: village market scenic square overlooking the water. Add one distinctive fish-shaped stone-roof dwelling E1 for Undyne along guard-side edge of map reached by a safe footpath; does not obstruct main route or erase murals. Convert one existing village shop to a real enterable building E2 with visible door, retain remaining outdoor stall. P1 water bridge puzzle gates onward route toward laboratory after open exploration/guard zone, not access to shops. Keep D1 ordinary recess.
```

### 07 — เขตทดลอง

Input (edit target / style locked): [ภาพฐาน](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/07-r04-laboratory-industrial-stage-pass-a.png>)
Selected: [ผล](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/07-r04-laboratory-industrial-stage-v2.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL game-map design preview, not implementation.
Input image 1: EDIT TARGET and authoritative APPROVED ART STYLE. Preserve crisp 8-bit pixel art, top-down orthogonal view, original biome palette/lighting, small-character scale, iconic scenery, charcoal margins, C/M/S/D markers and landscape1536x1024 map-board framing. User requests FURTHER expansion: increase the actual clear walking WIDTH of connecting paths/bridges/stairs by approximately25% relative to this input; expand the usable walking AREA of selected scenic plazas by approximately45%. Move edge vegetation/furniture/building placement as needed; do NOT achieve this by scaling the whole image, shrinking the player or changing camera zoom. Prioritize spacious traversable ground, preserve intimate OPTIONAL nooks. Keep all main story landmark order and optional chest/memory branches. No jump skills, no unlocked story shortcuts, no new plot events. Add ordinary building doors ONLY as specified. Small E labels beside ordinary thresholds mean ENTERABLE and are NOT violet timeline doors. No text paragraphs, no gore, no photorealism, no 3D isometric, no watermark. Maintain original style and restrained bright palette.
Specific requested change:
Selected +45% area: lab/control foyer and safe stage audience floor. Clearly enterable laboratory front doorway E1 and ordinary robot-part shop doorway E2 at foyer edge. Factory progress must be gated under P1 power flag on ALL forward bridges (upper/lower both gated), not an open bridge around controller. B1 patient care rooms stay accessible in their story order; no seven-soul truth added.
```

### 08 — สถานีลืมเวลา

Input (edit target / style locked): [ภาพฐาน](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/08-r07-forgotten-station-pass-a.png>)
Selected: [ผล](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/08-r07-forgotten-station-v2.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL game-map design preview, not implementation.
Input image 1: EDIT TARGET and authoritative APPROVED ART STYLE. Preserve crisp 8-bit pixel art, top-down orthogonal view, original biome palette/lighting, small-character scale, iconic scenery, charcoal margins, C/M/S/D markers and landscape1536x1024 map-board framing. User requests FURTHER expansion: increase the actual clear walking WIDTH of connecting paths/bridges/stairs by approximately25% relative to this input; expand the usable walking AREA of selected scenic plazas by approximately45%. Move edge vegetation/furniture/building placement as needed; do NOT achieve this by scaling the whole image, shrinking the player or changing camera zoom. Prioritize spacious traversable ground, preserve intimate OPTIONAL nooks. Keep all main story landmark order and optional chest/memory branches. No jump skills, no unlocked story shortcuts, no new plot events. Add ordinary building doors ONLY as specified. Small E labels beside ordinary thresholds mean ENTERABLE and are NOT violet timeline doors. No text paragraphs, no gore, no photorealism, no 3D isometric, no watermark. Maintain original style and restrained bright palette.
Specific requested change:
Selected +45% area: central cafe/parcel plaza and lower garden promenade. Cafe E1 and antiques E2 have clear enterable front thresholds, parcel office E3 ordinary doorway; train stays static. D1 secluded clock-side mystery route optional. Main west-east path open, no forced cafe quest.
```

### 09 — เมืองหน้าปราสาท

Input (edit target / style locked): [ภาพฐาน](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/inputs/pass-a/09-r05-royal-town-castle-approach-pass-a.png>)
Selected: [ผล](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/09-r05-royal-town-castle-approach-v2.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL game-map design preview, not implementation.
Input image 1: EDIT TARGET and authoritative APPROVED ART STYLE. Preserve crisp 8-bit pixel art, top-down orthogonal view, original biome palette/lighting, small-character scale, iconic scenery, charcoal margins, C/M/S/D markers and landscape1536x1024 map-board framing. User requests FURTHER expansion: increase the actual clear walking WIDTH of connecting paths/bridges/stairs by approximately25% relative to this input; expand the usable walking AREA of selected scenic plazas by approximately45%. Move edge vegetation/furniture/building placement as needed; do NOT achieve this by scaling the whole image, shrinking the player or changing camera zoom. Prioritize spacious traversable ground, preserve intimate OPTIONAL nooks. Keep all main story landmark order and optional chest/memory branches. No jump skills, no unlocked story shortcuts, no new plot events. Add ordinary building doors ONLY as specified. Small E labels beside ordinary thresholds mean ENTERABLE and are NOT violet timeline doors. No text paragraphs, no gore, no photorealism, no 3D isometric, no watermark. Maintain original style and restrained bright palette.
Specific requested change:
Selected +45% area: fountain walking plaza and castle forecourt. Make library door E1 and selected general shop E2 visibly enterable, keep their outer building identity. Other homes can stay scenery. Main gate story-locked; no new puzzle immediately before climax.
```

### 10 — ภายในปราสาท

Input (edit target / style locked): [ภาพฐาน](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v1/10-r05-royal-castle-interior-v1.png>)
Selected: [ผล](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/10-r05-royal-castle-interior-v2.png>)

```text
Use case: precise-object-edit.
Asset type: UNDERFALL game-map design preview, not implementation.
Input image 1: EDIT TARGET and authoritative APPROVED ART STYLE. Preserve crisp 8-bit pixel art, top-down orthogonal view, original biome palette/lighting, small-character scale, iconic scenery, charcoal margins, C/M/S/D markers and landscape1536x1024 map-board framing. User requests FURTHER expansion: increase the actual clear walking WIDTH of connecting paths/bridges/stairs by approximately25% relative to this input; expand the usable walking AREA of selected scenic plazas by approximately45%. Move edge vegetation/furniture/building placement as needed; do NOT achieve this by scaling the whole image, shrinking the player or changing camera zoom. Prioritize spacious traversable ground, preserve intimate OPTIONAL nooks. Keep all main story landmark order and optional chest/memory branches. No jump skills, no unlocked story shortcuts, no new plot events. Add ordinary building doors ONLY as specified. Small E labels beside ordinary thresholds mean ENTERABLE and are NOT violet timeline doors. No text paragraphs, no gore, no photorealism, no 3D isometric, no watermark. Maintain original style and restrained bright palette.
Specific requested change:
Selected +45% area: solemn main court and garden promenade. Existing archive and family rooms explicitly have normal open door thresholds. Do not expose secret scientist or unlock barrier. This input is the approved v1 palace, so widen its main connectors by 25% plus expand selected floor area 45%, while retaining everything else.
```

## ภายในอาคารใหม่

New generation; ไม่มี input-image paths

### 12 — ภายในบ้านแซน–ปาปิรัส ร้านกิวบี้ โรงแรม และร้านหิมะ

Selected: [ผล](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/12-r02-homes-grillby-inn-shop-v2.png>)

```text
Use case: stylized-concept. Asset type: UNDERFALL enterable building INTERIOR FLOORPLAN concept board, 1536x1024 landscape. Rich but crisp 8-bit pixel art matching colorful Undertale-inspired expanded map sets: orthogonal top-down with north-facing walls in elevation, NOT diagonal/isometric, NOT painted, NOT 3D. Charcoal outer background, warm lamps and bounded simple palettes. Clear playable floor, wide unobstructed corridors about3 character widths, small16-24px monsters for scale, props mainly on room edges. Every distinct interior has visible south entrance and reachable north/side normal doors or stairs, no walking through furniture, no teleport door inside counter. Rooms are physically walkable safe spaces rather than flat shop menus. Tiny short English panel labels only, no paragraphs, no game UI overlay. Objects are prop studies, no explicit story secrets or new item stats. No violet timeline portals, gore, watermark, exterior sunlight or huge humans. Brown bob-haired tiny heroine wearing navy sweater with rose-pink horizontal bands, dark shorts, gray leggings and brown boots if scale figure needed; no flower hairpin or witch hat. Monsters are varied friendly animal/ghost/fire silhouettes, not human townsfolk. Door letters are design annotations.
Composition: 2x2 large floorplan panels. Upper-left E1 GROUND FLOOR shared Sans and Papyrus home: cozy wood living room, sofa, TV, sparse humorous props, kitchen at edge, central clear social floor, ordinary south entrance, wide staircase on right S-UP. Upper-right E1 UPPER FLOOR same home: staircase S-DOWN connects from ground, broad landing, two separate bedrooms with clearly reachable doors; one tidy energetic bedroom with bright scarf/trophy/bunk-like bed, other quieter loosely kept bedroom/study with blue accents, closed optional rear study door (no new portal). Lower-left E2 GRILLBY'S: spacious warm timber tavern, walkable perimeter around several tables, orange flame-headed monster bartender behind a real bar counter along north wall; stools don't seal the walking route, two small friendly monsters seated, south door EXIT. Lower-right split into E3 INN LOBBY + adjacent connected BEDROOM and E4 SHOP: actual walkable lobby/reception desk, normal internal door to a simple guest bed, separate snowy-village shop with shelves on wall, cute animal monster seller, clear browsing floor and ordinary south entrance. Equal crisp pixel scale across panels, top title SNOWDIN - ENTERABLE INTERIORS. Houses and bar feel warm, communal and lived-in, not miniature decorative scenery.
```

### 13 — ภายในบ้านอันดาย ครัว ลานริมน้ำ และร้านน้ำตก

Selected: [ผล](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/13-r03-undyne-home-and-river-shop-v2.png>)

```text
Use case: stylized-concept. Asset type: UNDERFALL enterable building INTERIOR FLOORPLAN concept board, 1536x1024 landscape. Rich but crisp 8-bit pixel art matching colorful Undertale-inspired expanded map sets: orthogonal top-down with north-facing walls in elevation, NOT diagonal/isometric, NOT painted, NOT 3D. Charcoal outer background, warm lamps and bounded simple palettes. Clear playable floor, wide unobstructed corridors about3 character widths, small16-24px monsters for scale, props mainly on room edges. Every distinct interior has visible south entrance and reachable north/side normal doors or stairs, no walking through furniture, no teleport door inside counter. Rooms are physically walkable safe spaces rather than flat shop menus. Tiny short English panel labels only, no paragraphs, no game UI overlay. Objects are prop studies, no explicit story secrets or new item stats. No violet timeline portals, gore, watermark, exterior sunlight or huge humans. Brown bob-haired tiny heroine wearing navy sweater with rose-pink horizontal bands, dark shorts, gray leggings and brown boots if scale figure needed; no flower hairpin or witch hat. Monsters are varied friendly animal/ghost/fire silhouettes, not human townsfolk. Door letters are design annotations.
Composition:2x2 panels, top title WATERFALL - HOME AND SHOP. Upper-left E1 LIVING ROOM Undyne's house: blue-grey stone walls, fish-shaped/spear ornament silhouettes, wooden floor, simple sofa and two chairs for shared conversation, large unobstructed center, training gear displayed on wall not active combat; ordinary front south door EXIT, east normal doorway TO KITCHEN. Upper-right E1 KITCHEN: same house palette and scale, stove with ordinary small cooking pot, sink, crockery, prep table at wall, two chairs/tiny dining table along edge, huge comfortable walking space between, west doorway TO LIVING. Lower-left E1 RIVERSIDE YARD: secluded safe fenced terrace beside glowing cyan cavern water, leafy plants and bench, wide courtyard, actual stair/door connects back to living/kitchen, no surface sky and no burning-house catastrophe. Lower-right E2 RIVER SHOP: proper enclosed walkable stone/wood building with ordinary south door EXIT, fish-lantern merchant behind north counter, shelves and jars at edges, small roomy browsing floor, canal glimpse through window. Keep Undyne fish monster identity only as a tiny blue-fish resident silhouette; don't depict hostility or reveal future plot. No Alphys romance cutscene or new quest text.
```

### 14 — ภายในร้านชา คาเฟ่ ของเก่า พัสดุ ห้องสมุด และร้านอะไหล่

Selected: [ผล](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/maps/2026-10-08-v2/14-community-cafes-shops-library-v2.png>)

```text
Use case: stylized-concept. Asset type: UNDERFALL enterable building INTERIOR FLOORPLAN concept board, 1536x1024 landscape. Rich but crisp 8-bit pixel art matching colorful Undertale-inspired expanded map sets: orthogonal top-down with north-facing walls in elevation, NOT diagonal/isometric, NOT painted, NOT 3D. Charcoal outer background, warm lamps and bounded simple palettes. Clear playable floor, wide unobstructed corridors about3 character widths, small16-24px monsters for scale, props mainly on room edges. Every distinct interior has visible south entrance and reachable north/side normal doors or stairs, no walking through furniture, no teleport door inside counter. Rooms are physically walkable safe spaces rather than flat shop menus. Tiny short English panel labels only, no paragraphs, no game UI overlay. Objects are prop studies, no explicit story secrets or new item stats. No violet timeline portals, gore, watermark, exterior sunlight or huge humans. Brown bob-haired tiny heroine wearing navy sweater with rose-pink horizontal bands, dark shorts, gray leggings and brown boots if scale figure needed; no flower hairpin or witch hat. Monsters are varied friendly animal/ghost/fire silhouettes, not human townsfolk. Door letters are design annotations.
Composition: 2 rows x3 equal large panels with generous walkable floor, top title COMMUNITY - WALK-IN ROOMS. Panel1 R06 TEA HOUSE: green timber walls, tea pots/counter at north, two small tables at edge, warm amber lanterns, south EXIT, tiny cup-shaped monster seller. Panel2 R07 CAFE: plum stone/wood interior, warm coffee counter and window, comfortable edge tables, open center, south EXIT, gentle small ghost/customer. Panel3 R07 ANTIQUES: gray violet stone, edge cabinets/clock/odd objects, cute small shopkeeper behind counter, wide center, south EXIT, no secret portal. Panel4 R07 PARCEL OFFICE: shelving/crates against edges, clerk desk, sortingtable at edge, clean walkable central hall and south EXIT, small envelope-like monster. Panel5 R05 LIBRARY: ivory stone, plum rugs, bookshelves on north/side walls, readingtables along edges, spacious center and ordinary south entrance, NO royal sealed soul gate, empty memory-story books are placeholders. Panel6 R04 PARTS SHOP: cool blue laboratory-style closed room with north spare-part bench, shelves and tools, little friendly robot merchant behind counter, big clear walking floor and normal south entrance. Every panel is an independent ordinary indoor room, no shared magical doorway or jump platform. No detailed inventories, prices or quests printed.
```

