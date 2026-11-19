#!/usr/bin/env python3
"""ตอบว่า **ฝั่งไหนถูก** เมื่อข้อมูลของเรากับของรุ่น 2 ไม่ตรงกัน

**ต่างจาก `tools/ทานของรุ่น-2.py` ตรงไหน**
  ตัวนั้นตอบว่า *ต่างกันกี่ข้อ* ⇒ ใบงาน v3/phrakham#23
  ตัวนี้ตอบว่า *ใครถูก และเพราะอะไร* ⇒ ใบงาน v3/phrakham#30

**ท่าที่ใช้ตัดสิน — เปิดต้นฉบับของทั้งสองฝั่ง แล้วถามว่าใครตรงกับต้นฉบับของตัวเอง**
  ① เขียนตัวอ่านขึ้นใหม่อีกตัว คนละวิธีกับของเรา แล้วอ่านต้นฉบับเดียวกัน
     ⇒ ได้ผลเท่าฝั่งไหน ฝั่งนั้นอ่านต้นฉบับถูก
  ② เรียกสคริปต์ของรุ่น 2 เอง ชี้ไปที่ต้นฉบับของเขาเอง แล้วเทียบกับผลที่เว็บเขาแสดง
     ⇒ ตรง = ตัวแปลงเขาไม่พลาด ⇒ ที่ต่างมาจากต้นฉบับคนละรุ่น
  ③ อ่านป้ายบอกรุ่นที่เจ้าของเนื้อพิมพ์ติดมากับไฟล์ ⇒ บอกว่าต้นฉบับใครใหม่กว่า

**ที่อยู่ 3 แห่งที่สคริปต์นี้อ่าน — อ่านอย่างเดียวทั้งหมด ⛔ ไม่เขียนอะไรเลย**
  กองของเรา       ⇒ `_แตก/` ของที่เก็บนี้ (สร้างด้วย `tools/แตกกอง.py`)
  ผลลัพธ์ของรุ่น 2 ⇒ `C:/gl/krisada/phrakham.life2` ⇒ เว็บที่คนใช้อยู่ทุกวัน
  ต้นฉบับของรุ่น 2 ⇒ สำเนาเต็มที่ยังเหลืออยู่บน OneDrive (`_resources/` ในที่เก็บของเขาขาดไปเกินครึ่ง)

รัน: py -3.14 tools/ใครถูก-เทียบรุ่น-2.py
คืน 0 เมื่อทุกแถวได้ผลตามที่เอกสารบอกไว้ · คืน 1 เมื่อมีแถวที่เพี้ยน
"""

import collections
import csv
import importlib.util
import io
import json
import os
import re
import sys
import unicodedata
import xml.etree.ElementTree as ET
from hashlib import sha256
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ที่เก็บ = Path(__file__).resolve().parent.parent
กอง = ที่เก็บ / "_แตก"
รุ่น2 = Path("C:/gl/krisada/phrakham.life2")
# ⭐ ต้นฉบับชุดเต็มของรุ่น 2 ⇒ `_resources/` ในที่เก็บของเขาเหลือแค่ 6 โฟลเดอร์
#    แต่สำเนาเต็มยังอยู่บน OneDrive ⇒ ใบ #30 หาเจอ ⇒ ทำให้ตัดสินฝั่ง WEB กับ LSV ได้
ต้นฉบับรุ่น2 = Path(os.environ.get("ต้นฉบับรุ่น2") or
                   r"C:/Users/aimkr/OneDrive/1 Devotional/old_phrakham.life2/_resources")

ผลรวม = []


def บอก(หัวข้อ, ได้, ควรได้):
    ตรง = ได้ == ควรได้
    ผลรวม.append((หัวข้อ, ได้, ควรได้, ตรง))
    print(f"{'✅' if ตรง else '⛔'} {หัวข้อ}\n     ได้ {ได้}\n     ควรได้ {ควรได้}")


def โหลด(ชื่อ, ทาง):
    spec = importlib.util.spec_from_file_location(ชื่อ, ทาง)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


ทาน2 = โหลด("ทาน2", ที่เก็บ / "tools" / "ทานของรุ่น-2.py")


