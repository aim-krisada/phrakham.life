// ด่านตรวจ — **ปุ่ม *ติดตั้งแอพ* ⇒ กดแล้วติดตั้งได้จริงทุกเบราว์เซอร์ ⇒ หรือได้แผ่นบอกขั้นที่ถูกเบราว์เซอร์** (ยกมาจากเว็บเพลง ⇒ ใบ v3/pleng#156)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
//   node tools/ด่านปุ่มติดตั้งแอป.mjs http://127.0.0.1:5396/phrakham                 ⇒ ตรวจเว็บที่สร้างเสร็จ
//   node tools/ด่านปุ่มติดตั้งแอป.mjs http://127.0.0.1:5396/phrakham --ทดสอบตัวเอง    ⇒ ยัดของพังแล้วด่านต้องจับได้ทีละข้อ
//
// ⭐ หน้าตาที่ด่านนี้เฝ้า ⇒ การ์ด *ติดตั้งเป็นแอพ* บนหน้าแรก (`app/components/การ์ดติดตั้งแอป.vue`)
//   · แถว *ติดตั้งแอพ* ท้ายแผง ≡ เมนู (`app/components/เมนูเว็บเดิม.vue`) · แผ่นบอกขั้น (`app/components/แผ่นติดตั้งแอป.vue`)
//   ⇒ คำตัดสินว่ากดแล้วทำอะไร ⇒ `app/utils/ติดตั้งแอป.ts` · สถานะกับตัวฟัง ⇒ `app/composables/ติดตั้งแอป.ts`
//   ⇒ ส่วนที่ Chrome ดูเองว่าเว็บติดตั้งได้ไหม (manifest · รูป · ตัวช่วยออฟไลน์ลงทะเบียน) ⇒ คนละด่าน ⇒ `tools/ด่านติดตั้งเป็นแอป.mjs`
//   ⇒ ตัวช่วยออฟไลน์เก็บทั้งเล่ม · บรรทัดสถานะออฟไลน์ ⇒ คนละด่าน ⇒ `tools/ด่านออฟไลน์.mjs`
//
// **ด่านนี้ตรวจ 7 ข้อ**
//   ⓪ **คำตัดสินกับถ้อยคำ** (⛔ เปิดเบราว์เซอร์) ⇒ import `วางแผนติดตั้ง` ตรง ๆ ⇒ user agent จริง 16 แบบ × มี/ไม่มีหน้าต่าง
//      ⇒ ลำดับเดียวกับเว็บเพลง (`pwaInstall.decision.test.js`) ⇒ ติดตั้งแล้ว ⇒ ⛔ ทำอะไร · ในแอปแชต ⇒ แผ่นพาออกแม้มีหน้าต่าง
//        · Samsung ⇒ ไป Chrome แม้มีหน้าต่าง · มีหน้าต่าง ⇒ เปิดเลย · ⛔ มี ⇒ แผ่นของเบราว์เซอร์นั้น
//      ⇒ ⭐ **ถ้อยคำทุกแผ่น = ของเว็บเพลงทุกตัวอักษร** (@krisada อนุมัติ 19 พ.ย. 2569) ⇒ ลายนิ้วมือ `ลายนิ้วมือคำ` คิดจากโมดูลของเว็บเพลงเอง
//        (pleng origin/main 19 พ.ย. 2569) ⇒ ใครแก้คำบนแผ่นโดยไม่ผ่านการอนุมัติ ⇒ ด่านแดง
//   ① **หน้าต่างของเบราว์เซอร์** ⇒ ส่ง `beforeinstallprompt` ปลอมเข้าหน้า ⇒ เว็บต้องจับไว้ (`preventDefault`)
//      ⇒ กดแถวในแผง ≡ ⇒ `prompt()` ถูกเรียก 1 ครั้ง · แผงพับ · ⛔ มีแผ่นบอกขั้น ⇒ ส่งใหม่ ⇒ กดปุ่มบนการ์ด ⇒ เรียกอีก 1 ครั้ง (รวม 2)
//      ⇒ ตอบ *ยกเลิก* ⇒ การ์ดอยู่ต่อ ⇒ ตอบ *ติดตั้ง* ⇒ การ์ดหาย ⇒ บรรทัด *ติดตั้งแอพในเครื่องนี้แล้ว…* ขึ้นแทน (คำตรงตัว)
//   ② **iPhone Safari** (iOS 17 กับ iOS 26) ⇒ กดปุ่มบนการ์ด ⇒ แผ่น `ios-safari` 3 ขั้น ⇒ ขั้นแรกตรงรุ่น (ปุ่มแชร์ด้านล่าง · ⋯ มุมล่างขวา)
//      ⇒ เป็นหน้าต่าง (`role="dialog"` · `aria-modal` · ชื่อจากหัวแผ่น) ⇒ โฟกัสเข้าแผ่น ⇒ Tab วนในแผ่น
//      ⇒ Escape ปิด ⇒ โฟกัสกลับปุ่มที่กด ⇒ จากแถวในแผง ≡ ⇒ Escape ⇒ โฟกัสกลับปุ่ม ≡ (WCAG 2.2 SC 2.1.2 · 2.4.3 · 4.1.2)
//   ③ **ในแอป LINE** ⇒ แผ่น `line` ⇒ ปุ่มพาออกเป็นลิงก์ไปหน้าเดิม (ทางเดียวกับหน้านี้ ⇒ ฐาน `/phrakham/` ⛔ หลุด) + `openExternalBrowser=1`
//      ⇒ ปุ่ม *เข้าใจแล้ว* ปิดแผ่น
//   ④ **เปิดเป็นแอปอยู่** ⇒ `display-mode: standalone` (Android/คอม) และ `navigator.standalone` (iPhone) ⇒ ⛔ การ์ด ⛔ แถวในแผง
//      ⇒ ⚠️ Chrome ของ Playwright ⛔ จำลอง `display-mode` ผ่าน `Emulation.setEmulatedMedia` (ลองเอง 19 พ.ย. 2569 ⇒ `matches` ยังเป็น false)
//        ⇒ จึงแทน `matchMedia` ก่อนหน้าโหลด ⇒ ตอบ *ใช่* เฉพาะคำถาม `display-mode: standalone` ⇒ ด่านเช็กก่อนว่าแทนได้จริง
//   ⑤ **× ของการ์ดจำไว้** ⇒ กด × ⇒ การ์ดหาย ⇒ โหลดหน้าใหม่ ⇒ ยังหาย ⇒ แถวในแผง ≡ ยังอยู่ (เว็บเพลง กติกาข้อ 5)
//   ⑥ **⛔ ล้นจอ 360** ⇒ ตัวอักษร 100% กับ 200% (`pk-fs` ท่าเดียวกับปุ่ม ก+) ⇒ หน้าแรกที่มีการ์ด · แผ่นของ iPhone · แผ่นของ LINE · แผง ≡ ที่กาง
//      ⇒ หน้า ⛔ เลื่อนซ้ายขวา ⇒ การ์ด แผ่น แถว อยู่ในจอ ⇒ ปุ่มทุกปุ่มสูงกว้างไม่ต่ำกว่า 44 จุด
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⇒ `--ทดสอบตัวเอง` ⇒ ของจริงต้องผ่านก่อน ⇒ แล้วยัดของพังทีละท่า (รายชื่ออยู่ที่ `ของพัง`)
//   ⇒ แต่ละท่าต้องทำให้ **ข้อของมันเอง** แดง ⇒ ⛔ ใช่ข้ออื่นที่บังเอิญแดง ⇒ จับไม่ได้ = ด่านตาย ⇒ คืนรหัสไม่เป็นศูนย์
//
// ⛔ **ไม่ออกเน็ต** ⇒ ลิงก์พาออกจาก LINE ⛔ ถูกเปิด ⇒ อ่านแค่ `href`
// ⛔ **ไม่รอเป็นเวลาตายตัว** ⇒ ทุกการรอคือรอสภาพของหน้า

