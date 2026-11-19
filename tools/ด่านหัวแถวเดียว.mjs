// ด่านตรวจ — **หัวคอลัมน์แถวเดียว 3 ปุ่ม ทุกขนาดจอ** ⇒ ฉบับ ▾ · ชื่อย่อเล่มกับบท · ×
//   (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/131#note_30489 ⇒ พี่เอมเคาะ 3 พ.ย. 2569 หลังลองบน Fold 6 กางจอ)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// **ด่านนี้ตรวจ 6 ข้อ ⇒ วัดของจริงบนหน้าที่สร้างเสร็จ ⛔ ไม่ได้ดูว่าโค้ดเขียนอะไรไว้**
//   ⇒ ชุดที่วัดรูปทรง ⇒ จอ 320 · 375 · 412 · 707 (Fold 6 พับ) · 768 · 1080 (Fold 6 กาง) × ตัวอักษร 85% · 100% · 200%
//     ⇒ มาระโก 12 · TCV กับ WEB · ค่าตั้งต้นของจอแคบ (ซ้ายขวา) ⇒ เลื่อนให้ 12:20 อยู่กลางจอ
//   ① **แถวเดียว 3 ปุ่ม ลำดับเดียว** ⇒ ของที่ตาเห็นในหัว = ช่องเลือกฉบับ · ปุ่มชื่อย่อเล่มกับบท · × ⇒ เรียงซ้ายไปขวา ⇒ ขอบบนต่างกัน ⛔ เกิน 2 จุด
//      ⇒ ⛔ ไม่มีของเดิม ⇒ ปุ่มชื่อฉบับตัวใหญ่ที่กางรายการ (`aria-expanded`) · แถวชื่อเล่มกับบท · ปุ่ม *เปลี่ยนตอน* แยก (note_30489 ข้อ 1.4)
//      ⇒ ตัวหนังสือที่ตาเห็นในหัว ⛔ อยู่นอกปุ่ม ⇒ ยกเว้นป้าย *ย่อหน้าตาม …* ของใบ #106 ซึ่ง ⛔ ใช่ปุ่ม
//   ② **ชื่อย่อ = `toc3` ของต้นฉบับของฉบับนั้น** ⇒ อ่านตารางจาก `server/utils/ชื่อย่อเล่ม.json` (ด่าน `ด่านชื่อย่อตรงต้นทาง.py` พิสูจน์ว่าตรง zip)
//      ⇒ ตาเห็น `<ชื่อย่อ> <บท>` ตรงตัว ⇒ 1 พงศาวดาร 5 ทั้ง 3 ฉบับ + คอลัมน์ตอนอื่น กิจการ 2 LSV ⇒ ชื่อย่อติด `lang` ของฉบับ (SC 3.1.2)
//      ⇒ ช่วง ⇒ `มก. 10:13–16`
//   ③ **ชื่อที่ได้ยิน** ⇒ ตรงกับ `ชื่อปุ่มตอน` ใน `app/utils/ถ้อยคำหัวคอลัมน์.ts` ทุกตัวอักษร ⇒ ขึ้นต้นด้วยคำที่ตาเห็น (SC 2.5.3) ⇒ มีชื่อเต็มของเล่ม
//   ④ **⛔ ตัดอะไรนอกจากชื่อย่อ** ⇒ เลขบท · ชื่อฉบับในช่องเลือก · × ⛔ ถูกตัด ⇒ ปุ่ม ⛔ ล้นออกนอกหัว ⇒ 44 จุดทุกปุ่ม ⇒ ทั้งหน้า ⛔ เลื่อนซ้ายขวา (SC 1.4.10)
//      ⇒ ชื่อย่อหดได้ ⇒ ต้องเป็นจุดไข่ปลา ⛔ ตัดเงียบ
//      ⇒ แถบหัวของบนล่างที่เลื่อนข้างในตัวเอง ⇒ หัวแรกเห็นครบ ⇒ หัวถัดไปต้องโผล่ให้เห็นว่ามี ⇒ เลื่อนแถบไปหาแล้วเห็นครบ
//   ⑤ **เหลือคอลัมน์เดียว ⇒ ⛔ มี ×** ⇒ เหลือ 2 ปุ่ม แถวเดียว (กติกาเดิมของใบ #102 ข้อ 6.1)
//   ⑥ **กดชื่อย่อกับบท ⇒ เปิดแผงเปลี่ยนตอน** ⇒ คอลัมน์ที่ 2 ⇒ แผง `role="dialog"` ขึ้น ⇒ งานต่อจากนั้น (ขยับคอลัมน์เดียว) ⇒ `tools/ด่านคอลัมน์แบบเดียว.mjs`
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านหัวแถวเดียว.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพังทีละชิ้น (`ของพัง` ข้างล่าง) ⇒ ชิ้นละข้อ ⇒ ข้อของมันต้องแดง
//   ⇒ ⭐ โหมดพิสูจน์วัดรูปทรงแค่ 3 ชุด (จอ 320 · 200% · จอ 375 · 100% · จอ 1080 · 100%) ⇒ ⛔ ไม่ใช่การผ่อน ⇒ ชุดเต็มวิ่งตอนตรวจของจริง
//      ⇒ เหตุผล ⇒ 14 ชิ้น × 18 ชุด เกินเวลา 10 นาทีของงานเบราว์เซอร์ ⇒ ชิ้นที่ยัดพังทุกจอ ⇒ 3 ชุดพอพิสูจน์ว่าข้อนั้นยังจับได้
//
// ⛔ **ไม่รอเป็นเวลาตายตัว** ⇒ ทุกการรอคือรอสภาพของหน้า ⇒ `รอหน้านิ่ง` ของ `tools/หน้าที่ตรวจ.mjs` · รอ 2 เฟรมหลังเลื่อน
//
//   node tools/ด่านหัวแถวเดียว.mjs <ที่อยู่เว็บ>

