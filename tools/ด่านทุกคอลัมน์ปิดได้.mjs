// ด่านตรวจ — **ทุกคอลัมน์ปิดได้เหมือนกันหมด ⇒ ปิดฉบับแปลฉบับสุดท้ายแล้วเหลือคำภาษาเดิมคอลัมน์เดียว** (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/145)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// ## ทำไมต้องมี
//
// พี่เอมเคาะ 6 พ.ย. 2569 ⇒ *"ให้มองว่าภาษาเดิมคือ 1 ฉบับแปลหรือ 1 เวอร์ชั่น ทุกคอลัมน์ทุกเวอร์ชั่นเทียบเท่ากันหมด
//   เว้นแต่ถ้าไม่มีภาษาพูดก็ไม่ต้องมีปุ่มพูด"*
//   ⇒ ของเดิม (ใบ #102 ข้อ 1.2) ⇒ นับเฉพาะฉบับแปล ⇒ เปิด TCV + คำภาษาเดิม ⇒ TCV ไม่มี × และช่องติ๊กล็อก ⇒ อ่านกรีกอย่างเดียวไม่ได้
//   ⇒ ด่านนี้ตรวจก้อน ก. ของใบ ⇒ เกณฑ์ข้อ 1 · 1.1 · 5 (เหลือแต่คำเดิม) · 6 · 7
//
// ## ตรวจ 7 ข้อ ⇒ กดปุ่มจริง วัดของที่วาดออกมาจริง
//   ① 🔴 **TCV + คำเดิม ⇒ ทั้งสองคอลัมน์ปิดได้** ⇒ จอ 375 · 1280 ⇒ × ของ TCV กับ × ของคำเดิมเห็นทั้งคู่ ⇒ ช่องติ๊กทั้งสอง ⛔ ล็อก
//      ⇒ ⚠️ ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/161 ⇒ ช่องติ๊กในเมนูถอดแล้ว ⇒ ท่อน *ช่องติ๊กทั้งสอง ⛔ ล็อก* ⛔ มีของให้ตรวจ ⇒ เหลือ × ทั้งคู่
//   ② 🔴 **กด × ของ TCV ⇒ เหลือคำเดิมคอลัมน์เดียว เต็มกว้าง** ⇒ จอ 375 ซ้ายขวา · บนล่าง · ทีละฉบับ ⇒ จอ 1280 แยกตามข้อ · แยกตามย่อหน้า · ไหลต่อเนื่อง
//      ⇒ ตัวบทฉบับแปล ⛔ ถูกวาดให้ตาเห็น ⇒ ก้อนคำเดิมกว้างไม่ต่ำกว่า 90% ของตัวบท ⇒ ⛔ มี × เหลือ ⇒ ⛔ มีประโยคเตือนหน้าว่าง
//      ⇒ ช่องติ๊กคำเดิมติ๊กอยู่และล็อกพร้อมเหตุผลที่ตาเห็น ⇒ ที่อยู่มี `t=SBLGNT`
//      ⇒ ⚠️ ใบ #161 ⇒ ช่องติ๊กถอดแล้ว ⇒ ท่อนนี้กลายเป็น *คอลัมน์สุดท้าย ⛔ มี × ให้ปิดจนหน้าว่าง* ⇒ ล็อกแบบเดียวที่ยังเหลือ (ใบ #102 ข้อ 1.2)
//   ③ 🔴 **ลิงก์ที่เหลือแต่คำเดิม** ⇒ `t=SBLGNT&v=20` ⇒ เปิดแล้วได้คำเดิมคอลัมน์เดียว ⇒ แถวคำเดิมของข้อ 20 อยู่ใต้แถบหนึบพอดี (ไม่เกิน 48 จุด)
//      ⇒ `t=WLC` ของนางรูธ ⇒ คำฮีบรูคอลัมน์เดียว
//   ④ 🔴 **ปุ่มฟัง** ⇒ เหลือแต่คำเดิม ⇒ ⛔ มีทั้งปุ่ม *ฟัง* และประโยค *ยังไม่มีเสียง* ⇒ ติ๊ก TCV กลับ ⇒ ปุ่ม *ฟัง* กลับมา
//      ⇒ ⚠️ ใบ #161 ⇒ เปิด TCV กลับด้วยปุ่ม *เพิ่มคอลัมน์* แล้วเลือก TCV ⇒ ของเดิมติ๊กช่อง TCV ในเมนู
//   ⑤ 🔴 **กดถอยหลัง** ⇒ หลังปิด TCV ⇒ TCV กลับมา ⇒ ที่อยู่ `t=TCV,SBLGNT` (⚠️ ก้อน ข. ⇒ คำเดิมที่เปิดอยู่อยู่ใน `t` ⇒ ของเดิมก้อน ก. ⛔ มี `t`)
//   ⑥ 🔴 **ปิดคำเดิมตอนมันเป็นคอลัมน์สุดท้ายที่เดียวกับหน้า** ⇒ คอลัมน์คนละที่อันแรกขึ้นเป็นเจ้าของหน้า (ใบ #102 ข้อ 1.3) ⇒ ⛔ หน้าว่าง
//   ⑦ 🔴 **ชื่อที่โปรแกรมอ่านหน้าจอได้ยิน** ⇒ ปุ่มบทบนหัวบอก *คอลัมน์คำภาษาเดิม* ⇒ ก้อนคำบอกบท ⇒ SC 2.5.3 · 1.3.1
//   ⑧ 🔴 **ลิงก์ ⛔ เขียนความชอบในเครื่อง** (พี่เอมเลือกทาง ข.) ⇒ ความชอบปิดคำเดิมไว้ ⇒ เปิดลิงก์ `t=SBLGNT` ⇒ เห็นคำเดิม
//      ⇒ แต่ `phrakham.view` ในเครื่องยังเป็นปิด ⇒ เปิดเว็บใหม่โดยไม่มีลิงก์ ⇒ ⛔ มีคำเดิม
//
// ## รอให้หน้าพร้อมจริง ⛔ ไม่รอเป็นเวลาตายตัว (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/108) ⇒ `รอหน้านิ่ง` ของ `tools/หน้าที่ตรวจ.mjs`
//
// ## วิธีพิสูจน์ว่าด่านนี้แดงได้จริง ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านทุกคอลัมน์ปิดได้.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพังทีละชิ้น ⇒ แต่ละชิ้นต้องทำให้ข้อของมันแดง
//     ① **ของเดิมก่อนใบนี้** ⇒ × ของฉบับแปลหายเมื่อเหลือฉบับแปลฉบับเดียว ⇒ ① ต้องจับได้
//     ② ตัวบทฉบับแปลยังโผล่ ⇒ ② · คำเดิมกว้างครึ่งเดียว ⇒ ② · ที่อยู่ไม่บอก `t` ⇒ ②
//     ③ หน้าไม่เลื่อนไปข้อที่ลิงก์บอก ⇒ ③ ต้องจับได้
//     ④ ประโยค *ยังไม่มีเสียง* ค้าง ⇒ ④ ต้องจับได้
//     ⑤ กดถอยหลังแล้วหน้าไม่คืน ⇒ ⑤ ต้องจับได้
//     ⑥ × ของคำเดิมกดแล้วไม่เกิดอะไร ⇒ ⑥ ต้องจับได้
//     ⑦ ชื่อที่ได้ยินหาย ⇒ ⑦ ต้องจับได้
//     ⑧ **ของเดิมก่อนทาง ข.** ⇒ ลิงก์เขียน *เปิดคำเดิม* ลงความชอบ ⇒ ⑧ ต้องจับได้
//
//   node tools/ด่านทุกคอลัมน์ปิดได้.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import { เส้นทางเว็บ, รอหน้านิ่ง, ปุ่มเทียบของหน้า, เพิ่มคอลัมน์ } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const ที่อยู่ = '/read/MRK?c=12'

