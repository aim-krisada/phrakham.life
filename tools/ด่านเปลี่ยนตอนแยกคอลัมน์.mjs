// ด่านตรวจ — **เปลี่ยนตอนของคอลัมน์หนึ่ง ⇒ ทุกคอลัมน์แสดงตามที่เลือก** (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/143)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// ⭐⭐ **ที่มา** ⇒ พี่เอมใช้ Fold กางจอ 5 พ.ย. 2569 ⇒ ติ๊ก TCV กับ LSV แต่เห็นแค่ TCV ด้านขวาว่าง
//   ⇒ และ AI ทำซ้ำที่จอ 860 ⇒ เลือกมาระโก 11:1 ให้ LSV ⇒ คอลัมน์ TCV กระโดดจากบท 12 ไปบท 13 ⇒ `t` หายจากที่อยู่
// ⭐⭐ **กติกาที่พี่เอมเคาะเอง 5 พ.ย. 2569** *"ถ้าเลือก เล่ม บท ข้อ เดียวกันควร link scroll แต่ถ้าแยก หนังสือ บท ข้อ ต้องแยก scroll"*
//   ⇒ เจ้าของการเคาะคือ `docs/เคาะ/หน้าจอกับการอ่าน.md` ⛔ ไม่จดซ้ำที่นี่
//
// **ด่านนี้ทำตามขั้นของใบจริง ๆ บนหน้าที่สร้างเสร็จ** ⇒ เปิด `/read/MRK?c=12&v=35&t=TCV,LSV` ⇒ กดปุ่มตอนบนหัวคอลัมน์ LSV
//   ⇒ ทุกจอที่ใบสั่ง (375 · 707 ที่ Fold กางจอ · 860 · 1280) ⇒ จอแคบลองทั้งซ้ายขวา บนล่าง และทีละฉบับ ⇒ จอแคบเป็นมือถือ (`isMobile` · `hasTouch`)
//   ① **แยก ⇒ เลือก มาระโก 11:1 ให้ LSV** ⇒ เลื่อนแยก (เกณฑ์ข้อ 8.2)
//      ⇒ 1.1 ข้อแรกที่เห็นของคอลัมน์แรกอยู่ข้อเดิม ⛔ ไม่กระโดดไปบทอื่น (เกณฑ์ข้อ 2)
//      ⇒ 1.2 ตัวบทข้อ 11:1 ของ LSV อยู่บนจอให้เห็นจริง ⛔ ไม่ใช่แค่หัวคอลัมน์ (เกณฑ์ข้อ 2 · ภาพของพี่เอม)
//   ② **ที่อยู่เก็บครบ** ⇒ `t=TCV` · `p=MRK.11.LSV.1` · `c` กับ `v` เป็นข้อที่คอลัมน์แรกอยู่ (เกณฑ์ข้อ 3)
//   ③ **เปิดที่อยู่นั้นในเครื่องใหม่ที่จำฉบับอื่นไว้** ⇒ ได้หน้าเดิม ⇒ คอลัมน์ครบ · คอลัมน์แรกข้อเดิม · 11:1 บนจอ (เกณฑ์ข้อ 3)
//   ④ **กลับมาที่เดียวกัน ⇒ เลือก มาระโก 12 ข้อที่คอลัมน์แรกอยู่ให้ LSV** ⇒ กลับเข้าตาราง เลื่อนคู่ ข้อตรงแถว (เกณฑ์ข้อ 8.1 · 8.3)
//      ⇒ คอลัมน์แรกอยู่ข้อเดิม · ที่อยู่ ⛔ ไม่มี `p` แล้ว · มี `t=TCV,LSV`
//   ⑤ **บทเดียวกันแต่คนละข้อ ⇒ เลือก มาระโก 12:1 ให้ LSV** ⇒ เลื่อนแยก (เกณฑ์ข้อ 8.2 *คนละข้อ*)
//      ⇒ คอลัมน์แรกอยู่ข้อเดิม · ตัวบท 12:1 ของ LSV อยู่บนจอ
//
// ⭐ **ตัดสินจากตัวหนังสือบนจอ ⛔ ไม่ได้ดูชื่อคลาส** ⇒ ตัวบทของ LSV หยิบจาก `/api/chapter/MRK/<บท>.json` ⇒ หาตัวหนังสือนั้นบนจอ
//   ⇒ บนจอ = อยู่ใต้แถบหนึบและเหนือแถบล่าง ⇒ ⛔ ไม่ถูกซ่อน ⛔ ไม่ถูกตัดด้วยกล่องที่เลื่อน
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านเปลี่ยนตอนแยกคอลัมน์.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพังทีละชิ้น (รายชื่ออยู่ที่ `ของพัง`) ⇒ แต่ละชิ้นต้องทำให้ข้อของมันแดง
//   ⇒ ⭐ และยิงด่านใส่เว็บก่อนแก้ (คอมมิต 88482caf บนเว็บจริง) แดงทั้ง ① ② ③ ⇒ บันทึกไว้ในคำขอรวมของใบ #143
//
//   node tools/ด่านเปลี่ยนตอนแยกคอลัมน์.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import { เส้นทางเว็บ } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const ที่เริ่ม = '/read/MRK?c=12&v=35&t=TCV,LSV'