import { readFileSync } from 'node:fs'
import { chromium } from 'playwright'
import { เส้นทางเว็บ, รอหน้านิ่ง } from './หน้าที่ตรวจ.mjs'
import { ถ้อยคำหัวคอลัมน์ } from '../app/utils/ถ้อยคำหัวคอลัมน์.ts'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const ตารางย่อ = JSON.parse(readFileSync(new URL('../server/utils/ชื่อย่อเล่ม.json', import.meta.url), 'utf8')).ชื่อย่อ

const ชุดเต็ม = [320, 375, 412, 707, 768, 1080].flatMap((กว้าง) => [0.85, 1, 2].map((fs) => ({ กว้าง, fs })))
const ชุดพิสูจน์ = [
  { กว้าง: 320, fs: 2 },
  { กว้าง: 375, fs: 1 },
  { กว้าง: 1080, fs: 1 },
]
const สูงจอ = (กว้าง) => (กว้าง >= 768 ? 900 : กว้าง === 707 ? 724 : 812)

/** เฝ้า DOM ⇒ Vue วาดใหม่แล้วของพังยังอยู่ */
const เฝ้า = (ทำ) => {
  ทำ()
  new MutationObserver(ทำ).observe(document.body, { subtree: true, childList: true, attributes: true })
}