def สรุปไฟล์(p):
    h = sha256()
    with open(p, "rb") as f:
        for ก้อน in iter(lambda: f.read(1 << 20), b""):
            h.update(ก้อน)
    return h.hexdigest()


def ข้อความล้วน(p):
    t = io.open(p, encoding="utf-8", errors="replace").read()
    return " ".join(re.sub(r"<[^>]+>", " ", t).split())


# ============================================================ ① ต้นฉบับสองฝั่งเป็นไบต์เดียวกันไหม
ไฟล์ที่ถือร่วมกัน = [
    ("MACULA ฮีบรู", "07-lemma-hebrew/macula-hebrew-main/WLC/tsv/macula-hebrew.tsv",
     "macula-hebrew-main/WLC/tsv/macula-hebrew.tsv"),
    ("MACULA กรีก", "08-lemma-greek/macula-greek-main/SBLGNT/tsv/macula-greek-SBLGNT.tsv",
     "macula-greek-main/SBLGNT/tsv/macula-greek-SBLGNT.tsv"),
    ("Strong กรีก", "09-strong-greek/strongs-dictionary-xml-master/strongsgreek.xml",
     "strongs-dictionary-xml-master/strongsgreek.xml"),
    ("Abbott-Smith", "14-abbott-smith/Abbott-Smith-master/abbott-smith.tei_lemma.xml",
     "Abbott-Smith-master/abbott-smith.tei_lemma.xml"),
    ("BDB", "13-bdb/HebrewLexicon-master/BrownDriverBriggs.xml",
     "HebrewLexicon-master/BrownDriverBriggs.xml"),
    ("Strong ฮีบรู", "13-bdb/HebrewLexicon-master/HebrewStrong.xml",
     "HebrewLexicon-master/HebrewStrong.xml"),
    ("ดัชนีศัพท์ฮีบรู", "13-bdb/HebrewLexicon-master/LexicalIndex.xml",
     "HebrewLexicon-master/LexicalIndex.xml"),
    ("SBLGNT ตัวบท (มัทธิว)", "02-sblgnt/SBLGNT-master/data/sblgnt/text/Matt.txt",
     "SBLGNT-master/data/sblgnt/text/Matt.txt"),
    ("MorphGNT (มัทธิว)", "11-morphgnt/sblgnt-master/61-Mt-morphgnt.txt",
     "morphgnt-sblgnt-master/61-Mt-morphgnt.txt"),
    ("morphhb (ปฐมกาล)", "01-wlc/morphhb-master/wlc/Gen.xml", "morphhb-master/wlc/Gen.xml"),
]


def ทานต้นฉบับร่วม():
    print("\n=== ① ต้นฉบับที่สองฝั่งถืออยู่ เป็นไบต์ชุดเดียวกันไหม")
    ตรง = []
    for ชื่อ, a, b in ไฟล์ที่ถือร่วมกัน:
        A, B = ต้นฉบับรุ่น2 / a, กอง / b
        ตรง.append("ตรง" if (A.exists() and B.exists() and สรุปไฟล์(A) == สรุปไฟล์(B)) else f"ต่าง:{ชื่อ}")
    บอก("ไฟล์ต้นฉบับที่ทั้งสองฝั่งถือเหมือนกัน",
        f"{sum(1 for x in ตรง if x == 'ตรง')} ตรง จาก {len(ตรง)}", f"{len(ไฟล์ที่ถือร่วมกัน)} ตรง จาก {len(ไฟล์ที่ถือร่วมกัน)}")


# ============================================================ ② ฉบับอังกฤษ WEB
ตัวเกาะไทย = "\u0E31\u0E34\u0E35\u0E36\u0E37\u0E38\u0E39\u0E3A\u0E47\u0E48\u0E49\u0E4A\u0E4B\u0E4C\u0E4D\u0E4E\u0E30\u0E32\u0E33\u0E45"


