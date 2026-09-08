const {chromium}=require('C:/Users/dppc2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const report={responsive:[],accessibility:[],errors:[],requests:[]};
 page.on('pageerror',e=>report.errors.push(e.message));
 page.on('request',r=>{if(r.url().includes('/api/'))report.requests.push(r.url());});
 await page.goto('http://localhost:3007/preview-design/applications',{waitUntil:'networkidle',timeout:120000});
 await page.addStyleTag({content:'nextjs-portal{display:none}'});
 await page.addScriptTag({path:'src/frontend/node_modules/axe-core/axe.min.js'});
 const background=page.locator('[data-workspace-background="applications"]');
 const decoration=background.locator(':scope > [aria-hidden="true"]');
 const scenario=page.getByRole('combobox',{name:'Preview scenario'});
 for(const width of [320,390,640,768,1024,1440]) {
  await page.setViewportSize({width,height:1000});
  for(const collapsed of width>=768?[false,true]:[false]) {
   if(width>=768) {
    const current=await page.locator('[data-slot="sidebar-wrapper"]').getAttribute('data-collapsible');
    if((current==='icon')!==collapsed)await page.getByRole('button',{name:'Toggle sidebar',exact:true}).click();
   }
   for(const value of ['Populated','Empty','No results','Loading','Error','Long names','Many pages','Delete error']) {
    await scenario.selectOption(value);
    await page.locator('#app-main-content').evaluate(el=>el.scrollTop=0);
    const geometry=await page.evaluate(()=>{const el=document.getElementById('app-main-content');return {page:document.documentElement.scrollWidth,client:el.clientWidth,scroll:el.scrollWidth};});
    assert.ok(geometry.page<=width&&geometry.client>=geometry.scroll,`Overflow ${width} ${value}`);
    report.responsive.push({width,collapsed,scenario:value,...geometry});
    assert.ok((await decoration.boundingBox()).height<=320);
    if([390,768,1440].includes(width)&&!collapsed) {
     const audit=()=>page.evaluate(async()=>(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
     const active=await audit();await decoration.evaluate(el=>el.style.visibility='hidden');const baseline=await audit();await decoration.evaluate(el=>el.style.removeProperty('visibility'));
     assert.deepEqual(active,baseline,'New accessibility issue');report.accessibility.push({width,scenario:value,newViolations:0,baseline});
    }
    if([390,768,1440].includes(width)&&!collapsed&&['Populated','Empty','Loading','Error','Long names'].includes(value))await page.screenshot({path:`artifacts/applications-background-review/${value.toLowerCase().replaceAll(' ','-')}-${width}.png`});
   }
  }
 }
 await page.setViewportSize({width:390,height:844});
 await scenario.selectOption('Populated');
 const search=page.getByRole('searchbox',{name:'Search companies or roles'});
 await search.fill('Northstar');await search.press('Enter');
 assert.equal(await page.getByRole('button',{name:'Actions for Northstar Labs',exact:true}).count(),1);
 assert.equal(await page.getByRole('button',{name:'Actions for Kindred Health',exact:true}).count(),0);
 await search.fill('');await search.press('Enter');
 await page.getByRole('group',{name:'Filter by status'}).getByRole('button',{name:'Offer',exact:true}).click();
 assert.equal(await page.getByRole('button',{name:'Actions for Forma Studio',exact:true}).count(),1);
 await page.getByRole('button',{name:'All statuses',exact:true}).click();
 await page.getByRole('combobox',{name:'Sort applications by'}).click();await page.getByRole('option',{name:'Sort: Company',exact:true}).click();
 await page.getByRole('combobox',{name:'Sort direction'}).click();await page.getByRole('option',{name:'Ascending',exact:true}).click();
 assert.match(await page.locator('button[aria-label^="Actions for"]').first().getAttribute('aria-label'),/Atlas Works/);
 const action=page.getByRole('button',{name:'Actions for Atlas Works',exact:true});
 await action.click();await page.getByRole('menuitem',{name:'Delete application'}).click();await page.getByRole('alertdialog').waitFor();
 await page.screenshot({path:'artifacts/applications-background-review/delete-dialog-390.png'});
 await page.getByRole('button',{name:'Cancel',exact:true}).click();await page.getByRole('alertdialog').waitFor({state:'hidden'});
 assert.equal(await action.evaluate(el=>document.activeElement===el),true);
 await action.click();await page.getByRole('menuitem',{name:'Delete application'}).click();await page.getByRole('button',{name:'Delete',exact:true}).click();
 await page.getByRole('alertdialog').waitFor({state:'hidden'});assert.equal(await action.count(),0);
 await scenario.selectOption('Delete error');
 await page.getByRole('button',{name:'Actions for Northstar Labs',exact:true}).click();await page.getByRole('menuitem',{name:'Delete application'}).click();await page.getByRole('button',{name:'Delete',exact:true}).click();
 assert.match(await page.getByRole('alertdialog').innerText(),/We could not delete/);
 await page.getByRole('button',{name:'Cancel',exact:true}).click();
 await scenario.selectOption('Many pages');await page.getByRole('button',{name:'Next page',exact:true}).click();
 assert.equal(await page.getByRole('button',{name:'Page 2',exact:true}).getAttribute('aria-current'),'page');
 await scenario.selectOption('Error');await page.getByRole('button',{name:/Try again/i}).click();assert.equal(await scenario.inputValue(),'Populated');
 await page.getByRole('button',{name:'Toggle sidebar',exact:true}).click();await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'hidden'});
 assert.equal(await page.evaluate(()=>document.activeElement.id),'app-sidebar-trigger');
 await page.locator('#app-main-content').evaluate(el=>el.scrollTop=0);const before=await decoration.boundingBox();await page.locator('#app-main-content').evaluate(el=>el.scrollTop=200);const after=await decoration.boundingBox();assert.equal(Math.round(before.y-after.y),200);
 await page.getByRole('combobox',{name:'Preview page'}).selectOption('dashboard');await page.waitForURL('**/preview-design/dashboard');assert.equal(await page.locator('[data-workspace-background="dashboard"]').count(),1);
 await page.getByRole('combobox',{name:'Preview page'}).selectOption('public-page');await page.waitForURL('**/preview-design/public-page');assert.equal(await page.locator('[data-workspace-background]').count(),0);
 report.interactions='Search, filter, sort, pagination, retry, local deletion, deletion error, dialogs and focus restoration passed';
 fs.writeFileSync('artifacts/applications-background-review/browser-report.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify({responsiveChecks:report.responsive.length,newAccessibilityViolations:0,baselineViolationTypes:[...new Set(report.accessibility.flatMap(x=>x.baseline.map(v=>v.id)))],errors:report.errors,requests:report.requests,interactions:report.interactions},null,2));
 await browser.close();
})();
