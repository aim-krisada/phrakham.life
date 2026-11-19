// ด่านตรวจ — **หัวข้อย่อยของฉบับแปลขึ้นบนหน้าอ่าน และปิดได้ด้วยสวิตช์** (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/134)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// **ด่านนี้ตรวจอะไร** ⇒ มาระโก 1 ⇒ TCV มี 8 หัวข้อ · THKJV มี 10 หัวข้อ (จำนวนจริงอ่านจากไฟล์บทที่เว็บสร้างเอง ⛔ ไม่ได้พิมพ์ไว้)
//   ① **ทุกหัวข้อในข้อมูลขึ้นบนจอครบ ตัวหนังสือตรง** (ข้อ 8) ⇒ 3 แบบการจัดวาง × ฉบับเดียว · 2 ฉบับเทียบกัน × จอ 375 · 1280
//      ⇒ ตาเห็นจริง (มีกล่องที่กว้างและสูงเกิน 1 จุด) ⇒ อยู่ในคอลัมน์ของฉบับตัวเอง (`data-ฉบับ` ของช่องที่ครอบ)
//   ② **หัวข้อเป็นหัวเรื่องระดับ 3 ในต้นไม้การเข้าถึง** (ข้อ 10) ⇒ โปรแกรมอ่านหน้าจอกระโดดถึงได้ ⇒ ชื่อตรงกับตัวหนังสือ
//   ③ **เทียบ 2 ฉบับบนจอ 1280 ⇒ แถวของข้อยังตรงกัน** (ข้อ 9) ⇒ *แยกตามข้อ* ⇒ บรรทัดแรกของตัวบทข้อเดียวกันอยู่ระดับเดียวกันทุกคอลัมน์
//      ⇒ *แยกตามย่อหน้า* ⇒ ย่อหน้าแรกของทุกแถวเริ่มระดับเดียวกัน ⇒ และหัวข้อของฉบับไหนอยู่เหนือคอลัมน์ของฉบับนั้น (ขอบซ้ายตรงกัน)
//   ④ **ปิดสวิตช์ *แสดงหัวข้อย่อย* ⇒ ไม่มีหัวข้อเหลือในหน้า และตัวบทครบเท่าเดิม** (ข้อ 11)
//      ⇒ ไหลต่อเนื่อง ⇒ ตัวบทของแต่ละฉบับกลับเป็นกล่องเดียวต่อกันเป็นพืด ⇒ โหลดหน้าใหม่ ⇒ สวิตช์ยังปิด (จำค่าได้)
//   ⑤ **กดสวิตช์ ⇒ ข้อที่อ่านอยู่ยังอยู่ที่เดิมบนจอ** (ข้อ 14) ⇒ เลื่อนไปข้อ 14 ⇒ ปิด แล้วเปิด ⇒ ขยับไม่เกิน 2 จุด
//   ⑥ **จอ 375 ไม่ล้นซ้ายขวา** (ข้อ 14) ⇒ ทุกสภาพของ ① ที่จอ 375
//
// ⚠️ **ด่านนี้ ⛔ ไม่ได้ฟังเสียงจริงจากโปรแกรมอ่านหน้าจอ** ⇒ ดูแค่ต้นไม้การเข้าถึงของ Chromium
// ⚠️ ด่านนี้ใช้มาระโก 1 เล่มเดียว ⇒ หัวข้อกลางข้อ (TCV 17 อันในพันธสัญญาเดิม) ⛔ ไม่ได้ผ่านด่านนี้ ⇒ ตัวพิสูจน์ของมันคือ `tools/ตรวจหัวข้อย่อย.mjs`
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านหัวข้อย่อยบนหน้า.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพัง 4 แบบ ทีละแบบ ⇒ ข้อที่คู่กันต้องแดง ⇒ แบบไหนจับไม่ได้ = ด่านตายไปส่วนหนึ่ง ⇒ คืนรหัสไม่เป็นศูนย์
//     ก. ซ่อนหัวข้อจากตา ⇒ ① · ข. ช่องว่างของคอลัมน์ที่ไม่มีหัวข้อไม่กันที่ ⇒ ③
//     ค. เว็บจำค่าสวิตช์ไม่ได้ ⇒ ④ · ง. เลื่อนจอชดเชยไม่ได้ ⇒ ⑤
//
//   node tools/ด่านหัวข้อย่อยบนหน้า.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import { เส้นทางเว็บ, ปุ่มAaของหน้า } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const เล่ม = 'MRK'
const บท = 1
/** ชื่อสวิตช์ที่ตาเห็น ⇒ เจ้าของคือ `app/utils/ถ้อยคำแผงAa.ts` ⇒ เปลี่ยนที่นั่นแล้วด่านแดงเอง ⇒ ต้องแก้ทั้งสองที่ */
const ชื่อสวิตช์ = 'แสดงหัวข้อย่อย'

