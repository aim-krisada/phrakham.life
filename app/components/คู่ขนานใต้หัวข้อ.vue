<script setup lang="ts">
// ⭐⭐ **บรรทัดคู่ขนานใต้หัวข้อ** (@krisada 22 พ.ย. 2569 *"เอา"*) ⇒ เช่น *(มธ.10:1,9-14; ลก.9:1,3-5)*
//   ⇒ ผู้แปลเขียนไว้เองใต้หัวข้อ (`<para style="r">`) ⇒ บอกว่าเรื่องเดียวกันเล่าไว้ที่ไหนอีก ⇒ ⛔ ไม่ใช่ของที่เว็บเขียนเพิ่ม
//   ⇒ ⭐ ที่อยู่แต่ละท่อนแตะได้ ⇒ หน้าอ่านเปิดคอลัมน์ใหม่ที่ข้อนั้น (คอลัมน์เต็ม ⇒ พาไป) ⇒ ท่าเดียวกับที่อยู่ในเชิงอรรถ
//   ⇒ ข้อมูลมาจาก `tools/สร้างรอยย่อหน้า.py` (ช่อง `คู่ขนาน` ของหัวข้อ) ⇒ ตัวเฝ้าคือ `tools/ด่านคู่ขนานบนหน้า.mjs`
//   ⇒ ⛔ ไม่มีถ้อยคำใหม่ ⇒ ตัวหนังสือทุกตัวเป็นของผู้แปล
import type { ComputedRef } from 'vue'
import { Button } from '~/components/ui/button'
import type { หัวข้อย่อย } from '~/utils/หัวข้อย่อย'

const props = defineProps<{ หัว: หัวข้อย่อย | null | undefined }>()
const emit = defineEmits<{ ไปที่: [ที่อยู่: string] }>()

/** ผ่าตัวหนังสือตรงที่อยู่ ⇒ ต่อกลับได้ครบเท่าเดิม */
/** ⭐ สวิตช์ของหน้าอ่าน ⇒ ปิดแล้วกรอบ ⛔ ขึ้น (`app/components/หน้าอ่าน.vue` ⇒ `กรองหัว`) */
const แสดงหัว = inject<ComputedRef<{ หัว: boolean; คู่ขนาน: boolean }> | null>('pk-แสดงหัว', null)
const ท่อน = computed(() => {
  const ค = props.หัว?.คู่ขนาน
  if (!ค || แสดงหัว?.value.คู่ขนาน === false) return []
  const ออก: { ตัวหนังสือ: string; ที่อยู่?: string }[] = []
  let เหลือ = ค.ตัวหนังสือ
  for (const ร of ค.โยงไป) {
    const ที่ = เหลือ.indexOf(ร.ตัวหนังสือ)
    if (ที่ < 0) continue
    if (ที่ > 0) ออก.push({ ตัวหนังสือ: เหลือ.slice(0, ที่) })
    ออก.push({ ตัวหนังสือ: ร.ตัวหนังสือ, ที่อยู่: ร.ที่อยู่ })
    เหลือ = เหลือ.slice(ที่ + ร.ตัวหนังสือ.length)
  }
  if (เหลือ) ออก.push({ ตัวหนังสือ: เหลือ })
  return ออก
})
</script>

<template>
  <p v-if="ท่อน.length" class="pk-คู่ขนาน"
    ><template v-for="(ท, i) in ท่อน" :key="i"
      ><Button
        v-if="ท.ที่อยู่"
        type="button"
        variant="ลิงก์"
        class="pk-ที่อยู่คู่ขนาน"
        :data-ที่อยู่="ท.ที่อยู่"
        @click.stop="emit('ไปที่', ท.ที่อยู่)"
        >{{ ท.ตัวหนังสือ }}</Button
      ><template v-else>{{ ท.ตัวหนังสือ }}</template></template
    ></p
  >
</template>
