<script setup lang="ts">
// ⭐⭐ **ลิงก์ที่พาออกนอกเว็บเรา ต้องเปิดแท็บใหม่**
//
// **ทำไม** — ผู้อ่านบนมือถือที่กดไปดูสัญญาอนุญาต จะกลับมาอ่านต่อได้
//   ⛔ ถ้าทับแท็บเดิม เขามักไม่กลับมาอีก
//
// ⛔ **Nuxt Content สร้างลิงก์ที่เปิดทับแท็บเดิม** ⇒ ต้องเขียนตัวนี้เอง
//   ⇒ ทำที่ตัววาดหน้า ⛔ ไม่ใช่ไปเขียน `target` ซ้ำทุกลิงก์ในไฟล์ `.md`
//
// ⛔ **ลิงก์ในหน้าเดียวกัน (`#จุดยึด`) ⛔ ห้ามเปิดแท็บใหม่** — มันคือการกระโดดในหน้าเดิม
//
// `rel="noopener noreferrer"` — กันหน้าปลายทางเอื้อมมาสั่งแท็บเรา และไม่บอกมันว่าเรามาจากไหน
//
// **ตัวเฝ้าคือ `tools/ด่านหน้าเว็บ.mjs` ข้อ ①**
//
// ⭐⭐ **ลิงก์ไปหน้าอื่นในเว็บนี้ (`/sources`) ต้องต่อฐานของเว็บ** (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/172)
//   ⇒ ในไฟล์ `.md` เขียน `[แหล่งข้อมูล](/sources)` ⇒ ⛔ Nuxt Content ⛔ ต่อฐาน `/phrakham/` ให้ ⇒ ได้ `href="/sources"` ⇒ กดแล้ว 404
//   ⇒ ต่อที่นี่ที่เดียว ⇒ ในไฟล์ `.md` ⛔ ต้องรู้ฐาน ⇒ วันย้ายฐาน ⛔ ต้องแก้เนื้อ
//   ⇒ ⛔ แตะ `//เครื่องอื่น` กับ `#จุดยึด` ⇒ ตัวเฝ้าคือ `tools/ด่านหน้าเว็บ.mjs` ข้อ ②
import { ที่อยู่หลังบ้าน } from '~/utils/ที่อยู่'

const props = defineProps<{ href?: string; target?: string; rel?: string | string[] }>()

const ออกนอก = computed(() => /^[a-z][a-z0-9+.-]*:/i.test(props.href ?? ''))
const ที่อยู่จริง = computed(() =>
  props.href && /^\/(?!\/)/.test(props.href) ? ที่อยู่หลังบ้าน(props.href) : props.href,
)

// ⛔ **ต่อท้ายของเดิม ⛔ ไม่ใช่เขียนทับ** — วันนี้ตัวแปลง ⛔ ไม่ส่ง `rel` อะไรมาแล้ว
//   (ปิด `nofollow` ที่ต้นทางใน `nuxt.config.ts` ⇒ เหตุผลอยู่ที่นั่น)
//   ⇒ แต่วันไหนมีคนเปิดกลับหรือใส่ `rel` อย่างอื่นเข้ามา **ของนั้นต้อง ⛔ ไม่หายเงียบ ๆ ที่บรรทัดนี้**
const ป้ายเชื่อม = computed(() => {
  const เดิม = Array.isArray(props.rel) ? props.rel : (props.rel ? props.rel.split(/\s+/) : [])
  const ทั้งหมด = new Set(เดิม.filter(Boolean))
  if (ออกนอก.value) {
    ทั้งหมด.add('noopener')
    ทั้งหมด.add('noreferrer')
  }
  return ทั้งหมด.size ? [...ทั้งหมด].join(' ') : undefined
})
</script>

<template>
  <a
    :href="ที่อยู่จริง"
    :target="target ?? (ออกนอก ? '_blank' : undefined)"
    :rel="ป้ายเชื่อม"
  >
    <slot />
  </a>
</template>
