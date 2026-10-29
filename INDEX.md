---
id: 20261009-index
title: "UNDERFALL — ดัชนีแบบปัจจุบัน"
tags: [index, design]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-portraits-v1-expression-guide, 20261009-portraits-v1-prompts, 20261009-portraits-v1-readme, 20261009-maps-v2-level-layout, 20261009-maps-v2-prompts, 20261009-maps-v2-readme, 20261009-maps-index-readme, 20261009-characters-r5-prompts, 20261009-characters-r5-readme, 20261009-plot-outline, 20261009-art-direction, 20261009-ch00, 20261009-ch01, 20261009-claude, 20261009-story, 20261009-design-current, 20261009-layout-contract, 20261009-design-topic, 20261009-character-topic, 20261009-map-topic, 20261009-portrait-topic, 20261009-chapter-layout-topic, 20261009-design-validation, 20261009-portraits-v1-manifest, 20261009-portraits-v1-portrait-catalog, 20261009-maps-v2-manifest, 20261009-characters-r5-manifest, 20261009-current-layout, 20261009-design-catalog, 20261009-night-witch-live-readme, 20261009-maps-v1-map-notes, 20261009-maps-v1-prompts, 20261009-maps-v1-readme, 20261009-characters-r1-prompts, 20261009-characters-r1-readme, 20261009-characters-r2-prompts, 20261009-characters-r2-readme, 20261009-characters-r3-prompts, 20261009-characters-r3-readme, 20261009-characters-r4-prompts, 20261009-characters-r4-readme, 20261009-art-prompts-pixel-v3, 20261009-art-prompts, 20261009-player-r5-v1-readme, 20261009-player-r5-v1-prompts, 20261009-player-r5-v1-manifest, 20261009-interface-topic, 20261009-interface-v1-handoff, 20261009-undertale-interface-research, 20261009-interface-v1-validation, 20261009-interface-v1-screen-catalog, 20261009-ch00-runtime, 20261009-hooded-stranger-v1-prompts, 20261009-hooded-stranger-v1-manifest, 20261009-r00-v1-runtime-manifest, 20261010-r00-surface-guide, 20261010-r00-surface-manifest]
summary: "ทางเข้าเลือกเอกสารตามบทบาท/เวอร์ชันโดยไม่ย้อนอ่านแชตและไม่ใช้ประวัติทับแบบล่าสุด"
status: current-index
aliases: ["INDEX.md"]
design_baseline: UF-DESIGN-2026-10-09
---

# UNDERFALL — ดัชนีแบบปัจจุบัน

> Summary: ทางเข้าเลือกเอกสารตามบทบาท/เวอร์ชันโดยไม่ย้อนอ่านแชตและไม่ใช้ประวัติทับแบบล่าสุด

รุ่นอ้างอิง UF-DESIGN-2026-10-09 · เริ่มที่ [design-current.md](design-current.md)
ลำดับสั้น: แบบปัจจุบัน → CLAUDE → story/โครงเรื่อง → CHที่รับงาน → layout-contract/current-layout → ชีตที่ถูกเลือก
สถานะ: **CH00รอบล่าสุดกำลังสร้างฉาก2Dแบ่งชั้นตามผัง R00 v1b และรอ build/static/browser ใหม่; static36ข้อของภาพร่าง PNG เต็มกับผลเล่นบน geometry เดิมเป็นหลักฐานย้อนหลัง ส่วนCH01และพื้นที่อนาคตยังเป็นงานออกแบบ**

## วิธีใช้และอัปเดต

