import { chromium } from 'playwright'
import { รอโค้ดของเว็บติด, เฝ้าข้อผิดพลาด } from './หน้าที่ตรวจ.mjs'
const ฐาน = process.argv[2]
const b = await chromium.launch()
const ctx = await b.newContext()
await เฝ้าข้อผิดพลาด(ctx)
// ทำให้ไฟล์โค้ดตัวหนึ่งค้างที่เครือข่าย ⇒ ตัวช่วยต้องจดว่า "เน็ต"
let ค้าง = false
await ctx.route('**/_nuxt/BuY_tTJP.js', async (r) => { if (ค้าง) await new Promise(() => {}); else r.continue() })
const p = await ctx.newPage()
await p.goto(ฐาน + '/read/GEN?c=1&t=WLC')
await รอโค้ดของเว็บติด(p)
await p.waitForTimeout(3000)
ค้าง = true
await p.evaluate(async () => { for (const c of await caches.keys()) await caches.delete(c) })
const p2 = await ctx.newPage()
await p2.goto(ฐาน + '/read/ISA?c=8&v=23&t=WLC,TCV', { waitUntil: 'domcontentloaded' })
await p2.evaluate(() => { try { null.x } catch {} })
try { await รอโค้ดของเว็บติด(p2); console.log('ติด') } catch (e) { console.log(e.message) }
await b.close()
