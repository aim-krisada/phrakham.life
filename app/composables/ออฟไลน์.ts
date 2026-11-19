// ⭐⭐ **ตัวช่วยออฟไลน์ ฝั่งหน้าเว็บ ⇒ ลงทะเบียน · ขอให้เก็บตัวบททั้งเล่ม · อ่านสถานะ ⇒ ที่เดียวทั้งเว็บ**
//   (ยกท่ามาจากเว็บเพลง `src/lib/offlineReady.js` · `src/main.js` ⇒ @krisada เคาะ 19 พ.ย. 2569)
//
// ⭐ **ลงทะเบียนทุกแท็บ** ⇒ `sw.js?b=<รุ่นของเว็บ>` ⇒ เว็บขึ้นรอบใหม่ ⇒ ที่อยู่ของตัวช่วยเปลี่ยน ⇒ เบราว์เซอร์ติดตั้งตัวใหม่ ⇒ เข้าแทนทันที
//   ⇒ ขอบเขต = ฐานของเว็บ (`useRuntimeConfig().app.baseURL`) ⇒ ⛔ เขียนตายตัว ⇒ `/v3/` บนของจริง · `/phrakham/` ในท่อ
// ⭐ **ขอให้เก็บทั้งเล่มเฉพาะตอนเปิดเป็นแอป** (`เปิดเป็นแอป` ⇒ `app/composables/ติดตั้งแอป.ts`) ⇒ แท็บธรรมดาเก็บแค่ที่เปิด
//   ⇒ ขอที่ว่างแบบถาวร (`navigator.storage.persist()`) ก่อนขอเก็บครั้งแรก ⇒ เครื่องจะ ⛔ ลบทิ้งเองตอนที่เก็บเหลือน้อย
//   ⇒ ตัวช่วยเก็บทีละรอบ (ไม่เกิน 2 นาที) ⇒ รอบจบแต่ยังไม่ครบ ⇒ ขอรอบต่อไป ⇒ รอบไหน ⛔ คืบ ⇒ หยุดขอจนกว่าเน็ตกลับมาหรือเปิดแอปใหม่
//   ⇒ ⛔ **ที่เก็บเต็ม ⇒ หยุดขอทันที ⇒ ⛔ วน** ⇒ บรรทัดสถานะบอกให้ล้างที่
// ⭐ **ไม่วนถามเป็นจังหวะ** ⇒ อ่านสถานะใหม่เมื่อมีเรื่องจริงเท่านั้น ⇒ ข่าวจากตัวช่วย · เน็ตมา/หาย · ตัวช่วยตัวใหม่เข้าแทน
// ⭐ ตัวเฝ้าคือ `tools/ด่านออฟไลน์.mjs`
import { ref, watch } from 'vue'
import { เปิดเป็นแอป } from '~/composables/ติดตั้งแอป'
import { ตัดสินสถานะ, type สถานะออฟไลน์ } from '~/utils/สถานะออฟไลน์'

export const สถานะออฟไลน์ = ref<สถานะออฟไลน์>({ แบบ: 'ไม่มี' })
/** × บนบรรทัดเขียว ⇒ จำในเครื่องนี้ */
export const ปิดบรรทัดพร้อมแล้ว = ref(false)
const กุญแจปิดบรรทัด = 'phrakham.offline-ready-dismissed'

let ฐาน = '/'
let เริ่มแล้ว = false
let ขอถาวรแล้ว = false
let ไม่ยอมถาวร = false
let เต็มรอบนี้ = false
let ขอไปกี่รอบ = 0
let มีแล้วรอบก่อน = -1
let รอบวิ่งอยู่ = false
let จบรอบแล้ว = false
let ตัวจับเวลา: ReturnType<typeof setTimeout> | null = null
/** ทะเบียนของเราเอง ⇒ ⛔ ใช้ `serviceWorker.ready` ⇒ เว็บรุ่น 2 ที่รากโดเมนมีตัวช่วยขอบเขต `/` ⇒ `ready` อาจได้ตัวนั้นก่อนของเราเข้าแทน */
let ทะเบียน: Promise<ServiceWorkerRegistration> | null = null

/** รอจนทะเบียนของเรามีตัวช่วยที่ทำงานอยู่ */
async function ตัวช่วยที่ทำงาน() {
  if (!ทะเบียน) return null
  const reg = await ทะเบียน
  if (reg.active) return reg.active
  const ตัว = reg.installing || reg.waiting
  if (!ตัว) return null
  await new Promise<void>((ok) => {
    const ดู = () => {
      if (ตัว.state === 'activated' || ตัว.state === 'redundant') ok()
    }
    ตัว.addEventListener('statechange', ดู)
    ดู()
  })
  return reg.active
}
const เพดานรอบ = 60
const รอข่าวนานสุด = 180000

