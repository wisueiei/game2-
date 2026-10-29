---
id: 20261009-characters-r1-prompts
title: "UNDERFALL — พรอมต์ชุดออกแบบมอนสเตอร์ 2026-10-08"
tags: [characters, design, legacy]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-design-current]
summary: "ประวัติ: UNDERFALL — พรอมต์ชุดออกแบบมอนสเตอร์ 2026-10-08; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime"
status: historical-record
aliases: ["design/monsters/2026-10-08/PROMPTS.md"]
design_baseline: UF-DESIGN-2026-10-09
---

# UNDERFALL — พรอมต์ชุดออกแบบมอนสเตอร์ 2026-10-08

> **เอกสารประวัติ ไม่ใช่คำสั่งแบบล่าสุด:** เลือกไฟล์ตาม [design-current.md](../../../design-current.md) ก่อน ชุดที่ใช้ตอนนี้คือผู้เล่นR5/ร่างพิเศษR4/ตัวอื่นR2 แมพv2 portrait v1 และเสียงVoidเห็นตัวครั้งแรกหลังต้นไม้SX03 เนื้อหาด้านล่างเก็บตามช่วงที่สร้างเดิม ไม่ให้ใช้ข้อเก่าทับตัวตน/สเกล/กติกาล่าสุด ภาพบางไฟล์ในรุ่นนี้ยังถูกเลือกใช้เป็นแหล่งอ้างอิงตามดัชนีปัจจุบัน

วิธีสร้าง: built-in image generation; ทุกชีตใช้ opaque background / transparent_background=false  
แต่ละชีตใช้คำสั่งร่วมด้านล่างต่อด้วยคำสั่งเฉพาะชีต ไม่ขอหลายภาพด้วยn  
ชีต03สุดท้ายเป็นภาพที่แก้จำนวนมือด้วยพรอมต์ท้ายไฟล์และภาพ03ฉบับแรกเป็นedit target

## คำสั่งร่วมทุกชีต

```text
Use case: stylized-concept.
Asset type: character design contact sheet for UNDERFALL, a 2D pixel RPG, preview art only.
Generate ONE character roster sheet, with the EXACT cells specified below, in reading order. Each cell has exactly one complete design and its readable label beneath it. Do not replace requested characters, omit any, duplicate any, crop feet/tails/weapons, or add extra characters.
Art direction for every sprite: chunky authentic 8-bit-inspired pixel art; visible square pixels, crisp nearest-neighbor edges, simple expressive faces, strong recognizable silhouette. Each normal character should look as if made on a roughly 24-to-48-pixel-tall grid, boss designs may use roughly 64 pixels tall, then enlarged as whole pixel blocks. Limited color ramps, 8-12 colors per character and just 2-3 shading tones per material. This is NOT smooth HD illustration with a pixel filter, NOT anime painting, NOT 3D voxel or Minecraft models.
All sprites are colored, not monochrome, but hues are deliberately restrained and softly desaturated: parchment cream, dusty sage, slate blue, faded burgundy, muted plum, warm gray, aged ochre, charcoal. Keep each character's recognizable characteristic colors in subdued versions. No neon cyan, bright rainbow effects, pure saturated scarlet, metallic bloom, airbrushed light, glossy highlights or gradients. Dark pixel outlines plus a contrasting lighter rim only where necessary.
Plain solid charcoal-gray background (#171A20), subtle thin grid separators, no scenery or battle UI. Comfortable margins. Pixel-scale modest header in off-white, smaller clear off-white labels centered below each sprite. Labels must be verbatim. One neutral/front or slight three-quarter full-body idle pose per cell, all fitting the same game-world style. Warm approachable or shy expressions where appropriate, not all angry warriors.
Concept sheet, not a production sprite atlas: opaque background, no checkerboard, no transparent-background look, no animation frames or turnarounds. No unrelated logos, watermark, gore, explanations, text paragraphs or extra props besides character-specific attributes below. The only permitted text is the header, cell labels and optional small DRAFT tag on explicitly provisional cells.
```

## ชีต 01 — ตัวหลัก — กลุ่มผู้ดูแลและเพื่อน

ไฟล์สุดท้าย: 01-main-cast-v1.png

