// ด่านตรวจ — **เส้นแบ่งคอลัมน์บนหัวกับในตัวบทอยู่แนวเดียวกัน** (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/158)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// ## ทำไมต้องมี
//   ⇒ @krisada ส่งภาพจากจอพับ 8 พ.ย. 2569 ⇒ *"ผมว่าเส้นแบ่งสีน้ำตาลควรเป็นแนวเดียวกันนะในหัวและเนื้อหา"*
//   ⇒ จอ 407 TCV + คำภาษาเดิม ไหลต่อเนื่อง ⇒ เส้นบนหัว 203 · เส้นในตัวบท 230 ⇒ หัวกับเนื้อดูเป็นคนละตาราง
//   ⇒ ต้นเหตุ ⇒ ตอนหัวตรงคอลัมน์ไม่พอ (`pk-หัวเต็มแถว`) แถวหัวแบ่งทั้งแถวเท่ากัน ⇒ แต่ตัวบทยังมีช่องเลขข้อ
//     ⇒ ฉบับแปลล้วนก็เป็น ⇒ จอ 375 TCV กับ THKJV แยกตามข้อ ⇒ เส้นบนหัว 187 · ในตัวบท 214
//   ⇒ `tools/ด่านเส้นแบ่งคอลัมน์.mjs` ⛔ จับไม่ได้ ⇒ ข้อ ① ดูว่าเส้นบนหัวอยู่กลางช่องระหว่างหัว · ข้อ ③ ดูว่าเส้นในตัวบทอยู่กลางช่องระหว่างคอลัมน์
//     ⇒ ⛔ ไม่มีข้อไหนเทียบสองแถวกัน ⇒ ด่านนี้เติมข้อนั้น
//
// ## ตรวจอะไร ⇒ วัดเส้นที่เบราว์เซอร์วาดจริงบนหน้าที่สร้างเสร็จ ⛔ ไม่ได้อ่าน CSS
//   เส้น = `::before` `::after` ที่ลอย (`absolute`) กว้างไม่เกิน 2 จุด สูงอย่างน้อย 8 จุด สีเดียวกับ `--pk-สีเส้นคอลัมน์`
//     ⇒ ตำแหน่งคิดท่าเดียวกับ `tools/ด่านเส้นแบ่งคอลัมน์.mjs` (กล่องอ้างอิง · ช่องของตารางที่ระบุ) ⇒ บวกขอบนอกของเส้นด้วย
//   ① **เส้นบนหัวทุกเส้น ⇒ มีเส้นในตัวบทที่ตาเห็นอยู่ห่างไม่เกิน 1 จุด** (ใบข้อ 1 · 1.1)
//   ② **เส้นในตัวบทที่ตาเห็นทุกเส้น ⇒ มีเส้นบนหัวห่างไม่เกิน 1 จุด** (ใบข้อ 1 · 1.1) ⇒ หัวขาดเส้น หรือหัวแคบกว่าเนื้อจนเส้นหนี
//      ⇒ *ตาเห็น* = ช่วงระหว่างขอบล่างของหัวที่หนึบ ถึงขอบบนของแถบล่าง
//   ③ **วัดสองตอน** (ใบข้อ 1.4) ⇒ หน้าเพิ่งเปิด · เลื่อนลงกลางบท (หัวหนึบอยู่ใต้แถบบน)
//   ④ **ปุ่มบนหัว ≥ 44 × 44 · อยู่ในจอ · หน้า ⛔ เลื่อนข้าง** (ใบข้อ 2) ⇒ ของที่ใบนี้แตะต้องไม่ทำให้หัวแคบจนปุ่มหดหรือล้น
//   ⑤ **ต้องมีอะไรให้เทียบ** ⇒ คอลัมน์วางข้างกัน (ซ้ายขวา · จอกว้าง) แต่ ⛔ เจอเส้นเลย ⇒ แดง ⇒ ⛔ ผ่านเพราะวัดไม่ได้
//      ⇒ บนล่าง · ทีละฉบับ ⇒ ตัวบท ⛔ มีคอลัมน์ข้างกัน ⇒ ⛔ มีเส้นให้เทียบ ⇒ นับแยกแล้วพิมพ์บอก (จอ 320 ทุกชุด · 200% จอแคบหลายชุด)
//   ⇒ จอ 320 · 344 · 375 · 407 · 412 · 484 · 767 · 768 · 884 · 1280 × ตัวอักษร 100% · 200% (ใบข้อ 1.3)
//     × ไหลต่อเนื่อง · แยกตามข้อ · แยกตามย่อหน้า (ใบข้อ 1.2) × ชุดคอลัมน์ใน `ชุดทั้งหมด` (ฉบับแปลล้วน 2 · 3 ฉบับ · คำเดิม 1–3 ฉบับ · คำเดิมก่อน)
//   ⇒ ⭐ **ฉบับแปลคู่ (TCV กับ LSV) คือชุดเทียบ** ⇒ พี่เอมเห็นว่าตรงอยู่แล้ว ⇒ ต้องเขียวต่อไป
//
// ## วิธีพิสูจน์ว่าด่านนี้แดงได้จริง
//
//   node tools/ด่านเส้นหัวตรงเนื้อ.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง [--ชุด=1|2]
//
//   ⇒ ยัดของพังทีละท่า (`ของพัง`) ⇒ แต่ละท่าต้องแดงด้วยข้อของมัน ⇒ ⛔ แดง = ด่านพัง
//   ⇒ แต่ละท่าวัดเฉพาะชุดที่อาการโผล่ ⇒ ⛔ ไม่ใช่การผ่อน ⇒ ชุดเต็มวิ่งตอนตรวจของจริง
//   ⇒ `--ชุด` แบ่งท่าเป็น 2 งานในท่อ ⇒ ⛔ ชนเพดาน 10 นาที
//   ⇒ ชี้ด่านไปที่เว็บก่อนใบนี้ (main 5faf6cf) ⇒ ต้องแดงที่ ① ② ⇒ ทำแล้วในเครื่อง ⇒ ผลอยู่ในคำขอรวม
//
//   node tools/ด่านเส้นหัวตรงเนื้อ.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import { เส้นทางเว็บ } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const ชุดที่ขอ = Number((process.argv.find((x) => x.startsWith('--ชุด=')) || '').split('=')[1] || 0)
const รอนานสุด = 30000
const ห่างได้ = 1 // ใบข้อ 1 ⇒ ห่างกันไม่เกิน 1 จุด
const เป้า = 44
const พร้อมกัน = 4 // เปิดหน้าพร้อมกันกี่แท็บ ⇒ ทั้งชุดจบในเพดานของงาน

