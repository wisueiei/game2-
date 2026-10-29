---
id: 20261009-interface-v1-handoff
title: "UNDERFALL — ใบส่งต่ออินเทอร์เฟซ v1"
tags: [design, systems, chapters]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-interface-topic, 20261009-interface-v1-screen-catalog, 20261009-undertale-interface-research, 20261009-interface-v1-validation, 20261009-story, 20261009-ch00, 20261009-ch01, 20261009-design-current, 20261009-current-layout, 20261009-player-r5-v1-readme]
summary: "แบบ56หน้าอินเทอร์เฟซพร้อมtokens ส่วนประกอบ พฤติกรรม และข้อห้ามเมื่อต่อเข้ากับเกมจริง"
status: interactive-design-not-game
---

# UNDERFALL — ใบส่งต่ออินเทอร์เฟซ v1

> Summary: แบบ56หน้าอินเทอร์เฟซพร้อมtokens ส่วนประกอบ พฤติกรรม และข้อห้ามเมื่อต่อเข้ากับเกมจริง

รุ่น UF-INTERFACE-2026-10-09-v1 สร้างเป็นHTML/CSS/JSที่กดลองได้ มี56หน้า/สถานะตามscreen-catalog
นี่คือ **ต้นแบบUIครบขอบเขตที่ระบุ ไม่ใช่เกมCH00/CH01ที่สร้างเสร็จ** สายบท/ศึก/เควสในต้นแบบเป็นตัวอย่างUI ไม่ใช่การเขียนเนื้อเรื่องเพิ่ม
ผู้เขียนรับรองผู้เล่นR5รุ่นขาสั้น/หุบ/เรียวแล้ว จึงใช้PNGนั้นโดยไม่ปรับทรงหรือเปลี่ยนรองเท้าเพิ่มในงานนี้

## เปิดดู / ไฟล์ต้นทาง

- [preview.html](preview.html) — ชุดกดใช้งาน เลือกหน้าจากแถบซ้ายและบริบทตัวอย่างด้านบน
- [gallery.html](gallery.html) — ภาพจริงทุกหน้าจากการตรวจเบราว์เซอร์ เลือกหน้าสำคัญ/ทั้งหมด/หมวดได้
- [screen-catalog.json](screen-catalog.json) — 56IDs/ลำดับ/group/scope/parent เป็นทะเบียน ไม่ใช่กฎปลดตอน
- interface.css — tokensและcomponentหลัก; interface-refinements.css — ปรับกรอบ/โลโก้/การล้นและfullscreen
- overworld-menu.css — layoutRevision=overworld-panels-r2ตามภาพอ้างอิง: เมนูซ้าย/สถานะย่อ/แผงขวาทับฉากเดิน
- interface.js — fixture/state/template/การโต้ตอบของพรีวิว **อย่าคัดcreateDataไปใช้เป็นrunจริง**

```powershell
node serve.cjs
# เปิด http://127.0.0.1:4173/design/interface/v1/preview.html
node --check design/interface/v1/interface.js
npx --yes --package @playwright/cli playwright-cli --session underfall-ui open http://127.0.0.1:4173/design/interface/v1/preview.html
npx --yes --package @playwright/cli playwright-cli --session underfall-ui run-code --filename tools/check-interface-preview.cjs
```

ทดสอบในเครื่องนี้ใช้พอร์ต4188เพราะมีเซิร์ฟเวอร์พรีวิวเดิมอยู่ ภาพเก็บที่output/playwright/interface/screens/<id>.png
ใช้HTTP ไม่ใช้file://เพราะต้องอ่านcatalog/PNG ไม่จำเป็นต้องติดตั้งframeworkใหม่ ไม่มีการเพิ่มpackage.json
ลิงก์preview.html#<id>เปิดหน้าตัวอย่างตรงได้ ไม่ใช่deep-linkให้ข้ามฉากในเกมจริง

## ชุดหน้าที่มี

