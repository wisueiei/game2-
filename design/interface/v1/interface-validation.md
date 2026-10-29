---
id: 20261009-interface-v1-validation
title: "UNDERFALL — ผลตรวจอินเทอร์เฟซ v1"
tags: [design, systems]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-interface-v1-handoff, 20261009-interface-v1-screen-catalog, 20261009-design-current]
summary: "ผลตรวจ56หน้าdesktop/mobileและการโต้ตอบข้อมูลพรีวิว ไม่แทนการตรวจเกมจริง"
status: preview-validated-not-game
---

# UNDERFALL — ผลตรวจอินเทอร์เฟซ v1

> Summary: ผลตรวจ56หน้าdesktop/mobileและการโต้ตอบข้อมูลพรีวิว ไม่แทนการตรวจเกมจริง

9ตุลาคม2026 · UF-INTERFACE-2026-10-09-v1 · ตรวจผ่านPlaywrightCLIในChromiumและตรวจnode syntax

- PASSเปิดครบ56หน้าdesktop1440×1050 และบันทึกภาพในoutput/playwright/interface/screensตามID
- PASSหน้าจอจำลอง390×844ครบ56หน้า ไม่มีdocumentล้นแนวนอน; นี่ไม่ใช่มือถือจริง
- PASSไม่มีSAVE→เล่นต่อdisabled, ไม่มีโทรศัพท์→CALLdisabled, กระเป๋าว่างมีข้อความและทางกลับ
- PASSเงินไม่พอไม่หัก/แจกของ, ซื้อคุกกี้37G→30Gจำนวน1→2และstock3→2
- PASSมัฟฟิ้นHP16→19/โบนัสDF4/จำนวน1→0; ขวดทิ้งไม่ได้, ยกเลิกทิ้งลูกอมไม่เสียของ
- PASSSAVEพรีวิวสำเร็จฟื้น20HP; forcedfailureไม่เปลี่ยนcheckpoint; กดลองใหม่สำเร็จ
- PASSทอเรียลFIGHTdisabled/พลังปิด; ระหว่างหลบปิด4คำสั่ง หัวใจเคลื่อน4pxเมื่อกดลูกศร
- PASSชื่อไทย “บีบี๋” ยืนยันแล้วคงค่า, ลดmotion/ตัวอักษรใหญ่มีผลกับUI
- ภาพทั้งหมดมาจากหน้าที่renderจริง ไม่อ้างว่าเป็นภาพแอสเซตgameplayที่ส่งออกแล้ว

เครื่องมือตรวจ: tools/check-interface-preview.cjs ผ่านCLI run-code --filename; ผลอ่านได้ในwindow.__UFInterfaceReportของหน้าที่ตรวจ
ตรวจไฟล์แยกว่าข้อมูลcatalogมีIDไม่ซ้ำ/parentsมีปลายทางจริง ลิงก์และทะเบียนเอกสารอยู่ในINDEX/design-catalog
โค้ดและบทindex.html/game.js/style.css/story.md/ch00.md/ch01.md/โครงเรื่อง.md รวมทั้งatlasR5ไม่เปลี่ยนในงานนี้

## ข้อจำกัด

### ตรวจเพิ่มเมนูระหว่างเดิน R2

tools/check-overworld-menu-preview.cjsผ่าน: 4ปุ่ม/Rootไม่เปิดpaneเอง/Canvasและตำแหน่งผู้เล่นไม่เปลี่ยนระหว่างเมนู/แผงขวาอยู่ขวาของrail/การ์ดสถานะไม่ล้น/PNGผู้เล่นมีอยู่/ย้อนได้สองชั้น/Iเปิดของ/CELL-SOULสลับได้/ก่อนรับโทรศัพท์CELLปิด/มือถือ390pxไม่ล้น
ผลครบ56หน้าและการซื้อ/ไอเทม/โทร/SAVEเดิมยังผ่านหลังเปลี่ยนlayout ไม่ใช่การทดสอบgameplayจริง
ภาพใหม่อยู่output/playwright/interface/overworld-*.png และภาพรายIDในgalleryใช้รูปแบบใหม่แล้ว

### สิ่งที่ยังไม่ต่อเกม

ภาพSTATเลือกใหม่ตามรูปผู้เขียนเป็นRGBA64×112/32สี/alpha0-255 สร้างด้วยimagegenแล้วจัดพิกเซลตามขั้นตอนที่อนุญาตไว้ แสดงเฉพาะSTAT ไม่เปลี่ยนสไปรต์เดินหรือชุดอุปกรณ์จริง
ตรวจเพิ่มรูปโหลดครบnative64×112 และตำแหน่งทั้งdesktop/390px/530px; ข้อมูลไอเทม/เมนูเดิมยังผ่านหลังเปลี่ยนภาพ

ยังไม่ต่อstateเกมจริง/ศึกdamage/รูปแบบกระสุน/SAVEจริง/โทรศัพท์ตามstory/เควส/การปลดตอนและfuture systems
ไม่ได้ทดสอบจอย อุปกรณ์touchจริง หรือฟังเสียงเพื่อรับรองคุณภาพเพลง มีเพียงเสียงbeepต้นแบบเมื่อผู้ใช้กด
หน้าสำรองมีtemplate/คำอธิบายรอกฎและข้อมูลผู้เขียน ไม่อ้างว่าทุกเส้นจบSS1หรือSS2เขียนเสร็จ
ก่อนportต้องทดสอบcontextguards, focus,storagefailure/backup,ชื่อยาว/ไทย,portraitจริง และทั้งแขนงCHตามใบส่งต่อ

## Related

- [ใบส่งต่อ](interface-handoff.md) — prerequisite: ขอบเขตทดสอบและการนำไปใช้
- [ทะเบียนหน้า](screen-catalog.json) — supports: 56หน้าที่ใช้ตรวจ
- [แบบปัจจุบัน](../../../design-current.md) — authority: แยกgameplayที่ยังไม่สร้าง
