// ด่านตรวจ — **ติดตั้งเป็นแอปแล้ว อ่านพระคัมภีร์ได้ทุกเล่มทุกฉบับแม้ไม่มีเน็ต ⇒ และ ⛔ ขังผู้อ่านไว้กับรุ่นเก่า**
//   (@krisada เคาะ 19 พ.ย. 2569 ⇒ ขอบเขต *ตัวบททั้งเล่ม* ⇒ ภาษาเดิมเฉพาะบทที่เปิดแล้ว ⇒ เสียง ⛔ ออฟไลน์)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
//   node tools/ด่านออฟไลน์.mjs http://127.0.0.1:5396/phrakham                 ⇒ ตรวจเว็บที่สร้างเสร็จ
//   node tools/ด่านออฟไลน์.mjs http://127.0.0.1:5396/phrakham --ทดสอบตัวเอง    ⇒ ยัดของพังแล้วด่านต้องจับได้ทีละข้อ
//
// ⭐ ของที่ด่านนี้เฝ้า ⇒ ตัวช่วยออฟไลน์ `public/sw.js` · รายการ `offline.json` (`tools/สร้างรายการออฟไลน์.mjs`)
//   · ฝั่งหน้าเว็บ `app/composables/ออฟไลน์.ts` · บรรทัดสถานะ `app/utils/สถานะออฟไลน์.ts` + `การ์ดติดตั้งแอป.vue`
//   ⇒ ส่วนที่ Chrome ดูว่าติดตั้งได้ (manifest · ตัวช่วยลงทะเบียน) ⇒ `tools/ด่านติดตั้งเป็นแอป.mjs` · ปุ่ม ⇒ `tools/ด่านปุ่มติดตั้งแอป.mjs`
//
// **ด่านนี้ตรวจ 10 ข้อ** ⇒ 3 ฉาก ⇒ แต่ละฉากบริบทใหม่ ⇒ ที่เก็บในเครื่องว่าง
//   *ฉากแท็บธรรมดา*
//   ① **ลงทะเบียน** ⇒ ขอบเขต = ฐานของเว็บพอดี · ไฟล์ `sw.js` ใต้ฐาน · โหลดใหม่แล้วตัวช่วยคุมหน้า
//   ② **แท็บธรรมดา ⛔ เก็บทั้งเล่ม** ⇒ เปิดหน้าแรก + มาระโก 14 ⇒ ขอไฟล์บทไม่เกิน 3 ไฟล์ · ⛔ มีแคชตัวบท · บทที่เปิดอยู่ในแคชที่เปิด
//   *ฉากแอปที่ติดตั้งแล้ว* (จำลอง `display-mode: standalone` ท่าเดียวกับ `tools/ด่านปุ่มติดตั้งแอป.mjs` ข้อ ④)
//   ③ **เก็บทั้งเล่มครบ** ⇒ รายการมีทุกบททุกเล่ม (จาก `api/books.json`) · หน้าของเล่ม · ไฟล์ `_nuxt` ที่หน้าแรกกับหน้าอ่านอ้าง
//      ⇒ บรรทัด *✓ พร้อมใช้แบบไม่มีเน็ตแล้ว* ขึ้น (คำตรงตัว) ⇒ ทุกไฟล์ในรายการอยู่ในแคชจริง
//   ④ **⛔ เน็ต ⇒ เปิดบทที่ไม่เคยเปิด อ่านได้** ⇒ 2 พงศ์กษัตริย์ 3 ฉบับ WEB · โรม 8 ฉบับ KJV ⇒ เห็นตัวบทตรงไฟล์ของบท
//   ⑤ **⛔ เน็ต ⇒ การ์ดคำเดิมของบทที่เปิดแล้วใช้ได้** ⇒ มาระโก 10 ภาษาเดิม ⇒ กดคำตอนมีเน็ต ⇒ ปิดเน็ต ⇒ กดคำเดิม ⇒ การ์ดเดิมขึ้น
//   ⑥ **⛔ เน็ต ⇒ บทที่ไม่เคยเปิด ภาษาเดิม ⇒ ⛔ พังทั้งหน้า** ⇒ 2 พงศ์กษัตริย์ 4 ⇒ ตัวบท TCV ยังขึ้น · ⛔ มีข้อผิดพลาดหลุดในหน้า
//   ⑦ **⛔ ขังรุ่นเก่า** ⇒ เน็ตกลับมา + เว็บขึ้นรุ่นใหม่ (ตัวกลางแก้ HTML กับไฟล์บท) ⇒ หน้าแรกเป็น HTML รุ่นใหม่ · ตัวบทรุ่นใหม่
//   ⑧ **ดึงเฉพาะที่เปลี่ยน** ⇒ รอบเก็บหลังเว็บขึ้นรุ่นใหม่ ⇒ ไฟล์บทถูกขอไม่เกิน 2 ครั้ง (บทที่เปลี่ยน 1 + หน้าอ่านเอง 1) ⇒ ของในแคชเป็นรุ่นใหม่
//   ⑩ **ขอที่เก็บถาวร** ⇒ เปิดเป็นแอป ⇒ `navigator.storage.persist()` ถูกเรียก · แท็บธรรมดา ⇒ ⛔ เรียก
//   *ฉากที่เก็บเต็ม*
//   ⑨ **ที่เก็บเต็ม ⇒ หยุด ⛔ วน** ⇒ ตัวกลางยัดของที่ทำให้ `Cache.put` เต็มหลังบทที่ 30 ⇒ บรรทัดเหลือง *ที่เก็บในเครื่องเต็ม…* ขึ้น (คำตรงตัว)
//      ⇒ ไฟล์บทถูกขอไม่เกิน 60 ⇒ รอต่ออีก 5 วินาที ⇒ ⛔ มีคำขอเพิ่ม
//
// ⭐ **ตัวกลางของด่าน (proxy)** ⇒ ด่านเปิดเว็บผ่านเซิร์ฟเวอร์ตัวเล็กของตัวเองที่ส่งต่อไปเว็บที่ตรวจ
//   ⇒ ① **⛔ เน็ตจริง** ⇒ ตัวกลางตัดสายทุกคำขอ + `ctx.setOffline(true)` ⇒ ตัวช่วยออฟไลน์ ⛔ แอบได้ของจากเน็ต
//   ⇒ ② **นับคำขอจริง** รวมคำขอของตัวช่วยเอง ⇒ ③ **ยัดของพัง / รุ่นใหม่** ⇒ แก้ไบต์ระหว่างทาง ⛔ แตะไฟล์ที่สร้างเสร็จ
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⇒ `--ทดสอบตัวเอง` ⇒ ของจริงต้องผ่านก่อน ⇒ แล้วยัดของพังทีละท่า (รายชื่ออยู่ที่ `ของพัง`)
//   ⇒ แต่ละท่าวิ่งฉากของข้อนั้น ⇒ **ข้อของมันเอง** ต้องแดง ⇒ จับไม่ได้ = ด่านตาย ⇒ คืนรหัสไม่เป็นศูนย์
//   ⇒ ท่าที่แก้ `sw.js` แทนคำที่จุดที่ `public/sw.js` จดไว้ ⇒ หาคำที่จะแทนไม่เจอ ⇒ นับเป็นด่านตาย (⛔ ผ่านเงียบ)
//
// ⛔ **ไม่ออกเน็ตนอกเครื่อง** ⇒ เสียงข้อ (ต่างโดเมน) ⛔ ถูกขอ ⇒ ด่านเปิดแต่เว็บที่สร้างเสร็จ

