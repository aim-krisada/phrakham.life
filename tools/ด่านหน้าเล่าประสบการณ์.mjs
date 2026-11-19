// ด่านตรวจ — **หน้าเล่าประสบการณ์ ⇒ หน้ารวมดูได้ 2 แบบ (รายการ · แผนที่) · หน้าละบทความ อ่านได้ ฟังได้ ไปหน้าอ่านได้ · ที่อยู่ที่ไม่มี ⇒ 404**
//
// ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/177 ⇒ เลขในวงเล็บคือเกณฑ์ข้อของใบ (หัวข้อ *เสร็จเมื่อ*)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// ⭐⭐ **ของที่ถูกต้องอ่านจากที่เก็บเอง ⛔ ไม่เชื่อหน้าเว็บ** ⇒ `เรื่องเล่า/ทะเบียน.tsv` กับไฟล์เรื่องที่อนุมัติ
//   ⇒ ช่วง ชื่อเรื่อง (บรรทัด `ชื่อ:`) ตัวเรื่อง และทางของหน้า ⇒ ด่านคิดเอง ⛔ เรียกโค้ดของเว็บ
//     ⇒ ⛔ ด่านที่เรียกโค้ดชุดเดียวกับตัวสร้าง คือด่านที่เขียวพร้อมกับของที่พัง (หลักเดียวกับ `tools/ด่านเรื่องเล่าอนุมัติ.py`)
//   ⇒ ลำดับเล่มกับจำนวนบทของแต่ละเล่ม ⇒ บัญชี 66 เล่มของเว็บ (`/api/books.json`) ⇒ ของจากซองตัวบทที่ด่านอื่นเฝ้าอยู่แล้ว
//   ⇒ คำบนหน้า ⇒ คำเดิมของรุ่น 2 ⇒ ด่านจดซ้ำที่นี่โดยเจตนา ⇒ ใครแก้คำใน `app/utils/ถ้อยคำเล่าประสบการณ์.ts` โดยไม่ผ่านการอนุมัติ ⇒ ด่านแดง
//
// **ด่านนี้ตรวจ 7 ข้อ** ⇒ จอ 375 กับ 1280 ทุกข้อที่มีหน้าตา (เกณฑ์ข้อ 5)
//   ① **ปุ่มสลับ** (1 · 5) ⇒ หัวหน้า *เล่าประสบการณ์* · หัว *บทความทั้งหมด (<จำนวนแถวในทะเบียน>)*
//      ⇒ กลุ่ม *เลือกมุมมอง* มีปุ่มจริง 2 ปุ่ม ⇒ ชื่อที่ได้ยิน *แผนที่* · *รายการ* ⇒ บอกสถานะด้วย `aria-pressed` ⇒ กดแล้วสลับทั้งสถานะและของที่เห็น
//      ⇒ เปิดหน้ามาครั้งแรก ⇒ *รายการ* (ค่าตั้งต้นของรุ่น 2) ⇒ เลือก *แผนที่* แล้วโหลดหน้าใหม่ ⇒ ยังเป็นแผนที่ (รุ่น 2 จำไว้ในเครื่อง)
//   ② **รายการ** (1.1 · 2) ⇒ กลุ่มตามเล่มตามลำดับพระธรรม ⇒ หัวกลุ่ม *<เล่ม> <n> บทความ* ⇒ แถวเรียงบทแล้วข้อ
//      ⇒ แต่ละแถว = ช่วงข้อ + ชื่อเรื่อง + ลิงก์ไปหน้าบทความ ⇒ **ตรงกับทะเบียนทุกแถว ⛔ ขาด ⛔ เกิน ⛔ สลับ**
//   ③ **แผนที่** (1.2 · 1.3) ⇒ เล่มละแถว ⇒ ช่องเท่าจำนวนบทของเล่ม ⇒ บทที่มีบทความ = ปุ่มสีเข้มกว่าช่องอื่น ⇒ ชื่อที่ได้ยินบอกเล่ม บท และจำนวน
//      ⇒ บทที่ไม่มี = ⛔ ปุ่ม ⛔ โฟกัสได้ ⇒ กดทุกช่องที่มี ⇒ ช่องนั้น `aria-pressed` ตัวเดียว ⇒ แผงใต้แผนที่ = บทความของบทนั้นตรงทะเบียน
//      ⇒ ⭐ **เรื่องที่คร่อมบท** ⇒ ทะเบียนวันนี้ ⛔ มี ⇒ ด่านยัดเรื่องปลอม *มาระโก 2:23–3:6* เข้า `/api/stories.json` แล้วเปิดหน้าแบบโครงเปล่า
//        (ท่าเดียวกับที่วางเว็บนิ่งส่ง `404.html`) ⇒ โค้ดของหน้าขอรายชื่อเอง ⇒ ช่องบท 2 และ 3 ต้องเป็นปุ่มทั้งคู่ ⇒ แผงของทั้งสองบทมีเรื่องนั้น ⇒ รายการมีครั้งเดียว
//   ④ **หน้าบทความ** (3) ⇒ ทุกเรื่องในทะเบียน ⇒ ชื่อเรื่อง = บรรทัด `ชื่อ:` ⇒ ตัวเรื่องบนหน้า = ส่วนเรื่องเล่าในไฟล์ทุกตัวอักษร
//      ⇒ ⛔ รายการตรวจ (*ประเภท:* · *การอ้างอิง:*) ⛔ หัวข้ออื่นของไฟล์ ⇒ ลิงก์ไปหน้าอ่าน `c` `v` `r` ตรงช่วง ⇒ ลิงก์กลับหน้ารวม
//      ⇒ เรื่องที่มีเสียง ⇒ มีปุ่มฟัง ⇒ ⛔ ขอไฟล์เสียงก่อนกด ⇒ กดแล้วเสียงเดินจริง ⇒ ปุ่มเปลี่ยนเป็น *หยุดพัก* ⇒ กดอีกครั้งเสียงหยุด
//   ⑤ **เมนู** (4) ⇒ หน้าแรก ⇒ กาง ≡ ⇒ กด *เล่าประสบการณ์* ⇒ มาถึงหน้ารวมของเว็บนี้ ⛔ เว็บเดิม ⇒ บนหน้ารวมเอง ⇒ ตัวหนังสือติด `aria-current`
//   ⑥ **ที่อยู่ที่ไม่มีในทะเบียน ⇒ 404** (6) ⇒ เรื่องที่ไม่มี · ทางทรงอื่นของเรื่องที่มี · ทางที่อ่านไม่ออก
//      ⇒ ที่วางเว็บตอบ 404 ⇒ หน้าไม่พบหน้านี้ของเว็บขึ้นจริง (ชื่อแท็บมี 404 · ข้อความ *ไม่มีหน้านี้*) ⇒ ⛔ หน้าว่าง ⛔ หน้าค้าง ⛔ ตัวเรื่องของเรื่องอื่น
//   ⑦ **จอ 375 · 1280 กับแป้นพิมพ์** (5) ⇒ หน้ารวม (รายการ · แผนที่) กับหน้าบทความ ⛔ เลื่อนซ้ายขวา ⇒ ของกดได้ทุกชิ้นกว้างและสูง ≥ 44 จุด
//      ⇒ แป้นพิมพ์ล้วน ⇒ Tab ถึงปุ่ม *แผนที่* (เห็นวงโฟกัส) ⇒ Enter ⇒ Tab ถึงช่องบท ⇒ เว้นวรรค ⇒ Tab ถึงบทความในแผง ⇒ Enter ⇒ ถึงหน้าบทความ
//      ⇒ WCAG 2.2 SC 1.4.10 · 2.1.1 · 2.4.7 · 2.5.8 · 4.1.2
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านหน้าเล่าประสบการณ์.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพังทีละชิ้น ⇒ แต่ละชิ้นยัดเฉพาะข้อที่ควรจับมัน ⇒ ชิ้นไหนข้อของมัน ⛔ แดง = ด่านเสีย ⇒ รายชื่ออยู่ที่ `ของพัง` ข้างล่าง
//
//   node tools/ด่านหน้าเล่าประสบการณ์.mjs <ที่อยู่เว็บ>

import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { เส้นทางเว็บ, รอโค้ดของเว็บติด } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทางฐาน = new URL(ฐาน + '/').pathname.replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const จอทั้งหมด = [375, 1280]
// ⭐ axe ชุดเดียวกับ `tools/ด่านการเข้าถึง.mjs` ⇒ ด่านนั้นเห็นหน้ารวมแค่มุมมองรายการ (ตอนเปิดหน้า) ⇒ มุมมองแผนที่ ⇒ ที่นี่ยิงเอง
const ที่อยู่axe = createRequire(import.meta.url).resolve('axe-core/axe.min.js')
const ป้ายaxe = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']
const กฎaxeเพิ่ม = { 'label-content-name-mismatch': { enabled: true } }
async function ยิงaxe(แท็บ) {
  await แท็บ.addScriptTag({ path: ที่อยู่axe })
  return แท็บ.evaluate(
    ({ tags, rules }) =>
      window.axe
        .run(document, { runOnly: { type: 'tag', values: tags }, rules })
        .then((ผล) => ผล.violations.map((v) => `${v.id} ${v.nodes.length} จุด (${v.nodes[0]?.target?.join(' ')})`)),
    { tags: ป้ายaxe, rules: กฎaxeเพิ่ม },
  )
}
const เป้า = 44

