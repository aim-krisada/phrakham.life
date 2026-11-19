// แปลรหัสรูปผันของคำภาษาเดิมเป็นคำไทย (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/103 เกณฑ์ข้อ 7)
//
// ⭐ **รหัสมาจาก MACULA** ซึ่งอยู่ในชั้นคำแล้ว (`_data/ภาษาเดิม/` ช่อง `รูปผัน`)
//   ⇒ กรีกใช้ระบบของ Robinson เช่น `N-GSN` `V-2AAP-NSM`
//   ⇒ ฮีบรูกับอาราเมคใช้ระบบของ Open Scriptures Hebrew Bible เช่น `Ncfsa` `Vqp3ms`
//     (MACULA ตัดอักษรภาษา H/A หน้ารหัสทิ้ง ⇒ ภาษาอาราเมคดูจากช่อง `อาราเมค` ของคำแทน)
//
// ⭐⭐ **ชื่อเรียกเลือกตามลำดับนี้** ⇒ เกณฑ์ข้อ 7 สั่งให้ใช้ชื่อที่หนังสือไวยากรณ์ไทยใช้
//   1. **การก** ⇒ ใช้เลขการกของไวยากรณ์บาลีที่ตำราไทยใช้ ⇒ ตัวอย่างในใบเองคือ `N-GSN` ⇒ *การกที่ 6*
//      ⇒ กรรตุ (nominative) = 1 · กรรม (accusative) = 2 · สัมปทาน (dative) = 4 · สามี (genitive) = 6
//        · อาลปนะ (vocative) = 8 ⇒ กรีกไม่มีการกที่ 3 5 7 แยก เพราะรวมอยู่ใน dative กับ genitive
//   2. **ชนิดคำ บุรุษ พจน์ เพศ** ⇒ ชื่อของไวยากรณ์ไทย เช่น คำนาม ประพันธสรรพนาม เอกพจน์ บุรุษที่ 3
//   3. **มาลาและกาล** ⇒ ชื่อที่ตำราไวยากรณ์อังกฤษฉบับภาษาไทยใช้ เช่น มาลาสมมุติ ปัจจุบันกาลสมบูรณ์
//   4. **วาจก** ⇒ ไวยากรณ์บาลี ⇒ กรรตุวาจก กรรมวาจก ⇒ ส่วน middle ใช้ *อัตตโนบท* ของบาลีที่ทำหน้าที่เดียวกัน
//   5. ⛔ **ของที่ตำราไทยไม่มีชื่อ ⇒ ทับศัพท์** ⇒ aorist · แบบกริยาของฮีบรู (Qal Piel Hiphil …)
//      ⇒ เหตุผลจดในใบงาน ⇒ ⛔ ไม่ตั้งชื่อไทยขึ้นเอง เพราะผู้อ่านจะเอาไปค้นต่อในตำราไม่ได้
//   ⭐ **ทุกชื่อมีชื่ออังกฤษในวงเล็บ** ⇒ พจนานุกรมทุกเล่มในการ์ดเป็นภาษาอังกฤษ ⇒ เทียบกันได้ทันที
//
// ⛔⛔ **รหัสที่แปลไม่ออกต้องโผล่เป็น `ไม่รู้จัก`** ⛔ ไม่กลืนเงียบ
//   ⇒ `tools/ด่านรูปผันเป็นไทย.mjs` แปลรหัสทุกตัวในข้อมูลจริง ⇒ เจอ `ไม่รู้จัก` แม้ตัวเดียว = แดง
//
// ⭐ **มาลา วาจก การก ของคำกรีก ⇒ ส่งรหัสออกไปด้วย** (`ศัพท์`) (ใบ https://aimgit.aimagin.com/v3/phrakham/-/issues/115)
//   ⇒ การ์ดเอารหัสไปหยิบคำอธิบายภาษาง่ายจาก `app/utils/ศัพท์ไวยากรณ์.ts` ⇒ ⛔ ไม่แกะรหัสซ้ำอีกที่
//   ⇒ ชื่อในตารางข้างล่าง ⛔ ไม่ได้แตะ ⇒ คำอธิบายเป็นบรรทัดเพิ่ม ⛔ ไม่ใช่ชื่อใหม่ (ใบ #115 ข้อ 5.3)

