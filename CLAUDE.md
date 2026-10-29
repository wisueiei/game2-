---
id: 20261009-claude
title: "CLAUDE.md"
tags: [design, chapters, systems]
created: 2026-10-09
updated: 2026-10-09
related: [20261009-design-current, 20261009-ch00, 20261009-ch01, 20261009-layout-contract, 20261009-characters-r5-readme, 20261009-maps-v2-readme, 20261009-portraits-v1-readme, 20261009-index, 20261009-night-witch-live-readme, 20261009-player-r5-v1-readme, 20261009-interface-v1-handoff]
summary: "กติกางานร่วมกัน ฐานindex.htmlจริง และแหล่งแบบล่าสุดที่ต้องอ่านก่อนสร้างCHใหม่"
status: current-guide
aliases: ["CLAUDE.md"]
design_baseline: UF-DESIGN-2026-10-09
---

# CLAUDE.md

> **ชุดอ้างอิงปัจจุบัน:** กติกางานร่วมกัน ฐานindex.htmlจริง และแหล่งแบบล่าสุดที่ต้องอ่านก่อนสร้างCHใหม่ อ่าน [design-current.md](design-current.md) เพื่อเลือกเวอร์ชันและแยกข้อยืนยัน/ค่าตั้งต้น/งานที่ยังไม่สร้าง; [INDEX.md](INDEX.md) เป็นทางเข้าเอกสารทั้งหมด

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current design authority — 2026-10-09

Read [INDEX.md](INDEX.md) and [design-current.md](design-current.md) before choosing art, story versions, or chapter work. Current design baseline: UF-DESIGN-2026-10-09. Updating docs does not install assets or create gameplay.

- Latest player: R5, petite/slim, brown bob, navy/pink sweater, dark shorts, bare slender legs, low brown ankle shoes. Kin and Fiw are MONSTERS. Use the8-sheet selection in design/monsters/2026-10-08-revision-05/README.md, not the old witch or unselected R1/R2 variants.
- Special forms: R4 sheet03, including human Yuan with7 WHITE palms/colored center disks and slender Hyperdeath Asriel. Normal child Asriel is a separate height reference; preserve reveal gates.
- Maps v2: clear paths +25%, selected walkable plazas +45%, enterable shops/homes. Use design/chapters/current-layout.json (UF-LAYOUT-2026-10-09), not old320×180 footprints or unmeasured PNG coordinates.
- Portraits v1: reference boards only, no alpha/crop atlas or animation exports. Void voice = alternate-timeline Shiku; no face/silhouette/body before meeting behind the tree in SX03. Bottle voice = real Shiku/Yuan, still named??? early.
- Worksheets: CH00-2026-10-09-r2 / CH01-2026-10-09-r4. Target index_new.html is not created yet. CH00 stops in rift before legend/naming; CH01 after Ruins before Sans/spellbook, Toriel battle mercy-only.
- story.md is dialogue authority, โครงเรื่อง.md plot/canon authority, current-layout.json construction-default coordinates. Preserve author's Thai/Wingdings; technical defaults/open questions are not canon.

Player R5 native asset pack has now been exported separately: [guide](assets/characters/player-r5/v1/README.md),18 frames and2 transparent atlases with frame/pivot/alias metadata. File checks and isolated browser preview passed; it is NOT installed in index.html and no new chapter game was created. Only moving actors need walking frames; stationary monsters get battle poses. Do not interpret this player pack as exports of every character.

Interface design v1 now has56 working preview screens/states: [handoff](design/interface/v1/interface-handoff.md), [preview](design/interface/v1/preview.html). It is a sandbox using underfall.interface-preview.v1, NOT the real SAVE key. Do not copy fixture37G/inventory into a real new run or ship the workbench/hash navigation as chapter access. Future house/pets/spellbook/memories/season layouts do not define their game rules. Live game/chapters remain unchanged.

