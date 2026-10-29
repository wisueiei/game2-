"""Extract quiet material samples and flower objects from approved source pixels.
No map layout, tree/character pixels, or approved source image is rewritten.
"""
from pathlib import Path
from PIL import Image, ImageStat
import hashlib, json

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'design/maps/2026-10-08-v1/01-r00-forest-and-sacred-grove-v1b.png'
PACK=ROOT/'assets/maps/r00-surfaces-v2'

def material_ok(rgb,kind):
    r,g,b=rgb
    if kind=='warm': return r>=75 and g>=55 and r>g*1.01 and g>b*1.02
    if kind=='grove': return 40<g<155 and r>=30 and g>r*.95 and b<g*1.22 and b<r+45
    return 12<g<105 and g>r*1.08 and b<g*1.18 and b<r+32

def quiet_crop(image,regions,kind):
    best=None
    size=16 if kind=='warm' else 8
    for x0,y0,x1,y1 in regions:
        for y in range(y0,y1-size+1,2):
            for x in range(x0,x1-size+1,2):
                crop=image.crop((x,y,x+size,y+size)).convert('RGB')
                pixels=list(crop.get_flattened_data())
                fraction=sum(material_ok(p,kind) for p in pixels)/(size*size)
                var=sum(ImageStat.Stat(crop).var)/3
                score=fraction*1000-var
                if best is None or score>best[0]:best=(score,(x,y,x+size,y+size),crop,fraction,var)
    if best is None:raise ValueError('No candidate surface')
    return best

def flower(image,rect):
    out=image.crop(rect).convert('RGBA')
    pixels=list(out.get_flattened_data());clean=[]
    for r,g,b,a in pixels:
        blue=(b>115 and g>85 and b>r*1.25 and g>r*1.15)
        stem=(g>40 and g>r*1.4 and b<g*1.13)
        clean.append((r,g,b,255) if blue or stem else (0,0,0,0))
    out.putdata(clean)
    return out

def main():
    PACK.mkdir(parents=True,exist_ok=True)
    image=Image.open(SOURCE).convert('RGB')
    definitions={
      'dirtWarm':('warm',[(270,552,415,590),(550,493,784,529),(1255,497,1375,533)]),
      'dirtGrove':('grove',[(963,222,1016,260),(1129,249,1187,280),(1021,229,1070,258)]),
      'grassDark':('grove',[(1136,251,1183,282),(1009,222,1045,255),(944,213,982,239)]),
      'grassGrove':('grove',[(1136,251,1183,282),(1009,222,1045,255),(944,213,982,239)])}
    records={};atlas=Image.new('RGBA',(128,32))
    for i,(name,(kind,regions)) in enumerate(definitions.items()):
        _,rect,crop,fraction,var=quiet_crop(image,regions,kind)
        tile=crop.convert('RGBA').resize((16,16),Image.Resampling.NEAREST);tile.save(PACK/(name+'.png'))
        atlas.paste(tile,(i*32,0))
        records[name]={'sourceRect':list(rect),'atlasRect':[i*32,0,16,16],'materialFraction':fraction,'rgbVariance':var,'file':name+'.png','sourceRgbPreserved':True}
    atlas.save(PACK/'surface-atlas.png')
    plants={}
    for name,rect,pivot in [('blueFlower',(305,445,365,501),(30,53)),('smallBlueFlowers',(278,493,306,517),(14,23))]:
        obj=flower(image,rect);obj.save(PACK/(name+'.png'))
        plants[name]={'file':name+'.png','sourceRect':list(rect),'nativeSize':list(obj.size),'footPivot':list(pivot),'alphaValues':[0,255],'sourceRgbPreserved':True}
    preview=Image.new('RGB',(512,128),'#1b2430')
    for i,m in enumerate(records.values()):preview.paste(image.crop(m['sourceRect']).resize((128,128),Image.Resampling.NEAREST),(i*128,0))
    preview.save(PACK/'surface-preview.png')
    manifest={'version':'UF-R00-SURFACES-V2-2026-10-10','source':SOURCE.relative_to(ROOT).as_posix(),'sourceSha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'method':'Select quiet 16px original material crops, excluding distinctive cyan objects; extract separate existing flowers with binary color mask','surfaces':records,'plants':plants,'atlas':'surface-atlas.png','layoutUnchanged':True,'sourceUnchanged':True}
    manifest['documentation']={'id':'20261010-r00-surface-manifest','updated':'2026-10-10','status':'current-runtime-data','summary':'rectหย่อมพื้นR00สีเงียบและดอกไม้จากv1b พร้อมแหล่งและขอบเขตการปรับโดยไม่เปลี่ยนผัง'}
    (PACK/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(records,ensure_ascii=False))

if __name__=='__main__':main()