const จอทั้งหมด = [320, 344, 375, 407, 412, 484, 767, 768, 884, 1280]
const ขนาดทั้งหมด = [1, 2]
const จัดวางทั้งหมด = ['แยกตามข้อ', 'ไหลต่อเนื่อง', 'แยกตามย่อหน้า']
const ชุดทั้งหมด = [
  { ชื่อ: 'TCV กับ LSV (ชุดเทียบ)', ฉ: ['TCV', 'LSV'], เดิม: false },
  { ชื่อ: 'TCV กับ THKJV', ฉ: ['TCV', 'THKJV'], เดิม: false },
  { ชื่อ: 'TCV · THKJV · LSV', ฉ: ['TCV', 'THKJV', 'LSV'], เดิม: false },
  { ชื่อ: 'TCV + คำเดิม', ฉ: ['TCV'], เดิม: true },
  { ชื่อ: 'TCV · LSV + คำเดิม', ฉ: ['TCV', 'LSV'], เดิม: true },
  { ชื่อ: 'TCV · THKJV · LSV + คำเดิม', ฉ: ['TCV', 'THKJV', 'LSV'], เดิม: true },
  { ชื่อ: 'คำเดิมก่อน TCV', ฉ: ['TCV'], เดิม: true, ต่อท้าย: '&t=SBLGNT,TCV' },
]
const บท = 12
const ข้อกลางบท = 20

