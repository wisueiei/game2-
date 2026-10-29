'use strict';

(async () => {
  const $ = id => document.getElementById(id);
  const KEY = 'underfall.interface-preview.v1';
  const BACKUP = KEY + '.backup';
  const ROOT = '../../../';
  const PLAYER = ROOT + 'assets/characters/player-r5/v1/frames/player-r5-front-idle.png';
  const STAT_PLAYER = ROOT + 'assets/characters/player-stat/v1/player-stat-star-64x112.png';
  const PORTRAIT = ROOT + 'design/dialogue-portraits/2026-10-08-v1/01-core-cast-dialogue-faces-v1.png';
  const MONSTER = ROOT + 'design/monsters/2026-10-08-revision-02/04-ruins-monsters-r2.png';
  const ITEMS = {
    soul_bottle:{name:'ขวดไฟวิญญาณ',kind:'important',desc:'แสงในขวดเหมือนกำลังฟังอยู่',hp:0},
    warm_muffin:{name:'มัฟฟิ้นอุ่น',kind:'food',desc:'มันคือมัฟฟิ้น มันกำลังอุ่นๆเลยด้วยเหตุผลบ้างอย่าง ฟื้นฟู3hp เพิ่ม4df',hp:3,df:4},
    ruins_candy:{name:'ลูกอมใบไม้',kind:'food',desc:'กลิ่นหวานอ่อนๆ ติดอยู่กับกระดาษห่อ',hp:4},
    spider_cookie:{name:'คุกกี้ใยหวาน',kind:'food',desc:'แบ่งกันทำจนชิ้นเล็กเท่ากัน',hp:6,price:7,stock:3},
    spider_tea:{name:'ชาดอกไม้ถ้วยเล็ก',kind:'food',desc:'อุ่นพอดี เห็นเส้นใยบางๆที่ขอบถ้วย',hp:10,price:12,stock:2},
    faded_ribbon:{name:'ริบบิ้นสีซีด',kind:'armor',desc:'ยังผูกได้ แม้สีจะผ่านเวลามามาก',df:2},
    toy_knife:{name:'มีดของเล่น',kind:'weapon',desc:'ปลายทื่อ เจ้าของเดิมคงเคยจับมันแน่น',at:2},
    toriel_phone:{name:'โทรศัพท์ของทอเรียล',kind:'important',desc:'มีหมายเลขของเธอบันทึกอยู่'},
    toriel_white_shoes:{name:'รองเท้าสีขาว',kind:'important',desc:'รองเท้าหนึ่งคู่ที่ทอเรียลมอบให้เมื่อพาเข้ารูน ยังไม่กำหนดการสวม'},
    old_fox_ring:{name:'แหวนเก่า',kind:'important',desc:'คืนชีพอัตโนมัติได้1ครั้ง ไม่กดใช้จากกระเป๋า'},
  };
  const descriptions = {
    current:'กติกาหรือหน้าที่กำหนดใน CH00–CH01 · ทำงานกับข้อมูลตัวอย่างเท่านั้น',
    'ui-proposal':'หน้าจอที่ปรับเพิ่มเพื่อความสะดวก · ไม่ยืนยันกลไกเนื้อเรื่องใหม่',
    'future-ui':'ออกแบบหน้าตาสำหรับอนาคต · เงื่อนไข/เควส/ของจริงยังไม่กำหนดและไม่ปลดใน CH00–CH01',
    'reference-adaptation':'ดัดแปลงโครงเมนูจากต้นฉบับ · ร้านนี้ไม่รับซื้อไอเทม',
  };
  const model = {ready:false,page:'title',stack:[],catalog:null,data:null,selection:'warm_muffin',episode:'ch01',topic:'ทักทาย',context:'world',preset:'ruins',forceSaveError:false,settings:{music:65,sfx:55,blip:35,mute:false,reduceMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,fastText:false,largeText:false},errors:[],renderedPages:[],heart:{x:124,y:38},player:{x:200,y:156},checkpoint:null,backup:null};
  window.__UFInterface = model;
  const builders = {};
  const OVERWORLD_MENUS=new Set(['pause','inventory','item','equipment','stats','powers','phone','contacts']);
  const MENU_CATEGORY={inventory:'inventory',item:'inventory',equipment:'inventory',stats:'stats',powers:'powers',phone:'phone',contacts:'phone'};
  model.menuCursor='stats';
  let toastTimer, audioContext;
  const art = {};
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function pixelLogo(){
    const glyphs={U:['10001','10001','10001','10001','10001','10001','01110'],N:['10001','11001','11001','10101','10011','10011','10001'],D:['11110','10001','10001','10001','10001','10001','11110'],E:['11111','10000','10000','11110','10000','10000','11111'],R:['11110','10001','10001','11110','10100','10010','10001'],F:['11111','10000','10000','11110','10000','10000','10000'],A:['01110','10001','10001','11111','10001','10001','10001'],L:['10000','10000','10000','10000','10000','10000','11111']};
    return '<svg class="pixel-logo" viewBox="0 0 53 7" role="img" aria-label="UNDERFALL" shape-rendering="crispEdges">'+[...'UNDERFALL'].map((letter,index)=>glyphs[letter].map((row,y)=>[...row].map((p,x)=>p==='1'?`<rect x="${index*6+x}" y="${y}" width="1" height="1" fill="${letter==='A'&&y===3?'#ed86a2':'#eee6d6'}"/>`:'').join('')).join('')).join('')+'</svg>';
  }
  const displayName = () => model.data.name || 'ยังไม่ตั้งชื่อ';
  const item = id => ITEMS[id];
  const qty = id => model.data.inventory[id] || 0;
  const df = () => model.data.foodDF + (model.data.armor ? item(model.data.armor).df : 0);
  const canFight = () => model.preset !== 'toriel';
  function button(text, action, value='', cls='', disabled=false) {return `<button class="game-button ${cls}" data-action="${action}" data-value="${escape(value)}" ${disabled?'disabled':''}>${text}</button>`;}
  function row(text, action, value='', sub='', disabled=false, selected=false) {return `<button class="list-item ${selected?'selected':''}" data-action="${action}" data-value="${escape(value)}" ${disabled?'disabled':''}><span>${text}</span><small>${sub}</small></button>`;}
  const goButton = (text, page, cls='', disabled=false) => button(text,'go',page,cls,disabled);
  const hp = () => `<div class="hp-row"><span>HP</span><span class="hp-track"><span style="width:${model.data.hp/20*100}%"></span></span><span>${model.data.hp}/20</span></div>`;
  function frame(title, body, actions='', code='', cls='') {return `<header class="screen-head"><h3>${title}</h3><span class="code">${code||'UNDERFALL'}</span></header><div class="screen-content ${cls}">${body}</div><footer class="screen-foot">${button('‹ ย้อน','back','','ghost')}<span class="hint">Z/Enter ยืนยัน · Esc ย้อน</span><div class="button-row">${actions}</div></footer>`;}
  function dialog(title, body, actions, danger=false) {return `<section class="center-dialog pixel-panel"><h3 class="${danger?'danger-text':''}">${title}</h3>${body}<div class="actions">${actions}</div></section>`;}
  const portrait = () => '<canvas class="phone-portrait native-canvas" width="48" height="40" data-art="toriel" aria-label="ภาพอ้างอิงทอเรียล"></canvas>';
  function inventoryRows(action='inspect') {const rows=Object.entries(model.data.inventory).filter(([,n])=>n>0); return rows.length?rows.map(([id,n])=>row(escape(item(id).name),action,id,'×'+n,false,id===model.selection)).join(''):'<div class="empty-state">กระเป๋ายังว่าง<br><span class="tiny">ของที่เก็บจะอยู่ที่นี่</span></div>';}
  function createData(preset='ruins') {
    const data={name:'ผู้เล่น',hp:16,gold:37,foodDF:0,armor:null,weapon:null,bottle:true,phone:true,nUnlocked:false,ringUses:0,usedMuffin:false,inventory:{soul_bottle:1,warm_muffin:1,ruins_candy:1,spider_cookie:1,faded_ribbon:1,toriel_phone:1,toriel_white_shoes:1},stock:{spider_cookie:3,spider_tea:2},storage:{},petMood:0,chapter:'CH01',room:'รูน · ลานดาวบันทึก',spareCount:2,killCount:0};
    if(preset==='forest')Object.assign(data,{name:null,gold:0,phone:false,nUnlocked:true,ringUses:1,chapter:'CH00',room:'ป่า · สวนศักดิ์สิทธิ์',inventory:{soul_bottle:1,warm_muffin:1,old_fox_ring:1}});
    if(preset==='empty')data.inventory={};
    if(preset==='poor')data.gold=0;
    return data;
  }
  function toast(text) {$('toast').textContent=text;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2600);}
  function navigate(page, push=true) {if(!builders[page])throw new Error('Missing screen '+page);if(push&&page!==model.page)model.stack.push(model.page);model.page=page;render();}
  function back() {
    if(model.page==='pause'){model.stack=[];navigate('world',false);return;}
    const menuParent={inventory:'pause',stats:'pause',powers:'pause',phone:'pause',item:'inventory',equipment:'inventory',contacts:'phone'};
    if(menuParent[model.page]){navigate(menuParent[model.page],false);return;}
    navigate(model.stack.pop()||model.catalog.screens.find(s=>s.id===model.page)?.parent||'title',false);
  }
  function nav(filter='') {
    const grouped={};for(const s of model.catalog.screens){if(filter&&!`${s.id} ${s.title} ${s.group}`.toLowerCase().includes(filter.toLowerCase()))continue;(grouped[s.group]??=[]).push(s);}
    $('screen-nav').innerHTML=Object.entries(grouped).map(([group,screens])=>`<section class="nav-group"><h3>${group}</h3>${screens.map(s=>`<button class="nav-button" data-screen="${s.id}" ${s.id===model.page?'aria-current="page"':''}><span>${String(s.number).padStart(2,'0')}</span><span>${escape(s.title)}</span>${s.scope==='future-ui'?'<small class="nav-future">อนาคต</small>':''}</button>`).join('')}</section>`).join('');
  }
  function render() {
    const entry=model.catalog.screens.find(s=>s.id===model.page);
    $('screen').innerHTML=builders[model.page]();$('screen').className=OVERWORLD_MENUS.has(model.page)?'overworld-active':['title','world'].includes(model.page)?'':'dim';
    $('game').classList.toggle('reduce-motion',model.settings.reduceMotion);$('game').classList.toggle('large-text',model.settings.largeText);
    $('screen-title').textContent=entry.title;$('screen-number').textContent=`${String(entry.number).padStart(2,'0')} / ${model.catalog.screenCount}`;
    $('scope-note').textContent=descriptions[entry.scope];$('scope-note').className='scope-note'+(entry.scope==='future-ui'?' future':'');
    $('interaction-note').textContent=`${entry.title} · ปุ่มและข้อมูลเป็นพรีวิวที่ลองได้ ย้อนด้วย Esc · ${entry.scope==='future-ui'?'ไม่ปลดระบบนี้ให้เกมจริง':'ไม่เปลี่ยน checkpoint ของเกมจริง'}`;
    if(!model.renderedPages.includes(model.page))model.renderedPages.push(model.page);
    nav($('screen-search').value);drawWorld();drawArt();
    const focused=$('screen').querySelector('input:not([type=range]),button:not(:disabled),select');focused?.focus({preventScroll:true});
    if(model.page==='pause'||model.page==='stats')$('screen').querySelector(`.overworld-tab[data-value="${model.page==='pause'?model.menuCursor:'stats'}"]:not(:disabled)`)?.focus({preventScroll:true});
    if(['reset','gameover','save-error'].includes(model.page))$('screen').querySelector('[data-action="back"], [data-value="title"]')?.focus({preventScroll:true});
  }
  function drawWorld() {
    const cv=$('world-bg'),c=cv.getContext('2d');c.imageSmoothingEnabled=false;
    c.fillStyle='#111b25';c.fillRect(0,0,400,225);
    c.fillStyle='#22372f';c.fillRect(25,100,350,104);c.fillStyle='#2b4037';c.fillRect(35,139,330,30);
    for(let x=0;x<440;x+=62){c.fillStyle='#172b30';c.fillRect(x-15,0,24,127);c.fillStyle='#233941';c.fillRect(x-20,6,34,42);c.fillRect(x-26,45,43,26);c.fillStyle='#2d4449';c.fillRect(x-24,18,28,9);}
    for(const [x,y]of[[52,181],[112,104],[303,172],[352,115],[265,190]]){c.fillStyle='#48747c';c.fillRect(x,y,8,2);c.fillRect(x+3,y-3,2,8);c.fillStyle='#91dfea';c.fillRect(x+3,y,2,2);}
    c.fillStyle='#0b112661';c.fillRect(0,0,400,225);
    if((model.page==='world'||OVERWORLD_MENUS.has(model.page)||['call','incoming'].includes(model.page))&&art.player){c.drawImage(art.player,model.player.x-12,model.player.y-32,24,32);c.fillStyle='#efc681';c.fillRect(282,129,3,12);c.fillRect(277,134,13,3);}
    if(['battle','target','act','battle-items','mercy','fight','dodge','reward'].includes(model.page)){c.fillStyle='#070c18';c.fillRect(0,0,400,225);}
  }
  function drawArt() {
    $('screen').querySelectorAll('[data-art]').forEach(cv=>{const c=cv.getContext('2d');c.imageSmoothingEnabled=false;if(cv.dataset.art.startsWith('toriel')&&art.portrait)c.drawImage(art.portrait,399,82,170,150,0,0,cv.width,cv.height);if(cv.dataset.art==='froggit'&&art.monster)c.drawImage(art.monster,105,140,270,235,0,0,84,70);});
    const dodge=$('dodge-canvas');if(dodge){const c=dodge.getContext('2d');c.fillStyle='#070c18';c.fillRect(0,0,248,76);c.fillStyle='#d4eee8';for(const [x,y]of[[18,17],[43,55],[189,22],[216,53],[161,47]])c.fillRect(x,y,4,4);c.fillStyle='#f16c81';const {x,y}=model.heart;c.fillRect(x-4,y-3,3,3);c.fillRect(x+1,y-3,3,3);c.fillRect(x-4,y,8,3);c.fillRect(x-2,y+3,4,2);}
  }
  function payload() {return {scope:'underfall-interface-preview',schemaVersion:1,data:structuredClone(model.data),settings:structuredClone(model.settings)};}
  function validPreview(value) {
    if(!value||value.scope!=='underfall-interface-preview'||value.schemaVersion!==1||!value.data)return false;
    const d=value.data;const counts=v=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.entries(v).every(([id,n])=>Object.hasOwn(ITEMS,id)&&Number.isInteger(n)&&n>=0&&n<=9999);
    return counts(d.inventory)&&counts(d.storage)&&Number.isInteger(d.hp)&&d.hp>=0&&d.hp<=20&&Number.isInteger(d.gold)&&d.gold>=0&&d.gold<=999999&&[0,4].includes(d.foodDF)&&[null,'faded_ribbon'].includes(d.armor)&&[null,'toy_knife'].includes(d.weapon)&&typeof d.phone==='boolean'&&typeof d.bottle==='boolean'&&typeof d.nUnlocked==='boolean'&&typeof d.usedMuffin==='boolean'&&[0,1].includes(d.ringUses)&&typeof d.room==='string'&&d.room.length<=100&&['CH00','CH01'].includes(d.chapter)&&(d.name===null||typeof d.name==='string'&&[...new Intl.Segmenter('th',{granularity:'grapheme'}).segment(d.name)].length<=12)&&d.stock&&Number.isInteger(d.stock.spider_cookie)&&d.stock.spider_cookie>=0&&d.stock.spider_cookie<=3&&Number.isInteger(d.stock.spider_tea)&&d.stock.spider_tea>=0&&d.stock.spider_tea<=2&&Number.isInteger(d.petMood)&&d.petMood>=0;
  }
  function save() {try{if(model.forceSaveError)throw new Error('ตัวอย่างพื้นที่บันทึกถูกปิดกั้น');const next=payload();next.data.hp=20;const old=localStorage.getItem(KEY);if(old&&validPreview(JSON.parse(old))){localStorage.setItem(BACKUP,old);model.backup=JSON.parse(old).data;}localStorage.setItem(KEY,JSON.stringify(next));model.checkpoint=structuredClone(next.data);model.data.hp=20;model.saveConfirmed=true;navigate('saved');}catch(error){model.lastSaveError=String(error.message);navigate('save-error');}}
  function exportPreview() {const blob=new Blob([JSON.stringify(payload(),null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='underfall-interface-preview.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('ส่งออกเฉพาะข้อมูลพรีวิว ไม่ใช่เซฟเกม');}
  function applySettings() {try{localStorage.setItem(KEY+'.settings',JSON.stringify(model.settings));}catch{toast('เก็บตั้งค่าได้เฉพาะรอบนี้ — เบราว์เซอร์ปิดกั้นพื้นที่พรีวิว');} $('game').classList.toggle('reduce-motion',model.settings.reduceMotion);$('game').classList.toggle('large-text',model.settings.largeText);}
  function testSound(){try{audioContext??=new (window.AudioContext||window.webkitAudioContext)();audioContext.resume();const o=audioContext.createOscillator(),g=audioContext.createGain();o.type='square';o.frequency.value=440;g.gain.value=model.settings.mute?0:model.settings.sfx/100*.04;o.connect(g);g.connect(audioContext.destination);o.start();o.stop(audioContext.currentTime+.08);toast(model.settings.mute?'เสียงถูกปิดอยู่':'เสียงพรีวิวสังเคราะห์ — ไม่ใช้เสียง Undertale');}catch{toast('อุปกรณ์นี้ยังเปิดเสียงไม่ได้');}}

  // SCREEN BUILDERS
  function railLabel(text){
    const glyph={I:['11111','00100','00100','00100','00100','00100','11111'],T:['11111','00100','00100','00100','00100','00100','00100'],E:['11111','10000','10000','11110','10000','10000','11111'],M:['10001','11011','10101','10101','10001','10001','10001'],S:['01111','10000','10000','01110','00001','00001','11110'],A:['01110','10001','10001','11111','10001','10001','10001'],C:['01111','10000','10000','10000','10000','10000','01111'],L:['10000','10000','10000','10000','10000','10000','11111'],O:['01110','10001','10001','10001','10001','10001','01110'],U:['10001','10001','10001','10001','10001','10001','01110']};
    return `<svg class="overworld-tab-label" viewBox="0 0 ${text.length*6-1} 7" aria-hidden="true" shape-rendering="crispEdges">`+[...text].map((letter,i)=>glyph[letter].map((r,y)=>[...r].map((p,x)=>p==='1'?`<rect x="${i*6+x}" y="${y}" width="1" height="1" fill="currentColor"/>`:'').join('')).join('')).join('')+'</svg>';
  }
  function overworldShell(id,title='',body='',footer='',code=''){
    const category=MENU_CATEGORY[id]||model.menuCursor;
    const tabs=[['ITEM','ไอเทม','inventory',true],['STAT','สถานะ','stats',true],['CELL','โทรศัพท์','phone',model.data.phone],['SOUL','ขวดวิญญาณ','powers',model.data.bottle]];
    const rail=`<nav class="overworld-rail" aria-label="เมนูระหว่างเดิน">${tabs.map(([label,thai,target,enabled])=>`<button class="overworld-tab ${target===category?'is-current':''}" data-action="menu-tab" data-value="${target}" aria-label="${label} · ${thai}" ${target===category?'aria-current="page"':''} ${enabled?'':'disabled'} title="${enabled?thai:target==='phone'?'ยังไม่ได้รับโทรศัพท์':'ยังไม่ได้รับขวด'}"><span class="pixel-heart" aria-hidden="true"></span>${railLabel(label)}</button>`).join('')}</nav>`;
    const mini=`<aside class="overworld-mini" aria-label="สถานะย่อ"><strong class="overworld-mini-name" title="${escape(displayName())}">${escape(displayName())}</strong><div class="mini-line"><span>${escape(model.data.chapter)}</span><span title="LVยังไม่ใช้ในสองCH">LV —</span></div><div class="mini-line"><span>HP</span><span>${model.data.hp}/20</span></div><div class="mini-line"><span>G</span><span>${model.data.gold}</span></div></aside>`;
    const tools=`<div class="overworld-tools">${button('Esc · เดินต่อ','close-menu','','ghost')}<div class="button-row">${goButton('ตั้งค่า','settings','ghost')}${goButton('เมนูหลัก','title','ghost')}</div></div>`;
    if(id==='pause')return rail+mini+tools+'<div class="overworld-root-hint">เลือกเมนูด้วยลูกศร / WASD<br>กด Z หรือ Enter เพื่อเปิด<br><span class="blue">ฉากและตัวละครยังอยู่ที่เดิม</span></div>';
    const pane=`<section class="overworld-pane ${id==='stats'?'stats-pane':''}" data-category="${category}" aria-label="${escape(title)}"><header class="overworld-pane-head"><h3 title="${escape(title)}">${escape(title)}</h3><span class="code">${code||'UNDERFALL'}</span></header><div class="overworld-pane-body">${body}</div><footer class="overworld-pane-foot">${footer||button('‹ กลับ','back','','ghost')}</footer></section>`;
    return rail+mini+pane;
  }
  function installOverworldMenus(){
    const originals=Object.fromEntries(['item','equipment','powers','phone','contacts'].map(id=>[id,builders[id]]));
    for(const [id,build]of Object.entries(originals))builders[id]=()=>{
      const fragment=document.createElement('template');fragment.innerHTML=build();
      return overworldShell(id,fragment.content.querySelector('.screen-head h3').textContent,fragment.content.querySelector('.screen-content').innerHTML,fragment.content.querySelector('.screen-foot').innerHTML,fragment.content.querySelector('.code').textContent);
    };
    builders.pause=()=>overworldShell('pause');
    builders.inventory=()=>overworldShell('inventory','ของที่ติดตัว',`<p class="overworld-item-note">เลือกของเพื่ออ่าน / ใช้ · เลื่อนดูได้</p><div class="overworld-item-list">${inventoryRows()}</div>`,button('‹ กลับ','back','','ghost')+`<div class="button-row">${goButton('อุปกรณ์','equipment')}${goButton('สถานะ','stats')}</div>`,'ITEM');
    builders.stats=()=>overworldShell('stats','สถานะผู้เล่น',`<div class="overworld-stats-main"><div class="overworld-stats-name" title="${escape(displayName())}">“${escape(displayName())}”</div><div class="overworld-stat-chapter">${escape(model.data.chapter)} · LV —</div><div class="overworld-stat-primary">HP ${model.data.hp}/${20}</div><div class="overworld-stat-primary">GOLD ${model.data.gold}</div><img class="overworld-stats-hero" src="${STAT_PLAYER}" alt="ภาพผู้เล่นพิกเซลตามรูปอ้างอิงสำหรับSTAT"></div><div class="overworld-stats-grid"><div><span title="โบนัสอาวุธ ไม่ใช่สูตรdamageทั้งหมด">AT BONUS</span><span>+${model.data.weapon?item(model.data.weapon).at:0}</span></div><div class="unavailable" title="EXPยังไม่ใช้ในCH00–CH01"><span>EXP</span><span>—</span></div><div><span>DF</span><span>${df()}</span></div><div class="unavailable" title="NEXTยังไม่มีระบบเลเวลในสองCH"><span>NEXT</span><span>—</span></div></div><div class="overworld-stat-gear"><span>WEAPON:</span><span>${escape(model.data.weapon?item(model.data.weapon).name:'ยังไม่ใส่')}</span></div><div class="overworld-stat-gear"><span>ARMOR:</span><span>${escape(model.data.armor?item(model.data.armor).name:'ยังไม่ใส่')}</span></div>`,button('‹ กลับ','back','','ghost'),'STAT');
  }
  Object.assign(builders, {
    title:()=>`<div class="hero-title"><h2>${pixelLogo()}</h2><p>ครบรอบ 1 ปี 3 เดือน · เรื่องเล่ายังเดินต่อ</p></div><div class="title-options list">${row('เริ่มใหม่','go','reset','NEW')}${row('เล่นต่อ','go','continue','CONTINUE',!model.checkpoint)}${row('ประวัติ','go','history','CHAPTERS')}</div><div class="title-save small"><span class="blue">${escape(displayName())}</span><br>${escape(model.data.room)}<br><span class="muted tiny">ข้อมูลตัวอย่าง · 00:24</span></div><div class="title-version">${goButton('ตั้งค่า','settings','ghost')}${goButton('เครดิต','credits','ghost')}<span>UI V1 / PREVIEW</span></div>`,
    continue:()=>frame('ที่เดิมที่เราหยุดไว้',`<div class="split"><section class="pixel-panel stack"><span class="tag">SAVE · 1 ช่อง</span><strong class="title-line">${escape(model.checkpoint?.name||'ยังไม่ตั้งชื่อ')}</strong><p class="description">${escape(model.checkpoint?.room||'ยังไม่มีจุดบันทึก')}</p><span class="muted tiny">checkpoint ตัวอย่าง</span></section><section class="soft-panel">${model.checkpoint?`<p class="title-line">${model.checkpoint.chapter}</p><div class="line">HP <span>${model.checkpoint.hp}/20</span></div><div class="line">เงิน <span>${model.checkpoint.gold}G</span></div><p class="description muted">โหลดจุดบันทึก ไม่เล่นบทตกซ้ำ และไม่เริ่ม run ใหม่</p>`:'<div class="empty-state">ยังไม่มีเซฟ<br>เริ่มเรื่องใหม่ก่อนนะ</div>'}</section></div>`,button('เล่นต่อ','load','','primary',!model.checkpoint),'CONTINUE'),
    reset:()=>dialog('เริ่มเรื่องใหม่อีกครั้ง?',`<p>checkpoint และของใน run นี้จะเริ่มใหม่</p><p class="muted">ตั้งค่าและประวัติตอนที่ปลดแล้วต้องคงไว้<br>ต้นแบบนี้รีเซ็ตเฉพาะข้อมูลพรีวิว</p>`,button('ยังไม่เริ่ม','back')+button('ยืนยันเริ่มใหม่','new-run','','danger'),true),
    name:()=>dialog('คุณจะใช้ชื่ออะไร',`<p class="muted">หน้าตั้งชื่อเกิดหลังเข้ามิติ ไม่ใช่ก่อน CH00</p><input id="player-name" class="inline-input" aria-label="ชื่อผู้เล่น" value="${escape(model.pendingName||'')}" autocomplete="off" placeholder="พิมพ์ชื่อของเธอ"><p class="tiny muted" id="name-count">ไทย / อังกฤษ · 1–12 graphemes</p>`,button('ย้อน','back')+button('ยืนยัน','check-name','','primary')),
    'name-confirm':()=>dialog('ชื่อนี้ถูกต้องใช่มั้ย',`<p style="font-size:22px;text-align:center" class="rose">${escape(model.pendingName||displayName())}</p><p class="muted">ชื่อที่เลือกเป็นของผู้เล่น ไม่บังคับเปลี่ยนเป็นริน</p>`,goButton('แก้ชื่อ','name')+button('ใช่ ชื่อนี้','confirm-name','','primary')),
    history:()=>frame('เรื่องเล่าของเรา',`<div class="split wide-right"><section class="pixel-panel list">${row('1 ปี 2 เดือน','episode','legacy','ตอนเดิม')}${row('1 ปี 3 เดือน','episode','ch00','CH00')}${row('ใครบางคนรออยู่ในรูน','episode','ch01','CH01')}</section><section class="soft-panel"><span class="tag">ANNIVERSARY ARCHIVE</span><p class="description">แต่ละวันครบรอบคืออีกบทหนึ่ง<br>กลับไปดูตอนที่ปลดไว้ได้</p><p class="tiny muted">หน้า UI เป็นข้อมูลตัวอย่าง ไม่ใช้เพื่อข้าม gate ในเกมจริง และไม่มีตอน SS2 เปิดให้เล่น</p></section></div>`,goButton('กลับเมนู','title'),'CHAPTERS'),
    episode:()=>frame('หน้าของตอนนี้',`<section class="pixel-panel"><span class="tag">${model.episode==='legacy'?'เกมตอนเดิม':model.episode.toUpperCase()}</span><h3 class="title-line">${model.episode==='legacy'?'1 ปี 2 เดือน · ขวดไฟวิญญาณ':model.episode==='ch00'?'กลับมาที่ป่าอีกครั้ง':'ใครบางคนรออยู่ในรูน'}</h3><p class="description">${model.episode==='legacy'?'เกมเก่าที่ทำไว้จบที่ขวดและจอดำ ไม่ใช้เซฟใหม่ร่วมกัน':model.episode==='ch00'?'เริ่มตกใหม่ → ขวดและสองแขนง → หยุดเมื่อเข้ารอยแยก':'ตกในมิติ → ตั้งชื่อ → รูนและทอเรียล → หยุดก่อนแซน'}</p><p class="tiny blue">บทไม่ยาวเท่าหนึ่งเมืองเสมอไป · ตอนอนาคตยังไม่เปิด</p></section>`,model.episode==='legacy'?button('เปิดเกมตอนเดิม','legacy','','primary'):button('ยังไม่ติดตั้งบทจริง','notice','CH00/CH01ยังเป็นใบงาน ไม่ใช่เกมในพรีวิวนี้'),'EPISODE'),
    'chapter-end':()=>dialog('เรื่องเล่าจะดำเนินต่อ',`<p class="rose">จบ ${model.data.chapter}</p><p>เก็บจุดเชื่อมตอนที่ปลอดภัยแล้ว<br>เมื่อบทถัดไปพร้อม ให้เล่นต่อจากที่นี่</p><p class="tiny muted">ต้นแบบหน้าจอ ไม่ได้เขียน checkpoint เกม</p>`,goButton('เมนูหลัก','title')+goButton('ประวัติ','history','primary')),
    world:()=>`<aside class="hud-panel"><span class="small">${escape(displayName())}</span>${hp()}<div class="tiny muted">${escape(model.data.room)} · ${model.data.gold}G</div></aside><div class="hud-actions">${goButton('I · ของ','inventory')}${button('P · โทร','open-phone','', '',!model.data.phone)}${goButton('พัก','pause')}</div><div class="power-rack">${['X · แสง','C · ไฟ','V · ขอช่วย','B · ฟื้นฟู'].map(t=>`<span class="power-slot">${t}</span>`).join('')}${model.data.nUnlocked?'<span class="power-slot">N · มือ</span>':''}</div><div style="position:absolute;right:33px;bottom:17px">${goButton('ดาว SAVE','save','primary')}</div>`,
    pause:()=>frame('พักตรงนี้ก่อน',`<div class="split"><section class="pixel-panel list">${row('ไอเทม','go','inventory','ITEM')}${row('สถานะ','go','stats','STAT')}${row('โทรศัพท์','open-phone','','PHONE',!model.data.phone)}${row('บันทึกการเดินทาง','go','journal','JOURNAL')}${row('ตั้งค่า','go','settings','SETTINGS')}</section><section class="soft-panel">${hp()}<p class="description">เวลาโลกและพลังพักไปพร้อมเธอ</p><p class="tiny muted">ไม่มีปุ่มเซฟทุกที่จากเมนูพัก<br>บันทึกจริงต้องใช้ดาวหรือจุดเชื่อมบทตามกฎ</p></section></div>`,goButton('เดินต่อ','world','primary')+goButton('เมนูหลัก','title'),'PAUSE'),
    inventory:()=>frame('ของที่ติดตัว',`<div class="split"><section class="pixel-panel scroll list">${inventoryRows()}</section><section class="soft-panel"><p class="title-line">เก็บไว้ไม่ให้หล่นหาย</p><p class="description muted">เลือกของเพื่ออ่านหรือใช้<br>ของสำคัญไม่ถูกกินหรือทิ้ง</p><div class="line">เงิน <span class="gold">${model.data.gold}G</span></div><div class="line">รายการ <span>${Object.values(model.data.inventory).filter(n=>n>0).length}</span></div><p class="tiny blue">เลื่อนรายการได้ · ไม่จำกัด8ช่องในสอง CH</p></section></div>`,goButton('อุปกรณ์','equipment')+goButton('สถานะ','stats'),'ITEM'),
    item:()=>{const i=item(model.selection)||item('soul_bottle'),important=i.kind==='important';return frame(i.name,`<section class="pixel-panel"><span class="tag">${important?'ของสำคัญ':i.kind==='food'?'อาหาร':i.kind==='armor'?'เครื่องป้องกัน':'อาวุธ'} · ×${qty(model.selection)}</span><p class="description">${escape(i.desc)}</p>${i.hp?`<div class="line">ฟื้นฟู <span class="blue">${i.hp} HP</span></div>`:''}${i.df?`<div class="line">ป้องกัน <span>+${i.df} DF</span></div>`:''}${model.selection==='old_fox_ring'?`<p class="tiny gold">ชุบที่เหลือ ${model.data.ringUses}/1 · อัตโนมัติเท่านั้น</p>`:''}${important?'<p class="tiny muted">ดูได้ ไม่กดกิน/ทิ้ง · รองเท้าขาวยังไม่สวม</p>':''}</section>`,button(i.kind==='food'?'ใช้ไอเทม':'ใส่อุปกรณ์','use-item',model.selection,'primary',important||!qty(model.selection))+button('ทิ้ง','drop-item',model.selection,'',important||!qty(model.selection)),'ITEM INFO');},
    equipment:()=>frame('สิ่งที่ใส่อยู่',`<div class="split"><section class="pixel-panel reward-center"><img class="player-art" src="${PLAYER}" alt="ผู้เล่น R5"><p class="tiny muted">รองเท้าน้ำตาลตามแบบที่อนุมัติ</p></section><section class="soft-panel"><div class="line">อาวุธ <span>${escape(model.data.weapon?item(model.data.weapon).name:'ยังไม่ใส่')}</span></div><div class="line">ชุด <span>${escape(model.data.armor?item(model.data.armor).name:'ยังไม่ใส่')}</span></div><div class="line">DF รวม <span>${df()}</span></div><div class="button-row" style="margin-top:9px">${button('ใส่ริบบิ้น','use-item','faded_ribbon','',!qty('faded_ribbon'))}${button('ใส่มีดของเล่น','use-item','toy_knife','',!qty('toy_knife'))}</div><p class="tiny muted">ของที่ถอดไม่หาย · ไม่ซ้อนชุด<br>รองเท้าขาวยังเป็นของฝาก ไม่เพิ่มพลัง</p></section></div>`,'','EQUIP'),
    stats:()=>frame('ตัวเธอในตอนนี้',`<div class="split"><section class="pixel-panel reward-center"><img class="player-art" src="${PLAYER}" alt="ผู้เล่น"><p class="rose">${escape(displayName())}</p></section><section class="soft-panel">${hp()}<div class="line">DF <span>${df()}</span></div><div class="line">GOLD <span>${model.data.gold}G</span></div><div class="line">ของสำคัญ <span>${Object.keys(model.data.inventory).filter(id=>qty(id)&&item(id).kind==='important').length}</span></div><p class="tiny muted">CH00–CH01ยังไม่มี LV/EXP เพิ่มลด<br>ไม่แสดงคะแนนความดีหรือเฉลยเส้นจบ</p></section></div>`,'','STAT'),
    powers:()=>frame('แสงที่พกมาด้วย',`<section class="pixel-panel scroll"><div class="line"><span>X · ส่องทาง</span><span class="blue">5วิ + คูลดาวน์2วิ</span></div><div class="line"><span>C · เผาราก</span><span>เฉพาะรากที่เผาได้</span></div><div class="line"><span>V · ขอความช่วยเหลือ</span><span>ตามเป้าหมาย / บท</span></div><div class="line"><span>B · ฟื้นฟู</span><span>4HP · พัก12วิ</span></div><div class="line"><span>N · มือสองข้าง</span><span>${model.data.nUnlocked?'ปลดแล้ว':'ยังไม่ปลด'}</span></div><p class="tiny muted">ไม่มีmanaในสองCH · หน้าเมนูหยุดคูลดาวน์<br>ไม่ใช้ภาพ/ชื่อจริงของ ??? ก่อนเฉลย</p></section>`,button('ดูสถานะขวด','notice',model.data.bottle?'มีขวดอยู่ในข้อมูลตัวอย่าง':'ยังไม่ได้รับขวด'),'BOTTLE'),
    phone:()=>frame('โทรศัพท์ของทอเรียล',`<div class="split"><section class="pixel-panel list">${row('ไอเทม','go','inventory','ITEM')}${row('โทรหา','go','contacts','CALL',!model.data.phone)}${row('สถานะ','go','stats','STAT')}${row('กลับไปเดิน','go','world','BACK')}</section><section class="soft-panel">${portrait()}<p class="description">${model.data.phone?'หมายเลขของทอเรียลถูกบันทึกไว้แล้ว':'ยังไม่ได้รับโทรศัพท์จากทอเรียล'}</p><p class="tiny muted">ของ / โทร / สถานะใช้ข้อมูลชุดเดียวกับกระเป๋าและหน้าITEMในศึก</p></section></div>`,goButton('ดูขวด','powers'),'PHONE'),
    contacts:()=>frame('ใครที่เธอโทรหาได้',`<div class="split"><section class="pixel-panel list">${row('ทอเรียล','topic','ทักทาย','TORIEL',!model.data.phone)}<p class="tiny muted">เพิ่มรายชื่อหลังพบและปลดจริง<br>ไม่แสดงชื่อที่ยังไม่รู้จัก</p></section><section class="soft-panel list">${['ทักทาย','ถามเรื่องที่นี่','ถามทาง','คำใบ้ปริศนา'].map(t=>row(t,'topic',t,'',!model.data.phone)).join('')}</section></div>`,'','CONTACTS'),
    call:()=>`<div class="screen-head"><h3>สายโทรศัพท์</h3><span class="code">${escape(model.topic)}</span></div><div style="position:absolute;left:22px;top:48px" class="tag">CALL · ตัวอย่างการจัดวาง</div><section class="dialogue-box"><span class="speaker">ทอเรียล</span>${portrait()}<p>พื้นที่แสดงบทตามรหัสจาก story.md<br><span class="muted small">ยังไม่เติมบทใหม่แทนผู้เขียน<br>กดต่อเพื่อดูจังหวะการอ่าน</span></p></section><div style="position:absolute;right:23px;top:47px">${button('อ่านต่อ','call-next')}${goButton('วางสาย','contacts','ghost')}</div>`,
    incoming:()=>dialog('มีสายเรียกเข้า',`<div class="ringing" style="text-align:center">${portrait()}</div><p class="rose" style="text-align:center">ทอเรียล</p><p class="muted">รับสายเมื่อพ้นบทหรือศึกแล้ว<br>เวลาโลกพักระหว่างอ่าน</p>`,button('ไว้ก่อน','back')+button('รับสาย','answer-call','','primary')),
  });

  // INTERACTIONS
  function useItem(id, inBattle=false){
    const value=item(id);if(!value||!qty(id))return toast('ไม่มีของชิ้นนี้ในข้อมูลตัวอย่าง');
    if(value.kind==='important')return toast('ของสำคัญดูได้ ไม่ถูกกินหรือทิ้ง');
    if(value.kind==='food'){
      if(id==='warm_muffin'&&model.data.usedMuffin)return toast('โบนัสมัฟฟิ้นใช้ครั้งเดียวต่อrun');
      model.data.inventory[id]--;model.data.hp=Math.min(20,model.data.hp+value.hp);
      if(value.df){model.data.foodDF=value.df;model.data.usedMuffin=true;}
      toast(`ใช้${value.name} · HP ${model.data.hp}/20${value.df?' · DF+4':''}`);
      if(inBattle){model.healTurns=Math.max(0,(model.healTurns||0)-1);navigate('dodge');return;}
    }else if(value.kind==='armor'){model.data.armor=id;toast('ใส่'+value.name+' · ของเดิมไม่หาย');}
    else if(value.kind==='weapon'){model.data.weapon=id;toast('ใส่'+value.name+' · ไม่เพิ่มkillCounter');}
    render();
  }
  function confirmDrop(id){
    if(!qty(id)||item(id).kind==='important')return toast('ของสำคัญทิ้งไม่ได้');
    const overlay=document.createElement('section');overlay.className='confirm-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','ยืนยันทิ้งไอเทม');
    overlay.innerHTML=dialog('ทิ้งของชิ้นนี้?',`<p>${escape(item(id).name)} ×1</p><p class="tiny muted">กระเป๋าไม่จำกัดช่อง ไม่จำเป็นต้องทิ้งเพื่อเก็บของใหม่</p>`,button('เก็บไว้','close-confirm')+button('ยืนยันทิ้ง','confirm-drop',id,'danger'));
    $('screen').append(overlay);overlay.querySelector('button').focus();
  }
  async function action(name,value=''){
    switch(name){
      case 'go':navigate(value);break;
      case 'back':if($('screen').querySelector('.confirm-overlay')){$('screen').querySelector('.confirm-overlay').remove();}else back();break;
      case 'menu-tab':model.menuCursor=value;navigate(value,false);break;
      case 'close-menu':model.stack=[];navigate('world',false);break;
      case 'notice':toast(value);break;
      case 'new-run':{model.data=createData('forest');Object.assign(model.data,{bottle:false,nUnlocked:false,ringUses:0,hp:20,inventory:{},room:'ป่า · ก่อนเริ่มบท',spareCount:0});model.checkpoint=null;model.saveConfirmed=false;model.stack=[];try{localStorage.removeItem(KEY);localStorage.removeItem(BACKUP);}catch{toast('พื้นที่พรีวิวถูกปิดกั้น — รีเซ็ตได้เฉพาะในรอบนี้');}navigate('world',false);break;}
      case 'load':if(model.checkpoint){model.data=structuredClone(model.checkpoint);model.stack=[];navigate('world',false);toast('โหลด checkpoint พรีวิว — ไม่เริ่ม run ใหม่');}else toast('ยังไม่มีจุดบันทึก');break;
      case 'check-name':{const input=$('player-name').value.trim();const parts=[...new Intl.Segmenter('th',{granularity:'grapheme'}).segment(input)];if(/\p{Cc}/u.test(input)||parts.length<1||parts.length>12)return toast('ใช้ชื่อ1–12ตัวอักษรที่มองเห็น ไม่รับตัวควบคุม/ขึ้นบรรทัด');model.pendingName=input;navigate('name-confirm');break;}
      case 'confirm-name':if(model.pendingName){model.data.name=model.pendingName;model.data.chapter='CH01';navigate('world');toast('ยืนยันชื่อเฉพาะพรีวิว ไม่เขียนจุดเชื่อมเกมจริง');}break;
      case 'episode':model.episode=value;navigate('episode');break;
      case 'legacy':window.open(ROOT+'index.html','_blank','noopener');break;
      case 'inspect':model.selection=value;navigate('item');break;
      case 'use-item':useItem(value);break;
      case 'battle-use':useItem(value,true);break;
      case 'drop-item':confirmDrop(value);break;
      case 'close-confirm':$('screen').querySelector('.confirm-overlay')?.remove();break;
      case 'confirm-drop':if(qty(value)&&item(value).kind!=='important'){model.data.inventory[value]--;toast('ทิ้งหนึ่งชิ้นในพรีวิว');render();}break;
      case 'open-phone':if(model.data.phone)navigate('phone');else toast('ต้องได้รับโทรศัพท์จากทอเรียลก่อน');break;
      case 'topic':if(!model.data.phone)return toast('ยังไม่มีโทรศัพท์');model.topic=value;navigate('call');break;
      case 'answer-call':if(!model.data.phone)return toast('ยังไม่ได้รับโทรศัพท์');model.topic='สายเรียกเข้า';navigate('call');break;
      case 'call-next':{const text='ตัวอย่างจังหวะอ่านบท · เมื่อเชื่อมเกมให้ใช้ข้อความตามรหัสจาก story.md';const target=$('screen').querySelector('.dialogue-box p');if(!target)break;model.callPreviewCount=(model.callPreviewCount||0)+1;if(model.settings.fastText){target.textContent=text;}else{const parts=[...new Intl.Segmenter('th',{granularity:'grapheme'}).segment(text)].map(x=>x.segment);target.textContent='';for(const part of parts){if(!target.isConnected)break;target.textContent+=part;await new Promise(r=>setTimeout(r,1000/30));}}break;}
      case 'save':save();break;
      case 'force-error':model.forceSaveError=true;save();model.forceSaveError=false;break;
      case 'retry-save':model.forceSaveError=false;save();break;
      case 'export':exportPreview();break;
      case 'pick-file':$('preview-file').click();break;
      case 'restore':if(model.backup){model.data=structuredClone(model.backup);model.checkpoint=structuredClone(model.backup);navigate('world');toast('โหลดสำรองพรีวิวที่ตรวจแล้ว');}else toast('ไม่มีสำรองที่ตรวจได้');break;
      case 'act':model.actCount=(model.actCount||0)+1;toast(`ACT: ${value} · ตัวอย่างการตอบสนอง ${model.actCount}`);navigate('dodge');break;
      case 'spare':model.sparePreview=(model.sparePreview||0)+1;model.lastBattleResult='SPARE · พรีวิวการไว้ชีวิต';navigate('reward');break;
      case 'flee':if(!canFight())return toast('หนีไม่ได้ในศึกทอเรียล');navigate('world');break;
      case 'strike':if(!canFight())return toast('ศึกทอเรียลรุ่นนี้ไม่เปิด FIGHT');toast('เลือกจังหวะแล้ว · ไม่ทำdamage/ฆ่าจริงในพรีวิว');navigate('dodge');break;
      case 'end-turn':model.healTurns=Math.max(0,(model.healTurns||0)-1);navigate('battle');break;
      case 'battle-heal':if(!canFight())return toast('พลังขวดปิดในศึกทอเรียล');if(model.data.hp===20)return toast('HPเต็ม ไม่กินเทิร์น');if(model.healTurns>0)return toast(`เหลือ ${model.healTurns} เทิร์นก่อนใช้B`);model.data.hp=Math.min(20,model.data.hp+4);model.healTurns=3;navigate('dodge');break;
      case 'buy':{const valueItem=item(value);if(!valueItem||model.data.stock[value]<=0)return toast('ขายหมดแล้วในrunตัวอย่าง');if(model.data.gold<valueItem.price)return toast('เงินยังไม่พอ — ไม่หักเงินหรือให้ของ');model.data.gold-=valueItem.price;model.data.stock[value]--;model.data.inventory[value]=(qty(value)||0)+1;toast('ได้รับ'+valueItem.name);render();break;}
      case 'shop-topic':model.shopTopic=value;render();break;
      case 'deposit':if(qty(value)&&item(value).kind!=='important'){model.data.inventory[value]--;model.data.storage[value]=(model.data.storage[value]||0)+1;render();toast('ลองฝากในกล่องพรีวิว · ระบบอนาคต');}break;
      case 'withdraw':if(model.data.storage[value]>0){model.data.storage[value]--;model.data.inventory[value]=(qty(value)||0)+1;render();}break;
      case 'pin':model.pinnedPreview=!model.pinnedPreview;toast(model.pinnedPreview?'ปักหมุดUIตัวอย่างแล้ว — ไม่ทำเควสเสร็จ':'เอาหมุดตัวอย่างออกแล้ว');break;
      case 'preview-choice':model.uiChoice=value;toast('เลือก “'+value+'” ใน UIตัวอย่าง ไม่เปลี่ยนแขนงเกมจริง');navigate('world');break;
      case 'pet':model.data.petMood++;render();toast('ลองปฏิกิริยา UI '+(value==='feed'?'ให้อาหาร':'ลูบ')+' · ไม่กินของ/กำหนดกฎเลี้ยง');break;
      case 'sound':testSound();break;
    }
  }
  $('screen-nav').addEventListener('click',e=>{const target=e.target.closest('[data-screen]');if(target&&model.ready)navigate(target.dataset.screen);});
  $('screen-search').addEventListener('input',e=>nav(e.target.value));
  $('preset').addEventListener('change',e=>{model.preset=e.target.value;model.data=createData(model.preset);model.checkpoint=model.preset==='no-save'?null:structuredClone(model.data);model.forceSaveError=false;model.healTurns=0;model.saveConfirmed=false;render();toast('เปลี่ยนเฉพาะ fixture พรีวิว ไม่แตะข้อมูลเกมจริง');});
  $('screen').addEventListener('click',e=>{const target=e.target.closest('[data-action]');if(target&&!target.disabled)action(target.dataset.action,target.dataset.value||'').catch(error=>{model.errors.push(String(error));toast('พรีวิวพบปัญหา: '+error.message);});});
  $('screen').addEventListener('input',e=>{if(e.target.dataset.setting){model.settings[e.target.dataset.setting]=e.target.type==='checkbox'?e.target.checked:Number(e.target.value);applySettings();}});
  $('screen').addEventListener('focusin',e=>{const tab=e.target.closest('.overworld-tab');if(tab){model.menuCursor=tab.dataset.value;if(model.page==='pause')$('screen').querySelectorAll('.overworld-tab').forEach(button=>button.classList.toggle('is-current',button.dataset.value===model.menuCursor));}});
  $('screen').addEventListener('change',async e=>{if(e.target.id==='preview-file'&&e.target.files[0]){try{const file=e.target.files[0];if(file.size>100000)throw new Error('ไฟล์พรีวิวใหญ่เกิน100KB');const value=JSON.parse(await file.text());if(!validPreview(value))throw new Error('ไม่ใช่ข้อมูลพรีวิวรุ่นที่รองรับ');model.data=value.data;model.checkpoint=structuredClone(value.data);navigate('world');toast('นำเข้าข้อมูลพรีวิวที่ตรวจแล้ว');}catch(error){toast('ไม่นำเข้า: '+error.message);}}});
  $('fullscreen').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen();else $('viewport-wrap').requestFullscreen().catch(()=>toast('เบราว์เซอร์นี้ยังไม่รองรับขยายเต็มจอ'));});
  document.addEventListener('keydown',e=>{
    if(!model.ready)return;
    const key=/^Key[A-Z]$/.test(e.code)?e.code.at(-1).toLowerCase():e.key;
    const editing=e.target.matches('input,select,textarea');
    if(key==='Escape'){e.preventDefault();if(e.repeat)return;if(model.page==='world')navigate('pause');else action('back');return;}
    if(editing)return;
    const modal=$('screen').querySelector('.confirm-overlay');
    if(modal&&key==='Tab'){const buttons=[...modal.querySelectorAll('button:not(:disabled)')];const current=buttons.indexOf(document.activeElement);if(e.shiftKey&&current<=0){e.preventDefault();buttons.at(-1)?.focus();}else if(!e.shiftKey&&current===buttons.length-1){e.preventDefault();buttons[0]?.focus();}return;}
    if(['i','p','m'].includes(key)){e.preventDefault();if(e.repeat)return;if(key==='i')navigate('inventory');if(key==='p')action('open-phone');if(key==='m'){model.settings.mute=!model.settings.mute;applySettings();toast(model.settings.mute?'ปิดเสียงแล้ว':'เปิดเสียงแล้ว');}return;}
    const dx=Number(['d','ArrowRight'].includes(key))-Number(['a','ArrowLeft'].includes(key));
    const dy=Number(['s','ArrowDown'].includes(key))-Number(['w','ArrowUp'].includes(key));
    if((dx||dy)&&model.page==='dodge'){e.preventDefault();model.heart.x=Math.max(5,Math.min(243,model.heart.x+dx*4));model.heart.y=Math.max(5,Math.min(70,model.heart.y+dy*4));drawArt();return;}
    if((dx||dy)&&model.page==='world'){e.preventDefault();model.player.x=Math.max(26,Math.min(374,model.player.x+dx*4));model.player.y=Math.max(48,Math.min(199,model.player.y+dy*4));drawWorld();return;}
    if((dx||dy)&&document.activeElement.closest('.overworld-rail')){e.preventDefault();if(dx>0&&model.page!=='pause'){$('screen').querySelector('.overworld-pane button:not(:disabled)')?.focus();return;}const tabs=[...$('screen').querySelectorAll('.overworld-tab:not(:disabled)')];const index=tabs.indexOf(document.activeElement);tabs[(index+(dy||dx)+tabs.length)%tabs.length]?.focus();return;}
    const container=$('screen').querySelector('.confirm-overlay')||$('screen');
    const controls=[...container.querySelectorAll('button:not(:disabled),a[href]')];
    if(dx||dy){e.preventDefault();const current=controls.indexOf(document.activeElement);controls[(current+(dx||dy)+controls.length)%controls.length]?.focus();}
    if(['z','Enter',' '].includes(key)){e.preventDefault();if(!e.repeat&&container.contains(document.activeElement))document.activeElement.click();}
  });
  function combat(body='', menu=false) {
    const name=model.preset==='toriel'?'ทอเรียล · ไว้ชีวิตเท่านั้น':'Froggit';
    const enemyTurn=model.page==='dodge';
    const commands=[['FIGHT','fight'],['ACT','act'],['ITEM','battle-items'],['× MERCY','mercy']].map(([label,page])=>`<button data-action="go" data-value="${page}" ${enemyTurn||page==='fight'&&!canFight()?'disabled':''} title="${enemyTurn?'รอจบเทิร์นมอนสเตอร์':page==='fight'&&!canFight()?'ศึกทอเรียลรุ่นนี้ไว้ชีวิตเท่านั้น':label}">${label}</button>`).join('');
    return `<canvas class="battle-monster native-canvas" width="84" height="70" data-art="${model.preset==='toriel'?'toriel-battle':'froggit'}" aria-label="ภาพอ้างอิง${name}"></canvas>${menu?`<section class="battle-menu">${body}</section>`:body||`<div class="battle-copy">${name} · อ่านท่าที แล้วเลือกวิธีตอบ</div><img class="battle-player" src="${PLAYER}" alt="ผู้เล่นยืนในเทิร์นของตน">`}<div class="battle-stat"><span>${escape(displayName())}</span>${hp()}<span>${model.data.gold}G</span></div><div class="battle-commands">${commands}</div>`;
  }
  Object.assign(builders, {
    save:()=>frame('แสงเล็กๆ ที่รออยู่',`<div class="split"><section class="pixel-panel reward-center"><div class="save-star">✦</div><p class="title-line">${escape(displayName())}</p><span class="tag">SAVE · จุดปลอดภัย</span></section><section class="soft-panel"><p class="description">${escape(model.data.room)}</p>${hp()}<p class="tiny muted">บันทึกสำเร็จแล้วฟื้น HP20<br>ไม่คืนของ เงิน หรือแหวนที่ใช้ไป</p><div class="line">เวลาเล่นตัวอย่าง <span>00:24</span></div></section></div>`,button('บันทึก','save','','primary')+button('ลองกรณีบันทึกไม่ได้','force-error','','ghost'),'SAVE'),
    saved:()=>dialog(model.saveConfirmed?'บันทึกพรีวิวสำเร็จ':'ตัวอย่างหน้าบันทึกสำเร็จ',`<div class="reward-center"><span class="save-star">✦</span></div><p>${escape(displayName())} · ${escape(model.data.room)}</p><p class="blue">หนึ่งจุดที่เรากลับมาได้</p><p class="tiny muted">พื้นที่พรีวิวแยกจากเซฟเกมจริง<br>HP ${model.data.hp}/20 · ของไม่ถูกแจกซ้ำ</p>`,goButton('เดินต่อ','world','primary')),
    'save-error':()=>dialog('ยังบันทึกไม่สำเร็จ',`<p class="danger-text">${escape(model.lastSaveError||'ตัวอย่าง: พื้นที่บันทึกเต็มหรือถูกปิดกั้น')}</p><p>ข้อมูลเดิมไม่ถูกล้าง<br>ลองใหม่ หรือส่งออกข้อมูลเก็บไว้ก่อน</p><p class="tiny muted">ไม่มีข้อความว่าเซฟแล้วก่อน commit สำเร็จ</p>`,button('ย้อน','back')+button('ส่งออก','export')+button('ลองใหม่','retry-save','','primary'),true),
    recovery:()=>frame('เก็บเรื่องเล่าไว้ให้ปลอดภัย',`<section class="pixel-panel"><p class="description">โหลดสำรองที่ตรวจว่าเป็นข้อมูลพรีวิวแล้ว หรือส่งออกก่อนเริ่มแก้ข้อมูล</p><div class="button-row">${button('โหลดสำรองพรีวิว','restore','','',!model.backup)}${button('ส่งออกพรีวิว','export')}${button('นำเข้าพรีวิว','pick-file')}</div><input id="preview-file" type="file" accept="application/json,.json" hidden><p class="tiny muted">รับเฉพาะ scope=underfall-interface-preview<br>ไม่รับเซฟเกมจริงและไม่เขียน underfall.save.v1</p><p class="tiny blue">ไม่มีสำรองที่ใช้ได้ จะไม่ล้างข้อมูลเอง</p></section>`,'','RECOVERY'),
    gameover:()=>dialog('GAME OVER',`<div class="reward-center"><span class="pixel-heart" style="width:24px;height:21px"></span></div><p class="rose" style="text-align:center">${escape(displayName())}</p><p style="text-align:center">กลับไปยังจุดที่บันทึกไว้<br>เมื่อเธอพร้อมจะเดินต่อ</p><p class="tiny muted">แหวนที่ชุบได้ต้องทำงานก่อนหน้านี้<br>โหลดไม่เท่ากับ RESET เรื่องราว</p>`,goButton('เมนูหลัก','title')+button('เล่นต่อจาก SAVE','load','','primary',!model.checkpoint)),
    battle:()=>combat(),
    target:()=>combat(`<p class="tiny muted">เลือกเป้าหมายของคำสั่ง</p>${row(model.preset==='toriel'?'ทอเรียล':'Froggit','go','act','ACT')}`,true),
    act:()=>combat(`<div class="list">${['ตรวจสอบ','ชมเชย','คุยอย่างใจเย็น'].map(t=>row(t,'act',t)).join('')}</div>`,true),
    'battle-items':()=>combat(`<div class="list">${Object.entries(model.data.inventory).filter(([id,n])=>n>0&&item(id).kind==='food').map(([id,n])=>row(escape(item(id).name),'battle-use',id,'×'+n)).join('')||'<div class="empty-state">ไม่มีอาหารในกระเป๋า</div>'}</div>`,true)+(canFight()?`<div class="battle-ability">${button('B · ฟื้น','battle-heal','', '',model.data.hp===20||model.healTurns>0)}<br>พัก ${model.healTurns||0} เทิร์น</div>`:'<div class="battle-ability">พลังขวดปิด<br>ศึกทอเรียล</div>'),
    mercy:()=>combat(`${row('ไว้ชีวิต','spare','','SPARE')}${row('หนี','flee','','FLEE',!canFight())}<p class="tiny muted">${canFight()?'สถานะไว้ชีวิตมีทั้งข้อความ/สัญลักษณ์ ไม่ใช้สีอย่างเดียว':'ศึกทอเรียล: ยืนยัน SPARE ไม่ใช่เลือกเมนูอย่างเดียว'}</p>`,true),
    fight:()=>combat(`<div class="tiny muted">แถบจังหวะตัวอย่าง · ไม่มีการฆ่าจริง</div><div class="fight-bar"><span class="fight-pointer"></span></div>${button('ยืนยันจังหวะ','strike','','primary',!canFight())}`,true),
    dodge:()=>combat(`<canvas id="dodge-canvas" class="bullet-canvas" width="248" height="76" aria-label="พื้นที่ตัวอย่างหัวใจหลบโจมตี"></canvas><div style="position:absolute;left:76px;top:82px" class="tiny blue">WASD / ลูกศร · รูปแบบกระสุนเป็นตัวอย่างUI</div><div class="battle-ability">${button('จบเทิร์น','end-turn')}</div>`),
    reward:()=>frame('เรื่องเล่าหลังการพบกัน',`<section class="pixel-panel reward-center"><span class="tag">${escape(model.lastBattleResult||'SPARED · ตัวอย่าง')}</span><p class="description">หน้ารายงานการจบศึก<br>เงินต้องมาจาก encounterId/rewardLedger จริง</p><div class="line">GOLD <span class="gold">+0G · พรีวิวไม่แจกเงินศึก</span></div><p class="tiny muted">ไม่ประกาศ Good/Pacifist/Bad จากการกดปุ่มเดียว<br>และไม่เพิ่ม EXP/LV ในสองCHนี้</p></section>`,goButton('กลับไปเดิน','world','primary'),'RESULT'),
    shop:()=>frame('ร้านขนมแมงมุม',`<div class="split"><section class="soft-panel"><div class="shop-sign">ร้านใยหวาน<br><span class="tiny">ภาพตกแต่งร้านแบบ UI</span></div><p class="small">เงินของเธอ <span class="gold">${model.data.gold}G</span></p><p class="tiny muted">U15B · กลับประตูเดิม<br>ไม่ลัดผ่านปริศนา</p></section><section class="pixel-panel list">${row('ซื้อขนม','go','buy','BUY')}${row('ขายของ','go','sell','SELL')}${row('ชวนคุย','go','talk','TALK')}${row('ออกจากร้าน','go','world','EXIT')}</section></div>`,'','SHOP'),
    buy:()=>frame('เลือกของอุ่นๆ กลับไป',`<div class="split"><section class="pixel-panel list">${['spider_cookie','spider_tea'].map(id=>row(escape(item(id).name),'buy',id,`${item(id).price}G · เหลือ${model.data.stock[id]}`,model.data.stock[id]===0)).join('')}</section><section class="soft-panel"><p class="title-line gold">${model.data.gold}G</p><p class="description">คุกกี้ · ฟื้น6HP<br>ชาดอกไม้ · ฟื้น10HP</p><p class="tiny muted">เงินไม่พอจะไม่ถูกหัก<br>stockต่อrun: คุกกี้3 / ชา2<br>ของและเงินเปลี่ยนในพรีวิวจริง</p></section></div>`,'','BUY'),
    sell:()=>frame('มีบางอย่างที่ควรเก็บไว้',`<section class="pixel-panel"><h3 class="title-line">ร้านนี้ไม่รับซื้อของ</h3><p class="description">เมนู SELL มีเพื่อแสดงการตอบสนองของร้าน ไม่ใช่ให้แลกของได้ทุกที่</p><p class="tiny muted">ของสำคัญถูกป้องกันไม่ให้ขาย<br>พรีวิวนี้ไม่กำหนดราคาขายหรือร้านใหม่เอง</p></section>`,goButton('ซื้อขนมแทน','buy','primary'),'SELL'),
    talk:()=>frame('คุยกันสักนิด',`<div class="split"><section class="pixel-panel list">${['เกี่ยวกับร้าน','อาหารวันนี้','เรื่องแถวนี้'].map(t=>row(t,'shop-topic',t)).join('')}</section><section class="soft-panel"><p class="title-line">${escape(model.shopTopic||'เลือกหัวข้อ')}</p><p class="description muted">พื้นที่บทจาก story.md เมื่อเชื่อมเกม<br>ไม่เขียนเควสใหม่หรือเฉลยปมผ่านหน้านี้</p></section></div>`,'','TALK'),
    box:()=>frame('กล่องเก็บของ',`<div class="split"><section class="pixel-panel scroll list"><p class="tiny blue">กระเป๋าตัวอย่าง</p>${Object.entries(model.data.inventory).filter(([id,n])=>n&&item(id).kind!=='important').map(([id,n])=>row(item(id).name,'deposit',id,'ฝาก ×'+n)).join('')||'<p class="tiny muted">ไม่มีของที่ฝากได้</p>'}</section><section class="soft-panel scroll list"><p class="tiny blue">กล่องตัวอย่าง</p>${Object.entries(model.data.storage).filter(([,n])=>n>0).map(([id,n])=>row(item(id).name,'withdraw',id,'คืน ×'+n)).join('')||'<div class="empty-state">ยังไม่มีของในกล่อง</div>'}</section></div>`,'','FUTURE UI'),
  });

  async function init() {
    Object.assign(builders, {
      dialogue:()=>`<section class="dialogue-box"><span class="speaker">???</span><svg class="phone-portrait" viewBox="0 0 48 40" aria-label="สัญลักษณ์ขวด ไม่เผยตัวผู้พูด" shape-rendering="crispEdges"><path d="M20 6H28V11H31V34H17V11H20Z" fill="#13253d" stroke="#91dfea" stroke-width="2"/><path d="M24 18L27 24L24 30L21 25Z" fill="#b795ed"/></svg><p>เธอคงเจอขวดแก้วของเค้าแย้วใช่มั้ย<br>เก่งมากค้าบ</p></section><div style="position:absolute;right:20px;top:40px">${goButton('ลองตัวเลือก','choice')}${goButton('เดินต่อ','world')}</div>`,
      choice:()=>dialog('เธอเจ็บขามั้ย',`<p class="muted">ยืนยันคำตอบด้วยปุ่ม / แตะ<br>การเลื่อนเมาส์ผ่านไม่ถือว่าตอบ</p>`,button('เจ็บ','preview-choice','เจ็บ','primary')+button('ไม่เจ็บ','preview-choice','ไม่เจ็บ')),
      pickup:()=>dialog('คุณได้รับไอเทม',`<span class="tag">ของฝาก · รับครั้งเดียวในเกม</span><p class="rose">คุณได้รับรองเท้าสีขาวจากทอเรียล</p><p class="tiny muted">แจ้งผล UI ไม่แจกของซ้ำจากการเปิดหน้านี้<br>ยังไม่สวม/เพิ่มพลังอัตโนมัติ</p>`,button('ดูข้อมูล','inspect','toriel_white_shoes','primary')+button('ปิด','back')),
      narration:()=>`<div class="narration-screen"><span class="pixel-heart"></span><p>ง้าาา เจ้าหนูสุขสันวันครบรอบ<br>1ปี3เดือนนะครับ<br>เราอยู่ด้วยกันมาได้อีกเดือนแย้วนะเนี่ยย</p>${goButton('กลับหน้าต้อนรับ','title','ghost')}</div>`,
      loading:()=>dialog('กำลังรวบรวมเรื่องเล่า',`<p class="muted">เตรียมภาพและข้อมูลของตอนนี้</p><div class="loading-bar" role="progressbar" aria-label="ตัวอย่างความคืบหน้าโหลด" aria-valuemin="0" aria-valuemax="100" aria-valuenow="60"><span></span></div><p class="tiny muted">หน้าตัวอย่างโหลด / เข้าอีกครั้ง<br>การโหลดล้มเหลวต้องไม่ล้างเซฟ</p>`,button('ลองสถานะเสร็จ','go','world','primary')+goButton('เมนูหลัก','title')),
      blocked:()=>dialog('ตอนนี้ยังใช้ไม่ได้',`<p class="blue">พลัง / คำสั่งถูกจำกัดตามบริบท</p><p>ขณะเปิดเมนูหรืออยู่ในบท<br>ไม่เดิน ไม่ใช้X/C/V/B/N</p><p class="tiny muted">ไม่กินไอเทม/เทิร์นเมื่อคำสั่งใช้ไม่ได้<br>แสดงเหตุผล ไม่ปิดปุ่มเฉยๆ</p>`,goButton('ดูขอบเขตพลัง','powers')+button('เข้าใจแล้ว','back','','primary')),
      'season-summary':()=>frame('เมื่อบทใหญ่ปิดลง',`<section class="pixel-panel"><span class="tag">SS1 · หน้ารองรับในอนาคต</span><h3 class="title-line">ผลเส้นเรื่องอ่านจาก run จริง</h3><div class="button-row"><span class="tag">Good</span><span class="tag">Pacifist ของโปรเจกต์</span><span class="tag">Bad</span></div><p class="description muted">ไม่มีปุ่มเลือกเส้นจบให้ได้เอง<br>รายละเอียดSS2และแขนงที่ยังไม่กำหนดยังว่าง</p></section>`,goButton('ประวัติตอน','history','primary'),'FUTURE UI'),
      spellbook:()=>frame('หนังสือที่ยังรอเปิด',`<div class="split"><section class="pixel-panel"><span class="tag">หลังพบแซน · อนาคต</span><p class="description">หนังสือเวทที่ ??? มอบให้</p><div class="locked-grid"><div class="locked-tile">หน้าที่ยังว่าง</div><div class="locked-tile">คาถารอกำหนด</div></div></section><section class="soft-panel"><p class="description muted">รูปแบบหน้าสำรอง ไม่แจกหนังสือในรูน<br>รายการคาถา / ค่าใช้พลัง / การปลดรอผู้เขียนกำหนด</p><p class="tiny blue">ไม่เพิ่ม mana หรือเพิ่มมือ/พลังให้สอง CH เอง</p></section></div>`,goButton('ดูขวดเดิม','powers'),'FUTURE UI'),
      journal:()=>frame('บันทึกระหว่างทาง',`<div class="split"><section class="pixel-panel list">${row('บทที่กำลังเดิน','notice','CH01จบก่อนพบแซน · ไม่ข้ามเหตุการณ์ผ่านบันทึก','CHAPTER')}${row('ภารกิจจากตัวละคร','go','quest','รอกำหนด')}${row('เศษความทรงจำ','go','memories','อนาคต')}</section><section class="soft-panel"><span class="tag">${model.data.chapter}</span><p class="description">${escape(model.data.room)}</p><p class="tiny muted">บันทึกสิ่งที่รู้แล้ว ไม่ใช่เฉลย<br>ไม่เพิ่มเควสหรือคะแนนGoodเอง<br>ชื่อในช่วงอนาคตยังปิดไว้</p></section></div>`,'','JOURNAL'),
      quest:()=>frame('เรื่องเล่าของใครบางคน',`<section class="pixel-panel"><span class="tag">หน้ารองรับข้อมูลในอนาคต</span><h3 class="title-line">รายการภารกิจยังไม่กำหนด</h3><div class="line">ผู้มอบ <span>รอผู้เขียนเลือก</span></div><div class="line">เป้าหมาย <span>ใช้ questId จริง</span></div><div class="line">รางวัล <span>รอกำหนด</span></div><p class="tiny muted">ไม่สร้างเหตุการณ์ย่อยแทนผู้เขียน<br>การปักหมุดตัวอย่างไม่ทำให้เควสเสร็จ</p></section>`,button('ลองปักหมุด','pin','','primary'),'FUTURE UI'),
      memories:()=>frame('เศษที่ยังไม่ต่อกัน',`<div class="locked-grid">${[1,2,3].map(n=>`<button class="memory-tile" data-action="go" data-value="memory">เศษความทรงจำ ${n}<br><span class="tiny muted">เนื้อหายังเว้นไว้</span></button>`).join('')}</div><p class="tiny muted">ต้นแบบหน้าแสดงเบาะแส ไม่เพิ่มความทรงจำจริงหรือเฉลยริน</p>`,'','FRAGMENTS'),
      memory:()=>frame('มีพื้นที่ให้เธอเติม',`<section class="pixel-panel reward-center"><div style="height:49px;border:1px dashed #63758a;padding:12px" class="blue">ภาพเหตุการณ์จริงยังว่าง</div><p class="description">รอเรื่องราวของผู้เขียนทั้งสองคน</p><p class="tiny muted">แสดงได้เมื่อ fragmentId ถูกเก็บจริง<br>ไม่เปิดเนื้อหาด้วยการเลือกหน้าในเกม</p></section>`,'','FUTURE UI'),
      home:()=>frame('มุมเล็กๆ ระหว่างความมืด',`<div class="split"><section class="pixel-panel"><span class="tag">VOID HOME · อนาคต</span><p class="description">หน้าสำหรับบ้านที่ได้รับในภายหลัง</p><div class="locked-grid"><div class="locked-tile">ที่พัก</div><div class="locked-tile">ของเก็บ</div><div class="locked-tile">สัตว์เลี้ยง</div></div></section><section class="soft-panel list">${row('ดูสัตว์เลี้ยง','go','pets','UI')}${row('กล่องฝากของ','go','box','UI')}${row('ลองปุ่มกลับทางเดิม','notice','UIตัวอย่างเท่านั้น เงื่อนไขเปิดบ้านและตำแหน่งกลับยังไม่กำหนด','RETURN')}</section></div>`,'','FUTURE UI'),
      pets:()=>frame('เพื่อนตัวน้อยในบ้าน',`<div class="split"><section class="pixel-panel reward-center"><div style="height:59px;border:1px dashed #63758a;padding:13px;font:20px monospace">?</div><p class="tiny muted">รอแบบและชนิดสัตว์เลี้ยง</p></section><section class="soft-panel"><p class="title-line">สถานะ UI ตัวอย่าง</p><div class="line">ปฏิกิริยา <span class="rose">${model.data.petMood?'ได้รับการดูแล':'ยังไม่เลือก'}</span></div><div class="button-row" style="margin-top:8px">${button('ลองให้อาหาร','pet','feed')}${button('ลองลูบ','pet','pet')}</div><p class="tiny muted">ไม่กำหนดราคา/การหิว/การได้สัตว์<br>และไม่กินไอเทมใน CH00–CH01</p></section></div>`,'','FUTURE UI'),
      settings:()=>frame('ปรับให้พอดีกับเธอ',`<div class="split"><section class="pixel-panel list">${row('เสียง','go','audio','AUDIO')}${row('ปุ่มและการควบคุม','go','controls','CONTROLS')}${row('การอ่าน / การเคลื่อนไหว','go','accessibility','ACCESSIBILITY')}${row('กู้ / ส่งออกพรีวิว','go','recovery','DATA')}</section><section class="soft-panel"><p class="description">ตั้งค่าอยู่แยกจาก checkpoint</p><p class="tiny muted">ปิดเสียงไม่ทำให้บท/คำใบ้หาย<br>ลดการกะพริบและสั่นได้<br>ภาษาเกมหลักยังเป็นภาษาไทย ไม่อ้างว่ามีบทแปลอังกฤษแล้ว</p></section></div>`,'','SETTINGS'),
      audio:()=>frame('เสียงที่ไม่ต้องดังเกินไป',`<section class="pixel-panel"><label class="settings-row">เพลง <input type="range" min="0" max="100" data-setting="music" value="${model.settings.music}" aria-label="ระดับเสียงเพลง"></label><label class="settings-row">เอฟเฟกต์ <input type="range" min="0" max="100" data-setting="sfx" value="${model.settings.sfx}" aria-label="ระดับเสียงเอฟเฟกต์"></label><label class="settings-row">เสียงตัวอักษร <input type="range" min="0" max="100" data-setting="blip" value="${model.settings.blip}" aria-label="ระดับเสียงตัวอักษร"></label><label class="settings-row">ปิดเสียง <input type="checkbox" data-setting="mute" ${model.settings.mute?'checked':''}></label></section>`,button('ลองเสียงสังเคราะห์','sound','','primary'),'AUDIO'),
      controls:()=>frame('เธอเดินต่อได้แบบนี้',`<section class="pixel-panel scroll"><div class="kbd-grid"><div><kbd>WASD / ↑↓←→</kbd>เดิน / เลือก</div><div><kbd>Z / Enter / Space</kbd>ตรวจ / อ่าน</div><div><kbd>Esc</kbd>ย้อน</div><div><kbd>I / P</kbd>ของ / โทร</div><div><kbd>X C V B N</kbd>พลังขวด</div><div><kbd>M</kbd>ปิดเสียง</div></div><p class="tiny muted">Xไม่ใช่ปุ่มMERCY · เลือกด้วยการยืนยันไม่ใช่hover<br>ระหว่างอ่านเมนูไม่เดิน/ใช้พลัง และยังไม่สลับเป็นปุ่มUTเดิม</p></section>`,goButton('ลองเดิน HUD','world','primary'),'CONTROLS'),
      accessibility:()=>frame('อ่านช้าๆ ก็ได้',`<section class="pixel-panel"><label class="settings-row">ลดการเคลื่อนไหว <input type="checkbox" data-setting="reduceMotion" ${model.settings.reduceMotion?'checked':''}></label><label class="settings-row">แสดงข้อความทันที <input type="checkbox" data-setting="fastText" ${model.settings.fastText?'checked':''}></label><label class="settings-row">ตัวอักษรเมนูใหญ่ขึ้น <input type="checkbox" data-setting="largeText" ${model.settings.largeText?'checked':''}></label><p class="tiny muted">ใช้รูป/ชื่อร่วมกับสี ปุ่มโฟกัสชัด<br>คำพูดและข้อมูลสำคัญยังอยู่ครบ</p></section>`,goButton('ลองหน้าโทร','call','primary'),'READABILITY'),
      credits:()=>frame('เรื่องเล่าที่สร้างด้วยกัน',`<section class="pixel-panel scroll"><h3 class="title-line rose">UNDERFALL</h3><p class="description">ผู้เขียน · Claude · Codex<br>เกมครบรอบที่ค่อยๆ เติบโต</p><p class="tiny muted">อ้างรูปแบบเมนู Undertale ไม่ยกเพลง/สไปรต์เกมต้นฉบับมาเป็นแอสเซตใหม่โดยอัตโนมัติ<br>ภาพพรีวิวมอนและทอเรียลมาจากชีตแบบของโปรเจกต์ ยังไม่ใช่ชุดสไปรต์ส่งออก</p><a class="small" href="undertale-interface-research.md">ดูข้อมูลต้นฉบับและที่มา</a></section>`,'','CREDITS'),
    });
    try{
      installOverworldMenus();
      model.catalog=await (await fetch('screen-catalog.json')).json();
      model.data=createData();model.checkpoint=structuredClone(model.data);
      try{const raw=localStorage.getItem(KEY);if(raw){const parsed=JSON.parse(raw);if(validPreview(parsed)){model.data=parsed.data;model.checkpoint=structuredClone(parsed.data);Object.assign(model.settings,parsed.settings);}}const backup=localStorage.getItem(BACKUP);if(backup){const parsed=JSON.parse(backup);if(validPreview(parsed))model.backup=parsed.data;}}catch{model.lastSaveError='ข้อมูลพรีวิวเดิมอ่านไม่ได้';}
      await Promise.all([['player',PLAYER],['portrait',PORTRAIT],['monster',MONSTER]].map(async([key,path])=>{const image=new Image();image.src=path;await image.decode();art[key]=image;}));
      if(model.catalog.screens.some(s=>!builders[s.id]))throw new Error('มีหน้าที่ยังไม่ถูกสร้าง');
      model.ready=true;render();fit();
      const initialPage=decodeURIComponent(location.hash.slice(1));if(builders[initialPage])navigate(initialPage,false);
      try{const settings=JSON.parse(localStorage.getItem(KEY+'.settings')||'null');if(settings)Object.assign(model.settings,settings);applySettings();}catch{}
    }catch(error){model.errors.push(String(error));$('studio-error').textContent='เปิดพรีวิวผ่าน HTTP ของโปรเจกต์: '+error.message;}
  }
  function fit(){const wrap=$('viewport-wrap');if(document.fullscreenElement===wrap)$('game').style.setProperty('--full-scale',String(Math.min(wrap.clientWidth/400,wrap.clientHeight/225)));if(innerWidth>720)$('game').style.transform=`scale(${wrap.clientWidth/400})`;else $('game').style.transform='none';}
  document.addEventListener('fullscreenchange',fit);
  new ResizeObserver(fit).observe($('viewport-wrap'));
  await init();
})();
