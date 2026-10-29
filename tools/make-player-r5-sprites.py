"""Export the approved R5 art as native pixel sprites. Never touches the live game.

The owner explicitly approved deterministic pixel cleanup and walk correction.
Pillow is the only dependency. Source PNGs remain unchanged in the versioned pack.
Run from any directory: python tools/make-player-r5-sprites.py
"""

from pathlib import Path
import hashlib
import json

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PACK = ROOT / "assets/characters/player-r5/v1"
TRANSPARENT = (0, 0, 0, 0)
ALPHA_THRESHOLD = 230
PALETTE_HEX = [
    "160f22", "542938", "753846", "984b47", "b65e49",
    "26253d", "373253", "494572", "5c5387",
    "b33767", "e25483", "f079a0", "382a37", "4b303d",
    "dfa079", "f3be90", "ffdeb0", "5a2e32", "793c33", "a0543b",
    "d5f9ff", "63d2ec", "377cff", "913ef3",
]
PALETTE = [tuple(bytes.fromhex(value)) for value in PALETTE_HEX]
WALK_BOXES = [
    (416, 20, 533, 255), (705, 20, 823, 255), (1001, 20, 1117, 255),
    (416, 269, 537, 505), (707, 269, 829, 505), (1001, 269, 1121, 505),
    (421, 517, 537, 754), (700, 517, 819, 753), (991, 517, 1113, 753),
    (405, 769, 527, 1009), (699, 769, 824, 1007), (992, 769, 1118, 1008),
]
STORY_BOXES = [
    (101, 134, 466, 499), (560, 289, 1035, 477), (1141, 176, 1455, 492),
    (127, 598, 429, 920), (667, 581, 930, 922), (1170, 513, 1376, 953),
]
STORY_NAMES = ["fall", "lie", "sit", "rise", "pickup", "hold"]


def native_frame(image, box, scale, canvas_size, anchor):
    """Threshold away haze, nearest-neighbor sample, then map to one shared palette."""
    crop = image.crop(box)
    scaled = crop.resize((round(crop.width * scale), round(crop.height * scale)), Image.Resampling.NEAREST)
    result = Image.new("RGBA", canvas_size, TRANSPARENT)
    x = round(anchor[0] - scaled.width / 2)
    y = anchor[1] - scaled.height
    if x < 0 or y < 0 or x + scaled.width > canvas_size[0]:
        raise ValueError(f"Pose does not fit {canvas_size}: {box}")
    cache = {}
    for sy in range(scaled.height):
        for sx in range(scaled.width):
            r, g, b, a = scaled.getpixel((sx, sy))
            if a < ALPHA_THRESHOLD:
                continue
            rgb = (r, g, b)
            if rgb not in cache:
                cache[rgb] = min(PALETTE, key=lambda p: sum((p[i] - rgb[i]) ** 2 for i in range(3)))
            result.putpixel((x + sx, y + sy), (*cache[rgb], 255))
    return result


