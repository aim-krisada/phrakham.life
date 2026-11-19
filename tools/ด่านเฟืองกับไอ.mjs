// ด่านตรวจ — **ปุ่มรูปเฟืองกับปุ่มตัว i บนหัวคอลัมน์ภาษาเดิม ⇒ เครื่องมือภาษาเดิม · คำอธิบายสัญลักษณ์**
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/154 (m1.wpa.24.us12)
//
// ## ทำไมต้องมี
//   ⇒ @krisada ลองบนจอพับแล้วเห็นว่าเครื่องมือในหน้า Aa อยู่ไกลจากคอลัมน์ที่อ่าน (ใบ #154 หมายเหตุข้อ 3)
//   ⇒ เครื่องมือกับคำอธิบายย้ายมาอยู่บนหัวคอลัมน์ภาษาเดิมเอง ⇒ เปิดและปิดด้วยกล่องเด้งแบบเดียวกับ Aa · เทียบ · แชร์ (ใบ #153)
//
// ## ตรวจอะไร ⇒ กดของจริงบนหน้าที่สร้างเสร็จ ⇒ วัดของที่เบราว์เซอร์วาดจริง ⛔ ไม่ได้อ่าน CSS
//   จอ 320 · 344 (จอพับตอนพับ) · 375 · 412 · 484 (จอพับ) · 767 · 768 · 884 (จอพับตอนกาง) · 1280 ⇒ ตัวอักษร 100% และ 200% ทุกจอ
//   กล่อง 2 ใบ ⇒ เฟือง (`#pk-เครื่องมือภาษาเดิม`) · i (`#pk-คำอธิบายสัญลักษณ์`)
//   ① **รูปแบบกล่องเด้ง** (เกณฑ์ข้อ 4) ⇒ จอแคบกว่า 768 ⇒ หน้าเต็มจอ ซ้าย 0 · ขวาเท่าจอ · ล่างเท่าจอ · **บนเท่าขอบล่างแถบบน** (±0.5)
//      ⇒ จอตั้งแต่ 768 ⇒ แผงลงมาใต้หัวคอลัมน์ ⇒ ขอบบนไม่สูงกว่าขอบล่างของหัว · ซ้อนกับปุ่มที่เปิดในแนวนอน · ห่างขอบจอซ้ายขวา 16 จุด
//        · ⛔ เลยขอบบนของแถบล่าง ⇒ ท้ายแผงอ่านได้เสมอ
//   ② **× มุมขวาบน · ชื่อกล่อง** ⇒ ปุ่มที่ได้ยิน *ปิด* ปุ่มเดียว ⇒ 44 × 44 ⇒ ห่างมุมขวาบนไม่เกิน 24 จุด ⇒ อยู่บนสุดในกล่อง
//      ⇒ เลื่อนในกล่อง 120 จุดและจนสุด × ยังอยู่มุมเดิม ⇒ กล่องเป็นกลุ่มที่ได้ยินชื่อตรงคำที่อนุมัติ ⇒ หัวที่ตาเห็นคำเดียวกัน
//   ③ **ปิด 3 ทาง** ⇒ × · Escape ⇒ กล่องหาย โฟกัสกลับปุ่มที่เปิด ⇒ แตะนอกกล่อง ⇒ กล่องหาย
//      ⇒ กดปุ่มเดิมซ้ำ (จอกว้าง) ⇒ ปิด ⇒ กดอีกปุ่มตอนกล่องหนึ่งเปิด ⇒ สลับไปอีกกล่อง ⇒ เปิดทีละกล่อง
//   ④ **หน้าเต็มจอ ⛔ ทับแถบบน** ⇒ ตอนเปิดและหลังเลื่อนในหน้า 120 จุดกับจนสุด ⇒ ของบนสุดตรงชื่อเว็บยังเป็นของแถบบน · หัวกับ × ⛔ ซุกใต้แถบ
//   ⑤ **หน้า ⛔ เลื่อนด้านข้าง** ตอนกล่องเปิด (WCAG 2.2 SC 1.4.10) ⇒ และของในกล่อง ⛔ กว้างเกินกล่อง
//   ⑥ **ปุ่มบนหัว** (เกณฑ์ข้อ 1 · 6 · 7) ⇒ มีเฉพาะตอนเปิดคอลัมน์ภาษาเดิม ⇒ ได้ยินชื่อตรงคำที่อนุมัติ ⇒ ⛔ มีคำบนจอ (⚠️ ใบ #155 ⇒ จอตั้งแต่ 1100 ต้องเห็นคำที่อนุมัติคำเดียว) ⇒ 44 × 44
//      ⇒ อยู่ในจอและในหัว · จุดกลางเป็นของปุ่มเอง ⇒ แถบหัวผ่านเกณฑ์แถวของใบ #150 (`ผิดเกณฑ์แถวหัว`) ⇒ × ของหัวยังขวาสุดของแถวบน
//      ⇒ เลื่อนลงกลางบท ⇒ ปุ่มยังอยู่บนจอใต้แถบบนและกดได้ (หนึบไปกับหัว) ⇒ จอกว้างเปิดแผงแล้วเลื่อน ⇒ แผงยังติดใต้หัว
//   ⑦ **ของในกล่อง** ⇒ เฟือง ⇒ สัญลักษณ์กาล · หัวกลุ่มเครื่องหมายช่วยอ่าน · ช่องติ๊ก 8 ช่อง · เลือกทั้งหมด · ล้างทั้งหมด
//      ⇒ i ⇒ หัวข้อย่อย สัญลักษณ์กาล · เครื่องหมายช่วยอ่าน ⇒ เครดิต SIL ครบตรงตัวทั้งข้อความและลิงก์ ⇒ เลื่อนไปถึงแล้วตาเห็น (⛔ ซุกใต้แถบล่าง)
//   ⑧ **ปิดแล้วกลับข้อเดิม** (จอแคบ 344 · 375 · 412 · 484) ⇒ อ่านข้อ 2:12 ค้าง ⇒ เปิดเฟือง ⇒ เลือกทั้งหมด + ปิดสัญลักษณ์กาล (คำกรีกจัดแถวใหม่)
//      ⇒ หน้าข้างหลังเลื่อนไป 400 จุดระหว่างที่กล่องเปิด (ข้อต้องขยับจริง) ⇒ × ⇒ ข้อเดิมระดับเดิม ±2
//   ⑨ **ของที่ถอด ⛔ กลับมา** (เกณฑ์ข้อ 5) ⇒ ⛔ มีปุ่มที่ได้ยิน *เครื่องมือ* ⇒ หน้า Aa ⛔ มีหมวด *เครื่องมือภาษาเดิม* · ⛔ มีตัวคุมคำเดิม
//      ⇒ ค่าเก่าในเครื่องผู้อ่าน (`เครื่องมือ: true` ของใบ #151) ⇒ หน้าเปิดได้ · กล่อง ⛔ เปิดเอง · สวิตช์อื่นในค่าเดียวกันยังมีผล
//      ⇒ ปิดคอลัมน์ภาษาเดิม ⛔ มีสองปุ่ม ⇒ คำฮีบรูมีเฟืองปุ่มเดียว (สวิตช์ตัวเดิม ⇒ พี่เอมขอ 17 พ.ย. 2569) · ⛔ มีปุ่ม i (ไม่มีสัญลักษณ์ให้อธิบาย)
//   ⑩ **เส้นข้างคอลัมน์คำภาษาเดิมในตัวบท** (ข้อเพิ่มที่ @krisada แจ้ง 8 พ.ย. 2569) ⇒ ทุกคอลัมน์ที่วางข้างกัน คำเดิมหรือคำแปล มีเส้นเดียวยาวตลอดตัวบท
//      ⇒ เส้นที่รอยต่อของคอลัมน์คำเดิมกับคอลัมน์ข้าง ๆ (ห่างขอบซ้ายของคอลัมน์ขวาครึ่ง `--pk-ช่องคอลัมน์` ±1.5) ⇒ หนาไม่เกิน 2 จุด · สีเดียวกับเส้นระหว่างคอลัมน์คำแปล
//      ⇒ วัดทุก 12 จุดตลอดบท ตั้งแต่ขอบบนของข้อแรกถึงขอบล่างของข้อสุดท้าย ⇒ และกลางช่องระหว่างทุกข้อ ⇒ ⛔ มีระดับไหนที่ไม่มีเส้น
//      ⇒ แบบที่วัด ⇒ คอลัมน์ทั้งบท (1280 · 1100 · คำเดิมก่อน) ⇒ จอ 768 ถึงราว 950 คำเดิมห่อลงใต้คำแปล ⛔ วางข้างกัน · ช่องในตารางที่ห่อแถว (1280 TCV THKJV · 1280 สามฉบับ) · แทรกในตาราง (1920 สามฉบับ) · ซ้ายขวาจอแคบ (412 · 375)
//
// ⚠️ ด่านนี้ ⛔ ตรวจว่าสวิตช์ในกล่องทำงานและจำค่า ⇒ เจ้าของคือ `tools/ด่านเครื่องมือภาษาเดิม.mjs` (ข้อ ⑧ ⑩) · `ด่านกาลบนหน้า` · `ด่านคำเน้นบนหน้า`
//
// ## วิธีพิสูจน์ว่าด่านนี้แดงได้จริง
//
//   node tools/ด่านเฟืองกับไอ.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง [--ชุด=1|2]
//
//   ⇒ ยัดของพังทีละชิ้น (`ของพัง`) ⇒ แต่ละชิ้นต้องทำให้ข้อของมันแดง ⇒ ⛔ แดง = ด่านตายแล้ว
//   ⇒ `--ชุด` แบ่งท่าเป็น 2 งานในท่อ ⇒ ท่าเดียวกับ `tools/ด่านกล่องเด้ง.mjs` ⇒ ทุกท่าต้องมีชุด 1 หรือ 2
//
//   node tools/ด่านเฟืองกับไอ.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import {
  เส้นทางเว็บ,
  ชื่อปุ่มเครื่องมือ,
  ชื่อปุ่มคำอธิบาย,
  ชื่อปุ่มปิดกล่อง,
  ตาเห็นปุ่มเครื่องมือเดิม,
  คำข้างรูป,
  คำที่ควรเห็น,
  หัวหมวดเครื่องมือเดิม,
  ชื่อปุ่มเลือกทั้งหมด,
  ชื่อปุ่มล้างทั้งหมด,
  กางแผงAa,
  เส้นจอกว้าง,
  อ่านแถบหัว,
  ผิดเกณฑ์แถวหัว,
} from './หน้าที่ตรวจ.mjs'
import { เครดิตLGNTDF, ชื่อปุ่มเครื่องหมาย } from '../app/utils/คำเน้น.ts'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const ชุดที่ขอ = Number((process.argv.find((x) => x.startsWith('--ชุด=')) || '').split('=')[1] || 0)
const รอนานสุด = 30000
const จอทั้งหมด = [320, 344, 375, 412, 484, 767, 768, 884, 1280]
const เป้า = 44
const ใกล้มุม = 24
const เผื่อขอบ = 16
const เครดิตเต็ม = `${เครดิตLGNTDF.ก่อนลิงก์}${เครดิตLGNTDF.ลิงก์LGNTDF.ข้อความ}${เครดิตLGNTDF.กลาง}${เครดิตLGNTDF.ลิงก์SIL.ข้อความ}${เครดิตLGNTDF.ท้าย}`

/** กล่อง 2 ใบ ⇒ ชื่อที่ได้ยินของปุ่ม = หัวของกล่อง · ตัวเลือกของกล่อง · `data-ปุ่ม` ของปุ่มที่เปิด */
const กล่องทั้งหมด = [
  { ชื่อ: 'เฟือง', หัว: ชื่อปุ่มเครื่องมือ, กล่อง: '#pk-เครื่องมือภาษาเดิม', ปุ่ม: 'เครื่องมือภาษาเดิม', คำ: คำข้างรูป.เครื่องมือ },
  { ชื่อ: 'i', หัว: ชื่อปุ่มคำอธิบาย, กล่อง: '#pk-คำอธิบายสัญลักษณ์', ปุ่ม: 'คำอธิบายสัญลักษณ์', คำ: คำข้างรูป.คำอธิบาย },
]
const ปุ่มของ = (แท็บ, ก) => แท็บ.locator(`[data-ปุ่ม="${ก.ปุ่ม}"]:visible`).first()

const เบราว์เซอร์ = await chromium.launch()

