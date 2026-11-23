import { chromium } from 'playwright'
const ฐาน = process.argv[2]
const b = await chromium.launch()
const ctx = await b.newContext()
const p = await ctx.newPage()
const t0 = Date.now()
ctx.on('request', (r) => console.log(`${Date.now() - t0}ms ${r.serviceWorker() ? 'SW ' : ''}${r.resourceType()} ${decodeURIComponent(r.url()).replace(ฐาน, '')}`))
for (const ที่ of ['/read/GEN?c=32&v=1&t=WLC', '/read/ISA?c=8&v=23&t=WLC,TCV']) {
  console.log('==== ', ที่)
  const pp = ที่.startsWith('/read/GEN') ? p : await ctx.newPage()
  await pp.goto(ฐาน + ที่)
  await pp.waitForFunction(() => !!document.querySelector('.pk-แถบเครื่องมือ a[aria-haspopup="dialog"]'))
  await pp.waitForTimeout(3000)
}
await b.close()
