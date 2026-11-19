// ด่านตรวจ — **ปุ่มแชร์คำอธิบายบนการ์ดคำ** (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/149 ก้อน ข.)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// ⭐ เมนูแชร์ของเครื่องกับคลิปบอร์ด ⇒ เบราว์เซอร์ของด่านไม่มีของจริง ⇒ **ด่านวางตัวรับแทน** ท่าเดียวกับ `tools/ด่านแชร์ข้อ.mjs`
//   ⇒ ⛔ **ด่านนี้ ⛔ ได้พิสูจน์ว่าเมนูแชร์ของเครื่องจริงเด้ง หรือ LINE ได้ข้อความครบ** ⇒ ของนั้นต้องลองบนเครื่องจริง
//
// **ด่านนี้ตรวจ 10 ข้อ ⇒ กดของจริงบนหน้าที่สร้างเสร็จ** ⇒ เลขในวงเล็บคือเกณฑ์ของใบ #149
//   ① **ปุ่มแชร์อยู่หัวการ์ดข้างปุ่ม *ปิด*** ⇒ ปุ่มจริงจากปุ่มกลาง · รูปเดียวกับปุ่มแชร์ข้อ · ตัวเดียวต่อการ์ด
//      ⇒ กล่องกดไม่เล็กกว่า 44 จุด ⇒ ⛔ ทับ ⛔ ชิดปุ่ม *ปิด* (ห่างไม่น้อยกว่า 4 จุด) (7 · 11)
//   ② **ข้อความที่ส่ง = ของที่การ์ดแสดง** ⇒ ด่านประกอบข้อความที่ควรเป็นเองจากตัวหนังสือบนการ์ด แล้วเทียบทั้งก้อน (8 · 9)
//      ⇒ คำ (คำอ่าน) · เล่ม บท:ข้อ · คำแปลกำกับ · รูปพจนานุกรม · เลข Strong · รูปผัน · เครื่องหมายของ Levinsohn
//      ⇒ เครดิต MACULA กับ LGNTDF ตรงตัวตาม `api/credits.json` (แกะจากหน้าแหล่งข้อมูล) ⇒ ลิงก์ปิดท้าย ⇒ ส่งช่อง `text` ช่องเดียว
//   ③ **ลิงก์ที่แชร์เปิดหน้าอ่านที่ข้อนั้นพร้อมการ์ดของคำนั้น** ⇒ หัวการ์ด · ที่ของคำ · รูปผัน · ปุ่มคำที่เปิดอยู่ ตรงกับคำที่แชร์ (9)
//   ④ **ไม่มีเมนูแชร์ ⇒ คัดลอกข้อความเดียวกัน ⇒ ขึ้น *คัดลอกแล้ว* ในกล่องสถานะ** (7)
//   ⑤ **คัดลอกไม่ได้ ⇒ กล่องข้อความทั้งก้อน ⇒ โฟกัสอยู่ในกล่อง ⇒ Esc ปิดแค่กล่อง การ์ดยังอยู่** (7)
//   ⑥ **ปิดเมนูแชร์เฉย ๆ ⇒ ไม่มีข้อความ ⇒ การ์ดยังอยู่** (7)
//   ⑦ **แป้นพิมพ์กับโปรแกรมอ่านหน้าจอ** ⇒ Tab จากหัวการ์ดถึงปุ่มแชร์ · Enter แชร์ได้ · ชื่อที่ได้ยิน = *แชร์* + ชื่อที่ได้ยินของปุ่ม *ปิด* (11)
//   ⑧ **ลิงก์เก่าทุกแบบยังเปิดได้เหมือนเดิม** ⇒ ⛔ มี `w` ⇒ ⛔ มีการ์ดเปิด ⇒ `w` ที่อ่านไม่ออกหรือชี้คำที่ไม่มี ⇒ ⛔ การ์ด ⛔ หน้าพัง (10)
//   ⑨ **จอ 320 ตัวอักษร 200%** ⇒ หัวการ์ด ⛔ ล้นจอ · สองปุ่มยังไม่เล็กกว่า 44 ⛔ ทับกัน · กล่องคัดลอกเองอยู่ในจอ (11 · SC 1.4.10)
//   ⑩ **ปุ่มแชร์ข้อของแถบบนยังเป็นตัวเดิม** ⇒ `data-ปุ่ม="แชร์"` บนหน้ามีตัวเดียว ⇒ ปุ่มของการ์ดใช้ป้ายของตัวเอง
//
// ⭐ ถ้อยคำบนจอ ⇒ อ่านจาก `app/utils/ถ้อยคำแชร์.ts` ⇒ ⛔ พิมพ์ซ้ำในด่าน ⇒ คำที่ตรวจในข้อความอ่านจากการ์ดบนหน้า
// ⭐ คำที่ใช้ ⇒ ἐν ใน มาระโก 12:1 ⇒ คำที่พี่เอมส่งภาพมา (ใบ #149 Notes ข้อ 1) ⇒ มีเครื่องหมายของ Levinsohn ⇒ เครดิต LGNTDF ต้องติดไป
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านแชร์การ์ดคำ.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพังทีละชิ้น ⇒ ทุกชิ้นต้องทำให้ข้อของมันแดง (รายชื่ออยู่ที่ `ของพัง`)
//
//   node tools/ด่านแชร์การ์ดคำ.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { เส้นทางเว็บ, รอโค้ดของเว็บติด } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv.slice(2).find((x) => !x.startsWith('--')) || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const รอนานสุด = 20000
const เป้า = 44
const ห่างขั้นต่ำ = 4

