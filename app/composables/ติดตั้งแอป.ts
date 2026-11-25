// ⭐⭐ **สถานะของปุ่ม *ติดตั้งแอพ* ⇒ ที่เดียวทั้งเว็บ** (ยกมาจากเว็บเพลง `src/lib/pwaInstall.js` ⇒ ใบ v3/pleng#156 · #158 · #165)
//   ⇒ คำตัดสินว่ากดแล้วทำอะไรอยู่ที่ `app/utils/ติดตั้งแอป.ts` (ฟังก์ชันล้วน) ⇒ ที่นี่ถือแค่สถานะกับตัวฟัง
//
// ⭐ **ทำไมเป็นสถานะกลาง ⛔ ไม่ใช่ของชิ้นส่วน** ⇒ `beforeinstallprompt` เกิดครั้งเดียว ตั้งแต่ต้น ⇒ มักก่อนชิ้นส่วนไหนติด
//   ⇒ ตัวเสริม `app/plugins/ติดตั้งแอป.client.ts` เรียก `เริ่มฟังการติดตั้ง()` ก่อนแอปติด ⇒ หน้าต่างที่จับไว้อยู่จนผู้อ่านกด
//
// ⛔ **ฝั่งสร้างหน้า (SSR) ⇒ ⛔ แตะ `window` · `localStorage`** ⇒ ค่าตั้งต้นทุกตัวเป็น *ยังไม่รู้* ⇒ ตัวเสริมฝั่งเครื่องอ่านค่าจริงทีหลัง
//   ⇒ ชิ้นส่วนแสดงการ์ดหลังติดแล้วเท่านั้น (`onMounted`) ⇒ ไฟล์ HTML ที่สร้างไว้ ⛔ มีการ์ด ⇒ ⛔ หน้าไม่ตรงตอนโค้ดติด
//
// ⭐ **ที่เก็บในเครื่อง ⇒ กุญแจขึ้นต้น `phrakham.`** ⇒ ท่าเดียวกับ `app/utils/มุมมอง.ts` ⇒ ⛔ เก็บได้ (โหมดส่วนตัว) ⇒ เงียบ ⇒ จำแค่รอบนี้
import { ref } from 'vue'
import { วางแผนติดตั้ง, กุญแจติดตั้งแอป, อ่านเบราว์เซอร์, type แผ่นติดตั้ง } from '~/utils/ติดตั้งแอป'

