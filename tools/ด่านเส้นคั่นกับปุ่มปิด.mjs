// ด่านตรวจ — **ระหว่างคอลัมน์มีเส้นคั่นเส้นเดียว · × ของทุกหัวคอลัมน์ชิดขอบขวาของคอลัมน์**
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// ## ทำไมต้องมี
//   ⇒ พี่เอมเปิดมาระโก 12 คอลัมน์ TCV + SBLGNT + WEB (17 พ.ย. 2569) ⇒ ระหว่างคำภาษาเดิมกับคอลัมน์ถัดไปเห็นเส้นตั้ง 3 เส้น
//     ⇒ ที่มา ⇒ เส้นขวาของกรอบคู่ (ใบ #125 ข้อ 11.1 ⇒ `แถวคำเดิม.css`) ยื่นพ้นคำเดิม 0.6rem · เส้นคั่นของคอลัมน์ถัดไปอยู่กลางช่อง
//       ⇒ ห่างกันแค่ 3 จุด ⇒ บวกขอบแผ่นฝ้าของหัวที่ยื่นเข้าช่อง ⇒ คอลัมน์ถัดไปเป็นคอลัมน์คนละที่ ⇒ หัวก็ซ้อน
//     ⇒ ด่านเส้นเดิมทุกตัววัด *เส้นที่ควรมี* จากคลาสและกล่อง ⇒ ⛔ มีใครนับว่าตาเห็นกี่เส้น ⇒ เส้นเกินจึงหลุดมาถึงพี่เอม
//   ⇒ และขอให้ × ของทุกหัวคอลัมน์อยู่ขวาสุดโดยอัตโนมัติ ⇒ ⛔ ขึ้นกับความกว้างหัวหรือความยาวชื่อ
//     ⇒ ภาพที่พี่เอมส่งตามมา (มาระโก 13 · จอราว 2000) ⇒ × อยู่ขวาสุดของ *กล่องหัว* แล้ว ⇒ แต่กล่องหัวติดเพดาน 31.2em ของตัวบท
//       ⇒ แคบกว่าคอลัมน์ ⇒ × ห่างเส้นคั่น 50–90 จุด ⇒ *ขวาสุด* ของพี่เอม = **ขอบขวาของคอลัมน์** ⛔ ใช่ขอบของกล่องหัว
//       ⇒ ⚠️ รุ่นแรกของด่านนี้วัดกับขอบในของกล่องหัว ⇒ เขียวทั้งที่พี่เอมเห็นพัง ⇒ ตอนนี้วัดกับขอบคอลัมน์
//
// ## ตรวจอะไร ⇒ เปิดหน้าที่สร้างเสร็จ ⇒ วัดพิกเซลที่เบราว์เซอร์วาดจริง ⛔ ไม่ได้อ่านคลาสหรือ CSS
//   ① **เส้นคั่นเส้นเดียว** ⇒ หัวคอลัมน์ทุกคู่ที่อยู่แถวเดียวกันติดกัน ⇒ ถ่ายภาพจริง ⇒ ไล่พิกเซลในช่องระหว่างหัวสองหัว
//      ⇒ 2 แถบ ⇒ แถบหัว (กลางหัว 3 แถว) · แถบตัวบท (ใต้หัว 3 แถว) ⇒ ทุกแถบต้องมีเส้นที่ตาเห็น 1 เส้นพอดี
//      ⇒ *เส้นที่ตาเห็น* = จุดที่มืดกว่าพื้นของช่องนั้นตั้งแต่ 20 ระดับขึ้นไปในทุกแถวที่วัด ⇒ จุดติดกันนับเป็นเส้นเดียว
//        ⇒ ขอบแผ่นฝ้าที่ต่างจากพื้น 2–4 ระดับ ⛔ นับ ⇒ ระหว่างคอลัมน์ฉบับแปลธรรมดาก็มี และพี่เอมนับเป็นเส้นเดียวอยู่แล้ว
//      ⇒ เส้นในหัวกับเส้นในตัวบทต้องตรงแนวเดียวกัน (ห่างไม่เกิน 1 จุด) ⇒ ⛔ เป็นเส้นหักข้อศอก
//      ⇒ หน้า ⇒ มาระโก 12 คำเดิมอยู่ ต้น · กลาง · ท้าย · 2 คอลัมน์ · คู่กรอบ + คอลัมน์คนละที่ (มาระโก 9 + มัทธิว 17)
//        · มาระโก 13 คำเดิมกลาง (หน้าในภาพของพี่เอม)
//      ⇒ จอ 1280 · 1920 · 2000 ⇒ จอแคบ 375 · 768 (ซ้ายขวา ⇒ ตั้งต้นของเว็บ)
//   ② **× ชิดขอบขวาของคอลัมน์** ⇒ ทุกหัวที่ตาเห็นและมี ×
//      ⇒ ขอบขวาของคอลัมน์ ⇒ ไล่ขึ้นหาตารางชั้นแรกที่มีเส้นตารางจริง (ข้ามชั้น `subgrid`) และมีช่องเริ่มตรงขอบซ้ายของหัว
//        ⇒ ปลายช่องแรกที่ไม่สั้นกว่าตัวหัว (หัวกินหลายช่องได้) = ขอบขวาของคอลัมน์
//        ⇒ หัวของคอลัมน์คนละที่ ⇒ ขอบในขวาของกล่อง `.pk-ตอนเทียบ` ⇒ หาช่องไม่เจอ = แดง (③)
//      ⇒ ขอบขวาของ × = ขอบขวาของคอลัมน์ (ห่างไม่เกิน 1 จุด) · และขอบในขวาของกล่องหัว ⇒ ⛔ เลขตายตัว
//      ⇒ อยู่ในหัวทั้งปุ่ม · กว้างและสูงไม่ต่ำกว่า 44 จุด (WCAG 2.2 SC 2.5.5) · ⛔ ทับของกดได้อื่นในหัว (ช่องฉบับ · ปุ่มตอน · เฟือง · i)
//      ⇒ จอ 320 · 375 · 768 · 1280 · 2000 × ตัวอักษรของเว็บ 100% · 200% (`pk-fs` = 2)
//      ⇒ หน้า ⇒ มาระโก 13 TCV + SBLGNT (มีเฟือง) + WEB · มาระโก 13 TCV + WEB + KJV (⛔ มีคำเดิม) · คอลัมน์คนละที่ (หัวของ `.pk-ตอนเทียบ`)
//   ③ **ด่านตรวจได้จริง** ⇒ ทุกหน้าต้องมีหัวให้วัด ⇒ หน้าจอกว้างต้องมีหัวคู่ให้นับเส้น ⇒ ⛔ เจอ = แดง ⇒ ⛔ เขียวเงียบ
//
// ## วิธีพิสูจน์ว่าด่านนี้แดงได้จริง
//
//   node tools/ด่านเส้นคั่นกับปุ่มปิด.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพังทีละชิ้น (`ของพัง`) ⇒ แต่ละชิ้นต้องทำให้ข้อของมันแดง ⇒ ⛔ แดง = ด่านตายแล้ว
//     ⇒ เส้นซ้อนของเดิมกลับมา (①) · เส้นเกินในหัว (①) · เส้นหัวกับตัวบทไม่ตรงแนว (①)
//     · × เลิกชิดขวา (②) · × วางด้วยเลขตายตัว (②) · × เล็กกว่า 44 (②)
//     · หัวติดเพดาน 31.2em ของตัวบทแบบเดิม ⇒ ภาพของพี่เอม มาระโก 13 จอ 2000 (②)
//
//   node tools/ด่านเส้นคั่นกับปุ่มปิด.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import { เส้นทางเว็บ } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')

