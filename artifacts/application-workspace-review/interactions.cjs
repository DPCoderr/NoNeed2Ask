const {chromium}=require('C:/Users/dppc2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');const assert=require('node:assert/strict');
(async()=>{
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const p=await b.newPage({viewport:{width:390,height:844}});const requests=[];p.on('request',r=>{if(r.url().includes('/api/'))requests.push(r.url())});
for(const mode of ['create','update']){
await p.goto('http://localhost:3007/preview-design/application-'+mode,{waitUntil:'networkidle'});
await p.addStyleTag({content:'nextjs-portal{display:none}'});
if(mode==='create'){
await p.getByRole('button',{name:'Next',exact:true}).click();await p.getByText('Company name is required.',{exact:true}).waitFor();
await p.getByLabel('Company name',{exact:true}).fill('Review Company');await p.getByLabel('Role',{exact:true}).fill('Product Designer');
}
for(let i=0;i<2;i++) await p.getByRole('button',{name:'Next',exact:true}).click();
await p.screenshot({path:'artifacts/application-workspace-review/'+mode+'-dates-mobile.png'});
while(await p.getByRole('button',{name:'Next',exact:true}).count()) await p.getByRole('button',{name:'Next',exact:true}).click();await p.getByLabel('Private note',{exact:true}).fill('Local preview only');
const label=mode==='create'?'Create application':'Save changes';
await p.getByRole('button',{name:label,exact:true}).click();const d=p.getByRole('alertdialog');await d.waitFor();await p.screenshot({path:'artifacts/application-workspace-review/'+mode+'-confirmation-mobile.png'});await d.getByRole('button',{name:label,exact:true}).click();await p.getByRole('status').filter({hasText:'saved locally'}).waitFor();
await p.getByRole('button',{name:'Dismiss preview message'}).click();
await p.getByRole('combobox',{name:'Preview scenario'}).selectOption('Save error');
if(mode==='create'){await p.getByLabel('Company name',{exact:true}).fill('Error Company');await p.getByLabel('Role',{exact:true}).fill('Designer');}
while(await p.getByRole('button',{name:'Next',exact:true}).count()) await p.getByRole('button',{name:'Next',exact:true}).click();await p.getByRole('button',{name:label,exact:true}).click();await p.getByRole('alertdialog').getByRole('button',{name:label,exact:true}).click();await p.getByText(/We could not (create|update) this application/).waitFor();
}
assert.deepEqual(requests,[]);console.log('Create/update: validation, dates, notes, confirmation, local save and error state passed; no API requests.');await b.close();
})();