/** ชุดของศัพท์ที่มีคำอธิบายภาษาง่ายบนการ์ด (ใบ #115 เกณฑ์ข้อ 7) */
export type ชุดศัพท์ = 'มาลา' | 'วาจก' | 'การก'

export interface ศัพท์ในรูปผัน {
  ชุด: ชุดศัพท์
  /** ตัวอักษรตามระบบ Robinson ⇒ เช่น มาลา `S` */
  รหัส: string
  /** ชื่อเดียวกับที่ขึ้นใน `ส่วน` */
  ชื่อ: string
}

export interface ผลแปลรูปผัน {
  ส่วน: string[]
  ไม่รู้จัก: string[]
  /** มาลา วาจก การก ที่เจอ ตามลำดับที่ขึ้นใน `ส่วน` ⇒ ฮีบรู ⇒ ว่างเสมอ (ศัพท์ของฮีบรู ⛔ ไม่อยู่ในใบ #115) */
  ศัพท์: ศัพท์ในรูปผัน[]
}

const การก: Record<string, string> = {
  N: 'การกที่ 1 (nominative)',
  A: 'การกที่ 2 (accusative)',
  D: 'การกที่ 4 (dative)',
  G: 'การกที่ 6 (genitive)',
  V: 'การกที่ 8 (vocative)',
}
const พจน์กรีก: Record<string, string> = { S: 'เอกพจน์', P: 'พหูพจน์' }
const เพศกรีก: Record<string, string> = { M: 'เพศชาย', F: 'เพศหญิง', N: 'เพศกลาง' }
const บุรุษ: Record<string, string> = { '1': 'บุรุษที่ 1', '2': 'บุรุษที่ 2', '3': 'บุรุษที่ 3' }

const ชนิดคำกรีก: Record<string, string> = {
  N: 'คำนาม',
  A: 'คำวิเศษณ์ขยายนาม (adjective)',
  T: 'คำนำหน้านาม (article)',
  R: 'ประพันธสรรพนาม (relative pronoun)',
  C: 'สรรพนามแสดงซึ่งกันและกัน (reciprocal pronoun)',
  D: 'นิยมสรรพนาม (demonstrative pronoun)',
  K: 'สรรพนามเทียบ (correlative pronoun)',
  I: 'ปฤจฉาสรรพนาม (interrogative pronoun)',
  X: 'อนิยมสรรพนาม (indefinite pronoun)',
  Q: 'สรรพนามเทียบหรือคำถาม (correlative or interrogative pronoun)',
  F: 'สรรพนามสะท้อนกลับ (reflexive pronoun)',
  S: 'สรรพนามแสดงความเป็นเจ้าของ (possessive pronoun)',
  P: 'บุรุษสรรพนาม (personal pronoun)',
}

const คำโดดกรีก: Record<string, string> = {
  ADV: 'คำวิเศษณ์ขยายกริยา (adverb)',
  CONJ: 'คำสันธาน (conjunction)',
  COND: 'คำสันธานบอกเงื่อนไข (conditional)',
  PRT: 'คำเสริม (particle)',
  PREP: 'คำบุพบท (preposition)',
  INJ: 'คำอุทาน (interjection)',
  ARAM: 'คำภาษาอาราเมคที่เขียนด้วยอักษรกรีก',
  HEB: 'คำภาษาฮีบรูที่เขียนด้วยอักษรกรีก',
}

const ท้ายกรีก: Record<string, string> = {
  C: 'ขั้นกว่า (comparative)',
  S: 'ขั้นสุด (superlative)',
  N: 'รูปปฏิเสธ (negative)',
  I: 'รูปคำถาม (interrogative)',
  K: 'รวมกับ καί (crasis)',
  ATT: 'รูปแบบแอตติก (Attic)',
  ABB: 'รูปย่อ (abbreviated)',
  LI: 'ตัวอักษร ไม่ผันรูป (letter, indeclinable)',
  OI: 'ไม่ผันรูป (indeclinable)',
  PRI: 'คำนามเฉพาะ ไม่ผันรูป (proper noun, indeclinable)',
  NUI: 'เลขจำนวน ไม่ผันรูป (numeral, indeclinable)',
}