- เปิดเอกสาร1–3หัวข้อที่เกี่ยวกับงานก่อน ไม่สแกนทุกพรอมต์ประวัติเป็นคำสั่ง
- story.mdคุมบทพูด โครงเรื่อง.mdคุมcanon design-currentคุมเวอร์ชันที่เลือก current-layoutคุมค่าตั้งต้นการวางผัง; เมื่อขัดกันให้แก้ไฟล์เจ้าของหัวข้อ ไม่เดาใหม่เอง
- ความคิดใหม่ที่ยังไม่ยืนยันต้องแยกเป็นข้อเสนอ ไม่แต่งเหตุการณ์คู่รัก/SS2/ทางฆ่าทอเรียล/กฎบ้านVoidเพิ่ม
- คงชื่อไฟล์เดิมที่ผู้เขียนใช้ (Thai filenames, CLAUDE.md, README.mdและโฟลเดอร์รุ่น) เป็นข้อยกเว้น naming template ของKB; stable IDในregistryไม่เปลี่ยนเมื่อแก้เนื้อหา aliasesบันทึกชื่อจริง ไม่ย้าย/ลบเพื่อให้เหมือนtemplate
- createdในfrontmatterคือวันที่ลงทะเบียนเป็นชุดKBนี้ วันที่สร้างภาพ/ประวัติเดิมอ่านในbody updatedเปลี่ยนเมื่อแก้; idอยู่ถาวร
- เพิ่ม/ลบ/เปลี่ยนscopeเอกสารต้องปรับregistryและ_topicของหัวข้อในงานเดียวกัน ใช้controlled tagsด้านล่าง
- relatedคุมเอกสาร/ข้อมูลที่ลงทะเบียน; PNG/JPGและsnapshotZIPเป็นassetsไม่ใช่notes ให้ตรวจผ่านmanifest ไม่ต้องยัด111ภาพลงregistry
- ไม่มีnoteที่ใช้งานนอกregistry; rawJSON/TXTเป็นข้อมูลประกอบที่มีIDและถูกลงทะเบียนด้วย ไม่ใส่YAMLลงJSON
- Historical promptsเก็บคำสั่งที่ใช้จริงในอดีต ห้ามนำไปสร้างR1/R2ที่ไม่เลือกแทนแบบปัจจุบัน; ภาพบางชีตรุ่นเก่าถูกเลือกใช้ต่อผ่านR5indexได้
- การแก้เอกสารไม่แปลว่าexportสไปรต์/วางcollision/เล่นจบแล้ว อย่าเปลี่ยนruntimeValidatedเป็นtrueจากการตรวจJSON
- งานนี้เก็บสำเนา33ไฟล์ก่อนซิงค์ที่ [snapshot](design/archives/2026-10-09-before-design-sync.zip); ZIPไม่เป็นคำสั่งปัจจุบัน

## Controlled tags

`design`, `story`, `characters`, `maps`, `portraits`, `chapters`, `systems`, `legacy`, `index`

## Registry — เอกสารใช้งานปัจจุบัน

- `20261010-r00-surface-guide` — **UNDERFALL — พื้นและดอกไม้ R00 รุ่นเก็บรายละเอียด** — [assets/maps/r00-surfaces-v2/README.md](assets/maps/r00-surfaces-v2/README.md) — หย่อมพื้นสีเงียบและดอกไม้แยกจากภาพv1bสำหรับฉากแบ่งเลเยอร์ โดยไม่เปลี่ยนผังหรือภาพต้นฉบับ (current-runtime-assets)
- `20261010-r00-surface-manifest` — **ข้อมูลพื้นและดอกไม้ R00 รุ่นเก็บรายละเอียด** — [assets/maps/r00-surfaces-v2/manifest.json](assets/maps/r00-surfaces-v2/manifest.json) — rectหย่อมพื้นR00สีเงียบและดอกไม้จากv1b พร้อมแหล่งและขอบเขตการปรับโดยไม่เปลี่ยนผัง (current-runtime-data)

- `20261009-ch00-runtime` — **UNDERFALL — งานสร้าง CH00 ใน index_new.html** — [design/chapters/ch00-runtime.md](design/chapters/ch00-runtime.md) — ขอบเขต CH00 และการใช้แผนที่ R00 v1b เป็นโลกเดียว พร้อมแยกผลตรวจ geometry เดิมจากการตรวจ v1 รอบล่าสุด (implemented-ch00-layered-browser-tested)
- `20261009-hooded-stranger-v1-prompts` — **UNDERFALL — คนสวมหมวก CH00: พรอมต์สไปรต์** — [assets/characters/hooded-stranger/v1/hooded-stranger-v1-prompts.md](assets/characters/hooded-stranger/v1/hooded-stranger-v1-prompts.md) — พรอมต์ built-in imagegen ของคนสวมหมวกสี่ท่า อ้างฟิวมอนสเตอร์เดิม บังหน้าก่อนเฉลย และเก็บ source สำหรับจัดพิกเซล (current-prompt-record)
- `20261009-hooded-stranger-v1-manifest` — **ข้อมูลเฟรมคนสวมหมวก CH00** — [assets/characters/hooded-stranger/v1/manifest.json](assets/characters/hooded-stranger/v1/manifest.json) — atlasคนสวมหมวกสี่ท่า52×40 pivot26×40 alpha0/255 พร้อมแหล่งต้นฉบับและสถานะติดตั้งเฉพาะCH00 (installed-ch00)

