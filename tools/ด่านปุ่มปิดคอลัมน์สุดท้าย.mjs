// ด่านตรวจ — **คอลัมน์สุดท้าย ⇒ × ยังอยู่ที่เดิม ขนาดเดิม แต่กดไม่ได้ พร้อมบอกเหตุผล** (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/122)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// ## ทำไมต้องมี
//
// พี่เอมใช้จริง 27 ต.ค. 2569 ที่ 3 ยอห์น 1 ⇒ *"เวลาลบคอลัมน์แรก (TCV) แล้ว คอลัมน์สองลบไม่ได้"*
//   ⇒ ของเดิม (ใบ #102 ข้อ 1.2) ⇒ เหลือคอลัมน์เดียว × หายไปเฉย ๆ ⇒ ผู้อ่านไม่รู้ว่าทำไม
//   ⇒ ตอนนี้ ⇒ × อยู่ที่เดิมแต่กดไม่ได้ (`aria-disabled`) ⇒ กดแล้วบอกเหตุผล ⇒ เหตุผลของทุกข้ออยู่หัวไฟล์ `app/components/หัวคอลัมน์.vue`
//
// ## ตรวจ 4 ข้อ ⇒ กดปุ่มจริง วัดของที่วาดออกมาจริง
//   ① 🔴 **คอลัมน์เดียว ⇒ × ยังเห็น กดไม่ได้ แต่รับโฟกัส** (เกณฑ์ข้อ 5 · 5.1 · 7) ⇒ จอ 1280 · 375 · 320 ตัวอักษร 200%
//      ⇒ `aria-disabled="true"` ⛔ `disabled` ⇒ โฟกัสได้ ⇒ ไม่เล็กกว่า 44 × 44 จุด ⇒ หน้า ⛔ เลื่อนข้าง
//      ⇒ หน้าตาต่างจากปุ่มที่กดได้ด้วยเงา ⛔ สีอย่างเดียว (SC 1.4.1) ⇒ ปุ่มที่กดได้มีเงา · × ที่กดไม่ได้ ⛔ มี (หน้าตาปุ่มกลาง ใบ #141)
//      ⇒ `aria-describedby` ชี้ไปที่เหตุผล ⇒ ถ้อยคำตรงกับ `app/utils/ถ้อยคำหัวคอลัมน์.ts` ทุกตัวอักษร (เกณฑ์ข้อ 5.2)
//   ② 🔴 **กด × ⇒ เหตุผลขึ้นที่ตาเห็นและหูได้ยิน ⇒ หัว ⛔ สูงขึ้น ⇒ ⛔ มีอะไรหาย** (เกณฑ์ข้อ 5.2 · 5.3 · 5.4)
//      ⇒ กล่องเหตุผลเห็น · อยู่ในจอห่างขอบไม่น้อยกว่า 16 จุด · กล่อง `role="status"` ได้ถ้อยคำเดียวกัน
//      ⇒ หัวสูงเท่าก่อนกด · ยังมี 1 คอลัมน์ · ที่อยู่เดิม · ตัวบทยังอยู่
//   ③ 🔴 **กล่องเหตุผลปิดได้** ⇒ Escape · แตะที่อื่น
//   ④ 🔴 **เพิ่มคอลัมน์ ⇒ × ทุกหัวกดได้ทันที** (เกณฑ์ข้อ 6) ⇒ ⛔ `aria-disabled` · มีเงาเหมือนปุ่มอื่น ⇒ ปิดกลับเหลือหนึ่ง ⇒ × กดไม่ได้อีก
//
// ## รอให้หน้าพร้อมจริง ⛔ ไม่รอเป็นเวลาตายตัว (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/108) ⇒ `รอหน้านิ่ง` · `waitForFunction`
//
// ## วิธีพิสูจน์ว่าด่านนี้แดงได้จริง ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านปุ่มปิดคอลัมน์สุดท้าย.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพังทีละชิ้น ⇒ แต่ละชิ้นต้องทำให้ข้อของมันแดง
//     ① **ของเดิมก่อนใบนี้** ⇒ × หายเมื่อเหลือคอลัมน์เดียว · `disabled` จริง (หลุดโฟกัส) · ต่างแค่สี · ไม่มีเหตุผลให้หู
//     ② กดแล้วไม่มีอะไรขึ้น · เหตุผลไปอยู่ในหัวจนหัวสูงขึ้น
//     ③ Escape ปิดกล่องไม่ได้
//     ④ เพิ่มคอลัมน์แล้ว × ยังกดไม่ได้
//
//   node tools/ด่านปุ่มปิดคอลัมน์สุดท้าย.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { เส้นทางเว็บ, รอหน้านิ่ง, เพิ่มคอลัมน์ } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
// ⭐ บทที่พี่เอมเจอ (3 ยอห์น 1)
const ที่อยู่ = '/read/3JN?c=1'

