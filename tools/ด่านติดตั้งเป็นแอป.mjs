// ด่าน — **เว็บต้องติดตั้งเป็นแอปบนมือถือได้** (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/167)
//
//   node tools/ด่านติดตั้งเป็นแอป.mjs http://127.0.0.1:5396/phrakham                  ⇒ ตรวจเว็บที่สร้างเสร็จ
//   node tools/ด่านติดตั้งเป็นแอป.mjs http://127.0.0.1:5396/phrakham --ผลที่ ผลติดตั้งแอป ⇒ เก็บผลของ Chrome เป็นไฟล์
//   node tools/ด่านติดตั้งเป็นแอป.mjs http://127.0.0.1:5396/phrakham --ทดสอบตัวเอง     ⇒ ยัดของพังแล้วด่านต้องจับได้
//
// **ทำไมต้องมีด่าน** ⇒ manifest กับป้ายในหัวหน้าเว็บ ⛔ ไม่มีใครเห็นด้วยตาระหว่างทำงาน
//   ⇒ วันที่ชื่อไฟล์เปลี่ยน รูปหาย หรือหน้าเปิดหลุดฐาน **เว็บยังเปิดอ่านได้ปกติ แต่ปุ่มติดตั้งหายเงียบ**
//
// ⭐ **ตัวตัดสินหลักคือ Chrome เอง** ⇒ ถามผ่านช่องเดียวกับแผง Application ของ DevTools
//   ⇒ `Page.getInstallabilityErrors` ต้องคืนรายการว่าง ⇒ ⛔ ไม่ได้เดาเกณฑ์ของ Chrome เอง
//   ⇒ ส่วนที่ Chrome ⛔ ไม่ดูแต่ใบงานสั่ง ⇒ ด่านนี้ดูเพิ่มเอง:
//   ① ชื่อแอปตรงชื่อเว็บ และตรงชื่อใต้ไอคอนของ iPhone
//   ② หน้าที่เปิดจากไอคอนคือหน้าแรกใต้ฐานของเว็บเอง และเปิดได้จริง
//   ③ สีแถบบนกับสีพื้นตอนเปิดแอป ตรงสีพื้นกระดาษ `--color-pk-paper` ใน `app/assets/css/main.css`
//   ④ รูปทุกรูปที่ประกาศ เปิดได้จริงและขนาดจริงตรงที่ประกาศ ⇒ มี 192 กับ 512 ครบ
//   ⑤ รูปไอคอนของ iPhone (`apple-touch-icon`) เปิดได้จริง ขนาด 180
//   ⑥ ⛔ ไม่มีตัวช่วยออฟไลน์ (service worker) ⇒ ใบงานสั่งไม่ทำ ⇒ เว็บเดิมมี `/sw.js` ที่ต้องวางแผนตอนย้าย
//
// **พิสูจน์ว่าด่านแดงได้จริง** ⇒ ท่า `--ทดสอบตัวเอง` ดักของที่เบราว์เซอร์ขอ แล้วส่งของพังกลับไปทีละอาการ
//   ⇒ ทุกอาการต้องถูกจับด้วยข้อของมันเอง ⛔ ไม่ใช่ข้ออื่นที่บังเอิญแดง

import { chromium } from 'playwright'
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const ฐาน = (process.argv[2] || 'http://127.0.0.1:5396/phrakham').replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const ที่เก็บผล = process.argv.includes('--ผลที่') ? process.argv[process.argv.indexOf('--ผลที่') + 1] : null

