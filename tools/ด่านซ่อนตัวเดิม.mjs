// ด่านตรวจ — **ซ่อนตัวกรีก/ฮีบรู ⇒ ปุ่มคำเหลือคำแปลอังกฤษ ⇒ ทุกอย่างอื่นยังอยู่** (พี่เอมขอ 17 พ.ย. 2569)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// ⭐ ที่มา ⇒ พี่เอมอ่านตัวกรีกตัวฮีบรูไม่ออก แต่อ่านคำแปลอังกฤษใต้คำได้ ⇒ ขอสวิตช์ซ่อนตัวเดิม
//   ⇒ สัญลักษณ์กาล · กรอบ · สี · เส้นใต้ ต้องย้ายไปติดคำอังกฤษ ⇒ กดคำแล้วการ์ดความหมายยังขึ้น
//   ⇒ ค่าอยู่ที่ช่อง `แสดงตัวเดิม` ใน `app/utils/มุมมอง.ts`
// ⭐ **สวิตช์อยู่บนสุดของกล่องเฟืองบนหัวคอลัมน์ภาษาเดิม ⛔ ไม่ใช่แผง Aa** (พี่เอมขอ 17 พ.ย. 2569 ⇒ *"ควรอยู่ในเฟืองที่ heading ไม่ใช่ที่ตัว Aa"*)
//   ⇒ ⚠️ ของเดิม (คำขอรวม !243) ⇒ แผง Aa กลุ่ม *คำภาษาเดิม* ⇒ ย้ายแล้ว ⇒ ข้อ ⑥ ⑦ เฝ้าว่ามัน ⛔ กลับไป
//
// **ด่านนี้ตรวจ 11 ข้อ ⇒ มาระโก 13 คอลัมน์คำกรีกเปิด เครื่องหมายเปิดครบ 8 ตระกูล ⇒ จอ 320 กับ 1280 ⇒ กดของจริง**
//   ① **สวิตช์อยู่ในกล่องเฟืองบนหัวคอลัมน์คำกรีก และติ๊กอยู่ตั้งแต่ต้น** ⇒ เป็นช่องติ๊กแรกในกล่อง ⇒ ค่าตั้งต้น = เห็นตัวกรีกเหมือนเดิม ⇒ ตัวกรีกตาเห็นจริง
//   ② **เอาติ๊กออก ⇒ ตา ⛔ เห็นตัวกรีกสักตัวในปุ่มคำ ⇒ คำแปลอังกฤษเห็นทุกปุ่ม**
//      ⇒ สัญลักษณ์กาลเท่าเดิมทุกตัว ⇒ อยู่แถวเดียวกับคำอังกฤษ หน้าคำ (ltr)
//      ⇒ เครื่องหมายย้ายไปที่คำอังกฤษ ⇒ กรอบ (rs rd gb dg) · เส้นใต้ (u ub ud) · สี (bl mg) · ตัวเอียง (it) ⇒ ⛔ ไม่มีสักชิ้นให้ตรวจ = แดง
//      ⇒ ปุ่มคำกว้างอย่างน้อย 44 จุด (SC 2.5.5 ที่เว็บนี้ใช้) · สูงอย่างน้อย 24 จุด (SC 2.5.8 ⇒ ใบ #178 ข้อ 3.1)
//        ⇒ ⚠️ ของเดิมสูง 44 ด้วย ⇒ ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/178 ให้บรรทัดอังกฤษชิดลงใกล้ระยะบรรทัดไทย (36 จุด)
//          ⇒ ปุ่มสูง 44 กับบรรทัดห่าง 36 ⛔ อยู่ด้วยกันได้ ⇒ ใบตั้งเกณฑ์ 24 จุดเอง ⇒ ตอนแสดงตัวเดิมยัง 44 ทั้งสองด้าน (ด่านอื่นเฝ้า)
//      ⇒ ชื่อที่ได้ยินของปุ่มมีคำอังกฤษ และ ⛔ มีตัวกรีก (SC 2.5.3)
//      ⇒ จอ 320 ⇒ หน้า ⛔ ล้นซ้ายขวา (SC 1.4.10)
//   ③ **กดคำ ⇒ การ์ดความหมายขึ้น** ⇒ กดคำที่มีสัญลักษณ์กาล
//   ④ **โหลดหน้าใหม่ ⇒ ยังซ่อนอยู่** ⇒ จำค่าในเครื่องผู้อ่าน (`phrakham.view`) ⇒ สวิตช์ยังไม่ติ๊ก
//   ⑤ **ติ๊กกลับ ⇒ ตัวกรีกกลับมา ⇒ คำแปลกลับเป็นขนาดเดิม**
//   ⑥ **บนหน้าที่ ⛔ มีคำภาษาเดิม ⇒ ⛔ มีสวิตช์นี้ที่ไหนเลย** ทั้งแผง Aa และเฟือง (ใบ #76 ⇒ ตัวเลือกที่กดแล้วไม่เกิดอะไร ห้ามมีบนหน้า)
//   ⑦ **หน้าคำกรีก ⇒ แผง Aa ⛔ มีสวิตช์นี้** (จอ 320 กับ 1280) ⇒ สวิตช์มีที่เดียว คือเฟือง
//   ⑧ **คำฮีบรู (นางรูธ 1) ⇒ เฟืองบนหัวคอลัมน์ฮีบรูมีสวิตช์นี้ ติ๊กอยู่** (จอ 320 กับ 1280)
//      ⇒ ⛔ มีปุ่มตัว i · ในกล่อง ⛔ มีสัญลักษณ์กาลหรือเครื่องหมาย (ฮีบรูยังไม่มีข้อมูล) ⇒ แผง Aa ⛔ มีสวิตช์
//      ⇒ เอาติ๊กออก ⇒ ตา ⛔ เห็นตัวฮีบรูสักตัว ⇒ คำแปลอังกฤษเห็นทุกปุ่ม ⇒ ติ๊กกลับ ⇒ ตัวฮีบรูกลับมาทุกปุ่ม
//   ⑨ **คอลัมน์คนละบทที่เป็นคำกรีก (คอลัมน์คำภาษาเดิมของหน้าปิดอยู่)** ⇒ หัวของมันมีเฟืองที่มีสวิตช์นี้ (จอ 320 กับ 1280)
//      ⇒ ⛔ งั้นหน้าที่มีแต่คอลัมน์แบบนี้จะไม่มีที่ปิดตัวอักษร ⇒ เอาติ๊กออก ⇒ ตัวกรีกในคอลัมน์นั้นหายหมด ⇒ คำแปลยังเห็น
//   ⑩ **ซ่อนแล้วต้องเห็นว่าคำไหนอยู่ด้วยกัน** (@krisada ขอ 20 พ.ย. 2569 ⇒ ภาพมือถือ มาระโก 14 TCV คู่ SBLGNT)
//      ⇒ ⚠️ ของเดิม ⇒ "of Him  in" "the  leper" อ่านเป็นประโยคเดียว ⇒ "having / reclined" ที่ตัดสองบรรทัด ดูเป็นสองคำ
//      ⇒ วัดที่ตัวหนังสือจริงของคำแปล ⛔ ใช่กรอบปุ่ม
//      ⇒ ช่องระหว่างคำบนแถวเดียวกัน ⛔ แคบกว่า 1.5 เท่าของขนาดตัวคำแปล (ของเดิมราว 1 เท่า)
//      ⇒ คำที่ตัดหลายบรรทัด ⇒ ช่องว่างระหว่างบรรทัดในคำ ⛔ เกินครึ่งของช่องว่างระหว่างแถว (ค่ากลาง)
//      ⇒ ช่องที่เพิ่มทำให้แถวมากขึ้นได้บ้าง (บอกเจ้าของงานแล้ว) ⇒ วัดบนหน้าเดียวกับภาพของเจ้าของงาน ⇒ จอ 375 มาระโก 14 TCV คู่ SBLGNT
//        ⇒ นับแถวคำแปลทั้งหน้า เทียบกับตอนถอดช่องที่เพิ่มออก ⇒ ⛔ เกิน 15% (วัดจริง ⇒ แบบที่ใช้ +9% · แบบพังแถวละคำเดียว +29%)
//        ⇒ ⚠️ ลองแล้ว ⇒ ขยายช่องทั้งสองข้างปุ่ม ⇒ เหลือแถวละคำเดียว ⇒ ข้อยาวเป็นหาง
//        ⇒ ⚠️ ของเดิม (คอมมิต 843e070) วัดบนมาระโก 13 คอลัมน์เดียว เกณฑ์ 20% ⇒ แบบพังได้แค่ +19.7% บนเครื่อง Linux ⇒ ท่อ 44728110291 ⛔ จับไม่ได้
//          ⇒ หน้าคอลัมน์เดียวแถวยาว ⇒ ช่องกว้างขึ้นแบบไหนแถวก็เพิ่มพอ ๆ กัน ⇒ แยกของดีกับของพังไม่ออก
//      ⇒ หน้าที่ไม่มีคำแปลตัดหลายบรรทัด ⇒ บีบคำแปลยาวที่สุดให้แคบ 3em ชั่วคราว ⇒ วัดระยะบรรทัดของมัน ⇒ คืนค่า
//   ⑪ **จุดจาง ๆ คั่นคำแปล** (@krisada ขอ 20 พ.ย. 2569 ⇒ สวิตช์ *แสดงจุดคั่นคำ* ในเฟือง ตั้งต้นเปิด) ⇒ จอ 375 มาระโก 14 SBLGNT ซ่อนตัวกรีก
//      ⇒ เครื่องผู้อ่านที่ยัง ⛔ เคยตั้งค่านี้ ⇒ มีจุด ⇒ ทุกคู่คำที่อยู่แถวเดียวกันมีจุดคั่น ⇒ ต้นแถว ท้ายแถว ⛔ มีจุด
//      ⇒ จุด ⛔ ทับตัวหนังสือของคำสองข้าง ⇒ อยู่กลางช่องระหว่างตัวหนังสือ (คลาดได้ 1 ใน 4 ของช่อง) ⇒ สูงเท่ากลางบรรทัดแรกของคำแปล
//      ⇒ จุด ⛔ มีตัวอักษร (`content` ว่าง) ⇒ คัดลอกข้อความ ⛔ ติด · โปรแกรมอ่านหน้าจอ ⛔ อ่าน
//      ⇒ สวิตช์อยู่ถัดจากสวิตช์ตัวเดิม ⇒ เอาติ๊กออก ⇒ ⛔ มีจุด ⇒ โหลดใหม่ยัง ⛔ มี ⇒ ติ๊กคืน ⇒ จุดกลับมา
//      ⇒ แสดงตัวกรีก ⇒ ⛔ มีจุด ⇒ สวิตช์จุดกดไม่ได้ (`disabled`)
//      ⇒ ช่องติ๊กทุกช่องในกล่องเฟืองสีเดียวกัน ⛔ สีน้ำเงินปริยาย (@krisada ทัก 20 พ.ย. 2569 ⇒ กฎอยู่ที่ `main.css` ทั้งเว็บ)
//
// ⚠️ **ด่านนี้ ⛔ ได้ตรวจ** ⇒ หน้าตาของกล่องเฟือง (× · หน้าเต็มจอ · ปิดแล้วโฟกัสกลับ) ⇒ เจ้าของคือ `tools/ด่านเฟืองกับไอ.mjs`
//   ⇒ ⛔ ไม่ได้ฟังเสียงจริงจากโปรแกรมอ่านหน้าจอ ⇒ ดูชื่อจากต้นไม้การเข้าถึงของ Chromium
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านซ่อนตัวเดิม.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพังทีละแบบ (รายชื่ออยู่ที่ `ของพัง`) ⇒ ข้อที่คู่กันต้องแดงทุกแบบ ⇒ แบบไหนจับไม่ได้ = ด่านตายไปส่วนหนึ่ง
//
//   node tools/ด่านซ่อนตัวเดิม.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import { เส้นทางเว็บ, กางแผงAa, พับแผงAa, รอหน้านิ่ง } from './หน้าที่ตรวจ.mjs'
import { ตระกูลที่มี } from '../app/utils/มุมมอง.ts'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const บท = { เล่ม: 'MRK', บท: 13 }
/** ถ้อยคำที่ตาเห็น ⇒ เจ้าของคือ `app/utils/ถ้อยคำคำเดิมบนหัว.ts` ⇒ จดซ้ำโดยเจตนา ⇒ เปลี่ยนที่นั่นแล้วด่านแดง ⇒ ต้องแก้ทั้งสองที่ */
const ชื่อสวิตช์ = 'แสดงตัวอักษรกรีก/ฮีบรู'
/** ปุ่มเฟืองบนหัวคอลัมน์คำภาษาเดิมของหน้า · บนหัวคอลัมน์คนละที่ (กล่องของมันหรือแถวหัวคู่บนจอแคบ) */
const เฟืองของหน้า = '[data-ชื่อคำเดิม] [data-ปุ่ม="เครื่องมือภาษาเดิม"]'
const เฟืองของเทียบ = '.pk-ตอนเทียบ [data-ปุ่ม="เครื่องมือภาษาเดิม"], .pk-หัวคู่ [data-ปุ่ม="เครื่องมือภาษาเดิม"]'
const ตัวกรีก = /[Ͱ-Ͽἀ-῿֐-׿]/
const ปุ่มคำ = '.pk-ข้อคำ > .pk-คำ'