def อ่าน_usfx_ดิบ(ทาง):
    """ตัวอ่านตัวที่สอง — **เฉือนข้อความจากไฟล์ดิบด้วยการตัดป้ายทิ้ง**

    ⭐ **ทำไมต้องมีตัวที่สอง** ⇒ ตัวแรกของเราเดินต้นไม้ XML
       ถ้าทั้งสองตัวเขียนคนละวิธีแล้วได้ผลเท่ากัน แปลว่าผลนั้นมาจากไฟล์จริง
       ⛔ ไม่ใช่มาจากวิธีเดินต้นไม้ของเราเอง
    """
    t = io.open(ทาง, encoding="utf-8").read()
    for ป้าย in ("f", "x", "rq", "ref"):                 # เชิงอรรถกับอ้างอิงข้าม ⛔ ไม่ใช่ตัวบท
        t = re.sub(rf"<{ป้าย}\b.*?</{ป้าย}>", "", t, flags=re.S)
        t = re.sub(rf"<{ป้าย}\b[^>]*/>", "", t)
    out = {}
    for m in re.finditer(r'<v\b[^>]*bcv="([^"]+)"[^>]*/?>', t):
        j, k = t.find("<ve", m.end()), t.find("<v ", m.end())
        จบ = j if (j != -1 and (k == -1 or j < k)) else (k if k != -1 else len(t))
        เนื้อ = re.sub(r"<[^>]*>", "", t[m.end():จบ])
        try:
            bk, บท, ข้อ = m.group(1).split(".")
        except ValueError:
            continue
        osis = ทาน2.USFM2OSIS.get(bk)
        if osis:
            out[f"{osis}.{int(บท)}.{int(ข้อ)}"] = ทาน2.เล็ม(" ".join(เนื้อ.split()))
    return out


def อ่าน_usfx_ของเรา(ทาง):
    """ตัวอ่านตัวแรก — เดินต้นไม้ XML ⇒ ท่าเดียวกับ `tools/สร้างข้อมูลเว็บ.py`"""
    เก็บ, ที่ = collections.defaultdict(list), [None]

    def เดิน(el):
        if el.tag == "v":
            ที่[0] = el.get("bcv")
            if el.tail and ที่[0]:
                เก็บ[ที่[0]].append(el.tail)
            return
        if el.tag == "ve":
            ที่[0] = None
            return
        if el.tag in ทาน2.ข้ามใน_usfx:
            if el.tail and ที่[0]:
                เก็บ[ที่[0]].append(el.tail)
            return
        if el.text and ที่[0]:
            เก็บ[ที่[0]].append(el.text)
        for c in el:
            เดิน(c)
        if el.tail and ที่[0]:
            เก็บ[ที่[0]].append(el.tail)

    เดิน(ET.parse(ทาง).getroot())
    out = {}
    for bcv, ชิ้น in เก็บ.items():
        try:
            bk, บท, ข้อ = bcv.split(".")
        except ValueError:
            continue
        osis = ทาน2.USFM2OSIS.get(bk)
        if osis:
            out[f"{osis}.{int(บท)}.{int(ข้อ)}"] = ทาน2.เล็ม(re.sub(r"\s+", " ", "".join(ชิ้น)).strip())
    return out


def เรียก_etl_ของรุ่น2():
    """เรียก `build_translations.py` ของรุ่น 2 เอง ชี้ไปที่ต้นฉบับของเขาเอง"""
    bt = โหลด("bt", รุ่น2 / "etl" / "build_translations.py")
    bt.RES = ต้นฉบับรุ่น2
    return bt


