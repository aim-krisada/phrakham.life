// ด่านตรวจ — **นับคนเข้าเว็บด้วย Google Analytics ⇒ เฉพาะโดเมนจริง phrakham.life** (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/170)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// ⭐ ของที่ด่านนี้เฝ้า ⇒ ตัวนับคือ `app/plugins/นับคนเข้าเว็บ.client.ts` · หน้าพาต่อใช้ `app/utils/ออกจากหน้า.ts`
//
// ⛔⛔ **ด่านนี้ไม่ออกเน็ตเลย** ⇒ คำขอทุกคำขอที่ไม่ใช่เว็บในตู้ ถูกตัดทิ้งและจดไว้
//   ⇒ ชื่อโดเมนจริงกับชื่อเว็บทดลอง ถูกชี้กลับมาเครื่องในตู้ด้วย `--host-resolver-rules` ของ Chromium
//     ⇒ เบราว์เซอร์เห็น `location.hostname` เป็นชื่อนั้นจริง ๆ ⇒ แต่ไบต์มาจากเว็บที่สร้างเสร็จในตู้
//   ⇒ สคริปต์ของ Google (`googletagmanager.com/gtag/js`) ⇒ ด่านตอบด้วยสคริปต์ว่างแทน ⇒ ⛔ ไม่มีอะไรถึง Google
//
// **ด่านนี้ตรวจ 6 ข้อ**
//   ⓪ **ไฟล์ HTML ที่สร้างเสร็จทุกไฟล์ ⛔ มีที่อยู่ของ Google** ⇒ ฝังไว้ในหัวหน้า = ทุกที่ที่เปิดเว็บส่งไป Google
//   ① **เว็บทดลองกับเครื่องในท่อ ⛔ ส่งอะไรไป Google** (เกณฑ์ข้อ 2) ⇒ เปิดในชื่อ 127.0.0.1 · aimgit.aimagin.com · v3.aimagin.com
//      ⇒ เดินหน้าแรก · ย้ายหน้าในเว็บ · หน้าอ่าน · เปลี่ยนบท · หน้าพาต่อ ⇒ ⛔ มีคำขอไปโดเมนของ Google สักคำขอ
//      ⇒ ⛔ มี `window.gtag` · ⛔ มี `window.dataLayer` · ⛔ มีสคริปต์ของ Google ในหน้า
//   ② **โดเมนจริงใช้รหัสเดิม** (เกณฑ์ข้อ 1) ⇒ เปิดในชื่อ phrakham.life ⇒ ขอสคริปต์ `gtag/js?id=G-W3XP4T2FFE` 1 ครั้ง
//      ⇒ ตั้งค่าด้วยรหัสเดียวกัน · `send_page_view: false` (นับเอง) · `anonymize_ip: true` (เท่าเว็บเดิม) ⇒ เปิดหน้าแรก = นับ 1
//   ③ **ย้ายหน้าในเว็บ = นับหน้าใหม่ทุกครั้ง** (เกณฑ์ข้อ 3)
//      ⇒ หน้าแรก ⇒ ย้ายไปหน้าแหล่งข้อมูลด้วยตัวจัดเส้นทาง (⛔ โหลดหน้าใหม่) ⇒ นับเพิ่ม 1 ⇒ ที่อยู่กับชื่อหน้าเป็นของหน้าใหม่
//      ⇒ หน้าแรก ⇒ กดลิงก์ *แหล่งข้อมูล* บนแถบ (`<a href>` ธรรมดา โหลดหน้าใหม่) ⇒ นับเพิ่ม 1
//      ⇒ หน้าอ่านมาระโก ⇒ เลือกบท 3 จากแผงเปลี่ยนตอน ⇒ นับเพิ่ม 1 ⇒ เลื่อนอ่านต่อจนข้ามไปบท 4 ⇒ นับเพิ่ม 1
//      ⇒ ที่อยู่เปลี่ยนในบทเดิม (เติม `v` แบบที่หน้าอ่านทำตอนแตะข้อ) ⇒ ⛔ นับ
//      ⇒ หน้าพาต่อ `/read/MRK/2` ⇒ นับแค่หน้าที่ไปถึง ⇒ รวม 1 ⛔ ไม่ใช่ 2
//   ④ **Google ตอบไม่ได้ ⇒ หน้ายังใช้ได้** ⇒ ตัดคำขอสคริปต์ทิ้ง ⇒ หัวหน้าแรกขึ้น · ย้ายหน้าได้ · ⛔ มีข้อผิดพลาดของหน้า
//   ⑤ **สคริปต์ของ Google ⛔ แย่งการโหลดหน้า** (พี่เอมเคาะ 17 พ.ย. 2569) ⇒ เปิดในชื่อ phrakham.life
//      ⇒ ด่านใส่ภาพที่ตอบช้า 3 วินาทีลงหน้า ⇒ หน้าโหลดครบ (`load`) ช้าลงแน่ ๆ
//      ⇒ สคริปต์ของ Google ต้องถูกใส่ลงหน้า **หลัง** `load` ⇒ และหน้าแรกยังนับ 1 ครั้ง (ที่ค้างใน `dataLayer` ⛔ หาย)
//      ⇒ ⭐ ด่านขนาดและความเร็วตัวอื่นวัดที่ 127.0.0.1 ⇒ ตัวนับปิดอยู่ (ข้อ ①) ⇒ ไบต์ของ Google ⛔ อยู่ในตัวเลขพวกนั้น
//        ⇒ ข้อนี้จึงเป็นที่เดียวที่เฝ้าว่าบนโดเมนจริง Google ⛔ แย่งการโหลด
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านนับคนเข้าเว็บ.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพังทีละชิ้น (รายชื่ออยู่ที่ `ของพัง`) ⇒ แต่ละชิ้นต้องทำให้ข้อของมันแดง ⇒ ⛔ แดง = ด่านตายแล้ว
//   ⇒ ของพังยัดผ่านการแก้ไฟล์ที่เบราว์เซอร์โหลด (`route`) ⇒ ⛔ แตะโค้ดในที่เก็บ ⇒ ยัดไม่เข้า ⇒ นับเป็นด่านตายด้วย
//
//   node tools/ด่านนับคนเข้าเว็บ.mjs <ที่อยู่เว็บ> [--โฟลเดอร์ .output/public]
//
// ⛔ **ไม่รอเป็นเวลาตายตัว** ⇒ ทุกการรอคือรอสภาพของหน้า ⇒ ยกเว้นข้อ ③ *⛔ นับ* ที่ต้องรอดูว่า *ไม่มี* อะไรเกิด (รอ 1.5 วินาที)

