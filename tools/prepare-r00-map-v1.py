"""Prepare the approved R00 v1b art without altering pixels outside listed edits.

The cleanup image is an imagegen edit already reviewed by the owner. It is used
only as a source of localized patches, never as a replacement for the map.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "design/maps/2026-10-08-v1/01-r00-forest-and-sacred-grove-v1b.png"
PACK = ROOT / "assets/maps/r00-v1"
SOURCE_CROP = (18, 50, 1516, 952)
SOURCE_SHA256 = "1847f7131a5852919acd1e77eb7cc1d31728bde38e47b3b857321decee31faf4"
VERSION = "UF-R00-V1B-2026-10-09"

# Coordinates are in the approved 1536 x 1024 source, [left, top, right, bottom).
# These deliberately small patches are the ONLY permitted background changes.
CLEANUP_RECTS = [
    ("c1-chest", (668, 377, 700, 407)),
    ("c1-label", (700, 373, 735, 397)),
    ("c2-label", (528, 184, 564, 214)),
    ("c3-label", (205, 765, 240, 796)),
    ("c4-chest", (1058, 169, 1091, 201)),
    ("c4-label", (1090, 166, 1124, 192)),
    ("s1-label", (1145, 231, 1180, 255)),
    ("m1-label", (1433, 214, 1473, 239)),
    ("from-start-label", (7, 469, 82, 507)),
    ("prototype-player", (280, 509, 314, 562)),
    ("prototype-hooded", (980, 539, 1044, 609)),
    ("stone-door-face", (927, 385, 978, 477)),
    ("main-rift-label", (1401, 343, 1521, 380)),
    ("prototype-purple-rift", (1375, 377, 1521, 563)),
]

STONE_POLYGON = [
    (929, 389), (941, 386), (947, 390), (953, 387), (961, 390),
    (971, 388), (975, 394), (976, 467), (969, 474), (928, 474),
]
RIFT_CORE_POLYGON = [
    (1450, 392), (1481, 449), (1478, 464), (1450, 508),
    (1419, 463), (1421, 451),
]


def file_sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def purple_rift_mask(original: Image.Image, rect: tuple[int, int, int, int]) -> Image.Image:
    """Retain uncolored surrounding foliage; select the original purple pixels.

    Opaque original interior pixels are kept with a polygon. The colored sparks
    and bloom use a binary selection, so the source art is never recolored.
    """
    mask = Image.new("L", original.size, 0)
    px = original.load()
    out = mask.load()
    left, top, right, bottom = rect
    for y in range(top, bottom):
        for x in range(left, right):
            r, g, b, _ = px[x, y]
            if r > 8 and r > g * 1.25 + 2 and b > g * 1.3 + 3 and b > r * 0.55:
                out[x, y] = 255
    ImageDraw.Draw(mask).polygon(RIFT_CORE_POLYGON, fill=255)
    return mask


def sprite(original: Image.Image, name: str, rect: tuple[int, int, int, int],
           pivot: tuple[int, int], polygon: list[tuple[int, int]] | None = None,
           source_mask: Image.Image | None = None) -> dict:
    tile = original.crop(rect)
    if source_mask is not None:
        mask = source_mask.crop(rect)
    else:
        mask = Image.new("L", tile.size, 0)
        if polygon is None:
            polygon = [(0, 3), (3, 0), (tile.width - 4, 0),
                       (tile.width - 1, 3), (tile.width - 1, tile.height - 3),
                       (tile.width - 4, tile.height - 1), (1, tile.height - 1)]
        ImageDraw.Draw(mask).polygon(polygon, fill=255)
    tile.putalpha(mask)
    filename = f"{name}.png"
    tile.save(PACK / filename)
    expected = original.crop(rect).convert("RGB")
    rgb_difference = ImageChops.difference(tile.convert("RGB"), expected)
    assert rgb_difference.getbbox() is None, f"Sprite recolored original pixels: {name}"
    assert not sum(mask.histogram()[1:255]), f"Sprite alpha is not binary: {name}"
    return {
        "file": filename,
        "width": tile.width,
        "height": tile.height,
        "sourceRect": list(rect),
        "sourcePivot": [rect[0] + pivot[0], rect[1] + pivot[1]],
        "pivot": list(pivot),
        "opaquePixels": mask.histogram()[255],
        "alphaValues": [0, 255],
        "opaqueRgbMatchesApprovedSource": True,
        "sha256": file_sha256(PACK / filename),
    }


def build(original: Image.Image, cleanup: Image.Image, cleanup_reference: str) -> dict:
    mask = Image.new("L", original.size, 0)
    draw = ImageDraw.Draw(mask)
    patches = []
    rift_mask = None
    for name, rect in CLEANUP_RECTS:
        geometry = "rectangle"
        if name == "stone-door-face":
            draw.polygon(STONE_POLYGON, fill=255)
            geometry = "polygon-within-rectangle"
        elif name == "prototype-purple-rift":
            rift_mask = purple_rift_mask(original, rect)
            mask = ImageChops.lighter(mask, rift_mask)
            draw = ImageDraw.Draw(mask)
            geometry = "original-purple-pixels-and-core-polygon-within-rectangle"
        else:
            # PIL rectangles are inclusive, while this manifest uses exclusive ends.
            draw.rectangle((rect[0], rect[1], rect[2] - 1, rect[3] - 1), fill=255)
        entry = {"id": name, "sourceRect": list(rect), "geometry": geometry}
        if name == "stone-door-face":
            entry["sourcePolygon"] = [list(point) for point in STONE_POLYGON]
        if name == "prototype-purple-rift":
            entry["sourceCorePolygon"] = [list(point) for point in RIFT_CORE_POLYGON]
            entry["purplePixelRule"] = "r>8 && r>g*1.25+2 && b>g*1.3+3 && b>r*0.55"
        patches.append(entry)

    prepared = Image.composite(cleanup, original, mask)
    difference = ImageChops.difference(prepared.convert("RGB"), original.convert("RGB"))
    r, g, b = difference.split()
    maximum = ImageChops.lighter(ImageChops.lighter(r, g), b)
    changed = maximum.point(lambda value: 255 if value else 0)
    outside_difference = ImageChops.multiply(changed, ImageChops.invert(mask))
    assert outside_difference.getbbox() is None, "Approved pixels changed outside the explicit mask"
    black = Image.new("RGBA", original.size, (0, 0, 0, 0))
    original_outside = Image.composite(original, black, ImageChops.invert(mask))
    prepared_outside = Image.composite(prepared, black, ImageChops.invert(mask))
    outside_original_sha = hashlib.sha256(original_outside.tobytes()).hexdigest()
    outside_prepared_sha = hashlib.sha256(prepared_outside.tobytes()).hexdigest()
    assert outside_original_sha == outside_prepared_sha

    background = prepared.crop(SOURCE_CROP)
    assert background.size == (1498, 902)
    background.save(PACK / "background.png")
    mask.save(PACK / "cleanup-mask-source.png")
    mask.crop(SOURCE_CROP).save(PACK / "cleanup-mask.png")

    sprites = {}
    for name, rect in (
        ("chest-c1-closed", (668, 377, 700, 407)),
        ("chest-c2-closed", (496, 190, 527, 218)),
        ("chest-c3-closed", (171, 768, 202, 800)),
        ("chest-c4-closed", (1058, 169, 1091, 201)),
    ):
        w, h = rect[2] - rect[0], rect[3] - rect[1]
        sprites[name] = sprite(original, name, rect, (w // 2, h - 1))
    stone_rect = (927, 385, 978, 477)
    stone_polygon = [(x - stone_rect[0], y - stone_rect[1]) for x, y in STONE_POLYGON]
    sprites["stone-door-closed"] = sprite(original, "stone-door-closed", stone_rect,
                                           (25, 89), polygon=stone_polygon)
    assert rift_mask is not None
    sprites["rift-purple"] = sprite(original, "rift-purple", (1375, 377, 1521, 563),
                                     (75, 136), source_mask=rift_mask)
    # A simple shared alias for clients that need only the C1 chest appearance.
    shutil.copyfile(PACK / "chest-c1-closed.png", PACK / "chest-closed.png")
    sprites["chest-closed"] = {**sprites["chest-c1-closed"], "file": "chest-closed.png"}

    manifest = {
        "schema": "underfall.map-assets.v1",
        "version": VERSION,
        "status": "prepared-approved-art-runtime-validation-separate",
        "documentation": {
            "id": "20261009-r00-v1-runtime-manifest",
            "updated": "2026-10-09",
            "status": "prepared-reference-faithful",
            "summary": "ภาพพื้นโลกR00จากv1bและสไปรต์แยกจากต้นฉบับ พร้อมmaskcleanupและหลักฐานพิกเซลนอกmaskไม่เปลี่ยน",
        },
        "approvedSource": {
            "file": SOURCE.relative_to(ROOT).as_posix(),
            "width": 1536,
            "height": 1024,
            "sha256": SOURCE_SHA256,
            "unchanged": file_sha256(SOURCE) == SOURCE_SHA256,
            "authority": "Owner requested design/maps/2026-10-08-v1 for implemented CH00 maps",
        },
        "cleanupSource": {
            "file": "cleanup-source.png",
            "reference": cleanup_reference,
            "width": cleanup.width,
            "height": cleanup.height,
            "sha256": file_sha256(PACK / "cleanup-source.png"),
            "usage": "Only the explicitly listed cleanup mask; never a wholesale replacement",
        },
        "background": {
            "file": "background.png",
            "width": background.width,
            "height": background.height,
            "sourceCrop": list(SOURCE_CROP),
            "sourceCropOrigin": [18, 50],
            "resized": False,
            "worldScale": 1.25,
            "worldWidth": 1872.5,
            "worldHeight": 1127.5,
            "sourceToWorld": "worldX=(sourceX-18)*1.25; worldY=(sourceY-50)*1.25",
            "sha256": file_sha256(PACK / "background.png"),
        },
        "cleanupMask": {
            "file": "cleanup-mask.png",
            "sourceFile": "cleanup-mask-source.png",
            "alphaValues": [0, 255],
            "sourceMaskPixels": mask.histogram()[255],
            "patches": patches,
        },
        "sprites": sprites,
        "verification": {
            "method": "RGBA byte equality after excluding the explicit binary source-coordinate mask",
            "pixelsChangedOutsideMask": outside_difference.histogram()[255],
            "outsideMaskExactMatch": True,
            "sourcePixelsOutsideMask": original.width * original.height - mask.histogram()[255],
            "sourcePixelsChangedInsideMask": changed.histogram()[255],
            "approvedOutsideRgbaSha256": outside_original_sha,
            "preparedOutsideRgbaSha256": outside_prepared_sha,
            "allSpriteOpaqueRgbMatchesApprovedSource": True,
            "allSpriteAlphaBinary": True,
            "sourceFileSha256AfterPreparation": file_sha256(SOURCE),
        },
        "notes": [
            "All coordinates use the approved source image and exclusive right/bottom rectangle ends.",
            "C2 and C3 chest art and the S1 save star remain baked in their approved original positions.",
            "Closed C1/C4 chests, closed stone door and prototype purple rift were separated for interaction overlays.",
            "No character pack, chapter code, story, approved source PNG or design document was modified.",
            "No claim of browser collision, gameplay or acceptance is made by this mechanical preparation.",
        ],
    }
    # Predictable integration names; sprite top-left is transformed from sourceRect.
    manifest["images"] = {
        "background": {**manifest["background"], "sourceRect": list(SOURCE_CROP), "localPivot": [0, 0]},
        "chestC1": {**sprites["chest-c1-closed"], "localPivot": sprites["chest-c1-closed"]["pivot"]},
        "chestC4": {**sprites["chest-c4-closed"], "localPivot": sprites["chest-c4-closed"]["pivot"]},
        "stoneDoor": {**sprites["stone-door-closed"], "localPivot": sprites["stone-door-closed"]["pivot"]},
        "rift": {**sprites["rift-purple"], "localPivot": sprites["rift-purple"]["pivot"]},
    }
    (PACK / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    annotated = original.convert("RGB")
    annotations = ImageDraw.Draw(annotated)
    for name, rect in CLEANUP_RECTS:
        annotations.rectangle((rect[0], rect[1], rect[2] - 1, rect[3] - 1), outline="#ff6699", width=2)
    annotations.rectangle((18, 50, 1515, 951), outline="#ffff66", width=2)
    annotated.save(PACK / "cleanup-regions-preview.png")
    inspection(original, prepared)
    return manifest


def inspection(original: Image.Image, cleanup: Image.Image) -> None:
    regions = [
        ("C1", (649, 353, 742, 420)),
        ("C2", (483, 175, 572, 222)),
        ("C3", (158, 757, 250, 809)),
        ("C4", (1041, 157, 1134, 211)),
        ("SAVE", (1128, 197, 1198, 261)),
        ("M1", (1389, 199, 1485, 259)),
        ("PLAYER", (272, 499, 321, 569)),
        ("STONE", (907, 374, 999, 487)),
        ("POSSIBLE ACTOR", (980, 539, 1040, 611)),
        ("RIFT", (1375, 339, 1515, 553)),
    ]
    width = 660
    height = sum(max(64, (rect[3] - rect[1]) * 2) + 34 for _, rect in regions)
    sheet = Image.new("RGB", (width, height), "#222430")
    draw = ImageDraw.Draw(sheet)
    y = 0
    for name, rect in regions:
        draw.text((10, y + 4), f"{name} SOURCE {rect} / CLEANUP", fill="white")
        for x, image in ((10, original), (340, cleanup)):
            tile = image.crop(rect)
            tile = tile.resize((tile.width * 2, tile.height * 2), Image.Resampling.NEAREST)
            sheet.paste(tile, (x, y + 26))
        y += max(64, (rect[3] - rect[1]) * 2) + 34
    sheet.save(PACK / "inspection-crops.png")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cleanup-source", type=Path, default=PACK / "cleanup-source.png")
    parser.add_argument("--inspect", action="store_true")
    args = parser.parse_args()
    PACK.mkdir(parents=True, exist_ok=True)
    original = Image.open(SOURCE).convert("RGBA")
    cleanup = Image.open(args.cleanup_source).convert("RGBA")
    assert original.size == cleanup.size == (1536, 1024), "Unaligned source dimensions"
    assert file_sha256(SOURCE) == SOURCE_SHA256, "Approved R00 v1b source changed unexpectedly"
    if args.inspect:
        inspection(original, cleanup)
        print(json.dumps({"inspection": str(PACK / "inspection-crops.png")}, indent=2))
        return
    cleanup_target = PACK / "cleanup-source.png"
    reference = str(args.cleanup_source)
    if args.cleanup_source.resolve() != cleanup_target.resolve():
        shutil.copyfile(args.cleanup_source, cleanup_target)
    else:
        previous = PACK / "manifest.json"
        if previous.exists():
            reference = json.loads(previous.read_text(encoding="utf-8")).get("cleanupSource", {}).get("reference", reference)
    manifest = build(original, cleanup, reference)
    print(json.dumps({
        "version": VERSION,
        "background": manifest["background"],
        "verification": manifest["verification"],
        "spriteDimensions": {key: [entry["width"], entry["height"]] for key, entry in manifest["sprites"].items()},
    }, indent=2))


if __name__ == "__main__":
    main()