Implementation details and sprite generator below describe existing index.html, not R5. Do not run the Night Witch generator and claim it makes R5, or merge the orphaned game.js rewrite.
See [legacy sprite inventory](assets/sprites/night-witch/README.md) for the12 installed frames — implementation reference only, not the new character design.

## What this is

UNDERFALL — a single-page pixel-art browser game in Thai, built as an anniversary gift for the
owner's partner. Undertale-referenced: falling intro, typewriter dialogue from a hidden character
named `???`, WASD exploration of a pitch-dark forest clearing.

Not a package: no git, no `package.json`, no build step, no tests. Node is used only for
dev tooling. The deliverable is a file the recipient double-clicks.

**The Thai dialogue is the point of the project.** It is the owner's own writing, typos included
("ยินดีต้องรับ", "แย้ว", "บีบี๋"). Never "fix" it, translate it, or rewrite it for tone. The only
approved edit so far was `แสงมา` → `แสงมัน`, and it was flagged to the owner first.

**`story.md` is the script of record.** Full scene-by-scene text, stage directions, established
canon, open threads, and which lines are the owner's vs. added by an assistant. If the game and
`story.md` disagree, `story.md` wins — change the code. Story and design are planned in a separate
chat from the one that writes code; read `story.md` before touching any dialogue or scene order.

## Commands

```bash
node serve.cjs                              # http://127.0.0.1:4173 (UNDERFALL_PORT to override)
node tools/make-night-witch-sprites.js      # legacy Night Witch only, not R5
node --check game.js                        # orphaned rewrite only, not CH00/CH01
```

Opening `index.html` by double-click works, but **serve it over http when touching character
art** — sprite PNGs are loaded by relative path and some contexts (notably the in-app preview
pane, which serves the page as a `data:` URL) cannot resolve them. The game does not break; it
silently falls back to code-drawn sprites, which looks like "my change did nothing".

`index.html#skip` jumps past the ~50 s fall sequence straight to the landing. Use it for anything
downstream of the intro. The hash is lost when the page is served as a `data:` URL.

## Two parallel implementations — read this first

| | `index.html` | `game.js` + `style.css` |
|---|---|---|
| Status | **live — this is the game** | orphaned |
| Author | Claude | Codex |
| Form | self-contained (HTML + CSS + JS in one file) | needs an HTML entry point that no longer exists |
| Story | complete, through the bottle pickup and the fade to black | truncated — ends at "เธอมองเห็นทางมั้ย" |
| Runs? | yes | no — requires `assets/forest-clearing.png`, which is absent |

`game.js` is a complete, independent rewrite of the same story with its own resolution
(640×360 logical, drawn at 320×180), its own DOM ids (`#world`, `#dialog`, `#speaker`, `#touch`)
and its own asset pipeline. Editing `index.html` has no effect on it and vice versa.

Missing files referenced by `game.js` / `ART-DIRECTION.md`: `assets/forest-clearing.png`,
`assets/forest-clearing-painterly.png`, `index.before-visual-update.html`.

Do not delete either side or attempt a merge without asking — the owner decided on
2026-09-16 to keep `index.html` as the base and port pieces across selectively.

## index.html architecture

One IIFE, 16 numbered section banners (`0. SETUP` … `15. STORY`). Navigate by those comments.

**Fixed internal resolution** `W=400, H=225`, scaled to the window by CSS. All world and screen
coordinates are in these units; `--u` (px per virtual pixel) drives every UI size so the DOM
overlay scales with the canvas.

**Canvas draws the world, DOM draws the text.** Thai shaping and wrapping are handled by real
DOM elements layered over the canvas (`#center`, `#dlg`, `#choice`), not by `fillText`. Keep it
that way — canvas text will not shape Thai correctly.

