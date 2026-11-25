// ⭐⭐ **ตัวช่วยออฟไลน์ของ พระคำ.ชีวิต** (service worker) ⇒ @krisada เคาะ 19 พ.ย. 2569 ⇒ ยกท่ามาจากเว็บเพลง `public/sw.js`
//
// ⭐ **ทำ 2 งาน**
//   ① **เก็บที่เปิดแล้ว** (ทุกแท็บ) ⇒ ไฟล์ของเว็บนี้ที่ผู้อ่านเปิดผ่านตา ⇒ เก็บไว้ ⇒ ไม่มีเน็ตก็เปิดซ้ำได้
//      ⇒ ภาษาเดิม (`api/card` · `api/words` · `api/lex`) เก็บแบบนี้ทางเดียว ⇒ เฉพาะบทที่เปิดแล้ว
//   ② **เก็บตัวบททั้งเล่ม** (เฉพาะเมื่อหน้าที่เปิดเป็นแอปที่ติดตั้งแล้วขอมา) ⇒ อ่านรายการ `offline.json`
//      ⇒ ดึงเฉพาะไฟล์ที่ลายนิ้วมือเปลี่ยน ⇒ ทีละรอบไม่เกิน `เวลาต่อรอบ` ⇒ หน้าเว็บขอรอบต่อไปเอง
//      ⇒ เจ้าของกติกาว่าเก็บอะไร ⇒ `tools/สร้างรายการออฟไลน์.mjs` ⇒ หน้าที่ขอและบอกสถานะ ⇒ `app/composables/ออฟไลน์.ts`
//
// ⛔⛔ **ห้ามขังผู้อ่านไว้กับรุ่นเก่า** ⇒ เว็บขึ้นวันละหลายรอบ
//   ⇒ หน้า HTML กับ JSON ทุกตัว ⇒ **เน็ตก่อน** ⇒ ได้ของใหม่เสมอเมื่อมีเน็ต ⇒ ไม่มีเน็ตจึงใช้ที่เก็บไว้
//   ⇒ `_nuxt/*` (ชื่อไฟล์มีลายของเนื้อแล้ว ⇒ ⛔ เปลี่ยนเนื้อโดยไม่เปลี่ยนชื่อ) ⇒ **ที่เก็บก่อน**
//   ⇒ ติดตั้งแล้วเข้าแทนทันที (`skipWaiting` · `clients.claim`) ⇒ ล้างแคชรุ่นอื่นของฐานนี้ตอนเข้าแทน
//
// ⭐ **ฐานของเว็บมาจากขอบเขตของตัวช่วยเอง** ⛔ เขียนตายตัว ⇒ `/v3/` บนของจริง · `/phrakham/` ในท่อ
//   ⇒ เว็บรุ่น 2 ที่รากโดเมนมี `/sw.js` ขอบเขต `/` ของมันเอง ⇒ ของเราขอบเขตแคบกว่า (`/v3/`) ⇒ เบราว์เซอร์เลือกของเราในหน้า `/v3/`
//   ⇒ แคชตั้งชื่อตามฐาน ⇒ ⛔ ปนกับรุ่นอื่นที่อยู่โดเมนเดียวกัน ⇒ ⛔ ลบแคชที่ไม่ได้ขึ้นต้น `phrakham-` ของฐานนี้
//
// ⛔ **ไม่แตะ** ⇒ คำขอข้ามโดเมน (เสียงข้อบน GitHub Pages) · `story-audio/` · `audio/` · คำขอที่ไม่ใช่ GET · คำขอช่วงไบต์
// ⭐ ตัวเฝ้าคือ `tools/ด่านออฟไลน์.mjs` ⇒ ตำแหน่งที่ด่านโหมดพิสูจน์แทนคำ ⇒ จดไว้ข้างบรรทัดนั้น ⇒ เปลี่ยนชื่อต้องแก้ด่านด้วย

