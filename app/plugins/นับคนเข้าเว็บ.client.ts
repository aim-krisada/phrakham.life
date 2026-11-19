// ⭐⭐ **นับคนเข้าเว็บด้วย Google Analytics ⇒ เฉพาะโดเมนจริง** (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/170)
//
// ⭐ **รหัสวัดผลเดิมของเว็บเดิม** ⇒ `_quarto.yml` ของ `krisada/phrakham.life2` บรรทัด `google-analytics: "G-W3XP4T2FFE"`
//   ⇒ ใช้ตัวเดียวกัน ⇒ ตัวเลขต่อเนื่องจากเว็บเดิม (เกณฑ์ข้อ 1)
//   ⇒ `anonymize_ip` ตั้งเหมือนที่เว็บเดิมส่งจริง (เปิด https://phrakham.life/ ดูหัวหน้า 14 พ.ย. 2569)
//
// ⛔⛔ **ไม่ใช่โดเมนจริง ⇒ หยุดตั้งแต่บรรทัดแรก** (เกณฑ์ข้อ 2)
//   ⇒ ⛔ ไม่ใส่สคริปต์ · ⛔ ไม่สร้าง `gtag` กับ `dataLayer` · ⛔ ไม่ห่อ `history`
//   ⇒ เว็บทดลองบนอัมกิตกับเครื่องในท่อจึง **ไม่ส่งอะไรไป Google เลย** ⇒ คนทดลองไม่ปนกับคนอ่านจริง
//   ⇒ ⭐ www.phrakham.life ⛔ ไม่อยู่ในรายชื่อ ⇒ GitHub Pages พาไป phrakham.life ให้เอง (ตอบ 301 ⇒ ดูเอง 14 พ.ย. 2569)
// ⛔⛔ **ห้ามย้ายไปใส่ใน `app.head` ของ `nuxt.config.ts`** ⇒ ของในนั้นถูกเขียนลงไฟล์ HTML ทุกไฟล์ ⇒ ทุกที่ที่เปิดเว็บส่งไป Google
//   ⇒ ตัวเฝ้าคือ `tools/ด่านนับคนเข้าเว็บ.mjs` ข้อ ① ②
//
// ⭐⭐ **นับเองทีละหน้า ⇒ ปิดการนับตอนตั้งค่าของ Google (`send_page_view: false`)** (เกณฑ์ข้อ 3)
//   ⇒ เว็บนี้เป็นแอปหน้าเดียว ⇒ ย้ายหน้าในเว็บ ⛔ ไม่โหลดหน้าใหม่ ⇒ Google ⛔ ไม่รู้เอง
//   ⇒ **หน้าเดียวกัน = ที่อยู่เดียวกัน + บทเดียวกัน** (`กุญแจหน้า`)
//     ⇒ ย้ายเส้นทาง ⇒ นับ · เปลี่ยนบท (เลื่อนอ่านข้ามบท หรือเลือกบทใหม่) ⇒ นับ
//     ⇒ แตะข้อ · เปิดคอลัมน์ · ฟังช่วง ⇒ หน้าอ่านเขียนที่อยู่บนแถบใหม่ ⇒ ⛔ ไม่นับ เพราะยังอยู่บทเดิม
//   ⇒ ⚠️ ตัวเลือก *Page changes based on browser history events* ในหน้า Google Analytics ต้องปิด
//     ⇒ ⛔ ไม่ปิด = Google นับเพิ่มเองทุกครั้งที่ที่อยู่บนแถบเปลี่ยน ⇒ เปลี่ยนบทนับ 2 ครั้ง · แตะข้อก็นับ
//     ⇒ ทางกดอยู่ในใบ #170 ⇒ ⛔ โค้ดปิดแทนไม่ได้
//
// ⭐ **สคริปต์ของ Google โหลดแบบไม่รอ (`async`) หลังหน้าโหลดครบแล้ว** ⇒ ⛔ ไม่ขวางการวาดหน้า ⇒ รายละเอียดอยู่ที่ `ใส่สคริปต์Google`
//   ⇒ Google ตอบไม่ได้ (เน็ตหลุด ตัวกันโฆษณา) ⇒ ข้อมูลค้างใน `dataLayer` เฉย ๆ ⇒ หน้ายังใช้ได้ทุกอย่าง (ด่านข้อ ④)
//
// ⛔ **ไม่มีถ้อยคำบนจอ** ⇒ เว็บเดิมไม่มีป้ายคุกกี้ ⇒ ใบนี้ไม่ใส่ (ข้อเสนออยู่ในใบ #170 รอพี่เอมตัดสิน)
import { กำลังออกจากหน้า } from '~/utils/ออกจากหน้า'

const รหัสวัดผล = 'G-W3XP4T2FFE'

