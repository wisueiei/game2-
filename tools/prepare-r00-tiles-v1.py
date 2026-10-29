"""Extract source-colored R00 building blocks for a layered scene, not a map image."""
from __future__ import annotations
import argparse
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageChops

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "design/maps/2026-10-08-v1/01-r00-forest-and-sacred-grove-v1b.png"
PACK = ROOT / "assets/maps/r00-tiles-v1"
SOURCE_SHA = "1847f7131a5852919acd1e77eb7cc1d31728bde38e47b3b857321decee31faf4"

# Source coordinates, hand-traced around the existing artwork. No new tree
# outlines, gradients, leaf colors, or trunk pixels are painted by this script.
ROOTED_CANOPY = [(686,821),(680,824),(676,829),(672,829),(671,835),(663,834),(659,838),(652,838),(652,842),(647,842),(645,850),(638,849),(640,855),(633,856),(630,862),(634,865),(630,868),(635,872),(631,877),(638,884),(637,891),(644,895),(653,894),(654,899),(662,896),(663,902),(672,897),(680,902),(688,899),(697,903),(701,896),(707,898),(713,892),(723,894),(723,887),(730,884),(727,879),(733,875),(727,868),(731,864),(724,858),(724,852),(718,852),(718,847),(711,843),(710,837),(703,838),(697,831),(691,830)]
ROOTED_TRUNK = [(676,892),(687,893),(693,901),(694,909),(695,919),(700,928),(711,934),(724,938),(724,942),(714,941),(704,939),(697,933),(696,942),(704,948),(698,952),(688,946),(684,938),(679,945),(671,950),(665,952),(667,946),(674,937),(676,931),(670,937),(657,945),(652,943),(657,939),(666,934),(676,921),(677,907),(672,899),(662,897),(668,904),(676,911)]
NW_CANOPY = [(244,225),(237,230),(232,233),(232,239),(226,242),(224,248),(214,253),(216,258),(208,264),(209,269),(203,275),(209,281),(207,286),(213,291),(219,289),(222,293),(226,287),(229,289),(231,286),(234,292),(239,286),(244,291),(247,287),(252,292),(256,286),(261,290),(264,283),(270,286),(271,281),(277,282),(276,276),(284,278),(283,271),(288,269),(283,265),(287,260),(280,255),(281,251),(273,247),(272,242),(266,238),(265,233),(257,234),(255,229),(249,231)]
NW_TRUNK = [(236,286),(248,287),(250,296),(248,304),(251,312),(257,315),(258,318),(251,317),(246,313),(244,309),(242,316),(238,319),(233,321),(231,318),(237,314),(239,308),(234,311),(228,315),(223,315),(224,312),(233,307),(235,300)]
PINE_CANOPY = [(307,200),(302,210),(297,213),(299,216),(292,222),(294,225),(285,231),(288,236),(281,242),(288,245),(294,244),(289,250),(297,250),(297,254),(288,260),(293,266),(302,265),(307,268),(313,264),(320,267),(329,263),(331,257),(336,256),(332,248),(335,245),(326,239),(327,233),(321,229),(321,223),(316,220),(318,215),(310,211),(309,204)]


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def cut(original: Image.Image, rect: tuple, polygon: list, kind: str) -> Image.Image:
    tile = original.crop(rect)
    mask = Image.new("L",tile.size,0)
    ImageDraw.Draw(mask).polygon([(x-rect[0],y-rect[1]) for x,y in polygon],fill=255)
    src,alpha=tile.load(),mask.load()
    for y in range(tile.height):
        for x in range(tile.width):
            if not alpha[x,y]: continue
            r,g,b,_=src[x,y]
            if kind=="canopy":
                # Interior dark source pixels are leaf shadows, not missing
                # background. Keep them inside the traced leaf silhouette.
                keep=True
            elif kind=="trunk":
                # Hand contours bound the wood. Retain its deep near-black
                # source shadows; reject only bright flowers/label flecks.
                keep=r<170 and g<150 and b<180
            elif kind=="wood":
                keep=r>g*1.04 and r>27 and b<r*.98
            elif kind=="stone":
                keep=r>g*.88 and 22<r<160 and b>g*.94
            else: keep=True
            if not keep: alpha[x,y]=0
    tile.putalpha(mask)
    assert not sum(mask.histogram()[1:255])
    assert ImageChops.difference(tile.convert("RGB"),original.crop(rect).convert("RGB")).getbbox() is None
    return tile


