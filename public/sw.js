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
  try {
    await (await caches.open(แคชที่เปิด)).put(กุญแจ, res)
  } catch {
    /* ที่เก็บเต็ม ⇒ หน้ายังได้ของจากเน็ตตามปกติ */
  }
}

async function เน็ตก่อน(event, url, ทาง) {
  const req = event.request
  const กุญแจ = กุญแจของ(url)
  try {
    const res = await fetch(req)
    if (res.ok && res.type === 'basic' && !res.redirected && เก็บตอนเปิด(ทาง)) event.waitUntil(เก็บที่เปิด(กุญแจ, res.clone()))
    return res
  } catch (เหตุ) {
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

async function ที่เก็บก่อน(event, url, ทาง) {
  const กุญแจ = กุญแจของ(url)
  const ได้ = await หาในแคช(กุญแจ)
  if (ได้) return ได้
  const res = await fetch(event.request)
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
  event.respondWith(ใช้ที่เก็บก่อน(ทาง) ? ที่เก็บก่อน(event, url, ทาง) : เน็ตก่อน(event, url, ทาง))
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
    for (const k of await c.keys()) if (!ยังใช้.has(k.url) && k.url !== ที่รายการ && k.url !== ที่สมุด && k.url !== ที่สถานะ) await c.delete(k)
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

let งานที่วิ่ง = null
self.addEventListener('message', (event) => {
  if (!event.data || event.data.type !== 'phrakham-เก็บทั้งเล่ม') return
  if (!งานที่วิ่ง)
    งานที่วิ่ง = เก็บรอบหนึ่ง()
      .catch(() => ({ จบ: false, พลาด: 1 }))
      .then((ผล) => {
        งานที่วิ่ง = null
        บอก({ รอบจบ: true, ...ผล })
        return ผล
      })
  event.waitUntil(งานที่วิ่ง)
})