const ของพัง = {
  // ① ของเดิมของจอกว้าง ⇒ ห่อเป็น 2 แถว
  หัวสองแถว: { ข้อ: '①', css: '.pk-หัวช่อง > .pk-ปุ่มตอนเทียบ { flex-wrap: wrap !important; } .pk-หัวช่อง .pk-ปุ่มตอน { flex-basis: 100% !important; }' },
  // ① แถวชื่อเล่มกับบทกลับมา
  แถวชื่อตอนกลับมา: {
    ข้อ: '①',
    บนหน้า: `(${เฝ้า})(() => document.querySelectorAll('.pk-หัวช่อง').forEach((h) => {
      if (h.querySelector('.pk-ป้ายเดิม')) return
      const p = document.createElement('p'); p.className = 'pk-ป้ายเดิม pk-ชื่อคอลัมน์'; p.textContent = 'มาระโก 12'; h.prepend(p)
    }))`,
  },
  // ① ปุ่ม *เปลี่ยนตอน* แยกกลับมา
  ปุ่มเปลี่ยนตอนแยก: {
    ข้อ: '①',
    บนหน้า: `(${เฝ้า})(() => document.querySelectorAll('.pk-หัวช่อง .pk-ปุ่มตอนเทียบ').forEach((g) => {
      if (g.querySelector('.pk-ปุ่มเดิม')) return
      const b = document.createElement('button'); b.className = 'pk-ปุ่มเทียบ pk-ปุ่มเดิม'; b.textContent = 'เปลี่ยนตอน'; g.querySelector('.pk-ปุ่มตอน')?.after(b)
    }))`,
  },
  // ① ปุ่มชื่อฉบับที่กางรายการของ !163 กลับมา
  ปุ่มกางกลับมา: {
    ข้อ: '①',
    บนหน้า: `(${เฝ้า})(() => document.querySelectorAll('.pk-หัวช่อง .pk-ปุ่มตอนเทียบ').forEach((g) => {
      if (g.querySelector('.pk-ปุ่มกางเดิม')) return
      const b = document.createElement('button'); b.className = 'pk-ปุ่มเทียบ pk-ปุ่มกางเดิม'; b.setAttribute('aria-expanded', 'false'); b.textContent = 'TCV'; g.prepend(b)
    }))`,
  },
  ลำดับสลับ: { ข้อ: '①', css: '.pk-หัวช่อง > .pk-ปุ่มตอนเทียบ { flex-direction: row-reverse !important; }' },
  // ② ชื่อย่อที่คิดเอง
  ชื่อย่อคิดเอง: {
    ข้อ: '②',
    บนหน้า: `(${เฝ้า})(() => document.querySelectorAll('.pk-ปุ่มตอน .pk-ชื่อย่อ').forEach((s) => { if (s.textContent !== '1พศ.') s.textContent = '1พศ.' }))`,
  },
  ภาษาชื่อย่อหาย: {
    ข้อ: '②',
    บนหน้า: `(${เฝ้า})(() => document.querySelectorAll('.pk-ปุ่มตอน .pk-ชื่อย่อ[lang]').forEach((s) => s.removeAttribute('lang')))`,
  },
  // ③ ชื่อเต็มหายจากชื่อที่ได้ยิน
  ชื่อเต็มหาย: {
    ข้อ: '③',
    บนหน้า: `(${เฝ้า})(() => document.querySelectorAll('.pk-ปุ่มตอน .pk-ที่ของช่อง').forEach((s) => s.remove()))`,
  },
  ชื่อไม่ขึ้นต้นด้วยคำที่เห็น: {
    ข้อ: '③',
    บนหน้า: `(${เฝ้า})(() => document.querySelectorAll('.pk-ปุ่มตอน').forEach((b) => { if (b.getAttribute('aria-label') !== 'เปลี่ยนตอน') b.setAttribute('aria-label', 'เปลี่ยนตอน') }))`,
  },
  // ④ เลขบทถูกตัด
  เลขบทถูกตัด: { ข้อ: '④', css: '.pk-หัวช่อง .pk-ปุ่มตอน { flex: 0 0 30px !important; min-width: 0 !important; max-width: 30px !important; }' },
  ปุ่มเล็กกว่า44: { ข้อ: '④', css: '.pk-หัวช่อง [data-ปุ่ม="ปิดคอลัมน์"] { min-width: 30px !important; width: 30px !important; }' },
  // ④ ปุ่มล้นออกนอกหัว ⇒ ไปทับคอลัมน์ข้าง ๆ ⇒ ของที่เกิดถ้าหน้าวางซ้ายขวาทั้งที่หัว 3 ปุ่มไม่พอ
  ปุ่มล้นหัว: { ข้อ: '④', css: '.pk-หัวช่อง .pk-เลือกฉบับเทียบ { min-width: 420px !important; }' },
  // ⑤ คอลัมน์สุดท้ายปิดได้
  คอลัมน์สุดท้ายปิดได้: {
    ข้อ: '⑤',
    บนหน้า: `(${เฝ้า})(() => document.querySelectorAll('.pk-หัวช่อง .pk-ปุ่มตอนเทียบ').forEach((g) => {
      if (g.querySelector('[data-ปุ่ม="ปิดคอลัมน์"]')) return
      const b = document.createElement('button'); b.className = 'pk-ปุ่มเทียบ'; b.setAttribute('data-ปุ่ม', 'ปิดคอลัมน์'); b.textContent = '×'; g.append(b)
    }))`,
  },
  // ⑥ กดแล้วไม่เปิดแผง ⇒ ปุ่มที่ไม่มีงานผูก
  กดแล้วไม่เปิดแผง: {
    ข้อ: '⑥',
    บนหน้า: `(${เฝ้า})(() => document.querySelectorAll('.pk-ปุ่มตอน:not([data-ตาย])').forEach((b) => { const c = b.cloneNode(true); c.setAttribute('data-ตาย', ''); b.replaceWith(c) }))`,
  },
}

const เบราว์เซอร์ = await chromium.launch()

