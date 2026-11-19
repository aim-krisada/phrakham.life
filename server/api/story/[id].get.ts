// ตัวเรื่องเล่าของช่วงข้อ — หน้าอ่านขอ **ตอนผู้อ่านกดเปิดเรื่องเล่าเท่านั้น** (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/105)
//
// ⭐ ที่อยู่ลงท้ายด้วย `.json` ⇒ เหตุผลอยู่ที่ `server/api/books.json.get.ts` ⛔ ไม่จดซ้ำที่นี่
// ⭐ อ่านเฉพาะเรื่องในทะเบียนที่อนุมัติ ⇒ กติกาอยู่ที่ `server/utils/เรื่องเล่า.ts`
//
// ⛔ **ต้องสั่ง import เอง** — ตัวเติม import อัตโนมัติ ⛔ ไม่รู้จักชื่อภาษาไทย
import { อ่านเรื่องเล่า } from '../../utils/เรื่องเล่า'

export default defineEventHandler((event) => {
  const รหัส = (getRouterParam(event, 'id') || '').replace(/\.json$/, '')
  const ผล = อ่านเรื่องเล่า(รหัส)
  // ⛔ **ไม่มีเรื่องนั้น = 404 จริง** ⛔ ไม่ใช่คืนของว่างที่ดูเหมือนใช้ได้
  if (!ผล) throw createError({ statusCode: 404, statusMessage: `ไม่มีเรื่องเล่า ${รหัส}` })
  return ผล
})