// ⭐ ถ้อยคำอ่านจากไฟล์ถ้อยคำที่เดียว ⇒ เปลี่ยนถ้อยคำ ⛔ ต้องแก้ด่าน
const เหตุ = readFileSync(new URL('../app/utils/ถ้อยคำหัวคอลัมน์.ts', import.meta.url), 'utf8').match(/เหตุปิดไม่ได้:\s*'([^']+)'/)?.[1]
if (!เหตุ) {
  console.log('⛔ หา `เหตุปิดไม่ได้` ใน app/utils/ถ้อยคำหัวคอลัมน์.ts ไม่เจอ')
  process.exit(1)
}

const ปุ่มปิด = '.pk-หัวช่อง [data-ปุ่ม="ปิดคอลัมน์"]'

/** ของพังที่ยัดในโหมดพิสูจน์ ⇒ ⛔ ไม่แตะโค้ดของเว็บ ⇒ `css` · `บนหน้า` ยัดตอนหน้าพร้อม · `ก่อนโหลด` ยัดก่อนโค้ดของเว็บ */
const ของพัง = {
  ซ่อนแบบเดิม: { ข้อ: '①', css: `${ปุ่มปิด}[aria-disabled="true"] { display: none !important; }` },
  ปิดจริง: {
    ข้อ: '①',
    บนหน้า: () => {
      const ทำ = () => document.querySelectorAll('[data-ปุ่ม="ปิดคอลัมน์"][aria-disabled="true"]').forEach((b) => b.setAttribute('disabled', ''))
      ทำ()
      new MutationObserver(ทำ).observe(document.body, { subtree: true, childList: true, attributes: true })
    },
  },
  ต่างแค่สี: { ข้อ: '①', css: `${ปุ่มปิด}[aria-disabled="true"] { box-shadow: var(--pk-เงาปุ่ม) !important; }` },
  หูไม่ได้ยินเหตุผล: {
    ข้อ: '①',
    บนหน้า: () => {
      const ทำ = () => document.querySelectorAll('[data-ปุ่ม="ปิดคอลัมน์"][aria-describedby]').forEach((b) => b.removeAttribute('aria-describedby'))
      ทำ()
      new MutationObserver(ทำ).observe(document.body, { subtree: true, childList: true, attributes: true })
    },
  },
  กดแล้วเงียบ: {
    ข้อ: '②',
    บนหน้า: () =>
      document.addEventListener(
        'click',
        (e) => {
          if (e.target.closest?.('[data-ปุ่ม="ปิดคอลัมน์"]')) e.stopImmediatePropagation()
        },
        true,
      ),
  },
  เหตุผลดันหัว: {
    ข้อ: '②',
    บนหน้า: () =>
      document.addEventListener(
        'click',
        (e) => {
          const b = e.target.closest?.('[data-ปุ่ม="ปิดคอลัมน์"][aria-disabled="true"]')
          if (!b) return
          const p = document.createElement('p')
          p.textContent = 'ต้องเปิดไว้อย่างน้อย 1 คอลัมน์'
          b.closest('.pk-หัวช่อง').append(p)
        },
        true,
      ),
  },
  Escapeไม่ปิด: {
    ข้อ: '③',
    ก่อนโหลด: () =>
      window.addEventListener(
        'keydown',
        (e) => {
          if (e.key === 'Escape') e.stopImmediatePropagation()
        },
        true,
      ),
  },
  สองคอลัมน์ยังล็อก: {
    ข้อ: '④',
    บนหน้า: () => {
      const ทำ = () =>
        document.querySelectorAll('[data-ปุ่ม="ปิดคอลัมน์"]:not([aria-disabled])').forEach((b) => b.setAttribute('aria-disabled', 'true'))
      ทำ()
      new MutationObserver(ทำ).observe(document.body, { subtree: true, childList: true, attributes: true })
    },
  },
}

