<script setup lang="ts">
// ตัวจัดแถวของคอลัมน์คำภาษาเดิม (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/112)
//
// ⭐⭐ **ชิ้นนี้ ⛔ ไม่วาดอะไรเลย** ⇒ มันถือของ 2 อย่างที่ใช้เฉพาะตอนคอลัมน์คำภาษาเดิมเปิด
//   ① **กฎหน้าตาของตารางแถว** ⇒ `app/assets/css/แถวคำเดิม.css` ⇒ ติดมากับก้อนโค้ดนี้
//   ② **ตัวย่อแบบ *พอดี*** ⇒ ย่อตัวหนังสือภาษาเดิมทีละแถวจนแถวคำเดิมไม่สูงกว่าแถวฉบับแปล
//   ⇒ ⭐ หน้าอ่านโหลดชิ้นนี้ตอนเปิดคอลัมน์เท่านั้น ⇒ **คนที่ ⛔ ไม่เปิด ⛔ ไม่จ่ายไบต์ของสองอย่างนี้** (ใบ #112 ข้อ 15)
//   ⇒ ⭐ หน้าอ่านรอสัญญาณ `พร้อม` ก่อนวาดก้อนคำ ⇒ กฎหน้าตามาถึงแล้วแน่ ⇒ ⛔ ไม่มีจังหวะที่ก้อนคำวางผิดที่
//
// ⭐⭐ **พอดี = ย่อจนแถวเท่ากัน** ⇒ คำพี่เอม 26 ต.ค. 2569 ⇒ *"ถ้าเลือกพอดี ตัวหนังสือภาษาเดิมต้องย่อขนาดลงจนเห็น Row เท่ากัน"*
//   ⇒ ⛔ **ไม่มีขนาดต่ำสุดที่ทำให้แถวยืด** (ข้อ 11.1) ⇒ คนที่อยากอ่านตัวใหญ่กด *ตามขนาดจริง* หรือ ก+
//   ⇒ ⭐ **ฝั่งคำเดิมสั้นกว่าอยู่แล้ว ⇒ คงขนาดเต็ม ⛔ ไม่ขยาย** (ข้อ 11.4 ⇒ คนทำตัดสิน)
//     ⇒ ขนาดเต็มคือขนาดที่ผู้อ่านตั้งเองด้วย ก+ ก− ⇒ ท่าเดียวกับ `object-fit: scale-down` ของ CSS
//   ⇒ ⭐ **จอแคบ ⛔ ไม่ได้วางเคียงกัน** ⇒ ไม่มีแถวให้เทียบ ⇒ ตัวนี้ถอยออก ⇒ *พอดี* ของจอแคบเป็นแบบเดิมใน `main.css`
//
// ⭐ **วิธีย่อ** ⇒ ทุกแถวพร้อมกัน ⇒ ตั้งขนาดทุกแถว → อ่านความสูงทุกแถวรอบเดียว → เดาขนาดถัดไป ⇒ ปกติ 3 ถึง 5 รอบ
//   ⇒ ความสูงฝั่งฉบับแปล ⛔ ไม่ขึ้นกับฝั่งคำเดิม (กว้างคนละคอลัมน์) ⇒ ทุกแถวย่อพร้อมกันได้ ⛔ ไม่ไล่ทีละแถว
//   ⇒ ⛔ **ไม่ใช้ `requestAnimationFrame`** ⇒ แท็บที่ถูกซ่อนไว้ ⛔ ไม่เดินเฟรม ⇒ ใช้ `setTimeout` แทน
//
// ⭐ **จัดใหม่เองเมื่อ** ⇒ แถวฉบับแปลเปลี่ยนขนาด (จอ · ก+ ก− · ฟอนต์ไทยมาช้า) · แถวถูกต่อหรือทิ้ง ·
//   ฟอนต์มาครบ · สลับ *พอดี* กับ *ตามขนาดจริง* · เปิดปิดสัญลักษณ์กาล (ปุ่มคำสูงขึ้น)
//   ⇒ ⭐ ตอนจัดเสร็จ `.pk-ตัวบท` ได้ `data-จัดแถว="เสร็จ"` ⇒ ด่านรอสัญญาณนี้ ⛔ ไม่รอเป็นเวลาตายตัว (บทเรียนใบ #108)
//
// ⭐⭐ **ย่อเฉพาะคำที่กว้างเกินที่ของมัน** (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/125 ข้อ 11.13)
//   ⇒ ข้อ 11.9 เหลือขนาดจริงอย่างเดียว ⇒ จอ 320 ตัวอักษร 200% ⇒ คำยาวอย่าง παραπορεύεσθαι กว้าง 296 จุด ในที่ 267 จุด
//   ⇒ พี่เอมเลือกทาง ก 31 ต.ค. 2569 ⇒ **ย่อเฉพาะคำนั้นจนพอดีที่** ⇒ คำอื่นคงขนาดจริง ⇒ ⛔ ไม่มีปุ่ม
//   ⇒ ⛔ ไม่หักคำกลางคำ ⛔ ไม่ปล่อยคำล้นหรือเลื่อนในกล่อง ⇒ WCAG 2.2 SC 1.4.10 Reflow (ระดับ AA)
//   ⇒ ใช้ทุกความกว้างจอ ⇒ คำที่ ⛔ ไม่ล้น ⛔ ถูกแตะ ⇒ จอกว้างที่คอลัมน์พอ = ขนาดจริงทุกคำ
import '~/assets/css/แถวคำเดิม.css'