import { chromium } from 'playwright'
import { createHash } from 'node:crypto'
import { เส้นทางเว็บ, รอโค้ดของเว็บติด } from './หน้าที่ตรวจ.mjs'
import { วางแผนติดตั้ง } from '../app/utils/ติดตั้งแอป.ts'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const เป้า = 44

// ⭐ คำที่ด่านอ่านบนจอ ⇒ ลอกจากเว็บเพลง ⇒ จดซ้ำที่นี่โดยเจตนา ⇒ เจ้าของคือ `app/utils/ถ้อยคำติดตั้งแอป.ts`
//   ⇒ คำเรื่องออฟไลน์คืนตามเว็บเพลงแล้ว (@krisada 19 พ.ย. 2569 ⇒ เว็บนี้มีตัวช่วยออฟไลน์ `public/sw.js` ⇒ ตัวเฝ้า `tools/ด่านออฟไลน์.mjs`)
const คำ = {
  ปุ่ม: 'ติดตั้งแอพ',
  หัวการ์ด: 'ติดตั้งเป็นแอพ ใช้ได้แม้ไม่มีเน็ต',
  ติดตั้งแล้ว: 'ติดตั้งแอพในเครื่องนี้แล้ว · เปิดจากไอคอน พระคำ.ชีวิต บนหน้าจอ ใช้ได้แม้ไม่มีเน็ต',
  เข้าใจแล้ว: 'เข้าใจแล้ว',
}

// ⭐ user agent จริง ⇒ ชุดเดียวกับ `src/lib/pwaInstall.decision.test.js` ของเว็บเพลง
const UA = {
  lineIOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari Line/14.9.0',
  lineAndroid:
    'Mozilla/5.0 (Linux; Android 14; SM-A546E Build/UP1A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/129.0 Mobile Safari/537.36 Line/14.16.1/IAB',
  fbAndroid:
    'Mozilla/5.0 (Linux; Android 14; Pixel 8 Build/AP2A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/129.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/480.0.0.0;]',
  fbIOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/470.0.0;FBBV/1]',
  messengerIOS:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/MessengerForiOS;FBAV/460.0;FBDV/iPhone15,2]',
  instaAndroid:
    'Mozilla/5.0 (Linux; Android 13; SM-G991B Build/TP1A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/128.0 Mobile Safari/537.36 Instagram 350.0.0.0 Android',
  safari26: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1',
  safari17: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  ipad: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
  chromeIOS:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/129.0.6668.69 Mobile/15E148 Safari/604.1',
  edgeIOS:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/129.0 Mobile/15E148 Safari/605.1.15',
  firefoxIOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/130.0 Mobile/15E148 Safari/605.1.15',
  chromeAndroid: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36',
  samsung:
    'Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-A546E) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/26.0 Chrome/122.0.0.0 Mobile Safari/537.36',
  firefoxAndroid: 'Mozilla/5.0 (Android 14; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
  chromeDesktop: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
}