/**
 * ⭐⭐ **ของพัง = พฤติกรรมก่อนใบ #143 ยัดกลับเข้าไปในหน้า ทีละชิ้น** ⇒ ⛔ ไม่ได้แตะโค้ดของเว็บ
 *   ⇒ `ไม่เลื่อนแยก` ⇒ กล่องของคอลัมน์คนละที่ไหลในม้วนของหน้า (ของเดิมของจอแคบ) ⇒ ① ต้องแดง (11:1 อยู่เหนือจอ)
 *   ⇒ `คอลัมน์แรกไม่ยึด` ⇒ คืนระยะเลื่อนของหน้าเป็นค่าก่อนกดหลังวาดเสร็จ (ของเดิม ⇒ ไม่ชดเชย) ⇒ ① ต้องแดง (ข้อแรกไหลไปที่อื่น)
 *   ⇒ `ที่อยู่ไม่ครบ` ⇒ ตัดข้อออกจาก `p` และ `t` ที่เหลือ TCV ฉบับเดียว (ของเดิม) ⇒ ② ต้องแดง
 */
const ของพัง = {
  ไม่เลื่อนแยก: {
    ข้อ: '①',
    css: `.pk-ตอนเทียบ { position: static !important; }
          .pk-เนื้อตอนเทียบ { max-height: none !important; overflow: visible !important; }`,
  },
  คอลัมน์แรกไม่ยึด: { ข้อ: '①', ไม่ยึด: true },
  ที่อยู่ไม่ครบ: { ข้อ: '②', ที่อยู่: true },
}

const เบราว์เซอร์ = await chromium.launch()

// ⭐ ตัวบทของ LSV จากซองจริง ⇒ ด่านหาตัวหนังสือนี้บนจอ
const ตัวบท = {}
async function ข้อของLSV(บท, ข้อ) {
  if (!ตัวบท[บท]) {
    const r = await fetch(`${ฐาน}/api/chapter/MRK/${บท}.json`)
    if (!r.ok) throw new Error(`หยิบ /api/chapter/MRK/${บท}.json ไม่ได้ ${r.status}`)
    ตัวบท[บท] = await r.json()
  }
  const t = ตัวบท[บท].ชั้น?.LSV?.[String(ข้อ)]
  if (!t) throw new Error(`ซองมาระโก ${บท} ไม่มี LSV ข้อ ${ข้อ}`)
  return t.replace(/\s+/g, ' ').trim()
}