async function เปิด({ กว้าง, fs = 1, ที่อยู่, ฉ, พัง }) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: สูงจอ(กว้าง) } })
  await ctx.addInitScript(
    ([ฉ, fs]) => {
      try {
        if (!sessionStorage.getItem('pk-ด่านหัวแถวเดียว')) {
          localStorage.setItem('phrakham.versions', JSON.stringify(ฉ))
          localStorage.setItem('pk-fs', String(fs))
          sessionStorage.setItem('pk-ด่านหัวแถวเดียว', '1')
        }
      } catch {}
    },
    [ฉ, fs],
  )
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(`${ฐาน}${ที่อยู่}`, { waitUntil: 'domcontentloaded' })
  await แท็บ.waitForSelector('.pk-หัวคอลัมน์ .pk-หัวช่อง', { timeout: 30000 })
  await แท็บ.waitForFunction(() => document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
  if (ที่อยู่.includes('p=')) await แท็บ.waitForSelector('.pk-ตอนเทียบ .pk-หัวช่อง, .pk-หัวคู่', { timeout: 15000 })
  await รอหน้านิ่ง(แท็บ)
  if (พัง?.css) await แท็บ.addStyleTag({ content: พัง.css })
  if (พัง?.บนหน้า) await แท็บ.evaluate(พัง.บนหน้า)
  if (พัง) await รอหน้านิ่ง(แท็บ)
  return { ctx, แท็บ }
}

const สองเฟรม = (แท็บ) => แท็บ.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))

/** อ่านหัวทุกหัวที่ตาเห็น ⇒ ของที่ตาเห็นข้างใน เรียงตามตำแหน่งที่วาด ⇒ ตัวหนังสือนอกปุ่ม ⇒ ของที่ถูกตัด */
const อ่านหัว = (แท็บ) =>
  แท็บ.evaluate(() => {
    const r1 = (x) => Math.round(x * 10) / 10
    const เห็น = (e) => e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden'
    const ซ่อนเสียง = (e) => !!e.closest('.pk-เฉพาะเสียง')
    return [...document.querySelectorAll('.pk-หัวคอลัมน์ .pk-หัวช่อง, .pk-ตอนเทียบ .pk-หัวช่อง')].filter(เห็น).map((h) => {
      const ของ = [...h.querySelectorAll('button, select, a, [role="button"], p, [aria-expanded]')]
        .filter((e) => เห็น(e) && !ซ่อนเสียง(e))
        .filter((e) => !e.classList.contains('pk-ย่อหน้าตาม') && !(e.tagName === 'P' && e.classList.contains('pk-กันที่')))
      // ⭐ ของชั้นนอกสุดเท่านั้น ⇒ ปุ่มในปุ่ม ⛔ นับซ้ำ
      const นอก = ของ.filter((e) => !ของ.some((o) => o !== e && o.contains(e)))
      const วัด = นอก.map((e) => {
        const r = e.getBoundingClientRect()
        return {
          ชนิด:
            e.tagName === 'SELECT'
              ? 'ฉบับ'
              : e.getAttribute('data-ปุ่ม') === 'เปลี่ยนตอน' && !e.hasAttribute('aria-expanded')
                ? 'ตอน'
                : e.getAttribute('data-ปุ่ม') === 'ปิดคอลัมน์'
                  ? 'ปิด'
                  : `อื่น(${e.tagName.toLowerCase()} “${(e.textContent || '').trim().slice(0, 12)}”)`,
          ซ้าย: r1(r.left),
          ขวา: r1(r.right),
          บน: r1(r.top),
          กว้าง: r1(r.width),
          สูง: r1(r.height),
          ล้นใน: e.scrollWidth > e.clientWidth + 1,
        }
      })
      วัด.sort((a, b) => a.ซ้าย - b.ซ้าย)
      const ปุ่ม = h.querySelector('.pk-ปุ่มตอน')
      const เลข = ปุ่ม?.querySelector('.pk-เลขตอน')
      const ย่อ = ปุ่ม?.querySelector('.pk-ชื่อย่อ')
      let เลขถูกตัด = false
      let ย่อตัดเงียบ = false
      if (ปุ่ม && เลข) {
        const b = ปุ่ม.getBoundingClientRect()
        const n = เลข.getBoundingClientRect()
        const ส = getComputedStyle(ปุ่ม)
        เลขถูกตัด = n.width < 1 || n.right > b.right - parseFloat(ส.borderRightWidth) + 0.5 || n.left < b.left - 0.5
      }
      if (ย่อ && ย่อ.scrollWidth > ย่อ.clientWidth + 1) ย่อตัดเงียบ = getComputedStyle(ย่อ).textOverflow !== 'ellipsis'
      // ⭐ แถบหัวที่เลื่อนข้างในตัวเอง ⇒ หัวนี้อยู่ในช่วงที่ตาเห็นของแถบไหม
      const แถบ = h.parentElement
      const แถบเลื่อน = แถบ && getComputedStyle(แถบ).overflowX !== 'visible' && แถบ.scrollWidth > แถบ.clientWidth + 1
      const rh = h.getBoundingClientRect()
      const rs = แถบ.getBoundingClientRect()
      return {
        ฉบับ: h.querySelector('select')?.value || '',
        วัด,
        ล้นหัว: (() => {
          const g = h.querySelector('.pk-ปุ่มตอนเทียบ')
          return !!g && (g.scrollWidth > g.clientWidth + 1 || g.getBoundingClientRect().right > h.getBoundingClientRect().right + 1)
        })(),
        ตาเห็น: ปุ่ม ? (ย่อ?.textContent || '') + (เลข?.textContent || '') : '',
        ภาษาย่อ: ย่อ?.getAttribute('lang') || '',
        เลขถูกตัด,
        ย่อตัดเงียบ,
        แถบเลื่อน,
        เห็นครบในแถบ: rh.left >= rs.left - 0.5 && rh.right <= rs.right + 0.5,
        โผล่ในแถบ: rh.left < rs.right - 8,
      }
    })
  })

