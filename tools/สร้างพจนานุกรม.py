#!/usr/bin/env python3
"""พ่น **พจนานุกรม 4 แหล่ง** ให้การ์ดความหมายคำของหน้าอ่านหยิบไปใช้ (ใบงาน v3/phrakham#103)

รัน  py -3.14 tools/สร้างพจนานุกรม.py            ⇒ เขียน `_พ่น/พจนานุกรม/<แหล่ง>.json.gz`
⇒ ต้องมีไบต์จริงของ zip 3 ไฟล์ใน `source/` ⇒ `git -c lfs.fetchexclude= lfs pull -I "<ไฟล์>"`

ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/103

## แหล่งที่พ่นที่นี่ ⇒ อ่านจาก zip ต้นทางตรง ๆ ⛔ ไม่ต้องมีกอง `_แตก`

| แหล่ง | ไฟล์ใน zip | สัญญา (เปิดอ่านจากไฟล์ในที่เก็บเอง 24 ต.ค. 2569) |
|---|---|---|
| `strong-grc` | `strongs-dictionary-xml-master/strongsgreek.xml` | CC0 ⇒ `README.md` ของที่เก็บนั้น |
| `strong-hbo` | `HebrewLexicon-master/HebrewStrong.xml` | CC BY 4.0 ⇒ `readme.md` ⇒ ต้องให้เครดิต Open Scriptures Hebrew Bible Project |
| `bdb` | `HebrewLexicon-master/BrownDriverBriggs.xml` | เหมือนแถวบน |
| `abbott-smith` | `Abbott-Smith-master/abbott-smith.tei.xml` | สาธารณสมบัติ ⇒ `README.md` ⇒ ⛔ ไม่ใช้ไฟล์ PDF ในที่เก็บนั้น |

⭐ **UBS Dictionary ⛔ ไม่ได้พ่นที่นี่** ⇒ ความหมายของ UBS อยู่ที่ `_data/ความหมาย/คลัง-*.json.gz` แล้ว
  (ใบ #84 พ่นและตรึงลายนิ้วมือไว้) ⇒ หลังบ้านอ่านจากที่นั่นตรง ๆ ⇒ ⛔ ไม่มีสำเนาที่สอง

## ⛔⛔ ข้อความต้องตรงต้นทางทุกตัวอักษร (เกณฑ์ข้อ 10 ของใบ)

⇒ ตัวพ่นนี้ **⛔ ไม่ย่อ ⛔ ไม่แปล ⛔ ไม่ตัดช่องว่าง** ⇒ ยกตัวหนังสือทุกชิ้นใน `<entry>` มาตามลำดับเดิม
⇒ ผลออกมาเป็น **รายการชิ้น** ⇒ ชิ้นมี 3 แบบ
  1. **ข้อความ** (สตริงเปล่า) ⇒ ตัวหนังสือในไฟล์ต้นทางตรงตัว
  2. **ข้อความที่ติดป้าย** `[ชนิด, ข้อความ]` ⇒ ตัวหนังสือในไฟล์ต้นทางตรงตัว แต่ให้หน้าจอแต่งต่างได้
     ⇒ ชนิดอยู่ใน `ป้ายข้อความ` ข้างล่าง ⇒ เช่นหัวคำ คำนิยาม จำนวนครั้งที่พบ
  3. **ค่าจากแอตทริบิวต์** `[ชนิด, ค่า]` ⇒ ของที่ไฟล์ต้นทางเก็บไว้ในแอตทริบิวต์ ⛔ ไม่ใช่ตัวหนังสือ
     ⇒ เช่นคำกรีกของ Strong (`<greek unicode="…"/>`) เลขข้อย่อยของความหมาย (`<sense n="1.">`)
     ⇒ ⛔ **ไม่ยกมา = หัวคำกรีกหายทั้งเล่ม** เพราะ Strong ฝั่งกรีกเก็บคำกรีกไว้ในแอตทริบิวต์อย่างเดียว
  4. **หมุดตอน** `["ตอน", ชื่อ]` ⇒ ⛔ ไม่มีตัวหนังสือ ⇒ บอกหน้าจอว่าขึ้นตอนใหม่ เช่น *ที่มาของคำ*
⇒ ⭐ **ด่านเทียบต้นทาง (`tools/ด่านความหมายตรงต้นทาง.py`) เปิดไฟล์ต้นทางเองอีกรอบ**
  แล้วตรวจว่า ⇒ ข้อความทุกชิ้นต่อกันแล้ว **เท่ากับตัวหนังสือทั้งหมดของ entry นั้นเป๊ะ**
  และค่าจากแอตทริบิวต์ **ตรงกับแอตทริบิวต์ในไฟล์ต้นทางตามลำดับ** ⇒ ⛔ ไม่ใช้โค้ดของไฟล์นี้

### ⛔ ของที่จงใจ ⛔ ไม่ยกมา ⇒ เขียนไว้ที่นี่ที่เดียว ⇒ ด่านใช้รายการเดียวกันนี้

| แหล่ง | ไม่ยกอะไร | ทำไม |
|---|---|---|
| `bdb` | ตัวหนังสือใน `<status>` เช่น `base` `ref` `done` | **สถานะงานถอดข้อมูลของ Open Scriptures** ⛔ ไม่ใช่ถ้อยคำของ BDB ⇒ ยกเลขหน้า `p` มาแทน |
| `strong-grc` | แอตทริบิวต์ `BETA` ของ `<greek>` | คำกรีกตัวเดียวกับ `unicode` แต่เขียนด้วยรหัส ASCII |
| ทุกแหล่ง | แอตทริบิวต์ที่เป็นรหัสภายใน เช่น `pos="v"` `osisRef` | ตัวหนังสือที่คนอ่านเห็นอยู่ในเนื้อแล้ว |

## ⛔⛔ รหัสฮีบรูที่มีตัวอักษรท้าย ⛔ ไม่ใช่เลข Strong

⇒ วัดจากชั้นคำทั้งพันธสัญญาเดิม ⇒ `0871a` คือคำ בְּ (ใน) แต่ Strong 871 คือชื่อสถานที่ อาธาริม
⇒ ตัดตัวอักษรทิ้งแล้วไปเปิด Strong = **ได้ความหมายผิดคำเงียบ ๆ**
⇒ ⭐ **รหัสมีตัวอักษรเปิดได้เฉพาะเมื่อดัชนีของ Open Scriptures เองชี้ทาง**
  `AugIndex.xml` (รหัส ⇒ หัวคำ) ⇒ `LexicalIndex.xml` (หัวคำ ⇒ เลข Strong และเลข BDB)
⇒ ⛔ ดัชนีไม่ชี้ ⇒ ⛔ ไม่ใส่ ⇒ การ์ดบอกผู้อ่านตรง ๆ ว่าแหล่งนี้ไม่มีคำนี้

## รูปของซอง

```
{ "แหล่ง": "strong-grc",
  "ก้อน": { "<เลขก้อน>": { "<กุญแจ>": [ {"id": "<รหัสในต้นทาง>", "ชิ้น": [ ... ]} ] } } }
```

⇒ **กุญแจ** = รหัส Strong ของคำในชั้นคำ ที่ตัดเลข 0 นำหน้าทิ้ง ⇒ `0871a` ⇒ `871a` · `2532` ⇒ `2532`
⇒ **เลขก้อน** = ตัวเลขของกุญแจหารด้วย 100 ปัดลง ⇒ หน้าเว็บโหลดทีละก้อนตอนผู้อ่านกดคำ
  ⇒ ท่านี้ยกความคิดมาจาก `loadLex` ของรุ่น 2 (`assets/pk-core.js`) ⇒ แบ่งไฟล์ตามเลข Strong
⇒ กุญแจเดียวมีได้หลายรายการ ⇒ เช่น Strong 1 เลขแตกเป็นหลายหัวคำใน BDB ⇒ **แสดงทุกรายการ** ⛔ ไม่เลือกเอง
"""

