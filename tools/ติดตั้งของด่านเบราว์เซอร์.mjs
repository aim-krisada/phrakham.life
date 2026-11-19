// ลงของที่ด่านเบราว์เซอร์ใช้จริง ⇒ **แค่ `playwright` กับ `axe-core`** ⛔ ไม่ใช่ 1,006 ก้อนของ `npm ci` เต็ม
//   (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/123 ทาง ก)
//
// รัน  node tools/ติดตั้งของด่านเบราว์เซอร์.mjs   ⇒ ในท่อเท่านั้น ⇒ ทุกงานที่ใช้ `*browser` เรียกตัวนี้ใน `before_script`
//
// ## ทำไมต้องมี
//
// ด่านเบราว์เซอร์ 55 งานเคยสั่ง `npm ci` เต็มทุกงาน ⇒ งานละราว 12 วินาที + ดึงแคช 6 + อัปแคชกลับ 6 (ท่อ 11490)
//   ⇒ ⭐ แต่ไล่ import ทุกชั้นของ `tools/ด่าน*.mjs` ที่งานเบราว์เซอร์เรียก (รวม `app/utils/*.ts` ที่มันดึงมาใช้)
//     ⇒ **แพ็กเกจที่ใช้มีแค่ `playwright` กับ `axe-core/axe.min.js`** ⇒ ที่เหลือเป็นของในตัว node ล้วน
//   ⇒ ก้อนอื่นอีกพันกว่าก้อน (nuxt · vite · tailwind ...) เป็นของ *ตัวสร้างเว็บ* ⇒ งาน `สร้างเว็บ` ยังลงครบเหมือนเดิม
//
// ## ⭐⭐ ทำไมยังเชื่อได้ว่าเป็นของชุดเดียวกับ `npm ci`
//
// ⇒ รุ่น ที่อยู่ดาวน์โหลด และ **ลายนิ้วมือ (`integrity`)** หยิบจาก `package-lock.json` ตัวเดิมทุกตัวอักษร
//   ⇒ แล้วสั่ง `npm ci` จริงกับ lock ที่ตัดเหลือแค่ก้อนเหล่านี้ ⇒ npm ตรวจลายนิ้วมือเองทุกก้อน
//   ⇒ ⛔ ไม่ใช่ `npm install playwright` ที่ไปหยิบรุ่นล่าสุดตามใจ
// ⇒ จบแล้วเทียบรุ่นที่ลงได้กับ lock อีกชั้น ⇒ ไม่ตรง = ตายตรงนี้
//
// ## ⛔ ของที่ต้องรู้ก่อนแก้
//
// ① **วันที่ด่านเบราว์เซอร์ตัวไหน import แพ็กเกจใหม่** ⇒ เติมชื่อเข้า `อยากได้` ข้างล่าง
//   ⇒ ลืมเติม = ด่านตัวนั้นตายด้วย `ERR_MODULE_NOT_FOUND` ⇒ **แดง ⛔ ไม่ใช่เขียวเงียบ** ⇒ ปลอดภัยแต่ต้องแก้
// ② ⛔ **อย่ากลับไปใส่ `npm ci` เต็มในงานเบราว์เซอร์** ⇒ แคชของงานเบราว์เซอร์เก็บแค่ก้อนชุดนี้
//   ⇒ `npm ci` เต็มจะต้องไปโหลดพันกว่าก้อนจากเน็ตทุกงาน ⇒ ช้ากว่าเดิมมาก
// ③ ตัวนี้ **ไม่ยอมทับ `node_modules/` ที่มีอยู่แล้ว** ⇒ ในเครื่องคนทำมีของเต็มอยู่ ⇒ ใช้ของนั้นได้เลย ⛔ ไม่ต้องรันตัวนี้
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ราก = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const อยากได้ = ['playwright', 'axe-core']
const เริ่ม = Date.now()

const lock = JSON.parse(fs.readFileSync(path.join(ราก, 'package-lock.json'), 'utf8'))
const ของในlock = lock.packages
const ช่วงรุ่นที่ราก = { ...(ของในlock[''].dependencies || {}), ...(ของในlock[''].devDependencies || {}) }

// หาที่ของแพ็กเกจตามวิธีของ node ⇒ ไล่จาก node_modules ซ้อนในตัวมันขึ้นไปหาราก
function หาที่(จาก, ชื่อ) {
  let ฐาน = จาก
  for (;;) {
    const ที่ = (ฐาน ? ฐาน + '/' : '') + 'node_modules/' + ชื่อ
    if (ของในlock[ที่]) return ที่
    if (!ฐาน) return null
    const ตัด = ฐาน.lastIndexOf('/node_modules/')
    ฐาน = ตัด < 0 ? '' : ฐาน.slice(0, ตัด)
  }
}