import { chromium } from 'playwright'
import { readdir, readFile, mkdtemp, writeFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { เส้นทางเว็บ, รอโค้ดของเว็บติด, ปุ่มเปลี่ยนตอนของหน้า } from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')
const iโฟลเดอร์ = process.argv.indexOf('--โฟลเดอร์')
const โฟลเดอร์ = iโฟลเดอร์ > 0 ? process.argv[iโฟลเดอร์ + 1] : '.output/public'

const รหัสวัดผล = 'G-W3XP4T2FFE'
const โดเมนจริง = 'phrakham.life'
// ⭐ ชื่อของเว็บทดลอง ⇒ ที่อยู่ในหัว `.gitlab-ci.yml` (v3.aimagin.com) กับอัมกิตเอง ⇒ 127.0.0.1 คือเครื่องในท่อ
const ชื่อทดลอง = ['127.0.0.1', 'aimgit.aimagin.com', 'v3.aimagin.com']
const ตัวเว็บ = new URL(ฐาน)
const พอร์ต = ตัวเว็บ.port || '80'

/** ที่อยู่เดียวกัน แต่เปลี่ยนชื่อเครื่อง ⇒ ชื่อนั้นถูกชี้กลับมาเครื่องในตู้ */
const ฐานของ = (ชื่อ) => `${ตัวเว็บ.protocol}//${ชื่อ}:${พอร์ต}${ตัวเว็บ.pathname}`.replace(/\/+$/, '')
const ทางฐาน = ตัวเว็บ.pathname.replace(/\/+$/, '') + '/'

// ⭐ โดเมนของ Google ที่ตัวนับคุยด้วย ⇒ เจอคำขอไปที่ไหนก็ตามในรายชื่อนี้ = ส่งข้อมูลออก
const เป็นของGoogle = (u) =>
  /(^|\.)(googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net|google\.com|gstatic\.com)$/.test(
    new URL(u).hostname,
  )

const เบราว์เซอร์ = await chromium.launch({
  args: [`--host-resolver-rules=${[โดเมนจริง, ...ชื่อทดลอง.slice(1)].map((x) => `MAP ${x} ${ตัวเว็บ.hostname}`).join(', ')}`],
})

/**
 * บริบทใหม่ ⇒ ตัดเน็ต ⇒ จดคำขอของ Google ⇒ ยัดของพัง (ถ้ามี)
 *   ⇒ `สคริปต์Google` ⇒ 'ว่าง' ตอบด้วยสคริปต์ว่าง · 'ตัด' ตัดทิ้ง (ข้อ ④)
 *   ⇒ `ฟังนับ` ⇒ จด `dataLayer` ข้ามทุกเอกสารของบริบท ⇒ หน้าพาต่อโหลดหน้าใหม่ทั้งหน้า ⇒ ตัวแปรในหน้าหายทุกครั้ง
 */
async function บริบท({ พัง, สคริปต์Google = 'ว่าง', ฟังนับ = false } = {}) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: 1280, height: 800 } })
  const นับ = { ยัด: 0 }
  const ขอGoogle = []
  const ขอนอก = []
  const ข้อมูล = []
  if (ฟังนับ) {
    await ctx.exposeBinding('__จดข้อมูลนับ', (_, x) => ข้อมูล.push(x))
    // ⭐ เตรียม `dataLayer` ไว้ก่อน ⇒ ตัวนับเขียน `window.dataLayer || []` ⇒ ใช้ตัวนี้ต่อ ⇒ ทุกชิ้นที่ใส่ถูกจดออกมา
    //   ⇒ ใช้เฉพาะโดเมนจริง ⇒ ข้อ ① ⛔ ใช้ ⇒ เพราะข้อ ① ต้องเห็นว่า `dataLayer` ⛔ ถูกสร้าง
    await ctx.addInitScript(() => {
      const ชั้น = []
      ชั้น.push = function (...ชิ้น) {
        for (const x of ชิ้น) {
          const แบน = JSON.parse(JSON.stringify(Array.from(x), (_, v) => (v instanceof Date ? 'วันที่' : v)))
          window.__จดข้อมูลนับ(แบน)
          // ⭐ จดลง `sessionStorage` ด้วย ⇒ **จดทันทีในหน้า ⛔ ข้ามไปฝั่ง node**
          //   ⇒ หน้าพาต่อสั่ง `location.replace` แล้วเอกสารถูกทิ้ง ⇒ ของที่ส่งข้ามไป node ตอนนั้นหายได้
          //   ⇒ ฝาแฝด *นับหน้าพาต่อ* เคยจับได้แค่ 1 ใน 3 รอบเพราะเหตุนี้ ⇒ ข้อ ③ หน้าพาต่อจึงอ่านจากที่นี่
          try {
            const เดิม = JSON.parse(sessionStorage.getItem('__ด่านนับ') || '[]')
            เดิม.push(แบน)
            sessionStorage.setItem('__ด่านนับ', JSON.stringify(เดิม))
          } catch {}
        }
        return Array.prototype.push.apply(this, ชิ้น)
      }
      window.dataLayer = ชั้น
    })
  }
  if (พัง?.ก่อนโหลด) {
    await ctx.addInitScript(พัง.ก่อนโหลด)
    นับ.ยัด++
  }
  // ⭐ route ที่ลงทะเบียนทีหลังถูกถามก่อน ⇒ ตัวแก้โค้ดลงก่อน ตัวตัดเน็ตลงทีหลัง ⇒ ตัวตัดเน็ตตัดสินก่อนเสมอ
  if (พัง?.แทนโค้ด) {
    await ctx.route('**/_nuxt/*.js', async (route) => {
      // ⛔⛔ `route.fetch` ยิงจากฝั่ง node ⇒ ⛔ ผ่านตัวชี้ชื่อของ Chromium ⇒ ต้องเปลี่ยนชื่อเครื่องกลับเป็นเครื่องในตู้เอง
      //   ⇒ ⛔ ไม่เปลี่ยน = node ไปถาม DNS จริงแล้วยิงออกเน็ต (เจอเองตอนทำใบนี้ ⇒ ยิงไป aimgit.aimagin.com จริง)
      const u = new URL(route.request().url())
      u.hostname = ตัวเว็บ.hostname
      const r = await route.fetch({ url: u.href })
      let เนื้อ = await r.text()
      for (const [จาก, เป็น] of พัง.แทนโค้ด) {
        if (เนื้อ.includes(จาก)) {
          เนื้อ = เนื้อ.split(จาก).join(เป็น)
          นับ.ยัด++
        }
      }
      await route.fulfill({ response: r, body: เนื้อ })
    })
  }
  const ในตู้ = new Set([ตัวเว็บ.hostname, โดเมนจริง, ...ชื่อทดลอง])
  await ctx.route('**/*', async (route) => {
    const u = route.request().url()
    const h = new URL(u).hostname
    if (u.startsWith('data:') || u.startsWith('blob:')) return route.fallback()
    if (เป็นของGoogle(u)) {
      ขอGoogle.push(u)
      if (สคริปต์Google === 'ว่าง' && /googletagmanager\.com\/gtag\/js/.test(u))
        return route.fulfill({ status: 200, contentType: 'text/javascript', body: '/* สคริปต์ว่างของด่าน ⇒ ไม่ส่งอะไรออก */' })
      return route.abort()
    }
    if (!ในตู้.has(h)) {
      ขอนอก.push(u)
      return route.abort()
    }
    return route.fallback()
  })
  return { ctx, นับ, ขอGoogle, ขอนอก, ข้อมูล }
}

