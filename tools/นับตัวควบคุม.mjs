// นับ **ตัวควบคุมที่ผู้อ่านต้องเจอ** บนหน้าอ่าน — ใช้กับรุ่น 2 และรุ่น 3 **ด้วยวิธีเดียวกันเป๊ะ**
//
// **ทำไมต้องมี** — ใบงาน v3/phrakham#24 เกณฑ์ผ่านข้อ 5 สั่งว่า
//   *"นับจำนวนตัวควบคุมที่เห็นตอนเปิดหน้า และตอนเปิดครบ ⇒ ต้องน้อยกว่าของเดิม"*
//
// ⛔⛔ **ห้ามนับจากโค้ด** — โค้ดบอกว่ามีปุ่มกี่ตัว ⛔ ไม่ได้บอกว่าผู้อ่าน**เห็น**กี่ตัว
//   ปุ่มที่ซ่อนอยู่ ปุ่มที่ซ้อนกัน ปุ่มที่จอแคบไม่แสดง ⇒ **ตาเครื่องที่เปิดหน้าจริงเท่านั้นที่ตอบได้**
//
// ⭐⭐ **สคริปต์เดียวใช้ทั้ง 2 รุ่น** — คนละสคริปต์เมื่อไร ตัวเลขก็เทียบกันไม่ได้อีกเลย
//
// **นับอะไรว่าเป็นตัวควบคุม** ⇒ ของที่ผู้อ่าน **สั่งงานได้** ⛔ ไม่ใช่ลิงก์ที่พาไปหน้าอื่น
//   ⇒ `button` · `input` (ที่ไม่ใช่ชนิดซ่อน) · `select` · `textarea` · `summary`
//     และของที่สวมบทเหล่านั้นด้วยป้าย `role`
//   ⇒ ⛔ **ลิงก์ ⛔ ไม่นับ** — ลิงก์คือทางเดิน ⛔ ไม่ใช่ปุ่มที่ต้องตัดสินใจกด
//
// **2 ตัวเลขที่รายงาน**
//   **ก. ตอนเปิดหน้า** ⇒ นับของที่ **ตาเห็นทันที** ที่โหลดเสร็จ ⛔ ยังไม่กดอะไรเลย
//   **ข. เปิดครบ** ⇒ ก. บวกของที่โผล่ออกมาเมื่อผู้อ่าน **กางทุกกล่องที่กางได้**
//     ⇒ ⭐ นับตัวเดียวกันซ้ำไม่ได้ ⇒ ใช้ตัวตนของชิ้นส่วนเป็นกุญแจ ⛔ ไม่ใช่นับจำนวนครั้ง
//
// ⚠️ **ตัวเลข 16 กับ 22 ในใบงาน #18 นับคนละวิธีกับที่นี่**
//   ใบนั้นนับ **ปุ่มบนแถบ** ⛔ ไม่ได้นับช่องติ๊กกับปุ่มตัวเลือกที่อยู่ในเมนูที่กางออกมา
//   ⇒ ที่นี่จึงได้เลขสูงกว่า ⇒ **ใช้เทียบรุ่น 2 กับรุ่น 3 เท่านั้น** ⛔ อย่าเอาไปเทียบกับเลขในใบ #18
//
//   node tools/นับตัวควบคุม.mjs <ที่อยู่หน้า> [ชื่อที่จะพิมพ์]

import { chromium } from 'playwright'

const ที่อยู่ = process.argv[2]
const ชื่อ = process.argv[3] || ที่อยู่
if (!ที่อยู่) {
  console.error('⛔ ต้องบอกที่อยู่หน้าที่จะนับ ⇒ node tools/นับตัวควบคุม.mjs <ที่อยู่> [ชื่อ]')
  process.exit(2)
}

const เลือกด้วย = [
  'button',
  'input:not([type="hidden"])',
  'select',
  'textarea',
  'summary',
  '[role="button"]',
  '[role="tab"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
  '[role="slider"]',
].join(',')

