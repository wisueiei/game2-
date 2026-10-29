/* Real checkpoint storage; the design sandbox key is deliberately not read. */
window.UF_Storage = function(testMode=false) {
  const KEY=testMode?'underfall.qa.save.v1':'underfall.save.v1', SETTINGS=KEY+'.settings', META=KEY+'.meta';
  const clone=v=>structuredClone(v),finite=n=>typeof n==='number'&&Number.isFinite(n);
  const bools=v=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.values(v).every(x=>typeof x==='boolean');
  const checkMeta=m=>m&&Array.isArray(m.ringSpent)&&m.ringSpent.every(v=>typeof v==='string'&&v.length<130)&&Array.isArray(m.history)&&m.history.every(v=>['legacy','ch00'].includes(v));
  const compatible=p=>p?.schemaVersion===1&&p?.contentVersion===UF_DATA.contentVersion&&p?.layoutVersion===UF_DATA.layoutVersion&&p?.mapVersion===UF_DATA.mapLayout.mapVersion&&p?.designBaseline===UF_DATA.designBaseline&&p?.engineRevision===UF_DATA.engineRevision;
  const legacyCompatible=p=>p?.schemaVersion===1&&p?.contentVersion==='CH-2026-10-09'&&p?.layoutVersion==='UF-LAYOUT-2026-10-09'&&p?.designBaseline==='UF-DESIGN-2026-10-09'&&p?.engineRevision==='UF-CH00-2026-10-09-r1';
  const object=v=>v&&typeof v==='object'&&!Array.isArray(v);
  function onMap(c){const L=UF_DATA.mapLayout,point=[c.spawn[0]/L.scale+L.sourceCrop[0],c.spawn[1]/L.scale+L.sourceCrop[1]],region=c.room==='sacred_grove'?'grove':'forest';return L.navPolygons.some(poly=>{if(poly.region!==region)return false;let inside=false;for(let i=0,j=poly.points.length-1;i<poly.points.length;j=i++){const a=poly.points[i],b=poly.points[j];if((a[1]>point[1])!==(b[1]>point[1])&&point[0]<(b[0]-a[0])*(point[1]-a[1])/(b[1]-a[1])+a[0])inside=!inside;}return inside;});}
  function validState(p,legacy=false) {
    if(!(legacy?legacyCompatible(p):compatible(p))||typeof p.runId!=='string'||!p.runId.length||p.runId.length>100||!checkMeta(p.meta))return false;
    const c=p.checkpoint,ids=['soul_bottle','warm_muffin','old_fox_ring'];
    if(!object(c)||c.runId!==p.runId||!Object.hasOwn(UF_DATA.rooms,c.room)||!['ch00','ch01_pending'].includes(c.chapter))return false;
    if(!Array.isArray(c.spawn)||c.spawn.length!==2||!c.spawn.every(finite)||!Number.isInteger(c.worldSeed)||c.worldSeed<0||c.worldSeed>4294967295)return false;
    if(!Array.isArray(c.bottlePosition)||c.bottlePosition.length!==2||!c.bottlePosition.every(finite))return false;
    if(legacy?Math.hypot(...c.bottlePosition)>350:Math.hypot(c.bottlePosition[0]-UF_DATA.mapLayout.anchors.bottle[0],c.bottlePosition[1]-UF_DATA.mapLayout.anchors.bottle[1])>.01)return false;
    if(c.name!==null||!Number.isInteger(c.hp)||c.hp<0||c.hp>20||c.maxHP!==20||c.baseDF!==0||![0,4].includes(c.foodDF)||!Number.isInteger(c.gold)||c.gold<0)return false;
    if(c.phone!==false||typeof c.bottle!=='boolean'||typeof c.nUnlocked!=='boolean'||![0,1].includes(c.ringCharge)||c.equipment?.weapon!==null||c.equipment?.armor!==null)return false;
    if(!object(c.inventory)||Object.entries(c.inventory).some(([id,n])=>!ids.includes(id)||!Number.isInteger(n)||n<0||n>1)||Boolean(c.inventory.soul_bottle)!==c.bottle)return false;
    if(c.nUnlocked&&(!c.worldFlags?.ringPicked||c.helpChoice!=='do_not_help'))return false;
    if(![null,'help','do_not_help'].includes(c.helpChoice)||![null,'vague','no'].includes(c.memoryChoice)||![null,'hurt','unhurt'].includes(c.legAnswer))return false;
    if(!bools(c.worldFlags)||!bools(c.dialogueSeen)||!bools(c.chapterComplete)||!object(c.cooldowns)||Object.values(c.cooldowns).some(v=>!finite(v)||v<0||v>20))return false;
    if(!['xActive','x','c','b'].every(id=>finite(c.cooldowns[id])))return false;
    if(!object(c.rewardLedger)||!object(c.puzzleFlags)||!object(c.callSeen)||!object(c.activityFlags)||!object(c.questFlags)||!Array.isArray(c.pendingCalls))return false;
    if(c.killCount!==0||c.spareCount!==0||!object(c.monsterOutcomes)||Object.keys(c.monsterOutcomes).length!==0)return false;
    if(!finite(c.playTime)||c.playTime<0||!finite(c.walkDistance)||c.walkDistance<0)return false;
    if(c.room==='rift_bridge')return c.chapter==='ch01_pending'&&c.resumeScene==='10.10'&&c.chapterComplete.ch00===true&&c.bottle;
    if(legacy){const bounds={forest_extension:[400,325],forest_old_trees:[700,525],sacred_grove:[720,480]};if(c.room==='forest_origin')return Math.hypot(...c.spawn)<440;const r=bounds[c.room];return r&&c.spawn[0]>=0&&c.spawn[0]<=r[0]+3&&c.spawn[1]>=0&&c.spawn[1]<=r[1];}
    const r=UF_DATA.rooms[c.room];return c.spawn[0]>=0&&c.spawn[0]<=r.width&&c.spawn[1]>=0&&c.spawn[1]<=r.height&&onMap(c);
  }
  const valid=p=>validState(p,false),validLegacy=p=>validState(p,true);
  function migrate(p){
    if(!validLegacy(p))return null;
    const next=clone(p),c=next.checkpoint;
    next.engineRevision=UF_DATA.engineRevision;next.contentVersion=UF_DATA.contentVersion;next.layoutVersion=UF_DATA.layoutVersion;next.mapVersion=UF_DATA.mapLayout.mapVersion;next.designBaseline=UF_DATA.designBaseline;
    c.spawn=[...UF_DATA.rooms[c.room].safeSpawn];c.bottlePosition=[...UF_DATA.mapLayout.anchors.bottle];
    return valid(next)?next:null;
  }
  function read(key=KEY) {
    try {const raw=localStorage.getItem(key);if(raw===null)return {kind:'empty',raw:null};
      let parsed;try{parsed=JSON.parse(raw);}catch{return {kind:'corrupt',raw};}
      if(valid(parsed))return {kind:'valid',raw,parsed};
      if(legacyCompatible(parsed)){const converted=migrate(parsed);return converted?{kind:'migratable',raw,parsed:converted,original:parsed,fromRevision:parsed.engineRevision}:{kind:'corrupt',raw,parsed};}
      return {kind:compatible(parsed)?'corrupt':'incompatible',raw,parsed};
    }catch(error){return {kind:'unavailable',error:String(error.message),raw:null};}
  }
  function settings(){try{const p=JSON.parse(localStorage.getItem(SETTINGS)||'{}');return {mute:p.mute===true,reduceMotion:p.reduceMotion===true||(!Object.hasOwn(p,'reduceMotion')&&matchMedia('(prefers-reduced-motion: reduce)').matches),largeText:p.largeText===true,volume:finite(p.volume)?Math.max(0,Math.min(1,p.volume)):.38,textSpeed:[20,30,45].includes(p.textSpeed)?p.textSpeed:30};}catch{return {mute:false,reduceMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,largeText:false,volume:.38,textSpeed:30};}}
  function getMeta(){try{const m=JSON.parse(localStorage.getItem(META)||'null');return checkMeta(m)?m:null;}catch{return null;}}
  function mergeMeta(base,more){const strings=v=>Array.isArray(v)?v.filter(s=>typeof s==='string'&&s.length<130):[];return {ringSpent:[...new Set([...strings(base?.ringSpent),...strings(more?.ringSpent)])],history:[...new Set(['legacy',...strings(base?.history),...strings(more?.history)])].filter(s=>['legacy','ch00'].includes(s))};}
  function payload(state,meta){const c=clone(state);delete c.fx;delete c.walking;delete c.anim;delete c.face;
    return {schemaVersion:1,engineRevision:UF_DATA.engineRevision,contentVersion:UF_DATA.contentVersion,layoutVersion:UF_DATA.layoutVersion,mapVersion:UF_DATA.mapLayout.mapVersion,designBaseline:UF_DATA.designBaseline,runId:state.runId,checkpoint:c,meta:clone(meta)};}
  function write(p){if(!valid(p))throw Error('รูปแบบข้อมูลไม่ผ่านการตรวจ — ไม่เขียนทับ');const json=JSON.stringify(p),old=localStorage.getItem(KEY);if(old!==null)localStorage.setItem(KEY+'.backup',old);localStorage.setItem(KEY,json);return p;}
  function startFresh(){const old=localStorage.getItem(KEY);if(old!==null)localStorage.setItem(KEY+'.backup',old);localStorage.removeItem(KEY);}
  function recover(){const b=read(KEY+'.backup');if(b.kind!=='valid')throw Error('ข้อมูลสำรองยังไม่ตรงกับเกมรุ่นนี้');localStorage.setItem(KEY,b.raw);return b.parsed;}
  function migrateBackup(){const b=read(KEY+'.backup');if(b.kind!=='migratable')throw Error('ข้อมูลสำรองเดิมยังไม่พร้อมย้ายไปผังนี้');const p=clone(b.parsed);p.meta=mergeMeta(p.meta,getMeta());if(p.meta.ringSpent.includes('old_fox_ring:'+p.runId))p.checkpoint.ringCharge=0;if(!valid(p))throw Error('ข้อมูลสำรองที่แปลงแล้วยังไม่ผ่านการตรวจ');const original=localStorage.getItem(KEY);if(original!==null)localStorage.setItem(KEY+'.corrupt-recovered',original);localStorage.setItem(KEY,JSON.stringify(p));return p;}
  function exportData(value,name='underfall-save'){const blob=new Blob([typeof value==='string'?value:JSON.stringify(value,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);}
  return {KEY,read,valid,compatible,payload,write,startFresh,recover,migrateBackup,getMeta,mergeMeta,settings,saveSettings:s=>localStorage.setItem(SETTINGS,JSON.stringify(s)),saveMeta:m=>{if(!checkMeta(m))throw Error('ledger ไม่ถูกต้อง');localStorage.setItem(META,JSON.stringify(m));},exportData,backup:()=>read(KEY+'.backup')};
};
