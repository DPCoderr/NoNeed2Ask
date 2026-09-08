const { chromium } = require('C:/Users/dppc2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const report = [];
  const axePath = require.resolve('../../src/frontend/node_modules/axe-core/axe.js');
  try {
    for (const width of [390,768,1440]) {
      const page = await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('https://va.vercel-scripts.com/**', route => route.abort());
      await page.goto('http://localhost:3000/',{waitUntil:'networkidle',timeout:60000});
      await page.addStyleTag({content:'nextjs-portal { display:none !important; }'});
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator('main img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(img => img.decode());
      }
      await page.evaluate(() => window.scrollTo(0,0));
      const layout = await page.evaluate(() => ({
        width:innerWidth, scrollWidth:document.documentElement.scrollWidth,
        h1:document.querySelector('h1').textContent,
        titleTop:document.querySelector('h1').getBoundingClientRect().top,
        navBottom:document.querySelector('header').getBoundingClientRect().bottom,
        images:[...document.querySelectorAll('main img')].map(img => ({alt:img.alt,loaded:img.complete && img.naturalWidth>0})),
        overflow:[...document.querySelectorAll('main *')].filter(el => {const r=el.getBoundingClientRect();return r.width>0 && (r.right>innerWidth+1 || r.left<-1)}).map(el => el.tagName+'.'+el.className).slice(0,10),
      }));
      assert.equal(layout.scrollWidth,width,'Horizontal overflow');
      assert.equal(layout.overflow.length,0,'Overflowing elements');
      assert.ok(layout.titleTop>layout.navBottom,'Hero covered by navbar');
      assert.ok(layout.images.every(img=>img.loaded),'Unloaded image');
      await page.screenshot({path:path.join(__dirname,'landing-'+width+'.png'),fullPage:true});
      if(width===1440) await page.screenshot({path:path.join(__dirname,'landing-desktop-hero.png')});
      const cta=page.getByRole('link',{name:'See what they’ll see'});
      await cta.click();
      await page.waitForURL('**/#public-status');
      const anchorTop=await page.locator('#public-status').evaluate(el=>el.getBoundingClientRect().top);
      assert.ok(anchorTop>=90,'Anchor obscured by navigation');
      if(width<1024) {
        const menu=page.getByRole('button',{name:'Toggle navigation menu'});
        await menu.focus();
        await page.keyboard.press('Enter');
        assert.equal(await menu.getAttribute('aria-expanded'),'true');
        await page.screenshot({path:path.join(__dirname,'landing-mobile-menu.png')});
        await page.keyboard.press('Escape');
        assert.equal(await menu.getAttribute('aria-expanded'),'false');
        assert.ok(await menu.evaluate(el=>el===document.activeElement),'Focus not restored');
        await menu.click();
        await page.getByRole('link',{name:'Private tracker',exact:true}).last().click();
        assert.equal(await menu.getAttribute('aria-expanded'),'false');
        await page.waitForURL('**/#applications');
      }
      await page.addScriptTag({path:axePath});
      const accessibility = await page.evaluate(async () => { const result=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}); return result.violations.map(({id,impact,description,nodes})=>({id,impact,description,targets:nodes.map(node=>node.target)})); });
      assert.deepEqual(accessibility,[],'Accessibility violations');
      assert.deepEqual(errors,[],'Browser errors');
      report.push({...layout,anchorTop,errors,accessibility});
      await page.close();
    }
    await fs.writeFile(path.join(__dirname,'browser-report.json'),JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});