import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { createHash } from 'node:crypto'
import { เส้นทางเว็บ } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const ต้นทาง = new URL(ฐาน + '/')

// ⭐ คำที่ด่านอ่านบนจอ ⇒ ลอกจากเว็บเพลง ⇒ จดซ้ำที่นี่โดยเจตนา ⇒ เจ้าของคือ `app/utils/ถ้อยคำติดตั้งแอป.ts`
const คำ = {
  พร้อมใช้: '✓ พร้อมใช้แบบไม่มีเน็ตแล้ว',
  ที่เก็บเต็ม: 'ยังไม่พร้อมใช้แบบไม่มีเน็ต · ที่เก็บในเครื่องเต็ม ลบรูปหรือแอพที่ไม่ใช้ แล้วเปิดเว็บนี้อีกครั้งตอนมีเน็ต',
}
const รอเก็บนานสุด = 10 * 60 * 1000
const ปกติ = (s) => String(s || '').replace(/[​\s]+/g, ' ').trim()
const ลายของ = (ไบต์) => createHash('sha256').update(ไบต์).digest('hex').slice(0, 16)
const บรรทัดสถานะ = '[data-การ์ด="สถานะออฟไลน์"]'
const คำในชั้นคำ = '.pk-ชั้นคำ .pk-คำ'
const การ์ดคำ = '[data-การ์ดคำ]'

// ---- ตัวกลาง ---------------------------------------------------------------------------------
/** ไบต์ของไฟล์ต้นทาง ⇒ จำไว้ ⇒ ⛔ ดึงซ้ำ (รายการ · หน้า HTML ตอนคิดลายรุ่นใหม่) */
const จำต้นทาง = new Map()
async function ดึงต้นทาง(ทางเต็ม) {
  if (!จำต้นทาง.has(ทางเต็ม)) {
    const r = await fetch(ต้นทาง.origin + ทางเต็ม)
    จำต้นทาง.set(ทางเต็ม, { status: r.status, ชนิด: r.headers.get('content-type') || '', ไบต์: Buffer.from(await r.arrayBuffer()) })
  }
  return จำต้นทาง.get(ทางเต็ม)
}

/** ⭐ *เว็บขึ้นรุ่นใหม่* ⇒ HTML ทุกหน้าได้ป้าย `pk-ด่านรุ่น` · มาระโก 2 ฉบับ WEB ข้อ 1 ขึ้นต้นด้วย `ด่านรุ่นใหม่` ⇒ รายการคิดลายใหม่ให้ตรง */
const ป้ายรุ่นใหม่ = '<meta name="pk-ด่านรุ่น" content="ใหม่">'
// ⭐ ⛔ บทที่ 1 ⇒ หน้าของเล่มฝังบทแรกมาใน HTML แล้ว ⇒ หน้า ⛔ ขอไฟล์บท 1 ⇒ ใช้บทที่ 2
const บทที่เปลี่ยน = 'api/chapter/MRK/2.json'
function แก้เป็นรุ่นใหม่(ทาง, ชนิด, ไบต์) {
  if (/text\/html/.test(ชนิด)) return Buffer.from(ไบต์.toString('utf8').replace('<head>', '<head>' + ป้ายรุ่นใหม่))
  if (ทาง === บทที่เปลี่ยน) {
    const j = JSON.parse(ไบต์.toString('utf8'))
    j.ชั้น.WEB['1'] = 'ด่านรุ่นใหม่ ' + j.ชั้น.WEB['1']
    return Buffer.from(JSON.stringify(j))
  }
  return ไบต์
}
const เป็นHTMLในรายการ = (ทาง) => ทาง === '' || ทาง.endsWith('/') || ทาง.endsWith('.html')
async function รายการรุ่นใหม่(ไบต์) {
  const m = JSON.parse(ไบต์.toString('utf8'))
  for (const แถว of m.ไฟล์) {
    if (!เป็นHTMLในรายการ(แถว[0]) && แถว[0] !== บทที่เปลี่ยน) continue
    const ต = await ดึงต้นทาง(ต้นทาง.pathname + แถว[0])
    const ใหม่ = แก้เป็นรุ่นใหม่(แถว[0], เป็นHTMLในรายการ(แถว[0]) ? 'text/html' : ต.ชนิด, ต.ไบต์)
    แถว[1] = ลายของ(ใหม่)
    แถว[2] = ใหม่.length
  }
  return Buffer.from(JSON.stringify(m))
}