// ---------------------------------------------------------------------------
// ของพังที่ยัดในโหมดพิสูจน์ ⇒ ชื่อ · CSS · แบบที่ต้องเจอ · ชุดที่วัด [จอ, ขนาด, จัดวาง, ดัชนีใน ชุดทั้งหมด] · งาน
// ---------------------------------------------------------------------------
const ของพัง = [
  {
    // ⭐ ตัวบทกลับมามีช่องเลขข้อ 2.4em + 0.5rem ตอนหัวเต็มแถว ⇒ หน้าตาของ main 5faf6cf
    ชื่อ: 'ตัวบทมีช่องเลขข้อแบบก่อนใบนี้ (ฉบับแปลล้วน)',
    css: `.pk-คอลัมน์.pk-หัวเต็มแถว .pk-ตัวบท .pk-ข้อ { grid-template-columns: 2.4em minmax(0, 1fr) !important; column-gap: 0.5rem !important; }
      .pk-คอลัมน์.pk-หัวเต็มแถว .pk-ตัวบท .pk-ข้อ > .pk-เลขข้อ { grid-column: 1 !important; padding-top: 0.5em !important; }
      .pk-คอลัมน์.pk-หัวเต็มแถว .pk-ตัวบท .pk-ข้อ > .pk-ช่องทั้งหมด > * { padding-top: 0 !important; }`,
    ต้องเจอ: /[①②] /,
    ชุด: [[375, 1, 'แยกตามข้อ', 1]],
    งาน: 1,
  },
  {
    // ⭐ ตารางคำเดิมกลับไปเป็นช่องเลขข้อ + ช่องละ 1 ส่วน · แถวหัวแบ่งทั้งแถวเอง ⇒ หน้าตาของ main 5faf6cf ⇒ ภาพจากจอพับ
    ชื่อ: 'หัวแบ่งทั้งแถวแบบก่อนใบนี้ (คำเดิม ⇒ ภาพจากจอพับ)',
    css: `.pk-คอลัมน์.pk-มีฉบับอื่น.pk-หัวเต็มแถว .pk-ฝั่งหลัก { grid-template-columns: calc(2.4em + 0.5rem - var(--pk-ช่องไฟคำเดิม, 1.5rem)) repeat(var(--pk-กี่ช่องหลัก, 3), minmax(0, 1fr)) !important; }
      .pk-คอลัมน์.pk-มีฉบับอื่น.pk-หัวเต็มแถว .pk-หัวคอลัมน์ > .pk-ช่องทั้งหมด { grid-column: 1 / -1 !important; grid-template-columns: repeat(var(--pk-กี่หัว, 2), minmax(0, 1fr)) !important; column-gap: var(--pk-ช่องคอลัมน์) !important; }
      .pk-คอลัมน์.pk-มีฉบับอื่น.pk-หัวเต็มแถว .pk-หัวคอลัมน์ > .pk-ช่องทั้งหมด > * { grid-column: auto !important; }`,
    ต้องเจอ: /[①②] /,
    ชุด: [[407, 1, 'ไหลต่อเนื่อง', 3]],
    งาน: 1,
  },
  {
    ชื่อ: 'แถวหัวเหลื่อมขวา 3 จุด',
    css: `.pk-หัวคอลัมน์ > .pk-ช่องทั้งหมด, .pk-ฝั่งหลัก > .pk-ชื่อคำเดิม { translate: 3px 0; }`,
    ต้องเจอ: /[①②] /,
    ชุด: [
      [412, 1, 'แยกตามข้อ', 0],
      [1280, 1, 'แยกตามข้อ', 5],
    ],
    งาน: 1,
  },
  {
    ชื่อ: 'หัวแคบกว่าเนื้อ',
    css: `.pk-ฝั่งหลัก > .pk-หัวคอลัมน์ { margin-inline-end: 24px !important; }`,
    ต้องเจอ: /[①②] /,
    ชุด: [[1280, 1, 'แยกตามข้อ', 0]],
    งาน: 2,
  },
  {
    ชื่อ: 'เส้นบนหัวขยับ 2 จุด',
    css: `.pk-หัวคอลัมน์ *::after, .pk-หัวคอลัมน์ *::before { margin-inline-start: 2px !important; }`,
    ต้องเจอ: /[①②] /,
    ชุด: [[484, 1, 'ไหลต่อเนื่อง', 4]],
    งาน: 2,
  },
  {
    ชื่อ: 'หัวไม่มีเส้น',
    css: `.pk-หัวคอลัมน์ *::after, .pk-หัวคอลัมน์ *::before, .pk-ชื่อคำเดิม::after, .pk-ชื่อคำเดิม::before { content: none !important; }`,
    ต้องเจอ: /② /,
    ชุด: [[1280, 1, 'แยกตามย่อหน้า', 4]],
    งาน: 2,
  },
  {
    ชื่อ: 'ปุ่มบนหัวหดต่ำกว่า 44',
    css: `.pk-หัวคอลัมน์ .pk-ปุ่มเทียบ { min-width: 0 !important; min-height: 0 !important; height: 30px !important; }`,
    ต้องเจอ: /④ /,
    ชุด: [[375, 1, 'แยกตามข้อ', 0]],
    งาน: 2,
  },
  {
    ชื่อ: 'วัดไม่ได้แต่ผ่าน ⇒ ตัวบทไม่มีเส้น',
    css: `.pk-ตัวบท *::after, .pk-ตัวบท *::before, .pk-ตัวบท::after, .pk-ตัวบท::before, .pk-ฝั่งหลัก::after, .pk-ฝั่งหลัก::before { content: none !important; }`,
    ต้องเจอ: /[①②⑤] /,
    ชุด: [[1280, 1, 'แยกตามข้อ', 0]],
    งาน: 1,
  },
]

