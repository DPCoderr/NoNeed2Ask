const { chromium } = require('C:/Users/dppc2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
 const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, timezoneId: 'Europe/Amsterdam' });
 const report = {responsive:[], accessibility:[], errors:[], requests:[]};
 page.on('pageerror', e => report.errors.push(e.message));
 page.on('request', r => {if(r.url().includes('/api/'))report.requests.push(r.url());});
 await page.goto('http://localhost:3007/preview-design/dashboard',{waitUntil:'networkidle',timeout:120000});
 await page.addStyleTag({content:'nextjs-portal{display:none}'});
 await page.addScriptTag({path:'src/frontend/node_modules/axe-core/axe.min.js'});
 const decoration = page.locator('[data-workspace-background="dashboard"] > [aria-hidden="true"]');
 const scenarios=['Populated','Empty','No interview','Loading','Error','Sharing unavailable','Sharing saving','Long names'];
 for(const width of [320,390,640,768,1024,1440]) {
  await page.setViewportSize({width,height:1000});
  for(const collapsed of width>=768?[false,true]:[false]) {
   if(width>=768) {
    const current=await page.locator('[data-slot="sidebar-wrapper"]').getAttribute('data-collapsible');
    if((current==='icon')!==collapsed)await page.getByRole('button',{name:'Toggle sidebar',exact:true}).click();
   }
   for(const scenario of scenarios) {
    await page.getByRole('combobox',{name:'Preview scenario'}).selectOption(scenario);
    await page.locator('#app-main-content').evaluate(el=>el.scrollTop=0);
    const geometry=await page.evaluate(()=>{
     const scroller=document.getElementById('app-main-content');
     return {pageWidth:document.documentElement.scrollWidth,client:scroller.clientWidth,scroll:scroller.scrollWidth};
    });
    assert.ok(geometry.pageWidth<=width && geometry.scroll<=geometry.client,`Overflow ${width} ${scenario}`);
    report.responsive.push({width,collapsed,scenario,...geometry});
    if([390,768,1440].includes(width)&&!collapsed) {
     const audit=()=>page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
     const active=await audit();
     await decoration.evaluate(el=>el.style.visibility='hidden');
     const baseline=await audit();
     await decoration.evaluate(el=>el.style.removeProperty('visibility'));
     assert.deepEqual(active,baseline,'Background changed accessibility results');
     report.accessibility.push({width,scenario,newViolations:0,baseline});
    }
    if([390,768,1440].includes(width)&&!collapsed&&['Populated','Empty','Loading','Error','Long names'].includes(scenario)) {
     await page.screenshot({path:`artifacts/dashboard-background-review/${scenario.toLowerCase().replaceAll(' ','-')}-${width}.png`});
    }
   }
   if(collapsed&&width===1440) {
    await page.getByRole('combobox',{name:'Preview scenario'}).selectOption('Populated');
    await page.locator('#app-main-content').evaluate(el=>el.scrollTop=0);
    await page.screenshot({path:'artifacts/dashboard-background-review/collapsed-1440.png'});
   }
  }
 }
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('combobox',{name:'Preview scenario'}).selectOption('Populated');
 const sharing=page.getByRole('switch');
 await sharing.click();assert.equal(await sharing.getAttribute('aria-checked'),'false');
 await sharing.click();assert.equal(await sharing.getAttribute('aria-checked'),'true');
 await page.getByRole('button',{name:'Toggle sidebar',exact:true}).click();
 await page.getByRole('dialog').waitFor();
 await page.keyboard.press('Escape');
 await page.getByRole('dialog').waitFor({state:'hidden'});
 assert.equal(await page.evaluate(()=>document.activeElement.id),'app-sidebar-trigger');
 report.mobileNavigation='Dialog opens, Escape closes, focus returns to trigger';
 await page.getByRole('link',{name:'Add application',exact:true}).focus();
 await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
 report.focus=await page.getByRole('link',{name:'Add application',exact:true}).evaluate(el=>({boxShadow:getComputedStyle(el).boxShadow,outline:getComputedStyle(el).outlineStyle}));
 const before=await decoration.boundingBox();
 await page.locator('#app-main-content').evaluate(el=>el.scrollTop=200);
 const after=await decoration.boundingBox();assert.equal(Math.round(before.y-after.y),200);
 await page.screenshot({path:'artifacts/dashboard-background-review/mobile-scrolled.png'});
 report.scrollsWithContent=true;
 for(const name of ['applications','public-page']) {
  await page.getByRole('combobox',{name:'Preview page'}).selectOption(name);
  await page.waitForURL(`**/preview-design/${name}`);
  assert.equal(await decoration.count(),0,`Decoration leaked to ${name}`);
 }
 fs.writeFileSync('artifacts/dashboard-background-review/browser-report.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify({responsiveChecks:report.responsive.length,newA11yViolations:0,baselineViolations:report.accessibility.map(a=>({width:a.width,scenario:a.scenario,ids:a.baseline.map(v=>v.id)})),errors:report.errors,requests:report.requests,mobileNavigation:report.mobileNavigation,focus:report.focus,scrollsWithContent:true},null,2));
 await browser.close();
})();