/** เปิดหน้าในเครื่องใหม่ ⇒ ตั้งการวางคอลัมน์และฉบับที่จำไว้ก่อนหน้าจะรัน ⇒ ⛔ ไม่ไล่กดเมนูให้ช้าและเปราะ */
async function เปิด(จอ, ที่อยู่, { มุม = {}, ฉบับ = ['TCV', 'LSV'], พัง = null } = {}) {
  const ctx = await เบราว์เซอร์.newContext({
    viewport: { width: จอ.กว้าง, height: จอ.สูง },
    isMobile: จอ.มือถือ,
    hasTouch: จอ.มือถือ,
  })
  await ctx.addInitScript(
    ([ม, ฉ]) => {
      try {
        if (!sessionStorage.getItem('pk-ด่าน143')) {
          localStorage.setItem('phrakham.view', JSON.stringify(ม))
          localStorage.setItem('phrakham.versions', JSON.stringify(ฉ))
          sessionStorage.setItem('pk-ด่าน143', '1')
        }
      } catch {}
    },
    [มุม, ฉบับ],
  )
  if (พัง?.ที่อยู่)
    await ctx.addInitScript(() => {
      const ตัด = (u) => {
        if (typeof u !== 'string') return u
        const x = new URL(u, location.href)
        const p = x.searchParams.get('p')
        if (p) x.searchParams.set('p', p.split(',').map((s) => s.split('.').slice(0, 3).join('.')).join(','))
        if (x.searchParams.get('t') === 'TCV') x.searchParams.delete('t')
        return decodeURIComponent(x.pathname + x.search + x.hash)
      }
      const แทน = History.prototype.replaceState
      const ดัน = History.prototype.pushState
      History.prototype.replaceState = function (s, t, u) {
        return แทน.call(this, s, t, ตัด(u))
      }
      History.prototype.pushState = function (s, t, u) {
        return ดัน.call(this, s, t, ตัด(u))
      }
    })
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(`${ฐาน}${ที่อยู่}`, { waitUntil: 'domcontentloaded' })
  await แท็บ.waitForSelector('.pk-หัวช่อง', { state: 'attached', timeout: 30000 })
  await แท็บ.waitForFunction(() => document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
  if (พัง?.css) await แท็บ.addStyleTag({ content: พัง.css })
  await รอนิ่ง(แท็บ)
  return { ctx, แท็บ }
}

/** ⭐ รอจนหน้านิ่ง ⇒ ข้อแรกที่เห็น ระยะเลื่อน และที่อยู่ อ่านได้เหมือนกัน 2 รอบติด ⇒ ⛔ ไม่มีคอลัมน์ที่ยัง *กำลังเปิด* */
async function รอนิ่ง(แท็บ) {
  let ก่อน = ''
  const เส้นตาย = Date.now() + 20000
  while (Date.now() < เส้นตาย) {
    await แท็บ.waitForTimeout(400)
    const ส = await แท็บ
      .evaluate(() => ({
        y: Math.round(scrollY),
        ที่อยู่: location.search,
        กำลังเปิด: /กำลังเปิดตอนนี้/.test(document.body.innerText),
        แผง: !!document.querySelector('[role="dialog"]'),
      }))
      .catch(() => null)
    if (!ส || ส.กำลังเปิด || ส.แผง) continue
    const ตอนนี้ = JSON.stringify(ส)
    if (ตอนนี้ === ก่อน) return
    ก่อน = ตอนนี้
  }
}

/** ข้อแรกของคอลัมน์แรกที่ผู้อ่านเห็น ⇒ ข้อแรกในตารางที่ท้ายพ้นแถบหนึบลงมา ⇒ ⛔ ไม่นับข้อของคอลัมน์คนละที่
 *  ⇒ ขอบของแถบหนึบวัดแบบเดียวกับที่หน้าใช้หาข้อบนจอ (แถบบน · หัวคอลัมน์ที่หนึบ) */
const ข้อแรกที่เห็น = (แท็บ) =>
  แท็บ.evaluate(() => {
    let ขอบ = document.querySelector('.pk-แถบบน')?.getBoundingClientRect().height || 0
    for (const h of document.querySelectorAll('.pk-หัวคอลัมน์, .pk-ชื่อคำเดิม, .pk-หัวคำเดิม, .pk-ตอนเทียบ .pk-หัวช่อง')) {
      if (getComputedStyle(h).position !== 'sticky') continue
      ขอบ = Math.max(ขอบ, (parseFloat(getComputedStyle(h).top) || 0) + h.getBoundingClientRect().height)
    }
    for (const el of document.querySelectorAll('.pk-ตัวบท [data-ข้อ]')) {
      if (!el.getClientRects().length || el.closest('.pk-ตอนเทียบ')) continue
      if (el.getBoundingClientRect().bottom > ขอบ + 8) return el.getAttribute('data-ข้อ')
    }
    return ''
  })

/** ตัวหนังสือนี้อยู่บนจอให้เห็นไหม ⇒ ใต้แถบหนึบ เหนือแถบล่าง ⇒ ⛔ ถูกซ่อน ⛔ ถูกกล่องที่เลื่อนตัดทิ้ง */
const เห็นบนจอ = (แท็บ, ข้อความ) =>
  แท็บ.evaluate((หา) => {
    const ชิ้น = หา.slice(0, 24)
    const บน = document.querySelector('.pk-แถบบน')?.getBoundingClientRect().bottom || 0
    const ล่าง = document.querySelector('.pk-แถบล่าง')?.getBoundingClientRect().top || innerHeight
    const เดิน = document.createTreeWalker(document.querySelector('.pk-หน้าอ่าน') || document.body, NodeFilter.SHOW_TEXT)
    // ⭐ ต่อตัวหนังสือทั้งก้อนเป็นสายเดียว ⇒ ตัวบทอาจถูกผ่าเป็นหลายชิ้น (คำพระเยซู)
    const โหนด = []
    let สาย = ''
    while (เดิน.nextNode()) {
      const n = เดิน.currentNode
      โหนด.push([n, สาย.length])
      สาย += n.textContent.replace(/\s+/g, ' ')
    }
    let i = สาย.indexOf(ชิ้น)
    while (i >= 0) {
      const ตัว = โหนด.findLast(([, k]) => k <= i)
      const el = ตัว?.[0].parentElement
      if (el && el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden') {
        const r = document.createRange()
        r.selectNodeContents(ตัว[0])
        const ก = r.getBoundingClientRect()
        // ⭐ กล่องที่เลื่อนได้ตัดของที่พ้นขอบทิ้ง ⇒ ต้องอยู่ในขอบของทุกกล่องที่ครอบด้วย
        let ใน = ก.bottom > บน && ก.top < ล่าง && ก.width > 0
        for (let p = el.parentElement; p && ใน; p = p.parentElement) {
          const o = getComputedStyle(p).overflowY
          if (o === 'auto' || o === 'scroll' || o === 'hidden') {
            const pr = p.getBoundingClientRect()
            ใน = ก.bottom > pr.top && ก.top < pr.bottom
          }
        }
        if (ใน) return true
      }
      i = สาย.indexOf(ชิ้น, i + 1)
    }
    return false
  }, ข้อความ)

/** สภาพกล่องของคอลัมน์คนละที่ ⇒ ใส่ในข้อความตอนตก ⇒ คนแก้เห็นทันทีว่ากล่องอยู่ไหน เลื่อนไปเท่าไร */
const สภาพกล่อง = (แท็บ) =>
  แท็บ.evaluate(() =>
    JSON.stringify(
      [...document.querySelectorAll('section.pk-ตอนเทียบ')].map((s) => {
        const ม้วน = s.querySelector('.pk-เนื้อตอนเทียบ')
        const r = s.getBoundingClientRect()
        return {
          บน: Math.round(r.top),
          ล่าง: Math.round(r.bottom),
          วาง: getComputedStyle(s).position,
          เลื่อนกล่อง: ม้วน ? Math.round(ม้วน.scrollTop) : null,
          หน้า: Math.round(scrollY),
          ที่อยู่: location.search,
        }
      }),
    ),
  )

/** หัวคอลัมน์ที่เห็น ⇒ `[ป้าย, ฉบับ, อยู่ในตาราง]` เรียงซ้ายไปขวา */
const หัวที่เห็น = (แท็บ) =>
  แท็บ.evaluate(() =>
    [...document.querySelectorAll('.pk-หัวช่อง')]
      .filter((h) => h.offsetParent !== null && !h.closest('[data-ชื่อคำเดิม]'))
      .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left)
      .map((h) => [
        (h.querySelector('.pk-ที่ของช่อง')?.textContent || '').replace(/\s+/g, ' ').trim(),
        h.querySelector('select')?.value || '',
        !h.closest('.pk-ตอนเทียบ') && !h.classList.contains('pk-หัวคู่'),
      ]),
  )