// ---------------------------------------------------------------------------
// โค้ดที่ฉีดไปวัดในหน้า
// ---------------------------------------------------------------------------
function วัดในหน้า() {
  const px = (v) => parseFloat(v) || 0
  const เห็น = (e) => {
    if (!e || !e.getClientRects().length) return false
    const r = e.getBoundingClientRect()
    return r.width > 0.5 && r.height > 0.5 && getComputedStyle(e).visibility !== 'hidden'
  }
  const ตัวลอง = document.createElement('div')
  ตัวลอง.style.cssText = 'position:absolute;visibility:hidden;background:var(--pk-สีเส้นคอลัมน์)'
  document.body.appendChild(ตัวลอง)
  const สีเส้น = getComputedStyle(ตัวลอง).backgroundColor
  ตัวลอง.remove()

  // ⭐ ตำแหน่งเส้น ⇒ ท่าเดียวกับ `เส้นของ` ใน `tools/ด่านเส้นแบ่งคอลัมน์.mjs` ⇒ บวกขอบนอกด้านซ้ายของเส้น (ของลอยที่มี margin ขยับตาม)
  //   ⇒ แนวตั้งเป็นพิกัดของจอ (⛔ บวก scrollY) ⇒ ใช้ตัดว่าเส้นอยู่ในช่วงที่ตาเห็นไหม
  const เส้นของ = (เจ้าของ) => {
    const out = []
    for (const p of ['::before', '::after']) {
      const cs = getComputedStyle(เจ้าของ, p)
      if (!cs.content || cs.content === 'none' || cs.content === 'normal' || cs.display === 'none') continue
      if (cs.position !== 'absolute') continue
      const กว้าง = px(cs.width)
      if (กว้าง <= 0 || กว้าง > 2) continue
      if (cs.backgroundColor !== สีเส้น) continue
      const r = เจ้าของ.getBoundingClientRect()
      const hs = getComputedStyle(เจ้าของ)
      let ซ้ายอ้าง = r.left + px(hs.borderLeftWidth)
      let บนช่อง = r.top + px(hs.borderTopWidth)
      let ล่างช่อง = r.bottom - px(hs.borderBottomWidth)
      const เริ่มช่อง = parseInt(cs.gridColumnStart, 10)
      if (Number.isFinite(เริ่มช่อง) && hs.display === 'grid') {
        const ตาราง = /^subgrid/.test(hs.gridTemplateColumns) ? เจ้าของ.parentElement : เจ้าของ
        const ms = getComputedStyle(ตาราง)
        const ช่อง = ms.gridTemplateColumns.split(/\s+/).map(px)
        if (เริ่มช่อง - 1 > ช่อง.length) continue
        const mr = ตาราง.getBoundingClientRect()
        let x = mr.left + px(ms.borderLeftWidth) + px(ms.paddingLeft)
        for (let i = 0; i < เริ่มช่อง - 1 && i < ช่อง.length; i++) x += ช่อง[i] + px(ms.columnGap)
        ซ้ายอ้าง = x
        const เริ่มแถว = parseInt(cs.gridRowStart, 10)
        if (Number.isFinite(เริ่มแถว) && ตาราง === เจ้าของ) {
          const แถว = ms.gridTemplateRows.split(/\s+/).map(px)
          let y = mr.top + px(ms.borderTopWidth) + px(ms.paddingTop)
          for (let i = 0; i < เริ่มแถว - 1 && i < แถว.length; i++) y += แถว[i] + px(ms.rowGap)
          บนช่อง = y
          ล่างช่อง = y + (แถว[เริ่มแถว - 1] || 0)
        }
      }
      const บน = บนช่อง + px(cs.top)
      const ล่าง = ล่างช่อง - px(cs.bottom)
      if (ล่าง - บน < 8) continue
      out.push({ x: ซ้ายอ้าง + px(cs.left) + px(cs.marginLeft) + กว้าง / 2, บน, ล่าง })
    }
    return out
  }

  const ชุดหัว = [...document.querySelectorAll('.pk-ฝั่งหลัก > .pk-หัวคอลัมน์, .pk-ฝั่งหลัก > .pk-ชื่อคำเดิม')].filter(เห็น)
  const ของในหัว = ชุดหัว.flatMap((h) => [h, ...h.querySelectorAll('*')])
  const เส้นหัว = ของในหัว.flatMap(เส้นของ)
  const ของในตัวบท = [...document.querySelectorAll('.pk-ฝั่งหลัก')].flatMap((f) =>
    [f, ...f.querySelectorAll('*')].filter((e) => !ของในหัว.includes(e)),
  )
  const เส้นตัวบททั้งหมด = ของในตัวบท.flatMap(เส้นของ)

  // ช่วงที่ตาเห็น ⇒ ใต้หัวที่หนึบ ถึงเหนือแถบล่าง
  const กล่องหัว = ชุดหัว.map((h) => h.getBoundingClientRect())
  const ใต้หัว = กล่องหัว.length ? Math.max(...กล่องหัว.map((r) => r.bottom)) : 0
  const แถบล่าง = document.querySelector('.pk-นำทางล่าง')
  const เหนือแถบล่าง = แถบล่าง && เห็น(แถบล่าง) ? Math.min(innerHeight, แถบล่าง.getBoundingClientRect().top) : innerHeight
  const เส้นตัวบท = เส้นตัวบททั้งหมด.filter((l) => Math.min(l.ล่าง, เหนือแถบล่าง) - Math.max(l.บน, ใต้หัว) >= 4)
  const เส้นหัวในจอ = เส้นหัว.filter((l) => l.ล่าง > 0 && l.บน < innerHeight)

  // ปุ่มบนหัว
  const ปุ่ม = ชุดหัว
    .flatMap((h) => [...h.querySelectorAll('button, select, a[href]')])
    .filter((b) => เห็น(b) && !b.closest('.pk-เฉพาะเสียง, .pk-เมนู, [role="dialog"]'))
    .map((b) => {
      const r = b.getBoundingClientRect()
      return { ชื่อ: (b.getAttribute('aria-label') || b.textContent || b.tagName).trim().slice(0, 24), ซ้าย: r.left, ขวา: r.right, กว้าง: r.width, สูง: r.height }
    })

  // ⭐ คอลัมน์ของตัวบทวางข้างกันจริงในช่วงที่ตาเห็นไหม ⇒ ช่องสองช่องที่อยู่แถวเดียวกันแต่คนละที่ทางนอน
  //   ⇒ จอกว้างตัวอักษร 200% ⇒ `auto-fit` 23em ห่อแถวละช่อง ⇒ ⛔ มีคอลัมน์ข้างกัน ⇒ ⛔ มีเส้นให้เทียบ
  const ช่องตัวบท = [...document.querySelectorAll('.pk-ตัวบท .pk-ช่องทั้งหมด > *, .pk-ตัวบท > .pk-ชั้นคำ:not(.pk-คำใต้แถว)')]
    .filter(เห็น)
    .map((e) => e.getBoundingClientRect())
    .filter((r) => r.bottom > ใต้หัว && r.top < เหนือแถบล่าง)
  const ข้างกัน = ช่องตัวบท.some((a) =>
    ช่องตัวบท.some((b) => b.left >= a.right - 0.5 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 8),
  )

  const คอล = document.querySelector('.pk-คอลัมน์')
  const แบบ = !คอล
    ? '?'
    : คอล.classList.contains('pk-ซ้ายขวาจอแคบ')
      ? 'ซ้ายขวา'
      : คอล.classList.contains('pk-บนล่างจอแคบ')
        ? 'บนล่าง'
        : คอล.classList.contains('pk-ทีละฉบับจอแคบ')
          ? 'ทีละฉบับ'
          : innerWidth >= 768
            ? 'กว้าง'
            : 'เดี่ยว'
  return {
    แบบ,
    ข้างกัน,
    หัวเต็มแถว: !!คอล?.classList.contains('pk-หัวเต็มแถว'),
    เส้นหัว: เส้นหัวในจอ.map((l) => l.x),
    เส้นตัวบท: เส้นตัวบท.map((l) => l.x),
    ปุ่ม,
    กว้างจอ: document.documentElement.clientWidth,
    เลื่อนข้าง: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }
}