const ราก = new URL(self.registration.scope).pathname // '/v3/' · '/phrakham/'
const ป้ายฐาน = ราก.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'ราก'
const แคชตัวบท = 'phrakham-ตัวบท-v1--' + ป้ายฐาน
const แคชที่เปิด = 'phrakham-ที่เปิด-v1--' + ป้ายฐาน
const ของเรา = (ชื่อ) => ชื่อ.startsWith('phrakham-') && ชื่อ.endsWith('--' + ป้ายฐาน)

const ที่อยู่ = (ทาง) => new URL(ราก + ทาง, self.location.origin).href
const ที่รายการ = ที่อยู่('offline.json')
// ⭐ สมุดจด *ไฟล์ไหนเก็บไว้ด้วยลายนิ้วมือไหน* ⇒ อยู่ในแคชตัวบทเอง ⇒ ⛔ มีไฟล์นี้บนเว็บจริง
const ที่สมุด = ที่อยู่('__phrakham-สมุดออฟไลน์.json')
const ที่สถานะ = ที่อยู่('__phrakham-สถานะออฟไลน์.json')
// ⭐ จดเวลาที่ผู้อ่านกดยกเลิกงานพื้นหลัง ⇒ แยกไฟล์ ⇒ ⛔ ถูกเขียนทับตอนรอบปกติจดสถานะ
const ที่พักพื้นหลัง = ที่อยู่('__phrakham-พักพื้นหลัง.json')

// ⭐ @krisada 25 พ.ย. 2569 ⇒ **เก็บต่อแม้ปิดแอป** (Background Fetch ⇒ Chrome บน Android)
//   ⇒ เดิมเก็บได้เฉพาะตอนแอปเปิดอยู่บนจอ ⇒ ออกจากแอปหรือจอดับ ⇒ มือถือหยุดตัวช่วย ⇒ บรรทัด *กำลังเก็บ… N%* ค้างเป็นชั่วโมง
//   ⇒ ไฟล์ที่ยังขาดตั้งแต่ `ขั้นต่ำพื้นหลัง` ⇒ ส่งให้เบราว์เซอร์ดาวน์โหลดเอง ⇒ มีแจ้งเตือนของเครื่อง ⇒ ปิดแอปได้
//   ⇒ เสร็จ ⇒ `backgroundfetchsuccess` ⇒ ตรวจลายทีละไฟล์ ⇒ เก็บ ⇒ ที่ตกหล่น ⇒ รอบปกติเก็บต่อ
//   ⇒ ⛔ รองรับ (iPhone · คอม · Samsung บางรุ่น) หรือเริ่มไม่ได้ ⇒ รอบปกติแบบเดิม ⇒ ⛔ เสียอะไร
//   ⇒ ผู้อ่านกดยกเลิกที่แจ้งเตือน ⇒ ⛔ เริ่มพื้นหลังซ้ำภายใน `พักหลังยกเลิก` ⇒ ⛔ กวน
//   ⇒ ⭐ คำบนแจ้งเตือน = คำที่อนุมัติแล้วบนบรรทัดสถานะ (`app/utils/ถ้อยคำติดตั้งแอป.ts` ⇒ `กำลังเก็บ` ตัด `… N%` · `พร้อมใช้` ตัด `✓ `) ⇒ ⛔ คำใหม่
//     ⇒ ตัวเฝ้า `tools/ด่านออฟไลน์.mjs` เทียบคำ 2 ตัวนี้กับไฟล์ถ้อยคำ
const ชื่อพื้นหลัง = 'phrakham-ตัวบท--' + ป้ายฐาน
const ขั้นต่ำพื้นหลัง = 30
const พักหลังยกเลิก = 24 * 3600 * 1000
const คำแจ้งกำลังเก็บ = 'กำลังเก็บพระคัมภีร์ไว้ในเครื่อง'
const คำแจ้งพร้อม = 'พร้อมใช้แบบไม่มีเน็ตแล้ว'
// ⭐ เฉพาะ Android ⇒ Chrome บนคอมก็มี Background Fetch แต่คอม ⛔ ฆ่าตัวช่วยเมื่อพับจอ ⇒ รอบปกติพอ ⇒ ด่านในท่อ (Chrome บนลินุกซ์) ใช้รอบปกติ
const ใช้พื้นหลังได้ = () => /Android/.test(self.navigator.userAgent) && !!self.registration.backgroundFetch

