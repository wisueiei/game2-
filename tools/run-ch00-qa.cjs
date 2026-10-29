'use strict';
const fs=require('fs'),path=require('path'),{execFile}=require('child_process');
const root=path.resolve(__dirname,'..');
const cli='C:/Users/wisu/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js';
const suites=process.argv.slice(2).length?process.argv.slice(2):['flow','help','guardrails'];
function command(suite){return new Promise((resolve,reject)=>execFile(process.execPath,[cli,'-s=underfall-ch00','run-code','--filename',`tools/qa-ch00-${suite}.js`],{cwd:root,encoding:'utf8',maxBuffer:8*1024*1024,windowsHide:true},(error,stdout,stderr)=>{
  const dest=path.join(root,'output/ch00');fs.mkdirSync(dest,{recursive:true});fs.writeFileSync(path.join(dest,`${suite}-run.log`),stdout+stderr);
  if(error||stdout.includes('### Error'))return reject(Error(`${suite}: ${stdout.slice(0,1400)}${stderr.slice(0,300)}`));
  const m=stdout.match(/### Result\r?\n([\s\S]*?)\r?\n### Ran Playwright code/);if(!m)return reject(Error('Missing browser result for '+suite));
  let r;try{r=JSON.parse(m[1]);}catch{return reject(Error('Invalid test JSON for '+suite));}
  r.testedAt=new Date().toISOString();fs.writeFileSync(path.join(dest,`${suite}-result.json`),JSON.stringify(r,null,2)+'\n');
  console.log(JSON.stringify({suite,checks:r.checks.length,branch:r.branch,errors:r.errors,report:`output/ch00/${suite}-result.json`}));resolve(r);
}));}
(async()=>{for(const suite of suites)await command(suite);})().catch(e=>{console.error(e.message);process.exitCode=1;});