/** หน้าต่างติดตั้งของเบราว์เซอร์ (`beforeinstallprompt`) ⇒ ชนิดของ Chrome ⛔ อยู่ใน lib.dom */
interface หน้าต่างติดตั้ง extends Event {
  prompt: () => Promise<unknown>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

/** หน้านี้เปิดเป็นแอปที่ติดตั้งแล้ว (Android/คอม ⇒ `display-mode: standalone` · iPhone ⇒ `navigator.standalone`) */
export const เปิดเป็นแอป = ref(false)
/** ⭐ ใบ v3/pleng#158 ⇒ ติดตั้งแล้ว แม้ดูจากแท็บเบราว์เซอร์ธรรมดา ⇒ ⛔ เสนอให้ติดตั้งซ้ำ */
export const ติดตั้งแล้ว = ref(false)
/** ✕ บนการ์ดหน้าแรก ⇒ จำในเครื่องนี้ */
export const ปิดการ์ดแล้ว = ref(false)
/** ✕ บนบรรทัด *ติดตั้งแล้ว* ⇒ จำในเครื่องนี้ */
export const ปิดบรรทัดติดตั้งแล้ว = ref(false)
/** แผ่นบอกขั้นที่เปิดอยู่ (ทีละแผ่น) ⇒ `แผ่นติดตั้งแอป.vue` วาด */
export const แผ่นที่เปิด = ref<แผ่นติดตั้ง | null>(null)

let หน้าต่างที่จับไว้: หน้าต่างติดตั้ง | null = null
let คืนโฟกัสที่: HTMLElement | null = null

// ⭐ ชื่อกุญแจอยู่ที่ `app/utils/ติดตั้งแอป.ts` ⇒ สคริปต์ก่อนวาด (`สคริปต์ชวนติดตั้งก่อนวาด`) อ่านชื่อเดียวกัน ⇒ ⛔ พิมพ์ซ้ำที่นี่
const { การ์ด: กุญแจการ์ด, ติดตั้งแล้ว: กุญแจติดตั้งแล้ว, เห็นแอป: กุญแจเห็นแอป, บรรทัด: กุญแจบรรทัด } = กุญแจติดตั้งแอป
/** ⭐ ใบ v3/pleng#165 ⇒ เปิดแอปในเครื่องนี้ภายใน 30 วัน ⇒ เชื่อว่ายังติดตั้งอยู่ แม้ `getInstalledRelatedApps` ตอบว่าง */
const สดภายใน = 30 * 24 * 60 * 60 * 1000

function อ่านธง(k: string) {
  try {
    return localStorage.getItem(k) === '1'
  } catch {
    return false
  }
}
function ตั้งธง(k: string) {
  try {
    localStorage.setItem(k, '1')
  } catch {
    /* โหมดส่วนตัว ⇒ จำแค่รอบนี้ */
  }
}

function ดูว่าเปิดเป็นแอป() {
  const mm = typeof matchMedia === 'function' && matchMedia('(display-mode: standalone)').matches
  // ⭐ Safari ของ iPhone ⛔ รองรับ `display-mode` ⇒ บอกผ่าน `navigator.standalone`
  const iosApp = (navigator as Navigator & { standalone?: boolean }).standalone === true
  return Boolean(mm || iosApp)
}

export function จำว่าติดตั้งแล้ว() {
  ติดตั้งแล้ว.value = true
  ตั้งธง(กุญแจติดตั้งแล้ว)
}
/** ⭐ หน้านี้คือแอปเอง ⇒ แท็บเบราว์เซอร์ใช้ที่เก็บเดียวกัน ⇒ แท็บต่อไปรู้ว่าติดตั้งแล้ว */
function จำว่าเห็นแอป() {
  จำว่าติดตั้งแล้ว()
  try {
    localStorage.setItem(กุญแจเห็นแอป, String(Date.now()))
  } catch {
    /* โหมดส่วนตัว */
  }
}
function เห็นแอปไม่นานนี้() {
  let เมื่อ = 0
  try {
    เมื่อ = Number(localStorage.getItem(กุญแจเห็นแอป)) || 0
  } catch {
    /* โหมดส่วนตัว */
  }
  return เมื่อ > 0 && Date.now() - เมื่อ < สดภายใน
}

/** Chrome ของ Android ตัวจริง ⇒ ⛔ Samsung ⛔ Edge ⛔ Opera ⛔ หน้าเว็บในแอปแชต (`อ่านเบราว์เซอร์` นับ Edge/Opera เป็น chrome) */
function เป็นChromeแท้() {
  const ua = navigator.userAgent
  const b = อ่านเบราว์เซอร์(ua)
  return b.เบราว์เซอร์ === 'chrome' && !b.ในแอป && !/EdgA\/|OPR\/|; wv\)/.test(ua)
}
/** ⭐ ลืมธงติดตั้ง ⇒ หน้าแรกกลับมาชวนติดตั้ง ⇒ ลบเวลาเห็นแอปด้วย ⇒ ⛔ ให้กติกา 30 วันดึงธงกลับมา */
function ลืมว่าติดตั้งแล้ว() {
  ติดตั้งแล้ว.value = false
  try {
    localStorage.removeItem(กุญแจติดตั้งแล้ว)
    localStorage.removeItem(กุญแจเห็นแอป)
  } catch {
    /* โหมดส่วนตัว */
  }
}

