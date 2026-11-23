// ด่านตรวจ — **คำที่ผู้แปล KJV เติม ต้องเป็นตัวเอียง และ LORD ต้องเป็นตัวพิมพ์ใหญ่ขนาดเล็ก ตามฉบับพิมพ์ของเจ้าของ**
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// **ทำไมต้องมี** — @krisada 23 พ.ย. 2569 *"ทำทั้งหมดทุกเล่มทุกฟีเจอร์"* ⇒ รายการของที่ขาดอยู่ `docs/บันทึก-แหล่งข้อมูล.md` หัวข้อ ⑪
//   ⇒ ช่วงมาจาก `<add>` `<nd>` ใน USFX ของ KJV ⇒ ตัวพ่นคือ `tools/สร้างคำพระเยซู.py` (ไฟล์ `_พ่น/ช่วงเน้น.json.gz`)
//   ⇒ การใส่ช่วงคือการ *ผ่าตัวบทเป็นชิ้น* ⇒ ผ่าพลาดเมื่อไร ตัวอักษรหายหรือซ้ำ โดยหน้าเว็บยังดูปกติ
//
// **ตรวจ 3 ข้อ บนหน้าจริง** (ปฐมกาล 1 · สดุดี 3 ฉบับ KJV แบบแยกตามข้อ)
//   ① **ชิ้นตัวเอียงที่ตาเห็นต้องเท่ากับช่วงที่หลังบ้านส่งมา ตัวหนังสือตรงทุกช่วง และตาเห็นเป็นตัวเอียงจริง** (getComputedStyle)
//   ② **LORD ในสดุดี 3 ต้องเป็นตัวพิมพ์ใหญ่ขนาดเล็กจริง** ⇒ จำนวนเท่าที่ส่งมา
//   ③ **ตัวบทที่ต่อกลับจากทุกชิ้นของแต่ละข้อ ต้องเท่ากับตัวบทที่หลังบ้านส่งมาทุกตัวอักษร**
//
// **พิสูจน์ว่าด่านแดงได้จริง** ⇒ `node tools/ด่านช่วงเน้นบนหน้า.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง`
//   ⇒ ยัดกฎให้ตัวเอียงกลายเป็นตัวตรง ⇒ **ข้อ ① ต้องแดง**
import { chromium } from 'playwright'
import { เส้นทางเว็บ, รอโค้ดของเว็บติด } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const ที่ตก = []
const กฎที่พัง = `.pk-คำเติม { font-style: normal !important; }`

const เบราว์เซอร์ = await chromium.launch()