const หน้าเส้น = [
  '/read/MRK?c=12&t=TCV,SBLGNT,WEB', // คำเดิมกลาง ⇒ ที่พี่เอมเจอ
  '/read/MRK?c=12&t=SBLGNT,TCV,WEB', // คำเดิมต้น
  '/read/MRK?c=12&t=TCV,WEB,SBLGNT', // คำเดิมท้าย
  '/read/MRK?c=12&t=TCV,SBLGNT', // 2 คอลัมน์ ⇒ กรอบคู่ ⛔ มีคอลัมน์ขวา
  '/read/MRK?c=9&p=MAT.17.WEB&t=TCV,SBLGNT', // กรอบคู่ + คอลัมน์คนละที่ ⇒ หัวก็ซ้อน
  '/read/MRK?c=13&t=TCV,SBLGNT,WEB', // ภาพของพี่เอม
]
const จอเส้น = [375, 768, 1280, 1920, 2000]
const หน้าปุ่ม = ['/read/MRK?c=13&t=TCV,SBLGNT,WEB', '/read/MRK?c=13&t=TCV,WEB,KJV', '/read/MRK?c=9&p=MAT.17.WEB&t=TCV,SBLGNT']
const จอปุ่ม = [320, 375, 768, 1280, 2000]

const ของพัง = {
  // ของเดิมก่อนแก้ ⇒ ด้านขวาของกรอบกลับมา ⇒ ยื่น 0.6rem สีขอบเข้ม มุมโค้ง ⇒ ห่างเส้นคั่น 3 จุด
  เส้นซ้อนของเดิม: {
    ข้อ: '①',
    css: `.pk-คู่คำเดิม .pk-ฝั่งหลัก::before { margin-inline-end: -0.6rem !important; border-inline-end-color: var(--color-pk-edge) !important;
            border-start-end-radius: var(--pk-มุมกรอบ) !important; border-end-end-radius: var(--pk-มุมกรอบ) !important; }`,
    หน้า: ['/read/MRK?c=12&t=TCV,SBLGNT,WEB'],
    จอ: [1920],
  },
  เส้นเกินในหัว: {
    ข้อ: '①',
    css: `.pk-หัวคอลัมน์ > .pk-ช่องทั้งหมด > .pk-หัวช่อง { outline: 1px solid #9c7425; outline-offset: 4px; }`,
    หน้า: ['/read/MRK?c=12&t=TCV,WEB,SBLGNT'],
    จอ: [1280],
  },
  เส้นหัวกับตัวบทไม่ตรงแนว: {
    ข้อ: '①',
    css: `.pk-ตัวบท > .pk-ชั้นคำ::after { translate: -4px 0; }`,
    หน้า: ['/read/MRK?c=12&t=TCV,SBLGNT,WEB'],
    จอ: [1920],
  },
  กากบาทเลิกชิดขวา: {
    ข้อ: '②',
    css: `.pk-หัวช่อง .pk-ปุ่มปิดช่อง, .pk-หัวช่อง > .pk-ปุ่มตอนเทียบ > .pk-ปุ่มคำเดิมบนหัว { margin-inline-start: 0 !important; }`,
    หน้า: ['/read/MRK?c=12&t=TCV,SBLGNT,WEB'],
    จอ: [1280],
  },
  กากบาทเลขตายตัว: {
    ข้อ: '②',
    css: `.pk-หัวช่อง { position: relative; } .pk-หัวช่อง .pk-ปุ่มปิดช่อง { position: absolute !important; left: 240px !important; top: 4px !important; }`,
    หน้า: ['/read/MRK?c=12&t=TCV,SBLGNT,WEB'],
    จอ: [375],
  },
  // ภาพของพี่เอม ⇒ หัวติดเพดานความยาวบรรทัดของตัวบท ⇒ × ชิดขวาของกล่องหัว แต่ห่างขอบคอลัมน์
  หัวติดเพดานตัวบท: {
    ข้อ: '②',
    css: `.pk-คอลัมน์ .pk-หัวคอลัมน์ > .pk-ช่องทั้งหมด > .pk-หัวช่อง { max-width: 31.2em !important; }`,
    หน้า: ['/read/MRK?c=13&t=TCV,SBLGNT,WEB'],
    จอ: [2000],
  },
  กากบาทเล็ก: {
    ข้อ: '②',
    css: `.pk-หัวช่อง .pk-ปุ่มปิดช่อง { min-width: 30px !important; width: 30px !important; min-height: 30px !important; height: 30px !important; }`,
    หน้า: ['/read/MRK?c=9&p=MAT.17.WEB&t=TCV,SBLGNT'],
    จอ: [1920],
  },
}