const ข้อมูลบท = await (await fetch(`${ฐาน}/api/chapter/${เล่ม}/${บท}.json`)).json()
const หัวในข้อมูล = ข้อมูลบท.หัวข้อ || {}
for (const ฉ of ['TCV', 'THKJV']) {
  if (!หัวในข้อมูล[ฉ]?.length) {
    console.log(`⛔ ไฟล์บท ${เล่ม} ${บท} ⛔ ไม่มีหัวข้อของ ${ฉ} ⇒ ซองหัวข้อหาย ⇒ สั่ง tools/สร้างรอยย่อหน้า.py ก่อนสร้างเว็บ`)
    process.exit(1)
  }
}

const เบราว์เซอร์ = await chromium.launch()

/** เปิดหน้าในบริบทใหม่ ⇒ ตั้งฉบับกับมุมมองก่อนโค้ดของเว็บติด ⇒ `ยัด` = ของพังของโหมดพิสูจน์ */
async function เปิด({ กว้าง, จัดวาง, ฉบับ, หัวข้อย่อย = true }, ยัด = {}) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: 900 } })
  await ctx.addInitScript(
    ([ฉ, ม, ไม่จำ]) => {
      if (!sessionStorage.getItem('ตั้งแล้ว')) {
        localStorage.setItem('phrakham.versions', JSON.stringify(ฉ))
        localStorage.setItem('phrakham.view', JSON.stringify(ม))
        sessionStorage.setItem('ตั้งแล้ว', '1')
      }
      if (ไม่จำ) {
        const เดิม = Storage.prototype.setItem
        Storage.prototype.setItem = function (k, v) {
          if (k === 'phrakham.view') return
          return เดิม.call(this, k, v)
        }
      }
    },
    [ฉบับ, { จัดวาง, หัวข้อย่อย }, !!ยัด.ไม่จำ],
  )
  if (ยัด.ไม่เลื่อน)
    await ctx.addInitScript(() => {
      window.scrollTo = () => {}
      Element.prototype.scrollTo = () => {}
    })
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(`${ฐาน}/read/${เล่ม}?c=${บท}`, { waitUntil: 'domcontentloaded' })
  await รอหน้า(แท็บ)
  if (ยัด.css) await แท็บ.addStyleTag({ content: ยัด.css })
  return { ctx, แท็บ }
}