const เบราว์เซอร์ = await chromium.launch()

async function เปิด({ กว้าง, ใหญ่ = false, พัง }) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: 800 } })
  await ctx.addInitScript(
    ([ใ]) => {
      try {
        if (!sessionStorage.getItem('pk-ด่าน122')) {
          localStorage.setItem('phrakham.versions', JSON.stringify(['TCV']))
          if (ใ) localStorage.setItem('pk-fs', '2')
          sessionStorage.setItem('pk-ด่าน122', '1')
        }
      } catch {}
    },
    [ใหญ่],
  )
  if (พัง?.ก่อนโหลด) await ctx.addInitScript(พัง.ก่อนโหลด)
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(`${ฐาน}${ที่อยู่}`, { waitUntil: 'domcontentloaded' })
  await แท็บ.waitForFunction(() => document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
  await แท็บ.waitForSelector('.pk-หัวคอลัมน์ .pk-หัวช่อง', { timeout: 30000 })
  await รอหน้านิ่ง(แท็บ)
  if (พัง?.css) await แท็บ.addStyleTag({ content: พัง.css })
  if (พัง?.บนหน้า) await แท็บ.evaluate(พัง.บนหน้า)
  await แท็บ.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
  return { ctx, แท็บ }
}

/** สภาพของ × ทุกตัวที่ตาเห็น + หัว + กล่องเหตุผล */
const สภาพ = (แท็บ) =>
  แท็บ.evaluate((ปุ่มปิด) => {
    const เห็น = (e) => !!e && e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none'
    const ปุ่ม = [...document.querySelectorAll(ปุ่มปิด)].filter(เห็น)
    const ตอน = document.querySelector('.pk-หัวช่อง .pk-ปุ่มตอน')
    const กล่อง = document.querySelector('[data-เหตุปิดไม่ได้]')
    const rก = กล่อง?.getBoundingClientRect()
    return {
      หัว: [...document.querySelectorAll('.pk-หัวคอลัมน์ .pk-หัวช่อง, .pk-ตอนเทียบ .pk-หัวช่อง')].filter(เห็น).length,
      สูงหัว: Math.round((document.querySelector('.pk-หัวช่อง')?.getBoundingClientRect().height || 0) * 10) / 10,
      เงาตอน: ตอน ? getComputedStyle(ตอน).boxShadow : '',
      ปุ่ม: ปุ่ม.map((b) => {
        const r = b.getBoundingClientRect()
        const คำอธิบาย = (b.getAttribute('aria-describedby') || '')
          .split(/\s+/)
          .map((id) => document.getElementById(id)?.textContent?.trim() || '')
          .join(' ')
          .trim()
        return {
          ล็อก: b.getAttribute('aria-disabled'),
          ปิดจริง: b.hasAttribute('disabled'),
          กว้าง: r.width,
          สูง: r.height,
          เงา: getComputedStyle(b).boxShadow,
          คำอธิบาย,
        }
      }),
      กล่องคำ: กล่อง && เห็น(กล่อง) ? กล่อง.textContent.trim() : '',
      กล่องที่: rก ? [rก.left, rก.right, rก.top, rก.bottom] : null,
      ประกาศ: [...document.querySelectorAll('.pk-หัวช่อง [role="status"]')].map((x) => x.textContent.trim()).join(' '),
      กว้างจอ: document.documentElement.clientWidth,
      เลื่อนข้าง: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      ที่อยู่: location.search,
      ข้อ: document.querySelectorAll('.pk-ตัวบท [data-ข้อ]').length,
    }
  }, ปุ่มปิด)