def ทาน_web(ผลรุ่น2):
    print("\n=== ② ฉบับอังกฤษ WEB — ต่างกัน 5,897 ข้อ ⇒ ใครถูก")
    ไฟล์ = กอง / "eng-web_usfx" / "eng-web_usfx.xml"
    เรา, ดิบ = อ่าน_usfx_ของเรา(ไฟล์), อ่าน_usfx_ดิบ(ไฟล์)
    เก่า = ผลรุ่น2["WEB"]

    ร่วม = set(เรา) & set(ดิบ)
    บอก("ตัวอ่านสองตัวของเรา อ่านต้นฉบับเดียวกันแล้วได้ผลเท่ากันไหม",
        f"{sum(1 for k in ร่วม if เรา[k] == ดิบ[k])} ตรง จาก {len(ร่วม)}", "31103 ตรง จาก 31103")

    ต่าง = [k for k in (set(เรา) & set(เก่า)) if เรา[k] != เก่า[k]]
    บอก("⭐ ข้อที่สองฝั่งต่างกัน ⇒ ต้นฉบับที่เราถือ เข้าข้างใคร",
        f"เข้าข้างเรา {sum(1 for k in ต่าง if ดิบ.get(k) == เรา[k])} · "
        f"เข้าข้างรุ่น 2 {sum(1 for k in ต่าง if ดิบ.get(k) == เก่า[k])} · จาก {len(ต่าง)}",
        "เข้าข้างเรา 5897 · เข้าข้างรุ่น 2 0 · จาก 5897")

    bt = เรียก_etl_ของรุ่น2()
    สร้างซ้ำ = {k: bt.strip_quotes(v) for k, v in bt.web().items()}
    ร่วม2 = set(สร้างซ้ำ) & set(เก่า)
    บอก("เรียกตัวแปลงของรุ่น 2 เอง ชี้ที่ต้นฉบับของเขาเอง ⇒ ได้ผลเท่าที่เว็บเขาแสดงไหม",
        f"{sum(1 for k in ร่วม2 if สร้างซ้ำ[k] == เก่า[k])} ตรง จาก {len(ร่วม2)}", "31103 ตรง จาก 31103")

    ปกเรา = ข้อความล้วน(กอง / "eng-web_usfx" / "copr.htm")
    ปกเขา = ข้อความล้วน(ต้นฉบับรุ่น2 / "05-web" / "world-english-bible-master" / "html" / "copyright.htm")
    บอก("ป้ายบอกรุ่นที่เจ้าของเนื้อพิมพ์ติดมากับไฟล์",
        f"เรา “{'2020 stable text edition' if '2020 stable text edition' in ปกเรา else 'ไม่พบ'}” · "
        f"รุ่น 2 สร้างเมื่อ “{(re.search(r'Haiola by eBible.org (.{11})', ปกเขา) or ['', 'ไม่พบ'])[1]}”",
        "เรา “2020 stable text edition” · รุ่น 2 สร้างเมื่อ “14 Jun 2017”")

    บอก("รูที่ผลลัพธ์ของรุ่น 2 ⇒ ข้อที่คำว่า Selah หายไป",
        f"{len([k for k in เรา if 'Selah' in เรา[k] and 'Selah' not in เก่า.get(k, '')])} ข้อ", "74 ข้อ")
    บอก("รูที่ผลลัพธ์ของรุ่น 2 ⇒ ข้อที่มีช่องว่างซ้อนตรงที่เชิงอรรถเคยอยู่",
        f"รุ่น 2 {len([k for k in เก่า if '  ' in เก่า[k]])} ข้อ · เรา {len([k for k in เรา if '  ' in เรา[k]])} ข้อ",
        "รุ่น 2 85 ข้อ · เรา 0 ข้อ")


# ============================================================ ③ ฉบับ LSV
def ทาน_lsv():
    print("\n=== ③ ฉบับ LSV — รุ่น 2 ขาด 1-3 ยอห์น 133 ข้อ ⇒ เพราะอะไร")
    bt = เรียก_etl_ของรุ่น2()
    usx = list((ต้นฉบับรุ่น2 / "06-lsv" / "lsv-from-open.bible").rglob("*.usx"))
    บอก("ต้นฉบับ USX ของ LSV ที่รุ่น 2 ตั้งใจใช้ มีกี่เล่ม",
        f"{len(usx)} เล่ม ⇒ ตัวแปลงเขาจึงถอยไปอ่านไฟล์ข้อความล้วนแทน", "0 เล่ม ⇒ ตัวแปลงเขาจึงถอยไปอ่านไฟล์ข้อความล้วนแทน")

    รหัสในไฟล์ = collections.Counter()
    pat = re.compile(r"^(\S+) (\d+):(\d+) (.*)$")
    for บรรทัด in io.open(ต้นฉบับรุ่น2 / "06-lsv" / "The Holy Bible (LSV).txt", encoding="utf-8"):
        m = pat.match(บรรทัด.rstrip("\n"))
        if m:
            รหัสในไฟล์[m.group(1)] += 1
    หลุด = {k: n for k, n in รหัสในไฟล์.items() if k not in bt.LSV2OSIS}
    บอก("⭐ ต้นเหตุ ⇒ รหัสเล่มในไฟล์ข้อความล้วน ที่ตารางแปลงชื่อของรุ่น 2 ไม่รู้จัก",
        f"{sorted(หลุด)} รวม {sum(หลุด.values())} ข้อ", "['1Jn', '2Jn', '3Jn'] รวม 132 ข้อ")
    บอก("ตารางของรุ่น 2 เขียนรหัส 1-3 ยอห์นไว้ว่าอะไร",
        f"{[k for k in bt.LSV2OSIS if k.endswith('Jo')]}", "['1Jo', '2Jo', '3Jo']")


