import { chromium } from 'playwright'
const b = await chromium.launch(); const c = await b.newBrowserCDPSession(); const p = await b.newPage(); await p.goto('http://127.0.0.1:5498/phrakham/')
console.log(JSON.stringify((await c.send('SystemInfo.getProcessInfo')).processInfo)); console.log((await c.send('Target.getTargets')).targetInfos.map(t=>t.type+':'+t.url).join(' , ')); await b.close()