function ตรวจรูป(ตก, ชุด, หัว, เลื่อนข้าง, กี่คอลัมน์) {
  const ต้องมี = กี่คอลัมน์ > 1 ? ['ฉบับ', 'ตอน', 'ปิด'] : ['ฉบับ', 'ตอน']
  if (!หัว.length) ตก.push(`① ${ชุด} ⇒ ⛔ ไม่เจอหัวที่ตาเห็น`)
  หัว.forEach((h, i) => {
    const ที่ = `${ชุด} · หัว ${h.ฉบับ}`
    const ชนิด = h.วัด.map((x) => x.ชนิด)
    if (String(ชนิด) !== String(ต้องมี))
      ตก.push(`${กี่คอลัมน์ > 1 ? '①' : '⑤'} ${ที่} ⇒ ตาเห็น ${ชนิด.join(' · ')} ⇒ ต้องเป็น ${ต้องมี.join(' · ')} เท่านั้น เรียงซ้ายไปขวา`)
    const บน = h.วัด.map((x) => x.บน)
    if (บน.length && Math.max(...บน) - Math.min(...บน) > 2)
      ตก.push(`① ${ที่} ⇒ ขอบบนของปุ่มต่างกัน ${Math.round((Math.max(...บน) - Math.min(...บน)) * 10) / 10} จุด ⇒ ต้องอยู่แถวเดียว`)
    // ④ ⛔ ตัดอะไรนอกจากชื่อย่อ
    if (h.ล้นหัว) ตก.push(`④ ${ที่} ⇒ ปุ่มล้นออกนอกหัว ⇒ ไปทับคอลัมน์ข้าง ๆ หรือถูกตัด`)
    if (h.เลขถูกตัด) ตก.push(`④ ${ที่} ⇒ เลขบทใน “${h.ตาเห็น}” ถูกตัด ⇒ ⛔ ห้ามตัดเลขบท`)
    if (h.ย่อตัดเงียบ) ตก.push(`④ ${ที่} ⇒ ชื่อย่อถูกตัดโดยไม่มีจุดไข่ปลา`)
    for (const x of h.วัด) {
      if ((x.ชนิด === 'ฉบับ' || x.ชนิด === 'ปิด') && x.ล้นใน) ตก.push(`④ ${ที่} ⇒ ${x.ชนิด} ถูกตัด ⇒ ⛔ ห้ามตัด`)
      if (x.กว้าง < 44 - 0.5 || x.สูง < 44 - 0.5) ตก.push(`④ ${ที่} ⇒ ${x.ชนิด} ${x.กว้าง}×${x.สูง} จุด ⇒ ต้องไม่ต่ำกว่า 44×44`)
    }
    if (h.แถบเลื่อน) {
      if (i === 0 && !h.เห็นครบในแถบ) ตก.push(`④ ${ที่} ⇒ แถบหัวเลื่อนข้าง แต่หัวแรกไม่เห็นครบ`)
      if (i > 0 && !h.เห็นครบในแถบ && !h.โผล่ในแถบ) ตก.push(`④ ${ที่} ⇒ แถบหัวเลื่อนข้าง แต่หัวนี้ไม่โผล่ให้เห็นเลย ⇒ ตาไม่รู้ว่ามีอีกคอลัมน์`)
    }
  })
  if (เลื่อนข้าง) ตก.push(`④ ${ชุด} ⇒ ทั้งหน้าเลื่อนซ้ายขวาได้ ⛔ SC 1.4.10`)
}

