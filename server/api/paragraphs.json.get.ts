// ฉบับที่ไม่มีย่อหน้าของตัวเอง — หน้าแหล่งข้อมูลเรียกใช้ (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/131)
// ⭐ ที่อยู่ลงท้าย `.json` ⇒ เหตุผลเดียวกับ `books.json.get.ts` ⛔ ไม่จดซ้ำ
// ⛔ ต้องสั่ง import เอง ⇒ ตัวเติม import อัตโนมัติ ⛔ รู้จักชื่อภาษาไทย (`books.json.get.ts`)
import { ย่อหน้าของฉบับ } from '../utils/เนื้อบท'

export default defineEventHandler(() => ย่อหน้าของฉบับ())
