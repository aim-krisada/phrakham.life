// ข้อมูลการ์ดความหมายคำของบทเดียว — **หน้าอ่านขอตอนผู้อ่านกดคำครั้งแรกในบทนั้นเท่านั้น**
// (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/103)
//
// ⭐ ที่อยู่เป็นภาษาอังกฤษและลงท้ายด้วย `.json` ⇒ เหตุผลเดียวกับ `server/api/words/[book]/[chapter].get.ts`
// ⭐ เนื้อทั้งหมดอยู่ที่ `server/utils/การ์ดคำ.mjs` ⇒ ใช้ร่วมกับตัวตั้งค่าเว็บ ⛔ ไม่เขียนสองที่
//
// ⛔ **ต้องสั่ง import เอง** — ตัวเติม import อัตโนมัติ ⛔ ไม่รู้จักชื่อภาษาไทย
import { ข้อมูลการ์ดของบท } from '../../../utils/การ์ดคำ.mjs'

export default defineEventHandler((event) => {
  const เล่ม = getRouterParam(event, 'book') || ''
  const บท = (getRouterParam(event, 'chapter') || '').replace(/\.json$/, '')
  const ค่า = useRuntimeConfig()
  const ผล = ข้อมูลการ์ดของบท(เล่ม, บท, {
    ทางกองภาษาเดิม: ค่า.ทางกองภาษาเดิม as string,
    ทางกองความหมาย: ค่า.ทางกองความหมาย as string,
  })
  // ⛔ ไม่มีชั้นคำของบทนี้ = 404 จริง ⇒ ⭐ แต่ ⛔ ไม่ใช่ความพัง ⇒ หน้าอ่านไม่มีคำให้กดในบทนั้นอยู่แล้ว
  if (!ผล) throw createError({ statusCode: 404, statusMessage: `ไม่มีข้อมูลการ์ดของ ${เล่ม} ${บท}` })
  return ผล
})
