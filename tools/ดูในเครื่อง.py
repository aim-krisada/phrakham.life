"""เปิดไฟล์ .md ดูเหมือนหน้าเว็บ — บนเครื่องตัวเองเท่านั้น

    py -3.14 tools/ดูในเครื่อง.py
    py -3.14 tools/ดูในเครื่อง.py --พอร์ต 8766   # พอร์ตชนกัน หรืออยากเปิดดูพร้อมกัน 2 คน

⛔ ผูกกับ 127.0.0.1 อย่างเดียว ⇒ เครื่องอื่นในวงเน็ตเปิดไม่ได้
   เพราะกฎ *ห้ามเผยแพร่เว็บเอง* — ของนี้มีไว้ให้พี่เอมดูก่อนสั่งเผยแพร่

⛔ นี่ไม่ใช่ตัวสร้างเว็บจริง — ของจริงเป็น Nuxt และมีแล้วตั้งแต่ใบงาน #19
   ⇒ **อยากเห็นหน้าตาจริงของ `content/` ให้สั่ง `npm run dev`** ⛔ ไม่ใช่ที่นี่
   ⇒ ที่นี่เหลือหน้าที่เดียว: ดูไฟล์ `.md` ใน `docs/` ซึ่ง ⛔ ไม่ได้ขึ้นเว็บ จึงไม่มีที่อื่นให้ดู
"""

import http.server
import socketserver
import pathlib
import urllib.parse
import webbrowser
import sys

ราก = pathlib.Path(__file__).resolve().parent.parent
พอร์ตปริยาย = 8765

# มองหาไฟล์ .md ใน 2 โฟลเดอร์นี้เท่านั้น
# ที่มาของรายชื่อโฟลเดอร์ ⇒ ข้อกำหนดโปรเจกต์.md ตาราง "ไฟล์ไหนอยู่โฟลเดอร์ไหน"
โฟลเดอร์ที่ดู = ["content", "docs"]


# ⭐ ต้องเป็น r""" — ข้างในมีสำนวนค้นหาของ JavaScript ที่ใช้ \n กับ \s
# ถ้าไม่ใส่ r ไพทอนจะแปลง \n เป็นการขึ้นบรรทัดจริง ⇒ สำนวนค้นหาขาดกลาง ⇒ หน้าค้างที่ "กำลังอ่านไฟล์…"
หน้าดู = r"""<!doctype html>
<html lang="th"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>__ชื่อ__ · ดูในเครื่อง</title>
<style>
  body { font-family: system-ui, "Segoe UI", sans-serif; line-height: 1.75;
         max-width: 60rem; margin: 0 auto; padding: 1.5rem; color: #1a1a1a; }
  a { color: #06c; }
  table { border-collapse: collapse; width: 100%; margin: 1rem 0; display: block;
          overflow-x: auto; }
  th, td { border: 1px solid #ccc; padding: .4rem .6rem; text-align: left;
           vertical-align: top; }
  th { background: #f2f2f2; }
  pre { background: #f6f6f6; padding: .8rem; overflow-x: auto; }
  code { background: #f0f0f0; padding: .1rem .3rem; }
  pre code { background: none; padding: 0; }
  blockquote { border-left: 4px solid #ccc; margin-left: 0; padding-left: 1rem;
               color: #444; }
  pre.mermaid { background: none; text-align: center; }
  #เตือน { background: #fee; border: 2px solid #c00; padding: 1rem;
           margin-bottom: 1rem; display: none; }
  #กลับ { display: inline-block; margin-bottom: 1rem; }
</style>
</head><body>
<a id="กลับ" href="/">← รายชื่อไฟล์</a>
<div id="เตือน"></div>
<div id="เนื้อ">กำลังอ่านไฟล์…</div>
<script src="https://cdn.jsdelivr.net/npm/marked@14/marked.min.js"></script>
<script type="module">
const เตือน = (ข) => {
  const g = document.getElementById('เตือน');
  g.style.display = 'block';
  g.textContent = ข;
};

// ⛔ ถ้าไม่ขึ้นเตือน แล้วแผนภาพไม่มา คนดูจะนึกว่าไฟล์ .md ผิด
// เกิดขึ้นได้จริงเมื่อเครื่องไม่มีเน็ต หรือ CDN ล่ม
if (!window.marked) {
  เตือน('⛔ โหลด marked จาก cdn.jsdelivr.net ไม่ได้ ⇒ ต้องมีเน็ต');
}

let mermaid = null;
try {
  mermaid = (await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')).default;
  mermaid.initialize({ startOnLoad: false });
} catch (e) {
  เตือน('⛔ โหลด mermaid จาก cdn.jsdelivr.net ไม่ได้ ⇒ แผนภาพจะขึ้นเป็นกล่องโค้ด');
}

const ที่อยู่ดิบ = '__ดิบ__';
const เนื้อ = document.getElementById('เนื้อ');
const ตอบ = await fetch(ที่อยู่ดิบ);
if (!ตอบ.ok) {
  เนื้อ.textContent = '⛔ เปิดไฟล์ไม่ได้: ' + ตอบ.status;
} else if (window.marked) {
  // หัวไฟล์ (frontmatter) เป็นของตัวสร้างเว็บ ⛔ ไม่ใช่เนื้อที่คนอ่านต้องเห็น
  // ⇒ ไม่ตัดทิ้ง marked จะอ่าน --- เป็นเส้นใต้หัวข้อ แล้วพ่น path: ออกมาเป็นพาดหัว
  const ดิบ = (await ตอบ.text()).replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  เนื้อ.innerHTML = marked.parse(ดิบ, { gfm: true, breaks: true });

  // ลิงก์ที่พาออกนอกเว็บเรา ต้องเปิดแท็บใหม่ ⇒ ผู้อ่านบนมือถือที่กดไปดูสัญญา
  // อนุญาต จะกลับมาอ่านต่อได้ ⛔ ถ้าทับแท็บเดิม เขามักไม่กลับมาอีก
  // ทำที่ตัววาดหน้า ⛔ ไม่ใช่ไปเขียน target ซ้ำทุกลิงก์ในไฟล์ .md
  // ⛔ ของจริงเป็น Nuxt ⇒ ต้องมีกฎเดียวกันที่นั่นด้วย ไม่งั้นเว็บจริงจะไม่ได้ของนี้
  for (const a of เนื้อ.querySelectorAll('a[href]')) {
    if (new URL(a.href, location.href).origin !== location.origin) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
  }

  // marked คืนบล็อก mermaid มาเป็น <pre><code class="language-mermaid">
  // ⇒ mermaid รู้จักแต่ <pre class="mermaid"> ⇒ ต้องเปลี่ยนรูปให้มันก่อน
  for (const c of [...document.querySelectorAll('code.language-mermaid')]) {
    const p = document.createElement('pre');
    p.className = 'mermaid';
    p.textContent = c.textContent;
    c.closest('pre').replaceWith(p);
  }
  if (mermaid) {
    try { await mermaid.run({ querySelector: 'pre.mermaid' }); }
    catch (e) { เตือน('⛔ mermaid วาดไม่ผ่าน: ' + e.message); }
  }
}
</script>
</body></html>
"""