/**
 * ⭐ Chrome บน Android ⇒ ถามระบบว่าแอปของเว็บนี้ติดตั้งอยู่ไหม ⇒ ต้องมี `related_applications` ใน manifest
 *   ⇒ มีแล้ว (`public/manifest.webmanifest` ⇒ `platform: webapp` ชี้ manifest ของตัวเอง ⇒ ตัวเฝ้า `tools/ด่านติดตั้งเป็นแอป.mjs` ข้อ ⑧)
 *   ⚠️ Chrome หาแอปที่ *Chrome ติดตั้ง* (WebAPK ที่ลายเซ็นตรงของ Chrome) ⇒ Samsung Internet ⛔ มีหลักฐานว่าเห็นแอปที่ Chrome ติดตั้ง
 *     ⇒ จึงยังต้องมีบรรทัด *ถ้าติดตั้งแล้ว เปิดจากไอคอน* บนแผ่น Samsung (`ก่อนหัว` ของ `แผ่นSamsung` ใน `app/utils/ติดตั้งแอป.ts`)
 */
async function ถามแอปที่ติดตั้ง() {
  const nav = navigator as Navigator & { getInstalledRelatedApps?: () => Promise<unknown[]> }
  if (typeof nav.getInstalledRelatedApps !== 'function') return
  try {
    const แอป = await nav.getInstalledRelatedApps()
    if (Array.isArray(แอป) && แอป.length) จำว่าติดตั้งแล้ว()
    // ⚠️ ตอบว่าง ⛔ พิสูจน์ว่าถอนแล้ว ⇒ Chrome เทียบกับ manifest ที่แอปเก็บไว้ ⇒ อัปเดตช้า ⇒ ลืมเฉพาะเมื่อ ⛔ เห็นแอปมา 30 วัน
    else if (!เห็นแอปไม่นานนี้()) ลืมว่าติดตั้งแล้ว()
  } catch {
    /* ⛔ ถามได้ ⇒ เชื่อธงที่จำไว้ */
  }
}

export function ปิดการ์ด() {
  ปิดการ์ดแล้ว.value = true
  ตั้งธง(กุญแจการ์ด)
}
export function ปิดบรรทัดติดตั้ง() {
  ปิดบรรทัดติดตั้งแล้ว.value = true
  ตั้งธง(กุญแจบรรทัด)
}

/** เปิดหน้าต่างของเบราว์เซอร์ที่จับไว้ ⇒ ใช้ได้ครั้งเดียว ⇒ คืน `accepted` · `dismissed` · `null` (⛔ มีให้เปิด) */
async function เปิดหน้าต่างติดตั้ง() {
  if (!หน้าต่างที่จับไว้) return null
  const e = หน้าต่างที่จับไว้
  หน้าต่างที่จับไว้ = null
  let ผล: string | null = null
  try {
    await e.prompt()
    ผล = (await e.userChoice)?.outcome ?? null
  } catch {
    /* ผู้อ่านปิดหน้าต่าง หรือเบราว์เซอร์ไม่ยอมเปิด */
  }
  if (ผล === 'accepted') จำว่าติดตั้งแล้ว()
  return ผล
}

/**
 * ⭐⭐ **ทุกปุ่ม *ติดตั้งแอพ* เรียกตัวนี้** ⇒ `ปุ่มที่กด` = ที่ที่โฟกัสกลับไปเมื่อแผ่นปิด (WCAG 2.2 SC 2.4.3)
 *   ⇒ คืน `accepted` · `dismissed` · `sheet` · `installed`
 *   ⇒ กดยกเลิกในหน้าต่างของเบราว์เซอร์ ⇒ การ์ดอยู่ต่อเฉย ๆ ⛔ มีข้อความ (เว็บเพลง กติกาข้อ 2)
 */
export async function เริ่มติดตั้ง(ปุ่มที่กด?: HTMLElement | null) {
  const แผน = วางแผนติดตั้ง({
    ua: navigator.userAgent,
    nav: navigator,
    มีหน้าต่าง: !!หน้าต่างที่จับไว้,
    เปิดเป็นแอป: เปิดเป็นแอป.value,
    ติดตั้งแล้ว: ติดตั้งแล้ว.value,
    href: location.href,
  })
  if (แผน.kind === 'installed') return 'installed'
  if (แผน.kind === 'native') return (await เปิดหน้าต่างติดตั้ง()) || 'dismissed'
  คืนโฟกัสที่ = ปุ่มที่กด || (document.activeElement as HTMLElement | null)
  แผ่นที่เปิด.value = แผน.sheet
  return 'sheet'
}