async function ตรวจ(พัง) {
  const ตก = []
  const พูด = []
  const ทำ = (ข้อ) => !พัง || พัง.ข้อ === ข้อ

  // ---------------------------------------------------------------- ① ④ รูปทรงทุกจอ ทุกขนาดตัวอักษร
  if (ทำ('①') || ทำ('④')) {
    const ตาราง = []
    for (const { กว้าง, fs } of พัง ? ชุดพิสูจน์ : ชุดเต็ม) {
      const ชุด = `จอ ${กว้าง} · ${Math.round(fs * 100)}%`
      const { ctx, แท็บ } = await เปิด({ กว้าง, fs, ที่อยู่: '/read/MRK?c=12', ฉ: ['TCV', 'WEB'], พัง })
      try {
        // ⭐ ตัวบทมาหลังหัวคอลัมน์ ⇒ เปิด() รอแค่หัวกับ Vue ⇒ ต้องรอข้อที่จะเลื่อนไปหาให้โผล่ก่อน
        // ⛔ ไม่รอ ⇒ getElementById คืน null ⇒ ด่านล้มแบบสุ่มตามจังหวะเครื่อง คนละจอกันทุกครั้ง
        // ⇒ เจอจริง ท่อ 11993 (จอ 320 · 85%) และ งาน 104049 (จอ 375 · 200%) บนโค้ดชุดเดียวกัน
        await แท็บ.waitForFunction(() => !!document.getElementById('ข้อ-12-20'), null, { timeout: 30000 })
        await แท็บ.evaluate(() => {
          const e = document.getElementById('ข้อ-12-20')
          window.scrollTo(0, window.scrollY + e.getBoundingClientRect().top - innerHeight / 2)
        })
        await สองเฟรม(แท็บ)
        const หัว = await อ่านหัว(แท็บ)
        const ม = await แท็บ.evaluate(() => ({
          เลื่อนข้าง: document.documentElement.scrollWidth > innerWidth + 1,
          วาง: document.querySelector('.pk-บนล่างจอแคบ') ? 'บนล่าง' : document.querySelector('.pk-ซ้ายขวาจอแคบ') ? 'ซ้ายขวา' : 'จอกว้าง',
          สูง: Math.round(document.querySelector('.pk-หัวคอลัมน์').getBoundingClientRect().height * 10) / 10,
        }))
        ตรวจรูป(ตก, ชุด, หัว, ม.เลื่อนข้าง, 2)
        // ④ แถบหัวเลื่อนข้าง ⇒ เลื่อนแถบไปหาหัวถัดไป ⇒ ต้องเห็นครบ
        if (หัว.some((h) => h.แถบเลื่อน)) {
          await แท็บ.evaluate(() => {
            const แถบ = document.querySelector('.pk-หัวคอลัมน์ > .pk-ช่องทั้งหมด')
            แถบ.scrollLeft = แถบ.scrollWidth
          })
          await สองเฟรม(แท็บ)
          const หลัง = await อ่านหัว(แท็บ)
          const ท้าย = หลัง[หลัง.length - 1]
          if (ท้าย && !ท้าย.เห็นครบในแถบ) ตก.push(`④ ${ชุด} ⇒ เลื่อนแถบหัวสุดทางแล้ว หัว ${ท้าย.ฉบับ} ยังเห็นไม่ครบ`)
        }
        ตาราง.push(`  ${ชุด} · ${ม.วาง} ⇒ แถวหัวสูง ${ม.สูง} · ${หัว.map((h) => `[${h.ฉบับ} ▾][${h.ตาเห็น}][×]`).join(' ')}${หัว.some((h) => h.แถบเลื่อน) ? ' · แถบเลื่อนข้าง' : ''}`)
      } catch (e) {
        ตก.push(`①④ ${ชุด} ล้มระหว่างตรวจ ⇒ ${e.message}`)
      } finally {
        await ctx.close()
      }
    }
    พูด.push(...ตาราง)
  }

  // ---------------------------------------------------------------- ② ③ ชื่อย่อจาก toc3 · ชื่อที่ได้ยิน ⇒ 3 ฉบับในตาราง + คอลัมน์ตอนอื่น
  if (ทำ('②') || ทำ('③')) {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 1280, ที่อยู่: '/read/1CH?c=5&p=ACT.2.LSV', ฉ: ['TCV', 'THKJV', 'WEB'], พัง })
    try {
      const หัว = await อ่านหัว(แท็บ)
      // ⭐ ชื่อเต็มของเล่ม ⇒ อ่านจากบัญชีเล่มที่เว็บส่งจริง (`api/books.json`) ⛔ ไม่จดซ้ำที่นี่
      const บัญชี = await (await fetch(`${ฐาน}/api/books.json`)).json()
      const ชื่อไทย = (ร) => บัญชี.เล่ม.find((x) => x.รหัส === ร)?.ชื่อไทย
      const ต้อง = [
        ['TCV', '1CH', '5', `${ชื่อไทย('1CH')} 5`, 'th'],
        ['THKJV', '1CH', '5', `${ชื่อไทย('1CH')} 5`, 'th'],
        ['WEB', '1CH', '5', `${ชื่อไทย('1CH')} 5`, 'en'],
        ['LSV', 'ACT', '2', `${ชื่อไทย('ACT')} 2`, 'en'],
      ]
      if (หัว.length !== ต้อง.length) ตก.push(`② เปิด 4 คอลัมน์ แต่เห็นหัว ${หัว.length} หัว`)
      for (const [i, [ฉ, เล่ม, บท, เต็ม, ภาษา]] of ต้อง.entries()) {
        const h = หัว.find((x) => x.ฉบับ === ฉ)
        const ย่อ = ตารางย่อ[ฉ]?.[เล่ม]
        if (!h) {
          ตก.push(`② ⛔ ไม่เจอหัวของ ${ฉ}`)
          continue
        }
        if (h.ตาเห็น !== `${ย่อ} ${บท}`) ตก.push(`② หัว ${ฉ} ตาเห็น “${h.ตาเห็น}” ⇒ ต้องเป็น “${ย่อ} ${บท}” (toc3 ของ ${ฉ})`)
        if (h.ภาษาย่อ !== ภาษา) ตก.push(`② หัว ${ฉ} ชื่อย่อติด lang “${h.ภาษาย่อ}” ⇒ ต้องเป็น “${ภาษา}” (SC 3.1.2)`)
        const ชื่อ = ถ้อยคำหัวคอลัมน์.ชื่อปุ่มตอน(ย่อ, บท, เต็ม, i + 1)
        const เจอ = await แท็บ.getByRole('button', { name: ชื่อ, exact: true }).count()
        if (เจอ !== 1) ตก.push(`③ หาปุ่มที่ได้ยินว่า “${ชื่อ}” เจอ ${เจอ} ปุ่ม ⇒ ต้องเจอ 1 ⇒ ขึ้นต้นด้วยคำที่ตาเห็น แล้วมีชื่อเต็ม (SC 2.5.3)`)
        พูด.push(`  หัว ${ฉ} ⇒ ตาเห็น “${h.ตาเห็น}” lang ${h.ภาษาย่อ} · ได้ยิน “${ชื่อ}” ${เจอ === 1 ? '✓' : '⛔'}`)
      }
    } catch (e) {
      ตก.push(`②③ ล้มระหว่างตรวจ ⇒ ${e.message}`)
    } finally {
      await ctx.close()
    }
    // ⭐ ช่วง ⇒ เลขเป็นช่วงทั้งช่วง
    const { ctx: ctx2, แท็บ: แท็บ2 } = await เปิด({ กว้าง: 375, ที่อยู่: '/read/MRK?c=10&r=10.13-10.16', ฉ: ['TCV'], พัง })
    try {
      const [h] = await อ่านหัว(แท็บ2)
      if (h?.ตาเห็น !== `${ตารางย่อ.TCV.MRK} 10:13–16`) ตก.push(`② ช่วง มาระโก 10:13–16 ⇒ หัวตาเห็น “${h?.ตาเห็น}” ⇒ ต้องเป็น “${ตารางย่อ.TCV.MRK} 10:13–16”`)
      else พูด.push(`  ช่วง ⇒ ตาเห็น “${h.ตาเห็น}”`)
    } catch (e) {
      ตก.push(`② ช่วง ล้มระหว่างตรวจ ⇒ ${e.message}`)
    } finally {
      await ctx2.close()
    }
  }

  // ---------------------------------------------------------------- ⑤ คอลัมน์เดียว ⇒ ⛔ ไม่มี × ⇒ จอแคบกับจอกว้าง
  if (ทำ('⑤'))
    for (const กว้าง of [375, 1080]) {
      const { ctx, แท็บ } = await เปิด({ กว้าง, ที่อยู่: '/read/MRK?c=12', ฉ: ['TCV'], พัง })
      try {
        const หัว = await อ่านหัว(แท็บ)
        ตรวจรูป(ตก, `จอ ${กว้าง} · คอลัมน์เดียว`, หัว, false, 1)
        พูด.push(`  จอ ${กว้าง} · คอลัมน์เดียว ⇒ ${หัว.map((h) => h.วัด.map((x) => x.ชนิด).join(' · ')).join(' | ')}`)
      } catch (e) {
        ตก.push(`⑤ จอ ${กว้าง} ล้มระหว่างตรวจ ⇒ ${e.message}`)
      } finally {
        await ctx.close()
      }
    }

  // ---------------------------------------------------------------- ⑥ กดชื่อย่อกับบทของคอลัมน์ที่ 2 ⇒ แผงเปลี่ยนตอนขึ้น
  if (ทำ('⑥'))
    for (const กว้าง of [375, 1080]) {
      const { ctx, แท็บ } = await เปิด({ กว้าง, ที่อยู่: '/read/MRK?c=12', ฉ: ['TCV', 'WEB'], พัง })
      try {
        const ปุ่ม = แท็บ.locator('.pk-หัวคอลัมน์ .pk-ปุ่มตอน').nth(1)
        await ปุ่ม.scrollIntoViewIfNeeded()
        if ((await ปุ่ม.getAttribute('aria-haspopup')) !== 'dialog') ตก.push(`⑥ จอ ${กว้าง} ⇒ ปุ่มชื่อย่อกับบท ⛔ บอกว่าเปิดแผง (aria-haspopup="dialog")`)
        await ปุ่ม.click()
        const ขึ้น = await แท็บ
          .waitForSelector('[role="dialog"]', { state: 'visible', timeout: 5000 })
          .then(() => true)
          .catch(() => false)
        if (!ขึ้น) ตก.push(`⑥ จอ ${กว้าง} ⇒ กดชื่อย่อกับบทของคอลัมน์ที่ 2 แล้วแผงเปลี่ยนตอน ⛔ ขึ้น`)
        else พูด.push(`  จอ ${กว้าง} ⇒ กดชื่อย่อกับบทของคอลัมน์ที่ 2 ⇒ แผงเปลี่ยนตอนขึ้น`)
      } catch (e) {
        ตก.push(`⑥ จอ ${กว้าง} ล้มระหว่างตรวจ ⇒ ${e.message}`)
      } finally {
        await ctx.close()
      }
    }

  return { ตก, พูด }
}

