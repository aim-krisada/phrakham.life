#!/usr/bin/env python3
"""ด่าน — เลขข้อของ **ทุกฉบับ ทุกบท** ที่ผู้อ่านได้ ต้องตรงกับต้นฉบับ ⛔ ไม่ขาด ⛔ ไม่เกิน

รัน: py -3.14 tools/ด่านเลขข้อครบทุกฉบับ.py --ที่ .output/public   ⇒ ตรวจไฟล์บทที่เว็บสร้างเสร็จ (ของที่ผู้อ่านได้จริง)
     py -3.14 tools/ด่านเลขข้อครบทุกฉบับ.py                      ⇒ ตรวจซอง `_data/เนื้อบท.json.gz` (+ `_พ่น/ฉบับเพิ่ม.json.gz` ถ้ามี)
     py -3.14 tools/ด่านเลขข้อครบทุกฉบับ.py --ทดสอบตัวเอง        ⇒ พิสูจน์แดง-เขียว ⛔ ไม่ต้องมี zip ⛔ ไม่ต้องสร้างเว็บ

ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/37

## ⭐⭐ ทำไมต้องมีด่านนี้ — **รุ่น 2 ทำฉบับ LSV ข้อหาย 133 ข้อ ⛔ โดยไม่มีใครรู้**

ของที่หายเงียบไม่มีเครื่องหมายเตือน ⇒ หน้าเว็บยังเปิดได้ ยังดูปกติ **แต่ข้อหาย**
⇒ `tools/ด่านหน้าเว็บ.mjs` ข้อ ⑦ เทียบหน้าจอกับ **ซอง** ⇒ ⛔ ถ้าซองเองขาดข้อ ทั้งสองฝั่งขาดเท่ากัน ⇒ **เขียว**
   และมันเปิดได้แค่ TCV 2 บท เพราะต้องเปิดเบราว์เซอร์ทีละหน้า
⇒ ด่านนี้จึงเทียบ **ปลายทางกับต้นฉบับตรง ๆ** ⇒ ⛔ ไม่ผ่านซอง ⛔ ไม่ผ่านตัวแปลง

## ⭐ เทียบอะไร

ทุกฉบับที่อยู่ในตาราง `ต้นฉบับ` ข้างล่าง × ทุกบทที่ต้นฉบับมี ⇒ **ชุดเลขข้อที่มีเนื้อ ต้องเท่ากันเป๊ะ**
⇒ ข้อที่ต้นฉบับใส่เลขไว้แต่ไม่มีเนื้อ (เหลือแต่เชิงอรรถ หรือขีด `-`) ⇒ **ต้องไม่อยู่ในปลายทาง** ⇒ อยู่ = แดง
⇒ บทที่ต้นฉบับมีข้อที่มีเนื้อ แต่ปลายทางไม่มีบทนั้น = แดง · ฉบับที่ปลายทางมีแต่ไม่อยู่ในตาราง = แดง
   (⛔ ไม่งั้นเพิ่มฉบับใหม่แล้วไม่มีใครตรวจ ⇒ รูเดียวกับใบนี้)

## ⛔ อ่านต้นฉบับเอง ⛔ ไม่ใช้โค้ดของตัวแปลง

เปิด zip ใน `source/` ตรง ๆ แล้วไล่ด้วย regex ⇒ ⛔ ไม่ `import` `tools/สร้างข้อมูลเว็บ.py` หรือ `สร้างฉบับเพิ่ม.py`
**ทำไม** ⇒ ใช้ตัวอ่านตัวเดียวกัน = ตัวแปลงพลาดตรงไหน ด่านก็พลาดตรงนั้นด้วย ⇒ เขียวทั้งที่ข้อหาย
⇒ เล่มที่นับเป็นสารบบ = **เล่มที่ TCV มี** (66 เล่ม) ⇒ เล่มนอกสารบบของ WEB/KJV ข้ามไป ⛔ ไม่พิมพ์รายชื่อซ้ำที่นี่

## วิธีดูของจริงว่าด่านกินเวลาเท่าไร

ด่านพิมพ์เวลาที่ใช้ไว้บรรทัดสุดท้ายของผลทุกครั้ง ⇒ ดูในบันทึกงานของท่อ ⛔ ไม่จดตัวเลขไว้ที่นี่
"""

