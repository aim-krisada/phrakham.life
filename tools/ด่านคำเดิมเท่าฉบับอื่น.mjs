// ด่านตรวจ — **คำภาษาเดิมคือฉบับหนึ่ง ⇒ ลำดับ เลือกฉบับ และเปลี่ยนตอนเหมือนคอลัมน์อื่น** (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/145 ก้อน ข. ค. ง.)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// ## ทำไมต้องมี
//
// พี่เอมเคาะ 6 พ.ย. 2569 ⇒ *"ให้มองว่าภาษาเดิมคือ 1 ฉบับแปลหรือ 1 เวอร์ชั่น ทุกคอลัมน์ทุกเวอร์ชั่นเทียบเท่ากันหมด"*
//   ⇒ ก้อน ก. (`tools/ด่านทุกคอลัมน์ปิดได้.mjs`) เฝ้าเรื่องปิดได้ ⇒ ด่านนี้เฝ้าข้อ 2 · 3 · 4 · 5 ของใบ
//
// ## ตรวจ 7 ข้อ ⇒ กดปุ่มจริง วัดตำแหน่งที่วาดจริง
//   ① 🔴 **ลำดับตามที่เปิด** ⇒ จอ 375 เปิด TCV แล้วติ๊กคำเดิม ⇒ คำเดิมขวาของ TCV ⇒ ที่อยู่ `t=TCV,SBLGNT`
//      ⇒ ลิงก์ `t=SBLGNT,TCV` ⇒ คำเดิมซ้าย TCV ขวา ⇒ ทั้งตัวบทและหัว ⇒ จอ 375 กับ 1280
//      ⇒ จอ 1280 TCV · WEB แล้วติ๊กคำเดิม ⇒ ที่อยู่ `t=TCV,WEB,SBLGNT` (ที่ตารางพอ ⇒ คำเดิมขวาสุด)
//   ② 🔴 **ข้อยังตรงแถว** ⇒ คำเดิมซ้ายสุด ⇒ ข้อ n ของ TCV กับคำเดิมเริ่มระดับเดียวกัน (5 แถวแรก ⇒ คลาดไม่เกิน 2 จุด)
//   ③ 🔴 **ช่องเลือกฉบับของทุกหัวมีตัวบทภาษาเดิม** ⇒ หัว TCV · WEB มี SBLGNT ⇒ คำเดิมเปิดอยู่ ⇒ ตัวเลือกนั้นปิดในหัวอื่น
//      ⇒ ⚠️ ใบ #161 ข้อ 7.3 ⇒ ท่อน *ตัวเลือกนั้นปิดในหัวอื่น* กลับทาง ⇒ ฉบับซ้ำได้ ⇒ ตัวเลือก SBLGNT ในหัวอื่นต้องยังเลือกได้
//      ⇒ เลือก SBLGNT ในหัว WEB (คำเดิมปิดอยู่) ⇒ คอลัมน์นั้นเป็นคำเดิมที่ตำแหน่งเดิม ⇒ `t=TCV,SBLGNT`
//   ④ 🔴 **ปุ่มบทบนหัวคำเดิมขยับคอลัมน์เดียว** ⇒ เลือกมาระโก 11 ⇒ TCV ยังอยู่ 12 ⇒ คำเดิมเป็นคอลัมน์คนละที่ที่บท 11 พร้อมปุ่มคำ
//      ⇒ กดคำ ⇒ การ์ดของมาระโก 11 ⇒ เลือกกลับมา 12 ⇒ กลับเข้าตาราง
//   ⑤ 🔴 **ปุ่มบทบนหัวคอลัมน์แรกขยับคอลัมน์เดียว** ⇒ TCV ไปมาระโก 13 ⇒ คำเดิมอยู่ 12 ⇒ ⚠️ ของเดิม (ใบ #125 ข้อ 1.1) คำเดิมตามไปด้วย
//   ⑥ 🔴 **ลิงก์ที่มีคำเดิมคนละที่** ⇒ `p=MRK.11.SBLGNT` ⇒ เปิดแล้วได้คำเดิมบท 11 ⇒ ‹ › แถบล่างพาทั้งสองคอลัมน์ไปบทถัดไป
//      ⇒ ⚠️ ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/162 ⇒ › พาคำเดิมไปบทเดียวกับคอลัมน์ซ้ายสุด (มาระโก 13) ⇒ กลับเข้าตาราง ⇒ `t=TCV,SBLGNT` ⛔ มี `p`
//        ⇒ ของเดิม (ใบ #145) ⇒ คำเดิมไปบทถัดไปของตัวเอง ⇒ `p=MRK.12.SBLGNT`
//   ⑦ 🔴 **คำเดิมนับในการวางข้างกันหรือซ้อนกัน** (ใบ #145 ข้อ 4 ⇒ พี่เอมเคาะ 7 พ.ย. 2569)
//      ⇒ จอ 1280 `t=TCV,SBLGNT,LSV` ⇒ ขอบซ้ายและความกว้างของทุกช่องตามลำดับที่เปิด ตรงกับ `t=TCV,LSV,WEB` (คลาดไม่เกิน 2 จุด)
//        ⇒ ⚠️ ของเดิม (ใบ #125 ข้อ 1.2) ⇒ TCV กับ LSV ซ้อนกันในช่องซ้าย คำเดิมได้ช่องของตัวเองทางขวา ⇒ ตรงนี้แดง
//      ⇒ จอ 1920 ⇒ ทั้งสามข้างกันแถวเดียว เหมือน `t=TCV,LSV,WEB`
//
// ## วิธีพิสูจน์ว่าด่านนี้แดงได้จริง
//
//   node tools/ด่านคำเดิมเท่าฉบับอื่น.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ① คำเดิมถูกบังคับไปช่องที่ 3 แบบเดิม · ② แถวของคำเดิมเลื่อนลง · ③ ตัวเลือก SBLGNT หายจากหัวฉบับแปล
//     · ④ ปุ่มบทบนหัวคำเดิมกดแล้วไม่เกิดอะไร · ⑤ คำเดิมตามคอลัมน์แรกไปแบบเดิม · ⑥ ปุ่มคำในคอลัมน์คนละที่หาย
//     · ⑦ ผังเดิมของใบ #125 ข้อ 1.2 ⇒ ฉบับแปลซ้อนกันช่องซ้าย · คำเดิมช่องของตัวเองทางขวา
//
//   node tools/ด่านคำเดิมเท่าฉบับอื่น.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import { เส้นทางเว็บ, รอหน้านิ่ง, ปุ่มเทียบของหน้า, เปิดคำเดิม } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')

