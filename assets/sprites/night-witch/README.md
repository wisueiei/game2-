---
id: 20261009-night-witch-live-readme
title: "Night Witch — 24×32 sprite frames"
tags: [legacy, characters, systems]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-design-current]
summary: "สไปรต์Night Witchที่เกมเดิมใช้จริง เก็บข้อมูลเทคนิคแต่ไม่ถือเป็นแบบผู้เล่นR5"
status: legacy-live
aliases: ["assets/sprites/night-witch/README.md"]
design_baseline: UF-DESIGN-2026-10-09
---

# Night Witch — 24×32 sprite frames

> **แอสเซตที่เกมเดิมใช้ ไม่ใช่แบบผู้เล่นปัจจุบัน:** คงไฟล์Night Witchและข้อมูลเทคนิคไว้ ไม่เปลี่ยนPNG/รันตัวสร้างในรอบเอกสารนี้ งานใหม่เลือกR5จาก [design-current.md](../../../design-current.md)

Each file is a separate 24×32 RGBA PNG with a transparent background. The frames use a shared 16-colour opaque palette, hard 1:1 pixels, and a dark `#0A1022` outline.

| Direction | Idle | Walk | Walk2 |
| --- | --- | --- | --- |
| Front | `night-witch-front-idle-24x32.png` | `night-witch-front-walk-24x32.png` | `night-witch-front-walk2-24x32.png` |
| Back | `night-witch-back-idle-24x32.png` | `night-witch-back-walk-24x32.png` | `night-witch-back-walk2-24x32.png` |
| Left | `night-witch-left-idle-24x32.png` | `night-witch-left-walk-24x32.png` | `night-witch-left-walk2-24x32.png` |
| Right | `night-witch-right-idle-24x32.png` | `night-witch-right-walk-24x32.png` | `night-witch-right-walk2-24x32.png` |

The walk frames extend one leg forward. Keep nearest-neighbor scaling enabled in the game engine.
