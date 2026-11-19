// ด่านตรวจ — **ข้อที่พาไปต้องเห็นบรรทัดแรกเต็ม ⛔ ไม่ซุกใต้แถบหนึบ** (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/104 ข้อ 14)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// **ทำไมต้องมี** — คนตรวจเปิด `?c=10&v=13` บนเว็บของคำขอรวม !124 ที่จอ 1950×850 (24 ต.ค. 2569)
//   ⇒ แถบบนกับหัวคอลัมน์ที่หนึบอยู่กินถึง y=120 ⇒ **แต่ข้อ 13 ไปเริ่มที่ y=74 ⇒ ถูกบัง 46 จุด**
//   ⇒ ต้นเหตุ ⇒ ตอนพาไปที่ข้อ หน้าอ่านหักแค่ความสูงแถบบน ⇒ ลืมหัวคอลัมน์ที่ใบ #102 ทำให้หนึบบนจอกว้าง
//   ⇒ WCAG 2.2 SC 2.4.11 Focus Not Obscured (Minimum) (ระดับ AA)
//
// **ด่านนี้ตรวจอะไร** — เปิด `มาระโก 10` ข้อ 13 ทุกแบบที่หน้าตาเปลี่ยนความสูงแถบหนึบได้
//   ⇒ จอ 375 · 768 · 1280 · 1950 × ตัวอักษร 100% · 200% × การจัดวาง 3 แบบ × ฉบับเดียวกับ 4 ฉบับ
//   ⇒ รอหน้านิ่ง แล้ววัด **จากของจริงบนจอ** ⛔ ไม่ได้เรียกโค้ดของเว็บมาถาม
//     ① **ขอบบนของข้อที่พาไป ≥ ขอบล่างของทุกของที่หนึบหรือลอยอยู่ด้านบน และทับแนวนอนกับข้อนั้น**
//        ⇒ ด่านหาของหนึบเองจาก `position` ที่เบราว์เซอร์คำนวณ ⇒ ⛔ ไม่ได้จำชื่อคลาสของแถบไว้
//        ⇒ ใครเพิ่มแถบหนึบใหม่วันหลัง ด่านก็นับให้เอง
//     ② **บรรทัดแรกของข้อนั้นจบเหนือแถบล่าง** ⇒ เห็นเต็มบรรทัด ⛔ ไม่ใช่ครึ่งบรรทัด
//   ⇒ ⛔ **ด่าน ⛔ ไม่มีตัวเลขเผื่อ** ⇒ ยอมให้ต่างได้ 0.5 จุดจากการปัดเศษของเบราว์เซอร์เท่านั้น
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านข้อที่พาไปไม่ถูกบัง.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพัง ⇒ **เลื่อนหน้าไปเท่าความสูงหัวคอลัมน์ที่หนึบอยู่** ⇒ คือตำแหน่งเป๊ะที่โค้ดของ !124 พาไป
//     (โค้ดเดิมหักแค่แถบบน ⇒ ต่างจากของใหม่เท่าความสูงหัวคอลัมน์พอดี) ⇒ ⛔ ไม่ใช่ของที่แต่งให้ด่านจับง่าย
//     ⇒ **ด่านต้องจับได้ที่จอกว้าง** ⇒ จอแคบหัวคอลัมน์ ⛔ ไม่หนึบ ⇒ ของพังชิ้นนี้ไม่ขยับอะไร ⇒ ถูกต้องแล้ว
//
//   node tools/ด่านข้อที่พาไปไม่ถูกบัง.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import { เส้นทางเว็บ } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')

/** ⭐ ที่อยู่ที่คนตรวจใช้เจอของพังเอง */
const ที่พาไป = { ที่อยู่: '/read/MRK?c=10&v=13', ข้อ: '10:13' }

const จอ = [
  { กว้าง: 375, สูง: 812 },
  { กว้าง: 768, สูง: 1024 },
  { กว้าง: 1280, สูง: 900 },
  // ⭐ จอที่คนตรวจใช้เจอของพัง
  { กว้าง: 1950, สูง: 850 },
]
const ตัวอักษร = ['1', '2']
const การจัดวาง = ['แยกตามข้อ', 'ไหลต่อเนื่อง', 'แยกตามย่อหน้า']
const ชุดฉบับ = [['TCV'], ['TCV', 'THKJV', 'WEB', 'LSV']]

/** ทุกกรณี ⇒ ฉบับเดียวครบทุกแบบ · 4 ฉบับ (หัวคอลัมน์ห่อได้หลายแถว) ที่จอ 768 ขึ้นไปกับการจัดวางตั้งต้น */
const กรณี = []
for (const ด of จอ)
  for (const fs of ตัวอักษร) {
    for (const จัด of การจัดวาง) กรณี.push({ ...ด, fs, จัด, ฉบับ: ชุดฉบับ[0] })
    if (ด.กว้าง >= 768) กรณี.push({ ...ด, fs, จัด: 'แยกตามข้อ', ฉบับ: ชุดฉบับ[1] })
  }

