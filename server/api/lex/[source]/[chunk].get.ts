// ก้อนพจนานุกรมก้อนเดียวของแหล่งเดียว ⇒ ความหมายทีละ 100 เลข
// (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/103)
//
// ⭐ **หน้าอ่านขอตอนผู้อ่านกดคำเท่านั้น และขอเฉพาะแหล่งที่ผู้อ่านเลือก** ⇒ เกณฑ์ข้อ 11 ของใบ
// ⭐ เนื้อทั้งหมดอยู่ที่ `server/utils/การ์ดคำ.mjs` ⇒ ⛔ ไม่แตะตัวหนังสือของความหมายสักตัว
//
// ⛔ **ต้องสั่ง import เอง** — ตัวเติม import อัตโนมัติ ⛔ ไม่รู้จักชื่อภาษาไทย
import { ก้อนพจนานุกรม } from '../../../utils/การ์ดคำ.mjs'

export default defineEventHandler((event) => {
  const แหล่ง = getRouterParam(event, 'source') || ''
  const ก้อน = (getRouterParam(event, 'chunk') || '').replace(/\.json$/, '')
  const ค่า = useRuntimeConfig()
  const ผล = ก้อนพจนานุกรม(แหล่ง, ก้อน, {
    ทางกองความหมาย: ค่า.ทางกองความหมาย as string,
    ทางกองพจนานุกรม: ค่า.ทางกองพจนานุกรม as string,
  })
  if (!ผล) throw createError({ statusCode: 404, statusMessage: `ไม่มีก้อน ${ก้อน} ของ ${แหล่ง}` })
  return ผล
})