async function เปิดตัวกลาง() {
  const สภาพ = { ปิดเน็ต: false, รุ่นใหม่: false, พัง: null, บันทึก: [] }
  const เซิร์ฟ = createServer(async (req, res) => {
    if (สภาพ.ปิดเน็ต) {
      req.socket.destroy()
      return
    }
    let ทาง = req.url.split('?')[0]
    try {
      ทาง = decodeURIComponent(ทาง)
    } catch {}
    สภาพ.บันทึก.push(ทาง)
    try {
      const ตอบ = await fetch(ต้นทาง.origin + req.url, { redirect: 'manual' })
      let status = ตอบ.status
      const ชนิด = ตอบ.headers.get('content-type') || 'application/octet-stream'
      let ไบต์ = Buffer.from(await ตอบ.arrayBuffer())
      const ทางในเว็บ = ทาง.startsWith(ต้นทาง.pathname) ? ทาง.slice(ต้นทาง.pathname.length) : null
      if (สภาพ.รุ่นใหม่ && ทางในเว็บ !== null) {
        ไบต์ = ทางในเว็บ === 'offline.json' ? await รายการรุ่นใหม่(ไบต์) : แก้เป็นรุ่นใหม่(ทางในเว็บ, ชนิด, ไบต์)
      }
      if (สภาพ.พัง?.แก้ && ทางในเว็บ !== null) {
        const ผล = สภาพ.พัง.แก้(ทางในเว็บ, ไบต์, ชนิด)
        if (ผล?.status) status = ผล.status
        if (ผล?.ไบต์) ไบต์ = ผล.ไบต์
      }
      const หัว = { 'content-type': ชนิด, 'cache-control': 'no-cache' }
      if (ตอบ.headers.get('location')) หัว.location = ตอบ.headers.get('location')
      res.writeHead(status, หัว)
      res.end(ไบต์)
    } catch {
      res.writeHead(502).end()
    }
  })
  await new Promise((ok) => เซิร์ฟ.listen(0, '127.0.0.1', ok))
  const ที่ = `http://127.0.0.1:${เซิร์ฟ.address().port}${ต้นทาง.pathname.replace(/\/$/, '')}`
  return { สภาพ, ที่, ปิด: () => new Promise((ok) => เซิร์ฟ.close(ok)) }
}

// ---- เบราว์เซอร์ ------------------------------------------------------------------------------
const เบราว์เซอร์ = await chromium.launch()

/** ⭐ แทน `matchMedia` ⇒ ตอบ *ใช่* เฉพาะ `display-mode: standalone` ⇒ เหตุผลอยู่หัว `tools/ด่านปุ่มติดตั้งแอป.mjs` ข้อ ④ */
const จำลองเปิดเป็นแอป = () => {
  const เดิม = window.matchMedia.bind(window)
  const ปลอม = (q) => ({ matches: true, media: q, onchange: null, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false })
  window.matchMedia = (q) => (/display-mode:\s*standalone/.test(q) ? ปลอม(q) : เดิม(q))
}
/** ⭐ นับการขอที่เก็บถาวร ⇒ ตอบ *ยอม* แบบ Chrome กับแอปที่ติดตั้งแล้ว (บริบทของ Playwright ตอบ *ไม่ยอม* เสมอ) */
const นับขอถาวร = () => {
  window.__นับขอถาวร = 0
  if (navigator.storage) {
    navigator.storage.persist = async () => {
      window.__นับขอถาวร++
      return true
    }
    navigator.storage.persisted = async () => false
  }
}

async function บริบท(ตัวกลาง, { แอป, พัง }) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: 412, height: 900 }, hasTouch: true })
  await ctx.addInitScript(นับขอถาวร)
  if (แอป) await ctx.addInitScript(จำลองเปิดเป็นแอป)
  if (พัง?.ก่อนโหลด) await ctx.addInitScript(พัง.ก่อนโหลด)
  ตัวกลาง.สภาพ.พัง = พัง || null
  const ผิดในหน้า = []
  ctx.on('page', (p) => p.on('pageerror', (e) => ผิดในหน้า.push(String(e?.message || e))))
  return { ctx, ผิดในหน้า }
}
const นับคำขอบท = (ตัวกลาง, ตั้งแต่ = 0) => ตัวกลาง.สภาพ.บันทึก.slice(ตั้งแต่).filter((x) => x.includes('/api/chapter/')).length

async function รอตัวช่วยคุมหน้า(แท็บ) {
  await แท็บ.waitForFunction(() => navigator.serviceWorker?.controller, null, { timeout: 30000 })
}
/** ตัวบทของบท ⇒ ข้อที่ 2 ของฉบับนั้น ⇒ 40 ตัวอักษรกลางข้อ ⇒ อ่านจากเว็บที่ตรวจตรง ๆ (⛔ ผ่านตัวกลาง ⇒ ⛔ นับ · ⛔ โดนปิดเน็ต) */
async function ตัวบทที่ต้องเห็น(เล่ม, บท, ฉบับ) {
  const ต = await ดึงต้นทาง(`${ต้นทาง.pathname}api/chapter/${เล่ม}/${บท}.json`)
  const ข้อ = ปกติ(JSON.parse(ต.ไบต์.toString('utf8')).ชั้น[ฉบับ]['2'])
  return ข้อ.slice(5, 45)
}
async function เห็นข้อความ(แท็บ, ข้อความ, รอ = 20000) {
  return แท็บ
    .waitForFunction((x) => document.body.innerText.replace(/[​\s]+/g, ' ').includes(x), ข้อความ, { timeout: รอ })
    .then(() => true, () => false)
}
async function รอบรรทัด(แท็บ, รอ) {
  return แท็บ
    .waitForFunction((ต) => document.querySelector(ต)?.dataset.สถานะ, บรรทัดสถานะ, { timeout: รอ, polling: 500 })
    .then(() => แท็บ.evaluate((ต) => ({ สถานะ: document.querySelector(ต).dataset.สถานะ, คำ: document.querySelector(`${ต} p`)?.textContent?.trim() }), บรรทัดสถานะ))
    .catch(() => null)
}
/** ในหน้า ⇒ แคชของเรา ⇒ จำนวนไฟล์ในรายการที่อยู่ในแคชตัวบท · ชื่อแคช */
const อ่านแคช = (แท็บ) =>
  แท็บ.evaluate(async () => {
    const ชื่อ = await caches.keys()
    const ตัวบท = ชื่อ.find((n) => n.startsWith('phrakham-ตัวบท-'))
    const ที่เปิด = ชื่อ.find((n) => n.startsWith('phrakham-ที่เปิด-'))
    const ฐานเว็บ = new URL((await navigator.serviceWorker.getRegistration())?.scope || location.href).pathname
    const ผล = { ชื่อ, ในตัวบท: 0, ทั้งหมด: 0, ขาด: [], ที่เปิด: [] }
    if (ที่เปิด) ผล.ที่เปิด = (await (await caches.open(ที่เปิด)).keys()).map((r) => decodeURIComponent(new URL(r.url).pathname))
    if (!ตัวบท) return ผล
    const c = await caches.open(ตัวบท)
    const มี = new Set((await c.keys()).map((r) => r.url))
    ผล.ในตัวบท = มี.size
    const r = await c.match(new URL(ฐานเว็บ + 'offline.json', location.origin).href)
    const รายการ = r ? await r.json() : { ไฟล์: [] }
    ผล.ทั้งหมด = รายการ.ไฟล์.length
    for (const [ทาง] of รายการ.ไฟล์) if (!มี.has(new URL(ฐานเว็บ + ทาง, location.origin).href)) ผล.ขาด.push(ทาง)
    return ผล
  })

