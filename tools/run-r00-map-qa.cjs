/* Run only after the shared R00 build is ready. CLI session is isolated. */
'use strict';
const fs = require('fs'), path = require('path'), {execFile} = require('child_process');
const root = path.resolve(__dirname, '..');
const cli = 'C:/Users/wisu/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js';
const session = 'underfall-r00-v1';
const url = 'http://127.0.0.1:4188/index_new.html?qa=1';
const out = path.join(root, 'output/playwright');
function command(args, label) {
  return new Promise((resolve, reject) => {
    execFile(process.execPath, [cli, '-s=' + session, ...args], {
      cwd: root, encoding: 'utf8', maxBuffer: 12 * 1024 * 1024, windowsHide: true,
    }, (error, stdout, stderr) => {
      fs.mkdirSync(out, {recursive: true});
      fs.writeFileSync(path.join(out, 'r00-' + label + '-run.log'), stdout + stderr);
      if (error || stdout.includes('### Error')) return reject(Error(label + ': ' + stdout.slice(0,1800) + stderr.slice(0,300)));
      resolve(stdout);
    });
  });
}
(async () => {
  await command(['open', url], 'open');
  await command(['snapshot'], 'initial-snapshot');
  const stdout = await command(['run-code', '--filename', 'tools/qa-r00-map-flow.js'], 'flow');
  const match = stdout.match(/### Result\r?\n([\s\S]*?)\r?\n### Ran Playwright code/);
  if (!match) throw Error('Missing browser result for R00 map flow');
  const result = JSON.parse(match[1]);
  result.testedAt = new Date().toISOString();
  fs.writeFileSync(path.join(out, 'r00-map-flow-result.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ok: result.ok !== false, checks: result.checks.length,
    branches: result.branches?.map(branch => branch.branch), error: result.error,
    errors: result.errors, report: 'output/playwright/r00-map-flow-result.json'}));
  if (result.ok === false) process.exitCode = 1;
})().catch(error => {console.error(error.message); process.exitCode = 1;});