type ห่อประวัติ = (data: unknown, unused: string, url?: string | URL | null) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** ⭐ หน้าเดียวกันไหม ⇒ ทาง (ตัดทับปิดท้ายกับ `index.html`) + บทของหน้าอ่าน */
function กุญแจหน้า(): string {
  const ทาง = location.pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/'
  // ⭐ หน้าของเล่ม `/read/<เล่ม>` ⇒ ไม่มี `c` = บทแรกของเล่มที่สร้างไว้ล่วงหน้า (บท 1)
  //   ⇒ ⛔ ไม่ใส่ค่านี้ ⇒ เลื่อนอ่านในบทแรกแล้วหน้าเขียน `c=1` ⇒ นับเป็นหน้าใหม่ทั้งที่ยังอยู่บทเดิม
  if (!/\/read\/[^/]+$/.test(ทาง)) return ทาง
  return `${ทาง}?c=${new URLSearchParams(location.search).get('c') || '1'}`
}

export default defineNuxtPlugin((nuxtApp) => {
  if (location.hostname !== 'phrakham.life') return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // ⭐ ต้องส่ง `arguments` ตัวจริง ⛔ ไม่ใช่อาร์เรย์ ⇒ สคริปต์ของ Google อ่านแบบนั้น (ลอกแบบจากหัวหน้าเว็บเดิม)
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', รหัสวัดผล, { anonymize_ip: true, send_page_view: false })

  // ⭐⭐ **สคริปต์ของ Google ขอทีหลังสุด ⇒ หลังเว็บติด + หลังหน้าโหลดครบ (`load`) + ตอนเครื่องว่าง** (พี่เอมเคาะ 17 พ.ย. 2569)
  //   ⇒ เดิมใส่ตั้งแต่ตัวนี้เริ่ม ⇒ สคริปต์ราว 100 KB แย่งเน็ตกับโค้ดและฟอนต์ของหน้าอ่านบนมือถือ
  //   ⇒ การนับ ⛔ หาย ⇒ `gtag(...)` ข้างบนกับ `page_view` ข้างล่างค้างใน `dataLayer` ⇒ สคริปต์มาถึงแล้วส่งที่ค้างทั้งหมดเอง
  //   ⇒ ⚠️ ราคาที่จ่าย ⇒ คนที่ปิดหน้าก่อนหน้าโหลดครบ ⛔ ถูกนับ ⇒ ตัวเลข *เข้าแล้วออกทันที* ต่ำกว่าเว็บเดิมได้นิดหน่อย
  //   ⇒ ตัวเฝ้าคือ `tools/ด่านนับคนเข้าเว็บ.mjs` ข้อ ⑤
  function ใส่สคริปต์Google() {
    const สคริปต์ = document.createElement('script')
    สคริปต์.async = true
    สคริปต์.src = `https://www.googletagmanager.com/gtag/js?id=${รหัสวัดผล}`
    document.head.appendChild(สคริปต์)
  }
  function รอเครื่องว่าง() {
    if (typeof requestIdleCallback === 'function') requestIdleCallback(ใส่สคริปต์Google, { timeout: 2000 })
    else setTimeout(ใส่สคริปต์Google, 200)
  }
  nuxtApp.hook('app:mounted', () => {
    if (document.readyState === 'complete') รอเครื่องว่าง()
    else window.addEventListener('load', รอเครื่องว่าง, { once: true })
  })

  let นับล่าสุด: string | null = null
  function นับถ้าหน้าใหม่() {
    if (กำลังออกจากหน้า()) return
    const กุญแจ = กุญแจหน้า()
    if (กุญแจ === นับล่าสุด) return
    นับล่าสุด = กุญแจ
    window.gtag!('event', 'page_view', { page_location: location.href, page_title: document.title })
  }

  // ⭐ เปิดหน้าครั้งแรก กับย้ายเส้นทางในเว็บ ⇒ รอหน้าใหม่ติดก่อน ⇒ ชื่อหน้า (`document.title`) เป็นของหน้าใหม่แล้ว
  nuxtApp.hook('page:finish', () => {
    setTimeout(นับถ้าหน้าใหม่, 0)
  })

  // ⭐ เปลี่ยนบทในหน้าอ่าน ⇒ ⛔ ไม่ผ่านตัวจัดเส้นทาง ⇒ หน้าอ่านเขียนที่อยู่เองด้วย `history`
  //   ⇒ ฟังตรงนั้น ⇒ ⛔ แต่ถ้าทางเปลี่ยน ปล่อยให้ `page:finish` นับ ⇒ ชื่อหน้าจะได้เป็นของหน้าใหม่
  const ทางที่นับ = () => (นับล่าสุด ?? '').split('?')[0]
  const ทางตอนนี้ = () => กุญแจหน้า().split('?')[0]
  function หลังเปลี่ยนที่อยู่() {
    if (นับล่าสุด !== null && ทางตอนนี้() === ทางที่นับ()) นับถ้าหน้าใหม่()
  }
  for (const ชื่อ of ['pushState', 'replaceState'] as const) {
    const เดิม = history[ชื่อ].bind(history) as ห่อประวัติ
    history[ชื่อ] = ((data, unused, url) => {
      เดิม(data, unused, url)
      หลังเปลี่ยนที่อยู่()
    }) as ห่อประวัติ
  }
  window.addEventListener('popstate', หลังเปลี่ยนที่อยู่)
})
