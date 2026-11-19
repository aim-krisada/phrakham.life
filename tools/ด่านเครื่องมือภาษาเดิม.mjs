// ด่านตรวจ — **เครื่องมือคำภาษาเดิมอยู่ใกล้มือตลอด ⇒ ปุ่มรูปเฟืองบนหัวคอลัมน์ภาษาเดิมทุกจอ**
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/151 (m1.wpa.24.us10)
//   ⚠️ **เปลี่ยนตามใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/154 (m1.wpa.24.us12)**
//     ⇒ ของเดิม ⇒ มือถือเปิดจากหมวดในหน้า Aa · จอกว้างกางพับแถวจากปุ่ม *เครื่องมือ* ▾ ⇒ ถอดทั้งสองที่แล้ว
//     ⇒ ตอนนี้ ⇒ ปุ่มรูปเฟือง *เครื่องมือภาษาเดิม* บนหัวคอลัมน์ภาษาเดิมทุกจอ ⇒ จอแคบหน้าเต็มจอ · จอกว้างแผงลงมา (กล่องเด้งของใบ #153)
//     ⇒ ⭐ เกณฑ์เดิมทุกข้อยังอยู่ ⇒ เปลี่ยนแค่ที่กดกับของที่วัด ⇒ ข้อไหนเปลี่ยนเกณฑ์ ⇒ มีบรรทัด ⚠️ บอกว่าเปลี่ยนจากอะไร และเข้มกว่าหรือเท่าเดิมยังไง
//     ⇒ รูปแบบกล่องเด้ง × ปุ่มบนหัว และเครดิตในกล่องตัว i ⇒ ด่านใหม่ `tools/ด่านเฟืองกับไอ.mjs` ⛔ ตรวจซ้ำที่นี่
//
// ## ทำไมต้องมี
//   ⇒ คนที่อ่านคำกรีกไปถึงกลางบทอยากเปิดปิดสัญลักษณ์กาล เครื่องหมายช่วยอ่าน คำอธิบายความหมาย
//   ⇒ ⚠️ ของเดิมก่อนใบ #151 ⇒ ปุ่มอยู่แถวใต้หัวคอลัมน์ภาษาเดิมที่เลื่อนหายไปกับต้นบท ⇒ ต้องเลื่อนกลับขึ้นไปบนสุดทุกครั้ง
//
// ## ตรวจอะไร ⇒ กดของจริงบนหน้าที่สร้างเสร็จ ⇒ วัดของที่เบราว์เซอร์วาดจริง ⛔ ไม่ได้ดูว่าโค้ดเขียนอะไร
//   **มือถือ** จอ 320 · 344 · 375
//   ① **ปุ่มเฟืองเปิดหน้าเต็มจอ ⛔ กล่องเล็กเด้ง** ⇒ ซ้าย 0 ขวาเท่าจอ **บน = ขอบล่างของแถบบน** ล่างเท่าจอ (±0.5)
//      ⇒ ของในหน้าเริ่มใต้แถบบน ⇒ ปุ่มบนแถบบนยังเห็นและไม่ถูกทับ ⇒ ปุ่มเฟืองบอก `aria-expanded=true`
//      ⇒ ของกดได้ทุกชิ้นในหน้าห่างขอบจอซ้ายขวาอย่างน้อย 16 จุด ⇒ หน้า ⛔ เลื่อนด้านข้างในตัวเอง (SC 1.4.10)
//      ⇒ ⚠️ ของเดิม ⇒ หน้านี้คือหน้า Aa ⇒ ตอนนี้ตรวจทั้งสองหน้า ⇒ หน้า Aa ⇒ ของเดิมอยู่ครบ (ใบ #151 เกณฑ์ข้อ 1.4) **และ ⛔ มีหมวดเครื่องมือภาษาเดิมแล้ว**
//   ② **ของในหน้า เฉพาะตอนเปิดคอลัมน์ภาษาเดิม** ⇒ กลุ่มที่ได้ยินชื่อ *เครื่องมือภาษาเดิม* (หัวที่ตาเห็นคำเดียวกัน)
//      ⇒ ข้างในเรียง สัญลักษณ์กาล · เครื่องหมายช่วยอ่าน ⇒ ช่องติ๊ก 8 กลุ่มเห็นอยู่ในหน้าเลย ⛔ ต้องกดกางก่อน ⇒ หัวกลุ่มตาเห็น ⇒ ทุกช่องสูง 44
//      ⇒ ⚠️ ของเดิม ⇒ ปุ่ม *ความหมาย* ▾ อยู่ท้ายหมวด ⇒ ย้ายไปปุ่มตัว i ⇒ ตอนนี้ ⇒ กด i แล้วคำอธิบายกาลขึ้น · `aria-expanded` · `aria-controls` ชี้กล่อง
//      ⇒ ปิดคอลัมน์ภาษาเดิม ⇒ ⛔ มีปุ่มเฟือง
//   ③ **ปุ่ม × มุมขวาบน** (ใบ #153) ⇒ เป็นของกดได้ชิ้นแรกในหน้า ⇒ ได้ยิน *ปิด* ⇒ ⛔ มีปุ่ม *กลับไปอ่าน*
//      ⇒ อ่านข้อ 2:12 ค้างไว้ ⇒ เปิดหน้า ⇒ ปิดสัญลักษณ์กาลกับเลือกเครื่องหมายทั้งหมด ⇒ หน้าข้างหลังเลื่อนไป 400 จุด
//      ⇒ กด × ⇒ หน้าปิด ⇒ โฟกัสกลับปุ่มเฟือง ⇒ ข้อ 2:12 อยู่ระดับเดิมบนจอ ±2 จุด
//      ⇒ ⚠️ ของเดิม ⇒ ขยายตัวอักษรในหน้า Aa ให้ตัวบทจัดใหม่ ⇒ หน้าเฟือง ⛔ มีปุ่มขนาด ⇒ ตัวยึดของหน้าถือข้อไว้ระหว่างคำกรีกจัดแถวใหม่อยู่แล้ว
//        ⇒ ข้อจึงต้องขยับจริงด้วยการเลื่อนหน้าข้างหลัง ⇒ ⛔ ขยับ ⇒ แดง (ข้อนี้ไม่ได้ทดสอบอะไร) ⇒ เข้มกว่าเดิม
//   **จอกว้าง** จอ 768 · 860 · 1280
//   ④ **ปุ่มเฟืองบนหัวคอลัมน์ภาษาเดิม** ⇒ ได้ยิน *เครื่องมือภาษาเดิม* ⇒ ⚠️ ของเดิมตาเห็น *เครื่องมือ* ⇒ ตอนนี้รูปอย่างเดียว ⇒ ⛔ มีคำบนจอ (ใบ #154 เกณฑ์ข้อ 6) ⇒ ⚠️ ใบ #155 ⇒ จอตั้งแต่ 1100 ตาเห็น *เครื่องมือ* ข้างรูปคำเดียว
//      ⇒ `aria-expanded=false` ตอนเปิดหน้า ⇒ ไม่น้อยกว่า 44 × 44 จุด ⇒ อยู่ในจอครบ ⇒ หัวยังแถวเดียว (เส้นกลางของปุ่มทุกตัวในหัวตรงกัน)
//      ⇒ ⚠️ ส่วนเพิ่มของใบ #151 (ตั้งต้นกาง จำค่าพับ) ⇒ ตอนนี้กล่องเด้งปิดอยู่ก่อนเสมอ ⇒ ท่าเดียวกับ Aa · เทียบ ⇒ เปิดหน้ามาต้อง ⛔ มีกล่อง
//      ⇒ ⛔ มีปุ่มที่ได้ยิน *เครื่องมือ* ของใบ #151
//   ⑤ **กดแล้วเปิด กดอีกทีปิด** ⇒ `aria-expanded` true · `aria-controls` ชี้กล่องที่มีสัญลักษณ์กาลกับช่องติ๊ก 8 ช่อง ⇒ กล่องอยู่ใต้หัว ห่างขอบจอ 16 จุด
//      ⇒ ⚠️ ของเดิม ⇒ ลูกศรกลับหัว ⇒ ตอนนี้ปุ่มเปลี่ยนสี (พื้นเข้ม) ตอนเปิด ⇒ ตาเห็นสถานะเหมือนเดิม
//      ⇒ เปิดแล้วหัวสูงเท่าเดิม · ตัวบทอยู่ที่เดิม (ลอย ⛔ ดัน) ⇒ กดอีกทีกล่องหายและ `false` ⇒ สีกลับเหมือนเดิม
//   ⑥ **กล่องที่เปิดติดจอไปกับหัว** ⇒ เปิดกล่องแล้วเลื่อนลง 2000 จุด ⇒ หัวหนึบใต้แถบบน ⇒ กล่องยังอยู่ใต้แถบหัวพอดี ⇒ ช่องติ๊กกดได้
//   ⑦ **แป้นพิมพ์** ⇒ Enter ที่ปุ่มเฟือง ⇒ Tab ครั้งเดียวเข้ากล่อง (⚠️ ของเดิมยอม 2 ครั้ง) ⇒ Escape ⇒ ปิดและโฟกัสกลับปุ่ม ⇒ เว้นวรรคเปิดอีกที
//   ⑧ **สวิตช์ทำงานและจำค่า** (ใบ #154 เกณฑ์ข้อ 5) ⇒ กดสัญลักษณ์กาลในกล่อง ⇒ คำกรีกเปลี่ยนจริง ⇒ โหลดหน้าใหม่ ⇒ ค่ายังอยู่ ⇒ กล่องปิดอยู่
//      ⇒ หดจอเป็น 375 ⇒ หน้าเต็มจอของปุ่มเฟืองบอกค่าเดียวกัน
//   ⑨ **ฮีบรู ⇒ ปุ่มเฟืองมีสวิตช์ตัวเดิมอย่างเดียว** (พี่เอมขอ 17 พ.ย. 2569 ⇒ สวิตช์ *แสดงตัวอักษรกรีก/ฮีบรู* ย้ายจาก Aa มาที่เฟือง)
//      ⇒ ⛔ มีปุ่มตัว i ⇒ ในกล่อง ⛔ มีสัญลักษณ์กาลหรือเครื่องหมายช่วยอ่าน (ฮีบรูยังไม่มีข้อมูล ⇒ ⛔ มีปุ่มที่กดแล้วไม่เกิดอะไร) ⇒ หน้า Aa ⛔ มีหมวด
//      ⇒ ⚠️ ของเดิม (ใบ #154) ⇒ ฮีบรู ⛔ มีปุ่มเฟืองเลย ⇒ ตอนนั้นยังไม่มีอะไรให้คุม ⇒ สวิตช์ทำงานจริงไหม ⇒ เจ้าของคือ `tools/ด่านซ่อนตัวเดิม.mjs` ข้อ ⑧
//   ⑩ **ปุ่ม *เลือกทั้งหมด* · *ล้างทั้งหมด*** ⇒ จอ 375 (หน้าเต็มจอ) · 1280 (แผงลงมา)
//      ⇒ ชื่อที่ได้ยินตรงถ้อยคำที่อนุมัติ ⇒ 44 × 44 จุด ⇒ Enter ที่ *ล้างทั้งหมด* ⇒ ช่องติ๊กทั้ง 8 ว่าง ⇒ เว้นวรรคที่ *เลือกทั้งหมด* ⇒ ติ๊กครบ 8
//      ⇒ โหลดหน้าใหม่แล้วค่าที่กดยังอยู่ (จำค่าเหมือนติ๊กทีละช่อง)
//   ทุกจอ ⇒ หน้า ⛔ เลื่อนด้านข้าง
//
// ⚠️ **ด่านนี้ ⛔ ได้ตรวจ** ⇒ ปุ่มในกล่องนิ่ง · ✓ · ชื่อ · ระยะหมุดบทถึงข้อแรก ⇒ เจ้าของคือ `tools/ด่านแถวปุ่มคำเดิม.mjs`
//
// ## วิธีพิสูจน์ว่าด่านนี้แดงได้จริง ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านเครื่องมือภาษาเดิม.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง [--ชุด=1|2]
//
//   ⇒ ยัดของพังทีละชิ้น (`ของพัง`) ⇒ แต่ละชิ้นต้องทำให้ข้อของมันแดง ⇒ ⛔ แดงด้วยข้อที่คู่กัน = ด่านตายแล้ว
//   ⇒ `--ชุด` แบ่งท่าเป็น 2 งานในท่อ ⇒ ท่าเดียวกับ `tools/ด่านหัวติดด้านบนจอแคบ.mjs` ⇒ งานละ ⛔ เกินเพดาน 10 นาที
//
//   node tools/ด่านเครื่องมือภาษาเดิม.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import {
  เส้นทางเว็บ,
  กางแผงAa,
  ชื่อปุ่มเครื่องมือ,
  ชื่อปุ่มคำอธิบาย,
  ตาเห็นปุ่มเครื่องมือเดิม,
  หัวหมวดเครื่องมือเดิม,
  ชื่อปุ่มกลับไปอ่านเดิม,
  ชื่อปุ่มปิดกล่อง,
  ชื่อปุ่มเลือกทั้งหมด,
  ชื่อปุ่มล้างทั้งหมด,
  กล่องเครื่องมือ,
  กางเครื่องมือภาษาเดิม,
  พับเครื่องมือภาษาเดิม,
  คำข้างรูป,
  คำที่ควรเห็น,
} from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const ชุดที่ขอ = Number((process.argv.find((x) => x.startsWith('--ชุด=')) || '').split('=')[1] || 0)
const รอนานสุด = 30000
const ที่ตก = []
const เผื่อขอบ = 16
const ปุ่มเครื่องมือ = '[data-ปุ่ม="เครื่องมือภาษาเดิม"]'
const ปุ่มคำอธิบาย = '[data-ปุ่ม="คำอธิบายสัญลักษณ์"]'
const แถว = '[data-หัวคำเดิม]'
const จอมือถือ = [320, 344, 375]
const จอกว้าง = [768, 860, 1280]

