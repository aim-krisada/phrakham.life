// ด่านตรวจ — **จอแคบกว่า 768 ⇒ วางคอลัมน์ได้ 3 แบบ ⇒ ซ้ายขวา (ค่าตั้งต้น) · บนล่าง · ทีละฉบับ**
//   (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/131#note_30367 · คู่ทีละข้อ #note_30310 ข้อ 3)
//
// **นี่คือด่าน ⛔ ไม่ใช่รายงาน** — ล้มแล้วคืนรหัสไม่เป็นศูนย์ ⇒ ท่อ CI แดง
//
// > พี่เอม 3 พ.ย. 2569 ⇒ *"การที่ดูบนล่างมันดูยากกว่าซ้ายขวา ผมอยากจะตัดออกไปด้วยซ้ำ
// >   ถ้าไม่ตัดออกก็ต้องมีให้เลือกว่าแล้วแต่คนแต่ละคนชอบแบบไหน"*
// > และ ⇒ *"ผมไม่สามารถดู 2 เวอร์ชั่นคนละเล่มคนละบทคนละข้อได้"* (note_30365 ข้อ 1.2)
//
// **ด่านนี้ตรวจ 11 ข้อ ⇒ วัดของจริงบนหน้าที่สร้างเสร็จ ⛔ ไม่ได้ดูว่าโค้ดเขียนอะไรไว้**
//   ① **ค่าตั้งต้นจอแคบ = ซ้ายขวา** ⇒ เครื่องที่ไม่เคยตั้งอะไร จอ 375 ตัวอักษร 100% TCV กับ THKJV ⇒ 2 ฉบับแถวเดียวกัน ⇒ ปุ่มกลม *ซ้ายขวา* ติ๊กอยู่
//   ② **3 ตัวเลือกในกลุ่มเดียว ในเมนู *เทียบ*** ⇒ ชื่อตรงถ้อยคำ · อยู่ใน `fieldset` ที่มี `legend` ⇒ เลือกแล้วหน้าเปลี่ยนจริงทุกตัว
//      ⇒ จำค่าข้ามการเปิดหน้าใหม่ ⇒ จอ 1280 ⛔ ไม่มีตัวเลือกนี้
//   ③ **ซ้ายขวาแคบจนคำขาด ⇒ เว็บวางบนล่างเอง ⇒ ตัวหนังสือบอกเหตุผล ⇒ กด ก− จนพอ ⇒ กลับเป็นซ้ายขวาเอง** (note_30367 ข้อ 4)
//      ⇒ จอ 320 ตัวอักษร 100% ⇒ บนล่าง · ปุ่มกลมซ้ายขวายังติ๊ก · เหตุผลตาเห็นและผูกกับปุ่มซ้ายขวา (`aria-describedby`)
//      ⇒ กด ก− (85%) ⇒ ซ้ายขวา · เหตุผลหาย ⇒ กด ก+ กลับ ⇒ บนล่างอีกครั้ง ⇒ ค่าที่จำไว้ยังเป็นซ้ายขวาตลอด
//   ④ 🔴 **ซ้ายขวาที่หน้าเลือกใช้ ⛔ มีคำขาดกลางคำ** ⇒ จอ 320 · 375 · 412 · 707 × ตัวอักษร 85% · 100% · 200%
//      ⇒ ฉบับเดียวกันบทเดียวกัน (TCV กับ WEB มัทธิว 1 ⇒ ชื่อยาวอย่าง Jehoshaphat) และคนละเล่มคนละบท (มาระโก 1 กับ WEB มัทธิว 1)
//      ⇒ ⛔ ทุกชุด ⛔ เลื่อนซ้ายขวา และ ⛔ มีช่องยื่นพ้นกล่อง (WCAG 2.2 SC 1.4.10)
//   ⑤ **ซ้ายขวา + คอลัมน์คนละเล่มคนละบท ⇒ วางข้างกัน** ⇒ ⛔ ไปต่อท้ายใต้คอลัมน์แรก ⇒ หัวทั้งสองอยู่ระดับเดียวกัน
//   ⑥ **บนล่าง + คอลัมน์คนละเล่มคนละบท ⇒ คู่ทีละข้อ** ⇒ มาระโก 9:1 ⇒ มัทธิว 17:1 ⇒ 9:2 ⇒ 17:2 ตามลำดับในหน้า
//      ⇒ บทไหนหมดก่อน อีกบทเดินต่อคนเดียวจนจบ (ทั้ง 2 ทาง) ⇒ ทุกข้อมีป้ายที่ตาเห็นบอกเล่มและบท
//   ⑦ **ทีละฉบับ ⇒ เห็นคอลัมน์เดียว ⇒ เลือกอ่านคอลัมน์คนละเล่มคนละบทได้** ⇒ ฝั่งตารางซ่อน ⇒ เลือกกลับได้
//   ⑧ **หัวคอลัมน์ติดด้านบนยังทำงานในบนล่าง** ⇒ กลางบท ⇒ หัวทุกคอลัมน์ติดใต้แถบบน แถวเดียว ⇒ ⛔ เกินเพดาน 158.6 จุด
//      ⇒ ⚠️ ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/150 (พี่เอมอนุมัติ 7 พ.ย. 2569) ⇒ *แถวเดียว* เฉพาะตอนพอแถวเดียว
//        ⇒ ไม่พอ ⇒ ขึ้นแถวใหม่ได้ ⇒ ทุกปุ่มอยู่ในจอ กดได้ แถบ ⛔ ปัดข้าง ⇒ ฝาแฝด *หัวห่อทั้งที่พอแถวเดียว* ต้องแดง
//   ⑨ **44 จุด** ⇒ แถวของปุ่มกลมในกลุ่มสูงไม่ต่ำกว่า 44 จุด (SC 2.5.8)
//   ⑩ **ป้ายของบนล่าง ⛔ อยู่ในตัวหนังสือของข้อ** ⇒ ตัวบทของช่องเท่าเดิมทุกตัวอักษรทั้งซ้ายขวาและบนล่าง
//   ⑪ **ค่าที่เคยเก็บ** ⇒ *ทีละฉบับ* ของช่องเดิม (`วางจอแคบ`) ⛔ ติดมา ⇒ ได้ซ้ายขวา · *ขนานกัน* ของเดิม ⇒ ซ้ายขวา
//
// **วิธีพิสูจน์ว่าด่านนี้แดงได้จริง** ⛔ อย่าเชื่อว่ามันเฝ้าอยู่
//
//   node tools/ด่านวางคอลัมน์จอแคบ.mjs <ที่อยู่เว็บ> --ทดสอบตัวเอง
//
//   ⇒ ยัดของพังทีละชิ้น (รายชื่ออยู่ที่ `ของพัง`) ⇒ แต่ละชิ้นต้องทำให้ข้อของมันแดง
//
// ⛔ **ไม่รอเป็นเวลาตายตัว** ⇒ ทุกการรอคือรอสภาพของหน้า ⇒ `รอหน้านิ่ง` ตัวกลางของ `tools/หน้าที่ตรวจ.mjs` · รอ 2 เฟรม
//
//   node tools/ด่านวางคอลัมน์จอแคบ.mjs <ที่อยู่เว็บ>

