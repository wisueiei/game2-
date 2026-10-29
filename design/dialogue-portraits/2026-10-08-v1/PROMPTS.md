---
id: 20261009-portraits-v1-prompts
title: "UNDERFALL — Dialogue Portraits v1: prompts"
tags: [portraits, design]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-design-current]
summary: "ปัจจุบัน: UNDERFALL — Dialogue Portraits v1: prompts; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime"
status: current-prompt-record
aliases: ["design/dialogue-portraits/2026-10-08-v1/PROMPTS.md"]
design_baseline: UF-DESIGN-2026-10-09
---

# UNDERFALL — Dialogue Portraits v1: prompts

> **พรอมต์/ผลสร้างตามประวัติของชุดที่เลือก:** การใช้งานปัจจุบันต้องตาม [design-current.md](../../../design-current.md) โดยเฉพาะพิกัดUF-LAYOUT-2026-10-09และหน้าVoidที่เปิดหลังต้นไม้ ไม่เขียนทับข้อความpromptเดิมเพื่อให้เหมือนว่าใช้สร้างใหม่แล้ว

Tool: built-in image_gen/edit of Codex, transparent_background=false for authoring boards; no CLI/API fallback.
Every selected image saved in project; crop/alpha-ready assets not yet created.

Usage clarification confirmed 2026-10-09: the Void voice in 10.1/10.11 and ALT SCIENTIST (shiku_alternate) are the same alternate-timeline Shiku. Keep voice-only with no portrait/silhouette/world sprite until first meeting after entering behind the tree in SX03; reveal face and body there. This updates use timing, not the historical generation prompts below. VOID ECHO remains a separate unresolved erasure-entity placeholder, not an additional Void-voice speaker.

## 01 — ทอเรียล แซน ปาปิรัส อันดาย อัลฟี่ และคิน

Selected: [01-core-cast-dialogue-faces-v1.png](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/01-core-cast-dialogue-faces-v1.png>)

Inputs passed (order preserved):

- Image1: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-02/01-main-cast-r2.png>)
- Image2: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/1-dialogue-reference-220326.png>)
- Image3: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/4-dialogue-reference-220221.png>)

```text
Use case: identity-preserve / style-transfer. Asset type: UNDERFALL dialogue HEAD portrait EXPRESSION STUDY sheet, NOT gameplay sprites yet.
Transform the provided character designs into consistent monochrome dialogue portraits similar to the provided Undertale dialogue screenshots. Preserve each character's approved latest face/species/head silhouette. Screenshots supply ONLY monochrome head-in-dialogue style and how subtle eyelid/mouth changes communicate mood; don't copy their sentences, UI, logo or forest.
Style: strict 8-bit PIXEL ART, white/offwhite plus two grays on near-black, sharply visible square pixel clusters, nearest-neighbor sprite look, no soft painting, antialiasing, color, gradients or photorealistic anatomy. Faces must remain readable when later remade at64x64 logical pixels. Head and tiny collar only, no full bodies or scene decoration.
Layout: LANDSCAPE1536x1024 dark charcoal authoring board, columns EXACTLY6, ONE character per row with EXACTLY6 emotion variants. Order of columns: NEUTRAL, WARM, SAD, FIRM, SURPRISE, SIGNATURE. Same head scale, eye baseline and crop across ALL variants of same character. Character label at left margin; generous cell gutters and very thin gray grid. Portrait including ears/horns/petals/hat fully inside its cell, not clipped. No giant text or huge top blank area. Different expression must be immediately readable within each row, not six copies of same smile. Don't alter ear count, eye count, species, hair or accessories between columns; nonhuman heads never turned into human anime portraits.
State labels are design categories; SAD/FIRM don't force every actor to cry/be evil. Use character-specific six states exactly as row brief; mechanical/animal/unknown rows are nonverbal visual-state studies, not new speaking roles. Design sheet may contain future reveal forms for AUTHOR only, not instruction to show them early in game. No real couple memories, dialogue, new lore or plot.

Top small title: UNDERFALL - DIALOGUE FACES / 01
Composition: EXACTLY 6 rows x6 columns.
Inputs: Image1: main approved character identity reference / original design edit target; last2 images: dialogue STYLE references only.
Rows from top to bottom:
1. Label "TORIEL": Cream/white goat mom with long drooping ears and small horns, gentle broad muzzle; six expressions soft neutral, warm maternal smile, quiet tearful farewell, restrained protective sternness, worried surprise, tender eyes-closed relief.
2. Label "SANS": Round skeleton skull, small pupils and iconic permanently toothy grin. His grin stays recognizable across all six. Change eyelids/pupils, not into a human face: relaxed, one-eye wink, tired half-lids with same grin, both sockets empty for seriousness, startled raised sockets, both eyes closed in a sleepy smug grin. No crying human tears or eyelashes.
3. Label "PAPYRUS": Tall elongated skeleton face with angular jaw, thin expressive eye sockets and scarf-collar hint; enthusiastic, huge proud smile, disappointed droop, loud frustrated determination, startled, triumphant proud NYEH-style grin. Don't round skull into Sans.
4. Label "UNDYNE": Fish monster, red ponytail silhouette rendered gray, fin ears and eyepatch, visible sharp teeth; direct steady, hearty grin, rare uneasy sadness, fiery determined anger, flustered surprise, embarrassed reluctant friendly smile. Keep eyepatch on same side.
5. Label "ALPHYS": Shy small reptile scientist with round glasses, triangular little head crest; tentative neutral, gentle pleased smile, guilty downcast watery eyes, worried firm resolve rather than cruelty, startled glasses/sweat, shy flustered blush indicated tiny white hatch pixels.
6. Label "KIN OWL": MUST owl MONSTER, feathery tufts, spectacles, visible bird beak and round facial disk, not human. Courteous neutral, confident teasing smile through eyes, concerned sadness, focused determined brows, surprised lifted tufts, bashful flirt via narrowed warm eyes and slight beak smile.
```