/** ของพังที่ยัดในโหมดพิสูจน์ ⇒ ⛔ ไม่แตะโค้ดของเว็บ ⇒ `css` · `บนหน้า` ยัดตอนหน้าพร้อม · `ก่อนโหลด` ยัดก่อนโค้ดของเว็บ */
const ของพัง = {
  ล็อกแบบเดิม: { ข้อ: '①', css: '.pk-ช่องหัว[data-ฉบับ] [data-ปุ่ม="ปิดคอลัมน์"] { display: none !important; }' },
  ฉบับแปลยังโผล่: {
    ข้อ: '②',
    css: '.pk-เหลือแต่คำเดิม .pk-ตัวบท > .pk-ข้อ, .pk-เหลือแต่คำเดิม .pk-ตัวบท > .pk-ย่อหน้ากอง, .pk-เหลือแต่คำเดิม .pk-ตัวบท > .pk-ไหล { display: grid !important; }',
  },
  คำเดิมครึ่งเดียว: { ข้อ: '②', css: '.pk-เหลือแต่คำเดิม .pk-ตัวบท > .pk-ชั้นคำ { max-width: 50% !important; }' },
  ที่อยู่ไม่บอก: {
    ข้อ: '②',
    บนหน้า: () => {
      for (const ชื่อ of ['replaceState', 'pushState']) {
        const เดิม = history[ชื่อ].bind(history)
        history[ชื่อ] = (s, t, u) => เดิม(s, t, typeof u === 'string' ? u.replace(/[?&]t=[^&#]*/, '') : u)
      }
    },
  },
  ไม่เลื่อนไปข้อ: { ข้อ: '③', ก่อนโหลด: () => (window.scrollTo = () => {}) },
  ประโยคค้าง: {
    ข้อ: '④',
    บนหน้า: () => {
      const ใส่ = () => {
        const แถบ = document.querySelector('.pk-แถบล่าง')
        if (แถบ && !แถบ.querySelector('[data-ปุ่ม="ไม่มีเสียง"]')) {
          const p = document.createElement('p')
          p.dataset.ปุ่ม = 'ไม่มีเสียง'
          p.textContent = 'ยังไม่มีเสียง'
          แถบ.append(p)
        }
      }
      ใส่()
      new MutationObserver(ใส่).observe(document.body, { subtree: true, childList: true })
    },
  },
  // ⭐ การกดไม่เปิดช่องถอยหลัง (1 การกด ⛔ เท่ากับ 1 ช่อง ⇒ ใบ #125 ข้อ 13) ⇒ ถอยหลังแล้วหลุดออกจากหน้า ⇒ TCV ⛔ กลับมา
  ถอยหลังไม่คืน: { ข้อ: '⑤', ก่อนโหลด: () => (history.pushState = () => {}) },
  ปิดคำเดิมตาย: {
    ข้อ: '⑥',
    บนหน้า: () =>
      document.addEventListener(
        'click',
        (e) => {
          if (e.target.closest?.('[data-ปุ่ม="ปิดคำเดิม"]')) e.stopImmediatePropagation()
        },
        true,
      ),
  },
  // ⭐ ยัดพฤติกรรมเดิมกลับ ⇒ ทุกครั้งที่หน้าเขียนความชอบ ⇒ บังคับ *เปิดคำเดิม* ตามลิงก์ ⇒ แบบก่อนทาง ข.
  ลิงก์เขียนความชอบ: {
    ข้อ: '⑧',
    ก่อนโหลด: () => {
      // ⭐ อ่านลิงก์ตอนเอกสารเพิ่งเริ่ม ⇒ ตัวจัดเส้นทางของ Nuxt พักคำถามท้ายที่อยู่ไว้ชั่วครู่ตอนหน้าเขียนความชอบ
      const ลิงก์คำเดิม = /[?&]t=[^&]*(SBLGNT|WLC)/.test(location.search)
      const เดิม = Storage.prototype.setItem
      Storage.prototype.setItem = function (k, v) {
        if (k === 'phrakham.view' && ลิงก์คำเดิม) {
          try {
            v = JSON.stringify({ ...JSON.parse(v), ภาษาเดิม: true })
          } catch {}
        }
        return เดิม.call(this, k, v)
      }
    },
  },
  ชื่อหาย: {
    ข้อ: '⑦',
    บนหน้า: () => {
      const ถอด = () => document.querySelectorAll('[data-ชื่อคำเดิม] [data-ปุ่ม="เปลี่ยนตอน"] .pk-เฉพาะเสียง').forEach((x) => x.remove())
      ถอด()
      new MutationObserver(ถอด).observe(document.body, { subtree: true, childList: true })
    },
  },
}

const เบราว์เซอร์ = await chromium.launch()
const สองเฟรม = (แท็บ) => แท็บ.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))

async function เปิด({ กว้าง, สูง = 812, ทาง = ที่อยู่, ฉ = ['TCV'], มุม = {}, พัง = null }) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: สูง } })
  await ctx.addInitScript(
    ([ฉ, มุม]) => {
      try {
        if (!sessionStorage.getItem('pk-ด่านทุกคอลัมน์ปิดได้')) {
          localStorage.setItem('phrakham.versions', JSON.stringify(ฉ))
          localStorage.setItem('pk-fs', '1')
          localStorage.setItem('phrakham.view', JSON.stringify({ จัดวาง: 'แยกตามข้อ', แสดงเลข: true, ภาษาเดิม: true, ...มุม }))
          sessionStorage.setItem('pk-ด่านทุกคอลัมน์ปิดได้', '1')
        }
      } catch {}
    },
    [ฉ, มุม],
  )
  if (พัง?.ก่อนโหลด) await ctx.addInitScript(พัง.ก่อนโหลด)
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(`${ฐาน}${ทาง}`, { waitUntil: 'domcontentloaded' })
  await แท็บ.waitForFunction(() => document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
  await แท็บ.waitForSelector('[data-ชื่อคำเดิม]', { state: 'attached', timeout: 30000 })
  await รอหน้านิ่ง(แท็บ)
  if (พัง?.css) await แท็บ.addStyleTag({ content: พัง.css })
  if (พัง?.บนหน้า) await แท็บ.evaluate(พัง.บนหน้า)
  await สองเฟรม(แท็บ)
  return { ctx, แท็บ }
}

