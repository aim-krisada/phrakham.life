// วัดคอลัมน์อ่าน **จากบรรทัดจริงบนหน้า** — ความกว้างคอลัมน์ และตัวอักษรต่อบรรทัด
//
// ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/102 ข้อ 7.1 กับข้อ 9
//   ⇒ *ห้ามเขียนจำนวนตัวอักษรเป็นค่าคงที่ในคอมเมนต์ ⇒ ต้องวัดจากบรรทัดจริง*
//   ⇒ *จอ 375 · 768 · 1280 · 1920 × 1 · 2 · 3 · 4 คอลัมน์ ⇒ ก่อนแก้และหลังแก้*
//
// ⭐ **ไฟล์นี้มี 2 หน้าที่**
//   ① เป็นของกลางให้ `tools/ด่านจังหวะการอ่าน.mjs` หยิบไปใช้ ⇒ ด่านตัดสิน ⇒ ไฟล์นี้แค่วัด
//   ② รันตรง ๆ แล้วได้ตารางวัด ⇒ ใช้กับเว็บรุ่นไหนก็ได้ ⇒ วัดก่อนแก้กับหลังแก้ด้วยเครื่องมือตัวเดียวกัน
//
//   node tools/วัดคอลัมน์อ่าน.mjs <ที่อยู่เว็บ>
//
// ⭐ **นิยามของ *ตัวอักษรต่อบรรทัด* เป็นตัวเดียวกับของ `ด่านจังหวะการอ่าน.mjs` ข้อ ③**
//   ⇒ นับเฉพาะตัวที่ **กินความกว้าง** ⇒ ⛔ ไม่นับสระบน สระล่าง วรรณยุกต์ และตัวกว้างศูนย์
//   ⇒ ⭐ นี่คือทางที่ทำให้ *"80 characters or glyphs"* ของ WCAG 2.2 SC 1.4.8 ใช้กับภาษาไทยได้
//   ⛔ **ตัดบรรทัดสุดท้ายของทุกกล่องทิ้ง** ⇒ มันสั้นตามธรรมชาติ ⇒ นับด้วยแล้วค่ากลางเพี้ยนลง

import { chromium } from 'playwright'
import { เส้นทางเว็บ } from './หน้าที่ตรวจ.mjs'

/** ฉบับที่เปิดเป็นคอลัมน์ ⇒ เรียงตามที่หน้าอ่านเรียง ⇒ เปิด N คอลัมน์ = N ฉบับแรก */
export const ฉบับเรียง = ['TCV', 'THKJV', 'WEB', 'LSV']
export const จอที่วัด = [375, 768, 1280, 1920]
export const จำนวนคอลัมน์ที่วัด = [1, 2, 3, 4]
/** ⭐ ยอห์น 1 ⇒ หน้าเดียวกับที่ `ด่านจังหวะการอ่าน.mjs` ใช้ ⇒ ข้อยาวพอให้มีหลายบรรทัดทุกฉบับ */
export const บทที่วัด = '/read/JHN?c=1'

/**
 * เปิดหน้าอ่านด้วย **N ฉบับวางเป็น N คอลัมน์** ⇒ ⭐ ตั้งผ่านที่เก็บของเบราว์เซอร์ก่อนหน้าเปิด
 *   ⇒ ⛔ ไม่กดเมนูทีละฉบับ ⇒ ตารางมี 16 ช่อง ⇒ กดเมนู 16 รอบช้าและไม่ได้ตรวจอะไรเพิ่ม
 *   ⇒ ทางกดเมนูจริงมีด่านของมันอยู่แล้ว (`tools/ด่านเลือกฉบับ.mjs`)
 * ⭐ **จอแคบตั้ง *ขนานกัน* ไว้ด้วย** ⇒ ⛔ ไม่ตั้ง = จอแคบวาดทีละฉบับเสมอ ⇒ วัดหลายคอลัมน์ไม่ได้
 *   ⇒ แต่ตารางยังรายงานว่าจอนั้นวางได้จริงกี่คอลัมน์ ⇒ ⛔ ไม่ได้บังคับให้วาง
 */
/** ตอนที่เอามาเทียบ ⇒ ใช้ตอนวัดแบบ *1 ฉบับ + ตอนเทียบ* ⇒ บทยาวพอให้มีหลายบรรทัดทุกตอน */
export const ตอนเทียบที่วัด = ['MRK.1.TCV', 'LUK.1.TCV', 'MAT.1.TCV']