const เวลาต่อไฟล์ = 30000 // ไฟล์ที่ค้าง ⇒ ข้ามไปก่อน ⇒ รอบหน้าดึงใหม่ (เว็บเพลง ใบ #164)
const เวลาต่อรอบ = 120000 // ⭐ เบราว์เซอร์ฆ่าตัวช่วยที่งานเดียวยาวเกิน ~5 นาที ⇒ แบ่งรอบ ⇒ หน้าเว็บขอรอบต่อไป
const ดึงพร้อมกัน = 6
const ทุกกี่ไฟล์บอก = 25

// ---- ทางของคำขอ ⇒ กุญแจในแคช -----------------------------------------------------------------
/** กุญแจ = ที่อยู่ ⛔ มีคำถามท้าย (`?c=14` · `?_b=<รุ่น>`) ⇒ หน้า HTML ⇒ โฟลเดอร์ (`read/MRK` = `read/MRK/` = `read/MRK/index.html`) */
function กุญแจของ(url) {
  let p = url.pathname
  if (p.endsWith('/index.html')) p = p.slice(0, -'index.html'.length)
  else if (!p.endsWith('/') && !/\.[^/]+$/.test(p)) p += '/'
  return url.origin + p
}
/** ทางนับจากฐาน (ตัวไทยถอดรหัสแล้ว) ⇒ ใช้ตัดสินว่าแตะไหม */
const ทางของ = (url) => {
  try {
    return decodeURIComponent(url.pathname.slice(ราก.length))
  } catch {
    return url.pathname.slice(ราก.length)
  }
}

const ไม่แตะ = (ทาง) => /^(story-audio|audio)\//.test(ทาง) || ทาง === 'sw.js'
// ⭐ ด่านโหมดพิสูจน์แทนบรรทัดนี้ด้วย `() => true` ⇒ HTML กับ JSON กลายเป็นที่เก็บก่อน ⇒ ข้อ ⑦ ต้องแดง
const ใช้ที่เก็บก่อน = (ทาง) => /^_nuxt\//.test(ทาง) && !/\.json$/.test(ทาง)
// ⭐ ด่านโหมดพิสูจน์แทนบรรทัดนี้ ⇒ ภาษาเดิมไม่ถูกเก็บ ⇒ ข้อ ⑤ ต้องแดง
const เก็บตอนเปิด = (ทาง) => true

const ตรงตัว = { ignoreVary: true }

async function หาในแคช(กุญแจ) {
  for (const ชื่อ of [แคชที่เปิด, แคชตัวบท]) {
    try {
      const c = await caches.open(ชื่อ)
      const ได้ = await c.match(กุญแจ, ตรงตัว)
      if (ได้) return ได้
    } catch {
      /* ที่เก็บถูกปิด */
    }
  }
  return null
}

async function เก็บที่เปิด(กุญแจ, res) {
  const k = ++ลำดับจด
  ที่เก็บค้าง.set(k, { กุญแจ: กุญแจ.slice(-60), ตั้งแต่: Date.now() })
  try {
    await (await caches.open(แคชที่เปิด)).put(กุญแจ, res)
  } catch {
    /* ที่เก็บเต็ม ⇒ หน้ายังได้ของจากเน็ตตามปกติ */
  } finally {
    ที่เก็บค้าง.delete(k)
  }
}

async function เน็ตก่อน(event, url, ทาง, จด) {
  const req = event.request
  const กุญแจ = กุญแจของ(url)
  try {
    จด.ขั้น = 'เน็ต'
    const res = await fetch(req)
    จด.ขั้น = 'ได้จากเน็ต'
    if (res.ok && res.type === 'basic' && !res.redirected && เก็บตอนเปิด(ทาง)) event.waitUntil(เก็บที่เปิด(กุญแจ, res.clone()))
    return res
  } catch (เหตุ) {
    จด.ขั้น = 'หาในแคชหลังเน็ตพลาด'
    const ได้ = await หาในแคช(กุญแจ)
    if (ได้) return ได้
    // ⭐ หน้าที่ไม่เคยเก็บ (ที่อยู่เดิม `/read/<เล่ม>/<บท>`) ⇒ โครงเว็บทั้งก้อน `404.html` ⇒ โค้ดของเว็บเดินเส้นทางเอง ⇒ ท่าเดียวกับที่วางเว็บ
    if (req.mode === 'navigate') {
      const โครง = (await หาในแคช(ที่อยู่('404.html'))) || (await หาในแคช(ที่อยู่('200.html')))
      if (โครง) return โครง
    }
    throw เหตุ
  }
}