async function รอหน้า(แท็บ) {
  await แท็บ.waitForFunction(() => !!document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
  await แท็บ.waitForFunction(() => !!document.querySelector('.pk-ตัวบท [data-ข้อ="1:1"]'), null, { timeout: 30000 })
  await แท็บ.evaluate(() => document.fonts.ready.then(() => true))
  await แท็บ.waitForTimeout(400)
}

/** หัวข้อทั้งหมดในบทที่ 1 ⇒ ตัวหนังสือ · ฉบับของช่องที่ครอบ · ตาเห็นไหม · ขอบซ้ายขวา */
const หัวบนหน้า = (แท็บ) =>
  แท็บ.evaluate(() =>
    [...document.querySelectorAll('.pk-ตัวบท .pk-หัวข้อย่อย')].map((h) => {
      const r = h.getBoundingClientRect()
      const ช่อง = h.closest('[data-ฉบับ]')
      const ข้อถัดไป = (() => {
        // ข้อแรกที่อยู่ใต้หัวข้อในคอลัมน์เดียวกัน ⇒ ใช้ยืนยันว่าหัวข้ออยู่บทที่ 1
        const ทั้งหมด = [...document.querySelectorAll('.pk-ตัวบท [data-ข้อ]')]
        const x = ทั้งหมด.find((e) => h.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING)
        return x?.getAttribute('data-ข้อ') || ''
      })()
      return {
        ตัวหนังสือ: (h.textContent || '').trim(),
        ฉบับ: ช่อง?.getAttribute('data-ฉบับ') || '',
        เห็น: r.width > 1 && r.height > 1 && getComputedStyle(h).visibility !== 'hidden',
        ซ้าย: r.left,
        ข้อถัดไป,
      }
    }),
  )

/** ① ⑥ ใน 1 สภาพ ⇒ คืนรายการที่ผิด */
async function ตรวจครบ(ส, ยัด) {
  const ชื่อ = `จอ ${ส.กว้าง} · ${ส.จัดวาง} · ${ส.ฉบับ.join('+')}`
  const ผิด = []
  const { ctx, แท็บ } = await เปิด(ส, ยัด)
  try {
    const หัว = (await หัวบนหน้า(แท็บ)).filter((h) => h.ข้อถัดไป.startsWith('1:'))
    for (const ฉ of ส.ฉบับ) {
      const ควร = (หัวในข้อมูล[ฉ] || []).map((x) => x.ตัวหนังสือ)
      const ได้ = หัว.filter((h) => h.ฉบับ === ฉ)
      const ตัว = ได้.map((h) => h.ตัวหนังสือ)
      if (JSON.stringify(ตัว) !== JSON.stringify(ควร))
        ผิด.push(`① ${ชื่อ} ⇒ หัวข้อของ ${ฉ} บนหน้า ${ตัว.length} อัน ⇒ ข้อมูลมี ${ควร.length} อัน · ตัวแรกที่ต่าง "${ตัว.find((t, i) => t !== ควร[i]) ?? ควร[ตัว.length]}"`)
      const ไม่เห็น = ได้.filter((h) => !h.เห็น)
      if (ไม่เห็น.length) ผิด.push(`① ${ชื่อ} ⇒ หัวข้อของ ${ฉ} ${ไม่เห็น.length} อันตาไม่เห็น เช่น "${ไม่เห็น[0].ตัวหนังสือ}"`)
    }
    const หลง = หัว.filter((h) => !ส.ฉบับ.includes(h.ฉบับ))
    if (หลง.length) ผิด.push(`① ${ชื่อ} ⇒ หัวข้อ ${หลง.length} อันไม่อยู่ในคอลัมน์ของฉบับไหน เช่น "${หลง[0].ตัวหนังสือ}"`)
    // ② หัวเรื่องระดับ 3 ⇒ หัวข้อแรกของ TCV
    const แรก = หัวในข้อมูล.TCV[0].ตัวหนังสือ.replace(/​/g, '')
    if (ส.ฉบับ.includes('TCV')) {
      const ชื่อในต้นไม้ = await แท็บ.getByRole('heading', { level: 3 }).allInnerTexts()
      if (!ชื่อในต้นไม้.some((t) => t.replace(/​/g, '').trim() === แรก))
        ผิด.push(`② ${ชื่อ} ⇒ ต้นไม้การเข้าถึง ⛔ ไม่มีหัวเรื่องระดับ 3 "${แรก}"`)
    }
    // ⑥ จอแคบไม่ล้น
    if (ส.กว้าง < 768) {
      const ล้น = await แท็บ.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      if (ล้น > 1) ผิด.push(`⑥ ${ชื่อ} ⇒ หน้าล้นซ้ายขวา ${ล้น} จุด`)
    }
  } finally {
    await ctx.close()
  }
  return ผิด
}

/** ③ เทียบ 2 ฉบับบนจอ 1280 ⇒ แถวยังตรงกัน และหัวข้ออยู่เหนือคอลัมน์ของตัวเอง */
async function ตรวจแถว(จัดวาง, ยัด) {
  const ชื่อ = `จอ 1280 · ${จัดวาง} · TCV+THKJV`
  const ผิด = []
  const { ctx, แท็บ } = await เปิด({ กว้าง: 1280, จัดวาง, ฉบับ: ['TCV', 'THKJV'] }, ยัด)
  try {
    const ผล = await แท็บ.evaluate((จ) => {
      const บรรทัดแรก = (e) => {
        // ขอบบนของตัวอักษรตัวแรกที่ตาเห็น ⇒ ⛔ ไม่ใช่ขอบกล่อง ⇒ กล่องเท่ากันได้ทั้งที่ตัวหนังสือเหลื่อม
        const w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, {
          acceptNode: (n) => (n.textContent.trim() && !n.parentElement.closest('.pk-เฉพาะเสียง, .pk-เลขข้อ') ? 1 : 3),
        })
        const n = w.nextNode()
        if (!n) return null
        const rg = document.createRange()
        rg.setStart(n, n.textContent.search(/\S/))
        rg.setEnd(n, n.textContent.search(/\S/) + 1)
        return rg.getBoundingClientRect().top
      }
      const แถว =
        จ === 'แยกตามข้อ'
          ? [...document.querySelectorAll('.pk-ตัวบท .pk-ข้อ.pk-มีหัวข้อ[data-ข้อ^="1:"]')].map((x) => ({
              ชื่อ: x.getAttribute('data-ข้อ'),
              ช่อง: [...x.querySelectorAll(':scope > .pk-ช่องทั้งหมด:not(.pk-แถวหัวข้อ) > .pk-ช่องฉบับ')],
              หัว: [...x.querySelectorAll(':scope > .pk-แถวหัวข้อ > .pk-ช่องหัวข้อ')],
            }))
          : [...document.querySelectorAll('.pk-ตัวบท .pk-ย่อหน้ากอง')].slice(0, 1).flatMap((กอง) => {
              const ทุกแถว = [...กอง.querySelectorAll(':scope > .pk-กลุ่มย่อหน้า')]
              return ทุกแถว
                .map((x, i) => ({ x, ก่อน: ทุกแถว[i - 1] }))
                .filter(({ ก่อน }) => ก่อน?.classList.contains('pk-แถวหัวข้อ'))
                .map(({ x, ก่อน }) => ({
                  ชื่อ: `แถวย่อหน้าใต้หัวข้อ "${(ก่อน.textContent || '').trim().slice(0, 20)}"`,
                  ช่อง: [...x.querySelectorAll(':scope > .pk-ช่องฉบับ')],
                  หัว: [...ก่อน.querySelectorAll(':scope > .pk-ช่องหัวข้อ')],
                }))
            })
      return แถว.map((ร) => ({
        ชื่อ: ร.ชื่อ,
        บน: ร.ช่อง.map(บรรทัดแรก),
        ช่องซ้าย: ร.ช่อง.map((c) => ({ ฉ: c.getAttribute('data-ฉบับ'), ซ้าย: c.getBoundingClientRect().left })),
        หัวซ้าย: ร.หัว
          .filter((h) => h.querySelector('.pk-หัวข้อย่อย'))
          .map((h) => ({ ฉ: h.getAttribute('data-ฉบับ'), ซ้าย: h.querySelector('.pk-หัวข้อย่อย').getBoundingClientRect().left })),
      }))
    }, จัดวาง)
    if (!ผล.length) ผิด.push(`③ ${ชื่อ} ⇒ หาแถวที่มีหัวข้อไม่เจอ ⇒ ด่านไม่ได้ตรวจอะไร`)
    for (const ร of ผล) {
      const บน = ร.บน.filter((x) => x !== null)
      if (บน.length > 1 && Math.max(...บน) - Math.min(...บน) > 1.5)
        ผิด.push(`③ ${ชื่อ} ⇒ ${ร.ชื่อ} ⇒ บรรทัดแรกของตัวบทเหลื่อมกัน ${Math.round(Math.max(...บน) - Math.min(...บน))} จุดข้ามคอลัมน์`)
      for (const ห of ร.หัวซ้าย) {
        const ช่อง = ร.ช่องซ้าย.find((c) => c.ฉ === ห.ฉ)
        if (!ช่อง || Math.abs(ช่อง.ซ้าย - ห.ซ้าย) > 1.5)
          ผิด.push(`③ ${ชื่อ} ⇒ ${ร.ชื่อ} ⇒ หัวข้อของ ${ห.ฉ} อยู่ที่ x=${Math.round(ห.ซ้าย)} ⇒ คอลัมน์ของมันอยู่ที่ x=${ช่อง ? Math.round(ช่อง.ซ้าย) : 'ไม่มี'}`)
      }
    }
  } finally {
    await ctx.close()
  }
  return ผิด
}