/** ⭐ หน้าใหม่ที่จดข้อผิดพลาดของหน้าไว้ */
async function แท็บใหม่(ctx) {
  const แท็บ = await ctx.newPage()
  const ข้อผิด = []
  แท็บ.on('pageerror', (e) => ข้อผิด.push(e.message))
  return { แท็บ, ข้อผิด }
}

/**
 * ⭐ กดลิงก์ *แหล่งข้อมูล* ของแถบบน ⇒ ลิงก์ของเว็บนี้เป็น `<a href>` ธรรมดา ⇒ โหลดหน้าใหม่ทั้งหน้า (ส่องเอง 14 พ.ย. 2569)
 *   ⇒ ทางที่ผู้อ่านเดินจริงวันนี้
 */
async function กดไปแหล่งข้อมูล(แท็บ) {
  const ลิงก์ = แท็บ.locator(`a[href$="${ทางฐาน}sources"]:visible, a[href$="${ทางฐาน}sources/"]:visible`).first()
  if (!(await ลิงก์.count())) throw new Error(`หน้าแรกไม่มีลิงก์ที่ตาเห็นไปหน้าแหล่งข้อมูล (${ทางฐาน}sources)`)
  await ลิงก์.click()
  await แท็บ.waitForURL((u) => u.pathname.replace(/\/+$/, '') === ทางฐาน + 'sources', { timeout: 20000 })
  await รอโค้ดของเว็บติด(แท็บ)
}

/**
 * ⭐ ย้ายหน้าด้วยตัวจัดเส้นทางของ Nuxt ⇒ ⛔ โหลดหน้าใหม่ ⇒ ทางที่ `<NuxtLink>` ใช้
 *   ⇒ วันนี้เว็บยังไม่มี `<NuxtLink>` ⇒ แต่วันที่มี ตัวนับต้องนับได้ ⇒ ด่านจึงสั่งตัวจัดเส้นทางตรง ๆ
 *   ⇒ คืน `true` ถ้ายังเป็นเอกสารเดิม (ไม่ได้โหลดหน้าใหม่)
 */
async function ย้ายในเว็บ(แท็บ, ทาง) {
  await แท็บ.evaluate(() => (window.__เอกสารเดิม = true))
  await แท็บ.evaluate((ไป) => document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$router.push(ไป), ทาง)
  await แท็บ.waitForURL((u) => u.pathname.replace(/\/+$/, '') === ทางฐาน + ทาง.replace(/^\/+/, ''), { timeout: 20000 })
  await รอโค้ดของเว็บติด(แท็บ)
  return แท็บ.evaluate(() => window.__เอกสารเดิม === true)
}

/** ⭐ เลือกบทจากแผงเปลี่ยนตอน ⇒ ทางเดียวกับผู้อ่าน ⇒ ท่าเดียวกับ `ไปข้อจากแผง` ใน `tools/ด่านบทเมื่อซ่อนเลข.mjs` */
async function เลือกบทจากแผง(แท็บ, บท) {
  await ปุ่มเปลี่ยนตอนของหน้า(แท็บ).click()
  const แผง = แท็บ.locator('[role="dialog"]')
  await แผง.waitFor()
  await แผง.getByRole('button', { name: /^มาระโก/ }).first().click()
  await แผง.locator('.pk-ตารางเลข button').filter({ hasText: new RegExp(`^${บท}$`) }).first().click()
  await แผง.locator('.pk-ปุ่มกว้าง').filter({ hasText: 'ทั้งบท' }).click()
  await แท็บ.waitForURL((u) => u.searchParams.get('c') === String(บท), { timeout: 20000 })
}

/** ⭐ เลื่อนอ่านลงไปจนที่อยู่บอกบท `บท` ⇒ ทางเดียวกับผู้อ่านที่อ่านต่อไปเรื่อย ๆ */
async function เลื่อนจนถึงบท(แท็บ, บท) {
  for (let i = 0; i < 120; i++) {
    if (new URL(แท็บ.url()).searchParams.get('c') === String(บท)) return true
    await แท็บ.mouse.wheel(0, 700)
    await แท็บ.waitForTimeout(150)
  }
  return new URL(แท็บ.url()).searchParams.get('c') === String(บท)
}

/** ⭐ ที่อยู่เปลี่ยนในบทเดิม ⇒ เติม `v` ด้วย `replaceState` แบบที่หน้าอ่านทำตอนแตะข้อ (`ปรับที่อยู่` ใน `หน้าอ่าน.vue`) */
async function เติมข้อในที่อยู่(แท็บ) {
  await แท็บ.evaluate(() => {
    const u = new URL(location.href)
    u.searchParams.set('v', '5')
    history.replaceState(history.state, '', u.pathname + '?' + u.searchParams.toString().replace(/%2C/g, ','))
  })
}

