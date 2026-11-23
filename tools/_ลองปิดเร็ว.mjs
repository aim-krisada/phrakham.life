import { chromium } from 'playwright'
import { รอโค้ดของเว็บติด, เฝ้าข้อผิดพลาด } from './หน้าที่ตรวจ.mjs'
const ฐาน = process.argv[2]
const รอบ = Number(process.argv[3] || 50)
const คนงาน = Number(process.argv[4] || 6)
const หน้า = ['/read/NEH?c=3&v=33&t=WLC', '/read/NEH?c=10&v=1&t=WLC', '/read/ISA?c=8&v=23&t=WLC', '/read/ISA?c=8&v=23&t=WLC,TCV', '/read/DAN?c=6&v=1&t=WLC,TCV', '/read/HOS?c=2&v=1&t=WLC', '/read/JOL?c=4&v=1&t=WLC,TCV', '/read/JON?c=2&v=1&t=WLC', '/read/JON?c=2&v=1&t=WLC,TCV', '/read/GEN?c=32&v=1&t=WLC', '/read/PSA?c=3&t=WLC,TCV', '/read/EST?c=1&t=TCV']
const b = await chromium.launch()
const bcdp = await b.newBrowserCDPSession()
async function ส่องเบราว์เซอร์(ป้าย) {
  try {
    const { targetInfos } = await bcdp.send('Target.getTargets')
    const { processInfo } = await bcdp.send('SystemInfo.getProcessInfo')
    console.log(`   🔎 ${ป้าย} เป้า ${targetInfos.map((t) => `${t.type}:${t.attached ? 'A' : '-'}:${decodeURIComponent(t.url).replace(ฐาน, '').slice(0, 40)}`).join(' , ')}`)
    console.log(`   🔎 ${ป้าย} ซีพียู ${processInfo.map((x) => `${x.type}#${x.id}=${x.cpuTime.toFixed(1)}s`).join(' ')}`)
  } catch (e) { console.log('   ส่องไม่ได้', e.message) }
}
let ล้ม = 0, ผ่าน = 0
async function งาน(id) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } })
  await เฝ้าข้อผิดพลาด(ctx)
  for (let i = 0; i < รอบ; i++) {
    const t = Date.now(); const จด = (x) => console.log(`${id}/${i} ${x} ${Date.now() - t}ms`)
    const ก = await ctx.newPage(); จด('เปิดก')
    const ที่ก = หน้า[(i * 7 + id) % หน้า.length]
    const cdp = await ctx.newCDPSession(ก)
    await cdp.send('Debugger.enable')
    ก.goto(ฐาน + ที่ก).catch(() => {})
    await ก.waitForTimeout(Math.random() * 1500)
    const ตอบ = await Promise.race([ก.evaluate(() => 1).then(() => true, () => true), new Promise((r) => setTimeout(() => r(false), 3000))])
    if (!ตอบ) {
      console.log(`⛔ หน้า ก ${id}/${i} ${ที่ก} ไม่ตอบ 3 วินาที ⇒ หยุดดูโค้ด`)
      const หยุด = new Promise((r) => cdp.once('Debugger.paused', r))
      await cdp.send('Debugger.pause').catch((e) => console.log('pause', e.message))
      const ev = await Promise.race([หยุด, new Promise((r) => setTimeout(() => r(null), 5000))])
      if (!ev) console.log('   หยุดไม่ได้ใน 5 วินาที')
      else for (const f of ev.callFrames.slice(0, 30)) console.log(`   ${f.functionName || '(ไม่มีชื่อ)'} ${f.url.split('/').pop()}:${f.location.lineNumber + 1}:${f.location.columnNumber + 1}`)
      await cdp.send('Debugger.resume').catch(() => {})
    }
    await cdp.detach().catch(() => {})
    let เฝ้า = setTimeout(async function ซ้ำ() { await ส่องเบราว์เซอร์(`${id}/${i} ${ที่ก} ปิดยังไม่เสร็จ ${Date.now() - t}ms`); เฝ้า = setTimeout(ซ้ำ, 20000) }, 10000)
    await ก.close(); clearTimeout(เฝ้า); จด('ปิดก')
    const ข = await ctx.newPage()
    const ที่ = หน้า[(i + id) % หน้า.length]
    try {
      await ข.goto(ฐาน + ที่, { waitUntil: 'domcontentloaded' })
      await รอโค้ดของเว็บติด(ข)
      ผ่าน++; จด('ติด')
    } catch (e) {
      ล้ม++
      console.log(`⛔ ${id}/${i} ${ที่}\n${e.message.split('\n').slice(-1)[0]}`)
    } finally {
      await ข.close()
    }
  }
  await ctx.close()
}
await Promise.all(Array.from({ length: คนงาน }, (_, i) => งาน(i)))
console.log(`ผ่าน ${ผ่าน} ล้ม ${ล้ม}`)
await b.close()