```text
Header verbatim: "UNDERFALL — MAIN CAST 01". Landscape sheet, 4 columns x 2 rows, eight cells.
1 label "TORIEL": tall kind cream-white goat woman, long ears, small horns, modest deep dusty-purple robe with small understated cream emblem, hands held gently together. Maternal posture.
2 label "SANS": short broad cartoon skeleton, white bone face, relaxed grin, dusty slate-blue hooded jacket, charcoal shorts, muted beige slippers, hands in jacket pockets, laid-back slouch.
3 label "PAPYRUS": tall thin cartoon skeleton, proud heroic upright pose, cream chest armor, faded brick-red scarf, red-brown boots/gloves, dark fitted trousers. Scarf readable but does not trail into another cell.
4 label "UNDYNE": athletic fish-monster woman, muted teal skin, long dark muted-red ponytail, one dark eyepatch, worn charcoal guard armor, small desaturated-steel spear held down at her side. Fierce but not evil.
5 label "MARIA — DRAFT": proposed original female Royal Guard character, lean charcoal-gray wolf-like monster, pointed ears and short tail, worn dull olive/steel armor, faded rust-red neck scarf, guarded skeptical expression, not another Undyne. Species/design is provisional.
6 label "ALPHYS": short shy dinosaur/lizard scientist, dusty ochre-yellow skin, round glasses, simple off-white lab coat, olive clothing underneath, small hands nervously together, cute gentle face.
7 label "KIN — DRAFT": original young adult male human laboratory assistant, warm medium skin, messy chestnut hair, cream lab jacket over muted sage shirt, brown trousers, one small tool pouch, confident friendly grin. Not a monster dinosaur or clone of Alphys.
8 label "METTATON": retro rectangular robot performer, silver-gray box body with muted cream and dusty-pink indicator squares, segmented metal arms, small wheels at its base; show original box-robot assistant form, NOT humanoid NEO.
```

## ชีต 02 — ราชวงศ์และตัวละครแกนเรื่อง

ไฟล์สุดท้าย: 02-royal-story-cast-v1.png

```text
Header verbatim: "UNDERFALL — MAIN CAST 02". Landscape sheet, 3 columns x 2 rows, six cells.
1 label "ASGORE": large broad cream-furred horned goat king, long pale-gold beard, tarnished dull-gold armor, dusty purple cape, small worn crown, complete trident held beside him. Sorrowful compassionate expression, not snarling.
2 label "FLOWEY": small six-petal dusty golden-yellow flower with cream face, narrow sly smile, two sage-green leaves and short curved stem. Cheerful-looking but subtly watchful, not a red evil plant.
3 label "ASRIEL": small cream-white goat child, floppy ears, gentle vulnerable eyes, muted sage-green sweater with a parchment stripe, brown shorts and boots; tiny nervous smile.
4 label "ฟิว — DRAFT": proposed young male humanoid/human with dark slightly messy hair, a worn low-brimmed charcoal-brown cap shading his eyes, ash-brown travel jacket over muted burgundy shirt, mismatched patched trousers, anxious reserved half-smile. This is his ordinary secretive traveler disguise, no visible hatred aura or demon horns.
5 label "ริน — DRAFT": proposed past-life human girl, short chestnut bob, quiet sad eyes, olive dress/tunic with parchment collar, faded burgundy scarf and small brown boots. Distinct from the current silver-haired witch heroine. No knife, gore or poisonous flower in her hands.
6 label "METTATON NEO": upgraded tall slim HUMANOID robot idol, pale metal humanlike face, side-swept black hair hiding one eye, asymmetrical steel limbs, elegant charcoal/pale-silver performance armor with muted dusty-magenta accent plates, angular small wing panels, confident stage pose. NOT the box robot, not the goat king, not an enormous rainbow mech.
```

## ชีต 03 — ชิกุ ตัวตน Void และร่างพิเศษ — มีแบบเสนอ

ไฟล์สุดท้าย: 03-void-and-boss-forms-v2.png