const props = defineProps<{ ขนาดคำ: string; ขนาดตัวอักษร?: number; ตัวเดิม?: boolean }>()
const emit = defineEmits<{ พร้อม: []; จัดแล้ว: [] }>()

let ราก: HTMLElement | null = null
let นัด: ReturnType<typeof setTimeout> | undefined
let ตัวเฝ้าขนาด: ResizeObserver | undefined
let ตัวเฝ้าลูก: MutationObserver | undefined
/** ⭐ ข้อ 11.13 ⇒ ความกว้างของตัวบทเปลี่ยน (หมุนจอ · ลากหน้าต่าง) ⇒ ที่ของคำเปลี่ยน ⇒ ย่อใหม่ ⇒ ⛔ นับแค่ความกว้าง */
let ตัวเฝ้ากว้าง: ResizeObserver | undefined
let กว้างที่เห็น = -1
const ที่เฝ้าอยู่ = new WeakSet<Element>()
/** ขนาดล่าสุดของแถวฉบับแปลที่เห็น ⇒ สั่งจัดใหม่เฉพาะตอนขนาดเปลี่ยนจริง */
const ขนาดที่เห็น = new WeakMap<Element, string>()
const ป้ายขนาด = (ก: { width: number; height: number }) => `${Math.round(ก.width)}x${Math.round(ก.height)}`

/** ⭐ แถวฉบับแปลเปลี่ยนขนาดจริง (จอ · ก+ ก− · ฟอนต์ไทยมาช้า) ⇒ จัดใหม่ ⇒ รายงานที่ขนาดเท่าเดิม ⛔ ไม่นับ */
function ตอนแถวเปลี่ยนขนาด(รายการ: ResizeObserverEntry[]) {
  let เปลี่ยน = false
  for (const ร of รายการ) {
    const ก = ร.borderBoxSize?.[0]
    const ป้าย = ก ? ป้ายขนาด({ width: ก.inlineSize, height: ก.blockSize }) : ป้ายขนาด(ร.target.getBoundingClientRect())
    if (ขนาดที่เห็น.get(ร.target) !== ป้าย) {
      ขนาดที่เห็น.set(ร.target, ป้าย)
      เปลี่ยน = true
    }
  }
  if (เปลี่ยน) นัดจัด()
}

/** เพดานจำนวนรอบ ⇒ ปกติจบใน 3 ถึง 5 รอบ ⇒ เพดานกันไว้เผื่อแถวที่ความสูงกระโดดเป็นขั้น */
const รอบสูงสุด = 16