async function กดสวิตช์(แท็บ, ติ๊ก) {
  await ปุ่มAaของหน้า(แท็บ).click()
  await แท็บ.waitForSelector('#pk-แผงAa')
  const ช่อง = แท็บ.getByRole('checkbox', { name: ชื่อสวิตช์, exact: true })
  if (ติ๊ก) await ช่อง.check()
  else await ช่อง.uncheck()
  await ปุ่มAaของหน้า(แท็บ).click()
  await แท็บ.waitForTimeout(300)
}

/** ④ ปิดสวิตช์ ⇒ หัวข้อหายหมด ตัวบทครบ ไหลเป็นพืดเดียว ⇒ โหลดใหม่แล้วยังปิด */
async function ตรวจปิด(ยัด) {
  const ผิด = []
  const ชื่อ = 'จอ 1280 · ไหลต่อเนื่อง · TCV+THKJV'
  const { ctx, แท็บ } = await เปิด({ กว้าง: 1280, จัดวาง: 'ไหลต่อเนื่อง', ฉบับ: ['TCV', 'THKJV'] }, ยัด)
  const ตัวบท = () =>
    แท็บ.evaluate(() =>
      [...document.querySelectorAll('.pk-ตัวบท .pk-ข้อไหล[data-ข้อ^="1:"]')].map((e) => e.textContent).join(''),
    )
  try {
    const ก่อน = await ตัวบท()
    await กดสวิตช์(แท็บ, false)
    const นับ = () => แท็บ.evaluate(() => document.querySelectorAll('.pk-ตัวบท .pk-หัวข้อย่อย').length)
    if ((await นับ()) !== 0) ผิด.push(`④ ${ชื่อ} ⇒ ปิดสวิตช์แล้วยังมีหัวข้อในหน้า ${await นับ()} อัน`)
    const หลัง = await ตัวบท()
    if (หลัง !== ก่อน) ผิด.push(`④ ${ชื่อ} ⇒ ปิดสวิตช์แล้วตัวบทเปลี่ยน ⇒ ก่อน ${ก่อน.length} ตัวอักษร · หลัง ${หลัง.length}`)
    const กล่อง = await แท็บ.evaluate(() =>
      [...document.querySelectorAll('.pk-ตัวบท .pk-ไหล')].slice(0, 1).flatMap((x) => [...x.children].map((c) => c.tagName)),
    )
    if (กล่อง.some((t) => t !== 'P')) ผิด.push(`④ ${ชื่อ} ⇒ ปิดสวิตช์แล้วตัวบทบทที่ 1 ยังไม่เป็นกล่อง <p> เดียวต่อฉบับ ⇒ ได้ ${กล่อง.join(' ')}`)
    await แท็บ.reload({ waitUntil: 'domcontentloaded' })
    await รอหน้า(แท็บ)
    if ((await นับ()) !== 0) ผิด.push(`④ ${ชื่อ} ⇒ โหลดหน้าใหม่แล้วหัวข้อกลับมา ${await นับ()} อัน ⇒ เว็บจำค่าที่ผู้อ่านเลือกไม่ได้`)
  } catch (เหตุ) {
    ผิด.push(`④ ${ชื่อ} ⇒ ${เหตุ.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ผิด
}

/** ⑤ กดสวิตช์แล้วข้อที่อ่านอยู่ไม่กระโดด ⇒ ทุกแบบการจัดวาง ⇒ ข้อ 1:14 ซึ่ง TCV มีหัวข้อเหนือมัน */
async function ตรวจที่อ่าน(จัดวาง, ยัด) {
  const ผิด = []
  const ชื่อ = `จอ 1280 · ${จัดวาง} · TCV`
  const { ctx, แท็บ } = await เปิด({ กว้าง: 1280, จัดวาง, ฉบับ: ['TCV'] }, { ...ยัด, css: `${ยัด.css || ''} html { overflow-anchor: none !important; }` })
  const ระดับ = () =>
    แท็บ.evaluate(() => {
      const e = document.querySelector('.pk-ตัวบท .pk-ข้อไหล[data-ข้อ="1:14"], .pk-ตัวบท .pk-ข้อ[data-ข้อ="1:14"] > .pk-ช่องทั้งหมด:not(.pk-แถวหัวข้อ)')
      return e ? e.getBoundingClientRect().top : null
    })
  try {
    // ⭐ วางข้อ 1:14 ให้เป็นข้อแรกใต้แถบหนึบพอดี ⇒ หัวข้อของมันอยู่ใต้แถบหนึบ ⇒ กรณีที่หนักที่สุด
    //   ⇒ หัวข้อเกิดหรือหายตรงเหนือข้อที่ผู้อ่านกำลังอ่าน ⇒ ไม่ชดเชย = ข้อนั้นกระโดดเท่าความสูงหัวข้อทันที
    await แท็บ.evaluate(() => {
      const ขอบ = Math.max(
        ...[...document.querySelectorAll('.pk-แถบบน, .pk-หัวคอลัมน์')].map((x) => x.getBoundingClientRect().bottom),
      )
      const e = document.querySelector(
        '.pk-ตัวบท .pk-ข้อไหล[data-ข้อ="1:14"], .pk-ตัวบท .pk-ข้อ[data-ข้อ="1:14"] > .pk-ช่องทั้งหมด:not(.pk-แถวหัวข้อ)',
      )
      window.scrollTo(0, window.scrollY + e.getBoundingClientRect().top - ขอบ - 20)
    })
    await แท็บ.waitForTimeout(300)
    for (const ติ๊ก of [false, true]) {
      const ก่อน = await ระดับ()
      await กดสวิตช์(แท็บ, ติ๊ก)
      const หลัง = await ระดับ()
      if (ก่อน === null || หลัง === null) ผิด.push(`⑤ ${ชื่อ} ⇒ หาข้อ 1:14 ไม่เจอ`)
      else if (Math.abs(หลัง - ก่อน) > 2)
        ผิด.push(`⑤ ${ชื่อ} ⇒ ${ติ๊ก ? 'เปิด' : 'ปิด'}สวิตช์แล้วข้อ 1:14 ขยับ ${Math.round(หลัง - ก่อน)} จุด`)
    }
  } finally {
    await ctx.close()
  }
  return ผิด
}

const แบบ = ['แยกตามข้อ', 'แยกตามย่อหน้า', 'ไหลต่อเนื่อง']

async function ตรวจทั้งหมด(ยัด = {}) {
  const ผล = { '①': [], '②': [], '③': [], '④': [], '⑤': [], '⑥': [] }
  const ใส่ = (xs) => xs.forEach((x) => ผล[x[0]].push(x))
  for (const กว้าง of [375, 1280])
    for (const จัดวาง of แบบ)
      for (const ฉบับ of [['TCV'], ['TCV', 'THKJV']]) ใส่(await ตรวจครบ({ กว้าง, จัดวาง, ฉบับ }, ยัด))
  for (const จัดวาง of ['แยกตามข้อ', 'แยกตามย่อหน้า']) ใส่(await ตรวจแถว(จัดวาง, ยัด))
  ใส่(await ตรวจปิด(ยัด))
  for (const จัดวาง of แบบ) ใส่(await ตรวจที่อ่าน(จัดวาง, ยัด))
  return ผล
}

let แดง = false
if (ทดสอบตัวเอง) {
  // ⭐ ฝาแฝด ⇒ ของพังแต่ละแบบต้องทำให้ข้อที่คู่กันแดง ⇒ ตรวจเฉพาะส่วนที่จำเป็น ⇒ ⛔ ไม่วิ่งทั้งชุด 4 รอบ
  const ชุด = [
    { ชื่อ: 'ก. ซ่อนหัวข้อจากตา', ข้อ: '①', วิ่ง: (ย) => ตรวจครบ({ กว้าง: 1280, จัดวาง: 'แยกตามข้อ', ฉบับ: ['TCV'] }, ย), ยัด: { css: '.pk-หัวข้อย่อย { visibility: hidden !important; }' } },
    { ชื่อ: 'ข. ช่องว่างของคอลัมน์ที่ไม่มีหัวข้อไม่กันที่', ข้อ: '③', วิ่ง: async (ย) => [...(await ตรวจแถว('แยกตามข้อ', ย)), ...(await ตรวจแถว('แยกตามย่อหน้า', ย))], ยัด: { css: '.pk-ช่องหัวข้อ:empty { display: none !important; }' } },
    { ชื่อ: 'ค. เว็บจำค่าสวิตช์ไม่ได้', ข้อ: '④', วิ่ง: (ย) => ตรวจปิด(ย), ยัด: { ไม่จำ: true } },
    { ชื่อ: 'ง. เลื่อนจอชดเชยไม่ได้', ข้อ: '⑤', วิ่ง: (ย) => ตรวจที่อ่าน('แยกตามข้อ', ย), ยัด: { ไม่เลื่อน: true } },
  ]
  for (const ช of ชุด) {
    const ผิด = (await ช.วิ่ง(ช.ยัด)).filter((x) => x.startsWith(ช.ข้อ))
    if (ผิด.length) console.log(`✅ ${ช.ชื่อ} ⇒ ข้อ ${ช.ข้อ} แดงตามคาด ⇒ ${ผิด[0]}`)
    else {
      console.log(`⛔ ${ช.ชื่อ} ⇒ ข้อ ${ช.ข้อ} ⛔ ไม่แดง ⇒ ด่านจับของพังแบบนี้ไม่ได้แล้ว`)
      แดง = true
    }
  }
} else {
  const ผล = await ตรวจทั้งหมด()
  for (const [ข้อ, ผิด] of Object.entries(ผล)) {
    if (ผิด.length) {
      แดง = true
      console.log(`⛔ ข้อ ${ข้อ} ผิด ${ผิด.length} จุด`)
      for (const x of ผิด) console.log(`   ${x}`)
    } else console.log(`✅ ข้อ ${ข้อ} ผ่าน`)
  }
}
await เบราว์เซอร์.close()
process.exit(แดง ? 1 : 0)