import { chromium } from 'playwright'
import {
  เส้นทางเว็บ,
  รอหน้านิ่ง,
  ปุ่มเทียบของหน้า,
  ปุ่มขนาดตัวอักษร,
  พับแผงAa,
  ชื่อการวาง,
  หัวกลุ่มการวาง,
  เหตุวางบนล่างเอง,
  ตั้งการวางจอแคบ,
  อ่านแถบหัว,
  ผิดเกณฑ์แถวหัว,
} from './หน้าที่ตรวจ.mjs'

const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
const ทดสอบตัวเอง = process.argv.includes('--ทดสอบตัวเอง')

/** ⭐ เพดานเดียวกับ `tools/ด่านหัวคอลัมน์.mjs` ข้อ ⑤ ⇒ ⛔ ไม่ใช่เลขของด่านนี้ ⇒ ⛔ ห้ามผ่อน */
const เพดานแถบบนจอแคบ = 158.6
const สูงจอ = (กว้าง) => (กว้าง === 707 ? 724 : 812)
/** มาระโก 9 คู่มัทธิว 17 ⇒ ตัวอย่างของพี่เอมเอง (note_30310 ข้อ 3.1) ⇒ มาระโก 9 มี 50 ข้อ · มัทธิว 17 มี 27 ข้อ */
const คนละบท = '/read/MRK?c=9&p=MAT.17.WEB'
const คนละบทกลับข้าง = '/read/MAT?c=17&p=MRK.9.WEB'

/**
 * ⭐⭐ **ของพัง** ⇒ ⛔ ไม่แตะโค้ดของเว็บ ⇒ `css` ยัดตอนหน้าพร้อม · `ก่อนเปิด` วิ่งก่อนสคริปต์ของหน้า · `บนหน้า` แก้ DOM ตอนหน้าพร้อม
 */
const ของพัง = {
  // ค่าตั้งต้นเดิมของใบ #97 ⇒ ทีละฉบับ ⇒ เห็นฉบับเดียว
  ค่าตั้งต้นทีละฉบับ: {
    ข้อ: '①',
    css: '.pk-ซ้ายขวาจอแคบ .pk-ตัวบท .pk-ช่องฉบับ:not(:first-child) { display: none !important; }',
  },
  // กลุ่มเหลือ 2 ทางแบบเดิม ⇒ ไม่มีบนล่าง
  ไม่มีตัวเลือกบนล่าง: {
    ข้อ: '②',
    บนหน้า: () => {
      const ซ่อน = () =>
        document.querySelectorAll('input[name="วางคอลัมน์"][value="บนล่าง"]').forEach((x) => x.closest('label')?.remove())
      ซ่อน()
      new MutationObserver(ซ่อน).observe(document.body, { subtree: true, childList: true })
    },
  },
  // ของเดิม ⇒ ซ้ายขวาไม่ยอมตกเป็นบนล่าง ⇒ บีบคอลัมน์ต่อจนคำขาด
  ซ้ายขวาไม่ตกเป็นบนล่าง: {
    ข้อ: '③ ④',
    css: `.pk-บนล่างจอแคบ .pk-ตัวบท .pk-ช่องทั้งหมด.pk-คอลัมน์-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
      .pk-บนล่างจอแคบ [data-ป้ายบนล่าง]::before { content: none !important; }`,
  },
  ไม่บอกเหตุผล: { ข้อ: '③', css: '#pk-เหตุวางบนล่าง { display: none !important; }' },
  // หน้าไม่ฟังขนาดตัวอักษร ⇒ ไม้บรรทัดไม่ถูกวัดใหม่ ⇒ กด ก− แล้วไม่กลับเป็นซ้ายขวา
  ก้ลบไม่คืนซ้ายขวา: {
    ข้อ: '③',
    ก่อนเปิด: () => {
      window.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
      }
    },
  },
  // ปัญหาที่พี่เอมเจอ ⇒ คอลัมน์คนละบทไปต่อท้ายใต้คอลัมน์แรก (note_30365 ข้อ 2.2)
  คนละบทไปต่อท้าย: {
    ข้อ: '⑤',
    css: `.pk-ซ้ายขวาจอแคบ .pk-พื้นที่อ่าน.pk-มีตอนเทียบ { flex-wrap: wrap !important; }
      .pk-ซ้ายขวาจอแคบ .pk-มีตอนเทียบ > * { flex-basis: 100% !important; }`,
  },
  // บนล่างแต่ไม่คู่ ⇒ ข้อของคอลัมน์คนละบทไม่โผล่ต่อท้ายข้อของคอลัมน์แรก
  บนล่างไม่คู่: { ข้อ: '⑥', css: '.pk-ข้อคู่ { display: none !important; }' },
  ป้ายบนล่างหาย: { ข้อ: '⑥', css: '[data-ป้ายบนล่าง]::before { content: none !important; }' },
  // ของเดิม ⇒ ทีละฉบับเลือกได้แค่ฉบับในตาราง ⇒ คอลัมน์คนละบทยังโผล่ใต้คอลัมน์แรก
  ทีละฉบับไม่รวมคนละบท: { ข้อ: '⑦', css: '.pk-ทีละฉบับจอแคบ .pk-ตอนเทียบ { display: block !important; }' },
  หัวไม่ติดด้านบน: {
    ข้อ: '⑧',
    css: '@media (max-width: 767px) { .pk-หัวคอลัมน์ { position: static !important; } }',
  },
  // ⭐ ใบ #150 ⇒ หัวขึ้นแถวใหม่ได้เฉพาะตอนไม่พอแถวเดียว ⇒ ยัดหัวละแถวทั้งที่พอ ⇒ จอ 375 ตัวอักษร 100% TCV กับ WEB พอแถวเดียว ⇒ ข้อ ⑧ ต้องแดง
  หัวห่อทั้งที่พอแถวเดียว: {
    ข้อ: '⑧',
    css: `@media (max-width: 767px) {
      .pk-บนล่างจอแคบ .pk-หัวคอลัมน์ > .pk-ช่องทั้งหมด { flex-wrap: wrap !important; }
      .pk-บนล่างจอแคบ .pk-หัวคอลัมน์ > .pk-ช่องทั้งหมด > .pk-หัวช่อง { flex-basis: 100% !important; max-width: none !important; }
    }`,
  },
  ปุ่มกลมเล็ก: {
    ข้อ: '⑨',
    css: '[data-กลุ่ม="วางคอลัมน์"] .pk-ช่องติ๊ก { min-height: 20px !important; height: 20px !important; }',
  },
  // ป้ายเป็นตัวหนังสือจริงในข้อ ⇒ คัดลอกข้อแล้วติดป้าย ⇒ ตัวบทไม่ครบเท่าเดิม
  ป้ายอยู่ในตัวหนังสือ: {
    ข้อ: '⑩',
    บนหน้า: () => {
      const ใส่ = () =>
        document.querySelectorAll('.pk-บนล่างจอแคบ .pk-ช่องฉบับ[data-ป้ายบนล่าง]').forEach((c) => {
          if (c.querySelector('.ป้ายพัง')) return
          const s = document.createElement('span')
          s.className = 'ป้ายพัง'
          s.textContent = c.getAttribute('data-ป้ายบนล่าง') + ' '
          c.prepend(s)
        })
      ใส่()
      new MutationObserver(ใส่).observe(document.body, { subtree: true, childList: true, attributes: true })
    },
  },
  // หน้าอ่านช่องเดิมต่อ ⇒ คนที่เคยได้ทีละฉบับเป็นค่าตั้งต้นติดทีละฉบับต่อไป
  ค่าเดิมทีละฉบับติดมา: {
    ข้อ: '⑪',
    ก่อนเปิด: () => {
      const เดิม = Storage.prototype.getItem
      Storage.prototype.getItem = function (k) {
        const v = เดิม.call(this, k)
        if (k !== 'phrakham.view' || !v) return v
        try {
          const o = JSON.parse(v)
          if (o.วางจอแคบ === 'ทีละฉบับ' && !o.วางคอลัมน์) o.วางคอลัมน์ = 'ทีละฉบับ'
          return JSON.stringify(o)
        } catch {
          return v
        }
      }
    },
  },
}