| หมวด | จำนวน | ขอบเขต |
|---|---:|---|
| เริ่มและตอน | 8 | เริ่ม/เล่นต่อ/RESET/ชื่อ/ยืนยัน/ประวัติ/ตอน/จบตอน |
| สำรวจและกระเป๋า | 7 | HUD/พัก/ไอเทม/ข้อมูลของ/อุปกรณ์/สถานะ/ขวด |
| โทรศัพท์และบท | 4 | โทรศัพท์/รายชื่อ/สายโทร/สายเข้า |
| บันทึกและฟื้นตัว | 5 | SAVE/สำเร็จ/ล้มเหลว/กู้ข้อมูล/เกมโอเวอร์ |
| ต่อสู้ | 8 | คำสั่ง/เป้าหมาย/ACT/ITEM/MERCY/FIGHT/หลบ/ผลศึก |
| ร้านและคลัง | 5 | ร้าน/ซื้อ/ไม่รับซื้อ/คุย/กล่องฝากอนาคต |
| บันทึกและอนาคต | 8 | journal/quest/เศษความทรงจำ/หน้าความจำ/บ้าน/สัตว์เลี้ยง/สรุปSS1/หนังสือเวท |
| ตั้งค่าและช่วยเหลือ | 5 | ตั้งค่า/เสียง/ปุ่ม/อ่านง่าย/เครดิต |
| บทและการแจ้งเตือน | 6 | กล่อง???/ตัวเลือก/ได้รับของ/ข้อความกลางจอ/โหลด/ใช้คำสั่งไม่ได้ |

scope=currentหมายถึงมีต้นทางกติกาในสองCH ไม่ได้หมายความว่าเกมติดตั้งแล้ว
scope=ui-proposalคือการปรับหน้าตา/ทางเข้าที่ต้องเชื่อมตามบริบท ไม่ให้หน้าพักเปิดSAVEได้ทุกที่
scope=future-uiให้เห็นแบบผ่านworkbenchเท่านั้น ในเกมต้องล็อกจนผู้เขียนกำหนดเงื่อนไขจริง
scope=reference-adaptationใช้SELLเป็นหน้าปฏิเสธซื้อของของร้านตัวอย่าง ไม่ใช่ระบบขายใหม่

## Tokens และขนาด

### เมนูระหว่างเดิน R2 — ภาพอ้างอิงที่ผู้เขียนส่ง

ใช้layoutRevision=overworld-panels-r2 โดยไม่เปลี่ยน56หน้า/IDsเดิมหรือแตะเกมจริง
Rootคือpause: เห็นฉากและตัวละครที่ตำแหน่งเดิม กรอบขาวอุ่นซ้ายมีITEM/STAT/CELL/SOULและหัวใจเลือก สถานะย่ออยู่ใต้ปุ่ม ยังไม่มีแผงขวาจนยืนยัน
เมื่อเลือกจึงแสดงแผงขวา ใช้ข้อมูล/การใช้ของ/โทร/อุปกรณ์/พลังจากต้นแบบเดิม ไม่ทำระบบใหม่เพื่อให้เหมือนรูป
FLWYจากภาพเปลี่ยนเป็นSOULสำหรับขวด ไม่เพิ่มฟลาววี่เกาะผู้เล่นหรือปลดตัวตน???

| ส่วน | พิกัดdesktop400×225 | ข้อกำหนด |
|---|---|---|
| Rail4ปุ่ม | x18,y62,w86,h103 | glyphพิกเซล หัวใจและโฟกัส ไม่เลือกด้วยhover |
| สถานะย่อ | x18,y170,w86,h52 | ชื่อ/CH/HP/G; LVเป็น—จนกำหนดระบบ |
| แผงรายละเอียด | x111,y12,right16,bottom8 | กรอบ2logical px ขาวอุ่น พื้นดำโปร่งเล็กน้อย |
| รายละเอียดทั่วไป | top34,left/right10,bottom28ภายในpane | Scrollภายใน ไม่ล้นfooter |
| STAT | bodytop14, avatar72×96 | ขยายR5nearest ไม่แก้ภาพ; HP/G/โบนัสAT/DF/WEAPON/ARMORจริง |