async function ที่เก็บก่อน(event, url, ทาง, จด) {
  const กุญแจ = กุญแจของ(url)
  จด.ขั้น = 'หาในแคช'
  const ได้ = await หาในแคช(กุญแจ)
  if (ได้) return ได้
  จด.ขั้น = 'เน็ต'
  const res = await fetch(event.request)
  จด.ขั้น = 'ได้จากเน็ต'
  if (res.ok && res.type === 'basic' && เก็บตอนเปิด(ทาง)) event.waitUntil(เก็บที่เปิด(กุญแจ, res.clone()))
  return res
}

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET' || req.headers.has('range')) return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin || !url.pathname.startsWith(ราก)) return
  const ทาง = ทางของ(url)
  if (ไม่แตะ(ทาง)) return
  const จด = เริ่มจด(ทาง, req.destination)
  const ตอบ = (ใช้ที่เก็บก่อน(ทาง) ? ที่เก็บก่อน(event, url, ทาง, จด) : เน็ตก่อน(event, url, ทาง, จด)).finally(() => คำขอค้าง.delete(จด.k))
  event.respondWith(ตอบ)
})

// ⭐ **ตัวจดคำขอที่ยังไม่ตอบ** (23 พ.ย. 2569 ⇒ หาเหตุที่หน้าค้างแบบสุ่มบนท่อ) ⇒ ⛔ เปลี่ยนพฤติกรรม ⇒ แค่จดว่าคำขอไหนค้างอยู่ขั้นไหน
//   ⇒ คนอ่านคือ `สภาพตอนค้าง` ใน `tools/หน้าที่ตรวจ.mjs` ⇒ อ่านผ่าน Playwright ตอนโค้ดของเว็บไม่ติด
const คำขอค้าง = new Map()
const ที่เก็บค้าง = new Map()
let ลำดับจด = 0
function เริ่มจด(ทาง, ชนิด) {
  const จด = { k: ++ลำดับจด, ทาง, ชนิด, ตั้งแต่: Date.now(), ขั้น: 'เริ่ม' }
  คำขอค้าง.set(จด.k, จด)
  return จด
}
self.__pkสภาพ = () => ({
  ตอนนี้: Date.now(),
  คำขอค้าง: [...คำขอค้าง.values()],
  ที่เก็บค้าง: [...ที่เก็บค้าง.values()],
  เก็บทั้งเล่ม: !!งานที่วิ่ง,
})

// ---- ติดตั้ง · เข้าแทน ------------------------------------------------------------------------
// ⭐ แท็บธรรมดา ⛔ เก็บล่วงหน้าอะไรเลย ⇒ ติดตั้งแล้วเข้าแทนทันที
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const ชื่อทั้งหมด = await caches.keys()
      await Promise.all(ชื่อทั้งหมด.filter((n) => ของเรา(n) && n !== แคชตัวบท && n !== แคชที่เปิด).map((n) => caches.delete(n)))
      await self.clients.claim()
      await ล้าง_nuxtเก่าในที่เปิด()
      บอก({ เข้าแทน: true })
    })(),
  )
})