// ⭐ ชื่อเว็บที่มีอยู่แล้ว ⇒ เจ้าของคือ `title` ใน `nuxt.config.ts` ⛔ ไม่ใช่คำใหม่ของด่านนี้
const ชื่อเว็บ = 'พระคำ.ชีวิต'
const สีกระดาษ = (() => {
  const css = readFileSync(fileURLToPath(new URL('../app/assets/css/main.css', import.meta.url)), 'utf8')
  const เจอ = css.match(/--color-pk-paper:\s*(#[0-9a-fA-F]{6})/)
  if (!เจอ) throw new Error('⛔ หา --color-pk-paper ใน main.css ไม่เจอ')
  return เจอ[1].toLowerCase()
})()

/** ตรวจหน้าแรก 1 รอบในบริบทที่ให้มา ⇒ คืน { ตก, หลักฐาน } */
async function ตรวจ(ctx) {
  const ตก = []
  const แท็บ = await ctx.newPage()
  const หน้าแรก = ฐาน + '/'
  await แท็บ.goto(หน้าแรก, { waitUntil: 'load' })
  const cdp = await ctx.newCDPSession(แท็บ)

  const { url: ที่manifest, errors: ผิดรูปแบบ, data } = await cdp.send('Page.getAppManifest')
  const { installabilityErrors } = await cdp.send('Page.getInstallabilityErrors')
  const หลักฐาน = { หน้าแรก, ที่manifest, ผิดรูปแบบ, installabilityErrors, manifest: null }

  // ⓪ คำตัดสินของ Chrome
  for (const ข of installabilityErrors)
    ตก.push(`⓪ Chrome ว่าติดตั้งไม่ได้ ⇒ ${ข.errorId}${ข.errorArguments?.length ? ' ' + JSON.stringify(ข.errorArguments) : ''}`)
  for (const ข of ผิดรูปแบบ || []) if (ข.critical) ตก.push(`⓪ manifest ผิดรูปแบบ ⇒ ${ข.message}`)

  let m = null
  try {
    m = data ? JSON.parse(data) : null
  } catch {}
  หลักฐาน.manifest = m
  if (!m) {
    ตก.push('⓪ หน้าแรกไม่มี manifest หรืออ่านไม่ออก')
    await แท็บ.close()
    return { ตก, หลักฐาน }
  }

  // ⭐ อ่านป้ายจาก **ไฟล์ที่ที่วางเว็บส่งมา** ⛔ ไม่ใช่จากหน้าที่โค้ดของเว็บวิ่งเสร็จแล้ว
  //   ⇒ โค้ดของเว็บเติมป้ายกลับเข้าหน้าเองหลังโหลด ⇒ อ่านจากหน้า = ป้ายหายจากไฟล์แล้วด่านยังเขียว
  //   (เจอเองตอนทำฝาแฝด ใบ #167) ⇒ ไฟล์ต้องมีป้ายเอง เพราะเบราว์เซอร์อ่านป้ายพวกนี้ได้ก่อนโค้ดวิ่ง
  const ป้าย = await แท็บ.evaluate(async () => {
    const html = await (await fetch(location.href, { cache: 'no-store' })).text()
    const d = new DOMParser().parseFromString(html, 'text/html')
    const ราก = (ที่) => (ที่ ? new URL(ที่, location.href).href : null)
    return {
      ชื่อiPhone: d.querySelector('meta[name="apple-mobile-web-app-title"]')?.getAttribute('content') ?? null,
      สีแถบ: d.querySelector('meta[name="theme-color"]')?.getAttribute('content') ?? null,
      รูปiPhone: ราก(d.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href')),
      มีลิงก์manifest: !!d.querySelector('link[rel="manifest"]'),
    }
  })
  if (!ป้าย.มีลิงก์manifest) ตก.push('⓪ ไฟล์หน้าแรกไม่มีลิงก์ manifest')
  หลักฐาน.ป้าย = ป้าย

  // ① ชื่อ
  for (const ช่อง of ['name', 'short_name'])
    if (m[ช่อง] !== ชื่อเว็บ) ตก.push(`① ${ช่อง} ใน manifest เป็น "${m[ช่อง]}" ⇒ ต้องเป็นชื่อเว็บ "${ชื่อเว็บ}"`)
  if (ป้าย.ชื่อiPhone !== ชื่อเว็บ) ตก.push(`① ชื่อใต้ไอคอน iPhone เป็น "${ป้าย.ชื่อiPhone}" ⇒ ต้องเป็น "${ชื่อเว็บ}"`)

  // ② หน้าที่เปิดจากไอคอน ⇒ อ่านเทียบกับที่อยู่ของ manifest แบบเดียวกับเบราว์เซอร์
  const เปิดที่ = new URL(m.start_url ?? '', ที่manifest).href
  const ขอบเขต = new URL(m.scope ?? './', ที่manifest).href
  if (เปิดที่ !== หน้าแรก) ตก.push(`② เปิดจากไอคอนแล้วไปที่ ${เปิดที่} ⇒ ต้องเป็นหน้าแรก ${หน้าแรก}`)
  if (ขอบเขต !== หน้าแรก) ตก.push(`② ขอบเขตของแอปเป็น ${ขอบเขต} ⇒ ต้องเป็น ${หน้าแรก}`)
  if (m.display !== 'standalone') ตก.push(`② display เป็น "${m.display}" ⇒ ต้องเป็น "standalone" ถึงจะเปิดเป็นแอป`)
  const ตอบ = await ctx.request.get(เปิดที่)
  if (ตอบ.status() !== 200 || !/<div id="__nuxt"/.test(await ตอบ.text()))
    ตก.push(`② หน้าที่เปิดจากไอคอน ${เปิดที่} ตอบ ${ตอบ.status()} ⇒ ไม่ใช่หน้าแรกของเว็บ`)

  // ③ สี
  for (const [ชื่อ, ค่า] of [['theme_color', m.theme_color], ['background_color', m.background_color], ['ป้าย theme-color', ป้าย.สีแถบ]])
    if ((ค่า || '').toLowerCase() !== สีกระดาษ) ตก.push(`③ ${ชื่อ} เป็น ${ค่า} ⇒ ต้องตรงสีพื้นกระดาษ ${สีกระดาษ}`)

  // ④ ⑤ รูป ⇒ เปิดจริงแล้ววัดขนาดจริงในเบราว์เซอร์
  const วัดรูป = (ที่) =>
    แท็บ.evaluate(async (u) => {
      const r = await fetch(u, { cache: 'no-store' })
      if (!r.ok) return { สถานะ: r.status }
      try {
        const b = await createImageBitmap(await r.blob())
        return { สถานะ: r.status, ชนิด: r.headers.get('content-type'), กว้าง: b.width, สูง: b.height }
      } catch {
        return { สถานะ: r.status, ชนิด: r.headers.get('content-type'), อ่านไม่ออก: true }
      }
    }, ที่)
  const รูปทั้งหมด = Array.isArray(m.icons) ? m.icons : []
  หลักฐาน.รูป = []
  for (const รูป of รูปทั้งหมด) {
    const ที่ = new URL(รูป.src, ที่manifest).href
    const ผล = await วัดรูป(ที่)
    หลักฐาน.รูป.push({ ...รูป, ที่, ...ผล })
    if (ผล.สถานะ !== 200 || ผล.อ่านไม่ออก) ตก.push(`④ รูป ${ที่} เปิดไม่ได้ (${ผล.สถานะ})`)
    else if (`${ผล.กว้าง}x${ผล.สูง}` !== รูป.sizes) ตก.push(`④ รูป ${ที่} ขนาดจริง ${ผล.กว้าง}x${ผล.สูง} ⇒ ไม่ตรงที่ประกาศ ${รูป.sizes}`)
  }
  for (const ขนาด of ['192x192', '512x512'])
    if (!รูปทั้งหมด.some((ร) => ร.sizes === ขนาด && (ร.purpose ?? 'any').split(/\s+/).includes('any')))
      ตก.push(`④ manifest ไม่มีรูปขนาด ${ขนาด} สำหรับใช้ทั่วไป`)
  if (!ป้าย.รูปiPhone) ตก.push('⑤ หัวหน้าเว็บไม่มีรูปไอคอนของ iPhone (apple-touch-icon)')
  else {
    const ผล = await วัดรูป(ป้าย.รูปiPhone)
    หลักฐาน.รูปiPhone = ผล
    if (ผล.สถานะ !== 200 || ผล.อ่านไม่ออก) ตก.push(`⑤ รูปไอคอน iPhone ${ป้าย.รูปiPhone} เปิดไม่ได้ (${ผล.สถานะ})`)
    else if (ผล.กว้าง !== 180 || ผล.สูง !== 180) ตก.push(`⑤ รูปไอคอน iPhone ขนาด ${ผล.กว้าง}x${ผล.สูง} ⇒ ต้อง 180x180`)
  }

  // ⑥ ไม่มีตัวช่วยออฟไลน์
  const ตัวช่วย = await แท็บ.evaluate(async () =>
    'serviceWorker' in navigator ? (await navigator.serviceWorker.getRegistrations()).map((r) => r.scope) : [],
  )
  หลักฐาน.serviceWorker = ตัวช่วย
  if (ตัวช่วย.length) ตก.push(`⑥ มีตัวช่วยออฟไลน์ลงทะเบียนอยู่ ${ตัวช่วย.join(', ')} ⇒ ใบงาน #167 สั่งไม่ทำ`)

  await แท็บ.close()
  return { ตก, หลักฐาน }
}

const เบราว์เซอร์ = await chromium.launch()
const ใหม่ = () => เบราว์เซอร์.newContext({ viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true })

const ctxจริง = await ใหม่()
const จริง = await ตรวจ(ctxจริง)
await ctxจริง.close()

console.log('ผลจาก Chrome (Page.getInstallabilityErrors) ⇒', JSON.stringify(จริง.หลักฐาน.installabilityErrors))
console.log('manifest ⇒', จริง.หลักฐาน.ที่manifest)
if (ที่เก็บผล) {
  mkdirSync(ที่เก็บผล, { recursive: true })
  writeFileSync(`${ที่เก็บผล}/ผลติดตั้งเป็นแอป.json`, JSON.stringify(จริง.หลักฐาน, null, 2) + '\n')
  console.log(`เก็บผลไว้ที่ ${ที่เก็บผล}/ผลติดตั้งเป็นแอป.json`)
}

if (ทดสอบตัวเอง) {
  if (จริง.ตก.length) {
    console.error('⛔ โหมดพิสูจน์: ของจริงบนเว็บก็ไม่ผ่านด้วย ⇒ ไปแก้เว็บก่อน')
    for (const x of จริง.ตก) console.error('  - ' + x)
    await เบราว์เซอร์.close()
    process.exit(1)
  }
  const แก้manifest = (แก้) => async (ctx) =>
    ctx.route('**/manifest.webmanifest', async (route) => {
      const r = await route.fetch()
      const m = await r.json()
      แก้(m)
      await route.fulfill({ response: r, body: JSON.stringify(m) })
    })
  const แก้หน้าแรก = (แก้) => async (ctx) =>
    ctx.route(ฐาน + '/', async (route) => {
      const r = await route.fetch()
      await route.fulfill({ response: r, body: แก้(await r.text()) })
    })
  const อาการ = [
    ['หน้าแรกไม่มีลิงก์ manifest', แก้หน้าแรก((h) => h.replace(/<link[^>]*rel="manifest"[^>]*>/g, '')), /^⓪/],
    ['manifest ไม่มีรูปสักรูป', แก้manifest((m) => (m.icons = [])), /^⓪ Chrome|^④ manifest ไม่มีรูป/],
    ['ชื่อแอปไม่ใช่ชื่อเว็บ', แก้manifest((m) => (m.name = 'แอปอื่น')), /^① name/],
    ['หน้าที่เปิดหลุดฐาน ไปรากของเครื่อง', แก้manifest((m) => ((m.start_url = '/'), (m.scope = '/'))), /^② /],
    ['เปิดเป็นหน้าเว็บธรรมดา ไม่ใช่แอป', แก้manifest((m) => (m.display = 'browser')), /^② display/],
    ['สีแถบบนไม่ตรงสีเว็บ', แก้manifest((m) => (m.theme_color = '#000000')), /^③ theme_color/],
    [
      'รูป 512 ที่ประกาศเป็นไฟล์ขนาดอื่น',
      async (ctx) => ctx.route('**/icons/icon-512.png', async (route) => route.fulfill({ response: await route.fetch({ url: ฐาน + '/icons/icon-192.png' }) })),
      /^④ รูป .*icon-512\.png ขนาดจริง/,
    ],
    ['รูป 192 หาย', async (ctx) => ctx.route('**/icons/icon-192.png', (route) => route.fulfill({ status: 404, body: '' })), /^④ รูป .*icon-192\.png เปิดไม่ได้/],
    ['รูปไอคอน iPhone หาย', async (ctx) => ctx.route('**/icons/apple-touch-icon.png', (route) => route.fulfill({ status: 404, body: '' })), /^⑤ /],
    ['ชื่อใต้ไอคอน iPhone หาย', แก้หน้าแรก((h) => h.replace(/<meta[^>]*name="apple-mobile-web-app-title"[^>]*>/g, '')), /^① ชื่อใต้ไอคอน/],
    ['ป้ายสีแถบบนหายจากไฟล์', แก้หน้าแรก((h) => h.replace(/<meta[^>]*name="theme-color"[^>]*>/g, '')), /^③ ป้าย theme-color/],
    [
      'มีตัวช่วยออฟไลน์แอบลงทะเบียน',
      async (ctx) => {
        await ctx.route(ฐาน + '/sw-ยัด.js', (route) => route.fulfill({ status: 200, contentType: 'text/javascript', body: '' }))
        await แก้หน้าแรก((h) =>
          h.replace('</head>', `<script>navigator.serviceWorker.register(${JSON.stringify(ฐาน + '/sw-ยัด.js')})</script></head>`),
        )(ctx)
      },
      /^⑥ /,
    ],
  ]
  const ไม่จับ = []
  console.log('\nโหมดพิสูจน์ ⇒ ยัดของพังทีละอาการ')
  for (const [ชื่อ, ยัด, แบบ] of อาการ) {
    const ctx = await ใหม่()
    await ยัด(ctx)
    let ผล = await ตรวจ(ctx)
    // ⭐ ตัวช่วยออฟไลน์ลงทะเบียนหลังหน้าโหลด ⇒ ถ้ายังไม่เห็นรอบแรก ให้ตรวจซ้ำอีกรอบในบริบทเดิม
    if (!ผล.ตก.some((x) => แบบ.test(x)) && ชื่อ.includes('ตัวช่วย')) ผล = await ตรวจ(ctx)
    await ctx.close()
    const เช่น = ผล.ตก.find((x) => แบบ.test(x))
    console.log(`  ${เช่น ? '✅' : '⛔'} ${ชื่อ}${เช่น ? ` ⇒ เช่น ${เช่น}` : ` ⇒ ด่านแดง ${ผล.ตก.length} ข้อแต่ไม่ตรงอาการ ${JSON.stringify(ผล.ตก)}`}`)
    if (!เช่น) ไม่จับ.push(ชื่อ)
  }
  await เบราว์เซอร์.close()
  if (ไม่จับ.length) {
    console.error(`\n⛔ โหมดพิสูจน์: ยัดของพังแล้ว **ด่านยังไม่เห็น ${ไม่จับ.length} อาการ** ⇒ ด่านตายบางส่วน`)
    for (const x of ไม่จับ) console.error('  - ' + x)
    process.exit(1)
  }
  console.log(`\n✅ โหมดพิสูจน์: ด่านจับของพังได้ครบ ${อาการ.length} อาการ`)
  process.exit(0)
}

await เบราว์เซอร์.close()
if (จริง.ตก.length) {
  console.error(`\n⛔ ไม่ผ่าน — ${จริง.ตก.length} รายการ:`)
  for (const x of จริง.ตก) console.error('  - ' + x)
  process.exit(1)
}
console.log(`\n✅ ติดตั้งเป็นแอปได้ ⇒ Chrome ไม่มีข้อติด · ชื่อ ${ชื่อเว็บ} · เปิดที่ ${ฐาน}/ · สี ${สีกระดาษ} · รูป ${จริง.หลักฐาน.รูป.length} รูป + iPhone 180 · ไม่มีตัวช่วยออฟไลน์`)