// ---------------------------------------------------------------------------
const เบราว์เซอร์ = await chromium.launch()

/** รอหน้าพร้อม ⇒ โค้ดติด · ข้อของบทมา · ฟอนต์ครบ · คำเดิมมา (ถ้าเปิด) · จัดแถวเสร็จ ⇒ แล้วรอกล่องหัวกับตัวบทนิ่ง 3 เฟรม */
async function รอพร้อม(แท็บ, เดิม) {
  await แท็บ.waitForFunction(
    ([c, ด]) => {
      if (!document.getElementById('__nuxt')?.__vue_app__) return false
      if (!document.querySelector(`.pk-ตัวบท [data-ข้อ^="${c}:"]`)) return false
      if (document.fonts.status !== 'loaded') return false
      if (ด && !document.querySelector('.pk-ชั้นคำ .pk-คำ')) return false
      // ⭐ ไฟล์หน้าตาทุกไฟล์มาครบ ⇒ ⛔ วัดหัวที่ยังไม่มีหน้าตา (เครื่องที่ทำงานหนักเคยวัดได้ปุ่มสูง 19 จุด ⇒ ④ แดงหลอก)
      if ([...document.querySelectorAll('link[rel="stylesheet"]')].some((l) => !l.sheet)) return false
      const หัว = document.querySelector('.pk-หัวคอลัมน์')
      if (หัว && getComputedStyle(หัว).position !== 'sticky') return false
      return (document.querySelector('.pk-ตัวบท')?.getAttribute('data-จัดแถว') ?? 'เสร็จ') === 'เสร็จ'
    },
    [บท, เดิม],
    { timeout: รอนานสุด },
  )
  await รอนิ่ง(แท็บ)
}