## 02 — มาเรีย แมตตาตอนสองร่าง แอสกอ ฟลาววี่ และฟิว

Selected: [02-conflict-and-stage-dialogue-faces-v1.png](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/02-conflict-and-stage-dialogue-faces-v1.png>)

Inputs passed (order preserved):

- Image1: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-02/01-main-cast-r2.png>)
- Image2: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-02/02-royal-story-cast-r2b.png>)
- Image3: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/1-dialogue-reference-220326.png>)
- Image4: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/4-dialogue-reference-220221.png>)

```text
Use case: identity-preserve / style-transfer. Asset type: UNDERFALL dialogue HEAD portrait EXPRESSION STUDY sheet, NOT gameplay sprites yet.
Transform the provided character designs into consistent monochrome dialogue portraits similar to the provided Undertale dialogue screenshots. Preserve each character's approved latest face/species/head silhouette. Screenshots supply ONLY monochrome head-in-dialogue style and how subtle eyelid/mouth changes communicate mood; don't copy their sentences, UI, logo or forest.
Style: strict 8-bit PIXEL ART, white/offwhite plus two grays on near-black, sharply visible square pixel clusters, nearest-neighbor sprite look, no soft painting, antialiasing, color, gradients or photorealistic anatomy. Faces must remain readable when later remade at64x64 logical pixels. Head and tiny collar only, no full bodies or scene decoration.
Layout: LANDSCAPE1536x1024 dark charcoal authoring board, columns EXACTLY6, ONE character per row with EXACTLY6 emotion variants. Order of columns: NEUTRAL, WARM, SAD, FIRM, SURPRISE, SIGNATURE. Same head scale, eye baseline and crop across ALL variants of same character. Character label at left margin; generous cell gutters and very thin gray grid. Portrait including ears/horns/petals/hat fully inside its cell, not clipped. No giant text or huge top blank area. Different expression must be immediately readable within each row, not six copies of same smile. Don't alter ear count, eye count, species, hair or accessories between columns; nonhuman heads never turned into human anime portraits.
State labels are design categories; SAD/FIRM don't force every actor to cry/be evil. Use character-specific six states exactly as row brief; mechanical/animal/unknown rows are nonverbal visual-state studies, not new speaking roles. Design sheet may contain future reveal forms for AUTHOR only, not instruction to show them early in game. No real couple memories, dialogue, new lore or plot.

Top small title: UNDERFALL - DIALOGUE FACES / 02
Composition: EXACTLY 6 rows x6 columns.
Inputs: Image1: main approved character identity reference / original design edit target; Image2: royal approved character identity reference; last2 images: dialogue STYLE references only.
Rows from top to bottom:
1. Label "MARIA": Wolf-like monster with pointed ears, shaggy hair and short muzzle, guarded frown, reluctantly friendly, hurt uncertain gaze, suspicious angry glare, alarm, stubborn averted-eyes concealed gratitude.
2. Label "METTATON BOX": Square metal grid-screen robot. Use cropped upper box/display, same panel/rivet/speaker silhouette; six emotional variants are lit display segment patterns and tilt, not a new human face, no cartoon eyes added outside display.
3. Label "METTATON NEO": Androgynous glamorous robot face, swept asymmetrical dark hair covering one eye, sharp stage makeup and metallic cheek line. Cool neutral, dazzling smile, sincere unguarded sadness, fierce defiant, exaggerated gasp, confident wink-showbiz pout.
4. Label "ASGORE": Adult goat KING head with curved horns, dark forelock, substantial beard and heavy eyebrows, no giant armor body. Tired courteous, small warm smile, profound guilty sorrow, solemn duty not evil cackle, startled, exhausted apologetic gaze.
5. Label "FLOWEY": Flower round face WITH petal ring, cropped short stem only. Neutral attentive, falsely friendly bright smile, sad/empty disquiet, hostile grin sharp brows, shocked at losing control, sly half-lidded scheming smirk. Vary face while same petals/size.
6. Label "FIW RACCOON": MUST RACCOON MONSTER, clear masked fur band, snout/ears, hat and scarf edge from reference. Neutral hesitant, approachable real/facade smile, feeling abandoned downcast, resentful anger RESERVED late, nervous surprised, jealousy shown quiet sideways glance, not openly evil every panel.
```

## 03 — ผู้เล่น ริน แอสเรียลสองร่าง ชิกุจิ้งจอก และหยวน

Selected: [03-relationships-and-forms-dialogue-faces-v1.png](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/03-relationships-and-forms-dialogue-faces-v1.png>)

Inputs passed (order preserved):

- Image1: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-05/07-player-petite-shorts-r5.png>)
- Image2: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-02/02-royal-story-cast-r2b.png>)
- Image3: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-04/03-void-special-forms-r4.png>)
- Image4: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/1-dialogue-reference-220326.png>)
- Image5: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/4-dialogue-reference-220221.png>)