EXP/NEXT/LVเป็น—และtooltipว่าไม่ใช้ในสองCH ไม่ยกLV6/EXP225จากภาพมาเป็นค่าของเกม
ภาพผู้เล่นเล็กยังอยู่หลังเมนู Canvasไม่เปลี่ยนเมื่อเลื่อนตัวเลือก; เวลา/enginepauseจริงยังต้องต่อเมื่อport
IเปิดITEM, PเปิดPHONEเมื่อได้รับแล้ว, EscตอนเดินเปิดRoot; Escจากpaneปิดpane→Root; EscจากRootกลับเดิน
ขึ้น/ลง/WASDเลื่อน Z/Enterยืนยัน กดขวาจากrailที่มีpaneเพื่อเข้าcontrolsในpane; คลิก/แตะได้
สลับrailแทนpane ไม่เพิ่มชั้นย้อนผ่านทุกหมวดที่เปิด; ITEMย่อย/อุปกรณ์กลับITEMก่อน
CELLปิดก่อนรับโทรศัพท์ SOULปิดก่อนรับขวด มีเหตุผลในtitle ไม่มีแจกของจากการเปิดหน้า
มือถือคงrailซ้าย104pxกับpaneขวา รายละเอียดเลื่อนภายใน ลดขนาดแสดงผลภาพโดยไม่เขียนPNGใหม่
สำรองก่อนแก้ที่design/archives/2026-10-09-interface-before-overworld-panels.zip กู้แบบก่อนหน้าได้

### ภาพผู้เล่นสำหรับSTAT — เลือกใหม่ตามรูปอ้างอิงผู้เขียน

ใช้ assets/characters/player-stat/v1/player-stat-star-64x112.png แยกจากR5walking ภาพนี้ยึดรูปสกรีนช็อต2026-10-08 043938: เสื้อคอปก/แถบชมพู ดาวที่อก กางเกงสีเข้ม ถุงน่องเทา รองเท้าสูง และริบบิ้นตามรูป
สร้างด้วยbuilt-in imagegen แล้วใช้ขั้นตอนเก็บขอบ/จัดกริดที่ผู้เขียนอนุญาตไว้ ได้RGBA64×112,32สี,alpha0/255 ไม่มีพื้นสี่เหลี่ยมหรือhaze
เก็บPNGต้นทางและreferenceในโฟลเดอร์sourceของแพ็ก; source/native/reference hashesและpromptจริงอยู่statArtworkในscreen-catalog.json
ทำซ้ำ: python tools/make-player-stat-portrait.py (Pillow) เขียนเฉพาะSTAT PNGกับพรีวิว4x ไม่เรียกAPIซ้ำ
ใช้classoverworld-stats-heroเดิมกับobject-fit:contain ไม่ยืดภาพ; ตัวเดิน/ภาพequipment/ร่างในศึกยังใช้R5ตามเดิม
ชุดและดาวในภาพเป็นภาพประกอบUI ไม่เปลี่ยนinventory/equipment/HP/DF/พลัง ไม่ถือว่าเกมรับรองการสวมรองเท้าหรือเสื้อแบบใหม่นี้แล้ว

### Tokens หลัก — หน้าบริบทอื่นคงแบบเดิม

| token / ขนาด | ค่า | ใช้ |
|---|---|---|
| --ink | #eee6d6 | ขาวอุ่นของข้อความ/กรอบ |
| --night / --panel | #0d111d / #171c2c | พื้นครามและชั้นเนื้อหา |
| --rose | #ed86a2 | ตัวเลือก/สำเนียงครบรอบ |
| --blue | #91dfea | วิญญาณ/สถานะ/ข้อมูลเสริม |
| --gold / --focus | #efc681 | เงิน/ดาว/keyboardfocus |
| --danger | #ee8b85 | RESET/บันทึกล้มเหลว ไม่ใช้สีอย่างเดียว |
| --muted / --line | #a5a6bd / #444c68 | ข้อมูลรอง/ขอบไม่active |
| game desktop | 400×225 logical | สเกลเป็นviewport ไม่เปลี่ยนพิกัดโลกจริง |
| head/content/foot | y11 / y46–185 / y191–215 | กรอบหัว/เนื้อหา/ทางกลับ; margin18 |
| gap / paddingหลัก | 10 / 9–10logical px | panelและlist |
| กล่องบท | x16, bottom15, h88 | ชื่อผู้พูดมุมขวา ภาพ/สัญลักษณ์ซ้าย ข้อความDOM |
| ศึก | monster center200,68 / player foot200,151 | มอนอ้างอิงbox166,40,68,56; เทิร์นมอนซ่อนร่างและมีหัวใจ |
| กรอบหลบ | x76,y100,w248,h76 | อ้างcurrent-layout; ในมือถือจัดกึ่งกลางแบบUI |

