'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),sha=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const checks=[],ok=(v,m)=>{assert(v,m);checks.push(m);};
const html=read('index_new.html'),scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
ok(scripts.length===3,'Three self-contained script blocks');scripts.forEach((s,i)=>new vm.Script(s,{filename:'index_new.html:'+i}));ok(true,'Generated JavaScript parses');
const data=JSON.parse(scripts[0].slice('window.UF_DATA='.length,-1));
ok(data.dialogue.intro.includes('1ปี3เดือนนะครับ'),'Current anniversary intro present');ok(!data.dialogue.intro.some(l=>/1ปีกับอีก2|1ปี2/.test(l)),'No old anniversary intro mixed into CH00');
ok(data.dialogue.hurt.join('')==='โอเคงั้นอยู่นิ่งๆนะ'&&data.dialogue.healed.join('')==='โอเคน่าจะดีขึ้นแล้วนะ'&&data.dialogue.unhurt.join('')==='โอเค งั้นเธอค่อยๆเดินมานะ','Injury dialogue mapped to the correct branches');
const source=read('story.md').replace(/\r\n/g,'\n'),table=source.split('\n').filter(l=>/^\| [1-7] \|/.test(l)&&/[✋👎✌☟✡♏]/u.test(l)).slice(0,7).map(l=>l.split('|').slice(1,-1).map(s=>s.trim()));
ok(data.dialogue.glyphs.length===7&&data.dialogue.glyphs.every((l,i)=>l.glyph===table[i][1]&&l.translation===table[i][2]),'Seven exact Unicode Void lines and owner translations preserved');
ok(Object.keys(data.rooms).length===5&&!data.dialogue.toriel&&!data.dialogue.flowey,'Only five CH00 story stages on R00 are packaged; CH01 dialogue absent');
const map=data.mapLayout,mapSource='design/maps/2026-10-08-v1/01-r00-forest-and-sacred-grove-v1b.png';
ok(map&&map.mapVersion==='UF-R00-V1B-2026-10-09'&&map.source===mapSource,'Selected R00 v1b source and map version are packaged');
ok(JSON.stringify(map.sourceCrop)==='[18,50,1516,952]'&&map.scale===1.25,'Selected source crop and world scale match the approved map contract');
ok(map.width===(map.sourceCrop[2]-map.sourceCrop[0])*map.scale&&map.height===(map.sourceCrop[3]-map.sourceCrop[1])*map.scale,'Shared world dimensions derive from the selected source crop');
ok(data.layoutVersion===map.mapVersion&&data.engineRevision==='UF-CH00-2026-10-09-r2','Built layout and engine identify the current R00 integration');
ok(Array.isArray(map.navPolygons)&&map.navPolygons.length>0&&map.navPolygons.every(p=>Array.isArray(p.points)&&p.points.length>=3&&p.points.every(v=>Array.isArray(v)&&v.length===2&&v.every(Number.isFinite))),'Navigation polygons have finite source-image coordinates');
ok(Object.keys(map.sourceAnchors).every(k=>map.anchors[k]&&map.anchors[k].every((v,i)=>v===(map.sourceAnchors[k][i]-map.sourceCrop[i])*map.scale)),'Global anchors map directly from the source image');
ok(JSON.stringify(data.rooms)===JSON.stringify(map.rooms)&&Object.values(data.rooms).every(r=>r.width===map.width&&r.height===map.height&&Array.isArray(r.safeSpawn)&&r.safeSpawn.length===2&&r.safeSpawn.every((v,i)=>Number.isFinite(v)&&v>=0&&v<=[map.width,map.height][i])),'Story stages share world dimensions and bounded safe spawns');
const entities=data.mapEntities;
ok(entities&&entities.mapVersion===map.mapVersion&&entities.source===mapSource&&entities.coordinateSpace==='source','Layered entity coordinates derive from the selected v1b source');
ok(JSON.stringify(entities)===JSON.stringify(JSON.parse(read('src/ch00/map-entities.json'))),'Built separate world entities match the maintained source entity data');
ok(Array.isArray(entities.trees)&&entities.trees.length>0&&entities.trees.every(t=>Array.isArray(t.foot)&&t.foot.length===2&&t.foot.every(Number.isFinite)&&Array.isArray(t.size)&&t.size.length===2&&t.size.every(v=>Number.isFinite(v)&&v>0))&&['bridges','stairs','logs','cliffs'].every(k=>Array.isArray(entities[k])&&entities[k].length>0),'Layered world has separate trees, bridges, stairs, logs and cliff objects');
ok(Object.values(entities.treeTypes).every(t=>typeof data.assets[t.asset]==='string'&&data.assets[t.asset].startsWith('data:image/png;base64,')),'Separate tree objects reference packaged native PNG assets');
ok(!/\bdrawImage\s*\(\s*images\.mapBackground\s*,[^)]*L\.width\s*,\s*L\.height\s*\)/.test(scripts[1]),'Renderer does not draw the full reference map PNG as one world background');
const mapAssets=JSON.parse(read('assets/maps/r00-v1/manifest.json'));
ok(mapAssets.approvedSource.file===mapSource&&mapAssets.approvedSource.sha256===sha(mapSource)&&JSON.stringify(mapAssets.background.sourceCrop)===JSON.stringify(map.sourceCrop)&&mapAssets.background.worldScale===map.scale,'Prepared map asset manifest matches the unchanged selected source');
ok(data.mapAssets&&data.mapAssets.version===map.mapVersion&&Object.keys(mapAssets.images).every(k=>JSON.stringify(data.mapAssets.images[k])===JSON.stringify(mapAssets.images[k])),'Built map overlay metadata retains all prepared source records');
ok(mapAssets.verification.pixelsChangedOutsideMask===0&&mapAssets.verification.outsideMaskExactMatch===true&&mapAssets.verification.approvedOutsideRgbaSha256===mapAssets.verification.preparedOutsideRgbaSha256,'Map cleanup metadata records exact preservation outside the explicit mask');
ok(Object.entries(mapAssets.images).every(([k,v])=>{const file=path.join('assets/maps/r00-v1',v.file);return sha(file)===v.sha256&&(k==='background'?typeof data.assets.mapBackground==='undefined':data.assets[k]==='data:image/png;base64,'+fs.readFileSync(path.join(root,file)).toString('base64'));}),'Reference bitmap remains debug-only; embedded source sprites match verified files');
ok(html.includes('overworld-rail')&&html.includes('overworld-stats-hero')&&html.includes('image-rendering:pixelated'),'Approved framed menus and STAT portrait wired');
ok(!html.includes('underfall.interface-preview.v1')&&!html.includes('02-royal-story-cast-r2b.png'),'No prototype save fixtures or concept boards used as game backgrounds');
const protectedHashes={
 'index.html':'4844e0680ba9e4ab4df818c5ffe22a840adb4c792fd9197a27d618dd0a00d630',
 'game.js':'e03e29e0069a26b6071d0a978e2e54bb69ed90c0cb3c7e6d9290dbc1ffe02f03',
 'style.css':'a324cb6e2f9cc79cbc62d49547895c00c510621f30fbe40d52a22b2a8be8598e',
 'CLAUDE.md':'7508ac71804a23934c24ace26a314ea12f9c9547fd39196426421dc440fe4e96',
 'story.md':'b64bb06f21d3c3f35e134520c0dbd7091976ccd851ec1f795ee68d7399cbc7e9',
 'โครงเรื่อง.md':'36a972b7469f922778b4f2b311f246bcd29e45c4cd01013ad30cfc91e95df7ad',
 'ch00.md':'3fe21e8635fd7bbda7c4b327c890368b8e62a5a8e6ecf18206626236fc400ba1',
 'ch01.md':'573b45429408da2d734591306a65fcbaeac4ea0bd2526928f7293bef7823cd21',
 'assets/characters/player-r5/v1/player-r5-walk-atlas.png':'37f97c7e3db326a1f8299e23586bd0c5015960f2a91ab70f813b36abd242212e',
 'assets/characters/player-r5/v1/player-r5-story-atlas.png':'2b6cf63d2388a2f15b2f27eb594345bf815c6c06ace59479a5939298ee2f82b9',
 'design/maps/2026-10-08-v1/01-r00-forest-and-sacred-grove-v1b.png':'1847f7131a5852919acd1e77eb7cc1d31728bde38e47b3b857321decee31faf4'
};
for(const [p,h]of Object.entries(protectedHashes))ok(sha(p)===h,'Protected original unchanged: '+p);
for(const p of ['index_new.html','tools/index-new-shell.html','tools/index-new-engine.js','tools/index-new.css','tools/build-index-new.cjs','tools/check-index-new.cjs'].slice(1))ok(!fs.existsSync(path.join(root,p)),'Rejected implementation absent: '+p);
const report={checkedAt:new Date().toISOString(),engineRevision:data.engineRevision,layoutVersion:data.layoutVersion,renderConstruction:'layered-floor-and-depth-sorted-objects',scope:'Static payload/assets/source integrity and separate-object construction only; gameplay and visual acceptance require current browser evidence',checks,protectedHashes};fs.mkdirSync(path.join(root,'output/ch00'),{recursive:true});fs.writeFileSync(path.join(root,'output/ch00/static-result.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({checks:checks.length,engineRevision:data.engineRevision,layoutVersion:data.layoutVersion,renderConstruction:report.renderConstruction,report:'output/ch00/static-result.json'}));