# ============================================================ ④ ฉบับไทย KJV
def ทาน_thkjv(ผลรุ่น2):
    print("\n=== ④ ฉบับไทย KJV — คนละต้นทาง ⇒ ต่างกันแค่ไหน")
    bt = เรียก_etl_ของรุ่น2()
    เก่า = ผลรุ่น2["THKJV"]
    สร้างซ้ำ = {k: bt.strip_quotes(v) for k, v in bt.thkjv().items()}
    ร่วม = set(สร้างซ้ำ) & set(เก่า)
    บอก("เรียกตัวแปลงของรุ่น 2 เอง ชี้ที่ไฟล์ Beblia ของเขาเอง ⇒ ได้ผลเท่าที่เว็บเขาแสดงไหม",
        f"{sum(1 for k in ร่วม if สร้างซ้ำ[k] == เก่า[k])} ตรง จาก {len(ร่วม)}", "31102 ตรง จาก 31102")

    ไฟล์ = กอง / "thaKJV_usfx" / "thaKJV_usfx.xml"
    เรา = {k: v.replace("\u200b", "") for k, v in อ่าน_usfx_ของเรา(ไฟล์).items()}
    ร่วม = set(เรา) & set(เก่า)
    ต่าง = [k for k in ร่วม if เรา[k] != เก่า[k]]
    แค่ช่องว่าง = sum(1 for k in ต่าง if re.sub(r"\s+", "", เรา[k]) == re.sub(r"\s+", "", เก่า[k]))
    บอก("ตัดจุดขึ้นบรรทัดใหม่ทิ้งแล้ว สองต้นทางต่างกันกี่ข้อ",
        f"ตรง {len(ร่วม) - len(ต่าง)} · ต่างที่ตัวอักษรจริง {len(ต่าง) - แค่ช่องว่าง} · ต่างแค่ช่องว่าง {แค่ช่องว่าง}",
        "ตรง 30375 · ต่างที่ตัวอักษรจริง 725 · ต่างแค่ช่องว่าง 2")

    t = io.open(ไฟล์, encoding="utf-8").read()
    บอก("⚠ ของเราเอง ⇒ จุดขึ้นบรรทัดใหม่ในไฟล์ต้นฉบับ ที่วางไว้หน้าสระหรือวรรณยุกต์",
        f"{len(re.findall('\u200b[' + ตัวเกาะไทย + ']', t))} จุด จากทั้งหมด {t.count(chr(0x200b))} จุด",
        "36900 จุด จากทั้งหมด 270844 จุด")


