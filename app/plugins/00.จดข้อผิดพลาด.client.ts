// ⭐ **จดข้อผิดพลาดที่ Nuxt จับไว้เอง** (23 พ.ย. 2569 ⇒ หาเหตุที่ด่านหน้าเว็บค้างแบบสุ่มบนท่อ)
//
// ⭐ Nuxt ครอบการเริ่มเว็บ (`app:created` · `mount`) ด้วย try/catch แล้วส่งข้อผิดพลาดให้ตัวจัดการของตัวเอง
//   ⇒ ถ้ามีอะไรโยนตอนนั้น ⇒ Vue ไม่ติด แต่ ⛔ ขึ้น `window.onerror` ⛔ ขึ้นคอนโซล ⇒ ตาและด่านมองไม่เห็น
//   ⇒ อาการบนท่อ ⇒ ไฟล์โค้ดครบ · ไม่มีคำขอค้าง · ไม่มีข้อผิดพลาด · Vue ไม่ติด ⇒ ตรงกับทางนี้ทุกข้อ
// ⭐ ตัวนี้แค่จดไว้ที่ `window.__pkข้อผิดพลาดแอป` ⇒ ⛔ เปลี่ยนพฤติกรรม ⛔ พิมพ์ลงคอนโซล (ด่านบางตัวนับข้อความในคอนโซล)
//   ⇒ คนอ่านคือ `สภาพตอนค้าง` ใน `tools/หน้าที่ตรวจ.mjs`
// ⭐ ชื่อขึ้นต้น `00.` ⇒ Nuxt เรียงตัวเสริมตามชื่อ ⇒ ตัวนี้ตั้งตัวฟังก่อนตัวอื่น
// ⛔ ไม่ใช้ตัวดีบักของเบราว์เซอร์ (หยุดทุกข้อยกเว้น) ทำแทน ⇒ รอบแรกที่ลอง (คอมมิต b81608f2) ด่านลิงก์เว็บเดิมยังจับได้ค้างทั้งงาน (ท่อ 45096247975)
//   ⇒ ยังไม่รู้ว่าเกี่ยวกันไหม ⇒ แต่หน้าที่ถูกหยุดค้างได้ถ้าคำสั่งปล่อยหล่นหาย ⇒ ⛔ เสี่ยงกับท่อที่ใช้ร่วมกัน
export default defineNuxtPlugin({
  name: 'จดข้อผิดพลาด',
  enforce: 'pre',
  setup(nuxtApp) {
    const ที่ = window as unknown as { __pkข้อผิดพลาดแอป?: string[]; __pkขั้นเริ่ม?: string[] }
    const จด = (ที่.__pkข้อผิดพลาดแอป ??= [])
    const เก็บ = (ทาง: string, e: unknown) => {
      if (จด.length >= 20) return
      const ข้อความ =
        e instanceof Error
          ? `${e.name}: ${e.message} ⇐ ${(e.stack || '')
              .split('\n')
              .slice(1, 4)
              .map((x) => x.trim())
              .join(' < ')}`
          : String(e)
      จด.push(`${ทาง} ${ข้อความ}`.slice(0, 400))
    }
    nuxtApp.hook('app:error', (e) => เก็บ('app:error', e))
    nuxtApp.hook('vue:error', (e) => เก็บ('vue:error', e))
    window.addEventListener('vite:preloadError', (e) => เก็บ('vite:preloadError', (e as Event & { payload?: unknown }).payload))

    // ⭐ **เริ่มเว็บถึงขั้นไหนแล้ว** ⇒ `window.__pkขั้นเริ่ม` ⇒ ค้างที่ promise ที่ไม่จบ (ไม่ใช่โยน) ⇒ ขั้นสุดท้ายที่จดบอกว่ารออะไรอยู่
    //   ⇒ ลำดับของ Nuxt ⇒ ตัวเสริมทุกตัว ⇒ app:created (ตัวจัดเส้นทางพาเข้าหน้าแรก ⇒ โหลดโค้ดของหน้า) ⇒ app:beforeMount ⇒ mount ⇒ app:mounted
    const ขั้น = (ที่.__pkขั้นเริ่ม ??= [])
    const ถึง = (ชื่อ: string) => {
      if (ขั้น.length < 30) ขั้น.push(`${ชื่อ}@${Math.round(performance.now())}`)
    }
    ถึง('ตัวเสริมแรก')
    nuxtApp.hook('app:created', () => {
      ถึง('app:created')
      const เส้นทาง = nuxtApp.$router as
        | { beforeResolve: (f: () => void) => void; afterEach: (f: () => void) => void; onError: (f: (e: unknown) => void) => void }
        | undefined
      เส้นทาง?.beforeResolve(() => ถึง('router:beforeResolve'))
      เส้นทาง?.afterEach(() => ถึง('router:afterEach'))
      เส้นทาง?.onError((e) => เก็บ('router:onError', e))
    })
    nuxtApp.hook('app:beforeMount', () => ถึง('app:beforeMount'))
    nuxtApp.hook('app:mounted', () => ถึง('app:mounted'))
    nuxtApp.hook('page:start', () => ถึง('page:start'))
    nuxtApp.hook('page:finish', () => ถึง('page:finish'))
    nuxtApp.hook('app:suspense:resolve', () => ถึง('app:suspense:resolve'))
  },
})