/** สภาพของหน้าที่ตาเห็น ⇒ × · ข้อฉบับแปล · ก้อนคำ · ที่อยู่ · ปุ่มฟัง · ประโยคเตือน */
const สภาพ = (แท็บ) =>
  แท็บ.evaluate(() => {
    const เห็น = (e) => !!e && e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden'
    const ตัวบท = document.querySelector('.pk-ตัวบท')
    const ก้อน = [...document.querySelectorAll('section.pk-ชั้นคำ')].find(เห็น)
    return {
      ที่อยู่: location.search,
      // ⭐ ใบ #122 ⇒ คอลัมน์สุดท้ายยังเห็น × แต่กดไม่ได้ (`aria-disabled`) ⇒ นับเฉพาะ × ที่กดได้
      ปิดฉบับ: [...document.querySelectorAll('.pk-ช่องหัว[data-ฉบับ] [data-ปุ่ม="ปิดคอลัมน์"]:not([aria-disabled="true"])')].filter(เห็น).map((x) => x.closest('[data-ฉบับ]').dataset.ฉบับ),
      ปิดทุกตัว: [...document.querySelectorAll('[data-ปุ่ม="ปิดคอลัมน์"], [data-ปุ่ม="ปิดคำเดิม"]')].filter((x) => เห็น(x) && x.getAttribute('aria-disabled') !== 'true').length,
      ปิดคำเดิม: [...document.querySelectorAll('[data-ปุ่ม="ปิดคำเดิม"]:not([aria-disabled="true"])')].filter(เห็น).length,
      ข้อแปลที่เห็น: [...document.querySelectorAll('.pk-ตัวบท [data-ข้อ]')].filter(เห็น).length,
      กว้างตัวบท: ตัวบท ? ตัวบท.getBoundingClientRect().width : 0,
      กว้างก้อน: ก้อน ? ก้อน.getBoundingClientRect().width : 0,
      ฟัง: เห็น(document.querySelector('[data-ปุ่ม="ฟัง"]')),
      ไม่มีเสียง: !!document.querySelector('[data-ปุ่ม="ไม่มีเสียง"]'),
      เตือน: [...document.querySelectorAll('.pk-เตือน')].filter(เห็น).map((x) => x.textContent.trim()),
      หัวฉบับ: [...document.querySelectorAll('.pk-ช่องหัว[data-ฉบับ]')].filter(เห็น).map((x) => x.dataset.ฉบับ),
    }
  })

