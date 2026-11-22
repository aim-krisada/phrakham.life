#!/usr/bin/env python3
"""นับว่า **ไฟล์ของเจ้าของแต่ละฉบับ มีของอะไรให้บ้าง** ⇒ ใช้ตอบว่าเว็บเราใช้ของที่เขาให้มาครบหรือยัง
รัน  py -3.14 tools/นับของในต้นทาง.py   ⇒ พิมพ์ตารางมาร์กดาวน์ ⇒ เอาไปวางที่ `docs/บันทึก-แหล่งข้อมูล.md` หัวข้อ ⑪

⇒ ต้องมีกอง `_แตก/` ⇒ `py -3.14 tools/แตกกอง.py <ชื่อ>` ⇒ ⛔ ในท่อไม่มีกองนี้ ⇒ ตัวนี้รันในเครื่องเท่านั้น
⇒ นับเฉพาะ **66 เล่ม** ⇒ WEB มีเล่มนอกสารบบติดมาด้วย ⇒ ⛔ ไม่นับ (เหตุผลอยู่หัวข้อ ④ ของบันทึก)
⇒ ⛔ ตัวนี้ **ไม่ตัดสิน** ว่าเว็บใช้หรือยัง ⇒ แค่บอกว่าต้นทางมี ⇒ ช่อง "เว็บใช้แล้ว" ในบันทึกคนเขียนเอง พร้อมที่มา

แต่ละฉบับมาคนละรูปแบบ ⇒ ป้ายที่ความหมายเดียวกันจึงชื่อไม่เหมือนกัน
  USX  (TCV · LSV)     ⇒ `<para style=..>` `<char style=..>` `<note style=..>`
  USFM (THKJV)         ⇒ `\\p` `\\wj` ...
  USFX (WEB · KJV)     ⇒ ชื่อป้ายตรง ๆ เช่น `<wj>` `<f>` `<w s="H3068">`
"""
import collections
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ที่เก็บ = Path(__file__).resolve().parent.parent
แตก = ที่เก็บ / "_แตก"

เล่ม66 = set(
    "GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER "
    "LAM EZK DAN HOS JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL MAT MRK LUK JHN ACT ROM 1CO 2CO GAL "
    "EPH PHP COL 1TH 2TH 1TI 2TI TIT PHM HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV".split())

# ลักษณะ ⇒ ป้ายที่นับ (ชื่อกลางที่ใช้ร่วมทุกรูปแบบ)
ลักษณะ = {
    "คำพระเยซู":            {"wj"},
    "เชิงอรรถ":             {"f"},
    "ข้ออ้างอิงไขว้":        {"x"},
    "ย่อหน้า":              {"p", "m", "mi", "pm", "pmo", "pmc", "pi1", "po", "nb", "pc", "pr", "li1", "li2", "li3", "lh", "lf"},
    "บรรทัดบทกวี":          {"q", "q1", "q2", "q3", "qc", "qr", "qa", "qm1", "qm2"},
    "หัวข้อย่อย":           {"s", "s1"},
    "หัวข้อชั้นอื่น":        {"s2", "ms", "ms1", "mr"},
    "ข้อคู่ขนานใต้หัวข้อ":    {"r"},
    "หัวสดุดี":             {"d"},
    "ชื่อผู้พูด":            {"sp"},
    "เสลาห์":              {"qs"},
    "คำที่ผู้แปลเติม":        {"add"},
    "พระนามพระเจ้า":        {"nd"},
    "เลข Strong":          {"w"},
    "คำนำเล่ม":             {"ip", "is1", "ili", "iex"},
    "ตัวหนา":              {"bd"},
}
ชนิดของป้าย = {ป: ช for ช, ก in ลักษณะ.items() for ป in ก}


def นับusx(โฟลเดอร์):
    c = collections.Counter()
    for f in sorted(โฟลเดอร์.rglob("*.usx")):
        ราก = ET.parse(f).getroot()
        หนังสือ = ราก.find("book")
        if หนังสือ is None or หนังสือ.get("code") not in เล่ม66:
            continue
        for el in ราก.iter():
            ป = el.get("style")
            if el.tag == "note":
                ป = {"f": "f", "x": "x"}.get(ป)
            ช = ชนิดของป้าย.get(ป)
            if ช and el.tag in ("para", "char", "note"):
                c[ช] += 1
    return c


def นับusfm(โฟลเดอร์):
    c = collections.Counter()
    ป้าย = re.compile(r"\\(\+?[a-z]+\d*)(?![a-z\d*])")
    for f in sorted(โฟลเดอร์.glob("*.usfm")):
        t = f.read_text(encoding="utf-8-sig")
        m = re.search(r"\\id (\S+)", t)
        if not m or m.group(1) not in เล่ม66:
            continue
        for ป in ป้าย.findall(t):
            ช = ชนิดของป้าย.get(ป.lstrip("+"))
            if ช:
                c[ช] += 1
    return c


def นับusfx(ไฟล์):
    c = collections.Counter()
    for b in ET.parse(ไฟล์).getroot().iter("book"):
        if b.get("id") not in เล่ม66:
            continue
        for el in b.iter():
            ป = el.tag
            if ป in ("p", "q", "s", "b"):
                ป = el.get("style") or el.get("sfm") or ป
            ช = ชนิดของป้าย.get(ป)
            if ช:
                c[ช] += 1
    return c


ฉบับ = {
    "TCV":   lambda: นับusx(แตก / "tcv"),
    "THKJV": lambda: นับusfm(แตก / "thaKJV_usfm"),
    "WEB":   lambda: นับusfx(แตก / "eng-web_usfx" / "eng-web_usfx.xml"),
    "LSV":   lambda: นับusx(แตก / "lsv-rev32-release"),
    "KJV":   lambda: นับusfx(แตก / "eng-kjv2006_usfx" / "eng-kjv2006_usfx.xml"),
}


def main():
    ผล = {}
    for ชื่อ, นับ in ฉบับ.items():
        try:
            ผล[ชื่อ] = นับ()
        except FileNotFoundError as e:
            sys.exit("⛔ ไม่มีกอง `_แตก` ของ %s ⇒ %s" % (ชื่อ, e))
    print("| ของที่ต้นทางให้ | " + " | ".join(ผล) + " |")
    print("|---|" + "---:|" * len(ผล))
    for ช in ลักษณะ:
        if not any(ผล[ฉ][ช] for ฉ in ผล):
            continue
        print("| %s | %s |" % (ช, " | ".join(format(ผล[ฉ][ช], ",") if ผล[ฉ][ช] else "—" for ฉ in ผล)))


if __name__ == "__main__":
    main()