const กาลกรีก: Record<string, string> = {
  P: 'ปัจจุบันกาล (present)',
  I: 'อดีตกาลต่อเนื่อง (imperfect)',
  F: 'อนาคตกาล (future)',
  A: 'เอออริสต์ (aorist)',
  R: 'ปัจจุบันกาลสมบูรณ์ (perfect)',
  L: 'อดีตกาลสมบูรณ์ (pluperfect)',
}
const วาจกกรีก: Record<string, string> = {
  A: 'กรรตุวาจก (active)',
  M: 'อัตตโนบท (middle)',
  P: 'กรรมวาจก (passive)',
  E: 'อัตตโนบทหรือกรรมวาจก (middle or passive)',
  D: 'อัตตโนบท ไม่มีรูปกรรตุ (middle deponent)',
  O: 'กรรมวาจก ไม่มีรูปกรรตุ (passive deponent)',
  N: 'อัตตโนบทหรือกรรมวาจก ไม่มีรูปกรรตุ (middle or passive deponent)',
  Q: 'กรรตุวาจก ไม่มีประธาน (impersonal active)',
  X: 'ไม่ระบุวาจก (no voice)',
}
const มาลากรีก: Record<string, string> = {
  I: 'มาลาบอกเล่า (indicative)',
  S: 'มาลาสมมุติ (subjunctive)',
  O: 'มาลาปรารถนา (optative)',
  M: 'มาลาคำสั่ง (imperative)',
  N: 'กริยานามรูป (infinitive)',
  P: 'กริยาคุณศัพท์ (participle)',
  R: 'กริยาคุณศัพท์ใช้เป็นคำสั่ง (imperative participle)',
}

/**
 * ⭐ ทุกค่าที่การ์ดของคำกรีกแสดงได้ ⇒ ด่าน `tools/ด่านคำอธิบายศัพท์.mjs` ไล่ทุกกุญแจว่ามีคำอธิบาย
 *   ⇒ เพิ่มชื่อใหม่ในตารางข้างบนเมื่อไร ⇒ ไม่มีคำอธิบาย = แดง
 */
export const ตารางศัพท์กรีก: Record<ชุดศัพท์, Record<string, string>> = {
  มาลา: มาลากรีก,
  วาจก: วาจกกรีก,
  การก,
}