const เบราว์เซอร์ = await chromium.launch()

/** วัดในจังหวะเดียว ⇒ ข้อที่พาไป · ของหนึบทุกชิ้นที่ทับแนวนอนกับมัน · แถบล่าง */
const วัด = (แท็บ, ข้อ) =>
  แท็บ.evaluate((ข้อ) => {
    const el = [...document.querySelectorAll(`.pk-ตัวบท [data-ข้อ="${ข้อ}"]`)].find((x) => x.getClientRects().length)
    if (!el) return null
    // ⭐ **บรรทัดแรกจริง** ⇒ วัดจากตัวอักษรตัวแรกที่ตาเห็นในข้อ ⛔ ไม่ใช่กล่องทั้งข้อ
    //   ⇒ แบบ *แยกตามข้อ* หลายฉบับ ข้อหนึ่งเป็นกล่องสูงหลายแถว ⇒ กล่องแรกของมันคือทั้งกล่อง ⛔ ไม่ใช่บรรทัด
    const เดิน = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.textContent.trim() && n.parentElement?.getClientRects().length ? 1 : 3),
    })
    const ตัวแรก = เดิน.nextNode()
    let บรรทัดแรก = el.getClientRects()[0]
    if (ตัวแรก) {
      const ช่วง = document.createRange()
      const i = ตัวแรก.textContent.search(/\S/)
      ช่วง.setStart(ตัวแรก, i)
      ช่วง.setEnd(ตัวแรก, i + 1)
      const r = ช่วง.getClientRects()[0]
      // ⭐ ขอบซ้ายขวาเอาของทั้งข้อ ⇒ ของหนึบที่ทับส่วนไหนของข้อก็นับ ⇒ ขอบบนล่างเอาของบรรทัดแรก
      if (r) บรรทัดแรก = { top: r.top, bottom: r.bottom, left: el.getClientRects()[0].left, right: el.getClientRects()[0].right }
    }
    let ล่างสุด = 0
    let ตัวบัง = ''
    for (const x of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(x)
      if (cs.position !== 'sticky' && cs.position !== 'fixed') continue
      // ⭐ เฉพาะของที่เกาะขอบบน ⇒ แถบล่างกับการ์ดเกาะขอบล่าง (`top: auto`)
      if (cs.top === 'auto' || cs.display === 'none' || cs.visibility === 'hidden') continue
      const q = x.getBoundingClientRect()
      if (!q.width || !q.height) continue
      if (q.right <= บรรทัดแรก.left || q.left >= บรรทัดแรก.right) continue
      // ของที่เริ่มต่ำกว่าข้อ ⇒ ⛔ ไม่ได้บังบรรทัดแรก (เช่น คอลัมน์ตอนเทียบที่ห่อลงไปข้างล่าง)
      if (q.top > บรรทัดแรก.top) continue
      if (q.bottom > ล่างสุด) {
        ล่างสุด = q.bottom
        ตัวบัง = (x.className || x.tagName).toString().split(' ').filter((c) => c.startsWith('pk-')).join('.') || x.tagName
      }
    }
    const ล่าง = document.querySelector('.pk-แถบล่าง')
    const ขอบแถบล่าง = ล่าง ? ล่าง.getBoundingClientRect().top : window.innerHeight
    return {
      บน: บรรทัดแรก.top,
      ล่างบรรทัด: บรรทัดแรก.bottom,
      ล่างสุดของแถบหนึบ: ล่างสุด,
      ตัวบัง,
      ขอบแถบล่าง,
      หัวหนึบ: (() => {
        const h = document.querySelector('.pk-หัวคอลัมน์')
        return h && getComputedStyle(h).position === 'sticky' ? h.getBoundingClientRect().height : 0
      })(),
    }
  }, ข้อ)

