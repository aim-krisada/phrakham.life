import { chromium } from 'playwright'
import { เฝ้าข้อผิดพลาด } from './หน้าที่ตรวจ.mjs'
const ฐาน = process.argv[2]
const รอบ = Number(process.argv[3] || 40)
const คนงาน = Number(process.argv[4] || 8)
const หน้า = ['/read/NEH?c=3&v=33&t=WLC', '/read/NEH?c=10&v=1&t=WLC', '/read/ISA?c=8&v=23&t=WLC', '/read/ISA?c=8&v=23&t=WLC,TCV', '/read/DAN?c=6&v=1&t=WLC,TCV', '/read/HOS?c=2&v=1&t=WLC', '/read/JOL?c=4&v=1&t=WLC,TCV', '/read/JON?c=2&v=1&t=WLC', '/read/JON?c=2&v=1&t=WLC,TCV', '/read/GEN?c=32&v=1&t=WLC', '/read/PSA?c=3&t=WLC,TCV', '/read/EST?c=1&t=TCV']
const b = await chromium.launch()
let พบ = 0
async function งาน(id) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } })
  await เฝ้าข้อผิดพลาด(ctx)
  for (let i = 0; i < รอบ && พบ < 3; i++) {
    const ที่ = หน้า[(i * 7 + id) % หน้า.length]
    const ก = await ctx.newPage()
    const cdp = await ctx.newCDPSession(ก)
    await cdp.send('Debugger.enable')
    ก.goto(ฐาน + ที่).catch(() => {})
    const รอ = Math.random() * 1500
    await ก.waitForTimeout(รอ)
    const ตอบ = await Promise.race([ก.evaluate(() => 1).then(() => true, () => true), new Promise((r) => setTimeout(() => r(false), 3000))])
    if (!ตอบ) {
      พบ++
      console.log(`⛔ ${id}/${i} ${ที่} หลังเปิด ${Math.round(รอ)}ms ⇒ หน้าไม่ตอบ 3 วินาที ⇒ หยุดดูโค้ดที่วิ่งอยู่`)
      const หยุด = new Promise((r) => cdp.once('Debugger.paused', r))
      await cdp.send('Debugger.pause')
      const ev = await Promise.race([หยุด, new Promise((r) => setTimeout(() => r(null), 5000))])
      if (!ev) console.log('   หยุดไม่ได้ใน 5 วินาที')
      else for (const f of ev.callFrames.slice(0, 25)) console.log(`   ${f.functionName || '(ไม่มีชื่อ)'} ${f.url.split('/').pop()}:${f.location.lineNumber + 1}:${f.location.columnNumber + 1}`)
      await cdp.send('Debugger.resume').catch(() => {})
    }
    await cdp.detach().catch(() => {})
    const t = Date.now()
    await ก.close()
    if (Date.now() - t > 3000) console.log(`   ${id}/${i} ${ที่} ปิดใช้ ${Date.now() - t}ms`)
  }
  await ctx.close()
}
await Promise.all(Array.from({ length: คนงาน }, (_, i) => งาน(i)))
console.log('จบ พบ', พบ)
await b.close()