const เบราว์เซอร์ = await chromium.launch()

/** เปิดหน้า ⇒ ตัวอักษร 200% ผ่านค่าที่เว็บจำไว้เอง (`pk-fs`) ⇒ ⛔ ยัด CSS ขนาดเอง */
async function เปิด(ที่อยู่, จอ, ใหญ่, css) {
  const ห = await เบราว์เซอร์.newPage({ viewport: { width: จอ, height: 1000 }, deviceScaleFactor: 1 })
  if (ใหญ่) await ห.addInitScript(() => localStorage.setItem('pk-fs', '2'))
  await ห.goto(ฐาน + ที่อยู่, { waitUntil: 'networkidle' })
  if (css) await ห.addStyleTag({ content: css })
  // ⭐ รอให้หน้าอ่านจัดแถวเสร็จ (`data-จัดแถว`) ⇒ แล้วรออีกสองเฟรม ⇒ คลาสที่หน้าอ่านวัดแล้วใส่ (`pk-คู่คำเดิม` · ห่อแถว) ลงครบ
  await ห.waitForFunction(() => document.querySelector('header.pk-หัวช่อง'), null, { timeout: 30000 })
  await ห.waitForTimeout(600)
  await ห.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
  return ห
}

/** หัวที่ตาเห็น ⇒ กล่อง · ขอบใน · × · ของกดได้อื่น · ขอบขวาของคอลัมน์ (หัวข้อ ②) */
async function หัวทั้งหมด(ห) {
  return ห.evaluate(() =>
    [...document.querySelectorAll('header.pk-หัวช่อง')]
      .filter((h) => {
        const r = h.getBoundingClientRect()
        const s = getComputedStyle(h)
        return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && h.checkVisibility?.() !== false
      })
      .map((h) => {
        const r = h.getBoundingClientRect()
        const s = getComputedStyle(h)
        const ชื่อ = h.querySelector('.pk-ป้ายฉบับที่เลือก')?.textContent?.trim() || '?'
        const x = h.querySelector('.pk-ปุ่มปิดช่อง')
        // ⭐ ขอบขวาของคอลัมน์ ⇒ ไล่ขึ้นหาตารางชั้นแรกที่มีเส้นตารางจริง (ข้ามชั้น `subgrid` ⇒ เส้นตำแหน่งเดียวกัน)
        //   ⇒ ช่องของตารางที่ขอบซ้ายตรงกับขอบซ้ายของหัว (ของในช่องชิดซ้ายเสมอ) ⇒ ขอบขวาของช่องนั้น = ขอบขวาของคอลัมน์
        //   ⇒ ใช้ได้ทั้งช่องที่วางเอง (`auto-fit` ⇒ หัวที่ห่อลงแถวใหม่) และช่องที่ระบุเลข ⇒ ⛔ ต้องรู้ว่าหัวอยู่ช่องที่เท่าไร
        //   ⇒ กล่องคอลัมน์คนละที่ (`.pk-ตอนเทียบ`) ⇒ ⛔ ใช่ตาราง ⇒ ขอบในขวาของกล่อง
        const หัวซ้าย = h.getBoundingClientRect().left
        const หัวขวา = h.getBoundingClientRect().right
        let ขอบคอลัมน์ขวา = null
        for (let g = h.parentElement; g && g !== document.body && ขอบคอลัมน์ขวา === null; g = g.parentElement) {
          const gs = getComputedStyle(g)
          const gr = g.getBoundingClientRect()
          if (g.matches('.pk-ตอนเทียบ')) {
            ขอบคอลัมน์ขวา = gr.right - parseFloat(gs.paddingRight) - parseFloat(gs.borderRightWidth)
            break
          }
          if (!/grid/.test(gs.display) || /^(subgrid|none)/.test(gs.gridTemplateColumns)) continue
          const ช่องไฟ = parseFloat(gs.columnGap) || 0
          let xx = gr.left + parseFloat(gs.paddingLeft) + parseFloat(gs.borderLeftWidth)
          const ช่อง = []
          for (const t of gs.gridTemplateColumns.split(/\s+/).map(parseFloat)) {
            ช่อง.push([xx, xx + t])
            xx += t + ช่องไฟ
          }
          // ⭐ หัวกินได้หลายช่อง (เช่นจอแคบ ⇒ ช่องเลขข้อ + ช่องตัวบท) ⇒ ขอบขวาของพื้นที่หัว = ปลายช่องแรกที่ไม่สั้นกว่าตัวหัว
          if (!ช่อง.some(([a]) => Math.abs(a - หัวซ้าย) <= 1.5)) continue
          const ปลาย = ช่อง.find(([a, z]) => a >= หัวซ้าย - 1.5 && z >= หัวขวา - 1.5)
          if (ปลาย) ขอบคอลัมน์ขวา = ปลาย[1]
        }
        const กล่อง = (e) => { const q = e.getBoundingClientRect(); return { l: q.left, r: q.right, t: q.top, b: q.bottom } }
        const อื่น = [...h.querySelectorAll('button, label.pk-เลือกฉบับเทียบ')]
          .filter((e) => e !== x && !x?.contains(e) && e.getBoundingClientRect().width > 0 && e.checkVisibility?.() !== false)
          .map((e) => ({ ...กล่อง(e), ชื่อ: e.getAttribute('data-ปุ่ม') || e.className.split(' ').pop() }))
        return {
          ชื่อ,
          l: r.left,
          r: r.right,
          t: r.top,
          b: r.bottom,
          ขอบในขวา: r.right - parseFloat(s.paddingRight) - parseFloat(s.borderRightWidth),
          ขอบในซ้าย: r.left + parseFloat(s.paddingLeft) + parseFloat(s.borderLeftWidth),
          x: x && x.getBoundingClientRect().width > 0 ? กล่อง(x) : null,
          อื่น,
          ขอบคอลัมน์ขวา,
        }
      }),
  )
}