```text
Use case: identity-preserve / style-transfer. Asset type: UNDERFALL dialogue HEAD portrait EXPRESSION STUDY sheet, NOT gameplay sprites yet.
Transform the provided character designs into consistent monochrome dialogue portraits similar to the provided Undertale dialogue screenshots. Preserve each character's approved latest face/species/head silhouette. Screenshots supply ONLY monochrome head-in-dialogue style and how subtle eyelid/mouth changes communicate mood; don't copy their sentences, UI, logo or forest.
Style: strict 8-bit PIXEL ART, white/offwhite plus two grays on near-black, sharply visible square pixel clusters, nearest-neighbor sprite look, no soft painting, antialiasing, color, gradients or photorealistic anatomy. Faces must remain readable when later remade at64x64 logical pixels. Head and tiny collar only, no full bodies or scene decoration.
Layout: LANDSCAPE1536x1024 dark charcoal authoring board, columns EXACTLY6, ONE character per row with EXACTLY6 emotion variants. Order of columns: NEUTRAL, WARM, SAD, FIRM, SURPRISE, SIGNATURE. Same head scale, eye baseline and crop across ALL variants of same character. Character label at left margin; generous cell gutters and very thin gray grid. Portrait including ears/horns/petals/hat fully inside its cell, not clipped. No giant text or huge top blank area. Different expression must be immediately readable within each row, not six copies of same smile. Don't alter ear count, eye count, species, hair or accessories between columns; nonhuman heads never turned into human anime portraits.
State labels are design categories; SAD/FIRM don't force every actor to cry/be evil. Use character-specific six states exactly as row brief; mechanical/animal/unknown rows are nonverbal visual-state studies, not new speaking roles. Design sheet may contain future reveal forms for AUTHOR only, not instruction to show them early in game. No real couple memories, dialogue, new lore or plot.

Top small title: UNDERFALL - DIALOGUE FACES / 03
Composition: EXACTLY 6 rows x6 columns.
Inputs: Image1: player approved character identity reference / original design edit target; Image2: royal approved character identity reference; Image3: special approved character identity reference; last2 images: dialogue STYLE references only.
Rows from top to bottom:
1. Label "PLAYER R5": Petite slim young human brown bob girl R5. Head-only no body changes; small softly closed-eye neutral smile, bright warm expression, quiet sadness, determined brows, surprised open eyes, shy pleased smile. Not Rin's scarf/hair or Frisk stock sprite.
2. Label "RIN PAST": Human girl with brown bob, distinct RED SCARF rendered grayscale and gentle open eyes from reference, a little more solemn than present player; calm, open friendly smile, hurt sorrow, bitter determination, startled, wistful averted eyes.
3. Label "ASRIEL CHILD": WHITE GOAT CHILD, long soft drooping ears, little hair tuft, round expressive eyes, green sweater collar rendered gray; neutral friendly, delighted smile, tearful grieving, upset but vulnerable, surprised, peaceful acceptance eyes-soft. Keep child clearly nonhuman.
4. Label "ASRIEL HYPER": Youthful slender white goat from revised R4, long light fringe, curved horns, tall pointed purple/ivory collar rendered monochrome. Calm imposing, excited reunion smile, painful denial tear, fierce desperate resolve, stunned, breaking-down recognition. Not adult Asgore beard or child-green form.
5. Label "SHIKU FOX": True nine-tail fox's HEAD ONLY, long triangular fox ears, slim fox muzzle, cheek/chest fluff and forehead markings. Keep animal fox identity, not new anime human fox boy. Relaxed caring, playful grin, worried soft eyes, protective focused snarl without villainy, surprised ear lift, affectionate teasing wink. No giant nine tails/hands inside tiny portrait.
6. Label "YUAN": HUMAN black-haired young man with hair over one eye, visible calm eye and high WHITE collar, matching latest R3/R4 source. Caring neutral, teasing small smile, deep worried sadness, protective serious gaze, surprised, affectionate bashful closed-eye smile. No skull mask or silver hair; no floating hands cluttering head portrait.
```

## 04 — เสียงปริศนา อีกเส้นเวลา VOID ECHO และฟลาววี่ไม่สมบูรณ์

Selected: [04-mystery-masked-and-incomplete-faces-v1.png](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/04-mystery-masked-and-incomplete-faces-v1.png>)

Inputs passed (order preserved):

- Image1: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-04/03-void-special-forms-r4.png>)
- Image2: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/1-dialogue-reference-220326.png>)
- Image3: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/4-dialogue-reference-220221.png>)

