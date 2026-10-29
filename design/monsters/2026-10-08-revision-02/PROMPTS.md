---
id: 20261009-characters-r2-prompts
title: "UNDERFALL — พรอมต์ R2"
tags: [characters, design, legacy]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-design-current]
summary: "ประวัติ: UNDERFALL — พรอมต์ R2; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime"
status: historical-record
aliases: ["design/monsters/2026-10-08-revision-02/PROMPTS.md"]
design_baseline: UF-DESIGN-2026-10-09
---

# UNDERFALL — พรอมต์ R2

> **เอกสารประวัติ ไม่ใช่คำสั่งแบบล่าสุด:** เลือกไฟล์ตาม [design-current.md](../../../design-current.md) ก่อน ชุดที่ใช้ตอนนี้คือผู้เล่นR5/ร่างพิเศษR4/ตัวอื่นR2 แมพv2 portrait v1 และเสียงVoidเห็นตัวครั้งแรกหลังต้นไม้SX03 เนื้อหาด้านล่างเก็บตามช่วงที่สร้างเดิม ไม่ให้ใช้ข้อเก่าทับตัวตน/สเกล/กติกาล่าสุด ภาพบางไฟล์ในรุ่นนี้ยังถูกเลือกใช้เป็นแหล่งอ้างอิงตามดัชนีปัจจุบัน

วิธี: built-in image generation / transparent_background=false  
ใช้ข้อความร่วมต่อด้วยข้อความเฉพาะชีต และreferenced_image_pathsตามรายการ  
ไฟล์ภาพยังเป็นงานpreview ไม่ติดตั้งในเกม; ผู้เล่นและหยวนR2ภายหลังถูกแทนด้วยR3

## คำสั่งร่วม

```text
Use case: style-transfer / character redesign.
Task: revise UNDERFALL character previews under the user's NEW art direction. Output ONE clean character contact sheet for this request, not an in-game UI and not a photograph.
Read all input roles specified below. Old roster image is the EDIT TARGET, supplied screenshots are design/style REFERENCES only. Do not copy the references' paper texture, smooth painted lighting, video player controls, UI text, watermark or background scene.
NON-NEGOTIABLE: Every character must remain true chunky 8-BIT-inspired PIXEL ART, with obvious square pixel clusters, crisp stepped edges, strong simple silhouettes and limited palette. Rebuild excessive tiny noisy details into clean pixel clusters. Normal body roughly 32-48 logical pixels high, larger boss 64-80 high then enlarged in whole pixel blocks; one dark outline, 2-3 flat tones per material, NO smooth anime painting, 3D, CGI, gradients, realistic cloth rendering, bloom or antialiasing. Personality still visible in faces and poses.
COLOR UPDATE: Raise character color saturation / liveliness moderately by ABOUT 10-15% compared with the original roster, aiming around +12%. More cheerful blue, purple, green and warm gold, but no over-saturated neon or giant lighting washes. Keep readable values and unique palettes. This is a visual art-direction target, not a technical claim about an exact filter. Opaque plain charcoal background and thin neutral grid lines remain unchanged in spirit.
For characters NOT explicitly redesigned below preserve their identity, characteristic outfit, pose and silhouette; refresh only pixel clarity and modest color vividness. Exactly one full-body design per cell unless this request explicitly calls for the player's pose study. Never add unknown characters, omit or crop requested designs, turn a monster into a normal human, or mix labels between cells. No gore or gratuitous violence.
Only requested header and cell labels, readable off-white pixel type. No lore, stat panels, dialogue, UI controls, external logos or explanatory paragraphs. These are review images, not final sprite atlases.
```

## ชีต 01 — ตัวหลัก — คินเป็นมอนสเตอร์

Inputs (เรียงตามภาพที่1,2,...):
1. C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08/01-main-cast-v1.png

```text
Input image1 is the old main-cast sheet EDIT TARGET. Keep 4 columns x 2 rows.
Header exactly "UNDERFALL — MAIN CAST / R2".
Reading-order labels: "TORIEL", "SANS", "PAPYRUS", "UNDYNE", "MARIA", "ALPHYS", "คิน — MONSTER", "METTATON".
Keep Toriel as the motherly goat woman, Sans as short jacket skeleton, Papyrus as tall scarf skeleton, Undyne as athletic fish-monster guard, Maria as gray wolf guard, Alphys as little yellow reptile scientist, Mettaton as rectangular robot. Preserve their distinguishing designs, apply the color update and clearer coarse pixel style.
REPLACE bottom-row third cell KIN COMPLETELY. He is now unmistakably a NON-HUMAN male owl-monster laboratory assistant: round cream/slate-feathered owl head, small visible beak, feather tufts, expressive warm gold eyes with small scholarly glasses, feathered claw hands rather than human fingers, short broad tail feathers, friendly confident stance. Cream lab jacket over lively sage shirt, brown work trousers and a tiny tool pouch keep his assistant identity. Do NOT draw a human face with animal ears, a human cosplay bird mask, or the previous brown-haired boy. His exact species is an art proposal; do not add lore.
```

