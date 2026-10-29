/* CH00 scene runner. No CH01, battle, phone, book, pets or house are installed. */
(async function(){
  'use strict';
  const $=id=>document.getElementById(id),D=UF_DATA.dialogue,L=UF_DATA.mapLayout,A=L.anchors,G=L.stageGates,clone=v=>structuredClone(v),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const testMode=new URLSearchParams(location.search).get('qa')==='1'&&['127.0.0.1','localhost'].includes(location.hostname);
  const storage=UF_Storage(testMode),settings=storage.settings();
  let S,mode='loading',busy=false,activePage=null,choicePage=null,timer=null,worldTime=0,keys=new Set(),ui,render;
  let meta=storage.mergeMeta(storage.read().parsed?.meta,storage.getMeta()),errorMessage='',pendingSave='normal',debugSpeed=1,toastTimer=0,ac=null,audioBus=null,nextMusic=0,lastTarget=null;
  function fresh(seed){seed=seed??crypto.getRandomValues(new Uint32Array(1))[0];return {runId:crypto.randomUUID(),chapter:'ch00',resumeScene:'C00-01',room:'forest_origin',spawn:[...A.landing],worldSeed:seed,bottlePosition:[...A.bottle],name:null,hp:20,maxHP:20,baseDF:0,foodDF:0,gold:0,equipment:{weapon:null,armor:null},inventory:{},bottle:false,phone:false,nUnlocked:false,ringCharge:0,helpChoice:null,memoryChoice:null,legAnswer:null,worldFlags:{},puzzleFlags:{},dialogueSeen:{},callSeen:{},pendingCalls:[],monsterOutcomes:{},killCount:0,spareCount:0,rewardLedger:{},activityFlags:{},questFlags:{},chapterComplete:{},cooldowns:{xActive:0,x:0,c:0,b:0},walkDistance:0,playTime:0,face:'front',walking:false,anim:0,fx:{hidePlayer:true}};}
  S=fresh(77123);
  const images={};await Promise.all(Object.entries(UF_DATA.assets).map(([id,src])=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>{images[id]=img;resolve();};img.onerror=()=>reject(Error('ภาพ '+id+' โหลดไม่สำเร็จ'));img.src=src;})));
  render=UF_Renderer($('world'),images);
  function clearKeys(){keys.clear();S.walking=false;}
  function toast(message){$('toast').textContent=message;$('toast').classList.add('show');toastTimer=3;}
  function applySettings(persist=true){ $('game').classList.toggle('reduce-motion',settings.reduceMotion);$('game').classList.toggle('large-text',settings.largeText);$('sound').textContent=settings.mute?'เปิดเสียง':'ปิดเสียง';if(audioBus)audioBus.gain.setValueAtTime(settings.mute?0:settings.volume,ac.currentTime);try{if(persist)storage.saveSettings(settings);}catch{toast('เก็บตั้งค่าได้เฉพาะรอบนี้ — พื้นที่บันทึกถูกปิดกั้น');}}
  function bootAudio(){try{ac??=new (window.AudioContext||window.webkitAudioContext)();if(!audioBus){audioBus=ac.createGain();audioBus.gain.value=settings.mute?0:settings.volume;audioBus.connect(ac.destination);}if(ac.state==='suspended')ac.resume();}catch{}}
  function tone(freq=680,len=.035,kind='triangle',volume=.012){if(!ac||settings.mute||settings.volume===0)return;const o=ac.createOscillator(),g=ac.createGain(),now=ac.currentTime;o.type=kind;o.frequency.value=freq;g.gain.setValueAtTime(volume,now);g.gain.exponentialRampToValueAtTime(.00001,now+len);o.connect(g);g.connect(audioBus);o.start();o.stop(now+len+.01);o.onended=()=>{o.disconnect();g.disconnect();};}
  function menu(p){if(busy)return;mode=p==='world'?'walk':p==='end'?'end':'menu';clearKeys();}
  function closeMenu(){if(busy)return;if(S.room==='rift_bridge'){mode='end';ui.go('end');}else{mode='walk';ui.go('world');}clearKeys();}
  function showTitle(){if(busy)return;mode='menu';ui.go('title');clearKeys();}
  function exportCurrent(){let data=storage.payload(S,meta);if(['migration','backup-migration'].includes(pendingSave)){const p=pendingSave==='migration'?storage.read():storage.backup();if(p.kind==='migratable'){data=clone(p.parsed);data.meta=storage.mergeMeta(data.meta,storage.getMeta());if(data.meta.ringSpent.includes('old_fox_ring:'+data.runId))data.checkpoint.ringCharge=0;}}storage.exportData(data);}
  function save(auto=false){pendingSave='normal';try{const state=clone(S);if(state.room!=='rift_bridge')state.hp=20;const payload=storage.payload(state,meta);storage.write(payload);S.hp=state.hp;errorMessage='';if(S.room==='rift_bridge'){ui.setEndResult(true);mode='end';ui.go('end');}else ui.go('saved');return true;}catch(e){errorMessage=String(e.message);if(S.room==='rift_bridge'){ui.setEndResult(false);mode='end';ui.go('end');}else ui.go('save-error');return false;}}
  function restore(p){S=clone(p.checkpoint);S.runId=p.runId;S.face='front';S.walking=false;S.anim=0;S.fx={};meta=storage.mergeMeta(p.meta,storage.getMeta());if(meta.ringSpent.includes('old_fox_ring:'+S.runId))S.ringCharge=0;worldTime=S.playTime;clearKeys();render.resetCamera();if(S.room==='rift_bridge'){mode='end';ui.setEndResult(true);ui.go('end');}else{mode='walk';ui.go('world');}}
  function load(){const p=storage.read();if(p.kind!=='valid'){ui.go('save-problem');return;}restore(p.parsed);}
  function loadMigrated(){pendingSave='migration';try{const p=storage.read();if(p.kind!=='migratable')throw Error('ข้อมูลเดิมยังไม่พร้อมย้ายไปผังนี้');p.parsed.meta=storage.mergeMeta(p.parsed.meta,storage.getMeta());if(p.parsed.meta.ringSpent.includes('old_fox_ring:'+p.parsed.runId))p.parsed.checkpoint.ringCharge=0;storage.write(p.parsed);restore(p.parsed);pendingSave='normal';}catch(e){errorMessage=String(e.message);ui.go('save-error');}}
  function loadBackupMigrated(){pendingSave='backup-migration';try{restore(storage.migrateBackup());pendingSave='normal';}catch(e){errorMessage=String(e.message);ui.go('save-error');}}
  function retrySave(){return pendingSave==='migration'?loadMigrated():pendingSave==='backup-migration'?loadBackupMigrated():pendingSave==='new'?startNew():save();}
  function recover(){if(storage.backup().kind==='migratable'){ui.go('backup-migration');return;}try{restore(storage.recover());}catch(e){errorMessage=String(e.message);toast('กู้คืนยังไม่สำเร็จ — ข้อมูลเดิมยังอยู่');}}
  async function useItem(id){if(id!=='warm_muffin'||!S.inventory[id])return;S.inventory[id]=0;S.hp=Math.min(20,S.hp+3);if(!S.worldFlags.usedMuffin){S.foodDF=4;S.worldFlags.usedMuffin=true;}ui.render();tone(880,.14);toast('HP '+S.hp+'/20 · DF +4');if(!S.dialogueSeen.muffinTalk)await run(async()=>{await say(D.muffinTalk,'???','muffinTalk');},()=>ui.go('item'));}
  const app={state:()=>S,storage,settings,testMode,menu,closeMenu,showTitle,startNew,load,loadMigrated,loadBackupMigrated,save,retrySave,recover,applySettings,power,useItem,exportCurrent,lastError:()=>errorMessage,lastSaveOperation:()=>pendingSave,history:()=>meta.history};
  ui=UF_UI(app);applySettings(false);
  function room(id,spawn){S.room=id;S.spawn=[...spawn];S.face='front';S.walking=false;S.fx.pose=null;render.resetCamera();clearKeys();}
  function stage(id){S.room=id;ui.render();}
  async function run(fn,after=null){if(busy)return;busy=true;mode='cutscene';clearKeys();ui.go('world');try{await fn();}catch(e){console.error(e);errorMessage=String(e.message);toast('ฉากยังทำงานไม่สำเร็จ — เปิดเมนูเพื่อเก็บข้อมูลได้');}finally{activePage=null;choicePage=null;$('dialogue').hidden=true;$('center-text').hidden=true;busy=false;clearKeys();if(after){after();}else if(S.room==='rift_bridge'){mode='end';ui.go('end');}else{mode='walk';ui.go('world');}}}
  const graphemes=text=>[...new Intl.Segmenter('th',{granularity:'grapheme'}).segment(text)].map(s=>s.segment);
  function textPage(text,speaker,center=false,translation=''){
    return new Promise(resolve=>{
      mode='dialogue';clearKeys();$('dialogue').hidden=center;$('center-text').hidden=!center;
      let words;
      if(center){$('center-text').innerHTML=translation?'<div class="void-line"></div><div class="translation"></div>':'<div class="center-line"></div>';words=$('center-text').firstElementChild;if(translation)$('center-text').querySelector('.translation').textContent=translation;}
      else{$('dialogue').className=speaker?'':'system';$('dialogue').innerHTML=(speaker?'<span class="speaker"></span><span class="portrait" aria-hidden="true">◇</span>':'')+'<p class="words"></p><button class="advance" type="button" aria-label="อ่านต่อ">Z / Enter ▾</button>';if(speaker)$('dialogue').querySelector('.speaker').textContent=speaker;words=$('dialogue').querySelector('.words');}
      activePage={text,parts:graphemes(text),n:0,age:0,hold:0,ellipsisPause:0,dotsSeen:0,center,translation,words,speaker,resolve,done:false};
    });
  }
  function advance(){if(!activePage)return;if(!activePage.done){activePage.n=activePage.parts.length;activePage.words.textContent=activePage.text;activePage.done=true;activePage.hold=0;}else finishPage();}
  function finishPage(){const p=activePage;if(!p)return;activePage=null;$('dialogue').hidden=true;$('center-text').hidden=true;mode='cutscene';clearKeys();p.resolve();}
  async function say(lines,speaker='???',id=''){for(const line of lines)await textPage(line,speaker);if(id)S.dialogueSeen[id]=true;}
  async function center(lines){for(const line of lines)await textPage(line,null,true);}
  function choose(options){return new Promise(resolve=>{mode='choice';clearKeys();$('dialogue').hidden=false;$('dialogue').className='choice-mode system';$('dialogue').innerHTML='<div class="choice-row"></div><span class="advance">เลือก แล้วกด Z / Enter</span>';const row=$('dialogue').querySelector('.choice-row');options.forEach(([label,value],i)=>{const b=document.createElement('button');b.type='button';b.className='choice'+(!i?' selected':'');b.textContent=label;b.setAttribute('aria-label',label);b.onclick=()=>finishChoice(i);row.append(b);});choicePage={options,selection:0,resolve};});}
  function finishChoice(index){const c=choicePage;if(!c)return;choicePage=null;$('dialogue').hidden=true;mode='cutscene';clearKeys();c.resolve(c.options[index][1]);}
  function animate(seconds,step=()=>{}){mode='cutscene';return new Promise(resolve=>{timer={seconds,elapsed:0,step,resolve};step(0);});}
  const wait=seconds=>animate(seconds);
  async function fade(to,seconds=.8){const from=Number($('curtain').style.opacity||0);await animate(seconds,p=>{$('curtain').style.opacity=from+(to-from)*p;});}
  async function startNew(){if(busy)return;pendingSave='new';try{storage.startFresh();}catch(e){errorMessage=String(e.message);ui.go('save-error');return;}pendingSave='normal';S=fresh();render.resetCamera();worldTime=0;S.fx.fall=true;S.fx.hidePlayer=false;S.fx.fallDark=0;$('curtain').style.opacity='0';await run(async()=>{
    for(let i=0;i<D.intro.length;i++){S.fx.fallDark=Math.min(.83,i*.07);await center([D.intro[i]]);}
    S.fx.glitch=true;tone(170,.6,'sawtooth',.022);
    for(const line of D.glyphs)await textPage(line.glyph,null,true,line.translation);
    S.fx.glitch=false;await center(D.resume);await fade(1,.8);S.fx.fall=false;S.fx.fallDark=0;S.fx.pose='lie';S.fx.hidePlayer=false;render.emit(...A.landing,'#6c665e',42);tone(65,.25,'sine',.08);await fade(0,.5);await wait(1.2);S.fx.pose='sit';await wait(1.7);await say(D.landed);
    S.legAnswer=await choose([['เจ็บ','hurt'],['ไม่เจ็บ','unhurt']]);
    if(S.legAnswer==='hurt'){await say(D.hurt);S.fx.heal=true;await wait(3.6);S.fx.heal=false;await say(D.healed);}else await say(D.unhurt);
    S.fx.pose='rise';await wait(.6);S.fx.pose=null;await say(D.wasd);S.worldFlags.landingDone=true;S.resumeScene='C00-04';
  });}
  async function bottlePickup(){if(S.bottle)return;await run(async()=>{S.fx.pose='pickup';await wait(.45);S.inventory.soul_bottle=1;S.bottle=true;S.fx.pose='hold';tone(740,.18);await wait(.65);S.fx.pose=null;await center(D.praise.slice(0,2));await fade(1,.4);await wait(.4);await fade(0,.4);await say(D.praise.slice(2));
    await say(['X — ส่องแสงนำทาง 5วิ คูดาล์ว2วิ','C — เผาสิ่งที่กีดขวาง','V — เรียก ??? ออกมาช่วย','B — ฟื้นฟูเลือดของเธอเอง']);await say(D.bottleLesson);S.worldFlags.bottleTutorialDone=true;S.resumeScene='C00-06';
  });}
  function direction(){return S.face==='back'?[0,-1]:S.face==='left'?[-1,0]:S.face==='right'?[1,0]:[0,1];}
  function facing(x,y,range=24,cone=.15){const dx=x-S.spawn[0],dy=y-S.spawn[1],distance=Math.hypot(dx,dy),dir=direction();return distance<=range&&(distance<7||(dx*dir[0]+dy*dir[1])/distance>=cone);}
  function targets(){const t=[],F=S.worldFlags;const add=(id,p,label,tag='')=>t.push({id,x:p[0],y:p[1],label,tag});
    if(S.room==='forest_origin'){if(F.bottleSpawned&&!S.bottle)add('bottle',S.bottlePosition,'Z · เก็บขวด');}
    if(['forest_extension','forest_old_trees'].includes(S.room)){add('save',A.extensionSave,'Z · SAVE');if(!F.chestTaken)add('chest',A.rootChestInteract,F.rootChestBurned?'Z · เปิดกล่อง':'C · เผารากไม้',F.rootChestBurned?'':'burnable_roots');if(!F.rootGateBurned)add('gate',A.rootGate,'C · เผากิ่งไม้','burnable_roots');}
    if(S.room==='forest_old_trees'){add('save',A.oldTreeSave,'Z · SAVE');if(S.helpChoice==='do_not_help'&&!F.groveOpen)add('stone',A.secretStoneInteract,'V · ขอให้ช่วยเปิดทาง');}
    if(S.room==='sacred_grove'){if(!F.ringPicked)add('ring',A.ringChestInteract,'Z · เปิดกล่อง');if(S.nUnlocked){add('save',A.groveSave,'Z · SAVE');add('waterfall',A.waterfall,'Z · ฟังเสียงน้ำตก');}}
    if(S.bottle){const flowers=render.getRoom(S.room,S.worldSeed,S.bottlePosition).flowers.filter(f=>Math.hypot(f.x-S.spawn[0],f.y-S.spawn[1])<20);if(flowers.length)add('flowers',[flowers[0].x,flowers[0].y],'Z · ตรวจดอกไม้');}
    return t.sort((a,b)=>Math.hypot(a.x-S.spawn[0],a.y-S.spawn[1])-Math.hypot(b.x-S.spawn[0],b.y-S.spawn[1]));}
  function target(range=24,tag=null){const near=targets().filter(t=>(!tag||t.tag===tag)&&facing(t.x,t.y,range));return near.find(t=>t.id!=='flowers')||near[0];}
  async function interact(){if(mode!=='walk'||busy)return;const t=target();if(!t)return toast('ลองเดินเข้าใกล้และหันเข้าหาสิ่งที่อยากตรวจนะ');
    if(t.id==='save'){mode='menu';ui.go('save');clearKeys();}
    else if(t.id==='bottle')await bottlePickup();
    else if(t.id==='chest'&&S.worldFlags.rootChestBurned)await run(async()=>{if(S.worldFlags.chestTaken)return;S.worldFlags.chestTaken=true;S.inventory.warm_muffin=1;tone(880,.13);await say(D.muffin,null,'muffinPickup');});
    else if(t.id==='ring')await run(async()=>{S.worldFlags.ringPicked=true;S.inventory.old_fox_ring=1;S.ringCharge=meta.ringSpent.includes('old_fox_ring:'+S.runId)?0:1;await say(D.ringDescription,null);await say(D.ring);S.worldFlags.nInvited=true;});
    else if(t.id==='waterfall'&&!S.dialogueSeen.quiet)await run(()=>say(D.quiet,'???','quiet'));
    else if(t.id==='flowers'&&!S.dialogueSeen.flowers)await run(()=>say(D.flowers,'???','flowers'));
    else if(t.tag==='burnable_roots')toast('รากไม้พันอยู่ · ลองใช้ C ตรงหน้า');
    else if(t.id==='stone')toast('ลายหน้าจิ้งจอกอยู่บนหิน · ลองเรียกด้วย V');
  }
  async function power(k){if(mode!=='walk'||busy||!S.worldFlags.bottleTutorialDone)return;if(k==='x'){if(S.cooldowns.xActive>0||S.cooldowns.x>0)return;S.cooldowns.xActive=5;tone(540,.14);}
    else if(k==='b'){if(S.hp>=20)return toast('HP เต็มอยู่แล้ว');if(S.cooldowns.b>0)return;S.hp=Math.min(20,S.hp+4);S.cooldowns.b=12;render.emit(...S.spawn,'#a9ffd3',16);tone(840,.14);}
    else if(k==='c'){if(S.cooldowns.c>0)return;const t=target(32,'burnable_roots');if(!t||!facing(t.x,t.y,32,Math.cos(Math.PI/6)))return toast('C เผาได้เฉพาะรากไม้ใกล้ๆตรงหน้า');await run(async()=>{S.fx.flame=.6;tone(230,.22,'sawtooth',.023);await wait(.6);S.fx.flame=0;S.cooldowns.c=.8;S.worldFlags[t.id==='chest'?'rootChestBurned':'rootGateBurned']=true;render.emit(t.x,t.y,'#877486',24);if(!S.worldFlags.firstBurnDone){S.worldFlags.firstBurnDone=true;await say(D.rootSuccess);} });}
    else if(k==='v'){const t=target();if(t?.id==='stone'&&S.helpChoice==='do_not_help')await run(async()=>{await say(D.foxStone);await say(D.stoneSystem,null);await animate(2.4,p=>S.fx.stoneOpen=p);S.worldFlags.groveOpen=true;});else await run(()=>say(S.dialogueSeen.vFirst?D.vRepeat:D.vFirst,'???',S.dialogueSeen.vFirst?'vRepeat':'vFirst'));}
    else if(k==='n'){if(S.worldFlags.nInvited&&!S.nUnlocked)await run(async()=>{S.fx.hands=true;await wait(1);S.nUnlocked=true;await say(D.hands);});else if(S.nUnlocked)S.fx.hands=!S.fx.hands;}
  }
  async function memoryScene(){await run(async()=>{await say(D.memoryAsk);S.memoryChoice=await choose([['จำได้ลางๆ','vague'],['ไม่ได้','no']]);await say(D.memoryFollow);S.worldFlags.memoryAsked=true;});}
  async function strangerScene(){await run(async()=>{S.worldFlags.strangerSeen=true;S.fx.strangerY=A.stranger[1];S.fx.strangerFacing='left';await animate(1.8,p=>{S.fx.strangerX=A.stranger[0]+15-p*15;S.fx.strangerPose=(p*5|0)%2;});await say(D.stranger);S.helpChoice=await choose([['ช่วย','help'],['ไม่ช่วย','do_not_help']]);if(S.helpChoice==='help')await attack(false);else S.resumeScene='C00-09';});}
  async function walkRoute(points,seconds){
    const route=[[...S.spawn],...points.map(p=>[...p])],lengths=route.slice(1).map((p,i)=>Math.hypot(p[0]-route[i][0],p[1]-route[i][1])),total=lengths.reduce((a,b)=>a+b,0);
    await animate(seconds,p=>{let remaining=p*total,index=0;while(index<lengths.length-1&&remaining>lengths[index])remaining-=lengths[index++];const from=route[index],to=route[index+1],q=lengths[index]?Math.min(1,remaining/lengths[index]):1,before=[...S.spawn];S.spawn=[from[0]+(to[0]-from[0])*q,from[1]+(to[1]-from[1])*q];const dx=S.spawn[0]-before[0],dy=S.spawn[1]-before[1],distance=Math.hypot(dx,dy);S.walking=distance>.00001;if(S.walking){S.face=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'back':'front');S.anim+=distance/70;}});S.walking=false;
  }
  async function attack(withHands){
    S.fx.attacking=true;
    if(withHands){await fade(1,.4);room('forest_old_trees',A.ambushReturn);S.fx.attacking=true;S.worldFlags.groveExited=true;S.fx.strangerX=S.spawn[0]-47;S.fx.strangerY=S.spawn[1];S.fx.strangerFacing='right';S.face='right';await fade(0,.35);await walkRoute([A.strangerApproach],.55);}
    else await walkRoute(L.routes.strangerApproach,2);
    const from=[...S.spawn],enemy=S.fx.strangerX??A.stranger[0];S.fx.strangerPose=2;S.fx.strangerY=from[1];S.fx.strangerFacing='right';await animate(.32,p=>{S.fx.strangerX=enemy+(from[0]-18-enemy)*p;});S.fx.strangerPose=3;S.fx.rift={x:A.rift[0],y:A.rift[1]};S.fx.hands=withHands;tone(90,.24,'sawtooth',.03);
    await animate(.65,p=>{S.spawn=[from[0]+(A.riftFoot[0]-from[0])*p,from[1]+(A.riftFoot[1]-from[1])*p];S.fx.pose='fall';});S.fx.hidePlayer=true;await fade(1,.8);S.fx={black:true};S.room='rift_bridge';S.spawn=[...A.riftFoot];S.chapter='ch01_pending';S.resumeScene='10.10';S.chapterComplete.ch00=true;S.worldFlags.riftEntered=true;$('curtain').style.opacity='0';meta=storage.mergeMeta(meta,{ringSpent:[],history:['ch00']});try{storage.saveMeta(meta);}catch{}save(true);
  }
  function walkingTick(dt){
    S.playTime+=dt;worldTime+=dt;let dx=Number(keys.has('d')||keys.has('arrowright'))-Number(keys.has('a')||keys.has('arrowleft')),dy=Number(keys.has('s')||keys.has('arrowdown'))-Number(keys.has('w')||keys.has('arrowup'));
    S.walking=false;if(dx||dy){const n=Math.hypot(dx,dy);dx/=n;dy/=n;S.face=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'back':'front');const before=[...S.spawn],speed=70;const nx=S.spawn[0]+dx*speed*dt,ny=S.spawn[1]+dy*speed*dt;if(!render.collider(S,nx,S.spawn[1]))S.spawn[0]=nx;if(!render.collider(S,S.spawn[0],ny))S.spawn[1]=ny;const distance=Math.hypot(S.spawn[0]-before[0],S.spawn[1]-before[1]);S.walkDistance+=distance;S.walking=distance>.00001;if(S.walking)S.anim+=distance/speed;}
    const c=S.cooldowns;if(c.xActive>0){c.xActive=Math.max(0,c.xActive-dt);if(c.xActive===0)c.x=2;}else c.x=Math.max(0,c.x-dt);c.c=Math.max(0,c.c-dt);c.b=Math.max(0,c.b-dt);
    if(S.fx.deer){S.fx.deer.age+=dt;S.fx.deer.x+=dt*10;S.fx.deer.alpha=Math.max(0,1-S.fx.deer.age/5);if(!S.fx.deer.alpha)S.fx.deer=null;}
    const F=S.worldFlags,[x,y]=S.spawn;
    if(S.room==='forest_origin'){
      if(S.walkDistance>=270&&!F.deerSeen){F.deerSeen=true;S.fx.deer={x:x+85,y:y+15,alpha:1,age:0};}
      if(S.walkDistance>=620&&!F.bottleSpawned){F.bottleSpawned=true;run(()=>say(D.bottleHint));return;}
      if(F.bottleTutorialDone&&x>=G.mainBridge.x){stage('forest_extension');return;}
    }else if(S.room==='forest_extension'){
      if(!F.rootLessonDone&&targets().some(t=>t.tag==='burnable_roots'&&Math.hypot(t.x-x,t.y-y)<57)){F.rootLessonDone=true;run(async()=>{await say(D.rootTry);await say(D.rootSystem,null);});return;}
      if(F.rootGateBurned&&x>G.rootGate.x+12){stage('forest_old_trees');if(!F.memoryAsked)memoryScene();return;}
      if(x<G.mainBridge.x-16){stage('forest_origin');return;}
    }else if(S.room==='forest_old_trees'){
      if(!F.memoryAsked){memoryScene();return;}
      if(!F.strangerSeen&&Math.hypot(x-G.strangerTrigger.center[0],y-G.strangerTrigger.center[1])<G.strangerTrigger.radius){strangerScene();return;}
      if(F.groveOpen&&S.helpChoice==='do_not_help'&&Math.hypot(x-G.secretEntry.center[0],y-G.secretEntry.center[1])<G.secretEntry.radius){run(async()=>{await fade(1,.35);room('sacred_grove',A.groveSpawn);S.resumeScene='C00-10';await fade(0,.4);});return;}
      if(x<G.rootGate.x-14){stage('forest_extension');return;}
    }else if(S.room==='sacred_grove'&&Math.hypot(x-G.groveExit.center[0],y-G.groveExit.center[1])<G.groveExit.radius){
      if(!F.ringPicked||!S.nUnlocked){S.spawn=[G.groveExit.center[0]+20,G.groveExit.center[1]+15];toast(!F.ringPicked?'ลองสำรวจกล่องเก่าในสวนก่อนนะ':'??? ฝากให้ลองกด N ก่อนออกจากสวน');}else run(()=>attack(true));
    }
    const near=target(28);lastTarget=near?.label||'';ui.hud(lastTarget);
  }
  async function damage(amount){if(!testMode)return;S.hp=Math.max(0,S.hp-amount);if(S.hp===0&&S.ringCharge>0){const next=storage.mergeMeta(meta,{ringSpent:['old_fox_ring:'+S.runId],history:[]});try{storage.saveMeta(next);meta=next;S.ringCharge=0;S.hp=20;await run(()=>say(D.revive,'???','revive'));}catch(e){S.hp=1;errorMessage=String(e.message);ui.go('save-error');}}ui.hud(lastTarget);}
  function onKey(k){bootAudio();if(k==='m'){settings.mute=!settings.mute;applySettings();return;}if(mode==='dialogue'&&['enter','z',' '].includes(k)){advance();return;}if(mode==='choice'){
      if(['a','w','arrowleft','arrowup','d','s','arrowright','arrowdown'].includes(k)){choicePage.selection=1-choicePage.selection;$('dialogue').querySelectorAll('.choice').forEach((b,i)=>b.classList.toggle('selected',i===choicePage.selection));}else if(['enter','z',' '].includes(k))finishChoice(choicePage.selection);return;
    }
    if(busy)return;if(mode==='menu'||mode==='end'){ui.key(k);return;}if(mode!=='walk')return;
    const faceKeys={w:'back',arrowup:'back',s:'front',arrowdown:'front',a:'left',arrowleft:'left',d:'right',arrowright:'right'};if(faceKeys[k])S.face=faceKeys[k];
    if(['enter','z',' '].includes(k))interact();else if(k==='escape'){clearKeys();ui.go('pause');}else if(k==='i'){clearKeys();ui.go('inventory');}else if(k==='p'){toast('ยังไม่ได้รับโทรศัพท์');}else if('xcvbn'.includes(k)&&k.length===1)power(k);
  }
  window.addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(e.target.matches('input,select,textarea')&&k!=='escape')return;if(['arrowup','arrowdown','arrowleft','arrowright',' ','enter','escape'].includes(k))e.preventDefault();if(e.repeat)return;keys.add(k);onKey(k);});
  window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));window.addEventListener('blur',clearKeys);document.addEventListener('visibilitychange',clearKeys);
  $('dialogue').addEventListener('click',e=>{if(!e.target.closest('.choice')&&mode==='dialogue')advance();});$('center-text').addEventListener('click',advance);
  document.querySelectorAll('[data-key]').forEach(b=>b.addEventListener('click',()=>onKey(b.dataset.key)));
  document.querySelectorAll('[data-hold]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();bootAudio();keys.add(b.dataset.hold);b.setPointerCapture(e.pointerId);});for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,()=>keys.delete(b.dataset.hold));});
  $('sound').onclick=()=>{bootAudio();settings.mute=!settings.mute;applySettings();};$('fullscreen').onclick=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen();}catch{toast('อุปกรณ์นี้ไม่รองรับเต็มจอ');}};
  function resize(){const coarse=matchMedia('(pointer:coarse)').matches,pad=coarse?145:78,width=Math.min(1200,innerWidth-24,Math.max(180,(innerHeight-pad)*400/225));$('stage').style.width=width+'px';$('stage').style.height=width*225/400+'px';$('game').style.transform=`scale(${width/400})`;}
  addEventListener('resize',resize);resize();
  let last=performance.now(),visualTime=0;
  function frame(now){const dt=Math.min(.04,(now-last)/1000);last=now;const visible=!document.hidden;
    if(visible){visualTime+=dt;toastTimer=Math.max(0,toastTimer-dt);if(!toastTimer)$('toast').classList.remove('show');
      if(mode==='walk')walkingTick(dt);
      if(timer){const r=timer;r.elapsed+=dt*debugSpeed;r.step(clamp(r.elapsed/r.seconds,0,1));if(r.elapsed>=r.seconds){timer=null;r.resolve();}}
      if(activePage){const p=activePage;if(!p.done){if(p.ellipsisPause>0)p.ellipsisPause-=dt*debugSpeed;else{p.age+=dt*debugSpeed;const next=Math.min(p.parts.length,Math.floor(p.age*settings.textSpeed));if(next>p.n){p.n=next;p.words.textContent=p.parts.slice(0,p.n).join('');if(p.n%3===0)tone(p.translation?310+p.n%5*45:680+p.n%3*30,.027,p.translation?'sawtooth':'triangle',.009);const dots=(p.words.textContent.match(/(\.{3}|\. \. \.)/g)||[]).length;if(dots>p.dotsSeen){p.dotsSeen=dots;p.ellipsisPause=.35;}}if(p.n===p.parts.length){p.done=true;p.hold=0;}}}else if(p.center){p.hold+=dt*debugSpeed;const hold=Math.max(2.2,p.parts.length/18+1.2);if(p.hold>=hold)finishPage();}}
      if(mode==='walk'&&visualTime>nextMusic){nextMusic=visualTime+6;for(const [i,f]of[130.81,196,261.63].entries())setTimeout(()=>{if(mode==='walk')tone(f,2.3,'sine',.014);},i*420);}
      $('game').classList.toggle('cinematic',!!(S.fx.fall||S.fx.black));render.draw(S,dt,visualTime,mode==='walk',settings);
    }
    requestAnimationFrame(frame);
  }
  mode='menu';ui.go('title');requestAnimationFrame(frame);
  window.UNDERFALL=Object.freeze({version:UF_DATA.engineRevision,scope:'CH00',snapshot:()=>({mode,page:ui.page(),checkpoint:storage.payload(S,meta),busy}),exportSave:exportCurrent});
  if(testMode)window.UF_QA={snapshot:()=>({mode,page:ui.page(),state:clone(S),meta:clone(meta),typing:activePage?{text:activePage.text,done:activePage.done,center:activePage.center}:null,choice:choicePage?.options||null,busy}),key:onKey,setSpeed:n=>debugSpeed=clamp(n,1,60),setSeed:seed=>{S.worldSeed=seed;},warp:(id,pos,face='front')=>{if(busy)throw Error('Cannot warp inside a scene');room(id,pos);S.face=face;ui.go('world');},face:f=>S.face=f,damage,save:()=>save(),load,loadMigrated,loadBackupMigrated,retrySave,storage,collides:(x,y)=>render.collider(S,x,y),restoreFixture:p=>restore(p)};
})().catch(error=>{console.error(error);document.getElementById('screen').innerHTML='<section class="center-dialog"><h3>เกมยังเปิดไม่สำเร็จ</h3><p>ทรัพยากรหรือสคริปต์โหลดไม่ครบ โปรดลองรีเฟรช</p></section>';});