const เบราว์เซอร์ = await chromium.launch()
const สองเฟรม = (แท็บ) => แท็บ.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))

/** เปิดหน้าใหม่ในเครื่องใหม่ ⇒ ตั้งฉบับ ขนาดตัวอักษร และมุมมองไว้ก่อนหน้าจะรัน ⇒ `มุม` = null ⇒ ⛔ ไม่ตั้ง (เครื่องที่ไม่เคยตั้งอะไร) */
async function เปิด({ กว้าง, fs = 1, ที่อยู่ = '/read/MAT?c=1', ฉ = ['TCV', 'THKJV'], มุม = null, พัง = null }) {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: สูงจอ(กว้าง) } })
  await ctx.addInitScript(
    ([ฉ, ข, มุม]) => {
      try {
        if (!sessionStorage.getItem('pk-ด่านวางคอลัมน์')) {
          localStorage.setItem('phrakham.versions', JSON.stringify(ฉ))
          localStorage.setItem('pk-fs', String(ข))
          if (มุม) localStorage.setItem('phrakham.view', JSON.stringify(มุม))
          sessionStorage.setItem('pk-ด่านวางคอลัมน์', '1')
        }
      } catch {}
    },
    [ฉ, fs, มุม],
  )
  if (พัง?.ก่อนเปิด) await ctx.addInitScript(พัง.ก่อนเปิด)
  const แท็บ = await ctx.newPage()
  await แท็บ.goto(`${ฐาน}${ที่อยู่}`, { waitUntil: 'domcontentloaded' })
  await แท็บ.waitForSelector('.pk-หัวคอลัมน์ .pk-หัวช่อง', { timeout: 30000 })
  await แท็บ.waitForFunction(() => document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
  await รอหน้านิ่ง(แท็บ)
  if (พัง?.css) await แท็บ.addStyleTag({ content: พัง.css })
  if (พัง?.บนหน้า) await แท็บ.evaluate(พัง.บนหน้า)
  await สองเฟรม(แท็บ)
  return { ctx, แท็บ }
}

/** สภาพของหน้า ⇒ แบบที่หน้าใช้ · ช่องต่อแถวของข้อแรก · ตำแหน่งฝั่งหลักกับคอลัมน์คนละบท */
const สภาพ = (แท็บ) =>
  แท็บ.evaluate(() => {
    const คอ = document.querySelector('.pk-คอลัมน์')
    const แบบ = คอ?.classList.contains('pk-ซ้ายขวาจอแคบ')
      ? 'ซ้ายขวา'
      : คอ?.classList.contains('pk-บนล่างจอแคบ')
        ? 'บนล่าง'
        : คอ?.classList.contains('pk-ทีละฉบับจอแคบ')
          ? 'ทีละฉบับ'
          : ''
    const ข้อ = [...document.querySelectorAll('.pk-ตัวบท .pk-ข้อ')].find((x) => x.offsetParent)
    const ช่อง = [...(ข้อ?.querySelectorAll('.pk-ช่องฉบับ') ?? [])].filter((c) => c.offsetParent)
    const บน = new Map()
    for (const c of ช่อง) {
      const t = Math.round(c.getBoundingClientRect().top)
      บน.set(t, (บน.get(t) || 0) + 1)
    }
    const กล่อง = (s) => {
      const e = [...document.querySelectorAll(s)].find((x) => x.offsetParent)
      if (!e) return null
      const r = e.getBoundingClientRect()
      return { ซ้าย: r.left, ขวา: r.right, บน: r.top + scrollY }
    }
    const ติ๊ก = document.querySelector('input[name="วางคอลัมน์"]:checked')?.value || ''
    let เก็บ = ''
    try {
      เก็บ = JSON.parse(localStorage.getItem('phrakham.view') || '{}').วางคอลัมน์ || ''
    } catch {}
    return {
      แบบ,
      ช่องเห็น: ช่อง.length,
      ต่อแถว: บน.size ? Math.max(...บน.values()) : 0,
      เนื้อ: ช่อง.map((c) => c.textContent),
      หลัก: กล่อง('.pk-ฝั่งหลัก'),
      เทียบ: กล่อง('.pk-ตอนเทียบ'),
      หัวเทียบ: กล่อง('.pk-ตอนเทียบ .pk-หัวช่อง'),
      หัวหลัก: กล่อง('.pk-หัวคอลัมน์ .pk-หัวช่อง'),
      ติ๊ก,
      เก็บ,
    }
  })

