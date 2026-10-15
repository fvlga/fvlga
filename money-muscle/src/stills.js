const { chromium } = require(process.env.PW); const path=require('path'), fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--allow-file-access-from-files']});
const p=await b.newPage({viewport:{width:1080,height:1920}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve('render.html'));
await p.waitForFunction(()=>window.A&&document.fonts.check('40px MMDisplay'));
for(const t of process.argv.slice(2).map(Number)){const [d]=await p.evaluate(t=>renderBatch(t,1,30,0.85),t);fs.writeFileSync(`still_${t}.jpg`,Buffer.from(d,'base64'));}
console.log('errors:',errs.length?errs:'none');await b.close();})();
