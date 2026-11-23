import { chromium } from 'playwright'
import { รอโค้ดของเว็บติด, เฝ้าข้อผิดพลาด } from './หน้าที่ตรวจ.mjs'
const ฐาน = process.argv[2]
const b = await chromium.launch()
for (const โยน of [false, true]) {
  const ctx = await b.newContext()
  await เฝ้าข้อผิดพลาด(ctx)
  if (โยน) await ctx.route('**/_nuxt/*.js', async (r) => {
    const res = await r.fetch(); let t = await res.text()
    if (t.includes('.mount(')) t = t.replace(/(\w)\.mount\((\w)\)/, '(()=>{throw new Error("ลองโยนตอน mount")})()')
    await r.fulfill({ response: res, body: t })
  })
  const p = await ctx.newPage()
  await p.goto(ฐาน + '/read/JON?c=2&v=1&t=WLC,TCV', { waitUntil: 'domcontentloaded' })
  try { await รอโค้ดของเว็บติด(p); console.log(โยน, "ติด", await p.evaluate(() => JSON.stringify([window.__pkข้อผิดพลาดแอป, window.__pkขั้นเริ่ม]))) }
  catch (e) { console.log(โยน, e.message.split('\n').pop()) }
  await ctx.close()
}
await b.close()
