---
id: 20261009-maps-v1-prompts
title: "UNDERFALL — พรอมต์วาดแมพชุด v1"
tags: [maps, design, legacy]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-design-current]
summary: "ประวัติ: UNDERFALL — พรอมต์วาดแมพชุด v1; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime"
status: historical-record
aliases: ["design/maps/2026-10-08-v1/PROMPTS.md"]
design_baseline: UF-DESIGN-2026-10-09
---

# UNDERFALL — พรอมต์วาดแมพชุด v1

> **เอกสารประวัติ ไม่ใช่คำสั่งแบบล่าสุด:** เลือกไฟล์ตาม [design-current.md](../../../design-current.md) ก่อน ชุดที่ใช้ตอนนี้คือผู้เล่นR5/ร่างพิเศษR4/ตัวอื่นR2 แมพv2 portrait v1 และเสียงVoidเห็นตัวครั้งแรกหลังต้นไม้SX03 เนื้อหาด้านล่างเก็บตามช่วงที่สร้างเดิม ไม่ให้ใช้ข้อเก่าทับตัวตน/สเกล/กติกาล่าสุด ภาพบางไฟล์ในรุ่นนี้ยังถูกเลือกใช้เป็นแหล่งอ้างอิงตามดัชนีปัจจุบัน

วิธี: built-in image generation; ภาพใหม่ใช้promptโดยไม่มีreferenced_image_paths/num_last_images_to_include; opaque background  
ใช้ข้อความร่วมต่อด้วยข้อความพื้นที่แต่ละภาพ ไม่ใช้nแทนคำขอหลายasset

## คำสั่งร่วม

```text
Use case: stylized-concept.
Asset type: 2D PIXEL-ART RPG LEVEL MAP / environment layout illustration for UNDERFALL.
This is an AUTHOR'S MAP PREVIEW, not a real implemented level. Build a beautiful yet practical explorable layout inspired by Undertale's environmental language, with widened areas, connected rooms, side paths and well-hidden loot. Use the exact region-specific brief below.
STYLE: authentic retro 8-bit-inspired tiled pixel art, 16px-like tiles enlarged with sharp square pixels, dark stepped outlines, 2-3 flat shading tones per material, expressive simple props. Slightly richer lively colors than the original, coherent with Undertale, NOT photorealistic, smooth painting, 3D render, voxel diorama, Minecraft or cinematic concept landscape.
CAMERA: classic Undertale-style flat TOP-DOWN / orthographic 2D exploration map, north walls have simple front faces, floor paths on a clean horizontal/vertical tile grid. NO angled isometric diamond grid, horizon, dramatic perspective or giant 3D buildings. Show a LARGE REGION several gameplay screens wide, not only a straight tiny corridor. Landscape image.
LAYOUT: make walkable paths and door openings unmistakable. A clear entry and onward exit, 3-5 meaningful branches/alcoves, at least one loop that reconnects to a main hub, landmark scenery and resting corners. Keep routes reachable around obstacles and stairs, no random isolated treasure with no access. Darkness/hazard regions have still-visible safe paths.
SECRETS: 2-4 small golden-brown WOODEN CHESTS half-hidden in recesses, behind trees, roots, shelves or waterfalls, reachable via subtle paths; 1-3 CYAN fractured crystal-like MEMORY SHARDS concealed on optional ledges/recesses with tiny blue motes as cues. Memory shards are memories, NOT human body pieces or the seven royal souls. These are proposed placements, no text of personal memories, no loot stats or exact quest canon.
SAVE markers are small GOLD FOUR-POINT STARS; possible alternate-timeline doors are small VIOLET broken-outline portals ONLY where the region brief requests them. A tiny scale placeholder player may appear, brown bob hair, dark navy top with rose-pink stripes, shorts and brown boots, but characters should not dominate. No new named bosses or giant portraits.
ANNOTATION: short readable off-white pixel title at top and a minimal bottom legend with icons/text "C CHEST", "M MEMORY", "S SAVE", "D SECRET". Only a FEW small C1/M1/S1/D1 tags beside proposed locations; never flood the map with words, arrows or stat HUD. No watermarks, decorative logos, dialogue boxes, paintings of character faces, menus, health bars or story exposition.
Keep opaque dark-charcoal outer margin. Preserve cozy warmth, curiosity and gradual mystery; eerie areas are atmospheric, never gory. Do not depict the ending, released monsters walking under real sunlight or any solved lore.
```