- `20261009-interface-topic` — **UNDERFALL — ดัชนีอินเทอร์เฟซ** — [design/interface/_topic.md](design/interface/_topic.md) — ทางเข้าแบบ56หน้าอินเทอร์เฟซ พรีวิว ภาพรวมและข้อจำกัดก่อนเชื่อมเกมจริง (current-index)
- `20261009-interface-v1-handoff` — **UNDERFALL — ใบส่งต่ออินเทอร์เฟซ v1** — [design/interface/v1/interface-handoff.md](design/interface/v1/interface-handoff.md) — แบบ56หน้าอินเทอร์เฟซพร้อมtokens ส่วนประกอบ พฤติกรรม และข้อห้ามเมื่อต่อเข้ากับเกมจริง (interactive-design-not-game)
- `20261009-undertale-interface-research` — **UNDERFALL — ข้อมูลเมนู Undertale ที่ใช้อ้างแบบ** — [design/interface/v1/undertale-interface-research.md](design/interface/v1/undertale-interface-research.md) — แยกปุ่มและหน้าของUndertaleจากการดัดแปลงUNDERFALL พร้อมแหล่งอ้างอิงและข้อจำกัดการนับหน้า (research-reference)
- `20261009-interface-v1-validation` — **UNDERFALL — ผลตรวจอินเทอร์เฟซ v1** — [design/interface/v1/interface-validation.md](design/interface/v1/interface-validation.md) — ผลตรวจ56หน้าdesktop/mobileและการโต้ตอบข้อมูลพรีวิว ไม่แทนการตรวจเกมจริง (preview-validated-not-game)
- `20261009-player-r5-v1-readme` — **UNDERFALL — ผู้เล่น R5: สไปรต์พร้อมนำเข้า v1** — [assets/characters/player-r5/v1/README.md](assets/characters/player-r5/v1/README.md) — วิธีใช้18เฟรมผู้เล่นR5ขนาดจริงกับatlas pivot พร้อมสถานะติดตั้งและตรวจการเล่นเฉพาะCH00 โดยเก็บเกมเดิมไว้ (installed-ch00)
- `20261009-player-r5-v1-prompts` — **UNDERFALL — ผู้เล่น R5 v1: ที่มาภาพและพรอมต์** — [assets/characters/player-r5/v1/player-r5-v1-prompts.md](assets/characters/player-r5/v1/player-r5-v1-prompts.md) — พรอมต์imagegenสองชีตและสองครั้งแก้ภาพ ก่อนจัดพิกเซลและขาใหม่ด้วยโค้ดที่ผู้เขียนอนุญาต (current-prompt-record)
- `20261009-portraits-v1-expression-guide` — **UNDERFALL — ทะเบียนสีหน้าและข้อจำกัดรายตัว** — [design/dialogue-portraits/2026-10-08-v1/EXPRESSION_GUIDE.md](design/dialogue-portraits/2026-10-08-v1/EXPRESSION_GUIDE.md) — ปัจจุบัน: UNDERFALL — ทะเบียนสีหน้าและข้อจำกัดรายตัว; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (current-design)
- `20261009-portraits-v1-prompts` — **UNDERFALL — Dialogue Portraits v1: prompts** — [design/dialogue-portraits/2026-10-08-v1/PROMPTS.md](design/dialogue-portraits/2026-10-08-v1/PROMPTS.md) — ปัจจุบัน: UNDERFALL — Dialogue Portraits v1: prompts; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (current-prompt-record)
- `20261009-portraits-v1-readme` — **UNDERFALL — ใบหน้าในกล่องคำพูด v1** — [design/dialogue-portraits/2026-10-08-v1/README.md](design/dialogue-portraits/2026-10-08-v1/README.md) — ปัจจุบัน: UNDERFALL — ใบหน้าในกล่องคำพูด v1; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (current-design)
- `20261009-maps-v1-map-notes` — **UNDERFALL — บันทึกพื้นที่ประกอบภาพแมพ v1** — [design/maps/2026-10-08-v1/MAP_NOTES.md](design/maps/2026-10-08-v1/MAP_NOTES.md) — บันทึกอ่านภาพแมพ v1 ที่เลือกล่าสุด โดย R00 v1b เป็นแหล่งภาพ CH00 และพิกัด/ตัวชนต้องตรวจใน runtime รอบใหม่ (current-design)
- `20261009-maps-v1-readme` — **UNDERFALL — ชุดภาพร่างแมพ ป่าถึงปราสาทราชา** — [design/maps/2026-10-08-v1/README.md](design/maps/2026-10-08-v1/README.md) — ภาพแมพ v1 ที่ผู้เขียนเลือกล่าสุด โดย R00 ใช้ฉบับ v1b เป็นแหล่งภาพ CH00 และเก็บขอบเขตพล็อตตามแบบปัจจุบัน (current-design)
- `20261009-maps-v2-level-layout` — **UNDERFALL — แผนพื้นที่เดิน ประตูปริศนา และอาคารเข้าได้ v2** — [design/maps/2026-10-08-v2/LEVEL_LAYOUT.md](design/maps/2026-10-08-v2/LEVEL_LAYOUT.md) — ปัจจุบัน: UNDERFALL — แผนพื้นที่เดิน ประตูปริศนา และอาคารเข้าได้ v2; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (current-design)
- `20261009-maps-v2-prompts` — **UNDERFALL — ชุด prompt ภาพแมพ v2** — [design/maps/2026-10-08-v2/PROMPTS.md](design/maps/2026-10-08-v2/PROMPTS.md) — ปัจจุบัน: UNDERFALL — ชุด prompt ภาพแมพ v2; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (current-prompt-record)
- `20261009-maps-v2-readme` — **UNDERFALL — แมพ v2: ทางกว้าง ลานชม และอาคารเข้าได้** — [design/maps/2026-10-08-v2/README.md](design/maps/2026-10-08-v2/README.md) — ปัจจุบัน: UNDERFALL — แมพ v2: ทางกว้าง ลานชม และอาคารเข้าได้; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (current-design)
- `20261009-maps-index-readme` — **UNDERFALL — ชุดออกแบบแมพ** — [design/maps/README.md](design/maps/README.md) — ปัจจุบัน: UNDERFALL — ชุดออกแบบแมพ; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (current-design)
- `20261009-characters-r5-prompts` — **UNDERFALL — ผู้เล่น R5: prompt และ inputs** — [design/monsters/2026-10-08-revision-05/PROMPTS.md](design/monsters/2026-10-08-revision-05/PROMPTS.md) — ปัจจุบัน: UNDERFALL — ผู้เล่น R5: prompt และ inputs; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (current-prompt-record)
- `20261009-characters-r5-readme` — **UNDERFALL — ชุดงานภาพปัจจุบัน R5** — [design/monsters/2026-10-08-revision-05/README.md](design/monsters/2026-10-08-revision-05/README.md) — ปัจจุบัน: UNDERFALL — ชุดงานภาพปัจจุบัน R5; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (current-design)
- `20261009-plot-outline` — **UNDERFALL — โครงเรื่อง** — [โครงเรื่อง.md](โครงเรื่อง.md) — ภาพรวมเส้นเวลา ตัวตน ปม ความสัมพันธ์และตอนจบที่ยืนยัน แยกช่องว่างและแบบภาพออกจากcanon (current-canon)
- `20261009-art-direction` — **UNDERFALL — ทิศทางภาพปัจจุบัน** — [ART-DIRECTION.md](ART-DIRECTION.md) — ทิศทางภาพ8-bitปัจจุบัน ตัวละครR5/ร่างR4 แมพv2 portraitและสเกล พร้อมประวัติที่ไม่ใช้ส่งสร้าง (current-design)
- `20261009-ch00` — **UNDERFALL — CH00 · กลับมาที่ป่าอีกครั้ง** — [ch00.md](ch00.md) — ใบงานCH00-r2เริ่มตกครบรอบใหม่ถึงเข้ารอยแยก ใช้ผังล่าสุดและหยุดก่อนตำนาน (current-worksheet)
- `20261009-ch01` — **UNDERFALL — CH01 · ใครบางคนรออยู่ในรูน** — [ch01.md](ch01.md) — ใบงานCH01-r4ตกในมิติจนออกประตูรูน ใช้ภาพ/ผังล่าสุดและศึกทอเรียลไว้ชีวิต (current-worksheet)
- `20261009-claude` — **CLAUDE.md** — [CLAUDE.md](CLAUDE.md) — กติกางานร่วมกัน ฐานindex.htmlจริง และแหล่งแบบล่าสุดที่ต้องอ่านก่อนสร้างCHใหม่ (current-guide)
- `20261009-story` — **UNDERFALL — บทและเนื้อเรื่อง** — [story.md](story.md) — ต้นฉบับบท/คำพูดและกติกาสองCH โดยอ้างชุดภาพและพิกัดปัจจุบันแต่ยังไม่สร้างเกม (current-script)
- `20261009-design-current` — **UNDERFALL — แบบปัจจุบันที่ใช้ร่วมกัน** — [design-current.md](design-current.md) — ระบุแหล่งตัวละคร แมพ สีหน้า เนื้อเรื่อง และใบงาน CH ที่เป็นปัจจุบัน พร้อมแยกข้อยืนยันจากค่าตั้งต้นและงานที่ยังไม่สร้าง (current-design)
- `20261009-layout-contract` — **UNDERFALL — สัญญาขนาดและพิกัด CH00–CH01** — [design/chapters/layout-contract.md](design/chapters/layout-contract.md) — ขนาดห้อง จุดวางองค์ประกอบ สเกลตัวละคร กล่องคำพูดและศึกที่ใช้ส่งสร้าง โดยคงบท ลายปริศนา และ gate เดิม (current-design)
- `20261009-design-topic` — **UNDERFALL — แผนที่เอกสารออกแบบ** — [design/_topic.md](design/_topic.md) — ทางเข้าอ่านโมเดล แมพ portraitและใบงานร่วมโดยแยกชุดปัจจุบันออกจากประวัติ (current-index)
- `20261009-character-topic` — **UNDERFALL — ดัชนีตัวละคร** — [design/monsters/_topic.md](design/monsters/_topic.md) — เลือกผู้เล่นR5 ร่างพิเศษR4 และตัวอื่นR2จากดัชนีเดียว พร้อมที่มารุ่นก่อน (current-index)
- `20261009-map-topic` — **UNDERFALL — ดัชนีแมพ** — [design/maps/_topic.md](design/maps/_topic.md) — เลือกภาพแมพ v1 ล่าสุดและผัง R00 v1b ของ CH00 พร้อมแยก v2 และผลตรวจ geometry เดิมเป็นที่มา (current-index)
- `20261009-portrait-topic` — **UNDERFALL — ดัชนีportrait** — [design/dialogue-portraits/_topic.md](design/dialogue-portraits/_topic.md) — เลือกชีตสีหน้าและทะเบียน55รายการ พร้อมเงื่อนไขเปิดภาพปริศนา (current-index)
- `20261009-chapter-layout-topic` — **UNDERFALL — ดัชนีขนาดใบงาน** — [design/chapters/_topic.md](design/chapters/_topic.md) — เลือกJSONพิกัดและสัญญาสเกลที่ทั้งCH00–CH01ใช้อ้างร่วมกัน (current-index)
- `20261009-design-validation` — **UNDERFALL — ผลตรวจการซิงค์แบบ** — [design/validation.md](design/validation.md) — ผลตรวจเอกสาร ลิงก์ พิกัด JSON และการคงบท/ภาพ/เกมเดิม ไม่แทนการทดสอบเดินในเกม (current-validation)
- `20261009-index` — **UNDERFALL — ดัชนีแบบปัจจุบัน** — [INDEX.md](INDEX.md) — ทางเข้าเลือกเอกสารตามบทบาท/เวอร์ชันโดยไม่ย้อนอ่านแชตและไม่ใช้ประวัติทับแบบล่าสุด (current-index)