const เลือก = {}
const คิว = []
for (const ชื่อ of อยากได้) {
  if (!ช่วงรุ่นที่ราก[ชื่อ]) throw new Error(`⛔ ${ชื่อ} ไม่อยู่ใน package.json ของราก`)
  const ที่ = หาที่('', ชื่อ)
  if (!ที่) throw new Error(`⛔ ${ชื่อ} ไม่อยู่ใน package-lock.json`)
  คิว.push(ที่)
}
while (คิว.length) {
  const ที่ = คิว.shift()
  if (เลือก[ที่]) continue
  const ของ = ของในlock[ที่]
  เลือก[ที่] = ของ
  const ต้องมี = Object.keys(ของ.dependencies || {})
  const มีก็ได้ = Object.keys(ของ.optionalDependencies || {})
  for (const ชื่อ of [...ต้องมี, ...มีก็ได้]) {
    const เจอ = หาที่(ที่, ชื่อ)
    if (เจอ) คิว.push(เจอ)
    else if (ต้องมี.includes(ชื่อ)) throw new Error(`⛔ ${ที่} ต้องใช้ ${ชื่อ} แต่ไม่มีใน package-lock.json`)
  }
}

if (fs.existsSync(path.join(ราก, 'node_modules'))) {
  console.log('⛔ มี node_modules/ อยู่แล้ว ⇒ ตัวนี้ ⛔ ไม่ทับ ⇒ ใช้ของที่มีอยู่ได้เลย (ดูข้อ ③ หัวไฟล์)')
  process.exit(1)
}

const ที่พัก = path.join(ราก, '.ของด่านเบราว์เซอร์')
fs.rmSync(ที่พัก, { recursive: true, force: true })
fs.mkdirSync(ที่พัก)
const ราก_ใหม่ = {
  name: 'ของด่านเบราว์เซอร์',
  devDependencies: Object.fromEntries(อยากได้.map((ชื่อ) => [ชื่อ, ช่วงรุ่นที่ราก[ชื่อ]])),
}
fs.writeFileSync(path.join(ที่พัก, 'package.json'), JSON.stringify({ ...ราก_ใหม่, private: true }, null, 2))
fs.writeFileSync(
  path.join(ที่พัก, 'package-lock.json'),
  JSON.stringify({ name: ราก_ใหม่.name, lockfileVersion: 3, requires: true, packages: { '': ราก_ใหม่, ...เลือก } }, null, 2),
)

// ⭐ แคชของ npm อยู่ที่ `.npm/` ของราก ⇒ ตัวเดียวกับที่ `cache:` ของงานเบราว์เซอร์ดึงมาให้
//   ⇒ `--no-audit` ⇒ ⛔ ไม่ยิงถามช่องโหว่ไปที่ registry ⇒ ไม่เปลี่ยนของที่ลงแม้แต่ไบต์เดียว
execSync(
  `npm ci --cache "${path.join(ราก, '.npm')}" --prefer-offline --ignore-scripts --no-audit --no-fund`,
  { cwd: ที่พัก, stdio: 'inherit' },
)
fs.renameSync(path.join(ที่พัก, 'node_modules'), path.join(ราก, 'node_modules'))
fs.rmSync(ที่พัก, { recursive: true, force: true })

// ⭐ เทียบรุ่นที่ลงได้จริงกับ lock อีกชั้น ⇒ ⛔ ไม่เชื่อว่า npm ทำถูก
let ลง = 0
for (const [ที่, ของ] of Object.entries(เลือก)) {
  const ไฟล์ = path.join(ราก, ที่, 'package.json')
  if (!fs.existsSync(ไฟล์)) {
    if (ของ.optional) continue // เช่น fsevents ⇒ ของ macOS ⇒ ลินุกซ์ข้ามเอง
    throw new Error(`⛔ ${ที่} ไม่ถูกลง`)
  }
  const รุ่น = JSON.parse(fs.readFileSync(ไฟล์, 'utf8')).version
  if (รุ่น !== ของ.version) throw new Error(`⛔ ${ที่} ได้รุ่น ${รุ่น} แต่ lock บอก ${ของ.version}`)
  console.log(`✅ ${ที่.replace(/^node_modules\//, '')} ${รุ่น} ตรง package-lock.json`)
  ลง++
}
console.log(`✅ ลงของด่านเบราว์เซอร์ ${ลง} ก้อน ใน ${((Date.now() - เริ่ม) / 1000).toFixed(1)} วินาที`)
