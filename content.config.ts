import { defineCollection, defineContentConfig } from '@nuxt/content'

// ⭐ **หัวใจของโครงนี้** — ไฟล์ `.md` ที่พี่เอมตรวจและคอมมิต กับไฟล์ที่เว็บอ่าน เป็นไฟล์เดียวกัน
//   ⇒ ที่นี่ชี้ไปที่ `content/` ตรง ๆ ⛔ ไม่มีขั้นตอนแปลงไปเป็นไฟล์อื่นก่อน
//   เจ้าของความจริงข้อนี้คือ `ข้อกำหนดโปรเจกต์.md` หัวข้อ "ไฟล์ไหนอยู่โฟลเดอร์ไหน"
//
// ⛔ `source` เก็บเฉพาะ `**/*.md` ⇒ `source/` (ไฟล์ LFS 3.5 GiB) กับ `_แตก/` ไม่ถูกแตะเลย
export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
  },
})
