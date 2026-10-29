// Execute with playwright-cli run-code --filename tools/check-player-r5-preview.cjs
// Asset-preview UI checks only. No game integration and no @playwright/test suite.
async (page) => {
  await page.waitForFunction(() => window.__R5Preview?.ready);
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.getByRole('button', { name: 'ขวา', exact: true }).click();
  if (!(await page.evaluate(() => window.__R5Preview.playing))) {
    await page.getByRole('button', { name: 'เล่นแอนิเมชัน', exact: true }).click();
  }
  if (!(await page.evaluate(() => window.__R5Preview.walking))) {
    await page.getByRole('button', { name: 'เดินวน', exact: true }).click();
  }
  const results = [];
  for (const [label, dir] of [['หน้า', 'front'], ['หลัง', 'back'], ['ซ้าย', 'left'], ['ขวา', 'right']]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.waitForFunction(dir => window.__R5Preview.frame.startsWith(dir + '-'), dir);
    const seen = await page.evaluate(async () => {
      const seen = new Set();
      for (let i = 0; i < 20; i++) {
        seen.add(window.__R5Preview.frame);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      return [...seen];
    });
    if (seen.length !== 3 || seen.some(f => !f.startsWith(dir + '-'))) throw new Error('Bad cycle ' + dir + ' ' + seen);
    results.push({ direction: dir, frames: seen });
  }
  await page.getByRole('button', { name: 'หยุดแอนิเมชัน', exact: true }).click();
  const paused = await page.evaluate(() => window.__R5Preview.frame);
  await page.waitForTimeout(200);
  if (await page.evaluate(() => window.__R5Preview.frame) !== paused) throw new Error('Pause failed');
  await page.getByRole('button', { name: 'เฟรมถัดไป', exact: true }).click();
  await page.waitForFunction(previous => window.__R5Preview.frame !== previous, paused);
  if (await page.evaluate(() => window.__R5Preview.frame) === paused) throw new Error('Frame advance failed');
  await page.getByRole('button', { name: 'เล่นแอนิเมชัน', exact: true }).click();
  await page.getByLabel('พื้นที่ลองเดินผู้เล่นด้วยปุ่ม WASD หรือปุ่มลูกศร').click();
  const before = await page.evaluate(() => ({ x: window.__R5Preview.x, y: window.__R5Preview.y }));
  await page.keyboard.down('d');
  await page.waitForTimeout(180);
  await page.keyboard.up('d');
  const after = await page.evaluate(() => ({ x: window.__R5Preview.x, y: window.__R5Preview.y }));
  if (!(after.x > before.x)) throw new Error('Keyboard movement failed');
  for (const pose of ['fall', 'lie', 'sit', 'rise', 'pickup', 'hold']) {
    await page.getByLabel('ท่าประกอบฉาก').selectOption(pose);
    await page.waitForTimeout(60);
    if (await page.evaluate(() => window.__R5Preview.frame) !== pose) throw new Error('Pose failed ' + pose);
  }
  for (const pose of ['landing', 'collect-bottle']) {
    await page.getByLabel('ท่าประกอบฉาก').selectOption(pose);
    await page.waitForTimeout(pose === 'landing' ? 2800 : 1700);
    const actual = await page.evaluate(() => window.__R5Preview.frame);
    if (actual !== 'front-idle') throw new Error('Cutscene did not finish ' + pose + ' ' + actual);
    results.push({ animation: pose, finalFrame: actual });
  }
  for (const type of ['checker', 'light', 'battle', 'ruins', 'forest']) {
    await page.getByLabel('พื้นหลังตรวจภาพ').selectOption(type);
    await page.waitForTimeout(60);
  }
  await page.setViewportSize({ width: 375, height: 900 });
  const mobile = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, figures: document.querySelectorAll('figure').length }));
  if (mobile.scrollWidth !== mobile.width || mobile.figures !== 18) throw new Error('Mobile overflow or missing figures');
  await page.screenshot({ path: 'output/playwright/player-r5-mobile.png' });
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.getByRole('button', { name: 'หน้า', exact: true }).click();
  await page.screenshot({ path: 'output/playwright/player-r5-preview.png', fullPage: true });
  const errors = await page.evaluate(() => window.__R5Preview.errors);
  if (errors.length) throw new Error(errors.join('\n'));
  const report = { status: 'PASS', results, keyboard: { before, after }, mobile, errors, scope: 'asset preview only' };
  await page.evaluate(report => { window.__R5PreviewCheckReport = report; }, report);
  return report;
}