## Registry — ข้อมูลประกอบ

- `20261009-r00-v1-runtime-manifest` — **ข้อมูลภาพโลก R00 v1b** — [assets/maps/r00-v1/manifest.json](assets/maps/r00-v1/manifest.json) — ภาพพื้นโลกR00จากv1bและสไปรต์แยกจากต้นฉบับ พร้อมmaskcleanupและหลักฐานพิกเซลนอกmaskไม่เปลี่ยน (prepared-reference-faithful)
- `20261009-interface-v1-screen-catalog` — **ทะเบียนหน้าอินเทอร์เฟซ v1** — [design/interface/v1/screen-catalog.json](design/interface/v1/screen-catalog.json) — ทะเบียน56หน้าและสถานะอินเทอร์เฟซพร้อมขอบเขตปัจจุบัน/ข้อเสนอ/อนาคต (interactive-design-not-game)
- `20261009-player-r5-v1-manifest` — **ข้อมูลเฟรมผู้เล่นR5 v1** — [assets/characters/player-r5/v1/manifest.json](assets/characters/player-r5/v1/manifest.json) — เฟรมผู้เล่นR5ขนาดจริง พิกัดatlas pivotและลำดับแอนิเมชัน ไม่เปลี่ยนเกมเดิม (installed-ch00)
- `20261009-portraits-v1-manifest` — **design/dialogue-portraits/2026-10-08-v1/manifest.json** — [design/dialogue-portraits/2026-10-08-v1/manifest.json](design/dialogue-portraits/2026-10-08-v1/manifest.json) — ปัจจุบัน: manifest.json; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (current-data)
- `20261009-portraits-v1-portrait-catalog` — **design/dialogue-portraits/2026-10-08-v1/portrait-catalog.json** — [design/dialogue-portraits/2026-10-08-v1/portrait-catalog.json](design/dialogue-portraits/2026-10-08-v1/portrait-catalog.json) — ปัจจุบัน: portrait-catalog.json; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (current-data)
- `20261009-maps-v2-manifest` — **design/maps/2026-10-08-v2/manifest.json** — [design/maps/2026-10-08-v2/manifest.json](design/maps/2026-10-08-v2/manifest.json) — ปัจจุบัน: manifest.json; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (current-data)
- `20261009-characters-r5-manifest` — **design/monsters/2026-10-08-revision-05/manifest.json** — [design/monsters/2026-10-08-revision-05/manifest.json](design/monsters/2026-10-08-revision-05/manifest.json) — ปัจจุบัน: manifest.json; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (current-data)
- `20261009-current-layout` — **ข้อมูลขนาดและพิกัดCH00–CH01** — [design/chapters/current-layout.json](design/chapters/current-layout.json) — ข้อมูลห้อง anchors สเกล UIและSAVEของUF-LAYOUT-2026-10-09 เป็นค่าตั้งต้นที่ยังไม่ทดสอบจริง (current-data)
- `20261009-design-catalog` — **ทะเบียนชุดออกแบบปัจจุบัน** — [design-catalog.json](design-catalog.json) — ทะเบียนเลือกเวอร์ชันและแหล่งภาพ/บท/พิกัด พร้อมขอบเขตสร้างจริงCH00และงานที่ยังไม่ติดตั้ง (current-data)