```text
Use case: identity-preserve / style-transfer. Asset type: UNDERFALL dialogue HEAD portrait EXPRESSION STUDY sheet, NOT gameplay sprites yet.
Transform the provided character designs into consistent monochrome dialogue portraits similar to the provided Undertale dialogue screenshots. Preserve each character's approved latest face/species/head silhouette. Screenshots supply ONLY monochrome head-in-dialogue style and how subtle eyelid/mouth changes communicate mood; don't copy their sentences, UI, logo or forest.
Style: strict 8-bit PIXEL ART, white/offwhite plus two grays on near-black, sharply visible square pixel clusters, nearest-neighbor sprite look, no soft painting, antialiasing, color, gradients or photorealistic anatomy. Faces must remain readable when later remade at64x64 logical pixels. Head and tiny collar only, no full bodies or scene decoration.
Layout: LANDSCAPE1536x1024 dark charcoal authoring board, columns EXACTLY6, ONE character per row with EXACTLY6 emotion variants. Order of columns: NEUTRAL, WARM, SAD, FIRM, SURPRISE, SIGNATURE. Same head scale, eye baseline and crop across ALL variants of same character. Character label at left margin; generous cell gutters and very thin gray grid. Portrait including ears/horns/petals/hat fully inside its cell, not clipped. No giant text or huge top blank area. Different expression must be immediately readable within each row, not six copies of same smile. Don't alter ear count, eye count, species, hair or accessories between columns; nonhuman heads never turned into human anime portraits.
State labels are design categories; SAD/FIRM don't force every actor to cry/be evil. Use character-specific six states exactly as row brief; mechanical/animal/unknown rows are nonverbal visual-state studies, not new speaking roles. Design sheet may contain future reveal forms for AUTHOR only, not instruction to show them early in game. No real couple memories, dialogue, new lore or plot.

Top small title: UNDERFALL - DIALOGUE FACES / 04
Composition: EXACTLY 4 rows x6 columns.
Inputs: Image1: special approved character identity reference / original design edit target; last2 images: dialogue STYLE references only.
Rows from top to bottom:
1. Label "UNKNOWN": Identity-protected BLACK silhouette placeholder within face slot, simple small bottle/flame glyph plus literal ???, absolutely NO fox ears, HUMAN face, WHITE scarf, colored hands or recognizable skull. Six subtle graphic states idle/soft pulsing/worried dim/alert flare/disrupted flicker/calm, not human facial expressions.
2. Label "ALT SCIENTIST": Glitched pale skeletal/mask scientist head from source top-right, uneven black sockets and fractured dark edges, NOT human Yuan nor true fox. Calm observational, quietly intrigued NOT happy villain, pensive dim, intense focused NOT evil, distorted startled, obsessed curiosity. Light pixel glitches at edge but face remains readable; no implied attack scene.
3. Label "VOID ECHO": Source bottom-left uncertain jagged black erasure silhouette with no defined face. Six visual-state variations static/dim/fragment/flicker/offset/quiet; do NOT invent eyes smile anger tears or personality. This is reserved art placeholder not asserted speaking character.
4. Label "FLOWEY INCOMPLETE": Source bottom-right monstrous TV face in a square bezel with hint of pipe/cable border, head/UI close crop only, no entire roots/claw body. Six grotesque readable display moods static blank, mocking smile, broken/empty, rage, flicker shock, twisted suspicious grin. Not cute normal flower. NO gore/blood.
```

## 05 — มอนรูนที่เผชิญหน้ากับผู้เล่น

Selected: [05-ruins-encounter-dialogue-faces-v1.png](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/05-ruins-encounter-dialogue-faces-v1.png>)

Inputs passed (order preserved):

- Image1: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-02/04-ruins-monsters-r2.png>)
- Image2: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/1-dialogue-reference-220326.png>)
- Image3: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/4-dialogue-reference-220221.png>)

```text
Use case: identity-preserve / style-transfer. Asset type: UNDERFALL dialogue HEAD portrait EXPRESSION STUDY sheet, NOT gameplay sprites yet.
Transform the provided character designs into consistent monochrome dialogue portraits similar to the provided Undertale dialogue screenshots. Preserve each character's approved latest face/species/head silhouette. Screenshots supply ONLY monochrome head-in-dialogue style and how subtle eyelid/mouth changes communicate mood; don't copy their sentences, UI, logo or forest.
Style: strict 8-bit PIXEL ART, white/offwhite plus two grays on near-black, sharply visible square pixel clusters, nearest-neighbor sprite look, no soft painting, antialiasing, color, gradients or photorealistic anatomy. Faces must remain readable when later remade at64x64 logical pixels. Head and tiny collar only, no full bodies or scene decoration.
Layout: LANDSCAPE1536x1024 dark charcoal authoring board, columns EXACTLY6, ONE character per row with EXACTLY6 emotion variants. Order of columns: NEUTRAL, WARM, SAD, FIRM, SURPRISE, SIGNATURE. Same head scale, eye baseline and crop across ALL variants of same character. Character label at left margin; generous cell gutters and very thin gray grid. Portrait including ears/horns/petals/hat fully inside its cell, not clipped. No giant text or huge top blank area. Different expression must be immediately readable within each row, not six copies of same smile. Don't alter ear count, eye count, species, hair or accessories between columns; nonhuman heads never turned into human anime portraits.
State labels are design categories; SAD/FIRM don't force every actor to cry/be evil. Use character-specific six states exactly as row brief; mechanical/animal/unknown rows are nonverbal visual-state studies, not new speaking roles. Design sheet may contain future reveal forms for AUTHOR only, not instruction to show them early in game. No real couple memories, dialogue, new lore or plot.

Top small title: UNDERFALL - DIALOGUE FACES / 05
Composition: EXACTLY 6 rows x6 columns.
Inputs: Image1: ruins approved character identity reference / original design edit target; last2 images: dialogue STYLE references only.
Rows from top to bottom:
1. Label "FROGGIT": Frog broad face, huge bulging eyes; polite tentative, small reassured smile, worried droop, timid defensive not evil, startled, grateful relief.
2. Label "WHIMSUN": Tiny shy winged monster face with antennae and faint wing-edge framing; frightened neutral, tiny trust smile, trembling downcast, trying to be brave not mean, panic surprise, bashful thankfulness.
3. Label "MOLDSMAL": Soft jelly face / upper mound with two dot eyes. Communicates via tiny shifts and squash not fluent human acting: still neutral, mild bounce, sag, tense wiggle, raised blob surprise, relaxed slow wobble. No human lips/eyebrows added.
4. Label "LOOX": ONE-EYED round little horn monster head. All moods through exactly ONE eye/eyelid plus mouth; guarded, reassured, downcast, glare, wide single-eye surprise, averting single eye shy-relief. Never give second eye.
5. Label "VEGETOID": Turnip face with two/three leaf tips, little mouth; earnest neutral, caring pleased, worried, stern about care not cruelty, surprised leaves lift, relieved approving nod.
6. Label "MIGOSP": Little bug head with two antennae, half-lidded eyes. Defensive neutral, loosened playful, uneasy, stubborn tense glare, startled antennae, relaxed dancing smile. No human ears.
```

## 06 — ผี หุ่น หิน ร้านแมงมุม จิบ และซอง

Selected: [06-ruins-rest-and-neighbors-faces-v1.png](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/06-ruins-rest-and-neighbors-faces-v1.png>)