## ชีต 02 — แอสกอ แอสเรียล และฟิวที่เป็นมอนสเตอร์

Inputs (เรียงตามภาพที่1,2,...):
1. C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08/02-royal-story-cast-v1.png
2. C:/Users/wisu/Pictures/Screenshots/สกรีนช็อต 2026-10-08 041156.png
3. C:/Users/wisu/Pictures/Screenshots/สกรีนช็อต 2026-10-08 041101.png

```text
Input1 is old roster EDIT TARGET. Input2 is ASGORE design REFERENCE (horned black-and-white king with red trident), Input3 is ASRIEL empowered design REFERENCE; child form should retain the recognizable young goat identity. Keep 3 columns x 2 rows.
Header exactly "UNDERFALL — STORY CAST / R2".
Labels reading order: "ASGORE", "FLOWEY", "ASRIEL", "ฟิว — MONSTER", "ริน", "METTATON NEO".
Redesign ASGORE closer to input2: broad horned GOAT king with imposing swept-up white horns, dark hair/mane and dark face shadow bordered by white muzzle/beard, angular charcoal armor and black cape with limited purple accents. Strong grand silhouette, holding a long RED three-pronged trident across/beside the body. Still goat monster with sorrow underneath, not a human knight, not the old squat gold-armored king. Convert painted highlights into flat pixel blocks; all feet, horns and staff visible within cell.
FLOWEY normal flower, ASRIEL child, RIN human past-life girl and METTATON NEO keep their identities but get +10-15% livelier colors and coarser true pixel clarity. Child Asriel has simple cream goat face, long ears, green striped sweater and small shorts, not a miniature armored adult.
REPLACE FIW completely with a NON-HUMAN small male raccoon-like monster traveler: unmistakable gray-furred raccoon muzzle and dark natural eye-mask markings, rounded animal ears emerging around a worn low brown cap, visible bushy ring-striped tail, paw hands, patched ash-brown coat over burgundy shirt and worn trousers, anxious guarded half-smile. Not a human face in a furry hat or animal-eared human boy. Do not show a villain aura or change his story identity.
```

## ชีต 03 — หยวน อีกเส้นเวลา แอสเรียล และฟลาววี่ใหม่

Inputs (เรียงตามภาพที่1,2,...):
1. C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08/03-void-and-boss-forms-v2.png
2. C:/Users/wisu/Pictures/Screenshots/สกรีนช็อต 2026-10-08 041512.png
3. C:/Users/wisu/Pictures/Screenshots/สกรีนช็อต 2026-10-08 041350.png
4. C:/Users/wisu/Pictures/Screenshots/สกรีนช็อต 2026-10-08 041101.png
5. C:/Users/wisu/Pictures/Screenshots/สกรีนช็อต 2026-10-08 041743.png