function นัดจัด() {
  ราก?.setAttribute('data-จัดแถว', 'กำลังจัด')
  clearTimeout(นัด)
  นัด = setTimeout(จัด, 30)
}

/** ความสูงที่ก้อนคำเดิมแถวนี้ต้องใช้ ⇒ แถวสุดท้ายของก้อนรวมขอบล่างของก้อนด้วย (subgrid คิดขอบให้แถวริม) */
function ที่ใช้(ก: HTMLElement, เพิ่ม: number) {
  return ก.getBoundingClientRect().height + เพิ่ม
}

function ล้างขนาด() {
  for (const ก of ราก?.querySelectorAll<HTMLElement>('.pk-แถวคำ') ?? []) ก.style.removeProperty('--pk-ย่อ')
}

/** คำที่ตัวนี้ย่อไว้ ⇒ จัดรอบใหม่คืนขนาดจริงก่อนแล้ววัดใหม่ ⇒ ⛔ ไม่ค้างขนาดเก่าตอนจอกว้างขึ้น */
const คำที่ย่อ = new Set<HTMLElement>()

/** ที่ที่คำมีจริง ⇒ ความกว้างเนื้อในของกล่องบล็อกตัวแรกที่ห่อคำ (ปกติคือ `.pk-ข้อคำ` ⇒ แบบย่อหน้าจอกว้างคือ `.pk-แถวคำ`) */
function ที่ของคำ(คำ: HTMLElement, จำ: Map<Element, number>) {
  let e = คำ.parentElement
  while (e && getComputedStyle(e).display.startsWith('inline')) e = e.parentElement
  if (!e) return Infinity
  let ได้ = จำ.get(e)
  if (ได้ === undefined) {
    const ส = getComputedStyle(e)
    ได้ = e.clientWidth - parseFloat(ส.paddingLeft) - parseFloat(ส.paddingRight)
    จำ.set(e, ได้)
  }
  return ได้
}

/** ความกว้างที่คำกินในบรรทัด ⇒ รวมระยะข้างของปุ่มคำ */
function กว้างของคำ(คำ: HTMLElement) {
  const ส = getComputedStyle(คำ)
  return คำ.getBoundingClientRect().width + parseFloat(ส.marginLeft) + parseFloat(ส.marginRight)
}

/** พื้นตัวหนังสือของหน้าอ่าน (จุด) ⇒ ชุดเดียวกับ `max(12px, …)` ใน `main.css` · `สัญลักษณ์กาล.css` · `คำเน้น.css` */
const พื้นตัวหนังสือ = 12

/** คืนคำที่ตัวนี้ย่อไว้เป็นขนาดจริง ⇒ ทั้งขนาดและพื้นที่ย่อตาม */
function คืนขนาดจริง(คำ: HTMLElement) {
  คำ.style.removeProperty('font-size')
  คำ.style.removeProperty('--pk-พื้นเท่า')
}

