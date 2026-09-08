const {chromium}=require('C:/Users/dppc2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try {
  for(const width of [390,768,1440]) {
   const page=await browser.newPage({viewport:{width,height:1100},reducedMotion:'reduce'});
   await page.route('https://va.vercel-scripts.com/**',route=>route.abort());
   await page.goto('http://localhost:3000/',{waitUntil:'networkidle'});
   await page.addStyleTag({content:'nextjs-portal{display:none!important}'});
   await page.locator('#dashboard').evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+scrollY-130));
   await page.locator('#dashboard').screenshot({path:'artifacts/landing-refresh/workflow-'+width+'.png'});
   await page.close();
  }
 } finally {await browser.close()}
})();
