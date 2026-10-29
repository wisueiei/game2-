---
id: 20261009-player-r5-v1-prompts
title: "UNDERFALL — ผู้เล่น R5 v1: ที่มาภาพและพรอมต์"
tags: [characters, design]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-player-r5-v1-readme, 20261009-player-r5-v1-manifest, 20261009-characters-r5-readme]
summary: "พรอมต์imagegenสองชีตและสองครั้งแก้ภาพ ก่อนจัดพิกเซลและขาใหม่ด้วยโค้ดที่ผู้เขียนอนุญาต"
status: current-prompt-record
---

# UNDERFALL — ผู้เล่น R5 v1: ที่มาภาพและพรอมต์

> Summary: พรอมต์imagegenสองชีตและสองครั้งแก้ภาพ ก่อนจัดพิกเซลและขาใหม่ด้วยโค้ดที่ผู้เขียนอนุญาต

สร้างด้วย built-in imagegen ไม่ใช่ CLI/API fallback; แหล่งอ้างภาพคือผู้เล่นR5ที่อนุมัติแล้ว ไม่ใช่แอสเรียลที่ยืนเทียบในชีต
เมื่อการแก้ด้วยimagegenยังมีhaze/ก้าวขาซ้ำ ผู้เขียนตอบ “ได้ๆ” ให้ใช้โค้ดเก็บขอบ จัดขนาดพิกเซลและแก้เฟรมเดินโดยคงR5เดิม
ไม่มีการเพิ่มพรอมต์กำหนดตัวตน/เนื้อเรื่องใหม่หลังอนุญาตนี้

## 1. สร้าง walk

```text
Use case: identity-preserve. Asset type: GAME-READY transparent character sprite atlas, NOT concept board or poster.
Input image1 is approved PLAYER R5 identity/proportion reference. Use ONLY the human girl, NEVER the goat Asriel comparison. She is a petite slim youthful heroine, narrow shoulders and torso, relatively small brown bob head, navy/indigo sweater with TWO rose-pink bands, dark short pants, exposed slender bare legs, low brown ankle shoes. No gray stockings, high boots, hat, cape, flower pin or glow star. Neutral closed-eye gentle face as in reference.
Style: precise simple 8-bit PIXEL ART sprite language, visible aligned square pixels, flat limited palette2-3 shades per material, NO smooth painted detail, antialias, gradients, blur, floor shadows or vignettes. Entire output RGBA with TRUE ALPHA0 background; NEVER draw gray checkerboard or black/white backdrop. No text, letters, labels, frames, grid outlines or UI. No other character. Every pose preserves exactly same body proportions, hair, outfit, scale and limb count, both shoes fully inside cell. Consistent sprite-only canvas with generous transparent padding, no overlap between cells. These will be drawn at32 logical pixels standing height, so keep fine details simple and readable. At actual pose level, skinny legs and shorts remain obvious, not stocky bobble-head chibi. Keep face/personality cute and modest.

Atlas composition: EXACTLY3 COLUMNS x4 ROWS, equally sized imaginary cells. Landscape1536x1024 preferred. ROWS top-down: FRONT facing viewer; BACK facing away; LEFT facing screen-left; RIGHT facing screen-right. COLUMNS left-right: standing IDLE feet together; WALK_A left leg forward/right arm slightly forward; WALK_B opposite leg/right leg forward/left arm. Twelve sprites total, EVERY cell occupied exactly once. Keep crown-to-feet standing height and foot baseline IDENTICAL across all12, no camera/perspective changes. From all directions same hairstyle/clothing and band count. Back sprites have NO face. Side views face correct direction. Walking changes actual leg/arm positions, not just facial expression or duplicate idle. No bottle or weapon in these walking frames. Use truly transparent source-ready sprites, not an illustrated character sheet with headers.
```

## 2. สร้าง story

