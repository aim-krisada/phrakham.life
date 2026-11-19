<script setup lang="ts">
// ⭐⭐ **บล็อกที่ติดป้าย ```mermaid ต้องวาดออกมาเป็นรูปจริง ⛔ ไม่ใช่กล่องโค้ด**
//
// Nuxt Content ส่งบล็อกโค้ดทุกอันมาที่นี่ ⇒ ที่นี่ดูป้ายภาษา แล้วแยกทาง
//   · `mermaid` ⇒ เรียกตัววาดแผนภาพ
//   · อื่น ๆ  ⇒ วาดเป็นกล่องโค้ดตามเดิม
//
// ⭐ **ตัววาดถูกโหลดตอนที่ต้องใช้จริงเท่านั้น** (`import()` ข้างล่าง) — ก้อนนี้ใหญ่ราวเมกะไบต์
//   ⇒ หน้าที่ไม่มีแผนภาพ ⛔ ไม่ต้องแบกมันไปด้วย
// ⭐ และมันมาจาก `node_modules` ⛔ ไม่ใช่ CDN ⇒ เน็ตล่มหรือ CDN ล่ม แผนภาพก็ยังขึ้น
//   (ต่างจาก `tools/ดูในเครื่อง.py` ที่ดึงจาก CDN — ตัวนั้นเป็นของดูเล่นในเครื่อง)
//
// ⭐⭐ **รอให้ถูกวาดลงหน้าก่อน ค่อยวาดแผนภาพ** — แผนภาพของหน้านี้อยู่ในกล่อง `<details>` ที่ปิดอยู่
//   ⇒ ของที่ถูกซ่อนด้วย `display:none` **วัดขนาดตัวอักษรไม่ได้** ⇒ วาดตอนนั้นจะได้รูปเพี้ยนหรือล้ม
//   ⇒ จึงฟังเหตุการณ์ `toggle` ของกล่องที่ครอบอยู่ แล้ววาดตอนที่กล่องเปิด
//   ⛔ **ไม่ใช้ `IntersectionObserver`** — มันตอบว่า "เห็นแล้ว" ก็ต่อเมื่อของ**เลื่อนมาถึงในจอ**ด้วย
//     ⇒ กล่องนี้อยู่ท้ายหน้า ⇒ กดเปิดแล้วแผนภาพจะยังไม่ถูกวาดจนกว่าจะเลื่อนลงไปหา
//     ⇒ ทำให้ด่าน `tools/ด่านล้นขอบจอ.mjs` รอจนหมดเวลา (เจอเอง 29 ส.ค. 2569)
//
// **ตัวเฝ้าคือ `tools/ด่านหน้าเว็บ.mjs` ข้อ ④** (เปิดกล่องแล้วต้องเจอ `<svg>` ⛔ ไม่ใช่ `<pre>`)
const props = defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
  class?: string
}>()

const เป็นแผนภาพ = computed(() => props.language === 'mermaid')

const กล่อง = ref<HTMLElement | null>(null)
const svg = ref('')
const ผิดพลาด = ref('')

// เลขประจำแผนภาพต้องไม่ซ้ำกันในหน้าเดียว — mermaid เอาไปตั้งเป็น id ของ svg ที่มันสร้าง
const เลข = `pk-mermaid-${Math.random().toString(36).slice(2, 9)}`

async function วาด() {
  if (svg.value || !props.code) return
  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict' })
    const ผล = await mermaid.render(เลข, props.code)
    svg.value = ผล.svg
  } catch (e: any) {
    // ⛔ ล้มแล้วเงียบ = คนอ่านเห็นที่ว่าง แล้วนึกว่าไฟล์ `.md` เขียนผิด
    ผิดพลาด.value = String(e?.message || e)
  }
}

// ถูกวาดลงหน้าจริงหรือยัง — ของที่อยู่ในกล่องที่ปิด จะไม่มีกรอบสี่เหลี่ยมสักอัน
const ถูกวาดแล้ว = () => !!กล่อง.value && กล่อง.value.getClientRects().length > 0

onMounted(() => {
  if (!เป็นแผนภาพ.value || !กล่อง.value) return
  if (ถูกวาดแล้ว()) {
    วาด()
    return
  }
  // ⭐ ฟังทุกกล่องที่ครอบอยู่ ⛔ ไม่ใช่แค่กล่องชั้นในสุด — กล่องซ้อนกันได้
  const กล่องที่ครอบ: HTMLElement[] = []
  for (let el = กล่อง.value.parentElement; el; el = el.parentElement) {
    if (el.tagName === 'DETAILS') กล่องที่ครอบ.push(el)
  }
  const ปลด = () => กล่องที่ครอบ.forEach((d) => d.removeEventListener('toggle', ฟัง))
  const ฟัง = () => {
    if (!ถูกวาดแล้ว()) return
    ปลด()
    วาด()
  }
  กล่องที่ครอบ.forEach((d) => d.addEventListener('toggle', ฟัง))
  onBeforeUnmount(ปลด)
})
</script>

<template>
  <div v-if="เป็นแผนภาพ" ref="กล่อง" class="pk-แผนภาพ">
    <!-- eslint-disable-next-line vue/no-v-html -- ผลจาก mermaid เป็น svg ที่มันสร้างจากข้อความในไฟล์ของเราเอง -->
    <div v-if="svg" v-html="svg" />
    <template v-else-if="ผิดพลาด">
      <p class="pk-เตือน">⛔ วาดแผนภาพไม่สำเร็จ: {{ ผิดพลาด }}</p>
      <pre><code>{{ code }}</code></pre>
    </template>
    <p v-else class="pk-รอ">กำลังวาดแผนภาพ…</p>
  </div>
  <pre v-else :class="props.class"><slot /></pre>
</template>