/** ① นับเส้นที่ตาเห็นในช่องระหว่างหัวทุกคู่ ⇒ ถ่ายภาพจริงแล้วอ่านพิกเซลในหน้าเอง (canvas) ⇒ ⛔ ต้องลงตัวถอด PNG เพิ่ม */
async function นับเส้น(ห, หัว) {
  const เรียง = หัว.slice().sort((a, b) => a.t - b.t || a.l - b.l)
  const คู่ = []
  for (let i = 0; i + 1 < เรียง.length; i++) {
    const [a, b] = [เรียง[i], เรียง[i + 1]]
    // ⭐ แถวเดียวกัน ⇒ ขอบบนตรงกัน ⇒ หัวขวาอยู่พ้นหัวซ้าย ⇒ มีช่องให้วัดอย่างน้อย 4 จุด
    if (Math.abs(a.t - b.t) < 2 && b.l - a.r >= 4) คู่.push({ ซ้าย: a.ชื่อ, ขวา: b.ชื่อ, x0: Math.ceil(a.r) + 1, x1: Math.floor(b.l) - 1, หัว: [a.t + (a.b - a.t) * 0.35, (a.t + a.b) / 2, a.t + (a.b - a.t) * 0.65], ตัวบท: [Math.max(a.b, b.b) + 140, Math.max(a.b, b.b) + 260, Math.max(a.b, b.b) + 380] })
  }
  if (!คู่.length) return []
  const ภาพ = (await ห.screenshot()).toString('base64')
  return ห.evaluate(
    async ({ ภาพ, คู่ }) => {
      const img = new Image()
      img.src = 'data:image/png;base64,' + ภาพ
      await img.decode()
      const c = document.createElement('canvas')
      c.width = img.width
      c.height = img.height
      const g = c.getContext('2d', { willReadFrequently: true })
      g.drawImage(img, 0, 0)
      const แถว = (x0, x1, y) => {
        const d = g.getImageData(x0, Math.round(y), x1 - x0, 1).data
        const L = []
        for (let i = 0; i < x1 - x0; i++) L.push(0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2])
        return L
      }
      const วัด = (x0, x1, ys) => {
        const ys2 = ys.filter((y) => y >= 0 && y < img.height - 1)
        if (ys2.length < 2) return null
        const ทุกแถว = ys2.map((y) => แถว(x0, x1, y))
        // ⭐ ค่าที่สว่างที่สุดของแต่ละจุดในทุกแถว ⇒ จุดที่มืดเพราะตัวหนังสือแถวใดแถวหนึ่ง ⛔ นับ ⇒ เส้นต้องมืดทุกแถว
        const สว่าง = ทุกแถว[0].map((_, i) => Math.max(...ทุกแถว.map((r) => r[i])))
        const พื้น = Math.max(...สว่าง)
        const เส้น = []
        let เริ่ม = -1
        for (let i = 0; i <= สว่าง.length; i++) {
          const มืด = i < สว่าง.length && พื้น - สว่าง[i] >= 20
          if (มืด && เริ่ม < 0) เริ่ม = i
          if (!มืด && เริ่ม >= 0) {
            เส้น.push(x0 + (เริ่ม + i - 1) / 2)
            เริ่ม = -1
          }
        }
        return { เส้น, พิกเซล: สว่าง.map(Math.round).join(',') }
      }
      return คู่.map((ค) => ({ ...ค, ผลหัว: วัด(ค.x0, ค.x1, ค.หัว), ผลตัวบท: วัด(ค.x0, ค.x1, ค.ตัวบท) }))
    },
    { ภาพ, คู่ },
  )
}