const ของพัง = {
  ช่องที่สามเสมอ: {
    ข้อ: '①',
    css: '.pk-คำเดิมเป็นคอลัมน์.pk-มีฉบับอื่น .pk-ตัวบท > .pk-ชั้นคำ, .pk-คำเดิมเป็นคอลัมน์.pk-มีฉบับอื่น .pk-ฝั่งหลัก > .pk-ชื่อคำเดิม { grid-column: 3 !important; } .pk-คำเดิมเป็นคอลัมน์ .pk-ตัวบท .pk-ช่องทั้งหมด > :nth-child(1) { grid-column: 2 !important; } .pk-คำเดิมหน้าสุด .pk-ตัวบท > .pk-ชั้นคำ { grid-column: 2 !important; } .pk-คำเดิมหน้าสุด .pk-ตัวบท > .pk-ข้อ { grid-column: 1 !important; }',
  },
  แถวเลื่อน: { ข้อ: '②', css: '.pk-ตัวบท .pk-แถวคำ { margin-top: 12px !important; }' },
  ไม่มีตัวเลือก: {
    ข้อ: '③',
    บนหน้า: () => {
      const ถอด = () => document.querySelectorAll('.pk-ช่องหัว[data-ฉบับ] option[value="SBLGNT"]').forEach((x) => x.remove())
      ถอด()
      new MutationObserver(ถอด).observe(document.body, { subtree: true, childList: true })
    },
  },
  ปุ่มบทคำเดิมตาย: {
    ข้อ: '④',
    บนหน้า: () =>
      document.addEventListener(
        'click',
        (e) => {
          if (e.target.closest?.('[data-ชื่อคำเดิม] [data-ปุ่ม="เปลี่ยนตอน"]')) e.stopImmediatePropagation()
        },
        true,
      ),
  },
  ตามคอลัมน์แรก: {
    ข้อ: '⑤',
    // ⭐ ยัดพฤติกรรมเดิมกลับ ⇒ หลังกดเปลี่ยนตอนของ TCV ⇒ เอาคำเดิมคนละที่กลับเข้าตารางด้วยที่อยู่
    บนหน้า: () => {
      const เดิม = history.replaceState.bind(history)
      history.replaceState = (s, t, u) =>
        เดิม(s, t, typeof u === 'string' ? u.replace(/[?&]p=MRK\.\d+\.SBLGNT(\.\d+)?/, '').replace(/t=TCV(?!,)/, 't=TCV,SBLGNT') : u)
    },
  },
  ไม่มีปุ่มคำ: { ข้อ: '⑥', css: '.pk-คำเดิมเทียบ .pk-คำ { display: none !important; }' },
  // ⭐ ยัดผังเดิมกลับ ⇒ ฉบับแปลซ้อนกันในช่องซ้าย (2 ส่วน) · คำเดิมได้ช่องของตัวเองทางขวา (1 ส่วน) ⇒ คำเดิม ⛔ อยู่ในการนับของตาราง
  ผังเดิมคำเดิมนอกการนับ: {
    ข้อ: '⑦',
    css: '.pk-คำเดิมในช่อง .pk-ตัวบท .pk-ช่องทั้งหมด { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) !important; } .pk-คำเดิมในช่อง .pk-ตัวบท .pk-ช่องทั้งหมด > * { grid-column: 1 !important; max-width: none !important; } .pk-คำเดิมในช่อง .pk-ตัวบท .pk-ช่องทั้งหมด > .pk-ช่องคำเดิม { grid-column: 2 !important; grid-row: 1 / span 9 !important; }',
  },
}

