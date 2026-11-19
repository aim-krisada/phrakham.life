// ด่านตรวจ — **ปุ่ม *เพิ่มคอลัมน์* แบบ Bible Gateway ⇒ เลือกฉบับบนหัวคอลัมน์ · ฉบับซ้ำได้ · เต็มแล้วบอกใต้ปุ่ม**
//   (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/161 เกณฑ์ข้อ 7 · 8 · 9 ⇒ รวมใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/160)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// > *"เคยใช้ไบเบิลเกตเวย์ มันจะทำง่าย ๆ ว่าเพิ่มอีก 1 ช่อง แล้วก็ให้มีดรอปดาวน์ให้เราเลือกว่าจะเอาเวอร์ชันไหน"* (@krisada 8 พ.ย. 2569)
//
// **ด่านนี้ตรวจ 6 ข้อ ⇒ กดของจริงบนหน้าที่สร้างเสร็จ ⛔ ไม่ได้ดูว่าโค้ดเขียนอะไรไว้**
//   ① **ปุ่มเดียว ชื่อที่ได้ยิน = คำที่ตาเห็น** (เกณฑ์ข้อ 7.1 · 9 ⇒ WCAG 2.2 SC 2.5.3)
//      ⇒ เมนู *เทียบ* มีปุ่ม *เพิ่มคอลัมน์* 1 ปุ่ม ⇒ ⛔ มี `aria-label` ทับ ⇒ ⛔ มีช่องติ๊กฉบับหรือคำภาษาเดิมเหลือ
//      ⇒ จอ 320 · 344 · 375 · 412 · 484 · 768 · 884 · 1280 ⇒ ตัวอักษร 100% กับ 200% ⇒ ปุ่มไม่เล็กกว่า 44 × 44 จุด (SC 2.5.5)
//      ⇒ หน้าไม่เลื่อนซ้ายขวา และเมนูไม่ล้นจอ (SC 1.4.10) ⇒ จอแคบเปิด 2 คอลัมน์ ⇒ ตัวเลือกวาง ซ้ายขวา · บนล่าง · ทีละฉบับ ยังอยู่ในเมนู (7.5)
//   ② **กดแล้วได้คอลัมน์ใหม่ทันที ฉบับและตอนเดียวกับคอลัมน์แรก** (7.2)
//      ⇒ คอลัมน์แรกเป็น LSV (⛔ ใช่ TCV ตั้งต้น) ⇒ คอลัมน์ใหม่ต้องเป็น LSV มาระโก 12 ⇒ ที่อยู่บอกคอลัมน์ใหม่ (`p=MRK.12.LSV`)
//      ⇒ เมนูปิด ⇒ โฟกัสอยู่ที่ช่องเลือกฉบับของคอลัมน์ใหม่ ⇒ จอ 1280 · 375 ซ้ายขวา · 375 ทีละฉบับ (คอลัมน์ใหม่ต้องเป็นคอลัมน์ที่อ่าน)
//   ③ **ช่องเลือกฉบับบนหัวเลือกฉบับที่เปิดอยู่แล้วได้** (7.3)
//      ⇒ ทุกหัวทุกตัวเลือก ⛔ `disabled` ⇒ หัว LSV เลือก TCV ⇒ ได้ TCV 2 คอลัมน์ ⛔ ไม่มีคอลัมน์หาย
//      ⇒ คอลัมน์ใหม่เลือกตัวบทภาษาเดิม ⇒ คอลัมน์คำภาษาเดิมขึ้น ⇒ คอลัมน์ใหม่เลือกฉบับที่ตารางยังไม่มี ⇒ เข้าตารางข้อตรงแถว
//   ④ **เต็มแล้ว ⇒ ปุ่มยังกดได้ ⇒ ข้อความเดิมขึ้นใต้ปุ่มทันที ⇒ โปรแกรมอ่านหน้าจออ่าน** (เกณฑ์ข้อ 8 ⇒ ใบ #160 · SC 4.1.3)
//      ⇒ จอ 375 เปิด 2 คอลัมน์ ⇒ `aria-disabled="true"` ⛔ `disabled` ⇒ โฟกัสได้ ⇒ กดด้วยเมาส์และ Enter
//      ⇒ ข้อความ *จอนี้เปิดได้มากสุด 2 คอลัมน์ ปิดออก 1 คอลัมน์ก่อนเปิดเพิ่ม* ในกล่อง `role="status"` ใต้ปุ่ม ⇒ กดซ้ำแล้วใส่ใหม่ (อ่านซ้ำ)
//      ⇒ ⛔ คอลัมน์เพิ่ม ⛔ คอลัมน์เก่าถูกปิดให้เอง ⛔ กล่องเด้งใหม่ ⇒ จอพับ 707 เปิด 3 ⇒ ข้อความบอก 3 · เปิด 2 ⇒ ยังไม่เต็ม
//   ⑤ **ลิงก์เก่าและที่ผู้อ่านจำไว้ยังเปิดได้ครบ** (7.6)
//      ⇒ ลิงก์ 4 คอลัมน์ (ตาราง 2 · ตอนอื่น 2) ⇒ ลิงก์เก่าฉบับเดียวกัน 3 คอลัมน์ ⇒ ครบทุกคอลัมน์
//      ⇒ `phrakham.versions` กับ `phrakham.view` ในเครื่อง ⇒ ฉบับกับการวางกลับมาเหมือนเดิม
//      ⇒ คอลัมน์ตอนอื่นที่ที่อยู่ไม่บอกฉบับ ⇒ คอลัมน์แรกเปลี่ยนฉบับ ⇒ คอลัมน์นั้นยังเป็นฉบับเดิม (ตรึง ⇒ ใบ #131 ข้อ 9.7)
//   ⑥ **ฉบับเดียวกัน 2–3 คอลัมน์ ⇒ แต่ละคอลัมน์เลือกข้อ แชร์ และมีที่อยู่ของตัวเอง** (ข้อ 8 ของคนจ่ายงาน ⇒ ใบ #148 · #159)
//      ⇒ TCV ที่เดียวกัน 2 คอลัมน์ + TCV คนละบท 1 คอลัมน์ ⇒ แตะข้อในคอลัมน์หนึ่ง ⇒ อีกคอลัมน์ ⛔ ถูกเลือก
//      ⇒ ลิงก์ที่แชร์บอกลำดับซ้ำ (`12.5.TCV~1` · `12.6.TCV~2` · `13.2.TCV~3`) ⇒ เปิดลิงก์นั้นได้เส้นใต้ตรงคอลัมน์เดิม
//      ⇒ ลิงก์ที่ไม่มีฉบับซ้ำ ⛔ มี `~` (เหมือนก่อนใบนี้ทุกตัวอักษร) ⇒ ลิงก์เก่า `s=12.5.TCV` ⇒ ทุกคอลัมน์ TCV เหมือนก่อนใบนี้
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านปุ่มเพิ่มคอลัมน์.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง [--ชุด=1|2]
//
//   ⇒ ยัดของพังทีละชิ้น (รายชื่ออยู่ที่ `ของพัง`) ⇒ แต่ละชิ้นต้องทำให้ข้อของมันแดง ⇒ แบ่ง 2 ชุดให้แต่ละงานไม่ชนเพดาน 10 นาที
//
//   node tools/ด่านปุ่มเพิ่มคอลัมน์.mjs <ที่อยู่เว็บ>
//
// ⛔ **ไม่รอเป็นเวลาตายตัว** ⇒ ทุกการรอคือรอสภาพของหน้า ⇒ `รอหน้านิ่ง` ตัวกลางของ `tools/หน้าที่ตรวจ.mjs`

import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { เส้นทางเว็บ, รอโค้ดของเว็บติด, รอหน้านิ่ง, ปุ่มเทียบของหน้า, ชื่อปุ่มเพิ่มคอลัมน์, ข้อความเต็มของ } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const ชุด = Number((process.argv.find((x) => x.startsWith('--ชุด=')) || '').split('=')[1] || 0)

// ⭐ ถ้อยคำที่อนุมัติ ⇒ อ่านจากไฟล์ของเว็บ แล้วเทียบกับที่จดไว้ในด่าน ⇒ ใครแก้ที่ไฟล์โดยไม่ผ่าน G · N · @krisada ⇒ ด่านแดง
const ไฟล์ถ้อยคำ = readFileSync(fileURLToPath(new URL('../app/utils/ถ้อยคำเมนูเทียบ.ts', import.meta.url)), 'utf8')
const คำในไฟล์ = /\n\s*เพิ่มคอลัมน์: '([^']*)'/.exec(ไฟล์ถ้อยคำ)?.[1]