// ⚠️ ใบ #161 ⇒ ตัวอ่านช่องติ๊กในเมนู *เทียบ* (`เมนู` · `พับเมนู`) ถอดพร้อมช่องติ๊ก ⇒ ข้อ ① ② ④ เปลี่ยนตามที่หัวไฟล์บอก

async function ปิดTCV(แท็บ) {
  await แท็บ.locator('.pk-ช่องหัว[data-ฉบับ="TCV"] [data-ปุ่ม="ปิดคอลัมน์"]:not([aria-disabled="true"]):visible').first().click({ timeout: 10000 })
  await แท็บ.waitForFunction(() => !document.querySelector('.pk-ช่องหัว[data-ฉบับ="TCV"]'), null, { timeout: 10000 }).catch(() => {})
  await แท็บ.waitForSelector('section.pk-ชั้นคำ', { state: 'visible', timeout: 15000 }).catch(() => {})
  await รอหน้านิ่ง(แท็บ)
  await สองเฟรม(แท็บ)
}

/** เกณฑ์ข้อ ② ⇒ ใช้ซ้ำหลังปิด TCV ทุกแบบวาง */
function ตรวจเหลือแต่คำเดิม(ส, ชื่อ, ตก) {
  if (ส.ข้อแปลที่เห็น) ตก.push(`② ${ชื่อ} เหลือแต่คำเดิมแล้วยังเห็นข้อของฉบับแปล ${ส.ข้อแปลที่เห็น} ข้อ`)
  if (!ส.กว้างก้อน || ส.กว้างก้อน < ส.กว้างตัวบท * 0.9)
    ตก.push(`② ${ชื่อ} คำเดิมกว้าง ${Math.round(ส.กว้างก้อน)} จุด ⇒ ⛔ เต็มกว้างตัวบท ${Math.round(ส.กว้างตัวบท)} จุด`)
  if (ส.ปิดทุกตัว) ตก.push(`② ${ชื่อ} เหลือคอลัมน์เดียวแล้วยังมี × ที่กดได้ ${ส.ปิดทุกตัว} ปุ่ม`)
  if (ส.เตือน.length) ตก.push(`② ${ชื่อ} มีประโยคเตือน ${JSON.stringify(ส.เตือน)}`)
  if (!/[?&]t=SBLGNT(&|$)/.test(ส.ที่อยู่)) ตก.push(`② ${ชื่อ} ที่อยู่ ${ส.ที่อยู่} ⛔ บอก t=SBLGNT`)
}

