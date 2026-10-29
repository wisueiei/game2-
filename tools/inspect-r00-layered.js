async page => {
  await page.goto('http://127.0.0.1:4188/index_new.html?qa=1');await page.waitForFunction(()=>window.UF_QA);
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));await page.clock.install();
  async function preview(room,source){await page.evaluate(({room,source})=>{const p=UNDERFALL.snapshot().checkpoint,L=UF_DATA.mapLayout,c=p.checkpoint;c.room=room;c.chapter='ch00';c.resumeScene='visual-preview-only';c.spawn=[(source[0]-L.sourceCrop[0])*L.scale,(source[1]-L.sourceCrop[1])*L.scale];c.name=null;c.bottle=true;c.inventory={soul_bottle:1,old_fox_ring:1};c.nUnlocked=false;c.ringCharge=1;c.helpChoice='do_not_help';c.worldFlags={landingDone:true,bottleSpawned:true,bottleTutorialDone:true,rootLessonDone:true,rootChestBurned:false,rootGateBurned:true,memoryAsked:true,strangerSeen:true,groveOpen:false,ringPicked:false};c.chapterComplete={};UF_QA.restoreFixture(p);},{room,source});await page.clock.runFor(250);}
  await preview('forest_origin',[298,537]);await page.screenshot({path:'output/playwright/r00-layered-origin-preview.png'});
  const before=await page.evaluate(()=>UF_QA.snapshot().state.spawn);await page.keyboard.down('ArrowRight');await page.clock.runFor(400);await page.keyboard.up('ArrowRight');const after=await page.evaluate(()=>UF_QA.snapshot().state.spawn);await page.screenshot({path:'output/playwright/r00-layered-walk-preview.png'});
  await preview('forest_extension',[684,434]);await page.screenshot({path:'output/playwright/r00-layered-root-preview.png'});
  await preview('sacred_grove',[1090,235]);await page.screenshot({path:'output/playwright/r00-layered-grove-preview.png'});
  return {scope:'isolated visual fixtures, not story playthrough',before,after,errors,construction:await page.evaluate(()=>({renderer:UF_DATA.renderConstruction,entities:UF_DATA.mapEntities.trees.length,canvas:[document.getElementById('world').width,document.getElementById('world').height],wholeMapAsset:'mapBackground' in UF_DATA.assets}))};
}
