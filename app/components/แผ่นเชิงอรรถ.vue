<script setup lang="ts">
// ⭐ แผ่นเชิงอรรถของผู้แปล ⇒ เปิดจากเครื่องหมายเล็ก ๆ ในตัวบท ⇒ ⛔ ไม่ดันตัวบทให้ขยับ
//   ⇒ ลอยติดขอบล่างของจอ ⇒ ปิดด้วย × · Escape · กดนอกแผ่น ⇒ ผู้เรียกคืนโฟกัสให้เครื่องหมายที่เปิด
//   ⇒ ⭐ เชิงอรรถเป็นของฉบับไหน แผ่นบอกชื่อฉบับนั้น ⇒ ผู้อ่านรู้ว่าเป็นคำของผู้แปล ⛔ ไม่ใช่ของที่เว็บเขียนเพิ่ม
//   ⇒ ถ้อยคำทั้งหมดอยู่ที่ `app/utils/ถ้อยคำเชิงอรรถ.ts` ⛔ ไม่พิมพ์ตรงในไฟล์นี้
import ปุ่มกากบาท from '~/components/ปุ่มกากบาท.vue'
import type { เครื่องหมายเชิงอรรถ } from '~/utils/เชิงอรรถ'
import { ถ้อยคำเชิงอรรถ } from '~/utils/ถ้อยคำเชิงอรรถ'

const props = defineProps<{
  ก้อน: เครื่องหมายเชิงอรรถ
  ชื่อฉบับ: string
  ภาษา?: string
}>()
const emit = defineEmits<{ ปิด: [] }>()

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
      ><template v-for="(ช, i) in ก้อน.ชิ้น" :key="i"
        ><em v-if="คำยก.has(ช.ป้าย)" class="pk-คำยกเชิงอรรถ">{{ ช.ตัวหนังสือ }}</em
        ><template v-else>{{ ช.ตัวหนังสือ }}</template></template
      ></p
    >
  </aside>
</template>