async function ตรวจ(พัง = null) {
  const ตก = []
  const ข้อเดียว = พัง?.ข้อ
  const ต้อง = (ข้อ) => !ข้อเดียว || ข้อเดียว === ข้อ

  // ① + ② + ④ + ⑤ ⇒ ไล่ทุกแบบวาง
  const แบบ = [
    { กว้าง: 375, มุม: {}, ชื่อ: 'จอ 375 ซ้ายขวา' },
    { กว้าง: 375, มุม: { วางคอลัมน์: 'บนล่าง' }, ชื่อ: 'จอ 375 บนล่าง' },
    { กว้าง: 375, มุม: { วางคอลัมน์: 'ทีละฉบับ' }, ชื่อ: 'จอ 375 ทีละฉบับ' },
    { กว้าง: 1280, มุม: {}, ชื่อ: 'จอ 1280 แยกตามข้อ' },
    { กว้าง: 1280, มุม: { จัดวาง: 'แยกตามย่อหน้า' }, ชื่อ: 'จอ 1280 แยกตามย่อหน้า' },
    { กว้าง: 1280, มุม: { จัดวาง: 'ไหลต่อเนื่อง' }, ชื่อ: 'จอ 1280 ไหลต่อเนื่อง' },
  ]
  if (['①', '②', '④', '⑤'].some(ต้อง))
    for (const [k, บ] of แบบ.entries()) {
      // ⭐ ของพังที่ไม่ใช่ ② วัดแค่แบบแรกของแต่ละจอ ⇒ ด่านพิสูจน์ ⛔ นานเกิน
      if (ข้อเดียว && ข้อเดียว !== '②' && k !== 0 && k !== 3) continue
      const { ctx, แท็บ } = await เปิด({ กว้าง: บ.กว้าง, มุม: บ.มุม, พัง })
      try {
        const ก่อน = await สภาพ(แท็บ)
        if (ต้อง('①') && !บ.มุม.วางคอลัมน์) {
          if (!ก่อน.ปิดฉบับ.includes('TCV')) ตก.push(`① ${บ.ชื่อ} TCV + คำเดิม ⇒ TCV ⛔ มี ×`)
          if (!ก่อน.ปิดคำเดิม) ตก.push(`① ${บ.ชื่อ} TCV + คำเดิม ⇒ คำเดิม ⛔ มี ×`)
        }
        if (!ก่อน.ปิดฉบับ.includes('TCV')) {
          if (ต้อง('②')) ตก.push(`② ${บ.ชื่อ} ⛔ มี × ของ TCV ให้กด ⇒ ปิดฉบับแปลฉบับสุดท้ายไม่ได้`)
          continue
        }
        await ปิดTCV(แท็บ)
        const หลัง = await สภาพ(แท็บ)
        if (ต้อง('②')) {
          ตรวจเหลือแต่คำเดิม(หลัง, บ.ชื่อ, ตก)
          // ⭐ ใบ #161 ⇒ คอลัมน์สุดท้าย ⇒ ⛔ มี × ให้ปิดจนหน้าว่าง ⇒ ⚠️ ของเดิมตรวจช่องติ๊กคำเดิมที่ติ๊กอยู่ ล็อก และมีเหตุผล
          if (หลัง.ปิดทุกตัว) ตก.push(`② ${บ.ชื่อ} เหลือคำเดิมคอลัมน์เดียว ⇒ ยังมี × ที่กดได้ ${หลัง.ปิดทุกตัว} ปุ่ม ⇒ ปิดแล้วหน้าว่าง`)
        }
        if (ต้อง('④')) {
          if (หลัง.ฟัง || หลัง.ไม่มีเสียง) ตก.push(`④ ${บ.ชื่อ} เหลือแต่คำเดิมแล้วยังมี${หลัง.ฟัง ? 'ปุ่มฟัง' : 'ประโยคยังไม่มีเสียง'}`)
        }
        if (ต้อง('⑤')) {
          await แท็บ.goBack()
          await แท็บ.waitForFunction(() => !!document.querySelector('.pk-ช่องหัว[data-ฉบับ="TCV"]'), null, { timeout: 5000 }).catch(() => {})
          await รอหน้านิ่ง(แท็บ)
          const คืน = await สภาพ(แท็บ)
          if (!คืน.หัวฉบับ.includes('TCV') || !/[?&]t=TCV,SBLGNT(&|$)/.test(คืน.ที่อยู่) || !คืน.ข้อแปลที่เห็น)
            ตก.push(`⑤ ${บ.ชื่อ} กดถอยหลังแล้ว TCV ⛔ กลับมา ⇒ หัว ${JSON.stringify(คืน.หัวฉบับ)} ที่อยู่ ${คืน.ที่อยู่}`)
        }
      } finally {
        await ctx.close()
      }
    }

  // ④ ติ๊ก TCV กลับ ⇒ ปุ่มฟังกลับมา
  if (ต้อง('④')) {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 1280, ทาง: `${ที่อยู่}&t=SBLGNT`, พัง })
    try {
      const ก่อน = await สภาพ(แท็บ)
      if (ก่อน.ฟัง || ก่อน.ไม่มีเสียง) ตก.push('④ ลิงก์ t=SBLGNT ⇒ ยังมีปุ่มฟังหรือประโยคยังไม่มีเสียง')
      // ⭐ ใบ #161 ⇒ เพิ่มคอลัมน์แล้วเลือก TCV ⇒ ⚠️ ของเดิมติ๊กช่อง TCV ในเมนู
      if (!(await เพิ่มคอลัมน์(แท็บ, 'TCV').catch(() => false))) ตก.push('④ เพิ่มคอลัมน์แล้วเลือก TCV ไม่ได้')
      await แท็บ.waitForSelector('[data-ปุ่ม="ฟัง"]', { state: 'visible', timeout: 10000 }).catch(() => {})
      if (!(await สภาพ(แท็บ)).ฟัง) ตก.push('④ เปิด TCV กลับแล้วปุ่มฟัง ⛔ กลับมา')
    } finally {
      await ctx.close()
    }
  }

  // ③ ลิงก์ ⇒ ไปถึงข้อ
  if (ต้อง('③')) {
    for (const กว้าง of [375, 1280]) {
      const { ctx, แท็บ } = await เปิด({ กว้าง, ทาง: '/read/MRK?c=12&v=20&t=SBLGNT', พัง })
      try {
        const ส = await สภาพ(แท็บ)
        if (ส.ข้อแปลที่เห็น || !ส.กว้างก้อน) ตก.push(`③ จอ ${กว้าง} ลิงก์ t=SBLGNT ⇒ ⛔ ได้คำเดิมคอลัมน์เดียว`)
        const ระยะ = await แท็บ.evaluate(() => {
          const แถว = document.querySelector('.pk-ตัวบท [data-ข้อ="12:20"][data-แถว]')?.dataset.แถว
          const คำ = แถว && [...document.querySelectorAll(`.pk-แถวคำ[data-แถว="${แถว}"]`)].find((x) => x.getClientRects().length)
          const ขอบ = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pk-ขอบล่างหนึบ')) || 0
          return คำ ? คำ.getBoundingClientRect().top - ขอบ : null
        })
        if (ระยะ === null || ระยะ < -2 || ระยะ > 48)
          ตก.push(`③ จอ ${กว้าง} ลิงก์ v=20 ⇒ แถวคำเดิมของข้อ 20 ห่างแถบหนึบ ${ระยะ === null ? 'หาไม่เจอ' : Math.round(ระยะ) + ' จุด'} ⛔ อยู่ใต้แถบพอดี`)
      } finally {
        await ctx.close()
      }
    }
    if (!ข้อเดียว) {
      const { ctx, แท็บ } = await เปิด({ กว้าง: 1280, ทาง: '/read/RUT?c=1&t=WLC' })
      try {
        const ส = await สภาพ(แท็บ)
        const ฮีบรู = await แท็บ.evaluate(() => !!document.querySelector('section.pk-ชั้นคำ .pk-กล่องคำ[lang="hbo"], section.pk-ชั้นคำ .pk-กล่องคำ[dir="rtl"]'))
        if (ส.ข้อแปลที่เห็น || !ส.กว้างก้อน || !ฮีบรู || !/[?&]t=WLC(&|$)/.test(ส.ที่อยู่))
          ตก.push(`③ นางรูธ t=WLC ⇒ ⛔ ได้คำฮีบรูคอลัมน์เดียว ${JSON.stringify({ ...ส, ฮีบรู })}`)
      } finally {
        await ctx.close()
      }
    }
  }

  // ⑥ ปิดคำเดิมตอนเป็นคอลัมน์สุดท้ายที่เดียวกับหน้า ⇒ คอลัมน์คนละที่ขึ้นเป็นเจ้าของหน้า
  if (ต้อง('⑥')) {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 1280, ทาง: `${ที่อยู่}&t=SBLGNT&p=MRK.11.LSV`, พัง })
    try {
      const ก่อน = await สภาพ(แท็บ)
      if (!ก่อน.ปิดคำเดิม) ตก.push('⑥ คำเดิม + คอลัมน์คนละที่ ⇒ คำเดิม ⛔ มี ×')
      else {
        await แท็บ.locator('[data-ปุ่ม="ปิดคำเดิม"]:visible').first().click({ timeout: 5000 }).catch(() => {})
        await แท็บ.waitForFunction(() => /[?&]t=LSV/.test(location.search), null, { timeout: 10000 }).catch(() => {})
        await รอหน้านิ่ง(แท็บ)
        const หลัง = await สภาพ(แท็บ)
        if (!/[?&]c=11(&|$)/.test(หลัง.ที่อยู่) || !/[?&]t=LSV(&|$)/.test(หลัง.ที่อยู่) || !หลัง.หัวฉบับ.includes('LSV') || หลัง.เตือน.length)
          ตก.push(`⑥ ปิดคำเดิมแล้ว LSV ⛔ ขึ้นเป็นเจ้าของหน้า ⇒ ${JSON.stringify({ ที่อยู่: หลัง.ที่อยู่, หัว: หลัง.หัวฉบับ, เตือน: หลัง.เตือน })}`)
      }
    } finally {
      await ctx.close()
    }
  }

  // ⑦ ชื่อที่ได้ยิน
  if (ต้อง('⑦')) {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 375, ทาง: `${ที่อยู่}&t=SBLGNT`, พัง })
    try {
      const ชื่อ = await แท็บ.evaluate(() => {
        const หัว = [...document.querySelectorAll('[data-ชื่อคำเดิม]')].find((x) => x.getClientRects().length)
        const ปุ่ม = หัว?.querySelector('[data-ปุ่ม="เปลี่ยนตอน"]')
        const ก้อน = [...document.querySelectorAll('section.pk-ชั้นคำ')].find((x) => x.getClientRects().length)
        return { ปุ่ม: ปุ่ม?.textContent.replace(/\s+/g, ' ').trim() || '', ก้อน: ก้อน?.getAttribute('aria-label') || '' }
      })
      if (!ชื่อ.ปุ่ม.includes('คอลัมน์คำภาษาเดิม') || !ชื่อ.ปุ่ม.includes('มาระโก 12'))
        ตก.push(`⑦ ปุ่มบทบนหัวคำเดิมได้ยินว่า "${ชื่อ.ปุ่ม}" ⛔ บอกคอลัมน์และบท`)
      if (!ชื่อ.ก้อน.includes('คำภาษาเดิม') || !ชื่อ.ก้อน.includes('12')) ตก.push(`⑦ ก้อนคำได้ยินว่า "${ชื่อ.ก้อน}" ⛔ บอกบท`)
    } finally {
      await ctx.close()
    }
  }
  // ⑧ ลิงก์ ⛔ เขียนความชอบ
  if (ต้อง('⑧')) {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 1280, ทาง: `${ที่อยู่}&t=SBLGNT`, มุม: { ภาษาเดิม: false }, พัง })
    try {
      const ส = await สภาพ(แท็บ)
      if (!ส.กว้างก้อน) ตก.push('⑧ ลิงก์ t=SBLGNT ⇒ ⛔ เห็นคำเดิม')
      const จำ = await แท็บ.evaluate(() => {
        try {
          return JSON.parse(localStorage.getItem('phrakham.view') || '{}')
        } catch {
          return {}
        }
      })
      if (จำ.ภาษาเดิม !== false) ตก.push(`⑧ เปิดลิงก์ t=SBLGNT แล้วความชอบในเครื่องเป็น ภาษาเดิม=${จำ.ภาษาเดิม} ⇒ ต้องยังเป็น false (ทาง ข.)`)
      await แท็บ.goto(`${ฐาน}${ที่อยู่}`, { waitUntil: 'domcontentloaded' })
      await แท็บ.waitForFunction(() => document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
      await รอหน้านิ่ง(แท็บ)
      const ใหม่ = await แท็บ.evaluate(() => [...document.querySelectorAll('section.pk-ชั้นคำ, [data-ชื่อคำเดิม]')].some((x) => x.getClientRects().length))
      if (ใหม่) ตก.push('⑧ เปิดลิงก์ t=SBLGNT แล้วเปิดเว็บใหม่โดยไม่มีลิงก์ ⇒ ยังเห็นคำเดิม ⇒ ความชอบถูกเขียนทับ')
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

let รหัสออก = 0
if (ทดสอบตัวเอง) {
  for (const [ชื่อ, พัง] of Object.entries(ของพัง)) {
    const ตก = await ตรวจ(พัง)
    const จับได้ = ตก.some((x) => x.startsWith(พัง.ข้อ))
    console.log(`${จับได้ ? '✅' : '⛔'} ${ชื่อ} (${พัง.ข้อ}) ⇒ ${จับได้ ? 'ยังจับได้' : 'จับไม่ได้'}${จับได้ ? '' : ' ⇒ ' + JSON.stringify(ตก)}`)
    if (!จับได้) รหัสออก = 1
  }
} else {
  const ตก = await ตรวจ()
  for (const x of ตก) console.log(`⛔ ${x}`)
  if (ตก.length) รหัสออก = 1
  else console.log('✅ ทุกคอลัมน์ปิดได้เหมือนกันหมด ⇒ เหลือคำภาษาเดิมคอลัมน์เดียวได้ ⇒ ผ่าน 8 ข้อ')
}
await เบราว์เซอร์.close()
process.exit(รหัสออก)