## Registry — ประวัติ/แอสเซตเกมเดิม

- `20261009-night-witch-live-readme` — **Night Witch — 24×32 sprite frames** — [assets/sprites/night-witch/README.md](assets/sprites/night-witch/README.md) — สไปรต์Night Witchที่เกมเดิมใช้จริง เก็บข้อมูลเทคนิคแต่ไม่ถือเป็นแบบผู้เล่นR5 (legacy-live)
- `20261009-maps-v1-prompts` — **UNDERFALL — พรอมต์วาดแมพชุด v1** — [design/maps/2026-10-08-v1/PROMPTS.md](design/maps/2026-10-08-v1/PROMPTS.md) — ประวัติ: UNDERFALL — พรอมต์วาดแมพชุด v1; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (historical-record)
- `20261009-characters-r1-prompts` — **UNDERFALL — พรอมต์ชุดออกแบบมอนสเตอร์ 2026-10-08** — [design/monsters/2026-10-08/PROMPTS.md](design/monsters/2026-10-08/PROMPTS.md) — ประวัติ: UNDERFALL — พรอมต์ชุดออกแบบมอนสเตอร์ 2026-10-08; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (historical-record)
- `20261009-characters-r1-readme` — **UNDERFALL — ภาพร่างมอนสเตอร์ ชุด 2026-10-08** — [design/monsters/2026-10-08/README.md](design/monsters/2026-10-08/README.md) — ประวัติ: UNDERFALL — ภาพร่างมอนสเตอร์ ชุด 2026-10-08; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (historical-record)
- `20261009-characters-r2-prompts` — **UNDERFALL — พรอมต์ R2** — [design/monsters/2026-10-08-revision-02/PROMPTS.md](design/monsters/2026-10-08-revision-02/PROMPTS.md) — ประวัติ: UNDERFALL — พรอมต์ R2; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (historical-record)
- `20261009-characters-r2-readme` — **UNDERFALL — งานภาพ R2 (เก็บเป็นประวัติ)** — [design/monsters/2026-10-08-revision-02/README.md](design/monsters/2026-10-08-revision-02/README.md) — ประวัติ: UNDERFALL — งานภาพ R2 (เก็บเป็นประวัติ); อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (historical-record)
- `20261009-characters-r3-prompts` — **UNDERFALL — พรอมต์ R3** — [design/monsters/2026-10-08-revision-03/PROMPTS.md](design/monsters/2026-10-08-revision-03/PROMPTS.md) — ประวัติ: UNDERFALL — พรอมต์ R3; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (historical-record)
- `20261009-characters-r3-readme` — **UNDERFALL — ชุดงานภาพ R3 (เก็บเป็นประวัติ)** — [design/monsters/2026-10-08-revision-03/README.md](design/monsters/2026-10-08-revision-03/README.md) — ประวัติ: UNDERFALL — ชุดงานภาพ R3 (เก็บเป็นประวัติ); อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (historical-record)
- `20261009-characters-r4-prompts` — **UNDERFALL — พรอมต์แก้แอสเรียล R4** — [design/monsters/2026-10-08-revision-04/PROMPTS.md](design/monsters/2026-10-08-revision-04/PROMPTS.md) — ประวัติ: UNDERFALL — พรอมต์แก้แอสเรียล R4; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (historical-record)
- `20261009-characters-r4-readme` — **UNDERFALL — ชุดงานภาพ R4 (เก็บเป็นประวัติ)** — [design/monsters/2026-10-08-revision-04/README.md](design/monsters/2026-10-08-revision-04/README.md) — ประวัติ: UNDERFALL — ชุดงานภาพ R4 (เก็บเป็นประวัติ); อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime (historical-record)
- `20261009-art-prompts-pixel-v3` — **art-prompts-pixel-v3.txt** — [art-prompts-pixel-v3.txt](art-prompts-pixel-v3.txt) — พรอมต์ประวัติของpipelineเก่า ไม่ใช้แทนคำสั่งภาพปัจจุบัน (historical-prompt)
- `20261009-art-prompts` — **art-prompts.txt** — [art-prompts.txt](art-prompts.txt) — พรอมต์ประวัติของpipelineเก่า ไม่ใช้แทนคำสั่งภาพปัจจุบัน (historical-prompt)

