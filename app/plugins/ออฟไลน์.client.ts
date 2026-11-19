// ⭐⭐ **ลงทะเบียนตัวช่วยออฟไลน์** (`public/sw.js`) ⇒ หลังหน้าพร้อม (`onNuxtReady`) ⇒ ⛔ แย่งเน็ตกับของที่หน้าแรกต้องโหลด
//   ⇒ เหตุผลกับสถานะอยู่ที่ `app/composables/ออฟไลน์.ts` ⇒ ฝั่งเครื่องเท่านั้น (`.client`)
//   ⇒ ⛔ ตอน `nuxt dev` ⇒ ไฟล์ของ Vite ⛔ มีลายในชื่อ ⇒ เก็บแบบที่เก็บก่อนแล้วจะได้โค้ดเก่าค้าง
// ⭐ ตัวเฝ้าคือ `tools/ด่านออฟไลน์.mjs` · `tools/ด่านติดตั้งเป็นแอป.mjs` ข้อ ⑥
import { เริ่มออฟไลน์ } from '~/composables/ออฟไลน์'

export default defineNuxtPlugin(() => {
  if (import.meta.dev) return
  const config = useRuntimeConfig()
  onNuxtReady(() => เริ่มออฟไลน์(config.app.baseURL, String(config.app.buildId || '')))
})