// ---------------------------------------------------------------- ถ้อยคำ ⇒ อ่านจากไฟล์ของเว็บ
const ไฟล์ถ้อยคำ = readFileSync(fileURLToPath(new URL('../app/utils/ถ้อยคำแชร์.ts', import.meta.url)), 'utf8')
function ถ้อยคำ(ชื่อ) {
  const คำ = new RegExp(`\\n\\s*${ชื่อ}: '([^']*)'`).exec(ไฟล์ถ้อยคำ)
  if (คำ) return คำ[1]
  throw new Error(`⛔ หาถ้อยคำ ${ชื่อ} ใน app/utils/ถ้อยคำแชร์.ts ไม่เจอ`)
}
const คำ = { ปุ่ม: ถ้อยคำ('ปุ่ม'), คัดลอกแล้ว: ถ้อยคำ('คัดลอกแล้ว'), หัวคัดลอกเอง: ถ้อยคำ('หัวคัดลอกเอง') }

const บท = { เล่ม: 'MRK', บท: 12, ข้อ: 1, ตัว: 'ἐν' }
const ทางของหน้า = `/read/${บท.เล่ม}?c=${บท.บท}&t=TCV,SBLGNT`

// ---------------------------------------------------------------- ของพัง ⇒ ใช้เฉพาะโหมดพิสูจน์ว่าด่านยังจับได้
//   `css` ยัดตอนการ์ดขึ้น · `บนการ์ด` รันในหน้าตอนการ์ดขึ้น · `เครดิต` แทนที่ไฟล์เครดิตของเว็บ · `ลิงก์` แก้ลิงก์ที่จับได้ก่อนเปิด
const ของพัง = {
  ปุ่มหาย: { ข้อ: '①', บนการ์ด: () => document.querySelector('[data-การ์ดคำ] [data-ปุ่ม="แชร์คำ"]')?.closest('.pk-กล่องแชร์')?.remove() },
  ปุ่มเบียดปิด: {
    ข้อ: '①',
    css: '.pk-ปุ่มหัวการ์ด { gap: 0 !important } .pk-ปุ่มหัวการ์ด > .pk-กล่องแชร์ { margin-right: -12px !important }',
  },
  ปุ่มเล็ก: { ข้อ: '①', css: '[data-ปุ่ม="แชร์คำ"] { min-height: 30px !important; height: 30px !important; min-width: 30px !important; width: 30px !important }' },
  เครดิตหาย: { ข้อ: '②', เครดิต: '{}' },
  ข้อความไม่ตรงการ์ด: {
    ข้อ: '②',
    // ⭐ การ์ดขึ้นคำแปลกำกับอย่างหนึ่ง ⇒ ข้อความที่ส่งยังเป็นของเดิม ⇒ ต้องจับได้ว่าไม่ตรงกับที่ตาเห็น
    บนการ์ด: () => {
      const dd = [...document.querySelectorAll('[data-การ์ดคำ] .pk-ข้อมูลคำ > div')].find((d) => d.querySelector('dt')?.textContent.trim() === 'คำแปลกำกับ')?.querySelector('dd')
      if (dd) dd.textContent = 'คำแปลที่การ์ดแสดง'
    },
  },
  ลิงก์ชี้คำอื่น: { ข้อ: '③', ลิงก์: (t) => t.replace(/w=(\d+)\.(\d+)\.(\d+)/, (_, a, b, c) => `w=${a}.${b}.${Number(c) + 1}`) },
  ลิงก์ไม่มีคำ: { ข้อ: '③', ลิงก์: (t) => t.replace(/[&?]w=[\d.]+/, '') },
  คัดลอกแล้วเงียบ: { ข้อ: '④', css: '[data-การ์ดคำ] .pk-ผลแชร์ { display: none !important }' },
  กล่องคัดลอกเองหาย: { ข้อ: '⑤', css: '[data-การ์ดคำ] .pk-กล่องคัดลอกเอง { display: none !important }' },
  ชื่อที่ได้ยินหาย: { ข้อ: '⑦', บนการ์ด: () => document.querySelector('[data-การ์ดคำ] [data-ปุ่ม="แชร์คำ"]')?.removeAttribute('aria-label') },
  ปุ่มหลุดจากTab: { ข้อ: '⑦', บนการ์ด: () => document.querySelector('[data-การ์ดคำ] [data-ปุ่ม="แชร์คำ"]')?.setAttribute('tabindex', '-1') },
  กล่องล้นจอ: { ข้อ: '⑨', css: '.pk-การ์ดคำ .pk-กล่องคัดลอกเอง { left: auto !important; right: -200px !important; width: 500px !important }' },
}

/** ตัวรับแทนเมนูแชร์กับคลิปบอร์ด ⇒ ท่าเดียวกับ `tools/ด่านแชร์ข้อ.mjs` ⇒ `window.__โหมดแชร์` เลือกว่าเครื่องทำตัวแบบไหน */
function ตัวรับแทน() {
  window.__ส่งออก = []
  window.__โหมดแชร์ = 'แชร์'
  const มีเมนู = () => window.__โหมดแชร์ === 'แชร์' || window.__โหมดแชร์ === 'ปิดเมนู'
  Object.defineProperty(navigator, 'share', {
    configurable: true,
    get: () =>
      มีเมนู()
        ? async (ของ) => {
            window.__ส่งออก.push({ ทาง: 'แชร์', ช่อง: Object.keys(ของ).sort(), text: ของ.text })
            if (window.__โหมดแชร์ === 'ปิดเมนู') throw new DOMException('ผู้อ่านปิดเมนู', 'AbortError')
          }
        : undefined,
  })
  Object.defineProperty(navigator, 'canShare', { configurable: true, get: () => undefined })
  const คลิป = {
    writeText: async (t) => {
      if (window.__โหมดแชร์ === 'คัดลอกไม่ได้') throw new DOMException('ไม่ยอม', 'NotAllowedError')
      window.__ส่งออก.push({ ทาง: 'คัดลอก', text: t })
    },
  }
  Object.defineProperty(navigator, 'clipboard', { configurable: true, get: () => คลิป })
}

const เบราว์เซอร์ = await chromium.launch()