```text
Header verbatim: "UNDERFALL — VOID / SPECIAL FORMS". Landscape sheet, 3 columns x 2 rows. Six complete separate designs. More negative space than other sheets, no overlapping neighboring cells.
1 label "ชิกุ": quadrupedal elegant cream/silver FOX with exactly NINE separate bushy tails arranged as a readable fan. Warm amber eyes, muted plum markings only on tail tips. Behind and above the fan float exactly SEVEN disconnected pale palms, each with a dark circular hole in its center, laid out as a spacious symmetrical arc of 3 palms on the left, one at top center, 3 on the right. Tails must be countable and must NOT become additional hands. No human body in this cell.
2 label "หยวน — DRAFT": current HUMAN form of the same character, handsome gentle young adult human man, shoulder-length ash-silver hair tied loosely, human face and ears, simple charcoal long coat over parchment tunic, dusty purple sash, brown boots. Exactly SEVEN small floating pale palms with dark central holes in an arc behind him. Warm reassuring expression. NO skeletal Gaster face, fox muzzle or literal fox tails on this HUMAN sprite. Human appearance is a proposal.
3 label "VOID SCIENTIST — DRAFT": distinct alternate-timeline scientist concept, tall narrow pale humanoid figure, severe dark hair and tired shadowed eyes, worn ash-white laboratory coat over almost-black tunic, bent posture while holding one tiny old notebook. One hand gestures as if examining an experiment. NOT Yuan and not a fully specified canon identity; avoid seven hands or nine tails that would merge him with Shiku.
4 label "VOID ECHO — DRAFT": placeholder visual for the NOT-YET-IDENTIFIED deletion-born entity: mostly charcoal fragmented vaguely humanoid silhouette outlined with sparse dull-violet pixel fragments, blank shadow face, no detailed identity and no mask symbols implying it is the scientist. Abstract and mysterious, compact coherent sprite, not gore.
5 label "ASRIEL — HYPERDEATH": empowered adult goat-monster boss form, cream-white goat face, small horns, broad long black-charcoal ceremonial robe with muted lavender geometric trim and a pale symbol on chest; grand but not giant relative to cell. Few pale star-like pixels behind him, no multicolored laser fan, no neon effects.
6 label "FLOWEY MUTATION — DRAFT": PROVISIONAL incomplete-soul mutation for this project's mixed route, NOT a copied mechanical television Omega Flowey. Twisted but readable squat flower creature, asymmetric dusty-gold petals around an off-center cream face, tangled gray-sage roots forming small arms and legs, one uneven extra bud, muted plum cracks, uneasy fragmented expression. Mild fantastical unsettling appearance without gore.
```

## ชีต 04 — มอนรูนและตัวที่พบระหว่างทาง

ไฟล์สุดท้าย: 04-ruins-monsters-v1.png

```text
Header verbatim: "UNDERFALL — RUINS MONSTERS". Square or slightly landscape sheet, 3 columns x 3 rows, nine cells.
1 label "FROGGIT": cute squat frog monster, muted sage-gray skin, round raised eyes, bent hind legs, shy alert expression. Add just two tones of color unlike the prior monochrome battle mockup.
2 label "WHIMSUN": tiny anxious mothlike creature, fragile dusty cream/lavender wings, little hands held near chest, trembling shy eyes.
3 label "MOLDSMAL": soft amber-gray slime blob with irregular rounded pixel silhouette, very simple faint face, gently wobbly pose, two opaque shading tones; not a glossy transparent 3D slime.
4 label "LOOX": stocky dusty ochre round one-eyed monster, one large central ivory eye, tiny horns and little hands, guarded cross look; no extra eyes.
5 label "VEGETOID": small turnip monster, parchment-colored root body and dusty green leafy hair, short arms, serious concerned face, no gore.
6 label "MIGOSP": small skinny insect monster, dusty slate-green body, short antennae, thin legs, folded arms, grumpy face with slightly dancing feet.
7 label "NAPSTABLOOK": small soft off-white ghost with gray-lavender shadow pixels, shy downcast black eyes, floating low, one tiny teardrop. No hat in the base idle design.
8 label "DUMMY": simple shy training dummy made of patched gray-beige cloth with a short brown base, tiny stitched face, muted worn-red stitch accents, no armor.
9 label "ก้อนหิน": compact gray rounded rock with subtle face lines, slightly raised eyebrow, simple hard pixel shading, stubborn expression. NO legs, do not turn into a stone golem.
```

## ชีต 05 — มอนรองชุมชนและคนให้เควส — รูปลักษณ์เพิ่มเติมเป็นแบบเสนอ

ไฟล์สุดท้าย: 05-community-monsters-v1.png

