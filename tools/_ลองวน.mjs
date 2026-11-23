import { chromium } from 'playwright'
import { รอโค้ดของเว็บติด, เฝ้าข้อผิดพลาด } from './หน้าที่ตรวจ.mjs'
const ฐาน = process.argv[2]
const b = await chromium.launch()
const ctx = await b.newContext()
await เฝ้าข้อผิดพลาด(ctx)
await ctx.route('**/_nuxt/*.js', async (r) => {
  const res = await r.fetch(); let t = await res.text()
  if (t.includes('.mount(')) t = t.replace(/(\w)\.mount\((\w)\)/, '(function วนรอ(){const s=Date.now();while(Date.now()-s<120000){}})(),$1.mount($2)')
  await r.fulfill({ response: res, body: t })
})
const p = await ctx.newPage()
const t0 = Date.now()
await p.goto(ฐาน + '/read/JON?c=2&v=1&t=WLC,TCV', { waitUntil: 'commit' })
try { await รอโค้ดของเว็บติด(p); console.log('ติด') } catch (e) { console.log(e.message.split('\n').pop().slice(0, 900)) }
console.log('ใช้', Date.now() - t0, 'ms'); const tc = Date.now(); await p.close(); console.log('ปิดใช้', Date.now() - tc, 'ms')
await b.close()