const บทสั้น = '/read/3JN?c=1'
const จอทั้งหมด = [320, 344, 375, 412, 484, 768, 884, 1280]
const จอพับ = { width: 707, height: 724 }

/**
 * ⭐⭐ **ของพัง ⇒ ยัดเข้าหน้าทีละชิ้น ⇒ ⛔ ไม่แตะโค้ดของเว็บ** ⇒ `ก่อนโหลด` วิ่งก่อนโค้ดของเว็บ · `css` ยัดหลังหน้าพร้อม
 *   ⇒ `ชุด` ⇒ งานไหนใน CI (1 หรือ 2) ⇒ ทั้งหมดในเครื่องราว 8 นาที ⇒ แบ่งให้แต่ละงานไม่ชนเพดาน 10 นาที
 */
const ของพัง = {
  // ① ปุ่มหาย ⇒ เมนูไม่มีทางเพิ่มคอลัมน์
  ปุ่มหาย: { ข้อ: '①', ชุด: 1, css: '[data-ปุ่ม="เพิ่มคอลัมน์"] { display: none !important; }' },
  // ① ชื่อที่ได้ยินไม่ตรงคำที่ตาเห็น ⇒ ร่างแรกของ G ที่ N ค้านเรื่อง SC 2.5.3
  ชื่อผิด: {
    ข้อ: '①',
    ชุด: 1,
    ก่อนโหลด: () =>
      new MutationObserver(() => {
        const x = document.querySelector('[data-ปุ่ม="เพิ่มคอลัมน์"]')
        if (x && !x.hasAttribute('aria-label')) x.setAttribute('aria-label', 'เปิดฉบับเดียวกันอีกคอลัมน์')
      }).observe(document, { childList: true, subtree: true }),
  },
  // ① ช่องติ๊กฉบับกลับมา ⇒ 2 ทางทำเรื่องเดียวกัน (แบบก่อนใบนี้)
  ช่องติ๊กกลับมา: {
    ข้อ: '①',
    ชุด: 1,
    ก่อนโหลด: () =>
      new MutationObserver(() => {
        const ม = document.getElementById('pk-แผงเทียบ')
        if (ม && !ม.querySelector('[data-ของพัง]')) {
          const ป = document.createElement('label')
          ป.dataset.ของพัง = '1'
          ป.className = 'pk-ช่องติ๊ก'
          ป.innerHTML = '<input type="checkbox" data-ช่อง="ฉบับ" data-ฉบับ="LSV"><span>LSV</span>'
          ม.appendChild(ป)
        }
      }).observe(document, { childList: true, subtree: true }),
  },
  // ① ปุ่มเล็กกว่า 44 จุด
  ปุ่มเล็ก: { ข้อ: '①', ชุด: 1, css: '[data-ปุ่ม="เพิ่มคอลัมน์"] { min-height: 24px !important; height: 24px !important; min-width: 24px !important; padding: 0 2px !important; font-size: 11px !important; }' },
  // ② กดแล้วไม่มีอะไรเกิด
  ไม่เพิ่ม: {
    ข้อ: '②',
    ชุด: 1,
    ก่อนโหลด: () =>
      window.addEventListener('click', (e) => e.target?.closest?.('[data-ปุ่ม="เพิ่มคอลัมน์"]') && e.stopImmediatePropagation(), true),
  },
  // ② คอลัมน์ใหม่ได้ฉบับตั้งต้น ⛔ ใช่ฉบับของคอลัมน์แรก
  ฉบับผิด: {
    ข้อ: '②',
    ชุด: 1,
    ก่อนโหลด: () =>
      window.addEventListener(
        'click',
        (e) => {
          if (!e.target?.closest?.('[data-ปุ่ม="เพิ่มคอลัมน์"]')) return
          // ⭐ รอจนช่องเลือกฉบับของคอลัมน์ใหม่โผล่จริง ⛔ ไม่ใช้ setTimeout ตายตัว
          //   ⇒ เดิมรอ 50 มิลลิวินาที ⇒ บน runner-dell (18 พ.ย. 2569) จับได้ราว 1 ใน 3 รอบ ⇒ ด่านคู่แดงทั้งที่ด่านจริงไม่บอด
          //   ⇒ ยัดทันทีที่ช่องโผล่ ⇒ ด่านแดงที่ข้อ ② ทุกรอบ (ในเครื่อง 3/3 · runner-dell ดูคำขอรวม)
          const เลือก = 'section.pk-ตอนเทียบ .pk-ช่องเลือกฉบับ, .pk-หัวคู่ .pk-ช่องเลือกฉบับ, .pk-หัวเงา .pk-ช่องเลือกฉบับ'
          const ก่อน = document.querySelectorAll(เลือก).length
          const เริ่ม = Date.now()
          const ลอง = () => {
            const ทั้งหมด = [...document.querySelectorAll(เลือก)]
            const ช่อง = ทั้งหมด.length > ก่อน ? ทั้งหมด.at(-1) : null
            if (ช่อง) {
              ช่อง.value = 'THKJV'
              ช่อง.dispatchEvent(new Event('change', { bubbles: true }))
            } else if (Date.now() - เริ่ม < 5000) requestAnimationFrame(ลอง)
          }
          requestAnimationFrame(ลอง)
        },
        true,
      ),
  },
  // ② คอลัมน์ใหม่ได้ตอนอื่น ⇒ ที่อยู่ถูกเขียนเป็นบทก่อนหน้า แล้วหน้าอ่านตาม
  ตอนผิด: {
    ข้อ: '②',
    ชุด: 1,
    ก่อนโหลด: () => {
      for (const ชื่อ of ['pushState', 'replaceState']) {
        const เดิม = History.prototype[ชื่อ]
        History.prototype[ชื่อ] = function (st, t, u) {
          if (typeof u === 'string' && /[?&]p=MRK\.12\./.test(u)) {
            เดิม.call(this, st, t, u.replace(/([?&]p=MRK\.)12\./, '$111.'))
            setTimeout(() => window.dispatchEvent(new PopStateEvent('popstate')))
            return
          }
          return เดิม.call(this, st, t, u)
        }
      }
    },
  },
  // ③ ฉบับที่คอลัมน์อื่นเปิดอยู่ล็อกในตัวเลือก (แบบก่อนใบนี้ ⇒ ใบ #131 ข้อ 9.7 ทาง ก.)
  ห้ามซ้ำ: {
    ข้อ: '③',
    ชุด: 2,
    ก่อนโหลด: () =>
      new MutationObserver(() => {
        const ใช้ = new Set([...document.querySelectorAll('.pk-ช่องเลือกฉบับ')].map((s) => s.value))
        for (const s of document.querySelectorAll('.pk-ช่องเลือกฉบับ'))
          for (const o of s.options) if (o.value !== s.value && ใช้.has(o.value) && !o.disabled) o.disabled = true
      }).observe(document, { childList: true, subtree: true, attributes: true }),
  },
  // ④ ใช้ `disabled` ⇒ หลุดจากลำดับ Tab และกดแล้วเงียบ
  ใช้disabled: {
    ข้อ: '④',
    ชุด: 2,
    ก่อนโหลด: () =>
      new MutationObserver(() => {
        const x = document.querySelector('[data-ปุ่ม="เพิ่มคอลัมน์"][aria-disabled="true"]')
        if (x && !x.disabled) x.disabled = true
      }).observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-disabled'] }),
  },
  // ④ ข้อความขึ้นแต่โปรแกรมอ่านหน้าจอไม่อ่าน ⇒ กล่องไม่ใช่ `role="status"`
  ไม่ประกาศ: {
    ข้อ: '④',
    ชุด: 2,
    ก่อนโหลด: () =>
      new MutationObserver(() => {
        const x = document.getElementById('pk-เหตุเพดานจอแคบ')
        if (x?.getAttribute('role')) x.removeAttribute('role')
      }).observe(document, { childList: true, subtree: true, attributes: true }),
  },
  // ④ กดตอนเต็มแล้วเงียบ ⇒ ข้อความไม่ขึ้น (ของที่ใบ #160 ทัก)
  กดแล้วเงียบ: { ข้อ: '④', ชุด: 2, css: '#pk-เหตุเพดานจอแคบ { display: none !important; }' },
  // ④ ปิดคอลัมน์เก่าให้เองแล้วเปิดคอลัมน์ใหม่
  ปิดให้เอง: {
    ข้อ: '④',
    ชุด: 2,
    ก่อนโหลด: () =>
      window.addEventListener(
        'click',
        (e) => {
          const ปุ่ม = e.target?.closest?.('[data-ปุ่ม="เพิ่มคอลัมน์"]')
          if (!ปุ่ม || ปุ่ม.getAttribute('aria-disabled') !== 'true') return
          const ปิด = [...document.querySelectorAll('[data-ปุ่ม="ปิดคอลัมน์"]')].at(-1)
          ปิด?.click()
        },
        true,
      ),
  },
  // ⑤ ลิงก์เก่าเสียคอลัมน์ ⇒ ตัด `p` ทิ้งก่อนหน้าอ่านที่อยู่
  ลิงก์เก่าเสียคอลัมน์: {
    ข้อ: '⑤',
    ชุด: 2,
    ก่อนโหลด: () => {
      if (/[?&]p=/.test(location.search))
        history.replaceState(null, '', location.href.replace(/([?&])p=[^&#]*&?/, '$1').replace(/[?&]$/, ''))
    },
  },
  // ⑤ ฉบับที่ผู้อ่านจำไว้ไม่กลับมา
  ไม่จำฉบับ: {
    ข้อ: '⑤',
    ชุด: 2,
    ก่อนโหลด: () => {
      const เดิม = Storage.prototype.getItem
      Storage.prototype.getItem = function (k) {
        return k === 'phrakham.versions' ? null : เดิม.call(this, k)
      }
    },
  },
  // ⑥ 2 คอลัมน์ฉบับเดียวกันใช้กุญแจเดียวกัน ⇒ แตะคอลัมน์หนึ่งแล้วอีกคอลัมน์ถูกเลือกด้วย (แบบก่อนใบนี้)
  กุญแจเดียวกัน: {
    ข้อ: '⑥',
    ชุด: 2,
    ก่อนโหลด: () =>
      new MutationObserver(() => {
        for (const x of document.querySelectorAll('[data-เลือกซ้ำ]')) x.removeAttribute('data-เลือกซ้ำ')
      }).observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-เลือกซ้ำ'] }),
  },
}

/** ตัวรับแทนเมนูแชร์กับคลิปบอร์ด ⇒ ท่าเดียวกับ `tools/ด่านเลือกข้อคอลัมน์คนละตอน.mjs` */
function ตัวรับแทน() {
  window.__ส่งออก = []
  Object.defineProperty(navigator, 'share', {
    configurable: true,
    get: () => async (ของ) => {
      window.__ส่งออก.push(ของ.text || '')
    },
  })
  Object.defineProperty(navigator, 'canShare', { configurable: true, get: () => undefined })
  const คลิป = { writeText: async (t) => window.__ส่งออก.push(t) }
  Object.defineProperty(navigator, 'clipboard', { configurable: true, get: () => คลิป })
}

const เบราว์เซอร์ = await chromium.launch()

/** เปิดหน้าในเครื่องใหม่ ⇒ `ฉบับ` · `มุม` ⇒ ความชอบในเครื่อง (`phrakham.versions` · `phrakham.view`) · `ขั้น` ⇒ ขนาดตัวอักษร (`pk-fs`) */
async function เปิด(ทาง, { กว้าง = 1280, สูง = 900, ฉบับ = null, มุม = null, ขั้น = null, พัง = null } = {}) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: สูง } })
  await ctx.addInitScript(
    ([ฉ, ม, ข]) => {
      try {
        if (!sessionStorage.getItem('pk-ด่าน161')) {
          if (ฉ) localStorage.setItem('phrakham.versions', JSON.stringify(ฉ))
          if (ม) localStorage.setItem('phrakham.view', JSON.stringify(ม))
          if (ข) localStorage.setItem('pk-fs', String(ข))
          sessionStorage.setItem('pk-ด่าน161', '1')
        }
      } catch {}
    },
    [ฉบับ, มุม, ขั้น],
  )
  await ctx.addInitScript(ตัวรับแทน)
  if (พัง?.ก่อนโหลด) await ctx.addInitScript(พัง.ก่อนโหลด)
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(`${ฐาน}${ทาง}`, { waitUntil: 'domcontentloaded' })
  await รอโค้ดของเว็บติด(แท็บ)
  await แท็บ.waitForSelector('.pk-หัวคอลัมน์ .pk-หัวช่อง', { timeout: 30000 })
  await รอหน้านิ่ง(แท็บ)
  if (พัง?.css) await แท็บ.addStyleTag({ content: พัง.css })
  return { ctx, แท็บ }
}

