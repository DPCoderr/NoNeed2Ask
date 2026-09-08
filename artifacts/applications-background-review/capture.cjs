const {chromium}=require('C:/Users/dppc2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
await page.goto('http://localhost:3007/preview-design/applications',{waitUntil:'networkidle',timeout:120000});
await page.addStyleTag({content:'nextjs-portal{display:none}'});
await page.screenshot({path:'artifacts/applications-background-review/desktop.png'});
await page.setViewportSize({width:390,height:1000});
await page.screenshot({path:'artifacts/applications-background-review/mobile.png'});
await browser.close();
})();
