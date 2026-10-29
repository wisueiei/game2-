/* Reproducible CH00 build. Approved sources are read-only, never overwritten. */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const story = read('story.md').replace(/\r\n/g,'\n');
function section(heading, depth) {
  const start = story.indexOf(heading);
  if (start < 0) throw Error('Missing story heading: '+heading);
  const end = story.indexOf('\n'+ '#'.repeat(depth)+' ', start+heading.length);
  return story.slice(start,end<0?undefined:end);
}
function blocks(text) {
  return [...text.matchAll(/```(?:text)?\n([\s\S]*?)\n```/g)]
    .map(m=>m[1].split('\n').map(s=>s.replace(/^\* /,'')));
}
const sec = n => section('#### '+n+' ·',4);
const old = n => blocks(section('### ฉาก '+n+' ·',3));
const b = {}; for (const n of ['10.1','10.2','10.3','10.4','10.5','10.6','10.7','10.8']) b[n]=blocks(sec(n));
const extra = id => {
  const text=section('##### 10.22.1 ·',5);
  const start=text.indexOf('**'+id+' —');
  if(start<0)throw Error('Missing dialogue '+id);
  return blocks(text.slice(start))[0];
};
const glyphs=sec('10.1').split('\n').filter(l=>l.startsWith('|')&&/✋|👎|✌|☟|✡|♏/.test(l)).map(l=>{
  const c=l.split('|').slice(1,-1).map(s=>s.trim().replace(/^`|`$/g,''));
  return {glyph:c[1],translation:c[2]};
});
if(glyphs.length!==7) throw Error('Expected seven exact Void lines, got '+glyphs.length);
const D={intro:[...b['10.1'][0],...b['10.1'][1]],resume:[...b['10.1'][2],...b['10.1'][3]],glyphs,
  landed:old(3)[0],hurt:old(4)[1],healed:old(4)[2],unhurt:old(4)[3],wasd:old(5)[0],bottleHint:old(7)[0],
  praise:b['10.2'][0],bottleLesson:b['10.2'][1],rootTry:b['10.3'][0],rootSystem:b['10.3'][1],rootSuccess:b['10.3'][2],muffin:b['10.3'][3],
  memoryAsk:b['10.4'][0],memoryFollow:b['10.4'][1],stranger:b['10.5'][0],foxStone:b['10.6'][0],stoneSystem:b['10.6'][1],
  ringDescription:b['10.7'][0],ring:b['10.7'][1],hands:b['10.8'][0],
  vFirst:extra('D00-V-FIRST'),vRepeat:extra('D00-V-REPEAT'),flowers:extra('D00-FLOWERS'),muffinTalk:extra('D00-MUFFIN'),quiet:extra('D00-GROVE-QUIET'),revive:extra('D00-RING-REVIVE')};