กรอบเกมเป็นมุมคม มีจุดaccentขนาด3px ไม่เพิ่มglass blur/การ์ดมุมโค้งแบบเว็บแอปในเกม
ตัวอักษรLatinหัวเรื่องเป็นglyph5×7 SVGcrispEdgesของUIที่เขียนเอง ชื่ออ่านเป็นUNDERFALLผ่านARIA
ไทยใช้Tahoma/system-uiกับDOM ไม่ฝังข้อความลงPNGหรือCanvas; ลายพิกเซลของรูปคนใช้nearest-neighbor
ศัพท์FIGHT/ACT/ITEM/×MERCYคงไว้ตามผู้เขียน Xหน้าMERCYไม่ใช่ปุ่มkeyboardX

## ส่วนประกอบและสถานะ

| component | variant / state | พฤติกรรม |
|---|---|---|
| game-button | default/primary/ghost/danger/disabled/focus | คลิก/แตะ/Z/Enterยืนยัน; defaultไม่ยืนยันการทำลาย |
| list-item | ปกติ/เลือก/disabled | ลูกศร/WASDเลื่อน; hoverเปลี่ยนภาพแต่ไม่ส่งคำตอบ |
| pixel-panel / soft-panel | ปัจจุบัน/ข้อมูลรอง/scroll | ข้อความเกินเลื่อนภายใน ไม่ล้นทับfooter |
| center-dialog | แจ้งผล/ยืนยัน/อันตราย | โฟกัสยกเลิกก่อนเมื่อRESET/ทิ้งของ; ปิดด้วยEsc |
| hp-row | พร้อม/HPไม่เต็ม/ฟื้น | ตัวเลขร่วมกับแถบ ไม่สื่อด้วยสีอย่างเดียว |
| dialogue-box | บท/สายโทร/??? | speakerแยกจากข้อความระบบ; ???ไม่มีใบหน้าจริง |
| tag / scope-note | current/proposal/future | ขอบเขตในworkbench ไม่ให้ข้อมูลอนาคตกลายเป็นcanon |
| toast | แจ้งสำเร็จ/ใช้ไม่ได้/เงินไม่พอ | role=status; ไม่กินของ/เงิน/เทิร์นจากแค่ดูข้อความ |

ภาพมอนFroggitและportraitทอเรียลในต้นแบบอ่านsourceRectจากชีตconceptเพื่อจัดวาง ไม่ใช่การexportcrop atlasแล้ว
ก่อนติดตั้งต้องนำแอสเซตผ่านการสร้าง/ตรวจตามทะเบียนportraitและตัวละครอีกงานหนึ่ง ภาพเหล่านี้ยังไม่มีalpha production
UIโลโก้/หัวใจ/ขวดเป็นกราฟิกส่วนประกอบ ไม่ใช่โมเดลตัวละครเพิ่ม ชิกุอีกเส้นเวลาและเสียงVoidยังไม่เผยหน้า

## พฤติกรรมที่กดลองได้

