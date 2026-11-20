<script setup lang="ts">
// ⭐⭐ **แผ่นบอกวิธีติดตั้ง ⇒ ขึ้นจากขอบล่างของจอ** (ยกมาจากเว็บเพลง `src/components/InstallSheet.vue` ⇒ ใบ v3/pleng#156)
//   ⇒ ติดไว้ครั้งเดียวที่ `app/app.vue` ⇒ เปิดด้วย `เริ่มติดตั้ง()` จากปุ่ม *ติดตั้งแอพ* ทุกปุ่ม (การ์ดหน้าแรก · แถวในแผง ≡)
//   ⇒ บอกไม่เกิน 3 ขั้นของเบราว์เซอร์นี้ ⇒ หรือในแอปแชต ⇒ ปุ่มที่พาไปเปิดในเบราว์เซอร์จริง
//   ⇒ ถ้อยคำบนแผ่นอยู่ที่ `app/utils/ติดตั้งแอป.ts` (คำของเว็บเพลงทุกตัวอักษร ⇒ @krisada อนุมัติ 19 พ.ย. 2569)
//
// ⭐ **ทรง WAI-ARIA APG *Dialog (Modal)*** ⇒ `role="dialog"` + `aria-modal` + ชื่อจากหัวแผ่น
//   ⇒ เปิดแล้วโฟกัสเข้าแผ่น ⇒ Tab วนอยู่ในแผ่น ⇒ Escape กับกดพื้นมืดปิด ⇒ โฟกัสกลับปุ่มที่เปิด (`ปิดแผ่นติดตั้ง`)
//   ⇒ WCAG 2.2 SC 2.1.1 · 2.1.2 · 2.4.3 · 4.1.2 ⇒ ของที่กดได้ทุกชิ้นจากปุ่มกลาง (`Button`) ⇒ สูงไม่ต่ำกว่า 44 จุด
// ⭐ หน้าตาเดียวกับการ์ดความหมายคำบนจอแคบ ⇒ แผ่นล่างจอ มนเฉพาะมุมบน (`--pk-มุมการ์ด` ⇒ ขอบใน `--pk-ขอบในการ์ด`)
// ⭐ ตัวเฝ้าคือ `tools/ด่านปุ่มติดตั้งแอป.mjs` ข้อ ② ③ ⑥
import { Button } from '~/components/ui/button'
import { แผ่นที่เปิด, ปิดแผ่นติดตั้ง } from '~/composables/ติดตั้งแอป'
import { ถ้อยคำติดตั้งแอป } from '~/utils/ถ้อยคำติดตั้งแอป'

const แผ่น = ref<HTMLElement | null>(null)

