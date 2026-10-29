async (page) => {
  await page.clock.install();
  await page.goto('http://127.0.0.1:4188/index_new.html?qa=1');
  await page.waitForFunction(()=>window.UF_QA);
  const checks=[],shots=[],transcript=[],errors=[];
  page.on('pageerror',e=>errors.push(String(e)));
  const get=()=>page.evaluate(()=>UF_QA.snapshot());
  const assert=(ok,msg)=>{if(!ok)throw Error(msg);checks.push(msg);};
  async function drain(answer='ไม่เจ็บ'){
    for(let n=0;n<240;n++){
      const s=await get();
      if(s.mode==='walk'||s.mode==='end'||s.mode==='menu'&&!s.busy)return s;
      if(s.mode==='choice'){let label=s.choice.some(x=>x[0]===answer)?answer:s.choice[0][0];await page.getByRole('button',{name:label,exact:true}).click();}
      else if(s.mode==='dialogue'){if(s.typing&&!transcript.includes(s.typing.text))transcript.push(s.typing.text);await page.keyboard.press('Enter');}
      await page.clock.runFor(25);
    }
    throw Error('Scene did not release input: '+JSON.stringify(await get()));
  }
  async function move(x,y){
    const startRoom=(await get()).state.room;
    let previous=null,stuck=0;
    for(let n=0;n<450;n++){
      let s=await get();if(s.busy){await drain('ช่วย');s=await get();}
      if(s.state.room!==startRoom){for(const k of ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'])await page.keyboard.up(k);return;}
      const p=s.state.spawn,dx=x-p[0],dy=y-p[1];
      if(Math.hypot(dx,dy)<4){for(const k of ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'])await page.keyboard.up(k);return;}
      if(previous&&Math.hypot(p[0]-previous[0],p[1]-previous[1])<.15)stuck++;else stuck=0;
      if(stuck>20)throw Error('Collision/path stuck at '+p+' -> '+[x,y]);previous=p;
      const want=[];if(Math.abs(dx)>2)want.push(dx>0?'ArrowRight':'ArrowLeft');if(Math.abs(dy)>2)want.push(dy>0?'ArrowDown':'ArrowUp');
      for(const k of ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight']){await page.keyboard.up(k);if(want.includes(k))await page.keyboard.down(k);}
      await page.clock.runFor(Math.min(80,Math.max(20,Math.hypot(dx,dy)/70*700)));
    }
    throw Error('Movement budget exceeded');
  }
  async function shot(label){const file='output/playwright/ch00-'+label+'.png';await page.screenshot({path:file});shots.push(file);}
  const initial=await get();
  if(initial.page==='new')await page.getByRole('button',{name:'ยืนยันเริ่มใหม่',exact:true}).click();
  else {await page.getByRole('button',{name:'เริ่มใหม่',exact:true}).click();await page.getByRole('button',{name:'ยืนยันเริ่มใหม่',exact:true}).click();}
  await page.evaluate(()=>UF_QA.setSpeed(50));await drain('เจ็บ');
  assert((await get()).state.legAnswer==='hurt','Hurt branch heals, stands and releases WASD');
  assert((await get()).state.name===null,'No naming before CH01');
  await shot('forest-start');
  await move(330,0);await move(0,0);await drain();
  assert((await get()).state.worldFlags.bottleSpawned,'Bottle hint triggered through real walking, after deer');
  const bp=(await get()).state.bottlePosition;
  await move(bp[0],bp[1]+19);await page.keyboard.press('ArrowUp');await page.keyboard.press('Enter');await drain();
  assert((await get()).state.bottle&&!!(await get()).state.inventory.soul_bottle,'Bottle collected with tutorial and usable powers');
  await shot('bottle');
  await page.keyboard.press('Escape');await page.getByRole('button',{name:'STAT · สถานะ',exact:true}).click();await shot('stat');
  await page.keyboard.press('Escape');await page.keyboard.press('Escape');
  await move(0,0);await move(413,0); // Cross the room boundary with actual walking.
  await page.keyboard.down('ArrowRight');await page.clock.runFor(140);await page.keyboard.up('ArrowRight');
  assert((await get()).state.room==='forest_extension','Wide east passage enters the extension');
  await move(88,158);await page.keyboard.press('ArrowUp');await page.keyboard.press('Enter');
  await page.getByRole('button',{name:'บันทึก',exact:true}).click();assert((await get()).page==='saved','Real SAVE accepted a safe checkpoint');await page.getByRole('button',{name:'กลับไปเดิน',exact:true}).click();
  const saved=(await get()).state;await page.evaluate(()=>UF_QA.damage(5));await page.keyboard.press('x');
  assert((await get()).state.cooldowns.xActive>0,'X starts a five-second light pulse');await page.keyboard.press('Escape');const pauseX=(await get()).state.cooldowns.xActive;await page.clock.runFor(500);assert(Math.abs((await get()).state.cooldowns.xActive-pauseX)<.001,'Light cooldown pauses in menu');await page.keyboard.press('Escape');
  await move(113,244);await drain();await page.keyboard.press('ArrowDown');await page.keyboard.press('c');await drain();
  assert((await get()).state.worldFlags.rootChestBurned&&!((await get()).state.worldFlags.rootGateBurned),'Chest roots burn separately from gate');
  await page.keyboard.press('Enter');await drain();await page.keyboard.press('i');await page.getByRole('button',{name:'มัฟฟิ้นอุ่นๆ ×1',exact:false}).click();await page.getByRole('button',{name:'กินมัฟฟิ้น',exact:true}).click();await drain();
  assert((await get()).state.foodDF===4&&(await get()).state.hp>=18&&!((await get()).state.inventory.warm_muffin),'Muffin used once, heals three and adds four DF');
  // Item dialogue returns to the item pane, not an unintended free walk.
  await page.keyboard.press('Escape');await page.keyboard.press('Escape');await page.keyboard.press('Escape');
  await move(113,163);await move(340,163);await page.keyboard.press('ArrowRight');await page.keyboard.press('c');await drain();
  assert((await get()).state.worldFlags.rootGateBurned,'Forward C removes the real root gate');await shot('root-gate-open');
  await move(394,163);await drain();assert((await get()).state.room==='forest_old_trees','Gate connects to old-tree forest');
  await move(375,263);await move(375,218);await page.keyboard.press('ArrowUp');await page.keyboard.press('Enter');await page.getByRole('button',{name:'บันทึก',exact:true}).click();await page.getByRole('button',{name:'กลับไปเดิน',exact:true}).click();
  await move(420,263);await drain('ช่วย');const end=await get();
  assert(end.state.helpChoice==='help','Help choice takes the direct ambush branch');
  assert(end.state.room==='rift_bridge'&&end.state.resumeScene==='10.10','Direct branch ends at rift, not legend or naming');
  assert(!end.state.nUnlocked&&!end.state.ringCharge&&!end.state.inventory.old_fox_ring&&!end.state.worldFlags.groveOpen,'Direct branch does not award grove ring or hands');
  assert(end.state.name===null&&end.state.phone===false&&end.state.foodDF===4,'Existing items and hidden identity persist');
  assert(end.mode==='end'&&end.page==='end','End screen remains above black world');
  await shot('end-help');assert(errors.length===0,'No JavaScript runtime errors');
  return {checks,shots,transcript,branch:'help',save:await page.evaluate(()=>UF_QA.storage.read().parsed),errors};
}