import argparse
import gzip
import io
import json
import re
import sys
import time
import zipfile
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ที่เก็บ = Path(__file__).resolve().parent.parent
กองต้นทาง = ที่เก็บ / "source"

#: ฉบับ ⇒ (zip, ชนิด, ไฟล์ในzip) ⇒ ชนิด usx = ไฟล์ละเล่ม (ไฟล์ในzip เป็นรูปแบบชื่อ) · usfx = ไฟล์เดียวทั้งเล่ม
ต้นฉบับ = {
    "TCV": ("tcv/usx-rev2-release.zip", "usx", r"release/USX_1/([0-9A-Z]{3})\.usx$"),
    "LSV": ("lsv-rev32-release.zip", "usx", r"release/USX_1/([0-9A-Z]{3})\.usx$"),
    "THKJV": ("thaKJV_usfx.zip", "usfx", "thaKJV_usfx.xml"),
    "WEB": ("eng-web_usfx.zip", "usfx", "eng-web_usfx.xml"),
    "KJV": ("eng-kjv2006_usfx.zip", "usfx", "eng-kjv2006_usfx.xml"),
}
ฉบับที่ใช้สารบบ = "TCV"

# ---------------------------------------------------------------- ตัวอ่านต้นฉบับของด่านเอง
_โน้ต_usx = re.compile(r"<note\b[^>]*?(?:/>|>.*?</note>)", re.S)
_โน้ต_usfx = re.compile(r"<(f|x|fe)\b[^>]*?(?:/>|>.*?</\1>)", re.S)
_แท็ก = re.compile(r"<[^>]+>")


def มีเนื้อ(ชิ้น, โน้ต):
    """ข้อนี้มีตัวหนังสือจริงไหม ⇒ ตัดเชิงอรรถ ตัดแท็ก ⇒ เหลือแต่ช่องว่างหรือขีด = ไม่มี"""
    เนื้อ = _แท็ก.sub("", โน้ต.sub("", ชิ้น)).strip()
    return เนื้อ not in ("", "-")


def เลขข้อ(ค่า):
    """`1` ⇒ ['1'] · ช่วง `1-2` ⇒ ['1', '2'] ⇒ ⭐ นับเป็นทุกเลขในช่วง"""
    m = re.fullmatch(r"(\d+)[a-z]?(?:-(\d+)[a-z]?)?", ค่า.strip())
    if not m:
        raise ValueError(f"อ่านเลขข้อ {ค่า!r} ไม่ออก")
    ต้น = int(m.group(1))
    ท้าย = int(m.group(2) or ต้น)
    return [str(x) for x in range(ต้น, ท้าย + 1)]


def อ่าน_usx(ตัวหนังสือ, เก็บ, เล่ม):
    """USX ⇒ `<verse sid="GEN 1:1"/>` … `<verse eid="GEN 1:1"/>` ⇒ เก็บ {(เล่ม, บท): {ข้อที่มีเนื้อ}}"""
    เปิด = re.compile(r'<verse\b[^>]*\bsid="([^"]+)"[^>]*/>')
    for m in เปิด.finditer(ตัวหนังสือ):
        sid = m.group(1)
        ปิด = ตัวหนังสือ.find(f'eid="{sid}"', m.end())
        if ปิด < 0:
            raise ValueError(f"{เล่ม}: ข้อ {sid} ⛔ ไม่มีแท็กปิด")
        ชิ้น = ตัวหนังสือ[m.end():ตัวหนังสือ.rfind("<", m.end(), ปิด)]
        รหัส, บทข้อ = sid.split(" ", 1)
        บท, ข้อ = บทข้อ.split(":", 1)
        ที่ = เก็บ.setdefault((รหัส, str(int(บท))), set())
        if มีเนื้อ(ชิ้น, _โน้ต_usx):
            ที่.update(เลขข้อ(ข้อ))