Inputs passed (order preserved):

- Image1: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-02/04-ruins-monsters-r2.png>)
- Image2: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-02/05-community-monsters-r2.png>)
- Image3: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/1-dialogue-reference-220326.png>)
- Image4: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/4-dialogue-reference-220221.png>)

```text
Use case: identity-preserve / style-transfer. Asset type: UNDERFALL dialogue HEAD portrait EXPRESSION STUDY sheet, NOT gameplay sprites yet.
Transform the provided character designs into consistent monochrome dialogue portraits similar to the provided Undertale dialogue screenshots. Preserve each character's approved latest face/species/head silhouette. Screenshots supply ONLY monochrome head-in-dialogue style and how subtle eyelid/mouth changes communicate mood; don't copy their sentences, UI, logo or forest.
Style: strict 8-bit PIXEL ART, white/offwhite plus two grays on near-black, sharply visible square pixel clusters, nearest-neighbor sprite look, no soft painting, antialiasing, color, gradients or photorealistic anatomy. Faces must remain readable when later remade at64x64 logical pixels. Head and tiny collar only, no full bodies or scene decoration.
Layout: LANDSCAPE1536x1024 dark charcoal authoring board, columns EXACTLY6, ONE character per row with EXACTLY6 emotion variants. Order of columns: NEUTRAL, WARM, SAD, FIRM, SURPRISE, SIGNATURE. Same head scale, eye baseline and crop across ALL variants of same character. Character label at left margin; generous cell gutters and very thin gray grid. Portrait including ears/horns/petals/hat fully inside its cell, not clipped. No giant text or huge top blank area. Different expression must be immediately readable within each row, not six copies of same smile. Don't alter ear count, eye count, species, hair or accessories between columns; nonhuman heads never turned into human anime portraits.
State labels are design categories; SAD/FIRM don't force every actor to cry/be evil. Use character-specific six states exactly as row brief; mechanical/animal/unknown rows are nonverbal visual-state studies, not new speaking roles. Design sheet may contain future reveal forms for AUTHOR only, not instruction to show them early in game. No real couple memories, dialogue, new lore or plot.

Top small title: UNDERFALL - DIALOGUE FACES / 06
Composition: EXACTLY 6 rows x6 columns.
Inputs: Image1: ruins approved character identity reference / original design edit target; Image2: community approved character identity reference; last2 images: dialogue STYLE references only.
Rows from top to bottom:
1. Label "NAPSTABLOOK": Soft drooping ghost upper silhouette with dark eyes. Shy neutral, tiny restrained smile, watery downcast tears, anxious overwhelmed NOT aggressive angry, embarrassed surprise, delicate happy tear-hat silhouette as signature. Do not give human mouthfull grin.
2. Label "DUMMY": Plain stitched fabric dummy face with seam and plus-shaped sewn eyes. Variants simple tilt/stitch-mouth adjustment as OPTIONAL visual study; do not turn into speaking Mad Dummy or grant new consciousness.
3. Label "TALKING ROCK": Uneven pebble upper face with barely carved eyes and crack-mouth, stern patient, slight satisfaction, exasperated droop, grumpy objection, raised stone brows, stubborn settled face. No legs/human face.
4. Label "SPIDER BAKERS": THREE tiny baker spider heads as one grouped portrait, cap/bonnet fragments from source. Neutral attentive trio, proud happy, disappointed worried, firm bargaining not threatening, surprised, busy whispering together. Keep trio distinct from humanoid Muffet.
5. Label "JIB CUP": Teacup-head with handle/herb tips, two shy eyes, tiny mouth. Courteous, grateful smile, worried spillage, determined but hesitant, surprise with tiny spill line, bashful apologies. Not human chef.
6. Label "SONG LETTER": Envelope HEAD with stamp and fold lines, small face, no human skull. Helpful neutral, grateful, embarrassed sadness, trying to focus not evil, surprised, sheepishly realizing wrong address.
```

## 07 — คนส่งของ คนพัก นักเก็บเสียง หุ่น และคนจุดโคม

Selected: [07-community-and-vendors-faces-v1.png](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/07-community-and-vendors-faces-v1.png>)

Inputs passed (order preserved):

- Image1: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-02/05-community-monsters-r2.png>)
- Image2: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/1-dialogue-reference-220326.png>)
- Image3: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/4-dialogue-reference-220221.png>)