async function รอกล่อง(แท็บ, เปิดอยู่) {
  await แท็บ
    .waitForFunction(
      (ต้อง) => {
        const ก = document.querySelector('[data-เหตุปิดไม่ได้]')
        return !!ก && ก.getClientRects().length > 0 && getComputedStyle(ก).display !== 'none' === ต้อง
      },
      เปิดอยู่,
      { timeout: 3000 },
    )
    .catch(() => {})
  if (!เปิดอยู่) return
  // ⭐ กล่อง `role="status"` ได้ข้อความหลังเฟรมถัดไป (ล้างแล้วใส่ใหม่) ⇒ รอจนได้คำ ⇒ ⛔ รอเป็นเวลาตายตัว
  await แท็บ
    .waitForFunction(() => [...document.querySelectorAll('.pk-หัวช่อง [role="status"]')].some((x) => x.textContent.trim()), null, { timeout: 3000 })
    .catch(() => {})
}

async function ตรวจ(พัง = null) {
  const ตก = []
  const ต้อง = (ข้อ) => !พัง || พัง.ข้อ === ข้อ
  const จอ = [
    { กว้าง: 1280, ชื่อ: 'จอ 1280' },
    { กว้าง: 375, ชื่อ: 'จอ 375' },
    { กว้าง: 320, ใหญ่: true, ชื่อ: 'จอ 320 ตัวอักษร 200%' },
  ]
  for (const [k, จ] of จอ.entries()) {
    // ⭐ โหมดพิสูจน์ ⇒ ข้อ ③ ④ วัดแค่จอแรก ⇒ ⛔ นานเกิน
    if (พัง && ['③', '④'].includes(พัง.ข้อ) && k) continue
    const { ctx, แท็บ } = await เปิด({ กว้าง: จ.กว้าง, ใหญ่: จ.ใหญ่, พัง })
    try {
      const ก่อน = await สภาพ(แท็บ)
      // ---------------------------------------------------------------- ①
      if (ต้อง('①')) {
        if (ก่อน.หัว !== 1) ตก.push(`① ${จ.ชื่อ} ⇒ เปิดฉบับเดียวแต่เห็นหัว ${ก่อน.หัว} หัว`)
        const x = ก่อน.ปุ่ม[0]
        if (ก่อน.ปุ่ม.length !== 1 || !x) ตก.push(`① ${จ.ชื่อ} ⇒ คอลัมน์เดียวเห็น × ${ก่อน.ปุ่ม.length} ปุ่ม ⇒ ต้องเห็น 1 ปุ่ม ⛔ หายไปเฉย ๆ`)
        else {
          if (x.ล็อก !== 'true') ตก.push(`① ${จ.ชื่อ} ⇒ × ของคอลัมน์สุดท้าย aria-disabled=${x.ล็อก} ⇒ ต้องเป็น "true"`)
          if (x.ปิดจริง) ตก.push(`① ${จ.ชื่อ} ⇒ × ใช้ disabled ⇒ หลุดจากลำดับ Tab ⇒ ต้องใช้ aria-disabled`)
          if (x.กว้าง < 44 - 0.5 || x.สูง < 44 - 0.5) ตก.push(`① ${จ.ชื่อ} ⇒ × ขนาด ${Math.round(x.กว้าง)} × ${Math.round(x.สูง)} ⇒ ต้องไม่เล็กกว่า 44 × 44 (SC 2.5.5)`)
          // ⭐ ปุ่มที่กดได้มีเงา ⇒ × ที่กดไม่ได้ ⛔ มี ⇒ ถ้าปุ่มที่กดได้เองไม่มีเงา ⇒ ไม่มีของให้เทียบ ⇒ แดงด้วย
          if (!ก่อน.เงาตอน || ก่อน.เงาตอน === 'none' || x.เงา !== 'none')
            ตก.push(`① ${จ.ชื่อ} ⇒ เงาของ × ที่กดไม่ได้ “${x.เงา}” · ของปุ่มที่กดได้ “${ก่อน.เงาตอน}” ⇒ ต้องต่างกันด้วยเงา ⛔ สีอย่างเดียว (SC 1.4.1)`)
          if (x.คำอธิบาย !== เหตุ) ตก.push(`① ${จ.ชื่อ} ⇒ คำอธิบายที่หูได้ยิน (aria-describedby) “${x.คำอธิบาย}” ⇒ ต้องเป็น “${เหตุ}”`)
          // ⭐ รับโฟกัสจริง ⇒ เบราว์เซอร์ไม่ยอมโฟกัสปุ่ม `disabled`
          const โฟกัส = await แท็บ.evaluate((s) => {
            const b = [...document.querySelectorAll(s)].find((e) => e.getClientRects().length)
            b?.focus()
            return document.activeElement === b
          }, ปุ่มปิด)
          if (!โฟกัส) ตก.push(`① ${จ.ชื่อ} ⇒ × ที่กดไม่ได้รับโฟกัสไม่ได้ ⇒ คนใช้แป้นพิมพ์ไปไม่ถึง`)
        }
        if (ก่อน.เลื่อนข้าง) ตก.push(`① ${จ.ชื่อ} ⇒ หน้าเลื่อนด้านข้าง`)
      }
      // ---------------------------------------------------------------- ②
      if (ต้อง('②') || ต้อง('③')) {
        await แท็บ.locator(`${ปุ่มปิด}:visible`).first().click({ timeout: 5000, force: true }).catch(() => {})
        // ⭐ `force` ⇒ Playwright ถือว่าปุ่ม `aria-disabled` กดไม่ได้แล้วรอไม่จบ ⇒ คนจริงกดได้ ⇒ ข้ามการรอนั้น ⛔ ข้ามการกด
        await รอกล่อง(แท็บ, true)
        const หลัง = await สภาพ(แท็บ)
        if (ต้อง('②')) {
          if (หลัง.กล่องคำ !== เหตุ) ตก.push(`② ${จ.ชื่อ} ⇒ กด × แล้วตาเห็นเหตุผล “${หลัง.กล่องคำ}” ⇒ ต้องเป็น “${เหตุ}”`)
          if (!หลัง.ประกาศ.includes(เหตุ)) ตก.push(`② ${จ.ชื่อ} ⇒ กด × แล้วกล่อง role="status" ได้ “${หลัง.ประกาศ}” ⇒ หูไม่ได้ยินเหตุผล (SC 4.1.3)`)
          if (หลัง.กล่องคำ && หลัง.กล่องที่) {
            const [ซ, ข] = หลัง.กล่องที่
            if (ซ < 16 - 0.5 || ข > หลัง.กว้างจอ - 16 + 0.5) ตก.push(`② ${จ.ชื่อ} ⇒ กล่องเหตุผล ${Math.round(ซ)}–${Math.round(ข)} ⇒ ต้องห่างขอบจอ 16 จุด`)
          }
          if (Math.abs(หลัง.สูงหัว - ก่อน.สูงหัว) > 0.5) ตก.push(`② ${จ.ชื่อ} ⇒ กด × แล้วหัวสูง ${ก่อน.สูงหัว} → ${หลัง.สูงหัว} ⇒ ต้องเท่าเดิม (เกณฑ์ข้อ 5.4)`)
          if (หลัง.หัว !== 1 || หลัง.ที่อยู่ !== ก่อน.ที่อยู่ || !หลัง.ข้อ)
            ตก.push(`② ${จ.ชื่อ} ⇒ กด × แล้วมีของหาย ⇒ ${JSON.stringify({ หัว: หลัง.หัว, ที่อยู่: หลัง.ที่อยู่, ข้อ: หลัง.ข้อ })}`)
          if (หลัง.เลื่อนข้าง) ตก.push(`② ${จ.ชื่อ} ⇒ กล่องเหตุผลขึ้นแล้วหน้าเลื่อนด้านข้าง`)
        }
        // ---------------------------------------------------------------- ③
        if (ต้อง('③') && หลัง.กล่องคำ) {
          await แท็บ.keyboard.press('Escape')
          await รอกล่อง(แท็บ, false)
          if ((await สภาพ(แท็บ)).กล่องคำ) ตก.push(`③ ${จ.ชื่อ} ⇒ กด Escape แล้วกล่องเหตุผลยังค้าง`)
          await แท็บ.locator(`${ปุ่มปิด}:visible`).first().click({ timeout: 5000, force: true }).catch(() => {})
          await รอกล่อง(แท็บ, true)
          await แท็บ.mouse.click(5, Math.round((await แท็บ.viewportSize()).height / 2))
          await รอกล่อง(แท็บ, false)
          if ((await สภาพ(แท็บ)).กล่องคำ) ตก.push(`③ ${จ.ชื่อ} ⇒ แตะที่อื่นแล้วกล่องเหตุผลยังค้าง`)
        }
      }
      // ---------------------------------------------------------------- ④
      if (ต้อง('④') && !จ.ใหญ่) {
        await แท็บ.keyboard.press('Escape')
        if (!(await เพิ่มคอลัมน์(แท็บ).catch(() => false))) ตก.push(`④ ${จ.ชื่อ} ⇒ กดเพิ่มคอลัมน์ไม่ได้`)
        else {
          await แท็บ.waitForFunction((s) => [...document.querySelectorAll(s)].filter((e) => e.getClientRects().length).length >= 2, ปุ่มปิด, { timeout: 15000 }).catch(() => {})
          await รอหน้านิ่ง(แท็บ)
          const สอง = await สภาพ(แท็บ)
          if (สอง.ปุ่ม.length < 2) ตก.push(`④ ${จ.ชื่อ} ⇒ เพิ่มคอลัมน์แล้วเห็น × ${สอง.ปุ่ม.length} ปุ่ม`)
          const ล็อกค้าง = สอง.ปุ่ม.filter((x) => x.ล็อก === 'true' || x.เงา === 'none').length
          if (ล็อกค้าง) ตก.push(`④ ${จ.ชื่อ} ⇒ เพิ่มคอลัมน์แล้ว × ยังกดไม่ได้ ${ล็อกค้าง} ปุ่ม ⇒ ต้องกดได้ทันทีทุกคอลัมน์`)
          else {
            await แท็บ.locator(`${ปุ่มปิด}:visible`).last().click({ timeout: 5000 }).catch(() => {})
            await แท็บ.waitForFunction((s) => [...document.querySelectorAll(s)].filter((e) => e.getClientRects().length).length === 1, ปุ่มปิด, { timeout: 15000 }).catch(() => {})
            await รอหน้านิ่ง(แท็บ)
            const หนึ่ง = await สภาพ(แท็บ)
            if (หนึ่ง.ปุ่ม.length !== 1 || หนึ่ง.ปุ่ม[0].ล็อก !== 'true')
              ตก.push(`④ ${จ.ชื่อ} ⇒ ปิดกลับเหลือคอลัมน์เดียวแล้ว × ${JSON.stringify(หนึ่ง.ปุ่ม.map((x) => x.ล็อก))} ⇒ ต้องเหลือ 1 ปุ่มที่กดไม่ได้`)
          }
        }
      }
    } catch (e) {
      ตก.push(`${พัง?.ข้อ || '①'} ${จ.ชื่อ} ⇒ ล้มระหว่างตรวจ ⇒ ${e.message}`)
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
    const จับได้ = ตก.some((x) => x.startsWith(พัง.ข้อ) && !x.includes('ล้มระหว่างตรวจ'))
    console.log(`${จับได้ ? '✅' : '⛔'} ${ชื่อ} (${พัง.ข้อ}) ⇒ ${จับได้ ? 'ยังจับได้' : 'จับไม่ได้'}${จับได้ ? '' : ' ⇒ ' + JSON.stringify(ตก)}`)
    if (!จับได้) รหัสออก = 1
  }
  if (!รหัสออก) console.log(`\n✅ โหมดพิสูจน์: ด่านปุ่มปิดคอลัมน์สุดท้ายจับของพังได้ครบ ${Object.keys(ของพัง).length} ชิ้น`)
} else {
  const ตก = await ตรวจ()
  for (const x of ตก) console.log(`⛔ ${x}`)
  if (ตก.length) รหัสออก = 1
  else console.log('✅ คอลัมน์สุดท้าย ⇒ × อยู่ที่เดิม กดไม่ได้ บอกเหตุผลทั้งตาและหู ⇒ เพิ่มคอลัมน์แล้วกดได้ทันที ⇒ ผ่าน 4 ข้อ')
}
await เบราว์เซอร์.close()
process.exit(รหัสออก)
