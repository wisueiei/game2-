"""Native STAT-only pixel portrait from imagegen; does not alter R5 walk/story art.

Uses the owner's previously approved deterministic pixel-cleanup pipeline.
Pillow required. Source/ref PNGs stay unchanged in assets/characters/player-stat/v1/source.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PACK = ROOT / "assets/characters/player-stat/v1"


def export():
    source = Image.open(PACK / "source/stat-generated.png").convert("RGBA")
    foreground = source.getchannel("A").point(lambda n: 255 if n >= 230 else 0)
    box = foreground.getbbox()
    crop = source.crop(box)
    scale = min(60 / crop.width, 108 / crop.height)
    small = crop.resize((round(crop.width * scale), round(crop.height * scale)), Image.Resampling.NEAREST)
    opaque = [rgb[:3] for rgb in small.get_flattened_data() if rgb[3] >= 230]
    pool = Image.new("RGB", (len(opaque), 1))
    pool.putdata(opaque)
    paletted = pool.quantize(colors=32, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    palette_bytes = paletted.getpalette()
    palette = [tuple(palette_bytes[i * 3:i * 3 + 3]) for i in range(len(paletted.getcolors()))]
    frame = Image.new("RGBA", (64, 112), (0, 0, 0, 0))
    offset = ((64 - small.width) // 2, (112 - small.height) // 2)
    cache = {}
    for y in range(small.height):
        for x in range(small.width):
            r, g, b, a = small.getpixel((x, y))
            if a < 230:
                continue
            rgb = (r, g, b)
            if rgb not in cache:
                cache[rgb] = min(palette, key=lambda p: sum((p[i] - rgb[i]) ** 2 for i in range(3)))
            frame.putpixel((x + offset[0], y + offset[1]), (*cache[rgb], 255))
    output = PACK / "player-stat-star-64x112.png"
    frame.save(output)
    frame.resize((256, 448), Image.Resampling.NEAREST).save(PACK / "stat-preview-4x.png")
    pixels = set(frame.get_flattened_data())
    assert {p[3] for p in pixels} == {0, 255}
    assert len(pixels - {(0, 0, 0, 0)}) <= 32
    print(f"PASS: {output} — RGBA 64x112, binary alpha, {len(pixels)-1}/32 colors; crop={box}")


if __name__ == "__main__":
    export()