```text
Use case: identity-preserve / style-transfer. Asset type: UNDERFALL dialogue HEAD portrait EXPRESSION STUDY sheet, NOT gameplay sprites yet.
Transform the provided character designs into consistent monochrome dialogue portraits similar to the provided Undertale dialogue screenshots. Preserve each character's approved latest face/species/head silhouette. Screenshots supply ONLY monochrome head-in-dialogue style and how subtle eyelid/mouth changes communicate mood; don't copy their sentences, UI, logo or forest.
Style: strict 8-bit PIXEL ART, white/offwhite plus two grays on near-black, sharply visible square pixel clusters, nearest-neighbor sprite look, no soft painting, antialiasing, color, gradients or photorealistic anatomy. Faces must remain readable when later remade at64x64 logical pixels. Head and tiny collar only, no full bodies or scene decoration.
Layout: LANDSCAPE1536x1024 dark charcoal authoring board, columns EXACTLY6, ONE character per row with EXACTLY6 emotion variants. Order of columns: NEUTRAL, WARM, SAD, FIRM, SURPRISE, SIGNATURE. Same head scale, eye baseline and crop across ALL variants of same character. Character label at left margin; generous cell gutters and very thin gray grid. Portrait including ears/horns/petals/hat fully inside its cell, not clipped. No giant text or huge top blank area. Different expression must be immediately readable within each row, not six copies of same smile. Don't alter ear count, eye count, species, hair or accessories between columns; nonhuman heads never turned into human anime portraits.
State labels are design categories; SAD/FIRM don't force every actor to cry/be evil. Use character-specific six states exactly as row brief; mechanical/animal/unknown rows are nonverbal visual-state studies, not new speaking roles. Design sheet may contain future reveal forms for AUTHOR only, not instruction to show them early in game. No real couple memories, dialogue, new lore or plot.

Top small title: UNDERFALL - DIALOGUE FACES / 07
Composition: EXACTLY 6 rows x6 columns.
Inputs: Image1: community approved character identity reference / original design edit target; last2 images: dialogue STYLE references only.
Rows from top to bottom:
1. Label "LANTERN FISH": Round fish head with fins and hanging lantern rim, little fish lips. Busy helpful, bright smile, worried delivery, concentrated determined, wide eyed surprise, embarrassed relief.
2. Label "SNOW SCARVES": Snowball head with layered scarf framing; grumpy neutral, small melted-soft smile, shivery sad, stubborn frown, surprised, insists-not-cold with teeth-chattering comedy.
3. Label "PILLOW": Soft pillow-shaped face with corners and sleepy cap, drooping lids. Sleepy neutral, slow warm smile, lonely droop, sleepy annoyed, wakes startled, eyes-closed dozing. No invented human face.
4. Label "SOUND COLLECTOR": Gentle long-eared shy purple animal head from source bottom-left; listening neutral, pleased eyes, timid sad, determined concentration, surprised ears, bashful proud after sharing music. Do not reveal hidden scientist.
5. Label "HELPER BOT": Rounded monitor robot head with antenna and TWO screen pixel eyes, monochrome face states generated within screen only, friendly/happy/downward/warning/wide eyes/check-like contentment. Preserve robot not human.
6. Label "LANTERN KEEPER": Hooded moth-like MONSTER, long antennae and soft face, not human monk. Quiet neutral, reassuring, pensive, firm watchfulness, antennae surprised, gentle knowing smile that does NOT imply knowledge of all timelines.
```

## 08 — คนดูแลสวน สัตว์เล็ก มอนทดลอง และกิวบี้

Selected: [08-small-cast-experiments-and-grillby-faces-v1.png](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/08-small-cast-experiments-and-grillby-faces-v1.png>)

Inputs passed (order preserved):

- Image1: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-02/06-small-cast-experiment-r2.png>)
- Image2: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/1-dialogue-reference-220326.png>)
- Image3: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/4-dialogue-reference-220221.png>)

```text
Use case: identity-preserve / style-transfer. Asset type: UNDERFALL dialogue HEAD portrait EXPRESSION STUDY sheet, NOT gameplay sprites yet.
Transform the provided character designs into consistent monochrome dialogue portraits similar to the provided Undertale dialogue screenshots. Preserve each character's approved latest face/species/head silhouette. Screenshots supply ONLY monochrome head-in-dialogue style and how subtle eyelid/mouth changes communicate mood; don't copy their sentences, UI, logo or forest.
Style: strict 8-bit PIXEL ART, white/offwhite plus two grays on near-black, sharply visible square pixel clusters, nearest-neighbor sprite look, no soft painting, antialiasing, color, gradients or photorealistic anatomy. Faces must remain readable when later remade at64x64 logical pixels. Head and tiny collar only, no full bodies or scene decoration.
Layout: LANDSCAPE1536x1024 dark charcoal authoring board, columns EXACTLY6, ONE character per row with EXACTLY6 emotion variants. Order of columns: NEUTRAL, WARM, SAD, FIRM, SURPRISE, SIGNATURE. Same head scale, eye baseline and crop across ALL variants of same character. Character label at left margin; generous cell gutters and very thin gray grid. Portrait including ears/horns/petals/hat fully inside its cell, not clipped. No giant text or huge top blank area. Different expression must be immediately readable within each row, not six copies of same smile. Don't alter ear count, eye count, species, hair or accessories between columns; nonhuman heads never turned into human anime portraits.
State labels are design categories; SAD/FIRM don't force every actor to cry/be evil. Use character-specific six states exactly as row brief; mechanical/animal/unknown rows are nonverbal visual-state studies, not new speaking roles. Design sheet may contain future reveal forms for AUTHOR only, not instruction to show them early in game. No real couple memories, dialogue, new lore or plot.

Top small title: UNDERFALL - DIALOGUE FACES / 08
Composition: EXACTLY 6 rows x6 columns.
Inputs: Image1: small approved character identity reference / original design edit target; last2 images: dialogue STYLE references only.
Rows from top to bottom:
1. Label "GARDENER": Plant-pot HEAD with leaves, cute gardener face in pot, helpful calm, sunshine-like smile, wilt worried, protective of plants, raised leaves surprise, nurturing approval. No new hidden-memory lore.
2. Label "TINY FROG": Tiny frog upper face using source tiny proportions, modest neutral, happy, timid sad, indignant-small, startled, shy proud. Distinct from broad Froggit.
3. Label "MOUSE": Small round-eared mouse face with whiskers and bow collar hint, cautious neutral, small delighted, fearful, brave concentration, surprised, shy nibbling cheese edge as nonverbal pose. Not newly speaking plot character.
4. Label "SPIRIT DEER": Gentle deer muzzle with narrow antlers/leaf ear tips, serene, friendly, concerned, alert protective, startled, peacefully eyes-closed. Reserve nonverbal emotive animal sprite, no asserting it speaks.
5. Label "LIVING AMALGAMS": Living two-head semi-liquid monster from source, heads together in one portrait, soft drooping/melted outlines, no horror gore. Quiet neutral, small hopeful, sorrowful, distressed but not evil, startled, relieved being cared for. Keep individuality and TWO faces from source.
6. Label "GRILLBY": Flame-headed MONSTER bartender from established tavern study, eyeglasses, no human face/body. Fire silhouette readable white grayscale, expression conveyed by flame shape/eyes/lenses, steady service, warmer flare, lowered gentle fire, concentrated tall flame, surprised sparks, discreet friendly wink. No speaking script invented.
```