const เบราว์เซอร์ = await chromium.launch()

async function เปิด({ กว้าง, ทาง, ฉ = ['TCV'], เดิม = false, พัง = null }) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: 812 } })
  await ctx.addInitScript(
    ([ฉ, เดิม]) => {
      try {
        if (!sessionStorage.getItem('pk-ด่านคำเดิมเท่าฉบับอื่น')) {
          localStorage.setItem('phrakham.versions', JSON.stringify(ฉ))
          localStorage.setItem('pk-fs', '1')
          localStorage.setItem('phrakham.view', JSON.stringify({ จัดวาง: 'แยกตามข้อ', แสดงเลข: true, ภาษาเดิม: เดิม }))
          sessionStorage.setItem('pk-ด่านคำเดิมเท่าฉบับอื่น', '1')
        }
      } catch {}
    },
    [ฉ, เดิม],
  )
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(`${ฐาน}${ทาง}`, { waitUntil: 'domcontentloaded' })
  await แท็บ.waitForFunction(() => document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
  await รอหน้านิ่ง(แท็บ)
  await แท็บ.waitForSelector('section.pk-ชั้นคำ, .pk-คำเดิมเทียบ', { state: 'visible', timeout: 15000 }).catch(() => {})
  if (พัง?.css) await แท็บ.addStyleTag({ content: พัง.css })
  if (พัง?.บนหน้า) await แท็บ.evaluate(พัง.บนหน้า)
  await รอหน้านิ่ง(แท็บ)
  return { ctx, แท็บ }
}