/** รอนิ่ง ⇒ คลาสของคอลัมน์ · ขอบของหัวทุกหัว · ขอบของช่องแรกของตัวบท เท่าเดิม 3 เฟรมติด ⛔ รอเป็นเวลาตายตัว */
const รอนิ่ง = (แท็บ) =>
  แท็บ
    .waitForFunction(
      () => {
        const ค่า = [
          document.querySelector('.pk-คอลัมน์')?.className,
          ...[...document.querySelectorAll('.pk-หัวคอลัมน์ .pk-หัวช่อง, .pk-ชื่อคำเดิม, .pk-ตัวบท .pk-ช่องทั้งหมด > *')]
            .slice(0, 12)
            .map((e) => {
              const r = e.getBoundingClientRect()
              return [r.left, r.right, r.top].map((v) => Math.round(v * 4)).join(',')
            }),
          scrollY,
        ].join('|')
        const เดิม = window.__ด่าน158
        window.__ด่าน158 = { ค่า, นับ: เดิม?.ค่า === ค่า ? เดิม.นับ + 1 : 0 }
        return window.__ด่าน158.นับ >= 3
      },
      null,
      { polling: 'raf', timeout: 10000 },
    )
    .catch(() => {})

function ตรวจผล(ป้าย, ตอน, ว, ตก, นับ) {
  const ชิด = (x, ชุด) => ชุด.reduce((m, y) => Math.min(m, Math.abs(x - y)), Infinity)
  const ไม่ซ้ำ = (xs) => [...new Set(xs.map((x) => Math.round(x * 4) / 4))].sort((a, b) => a - b)
  const หัว = ไม่ซ้ำ(ว.เส้นหัว)
  const เนื้อ = ไม่ซ้ำ(ว.เส้นตัวบท)
  const วางข้างกันได้ = ว.แบบ === 'ซ้ายขวา' || ว.แบบ === 'กว้าง'
  const ข้างกัน = วางข้างกันได้ && ว.ข้างกัน
  const ที่ = `${ป้าย} ${ตอน} (${ว.แบบ}${ว.หัวเต็มแถว ? ' · หัวเต็มแถว' : ''})`
  if (ว.เลื่อนข้าง > 0) ตก.push(`④ ${ที่} ⇒ หน้าเลื่อนข้างได้ ${ว.เลื่อนข้าง} จุด`)
  for (const b of ว.ปุ่ม) {
    if (b.กว้าง < เป้า - 0.5 || b.สูง < เป้า - 0.5) ตก.push(`④ ${ที่} ⇒ ปุ่ม "${b.ชื่อ}" บนหัว ${b.กว้าง.toFixed(1)} × ${b.สูง.toFixed(1)} ⛔ ถึง 44 × 44`)
    if (b.ซ้าย < -0.5 || b.ขวา > ว.กว้างจอ + 0.5) ตก.push(`④ ${ที่} ⇒ ปุ่ม "${b.ชื่อ}" บนหัวล้นจอ (${b.ซ้าย.toFixed(0)} ถึง ${b.ขวา.toFixed(0)} ในจอ ${ว.กว้างจอ})`)
  }
  if (!ข้างกัน) {
    // ⭐ ตัวบทห่อแถวละช่องแต่หัวยังมีเส้นคั่น ⇒ หัวกับเนื้อคนละแบบ ⇒ ① (บนล่าง ⇒ เส้นคั่นหัวในแถบเป็นของแถบ ⛔ นับ)
    if (วางข้างกันได้ && หัว.length)
      ตก.push(`① ${ที่} ⇒ ตัวบทวางแถวละคอลัมน์แต่บนหัวมีเส้นคั่นที่ ${หัว.map((v) => v.toFixed(1)).join(' · ')} ⇒ หัวกับเนื้อวางคนละแบบ`)
    นับ.ไม่มีคอลัมน์ข้างกัน++
    return
  }
  if (!เนื้อ.length && !หัว.length) {
    ตก.push(`⑤ ${ที่} ⇒ คอลัมน์วางข้างกันแต่ ⛔ เจอเส้นทั้งบนหัวและในตัวบท ⇒ ⛔ ตรวจไม่ได้`)
    return
  }
  นับ.เทียบ++
  for (const x of หัว) {
    const d = ชิด(x, เนื้อ)
    if (d > ห่างได้)
      ตก.push(`① ${ที่} ⇒ เส้นบนหัวที่ ${x.toFixed(1)} ⛔ ตรงเส้นในตัวบท ⇒ ใกล้สุดห่าง ${Number.isFinite(d) ? d.toFixed(1) : '—'} จุด (เส้นในตัวบท ${เนื้อ.map((v) => v.toFixed(1)).join(' · ') || 'ไม่มี'})`)
  }
  for (const x of เนื้อ) {
    const d = ชิด(x, หัว)
    if (d > ห่างได้)
      ตก.push(`② ${ที่} ⇒ เส้นในตัวบทที่ ${x.toFixed(1)} ⛔ มีเส้นบนหัวตรงกัน ⇒ ใกล้สุดห่าง ${Number.isFinite(d) ? d.toFixed(1) : '—'} จุด (เส้นบนหัว ${หัว.map((v) => v.toFixed(1)).join(' · ') || 'ไม่มี'})`)
  }
}

