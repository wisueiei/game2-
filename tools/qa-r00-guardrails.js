/* Playwright CLI suite. These guarded-state checks deliberately use saved fixtures;
 * physical branch playthroughs are tested separately by qa-r00-map-flow.js. */
async page => {
  const URL='http://127.0.0.1:4188/index_new.html?qa=1',checks=[],errors=[],shots=[];
  page.on('pageerror',error=>errors.push(String(error)));
  const get=()=>page.evaluate(()=>UF_QA.snapshot());
  const assert=(ok,message)=>{if(!ok)throw Error(message);checks.push(message);};
  const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const shot=async name=>{const file='output/playwright/r00-guards-'+name+'.png';await page.screenshot({path:file});shots.push(file);};
  await page.goto(URL);await page.waitForFunction(()=>window.UF_QA);await page.clock.install();
  const freeze=async()=>page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now()+40)));
  await freeze();
  const key=await page.evaluate(()=>UF_QA.storage.KEY);
  const L=await page.evaluate(()=>UF_DATA.mapLayout);
  const old=await page.evaluate(async()=>({help:(await(await fetch('output/ch00/help-result.json')).json()).save,optional:(await(await fetch('output/ch00/flow-result.json')).json()).save}));
  assert(old.help.engineRevision==='UF-CH00-2026-10-09-r1'&&old.help.layoutVersion==='UF-LAYOUT-2026-10-09','Fixture is exactly the known r1 engine and layout');
  assert(await page.evaluate(()=>UF_DATA.engineRevision==='UF-CH00-2026-10-09-r2'&&UF_DATA.layoutVersion===UF_DATA.mapLayout.mapVersion&&UF_DATA.mapLayout.mapVersion==='UF-R00-V1B-2026-10-09'),'Runtime identifies the approved R00 map and r2 engine');
  async function install(raw,meta=null,backup=null){
    await page.evaluate(({key,raw,meta,backup})=>{localStorage.setItem(key,raw);if(backup===null)localStorage.removeItem(key+'.backup');else localStorage.setItem(key+'.backup',backup);if(meta===null)localStorage.removeItem(key+'.meta');else localStorage.setItem(key+'.meta',JSON.stringify(meta));},{key,raw,meta,backup});
    await page.reload();await page.waitForFunction(()=>window.UF_QA);await freeze();
  }
  async function title(){const s=await get();if(s.page==='end')await page.getByRole('button',{name:'เมนูหลัก',exact:true}).click();else if(s.page==='world'){await page.keyboard.press('Escape');await page.getByRole('button',{name:'เมนูหลัก',exact:true}).click();}else if(s.page!=='title')await page.getByRole('button',{name:'กลับเมนู',exact:true}).click();}
  async function continueFromTitle(){await title();await page.getByRole('button',{name:'เล่นต่อ',exact:true}).click();}
  async function drain(choice='ช่วย'){
    await page.evaluate(()=>UF_QA.setSpeed(50));
    for(let n=0;n<300;n++){
      const s=await get();if(!s.busy&&['walk','end','menu'].includes(s.mode)){await page.evaluate(()=>UF_QA.setSpeed(1));return s;}
      if(s.mode==='choice')await page.getByRole('button',{name:choice,exact:true}).click();else if(s.mode==='dialogue')await page.keyboard.press('Enter');
      await page.clock.runFor(25);
    }
    throw Error('Guard scene did not finish');
  }
  try {
    const first=structuredClone(old.help);first.checkpoint.hp=17;
    const raw=JSON.stringify(first);await install(raw);
    const read=await page.evaluate(()=>UF_QA.storage.read());
    assert(read.kind==='migratable'&&await page.evaluate(()=>UF_QA.storage.valid(UF_QA.storage.read().parsed)),'Known r1 save is exposed as a validated migration candidate');
    assert(await page.evaluate(key=>localStorage.getItem(key),key)===raw,'Reading migration candidate makes no storage write');
    const before=structuredClone(first.checkpoint),converted=structuredClone(read.parsed.checkpoint);delete before.spawn;delete before.bottlePosition;delete converted.spawn;delete converted.bottlePosition;
    assert(same(before,converted)&&same(first.meta,read.parsed.meta),'Migration preserves run, seed, HP/DF, items, answers, flags and ledger');
    await continueFromTitle();assert((await get()).page==='migration','CONTINUE shows the migration confirmation screen');await shot('migration');
    await page.getByRole('button',{name:'กลับเมนู',exact:true}).click();
    assert(await page.evaluate(key=>localStorage.getItem(key),key)===raw,'Cancel migration preserves the original save exactly');
    await continueFromTitle();
    const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'เก็บข้อมูลเดิม',exact:true}).click();const download=await downloadPromise;
    assert(download.suggestedFilename()==='underfall-original-save.json','Migration screen can export the untouched original data');
    await page.getByRole('button',{name:'ยืนยันใช้แมพนี้',exact:true}).click();
    let s=await get(),good=await page.evaluate(()=>UF_QA.storage.read().parsed);
    assert(s.mode==='end'&&s.state.runId===first.runId&&s.state.hp===17,'Explicit migration loads the same rift run without healing or intro');
    assert(await page.evaluate(key=>localStorage.getItem(key+'.backup'),key)===raw,'Explicit confirmation backs up the original byte for byte');
    assert(good.mapVersion===L.mapVersion&&good.layoutVersion===L.mapVersion&&good.engineRevision==='UF-CH00-2026-10-09-r2','Confirmed save records the new map and engine versions');

    const staleRing=structuredClone(old.optional);staleRing.checkpoint.ringCharge=1;
    const spent='old_fox_ring:'+staleRing.runId;
    assert(staleRing.meta.ringSpent.includes(spent),'Optional fixture has an existing spent-ring ledger entry');
    await install(JSON.stringify(staleRing),staleRing.meta);await continueFromTitle();await page.getByRole('button',{name:'ยืนยันใช้แมพนี้',exact:true}).click();
    s=await get();assert(s.state.ringCharge===0&&s.meta.ringSpent.includes(spent)&&s.state.inventory.old_fox_ring===1,'Migrating an older charged snapshot does not replenish a spent ring');
    good=await page.evaluate(()=>UF_QA.storage.read().parsed);
    assert(good.checkpoint.ringCharge===0&&good.meta.ringSpent.includes(spent),'Confirmed migrated payload commits the exhausted ring and ledger together');
    const olderLedger=structuredClone(staleRing);olderLedger.meta.ringSpent=olderLedger.meta.ringSpent.filter(id=>id!==spent);
    await install(JSON.stringify(olderLedger),staleRing.meta);await continueFromTitle();await page.getByRole('button',{name:'ยืนยันใช้แมพนี้',exact:true}).click();
    good=await page.evaluate(()=>UF_QA.storage.read().parsed);
    assert(good.checkpoint.ringCharge===0&&good.meta.ringSpent.includes(spent),'Newer local ring ledger is merged into the migrated checkpoint before writing');

    const corrupt='{broken-json';await install(corrupt,null,JSON.stringify(good));await continueFromTitle();
    assert((await get()).page==='save-problem'&&await page.evaluate(key=>localStorage.getItem(key),key)===corrupt,'Corrupt data shows recovery UI and stays available for export');
    await page.getByRole('button',{name:'โหลดสำรอง',exact:true}).click();assert((await get()).state.runId===good.runId,'Explicit current-version backup recovery preserves the run');
    const oldBackup=structuredClone(old.optional);oldBackup.checkpoint.hp=16;const oldBackupRaw=JSON.stringify(oldBackup),brokenPrimary='{r00-current-broken';
    await install(brokenPrimary,oldBackup.meta,oldBackupRaw);await continueFromTitle();
    assert(await page.getByRole('button',{name:'โหลดสำรอง',exact:true}).isEnabled(),'Known r1 backup remains recoverable when current primary is corrupt');
    await page.getByRole('button',{name:'โหลดสำรอง',exact:true}).click();assert((await get()).page==='backup-migration','Old backup recovery asks for explicit map-migration confirmation');await shot('backup-migration');
    await page.getByRole('button',{name:'กลับเมนู',exact:true}).click();
    assert(await page.evaluate(({key,primary,backup})=>localStorage.getItem(key)===primary&&localStorage.getItem(key+'.backup')===backup,{key,primary:brokenPrimary,backup:oldBackupRaw}),'Cancel backup migration preserves corrupt primary and original backup');
    await continueFromTitle();await page.getByRole('button',{name:'โหลดสำรอง',exact:true}).click();
    const backupDownloadPromise=page.waitForEvent('download');await page.locator('[data-action="export-old-backup"]').click();const backupDownload=await backupDownloadPromise;
    assert(backupDownload.suggestedFilename()==='underfall-original-backup.json','Backup-migration screen exports the original backup');
    await page.evaluate(()=>{window.r00OriginalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.endsWith('.corrupt-recovered'))throw new DOMException('R00 archive quota','QuotaExceededError');return window.r00OriginalSetItem.call(this,k,v);};});
    await page.locator('[data-action="load-backup-migrated"]').click();
    assert((await get()).page==='save-error'&&await page.evaluate(({key,primary,backup})=>localStorage.getItem(key)===primary&&localStorage.getItem(key+'.backup')===backup,{key,primary:brokenPrimary,backup:oldBackupRaw}),'Failed corrupt-primary archive preserves both original storage records');
    await page.evaluate(()=>{Storage.prototype.setItem=window.r00OriginalSetItem;delete window.r00OriginalSetItem;});
    await page.getByRole('button',{name:'ลองใหม่',exact:true}).click();s=await get();good=await page.evaluate(()=>UF_QA.storage.read().parsed);
    assert(s.mode==='end'&&s.state.runId===oldBackup.runId&&s.state.hp===16&&s.state.ringCharge===0,'Retry repeats backup migration and restores exact HP and spent-ring state');
    assert(await page.evaluate(({key,primary,backup})=>localStorage.getItem(key+'.corrupt-recovered')===primary&&localStorage.getItem(key+'.backup')===backup,{key,primary:brokenPrimary,backup:oldBackupRaw}),'Successful backup migration archives corrupt primary and retains original r1 backup exactly');
    await install(brokenPrimary,oldBackup.meta,oldBackupRaw);await continueFromTitle();await page.getByRole('button',{name:'โหลดสำรอง',exact:true}).click();
    await page.evaluate(key=>{window.r00OriginalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k===key)throw new DOMException('R00 primary quota','QuotaExceededError');return window.r00OriginalSetItem.call(this,k,v);};},key);
    await page.locator('[data-action="load-backup-migrated"]').click();
    assert((await get()).page==='save-error'&&await page.evaluate(({key,primary,backup})=>localStorage.getItem(key)===primary&&localStorage.getItem(key+'.backup')===backup&&localStorage.getItem(key+'.corrupt-recovered')===primary,{key,primary:brokenPrimary,backup:oldBackupRaw}),'Failed converted-primary commit preserves corrupt primary and original backup after archival');
    await page.evaluate(()=>{Storage.prototype.setItem=window.r00OriginalSetItem;delete window.r00OriginalSetItem;});await page.getByRole('button',{name:'ลองใหม่',exact:true}).click();
    good=await page.evaluate(()=>UF_QA.storage.read().parsed);assert(await page.evaluate(()=>UF_QA.storage.read().kind)==='valid'&&good.runId===oldBackup.runId,'Retry after commit failure writes the migrated backup run');
    const unknown={...good,engineRevision:'rejected-implementation'};const unknownRaw=JSON.stringify(unknown);await install(unknownRaw);await continueFromTitle();
    assert((await get()).page==='save-problem'&&await page.evaluate(()=>UF_QA.storage.read().kind)==='incompatible','Unknown engine save is rejected through the normal problem screen');
    assert(await page.evaluate(key=>localStorage.getItem(key),key)===unknownRaw,'Unknown save is preserved without reset or migration');
    const malformed=structuredClone(first);malformed.checkpoint.hp=-1;await install(JSON.stringify(malformed));await continueFromTitle();
    assert((await get()).page==='save-problem'&&await page.evaluate(()=>UF_QA.storage.read().kind)==='corrupt','Malformed known r1 data is rejected rather than migrated');
    const offPath=structuredClone(good);offPath.checkpoint.room='forest_extension';offPath.checkpoint.chapter='ch00';offPath.checkpoint.chapterComplete={};offPath.checkpoint.spawn=[(500-L.sourceCrop[0])*L.scale,(600-L.sourceCrop[1])*L.scale];await install(JSON.stringify(offPath));await continueFromTitle();
    assert((await get()).page==='save-problem'&&await page.evaluate(()=>UF_QA.storage.read().kind)==='corrupt','Current-version checkpoint in source water is rejected through the normal error UI');

    await install(raw);await continueFromTitle();
    await page.evaluate(()=>{window.r00OriginalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('underfall.qa.save.v1'))throw new DOMException('R00 QA quota','QuotaExceededError');return window.r00OriginalSetItem.call(this,k,v);};});
    await page.getByRole('button',{name:'ยืนยันใช้แมพนี้',exact:true}).click();
    assert((await get()).page==='save-error'&&await page.evaluate(key=>localStorage.getItem(key),key)===raw,'Failed migration reports the write failure and preserves the old primary save');
    await shot('migration-quota');
    await page.evaluate(()=>{Storage.prototype.setItem=window.r00OriginalSetItem;delete window.r00OriginalSetItem;});
    await page.reload();await page.waitForFunction(()=>window.UF_QA);await freeze();await continueFromTitle();await page.getByRole('button',{name:'ยืนยันใช้แมพนี้',exact:true}).click();
    good=await page.evaluate(()=>UF_QA.storage.read().parsed);
    const fixture=structuredClone(good),c=fixture.checkpoint;c.chapter='ch00';c.chapterComplete={};c.room='forest_extension';c.spawn=[...L.anchors.extensionSave];c.resumeScene='C00-06';c.hp=14;c.cooldowns={x:0,xActive:0,c:0,b:0};delete c.worldFlags.riftEntered;
    await page.evaluate(p=>UF_QA.restoreFixture(p),fixture);await freeze();
    const preserved=await page.evaluate(key=>localStorage.getItem(key),key);
    await page.evaluate(()=>{window.r00OriginalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('underfall.qa.save.v1'))throw new DOMException('R00 QA quota','QuotaExceededError');return window.r00OriginalSetItem.call(this,k,v);};UF_QA.save();});
    assert((await get()).page==='save-error'&&(await get()).state.hp===14&&await page.evaluate(key=>localStorage.getItem(key),key)===preserved,'Failed normal SAVE does not heal HP or overwrite the existing checkpoint');
    await shot('save-quota');
    await page.evaluate(()=>{Storage.prototype.setItem=window.r00OriginalSetItem;delete window.r00OriginalSetItem;});
    await page.getByRole('button',{name:'ลองใหม่',exact:true}).click();assert((await get()).page==='saved'&&(await get()).state.hp===20,'Retry writes a valid save and then restores HP');
    await page.getByRole('button',{name:'กลับไปเดิน',exact:true}).click();await freeze();
    await page.keyboard.press('b');assert((await get()).state.cooldowns.b===0,'B at full HP does not consume a cooldown');
    await page.evaluate(()=>UF_QA.damage(6));await page.keyboard.press('b');assert((await get()).state.hp===18&&Math.abs((await get()).state.cooldowns.b-12)<.05,'B heals four HP with the twelve-second cooldown');
    await page.keyboard.press('x');await page.clock.runFor(4900);const remaining=(await get()).state.cooldowns.xActive;assert(remaining>0&&remaining<.2,'X is active just before five seconds');
    await page.keyboard.press('x');assert((await get()).state.cooldowns.xActive<=remaining,'Repeated X does not extend its duration');await page.clock.runFor(200);assert((await get()).state.cooldowns.xActive===0&&(await get()).state.cooldowns.x>1.7,'X begins its two-second cooldown after five seconds');await page.clock.runFor(2050);assert((await get()).state.cooldowns.x===0,'X returns after five plus two seconds');
    await page.keyboard.press('Escape');const paused=(await get()).state.cooldowns.b;await page.clock.runFor(1000);assert((await get()).state.cooldowns.b===paused,'Menus pause the healing cooldown');
    assert(await page.getByRole('button',{name:'CELL · โทรศัพท์',exact:true}).isDisabled(),'Phone remains locked before the CH01 gift');
    await page.getByRole('button',{name:'STAT · สถานะ',exact:true}).click();await page.setViewportSize({width:390,height:844});await page.clock.runFor(150);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Narrow viewport has no horizontal page overflow');await shot('mobile-stat');await page.setViewportSize({width:1280,height:800});

    for(const branch of ['help','do_not_help']){
      const p=structuredClone(branch==='help'?good:await page.evaluate(()=>UF_QA.storage.read().parsed));
      if(branch==='do_not_help'){
        const candidate=await page.evaluate(p=>{localStorage.setItem(UF_QA.storage.KEY,JSON.stringify(p));return UF_QA.storage.read().parsed;},old.optional);
        p.checkpoint=structuredClone(candidate.checkpoint);p.meta=structuredClone(candidate.meta);p.runId=candidate.runId;
      }
      const c=p.checkpoint;c.chapter='ch00';c.chapterComplete={};c.hp=branch==='help'?17:13;c.cooldowns={x:0,xActive:0,c:0,b:0};delete c.worldFlags.riftEntered;delete c.worldFlags.groveExited;
      if(branch==='help'){c.room='forest_old_trees';c.spawn=[L.anchors.strangerApproach[0]-15,L.anchors.strangerApproach[1]];c.helpChoice=null;c.worldFlags.strangerSeen=false;}else{c.room='sacred_grove';c.spawn=[L.anchors.groveExit[0]+3,L.anchors.groveExit[1]+3];}
      await page.evaluate(p=>UF_QA.restoreFixture(p),p);await page.clock.runFor(50);await drain('ช่วย');s=await get();
      assert(s.mode==='end'&&s.state.hp===(branch==='help'?17:13),'Rift cinematic preserves HP for '+branch+' branch');
      assert(s.state.spawn[0]===L.anchors.riftFoot[0]&&s.state.spawn[1]===L.anchors.riftFoot[1],'Rift cinematic reaches the approved rift foot for '+branch+' branch');
      assert(await page.evaluate(()=>UF_QA.storage.read().kind)==='valid','Rift cinematic stores a current valid checkpoint for '+branch+' branch');
    }
    await page.clock.resume();
    const production=await page.context().newPage();await production.goto('http://127.0.0.1:4188/index_new.html');await production.waitForFunction(()=>window.UNDERFALL);
    assert(await production.evaluate(()=>typeof UF_QA==='undefined'&&Object.isFrozen(UNDERFALL)&&typeof UNDERFALL.warp==='undefined'),'Production exports no mutable QA or story-entry controls');await production.close();
    assert(errors.length===0,'No JavaScript runtime errors during guarded-state checks');
    return {checks,errors,shots,mapVersion:L.mapVersion,scope:'UI storage migration, guarded state, HP and cooldowns; uses deliberate saved fixtures separately from physical map-flow QA'};
  }catch(error){await page.evaluate(()=>{if(window.r00OriginalSetItem){Storage.prototype.setItem=window.r00OriginalSetItem;delete window.r00OriginalSetItem;}}).catch(()=>{});await shot('failure').catch(()=>{});return {ok:false,error:String(error),checks,errors,shots,snapshot:await get().catch(()=>null)};}
}