function แปลกรีก(รหัส: string): ผลแปลรูปผัน {
  const ส่วน: string[] = []
  const ไม่รู้จัก: string[] = []
  const ศัพท์: ศัพท์ในรูปผัน[] = []
  const ใส่ = (ตาราง: Record<string, string>, ค: string | undefined, ชุด?: ชุดศัพท์) => {
    if (!ค || ค === '-') return
    const ชื่อ = ตาราง[ค]
    if (ชื่อ) {
      ส่วน.push(ชื่อ)
      if (ชุด) ศัพท์.push({ ชุด, รหัส: ค, ชื่อ })
    } else ไม่รู้จัก.push(ค)
  }
  const ท่อน = รหัส.split('-')
  const หัว = ท่อน[0]!

  if (คำโดดกรีก[หัว]) {
    ส่วน.push(คำโดดกรีก[หัว]!)
    for (const ท of ท่อน.slice(1)) ใส่(ท้ายกรีก, ท)
    return { ส่วน, ไม่รู้จัก, ศัพท์ }
  }

  if (หัว === 'V') {
    ส่วน.push('คำกริยา')
    const ก = ท่อน[1] ?? ''
    const m = /^(2?)([PIFARL])([AMPEDONQX])([ISOMNPR])$/.exec(ก)
    if (!m) ไม่รู้จัก.push(ก)
    else {
      const [, ที่สอง, กาล, วาจก, มาลา] = m
      const ชื่อกาล = กาลกรีก[กาล!]!
      ส่วน.push(ที่สอง ? `${ชื่อกาล.replace(' (', ' แบบที่ 2 (2nd ')}` : ชื่อกาล)
      ใส่(วาจกกรีก, วาจก, 'วาจก')
      ใส่(มาลากรีก, มาลา, 'มาลา')
    }
    for (const ท of ท่อน.slice(2)) {
      if (/^[123][SP]$/.test(ท)) {
        ใส่(บุรุษ, ท[0])
        ใส่(พจน์กรีก, ท[1])
      } else if (/^[NAGDV][SP][MFN]$/.test(ท)) {
        ใส่(การก, ท[0], 'การก')
        ใส่(พจน์กรีก, ท[1])
        ใส่(เพศกรีก, ท[2])
      } else ใส่(ท้ายกรีก, ท)
    }
    return { ส่วน, ไม่รู้จัก, ศัพท์ }
  }

  if (ชนิดคำกรีก[หัว]) {
    ส่วน.push(ชนิดคำกรีก[หัว]!)
    const ตัว = ท่อน[1] ?? ''
    let ม: RegExpExecArray | null
    if (หัว === 'S' && (ม = /^([123])([SP])([NAGDV])([SP])([MFN-]?)$/.exec(ตัว))) {
      // สรรพนามแสดงความเป็นเจ้าของ ⇒ บุรุษกับพจน์ของ *เจ้าของ* ⇒ แล้วการก พจน์ เพศของ *ของที่ถูกเป็นเจ้าของ*
      ส่วน.push(`เจ้าของเป็น${บุรุษ[ม[1]!]} ${พจน์กรีก[ม[2]!]}`)
      ใส่(การก, ม[3], 'การก')
      ใส่(พจน์กรีก, ม[4])
      ใส่(เพศกรีก, ม[5])
    } else if ((ม = /^([123]?)([NAGDV])([SP])([MFN-]?)$/.exec(ตัว))) {
      ใส่(บุรุษ, ม[1])
      ใส่(การก, ม[2], 'การก')
      ใส่(พจน์กรีก, ม[3])
      ใส่(เพศกรีก, ม[4])
    } else if (ตัว && ท้ายกรีก[ตัว]) {
      ใส่(ท้ายกรีก, ตัว)
    } else if (ตัว) {
      ไม่รู้จัก.push(ตัว)
    }
    for (const ท of ท่อน.slice(2)) ใส่(ท้ายกรีก, ท)
    return { ส่วน, ไม่รู้จัก, ศัพท์ }
  }

  return { ส่วน, ไม่รู้จัก: [รหัส], ศัพท์ }
}