def อ่าน_usfx(ตัวหนังสือ, เก็บ, สารบบ):
    """USFX ⇒ `<book id>` · `<c id>` · `<v id/>` … `<ve/>` ⇒ ⭐ ข้อจบที่ `<ve/>` หรือแท็กข้อ/บท/เล่มตัวถัดไป"""
    ตัวแบ่ง = re.compile(r'<book\b[^>]*\bid="([^"]+)"|<c\b[^>]*\bid="([^"]+)"|<v\b[^>]*\bid="([^"]+)"[^>]*/>|<ve\s*/>')
    เล่ม = บท = None
    ข้อค้าง, เริ่ม = None, 0

    def ปิดข้อ(ถึง):
        if ข้อค้าง is not None and เล่ม in สารบบ:
            ที่ = เก็บ.setdefault((เล่ม, บท), set())
            if มีเนื้อ(ตัวหนังสือ[เริ่ม:ถึง], _โน้ต_usfx):
                ที่.update(เลขข้อ(ข้อค้าง))

    for m in ตัวแบ่ง.finditer(ตัวหนังสือ):
        ปิดข้อ(m.start())
        ข้อค้าง = None
        if m.group(1):
            เล่ม, บท = m.group(1), None
        elif m.group(2):
            บท = str(int(m.group(2)))
        elif m.group(3):
            ข้อค้าง, เริ่ม = m.group(3), m.end()
    ปิดข้อ(len(ตัวหนังสือ))


def อ่านต้นฉบับทั้งหมด(กอง=กองต้นทาง, ตาราง=None):
    """คืน {ฉบับ: {(เล่ม, บท): {ข้อที่มีเนื้อ}}} ⇒ อ่าน zip ตรง ๆ ⛔ ไม่แตกลงดิสก์"""
    ตาราง = ตาราง or ต้นฉบับ
    ผล, สารบบ = {}, None
    for ฉบับ in [ฉบับที่ใช้สารบบ] + [x for x in ตาราง if x != ฉบับที่ใช้สารบบ]:
        ชื่อzip, ชนิด, ใน = ตาราง[ฉบับ]
        ทาง = Path(กอง) / ชื่อzip
        if ทาง.read_bytes()[:40].startswith(b"version https://git-lfs"):
            raise SystemExit(f"⛔ {ทาง} เป็นตัวชี้ของ Git LFS ⛔ ไม่ใช่ไบต์จริง\n"
                             f'   ⇒ สั่ง git -c lfs.fetchexclude= lfs pull -I "source/{ชื่อzip}"')
        เก็บ = {}
        with zipfile.ZipFile(ทาง) as z:
            if ชนิด == "usx":
                รูป = re.compile(ใน)
                for ชื่อ in sorted(z.namelist()):
                    m = รูป.search(ชื่อ)
                    if m and (สารบบ is None or m.group(1) in สารบบ):
                        อ่าน_usx(z.read(ชื่อ).decode("utf-8-sig"), เก็บ, m.group(1))
            else:
                อ่าน_usfx(z.read(ใน).decode("utf-8-sig"), เก็บ, สารบบ or set())
        if สารบบ is None:
            สารบบ = {เล่ม for เล่ม, _ in เก็บ}
        ผล[ฉบับ] = เก็บ
    return ผล


# ---------------------------------------------------------------- อ่านปลายทาง
def อ่านเว็บที่สร้างเสร็จ(ที่):
    """`api/chapter/<เล่ม>/<บท>.json` ⇒ ไฟล์ชุดเดียวกับที่เบราว์เซอร์ของผู้อ่านได้"""
    ราก = Path(ที่) / "api" / "chapter"
    if not ราก.is_dir():
        raise SystemExit(f"⛔ ไม่มี {ราก} ⇒ สร้างเว็บก่อน (npm run generate)")
    ผล = {}
    for ไฟล์ in sorted(ราก.glob("*/*.json")):
        ชั้น = json.loads(ไฟล์.read_text(encoding="utf-8"))["ชั้น"]
        for ฉบับ, ข้อ in ชั้น.items():
            ผล.setdefault(ฉบับ, {})[(ไฟล์.parent.name, ไฟล์.stem)] = set(ข้อ)
    return ผล