```text
Header verbatim: "UNDERFALL — COMMUNITY MONSTERS". Square or slightly landscape sheet, 3 columns x 3 rows, nine cells.
1 label "จิบ": tiny polite creature with a PARCHMENT CERAMIC TEACUP HEAD filled with tea and sprouting a few dusty-green herbs, thin little arms holding a saucer, olive apron, careful tilted stance. Not a normal human holding a cup.
2 label "ปลาโคมไฟ": cute muted slate-blue fish courier with tiny arm-fins/feet, a small warm OCHRE lantern-like lure and a little brown delivery satchel. Fish face and silhouette unmistakable, no neon glowing orb.
3 label "ก้อนหิมะ": little off-white snowball creature bundled in THREE visibly separate muted scarves, dusty rose, sage and slate, chilly grumpy face and stubby feet.
4 label "มอนหมอน": soft gray-beige rectangular PILLOW monster with droopy half-closed eyes, floppy cloth corners for arms, little stitched muted-lavender sleep cap, slumped sleepy posture. Do not turn into a human in pajamas.
5 label "ซอง": a small creature whose HEAD IS A CREAM POSTAL ENVELOPE with flap and faded stamp, thin charcoal body, tiny arms, brown mail pouch, earnest confused expression.
6 label "ร้านแมงมุม": ONE GROUP DESIGN of three miniature gray-brown spiders working around a small muted wicker pastry tray with one tiny ribbon. Exactly three spiders, collectively a single shop-cell design. Cute and industrious, no giant horror spider.
7 label "นักเก็บเสียง — DRAFT": proposed shy little rounded cave/river monster with gray-lavender fur and droopy ears, small old recorder held close, slate vest, listening posture. Original design for approved sound-collector role, not an additional named main character.
8 label "หุ่นผู้ช่วย — DRAFT": proposed tiny laboratory helper robot, rounded square dull steel body, soft ochre screen eyes, small wheels, one simple tool arm, brown apron tucked on its chassis; wants a shop, friendly. Distinct from boxy Mettaton.
9 label "คนจุดโคม — DRAFT": proposed lantern-keeper monster, cream moth-like face under a dusty brown hood, simple slate robe, holding one small warm ochre lantern with NO bloom. Gentle patient posture.
```

## ชีต 06 — ตัวประกอบ สัตว์บรรยากาศ และมอนทดลอง — รูปลักษณ์เสนอ

ไฟล์สุดท้าย: 06-small-cast-and-experiment-v1.png

```text
Header verbatim: "UNDERFALL — SMALL CAST / EXPERIMENT". Landscape sheet, 3 columns x 2 rows. EXACTLY FIVE creature designs: bottom-right cell is a small unlabeled palette strip ONLY, NOT a sixth character.
1 label "คนดูแลสวน — DRAFT": proposed little gentle gardener monster with a terracotta pot-shaped body, dusty sage leaf hair, gray gardening apron, holding one tiny worn watering can; caring serious expression. Different silhouette from teacup-head Jib, this is the garden-helper role.
2 label "กบจิ๋ว": extremely small dusty sage-gray frog, two bright tiny cream eyes, shy upright pose, no equipment. Much smaller than Froggit. Keep it readable and not a second full-sized Froggit.
3 label "หนู": small gray-brown mouse with cream belly, round ears, curled tail, tiny worried whisker face, crouched posture. No clothes or weapons.
4 label "กวางวิญญาณ": delicate pale sage/slate spectral deer, full quadruped body, small branching antlers, sparse pale-gray pixel edge highlights. Gentle quiet gaze, NOT a giant elk, no neon-green glow or star-filled backdrop.
5 label "มอนทดลอง — DRAFT": provisional non-gory LIVING semi-liquid monster affected by an experimental Determination treatment, soft off-white/gray-lavender pooled body, two uneasy friendly faces loosely joined, small drooping limb shapes, sad vulnerable gaze. It is alive and deserves care, not zombie gore, blood or a pile of corpses. Do not declare its exact identity or number of victims in text.
Bottom-right cell: six tiny muted color squares arranged in a line to indicate the shared palette, no words and no extra character.
```

## การแก้ชีต03เป็นv2

```text
Use case: precise-object-edit.
Input image: edit target, a 3-column by 2-row UNDERFALL character roster sheet. Preserve this entire sheet pixel-for-pixel as much as possible.
ONLY edit the TOP-MIDDLE cell, labelled "หยวน — DRAFT", to correct the number of floating magical hands.
The human has TWO normal anatomical hands attached to his arms; these MUST NOT count as magical floating hands. There are currently FIVE disconnected pale magic palms in an arc above him. Keep those five and ADD exactly TWO more disconnected pale magic palms with round dark holes in their centers: one just behind his left shoulder near the lower-left edge of his arc, one symmetrically behind his right shoulder near the lower-right edge of his arc. Result must be SEVEN floating palms IN ADDITION TO the two attached human hands. There should therefore be NINE hand silhouettes total in this cell: 7 floating magical and 2 attached anatomical. All seven floating palms must be visible, separated from his body, matching the existing pale colors, purple tiny trailing pixels, square-pixel size and shading. No glowing neon.
Keep the same friendly human face, hair, coat, legs, pose, scale, cell boundaries and label. Do not add extra tails or fox features.
Absolutely leave the top-left nine-tailed Shiku fox with its seven hands, the top-right scientist, and all three bottom cells untouched. Do not change any text, background, borders, sprite styles, tail counts, color palette or other subjects. No extra people. This is a two-hand correction ONLY.
```