// ---- ฉาก ⇒ แต่ละฉากคืนรายการที่ตก (ขึ้นต้นด้วยเลขข้อ) -------------------------------------------
async function ฉากแท็บ(พัง) {
  const ตก = []
  const ตัวกลาง = await เปิดตัวกลาง()
  const { ctx } = await บริบท(ตัวกลาง, { พัง })
  try {
    const แท็บ = await ctx.newPage()
    await แท็บ.goto(ตัวกลาง.ที่ + '/')
    // ① ลงทะเบียน
    const ทะเบียน = await แท็บ
      .evaluate(async () => {
        for (let i = 0; i < 80; i++) {
          const r = (await navigator.serviceWorker.getRegistrations()).find((x) => x.active)
          if (r) return { ขอบเขต: r.scope, ไฟล์: r.active.scriptURL }
          await new Promise((ok) => setTimeout(ok, 250))
        }
        return null
      })
      .catch(() => null)
    const ฐานตัวกลาง = ตัวกลาง.ที่ + '/'
    if (!ทะเบียน) ตก.push(`① ⛔ มีตัวช่วยออฟไลน์ที่ทำงานภายใน 20 วินาที ⇒ ${ฐานตัวกลาง}sw.js ลงทะเบียนไม่ได้`)
    else {
      if (ทะเบียน.ขอบเขต !== ฐานตัวกลาง) ตก.push(`① ขอบเขต ${ทะเบียน.ขอบเขต} ⇒ ต้องเป็นฐานของเว็บ ${ฐานตัวกลาง}`)
      if (!ทะเบียน.ไฟล์.startsWith(ฐานตัวกลาง + 'sw.js')) ตก.push(`① ไฟล์ตัวช่วย ${ทะเบียน.ไฟล์} ⛔ อยู่ใต้ฐาน`)
      await แท็บ.reload()
      const คุม = await รอตัวช่วยคุมหน้า(แท็บ).then(() => true, () => false)
      if (!คุม) ตก.push('① โหลดหน้าใหม่แล้วตัวช่วยออฟไลน์ ⛔ คุมหน้า')
    }
    // ② แท็บธรรมดา ⛔ เก็บทั้งเล่ม
    const ก่อน = ตัวกลาง.สภาพ.บันทึก.length
    await แท็บ.goto(ตัวกลาง.ที่ + '/read/MRK?c=14')
    await เห็นข้อความ(แท็บ, await ตัวบทที่ต้องเห็น('MRK', 14, 'TCV'))
    await แท็บ.waitForTimeout(6000)
    const n = นับคำขอบท(ตัวกลาง, ก่อน)
    if (n > 3) ตก.push(`② แท็บธรรมดาขอไฟล์บท ${n} ไฟล์ ⇒ ต้องไม่เกิน 3 (เก็บแค่ที่เปิด ⛔ เก็บทั้งเล่ม)`)
    const แคช = await อ่านแคช(แท็บ)
    if (แคช.ในตัวบท > 0) ตก.push(`② แท็บธรรมดามีแคชตัวบท ${แคช.ในตัวบท} ไฟล์ ⇒ ต้องว่าง`)
    if (ทะเบียน && !แคช.ที่เปิด.some((x) => x.endsWith('/api/chapter/MRK/14.json'))) ตก.push('② บทที่เปิด (มาระโก 14) ⛔ อยู่ในแคชที่เปิด ⇒ ไม่มีเน็ตจะเปิดซ้ำไม่ได้')
    // ⑩ แท็บธรรมดา ⛔ ขอที่ถาวร
    const ขอ = await แท็บ.evaluate(() => window.__นับขอถาวร)
    if (ขอ) ตก.push(`⑩ แท็บธรรมดาขอที่เก็บถาวร ${ขอ} ครั้ง ⇒ ต้องขอเฉพาะเปิดเป็นแอป`)
  } finally {
    await ctx.close()
    await ตัวกลาง.ปิด()
  }
  return ตก
}

