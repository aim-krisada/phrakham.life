// ⭐⭐ **ปุ่ม *ติดตั้งแอพ* ⇒ กดแล้วทำอะไร ⇒ ตัดสินที่นี่ที่เดียว** (ยกมาจากเว็บเพลง `src/lib/pwaInstall.js` ⇒ ใบ v3/pleng#156 · #157)
//
// ⭐ **ทำไมมีไฟล์นี้** ⇒ เว็บติดตั้งเป็นแอปได้แล้ว (ใบ #167 ⇒ `public/manifest.webmanifest` ⇒ ตัวเฝ้า `tools/ด่านติดตั้งเป็นแอป.mjs`)
//   ⇒ แต่ผู้อ่าน ⛔ รู้ว่าต้องกดตรงไหน ⇒ ทางติดตั้งของแต่ละเบราว์เซอร์ซ่อนอยู่คนละที่
//   ⇒ ปุ่มที่ตาเห็น 2 ที่ ⇒ การ์ดบนหน้าแรก (`การ์ดติดตั้งแอป.vue`) · แถวในแผง ≡ เมนู (`เมนูเว็บเดิม.vue`) ⇒ กดแล้วมาถามที่นี่
//
// ⭐ **กดหนึ่งครั้งทำอะไร** (ลำดับเดียวกับเว็บเพลง ⇒ เหตุผลของแต่ละข้ออยู่ที่ฟังก์ชันของมัน)
//   ① ติดตั้งแล้ว ⇒ ⛔ ทำอะไร
//   ② อยู่ในแอปแชต (LINE · Facebook · Messenger · Instagram) ⇒ ติดตั้งจากในนั้น ⛔ ได้ ⇒ แผ่นที่พาไปเบราว์เซอร์จริง
//   ③ Samsung Internet บน Android ⇒ พาไป Chrome (ติดตั้งจาก Samsung แล้วเครื่องขึ้นเตือนว่าแอพไม่ปลอดภัย)
//   ④ เบราว์เซอร์ส่ง `beforeinstallprompt` มาแล้ว ⇒ เปิดหน้าต่างติดตั้งของเบราว์เซอร์เองทันที
//   ⑤ ⛔ มีหน้าต่างนั้น ⇒ แผ่นบอกทีละขั้น (ไม่เกิน 3 ขั้น) ของเบราว์เซอร์นี้ ⇒ iPhone Safari · iPhone Chrome/Edge/Firefox · Android · อื่น ๆ
//   ⇒ ตัดสินตอนกด ⛔ จำไว้ล่วงหน้า ⇒ หน้าต่างมาทีหลังเมื่อไร ปุ่มเดิมก็กลายเป็นข้อ ④ เอง
//
// ⭐⭐ **ถ้อยคำบนแผ่นทุกแผ่น ⇒ ของเว็บเพลงทุกตัวอักษร** ⇒ @krisada อนุมัติ 19 พ.ย. 2569 ให้ใช้คำของเว็บเพลงกับเว็บนี้ได้เลย
//   ⇒ ⛔ แก้คำที่นี่ ⇒ ไม่ใช่คำที่อนุมัติแล้ว ⇒ ต้องถามก่อน ⇒ คำนอกแผ่น (การ์ด · ปุ่ม) อยู่ที่ `ถ้อยคำติดตั้งแอป.ts`
//
// ⛔ **ไฟล์นี้ไม่แตะ `window` ⛔ ไม่มี import** ⇒ ฟังก์ชันล้วน ⇒ ด่าน `tools/ด่านปุ่มติดตั้งแอป.mjs` import ตรงมาทดสอบลำดับได้
//   ⇒ สถานะ (ได้หน้าต่างแล้วหรือยัง · ติดตั้งแล้วไหม · แผ่นที่เปิดอยู่) อยู่ที่ `app/composables/ติดตั้งแอป.ts`

/** เบราว์เซอร์นี้คืออะไร ⇒ อ่านจาก user agent */
export interface ข้อมูลเบราว์เซอร์ {
  /** อยู่ในแอปแชตไหน ⇒ `line` · `meta` (Facebook · Messenger · Instagram) · `null` */
  ในแอป: 'line' | 'meta' | null
  /** ชื่อแอปที่เห็นบนแผ่น */
  แอป: string
  ios: boolean
  ipad: boolean
  android: boolean
  เบราว์เซอร์: 'safari' | 'chrome-ios' | 'edge-ios' | 'firefox-ios' | 'samsung' | 'firefox' | 'chrome' | 'other'
  /** รุ่นของ Safari (เลขหน้า) ⇒ 0 เมื่อไม่ใช่ Safari */
  รุ่นSafari: number
}

