const { chromium, devices } = require('C:/Users/dppc2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp = require('../../src/frontend/node_modules/sharp');
const fs = require('node:fs/promises');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try {
    const context = await browser.newContext({...devices['iPhone 13'], viewport:{width:390,height:844}, deviceScaleFactor:2});
    const page = await context.newPage();
    for (const [route, name] of [['dashboard','dashboard'], ['applications','applications'], ['public-page','public-status']]) {
      await page.goto('http://localhost:3000/preview-design/' + route,{waitUntil:'networkidle'});
      await page.addStyleTag({content:'nextjs-portal, [aria-label="Design preview controls"] { display: none !important; }'});
      await page.evaluate(() => document.fonts.ready);
      if (route === 'public-page') {
        await page.addStyleTag({content:'html {scroll-behavior:auto!important}'});
        await page.evaluate(() => { const section = document.querySelector('#public-next-title').closest('section'); window.scrollTo(0, section.getBoundingClientRect().top + scrollY - 112); });
      }
      await page.screenshot({path:path.join(__dirname, name + '-mobile.png')});
      await sharp(path.join(__dirname, name + '-mobile.png')).webp({quality:90}).toFile(path.resolve(__dirname,'../../src/frontend/public/landing',name === 'public-status' ? 'public-status-updates-mobile.webp' : name + '-mobile-v2.webp'));
      console.log(name + ': ' + (await page.locator('body').innerText()).slice(0,200));
    }
    await fs.writeFile(path.join(__dirname,'capture-info.json'), JSON.stringify({viewport:{width:390,height:844},deviceScaleFactor:2,device:'iPhone 13',source:'Development preview routes, populated fictional data',publicPageScroll:'Upcoming interview and recent applications, below the summary',hidden:'Preview controls and Next.js development indicator',capturedAt:new Date().toISOString()},null,2));
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});