/** ③ ส่วนที่ไม่ต้องเปิดเบราว์เซอร์ ⇒ รายการครบทุกบททุกเล่ม · หน้าเล่ม · ไฟล์ที่หน้าอ้าง */
async function ตรวจรายการ(ตัวกลาง) {
  const ตก = []
  const ดึงผ่าน = async (ทาง) => {
    const r = await fetch(ตัวกลาง.ที่ + '/' + ทาง)
    return { ok: r.ok, status: r.status, text: await r.text() }
  }
  const ร = await ดึงผ่าน('offline.json')
  if (!ร.ok) return [`③ ${ตัวกลาง.ที่}/offline.json ตอบ ${ร.status} ⇒ ⛔ มีรายการไฟล์ที่ต้องเก็บ`]
  let รายการ
  try {
    รายการ = JSON.parse(ร.text)
  } catch {
    return ['③ offline.json อ่านไม่ออก']
  }
  const มี = new Set(รายการ.ไฟล์.map(([ทาง]) => ทาง))
  const เล่ม = JSON.parse((await ดึงผ่าน('api/books.json')).text).เล่ม
  const ขาด = []
  for (const ต้อง of ['', 'read/', '404.html', '200.html', 'api/books.json', 'api/paragraphs.json', 'api/audio.json', 'manifest.webmanifest'])
    if (!มี.has(ต้อง)) ขาด.push(ต้อง || '(หน้าแรก)')
  let บท = 0
  for (const ล of เล่ม) {
    for (const ต้อง of [`read/${ล.รหัส}/`, `read/${ล.รหัส}/_payload.json`, `api/book/${ล.รหัส}.json`]) if (!มี.has(ต้อง)) ขาด.push(ต้อง)
    for (const ข of ล.บทที่มี) {
      บท++
      if (!มี.has(`api/chapter/${ล.รหัส}/${ข}.json`)) ขาด.push(`api/chapter/${ล.รหัส}/${ข}.json`)
    }
  }
  // ไฟล์ที่หน้าแรกกับหน้าอ่านอ้างในไฟล์ HTML (`_nuxt` · ฟอนต์ · ไอคอน) ⇒ ต้องอยู่ในรายการทุกตัว
  for (const หน้า of ['', 'read/MRK/']) {
    const html = (await ดึงผ่าน(หน้า)).text
    for (const [, ที่] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      let ทาง
      try {
        ทาง = decodeURIComponent(new URL(ที่, ตัวกลาง.ที่ + '/' + หน้า).pathname)
      } catch {
        continue
      }
      if (!ทาง.startsWith(ต้นทาง.pathname)) continue
      ทาง = ทาง.slice(ต้นทาง.pathname.length)
      if (/^(_nuxt|fonts|icons)\//.test(ทาง) && !มี.has(ทาง)) ขาด.push(ทาง)
    }
  }
  if (ขาด.length) ตก.push(`③ รายการ offline.json ขาด ${ขาด.length} ไฟล์ เช่น ${ขาด.slice(0, 4).join(' · ')}`)
  const ไม่ควร = [...มี].filter((ทาง) => /^(api\/(card|words|lex|story)|story-audio|audio)\//.test(ทาง))
  if (ไม่ควร.length) ตก.push(`③ รายการมีของที่ ⛔ เก็บล่วงหน้า ${ไม่ควร.length} ไฟล์ เช่น ${ไม่ควร.slice(0, 3).join(' · ')}`)
  return { ตก, บท, เล่ม: เล่ม.length, ไฟล์: รายการ.ไฟล์.length, MB: (รายการ.ขนาดรวม / 1e6).toFixed(1) }
}

let สรุปรายการ = null
async function ฉากแอป(พัง) {
  const ตก = []
  const ตัวกลาง = await เปิดตัวกลาง()
  const { ctx, ผิดในหน้า } = await บริบท(ตัวกลาง, { แอป: true, พัง })
  try {
    const ร = await ตรวจรายการ(ตัวกลาง)
    if (Array.isArray(ร)) ตก.push(...ร)
    else {
      ตก.push(...ร.ตก)
      สรุปรายการ = ร
    }
    // ③ เก็บทั้งเล่ม ⇒ รอบรรทัดสถานะ
    const แท็บ = await ctx.newPage()
    await แท็บ.goto(ตัวกลาง.ที่ + '/')
    const เริ่ม = Date.now()
    let บรรทัด = await รอบรรทัด(แท็บ, รอเก็บนานสุด)
    const วินาที = Math.round((Date.now() - เริ่ม) / 1000)
    if (!บรรทัด) ตก.push(`③ รอ ${วินาที} วินาทีแล้ว บรรทัดสถานะออฟไลน์ ⛔ ขึ้น ⇒ เก็บทั้งเล่มไม่จบ`)
    else if (บรรทัด.สถานะ !== 'พร้อม') ตก.push(`③ บรรทัดสถานะเป็น "${บรรทัด.สถานะ}" (${บรรทัด.คำ}) ⇒ ต้องเป็น พร้อม`)
    else if (บรรทัด.คำ !== คำ.พร้อมใช้) ตก.push(`③ บรรทัดพร้อมใช้เป็น "${บรรทัด.คำ}" ⇒ ต้องเป็น "${คำ.พร้อมใช้}"`)
    const แคช = await อ่านแคช(แท็บ)
    if (!แคช.ทั้งหมด || แคช.ขาด.length) ตก.push(`③ แคชตัวบทขาด ${แคช.ขาด.length} จาก ${แคช.ทั้งหมด} ไฟล์ เช่น ${แคช.ขาด.slice(0, 3).join(' · ')}`)
    if (สรุปรายการ) สรุปรายการ.วินาที = วินาที
    // ⑩ ขอที่ถาวร
    const ขอ = await แท็บ.evaluate(() => window.__นับขอถาวร)
    if (!ขอ) ตก.push('⑩ เปิดเป็นแอปแล้ว ⛔ ขอที่เก็บถาวร (navigator.storage.persist) ⇒ เครื่องลบตัวบทที่เก็บไว้ทิ้งได้เอง')

    // ⑤ ตอนมีเน็ต ⇒ เปิดมาระโก 10 ภาษาเดิม ⇒ กดคำแรก
    const ที่ภาษาเดิม = ตัวกลาง.ที่ + '/read/MRK?c=10&t=TCV,SBLGNT'
    await แท็บ.goto(ที่ภาษาเดิม)
    let การ์ดตอนมีเน็ต = ''
    try {
      await แท็บ.locator(คำในชั้นคำ).first().click({ timeout: 20000 })
      await แท็บ.locator(การ์ดคำ).first().waitFor({ timeout: 20000 })
      await แท็บ.waitForTimeout(800)
      การ์ดตอนมีเน็ต = ปกติ(await แท็บ.locator(การ์ดคำ).first().innerText()).slice(0, 80)
    } catch (เหตุ) {
      ตก.push(`⑤ ตอนมีเน็ตยังเปิดการ์ดคำเดิมของมาระโก 10 ไม่ได้ ⇒ ${String(เหตุ.message).split('\n')[0]}`)
    }
    await แท็บ.waitForTimeout(1500) // ⭐ ให้ตัวช่วยเก็บไฟล์ที่เพิ่งเปิดลงแคชให้เสร็จ (`waitUntil`)

    // ---- ปิดเน็ต ----
    ตัวกลาง.สภาพ.ปิดเน็ต = true
    await ctx.setOffline(true)
    // ④ บทที่ไม่เคยเปิด ทุกฉบับ
    for (const [เล่ม, บท, ฉบับ] of [
      ['2KI', 3, 'WEB'],
      ['ROM', 8, 'KJV'],
    ]) {
      const ต้องเห็น = await ตัวบทที่ต้องเห็น(เล่ม, บท, ฉบับ)
      const ไป = await แท็บ.goto(`${ตัวกลาง.ที่}/read/${เล่ม}?c=${บท}&t=${ฉบับ}`).then(() => true, (e) => String(e.message).split('\n')[0])
      if (ไป !== true) ตก.push(`④ ⛔ เน็ต ⇒ เปิด ${เล่ม} ${บท} (${ฉบับ}) ไม่ได้ ⇒ ${ไป}`)
      else if (!(await เห็นข้อความ(แท็บ, ต้องเห็น))) ตก.push(`④ ⛔ เน็ต ⇒ ${เล่ม} ${บท} (${ฉบับ}) ⛔ เห็นตัวบท "${ต้องเห็น}"`)
    }
    // ⑤ ⛔ เน็ต ⇒ การ์ดของบทที่เปิดแล้ว
    if (การ์ดตอนมีเน็ต) {
      try {
        await แท็บ.goto(ที่ภาษาเดิม)
        await แท็บ.locator(คำในชั้นคำ).first().click({ timeout: 20000 })
        await แท็บ.locator(การ์ดคำ).first().waitFor({ timeout: 15000 })
        await แท็บ.waitForTimeout(800)
        const ได้ = ปกติ(await แท็บ.locator(การ์ดคำ).first().innerText()).slice(0, 80)
        if (ได้ !== การ์ดตอนมีเน็ต) ตก.push(`⑤ ⛔ เน็ต ⇒ การ์ดคำเดิมของมาระโก 10 เป็น "${ได้}" ⇒ ต้องเหมือนตอนมีเน็ต "${การ์ดตอนมีเน็ต}"`)
      } catch (เหตุ) {
        ตก.push(`⑤ ⛔ เน็ต ⇒ การ์ดคำเดิมของมาระโก 10 (เปิดแล้วตอนมีเน็ต) ⛔ ขึ้น ⇒ ${String(เหตุ.message).split('\n')[0]}`)
      }
    }
    // ⑥ ⛔ เน็ต ⇒ บทที่ไม่เคยเปิด + ภาษาเดิม ⇒ ⛔ พังทั้งหน้า
    ผิดในหน้า.length = 0
    const ต้องเห็นTCV = await ตัวบทที่ต้องเห็น('2KI', 4, 'TCV')
    await แท็บ.goto(`${ตัวกลาง.ที่}/read/2KI?c=4&t=TCV,WLC`).catch(() => {})
    if (!(await เห็นข้อความ(แท็บ, ต้องเห็นTCV))) ตก.push('⑥ ⛔ เน็ต ⇒ 2 พงศ์กษัตริย์ 4 พร้อมภาษาเดิม ⇒ ตัวบท TCV ⛔ ขึ้น ⇒ หน้าพังทั้งหน้า')
    await แท็บ.waitForTimeout(3000)
    if (await แท็บ.locator(คำในชั้นคำ).count()) {
      await แท็บ.locator(คำในชั้นคำ).first().click({ timeout: 5000 }).catch(() => {})
      await แท็บ.waitForTimeout(2000)
    }
    if (!(await เห็นข้อความ(แท็บ, ต้องเห็นTCV, 3000))) ตก.push('⑥ ⛔ เน็ต ⇒ กดคำภาษาเดิมที่ไม่มีในเครื่องแล้วตัวบทหายจากหน้า')
    if (ผิดในหน้า.length) ตก.push(`⑥ ⛔ เน็ต ⇒ ภาษาเดิมที่ไม่มีในเครื่องทำให้มีข้อผิดพลาดหลุดในหน้า ⇒ ${ผิดในหน้า[0].slice(0, 120)}`)

    // ---- เน็ตกลับมา + เว็บขึ้นรุ่นใหม่ ----
    ตัวกลาง.สภาพ.ปิดเน็ต = false
    await ctx.setOffline(false)
    ตัวกลาง.สภาพ.รุ่นใหม่ = true
    const ก่อนเก็บใหม่ = ตัวกลาง.สภาพ.บันทึก.length
    // ⑦ HTML ⇒ เน็ตก่อน
    await แท็บ.goto(ตัวกลาง.ที่ + '/')
    const มีป้าย = await แท็บ.evaluate(() => !!document.querySelector('meta[name="pk-ด่านรุ่น"]'))
    if (!มีป้าย) ตก.push('⑦ เน็ตกลับมาแล้วหน้าแรกยังเป็น HTML รุ่นเก่าจากที่เก็บ ⇒ ผู้อ่านติดอยู่กับรุ่นเก่า')
    // ⑦ JSON ⇒ เน็ตก่อน
    await แท็บ.goto(ตัวกลาง.ที่ + '/read/MRK?c=2&t=WEB')
    if (!(await เห็นข้อความ(แท็บ, 'ด่านรุ่นใหม่'))) ตก.push('⑦ เน็ตกลับมาแล้วมาระโก 2 ยังเป็นตัวบทรุ่นเก่าจากที่เก็บ ⇒ ผู้อ่านติดอยู่กับรุ่นเก่า')
    // ⑧ เปิดแอปใหม่ ⇒ รอบเก็บดึงเฉพาะที่เปลี่ยน
    await แท็บ.goto(ตัวกลาง.ที่ + '/')
    const ได้รุ่นใหม่ = await แท็บ
      .evaluate(async (ทาง) => {
        for (let i = 0; i < 120; i++) {
          const n = (await caches.keys()).find((x) => x.startsWith('phrakham-ตัวบท-'))
          const reg = await navigator.serviceWorker.getRegistration()
          if (n && reg) {
            const r = await (await caches.open(n)).match(new URL(new URL(reg.scope).pathname + ทาง, location.origin).href)
            if (r && (await r.text()).includes('ด่านรุ่นใหม่')) return true
          }
          await new Promise((ok) => setTimeout(ok, 1000))
        }
        return false
      }, บทที่เปลี่ยน)
      .catch(() => false)
    บรรทัด = await รอบรรทัด(แท็บ, 60000)
    await แท็บ.waitForTimeout(2000)
    const n = นับคำขอบท(ตัวกลาง, ก่อนเก็บใหม่)
    if (!ได้รุ่นใหม่) ตก.push(`⑧ เว็บขึ้นรุ่นใหม่แล้ว แคชตัวบทยังมี ${บทที่เปลี่ยน} รุ่นเก่า ⇒ รอบเก็บ ⛔ ดึงไฟล์ที่ลายเปลี่ยน`)
    if (n > 2) ตก.push(`⑧ เว็บขึ้นรุ่นใหม่ (บทเปลี่ยน 1 บท) ⇒ ขอไฟล์บท ${n} ครั้ง ⇒ ต้องไม่เกิน 2 (ดึงเฉพาะที่เปลี่ยน)`)
    if (บรรทัด?.สถานะ !== 'พร้อม') ตก.push(`⑧ เก็บรุ่นใหม่แล้วบรรทัดสถานะเป็น "${บรรทัด?.สถานะ}" ⇒ ต้องกลับมาเป็น พร้อม`)
  } finally {
    await ctx.close()
    await ตัวกลาง.ปิด()
  }
  return ตก
}

/** ⭐ ของยัดใน `sw.js` ⇒ `Cache.put` ของไฟล์บทเต็มหลังบทที่ 30 ⇒ ท่าเดียวกับเครื่องที่ที่เก็บหมดกลางทาง */
const ยัดที่เก็บเต็ม = `;(() => { const เดิม = Cache.prototype.put; let n = 0
  Cache.prototype.put = function (k, r) {
    const u = typeof k === 'string' ? k : k.url
    if (/\\/api\\/chapter\\//.test(decodeURIComponent(u)) && ++n > 30) return Promise.reject(new DOMException('ด่าน: ที่เก็บเต็ม', 'QuotaExceededError'))
    return เดิม.call(this, k, r)
  } })();\n`

async function ฉากเต็ม(พัง) {
  const ตก = []
  const ตัวกลาง = await เปิดตัวกลาง()
  const แก้ของพัง = พัง?.แก้
  const พังรวม = {
    ...(พัง || {}),
    แก้: (ทาง, ไบต์, ชนิด) => {
      let ผล = แก้ของพัง ? แก้ของพัง(ทาง, ไบต์, ชนิด) : null
      if (ทาง === 'sw.js') ผล = { ...(ผล || {}), ไบต์: Buffer.from(ยัดที่เก็บเต็ม + (ผล?.ไบต์ || ไบต์).toString('utf8')) }
      return ผล
    },
  }
  const { ctx } = await บริบท(ตัวกลาง, { แอป: true, พัง: พังรวม })
  try {
    const แท็บ = await ctx.newPage()
    await แท็บ.goto(ตัวกลาง.ที่ + '/')
    const บรรทัด = await รอบรรทัด(แท็บ, 180000)
    if (!บรรทัด) ตก.push('⑨ ที่เก็บเต็มกลางทาง ⇒ บรรทัดสถานะ ⛔ ขึ้นภายใน 3 นาที')
    else if (บรรทัด.สถานะ !== 'เต็ม') ตก.push(`⑨ ที่เก็บเต็มกลางทาง ⇒ บรรทัดสถานะเป็น "${บรรทัด.สถานะ}" (${บรรทัด.คำ}) ⇒ ต้องเป็น เต็ม`)
    else if (บรรทัด.คำ !== คำ.ที่เก็บเต็ม) ตก.push(`⑨ บรรทัดที่เก็บเต็มเป็น "${บรรทัด.คำ}" ⇒ ต้องเป็น "${คำ.ที่เก็บเต็ม}"`)
    const ตอนขึ้น = นับคำขอบท(ตัวกลาง)
    await แท็บ.waitForTimeout(5000)
    const หลัง = นับคำขอบท(ตัวกลาง)
    if (ตอนขึ้น > 60) ตก.push(`⑨ ที่เก็บเต็มหลังบทที่ 30 แต่ขอไฟล์บทไป ${ตอนขึ้น} ไฟล์ ⇒ ต้องหยุดทันที (ไม่เกิน 60)`)
    if (หลัง > ตอนขึ้น) ตก.push(`⑨ ที่เก็บเต็มแล้วยังขอไฟล์บทต่อ ${หลัง - ตอนขึ้น} ไฟล์ใน 5 วินาที ⇒ วนไม่จบ`)
  } finally {
    await ctx.close()
    await ตัวกลาง.ปิด()
  }
  return ตก
}

const ฉาก = { แท็บ: ฉากแท็บ, แอป: ฉากแอป, เต็ม: ฉากเต็ม }
const ข้อของฉาก = { แท็บ: ['①', '②', '⑩'], แอป: ['③', '④', '⑤', '⑥', '⑦', '⑧', '⑩'], เต็ม: ['⑨'] }

async function วิ่งฉาก(ชื่อ, พัง) {
  try {
    return await ฉาก[ชื่อ](พัง)
  } catch (เหตุ) {
    // ⭐ ล้มกลางฉาก ⇒ นับเป็นข้อแรกของฉากตก ⇒ ⛔ ด่านทั้งตัวล้มเงียบ
    return [`${ข้อของฉาก[ชื่อ][0]} ฉาก${ชื่อ}ล้มกลางทาง ⇒ ${String(เหตุ?.message || เหตุ).split('\n')[0]}`]
  }
}

// ---- ของพัง ⇒ แต่ละท่าต้องทำให้ข้อของมันแดง -----------------------------------------------------
/** แทนคำใน `sw.js` ⇒ หาไม่เจอ ⇒ ส่ง `sw.js` ที่โยนข้อผิดพลาด ⇒ ⛔ ผ่านเงียบ (ด่านจะแดงข้อแรกของฉากแทน ⇒ ท่านั้นนับว่าจับไม่ได้) */
const แทนในตัวช่วย = (เดิม, ใหม่) => (ทาง, ไบต์) => {
  if (ทาง !== 'sw.js') return null
  const s = ไบต์.toString('utf8')
  if (!s.includes(เดิม)) return { ไบต์: Buffer.from(`throw new Error('ด่าน: หาคำที่จะแทนใน sw.js ไม่เจอ ${JSON.stringify(เดิม).slice(0, 60)}')`) }
  return { ไบต์: Buffer.from(s.replace(เดิม, ใหม่)) }
}
const ของพัง = {
  'ไฟล์ sw.js หาย': { ฉาก: 'แท็บ', ข้อ: '①', แก้: (ทาง) => (ทาง === 'sw.js' ? { status: 404, ไบต์: Buffer.from('') } : null) },
  'แท็บธรรมดาเก็บทั้งเล่มเอง': {
    ฉาก: 'แท็บ',
    ข้อ: '②',
    แก้: แทนในตัวช่วย("self.addEventListener('install', () => self.skipWaiting())", "self.addEventListener('install', () => self.skipWaiting())\nself.addEventListener('activate', (e) => e.waitUntil(เก็บรอบหนึ่ง()))"),
  },
  'แท็บธรรมดาขอที่เก็บถาวร': {
    ฉาก: 'แท็บ',
    ข้อ: '⑩',
    ก่อนโหลด: () => window.addEventListener('load', () => setTimeout(() => navigator.storage.persist(), 500)),
  },
  'รายการขาดบท': {
    ฉาก: 'แอป',
    ข้อ: '③',
    แก้: (ทาง, ไบต์) => {
      if (ทาง !== 'offline.json') return null
      const m = JSON.parse(ไบต์.toString('utf8'))
      m.ไฟล์ = m.ไฟล์.filter(([t]) => t !== 'api/chapter/OBA/1.json')
      return { ไบต์: Buffer.from(JSON.stringify(m)) }
    },
  },
  'ไฟล์บทหนึ่งดึงไม่ได้ แต่บอกว่าพร้อม': { ฉาก: 'แอป', ข้อ: '③', แก้: (ทาง) => (ทาง === 'api/chapter/JUD/1.json' ? { status: 404, ไบต์: Buffer.from('') } : null) },
  'ไม่มีเน็ตแล้วไม่ใช้ตัวบทที่เก็บไว้': {
    ฉาก: 'แอป',
    ข้อ: '④',
    แก้: แทนในตัวช่วย('async function หาในแคช(กุญแจ) {', "async function หาในแคช(กุญแจ) {\n  if (/\\/api\\/chapter\\/(2KI|ROM)\\//.test(decodeURIComponent(กุญแจ))) return null"),
  },
  'ไม่เก็บภาษาเดิมที่เปิดแล้ว': {
    ฉาก: 'แอป',
    ข้อ: '⑤',
    แก้: แทนในตัวช่วย('const เก็บตอนเปิด = (ทาง) => true', 'const เก็บตอนเปิด = (ทาง) => !/^api\\/(card|words|lex)\\//.test(ทาง)'),
  },
  'ภาษาเดิมที่ไม่มีในเครื่องทำหน้าพัง': {
    ฉาก: 'แอป',
    ข้อ: '⑥',
    ก่อนโหลด: () => {
      const เดิม = window.fetch
      window.fetch = function (...a) {
        return เดิม.apply(this, a).catch((e) => {
          if (/\/api\/(words|card|lex)\//.test(String(a[0]?.url || a[0]))) setTimeout(() => { throw new Error('ด่าน: ภาษาเดิมโหลดไม่ได้แล้วหน้าพัง') })
          throw e
        })
      }
    },
  },
  'HTML กับ JSON ใช้ที่เก็บก่อน': {
    ฉาก: 'แอป',
    ข้อ: '⑦',
    แก้: แทนในตัวช่วย("const ใช้ที่เก็บก่อน = (ทาง) => /^_nuxt\\//.test(ทาง) && !/\\.json$/.test(ทาง)", 'const ใช้ที่เก็บก่อน = (ทาง) => true'),
  },
  'เก็บใหม่ทั้งก้อนทุกรอบ': {
    ฉาก: 'แอป',
    ข้อ: '⑧',
    แก้: แทนในตัวช่วย('const ครบ = (ทาง, ลาย) => สมุด[ทาง] === ลาย && มีอยู่.has(ที่อยู่(ทาง))', 'const ครบ = () => false'),
  },
  'เปิดเป็นแอปแล้วไม่ขอที่ถาวร': {
    ฉาก: 'แอป',
    ข้อ: '⑩',
    // ⭐ ของปลอมของด่านนับเฉพาะ `persist` ⇒ โค้ดของเว็บเรียกชื่ออื่น ⇒ นับได้ 0 (ท่าเดียวกับเว็บลืมเรียก)
    แก้: (ทาง, ไบต์, ชนิด) => (/^_nuxt\/.*\.js$/.test(ทาง) && ไบต์.includes('.persist()') ? { ไบต์: Buffer.from(ไบต์.toString('utf8').replaceAll('.persist()', '.persisted()')) } : null),
  },
  'ที่เก็บเต็มแล้วยังดึงต่อ': {
    ฉาก: 'เต็ม',
    ข้อ: '⑨',
    แก้: แทนในตัวช่วย('const ที่เก็บเต็ม = (เหตุ) =>', 'const ที่เก็บเต็ม = (เหตุ) => false && '),
  },
}

// ---- วิ่ง --------------------------------------------------------------------------------------
const จริง = []
for (const ชื่อ of Object.keys(ฉาก)) {
  const ตก = await วิ่งฉาก(ชื่อ)
  console.log(`ฉาก${ชื่อ} ⇒ ${ตก.length ? `ตก ${ตก.length}` : 'ผ่าน'} (ข้อ ${ข้อของฉาก[ชื่อ].join(' ')})`)
  จริง.push(...ตก)
}
if (ทดสอบตัวเอง) {
  if (จริง.length) {
    console.error('⛔ โหมดพิสูจน์: ของจริงบนเว็บก็ไม่ผ่านด้วย ⇒ ไปแก้เว็บก่อน')
    for (const x of จริง) console.error('  - ' + x)
    await เบราว์เซอร์.close()
    process.exit(1)
  }
  console.log('ของจริงผ่านครบ ⇒ ยัดของพังทีละท่า')
  const ไม่จับ = []
  for (const [ชื่อ, พัง] of Object.entries(ของพัง)) {
    const ตก = await วิ่งฉาก(พัง.ฉาก, พัง)
    const เช่น = ตก.find((x) => x.startsWith(พัง.ข้อ) && !x.includes('หาคำที่จะแทนใน sw.js ไม่เจอ'))
    console.log(`  ${เช่น ? '✅' : '⛔'} ${พัง.ข้อ} ${ชื่อ}${เช่น ? ` ⇒ เช่น ${เช่น}` : ` ⇒ ข้อ ${พัง.ข้อ} ⛔ แดง ${JSON.stringify(ตก)}`}`)
    if (!เช่น) ไม่จับ.push(ชื่อ)
  }
  await เบราว์เซอร์.close()
  if (ไม่จับ.length) {
    console.error(`\n⛔ โหมดพิสูจน์: ยัดของพังแล้ว **ด่านยังไม่เห็น ${ไม่จับ.length} ท่า** ⇒ ด่านตายบางส่วน`)
    for (const x of ไม่จับ) console.error('  - ' + x)
    process.exit(1)
  }
  console.log(`\n✅ โหมดพิสูจน์: ด่านจับของพังได้ครบ ${Object.keys(ของพัง).length} ท่า ⇒ ทุกข้อ ①–⑩ แดงได้ด้วยตัวเอง`)
  process.exit(0)
}

await เบราว์เซอร์.close()
if (จริง.length) {
  console.error(`\n⛔ ไม่ผ่าน — ${จริง.length} รายการ:`)
  for (const x of จริง) console.error('  - ' + x)
  process.exit(1)
}
const ร = สรุปรายการ || {}
console.log(
  `✅ ออฟไลน์ผ่านครบ 10 ข้อ ⇒ ตัวช่วยขอบเขต ${ฐาน}/ · แท็บธรรมดาเก็บแค่ที่เปิด · แอปเก็บ ${ร.ไฟล์} ไฟล์ ${ร.MB} MB (${ร.เล่ม} เล่ม ${ร.บท} บท) ใน ${ร.วินาที} วินาที` +
    ' · ⛔ เน็ตเปิดบทที่ไม่เคยเปิดได้ · การ์ดคำเดิมของบทที่เปิดแล้วใช้ได้ · บทที่ไม่เคยเปิด ⛔ พัง · HTML/JSON เน็ตก่อน · รอบใหม่ดึงเฉพาะที่เปลี่ยน · เต็มแล้วหยุด · ขอที่ถาวร',
)