/** ⭐ ข้อ 11.13 ⇒ ย่อเฉพาะคำที่กว้างเกินที่ ⇒ ตั้งทุกคำก่อน อ่านทุกคำทีเดียว ⇒ หน้าคำนวณผังรอบละครั้ง */
function ย่อคำที่ล้น() {
  if (!ราก) return
  for (const คำ of คำที่ย่อ) คืนขนาดจริง(คำ)
  คำที่ย่อ.clear()
  const จำ = new Map<Element, number>()
  let ค้าง: { คำ: HTMLElement; ได้: number; ขนาด: number; พื้นเท่า: number }[] = []
  for (const คำ of ราก.querySelectorAll<HTMLElement>('.pk-ชั้นคำ .pk-คำ')) {
    const กว้าง = กว้างของคำ(คำ)
    if (!กว้าง) continue
    const ได้ = ที่ของคำ(คำ, จำ)
    if (กว้าง > ได้) {
      // ⭐ พื้น 12 จุดเป็นกี่เท่าของขนาดจริงของคำ ⇒ ชิ้นข้างในย่อตามคำทั้งก้อน ⇒ ดู `--pk-พื้นคำย่อ` ใน `แถวคำเดิม.css`
      const ขนาดจริง = parseFloat(getComputedStyle(คำ).fontSize) || 16
      ค้าง.push({ คำ, ได้, ขนาด: 0.99 * (ได้ / กว้าง), พื้นเท่า: พื้นตัวหนังสือ / ขนาดจริง })
    }
  }
  // ⭐ ระยะข้างกับขอบเป็นจุดตายตัวบางส่วน ⇒ ย่อตามสัดส่วนรอบเดียวอาจยังเกินเศษจุด ⇒ วัดซ้ำจนพอ (ปกติ 1 ถึง 2 รอบ)
  for (let รอบ = 0; รอบ < 6 && ค้าง.length; รอบ++) {
    for (const x of ค้าง) {
      x.คำ.style.setProperty('--pk-พื้นเท่า', String(x.พื้นเท่า))
      x.คำ.style.fontSize = `${x.ขนาด}em`
      คำที่ย่อ.add(x.คำ)
    }
    const ต่อ: typeof ค้าง = []
    for (const x of ค้าง) {
      const กว้าง = กว้างของคำ(x.คำ)
      if (กว้าง > x.ได้) ต่อ.push({ ...x, ขนาด: x.ขนาด * 0.99 * (x.ได้ / กว้าง) })
    }
    ค้าง = ต่อ
  }
}

