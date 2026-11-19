// สร้าง **รายการไฟล์ที่แอปเก็บไว้ในเครื่อง** ⇒ `offline.json` ที่รากของเว็บที่สร้างเสร็จ
//   (@krisada เคาะ 19 พ.ย. 2569 ⇒ ติดตั้งเป็นแอปแล้ว ⇒ เก็บ *ตัวบททั้งเล่ม* ทุกเล่มทุกฉบับ ⇒ อ่านได้แม้ไม่มีเน็ต)
//
//   node tools/สร้างรายการออฟไลน์.mjs .output/public
//
// ⭐ **ใครเรียก** ⇒ `npm run generate` (ใน `package.json`) ⇒ ทางเดียวที่ทั้งงาน `สร้างเว็บ` ของท่อ
//   และ `tools/สร้างเว็บที่จะปล่อย.sh` ใช้สร้างเว็บ ⇒ ⛔ มีทางสร้างเว็บที่ลืมรายการนี้
//   ⇒ ⛔ ไม่ใช้ตะขอของ Nitro ⇒ `200.html` กับ `404.html` ถูกเขียนท้ายสุด (เวลาไฟล์ช้ากว่าไฟล์อื่น) ⇒ ตะขอเห็นกองไม่ครบ
//
// ⭐ **ใครอ่าน** ⇒ ตัวช่วยออฟไลน์ `public/sw.js` ⇒ ดึงเฉพาะไฟล์ที่ลายนิ้วมือเปลี่ยน ⇒ เว็บขึ้นวันละหลายรอบ
//   ⇒ รอบหลังดาวน์โหลดแค่ไฟล์ที่เปลี่ยนจริง ⛔ ทั้ง 50 กว่า MB
//   ⇒ ตัวเฝ้าคือ `tools/ด่านออฟไลน์.mjs` ข้อ ③ (รายการครบทุกบททุกเล่ม · ไฟล์ที่หน้าอ่านขอ ⛔ ตกหล่น)
//
// ⭐ **ของที่เก็บ = ของที่หน้าอ่านขอจริง** (ส่องการจราจรของหน้า `read/MRK?c=14` สลับฉบับสลับบท 19 พ.ย. 2569)
//   ⇒ หน้าแรก · สารบัญ · หน้าของเล่มทุกเล่ม + `_payload.json` · `api/chapter/**` (ทุกฉบับอยู่ในไฟล์ของบท)
//   · `api/book/*` · `api/books.json` · `api/paragraphs.json` · `api/audio.json` · `_nuxt/**` · ฟอนต์ · ไอคอน · `200.html` `404.html`
// ⛔ **ของที่ไม่เก็บล่วงหน้า** ⇒ ภาษาเดิม (`api/card` · `api/words` · `api/lex` ⇒ เก็บเฉพาะบทที่เปิดแล้ว)
//   · เสียง (`story-audio/` · เสียงข้อที่อยู่ต่างโดเมน) · บทความ · หน้าแหล่งข้อมูล
//
// ⭐ **รูปของรายการ** ⇒ `ไฟล์` = `[ทาง, ลายนิ้วมือ, ขนาด]` ⇒ ทางนับจากฐานของเว็บ ⛔ มี `/` นำหน้า
//   ⇒ หน้า HTML เขียนเป็นโฟลเดอร์ (`read/MRK/` · `''` คือหน้าแรก) ⇒ ตรงกับที่อยู่ที่ผู้อ่านเปิด
//   ⇒ ลายนิ้วมือ = sha256 ของไบต์ 16 ตัวแรก ⇒ ตัวช่วยออฟไลน์คิดซ้ำจากไบต์ที่ได้มา ⇒ ⛔ ตรง ⇒ ⛔ จดว่าเก็บแล้ว

import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { pathToFileURL } from 'node:url'

export const ชื่อรายการ = 'offline.json'

/** ทางที่เก็บล่วงหน้า ⇒ ทางนับจากฐาน ⇒ เจ้าของกติกาคือหัวไฟล์นี้ */
export function ต้องเก็บล่วงหน้า(ทาง) {
  if (/^(index\.html|200\.html|404\.html|_payload\.json|favicon\.ico|manifest\.webmanifest|pk-fontsize\.js)$/.test(ทาง)) return true
  if (/^read\/(index\.html|_payload\.json)$/.test(ทาง)) return true
  if (/^read\/[^/]+\/(index\.html|_payload\.json)$/.test(ทาง)) return true
  if (/^api\/(books|paragraphs|audio)\.json$/.test(ทาง)) return true
  if (/^api\/(chapter|book)\//.test(ทาง)) return true
  if (/^(_nuxt|fonts|icons)\//.test(ทาง)) return !/\.txt$/.test(ทาง)
  return false
}

/** `read/MRK/index.html` ⇒ `read/MRK/` · `index.html` ⇒ `''` ⇒ ทางเดียวกับที่ผู้อ่านเปิด */
export const ทางที่เปิด = (ทาง) => ทาง.replace(/(^|\/)index\.html$/, '$1')

function* ไล่ไฟล์(ราก, ที่ = ราก) {
  for (const ชื่อ of readdirSync(ที่)) {
    const เต็ม = join(ที่, ชื่อ)
    if (statSync(เต็ม).isDirectory()) yield* ไล่ไฟล์(ราก, เต็ม)
    else yield relative(ราก, เต็ม).split(sep).join('/')
  }
}

export function สร้างรายการ(ราก) {
  const ไฟล์ = []
  let ขนาดรวม = 0
  for (const ทาง of [...ไล่ไฟล์(ราก)].sort()) {
    if (!ต้องเก็บล่วงหน้า(ทาง)) continue
    const ไบต์ = readFileSync(join(ราก, ทาง))
    const ลาย = createHash('sha256').update(ไบต์).digest('hex').slice(0, 16)
    ไฟล์.push([ทางที่เปิด(ทาง), ลาย, ไบต์.length])
    ขนาดรวม += ไบต์.length
  }
  // ⭐ รุ่นของรายการ ⇒ เปลี่ยนเมื่อไฟล์ไหนเปลี่ยน ⇒ หน้าเว็บใช้ดูว่าที่เก็บไว้เป็นรุ่นเดียวกันไหม
  const รุ่น = createHash('sha256').update(JSON.stringify(ไฟล์)).digest('hex').slice(0, 16)
  return { รุ่น, ขนาดรวม, ไฟล์ }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const ราก = process.argv[2] || '.output/public'
  if (!existsSync(join(ราก, 'index.html'))) {
    console.error(`⛔ ${ราก} ⛔ มี index.html ⇒ ยังไม่ได้สร้างเว็บ`)
    process.exit(1)
  }
  const รายการ = สร้างรายการ(ราก)
  // ⛔ ไม่มีบทสักบท = ซองตัวบทเป็นตัวชี้ของ LFS ⇒ แอปจะบอกว่าพร้อมทั้งที่ไม่มีอะไรให้อ่าน
  if (!รายการ.ไฟล์.some(([ทาง]) => ทาง.startsWith('api/chapter/'))) {
    console.error('⛔ ไม่มีไฟล์ api/chapter/ สักไฟล์ ⇒ แอปจะไม่มีตัวบทให้อ่านแบบไม่มีเน็ต')
    process.exit(1)
  }
  writeFileSync(join(ราก, ชื่อรายการ), JSON.stringify(รายการ))
  const MB = (รายการ.ขนาดรวม / 1e6).toFixed(1)
  console.log(`✅ ${ชื่อรายการ} ⇒ ${รายการ.ไฟล์.length} ไฟล์ · ${MB} MB · รุ่น ${รายการ.รุ่น}`)
}
