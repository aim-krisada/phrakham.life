// ด่านตรวจ — **การ์ดความหมายคำบนหน้าจริง** (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/103)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// **ตรวจของจริงบนหน้า ⛔ ไม่ใช่ดูว่าโค้ดเขียนอะไรไว้** ⇒ เลขข้อตรงกับเกณฑ์ผ่านของใบ
//   ① (ข้อ 11) ⛔⛔ **ยังไม่กดคำ ⇒ ⛔ ห้ามมีการขอ `/api/card/` หรือ `/api/lex/` แม้แต่ครั้งเดียว**
//        ⇒ ทั้งตอนปิดชั้นคำ และตอนเปิดชั้นคำแต่ยังไม่กด ⇒ **วัดจากการจราจรจริงของเบราว์เซอร์**
//        ⇒ และ **โค้ดของการ์ดต้องมาตอนกดครั้งแรก** ⇒ กดแล้วต้องมีไฟล์ `.js` ใหม่ถูกขอ
//   ② (ข้อ 6) **กดคำด้วยเมาส์แล้วการ์ดขึ้น** ⇒ มีคำตามตัวบท · รูปพจนานุกรม · เลข Strong · รูปผันเป็นคำไทย
//   ③ (ข้อ 6.2) ⛔ **การ์ดห้ามบังคำที่กดอยู่** ⇒ ลองกับคำที่อยู่ขอบล่างจอ ⇒ กรอบคำต้องอยู่เหนือการ์ดทั้งคำ
//   ④ (ข้อ 6.1) **ปุ่มปิด กับ Esc ปิดได้ และโฟกัสต้องกลับไปที่คำเดิม**
//   ⑤ (ข้อ 6) **แป้นพิมพ์ล้วน** ⇒ กล่องคำมีจุดหยุด Tab จุดเดียว · ลูกศรเลื่อนทีละคำ · Enter เปิดการ์ด
//   ⑥ (ข้อ 6) **ของที่กดได้ ⛔ ไม่เล็กกว่า 44 จุด** ⇒ ปุ่มคำ · ปุ่มปิด · ช่องเลือกแหล่ง
//   ⑦ (ข้อ 6) **จอ 320 จุด ⇒ เปิดการ์ดแล้ว ⛔ ห้ามล้นแนวนอน**
//   ⑧ (ข้อ 8) **ตั้งต้นมี UBS กับ Strong · ติ๊กเพิ่มได้หลายแหล่ง · จำข้ามรอบการเปิดเว็บ**
//   ⑨ (ข้อ 10) **ตัวหนังสือบนการ์ดครบตามไฟล์ที่เว็บส่ง** ⇒ ทุกชิ้นข้อความต้องอยู่บนการ์ดตามลำดับ
//        ⇒ ไฟล์ที่เว็บส่งตรงกับต้นทางหรือไม่ เป็นงานของ `tools/ด่านความหมายตรงต้นทาง.py`
//   ⑩ (ข้อ 8.3) **คำที่แหล่งไม่มี ⇒ บอกตรง ๆ** ⛔ ไม่ใช่ช่องว่าง ⇒ ลองกับคำ בְּ ที่ Strong ไม่มี
//   ⑪ (ข้อ 9.1) **ทุกแหล่งบนการ์ดบอกชื่อและสัญญา** ⇒ และลิงก์ดูเครดิตต้องไปถึงหมุดที่มีจริงในหน้าแหล่งข้อมูล
//   ⑫ **axe-core ระดับ AA ตอนการ์ดเปิดอยู่** ⇒ ด่านการเข้าถึงตัวกลาง ⛔ ไม่เคยกดคำ จึง ⛔ ไม่เคยเห็นการ์ด
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านการ์ดคำบนหน้า.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพังเข้าไปเองทีละเรื่อง ⇒ ① ③ ④ ⑥ ⑨ ต้องจับได้ **ครบทุกข้อ**
//
//   node tools/ด่านการ์ดคำบนหน้า.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import { createRequire } from 'node:module'
import { เส้นทางเว็บ, ปุ่มเทียบของหน้า, เปิดคำเดิม, ปุ่มปิดคำเดิม } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const ที่ตก = []

/** มาระโก 10 คือบทที่ใบสั่งให้ทดสอบ (ข้อ 12) · ปฐมกาล 1 คือบทฮีบรูที่มีคำ בְּ เป็นคำแรก */
const บทกรีก = { เล่ม: 'MRK', บท: 10 }
const บทฮีบรู = { เล่ม: 'GEN', บท: 1 }

const เบราว์เซอร์ = await chromium.launch()