/** กดปุ่มตอนบนหัวของคอลัมน์ LSV แล้วเลือกในแผง ⇒ `ข้อ` null = ทั้งบท */
async function เลือกตอนของLSV(แท็บ, พัง, บท, ข้อ) {
  const y = await แท็บ.evaluate(() => scrollY)
  await แท็บ.evaluate(() => {
    for (const h of document.querySelectorAll('[data-ด่าน143]')) h.removeAttribute('data-ด่าน143')
    const หัว = [...document.querySelectorAll('.pk-หัวช่อง')].find(
      (h) => h.offsetParent !== null && h.querySelector('select')?.value === 'LSV',
    )
    หัว?.setAttribute('data-ด่าน143', '1')
  })
  const ปุ่ม = แท็บ.locator('[data-ด่าน143] [data-ปุ่ม="เปลี่ยนตอน"]')
  if (!(await ปุ่ม.count())) throw new Error('หาปุ่มตอนบนหัวคอลัมน์ LSV ไม่เจอ')
  await ปุ่ม.click()
  const แผง = แท็บ.locator('[role="dialog"]')
  await แผง.waitFor()
  await แผง.getByRole('button', { name: /^มาระโก/ }).first().click()
  await แผง.locator('.pk-ตารางเลข').first().waitFor()
  if (!(await แผง.locator('.pk-ปุ่มกว้าง').count())) {
    await แผง.locator('.pk-ตารางเลข button').filter({ hasText: new RegExp(`^${บท}$`) }).first().click()
    await แผง.locator('.pk-ปุ่มกว้าง').filter({ hasText: 'ทั้งบท' }).waitFor()
  }
  if (ข้อ === null) await แผง.locator('.pk-ปุ่มกว้าง').filter({ hasText: 'ทั้งบท' }).click()
  else await แผง.locator('.pk-ตารางเลข button').filter({ hasText: new RegExp(`^${ข้อ}$`) }).first().click()
  // ⭐ ของพัง *คอลัมน์แรกไม่ยึด* ⇒ หน้าวาดเสร็จแล้วคืนระยะเลื่อนเป็นค่าก่อนกด ⇒ ของเดิมที่ไม่ชดเชย
  if (พัง?.ไม่ยึด) {
    await แท็บ.waitForTimeout(600)
    await แท็บ.evaluate((ค่า) => scrollTo(0, ค่า), y)
  }
  await รอนิ่ง(แท็บ)
}