## ภาพ 00 — ภาพรวมเส้นทาง — ป่าถึงปราสาท

```text
EXCEPTION: this image is a route ATLAS / region overview, not a single region level map. Header exactly "UNDERFALL — FOREST TO PALACE".
Draw NINE small beautifully readable pixel-map region miniatures in an ordered SNAKE route on a landscape charcoal board:
TOP ROW left-to-right: "R00 FOREST", "R01 RUINS", "R02 SNOWDIN".
MIDDLE ROW right-to-left: "R06 LANTERN FIELD — DRAFT" at right, "R03 WATERFALL" center, "R04 LAB" at left.
BOTTOM ROW left-to-right: "R07 OLD STATION — DRAFT", "R05 CASTLE TOWN", "R05 PALACE".
Connect ONLY consecutive nodes with clean thin arrows in that stated travel order. R00→R01 is a VIOLET dimensional-rift connector, not an ordinary forest footpath; all later travel arrows pale gold/cream.
Distinct biome colors: midnight green forest, plum stone ruins, icy blue snow town, warm sage/gold lantern meadow, indigo/turquoise cave water, slate laboratory with distant ember industrial bridges, rainy purple/gray old station, pale underground royal town, ivory/plum/gold palace.
Add TWO small SECRET side branches only: Lantern Field→"ALT ROOM A — DRAFT", Old Station→"ALT ROOM B — DRAFT", depicted as monochrome void miniatures with violet dotted links and return arrows to SAME origin. These branches must not connect to each other or provide a route skipping main regions.
Two bottom-side branch thumbnails can be small but clearly separate from main path. A few chest/memory/save icons visible in miniatures; legend outside. Do not add a surface/sunrise scene after palace. Do not imply geographical adjacency of the two starting dimensions. Do not put a Void house or final Asriel boss into main travel sequence.
```

## ภาพ 01 — ป่าต้นเรื่อง ป่าขยาย และสวนศักดิ์สิทธิ์

```text
Header "R00 — NIGHT FOREST / SACRED GROVE".
An expansive dark forest with one roughly CIRCULAR central landing clearing on left, pale glowing blue flower clusters and tiny yellow fireflies, dense layered pixel trees and crystal perimeter. Keep most woods dark but the author's plan readable, no daytime green park.
From the clearing a broad winding east path reaches a ROOT-COVERED chest alcove and a separate ROOT-BLOCKED onward gate. From that gate paths go to taller ancient trees with a distant waterfall, a quiet checkpoint clearing and a tiny HAT-WEARING injured-looking silhouette near a fork (do not label him Fiw).
The OPTIONAL upper branch leads behind a great root-wrapped split FOX-MARKED ROCK into a sacred grove: trees, small cave frontage, beautiful enclosed waterfall, cyan/yellow fireflies, one ring-relic CHEST in a flower bed and a save star. This is the old ring grove BEFORE entering the monster dimension, not the later Waterfall town.
The main encounter fork and the grove return path both approach one VIOLET MAIN DIMENSIONAL RIFT at the far right; show two converging paths, not two unrelated worlds. This rift is a story event, NOT the alternate-Shiku secret door.
Add an optional tiny hidden chest behind fallen trees and a faint M1 proposed-memory nook in a rock recess, but no concrete memory story or claim it is collectible before the rift. Use careful faint cues.
Have one loop returning to flower clearing and legible roots/burn gate markers. No Toriel house, Flowey garden in this forest, giant fox portrait, rainbow hands, sunlight or Snowdin ice.
```

