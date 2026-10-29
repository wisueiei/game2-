---
id: 20261009-hooded-stranger-v1-prompts
title: "UNDERFALL — คนสวมหมวก CH00: พรอมต์สไปรต์"
tags: [characters, systems, chapters]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-ch00-runtime, 20261009-hooded-stranger-v1-manifest]
summary: "พรอมต์ built-in imagegen ของคนสวมหมวกสี่ท่า อ้างฟิวมอนสเตอร์เดิม บังหน้าก่อนเฉลย และเก็บ source สำหรับจัดพิกเซล"
status: current-prompt-record
aliases: ["assets/characters/hooded-stranger/v1/hooded-stranger-v1-prompts.md"]
---

# UNDERFALL — คนสวมหมวก CH00: พรอมต์สไปรต์

> Summary: พรอมต์ built-in imagegen ของคนสวมหมวกสี่ท่า อ้างฟิวมอนสเตอร์เดิม บังหน้าก่อนเฉลย และเก็บ source สำหรับจัดพิกเซล

สร้างด้วย built-in imagegen จากฟิวร่างมอนสเตอร์ในบอร์ดที่อนุมัติ ไม่เปลี่ยนดีไซน์เป็นมนุษย์ บังหน้าก่อนเปิดเผยตัว เก็บ source.png ไว้ต้นฉบับ และใช้ pipeline ลดขนาด/สี/alpha ตามที่ผู้เขียนอนุญาตไว้สำหรับเกมพิกเซล

[งานสร้าง CH00](../../../../design/chapters/ch00-runtime.md) — consumer: นำสี่ท่าไปเล่นฉากกะเผลก/พุ่ง/ถีบจริง; [manifest](manifest.json) — data: atlas208×40, ช่อง52×40, pivot26×40, native35px, paletteร่วม24สี, alpha0/255

## Prompt ตรงตัว

```
Use case: stylized-concept
Asset type: UNDERFALL in-game native pixel sprite sheet, four frames, transparent background.
Input image 1 is ONLY the approved character-design reference. Use ONLY the raccoon monster in the bottom-left panel, NOT the other characters and NOT the panel background.
Primary request: generate a tightly consistent 1-row 4-column gameplay sprite sheet for this same short, slim raccoon monster in a brown worn fedora, brown patched travel coat, dark gray scarf, muted red shirt, dark trousers, brown boots and striped raccoon tail. He must remain an animal monster, never a human. The hat brim shadows/obscures the face; do NOT reveal eyes or an identifiable expression in these story sprites.
Four full-body poses in order: (1) standing hunched, apparently injured; (2) limping half-step toward the left, weight on one leg; (3) sudden lunge to the left; (4) side-view kick to the left, one boot extended forward, grounded other foot. Same scale, same character, same clothes throughout. No weapon, no additional characters.
Style: exact crisp 8-bit pixel game art, readable at 32 by 40 logical pixels per frame, hard square edges, 3 to 4 tones per material, limited 24-color muted-but-lively palette, same pixel size across all poses. Slightly warmer and brighter colors than the reference but keep earthy brown, charcoal and dusty red. No smooth painted edges, no gradients, no anti-aliasing, no bloom, no shadows behind the sprites.
Composition: four equally spaced full-body silhouettes in a single horizontal row, uniform baseline, generous transparent padding between figures for extraction. Actual transparent alpha background, no labels, no grid, no title, no borders, no text or watermark. Include all ears, hat, tail and boots within each frame.
```
