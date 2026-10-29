"""Native approved-source detail cutouts; no new locations or reference overwrite."""
from pathlib import Path
from PIL import Image, ImageDraw
import json, hashlib
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'design/maps/2026-10-08-v1/01-r00-forest-and-sacred-grove-v1b.png'
PACK=ROOT/'assets/maps/r00-details-v1'
PACK.mkdir(parents=True,exist_ok=True)
im=Image.open(SOURCE).convert('RGBA')
# Hand-bounded decorative groups visible in the approved layout; no rewards.
regions=[
 ('landing-bed',(256,440,414,526),'plant'),
 ('west-crystal',(144,386,190,435),'plant'),
 ('landing-south',(197,553,235,596),'plant'),
 ('landing-east',(409,536,450,564),'plant'),
 ('origin-north',(297,364,348,406),'plant'),
 ('origin-east',(387,380,427,413),'plant'),
 ('origin-south',(222,653,278,689),'plant'),
 ('left-loop',(141,730,171,758),'plant'),
 ('left-loop-east',(261,751,305,802),'plant'),
 ('hollow-left',(624,392,653,432),'plant'),
 ('hollow-right',(731,390,777,432),'plant'),
 ('stone-crystal',(1018,424,1067,469),'plant'),
 ('stone-west',(843,471,882,512),'plant'),
 ('grove-left',(823,194,865,225),'plant'),
 ('grove-bed',(1025,193,1059,240),'plant'),
 ('grove-chest-right',(1090,191,1128,244),'plant'),
 ('grove-east',(1131,244,1185,273),'plant'),
 ('grove-central',(951,165,1016,211),'plant'),
 ('grove-stairs',(969,303,1000,332),'plant'),
 ('lower-stone',(888,547,925,587),'plant'),
 ('lower-lantern',(1026,544,1068,580),'plant'),
 ('rift-west',(1323,579,1375,620),'plant'),
 ('rift-south',(1407,570,1465,613),'plant'),
 ('landing-bench',(229,553,280,589),'wood'),
 ('north-bench',(312,391,365,419),'wood'),
]
objects={}
for name,rect,kind in regions:
    tile=im.crop(rect);px=tile.load()
    for y in range(tile.height):
        for x in range(tile.width):
            r,g,b,a=px[x,y]
            if kind=='plant':
                cyan=b>95 and g>70 and b>r*1.65 and g>r*1.3
                green=g>r*1.5 and g>b*1.12 and g>42
                # Preserve violet rock pixels in central flower bed only.
                rock=name=='landing-bed' and b>g*1.35 and r>g*1.15 and 30<r<170
                keep=cyan or green or rock
            else:keep=r>g*1.08 and r>b*1.02 and 30<r<190
            if not keep:px[x,y]=(0,0,0,0)
    # Remove disconnected extraction speckles smaller than 4 pixels.
    seen=set()
    for y in range(tile.height):
        for x in range(tile.width):
            if (x,y) in seen or not px[x,y][3]:continue
            group=[];stack=[(x,y)];seen.add((x,y))
            while stack:
                u,v=stack.pop();group.append((u,v))
                for du,dv in [(1,0),(-1,0),(0,1),(0,-1)]:
                    q=(u+du,v+dv)
                    if 0<=q[0]<tile.width and 0<=q[1]<tile.height and q not in seen and px[q[0],q[1]][3]:seen.add(q);stack.append(q)
            if len(group)<4:
                for u,v in group:px[u,v]=(0,0,0,0)
    tile.save(PACK/(name+'.png'))
    objects[name]={'file':name+'.png','sourceRect':list(rect),'layer':'ground-detail','nativeSize':list(tile.size),'sourceRgbPreserved':True,'binaryAlpha':True}
for name,rect,polygon in [
 ('grove-cave',(1028,75,1101,158),[(1034,100),(1048,81),(1071,77),(1090,91),(1096,121),(1099,144),(1087,154),(1066,155),(1047,146),(1030,144)]),
 ('grove-twin-stones',(837,72,969,204),[(843,137),(862,107),(887,86),(901,84),(901,166),(911,176),(914,118),(915,78),(934,86),(945,109),(952,144),(965,180),(960,195),(929,201),(909,192),(888,202),(856,196),(839,173)]),
 ('memory-crystal',(1401,188,1435,241),[(1408,212),(1417,192),(1425,204),(1428,218),(1432,226),(1432,235),(1419,240),(1404,237),(1403,222)]),
]:
    tile=im.crop(rect);mask=Image.new('L',tile.size);ImageDraw.Draw(mask).polygon([(x-rect[0],y-rect[1])for x,y in polygon],fill=255);tile.putalpha(mask);tile.save(PACK/(name+'.png'))
    objects[name]={'file':name+'.png','sourceRect':list(rect),'layer':'landmark','nativeSize':list(tile.size),'sourceRgbPreserved':True,'binaryAlpha':True,'sourcePolygon':polygon}
manifest={'version':'UF-R00-DETAILS-V1-2026-10-10','source':SOURCE.relative_to(ROOT).as_posix(),'sourceSha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'objects':objects,'layoutUnchanged':True,'method':'Native source cutouts, material mask, removal of isolated extraction speckles; not full-map backdrop. Invisible original pixels are not reconstructed.'}
(PACK/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Extracted {len(objects)} original-position decorative components')