// ของที่ผู้อ่านมองเห็นจริง ⇒ ⛔ ไม่ใช่แค่มีอยู่ใน DOM
const นับ = (sel) => {
  const เห็นไหม = (el) => {
    if (!el.getClientRects().length) return false
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return false
    return true
  }
  const ป้าย = (el) =>
    (
      el.getAttribute('aria-label') ||
      el.getAttribute('title') ||
      (el.labels && el.labels[0] && el.labels[0].innerText) ||
      el.innerText ||
      el.getAttribute('placeholder') ||
      el.id ||
      el.tagName
    )
      .toString()
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 45)
  const ทั้งหมด = [...document.querySelectorAll(sel)]
  const เห็น = ทั้งหมด.filter(เห็นไหม)
  // ทำเครื่องหมายไว้ที่ชิ้นส่วนเอง ⇒ รอบต่อไปจะได้รู้ว่าตัวไหนเคยนับแล้ว
  เห็น.forEach((el) => el.setAttribute('data-นับแล้ว', '1'))
  return { จำนวน: เห็น.length, รายการ: เห็น.map(ป้าย) }
}

const เบราว์เซอร์ = await chromium.launch()
// 1280 จุด ⇒ จอคอม ⇒ แถบไม่ยุบเข้าเมนู ⇒ เห็นของครบที่สุด
const ctx = await เบราว์เซอร์.newContext({ viewport: { width: 1280, height: 1000 } })
const แท็บ = await ctx.newPage()
await แท็บ.goto(ที่อยู่, { waitUntil: 'domcontentloaded' })
await แท็บ.waitForLoadState('networkidle').catch(() => {})
await แท็บ.waitForTimeout(1500)

const ก = await แท็บ.evaluate(นับ, เลือกด้วย)

// --- กางทุกกล่องที่กางได้ แล้วนับของที่โผล่เพิ่ม ---
// ⭐ กดทีละอัน แล้วนับทันที ⇒ เมนูบางชุดปิดกันเอง ⇒ รอกดครบแล้วค่อยนับจะนับไม่ครบ
const เพิ่ม = []
const ตัวกาง = await แท็บ.$$('[aria-expanded], [aria-haspopup], summary, details')
for (const t of ตัวกาง) {
  try {
    await t.click({ timeout: 1500 })
    await แท็บ.waitForTimeout(250)
    const ผล = await แท็บ.evaluate((sel) => {
      const เห็นไหม = (el) => {
        if (!el.getClientRects().length) return false
        const cs = getComputedStyle(el)
        return cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity !== 0
      }
      const ป้าย = (el) =>
        (
          el.getAttribute('aria-label') ||
          el.getAttribute('title') ||
          (el.labels && el.labels[0] && el.labels[0].innerText) ||
          el.innerText ||
          el.getAttribute('placeholder') ||
          el.id ||
          el.tagName
        )
          .toString()
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 45)
      const ใหม่ = [...document.querySelectorAll(sel)].filter(
        (el) => เห็นไหม(el) && !el.hasAttribute('data-นับแล้ว'),
      )
      ใหม่.forEach((el) => el.setAttribute('data-นับแล้ว', '1'))
      return ใหม่.map(ป้าย)
    }, เลือกด้วย)
    เพิ่ม.push(...ผล)
    await แท็บ.keyboard.press('Escape').catch(() => {})
    await แท็บ.waitForTimeout(150)
  } catch {
    // กดไม่ได้ (โดนบัง หรือหายไปแล้ว) ⇒ ข้าม ⛔ ไม่ทำให้ทั้งการนับล้ม
  }
}

await ctx.close()
await เบราว์เซอร์.close()

console.log(`\n=== ${ชื่อ} ===`)
console.log(`ก. เห็นตอนเปิดหน้า  ${ก.จำนวน} ตัว`)
for (const x of ก.รายการ) console.log(`     · ${x}`)
console.log(`ข. โผล่เพิ่มเมื่อกางทุกกล่อง  ${เพิ่ม.length} ตัว`)
for (const x of เพิ่ม) console.log(`     + ${x}`)
console.log(`⇒ รวมเปิดครบ  ${ก.จำนวน + เพิ่ม.length} ตัว`)