const จอทั้งหมด = [
  { ชื่อ: '375', กว้าง: 375, สูง: 812, มือถือ: true, วาง: ['ซ้ายขวา', 'บนล่าง', 'ทีละฉบับ'] },
  { ชื่อ: '707 (Fold กางจอ)', กว้าง: 707, สูง: 820, มือถือ: true, วาง: ['ซ้ายขวา', 'บนล่าง', 'ทีละฉบับ'] },
  { ชื่อ: '860', กว้าง: 860, สูง: 800, มือถือ: true, วาง: ['ซ้ายขวา'] },
  { ชื่อ: '1280', กว้าง: 1280, สูง: 900, มือถือ: false, วาง: ['ซ้ายขวา'] },
]

/** รัน 1 จอ 1 แบบวาง ⇒ คืนรายการที่ตก */
async function ตรวจ(จอ, วาง, พัง = null) {
  const ตก = []
  const ชื่อ = `จอ ${จอ.ชื่อ}${จอ.กว้าง < 768 ? ` ${วาง}` : ''}`
  // ⭐ ทีละฉบับ ⇒ ผู้อ่านต้องเลือกอ่าน LSV ก่อนถึงจะเห็นหัวของมัน ⇒ ตั้งไว้ในเครื่องเหมือนเลือกจากเมนูแล้ว
  const มุม = { วางคอลัมน์: วาง, ...(วาง === 'ทีละฉบับ' ? { ฉบับที่ดู: 'LSV' } : {}) }
  let ctx, แท็บ
  try {
    ;({ ctx, แท็บ } = await เปิด(จอ, ที่เริ่ม, { มุม, พัง }))
    // ---------------------------------------------------------------- ① แยก ⇒ มาระโก 11:1
    const ก่อน = await ข้อแรกที่เห็น(แท็บ)
    if (!ก่อน.startsWith('12:')) ตก.push(`${ชื่อ} ⇒ เปิด ${ที่เริ่ม} แล้วคอลัมน์แรกเห็นข้อ ${ก่อน || '(ไม่มี)'} ⇒ ต้องอยู่บท 12`)
    await เลือกตอนของLSV(แท็บ, พัง, 11, 1)
    const หลัง = await ข้อแรกที่เห็น(แท็บ)
    // ⭐ ทีละฉบับที่อ่าน LSV อยู่ ⇒ คอลัมน์แรกซ่อน ⇒ ดูข้อของคอลัมน์แรกตอนกลับไปอ่าน TCV แทน (ข้างล่าง)
    if (วาง !== 'ทีละฉบับ' || จอ.กว้าง >= 768) {
      if (หลัง !== ก่อน)
        ตก.push(`① ${ชื่อ} ⇒ เลือกมาระโก 11:1 ให้ LSV แล้วคอลัมน์แรกเห็นข้อ ${หลัง || '(ไม่มี)'} ⇒ ต้องอยู่ข้อเดิม ${ก่อน}`)
    }
    if (!(await เห็นบนจอ(แท็บ, await ข้อของLSV(11, 1))))
      ตก.push(`① ${ชื่อ} ⇒ เลือกมาระโก 11:1 ให้ LSV แล้วตัวบท LSV 11:1 ⛔ อยู่บนจอ ⇒ หัว ${JSON.stringify(await หัวที่เห็น(แท็บ))}`)

    // ---------------------------------------------------------------- ② ที่อยู่เก็บครบ
    const q = new URL(แท็บ.url()).searchParams
    if (q.get('p') !== 'MRK.11.LSV.1') ตก.push(`② ${ชื่อ} ⇒ ที่อยู่ p=${q.get('p')} ⇒ ต้องเป็น MRK.11.LSV.1 (ฉบับและข้อของคอลัมน์)`)
    if (q.get('t') !== 'TCV') ตก.push(`② ${ชื่อ} ⇒ ที่อยู่ t=${q.get('t')} ⇒ ต้องเป็น TCV (ฉบับในตาราง)`)
    if (q.get('c') !== '12') ตก.push(`② ${ชื่อ} ⇒ ที่อยู่ c=${q.get('c')} ⇒ ต้องเป็น 12 (คอลัมน์แรกไม่ได้แตะ)`)
    const ที่อยู่ = new URL(แท็บ.url()).pathname.replace(new URL(ฐาน).pathname, '') + new URL(แท็บ.url()).search

    // ---------------------------------------------------------------- ③ เปิดที่อยู่นั้นในเครื่องใหม่ ⇒ จำฉบับอื่นไว้ในเครื่อง ⇒ ต้องได้หน้าเดิม
    {
      // ⭐ ทีละฉบับ ⇒ คอลัมน์ที่อ่านเป็นความชอบในเครื่องของผู้อ่าน ⛔ อยู่ในที่อยู่ ⇒ เครื่องใหม่เลือกอ่านคอลัมน์คนละที่ (`เทียบ:0`) แบบกดจากเมนู
      const มุมใหม่ = วาง === 'ทีละฉบับ' ? { ...มุม, ฉบับที่ดู: 'เทียบ:0' } : มุม
      const ใหม่ = await เปิด(จอ, ที่อยู่, { มุม: มุมใหม่, ฉบับ: ['TCV', 'WEB'], พัง })
      try {
        const หัว = await หัวที่เห็น(ใหม่.แท็บ)
        const ฉบับ = หัว.map((h) => h[1]).sort().join()
        const ต้อง = วาง === 'ทีละฉบับ' && จอ.กว้าง < 768 ? 'LSV' : 'LSV,TCV'
        if (ฉบับ !== ต้อง) ตก.push(`③ ${ชื่อ} ⇒ เปิด ${ที่อยู่} ในเครื่องที่จำ TCV,WEB ไว้ ⇒ หัวคอลัมน์ ${ฉบับ} ⇒ ต้องเป็น ${ต้อง}`)
        if (!(await เห็นบนจอ(ใหม่.แท็บ, await ข้อของLSV(11, 1))))
          ตก.push(`③ ${ชื่อ} ⇒ เปิด ${ที่อยู่} ใหม่ ⇒ ตัวบท LSV 11:1 ⛔ อยู่บนจอ`)
        if (วาง !== 'ทีละฉบับ' || จอ.กว้าง >= 768) {
          const แรก = await ข้อแรกที่เห็น(ใหม่.แท็บ)
          if (แรก !== หลัง) ตก.push(`③ ${ชื่อ} ⇒ เปิด ${ที่อยู่} ใหม่ ⇒ คอลัมน์แรกเห็นข้อ ${แรก || '(ไม่มี)'} ⇒ ต้องเป็น ${หลัง}`)
        }
      } finally {
        await ใหม่.ctx.close()
      }
    }

    // ---------------------------------------------------------------- ④ กลับมาที่เดียวกัน ⇒ เลื่อนคู่
    const [บท, ข้อ] = ก่อน.split(':').map(Number)
    await เลือกตอนของLSV(แท็บ, null, บท, ข้อ)
    const หัว4 = await หัวที่เห็น(แท็บ)
    const LSV4 = หัว4.find((h) => h[1] === 'LSV')
    if (!LSV4?.[2]) ตก.push(`④ ${ชื่อ} ⇒ เลือกมาระโก ${ก่อน} (ที่เดียวกับคอลัมน์แรก) ให้ LSV ⇒ LSV ${LSV4 ? 'ยังเป็นคอลัมน์แยก' : 'ไม่อยู่บนจอ'} ⇒ ต้องกลับเข้าตาราง`)
    const q4 = new URL(แท็บ.url()).searchParams
    if (q4.get('p') || q4.get('t') !== 'TCV,LSV')
      ตก.push(`④ ${ชื่อ} ⇒ ที่อยู่ p=${q4.get('p')} t=${q4.get('t')} ⇒ ต้องไม่มี p และ t=TCV,LSV`)
    // ⭐ ทีละฉบับ ⇒ LSV กลับเข้าตารางแล้วผู้อ่านยังอ่าน LSV ⇒ ตารางโผล่กลับมา ⇒ ข้อเดียวกับก่อนไปอ่านคอลัมน์แยก ⛔ ไม่ใช่ต้นหน้า
    const แรก4 = await ข้อแรกที่เห็น(แท็บ)
    if (แรก4 !== ก่อน) ตก.push(`④ ${ชื่อ} ⇒ กลับเข้าตารางแล้วคอลัมน์แรกเห็นข้อ ${แรก4 || '(ไม่มี)'} ⇒ ต้องอยู่ข้อเดิม ${ก่อน}`)
    // ⭐ ข้อตรงแถว ⇒ ตัวบท TCV กับ LSV ของข้อเดียวกันอยู่ในแถวเดียวกันของตาราง
    //   ⇒ ทีละฉบับวาดแค่ฉบับที่อ่าน ⇒ ดูแค่ว่า LSV อยู่ในตาราง (ข้างบน) และคอลัมน์แรกอยู่ข้อเดิมตอนกลับไปอ่าน (ข้างล่าง)
    if (วาง !== 'ทีละฉบับ' || จอ.กว้าง >= 768) {
      const ตรงแถว = await แท็บ.evaluate((k) => {
        const แถว = document.querySelector(`.pk-ตัวบท .pk-ข้อ[data-ข้อ="${k}"]`)
        return !!แถว?.querySelector('[data-ฉบับ="LSV"]') && !!แถว?.querySelector('[data-ฉบับ="TCV"]')
      }, ก่อน)
      if (!ตรงแถว) ตก.push(`④ ${ชื่อ} ⇒ ข้อ ${ก่อน} ของ TCV กับ LSV ⛔ อยู่แถวเดียวกันในตาราง ⇒ ต้องเลื่อนคู่ ข้อตรงแถว`)
    }

    // ---------------------------------------------------------------- ⑤ บทเดียวกันแต่คนละข้อ ⇒ เลื่อนแยก
    if (ข้อ !== 1) {
      await เลือกตอนของLSV(แท็บ, null, 12, 1)
      const หัว5 = await หัวที่เห็น(แท็บ)
      const LSV5 = หัว5.find((h) => h[1] === 'LSV')
      if (!LSV5 || LSV5[2]) ตก.push(`⑤ ${ชื่อ} ⇒ เลือกมาระโก 12:1 ให้ LSV (คนละข้อกับ ${ก่อน}) ⇒ LSV ${LSV5 ? 'ยังอยู่ในตาราง' : 'ไม่อยู่บนจอ'} ⇒ ต้องเลื่อนแยก`)
      if (!(await เห็นบนจอ(แท็บ, await ข้อของLSV(12, 1))))
        ตก.push(`⑤ ${ชื่อ} ⇒ เลือกมาระโก 12:1 ให้ LSV แล้วตัวบท LSV 12:1 ⛔ อยู่บนจอ ⇒ ${await สภาพกล่อง(แท็บ)}`)
      if (วาง !== 'ทีละฉบับ' || จอ.กว้าง >= 768) {
        const แรก5 = await ข้อแรกที่เห็น(แท็บ)
        if (แรก5 !== ก่อน) ตก.push(`⑤ ${ชื่อ} ⇒ คอลัมน์แรกเห็นข้อ ${แรก5 || '(ไม่มี)'} ⇒ ต้องอยู่ข้อเดิม ${ก่อน}`)
      }
    } else ตก.push(`⑤ ${ชื่อ} ⇒ คอลัมน์แรกอยู่ข้อ 1 ⇒ ทดสอบคนละข้อไม่ได้ ⇒ ด่านตั้งหน้าผิด`)
  } catch (e) {
    ตก.push(`${ชื่อ} ⇒ ด่านทำต่อไม่ได้ ⇒ ${e.message.split('\n')[0]}`)
  } finally {
    await ctx?.close()
  }
  return ตก
}