import argparse
import gzip
import io
import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ที่เก็บ = Path(__file__).resolve().parent.parent

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

กองต้นทาง = ที่เก็บ / "source"
# ⛔⛔ **วางนอก `_data/`** ⇒ เหตุผลเดียวกับ `tools/สร้างคำพระเยซู.py` ⛔ ไม่จดซ้ำที่นี่
ปลายทาง = ที่เก็บ / "_พ่น" / "พจนานุกรม"

OSHB = "{http://openscriptures.github.com/morphhb/namespace}"
TEI = "{http://www.crosswire.org/2013/TEIOSIS/namespace}"

# ไฟล์ต้นทางของแต่ละแหล่ง ⇒ (zip, ไฟล์ในนั้น)
ไฟล์ของแหล่ง = {
    "strong-grc": ("strongs-dictionary-xml-master.zip", "strongs-dictionary-xml-master/strongsgreek.xml"),
    "strong-hbo": ("HebrewLexicon-master.zip", "HebrewLexicon-master/HebrewStrong.xml"),
    "bdb": ("HebrewLexicon-master.zip", "HebrewLexicon-master/BrownDriverBriggs.xml"),
    "abbott-smith": ("Abbott-Smith-master.zip", "Abbott-Smith-master/abbott-smith.tei.xml"),
}
ดัชนีฮีบรู = {
    "aug": ("HebrewLexicon-master.zip", "HebrewLexicon-master/AugIndex.xml"),
    "lex": ("HebrewLexicon-master.zip", "HebrewLexicon-master/LexicalIndex.xml"),
}

