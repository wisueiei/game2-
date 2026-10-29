// CLI: playwright-cli run-code --filename tools/check-interface-preview.cjs
// This checks a UI sandbox, never the real game or its save namespace.
async (page) => {
  await page.waitForFunction(()=>window.__UFInterface?.ready);
  const ui=page.locator('#screen');
  const visit=async id=>{
    await page.locator(`#screen-nav [data-screen="${id}"]`).click();
    await page.waitForFunction(id=>window.__UFInterface.page===id,id);
  };
  const fixture=async name=>{await page.getByLabel('บริบทตัวอย่าง').selectOption(name);};
  await page.setViewportSize({width:1440,height:1050});
  const catalog=await page.evaluate(()=>window.__UFInterface.catalog.screens);
  if(catalog.length!==56)throw new Error('Expected 56 screens');
  const screenshots=[];
  for(const screen of catalog){
    await visit(screen.id);
    const box=await page.locator('#game').boundingBox();
    if(!box||box.width<200)throw new Error('No visible viewport '+screen.id);
    if(!(await ui.textContent()).trim())throw new Error('Empty screen '+screen.id);
    await page.locator('#game').screenshot({path:`output/playwright/interface/screens/${screen.id}.png`});
    screenshots.push(screen.id);
  }
  await fixture('no-save');await visit('title');
  if(!(await ui.getByRole('button',{name:'เล่นต่อ CONTINUE'}).isDisabled()))throw new Error('No-save continue enabled');
  await fixture('forest');await visit('phone');
  if(!(await ui.getByRole('button',{name:'โทรหา CALL'}).isDisabled()))throw new Error('Phone unlocked early');
  await fixture('empty');await visit('inventory');
  if(!(await ui.textContent()).includes('กระเป๋ายังว่าง'))throw new Error('Empty bag message missing');
  await fixture('poor');await visit('buy');
  const beforePoor=await page.evaluate(()=>JSON.stringify(window.__UFInterface.data.inventory));
  await ui.locator('[data-action="buy"][data-value="spider_cookie"]').click();
  if(await page.evaluate(()=>window.__UFInterface.data.gold)!==0)throw new Error('Negative gold');
  if(await page.evaluate(()=>JSON.stringify(window.__UFInterface.data.inventory))!==beforePoor)throw new Error('Free purchase');
  await fixture('ruins');await visit('buy');
  await ui.locator('[data-action="buy"][data-value="spider_cookie"]').click();
  let state=await page.evaluate(()=>window.__UFInterface.data);
  if(state.gold!==30||state.stock.spider_cookie!==2||state.inventory.spider_cookie!==2)throw new Error('Purchase not atomic');
  await visit('inventory');await ui.locator('[data-action="inspect"][data-value="warm_muffin"]').click();
  await ui.getByRole('button',{name:'ใช้ไอเทม',exact:true}).click();
  state=await page.evaluate(()=>window.__UFInterface.data);
  if(state.hp!==19||state.foodDF!==4||state.inventory.warm_muffin!==0)throw new Error('Muffin did not apply 3HP/4DF once');
  await visit('inventory');await ui.locator('[data-action="inspect"][data-value="soul_bottle"]').click();
  if(!(await ui.getByRole('button',{name:'ทิ้ง',exact:true}).isDisabled()))throw new Error('Can discard important bottle');
  await visit('inventory');await ui.locator('[data-action="inspect"][data-value="ruins_candy"]').click();
  await ui.getByRole('button',{name:'ทิ้ง',exact:true}).click();
  if(await ui.getByRole('dialog',{name:'ยืนยันทิ้งไอเทม'}).count()!==1)throw new Error('Drop has no confirmation');
  await ui.getByRole('button',{name:'เก็บไว้',exact:true}).click();
  if(await page.evaluate(()=>window.__UFInterface.data.inventory.ruins_candy)!==1)throw new Error('Cancelled discard lost item');
  await visit('save');await ui.getByRole('button',{name:'บันทึก',exact:true}).click();
  await page.waitForFunction(()=>window.__UFInterface.page==='saved');
  if(await page.evaluate(()=>window.__UFInterface.data.hp)!==20)throw new Error('SAVE did not heal');
  const checkpoint=await page.evaluate(()=>JSON.stringify(window.__UFInterface.checkpoint));
  await visit('save');await ui.getByRole('button',{name:'ลองกรณีบันทึกไม่ได้'}).click();
  await page.waitForFunction(()=>window.__UFInterface.page==='save-error');
  if(await page.evaluate(()=>JSON.stringify(window.__UFInterface.checkpoint))!==checkpoint)throw new Error('Failed save modified checkpoint');
  await ui.getByRole('button',{name:'ลองใหม่',exact:true}).click();
  await page.waitForFunction(()=>window.__UFInterface.page==='saved');
  await fixture('toriel');await visit('battle');
  if(!(await ui.getByRole('button',{name:'FIGHT',exact:true}).isDisabled()))throw new Error('Toriel FIGHT not disabled');
  if(await page.evaluate(()=>window.__UFInterface.page)!=='battle')throw new Error('Toriel FIGHT opened');
  await visit('battle-items');if(!(await ui.textContent()).includes('พลังขวดปิด'))throw new Error('Toriel bottle not guarded');
  await fixture('ruins');await visit('dodge');
  if(await ui.locator('.battle-commands button:disabled').count()!==4)throw new Error('Actions enabled during enemy turn');
  const heart=await page.evaluate(()=>window.__UFInterface.heart.x);
  await page.keyboard.press('ArrowRight');
  if(await page.evaluate(()=>window.__UFInterface.heart.x)!==heart+4)throw new Error('Heart movement failed');
  await visit('name');await ui.getByLabel('ชื่อผู้เล่น').fill('บีบี๋');
  await ui.getByRole('button',{name:'ยืนยัน',exact:true}).click();
  await page.waitForFunction(()=>window.__UFInterface.page==='name-confirm');
  await ui.getByRole('button',{name:'ใช่ ชื่อนี้',exact:true}).click();
  if(await page.evaluate(()=>window.__UFInterface.data.name)!=='บีบี๋')throw new Error('Thai name failed');
  await visit('accessibility');await ui.getByLabel('ลดการเคลื่อนไหว').check();
  if(!(await page.locator('#game').getAttribute('class')).includes('reduce-motion'))throw new Error('Reduced motion not applied');
  await ui.getByLabel('ตัวอักษรเมนูใหญ่ขึ้น').check();
  if(!(await page.locator('#game').getAttribute('class')).includes('large-text'))throw new Error('Large text not applied');
  await ui.getByLabel('ตัวอักษรเมนูใหญ่ขึ้น').uncheck();
  const mobile=[];
  await page.setViewportSize({width:390,height:844});
  for(const screen of catalog){
    await visit(screen.id);
    const metric=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
    if(metric.scroll>metric.width+1)throw new Error('Mobile overflow '+screen.id+' '+JSON.stringify(metric));
    mobile.push(screen.id);
  }
  await visit('phone');await page.screenshot({path:'output/playwright/interface/mobile-phone.png',fullPage:true});
  await page.setViewportSize({width:1440,height:1050});await fixture('ruins');await visit('title');
  const errors=await page.evaluate(()=>window.__UFInterface.errors);
  if(errors.length)throw new Error(errors.join('\n'));
  const report={status:'PASS',desktopPages:screenshots.length,mobilePages:mobile.length,checks:['no-save','no-phone','empty-inventory','insufficient-gold','purchase-stock','muffin-3HP-4DF','important-item-guard','discard-cancel','save-commit','save-failure','retry','toriel-mercy-only','soul-movement','Thai-name','reduce-motion','large-text'],errors,scope:'interface sandbox only; not chapter gameplay'};
  await page.evaluate(report=>{window.__UFInterfaceReport=report;},report);
  return report;
}