/** สภาพของหน้า ⇒ คอลัมน์ในตาราง · คอลัมน์ตอนอื่น (ฉบับ|ตอนที่หูได้ยิน) · คำภาษาเดิม · ที่อยู่ */
const สภาพ = (แท็บ) =>
  แท็บ.evaluate(() => ({
    // ⭐ ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/164 ⇒ ฉบับซ้ำที่อยู่ที่เดียวกับคอลัมน์แรกวาดเป็นช่องในตาราง (`pk-หัวเงา`)
    //   ⇒ ยังเป็นคอลัมน์ตอนอื่นใน `p=` ⇒ นับเป็น `เทียบ` ตามลำดับของมัน (`data-เทียบ`) ⇒ เกณฑ์ทุกข้อเท่าเดิม ⇒ เปลี่ยนแค่ที่หาหัว
    ตาราง: [...document.querySelectorAll('.pk-หัวคอลัมน์ .pk-ช่องหัว[data-ฉบับ]:not(.pk-หัวเงา) .pk-ช่องเลือกฉบับ')].map((s) => s.value),
    เทียบ: [...document.querySelectorAll('section.pk-ตอนเทียบ .pk-หัวช่อง, .pk-หัวคู่, .pk-หัวเงา')]
      .sort((a, b) => Number(a.closest('[data-เทียบ]')?.getAttribute('data-เทียบ')) - Number(b.closest('[data-เทียบ]')?.getAttribute('data-เทียบ')))
      .map(
      (h) => `${h.querySelector('.pk-ช่องเลือกฉบับ')?.value}|${(h.querySelector('.pk-ที่ของช่อง')?.textContent || '').trim()}`,
    ),
    คำเดิม: !!document.querySelector('.pk-คอลัมน์.pk-มีชั้นคำ'),
    ที่อยู่: location.pathname + location.search,
    ป้ายแรก: (document.querySelector('.pk-หัวคอลัมน์ .pk-ช่องหัว .pk-ที่ของช่อง')?.textContent || '').trim(),
  }))
const นับคอลัมน์ = (ส) => ส.ตาราง.length + ส.เทียบ.length + (ส.คำเดิม ? 1 : 0)
const รอจน = (แท็บ, ฟ, ค่า, รอ = 10000) =>
  แท็บ
    .waitForFunction(ฟ, ค่า, { timeout: รอ })
    .then(() => true)
    .catch(() => false)

async function กางเมนู(แท็บ) {
  const ปุ่ม = ปุ่มเทียบของหน้า(แท็บ)
  if ((await ปุ่ม.getAttribute('aria-expanded')) !== 'true') await ปุ่ม.click()
  await แท็บ.waitForSelector('#pk-แผงเทียบ', { timeout: 15000 })
}
const ปุ่มเพิ่ม = (แท็บ) => แท็บ.locator('#pk-แผงเทียบ [data-ปุ่ม="เพิ่มคอลัมน์"]')