// ⭐ ผลที่ต้องเป็น ⇒ [ไม่มีหน้าต่าง, มีหน้าต่าง] ⇒ ชื่อแผ่น หรือ `native`
const ที่ต้องเป็น = {
  lineIOS: ['line', 'line'],
  lineAndroid: ['line', 'line'],
  fbAndroid: ['meta-android', 'meta-android'],
  fbIOS: ['meta-ios', 'meta-ios'],
  messengerIOS: ['meta-ios', 'meta-ios'],
  instaAndroid: ['meta-android', 'meta-android'],
  safari26: ['ios-safari', 'native'],
  safari17: ['ios-safari', 'native'],
  ipad: ['ios-safari', 'native'],
  chromeIOS: ['ios-other', 'native'],
  edgeIOS: ['ios-other', 'native'],
  firefoxIOS: ['ios-other', 'native'],
  chromeAndroid: ['android', 'native'],
  samsung: ['android-samsung-chrome', 'android-samsung-chrome'],
  firefoxAndroid: ['android-firefox', 'native'],
  chromeDesktop: ['generic', 'native'],
}
const ที่อยู่ตัวอย่าง = 'https://example.test/phrakham/read/MRK?c=2#x'

// ⭐⭐ **ลายนิ้วมือของถ้อยคำทุกแผ่น** ⇒ sha256 ของ JSON ผลของ `installPlan` ในเว็บเพลง ⇒ ชุด UA ข้างบน × มี/ไม่มีหน้าต่าง ⇒ `ที่อยู่ตัวอย่าง`
//   ⇒ คิดจาก `src/lib/pwaInstall.js` ของ pleng (origin/main 19 พ.ย. 2569) ⇒ ตอนนั้นโมดูลของเว็บนี้ให้ผลตรงทุกไบต์ (32 กรณี)
//   ⇒ แดงที่นี่ ⇒ คำบนแผ่นเปลี่ยน ⇒ ถ้า @krisada อนุมัติคำใหม่แล้ว ⇒ แก้เลขนี้พร้อมจดว่าใครอนุมัติเมื่อไร
const ลายนิ้วมือคำ = 'c4ca6e752258b218b2797c6cf51a700cfde746647ac6252f1c40f3a36c84f560'

/** ⓪ ⇒ ตรวจคำตัดสินด้วยฟังก์ชันที่ให้มา ⇒ คืนรายการที่ตก */
function ตรวจคำตัดสิน(วาง = วางแผนติดตั้ง) {
  const ตก = []
  const ผลทั้งหมด = []
  for (const [ชื่อ, ua] of Object.entries(UA))
    for (const [i, มีหน้าต่าง] of [false, true].entries()) {
      const nav = { maxTouchPoints: ชื่อ === 'ipad' ? 5 : 0 }
      const ผล = วาง({ ua, nav, มีหน้าต่าง, href: ที่อยู่ตัวอย่าง })
      ผลทั้งหมด.push(ผล)
      const ได้ = ผล.kind === 'sheet' ? ผล.sheet.id : ผล.kind
      if (ได้ !== ที่ต้องเป็น[ชื่อ][i]) ตก.push(`⓪ ${ชื่อ}${มีหน้าต่าง ? ' มีหน้าต่าง' : ''} ⇒ ได้ ${ได้} ⇒ ต้องเป็น ${ที่ต้องเป็น[ชื่อ][i]}`)
      for (const ติดตั้ง of [{ เปิดเป็นแอป: true }, { ติดตั้งแล้ว: true }]) {
        const ซ้ำ = วาง({ ua, nav, มีหน้าต่าง, href: ที่อยู่ตัวอย่าง, ...ติดตั้ง })
        if (ซ้ำ.kind !== 'installed') ตก.push(`⓪ ${ชื่อ} ${Object.keys(ติดตั้ง)[0]} ⇒ ได้ ${ซ้ำ.kind} ⇒ ต้องเป็น installed (⛔ เสนอติดตั้งซ้ำ)`)
      }
    }
  const ลาย = createHash('sha256').update(JSON.stringify(ผลทั้งหมด)).digest('hex')
  if (ลาย !== ลายนิ้วมือคำ) ตก.push(`⓪ ถ้อยคำบนแผ่นไม่ตรงคำของเว็บเพลงที่อนุมัติ ⇒ ลายนิ้วมือ ${ลาย.slice(0, 12)}… ⇒ ต้องเป็น ${ลายนิ้วมือคำ.slice(0, 12)}…`)
  return ตก
}

// ---- เบราว์เซอร์ ------------------------------------------------------------------------------
const เบราว์เซอร์ = await chromium.launch()

/** ⭐ แทน `matchMedia` ⇒ ตอบ *ใช่* เฉพาะ `display-mode: standalone` ⇒ เหตุผลอยู่หัวไฟล์ข้อ ④ */
const จำลองเปิดเป็นแอป = () => {
  const เดิม = window.matchMedia.bind(window)
  // ⭐ ของปลอมทั้งชิ้น ⇒ `matches` ของของจริงเป็นตัวอ่านอย่างเดียว ⇒ ⛔ เขียนทับได้
  const ปลอม = (q) => ({ matches: true, media: q, onchange: null, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false })
  window.matchMedia = (q) => (/display-mode:\s*standalone/.test(q) ? ปลอม(q) : เดิม(q))
}
const จำลองiPhoneแอป = () => Object.defineProperty(Navigator.prototype, 'standalone', { get: () => true, configurable: true })