async function ตรวจกรณี(ก, พัง) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: ก.กว้าง, height: ก.สูง } })
  await ctx.addInitScript(
    ([ฉบับ, fs, จัด]) => {
      localStorage.setItem('phrakham.versions', JSON.stringify(ฉบับ))
      localStorage.setItem('pk-fs', fs)
      localStorage.setItem('phrakham.view', JSON.stringify({ จัดวาง: จัด }))
    },
    [ก.ฉบับ, ก.fs, ก.จัด],
  )
  const แท็บ = await ctx.newPage()
  const ชื่อ = `จอ ${ก.กว้าง}×${ก.สูง} · ตัวอักษร ${Number(ก.fs) * 100}% · ${ก.จัด} · ${ก.ฉบับ.length} ฉบับ`
  try {
    await แท็บ.goto(`${ฐาน}${ที่พาไป.ที่อยู่}`, { waitUntil: 'domcontentloaded' })
    await แท็บ.waitForFunction(() => document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
    await แท็บ.waitForSelector(`.pk-ตัวบท [data-ข้อ="${ที่พาไป.ข้อ}"]`, { timeout: 20000 })
    // ⭐ รอจนที่เลื่อนนิ่ง 3 รอบติด ⇒ หน้าพาไปที่ข้อแล้ว และ ⛔ ไม่มีการเลื่อนตามมาอีก
    let ก่อน = -1
    let นิ่ง = 0
    const เส้นตาย = Date.now() + 10000
    while (นิ่ง < 3 && Date.now() < เส้นตาย) {
      await แท็บ.waitForTimeout(250)
      const y = await แท็บ.evaluate(() => window.scrollY)
      นิ่ง = y === ก่อน ? นิ่ง + 1 : 0
      ก่อน = y
    }
    if (พัง) {
      // ⭐ ตำแหน่งที่โค้ดของ !124 พาไป ⇒ หักแค่แถบบน ⇒ ต่างจากของใหม่เท่าความสูงหัวคอลัมน์ที่หนึบ
      const หัว = (await วัด(แท็บ, ที่พาไป.ข้อ))?.หัวหนึบ || 0
      if (หัว) await แท็บ.evaluate((h) => window.scrollBy(0, h), หัว)
      await แท็บ.waitForTimeout(200)
    }
    const ค่า = await วัด(แท็บ, ที่พาไป.ข้อ)
    if (!ค่า) return { ชื่อ, ตก: [`① ${ชื่อ} ⇒ ⛔ ไม่เจอข้อ ${ที่พาไป.ข้อ} ที่ตาเห็น`] }
    const ตก = []
    if (ค่า.บน < ค่า.ล่างสุดของแถบหนึบ - 0.5)
      ตก.push(
        `① ${ชื่อ} ⇒ ข้อ ${ที่พาไป.ข้อ} เริ่มที่ y=${ค่า.บน.toFixed(1)} แต่ ${ค่า.ตัวบัง} หนึบลงมาถึง y=${ค่า.ล่างสุดของแถบหนึบ.toFixed(1)} ⇒ ถูกบัง ${(ค่า.ล่างสุดของแถบหนึบ - ค่า.บน).toFixed(1)} จุด (WCAG 2.2 SC 2.4.11)`,
      )
    if (ค่า.ล่างบรรทัด > ค่า.ขอบแถบล่าง + 0.5)
      ตก.push(`② ${ชื่อ} ⇒ บรรทัดแรกของข้อ ${ที่พาไป.ข้อ} จบที่ y=${ค่า.ล่างบรรทัด.toFixed(1)} ต่ำกว่าขอบแถบล่าง y=${ค่า.ขอบแถบล่าง.toFixed(1)}`)
    return { ชื่อ, ตก, ค่า }
  } catch (e) {
    return { ชื่อ, ตก: [`① ${ชื่อ} ⇒ ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`] }
  } finally {
    await ctx.close()
  }
}

async function ตรวจทั้งหมด(พัง) {
  const ตก = []
  for (const ก of กรณี) {
    const ผล = await ตรวจกรณี(ก, พัง)
    ตก.push(...ผล.ตก)
    if (!พัง && !ผล.ตก.length)
      console.log(
        `  ${ผล.ชื่อ} ⇒ ข้อเริ่ม y=${ผล.ค่า.บน.toFixed(1)} · แถบหนึบจบ y=${ผล.ค่า.ล่างสุดของแถบหนึบ.toFixed(1)} (${ผล.ค่า.ตัวบัง || '-'}) · ห่าง ${(ผล.ค่า.บน - ผล.ค่า.ล่างสุดของแถบหนึบ).toFixed(1)} จุด`,
      )
  }
  return ตก
}

const ที่ตก = await ตรวจทั้งหมด(false)
let พลาด = ที่ตก.length > 0
if (พลาด) {
  console.error(`\n⛔ ข้อที่พาไปถูกแถบหนึบบัง — ${ที่ตก.length} รายการ:`)
  for (const x of ที่ตก) console.error('  - ' + x)
}

if (ทดสอบตัวเอง && !พลาด) {
  const จับ = (await ตรวจทั้งหมด(true)).filter((x) => x.startsWith('①'))
  if (!จับ.length) {
    console.error('⛔ โหมดพิสูจน์: เลื่อนกลับไปตำแหน่งของ !124 แล้ว **ด่านยังเขียว** ⇒ ด่านตายแล้ว')
    พลาด = true
  } else console.log(`✅ โหมดพิสูจน์: ยัดตำแหน่งของ !124 ⇒ ข้อ ① แดง ${จับ.length} กรณี ⇒ เช่น ${จับ[0]}`)
}

await เบราว์เซอร์.close()
if (พลาด) process.exit(1)
if (!ทดสอบตัวเอง) console.log(`\n✅ ข้อที่พาไปเห็นบรรทัดแรกเต็มใต้แถบหนึบทุกแถบ ครบ ${กรณี.length} กรณี`)