function ของที่กดได้() {
  return แผ่น.value ? [...แผ่น.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')] : []
}
function กดแป้น(e: KeyboardEvent) {
  if (!แผ่นที่เปิด.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    // ⭐ ⛔ ให้ Escape ไปปิดของอื่นใต้แผ่นด้วย (การ์ดคำ · แผง) ⇒ ปิดทีละชั้น
    e.stopPropagation()
    ปิดแผ่นติดตั้ง()
    return
  }
  if (e.key !== 'Tab') return
  const ทั้งหมด = ของที่กดได้()
  if (!ทั้งหมด.length) return
  const แรก = ทั้งหมด[0]!
  const ท้าย = ทั้งหมด[ทั้งหมด.length - 1]!
  const ตอนนี้ = document.activeElement
  const อยู่ใน = !!แผ่น.value?.contains(ตอนนี้)
  if (e.shiftKey && (ตอนนี้ === แรก || !อยู่ใน)) {
    e.preventDefault()
    ท้าย.focus()
  } else if (!e.shiftKey && (ตอนนี้ === ท้าย || !อยู่ใน)) {
    e.preventDefault()
    แรก.focus()
  }
}

watch(แผ่นที่เปิด, async (เปิด) => {
  if (เปิด) {
    document.addEventListener('keydown', กดแป้น, true)
    await nextTick()
    ;(ของที่กดได้()[0] || แผ่น.value)?.focus()
  } else {
    document.removeEventListener('keydown', กดแป้น, true)
  }
})
onBeforeUnmount(() => document.removeEventListener('keydown', กดแป้น, true))
</script>

<template>
  <div v-if="แผ่นที่เปิด" class="pk-รากแผ่นติดตั้ง">
    <div class="pk-พื้นแผ่นติดตั้ง" aria-hidden="true" @click="ปิดแผ่นติดตั้ง()" />
    <div
      ref="แผ่น"
      class="pk-แผ่นติดตั้ง"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pk-หัวแผ่นติดตั้ง"
      :aria-describedby="แผ่นที่เปิด.ก่อนหัว ? 'pk-ก่อนหัวแผ่นติดตั้ง' : undefined"
      tabindex="-1"
      :data-แผ่น="แผ่นที่เปิด.id"
    >
      <!-- ⭐ บรรทัดเหนือหัว (แผ่น Samsung ⇒ ติดตั้งแล้วเปิดจากไอคอนได้เลย) ⇒ ตาเห็นก่อน ⇒ หูได้ยินพร้อมชื่อหน้าต่างผ่าน `aria-describedby` -->
      <p v-if="แผ่นที่เปิด.ก่อนหัว" id="pk-ก่อนหัวแผ่นติดตั้ง" class="pk-นำแผ่นติดตั้ง" data-บรรทัด="ก่อนหัว">{{ แผ่นที่เปิด.ก่อนหัว }}</p>
      <h2 id="pk-หัวแผ่นติดตั้ง" class="pk-หัวแผ่นติดตั้ง">{{ แผ่นที่เปิด.title }}</h2>
      <p v-if="แผ่นที่เปิด.intro" class="pk-นำแผ่นติดตั้ง">{{ แผ่นที่เปิด.intro }}</p>

      <ol v-if="แผ่นที่เปิด.steps.length" class="pk-ขั้นติดตั้ง">
        <li v-for="(ขั้น, i) in แผ่นที่เปิด.steps" :key="i">
          <span class="pk-เลขขั้น" aria-hidden="true">{{ i + 1 }}</span>
          <span class="pk-คำขั้น">
            <template v-for="(ชิ้น, j) in ขั้น" :key="j">
              <span v-if="'k' in ชิ้น" class="pk-ปุ่มในขั้น">
                <!-- ⭐ รูปแชร์ของ Apple (กล่องกับลูกศรขึ้น ⇒ Lucide `share`) ⇒ รูปเปล่าไม่มีคำ ⇒ หูได้ยิน *แชร์* -->
                <svg
                  v-if="ชิ้น.icon === 'share'"
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" x2="12" y1="2" y2="15" />
                </svg>
                <span v-if="ชิ้น.icon && !ชิ้น.k" class="sr-only">{{ ถ้อยคำติดตั้งแอป.รูปแชร์ }}</span>{{ ชิ้น.k }}
              </span>
              <template v-else>{{ ชิ้น.t }}</template>
            </template>
          </span>
        </li>
      </ol>

      <Button
        v-if="แผ่นที่เปิด.action?.href"
        as="a"
        variant="เข้ม"
        class="pk-ปุ่มแผ่นติดตั้ง"
        data-ปุ่ม="เปิดในเบราว์เซอร์"
        :href="แผ่นที่เปิด.action.href"
        >{{ แผ่นที่เปิด.action.label }}</Button
      >
      <p v-if="แผ่นที่เปิด.note" class="pk-หมายเหตุแผ่นติดตั้ง">{{ แผ่นที่เปิด.note }}</p>

      <Button type="button" class="pk-ปุ่มแผ่นติดตั้ง" data-ปุ่ม="เข้าใจแล้ว" @click="ปิดแผ่นติดตั้ง()">{{
        ถ้อยคำติดตั้งแอป.เข้าใจแล้ว
      }}</Button>
    </div>
  </div>
</template>