**Three-pass render**, every frame, in `drawWorld()`:
1. World at full colour — pre-rendered ground blit, then depth-sorted props, particles, ripples.
2. Light: fill the offscreen `lc` with `rgba(3,4,12, state.darkness)`, then `holeD()` punches
   holes with `destination-out` — a smooth radial core plus low-alpha Bayer-dither rings for a
   pixel-art edge. Composite over the world.
3. Additive bloom (`globalCompositeOperation='lighter'`) for glows.

`AMBIENT` (≈0.952) is the darkness knob — the single most impactful visual constant.
Two past bugs both came from this pass: white dither tiles used where dark ones were needed
(`DITHER_TILE` vs `DITHER_DARK`), and a canvas donut path whose connecting line was collinear
with a horizontal scanline, filling the whole disc. Donuts need explicit `moveTo` + `closePath`
subpaths with `fill('evenodd')`.

**The ground is pre-rendered once** into a `(MAPR+GPAD)*2` offscreen canvas (`groundCv`) and
blitted per frame. Grass texture, dirt patches, stone slabs and the border fade all live there.
Anything static and expensive belongs in `paintGround()`, not the frame loop.

**Scenery sprites are pre-rendered too** (`buildTree`, `buildBush`, `buildRock`, `buildCrystal`,
`buildDeer`) into small canvases with an `{cv, ax, ay}` anchor, then depth-sorted against the
player by world `y`. `pxEllipse` / `pxPoly` are scanline fills that stay on the pixel grid;
prefer them over `arc`/`beginPath` for anything meant to look like pixel art.

**Character sprites**: `HERO` holds `{w, h, seq, img}`. It starts with 16×26 code-drawn sprites
(string grids + palette, see `buildSprite`), then an async loader replaces them with the 24×32
PNGs in `assets/sprites/night-witch/` **only if all twelve load**. Any failure keeps the
fallback. Walk cycle is `seq=[0,1,0,2]` over `idle / walk / walk2`. Everything downstream reads
`HERO.w` / `HERO.h`, so swapping in different-sized art needs no other edits — **this loader is
the hand-off point for externally produced character art.**

**Story is one async coroutine.** `story()` awaits each beat in order; the render loop runs
independently off `state`. `say()` (typewriter into the dialogue box) and `narrate()` (centre-screen
fade) both return promises resolved by `onAdvance()`. Text lives in `INTRO_LINES`, `TALK1`,
`TALK2`, `FINALE` and inline `say()` calls. `graphemes()` keeps Thai vowels and tone marks
attached to their base consonant so typing does not jitter — reuse it for any new text animation.

Scene order, unchanged since the first version:
title → fall + love letter → impact + dust → sit up → `???` dialogue → เจ็บ/ไม่เจ็บ choice →
heal or stand → WASD tutorial → explore → "เธอมองเห็นทางมั้ย" → bottle appears → pickup →
closing letter → black.

`window.__G` exposes live state for debugging from the console. It is intentionally shipped.

## Sprite generation

`tools/make-night-witch-sprites.js` is the source of truth for the character PNGs — edit the
generator, not the images. It is a small pixel DSL: `rect`/`row` build cell lists, `shape()`
outlines them in `K` and fills, a 16-colour palette `P` is shared by every frame. Originally
Codex's; the walk poses and the side profile are later revisions. Writes PNG bytes by hand
via `zlib`, no dependencies.

ART-DIRECTION.md now describes current design and chosen character/map/portrait sets. art-prompts.txt and art-prompts-pixel-v3.txt are archived orphan-branch prompts, not new-design instructions. Old forest-clearing.png/index.before-visual-update.html references are historical/missing, not files to pretend exist.

## Working with the owner

Thai, informal. They send reference images in batches and say when the batch is done —
acknowledge and wait rather than starting work mid-batch. They work with Codex in parallel on
the same folder; check file mtimes before overwriting anything, and back up before a rewrite
(`index_v1_backup.html` exists because of one such overwrite). Character art is Codex's lane
as of 2026-09-17.