## ภาพ 02 — รูน — ห้องสอน ปริศนา ร้าน และทางสำรวจ

```text
Header "R01 — EXPANDED RUINS".
A broad interconnected underground purple/plum brick ruin with top-down room plan, classic Undertale-style arches, leaf piles, simple columns and cracked-floor ledges, not an isometric cathedral.
Entry at lower-left golden FLOWER GARDEN landing chamber, then a small encounter corridor and SAFE vestibule with a save star and shoe-gift caretaker NPC placeholder (no new named character portraits).
Main route groups include: six floor switches demonstration room, three wall-switch room, cloth training dummy corner, spike-grid path with visible safe route, LONG independence corridor, leaf/save lobby and small candy room, cracked floor with lower-room ladder, stone-pressure room, upper leaf path with corresponding lower leaf pattern, three rocks with one talking rock, mouse/cheese rest alcove, ghost resting corridor, small three-spider bake stall, lower pits with ribbon nook, three color-symbol switch rooms, old-city overlook and exit toward a tree by Toriel's home.
Show clear door links and a loop/shortcut that reconnects discovery rooms without erasing the main teaching path. Small lower-room cutaway inset allowed for the leaf puzzle; no item through solid walls.
Hide C1 behind cracked wall ivy, C2 in a lower ladder side room; place M1 behind an old mural recess and M2 on optional overlook shelf. Blue motes not full personal memory text.
The home itself is only a destination doorway/tree at far edge; do not fill it here or replace the entire ruins with a living room. No big boss battle UI or alternate-Shiku portal in the first teaching rooms.
```

## ภาพ 03 — บ้านทอเรียล สวน และโถงทางออก

```text
Header "R01 — TORIEL'S HOME / DEPARTURE".
Two large connected TOP-DOWN map panels, clearly separate floors: warm HOME + GARDEN above, and BASEMENT / EXIT HALL below. Link by one matching staircase, not teleport arrows.
Upper: front tree clearing and save star, modest old purple-stone house, cozy ochre wood-floor living room with a reading chair/bookshelf/fireplace, kitchen with food/table and a few extra bowls, guest child's bedroom with bed and snack spot, another quietly closed room, safe small herb garden.
Make home lived-in and intimate but wider to wander than one tiny box. Side corridor/closet reachable; hidden chest behind a bookshelf garden door, memory shard tucked by a worn garden bench or empty-frame shelf. Do NOT put personal portraits/names in frames or invent an event.
Lower: narrow entry stair expands into a spacious old stone departure corridor with columns and a safe area for Toriel's confrontation, followed by a heavy RUINS EXIT GATE. A save star AFTER confrontation space. Beyond gate suggest only an unentered snowy path, no Sans appearance.
This is Toriel's real home, NOT Shiku's Void house. No lava, monsters threatening bedroom, seven soul containers, corpse scenery or full memory explanation. Use warm cream/plum/wood colors and simple heartfelt props.
```

## ภาพ 04 — ป่าหิมะและเมืองแซน–ปาปิรัส

```text
Header "R02 — SNOWDIN / WIDE WINTER TRAILS".
A large lovely blue/lavender snowy underground forest-town map, crisp pixel pines packed in tiers, cold light-blue snow and warm amber cabin windows. 2D top-down paths, NO snowy photoreal valley or isometric village.
West entry from ruins to a small first-friend checkpoint clearing and old gate; keep this before town. Paths continue through playful snow puzzle fields, snowball area, narrow bridges over icy stream, optional hidden fishing pond and quiet stump overlook. Farther right cozy town hub with two-brother house frontage, inn, general store, warm food stall and mailbox corners.
Provide a main street, side alley, upper woodland loop reconnecting town, and a cave shortcut not skipping major first meetings. Bridge east exit leads toward a lantern meadow in the draft sequence, not straight into palace.
Concealed C1 behind pine/ice wall accessible around back, C2 in attic-side exterior niche or cabin back porch, C3 near optional frozen-stream ledge. M1 under snowdrift/stump blue motes, M2 in a quiet back alley light.
A few generic tiny monster-placeholders can imply life, no unapproved quests or captions. No living human city overhead sun. Do not insert a dimensional scientist as Sans or reveal Yuan's seven hands on this map.
```