const เบราว์เซอร์ = await chromium.launch()

/** เปิดมาระโก 13 ⇒ คอลัมน์คำกรีกเปิด · เครื่องหมายครบ 8 ตระกูล · สัญลักษณ์กาลเปิด ⇒ ตั้งในเครื่องก่อนโค้ดของเว็บติด (ครั้งแรกครั้งเดียว ⇒ โหลดใหม่ต้องเห็นค่าที่เว็บจำเอง) */
async function เปิด(กว้าง, ยัด = {}, { คำเดิม = true, เล่ม = บท.เล่ม, บทที่ = บท.บท, ต่อท้าย = '', รอ = 'กรีก' } = {}) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: 900 } })
  await ctx.addInitScript(
    ([ม, ไม่จำ]) => {
      if (!sessionStorage.getItem('ตั้งแล้ว')) {
        localStorage.setItem('phrakham.versions', JSON.stringify(['TCV']))
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
    [{ จัดวาง: 'แยกตามข้อ', ภาษาเดิม: คำเดิม, สัญลักษณ์กาล: true, เครื่องหมาย: [...ตระกูลที่มี] }, !!ยัด.ไม่จำ],
  )
  if (ยัด.ก่อนโหลด) await ctx.addInitScript(ยัด.ก่อนโหลด)
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(`${ฐาน}/read/${เล่ม}?c=${บทที่}${ต่อท้าย}`, { waitUntil: 'domcontentloaded' })
  await รอหน้า(แท็บ, รอ === 'คำ' ? 'คำ' : คำเดิม ? รอ : '', บทที่)
  if (ยัด.css) await แท็บ.addStyleTag({ content: ยัด.css })
  return { ctx, แท็บ }
}

/** `รอ` ⇒ `กรีก` = รอสัญลักษณ์กาลกับเครื่องหมาย · `คำ` = รอปุ่มคำที่มีตัวเดิม (ฮีบรู · คอลัมน์คนละที่) · ว่าง = ⛔ รอคำ */
async function รอหน้า(แท็บ, รอ = 'กรีก', บทที่ = บท.บท) {
  await แท็บ.waitForFunction(() => !!document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
  await แท็บ.waitForFunction((c) => !!document.querySelector(`.pk-ตัวบท [data-ข้อ="${c}:1"]`), บทที่, { timeout: 30000 })
  await รอหน้านิ่ง(แท็บ)
  if (รอ === 'คำ')
    await แท็บ.waitForFunction(
      (sel) => !!document.querySelector(`${sel} > .pk-ตัวเดิม`) && document.fonts.status === 'loaded',
      ปุ่มคำ,
      { timeout: 30000 },
    )
  if (รอ === 'กรีก')
    // ⭐ ก้อนสัญลักษณ์กาลกับเครื่องหมายโหลดแยก ⇒ คำขึ้นก่อนได้ ⇒ รอทั้งคู่ ⛔ ไม่รอเป็นเวลาตายตัว
    await แท็บ.waitForFunction(
      (sel) =>
        !!document.querySelector(`${sel} > .pk-กาล svg`) &&
        !!document.querySelector(`${sel}[data-ลค]`) &&
        document.fonts.status === 'loaded',
      ปุ่มคำ,
      { timeout: 30000 },
    )
  await แท็บ.evaluate(() => new Promise((r) => setTimeout(r, 300)))
}

/** เปิดกล่องเฟืองของหัว `เฟือง` (ตัวแรกที่ตาเห็น) ⇒ คืนกล่อง (ตาม `aria-controls`) ⇒ คืน `null` เมื่อ ⛔ มีปุ่มหรือ ⛔ มีกล่อง */
async function เปิดเฟือง(แท็บ, เฟือง = เฟืองของหน้า) {
  const ปุ่ม = แท็บ.locator(เฟือง).locator('visible=true').first()
  if (!(await ปุ่ม.count())) return null
  if ((await ปุ่ม.getAttribute('aria-expanded')) !== 'true') await ปุ่ม.click()
  const ไอดี = await แท็บ
    .waitForFunction((b) => b.getAttribute('aria-expanded') === 'true' && b.getAttribute('aria-controls'), await ปุ่ม.elementHandle(), { timeout: 5000 })
    .then((h) => h.jsonValue())
    .catch(() => '')
  if (!ไอดี) return null
  const กล่อง = แท็บ.locator(`[id="${ไอดี}"]`)
  await กล่อง.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {})
  return (await กล่อง.count()) ? กล่อง : null
}
async function ปิดเฟือง(แท็บ) {
  if (!(await แท็บ.locator('.pk-แผงคำเดิม').count())) return
  await แท็บ.keyboard.press('Escape')
  await แท็บ.waitForSelector('.pk-แผงคำเดิม', { state: 'detached', timeout: 5000 }).catch(() => {})
}

/** สวิตช์ในกล่องเฟือง ⇒ คืน `null` เมื่อไม่มีเฟืองหรือไม่มีสวิตช์ ⇒ คืนสถานะติ๊ก · เป็นช่องติ๊กแรกในกล่องไหม · ของกรีกในกล่อง */
async function อ่านสวิตช์(แท็บ, เฟือง = เฟืองของหน้า) {
  const กล่อง = await เปิดเฟือง(แท็บ, เฟือง)
  if (!กล่อง) return null
  const ช่อง = กล่อง.getByRole('checkbox', { name: ชื่อสวิตช์, exact: true })
  if ((await ช่อง.count()) !== 1) {
    await ปิดเฟือง(แท็บ)
    return null
  }
  const ผล = {
    ติ๊ก: await ช่อง.isChecked(),
    แรก: await ช่อง.evaluate((x) => x.closest('.pk-แผงคำเดิม')?.querySelector('input[type="checkbox"]') === x),
    ของกรีก: await กล่อง.locator('[data-ปุ่มสัญลักษณ์กาล], [data-แผงเครื่องหมาย]').count(),
  }
  await ปิดเฟือง(แท็บ)
  return ผล
}

async function ตั้งสวิตช์(แท็บ, ติ๊ก, เฟือง = เฟืองของหน้า) {
  const กล่อง = await เปิดเฟือง(แท็บ, เฟือง)
  if (!กล่อง) throw new Error(`กดเฟืองแล้ว ⛔ มีกล่อง`)
  const ช่อง = กล่อง.getByRole('checkbox', { name: ชื่อสวิตช์, exact: true })
  if (ติ๊ก) await ช่อง.check()
  else await ช่อง.uncheck()
  await ปิดเฟือง(แท็บ)
  await รอหน้านิ่ง(แท็บ)
  await แท็บ.evaluate(() => new Promise((r) => setTimeout(r, 300)))
}

/** แผง Aa มีช่องติ๊กชื่อนี้ไหม ⇒ จำนวน */
async function สวิตช์ในAa(แท็บ) {
  await กางแผงAa(แท็บ)
  const n = await แท็บ.locator('#pk-แผงAa').getByRole('checkbox', { name: ชื่อสวิตช์, exact: true }).count()
  await พับแผงAa(แท็บ)
  return n
}

/** วัดทุกปุ่มคำที่ตาเห็น ⇒ ตัวเดิม · คำแปล · ภาพกาล · เครื่องหมายที่คำแปลถือ */
const วัด = (แท็บ, ใน = '.pk-ตัวบท') =>
  แท็บ.evaluate(
    ([sel, กรีก, ใน]) => {
      const เห็น = (e) => !!e && e.getClientRects().length > 0 && e.getBoundingClientRect().width > 0.5
      const ทั้งหมด = [...document.querySelectorAll(sel)].filter((b) => b.closest(ใน) && เห็น(b))
      return ทั้งหมด.map((b, i) => {
        const ด = b.querySelector(':scope > .pk-ตัวเดิม')
        const ป = b.querySelector(':scope > .pk-คำแปลคำ')
        const ก = b.querySelector(':scope > .pk-กาล')
        const r = b.getBoundingClientRect()
        const rป = ป?.getBoundingClientRect()
        const rก = ก?.getBoundingClientRect()
        const sป = ป ? getComputedStyle(ป) : null
        // ตัวหนังสือที่ตาเห็นในปุ่ม ⇒ เดินทุกโหนดตัวหนังสือ ⇒ นับเฉพาะที่พ่อแม่ถูกวาดอยู่
        const w = document.createTreeWalker(b, NodeFilter.SHOW_TEXT)
        let ตาเห็น = ''
        for (let n = w.nextNode(); n; n = w.nextNode()) {
          const p = n.parentElement
          if (p && p.checkVisibility({ visibilityProperty: true }) && !p.closest('.pk-เฉพาะเสียง')) ตาเห็น += n.textContent
        }
        return {
          i,
          ข้อ: b.closest('[data-ข้อเดิม]')?.getAttribute('data-ข้อเดิม') || '',
          ลค: (b.getAttribute('data-ลค') || '').split(/\s+/).filter(Boolean),
          กว้าง: r.width,
          สูง: r.height,
          เห็นตัวเดิม: เห็น(ด),
          มีตัวเดิม: !!ด?.textContent.trim(),
          กรีกที่ตาเห็น: new RegExp(กรีก).test(ตาเห็น),
          คำแปล: (ป?.textContent || '').trim(),
          เห็นคำแปล: เห็น(ป),
          ขนาดคำแปล: sป ? parseFloat(sป.fontSize) : 0,
          มีกาล: !!ก && !ก.hasAttribute('data-ซ่อน'),
          เห็นกาล: !!ก && เห็น(ก) && getComputedStyle(ก).visibility !== 'hidden',
          กาลแถวเดียวกัน: !!(rก && rป) && Math.abs(rก.top + rก.height / 2 - (rป.top + rป.height / 2)) <= rป.height / 2 + 2,
          กาลหน้าคำ: !!(rก && rป) && rก.right <= rป.left + 1,
          กรอบ: sป ? sป.borderTopStyle !== 'none' && parseFloat(sป.borderTopWidth) > 0 : false,
          เส้นใต้: sป ? sป.textDecorationLine.includes('underline') : false,
          สี: sป?.color || '',
          เอียง: sป?.fontStyle === 'italic',
        }
      })
    },
    [ปุ่มคำ, ตัวกรีก.source, ใน],
  )

/** เครื่องหมายแต่ละชนิดต้องเห็นที่คำแปล ⇒ คืนรายการที่ผิด และจำนวนที่ตรวจได้ */
function ตรวจเครื่องหมาย(คำ, ชื่อ) {
  const ผิด = []
  let ตรวจ = 0
  const ต้อง = [
    [['rs', 'rd', 'gb', 'dg'], (x) => x.กรอบ, 'กรอบ'],
    [['u', 'ub', 'ud'], (x) => x.เส้นใต้, 'เส้นใต้'],
    [['bl'], (x) => x.สี === 'rgb(0, 0, 255)', 'สีน้ำเงิน'],
    // ⭐ ม่วงชมพูบนพื้นสี (gg · cy · ye) ⇒ #B000B0 ⇒ เฉดเดิมเข้มขึ้นให้ถึง 4.5:1 (SC 1.4.3 ⇒ เหตุผลอยู่ใต้กฎ `mg` ใน `คำเน้น.css`)
    //   ⇒ ⛔ ผ่อน ⇒ ยังต้องเป็นสีเดียวตรงตัวตามพื้นที่คำนั้นอยู่ ⇒ พื้นครีม #CC00CC เท่าเดิม
    [['mg'], (x) => x.สี === (x.ลค.some((t) => ['gg', 'cy', 'ye'].includes(t)) ? 'rgb(176, 0, 176)' : 'rgb(204, 0, 204)'), 'สีม่วงชมพู'],
    [['it'], (x) => x.เอียง, 'ตัวเอียง'],
  ]
  for (const x of คำ)
    for (const [โทเค็น, ผ่าน, ชนิด] of ต้อง) {
      if (!x.ลค.some((t) => โทเค็น.includes(t))) continue
      // ⭐ สีน้ำเงินกับม่วงชมพูซ้อนกันได้ ⇒ ม่วงชมพู (คำพูดซ้อน) ชนะ ⇒ คำที่มีทั้งคู่ตรวจแค่ม่วงชมพู
      if (ชนิด === 'สีน้ำเงิน' && x.ลค.includes('mg')) continue
      ตรวจ++
      if (!ผ่าน(x)) ผิด.push(`② ${ชื่อ} ⇒ ${x.ข้อ} "${x.คำแปล}" มี ${ชนิด} (${x.ลค.join(' ')}) แต่คำแปลไม่มี`)
    }
  return { ผิด, ตรวจ }
}

/** ① ถึง ⑤ บนจอเดียว */
async function ตรวจจอ(กว้าง, ยัด = {}) {
  const ชื่อ = `มาระโก 13 จอ ${กว้าง}`
  const ผิด = []
  const { ctx, แท็บ } = await เปิด(กว้าง, ยัด)
  try {
    // ① ⇒ สวิตช์อยู่ในกล่องเฟือง · ช่องติ๊กแรก · ติ๊กอยู่ · ตัวกรีกเห็น
    const ส = await อ่านสวิตช์(แท็บ)
    if (!ส) {
      ผิด.push(`① ${ชื่อ} ⇒ กล่องเฟืองบนหัวคอลัมน์คำกรีก ⛔ มีช่องติ๊ก "${ชื่อสวิตช์}"`)
      return ผิด
    }
    if (!ส.แรก) ผิด.push(`① ${ชื่อ} ⇒ สวิตช์ ⛔ เป็นช่องติ๊กแรกในกล่องเฟือง`)
    if (!ส.ของกรีก) ผิด.push(`① ${ชื่อ} ⇒ กล่องเฟืองของคำกรีก ⛔ มีสัญลักษณ์กาลกับเครื่องหมายแล้ว`)
    if (!ส.ติ๊ก) ผิด.push(`① ${ชื่อ} ⇒ ค่าตั้งต้นของสวิตช์ ⛔ ติ๊ก ⇒ คนที่ใช้อยู่จะเห็นหน้าเปลี่ยน`)
    const ก่อน = await วัด(แท็บ)
    if (ก่อน.length < 20) ผิด.push(`① ${ชื่อ} ⇒ เห็นปุ่มคำแค่ ${ก่อน.length} ปุ่ม ⇒ คอลัมน์คำกรีกไม่ขึ้น ⇒ ด่านไม่ได้ตรวจอะไร`)
    if (!ก่อน.every((x) => x.เห็นตัวเดิม)) ผิด.push(`① ${ชื่อ} ⇒ ค่าตั้งต้นแต่ตัวกรีกไม่เห็น ${ก่อน.filter((x) => !x.เห็นตัวเดิม).length} ปุ่ม`)
    const กาลก่อน = ก่อน.filter((x) => x.มีกาล).length
    const ขนาดก่อน = ก่อน[0]?.ขนาดคำแปล

    // ② ⇒ เอาติ๊กออก
    await ตั้งสวิตช์(แท็บ, false)
    if (ยัด.หลังซ่อน) await แท็บ.evaluate(ยัด.หลังซ่อน)
    const ซ่อน = await ตรวจซ่อน(แท็บ, ชื่อ, กาลก่อน, กว้าง)
    ผิด.push(...ซ่อน)

    // ③ ⇒ กดคำที่มีสัญลักษณ์กาล ⇒ การ์ดขึ้น
    const เป้า = แท็บ.locator(`.pk-ตัวบท ${ปุ่มคำ}:has(> .pk-กาล):visible`).first()
    await เป้า.scrollIntoViewIfNeeded()
    await เป้า.click()
    const การ์ด = await แท็บ
      .waitForSelector('[data-การ์ดคำ] .pk-ข้อมูลคำ', { timeout: 15000 })
      .then(() => true)
      .catch(() => false)
    if (!การ์ด) ผิด.push(`③ ${ชื่อ} ⇒ ซ่อนตัวกรีกแล้วกดคำ "${await เป้า.textContent()}" ⇒ การ์ดความหมาย ⛔ ขึ้น`)
    await แท็บ.keyboard.press('Escape')
    await แท็บ.waitForSelector('[data-การ์ดคำ]', { state: 'detached', timeout: 5000 }).catch(() => {})

    // ④ ⇒ โหลดใหม่ ⇒ ยังซ่อน
    await แท็บ.reload({ waitUntil: 'domcontentloaded' })
    await รอหน้า(แท็บ)
    const หลังโหลด = await วัด(แท็บ)
    const ยังเห็น = หลังโหลด.filter((x) => x.เห็นตัวเดิม).length
    if (ยังเห็น) ผิด.push(`④ ${ชื่อ} ⇒ โหลดหน้าใหม่แล้วตัวกรีกกลับมา ${ยังเห็น} ปุ่ม ⇒ เว็บจำค่าไม่ได้`)
    const ส2 = await อ่านสวิตช์(แท็บ)
    if (ส2?.ติ๊ก !== false) ผิด.push(`④ ${ชื่อ} ⇒ โหลดหน้าใหม่แล้วสวิตช์ ${ส2 ? 'กลับมาติ๊ก' : 'หายไป'}`)

    // ⑤ ⇒ ติ๊กกลับ
    await ตั้งสวิตช์(แท็บ, true)
    const คืน = await วัด(แท็บ)
    const ไม่กลับ = คืน.filter((x) => !x.เห็นตัวเดิม).length
    if (ไม่กลับ) ผิด.push(`⑤ ${ชื่อ} ⇒ ติ๊กกลับแล้วตัวกรีกยังไม่เห็น ${ไม่กลับ} ปุ่ม`)
    if (คืน[0] && Math.abs(คืน[0].ขนาดคำแปล - ขนาดก่อน) > 0.1)
      ผิด.push(`⑤ ${ชื่อ} ⇒ ติ๊กกลับแล้วคำแปลขนาด ${คืน[0].ขนาดคำแปล} จุด ⇒ ก่อนซ่อน ${ขนาดก่อน} จุด`)
  } catch (เหตุ) {
    ผิด.push(`① ${ชื่อ} ⇒ ${เหตุ.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ผิด
}

/** ② ⇒ ตอนซ่อนอยู่ */
async function ตรวจซ่อน(แท็บ, ชื่อ, กาลก่อน, กว้าง) {
  const ผิด = []
  const คำ = await วัด(แท็บ)
  const มีกรีก = คำ.filter((x) => x.เห็นตัวเดิม || x.กรีกที่ตาเห็น)
  if (มีกรีก.length) ผิด.push(`② ${ชื่อ} ⇒ เอาติ๊กออกแล้วยังเห็นตัวกรีก ${มีกรีก.length} ปุ่ม เช่น ${มีกรีก[0].ข้อ} "${มีกรีก[0].คำแปล}"`)
  const ไม่มีแปล = คำ.filter((x) => !x.เห็นคำแปล || !x.คำแปล)
  if (ไม่มีแปล.length) ผิด.push(`② ${ชื่อ} ⇒ คำแปลอังกฤษไม่เห็น ${ไม่มีแปล.length} ปุ่ม เช่น ${ไม่มีแปล[0].ข้อ}`)
  const กาล = คำ.filter((x) => x.มีกาล)
  if (กาล.length !== กาลก่อน) ผิด.push(`② ${ชื่อ} ⇒ สัญลักษณ์กาล ${กาล.length} ตัว ⇒ ก่อนซ่อน ${กาลก่อน} ตัว`)
  if (!กาลก่อน) ผิด.push(`② ${ชื่อ} ⇒ ไม่มีสัญลักษณ์กาลบนหน้าเลย ⇒ ด่านไม่ได้ตรวจข้อนี้`)
  const กาลเพี้ยน = กาล.filter((x) => !x.เห็นกาล || !x.กาลแถวเดียวกัน || !x.กาลหน้าคำ)
  if (กาลเพี้ยน.length)
    ผิด.push(`② ${ชื่อ} ⇒ สัญลักษณ์กาล ${กาลเพี้ยน.length} ตัวไม่เห็น หรือไม่อยู่หน้าคำอังกฤษแถวเดียวกัน เช่น ${กาลเพี้ยน[0].ข้อ} "${กาลเพี้ยน[0].คำแปล}"`)
  const ม = ตรวจเครื่องหมาย(คำ, ชื่อ)
  ผิด.push(...ม.ผิด)
  if (!ม.ตรวจ) ผิด.push(`② ${ชื่อ} ⇒ ไม่มีคำที่มีเครื่องหมายให้ตรวจ ⇒ ด่านไม่ได้ตรวจข้อนี้`)
  const เล็ก = คำ.filter((x) => x.กว้าง < 43.5 || x.สูง < 23.5)
  if (เล็ก.length)
    ผิด.push(`② ${ชื่อ} ⇒ ปุ่มคำแคบกว่า 44 หรือเตี้ยกว่า 24 จุด ${เล็ก.length} ปุ่ม เช่น ${เล็ก[0].ข้อ} ${Math.round(เล็ก[0].กว้าง)}×${Math.round(เล็ก[0].สูง)}`)
  // ชื่อที่ได้ยิน ⇒ 5 ปุ่มแรกที่มีสัญลักษณ์กาล + 5 ปุ่มแรก
  const ตัวอย่าง = แท็บ.locator(`.pk-ตัวบท ${ปุ่มคำ}:visible`)
  for (let i = 0; i < Math.min(5, คำ.length); i++) {
    const สรุป = await ตัวอย่าง.nth(i).ariaSnapshot()
    const ตรง = คำ[i]?.คำแปล && สรุป.includes(คำ[i].คำแปล.split(/\s+/)[0])
    if (ตัวกรีก.test(สรุป) || !ตรง) ผิด.push(`② ${ชื่อ} ⇒ ชื่อที่ได้ยินของปุ่มที่ ${i + 1} ⇒ ${สรุป.trim()} ⇒ ต้องมีคำอังกฤษ "${คำ[i]?.คำแปล}" และ ⛔ มีตัวกรีก`)
  }
  if (กว้าง < 768) {
    const ล้น = await แท็บ.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    if (ล้น > 1) ผิด.push(`② ${ชื่อ} ⇒ ซ่อนตัวกรีกแล้วหน้าล้นซ้ายขวา ${ล้น} จุด`)
  }
  ผิด.push(...(await ตรวจขอบคำ(แท็บ, ชื่อ, กว้าง)))
  return ผิด
}

/** ⑩ ⇒ ตัวหนังสือคำแปลจริง (ช่วงตัวอักษร ⛔ ใช่กรอบปุ่ม) ⇒ ช่องระหว่างคำ · ช่องระหว่างบรรทัดในคำเทียบกับระหว่างแถว */
async function ตรวจขอบคำ(แท็บ, ชื่อ, กว้าง) {
  const ผิด = []
  const ว = await แท็บ.evaluate((sel) => {
    const บรรทัดของ = (t) => {
      const r = document.createRange()
      r.selectNodeContents(t)
      const ชิ้น = [...r.getClientRects()].filter((x) => x.width > 0.5 && x.height > 0.5)
      const แถว = []
      for (const x of ชิ้น) {
        const ก = แถว.find((y) => Math.abs(y.top - x.top) < 3)
        if (ก) Object.assign(ก, { left: Math.min(ก.left, x.left), right: Math.max(ก.right, x.right), bottom: Math.max(ก.bottom, x.bottom) })
        else แถว.push({ top: x.top, bottom: x.bottom, left: x.left, right: x.right })
      }
      return แถว.sort((a, b) => a.top - b.top)
    }
    const ช่อง = []
    const ในคำ = []
    const ระหว่างแถว = []
    for (const ข of document.querySelectorAll('.pk-ตัวบท .pk-ข้อคำ')) {
      const คำ = [...ข.querySelectorAll(sel.replace('.pk-ข้อคำ > ', ':scope > '))]
        .map((b) => ({ b, t: b.querySelector(':scope > .pk-คำแปลคำ') }))
        .filter((x) => x.t && x.b.getClientRects().length)
        .map((x) => ({ ...x, ล: บรรทัดของ(x.t), fs: parseFloat(getComputedStyle(x.t).fontSize), กล่อง: x.b.getBoundingClientRect() }))
        .filter((x) => x.ล.length)
      // จัดเป็นแถวตามขอบบนของปุ่ม
      const แถว = []
      for (const x of คำ) {
        const ก = แถว.at(-1)
        if (ก && Math.abs(ก[0].กล่อง.top - x.กล่อง.top) < 3) ก.push(x)
        else แถว.push([x])
      }
      for (const ก of แถว)
        for (let i = 1; i < ก.length; i++) {
          const ซ = ก[i - 1].ล.at(-1)
          const ข2 = ก[i].ล[0]
          ช่อง.push({ เท่า: (ข2.left - ซ.right) / ก[i].fs, คำ: `${ก[i - 1].t.textContent.trim()} | ${ก[i].t.textContent.trim()}` })
        }
      for (const x of คำ)
        for (let i = 1; i < x.ล.length; i++) ในคำ.push({ ช่อง: x.ล[i].top - x.ล[i - 1].bottom, คำ: x.t.textContent.trim() })
      for (let i = 1; i < แถว.length; i++) {
        const ล่าง = Math.max(...แถว[i - 1].map((x) => x.ล.at(-1).bottom))
        const บน = Math.min(...แถว[i].map((x) => x.ล[0].top))
        ระหว่างแถว.push(บน - ล่าง)
      }
    }
    if (!ในคำ.length) {
      // บีบคำแปลยาวที่สุดให้ตัดบรรทัด ⇒ วัด ⇒ คืน
      const ยาว = [...document.querySelectorAll('.pk-ตัวบท ' + sel + ' > .pk-คำแปลคำ')]
        .filter((t) => t.getClientRects().length && /\s/.test(t.textContent.trim()))
        .sort((a, b) => b.textContent.length - a.textContent.length)[0]
      if (ยาว) {
        const เดิม = ยาว.style.maxWidth
        ยาว.style.maxWidth = '3em'
        const ล = บรรทัดของ(ยาว)
        for (let i = 1; i < ล.length; i++) ในคำ.push({ ช่อง: ล[i].top - ล[i - 1].bottom, คำ: ยาว.textContent.trim() + ' (บีบ)' })
        ยาว.style.maxWidth = เดิม
      }
    }
    return { ช่อง, ในคำ, ระหว่างแถว }
  }, ปุ่มคำ)
  const แคบสุด = ว.ช่อง.reduce((a, x) => (!a || x.เท่า < a.เท่า ? x : a), null)
  const แถวกลาง = [...ว.ระหว่างแถว].sort((a, b) => a - b)[Math.floor(ว.ระหว่างแถว.length / 2)]
  const ห่างสุด = ว.ในคำ.reduce((a, x) => (!a || x.ช่อง > a.ช่อง ? x : a), null)
  console.log(`🔎 ⑩ ${ชื่อ} ⇒ ช่องระหว่างคำแคบสุด ${แคบสุด?.เท่า.toFixed(2)} เท่า ("${แคบสุด?.คำ}") · ช่องระหว่างแถวค่ากลาง ${แถวกลาง?.toFixed(1)} จุด · คำตัดหลายบรรทัด ${ว.ในคำ.length} ช่อง ห่างสุด ${ห่างสุด?.ช่อง.toFixed(1)} จุด ("${ห่างสุด?.คำ}")`)
  if (!แคบสุด) ผิด.push(`⑩ ${ชื่อ} ⇒ ไม่มีคำสองคำบนแถวเดียวกันให้วัด ⇒ ด่านไม่ได้ตรวจ`)
  else if (แคบสุด.เท่า < 1.5) ผิด.push(`⑩ ${ชื่อ} ⇒ ช่องระหว่างคำ "${แคบสุด.คำ}" กว้างแค่ ${แคบสุด.เท่า.toFixed(2)} เท่าของตัวหนังสือ ⇒ ต้องอย่างน้อย 1.5 ⇒ อ่านแล้วไม่รู้ว่าคำไหนอยู่ด้วยกัน`)
  if (!แถวกลาง) ผิด.push(`⑩ ${ชื่อ} ⇒ ไม่มีสองแถวให้วัด ⇒ ด่านไม่ได้ตรวจ`)
  else if (ห่างสุด && ห่างสุด.ช่อง > แถวกลาง / 2)
    ผิด.push(`⑩ ${ชื่อ} ⇒ "${ห่างสุด.คำ}" ตัดสองบรรทัด ห่างกัน ${ห่างสุด.ช่อง.toFixed(1)} จุด ⇒ ระหว่างแถว ${แถวกลาง.toFixed(1)} จุด ⇒ ต้องไม่เกินครึ่ง ⇒ ดูเป็นคนละคำ`)
  if (!ว.ในคำ.length) ผิด.push(`⑩ ${ชื่อ} ⇒ ไม่มีคำแปลที่ตัดหลายบรรทัดให้วัด แม้บีบแล้ว ⇒ ด่านไม่ได้ตรวจ`)
  return ผิด
}

/** ⑥ ⇒ หน้าที่ ⛔ มีคำภาษาเดิม ⇒ ⛔ มีสวิตช์ ⛔ มีเฟือง */
async function ตรวจไม่มีคำเดิม(ยัด = {}) {
  const ผิด = []
  const { ctx, แท็บ } = await เปิด(1280, ยัด, { คำเดิม: false })
  try {
    if (ยัด.หลังเปิด) await แท็บ.evaluate(ยัด.หลังเปิด)
    if (await สวิตช์ในAa(แท็บ)) ผิด.push(`⑥ มาระโก 13 ⛔ เปิดคำภาษาเดิม ⇒ แผง Aa มีสวิตช์ "${ชื่อสวิตช์}" ⇒ กดแล้วไม่เกิดอะไร (ใบ #76)`)
    const เฟือง = await แท็บ.locator('[data-ปุ่ม="เครื่องมือภาษาเดิม"]').count()
    if (เฟือง) ผิด.push(`⑥ มาระโก 13 ⛔ เปิดคำภาษาเดิม ⇒ ยังมีปุ่มเฟือง ${เฟือง} ปุ่ม ⇒ กดแล้วไม่เกิดอะไร (ใบ #76)`)
  } finally {
    await ctx.close()
  }
  return ผิด
}

/** ⑦ ⇒ หน้าคำกรีก ⇒ แผง Aa ⛔ มีสวิตช์ (สวิตช์มีที่เดียว คือเฟือง) */
async function ตรวจAaไม่มีสวิตช์(กว้าง, ยัด = {}) {
  const { ctx, แท็บ } = await เปิด(กว้าง, ยัด)
  try {
    if (ยัด.หลังเปิด) await แท็บ.evaluate(ยัด.หลังเปิด)
    const n = await สวิตช์ในAa(แท็บ)
    return n ? [`⑦ มาระโก 13 จอ ${กว้าง} ⇒ แผง Aa ยังมีสวิตช์ "${ชื่อสวิตช์}" ${n} ช่อง ⇒ ต้องอยู่ในเฟืองบนหัวคอลัมน์ที่เดียว (พี่เอมขอ 17 พ.ย. 2569)`] : []
  } catch (เหตุ) {
    return [`⑦ มาระโก 13 จอ ${กว้าง} ⇒ ${เหตุ.message.split('\n')[0]}`]
  } finally {
    await ctx.close()
  }
}

/** ⑧ ⇒ คำฮีบรู ⇒ เฟืองมีสวิตช์ ⇒ ⛔ มี i ⛔ มีของกรีก ⇒ เอาติ๊กออกแล้วตัวฮีบรูหาย ⇒ ติ๊กกลับแล้วกลับมา */
async function ตรวจฮีบรู(กว้าง, ยัด = {}) {
  const ชื่อ = `นางรูธ 1 จอ ${กว้าง}`
  const ผิด = []
  const { ctx, แท็บ } = await เปิด(กว้าง, ยัด, { เล่ม: 'RUT', บทที่: 1, รอ: 'คำ' })
  try {
    if (ยัด.หลังเปิด) await แท็บ.evaluate(ยัด.หลังเปิด)
    const i = await แท็บ.locator('[data-ปุ่ม="คำอธิบายสัญลักษณ์"]').count()
    if (i) ผิด.push(`⑧ ${ชื่อ} ⇒ คำฮีบรูมีปุ่ม i ${i} ปุ่ม ⛔ (ไม่มีสัญลักษณ์ให้อธิบาย)`)
    if (await สวิตช์ในAa(แท็บ)) ผิด.push(`⑧ ${ชื่อ} ⇒ แผง Aa ยังมีสวิตช์ "${ชื่อสวิตช์}" ⇒ ต้องอยู่ในเฟืองที่เดียว`)
    const ส = await อ่านสวิตช์(แท็บ)
    if (!ส) {
      ผิด.push(`⑧ ${ชื่อ} ⇒ หัวคอลัมน์คำฮีบรู ⛔ มีเฟืองที่มีช่องติ๊ก "${ชื่อสวิตช์}"`)
      return ผิด
    }
    if (!ส.ติ๊ก) ผิด.push(`⑧ ${ชื่อ} ⇒ ค่าตั้งต้นของสวิตช์ ⛔ ติ๊ก`)
    if (ส.ของกรีก) ผิด.push(`⑧ ${ชื่อ} ⇒ กล่องเฟืองของคำฮีบรูมีสัญลักษณ์กาลหรือเครื่องหมาย ${ส.ของกรีก} ชิ้น ⛔ (ฮีบรูยังไม่มีข้อมูล ⇒ กดแล้วไม่เกิดอะไร)`)
    const ก่อน = await วัด(แท็บ)
    if (ก่อน.length < 20) ผิด.push(`⑧ ${ชื่อ} ⇒ เห็นปุ่มคำแค่ ${ก่อน.length} ปุ่ม ⇒ คอลัมน์คำฮีบรูไม่ขึ้น ⇒ ด่านไม่ได้ตรวจอะไร`)
    // ⭐ ข้อมูลฮีบรูมีคำที่ ⛔ มีตัวเดิม (คำนำหน้านามที่ซ่อนอยู่ในสระ เช่น 1:1 · 1:7 *the*) และคำที่ ⛔ มีคำแปล (เช่น לָ ใน 1:11)
    //   ⇒ นับเฉพาะคำที่มีของนั้นจริง ⇒ ⛔ ผ่อนเกณฑ์ ⇒ คำที่มีตัวฮีบรูต้องเห็นทุกคำ · คำที่มีคำแปลต้องเห็นคำแปลทุกคำ
    const มีตัว = ก่อน.filter((x) => x.มีตัวเดิม)
    if (มีตัว.length < 20) ผิด.push(`⑧ ${ชื่อ} ⇒ ปุ่มคำที่มีตัวฮีบรูแค่ ${มีตัว.length} ปุ่ม ⇒ ด่านไม่ได้ตรวจอะไร`)
    if (!มีตัว.every((x) => x.เห็นตัวเดิม)) ผิด.push(`⑧ ${ชื่อ} ⇒ ค่าตั้งต้นแต่ตัวฮีบรูไม่เห็น ${มีตัว.filter((x) => !x.เห็นตัวเดิม).length} ปุ่ม`)
    await ตั้งสวิตช์(แท็บ, false)
    const ซ่อน = await วัด(แท็บ)
    const ยังเห็น = ซ่อน.filter((x) => x.เห็นตัวเดิม || x.กรีกที่ตาเห็น)
    if (ยังเห็น.length) ผิด.push(`⑧ ${ชื่อ} ⇒ เอาติ๊กออกแล้วยังเห็นตัวฮีบรู ${ยังเห็น.length} ปุ่ม เช่น ${ยังเห็น[0].ข้อ}`)
    const มีแปล = ซ่อน.filter((x) => x.คำแปล)
    if (มีแปล.length < 20) ผิด.push(`⑧ ${ชื่อ} ⇒ ปุ่มคำที่มีคำแปลแค่ ${มีแปล.length} ปุ่ม ⇒ ด่านไม่ได้ตรวจอะไร`)
    const ไม่มีแปล = มีแปล.filter((x) => !x.เห็นคำแปล)
    if (ไม่มีแปล.length) ผิด.push(`⑧ ${ชื่อ} ⇒ เอาติ๊กออกแล้วคำแปลอังกฤษไม่เห็น ${ไม่มีแปล.length} ปุ่ม เช่น ${ไม่มีแปล[0].ข้อ}`)
    await ตั้งสวิตช์(แท็บ, true)
    const คืน = await วัด(แท็บ)
    const ไม่กลับ = คืน.filter((x) => x.มีตัวเดิม && !x.เห็นตัวเดิม).length
    if (ไม่กลับ) ผิด.push(`⑧ ${ชื่อ} ⇒ ติ๊กกลับแล้วตัวฮีบรูยังไม่เห็น ${ไม่กลับ} ปุ่ม`)
  } catch (เหตุ) {
    ผิด.push(`⑧ ${ชื่อ} ⇒ ${เหตุ.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ผิด
}

/** ⑨ ⇒ คอลัมน์คนละบทที่เป็นคำกรีก (มาระโก 12 คู่กับหน้ามาระโก 13 · คอลัมน์คำภาษาเดิมของหน้าปิด) ⇒ เฟืองบนหัวของมันมีสวิตช์ ⇒ ใช้ได้จริง */
async function ตรวจคอลัมน์คนละที่(กว้าง, ยัด = {}) {
  const ชื่อ = `มาระโก 13 + คอลัมน์คำกรีกมาระโก 12 จอ ${กว้าง}`
  const ผิด = []
  const ใน = '.pk-ตอนเทียบ, .pk-ตัวบท'
  const { ctx, แท็บ } = await เปิด(กว้าง, ยัด, { คำเดิม: false, ต่อท้าย: '&p=MRK.12.SBLGNT', รอ: 'คำ' })
  try {
    if (ยัด.หลังเปิด) await แท็บ.evaluate(ยัด.หลังเปิด)
    const เฟืองหน้า = await แท็บ.locator(เฟืองของหน้า).count()
    if (เฟืองหน้า) ผิด.push(`⑨ ${ชื่อ} ⇒ คอลัมน์คำภาษาเดิมของหน้าปิดอยู่แต่ยังมีเฟือง ${เฟืองหน้า} ปุ่ม ⇒ ด่านตั้งหน้าผิด`)
    const ส = await อ่านสวิตช์(แท็บ, เฟืองของเทียบ)
    if (!ส) {
      ผิด.push(`⑨ ${ชื่อ} ⇒ หัวคอลัมน์คำกรีกคนละบท ⛔ มีเฟืองที่มีช่องติ๊ก "${ชื่อสวิตช์}" ⇒ หน้านี้ไม่มีที่ปิดตัวอักษร`)
      return ผิด
    }
    if (!ส.ติ๊ก) ผิด.push(`⑨ ${ชื่อ} ⇒ ค่าตั้งต้นของสวิตช์ ⛔ ติ๊ก`)
    const ก่อน = await วัด(แท็บ, ใน)
    if (ก่อน.length < 20) ผิด.push(`⑨ ${ชื่อ} ⇒ เห็นปุ่มคำแค่ ${ก่อน.length} ปุ่ม ⇒ คอลัมน์คำกรีกคนละบทไม่ขึ้น ⇒ ด่านไม่ได้ตรวจอะไร`)
    await ตั้งสวิตช์(แท็บ, false, เฟืองของเทียบ)
    const ซ่อน = await วัด(แท็บ, ใน)
    const ยังเห็น = ซ่อน.filter((x) => x.เห็นตัวเดิม || x.กรีกที่ตาเห็น)
    if (ยังเห็น.length) ผิด.push(`⑨ ${ชื่อ} ⇒ เอาติ๊กออกแล้วยังเห็นตัวกรีก ${ยังเห็น.length} ปุ่ม เช่น ${ยังเห็น[0].ข้อ}`)
    const ไม่มีแปล = ซ่อน.filter((x) => !x.เห็นคำแปล || !x.คำแปล)
    if (ไม่มีแปล.length) ผิด.push(`⑨ ${ชื่อ} ⇒ เอาติ๊กออกแล้วคำแปลอังกฤษไม่เห็น ${ไม่มีแปล.length} ปุ่ม`)
  } catch (เหตุ) {
    ผิด.push(`⑨ ${ชื่อ} ⇒ ${เหตุ.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ผิด
}

/** ยัดช่องติ๊กชื่อเดียวกันใส่แผง Aa ทุกครั้งที่กาง ⇒ ปลอมว่าสวิตช์กลับไปอยู่ที่เดิม */
function ยัดสวิตช์ในAa() {
  new MutationObserver(() => {
    const แผง = document.getElementById('pk-แผงAa')
    if (แผง && !แผง.querySelector('[data-สวิตช์="ตัวเดิม"]')) {
      const ป้าย = document.createElement('label')
      ป้าย.className = 'pk-ช่องติ๊ก'
      ป้าย.innerHTML = '<input type="checkbox" data-สวิตช์="ตัวเดิม" checked><span>แสดงตัวอักษรกรีก/ฮีบรู</span>'
      แผง.append(ป้าย)
    }
  }).observe(document.body, { childList: true, subtree: true })
}
/** ถอดสวิตช์ออกจากกล่องเฟืองทุกครั้งที่เปิด ⇒ ปลอมว่าสวิตช์หายจากเฟือง ⇒ ติดก่อนโค้ดของเว็บ (อยู่รอดข้ามการโหลดใหม่) */
function ถอดสวิตช์จากเฟือง() {
  const ถอด = () =>
    new MutationObserver(() => {
      for (const x of document.querySelectorAll('.pk-แผงคำเดิม [data-สวิตช์="ตัวเดิม"]')) x.closest('label')?.remove()
    }).observe(document.body, { childList: true, subtree: true })
  if (document.body) ถอด()
  else document.addEventListener('DOMContentLoaded', ถอด)
}
/** ยัดปุ่ม i ข้างเฟืองของหัวคอลัมน์ภาษาเดิม ⇒ ปลอมว่าคำฮีบรูมีปุ่มที่ไม่มีอะไรให้อธิบาย */
function ยัดปุ่มi() {
  const ฟ = document.querySelector('[data-ปุ่ม="เครื่องมือภาษาเดิม"]')
  const ป = document.createElement('button')
  ป.setAttribute('data-ปุ่ม', 'คำอธิบายสัญลักษณ์')
  ป.textContent = 'i'
  ฟ?.after(ป)
}

/** ⑩ ⇒ หน้าเดียวกับภาพของเจ้าของงาน ⇒ ช่องที่เพิ่ม ⛔ ทำให้แถวมากขึ้นเกิน 15% */
async function ตรวจแถวจอแคบคู่(ยัด = {}) {
  const ชื่อ = 'มาระโก 14 TCV คู่ SBLGNT จอ 375'
  const ผิด = []
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: 375, height: 812 } })
  try {
    await ctx.addInitScript(() => {
      localStorage.setItem('phrakham.versions', JSON.stringify(['TCV', 'SBLGNT']))
      localStorage.setItem('phrakham.view', JSON.stringify({ ภาษาเดิม: true, แสดงตัวเดิม: false }))
    })
    const แท็บ = await ctx.newPage()
    await แท็บ.goto(`${ฐาน}/read/MRK?c=14&t=TCV,SBLGNT`, { waitUntil: 'domcontentloaded' })
    await แท็บ.waitForSelector('.pk-ซ่อนตัวเดิม .pk-ตัวบท .pk-ข้อคำ > .pk-คำ', { timeout: 30000 })
    await รอหน้านิ่ง(แท็บ)
    if (ยัด.css) await แท็บ.addStyleTag({ content: ยัด.css })
    const นับแถว = () =>
      แท็บ.evaluate(() => {
        let n = 0
        for (const ข of document.querySelectorAll('.pk-ตัวบท .pk-ข้อคำ')) {
          const บน = new Set([...ข.querySelectorAll(':scope > .pk-คำ')].filter((b) => b.getClientRects().length).map((b) => Math.round(b.getBoundingClientRect().top)))
          n += บน.size
        }
        return n
      })
    const แถวจริง = await นับแถว()
    const ถอด = await แท็บ.addStyleTag({
      content: '.pk-ซ่อนตัวเดิม .pk-ข้อคำ > .pk-คำ { margin-inline: 0.28em !important; } .pk-ซ่อนตัวเดิม .pk-ตัวบท .pk-ข้อคำ { margin-inline-end: 0 !important; }',
    })
    const แถวเดิม = await นับแถว()
    await ถอด.evaluate((e) => e.remove())
    console.log(`🔎 ⑩ ${ชื่อ} ⇒ แถวของคำแปล ${แถวจริง} แถว ⇒ ถอดช่องที่เพิ่มออก ${แถวเดิม} แถว`)
    if (แถวเดิม < 100) ผิด.push(`⑩ ${ชื่อ} ⇒ นับแถวคำแปลได้แค่ ${แถวเดิม} ⇒ ด่านไม่ได้ตรวจ`)
    else if (แถวจริง > แถวเดิม * 1.15)
      ผิด.push(`⑩ ${ชื่อ} ⇒ ช่องระหว่างคำทำให้แถวเพิ่มจาก ${แถวเดิม} เป็น ${แถวจริง} แถว ⇒ ต้องไม่เกิน 15% ⇒ แถวรับคำได้น้อยลง ข้อยาวเป็นหาง`)
  } catch (เหตุ) {
    ผิด.push(`⑩ ${ชื่อ} ⇒ ${เหตุ.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ผิด
}

// ---------------------------------------------------------------- ⑪ จุดคั่นคำ
const ชื่อสวิตช์จุด = 'แสดงจุดคั่นคำ'

/** จุดที่ตาเห็นบนหน้า ⇒ คืนจำนวนจุด · คู่ที่ขาดจุด · จุดที่เกิน (ท้ายแถว) · จุดที่ทับตัวหนังสือหรือเยื้อง · จุดที่มีตัวอักษร */
const วัดจุด = (แท็บ) =>
  แท็บ.evaluate(() => {
    const ผล = { จุด: 0, ขาด: [], เกิน: [], ผิดที่: [], มีอักษร: 0 }
    // ⭐ กรอบของตัวหนังสือและรูปที่ตาเห็น ⇒ ⛔ นับคำอ่านของโปรแกรมอ่านหน้าจอ (`.pk-เฉพาะเสียง` กล่อง 1 จุดแต่ตัวหนังสือมีกรอบยาว)
    const เนื้อ = (e) => {
      const ได้ = []
      const r = document.createRange()
      const เดิน = document.createTreeWalker(e, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT)
      for (let n = เดิน.nextNode(); n; n = เดิน.nextNode()) {
        if (n.nodeType === Node.TEXT_NODE) {
          if (n.parentElement.closest('.pk-เฉพาะเสียง')) continue
          r.selectNodeContents(n)
          ได้.push(...r.getClientRects())
        } else if (n instanceof SVGSVGElement && !n.closest('.pk-เฉพาะเสียง')) ได้.push(n.getBoundingClientRect())
      }
      return ได้.filter((x) => x.width > 0)
    }
    const ป้าย = (e) => (e.querySelector('.pk-คำแปลคำ')?.textContent || e.textContent).trim().slice(0, 24)
    for (const ข้อ of document.querySelectorAll('.pk-ข้อคำ')) {
      const คำ = [...ข้อ.querySelectorAll(':scope > .pk-คำ')].filter((x) => x.getClientRects().length)
      for (let i = 0; i < คำ.length; i++) {
        const a = คำ[i]
        const ส = getComputedStyle(a, '::after')
        const เห็น = ส.content !== 'none' && ส.display !== 'none' && parseFloat(ส.width) > 0 && parseFloat(ส.opacity) > 0
        const ก = a.getBoundingClientRect()
        const b = คำ[i + 1]
        const ข = b?.getBoundingClientRect()
        const แถวเดียว = !!ข && Math.abs(ข.top - ก.top) <= 2
        if (!เห็น) {
          if (แถวเดียว && ผล.ขาด.length < 5) ผล.ขาด.push(`${ป้าย(a)} | ${ป้าย(b)}`)
          continue
        }
        ผล.จุด++
        if (ส.content !== '""') ผล.มีอักษร++
        if (!แถวเดียว) {
          if (ผล.เกิน.length < 5) ผล.เกิน.push(ป้าย(a))
          continue
        }
        const สก = getComputedStyle(a)
        const ขนาด = parseFloat(ส.width)
        const x = ก.left + parseFloat(สก.borderLeftWidth) + parseFloat(ส.left)
        const y = ก.top + parseFloat(สก.borderTopWidth) + parseFloat(ส.top)
        const นี่ = เนื้อ(a)
        const นั่น = เนื้อ(b)
        if (!นี่.length || !นั่น.length) continue
        const ไปขวา = ข.left >= ก.left
        const ขอบนี่ = ไปขวา ? Math.max(...นี่.map((r) => r.right)) : Math.min(...นี่.map((r) => r.left))
        // ⭐ คำถัดไปมีป้ายอักษรหน้าคำ (`::before` ⇒ ⛔ อยู่ในกรอบตัวหนังสือ) ⇒ ป้ายเริ่มที่ขอบปุ่ม
        const ขอบนั่น = b.hasAttribute('data-ป้าย')
          ? ไปขวา ? ข.left : ข.right
          : ไปขวา ? Math.min(...นั่น.map((r) => r.left)) : Math.max(...นั่น.map((r) => r.right))
        const ช่อง = Math.abs(ขอบนั่น - ขอบนี่)
        const ห่างนี่ = Math.abs(x - ขอบนี่) - ขนาด / 2
        const ห่างนั่น = Math.abs(ขอบนั่น - x) - ขนาด / 2
        const ระหว่าง = ไปขวา ? x > ขอบนี่ && x < ขอบนั่น : x < ขอบนี่ && x > ขอบนั่น
        const บรรทัด = เนื้อ(a.querySelector('.pk-คำแปลคำ') || a)[0]
        const สูงพอดี = !!บรรทัด && y > บรรทัด.top + บรรทัด.height * 0.25 && y < บรรทัด.bottom - บรรทัด.height * 0.25
        if (!ระหว่าง || ห่างนี่ < 1 || ห่างนั่น < 1 || Math.abs(x - (ขอบนี่ + ขอบนั่น) / 2) > ช่อง / 4 || !สูงพอดี) {
          if (ผล.ผิดที่.length < 5)
            ผล.ผิดที่.push(`${ป้าย(a)} · ${ป้าย(b)} ⇒ จุดห่างคำแรก ${ห่างนี่.toFixed(1)} คำถัดไป ${ห่างนั่น.toFixed(1)} จุด${สูงพอดี ? '' : ' ⇒ ⛔ อยู่กลางบรรทัด'}`)
          else if (ผล.ผิดที่.length === 5) ผล.ผิดที่.push('…')
        }
      }
    }
    return ผล
  })

async function ตรวจจุดคั่น(ยัด = {}) {
  const ชื่อ = 'มาระโก 14 SBLGNT จอ 375'
  const ผิด = []
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: 375, height: 812 } })
  const รอจัด = async (แท็บ) => {
    await แท็บ.waitForSelector('.pk-ตัวบท .pk-ข้อคำ > .pk-คำ', { timeout: 30000 })
    await รอหน้านิ่ง(แท็บ)
    await แท็บ.waitForFunction(() => document.fonts.status === 'loaded' && document.querySelector('.pk-ตัวบท')?.dataset.จัดแถว === 'เสร็จ', null, { timeout: 30000 })
    await แท็บ.evaluate(() => new Promise((r) => setTimeout(r, 300)))
    if (ยัด.css) await แท็บ.addStyleTag({ content: ยัด.css })
    if (ยัด.หลังเปิด) await แท็บ.evaluate(ยัด.หลังเปิด)
  }
  const สวิตช์จุด = (กล่อง) => กล่อง.getByRole('checkbox', { name: ชื่อสวิตช์จุด, exact: true })
  try {
    // ⭐ ⛔ ใส่ `จุดคั่นคำ` ⇒ เครื่องผู้อ่านที่ยัง ⛔ เคยตั้ง ⇒ ต้องได้ค่าตั้งต้น (เปิด)
    await ctx.addInitScript(() => {
      if (sessionStorage.getItem('ตั้งแล้ว')) return
      localStorage.setItem('phrakham.versions', JSON.stringify(['SBLGNT']))
      localStorage.setItem('phrakham.view', JSON.stringify({ จัดวาง: 'แยกตามข้อ', ภาษาเดิม: true, แสดงตัวเดิม: false }))
      sessionStorage.setItem('ตั้งแล้ว', '1')
    })
    const แท็บ = await ctx.newPage()
    await แท็บ.goto(`${ฐาน}/read/MRK?c=14&t=SBLGNT`, { waitUntil: 'domcontentloaded' })
    await รอจัด(แท็บ)
    const ก่อน = await วัดจุด(แท็บ)
    console.log(`🔎 ⑪ ${ชื่อ} ⇒ จุด ${ก่อน.จุด} จุด ⇒ ขาด ${ก่อน.ขาด.length} · ท้ายแถว ${ก่อน.เกิน.length} · ผิดที่ ${ก่อน.ผิดที่.length}`)
    if (ก่อน.จุด < 100) ผิด.push(`⑪ ${ชื่อ} ⇒ ค่าตั้งต้นต้องมีจุดคั่นคำ ⇒ เห็นแค่ ${ก่อน.จุด} จุด`)
    if (ก่อน.ขาด.length) ผิด.push(`⑪ ${ชื่อ} ⇒ คำที่อยู่แถวเดียวกันไม่มีจุดคั่น ⇒ ${ก่อน.ขาด.join(' · ')}`)
    if (ก่อน.เกิน.length) ผิด.push(`⑪ ${ชื่อ} ⇒ มีจุดที่ท้ายแถว ⇒ ${ก่อน.เกิน.join(' · ')}`)
    if (ก่อน.ผิดที่.length) ผิด.push(`⑪ ${ชื่อ} ⇒ จุดทับหรือชิดตัวหนังสือ หรือไม่อยู่กลางช่อง ⇒ ${ก่อน.ผิดที่.join(' · ')}`)
    if (ก่อน.มีอักษร) ผิด.push(`⑪ ${ชื่อ} ⇒ จุด ${ก่อน.มีอักษร} จุดเป็นตัวอักษร ⇒ คัดลอกแล้วติด และโปรแกรมอ่านหน้าจออ่านออกเสียง`)

    // สวิตช์ในเฟือง ⇒ ถัดจากสวิตช์ตัวเดิม ⇒ ติ๊กอยู่
    let กล่อง = await เปิดเฟือง(แท็บ)
    if (!กล่อง) throw new Error('กดเฟืองแล้ว ⛔ มีกล่อง')
    const ช่อง = สวิตช์จุด(กล่อง)
    if ((await ช่อง.count()) !== 1) throw new Error(`เฟือง ⛔ มีสวิตช์ "${ชื่อสวิตช์จุด}"`)
    const ที่ = await ช่อง.evaluate((x) => {
      const ทั้งหมด = [...x.closest('.pk-แผงคำเดิม').querySelectorAll('input[type="checkbox"]')]
      return { ลำดับ: ทั้งหมด.indexOf(x), ก่อนหน้า: ทั้งหมด[ทั้งหมด.indexOf(x) - 1]?.dataset.สวิตช์ ?? '' }
    })
    // ⭐ ช่องติ๊กทุกช่องในกล่องสีเดียวกัน (@krisada ทัก 20 พ.ย. 2569 ⇒ ของเดิมบนสีน้ำเงิน ล่างสีดำ) ⇒ ⛔ สีปริยายของเบราว์เซอร์ (`auto`)
    const สี = await กล่อง.locator('input[type="checkbox"]').evaluateAll((xs) => [...new Set(xs.map((x) => getComputedStyle(x).accentColor))])
    if (สี.length !== 1 || สี[0] === 'auto') ผิด.push(`⑪ ${ชื่อ} ⇒ ช่องติ๊กในกล่องเฟืองต้องสีเดียวกัน (สีหมึก) ⇒ เห็น ${สี.join(' · ')}`)
    if (ที่.ก่อนหน้า !== 'ตัวเดิม') ผิด.push(`⑪ ${ชื่อ} ⇒ สวิตช์จุดต้องอยู่ถัดจากสวิตช์ตัวเดิม ⇒ อยู่ลำดับ ${ที่.ลำดับ + 1}`)
    if (!(await ช่อง.isChecked())) ผิด.push(`⑪ ${ชื่อ} ⇒ สวิตช์จุดต้องติ๊กอยู่ตั้งแต่ต้น`)
    if (await ช่อง.isDisabled()) ผิด.push(`⑪ ${ชื่อ} ⇒ ซ่อนตัวกรีกอยู่ แต่สวิตช์จุดกดไม่ได้`)
    // เอาติ๊กออก ⇒ ⛔ มีจุด ⇒ โหลดใหม่ยัง ⛔ มี
    await ช่อง.uncheck()
    await ปิดเฟือง(แท็บ)
    await แท็บ.evaluate(() => new Promise((r) => setTimeout(r, 300)))
    const ปิด = await วัดจุด(แท็บ)
    if (ปิด.จุด) ผิด.push(`⑪ ${ชื่อ} ⇒ เอาติ๊กสวิตช์จุดออกแล้ว ยังเห็น ${ปิด.จุด} จุด`)
    await แท็บ.reload({ waitUntil: 'domcontentloaded' })
    await รอจัด(แท็บ)
    const ปิดหลังโหลด = await วัดจุด(แท็บ)
    if (ปิดหลังโหลด.จุด) ผิด.push(`⑪ ${ชื่อ} ⇒ โหลดหน้าใหม่แล้วจุดกลับมา ${ปิดหลังโหลด.จุด} จุด ⇒ เว็บไม่จำค่า`)
    กล่อง = await เปิดเฟือง(แท็บ)
    await สวิตช์จุด(กล่อง).check()
    await ปิดเฟือง(แท็บ)
    await แท็บ.evaluate(() => new Promise((r) => setTimeout(r, 300)))
    const คืน = await วัดจุด(แท็บ)
    if (คืน.จุด < 100) ผิด.push(`⑪ ${ชื่อ} ⇒ ติ๊กสวิตช์จุดคืนแล้ว เห็นแค่ ${คืน.จุด} จุด`)
    // แสดงตัวกรีก ⇒ ⛔ มีจุด ⇒ สวิตช์จุดกดไม่ได้
    await ตั้งสวิตช์(แท็บ, true)
    await รอจัด(แท็บ)
    const กรีก = await วัดจุด(แท็บ)
    if (กรีก.จุด) ผิด.push(`⑪ ${ชื่อ} ⇒ แสดงตัวกรีกแล้วยังเห็น ${กรีก.จุด} จุด`)
    กล่อง = await เปิดเฟือง(แท็บ)
    if (!(await สวิตช์จุด(กล่อง).isDisabled())) ผิด.push(`⑪ ${ชื่อ} ⇒ แสดงตัวกรีกอยู่ แต่สวิตช์จุดยังกดได้ ⇒ กดแล้วไม่เกิดอะไร`)
    await ปิดเฟือง(แท็บ)
  } catch (เหตุ) {
    ผิด.push(`⑪ ${ชื่อ} ⇒ ${เหตุ.message.split('\n')[0]}`)
  } finally {
    await ctx.close()
  }
  return ผิด
}

// ---------------------------------------------------------------- ของพัง ⇒ แต่ละแบบต้องทำให้ข้อของมันแดง
const ของพัง = [
  { ชื่อ: 'ก. ตัวกรีกไม่ถูกซ่อน', ข้อ: '②', ยัด: { css: '.pk-ซ่อนตัวเดิม .pk-ข้อคำ > .pk-คำ > .pk-ตัวเดิม { display: inline !important; }' } },
  { ชื่อ: 'ข. กรอบไม่ย้ายไปคำอังกฤษ', ข้อ: '②', ยัด: { css: '.pk-ซ่อนตัวเดิม .pk-คำแปลคำ { border: 0 !important; }' } },
  { ชื่อ: 'ค. สัญลักษณ์กาลหายไปกับตัวกรีก', ข้อ: '②', ยัด: { css: '.pk-ซ่อนตัวเดิม .pk-คำ > .pk-กาล { display: none !important; }' } },
  { ชื่อ: 'ง. สัญลักษณ์กาลลอยแถวบน ไม่อยู่หน้าคำ', ข้อ: '②', ยัด: { css: ".pk-ซ่อนตัวเดิม .pk-คำ:has(> .pk-กาล) { grid-template-areas: 'ภาพ ว่าง' 'แปล แปล' !important; }" } },
  { ชื่อ: 'ฌ. สีม่วงชมพูไม่ย้ายไปคำอังกฤษ', ข้อ: '②', ยัด: { css: ".pk-ซ่อนตัวเดิม .pk-คำ[data-ลค~='mg'] > .pk-คำแปลคำ { color: var(--color-pk-ink) !important; }" } },
  { ชื่อ: 'ญ. ม่วงชมพูบนพื้นสีกลับเป็นสีอ่อนเดิม (3.90:1)', ข้อ: '②', ยัด: { css: ".pk-ซ่อนตัวเดิม .pk-คำ[data-ลค~='mg'][data-ลค~='gg'] > .pk-คำแปลคำ { color: #cc00cc !important; }" } },
  // ⭐ ใบ #178 ⇒ เกณฑ์ความสูงตอนซ่อนตัวเดิมเป็น 24 ⇒ ยัดเตี้ยกว่า 24 จริง ⇒ ของเดิมยัด `min-height: 20px` ⇒ ⛔ เตี้ยกว่าคำแปลเอง ⇒ ⛔ จับอะไรแล้ว
  { ชื่อ: 'จ. ปุ่มคำเตี้ยกว่า 24', ข้อ: '②', ยัด: { css: '.pk-ซ่อนตัวเดิม .pk-ข้อคำ > .pk-คำ { min-height: 0 !important; height: 18px !important; }' } },
  { ชื่อ: 'จ2. ปุ่มคำแคบกว่า 44', ข้อ: '②', ยัด: { css: '.pk-ซ่อนตัวเดิม .pk-ข้อคำ > .pk-คำ { min-width: 0 !important; }' } },
  { ชื่อ: 'ถ. ช่องระหว่างคำกลับไปแคบเท่าเดิม', ข้อ: '⑩', ตรวจ: (ย) => ตรวจจอ(320, ย), ยัด: { css: '.pk-ซ่อนตัวเดิม .pk-ข้อคำ > .pk-คำ { margin-inline: 0.28em !important; } .pk-ซ่อนตัวเดิม .pk-ตัวบท .pk-ข้อคำ { margin-inline-end: 0 !important; }' } },
  { ชื่อ: 'ถ2. ขยายช่องทั้งสองข้างปุ่ม ⇒ แถวรับคำได้น้อยลง', ข้อ: '⑩', ตรวจ: ตรวจแถวจอแคบคู่, ยัด: { css: '.pk-ซ่อนตัวเดิม .pk-ข้อคำ > .pk-คำ { margin-inline: 0.7em !important; } .pk-ซ่อนตัวเดิม .pk-ตัวบท .pk-ข้อคำ { margin-inline-end: 0 !important; }' } },
  { ชื่อ: 'ท. คำที่ตัดสองบรรทัดห่างเท่าระหว่างแถว', ข้อ: '⑩', ตรวจ: (ย) => ตรวจจอ(320, ย), ยัด: { css: '.pk-ซ่อนตัวเดิม .pk-ข้อคำ > .pk-คำ > .pk-คำแปลคำ { line-height: 2 !important; }' } },
  { ชื่อ: 'บ. จุดคั่นคำไม่ขึ้น', ข้อ: '⑪', ตรวจ: ตรวจจุดคั่น, ยัด: { css: '.pk-ข้อคำ > .pk-คำ::after { display: none !important; }' } },
  {
    // ⭐ วาดจุดให้ทุกปุ่มด้วย CSS ⇒ ⛔ ยัด `data-จุด` ด้วยมือ ⇒ ตัวจัดแถววางจุดใหม่เองแล้วลบทิ้งก่อนด่านวัด
    ชื่อ: 'ป. จุดขึ้นที่ท้ายแถวด้วย',
    ข้อ: '⑪',
    ตรวจ: ตรวจจุดคั่น,
    ยัด: {
      css: ".pk-จุดคั่นคำ .pk-ข้อคำ > .pk-คำ { position: relative; } .pk-จุดคั่นคำ .pk-ข้อคำ > .pk-คำ::after { content: ''; position: absolute; left: calc(100% + 0.64em); top: 0.7em; width: 4px; height: 4px; background: currentColor; opacity: 0.3; }",
    },
  },
  { ชื่อ: 'ภ. ช่องติ๊กบนกล่องเฟืองกลับเป็นสีน้ำเงินของเบราว์เซอร์', ข้อ: '⑪', ตรวจ: ตรวจจุดคั่น, ยัด: { css: '.pk-ช่องติ๊ก input { accent-color: auto !important; }' } },
  { ชื่อ: 'ผ. จุดทับคำแรก', ข้อ: '⑪', ตรวจ: ตรวจจุดคั่น, ยัด: { css: '.pk-จุดคั่นคำ .pk-ข้อคำ > .pk-คำ[data-จุด]::after { left: 50% !important; }' } },
  { ชื่อ: 'ฝ. จุดเป็นตัวอักษร', ข้อ: '⑪', ตรวจ: ตรวจจุดคั่น, ยัด: { css: ".pk-จุดคั่นคำ .pk-ข้อคำ > .pk-คำ[data-จุด]::after { content: '·' !important; }" } },
  { ชื่อ: 'พ. จุดอยู่ใต้บรรทัด เหมือนจุดจบประโยค', ข้อ: '⑪', ตรวจ: ตรวจจุดคั่น, ยัด: { css: '.pk-จุดคั่นคำ .pk-ข้อคำ > .pk-คำ[data-จุด]::after { top: calc(100% - 3px) !important; }' } },
  {
    ชื่อ: 'ฉ. กดคำแล้วการ์ดไม่ขึ้น',
    ข้อ: '③',
    // ถอดตัวรับการกดของปุ่มคำทุกปุ่ม ⇒ แทนด้วยร่างเดิมที่ไม่มีตัวรับ
    ยัด: { หลังซ่อน: () => document.querySelectorAll('.pk-ข้อคำ > .pk-คำ').forEach((b) => b.replaceWith(b.cloneNode(true))) },
  },
  { ชื่อ: 'ช. เว็บจำค่าไม่ได้', ข้อ: '④', ยัด: { ไม่จำ: true } },
  { ชื่อ: 'ซ. สวิตช์โผล่บนหน้าที่ไม่มีคำภาษาเดิม', ข้อ: '⑥', ตรวจ: ตรวจไม่มีคำเดิม, ยัด: { หลังเปิด: ยัดสวิตช์ในAa } },
  { ชื่อ: 'ฎ. สวิตช์กลับไปอยู่ในแผง Aa (หน้าคำกรีก)', ข้อ: '⑦', ตรวจ: (ย) => ตรวจAaไม่มีสวิตช์(1280, ย), ยัด: { หลังเปิด: ยัดสวิตช์ในAa } },
  { ชื่อ: 'ฏ. เฟืองของคำกรีกไม่มีสวิตช์', ข้อ: '①', ยัด: { ก่อนโหลด: ถอดสวิตช์จากเฟือง } },
  { ชื่อ: 'ฐ. เฟืองของคำฮีบรูไม่มีสวิตช์', ข้อ: '⑧', ตรวจ: (ย) => ตรวจฮีบรู(1280, ย), ยัด: { ก่อนโหลด: ถอดสวิตช์จากเฟือง } },
  { ชื่อ: 'ฑ. หัวคอลัมน์คำฮีบรูไม่มีเฟือง (ของเดิมใบ #154)', ข้อ: '⑧', ตรวจ: (ย) => ตรวจฮีบรู(320, ย), ยัด: { css: '[data-ปุ่ม="เครื่องมือภาษาเดิม"] { display: none !important; }' } },
  { ชื่อ: 'ฒ. ตัวฮีบรูไม่ถูกซ่อน', ข้อ: '⑧', ตรวจ: (ย) => ตรวจฮีบรู(1280, ย), ยัด: { css: '.pk-ซ่อนตัวเดิม .pk-ข้อคำ > .pk-คำ > .pk-ตัวเดิม { display: inline !important; }' } },
  { ชื่อ: 'ณ. คำฮีบรูมีปุ่ม i ที่ไม่มีอะไรให้อธิบาย', ข้อ: '⑧', ตรวจ: (ย) => ตรวจฮีบรู(1280, ย), ยัด: { หลังเปิด: ยัดปุ่มi } },
  { ชื่อ: 'ด. คอลัมน์คำกรีกคนละบทไม่มีสวิตช์ในเฟือง', ข้อ: '⑨', ตรวจ: (ย) => ตรวจคอลัมน์คนละที่(1280, ย), ยัด: { ก่อนโหลด: ถอดสวิตช์จากเฟือง } },
  { ชื่อ: 'ต. คอลัมน์คำกรีกคนละบทไม่มีเฟือง (จอแคบ)', ข้อ: '⑨', ตรวจ: (ย) => ตรวจคอลัมน์คนละที่(320, ย), ยัด: { css: '.pk-หัวคู่ [data-ปุ่ม="เครื่องมือภาษาเดิม"], .pk-ตอนเทียบ [data-ปุ่ม="เครื่องมือภาษาเดิม"] { display: none !important; }' } },
]
let แดง = false
if (ทดสอบตัวเอง) {
  for (const พ of ของพัง) {
    const ผิด = (พ.ตรวจ ? await พ.ตรวจ(พ.ยัด) : await ตรวจจอ(1280, พ.ยัด)).filter((x) => x.startsWith(พ.ข้อ))
    if (ผิด.length) console.log(`✅ ${พ.ชื่อ} ⇒ ข้อ ${พ.ข้อ} แดงตามคาด ⇒ ${ผิด[0]}`)
    else {
      console.log(`⛔ ${พ.ชื่อ} ⇒ ข้อ ${พ.ข้อ} ⛔ ไม่แดง ⇒ ด่านจับของพังแบบนี้ไม่ได้แล้ว`)
      แดง = true
    }
  }
} else {
  const ผิด = [
    ...(await ตรวจจอ(1280)),
    ...(await ตรวจจอ(320)),
    ...(await ตรวจไม่มีคำเดิม()),
    ...(await ตรวจAaไม่มีสวิตช์(1280)),
    ...(await ตรวจAaไม่มีสวิตช์(320)),
    ...(await ตรวจฮีบรู(1280)),
    ...(await ตรวจฮีบรู(320)),
    ...(await ตรวจคอลัมน์คนละที่(1280)),
    ...(await ตรวจคอลัมน์คนละที่(320)),
    ...(await ตรวจแถวจอแคบคู่()),
    ...(await ตรวจจุดคั่น()),
  ]
  for (const ข้อ of ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪']) {
    const ของข้อ = ผิด.filter((x) => x.startsWith(ข้อ))
    if (ของข้อ.length) {
      แดง = true
      console.log(`⛔ ข้อ ${ข้อ} ผิด ${ของข้อ.length} จุด`)
      for (const x of ของข้อ) console.log(`   ${x}`)
    } else console.log(`✅ ข้อ ${ข้อ} ผ่าน`)
  }
}
await เบราว์เซอร์.close()
process.exit(แดง ? 1 : 0)