def fix_walk(frames):
    """Use stable heads and opposite front/back leg contacts; fix profile passing pose."""
    def cells(image, coordinates, color):
        # Crisp one-pixel outline, only on the transparent edge of this new part.
        coordinates = set(coordinates)
        for x, y in coordinates:
            for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < 24 and 0 <= ny < 32 and image.getpixel((nx, ny))[3] == 0:
                    image.putpixel((nx, ny), (*PALETTE[0], 255))
        for x, y in coordinates:
            image.putpixel((x, y), (*PALETTE[color], 255))

    def front_legs(image, lifted):
        image.paste(TRANSPARENT, (0, 23, 24, 32))
        for side, x in enumerate([9, 14]):
            boot_y = 27 if lifted == side else 29
            cells(image, [(px, y) for y in range(23, boot_y) for px in [x, x + 1]], 15)
            for y in range(23, boot_y):
                image.putpixel((x + 1, y), (*PALETTE[16], 255))
            cells(image, [(px, boot_y) for px in range(x - 1, x + 3)] + [(px, boot_y + 1) for px in range(x - 1, x + 3)], 18)
            image.putpixel((x, boot_y), (*PALETTE[19], 255))

    for direction in ["front", "back"]:
        idle = frames[f"{direction}-idle"]
        step = frames[f"{direction}-walk-a"]
        step.paste(idle.crop((0, 0, 24, 14)), (0, 0))
        front_legs(idle, None)
        front_legs(step, 1)
        reverse = step.copy()
        reverse.paste(step.crop((0, 14, 24, 32)).transpose(Image.Transpose.FLIP_LEFT_RIGHT), (0, 14))
        frames[f"{direction}-walk-b"] = reverse
    # Profile B is a passing step, not a nearly identical second contact frame.
    # The raised boot is shortened and offset; head/outfit are not mirrored.
    for direction in ["left", "right"]:
        idle = frames[f"{direction}-idle"]
        step = frames[f"{direction}-walk-a"]
        step.paste(idle.crop((0, 0, 24, 14)), (0, 0))
        passing = step.copy()
        passing.paste(TRANSPARENT, (0, 23, 24, 32))
        # Make the right-facing passing legs once; mirror this part only for left.
        # Both legs remain bare, the raised low shoe stays visibly off the ground.
        legs = Image.new("RGBA", (24, 32), TRANSPARENT)
        cells(legs, [(12, 23), (13, 23), (11, 24), (12, 24)] + [(x, y) for y in range(25, 29) for x in [10, 11]], 14)
        cells(legs, [(x, y) for y in [29, 30] for x in range(9, 13)], 18)
        cells(legs, [(13, 23), (14, 23), (13, 24), (14, 24), (14, 25), (15, 25), (15, 26), (16, 26)], 15)
        cells(legs, [(x, y) for y in [27, 28] for x in range(16, 20)], 18)
        legs.putpixel((17, 27), (*PALETTE[19], 255))
        if direction == "left":
            legs = legs.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
        passing.alpha_composite(legs)
        frames[f"{direction}-walk-b"] = passing
    return frames


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def refine_walk_proportions(frames):
    """Owner's r2: lower span 9->7px, slim calves, narrower stance/stride.

    Upper-body pixels are untouched, then moved down 2px to retain the foot pivot.
    This is applied only to the 12 world sprites, never to the six story poses.
    """
    def part(image, points, color):
        for x, y in points:
            for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < 24 and 23 <= ny < 30 and image.getpixel((nx, ny))[3] == 0:
                    image.putpixel((nx, ny), (*PALETTE[0], 255))
        for x, y in points:
            image.putpixel((x, y), (*PALETTE[color], 255))

    def shoe(image, x, y):
        part(image, [(x, y), (x, y + 1), (x + 1, y + 1)], 18)
        image.putpixel((x, y), (*PALETTE[19], 255))

    for direction in ["front", "back", "left", "right"]:
        for pose in ["idle", "walk-a", "walk-b"]:
            name = f"{direction}-{pose}"
            image = frames[name].copy()
            image.paste(TRANSPARENT, (0, 23, 24, 32))
            legs = Image.new("RGBA", (24, 32), TRANSPARENT)
            if direction in ["front", "back"]:
                lifted = 1 if pose == "walk-a" else 0 if pose == "walk-b" else None
                for side, x in enumerate([10, 13]):
                    boot_y = 25 if lifted == side else 27
                    part(legs, [(x, y) for y in range(23, boot_y)], 16 if side == 1 else 15)
                    shoe(legs, x, boot_y)
            else:
                if pose == "idle":
                    part(legs, [(13, y) for y in range(23, 27)], 15)
                    shoe(legs, 13, 27)
                elif pose == "walk-a":
                    part(legs, [(12, 23), (11, 24), (10, 25), (10, 26)], 14)
                    shoe(legs, 10, 27)
                    part(legs, [(14, 23), (14, 24), (15, 25), (15, 26)], 16)
                    shoe(legs, 15, 27)
                else:
                    part(legs, [(12, y) for y in range(23, 27)], 14)
                    shoe(legs, 12, 27)
                    part(legs, [(14, 23), (14, 24), (15, 25)], 16)
                    shoe(legs, 15, 26)
                if direction == "left":
                    legs = legs.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
            image.alpha_composite(legs)
            anchored = Image.new("RGBA", (24, 32), TRANSPARENT)
            anchored.paste(image.crop((0, 0, 24, 30)), (0, 2))
            frames[name] = anchored
    return frames