async function เปิด(แท็บ, ทาง) {
  await แท็บ.goto(`${ฐาน}${ทาง}`, { waitUntil: 'domcontentloaded' })
  await แท็บ.waitForSelector('article.pk-เนื้อ h1')
  await แท็บ.waitForFunction(() => document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
  await แท็บ.waitForTimeout(300)
}

async function ตั้งคำภาษาเดิม(แท็บ, ติ๊กไว้) {
  // ⭐ ใบ #109 ข้อ 10 ⇒ ช่องย้ายมาอยู่ในเมนู *เทียบ* (ชื่อเดิม *คอลัมน์* ⇒ ใบ #113) ⇒ ท่าหาปุ่มอยู่ที่ `tools/หน้าที่ตรวจ.mjs`
  // ⭐ ใบ #125 ข้อ 11.6 · 11.7 ⇒ เปิดด้วยปุ่ม + ในเมนู · ปิดด้วย × บนหัวคอลัมน์ ⇒ ท่าหาปุ่มอยู่ที่ `tools/หน้าที่ตรวจ.mjs`
  if (ติ๊กไว้) {
    // ⭐ ใบ #161 ⇒ ปุ่ม *เพิ่มคอลัมน์* แล้วเลือกตัวบทที่ช่องเลือกฉบับ ⇒ ⚠️ ของเดิมติ๊กช่องคำภาษาเดิม ⇒ ท่าอยู่ที่ `tools/หน้าที่ตรวจ.mjs`
    await เปิดคำเดิม(แท็บ)
  } else if (await แท็บ.locator('.pk-ชั้นคำ, .pk-ชื่อคำเดิม').count()) {
    // ⭐ ปิดเฉพาะตอนเปิดอยู่จริง ⇒ เหมือนการติ๊กออกช่องที่ติ๊กออกอยู่แล้วของเดิม ⇒ ⛔ ไม่ล้มเพราะหา × ไม่เจอ
    await ปุ่มปิดคำเดิม(แท็บ).click()
  }
  await แท็บ.waitForSelector(ติ๊กไว้ ? '.pk-ชั้นคำ .pk-คำ' : 'body')
  await แท็บ.waitForTimeout(300)
}

/** รอให้การ์ดโหลดครบทุกแหล่งที่เลือก ⇒ ทุกส่วนต้องมีเนื้อ หรือบอกว่าไม่มี */
async function รอการ์ดครบ(แท็บ) {
  await แท็บ.waitForSelector('[data-การ์ดคำ] .pk-ข้อมูลคำ', { timeout: 15000 })
  await แท็บ.waitForFunction(
    () =>
      [...document.querySelectorAll('[data-การ์ดคำ] [data-แหล่ง]')].every((s) =>
        s.querySelector('[data-เนื้อ], [data-ไม่มี], .pk-เตือน'),
      ),
    null,
    { timeout: 15000 },
  )
  await แท็บ.waitForTimeout(200)
}

/**
 * ⭐ ติดป้าย `data-เป้า` ให้คำที่จะกด ⇒ ข้อ 20 ของบทนั้น คำที่ `ลำดับ` (นับจาก 0)
 *   ⇒ **กลางบท ⛔ ไม่ใช่ข้อ 1** ⇒ เลื่อนคำข้อ 1 ลงขอบล่างจอแล้วหัวจอจะแตะต้นบท ⇒ หน้าอ่านต่อบทก่อนหน้าเข้ามา
 *     ⇒ ของทั้งหน้าเลื่อนลงใต้นิ้ว ⇒ กดพลาดคำ (เจอเองตอนเขียนด่านนี้ 24 ต.ค. 2569)
 */
async function ติดป้ายเป้า(แท็บ, บท, ข้อ, ลำดับ, ชื่อป้าย) {
  return แท็บ.evaluate(
    ([บท, ข้อ, ลำดับ, ชื่อป้าย]) => {
      // ⭐ จอแคบ ⇒ คำของบทอยู่ใต้แต่ละแถว ⇒ หลายกล่องที่ชื่อเดียวกัน (ใบ #124) ⇒ หาในทุกกล่องของบท ⛔ ไม่ใช่แค่กล่องแรก
      const ก้อน = [...document.querySelectorAll('.pk-ชั้นคำ')].filter((s) => s.getAttribute('aria-label')?.endsWith(` ${บท}`))
      const แถว = ก้อน.flatMap((g) => [...g.querySelectorAll('.pk-ข้อคำ')]).find(
        // ⭐ หาด้วยป้าย `data-ข้อเดิม` (บท:ข้อ เต็มเสมอ) ⛔ ไม่แกะตัวหนังสือที่ตาเห็น ⇒ ใบ #117 ให้เลขบทขึ้นเฉพาะข้อที่ต่างบท
        (p) => p.getAttribute('data-ข้อเดิม') === `${บท}:${ข้อ}`,
      )
      const ปุ่ม = แถว?.querySelectorAll('.pk-คำ')[ลำดับ]
      if (!ปุ่ม) return null
      ปุ่ม.setAttribute(`data-${ชื่อป้าย}`, '1')
      return ปุ่ม.textContent
    },
    [บท, ข้อ, ลำดับ, ชื่อป้าย],
  )
}

/** ⭐ เลื่อนคำให้ไปอยู่ **ขอบล่างจอ** แล้วกดด้วยเมาส์ตรงพิกัด ⇒ กรณีที่การ์ดมีโอกาสบังมากที่สุด */
async function กดคำที่ขอบล่าง(แท็บ, ตัวเลือก) {
  const คำ = แท็บ.locator(ตัวเลือก)
  // ⭐ ขอบล่างที่ผู้อ่านเห็นจริง = **ขอบบนของแถบล่าง** (ปุ่มฟังกับลูกศรบท) ⛔ ไม่ใช่ขอบจอ
  await คำ.evaluate((e) => {
    const r = e.getBoundingClientRect()
    const ล่าง = document.querySelector('.pk-แถบล่าง')?.getBoundingClientRect().top ?? window.innerHeight
    window.scrollBy(0, r.bottom - ล่าง + 4)
  })
  await แท็บ.waitForTimeout(500)
  const ก = await คำ.boundingBox()
  // ⛔ จุดที่จะกดต้องเป็นปุ่มคำนั้นจริง ⇒ ⛔ ไม่ใช่ของอื่นที่ลอยทับอยู่ เช่นแถบล่าง ⇒ ไม่ใช่ก็บอกตรง ๆ
  const ทับ = await แท็บ.evaluate(
    ([x, y]) => {
      const e = document.elementFromPoint(x, y)
      return e?.closest('.pk-คำ') ? '' : `${e?.tagName}.${e?.className}`
    },
    [ก.x + ก.width / 2, ก.y + ก.height / 2],
  )
  if (ทับ) throw new Error(`จุดที่จะกดคำถูก ${ทับ} ทับอยู่`)
  await แท็บ.mouse.click(ก.x + ก.width / 2, ก.y + ก.height / 2)
}

const ปกติ = (s) => s.replace(/\s+/g, ' ').trim()

/**
 * ⑫ axe-core **ตอนการ์ดเปิดอยู่** ⇒ ด่านการเข้าถึงตัวกลาง (`tools/ด่านการเข้าถึง.mjs`) ⛔ ไม่เคยกดคำ
 *   ⇒ ⛔ ไม่มีข้อนี้ = ไม่มีใครเอา axe มาส่องการ์ดเลย ⇒ ชุดป้ายกับกฎเพิ่มยกมาจากด่านตัวกลางทั้งดุ้น
 */
const ที่อยู่axe = createRequire(import.meta.url).resolve('axe-core/axe.min.js')
async function ตรวจaxe(แท็บ, ป้าย) {
  await แท็บ.addScriptTag({ path: ที่อยู่axe })
  const ผิด = await แท็บ.evaluate(() =>
    window.axe
      .run({ include: [['[data-การ์ดคำ]'], ['.pk-ชั้นคำ']] }, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'] },
        rules: { 'label-content-name-mismatch': { enabled: true } },
      })
      .then((r) => r.violations.map((v) => `${v.id} ×${v.nodes.length} ${v.nodes[0]?.target.join(' ')}`)),
  )
  return ผิด.map((x) => `${ป้าย} ⇒ ⑫ axe ⇒ ${x}`)
}