```text
Input1 is old special-forms roster EDIT TARGET. Input2 is the colored seven-hand Gaster-like design REFERENCE for YUAN. Input3 is the broken monochrome Gaster pixel silhouette REFERENCE for ALTERNATE SHIKU. Input4 is purple-bib goat ASRIEL REFERENCE. Input5 is television/hoses/leaf-claws grotesque FLOWEY incomplete-power form REFERENCE. Reference images are NOT edit targets.
Keep 3 columns x 2 rows, header "UNDERFALL — SPECIAL FORMS / R2".
Labels in order: "ชิกุ — FOX", "หยวน", "ชิกุอีกเส้นเวลา", "VOID ECHO — DRAFT", "ASRIEL — HYPERDEATH", "FLOWEY — INCOMPLETE".
Top-left real Shiku fox remains quadrupedal, exactly NINE distinct tails and SEVEN floating palms; only modestly livelier purple markings and pixel cleanup. Do not change his fox into a second humanoid.
Top-middle YUAN redesign after input2: tall slim, long open black coat, pale tunic/trousers, clean white skull-like MASK/uncanny pale face with asymmetrical dark eye marks, calm gentle extended arms, colored segmented sleeve/lining panels instead of old silver-haired handsome anime boy. Exactly SEVEN DISCONNECTED magical palms with central circular holes in a spacious arc BEHIND the upper body, distinct red, orange, gold, green, cyan, blue and violet/pink pixel accent blocks. His TWO normal attached hands are additional, not counted among the seven. Preserve a humanoid/human-shaped underlying body; mask appearance does not assert a new species. Restrained stepped color clusters, no smooth rainbow glow.
Top-right ALTERNATE SHIKU redesign after input3: pale skewed Gaster-like head tilted diagonally, one dark eye socket, black hanging cloak/slender incomplete body, little asymmetrical disconnected pale hands, jagged scattered black/gray/violet pixels around the outline, eerie unstable posture and empty dark palm holes. No normal human scientist face, messy-haired lab student, book or white lab coat. Recognizable reference silhouette, but true 8-bit design. Do not merge him with bottom-left Void Echo.
Bottom-left VOID ECHO stays an unidentified dark pixel-fragment silhouette, no new face or story.
Bottom-middle ASRIEL HYPERDEATH redesign after input4: cream-white GOAT head with long floppy ears, black nose, pointed cheek fur and small dark cheek markings, alert determined eyes. Purple bib/tabard over black robe, clear white simple wing/delta emblem, one palm out with a small cluster of GREEN star-shaped pixel magic, other hand visible; fuller powerful goat proportions, no human face. Keep all magic within cell and flat pixel style.
Bottom-right FLOWEY INCOMPLETE redesign after input5: a WIDE scary but NON-GORY plant-machine monster inspired by Undertale's incomplete soul-absorption/Omega design. A square old TV monitor high in the central body displays a mischievous pale cartoon grinning face, tangled dark ribbed hoses form a halo behind it, huge green leaf/claw arms stretch sideways with small red thorn accents, irregular central mouth with stylized jagged teeth below screen, gray-green vines and root feet. NO blood, wounds, corpses or realistic fleshy texture. The old small gold flower-with-root-legs mutation must be completely replaced. Entire complex silhouette visible and independent of other cells, readable 8-bit clusters rather than copied painting.
```

## ชีต 04 — มอนรูน — ทรงใกล้ Undertale สีสดขึ้น

Inputs (เรียงตามภาพที่1,2,...):
1. C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08/04-ruins-monsters-v1.png

```text
Input1 is the old Ruins roster EDIT TARGET. Keep 3 columns x 3 rows and the same nine identities.
Header "UNDERFALL — RUINS MONSTERS / R2".
Labels: "FROGGIT", "WHIMSUN", "MOLDSMAL", "LOOX", "VEGETOID", "MIGOSP", "NAPSTABLOOK", "DUMMY", "ก้อนหิน".
Make silhouettes MORE faithful to Undertale's recognizable designs while cleanly improving color/detail within coarse 8-bit sprites. Froggit squat alert frog, Whimsun tiny anxious moth with wings, Moldsmal uncomplicated translucent-looking amber slime built from opaque pixels with subtle dots and very minimal face, Loox stocky ONE-eyed monster, Vegetoid stern turnip with leafy head, Migosp small long-legged insect with antennae, Dummy stitched training cloth mannequin on wooden base, talking rock remains rock with no legs.
Especially NAPSTABLOOK: use the classic simple off-white low-floating elongated ghost silhouette, blocky dark eyes and little quiet melancholy face, lavender-gray shadows and small tears; do NOT redesign as a human ghost girl, plush mascot with giant sparkling anime eyes or hat in the idle form. Raise saturation in existing colored accents 10-15%, not neon. No background/roster changes or added tenth character.
```

## ชีต 05 — มอนชุมชน — เพิ่มความสดของสี

Inputs (เรียงตามภาพที่1,2,...):
1. C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08/05-community-monsters-v1.png

```text
Input1 is old community sheet EDIT TARGET. Keep 3 columns x 3 rows and all nine designs in same cells. Header "UNDERFALL — COMMUNITY / R2".
Labels reading order: "จิบ", "ปลาโคมไฟ", "ก้อนหิมะ", "มอนหมอน", "ซอง", "ร้านแมงมุม", "นักเก็บเสียง", "หุ่นผู้ช่วย", "คนจุดโคม".
Preserve the teacup/herbs creature, fish lantern courier, snowball with THREE scarves, sleepy pillow monster, envelope-headed mail creature, exactly THREE pastry-shop spiders as one group design, shy sound-collector furry creature, little helper robot, lantern-keeper moth monster. All visibly MONSTERS, no human replacement.
Only adjust color liveliness +10-15%, clearer pixel clusters, recognizable simple Undertale-like faces. More fresh green herbs, blue-gray fish, pink-purple scarves, warm ochre lantern light but NO bloom. Keep silhouettes, character props, poses, labels and borders consistent; no new scenes or unrelated items.
```

