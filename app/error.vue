<script setup lang="ts">
// หน้าข้อผิดพลาดของทั้งเว็บ ⇒ ตัวหน้าจริงคือ `app/components/หน้าไม่พบ.vue` (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/179 ข้อ 4)
//   ⇒ เหตุผลของหน้า ถ้อยคำ และตัวเฝ้า อยู่หัวไฟล์นั้น ⛔ ไม่จดซ้ำที่นี่
//
// ⛔⛔ **ไฟล์นี้ต้องบางและโหลดตัวหน้าแยกชิ้นเสมอ** (เจอเอง 23 พ.ย. 2569)
//   ⇒ `error.vue` อยู่ในก้อนโค้ดหลักของเว็บ ⇒ import `ที่อยู่.ts` หรือ `แถบนำทาง.vue` ตรง ๆ ที่นี่
//     ⇒ ของพวกนั้นถูกย้ายเข้าก้อนหลัก ⇒ หน้าอื่นที่ใช้ `createError` ต้อง import จากก้อนหลักพร้อมชื่อภาษาไทยบรรทัดเดียวกัน
//     ⇒ ตัวเติม import ของ nitro อ่านบรรทัดที่มีชื่อไทยไม่ออก ⇒ เติม `createError` ซ้ำ ⇒ `npm run generate` ล้ม
//       *The symbol "createError" has already been declared* (ที่ `reflections/[id]` กับ `read/index`)
//   ⇒ โหลดแยกด้วย `defineAsyncComponent` ⇒ ก้อนหลักเหมือนเดิมทุกอย่าง ⇒ ตัวหน้ามาเป็นชิ้นของมันเอง
const props = defineProps<{ error: { statusCode?: number } }>()
const หน้าไม่พบ = defineAsyncComponent(() => import('~/components/หน้าไม่พบ.vue'))
const รหัส = computed(() => Number(props.error?.statusCode) || 500)
</script>

<template>
  <!-- ⛔ ชื่อแท็กต้องเป็นตัวอักษรอังกฤษ ⇒ ชื่อชิ้นส่วนภาษาไทยต้องผ่าน `<component :is>` -->
  <component :is="หน้าไม่พบ" :รหัส="รหัส" />
</template>