/** ชื่อแคช ⇒ ชุดเดียวกับ `public/sw.js` ⇒ ตั้งตามฐาน */
function ชื่อแคชตัวบท(scopePath: string) {
  const ป้าย = scopePath.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'ราก'
  return 'phrakham-ตัวบท-v1--' + ป้าย
}

export function ปิดบรรทัดพร้อม() {
  ปิดบรรทัดพร้อมแล้ว.value = true
  try {
    localStorage.setItem(กุญแจปิดบรรทัด, '1')
  } catch {
    /* โหมดส่วนตัว ⇒ จำแค่รอบนี้ */
  }
}

async function ขอที่ถาวร() {
  if (ขอถาวรแล้ว) return
  ขอถาวรแล้ว = true
  try {
    const st = navigator.storage
    if (!st || typeof st.persist !== 'function') return
    if (typeof st.persisted === 'function' && (await st.persisted())) return
    ไม่ยอมถาวร = !(await st.persist())
  } catch {
    /* ไม่ยอมตอบ ⇒ ถือว่าไม่รู้ ⛔ ใช่ไม่ยอม */
  }
}

/** ขอให้ตัวช่วยเก็บทั้งเล่มอีกหนึ่งรอบ ⇒ เฉพาะเปิดเป็นแอป · มีเน็ต · ⛔ เต็ม · ⛔ เกินเพดาน */
async function ขอเก็บ() {
  if (!เปิดเป็นแอป.value || เต็มรอบนี้ || รอบวิ่งอยู่ || ขอไปกี่รอบ >= เพดานรอบ) return
  if (navigator.onLine === false) return
  await ขอที่ถาวร()
  try {
    const ตัว = await ตัวช่วยที่ทำงาน()
    if (!ตัว || รอบวิ่งอยู่) return
    ขอไปกี่รอบ++
    รอบวิ่งอยู่ = true
    จบรอบแล้ว = false
    ตัว.postMessage({ type: 'phrakham-เก็บทั้งเล่ม' })
    // ⭐ ตัวช่วยถูกเบราว์เซอร์ฆ่ากลางรอบ ⇒ ⛔ มีข่าวจบ ⇒ รอนานพอแล้วขอใหม่ (นับเพดานเดียวกัน)
    if (ตัวจับเวลา) clearTimeout(ตัวจับเวลา)
    ตัวจับเวลา = setTimeout(() => {
      รอบวิ่งอยู่ = false
      ขอเก็บ()
    }, รอข่าวนานสุด)
  } catch {
    รอบวิ่งอยู่ = false
  }
}

interface ข่าว {
  type?: string
  รอบจบ?: boolean
  จบ?: boolean
  เต็ม?: boolean
  มีแล้ว?: number
  ทั้งหมด?: number
  เข้าแทน?: boolean
  กำลังเก็บ?: boolean
}
function รับข่าว(d: ข่าว) {
  if (!d || d.type !== 'phrakham-ออฟไลน์') return
  if (d.รอบจบ) {
    รอบวิ่งอยู่ = false
    if (ตัวจับเวลา) clearTimeout(ตัวจับเวลา)
    ตัวจับเวลา = null
    if (d.เต็ม) เต็มรอบนี้ = true
    else if (!d.จบ) {
      // หมดเวลากลางรอบ ⇒ คืบ ⇒ ขอต่อ · ⛔ คืบ ⇒ หยุด
      const คืบ = (d.มีแล้ว ?? 0) > มีแล้วรอบก่อน
      มีแล้วรอบก่อน = d.มีแล้ว ?? มีแล้วรอบก่อน
      if (คืบ) setTimeout(ขอเก็บ, 0)
    } else จบรอบแล้ว = true
  }
  if (d.เข้าแทน) {
    // ⭐ ตัวช่วยตัวใหม่ (เว็บขึ้นรอบใหม่) ⇒ รายการอาจเปลี่ยน ⇒ เริ่มนับรอบใหม่
    ขอไปกี่รอบ = 0
    มีแล้วรอบก่อน = -1
    setTimeout(ขอเก็บ, 0)
  }
  อ่านสถานะ()
}

async function อ่านJSON(c: Cache, ที่: string) {
  try {
    const r = await c.match(ที่, { ignoreVary: true })
    return r ? await r.json() : null
  } catch {
    return null
  }
}