# ---------------------------------------------------------------- กติกาการยกชิ้น ⇒ ด่านใช้ร่วม
# ⭐ **กติกาเป็นข้อมูล ⛔ ไม่ใช่โค้ด** ⇒ ด่านเทียบต้นทาง `import` สามตารางนี้ไปใช้ตัดสินว่า
#   *อะไรบ้างที่ต้องตรงกับต้นทาง* ⇒ ⛔ แต่ ⛔ ไม่ได้ใช้ฟังก์ชันยกชิ้นของไฟล์นี้

#: ⛔ แท็กที่ **ไม่ยกตัวหนังสือ** ⇒ เหตุผลอยู่ที่ตารางหัวไฟล์
แท็กไม่ยกตัวหนังสือ = {"bdb": {"status"}}

#: แอตทริบิวต์ที่ยกมาเป็นชิ้น ⇒ {แหล่ง: {แท็ก: [(แอตทริบิวต์, ชนิดชิ้น), ...]}}
#   ⇒ ลำดับในรายการคือลำดับที่วางลงชิ้น ⇒ ด่านเทียบลำดับนี้ด้วย
แอตทริบิวต์ที่ยก = {
    "strong-grc": {
        "greek": [("unicode", "คำ"), ("translit", "อ่าน")],
        "pronunciation": [("strongs", "เสียง")],
        "strongsref": [("strongs", "อ้าง")],
    },
    "strong-hbo": {"w": [("xlit", "อ่าน"), ("pron", "เสียง")]},
    "bdb": {"status": [("p", "หน้า")], "sense": [("n", "ข้อ")]},
    "abbott-smith": {"sense": [("n", "ข้อ")]},
}

#: แท็กที่ค่าจากแอตทริบิวต์ต้อง **วางหลังตัวหนังสือ** ⇒ หัวคำฮีบรูของ Strong คือ `<w xlit pron>רֵאשִׁית</w>`
#:   ⇒ คำอ่านควรตามหลังตัวคำ ⛔ ไม่ใช่นำหน้า ⇒ แท็กอื่นวางก่อน เช่นเลขข้อ `1.` ต้องมาก่อนเนื้อ
แอตทริบิวต์วางหลัง = {"strong-hbo": {"w"}}

#: แท็กที่ตัวหนังสือติดป้ายให้หน้าจอแต่งต่าง ⇒ {แหล่ง: {แท็ก: ชนิด}} ⇒ ใช้เมื่อแท็กนั้น ⛔ ไม่มีลูก
ป้ายข้อความ = {
    "strong-grc": {"strongs": "เลข"},
    "strong-hbo": {"def": "นิยาม"},
    "bdb": {"def": "นิยาม", "w": "หัว"},
    "abbott-smith": {"orth": "หัว", "gloss": "นิยาม"},
}
#: note ของ Abbott-Smith ที่เป็นจำนวนครั้งที่พบในพันธสัญญาใหม่ ⇒ ติดป้าย `นับ`
ป้ายของโน้ต = {"abbott-smith": {"occurrencesNT": "นับ"}}