# ============================================================ ⑤ ชั้นคำกรีก
def ทานกรีก():
    print("\n=== ⑤ ชั้นคำกรีก — คนละต้นทาง ⇒ เทียบด้วยรหัสประจำคำ")
    U2O = dict(zip(ทาน2.พธใ_USFM, ทาน2.พธใ))
    เรา = collections.defaultdict(list)
    ไฟล์ = กอง / "macula-greek-main" / "SBLGNT" / "tsv" / "macula-greek-SBLGNT.tsv"
    with io.open(ไฟล์, encoding="utf-8", newline="") as f:
        for x in csv.DictReader(f, delimiter="\t"):
            try:
                bk, ที่เหลือ = x["ref"].split(" ", 1)
                บท, ข้อ = ที่เหลือ.split("!", 1)[0].split(":")
            except ValueError:
                continue
            if bk in U2O:
                เรา[(U2O[bk], บท, ข้อ)].append(("G" + (x["strong"] or "").strip(), x["text"]))
    เก่า = collections.defaultdict(list)
    for b in ทาน2.พธใ:
        for บท, vv in json.load(io.open(รุ่น2 / "webdata" / "books" / f"{b}.json", encoding="utf-8")).items():
            for ข้อ, เนื้อ in vv.items():
                for w in (เนื้อ.get("g") or []):
                    เก่า[(b, บท, ข้อ)].append((w.get("id", ""), w.get("s", "")))

    def เปลือย(w):
        s = unicodedata.normalize("NFD", w).lower()
        return "".join(c for c in s if unicodedata.category(c) != "Mn")

    นับ = collections.Counter()
    for k in set(เรา) & set(เก่า):
        ta, tb = [เปลือย(x[1]) for x in เรา[k]], [เปลือย(x[1]) for x in เก่า[k]]
        if ta != tb:
            นับ["ตัวบทกรีกคนละฉบับ"] += 1
        elif [x[0] for x in เรา[k]] == [x[0] for x in เก่า[k]]:
            นับ["คำเหมือน รหัสตรง"] += 1
        else:
            นับ["คำเหมือน แต่รหัสคนละระบบ"] += 1
    บอก("⭐ แยกว่าต่างเพราะอะไร",
        f"คำเหมือน รหัสตรง {นับ['คำเหมือน รหัสตรง']} · คำเหมือน แต่รหัสคนละระบบ {นับ['คำเหมือน แต่รหัสคนละระบบ']} · "
        f"ตัวบทกรีกคนละฉบับ {นับ['ตัวบทกรีกคนละฉบับ']}",
        "คำเหมือน รหัสตรง 2205 · คำเหมือน แต่รหัสคนละระบบ 4100 · ตัวบทกรีกคนละฉบับ 1633")
    บอก("ข้อที่มีชั้นคำกรีกฝั่งใดฝั่งหนึ่งเท่านั้น",
        f"เฉพาะรุ่น 2 {sorted('.'.join(k) for k in set(เก่า) - set(เรา))} · "
        f"เฉพาะเรา {sorted('.'.join(k) for k in set(เรา) - set(เก่า))}",
        "เฉพาะรุ่น 2 ['Rom.16.25', 'Rom.16.26', 'Rom.16.27'] · เฉพาะเรา ['Rom.16.24']")


def main():
    if not กอง.exists():
        raise SystemExit("ยังไม่มีโฟลเดอร์ _แตก/ ⇒ สร้างก่อนด้วย tools/แตกกอง.py")
    if not (รุ่น2 / "webdata" / "books").exists():
        raise SystemExit(f"ไม่พบผลลัพธ์ของรุ่น 2 ที่ {รุ่น2}")
    if not ต้นฉบับรุ่น2.exists():
        raise SystemExit(f"ไม่พบต้นฉบับชุดเต็มของรุ่น 2 ที่ {ต้นฉบับรุ่น2}\n"
                         "   ⇒ ตั้งที่อยู่เองได้ด้วยตัวแปรสภาพแวดล้อม ต้นฉบับรุ่น2")
    ผลรุ่น2 = ทาน2.ตัวบทของรุ่น2()
    ทานต้นฉบับร่วม()
    ทาน_web(ผลรุ่น2)
    ทาน_lsv()
    ทาน_thkjv(ผลรุ่น2)
    ทานกรีก()
    เพี้ยน = [r for r in ผลรวม if not r[3]]
    print(f"\n{'=' * 60}\nทานทั้งหมด {len(ผลรวม)} แถว · ตรงกับที่เอกสารเขียนไว้ {len(ผลรวม) - len(เพี้ยน)} · เพี้ยน {len(เพี้ยน)}")
    if เพี้ยน:
        print("⛔ แถวที่เพี้ยน ⇒ ต้นฉบับหรือของรุ่น 2 ขยับ ⇒ เปิดดูเองก่อนแก้ตัวเลขในเอกสาร")
        for หัวข้อ, ได้, ควร, _ in เพี้ยน:
            print(f"   {หัวข้อ}: ได้ {ได้} · ควรได้ {ควร}")
    return 1 if เพี้ยน else 0


if __name__ == "__main__":
    sys.exit(main())