async function บริบท({ กว้าง = 1280, สูง = 900, ใหญ่สุด = false, พัง } = {}) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: สูง } })
  await ctx.addInitScript(ตัวรับแทน)
  if (ใหญ่สุด)
    // ⭐ เบราว์เซอร์ 200% + ปุ่มของเว็บจนสุด ⇒ ท่าเดียวกับ `tools/ด่านคำอ่านในการ์ด.mjs` ข้อ ④
    await ctx.addInitScript(() => {
      try {
        localStorage.setItem('pk-fs', '2')
      } catch {}
      document.documentElement.style.fontSize = '32px'
    })
  if (พัง?.เครดิต !== undefined) await ctx.route('**/api/credits.json', (r) => r.fulfill({ contentType: 'application/json', body: พัง.เครดิต }))
  return ctx
}

/** ปุ่มคำ ἐν ของ 12:1 ⇒ ลำดับนับจาก 0 ⇒ หาจากตัวหนังสือบนหน้า ⛔ ไม่ตรึงเลข */
async function หาคำ(แท็บ) {
  const ข้อ = แท็บ.locator(`.pk-ชั้นคำ .pk-ข้อคำ[data-ข้อเดิม="${บท.บท}:${บท.ข้อ}"]`).first()
  await ข้อ.waitFor({ timeout: รอนานสุด })
  const ตัวทั้งหมด = (await ข้อ.locator('.pk-คำ .pk-ตัวเดิม').allTextContents()).map((x) => x.trim())
  const i = ตัวทั้งหมด.indexOf(บท.ตัว)
  if (i < 0) throw new Error(`หา ${บท.ตัว} ใน ${บท.บท}:${บท.ข้อ} ไม่เจอ ⇒ ${ตัวทั้งหมด.join(' ')}`)
  return { ปุ่ม: ข้อ.locator('.pk-คำ').nth(i), i }
}

/** รอการ์ดของคำที่กดขึ้นครบ ⇒ ข้อมูลคำมาแล้ว (แถวรูปผัน) */
const รอการ์ด = (แท็บ, ตัว) =>
  แท็บ
    .waitForFunction(
      (ตัว) => {
        const ก = document.querySelector('[data-การ์ดคำ]')
        return ก?.querySelector('.pk-คำในการ์ด')?.textContent.trim() === ตัว && !!ก.querySelector('.pk-รหัสรูปผัน')
      },
      ตัว,
      { timeout: รอนานสุด },
    )
    .then(() => true)
    .catch(() => false)

async function เปิดการ์ด(ctx, พัง) {
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(`${ฐาน}${ทางของหน้า}`, { waitUntil: 'domcontentloaded' })
  await รอโค้ดของเว็บติด(แท็บ)
  const { ปุ่ม, i } = await หาคำ(แท็บ)
  await ปุ่ม.scrollIntoViewIfNeeded()
  await ปุ่ม.click()
  if (!(await รอการ์ด(แท็บ, บท.ตัว))) throw new Error('กดคำแล้วการ์ด ⛔ ไม่ขึ้น')
  // ⭐ ปุ่มแชร์ขึ้นเมื่อข้อมูลคำมาครบ ⇒ รอปุ่มจริง ⛔ ไม่รอเป็นเวลา ⇒ ถูกยัดให้หายในโหมดพิสูจน์ ⇒ ข้อ ① แดงเอง
  await แท็บ.waitForSelector('[data-การ์ดคำ] [data-ปุ่ม="แชร์คำ"]', { timeout: 5000 }).catch(() => {})
  await แท็บ.evaluate(() => document.fonts.ready)
  if (พัง?.css) await แท็บ.addStyleTag({ content: พัง.css })
  if (พัง?.บนการ์ด) await แท็บ.evaluate(พัง.บนการ์ด)
  return { แท็บ, i }
}

/** ข้อความที่ควรส่ง ⇒ ประกอบเองจากตัวหนังสือที่การ์ด **แสดงอยู่** + ไฟล์เครดิต + ที่อยู่ของหน้า ⇒ ⛔ ไม่เรียกโค้ดของเว็บ */
async function ข้อความที่ควรเป็น(แท็บ, i) {
  const บน = await แท็บ.evaluate(() => {
    const ก = document.querySelector('[data-การ์ดคำ]')
    const ยุบ = (s) => s.replace(/\s+/g, ' ').trim()
    const ตาเห็น = (el) => {
      if (!el) return null
      const c = el.cloneNode(true)
      for (const x of c.querySelectorAll('.pk-เฉพาะเสียง, [data-ปุ่มที่มาคำอ่าน], [data-ที่มาคำอ่าน], [aria-hidden="true"]:not(:is([data-คำอ่าน] *))')) x.remove()
      return ยุบ(c.textContent)
    }
    const แถว = {}
    for (const d of ก.querySelectorAll('.pk-ข้อมูลคำ > div')) แถว[d.querySelector('dt').textContent.trim()] = d.querySelector('dd')
    const รูปผัน = แถว['รูปผัน']
    let รูปผันข้อความ = null
    if (รูปผัน) {
      const c = รูปผัน.cloneNode(true)
      const รหัส = c.querySelector('.pk-รหัสรูปผัน')
      const รหัสข้อความ = รหัส ? ยุบ(รหัส.textContent) : ''
      รหัส?.remove()
      รูปผันข้อความ = [ยุบ(c.textContent), รหัสข้อความ].filter(Boolean).join(' · ')
    }
    const เน้น = แถว['เครื่องหมายของ Levinsohn']
    return {
      ตัว: ก.querySelector('.pk-คำในการ์ด').textContent.trim(),
      ที่: ยุบ(ก.querySelector('.pk-ที่ของคำ').textContent),
      คำตามตัวบท: ตาเห็น(แถว['คำตามตัวบท']),
      คำแปล: ตาเห็น(แถว['คำแปลกำกับ']),
      รูปพจนานุกรม: ตาเห็น(แถว['รูปพจนานุกรม']),
      strong: ตาเห็น(แถว['เลข Strong']),
      รูปผัน: รูปผันข้อความ,
      เน้น: เน้น
        ? [...เน้น.querySelectorAll('.pk-เน้นในการ์ด:not(.pk-ที่มาในการ์ด)')].map((x) => {
            const c = x.cloneNode(true)
            c.querySelector('.pk-หน้าตาในการ์ด')?.remove()
            return ยุบ(c.textContent)
          })
        : [],
      ภาษา: ก.querySelector('.pk-คำในการ์ด').getAttribute('lang'),
      t: new URL(location.href).searchParams.get('t'),
    }
  })
  const เครดิต = await แท็บ.evaluate(async (u) => (await fetch(u)).json(), `${ฐาน}/api/credits.json`)
  const แหล่ง = [บน.ภาษา === 'hbo' ? 'MACULA Hebrew' : 'MACULA Greek', ...(บน.เน้น.length ? ['LGNTDF'] : [])]
  const ที่มา = แหล่ง.map((ชื่อ) => {
    const ค = เครดิต[ชื่อ]
    if (!ค) return `⛔ ไม่มีเครดิตของ ${ชื่อ} ใน api/credits.json`
    return [[ค.ชื่อ, ค.สัญญา, ค.ลิงก์สัญญา].filter(Boolean).join(' · '), ค.เครดิต && ค.เครดิต !== ค.ชื่อ ? ค.เครดิต : ''].filter(Boolean).join('\n')
  })
  const ต้น = new URL(ฐาน).origin
  const ลิงก์ = `${ต้น}${new URL(ฐาน).pathname}/read/${บท.เล่ม}?c=${บท.บท}&v=${บท.ข้อ}&t=${บน.t}&w=${บท.บท}.${บท.ข้อ}.${i + 1}`
  const หัว = [
    `${บน.คำตามตัวบท} · ${บน.ที่}`,
    `คำแปลกำกับ: ${บน.คำแปล}`,
    `รูปพจนานุกรม: ${บน.รูปพจนานุกรม}`,
    `เลข Strong: ${บน.strong}`,
    `รูปผัน: ${บน.รูปผัน}`,
    ...(บน.เน้น.length ? [`เครื่องหมายของ Levinsohn: ${บน.เน้น.join('\n')}`] : []),
  ]
  return { ข้อความ: [หัว.join('\n'), ที่มา.join('\n'), ลิงก์].join('\n\n'), ลิงก์, LGNTDF: เครดิต.LGNTDF?.เครดิต ?? null }
}

