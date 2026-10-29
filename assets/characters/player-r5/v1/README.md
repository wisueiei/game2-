---
id: 20261009-player-r5-v1-readme
title: "UNDERFALL — ผู้เล่น R5: สไปรต์พร้อมนำเข้า v1"
tags: [characters, systems, design]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-player-r5-v1-manifest, 20261009-player-r5-v1-prompts, 20261009-design-current, 20261009-current-layout, 20261009-characters-r5-readme, 20261009-ch00, 20261009-ch01, 20261009-ch00-runtime]
summary: "วิธีใช้18เฟรมผู้เล่นR5ขนาดจริงกับatlas pivot พร้อมสถานะติดตั้งและตรวจการเล่นเฉพาะCH00 โดยเก็บเกมเดิมไว้"
status: installed-ch00
aliases: ["assets/characters/player-r5/v1/README.md"]
---

# UNDERFALL — ผู้เล่น R5: สไปรต์พร้อมนำเข้า v1

> Summary: วิธีใช้18เฟรมผู้เล่นR5ขนาดจริงกับatlas pivot พร้อมสถานะติดตั้งและตรวจการเล่นเฉพาะCH00 โดยเก็บเกมเดิมไว้

ส่งออก PNG ขนาดจริงแล้ว ติดตั้งใน index_new.html เฉพาะCH00และเคยตรวจการเล่นสองแขนงบน geometry เดิมแล้ว รอบเปลี่ยนแมพ R00 เป็น v1b ใช้แพ็กเดิมโดยคงพิกเซล PNG ที่ผู้เขียนรับรอง; การเดิน/collision รอบผังใหม่นี้รอผลตรวจล่าสุดจากใบส่งต่อ runtime เกม index.html เดิมคงไว้

[งานสร้าง CH00](../../../../design/chapters/ch00-runtime.md) — consumer: ติดตั้ง18PNGเดิม แยกผลตรวจ geometry เดิมออกจากรอบ R00 v1b ล่าสุด
ผู้เขียนรับรองชุดเดินรุ่นขาหุบ/สั้น/เรียวแล้วก่อนสั่งงานUI การรับรองภาพไม่เปลี่ยนบท/แผนเมือง/ตอนจบและไม่เท่ากับติดตั้งในเกม
ชุดนี้เป็นผู้เล่นเท่านั้น ตัวละครอื่นต้องทำต่อ ไม่ใช่การส่งแอสเซตครบเกม

## ไฟล์ใช้จริง

| กลุ่ม | จำนวน / ขนาด | ไฟล์ |
|---|---|---|
| เดิน4ทิศ | 12PNG, ทุกเฟรม24×32 | frames/player-r5-{front,back,left,right}-{idle,walk-a,walk-b}.png |
| ท่าฉาก | 6PNG, ทุกเฟรม40×32 | frames/player-r5-{fall,lie,sit,rise,pickup,hold}.png |
| Atlasเดิน | 72×128, 3ช่อง×4แถว | [player-r5-walk-atlas.png](player-r5-walk-atlas.png) |
| Atlasท่าฉาก | 120×64, 3ช่อง×2แถว | [player-r5-story-atlas.png](player-r5-story-atlas.png) |
| ข้อมูลนำเข้า | rect/pivot/animation/aliases | [manifest.json](manifest.json) |