/** วัดชุดเดียว ⇒ เปิดหน้า · วัดตอนเพิ่งเปิด · เลื่อนลงกลางบท · วัดอีกครั้ง */
async function วัดชุด([จอ, ขนาด, จัดวาง, i], พัง, ตก, นับ) {
  const ส = ชุดทั้งหมด[i]
  const ป้าย = `จอ ${จอ} · ${ขนาด * 100}% · ${จัดวาง} · ${ส.ชื่อ}`
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: จอ, height: จอ < 768 ? 800 : 900 } })
  try {
    await ctx.addInitScript(
      ([ฉ, ด, จว, ข]) => {
        try {
          if (sessionStorage.getItem('ด่าน158')) return
          sessionStorage.setItem('ด่าน158', '1')
          localStorage.setItem('phrakham.versions', JSON.stringify(ฉ))
          localStorage.setItem('phrakham.view', JSON.stringify({ ภาษาเดิม: ด, จัดวาง: จว }))
          if (ข !== 1) localStorage.setItem('pk-fs', String(ข))
        } catch {}
      },
      [ส.ฉ, ส.เดิม, จัดวาง, ขนาด],
    )
    const แท็บ = await ctx.newPage()
    await แท็บ.goto(`${ฐาน}/read/MRK?c=${บท}${ส.ต่อท้าย || ''}`, { waitUntil: 'domcontentloaded' })
    try {
      await รอพร้อม(แท็บ, ส.เดิม)
    } catch {
      ตก.push(`⑤ ${ป้าย} ⇒ หน้า ⛔ พร้อมใน ${รอนานสุด / 1000} วินาที ⇒ ⛔ ตรวจไม่ได้`)
      return
    }
    if (พัง) {
      await แท็บ.addStyleTag({ content: พัง.css })
      await รอนิ่ง(แท็บ)
    }
    ตรวจผล(ป้าย, 'ตอนเพิ่งเปิด', await แท็บ.evaluate(วัดในหน้า), ตก, นับ)
    // ⭐ เลื่อนลงกลางบท ⇒ หัวหนึบอยู่ใต้แถบบน (ใบข้อ 1.4)
    await แท็บ.evaluate((ข) => {
      const e = document.querySelector(`.pk-ตัวบท [data-ข้อ="${ข}"]`) || document.querySelector('.pk-ตัวบท [data-ข้อ]')
      const y = e ? e.getBoundingClientRect().top + scrollY - innerHeight / 3 : document.documentElement.scrollHeight / 2
      scrollTo(0, Math.max(0, y))
    }, `${บท}:${ข้อกลางบท}`)
    await รอนิ่ง(แท็บ)
    ตรวจผล(ป้าย, 'ตอนเลื่อนลงกลางบท', await แท็บ.evaluate(วัดในหน้า), ตก, นับ)
  } catch (e) {
    ตก.push(`⑤ ${ป้าย} ⇒ ด่านล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
}

async function ตรวจ(ชุด, พัง) {
  const ตก = []
  const นับ = { เทียบ: 0, ไม่มีคอลัมน์ข้างกัน: 0 }
  const คิว = [...ชุด]
  await Promise.all(
    Array.from({ length: พร้อมกัน }, async () => {
      while (คิว.length) await วัดชุด(คิว.shift(), พัง, ตก, นับ)
    }),
  )
  return { ตก, นับ }
}

let ล้ม = false
if (!ทดสอบตัวเอง) {
  const ชุด = []
  for (const จอ of จอทั้งหมด)
    for (const ขนาด of ขนาดทั้งหมด) for (const จัดวาง of จัดวางทั้งหมด) for (let i = 0; i < ชุดทั้งหมด.length; i++) ชุด.push([จอ, ขนาด, จัดวาง, i])
  const เริ่ม = Date.now()
  const { ตก, นับ } = await ตรวจ(ชุด)
  console.log(
    `วัด ${ชุด.length} ชุด × 2 ตอน ⇒ เทียบเส้นได้ ${นับ.เทียบ} ตอน · ตัวบทไม่มีคอลัมน์ข้างกัน (บนล่าง · ทีละฉบับ · เดี่ยว) ${นับ.ไม่มีคอลัมน์ข้างกัน} ตอน · ${((Date.now() - เริ่ม) / 1000).toFixed(0)} วินาที`,
  )
  if (ตก.length) {
    ล้ม = true
    console.error(`\n⛔ ด่านเส้นหัวตรงเนื้อ ⇒ ตก ${ตก.length} ข้อ`)
    for (const x of ตก.sort()) console.error(`  ${x}`)
  } else console.log('✅ เส้นบนหัวกับในตัวบทตรงแนวกันทุกชุด ⇒ ห่างไม่เกิน 1 จุด · ปุ่มบนหัว 44 จุดอยู่ในจอ · หน้า ⛔ เลื่อนข้าง')
} else {
  const ท่า = ของพัง.filter((p) => !ชุดที่ขอ || p.งาน === ชุดที่ขอ)
  // ⭐ ชุดเดียวกันโดยไม่ยัดอะไร ⇒ ต้องเขียว ⇒ ⛔ ให้ท่าที่แดงอยู่แล้วนับว่าจับได้
  const ชุดคุม = [...new Map(ท่า.flatMap((p) => p.ชุด).map((c) => [c.join('|'), c])).values()]
  const คุม = await ตรวจ(ชุดคุม)
  if (คุม.ตก.length) {
    ล้ม = true
    console.error(`⛔ ชุดที่ใช้พิสูจน์ ⛔ เขียวตอนไม่ยัดอะไร ⇒ ⛔ พิสูจน์ได้`)
    for (const x of คุม.ตก) console.error(`  ${x}`)
  }
  for (const p of ท่า) {
    const { ตก } = await ตรวจ(p.ชุด, p)
    const เจอ = ตก.filter((x) => p.ต้องเจอ.test(x))
    if (เจอ.length) console.log(`✅ จับได้ ⇒ ${p.ชื่อ} ⇒ ${เจอ[0].slice(0, 160)}`)
    else {
      ล้ม = true
      console.error(`⛔ จับไม่ได้ ⇒ ${p.ชื่อ} ⇒ ต้องเจอ ${p.ต้องเจอ} ⇒ ได้ ${ตก.length ? ตก[0] : 'เขียว'}`)
    }
  }
}
await เบราว์เซอร์.close()
process.exit(ล้ม ? 1 : 0)
