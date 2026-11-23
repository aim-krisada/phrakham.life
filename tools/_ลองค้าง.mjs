// ชั่วคราว ⇒ เปิดหน้าซ้ำ ๆ ในบริบทเดียว (ท่าเดียวกับด่านลิงก์เลขเดิม) ⇒ นับว่า Vue ไม่ติดกี่ครั้ง
import { chromium } from 'playwright'
import { รอโค้ดของเว็บติด, เฝ้าข้อผิดพลาด } from './หน้าที่ตรวจ.mjs'

const ฐาน = process.argv[2] || 'http://127.0.0.1:5496/phrakham'
const รอบ = Number(process.argv[3] || 40)
const คนงาน = Number(process.argv[4] || 4)
const ช้า = Number(process.argv[5] || 1)
const ไม่มีsw = process.argv.includes('--ไม่มีsw')
const หน้า = ['/read/NEH?c=3&v=33&t=WLC', '/read/NEH?c=10&v=1&t=WLC', '/read/ISA?c=8&v=23&t=WLC', '/read/ISA?c=8&v=23&t=WLC,TCV', '/read/DAN?c=6&v=1&t=WLC,TCV', '/read/HOS?c=2&v=1&t=WLC', '/read/JOL?c=4&v=1&t=WLC,TCV', '/read/JON?c=2&v=1&t=WLC', '/read/JON?c=2&v=1&t=WLC,TCV', '/read/GEN?c=32&v=1&t=WLC']

const เบราว์เซอร์ = await chromium.launch()
let ล้ม = 0
let ผ่าน = 0
async function งาน(id) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: ไม่มีsw ? 'block' : 'allow' })
  await เฝ้าข้อผิดพลาด(ctx)
  for (let i = 0; i < รอบ; i++) {
    const แท็บ = await ctx.newPage()
    if (ช้า > 1) {
      const cdp = await ctx.newCDPSession(แท็บ)
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: ช้า })
    }
    const ที่ = หน้า[(i + id) % หน้า.length]
    try {
      await แท็บ.goto(ฐาน + ที่, { waitUntil: 'domcontentloaded' })
      await รอโค้ดของเว็บติด(แท็บ)
      ผ่าน++
    } catch (e) {
      ล้ม++
      console.log(`⛔ คนงาน ${id} รอบ ${i} ${ที่}\n${e.message.split('\n').slice(-1)[0]}`)
    } finally {
      await แท็บ.close()
    }
  }
  await ctx.close()
}
await Promise.all(Array.from({ length: คนงาน }, (_, i) => งาน(i)))
console.log(`ผ่าน ${ผ่าน} ล้ม ${ล้ม}`)
await เบราว์เซอร์.close()