const ของจริง = await ตรวจ(null)
for (const x of ของจริง.พูด) console.log(x)

let พลาด = ของจริง.ตก.length > 0
if (ของจริง.ตก.length) {
  console.error(`\n⛔ หัวแถวเดียวไม่ผ่าน — ${ของจริง.ตก.length} รายการ:`)
  for (const x of ของจริง.ตก) console.error('  - ' + x)
}

if (ทดสอบตัวเอง && !พลาด) {
  const เฉพาะ = process.argv.find((x) => x.startsWith('--เฉพาะ='))?.slice('--เฉพาะ='.length)
  for (const [ชื่อ, พัง] of Object.entries(ของพัง).filter(([ช]) => !เฉพาะ || ช === เฉพาะ)) {
    const ผล = await ตรวจ(พัง)
    const จับ = ผล.ตก.filter((x) => x.startsWith(พัง.ข้อ))
    console.log(`${จับ.length ? '✅' : '⛔'} ยัด *${ชื่อ}* ⇒ ข้อ ${พัง.ข้อ} ${จับ.length ? `แดง ${จับ.length} รายการ ⇒ เช่น ${จับ[0]}` : '⛔ ไม่แดง'}`)
    if (!จับ.length) พลาด = true
  }
  if (พลาด) console.error('\n⛔ โหมดพิสูจน์: ยัดของพังแล้วด่านยังไม่เห็นบางชิ้น ⇒ ด่านตายบางส่วน')
  else console.log(`\n✅ โหมดพิสูจน์: ด่านหัวแถวเดียวจับของพังได้ครบ ${Object.keys(ของพัง).length} ชิ้น`)
}

await เบราว์เซอร์.close()
if (พลาด) process.exit(1)
if (!ทดสอบตัวเอง) console.log('\n✅ หัวทุกคอลัมน์แถวเดียว 3 ปุ่มทุกจอ · ชื่อย่อตรง toc3 · ชื่อที่ได้ยินถูก · ตัดแค่ชื่อย่อ · คอลัมน์เดียวไม่มี × · กดแล้วเปิดแผง')
