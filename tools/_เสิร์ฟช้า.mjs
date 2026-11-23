// เสิร์ฟเว็บที่สร้างเสร็จแล้ว **ที่เส้นทางเดียวกับที่ทดลอง** — เพื่อให้ด่านตรวจของจริง
//
// ⛔ ไม่ใช่เซิร์ฟเวอร์สำหรับใช้งานจริง · มีไว้ทางเดียวคือให้ด่านตรวจเปิดดู
// **ทำไมต้องเสิร์ฟที่เส้นทางย่อย** — "สร้างผ่าน" กับ "ใช้ได้ตรงที่มันถูกวางจริง" เป็นคนละคำพูดกัน
//   ⇒ เว็บนี้อยู่ใต้ `/phrakham/` ⇒ ด่านจึงต้องเห็นมันที่เส้นทางนั้น ⛔ ไม่ใช่ที่ราก
//
// ⇒ ยกโครงมาจาก `v3/pleng` → `tools/serve-static.mjs` ⛔ ไม่ลอกทั้งไฟล์
//   ตัดทิ้ง: การบีบอัด gzip (พระคำยังไม่มีด่านวัดความเร็ว) · โหมด `STRICT_404`
//   (ของนั้นจำลอง GitHub Pages ซึ่งเป็นที่วางของจริงของเพลง ⇒ ที่ทดลองของเราเป็น GitLab Pages)
//
//   node tools/เสิร์ฟเว็บที่สร้างเสร็จ.mjs <โฟลเดอร์> <เส้นทาง> <พอร์ต>

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, normalize } from 'node:path'

const โฟลเดอร์ = process.argv[2] || '.output/public'
const เส้นทาง = (process.argv[3] || '/').replace(/\/+$/, '')
const พอร์ต = Number(process.argv[4] || 5396)

// ⭐ **เส้นทางต้องขึ้นต้นด้วย `/`** — Git Bash บนวินโดวส์แปลง `/phrakham` เป็น
//   `C:/Program Files/Git/phrakham` ก่อนส่งถึง node ⇒ เสิร์ฟที่เส้นทางเพี้ยน ⇒ ด่านได้ 404 ทุกหน้า
//   ⇒ ⛔ ล้มทันทีพร้อมบอกทางออก ⛔ ไม่ปล่อยให้ด่านแดงแบบไม่รู้สาเหตุ (เจอเอง 29 ส.ค. 2569)
if (process.argv[3] && !เส้นทาง.startsWith('/')) {
  console.error(`⛔ เส้นทางต้องขึ้นต้นด้วย "/" แต่ได้ "${process.argv[3]}"`)
  console.error('   ⇒ สั่งจาก Git Bash บนวินโดวส์ใช่ไหม? ปลดด้วย MSYS_NO_PATHCONV=1')
  process.exit(2)
}

const ชนิดไฟล์ = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  // ใบงาน #167 ⇒ ชนิดเดียวกับที่ที่วางเว็บจริงส่ง ⇒ ด่านติดตั้งเป็นแอปจึงเห็นแบบเดียวกับผู้อ่าน
  '.webmanifest': 'application/manifest+json; charset=utf-8',
}

createServer(async (req, res) => {
  await new Promise((r) => setTimeout(r, Math.random() * Number(process.env.DELAY || 300)))
  // ⭐ ถอดรหัส `%E0%B9%81…` กลับเป็นตัวไทยก่อน — ชื่อโฟลเดอร์ในเว็บที่สร้างเสร็จเป็นตัวไทยจริง ๆ
  let ทาง = decodeURIComponent(req.url.split('?')[0])
  if (เส้นทาง && !ทาง.startsWith(เส้นทาง)) {
    res.writeHead(404).end('อยู่นอกเส้นทางที่เสิร์ฟ')
    return
  }
  ทาง = ทาง.slice(เส้นทาง.length) || '/'

  // ที่อยู่ที่ไม่มีนามสกุล ⇒ ลอง 2 ทาง เหมือนที่วางไฟล์นิ่งทั่วไปทำ
  const ที่ลอง = []
  if (ทาง.endsWith('/')) ที่ลอง.push(ทาง + 'index.html')
  else if (!extname(ทาง)) ที่ลอง.push(ทาง + '/index.html', ทาง + '.html')
  else ที่ลอง.push(ทาง)

  for (const p of ที่ลอง) {
    // ⛔ กันคนพิมพ์ ../ ไต่ออกนอกโฟลเดอร์ที่เสิร์ฟ
    const f = join(โฟลเดอร์, normalize(p).replace(/^(\.\.[/\\])+/, ''))
    try {
      if (!(await stat(f)).isFile()) continue
      res.writeHead(200, { 'content-type': ชนิดไฟล์[extname(f)] || 'application/octet-stream' })
      res.end(await readFile(f))
      return
    } catch {}
  }
  // ⭐⭐ **ไม่มีไฟล์ ⇒ ส่ง `404.html` ที่รากของเว็บ — เหมือนที่ GitLab Pages กับ GitHub Pages ทำ**
  //   (ใบงาน v3/phrakham#73) ⇒ ไฟล์นั้นคือ **โครงของเว็บทั้งก้อน** ⇒ โค้ดของเว็บติดแล้วเดินเส้นทางเอง
  //   ⇒ นี่คือทางที่ที่อยู่เดิม `/read/<เล่ม>/<บท>` ยังเปิดได้ ทั้งที่ ⛔ ไม่มีไฟล์ของมันแล้ว
  //   ⇒ ⛔ **ตัวเสิร์ฟที่ตอบข้อความเปล่า ⛔ ไม่ใช่ของจริง** ⇒ ด่านจะเขียวทั้งที่ผู้อ่านเจอหน้าเสีย
  // ⛔ รหัสยังเป็น 404 ⇒ ⛔ ไม่แกล้งบอกว่า 200 เพราะที่วางเว็บจริงก็ตอบ 404
  try {
    const หน้า404 = join(โฟลเดอร์, '404.html')
    if ((await stat(หน้า404)).isFile()) {
      res.writeHead(404, { 'content-type': ชนิดไฟล์['.html'] })
      res.end(await readFile(หน้า404))
      return
    }
  } catch {}
  res.writeHead(404).end('ไม่พบไฟล์')
}).listen(พอร์ต, '127.0.0.1', () => {
  console.log(`เสิร์ฟ ${โฟลเดอร์} ที่ http://127.0.0.1:${พอร์ต}${เส้นทาง}/`)
})