// ---------------------------------------------------------------------------
// ⭐ คำเดิมของรุ่น 2 ⇒ จดซ้ำโดยเจตนา ⇒ ต้นทาง `krisada/phrakham.life2` ไฟล์ `reflections/index.qmd`
// ---------------------------------------------------------------------------
const คำ = {
  ชื่อหน้า: 'เล่าประสบการณ์',
  หัวทั้งหมด: (n) => `บทความทั้งหมด (${n})`,
  กลุ่ม: 'เลือกมุมมอง',
  แผนที่: 'แผนที่',
  รายการ: 'รายการ',
  ช่องบท: (เล่ม, บท, n) => `${เล่ม} บทที่ ${บท} — ${n} บทความ`,
  ป้ายเล่ม: (n, ต้น, ท้าย) => `${n} เรื่อง · บท ${ต้น}${ท้าย !== ต้น ? '–' + ท้าย : ''}`,
  หัวแผง: (เล่ม, บท, n) => `${เล่ม} บทที่ ${บท} ${n} เรื่อง`,
  หัวเล่มรายการ: (เล่ม, n) => `${เล่ม} ${n} บทความ`,
  ไม่มีหน้า: 'ไม่มีหน้านี้',
}

// ---------------------------------------------------------------------------
// ⭐ ของที่ถูกต้องอ่านจากที่เก็บเอง
// ---------------------------------------------------------------------------
const ราก = fileURLToPath(new URL('..', import.meta.url))
const แถวทะเบียน = readFileSync(`${ราก}เรื่องเล่า/ทะเบียน.tsv`, 'utf8')
  .replace(/\r\n/g, '\n')
  .split('\n')
  .filter((x) => x && !x.startsWith('#'))
const หัวทะเบียน = แถวทะเบียน[0].split('\t')
const หัวเรื่องนำ = '## เรื่องเล่า (สำหรับแสดงและอ่านออกเสียง)'
const เรื่องทั้งหมด = แถวทะเบียน.slice(1).map((บรรทัด) => {
  const ร = Object.fromEntries(บรรทัด.split('\t').map((ค่า, i) => [หัวทะเบียน[i], ค่า]))
  const [, เล่ม, c1, v1, c2, v2] = /^([0-9A-Z]{3})\.(\d+)\.(\d+)-(\d+)\.(\d+)$/.exec(ร['รหัส']).map((x, i) => (i > 1 ? Number(x) : x))
  const เนื้อ = readFileSync(`${ราก}เรื่องเล่า/${ร['ไฟล์']}`, 'utf8').replace(/\r\n/g, '\n')
  const [หัวไฟล์, หลังหัว] = เนื้อ.split(หัวเรื่องนำ)
  const [ส่วน, ...ส่วนอื่น] = หลังหัว.split(/^## /m)
  const ลำดับเชิงอรรถ = [...new Set([...ส่วน.matchAll(/\[\^([^\]\s]+)\]/g)].map((m) => m[1]))]
  return {
    รหัส: ร['รหัส'],
    เล่ม,
    c1,
    v1,
    c2,
    v2,
    ชื่อ: /^ชื่อ:[ \t]*(.+?)[ \t]*$/m.exec(หัวไฟล์)[1],
    อนุมัติเมื่อ: ร['อนุมัติเมื่อ'],
    // ⭐ บนจอ `[^ป้าย]` เป็นเลขยกตามลำดับที่ถูกอ้างครั้งแรก (ใบ #168) ⇒ ตัวหนังสือที่ควรเห็นแทนด้วยเลขนั้น
    ตัวเรื่อง: ส่วน.replace(/\[\^([^\]\s]+)\]/g, (_, ป้าย) => String(ลำดับเชิงอรรถ.indexOf(ป้าย) + 1)).replace(/\s+/g, ' ').trim(),
    // ⭐ หัวข้ออื่นของไฟล์ (รายการตรวจ · ที่เปลี่ยน · ผลตรวจ) ⇒ ⛔ ขึ้นหน้า ⇒ หัวข้อเชิงอรรถเป็นของที่ขึ้นได้
    หัวข้อห้ามขึ้น: ส่วนอื่น.map((x) => x.split('\n')[0].trim()).filter((x) => !/^เชิงอรรถ/.test(x)),
    มีเสียง: existsSync(`${ราก}เสียง/เรื่องเล่า/${ร['รหัส']}.puck.json`),
  }
})
const ช่วงของ = (ร) => (ร.c1 === ร.c2 ? `${ร.c1}:${ร.v1}${ร.v1 !== ร.v2 ? '–' + ร.v2 : ''}` : `${ร.c1}:${ร.v1}–${ร.c2}:${ร.v2}`)
const ทางของ = (ร) => `${ทางฐาน}/reflections/${ร.เล่ม.toLowerCase()}-${ร.c1}-${ร.v1}-${ร.c1 === ร.c2 ? '' : `to-${ร.c2}-`}${ร.v2}`
const ที่อยู่อ่านของ = (ร) => `${ทางฐาน}/read/${ร.เล่ม}?c=${ร.c1}&v=${ร.v1}&r=${ร.c1}.${ร.v1}-${ร.c2}.${ร.v2}`
const เรียง = (ก, ข) => ก.c1 - ข.c1 || ก.v1 - ข.v1
const เรื่องหลัก = เรื่องทั้งหมด.find((x) => x.รหัส === 'MRK.10.1-10.12') || เรื่องทั้งหมด[0]
/** ⭐ เรื่องปลอมที่คร่อมบท ⇒ อยู่ในด่านนี้เท่านั้น ⇒ ⛔ ขึ้นเว็บจริง ⇒ ใช้กับข้อ ③ ท่อนคร่อมบท */
const เรื่องคร่อม = { รหัส: 'MRK.2.23-3.6', เล่ม: 'MRK', c1: 2, v1: 23, c2: 3, v2: 6, ชื่อ: 'เรื่องทดสอบคร่อมบทของด่าน', อนุมัติเมื่อ: '2000-01-01' }

const ที่ตก = []
const เบราว์เซอร์ = await chromium.launch()

// บัญชีเล่ม ⇒ ลำดับพระธรรมกับจำนวนบท ⇒ จากเว็บที่สร้างเสร็จ
const บัญชี = await (async () => {
  const ctx = await เบราว์เซอร์.newContext()
  const ตอบ = await ctx.request.get(`${ฐาน}/api/books.json`)
  const ผล = (await ตอบ.json()).เล่ม
  await ctx.close()
  return ผล
})()
const เล่มที่มีเรื่อง = (เรื่อง) =>
  บัญชี
    .map((b) => ({ ...b, เรื่อง: เรื่อง.filter((ร) => ร.เล่ม === b.รหัส).sort(เรียง) }))
    .filter((b) => b.เรื่อง.length)
for (const ร of เรื่องทั้งหมด) if (!บัญชี.some((b) => b.รหัส === ร.เล่ม)) ที่ตก.push(`② เรื่อง ${ร.รหัส} ⇒ ⛔ มีเล่มนี้ในบัญชี /api/books.json`)

// ---------------------------------------------------------------------------
// ตัวช่วย
// ---------------------------------------------------------------------------
/** เปิดบริบทใหม่ ⇒ `พัง` = ของพังที่ยัด (โหมดพิสูจน์) ⇒ { css, ก่อนโหลด, เส้นทาง } */
async function เปิด(กว้าง, พัง = {}) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: 820 } })
  const ที่ขอ = []
  ctx.on('request', (r) => ที่ขอ.push(r.url()))
  if (พัง.ก่อนโหลด) await ctx.addInitScript(พัง.ก่อนโหลด)
  if (พัง.css)
    await ctx.addInitScript((กฎ) => {
      const ใส่ = () => {
        const st = document.createElement('style')
        st.textContent = กฎ
        document.head.appendChild(st)
      }
      if (document.head) ใส่()
      else document.addEventListener('DOMContentLoaded', ใส่)
    }, พัง.css)
  if (พัง.เส้นทาง) await พัง.เส้นทาง(ctx)
  const แท็บ = await ctx.newPage()
  return { ctx, แท็บ, ที่ขอ }
}
/** รอให้โค้ดของหน้าติด ⇒ สัญญาณกลางของด่านทุกตัว (`รอโค้ดของเว็บติด` ⇒ เหตุผลอยู่ที่ `tools/หน้าที่ตรวจ.mjs`) ⇒ ⛔ กดของที่ Vue ยังไม่รับ */
const รอติด = (แท็บ) => รอโค้ดของเว็บติด(แท็บ)
const ไปหน้ารวม = async (แท็บ) => {
  await แท็บ.goto(`${ฐาน}/reflections`, { waitUntil: 'domcontentloaded' })
  await แท็บ.waitForSelector('article[data-หน้า="เล่าประสบการณ์"] h1', { timeout: 15000 })
  await รอติด(แท็บ)
}
const ปุ่มมุม = (แท็บ, ชื่อ) => แท็บ.getByRole('group', { name: คำ.กลุ่ม, exact: true }).getByRole('button', { name: ชื่อ, exact: true })