## ภาพ 05 — ทุ่งโคมลอย — พื้นที่เดินชิลแบบเสนอ

```text
Header "R06 — LANTERN FIELD / DRAFT".
An expanded cozy UNDERGROUND lantern meadow and small riverside village, sage/blue-green grass, warm amber hanging lanterns, flower strips, gentle dark stream and simple wooden bridges. Dark cavern atmosphere / magical ambient light, not real surface sunset.
Main west-to-east trail bends around a village plaza with tea stall, small homes, parcel bench and a quiet pet-rest corner. Upper loop around flower meadow, lower waterside path to fishing pier and rest seats, all reconnect to main plaza. No required pet system depicted as complete.
Include a DISTINCT BRIDGE CROSSING next to a HOLLOW TREE and broken small stone gate on the upper-right optional route. This is the proposed D1 secret entrance to an overlapping timeline: modest violet seam behind trunk visible only if looking closely, not a giant portal in middle of village.
Hidden C1 behind tall grass near stream, C2 behind cottage/woodpile, M1 at old bridge foundation and M2 on optional stone ledge. Save star safely in normal meadow before the secret branch.
East ordinary exit leads toward Waterfall; D1 optional branch must return to same meadow, not bypass Waterfall.
Town landmarks bridge/tree are designed to recur in a monochrome echo version. No scientist portrait standing openly at tea stall, no real Shiku fox, no lore text or eggs copied from another game.
```

## ภาพ 06 — น้ำตก ชุมชนริมน้ำ และเส้นทางอันเดอร์การ์ด

```text
Header "R03 — WATERFALL / GUARD TRAILS".
A large INDIGO and TURQUOISE underground water-cavern map with narrow water channels, visible waterfalls, small blue echo-like flowers, mossy stone terraces, reed beds and mushroom lights. Top-down pixel cliffs and bridges, not a sideways platformer.
Main path follows lower cave pools toward a modest riverside monster hamlet with tiny shop/pier and then a guard checkpoint/bridge. A broader far-side arena/rest area reserves space for character confrontation; a high winding chase path and separate lower exploration loop reconnect without an impossible jump.
Old wall tablets show simple unreadable abstract silhouettes, no complete war story or invented dialogue. Include a quiet listening/echo-flower garden and a small training corner rather than making whole area a hostile fortress.
C1 behind thin waterfall curtain reached by a side walkway, C2 under a bridge recess reachable from lower path, C3 in hidden reed inlet. M1 behind old stone mural, M2 on lantern-lit side cliff. Save stars in safe hamlet and before larger guard-route area.
Ordinary onward exit to laboratory zone. NO royal throne, alternate-timeline scientist meeting here, surface sky, full boss sprite, gore or secret chest isolated in deep inaccessible water.
```

## ภาพ 07 — เขตทดลอง ทางโรงงาน และเวทีแมตตาตอน