// ==================================================================== ① ปุ่มเดียว ชื่อตรงคำที่ตาเห็น · ทุกจอ
async function ตรวจ1(พัง) {
  const ตก = []
  if (คำในไฟล์ !== ชื่อปุ่มเพิ่มคอลัมน์)
    ตก.push(`① ถ้อยคำในไฟล์ “${คำในไฟล์}” ⛔ ตรงกับที่ @krisada อนุมัติ “${ชื่อปุ่มเพิ่มคอลัมน์}” (ใบ #161 ข้อ 9)`)
  for (const กว้าง of จอทั้งหมด)
    for (const ขั้น of [1, 2]) {
      // ⭐ ของพังวัดจอ 375 ตัวอักษร 100% จอเดียว ⇒ ⛔ นานเกิน
      if (พัง && (กว้าง !== 375 || ขั้น !== 1)) continue
      const ป้าย = `① จอ ${กว้าง} ตัวอักษร ${ขั้น * 100}%`
      const { ctx, แท็บ } = await เปิด(`${บทสั้น}&t=TCV,THKJV`, { กว้าง, สูง: กว้าง < 768 ? 800 : 900, ขั้น, พัง })
      try {
        await กางเมนู(แท็บ)
        const ม = await แท็บ.evaluate((ชื่อ) => {
          const แผง = document.getElementById('pk-แผงเทียบ')
          const ปุ่ม = [...แผง.querySelectorAll('button')].filter((b) => b.getClientRects().length && b.textContent.trim() === ชื่อ)
          const ร = ปุ่ม[0]?.getBoundingClientRect()
          const de = document.documentElement
          const ร_แผง = แผง.getBoundingClientRect()
          return {
            ปุ่ม: ปุ่ม.length,
            ทับชื่อ: ปุ่ม.some((b) => b.hasAttribute('aria-label') || b.hasAttribute('aria-labelledby')),
            กว้าง: ร ? Math.round(ร.width * 10) / 10 : 0,
            สูง: ร ? Math.round(ร.height * 10) / 10 : 0,
            ช่องติ๊ก: แผง.querySelectorAll('input[type="checkbox"]').length,
            วาง: [...แผง.querySelectorAll('input[type="radio"][name="วางคอลัมน์"]')].map((x) => x.closest('label')?.textContent.trim()),
            ล้นหน้า: Math.round(de.scrollWidth - de.clientWidth),
            ล้นแผง: Math.round(Math.max(0, ร_แผง.right - de.clientWidth, -ร_แผง.left, แผง.scrollWidth - แผง.clientWidth)),
            ปุ่มล้น: ร ? Math.round(Math.max(0, ร.right - Math.min(de.clientWidth, ร_แผง.right))) : 0,
          }
        }, ชื่อปุ่มเพิ่มคอลัมน์)
        // ⭐ ชื่อที่ได้ยินจากต้นไม้การเข้าถึงของเบราว์เซอร์ ⇒ ต้องตรงคำที่ตาเห็นทุกตัวอักษร
        const ได้ยิน = await แท็บ.locator('#pk-แผงเทียบ').getByRole('button', { name: ชื่อปุ่มเพิ่มคอลัมน์, exact: true }).count()
        if (ม.ปุ่ม !== 1 || ได้ยิน !== 1)
          ตก.push(`${ป้าย} ⇒ ปุ่มที่ตาเห็นคำว่า “${ชื่อปุ่มเพิ่มคอลัมน์}” ${ม.ปุ่ม} ปุ่ม · ได้ยินชื่อนี้ตรงตัว ${ได้ยิน} ปุ่ม ⇒ ต้องมี 1 ปุ่ม ชื่อที่ได้ยินตรงคำที่ตาเห็น (SC 2.5.3)`)
        if (ม.ทับชื่อ) ตก.push(`${ป้าย} ⇒ ปุ่มเพิ่มคอลัมน์มี aria-label ทับคำที่ตาเห็น ⇒ ⛔ ห้าม (SC 2.5.3)`)
        if (ม.ปุ่ม && (ม.กว้าง < 44 || ม.สูง < 44)) ตก.push(`${ป้าย} ⇒ ปุ่มเพิ่มคอลัมน์ ${ม.กว้าง}×${ม.สูง} ⇒ ต้องไม่เล็กกว่า 44 × 44 จุด (SC 2.5.5)`)
        if (ม.ช่องติ๊ก) ตก.push(`${ป้าย} ⇒ เมนูเทียบยังมีช่องติ๊ก ${ม.ช่องติ๊ก} ช่อง ⇒ ต้องเหลือปุ่มเพิ่มคอลัมน์ทางเดียว (ใบ #161 ข้อ 7.1)`)
        if (ม.ล้นหน้า > 0) ตก.push(`${ป้าย} ⇒ หน้าเลื่อนซ้ายขวาได้ ${ม.ล้นหน้า} จุด (SC 1.4.10)`)
        if (ม.ล้นแผง > 0 || ม.ปุ่มล้น > 0) ตก.push(`${ป้าย} ⇒ เมนูเทียบหรือปุ่มล้นจอ ${ม.ล้นแผง || ม.ปุ่มล้น} จุด (SC 1.4.10)`)
        if (กว้าง < 768 && JSON.stringify(ม.วาง) !== JSON.stringify(['ซ้ายขวา', 'บนล่าง', 'ทีละฉบับ']))
          ตก.push(`${ป้าย} ⇒ ตัวเลือกวางคอลัมน์ในเมนูเป็น ${JSON.stringify(ม.วาง)} ⇒ ต้องยังมี ซ้ายขวา · บนล่าง · ทีละฉบับ (ใบ #161 ข้อ 7.5)`)
      } catch (e) {
        ตก.push(`${ป้าย} ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
      } finally {
        await ctx.close()
      }
    }
  return ตก
}

// ==================================================================== ② กดแล้วได้คอลัมน์ใหม่ ฉบับและตอนเดียวกับคอลัมน์แรก
async function ตรวจ2(พัง) {
  const ตก = []
  const แบบ = [
    { ชื่อ: 'จอ 1280', กว้าง: 1280, มุม: null },
    { ชื่อ: 'จอ 375 ซ้ายขวา', กว้าง: 375, มุม: { วางคอลัมน์: 'ซ้ายขวา' } },
    { ชื่อ: 'จอ 375 ทีละฉบับ', กว้าง: 375, มุม: { วางคอลัมน์: 'ทีละฉบับ' } },
  ]
  for (const บ of แบบ) {
    if (พัง && บ.กว้าง !== 1280) continue
    const ป้าย = `② ${บ.ชื่อ}`
    // ⭐ คอลัมน์แรกเป็น LSV ⇒ ⛔ ใช่ TCV ตั้งต้น ⇒ คอลัมน์ใหม่ที่ได้ TCV แปลว่าไม่ได้ลอกคอลัมน์แรก
    const { ctx, แท็บ } = await เปิด('/read/MRK?c=12&t=LSV', { กว้าง: บ.กว้าง, สูง: บ.กว้าง < 768 ? 812 : 900, มุม: บ.มุม, พัง })
    try {
      const ก่อน = await สภาพ(แท็บ)
      await กางเมนู(แท็บ)
      await ปุ่มเพิ่ม(แท็บ).click()
      const เพิ่ม = await รอจน(แท็บ, (n) => document.querySelectorAll('section.pk-ตอนเทียบ .pk-หัวช่อง, .pk-หัวคู่, .pk-หัวเงา').length > n, ก่อน.เทียบ.length, 5000)
      await รอหน้านิ่ง(แท็บ)
      const หลัง = await สภาพ(แท็บ)
      if (!เพิ่ม || นับคอลัมน์(หลัง) !== นับคอลัมน์(ก่อน) + 1) {
        ตก.push(`${ป้าย} ⇒ กดเพิ่มคอลัมน์แล้วได้ ${นับคอลัมน์(หลัง)} คอลัมน์ ⇒ ต้องได้คอลัมน์ใหม่ทันที (${นับคอลัมน์(ก่อน) + 1})`)
        continue
      }
      const ใหม่ = หลัง.เทียบ.at(-1) || ''
      if (ใหม่ !== `LSV|${ก่อน.ป้ายแรก}`)
        ตก.push(`${ป้าย} ⇒ คอลัมน์ใหม่เป็น “${ใหม่}” ⇒ ต้องเป็นฉบับและตอนเดียวกับคอลัมน์แรก “LSV|${ก่อน.ป้ายแรก}” (ใบ #161 ข้อ 7.2)`)
      if (!/[?&]p=MRK\.12\.LSV(&|$|,)/.test(หลัง.ที่อยู่))
        ตก.push(`${ป้าย} ⇒ ที่อยู่ ${หลัง.ที่อยู่} ⛔ บอกคอลัมน์ใหม่ MRK.12.LSV ⇒ คัดลอกลิงก์ไปเปิดแล้วคอลัมน์หาย`)
      const ส = await แท็บ.evaluate(() => {
        const ฟ = document.activeElement
        const ใน = ฟ?.closest('section.pk-ตอนเทียบ, .pk-หัวคู่, .pk-หัวเงา')
        const ทั้งหมด = [...document.querySelectorAll('section.pk-ตอนเทียบ, .pk-หัวคู่, .pk-หัวเงา')].sort(
          (a, b) => Number(a.getAttribute('data-เทียบ')) - Number(b.getAttribute('data-เทียบ')),
        )
        return {
          เมนู: !!document.getElementById('pk-แผงเทียบ'),
          โฟกัสช่อง: !!ฟ?.matches?.('select.pk-ช่องเลือกฉบับ'),
          ของใหม่: !!ใน && ใน === ทั้งหมด.at(-1),
          เห็น: !!ฟ && ฟ.getClientRects().length > 0,
        }
      })
      if (ส.เมนู) ตก.push(`${ป้าย} ⇒ กดแล้วเมนูเทียบยังกางบังคอลัมน์ใหม่`)
      if (!ส.โฟกัสช่อง || !ส.ของใหม่ || !ส.เห็น)
        ตก.push(`${ป้าย} ⇒ โฟกัสไม่อยู่ที่ช่องเลือกฉบับของคอลัมน์ใหม่ที่ตาเห็น ${JSON.stringify(ส)} ⇒ ขั้นถัดไปคือเลือกฉบับ (SC 2.4.3)`)
    } catch (e) {
      ตก.push(`${ป้าย} ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

// ==================================================================== ③ เลือกฉบับซ้ำได้ · คำภาษาเดิมเลือกที่หัว · ฉบับที่ตารางยังไม่มีเข้าตาราง
async function ตรวจ3(พัง) {
  const ตก = []
  const { ctx, แท็บ } = await เปิด('/read/MRK?c=12&t=TCV,LSV&p=MRK.13.WEB', { พัง })
  try {
    const ล็อก = await แท็บ.evaluate(() =>
      [...document.querySelectorAll('.pk-ช่องเลือกฉบับ')].flatMap((s) => [...s.options].filter((o) => o.disabled).map((o) => `${s.value}:${o.value}`)),
    )
    if (ล็อก.length) ตก.push(`③ ตัวเลือกฉบับบนหัวล็อก ${ล็อก.join(' · ')} ⇒ ต้องเลือกฉบับที่คอลัมน์อื่นเปิดอยู่ได้ทุกหัว (ใบ #161 ข้อ 7.3)`)
    // ③ก หัว LSV ในตารางเลือก TCV ⇒ TCV 2 คอลัมน์ ⇒ ⛔ มีคอลัมน์หาย
    const ก่อน = await สภาพ(แท็บ)
    await แท็บ.locator('.pk-หัวคอลัมน์ .pk-ช่องหัว[data-ฉบับ="LSV"] .pk-ช่องเลือกฉบับ').selectOption('TCV', { timeout: 5000 })
    await รอจน(แท็บ, (ก) => location.search !== ก, ก่อน.ที่อยู่.slice(ก่อน.ที่อยู่.indexOf('?')))
    await รอหน้านิ่ง(แท็บ)
    const หลัง = await สภาพ(แท็บ)
    const ฉบับทั้งหมด = [...หลัง.ตาราง, ...หลัง.เทียบ.map((x) => x.split('|')[0])]
    if (นับคอลัมน์(หลัง) !== นับคอลัมน์(ก่อน) || ฉบับทั้งหมด.filter((x) => x === 'TCV').length !== 2 || !ฉบับทั้งหมด.includes('WEB'))
      ตก.push(`③ หัว LSV เลือก TCV ⇒ ได้ ${JSON.stringify({ ตาราง: หลัง.ตาราง, เทียบ: หลัง.เทียบ })} ⇒ ต้องได้ TCV 2 คอลัมน์ และ WEB อยู่ครบ ⛔ ไม่มีคอลัมน์หาย`)
    // ③ข คอลัมน์ที่ซ้ำเลือกตัวบทภาษาเดิม ⇒ คอลัมน์คำภาษาเดิมขึ้น (เลือกได้ที่หัวคอลัมน์ ⇒ ข้อ 7.3)
    const หัวซ้ำ = แท็บ.locator('.pk-หัวเงา .pk-ช่องเลือกฉบับ, section.pk-ตอนเทียบ .pk-ช่องเลือกฉบับ').first()
    const ตัวบท = await หัวซ้ำ.evaluate((s) => [...s.options].map((o) => o.value).find((v) => v === 'SBLGNT' || v === 'WLC') || '')
    if (!ตัวบท) ตก.push('③ ช่องเลือกฉบับบนหัว ⛔ มีตัวบทภาษาเดิมให้เลือก')
    else {
      await หัวซ้ำ.selectOption(ตัวบท)
      const ขึ้น = await รอจน(แท็บ, () => !!document.querySelector('.pk-ชั้นคำ .pk-คำ'), null, 20000)
      if (!ขึ้น) ตก.push(`③ คอลัมน์ใหม่เลือก ${ตัวบท} ⇒ คอลัมน์คำภาษาเดิม ⛔ ขึ้น`)
    }
    // ③ค กดเพิ่มคอลัมน์ ⇒ เลือกฉบับที่ตารางยังไม่มี ⇒ เข้าตาราง ⇒ ข้อตรงแถว (หน้าเดียวกับติ๊กฉบับแบบเดิม)
    await กางเมนู(แท็บ)
    await ปุ่มเพิ่ม(แท็บ).click()
    const ช่อง = แท็บ.locator('select.pk-ช่องเลือกฉบับ:focus')
    await ช่อง.waitFor({ timeout: 10000 })
    await ช่อง.selectOption('THKJV')
    await รอจน(แท็บ, () => !!document.querySelector('.pk-หัวคอลัมน์ .pk-ช่องหัว[data-ฉบับ="THKJV"]'), null)
    await รอหน้านิ่ง(แท็บ)
    const ท้าย = await สภาพ(แท็บ)
    if (!ท้าย.ตาราง.includes('THKJV') || ท้าย.เทียบ.some((x) => x.startsWith('THKJV|')))
      ตก.push(`③ คอลัมน์ใหม่เลือก THKJV ⇒ ได้ ${JSON.stringify({ ตาราง: ท้าย.ตาราง, เทียบ: ท้าย.เทียบ })} ⇒ ต้องเข้าตารางข้อตรงแถว`)
    const ฟ = await แท็บ.evaluate(() => document.activeElement?.closest?.('.pk-ช่องหัว')?.getAttribute('data-ฉบับ') || document.activeElement?.tagName)
    if (ฟ !== 'THKJV') ตก.push(`③ คอลัมน์ใหม่เข้าตารางแล้วโฟกัสไปอยู่ที่ ${ฟ} ⇒ ต้องตามไปที่ช่องเลือกฉบับของหัว THKJV (SC 2.4.3)`)
  } catch (e) {
    ตก.push(`③ ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ตก
}

// ==================================================================== ④ เต็มแล้ว ⇒ aria-disabled ⇒ ข้อความใต้ปุ่มในกล่อง role=status
const อ่านปุ่มกับข้อความ = (แท็บ) =>
  แท็บ.evaluate(() => {
    const ปุ่ม = document.querySelector('#pk-แผงเทียบ [data-ปุ่ม="เพิ่มคอลัมน์"]')
    const x = document.getElementById('pk-เหตุเพดานจอแคบ')
    const ร = x?.getBoundingClientRect()
    const บ = ปุ่ม?.getBoundingClientRect()
    const เห็น = !!x && x.getClientRects().length > 0 && getComputedStyle(x).visibility !== 'hidden'
    return {
      ปุ่ม: !!ปุ่ม,
      ล็อก: ปุ่ม?.getAttribute('aria-disabled') === 'true',
      ปิดใช้: !!ปุ่ม?.hasAttribute('disabled'),
      โฟกัสได้: !!ปุ่ม && !ปุ่ม.disabled && ปุ่ม.tabIndex >= 0,
      ข้อความ: เห็น ? (x.innerText || '').replace(/\s+/g, ' ').trim() : '',
      ประกาศ: !!x?.closest('[role="status"], [aria-live="polite"], [aria-live="assertive"]'),
      ใต้ปุ่ม: !!ร && !!บ && ร.top >= บ.bottom - 1 && ร.top - บ.bottom < 48 && ร.left < บ.right && ร.right > บ.left,
      กล่อง: document.querySelectorAll('[role="dialog"], [role="alertdialog"], dialog[open]').length,
    }
  })
async function ตรวจเต็ม(แท็บ, ป้าย, เพดาน, ตก) {
  const ก่อน = await สภาพ(แท็บ)
  await กางเมนู(แท็บ)
  const ป = await อ่านปุ่มกับข้อความ(แท็บ)
  if (!ป.ปุ่ม) return void ตก.push(`${ป้าย} ⇒ เมนูเทียบ ⛔ มีปุ่มเพิ่มคอลัมน์`)
  if (!ป.ล็อก) ตก.push(`${ป้าย} ⇒ เปิดครบ ${เพดาน} คอลัมน์แล้วปุ่มเพิ่มคอลัมน์ ⛔ มี aria-disabled="true"`)
  if (ป.ปิดใช้ || !ป.โฟกัสได้) ตก.push(`${ป้าย} ⇒ ปุ่มเพิ่มคอลัมน์ใช้ disabled หรือโฟกัสไม่ได้ ⇒ ต้องยังกดได้ (aria-disabled ⛔ disabled ⇒ ใบ #161 ข้อ 8)`)
  if (ป.ข้อความ) ตก.push(`${ป้าย} ⇒ ข้อความตอนเต็มขึ้นก่อนกด “${ป.ข้อความ}” ⇒ ขึ้นเมื่อกดเท่านั้น`)
  // ⭐ นับว่ากล่องถูกเขียนข้อความกี่ครั้ง ⇒ กดซ้ำต้องเขียนใหม่ ⇒ โปรแกรมอ่านหน้าจออ่านซ้ำทุกครั้งที่กด
  await แท็บ.evaluate(() => {
    window.__เขียนข้อความ = 0
    const x = document.getElementById('pk-เหตุเพดานจอแคบ')
    if (x)
      new MutationObserver(() => {
        if (x.textContent.trim()) window.__เขียนข้อความ++
      }).observe(x, { childList: true, characterData: true, subtree: true })
  })
  const กล่องก่อน = ป.กล่อง
  const ปุ่ม = ปุ่มเพิ่ม(แท็บ)
  // ⭐ `force` ⇒ Playwright ถือว่าปุ่ม aria-disabled กดไม่ได้ ⇒ ผู้อ่านจริงยังกดได้ ⇒ ต้องลองกดจริง
  await ปุ่ม.click({ force: true })
  await รอจน(แท็บ, (t) => document.getElementById('pk-เหตุเพดานจอแคบ')?.textContent.trim() === t, ข้อความเต็มของ(เพดาน), 3000)
  const ข = await อ่านปุ่มกับข้อความ(แท็บ)
  if (ข.ข้อความ !== ข้อความเต็มของ(เพดาน))
    ตก.push(`${ป้าย} ⇒ กดตอนเต็มแล้วข้อความที่ตาเห็น “${ข.ข้อความ}” ⇒ ต้องเป็น “${ข้อความเต็มของ(เพดาน)}” ทันที`)
  if (!ข.ประกาศ) ตก.push(`${ป้าย} ⇒ ข้อความตอนเต็ม ⛔ อยู่ในกล่อง role="status" ⇒ โปรแกรมอ่านหน้าจอไม่อ่านทันที (SC 4.1.3)`)
  if (ข.ข้อความ && !ข.ใต้ปุ่ม) ตก.push(`${ป้าย} ⇒ ข้อความตอนเต็ม ⛔ อยู่ใต้ปุ่มเพิ่มคอลัมน์`)
  if (ข.กล่อง > กล่องก่อน) ตก.push(`${ป้าย} ⇒ กดตอนเต็มแล้วมีกล่องเด้งเพิ่ม ${ข.กล่อง - กล่องก่อน} กล่อง ⇒ ⛔ กล่องเด้งกลางจอ`)
  // ⭐ กดซ้ำด้วยแป้นพิมพ์ ⇒ ข้อความยังอยู่ ⇒ ถูกเขียนใหม่ ⇒ อ่านซ้ำ
  await ปุ่ม.focus()
  await แท็บ.keyboard.press('Enter')
  await รอจน(แท็บ, () => window.__เขียนข้อความ >= 2, null, 3000)
  const ซ้ำ = await แท็บ.evaluate(() => window.__เขียนข้อความ)
  if (ซ้ำ < 2) ตก.push(`${ป้าย} ⇒ กดซ้ำด้วย Enter แล้วกล่องข้อความ ⛔ ถูกเขียนใหม่ (${ซ้ำ} ครั้ง) ⇒ โปรแกรมอ่านหน้าจอเงียบในการกดครั้งที่ 2`)
  await รอหน้านิ่ง(แท็บ)
  const หลัง = await สภาพ(แท็บ)
  if (นับคอลัมน์(หลัง) !== นับคอลัมน์(ก่อน) || หลัง.ที่อยู่ !== ก่อน.ที่อยู่ || JSON.stringify(หลัง.ตาราง) !== JSON.stringify(ก่อน.ตาราง))
    ตก.push(`${ป้าย} ⇒ กดตอนเต็มแล้วหน้าเปลี่ยน ${JSON.stringify({ ก่อน: ก่อน.ที่อยู่, หลัง: หลัง.ที่อยู่ })} ⇒ ⛔ เพิ่มคอลัมน์ ⛔ ปิดคอลัมน์เก่าให้เอง`)
}
async function ตรวจ4(พัง) {
  const ตก = []
  const ชุดเต็ม = [
    { ชื่อ: 'จอ 375 เปิด 2 ฉบับ', ทาง: `${บทสั้น}&t=TCV,THKJV`, จอ: { width: 375, height: 812 }, เพดาน: 2 },
    { ชื่อ: 'จอ 412 ฉบับ + ฉบับเดียวกันคนละตอน', ทาง: `${บทสั้น}&t=TCV&p=2JN.1.TCV`, จอ: { width: 412, height: 915 }, เพดาน: 2 },
    { ชื่อ: `จอพับ ${จอพับ.width} เปิด 3 ฉบับ`, ทาง: `${บทสั้น}&t=TCV,THKJV,WEB`, จอ: จอพับ, เพดาน: 3 },
  ]
  for (const ช of ชุดเต็ม) {
    if (พัง && ช.เพดาน !== 2) continue
    const ป้าย = `④ ${ช.ชื่อ}`
    const { ctx, แท็บ } = await เปิด(ช.ทาง, { กว้าง: ช.จอ.width, สูง: ช.จอ.height, พัง })
    try {
      const ส = await สภาพ(แท็บ)
      if (นับคอลัมน์(ส) !== ช.เพดาน) ตก.push(`${ป้าย} ⇒ เปิดได้ ${นับคอลัมน์(ส)} คอลัมน์ ⇒ ชุดทดสอบต้องเป็น ${ช.เพดาน}`)
      else await ตรวจเต็ม(แท็บ, ป้าย, ช.เพดาน, ตก)
    } catch (e) {
      ตก.push(`${ป้าย} ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  // ④ ยังไม่เต็ม ⇒ ⛔ aria-disabled ⇒ ข้อความ ⛔ ขึ้น ⇒ จอพับเปิด 2 · จอ 1280 เปิด 4
  if (!พัง)
    for (const [ป้าย, ทาง, จอ] of [
      [`④ จอพับ ${จอพับ.width} เปิด 2 ฉบับ`, `${บทสั้น}&t=TCV,THKJV`, จอพับ],
      ['④ จอ 1280 เปิด 4 คอลัมน์', `${บทสั้น}&t=TCV,THKJV&p=2JN.1.WEB,JUD.1.TCV`, { width: 1280, height: 900 }],
    ]) {
      const { ctx, แท็บ } = await เปิด(ทาง, { กว้าง: จอ.width, สูง: จอ.height })
      try {
        await กางเมนู(แท็บ)
        const ป = await อ่านปุ่มกับข้อความ(แท็บ)
        if (ป.ล็อก || ป.ข้อความ) ตก.push(`${ป้าย} ⇒ ยังไม่เต็มแต่ปุ่มเพิ่มคอลัมน์บอกว่าเต็ม ${JSON.stringify(ป)}`)
      } catch (e) {
        ตก.push(`${ป้าย} ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
      } finally {
        await ctx.close()
      }
    }
  return ตก
}

// ==================================================================== ⑤ ลิงก์เก่าและที่ผู้อ่านจำไว้
async function ตรวจ5(พัง) {
  const ตก = []
  const ลิงก์ = [
    {
      ชื่อ: 'ลิงก์ 4 คอลัมน์ ตาราง 2 · ตอนอื่น 2 (จอ 768)',
      ทาง: `${บทสั้น}&t=TCV,THKJV&p=2JN.1.WEB,JUD.1.LSV`,
      กว้าง: 768,
      ต้อง: { ตาราง: ['TCV', 'THKJV'], เทียบ: ['WEB', 'LSV'] },
    },
    {
      ชื่อ: 'ลิงก์เก่าฉบับเดียวกัน 3 คอลัมน์ (จอ 1280)',
      ทาง: '/read/MRK?c=12&t=TCV&p=MRK.12.TCV,MRK.13.TCV',
      กว้าง: 1280,
      ต้อง: { ตาราง: ['TCV'], เทียบ: ['TCV', 'TCV'] },
    },
  ]
  for (const ล of ลิงก์) {
    const ป้าย = `⑤ ${ล.ชื่อ}`
    const { ctx, แท็บ } = await เปิด(ล.ทาง, { กว้าง: ล.กว้าง, พัง })
    try {
      const ส = await สภาพ(แท็บ)
      const ได้ = { ตาราง: ส.ตาราง, เทียบ: ส.เทียบ.map((x) => x.split('|')[0]) }
      if (JSON.stringify(ได้) !== JSON.stringify(ล.ต้อง)) ตก.push(`${ป้าย} ⇒ ได้ ${JSON.stringify(ได้)} ⇒ ต้องได้ครบ ${JSON.stringify(ล.ต้อง)} ⛔ ไม่มีคอลัมน์หายเงียบ ๆ`)
    } catch (e) {
      ตก.push(`${ป้าย} ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  // ⑤ ที่ผู้อ่านจำไว้ในเครื่อง ⇒ ไม่มี `t` ในที่อยู่ ⇒ ฉบับกับการวางกลับมา
  {
    const ป้าย = '⑤ จอ 375 ความชอบในเครื่อง TCV · LSV · บนล่าง'
    const { ctx, แท็บ } = await เปิด('/read/MRK?c=12', { กว้าง: 375, สูง: 812, ฉบับ: ['TCV', 'LSV'], มุม: { วางคอลัมน์: 'บนล่าง' }, พัง })
    try {
      const ส = await สภาพ(แท็บ)
      if (JSON.stringify(ส.ตาราง) !== JSON.stringify(['TCV', 'LSV'])) ตก.push(`${ป้าย} ⇒ ตารางเป็น ${ส.ตาราง.join(' · ')} ⇒ ต้องได้ TCV · LSV ที่จำไว้`)
      await กางเมนู(แท็บ)
      const วาง = await แท็บ.locator('#pk-แผงเทียบ input[type="radio"][name="วางคอลัมน์"]:checked').evaluate((x) => x.closest('label').textContent.trim()).catch(() => '')
      if (วาง !== 'บนล่าง') ตก.push(`${ป้าย} ⇒ ตัวเลือกวางที่ติ๊กอยู่คือ “${วาง}” ⇒ ต้องเป็น บนล่าง ที่จำไว้`)
    } catch (e) {
      ตก.push(`${ป้าย} ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  // ⑤ ตรึงฉบับ ⇒ คอลัมน์ตอนอื่นที่ที่อยู่ไม่บอกฉบับ ⇒ คอลัมน์แรกเปลี่ยนฉบับ ⇒ คอลัมน์นั้นยังเป็น TCV ⇒ ที่อยู่บอก TCV
  if (!พัง) {
    const ป้าย = '⑤ ตรึงฉบับของคอลัมน์ตอนอื่น'
    const { ctx, แท็บ } = await เปิด(`${บทสั้น}&t=TCV,THKJV&p=2JN.1`, { กว้าง: 1280 })
    try {
      const ก่อน = await สภาพ(แท็บ)
      await แท็บ.locator('.pk-หัวคอลัมน์ .pk-ช่องหัว .pk-ช่องเลือกฉบับ').first().selectOption('LSV')
      await รอจน(แท็บ, (ก) => location.search !== ก, ก่อน.ที่อยู่.slice(ก่อน.ที่อยู่.indexOf('?')))
      await รอหน้านิ่ง(แท็บ)
      const หลัง = await สภาพ(แท็บ)
      if (JSON.stringify(หลัง.เทียบ.map((x) => x.split('|')[0])) !== '["TCV"]' || !/p=2JN\.1\.TCV/.test(หลัง.ที่อยู่))
        ตก.push(`${ป้าย} ⇒ คอลัมน์แรกเปลี่ยนเป็น LSV ⇒ คอลัมน์ตอนอื่นเป็น ${หลัง.เทียบ.join(' · ')} ${หลัง.ที่อยู่} ⇒ ต้องยังเป็น TCV และที่อยู่บอก TCV`)
    } catch (e) {
      ตก.push(`${ป้าย} ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

// ==================================================================== ⑥ ฉบับซ้ำ ⇒ เลือกข้อ แชร์ และที่อยู่แยกคอลัมน์
/** กล่องข้อ ⇒ `ช่อง` 0 = ตาราง · 1 ขึ้นไป = คอลัมน์ตอนอื่นลำดับที่ ช่อง−1 */
/** ⭐ ใบ #164 ⇒ ของในคอลัมน์ตอนอื่นลำดับ i ⇒ กล่องของมัน หรือช่องของมันในตาราง (`data-เงา`) เมื่อเป็นฉบับซ้ำที่อยู่ที่เดียวกับคอลัมน์แรก */
const ในคอลัมน์เทียบ = (i, ของ) =>
  `section.pk-ตอนเทียบ[data-เทียบ="${i}"] ${ของ}, .pk-ตัวบท ${ของ}[data-เงา="${i}"], .pk-ตัวบท [data-เงา="${i}"] ${ของ}`
function กล่องข้อ(แท็บ, ช่อง, k) {
  return ช่อง === 0
    ? แท็บ.locator(`.pk-ตัวบท .pk-ข้อ[data-ข้อ="${k}"] .pk-ช่องฉบับ[data-ฉบับ="TCV"][data-เลือกข้อ], .pk-ตัวบท [data-เลือกข้อ="${k}"][data-เลือกฉบับ="TCV"]:not([data-เลือกเล่ม])`).first()
    : แท็บ.locator(ในคอลัมน์เทียบ(ช่อง - 1, `[data-เลือกข้อ="${k}"]`)).first()
}
const กด = async (ที่) => (await ที่.getAttribute('aria-pressed').catch(() => null)) === 'true'
async function แตะ(ที่) {
  await ที่.scrollIntoViewIfNeeded()
  await ที่.click()
}
async function ตรวจ6(พัง) {
  const ตก = []
  const ทาง = '/read/MRK?c=12&t=TCV&p=MRK.12.TCV,MRK.13.TCV'
  let ลิงก์ = ''
  {
    const { ctx, แท็บ } = await เปิด(ทาง, { พัง })
    try {
      await แท็บ.waitForSelector(ในคอลัมน์เทียบ(1, '[data-เลือกข้อ="13:2"]'), { timeout: 20000 })
      await แตะ(กล่องข้อ(แท็บ, 0, '12:5'))
      if (!(await กด(กล่องข้อ(แท็บ, 0, '12:5')))) ตก.push('⑥ แตะ 12:5 ในตาราง ⇒ ⛔ ถูกเลือก')
      if (await กด(กล่องข้อ(แท็บ, 1, '12:5'))) ตก.push('⑥ แตะ 12:5 ในตาราง ⇒ คอลัมน์ TCV ตัวที่ 2 (ที่เดียวกัน) ถูกเลือกไปด้วย ⇒ แต่ละคอลัมน์ต้องเลือกแยกกัน')
      await แตะ(กล่องข้อ(แท็บ, 1, '12:6'))
      if (!(await กด(กล่องข้อ(แท็บ, 1, '12:6')))) ตก.push('⑥ แตะ 12:6 ในคอลัมน์ TCV ตัวที่ 2 ⇒ ⛔ ถูกเลือก')
      if (await กด(กล่องข้อ(แท็บ, 0, '12:6'))) ตก.push('⑥ แตะ 12:6 ในคอลัมน์ TCV ตัวที่ 2 ⇒ ตารางถูกเลือกไปด้วย')
      await แตะ(กล่องข้อ(แท็บ, 2, '13:2'))
      if (!(await กด(กล่องข้อ(แท็บ, 2, '13:2')))) ตก.push('⑥ แตะ 13:2 ในคอลัมน์ TCV คนละบท ⇒ ⛔ ถูกเลือก')
      const ก่อน = await แท็บ.evaluate(() => window.__ส่งออก.length)
      await แท็บ.locator('[data-ปุ่ม="แชร์"]').click()
      await รอจน(แท็บ, (n) => window.__ส่งออก.length > n, ก่อน, 8000)
      const ข้อความ = await แท็บ.evaluate(() => window.__ส่งออก.at(-1) || '')
      ลิงก์ = (ข้อความ.match(/https?:\/\/\S+/g) || []).at(-1) || ''
      const q = new URL(ลิงก์ || 'http://x/').searchParams
      const s = (q.get('s') || '').split(',')
      for (const ท่อน of ['12.5.TCV~1', '12.6.TCV~2', '13.2.TCV~3'])
        if (!s.includes(ท่อน)) ตก.push(`⑥ ลิงก์ที่แชร์ s=${q.get('s')} ⛔ มี ${ท่อน} ⇒ คอลัมน์ฉบับเดียวกันต้องมีที่อยู่ของตัวเอง`)
      if (!/MRK\.12\.TCV/.test(q.get('p') || '') || !/MRK\.13\.TCV/.test(q.get('p') || ''))
        ตก.push(`⑥ ลิงก์ที่แชร์ p=${q.get('p')} ⛔ พกคอลัมน์ TCV ที่มีข้อถูกเลือกครบ`)
      // ⭐ ข้อความที่ส่ง ⇒ ข้อเดียวกันเลือก 2 คอลัมน์ฉบับเดียวกัน ⇒ ส่งครั้งเดียว ⇒ ที่นี่ 3 ข้อต่างกัน ⇒ ตัวบทของ 13:2 อยู่ในข้อความ
      if (!/13:2/.test(ข้อความ)) ตก.push('⑥ ข้อความที่ส่ง ⛔ มีอ้างอิง 13:2 ของคอลัมน์ TCV คนละบท')
    } catch (e) {
      ตก.push(`⑥ ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  // ⑥ เปิดลิงก์ที่แชร์ ⇒ เส้นใต้อยู่ที่คอลัมน์เดิมทุกชิ้น
  if (ลิงก์) {
    const { ctx, แท็บ } = await เปิด(ลิงก์.slice(ลิงก์.indexOf('/read/')), { พัง })
    try {
      await แท็บ.waitForSelector(ในคอลัมน์เทียบ(1, '[data-เลือกข้อ]'), { timeout: 20000 })
      const ได้ = {
        ตาราง125: await กด(กล่องข้อ(แท็บ, 0, '12:5')),
        ซ้ำ125: await กด(กล่องข้อ(แท็บ, 1, '12:5')),
        ซ้ำ126: await กด(กล่องข้อ(แท็บ, 1, '12:6')),
        คนละบท132: await กด(กล่องข้อ(แท็บ, 2, '13:2')),
      }
      if (!ได้.ตาราง125 || ได้.ซ้ำ125 || !ได้.ซ้ำ126 || !ได้.คนละบท132)
        ตก.push(`⑥ เปิดลิงก์ที่แชร์ ⇒ ${JSON.stringify(ได้)} ⇒ เส้นใต้ต้องอยู่ตรงคอลัมน์ที่คนส่งเลือก`)
    } catch (e) {
      ตก.push(`⑥ เปิดลิงก์ที่แชร์ ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  // ⑥ ลิงก์เก่า (ไม่มี `~`) ⇒ ทุกคอลัมน์ TCV ของเล่มนั้นเหมือนก่อนใบนี้
  {
    const { ctx, แท็บ } = await เปิด('/read/MRK?c=12&t=TCV&p=MRK.12.TCV&s=12.5.TCV', { พัง })
    try {
      await แท็บ.waitForSelector(ในคอลัมน์เทียบ(0, '[data-เลือกข้อ="12:5"]'), { timeout: 20000 })
      const ได้ = { ตาราง: await กด(กล่องข้อ(แท็บ, 0, '12:5')), ซ้ำ: await กด(กล่องข้อ(แท็บ, 1, '12:5')) }
      if (!ได้.ตาราง || !ได้.ซ้ำ) ตก.push(`⑥ ลิงก์เก่า s=12.5.TCV ⇒ ${JSON.stringify(ได้)} ⇒ ต้องขีดเส้นใต้ทุกคอลัมน์ TCV เหมือนก่อนใบ #161`)
    } catch (e) {
      ตก.push(`⑥ ลิงก์เก่า ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  // ⑥ ไม่มีฉบับซ้ำ ⇒ ลิงก์เหมือนก่อนใบนี้ทุกตัวอักษร ⇒ ⛔ มี `~`
  if (!พัง) {
    const { ctx, แท็บ } = await เปิด('/read/MRK?c=12&t=TCV,LSV')
    try {
      await แตะ(แท็บ.locator('.pk-ตัวบท .pk-ข้อ[data-ข้อ="12:5"] .pk-ช่องฉบับ[data-ฉบับ="TCV"]').first())
      await แตะ(แท็บ.locator('.pk-ตัวบท .pk-ข้อ[data-ข้อ="12:5"] .pk-ช่องฉบับ[data-ฉบับ="LSV"]').first())
      const ก่อน = await แท็บ.evaluate(() => window.__ส่งออก.length)
      await แท็บ.locator('[data-ปุ่ม="แชร์"]').click()
      await รอจน(แท็บ, (n) => window.__ส่งออก.length > n, ก่อน, 8000)
      const ล = ((await แท็บ.evaluate(() => window.__ส่งออก.at(-1) || '')).match(/https?:\/\/\S+/g) || []).at(-1) || ''
      const s = new URL(ล || 'http://x/').searchParams.get('s')
      if (s !== '12.5.TCV,12.5.LSV') ตก.push(`⑥ ไม่มีฉบับซ้ำ ⇒ ลิงก์ s=${s} ⇒ ต้องเหมือนก่อนใบ #161 ทุกตัวอักษร (12.5.TCV,12.5.LSV)`)
    } catch (e) {
      ตก.push(`⑥ ไม่มีฉบับซ้ำ ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

const ตัวตรวจ = { '①': ตรวจ1, '②': ตรวจ2, '③': ตรวจ3, '④': ตรวจ4, '⑤': ตรวจ5, '⑥': ตรวจ6 }

if (ทดสอบตัวเอง) {
  const ตาบอด = []
  const ทั้งหมด = Object.entries(ของพัง).filter(([, พ]) => !ชุด || พ.ชุด === ชุด)
  for (const [ชื่อ, พัง] of ทั้งหมด) {
    const ตก = await ตัวตรวจ[พัง.ข้อ](พัง)
    const จับ = ตก.filter((x) => x.startsWith(พัง.ข้อ) && !/ล้มระหว่างตรวจ/.test(x))
    if (จับ.length) console.log(`  ✅ ${ชื่อ} ⇒ ${จับ[0]}`)
    else ตาบอด.push(`${ชื่อ} ⇒ ข้อ ${พัง.ข้อ} ⛔ ไม่แดง${ตก.length ? ` (เจอแต่ ⇒ ${ตก[0]})` : ''}`)
  }
  await เบราว์เซอร์.close()
  if (ตาบอด.length) {
    console.error('⛔ โหมดพิสูจน์: ยัดของพังแล้ว **ด่านยังเขียว** ⇒ ด่านตาบอด:')
    for (const x of ตาบอด) console.error('  - ' + x)
    process.exit(1)
  }
  console.log(`✅ โหมดพิสูจน์${ชุด ? ` ชุด ${ชุด}` : ''}: ด่านปุ่มเพิ่มคอลัมน์จับของพังได้ครบ ${ทั้งหมด.length} ชิ้น`)
  process.exit(0)
}

let พลาด = false
for (const [ข้อ, ตรวจ] of Object.entries(ตัวตรวจ)) {
  const ตก = await ตรวจ(null)
  console.log(`${ตก.length ? '⛔' : '✅'} ข้อ ${ข้อ}`)
  for (const x of ตก) console.error(`   - ${x}`)
  if (ตก.length) พลาด = true
}
await เบราว์เซอร์.close()
if (พลาด) process.exit(1)
console.log('✅ ด่านปุ่มเพิ่มคอลัมน์ผ่านครบ 6 ข้อ')