/** อ่านมุมมองรายการ ⇒ [{เล่ม หัว แถว:[{ช่วง ชื่อ ทาง}]}] */
const อ่านรายการ = (แท็บ) =>
  แท็บ.evaluate(() =>
    [...document.querySelectorAll('[data-มุม="รายการ"] section')].map((s) => ({
      เล่ม: s.getAttribute('data-เล่ม'),
      หัว: (s.querySelector('h3')?.textContent || '').replace(/\s+/g, ' ').trim(),
      แถว: [...s.querySelectorAll('li a')].map((a) => ({
        ช่วง: (a.querySelector('.pk-ช่วงบทความ')?.textContent || '').trim(),
        ชื่อ: (a.querySelector('.pk-ชื่อบทความ')?.textContent || '').trim(),
        ทาง: new URL(a.getAttribute('href'), location.href).pathname.replace(/\/+$/, ''),
      })),
    })),
  )
const อ่านแผง = (แท็บ) =>
  แท็บ.evaluate(() => {
    const ผ = document.querySelector('[data-มุม="แผนที่"] [data-แผงบท]')
    if (!ผ || !ผ.getClientRects().length) return null
    return {
      หัว: (ผ.querySelector('h3')?.textContent || '').replace(/\s+/g, ' ').trim(),
      แถว: [...ผ.querySelectorAll('li a')].map((a) => ({
        ช่วง: (a.querySelector('.pk-ช่วงบทความ')?.textContent || '').trim(),
        ชื่อ: (a.querySelector('.pk-ชื่อบทความ')?.textContent || '').trim(),
        ทาง: new URL(a.getAttribute('href'), location.href).pathname.replace(/\/+$/, ''),
      })),
    }
  })
const แถวที่ควร = (เรื่อง) => เรื่อง.map((ร) => ({ ช่วง: ช่วงของ(ร), ชื่อ: ร.ชื่อ, ทาง: ทางของ(ร) }))
const เทียบแถว = (ได้, ต้อง) => {
  const ผิด = []
  for (let i = 0; i < Math.max(ได้.length, ต้อง.length); i++) {
    const ก = ได้[i] ? `${ได้[i].ช่วง} ${ได้[i].ชื่อ} → ${ได้[i].ทาง}` : '(ไม่มี)'
    const ข = ต้อง[i] ? `${ต้อง[i].ช่วง} ${ต้อง[i].ชื่อ} → ${ต้อง[i].ทาง}` : '(ไม่มี)'
    if (ก !== ข) ผิด.push(`แถว ${i + 1} ได้ “${ก}” ⛔ ต้อง “${ข}”`)
  }
  return ผิด
}