/** ชิ้นหนึ่งของขั้น ⇒ ตัวหนังสือธรรมดา `{ t }` หรือปุ่มที่ผู้อ่านมองหาบนจอ `{ k }` (วาดเป็นกล่องเล็ก) ⇒ `icon: 'share'` วาดรูปแชร์ของ Apple */
export type ชิ้นขั้น = { t: string } | { k: string; icon?: 'share' }

export interface แผ่นติดตั้ง {
  id: string
  title: string
  intro?: string
  action?: { label: string; href: string }
  note?: string
  steps: ชิ้นขั้น[][]
}

export type แผนติดตั้ง = { kind: 'installed' } | { kind: 'native' } | { kind: 'sheet'; sheet: แผ่นติดตั้ง }

export function อ่านเบราว์เซอร์(ua = '', nav: { maxTouchPoints?: number } = {}): ข้อมูลเบราว์เซอร์ {
  const s = String(ua || '')
  // ⭐ iPadOS 13 ขึ้นไปบอกตัวเองว่าเป็น Mac ⇒ Mac ที่มีจอสัมผัสคือ iPad
  const ipad = /iPad/.test(s) || (/Macintosh/.test(s) && Number(nav.maxTouchPoints) > 1)
  const ios = ipad || /iPhone|iPod/.test(s)
  const android = !ios && /Android/i.test(s)
  let ในแอป: ข้อมูลเบราว์เซอร์['ในแอป'] = null
  let แอป = ''
  if (/\bLine\//.test(s)) {
    ในแอป = 'line'
    แอป = 'LINE'
  } else if (/Instagram/.test(s)) {
    ในแอป = 'meta'
    แอป = 'Instagram'
  } else if (/FBAN|FBAV|FB_IAB|FBIOS|FB4A|MessengerForiOS|Orca-Android/.test(s)) {
    ในแอป = 'meta'
    แอป = /Messenger|Orca/.test(s) ? 'Messenger' : 'Facebook'
  }
  let เบราว์เซอร์: ข้อมูลเบราว์เซอร์['เบราว์เซอร์'] = 'other'
  if (ios) {
    if (/CriOS\//.test(s)) เบราว์เซอร์ = 'chrome-ios'
    else if (/EdgiOS\//.test(s)) เบราว์เซอร์ = 'edge-ios'
    else if (/FxiOS\//.test(s)) เบราว์เซอร์ = 'firefox-ios'
    else if (/Version\/[\d.]+.*Safari\//.test(s) && !/OPiOS|GSA\/|YaBrowser|DuckDuckGo/.test(s)) เบราว์เซอร์ = 'safari'
  } else if (android) {
    if (/SamsungBrowser\//.test(s)) เบราว์เซอร์ = 'samsung'
    else if (/Firefox\//.test(s)) เบราว์เซอร์ = 'firefox'
    else if (/Chrome\//.test(s)) เบราว์เซอร์ = 'chrome' // Chrome · Edge · Opera ⇒ มี ⋮ และรายการติดตั้งทุกตัว
  }
  const m = /Version\/(\d+)/.exec(s)
  const รุ่นSafari = เบราว์เซอร์ === 'safari' && m ? Number(m[1]) : 0
  return { ในแอป, แอป, ios, ipad, android, เบราว์เซอร์, รุ่นSafari }
}

// ---- ลิงก์ที่พาออกจากแอปแชต ----------------------------------------------------------------
/** ⭐ LINE เปิดลิงก์ในเบราว์เซอร์จริงของเครื่องเมื่อที่อยู่มี `openExternalBrowser=1` ⇒ ⛔ แตะทางกับ `#` ของหน้า */
export const ป้ายLINE = 'openExternalBrowser'
export function ที่อยู่ออกจากLINE(href: string): string {
  try {
    const u = new URL(href)
    u.searchParams.set(ป้ายLINE, '1')
    return u.toString()
  } catch {
    return href
  }
}

/** ⭐ Android เท่านั้น ⇒ ขอให้ระบบเปิดหน้านี้ใน Chrome ⇒ ⛔ มี Chrome ⇒ Android ไปที่ `browser_fallback_url` เอง */
export function ที่อยู่เปิดในChrome(href: string): string {
  try {
    const u = new URL(href)
    return (
      `intent://${u.host}${u.pathname}${u.search}${u.hash}#Intent;scheme=${u.protocol.replace(':', '')};` +
      `package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(href)};end`
    )
  } catch {
    return ''
  }
}

// ---- แผ่น ⇒ ถ้อยคำของเว็บเพลงทุกตัวอักษร ------------------------------------------------------
const T = (t: string): ชิ้นขั้น => ({ t })
const K = (k: string, icon?: 'share'): ชิ้นขั้น => (icon ? { k, icon } : { k })

function แผ่นในแอป(b: ข้อมูลเบราว์เซอร์, href: string): แผ่นติดตั้ง {
  if (b.ในแอป === 'line') {
    return {
      id: 'line',
      title: 'ติดตั้งจากใน LINE ไม่ได้',
      intro: 'ต้องเปิดเว็บใน Chrome หรือ Safari ก่อน แล้วกด ติดตั้งแอพ อีกครั้ง',
      action: { label: 'เปิดใน Chrome / Safari', href: ที่อยู่ออกจากLINE(href) },
      note: b.ios
        ? 'ถ้าไม่เปิด แตะ ⋯ มุมขวาบน แล้วเลือก "เปิดในเบราว์เซอร์"'
        : 'ถ้าไม่เปิด แตะ ⋮ มุมขวาบน แล้วเลือก "เปิดในเบราว์เซอร์"',
      steps: [],
    }
  }
  // Facebook · Messenger · Instagram
  if (b.android) {
    return {
      id: 'meta-android',
      title: `ติดตั้งจากใน ${b.แอป} ไม่ได้`,
      intro: 'ต้องเปิดเว็บใน Chrome ก่อน แล้วกด ติดตั้งแอพ อีกครั้ง',
      action: { label: 'เปิดใน Chrome', href: ที่อยู่เปิดในChrome(href) },
      note: 'ถ้าไม่เปิด แตะ ⋮ มุมขวาบน แล้วเลือก "เปิดใน Chrome"',
      steps: [],
    }
  }
  // ⭐ iPhone ⇒ หน้าเว็บส่งตัวเองไป Safari ⛔ ได้ ⇒ บอกได้แค่ด้วยคำ
  return {
    id: 'meta-ios',
    title: `ติดตั้งจากใน ${b.แอป} ไม่ได้`,
    intro: 'ต้องเปิดเว็บใน Safari ก่อน',
    steps: [
      [T('แตะ '), K('⋯'), T(' มุมขวาบนหรือขวาล่าง')],
      [T('แตะ '), K('เปิดใน Safari'), T(' หรือ '), K('เปิดในเบราว์เซอร์')],
      [T('ใน Safari แตะ '), K('ติดตั้งแอพ'), T(' อีกครั้ง')],
    ],
  }
}

const เครื่อง = (b: ข้อมูลเบราว์เซอร์) => (b.ipad ? 'iPad' : 'iPhone')

function แผ่นiOSSafari(b: ข้อมูลเบราว์เซอร์): แผ่นติดตั้ง {
  // ⭐ Safari ของ iOS 26 ย้าย *แชร์* เข้าไปในปุ่ม ⋯ (มุมล่างขวาของ iPhone) ⇒ iPhone รุ่นก่อนกับ iPad ยังเห็นปุ่มแชร์เอง
  const ขั้นแรก =
    b.รุ่นSafari >= 26 && !b.ipad
      ? [T('แตะ '), K('⋯'), T(' มุมล่างขวา แล้วแตะ '), K('แชร์', 'share')]
      : [T('แตะปุ่มแชร์ '), K('', 'share'), T(b.ipad ? ' ด้านบน' : ' ด้านล่าง')]
  return {
    id: 'ios-safari',
    title: `ติดตั้งบน ${เครื่อง(b)} · 3 ขั้น`,
    steps: [ขั้นแรก, [T('เลื่อนลง แตะ '), K('เพิ่มไปยังหน้าจอโฮม')], [T('เปิด "เปิดเป็นเว็บแอป" ทิ้งไว้ แล้วแตะ '), K('เพิ่ม')]],
  }
}

const ชื่อบนiOS: Record<string, string> = { 'chrome-ios': 'Chrome', 'edge-ios': 'Edge', 'firefox-ios': 'Firefox' }
function แผ่นiOSอื่น(b: ข้อมูลเบราว์เซอร์): แผ่นติดตั้ง {
  return {
    id: 'ios-other',
    title: `ติดตั้งจาก ${ชื่อบนiOS[b.เบราว์เซอร์]} บน ${เครื่อง(b)} · 2 ขั้น`,
    steps: [
      [T('แตะ '), K('', 'share'), T(' ปุ่มแชร์ ข้างที่อยู่เว็บด้านบน')],
      [T('แตะ '), K('เพิ่มไปยังหน้าจอโฮม'), T(' แล้วแตะ '), K('เพิ่ม')],
    ],
  }
}

// ⭐ Samsung Internet (ใบ v3/pleng#157) ⇒ ติดตั้งจากตัวนี้แล้ว Google Play Protect ขึ้นเตือน *Unsafe app blocked*
//   ⇒ Samsung สร้าง WebAPK เองด้วย targetSdk รุ่นเก่า ⇒ manifest ของเราแก้ ⛔ ได้ (github.com/SamsungInternet/support/issues/123)
//   ⇒ WebAPK ของ Chrome ⛔ มีคำเตือนนี้ ⇒ ปุ่มจึงส่งหน้าไป Chrome
function แผ่นSamsung(href: string): แผ่นติดตั้ง {
  return {
    id: 'android-samsung-chrome',
    title: 'ติดตั้งผ่าน Chrome',
    intro:
      'ถ้าติดตั้งจาก Samsung Internet เครื่องจะขึ้นเตือนว่าแอพไม่ปลอดภัย ทั้งที่ไม่มีอันตราย' +
      ' ให้เปิดใน Chrome แล้วกด ติดตั้งแอพ อีกครั้ง',
    action: { label: 'เปิดใน Chrome เพื่อติดตั้ง', href: ที่อยู่เปิดในChrome(href) },
    note: 'ถ้าเครื่องยังไม่มี Chrome ให้ลง Chrome จาก Play Store ก่อน',
    steps: [],
  }
}

function แผ่นAndroid(b: ข้อมูลเบราว์เซอร์): แผ่นติดตั้ง {
  if (b.เบราว์เซอร์ === 'firefox') {
    return {
      id: 'android-firefox',
      title: 'ติดตั้งบน Android · 2 ขั้น',
      steps: [
        [T('แตะเมนู '), K('⋮'), T(' ของเบราว์เซอร์')],
        [T('แตะ '), K('ติดตั้ง'), T(' หรือ '), K('เพิ่มแอปไปยังหน้าจอหลัก')],
      ],
    }
  }
  return {
    id: 'android',
    title: 'ติดตั้งบน Android · 2 ขั้น',
    steps: [
      [T('แตะเมนู '), K('⋮'), T(' หรือ '), K('≡'), T(' ของเบราว์เซอร์')],
      [T('แตะ '), K('ติดตั้งแอป'), T(' หรือ '), K('เพิ่มไปยังหน้าจอหลัก')],
    ],
  }
}

function แผ่นทั่วไป(): แผ่นติดตั้ง {
  return {
    id: 'generic',
    title: 'ติดตั้งเป็นแอพ · 2 ขั้น',
    steps: [
      [T('เปิดเมนูของเบราว์เซอร์ มักเป็นปุ่ม '), K('⋮'), T(' '), K('⋯'), T(' หรือ '), K('≡')],
      [T('เลือก '), K('ติดตั้งแอพ'), T(' หรือ '), K('เพิ่มไปยังหน้าจอหลัก')],
    ],
  }
}

/**
 * ⭐⭐ **คำตัดสิน ⇒ กด *ติดตั้งแอพ* หนึ่งครั้งทำอะไร** ⇒ ฟังก์ชันล้วน ⇒ ลำดับถูกทดสอบที่ `tools/ด่านปุ่มติดตั้งแอป.mjs`
 *   ติดตั้งแล้ว ⇒ ⛔ ทำอะไร · ในแอปแชต ⇒ แผ่นพาออก · Samsung บน Android ⇒ ไป Chrome (⛔ ใช้หน้าต่างของ Samsung)
 *   · มีหน้าต่างของเบราว์เซอร์ ⇒ เปิดเลย · iPhone Safari · iPhone อื่น · Android · ที่เหลือ ⇒ แผ่นของมัน
 */
export function วางแผนติดตั้ง({
  ua = '',
  nav = {},
  มีหน้าต่าง = false,
  เปิดเป็นแอป = false,
  ติดตั้งแล้ว = false,
  href = '',
}: {
  ua?: string
  nav?: { maxTouchPoints?: number }
  มีหน้าต่าง?: boolean
  เปิดเป็นแอป?: boolean
  ติดตั้งแล้ว?: boolean
  href?: string
} = {}): แผนติดตั้ง {
  if (เปิดเป็นแอป || ติดตั้งแล้ว) return { kind: 'installed' }
  const b = อ่านเบราว์เซอร์(ua, nav)
  if (b.ในแอป) return { kind: 'sheet', sheet: แผ่นในแอป(b, href) }
  if (b.android && b.เบราว์เซอร์ === 'samsung') return { kind: 'sheet', sheet: แผ่นSamsung(href) }
  if (มีหน้าต่าง) return { kind: 'native' }
  if (b.ios && b.เบราว์เซอร์ === 'safari') return { kind: 'sheet', sheet: แผ่นiOSSafari(b) }
  if (b.ios && ชื่อบนiOS[b.เบราว์เซอร์]) return { kind: 'sheet', sheet: แผ่นiOSอื่น(b) }
  if (b.android) return { kind: 'sheet', sheet: แผ่นAndroid(b) }
  return { kind: 'sheet', sheet: แผ่นทั่วไป() }
}