def หน้ารายชื่อ():
    แถว = []
    for ชื่อโฟลเดอร์ in โฟลเดอร์ที่ดู:
        ด = ราก / ชื่อโฟลเดอร์
        if not ด.is_dir():
            continue
        for f in sorted(ด.rglob("*.md")):
            rel = f.relative_to(ราก).as_posix()
            ที่อยู่ = "/ดู/" + urllib.parse.quote(rel)
            บรรทัด = len(f.read_text(encoding="utf-8").splitlines())
            แถว.append(f'<li><a href="{ที่อยู่}">{rel}</a> — {บรรทัด} บรรทัด</li>')
    if not แถว:
        แถว.append("<li>⛔ ยังไม่มีไฟล์ .md ใน " + " หรือ ".join(โฟลเดอร์ที่ดู) + "</li>")
    return (
        '<!doctype html><html lang="th"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        "<title>ดูในเครื่อง</title>"
        '<style>body{font-family:system-ui,sans-serif;line-height:1.9;'
        "max-width:50rem;margin:0 auto;padding:1.5rem}</style></head><body>"
        "<h1>ไฟล์ที่เปิดดูได้</h1><ul>" + "".join(แถว) + "</ul></body></html>"
    )


class ตัวรับ(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(ราก), **kw)

    def ส่ง(self, เนื้อ, ชนิด):
        b = เนื้อ.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", ชนิด + "; charset=utf-8")
        self.send_header("Content-Length", str(len(b)))
        self.end_headers()
        self.wfile.write(b)

    def do_GET(self):
        ทาง = urllib.parse.unquote(self.path.split("?")[0])
        if ทาง == "/":
            return self.ส่ง(หน้ารายชื่อ(), "text/html")
        for นำหน้า, ทำอะไร in (("/ดู/", "หน้า"), ("/ดิบ/", "ดิบ")):
            if ทาง.startswith(นำหน้า):
                rel = ทาง[len(นำหน้า):]
                f = (ราก / rel).resolve()
                # ⛔ กันคนพิมพ์ ../ ไต่ออกนอกที่เก็บ
                if not f.is_file() or ราก not in f.parents:
                    self.send_error(404)
                    return None
                if ทำอะไร == "ดิบ":
                    return self.ส่ง(f.read_text(encoding="utf-8"), "text/plain")
                หน้า = หน้าดู.replace("__ชื่อ__", f.name).replace(
                    "__ดิบ__", "/ดิบ/" + urllib.parse.quote(rel)
                )
                return self.ส่ง(หน้า, "text/html")
        return super().do_GET()

    def log_message(self, *a):
        pass


def อ่านพอร์ต():
    # ตรึงพอร์ตไว้ตัวเดียวแล้วเปิดพร้อมกัน 2 คนไม่ได้ (พี่เอมกับ AI) ⇒ ขึ้น WinError 10048
    if "--พอร์ต" in sys.argv:
        return int(sys.argv[sys.argv.index("--พอร์ต") + 1])
    return พอร์ตปริยาย


def หลัก():
    พอร์ต = อ่านพอร์ต()
    # ⛔ 127.0.0.1 ⛔ ไม่ใช่ 0.0.0.0 — ดูเหตุผลที่หัวไฟล์
    try:
        s = socketserver.TCPServer(("127.0.0.1", พอร์ต), ตัวรับ)
    except OSError as e:
        # ⛔ ข้อความเดิมของระบบไม่บอกว่าต้องทำอะไรต่อ ⇒ บอกทางออกไปเลย
        print(f"⛔ เปิดพอร์ต {พอร์ต} ไม่ได้ ({e})")
        print(f"   ⇒ มีคนใช้อยู่ ⇒ สั่งใหม่ด้วย  py -3.14 tools/ดูในเครื่อง.py --พอร์ต {พอร์ต + 1}")
        raise SystemExit(1)
    with s:
        ที่อยู่ = f"http://127.0.0.1:{พอร์ต}/"
        print(f"เปิดที่ {ที่อยู่}  (กด Ctrl+C เพื่อหยุด)")
        if "--ไม่เปิดเบราว์เซอร์" not in sys.argv:
            webbrowser.open(ที่อยู่)
        try:
            s.serve_forever()
        except KeyboardInterrupt:
            print("\nหยุดแล้ว")


if __name__ == "__main__":
    หลัก()