## ชีต 06 — ตัวประกอบและมอนทดลอง — เพิ่มความสดของสี

Inputs (เรียงตามภาพที่1,2,...):
1. C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08/06-small-cast-and-experiment-v1.png

```text
Input1 is old small-cast sheet EDIT TARGET. Keep 3 columns x 2 rows, FIVE creature designs and bottom-right palette strip only. Header "UNDERFALL — SMALL CAST / R2".
Labels: "คนดูแลสวน", "กบจิ๋ว", "หนู", "กวางวิญญาณ", "มอนทดลอง".
Keep terracotta plant-pot gardener with watering can, tiny frog SMALLER than Froggit, small mouse, spectral quadrupedal deer with antlers, living two-face semi-liquid monster experiment. Body identities and harmless personalities stay the same. Semi-liquid experiment should resemble Undertale's ghostlike amalgamate style, melancholy but non-gory; no wounds, skeleton pile or new victims.
Raise existing character palette vividness about 12% and simplify high-detail noise to proper pixel blocks. Change the six swatches accordingly without adding text, sixth character, scene or a human.
```

## ชีต 07 — ผู้เล่นใหม่ — Frisk-inspired และท่าพื้นฐาน

Inputs (เรียงตามภาพที่1,2,...):
1. C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/assets/sprites/night-witch/night-witch-front-idle-24x32.png
2. C:/Users/wisu/Pictures/Screenshots/สกรีนช็อต 2026-10-08 040316.png
3. C:/Users/wisu/Pictures/Screenshots/สกรีนช็อต 2026-10-08 040122.png

```text
Input1 is EDIT TARGET: the previous tiny silver-haired witch player sprite. The user explicitly wants a COMPLETE REPLACEMENT OF THIS CHARACTER DESIGN, so old witch hat, silver hair, burgundy dress and boots are NOT invariants and must be removed. Input2 and input3 are REFERENCES for Frisk-like sprite style, blue/purple striped clothing, adorable face and more humanoid proportions. Never copy their forest or UI.
Create a NEW standalone PLAYER CHARACTER STUDY sheet, 3 columns x 2 rows, opaque charcoal board and no stats UI. Header "UNDERFALL — PLAYER REDESIGN".
The SAME ONE female/gently feminine child adventurer in every cell, cute but with more natural recognizable HUMAN proportions than the original tiny Frisk: about 3.5 to 4 heads tall, body NOT mostly head, shoulders/torso/arms/hands/legs readable, fully clothed in cozy non-sexual casual travel clothing.
Short chestnut-brown bob with straight fringe, warm amber/golden human skin similar to Frisk, expressive small dark pixel eyes and tiny gentle mouth. Clear lively medium BLUE long-sleeve sweater with TWO violet-purple horizontal stripes, blue-purple shorts over dark purple leggings or simple trousers, dark brown shoes. Optional ONE tiny simple gold flower hair-CLIP matching reference accent, NOT a living Flowey and not a big crown. NO witch hat, white/silver hair, red dress, extra hero, huge anime eyes or adult realistic painting.
Keep true 8-bit look: roughly 32-48-pixel-tall logical sprite with hard enlarged square pixels, a compact controlled palette, 2-3 tones per material, no tiny noisy highlights. Compared with prior palette, slightly fresher colors +10-15%, not full neon.
Six cells of the same consistent design, exact labels in reading order: "FRONT", "SIDE", "BACK", "IDLE", "WALK 01", "WALK 02". Front/side/back neutral full-body views, idle slight head/hand motion, walk01/walk02 opposite foot steps. Same hair, outfit, height and body proportions in all cells. Do not show weapons, injury, soul heart, magical hands, name Frisk as the in-game identity, other characters or dialogue. This is a pose preview, not a completed animated asset.
```

## ชีต 08 — มอนรอง Undertale เพิ่ม — รวมมัฟเฟต

Inputs (เรียงตามภาพที่1,2,...):
1. C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08/04-ruins-monsters-v1.png