const ส่งออก = (แท็บ) => แท็บ.evaluate(() => window.__ส่งออก)
const ล้างส่งออก = (แท็บ, โหมด) =>
  แท็บ.evaluate((โหมด) => {
    window.__ส่งออก = []
    window.__โหมดแชร์ = โหมด
  }, โหมด)
const รอส่งออก = (แท็บ) =>
  แท็บ
    .waitForFunction(() => window.__ส่งออก.length > 0, null, { timeout: 5000 })
    .then(() => true)
    .catch(() => false)

/** ปุ่มแชร์ของการ์ดกับปุ่มปิด ⇒ กล่องจริงบนจอ */
const วัดหัว = (แท็บ) =>
  แท็บ.evaluate(() => {
    const ก = document.querySelector('[data-การ์ดคำ]')
    const ทั้งหมด = [...ก.querySelectorAll('[data-ปุ่ม="แชร์คำ"]')]
    const แชร์ = ทั้งหมด[0]
    const ปิด = ก.querySelector('.pk-ปุ่มปิดการ์ด')
    const กรอบ = (x) => (x ? (({ left, right, top, bottom, width, height }) => ({ left, right, top, bottom, width, height }))(x.getBoundingClientRect()) : null)
    const de = document.documentElement
    return {
      จำนวน: ทั้งหมด.length,
      แท็ก: แชร์?.tagName.toLowerCase() ?? null,
      ปุ่มกลาง: !!แชร์?.classList.contains('pk-ปุ่มชุด') && แชร์?.getAttribute('data-slot') === 'button',
      ในหัว: !!แชร์ && !!ก.querySelector('.pk-หัวการ์ด')?.contains(แชร์),
      รูป: !!แชร์?.querySelector('svg.pk-รูปแชร์'),
      ชื่อ: แชร์?.getAttribute('aria-label') ?? null,
      // ⚠️ ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/157 ⇒ ปุ่มปิดเป็น × ⇒ ชื่อที่ได้ยินอยู่ที่ `aria-label` ⛔ ตัวหนังสือในปุ่ม (ตาเห็นแค่ ×)
      //   ⇒ อ่านชื่อที่ได้ยินจริง ⇒ ไม่มี `aria-label` ⇒ ตัวหนังสือที่ ⛔ อยู่ใน `aria-hidden` ⇒ เกณฑ์ข้อ ⑦ เดิมทุกตัวอักษร
      ชื่อปิด: ปิด
        ? (ปิด.getAttribute('aria-label') ?? (() => {
            const c = ปิด.cloneNode(true)
            for (const x of c.querySelectorAll('[aria-hidden="true"]')) x.remove()
            return c.textContent
          })()).replace(/\s+/g, ' ').trim()
        : null,
      แชร์: กรอบ(แชร์),
      ปิด: กรอบ(ปิด),
      ปุ่มแถบบน: document.querySelectorAll('[data-ปุ่ม="แชร์"]').length,
      ล้นหน้า: Math.round(de.scrollWidth - de.clientWidth),
      ล้นการ์ด: Math.round(ก.scrollWidth - ก.clientWidth),
      กว้างจอ: de.clientWidth,
    }
  })