/** เปิดหน้า ⇒ ⭐ บริบทใหม่ทุกครั้ง ⇒ ที่เก็บในเครื่องว่าง ⇒ `ใหญ่` ⇒ ตัวอักษร 200% ท่าเดียวกับ `tools/ด่านเมนูเว็บเดิม.mjs` */
async function เปิด({ ua, กว้าง = 412, มือถือ = true, ทาง = '/', ใหญ่ = false, ก่อนโหลด = [], พัง }) {
  const ctx = await เบราว์เซอร์.newContext({
    viewport: { width: กว้าง, height: 800 },
    ...(ua ? { userAgent: ua } : {}),
    ...(มือถือ ? { hasTouch: true } : {}),
  })
  if (ใหญ่)
    await ctx.addInitScript(() => {
      try {
        if (!sessionStorage.getItem('ด่านติดตั้งแอป')) {
          sessionStorage.setItem('ด่านติดตั้งแอป', '1')
          localStorage.setItem('pk-fs', '2')
        }
      } catch {}
    })
  for (const x of ก่อนโหลด) await ctx.addInitScript(x)
  if (พัง?.ก่อนโหลด) await ctx.addInitScript(พัง.ก่อนโหลด)
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(ฐาน + ทาง)
  await รอหน้า(แท็บ, พัง)
  return { ctx, แท็บ }
}
async function รอหน้า(แท็บ, พัง) {
  await รอโค้ดของเว็บติด(แท็บ)
  if (พัง?.css) await แท็บ.addStyleTag({ content: พัง.css })
  await แท็บ.evaluate(() => document.fonts.ready.then(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))))
}

const การ์ด = '[data-การ์ด="ติดตั้งแอป"]'
const บรรทัด = '[data-การ์ด="ติดตั้งแล้ว"]'
const ปุ่มการ์ด = '[data-ปุ่ม="ติดตั้งแอปบนการ์ด"]'
const แถวเมนู = '[data-ปุ่ม="ติดตั้งแอปในเมนู"]'
const ปุ่มเมนู = '[data-ปุ่ม="เมนูเว็บเดิม"]:visible'
const แผ่น = '[role="dialog"][data-แผ่น]'

const นับ = (แท็บ, ตัวเลือก) => แท็บ.locator(ตัวเลือก).count()
async function กางเมนู(แท็บ) {
  await แท็บ.locator(ปุ่มเมนู).first().click()
  await แท็บ.locator('[data-ปุ่ม="เมนูเว็บเดิม"][aria-expanded="true"]').first().waitFor({ timeout: 5000 })
}
const รอแผ่น = (แท็บ) => แท็บ.locator(แผ่น).waitFor({ timeout: 5000 }).then(() => true, () => false)