```text
Header "R04 — LABORATORY / STAGE / INDUSTRIAL".
A broad underground science district in flat top-down pixel style. COOL SLATE/teal lab structures connect to restrained EMBER-ORANGE industrial channels/grated bridges and a PURPLE entertainment-stage square. The industrial/lava-like landscape is a thematic design proposal, no extra mandatory Hotland storyline.
Clear central lab foyer with desks, friendly helper-robot shop/workbench corner, upper observation/maintenance walkway, archive side chamber and a stage area for the performer. Main path links lab entrance, first open stage corridor, archive/downstairs and second wider performance venue before ordinary exit.
Use a SMALL lower-level inset: old true-lab-like corridors, a caring treatment/bed area for still-living semi-liquid monsters, faded monitors, glass storage cabinets, no horror torture gore. Make the accessible stair/hatch connection explicit.
Hidden C1 behind service piping/vent corridor, C2 behind backstage curtain, C3 in archive storeroom; M1 in a quiet old research alcove, M2 on lower-lab side shelf. Tiny blue motes, unreadable document icons, no named scientist confession on map.
Main safe paths never require walking in molten floor. No seven soul vats shown as full, no final Asriel/Flowey encounter, no other-timeline scientist replacing Alphys. Leave a few blank research boards as hooks, not explanations.
```

## ภาพ 08 — ย่านสถานีลืมเวลา — พื้นที่เดินชิลแบบเสนอ

```text
Header "R07 — FORGOTTEN STATION / DRAFT".
A nostalgic UNDERGROUND old-station neighborhood, slate-gray/cool-purple brick lanes, warm amber café/repair-shop windows, mossy stone paving, old sheltered platform, benches, parcel depot and a few readable clock silhouettes with stopped hands. No modern photoreal city or neon metro.
Main west-east street connects ordinary entrance from science district to normal onward exit toward royal town. Northern upper walkway loops around old platform/clock tower; lower quiet garden and small antique-store alley reconnect to main café square.
Train tracks and a closed old carriage can be static atmospheric props ONLY, not a new ride feature or shortcut skipping story.
Proposed D1 secret entrance behind a STOPPED CLOCK / maintenance wall at the end of a secluded platform branch, with faint violet edge and a repeated missing-tile shape. This leads to a station echo and other-timeline encounter, returns HERE only. No direct shortcut back to Lantern Field.
C1 behind parcels, C2 behind antique-shop back alley, M1 under clock maintenance niche, M2 in abandoned sheltered platform corner. Save star in warm ordinary café plaza.
No scientist openly standing at café, no explanation of all Void lore, no true Shiku home masquerading as this alternate doorway, no surface sunlight.
```

## ภาพ 09 — เมืองหน้าวังและทางเข้าปราสาทราชา

```text
Header "R05 — ROYAL TOWN / CASTLE APPROACH".
A graceful wide UNDERTALE-like UNDERGROUND pale-stone royal town, ivory/gray paved lanes, gentle purple accent roofs, warm golden lamps, flowers and dark cavern perimeter. There is NO visible normal sky or sun because the barrier is not opened yet.
Ordinary west entrance from station district, a lower welcoming market/library/rest plaza, multiple house rows with warm window lights, side alleys, a bridge/canal-side walkway, and a broad upper avenue toward the LARGE ROYAL CASTLE FACADE/GATE.
Make town feel inhabited and hopeful, not empty evil-king fortress. Main street plus two side loops and quiet memorial-like empty-bench flower corner; do not fill it with invented names/photos.
C1 behind flower hedge reached by garden loop, C2 on accessible store back terrace, C3 behind old stone arch/stair nook. M1 tucked by faded blank monument/bench, M2 behind a quiet side library shelf/alcove with blue glint. Save star in main plaza.
Show castle itself only EXTERIOR/front gate here, legible pixel facade and entry arch, not gigantic isometric building or full cutaway interior. Palace interior is another sheet. No released-monster ending, kidnapped cast, full seven souls, unexplained Void portal or final boss.
```

## ภาพ 10 — ภายในปราสาท ห้องเก่า สวนดอกไม้ และโถงราชา