def record(file: str, tile: Image.Image, pivot: tuple, components: list, collider=(12,6)) -> dict:
    tile.save(PACK/file)
    alpha=tile.getchannel("A")
    return {"file":file,"width":tile.width,"height":tile.height,"nativeSize":[tile.width,tile.height],
            "pivot":list(pivot),"footPivot":list(pivot),"worldScale":1.25,
            "collider":{"width":collider[0],"height":collider[1],"separateFromArtwork":True},
            "alphaValues":[0,255],"opaquePixels":alpha.histogram()[255],"opaqueBounds":list(alpha.getbbox() or (0,0,0,0)),
            "components":components,"sourceRgbPreserved":True,"sha256":sha(PACK/file)}


def tree(original: Image.Image, name: str, rect: tuple, canopy_poly: list, trunk_poly: list, pivot: tuple) -> dict:
    canopy=cut(original,rect,canopy_poly,"canopy")
    trunk=cut(original,rect,trunk_poly,"trunk")
    whole=trunk.copy();whole.alpha_composite(canopy)
    components=[{"kind":"canopy","sourceRect":list(rect),"sourcePolygon":canopy_poly},
                {"kind":"trunk","sourceRect":list(rect),"sourcePolygon":trunk_poly}]
    result=record(name+".png",whole,pivot,components)
    result["canopy"]=record(name+"-canopy.png",canopy,pivot,[components[0]])
    result["trunk"]=record(name+"-trunk.png",trunk,pivot,[components[1]])
    result["sourceRect"]=list(rect)
    return result