def อ่านซอง(ซอง, ฉบับเพิ่ม=None):
    """`_data/เนื้อบท.json.gz` (+ ซองฉบับเพิ่มถ้ามี) ⇒ ใช้ในเครื่องเมื่อยังไม่ได้สร้างเว็บ"""
    ผล = {}
    for ทาง in [ซอง, ฉบับเพิ่ม]:
        if not ทาง or not Path(ทาง).exists():
            continue
        ไบต์ = Path(ทาง).read_bytes()
        if ไบต์.startswith(b"version https://git-lfs"):
            raise SystemExit(f'⛔ {ทาง} เป็นตัวชี้ของ Git LFS ⇒ สั่ง git lfs pull -I "_data/" ก่อน')
        for คู่, ชั้น in json.loads(gzip.decompress(ไบต์))["บท"].items():
            เล่ม, บท = คู่.split("/")
            for ฉบับ, ข้อ in ชั้น.items():
                ผล.setdefault(ฉบับ, {})[(เล่ม, บท)] = set(ข้อ)
    return ผล


# ---------------------------------------------------------------- เทียบ
def เทียบ(ต้น, ปลาย):
    """คืนรายการที่ผิด ⇒ ว่าง = เขียว"""
    ผิด = []
    for ฉบับ in sorted(set(ปลาย) - set(ต้น)):
        ผิด.append(f"ฉบับ {ฉบับ} อยู่ในปลายทาง แต่ ⛔ ไม่มีต้นฉบับในตารางของด่าน ⇒ ไม่มีใครตรวจข้อของมัน")
    for ฉบับ in sorted(ต้น):
        if ฉบับ not in ปลาย:
            ผิด.append(f"ฉบับ {ฉบับ} ⛔ หายทั้งฉบับจากปลายทาง")
            continue
        for (เล่ม, บท) in sorted(set(ต้น[ฉบับ]) | set(ปลาย[ฉบับ])):
            ควร = ต้น[ฉบับ].get((เล่ม, บท), set())
            ได้ = ปลาย[ฉบับ].get((เล่ม, บท), set())
            ขาด, เกิน = ควร - ได้, ได้ - ควร
            เรียง = lambda s: ", ".join(sorted(s, key=lambda x: (len(x), x)))  # noqa: E731
            if ขาด:
                ผิด.append(f"{ฉบับ} {เล่ม} {บท} ⛔ ข้อหาย {len(ขาด)} ข้อ ⇒ {เรียง(ขาด)}")
            if เกิน:
                ผิด.append(f"{ฉบับ} {เล่ม} {บท} ⛔ ข้อเกิน (ต้นฉบับไม่มีเนื้อ) {len(เกิน)} ข้อ ⇒ {เรียง(เกิน)}")
    return ผิด


def รายงาน(ต้น, ปลาย, ละเอียด=True):
    ผิด = เทียบ(ต้น, ปลาย)
    if ละเอียด:
        for ฉบับ in sorted(ต้น):
            บท = len([k for k, v in ต้น[ฉบับ].items() if v])
            ข้อ = sum(len(v) for v in ต้น[ฉบับ].values())
            print(f"   {ฉบับ:6} ต้นฉบับ {บท:,} บท · {ข้อ:,} ข้อที่มีเนื้อ")
    if ผิด:
        print(f"\n⛔ **เลขข้อไม่ตรงต้นฉบับ {len(ผิด)} จุด**")
        for x in ผิด[:30]:
            print(f"   {x}")
        if len(ผิด) > 30:
            print(f"   … และอีก {len(ผิด) - 30} จุด")
        return 1
    if ละเอียด:
        print(f"\n✅ เลขข้อครบทุกฉบับ ({len(ต้น)} ฉบับ) ทุกบท ⇒ ตรงต้นฉบับ ⛔ ไม่ขาด ⛔ ไม่เกิน")
    return 0