## 09 — มัฟเฟต เทมมี่ มอนสเตอร์คิด สโนว์เดรก และไอซ์แคป

Selected: [09-supporting-muffet-temmie-kid-ice-faces-v1.png](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/09-supporting-muffet-temmie-kid-ice-faces-v1.png>)

Inputs passed (order preserved):

- Image1: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-02/08-undertale-supporting-roster-r2.png>)
- Image2: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/1-dialogue-reference-220326.png>)
- Image3: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/4-dialogue-reference-220221.png>)

```text
Use case: identity-preserve / style-transfer. Asset type: UNDERFALL dialogue HEAD portrait EXPRESSION STUDY sheet, NOT gameplay sprites yet.
Transform the provided character designs into consistent monochrome dialogue portraits similar to the provided Undertale dialogue screenshots. Preserve each character's approved latest face/species/head silhouette. Screenshots supply ONLY monochrome head-in-dialogue style and how subtle eyelid/mouth changes communicate mood; don't copy their sentences, UI, logo or forest.
Style: strict 8-bit PIXEL ART, white/offwhite plus two grays on near-black, sharply visible square pixel clusters, nearest-neighbor sprite look, no soft painting, antialiasing, color, gradients or photorealistic anatomy. Faces must remain readable when later remade at64x64 logical pixels. Head and tiny collar only, no full bodies or scene decoration.
Layout: LANDSCAPE1536x1024 dark charcoal authoring board, columns EXACTLY6, ONE character per row with EXACTLY6 emotion variants. Order of columns: NEUTRAL, WARM, SAD, FIRM, SURPRISE, SIGNATURE. Same head scale, eye baseline and crop across ALL variants of same character. Character label at left margin; generous cell gutters and very thin gray grid. Portrait including ears/horns/petals/hat fully inside its cell, not clipped. No giant text or huge top blank area. Different expression must be immediately readable within each row, not six copies of same smile. Don't alter ear count, eye count, species, hair or accessories between columns; nonhuman heads never turned into human anime portraits.
State labels are design categories; SAD/FIRM don't force every actor to cry/be evil. Use character-specific six states exactly as row brief; mechanical/animal/unknown rows are nonverbal visual-state studies, not new speaking roles. Design sheet may contain future reveal forms for AUTHOR only, not instruction to show them early in game. No real couple memories, dialogue, new lore or plot.

Top small title: UNDERFALL - DIALOGUE FACES / 09
Composition: EXACTLY 5 rows x6 columns.
Inputs: Image1: support approved character identity reference / original design edit target; last2 images: dialogue STYLE references only.
Rows from top to bottom:
1. Label "MUFFET": Humanoid spider GIRL with EXACTLY FIVE eyes (two larger lower eyes and three small forehead eyes), pigtails/ribbons, same shape as source. Polite controlled, delighted, uneasy, stern merchant glare, surprised allfive eyes, sweet mischievous tea smile. Don't reduce to two human eyes. Head only, no need show six arms.
2. Label "TEMMIE": Cute cat-dog monster head dark shaggy hair, ears and cheek tufts, bright neutral, huge enthusiastic smile, comical pout, silly frustrated not threatening, wide-eyed astonished, excited tongue peeking. No human face.
3. Label "MONSTER KID": Small reptile kid head with dorsal spikes, NOT arms. Curious, delighted hero-admiration, hurt disappointed, brave determined, shocked, sheepish goofy grin. Never add arms/hand gesture in portrait.
4. Label "SNOWDRAKE": Bird-like cream face with icicle feather spikes, big eyes and beak, comic confidence, laughing, crestfallen, defensive about bad joke, surprised, proud awkward pun grin.
5. Label "ICE CAP": Small gray snowbeing face under big pointed crystalline ice hat, reserved, pleased, sad, haughty annoyed, surprised, smug admiring own hat. Hat must fully fit portrait.
```

## 10 — กลุ่มยามสุนัข และหุ่นโกรธ

Selected: [10-supporting-dog-guards-and-mad-dummy-faces-v1.png](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/10-supporting-dog-guards-and-mad-dummy-faces-v1.png>)

Inputs passed (order preserved):

- Image1: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-02/08-undertale-supporting-roster-r2.png>)
- Image2: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/1-dialogue-reference-220326.png>)
- Image3: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/4-dialogue-reference-220221.png>)