export async function เปิดหลายคอลัมน์(เบราว์เซอร์, ฐาน, กว้าง, n, ขั้น = 1, สูง = 900, แบบ = 'ฉบับ') {
  const ctx = await เบราว์เซอร์.newContext({ viewport: { width: กว้าง, height: สูง } })
  await ctx.addInitScript(
    ([ฉบับ, ขั้น]) => {
      try {
        if (!sessionStorage.getItem('pk-วัด')) {
          localStorage.setItem('phrakham.versions', JSON.stringify(ฉบับ))
          localStorage.setItem('pk-fs', String(ขั้น))
          sessionStorage.setItem('pk-วัด', '1')
        }
      } catch {}
    },
    [แบบ === 'เทียบ' ? ฉบับเรียง.slice(0, 1) : ฉบับเรียง.slice(0, n), ขั้น],
  )
  const แท็บ = await ctx.newPage()
  const p = แบบ === 'เทียบ' && n > 1 ? `&p=${ตอนเทียบที่วัด.slice(0, n - 1).join(',')}` : ''
  await แท็บ.goto(`${ฐาน}${บทที่วัด}${p}`, { waitUntil: 'domcontentloaded' })
  if (p) await แท็บ.waitForSelector('.pk-ตอนเทียบ .pk-ข้อตอนเทียบ', { timeout: 15000 })
  await แท็บ.waitForSelector('.pk-ช่องฉบับ')
  await แท็บ.waitForFunction(() => document.getElementById('__nuxt')?.__vue_app__, null, {
    timeout: 30000,
  })
  await แท็บ.evaluate((ขั้น) => document.documentElement.style.setProperty('--pk-fs', String(ขั้น)), ขั้น)
  // ⭐⭐ **รอของจริงก่อนวัด ⛔ ไม่ใช่รอ 400 มิลลิวินาที** (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/119)
  //   ⇒ ท่อ 11494 งาน 59823 ⇒ ยอห์น 1 จอ 1920 4 ฉบับ ⇒ ความกว้างคอลัมน์เท่าเดิมเป๊ะ (453 จุด) และฉบับอังกฤษนับได้เท่าเดิม
  //     ⇒ แต่ฉบับไทยนับได้ 39 กับ 38 ตัว แทน 43 กับ 41 ที่ท่อของ main ได้ทุกรอบ ⇒ วัดเครื่องนี้ซ้ำทั้งถ่วงซีพียู 6 เท่า ⇒ ได้ 43 ทุกครั้ง
  //   ⇒ ⭐ ตอนนี้รอ ⇒ ฟอนต์มาครบ · ทุกฉบับที่ขอมีตัวบท (และตอนเทียบครบ) · แล้วกรอบกับความยาวตัวบทของทุกช่องนิ่ง 3 เฟรมติด
  //   ⛔ **รอไม่สำเร็จ = โยนข้อผิดพลาด** ⇒ ด่านเขียนเป็นข้อที่ตก ⛔ ไม่วัดของที่ยังไม่พร้อมแล้วผ่านเงียบ ๆ
  const ฉบับที่รอ = แบบ === 'เทียบ' ? ฉบับเรียง.slice(0, 1) : ฉบับเรียง.slice(0, n)
  const เทียบที่รอ = แบบ === 'เทียบ' ? n - 1 : 0
  await แท็บ.evaluate(() => {
    window.__วัดนิ่ง = { ก่อน: '', นับ: 0 }
  })
  await แท็บ.waitForFunction(
    ([ฉบับ, เทียบ]) => {
      if (document.fonts.status !== 'loaded') return false
      for (const ฉ of ฉบับ) if (!document.querySelector(`.pk-ตัวบท .pk-ช่องฉบับ[data-ฉบับ="${ฉ}"]`)?.textContent?.trim()) return false
      if (document.querySelectorAll('.pk-ตอนเทียบ').length < เทียบ) return false
      const ภาพ = JSON.stringify([
        [...document.querySelectorAll('.pk-ตัวบท .pk-ช่องฉบับ, .pk-ตอนเทียบ')].map((e) => {
          const r = e.getBoundingClientRect()
          return [Math.round(r.left), Math.round(r.width), Math.round(r.height), e.textContent.length]
        }),
        getComputedStyle(document.documentElement).getPropertyValue('--pk-fs'),
      ])
      const น = window.__วัดนิ่ง
      น.นับ = ภาพ === น.ก่อน ? น.นับ + 1 : 0
      น.ก่อน = ภาพ
      return น.นับ >= 3
    },
    [ฉบับที่รอ, เทียบที่รอ],
    { polling: 'raf', timeout: 30000 },
  )
  return { ctx, แท็บ }
}