- START/RESET: ยืนยันก่อนล้างข้อมูลพรีวิว; เมนูหลักของเกมจริงใช้ชื่อnullableและHP20/G0/ของว่างก่อนintro **ไม่ใช้fixture37Gเป็นค่าเริ่มเกม**
- CONTINUE: อ่านcheckpointตัวอย่าง ไม่เรียกเริ่มใหม่; disabledเมื่อไม่มีข้อมูล
- ประวัติ: เปิดรายละเอียด ไม่ปลดบท; ลิงก์เกมเก่าเปิดindex.htmlอีกแท็บและบอกว่าใช้คนละเซฟ
- ชื่อ: DOMinput1–12graphemes มีหน้ายืนยัน รับไทย ไม่ตัดวรรณยุกต์หรือห้ามชื่อแบบต้นฉบับเอง
- กระเป๋า/ITEMใช้ข้อมูลชุดเดียว; มัฟฟิ้น3HP/โบนัสDF4ครั้งเดียว; อาหารลดจำนวนเมื่อใช้; อุปกรณ์ไม่หายเมื่อใส่
- ขวด/แหวน/โทรศัพท์/รองเท้าขาวเป็นของสำคัญ ปิดทิ้ง/กิน; ของธรรมดาต้องยืนยันก่อนทิ้ง; รองเท้าไม่เปลี่ยนภาพเอง
- โทรศัพท์ต้องได้รับก่อน มีรายชื่อทอเรียลหนึ่งคน; บทสายส่วนใหญ่เป็นช่องอ้างstory ไม่เติมบทCanonใหม่
- SAVEทดลองcommitในnamespaceแยก สำเร็จฟื้น20HP; ล้มเหลวไม่ล้างcheckpoint; ลองใหม่/ส่งออก/นำเข้าพรีวิวและสำรองได้
- ศึกมี4คำสั่ง; ระหว่างหลบปิด4คำสั่งจนจบเทิร์นตัวอย่าง; ศึกทอเรียลปิดFIGHT/พลังและหนีโดยแสดงเหตุผล
- FIGHT/ACT/SPAREในต้นแบบแสดงการตอบสนองUI ไม่ทำdamage/การฆ่า/rewardจริง ไม่ใช้จำนวนคลิกในพรีวิวแทนSPARE8จังหวะตามบท
- BUYตรวจG/stockก่อนเปลี่ยนข้อมูล; คุกกี้7G/3ต่อrun ชา12G/2ต่อrunตามstory; SELLร้านนี้ไม่รับซื้อ
- เสียงทดสอบเป็นsquare beepสังเคราะห์เมื่อกด ไม่ใช้เสียง/เพลงUndertale; แถบเพลงและblipเก็บค่ารอเชื่อมเสียงจริง
- ลดmotionหยุดanimationUI; ตัวอักษรใหญ่ขึ้นใช้scroll; แสดงข้อความทันทีมีผลกับจังหวะสายตัวอย่าง
- บ้าน/สัตว์/กล่องฝาก/ความทรงจำ/หนังสือ/สรุปซีซันเป็นtemplateอนาคต คลิกได้เพื่อดูUI ไม่เพิ่มกิจกรรม/รางวัล/เส้นจบจริง

## Input และการอ่าน

เดิน/หัวใจใช้WASD/ลูกศร, เปิดของI/โทรP, ยืนยันZ/Enter/Space, ย้อนEsc, ปิดเสียงMตามstory
เมื่ออ่านชื่อหรือใช้range/selectให้browserจัดปุ่มของfield ไม่จับตัวอักษรเป็นคำสั่งเกม
กดค้างยืนยันไม่ข้ามหลายหน้า; การเลือกต้องปล่อยปุ่มก่อนรับใหม่ โลก/ศัตรู/คูลดาวน์ต้องpauseเมื่อมีเมนู/บทจริง
prototypeไม่มีการใช้X/C/V/B/Nในโลกเพื่อเผา/รักษาจริง HUDบอกปุ่มและหน้าพลังบอกเงื่อนไขเท่านั้น อย่านับว่าabilityengineถูกทำแล้ว
focus outlineและlabelมีทุกปุ่มหลัก, alert/statusแยก, สำคัญ/เงิน/HPมีชื่อและตัวเลข; Escไม่เป็นRESET
gamepad/touchDpadสำหรับเกมจริงยังไม่เชื่อม; ปุ่มUIแตะและkeyboardลองได้ ไม่อ้างว่าตรวจอุปกรณ์จอย/มือถือจริงแล้ว

## Responsive