def build(original: Image.Image) -> dict:
    trees={
        "broadleafBlue":tree(original,"tree-broadleaf-blue",(202,225,289,345),NW_CANOPY,NW_TRUNK,(39,95)),
        "rootedBlue":tree(original,"tree-rooted-blue",(627,819,738,953),ROOTED_CANOPY,ROOTED_TRUNK,(57,132)),
    }
    # The reference's conifer lower trunk is occluded by a foreground tree.
    # Reuse the ORIGINAL exposed trunk pixels as a separate component, with no
    # rescaling/recoloring; provenance states this assembly instead of pretending
    # the missing original trunk was recoverable from a flattened image.
    pine_rect=(279,198,350,270)
    canopy=cut(original,pine_rect,PINE_CANOPY,"canopy")
    trunk_rect=(650,892,726,953)
    trunk=cut(original,trunk_rect,ROOTED_TRUNK,"trunk")
    pine_size=(76,154);pine_canopy=Image.new("RGBA",pine_size);pine_trunk=Image.new("RGBA",pine_size)
    canopy_bottom=canopy.getchannel("A").getbbox()[3]
    trunk_top=trunk.getchannel("A").getbbox()[1]
    trunk_y=canopy_bottom-8-trunk_top
    pine_canopy.alpha_composite(canopy,(2,0));pine_trunk.alpha_composite(trunk,(0,trunk_y))
    pine_whole=pine_trunk.copy();pine_whole.alpha_composite(pine_canopy)
    components=[{"kind":"canopy","sourceRect":list(pine_rect),"outputOffset":[2,0],"sourcePolygon":PINE_CANOPY},
                {"kind":"trunk","sourceRect":list(trunk_rect),"outputOffset":[0,trunk_y],"sourcePolygon":ROOTED_TRUNK}]
    pivot=(34,trunk_y+59)
    trees["coniferBlue"]=record("tree-conifer-blue.png",pine_whole,pivot,components)
    trees["coniferBlue"]["assemblyNote"]="Visible original blue conifer canopy plus exposed original rooted trunk; occluded original conifer trunk cannot be recovered. No image generation, resize or recoloring."
    trees["coniferBlue"]["canopy"]=record("tree-conifer-blue-canopy.png",pine_canopy,pivot,[components[0]])
    trees["coniferBlue"]["trunk"]=record("tree-conifer-blue-trunk.png",pine_trunk,pivot,[components[1]])

    # Ancient C1 hollow tree: trace only outer crown and brown roots. The open
    # alcove remains transparent so its chest, flowers and labels are NOT copied.
    ancient_rect=(601,266,832,445)
    ancient_canopy=[(605,337),(610,310),(625,299),(637,280),(663,282),(676,269),(702,277),(721,271),(744,284),(769,283),(790,300),(811,303),(826,333),(813,353),(791,346),(779,330),(752,320),(735,311),(712,310),(688,307),(666,319),(648,331),(625,348)]
    ancient_trunk=[(608,330),(631,315),(643,319),(652,303),(667,314),(681,315),(704,307),(721,302),(740,318),(761,318),(779,338),(798,341),(817,333),(830,348),(824,362),(800,359),(781,356),(779,377),(797,399),(809,415),(821,426),(809,435),(793,434),(784,420),(777,408),(769,411),(758,428),(749,432),(747,420),(761,402),(761,383),(750,363),(739,345),(722,329),(698,329),(678,336),(667,352),(662,375),(651,396),(646,414),(637,428),(624,431),(622,423),(635,406),(636,389),(642,370),(641,351),(629,346),(619,348)]
    trees["ancientHollow"]=tree(original,"tree-ancient-hollow-blue",ancient_rect,ancient_canopy,ancient_trunk,(111,170))
    hole=[(651,344),(690,329),(723,341),(740,378),(743,418),(706,421),(650,413)]
    for entry in [trees["ancientHollow"],trees["ancientHollow"]["canopy"],trees["ancientHollow"]["trunk"]]:
        image=Image.open(PACK/entry["file"]).convert("RGBA")
        alpha=image.getchannel("A")
        ImageDraw.Draw(alpha).polygon([(x-ancient_rect[0],y-ancient_rect[1]) for x,y in hole],fill=0)
        image.putalpha(alpha);image.save(PACK/entry["file"])
        entry["opaquePixels"]=alpha.histogram()[255];entry["opaqueBounds"]=list(alpha.getbbox());entry["sha256"]=sha(PACK/entry["file"])
        entry["transparentSourceHole"]=hole

    # Small native terrain samples. Atlas cells are 32px; 16px source tokens
    # occupy their native 16px area, with transparent padding, never resized.
    terrain_specs=[
        ("grassCool",(315,513,331,529)),("grassGrove",(1169,219,1185,235)),
        ("dirtWarm",(401,458,417,474)),("dirtGrove",(1040,226,1056,242)),
        ("rockTop",(440,373,456,389)),("cliffFace",(448,391,464,423)),
        ("cliffDark",(43,559,59,591)),("waterPool",(1222,253,1238,269)),
        ("waterfall",(1230,79,1246,111)),("bridgePlank",(493,496,509,512)),
        ("stoneStair",(981,257,997,273)),("grassDark",(939,665,955,681)),
    ]
    atlas=Image.new("RGBA",(192,64));terrain={}
    for i,(name,rect) in enumerate(terrain_specs):
        tile=original.crop(rect);x=(i%6)*32;y=(i//6)*32
        atlas.alpha_composite(tile,(x,y))
        terrain[name]={"atlasRect":[x,y,tile.width,tile.height],"sourceRect":list(rect),"sourceRgbPreserved":True}
        tile.save(PACK/("terrain-"+name+".png"))
    atlas.save(PACK/"terrain-atlas.png")

    objects={}
    for name,rect,kind,poly,pivot in [
        ("bridgeHorizontal",(475,490,543,537),"wood",[(475,491),(540,491),(543,532),(537,536),(475,535)],(34,45)),
        ("stoneStairs",(973,250,1018,301),"stone",[(977,251),(1011,251),(1014,257),(1014,290),(1018,295),(1015,300),(978,300),(974,292),(974,257)],(23,49)),
    ]:
        tile=cut(original,rect,poly,kind)
        objects[name]=record("object-"+name+".png",tile,pivot,[{"sourceRect":list(rect),"sourcePolygon":poly}],collider=(0,0))
        objects[name]["sourceRect"]=list(rect)

    # A checker preview shows genuine transparent silhouettes, no map backdrop.
    preview=Image.new("RGB",(1000,380),"#353b4b");draw=ImageDraw.Draw(preview)
    for y in range(32,370,16):
        for x in range(0,1000,16):
            if (x//16+y//16)%2: draw.rectangle((x,y,x+15,y+15),fill="#252b3b")
    xpos=20
    for name,entry in trees.items():
        tile=Image.open(PACK/entry["file"])
        draw.text((xpos,12),name,fill="white")
        scale=1.5;display=tile.resize((round(tile.width*scale),round(tile.height*scale)),Image.Resampling.NEAREST)
        preview.paste(display,(xpos,350-display.height),display)
        draw.text((xpos,355),str(entry["nativeSize"]),fill="white")
        xpos+=display.width+30
    preview.save(PACK/"trees-preview.png")

    manifest={"schema":"underfall.layered-map-objects.v1","version":"UF-R00-TILES-V1-2026-10-09",
        "documentation":{"id":"20261009-r00-layered-objects-manifest","updated":"2026-10-09","status":"prepared-source-derived-layered-objects","summary":"ต้นไม้และชิ้นพื้นR00จากv1bแยกโปร่งใสสำหรับฉากซ้อนเลเยอร์แบบUndertale ไม่ใช้ภาพแผนที่เต็มเป็นพื้นโลก"},
        "status":"source-derived-components-for-layered-scene-prototype",
        "source":{"file":SOURCE.relative_to(ROOT).as_posix(),"sha256":SOURCE_SHA,"size":[1536,1024],"unchanged":sha(SOURCE)==SOURCE_SHA},
        "coordinateContract":"sourceRect uses original source pixels; sprites and textures are native crops. Entity foot positions are owned by map-layout/runtime. Draw object nativeSize*1.25; depth-sort by entity footY, using footPivot. Use separate small collider, never canopy bounds.",
        "wholeMapBackgroundIncluded":False,"trees":trees,"objects":objects,
        "terrainAtlas":{"file":"terrain-atlas.png","width":192,"height":64,"cellSize":32,"tiles":terrain,"sha256":sha(PACK/"terrain-atlas.png")},
        "verification":{"binaryAlpha":True,"sourceRgbPreserved":True,"noRecoloring":True,"noResizingNativeAssets":True,"originalMapSha256Unchanged":sha(SOURCE)==SOURCE_SHA},
        "limitations":["Flattened reference cannot reveal terrain hidden by trunks/canopies; engine repeats sampled terrain tokens beneath source-derived tree objects.","Blue conifer is explicitly assembled from visible original canopy and exposed original trunk components because its reference trunk is occluded.","Terrain tokens may contain tiny existing marks from the original pixel artwork; no reconstructed unseen original background is claimed.","Art extraction does not certify runtime layout, collision, story flow or visual acceptance."]}
    (PACK/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    return manifest


def inspect(original: Image.Image) -> None:
    regions = [
        ("NW circle cluster", (198, 182, 363, 423)),
        ("NW circle right conifer", (278, 263, 378, 409)),
        ("west landing conifer", (118, 475, 225, 651)),
        ("west grove tall", (625, 290, 785, 452)),
        ("lower center broadleaf", (619, 555, 765, 721)),
        ("bottom center rooted", (641, 761, 789, 951)),
        ("east path tree", (1203, 488, 1352, 675)),
        ("bottom east conifer", (1382, 704, 1509, 899)),
    ]
    width = 760
    height = sum((rect[3]-rect[1])*2+32 for _,rect in regions)
    image = Image.new("RGB", (width,height), "#242838")
    draw = ImageDraw.Draw(image)
    y = 0
    for name, rect in regions:
        draw.text((12,y+4), f"{name}: {rect}", fill="white")
        crop = original.crop(rect)
        image.paste(crop.resize((crop.width*2,crop.height*2),Image.Resampling.NEAREST),(12,y+26))
        original.crop(rect).resize((crop.width*3,crop.height*3),Image.Resampling.NEAREST).save(PACK / ("inspection-" + name.lower().replace(" ","-") + ".png"))
        y += crop.height*2+32
    image.save(PACK / "source-object-inspection.png")
    rect=(617,790,760,953)
    original.crop(rect).resize((429,489),Image.Resampling.NEAREST).save(PACK / "inspection-rooted-target.png")
    for label,rect in [("nw-grid",(198,220,292,350)),("rooted-grid",(627,819,738,953))]:
        crop=original.crop(rect).resize(((rect[2]-rect[0])*4,(rect[3]-rect[1])*4),Image.Resampling.NEAREST)
        grid=ImageDraw.Draw(crop)
        for x in range(0,rect[2]-rect[0],10):
            grid.line((x*4,0,x*4,crop.height),fill="#ffffff55",width=1)
            grid.text((x*4+2,1),str(rect[0]+x),fill="white")
        for y in range(0,rect[3]-rect[1],10):
            grid.line((0,y*4,crop.width,y*4),fill="#ffffff55",width=1)
            grid.text((1,y*4+2),str(rect[1]+y),fill="white")
        crop.save(PACK/("inspection-"+label+".png"))


def main() -> None:
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--inspect", action="store_true")
    args=parser.parse_args()
    PACK.mkdir(parents=True,exist_ok=True)
    original=Image.open(SOURCE).convert("RGBA")
    if args.inspect:
        inspect(original)
        print("Prepared source-object-inspection.png")
        return
    assert sha(SOURCE)==SOURCE_SHA,"Approved source changed"
    manifest=build(original)
    print(json.dumps({"version":manifest["version"],"trees":{k:{"file":v["file"],"size":v["nativeSize"],"pivot":v["footPivot"]} for k,v in manifest["trees"].items()},"terrainAtlas":manifest["terrainAtlas"]["file"],"sourceUnchanged":manifest["source"]["unchanged"]},indent=2))


if __name__ == "__main__":
    main()