/** นับคำที่ขาดกลางคำในช่องตัวบทที่ตาเห็น ⇒ ขอบคำจาก `Intl.Segmenter` ⇒ คำเดียวกินกรอบมากกว่า 1 บรรทัด = ขาด (วิธีเดียวกับ !161) */
const นับคำขาด = (แท็บ) =>
  แท็บ.evaluate(() => {
    const seg = { en: new Intl.Segmenter('en', { granularity: 'word' }), th: new Intl.Segmenter('th', { granularity: 'word' }) }
    let ขาด = 0
    const ตัวอย่าง = []
    const ช่อง = [...document.querySelectorAll('.pk-ตัวบท .pk-ช่องฉบับ, .pk-ข้อตอนเทียบ, .pk-ไหลตอนเทียบ')].filter(
      (c) => c.offsetParent,
    )
    for (const c of ช่อง) {
      const ภาษา = (c.getAttribute('lang') || 'th').startsWith('en') ? 'en' : 'th'
      const w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT)
      let n
      while ((n = w.nextNode())) {
        if (n.parentElement.closest('.pk-เฉพาะเสียง, .pk-เลขข้อ')) continue
        for (const s of seg[ภาษา].segment(n.textContent)) {
          if (!s.isWordLike || s.segment.length < 2) continue
          const r = document.createRange()
          r.setStart(n, s.index)
          r.setEnd(n, s.index + s.segment.length)
          const แถว = new Set([...r.getClientRects()].filter((x) => x.width > 0).map((x) => Math.round(x.top)))
          if (แถว.size > 1) {
            ขาด++
            if (ตัวอย่าง.length < 3) ตัวอย่าง.push(s.segment)
          }
        }
      }
    }
    return { ขาด, ตัวอย่าง }
  })

/** ⭐ ลองเลื่อนทั้งหน้าจริง ⇒ ⛔ ไม่ตัดสินด้วย `scrollWidth` (บทเรียนใบ #96) ⇒ และดูช่องที่ยื่นพ้นกล่องของมัน */
const ล้นข้าง = (แท็บ) =>
  แท็บ.evaluate(() => {
    const ราก = document.scrollingElement
    const เดิม = ราก.scrollLeft
    ราก.scrollLeft = 9999
    const เลื่อน = ราก.scrollLeft !== เดิม
    ราก.scrollLeft = เดิม
    let พ้น = 0
    for (const กล่อง of document.querySelectorAll('.pk-ตัวบท .pk-ข้อ .pk-ช่องทั้งหมด')) {
      const ก = กล่อง.getBoundingClientRect()
      for (const c of กล่อง.children) {
        if (!c.offsetParent) continue
        const b = c.getBoundingClientRect()
        if (b.right > ก.right + 1 || b.left < ก.left - 1) พ้น++
      }
    }
    return { เลื่อน, พ้น }
  })

async function กดขนาด(แท็บ, ทาง) {
  const ก่อน = await แท็บ.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--pk-fs'))
  const ปุ่ม = await ปุ่มขนาดตัวอักษร(แท็บ, ทาง)
  await ปุ่ม.click()
  await แท็บ.waitForFunction(
    (ก่อน) => getComputedStyle(document.documentElement).getPropertyValue('--pk-fs') !== ก่อน,
    ก่อน,
    { timeout: 10000 },
  )
  await พับแผงAa(แท็บ)
  await สองเฟรม(แท็บ)
  await สองเฟรม(แท็บ)
}

async function กางเมนู(แท็บ) {
  await ปุ่มเทียบของหน้า(แท็บ).click()
  await แท็บ.waitForSelector('.pk-เมนู')
}

