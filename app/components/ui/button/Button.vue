<script setup lang="ts">
// ปุ่มกลางของทั้งเว็บ ⇒ เหตุผล ชนิด และตัวเฝ้า อยู่ที่ `index.ts` ข้างกัน ⛔ ไม่จดซ้ำที่นี่
// ⭐ หน้าตาจริงอ่านจากป้าย `data-variant` กับ `data-ทรง` ⇒ กฎอยู่ท้าย `app/assets/css/main.css` ก้อน *ปุ่มชุดเดียว*
// ⭐ `as="a"` ⇒ ลิงก์ที่หน้าตาเป็นปุ่ม (เช่นปุ่มหลักของหน้าแรก ลูกศรเปลี่ยนบท) ⇒ ยังเป็น `<a href>` จริง
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from "."

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  ทรง?: ButtonVariants["ทรง"]
  class?: HTMLAttributes["class"]
}

// ⭐ ป้ายของคนเรียก (`data-ปุ่ม` · `aria-*` · `@click`) ต้องมาก่อนป้ายของปุ่มกลางบนแท็กจริง
//   ⇒ ด่านเก่าบางตัวหยิบป้าย `data-` ตัวแรกของปุ่มเป็นชื่อเรียก (เช่น `tools/ด่านแถวปุ่มคำเดิม.mjs`)
//   ⇒ ปล่อยให้ Vue ต่อท้ายเอง ⇒ `data-slot` ขึ้นก่อน ⇒ ด่านหาปุ่มของตัวเองไม่เจอ
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  variant: "กรอบ",
  ทรง: "มน",
})
</script>

<template>
  <Primitive
    v-bind="$attrs"
    data-slot="button"
    :data-variant="props.variant"
    :data-ทรง="props.ทรง"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant: props.variant, ทรง: props.ทรง }), props.class)"
  >
    <slot />
  </Primitive>
</template>