/** เปิดหน้า ⇒ ตั้งค่าก่อนโค้ดของเว็บติด (ครั้งแรกครั้งเดียว) ⇒ รอโค้ดติด ฟอนต์ครบ คำกรีกขึ้น ตัวจัดแถวเสร็จ */
async function เปิด({ กว้าง, สูง, ฉบับ = ['TCV'], เดิม = true, ใหญ่ = false, เล่ม = 'MRK', บท = 2, มุมเพิ่ม = {}, ต่อท้าย = '', พัง }) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: สูง ?? (กว้าง < เส้นจอกว้าง ? 740 : 900) } })
  await ctx.addInitScript(
    ([ฉ, ด, ใหญ่, เพิ่ม]) => {
      try {
        if (sessionStorage.getItem('ด่าน154')) return
        sessionStorage.setItem('ด่าน154', '1')
        localStorage.setItem('phrakham.versions', JSON.stringify(ฉ))
        localStorage.setItem('phrakham.view', JSON.stringify({ ภาษาเดิม: ด, จัดวาง: 'แยกตามข้อ', ...เพิ่ม }))
        if (ใหญ่) localStorage.setItem('pk-fs', '2')
      } catch {}
    },
    [ฉบับ, เดิม, ใหญ่, มุมเพิ่ม],
  )
  if (พัง?.ก่อนโหลด) await ctx.addInitScript(พัง.ก่อนโหลด)
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(`${ฐาน}/read/${เล่ม}?c=${บท}${ต่อท้าย}`, { waitUntil: 'domcontentloaded' })
  const พร้อม = await แท็บ
    .waitForFunction(
      ([c, ด]) => {
        if (!document.getElementById('__nuxt')?.__vue_app__) return false
        if (!document.querySelector('.pk-แถบบน a[aria-haspopup="dialog"]')) return false
        if (!document.querySelector(`.pk-ตัวบท [data-ข้อ^="${c}:"]`)) return false
        if (document.fonts.status !== 'loaded') return false
        if (ด && !document.querySelector('.pk-ชั้นคำ .pk-คำ')) return false
        return (document.querySelector('.pk-ตัวบท')?.getAttribute('data-จัดแถว') ?? 'เสร็จ') === 'เสร็จ'
      },
      [บท, เดิม],
      { timeout: รอนานสุด },
    )
    .then(() => รอสองเฟรม(แท็บ))
    .then(() => true)
    .catch(() => false)
  if (พร้อม && พัง?.css) await แท็บ.addStyleTag({ content: พัง.css })
  if (พร้อม && พัง?.js) await แท็บ.evaluate(พัง.js)
  if (พร้อม && (พัง?.css || พัง?.js)) await รอสองเฟรม(แท็บ)
  return { ctx, แท็บ, พร้อม }
}

const รอสองเฟรม = (แท็บ) => แท็บ.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))

/** รอกล่องนิ่ง ⇒ ขอบ 4 ด้านเท่าเดิม 3 เฟรมติด ⇒ ⛔ รอเป็นเวลาตายตัว */
const รอนิ่ง = (แท็บ, ตัวเลือก) =>
  แท็บ
    .waitForFunction(
      (s) => {
        const e = document.querySelector(s)
        if (!e) return false
        const r = e.getBoundingClientRect()
        const ค่า = [r.left, r.right, r.top, r.bottom].map(Math.round).join(',')
        const เดิม = window.__ด่าน154นิ่ง
        window.__ด่าน154นิ่ง = { ค่า, นับ: เดิม?.ค่า === ค่า ? เดิม.นับ + 1 : 0 }
        return window.__ด่าน154นิ่ง.นับ >= 3
      },
      ตัวเลือก,
      { polling: 'raf', timeout: 10000 },
    )
    .catch(() => {})

async function เปิดกล่อง(แท็บ, ก) {
  const ป = ปุ่มของ(แท็บ, ก)
  if (!(await ป.count())) return false
  await ป.click()
  const ขึ้น = await แท็บ.waitForSelector(ก.กล่อง, { state: 'visible', timeout: 10000 }).then(() => true).catch(() => false)
  // ⭐ กล่อง i เป็นก้อนโค้ดแยกอีกชั้น ⇒ รอคำอธิบายขึ้นก่อนวัด ⇒ กล่องสูงเท่าของจริง
  if (ขึ้น && ก.ชื่อ === 'i') await แท็บ.waitForSelector(`${ก.กล่อง} [data-คำอธิบายเน้น]`, { timeout: 10000 }).catch(() => {})
  await รอนิ่ง(แท็บ, ก.กล่อง)
  return ขึ้น
}

/** วัดกล่องที่เปิดอยู่ ⇒ `เลื่อน` = ระยะที่เลื่อนในกล่องก่อนวัด ('สุด' = จนสุด) */
const วัดกล่อง = (แท็บ, ก, เลื่อน) =>
  แท็บ.evaluate(
    async ([s, ปุ่มsel, เลื่อน, ชื่อปิด]) => {
      const กล่อง = document.querySelector(s)
      if (!กล่อง) return null
      if (เลื่อน === 'สุด') กล่อง.scrollTop = กล่อง.scrollHeight
      else if (เลื่อน) กล่อง.scrollTop = เลื่อน
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      const de = document.documentElement
      const r = กล่อง.getBoundingClientRect()
      const แถบ = document.querySelector('.pk-แถบบน')
      const ล่างแถบ = แถบ.getBoundingClientRect().bottom
      const เห็น = (x) => x.getClientRects().length > 0 && getComputedStyle(x).visibility !== 'hidden'
      const ชื่อ = (x) => (x.getAttribute('aria-label') || x.textContent || '').replace(/\s+/g, ' ').trim()
      const กดได้ = [...กล่อง.querySelectorAll('button, input, select, textarea, a[href], [tabindex="0"]')].filter(เห็น)
      const ปิด = กดได้.filter((x) => x.tagName === 'BUTTON' && ชื่อ(x) === ชื่อปิด)
      const x = ปิด[0]?.getBoundingClientRect()
      const ในกรอบ = กดได้
        .map((e) => [e, e.getBoundingClientRect()])
        .filter(([, q]) => q.bottom > r.top + 1 && q.top < r.bottom - 1 && q.height > 0)
      const บนสุดอื่น = Math.min(...ในกรอบ.filter(([e]) => e !== ปิด[0]).map(([, q]) => q.top), Infinity)
      // ⚠️ ใบ #163 ⇒ จอแคบกว่า 768 ⛔ มีชื่อเว็บบนแถบแล้ว (@krisada เลือก 9 พ.ย. 2569) ⇒ จุดที่ตรวจคือกลางชื่อเว็บเมื่อเห็น
      //   ⇒ ⛔ เห็น ⇒ จุดเดิมของชื่อเว็บ (ซ้ายของแถบ 22 จุด · กลางแถบ) ⇒ ของในกล่องขึ้นไปทับตรงนั้น ⇒ ยังแดงเหมือนเดิม ⇒ ⛔ ผ่อน
      const ป้ายชื่อ = document.querySelector('.pk-แถบบน .pk-ชื่อเว็บ')
      const แถบนี้ = document.querySelector('.pk-แถบบน')?.getBoundingClientRect()
      const โลโก้ = ป้ายชื่อ && ป้ายชื่อ.getClientRects().length ? ป้ายชื่อ.getBoundingClientRect() : แถบนี้ && { left: แถบนี้.left, top: แถบนี้.top, width: 44, height: แถบนี้.height }
      const บนโลโก้ = โลโก้ ? document.elementFromPoint(โลโก้.left + โลโก้.width / 2, โลโก้.top + โลโก้.height / 2) : null
      const หัว = กล่อง.querySelector('.pk-หัวกล่องเด้ง')?.getBoundingClientRect()
      const ป = [...document.querySelectorAll(ปุ่มsel)].find((y) => y.getClientRects().length)
      const rp = ป?.getBoundingClientRect()
      const หัวช่อง = ป?.closest('.pk-หัวช่อง')?.getBoundingClientRect()
      let ขอบล่าง = innerHeight
      for (const e of document.querySelectorAll('.pk-แถบล่าง, .pk-ลอยเหนือแถบ')) {
        const q = e.getBoundingClientRect()
        if (q.height > 0 && q.top > r.top && q.top < ขอบล่าง) ขอบล่าง = q.top
      }
      const ชื่อกลุ่มจาก = กล่อง.getAttribute('aria-labelledby')
      return {
        ก: { l: r.left, t: r.top, r: r.right, b: r.bottom },
        จอ: de.clientWidth,
        สูงจอ: de.clientHeight,
        ล่างแถบ,
        ขอบล่าง,
        ปิดกี่ปุ่ม: ปิด.length,
        x: x && { l: x.left, t: x.top, r: x.right, b: x.bottom, w: x.width, h: x.height },
        บนสุดอื่น: Number.isFinite(บนสุดอื่น) ? บนสุดอื่น : null,
        โลโก้ในแถบ: !!บนโลโก้ && แถบ.contains(บนโลโก้) && !กล่อง.contains(บนโลโก้),
        หัวบน: หัว ? หัว.top : null,
        หัวตา: (กล่อง.querySelector('.pk-ชื่อกล่องเด้ง')?.textContent || '').trim(),
        ชื่อกลุ่ม: กล่อง.getAttribute('role') === 'group' ? (document.getElementById(ชื่อกลุ่มจาก || '')?.textContent || '').trim() : '',
        ปุ่ม: rp && { l: rp.left, r: rp.right, t: rp.top, b: rp.bottom, กาง: ป.getAttribute('aria-expanded'), คุม: ป.getAttribute('aria-controls') },
        หัวช่องล่าง: หัวช่อง ? หัวช่อง.bottom : null,
        ไอดี: กล่อง.id,
        ล้นข้าง: Math.round(de.scrollWidth - de.clientWidth),
        ล้นในกล่อง: Math.round(กล่อง.scrollWidth - กล่อง.clientWidth),
      }
    },
    [ก.กล่อง, `[data-ปุ่ม="${ก.ปุ่ม}"]`, เลื่อน, ชื่อปุ่มปิดกล่อง],
  )

const โฟกัสที่ปุ่ม = async (แท็บ, ก) => {
  await รอสองเฟรม(แท็บ)
  return แท็บ.evaluate((ป) => document.activeElement?.getAttribute('data-ปุ่ม') === ป, ก.ปุ่ม)
}
const ปิดด้วยปุ่มปิด = async (แท็บ, ก) => {
  const ปิด = แท็บ.locator(ก.กล่อง).getByRole('button', { name: ชื่อปุ่มปิดกล่อง, exact: true })
  if (await ปิด.count()) await ปิด.first().click()
  return แท็บ.waitForSelector(ก.กล่อง, { state: 'detached', timeout: 5000 }).then(() => true).catch(() => false)
}

