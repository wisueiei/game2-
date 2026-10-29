---
id: 20261009-map-topic
title: "UNDERFALL — ดัชนีแมพ"
tags: [maps, index]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-layout-contract, 20261009-current-layout, 20261009-maps-v1-map-notes, 20261009-maps-v1-prompts, 20261009-maps-v1-readme, 20261009-maps-v2-level-layout, 20261009-maps-v2-manifest, 20261009-maps-v2-prompts, 20261009-maps-v2-readme, 20261009-maps-index-readme, 20261009-design-current, 20261009-r00-v1-runtime-manifest, 20261010-r00-surface-guide, 20261010-r00-surface-manifest]
summary: "เลือกภาพแมพ v1 ล่าสุดและผัง R00 v1b ของ CH00 พร้อมแยก v2 และผลตรวจ geometry เดิมเป็นที่มา"
status: current-index
aliases: ["design/maps/_topic.md"]
design_baseline: UF-DESIGN-2026-10-09
---

# UNDERFALL — ดัชนีแมพ

> Summary: เลือกภาพแมพ v1 ล่าสุดและผัง R00 v1b ของ CH00 พร้อมแยก v2 และผลตรวจ geometry เดิมเป็นที่มา

เริ่มที่ [แบบปัจจุบัน](../../design-current.md) แล้วเลือกอ่านเฉพาะช่วงงาน ภาพ/พรอมต์ประวัติไม่แทนcanonหรือพิกัดล่าสุด

ผู้เขียนเลือกภาพ v1 ล่าสุดวันที่ 9 ตุลาคม 2026 โดย CH00 ใช้ภาพ R00 v1b ต่อเป็นโลกเดียว; ผลตรวจ geometry เดิมไม่รับรองภาพ/ผังใหม่นี้ รุ่น v2 ด้านล่างเก็บเป็นที่มาของการออกแบบก่อนเลือกภาพรอบล่าสุด

- [ข้อมูลภาพโลก R00 v1b](../../assets/maps/r00-v1/manifest.json) — prepared-reference-faithful: ภาพพื้นโลกR00จากv1bและสไปรต์แยกจากต้นฉบับ พร้อมmaskcleanupและหลักฐานพิกเซลนอกmaskไม่เปลี่ยน

- [UNDERFALL — สัญญาขนาดและพิกัด CH00–CH01](../chapters/layout-contract.md) — current-design: ขนาดห้อง จุดวางองค์ประกอบ สเกลตัวละคร กล่องคำพูดและศึกที่ใช้ส่งสร้าง โดยคงบท ลายปริศนา และ gate เดิม
- [ข้อมูลขนาดและพิกัดCH00–CH01](../chapters/current-layout.json) — current-data: ข้อมูลห้อง anchors สเกล UIและSAVEของUF-LAYOUT-2026-10-09 เป็นค่าตั้งต้นที่ยังไม่ทดสอบจริง
- [UNDERFALL — บันทึกพื้นที่ประกอบภาพแมพ v1](2026-10-08-v1/MAP_NOTES.md) — current-design: บันทึกอ่านภาพแมพ v1 ที่เลือกล่าสุด โดย R00 v1b เป็นแหล่งภาพ CH00 และพิกัด/ตัวชนต้องตรวจใน runtime รอบใหม่
- [UNDERFALL — พรอมต์วาดแมพชุด v1](2026-10-08-v1/PROMPTS.md) — historical-record: ประวัติ: UNDERFALL — พรอมต์วาดแมพชุด v1; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime
- [UNDERFALL — ชุดภาพร่างแมพ ป่าถึงปราสาทราชา](2026-10-08-v1/README.md) — current-design: ภาพแมพ v1 ที่ผู้เขียนเลือกล่าสุด โดย R00 ใช้ฉบับ v1b เป็นแหล่งภาพ CH00 และเก็บขอบเขตพล็อตตามแบบปัจจุบัน
- [UNDERFALL — แผนพื้นที่เดิน ประตูปริศนา และอาคารเข้าได้ v2](2026-10-08-v2/LEVEL_LAYOUT.md) — current-design: ปัจจุบัน: UNDERFALL — แผนพื้นที่เดิน ประตูปริศนา และอาคารเข้าได้ v2; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime
- [design/maps/2026-10-08-v2/manifest.json](2026-10-08-v2/manifest.json) — current-data: ปัจจุบัน: manifest.json; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime
- [UNDERFALL — ชุด prompt ภาพแมพ v2](2026-10-08-v2/PROMPTS.md) — current-prompt-record: ปัจจุบัน: UNDERFALL — ชุด prompt ภาพแมพ v2; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime
- [UNDERFALL — แมพ v2: ทางกว้าง ลานชม และอาคารเข้าได้](2026-10-08-v2/README.md) — current-design: ปัจจุบัน: UNDERFALL — แมพ v2: ทางกว้าง ลานชม และอาคารเข้าได้; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime
- [UNDERFALL — ชุดออกแบบแมพ](README.md) — current-design: ปัจจุบัน: UNDERFALL — ชุดออกแบบแมพ; อ่านdesign-currentเพื่อเลือกเวอร์ชันและไม่อ้างภาพเป็นruntime

- [UNDERFALL — พื้นและดอกไม้ R00 รุ่นเก็บรายละเอียด](../../assets/maps/r00-surfaces-v2/README.md) — current-runtime-assets: หย่อมพื้นสีเงียบและดอกไม้แยกจากภาพv1bสำหรับฉากแบ่งเลเยอร์ โดยไม่เปลี่ยนผังหรือภาพต้นฉบับ
- [ข้อมูลพื้นและดอกไม้ R00 รุ่นเก็บรายละเอียด](../../assets/maps/r00-surfaces-v2/manifest.json) — current-runtime-data: rectหย่อมพื้นR00สีเงียบและดอกไม้จากv1b พร้อมแหล่งและขอบเขตการปรับโดยไม่เปลี่ยนผัง