async function ตรวจเส้น(css, ขอบเขต = {}) {
  const ตก = []
  let คู่ที่นับ = 0
  for (const ที่อยู่ of ขอบเขต.หน้า || หน้าเส้น)
    for (const จอ of ขอบเขต.จอ || จอเส้น) {
      const ห = await เปิด(ที่อยู่, จอ, false, css)
      const หัว = await หัวทั้งหมด(ห)
      const ป้าย = `① จอ ${จอ} ${ที่อยู่}`
      if (!หัว.length) ตก.push(`${ป้าย} ⇒ ⛔ เจอหัวคอลัมน์ให้วัด (③)`)
      const ผล = await นับเส้น(ห, หัว)
      if (จอ >= 1280 && !ผล.length) ตก.push(`${ป้าย} ⇒ ⛔ มีหัวคู่ที่อยู่แถวเดียวกันให้นับเส้น (③)`)
      for (const ค of ผล) {
        คู่ที่นับ++
        const ชื่อคู่ = `${ค.ซ้าย}|${ค.ขวา}`
        for (const [ส่วน, ร] of [['หัว', ค.ผลหัว], ['ตัวบท', ค.ผลตัวบท]]) {
          if (!ร) continue
          if (ร.เส้น.length !== 1) ตก.push(`${ป้าย} ${ชื่อคู่} ⇒ ${ส่วน}มีเส้นตั้ง ${ร.เส้น.length} เส้น ⛔ ต้อง 1 เส้น [${ร.พิกเซล}]`)
        }
        if (ค.ผลหัว?.เส้น.length === 1 && ค.ผลตัวบท?.เส้น.length === 1 && Math.abs(ค.ผลหัว.เส้น[0] - ค.ผลตัวบท.เส้น[0]) > 1)
          ตก.push(`${ป้าย} ${ชื่อคู่} ⇒ เส้นในหัว x=${ค.ผลหัว.เส้น[0]} กับในตัวบท x=${ค.ผลตัวบท.เส้น[0]} ⛔ ตรงแนวเดียวกัน`)
      }
      await ห.close()
    }
  return { ตก, คู่ที่นับ }
}