/** ⭐ `_nuxt/*` ของรุ่นก่อนในแคชที่เปิด ⇒ ลบเมื่อรู้รายการของรุ่นนี้ ⇒ ⛔ ไม่งั้นโตทุกรอบที่เว็บขึ้น */
async function ล้าง_nuxtเก่าในที่เปิด() {
  try {
    const r = await ดึง(ที่รายการ)
    if (!r.ok) return
    const รายการ = await r.json()
    const ยังใช้ = new Set(รายการ.ไฟล์.map(([ทาง]) => ที่อยู่(ทาง)))
    const c = await caches.open(แคชที่เปิด)
    for (const k of await c.keys()) {
      const ทาง = ทางของ(new URL(k.url))
      if (/^_nuxt\//.test(ทาง) && !ยังใช้.has(k.url)) await c.delete(k)
    }
  } catch {
    /* ไม่มีเน็ต ⇒ ไว้รอบหน้า */
  }
}

// ---- บอกหน้าเว็บ ----------------------------------------------------------------------------
async function บอก(ข่าว) {
  try {
    const ทุกหน้า = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    for (const c of ทุกหน้า) c.postMessage({ type: 'phrakham-ออฟไลน์', ...ข่าว })
  } catch {
    /* ⛔ มีหน้าเปิดอยู่ */
  }
}

// ---- เก็บตัวบททั้งเล่ม ------------------------------------------------------------------------
async function ดึง(u) {
  const ctl = new AbortController()
  const t = setTimeout(() => ctl.abort(), เวลาต่อไฟล์)
  try {
    return await fetch(u, { cache: 'no-cache', signal: ctl.signal })
  } finally {
    clearTimeout(t)
  }
}
async function อ่านJSON(c, กุญแจ) {
  try {
    const ได้ = await c.match(กุญแจ, ตรงตัว)
    return ได้ ? await ได้.json() : null
  } catch {
    return null
  }
}
const เขียนJSON = (c, กุญแจ, ค่า) => c.put(กุญแจ, new Response(JSON.stringify(ค่า), { headers: { 'content-type': 'application/json' } }))

// ⭐ ด่านโหมดพิสูจน์แทนบรรทัดนี้ด้วย `() => false` ⇒ ที่เก็บเต็มแล้วยังดึงต่อ ⇒ ข้อ ⑧ ต้องแดง
const ที่เก็บเต็ม = (เหตุ) => !!เหตุ && (เหตุ.name === 'QuotaExceededError' || เหตุ.code === 22)

async function ลายของ(ไบต์) {
  const h = new Uint8Array(await crypto.subtle.digest('SHA-256', ไบต์))
  return [...h.slice(0, 8)].map((x) => x.toString(16).padStart(2, '0')).join('')
}

/** หนึ่งรอบ ⇒ คืน `{ ทั้งหมด, มีแล้ว, ขนาดรวม, จบ, เต็ม, พลาด }` */
async function เก็บรอบหนึ่ง() {
  const เริ่ม = Date.now()
  const c = await caches.open(แคชตัวบท)
  let รายการ = null
  try {
    const r = await ดึง(ที่รายการ)
    if (r.ok) {
      รายการ = await r.clone().json()
      await c.put(ที่รายการ, r)
    }
  } catch (เหตุ) {
    if (ที่เก็บเต็ม(เหตุ)) return จบด้วยเต็ม(c, null)
  }
  if (!รายการ) รายการ = await อ่านJSON(c, ที่รายการ)
  if (!รายการ || !Array.isArray(รายการ.ไฟล์)) return { ไม่มีรายการ: true, จบ: true }

  const สมุด = (await อ่านJSON(c, ที่สมุด)) || {}
  const มีอยู่ = new Set((await c.keys()).map((r) => r.url))
  const ครบ = (ทาง, ลาย) => สมุด[ทาง] === ลาย && มีอยู่.has(ที่อยู่(ทาง))
  const ค้าง = รายการ.ไฟล์.filter(([ทาง, ลาย]) => !ครบ(ทาง, ลาย))

  // ⭐ ดูที่ว่างก่อนเริ่ม ⇒ ไม่พอแน่ ๆ ⇒ ⛔ เริ่มดึงให้เต็มกลางทาง
  try {
    const ต้องใช้ = ค้าง.reduce((s, [, , n]) => s + n, 0)
    const ประมาณ = await navigator.storage?.estimate?.()
    if (ประมาณ?.quota && ต้องใช้ > 0 && ประมาณ.quota - (ประมาณ.usage || 0) < ต้องใช้ * 1.1) return จบด้วยเต็ม(c, รายการ)
  } catch {
    /* ⛔ รู้ที่ว่าง ⇒ ลองดึงไปก่อน ⇒ เต็มเมื่อไรหยุดตรงนั้น */
  }

  // ⭐ เก็บต่อแม้ปิดแอป ⇒ ส่งให้เบราว์เซอร์ ⇒ รอบนี้จบตรงนี้ ⇒ ผลมาทาง `backgroundfetchsuccess`
  const พื้นหลัง = await เริ่มพื้นหลัง(c, ค้าง)
  if (พื้นหลัง) {
    const มีแล้ว = รายการ.ไฟล์.length - ค้าง.length
    return { ทั้งหมด: รายการ.ไฟล์.length, มีแล้ว, ขนาดรวม: รายการ.ขนาดรวม, จบ: false, พลาด: 0, เต็ม: false, พื้นหลัง: true }
  }

  let เต็ม = false
  let พลาด = 0
  let ทำแล้ว = 0
  let หมดเวลา = false
  const คิว = ค้าง.slice()
  const คนดึง = async () => {
    while (คิว.length && !เต็ม) {
      if (Date.now() - เริ่ม > เวลาต่อรอบ) {
        หมดเวลา = true
        return
      }
      const [ทาง, ลาย] = คิว.shift()
      try {
        const r = await ดึง(ที่อยู่(ทาง))
        if (!r.ok) {
          พลาด++
          continue
        }
        const ไบต์ = await r.arrayBuffer()
        // ⭐ ไบต์ไม่ตรงลายในรายการ (ที่วางเว็บส่งของรุ่นอื่นมาระหว่างเว็บขึ้น) ⇒ ⛔ จด ⇒ รอบหน้าดึงใหม่
        if ((await ลายของ(ไบต์)) !== ลาย) {
          พลาด++
          continue
        }
        // ⭐ เก็บแค่ชนิดไฟล์ ⇒ ⛔ ยกหัวทั้งชุด (`content-encoding` ของไบต์ที่ถอดแล้ว ⇒ เบราว์เซอร์อ่านเพี้ยน)
        const ชนิด = r.headers.get('content-type')
        await c.put(ที่อยู่(ทาง), new Response(ไบต์, { status: 200, headers: ชนิด ? { 'content-type': ชนิด } : {} }))
        สมุด[ทาง] = ลาย
        ทำแล้ว++
        if (ทำแล้ว % ทุกกี่ไฟล์บอก === 0) {
          await เขียนJSON(c, ที่สมุด, สมุด)
          บอก({ กำลังเก็บ: true })
        }
      } catch (เหตุ) {
        if (ที่เก็บเต็ม(เหตุ)) เต็ม = true
        else พลาด++
      }
    }
  }
  await Promise.all(Array.from({ length: ดึงพร้อมกัน }, คนดึง))

  // ⭐ ลบไฟล์ที่รายการรุ่นนี้ไม่มีแล้ว (`_nuxt/*` ของรุ่นก่อน ⇒ บทที่ย้ายที่) ⇒ เฉพาะเมื่อรายการมาจากเน็ตรอบนี้หรือที่เก็บ ⇒ ⛔ รายการว่าง
  if (!เต็ม && รายการ.ไฟล์.length) {
    const ยังใช้ = new Set(รายการ.ไฟล์.map(([ทาง]) => ที่อยู่(ทาง)))
    for (const ทาง of Object.keys(สมุด)) if (!ยังใช้.has(ที่อยู่(ทาง))) delete สมุด[ทาง]
    for (const k of await c.keys()) if (!ยังใช้.has(k.url) && k.url !== ที่รายการ && k.url !== ที่สมุด && k.url !== ที่สถานะ && k.url !== ที่พักพื้นหลัง) await c.delete(k)
  }
  try {
    await เขียนJSON(c, ที่สมุด, สมุด)
  } catch (เหตุ) {
    if (ที่เก็บเต็ม(เหตุ)) เต็ม = true
  }
  if (เต็ม) return จบด้วยเต็ม(c, รายการ)
  const มีแล้ว = รายการ.ไฟล์.filter(([ทาง, ลาย]) => สมุด[ทาง] === ลาย).length
  const จบ = !หมดเวลา
  try {
    await เขียนJSON(c, ที่สถานะ, { เต็มเมื่อ: 0, จบเมื่อ: จบ ? Date.now() : 0, รุ่น: รายการ.รุ่น })
  } catch {
    /* เต็มพอดี ⇒ รอบหน้ารู้เอง */
  }
  return { ทั้งหมด: รายการ.ไฟล์.length, มีแล้ว, ขนาดรวม: รายการ.ขนาดรวม, จบ, พลาด, เต็ม: false }
}

async function จบด้วยเต็ม(c, รายการ) {
  try {
    await เขียนJSON(c, ที่สถานะ, { เต็มเมื่อ: Date.now(), จบเมื่อ: 0, รุ่น: รายการ?.รุ่น || '' })
  } catch {
    /* เต็มจนจดไม่ได้ ⇒ หน้าเว็บรู้จากข่าวนี้แทน */
  }
  return { ทั้งหมด: รายการ?.ไฟล์?.length || 0, มีแล้ว: 0, จบ: true, เต็ม: true, พลาด: 0 }
}

// ---- เก็บต่อแม้ปิดแอป (Background Fetch) ----------------------------------------------------------
/** คืน true ⇒ มีงานพื้นหลังวิ่งอยู่แล้ว หรือเพิ่งเริ่มได้ ⇒ รอบปกติ ⛔ ต้องดึงเอง */
async function เริ่มพื้นหลัง(c, ค้าง) {
  if (!ใช้พื้นหลังได้()) return false
  try {
    const bf = self.registration.backgroundFetch
    if (await bf.get(ชื่อพื้นหลัง)) return true
    if (ค้าง.length < ขั้นต่ำพื้นหลัง) return false
    const พัก = (await อ่านJSON(c, ที่พักพื้นหลัง)) || {}
    if (พัก.ยกเลิกเมื่อ && Date.now() - พัก.ยกเลิกเมื่อ < พักหลังยกเลิก) return false
    await bf.fetch(
      ชื่อพื้นหลัง,
      ค้าง.map(([ทาง]) => ที่อยู่(ทาง)),
      { title: คำแจ้งกำลังเก็บ, icons: [{ src: ที่อยู่('icons/icon-192.png'), sizes: '192x192', type: 'image/png' }] },
    )
    return true
  } catch {
    // ⭐ เบราว์เซอร์ไม่ยอม (ปิดสิทธิ์ดาวน์โหลด · ที่ว่างไม่พอ) ⇒ รอบปกติ
    return false
  }
}

/** งานพื้นหลังจบ (ครบหรือไม่ครบ) ⇒ ตรวจลายทีละไฟล์ ⇒ เก็บ ⇒ บอกหน้าเว็บ ⇒ ที่ตกหล่นรอบปกติเก็บต่อ */
async function รับพื้นหลัง(event, สำเร็จ) {
  const c = await caches.open(แคชตัวบท)
  const รายการ = await อ่านJSON(c, ที่รายการ)
  const ไฟล์ = Array.isArray(รายการ?.ไฟล์) ? รายการ.ไฟล์ : []
  const ตามที่อยู่ = new Map(ไฟล์.map(([ทาง, ลาย]) => [ที่อยู่(ทาง), [ทาง, ลาย]]))
  const สมุด = (await อ่านJSON(c, ที่สมุด)) || {}
  let เต็ม = false
  let records = []
  try {
    records = await event.registration.matchAll()
  } catch {
    /* ⛔ ได้ ⇒ รอบปกติเก็บแทน */
  }
  for (const rec of records) {
    if (เต็ม) break
    try {
      const x = ตามที่อยู่.get(rec.request.url)
      if (!x) continue
      const res = await rec.responseReady
      if (!res || !res.ok) continue
      const ไบต์ = await res.arrayBuffer()
      if ((await ลายของ(ไบต์)) !== x[1]) continue
      const ชนิด = res.headers.get('content-type')
      await c.put(rec.request.url, new Response(ไบต์, { status: 200, headers: ชนิด ? { 'content-type': ชนิด } : {} }))
      สมุด[x[0]] = x[1]
    } catch (เหตุ) {
      if (ที่เก็บเต็ม(เหตุ)) เต็ม = true
    }
  }
  try {
    await เขียนJSON(c, ที่สมุด, สมุด)
  } catch (เหตุ) {
    if (ที่เก็บเต็ม(เหตุ)) เต็ม = true
  }
  const มีอยู่ = new Set((await c.keys()).map((r) => r.url))
  const มีแล้ว = ไฟล์.filter(([ทาง, ลาย]) => สมุด[ทาง] === ลาย && มีอยู่.has(ที่อยู่(ทาง))).length
  const ครบ = ไฟล์.length > 0 && มีแล้ว === ไฟล์.length
  if (ครบ) {
    try {
      await เขียนJSON(c, ที่สถานะ, { เต็มเมื่อ: 0, จบเมื่อ: Date.now(), รุ่น: รายการ.รุ่น })
    } catch {
      /* เต็มพอดี */
    }
  }
  if (สำเร็จ && ครบ) await event.updateUI?.({ title: คำแจ้งพร้อม }).catch(() => {})
  // ⭐ ข่าวรูปเดียวกับรอบปกติ ⇒ ยังไม่ครบแต่คืบ ⇒ หน้าเว็บขอรอบต่อไปเอง (รอบปกติเก็บที่ตกหล่น)
  บอก({ รอบจบ: true, จบ: ครบ, เต็ม, มีแล้ว, ทั้งหมด: ไฟล์.length, พลาด: 0 })
}
self.addEventListener('backgroundfetchsuccess', (event) => event.waitUntil(ทำตามคิว(() => รับพื้นหลัง(event, true))))
self.addEventListener('backgroundfetchfail', (event) => event.waitUntil(ทำตามคิว(() => รับพื้นหลัง(event, false))))
// ⭐ ผู้อ่านกดยกเลิกที่แจ้งเตือน ⇒ จด ⇒ ⛔ เริ่มพื้นหลังซ้ำภายใน `พักหลังยกเลิก` ⇒ เปิดแอปอยู่ก็ยังเก็บแบบรอบปกติ
self.addEventListener('backgroundfetchabort', (event) =>
  event.waitUntil(
    (async () => {
      const c = await caches.open(แคชตัวบท)
      await เขียนJSON(c, ที่พักพื้นหลัง, { ยกเลิกเมื่อ: Date.now() }).catch(() => {})
      บอก({ ยกเลิกพื้นหลัง: true })
    })(),
  ),
)
// ⭐ แตะแจ้งเตือน ⇒ เปิดแอป
self.addEventListener('backgroundfetchclick', (event) => event.waitUntil(self.clients.openWindow(ราก)))

// ⭐ งานที่เขียนสมุด (รอบปกติ · รับงานพื้นหลัง) ⇒ ทีละงาน ⇒ ⛔ อ่านสมุดพร้อมกันแล้วเขียนทับกัน
//   ⇒ เจอในท่อ 25 พ.ย. 2569 ⇒ รับงานพื้นหลังยังเก็บไม่เสร็จ หน้าเว็บขอรอบปกติ ⇒ สมุดของรอบปกติทับ ⇒ บรรทัดเป็น *ไม่ครบ*
let คิวสมุด = Promise.resolve()
const ทำตามคิว = (งาน) => (คิวสมุด = คิวสมุด.then(งาน, งาน))

let งานที่วิ่ง = null
self.addEventListener('message', (event) => {
  if (!event.data || event.data.type !== 'phrakham-เก็บทั้งเล่ม') return
  if (!งานที่วิ่ง)
    งานที่วิ่ง = ทำตามคิว(เก็บรอบหนึ่ง)
      .catch(() => ({ จบ: false, พลาด: 1 }))
      .then((ผล) => {
        งานที่วิ่ง = null
        บอก({ รอบจบ: true, ...ผล })
        return ผล
      })
  event.waitUntil(งานที่วิ่ง)
})