/** ขอบซ้ายของแต่ละคอลัมน์ในข้อแรกที่เห็น ⇒ ฉบับแปล (`data-ฉบับ`) กับก้อนคำเดิม ⇒ ทั้งตัวบทและหัว */
const ซ้ายไปขวา = (แท็บ) =>
  แท็บ.evaluate(() => {
    const เห็น = (e) => !!e && e.getClientRects().length > 0
    const ข้อ = [...document.querySelectorAll('.pk-ตัวบท .pk-ข้อ')].find(เห็น)
    const ตัวบท = ข้อ ? [...ข้อ.querySelectorAll('.pk-ช่องฉบับ')].filter(เห็น).map((c) => [c.dataset.ฉบับ, c.getBoundingClientRect().left]) : []
    const ก้อน = [...document.querySelectorAll('section.pk-ชั้นคำ')].find(เห็น)
    if (ก้อน) ตัวบท.push(['คำเดิม', ก้อน.getBoundingClientRect().left])
    const หัว = [...document.querySelectorAll('.pk-ช่องหัว, .pk-ฝั่งหลัก > .pk-ชื่อคำเดิม')]
      .filter(เห็น)
      .map((h) => [h.matches('[data-ชื่อคำเดิม]') ? 'คำเดิม' : h.dataset.ฉบับ, h.getBoundingClientRect().left])
    const เรียง = (x) => x.sort((a, b) => a[1] - b[1]).map((y) => y[0]).join(',')
    return { ตัวบท: เรียง(ตัวบท), หัว: เรียง(หัว), ที่อยู่: decodeURIComponent(location.search) }
  })

async function เลือกในแผง(แท็บ, ชื่อเล่ม, บท) {
  await แท็บ.waitForSelector('[role="dialog"]', { timeout: 5000 })
  const แผง = แท็บ.locator('[role="dialog"]')
  await แผง.getByRole('button', { name: new RegExp(`^${ชื่อเล่ม}`) }).first().click()
  await แผง.locator('.pk-ตารางเลข').first().waitFor()
  if (!(await แผง.locator('.pk-ปุ่มกว้าง').count()))
    await แผง.locator('.pk-ตารางเลข button').filter({ hasText: new RegExp(`^${บท}$`) }).first().click()
  await แผง.locator('.pk-ปุ่มกว้าง').filter({ hasText: 'ทั้งบท' }).click()
  await แท็บ.waitForTimeout(300)
  await รอหน้านิ่ง(แท็บ)
}