```text
Header "R05 — ROYAL PALACE / SEALED GATE".
A spacious clean TOP-DOWN CUTAWAY plan of an underground royal castle. Ivory stone floors, charcoal/plum north walls, thin aged-gold trim, long columned hallways and stained-glass light from magical lamps, not daylight. No perspective dollhouse.
Lower entry foyer leads to a quiet home-like wing with modest sitting room/kitchen and small old bedrooms, main long corridor, side library/archive, golden-flower courtyard/garden, and a taller solemn audience/throne encounter hall at the far end. A SIDE sealed study/relic vault can have empty pedestals, but do not depict completed soul collection or victims.
Main route is clear while side wings rejoin through garden/library corridors. Plenty of walking space around throne encounter area. Beyond audience hall show a CLOSED dimensional/barrier ARCH, not an opened surface exit or ending.
C1 in archive alcove behind bookshelf, C2 behind garden hedge, C3 in side storage niche reached by stair loop. M1 at blank old family-room frame nook and M2 beside quiet garden stone with blue motes; keep frames blank, do not invent Rin/personal memories.
Tiny save star before solemn hall. No new dialogue, no actual Asgore/Asriel/Flowey fight artwork, no hostage room full of named monsters, no corpse decorations, no Void scientist shown as royal king. Full game ending remains outside scope.
```

## ภาพ 11 — แผนที่ทับซ้อนและทางไปหาชิกุอีกเส้นเวลา

```text
EXCEPTION: a TWO-ROW, THREE-COLUMN environment MAP STUDY, each panel is a crisp top-down playable room/mini-map, not character concept portraits.
Header "UNDERFALL — OVERLAP / ALT SHIKU — DRAFT".
Top row reading-order labels: "R06 ENTRY", "FIELD ECHO", "VOID ROOM A".
Bottom row labels: "R07 ENTRY", "STATION ECHO", "VOID ROOM B".
TOP normal entry: quiet lantern-meadow bridge, hollow tree and small stone doorway behind leaves, warm colors. Top echo: SAME bridge/tree geometry but desaturated gray/violet, water gone, tree shadow offset, one safe narrow walkable continuation over broken grid fragments. Top VOID ROOM A: black emptiness outside a small floating gray platform courtyard and tiny old laboratory table, empty shelves, one tiny indistinct pale-headed dark-cloaked scientist silhouette far away, quiet and observational, not attacking.
BOTTOM normal entry: stopped clock/platform maintenance doorway in old station, warm café light still far behind. Bottom echo: SAME platform/clock layout gray-violet with slight offset columns and scattered missing tiles, safe route still readable. Bottom VOID ROOM B: old experimental archive on floating stone slabs, dim monitor, diagram boards with abstract marks, tiny dark scientist silhouette, a small blue memory shard and faint white star points, not a gore laboratory.
Add small understated forward/return arrows WITHIN EACH ROW. Each route returns to its OWN entry only; do NOT connect rows or provide a usable Lantern Field↔Station shortcut. Violet seams mark dimensional transitions, ordinary gaps still have safe floor platforms.
The secret figure is ALTERNATE Shiku, not black-haired human Yuan from the player's bottle, not nine-tail true Shiku, and not the separate deletion-born Void Echo. Use only an indistinct small sprite silhouette, no identity lore/large portrait/seven rainbow hands. No real-life memory text, dialogue, skull wallpaper or named ending. Small chest/blue shard/save-like visual points can be proposed locations, but no automatic awards, eggs or forced Determination experiment.
```

## คำสั่งตรวจแก้ที่ได้ผลและเลือกเก็บ v1b

รูปv1ของภาพนั้นเป็นedit target ใช้referenced_image_paths ไม่มีการแก้PNGด้วยPython/Canvas

### 00 → 00-world-route-atlas-v1b.png