// ---------------------------------------------------------------- ฮีบรูและอาราเมค (Open Scriptures)
const เพศฮีบรู: Record<string, string> = {
  m: 'เพศชาย',
  f: 'เพศหญิง',
  b: 'ใช้ได้ทั้งเพศชายและหญิง (both)',
  c: 'ไม่แยกเพศ (common)',
}
const พจน์ฮีบรู: Record<string, string> = { s: 'เอกพจน์', p: 'พหูพจน์', d: 'ทวิพจน์ (dual)' }
const สถานะ: Record<string, string> = {
  a: 'รูปอิสระ (absolute)',
  c: 'รูปผูก (construct)',
  d: 'รูปชี้เฉพาะ (determined)',
}
const ชนิดวิเศษณ์ฮีบรู: Record<string, string> = {
  a: 'คำวิเศษณ์ขยายนาม (adjective)',
  c: 'เลขจำนวนนับ (cardinal number)',
  g: 'คำวิเศษณ์บอกเชื้อชาติ (gentilic)',
  o: 'เลขลำดับที่ (ordinal number)',
}
const ชนิดนามฮีบรู: Record<string, string> = {
  c: 'คำนามสามานยนาม (common noun)',
  g: 'คำนามบอกเชื้อชาติ (gentilic)',
  p: 'คำนามวิสามานยนาม (proper noun)',
  x: 'คำนาม ไม่ระบุชนิด',
}
const ชนิดสรรพนามฮีบรู: Record<string, string> = {
  d: 'นิยมสรรพนาม (demonstrative pronoun)',
  f: 'อนิยมสรรพนาม (indefinite pronoun)',
  i: 'ปฤจฉาสรรพนาม (interrogative pronoun)',
  p: 'บุรุษสรรพนาม (personal pronoun)',
  r: 'ประพันธสรรพนาม (relative pronoun)',
}
const ชนิดท้ายฮีบรู: Record<string, string> = {
  d: 'ปัจจัยบอกทิศทาง ה (directional he)',
  h: 'ปัจจัย ה เสริม (paragogic he)',
  n: 'ปัจจัย נ เสริม (paragogic nun)',
  p: 'ปัจจัยสรรพนาม (pronominal suffix)',
}
const ชนิดอนุภาคฮีบรู: Record<string, string> = {
  a: 'คำเสริมยืนยัน (affirmation)',
  d: 'คำนำหน้านามชี้เฉพาะ (definite article)',
  e: 'คำเสริมเร่งเร้า (exhortation)',
  i: 'คำเสริมคำถาม (interrogative)',
  j: 'คำอุทาน (interjection)',
  m: 'คำเสริมชี้ (demonstrative)',
  n: 'คำเสริมปฏิเสธ (negative)',
  o: 'คำชี้กรรมตรง (direct object marker)',
  r: 'คำเสริมเชื่อมความ (relative)',
}
// ⛔ แบบกริยา (binyan) ⇒ ตำราไทยไม่มีชื่อ ⇒ ทับศัพท์ตามที่ตำราอังกฤษใช้ ⇒ เหตุผลอยู่หัวไฟล์ข้อ 5
const แบบกริยาฮีบรู: Record<string, string> = {
  q: 'Qal', N: 'Niphal', p: 'Piel', P: 'Pual', h: 'Hiphil', H: 'Hophal', t: 'Hithpael',
  o: 'Polel', O: 'Polal', r: 'Hithpolel', m: 'Poel', M: 'Poal', k: 'Palel', K: 'Pulal',
  Q: 'Qal passive', l: 'Pilpel', L: 'Polpal', f: 'Hithpalpel', D: 'Nithpael', j: 'Pealal',
  i: 'Pilel', u: 'Hothpaal', c: 'Tiphil', v: 'Hishtaphel', w: 'Nithpalel', y: 'Nithpoel',
  z: 'Hithpoel',
}
const แบบกริยาอาราเมค: Record<string, string> = {
  q: 'Peal', Q: 'Peil', u: 'Hithpeel', p: 'Pael', P: 'Ithpaal', M: 'Hithpaal', a: 'Aphel',
  h: 'Haphel', s: 'Saphel', e: 'Shaphel', H: 'Hophal', i: 'Ithpeel', t: 'Hishtaphel',
  v: 'Ishtaphel', w: 'Hithaphel', o: 'Polel', z: 'Ithpoel', r: 'Hithpolel', f: 'Hithpalpel',
  b: 'Hephal', c: 'Tiphel', m: 'Poel', l: 'Palpel', L: 'Ithpalpel', O: 'Ithpolel', G: 'Ittaphal',
}
const รูปกริยาฮีบรู: Record<string, string> = {
  p: 'รูปสมบูรณ์ (perfect)',
  q: 'รูปสมบูรณ์ต่อเนื่อง (sequential perfect)',
  i: 'รูปไม่สมบูรณ์ (imperfect)',
  w: 'รูปไม่สมบูรณ์ต่อเนื่อง (sequential imperfect)',
  h: 'รูปชักชวน (cohortative)',
  j: 'รูปขอให้เป็น (jussive)',
  v: 'มาลาคำสั่ง (imperative)',
  r: 'กริยาคุณศัพท์ กรรตุ (active participle)',
  s: 'กริยาคุณศัพท์ กรรม (passive participle)',
  a: 'กริยานามรูปอิสระ (infinitive absolute)',
  c: 'กริยานามรูปผูก (infinitive construct)',
}