let รหัสออก = 0
if (ทดสอบตัวเอง) {
  // ⭐ ยัดทีละชิ้นที่จอ 707 ซ้ายขวา (จอของพี่เอม) ⇒ ทุกชิ้นต้องทำให้ข้อของมันแดง
  const จอ = จอทั้งหมด[1]
  for (const [ชื่อพัง, พัง] of Object.entries(ของพัง)) {
    const ตก = await ตรวจ(จอ, 'ซ้ายขวา', พัง)
    const จับได้ = ตก.some((x) => x.startsWith(พัง.ข้อ))
    console.log(`${จับได้ ? '✅' : '⛔'} ยัด ${ชื่อพัง} ⇒ ข้อ ${พัง.ข้อ} ${จับได้ ? 'แดง' : '⛔ ไม่แดง'}`)
    for (const x of ตก) console.log(`   ${x}`)
    if (!จับได้) รหัสออก = 1
  }
  console.log(รหัสออก ? '⛔ ด่านตาบอดบางข้อ' : '✅ ด่านจับของพังได้ทุกชิ้น')
} else {
  const ตกทั้งหมด = []
  // ⭐ ลองเฉพาะบางจอตอนแก้ในเครื่อง ⇒ `PK_GATE143_ONLY="375 ทีละฉบับ"` ⇒ ในท่อ ⛔ ตั้ง ⇒ ตรวจครบทุกจอ
  const เฉพาะ = process.env.PK_GATE143_ONLY || ''
  for (const จอ of จอทั้งหมด)
    for (const วาง of จอ.วาง) {
      if (เฉพาะ && !`${จอ.กว้าง} ${วาง}`.includes(เฉพาะ)) continue
      const ตก = await ตรวจ(จอ, วาง)
      console.log(`${ตก.length ? '⛔' : '✅'} จอ ${จอ.ชื่อ}${จอ.กว้าง < 768 ? ` ${วาง}` : ''}`)
      ตกทั้งหมด.push(...ตก)
    }
  for (const x of ตกทั้งหมด) console.log(`   ${x}`)
  console.log(ตกทั้งหมด.length ? `⛔ ตก ${ตกทั้งหมด.length} ข้อ` : '✅ เปลี่ยนตอนของคอลัมน์หนึ่ง ⇒ ทุกคอลัมน์แสดงตามที่เลือก')
  if (ตกทั้งหมด.length) รหัสออก = 1
}
await เบราว์เซอร์.close()
process.exit(รหัสออก)