function ตรวจหัว(ห, ป้าย, ตก) {
  if (ห.จำนวน !== 1) ตก.push(`① ${ป้าย} ⇒ ปุ่มแชร์ในการ์ดมี ${ห.จำนวน} ตัว ⛔ ควรมีตัวเดียว`)
  if (!ห.จำนวน) return
  if (ห.แท็ก !== 'button' || !ห.ปุ่มกลาง) ตก.push(`① ${ป้าย} ⇒ ปุ่มแชร์ในการ์ด ⛔ ใช่ปุ่มจริงจากปุ่มกลาง (<${ห.แท็ก}>)`)
  if (!ห.ในหัว) ตก.push(`① ${ป้าย} ⇒ ปุ่มแชร์ ⛔ อยู่หัวการ์ด`)
  if (!ห.รูป) ตก.push(`① ${ป้าย} ⇒ ปุ่มแชร์ ⛔ มีรูปแชร์ชุดเดียวกับปุ่มแชร์ข้อ`)
  for (const [ชื่อ, ก] of [
    ['แชร์', ห.แชร์],
    ['ปิด', ห.ปิด],
  ])
    if (!ก || ก.width < เป้า - 0.5 || ก.height < เป้า - 0.5)
      ตก.push(`① ${ป้าย} ⇒ ปุ่ม${ชื่อ} ${ก ? `${Math.round(ก.width)}×${Math.round(ก.height)}` : 'ไม่มี'} จุด ⛔ เล็กกว่า ${เป้า}`)
  if (ห.แชร์ && ห.ปิด) {
    // ⭐ ระยะห่างระหว่างกล่องสองกล่อง ⇒ ทับกัน = ติดลบ ⇒ วางบนล่างกันก็นับระยะแนวตั้ง
    const ห่างนอน = Math.max(ห.ปิด.left - ห.แชร์.right, ห.แชร์.left - ห.ปิด.right)
    const ห่างตั้ง = Math.max(ห.ปิด.top - ห.แชร์.bottom, ห.แชร์.top - ห.ปิด.bottom)
    const ห่าง = Math.max(ห่างนอน, ห่างตั้ง)
    if (ห่าง < ห่างขั้นต่ำ) ตก.push(`① ${ป้าย} ⇒ ปุ่มแชร์ห่างปุ่มปิด ${Math.round(ห่าง)} จุด ⛔ เบียดกัน (ต้องไม่น้อยกว่า ${ห่างขั้นต่ำ})`)
  }
  if (ห.ปุ่มแถบบน !== 1) ตก.push(`⑩ ${ป้าย} ⇒ ปุ่ม data-ปุ่ม="แชร์" บนหน้ามี ${ห.ปุ่มแถบบน} ตัว ⛔ ควรเป็นปุ่มแถบบนตัวเดียว`)
}