function แปลฮีบรู(รหัส: string, อาราเมค: boolean): ผลแปลรูปผัน {
  const ส่วน: string[] = []
  const ไม่รู้จัก: string[] = []
  const ใส่ = (ตาราง: Record<string, string>, ค: string | undefined) => {
    if (!ค || ค === 'x') return
    const ชื่อ = ตาราง[ค]
    if (ชื่อ) ส่วน.push(ชื่อ)
    else ไม่รู้จัก.push(ค)
  }
  // บุรุษ เพศ พจน์ ⇒ เช่น `3ms`
  const บุรุษเพศพจน์ = (s: string) => {
    if (!/^[123x][mfbcx][spdx]$/.test(s)) return void ไม่รู้จัก.push(s)
    ใส่(บุรุษ, s[0])
    ใส่(เพศฮีบรู, s[1])
    ใส่(พจน์ฮีบรู, s[2])
  }
  // เพศ พจน์ สถานะ ⇒ เช่น `msa`
  const เพศพจน์สถานะ = (s: string) => {
    if (!/^[mfbcx][spdx][acdx]$/.test(s)) return void ไม่รู้จัก.push(s)
    ใส่(เพศฮีบรู, s[0])
    ใส่(พจน์ฮีบรู, s[1])
    ใส่(สถานะ, s[2])
  }
  const ชนิด = รหัส[0]
  const หลัง = รหัส.slice(1)
  switch (ชนิด) {
    case 'A':
      ใส่(ชนิดวิเศษณ์ฮีบรู, หลัง[0])
      if (หลัง.length > 1) เพศพจน์สถานะ(หลัง.slice(1))
      break
    case 'C':
      ส่วน.push('คำสันธาน (conjunction)')
      if (หลัง) ไม่รู้จัก.push(หลัง)
      break
    case 'D':
      ส่วน.push('คำวิเศษณ์ขยายกริยา (adverb)')
      if (หลัง) ไม่รู้จัก.push(หลัง)
      break
    case 'N':
      ใส่(ชนิดนามฮีบรู, หลัง[0])
      if (หลัง.length > 1) เพศพจน์สถานะ(หลัง.slice(1))
      break
    case 'P':
      ใส่(ชนิดสรรพนามฮีบรู, หลัง[0])
      if (หลัง.length > 1) บุรุษเพศพจน์(หลัง.slice(1))
      break
    case 'R':
      ส่วน.push('คำบุพบท (preposition)')
      if (หลัง === 'd') ส่วน.push('รวมคำนำหน้านามชี้เฉพาะ (with definite article)')
      else if (หลัง) ไม่รู้จัก.push(หลัง)
      break
    case 'S':
      ใส่(ชนิดท้ายฮีบรู, หลัง[0])
      if (หลัง.length > 1) บุรุษเพศพจน์(หลัง.slice(1))
      break
    case 'T':
      if (!หลัง) ส่วน.push('คำเสริม (particle)')
      else ใส่(ชนิดอนุภาคฮีบรู, หลัง)
      break
    case 'V': {
      ส่วน.push('คำกริยา')
      const แบบ = (อาราเมค ? แบบกริยาอาราเมค : แบบกริยาฮีบรู)[หลัง[0] ?? '']
      if (แบบ) ส่วน.push(`แบบ ${แบบ}`)
      else ไม่รู้จัก.push(หลัง[0] ?? '')
      const รูป = หลัง[1] ?? ''
      ใส่(รูปกริยาฮีบรู, รูป)
      const ท้าย = หลัง.slice(2)
      if ('pqiwhjv'.includes(รูป) && ท้าย) บุรุษเพศพจน์(ท้าย)
      else if ('rs'.includes(รูป) && ท้าย) เพศพจน์สถานะ(ท้าย)
      else if (ท้าย) ไม่รู้จัก.push(ท้าย)
      break
    }
    default:
      ไม่รู้จัก.push(รหัส)
  }
  if (อาราเมค) ส่วน.push('ภาษาอาราเมค')
  return { ส่วน, ไม่รู้จัก, ศัพท์: [] }
}

/** แปลรหัสรูปผัน ⇒ ภาษากรีก หรือ ฮีบรู (อาราเมคเป็นฮีบรูที่ติดธง) */
export function แปลรูปผัน(รหัส: string, ภาษา: 'grc' | 'hbo', อาราเมค = false): ผลแปลรูปผัน {
  if (!รหัส) return { ส่วน: [], ไม่รู้จัก: [], ศัพท์: [] }
  return ภาษา === 'grc' ? แปลกรีก(รหัส) : แปลฮีบรู(รหัส, อาราเมค)
}