async function ตรวจบท(เล่ม, บท) {
  const ส่งมา = await (await fetch(`${ฐาน}/api/chapter/${เล่ม}/${บท}.json`)).json()
  const ตัวบท = ส่งมา.ชั้น?.KJV || {}
  const ช่วง = (ชนิด) => (ส่งมา.ช่วงเน้น?.[ชนิด]?.KJV || []).map((ช) => ตัวบท[String(ช.ข้อ)]?.slice(ช.หลังอักษร, ช.ถึงอักษร))
  const คาดเอียง = ช่วง('คำเติม')
  const คาดนาม = ช่วง('พระนาม')
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: 1280, height: 900 } })
  await ctx.addInitScript(() => localStorage.setItem('phrakham.view', JSON.stringify({ จัดวาง: 'แยกตามข้อ' })))
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(`${ฐาน}/read/${เล่ม}/?c=${บท}&t=KJV`, { waitUntil: 'domcontentloaded' })
  await แท็บ.waitForSelector('article.pk-เนื้อ h1')
  await รอโค้ดของเว็บติด(แท็บ)
  await แท็บ.waitForTimeout(300)
  if (ทดสอบตัวเอง) await แท็บ.addStyleTag({ content: กฎที่พัง })
  const ได้ = await แท็บ.evaluate((บท) => {
    const ในบท = (x) => (x.closest('[data-ข้อ]')?.getAttribute('data-ข้อ') || '').startsWith(`${บท}:`)
    const เก็บ = (s) =>
      [...document.querySelectorAll(`[data-ฉบับ="KJV"] ${s}`)].filter((x) => x.getClientRects().length && ในบท(x))
    const เอียง = เก็บ('.pk-คำเติม').map((x) => ({ ตัว: x.textContent, เอียง: getComputedStyle(x).fontStyle === 'italic' }))
    const นาม = เก็บ('.pk-พระนาม').map((x) => ({ ตัว: x.textContent, เล็ก: getComputedStyle(x).fontVariantCaps === 'all-small-caps' }))
    const ข้อ = {}
    for (const e of document.querySelectorAll('[data-ข้อ]')) {
      const k = e.getAttribute('data-ข้อ')
      if (!k.startsWith(`${บท}:`)) continue
      const ช่อง = e.querySelector('[data-ฉบับ="KJV"] .pk-ช่องฉบับ, .pk-ช่องฉบับ[data-ฉบับ="KJV"]')
      if (!ช่อง) continue
      const สำเนา = ช่อง.cloneNode(true)
      สำเนา.querySelectorAll('.pk-เฉพาะเสียง, .pk-เลขข้อ, .pk-เครื่องหมายเชิงอรรถ').forEach((x) => x.remove())
      ข้อ[k.split(':')[1]] = สำเนา.textContent
    }
    return { เอียง, นาม, ข้อ }
  }, บท)
  await ctx.close()

  const ป้าย = `${เล่ม} ${บท}`
  if (!คาดเอียง.length) ที่ตก.push(`① ${ป้าย} ⇒ หลังบ้านไม่ส่งช่วงคำเติมของ KJV มาเลย`)
  if (ได้.เอียง.length !== คาดเอียง.length) ที่ตก.push(`① ${ป้าย} ⇒ ส่งช่วงคำเติมมา ${คาดเอียง.length} ⇒ ตาเห็น ${ได้.เอียง.length}`)
  else คาดเอียง.forEach((t, i) => { if (ได้.เอียง[i].ตัว !== t) ที่ตก.push(`① ${ป้าย} ช่วงที่ ${i + 1} ⇒ ส่งมา "${t}" ⇒ ตาเห็น "${ได้.เอียง[i].ตัว}"`) })
  const ตรง = ได้.เอียง.filter((x) => !x.เอียง).length
  if (ตรง) ที่ตก.push(`① ${ป้าย} ⇒ คำเติม ${ตรง} ชิ้นตาเห็นเป็นตัวตรง ⛔ ไม่ใช่ตัวเอียง`)
  if (ได้.นาม.length !== คาดนาม.length) ที่ตก.push(`② ${ป้าย} ⇒ ส่ง LORD มา ${คาดนาม.length} ⇒ ตาเห็น ${ได้.นาม.length}`)
  if (ได้.นาม.some((x) => !x.เล็ก)) ที่ตก.push(`② ${ป้าย} ⇒ LORD บางชิ้นไม่ใช่ตัวพิมพ์ใหญ่ขนาดเล็ก`)
  for (const [n, t] of Object.entries(ตัวบท)) {
    if (ได้.ข้อ[n] === undefined) continue
    if (ได้.ข้อ[n].replace(/\s+/g, ' ').trim() !== t.replace(/\s+/g, ' ').trim()) {
      ที่ตก.push(`③ ${ป้าย}:${n} ⇒ ตัวบทบนหน้า ⛔ ไม่ตรงหลังบ้าน ⇒ บนหน้า ${ได้.ข้อ[n].length} · หลังบ้าน ${t.length} ตัว`)
      break
    }
  }
  if (!Object.keys(ได้.ข้อ).length) ที่ตก.push(`③ ${ป้าย} ⇒ หาช่องของ KJV บนหน้าไม่เจอ`)
  return { เอียง: ได้.เอียง.length, นาม: ได้.นาม.length, ข้อ: Object.keys(ได้.ข้อ).length }
}

const ผล = [await ตรวจบท('GEN', 1), await ตรวจบท('PSA', 3)]
await เบราว์เซอร์.close()

if (ทดสอบตัวเอง) {
  const จับได้ = ที่ตก.filter((x) => x.startsWith('①'))
  if (!จับได้.length) {
    console.error('⛔ โหมดพิสูจน์: ทำตัวเอียงให้เป็นตัวตรงแล้ว **ด่านยังเขียว** ⇒ ด่านตาบอด')
    process.exit(1)
  }
  console.log(`✅ โหมดพิสูจน์: ด่านยังจับของพังได้ ⇒ ${จับได้[0]}`)
  process.exit(0)
}
if (ที่ตก.length) {
  console.error(`\n⛔ ไม่ผ่าน — ${ที่ตก.length} รายการ:`)
  for (const x of ที่ตก) console.error('  - ' + x)
  process.exit(1)
}
console.log(`✅ ตัวเอียงกับ LORD ของ KJV ขึ้นครบ ตัวหนังสือตรง ⇒ ปฐก.1 คำเติม ${ผล[0].เอียง} · สดด.3 คำเติม ${ผล[1].เอียง} LORD ${ผล[1].นาม} · ตัวบทครบ ${ผล[0].ข้อ + ผล[1].ข้อ} ข้อ`)