def export():
    walk_source = PACK / "source/walk-generated.png"
    story_source = PACK / "source/story-generated.png"
    walk_image = Image.open(walk_source).convert("RGBA")
    story_image = Image.open(story_source).convert("RGBA")
    directions = ["front", "back", "left", "right"]
    poses = ["idle", "walk-a", "walk-b"]
    frames = {}
    # Shared scale, never individually enlarge walking frames or seated heads.
    for i, box in enumerate(WALK_BOXES):
        frames[f"{directions[i // 3]}-{poses[i % 3]}"] = native_frame(walk_image, box, 32 / 240, (24, 32), (12, 32))
    frames = fix_walk(frames)
    frames = refine_walk_proportions(frames)
    for name, box in zip(STORY_NAMES, STORY_BOXES):
        frames[name] = native_frame(story_image, box, 32 / 440, (40, 32), (20, 32))
    (PACK / "frames").mkdir(parents=True, exist_ok=True)
    walk_atlas = Image.new("RGBA", (72, 128), TRANSPARENT)
    story_atlas = Image.new("RGBA", (120, 64), TRANSPARENT)
    frame_info = {}
    for i, (name, frame) in enumerate(frames.items()):
        file = f"frames/player-r5-{name}.png"
        frame.save(PACK / file)
        if i < 12:
            xy, atlas_name = (i % 3 * 24, i // 3 * 32), "player-r5-walk-atlas.png"
            walk_atlas.paste(frame, xy)
        else:
            j = i - 12
            xy, atlas_name = (j % 3 * 40, j // 3 * 32), "player-r5-story-atlas.png"
            story_atlas.paste(frame, xy)
        frame_info[name] = {
            "file": file, "atlas": atlas_name,
            "rect": [*xy, frame.width, frame.height],
            "pivot": [frame.width // 2, 32],
            "opaqueBounds": list(frame.getchannel("A").getbbox()),
            "role": "world" if i < 12 else "cutscene",
        }
    walk_atlas.save(PACK / "player-r5-walk-atlas.png")
    story_atlas.save(PACK / "player-r5-story-atlas.png")
    manifest = {
        "documentation": {
            "id": "20261009-player-r5-v1-manifest", "updated": "2026-10-09",
            "status": "exported-not-installed", "summary": "เฟรมผู้เล่นR5ขนาดจริง พิกัดatlas pivotและลำดับแอนิเมชัน ไม่เปลี่ยนเกมเดิม",
        },
        "schemaVersion": 1, "assetId": "player-r5-v1", "designBaseline": "UF-DESIGN-2026-10-09",
        "pixelRevision": "r2-shorter-narrower-legs",
        "walkProportions": {"lowerSpanBefore": 9, "lowerSpanAfter": 7, "reduction": 2 / 9, "frontCalfSpacingBefore": 5, "frontCalfSpacingAfter": 3, "calfFillWidthBefore": 2, "calfFillWidthAfter": 1, "upperBodyPixelOffset": [0, 2], "storyPosesChanged": False},
        "designReference": "../../../../design/monsters/2026-10-08-revision-05/07-player-petite-shorts-r5.png",
        "status": {"exported": True, "installedInGame": False, "gameplayValidated": False},
        "pixelFormat": "RGBA8", "alphaValues": [0, 255], "palette": ["#" + p for p in PALETTE_HEX],
        "nativeUnits": "logical-pixels", "imageSmoothingEnabled": False,
        "worldCanvas": [24, 32], "storyCanvas": [40, 32],
        "aliases": {
            **{f"{d}-walk": f"{d}-walk-a" for d in directions},
            **{f"{d}-walk2": f"{d}-walk-b" for d in directions},
            "bottle-pickup": "pickup",
        },
        "footColliderDefault": {"offsetFromPivot": [-6, -6], "size": [12, 6], "runtimeValidated": False},
        "frames": frame_info,
        "animations": {
            **{f"walk-{d}": {"frames": [f"{d}-idle", f"{d}-walk-a", f"{d}-idle", f"{d}-walk-b"], "frameDurationMs": 140, "loop": True} for d in directions},
            "landing": {"frames": ["fall", "lie", "sit", "rise", "front-idle"], "frameDurationsMs": [650, 450, 550, 450, 500], "loop": False, "timing": "preview-default-only; actual scene controls timing"},
            "collect-bottle": {"frames": ["pickup", "hold", "front-idle"], "frameDurationsMs": [450, 650, 400], "loop": False, "timing": "preview-default-only; actual scene controls timing"},
        },
        "provenance": {
            "art": "built-in imagegen drafts, deterministic cleanup explicitly authorized by owner",
            "generator": "../../../../tools/make-player-r5-sprites.py",
            "sourceAlphaThreshold": ALPHA_THRESHOLD,
            "sourceRects": {"walk": WALK_BOXES, "story": STORY_BOXES},
            "sourceHashes": {"walk": sha256(walk_source), "story": sha256(story_source)},
            "sourceScale": {"walk": 32 / 240, "story": 32 / 440},
        },
    }
    (PACK / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    # The large review board is not a game atlas; it only enlarges actual native PNGs.
    board = Image.new("RGBA", (768, 960), (20, 23, 35, 255))
    draw = ImageDraw.Draw(board)
    for y in range(0, 960, 16):
        for x in range(0, 768, 16):
            if (x // 16 + y // 16) % 2:
                draw.rectangle((x, y, x + 15, y + 15), fill=(31, 34, 47, 255))
    for i, (name, frame) in enumerate(frames.items()):
        scale = 4
        x, y = i % 3 * 256 + (256 - frame.width * scale) // 2, 12 + i // 3 * 160
        board.alpha_composite(frame.resize((frame.width * scale, frame.height * scale), Image.Resampling.NEAREST), (x, y))
        draw.text((i % 3 * 256 + (256 - len(name) * 6) // 2, y + 134), name, fill=(210, 216, 230, 255))
    board.convert("RGB").save(PACK / "preview-board.png")
    board.crop((0, 0, 768, 640)).convert("RGB").save(PACK / "preview-walk.png")
    print(f"Exported {len(frames)} native frames, two atlases, manifest and review board to {PACK}")


if __name__ == "__main__":
    export()