const เบราว์เซอร์ = await chromium.launch()

/**
 * เปิดหน้า ⇒ ตั้งค่าไว้ก่อนโค้ดของเว็บติด **ครั้งแรกครั้งเดียว** ⇒ โหลดหน้าใหม่แล้วค่าที่ผู้อ่านเลือกยังอยู่ (ข้อ ⑧)
 *   ⇒ รอบทที่ขอ (⛔ ไม่ใช่บท 1 ที่สร้างไว้ล่วงหน้า) · คำกรีกขึ้น · ตัวจัดแถวบอกเสร็จ · ฟอนต์มาครบ
 */
async function เปิด({ เล่ม = 'MRK', บท = 2, กว้าง, สูง, เดิม = true, ฉบับ = ['TCV'], พัง }) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: สูง ?? (กว้าง >= 768 ? 900 : กว้าง === 344 ? 882 : 740) } })
  await ctx.addInitScript(
    ([ด, ฉ]) => {
      try {
        if (sessionStorage.getItem('ด่าน151')) return
        sessionStorage.setItem('ด่าน151', '1')
        localStorage.setItem('phrakham.versions', JSON.stringify(ฉ))
        localStorage.setItem('phrakham.view', JSON.stringify({ ภาษาเดิม: ด }))
      } catch {}
    },
    [เดิม, ฉบับ],
  )
  // ⭐ ของพังที่ต้องอยู่รอดข้ามการโหลดหน้าใหม่ (ข้อ ⑧ ⑩) ⇒ ยัดก่อนโค้ดของเว็บติดทุกครั้งที่โหลด
  if (พัง?.ก่อนโหลด) await ctx.addInitScript(พัง.ก่อนโหลด)
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(`${ฐาน}/read/${เล่ม}?c=${บท}`, { waitUntil: 'domcontentloaded' })
  const พร้อม = await รอพร้อม(แท็บ, บท, เดิม)
  if (พร้อม && พัง) await ยัด(แท็บ, พัง)
  return { ctx, แท็บ, พร้อม }
}

async function รอพร้อม(แท็บ, บท, เดิม) {
  return แท็บ
    .waitForFunction(
      ([c, ด]) => {
        if (!document.getElementById('__nuxt')?.__vue_app__) return false
        if (!document.querySelector(`[data-หมุดบท="${c}"]`)) return false
        if (!document.querySelector(`.pk-ตัวบท [data-ข้อ^="${c}:"]`)) return false
        if (document.fonts.status !== 'loaded') return false
        if (!document.querySelector('.pk-แถบบน a[aria-haspopup="dialog"]')) return false
        if (ด && !document.querySelector(`.pk-ชั้นคำ[aria-label$=" ${c}"] .pk-คำ`)) return false
        return (document.querySelector('.pk-ตัวบท')?.getAttribute('data-จัดแถว') ?? 'เสร็จ') === 'เสร็จ'
      },
      [บท, เดิม],
      { timeout: รอนานสุด },
    )
    .then(() => รอสองเฟรม(แท็บ))
    .then(() => true)
    .catch(() => false)
}

const รอสองเฟรม = (แท็บ) =>
  แท็บ.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))

async function ยัด(แท็บ, พัง) {
  if (พัง.css) await แท็บ.addStyleTag({ content: พัง.css })
  if (พัง.js) await แท็บ.evaluate(พัง.js)
}

/** เลื่อนให้ข้อ `ข้อ` อยู่ใต้แถบหนึบ ⇒ คืนขอบบนของมันบนจอ ⇒ กล่องแรกของข้อที่ตาเห็น */
//   ⇒ ⭐ หน้าที่เพิ่งเปิดยังยึดต้นบทอยู่ครู่หนึ่ง (ตัวยึดของหน้า) ⇒ เลื่อนซ้ำจนข้อนั้นอยู่บนจอจริง (ไม่เกิน 5 รอบ) ⇒ ⛔ รอเป็นเวลาตายตัว
async function เลื่อนไปข้อ(แท็บ, ข้อ) {
  let บน = NaN
  for (let รอบ = 0; รอบ < 5; รอบ++) {
    await แท็บ.evaluate((k) => {
      const e = [...document.querySelectorAll(`.pk-ตัวบท [data-ข้อ="${k}"]`)].find((x) => x.getClientRects().length)
      const ขอบ = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pk-ขอบล่างหนึบ')) || 160
      if (e) window.scrollTo(0, window.scrollY + e.getBoundingClientRect().top - ขอบ - 40)
    }, ข้อ)
    await รอสองเฟรม(แท็บ)
    await รอสองเฟรม(แท็บ)
    บน = await ขอบบนข้อ(แท็บ, ข้อ)
    if (บน > 0 && บน < 400) break
  }
  return บน
}
const ขอบบนข้อ = (แท็บ, ข้อ) =>
  แท็บ.evaluate((k) => {
    const e = [...document.querySelectorAll(`.pk-ตัวบท [data-ข้อ="${k}"]`)].find((x) => x.getClientRects().length)
    return e ? e.getBoundingClientRect().top : NaN
  }, ข้อ)

const ล้นข้าง = (แท็บ) => แท็บ.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)

/** กดปุ่มเฟืองที่ตาเห็น ⇒ รอจน `aria-expanded` เป็นค่าที่ต้องการ ⇒ คืน `true` ถ้าถึง */
async function กดเครื่องมือ(แท็บ, ต้องการ) {
  await แท็บ.locator(`${ปุ่มเครื่องมือ}:visible`).first().click()
  return แท็บ
    .waitForFunction(
      ([sel, ค]) => [...document.querySelectorAll(sel)].find((x) => x.getClientRects().length)?.getAttribute('aria-expanded') === ค,
      [ปุ่มเครื่องมือ, ต้องการ],
      { timeout: 5000 },
    )
    .then(() => รอสองเฟรม(แท็บ))
    .then(() => true)
    .catch(() => false)
}