```text
Use case: identity-preserve. Asset type: GAME-READY transparent character sprite atlas, NOT concept board or poster.
Input image1 is approved PLAYER R5 identity/proportion reference. Use ONLY the human girl, NEVER the goat Asriel comparison. She is a petite slim youthful heroine, narrow shoulders and torso, relatively small brown bob head, navy/indigo sweater with TWO rose-pink bands, dark short pants, exposed slender bare legs, low brown ankle shoes. No gray stockings, high boots, hat, cape, flower pin or glow star. Neutral closed-eye gentle face as in reference.
Style: precise simple 8-bit PIXEL ART sprite language, visible aligned square pixels, flat limited palette2-3 shades per material, NO smooth painted detail, antialias, gradients, blur, floor shadows or vignettes. Entire output RGBA with TRUE ALPHA0 background; NEVER draw gray checkerboard or black/white backdrop. No text, letters, labels, frames, grid outlines or UI. No other character. Every pose preserves exactly same body proportions, hair, outfit, scale and limb count, both shoes fully inside cell. Consistent sprite-only canvas with generous transparent padding, no overlap between cells. These will be drawn at32 logical pixels standing height, so keep fine details simple and readable. At actual pose level, skinny legs and shorts remain obvious, not stocky bobble-head chibi. Keep face/personality cute and modest.

Atlas composition: EXACTLY3 COLUMNS x2 ROWS, equally sized imaginary cells, landscape1536x1024 preferred, six sprites total. ROW1 left-to-right: FALL (upright falling, arms slightly lifted, startled without harm); LIE (lying on SIDE after landing, full body and shoes, no injury/gore); SIT (seated propped up by hands). ROW2 left-to-right: RISE (halfway up on one knee); PICKUP (bending at waist/knees and reaching one hand toward small glass bottle near foot); HOLD (standing and gently holding the SAME tiny glass bottle close to waist). Bottle is small blue-violet spirit flame in glass ONLY in last2 cells; no glow expanding past character. Character scale consistent with walking reference, don't enlarge seated head or shrink lying person. All poses fully within cells; no words or floor/shadow. Keep child and ordinary clothing, no anatomy emphasis. Actual actions are distinct and readable at tiny game scale.
```

## 3. แก้ walk

```text
Use case: precise-object-edit / background-extraction. Image1 is EDIT TARGET, a12-frame R5 sprite atlas. Correct ONLY these production defects:
1. Remove EVERY soft brown/purple/black glow, hazy halo, background gradient and ground shadow outside the characters. Background must be TRUE TRANSPARENT alpha0 all the way up to the sharp pixel silhouettes, not black/dark and not checkerboard. Foreground character pixels should be solid alpha255, sharp step edges, no semitransparent outer shading.
2. The THIRD row incorrectly faces RIGHT. Turn all THREE THIRD-ROW sprites to face SCREEN-LEFT, including idle and both walk frames. Row4 remains facing SCREEN-RIGHT. Row2 remains BACK with NO face, row1 remains FRONT.
Preserve all12 existing poses and character identity exactly: slim small R5, brown bob, navy/pink2-striped sweater, dark shorts, bare slim legs, low brown ankle shoes, same heights, scale and stance/body. No new figure or outfit. Keep sprites separated and each fully inside its own cell, no labels/borders. Keep exact3columns by4rows and current positions as much as possible; don't recenter differently between states. No Asriel, hats, capes, bottle, new shadows or glow. Landscape1536x1024. This must be an actual RGBA game sprite sheet whose EMPTY SPACE is alpha0; do not draw a black backdrop.
```

## 4. แก้ story

```text
Use case: background-extraction. Image1 is EDIT TARGET, the six R5 action sprites. REMOVE ONLY every soft brown/purple/blue glow, gradient, ground shadow and dark haze OUTSIDE the six figures/bottles. Preserve the existing sharp pixel-art sprites, all six actual poses, relative placement, proportions, outfit, both shoes and bottle exactly. TRUE alpha0 empty background, foreground solid opaque pixels, hard sprite edges. No black/white/color rectangle, NO checkerboard pattern. No transparent haze between sprites or in corners. No blur/antialias. Exact3columns by2rows: falling,lying,seated / rising,pickup,hold. The tiny blue-violet flame stays INSIDE the glass bottles, no glow expanding into transparent padding. No labels or guide grids. Landscape1536x1024. Preserve same character and poses unchanged, not redraw as a concept board.
```

## งานจัดพิกเซลที่อนุญาต

เก็บผลแก้ทั้งสองชีตในsource/walk-generated.pngและsource/story-generated.png โดยไม่เปลี่ยนต้นฉบับ
ตัดบริเวณตามsourceRectsในmanifest ลบalphaต่ำกว่า230 ลดด้วยnearest-neighborและจับคู่สีพาเลต24สี
คงหัว/หน้า/ผมในเฟรมเดินของทิศเดียวกัน แก้ขาเปล่าเรียวกับรองเท้าเตี้ย ก้าวA/Bและท่าผ่านของprofile ไม่เพิ่มเครื่องแต่งกาย
สคริปต์เป็นแหล่งการจัดพิกเซลทั้งหมด ไม่ใช้generatorNight Witchและไม่เขียนทับเกมเดิม

## Related

- [คู่มือแอสเซต](README.md) — supports: วิธีนำผลที่จัดแล้วไปใช้
- [ข้อมูลเฟรม](manifest.json) — supports: sourceRects, sourceScale และSHA256ต้นทาง
- [แบบR5ที่เลือก](../../../../design/monsters/2026-10-08-revision-05/README.md) — prerequisite: เอกลักษณ์ก่อนทำสไปรต์