## Topic maps

- [งานออกแบบ](design/_topic.md) — เชื่อมบทกับภาพและใบงาน
- [ตัวละคร](design/monsters/_topic.md) — รายการรุ่นที่เลือก/ประวัติ
- [แมพ](design/maps/_topic.md) — ภาพกับกติกาพื้นเดิน
- [portrait](design/dialogue-portraits/_topic.md) — สีหน้า/เวลาเปิดร่าง
- [ขนาดใบงาน](design/chapters/_topic.md) — พิกัด/UI/SAVEร่วม

## โค้ดและภาพที่ไม่ได้เปลี่ยนในรอบเอกสาร

index.htmlเป็นเกมเก่าจริง index_v1_backup.htmlเป็นสำรอง game.js/style.cssเป็นorphaned rewrite serve.cjsและตัวสร้างNight Witchคงเดิม
กลุ่มโค้ดและภาพเดิมที่บันทึกhashก่อนงานเอกสารคงแยกเป็นฐานเดิม; ตอนนี้มีindex_new.htmlสำหรับCH00และแพ็กคนสวมหมวกเพิ่มแล้ว โดยไม่แก้เกมเดิม/บท/PNGผู้เล่นที่รับรอง ดูใบส่งต่อruntimeเพื่อแยกผลตรวจจริงจากภาพออกแบบ
อ่าน [ผลตรวจ](design/validation.md)ก่อนอ้างว่าอะไรผ่านแล้ว