export function ปิดแผ่นติดตั้ง() {
  แผ่นที่เปิด.value = null
  const ที่ = คืนโฟกัสที่
  คืนโฟกัสที่ = null
  if (ที่ && ที่.isConnected) ที่.focus()
}

let ฟังแล้ว = false
/**
 * ⭐ ตั้งตัวฟังทั้งหมด ⇒ เรียกครั้งเดียวจากตัวเสริมฝั่งเครื่อง ⇒ เร็วที่สุดที่ทำได้ (ก่อนแอปติด)
 *   ⇒ อ่านค่าที่จำไว้ในเครื่อง ⇒ `beforeinstallprompt` · `appinstalled` · `display-mode` เปลี่ยน
 */
export function เริ่มฟังการติดตั้ง() {
  if (ฟังแล้ว || typeof window === 'undefined') return
  ฟังแล้ว = true
  เปิดเป็นแอป.value = ดูว่าเปิดเป็นแอป()
  ติดตั้งแล้ว.value = อ่านธง(กุญแจติดตั้งแล้ว)
  ปิดการ์ดแล้ว.value = อ่านธง(กุญแจการ์ด)
  ปิดบรรทัดติดตั้งแล้ว.value = อ่านธง(กุญแจบรรทัด)

  window.addEventListener('beforeinstallprompt', (e) => {
    // ⭐ หยุดแถบเล็กของ Chrome เอง ⇒ ใช้ปุ่มของเราที่ผู้อ่านหาเจอแทน
    e.preventDefault()
    หน้าต่างที่จับไว้ = e as หน้าต่างติดตั้ง
    // ⭐ @krisada 25 พ.ย. 2569 ⇒ ถอนแอปแล้วเปิดเว็บใน Chrome ⇒ หน้าแรกว่าง ⛔ การ์ด ⛔ บรรทัด ⇒ ไม่มีทางติดตั้งใหม่
    //   ⇒ ธงติดตั้งค้างได้ 30 วัน (`เห็นแอปไม่นานนี้`) ⇒ ถ้าเคยกด × บรรทัด *ติดตั้งแล้ว* ไว้ ⇒ ไม่เห็นอะไรเลย
    //   ⇒ Chrome ส่งหน้าต่างนี้เฉพาะเมื่อแอปของเว็บนี้ ⛔ ติดตั้งอยู่ ⇒ เป็นหลักฐานว่าถอนแล้ว ⇒ ลืมธงทันที
    //   ⛔ Samsung · Edge · Opera ⇒ ไม่เห็นแอปที่ Chrome ติดตั้ง ⇒ ยังส่งหน้าต่างมาได้ทั้งที่ติดตั้งแล้ว ⇒ เชื่อเฉพาะ Chrome ของ Android
    if (ติดตั้งแล้ว.value && เป็นChromeแท้()) ลืมว่าติดตั้งแล้ว()
  })
  // ⭐ ติดตั้งเสร็จ (จากปุ่มเรา หรือจากเมนูของเบราว์เซอร์เอง) ⇒ เก็บปุ่มทิ้ง
  window.addEventListener('appinstalled', () => {
    จำว่าติดตั้งแล้ว()
    หน้าต่างที่จับไว้ = null
    แผ่นที่เปิด.value = null
  })
  // ⭐ ติดตั้งแล้วเปิดเป็นแอปได้โดยไม่โหลดใหม่ ⇒ ตามให้ทัน
  const mq = typeof matchMedia === 'function' ? matchMedia('(display-mode: standalone)') : null
  mq?.addEventListener?.('change', (e) => {
    เปิดเป็นแอป.value = e.matches
    if (e.matches) จำว่าเห็นแอป()
  })
  if (เปิดเป็นแอป.value) จำว่าเห็นแอป()
  ถามแอปที่ติดตั้ง()
}
