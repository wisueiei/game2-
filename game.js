(() => {
  'use strict';
  const $=id=>document.getElementById(id), W=640,H=360,MAP=768,RADIUS=268;
  // Render on a 320 x 180 pixel grid, keeping world coordinates and UI layout unchanged.
  // The original transparent poses therefore read as compact 36 px sprites.
  const canvas=$('world');canvas.width=W/2;canvas.height=H/2;
  const ctx=canvas.getContext('2d');ctx.scale(.5,.5);ctx.imageSmoothingEnabled=false;
  const mask=document.createElement('canvas');mask.width=W;mask.height=H;
  const light=mask.getContext('2d');
  const state={scene:'title',moving:false,canMove:false,pose:'stand',poseMix:0,walked:0,healing:0,impact:0,darkness:1,fall:0,muted:false,branch:null,ready:false,hint:false};
  const player={x:0,y:0,dir:'front',step:0};
  const camera={x:-W/2,y:-H/2};
  const keys=new Set(),particles=[],flowers=[];
  let seed=418;
  const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)|0;return (seed>>>0)/4294967296;};
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const image=src=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src;});
  const art={};
  const resize=()=>document.documentElement.style.setProperty('--scale',Math.min(innerWidth/W,innerHeight/H));
  addEventListener('resize',resize);resize();
  const coarse=matchMedia('(pointer:coarse)').matches;
  let audio=null,volume=null,wind=null;
  function soundInit(){
    if(!audio){audio=new (window.AudioContext||window.webkitAudioContext)();volume=audio.createGain();volume.gain.value=state.muted?0:.18;volume.connect(audio.destination);}
    if(audio.state==='suspended')audio.resume();
  }
  function tone(freq,duration=.05,type='triangle',gain=.13,end=freq){
    if(!audio||state.muted)return;
    const o=audio.createOscillator(),v=audio.createGain(),now=audio.currentTime;
    o.type=type;o.frequency.setValueAtTime(freq,now);o.frequency.exponentialRampToValueAtTime(Math.max(1,end),now+duration);
    v.gain.setValueAtTime(gain,now);v.gain.exponentialRampToValueAtTime(.0001,now+duration);
    o.connect(v);v.connect(volume);o.start();o.stop(now+duration);
  }
  function noise(duration,gain,cutoff){
    if(!audio||state.muted)return;
    const buffer=audio.createBuffer(1,audio.sampleRate*duration,audio.sampleRate),data=buffer.getChannelData(0);
    for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*(1-i/data.length);
    const source=audio.createBufferSource(),filter=audio.createBiquadFilter(),v=audio.createGain();source.buffer=buffer;
    filter.type='lowpass';filter.frequency.value=cutoff;v.gain.value=gain;source.connect(filter);filter.connect(v);v.connect(volume);source.start();return source;
  }
  function mute(){state.muted=!state.muted;if(volume)volume.gain.value=state.muted?0:.18;$('sound').textContent=state.muted?'♪ ×':'♪';$('sound').setAttribute('aria-label',state.muted?'เปิดเสียง':'ปิดเสียง');}
  $('sound').onclick=mute;
  const segments=text=>typeof Intl.Segmenter==='function'?[...new Intl.Segmenter('th',{granularity:'grapheme'}).segment(text)].map(s=>s.segment):Array.from(text);
  let waiting=null,typing=false,skipText=false,choosing=false,choiceIndex=0,answerResolve=null;
  function advance(){
    if(choosing){choose(choiceIndex===0?'hurt':'okay');return;}
    if(typing){skipText=true;return;}
    if(waiting){const done=waiting;waiting=null;done();}
  }
  $('next').onclick=advance;
  $('dialog').addEventListener('click',e=>{if(!e.target.closest('button'))advance();});
  canvas.addEventListener('pointerdown',()=>{if(state.scene!=='title')advance();});
  async function type(el,text,speed=40,blips=true){
    typing=true;skipText=false;el.textContent='';
    const chars=segments(text);
    for(let i=0;i<chars.length;i++){
      if(skipText)break;
      el.textContent+=chars[i];if(blips&&i%2===0&&chars[i].trim())tone(490+(i%3)*45,.035,'square',.05);
      await delay(speed);
    }
    el.textContent=text;typing=false;skipText=false;
  }
  async function say(text){
    state.canMove=false;keys.clear();$('dialog').classList.remove('hidden');$('next').classList.remove('hidden');$('touch').classList.add('hidden');
    await type($('words'),'* '+text,34);
    await new Promise(resolve=>waiting=resolve);
  }
  function hideDialog(){$('dialog').classList.add('hidden');}
  function renderChoice(){[...$('choices').children].forEach((b,i)=>b.classList.toggle('selected',i===choiceIndex));}
  function choose(value){if(!choosing)return;choosing=false;state.branch=value;$('choices').classList.add('hidden');tone(720,.09);const done=answerResolve;answerResolve=null;done(value);}
  [...$('choices').children].forEach((b,i)=>{b.onclick=()=>choose(b.dataset.answer);b.onpointerenter=()=>{choiceIndex=i;renderChoice();};});
  async function ask(){
    choosing=true;choiceIndex=0;renderChoice();$('next').classList.add('hidden');$('choices').classList.remove('hidden');
    return new Promise(resolve=>answerResolve=resolve);
  }
  addEventListener('keydown',e=>{
    const k=e.key.toLowerCase();if([' ','arrowup','arrowdown','arrowleft','arrowright'].includes(k))e.preventDefault();
    keys.add(k);if(e.repeat)return;
    if(k==='m'){mute();return;}
    if(state.scene==='title'){if(state.ready&&['enter',' ','z'].includes(k)&&e.target!==$('start'))start();return;}
    if(choosing&&['a','d','arrowleft','arrowright'].includes(k)){choiceIndex=1-choiceIndex;renderChoice();return;}
    if(['enter','z',' '].includes(k))advance();
  });
  addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));addEventListener('blur',()=>keys.clear());
  for(const b of $('touch').children){
    b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys.add(b.dataset.dir);};
    b.onpointerup=b.onpointercancel=()=>keys.delete(b.dataset.dir);
    b.onlostpointercapture=()=>keys.delete(b.dataset.dir);
  }
  // Flower patches follow the locations painted in the background (normalized map coordinates).
  const patches=[[.435,.212],[.512,.299],[.618,.279],[.719,.281],[.588,.38],[.762,.393],
    [.576,.472],[.627,.543],[.710,.596],[.592,.627],[.447,.687],[.482,.646],[.388,.639],
    [.362,.615],[.325,.565],[.424,.498],[.371,.399],[.270,.379],[.223,.337],[.199,.474],
    [.171,.498],[.182,.588],[.223,.667],[.228,.698],[.25,.685],[.636,.720],[.744,.673],
    [.708,.776],[.475,.813],[.345,.805],[.613,.154],[.683,.183],[.73,.212],[.782,.266]];
  for(const [u,v]of patches){
    flowers.push({x:(u-.5)*MAP,y:(v-.5)*MAP,glow:0,cooldown:0,phase:rnd()*6.28});
  }
  function emit(kind,x,y,count){
    for(let i=0;i<count;i++){
      const angle=rnd()*6.283,speed=kind==='dust'?20+rnd()*70:3+rnd()*12;
      particles.push({kind,x:x+(rnd()-.5)*12,y:y+(rnd()-.5)*6,age:0,life:kind==='dust'?1+rnd()*1.2:1.5+rnd()*2,
        vx:Math.cos(angle)*speed,vy:kind==='dust'?Math.sin(angle)*speed*.35-10:-8-rnd()*18,r:kind==='dust'?3+rnd()*5:1+rnd()*1.5,phase:angle});
    }
  }
  const px=(x,y,w,h,color)=>{ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h);};
  function sprite(pose,x,y,time,alpha=1){
    if(!art.hero)return;
    let row=0,col=0,flip=false;
    if(pose==='fall'){row=3;col=0;}
    else if(pose==='lying'){row=3;col=1;}
    else if(pose==='sit'){row=3;col=2;}
    else if(pose==='rise'){row=3;col=3;}
    else {row=player.dir==='back'?2:player.dir==='front'?0:1;flip=player.dir==='right';col=state.moving?Math.floor(player.step*8)%4:0;}
    const sw=art.hero.width/4,sh=art.hero.height/4;
    ctx.save();ctx.globalAlpha=alpha;ctx.translate(Math.round(x),Math.round(y));if(flip)ctx.scale(-1,1);
    const bob=state.moving?Math.sin(player.step*16)*.6:0;
    ctx.drawImage(art.hero,col*sw,row*sh,sw,sh,-36,Math.round(-68+bob),72,72);ctx.restore();
  }
  function drawPlayer(time){
    const x=player.x-camera.x,y=player.y-camera.y;
    ctx.fillStyle='#0006';ctx.beginPath();ctx.ellipse(x,y,16,4,0,0,6.283);ctx.fill();
    sprite(state.pose,x,y,time);
  }
  function hole(x,y,r,a){
    const grad=light.createRadialGradient(x,y,0,x,y,r);grad.addColorStop(0,`rgba(0,0,0,${a})`);grad.addColorStop(.45,`rgba(0,0,0,${a*.83})`);grad.addColorStop(1,'transparent');
    light.fillStyle=grad;light.fillRect(x-r,y-r,r*2,r*2);
  }
  function glow(x,y,r,color,alpha){
    const grad=ctx.createRadialGradient(x,y,0,x,y,r);grad.addColorStop(0,`rgba(${color},${alpha})`);grad.addColorStop(1,`rgba(${color},0)`);ctx.fillStyle=grad;ctx.fillRect(x-r,y-r,r*2,r*2);
  }
  function drawParticle(p,time){
    const x=p.x-camera.x,y=p.y-camera.y,k=1-p.age/p.life;
    if(p.kind==='dust'||p.kind==='smoke'){
      ctx.globalAlpha=k*(p.kind==='dust'?.32:.18);ctx.fillStyle=p.kind==='dust'?'#958c79':'#81b896';
      const r=Math.round(p.r+p.age*3);ctx.beginPath();ctx.ellipse(Math.round(x),Math.round(y),r,r*.7,0,0,6.283);ctx.fill();ctx.globalAlpha=1;
    }else{
      const col=p.kind==='heal'?'#69efa3':'#c0f5ff';ctx.globalAlpha=k;
      px(x,y,1,3,col);px(x-1,y+1,3,1,col);ctx.globalAlpha=1;
    }
  }
  function drawWorld(time,dt){
    const tx=player.x-W/2,ty=player.y-H/2;
    camera.x+=(tx-camera.x)*(1-Math.exp(-7*dt));camera.y+=(ty-camera.y)*(1-Math.exp(-7*dt));
    const shake=state.impact>0?state.impact*3:0;
    ctx.save();if(shake)ctx.translate(Math.sin(time*70)*shake,Math.cos(time*92)*shake);
    ctx.fillStyle='#020709';ctx.fillRect(0,0,W,H);
    if(art.forest)ctx.drawImage(art.forest,Math.round(-MAP/2-camera.x),Math.round(-MAP/2-camera.y),MAP,MAP);
    // The detailed flowers are painted into the art; only their activated glints are overlaid.
    for(const f of flowers){
      const x=f.x-camera.x,y=f.y-camera.y;if(f.glow<=0||x<0||x>W||y<0||y>H)continue;
      const sw=Math.round(Math.sin(time*1.3+f.phase));
      ctx.globalAlpha=f.glow*.65;
      px(x-1+sw,y-5,3,1,'#c2f2fb');px(x+sw,y-6,1,3,'#c2f2fb');ctx.globalAlpha=1;
    }
    if(state.healing>0){
      const x=player.x-camera.x,y=player.y-camera.y;
      for(let strand=0;strand<3;strand++){
        for(let j=0;j<34;j++){
          const a=j*.16+time*3+strand*2.09,py=y-((j*1.65+time*22)%60);
          px(x+Math.cos(a)*25,py,1,2,`rgba(103,242,167,${state.healing*.55})`);
        }
      }
    }
    drawPlayer(time);
    for(const p of particles)drawParticle(p,time);
    light.globalCompositeOperation='source-over';light.clearRect(0,0,W,H);light.fillStyle=`rgba(0,2,5,${state.darkness})`;light.fillRect(0,0,W,H);light.globalCompositeOperation='destination-out';
    const pxp=player.x-camera.x,pyp=player.y-camera.y;
    // The opening is dark. A faint character light leaves navigation possible; flower light reveals the forest.
    if(state.scene!=='impact')hole(pxp,pyp-25,state.canMove?118:96,state.canMove?.80:.76);
    if(state.impact>0)hole(pxp,pyp-10,110,.76*state.impact);
    for(const f of flowers)if(f.glow>.01)hole(f.x-camera.x,f.y-camera.y-3,75,Math.min(.9,f.glow*.83));
    for(const p of particles)if(p.kind==='spark')hole(p.x-camera.x,p.y-camera.y,24,.16*(1-p.age/p.life));
    if(state.healing>0)hole(pxp,pyp-25,113,state.healing*.8);
    ctx.drawImage(mask,0,0);light.globalCompositeOperation='source-over';
    ctx.globalCompositeOperation='screen';
    for(const f of flowers)if(f.glow>.02)glow(f.x-camera.x,f.y-camera.y,22,'114,207,235',f.glow*.045);
    for(const p of particles)if(p.kind==='spark'||p.kind==='heal'){
      const k=1-p.age/p.life;glow(p.x-camera.x,p.y-camera.y,7,p.kind==='heal'?'91,241,152':'132,220,255',k*.08);drawParticle(p,time);
    }
    if(state.healing>0){
      glow(pxp,pyp-20,58,'71,222,143',state.healing*.16);
      for(let strand=0;strand<2;strand++)for(let j=0;j<42;j++){
        const a=j*.13+time*3+strand*Math.PI;
        px(pxp+Math.cos(a)*26,pyp-((j*1.4+time*19)%59),1,2,`rgba(72,226,128,${state.healing*.58})`);
      }
    }
    ctx.globalCompositeOperation='source-over';
    if(state.impact>.7){ctx.fillStyle=`rgba(226,232,217,${(state.impact-.7)*1.1})`;ctx.fillRect(0,0,W,H);}
    ctx.restore();
  }
  const debris=Array.from({length:55},()=>({x:rnd()*W,y:rnd()*H,speed:70+rnd()*220,length:6+rnd()*30}));
  function drawFall(time,dt){
    const p=state.fall,grad=ctx.createLinearGradient(0,0,0,H);grad.addColorStop(0,'#17232d');grad.addColorStop(1,'#02050a');ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
    glow(W/2,-50-p*160,220*(1-p)+1,'164,193,205',.16*(1-p));
    for(const d of debris){d.y-=d.speed*dt;if(d.y<-d.length)d.y=H+d.length;px(d.x,d.y,1,d.length,`rgba(116,152,172,${.12*(1-p)})`);}
    ctx.save();const x=W/2+Math.sin(time*.8)*13,y=H*.67+Math.sin(time*1.1)*6;
    ctx.translate(x,y);ctx.rotate(Math.sin(time*.75)*.12);sprite('fall',0,0,time);ctx.restore();
    ctx.fillStyle=`rgba(0,0,0,${p})`;ctx.fillRect(0,0,W,H);
  }
  let last=performance.now(),time=0;
  function update(dt){
    let dx=0,dy=0;
    if(state.canMove){dx=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0);dy=(keys.has('s')||keys.has('arrowdown')?1:0)-(keys.has('w')||keys.has('arrowup')?1:0);}
    state.moving=!!(dx||dy);
    if(state.moving){
      const len=Math.hypot(dx,dy),oldx=player.x,oldy=player.y;player.x+=dx/len*84*dt;player.y+=dy/len*84*dt;
      const dist=Math.hypot(player.x,player.y/1.1);if(dist>RADIUS){player.x*=RADIUS/dist;player.y*=RADIUS/dist;}
      state.walked+=Math.hypot(player.x-oldx,player.y-oldy);player.dir=Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'front':'back';player.step+=dt;
    }
    for(const f of flowers){
      f.cooldown=Math.max(0,f.cooldown-dt);f.glow=Math.max(0,f.glow-dt*.18);
      if(state.canMove&&Math.hypot(player.x-f.x,player.y-f.y)<24&&f.cooldown<=0){f.cooldown=3.7;f.glow=1;emit('spark',f.x,f.y-4,12);tone(950+rnd()*300,.2,'sine',.08);}
    }
    for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.age+=dt;if(p.age>=p.life){particles.splice(i,1);continue;}p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.kind==='spark')p.x+=Math.sin(time*2+p.phase)*dt*4;if(p.kind==='dust')p.vx*=Math.exp(-2*dt);}
    state.impact=Math.max(0,state.impact-dt*.8);
  }
  function loop(now){const dt=Math.min(.04,(now-last)/1000);last=now;time+=dt;ctx.clearRect(0,0,W,H);update(dt);
    if(state.scene==='fall')drawFall(time,dt);else if(state.scene!=='title')drawWorld(time,dt);requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
  async function tween(ms,fn){const start=performance.now();return new Promise(resolve=>{function tick(now){const k=clamp((now-start)/ms,0,1);fn(k);if(k<1)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});}
  async function narrate(text){
    $('narration').classList.add('visible');await type($('narration'),text,61,false);
    await new Promise(resolve=>{const done=()=>{clearTimeout(timer);if(waiting===done)waiting=null;resolve();};const timer=setTimeout(done,text==='. . .'?950:1800);waiting=done;});
    $('narration').classList.remove('visible');await delay(850);
  }
  const intro=[
    'ยินดีต้อนรับคุณแฟนอิอิ . . .','เข้ามาถึงที่นี่แล้วหรอเนี่ยไวจัง','เข้าคบกันมา 1 ปีกับอีก 2 เดือนแล้วน้าา',
    'เธอชอบถามเค้าบ่อย ๆ เยยว่าเค้ารักเธอมั้ย','. . . . . .','เค้ารักจิ -///- ทำไมจะไม่รัก','เค้าแค่พูดไม่เก่ง',
    'เอาหละอาจจะไม่ได้มีอะไรมาก . . .\nแต่ว่า . . .','เดี๋ยวมารอดูนะครับ คิคิ'
  ];
  const greeting=[
    'หื้ออ บีบี๋เธอมาที่นี่แล้วหรอ . . . ตะไมมาช้าจางง',
    'เธอเจ็บขามั้ยตกมาซะสูงเลย',
    'เดี๋ยวเราจะเดินไปที่ของเค้ากัน . . . ที่เดิม ที่เราค่อยอยู่ . . .',
    '555555 เธออาจจะนึกภาพมันไม่ออกหรอก ผ่านมานานมากแล้ว',
    'อื่มม . . . . นานแล้วแหละ',
    'แต่เธอเจ็บขามั้ยนะ เค้าถามแล้วก็ลืมเลย'
  ];
  async function landing(){
    if(wind){try{wind.stop();}catch{}wind=null;}
    state.scene='impact';state.darkness=1;state.pose='lying';camera.x=-W/2;camera.y=-H/2;
    await delay(650);state.impact=1;emit('dust',0,0,65);tone(95,.65,'sine',.8,25);noise(1.1,.55,480);
    await delay(900);state.scene='landing';await tween(1900,k=>state.darkness=1-k*.006);
    await delay(1100);state.pose='rise';await delay(650);state.pose='sit';await delay(950);
  }
  async function stand(){state.pose='rise';await delay(850);state.pose='stand';await delay(500);}
  async function heal(){
    state.scene='healing';state.healing=1;emit('smoke',player.x,player.y-9,18);
    [523,659,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.65,'sine',.2),i*240));
    const interval=setInterval(()=>{emit('heal',player.x,player.y-12,2);emit('smoke',player.x,player.y-4,1);},180);
    await delay(3200);clearInterval(interval);await tween(1100,k=>state.healing=1-k);state.scene='talk';
  }
  async function story(skip){
    if(!skip){
      state.scene='fall';state.pose='fall';wind=noise(65,.16,700);
      for(let i=0;i<intro.length;i++){const from=state.fall;tween(4500,k=>{if(state.scene==='fall')state.fall=Math.max(state.fall,from+(i/intro.length*.88-from)*k);});await narrate(intro[i]);}
      const from=state.fall;await tween(1700,k=>state.fall=from+(1-from)*k);await delay(400);
    }
    await landing();state.scene='talk';
    for(const line of greeting)await say(line);
    const answer=await ask();
    if(answer==='hurt'){
      await say('โอเคงั้นอยู่นิ่ง ๆ นะ');hideDialog();await heal();await say('โอเคน่าจะดีขึ้นแล้วนะ');hideDialog();await stand();
    }else{hideDialog();await stand();await say('โอเค งั้นเธอค่อย ๆ เดินมานะ');}
    await say('W คือเดินหน้า   A คือไปทางซ้าย\nS คือถอยหลัง   D คือไปทางขวา');
    hideDialog();state.scene='explore';state.canMove=true;$('controls').classList.remove('hidden');if(coarse)$('touch').classList.remove('hidden');
    await new Promise(resolve=>{const check=setInterval(()=>{if(state.walked>360){clearInterval(check);resolve();}},150);});
    await say('เธอมองเห็นทางมั้ย');state.hint=true;hideDialog();state.canMove=true;
    if(coarse)$('touch').classList.remove('hidden');$('ending').classList.remove('hidden');
  }
  let started=false;
  async function start(){
    if(started||!state.ready)return;started=true;$('start').disabled=true;soundInit();$('title').classList.add('leaving');
    await delay(1200);$('title').classList.add('hidden');await story(location.hash==='#skip');
  }
  $('start').onclick=start;
  Promise.all([image('assets/forest-clearing.png'),image('assets/adventurer-sheet.png')]).then(async([forest,hero])=>{
    art.forest=forest;art.hero=hero;
    await type($('welcome'),'ยินดีต้อนรับ',100,false);state.ready=true;$('start').disabled=false;$('start').textContent='กด ENTER หรือแตะเพื่อเริ่ม';
  }).catch(()=>{$('load-error').classList.remove('hidden');$('start').textContent='โหลดภาพไม่สำเร็จ';});
  // Read-only diagnostic snapshot for checking story transitions in the browser.
  window.__UNDERFALL={snapshot:()=>({state:{...state},player:{...player},litFlowers:flowers.filter(f=>f.glow>0).length,particles:particles.length})};
})();