# ---------------------------------------------------------------- พิสูจน์แดง-เขียว
def ทดสอบตัวเอง():
    """ทำ zip ต้นฉบับจิ๋วกับไฟล์บทของเว็บจิ๋วในที่พักชั่วคราว ⇒ ทำข้อหายทีละแบบ ⇒ ต้องแดงทุกแบบ"""
    import copy
    import tempfile

    usx = ('<usx><book code="{b}" style="id"/><chapter number="1" style="c" sid="{b} 1"/><para style="p">'
           '<verse number="1" style="v" sid="{b} 1:1"/>In the beginning<verse eid="{b} 1:1"/>'
           '<verse number="2" style="v" sid="{b} 1:2"/>and<note caller="+">a note</note> more<verse eid="{b} 1:2"/>'
           '<verse number="3" style="v" sid="{b} 1:3"/><note caller="+">only a note</note><verse eid="{b} 1:3"/>'
           '<verse number="4-5" style="v" sid="{b} 1:4-5"/>bridged<verse eid="{b} 1:4-5"/>'
           '</para><chapter number="2" style="c" sid="{b} 2"/><para style="p">'
           '<verse number="1" style="v" sid="{b} 2:1"/>two<verse eid="{b} 2:1"/></para></usx>')
    usfx = ('<usfx><book id="GEN"><c id="1"/><p><v id="1"/>first<ve/><v id="2"/>second<f>fn</f><ve/>'
            '<v id="3"/><f>only fn</f><ve/><v id="4"/>four<v id="5"/>five<ve/></p><c id="2"/><v id="1"/>x<ve/></book>'
            '<book id="TOB"><c id="1"/><v id="1"/>outside canon<ve/></book></usfx>')
    ตาราง = {"TCV": ("t.zip", "usx", r"USX_1/([0-9A-Z]{3})\.usx$"),
             "LSV": ("l.zip", "usx", r"USX_1/([0-9A-Z]{3})\.usx$"),
             "WEB": ("w.zip", "usfx", "w.xml")}
    ปลายดี = {"TCV": {("GEN", "1"): {"1", "2", "4", "5"}, ("GEN", "2"): {"1"}},
              "LSV": {("GEN", "1"): {"1", "2", "4", "5"}, ("GEN", "2"): {"1"}},
              "WEB": {("GEN", "1"): {"1", "2", "4", "5"}, ("GEN", "2"): {"1"}}}

    def แก้(ฉบับ, คู่, ทำ):
        def f():
            ป = copy.deepcopy(ปลายดี)
            ทำ(ป[ฉบับ], คู่)
            return ป
        return f

    เทส = [
        ("ของดี ⇒ เขียว", lambda: ปลายดี, 0),
        ("⭐⭐ LSV ข้อหาย 1 ข้อ (ฉบับที่ไม่ใช่ TCV)", แก้("LSV", ("GEN", "1"), lambda d, k: d[k].discard("2")), 1),
        ("⭐ WEB ข้อหาย 1 ข้อในบทที่ 2", แก้("WEB", ("GEN", "2"), lambda d, k: d[k].discard("1")), 1),
        ("⭐ ข้อท้ายของช่วง 4-5 หาย", แก้("TCV", ("GEN", "1"), lambda d, k: d[k].discard("5")), 1),
        ("LSV บทหายทั้งบท", แก้("LSV", ("GEN", "2"), lambda d, k: d.pop(k)), 1),
        ("ข้อที่มีแต่เชิงอรรถโผล่มาเป็นข้อ", แก้("WEB", ("GEN", "1"), lambda d, k: d[k].add("3")), 1),
        ("WEB หายทั้งฉบับ", lambda: {k: v for k, v in ปลายดี.items() if k != "WEB"}, 1),
        ("มีฉบับที่ด่านไม่รู้จัก", lambda: {**ปลายดี, "ใหม่": {("GEN", "1"): {"1"}}}, 1),
        ("ซ่อมแล้ว ⇒ กลับมาเขียว", lambda: ปลายดี, 0),
    ]
    ตก = 0
    print("ด่านเลขข้อครบทุกฉบับ · พิสูจน์แดง-เขียว\n")
    with tempfile.TemporaryDirectory() as ชั่วคราว:
        for ชื่อzip, (ชื่อ, เนื้อ) in {"t.zip": ("USX_1/GEN.usx", usx.format(b="GEN")),
                                       "l.zip": ("USX_1/GEN.usx", usx.format(b="GEN")),
                                       "w.zip": ("w.xml", usfx)}.items():
            with zipfile.ZipFile(Path(ชั่วคราว) / ชื่อzip, "w") as z:
                z.writestr(ชื่อ, เนื้อ)
        ต้น = อ่านต้นฉบับทั้งหมด(ชั่วคราว, ตาราง)
        # ⭐ ตัวอ่านต้องได้ของถูกก่อน ⛔ ไม่งั้นเทสข้างล่างพิสูจน์อะไรไม่ได้
        if ต้น != ปลายดี:
            print(f"⛔ ตัวอ่านต้นฉบับอ่านผิด ⇒ ได้ {ต้น}")
            return 1
        print("✅ ตัวอ่านต้นฉบับ ⇒ ตัดข้อที่มีแต่เชิงอรรถ · แตกช่วง 4-5 · ข้ามเล่มนอกสารบบ ⇒ ถูก")
        for ชื่อ, ทำ, ควรได้ in เทส:
            ได้ = รายงาน(ต้น, ทำ(), ละเอียด=False)
            ผ่าน = ได้ == ควรได้
            ตก += 0 if ผ่าน else 1
            print(f"{'✅' if ผ่าน else '⛔'} {ชื่อ} ⇒ ควรคืน {ควรได้} · คืนจริง {ได้}")
    print(f"\n{'✅ เทสผ่านครบ' if not ตก else f'⛔ เทสตก {ตก} ข้อ'}")
    return 1 if ตก else 0