```text
Use case: identity-preserve / style-transfer. Asset type: UNDERFALL dialogue HEAD portrait EXPRESSION STUDY sheet, NOT gameplay sprites yet.
Transform the provided character designs into consistent monochrome dialogue portraits similar to the provided Undertale dialogue screenshots. Preserve each character's approved latest face/species/head silhouette. Screenshots supply ONLY monochrome head-in-dialogue style and how subtle eyelid/mouth changes communicate mood; don't copy their sentences, UI, logo or forest.
Style: strict 8-bit PIXEL ART, white/offwhite plus two grays on near-black, sharply visible square pixel clusters, nearest-neighbor sprite look, no soft painting, antialiasing, color, gradients or photorealistic anatomy. Faces must remain readable when later remade at64x64 logical pixels. Head and tiny collar only, no full bodies or scene decoration.
Layout: LANDSCAPE1536x1024 dark charcoal authoring board, columns EXACTLY6, ONE character per row with EXACTLY6 emotion variants. Order of columns: NEUTRAL, WARM, SAD, FIRM, SURPRISE, SIGNATURE. Same head scale, eye baseline and crop across ALL variants of same character. Character label at left margin; generous cell gutters and very thin gray grid. Portrait including ears/horns/petals/hat fully inside its cell, not clipped. No giant text or huge top blank area. Different expression must be immediately readable within each row, not six copies of same smile. Don't alter ear count, eye count, species, hair or accessories between columns; nonhuman heads never turned into human anime portraits.
State labels are design categories; SAD/FIRM don't force every actor to cry/be evil. Use character-specific six states exactly as row brief; mechanical/animal/unknown rows are nonverbal visual-state studies, not new speaking roles. Design sheet may contain future reveal forms for AUTHOR only, not instruction to show them early in game. No real couple memories, dialogue, new lore or plot.

Top small title: UNDERFALL - DIALOGUE FACES / 10
Composition: EXACTLY 4 rows x6 columns.
Inputs: Image1: support approved character identity reference / original design edit target; last2 images: dialogue STYLE references only.
Rows from top to bottom:
1. Label "DOGGO": Dog guard head with pointed ears/dark glasses (preserve), alert neutral, wag-like pleased face, uncertain droop, focused defensive, startled sniff, squint-sniff curiosity. Glasses not human goggles redesign.
2. Label "DOGAMY": Male dog knight head from bottom-left source, broad muzzle, pointed ears and chunky neck armor. Duty neutral, friendly canine grin, worried, firm guard anger, surprised ears, relaxed pleased pant.
3. Label "DOGARESSA": Female dog knight head source bottom-middle, distinct longer soft ear/cheek fur, shoulder armor hint, composed, friendly, worried partner, stern protective, surprised, relieved smile. Don't duplicate exact Dogamy head.
4. Label "MAD DUMMY": Stitched sack head with diagonal seam, DIFFERENT from plain training dummy; slanted black sockets, jagged mouth. Irritated default, smug playful, dejected stitched mouth, furious jagged shout, incredulous startled, frustrated rant expression. No gore.
```

## 11 — ตัวอย่างใบหน้าในกล่องคำพูด

Selected: [11-dialogue-box-emotion-preview-v1.png](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/11-dialogue-box-emotion-preview-v1.png>)

Inputs passed (order preserved):

- Image1: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/01-core-cast-dialogue-faces-v1.png>)
- Image2: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/02-conflict-and-stage-dialogue-faces-v1.png>)
- Image3: [reference](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/references/1-dialogue-reference-220326.png>)

```text
Use case: precise-object-edit / UI mockup. Transform supplied expression sheets into an UNDERFALL IN-DIALOGUE PREVIEW board. Image1 is the HEAD-ID + EXPRESSION edit source for Toriel/Sans/Alphys, Image2 supporting head source for Flowey, Image3 only dialogue-box style reference. Preserve the exact heads/species/hair/monochrome pixel-art style from sources.
Landscape1536x1024. Opaque nearly black background. SIX separate wide horizontal dialogue boxes vertically stacked, very crisp white pixel border, comfortable thin dark gaps and small title IN-DIALOGUE PREVIEW at top. Each box has one white/gray pixel portrait in LEFT64x64-style slot, generous gap, text area on right and simple small speaker name at upper-right. Do NOT make characters talk new story dialogue. Text area shows ONLY "* . . ." as neutral placeholder in chunky white pixel lettering. Emotion captions can sit above/beside outside each box, not be part of actual story. No source sentences copied, no Thai gibberish, no world/game screenshots.
Rows exactly: 1 SANS NEUTRAL (both open eye sockets, grin), 2 SANS WINK (one eye closed, unchanged grin), 3 SANS TIRED (eyes both closed or low lids, unchanged grin), 4 FLOWEY FRIENDLY (smiling flower petal-ring face), 5 FLOWEY SLY (half-lidded scheming flower face), 6 TORIEL WARM (gentle goat mother head with ears/horns). Keep heads small enough to fit fully including Toriel ears, no neck/body beyond tiny collar, no face clipping. Pixel edges hard, same scale across portrait slots, no gradients or colors. Quiet gray only outside text/portrait/border. This is visual design preview not actual game implementation and not animated. NO lore reveal faces. Preserve contrasting mood differences clearly.
```

## Correct UNKNOWN to hide identity

Original input: [draft](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/inputs/04-mystery-before-mask-fix.png>)
Selected corrected result: [sheet04](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/dialogue-portraits/2026-10-08-v1/04-mystery-masked-and-incomplete-faces-v1.png>)

```text
Use case: precise-object-edit. Image1 edit target is UNDERFALL dialogue sheet04. Correct ONLY the FIRST ROW labelled UNKNOWN. The first row must NOT reveal any recognizable character silhouette. Completely remove its humanoid/ghost head outline, any hair shape, all white scarf/collar/shoulders, any eyes/ears/skull. In each of its six cells draw ONLY a small generic glass bottle icon containing a tiny spirit flame: no humanoid contour behind it. Six restrained grayscale states: idle flame, gently bright flame, dim flame, alert taller flame, irregular flicker with a few square flecks, calm flame. Keep consistent bottle shape and overall icon footprint. Literal small "???" below the bottle in each cell is allowed; no real name. Flat charcoal empty field around each bottle. Keep all other rows ALT SCIENTIST, VOID ECHO, FLOWEY INCOMPLETE exactly unchanged, same4x6 grid and headings and sharp pixel-art rendering. Do not change style or create a new species. Landscape1536x1024.
```