function จัด() {
  if (!ราก) return
  ย่อคำที่ล้น()
  // ⭐ เฝ้าแถวฉบับแปลที่เพิ่งเกิด ⇒ มันสูงขึ้นหรือเตี้ยลงเมื่อไร ต้องย่อใหม่
  const แถวแปล = new Map<string, HTMLElement>()
  for (const e of ราก.querySelectorAll<HTMLElement>('[data-แถว]:not(.pk-แถวคำ)')) {
    แถวแปล.set(e.dataset.แถว!, e)
    if (ตัวเฝ้าขนาด && !ที่เฝ้าอยู่.has(e)) {
      // ⭐ จำขนาดตอนเริ่มเฝ้า ⇒ รายงานครั้งแรกของตัวเฝ้า (ขนาดเท่าเดิม) ⛔ ไม่สั่งจัดซ้ำเปล่า ๆ
      ขนาดที่เห็น.set(e, ป้ายขนาด(e.getBoundingClientRect()))
      ตัวเฝ้าขนาด.observe(e, { box: 'border-box' })
      ที่เฝ้าอยู่.add(e)
    }
  }
  // ⭐ ตารางแถวมีเฉพาะจอกว้าง ⇒ ถามจากกฎที่เบราว์เซอร์ใช้จริง ⛔ ไม่เทียบความกว้างจอเองซ้ำกับ CSS
  const ใช้พอดี = props.ขนาดคำ === 'พอดี' && getComputedStyle(ราก).gridTemplateColumns !== 'none'
  if (!ใช้พอดี) {
    ล้างขนาด()
    เสร็จ()
    return
  }

  interface แถวที่ย่อ {
    คำ: HTMLElement
    แปล: HTMLElement
    เพิ่ม: number
    ได้: number
    ล่าง: number
    บน: number
    ขนาด: number
  }
  const ทั้งหมด: แถวที่ย่อ[] = []
  for (const กล่อง of ราก.querySelectorAll<HTMLElement>('.pk-ชั้นคำ .pk-กล่องคำ')) {
    const ก้อน = กล่อง.closest<HTMLElement>('.pk-ชั้นคำ')!
    // ⭐ ขอบล่างของก้อนกับกล่อง ⇒ subgrid เอาไปบวกให้ของที่อยู่แถวริมล่าง ⇒ ต้องนับให้แถวสุดท้าย
    const ส = getComputedStyle(ก้อน)
    const ก = getComputedStyle(กล่อง)
    const ขอบล่าง =
      parseFloat(ส.paddingBottom) + parseFloat(ส.borderBottomWidth) + parseFloat(ก.paddingBottom) + parseFloat(ก.borderBottomWidth)
    const แถวท้าย = ก้อน.style.gridRow ? Number(กล่อง.style.gridRow.split('span')[1]) - 1 : -1
    for (const คำ of กล่อง.querySelectorAll<HTMLElement>(':scope > .pk-แถวคำ')) {
      const แปล = แถวแปล.get(คำ.dataset.แถว ?? '')
      if (!แปล) continue
      const r = Number((คำ.dataset.แถว ?? '').split(':')[1])
      ทั้งหมด.push({ คำ, แปล, เพิ่ม: r === แถวท้าย ? ขอบล่าง : 0, ได้: 0, ล่าง: 0, บน: 1, ขนาด: 1 })
    }
  }

  // รอบแรก ⇒ ขนาดเต็มทุกแถว ⇒ แถวที่พอดีอยู่แล้วจบที่นี่ (ข้อ 11.4 ⇒ ⛔ ไม่ขยาย)
  for (const x of ทั้งหมด) x.คำ.style.removeProperty('--pk-ย่อ')
  let ค้าง: แถวที่ย่อ[] = []
  const ต้องย่อ: แถวที่ย่อ[] = []
  for (const x of ทั้งหมด) {
    x.ได้ = x.แปล.getBoundingClientRect().height
    const ใช้ = ที่ใช้(x.คำ, x.เพิ่ม)
    if (ใช้ <= x.ได้ + 0.5) continue
    ต้องย่อ.push(x)
    // ⭐ เดาครั้งแรก ⇒ ย่อ s เท่า ⇒ ทั้งกว้างและสูงของคำหดตาม ⇒ ความสูงรวมหดราว s² ⇒ เดาที่ √(ได้/ใช้)
    x.ขนาด = Math.min(0.99, 0.98 * Math.sqrt(x.ได้ / ใช้))
    ค้าง.push(x)
  }
  // ⭐ ทุกรอบ ⇒ ตั้งขนาดทุกแถวที่ค้าง → อ่านความสูงทุกแถวครั้งเดียว ⇒ หน้าคำนวณผังใหม่รอบละครั้ง ⛔ ไม่ใช่แถวละครั้ง
  //   ⇒ เดาขนาดถัดไปจากความสูงที่วัดได้ (√ ของอัตราส่วน) ⇒ เดาพลาดหรือไม่ขยับ ⇒ แบ่งครึ่งช่วงแทน
  //   ⇒ จบเมื่อขนาดที่พอดีกับขนาดที่ล้นห่างกันไม่เกิน 2% ⇒ ด่านลองขยาย 2% แล้วต้องล้น ⇒ ⛔ ไม่ย่อเกินจำเป็น
  for (let รอบ = 0; รอบ < รอบสูงสุด && ค้าง.length; รอบ++) {
    for (const x of ค้าง) x.คำ.style.setProperty('--pk-ย่อ', String(x.ขนาด))
    for (const x of ค้าง) {
      const ใช้ = ที่ใช้(x.คำ, x.เพิ่ม)
      if (ใช้ <= x.ได้ + 0.5) x.ล่าง = x.ขนาด
      else x.บน = x.ขนาด
      let ต่อ = x.ขนาด * Math.sqrt(x.ได้ / ใช้) * (ใช้ > x.ได้ ? 0.98 : 1)
      if (!(ต่อ > x.ล่าง * 1.005 && ต่อ < x.บน * 0.995)) ต่อ = x.ล่าง > 0 ? (x.ล่าง + x.บน) / 2 : x.บน / 2
      x.ขนาด = ต่อ
    }
    ค้าง = ค้าง.filter((x) => x.ล่าง === 0 || x.บน / x.ล่าง > 1.02)
  }
  // ⭐ ใช้ขนาดใหญ่สุดที่ลองแล้วพอดีจริง ⇒ ⛔ ไม่ใช้ค่ากลางที่ยังไม่ได้ลอง
  //   ⛔ ไม่เคยพอดีเลยสักขนาด (ไม่ควรเกิด) ⇒ ใช้ตัวเล็กสุดที่ลอง ⇒ ⛔ ไม่ยอมให้เป็น 0 ⇒ คำห้ามหายจากตา (ข้อ 12)
  for (const x of ต้องย่อ) x.คำ.style.setProperty('--pk-ย่อ', String(x.ล่าง > 0 ? x.ล่าง : x.บน))
  เสร็จ()
}