// ===========================================================================
async function ตรวจหลัก(พัง) {
  const ตก = []
  const ctx = await บริบท({ พัง })
  try {
    const { แท็บ, i } = await เปิดการ์ด(ctx, พัง)
    ตรวจหัว(await วัดหัว(แท็บ), 'จอ 1280', ตก)

    // ⑦ ชื่อที่ได้ยิน ⇒ *แชร์* + ชื่อที่ได้ยินของปุ่มปิด ตัดคำว่า ปิด ⇒ ถ้อยคำเดิมทั้งคู่
    const ห = await วัดหัว(แท็บ)
    const ชื่อที่ควร = ห.ชื่อปิด ? `${คำ.ปุ่ม} ${ห.ชื่อปิด.replace(/^ปิด\s*/, '')}` : null
    if (ห.จำนวน && ห.ชื่อ !== ชื่อที่ควร) ตก.push(`⑦ ชื่อที่หูได้ยินของปุ่มแชร์เป็น «${ห.ชื่อ}» ⛔ ควรเป็น «${ชื่อที่ควร}»`)
    if (ห.จำนวน) {
      const ต้นไม้ = await แท็บ.locator('[data-การ์ดคำ] .pk-หัวการ์ด').ariaSnapshot()
      if (!ต้นไม้.includes(`button "${ชื่อที่ควร}"`)) ตก.push(`⑦ โปรแกรมอ่านหน้าจอ ⛔ ได้ยินปุ่ม «${ชื่อที่ควร}» ในหัวการ์ด`)
    }

    // ② ⑦ Tab จากหัวการ์ดถึงปุ่มแชร์ ⇒ Enter ⇒ เมนูแชร์ได้ข้อความ
    const ควร = await ข้อความที่ควรเป็น(แท็บ, i)
    await ล้างส่งออก(แท็บ, 'แชร์')
    await แท็บ.locator('#pk-หัวการ์ดคำ').focus()
    let ถึง = false
    for (let k = 0; k < 4 && !ถึง; k++) {
      await แท็บ.keyboard.press('Tab')
      ถึง = await แท็บ.evaluate(() => document.activeElement?.getAttribute('data-ปุ่ม') === 'แชร์คำ')
    }
    if (!ถึง) ตก.push('⑦ กด Tab จากหัวการ์ด ⛔ ถึงปุ่มแชร์ภายใน 4 ครั้ง')
    else await แท็บ.keyboard.press('Enter')
    if (!ถึง || !(await รอส่งออก(แท็บ))) {
      // ⭐ แป้นพิมพ์ไปไม่ถึง ⇒ ยังตรวจข้อความต่อด้วยการคลิก ⇒ ข้อ ② ③ ไม่ตกตามข้อ ⑦
      if (ถึง) ตก.push('⑦ กด Enter ที่ปุ่มแชร์แล้ว ⛔ ไม่มีอะไรส่งเข้าเมนูแชร์')
      await แท็บ.locator('[data-การ์ดคำ] [data-ปุ่ม="แชร์คำ"]').click({ timeout: 3000 }).catch(() => {})
      await รอส่งออก(แท็บ)
    }
    const ได้ = (await ส่งออก(แท็บ))[0]
    if (!ได้) ตก.push('② กดแชร์ในการ์ดแล้ว ⛔ ไม่มีอะไรส่งเข้าเมนูแชร์')
    else {
      if (ได้.ทาง !== 'แชร์' || JSON.stringify(ได้.ช่อง) !== '["text"]')
        ตก.push(`② ส่งเข้าเมนูแชร์ทาง ${ได้.ทาง} ช่อง ${JSON.stringify(ได้.ช่อง)} ⛔ ควรเป็นช่อง text ช่องเดียว`)
      if (ได้.text !== ควร.ข้อความ) {
        const ก = ได้.text.split('\n')
        const ข = ควร.ข้อความ.split('\n')
        const ที่ = ก.findIndex((x, k) => x !== ข[k])
        ตก.push(`② ข้อความที่ส่ง ⛔ ตรงกับที่การ์ดแสดง ⇒ บรรทัด ${ที่ + 1} ได้ «${ก[ที่] ?? '(ไม่มี)'}» ⛔ ควรเป็น «${ข[ที่] ?? '(ไม่มี)'}»`)
      }
      if (!ควร.LGNTDF || !ได้.text.includes(ควร.LGNTDF)) ตก.push('② ข้อความที่ส่ง ⛔ มีถ้อยคำเครดิตของ LGNTDF ตรงตัว')
    }

    // ③ ลิงก์ที่แชร์ ⇒ เปิดแล้วการ์ดของคำนั้นขึ้น
    let ลิงก์ = ได้?.text.split('\n').at(-1) ?? ''
    if (พัง?.ลิงก์) ลิงก์ = พัง.ลิงก์(ลิงก์)
    if (!/^https?:\/\//.test(ลิงก์)) ตก.push(`③ บรรทัดท้ายของข้อความ ⛔ ใช่ลิงก์ «${ลิงก์}»`)
    else {
      const คาด = await แท็บ.evaluate(() => {
        const ก = document.querySelector('[data-การ์ดคำ]')
        return {
          ตัว: ก.querySelector('.pk-คำในการ์ด').textContent.trim(),
          ที่: ก.querySelector('.pk-ที่ของคำ').textContent.replace(/\s+/g, ' ').trim(),
          รูปผัน: ก.querySelector('.pk-รหัสรูปผัน')?.textContent.trim(),
        }
      })
      const ctx2 = await บริบท()
      try {
        const แท็บ2 = await ctx2.newPage()
        await แท็บ2.goto(ลิงก์, { waitUntil: 'domcontentloaded' })
        await รอโค้ดของเว็บติด(แท็บ2)
        const ขึ้น = await รอการ์ด(แท็บ2, คาด.ตัว)
        const เห็น = await แท็บ2.evaluate(
          ([บท, ข้อ]) => {
            const ก = document.querySelector('[data-การ์ดคำ]')
            const ปุ่ม = document.querySelector('.pk-ชั้นคำ .pk-คำที่เปิด')
            const ข้อของปุ่ม = ปุ่ม?.closest('.pk-ข้อคำ')
            return {
              ตัว: ก?.querySelector('.pk-คำในการ์ด')?.textContent.trim() ?? null,
              ที่: ก?.querySelector('.pk-ที่ของคำ')?.textContent.replace(/\s+/g, ' ').trim() ?? null,
              รูปผัน: ก?.querySelector('.pk-รหัสรูปผัน')?.textContent.trim() ?? null,
              ข้อของปุ่ม: ข้อของปุ่ม?.getAttribute('data-ข้อเดิม') ?? null,
              ลำดับปุ่ม: ข้อของปุ่ม ? [...ข้อของปุ่ม.querySelectorAll('.pk-คำ')].indexOf(ปุ่ม) : -1,
              โฟกัสในการ์ด: !!ก?.contains(document.activeElement),
            }
          },
          [บท.บท, บท.ข้อ],
        )
        if (!ขึ้น) ตก.push(`③ เปิดลิงก์ที่แชร์แล้วการ์ดของ ${คาด.ตัว} ⛔ ไม่ขึ้น ⇒ การ์ดเป็น «${เห็น.ตัว}» ⇒ ${ลิงก์}`)
        if (ขึ้น && (เห็น.ที่ !== คาด.ที่ || เห็น.รูปผัน !== คาด.รูปผัน))
          ตก.push(`③ เปิดลิงก์แล้วการ์ดเป็น ${เห็น.ที่} ${เห็น.รูปผัน} ⛔ ควรเป็น ${คาด.ที่} ${คาด.รูปผัน}`)
        if (เห็น.ข้อของปุ่ม !== `${บท.บท}:${บท.ข้อ}` || เห็น.ลำดับปุ่ม !== i)
          ตก.push(`③ เปิดลิงก์แล้วคำที่เปิดบนหน้าคือ ${เห็น.ข้อของปุ่ม} คำที่ ${เห็น.ลำดับปุ่ม + 1} ⛔ ควรเป็น ${บท.บท}:${บท.ข้อ} คำที่ ${i + 1}`)
        if (ขึ้น && !เห็น.โฟกัสในการ์ด) ตก.push('③ เปิดลิงก์แล้วโฟกัส ⛔ อยู่ในการ์ด')
      } finally {
        await ctx2.close()
      }
    }

    // ⑥ ปิดเมนูเฉย ๆ ⇒ ไม่มีข้อความ ⇒ การ์ดยังอยู่
    await ล้างส่งออก(แท็บ, 'ปิดเมนู')
    await แท็บ.locator('[data-การ์ดคำ] [data-ปุ่ม="แชร์คำ"]').click({ timeout: 3000 }).catch(() => {})
    if (await รอส่งออก(แท็บ)) {
      const ผล = await แท็บ.evaluate(() => ({
        ข้อความ: document.querySelectorAll('[data-การ์ดคำ] [data-ผลแชร์]').length,
        การ์ด: !!document.querySelector('[data-การ์ดคำ]'),
      }))
      if (ผล.ข้อความ) ตก.push('⑥ ปิดเมนูแชร์เฉย ๆ แล้วมีข้อความขึ้น ⛔ ควรเงียบ')
      if (!ผล.การ์ด) ตก.push('⑥ ปิดเมนูแชร์แล้วการ์ดปิดไปด้วย ⛔')
    }

    // ④ ไม่มีเมนูแชร์ ⇒ คัดลอก ⇒ คัดลอกแล้ว
    await ล้างส่งออก(แท็บ, 'ไม่มีเมนู')
    await แท็บ.locator('[data-การ์ดคำ] [data-ปุ่ม="แชร์คำ"]').click({ timeout: 3000 }).catch(() => {})
    const ได้คัดลอก = (await รอส่งออก(แท็บ)) ? (await ส่งออก(แท็บ))[0] : null
    if (!ได้คัดลอก || ได้คัดลอก.ทาง !== 'คัดลอก') ตก.push('④ ไม่มีเมนูแชร์แล้ว ⛔ คัดลอกข้อความให้')
    else if (ได้คัดลอก.text !== ควร.ข้อความ) ตก.push('④ ข้อความที่คัดลอก ⛔ ตรงกับข้อความที่แชร์')
    const ป้าย = await แท็บ
      .waitForFunction(
        (คำ) => {
          const x = document.querySelector('[data-การ์ดคำ] [role="status"] [data-ผลแชร์="คัดลอกแล้ว"]')
          return !!x && x.checkVisibility() && x.textContent.trim() === คำ
        },
        คำ.คัดลอกแล้ว,
        { timeout: 3000 },
      )
      .then(() => true)
      .catch(() => false)
    if (!ป้าย) ตก.push(`④ คัดลอกแล้ว ⛔ ขึ้น «${คำ.คัดลอกแล้ว}» ให้ตาเห็นในกล่องสถานะของการ์ด`)

    // ⑤ คัดลอกไม่ได้ ⇒ กล่องข้อความทั้งก้อน
    ตก.push(...(await ตรวจคัดลอกเอง(แท็บ, ควร.ข้อความ, 'จอ 1280')))
  } catch (e) {
    ตก.push(`ด่านล้มระหว่างตรวจจอ 1280 ⇒ ${e.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ตก
}

async function ตรวจคัดลอกเอง(แท็บ, ข้อความ, ป้าย) {
  const ตก = []
  await ล้างส่งออก(แท็บ, 'คัดลอกไม่ได้')
  await แท็บ.locator('[data-การ์ดคำ] [data-ปุ่ม="แชร์คำ"]').click({ timeout: 3000 }).catch(() => {})
  const ขึ้น = await แท็บ
    .waitForFunction(() => document.querySelector('[data-การ์ดคำ] [data-ผลแชร์="คัดลอกเอง"]')?.checkVisibility(), null, { timeout: 3000 })
    .then(() => true)
    .catch(() => false)
  if (!ขึ้น) {
    ตก.push(`⑤ ${ป้าย} ⇒ คัดลอกไม่ได้แล้ว ⛔ มีกล่องข้อความทั้งก้อนให้ตาเห็น`)
    return ตก
  }
  const ก = await แท็บ.evaluate(() => {
    const box = document.querySelector('[data-การ์ดคำ] [data-ผลแชร์="คัดลอกเอง"]')
    const ta = box.querySelector('textarea')
    const r = box.getBoundingClientRect()
    const หัวid = box.getAttribute('aria-labelledby')
    return {
      ค่า: ta?.value ?? null,
      โฟกัส: document.activeElement === ta,
      หัว: หัวid ? document.getElementById(หัวid)?.textContent.trim() : null,
      ซ้ำid: หัวid ? document.querySelectorAll(`[id="${หัวid}"]`).length : 0,
      ซ้าย: r.left,
      ขวา: r.right,
      บน: r.top,
      ล่าง: r.bottom,
      กว้างจอ: document.documentElement.clientWidth,
      สูงจอ: window.innerHeight,
      ล้นหน้า: Math.round(document.documentElement.scrollWidth - document.documentElement.clientWidth),
    }
  })
  if (ก.ค่า !== ข้อความ) ตก.push(`⑤ ${ป้าย} ⇒ ข้อความในกล่องคัดลอกเอง ⛔ ตรงกับข้อความที่แชร์`)
  if (!ก.โฟกัส) ตก.push(`⑤ ${ป้าย} ⇒ กล่องคัดลอกเองขึ้นแล้วโฟกัส ⛔ อยู่ในช่องข้อความ`)
  if (ก.หัว !== คำ.หัวคัดลอกเอง || ก.ซ้ำid !== 1) ตก.push(`⑤ ${ป้าย} ⇒ หัวกล่อง «${ก.หัว}» (id ซ้ำ ${ก.ซ้ำid}) ⛔ ควรเป็น «${คำ.หัวคัดลอกเอง}» id เดียว`)
  if (ก.ซ้าย < -0.5 || ก.ขวา > ก.กว้างจอ + 0.5 || ก.บน < -0.5 || ก.ล่าง > ก.สูงจอ + 0.5 || ก.ล้นหน้า > 1)
    ตก.push(`⑨ ${ป้าย} ⇒ กล่องคัดลอกเองล้นจอ ⇒ ซ้าย ${Math.round(ก.ซ้าย)} ขวา ${Math.round(ก.ขวา)} บน ${Math.round(ก.บน)} ล่าง ${Math.round(ก.ล่าง)} · จอ ${ก.กว้างจอ}×${ก.สูงจอ}`)
  // ⭐ Esc ในกล่อง ⇒ ปิดแค่กล่อง ⇒ การ์ดยังอยู่
  await แท็บ.keyboard.press('Escape')
  const หลังEsc = await แท็บ.evaluate(() => ({
    กล่อง: !!document.querySelector('[data-การ์ดคำ] [data-ผลแชร์="คัดลอกเอง"]'),
    การ์ด: !!document.querySelector('[data-การ์ดคำ]'),
  }))
  if (หลังEsc.กล่อง) ตก.push(`⑤ ${ป้าย} ⇒ กด Esc ในกล่องคัดลอกเองแล้วกล่อง ⛔ ปิด`)
  if (!หลังEsc.การ์ด) ตก.push(`⑤ ${ป้าย} ⇒ กด Esc ในกล่องคัดลอกเองแล้วการ์ดปิดไปด้วย ⛔ ควรปิดแค่กล่อง`)
  return ตก
}

// ⑨ จอ 320 ตัวอักษร 200%
async function ตรวจจอแคบ(พัง) {
  const ตก = []
  const ctx = await บริบท({ กว้าง: 320, สูง: 720, ใหญ่สุด: true, พัง })
  try {
    const { แท็บ, i } = await เปิดการ์ด(ctx, พัง)
    const ห = await วัดหัว(แท็บ)
    const ตกหัว = []
    ตรวจหัว(ห, 'จอ 320 ตัวอักษร 200%', ตกหัว)
    ตก.push(...ตกหัว.map((x) => x.replace(/^①/, '⑨')))
    if (ห.ล้นหน้า > 1 || ห.ล้นการ์ด > 1) ตก.push(`⑨ จอ 320 ตัวอักษร 200% ⇒ ล้นด้านข้าง ⇒ หน้า ${ห.ล้นหน้า} · การ์ด ${ห.ล้นการ์ด} จุด`)
    if (ห.จำนวน) {
      const ควร = await ข้อความที่ควรเป็น(แท็บ, i)
      ตก.push(...(await ตรวจคัดลอกเอง(แท็บ, ควร.ข้อความ, 'จอ 320 ตัวอักษร 200%')))
    }
  } catch (e) {
    ตก.push(`ด่านล้มระหว่างตรวจจอ 320 ⇒ ${e.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ตก
}

// ⑧ ลิงก์เก่า ⇒ ไม่มี `w` · `w` อ่านไม่ออก · `w` ชี้คำที่ไม่มี ⇒ ⛔ การ์ด ⛔ หน้าพัง
async function ตรวจลิงก์เก่า() {
  const ตก = []
  const แบบ = [
    ['ลิงก์เก่าไม่มี w', `/read/${บท.เล่ม}?c=${บท.บท}&v=${บท.ข้อ}&t=TCV,SBLGNT`],
    ['ลิงก์เลือกข้อของใบ #139', `/read/${บท.เล่ม}?c=${บท.บท}&v=${บท.ข้อ}&t=TCV,SBLGNT&s=${บท.บท}.${บท.ข้อ}`],
    ['w อ่านไม่ออก', `/read/${บท.เล่ม}?c=${บท.บท}&v=${บท.ข้อ}&t=TCV,SBLGNT&w=abc`],
    ['w ชี้คำที่ไม่มี', `/read/${บท.เล่ม}?c=${บท.บท}&v=${บท.ข้อ}&t=TCV,SBLGNT&w=${บท.บท}.${บท.ข้อ}.999`],
    ['w ชี้บทที่ไม่มี', `/read/${บท.เล่ม}?c=${บท.บท}&t=TCV,SBLGNT&w=999.1.1`],
  ]
  const ctx = await บริบท()
  try {
    for (const [ชื่อ, ทาง] of แบบ) {
      const แท็บ = await ctx.newPage()
      const พัง = []
      แท็บ.on('pageerror', (e) => พัง.push(e.message))
      await แท็บ.goto(`${ฐาน}${ทาง}`, { waitUntil: 'networkidle' })
      await รอโค้ดของเว็บติด(แท็บ)
      await แท็บ.waitForSelector('.pk-ชั้นคำ .pk-คำ', { timeout: รอนานสุด }).catch(() => ตก.push(`⑧ ${ชื่อ} ⇒ คำภาษาเดิม ⛔ ขึ้น`))
      await แท็บ.waitForLoadState('networkidle')
      const ผล = await แท็บ.evaluate(() => ({ การ์ด: !!document.querySelector('[data-การ์ดคำ]'), ตัวบท: !!document.querySelector('.pk-ตัวบท') }))
      if (ผล.การ์ด) ตก.push(`⑧ ${ชื่อ} ⇒ การ์ดคำเปิดเอง ⛔ ลิงก์ที่ไม่มีคำที่ถูกต้องต้องไม่มีการ์ด`)
      if (!ผล.ตัวบท) ตก.push(`⑧ ${ชื่อ} ⇒ ตัวบท ⛔ ขึ้น`)
      if (พัง.length) ตก.push(`⑧ ${ชื่อ} ⇒ หน้ามีข้อผิดพลาด ${พัง[0].slice(0, 80)}`)
      await แท็บ.close()
    }
  } catch (e) {
    ตก.push(`ด่านล้มระหว่างตรวจลิงก์เก่า ⇒ ${e.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ตก
}

const ที่ตก = []
for (const [ชื่อ, ตัวตรวจ] of [
  ['จอ 1280', ตรวจหลัก],
  ['จอ 320 ตัวอักษร 200%', ตรวจจอแคบ],
  ['ลิงก์เก่า', ตรวจลิงก์เก่า],
]) {
  const ตก = await ตัวตรวจ()
  ที่ตก.push(...ตก)
  console.log(`${ตก.length ? '⛔' : '✅'} ${ชื่อ}`)
  for (const x of ตก) console.log(`   ${x}`)
}

if (ทดสอบตัวเอง) {
  for (const [ชื่อ, พัง] of Object.entries(ของพัง)) {
    const ตก = [...(await ตรวจหลัก(พัง)), ...(['①', '⑨'].includes(พัง.ข้อ) ? await ตรวจจอแคบ(พัง) : [])]
    const จับได้ = ตก.some((x) => x.startsWith(พัง.ข้อ))
    console.log(`${จับได้ ? '✅' : '⛔'} โหมดพิสูจน์ ${ชื่อ} ⇒ ข้อ ${พัง.ข้อ} ${จับได้ ? 'จับได้' : '⛔ จับไม่ได้'}`)
    if (!จับได้) {
      ที่ตก.push(`โหมดพิสูจน์ ${ชื่อ} ⇒ ยัดของพังแล้วข้อ ${พัง.ข้อ} ⛔ ไม่แดง`)
      for (const x of ตก.slice(0, 5)) console.log(`   ${x}`)
    }
  }
}

await เบราว์เซอร์.close()

if (ที่ตก.length) {
  console.log(`\n⛔ ด่านแชร์การ์ดคำแดง — ${ที่ตก.length} เรื่อง`)
  for (const x of ที่ตก.slice(0, 60)) console.log(`  · ${x}`)
  process.exit(1)
}
console.log(ทดสอบตัวเอง ? '\n✅ ด่านแชร์การ์ดคำยังจับของพังได้ครบทุกท่า' : '\n✅ ด่านแชร์การ์ดคำเขียว')