for(const [k,v]of Object.entries(D))if(!Array.isArray(v)||!v.length)throw Error('Empty dialogue '+k);
const original=read('index.html');
const primitives=original.slice(original.indexOf('function pxEllipse('),original.indexOf('/* ordered-dither'));
const scenery=original.slice(original.indexOf('const TREE_TONE ='),original.indexOf('const TREES_SPR'));
const ui=read('design/interface/v1/interface.js');
const logo=ui.slice(ui.indexOf('  function pixelLogo(){'),ui.indexOf('  const displayName'));
const rail=ui.slice(ui.indexOf('  function railLabel(text){'),ui.indexOf('  function overworldShell'));
const dataUrl=p=>'data:image/png;base64,'+fs.readFileSync(path.join(root,p)).toString('base64');
const layout=JSON.parse(read('design/chapters/current-layout.json'));
const mapLayout=JSON.parse(read('src/ch00/map-layout.json'));
const mapManifest=JSON.parse(read('assets/maps/r00-v1/manifest.json'));
const tileAssets=JSON.parse(read('assets/maps/r00-tiles-v1/manifest.json'));
const surfaceAssets=JSON.parse(read('assets/maps/r00-surfaces-v2/manifest.json'));
const detailAssets=JSON.parse(read('assets/maps/r00-details-v1/manifest.json'));
const mapEntities=JSON.parse(read('src/ch00/map-entities.json'));
const assets={walk:dataUrl('assets/characters/player-r5/v1/player-r5-walk-atlas.png'),story:dataUrl('assets/characters/player-r5/v1/player-r5-story-atlas.png'),stat:dataUrl('assets/characters/player-stat/v1/player-stat-star-64x112.png'),stranger:dataUrl('assets/characters/hooded-stranger/v1/stranger-atlas.png')};
for(const [id,value]of Object.entries(mapManifest.images))if(id!=='background')assets[id]=dataUrl('assets/maps/r00-v1/'+value.file);
assets.terrainAtlas=dataUrl('assets/maps/r00-tiles-v1/'+tileAssets.terrainAtlas.file);
assets.surfaceAtlas=dataUrl('assets/maps/r00-surfaces-v2/'+surfaceAssets.atlas);
for(const [id,m]of Object.entries(surfaceAssets.plants))assets[id]=dataUrl('assets/maps/r00-surfaces-v2/'+m.file);
for(const [id,m]of Object.entries(detailAssets.objects))assets['detail_'+id]=dataUrl('assets/maps/r00-details-v1/'+m.file);
for(const [id,record]of [['chestC2','chest-c2-closed'],['chestC3','chest-c3-closed']]){mapManifest.images[id]=mapManifest.sprites[record];assets[id]=dataUrl('assets/maps/r00-v1/'+mapManifest.sprites[record].file);}
for(const [id,m]of Object.entries(tileAssets.objects))assets[id]=dataUrl('assets/maps/r00-tiles-v1/'+m.file);
for(const [id,m]of Object.entries(tileAssets.trees)){assets['tree_'+id]=dataUrl('assets/maps/r00-tiles-v1/'+m.file);assets['tree_'+id+'_canopy']=dataUrl('assets/maps/r00-tiles-v1/'+m.canopy.file);assets['tree_'+id+'_trunk']=dataUrl('assets/maps/r00-tiles-v1/'+m.trunk.file);}
const manifest=JSON.parse(read('assets/characters/player-r5/v1/manifest.json'));
const mapAssets={version:mapManifest.version,images:mapManifest.images,verification:mapManifest.verification,approvedSource:mapManifest.approvedSource,documentation:mapManifest.documentation};
const treeTypes={broad:'broadleafBlue',tall:'coniferBlue',root:'ancientHollow'};
for(const [type,definition]of Object.entries(mapEntities.treeTypes))assets[definition.asset]=assets['tree_'+treeTypes[type]];
const payload={dialogue:D,rooms:mapLayout.rooms,mapLayout,mapEntities,mapAssets,tileAssets,surfaceAssets,detailAssets,treeTypes,renderConstruction:'layered-floor-and-depth-sorted-objects',frames:manifest.frames,assets,contentVersion:'CH-2026-10-09',layoutVersion:mapLayout.mapVersion,designBaseline:layout.designBaseline,engineRevision:'UF-CH00-2026-10-09-r2'};
let renderer=read('src/ch00/renderer.js').replace('/* APPROVED_PRIMITIVES */',primitives).replace('/* APPROVED_SCENERY */',scenery);
const menuCSS=read('design/interface/v1/overworld-menu.css').split('@media(max-width:720px)')[0];
const css=read('src/ch00/runtime.css')+'\n'+menuCSS;
const js=[read('src/ch00/storage.js'),read('src/ch00/ui.js').replace('/* APPROVED_PIXEL_LABELS */',logo+'\n'+rail),read('src/ch00/runtime.js')].join('\n');
const json=JSON.stringify(payload).replace(/</g,'\\u003c');
const html=read('src/ch00/shell.html').replace('/* CH00_CSS */',css)
  .replace('/* CH00_PAYLOAD */','window.UF_DATA='+json+';').replace('/* CH00_RENDERER */',renderer).replace('/* CH00_RUNTIME */',js);
fs.writeFileSync(path.join(root,'index_new.html'),html);
fs.mkdirSync(path.join(root,'output/ch00'),{recursive:true});
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const report={builtAt:new Date().toISOString(),engineRevision:payload.engineRevision,mapVersion:mapLayout.mapVersion,mapSource:mapLayout.source,scope:'CH00 only; stops at resume 10.10',sizeBytes:Buffer.byteLength(html),dialogueLines:Object.fromEntries(Object.entries(D).map(([k,v])=>[k,v.length])),sourceHashes:Object.fromEntries(['index.html','story.md','ch00.md','design/chapters/current-layout.json','assets/characters/player-r5/v1/player-r5-walk-atlas.png',mapLayout.source,'assets/maps/r00-v1/background.png','src/ch00/map-layout.json'].map(p=>[p,sha(p)]))};
fs.writeFileSync(path.join(root,'output/ch00/build-report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({built:'index_new.html',bytes:report.sizeBytes,voidLines:glyphs.length,scope:report.scope}));