RGBA8จริง, alphaมีแค่0/255, RGBในพิกเซลโปร่งใสเป็น0, ใช้พาเลตร่วม24สี ไม่มีขอบglowหรือcheckerฝังในPNG
ไฟล์preview-board.pngเป็นภาพขยายพร้อมพื้นตรวจภาพ **ไม่ใช่atlasเกม**; source/*.pngเป็นร่างimagegen1536×1024ที่ยังมีhaze **ห้ามใช้แทนผลส่งออก**

## ขนาดและจุดวาด

ใช้native pixelsตรงกับlogical pixels เกม ไม่ขยายให้เต็มcellหรือยืดท่านั่งเป็นความสูง32
canvasเดิน24×32/pivot(12,32); ท่าฉาก40×32/pivot(20,32) เพิ่มพื้นที่ด้านข้างเพื่อไม่ตัดท่านอนหรือขวด
รุ่นpixelRevision=r2-shorter-narrower-legs: ช่วงขาของชุดเดิน9→7px (สั้นลงประมาณ22%ตามกริด), ขาหุบและเรียวขึ้น ส่วนสูงstandingจริง29–30px; canvas32/pivotเดิมคงไว้
หัวและเสื้อไม่เปลี่ยนพิกเซล แต่เลื่อนลง2pxเพื่อคงจุดเท้า ท่าฉากทั้ง6ภาพคงเดิมตามขอบเขตที่สั่ง แอสร่างเด็กยังไม่ส่งออกจึงยังไม่ได้ตรวจภาพคู่ขนาดจริง
สำรองผลก่อนแก้ในhistory/before-leg-adjustment-01.zip แก้เฉพาะชุดเดินในรุ่นนี้ ไม่ติดตั้งในเกมเดิม
วาดตำแหน่งซ้ายบนที่(worldX−pivotX,worldY−pivotY) ปัดพิกัดตอนวาด ไม่ปัดตำแหน่งการเคลื่อนที่สะสม
foot collider12×6ที่offset(−6,−6)เคยตรวจในCH00 geometry เดิมแล้ว การเปลี่ยนผัง R00 v1b ต้องตรวจทางเดิน/ตัวชนรอบใหม่; ค่าเดียวกันยังเป็นค่าตั้งต้นสำหรับพื้นที่/ศึกอนาคต ท่าฉากเป็นcutsceneไม่ใช้กรอบภาพ40×32ขยายตัวชน

```js
// Paths in manifest are relative to this asset-pack directory.
const frameId = manifest.aliases[requestedPose] || requestedPose;
const frame = manifest.frames[frameId];
const [sx, sy, w, h] = frame.rect;
ctx.imageSmoothingEnabled = false;
ctx.drawImage(atlasImages[frame.atlas], sx, sy, w, h,
  Math.round(worldX - frame.pivot[0]), Math.round(worldY - frame.pivot[1]), w, h);
```

ภาพมีสองatlas ต้องโหลดตามframe.atlas ไม่ใช้HERO.w24ตัดท่านอนจากatlas40 และไม่ใช้frame indexข้ามระหว่างatlasเอง
เกมที่โหลดPNGแยกใช้frame.fileกับpivotเดียวกันได้ ผลตรงกับช่องatlasทุกพิกเซล

## ลำดับเฟรม

- เดิน: idle → walk-a → idle → walk-b, ค่าพรีวิว140msต่อเฟรม หยุดเดินใช้idleทิศล่าสุด
- ลงพื้น: fall → lie → sit → rise → front-idle; ช่วงเวลาจริงคุมตามบท/scene state ไม่ใช้ค่าพรีวิวแทนจังหวะข้อความ
- หยิบขวด: pickup → hold → front-idle; ขวดฝังในpickup/holdแล้ว อย่าวาดขวดซ้ำในมือ ส่วนขวดเป็นไอเทม/การติดตามของจริงคุมที่scene
- aliasesในmanifestรองรับfront/back/left/right-walk→walk-a, -walk2→walk-b และbottle-pickup→pickupตามชื่อใบงานเดิม

fallเป็นท่าพื้นฐานเดียว ไม่ใช่อนิเมชันตกหลายframe; lie/sit/riseเป็นkeyposesสำหรับเรียง/เลื่อนตามscene ไม่อ้างว่ามีin-betweenทุกท่า
ไม่เปลี่ยนรองเท้าน้ำตาลอัตโนมัติเมื่อรับรองเท้าขาวจากทอเรียล เพราะการสวมยังไม่ยืนยัน
???ยังไม่เผยร่าง ไม่เพิ่มsprite/portraitชิกุอีกเส้นเวลาในสองCHนี้

## เปิดพรีวิว

จากโฟลเดอร์โปรเจกต์:

```powershell
node serve.cjs
```

เปิด http://127.0.0.1:4173/assets/characters/player-r5/v1/preview.html ผ่านHTTP ไม่ใช่file://
พรีวิวเลือกทิศ/เดินวน/หยุด/เฟรมถัดไป ท่าฉาก พื้นมืด/สว่าง/รูน/ตาราง และตำแหน่งศึกได้
คลิกcanvasแล้วลองWASD/ลูกศร มีกรอบชนตัวอย่างแต่ไม่มีระบบcollisionจริง,ศึก,SAVEหรือเควส
ป้ายชื่อและข้อความThaiอยู่DOM ไม่ฝังในPNGและไม่ใช้Canvasเป็นบทเกม

## ทำซ้ำและตรวจ

ต้องมีPython+Pillow; ต้นทางเก็บในแพ็กแล้ว สคริปต์ไม่เรียกAPIและไม่รันgeneratorNight Witch

```powershell
python tools/make-player-r5-sprites.py
python tools/check-player-r5-sprites.py
node --check assets/characters/player-r5/v1/preview.js
# หลังเปิดพรีวิวในPlaywright CLI
npx --yes --package @playwright/cli playwright-cli --session underfall-r5 open http://127.0.0.1:4173/assets/characters/player-r5/v1/preview.html
npx --yes --package @playwright/cli playwright-cli --session underfall-r5 run-code --filename tools/check-player-r5-preview.cjs
```

ในเครื่องที่ไม่มีnpxบนPATHให้ใช้C:\Program Files\nodejs\npx.cmd หรือNodeรันplaywright-cli.jsที่ติดตั้งแล้ว (ไม่ต้องติดตั้งซ้ำเพื่อรัน generator)
สคริปต์makeเขียนทับเฉพาะผลส่งออกที่ตัวเองสร้างในแพ็กv1เมื่อทำซ้ำ ไม่แตะsource/*.png/ชีตR5/เกมเก่า
แก้pixel cleanupที่สคริปต์แล้วสร้างใหม่ ไม่แก้ผลPNGอย่างเดียว เพราะทำซ้ำจะเสียการแก้

ผลตรวจ9ตุลาคม2026:

- PASS18เฟรมnative+2atlas, ขนาด/alpha/palette/rect/pivot/source hashes, ก้าวA/Bไม่ซ้ำ และหัว/หน้าไม่กระโดดระหว่างเฟรมทิศเดียวกัน
- PASSพรีวิวChromium: เดิน4ทิศครบ3เฟรมต่อทิศ, pause/step, ปุ่มdเคลื่อนที่, เลือก6ท่า, ชุดlanding/collect-bottleจบที่front-idle
- พรีวิว375pxมี18ภาพและไม่ล้นแนวนอน; เป็นbrowser simulation ไม่ใช่เครื่องโทรศัพท์จริง
- ภาพตรวจมืด/สว่างอยู่output/playwright/player-r5-*.png; sourceต้นทางไม่เปลี่ยน
- รายการพรีวิวข้างบนไม่ใช่การทดสอบchapter; ผลgameplay/collisionสองแขนงที่มีเป็นCH00 geometry เดิม การเปลี่ยนแมพR00 v1bรอผลตรวจใหม่ตามใบส่งต่อruntime ไม่เรียกCH01หรือทั้งซีซันว่าเสร็จ

## งานถัดไป

ผู้เล่นรับรองและติดตั้งในCH00แล้ว คนสวมหมวกสี่ท่าก็สร้างสำหรับCH00แล้ว งานถัดไปคือทอเรียล/นักแสดงในCH01ตามบทที่ได้รับมอบหมาย ไม่ย้อนสร้างผู้เล่นใหม่เอง
ตัวมอนสเตอร์อยู่กับที่ทำเฉพาะท่าศึก/ปฏิกิริยา ไม่สร้างwalk4ทิศให้ทุกตัวโดยไม่มีฉากใช้งาน
แผนนี้ไม่เปิดเผยหน้าฟิวก่อนเฉลย ไม่มอบหนังสือก่อนแซน และไม่แก้บทเพิ่มเพื่อใช้ภาพ

## Related

- [ข้อมูลเฟรม](manifest.json) — supports: ตัวเลขนำเข้าและaliases
- [ที่มาภาพ/พรอมต์](player-r5-v1-prompts.md) — supports: ที่มาร่างAIและขั้นตอนจัดพิกเซลที่ได้รับอนุญาต
- [แบบปัจจุบัน](../../../../design-current.md) — prerequisite: ตัวตน/การเปิดเผยและสถานะงานทั้งเกม
- [ผังค่าตั้งต้น](../../../../design/chapters/current-layout.json) — prerequisite: หน่วยและกรอบชนที่ยังต้องทดสอบ
- [ชีตR5](../../../../design/monsters/2026-10-08-revision-05/README.md) — prerequisite: เอกลักษณ์ผู้เล่น
- [CH00](../../../../ch00.md) / [CH01](../../../../ch01.md) — prerequisite: ฉากที่ใช้ท่า ไม่ใช้พรีวิวสร้างเนื้อเรื่องเอง