```text
Use case: precise-object-edit.
Edit ONLY ONE GOLD MAIN-ROUTE CONNECTOR in this pixel world atlas. All region artwork, titles, labels, icons, all other main arrows and both violet secret-room branches remain untouched.
Currently a long gold line under the middle row starts beneath R06 LANTERN FIELD at the right and runs left/down toward R07 OLD STATION. That falsely skips R03 WATERFALL and R04 LAB.
REMOVE that whole long gold line between middle and bottom rows, including its starting drop under LANTERN FIELD and its current downward arrow.
REPLACE it with ONE SHORT VERTICAL GOLD DOWN-ARROW from the BOTTOM CENTER OF R04 LAB (middle-left panel) directly to the TOP CENTER OF R07 OLD STATION (bottom-left panel). No long horizontal connector, no gold connection from Lantern Field to Station.
Resulting main sequence must be exactly: R00 FOREST → R01 RUINS → R02 SNOWDIN → R06 LANTERN FIELD → R03 WATERFALL → R04 LAB → R07 OLD STATION → R05 CASTLE TOWN → R05 PALACE. Retain existing Waterfall→Lab left-arrow and all other arrows. Do not redraw mini maps, move panels, change text, remove secret rooms or add labels. Keep identical pixel style/background.
```

### 01 → 01-r00-forest-and-sacred-grove-v1b.png

```text
Use case: precise-object-edit.
Only correct the far-RIGHT PURPLE RIFT in this forest map. It is the temporary story tear created when an attacker pushes the player into the monster dimension, NOT a constructed permanent temple portal or optional scientist secret door.
Replace the STONE PILLARS/BUILT DOOR-FRAME surrounding the existing far-right purple opening with normal forest ground/trees matching nearby terrain. Keep the violet opening at that location but make it a FREE-FLOATING IRREGULAR JAGGED VERTICAL CRACK IN SPACE, with a sparse few broken rectangular purple pixels, NO stone arch, pillars, foundation steps or sculpted gateway.
Put a small clear nearby planning label "MAIN RIFT" only if it fits. Do NOT label it D1 secret. It is depicted for event planning, not a permanently open walk-door.
Leave every other path, chest, memory shard, fox-marked rock, sacred grove, waterfalls, character and title/legend unchanged. Do not replace the forest with daytime or add other dimensional doors. Crisp pixel art remains identical.
```

### 02 → 02-r01-expanded-ruins-v1b.png

```text
Use case: precise-object-edit.
Only correct the THREE COLOR-SYMBOL PUZZLE ROOMS on the MID-RIGHT of this purple ruins plan. Currently they are a red room, blue room and yellow room. The existing CH01 design requires BLUE CIRCLE, RED TRIANGLE and GREEN STAR.
Keep the same three small rooms, doors, wall/floor shapes and positions, but change their symbols, switch colors and short headers in LEFT-TO-RIGHT order to:
1 left room: BLUE CIRCLE symbol / blue switch, short label "WEST / BLUE CIRCLE".
2 middle room: RED TRIANGLE symbol / red switch, short label "SOUTH / RED TRIANGLE".
3 right room: GREEN FIVE-POINT STAR symbol / green switch, short label "EAST / GREEN STAR".
Remove the yellow inverted-triangle symbol and old "YELLOW SYMBOL ROOM" text. No yellow puzzle answer remains among these three rooms.
All other rooms, names, chest locations, memory shards, actors, spike layout, paths and legend stay unchanged. Do not add a new puzzle/extra room or change the overall map. Same crisp 8-bit-inspired pixel style.
```

### 04 → 04-r02-snowdin-expanded-v1b.png

```text
Use case: precise-object-edit.
Only edit the small UPPER-RIGHT CAVE marked "D1" in this Snowdin map.
There must NOT be an alternate-timeline scientist portal in Snowdin. Convert this doorway to an ORDINARY SECRET SNOW / ROCK CAVE LOOT NOOK: remove the violet broken-outline portal aura and D1 label, retain the existing natural cave rock outline/stairs and put a tiny half-hidden gold-brown wooden CHEST inside the dark mouth, tagged "C4".
No purple glow, dimensional opening, Gaster/scientist, secret timeline text or new route. This is a regular optional chest cave.
Preserve absolutely the rest of the snow map: town/buildings, pines, bridges/water, all other chests/memory/save markers, little characters, title, ordinary exits and legend. Exact existing pixel style and palette.
```
