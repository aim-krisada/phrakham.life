// ด่านตรวจ — **การ์ดความหมายคำปิดเมื่อกดที่อื่น** (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/129)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// **ตรวจของจริงบนหน้า 2 แบบ** ⇒ จอ 375 แบบ **จอสัมผัส** (แตะด้วยนิ้ว · ลากนิ้วเลื่อน) · จอ 1280 แบบ **เมาส์**
//   ⇒ ใบสั่งไว้ตรง ๆ ว่าการกดทะลุ (ข้อ 4.2) ต้องลองบนจอสัมผัสด้วย ⛔ ไม่ใช่แค่เมาส์
//   ⇒ ⭐ แตะด้วย `touchscreen.tap` ⇒ เบราว์เซอร์สร้างลำดับเหตุการณ์ของนิ้วจริง (touch ⇒ pointer ⇒ click)
//   ⇒ ⭐ ลากนิ้วด้วย `Input.dispatchTouchEvent` ของ Chrome ⇒ แตะ ลาก ยก ⇒ เบราว์เซอร์ยกเลิกการกดแล้วเลื่อนเอง เหมือนนิ้วจริง
//
// ข้อที่ตรวจ ⇒ เลขข้อตรงกับเกณฑ์ *เสร็จเมื่อ* ของใบ
//   ① (ข้อ 4) **กดที่ว่างนอกการ์ดและนอกคำภาษาเดิม ⇒ การ์ดปิด**
//   ② (ข้อ 4.2) **กดปุ่มนอกการ์ดตอนการ์ดเปิด ⇒ การ์ดปิด และปุ่มนั้น ⛔ ไม่ได้ยินการกดนี้** ⇒ เมนู *เทียบ* ⛔ ไม่กาง
//   ③ (ข้อ 4.3) **เลื่อนหน้า กับเลื่อนในการ์ด ⇒ การ์ด ⛔ ไม่ปิด** ⇒ ต้องเลื่อนได้จริงด้วย ⛔ ไม่ใช่ไม่ปิดเพราะไม่ได้เลื่อน
//   ④ (ข้อ 4.4) **ปิดด้วยการกดที่อื่น ⇒ โฟกัสกลับคำเดิม**
//   ⑤ (ข้อ 4.1) **กดคำภาษาเดิมคำอื่น ⇒ การ์ดเปลี่ยนเป็นคำนั้น ⛔ ไม่ถูกถอดออกจากหน้าแม้แต่ครั้งเดียว** ⇒ ⛔ ไม่กระพริบ
//   ⑥ (ข้อ 5) **เลื่อนในการ์ดไปท้ายสุด ⇒ ปุ่ม *ปิด* ยังเห็นทั้งปุ่ม** ⇒ จุดกลางปุ่มต้องเป็นปุ่มนั้นเอง ⛔ ไม่ใช่ของที่ทับ
//        ⇒ และของที่ได้โฟกัสในการ์ด ⛔ ไม่ซุกใต้หัวการ์ด (WCAG 2.2 SC 2.4.11)
//   ⑦ (ข้อ 6) **แป้นพิมพ์** ⇒ Tab ออกจากการ์ดได้ ⛔ ไม่ติด · Enter บนปุ่มนอกการ์ด ⇒ ปุ่มทำงาน ⛔ ไม่ถูกนับเป็นการกดที่อื่น
//        · Esc ปิดแล้วโฟกัสกลับคำเดิม
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านการ์ดคำปิดนอกการ์ด.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพังเข้าไปเองทีละเรื่อง ⇒ ทุกข้อต้องจับได้ ⇒ **ข้อแรกคือถอดการปิดเมื่อกดที่อื่นทิ้ง** (ใบ #129 ข้อ 8) ⇒ ลองทั้ง 2 จอ
//
//   node tools/ด่านการ์ดคำปิดนอกการ์ด.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import { เส้นทางเว็บ, ปุ่มเทียบของหน้า, เปิดคำเดิม } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const ที่ตก = []

/** มาระโก 10 ⇒ บทเดียวกับ `tools/ด่านการ์ดคำบนหน้า.mjs` ⇒ คำแรกที่กด 10:20 คำที่ 3 · คำที่สลับไป 10:21 คำที่ 1 */
const บท = { เล่ม: 'MRK', บท: 10 }

const จอ = {
  แคบ: { ป้าย: 'จอ 375 แบบจอสัมผัส', viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true },
  กว้าง: { ป้าย: 'จอ 1280 แบบเมาส์', viewport: { width: 1280, height: 900 }, hasTouch: false, isMobile: false },
}

const เบราว์เซอร์ = await chromium.launch()

async function เปิด(แท็บ) {
  await แท็บ.goto(`${ฐาน}/read/${บท.เล่ม}?c=${บท.บท}`, { waitUntil: 'domcontentloaded' })
  await แท็บ.waitForSelector('article.pk-เนื้อ h1')
  await แท็บ.waitForFunction(() => document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
  await แท็บ.waitForTimeout(300)
}

/** ติ๊กคำภาษาเดิมในเมนู *เทียบ* ⇒ ท่าเดียวกับ `tools/ด่านการ์ดคำบนหน้า.mjs` */
async function เปิดคำภาษาเดิม(แท็บ) {
  // ⭐ ใบ #161 ⇒ ปุ่ม *เพิ่มคอลัมน์* แล้วเลือกตัวบทที่ช่องเลือกฉบับ ⇒ ⚠️ ของเดิมติ๊กช่องคำภาษาเดิม ⇒ ท่าอยู่ที่ `tools/หน้าที่ตรวจ.mjs`
  await เปิดคำเดิม(แท็บ)
  await แท็บ.waitForSelector('.pk-ชั้นคำ .pk-คำ')
  await แท็บ.waitForTimeout(300)
}

/** ติดป้าย `data-<ชื่อป้าย>` ให้คำที่ `ลำดับ` (นับจาก 0) ของข้อนั้น ⇒ หาในทุกกล่องของบท (จอแคบมีหลายกล่อง ⇒ ใบ #124) */
async function ติดป้ายคำ(แท็บ, ข้อ, ลำดับ, ชื่อป้าย) {
  return แท็บ.evaluate(
    ([บท, ข้อ, ลำดับ, ชื่อป้าย]) => {
      const แถว = [...document.querySelectorAll('.pk-ชั้นคำ .pk-ข้อคำ')].find((p) => p.getAttribute('data-ข้อเดิม') === `${บท}:${ข้อ}`)
      const ปุ่ม = แถว?.querySelectorAll('.pk-คำ')[ลำดับ]
      if (!ปุ่ม) return null
      ปุ่ม.setAttribute(`data-${ชื่อป้าย}`, '1')
      return ปุ่ม.querySelector('.pk-ตัวเดิม')?.textContent ?? null
    },
    [บท.บท, ข้อ, ลำดับ, ชื่อป้าย],
  )
}

/** กดที่จุดนั้นแบบของจอนั้น ⇒ จอสัมผัสใช้นิ้ว · จอกว้างใช้เมาส์ */
async function กดที่(แท็บ, ชนิด, x, y) {
  if (ชนิด.hasTouch) await แท็บ.touchscreen.tap(x, y)
  else await แท็บ.mouse.click(x, y)
}

/**
 * รอให้หน้ากับการ์ดหยุดไหล ⇒ ลากนิ้วแล้วปล่อย หน้ายังไหลต่ออีกพักหนึ่ง (fling)
 *   ⇒ แตะระหว่างที่ยังไหล เบราว์เซอร์ถือว่า *หยุดการไหล* ⛔ ไม่ใช่การกด ⇒ เหมือนนิ้วจริงบนโทรศัพท์
 *   ⇒ ⛔ ไม่รอ = ด่านแตะคำแล้วการ์ดไม่เปลี่ยน ⇒ แดงลอย ๆ (เจอเองตอนเขียนด่านนี้ 31 ต.ค. 2569)
 */
async function รอนิ่ง(แท็บ) {
  const ที่ = () => แท็บ.evaluate(() => `${window.scrollY}|${document.querySelector('[data-การ์ดคำ]')?.scrollTop ?? ''}`)
  let ก่อน = await ที่()
  for (let i = 0; i < 40; i++) {
    await แท็บ.waitForTimeout(120)
    const ตอนนี้ = await ที่()
    if (ตอนนี้ === ก่อน) return
    ก่อน = ตอนนี้
  }
}

/** กดของชิ้นนั้นตรงกลาง ⇒ เลื่อนให้เห็นก่อน ⇒ ⛔ จุดกลางต้องเป็นของชิ้นนั้นจริง ⛔ ไม่ใช่ของที่ลอยทับ */
async function กดของ(แท็บ, ชนิด, ตัวเลือก) {
  const ของ = แท็บ.locator(ตัวเลือก).first()
  await รอนิ่ง(แท็บ)
  await ของ.scrollIntoViewIfNeeded()
  await รอนิ่ง(แท็บ)
  const ก = await ของ.boundingBox()
  const x = ก.x + ก.width / 2
  const y = ก.y + ก.height / 2
  const ทับ = await แท็บ.evaluate(
    ([x, y, ตัวเลือก]) => {
      const e = document.elementFromPoint(x, y)
      return e?.closest(ตัวเลือก) ? '' : `${e?.tagName}.${e?.className}`
    },
    [x, y, ตัวเลือก],
  )
  if (ทับ) throw new Error(`จุดกลางของ ${ตัวเลือก} ถูก ${ทับ} ทับอยู่`)
  await กดที่(แท็บ, ชนิด, x, y)
}

/** รอการ์ดขึ้นพร้อมเนื้อ ⇒ ทุกแหล่งต้องมีเนื้อ หรือบอกว่าไม่มี */
async function รอการ์ด(แท็บ) {
  await แท็บ.waitForSelector('[data-การ์ดคำ] .pk-ข้อมูลคำ', { timeout: 15000 })
  await แท็บ.waitForFunction(
    () => [...document.querySelectorAll('[data-การ์ดคำ] [data-แหล่ง]')].every((s) => s.querySelector('[data-เนื้อ], [data-ไม่มี], .pk-เตือน')),
    null,
    { timeout: 15000 },
  )
  await แท็บ.waitForTimeout(200)
}

const มีการ์ด = (แท็บ) => แท็บ.evaluate(() => !!document.querySelector('[data-การ์ดคำ]'))
const คำบนการ์ด = (แท็บ) => แท็บ.evaluate(() => document.querySelector('[data-การ์ดคำ] .pk-ข้อมูลคำ dd [data-คำในแถว]')?.textContent.trim() ?? null)
const ตัวที่โฟกัส = (แท็บ) =>
  แท็บ.evaluate(() => {
    const a = document.activeElement
    return a?.classList.contains('pk-คำ') ? (a.querySelector('.pk-ตัวเดิม')?.textContent ?? '') : `${a?.tagName}.${a?.className}`
  })

/**
 * หาจุด *ที่ว่าง* บนหน้า ⇒ ไล่ตารางจุดบนส่วนของจอที่การ์ดไม่บัง ⇒ เอาจุดแรกที่
 *   ⛔ ไม่อยู่ในการ์ด · ⛔ ไม่ใช่คำภาษาเดิม · ⛔ ไม่ใช่ของที่กดได้ (ปุ่ม ลิงก์ ช่องกรอก ป้ายช่องติ๊ก) · ⛔ ไม่ใช่แถบที่ลอยอยู่
 *   ⇒ ⭐ ตัวหนังสือของฉบับแปลเป็นจุดแบบที่ผู้อ่านแตะจริงมากที่สุด
 */
async function หาที่ว่าง(แท็บ) {
  return แท็บ.evaluate(() => {
    const การ์ด = document.querySelector('[data-การ์ดคำ]')
    const ล่าง = การ์ด ? การ์ด.getBoundingClientRect().top : window.innerHeight
    const ซ้ายการ์ด = การ์ด && window.innerWidth >= 768 ? การ์ด.getBoundingClientRect().left : window.innerWidth
    for (let y = 140; y < ล่าง - 10; y += 17)
      for (let x = 20; x < Math.min(window.innerWidth, ซ้ายการ์ด) - 10; x += 23) {
        const e = document.elementFromPoint(x, y)
        if (!e || e === document.documentElement || e === document.body) continue
        if (e.closest('[data-การ์ดคำ], .pk-คำ, button, a, input, label, select, textarea, summary, [tabindex], header, nav, .pk-แถบล่าง'))
          continue
        if (!e.closest('.pk-เนื้อ')) continue
        if (!/\S/.test(e.textContent)) continue
        return { x, y, ที่: `${e.tagName}.${e.className}` }
      }
    return null
  })
}

/** ของพังแต่ละแบบออกฤทธิ์ในส่วนไหน ⇒ โหมดพิสูจน์หยุดหลังส่วนนั้น */
const ส่วนสุดท้ายของพัง = {
  ถอดปิดนอกการ์ด: 'กดที่ว่าง',
  โฟกัสหลุด: 'กดที่ว่าง',
  กดทะลุ: 'กดปุ่ม',
  ปิดตอนเลื่อน: 'เลื่อน',
  ปุ่มปิดหลุด: 'เลื่อน',
  หัวบังโฟกัส: 'เลื่อน',
  กระพริบ: 'สลับคำ',
}

/**
 * ตรวจ 1 จอ ⇒ คืนรายการที่ตก
 * `พัง` = ชื่อของพังที่โหมดพิสูจน์ยัดเข้าไป ⇒ ยัด **ตรงขั้นที่ของพังนั้นจะออกฤทธิ์** ⇒ ขั้นก่อนหน้ายังเดินได้ปกติ
 */
async function ตรวจ(ชนิด, พัง = '') {
  const ctx = await เบราว์เซอร์.newContext({ viewport: ชนิด.viewport, hasTouch: ชนิด.hasTouch, isMobile: ชนิด.isMobile })
  const แท็บ = await ctx.newPage()
  const ป้าย = `${บท.เล่ม} ${บท.บท} ${ชนิด.ป้าย}`
  const ตก = []
  let ขั้น = 'เริ่ม'
  // ⭐ โหมดพิสูจน์หยุดหลังส่วนที่ของพังออกฤทธิ์ ⇒ ส่วนที่เหลือ ⛔ ไม่ได้พิสูจน์อะไรเพิ่ม ⇒ ประหยัดเวลาของตัวรันตัวเดียว
  const หยุดหลัง = (ส่วน) => !!พัง && (ส่วนสุดท้ายของพัง[พัง] ?? '') === ส่วน
  try {
    // ⇒ ⛔ ถอดการปิดเมื่อกดที่อื่น (ใบ #129 ข้อ 8) ⇒ กลืน `pointerdown` ทุกครั้งตั้งแต่ชั้นหน้าต่าง
    //   ⇒ ตัวดักของการ์ด ⛔ ไม่เคยรู้ว่ามีการเริ่มกดนอกการ์ด ⇒ เท่ากับไม่มีการปิดเมื่อกดที่อื่นเลย
    if (พัง === 'ถอดปิดนอกการ์ด')
      await แท็บ.addInitScript(() => window.addEventListener('pointerdown', (e) => e.stopImmediatePropagation(), true))
    await เปิด(แท็บ)
    await เปิดคำภาษาเดิม(แท็บ)
    const คำแรก = await ติดป้ายคำ(แท็บ, 20, 2, 'เป้าแรก')
    const คำที่สอง = await ติดป้ายคำ(แท็บ, 21, 0, 'เป้าสอง')
    if (!คำแรก || !คำที่สอง) throw new Error('หาคำ 10:20 คำที่ 3 หรือ 10:21 คำที่ 1 บนหน้าไม่เจอ')

    // ---------------------------------------------------------------- ① ② ④ กดที่ว่าง ⇒ ปิด ⇒ โฟกัสกลับคำเดิม
    ขั้น = 'เปิดการ์ดครั้งแรก'
    await กดของ(แท็บ, ชนิด, '[data-เป้าแรก]')
    await รอการ์ด(แท็บ)
    const ว่าง = await หาที่ว่าง(แท็บ)
    if (!ว่าง) throw new Error('หาที่ว่างนอกการ์ดบนจอไม่เจอ')
    if (พัง === 'โฟกัสหลุด')
      await แท็บ.evaluate(() => window.addEventListener('click', () => setTimeout(() => document.activeElement?.blur(), 0), true))
    ขั้น = `กดที่ว่าง ${ว่าง.ที่}`
    await กดที่(แท็บ, ชนิด, ว่าง.x, ว่าง.y)
    await แท็บ.waitForTimeout(300)
    if (await มีการ์ด(แท็บ)) ตก.push(`${ป้าย} ⇒ ① กดที่ว่างนอกการ์ด (${ว่าง.ที่}) แล้วการ์ด ⛔ ไม่ปิด`)
    else {
      const โฟกัส = await ตัวที่โฟกัส(แท็บ)
      if (โฟกัส !== คำแรก) ตก.push(`${ป้าย} ⇒ ④ ปิดด้วยการกดที่อื่นแล้วโฟกัส ⛔ ไม่ได้กลับคำเดิม ${คำแรก} ⇒ ได้ ${โฟกัส}`)
    }

    if (หยุดหลัง('กดที่ว่าง')) return ตก

    // ---------------------------------------------------------------- ② กดปุ่ม *เทียบ* ตอนการ์ดเปิด ⇒ ปิด ⇒ ⛔ เมนูไม่กาง
    ขั้น = 'เปิดการ์ดก่อนกดปุ่มเทียบ'
    await กดของ(แท็บ, ชนิด, '[data-เป้าแรก]')
    await รอการ์ด(แท็บ)
    const ปุ่มเทียบ = ปุ่มเทียบของหน้า(แท็บ)
    await ปุ่มเทียบ.evaluate((b) => {
      b.setAttribute('data-ปุ่มทดสอบ', '1')
      window.__ปุ่มได้ยิน = 0
      b.addEventListener('click', () => window.__ปุ่มได้ยิน++)
    })
    if (พัง === 'กดทะลุ')
      // ⇒ จำลองว่าการกดหลุดไปถึงปุ่มข้างใต้ ⇒ ส่งคลิกต่อให้ปุ่มนั้นเองหลังการ์ดปิด
      await แท็บ.evaluate(() =>
        window.addEventListener(
          'click',
          (e) => {
            const ป = e.target.closest?.('[data-ปุ่มทดสอบ]')
            if (ป && e.detail) setTimeout(() => ป.click(), 0)
          },
          true,
        ),
      )
    ขั้น = 'กดปุ่มเทียบตอนการ์ดเปิด'
    await กดของ(แท็บ, ชนิด, '[data-ปุ่มทดสอบ]')
    await แท็บ.waitForTimeout(400)
    const หลังกดปุ่ม = await แท็บ.evaluate(() => ({
      การ์ด: !!document.querySelector('[data-การ์ดคำ]'),
      เมนู: !!document.querySelector('.pk-เมนู'),
      ได้ยิน: window.__ปุ่มได้ยิน,
    }))
    if (หลังกดปุ่ม.การ์ด) ตก.push(`${ป้าย} ⇒ ① กดปุ่ม เทียบ นอกการ์ดแล้วการ์ด ⛔ ไม่ปิด`)
    if (หลังกดปุ่ม.เมนู || หลังกดปุ่ม.ได้ยิน)
      ตก.push(`${ป้าย} ⇒ ② การกดที่ปิดการ์ดทะลุไปถึงปุ่ม เทียบ ⇒ เมนูกาง ${หลังกดปุ่ม.เมนู} · ปุ่มได้ยิน ${หลังกดปุ่ม.ได้ยิน} ครั้ง`)
    if (หลังกดปุ่ม.เมนู) {
      await แท็บ.keyboard.press('Escape')
      await แท็บ.waitForTimeout(200)
    }

    if (หยุดหลัง('กดปุ่ม')) return ตก

    // ---------------------------------------------------------------- ③ ⑥ เลื่อนหน้า · เลื่อนในการ์ด ⇒ ⛔ ไม่ปิด ⇒ ปุ่มปิดยังเห็น
    ขั้น = 'เปิดการ์ดก่อนเลื่อน'
    if (await มีการ์ด(แท็บ)) {
      await แท็บ.keyboard.press('Escape')
      await แท็บ.waitForTimeout(200)
    }
    await กดของ(แท็บ, ชนิด, '[data-เป้าแรก]')
    await รอการ์ด(แท็บ)
    if (พัง === 'ปิดตอนเลื่อน')
      await แท็บ.evaluate(() =>
        window.addEventListener('scroll', () => document.querySelector('[data-การ์ดคำ] .pk-ปุ่มปิดการ์ด')?.click(), true),
      )
    const cdp = ชนิด.hasTouch ? await ctx.newCDPSession(แท็บ) : null
    /** เลื่อนแบบของจอนั้น ⇒ จอสัมผัสลากนิ้ว · จอกว้างหมุนล้อเมาส์ ⇒ `dy` บวก = เนื้อเลื่อนขึ้น (อ่านต่อลงไป) */
    const เลื่อนที่ = async (x, y, dy) => {
      if (cdp) {
        // ⭐ แตะ ⇒ ลากทีละ 10 ก้าว ⇒ ยกนิ้ว ⇒ เบราว์เซอร์ยกเลิกการกด (`pointercancel`) แล้วเลื่อนเอง ⇒ ลำดับเดียวกับนิ้วจริง
        //   ⇒ ⛔ ไม่ใช้ `Input.synthesizeScrollGesture` ⇒ ลองแล้ว (31 ต.ค. 2569) เบราว์เซอร์แบบไม่มีจอ ⛔ ไม่เลื่อนให้
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
        for (let i = 1; i <= 10; i++) {
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - (dy * i) / 10 }] })
          await แท็บ.waitForTimeout(16)
        }
        // ⭐ นิ้วค้างนิ่งก่อนยก ⇒ ⛔ ไม่ปัดส่ง ⇒ หน้าไม่ไหลต่อ (fling)
        //   ⇒ ปัดส่งแล้วแตะต่อทันที เบราว์เซอร์ใช้แตะนั้น *หยุดการไหล* ⛔ ไม่เกิด `click` ⇒ เจอเองตอนเขียนด่านนี้ (31 ต.ค. 2569)
        //     ⇒ ไหลชนท้ายการ์ดแล้วตำแหน่งไม่ขยับ แต่เบราว์เซอร์ยังถือว่ากำลังไหล ⇒ `รอนิ่ง` ดูจากตำแหน่งจึงจับไม่ได้
        for (let i = 0; i < 6; i++) {
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - dy }] })
          await แท็บ.waitForTimeout(30)
        }
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
      } else {
        await แท็บ.mouse.move(x, y)
        await แท็บ.mouse.wheel(0, dy)
      }
      await แท็บ.waitForTimeout(200)
      await รอนิ่ง(แท็บ)
    }
    ขั้น = 'เลื่อนหน้า'
    const ว่างก่อนเลื่อน = await หาที่ว่าง(แท็บ)
    if (!ว่างก่อนเลื่อน) throw new Error('หาที่ว่างสำหรับลากเลื่อนหน้าไม่เจอ')
    const หน้าก่อน = await แท็บ.evaluate(() => window.scrollY)
    await เลื่อนที่(ว่างก่อนเลื่อน.x, ว่างก่อนเลื่อน.y, 150)
    const หน้าหลัง = await แท็บ.evaluate(() => window.scrollY)
    if (Math.abs(หน้าหลัง - หน้าก่อน) < 20) ตก.push(`${ป้าย} ⇒ ③ ลองเลื่อนหน้าแล้วหน้า ⛔ ไม่ขยับ (${หน้าก่อน} ⇒ ${หน้าหลัง}) ⇒ พิสูจน์ข้อนี้ไม่ได้`)
    if (!(await มีการ์ด(แท็บ))) throw Object.assign(new Error('③ เลื่อนหน้าแล้วการ์ดปิด'), { ข้อ: '③' })

    ขั้น = 'เลื่อนในการ์ด'
    const ในการ์ด = await แท็บ.evaluate(() => {
      const ก = document.querySelector('[data-การ์ดคำ]')
      const r = ก.getBoundingClientRect()
      return { x: r.left + r.width / 2, y: r.top + r.height * 0.6, ยาวเกิน: ก.scrollHeight - ก.clientHeight }
    })
    if (ในการ์ด.ยาวเกิน < 100) ตก.push(`${ป้าย} ⇒ ③ การ์ดยาวเกินแผ่นแค่ ${ในการ์ด.ยาวเกิน} จุด ⇒ ทดสอบการเลื่อนในการ์ดไม่ได้`)
    // ⭐ ลากหลายรอบจนถึงท้ายการ์ด ⇒ ⑥ ต้องวัดตอนเลื่อนลงไปสุดแล้ว
    for (let i = 0; i < 12; i++) {
      await เลื่อนที่(ในการ์ด.x, ในการ์ด.y, 400)
      if (!(await มีการ์ด(แท็บ))) break
      const สุด = await แท็บ.evaluate(() => {
        const ก = document.querySelector('[data-การ์ดคำ]')
        return ก.scrollTop + ก.clientHeight >= ก.scrollHeight - 2
      })
      if (สุด) break
    }
    if (!(await มีการ์ด(แท็บ))) throw Object.assign(new Error('③ เลื่อนในการ์ดแล้วการ์ดปิด'), { ข้อ: '③' })
    const ท้าย = await แท็บ.evaluate(() => {
      const ก = document.querySelector('[data-การ์ดคำ]')
      return { scrollTop: ก.scrollTop, สุด: ก.scrollTop + ก.clientHeight >= ก.scrollHeight - 2 }
    })
    if (!ท้าย.scrollTop) ตก.push(`${ป้าย} ⇒ ③ ลองเลื่อนในการ์ดแล้วการ์ด ⛔ ไม่ขยับ ⇒ พิสูจน์ข้อนี้ไม่ได้`)
    if (!ท้าย.สุด) ตก.push(`${ป้าย} ⇒ ⑥ เลื่อนในการ์ด 12 รอบแล้วยัง ⛔ ไม่ถึงท้ายการ์ด`)

    // ⑥ ปุ่มปิดเห็นทั้งปุ่ม ⇒ อยู่ในกรอบการ์ดที่ตาเห็น และจุดกลางคือปุ่มนั้นเอง
    if (พัง === 'ปุ่มปิดหลุด') {
      await แท็บ.addStyleTag({ content: '.pk-การ์ดคำ > .pk-หัวการ์ด{position:static!important}' })
      await แท็บ.waitForTimeout(200)
    }
    const ปุ่มปิด = await แท็บ.evaluate(() => {
      const ก = document.querySelector('[data-การ์ดคำ]').getBoundingClientRect()
      const ป = document.querySelector('[data-การ์ดคำ] .pk-ปุ่มปิดการ์ด').getBoundingClientRect()
      const ใน = ป.top >= ก.top - 0.5 && ป.bottom <= ก.bottom + 0.5 && ป.top >= 0 && ป.bottom <= window.innerHeight
      const e = document.elementFromPoint(ป.left + ป.width / 2, ป.top + ป.height / 2)
      return { ใน, ตรงจุด: !!e?.closest('.pk-ปุ่มปิดการ์ด'), ปุ่ม: Math.round(ป.top), การ์ด: Math.round(ก.top) }
    })
    if (!ปุ่มปิด.ใน || !ปุ่มปิด.ตรงจุด)
      ตก.push(`${ป้าย} ⇒ ⑥ เลื่อนในการ์ดถึงท้ายแล้วปุ่ม ปิด ⛔ ไม่เห็น ⇒ ปุ่มอยู่ที่ ${ปุ่มปิด.ปุ่ม} · การ์ดเริ่มที่ ${ปุ่มปิด.การ์ด} · จุดกลางเป็นปุ่ม ${ปุ่มปิด.ตรงจุด}`)

    // ⑥ ของที่ได้โฟกัส ⛔ ไม่ซุกใต้หัว ⇒ เลื่อนการ์ดให้ช่องติ๊กแหล่งแรกไปอยู่ใต้หัวพอดี แล้วโฟกัสมัน (ท่าเดียวกับ Shift+Tab ย้อนขึ้น)
    //   ⇒ เบราว์เซอร์ต้องเลื่อนการ์ดให้มันพ้นหัว ⇒ ⛔ ไม่เลื่อน = ผู้อ่านที่ใช้แป้นพิมพ์มองไม่เห็นว่าโฟกัสอยู่ไหน
    if (พัง === 'หัวบังโฟกัส') await แท็บ.addStyleTag({ content: '[data-การ์ดคำ]{scroll-padding-top:0!important}' })
    const บังโฟกัส = await แท็บ.evaluate(() => {
      const ก = document.querySelector('[data-การ์ดคำ]')
      const หัว = ก.querySelector('.pk-หัวการ์ด')
      const เป้า = ก.querySelector('.pk-เลือกแหล่ง input')
      document.activeElement?.blur()
      ก.scrollTop += เป้า.getBoundingClientRect().top - ก.getBoundingClientRect().top - 2
      เป้า.focus()
      const r = เป้า.getBoundingClientRect()
      const h = หัว.getBoundingClientRect()
      return { บัง: r.top < h.bottom - 0.5, เป้า: Math.round(r.top), หัว: Math.round(h.bottom) }
    })
    if (บังโฟกัส.บัง) ตก.push(`${ป้าย} ⇒ ⑥ ของที่ได้โฟกัสในการ์ดซุกใต้หัวการ์ด ⇒ ของเริ่มที่ ${บังโฟกัส.เป้า} · หัวจบที่ ${บังโฟกัส.หัว}`)

    if (หยุดหลัง('เลื่อน')) return ตก

    // ---------------------------------------------------------------- ⑤ กดคำอื่น ⇒ การ์ดเปลี่ยนคำ ⛔ ไม่ถูกถอดเลย
    ขั้น = 'กดคำอื่นตอนการ์ดเปิด'
    await แท็บ.evaluate(() => {
      window.__การ์ดเดิม = document.querySelector('[data-การ์ดคำ]')
      window.__การ์ดถูกถอด = 0
      new MutationObserver((ms) => {
        for (const m of ms)
          for (const n of m.removedNodes)
            if (n.nodeType === 1 && (n.matches('[data-การ์ดคำ]') || n.querySelector('[data-การ์ดคำ]'))) window.__การ์ดถูกถอด++
      }).observe(document.body, { childList: true, subtree: true })
    })
    if (พัง === 'กระพริบ')
      // ⇒ จำลองว่ากดคำอื่นแล้วการ์ดปิดก่อน แล้วค่อยเปิดใหม่ ⇒ การ์ดหายไปแวบหนึ่ง
      await แท็บ.evaluate(() =>
        window.addEventListener(
          'click',
          (e) => {
            const คำ = e.target.closest?.('[data-เป้าสอง]')
            const ปิด = document.querySelector('[data-การ์ดคำ] .pk-ปุ่มปิดการ์ด')
            if (!คำ || !ปิด || !e.detail) return
            e.stopImmediatePropagation()
            ปิด.click()
            setTimeout(() => คำ.click(), 60)
          },
          true,
        ),
      )
    await กดของ(แท็บ, ชนิด, '[data-เป้าสอง]')
    await แท็บ.waitForFunction((t) => document.querySelector('[data-การ์ดคำ] .pk-ข้อมูลคำ dd [data-คำในแถว]')?.textContent.trim() === t, คำที่สอง, {
      timeout: 15000,
    }).catch(() => {})
    const หลังสลับ = await แท็บ.evaluate(() => ({
      ถอด: window.__การ์ดถูกถอด,
      ตัวเดิม: window.__การ์ดเดิม === document.querySelector('[data-การ์ดคำ]'),
    }))
    const คำใหม่บนการ์ด = await คำบนการ์ด(แท็บ)
    if (คำใหม่บนการ์ด !== คำที่สอง) ตก.push(`${ป้าย} ⇒ ⑤ กดคำอื่นแล้วการ์ด ⛔ ไม่เปลี่ยนเป็น ${คำที่สอง} ⇒ ได้ ${คำใหม่บนการ์ด}`)
    if (หลังสลับ.ถอด || !หลังสลับ.ตัวเดิม)
      ตก.push(`${ป้าย} ⇒ ⑤ กดคำอื่นแล้วการ์ดถูกถอดออกจากหน้า ${หลังสลับ.ถอด} ครั้ง ⇒ ปิดแล้วเปิดใหม่ ⇒ กระพริบ`)

    if (หยุดหลัง('สลับคำ')) return ตก

    // ---------------------------------------------------------------- ⑦ แป้นพิมพ์ ⇒ Tab ออกได้ · Enter นอกการ์ดทำงาน · Esc ปิด
    ขั้น = 'Tab ออกจากการ์ด'
    await รอการ์ด(แท็บ)
    await แท็บ.evaluate(() => document.querySelector('[data-การ์ดคำ] h2')?.focus())
    if (พัง === 'ติดแท็บ')
      // ⇒ จำลองกับดักโฟกัส ⇒ โฟกัสหลุดจากการ์ดเมื่อไร ดึงกลับหัวการ์ด
      await แท็บ.evaluate(() => {
        const ก = document.querySelector('[data-การ์ดคำ]')
        ก.addEventListener('focusout', (e) => {
          if (!ก.contains(e.relatedTarget)) setTimeout(() => ก.querySelector('h2').focus(), 0)
        })
      })
    let ออกได้ = false
    for (let i = 0; i < 120 && !ออกได้; i++) {
      await แท็บ.keyboard.press('Tab')
      ออกได้ = await แท็บ.evaluate(() => {
        const a = document.activeElement
        return !!a && a !== document.body && !a.closest('[data-การ์ดคำ]')
      })
    }
    await แท็บ.waitForTimeout(100)
    const หลังTab = await แท็บ.evaluate(() => ({
      นอก: !!document.activeElement && document.activeElement !== document.body && !document.activeElement.closest('[data-การ์ดคำ]'),
      การ์ด: !!document.querySelector('[data-การ์ดคำ]'),
    }))
    if (!ออกได้ || !หลังTab.นอก) ตก.push(`${ป้าย} ⇒ ⑦ กด Tab 120 ครั้งแล้วโฟกัส ⛔ ไม่ออกจากการ์ด ⇒ ติดอยู่ในการ์ด`)
    if (!หลังTab.การ์ด) ตก.push(`${ป้าย} ⇒ ⑦ Tab ออกจากการ์ดแล้วการ์ดปิดเอง ⇒ การ์ด ⛔ ไม่ปิดกั้นหน้า ⇒ ควรยังเปิดอยู่`)

    // ⑦ Enter บนปุ่ม *เทียบ* ตอนการ์ดเปิด ⇒ เมนูต้องกาง ⇒ ⛔ ไม่ถูกนับเป็นการกดที่อื่น
    ขั้น = 'Enter บนปุ่มเทียบ'
    if (!(await มีการ์ด(แท็บ))) {
      await กดของ(แท็บ, ชนิด, '[data-เป้าสอง]')
      await รอการ์ด(แท็บ)
    }
    await ปุ่มเทียบ.evaluate((b) => b.focus())
    await แท็บ.keyboard.press('Enter')
    await แท็บ.waitForTimeout(300)
    const หลังEnter = await แท็บ.evaluate(() => ({ เมนู: !!document.querySelector('.pk-เมนู'), การ์ด: !!document.querySelector('[data-การ์ดคำ]') }))
    if (!หลังEnter.เมนู) ตก.push(`${ป้าย} ⇒ ⑦ กด Enter บนปุ่ม เทียบ ตอนการ์ดเปิด แล้วเมนู ⛔ ไม่กาง ⇒ แป้นพิมพ์ถูกกลืน`)
    if (!หลังEnter.การ์ด) ตก.push(`${ป้าย} ⇒ ⑦ กด Enter บนปุ่มนอกการ์ด แล้วการ์ดปิด ⇒ แป้นพิมพ์ ⛔ ไม่ใช่การกดที่อื่น`)
    // ⭐ ปิดเมนูด้วย Esc ⇒ Esc ตัวเดียวกันปิดการ์ดด้วย (ทั้งคู่ฟังแป้นที่ `document`) ⇒ จึงเปิดการ์ดใหม่ก่อนลอง Esc ของการ์ด
    await แท็บ.keyboard.press('Escape')
    await แท็บ.waitForTimeout(200)

    ขั้น = 'Esc ปิดการ์ด'
    await แท็บ.locator('[data-เป้าสอง]').focus()
    await แท็บ.keyboard.press('Enter')
    await รอการ์ด(แท็บ)
    await แท็บ.keyboard.press('Escape')
    await แท็บ.waitForTimeout(300)
    if (await มีการ์ด(แท็บ)) ตก.push(`${ป้าย} ⇒ ⑦ กด Esc แล้วการ์ดยังอยู่`)
    else {
      const โฟกัส = await ตัวที่โฟกัส(แท็บ)
      if (โฟกัส !== คำที่สอง) ตก.push(`${ป้าย} ⇒ ⑦ กด Esc แล้วโฟกัส ⛔ ไม่ได้กลับคำเดิม ${คำที่สอง} ⇒ ได้ ${โฟกัส}`)
    }
  } catch (e) {
    ตก.push(`${ป้าย} ⇒ ${e.ข้อ ?? ''} ด่านล้มระหว่างตรวจ ที่ขั้น ${ขั้น} ⇒ ${e.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ตก
}

for (const ชนิด of [จอ.แคบ, จอ.กว้าง]) {
  const ตก = await ตรวจ(ชนิด)
  ที่ตก.push(...ตก)
  console.log(`${ตก.length ? '⛔' : '✅'} ${บท.เล่ม} ${บท.บท} ${ชนิด.ป้าย}`)
  for (const x of ตก) console.log(`   ${x}`)
}

if (ทดสอบตัวเอง) {
  // ⭐ ยัดของพังทีละเรื่อง ⇒ ด่านต้องจับได้ **ทุกข้อที่มันอ้างว่าเฝ้า** ⇒ จับไม่ได้ข้อไหน = ข้อนั้นตายแล้ว
  //   ⇒ ข้อแรกคือเกณฑ์ข้อ 8 ของใบ #129 ตรงตัว ⇒ **ถอดการปิดเมื่อกดที่อื่นทิ้ง ⇒ ต้องแดงทั้ง 2 จอ**
  const พิสูจน์ = [
    { ชื่อ: '① ถอดการปิดเมื่อกดที่อื่น', พัง: 'ถอดปิดนอกการ์ด', ข้อ: '①', จอ: [จอ.แคบ, จอ.กว้าง] },
    { ชื่อ: '② การกดที่ปิดการ์ดทะลุไปถึงปุ่มข้างใต้', พัง: 'กดทะลุ', ข้อ: '②', จอ: [จอ.แคบ] },
    { ชื่อ: '③ เลื่อนแล้วการ์ดปิด', พัง: 'ปิดตอนเลื่อน', ข้อ: '③', จอ: [จอ.แคบ] },
    { ชื่อ: '④ ปิดแล้วโฟกัสหลุด', พัง: 'โฟกัสหลุด', ข้อ: '④', จอ: [จอ.แคบ] },
    { ชื่อ: '⑤ กดคำอื่นแล้วการ์ดปิดแล้วเปิดใหม่', พัง: 'กระพริบ', ข้อ: '⑤', จอ: [จอ.แคบ] },
    { ชื่อ: '⑥ หัวการ์ดไม่ติดบนสุด', พัง: 'ปุ่มปิดหลุด', ข้อ: '⑥', จอ: [จอ.แคบ] },
    { ชื่อ: '⑥ ของที่ได้โฟกัสซุกใต้หัวการ์ด', พัง: 'หัวบังโฟกัส', ข้อ: '⑥', จอ: [จอ.แคบ] },
    { ชื่อ: '⑦ กับดักโฟกัสในการ์ด', พัง: 'ติดแท็บ', ข้อ: '⑦', จอ: [จอ.กว้าง] },
  ]
  for (const { ชื่อ, พัง, ข้อ, จอ: จอที่ลอง } of พิสูจน์)
    for (const ชนิด of จอที่ลอง) {
      const ตก = await ตรวจ(ชนิด, พัง)
      const จับได้ = ตก.some((x) => x.includes(ข้อ))
      console.log(`${จับได้ ? '✅' : '⛔'} โหมดพิสูจน์ ${ชื่อ} · ${ชนิด.ป้าย} ⇒ ด่าน${จับได้ ? 'จับได้' : '⛔ จับไม่ได้'}`)
      if (!จับได้) {
        for (const x of ตก) console.log(`   ${x}`)
        ที่ตก.push(`โหมดพิสูจน์ ${ชื่อ} · ${ชนิด.ป้าย} ⇒ ยัดของพังแล้วด่าน ⛔ ไม่แดงที่ข้อ ${ข้อ} ⇒ ข้อนี้เฝ้าอะไรไม่ได้แล้ว`)
      }
    }
}

await เบราว์เซอร์.close()

if (ที่ตก.length) {
  console.log(`\n⛔ ด่านการ์ดคำปิดนอกการ์ดแดง — ${ที่ตก.length} เรื่อง`)
  for (const x of ที่ตก) console.log(`  · ${x}`)
  process.exit(1)
}
console.log(ทดสอบตัวเอง ? '\n✅ ด่านการ์ดคำปิดนอกการ์ดเขียว และยังจับของพังได้ทุกข้อ' : '\n✅ ด่านการ์ดคำปิดนอกการ์ดเขียว')