#: หมุดตอน ⇒ ⛔ ไม่มีตัวหนังสือ ⇒ หน้าจอขึ้นบรรทัดใหม่พร้อมชื่อตอนเป็นภาษาไทย
หมุดตอน = {
    "strong-grc": {"strongs_derivation": "ที่มา", "strongs_def": "ความหมาย", "kjv_def": "KJV"},
    "strong-hbo": {"source": "ที่มา", "meaning": "ความหมาย", "usage": "KJV"},
}


def ชื่อแท็ก(e):
    return e.tag.rsplit("}", 1)[-1]


def ยกชิ้น(แหล่ง, entry):
    """entry ⇒ รายการชิ้น ⇒ **ตัวหนังสือทุกตัวตามลำดับเดิม** ⛔ ไม่ตัด ⛔ ไม่ตกแต่ง"""
    ชิ้น = []
    ไม่ยก = แท็กไม่ยกตัวหนังสือ.get(แหล่ง, set())
    แอต = แอตทริบิวต์ที่ยก.get(แหล่ง, {})
    ป้าย = ป้ายข้อความ.get(แหล่ง, {})
    โน้ต = ป้ายของโน้ต.get(แหล่ง, {})
    หมุด = หมุดตอน.get(แหล่ง, {})

    def ข้อความ(t):
        if t:
            ชิ้น.append(t)

    def วางแอตทริบิวต์(e, ท):
        for ชื่อ, ชนิด in แอต.get(ท, []):
            ค่า = e.get(ชื่อ)
            if ค่า is None:
                continue
            if ชนิด == "อ้าง":
                # ⭐ อ้างเลข Strong ⇒ ติดอักษรภาษา G/H ⇒ ยกจากแอตทริบิวต์ `language` ของแท็กเดียวกัน
                ค่า = {"GREEK": "G", "HEBREW": "H"}.get(e.get("language", ""), "?") + ค่า.lstrip("0")
            ชิ้น.append([ชนิด, ค่า])

    def เดิน(e):
        ท = ชื่อแท็ก(e)
        if ท in หมุด:
            ชิ้น.append(["ตอน", หมุด[ท]])
        หลัง = ท in แอตทริบิวต์วางหลัง.get(แหล่ง, set())
        # แอตทริบิวต์ ⇒ **ปกติวางก่อนตัวหนังสือของแท็ก** ⇒ เช่นเลขข้อ `1.` มาก่อนเนื้อความหมายข้อนั้น
        if not หลัง:
            วางแอตทริบิวต์(e, ท)
        if ท in ไม่ยก:
            return
        เดินเนื้อ(e, ท)
        if หลัง:
            วางแอตทริบิวต์(e, ท)

    def เดินเนื้อ(e, ท):
        ชนิดโน้ต = โน้ต.get(e.get("type", "")) if ท == "note" else None
        ชนิดป้าย = ชนิดโน้ต or ป้าย.get(ท)
        if ชนิดป้าย and len(e) == 0 and e.text:
            ชิ้น.append([ชนิดป้าย, e.text])
        else:
            ข้อความ(e.text)
            for ลูก in e:
                เดิน(ลูก)
                ข้อความ(ลูก.tail)

    # ตัว entry เอง ⇒ ⛔ ไม่ยกแอตทริบิวต์ของมัน (เป็นรหัสภายใน) ⇒ ยกแต่เนื้อใน
    ข้อความ(entry.text)
    for ลูก in entry:
        เดิน(ลูก)
        ข้อความ(ลูก.tail)
    # รวมข้อความเปล่าที่ติดกัน ⇒ ไฟล์เล็กลง ⇒ ตัวหนังสือเท่าเดิมทุกตัว
    รวม = []
    for c in ชิ้น:
        if isinstance(c, str) and รวม and isinstance(รวม[-1], str):
            รวม[-1] += c
        else:
            รวม.append(c)
    return รวม