async function ตรวจปุ่ม(css, ขอบเขต = {}) {
  const ตก = []
  let นับ = 0
  for (const ที่อยู่ of ขอบเขต.หน้า || หน้าปุ่ม)
    for (const จอ of ขอบเขต.จอ || จอปุ่ม)
      for (const ใหญ่ of ขอบเขต.ใหญ่ || [false, true]) {
        const ห = await เปิด(ที่อยู่, จอ, ใหญ่, css)
        const หัว = await หัวทั้งหมด(ห)
        const ป้าย = `② จอ ${จอ}${ใหญ่ ? ' ตัวอักษร 200%' : ''} ${ที่อยู่}`
        if (!หัว.some((h) => h.x)) ตก.push(`${ป้าย} ⇒ ⛔ เจอหัวที่มี × ให้วัด (③)`)
        for (const h of หัว) {
          if (!h.x) continue
          นับ++
          const x = h.x
          const ก = x.r - x.l, ส = x.b - x.t
          if (h.ขอบคอลัมน์ขวา === null) ตก.push(`${ป้าย} หัว ${h.ชื่อ} ⇒ ⛔ หาช่องของตารางที่หัวนี้อยู่ไม่เจอ ⇒ ⛔ วัดขอบคอลัมน์ได้ (③)`)
          else if (Math.abs(x.r - h.ขอบคอลัมน์ขวา) > 1) ตก.push(`${ป้าย} หัว ${h.ชื่อ} ⇒ × ขอบขวา ${x.r.toFixed(1)} ⛔ ชิดขอบขวาของคอลัมน์ ${h.ขอบคอลัมน์ขวา.toFixed(1)} (ห่าง ${(h.ขอบคอลัมน์ขวา - x.r).toFixed(1)} จุด)`)
          if (Math.abs(x.r - h.ขอบในขวา) > 1) ตก.push(`${ป้าย} หัว ${h.ชื่อ} ⇒ × ขอบขวา ${x.r.toFixed(1)} ⛔ ชิดขอบในขวาของหัว ${h.ขอบในขวา.toFixed(1)}`)
          if (x.l < h.ขอบในซ้าย - 0.5 || x.t < h.t - 0.5 || x.b > h.b + 0.5) ตก.push(`${ป้าย} หัว ${h.ชื่อ} ⇒ × ล้นออกนอกหัว`)
          if (ก < 44 - 0.01 || ส < 44 - 0.01) ตก.push(`${ป้าย} หัว ${h.ชื่อ} ⇒ × ${ก.toFixed(1)}×${ส.toFixed(1)} ⛔ เล็กกว่า 44 จุด`)
          for (const o of h.อื่น)
            if (o.r > x.l + 0.5 && o.l < x.r - 0.5 && o.b > x.t + 0.5 && o.t < x.b - 0.5) ตก.push(`${ป้าย} หัว ${h.ชื่อ} ⇒ × ทับ ${o.ชื่อ}`)
        }
        await ห.close()
      }
  return { ตก, นับ }
}