/** ⭐ จัดเสร็จ ⇒ บอกหน้าอ่าน ⇒ หน้าอ่านยึดที่ที่ผู้อ่านอ่านค้างไว้กลับคืน (แถวข้างบนสูงขึ้นหรือเตี้ยลงได้) ⇒ แล้วค่อยติดป้ายให้ด่าน */
function เสร็จ() {
  emit('จัดแล้ว')
  ราก?.setAttribute('data-จัดแถว', 'เสร็จ')
}

onMounted(() => {
  ราก = document.querySelector<HTMLElement>('.pk-ตัวบท')
  if (typeof ResizeObserver !== 'undefined') {
    ตัวเฝ้าขนาด = new ResizeObserver(ตอนแถวเปลี่ยนขนาด)
    ตัวเฝ้ากว้าง = new ResizeObserver((ร) => {
      const ก = Math.round(ร[0]!.contentRect.width)
      if (ก === กว้างที่เห็น) return
      กว้างที่เห็น = ก
      นัดจัด()
    })
    if (ราก) ตัวเฝ้ากว้าง.observe(ราก)
  }
  if (ราก && typeof MutationObserver !== 'undefined') {
    // ⭐ เฝ้าแค่ลูกที่เกิดหรือหาย ⇒ ⛔ ไม่เฝ้า `style` ⇒ ขนาดที่ตัวนี้ตั้งเอง ⛔ ไม่วนกลับมาสั่งจัดซ้ำ
    ตัวเฝ้าลูก = new MutationObserver(นัดจัด)
    ตัวเฝ้าลูก.observe(ราก, { childList: true, subtree: true })
  }
  document.fonts?.addEventListener?.('loadingdone', นัดจัด)
  emit('พร้อม')
  นัดจัด()
})

watch(() => props.ขนาดคำ, นัดจัด)
// ⭐ ก+ ก− ⇒ คำกว้างขึ้นทั้งที่ช่องกว้างเท่าเดิม ⇒ ต้องดูใหม่ว่าคำไหนเกินที่ (ข้อ 11.13)
watch(() => props.ขนาดตัวอักษร, นัดจัด)
// ⭐ ซ่อนหรือแสดงตัวกรีก/ฮีบรู (`แสดงตัวเดิม` ใน `app/utils/มุมมอง.ts`) ⇒ ปุ่มคำแคบลงและเตี้ยลงหรือกลับมา ⇒ ดูใหม่ว่าคำไหนเกินที่
watch(() => props.ตัวเดิม, นัดจัด)

onBeforeUnmount(() => {
  clearTimeout(นัด)
  ตัวเฝ้าขนาด?.disconnect()
  ตัวเฝ้ากว้าง?.disconnect()
  ตัวเฝ้าลูก?.disconnect()
  document.fonts?.removeEventListener?.('loadingdone', นัดจัด)
  ล้างขนาด()
  for (const คำ of คำที่ย่อ) คืนขนาดจริง(คำ)
  คำที่ย่อ.clear()
  ราก?.removeAttribute('data-จัดแถว')
})
</script>

<!-- ⛔ ไม่วาดอะไร ⇒ ดูหัวไฟล์ ⇒ ⛔ ไม่มีกล่องเปล่าไปแทรกในคอลัมน์อ่าน -->
<template></template>