# ---------------------------------------------------------------- อ่านต้นทาง
def อ่านxml(zip_, ไฟล์):
    ทาง = กองต้นทาง / zip_
    หัว = ทาง.read_bytes()[:40] if ทาง.exists() else b""
    if b"git-lfs" in หัว:
        ตาย(f"{ทาง} ยังเป็นตัวชี้ของ Git LFS ⇒ สั่ง  git -c lfs.fetchexclude= lfs pull -I \"source/{zip_}\"")
    if not ทาง.exists():
        ตาย(f"ไม่มี {ทาง}")
    with zipfile.ZipFile(ทาง) as z:
        return ET.fromstring(z.read(ไฟล์))


def ตาย(ข้อความ):
    print("⛔ " + ข้อความ)
    raise SystemExit(1)


def กุญแจของรหัส(รหัส):
    """รหัสในชั้นคำ ⇒ กุญแจ ⇒ ตัดเลข 0 นำหน้า ⇒ `0871a` ⇒ `871a` (หน้าเว็บใช้กติกาเดียวกัน)"""
    return รหัส.lstrip("0") or "0"


def เลขก้อน(กุญแจ):
    m = re.match(r"\d+", กุญแจ)
    return str(int(m.group()) // 100) if m else None


def ดัชนีฮีบรูของ():
    """คืน (aug ⇒ หัวคำ) · (หัวคำ ⇒ แอตทริบิวต์ xref) · (เลข Strong ⇒ [หัวคำ…])"""
    aug = {w.get("aug"): w.text for w in อ่านxml(*ดัชนีฮีบรู["aug"]).iter(OSHB + "w")}
    xref, ตามstrong = {}, {}
    for e in อ่านxml(*ดัชนีฮีบรู["lex"]).iter(OSHB + "entry"):
        x = e.find(OSHB + "xref")
        a = dict(x.attrib) if x is not None else {}
        xref[e.get("id")] = a
        if a.get("strong"):
            ตามstrong.setdefault(a["strong"], []).append(e.get("id"))
    return aug, xref, ตามstrong


def กุญแจฮีบรูของหัวคำ(aug, xref, ตามstrong):
    """คืน {กุญแจ: [หัวคำในดัชนี…]} ⇒ ทางเดียวที่รหัสฮีบรูเดินไปถึงพจนานุกรมได้

    ⭐ รหัสตัวเลขล้วน ⇒ หัวคำทุกตัวที่ `LexicalIndex` บอกว่าเป็นเลข Strong นั้น
    ⭐ รหัสมีตัวอักษร ⇒ เฉพาะที่ `AugIndex` ชี้ไปหาหัวคำ ⇒ ⛔ ไม่ตัดตัวอักษรทิ้งเอง (เหตุผลที่หัวไฟล์)
    """
    # ⛔ ช่อง `strong` ที่ ⛔ ไม่ใช่ตัวเลขล้วน ⇒ ⛔ ไม่ใช่เลข Strong ที่ชั้นคำใช้ ⇒ ข้าม (นับไว้ใน `ข้าม`)
    ทาง = {s: list(ids) for s, ids in ตามstrong.items() if s.isdigit()}
    ข้าม = sorted(s for s in ตามstrong if not s.isdigit())
    if ข้าม:
        print(f"   ⚠️ LexicalIndex มีช่อง strong ที่ไม่ใช่ตัวเลขล้วน {len(ข้าม)} ค่า ⇒ ข้าม ⇒ ตัวอย่าง {ข้าม[:5]}")
    for a, หัวคำ in aug.items():
        if re.fullmatch(r"\d+[a-z]", a) and หัวคำ in xref:
            ทาง.setdefault(a, []).append(หัวคำ)
    return ทาง


def พ่นแหล่ง(แหล่ง):
    """คืน {กุญแจ: [{"id", "ชิ้น"}]}"""
    ราก = อ่านxml(*ไฟล์ของแหล่ง[แหล่ง])
    ตาม = {}

    def ใส่(กุญแจ, id_, entry):
        ตาม.setdefault(กุญแจ, []).append({"id": id_, "ชิ้น": ยกชิ้น(แหล่ง, entry)})

    if แหล่ง == "strong-grc":
        for e in ราก.iter("entry"):
            ใส่(กุญแจของรหัส(e.get("strongs")), e.get("strongs"), e)
    elif แหล่ง == "abbott-smith":
        for e in ราก.iter(TEI + "entry"):
            n = e.get("n", "")
            # ⭐ `n="ἄδολος|G97"` ⇒ entry ที่ ⛔ ไม่มีเลข G ⇒ ⛔ ไม่มีทางเดินมาจากชั้นคำ ⇒ ไม่ใส่
            for g in re.findall(r"G(\d+)", n.split("|", 1)[1] if "|" in n else ""):
                ใส่(กุญแจของรหัส(g), n, e)
    elif แหล่ง in ("strong-hbo", "bdb"):
        aug, xref, ตามstrong = ดัชนีฮีบรูของ()
        ทาง = กุญแจฮีบรูของหัวคำ(aug, xref, ตามstrong)
        ของ = {e.get("id"): e for e in ราก.iter(OSHB + "entry")}
        if แหล่ง == "strong-hbo":
            # ⭐ เลข Strong ตัวเลขล้วน ⇒ เปิดตรงที่ `H<เลข>` ⇒ ⛔ ไม่ต้องผ่านดัชนี
            #   ⇒ ดัชนีใช้เฉพาะรหัสมีตัวอักษรข้างล่าง ⇒ ⛔ ไม่ให้ `H<เลข>` หายเพราะดัชนีขาดแถว
            for id_, e in ของ.items():
                ใส่(id_[1:], id_, e)
            ทาง = {k: v for k, v in ทาง.items() if not k.isdigit()}
        for กุญแจ in sorted(ทาง, key=lambda k: (int(re.match(r"\d+", k).group()), k)):
            เห็น = set()
            for หัวคำ in ทาง[กุญแจ]:
                x = xref[หัวคำ]
                id_ = ("H" + x["strong"]) if แหล่ง == "strong-hbo" and x.get("strong") else x.get("bdb") if แหล่ง == "bdb" else None
                if id_ and id_ in ของ and id_ not in เห็น:
                    เห็น.add(id_)
                    ใส่(กุญแจ, id_, ของ[id_])
    return ตาม


def ห่อ(ของ):
    เนื้อ = json.dumps(ของ, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")
    ถัง = io.BytesIO()
    # mtime=0 ⇒ ข้อมูลเท่าเดิมได้ไบต์เท่าเดิม (ท่าเดียวกับ `tools/สร้างเนื้อบท.py`)
    with gzip.GzipFile(fileobj=ถัง, mode="wb", compresslevel=9, mtime=0) as ซ:
        ซ.write(เนื้อ)
    return ถัง.getvalue()


def แบ่งก้อน(ตาม):
    ก้อน = {}
    for กุญแจ, รายการ in ตาม.items():
        ล = เลขก้อน(กุญแจ)
        if ล is None:
            ตาย(f"กุญแจ {กุญแจ} ไม่มีตัวเลข ⇒ แบ่งก้อนไม่ได้")
        ก้อน.setdefault(ล, {})[กุญแจ] = รายการ
    return ก้อน


def main():
    ป = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ป.add_argument("--แหล่ง", nargs="*", default=list(ไฟล์ของแหล่ง))
    ต = ป.parse_args()
    ปลายทาง.mkdir(parents=True, exist_ok=True)
    for แหล่ง in ต.แหล่ง:
        ตาม = พ่นแหล่ง(แหล่ง)
        if not ตาม:
            ตาย(f"{แหล่ง} ได้ 0 คำ ⇒ อ่านต้นทางผิดที่")
        ซอง = {"แหล่ง": แหล่ง, "ก้อน": แบ่งก้อน(ตาม)}
        ไบต์ = ห่อ(ซอง)
        (ปลายทาง / f"{แหล่ง}.json.gz").write_bytes(ไบต์)
        รายการ = sum(len(v) for v in ตาม.values())
        print(f"✅ {แหล่ง} ⇒ {len(ตาม):,} กุญแจ · {รายการ:,} รายการ · {len(ซอง['ก้อน'])} ก้อน · บีบแล้ว {len(ไบต์) / 1048576:.2f} เมกะไบต์")


if __name__ == "__main__":
    main()