เหนือ720px: workbenchซ้าย238px(200pxช่วงแคบ) viewport16:9สเกลจาก400×225
ต่ำกว่า720px: ย้ายcatalogไปด้านบน เมนูDOMreflowในpreviewสูง405px ตัวอักษรใหญ่กว่าสเกลเล็ก ไม่ยืดสไปรต์ส่งออก
นี่เป็นการลองresponsiveของUI ไม่เปลี่ยนlogical map/collision/กรอบpatternในเกมจริง; ตอนportต้องวางviewportโลกกับoverlayDOMแยกกัน
fullscreenคุมscaleด้วยmin(width/400,height/225); มือถือใช้การอ่านเมนูแบบreflow
ข้อมูลยาวต้องwrap/scroll รายการ, ชื่อหัวpanelellipsisพร้อมช่องรายละเอียด; บทจริงต้องแบ่งหน้าตามกราฟีม ไม่ใช้CSSตัดบททิ้ง

## เชื่อมกับเกมจริง — ต้องทำแยก

1. ใช้ใบงานCHและstoryคุมลำดับ; UIcatalogไม่ใช่permission graphของเกม ห้ามให้sidebarworkbenchหรือhashข้ามฉากได้เมื่อship
2. แยกstateของUI/focus/selectionจากcheckpoint/meta/runId และเก็บledgerของของ/ศึก/แหวนตามstory10.21
3. ต่อdataที่ใช้ร่วมกันระหว่างI/P/ITEMกับinventoryจริง ไม่แปลงfixtureหรือschemaพรีวิวไปเป็นเซฟเกม
4. ก่อนเรียกactionตรวจhasPhone/bottle/nUnlocked/ของจริง/บทที่ติดตั้ง/phase; เริ่มชื่อหลัง10.11 หนังสือหลังแซน ไม่ปลดบ้าน/สัตว์ในรูน
5. เกมจริงใช้underfall.save.v1และmappinglayoutที่ยืนยัน; พรีวิวนี้ใช้underfall.interface-preview.v1, .backup, .settings ไม่อ่าน/เขียนkeyจริง
6. โหลดหลังcheckpointไปresumeSceneจริง รอยต่อCH00=10.10, CH01=after_ruins_before_sans ไม่เรียกintro/แจกไอเทมซ้ำ
7. commitล้มเหลวต้องไม่แสดงsaved ข้อมูลสำรอง/importต้องตรวจschemaก่อน และต้องไม่silent resetข้อมูลที่ไม่รองรับ
8. ต่อengineศึกจริงตาม10.24; ไว้ชีวิต/หนี/ใช้ของ/การอ่านtooltipแยกกัน ผลศึกต้องผ่านencounterId/rewardLedger ไม่แจกเงินจากต้นแบบนี้
9. สูตรGood/Pacifist/Badตามโครงผู้เขียน; ไม่มีคะแนนความดีลับหรือNeutralที่เพิ่มเอง ไม่ซื้อความสัมพันธ์ด้วยG
10. เมื่อportไปindex_new.htmlให้คงindex.htmlและorphaned game.js/style.cssแยกตามCLAUDE อย่าใช้พรีวิวนี้แทนการทดสอบเดิน/ศึก/CHจบจริง

## Related

- [ดัชนีinterface](../_topic.md) — navigation: เลือกอ่านงานUI
- [ทะเบียน56หน้า](screen-catalog.json) — supports: IDs/parents/scope
- [ข้อมูลUndertale](undertale-interface-research.md) — supports: ที่มาซึ่งไม่ทับกฎโปรเจกต์
- [ผลตรวจ](interface-validation.md) — supports: แยกสิ่งที่ลองแล้วจากruntimeเกม
- [story](../../../story.md), [CH00](../../../ch00.md), [CH01](../../../ch01.md) — authority: บท/ขอบเขต/กฎจริง
- [แบบปัจจุบัน](../../../design-current.md), [layout](../../chapters/current-layout.json) — prerequisite: เวอร์ชันและพิกัด
- [สไปรต์ผู้เล่น](../../../assets/characters/player-r5/v1/README.md) — prerequisite: R5ที่รับรอง ไม่เปลี่ยนทรงในงานUI
