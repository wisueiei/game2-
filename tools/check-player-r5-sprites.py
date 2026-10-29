"""Read-only asset checks. This is not a game/runtime acceptance test."""
from pathlib import Path
import hashlib
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PACK = ROOT / "assets/characters/player-r5/v1"


def check():
    manifest = json.loads((PACK / "manifest.json").read_text(encoding="utf-8"))
    directions = ["front", "back", "left", "right"]
    expected = {f"{d}-{p}" for d in directions for p in ["idle", "walk-a", "walk-b"]} | {"fall", "lie", "sit", "rise", "pickup", "hold"}
    assert set(manifest["frames"]) == expected
    assert len(list((PACK / "frames").glob("*.png"))) == 18
    palette = {(*bytes.fromhex(value.removeprefix("#")), 255) for value in manifest["palette"]}
    assert len(palette) == 24
    status = manifest["status"]
    for key in ["exported", "installedInGame", "gameplayValidated"]:
        assert type(status[key]) is bool, f"status.{key} must be boolean"
    assert status["exported"] is True
    if status["installedInGame"]:
        scope = status.get("installationScope")
        assert isinstance(scope, str) and "index_new.html" in scope and "CH00" in scope, "Installed assets must name their CH00 consumer"
        assert "index.html unchanged" in scope, "Installation scope must preserve the original game"
    if status["gameplayValidated"]:
        assert status["installedInGame"], "Gameplay validation requires an installed consumer"
        collider = manifest["footColliderDefault"]
        assert type(collider["runtimeValidated"]) is bool
        assert isinstance(collider.get("validationScope"), str) and "CH00" in collider["validationScope"], "Gameplay evidence must state its chapter scope"
    atlas_images = {name: Image.open(PACK / name) for name in ["player-r5-walk-atlas.png", "player-r5-story-atlas.png"]}
    assert atlas_images["player-r5-walk-atlas.png"].size == (72, 128)
    assert atlas_images["player-r5-story-atlas.png"].size == (120, 64)
    images, colors = {}, set()
    for name, data in manifest["frames"].items():
        image = Image.open(PACK / data["file"])
        assert image.mode == "RGBA", name
        assert image.size == ((24, 32) if data["role"] == "world" else (40, 32)), name
        pixels = set(image.get_flattened_data())
        assert {p[3] for p in pixels} == {0, 255}, name
        assert {p for p in pixels if p[3] == 0} == {(0, 0, 0, 0)}, name
        assert (pixels - {(0, 0, 0, 0)}) <= palette, name
        colors |= pixels - {(0, 0, 0, 0)}
        assert data["pivot"] == [image.width // 2, 32], name
        assert data["opaqueBounds"] == list(image.getchannel("A").getbbox()), name
        x, y, w, h = data["rect"]
        atlas = atlas_images[data["atlas"]]
        assert x >= 0 and y >= 0 and x + w <= atlas.width and y + h <= atlas.height, name
        assert atlas.crop((x, y, x + w, y + h)).tobytes() == image.tobytes(), name
        images[name] = image
    for direction in directions:
        idle, a, b = [images[f"{direction}-{p}"] for p in ["idle", "walk-a", "walk-b"]]
        assert len({i.tobytes() for i in [idle, a, b]}) == 3, direction
        assert all(idle.crop((0, 0, 24, 14)).tobytes() == i.crop((0, 0, 24, 14)).tobytes() for i in [a, b]), direction
        assert manifest["animations"][f"walk-{direction}"]["frames"] == [f"{direction}-idle", f"{direction}-walk-a", f"{direction}-idle", f"{direction}-walk-b"]
    for direction in ["front", "back"]:
        a, b = [images[f"{direction}-{p}"].getchannel("A") for p in ["walk-a", "walk-b"]]
        assert a.crop((0, 27, 11, 32)).getbbox()[3] > a.crop((13, 27, 24, 32)).getbbox()[3]
        assert b.crop((0, 27, 11, 32)).getbbox()[3] < b.crop((13, 27, 24, 32)).getbbox()[3]
    assert manifest["walkProportions"]["lowerSpanAfter"] == 7
    assert manifest["walkProportions"]["storyPosesChanged"] is False
    for alias, target in manifest["aliases"].items():
        assert target in images and alias not in images
    for key, relative in [("walk", "source/walk-generated.png"), ("story", "source/story-generated.png")]:
        assert hashlib.sha256((PACK / relative).read_bytes()).hexdigest() == manifest["provenance"]["sourceHashes"][key]
    print(f"PASS: 18 native RGBA PNGs + 2 matching atlases; binary alpha; {len(colors)}/24 palette colors; 4 distinct walk cycles; aliases/source hashes OK")
    print("Not checked here: gameplay, collision, chapter transitions, or final art approval.")


if __name__ == "__main__":
    check()