async function ตรวจ(พัง = null) {
  const ตก = []
  const ลอง = async (ป้าย, งาน) => {
    try {
      await งาน()
    } catch (e) {
      ตก.push(`${ป้าย} ล้มระหว่างตรวจ ⇒ ${e.message.split('\n')[0]}`)
    }
  }

  // ---------------------------------------------------------------- ① ค่าตั้งต้น
  await ลอง('①', async () => {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 375, พัง })
    try {
      const ส = await สภาพ(แท็บ)
      if (ส.แบบ !== 'ซ้ายขวา' || ส.ต่อแถว !== 2)
        ตก.push(`① เครื่องที่ไม่เคยตั้งอะไร จอ 375 ⇒ ได้ ${ส.แบบ || 'ไม่มีแบบ'} เห็น ${ส.ต่อแถว} ฉบับต่อแถว ⛔ ต้องซ้ายขวา 2 ฉบับแถวเดียว`)
      await กางเมนู(แท็บ)
      const ติ๊ก = await แท็บ.evaluate(() => document.querySelector('input[name="วางคอลัมน์"]:checked')?.value || '')
      if (ติ๊ก !== 'ซ้ายขวา') ตก.push(`① ปุ่มกลมที่ติ๊กอยู่ ⇒ ${ติ๊ก || 'ไม่มี'} ⛔ ต้องเป็นซ้ายขวา`)
    } finally {
      await ctx.close()
    }
  })

  // ---------------------------------------------------------------- ② 3 ตัวเลือก กลุ่มเดียว ⇒ เปลี่ยนหน้าจริง ⇒ จำค่า ⇒ จอกว้างไม่มี
  await ลอง('②', async () => {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 375, ที่อยู่: คนละบท, ฉ: ['TCV'], พัง })
    try {
      await กางเมนู(แท็บ)
      const กลุ่ม = await แท็บ.evaluate(() => {
        const g = document.querySelector('fieldset[data-กลุ่ม="วางคอลัมน์"]')
        return {
          หัว: g?.querySelector('legend')?.textContent?.trim() || '',
          ชื่อ: [...(g?.querySelectorAll('input[type="radio"]') ?? [])].map((x) => x.closest('label').textContent.trim()),
        }
      })
      const ต้อง = Object.values(ชื่อการวาง)
      if (กลุ่ม.หัว !== หัวกลุ่มการวาง) ตก.push(`② หัวกลุ่ม ⇒ "${กลุ่ม.หัว}" ⛔ ต้องเป็น "${หัวกลุ่มการวาง}" ใน legend`)
      if (JSON.stringify(กลุ่ม.ชื่อ) !== JSON.stringify(ต้อง))
        ตก.push(`② ตัวเลือกในกลุ่ม ⇒ ${JSON.stringify(กลุ่ม.ชื่อ)} ⛔ ต้องเป็น ${JSON.stringify(ต้อง)}`)
      await ปุ่มเทียบของหน้า(แท็บ).click()
      const เห็น = {}
      for (const แบบ of ['บนล่าง', 'ทีละฉบับ', 'ซ้ายขวา']) {
        if (!กลุ่ม.ชื่อ.includes(ชื่อการวาง[แบบ])) continue
        await ตั้งการวางจอแคบ(แท็บ, แบบ)
        const ส = await สภาพ(แท็บ)
        เห็น[แบบ] = ส
        if (ส.แบบ !== แบบ) ตก.push(`② เลือก ${แบบ} แล้วหน้าใช้ ${ส.แบบ || 'ไม่มีแบบ'} ⛔ ต้องเปลี่ยนจริง`)
        if (ส.เก็บ !== แบบ) ตก.push(`② เลือก ${แบบ} แล้วเครื่องจำ ${ส.เก็บ || 'ไม่มี'} ⛔ ต้องจำค่าที่เลือก`)
      }
      // จำข้ามการเปิดหน้าใหม่
      await ตั้งการวางจอแคบ(แท็บ, 'บนล่าง')
      await แท็บ.reload({ waitUntil: 'domcontentloaded' })
      await แท็บ.waitForFunction(() => document.getElementById('__nuxt')?.__vue_app__, null, { timeout: 30000 })
      await รอหน้านิ่ง(แท็บ)
      if ((await สภาพ(แท็บ)).แบบ !== 'บนล่าง') ตก.push('② เปิดหน้าใหม่แล้วลืมว่าเลือกบนล่างไว้')
    } finally {
      await ctx.close()
    }
    const { ctx: ค2, แท็บ: ท2 } = await เปิด({ กว้าง: 1280, พัง })
    try {
      await กางเมนู(ท2)
      const มี = await ท2.locator('input[name="วางคอลัมน์"]').count()
      if (มี) ตก.push(`② จอ 1280 ยังมีตัวเลือกการวาง ${มี} ตัว ⛔ จอกว้างวางเคียงกันอยู่แล้ว ⇒ กดแล้วไม่เกิดอะไร`)
    } finally {
      await ค2.close()
    }
  })

  // ---------------------------------------------------------------- ③ วางบนล่างเอง ⇒ เหตุผล ⇒ ก− กลับซ้ายขวา
  await ลอง('③', async () => {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 320, ฉ: ['TCV', 'WEB'], พัง })
    try {
      const ก่อน = await สภาพ(แท็บ)
      if (ก่อน.แบบ !== 'บนล่าง' || ก่อน.ต่อแถว !== 1)
        ตก.push(`③ จอ 320 ตัวอักษร 100% เลือกซ้ายขวา ⇒ ได้ ${ก่อน.แบบ} ${ก่อน.ต่อแถว} ช่องต่อแถว ⛔ ต้องวางบนล่างเอง (ซ้ายขวาแคบกว่า 6em)`)
      await กางเมนู(แท็บ)
      const ม = await แท็บ.evaluate(() => {
        const ซ = document.querySelector('input[name="วางคอลัมน์"][value="ซ้ายขวา"]')
        const ห = document.getElementById('pk-เหตุวางบนล่าง')
        return {
          ติ๊ก: !!ซ?.checked,
          ผูก: (ซ?.getAttribute('aria-describedby') || '').split(' ').includes('pk-เหตุวางบนล่าง'),
          เหตุ: ห && ห.getClientRects().length && getComputedStyle(ห).display !== 'none' ? ห.textContent.trim() : '',
        }
      })
      if (!ม.ติ๊ก) ตก.push('③ เว็บวางบนล่างเองแล้วปุ่มกลมซ้ายขวาไม่ติ๊ก ⛔ ค่าที่ผู้อ่านเลือกต้องไม่ถูกเขียนทับ')
      if (ม.เหตุ !== เหตุวางบนล่างเอง) ตก.push(`③ ตัวหนังสือบอกเหตุผล ⇒ "${ม.เหตุ}" ⛔ ต้องเห็น "${เหตุวางบนล่างเอง}"`)
      if (!ม.ผูก) ตก.push('③ เหตุผลไม่ได้ผูกกับปุ่มกลมซ้ายขวา (aria-describedby) ⛔ โปรแกรมอ่านหน้าจอไม่ได้ยิน')
      await ปุ่มเทียบของหน้า(แท็บ).click()
      await กดขนาด(แท็บ, '-')
      const ลด = await สภาพ(แท็บ)
      if (ลด.แบบ !== 'ซ้ายขวา' || ลด.ต่อแถว !== 2)
        ตก.push(`③ กด ก− (85%) แล้วได้ ${ลด.แบบ} ${ลด.ต่อแถว} ช่องต่อแถว ⛔ ต้องกลับเป็นซ้ายขวาเอง`)
      await กางเมนู(แท็บ)
      if (await แท็บ.locator('#pk-เหตุวางบนล่าง').count()) ตก.push('③ กลับเป็นซ้ายขวาแล้วตัวหนังสือบอกเหตุผลยังค้าง')
      await ปุ่มเทียบของหน้า(แท็บ).click()
      await กดขนาด(แท็บ, '+')
      const เพิ่ม = await สภาพ(แท็บ)
      if (เพิ่ม.แบบ !== 'บนล่าง') ตก.push(`③ กด ก+ กลับ 100% แล้วได้ ${เพิ่ม.แบบ} ⛔ ต้องวางบนล่างเองอีกครั้ง`)
      if (เพิ่ม.เก็บ && เพิ่ม.เก็บ !== 'ซ้ายขวา') ตก.push(`③ เครื่องจำ ${เพิ่ม.เก็บ} ⛔ ค่าที่ผู้อ่านเลือก (ซ้ายขวา) ต้องไม่ถูกเขียนทับ`)
    } finally {
      await ctx.close()
    }
  })

  // ---------------------------------------------------------------- ④ ซ้ายขวาที่หน้าเลือก ⛔ คำขาด · ⛔ ล้นข้าง
  await ลอง('④', async () => {
    const ชุด = [
      { ป้าย: 'TCV กับ WEB มัทธิว 1', ที่อยู่: '/read/MAT?c=1', ฉ: ['TCV', 'WEB'] },
      { ป้าย: 'มาระโก 1 กับ WEB มัทธิว 1', ที่อยู่: '/read/MRK?c=1&p=MAT.1.WEB', ฉ: ['TCV'] },
    ]
    const กว้างที่วัด = พัง ? [320] : [320, 375, 412, 707]
    const ขนาดที่วัด = พัง ? [2] : [0.85, 1, 2]
    for (const ช of ชุด)
      for (const กว้าง of กว้างที่วัด)
        for (const fs of ขนาดที่วัด) {
          const { ctx, แท็บ } = await เปิด({ กว้าง, fs, ที่อยู่: ช.ที่อยู่, ฉ: ช.ฉ, พัง })
          try {
            const ส = await สภาพ(แท็บ)
            const ข = await นับคำขาด(แท็บ)
            const ล = await ล้นข้าง(แท็บ)
            const ที่ = `${ช.ป้าย} จอ ${กว้าง} ตัวอักษร ${Math.round(fs * 100)}% (${ส.แบบ})`
            if (ส.แบบ === 'ซ้ายขวา' && ข.ขาด) ตก.push(`④ ${ที่} ⇒ คำขาดกลางคำ ${ข.ขาด} คำ เช่น ${ข.ตัวอย่าง.join(', ')} ⛔ ต้องวางบนล่างเอง`)
            if (ส.แบบ === 'ซ้ายขวา' && ส.ต่อแถว === 1 && ช.ฉ.length > 1) ตก.push(`④ ${ที่} ⇒ ฉบับซ้อนกันทั้งที่หน้าบอกว่าซ้ายขวา`)
            if (ล.เลื่อน) ตก.push(`④ ${ที่} ⇒ ลากทั้งหน้าเลื่อนซ้ายขวาได้ ⛔ SC 1.4.10`)
            if (ล.พ้น) ตก.push(`④ ${ที่} ⇒ ช่องตัวบทยื่นพ้นกล่อง ${ล.พ้น} ช่อง ⛔ ตัวบทหายจากสายตา`)
          } finally {
            await ctx.close()
          }
        }
  })

  // ---------------------------------------------------------------- ⑤ ซ้ายขวา + คนละบท ⇒ ข้างกัน
  await ลอง('⑤', async () => {
    for (const กว้าง of [375, 707]) {
      const { ctx, แท็บ } = await เปิด({ กว้าง, ที่อยู่: คนละบท, ฉ: ['TCV'], พัง })
      try {
        const ส = await สภาพ(แท็บ)
        if (ส.แบบ !== 'ซ้ายขวา') ตก.push(`⑤ จอ ${กว้าง} มาระโก 9 กับมัทธิว 17 ⇒ ได้ ${ส.แบบ} ⛔ ต้องซ้ายขวา`)
        else if (!ส.เทียบ || !ส.หลัก) ตก.push(`⑤ จอ ${กว้าง} ⇒ ไม่เห็นคอลัมน์มัทธิว 17`)
        else {
          if (ส.เทียบ.ซ้าย < ส.หลัก.ขวา - 1 || Math.abs(ส.เทียบ.บน - ส.หลัก.บน) > 2)
            ตก.push(
              `⑤ จอ ${กว้าง} ⇒ คอลัมน์มัทธิว 17 เริ่มที่ ${Math.round(ส.เทียบ.บน)} จุด ซ้าย ${Math.round(ส.เทียบ.ซ้าย)} ⇒ ฝั่งหลักเริ่ม ${Math.round(ส.หลัก.บน)} ขวาสุด ${Math.round(ส.หลัก.ขวา)} ⛔ ต้องอยู่ข้างกัน ไม่ไปต่อท้ายใต้คอลัมน์แรก`,
            )
          if (!ส.หัวเทียบ || !ส.หัวหลัก || Math.abs(ส.หัวเทียบ.บน - ส.หัวหลัก.บน) > 2)
            ตก.push(`⑤ จอ ${กว้าง} ⇒ หัวของสองคอลัมน์ไม่อยู่ระดับเดียวกัน`)
        }
      } finally {
        await ctx.close()
      }
    }
  })

  // ---------------------------------------------------------------- ⑥ บนล่าง + คนละบท ⇒ คู่ทีละข้อ
  await ลอง('⑥', async () => {
    for (const [ที่อยู่, หลัก, เทียบ, บทหลัก, บทเทียบ] of [
      [คนละบท, 'มาระโก 9', 'มัทธิว 17', 'MRK/9', 'MAT/17'],
      [คนละบทกลับข้าง, 'มัทธิว 17', 'มาระโก 9', 'MAT/17', 'MRK/9'],
    ]) {
      const { ctx, แท็บ } = await เปิด({ กว้าง: 375, ที่อยู่, ฉ: ['TCV'], มุม: { วางคอลัมน์: 'บนล่าง' }, พัง })
      try {
        // ⭐ จำนวนข้อนับจากซองบทตัวจริง ⇒ ⛔ ไม่จดเลขลอย ⇒ TCV ไม่มีบางข้อ (มาระโก 9:44 · 9:46 · มัทธิว 17:21)
        const [จำนวนหลัก, จำนวนเทียบ] = await แท็บ.evaluate(
          async ([ฐาน, ก, ข]) => {
            const นับ = async (ท, ฉ) => Object.keys((await (await fetch(`${ฐาน}/api/chapter/${ท}.json`)).json()).ชั้น[ฉ] || {}).length
            return [await นับ(ก, 'TCV'), await นับ(ข, 'WEB')]
          },
          [ฐาน, บทหลัก, บทเทียบ],
        )
        const ม = await แท็บ.evaluate(
          ([หลัก, เทียบ]) => {
            const บทหลัก = document.querySelector('[data-หมุดบท]')?.getAttribute('data-หมุดบท')
            // ลำดับในหน้า ⇒ ข้อของคอลัมน์แรก (บทแรก) กับข้อคู่ ⇒ ที่ตาเห็น
            const ของ = [...document.querySelectorAll('.pk-ตัวบท .pk-ข้อ, .pk-ตัวบท .pk-ข้อคู่, .pk-ตัวบท [data-หมุดบท]')].filter(
              (x) => x.offsetParent,
            )
            const ลำดับ = []
            for (const x of ของ) {
              if (x.hasAttribute('data-หมุดบท')) {
                if (x.getAttribute('data-หมุดบท') !== บทหลัก) break
                continue
              }
              ลำดับ.push(x.classList.contains('pk-ข้อคู่') ? `ค${x.getAttribute('data-ข้อเทียบ')}` : `ห${x.getAttribute('data-ข้อ')}`)
            }
            const ป้าย = (x) => {
              const c = getComputedStyle(x, '::before').content
              return c && c !== 'none' && c !== 'normal' ? c : ''
            }
            const คู่ = [...document.querySelectorAll('.pk-ข้อคู่')].filter((x) => x.offsetParent)
            const หลักช่อง = [...document.querySelectorAll('.pk-ตัวบท .pk-ข้อ .pk-ช่องฉบับ')].filter((x) => x.offsetParent)
            return {
              ลำดับ: ลำดับ.slice(0, 6),
              นับหลัก: ลำดับ.filter((x) => x.startsWith('ห')).length,
              นับคู่: ลำดับ.filter((x) => x.startsWith('ค')).length,
              คู่ไม่มีป้าย: คู่.filter((x) => !ป้าย(x).includes(เทียบ)).length,
              หลักไม่มีป้าย: หลักช่อง.slice(0, 10).filter((x) => !ป้าย(x).includes(หลัก)).length,
              ท้าย: ลำดับ.slice(-2),
            }
          },
          [หลัก, เทียบ],
        )
        const ต้องต้น = ['ห', 'ค', 'ห', 'ค', 'ห', 'ค']
        if (ม.ลำดับ.length < 6 || ม.ลำดับ.some((x, i) => !x.startsWith(ต้องต้น[i])))
          ตก.push(`⑥ ${หลัก} คู่ ${เทียบ} บนล่าง ⇒ ลำดับต้นบท ${JSON.stringify(ม.ลำดับ)} ⛔ ต้องสลับข้อของคอลัมน์แรกกับข้อคู่ทีละข้อ`)
        if (ม.นับหลัก !== จำนวนหลัก || ม.นับคู่ !== จำนวนเทียบ)
          ตก.push(`⑥ ${หลัก} คู่ ${เทียบ} ⇒ เห็น ${ม.นับหลัก} กับ ${ม.นับคู่} ข้อก่อนบทถัดไป ⛔ ต้องครบ ${จำนวนหลัก} กับ ${จำนวนเทียบ} ⇒ บทที่ยาวกว่าเดินต่อจนจบ`)
        if (ม.คู่ไม่มีป้าย) ตก.push(`⑥ ${หลัก} คู่ ${เทียบ} ⇒ ข้อคู่ ${ม.คู่ไม่มีป้าย} ข้อไม่มีป้ายที่ตาเห็นว่าเป็นของ ${เทียบ}`)
        if (ม.หลักไม่มีป้าย) ตก.push(`⑥ ${หลัก} คู่ ${เทียบ} ⇒ ข้อของคอลัมน์แรก ${ม.หลักไม่มีป้าย} ข้อไม่มีป้ายที่ตาเห็นว่าเป็นของ ${หลัก}`)
      } finally {
        await ctx.close()
      }
    }
  })

  // ---------------------------------------------------------------- ⑦ ทีละฉบับ ⇒ เลือกอ่านคอลัมน์คนละบทได้
  await ลอง('⑦', async () => {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 375, ที่อยู่: คนละบท, ฉ: ['TCV'], มุม: { วางคอลัมน์: 'ทีละฉบับ' }, พัง })
    try {
      const เห็น = () =>
        แท็บ.evaluate(() => ({
          หลัก: !!document.querySelector('.pk-ฝั่งหลัก')?.offsetParent,
          เทียบ: [...document.querySelectorAll('.pk-ตอนเทียบ')].filter((x) => x.offsetParent).length,
        }))
      const แรก = await เห็น()
      if (!แรก.หลัก || แรก.เทียบ) ตก.push(`⑦ ทีละฉบับเปิดมา ⇒ ฝั่งหลัก ${แรก.หลัก ? 'เห็น' : 'ไม่เห็น'} · คอลัมน์คนละบท ${แรก.เทียบ} ⛔ ต้องเห็นคอลัมน์แรกอย่างเดียว`)
      await กางเมนู(แท็บ)
      const ปุ่ม = แท็บ.getByRole('radio', { name: 'อ่าน WEB มัทธิว 17', exact: true })
      if (!(await ปุ่ม.count())) ตก.push('⑦ เมนูไม่มีปุ่มกลม *อ่าน WEB มัทธิว 17* ⛔ ทีละฉบับต้องเลือกอ่านคอลัมน์คนละบทได้')
      else {
        await ปุ่ม.check()
        await ปุ่มเทียบของหน้า(แท็บ).click()
        await สองเฟรม(แท็บ)
        const สอง = await เห็น()
        if (สอง.หลัก || สอง.เทียบ !== 1) ตก.push(`⑦ เลือกอ่านมัทธิว 17 ⇒ ฝั่งหลัก ${สอง.หลัก ? 'ยังเห็น' : 'ซ่อน'} · คอลัมน์คนละบท ${สอง.เทียบ} ⛔ ต้องเห็นมัทธิว 17 อย่างเดียว`)
        await กางเมนู(แท็บ)
        await แท็บ.getByRole('radio', { name: 'อ่าน TCV มาระโก 9', exact: true }).check()
        await ปุ่มเทียบของหน้า(แท็บ).click()
        await สองเฟรม(แท็บ)
        const สาม = await เห็น()
        if (!สาม.หลัก || สาม.เทียบ) ตก.push('⑦ เลือกกลับมาอ่านมาระโก 9 ⇒ ⛔ ไม่กลับ')
      }
    } finally {
      await ctx.close()
    }
  })

  // ---------------------------------------------------------------- ⑧ หัวติดด้านบนในบนล่าง
  await ลอง('⑧', async () => {
    for (const กว้าง of [320, 375])
      for (const fs of พัง ? [1] : [1, 2]) {
        const { ctx, แท็บ } = await เปิด({ กว้าง, fs, ที่อยู่: คนละบท, ฉ: ['TCV'], มุม: { วางคอลัมน์: 'บนล่าง' }, พัง })
        try {
          await แท็บ.evaluate(() => {
            const e = document.getElementById('ข้อ-9-12')
            window.scrollTo(0, window.scrollY + e.getBoundingClientRect().top - innerHeight / 2)
          })
          await สองเฟรม(แท็บ)
          const ม = await แท็บ.evaluate(() => {
            const แถบ = document.querySelector('.pk-แถบบน').getBoundingClientRect()
            const แถว = document.querySelector('.pk-หัวคอลัมน์').getBoundingClientRect()
            // ⭐ ใบ #131 note_30489 ⇒ ปุ่มกางชื่อฉบับถูกถอด ⇒ ชื่อฉบับที่ตาเห็นอยู่บนช่องเลือกฉบับของหัวแถวเดียว ⇒ เปลี่ยนแค่ที่อ่าน ⇒ เกณฑ์คงเดิม
            const ปุ่ม = [...document.querySelectorAll('.pk-หัวคอลัมน์ .pk-หัวช่อง select')].filter((b) => b.offsetParent)
            const บน = new Set(ปุ่ม.map((b) => Math.round(b.getBoundingClientRect().top)))
            return {
              ห่าง: Math.round((แถว.top - แถบ.bottom) * 10) / 10,
              ล่าง: Math.round(แถว.bottom * 10) / 10,
              // ⭐ ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/175 ⇒ ตัวเลือกเขียน *TCV · ไทย* ⇒ ตาเห็นป้ายสั้นที่ทับช่อง ⇒ เปลี่ยนแค่ที่อ่าน ⇒ เกณฑ์คงเดิม
              ชื่อ: ปุ่ม.map((b) => {
                const ป้ายสั้น = b.closest('label')?.querySelector('.pk-ป้ายฉบับที่เลือก')
                return (ป้ายสั้น?.getClientRects().length ? ป้ายสั้น.textContent : b.selectedOptions[0]?.textContent)?.trim()
              }),
              แถว: บน.size,
            }
          })
          const ที่ = `จอ ${กว้าง} ตัวอักษร ${fs * 100}% บนล่าง กลางบท`
          if (Math.abs(ม.ห่าง) > 1) ตก.push(`⑧ ${ที่} ⇒ แถวหัวห่างแถบบน ${ม.ห่าง} จุด ⛔ ต้องติดใต้แถบบน`)
          if (JSON.stringify(ม.ชื่อ) !== JSON.stringify(['TCV', 'WEB'])) ตก.push(`⑧ ${ที่} ⇒ หัวที่เห็น ${JSON.stringify(ม.ชื่อ)} ⛔ ต้องเห็น TCV กับ WEB`)
          // ⭐ ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/150 ⇒ ของเดิม *หัวห่อเกิน 1 แถว ⇒ แดงเสมอ*
          //   ⇒ พี่เอมอนุมัติ 7 พ.ย. 2569 ทางแชตกับ AI ⇒ พอแถวเดียว ⇒ ต้องแถวเดียวเหมือนเดิม ⇒ ไม่พอ ⇒ ขึ้นแถวใหม่ได้
          //     ⇒ แต่ทุกปุ่มอยู่ในจอ กดได้ แถบ ⛔ ปัดข้าง ⇒ เกณฑ์ตัวเดียวกับ `tools/ด่านหัวติดด้านบนจอแคบ.mjs` ข้อ ② (`ผิดเกณฑ์แถวหัว`)
          for (const ผิด of ผิดเกณฑ์แถวหัว(await อ่านแถบหัว(แท็บ))) ตก.push(`⑧ ${ที่} ⇒ ${ผิด} (แถวของช่องฉบับ ${ม.แถว})`)
          if (ม.ล่าง > เพดานแถบบนจอแคบ) ตก.push(`⑧ ${ที่} ⇒ แถบบนรวมหัวลงมาถึง ${ม.ล่าง} จุด ⛔ เกินเพดาน ${เพดานแถบบนจอแคบ}`)
        } finally {
          await ctx.close()
        }
      }
  })

  // ---------------------------------------------------------------- ⑨ 44 จุด
  await ลอง('⑨', async () => {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 320, พัง })
    try {
      await กางเมนู(แท็บ)
      const สูง = await แท็บ.evaluate(() =>
        [...document.querySelectorAll('[data-กลุ่ม="วางคอลัมน์"] .pk-ช่องติ๊ก')].map((x) => Math.round(x.getBoundingClientRect().height * 10) / 10),
      )
      if (สูง.length !== 3 || สูง.some((h) => h < 44)) ตก.push(`⑨ แถวปุ่มกลมสูง ${JSON.stringify(สูง)} จุด ⛔ ต้องไม่ต่ำกว่า 44 ทุกแถว`)
    } finally {
      await ctx.close()
    }
  })

  // ---------------------------------------------------------------- ⑩ ป้ายไม่อยู่ในตัวหนังสือ
  await ลอง('⑩', async () => {
    const { ctx, แท็บ } = await เปิด({ กว้าง: 375, ฉ: ['TCV', 'WEB'], พัง })
    try {
      const ซ = await สภาพ(แท็บ)
      await ตั้งการวางจอแคบ(แท็บ, 'บนล่าง')
      if (พัง?.บนหน้า) await แท็บ.evaluate(พัง.บนหน้า)
      await สองเฟรม(แท็บ)
      const บ = await สภาพ(แท็บ)
      if (บ.แบบ !== 'บนล่าง') ตก.push(`⑩ เลือกบนล่างแล้วได้ ${บ.แบบ}`)
      if (JSON.stringify(ซ.เนื้อ) !== JSON.stringify(บ.เนื้อ))
        ตก.push('⑩ ตัวหนังสือของช่องตอนบนล่าง ⛔ เท่ากับตอนซ้ายขวา ⇒ ป้ายเข้าไปอยู่ในตัวบท หรือตัวบทหาย')
    } finally {
      await ctx.close()
    }
  })

  // ---------------------------------------------------------------- ⑪ ค่าที่เคยเก็บ
  await ลอง('⑪', async () => {
    for (const [เดิม, ต้อง] of [
      [{ จัดวาง: 'แยกตามข้อ', วางจอแคบ: 'ทีละฉบับ' }, 'ซ้ายขวา'],
      [{ จัดวาง: 'แยกตามข้อ', วางจอแคบ: 'ขนานกัน' }, 'ซ้ายขวา'],
    ]) {
      const { ctx, แท็บ } = await เปิด({ กว้าง: 375, มุม: เดิม, พัง })
      try {
        const ส = await สภาพ(แท็บ)
        if (ส.แบบ !== ต้อง) ตก.push(`⑪ ค่าที่เก็บไว้ ${JSON.stringify(เดิม)} ⇒ ได้ ${ส.แบบ} ⛔ ต้องได้ ${ต้อง}`)
      } finally {
        await ctx.close()
      }
    }
  })

  return ตก
}