const ที่ตก = []
if (!ทดสอบตัวเอง) {
  const เริ่ม = Date.now()
  const ส = await ตรวจเส้น()
  console.log(`${ส.ตก.length ? '⛔' : '✅'} ① เส้นคั่นเส้นเดียว ⇒ ${หน้าเส้น.length} หน้า × จอ ${จอเส้น.join(' · ')} ⇒ นับ ${ส.คู่ที่นับ} คู่หัว (${((Date.now() - เริ่ม) / 1000).toFixed(0)} วินาที)`)
  for (const x of ส.ตก.slice(0, 40)) console.log(`   ${x}`)
  const เริ่ม2 = Date.now()
  const ป = await ตรวจปุ่ม()
  console.log(`${ป.ตก.length ? '⛔' : '✅'} ② × ชิดขอบขวาของคอลัมน์ ⇒ ${หน้าปุ่ม.length} หน้า × จอ ${จอปุ่ม.join(' · ')} × ตัวอักษร 100% · 200% ⇒ วัด ${ป.นับ} ปุ่ม (${((Date.now() - เริ่ม2) / 1000).toFixed(0)} วินาที)`)
  for (const x of ป.ตก.slice(0, 40)) console.log(`   ${x}`)
  ที่ตก.push(...ส.ตก, ...ป.ตก)
} else {
  // ⭐ ของปกติต้องเขียวก่อน ⇒ ⛔ งั้นของพังที่ "จับได้" อาจเป็นแค่ของปกติที่แดงอยู่แล้ว
  for (const [ท่า, พ] of Object.entries(ของพัง)) {
    const ขอบเขต = { หน้า: พ.หน้า, จอ: พ.จอ, ใหญ่: [false] }
    const ตรวจ = พ.ข้อ === '①' ? ตรวจเส้น : ตรวจปุ่ม
    const ปกติ = await ตรวจ('', ขอบเขต)
    const พัง = await ตรวจ(พ.css, ขอบเขต)
    const จับได้ = !ปกติ.ตก.length && พัง.ตก.some((x) => x.startsWith(พ.ข้อ))
    console.log(`${จับได้ ? '✅' : '⛔'} โหมดพิสูจน์ ${ท่า} ⇒ ด่าน${จับได้ ? 'จับได้' : '⛔ จับไม่ได้'}${จับได้ ? ` ⇒ ${พัง.ตก[0]}` : ''}`)
    if (!จับได้) {
      ที่ตก.push(`โหมดพิสูจน์ ${ท่า} ⇒ ${ปกติ.ตก.length ? 'ของปกติแดงอยู่แล้ว' : `ยัดของพังแล้วข้อ ${พ.ข้อ} ⛔ แดง`}`)
      for (const x of [...ปกติ.ตก, ...พัง.ตก].slice(0, 5)) console.log(`   ${x}`)
    }
  }
}

await เบราว์เซอร์.close()

if (ที่ตก.length) {
  console.log(`\n⛔ ด่านเส้นคั่นกับปุ่มปิดแดง — ${ที่ตก.length} เรื่อง`)
  for (const x of ที่ตก.slice(0, 60)) console.log(`  · ${x}`)
  process.exit(1)
}
console.log(ทดสอบตัวเอง ? '\n✅ ด่านเส้นคั่นกับปุ่มปิดยังจับของพังได้ครบทุกท่า' : '\n✅ ด่านเส้นคั่นกับปุ่มปิดเขียว')