/**
 * ⭐⭐ **วัดทุกคอลัมน์ฉบับที่ตาเห็นอยู่** ⇒ คืน `[{ฉบับ, กว้าง, กลาง, มากสุด, บรรทัด}]`
 *   ⇒ `กว้าง` = ความกว้างกล่องตัวบทของฉบับนั้นเป็นจุด · `กลาง` `มากสุด` = ตัวอักษรต่อบรรทัด
 *   ⇒ `ขนาด` = ขนาดตัวอักษรของตัวบทเป็นจุด ⇒ ด่านเอาไปคิดเป็น *เท่าของตัวอักษร* ⛔ ไม่ขึ้นกับฟอนต์
 *   ⇒ `แถว` = จำนวนแถวที่คอลัมน์ถูกห่อลงไป ⇒ 1 = ทุกฉบับอยู่แถวเดียวกัน
 */
export function วัดในหน้า() {
  const ไม่กินความกว้าง = /[ัิ-ฺ็-๎​-‍﻿]/
  const ผล = new Map()
  const เห็น = (el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden'
  // ⭐ กล่องตัวบทของฉบับในฝั่งหลัก ⇒ กุญแจคือชื่อฉบับ
  const ช่อง = [...document.querySelectorAll('.pk-ตัวบท .pk-ช่องฉบับ')]
    .filter(เห็น)
    .map((el) => [el.getAttribute('data-ฉบับ') || '?', el])
  // ⭐ ตอนที่เอามาเทียบ ⇒ กุญแจคือ *เทียบ ลำดับ* ⇒ วัดข้อละกล่องแบบเดียวกัน
  document.querySelectorAll('.pk-ตอนเทียบ').forEach((s, i) => {
    for (const el of s.querySelectorAll('.pk-ข้อตอนเทียบ, .pk-ไหลตอนเทียบ, .pk-ย่อหน้า'))
      if (เห็น(el)) ช่อง.push([`เทียบ${i + 1}`, el])
  })
  for (const [ฉ, el] of ช่อง) {
    const ก = el.getBoundingClientRect()
    if (!ผล.has(ฉ))
      ผล.set(ฉ, {
        ฉบับ: ฉ,
        กว้าง: Math.round(ก.width),
        ซ้าย: Math.round(ก.left),
        บน: Math.round(ก.top),
        ขนาด: parseFloat(getComputedStyle(el).fontSize),
        นับ: [],
      })
    // ⭐ เดินทุกโหนดตัวหนังสือในกล่อง ⇒ จัดกลุ่มตามความสูงของบรรทัดที่วาดจริง
    const แถว = new Map()
    const เดิน = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    const r = document.createRange()
    for (let n = เดิน.nextNode(); n; n = เดิน.nextNode()) {
      // ⛔ ป้ายชื่อฉบับที่ซ่อนไว้ให้เสียงอ่าน กับเลขข้อ ⇒ ⛔ ไม่ใช่ตัวบท
      const พ่อ = n.parentElement
      if (พ่อ?.closest('.pk-เฉพาะเสียง, .pk-เลขข้อ')) continue
      const s = n.textContent || ''
      for (let i = 0; i < s.length; i++) {
        if (ไม่กินความกว้าง.test(s[i]) || s[i] === '\n') continue
        r.setStart(n, i)
        r.setEnd(n, i + 1)
        const b = r.getBoundingClientRect()
        if (!b.width && !b.height) continue
        const คีย์ = Math.round(b.top + b.height / 2)
        let เจอ = [...แถว.keys()].find((k) => Math.abs(k - คีย์) < b.height * 0.4)
        if (เจอ === undefined) เจอ = คีย์
        แถว.set(เจอ, (แถว.get(เจอ) || 0) + 1)
      }
    }
    const บรรทัด = [...แถว.entries()].sort((a, b) => a[0] - b[0]).map((x) => x[1])
    // ⛔ บรรทัดสุดท้ายของกล่องสั้นตามธรรมชาติ ⇒ ตัดทิ้ง ⇒ กล่องบรรทัดเดียวจึง ⛔ ไม่ถูกนับเลย
    ผล.get(ฉ).นับ.push(...บรรทัด.slice(0, -1))
  }
  return [...ผล.values()].map((x) => {
    const เรียง = [...x.นับ].sort((a, b) => a - b)
    return {
      ฉบับ: x.ฉบับ,
      กว้าง: x.กว้าง,
      ขนาด: Math.round(x.ขนาด * 100) / 100,
      บรรทัด: เรียง.length,
      กลาง: เรียง.length ? เรียง[Math.floor(เรียง.length / 2)] : null,
      มากสุด: เรียง.length ? เรียง[เรียง.length - 1] : null,
      // ⭐ ห่อลงแถวใหม่ไหม ⇒ เทียบขอบบนของกล่องแรกของแต่ละฉบับ
      // ⭐ ห่อ = ขอบซ้ายของคอลัมน์นี้อยู่ก่อนขอบขวาของคอลัมน์ที่มาก่อนหน้า ⇒ มันไปอยู่ใต้กัน
      แถวที่:
        1 +
        [...ผล.values()]
          .slice(0, [...ผล.values()].indexOf(x))
          .filter(
            (y) =>
              x.ซ้าย < y.ซ้าย + y.กว้าง - 4 && y.ซ้าย < x.ซ้าย + x.กว้าง - 4 && x.บน > y.บน + 4,
          ).length,
      ล้นขอบ: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }
  })
}

/** ตารางเต็ม 4 จอ × 4 คอลัมน์ ⇒ คืนแถวละช่อง */
export async function วัดทั้งตาราง(เบราว์เซอร์, ฐาน, ขั้น = 1, แบบ = 'ฉบับ', จอ = จอที่วัด) {
  const ตาราง = []
  for (const กว้าง of จอ) {
    for (const n of จำนวนคอลัมน์ที่วัด) {
      const { ctx, แท็บ } = await เปิดหลายคอลัมน์(เบราว์เซอร์, ฐาน, กว้าง, n, ขั้น, 900, แบบ)
      try {
        ตาราง.push({ กว้าง, n, คอลัมน์: await แท็บ.evaluate(วัดในหน้า) })
      } finally {
        await ctx.close()
      }
    }
  }
  return ตาราง
}

export function พิมพ์ตาราง(ตาราง) {
  const บรรทัด = ['| จอ | เปิด | เห็นกี่คอลัมน์ | กว้างคอลัมน์ (จุด) | ตัวอักษรต่อบรรทัด กลาง (มากสุด) |', '|---|---|---|---|---|']
  for (const { กว้าง, n, คอลัมน์ } of ตาราง) {
    const แถวมาก = Math.max(1, ...คอลัมน์.map((c) => c.แถวที่))
    const เห็น = `${คอลัมน์.length}${แถวมาก > 1 ? ` (ห่อ ${แถวมาก} แถว)` : ''}`
    const กว้างช่อง = คอลัมน์.map((c) => c.กว้าง).join(' · ')
    const ตัว = คอลัมน์.map((c) => `${c.กลาง ?? '–'} (${c.มากสุด ?? '–'})`).join(' · ')
    บรรทัด.push(`| ${กว้าง} | ${n} | ${เห็น} | ${กว้างช่อง} | ${ตัว} |`)
  }
  return บรรทัด.join('\n')
}

// ---------------------------------------------------------------------------
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('วัดคอลัมน์อ่าน.mjs')) {
  const ฐาน = (process.argv[2] || `http://127.0.0.1:5396${เส้นทางเว็บ}`).replace(/\/+$/, '')
  const ขั้น = Number((process.argv.find((x) => x.startsWith('--ขั้น=')) || '--ขั้น=1').split('=')[1])
  const เบราว์เซอร์ = await chromium.launch()
  try {
    const ตาราง = await วัดทั้งตาราง(เบราว์เซอร์, ฐาน, ขั้น)
    console.log('### เปิด N ฉบับของตอนเดียวกัน\n')
    console.log(พิมพ์ตาราง(ตาราง))
    const เทียบ = await วัดทั้งตาราง(เบราว์เซอร์, ฐาน, ขั้น, 'เทียบ')
    console.log('\n### เปิด 1 ฉบับ + ตอนที่เอามาเทียบ (รวม N คอลัมน์)\n')
    console.log(พิมพ์ตาราง(เทียบ))
    if (process.argv.includes('--json')) console.log(JSON.stringify({ ตาราง, เทียบ }))
  } finally {
    await เบราว์เซอร์.close()
  }
}
