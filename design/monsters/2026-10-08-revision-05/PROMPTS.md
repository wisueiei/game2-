---
id: 20261009-characters-r5-prompts
title: "UNDERFALL — ผู้เล่น R5: prompt และ inputs"
tags: [characters, design]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-design-current]
summary: "ปัจจุบัน: UNDERFALL — ผู้เล่น R5: prompt และ inputs; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime"
status: current-prompt-record
aliases: ["design/monsters/2026-10-08-revision-05/PROMPTS.md"]
design_baseline: UF-DESIGN-2026-10-09
---

# UNDERFALL — ผู้เล่น R5: prompt และ inputs

> **พรอมต์/ผลสร้างตามประวัติของชุดที่เลือก:** การใช้งานปัจจุบันต้องตาม [design-current.md](../../../design-current.md) โดยเฉพาะพิกัดUF-LAYOUT-2026-10-09และหน้าVoidที่เปิดหลังต้นไม้ ไม่เขียนทับข้อความpromptเดิมเพื่อให้เหมือนว่าใช้สร้างใหม่แล้ว

เครื่องมือ: built-in image_gen / edit, opaque background; ไม่มี CLI/API fallback
Selected: [07-player-petite-shorts-r5.png](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-05/07-player-petite-shorts-r5.png>)

## ร่างแรก

Input1 edit target: [ผู้เล่น R3](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-03/07-player-reference-r3.png>)
Input2 latest proportion reference: [ภาพผู้เขียน](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-05/references/player-body-reference.jpg>)
Input3 normal-Asriel identity/height reference: [ชีต02 ช่องขวาบน](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-02/02-royal-story-cast-r2b.png>)
Result used as next edit input: [draft](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-05/inputs/07-player-r5-draft.png>)

```text
Use case: identity-preserve.
Asset type: UNDERFALL pixel-art PLAYER character-design sheet revision R5, NOT a ready-to-import sprite atlas.
Input images: Image1 is the EDIT TARGET (current six-panel PLAYER R3 sheet). Image2 is the latest authoritative body-proportion/clothing reference (inverted falling person; only use the character, NOT its text, black poster, broken heart or upside-down pose). Image3 is the supporting height/identity reference, the NORMAL CHILD ASRIEL with green sweater in its TOP-RIGHT cell, NOT Asgore, Rin, Mettaton, Flowey or Hyperdeath.
Primary change: Redesign ONLY the PLAYER to a petite, slim, light-built young heroine. Smaller head relative to body than R3, narrow shoulders, small slender torso, clearly readable dark short pants, slim exposed legs tapering naturally from thighs to calves. Cute youthful and modest, nonsexual. Keep tiny overall stature: same standing top-of-head-to-sole HEIGHT as normal child Asriel. Do not enlarge Asriel to match a tall adult player; keep player and Asriel short. About3.5 to4 small heads tall, NOT stocky round two-head chibi proportions. Legs should be longer/slimmer relative to torso than current R3 while overall height remains small.
Clothing: retain the navy/indigo sweater with TWO muted rose-pink horizontal bands and brown short bob identity from Image1. Use the shorts/visible slender bare-leg silhouette and short brown lace-up ankle shoes of Image2; REMOVE gray tights and high boots entirely so they no longer hide the legs. Shirt ends above the shorts hem. Brown bob slightly tousled, gentle closed-eye face in neutral poses. No accessory flower, witch hat, high heels, cleavage, fetish styling, or anatomy emphasis.
Style invariants: every character is crisp limited-palette 8-bit pixel art, clearly visible square pixels, nearest-neighbor enlarged sprite look, hard pixel edges, restrained colors at the same brightness as current sheet. No smooth anime painting, gradients or realistic render. Opaque dark charcoal board, muted thin grid lines.
Composition: retain 2 rows x3 cells. Top FRONT, SIDE, BACK. Bottom IDLE, WALK, SAME HEIGHT. All player views consistent same slender body and outfit. In SAME HEIGHT cell replace only the old yellow SOUL LIGHT panel with player and UNCHANGED normal child Asriel standing SIDE BY SIDE in neutral pose on the exact same baseline and same crown height. Asriel remains cream/white goat child, long ears, green/yellow sweater, brown shorts/shoes, same identity as Image3. No glowing star, battle power, broken heart or Game Over text. Use small simple head-height/foot baseline guide lines to show the matched height, no numeric fabricated real-world measurement. Label the last panel SAME HEIGHT, the two small comparison names PLAYER and ASRIEL.
Text exactly: UNDERFALL - PLAYER / R5; FRONT; SIDE; BACK; IDLE; WALK; SAME HEIGHT.
Constraints: no edits to any existing Asriel/other-character sheets, no new lore, no new poses of injury/falling/death. All bodies fully visible with both shoes, generous gaps, no clipping; avoid wide stocky thigh/torso silhouettes. Landscape1536x1024.
```

## แก้เฉพาะสัดส่วน

เหตุผล: ร่างแรกยังหัว/ไหล่หนา จึงลดหัวและตัวให้เพรียวขึ้น พร้อมให้ช่วงขาเห็นมากขึ้น โดยไม่เพิ่มความสูงรวม
Input edit target: [draft](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-05/inputs/07-player-r5-draft.png>)
Result selected: [R5](<C:/Users/wisu/Desktop/โปรเจคครบรอบ + 2ปี/design/monsters/2026-10-08-revision-05/07-player-petite-shorts-r5.png>)
สัดส่วนเปอร์เซ็นต์ใน prompt เป็นเป้าหมายภาพ ไม่ใช่ผลวัดเชิงกายวิภาคหรือค่า gameplay

```text
Use case: precise-object-edit. Input image1 is EDIT TARGET: six-panel UNDERFALL PLAYER R5 board. Make ONE targeted correction: player proportions are still too stocky/two-head-chibi. Redesign ONLY the PLAYER in every panel to a notably SMALLER HEAD, narrower shoulders/torso, longer slim EXPOSED lower legs, retaining SAME OVERALL standing height and baseline as now. Keep normal child Asriel in bottom-right absolutely unchanged.
For each standing player silhouette target approximately head including hair26% of total height, sweater torso30%, short pants10%, bare slender legs26%, low ankle shoes8% =100%. Current huge40% head must visibly shrink. Narrow shoulders and hips by another15-20%; short pants are clearly separate from shirt. Keep petite young innocent heroine, not adult curves. Legs slender and naturally tapered, longer from shorts to low shoe cuffs. Maintain exact same height as Asriel shown in comparison; don't make girl taller. Keep soft brown bob, navy/indigo sweater with two pink horizontal bands, dark shorts, bare fair legs, low brown ankle shoes, gentle face, all player front/side/back/idle/walk consistent. Same sharp chunky 8-bit pixel rendering, hard pixels, no antialias/painterly anime shading, current palette/saturation, dark board, same2x3 grid, same labels, same-height guides. Both feet fully visible. No gray tights, high boots, glow star, flower pin, oversized bobble head, muscular legs, sexualized framing or new plot. Exact top title remains UNDERFALL - PLAYER / R5. Do not alter Asriel to solve scaling. Landscape1536x1024.
```

