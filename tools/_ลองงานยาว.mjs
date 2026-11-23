import { chromium } from 'playwright'
const ฐาน = process.argv[2]
const ที่ = process.argv[3]
const ปิดที่ = Number(process.argv[4] || 0)
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } })
await ctx.addInitScript(() => {
  window.__งานยาว = []
  new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__งานยาว.push([Math.round(e.startTime), Math.round(e.duration)]) }).observe({ type: 'longtask', buffered: true })
})
const p = await ctx.newPage()
const t = Date.now()
p.goto(ฐาน + ที่).catch((e) => console.log('goto', e.message.split('\n')[0]))
if (ปิดที่) {
  await p.waitForTimeout(ปิดที่)
  const t2 = Date.now()
  await p.close()
  console.log('ปิดใช้', Date.now() - t2, 'ms')
} else {
  await p.waitForTimeout(8000)
  console.log(await p.evaluate(() => JSON.stringify(window.__งานยาว)))
}
await b.close()