def main():
    ป = argparse.ArgumentParser()
    ป.add_argument("--ที่", help="โฟลเดอร์เว็บที่สร้างเสร็จ (เช่น .output/public) ⇒ ไม่ใส่ = ตรวจซองใน _data/")
    ป.add_argument("--กอง", default=str(กองต้นทาง), help="โฟลเดอร์ zip ต้นฉบับ")
    ป.add_argument("--ทดสอบตัวเอง", action="store_true")
    ต = ป.parse_args()
    if ต.ทดสอบตัวเอง:
        return ทดสอบตัวเอง()
    เริ่ม = time.monotonic()
    ต้น = อ่านต้นฉบับทั้งหมด(ต.กอง)
    if ต.ที่:
        print(f"ด่านเลขข้อครบทุกฉบับ · ปลายทาง = ไฟล์บทของเว็บที่ {ต.ที่}")
        ปลาย = อ่านเว็บที่สร้างเสร็จ(ต.ที่)
    else:
        print("ด่านเลขข้อครบทุกฉบับ · ปลายทาง = ซอง _data/เนื้อบท.json.gz (+ _พ่น/ฉบับเพิ่ม.json.gz ถ้ามี)")
        ปลาย = อ่านซอง(ที่เก็บ / "_data" / "เนื้อบท.json.gz", ที่เก็บ / "_พ่น" / "ฉบับเพิ่ม.json.gz")
        if "KJV" not in ปลาย:
            print("   ⏸ ไม่มี _พ่น/ฉบับเพิ่ม.json.gz ⇒ ไม่ตรวจ KJV รอบนี้ (ในท่อตรวจจากเว็บที่สร้างเสร็จ ⇒ ครบทุกฉบับ)")
            ต้น.pop("KJV", None)
    ผล = รายงาน(ต้น, ปลาย)
    print(f"⏱ ใช้เวลา {time.monotonic() - เริ่ม:.1f} วินาที")
    return ผล


if __name__ == "__main__":
    sys.exit(main())