// ---------------------------------------------------------------------------
// ① ปุ่มสลับ
// ---------------------------------------------------------------------------
async function ตรวจ1(พัง) {
  const ตก = []
  for (const กว้าง of จอทั้งหมด) {
    const { ctx, แท็บ } = await เปิด(กว้าง, พัง)
    const ป้าย = `① หน้ารวม @${กว้าง}`
    try {
      await ไปหน้ารวม(แท็บ)
      const h1 = (await แท็บ.locator('h1').first().textContent()).trim()
      if (h1 !== คำ.ชื่อหน้า) ตก.push(`${ป้าย} ⇒ หัวหน้า “${h1}” ⛔ ต้อง “${คำ.ชื่อหน้า}”`)
      if ((await แท็บ.title()) !== คำ.ชื่อหน้า) ตก.push(`${ป้าย} ⇒ ชื่อแท็บ “${await แท็บ.title()}” ⛔ ต้อง “${คำ.ชื่อหน้า}”`)
      const h2 = ((await แท็บ.locator('#pk-หัวบทความทั้งหมด').textContent().catch(() => '')) || '').trim()
      if (h2 !== คำ.หัวทั้งหมด(เรื่องทั้งหมด.length)) ตก.push(`${ป้าย} ⇒ หัว “${h2}” ⛔ ต้อง “${คำ.หัวทั้งหมด(เรื่องทั้งหมด.length)}”`)
      const แผนที่ = ปุ่มมุม(แท็บ, คำ.แผนที่)
      const รายการ = ปุ่มมุม(แท็บ, คำ.รายการ)
      if ((await แผนที่.count()) !== 1 || (await รายการ.count()) !== 1) {
        ตก.push(`${ป้าย} ⇒ กลุ่ม “${คำ.กลุ่ม}” ⛔ มีปุ่ม “${คำ.แผนที่}” กับ “${คำ.รายการ}” อย่างละปุ่ม`)
        continue
      }
      const สถานะ = async () => ({
        แผนที่: await แผนที่.getAttribute('aria-pressed'),
        รายการ: await รายการ.getAttribute('aria-pressed'),
        เห็นแผนที่: await แท็บ.locator('[data-มุม="แผนที่"]').isVisible(),
        เห็นรายการ: await แท็บ.locator('[data-มุม="รายการ"]').isVisible(),
      })
      const ตัดสิน = (ส, ต้อง, ตอน) => {
        const ใช่แผนที่ = ต้อง === 'แผนที่'
        if (ส.แผนที่ !== String(ใช่แผนที่) || ส.รายการ !== String(!ใช่แผนที่))
          ตก.push(`${ป้าย} ${ตอน} ⇒ aria-pressed แผนที่=${ส.แผนที่} รายการ=${ส.รายการ} ⛔ ต้องบอกว่าเลือก “${ต้อง}” อยู่`)
        if (ส.เห็นแผนที่ !== ใช่แผนที่ || ส.เห็นรายการ !== !ใช่แผนที่)
          ตก.push(`${ป้าย} ${ตอน} ⇒ เห็นแผนที่=${ส.เห็นแผนที่} เห็นรายการ=${ส.เห็นรายการ} ⛔ ต้องเห็นแค่ “${ต้อง}”`)
      }
      ตัดสิน(await สถานะ(), 'รายการ', 'ตอนเปิดหน้า')
      await แผนที่.click()
      ตัดสิน(await สถานะ(), 'แผนที่', 'หลังกดแผนที่')
      await แท็บ.reload({ waitUntil: 'domcontentloaded' })
      await รอติด(แท็บ)
      ตัดสิน(await สถานะ(), 'แผนที่', 'โหลดหน้าใหม่หลังเลือกแผนที่')
      await รายการ.click()
      ตัดสิน(await สถานะ(), 'รายการ', 'หลังกดรายการ')
    } catch (e) {
      ตก.push(`${ป้าย} ⇒ ตรวจไม่จบ ⇒ ${String(e.message || e).split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

// ---------------------------------------------------------------------------
// ② รายการ
// ---------------------------------------------------------------------------
async function ตรวจ2(พัง) {
  const ตก = []
  const { ctx, แท็บ } = await เปิด(1280, พัง)
  try {
    await ไปหน้ารวม(แท็บ)
    const ได้ = await อ่านรายการ(แท็บ)
    const ต้อง = เล่มที่มีเรื่อง(เรื่องทั้งหมด)
    if (ได้.map((x) => x.เล่ม).join() !== ต้อง.map((x) => x.รหัส).join())
      ตก.push(`② กลุ่มเล่ม “${ได้.map((x) => x.เล่ม).join(' · ')}” ⛔ ต้อง “${ต้อง.map((x) => x.รหัส).join(' · ')}” (ลำดับพระธรรม · เฉพาะเล่มที่มีเรื่องในทะเบียน)`)
    for (const b of ต้อง) {
      const ก = ได้.find((x) => x.เล่ม === b.รหัส)
      if (!ก) continue
      if (ก.หัว !== คำ.หัวเล่มรายการ(b.ชื่อไทย, b.เรื่อง.length)) ตก.push(`② หัวกลุ่ม “${ก.หัว}” ⛔ ต้อง “${คำ.หัวเล่มรายการ(b.ชื่อไทย, b.เรื่อง.length)}”`)
      const ผิด = เทียบแถว(ก.แถว, แถวที่ควร(b.เรื่อง))
      if (ผิด.length) ตก.push(`② ${b.ชื่อไทย} ⇒ ${ผิด.slice(0, 3).join(' · ')}`)
    }
    const นับ = ได้.reduce((n, x) => n + x.แถว.length, 0)
    if (นับ !== เรื่องทั้งหมด.length) ตก.push(`② รายการมี ${นับ} แถว ⛔ ต้องเท่าทะเบียน ${เรื่องทั้งหมด.length} แถว`)
  } catch (e) {
    ตก.push(`② ตรวจไม่จบ ⇒ ${String(e.message || e).split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ตก
}

// ---------------------------------------------------------------------------
// ③ แผนที่
// ---------------------------------------------------------------------------
/** ความสว่างของสี rgb() ⇒ เทียบว่าช่องไหนเข้มกว่า */
const สว่าง = (สี) => {
  const [r, g, b] = (สี.match(/[\d.]+/g) || [0, 0, 0]).slice(0, 3).map((x) => Number(x) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
/** ตรวจแผนที่ของชุดเรื่องหนึ่ง ⇒ ใช้ทั้งของจริงและท่อนคร่อมบท */
async function ตรวจแผนที่(แท็บ, เรื่อง, ป้าย) {
  const ตก = []
  await ปุ่มมุม(แท็บ, คำ.แผนที่).click()
  for (const b of เล่มที่มีเรื่อง(เรื่อง)) {
    const ช่อง = await แท็บ.evaluate((เล่ม) => {
      const s = document.querySelector(`[data-มุม="แผนที่"] section[data-เล่ม="${เล่ม}"]`)
      if (!s) return null
      return {
        ป้าย: (s.querySelector('.pk-ป้ายเล่มบนแผนที่')?.textContent || '').trim(),
        ชื่อ: (s.querySelector('.pk-ชื่อเล่มบนแผนที่')?.textContent || '').trim(),
        ช่อง: [...s.querySelectorAll('[data-บท]')].map((x) => ({
          บท: Number(x.getAttribute('data-บท')),
          แท็ก: x.tagName,
          ชื่อ: x.getAttribute('aria-label'),
          ซ่อน: x.getAttribute('aria-hidden'),
          โฟกัสได้: x.tabIndex >= 0 && !x.disabled,
          พื้น: getComputedStyle(x).backgroundColor,
        })),
      }
    }, b.รหัส)
    if (!ช่อง) {
      ตก.push(`③ ${ป้าย} ⇒ แผนที่ ⛔ มีแถวของ ${b.ชื่อไทย}`)
      continue
    }
    if (ช่อง.ชื่อ !== b.ชื่อไทย) ตก.push(`③ ${ป้าย} ⇒ ชื่อเล่มบนแผนที่ “${ช่อง.ชื่อ}” ⛔ ต้อง “${b.ชื่อไทย}”`)
    const ของบท = (c) => b.เรื่อง.filter((ร) => ร.c1 <= c && ร.c2 >= c)
    const มี = Array.from({ length: b.บท }, (_, i) => i + 1).filter((c) => ของบท(c).length)
    const ป้ายต้อง = คำ.ป้ายเล่ม(b.เรื่อง.length, Math.min(...มี), Math.max(...มี))
    if (ช่อง.ป้าย !== ป้ายต้อง) ตก.push(`③ ${ป้าย} ⇒ ป้าย ${b.ชื่อไทย} “${ช่อง.ป้าย}” ⛔ ต้อง “${ป้ายต้อง}”`)
    if (ช่อง.ช่อง.map((x) => x.บท).join() !== Array.from({ length: b.บท }, (_, i) => i + 1).join())
      ตก.push(`③ ${ป้าย} ⇒ ${b.ชื่อไทย} มี ${ช่อง.ช่อง.length} ช่อง ⛔ ต้องเท่าจำนวนบท ${b.บท} เรียง 1 ถึง ${b.บท}`)
    const พื้นมี = []
    const พื้นไม่มี = []
    for (const x of ช่อง.ช่อง) {
      const n = ของบท(x.บท).length
      if (n) {
        พื้นมี.push(สว่าง(x.พื้น))
        if (x.แท็ก !== 'BUTTON' || !x.โฟกัสได้) ตก.push(`③ ${ป้าย} ⇒ ${b.ชื่อไทย} บท ${x.บท} มีบทความ ⛔ ต้องเป็นปุ่มที่กดได้ (ได้ ${x.แท็ก})`)
        if (x.ชื่อ !== คำ.ช่องบท(b.ชื่อไทย, x.บท, n)) ตก.push(`③ ${ป้าย} ⇒ ชื่อช่อง “${x.ชื่อ}” ⛔ ต้อง “${คำ.ช่องบท(b.ชื่อไทย, x.บท, n)}”`)
      } else {
        พื้นไม่มี.push(สว่าง(x.พื้น))
        if (x.แท็ก === 'BUTTON' || x.โฟกัสได้) ตก.push(`③ ${ป้าย} ⇒ ${b.ชื่อไทย} บท ${x.บท} ⛔ มีบทความ แต่เป็นปุ่มหรือโฟกัสได้ ⇒ ต้องเป็นช่องจางที่กดไม่ได้`)
        if (x.ซ่อน !== 'true') ตก.push(`③ ${ป้าย} ⇒ ${b.ชื่อไทย} บท ${x.บท} ที่ยังไม่มี ⛔ ซ่อนจากโปรแกรมอ่านหน้าจอ (รุ่น 2 ซ่อน)`)
      }
    }
    if (พื้นมี.length && พื้นไม่มี.length && !(Math.max(...พื้นมี) < Math.min(...พื้นไม่มี)))
      ตก.push(`③ ${ป้าย} ⇒ ช่องที่มีบทความ ⛔ เข้มกว่าช่องที่ไม่มี (ความสว่าง ${Math.max(...พื้นมี).toFixed(3)} กับ ${Math.min(...พื้นไม่มี).toFixed(3)})`)
    // กดทุกช่องที่มี ⇒ ช่องนั้นตัวเดียวที่ถูกเลือก ⇒ แผงตรงทะเบียน
    for (const c of มี) {
      await แท็บ.locator(`[data-มุม="แผนที่"] section[data-เล่ม="${b.รหัส}"] button[data-บท="${c}"]`).click({ timeout: 3000 }).catch(() => {})
      const เลือก = await แท็บ.evaluate(() =>
        [...document.querySelectorAll('[data-มุม="แผนที่"] button[aria-pressed="true"]')].map((x) => `${x.closest('section').getAttribute('data-เล่ม')}/${x.getAttribute('data-บท')}`),
      )
      if (เลือก.join() !== `${b.รหัส}/${c}`) ตก.push(`③ ${ป้าย} ⇒ กดบท ${c} แล้วช่องที่ aria-pressed คือ “${เลือก.join(' · ') || '(ไม่มี)'}” ⛔ ต้อง ${b.รหัส}/${c} ช่องเดียว`)
      const แผง = await อ่านแผง(แท็บ)
      const เรื่องบท = ของบท(c)
      if (!แผง) {
        ตก.push(`③ ${ป้าย} ⇒ กด ${b.ชื่อไทย} บท ${c} แล้ว ⛔ เห็นแผงของบทนั้น`)
        continue
      }
      if (แผง.หัว !== คำ.หัวแผง(b.ชื่อไทย, c, เรื่องบท.length)) ตก.push(`③ ${ป้าย} ⇒ หัวแผง “${แผง.หัว}” ⛔ ต้อง “${คำ.หัวแผง(b.ชื่อไทย, c, เรื่องบท.length)}”`)
      const ผิด = เทียบแถว(แผง.แถว, แถวที่ควร(เรื่องบท))
      if (ผิด.length) ตก.push(`③ ${ป้าย} ⇒ แผง ${b.ชื่อไทย} บท ${c} ⇒ ${ผิด.slice(0, 2).join(' · ')}`)
    }
  }
  return ตก
}
async function ตรวจ3(พัง) {
  const ตก = []
  for (const กว้าง of จอทั้งหมด) {
    const { ctx, แท็บ } = await เปิด(กว้าง, พัง)
    try {
      await ไปหน้ารวม(แท็บ)
      ตก.push(...(await ตรวจแผนที่(แท็บ, เรื่องทั้งหมด, `@${กว้าง}`)))
    } catch (e) {
      ตก.push(`③ @${กว้าง} ⇒ ตรวจไม่จบ ⇒ ${String(e.message || e).split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  return ตก
}
/** ③ ท่อนคร่อมบท ⇒ หน้ารวมแบบโครงเปล่า (404.html) + รายชื่อที่มีเรื่องปลอมคร่อมบท 2–3 */
async function ตรวจ3คร่อม(พัง) {
  const ตก = []
  const เรื่อง = [...เรื่องทั้งหมด, เรื่องคร่อม]
  const { ctx, แท็บ } = await เปิด(1280, {
    ...พัง,
    เส้นทาง: async (c) => {
      const โครง = await (await c.request.get(`${ฐาน}/404.html`)).text()
      await c.route(/\/reflections\/?(\?.*)?$/, (r) => (r.request().resourceType() === 'document' ? r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: โครง }) : r.continue()))
      await c.route(/\/reflections\/_payload\.json/, (r) => r.fulfill({ status: 404, body: '' }))
      await c.route(/\/api\/stories\.json/, async (r) => {
        const ตอบ = await r.fetch()
        const ข้อมูล = await ตอบ.json()
        const เล่ม = ข้อมูล.เล่ม.find((x) => x.รหัส === 'MRK')
        เล่ม.เรื่อง.push({ รหัส: เรื่องคร่อม.รหัส, จาก: { บท: 2, ข้อ: 23 }, ถึง: { บท: 3, ข้อ: 6 }, ชื่อ: เรื่องคร่อม.ชื่อ, อนุมัติเมื่อ: เรื่องคร่อม.อนุมัติเมื่อ })
        เล่ม.เรื่อง.sort((ก, ข) => ก.จาก.บท - ข.จาก.บท || ก.จาก.ข้อ - ข.จาก.ข้อ)
        await r.fulfill({ response: ตอบ, json: ข้อมูล })
      })
      if (พัง.เส้นทาง) await พัง.เส้นทาง(c)
    },
  })
  try {
    const ขอรายชื่อ = แท็บ.waitForRequest(/\/api\/stories\.json/, { timeout: 15000 })
    await ไปหน้ารวม(แท็บ)
    await ขอรายชื่อ.catch(() => ตก.push('③ คร่อมบท ⇒ หน้ารวมแบบโครงเปล่า ⛔ ขอ /api/stories.json ⇒ ด่านยัดเรื่องคร่อมบทไม่ได้'))
    await แท็บ.waitForFunction(() => document.querySelectorAll('[data-มุม="รายการ"] li').length > 0, null, { timeout: 10000 }).catch(() => {})
    const รายการ = await อ่านรายการ(แท็บ)
    const นับคร่อม = รายการ.flatMap((x) => x.แถว).filter((x) => x.ชื่อ === เรื่องคร่อม.ชื่อ).length
    if (นับคร่อม !== 1) ตก.push(`③ คร่อมบท ⇒ รายการมีเรื่องคร่อมบท ${นับคร่อม} แถว ⛔ ต้องครั้งเดียว`)
    ตก.push(...(await ตรวจแผนที่(แท็บ, เรื่อง, 'คร่อมบท 2:23–3:6')))
  } catch (e) {
    ตก.push(`③ คร่อมบท ⇒ ตรวจไม่จบ ⇒ ${String(e.message || e).split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ตก
}

// ---------------------------------------------------------------------------
// ④ หน้าบทความ
// ---------------------------------------------------------------------------
async function ตรวจ4(พัง, ชุด = เรื่องทั้งหมด) {
  const ตก = []
  for (const ร of ชุด) {
    for (const กว้าง of ร === เรื่องหลัก ? จอทั้งหมด : [1280]) {
      const { ctx, แท็บ, ที่ขอ } = await เปิด(กว้าง, พัง)
      const ป้าย = `④ ${ร.รหัส} @${กว้าง}`
      try {
        const ตอบ = await แท็บ.goto(ฐาน + ทางของ(ร).slice(ทางฐาน.length), { waitUntil: 'domcontentloaded' })
        if (ตอบ?.status() !== 200) ตก.push(`${ป้าย} ⇒ ที่วางเว็บตอบ ${ตอบ?.status()} ⛔ ต้อง 200 (หน้าต้องถูกสร้างไว้ล่วงหน้า)`)
        await แท็บ.waitForSelector('article[data-หน้า="บทความ"] h1', { timeout: 15000 })
        await รอติด(แท็บ)
        const อ่าน = await แท็บ.evaluate(() => ({
          h1: (document.querySelector('article h1')?.textContent || '').trim(),
          // ⭐ ย่อหน้าละ `<p>` ⇒ ต่อด้วยช่องว่างเหมือนบรรทัดว่างในไฟล์ ⇒ ของอื่นที่หลุดเข้ามาในกล่องตัวเรื่องก็ถูกนับด้วย
          ตัวเรื่อง: [...(document.querySelector('[data-ตัวเรื่องเล่า]')?.children || [])].map((x) => x.textContent).join(' ').replace(/\s+/g, ' ').trim(),
          ทั้งหน้า: document.body.innerText,
          อ่าน: document.querySelector('[data-ไป="หน้าอ่าน"]')?.getAttribute('href') || null,
          กลับ: (() => {
            const a = document.querySelector('[data-ไป="เล่าประสบการณ์"]')
            return a ? new URL(a.getAttribute('href'), location.href).pathname.replace(/\/+$/, '') : null
          })(),
        }))
        if (อ่าน.h1 !== ร.ชื่อ) ตก.push(`${ป้าย} ⇒ ชื่อเรื่อง “${อ่าน.h1}” ⛔ ต้อง “${ร.ชื่อ}” (บรรทัด ชื่อ: ของไฟล์)`)
        if ((await แท็บ.title()) !== ร.ชื่อ) ตก.push(`${ป้าย} ⇒ ชื่อแท็บ “${await แท็บ.title()}” ⛔ ต้อง “${ร.ชื่อ}”`)
        if (อ่าน.ตัวเรื่อง !== ร.ตัวเรื่อง) {
          let i = 0
          while (i < อ่าน.ตัวเรื่อง.length && อ่าน.ตัวเรื่อง[i] === ร.ตัวเรื่อง[i]) i++
          ตก.push(`${ป้าย} ⇒ ตัวเรื่องบนหน้า ⛔ ตรงไฟล์ที่อนุมัติ ⇒ ต่างกันที่ตัวที่ ${i} ⇒ หน้า “${อ่าน.ตัวเรื่อง.slice(i, i + 40)}” · ไฟล์ “${ร.ตัวเรื่อง.slice(i, i + 40)}”`)
        }
        for (const ห of ['ประเภท:', 'การอ้างอิง:', ...ร.หัวข้อห้ามขึ้น]) if (อ่าน.ทั้งหน้า.includes(ห)) ตก.push(`${ป้าย} ⇒ หน้ามี “${ห}” ⛔ ส่วนนี้ของไฟล์ห้ามขึ้นเว็บ (รายการตรวจ)`)
        if (อ่าน.อ่าน !== ที่อยู่อ่านของ(ร)) ตก.push(`${ป้าย} ⇒ ลิงก์ไปหน้าอ่าน “${อ่าน.อ่าน}” ⛔ ต้อง “${ที่อยู่อ่านของ(ร)}”`)
        if (อ่าน.กลับ !== `${ทางฐาน}/reflections`) ตก.push(`${ป้าย} ⇒ ลิงก์กลับหน้ารวม “${อ่าน.กลับ}” ⛔ ต้อง “${ทางฐาน}/reflections”`)
        // เสียง ⇒ เฉพาะเรื่องหลัก ⇒ ⛔ ขอก่อนกด · กดแล้วเดินจริง · กดอีกครั้งหยุด
        const ปุ่ม = แท็บ.locator('[data-ปุ่ม="ฟังบทความ"]')
        if (ร.มีเสียง && !(await ปุ่ม.count())) ตก.push(`${ป้าย} ⇒ เรื่องที่มีเสียง ⛔ มีปุ่มฟัง`)
        if (!ร.มีเสียง && (await ปุ่ม.count())) ตก.push(`${ป้าย} ⇒ เรื่องที่ยังไม่มีเสียง ⛔ ห้ามมีปุ่มฟัง (กดแล้วเงียบ)`)
        if (ร === เรื่องหลัก && ร.มีเสียง && (await ปุ่ม.count())) {
          if (ที่ขอ.some((u) => /\/story-audio\//.test(u))) ตก.push(`${ป้าย} ⇒ ขอไฟล์เสียงก่อนผู้อ่านกดฟัง ⛔ คนไม่ฟังต้องจ่าย 0 ไบต์`)
          await ปุ่ม.click()
          const เดิน = await แท็บ
            .waitForFunction(() => [...document.querySelectorAll('audio')].some((a) => /\/story-audio\//.test(a.currentSrc) && !a.paused && a.currentTime > 0.3), null, { timeout: 15000 })
            .then(() => true)
            .catch(() => false)
          if (!ที่ขอ.some((u) => /\/story-audio\//.test(u))) ตก.push(`${ป้าย} ⇒ กดฟังแล้ว ⛔ มีการขอไฟล์เสียงเรื่องเล่า`)
          if (!เดิน) ตก.push(`${ป้าย} ⇒ กดฟังแล้วเสียง ⛔ เดิน`)
          const คำปุ่ม = ((await ปุ่ม.textContent()) || '').replace(/\s+/g, ' ').trim()
          if (เดิน && !คำปุ่ม.endsWith('หยุดพัก')) ตก.push(`${ป้าย} ⇒ ระหว่างเล่นปุ่มเขียน “${คำปุ่ม}” ⛔ ต้องบอก “หยุดพัก”`)
          await ปุ่ม.click()
          const หยุด = await แท็บ
            .waitForFunction(() => [...document.querySelectorAll('audio')].every((a) => a.paused), null, { timeout: 5000 })
            .then(() => true)
            .catch(() => false)
          if (!หยุด) ตก.push(`${ป้าย} ⇒ กดหยุดพักแล้วเสียง ⛔ หยุด`)
          // ⭐ รอให้หน้าวาดคำใหม่ ⇒ Vue เปลี่ยนตัวหนังสือในรอบถัดไป ⛔ ทันทีที่เสียงหยุด
          await แท็บ.waitForFunction(() => (document.querySelector('[data-ปุ่ม="ฟังบทความ"]')?.textContent || '').trim().endsWith('ฟังต่อ'), null, { timeout: 3000 }).catch(() => {})
          const คำหลัง = ((await ปุ่ม.textContent()) || '').replace(/\s+/g, ' ').trim()
          if (หยุด && !คำหลัง.endsWith('ฟังต่อ')) ตก.push(`${ป้าย} ⇒ หยุดแล้วปุ่มเขียน “${คำหลัง}” ⛔ ต้องบอก “ฟังต่อ”`)
        }
      } catch (e) {
        ตก.push(`${ป้าย} ⇒ ตรวจไม่จบ ⇒ ${String(e.message || e).split('\n')[0]}`)
      } finally {
        await ctx.close()
      }
    }
  }
  return ตก
}

// ---------------------------------------------------------------------------
// ⑤ เมนู
// ---------------------------------------------------------------------------
async function ตรวจ5(พัง) {
  const ตก = []
  for (const กว้าง of จอทั้งหมด) {
    const { ctx, แท็บ } = await เปิด(กว้าง, พัง)
    const ป้าย = `⑤ @${กว้าง}`
    try {
      await แท็บ.goto(`${ฐาน}/`, { waitUntil: 'domcontentloaded' })
      await รอติด(แท็บ)
      const ปุ่ม = แท็บ.locator('[data-ปุ่ม="เมนูเว็บเดิม"]:visible').first()
      await ปุ่ม.click()
      const ลิงก์ = แท็บ.locator('[id^="pk-แผงเมนูเว็บเดิม"] a', { hasText: /^\s*เล่าประสบการณ์\s*$/ })
      await ลิงก์.first().waitFor({ timeout: 5000 })
      const href = await ลิงก์.first().getAttribute('href')
      const ทาง = new URL(href, แท็บ.url()).toString()
      if (!ทาง.startsWith(ฐาน + '/reflections') || new URL(ทาง).pathname.replace(/\/+$/, '') !== `${ทางฐาน}/reflections`)
        ตก.push(`${ป้าย} ⇒ เมนู “เล่าประสบการณ์” ไป “${href}” ⛔ ต้องไปหน้ารวมของเว็บนี้ ${ทางฐาน}/reflections`)
      else {
        await ลิงก์.first().click()
        await แท็บ.waitForSelector('article[data-หน้า="เล่าประสบการณ์"] h1', { timeout: 15000 })
        await รอติด(แท็บ)
        await แท็บ.locator('[data-ปุ่ม="เมนูเว็บเดิม"]:visible').first().click()
        const ตรงนี้ = await แท็บ.evaluate(() =>
          [...document.querySelectorAll('[id^="pk-แผงเมนูเว็บเดิม"] [aria-current="page"], [id^="pk-แผงเมนูเว็บเดิม"] a')]
            .filter((x) => (x.textContent || '').trim() === 'เล่าประสบการณ์')
            .map((x) => `${x.tagName}:${x.getAttribute('aria-current')}`),
        )
        if (ตรงนี้.join() !== 'SPAN:page') ตก.push(`${ป้าย} ⇒ บนหน้ารวมเอง รายการ “เล่าประสบการณ์” ในเมนู = ${ตรงนี้.join(' · ') || '(ไม่มี)'} ⛔ ต้องเป็นตัวหนังสือติด aria-current ⛔ ลิงก์วนกลับ`)
      }
    } catch (e) {
      ตก.push(`${ป้าย} ⇒ ตรวจไม่จบ ⇒ ${String(e.message || e).split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

// ---------------------------------------------------------------------------
// ⑥ ที่อยู่ที่ไม่มี ⇒ 404
// ---------------------------------------------------------------------------
const ทางที่ไม่มี = [
  // เรื่องที่ไม่อยู่ในทะเบียน (ทรงถูก)
  '/reflections/mrk-16-1-8',
  // ทางทรงอื่นของเรื่องที่มีอยู่ ⇒ หนึ่งเรื่องหนึ่งที่อยู่
  `/reflections/${เรื่องหลัก.เล่ม.toLowerCase()}-${เรื่องหลัก.c1}-${เรื่องหลัก.v1}-to-${เรื่องหลัก.c2}-${เรื่องหลัก.v2}`,
  // ทางที่อ่านไม่ออก
  '/reflections/ไม่มีเรื่องนี้',
]
async function ตรวจ6(พัง) {
  const ตก = []
  for (const ทาง of ทางที่ไม่มี) {
    const { ctx, แท็บ } = await เปิด(375, พัง)
    const ป้าย = `⑥ ${ทาง}`
    try {
      const ตอบ = await แท็บ.goto(ฐาน + encodeURI(ทาง), { waitUntil: 'domcontentloaded' })
      if (ตอบ?.status() !== 404) ตก.push(`${ป้าย} ⇒ ที่วางเว็บตอบ ${ตอบ?.status()} ⛔ ต้อง 404`)
      const ขึ้น = await แท็บ
        .waitForFunction((ข้อความ) => document.title.includes('404') && (document.body.textContent || '').includes(ข้อความ), คำ.ไม่มีหน้า, { timeout: 15000 })
        .then(() => true)
        .catch(() => false)
      if (!ขึ้น) ตก.push(`${ป้าย} ⇒ ⛔ เห็นหน้าไม่พบหน้านี้ (ชื่อแท็บ “${await แท็บ.title()}”) ⇒ หน้าว่าง หน้าค้าง หรือหน้าพัง`)
      if (await แท็บ.locator('[data-ตัวเรื่องเล่า], article[data-หน้า="บทความ"]').count()) ตก.push(`${ป้าย} ⇒ หน้ามีตัวเรื่องเล่า ⛔ ที่อยู่นี้ไม่มีในทะเบียน`)
    } catch (e) {
      ตก.push(`${ป้าย} ⇒ ตรวจไม่จบ ⇒ ${String(e.message || e).split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

// ---------------------------------------------------------------------------
// ⑦ จอ 375 · 1280 กับแป้นพิมพ์
// ---------------------------------------------------------------------------
const วัดจอ = (แท็บ, ตัวเลือก) =>
  แท็บ.evaluate((ตัวเลือก) => {
    const de = document.documentElement
    // ⭐ วัดทั้งหน้าและของแต่ละชิ้น ⇒ กล่องที่เลื่อนในตัวเอง (`pk-ม้วน`) ล้นได้โดยที่หน้า ⛔ ล้น ⇒ ผู้อ่านก็ยังต้องปัดซ้ายขวาอยู่ดี
    const ล้นชิ้น = [...document.querySelectorAll(ตัวเลือก)]
      .filter((x) => x.getClientRects().length)
      .map((x) => ({ x, r: x.getBoundingClientRect() }))
      .filter(({ r }) => r.right > de.clientWidth + 0.5 || r.left < -0.5)
    return {
      ล้น: Math.max(Math.round((de.scrollWidth - de.clientWidth) * 100) / 100, ...ล้นชิ้น.map(({ r }) => Math.round(Math.max(r.right - de.clientWidth, -r.left) * 100) / 100)),
      เล็ก: [...document.querySelectorAll(ตัวเลือก)]
        .filter((x) => x.getClientRects().length)
        .map((x) => ({ x, r: x.getBoundingClientRect() }))
        .filter(({ r }) => r.width < 43.5 || r.height < 43.5)
        .map(({ x, r }) => `${(x.textContent || x.getAttribute('aria-label') || '').trim().slice(0, 30)} ${r.width.toFixed(1)}×${r.height.toFixed(1)}`),
    }
  }, ตัวเลือก)
// ⭐ ช่องบททุกช่อง (รวมช่องจาง) ⇒ ช่องจางกดไม่ได้แต่ต้องเห็นครบ 44 จุดเหมือนช่องอื่น ⇒ แผนที่อ่านเป็นตารางได้
const กดได้ = '.pk-ปุ่มมุมมอง, .pk-ช่องบท, .pk-รายการบทความ a, .pk-กลับหน้ารวม a, .pk-ไปหน้าอ่าน a, [data-ปุ่ม="ฟังบทความ"]'
async function ตรวจ7(พัง) {
  const ตก = []
  for (const กว้าง of จอทั้งหมด) {
    const { ctx, แท็บ } = await เปิด(กว้าง, พัง)
    const ป้าย = `⑦ @${กว้าง}`
    try {
      await ไปหน้ารวม(แท็บ)
      for (const มุม of [คำ.รายการ, คำ.แผนที่]) {
        await ปุ่มมุม(แท็บ, มุม).click()
        const ว = await วัดจอ(แท็บ, กดได้)
        if (ว.ล้น > 0) ตก.push(`${ป้าย} หน้ารวม (${มุม}) ⇒ หน้าเลื่อนซ้ายขวา หรือของกดได้พ้นขอบจอ ${ว.ล้น} จุด`)
        if (ว.เล็ก.length) ตก.push(`${ป้าย} หน้ารวม (${มุม}) ⇒ ของกดได้เล็กกว่า ${เป้า} จุด ⇒ ${ว.เล็ก.slice(0, 3).join(' · ')}`)
        const ผิดaxe = await ยิงaxe(แท็บ)
        if (ผิดaxe.length) ตก.push(`${ป้าย} หน้ารวม (${มุม}) ⇒ axe ระดับ AA ⇒ ${ผิดaxe.slice(0, 3).join(' · ')}`)
      }
      // แป้นพิมพ์ล้วน ⇒ เริ่มใหม่ที่มุมมองรายการ
      await ปุ่มมุม(แท็บ, คำ.รายการ).click()
      await แท็บ.evaluate(() => {
        document.activeElement?.blur()
        window.scrollTo(0, 0)
      })
      let ถึง = false
      for (let i = 0; i < 40 && !ถึง; i++) {
        await แท็บ.keyboard.press('Tab')
        ถึง = await แท็บ.evaluate(() => document.activeElement?.getAttribute('data-มุมมอง') === 'แผนที่')
      }
      if (!ถึง) {
        ตก.push(`${ป้าย} ⇒ กด Tab 40 ครั้ง ⛔ ถึงปุ่ม “แผนที่”`)
        continue
      }
      const วง = await แท็บ.evaluate(() => {
        const cs = getComputedStyle(document.activeElement)
        return { แบบ: cs.outlineStyle, หนา: parseFloat(cs.outlineWidth) || 0 }
      })
      if (วง.แบบ === 'none' || วง.หนา < 2) ตก.push(`${ป้าย} ⇒ ปุ่ม “แผนที่” ตอนโฟกัส ⛔ เห็นวงโฟกัส (outline ${วง.แบบ} ${วง.หนา}) ⇒ SC 2.4.7`)
      await แท็บ.keyboard.press('Enter')
      if ((await ปุ่มมุม(แท็บ, คำ.แผนที่).getAttribute('aria-pressed')) !== 'true') ตก.push(`${ป้าย} ⇒ กด Enter ที่ปุ่ม “แผนที่” ⛔ สลับเป็นแผนที่`)
      let ช่อง = null
      for (let i = 0; i < 6 && !ช่อง; i++) {
        await แท็บ.keyboard.press('Tab')
        ช่อง = await แท็บ.evaluate(() => (document.activeElement?.classList.contains('pk-มีบทความ') ? document.activeElement.getAttribute('data-บท') : null))
      }
      if (!ช่อง) {
        ตก.push(`${ป้าย} ⇒ จากปุ่ม “แผนที่” กด Tab ⛔ ถึงช่องบทที่มีบทความ`)
        continue
      }
      await แท็บ.keyboard.press('Space')
      const เลือก = await แท็บ.evaluate(() => document.activeElement?.getAttribute('aria-pressed'))
      if (เลือก !== 'true') ตก.push(`${ป้าย} ⇒ กดเว้นวรรคที่ช่องบท ${ช่อง} ⛔ เลือกบทนั้น`)
      let ลิงก์ = null
      for (let i = 0; i < 40 && !ลิงก์; i++) {
        await แท็บ.keyboard.press('Tab')
        ลิงก์ = await แท็บ.evaluate(() => (document.activeElement?.closest('[data-แผงบท]') && document.activeElement.tagName === 'A' ? document.activeElement.getAttribute('href') : null))
      }
      if (!ลิงก์) {
        ตก.push(`${ป้าย} ⇒ จากช่องบท ${ช่อง} กด Tab ⛔ ถึงบทความในแผง`)
        continue
      }
      await Promise.all([แท็บ.waitForURL((u) => u.pathname.replace(/\/+$/, '') === new URL(ลิงก์, ฐาน).pathname.replace(/\/+$/, ''), { timeout: 15000 }), แท็บ.keyboard.press('Enter')]).catch(() =>
        ตก.push(`${ป้าย} ⇒ กด Enter ที่บทความในแผง ⛔ ไปถึงหน้าบทความ`),
      )
      await แท็บ.waitForSelector('article[data-หน้า="บทความ"] h1', { timeout: 15000 }).catch(() => {})
      const ว = await วัดจอ(แท็บ, กดได้)
      if (ว.ล้น > 0) ตก.push(`${ป้าย} หน้าบทความ ⇒ หน้าเลื่อนซ้ายขวา หรือของกดได้พ้นขอบจอ ${ว.ล้น} จุด`)
      if (ว.เล็ก.length) ตก.push(`${ป้าย} หน้าบทความ ⇒ ของกดได้เล็กกว่า ${เป้า} จุด ⇒ ${ว.เล็ก.slice(0, 3).join(' · ')}`)
    } catch (e) {
      ตก.push(`${ป้าย} ⇒ ตรวจไม่จบ ⇒ ${String(e.message || e).split('\n')[0]}`)
    } finally {
      await ctx.close()
    }
  }
  return ตก
}

// ---------------------------------------------------------------------------
// ของพัง ⇒ แต่ละชิ้นยัดเฉพาะข้อที่ควรจับมัน ⇒ `ตรวจ` คือท่อนของด่านที่ต้องแดง
// ---------------------------------------------------------------------------
/** สคริปต์ที่ทำซ้ำทุกครั้งที่หน้าเปลี่ยน ⇒ ของพังติดอยู่แม้ Vue วาดใหม่ */
const ทุกครั้งที่หน้าเปลี่ยน = (ทำ) => `new MutationObserver(() => { try { (${ทำ})() } catch {} }).observe(document, { childList: true, subtree: true, attributes: true })`
const ของพัง = {
  // ① ⇒ ปุ่มสลับไม่บอกสถานะ ⇒ ตาเห็นสี แต่โปรแกรมอ่านหน้าจอไม่รู้ว่าเลือกแบบไหน
  ปุ่มสลับไม่บอกสถานะ: {
    ข้อ: '①',
    ตรวจ: ตรวจ1,
    ก่อนโหลด: ทุกครั้งที่หน้าเปลี่ยน(`() => document.querySelectorAll('.pk-ปุ่มมุมมอง[aria-pressed]').forEach((x) => x.removeAttribute('aria-pressed'))`),
  },
  // ② ⇒ แถวที่ไม่อยู่ในทะเบียนโผล่ในรายการ
  รายการเกินทะเบียน: {
    ข้อ: '②',
    ตรวจ: ตรวจ2,
    ก่อนโหลด: ทุกครั้งที่หน้าเปลี่ยน(
      `() => { const ul = document.querySelector('[data-มุม="รายการ"] ul'); if (ul && !ul.querySelector('[data-ปลอม]')) { const li = document.createElement('li'); li.setAttribute('data-ปลอม', ''); li.innerHTML = '<a href="x"><span class="pk-ช่วงบทความ">1:1–8</span><span class="pk-ชื่อบทความ">เรื่องร่างที่ยังไม่อนุมัติ</span></a>'; ul.append(li) } }`,
    ),
  },
  // ② ⇒ แถวเรียงผิด (ข้อหลังขึ้นก่อน)
  รายการเรียงผิด: {
    ข้อ: '②',
    ตรวจ: ตรวจ2,
    ก่อนโหลด: ทุกครั้งที่หน้าเปลี่ยน(
      `() => { const ul = document.querySelector('[data-มุม="รายการ"] ul'); if (ul && ul.children.length > 1 && !ul.children[0].hasAttribute('data-กลับ')) { ul.append(...[...ul.children].reverse()); ul.children[0].setAttribute('data-กลับ', '') } }`,
    ),
  },
  // ③ ⇒ ช่องของบทที่ยังไม่มีบทความกลายเป็นปุ่มที่กดได้
  ช่องจางกดได้: {
    ข้อ: '③',
    ตรวจ: ตรวจ3,
    ก่อนโหลด: ทุกครั้งที่หน้าเปลี่ยน(
      `() => { const s = document.querySelector('[data-มุม="แผนที่"] span.pk-ช่องบท[data-บท="1"]'); if (s) { const b = document.createElement('button'); b.className = s.className; b.setAttribute('data-บท', '1'); b.textContent = s.textContent; s.replaceWith(b) } }`,
    ),
  },
  // ③ ⇒ กดช่องบทแล้วแผงไม่เปลี่ยนตาม
  แผงไม่ตามช่อง: {
    ข้อ: '③',
    ตรวจ: ตรวจ3,
    ก่อนโหลด: () =>
      document.addEventListener('click', (e) => e.target instanceof Element && e.target.closest('.pk-ช่องบท') && e.stopImmediatePropagation(), true),
  },
  // ③ ⇒ เรื่องที่คร่อมบทติดแค่บทต้น
  คร่อมบทติดบทเดียว: {
    ข้อ: '③',
    ตรวจ: ตรวจ3คร่อม,
    ก่อนโหลด: ทุกครั้งที่หน้าเปลี่ยน(
      `() => { const b = document.querySelector('[data-มุม="แผนที่"] section[data-เล่ม="MRK"] button[data-บท="3"]'); if (b) { const s = document.createElement('span'); s.className = 'pk-ช่องบท'; s.setAttribute('data-บท', '3'); s.setAttribute('aria-hidden', 'true'); s.textContent = '3'; b.replaceWith(s) } }`,
    ),
  },
  // ④ ⇒ รายการตรวจหลุดขึ้นหน้าบทความ
  รายการตรวจโผล่: {
    ข้อ: '④',
    ตรวจ: (พัง) => ตรวจ4(พัง, [เรื่องหลัก]),
    ก่อนโหลด: ทุกครั้งที่หน้าเปลี่ยน(
      `() => { const t = document.querySelector('[data-ตัวเรื่องเล่า]'); if (t && !t.querySelector('[data-ปลอม]')) { const p = document.createElement('p'); p.setAttribute('data-ปลอม', ''); p.textContent = 'ประเภท: ก (ข้อเท็จจริงจากตัวบทพระคัมภีร์โดยตรง)'; t.append(p) } }`,
    ),
  },
  // ④ ⇒ กดฟังแล้วเงียบ
  ฟังแล้วเงียบ: {
    ข้อ: '④',
    ตรวจ: (พัง) => ตรวจ4(พัง, [เรื่องหลัก]),
    ก่อนโหลด: () =>
      document.addEventListener('click', (e) => e.target instanceof Element && e.target.closest('[data-ปุ่ม="ฟังบทความ"]') && e.stopImmediatePropagation(), true),
  },
  // ④ ⇒ ลิงก์ไปหน้าอ่านไม่พกช่วงข้อ
  ลิงก์หน้าอ่านไม่มีช่วง: {
    ข้อ: '④',
    ตรวจ: (พัง) => ตรวจ4(พัง, [เรื่องหลัก]),
    ก่อนโหลด: ทุกครั้งที่หน้าเปลี่ยน(
      `() => { const a = document.querySelector('[data-ไป="หน้าอ่าน"]'); if (a && a.getAttribute('href').includes('?')) a.setAttribute('href', a.getAttribute('href').split('?')[0]) }`,
    ),
  },
  // ⑤ ⇒ เมนูกลับไปเว็บเดิม
  เมนูไปเว็บเดิม: {
    ข้อ: '⑤',
    ตรวจ: ตรวจ5,
    ก่อนโหลด: ทุกครั้งที่หน้าเปลี่ยน(
      `() => { for (const a of document.querySelectorAll('[id^="pk-แผงเมนูเว็บเดิม"] a')) if (a.textContent.trim() === 'เล่าประสบการณ์' && !a.href.includes('phrakham.life')) a.setAttribute('href', 'https://phrakham.life/reflections/index.html') }`,
    ),
  },
  // ⑥ ⇒ ที่อยู่ที่ไม่มีได้หน้าว่าง 200 แทนหน้าไม่พบหน้านี้
  ไม่พบกลายเป็นหน้าว่าง: {
    ข้อ: '⑥',
    ตรวจ: ตรวจ6,
    เส้นทาง: (c) => c.route(/\/reflections\/[^/?]+\/?$/, (r) => (r.request().resourceType() === 'document' ? r.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><html><body></body></html>' }) : r.continue())),
  },
  // ⑦ ⇒ แถวช่องบทไม่ห่อ ⇒ จอ 375 ล้นซ้ายขวา
  แผนที่ล้นจอ: { ข้อ: '⑦', ตรวจ: ตรวจ7, css: '.pk-แถวช่องบท { flex-wrap: nowrap !important; } .pk-แถวช่องบท > * { flex: none !important; }' },
  // ⑦ ⇒ ปุ่มสลับไม่มีวงโฟกัส
  ไม่เห็นวงโฟกัส: { ข้อ: '⑦', ตรวจ: ตรวจ7, css: '.pk-ปุ่มมุมมอง:focus-visible { outline: none !important; }' },
  // ⑦ ⇒ ช่องบทกดด้วยแป้นพิมพ์ไม่ได้
  ช่องบทแป้นไม่ถึง: {
    ข้อ: '⑦',
    ตรวจ: ตรวจ7,
    ก่อนโหลด: ทุกครั้งที่หน้าเปลี่ยน(`() => document.querySelectorAll('.pk-ช่องบท.pk-มีบทความ:not([tabindex])').forEach((x) => x.setAttribute('tabindex', '-1'))`),
  },
  // ⑦ ⇒ ปุ่มที่ไม่ได้เลือกสีจางจนอ่านไม่ออก ⇒ axe (color-contrast) ต้องจับได้
  ปุ่มสลับสีจาง: { ข้อ: '⑦', ตรวจ: ตรวจ7, css: ".pk-ปุ่มมุมมอง:not([aria-pressed='true']) { color: #d8d0c4 !important; }" },
  // ⑦ ⇒ ปุ่มสลับเตี้ยกว่า 44
  ปุ่มสลับเล็ก: { ข้อ: '⑦', ตรวจ: ตรวจ7, css: '.pk-ปุ่มมุมมอง { min-height: 30px !important; height: 30px !important; }' },
}

// ---------------------------------------------------------------------------
// วิ่ง
// ---------------------------------------------------------------------------
if (ทดสอบตัวเอง) {
  console.log(`ทดสอบตัวเอง ⇒ ยัดของพัง ${Object.keys(ของพัง).length} ท่าทีละชิ้น ⇒ แต่ละชิ้นต้องทำให้ข้อของมันแดง`)
  const ไม่แดง = []
  for (const [ชื่อ, พัง] of Object.entries(ของพัง)) {
    const ตก = await พัง.ตรวจ(พัง)
    const ของข้อนี้ = ตก.filter((x) => x.startsWith(พัง.ข้อ))
    if (ของข้อนี้.length) console.log(`  ✅ ${ชื่อ} ⇒ ข้อ ${พัง.ข้อ} แดง ⇒ ${ของข้อนี้[0].slice(0, 170)}`)
    else {
      console.log(`  ⛔ ${ชื่อ} ⇒ ข้อ ${พัง.ข้อ} ⛔ แดง${ตก.length ? ` (แดงข้ออื่น ⇒ ${ตก[0].slice(0, 120)})` : ''}`)
      ไม่แดง.push(ชื่อ)
    }
  }
  await เบราว์เซอร์.close()
  if (ไม่แดง.length) {
    console.log(`\n⛔ ด่านจับของพังไม่ได้ ${ไม่แดง.length} ท่า ⇒ ${ไม่แดง.join(' · ')} ⇒ ด่านตายแล้ว ⇒ ต้องแก้ด่าน`)
    process.exit(1)
  }
  console.log(`\n✅ ด่านยังจับของพังได้ครบ ${Object.keys(ของพัง).length} ท่า`)
  process.exit(0)
}

console.log(`ด่านหน้าเล่าประสบการณ์ ⇒ ${ฐาน} ⇒ ทะเบียน ${เรื่องทั้งหมด.length} เรื่อง`)
for (const [ชื่อ, ตรวจ] of [
  ['① ปุ่มสลับ', ตรวจ1],
  ['② รายการ', ตรวจ2],
  ['③ แผนที่', ตรวจ3],
  ['③ คร่อมบท', ตรวจ3คร่อม],
  ['④ หน้าบทความ', ตรวจ4],
  ['⑤ เมนู', ตรวจ5],
  ['⑥ 404', ตรวจ6],
  ['⑦ จอกับแป้นพิมพ์', ตรวจ7],
]) {
  const ตก = await ตรวจ({})
  console.log(ตก.length ? `⛔ ${ชื่อ} ⇒ ตก ${ตก.length}` : `✅ ${ชื่อ}`)
  ที่ตก.push(...ตก)
}
await เบราว์เซอร์.close()
if (ที่ตก.length) {
  console.log(`\n⛔ ตก ${ที่ตก.length} รายการ`)
  for (const x of ที่ตก) console.log('  ' + x)
  process.exit(1)
}
console.log(
  `\n✅ หน้ารวม ⇒ ปุ่มสลับบอกสถานะ · รายการ ${เรื่องทั้งหมด.length} แถวตรงทะเบียน · แผนที่ช่องครบทุกบท คร่อมบทติดทุกบท` +
    ` · หน้าบทความ ${เรื่องทั้งหมด.length} หน้าตรงไฟล์ที่อนุมัติ ฟังได้ ไปหน้าอ่านได้ · เมนูมาที่นี่ · ที่อยู่ที่ไม่มีได้ 404 · จอ ${จอทั้งหมด.join(' · ')} แป้นพิมพ์ครบ`,
)