// ================================================================ มือถือ ①②③
async function ตรวจมือถือ(พัง, { จอ = จอมือถือ, ข้อ = ['①', '②', '③'] } = {}) {
  const ตก = []
  for (const กว้าง of จอ) {
    const ป้าย = `มาระโก 2 จอ ${กว้าง}`
    const { ctx, แท็บ, พร้อม } = await เปิด({ กว้าง, พัง })
    try {
      if (!พร้อม) {
        ตก.push(`${ป้าย} ⇒ หน้า ⛔ ไม่พร้อมภายใน ${รอนานสุด / 1000} วินาที`)
        continue
      }
      if (await แท็บ.locator(`${แถว}:visible`).count()) ตก.push(`${ป้าย} ⇒ ① กล่องเครื่องมือขึ้นเองตอนเปิดหน้า ⛔ (ต้องปิดอยู่จนกดปุ่มเฟือง)`)
      const บนก่อน = await เลื่อนไปข้อ(แท็บ, '2:12')
      await กางเครื่องมือภาษาเดิม(แท็บ)
      await รอสองเฟรม(แท็บ)
      const ว = await แท็บ.evaluate(
        ([ขอบ, sel]) => {
          const แผง = document.querySelector(sel)
          if (!แผง) return null
          const r = แผง.getBoundingClientRect()
          const จอ = document.documentElement.clientWidth
          const แถบ = document.querySelector('.pk-แถบบน').getBoundingClientRect()
          const Aa = document.querySelector('[data-ปุ่ม="Aa"]')
          const ra = Aa.getBoundingClientRect()
          const บนสุด = document.elementFromPoint(ra.left + ra.width / 2, ra.top + ra.height / 2)
          const เฟือง = [...document.querySelectorAll('[data-ปุ่ม="เครื่องมือภาษาเดิม"]')].find((x) => x.getClientRects().length)
          const เห็น = (x) => !!x && x.getClientRects().length > 0 && getComputedStyle(x).visibility !== 'hidden'
          const กดได้ = [...แผง.querySelectorAll('button, label, input, output')].filter(เห็น)
          const นอกขอบ = กดได้
            .map((x) => [x, x.getBoundingClientRect()])
            .filter(([, q]) => q.width > 0 && (q.left < ขอบ - 0.5 || q.right > จอ - ขอบ + 0.5))
            .map(([x, q]) => `${(x.textContent || x.tagName).trim().slice(0, 20)} (${q.left.toFixed(0)}–${q.right.toFixed(0)})`)
          const ชุดเครื่องหมาย = แผง.querySelector('[data-แผงเครื่องหมาย]')
          const ตำแหน่ง = (x) => (x ? [...แผง.querySelectorAll('*')].indexOf(x) : -1)
          const ปุ่มแรก = [...แผง.querySelectorAll('button, input, select, a[href]')].find((x) => เห็น(x))
          return {
            กล่อง: { l: r.left, t: r.top, r: r.right, b: r.bottom, จอ, สูงจอ: window.innerHeight },
            ล่างแถบ: แถบ.bottom,
            Aaเห็น: !!บนสุด && Aa.contains(บนสุด),
            เฟืองกาง: เฟือง?.getAttribute('aria-expanded'),
            ล้นในแผง: แผง.scrollWidth - แผง.clientWidth,
            นอกขอบ,
            บนสุดของในหน้า: Math.min(...กดได้.map((x) => x.getBoundingClientRect().top)),
            หัว: (แผง.querySelector('.pk-ชื่อกล่องเด้ง')?.textContent || '').trim(),
            ช่องติ๊ก: [...(ชุดเครื่องหมาย?.querySelectorAll('input[type="checkbox"]') ?? [])].filter(เห็น).length,
            ช่องติ๊กเตี้ย: [...(ชุดเครื่องหมาย?.querySelectorAll('label') ?? [])].filter((x) => x.getBoundingClientRect().height < 44 - 0.01).length,
            หัวเครื่องหมายเห็น: เห็น(ชุดเครื่องหมาย?.querySelector('legend')) && (ชุดเครื่องหมาย?.querySelector('legend')?.getBoundingClientRect().height ?? 0) > 1,
            ลำดับ: [ตำแหน่ง(แผง.querySelector('[data-ปุ่มสัญลักษณ์กาล]')), ตำแหน่ง(ชุดเครื่องหมาย)],
            ปุ่มเล็ก: [...แผง.querySelectorAll('button')]
              .filter((x) => เห็น(x))
              .filter((x) => x.getBoundingClientRect().width < 44 - 0.01 || x.getBoundingClientRect().height < 44 - 0.01)
              .map((x) => x.textContent.trim() || x.getAttribute('aria-label')),
            ปุ่มแรก: ปุ่มแรก?.getAttribute('data-ปุ่ม') ?? ปุ่มแรก?.textContent?.trim() ?? '',
          }
        },
        [เผื่อขอบ, กล่องเครื่องมือ],
      )
      if (!ว) {
        ตก.push(`${ป้าย} ⇒ ① กดปุ่มเฟืองแล้ว ⛔ ไม่มีหน้าเครื่องมือภาษาเดิม`)
        continue
      }
      if (ข้อ.includes('①')) {
        const ก = ว.กล่อง
        if (Math.abs(ก.l) > 0.5 || Math.abs(ก.t - ว.ล่างแถบ) > 0.5 || Math.abs(ก.r - ก.จอ) > 0.5 || Math.abs(ก.b - ก.สูงจอ) > 0.5)
          ตก.push(`${ป้าย} ⇒ ① หน้าเครื่องมือ ⛔ เต็มจอใต้แถบบน ⇒ กล่อง ${ก.l.toFixed(0)},${ก.t.toFixed(0)} ถึง ${ก.r.toFixed(0)},${ก.b.toFixed(0)} ในจอ ${ก.จอ}×${ก.สูงจอ} · แถบบนจบที่ ${ว.ล่างแถบ.toFixed(0)}`)
        if (ว.บนสุดของในหน้า < ว.ล่างแถบ - 0.5) ตก.push(`${ป้าย} ⇒ ① ของในหน้าเครื่องมือเริ่มที่ ${ว.บนสุดของในหน้า.toFixed(0)} ⛔ ซุกใต้แถบบน (${ว.ล่างแถบ.toFixed(0)})`)
        if (!ว.Aaเห็น) ตก.push(`${ป้าย} ⇒ ① ปุ่ม Aa บนแถบบนถูกหน้าเครื่องมือทับ ⛔`)
        if (ว.เฟืองกาง !== 'true') ตก.push(`${ป้าย} ⇒ ① ปุ่มเฟือง ⛔ บอก aria-expanded=true ตอนหน้าเปิด`)
        if (ว.ล้นในแผง > 0) ตก.push(`${ป้าย} ⇒ ① หน้าเครื่องมือเลื่อนด้านข้างในตัวเองได้ ${ว.ล้นในแผง} จุด ⛔ (SC 1.4.10)`)
        for (const x of ว.นอกขอบ) ตก.push(`${ป้าย} ⇒ ① ${x} ห่างขอบจอ ⛔ ถึง ${เผื่อขอบ} จุด`)
        if (await ล้นข้าง(แท็บ)) ตก.push(`${ป้าย} ⇒ ① หน้าเลื่อนด้านข้างได้ ⛔ (SC 1.4.10)`)
      }
      if (ข้อ.includes('②')) {
        if (ว.หัว !== ชื่อปุ่มเครื่องมือ) ตก.push(`${ป้าย} ⇒ ② หัวของหน้า «${ว.หัว}» ⛔ ไม่ใช่ «${ชื่อปุ่มเครื่องมือ}»`)
        const กลุ่ม = await แท็บ.getByRole('group', { name: ชื่อปุ่มเครื่องมือ, exact: true }).count()
        if (กลุ่ม !== 1) ตก.push(`${ป้าย} ⇒ ② โปรแกรมอ่านหน้าจอ ⛔ ได้ยินกลุ่มชื่อ «${ชื่อปุ่มเครื่องมือ}» (เจอ ${กลุ่ม})`)
        if (ว.ช่องติ๊ก !== 8) ตก.push(`${ป้าย} ⇒ ② ช่องติ๊กเครื่องหมายช่วยอ่านที่ตาเห็นในหน้า ${ว.ช่องติ๊ก} ช่อง ⛔ ไม่ใช่ 8 (ต้องกางอยู่ในหน้า)`)
        if (!ว.หัวเครื่องหมายเห็น) ตก.push(`${ป้าย} ⇒ ② หัวกลุ่ม เครื่องหมายช่วยอ่าน ⛔ ตาเห็น`)
        if (ว.ช่องติ๊กเตี้ย) ตก.push(`${ป้าย} ⇒ ② ช่องติ๊ก ${ว.ช่องติ๊กเตี้ย} ช่องสูง ⛔ ถึง 44 จุด`)
        const [ก, ข] = ว.ลำดับ
        if (!(ก >= 0 && ข > ก)) ตก.push(`${ป้าย} ⇒ ② ลำดับในหน้า ⛔ ใช่ สัญลักษณ์กาล · เครื่องหมายช่วยอ่าน (${ว.ลำดับ.join(' ')})`)
        for (const x of ว.ปุ่มเล็ก) ตก.push(`${ป้าย} ⇒ ② ปุ่ม ${x} เล็กกว่า 44 จุด ⛔`)
      }
      if (ข้อ.includes('③')) {
        if (ว.ปุ่มแรก !== 'ปิดกล่อง') ตก.push(`${ป้าย} ⇒ ③ ของกดได้ชิ้นแรกในหน้าเครื่องมือคือ «${ว.ปุ่มแรก}» ⛔ ไม่ใช่ปุ่ม × (ปิดกล่อง)`)
        if (await แท็บ.getByRole('button', { name: ชื่อปุ่มกลับไปอ่านเดิม, exact: true }).count())
          ตก.push(`${ป้าย} ⇒ ③ ยังมีปุ่ม «${ชื่อปุ่มกลับไปอ่านเดิม}» ⛔ ต้องปิดด้วย × อย่างเดียว (ใบ #153)`)
        const ปุ่มกลับ = แท็บ.locator(กล่องเครื่องมือ).getByRole('button', { name: ชื่อปุ่มปิดกล่อง, exact: true })
        if (!(await ปุ่มกลับ.count()) || !(await ปุ่มกลับ.isVisible())) ตก.push(`${ป้าย} ⇒ ③ ⛔ มีปุ่ม × «${ชื่อปุ่มปิดกล่อง}» ที่ตาเห็น`)
        else {
          // ⭐ เปลี่ยนของในหน้า ⇒ คำกรีกข้างหลังจัดแถวใหม่ ⇒ แล้วหน้าข้างหลังเลื่อนไป 400 จุด ⇒ ข้อต้องขยับจริงก่อนปิด
          const กาล = แท็บ.locator(`${กล่องเครื่องมือ} [data-ปุ่มสัญลักษณ์กาล]`)
          if (await กาล.count()) await กาล.click()
          await แท็บ.locator(กล่องเครื่องมือ).getByRole('button', { name: ชื่อปุ่มเลือกทั้งหมด, exact: true }).click().catch(() => {})
          await แท็บ.waitForFunction(() => (document.querySelector('.pk-ตัวบท')?.getAttribute('data-จัดแถว') ?? 'เสร็จ') === 'เสร็จ', null, { timeout: รอนานสุด }).catch(() => {})
          await แท็บ.evaluate(() => window.scrollBy(0, 400))
          await รอสองเฟรม(แท็บ)
          const บนระหว่าง = await ขอบบนข้อ(แท็บ, '2:12')
          if (Math.abs(บนระหว่าง - บนก่อน) <= 2) ตก.push(`${ป้าย} ⇒ ③ ข้อ 2:12 ⛔ ขยับเลยระหว่างที่หน้าเปิด ⇒ ตรวจการพากลับไม่ได้`)
          if (พัง?.ก่อนกลับ) await แท็บ.evaluate(พัง.ก่อนกลับ)
          await ปุ่มกลับ.click()
          const ปิด = await แท็บ
            .waitForFunction(
              (s) => !document.querySelector(s) && document.activeElement?.getAttribute('data-ปุ่ม') === 'เครื่องมือภาษาเดิม',
              กล่องเครื่องมือ,
              { timeout: รอนานสุด },
            )
            .then(() => true)
            .catch(() => false)
          if (!ปิด) ตก.push(`${ป้าย} ⇒ ③ กด × แล้วหน้าเครื่องมือ ⛔ ปิด หรือโฟกัส ⛔ กลับปุ่มเฟือง`)
          // ⭐ รอหน้าเลื่อนกลับ ⇒ รอจนขอบบนของข้อนิ่ง 3 เฟรมติด ⛔ ไม่รอเป็นเวลาตายตัว
          await แท็บ
            .waitForFunction(
              (k) => {
                const e = [...document.querySelectorAll(`.pk-ตัวบท [data-ข้อ="${k}"]`)].find((x) => x.getClientRects().length)
                const v = e ? Math.round(e.getBoundingClientRect().top) : NaN
                const น = (window.__ด่าน151 ??= { ก่อน: NaN, นับ: 0 })
                น.นับ = v === น.ก่อน ? น.นับ + 1 : 0
                น.ก่อน = v
                return น.นับ >= 3
              },
              '2:12',
              { polling: 'raf', timeout: รอนานสุด },
            )
            .catch(() => {})
          const บนหลัง = await ขอบบนข้อ(แท็บ, '2:12')
          if (!(Math.abs(บนหลัง - บนก่อน) <= 2))
            ตก.push(`${ป้าย} ⇒ ③ ปิดด้วย × แล้วข้อ 2:12 อยู่ที่ ${บนหลัง.toFixed(1)} ⛔ ไม่ใช่ระดับเดิม ${บนก่อน.toFixed(1)} (±2)`)
          if (!พัง) console.log(`   ③ ${ป้าย} ⇒ (ปิดด้วย ×) ข้อ 2:12 ก่อนเปิด ${บนก่อน.toFixed(1)} · ตอนเปิด ${บนระหว่าง.toFixed(1)} · หลังกลับ ${บนหลัง.toFixed(1)}`)
        }
      }
      // ② ปุ่ม i ⇒ คำอธิบายขึ้น · aria-expanded · aria-controls ⇒ แทนปุ่ม *ความหมาย* ▾ ของหมวดเดิม
      if (ข้อ.includes('②')) {
        if (await แท็บ.locator(กล่องเครื่องมือ).count()) await พับเครื่องมือภาษาเดิม(แท็บ)
        const ปุ่มi = แท็บ.locator(`${ปุ่มคำอธิบาย}:visible`).first()
        if (await ปุ่มi.count()) {
          await ปุ่มi.click()
          const ขึ้น = await แท็บ
            .waitForFunction(
              (sel) => {
                const ป = [...document.querySelectorAll(sel)].find((x) => x.getClientRects().length)
                const ก = document.getElementById(ป?.getAttribute('aria-controls') ?? '')
                return ป?.getAttribute('aria-expanded') === 'true' && !!ก?.querySelector('[data-คำอธิบายกาล]') && ก.getClientRects().length > 0
              },
              ปุ่มคำอธิบาย,
              { timeout: รอนานสุด },
            )
            .then(() => true)
            .catch(() => false)
          if (!ขึ้น) ตก.push(`${ป้าย} ⇒ ② กดปุ่ม «${ชื่อปุ่มคำอธิบาย}» แล้วคำอธิบาย ⛔ ขึ้น หรือ aria-expanded ⛔ เป็น true`)
          await แท็บ.keyboard.press('Escape')
        } else ตก.push(`${ป้าย} ⇒ ② ⛔ มีปุ่ม «${ชื่อปุ่มคำอธิบาย}» บนหัวคอลัมน์ภาษาเดิม`)
      }
      // ① หน้า Aa ⇒ ของเดิมครบ ⇒ ⛔ มีหมวดเครื่องมือภาษาเดิมแล้ว (ใบ #154 เกณฑ์ข้อ 5)
      //   ⇒ ตรวจท้ายสุด ⇒ ปิดหน้า Aa แล้วหน้าอ่านยึดข้อที่อ่านค้างไว้อีกครู่ (ใบ #153) ⇒ ⛔ ให้ไปทับการเลื่อนไปข้อ 2:12 ของข้อ ③
      if (ข้อ.includes('①')) {
        await กางแผงAa(แท็บ)
        const Aa = await แท็บ.evaluate(() => {
          const แผง = document.getElementById('pk-แผงAa')
          if (!แผง) return null
          return {
            เล็กลง: !!แผง.querySelector('.pk-ขนาดตัวอักษร button:first-of-type'),
            ใหญ่ขึ้น: แผง.querySelectorAll('.pk-ขนาดตัวอักษร button').length === 2,
            จัดวาง: แผง.querySelectorAll('input[type="radio"][name="จัดวาง"]').length,
            เลข: [...แผง.querySelectorAll('label')].some((x) => /แสดงเลขบท\/ข้อ/.test(x.textContent || '')),
            หมวดเดิม: แผง.querySelectorAll('[data-หมวด="เครื่องมือภาษาเดิม"], [data-หัวคำเดิม], [data-ปุ่มสัญลักษณ์กาล], [data-แผงเครื่องหมาย]').length,
          }
        })
        if (!Aa) ตก.push(`${ป้าย} ⇒ ① กด Aa แล้ว ⛔ ไม่มีหน้า Aa`)
        else {
          if (!Aa.เล็กลง || !Aa.ใหญ่ขึ้น || Aa.จัดวาง !== 3 || !Aa.เลข) ตก.push(`${ป้าย} ⇒ ① ของเดิมในแผง Aa ⛔ ครบ ⇒ ${JSON.stringify(Aa)} (ใบ #151 เกณฑ์ข้อ 1.4)`)
          const กลุ่มเดิม = await แท็บ.locator('#pk-แผงAa').getByRole('group', { name: หัวหมวดเครื่องมือเดิม, exact: true }).count()
          if (Aa.หมวดเดิม || กลุ่มเดิม) ตก.push(`${ป้าย} ⇒ ① หน้า Aa ยังมีหมวด «${หัวหมวดเครื่องมือเดิม}» หรือตัวคุมคำเดิม ⛔ ต้องถอด (ใบ #154 เกณฑ์ข้อ 5)`)
        }
      }
    } catch (e) {
      ตก.push(`${ป้าย} ⇒ ด่านล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  // ② ปิดคอลัมน์ภาษาเดิม ⇒ ⛔ มีปุ่มเฟือง ⛔ มีหมวดในหน้า Aa
  if (ข้อ.includes('②')) {
    const { ctx, แท็บ, พร้อม } = await เปิด({ กว้าง: จอ[0], เดิม: false, พัง })
    try {
      if (!พร้อม) ตก.push(`ปิดคอลัมน์ภาษาเดิม จอ ${จอ[0]} ⇒ หน้า ⛔ ไม่พร้อม`)
      else {
        if (await แท็บ.locator(`${ปุ่มเครื่องมือ}, ${ปุ่มคำอธิบาย}`).count()) ตก.push(`ปิดคอลัมน์ภาษาเดิม จอ ${จอ[0]} ⇒ ② ยังมีปุ่มเฟืองหรือ i ⛔`)
        await กางแผงAa(แท็บ)
        if (await แท็บ.locator('#pk-แผงAa [data-หมวด="เครื่องมือภาษาเดิม"], #pk-แผงAa [data-หัวคำเดิม]').count())
          ตก.push(`ปิดคอลัมน์ภาษาเดิม จอ ${จอ[0]} ⇒ ② หน้า Aa ยังมีหมวดเครื่องมือภาษาเดิม ⛔`)
      }
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

// ================================================================ จอกว้าง ④–⑧
const อ่านหัว = (แท็บ) =>
  แท็บ.evaluate(
    ([sel, แถวsel]) => {
      const ป = [...document.querySelectorAll(sel)].find((x) => x.getClientRects().length)
      if (!ป) return null
      const หัว = ป.closest('.pk-หัวช่อง')
      const r = ป.getBoundingClientRect()
      const rh = หัว.getBoundingClientRect()
      const ในหัว = [...หัว.querySelectorAll('button, select')]
        .filter((x) => x.getClientRects().length && !x.closest('.pk-แผงคำเดิม'))
        .map((x) => {
          const q = x.getBoundingClientRect()
          return (q.top + q.bottom) / 2
        })
      const ร = document.querySelector(แถวsel)
      const rr = ร?.getBoundingClientRect()
      const คำ = [...ป.querySelectorAll('*'), ป]
        .flatMap((e) => [...e.childNodes].filter((t) => t.nodeType === 3 && t.textContent.trim()).map((t) => [e, t.textContent.trim()]))
        // ⚠️ ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/155 ⇒ ข้ามของที่ไม่ได้วาด ⇒ คำข้างรูปบนจอแคบกว่า 1100 เป็น `display: none` แต่ยังอยู่ใน DOM
        .filter(([e]) => !e.closest('.pk-เฉพาะเสียง') && e.getClientRects().length)
        .map(([, t]) => t)
      const หัวฉบับ = document.querySelector('.pk-หัวคอลัมน์')
      return {
        คำ,
        กาง: ป.getAttribute('aria-expanded'),
        คุม: ป.getAttribute('aria-controls'),
        สีพื้น: getComputedStyle(ป).backgroundColor,
        ปุ่ม: { l: r.left, r: r.right, t: r.top, b: r.bottom, w: r.width, h: r.height },
        หัว: { l: rh.left, r: rh.right, t: rh.top, b: rh.bottom, h: rh.height },
        แถวหัว: Math.max(...ในหัว) - Math.min(...ในหัว),
        จอ: document.documentElement.clientWidth,
        แถว: rr
          ? {
              l: rr.left,
              r: rr.right,
              t: rr.top,
              b: rr.bottom,
              id: ร.id,
              กาล: !!ร.querySelector('[data-ปุ่มสัญลักษณ์กาล]'),
              ช่อง: ร.querySelectorAll('[data-แผงเครื่องหมาย] input[type="checkbox"]').length,
            }
          : null,
        สูงหัวฉบับ: หัวฉบับ ? หัวฉบับ.getBoundingClientRect().height : NaN,
        แถบหัวล่าง: หัว.closest('.pk-หัวคอลัมน์')?.getBoundingClientRect().bottom ?? rh.bottom,
        สูงแถบบน: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pk-สูงแถบบน')) || 0,
        สูงจอ: window.innerHeight,
      }
    },
    [ปุ่มเครื่องมือ, แถว],
  )

async function ตรวจจอกว้าง(พัง, { จอ = จอกว้าง, ข้อ = ['④', '⑤', '⑥', '⑦', '⑧'] } = {}) {
  const ตก = []
  for (const กว้าง of จอ) {
    const ป้าย = `มาระโก 2 จอ ${กว้าง}`
    const { ctx, แท็บ, พร้อม } = await เปิด({ กว้าง, พัง })
    try {
      if (!พร้อม) {
        ตก.push(`${ป้าย} ⇒ หน้า ⛔ ไม่พร้อมภายใน ${รอนานสุด / 1000} วินาที`)
        continue
      }
      await แท็บ.waitForSelector(`${ปุ่มเครื่องมือ}`, { state: 'visible', timeout: รอนานสุด }).catch(() => {})
      const ก่อน = await อ่านหัว(แท็บ)
      if (!ก่อน) {
        ตก.push(`${ป้าย} ⇒ ④ หัวคอลัมน์ภาษาเดิม ⛔ มีปุ่มเฟือง «${ชื่อปุ่มเครื่องมือ}» ที่ตาเห็น`)
        continue
      }
      if (ข้อ.includes('④')) {
        // ⚠️ ใบ #154 ⇒ กล่องเด้งปิดอยู่ก่อนเสมอ ⇒ เปิดหน้ามาต้อง ⛔ มีกล่อง (ของเดิมของส่วนเพิ่มใบ #151 ⇒ แถวต้องกางอยู่)
        if (ก่อน.กาง !== 'false' || ก่อน.แถว) ตก.push(`${ป้าย} ⇒ ④ เปิดหน้ามากล่องเครื่องมือเปิดอยู่ (aria-expanded=${ก่อน.กาง}) ⛔ ต้องปิดอยู่จนผู้อ่านกด`)
        // ⚠️ ใบ #155 ⇒ จอตั้งแต่ 1100 ตาเห็นคำ *เครื่องมือ* ข้างรูป ⇒ ⛔ ผ่อน ⇒ จอแคบกว่ายังต้องว่าง ⇒ ตั้งแต่เส้นต้องเป็นคำนี้คำเดียวตรงตัว
        const ควรเห็น = คำที่ควรเห็น(กว้าง, คำข้างรูป.เครื่องมือ)
        if (ก่อน.คำ.join(' ') !== ควรเห็น)
          ตก.push(`${ป้าย} ⇒ ④ ปุ่มเฟืองมีคำบนจอ «${ก่อน.คำ.join(' ')}» ⛔ ต้อง${ควรเห็น ? `เป็น «${ควรเห็น}» คำเดียว (ใบ #155)` : 'เป็นรูปอย่างเดียว (ใบ #154 เกณฑ์ข้อ 6 · ใบ #155 จอแคบกว่า 1100)'}`)
        const ได้ยิน = await แท็บ.getByRole('button', { name: ชื่อปุ่มเครื่องมือ, exact: true }).count()
        if (ได้ยิน !== 1) ตก.push(`${ป้าย} ⇒ ④ ⛔ ได้ยินปุ่มชื่อ «${ชื่อปุ่มเครื่องมือ}» (เจอ ${ได้ยิน}) ⇒ SC 4.1.2`)
        const เดิม = await แท็บ.getByRole('button', { name: ตาเห็นปุ่มเครื่องมือเดิม, exact: true }).count()
        if (เดิม) ตก.push(`${ป้าย} ⇒ ④ ยังมีปุ่ม «${ตาเห็นปุ่มเครื่องมือเดิม}» ของใบ #151 ⛔ ต้องถอด`)
        if (ก่อน.ปุ่ม.w < 44 - 0.01 || ก่อน.ปุ่ม.h < 44 - 0.01) ตก.push(`${ป้าย} ⇒ ④ ปุ่มเฟือง ${ก่อน.ปุ่ม.w.toFixed(0)}×${ก่อน.ปุ่ม.h.toFixed(0)} จุด ⛔ เล็กกว่า 44`)
        if (ก่อน.ปุ่ม.l < -0.5 || ก่อน.ปุ่ม.r > ก่อน.จอ + 0.5 || ก่อน.ปุ่ม.l < ก่อน.หัว.l - 0.5 || ก่อน.ปุ่ม.r > ก่อน.หัว.r + 0.5)
          ตก.push(`${ป้าย} ⇒ ④ ปุ่มเฟือง (${ก่อน.ปุ่ม.l.toFixed(0)}–${ก่อน.ปุ่ม.r.toFixed(0)}) ⛔ อยู่ในจอหรือในหัวครบ (จอ ${ก่อน.จอ})`)
        if (ก่อน.แถวหัว > 1.5) ตก.push(`${ป้าย} ⇒ ④ หัวคอลัมน์ภาษาเดิม ⛔ แถวเดียว ⇒ เส้นกลางของปุ่มในหัวต่างกัน ${ก่อน.แถวหัว.toFixed(1)} จุด`)
        if (await ล้นข้าง(แท็บ)) ตก.push(`${ป้าย} ⇒ ④ หน้าเลื่อนด้านข้างได้ ⛔ (SC 1.4.10)`)
        if (!พัง) console.log(`   ④ ${ป้าย} ⇒ ปุ่ม ${ก่อน.ปุ่ม.w.toFixed(0)}×${ก่อน.ปุ่ม.h.toFixed(0)} ที่ ${ก่อน.ปุ่ม.l.toFixed(0)}–${ก่อน.ปุ่ม.r.toFixed(0)} · หัว ${ก่อน.หัว.l.toFixed(0)}–${ก่อน.หัว.r.toFixed(0)} สูง ${ก่อน.หัว.h.toFixed(1)}`)
      }
      // ⑤ เปิด
      const ข้อแรกก่อน = await ขอบบนข้อ(แท็บ, '2:1')
      if (!(await กดเครื่องมือ(แท็บ, 'true'))) {
        ตก.push(`${ป้าย} ⇒ ⑤ กดปุ่มเฟืองแล้ว aria-expanded ⛔ เป็น true`)
        continue
      }
      await แท็บ.waitForSelector(`${แถว} [data-ปุ่มสัญลักษณ์กาล]`, { state: 'visible', timeout: รอนานสุด }).catch(() => {})
      await รอสองเฟรม(แท็บ)
      const กาง = await อ่านหัว(แท็บ)
      if (ข้อ.includes('⑤')) {
        if (!กาง.แถว) ตก.push(`${ป้าย} ⇒ ⑤ เปิดแล้ว ⛔ มีกล่องเครื่องมือ`)
        else {
          if (กาง.คุม !== กาง.แถว.id) ตก.push(`${ป้าย} ⇒ ⑤ aria-controls «${กาง.คุม}» ⛔ ชี้กล่องที่เปิด («${กาง.แถว.id}»)`)
          if (!กาง.แถว.กาล || กาง.แถว.ช่อง !== 8) ตก.push(`${ป้าย} ⇒ ⑤ กล่องที่เปิด ⛔ มีสัญลักษณ์กาลกับช่องติ๊ก 8 ช่อง (กาล ${กาง.แถว.กาล} · ช่อง ${กาง.แถว.ช่อง})`)
          if (กาง.แถว.t < กาง.หัว.b - 1.5) ตก.push(`${ป้าย} ⇒ ⑤ กล่องเริ่มที่ ${กาง.แถว.t.toFixed(0)} ⛔ ทับหัว (หัวจบที่ ${กาง.หัว.b.toFixed(0)})`)
          // ⚠️ ของเดิม ⇒ แถวกว้างไม่เกินหัว ⇒ ตอนนี้กล่องเด้งกว้างตามตัวเอง ⇒ เกณฑ์เดียวกับเมนูบนแถบบน ⇒ ห่างขอบจอซ้ายขวา 16 จุด
          if (กาง.แถว.l < เผื่อขอบ - 0.5 || กาง.แถว.r > กาง.จอ - เผื่อขอบ + 0.5) ตก.push(`${ป้าย} ⇒ ⑤ กล่อง ${กาง.แถว.l.toFixed(0)}–${กาง.แถว.r.toFixed(0)} ห่างขอบจอ ⛔ ถึง ${เผื่อขอบ} จุด`)
        }
        if (กาง.สีพื้น === ก่อน.สีพื้น) ตก.push(`${ป้าย} ⇒ ⑤ เปิดแล้วปุ่มเฟือง ⛔ เปลี่ยนหน้าตา (พื้น ${ก่อน.สีพื้น}) ⇒ ตาไม่เห็นว่ากล่องเปิดจากปุ่มไหน`)
        if (Math.abs(กาง.หัว.h - ก่อน.หัว.h) > 0.5 || Math.abs(กาง.สูงหัวฉบับ - ก่อน.สูงหัวฉบับ) > 0.5)
          ตก.push(`${ป้าย} ⇒ ⑤ เปิดแล้วหัวสูงขึ้น ${ก่อน.หัว.h.toFixed(1)}→${กาง.หัว.h.toFixed(1)} (แถวหัว ${ก่อน.สูงหัวฉบับ.toFixed(1)}→${กาง.สูงหัวฉบับ.toFixed(1)}) ⛔ กล่องต้องลอย ⛔ ดัน`)
        const ข้อแรกหลัง = await ขอบบนข้อ(แท็บ, '2:1')
        if (!(Math.abs(ข้อแรกหลัง - ข้อแรกก่อน) <= 0.5)) ตก.push(`${ป้าย} ⇒ ⑤ เปิดแล้วตัวบทกระโดด ⇒ ข้อ 2:1 ${ข้อแรกก่อน.toFixed(1)}→${ข้อแรกหลัง.toFixed(1)} ⛔`)
        if (await ล้นข้าง(แท็บ)) ตก.push(`${ป้าย} ⇒ ⑤ เปิดแล้วหน้าเลื่อนด้านข้างได้ ⛔ (SC 1.4.10)`)
        for (const x of await แท็บ.locator(`${แถว} button:visible`).all()) {
          const b = await x.boundingBox()
          if (b && (b.width < 44 - 0.01 || b.height < 44 - 0.01)) ตก.push(`${ป้าย} ⇒ ⑤ ปุ่มในกล่อง ${(await x.textContent()).trim()} ⛔ ถึง 44 จุด`)
        }
      }
      // ⑥ หนึบไปกับหัว ⇒ เลื่อนลง 2000 จุด ⇒ กล่องกับช่องติ๊กยังอยู่บนจอใต้หัว
      if (ข้อ.includes('⑥')) {
        await แท็บ.evaluate(() => window.scrollBy(0, 2000))
        await รอสองเฟรม(แท็บ)
        await รอสองเฟรม(แท็บ)
        const แผง = await แท็บ.evaluate((s) => {
          const ฟ = document.querySelector(`${s} [data-แผงเครื่องหมาย]`)
          const ช่อง = ฟ?.querySelector('input[type="checkbox"]')
          if (!ฟ || !ช่อง) return null
          const r = ฟ.getBoundingClientRect()
          const c = ช่อง.getBoundingClientRect()
          const บน = document.elementFromPoint(c.left + c.width / 2, c.top + c.height / 2)
          return { t: r.top, b: r.bottom, เห็น: !!บน && ฟ.contains(บน), เลื่อน: window.scrollY }
        }, แถว)
        if (!แผง || !แผง.เห็น || แผง.t < 0 || แผง.t > (await แท็บ.evaluate(() => innerHeight)))
          ตก.push(`${ป้าย} ⇒ ⑥ เลื่อนลง 2000 จุดแล้วช่องติ๊กเครื่องหมายช่วยอ่านในกล่องที่เปิดค้าง ⛔ อยู่บนจอให้กด (${JSON.stringify(แผง)})`)
        const ล่าง = await อ่านหัว(แท็บ)
        if (!ล่าง.แถว) ตก.push(`${ป้าย} ⇒ ⑥ เลื่อนอ่านแล้วกล่องที่เปิด ⛔ อยู่บนหน้า`)
        else {
          if (ล่าง.หัว.b <= ล่าง.สูงแถบบน + 0.5 || ล่าง.หัว.t >= ล่าง.สูงจอ)
            ตก.push(`${ป้าย} ⇒ ⑥ เลื่อนอ่านแล้วหัวคอลัมน์ภาษาเดิม ⛔ หนึบอยู่บนจอ (${ล่าง.หัว.t.toFixed(0)}–${ล่าง.หัว.b.toFixed(0)} · แถบบน ${ล่าง.สูงแถบบน.toFixed(0)})`)
          if (Math.abs(ล่าง.แถว.t - Math.max(ล่าง.หัว.b, ล่าง.แถบหัวล่าง)) > 1.5 || ล่าง.แถว.b < 0 || ล่าง.แถว.t > ล่าง.สูงจอ)
            ตก.push(`${ป้าย} ⇒ ⑥ เลื่อนอ่านแล้วกล่องที่เปิด ⛔ ติดใต้หัว ⇒ กล่อง ${ล่าง.แถว.t.toFixed(0)} · หัวจบ ${ล่าง.หัว.b.toFixed(0)}`)
          if (!พัง) console.log(`   ⑥ ${ป้าย} ⇒ เลื่อนลง 2000 ⇒ หัว ${ล่าง.หัว.t.toFixed(0)}–${ล่าง.หัว.b.toFixed(0)} · กล่อง ${ล่าง.แถว.t.toFixed(0)} · แผงเครื่องหมาย ${แผง?.t.toFixed(0)}–${แผง?.b.toFixed(0)}`)
        }
        await แท็บ.evaluate(() => window.scrollTo(0, 0))
        await รอสองเฟรม(แท็บ)
      }
      // ⑤ กดอีกที ⇒ ปิด
      if (ข้อ.includes('⑤')) {
        if (!(await กดเครื่องมือ(แท็บ, 'false'))) ตก.push(`${ป้าย} ⇒ ⑤ กดอีกทีแล้ว aria-expanded ⛔ กลับเป็น false`)
        else if (await แท็บ.locator(แถว).count()) ตก.push(`${ป้าย} ⇒ ⑤ ปิดแล้วกล่อง ⛔ หายไป`)
        else {
          const ปิด = await อ่านหัว(แท็บ)
          if (ปิด.สีพื้น !== ก่อน.สีพื้น) ตก.push(`${ป้าย} ⇒ ⑤ ปิดแล้วปุ่มเฟือง ⛔ กลับหน้าตาเดิม (พื้น ${ปิด.สีพื้น} ⛔ ${ก่อน.สีพื้น})`)
        }
      } else await กดเครื่องมือ(แท็บ, 'false')
      // ⑦ แป้นพิมพ์
      if (ข้อ.includes('⑦')) {
        const ป = แท็บ.locator(`${ปุ่มเครื่องมือ}:visible`).first()
        await ป.focus()
        await แท็บ.keyboard.press('Enter')
        const กางด้วยแป้น = await แท็บ.waitForSelector(`${แถว} [data-ปุ่มสัญลักษณ์กาล]`, { state: 'visible', timeout: 5000 }).then(() => true).catch(() => false)
        if (!กางด้วยแป้น) ตก.push(`${ป้าย} ⇒ ⑦ Enter ที่ปุ่มเฟืองแล้วกล่อง ⛔ เปิด`)
        else {
          // ⚠️ ของเดิมยอมกด Tab 2 ครั้ง (× อยู่หลังปุ่มในหัว) ⇒ ตอนนี้กล่องต่อจากปุ่มเฟืองในลำดับ Tab ⇒ ครั้งเดียวต้องเข้า ⇒ เข้มกว่าเดิม
          await แท็บ.keyboard.press('Tab')
          if (!(await แท็บ.evaluate((s) => !!document.activeElement?.closest(s), แถว))) ตก.push(`${ป้าย} ⇒ ⑦ Tab ครั้งเดียวจากปุ่มเฟือง ⛔ เข้ากล่องที่เปิด (SC 2.4.3)`)
          await แท็บ.keyboard.press('Escape')
          const พับด้วยEsc = await แท็บ
            .waitForFunction(
              ([sel, s]) => !document.querySelector(s) && document.activeElement?.matches(sel) && document.activeElement.getAttribute('aria-expanded') === 'false',
              [ปุ่มเครื่องมือ, แถว],
              { timeout: 5000 },
            )
            .then(() => true)
            .catch(() => false)
          if (!พับด้วยEsc) ตก.push(`${ป้าย} ⇒ ⑦ Escape ในกล่องแล้วกล่อง ⛔ ปิด หรือโฟกัส ⛔ กลับปุ่มเฟือง`)
          else {
            await แท็บ.keyboard.press(' ')
            const กางด้วยวรรค = await แท็บ.waitForSelector(`${แถว} [data-ปุ่มสัญลักษณ์กาล]`, { state: 'visible', timeout: 5000 }).then(() => true).catch(() => false)
            if (!กางด้วยวรรค) ตก.push(`${ป้าย} ⇒ ⑦ เว้นวรรคที่ปุ่มเฟืองแล้วกล่อง ⛔ เปิด`)
            else await กดเครื่องมือ(แท็บ, 'false')
          }
        }
      }
      // ⑧ สวิตช์ทำงานและจำค่า ⇒ ตรวจที่จอ 1280 ครั้งเดียว
      if (ข้อ.includes('⑧') && กว้าง === 1280) ตก.push(...(await ตรวจจำค่า(แท็บ, ป้าย)))
    } catch (e) {
      ตก.push(`${ป้าย} ⇒ ด่านล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

/** โหลดหน้าเดิมใหม่ (มาระโก 2) ⇒ ⛔ ใช้ `reload` ⇒ เลื่อนอ่านไปไกลแล้วที่อยู่เปลี่ยนไปบทถัดไปเอง (ข้อ ⑥ เลื่อน 2000 จุด) */
const โหลดใหม่ = (แท็บ) => แท็บ.goto(`${ฐาน}/read/MRK?c=2`, { waitUntil: 'domcontentloaded' })

const นับกาล = (แท็บ) => แท็บ.evaluate(() => document.querySelectorAll('.pk-กล่องคำ.pk-แสดงกาล').length)

async function ตรวจจำค่า(แท็บ, ป้าย) {
  const ตก = []
  await แท็บ.evaluate(() => window.scrollTo(0, 0))
  await กางเครื่องมือภาษาเดิม(แท็บ)
  const ปุ่ม = แท็บ.locator(`${แถว} [data-ปุ่มสัญลักษณ์กาล]`)
  const เดิม = await ปุ่ม.getAttribute('aria-pressed')
  const ก่อน = await นับกาล(แท็บ)
  await ปุ่ม.click()
  const เปลี่ยน = await แท็บ
    .waitForFunction(
      ([s, ด, น]) => document.querySelector(`${s} [data-ปุ่มสัญลักษณ์กาล]`)?.getAttribute('aria-pressed') !== ด && document.querySelectorAll('.pk-กล่องคำ.pk-แสดงกาล').length !== น,
      [แถว, เดิม, ก่อน],
      { timeout: 5000 },
    )
    .then(() => true)
    .catch(() => false)
  if (!เปลี่ยน) return [`${ป้าย} ⇒ ⑧ กดสัญลักษณ์กาลในกล่องแล้ว ปุ่มหรือคำกรีก ⛔ เปลี่ยน (คำที่แสดงกาล ${ก่อน})`]
  const ใหม่ = await ปุ่ม.getAttribute('aria-pressed')
  await โหลดใหม่(แท็บ)
  if (!(await รอพร้อม(แท็บ, 2, true))) return [`${ป้าย} ⇒ ⑧ โหลดหน้าใหม่แล้วหน้า ⛔ พร้อม`]
  await แท็บ.waitForSelector(`${ปุ่มเครื่องมือ}`, { state: 'visible', timeout: รอนานสุด }).catch(() => {})
  // ⚠️ ส่วนเพิ่มของใบ #151 (จำค่ากางพับ) ⇒ ใบ #154 ⇒ กล่องเด้ง ⛔ จำว่าเปิด ⇒ โหลดหน้าใหม่แล้วต้องปิดอยู่ ⇒ ค่าสวิตช์ยังจำ
  const หลังโหลด = await อ่านหัว(แท็บ)
  if (หลังโหลด?.กาง !== 'false' || หลังโหลด?.แถว) ตก.push(`${ป้าย} ⇒ ⑧ โหลดหน้าใหม่แล้วกล่องเครื่องมือเปิดเอง (aria-expanded=${หลังโหลด?.กาง}) ⛔`)
  await กางเครื่องมือภาษาเดิม(แท็บ)
  const หลัง = await แท็บ.locator(`${แถว} [data-ปุ่มสัญลักษณ์กาล]`).getAttribute('aria-pressed')
  if (หลัง !== ใหม่) ตก.push(`${ป้าย} ⇒ ⑧ โหลดหน้าใหม่แล้วสัญลักษณ์กาลกลับเป็น ${หลัง} ⛔ ไม่จำค่า ${ใหม่}`)
  await พับเครื่องมือภาษาเดิม(แท็บ)
  // ⭐ ค่าเดียวกันในหน้าเต็มจอของมือถือ ⇒ หดจอ ⇒ เปิดหน้าเครื่องมือ ⇒ สถานะเดียวกัน
  await แท็บ.setViewportSize({ width: 375, height: 740 })
  await รอสองเฟรม(แท็บ)
  await กางเครื่องมือภาษาเดิม(แท็บ)
  const ในหน้า = await แท็บ
    .waitForSelector(`${กล่องเครื่องมือ}.pk-เต็มจอ [data-ปุ่มสัญลักษณ์กาล]`, { state: 'visible', timeout: รอนานสุด })
    .then((x) => x.getAttribute('aria-pressed'))
    .catch(() => null)
  if (ในหน้า !== ใหม่) ตก.push(`${ป้าย} ⇒ ⑧ หน้าเครื่องมือเต็มจอของจอ 375 บอกสัญลักษณ์กาล ${ในหน้า} ⛔ ไม่ตรงค่าที่เลือกบนจอกว้าง ${ใหม่}`)
  return ตก
}

// ⑩ ปุ่มเลือกทั้งหมด · ล้างทั้งหมด ⇒ จอ 375 (หน้าเต็มจอ) · 1280 (แผงลงมา)
const เปิดแผงเครื่องหมาย = async (แท็บ) =>
  (await กางเครื่องมือภาษาเดิม(แท็บ)) &&
  แท็บ
    .waitForSelector(`${แถว} [data-แผงเครื่องหมาย] input[type="checkbox"]`, { state: 'visible', timeout: 5000 })
    .then(() => true)
    .catch(() => false)
const ช่องที่ติ๊ก = (แท็บ) =>
  แท็บ.evaluate((s) => [...document.querySelectorAll(`${s} [data-แผงเครื่องหมาย] input[type="checkbox"]`)].map((x) => x.checked), แถว)
const ช่องครบเป็น = (แท็บ, ค่า) =>
  แท็บ
    .waitForFunction(
      ([s, v]) => {
        const x = [...document.querySelectorAll(`${s} [data-แผงเครื่องหมาย] input[type="checkbox"]`)]
        return x.length === 8 && x.every((c) => c.checked === v)
      },
      [แถว, ค่า],
      { timeout: 5000 },
    )
    .then(() => true)
    .catch(() => false)

async function ตรวจเลือกทั้งหมด(พัง, { จอ = [375, 1280] } = {}) {
  const ตก = []
  for (const กว้าง of จอ) {
    const ป้าย = `มาระโก 2 จอ ${กว้าง}`
    const { ctx, แท็บ, พร้อม } = await เปิด({ กว้าง, พัง })
    try {
      if (!พร้อม) {
        ตก.push(`${ป้าย} ⇒ หน้า ⛔ ไม่พร้อม`)
        continue
      }
      if (!(await เปิดแผงเครื่องหมาย(แท็บ))) {
        ตก.push(`${ป้าย} ⇒ ⑩ เปิดกลุ่มเครื่องหมายช่วยอ่าน ⛔ ได้`)
        continue
      }
      const ปุ่มของ = (ชื่อ) => แท็บ.locator(แถว).getByRole('button', { name: ชื่อ, exact: true })
      if ((await ปุ่มของ(ชื่อปุ่มเลือกทั้งหมด).count()) !== 1 || (await ปุ่มของ(ชื่อปุ่มล้างทั้งหมด).count()) !== 1) {
        ตก.push(`${ป้าย} ⇒ ⑩ ⛔ ได้ยินปุ่ม «${ชื่อปุ่มเลือกทั้งหมด}» กับ «${ชื่อปุ่มล้างทั้งหมด}» ในกล่องครบคู่`)
        continue
      }
      for (const ชื่อ of [ชื่อปุ่มเลือกทั้งหมด, ชื่อปุ่มล้างทั้งหมด]) {
        const b = await ปุ่มของ(ชื่อ).boundingBox()
        if (!b || b.width < 44 - 0.01 || b.height < 44 - 0.01) ตก.push(`${ป้าย} ⇒ ⑩ ปุ่ม ${ชื่อ} ${b ? `${b.width.toFixed(0)}×${b.height.toFixed(0)}` : 'ไม่เห็น'} จุด ⛔ ถึง 44`)
      }
      await ปุ่มของ(ชื่อปุ่มล้างทั้งหมด).focus()
      await แท็บ.keyboard.press('Enter')
      if (!(await ช่องครบเป็น(แท็บ, false))) ตก.push(`${ป้าย} ⇒ ⑩ Enter ที่ «${ชื่อปุ่มล้างทั้งหมด}» แล้วช่องติ๊ก ⛔ ว่างครบ 8 ⇒ ${JSON.stringify(await ช่องที่ติ๊ก(แท็บ))}`)
      await โหลดใหม่(แท็บ)
      await รอพร้อม(แท็บ, 2, true)
      await เปิดแผงเครื่องหมาย(แท็บ)
      const หลังล้าง = await ช่องที่ติ๊ก(แท็บ)
      if (หลังล้าง.length !== 8 || หลังล้าง.some(Boolean)) ตก.push(`${ป้าย} ⇒ ⑩ ล้างทั้งหมดแล้วโหลดหน้าใหม่ ⇒ ช่องติ๊ก ${JSON.stringify(หลังล้าง)} ⛔ ไม่จำค่า`)
      await ปุ่มของ(ชื่อปุ่มเลือกทั้งหมด).focus()
      await แท็บ.keyboard.press(' ')
      if (!(await ช่องครบเป็น(แท็บ, true))) ตก.push(`${ป้าย} ⇒ ⑩ เว้นวรรคที่ «${ชื่อปุ่มเลือกทั้งหมด}» แล้วช่องติ๊ก ⛔ ติ๊กครบ 8 ⇒ ${JSON.stringify(await ช่องที่ติ๊ก(แท็บ))}`)
      await โหลดใหม่(แท็บ)
      await รอพร้อม(แท็บ, 2, true)
      await เปิดแผงเครื่องหมาย(แท็บ)
      const หลังเลือก = await ช่องที่ติ๊ก(แท็บ)
      if (หลังเลือก.length !== 8 || !หลังเลือก.every(Boolean)) ตก.push(`${ป้าย} ⇒ ⑩ เลือกทั้งหมดแล้วโหลดหน้าใหม่ ⇒ ช่องติ๊ก ${JSON.stringify(หลังเลือก)} ⛔ ไม่จำค่า`)
      if (!พัง) console.log(`   ⑩ ${ป้าย} ⇒ หลังโหลดใหม่ ⇒ ล้างแล้วติ๊ก ${หลังล้าง.filter(Boolean).length}/8 · เลือกแล้วติ๊ก ${หลังเลือก.filter(Boolean).length}/8`)
    } catch (e) {
      ตก.push(`${ป้าย} ⇒ ⑩ ด่านล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

// ⑨ ฮีบรู ⇒ ปุ่มเฟืองมีสวิตช์ตัวเดิมอย่างเดียว ⇒ ⛔ มีปุ่ม i ⛔ มีสัญลักษณ์กาลหรือเครื่องหมาย ⛔ มีหมวดในหน้า Aa
async function ตรวจฮีบรู() {
  const ตก = []
  for (const กว้าง of [1280, 375]) {
    const { ctx, แท็บ, พร้อม } = await เปิด({ เล่ม: 'RUT', บท: 1, กว้าง })
    try {
      if (!พร้อม) {
        ตก.push(`นางรูธ 1 จอ ${กว้าง} ⇒ หน้า ⛔ ไม่พร้อม`)
        continue
      }
      if (await แท็บ.locator(ปุ่มคำอธิบาย).count()) ตก.push(`นางรูธ 1 จอ ${กว้าง} ⇒ ⑨ คำฮีบรูมีปุ่ม i ⛔ (ไม่มีสัญลักษณ์ให้อธิบาย)`)
      if ((await แท็บ.locator(`${ปุ่มเครื่องมือ}:visible`).count()) !== 1) ตก.push(`นางรูธ 1 จอ ${กว้าง} ⇒ ⑨ คำฮีบรู ⛔ มีปุ่มเฟืองที่ตาเห็น 1 ปุ่ม (ต้องมีสวิตช์ตัวเดิม)`)
      else if (!(await กดเครื่องมือ(แท็บ, 'true'))) ตก.push(`นางรูธ 1 จอ ${กว้าง} ⇒ ⑨ กดปุ่มเฟืองของคำฮีบรูแล้ว ⛔ เปิด`)
      else {
        const ใน = await แท็บ.evaluate((s) => {
          const ก = document.querySelector(s)
          return ก
            ? {
                สวิตช์: ก.querySelectorAll('input[type="checkbox"][data-สวิตช์="ตัวเดิม"]').length,
                ของกรีก: ก.querySelectorAll('[data-ปุ่มสัญลักษณ์กาล], [data-แผงเครื่องหมาย]').length,
              }
            : null
        }, แถว)
        if (!ใน) ตก.push(`นางรูธ 1 จอ ${กว้าง} ⇒ ⑨ กดปุ่มเฟืองแล้ว ⛔ มีกล่อง`)
        else {
          if (ใน.สวิตช์ !== 1) ตก.push(`นางรูธ 1 จอ ${กว้าง} ⇒ ⑨ กล่องเฟืองของคำฮีบรูมีสวิตช์ตัวเดิม ${ใน.สวิตช์} ช่อง ⛔ ไม่ใช่ 1`)
          if (ใน.ของกรีก) ตก.push(`นางรูธ 1 จอ ${กว้าง} ⇒ ⑨ กล่องเฟืองของคำฮีบรูมีสัญลักษณ์กาลหรือเครื่องหมาย ⛔ (ฮีบรูยังไม่มีข้อมูล)`)
        }
        await แท็บ.keyboard.press('Escape')
      }
      if (กว้าง < 768) {
        await กางแผงAa(แท็บ)
        if (await แท็บ.locator('#pk-แผงAa [data-หมวด="เครื่องมือภาษาเดิม"]').count()) ตก.push(`นางรูธ 1 จอ ${กว้าง} ⇒ ⑨ หน้า Aa มีหมวดเครื่องมือภาษาเดิมของคำฮีบรู ⛔`)
      }
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

// ---------------------------------------------------------------- ของพังที่ยัดในโหมดพิสูจน์ ⇒ ⛔ ไม่ใช่ของที่อยู่ในเว็บจริง
const ของพัง = {
  // ① หน้าเครื่องมือเป็นกล่องเล็กเด้ง ⛔ หน้าเต็มจอ
  กล่องเล็กเด้ง: {
    css: `${กล่องเครื่องมือ}.pk-เต็มจอ { position: fixed !important; inset: auto !important; top: 40% !important; right: 0 !important; width: 14rem !important; max-height: 40vh !important; padding: 0.5rem !important; }`,
  },
  // ① ใบ #153 ⇒ หน้าแบบใบ #151 ⇒ คลุมทั้งจอแล้วดันของลงด้วยขอบใน
  คลุมแถบแบบเดิม: {
    css: `${กล่องเครื่องมือ}.pk-เต็มจอ { top: 0 !important; padding-top: calc(var(--pk-ใต้แถบบน, 4rem) + 0.5rem) !important; }`,
  },
  // ① หมวดเดิมกลับมาในหน้า Aa
  หมวดกลับมาในAa: {
    js: () => {
      new MutationObserver(() => {
        const ก = document.getElementById('pk-แผงAa')
        if (ก && !ก.querySelector('[data-หมวด="เครื่องมือภาษาเดิม"]')) {
          const d = document.createElement('div')
          d.setAttribute('data-หมวด', 'เครื่องมือภาษาเดิม')
          ก.append(d)
        }
      }).observe(document.body, { childList: true, subtree: true })
    },
  },
  // ② กล่องไม่มีชื่อที่ได้ยิน
  กลุ่มไม่มีชื่อ: {
    js: () => {
      new MutationObserver(() => document.querySelector('#pk-เครื่องมือภาษาเดิม[aria-labelledby]')?.removeAttribute('aria-labelledby')).observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
      })
    },
  },
  // ② เครื่องหมายช่วยอ่านพับอยู่ ⇒ ต้องกดก่อนถึงเห็นช่องติ๊ก
  เครื่องหมายพับ: { css: `${กล่องเครื่องมือ} .pk-แผงเครื่องหมาย label { display: none !important; }` },
  // ③ ปิดด้วย × แล้ว ⛔ พากลับข้อเดิม ⇒ ถอดการเลื่อนกลับ
  ไม่พากลับ: {
    ก่อนกลับ: () => {
      window.scrollTo = () => {}
    },
  },
  // ③ ⛔ มีปุ่ม ×
  ปุ่มปิดหาย: { css: `${กล่องเครื่องมือ} .pk-ปุ่มปิดกล่อง { display: none !important; }` },
  // ③ ปุ่ม *กลับไปอ่าน* กลับมา ⇒ ยัดปุ่มชื่อเดิมไว้บนสุดของหน้า
  กลับไปอ่านกลับมา: {
    js: () => {
      const b = document.createElement('button')
      b.textContent = 'กลับไปอ่าน'
      b.className = 'pk-ปุ่มแถบ'
      b.setAttribute('data-ปุ่ม', 'กลับไปอ่าน')
      new MutationObserver(() => {
        const ก = document.getElementById('pk-เครื่องมือภาษาเดิม')
        if (ก && !ก.contains(b)) ก.prepend(b)
      }).observe(document.body, { childList: true, subtree: true })
    },
  },
  // ④ ปุ่มเฟืองตกลงแถวที่ 2 ของหัวทั้งที่พอแถวเดียว
  หัวสองแถว: { css: '.pk-หัวช่อง > .pk-ปุ่มตอนเทียบ { flex-wrap: wrap !important; } .pk-หัวช่อง > .pk-ปุ่มตอนเทียบ > .pk-ปุ่มคำเดิมบนหัว { flex-basis: 100% !important; }' },
  // ④ ปุ่มเตี้ย
  ปุ่มเตี้ย: { css: '[data-ปุ่ม="เครื่องมือภาษาเดิม"] { min-height: 30px !important; height: 30px !important; }' },
  // ④ ปุ่มมีคำบนจอ ⛔ รูปอย่างเดียว
  ปุ่มมีคำ: {
    js: () => {
      for (const b of document.querySelectorAll('[data-ปุ่ม="เครื่องมือภาษาเดิม"]')) b.append(document.createTextNode('เครื่องมือ'))
    },
  },
  // ⑤ ปุ่ม ⛔ เปลี่ยนหน้าตาตอนเปิด
  สถานะไม่ต่าง: { css: '.pk-หัวช่อง .pk-ปุ่มรูป[aria-expanded="true"] { background: var(--color-pk-sheet) !important; color: var(--color-pk-ink) !important; }' },
  // ④ ⑤ ⛔ บอกสถานะ ⇒ ถอด aria-expanded ทุกครั้งที่ Vue ใส่กลับ
  ไม่บอกสถานะ: {
    js: () => {
      const ถอด = () => document.querySelectorAll('[data-ปุ่ม="เครื่องมือภาษาเดิม"][aria-expanded]').forEach((x) => x.removeAttribute('aria-expanded'))
      new MutationObserver(ถอด).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['aria-expanded'] })
      ถอด()
    },
  },
  // ⑤ กล่องดันหัว ⇒ อยู่ในผังของหัว ⛔ ลอย
  แผงดันหัว: { css: '.pk-แผงคำเดิม:not(.pk-เต็มจอ) { position: static !important; }' },
  // ⑥ กล่องอยู่ในผังของหน้าเหนือตัวบท ⇒ เลื่อนหายไปกับต้นบท
  แผงเลื่อนหาย: {
    js: () => {
      new MutationObserver(() => {
        const ร = document.querySelector('.pk-แผงคำเดิม:not(.pk-เต็มจอ)')
        const บท = document.querySelector('.pk-ฝั่งหลัก > .pk-ตัวบท')
        if (ร && บท && ร.nextElementSibling !== บท) {
          ร.style.setProperty('position', 'static', 'important')
          บท.before(ร)
        }
      }).observe(document.body, { subtree: true, childList: true })
    },
  },
  // ④ ตั้งต้นเปิด ⇒ หน้าตาของส่วนเพิ่มใบ #151 ⇒ เปิดหน้ามากล่องเปิดอยู่
  ตั้งต้นเปิด: {
    js: () => document.querySelector('[data-ปุ่ม="เครื่องมือภาษาเดิม"][aria-expanded="false"]')?.click(),
  },
  // ⑥ แผงเครื่องหมายหลุดออกนอกจอตอนเลื่อน
  แผงหลุดตอนเลื่อน: { css: '.pk-แผงคำเดิม .pk-แผงเครื่องหมาย { position: absolute !important; top: 100vh !important; }' },
  // ⑧ ⛔ จำค่าสัญลักษณ์กาล ⇒ ตัดค่าทิ้งทุกครั้งที่เว็บจำมุมมอง
  ลืมสัญลักษณ์กาล: {
    ก่อนโหลด: () => {
      const เดิม = Storage.prototype.setItem
      Storage.prototype.setItem = function (k, v) {
        if (k === 'phrakham.view') {
          try {
            const ม = JSON.parse(v)
            delete ม.สัญลักษณ์กาล
            v = JSON.stringify(ม)
          } catch {}
        }
        return เดิม.call(this, k, v)
      }
    },
  },
  // ⑩ ปุ่มล้างทั้งหมดกดแล้วเงียบ
  ล้างเงียบ: {
    ก่อนโหลด: () => {
      const ดัก = (e) => {
        if (e.target?.closest?.('[data-ปุ่ม="ล้างเครื่องหมายทั้งหมด"]')) {
          e.stopImmediatePropagation()
          e.preventDefault()
        }
      }
      window.addEventListener('click', ดัก, true)
      window.addEventListener('keydown', (e) => (e.key === 'Enter' || e.key === ' ') && ดัก(e), true)
    },
  },
  // ⑩ ปุ่มทั้งกลุ่มเตี้ย
  ปุ่มทั้งกลุ่มเตี้ย: { css: '.pk-ปุ่มทั้งกลุ่ม .pk-ปุ่มขนาด { min-height: 30px !important; height: 30px !important; }' },
  // ⑦ Escape ⛔ ปิด
  Escไม่พับ: {
    js: () => window.addEventListener('keydown', (e) => e.key === 'Escape' && e.stopImmediatePropagation(), true),
  },
}

// ---------------------------------------------------------------- วิ่ง
if (!ทดสอบตัวเอง) {
  for (const [ชื่อ, ทำ] of [
    ['มือถือ ⇒ หน้าเครื่องมือเต็มจอใต้แถบบน · ของในหน้า · หน้า Aa ⛔ มีหมวดเดิม · ปิดด้วย × (ข้อ ①②③)', () => ตรวจมือถือ()],
    ['จอกว้าง ⇒ ปุ่มเฟือง · เปิดปิด · หนึบ · แป้นพิมพ์ · จำค่า (ข้อ ④–⑧)', () => ตรวจจอกว้าง()],
    ['ฮีบรู ⇒ เฟืองมีสวิตช์ตัวเดิมอย่างเดียว (ข้อ ⑨)', () => ตรวจฮีบรู()],
    ['เลือกทั้งหมด · ล้างทั้งหมด (ข้อ ⑩)', () => ตรวจเลือกทั้งหมด()],
  ]) {
    const ตก = await ทำ()
    ที่ตก.push(...ตก)
    console.log(`${ตก.length ? '⛔' : '✅'} ${ชื่อ}`)
    for (const x of ตก.slice(0, 40)) console.log(`   ${x}`)
  }
} else {
  // ⭐ ยัดของพังทีละชิ้น ⇒ ข้อของมันต้องแดง ⇒ วิ่งเฉพาะจอและข้อที่ของพังนั้นแสดงตัว ⇒ ⛔ วิ่งทั้งชุดซ้ำ
  //   ⇒ ⭐ ชุด ⇒ งานในท่อ 2 งาน ⇒ ตารางบอกเองว่าท่าไหนอยู่ชุดไหน ⇒ ตรวจว่าทุกท่ามีชุดเดียว (ท่าเดียวกับด่านหัวติดด้านบนจอแคบ)
  const พิสูจน์ = [
    ['กล่องเล็กเด้ง', 1, () => ตรวจมือถือ(ของพัง.กล่องเล็กเด้ง, { จอ: [375], ข้อ: ['①'] }), '① หน้าเครื่องมือ ⛔ เต็มจอ'],
    ['คลุมแถบแบบเดิม', 1, () => ตรวจมือถือ(ของพัง.คลุมแถบแบบเดิม, { จอ: [344], ข้อ: ['①'] }), '① หน้าเครื่องมือ ⛔ เต็มจอใต้แถบบน'],
    ['หมวดกลับมาในAa', 1, () => ตรวจมือถือ(ของพัง.หมวดกลับมาในAa, { จอ: [320], ข้อ: ['①'] }), '① หน้า Aa ยังมีหมวด'],
    ['กลุ่มไม่มีชื่อ', 1, () => ตรวจมือถือ(ของพัง.กลุ่มไม่มีชื่อ, { จอ: [375], ข้อ: ['②'] }), '② โปรแกรมอ่านหน้าจอ ⛔ ได้ยินกลุ่มชื่อ'],
    ['เครื่องหมายพับ', 1, () => ตรวจมือถือ(ของพัง.เครื่องหมายพับ, { จอ: [320], ข้อ: ['②'] }), '② ช่องติ๊กเครื่องหมายช่วยอ่าน'],
    ['ไม่พากลับ', 1, () => ตรวจมือถือ(ของพัง.ไม่พากลับ, { จอ: [375], ข้อ: ['③'] }), '③ ปิดด้วย × แล้วข้อ 2:12'],
    ['ปุ่มปิดหาย', 1, () => ตรวจมือถือ(ของพัง.ปุ่มปิดหาย, { จอ: [320], ข้อ: ['③'] }), '③ ⛔ มีปุ่ม ×'],
    ['กลับไปอ่านกลับมา', 1, () => ตรวจมือถือ(ของพัง.กลับไปอ่านกลับมา, { จอ: [344], ข้อ: ['③'] }), '③ ยังมีปุ่ม «กลับไปอ่าน»'],
    ['หัวสองแถว', 2, () => ตรวจจอกว้าง(ของพัง.หัวสองแถว, { จอ: [768], ข้อ: ['④'] }), '④ หัวคอลัมน์ภาษาเดิม ⛔ แถวเดียว'],
    ['ปุ่มเตี้ย', 2, () => ตรวจจอกว้าง(ของพัง.ปุ่มเตี้ย, { จอ: [1280], ข้อ: ['④'] }), '⛔ เล็กกว่า 44'],
    ['ปุ่มมีคำ', 2, () => ตรวจจอกว้าง(ของพัง.ปุ่มมีคำ, { จอ: [860], ข้อ: ['④'] }), '④ ปุ่มเฟืองมีคำบนจอ'],
    ['สถานะไม่ต่าง', 2, () => ตรวจจอกว้าง(ของพัง.สถานะไม่ต่าง, { จอ: [860], ข้อ: ['⑤'] }), '⑤ เปิดแล้วปุ่มเฟือง ⛔ เปลี่ยนหน้าตา'],
    ['ไม่บอกสถานะ', 2, () => ตรวจจอกว้าง(ของพัง.ไม่บอกสถานะ, { จอ: [1280], ข้อ: ['④'] }), 'aria-expanded'],
    ['แผงดันหัว', 2, () => ตรวจจอกว้าง(ของพัง.แผงดันหัว, { จอ: [1280], ข้อ: ['⑤'] }), '⑤ เปิดแล้วหัวสูงขึ้น'],
    ['แผงเลื่อนหาย', 2, () => ตรวจจอกว้าง(ของพัง.แผงเลื่อนหาย, { จอ: [1280], ข้อ: ['⑥'] }), '⑥ เลื่อนอ่านแล้วกล่องที่เปิด'],
    ['Escไม่พับ', 2, () => ตรวจจอกว้าง(ของพัง.Escไม่พับ, { จอ: [860], ข้อ: ['⑦'] }), '⑦ Escape'],
    ['ตั้งต้นเปิด', 2, () => ตรวจจอกว้าง(ของพัง.ตั้งต้นเปิด, { จอ: [1280], ข้อ: ['④'] }), '④ เปิดหน้ามากล่องเครื่องมือเปิดอยู่'],
    ['แผงหลุดตอนเลื่อน', 2, () => ตรวจจอกว้าง(ของพัง.แผงหลุดตอนเลื่อน, { จอ: [1280], ข้อ: ['⑥'] }), '⑥ เลื่อนลง 2000 จุดแล้วช่องติ๊ก'],
    ['ลืมสัญลักษณ์กาล', 2, () => ตรวจจอกว้าง(ของพัง.ลืมสัญลักษณ์กาล, { จอ: [1280], ข้อ: ['⑧'] }), '⑧ โหลดหน้าใหม่แล้วสัญลักษณ์กาล'],
    ['ล้างเงียบ', 1, () => ตรวจเลือกทั้งหมด(ของพัง.ล้างเงียบ, { จอ: [375] }), '⑩ Enter ที่'],
    ['ปุ่มทั้งกลุ่มเตี้ย', 1, () => ตรวจเลือกทั้งหมด(ของพัง.ปุ่มทั้งกลุ่มเตี้ย, { จอ: [1280] }), '⛔ ถึง 44'],
  ]
  // ⭐ ทุกท่ามีชุดเดียวที่เป็น 1 หรือ 2 ⇒ ท่าที่ไม่มีชุดจะหลุดจากทั้งสองงานแบบเงียบ ⇒ แดงตรงนี้แทน
  for (const [ท่า, ชุด] of พิสูจน์) if (![1, 2].includes(ชุด)) ที่ตก.push(`โหมดพิสูจน์ ${ท่า} ⇒ ⛔ มีชุด 1 หรือ 2`)
  for (const [ท่า, ชุด, ทำ, คำ] of พิสูจน์) {
    if (ชุดที่ขอ && ชุด !== ชุดที่ขอ) continue
    const ตก = await ทำ()
    const จับได้ = ตก.some((x) => x.includes(คำ))
    console.log(`${จับได้ ? '✅' : '⛔'} โหมดพิสูจน์ ${ท่า} ⇒ ด่าน${จับได้ ? 'จับได้' : '⛔ จับไม่ได้'}`)
    if (!จับได้) {
      ที่ตก.push(`โหมดพิสูจน์ ${ท่า} ⇒ ยัดของพังแล้วด่าน ⛔ ไม่แดงด้วยข้อที่คู่กัน (${คำ})`)
      for (const x of ตก.slice(0, 5)) console.log(`   ${x}`)
    }
  }
}

await เบราว์เซอร์.close()

if (ที่ตก.length) {
  console.log(`\n⛔ ด่านเครื่องมือภาษาเดิมแดง — ${ที่ตก.length} เรื่อง`)
  for (const x of ที่ตก.slice(0, 60)) console.log(`  · ${x}`)
  process.exit(1)
}
console.log(ทดสอบตัวเอง ? '\n✅ ด่านเครื่องมือภาษาเดิมยังจับของพังได้ครบทุกท่า' : '\n✅ ด่านเครื่องมือภาษาเดิมเขียว')