```text
Input1 is a STYLE REFERENCE / existing monster roster to expand from, not a request to repeat its nine creatures. The user explicitly asks to include Muffet and more supporting monsters with Undertale-like models improved in the same 8-bit world.
Output a NEW additional 3 columns x 3 rows roster sheet, same charcoal grid and slightly fresher color treatment around +12%. Header "UNDERFALL — SUPPORTING MONSTERS".
EXACTLY these nine full-body designs, labelled in reading order:
1 "MUFFET": recognizably Undertale spider girl, purplish skin, FIVE small eyes (one middle above two paired rows), dark twin-pigtail hair with red/violet bows, SIX distinct arms (three per side) in a poised tea-serving stance, modest purple dress and little shoes, tiny teacup optional, sweet crafty expression. Not normal human girl with spider costume, not a giant hairy spider. Keep eyes and arms countable and improve pixel silhouette.
2 "TEMMIE": tiny cream-faced cat/doglike monster, messy dark fluffy hair with two floppy ears, blue/purple shirt, small paw feet, adorably silly expression.
3 "MONSTER KID": little yellow/orange reptile kid with two head spikes, small tail, striped brown/ochre shirt, NO arms, eager determined smile; not human.
4 "SNOWDRAKE": goofy birdlike snowy monster, cream body, angular icy pale-blue feather/wing spikes and scruffy smiling face, short dark legs.
5 "ICE CAP": skinny pale-gray icy/snow creature with a conspicuously tall geometric light-blue ice cap, smug tiny face and simple dark legs.
6 "DOGGO": recognizable upright cream/gray dog guard with dark glasses/eye area, green/dark tunic and two short daggers held downward. Not a human dog-eared man.
7 "DOGAMY": stocky gray dog guard in dark armor, with one simple axe and earthy-green shoulder trim, rough caring face.
8 "DOGARESSA": matching female dog guard with paler face/ears, dark armor, one simple axe, clearly dog head, distinct pose and violet-gray trim. Keep separate cell from Dogamy.
9 "MAD DUMMY": angry stitched cloth training dummy with cream/red-brown seams, worn wooden base and energetic floating small cloth scraps; no bleeding or person trapped inside.
All are recognizable Undertale-inspired revised sprite designs, not exact monochrome copies and not detailed non-pixel fanart. Preserve the simple silhouettes, raise saturation modestly, keep 8-bit constraints. These are visual library concepts only, do NOT invent quest/region/narrative labels.
```

## คำสั่งตรวจแก้เพิ่มเติม

### 07 → 07-player-frisk-redesign-r2b.png

```text
Use case: precise-object-edit.
Edit this player character study sheet ONLY to improve body proportions across ALL six poses. Keep the same one cute Frisk-inspired girl, brown bob hair, small gold flower clip, golden skin, blue sweater with two purple stripes, purple lower clothing, brown shoes, charcoal 3x2 sheet and every exact text label.
IMPORTANT PROPORTION CORRECTION: the current head including hair is still about 40-45% of total body height. Redraw the same character to roughly 3.3-3.6 HEADS TALL, with head including hair only about 28-30% of total standing height and body/torso/legs the remaining 70-72%. Shrink the head about 25%, modestly elongate both clothed torso and legs, preserving overall frame height and the cute young HUMAN child/adventurer identity. Do not simply scale the entire sprite down. Keep natural small shoulders, arm joints and feet visible, not adult curves or sexualization, not realistic adult face, not tiny stick limbs.
Maintain unmistakable hard chunky 8-bit pixel clusters and limited flat color ramps. No smoothing, gradients or painted details. Keep color palette and modest vividness unchanged.
Same proportions and SAME exact appearance in front, side, back, idle, walk01 and walk02. Make WALK 01 and WALK 02 clearly alternating opposite foot and arm steps while both face right, not the exact same stepping pose copied twice. Back stays back, side stays side. No extra sprites, logos or new props. No witch hat or silver hair. Preserve all labels and six-cell layout.
```

### 02 → 02-royal-story-cast-r2b.png

```text
Use case: precise-object-edit.
Input is the six-cell story cast sheet. Correct ONLY TOP-LEFT ASGORE character fit inside its grid cell. His white horns currently rise into header space and his red trident extends over the vertical border into Flowey's cell.
Preserve his exact new dark horned goat-king design, black/white/purple outfit, sorrowful face, white horns/beard and red trident. Make the ENTIRE Asgore plus weapon assembly about 12% smaller and reposition it centered in its own top-left cell, with complete horns above head, both feet, trident spearhead and butt end fully visible and at least a small clear charcoal margin from every cell boundary and label. Do not shrink his head independently or turn him back into gold-armored old king.
Absolutely preserve Flowey, child Asriel, nonhuman raccoon Fiw, Rin and Mettaton NEO and all their labels, colors and positions. Preserve title and grid. Do not crop, add subjects, paint smoothing, glow effects, neon, new text or modify the rest of the sheet. All shapes remain crisp 8-bit pixel art.
```