/** ของที่หลังบ้านส่งจริง ⇒ ⛔ ขอจาก Node ตรง ๆ ⛔ ไม่ผ่านแท็บ ⇒ ดักแก้ในแท็บแล้วด่านยังเห็นของจริง */
async function ขอไฟล์(ทาง) {
  const r = await fetch(`${ฐาน}/${ทาง}`)
  return r.ok ? r.json() : null
}

async function ตรวจกรีก(พัง = {}) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: 320, height: 720 } })
  const แท็บ = await ctx.newPage()
  const ป้าย = `${บทกรีก.เล่ม} ${บทกรีก.บท}`
  const ตก = []
  const ขอ = []
  แท็บ.on('request', (r) => ขอ.push(r.url()))
  let ขั้น = 'เริ่ม'
  const ขอของการ์ด = () => ขอ.filter((u) => u.includes('/api/card/') || u.includes('/api/lex/'))

  if (พัง.แก้ความหมาย) {
    // ⇒ จำลองว่าหน้าจอแสดงตัวหนังสือที่ ⛔ ไม่ตรงกับไฟล์ ⇒ ⑨ ต้องจับได้
    // ⭐ ดักที่บริบท ⛔ ที่แท็บ ⇒ หน้าที่ตัวช่วยออฟไลน์ (`public/sw.js`) คุมอยู่ ⇒ คำขอผ่านตัวช่วย ⇒ `page.route` ⛔ เห็น (เอกสาร Playwright)
    await ctx.route('**/api/lex/strong-grc/**', async (route) => {
      const r = await route.fetch()
      const ของ = await r.json()
      for (const ร of Object.values(ของ.คำ))
        for (const x of ร) x.ชิ้น = x.ชิ้น.map((c) => (typeof c === 'string' ? c.replace(/e/g, '3') : c))
      await route.fulfill({ response: r, json: ของ })
    })
  }

  try {
    await เปิด(แท็บ, `/read/${บทกรีก.เล่ม}?c=${บทกรีก.บท}`)
    if (พัง.หยิบก่อนกด) await แท็บ.evaluate((u) => fetch(u), `${ฐาน}/api/lex/strong-grc/4.json`)
    await แท็บ.waitForTimeout(500)
    // ① ปิดชั้นคำอยู่ ⇒ ⛔ ห้ามขออะไรของการ์ดเลย
    if (ขอของการ์ด().length) ตก.push(`${ป้าย} ⇒ ① ยังไม่เปิดชั้นคำ แต่เว็บขอของการ์ดไปแล้ว ${ขอของการ์ด().length} ครั้ง`)
    await ตั้งคำภาษาเดิม(แท็บ, true)
    await แท็บ.waitForTimeout(600)
    if (ขอของการ์ด().length) ตก.push(`${ป้าย} ⇒ ① เปิดชั้นคำแต่ยังไม่กดคำ แต่เว็บขอของการ์ดไปแล้ว ${ขอของการ์ด().length} ครั้ง`)
    const jsก่อนกด = new Set(ขอ.filter((u) => /\.js(\?|$)/.test(u)))

    // ⑤ จุดหยุด Tab ⇒ ในกล่องคำกล่องแรกต้องมี `tabindex=0` ตัวเดียว
    const จุดหยุด = await แท็บ.evaluate(
      () => document.querySelector('.pk-ชั้นคำ .pk-กล่องคำ').querySelectorAll('.pk-คำ[tabindex="0"]').length,
    )
    if (จุดหยุด !== 1) ตก.push(`${ป้าย} ⇒ ⑤ กล่องคำมีจุดหยุด Tab ${จุดหยุด} จุด ⛔ ควรมี 1`)

    // ⑥ ปุ่มคำทุกตัวในกล่องแรก ⇒ ⛔ เล็กกว่า 44 ไม่ได้
    if (พัง.ปุ่มเล็ก)
      await แท็บ.addStyleTag({ content: '.pk-คำ{min-width:0!important;min-height:0!important;padding:0!important}' })
    const เล็ก = await แท็บ.evaluate(() =>
      [...document.querySelectorAll('.pk-ชั้นคำ .pk-คำ')]
        .slice(0, 200)
        .map((e) => e.getBoundingClientRect())
        .filter((r) => r.width < 44 || r.height < 44).length,
    )
    if (เล็ก) ตก.push(`${ป้าย} ⇒ ⑥ ปุ่มคำเล็กกว่า 44 จุด ${เล็ก} ตัว`)

    // ② กดคำกลางบท (มาระโก 10:20 คำที่ 3) ด้วยเมาส์ ⇒ ③ ต้อง ⛔ ไม่ถูกการ์ดบัง
    //   ⇒ ค่าที่ควรเห็นบนการ์ด **อ่านจากไฟล์ที่เว็บส่งจริง** ⛔ ไม่พิมพ์คำตอบไว้ในด่าน
    if (พัง.บังคำ)
      await แท็บ.addStyleTag({
        content: '.pk-คำ{scroll-margin-bottom:0!important}.pk-หน้าอ่าน.pk-มีการ์ด{padding-bottom:0!important}',
      })
    const คำของบท = await ขอไฟล์(`api/words/${บทกรีก.เล่ม}/${บทกรีก.บท}.json`)
    const การ์ดของบท = await ขอไฟล์(`api/card/${บทกรีก.เล่ม}/${บทกรีก.บท}.json`)
    const [ตัวที่ควร] = คำของบท.ชั้น.คำกรีก['20'][2]
    const [ตัวถัดไป] = คำของบท.ชั้น.คำกรีก['20'][3]
    const [รูปที่ควร, รหัสที่ควร, รูปผันที่ควร] = การ์ดของบท.ชั้น.คำกรีก['20'][2].split('~')
    if (!(await ติดป้ายเป้า(แท็บ, บทกรีก.บท, 20, 2, 'เป้า'))) throw new Error('หาคำ 10:20 คำที่ 3 บนหน้าไม่เจอ')
    const ตัวเลือกคำ = '[data-เป้า]'
    ขั้น = 'กดคำที่ขอบล่าง'
    await กดคำที่ขอบล่าง(แท็บ, ตัวเลือกคำ)
    await รอการ์ดครบ(แท็บ)
    const jsหลังกด = ขอ.filter((u) => /\.js(\?|$)/.test(u) && !jsก่อนกด.has(u))
    if (!jsหลังกด.length) ตก.push(`${ป้าย} ⇒ ① กดคำแล้ว ⛔ ไม่มีโค้ดใหม่ถูกโหลด ⇒ โค้ดของการ์ดมากับหน้าตั้งแต่แรก`)

    const ข้อมูล = await แท็บ.evaluate(() => {
      const ก = document.querySelector('[data-การ์ดคำ]')
      const dl = Object.fromEntries(
        [...ก.querySelectorAll('.pk-ข้อมูลคำ > div')].map((d) => [d.querySelector('dt').textContent.trim(), (d.querySelector('dd [data-คำในแถว]') ?? d.querySelector('dd')).textContent.trim()]),
      )
      return { dl, โฟกัสในการ์ด: ก.contains(document.activeElement), บทบาท: ก.getAttribute('role') }
    })
    if (ข้อมูล.บทบาท !== 'dialog') ตก.push(`${ป้าย} ⇒ ② การ์ด ⛔ ไม่มี role=dialog`)
    if (ข้อมูล.dl['คำตามตัวบท'] !== ตัวที่ควร) ตก.push(`${ป้าย} ⇒ ② คำตามตัวบทบนการ์ดเป็น ${ข้อมูล.dl['คำตามตัวบท']} ⛔ ควรเป็น ${ตัวที่ควร}`)
    if (ข้อมูล.dl['รูปพจนานุกรม'] !== รูปที่ควร) ตก.push(`${ป้าย} ⇒ ② รูปพจนานุกรมเป็น ${ข้อมูล.dl['รูปพจนานุกรม']} ⛔ ควรเป็น ${รูปที่ควร}`)
    if (!ข้อมูล.dl['เลข Strong']?.startsWith(`G${รหัสที่ควร.replace(/^0+/, '')}`))
      ตก.push(`${ป้าย} ⇒ ② เลข Strong เป็น ${ข้อมูล.dl['เลข Strong']} ⛔ ควรเป็น G${รหัสที่ควร}`)
    if (!/[฀-๿]/.test(ข้อมูล.dl['รูปผัน'] ?? '') || !ข้อมูล.dl['รูปผัน'].includes(รูปผันที่ควร))
      ตก.push(`${ป้าย} ⇒ ② รูปผัน ${รูปผันที่ควร} ⛔ ไม่ได้แปลเป็นคำไทย ⇒ ${ข้อมูล.dl['รูปผัน']}`)
    if (!ข้อมูล.โฟกัสในการ์ด) ตก.push(`${ป้าย} ⇒ ② เปิดการ์ดแล้วโฟกัส ⛔ ไม่ได้ย้ายเข้าการ์ด`)

    // ③ คำที่กดต้องอยู่เหนือการ์ดทั้งคำ
    const บัง = await แท็บ.evaluate(() => {
      const คำ = document.querySelector('.pk-คำที่เปิด').getBoundingClientRect()
      const ก = document.querySelector('[data-การ์ดคำ]').getBoundingClientRect()
      const ทับแนวนอน = คำ.left < ก.right && ก.left < คำ.right
      return { บัง: ทับแนวนอน && คำ.bottom > ก.top + 0.5, คำ: Math.round(คำ.bottom), การ์ด: Math.round(ก.top), พ้นจอบน: คำ.top < 0 }
    })
    if (บัง.บัง) ตก.push(`${ป้าย} ⇒ ③ การ์ดบังคำที่กด ⇒ คำจบที่ ${บัง.คำ} แต่การ์ดเริ่มที่ ${บัง.การ์ด}`)
    if (บัง.พ้นจอบน) ตก.push(`${ป้าย} ⇒ ③ เลื่อนคำพ้นการ์ดจนคำหลุดขอบบนจอ`)

    // ⑦ จอ 320 เปิดการ์ด ⇒ ⛔ ห้ามล้นแนวนอน
    const ล้น = await แท็บ.evaluate(() => {
      const ก = document.querySelector('[data-การ์ดคำ]')
      return Math.max(document.documentElement.scrollWidth - document.documentElement.clientWidth, ก.scrollWidth - ก.clientWidth)
    })
    if (ล้น > 1) ตก.push(`${ป้าย} ⇒ ⑦ จอ 320 เปิดการ์ดแล้วล้นแนวนอน ${ล้น} จุด`)

    // ⑥ ปุ่มปิดกับช่องเลือกแหล่ง ⇒ ⛔ เล็กกว่า 44 ไม่ได้
    const ขนาดในการ์ด = await แท็บ.evaluate(() =>
      [...document.querySelectorAll('[data-การ์ดคำ] .pk-ปุ่มปิดการ์ด, [data-การ์ดคำ] .pk-ช่องแหล่ง')]
        .map((e) => e.getBoundingClientRect())
        .filter((r) => r.height < 44 || r.width < 44).length,
    )
    if (ขนาดในการ์ด) ตก.push(`${ป้าย} ⇒ ⑥ ปุ่มในการ์ดเล็กกว่า 44 จุด ${ขนาดในการ์ด} ตัว`)

    // ⑧ ตั้งต้น ⇒ UBS กับ Strong
    const แหล่งที่เห็น = await แท็บ.evaluate(() => [...document.querySelectorAll('[data-การ์ดคำ] [data-แหล่ง]')].map((s) => s.dataset.แหล่ง))
    if (แหล่งที่เห็น.join(',') !== 'ubs,strong') ตก.push(`${ป้าย} ⇒ ⑧ ค่าตั้งต้นของแหล่งเป็น [${แหล่งที่เห็น}] ⛔ ควรเป็น UBS กับ Strong`)

    // ⑪ ทุกแหล่งบอกชื่อและสัญญา
    const ป้ายแหล่ง = await แท็บ.evaluate(() =>
      [...document.querySelectorAll('[data-การ์ดคำ] [data-แหล่ง]')].map((s) => ({
        ชื่อ: s.querySelector('h3')?.textContent.trim(),
        สัญญา: s.querySelector('.pk-ที่มาในการ์ด')?.textContent ?? '',
        หมุด: [...s.querySelectorAll('.pk-ที่มาในการ์ด a')].map((a) => a.getAttribute('href')).find((h) => h.includes('#')),
      })),
    )
    for (const x of ป้ายแหล่ง) {
      if (!x.ชื่อ || !/สัญญา\s*\S/.test(x.สัญญา)) ตก.push(`${ป้าย} ⇒ ⑪ แหล่ง ${x.ชื่อ} ⛔ ไม่บอกชื่อหรือสัญญา`)
      if (!x.หมุด) ตก.push(`${ป้าย} ⇒ ⑪ แหล่ง ${x.ชื่อ} ⛔ ไม่มีลิงก์ไปหน้าแหล่งข้อมูล`)
    }

    // ⑫ axe ตอนการ์ดเปิด ⇒ ทั้งการ์ดและกล่องคำที่กลายเป็นปุ่ม
    ตก.push(...(await ตรวจaxe(แท็บ, ป้าย)))

    // ⑨ ตัวหนังสือบนการ์ดครบตามไฟล์ที่เว็บส่ง ⇒ ทุกชิ้นข้อความต้องอยู่บนการ์ดตามลำดับ
    const กุญแจ = รหัสที่ควร.replace(/^0+/, '')
    const ก้อน = await ขอไฟล์(`api/lex/strong-grc/${Math.floor(Number(กุญแจ) / 100)}.json`)
    const ชิ้น = ก้อน?.คำ?.[กุญแจ]?.[0]?.ชิ้น ?? []
    const ข้อความ = ชิ้น
      .map((c) => (typeof c === 'string' ? c : ['เลข', 'นิยาม', 'หัว', 'นับ'].includes(c[0]) ? c[1] : ''))
      .map(ปกติ)
      .filter(Boolean)
    const บนการ์ด = ปกติ(
      await แท็บ.evaluate(() => document.querySelector('[data-การ์ดคำ] [data-แหล่ง="strong"] [data-เนื้อ]')?.textContent ?? ''),
    )
    let ที่ = 0
    const หาย = []
    for (const x of ข้อความ) {
      const i = บนการ์ด.indexOf(x, ที่)
      if (i < 0) หาย.push(x)
      else ที่ = i + x.length
    }
    if (!ข้อความ.length) ตก.push(`${ป้าย} ⇒ ⑨ ⛔ หาไฟล์ Strong G${กุญแจ} ไม่เจอ`)
    if (หาย.length) ตก.push(`${ป้าย} ⇒ ⑨ ตัวหนังสือบนการ์ดไม่ครบตามไฟล์ ${หาย.length} ชิ้น ⇒ เช่น ${หาย[0].slice(0, 50)}`)

    // ④ ปุ่มปิด ⇒ การ์ดหาย · โฟกัสกลับคำเดิม
    if (พัง.โฟกัสหลุด)
      await แท็บ.evaluate(() =>
        document.addEventListener('click', () => setTimeout(() => document.activeElement?.blur(), 0), true),
      )
    ขั้น = 'ปุ่มปิด'
    // ⭐ ใบ #125 ข้อ 11.5 ⇒ หัวคอลัมน์คำภาษาเดิมมีปุ่ม *ปิดคอลัมน์คำภาษาเดิม* แล้ว ⇒ หาปุ่มปิด *ในการ์ด* ⛔ ไม่ใช่ทั้งหน้า
    await แท็บ.locator('[data-การ์ดคำ]').getByRole('button', { name: /^ปิด/ }).click()
    await แท็บ.waitForTimeout(300)
    const หลังปิด = await แท็บ.evaluate(() => ({
      การ์ด: !!document.querySelector('[data-การ์ดคำ]'),
      โฟกัส: document.activeElement?.classList.contains('pk-คำ') ? document.activeElement.textContent : null,
    }))
    if (หลังปิด.การ์ด) ตก.push(`${ป้าย} ⇒ ④ กดปุ่มปิดแล้วการ์ดยังอยู่`)
    if (!หลังปิด.โฟกัส?.startsWith(ตัวที่ควร)) ตก.push(`${ป้าย} ⇒ ④ ปิดการ์ดแล้วโฟกัส ⛔ ไม่ได้กลับคำเดิม ⇒ ได้ ${หลังปิด.โฟกัส}`)

    // ⑤ แป้นพิมพ์ล้วน ⇒ ลูกศรขวาไปคำถัดไป · Enter เปิด · Esc ปิดแล้วโฟกัสกลับคำนั้น
    ขั้น = 'ลูกศรขวา'
    await แท็บ.keyboard.press('ArrowRight')
    const ถัดไป = await แท็บ.evaluate(() => document.activeElement?.textContent ?? '')
    if (!ถัดไป.startsWith(ตัวถัดไป)) ตก.push(`${ป้าย} ⇒ ⑤ กดลูกศรขวาแล้วโฟกัสไปที่ ${ถัดไป} ⛔ ควรเป็น ${ตัวถัดไป}`)
    await แท็บ.keyboard.press('Enter')
    await รอการ์ดครบ(แท็บ)
    const หัว = await แท็บ.evaluate(() => document.activeElement?.closest('[data-การ์ดคำ]') !== null)
    if (!หัว) ตก.push(`${ป้าย} ⇒ ⑤ กด Enter แล้วโฟกัส ⛔ ไม่ได้เข้าการ์ด`)
    await แท็บ.keyboard.press('Escape')
    await แท็บ.waitForTimeout(300)
    const หลังEsc = await แท็บ.evaluate(() => ({
      การ์ด: !!document.querySelector('[data-การ์ดคำ]'),
      โฟกัส: document.activeElement?.textContent ?? '',
    }))
    if (หลังEsc.การ์ด) ตก.push(`${ป้าย} ⇒ ④ กด Esc แล้วการ์ดยังอยู่`)
    if (!หลังEsc.โฟกัส.startsWith(ตัวถัดไป)) ตก.push(`${ป้าย} ⇒ ④ กด Esc แล้วโฟกัส ⛔ ไม่ได้กลับคำเดิม ⇒ ได้ ${หลังEsc.โฟกัส.slice(0, 20)}`)

    // ⑧ ติ๊ก Abbott-Smith เพิ่ม ⇒ โหลดหน้าใหม่ ⇒ ต้องยังติ๊กอยู่และขึ้นบนการ์ด
    await แท็บ.keyboard.press('Enter')
    await รอการ์ดครบ(แท็บ)
    ขั้น = 'ติ๊ก Abbott-Smith'
    await แท็บ.getByRole('checkbox', { name: 'Abbott-Smith' }).check()
    await แท็บ.waitForSelector('[data-การ์ดคำ] [data-แหล่ง="abbott-smith"] [data-เนื้อ]', { timeout: 15000 })
    await เปิด(แท็บ, `/read/${บทกรีก.เล่ม}?c=${บทกรีก.บท}`)
    await แท็บ.waitForSelector('.pk-ชั้นคำ .pk-คำ')
    ขั้น = 'กดคำหลังโหลดใหม่'
    await ติดป้ายเป้า(แท็บ, บทกรีก.บท, 20, 2, 'เป้า')
    await แท็บ.locator(ตัวเลือกคำ).click()
    await รอการ์ดครบ(แท็บ)
    const จำได้ = await แท็บ.evaluate(() => [...document.querySelectorAll('[data-การ์ดคำ] [data-แหล่ง]')].map((s) => s.dataset.แหล่ง))
    if (จำได้.join(',') !== 'ubs,strong,abbott-smith')
      ตก.push(`${ป้าย} ⇒ ⑧ โหลดหน้าใหม่แล้วแหล่งที่เลือกเป็น [${จำได้}] ⛔ ควรจำ Abbott-Smith ไว้ด้วย`)
  } catch (e) {
    ตก.push(`${ป้าย} ⇒ ด่านล้มระหว่างตรวจ ที่ขั้น ${ขั้น} ⇒ ${e.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ตก
}

/** ⑩ คำ בְּ (ปฐมกาล 1:1 คำแรก · รหัส 0871a) ⇒ Strong ⛔ ไม่มี ⇒ การ์ดต้องบอกตรง ๆ · ⑪ หมุดเครดิตมีจริง */
async function ตรวจฮีบรู() {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: 1280, height: 900 } })
  const แท็บ = await ctx.newPage()
  const ป้าย = `${บทฮีบรู.เล่ม} ${บทฮีบรู.บท}`
  const ตก = []
  try {
    await เปิด(แท็บ, `/read/${บทฮีบรู.เล่ม}?c=${บทฮีบรู.บท}`)
    await ตั้งคำภาษาเดิม(แท็บ, true)
    await แท็บ.locator('.pk-ชั้นคำ .pk-ข้อคำ:first-of-type .pk-คำ').first().click()
    await รอการ์ดครบ(แท็บ)
    const ผล = await แท็บ.evaluate(() => ({
      strong: document.querySelector('[data-การ์ดคำ] [data-แหล่ง="strong"] [data-ไม่มี]')?.textContent ?? '',
      ภาษา: document.querySelector('[data-การ์ดคำ] .pk-ข้อมูลคำ dd')?.getAttribute('lang'),
      หมุด: [...document.querySelectorAll('[data-การ์ดคำ] a[href*="#"]')].map((a) => a.getAttribute('href')),
    }))
    if (!/ไม่มีคำนี้/.test(ผล.strong)) ตก.push(`${ป้าย} ⇒ ⑩ คำ בְּ ⇒ Strong ⛔ ไม่ได้บอกว่าไม่มีคำนี้ ⇒ ได้ "${ผล.strong}"`)
    if (ผล.ภาษา !== 'hbo') ตก.push(`${ป้าย} ⇒ คำฮีบรูบนการ์ด lang เป็น ${ผล.ภาษา} ⛔ ควรเป็น hbo`)

    // ⑪ หมุดทุกตัวที่การ์ดชี้ ต้องมีอยู่จริงในหน้าแหล่งข้อมูล ⇒ เปิดหน้าจริงแล้วหา id
    await แท็บ.getByRole('checkbox', { name: /BDB/ }).check()
    await รอการ์ดครบ(แท็บ)
    ตก.push(...(await ตรวจaxe(แท็บ, ป้าย)))
    const หมุดทั้งหมด = [
      ...new Set(
        await แท็บ.evaluate(() => [...document.querySelectorAll('[data-การ์ดคำ] a[href*="#"]')].map((a) => a.getAttribute('href').split('#')[1])),
      ),
    ]
    await แท็บ.goto(`${ฐาน}/sources`, { waitUntil: 'networkidle' })
    for (const h of [...หมุดทั้งหมด, 'macula-greek', 'strong-greek', 'abbott-smith']) {
      if (!(await แท็บ.locator(`[id="${h}"]`).count())) ตก.push(`${ป้าย} ⇒ ⑪ หน้าแหล่งข้อมูล ⛔ ไม่มีหมุด #${h} ที่การ์ดชี้ไป`)
    }
  } catch (e) {
    ตก.push(`${ป้าย} ⇒ ด่านล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ตก
}

const ตกกรีก = await ตรวจกรีก()
const ตกฮีบรู = await ตรวจฮีบรู()
for (const [ชื่อ, ตก] of [
  [`${บทกรีก.เล่ม} ${บทกรีก.บท} จอ 320`, ตกกรีก],
  [`${บทฮีบรู.เล่ม} ${บทฮีบรู.บท} จอ 1280`, ตกฮีบรู],
]) {
  ที่ตก.push(...ตก)
  console.log(`${ตก.length ? '⛔' : '✅'} ${ชื่อ}`)
  for (const x of ตก) console.log(`   ${x}`)
}

if (ทดสอบตัวเอง) {
  // ⭐ ยัดของพังทีละเรื่อง ⇒ ด่านต้องจับได้ **ทุกข้อที่มันอ้างว่าเฝ้า** ⇒ จับไม่ได้ข้อไหน = ข้อนั้นตายแล้ว
  const พิสูจน์ = [
    { ชื่อ: '① หยิบพจนานุกรมก่อนกดคำ', พัง: { หยิบก่อนกด: true }, คำ: '①' },
    { ชื่อ: '③ การ์ดบังคำที่กด', พัง: { บังคำ: true }, คำ: '③' },
    { ชื่อ: '④ ปิดแล้วโฟกัสหลุด', พัง: { โฟกัสหลุด: true }, คำ: '④' },
    { ชื่อ: '⑥ ปุ่มคำเล็กกว่า 44', พัง: { ปุ่มเล็ก: true }, คำ: '⑥' },
    { ชื่อ: '⑨ ตัวหนังสือบนการ์ดไม่ตรงไฟล์', พัง: { แก้ความหมาย: true }, คำ: '⑨' },
  ]
  for (const { ชื่อ, พัง, คำ } of พิสูจน์) {
    const ตก = await ตรวจกรีก(พัง)
    const จับได้ = ตก.some((x) => x.includes(คำ))
    console.log(`${จับได้ ? '✅' : '⛔'} โหมดพิสูจน์ ${ชื่อ} ⇒ ด่าน${จับได้ ? 'จับได้' : '⛔ จับไม่ได้'}`)
    if (!จับได้) ที่ตก.push(`โหมดพิสูจน์ ${ชื่อ} ⇒ ยัดของพังแล้วด่าน ⛔ ไม่แดง ⇒ ข้อนี้เฝ้าอะไรไม่ได้แล้ว`)
  }
}

await เบราว์เซอร์.close()

if (ที่ตก.length) {
  console.log(`\n⛔ ด่านการ์ดคำแดง — ${ที่ตก.length} เรื่อง`)
  for (const x of ที่ตก) console.log(`  · ${x}`)
  process.exit(1)
}
console.log(ทดสอบตัวเอง ? '\n✅ ด่านการ์ดคำเขียว และยังจับของพังได้ทุกข้อ' : '\n✅ ด่านการ์ดคำเขียว')
