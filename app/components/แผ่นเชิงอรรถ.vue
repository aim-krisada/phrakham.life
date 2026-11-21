<script setup lang="ts">
// ⭐ แผ่นเชิงอรรถของผู้แปล ⇒ เปิดจากเครื่องหมายเล็ก ๆ ในตัวบท ⇒ ⛔ ไม่ดันตัวบทให้ขยับ
//   ⇒ ลอยติดขอบล่างของจอ ⇒ ปิดด้วย × · Escape · กดนอกแผ่น ⇒ ผู้เรียกคืนโฟกัสให้เครื่องหมายที่เปิด
//   ⇒ ⭐ เชิงอรรถเป็นของฉบับไหน แผ่นบอกชื่อฉบับนั้น ⇒ ผู้อ่านรู้ว่าเป็นคำของผู้แปล ⛔ ไม่ใช่ของที่เว็บเขียนเพิ่ม
//   ⇒ ถ้อยคำทั้งหมดอยู่ที่ `app/utils/ถ้อยคำเชิงอรรถ.ts` ⛔ ไม่พิมพ์ตรงในไฟล์นี้
//   ⇒ ⭐ ที่อยู่ข้ออื่นในเชิงอรรถ (เช่น *ดู ฉธบ.15:11*) กดได้ (@krisada 21 พ.ย. 2569)
//     ⇒ แผ่นแค่บอกที่อยู่ (`ไปที่`) ⇒ หน้าอ่านตัดสินเองว่าเปิดคอลัมน์ใหม่ หรือพาไป (คอลัมน์เต็มแล้ว)
//     ⇒ ใช้ที่อยู่ที่ผู้แปลฝังไว้ (`ref loc`) เท่านั้น ⇒ ⛔ ไม่เดาจากตัวหนังสือ ⇒ WEB ไม่มีที่อยู่ฝัง ⇒ เป็นตัวหนังสือธรรมดา
import ปุ่มกากบาท from '~/components/ปุ่มกากบาท.vue'
import { Button } from '~/components/ui/button'
import type { เครื่องหมายเชิงอรรถ } from '~/utils/เชิงอรรถ'
import { ถ้อยคำเชิงอรรถ } from '~/utils/ถ้อยคำเชิงอรรถ'

const props = defineProps<{
  ก้อน: เครื่องหมายเชิงอรรถ
  ชื่อฉบับ: string
  ภาษา?: string
}>()
const emit = defineEmits<{ ปิด: []; ไปที่: [ที่อยู่: string] }>()

/** ชิ้นที่วาดได้เลย ⇒ ชิ้น `xt` ถูกผ่าตรงที่อยู่ที่ผู้แปลฝังไว้ ⇒ ตัวหนังสือต่อกลับได้ครบเท่าเดิม */
const ท่อน = computed(() => {
  const ที่เหลือ = [...(props.ก้อน.โยงไป || [])]
  const ออก: { ตัวหนังสือ: string; ป้าย: string; ที่อยู่?: string }[] = []
  for (const ช of props.ก้อน.ชิ้น) {
    let ข้อความ = ช.ตัวหนังสือ
    while (ที่เหลือ.length) {
      const ร = ที่เหลือ[0]!
      const ที่ = ร.ตัวหนังสือ ? ข้อความ.indexOf(ร.ตัวหนังสือ) : -1
      if (ที่ < 0) break
      if (ที่ > 0) ออก.push({ ตัวหนังสือ: ข้อความ.slice(0, ที่), ป้าย: ช.ป้าย })
      ออก.push({ ตัวหนังสือ: ร.ตัวหนังสือ, ป้าย: ช.ป้าย, ที่อยู่: ร.ที่อยู่ })
      ข้อความ = ข้อความ.slice(ที่ + ร.ตัวหนังสือ.length)
      ที่เหลือ.shift()
    }
    if (ข้อความ) ออก.push({ ตัวหนังสือ: ข้อความ, ป้าย: ช.ป้าย })
  }
  return ออก
})

const แผ่น = ref<HTMLElement | null>(null)
const คำยก = new Set(['fq', 'fqa'])

function กดแป้น(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('ปิด')
}
function กดนอก(e: PointerEvent) {
  const t = e.target as HTMLElement | null
  if (!แผ่น.value || แผ่น.value.contains(t) || t?.closest('[data-เชิงอรรถ]')) return
  emit('ปิด')
}
onMounted(() => {
  document.addEventListener('keydown', กดแป้น)
  document.addEventListener('pointerdown', กดนอก)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', กดแป้น)
  document.removeEventListener('pointerdown', กดนอก)
})
const หัว = computed(() =>
  props.ก้อน.ข้อเดิม ? ถ้อยคำเชิงอรรถ.ข้อเดิม(props.ก้อน.ป้าย, props.ก้อน.ข้อเดิม) : props.ก้อน.ป้าย,
)
</script>

<template>
  <aside ref="แผ่น" class="pk-แผ่นเชิงอรรถ" role="dialog" :aria-label="ถ้อยคำเชิงอรรถ.แผ่น">
    <div class="pk-หัวแผ่นเชิงอรรถ">
      <span class="pk-ป้ายแผ่นเชิงอรรถ">{{ หัว }}</span>
      <span class="pk-ฉบับแผ่นเชิงอรรถ">{{ ถ้อยคำเชิงอรรถ.ของฉบับ(ชื่อฉบับ) }}</span>
      <component :is="ปุ่มกากบาท" :ชื่อ="ถ้อยคำเชิงอรรถ.ปิด" @click="emit('ปิด')" />
    </div>
    <p :lang="ภาษา"
      ><template v-for="(ช, i) in ท่อน" :key="i"
        ><Button
          v-if="ช.ที่อยู่"
          type="button"
          variant="ลิงก์"
          class="pk-ที่อยู่ในเชิงอรรถ"
          :data-ที่อยู่="ช.ที่อยู่"
          @click="emit('ไปที่', ช.ที่อยู่)"
          >{{ ช.ตัวหนังสือ }}</Button
        ><em v-else-if="คำยก.has(ช.ป้าย)" class="pk-คำยกเชิงอรรถ">{{ ช.ตัวหนังสือ }}</em
        ><template v-else>{{ ช.ตัวหนังสือ }}</template></template
      ></p
    >
  </aside>
</template>
