/* Playwright CLI run-code suite: actual NEW UI + keyboard flow on approved R00.
 * No warp, restoreFixture, seeded checkpoint, or damage calls are used here.
 * All movement uses the shipped 70 px/s physics. Read-only collider samples
 * plan four-neighbor walking legs between anchors traced from the approved map.
 */
async (page) => {
  const URL = 'http://127.0.0.1:4188/index_new.html?qa=1';
  const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  const checks = [], shots = [], transcripts = [], errors = [], branches = [], waypointSnaps = [], presentations = [];
  let context = {branch: '', injury: '', memory: 'จำได้ลางๆ'};
  let currentLeg = null;
  page.on('pageerror', error => errors.push(String(error)));
  await page.clock.install();
  const get = () => page.evaluate(() => UF_QA.snapshot());
  const assert = (ok, message) => {
    if (!ok) throw Error(context.branch + ': ' + message);
    checks.push(context.branch + ': ' + message);
  };
  const release = async () => {
    for (const key of directions) await page.keyboard.up(key);
  };
  const source = (layout, x, y) => [
    (x - layout.sourceCrop[0]) * layout.scale,
    (y - layout.sourceCrop[1]) * layout.scale,
  ];
  const sceneChoice = snapshot => {
    const labels = snapshot.choice.map(option => option[0]);
    if (labels.includes('เจ็บ')) return context.injury;
    if (labels.includes('ช่วย')) return context.branch === 'help' ? 'ช่วย' : 'ไม่ช่วย';
    if (labels.includes(context.memory)) return context.memory;
    throw Error('Unreviewed choice: ' + JSON.stringify(labels));
  };
  async function drain() {
    await release();
    await page.evaluate(() => UF_QA.setSpeed(50));
    try {
      for (let n = 0; n < 360; n++) {
        const snapshot = await get();
        if (!snapshot.busy && ['walk', 'end', 'menu'].includes(snapshot.mode)) return snapshot;
        if (snapshot.mode === 'choice') {
          const label = sceneChoice(snapshot);
          await page.getByRole('button', {name: label, exact: true}).click();
        } else if (snapshot.mode === 'dialogue') {
          const line = snapshot.typing?.text;
          if (line && !transcripts.some(entry => entry.branch === context.branch && entry.text === line)) {
            transcripts.push({branch: context.branch, text: line});
          }
          await page.keyboard.press('Enter');
        }
        await page.clock.runFor(25);
      }
      throw Error('Scene did not release input: ' + JSON.stringify(await get()));
    } finally {
      await page.evaluate(() => UF_QA.setSpeed(1));
    }
  }
  async function shot(label) {
    const file = 'output/playwright/r00-' + context.branch + '-' + label + '.png';
    await page.screenshot({path: file});
    shots.push(file);
  }

  async function plan(target) {
    return page.evaluate(({goal}) => {
      const L = UF_DATA.mapLayout, S = UF_QA.snapshot().state, start = S.spawn;
      const grid = 4, cols = Math.ceil(L.width / grid), rows = Math.ceil(L.height / grid);
      const index = (x, y) => y * cols + x;
      const xy = id => [id % cols, Math.floor(id / cols)];
      const center = id => xy(id).map(value => value * grid);
      const cache = new Map();
      // Movement can stop up to 1.2px from a requested axis coordinate because
      // physics runs in animation frames. Plan a 1.6px margin around each point
      // and sample between grid nodes, so legal sampled nodes cannot bridge a
      // sub-grid gap or skim a mask edge with the player's actual footprint.
      function pointFree(x, y) {
        const margin=S.room==='sacred_grove'?0:1.6;
        return [[0,0],[-margin,0],[margin,0],[0,-margin],[0,margin]].every(([dx,dy])=>!UF_QA.collides(x+dx,y+dy));
      }
      function free(id) {
        if (id < 0 || id >= cols * rows) return false;
        if (!cache.has(id)) {
          const point = center(id);
          cache.set(id, pointFree(point[0], point[1]));
        }
        return cache.get(id);
      }
      function closest(point) {
        const gx = Math.round(point[0] / grid), gy = Math.round(point[1] / grid);
        const candidates = [];
        for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
          const x = gx + dx, y = gy + dy;
          if (x < 0 || x >= cols || y < 0 || y >= rows) continue;
          const id = index(x, y);
          if (free(id)) candidates.push({id, distance: Math.hypot(x * grid - point[0], y * grid - point[1])});
        }
        candidates.sort((a, b) => a.distance - b.distance);
        if (!candidates.length) throw Error('Anchor has no walkable nearby grid point: ' + point);
        return candidates[0].id;
      }
      const first = closest(start), last = closest(goal);
      const lastXY = xy(last), heuristic = id => {
        const p = xy(id);
        return Math.abs(p[0] - lastXY[0]) + Math.abs(p[1] - lastXY[1]);
      };
      const open = [{id: first, priority: heuristic(first)}], distance = new Map([[first, 0]]), parent = new Map();
      function push(item) {
        open.push(item);
        let i = open.length - 1;
        while (i) {
          const p = (i - 1) >> 1;
          if (open[p].priority <= item.priority) break;
          open[i] = open[p]; i = p;
        }
        open[i] = item;
      }
      function pop() {
        const answer = open[0], tail = open.pop();
        if (!open.length) return answer;
        let i = 0;
        while (i * 2 + 1 < open.length) {
          let child = i * 2 + 1;
          if (child + 1 < open.length && open[child + 1].priority < open[child].priority) child++;
          if (tail.priority <= open[child].priority) break;
          open[i] = open[child]; i = child;
        }
        open[i] = tail;
        return answer;
      }
      let explored = 0, found = false;
      while (open.length && explored++ < cols * rows * 4) {
        const {id} = pop();
        if (id === last) { found = true; break; }
        const [x, y] = xy(id), cost = distance.get(id) + 1;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const xx = x + dx, yy = y + dy;
          if (xx < 0 || xx >= cols || yy < 0 || yy >= rows) continue;
          const next = index(xx, yy);
          if (!free(next) || cost >= (distance.get(next) ?? Infinity)) continue;
          const currentPoint = center(id), nextPoint = center(next);
          if (![.25,.5,.75].every(part => pointFree(
            currentPoint[0]+(nextPoint[0]-currentPoint[0])*part,
            currentPoint[1]+(nextPoint[1]-currentPoint[1])*part))) continue;
          distance.set(next, cost); parent.set(next, id);
          push({id: next, priority: cost + heuristic(next)});
        }
      }
      if (!found) throw Error('No approved walkable route: ' + JSON.stringify({start, goal, room: S.room, explored}));
      const path = [];
      for (let id = last; id !== undefined; id = parent.get(id)) path.push(center(id));
      path.reverse();
      // Compress only collinear grid steps. Never join turns with a diagonal.
      const compact = path.length ? [path[0]] : [];
      for (let i = 1; i < path.length - 1; i++) {
        const a = path[i - 1], b = path[i], c = path[i + 1];
        if (b[0] - a[0] !== c[0] - b[0] || b[1] - a[1] !== c[1] - b[1]) compact.push(b);
      }
      if (path.length > 1) compact.push(path[path.length - 1]);
      return {path: compact, start, goal, nearestWalkable: center(last), room: S.room, sampled: cache.size, explored};
    }, {goal: target});
  }

  async function moveAxis(axis, value, stopWhen = null) {
    let previous = null, stuck = 0;
    const beginning = await get();
    const beginningRegion = beginning.state.room === 'sacred_grove' ? 'grove' : 'forest';
    for (let n = 0; n < 1800; n++) {
      let snapshot = await get();
      if (snapshot.busy) { await drain(); snapshot = await get(); }
      if (snapshot.mode === 'end' || stopWhen?.(snapshot.state)) { await release(); return 'stopped'; }
      if (snapshot.mode !== 'walk') throw Error('Movement attempted in ' + snapshot.mode);
      const region = snapshot.state.room === 'sacred_grove' ? 'grove' : 'forest';
      if (region !== beginningRegion) { await release(); return 'transition'; }
      const position = snapshot.state.spawn, remaining = value - position[axis];
      if (Math.abs(remaining) < .65) { await release(); return 'arrived'; }
      if (previous && Math.hypot(position[0] - previous[0], position[1] - previous[1]) < .12) stuck++;
      else stuck = 0;
      if (stuck > 12) {
        await release();
        throw Error('Collision/path stuck: ' + JSON.stringify({position, axis, value, currentLeg, room: snapshot.state.room}));
      }
      previous = [...position];
      const key = axis === 0 ? (remaining > 0 ? 'ArrowRight' : 'ArrowLeft') : (remaining > 0 ? 'ArrowDown' : 'ArrowUp');
      for (const other of directions) if (other !== key) await page.keyboard.up(other);
      await page.keyboard.down(key);
      await page.clock.runFor(Math.min(180, Math.max(16, Math.abs(remaining) / 70 * 1000)));
    }
    throw Error('Movement budget exceeded: ' + JSON.stringify(currentLeg));
  }
  async function walkTo(target, options = {}) {
    const route = await plan(target);
    currentLeg = {label: options.label || 'anchor', target, route};
    for (const waypoint of route.path) {
      for (const axis of [0, 1]) {
        const result = await moveAxis(axis, waypoint[axis], options.stopWhen);
        if (result !== 'arrived') return result;
      }
    }
    if (options.exact === false) {
      waypointSnaps.push({branch: context.branch, label: options.label, requested: target, walked: route.nearestWalkable});
      return 'arrived';
    }
    // The last grid point is within 4.25px. Exact interaction anchors use short
    // horizontal/vertical final steps, still under normal collision/physics.
    for (const axis of [0, 1]) {
      const result = await moveAxis(axis, target[axis], options.stopWhen);
      if (result !== 'arrived') return result;
    }
    return 'arrived';
  }
  async function walkRoute(route, label) {
    for (let i = 0; i < route.length; i++) {
      const result = await walkTo(route[i], {label: label + '-' + i, exact: false});
      if (result === 'stopped' || result === 'transition') return result;
    }
    return 'arrived';
  }
  async function faceUp() { await page.keyboard.press('ArrowUp'); }
  async function saveAt(anchor, label, approachOffset = 18) {
    await walkTo([anchor[0], anchor[1] + approachOffset], {label});
    await faceUp(); await page.keyboard.press('Enter');
    assert((await get()).page === 'save', label + ' opens SAVE through nearby interaction');
    await page.getByRole('button', {name: 'บันทึก', exact: true}).click();
    assert((await get()).page === 'saved', label + ' commits a real checkpoint');
    await page.getByRole('button', {name: 'กลับไปเดิน', exact: true}).click();
  }

  try {
    for (const scenario of [{branch: 'do_not_help', injury: 'ไม่เจ็บ'}, {branch: 'help', injury: 'เจ็บ'}]) {
      context = {...context, ...scenario};
      const beforeErrors = errors.length;
      await page.goto(URL);
      await page.waitForFunction(() => window.UF_QA && window.UF_DATA?.mapLayout);
      const L = await page.evaluate(() => UF_DATA.mapLayout), A = L.anchors;
      assert(L.mapVersion === 'UF-R00-V1B-2026-10-09', 'approved shared R00 version is loaded');
      assert(L.source.includes('design/maps/2026-10-08-v1/'), 'world uses owner-selected v1 source');
      const presentation = await page.evaluate(() => ({
        construction: UF_DATA.renderConstruction,
        hasWholeMapBackground: Object.hasOwn(UF_DATA.assets,'mapBackground'),
        treeTypes: Object.keys(UF_DATA.treeTypes || {}),
        engineRevision: UF_DATA.engineRevision,
      }));
      assert(presentation.construction === 'layered-floor-and-depth-sorted-objects', 'actual terrain/object renderer is installed');
      assert(!presentation.hasWholeMapBackground, 'game has no full-reference map background asset');
      presentations.push({branch: context.branch, ...presentation});
      await page.getByRole('button', {name: 'เริ่มใหม่', exact: true}).click();
      await page.getByRole('button', {name: 'ยืนยันเริ่มใหม่', exact: true}).click();
      await drain();
      let S = (await get()).state;
      assert(S.legAnswer === (scenario.injury === 'เจ็บ' ? 'hurt' : 'unhurt'), 'injury choice completes and releases walking');
      assert(S.name === null && !S.phone, 'identity and phone remain unrevealed');
      await shot('forest-start');

      // Dirt loop around the approved flowerbed; no transition before bottle.
      const loop = [[421,538],[421,462],[271,462],[271,550],[298,537]].map(([x,y]) => source(L,x,y));
      for (let lap = 0; lap < 4 && !(await get()).state.worldFlags.bottleSpawned; lap++) {
        for (let i = 0; i < loop.length && !(await get()).state.worldFlags.bottleSpawned; i++) {
          await walkTo(loop[i], {label: 'flowerbed-loop-' + lap + '-' + i, stopWhen: state => state.worldFlags.bottleSpawned});
        }
      }
      await drain(); S = (await get()).state;
      assert(S.worldFlags.deerSeen && S.worldFlags.bottleSpawned && S.walkDistance >= 620, 'deer and bottle hint arise from 620px of actual walking');
      await walkTo([A.bottle[0], A.bottle[1] + 18], {label: 'bottle-pickup'});
      await faceUp(); await page.keyboard.press('Enter'); await drain();
      S = (await get()).state;
      assert(S.bottle && S.inventory.soul_bottle === 1 && S.worldFlags.bottleTutorialDone, 'bottle interaction grants its exact item and tutorial');
      await shot('bottle');
      await page.keyboard.press('Escape');
      await page.getByRole('button', {name: 'STAT · สถานะ', exact: true}).click();
      assert((await get()).page === 'stats', 'STAT opens from the actual overworld menu');
      await shot('stat');
      await page.keyboard.press('Escape'); await page.keyboard.press('Escape');

      await walkRoute(L.routes.originToMainBridge, 'main-bridge');
      await walkTo(L.rooms.forest_extension.spawn, {label: 'extension-entry'});
      assert((await get()).state.room === 'forest_extension', 'same-world bridge advances to extension without teleport');
      await saveAt(A.extensionSave, 'extension-save');
      await page.keyboard.press('x');
      assert((await get()).state.cooldowns.xActive > 0, 'X starts a five-second pulse');
      await page.keyboard.press('Escape');
      const pauseX = (await get()).state.cooldowns.xActive;
      await page.clock.runFor(500);
      assert(Math.abs((await get()).state.cooldowns.xActive - pauseX) < .001, 'menu pauses the light timer');
      await page.keyboard.press('Escape');

      await walkRoute(L.routes.mainToRootChest.slice(1,-1), 'root-chest-path');
      await walkTo(A.rootChestInteract, {label: 'root-chest-approach'});
      await faceUp(); await page.keyboard.press('c'); await drain();
      S = (await get()).state;
      assert(S.worldFlags.rootChestBurned && !S.worldFlags.rootGateBurned, 'C burns chest roots independently of the path gate');
      await page.keyboard.press('Enter'); await drain();
      assert((await get()).state.inventory.warm_muffin === 1, 'native chest interaction grants one muffin');
      await page.keyboard.press('i');
      await page.getByRole('button', {name: /มัฟฟิ้นอุ่นๆ.*×1/}).click();
      await page.getByRole('button', {name: 'กินมัฟฟิ้น', exact: true}).click(); await drain();
      S = (await get()).state;
      assert(S.foodDF === 4 && !S.inventory.warm_muffin && S.worldFlags.usedMuffin, 'muffin is consumed once and adds four DF');
      assert((await get()).page === 'item', 'muffin dialogue returns to its item pane');
      await page.keyboard.press('Escape'); await page.keyboard.press('Escape'); await page.keyboard.press('Escape');
      await walkRoute([...L.routes.mainToRootChest].reverse().slice(1), 'root-chest-return');
      await walkTo([A.rootGate[0] - 27, A.rootGate[1]], {label: 'root-gate-approach'});
      await page.keyboard.press('ArrowRight'); await page.keyboard.press('c'); await drain();
      assert((await get()).state.worldFlags.rootGateBurned, 'forward C opens the real root gate');
      await shot('root-gate-open');
      await walkTo(L.rooms.forest_old_trees.spawn, {label: 'old-tree-entry'}); await drain();
      S = (await get()).state;
      assert(S.room === 'forest_old_trees' && S.worldFlags.memoryAsked, 'walking through gate advances memory scene on the same map');
      await saveAt(A.oldTreeSave, 'old-tree-save', 0);
      await shot('old-tree-save');
      await walkTo(A.strangerApproach, {label: 'stranger-approach', stopWhen: state => !!state.helpChoice});
      await drain(); S = (await get()).state;
      assert(S.helpChoice === scenario.branch, 'stranger choice follows the selected branch');

      if (scenario.branch === 'do_not_help') {
        assert(S.room === 'forest_old_trees', 'declining help preserves exploration');
        await walkTo([A.secretStoneInteract[0], A.secretStoneInteract[1] + 18], {label: 'secret-stone-approach'});
        await faceUp(); await page.keyboard.press('v'); await drain();
        assert((await get()).state.worldFlags.groveOpen, 'V opens the fox-marked native stone door');
        await shot('stone-open');
        await walkTo(L.stageGates.secretEntry.center, {label: 'stone-threshold'}); await drain();
        assert((await get()).state.room === 'sacred_grove', 'opened tunnel leads into the approved grove plaza');
        await shot('grove-entry');
        // Intermediate visual guides are not floor anchors; route directly to
        // the verified interaction point through the shipped collider.
        await walkTo([A.ringChestInteract[0], A.ringChestInteract[1] + 18], {label: 'ring-chest-approach'});
        await faceUp(); await page.keyboard.press('Enter'); await drain();
        S = (await get()).state;
        assert(S.ringCharge === 1 && S.inventory.old_fox_ring === 1 && S.worldFlags.ringPicked, 'native ring chest grants one revival charge');
        await page.keyboard.press('n'); await drain();
        assert((await get()).state.nUnlocked && (await get()).state.fx.hands, 'actual N unlocks the two dark-centered hands');
        await shot('grove-hands');
        await walkRoute(L.routes.groveRingToSave.slice(1,-1), 'grove-save-path');
        await saveAt(A.groveSave, 'grove-save');
        await walkTo([A.waterfall[0], A.waterfall[1] + 18], {label: 'grove-waterfall-approach'});
        await faceUp(); await page.keyboard.press('Enter'); await drain();
        assert((await get()).state.dialogueSeen.quiet, 'waterfall quiet dialogue is reachable by walking');
        await walkTo(A.groveExit, {label: 'grove-exit'}); await drain();
        S = (await get()).state;
        assert(S.worldFlags.groveExited && S.nUnlocked && S.inventory.old_fox_ring === 1, 'grove exit triggers the hands ambush with earned items');
      } else {
        assert(!S.nUnlocked && !S.ringCharge && !S.inventory.old_fox_ring && !S.worldFlags.groveOpen, 'help branch awards no grove items or powers');
      }
      const end = await get();
      assert(end.state.room === 'rift_bridge' && end.state.resumeScene === '10.10' && end.state.chapter === 'ch01_pending', 'branch stops at the safe 10.10 rift checkpoint');
      assert(end.state.name === null && !end.state.phone && end.state.foodDF === 4, 'identity gates and consumed-item effects survive the handoff');
      assert(end.mode === 'end' && end.page === 'end', 'chapter-end controls remain above the black world');
      const saved = await page.evaluate(() => UF_QA.storage.read());
      assert(saved.kind === 'valid', 'automatic rift SAVE is valid');
      assert(errors.length === beforeErrors, 'no JavaScript runtime errors during branch');
      await shot('rift-end');
      branches.push({branch: scenario.branch, injury: scenario.injury, endState: end.state, save: saved.parsed});
    }
    return {ok: true, mapVersion: 'UF-R00-V1B-2026-10-09', branches, checks, shots, transcripts, errors, waypointSnaps, presentations,
      testBoundaries: {navigation: 'actual keyboard, 70px/s, axis-aligned collider routes', sceneSpeed: 50,
        warpUsed: false, fixturesUsed: false, damageUsed: false, storage: 'underfall.qa.save.v1 in isolated underfall-r00-v1 CLI profile'}};
  } catch (error) {
    await release();
    const snapshot = await get().catch(() => null);
    const file = 'output/playwright/r00-' + (context.branch || 'startup') + '-failure.png';
    await page.screenshot({path: file}).catch(() => {});
    return {ok: false, error: String(error), branch: context.branch, checks, shots: [...shots, file], transcripts, errors,
      currentLeg, snapshot, testBoundaries: {warpUsed: false, fixturesUsed: false, damageUsed: false}};
  }
}