const จำนวนนับ = (ข้อมูล) => ข้อมูล.filter((x) => x[0] === 'event' && x[1] === 'page_view')
const หยุดดู = (แท็บ) => แท็บ.waitForTimeout(1500)

// ---------------------------------------------------------------- ⓪ ไฟล์ HTML ที่สร้างเสร็จ
async function ตรวจไฟล์({ โฟลเดอร์: ที่ = โฟลเดอร์ } = {}) {
  const ตก = []
  if (!existsSync(ที่)) return { ตก: [`⓪ ไม่มีโฟลเดอร์เว็บที่สร้างเสร็จ ${ที่} ⇒ ตรวจไฟล์ HTML ไม่ได้`], จำนวน: 0 }
  let จำนวน = 0
  const ไล่ = async (d) => {
    for (const e of await readdir(d, { withFileTypes: true })) {
      const p = join(d, e.name)
      if (e.isDirectory()) await ไล่(p)
      else if (e.name.endsWith('.html')) {
        จำนวน++
        const เนื้อ = await readFile(p, 'utf8')
        const เจอ = /googletagmanager|google-analytics|gtag\(|G-W3XP4T2FFE/.exec(เนื้อ)
        if (เจอ) ตก.push(`⓪ ${p} ⇒ มี "${เจอ[0]}" ในไฟล์ HTML ⇒ ทุกที่ที่เปิดเว็บจะส่งไป Google`)
      }
    }
  }
  await ไล่(ที่)
  if (!จำนวน) ตก.push(`⓪ ${ที่} ⛔ มีไฟล์ HTML สักไฟล์`)
  return { ตก, จำนวน }
}

// ---------------------------------------------------------------- ① เว็บทดลอง
async function ตรวจเว็บทดลอง({ พัง, เฉพาะ } = {}) {
  const ตก = []
  const นับรวม = { ยัด: 0 }
  for (const ชื่อ of ชื่อทดลอง) {
    if (เฉพาะ && !เฉพาะ.includes(ชื่อ)) continue
    const { ctx, นับ, ขอGoogle, ขอนอก } = await บริบท({ พัง })
    const บ = ฐานของ(ชื่อ)
    const { แท็บ, ข้อผิด } = await แท็บใหม่(ctx)
    const สภาพ = []
    const ดูหน้า = async (ที่) =>
      สภาพ.push({
        ที่,
        ...(await แท็บ.evaluate(() => ({
          gtag: typeof window.gtag,
          dataLayer: typeof window.dataLayer,
          สคริปต์: [...document.scripts].filter((s) => /google/.test(s.src)).length,
        }))),
      })
    try {
      await แท็บ.goto(บ + '/')
      await รอโค้ดของเว็บติด(แท็บ)
      await หยุดดู(แท็บ)
      await ดูหน้า('หน้าแรก')
      await ย้ายในเว็บ(แท็บ, '/sources')
      await หยุดดู(แท็บ)
      await ดูหน้า('ย้ายในเว็บไปหน้าแหล่งข้อมูล')
      await แท็บ.goto(บ + '/')
      await รอโค้ดของเว็บติด(แท็บ)
      await กดไปแหล่งข้อมูล(แท็บ)
      await หยุดดู(แท็บ)
      await ดูหน้า('กดลิงก์ไปหน้าแหล่งข้อมูล')
      await แท็บ.goto(บ + '/read/MRK')
      await รอโค้ดของเว็บติด(แท็บ)
      await เลื่อนจนถึงบท(แท็บ, 2)
      await เติมข้อในที่อยู่(แท็บ)
      await หยุดดู(แท็บ)
      await ดูหน้า('หน้าอ่าน')
      await แท็บ.goto(บ + '/read/MRK/2')
      await แท็บ.waitForURL((u) => u.searchParams.get('c') === '2', { timeout: 20000 })
      await รอโค้ดของเว็บติด(แท็บ)
      await หยุดดู(แท็บ)
      await ดูหน้า('หลังหน้าพาต่อ')
    } catch (e) {
      ตก.push(`① ${ชื่อ} ⇒ เดินเว็บไม่จบ ⇒ ${e.message.split('\n')[0].slice(0, 160)}`)
    }
    if (ขอGoogle.length) ตก.push(`① ${ชื่อ} ⇒ ส่งคำขอไป Google ${ขอGoogle.length} คำขอ ⇒ ${ขอGoogle[0].slice(0, 120)}`)
    for (const ส of สภาพ)
      if (ส.gtag !== 'undefined' || ส.dataLayer !== 'undefined' || ส.สคริปต์)
        ตก.push(`① ${ชื่อ} ${ส.ที่} ⇒ มีตัวนับในหน้า (gtag ${ส.gtag} · dataLayer ${ส.dataLayer} · สคริปต์ของ Google ${ส.สคริปต์})`)
    if (ขอนอก.length) ตก.push(`① ${ชื่อ} ⇒ มีคำขอออกนอกตู้ ${ขอนอก.length} คำขอ ⇒ ${ขอนอก[0].slice(0, 120)}`)
    if (ข้อผิด.length) ตก.push(`① ${ชื่อ} ⇒ หน้ามีข้อผิดพลาด ⇒ ${ข้อผิด[0].slice(0, 120)}`)
    นับรวม.ยัด += นับ.ยัด
    await ctx.close()
  }
  return { ตก, นับ: นับรวม }
}

// ---------------------------------------------------------------- ② ③ โดเมนจริง
async function ตรวจโดเมนจริง({ พัง } = {}) {
  const ตก = []
  const บ = ฐานของ(โดเมนจริง)
  const { ctx, นับ, ขอGoogle, ขอนอก, ข้อมูล } = await บริบท({ พัง, ฟังนับ: true })
  const { แท็บ, ข้อผิด } = await แท็บใหม่(ctx)
  const รอนับครบ = async (จำนวน, ข้อ, เรื่อง) => {
    try {
      await แท็บ.waitForFunction(() => true) // ให้คำสั่งที่ค้างในหน้าส่งออกมาก่อน
      for (let i = 0; i < 100 && จำนวนนับ(ข้อมูล).length < จำนวน; i++) await แท็บ.waitForTimeout(100)
    } catch {}
    const ได้ = จำนวนนับ(ข้อมูล).length
    if (ได้ !== จำนวน) {
      ตก.push(`${ข้อ} ${เรื่อง} ⇒ นับรวม ${ได้} ครั้ง ⛔ ${จำนวน} ครั้ง`)
      return false
    }
    return true
  }
  try {
    // ② เปิดหน้าแรก
    await แท็บ.goto(บ + '/')
    await รอโค้ดของเว็บติด(แท็บ)
    await รอนับครบ(1, '②', 'เปิดหน้าแรก')
    await หยุดดู(แท็บ)
    if (จำนวนนับ(ข้อมูล).length > 1) ตก.push(`② เปิดหน้าแรกครั้งเดียว ⇒ นับ ${จำนวนนับ(ข้อมูล).length} ครั้ง ⛔ 1`)
    // ⭐ สคริปต์ถูกขอหลังหน้าโหลดครบ + เครื่องว่าง (ข้อ ⑤) ⇒ รอให้คำขอมาก่อน ⇒ ⛔ เกิน 10 วินาที = ไม่มา
    for (let i = 0; i < 100 && !ขอGoogle.some((u) => /googletagmanager\.com\/gtag\/js/.test(u)); i++) await แท็บ.waitForTimeout(100)
    await หยุดดู(แท็บ)
    const ขอสคริปต์ = ขอGoogle.filter((u) => /googletagmanager\.com\/gtag\/js/.test(u))
    if (ขอสคริปต์.length !== 1) ตก.push(`② ขอสคริปต์ของ Google ${ขอสคริปต์.length} ครั้ง ⛔ 1 ครั้ง`)
    else if (new URL(ขอสคริปต์[0]).searchParams.get('id') !== รหัสวัดผล)
      ตก.push(`② ขอสคริปต์ด้วยรหัส ${new URL(ขอสคริปต์[0]).searchParams.get('id')} ⛔ ${รหัสวัดผล} (รหัสของเว็บเดิม)`)
    const ตั้งค่า = ข้อมูล.filter((x) => x[0] === 'config')
    if (ตั้งค่า.length !== 1 || ตั้งค่า[0][1] !== รหัสวัดผล)
      ตก.push(`② ตั้งค่าตัวนับ ${JSON.stringify(ตั้งค่า).slice(0, 160)} ⛔ ตั้งครั้งเดียวด้วย ${รหัสวัดผล}`)
    else {
      if (ตั้งค่า[0][2]?.send_page_view !== false) ตก.push('② ตั้งค่าตัวนับไม่มี send_page_view: false ⇒ Google นับเองซ้ำกับที่เว็บนับ')
      if (ตั้งค่า[0][2]?.anonymize_ip !== true) ตก.push('② ตั้งค่าตัวนับไม่มี anonymize_ip: true ⇒ ไม่เท่าเว็บเดิม')
    }
    const แรก = จำนวนนับ(ข้อมูล)[0]
    if (แรก && new URL(แรก[2]?.page_location ?? 'http://x/').pathname.replace(/\/+$/, '/') !== ทางฐาน)
      ตก.push(`② นับหน้าแรกด้วยที่อยู่ ${แรก[2]?.page_location} ⛔ หน้าแรก`)

    // ③ ย้ายหน้า 2 ทาง ⇒ ตัวจัดเส้นทาง (⛔ โหลดหน้าใหม่) กับลิงก์ `<a href>` ธรรมดา (โหลดหน้าใหม่)
    const ดูหน้าที่นับ = async (ลำดับ, เรื่อง) => {
      const x = จำนวนนับ(ข้อมูล)[ลำดับ][2] ?? {}
      const ชื่อหน้า = await แท็บ.title()
      if (!new URL(x.page_location).pathname.replace(/\/+$/, '').endsWith('/sources'))
        ตก.push(`③ ${เรื่อง} ⇒ นับด้วยที่อยู่ ${x.page_location} ⛔ /sources`)
      if (x.page_title !== ชื่อหน้า) ตก.push(`③ ${เรื่อง} ⇒ นับด้วยชื่อหน้า "${x.page_title}" ⛔ "${ชื่อหน้า}"`)
    }
    const เอกสารเดิม = await ย้ายในเว็บ(แท็บ, '/sources')
    if (!เอกสารเดิม) ตก.push('③ ย้ายด้วยตัวจัดเส้นทางแล้วโหลดหน้าใหม่ทั้งหน้า ⇒ ไม่ได้ทดสอบการย้ายหน้าในเว็บ')
    if (await รอนับครบ(2, '③', 'ย้ายหน้าในเว็บ (ตัวจัดเส้นทาง) หน้าแรก ⇒ แหล่งข้อมูล')) await ดูหน้าที่นับ(1, 'ย้ายหน้าในเว็บ')
    ข้อมูล.length = 0
    await แท็บ.goto(บ + '/')
    await รอโค้ดของเว็บติด(แท็บ)
    await รอนับครบ(1, '③', 'เปิดหน้าแรกอีกครั้ง')
    await กดไปแหล่งข้อมูล(แท็บ)
    if (await รอนับครบ(2, '③', 'กดลิงก์ในแถบบน หน้าแรก ⇒ แหล่งข้อมูล')) await ดูหน้าที่นับ(1, 'กดลิงก์ในแถบบน')

    // ③ หน้าอ่าน ⇒ เปิดใหม่ = นับ 1 ⇒ เลือกบท 3 = นับ 1 ⇒ เลื่อนข้ามไปบท 4 = นับ 1 ⇒ แตะข้อ = ⛔ นับ
    ข้อมูล.length = 0
    await แท็บ.goto(บ + '/read/MRK')
    await รอโค้ดของเว็บติด(แท็บ)
    await รอนับครบ(1, '③', 'เปิดหน้าอ่านมาระโก')
    await เลือกบทจากแผง(แท็บ, 3)
    if (await รอนับครบ(2, '③', 'เลือกบท 3 จากแผงเปลี่ยนตอน')) {
      const x = จำนวนนับ(ข้อมูล)[1][2] ?? {}
      if (new URL(x.page_location).searchParams.get('c') !== '3') ตก.push(`③ นับบท 3 ด้วยที่อยู่ ${x.page_location} ⛔ c=3`)
    }
    await รอโค้ดของเว็บติด(แท็บ)
    await หยุดดู(แท็บ)
    if (!(await เลื่อนจนถึงบท(แท็บ, 4))) ตก.push(`③ เลื่อนอ่านต่อแล้วที่อยู่ไม่ถึงบท 4 ⇒ ได้ ${แท็บ.url()}`)
    else if (await รอนับครบ(3, '③', 'เลื่อนอ่านข้ามจากบท 3 ไปบท 4')) {
      const x = จำนวนนับ(ข้อมูล)[2][2] ?? {}
      if (new URL(x.page_location).searchParams.get('c') !== '4') ตก.push(`③ นับบท 4 ด้วยที่อยู่ ${x.page_location} ⛔ c=4`)
    }
    const ก่อนแตะ = จำนวนนับ(ข้อมูล).length
    await เติมข้อในที่อยู่(แท็บ)
    await หยุดดู(แท็บ)
    if (จำนวนนับ(ข้อมูล).length !== ก่อนแตะ)
      ตก.push(`③ ที่อยู่เปลี่ยนในบทเดิม (เติม v) ⇒ นับเพิ่ม ${จำนวนนับ(ข้อมูล).length - ก่อนแตะ} ครั้ง ⛔ 0 ⇒ แตะข้อจะกลายเป็นหน้าใหม่`)

    // ③ หน้าพาต่อ ⇒ นับแค่หน้าที่ไปถึง
    ข้อมูล.length = 0
    await แท็บ.evaluate(() => sessionStorage.removeItem('__ด่านนับ'))
    await แท็บ.goto(บ + '/read/MRK/2')
    await แท็บ.waitForURL((u) => u.searchParams.get('c') === '2' && !/\/read\/MRK\/2/.test(u.pathname), { timeout: 20000 })
    await รอโค้ดของเว็บติด(แท็บ)
    await รอนับครบ(1, '③', 'หน้าพาต่อ /read/MRK/2')
    // ⭐ รอสภาพ ⛔ เดาเวลา ⇒ หน้าที่ไปถึงต้องนับแล้ว (ลงใน `sessionStorage` ของแท็บ) ⇒ ของที่หน้าพาต่อนับไว้อยู่ก่อนหน้านั้นเสมอ
    await แท็บ
      .waitForFunction(
        () =>
          JSON.parse(sessionStorage.getItem('__ด่านนับ') || '[]').some(
            (x) => x[0] === 'event' && x[1] === 'page_view' && !/\/read\/MRK\/2/.test(x[2]?.page_location ?? ''),
          ),
        null,
        { timeout: 10000 },
      )
      .catch(() => {})
    await หยุดดู(แท็บ)
    const พาต่อ = จำนวนนับ(await แท็บ.evaluate(() => JSON.parse(sessionStorage.getItem('__ด่านนับ') || '[]')))
    if (พาต่อ.length !== 1)
      ตก.push(`③ หน้าพาต่อ /read/MRK/2 ⇒ นับ ${พาต่อ.length} ครั้ง ⛔ 1 ⇒ ${พาต่อ.map((x) => x[2]?.page_location).join(' · ')}`)
    else if (/\/read\/MRK\/2/.test(พาต่อ[0][2]?.page_location)) ตก.push(`③ หน้าพาต่อ ⇒ นับหน้าพาต่อแทนหน้าที่ไปถึง ${พาต่อ[0][2]?.page_location}`)
  } catch (e) {
    ตก.push(`③ เดินเว็บในชื่อ ${โดเมนจริง} ไม่จบ ⇒ ${e.message.split('\n')[0].slice(0, 160)}`)
  }
  if (ขอนอก.length) ตก.push(`② มีคำขอออกนอกตู้ที่ไม่ใช่ Google ${ขอนอก.length} คำขอ ⇒ ${ขอนอก[0].slice(0, 120)}`)
  if (ข้อผิด.length) ตก.push(`② หน้ามีข้อผิดพลาด ⇒ ${ข้อผิด[0].slice(0, 120)}`)
  await ctx.close()
  return { ตก, นับ }
}

// ---------------------------------------------------------------- ④ Google ตอบไม่ได้
async function ตรวจGoogleล่ม({ พัง } = {}) {
  const ตก = []
  const { ctx, นับ, ขอGoogle } = await บริบท({ พัง, สคริปต์Google: 'ตัด' })
  const { แท็บ, ข้อผิด } = await แท็บใหม่(ctx)
  try {
    await แท็บ.goto(ฐานของ(โดเมนจริง) + '/')
    await รอโค้ดของเว็บติด(แท็บ)
    await แท็บ.locator('article.pk-หน้าแรก h1').waitFor({ state: 'visible', timeout: 10000 })
    await กดไปแหล่งข้อมูล(แท็บ)
    await หยุดดู(แท็บ)
  } catch (e) {
    ตก.push(`④ Google ตอบไม่ได้ ⇒ หน้าใช้ไม่ได้ ⇒ ${e.message.split('\n')[0].slice(0, 160)}`)
  }
  if (!ขอGoogle.length) ตก.push('④ ⛔ มีคำขอไป Google ให้ตัด ⇒ ข้อนี้ไม่ได้ทดสอบอะไร')
  if (ข้อผิด.length) ตก.push(`④ Google ตอบไม่ได้ ⇒ หน้ามีข้อผิดพลาด ⇒ ${ข้อผิด[0].slice(0, 120)}`)
  await ctx.close()
  return { ตก, นับ }
}

// ---------------------------------------------------------------- ⑤ สคริปต์ของ Google มาหลังหน้าโหลดครบ
const ภาพหน่วง = '__ด่านนับคน-หน่วงโหลด.png'
const หน่วงนาน = 3000
async function ตรวจโหลดทีหลัง({ พัง } = {}) {
  const ตก = []
  const { ctx, นับ, ข้อมูล } = await บริบท({ พัง, ฟังนับ: true })
  // ⭐ ลงทีหลังตัวตัดเน็ต ⇒ ถูกถามก่อน ⇒ ภาพหน่วงตอบช้า 3 วินาที ⇒ `load` ของหน้ารอภาพนี้
  await ctx.route(`**/${encodeURI(ภาพหน่วง)}`, async (route) => {
    await new Promise((r) => setTimeout(r, หน่วงนาน))
    await route.fulfill({
      status: 200,
      contentType: 'image/png',
      body: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64'),
    })
  })
  await ctx.addInitScript((ชื่อภาพ) => {
    const เวลา = (window.__ด่านเวลา = { load: null, ใส่: null, ใส่ก่อนload: null })
    addEventListener('load', () => (เวลา.load = performance.now()))
    new MutationObserver((ชุด) => {
      for (const m of ชุด)
        for (const n of m.addedNodes)
          if (n.tagName === 'SCRIPT' && /googletagmanager/.test(n.src) && เวลา.ใส่ === null) {
            เวลา.ใส่ = performance.now()
            เวลา.ใส่ก่อนload = เวลา.load === null
          }
    }).observe(document, { childList: true, subtree: true })
    document.addEventListener('DOMContentLoaded', () => {
      const ภาพ = new Image()
      ภาพ.src = '/' + ชื่อภาพ
      ภาพ.alt = ''
      ภาพ.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0'
      document.body.appendChild(ภาพ)
    })
  }, ภาพหน่วง)
  const { แท็บ, ข้อผิด } = await แท็บใหม่(ctx)
  try {
    await แท็บ.goto(ฐานของ(โดเมนจริง) + '/', { waitUntil: 'load', timeout: 30000 })
    await แท็บ.waitForFunction(() => window.__ด่านเวลา.ใส่ !== null, null, { timeout: 10000 }).catch(() => {})
    const เวลา = await แท็บ.evaluate(() => window.__ด่านเวลา)
    if (เวลา.load === null || เวลา.load < หน่วงนาน - 500)
      ตก.push(`⑤ หน้าโหลดครบที่ ${Math.round(เวลา.load ?? -1)} ms ⛔ หลังภาพหน่วง ${หน่วงนาน} ms ⇒ ข้อนี้ไม่ได้ทดสอบอะไร`)
    if (เวลา.ใส่ === null) ตก.push('⑤ สคริปต์ของ Google ⛔ ถูกใส่ลงหน้าเลยภายใน 10 วินาทีหลังหน้าโหลดครบ')
    else if (เวลา.ใส่ก่อนload || เวลา.ใส่ < เวลา.load)
      ตก.push(`⑤ สคริปต์ของ Google ถูกใส่ที่ ${Math.round(เวลา.ใส่)} ms ⇒ ก่อนหน้าโหลดครบ (${Math.round(เวลา.load ?? -1)} ms) ⇒ แย่งการโหลดหน้า`)
    for (let i = 0; i < 50 && จำนวนนับ(ข้อมูล).length < 1; i++) await แท็บ.waitForTimeout(100)
    await หยุดดู(แท็บ)
    if (จำนวนนับ(ข้อมูล).length !== 1) ตก.push(`⑤ หน้าโหลดช้า ⇒ นับหน้าแรก ${จำนวนนับ(ข้อมูล).length} ครั้ง ⛔ 1`)
  } catch (e) {
    ตก.push(`⑤ เปิดหน้าแรกที่โหลดช้าไม่จบ ⇒ ${e.message.split('\n')[0].slice(0, 160)}`)
  }
  if (ข้อผิด.length) ตก.push(`⑤ หน้ามีข้อผิดพลาด ⇒ ${ข้อผิด[0].slice(0, 120)}`)
  await ctx.close()
  return { ตก, นับ }
}

/**
 * ⭐⭐ **ของพัง ⇒ ยัดเข้าเบราว์เซอร์ทีละชิ้น ⇒ ⛔ แตะโค้ดในที่เก็บ**
 *   ⇒ `แทนโค้ด` แก้ไฟล์ `_nuxt/*.js` ที่เบราว์เซอร์โหลด · `ก่อนโหลด` วิ่งก่อนโค้ดของเว็บ · `ไฟล์พัง` เขียนไฟล์ HTML ปลอมในที่พัก
 */
const ของพัง = {
  // ① ⇒ ลบการเช็กชื่อเว็บ ⇒ ทุกที่นับหมด
  ไม่เช็กชื่อเว็บ: {
    ข้อ: '①',
    ตรวจ: ตรวจเว็บทดลอง,
    เฉพาะ: ['aimgit.aimagin.com'],
    แทนโค้ด: [['"phrakham.life"', 'location.hostname'], ['`phrakham.life`', 'location.hostname']],
  },
  // ① ⇒ ใครฝังสคริปต์ของ Google ไว้ในหัวหน้า (เช่นใส่ใน `app.head`) ⇒ เว็บทดลองส่งไป Google
  ฝังในหัวหน้า: {
    ข้อ: '①',
    ตรวจ: ตรวจเว็บทดลอง,
    เฉพาะ: ['127.0.0.1'],
    ก่อนโหลด: () => {
      document.addEventListener('DOMContentLoaded', () => {
        const s = document.createElement('script')
        s.async = true
        s.src = 'https://www.googletagmanager.com/gtag/js?id=G-W3XP4T2FFE'
        document.head.appendChild(s)
      })
    },
  },
  // ⓪ ⇒ ไฟล์ HTML ที่สร้างเสร็จมีสคริปต์ของ Google
  ไฟล์มีGoogle: {
    ข้อ: '⓪',
    ไฟล์พัง: '<!doctype html><html><head><script async src="https://www.googletagmanager.com/gtag/js?id=G-W3XP4T2FFE"></script></head><body></body></html>',
  },
  // ② ⇒ รหัสวัดผลไม่ใช่ของเว็บเดิม ⇒ ตัวเลขไม่ต่อเนื่อง
  รหัสผิด: { ข้อ: '②', ตรวจ: ตรวจโดเมนจริง, แทนโค้ด: [['G-W3XP4T2FFE', 'G-0000000000']] },
  // ③ ⇒ นับแค่ตอนเปิดเว็บครั้งแรก ⇒ ย้ายหน้าในเว็บไม่นับ
  //   ⇒ ⭐ แทนแค่ที่ตัวนับฟัง (`page:finish` ตามด้วยตัวรอของตัวนับ) ⇒ ⛔ แทนทุกที่ ⇒ แกนของ Nuxt ที่ยิง `page:finish` จะยิง `app:mounted` แทน ⇒ ตัวนับยังได้ยินทุกครั้ง ⇒ ของพังไม่พัง
  ไม่นับย้ายหน้า: {
    ข้อ: '③',
    ตรวจ: ตรวจโดเมนจริง,
    แทนโค้ด: [['"page:finish",()=>{setTimeout(', '"app:mounted",()=>{setTimeout('], ['`page:finish`,()=>{setTimeout(', '`app:mounted`,()=>{setTimeout(']],
  },
  // ③ ⇒ ไม่ฟังที่อยู่ที่หน้าอ่านเขียนเอง ⇒ เปลี่ยนบทไม่นับ
  ไม่นับเปลี่ยนบท: {
    ข้อ: '③',
    ตรวจ: ตรวจโดเมนจริง,
    แทนโค้ด: [['["pushState","replaceState"]', '[]'], ['[`pushState`,`replaceState`]', '[]']],
  },
  // ③ ⇒ ถือว่าที่อยู่ทั้งก้อนคือหน้า ⇒ แตะข้อก็นับเป็นหน้าใหม่
  แตะข้อก็นับ: {
    ข้อ: '③',
    ตรวจ: ตรวจโดเมนจริง,
    แทนโค้ด: [['.get("c")||"1"', '.toString()||"1"'], ['.get(`c`)||`1`', '.toString()||`1`']],
  },
  // ③ ⇒ หน้าพาต่อไม่บอกตัวนับ ⇒ ลิงก์เดียวนับ 2 หน้า
  นับหน้าพาต่อ: { ข้อ: '③', ตรวจ: ตรวจโดเมนจริง, แทนโค้ด: [['=!0,location.replace(', '=!1,location.replace(']] },
  // ⑤ ⇒ ใส่สคริปต์ของ Google ทันทีที่เว็บติด ⛔ รอหน้าโหลดครบ ⇒ แย่งเน็ตกับหน้า
  ใส่ทันที: {
    ข้อ: '⑤',
    ตรวจ: ตรวจโหลดทีหลัง,
    แทนโค้ด: [
      ['document.readyState===`complete`', '!0'],
      ['document.readyState==="complete"', '!0'],
      ['`complete`===document.readyState', '!0'],
      ['"complete"===document.readyState', '!0'],
    ],
  },
  // ④ ⇒ ตัวนับพังเมื่อ Google ตอบไม่ได้
  พังเมื่อGoogleล่ม: {
    ข้อ: '④',
    ตรวจ: ตรวจGoogleล่ม,
    // ⭐ ห่อการใส่สคริปต์ลงหัวหน้า ⇒ ⛔ ผูกกับชื่อตัวแปรที่ตัวย่อโค้ดตั้งให้
    แทนโค้ด: [
      ['document.head.appendChild(', '((s)=>(s.onerror=()=>{throw new Error("ของพัง ⇒ Google ล่มแล้วหน้าพัง")},document.head.appendChild(s)))('],
    ],
  },
}

if (ทดสอบตัวเอง) {
  console.log(`ทดสอบตัวเอง ⇒ ยัดของพัง ${Object.keys(ของพัง).length} ท่าทีละชิ้น ⇒ แต่ละชิ้นต้องทำให้ข้อของมันแดง`)
  const ไม่แดง = []
  for (const [ชื่อ, พัง] of Object.entries(ของพัง)) {
    let ตก, นับ
    if (พัง.ไฟล์พัง) {
      const ที่พัก = await mkdtemp(join(tmpdir(), 'ด่านนับคน-'))
      await writeFile(join(ที่พัก, 'index.html'), พัง.ไฟล์พัง)
      ;({ ตก } = await ตรวจไฟล์({ โฟลเดอร์: ที่พัก }))
      นับ = { ยัด: 1 }
      await rm(ที่พัก, { recursive: true, force: true })
    } else ({ ตก, นับ } = await พัง.ตรวจ({ พัง, เฉพาะ: พัง.เฉพาะ }))
    const ของข้อนี้ = ตก.filter((x) => x.startsWith(พัง.ข้อ))
    if (!นับ.ยัด) {
      console.log(`  ⛔ ${ชื่อ} ⇒ ยัดของพังไม่เข้า (หาคำที่จะแทนในไฟล์ที่โหลดไม่เจอ) ⇒ ต้องแก้ของพัง`)
      ไม่แดง.push(ชื่อ)
    } else if (ของข้อนี้.length) console.log(`  ✅ ${ชื่อ} ⇒ ข้อ ${พัง.ข้อ} แดง ⇒ ${ของข้อนี้[0].slice(0, 160)}`)
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

console.log(`ด่านนับคนเข้าเว็บ ⇒ ${ฐาน} ⇒ ไฟล์ที่ ${โฟลเดอร์}`)
const ตก = []
const ไฟล์ = await ตรวจไฟล์()
ตก.push(...ไฟล์.ตก)
for (const ตรวจ of [ตรวจเว็บทดลอง, ตรวจโดเมนจริง, ตรวจGoogleล่ม, ตรวจโหลดทีหลัง]) ตก.push(...(await ตรวจ()).ตก)
await เบราว์เซอร์.close()
if (ตก.length) {
  console.log(`\n⛔ ตก ${ตก.length} รายการ`)
  for (const x of ตก) console.log('  ' + x)
  process.exit(1)
}
console.log(
  `✅ ไฟล์ HTML ${ไฟล์.จำนวน} ไฟล์ไม่มีของ Google · เว็บทดลอง ${ชื่อทดลอง.length} ชื่อไม่ส่งอะไรไป Google` +
    ` · ${โดเมนจริง} ใช้รหัส ${รหัสวัดผล} · ย้ายหน้าและเปลี่ยนบทนับใหม่ · แตะข้อไม่นับ · หน้าพาต่อนับครั้งเดียว · Google ล่มหน้ายังใช้ได้ · สคริปต์ของ Google มาหลังหน้าโหลดครบ`,
)