/** อ่านแผ่นที่เปิด ⇒ ชื่อ · หัว · ขั้น · ลิงก์พาออก · ป้ายหน้าต่าง · โฟกัสอยู่ในแผ่นไหม */
const อ่านแผ่น = (แท็บ) =>
  แท็บ.evaluate((ต) => {
    const d = document.querySelector(ต)
    if (!d) return null
    const หัวไอดี = d.getAttribute('aria-labelledby')
    return {
      id: d.getAttribute('data-แผ่น'),
      modal: d.getAttribute('aria-modal'),
      หัว: (document.getElementById(หัวไอดี || '')?.textContent || '').trim(),
      // ⭐ คำของขั้นอย่างเดียว ⇒ ⛔ นับเลขขั้น (ป้ายตาเห็น `aria-hidden`)
      ขั้น: [...d.querySelectorAll('ol li .pk-คำขั้น')].map((x) => (x.textContent || '').replace(/\s+/g, ' ').trim()),
      ลิงก์: [...d.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
      โฟกัสใน: d.contains(document.activeElement),
    }
  }, แผ่น)
const โฟกัสที่ = (แท็บ) => แท็บ.evaluate(() => document.activeElement?.getAttribute('data-ปุ่ม') ?? document.activeElement?.tagName ?? null)

// ⭐ หน้าต่างปลอม ⇒ นับว่า `prompt()` ถูกเรียกกี่ครั้ง ⇒ คืนว่าเว็บจับไว้ (`preventDefault`) ไหม
const ส่งหน้าต่างปลอม = (แท็บ, ตอบ = 'dismissed') =>
  แท็บ.evaluate((ต) => {
    window.__นับหน้าต่าง ??= 0
    const e = new Event('beforeinstallprompt', { cancelable: true })
    e.prompt = () => {
      window.__นับหน้าต่าง++
      return Promise.resolve()
    }
    e.userChoice = Promise.resolve({ outcome: ต })
    window.dispatchEvent(e)
    return e.defaultPrevented
  }, ตอบ)
const นับหน้าต่าง = (แท็บ) => แท็บ.evaluate(() => window.__นับหน้าต่าง ?? 0)

// ---- ข้อ ①–⑥ ⇒ แต่ละข้อคืนรายการที่ตก ---------------------------------------------------------
const ข้อ = {
  async '①'(พัง) {
    const ตก = []
    const { ctx, แท็บ } = await เปิด({ ua: UA.chromeDesktop, กว้าง: 1280, มือถือ: false, พัง })
    try {
      if (!(await ส่งหน้าต่างปลอม(แท็บ))) ตก.push('① เว็บ ⛔ จับหน้าต่างติดตั้ง (`beforeinstallprompt` ⛔ ถูก preventDefault)')
      await กางเมนู(แท็บ)
      if (!(await นับ(แท็บ, แถวเมนู))) ตก.push('① แผง ≡ ⛔ มีแถว *ติดตั้งแอพ*')
      else {
        await แท็บ.locator(แถวเมนู).click()
        await แท็บ.waitForFunction(() => (window.__นับหน้าต่าง ?? 0) >= 1, null, { timeout: 3000 }).catch(() => {})
        const n = await นับหน้าต่าง(แท็บ)
        if (n !== 1) ตก.push(`① กดแถวในแผง ≡ ⇒ prompt() ถูกเรียก ${n} ครั้ง ⇒ ต้อง 1`)
        if (await นับ(แท็บ, แผ่น)) {
          ตก.push('① มีหน้าต่างของเบราว์เซอร์แล้ว ⛔ ต้องเปิดแผ่นบอกขั้น')
          await แท็บ.keyboard.press('Escape') // ⭐ ปิดแผ่นก่อน ⇒ ⛔ ให้พื้นมืดบังปุ่มบนการ์ดในขั้นต่อไป
        }
        if (await นับ(แท็บ, '[data-ปุ่ม="เมนูเว็บเดิม"][aria-expanded="true"]')) ตก.push('① กดแถวติดตั้งแล้วแผง ≡ ⛔ พับ')
      }
      await ส่งหน้าต่างปลอม(แท็บ)
      if (!(await นับ(แท็บ, ปุ่มการ์ด))) ตก.push('① หน้าแรก ⛔ มีปุ่ม *ติดตั้งแอพ* บนการ์ด')
      else {
        await แท็บ.locator(ปุ่มการ์ด).click()
        await แท็บ.waitForFunction(() => (window.__นับหน้าต่าง ?? 0) >= 2, null, { timeout: 3000 }).catch(() => {})
        const n = await นับหน้าต่าง(แท็บ)
        if (n !== 2) ตก.push(`① กดปุ่มบนการ์ด ⇒ prompt() รวม ${n} ครั้ง ⇒ ต้อง 2 (ครั้งละ 1)`)
        if (await นับ(แท็บ, แผ่น)) {
          ตก.push('① ปุ่มบนการ์ดเปิดแผ่นบอกขั้น ⛔ ต้องเปิดหน้าต่างของเบราว์เซอร์')
          await แท็บ.keyboard.press('Escape')
        }
        if (!(await นับ(แท็บ, การ์ด))) ตก.push('① กด *ยกเลิก* ในหน้าต่างแล้วการ์ดหาย ⇒ ต้องอยู่ต่อ')
        // ตอบ *ติดตั้ง* ⇒ การ์ดหาย ⇒ บรรทัดติดตั้งแล้วขึ้นแทน
        await ส่งหน้าต่างปลอม(แท็บ, 'accepted')
        await แท็บ.locator(ปุ่มการ์ด).click()
        await แท็บ.locator(บรรทัด).waitFor({ timeout: 3000 }).catch(() => {})
        if (await นับ(แท็บ, การ์ด)) ตก.push('① ติดตั้งแล้ว (accepted) การ์ดยังอยู่')
        const ข้อความ = ((await แท็บ.locator(`${บรรทัด} p`).textContent().catch(() => '')) || '').replace(/\s+/g, ' ').trim()
        if (ข้อความ !== คำ.ติดตั้งแล้ว) ตก.push(`① บรรทัดติดตั้งแล้ว เป็น "${ข้อความ}" ⇒ ต้องเป็น "${คำ.ติดตั้งแล้ว}"`)
      }
    } finally {
      await ctx.close()
    }
    return ตก
  },

  async '②'(พัง) {
    const ตก = []
    for (const [ชื่อ, ua, ขั้นแรก] of [
      ['iOS 17', UA.safari17, /^แตะปุ่มแชร์ แชร์ ด้านล่าง$/],
      ['iOS 26', UA.safari26, /^แตะ ⋯ มุมล่างขวา แล้วแตะ แชร์$/],
    ]) {
      const { ctx, แท็บ } = await เปิด({ ua, กว้าง: 390, พัง })
      try {
        await แท็บ.locator(ปุ่มการ์ด).click()
        if (!(await รอแผ่น(แท็บ))) {
          ตก.push(`② ${ชื่อ} กดปุ่มบนการ์ด ⛔ มีแผ่นบอกขั้น`)
          continue
        }
        const ผ = await อ่านแผ่น(แท็บ)
        if (ผ.id !== 'ios-safari') ตก.push(`② ${ชื่อ} ได้แผ่น ${ผ.id} ⇒ ต้องเป็น ios-safari`)
        if (ผ.หัว !== 'ติดตั้งบน iPhone · 3 ขั้น') ตก.push(`② ${ชื่อ} หัวแผ่น "${ผ.หัว}" ⇒ ต้องเป็น "ติดตั้งบน iPhone · 3 ขั้น" (ชื่อหน้าต่างมาจากหัวนี้)`)
        if (ผ.modal !== 'true') ตก.push(`② ${ชื่อ} แผ่น ⛔ มี aria-modal="true"`)
        if (ผ.ขั้น.length !== 3) ตก.push(`② ${ชื่อ} มี ${ผ.ขั้น.length} ขั้น ⇒ ต้อง 3`)
        else if (!ขั้นแรก.test(ผ.ขั้น[0])) ตก.push(`② ${ชื่อ} ขั้นแรก "${ผ.ขั้น[0]}" ⛔ ตรงรุ่น`)
        if (!ผ.โฟกัสใน) ตก.push(`② ${ชื่อ} เปิดแผ่นแล้วโฟกัส ⛔ อยู่ในแผ่น`)
        for (let i = 0; i < 3; i++) await แท็บ.keyboard.press('Tab')
        if (!(await อ่านแผ่น(แท็บ))?.โฟกัสใน) ตก.push(`② ${ชื่อ} กด Tab แล้วโฟกัสหลุดออกจากแผ่น`)
        await แท็บ.keyboard.press('Escape')
        await แท็บ.locator(แผ่น).waitFor({ state: 'detached', timeout: 3000 }).catch(() => {})
        if (await นับ(แท็บ, แผ่น)) {
          ตก.push(`② ${ชื่อ} กด Escape แล้วแผ่น ⛔ ปิด`)
          continue
        } else {
          await แท็บ.waitForFunction(() => document.activeElement?.getAttribute('data-ปุ่ม') === 'ติดตั้งแอปบนการ์ด', null, { timeout: 2000 }).catch(() => {})
          const ฟ = await โฟกัสที่(แท็บ)
          if (ฟ !== 'ติดตั้งแอปบนการ์ด') ตก.push(`② ${ชื่อ} ปิดแผ่นแล้วโฟกัสอยู่ที่ ${ฟ} ⇒ ต้องกลับปุ่มบนการ์ด`)
        }
        // ⭐ จากแถวในแผง ≡ ⇒ แผงพับไปแล้ว ⇒ โฟกัสต้องกลับปุ่ม ≡
        await กางเมนู(แท็บ)
        await แท็บ.locator(แถวเมนู).click()
        if (!(await รอแผ่น(แท็บ))) ตก.push(`② ${ชื่อ} กดแถวในแผง ≡ ⛔ มีแผ่นบอกขั้น`)
        else {
          await แท็บ.keyboard.press('Escape')
          await แท็บ.waitForFunction(() => document.activeElement?.getAttribute('data-ปุ่ม') === 'เมนูเว็บเดิม', null, { timeout: 2000 }).catch(() => {})
          const ฟ = await โฟกัสที่(แท็บ)
          if (ฟ !== 'เมนูเว็บเดิม') ตก.push(`② ${ชื่อ} ปิดแผ่นที่เปิดจากแผง ≡ แล้วโฟกัสอยู่ที่ ${ฟ} ⇒ ต้องกลับปุ่ม ≡`)
        }
      } finally {
        await ctx.close()
      }
    }
    return ตก
  },

  async '③'(พัง) {
    const ตก = []
    const { ctx, แท็บ } = await เปิด({ ua: UA.lineIOS, กว้าง: 390, พัง })
    try {
      await แท็บ.locator(ปุ่มการ์ด).click()
      if (!(await รอแผ่น(แท็บ))) return ['③ LINE กดปุ่มบนการ์ด ⛔ มีแผ่น']
      const ผ = await อ่านแผ่น(แท็บ)
      if (ผ.id !== 'line') ตก.push(`③ LINE ได้แผ่น ${ผ.id} ⇒ ต้องเป็น line`)
      if (ผ.หัว !== 'ติดตั้งจากใน LINE ไม่ได้') ตก.push(`③ LINE หัวแผ่น "${ผ.หัว}"`)
      const หน้านี้ = await แท็บ.evaluate(() => location.pathname)
      const พาออก = ผ.ลิงก์.map((h) => new URL(h, ฐาน + '/')).find((u) => u.searchParams.get('openExternalBrowser') === '1')
      if (!พาออก) ตก.push(`③ LINE ⛔ มีลิงก์ที่มี openExternalBrowser=1 ⇒ ลิงก์ในแผ่น ${JSON.stringify(ผ.ลิงก์)}`)
      else if (พาออก.pathname !== หน้านี้) ตก.push(`③ LINE ลิงก์พาออกไปที่ ${พาออก.pathname} ⇒ ต้องเป็นหน้านี้ ${หน้านี้}`)
      await แท็บ.getByRole('button', { name: คำ.เข้าใจแล้ว, exact: true }).click()
      await แท็บ.locator(แผ่น).waitFor({ state: 'detached', timeout: 3000 }).catch(() => {})
      if (await นับ(แท็บ, แผ่น)) ตก.push(`③ กด *${คำ.เข้าใจแล้ว}* แล้วแผ่น ⛔ ปิด`)
    } finally {
      await ctx.close()
    }
    return ตก
  },

  async '④'(พัง) {
    const ตก = []
    for (const [ชื่อ, ua, จำลอง, ถาม] of [
      ['Android (display-mode: standalone)', UA.chromeAndroid, จำลองเปิดเป็นแอป, () => matchMedia('(display-mode: standalone)').matches],
      ['iPhone (navigator.standalone)', UA.safari17, จำลองiPhoneแอป, () => navigator.standalone === true],
    ]) {
      const { ctx, แท็บ } = await เปิด({ ua, กว้าง: 412, ก่อนโหลด: [จำลอง], พัง })
      try {
        if (!(await แท็บ.evaluate(ถาม))) {
          ตก.push(`④ ${ชื่อ} ⇒ จำลองการเปิดเป็นแอปไม่ได้ ⇒ ด่านตรวจข้อนี้ไม่ได้`)
          continue
        }
        if (await นับ(แท็บ, `${การ์ด}, ${บรรทัด}`)) ตก.push(`④ ${ชื่อ} ⇒ เปิดเป็นแอปอยู่แล้ว หน้าแรกยังมีการ์ดติดตั้ง`)
        await กางเมนู(แท็บ)
        if (await นับ(แท็บ, แถวเมนู)) ตก.push(`④ ${ชื่อ} ⇒ เปิดเป็นแอปอยู่แล้ว แผง ≡ ยังมีแถว *ติดตั้งแอพ*`)
      } finally {
        await ctx.close()
      }
    }
    return ตก
  },

  async '⑤'(พัง) {
    const ตก = []
    const { ctx, แท็บ } = await เปิด({ ua: UA.chromeAndroid, กว้าง: 412, พัง })
    try {
      const หัว = ((await แท็บ.locator(`${การ์ด} h2`).textContent().catch(() => '')) || '').trim()
      if (หัว !== คำ.หัวการ์ด) ตก.push(`⑤ หัวการ์ด "${หัว}" ⇒ ต้องเป็น "${คำ.หัวการ์ด}"`)
      await แท็บ.locator('[data-ปุ่ม="ปิดการ์ดติดตั้งแอป"]').click()
      if (await นับ(แท็บ, การ์ด)) ตก.push('⑤ กด × แล้วการ์ด ⛔ หาย')
      await แท็บ.reload()
      await รอหน้า(แท็บ, พัง)
      if (await นับ(แท็บ, การ์ด)) ตก.push('⑤ กด × แล้วโหลดหน้าใหม่ ⇒ การ์ดกลับมา ⇒ ⛔ จำไว้ในเครื่อง')
      await กางเมนู(แท็บ)
      if (!(await นับ(แท็บ, แถวเมนู))) ตก.push('⑤ ปิดการ์ดแล้วแถว *ติดตั้งแอพ* ในแผง ≡ หายด้วย ⇒ ต้องยังติดตั้งจากแผงได้')
    } finally {
      await ctx.close()
    }
    return ตก
  },

  async '⑥'(พัง) {
    const ตก = []
    /** วัด ⇒ หน้าเลื่อนซ้ายขวาไหม · ชิ้นที่ให้มาอยู่ในจอไหม · ปุ่มในชิ้นเล็กกว่า 44 ไหม */
    const วัด = (แท็บ, ตัวเลือก, ป้าย) =>
      แท็บ.evaluate(
        ({ ตัวเลือก, ป้าย, เป้า }) => {
          const ผิด = []
          const จอ = document.documentElement
          if (จอ.scrollWidth > จอ.clientWidth + 0.5) ผิด.push(`${ป้าย} ⇒ หน้าเลื่อนซ้ายขวาได้ (กว้าง ${จอ.scrollWidth} ในจอ ${จอ.clientWidth})`)
          const ชิ้น = document.querySelector(ตัวเลือก)
          if (!ชิ้น) return [...ผิด, `${ป้าย} ⇒ หา ${ตัวเลือก} ไม่เจอ`]
          const r = ชิ้น.getBoundingClientRect()
          if (r.left < -0.5 || r.right > จอ.clientWidth + 0.5) ผิด.push(`${ป้าย} ⇒ ${ตัวเลือก} ล้นจอ (${Math.round(r.left)}–${Math.round(r.right)} ในจอ ${จอ.clientWidth})`)
          for (const ป of ชิ้น.querySelectorAll('button, a[href]')) {
            const q = ป.getBoundingClientRect()
            if (!q.width) continue
            if (q.right > จอ.clientWidth + 0.5) ผิด.push(`${ป้าย} ⇒ ปุ่ม "${(ป.textContent || '').trim()}" ล้นขอบขวา`)
            if (q.width < เป้า - 0.5 || q.height < เป้า - 0.5) ผิด.push(`${ป้าย} ⇒ ปุ่ม "${(ป.textContent || ป.getAttribute('aria-label') || '').trim()}" ${Math.round(q.width)}×${Math.round(q.height)} ⇒ ต้องไม่ต่ำกว่า ${เป้า}`)
          }
          return ผิด
        },
        { ตัวเลือก, ป้าย, เป้า },
      )
    for (const ใหญ่ of [false, true]) {
      const ขนาด = `จอ 360 ตัวอักษร ${ใหญ่ ? 200 : 100}%`
      for (const [ชื่อ, ua] of [
        ['iPhone', UA.safari17],
        ['LINE', UA.lineAndroid],
      ]) {
        const { ctx, แท็บ } = await เปิด({ ua, กว้าง: 360, ใหญ่, พัง })
        try {
          if (ชื่อ === 'iPhone') ตก.push(...(await วัด(แท็บ, การ์ด, `⑥ ${ขนาด} หน้าแรกที่มีการ์ด`)).map(String))
          await แท็บ.locator(ปุ่มการ์ด).click()
          if (await รอแผ่น(แท็บ)) ตก.push(...(await วัด(แท็บ, แผ่น, `⑥ ${ขนาด} แผ่นของ ${ชื่อ}`)))
          else ตก.push(`⑥ ${ขนาด} ${ชื่อ} ⛔ มีแผ่นให้วัด`)
          if (ชื่อ === 'iPhone') {
            await แท็บ.keyboard.press('Escape')
            await กางเมนู(แท็บ)
            ตก.push(...(await วัด(แท็บ, '.pk-แถวติดตั้งแอป', `⑥ ${ขนาด} แถวในแผง ≡`)))
          }
        } finally {
          await ctx.close()
        }
      }
    }
    return ตก
  },
}

/** ⭐ วิ่งข้อเดียว ⇒ ล้มกลางทาง (กดไม่ได้ · รอไม่ถึง) ⇒ นับเป็นข้อนั้นตก ⛔ ด่านทั้งตัวล้ม ⇒ ข้ออื่นยังได้ตรวจ */
async function วิ่งข้อ(ชื่อ, พัง) {
  try {
    return await ข้อ[ชื่อ](พัง)
  } catch (เหตุ) {
    return [`${ชื่อ} ล้มกลางทาง ⇒ ${String(เหตุ?.message || เหตุ).split('\n')[0]}`]
  }
}

async function ตรวจทั้งหมด() {
  const ตก = [...ตรวจคำตัดสิน()]
  for (const ชื่อ of Object.keys(ข้อ)) ตก.push(...(await วิ่งข้อ(ชื่อ)))
  return ตก
}

// ---- ของพัง ⇒ แต่ละท่าต้องทำให้ข้อของมันแดง -----------------------------------------------------
const ของพัง = {
  // ⓪ ⇒ ใส่ฟังก์ชันที่พังแทนของจริง
  'Samsung ใช้หน้าต่างของ Samsung เอง': {
    ข้อ: '⓪',
    คำตัดสิน: (o) => (/SamsungBrowser/.test(o.ua) && o.มีหน้าต่าง && !o.เปิดเป็นแอป && !o.ติดตั้งแล้ว ? { kind: 'native' } : วางแผนติดตั้ง(o)),
  },
  'แก้คำบนแผ่น iPhone เอง': {
    ข้อ: '⓪',
    คำตัดสิน: (o) => {
      const ผล = วางแผนติดตั้ง(o)
      if (ผล.kind === 'sheet' && ผล.sheet.id === 'ios-safari') ผล.sheet = { ...ผล.sheet, title: ผล.sheet.title.replace('ติดตั้งบน', 'ลงแอปบน') }
      return ผล
    },
  },
  'เว็บไม่ฟังหน้าต่างติดตั้ง': {
    ข้อ: '①',
    ก่อนโหลด: `(() => { const เดิม = EventTarget.prototype.addEventListener; EventTarget.prototype.addEventListener = function (t, ...r) { if (t === 'beforeinstallprompt') return; return เดิม.call(this, t, ...r) } })()`,
  },
  'Escape ปิดแผ่นไม่ได้': {
    ข้อ: '②',
    ก่อนโหลด: `window.addEventListener('keydown', (e) => { if (e.key === 'Escape') e.stopImmediatePropagation() }, true)`,
  },
  'ปิดแผ่นแล้วโฟกัสไม่กลับ': {
    ข้อ: '②',
    ก่อนโหลด: `document.addEventListener('keyup', (e) => { if (e.key === 'Escape') setTimeout(() => document.activeElement && document.activeElement.blur(), 0) }, true)`,
  },
  'ลิงก์พาออกจาก LINE ลืม openExternalBrowser': {
    ข้อ: '③',
    ก่อนโหลด: `(() => { const เดิม = URLSearchParams.prototype.set; URLSearchParams.prototype.set = function (k, v) { if (k === 'openExternalBrowser') return; return เดิม.call(this, k, v) } })()`,
  },
  'เปิดเป็นแอปแล้วยังเสนอติดตั้ง': {
    ข้อ: '④',
    // ⭐ โค้ดของเว็บตรวจการเปิดเป็นแอปไม่เจอ ⇒ คำถามที่มาจากไฟล์ของเว็บ (`/_nuxt/`) ได้ *ไม่ใช่* ⇒ คำถามของด่านเองยังได้ค่าที่จำลอง
    //   ⇒ ด่านเช็กว่าจำลองได้ผ่าน ⇒ ข้อ ④ ต้องแดงเพราะเว็บยังเสนอติดตั้ง ⛔ ใช่เพราะจำลองไม่ได้
    ก่อนโหลด: () => {
      const จากเว็บ = () => /\/_nuxt\//.test(new Error().stack || '')
      const เดิม = window.matchMedia
      window.matchMedia = function (q) {
        if (/display-mode/.test(q) && จากเว็บ()) return { matches: false, media: q, addEventListener() {}, removeEventListener() {} }
        return เดิม.call(window, q)
      }
      const ตัวเดิม = Object.getOwnPropertyDescriptor(Navigator.prototype, 'standalone')
      if (ตัวเดิม?.get)
        Object.defineProperty(Navigator.prototype, 'standalone', {
          get() {
            return จากเว็บ() ? undefined : ตัวเดิม.get.call(this)
          },
          configurable: true,
        })
    },
  },
  'จำ × ไม่ได้ (ที่เก็บในเครื่องเขียนไม่ได้)': {
    ข้อ: '⑤',
    ก่อนโหลด: `Storage.prototype.setItem = function () { throw new Error('ด่าน: เขียนไม่ได้') }`,
  },
  'การ์ดกว้างเกินจอแคบ': { ข้อ: '⑥', css: '.pk-การ์ดติดตั้งแอป { min-width: 420px !important; }' },
  'ปุ่มในแผ่นเตี้ยกว่า 44': { ข้อ: '⑥', css: '.pk-ปุ่มแผ่นติดตั้ง { min-height: 0 !important; height: 30px !important; padding: 0 !important; }' },
}

// ---- วิ่ง --------------------------------------------------------------------------------------
const จริง = await ตรวจทั้งหมด()
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
    const ตก = พัง.ข้อ === '⓪' ? ตรวจคำตัดสิน(พัง.คำตัดสิน) : await วิ่งข้อ(พัง.ข้อ, พัง)
    const เช่น = ตก.find((x) => x.startsWith(พัง.ข้อ))
    console.log(`  ${เช่น ? '✅' : '⛔'} ${พัง.ข้อ} ${ชื่อ}${เช่น ? ` ⇒ เช่น ${เช่น}` : ` ⇒ ข้อ ${พัง.ข้อ} ⛔ แดง ${JSON.stringify(ตก)}`}`)
    if (!เช่น) ไม่จับ.push(ชื่อ)
  }
  await เบราว์เซอร์.close()
  if (ไม่จับ.length) {
    console.error(`\n⛔ โหมดพิสูจน์: ยัดของพังแล้ว **ด่านยังไม่เห็น ${ไม่จับ.length} ท่า** ⇒ ด่านตายบางส่วน`)
    for (const x of ไม่จับ) console.error('  - ' + x)
    process.exit(1)
  }
  console.log(`\n✅ โหมดพิสูจน์: ด่านจับของพังได้ครบ ${Object.keys(ของพัง).length} ท่า ⇒ ทุกข้อ ⓪–⑥ แดงได้ด้วยตัวเอง`)
  process.exit(0)
}

await เบราว์เซอร์.close()
if (จริง.length) {
  console.error(`\n⛔ ไม่ผ่าน — ${จริง.length} รายการ:`)
  for (const x of จริง) console.error('  - ' + x)
  process.exit(1)
}
console.log(
  `✅ ปุ่มติดตั้งแอพผ่านครบ 7 ข้อ ⇒ คำตัดสิน ${Object.keys(UA).length * 2} กรณีตรงเว็บเพลง · หน้าต่างของเบราว์เซอร์ถูกเรียกครั้งละ 1` +
    ' · iPhone 17/26 ได้แผ่นถูกรุ่น Escape ปิดโฟกัสกลับ · LINE พาออกด้วย openExternalBrowser=1 · เปิดเป็นแอปแล้ว ⛔ เสนอ · × จำได้ · จอ 360 ⛔ ล้น',
)