/** อ่านจากเครื่อง ⇒ รายการรุ่นนี้ · สมุดของตัวช่วย · กุญแจในแคช ⇒ นับไฟล์ที่ครบ */
async function อ่านจากเครื่อง() {
  const มีเน็ต = navigator.onLine !== false
  const พื้น = { รองรับ: true, เปิดเป็นแอป: เปิดเป็นแอป.value, มีเน็ต, ไม่ยอมเก็บถาวร: ไม่ยอมถาวร, จบรอบแล้ว: จบรอบแล้ว && !รอบวิ่งอยู่ }
  if (!เปิดเป็นแอป.value || typeof caches === 'undefined') return พื้น
  let reg: ServiceWorkerRegistration | undefined
  try {
    reg = (await ทะเบียน?.catch(() => undefined)) || undefined
  } catch {
    /* ถูกปิด */
  }
  const scope = reg ? new URL(reg.scope).pathname : ฐาน
  const ชื่อ = ชื่อแคชตัวบท(scope)
  const ที่ = (ทาง: string) => new URL(scope + ทาง, location.origin).href
  let ทั้งหมด = 0
  let มีแล้ว = 0
  let เต็ม = เต็มรอบนี้
  try {
    if (await caches.has(ชื่อ)) {
      const c = await caches.open(ชื่อ)
      const รายการ = await อ่านJSON(c, ที่('offline.json'))
      const สมุด = (await อ่านJSON(c, ที่('__phrakham-สมุดออฟไลน์.json'))) || {}
      const สถานะ = await อ่านJSON(c, ที่('__phrakham-สถานะออฟไลน์.json'))
      const กุญแจ = new Set((await c.keys()).map((r) => r.url))
      const ไฟล์: [string, string, number][] = Array.isArray(รายการ?.ไฟล์) ? รายการ.ไฟล์ : []
      ทั้งหมด = ไฟล์.length
      for (const [ทาง, ลาย] of ไฟล์) if (สมุด[ทาง] === ลาย && กุญแจ.has(ที่(ทาง))) มีแล้ว++
      if (สถานะ?.เต็มเมื่อ && มีแล้ว < ทั้งหมด) เต็ม = true
    }
  } catch {
    /* ที่เก็บถูกปิด */
  }
  return { ...พื้น, ตัวช่วยทำงาน: !!reg?.active, ทั้งหมด, มีแล้ว, เต็ม }
}

let กำลังอ่าน: Promise<void> | null = null
let อ่านอีก = false
export async function อ่านสถานะ() {
  if (กำลังอ่าน) {
    อ่านอีก = true
    return กำลังอ่าน
  }
  กำลังอ่าน = (async () => {
    do {
      อ่านอีก = false
      สถานะออฟไลน์.value = ตัดสินสถานะ(await อ่านจากเครื่อง())
    } while (อ่านอีก)
  })()
  try {
    await กำลังอ่าน
  } finally {
    กำลังอ่าน = null
  }
}

/**
 * ⭐ เรียกครั้งเดียวจากตัวเสริมฝั่งเครื่อง (`app/plugins/ออฟไลน์.client.ts`) ⇒ หลังหน้าพร้อม
 *   ⇒ ลงทะเบียน ⇒ ตั้งตัวฟัง ⇒ เปิดเป็นแอป ⇒ ขอเก็บ
 */
export function เริ่มออฟไลน์(baseURL: string, รุ่นเว็บ: string) {
  if (เริ่มแล้ว || typeof window === 'undefined' || !('serviceWorker' in navigator)) return
  เริ่มแล้ว = true
  ฐาน = baseURL.endsWith('/') ? baseURL : baseURL + '/'
  try {
    ปิดบรรทัดพร้อมแล้ว.value = localStorage.getItem(กุญแจปิดบรรทัด) === '1'
  } catch {
    /* โหมดส่วนตัว */
  }
  const sw = navigator.serviceWorker
  sw.addEventListener('message', (e) => รับข่าว(e.data))
  sw.addEventListener('controllerchange', () => อ่านสถานะ())
  window.addEventListener('online', () => {
    // ⭐ เน็ตกลับมา ⇒ เริ่มนับใหม่ ⇒ เต็มรอบก่อนอาจล้างที่แล้ว
    เต็มรอบนี้ = false
    ขอไปกี่รอบ = 0
    มีแล้วรอบก่อน = -1
    ขอเก็บ()
    อ่านสถานะ()
  })
  window.addEventListener('offline', () => อ่านสถานะ())
  watch(เปิดเป็นแอป, (v) => {
    if (v) {
      ขอเก็บ()
      อ่านสถานะ()
    }
  })
  ทะเบียน = sw.register(`${ฐาน}sw.js?b=${encodeURIComponent(รุ่นเว็บ)}`, { scope: ฐาน })
  ทะเบียน
    .then(() => {
      ขอเก็บ()
      อ่านสถานะ()
    })
    .catch(() => {
      /* เบราว์เซอร์ไม่ยอม (โหมดส่วนตัวบางตัว) ⇒ เว็บยังใช้ได้ตามปกติ */
      ทะเบียน = null
    })
}
