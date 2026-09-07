const { chromium } = require('C:/Users/dppc2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
 const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, timezoneId: 'Europe/Amsterdam' });
 const errors = [], requests = [];
 page.on('pageerror', e => errors.push(e.message));
 page.on('request', r => { if (r.url().includes('/api/')) requests.push(r.url()); });
 await page.goto('http://localhost:3007/preview-design/public-page', { waitUntil: 'networkidle', timeout: 120000 });
 await page.evaluate(() => document.fonts.ready);
 await page.addStyleTag({content: 'nextjs-portal { display: none; }'});
 await page.addScriptTag({path: 'src/frontend/node_modules/axe-core/axe.min.js'});
 const report = { responsive: [], accessibility: [], errors, requests };
 const scenarios = ['Populated', 'Private', 'Private · signed in', 'Empty', 'No interview', 'Loading', 'Error', 'Not found', 'Long text'];
 for (const width of [320, 390, 540, 640, 768, 900, 1024, 1280, 1440]) {
  await page.setViewportSize({width, height: 1000});
  for (const scenario of scenarios) {
   await page.getByRole('combobox', {name: 'Preview scenario'}).selectOption(scenario);
   const dimensions = await page.evaluate(() => ({viewport: innerWidth, scroll: document.documentElement.scrollWidth}));
   report.responsive.push({width, scenario, ...dimensions});
   assert.ok(dimensions.scroll <= width, `Overflow ${width} ${scenario}: ${dimensions.scroll}`);
   if ([390, 768, 1440].includes(width)) {
    const axe = await page.evaluate(async () => (await axe.run(document, {runOnly: {type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id, impact:v.impact, nodes:v.nodes.map(n=>({html:n.html, summary:n.failureSummary}))})));
    report.accessibility.push({width, scenario, violations: axe});
   }
   if ([390, 768, 1440].includes(width) && ['Populated', 'Private', 'Long text', 'Error', 'Loading', 'Empty'].includes(scenario)) {
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path: `artifacts/public-page-review/${scenario.toLowerCase().replaceAll(' ','-')}-${width}.png`, fullPage:true});
   }
  }
 }
 await page.getByRole('combobox', {name: 'Preview scenario'}).selectOption('Error');
 await page.getByRole('button', {name:'Try again'}).click();
 await page.getByRole('heading', {name:"Alex Morgan's job search"}).waitFor();
 await page.getByRole('button', {name: 'Dismiss preview message'}).click();
 await page.getByRole('link', {name:'Log in', exact:true}).click();
 assert.equal(new URL(page.url()).pathname, '/preview-design/public-page');
 assert.match(await page.getByRole('status').innerText(), /Preview destination: \/login/);
 await page.getByRole('button', {name: 'Dismiss preview message'}).click();


 await page.getByRole('combobox', {name:'Preview page'}).selectOption('applications');
 await page.waitForURL('**/preview-design/applications');
 await page.getByRole('combobox', {name:'Preview page'}).selectOption('public-page');
 await page.waitForURL('**/preview-design/public-page');
 await page.getByRole('link', {name:'Skip to content'}).focus();



 report.keyboard = await page.evaluate(()=>({text:document.activeElement.textContent, outline:getComputedStyle(document.activeElement).boxShadow, bounds:document.activeElement.getBoundingClientRect().toJSON()}));
 await page.keyboard.press('Enter');
 report.skipTarget = await page.evaluate(()=>document.activeElement.id);
 assert.equal(report.skipTarget, 'public-content');
 report.fonts = await page.evaluate(()=>({family:getComputedStyle(document.body).fontFamily,faces:[...document.fonts].map(f=>({family:f.family,status:f.status}))}));
 fs.writeFileSync('artifacts/public-page-review/browser-report.json', JSON.stringify(report,null,2));
 console.log(JSON.stringify({responsiveChecks: report.responsive.length, accessibilityViolations:report.accessibility.filter(a=>a.violations.length), errors, requests, keyboard:report.keyboard, skipTarget:report.skipTarget, interLoaded:report.fonts.faces.some(f=>f.family === 'Inter' && f.status === 'loaded')},null,2));
 await browser.close();
})();
