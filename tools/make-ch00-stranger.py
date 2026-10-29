"""Native pixel export using the owner's previously authorized cleanup pipeline.
Never modifies the approved cast board or generated source.
"""
from pathlib import Path
from PIL import Image
import json, hashlib

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets/characters/hooded-stranger/v1'
src = Image.open(DEST / 'source.png').convert('RGBA')
alpha = src.getchannel('A').point(lambda a: 255 if a >= 230 else 0)
occupied = [alpha.crop((x, 0, x+1, src.height)).getbbox() is not None for x in range(src.width)]
ranges, begin = [], None
for x, value in enumerate(occupied + [False]):
    if value and begin is None: begin = x
    if not value and begin is not None:
        if x - begin >= 50: ranges.append((begin, x))
        begin = None
if len(ranges) != 4:
    raise RuntimeError(f'Expected four separated figures, got {ranges}')
rects = []
for x0, x1 in ranges:
    bbox = alpha.crop((x0, 0, x1, src.height)).getbbox()
    rects.append((x0+bbox[0], bbox[1], x0+bbox[2], bbox[3]))
ratio = 35 / max(r[3]-r[1] for r in rects)
atlas = Image.new('RGBA', (52*4, 40))
for i, rect in enumerate(rects):
    frame = src.crop(rect)
    frame.putalpha(alpha.crop(rect))
    frame = frame.resize((max(1, round(frame.width*ratio)), max(1, round(frame.height*ratio))), Image.Resampling.NEAREST)
    mask = frame.getchannel('A')
    rgb = frame.convert('RGB').quantize(colors=24, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).convert('RGBA')
    rgb.putalpha(mask)
    atlas.alpha_composite(rgb, (i*52 + (52-frame.width)//2, 40-frame.height))
atlas_alpha = atlas.getchannel('A')
atlas = atlas.convert('RGB').quantize(colors=24, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).convert('RGBA')
atlas.putalpha(atlas_alpha)
atlas.save(DEST / 'stranger-atlas.png')
atlas.resize((atlas.width*5, atlas.height*5), Image.Resampling.NEAREST).save(DEST / 'preview-5x.png')
info = dict(assetId='hooded-stranger-v1', nativeFrame=[52,40], pivot=[26,40], poses=['idle','limp','lunge','kick'], alphaValues=[0,255], sourceRects=rects, sourceScale=ratio, provenance='Built-in imagegen; approved Fiw monster reference; owner-authorized native cleanup', sourceHash=hashlib.sha256((DEST/'source.png').read_bytes()).hexdigest())
info['documentation'] = dict(id='20261009-hooded-stranger-v1-manifest', updated='2026-10-09', status='installed-ch00', summary='atlasคนสวมหมวกสี่ท่า52×40 pivot26×40 alpha0/255 พร้อมแหล่งต้นฉบับและสถานะติดตั้งเฉพาะCH00')
info['status'] = dict(installedInGame=True, scope='CH00', finalSpriteArtApproved=False)
(DEST / 'manifest.json').write_text(json.dumps(info, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps(info, ensure_ascii=False))