async function ตรวจ(พัง = null) {
  const ตก = []
  const ต้อง = (ข้อ) => !พัง || พัง.ข้อ === ข้อ

  // ① ติ๊กคำเดิม ⇒ ต่อท้าย
  if (ต้อง('①')) {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 375, ทาง: '/read/MRK?c=12', พัง })
    try {
      // ⭐ ใบ #161 ⇒ ปุ่ม *เพิ่มคอลัมน์* แล้วเลือกตัวบท ⇒ คอลัมน์ใหม่ต่อท้ายเหมือนติ๊กเดิม ⇒ ⚠️ ของเดิมติ๊กช่องคำภาษาเดิม
      await เปิดคำเดิม(แท็บ)
      await แท็บ.waitForSelector('section.pk-ชั้นคำ', { state: 'visible', timeout: 15000 }).catch(() => {})
      await รอหน้านิ่ง(แท็บ)
      const ล = await ซ้ายไปขวา(แท็บ)
      if (ล.ตัวบท !== 'TCV,คำเดิม' || ล.หัว !== 'TCV,คำเดิม' || !ล.ที่อยู่.includes('t=TCV,SBLGNT'))
        ตก.push(`① จอ 375 ติ๊กคำเดิมหลัง TCV ⇒ ${JSON.stringify(ล)} ⛔ ต่อท้าย`)
    } finally {
      await ctx.close()
    }
    for (const กว้าง of [375, 1280]) {
      const { ctx, แท็บ } = await เปิด({ กว้าง, ทาง: '/read/MRK?c=12&t=SBLGNT,TCV', พัง })
      try {
        const ล = await ซ้ายไปขวา(แท็บ)
        if (ล.ตัวบท !== 'คำเดิม,TCV' || ล.หัว !== 'คำเดิม,TCV')
          ตก.push(`① จอ ${กว้าง} ลิงก์ t=SBLGNT,TCV ⇒ ${JSON.stringify(ล)} ⛔ คำเดิมซ้าย`)
      } finally {
        await ctx.close()
      }
    }
  }

  // ② ข้อตรงแถว ⇒ คำเดิมซ้ายสุด
  if (ต้อง('②')) {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 1280, ทาง: '/read/MRK?c=12&t=SBLGNT,TCV', พัง })
    try {
      const คลาด = await แท็บ.evaluate(() => {
        const ผล = []
        for (const e of [...document.querySelectorAll('.pk-ตัวบท .pk-ข้อ[data-แถว]')].slice(0, 5)) {
          const คำ = document.querySelector(`.pk-แถวคำ[data-แถว="${e.dataset.แถว}"]`)
          if (คำ) ผล.push(Math.abs(คำ.getBoundingClientRect().top - e.getBoundingClientRect().top))
        }
        return ผล
      })
      if (คลาด.length < 3 || คลาด.some((x) => x > 2)) ตก.push(`② คำเดิมซ้ายสุด ⇒ ข้อไม่ตรงแถว ${JSON.stringify(คลาด)}`)
    } finally {
      await ctx.close()
    }
  }

  // ③ ช่องเลือกฉบับ
  if (ต้อง('③')) {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 1280, ทาง: '/read/MRK?c=12&t=TCV,WEB', พัง })
    try {
      const ตัวเลือก = await แท็บ.evaluate(() =>
        [...document.querySelectorAll('.pk-ช่องหัว[data-ฉบับ]')].map((h) => [h.dataset.ฉบับ, [...h.querySelectorAll('option')].map((o) => o.value)]),
      )
      for (const [ฉ, ล] of ตัวเลือก) if (!ล.includes('SBLGNT')) ตก.push(`③ หัว ${ฉ} ⛔ มี SBLGNT ในช่องเลือกฉบับ`)
      await แท็บ.locator('.pk-ช่องหัว[data-ฉบับ="WEB"] select').selectOption('SBLGNT').catch(() => ตก.push('③ เลือก SBLGNT ในหัว WEB ไม่ได้'))
      await แท็บ.waitForSelector('section.pk-ชั้นคำ', { state: 'visible', timeout: 15000 }).catch(() => {})
      await รอหน้านิ่ง(แท็บ)
      const ล = await ซ้ายไปขวา(แท็บ)
      if (ล.ตัวบท !== 'TCV,คำเดิม' || !ล.ที่อยู่.includes('t=TCV,SBLGNT')) ตก.push(`③ เลือก SBLGNT ในหัว WEB ⇒ ${JSON.stringify(ล)}`)
      const ปิดไว้ = await แท็บ.evaluate(() => document.querySelector('.pk-ช่องหัว[data-ฉบับ="TCV"] option[value="SBLGNT"]')?.disabled)
      // ⚠️ ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/161 ข้อ 7.3 ⇒ เลือกฉบับที่คอลัมน์อื่นเปิดอยู่ได้ ⇒ คำภาษาเดิมด้วย ⇒ ⚠️ ของเดิมต้องปิด (1 ฉบับได้ 1 คอลัมน์)
      if (ปิดไว้) ตก.push('③ คำเดิมเปิดอยู่แล้ว ⇒ ตัวเลือก SBLGNT ในหัว TCV ปิด ⇒ ต้องเลือกได้ (ใบ #161 ข้อ 7.3)')
    } finally {
      await ctx.close()
    }
  }

  // ④ ปุ่มบทบนหัวคำเดิม
  if (ต้อง('④') || ต้อง('⑥')) {
    for (const กว้าง of [375, 1280]) {
      const { ctx, แท็บ } = await เปิด({ กว้าง, ทาง: '/read/MRK?c=12&t=TCV,SBLGNT', พัง })
      try {
        await แท็บ.locator('[data-ชื่อคำเดิม] [data-ปุ่ม="เปลี่ยนตอน"]').filter({ visible: true }).first().click()
        const เปิดแผง = await เลือกในแผง(แท็บ, 'มาระโก', 11).then(() => true, () => false)
        await แท็บ.waitForSelector('.pk-คำเดิมเทียบ .pk-ข้อคำ', { state: 'attached', timeout: 10000 }).catch(() => {})
        await รอหน้านิ่ง(แท็บ)
        const ที่อยู่ = await แท็บ.evaluate(() => decodeURIComponent(location.search))
        const ข้อ11 = await แท็บ.locator('.pk-คำเดิมเทียบ [data-ข้อเทียบ="11:1"]').count()
        if (ต้อง('④') && (!เปิดแผง || !/[?&]c=12/.test(ที่อยู่) || !/p=MRK\.11\.SBLGNT/.test(ที่อยู่) || !ข้อ11))
          ตก.push(`④ จอ ${กว้าง} ปุ่มบทบนหัวคำเดิม ⇒ มาระโก 11 ⇒ ที่อยู่ ${ที่อยู่} ข้อ 11:1 ${ข้อ11} ⛔ แยกคอลัมน์เดียว`)
        const ปุ่มคำ = แท็บ.locator('.pk-คำเดิมเทียบ .pk-คำ').filter({ visible: true }).first()
        if (!(await ปุ่มคำ.count())) {
          ตก.push(`⑥ จอ ${กว้าง} คำเดิมคนละที่ ⛔ มีปุ่มคำให้กด`)
        } else if (ต้อง('④')) {
          await ปุ่มคำ.click()
          const การ์ด = await แท็บ.locator('[role="dialog"]').first().innerText({ timeout: 8000 }).catch(() => '')
          if (!/มาระโก 11:1/.test(การ์ด)) ตก.push(`④ จอ ${กว้าง} กดคำในคอลัมน์คนละที่ ⇒ การ์ด ⛔ บอกมาระโก 11:1`)
          await แท็บ.keyboard.press('Escape')
          await รอหน้านิ่ง(แท็บ)
          await แท็บ.locator('[data-เทียบ] [data-ปุ่ม="เปลี่ยนตอน"], .pk-ตอนเทียบ [data-ปุ่ม="เปลี่ยนตอน"]').filter({ visible: true }).first().click()
          await เลือกในแผง(แท็บ, 'มาระโก', 12).catch(() => {})
          await แท็บ.waitForSelector('section.pk-ชั้นคำ', { state: 'visible', timeout: 15000 }).catch(() => {})
          await รอหน้านิ่ง(แท็บ)
          const กลับ = await ซ้ายไปขวา(แท็บ)
          if (!กลับ.ที่อยู่.includes('t=TCV,SBLGNT') || /p=/.test(กลับ.ที่อยู่)) ตก.push(`④ จอ ${กว้าง} พาคำเดิมกลับมาบท 12 ⇒ ⛔ กลับเข้าตาราง ${กลับ.ที่อยู่}`)
        }
      } finally {
        await ctx.close()
      }
    }
  }

  // ⑤ ปุ่มบทบนหัวคอลัมน์แรก ⇒ คำเดิมอยู่ที่เดิม
  if (ต้อง('⑤')) {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 1280, ทาง: '/read/MRK?c=12&t=TCV,SBLGNT', พัง })
    try {
      await แท็บ.locator('.pk-ช่องหัว[data-ฉบับ="TCV"] [data-ปุ่ม="เปลี่ยนตอน"]').filter({ visible: true }).first().click()
      await เลือกในแผง(แท็บ, 'มาระโก', 13)
      await แท็บ.waitForTimeout(500)
      await รอหน้านิ่ง(แท็บ)
      const ที่อยู่ = await แท็บ.evaluate(() => decodeURIComponent(location.search))
      if (!/[?&]c=13/.test(ที่อยู่) || !/p=MRK\.12\.SBLGNT/.test(ที่อยู่))
        ตก.push(`⑤ TCV ไปมาระโก 13 ⇒ คำเดิม ⛔ อยู่บท 12 เป็นคอลัมน์คนละที่ ⇒ ${ที่อยู่}`)
    } finally {
      await ctx.close()
    }
  }

  // ⑥ ลิงก์ ⇒ ‹ › พาไปทุกคอลัมน์
  if (ต้อง('⑥')) {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 1280, ทาง: '/read/MRK?c=12&t=TCV&p=MRK.11.SBLGNT', พัง })
    try {
      const ข้อ = await แท็บ.locator('.pk-คำเดิมเทียบ [data-ข้อเทียบ="11:1"] .pk-คำ').count()
      if (!ข้อ) ตก.push('⑥ ลิงก์ p=MRK.11.SBLGNT ⇒ ⛔ เห็นปุ่มคำของมาระโก 11:1')
      await แท็บ.locator('[data-ปุ่ม="บทถัดล่าง"]').first().click()
      // ⭐ ใบ #162 ⇒ คำเดิมตามคอลัมน์ซ้ายสุดไปมาระโก 13 ⇒ ที่เดียวกัน ⇒ เข้าตารางต่อท้าย ⇒ ของเดิม `p=MRK.12.SBLGNT`
      await แท็บ.waitForFunction(() => /[?&]c=13/.test(location.search), null, { timeout: 10000 }).catch(() => {})
      await รอหน้านิ่ง(แท็บ)
      const ที่อยู่ = await แท็บ.evaluate(() => decodeURIComponent(location.search))
      if (!/[?&]c=13(&|$)/.test(ที่อยู่) || !/[?&]t=TCV,SBLGNT(&|$)/.test(ที่อยู่) || /[?&]p=/.test(ที่อยู่))
        ตก.push(`⑥ › บนแถบล่าง ⇒ ⛔ พาทั้งสองคอลัมน์ไปมาระโก 13 ⇒ คำเดิมต้องกลับเข้าตาราง (t=TCV,SBLGNT ⛔ มี p) ⇒ ${ที่อยู่} (ใบ #162)`)
    } finally {
      await ctx.close()
    }
  }

  // ⑦ คำเดิมนับในการวางข้างกันหรือซ้อนกัน ⇒ ผังเดียวกับฉบับแปล 3 ฉบับ
  if (ต้อง('⑦')) {
    /** ขอบซ้ายกับความกว้างของทุกช่องในข้อแรกที่เห็น ⇒ เรียงตามโครงหน้า (= ลำดับที่เปิด) ⇒ คำเดิมคือกล่องคำของแถวนั้น */
    const ช่องของข้อแรก = (แท็บ) =>
      แท็บ.evaluate(() => {
        const เห็น = (e) => !!e && e.getClientRects().length > 0
        const ข้อ = [...document.querySelectorAll('.pk-ตัวบท .pk-ข้อ')].find(เห็น)
        if (!ข้อ) return []
        const ช่อง = [...ข้อ.querySelectorAll(':scope > .pk-ช่องทั้งหมด:not(.pk-แถวหัวข้อ) > *')].filter(เห็น)
        const ผล = ช่อง.map((c) => {
          const r = c.getBoundingClientRect()
          return { ชื่อ: c.dataset.ฉบับ || (c.matches('.pk-ช่องคำเดิม') ? 'คำเดิม' : '?'), ซ้าย: Math.round(r.left), กว้าง: Math.round(r.width) }
        })
        // ⭐ คำเดิมเป็นคอลัมน์ของตารางแถว (ผังที่พอวางทุกคอลัมน์ข้างกัน) ⇒ ใช้คอลัมน์ของก้อนคำแทน ⇒ แทรกตามขอบซ้าย
        if (!ผล.some((x) => x.ชื่อ === 'คำเดิม')) {
          const ก้อน = [...document.querySelectorAll('section.pk-ชั้นคำ')].find(เห็น)
          if (ก้อน) {
            const r = ก้อน.getBoundingClientRect()
            ผล.push({ ชื่อ: 'คำเดิม', ซ้าย: Math.round(r.left), กว้าง: Math.round(r.width) })
          }
        }
        return ผล
      })
    const ผังของ = async (กว้าง, สูง, t) => {
      const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: สูง } })
      await ctx.addInitScript(() => {
        try {
          localStorage.setItem('pk-fs', '1')
          localStorage.setItem('phrakham.view', JSON.stringify({ จัดวาง: 'แยกตามข้อ', แสดงเลข: true, ภาษาเดิม: false }))
        } catch {}
      })
      const แท็บ = await ctx.newPage()
      try {
        await แท็บ.goto(`${ฐาน}/read/MRK?c=12&t=${t}`, { waitUntil: 'domcontentloaded' })
        await แท็บ.waitForFunction(() => document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
        await รอหน้านิ่ง(แท็บ)
        if (t.includes('SBLGNT'))
          await แท็บ.waitForSelector('.pk-ชั้นคำ .pk-คำ', { state: 'visible', timeout: 15000 }).catch(() => {})
        if (พัง?.css) await แท็บ.addStyleTag({ content: พัง.css })
        await รอหน้านิ่ง(แท็บ)
        return await ช่องของข้อแรก(แท็บ)
      } finally {
        await ctx.close()
      }
    }
    const ข้อความ = (ผ) => ผ.map((x) => `${x.ชื่อ}@${x.ซ้าย}/${x.กว้าง}`).join(' ')
    // ⭐ จอ 1280 ⇒ วาง 3 ช่องข้างกันช่องละ 23em ไม่พอ ⇒ ฉบับแปล 3 ฉบับห่อเป็น 2 + 1 ⇒ คำเดิมต้องได้ผังเดียวกันที่ตำแหน่งของมัน
    const เทียบ = await ผังของ(1280, 800, 'TCV,LSV,WEB')
    const เดิม = await ผังของ(1280, 800, 'TCV,SBLGNT,LSV')
    const ชื่อ = เดิม.map((x) => x.ชื่อ).join(',')
    const ตรง =
      เทียบ.length === 3 &&
      เดิม.length === 3 &&
      ชื่อ === 'TCV,คำเดิม,LSV' &&
      เดิม.every((x, i) => Math.abs(x.ซ้าย - เทียบ[i].ซ้าย) <= 2 && Math.abs(x.กว้าง - เทียบ[i].กว้าง) <= 2)
    if (!ตรง)
      ตก.push(`⑦ จอ 1280 t=TCV,SBLGNT,LSV ⇒ ${ข้อความ(เดิม)} ⛔ ผังเดียวกับ t=TCV,LSV,WEB ⇒ ${ข้อความ(เทียบ)}`)
    // ⭐ จอ 1920 ⇒ พอ ⇒ ทั้งสามข้างกันแถวเดียว (ขอบซ้ายเพิ่มขึ้นทีละช่อง) ⇒ เหมือนฉบับแปล 3 ฉบับ
    for (const t of ['TCV,LSV,WEB', 'TCV,SBLGNT,LSV']) {
      const ผ = (await ผังของ(1920, 1080, t)).sort((a, b) => a.ซ้าย - b.ซ้าย)
      const แถวเดียว = ผ.length === 3 && ผ.every((x, i) => !i || x.ซ้าย >= ผ[i - 1].ซ้าย + ผ[i - 1].กว้าง - 2)
      if (!แถวเดียว) ตก.push(`⑦ จอ 1920 t=${t} ⇒ ${ข้อความ(ผ)} ⛔ ทั้งสามข้างกันแถวเดียว`)
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
  else console.log('✅ คำภาษาเดิมเท่าฉบับอื่น ⇒ ลำดับ เลือกฉบับ เปลี่ยนตอน ลิงก์ วางข้างกันหรือซ้อนกัน ⇒ ผ่าน 7 ข้อ')
}
await เบราว์เซอร์.close()
process.exit(รหัสออก)
