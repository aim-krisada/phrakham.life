// เครดิตของแต่ละแหล่ง — ข้อความที่แชร์ข้อพระคัมภีร์หยิบไปต่อท้าย (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/139)
// ⭐ ที่อยู่ลงท้าย `.json` ⇒ เหตุผลเดียวกับ `books.json.get.ts` ⛔ ไม่จดซ้ำ
// ⛔ ต้องสั่ง import เอง ⇒ ตัวเติม import อัตโนมัติ ⛔ รู้จักชื่อภาษาไทย (`books.json.get.ts`)
// ⭐ หน้าแหล่งข้อมูลมาจากคลังของ Nuxt Content ตัวเดียวกับ `app/pages/[...slug].vue` ⇒ ที่อยู่ของหน้าคือบรรทัด `path:` ที่หัวไฟล์
// ⛔ หาหน้าไม่เจอ ⇒ ตายตอนสร้างเว็บ ⇒ ดีกว่าเว็บที่แชร์ตัวบทออกไปโดยไม่มีเครดิต
import { queryCollection } from '@nuxt/content/server'
import { แกะเครดิต } from '../utils/เครดิตฉบับ'

export default defineEventHandler(async (event) => {
  const หน้า = await queryCollection(event, 'content').path('/sources').first()
  const ต้นไม้ = (หน้า?.body as { value?: unknown[] } | undefined)?.value
  if (!Array.isArray(ต้นไม้)) {
    throw createError({ statusCode: 500, statusMessage: 'หาหน้าแหล่งข้อมูล (/sources) ในคลังเนื้อเว็บไม่เจอ' })
  }
  const ได้ = แกะเครดิต(ต้นไม้ as Parameters<typeof แกะเครดิต>[0])
  if (!ได้['Thai Common Version 2025']?.เครดิต) {
    throw createError({ statusCode: 500, statusMessage: 'แกะเครดิตของ Thai Common Version 2025 จากหน้าแหล่งข้อมูลไม่ได้' })
  }
  return ได้
})