const ที่ตก = []
const ตก = await ตรวจ()
ที่ตก.push(...ตก)
console.log(`${ตก.length ? '⛔' : '✅'} จอแคบ ⇒ วางคอลัมน์ ซ้ายขวา · บนล่าง · ทีละฉบับ`)
for (const x of ตก) console.log(`   ${x}`)

if (ทดสอบตัวเอง) {
  for (const [ชื่อ, พัง] of Object.entries(ของพัง)) {
    const ผล = await ตรวจ(พัง)
    const จับได้ = ผล.some((x) => พัง.ข้อ.split(' ').some((ข) => x.startsWith(ข)))
    console.log(`${จับได้ ? '✅' : '⛔'} พิสูจน์ ${ชื่อ} (${พัง.ข้อ}) ⇒ ${จับได้ ? `แดง ${ผล.length} เรื่อง` : '⛔ ไม่แดง'}`)
    if (!จับได้) ที่ตก.push(`พิสูจน์ ${ชื่อ} ⇒ ยัดของพังแล้วข้อ ${พัง.ข้อ} ⛔ ไม่แดง ⇒ ข้อนี้เฝ้าอะไรไม่ได้แล้ว`)
  }
}

await เบราว์เซอร์.close()

if (ที่ตก.length) {
  console.log(`\n⛔ ด่านวางคอลัมน์จอแคบแดง — ${ที่ตก.length} เรื่อง`)
  for (const x of ที่ตก) console.log(`  · ${x}`)
  process.exit(1)
}
console.log('\n✅ ด่านวางคอลัมน์จอแคบเขียว')