// ================================================================ ①–⑤ ⇒ กล่อง 2 ใบ ทุกจอ
async function ตรวจกล่อง(พัง, { จอ = จอทั้งหมด, ใหญ่ = [false, true], กล่อง = ['เฟือง', 'i'], ทาง = true } = {}) {
  const ตก = []
  for (const ตัวใหญ่ of ใหญ่)
    for (const w of จอ) {
      const ป้ายจอ = `จอ ${w}${ตัวใหญ่ ? ' ตัวอักษร 200%' : ''}`
      const { ctx, แท็บ, พร้อม } = await เปิด({ กว้าง: w, ใหญ่: ตัวใหญ่, สูง: w === 344 ? 882 : undefined, พัง })
      try {
        if (!พร้อม) {
          ตก.push(`${ป้ายจอ} ⇒ หน้า ⛔ พร้อมภายใน ${รอนานสุด / 1000} วินาที`)
          continue
        }
        // ⭐ อ่านกลางบท ⇒ แถบบนกับหัวคอลัมน์ติดหนึบอยู่ที่ขอบจอ ⇒ สภาพที่ผู้อ่านกดปุ่มจริง
        await แท็บ.mouse.wheel(0, 700)
        await รอสองเฟรม(แท็บ)
        const เต็มจอ = w < เส้นจอกว้าง
        for (const ก of กล่องทั้งหมด.filter((x) => กล่อง.includes(x.ชื่อ))) {
          const ป้าย = `${ป้ายจอ} · ${ก.ชื่อ}`
          if (!(await เปิดกล่อง(แท็บ, ก))) {
            ตก.push(`① ${ป้าย} ⇒ กดปุ่ม «${ก.หัว}» แล้ว ⛔ มีกล่อง ${ก.กล่อง}`)
            continue
          }
          const ว = await วัดกล่อง(แท็บ, ก, 0)
          if (!ว) {
            ตก.push(`① ${ป้าย} ⇒ ⛔ มีกล่อง ${ก.กล่อง}`)
            continue
          }
          // ① รูปแบบ
          if (เต็มจอ) {
            if (Math.abs(ว.ก.l) > 0.5 || Math.abs(ว.ก.r - ว.จอ) > 0.5 || Math.abs(ว.ก.b - ว.สูงจอ) > 0.5 || Math.abs(ว.ก.t - ว.ล่างแถบ) > 0.5)
              ตก.push(`① ${ป้าย} ⇒ ⛔ เป็นหน้าเต็มจอใต้แถบบน ⇒ กล่อง ${ว.ก.l.toFixed(0)},${ว.ก.t.toFixed(0)} ถึง ${ว.ก.r.toFixed(0)},${ว.ก.b.toFixed(0)} · จอ ${ว.จอ}×${ว.สูงจอ} · แถบบนจบที่ ${ว.ล่างแถบ.toFixed(1)}`)
          } else if (!ว.ปุ่ม) ตก.push(`① ${ป้าย} ⇒ หาปุ่มที่เปิดไม่เจอ`)
          else {
            const ใต้ = ว.หัวช่องล่าง !== null && ว.ก.t >= ว.หัวช่องล่าง - 1.5
            const ซ้อนนอน = ว.ก.l < ว.ปุ่ม.r && ว.ก.r > ว.ปุ่ม.l
            const ในจอ = ว.ก.l >= เผื่อขอบ - 0.5 && ว.ก.r <= ว.จอ - เผื่อขอบ + 0.5
            if (!ใต้ || !ซ้อนนอน || !ในจอ)
              ตก.push(`① ${ป้าย} ⇒ ⛔ เป็นแผงลงมาใต้หัวคอลัมน์ ⇒ แผง ${ว.ก.l.toFixed(0)}–${ว.ก.r.toFixed(0)} บน ${ว.ก.t.toFixed(0)} · ปุ่ม ${ว.ปุ่ม.l.toFixed(0)}–${ว.ปุ่ม.r.toFixed(0)} · หัวจบที่ ${ว.หัวช่องล่าง?.toFixed(0)} · จอ ${ว.จอ} (ห่างขอบ ${เผื่อขอบ})`)
            if (ว.ก.b > ว.ขอบล่าง + 0.5) ตก.push(`① ${ป้าย} ⇒ แผงยาวถึง ${ว.ก.b.toFixed(0)} ⛔ เลยขอบบนของแถบล่าง (${ว.ขอบล่าง.toFixed(0)}) ⇒ ท้ายแผงซุกใต้แถบ`)
          }
          if (ว.ปุ่ม && (ว.ปุ่ม.กาง !== 'true' || ว.ปุ่ม.คุม !== ว.ไอดี))
            ตก.push(`① ${ป้าย} ⇒ ปุ่มบอก aria-expanded=${ว.ปุ่ม.กาง} aria-controls=${ว.ปุ่ม.คุม} ⛔ ชี้กล่องที่เปิด (${ว.ไอดี})`)
          // ② × กับชื่อกล่อง
          const ตรวจกากบาท = (ว, ตอน) => {
            if (ว.ปิดกี่ปุ่ม !== 1) return ตก.push(`② ${ป้าย}${ตอน} ⇒ ปุ่มที่ได้ยิน «${ชื่อปุ่มปิดกล่อง}» ในกล่องมี ${ว.ปิดกี่ปุ่ม} ปุ่ม ⛔ ต้อง 1`)
            const x = ว.x
            if (x.w < เป้า - 0.01 || x.h < เป้า - 0.01) ตก.push(`② ${ป้าย}${ตอน} ⇒ ปุ่ม × ${x.w.toFixed(1)}×${x.h.toFixed(1)} ⛔ เล็กกว่า ${เป้า} จุด`)
            if (ว.ก.r - x.r > ใกล้มุม + 0.5 || x.t - ว.ก.t > ใกล้มุม + 0.5 || x.t < ว.ก.t - 0.5)
              ตก.push(`② ${ป้าย}${ตอน} ⇒ ปุ่ม × ⛔ อยู่มุมขวาบน ⇒ ห่างขอบขวา ${(ว.ก.r - x.r).toFixed(1)} · ห่างขอบบน ${(x.t - ว.ก.t).toFixed(1)} (ไม่เกิน ${ใกล้มุม})`)
            if (!ตอน && ว.บนสุดอื่น !== null && ว.บนสุดอื่น < x.t - 0.5) ตก.push(`② ${ป้าย} ⇒ มีของกดได้อยู่สูงกว่า × (${ว.บนสุดอื่น.toFixed(0)} < ${x.t.toFixed(0)}) ⛔ × ต้องอยู่บนสุด`)
          }
          ตรวจกากบาท(ว, '')
          if (ว.หัวตา !== ก.หัว) ตก.push(`② ${ป้าย} ⇒ หัวของกล่องที่ตาเห็น «${ว.หัวตา}» ⛔ ไม่ใช่ «${ก.หัว}»`)
          const กลุ่ม = await แท็บ.getByRole('group', { name: ก.หัว, exact: true }).count()
          if (ว.ชื่อกลุ่ม !== ก.หัว || กลุ่ม !== 1) ตก.push(`② ${ป้าย} ⇒ โปรแกรมอ่านหน้าจอ ⛔ ได้ยินกลุ่มชื่อ «${ก.หัว}» (ได้ «${ว.ชื่อกลุ่ม}» · เจอ ${กลุ่ม})`)
          // ④ ⛔ ทับแถบบน
          const ตรวจทับแถบ = (ว, ตอน) => {
            if (!เต็มจอ) return
            if (!ว.โลโก้ในแถบ) ตก.push(`④ ${ป้าย}${ตอน} ⇒ ของในกล่องขึ้นไปทับชื่อเว็บบนแถบบน ⛔`)
            if (ว.หัวบน !== null && ว.หัวบน < ว.ล่างแถบ - 0.5) ตก.push(`④ ${ป้าย}${ตอน} ⇒ หัวของกล่องเริ่มที่ ${ว.หัวบน.toFixed(1)} ⛔ สูงกว่าขอบล่างแถบบน ${ว.ล่างแถบ.toFixed(1)}`)
            if (ว.x && ว.x.t < ว.ล่างแถบ - 0.5) ตก.push(`④ ${ป้าย}${ตอน} ⇒ ปุ่ม × เริ่มที่ ${ว.x.t.toFixed(1)} ⛔ ซุกใต้แถบบน (${ว.ล่างแถบ.toFixed(1)})`)
          }
          ตรวจทับแถบ(ว, '')
          if (ว.ล้นข้าง > 0) ตก.push(`⑤ ${ป้าย} ⇒ เปิดกล่องแล้วหน้าเลื่อนด้านข้างได้ ${ว.ล้นข้าง} จุด`)
          // ⭐ หน้าเต็มจอเป็น `fixed` ⇒ ของที่ล้นในกล่อง ⛔ ทำให้ทั้งหน้าเลื่อนข้าง ⇒ วัดกล่องเองด้วย
          if (ว.ล้นในกล่อง > 1) ตก.push(`⑤ ${ป้าย} ⇒ ของในกล่องกว้างเกินกล่อง ${ว.ล้นในกล่อง} จุด ⇒ ต้องเลื่อนข้างในกล่อง ⛔ (SC 1.4.10)`)
          for (const เลื่อน of [120, 'สุด']) {
            const ล = await วัดกล่อง(แท็บ, ก, เลื่อน)
            if (!ล) continue
            const ตอน = ` (เลื่อนในกล่อง ${เลื่อน === 'สุด' ? 'จนสุด' : `${เลื่อน} จุด`})`
            ตรวจกากบาท(ล, ตอน)
            ตรวจทับแถบ(ล, ตอน)
          }
          // ③ ปิด × ⇒ โฟกัสกลับ ⇒ เปิดใหม่ ⇒ Escape ⇒ โฟกัสกลับ ⇒ เปิดใหม่ ⇒ แตะนอกกล่อง
          if (ทาง) {
            if (!(await ปิดด้วยปุ่มปิด(แท็บ, ก))) ตก.push(`③ ${ป้าย} ⇒ กด × แล้วกล่อง ⛔ ปิด`)
            else if (!(await โฟกัสที่ปุ่ม(แท็บ, ก))) ตก.push(`③ ${ป้าย} ⇒ กด × แล้วโฟกัส ⛔ กลับปุ่ม «${ก.หัว}»`)
            if (await แท็บ.locator(ก.กล่อง).count()) await แท็บ.keyboard.press('Escape')
            await เปิดกล่อง(แท็บ, ก)
            await แท็บ.keyboard.press('Escape')
            const หายEsc = await แท็บ.waitForSelector(ก.กล่อง, { state: 'detached', timeout: 5000 }).then(() => true).catch(() => false)
            if (!หายEsc) ตก.push(`③ ${ป้าย} ⇒ กด Escape แล้วกล่อง ⛔ ปิด`)
            else if (!(await โฟกัสที่ปุ่ม(แท็บ, ก))) ตก.push(`③ ${ป้าย} ⇒ กด Escape แล้วโฟกัส ⛔ กลับปุ่ม «${ก.หัว}»`)
            if (await แท็บ.locator(ก.กล่อง).count()) await ปิดด้วยปุ่มปิด(แท็บ, ก)
            await เปิดกล่อง(แท็บ, ก)
            // ⭐ แตะนอกกล่อง ⇒ จอแคบแตะที่ว่างบนแถบบน (หน้าเต็มจอคลุมที่เหลือ) · จอกว้างแตะตัวบทคอลัมน์แรก ⇒ หาจุดที่ ⛔ ใช่ของกดได้และ ⛔ อยู่ในกล่อง
            const จุด = await แท็บ.evaluate((s) => {
              const ก = document.querySelector(s)
              const ลอง = (x, y) => {
                const e = document.elementFromPoint(x, y)
                return e && !ก.contains(e) && !e.closest('a, button, input, select, label, [tabindex], [data-ข้อ]') ? { x, y } : null
              }
              const แถบ = document.querySelector('.pk-แถบบน').getBoundingClientRect()
              for (let x = แถบ.left + 4; x < แถบ.right - 4; x += 8) {
                const p = ลอง(x, แถบ.bottom - 3)
                if (p) return p
              }
              return null
            }, ก.กล่อง)
            if (!จุด) ตก.push(`③ ${ป้าย} ⇒ หาที่ว่างนอกกล่องให้แตะไม่เจอ ⇒ ตรวจแตะนอกกล่องไม่ได้`)
            else {
              await แท็บ.mouse.click(จุด.x, จุด.y)
              const หายนอก = await แท็บ.waitForSelector(ก.กล่อง, { state: 'detached', timeout: 5000 }).then(() => true).catch(() => false)
              if (!หายนอก) ตก.push(`③ ${ป้าย} ⇒ แตะนอกกล่อง (${จุด.x.toFixed(0)},${จุด.y.toFixed(0)}) แล้วกล่อง ⛔ ปิด`)
            }
            if (await แท็บ.locator(ก.กล่อง).count()) await ปิดด้วยปุ่มปิด(แท็บ, ก)
          } else if (await แท็บ.locator(ก.กล่อง).count()) await ปิดด้วยปุ่มปิด(แท็บ, ก)
        }
        // ③ จอกว้าง ⇒ กดปุ่มเดิมซ้ำ = ปิด · กดอีกปุ่มตอนกล่องหนึ่งเปิด = สลับ ⇒ เปิดทีละกล่อง
        if (ทาง && !เต็มจอ && กล่อง.length === 2) {
          const [ฟ, ไอ] = กล่องทั้งหมด
          await เปิดกล่อง(แท็บ, ฟ)
          await ปุ่มของ(แท็บ, ไอ).click()
          await แท็บ.waitForSelector(ไอ.กล่อง, { state: 'visible', timeout: 10000 }).catch(() => {})
          const สอง = await แท็บ.evaluate((ss) => ss.map((s) => !!document.querySelector(s)), [ฟ.กล่อง, ไอ.กล่อง])
          if (สอง[0] || !สอง[1]) ตก.push(`③ ${ป้ายจอ} ⇒ กด i ตอนกล่องเฟืองเปิด ⇒ เฟือง ${สอง[0] ? 'ยังเปิด' : 'ปิด'} · i ${สอง[1] ? 'เปิด' : 'ไม่เปิด'} ⛔ ต้องสลับไปกล่อง i ทีละกล่อง`)
          await ปุ่มของ(แท็บ, ไอ).click()
          const ซ้ำปิด = await แท็บ.waitForSelector(ไอ.กล่อง, { state: 'detached', timeout: 5000 }).then(() => true).catch(() => false)
          if (!ซ้ำปิด) ตก.push(`③ ${ป้ายจอ} ⇒ กดปุ่ม i ซ้ำตอนกล่องเปิด ⇒ กล่อง ⛔ ปิด`)
        }
      } catch (e) {
        ตก.push(`${ป้ายจอ} ⇒ ด่านล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
      } finally {
        await ctx.close()
      }
    }
  return ตก
}

// ================================================================ ⑥ ปุ่มบนหัว
const อ่านปุ่มบนหัว = (แท็บ) =>
  แท็บ.evaluate((ชื่อ) => {
    const แถบ = document.querySelector('.pk-แถบบน').getBoundingClientRect()
    return ชื่อ.map((n) => {
      const ป = [...document.querySelectorAll(`[data-ปุ่ม="${n}"]`)].find((x) => x.getClientRects().length)
      if (!ป) return null
      const r = ป.getBoundingClientRect()
      const หัว = ป.closest('.pk-หัวช่อง')
      const rh = หัว.getBoundingClientRect()
      const ปิด = หัว.querySelector('.pk-ปุ่มปิดช่อง')
      const rx = ปิด?.getBoundingClientRect()
      const ตรงนั้น = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
      // ⭐ คำที่ตาเห็นบนปุ่ม ⇒ ตัวหนังสือทุกชิ้นในปุ่มที่ ⛔ ซ่อนจากตา (`pk-เฉพาะเสียง`) ⇒ ต้องว่าง
      const คำ = [...ป.querySelectorAll('*'), ป]
        .flatMap((e) => [...e.childNodes].filter((t) => t.nodeType === 3 && t.textContent.trim()).map((t) => [e, t.textContent.trim()]))
        .filter(([e]) => !e.closest('.pk-เฉพาะเสียง') && e.getClientRects().length)
        .map(([, t]) => t)
      // ⭐ ปุ่มอื่นในหัวที่อยู่แถวเดียวกับ × ⇒ × ต้องขวาสุดของแถวนั้น
      const แถวบน = rx ? [...หัว.querySelectorAll('button, select')].filter((b) => b.getClientRects().length && Math.abs(b.getBoundingClientRect().top - rx.top) <= 1.5) : []
      return {
        ชื่อ: ป.getAttribute('aria-label'),
        คำ,
        กาง: ป.getAttribute('aria-expanded'),
        r: { l: r.left, r: r.right, t: r.top, b: r.bottom, w: r.width, h: r.height },
        หัว: { l: rh.left, r: rh.right, t: rh.top, b: rh.bottom },
        จอ: document.documentElement.clientWidth,
        สูงจอ: innerHeight,
        ล่างแถบ: แถบ.bottom,
        ไม่ถูกทับ: !!ตรงนั้น && (ตรงนั้น === ป || ป.contains(ตรงนั้น)),
        ปิดขวาสุด: !rx || แถวบน.every((b) => b.getBoundingClientRect().right <= rx.right + 0.5),
      }
    })
  }, กล่องทั้งหมด.map((x) => x.ปุ่ม))

async function ตรวจปุ่มบนหัว(พัง, { จอ = จอทั้งหมด, ใหญ่ = [false, true] } = {}) {
  const ตก = []
  for (const ตัวใหญ่ of ใหญ่)
    for (const w of จอ) {
      const ป้าย = `⑥ จอ ${w}${ตัวใหญ่ ? ' ตัวอักษร 200%' : ''}`
      const { ctx, แท็บ, พร้อม } = await เปิด({ กว้าง: w, ใหญ่: ตัวใหญ่, สูง: w === 344 ? 882 : undefined, พัง })
      try {
        if (!พร้อม) {
          ตก.push(`${ป้าย} ⇒ หน้า ⛔ พร้อม`)
          continue
        }
        const ตรวจตอน = async (ตอน) => {
          const ทั้งสอง = await อ่านปุ่มบนหัว(แท็บ)
          ทั้งสอง.forEach((ป, i) => {
            const ก = กล่องทั้งหมด[i]
            if (!ป) return ตก.push(`${ป้าย}${ตอน} ⇒ หัวคอลัมน์ภาษาเดิม ⛔ มีปุ่ม «${ก.หัว}» ที่ตาเห็น`)
            if (ป.ชื่อ !== ก.หัว) ตก.push(`${ป้าย}${ตอน} ⇒ ปุ่ม${ก.ชื่อ} ได้ยินชื่อ «${ป.ชื่อ}» ⛔ ไม่ใช่ «${ก.หัว}» (SC 4.1.2)`)
            // ⚠️ ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/155 ⇒ จอตั้งแต่ 1100 ตาเห็นคำข้างรูป ⇒ เกณฑ์ข้อ 6 ของใบ #154 เหลือเฉพาะจอที่แคบกว่า
            //   ⇒ ⛔ ผ่อน ⇒ จอแคบกว่าเส้นยังต้องว่าง ⇒ ตั้งแต่เส้นต้องเป็นคำที่อนุมัติคำเดียวตรงตัว ⇒ คำเกินหรือคำอื่น ⇒ แดง
            const ควร = คำที่ควรเห็น(w, ก.คำ)
            if (ป.คำ.join(' ') !== ควร)
              ตก.push(`${ป้าย}${ตอน} ⇒ ปุ่ม${ก.ชื่อ} มีคำบนจอ «${ป.คำ.join(' ')}» ⛔ ต้องเป็น${ควร ? ` «${ควร}» คำเดียว (ใบ #155)` : 'รูปอย่างเดียว (เกณฑ์ข้อ 6 · ใบ #155 จอแคบกว่า 1100)'}`)
            if (ป.กาง !== 'false') ตก.push(`${ป้าย}${ตอน} ⇒ ปุ่ม${ก.ชื่อ} บอก aria-expanded=${ป.กาง} ตอนกล่องปิด ⛔ ไม่ใช่ false`)
            if (ป.r.w < เป้า - 0.01 || ป.r.h < เป้า - 0.01) ตก.push(`${ป้าย}${ตอน} ⇒ ปุ่ม${ก.ชื่อ} ${ป.r.w.toFixed(1)}×${ป.r.h.toFixed(1)} ⛔ เล็กกว่า ${เป้า} จุด`)
            if (ป.r.l < -0.5 || ป.r.r > ป.จอ + 0.5 || ป.r.l < ป.หัว.l - 0.5 || ป.r.r > ป.หัว.r + 0.5 || ป.r.b > ป.หัว.b + 0.5)
              ตก.push(`${ป้าย}${ตอน} ⇒ ปุ่ม${ก.ชื่อ} (${ป.r.l.toFixed(0)}–${ป.r.r.toFixed(0)}) ⛔ อยู่ในจอและในหัว (หัว ${ป.หัว.l.toFixed(0)}–${ป.หัว.r.toFixed(0)} · จอ ${ป.จอ})`)
            if (ป.r.t < ป.ล่างแถบ - 0.5 || ป.r.b > ป.สูงจอ + 0.5) ตก.push(`${ป้าย}${ตอน} ⇒ ปุ่ม${ก.ชื่อ} อยู่ที่ ${ป.r.t.toFixed(0)}–${ป.r.b.toFixed(0)} ⛔ อยู่บนจอใต้แถบบน (${ป.ล่างแถบ.toFixed(0)})`)
            if (!ป.ไม่ถูกทับ) ตก.push(`${ป้าย}${ตอน} ⇒ ปุ่ม${ก.ชื่อ} ถูกของอื่นทับ ⛔ กดไม่ได้`)
            if (!ป.ปิดขวาสุด) ตก.push(`${ป้าย}${ตอน} ⇒ × ของหัวคำเดิม ⛔ ขวาสุดของแถวบน (SC 3.2.4)`)
          })
          // ⭐ เกณฑ์แถวของใบ #150 เป็นของจอแคบ ⇒ จอกว้างแถบหัวเป็นตารางตรงคอลัมน์ (หัวซ้อนแถวได้ตามที่ว่าง) ⇒ ตรวจเฉพาะ ⛔ ล้น · อยู่ในจอ · ⛔ ถูกทับ
          //   ⇒ แล้วตรวจแทนว่าหัวคำเดิมเองยังแถวเดียว (ปุ่มทุกตัวในหัวขอบบนเดียวกัน) ⇒ เกณฑ์เดิมของ `ด่านเครื่องมือภาษาเดิม` ข้อ ④
          const แถบ = await อ่านแถบหัว(แท็บ)
          for (const ผิด of ผิดเกณฑ์แถวหัว(w < เส้นจอกว้าง ? แถบ : แถบ.map((x) => ({ ...x, แถว: 1 })))) ตก.push(`${ป้าย}${ตอน} ⇒ ${ผิด}`)
          if (w >= เส้นจอกว้าง) {
            const ต่าง = await แท็บ.evaluate(() => {
              const ป = [...document.querySelectorAll('[data-ปุ่ม="เครื่องมือภาษาเดิม"]')].find((x) => x.getClientRects().length)
              const บน = [...(ป?.closest('.pk-หัวช่อง')?.querySelectorAll('button, select') ?? [])].filter((x) => x.getClientRects().length && !x.closest('.pk-แผงคำเดิม')).map((x) => {
                const r = x.getBoundingClientRect()
                return (r.top + r.bottom) / 2
              })
              return บน.length ? Math.max(...บน) - Math.min(...บน) : 0
            })
            // ⭐ เทียบเส้นกลางของปุ่ม ⛔ ขอบบน ⇒ ตัวอักษร 200% ปุ่มตอนเตี้ยกว่าช่องฉบับ 4 จุดอยู่แล้วก่อนใบนี้ (ขอบบนต่าง 1 ถึง 2 จุดทั้งที่อยู่แถวเดียวกัน)
            if (ต่าง > 1.5) ตก.push(`${ป้าย}${ตอน} ⇒ หัวคอลัมน์ภาษาเดิม ⛔ แถวเดียว ⇒ เส้นกลางของปุ่มในหัวต่างกัน ${ต่าง.toFixed(1)} จุด`)
          }
          if ((await แท็บ.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)) > 0)
            ตก.push(`${ป้าย}${ตอน} ⇒ หน้าเลื่อนด้านข้างได้ ⛔ (SC 1.4.10)`)
        }
        await ตรวจตอน('')
        // ⭐ หนึบไปกับหัว ⇒ เลื่อนลงกลางบท ⇒ ปุ่มยังอยู่บนจอใต้แถบบนและกดได้
        await แท็บ.evaluate(() => {
          const e = [...document.querySelectorAll('.pk-ตัวบท [data-ข้อ="2:14"]')].find((x) => x.getClientRects().length)
          if (e) window.scrollTo(0, window.scrollY + e.getBoundingClientRect().top - innerHeight / 2)
        })
        await รอสองเฟรม(แท็บ)
        await รอสองเฟรม(แท็บ)
        await ตรวจตอน(' (เลื่อนลงกลางบท)')
        // ⭐ จอกว้าง ⇒ เปิดเฟืองแล้วเลื่อน 600 จุด ⇒ แผงยังติดใต้หัว ⇒ ช่องติ๊กแรกกดได้
        if (w >= เส้นจอกว้าง) {
          const ก = กล่องทั้งหมด[0]
          await เปิดกล่อง(แท็บ, ก)
          await แท็บ.evaluate(() => window.scrollBy(0, 600))
          await รอสองเฟรม(แท็บ)
          await รอสองเฟรม(แท็บ)
          const ล = await แท็บ.evaluate((s) => {
            const กล่อง = document.querySelector(s)
            const ป = [...document.querySelectorAll('[data-ปุ่ม="เครื่องมือภาษาเดิม"]')].find((x) => x.getClientRects().length)
            if (!กล่อง || !ป) return null
            const หัว = ป.closest('.pk-หัวช่อง').getBoundingClientRect()
            const แถบหัว = ป.closest('.pk-หัวคอลัมน์')?.getBoundingClientRect()
            const ช่อง = กล่อง.querySelector('input[type="checkbox"]')
            const c = ช่อง?.getBoundingClientRect()
            const ตรงนั้น = c ? document.elementFromPoint(c.left + c.width / 2, c.top + c.height / 2) : null
            return { t: กล่อง.getBoundingClientRect().top, หัวล่าง: Math.max(หัว.bottom, แถบหัว?.bottom ?? 0), กดได้: !!ตรงนั้น && กล่อง.contains(ตรงนั้น) }
          }, ก.กล่อง)
          if (!ล || Math.abs(ล.t - ล.หัวล่าง) > 1.5 || !ล.กดได้)
            ตก.push(`${ป้าย} ⇒ เปิดเฟืองแล้วเลื่อน 600 จุด ⇒ แผง ⛔ ติดใต้หัวที่หนึบหรือช่องติ๊กกดไม่ได้ (${JSON.stringify(ล)})`)
          await ปิดด้วยปุ่มปิด(แท็บ, ก)
        }
      } catch (e) {
        ตก.push(`${ป้าย} ⇒ ด่านล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
      } finally {
        await ctx.close()
      }
    }
  return ตก
}

// ================================================================ ⑦ ของในกล่อง
async function ตรวจของในกล่อง(พัง, { จอ = [375, 1280] } = {}) {
  const ตก = []
  for (const w of จอ) {
    const ป้าย = `⑦ จอ ${w}`
    const { ctx, แท็บ, พร้อม } = await เปิด({ กว้าง: w, พัง })
    try {
      if (!พร้อม) {
        ตก.push(`${ป้าย} ⇒ หน้า ⛔ พร้อม`)
        continue
      }
      const [ฟ, ไอ] = กล่องทั้งหมด
      await เปิดกล่อง(แท็บ, ฟ)
      const ม = await แท็บ.evaluate((s) => {
        const ก = document.querySelector(s)
        if (!ก) return null
        const เห็น = (x) => !!x && x.getClientRects().length > 0 && getComputedStyle(x).visibility !== 'hidden'
        const กาล = ก.querySelector('[data-ปุ่มสัญลักษณ์กาล]')
        const ฟส = ก.querySelector('[data-แผงเครื่องหมาย]')
        const ทุก = [...ก.querySelectorAll('*')]
        return {
          กาล: เห็น(กาล) ? กาล.textContent.trim() : '',
          กดสถานะ: กาล?.getAttribute('aria-pressed'),
          หัวกลุ่ม: เห็น(ฟส?.querySelector('legend')) ? ฟส.querySelector('legend').textContent.trim() : '',
          ช่อง: [...(ฟส?.querySelectorAll('input[type="checkbox"]') ?? [])].filter(เห็น).length,
          ลำดับ: [ทุก.indexOf(กาล), ทุก.indexOf(ฟส)],
          ความหมาย: !!ก.querySelector('[data-ปุ่มความหมาย], [data-ความหมายคำเดิม]'),
        }
      }, ฟ.กล่อง)
      if (!ม) ตก.push(`${ป้าย} · เฟือง ⇒ ⛔ มีกล่อง`)
      else {
        if (ม.กาล !== 'สัญลักษณ์กาล' || !['true', 'false'].includes(ม.กดสถานะ)) ตก.push(`${ป้าย} · เฟือง ⇒ ⛔ มีสวิตช์ «สัญลักษณ์กาล» ที่ตาเห็นและบอกสถานะ (${ม.กาล} · aria-pressed=${ม.กดสถานะ})`)
        if (ม.หัวกลุ่ม !== ชื่อปุ่มเครื่องหมาย) ตก.push(`${ป้าย} · เฟือง ⇒ หัวกลุ่มที่ตาเห็น «${ม.หัวกลุ่ม}» ⛔ ไม่ใช่ «${ชื่อปุ่มเครื่องหมาย}»`)
        if (ม.ช่อง !== 8) ตก.push(`${ป้าย} · เฟือง ⇒ ช่องติ๊กเครื่องหมายช่วยอ่านที่ตาเห็น ${ม.ช่อง} ช่อง ⛔ ไม่ใช่ 8 (ต้องกางอยู่ในกล่อง)`)
        if (!(ม.ลำดับ[0] >= 0 && ม.ลำดับ[1] > ม.ลำดับ[0])) ตก.push(`${ป้าย} · เฟือง ⇒ ลำดับ ⛔ ใช่ สัญลักษณ์กาล แล้วเครื่องหมายช่วยอ่าน (${ม.ลำดับ.join(' ')})`)
        if (ม.ความหมาย) ตก.push(`${ป้าย} · เฟือง ⇒ ยังมีปุ่มหรือกล่องความหมายในกล่องเครื่องมือ ⛔ ย้ายไปปุ่มตัว i แล้ว`)
        for (const ชื่อ of [ชื่อปุ่มเลือกทั้งหมด, ชื่อปุ่มล้างทั้งหมด])
          if ((await แท็บ.locator(ฟ.กล่อง).getByRole('button', { name: ชื่อ, exact: true }).count()) !== 1)
            ตก.push(`${ป้าย} · เฟือง ⇒ ⛔ ได้ยินปุ่ม «${ชื่อ}» ในกล่อง 1 ปุ่ม`)
      }
      await ปิดด้วยปุ่มปิด(แท็บ, ฟ)
      await เปิดกล่อง(แท็บ, ไอ)
      const ค = await แท็บ.evaluate((s) => {
        const ก = document.querySelector(s)
        if (!ก) return null
        const หัวข้อ = [...ก.querySelectorAll('.pk-หัวคำอธิบาย')].map((x) => x.textContent.trim())
        const ค = ก.querySelector('[data-เครดิตเน้น]')
        const ลิงก์ = [...(ค?.querySelectorAll('a') ?? [])].map((a) => [a.textContent.trim(), a.getAttribute('href')])
        let เห็นเครดิต = false
        if (ค) {
          ค.scrollIntoView({ block: 'center' })
          const r = ค.getBoundingClientRect()
          const ตรงนั้น = document.elementFromPoint(r.left + Math.min(20, r.width / 2), r.top + Math.min(10, r.height / 2))
          เห็นเครดิต = !!ตรงนั้น && ค.contains(ตรงนั้น)
        }
        return { หัวข้อ, เครดิต: (ค?.textContent || '').replace(/\s+/g, ' ').trim(), ลิงก์, เห็นเครดิต, กาล: !!ก.querySelector('[data-คำอธิบายกาล]'), เน้น: !!ก.querySelector('[data-คำอธิบายเน้น]') }
      }, ไอ.กล่อง)
      if (!ค) ตก.push(`${ป้าย} · i ⇒ ⛔ มีกล่อง`)
      else {
        if (JSON.stringify(ค.หัวข้อ) !== JSON.stringify(['สัญลักษณ์กาล', ชื่อปุ่มเครื่องหมาย]) || !ค.กาล || !ค.เน้น)
          ตก.push(`${ป้าย} · i ⇒ หัวข้อย่อย ${JSON.stringify(ค.หัวข้อ)} ⛔ ใช่ สัญลักษณ์กาล · ${ชื่อปุ่มเครื่องหมาย} ในกล่องเดียว`)
        if (ค.เครดิต !== เครดิตเต็ม.replace(/\s+/g, ' ').trim()) ตก.push(`${ป้าย} · i ⇒ เครดิต SIL ⛔ ครบตรงตัว ⇒ ได้ «${ค.เครดิต.slice(0, 80)}…»`)
        const ลิงก์ที่ต้องมี = [
          [เครดิตLGNTDF.ลิงก์LGNTDF.ข้อความ, เครดิตLGNTDF.ลิงก์LGNTDF.ที่อยู่],
          [เครดิตLGNTDF.ลิงก์SIL.ข้อความ, เครดิตLGNTDF.ลิงก์SIL.ที่อยู่],
        ]
        if (JSON.stringify(ค.ลิงก์) !== JSON.stringify(ลิงก์ที่ต้องมี)) ตก.push(`${ป้าย} · i ⇒ ลิงก์ในเครดิต ${JSON.stringify(ค.ลิงก์)} ⛔ ครบ (LGNTDF · SIL)`)
        if (!ค.เห็นเครดิต) ตก.push(`${ป้าย} · i ⇒ เลื่อนไปถึงเครดิตแล้ว ⛔ ตาเห็น (ถูกของอื่นทับ)`)
      }
      await ปิดด้วยปุ่มปิด(แท็บ, ไอ)
    } catch (e) {
      ตก.push(`${ป้าย} ⇒ ด่านล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

// ================================================================ ⑧ ปิดแล้วกลับข้อเดิม (จอแคบ)
const ขอบบนข้อ = (แท็บ, k) =>
  แท็บ.evaluate((k) => {
    const e = [...document.querySelectorAll(`.pk-ตัวบท [data-ข้อ="${k}"]`)].find((x) => x.getClientRects().length)
    return e ? e.getBoundingClientRect().top : NaN
  }, k)
async function ตรวจกลับข้อเดิม(พัง, { จอ = [344, 375, 412, 484] } = {}) {
  const ตก = []
  for (const w of จอ) {
    const ป้าย = `⑧ จอ ${w}`
    const { ctx, แท็บ, พร้อม } = await เปิด({ กว้าง: w, สูง: w === 344 ? 882 : undefined, พัง })
    try {
      if (!พร้อม) {
        ตก.push(`${ป้าย} ⇒ หน้า ⛔ พร้อม`)
        continue
      }
      // ⭐ เลื่อนให้ข้อ 2:12 อยู่ใต้แถบหนึบ ⇒ หน้าที่เพิ่งเปิดยังยึดต้นบทอยู่ครู่หนึ่ง (ตัวยึดของหน้า) ⇒ เลื่อนซ้ำจนข้อนั้นอยู่บนจอจริง (ไม่เกิน 5 รอบ)
      //   ⇒ ⛔ รอเป็นเวลาตายตัว ⇒ วัดตำแหน่งจริงหลังรอ 4 เฟรมทุกรอบ ⇒ ไม่ถึงจริง ⇒ แดงว่าตรวจไม่ได้ ⛔ ปล่อยผ่าน
      let ก่อน = NaN
      for (let รอบ = 0; รอบ < 5; รอบ++) {
        await แท็บ.evaluate(() => {
          const e = [...document.querySelectorAll('.pk-ตัวบท [data-ข้อ="2:12"]')].find((x) => x.getClientRects().length)
          const บน = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pk-ขอบล่างหนึบ')) || 160
          if (e) window.scrollTo(0, window.scrollY + e.getBoundingClientRect().top - บน - 40)
        })
        await รอสองเฟรม(แท็บ)
        await รอสองเฟรม(แท็บ)
        ก่อน = await ขอบบนข้อ(แท็บ, '2:12')
        if (ก่อน > 0 && ก่อน < 400) break
      }
      if (!(ก่อน > 0 && ก่อน < 400)) {
        ตก.push(`${ป้าย} ⇒ เลื่อนให้ข้อ 2:12 อยู่บนจอ ⛔ ได้ (อยู่ที่ ${ก่อน}) ⇒ ตรวจการพากลับไม่ได้`)
        continue
      }
      const [ฟ] = กล่องทั้งหมด
      if (!(await เปิดกล่อง(แท็บ, ฟ))) {
        ตก.push(`${ป้าย} ⇒ เปิดกล่องเฟือง ⛔ ได้`)
        continue
      }
      // ⭐ เปลี่ยนของในกล่อง ⇒ คำกรีกข้างหลังจัดแถวใหม่ ⇒ ข้อที่อ่านไหล
      await แท็บ.locator(ฟ.กล่อง).getByRole('button', { name: ชื่อปุ่มเลือกทั้งหมด, exact: true }).click()
      await แท็บ.locator(`${ฟ.กล่อง} [data-ปุ่มสัญลักษณ์กาล]`).click()
      await แท็บ.waitForFunction(() => (document.querySelector('.pk-ตัวบท')?.getAttribute('data-จัดแถว') ?? 'เสร็จ') === 'เสร็จ', null, { timeout: รอนานสุด }).catch(() => {})
      await รอสองเฟรม(แท็บ)
      // ⭐ ตัวยึดของหน้า (`จำที่ยึด`) ถือข้อที่อ่านไว้ระหว่างคำกรีกจัดแถวใหม่อยู่แล้ว ⇒ วัดเองแล้ว ข้อ 2:12 ขยับไม่ถึง 1 จุด
      //   ⇒ ⛔ พอทดสอบการพากลับตอนปิด ⇒ เลื่อนหน้าข้างหลัง 400 จุดระหว่างที่กล่องเปิด (แทนของที่โหลดมาทีหลังหรือแถบของเบราว์เซอร์ที่ยุบ)
      //   ⇒ ข้อต้องขยับจริงก่อนปิด ⇒ ⛔ ขยับ = ข้อนี้ไม่ได้ทดสอบอะไร ⇒ แดง
      await แท็บ.evaluate(() => window.scrollBy(0, 400))
      await รอสองเฟรม(แท็บ)
      const ระหว่าง = await ขอบบนข้อ(แท็บ, '2:12')
      if (Math.abs(ระหว่าง - ก่อน) <= 2) ตก.push(`${ป้าย} ⇒ ข้อ 2:12 ⛔ ขยับเลยระหว่างที่กล่องเปิด ⇒ ตรวจการพากลับไม่ได้`)
      if (พัง?.ก่อนปิด) await แท็บ.evaluate(พัง.ก่อนปิด)
      await ปิดด้วยปุ่มปิด(แท็บ, ฟ)
      await แท็บ
        .waitForFunction(
          () => {
            const e = [...document.querySelectorAll('.pk-ตัวบท [data-ข้อ="2:12"]')].find((x) => x.getClientRects().length)
            const v = e ? Math.round(e.getBoundingClientRect().top) : NaN
            const น = (window.__ด่าน154กลับ ??= { ก่อน: NaN, นับ: 0 })
            น.นับ = v === น.ก่อน ? น.นับ + 1 : 0
            น.ก่อน = v
            return น.นับ >= 3
          },
          null,
          { polling: 'raf', timeout: รอนานสุด },
        )
        .catch(() => {})
      const หลัง = await ขอบบนข้อ(แท็บ, '2:12')
      if (!(Math.abs(หลัง - ก่อน) <= 2)) ตก.push(`${ป้าย} ⇒ ปิดกล่องเฟืองด้วย × แล้วข้อ 2:12 อยู่ที่ ${หลัง.toFixed(1)} ⛔ ใช่ระดับเดิม ${ก่อน.toFixed(1)} (±2)`)
      if (!พัง) console.log(`   ${ป้าย} ⇒ ข้อ 2:12 ก่อนเปิด ${ก่อน.toFixed(1)} · ตอนเปิด ${ระหว่าง.toFixed(1)} · หลังปิด ${หลัง.toFixed(1)}`)
    } catch (e) {
      ตก.push(`${ป้าย} ⇒ ด่านล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

// ================================================================ ⑨ ของที่ถอด ⛔ กลับมา · ค่าเก่า · ฮีบรู
async function ตรวจของที่ถอด(พัง, { จอ = [375, 1280] } = {}) {
  const ตก = []
  for (const w of จอ) {
    const ป้าย = `⑨ จอ ${w}`
    // ⭐ ค่าเก่าของใบ #151 ⇒ `เครื่องมือ: true` (ตั้งต้นกาง) ⇒ คู่กับสัญลักษณ์กาลที่ปิดไว้ ⇒ ค่านั้นต้องยังมีผล
    const { ctx, แท็บ, พร้อม } = await เปิด({ กว้าง: w, มุมเพิ่ม: { เครื่องมือ: true, สัญลักษณ์กาล: false }, พัง })
    try {
      if (!พร้อม) {
        ตก.push(`${ป้าย} ⇒ หน้าที่มีค่าเก่า (เครื่องมือ: true) ⛔ พร้อม`)
        continue
      }
      await รอสองเฟรม(แท็บ)
      const ส = await แท็บ.evaluate(() => ({
        กล่อง: !!document.querySelector('#pk-เครื่องมือภาษาเดิม, #pk-คำอธิบายสัญลักษณ์, [data-หัวคำเดิม]'),
        แถวเดิม: !!document.querySelector('.pk-คำเดิมใต้หัว, .pk-คำเดิมในหน้าAa'),
        กาล: document.querySelectorAll('.pk-กล่องคำ.pk-แสดงกาล').length,
        เฟือง: !![...document.querySelectorAll('[data-ปุ่ม="เครื่องมือภาษาเดิม"]')].find((x) => x.getClientRects().length),
      }))
      if (ส.กล่อง || ส.แถวเดิม) ตก.push(`${ป้าย} ⇒ ค่าเก่า เครื่องมือ: true ⇒ กล่องหรือแถวเครื่องมือเปิดเองตอนโหลดหน้า ⛔ ต้องปิดอยู่จนผู้อ่านกด`)
      if (ส.กาล) ตก.push(`${ป้าย} ⇒ ค่าเก่า สัญลักษณ์กาล: false ⇒ ยังมีคำที่แสดงกาล ${ส.กาล} คำ ⛔ ค่าที่จำไว้ต้องยังมีผล`)
      if (!ส.เฟือง) ตก.push(`${ป้าย} ⇒ ค่าเก่าในเครื่อง ⇒ ⛔ มีปุ่มเฟืองบนหัวคำเดิม`)
      const เดิม = await แท็บ.getByRole('button', { name: ตาเห็นปุ่มเครื่องมือเดิม, exact: true }).count()
      if (เดิม) ตก.push(`${ป้าย} ⇒ ยังมีปุ่มที่ได้ยิน «${ตาเห็นปุ่มเครื่องมือเดิม}» (ใบ #151) ${เดิม} ปุ่ม ⛔ ต้องถอด (เกณฑ์ข้อ 5)`)
      await กางแผงAa(แท็บ)
      const ในAa = await แท็บ.evaluate(() => {
        const ก = document.getElementById('pk-แผงAa')
        return ก ? ก.querySelectorAll('[data-หมวด="เครื่องมือภาษาเดิม"], [data-หัวคำเดิม], [data-ปุ่มสัญลักษณ์กาล], [data-แผงเครื่องหมาย]').length : -1
      })
      const กลุ่มเดิม = await แท็บ.locator('#pk-แผงAa').getByRole('group', { name: หัวหมวดเครื่องมือเดิม, exact: true }).count()
      if (ในAa !== 0 || กลุ่มเดิม) ตก.push(`${ป้าย} ⇒ หน้า Aa ยังมีหมวด «${หัวหมวดเครื่องมือเดิม}» หรือตัวคุมคำเดิม (${ในAa} · กลุ่ม ${กลุ่มเดิม}) ⛔ ต้องถอด (เกณฑ์ข้อ 5)`)
    } catch (e) {
      ตก.push(`${ป้าย} ⇒ ด่านล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
    // ⭐ ปิดคอลัมน์ภาษาเดิม ⇒ ⛔ มีสองปุ่ม · คำฮีบรู ⇒ เฟืองอย่างเดียว ⛔ มี i
    //   ⇒ ⚠️ ของเดิม (ใบ #154) ⇒ คำฮีบรู ⛔ มีสองปุ่ม ⇒ พี่เอมขอ 17 พ.ย. 2569 ⇒ สวิตช์ *แสดงตัวอักษรกรีก/ฮีบรู* ย้ายจาก Aa มาที่เฟือง
    //     ⇒ ฮีบรูมีของให้คุมแล้ว ⇒ ของในกล่องเฟืองของฮีบรู ⇒ เจ้าของคือ `tools/ด่านซ่อนตัวเดิม.mjs` ข้อ ⑧
    for (const [ชื่อ, ค่า, เฟือง] of [
      ['ปิดคอลัมน์ภาษาเดิม', { เดิม: false }, 0],
      ['คำฮีบรู นางรูธ 1', { เล่ม: 'RUT', บท: 1 }, 1],
    ]) {
      const { ctx: c2, แท็บ: ท2, พร้อม: พ2 } = await เปิด({ กว้าง: w, ...ค่า, พัง })
      try {
        if (!พ2) ตก.push(`${ป้าย} · ${ชื่อ} ⇒ หน้า ⛔ พร้อม`)
        else {
          if (await ท2.locator('[data-ปุ่ม="คำอธิบายสัญลักษณ์"]').count())
            ตก.push(`${ป้าย} · ${ชื่อ} ⇒ มีปุ่ม i ⛔ ต้องมีเฉพาะตอนเปิดคอลัมน์คำกรีก`)
          const มีเฟือง = await ท2.locator('[data-ปุ่ม="เครื่องมือภาษาเดิม"]:visible').count()
          if (มีเฟือง !== เฟือง) ตก.push(`${ป้าย} · ${ชื่อ} ⇒ ปุ่มเฟืองที่ตาเห็น ${มีเฟือง} ปุ่ม ⛔ ต้องเป็น ${เฟือง}`)
        }
      } finally {
        await c2.close()
      }
    }
  }
  return ตก
}

// ================================================================ ⑩ เส้นข้างคอลัมน์คำภาษาเดิมในตัวบท
const ชุดเส้น = [
  { ป้าย: 'จอ 1280 TCV + คำเดิม (คอลัมน์ทั้งบท)', กว้าง: 1280, ฉบับ: ['TCV'] },
  { ป้าย: 'จอ 1100 TCV + คำเดิม', กว้าง: 1100, ฉบับ: ['TCV'] },
  { ป้าย: 'จอ 1280 คำเดิมก่อน TCV', กว้าง: 1280, ฉบับ: ['TCV'], ต่อท้าย: '&t=SBLGNT,TCV' },
  { ป้าย: 'จอ 1280 TCV THKJV + คำเดิม (ช่องในตารางที่ห่อแถว)', กว้าง: 1280, ฉบับ: ['TCV', 'THKJV'] },
  { ป้าย: 'จอ 1280 TCV THKJV LSV + คำเดิม (ช่องในตารางห่อ 2 แถว ⇒ ฉบับที่ห่อลงมาอยู่ใต้คอลัมน์แรก)', กว้าง: 1280, ฉบับ: ['TCV', 'THKJV', 'LSV'] },
  { ป้าย: 'จอ 1920 TCV THKJV LSV + คำเดิม (แทรกในตาราง)', กว้าง: 1920, ฉบับ: ['TCV', 'THKJV', 'LSV'] },
  { ป้าย: 'จอ 412 ซ้ายขวา', กว้าง: 412, ฉบับ: ['TCV'], วาง: 'ซ้ายขวา' },
  { ป้าย: 'จอ 375 ซ้ายขวา', กว้าง: 375, ฉบับ: ['TCV'], วาง: 'ซ้ายขวา' },
]
/** เส้นทุกเส้นในตัวบท ⇒ `::before` `::after` ที่ลอย กว้างไม่เกิน 2 จุด ⇒ กล่องอ้างอิงคือเจ้าของ หรือช่องของตารางที่ระบุ (ท่าเดียวกับ `tools/ด่านเส้นแบ่งคอลัมน์.mjs`) */
const อ่านเส้นตัวบท = (แท็บ, บท) =>
  แท็บ.evaluate((c) => {
    const px = (v) => parseFloat(v) || 0
    const ตัวลอง = document.createElement('div')
    ตัวลอง.style.cssText = 'position:absolute;visibility:hidden;height:var(--pk-ช่องคอลัมน์);background:var(--pk-สีเส้นคอลัมน์)'
    document.body.appendChild(ตัวลอง)
    const ช่องคอลัมน์ = ตัวลอง.getBoundingClientRect().height
    const สีเส้น = getComputedStyle(ตัวลอง).backgroundColor
    ตัวลอง.remove()
    const เส้น = []
    for (const e of document.querySelectorAll('.pk-ตัวบท, .pk-ตัวบท *')) {
      for (const p of ['::before', '::after']) {
        const cs = getComputedStyle(e, p)
        if (!cs.content || cs.content === 'none' || cs.content === 'normal' || cs.display === 'none' || cs.position !== 'absolute') continue
        const กว้าง = px(cs.width)
        if (กว้าง <= 0 || กว้าง > 2) continue
        const r = e.getBoundingClientRect()
        const hs = getComputedStyle(e)
        // ⭐ กล่องอ้างอิงของของลอย = ขอบในของเจ้าของ (หักเส้นขอบ ⇒ แผ่นคำเดิมมีเส้นขอบใส 1 จุด)
        let ซ้าย = r.left + px(hs.borderLeftWidth)
        const ช่อง = parseInt(cs.gridColumnStart, 10)
        if (Number.isFinite(ช่อง) && hs.display === 'grid') {
          const ตาราง = /^subgrid/.test(hs.gridTemplateColumns) ? e.parentElement : e
          const ms = getComputedStyle(ตาราง)
          const ทาง = ms.gridTemplateColumns.split(/\s+/).map(px)
          if (ช่อง - 1 > ทาง.length) continue
          let x = ตาราง.getBoundingClientRect().left + px(ms.paddingLeft) + px(ms.borderLeftWidth)
          for (let i = 0; i < ช่อง - 1; i++) x += ทาง[i] + px(ms.columnGap)
          ซ้าย = x
        }
        เส้น.push({
          x: ซ้าย + px(cs.left) + กว้าง / 2,
          บน: r.top + px(hs.borderTopWidth) + scrollY + px(cs.top),
          ล่าง: r.bottom - px(hs.borderBottomWidth) + scrollY - px(cs.bottom),
          สี: cs.backgroundColor,
        })
      }
    }
    // ⭐ คอลัมน์ในบทนี้ ⇒ แผ่นคำเดิมทั้งบท · ช่องคำเดิม · ช่องคำแปล ⇒ จัดกลุ่มตามขอบซ้าย ⇒ คอลัมน์ไหนมีคำเดิม
    const ข้อ = [...document.querySelectorAll(`.pk-ตัวบท [data-ข้อ^="${c}:"]`)].filter((x) => x.getClientRects().length)
    const กล่อง = [
      ...document.querySelectorAll(`.pk-ตัวบท > .pk-ชั้นคำ:not(.pk-คำใต้แถว)[aria-label$=" ${c}"], .pk-ตัวบท .pk-ช่องคำเดิม, .pk-ตัวบท .pk-ช่องฉบับ`),
    ].filter((x) => x.getClientRects().length && x.getBoundingClientRect().width > 0)
    const คอลัมน์ = []
    for (const g of กล่อง) {
      const r = g.getBoundingClientRect()
      const เดิม = g.matches('.pk-ชั้นคำ, .pk-ช่องคำเดิม')
      const มี = คอลัมน์.find((k) => Math.abs(k.ซ้าย - r.left) <= 2)
      if (มี) {
        มี.เดิม ||= เดิม
        มี.ขวา = Math.max(มี.ขวา, r.right)
      } else คอลัมน์.push({ ซ้าย: r.left, ขวา: r.right, เดิม })
    }
    คอลัมน์.sort((a, b) => a.ซ้าย - b.ซ้าย)
    // ⭐ รอยต่อข้างคอลัมน์คำเดิม ⇒ วัดจากขอบของคอลัมน์คำเดิมเอง (แผ่นหรือช่องกว้างเต็มช่องของตาราง) ⇒ ห่างครึ่งช่องระหว่างคอลัมน์
    //   ⇒ ⛔ วัดจากกล่องตัวหนังสือของคอลัมน์คำแปล ⇒ ช่องคำแปลมีเลขข้อหรือที่ว่างท้ายช่อง ⇒ ขอบตัวหนังสือ ⛔ ใช่รอยต่อของตาราง
    const รอยต่อ = []
    for (const k of คอลัมน์.filter((x) => x.เดิม)) {
      if (คอลัมน์.some((x) => !x.เดิม && x.ซ้าย < k.ซ้าย - 2)) รอยต่อ.push(k.ซ้าย - ช่องคอลัมน์ / 2)
      if (คอลัมน์.some((x) => !x.เดิม && x.ซ้าย > k.ขวา - 2)) รอยต่อ.push(k.ขวา + ช่องคอลัมน์ / 2)
    }
    const ช่วงข้อ = ข้อ.map((x) => {
      let e = x
      while (e.parentElement && !e.parentElement.matches('.pk-ตัวบท')) e = e.parentElement
      const r = e.getBoundingClientRect()
      return { บน: r.top + scrollY, ล่าง: r.bottom + scrollY }
    })
    ช่วงข้อ.sort((a, b) => a.บน - b.บน)
    return { เส้น, รอยต่อ, ช่วงข้อ, สีเส้น, คอลัมน์: คอลัมน์.length, ข้างกัน: !!document.querySelector('.pk-คอลัมน์.pk-ซ้ายขวาจอแคบ') || innerWidth >= 768 }
  }, บท)

async function ตรวจเส้นคำเดิม(พัง, { ชุด = ชุดเส้น.map((x) => x.ป้าย) } = {}) {
  const ตก = []
  for (const ส of ชุดเส้น.filter((x) => ชุด.includes(x.ป้าย))) {
    const { ctx, แท็บ, พร้อม } = await เปิด({ กว้าง: ส.กว้าง, ฉบับ: ส.ฉบับ, ต่อท้าย: ส.ต่อท้าย || '', มุมเพิ่ม: ส.วาง ? { วางคอลัมน์: ส.วาง } : {}, พัง })
    try {
      if (!พร้อม) {
        ตก.push(`⑩ ${ส.ป้าย} ⇒ หน้า ⛔ พร้อม`)
        continue
      }
      const ว = await อ่านเส้นตัวบท(แท็บ, 2)
      if (!ว.ข้างกัน || ว.คอลัมน์ < 2 || !ว.รอยต่อ.length) {
        ตก.push(`⑩ ${ส.ป้าย} ⇒ ⛔ เจอคอลัมน์คำเดิมวางข้างคอลัมน์อื่น (คอลัมน์ ${ว.คอลัมน์} · รอยต่อ ${ว.รอยต่อ.length}) ⇒ ชุดนี้ตั้งผิด ⇒ ⛔ ตรวจไม่ได้`)
        continue
      }
      if (ว.ช่วงข้อ.length < 2) {
        ตก.push(`⑩ ${ส.ป้าย} ⇒ หาข้อของบทไม่เจอ ⇒ ⛔ ตรวจไม่ได้`)
        continue
      }
      const บน = ว.ช่วงข้อ[0].บน
      const ล่าง = ว.ช่วงข้อ.at(-1).ล่าง
      const ระดับ = []
      for (let y = บน + 1; y < ล่าง - 1; y += 12) ระดับ.push(y)
      // ⭐ กลางช่องระหว่างข้อทุกคู่ ⇒ ที่เส้นทีละข้อเคยขาด
      for (let i = 1; i < ว.ช่วงข้อ.length; i++) ระดับ.push((ว.ช่วงข้อ[i - 1].ล่าง + ว.ช่วงข้อ[i].บน) / 2)
      for (const x of ว.รอยต่อ) {
        const ตรง = ว.เส้น.filter((l) => Math.abs(l.x - x) <= 1.5)
        const สีผิด = ตรง.filter((l) => l.สี !== ว.สีเส้น)
        if (สีผิด.length) ตก.push(`⑩ ${ส.ป้าย} ⇒ เส้นที่ ${x.toFixed(0)} สี ${สีผิด[0].สี} ⛔ ไม่ใช่สีเส้นคอลัมน์ ${ว.สีเส้น}`)
        const ขาด = ระดับ.filter((y) => !ตรง.some((l) => l.บน <= y + 0.5 && l.ล่าง >= y - 0.5))
        if (ขาด.length)
          ตก.push(`⑩ ${ส.ป้าย} ⇒ เส้นข้างคอลัมน์คำเดิมที่ ${x.toFixed(0)} ⛔ ต่อกันตลอดตัวบท ⇒ ขาด ${ขาด.length} จาก ${ระดับ.length} ระดับ (เช่น ${ขาด.slice(0, 3).map((y) => (y - บน).toFixed(0)).join(' · ')} จุดจากข้อแรก)`)
      }
      if (!พัง) console.log(`   ⑩ ${ส.ป้าย} ⇒ รอยต่อข้างคำเดิม ${ว.รอยต่อ.length} เส้น · วัด ${ระดับ.length} ระดับ ตลอด ${(ล่าง - บน).toFixed(0)} จุด`)
    } catch (e) {
      ตก.push(`⑩ ${ส.ป้าย} ⇒ ด่านล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

// ---------------------------------------------------------------- ของพังที่ยัดในโหมดพิสูจน์ ⇒ ⛔ ใช่ของที่อยู่ในเว็บจริง
const ของพัง = {
  // ① จอแคบยังเป็นแผงเล็กใต้ปุ่ม ⇒ ⛔ หน้าเต็มจอ
  จอแคบแผงเล็ก: {
    css: '.pk-แผงคำเดิม.pk-กล่องเด้ง.pk-เต็มจอ { position: fixed !important; top: 50% !important; left: auto !important; right: 0 !important; bottom: auto !important; width: 14rem !important; max-height: 40vh !important; }',
  },
  // ① จอกว้างเป็นหน้าเต็มจอ ⇒ ⛔ แผงลงมา
  จอกว้างเต็มจอ: { css: '@media (min-width: 768px) { .pk-แผงคำเดิม { position: fixed !important; inset: 0 !important; width: auto !important; max-height: none !important; transform: none !important; } }' },
  // ① แผงจอกว้างล้นขอบจอซ้าย ⇒ ⛔ ห่างขอบ 16 จุด
  แผงล้นขอบ: { css: '.pk-แผงคำเดิม:not(.pk-เต็มจอ) { width: 60rem !important; transform: none !important; }' },
  // ① แผงยาวลงไปซุกใต้แถบล่าง
  แผงซุกแถบล่าง: { css: '.pk-แผงคำเดิม:not(.pk-เต็มจอ) { max-height: none !important; }' },
  // ② × หาย
  ปุ่มปิดหาย: { css: '.pk-แผงคำเดิม .pk-ปุ่มปิดกล่อง { display: none !important; }' },
  // ② × เล็ก
  ปุ่มปิดเล็ก: { css: '.pk-แผงคำเดิม .pk-ปุ่มปิดกล่อง { min-width: 30px !important; min-height: 30px !important; width: 30px !important; height: 30px !important; }' },
  // ② แถวหัวเลื่อนหายไปกับของในกล่อง
  หัวไม่ติด: { css: '.pk-แผงคำเดิม > .pk-หัวกล่องเด้ง { position: static !important; }' },
  // ② หัวของกล่องเป็นคำอื่น ⇒ คำที่ไม่ได้อนุมัติ
  หัวคำอื่น: {
    js: () => {
      new MutationObserver(() => {
        for (const p of document.querySelectorAll('.pk-แผงคำเดิม .pk-หัวแผง')) if (p.textContent !== 'คำอธิบาย') p.textContent = 'คำอธิบาย'
      }).observe(document.body, { childList: true, subtree: true, characterData: true })
    },
  },
  // ③ Escape ⛔ ปิด
  Escไม่ปิด: { js: () => window.addEventListener('keydown', (e) => e.key === 'Escape' && e.stopImmediatePropagation(), true) },
  // ③ ปิดแล้วโฟกัส ⛔ กลับปุ่มที่เปิด
  โฟกัสหล่น: {
    js: () => {
      const เดิม = HTMLElement.prototype.focus
      HTMLElement.prototype.focus = function (...ก) {
        if (this.matches?.('[data-ปุ่ม="เครื่องมือภาษาเดิม"], [data-ปุ่ม="คำอธิบายสัญลักษณ์"]')) return
        return เดิม.apply(this, ก)
      }
    },
  },
  // ③ แตะนอกกล่อง ⛔ ปิด
  แตะนอกไม่ปิด: {
    js: () => {
      const เดิม = document.addEventListener
      // ⭐ ตัวดักของกล่องติดตอนกล่องเปิด ⇒ กลืน pointerdown ที่ไปถึงชั้นนอกสุดก่อน ⇒ ยกเว้นในกล่องและปุ่มบนหัว
      window.addEventListener(
        'pointerdown',
        (e) => {
          if (e.target?.closest?.('.pk-แผงคำเดิม, [data-ปุ่มคำเดิมบนหัว]')) return
          if (document.querySelector('.pk-แผงคำเดิม')) e.stopImmediatePropagation()
        },
        true,
      )
      void เดิม
    },
  },
  // ③ เปิดได้หลายกล่องพร้อมกัน ⇒ กด i แล้วเฟืองยังค้าง
  สองกล่องพร้อมกัน: {
    js: () => {
      new MutationObserver(() => {
        const ฟ = document.querySelector('#pk-เครื่องมือภาษาเดิม')
        if (ฟ) window.__เฟืองค้าง = ฟ
        if (document.querySelector('#pk-คำอธิบายสัญลักษณ์') && window.__เฟืองค้าง && !window.__เฟืองค้าง.isConnected) {
          const สำเนา = window.__เฟืองค้าง.cloneNode(true)
          document.body.append(สำเนา)
          window.__เฟืองค้าง = สำเนา
        }
      }).observe(document.body, { childList: true, subtree: true })
    },
  },
  // ④ หน้าแบบใบ #151 ⇒ คลุมแถบแล้วดันของลงด้วยขอบใน
  คลุมแถบ: {
    css: '.pk-แผงคำเดิม.pk-เต็มจอ { top: 0 !important; padding-top: calc(var(--pk-ใต้แถบบน, 4rem) + 0.5rem) !important; } .pk-แผงคำเดิม.pk-เต็มจอ > .pk-หัวกล่องเด้ง { position: static !important; }',
  },
  // ⑤ กล่องดันหน้าให้กว้างเกินจอ
  ล้นข้าง: { css: '.pk-แผงคำเดิม .pk-แผงเครื่องหมาย, .pk-แผงคำเดิม [data-ความหมายคำเดิม] { min-width: 150vw !important; } .pk-แผงคำเดิม { overflow: visible !important; }' },
  // ⑥ ปุ่มมีคำบนจอ ⇒ ⛔ รูปอย่างเดียว
  ปุ่มมีคำ: {
    js: () => {
      const ใส่ = () => {
        for (const b of document.querySelectorAll('[data-ปุ่ม="เครื่องมือภาษาเดิม"]:not([data-มีคำ])')) {
          b.setAttribute('data-มีคำ', '')
          b.append(document.createTextNode('เครื่องมือ'))
        }
      }
      new MutationObserver(ใส่).observe(document.body, { childList: true, subtree: true })
      ใส่()
    },
  },
  // ⑥ ปุ่มเล็กกว่า 44
  ปุ่มเล็ก: { css: '.pk-หัวช่อง .pk-ปุ่มรูป { min-width: 30px !important; width: 30px !important; height: 30px !important; min-height: 30px !important; }' },
  // ⑥ ⛔ ห่อตอนที่ไม่พอ ⇒ ปุ่มล้นหัวคำเดิม (จอ 375 ซ้ายขวา)
  ไม่ห่อ: { css: '.pk-หัวช่อง.pk-เครื่องมือห่อ > .pk-ปุ่มตอนเทียบ { display: flex !important; flex-wrap: nowrap !important; } .pk-หัวช่อง.pk-เครื่องมือห่อ > .pk-ปุ่มตอนเทียบ > * { flex-shrink: 0 !important; }' },
  // ⑥ จอกว้างที่พอแถวเดียวแต่ห่อเป็นสองแถว
  หัวกว้างสองแถว: { css: '.pk-หัวช่อง > .pk-ปุ่มตอนเทียบ { flex-wrap: wrap !important; } .pk-หัวช่อง > .pk-ปุ่มตอนเทียบ > .pk-ปุ่มคำเดิมบนหัว { flex-basis: 100% !important; justify-content: flex-end; }' },
  // ⑥ × ของหัวไม่ขวาสุดแล้ว ⇒ เฟืองกับ i ไปอยู่หลัง ×
  ปิดไม่ขวาสุด: { css: '.pk-หัวช่อง > .pk-ปุ่มตอนเทียบ > .pk-ปุ่มคำเดิมบนหัว { order: 9 !important; }' },
  // ⑥ หัวไม่หนึบ ⇒ เลื่อนแล้วปุ่มหายไปกับต้นบท
  หัวไม่หนึบ: { css: '.pk-หัวคอลัมน์, .pk-ฝั่งหลัก > .pk-ชื่อคำเดิม { position: static !important; }' },
  // ⑦ เครดิต SIL ไม่ครบ ⇒ ลิงก์ SIL หาย
  เครดิตขาด: {
    js: () => {
      new MutationObserver(() => {
        const a = document.querySelector('[data-เครดิตเน้น] a[href*="sil.org"]')
        if (a) a.remove()
      }).observe(document.body, { childList: true, subtree: true })
    },
  },
  // ⑦ หัวข้อย่อยเครื่องหมายช่วยอ่านหาย
  หัวข้อเน้นหาย: { css: '.pk-แผงคำเดิม [data-คำอธิบายเน้น] { display: none !important; }' },
  // ⑦ เครื่องหมายช่วยอ่านพับอยู่ ⇒ ต้องกดกางอีกชั้น
  เครื่องหมายพับ: { css: '.pk-แผงคำเดิม [data-แผงเครื่องหมาย] label { display: none !important; }' },
  // ⑧ ปิดแล้ว ⛔ พากลับข้อเดิม
  ไม่พากลับ: { ก่อนปิด: () => (window.scrollTo = () => {}) },
  // ⑨ ปุ่ม *เครื่องมือ* ของใบ #151 กลับมา
  ปุ่มเดิมกลับมา: {
    js: () => {
      const ใส่ = () => {
        const ปิด = document.querySelector('[data-ปุ่ม="ปิดคำเดิม"]')
        if (ปิด && !document.querySelector('[data-ปุ่มเดิม151]')) {
          const b = document.createElement('button')
          b.textContent = 'เครื่องมือ'
          b.setAttribute('data-ปุ่มเดิม151', '')
          ปิด.before(b)
        }
      }
      new MutationObserver(ใส่).observe(document.body, { childList: true, subtree: true })
      ใส่()
    },
  },
  // ⑨ หมวดในหน้า Aa กลับมา
  หมวดAaกลับมา: {
    js: () => {
      new MutationObserver(() => {
        const ก = document.getElementById('pk-แผงAa')
        if (ก && !ก.querySelector('[data-หมวด="เครื่องมือภาษาเดิม"]')) {
          const d = document.createElement('div')
          d.setAttribute('data-หมวด', 'เครื่องมือภาษาเดิม')
          d.setAttribute('role', 'group')
          d.setAttribute('aria-label', 'เครื่องมือภาษาเดิม')
          ก.append(d)
        }
      }).observe(document.body, { childList: true, subtree: true })
    },
  },
  // ⑩ หน้าตาหลังใบ #153 ⇒ คอลัมน์คำเดิมในตัวบท ⛔ มีเส้น (พื้นใส ⛔ เงา)
  เส้นคำเดิมหาย: { css: '.pk-ตัวบท > .pk-ชั้นคำ::before, .pk-ตัวบท > .pk-ชั้นคำ::after, .pk-ตัวบท .pk-ช่องทั้งหมด::before, .pk-ตัวบท .pk-ช่องทั้งหมด::after { content: none !important; }' },
  // ⑩ เส้นขาดเป็นท่อนระหว่างข้อ ⇒ อาการที่พี่เอมเจอ ⇒ เส้นยาวแค่ข้างช่องคำเดิมของแต่ละข้อ
  เส้นคำเดิมขาด: {
    css: '.pk-ตัวบท > .pk-ชั้นคำ::before, .pk-ตัวบท > .pk-ชั้นคำ::after { bottom: auto !important; height: 120px !important; } .pk-ตัวบท .pk-ช่องทั้งหมด::before, .pk-ตัวบท .pk-ช่องทั้งหมด::after { content: none !important; }',
  },
  // ⑨ ค่าเก่า `เครื่องมือ: true` เปิดกล่องเอง (ตั้งต้นกางแบบใบ #151)
  //   ⇒ อ่านค่าก่อนโค้ดของเว็บติด ⇒ เว็บจำมุมมองใหม่ทับตอนเปิดหน้า (ช่องนี้หายไปแล้ว)
  ค่าเก่าเปิดเอง: {
    ก่อนโหลด: () => {
      try {
        window.__ค่าเก่า151 = JSON.parse(localStorage.getItem('phrakham.view') || '{}').เครื่องมือ
      } catch {}
    },
    js: () => {
      if (window.__ค่าเก่า151) [...document.querySelectorAll('[data-ปุ่ม="เครื่องมือภาษาเดิม"]')].find((x) => x.getClientRects().length)?.click()
    },
  },
}

// ---------------------------------------------------------------- วิ่ง
const ที่ตก = []
if (!ทดสอบตัวเอง) {
  for (const [ชื่อ, ทำ] of [
    ['กล่องเฟืองกับ i ⇒ รูปแบบ · × มุมขวาบน · ปิด 3 ทาง · ⛔ ทับแถบบน · ⛔ ล้นข้าง (ข้อ ①–⑤)', () => ตรวจกล่อง()],
    ['ปุ่มบนหัว ⇒ ชื่อ · รูปอย่างเดียว · 44 · อยู่ในจอ · แถวของหัว · หนึบ (ข้อ ⑥)', () => ตรวจปุ่มบนหัว()],
    ['ของในกล่อง ⇒ เครื่องมือ · คำอธิบาย · เครดิต SIL (ข้อ ⑦)', () => ตรวจของในกล่อง()],
    ['ปิดแล้วกลับข้อเดิม (ข้อ ⑧)', () => ตรวจกลับข้อเดิม()],
    ['ของที่ถอด ⛔ กลับมา · ค่าเก่า · ฮีบรู (ข้อ ⑨)', () => ตรวจของที่ถอด()],
    ['เส้นข้างคอลัมน์คำภาษาเดิมในตัวบท ⇒ ยาวต่อกันตลอด (ข้อ ⑩)', () => ตรวจเส้นคำเดิม()],
  ]) {
    const ตก = await ทำ()
    ที่ตก.push(...ตก)
    console.log(`${ตก.length ? '⛔' : '✅'} ${ชื่อ}`)
    for (const x of ตก.slice(0, 40)) console.log(`   ${x}`)
  }
} else {
  // ⭐ ยัดของพังทีละชิ้น ⇒ ข้อของมันต้องแดง ⇒ วิ่งเฉพาะจอและกล่องที่ของพังนั้นแสดงตัว ⇒ ⛔ วิ่งทั้งชุดซ้ำ
  const แคบ = { ใหญ่: [false], ทาง: false }
  const พิสูจน์ = [
    ['จอแคบแผงเล็ก', 1, () => ตรวจกล่อง(ของพัง.จอแคบแผงเล็ก, { จอ: [344], กล่อง: ['เฟือง'], ...แคบ }), '① จอ 344 · เฟือง ⇒ ⛔ เป็นหน้าเต็มจอ'],
    ['จอกว้างเต็มจอ', 1, () => ตรวจกล่อง(ของพัง.จอกว้างเต็มจอ, { จอ: [884], กล่อง: ['i'], ...แคบ }), '① จอ 884 · i ⇒ ⛔ เป็นแผงลงมา'],
    ['แผงล้นขอบ', 1, () => ตรวจกล่อง(ของพัง.แผงล้นขอบ, { จอ: [768], กล่อง: ['เฟือง'], ...แคบ }), '① จอ 768 · เฟือง ⇒ ⛔ เป็นแผงลงมา'],
    ['แผงซุกแถบล่าง', 1, () => ตรวจกล่อง(ของพัง.แผงซุกแถบล่าง, { จอ: [1280], กล่อง: ['i'], ...แคบ }), '⛔ เลยขอบบนของแถบล่าง'],
    ['ปุ่มปิดหาย', 1, () => ตรวจกล่อง(ของพัง.ปุ่มปิดหาย, { จอ: [412], กล่อง: ['i'], ...แคบ }), '② จอ 412 · i ⇒ ปุ่มที่ได้ยิน'],
    ['ปุ่มปิดเล็ก', 1, () => ตรวจกล่อง(ของพัง.ปุ่มปิดเล็ก, { จอ: [1280], กล่อง: ['เฟือง'], ...แคบ }), '⛔ เล็กกว่า 44'],
    ['หัวไม่ติด', 1, () => ตรวจกล่อง(ของพัง.หัวไม่ติด, { จอ: [375], กล่อง: ['i'], ...แคบ }), '(เลื่อนในกล่อง'],
    ['หัวคำอื่น', 1, () => ตรวจกล่อง(ของพัง.หัวคำอื่น, { จอ: [484], กล่อง: ['เฟือง'], ...แคบ }), '② จอ 484 · เฟือง ⇒ หัวของกล่องที่ตาเห็น'],
    ['Escไม่ปิด', 2, () => ตรวจกล่อง(ของพัง.Escไม่ปิด, { จอ: [767], กล่อง: ['เฟือง'], ใหญ่: [false] }), '③ จอ 767 · เฟือง ⇒ กด Escape'],
    ['โฟกัสหล่น', 2, () => ตรวจกล่อง(ของพัง.โฟกัสหล่น, { จอ: [1280], กล่อง: ['i'], ใหญ่: [false] }), '⛔ กลับปุ่ม «คำอธิบายสัญลักษณ์»'],
    ['แตะนอกไม่ปิด', 2, () => ตรวจกล่อง(ของพัง.แตะนอกไม่ปิด, { จอ: [884], กล่อง: ['เฟือง'], ใหญ่: [false] }), '③ จอ 884 · เฟือง ⇒ แตะนอกกล่อง'],
    ['สองกล่องพร้อมกัน', 2, () => ตรวจกล่อง(ของพัง.สองกล่องพร้อมกัน, { จอ: [1280], ใหญ่: [false] }), 'ต้องสลับไปกล่อง i ทีละกล่อง'],
    ['คลุมแถบ', 2, () => ตรวจกล่อง(ของพัง.คลุมแถบ, { จอ: [320], กล่อง: ['เฟือง'], ใหญ่: [true], ทาง: false }), '④ จอ 320 ตัวอักษร 200% · เฟือง'],
    ['ล้นข้าง', 2, () => ตรวจกล่อง(ของพัง.ล้นข้าง, { จอ: [375], กล่อง: ['เฟือง'], ...แคบ }), '⑤ จอ 375'],
    ['ปุ่มมีคำ', 2, () => ตรวจปุ่มบนหัว(ของพัง.ปุ่มมีคำ, { จอ: [1280], ใหญ่: [false] }), 'มีคำบนจอ'],
    ['ปุ่มเล็ก', 2, () => ตรวจปุ่มบนหัว(ของพัง.ปุ่มเล็ก, { จอ: [344], ใหญ่: [false] }), '⛔ เล็กกว่า 44'],
    ['ไม่ห่อ', 2, () => ตรวจปุ่มบนหัว(ของพัง.ไม่ห่อ, { จอ: [375], ใหญ่: [false] }), '⑥ จอ 375'],
    ['หัวกว้างสองแถว', 1, () => ตรวจปุ่มบนหัว(ของพัง.หัวกว้างสองแถว, { จอ: [1280], ใหญ่: [false] }), 'หัวคอลัมน์ภาษาเดิม ⛔ แถวเดียว'],
    ['ปิดไม่ขวาสุด', 1, () => ตรวจปุ่มบนหัว(ของพัง.ปิดไม่ขวาสุด, { จอ: [884], ใหญ่: [false] }), '⛔ ขวาสุดของแถวบน'],
    ['หัวไม่หนึบ', 1, () => ตรวจปุ่มบนหัว(ของพัง.หัวไม่หนึบ, { จอ: [412], ใหญ่: [false] }), '(เลื่อนลงกลางบท)'],
    ['เครดิตขาด', 2, () => ตรวจของในกล่อง(ของพัง.เครดิตขาด, { จอ: [375] }), '⑦ จอ 375 · i ⇒ เครดิต SIL'],
    ['หัวข้อเน้นหาย', 1, () => ตรวจของในกล่อง(ของพัง.หัวข้อเน้นหาย, { จอ: [1280] }), '⑦ จอ 1280 · i ⇒'],
    ['เครื่องหมายพับ', 1, () => ตรวจของในกล่อง(ของพัง.เครื่องหมายพับ, { จอ: [375] }), 'ช่องติ๊กเครื่องหมายช่วยอ่านที่ตาเห็น'],
    ['ไม่พากลับ', 2, () => ตรวจกลับข้อเดิม(ของพัง.ไม่พากลับ, { จอ: [344] }), '⑧ จอ 344'],
    ['ปุ่มเดิมกลับมา', 1, () => ตรวจของที่ถอด(ของพัง.ปุ่มเดิมกลับมา, { จอ: [1280] }), 'ยังมีปุ่มที่ได้ยิน «เครื่องมือ»'],
    ['หมวดAaกลับมา', 2, () => ตรวจของที่ถอด(ของพัง.หมวดAaกลับมา, { จอ: [375] }), 'หน้า Aa ยังมีหมวด'],
    ['เส้นคำเดิมหาย', 1, () => ตรวจเส้นคำเดิม(ของพัง.เส้นคำเดิมหาย, { ชุด: [ชุดเส้น[0].ป้าย, ชุดเส้น[3].ป้าย] }), '⑩ จอ 1280 TCV + คำเดิม'],
    ['เส้นคำเดิมขาด', 2, () => ตรวจเส้นคำเดิม(ของพัง.เส้นคำเดิมขาด, { ชุด: [ชุดเส้น[5].ป้าย, ชุดเส้น[3].ป้าย] }), '⛔ ต่อกันตลอดตัวบท'],
    ['ค่าเก่าเปิดเอง', 1, () => ตรวจของที่ถอด(ของพัง.ค่าเก่าเปิดเอง, { จอ: [375] }), 'เปิดเองตอนโหลดหน้า'],
  ]
  for (const [ท่า, ชุด] of พิสูจน์) if (![1, 2].includes(ชุด)) ที่ตก.push(`โหมดพิสูจน์ ${ท่า} ⇒ ⛔ มีชุด 1 หรือ 2`)
  for (const [ท่า, ชุด, ทำ, คำ] of พิสูจน์) {
    if (ชุดที่ขอ && ชุด !== ชุดที่ขอ) continue
    const ตก = await ทำ()
    const จับได้ = ตก.some((x) => x.includes(คำ))
    console.log(`${จับได้ ? '✅' : '⛔'} โหมดพิสูจน์ ${ท่า} ⇒ ด่าน${จับได้ ? 'จับได้' : '⛔ จับไม่ได้'}`)
    if (!จับได้) {
      ที่ตก.push(`โหมดพิสูจน์ ${ท่า} ⇒ ยัดของพังแล้วด่าน ⛔ แดงด้วยข้อที่คู่กัน (${คำ})`)
      for (const x of ตก.slice(0, 5)) console.log(`   ${x}`)
    }
  }
}

await เบราว์เซอร์.close()

if (ที่ตก.length) {
  console.log(`\n⛔ ด่านเฟืองกับไอแดง — ${ที่ตก.length} เรื่อง`)
  for (const x of ที่ตก.slice(0, 80)) console.log(`  · ${x}`)
  process.exit(1)
}
console.log(ทดสอบตัวเอง ? '\n✅ ด่านเฟืองกับไอยังจับของพังได้ครบทุกท่า' : '\n✅ ด่านเฟืองกับไอเขียว')
