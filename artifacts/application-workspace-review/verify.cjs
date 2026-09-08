const {chromium}=require('C:/Users/dppc2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();const report={checks:[],errors:[],requests:[]};page.on('pageerror',e=>report.errors.push(e.message));page.on('request',r=>{if(r.url().includes('/api/'))report.requests.push(r.url())});
for(const name of ['application-create','application-detail','application-update']){
await page.goto('http://localhost:3007/preview-design/'+name,{waitUntil:'networkidle'});
await page.addStyleTag({content:'nextjs-portal{display:none} *,*::before,*::after{animation:none!important;transition:none!important}'});
await page.addScriptTag({path:'src/frontend/node_modules/axe-core/axe.min.js'});
for(const width of [320,390,640,768,1024,1440]){
await page.setViewportSize({width,height:1000});
for(const scenario of ['Populated','Empty notes','Long text']){
await page.getByRole('combobox',{name:'Preview scenario'}).selectOption(scenario);
assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),name+' overflow '+width);
const violations=[390,1440].includes(width)?await page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.html)}))):[];
report.checks.push({name,width,scenario,violations});
if([390,1440].includes(width)&&scenario==='Populated')await page.screenshot({path:'artifacts/application-workspace-review/'+name+'-'+width+'.png',fullPage:true});
}
}
}
fs.writeFileSync('artifacts/application-workspace-review/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser.close();
})();
