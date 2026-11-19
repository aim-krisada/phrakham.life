#!/usr/bin/env python3
"""ด่าน — ความหมายที่การ์ดคำแสดง ต้องตรงกับไฟล์ต้นทางทุกตัวอักษร (ใบงาน v3/phrakham#103 เกณฑ์ข้อ 10)

รัน  py -3.14 tools/ด่านความหมายตรงต้นทาง.py                  ⇒ ตรวจ `.output/public/api/lex/` กับ zip ต้นทาง
     py -3.14 tools/ด่านความหมายตรงต้นทาง.py --ที่ <โฟลเดอร์>
     py -3.14 tools/ด่านความหมายตรงต้นทาง.py --ทดสอบตัวเอง     ⇒ พิสูจน์แดง-เขียว ⛔ ไม่ต้องมี zip ⛔ ไม่ต้องสร้างเว็บ

ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/103

## ตรวจ *ของที่ผู้อ่านได้จริง* ⛔ ไม่ใช่ของระหว่างทาง

⇒ อ่านไฟล์ `api/lex/<แหล่ง>/<ก้อน>.json` ใน **เว็บที่สร้างเสร็จ** ⇒ ไบต์ชุดเดียวกับที่เบราว์เซอร์ได้
⇒ แล้ว **เปิด zip ต้นทางเอง** ⇒ ⛔ ไม่เชื่อ `_พ่น/` ⛔ ไม่เชื่อ `_data/ความหมาย/` ⛔ ไม่ใช้ฟังก์ชันยกชิ้นของตัวพ่น

## เทียบอะไรบ้าง ⇒ ไม่ตรงข้อเดียว = แดง

1. **ตัวหนังสือ** ⇒ ข้อความทุกชิ้นของรายการนั้น ต่อกันแล้ว **ต้องเท่ากับตัวหนังสือทั้งหมดของ entry ในต้นทางเป๊ะ**
   ⇒ ⛔ ไม่ตัดช่องว่าง ⛔ ไม่ปรับรูปตัวอักษร ⇒ **ย่อ แปล หรือเติมคำเอง แม้ตัวเดียวก็แดง**
   ⇒ ยกเว้นเฉพาะแท็กในตาราง `แท็กไม่ยกตัวหนังสือ` ของ `tools/สร้างพจนานุกรม.py` ⇒ เหตุผลอยู่ที่นั่น
2. **ค่าจากแอตทริบิวต์** ⇒ เช่นคำกรีกของ Strong · เลขข้อย่อย ⇒ ต้องตรงกับแอตทริบิวต์ในต้นทาง **ตามลำดับ**
3. **ทางจากรหัสไปหาความหมาย** ⇒ รายการที่วางไว้ใต้กุญแจไหน ต้องเดินถึงได้จากกุญแจนั้นด้วยดัชนีของเจ้าของเอง
   ⇒ กันการแปะความหมายผิดคำ ⇒ เช่นวาง Strong 2533 ไว้ใต้คำที่เป็น 2532
4. **ครบทุกหัวคำ** ⇒ หัวคำในต้นทางที่มีทางเดินมาจากชั้นคำ ต้องอยู่ในเว็บครบ ⇒ ⛔ หายเงียบ ๆ ไม่ได้
5. **UBS** ⇒ คำนิยาม · คำแปลสั้น · หมวด · หมวดย่อย · เลข Louw-Nida ต้องตรงกับช่องในไฟล์ JSON ของ UBS ทุกตัวอักษร
6. **การ์ดชี้ไปความหมาย UBS ที่มีอยู่จริง** ⇒ ทุกรหัสใน `api/card/` ต้องมีก้อนให้เปิด

⭐ **ใช้ตารางกติกาจากตัวพ่นร่วมกัน ⛔ แต่ไม่ใช้โค้ดยกชิ้นของมัน**
   ⇒ ตารางบอกว่า *อะไรต้องตรง* ⇒ ฟังก์ชันในไฟล์นี้เดินต้นทางเองอีกทาง แล้วเทียบเฉพาะผลที่ต้องเท่ากัน
"""

import argparse
import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ที่เก็บ = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ที่เก็บ / "tools"))

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from สร้างพจนานุกรม import (  # noqa: E402  ⇒ ยืมแต่ *ตารางกติกา* กับที่อยู่ไฟล์ ⛔ ไม่ยืม `ยกชิ้น`
    OSHB, TEI, ดัชนีฮีบรู, ไฟล์ของแหล่ง, แท็กไม่ยกตัวหนังสือ, แอตทริบิวต์ที่ยก,
)

กองต้นทาง = ที่เก็บ / "source"
UBS = {
    "ubs-grc": ("ubs-open-license-main.zip", "ubs-open-license-main/dictionaries/greek/JSON/UBSGreekNTDic-v1.1-en.JSON"),
    "ubs-hbo": ("ubs-open-license-main.zip", "ubs-open-license-main/dictionaries/hebrew/JSON/UBSHebrewDic-v0.9.2-en.JSON"),
}

#: ชนิดชิ้นที่ **เป็นตัวหนังสือของต้นทาง** ⇒ นับเข้าข้อ 1
ชนิดข้อความ = {"เลข", "นิยาม", "หัว", "นับ"}
#: ชนิดชิ้นที่ **มาจากแอตทริบิวต์** ⇒ นับเข้าข้อ 2
ชนิดแอตทริบิวต์ = {"คำ", "อ่าน", "เสียง", "อ้าง", "หน้า", "ข้อ"}
#: หมุดตอน ⇒ ⛔ ไม่มีตัวหนังสือ ⇒ ⛔ ไม่นับ
ชนิดหมุด = {"ตอน"}


def ชื่อแท็ก(e):
    return e.tag.rsplit("}", 1)[-1]


# ---------------------------------------------------------------- ฝั่งต้นทาง (เดินเอง ⛔ ไม่ใช้ตัวพ่น)
def ตัวหนังสือต้นทาง(แหล่ง, entry):
    """ตัวหนังสือทั้งหมดใน entry ตามลำดับเอกสาร ⇒ ข้ามเฉพาะเนื้อในของแท็กในตารางยกเว้น (แต่เก็บหาง)"""
    ข้าม = แท็กไม่ยกตัวหนังสือ.get(แหล่ง, set())
    ออก = []

    def เดิน(e, ราก):
        if not ราก and ชื่อแท็ก(e) in ข้าม:
            return
        ออก.append(e.text or "")
        for ลูก in e:
            เดิน(ลูก, False)
            ออก.append(ลูก.tail or "")

    เดิน(entry, True)
    return "".join(ออก)


def แอตทริบิวต์ต้นทาง(แหล่ง, entry):
    """[(ชนิด, ค่า)] ตามลำดับเอกสาร ⇒ เฉพาะแอตทริบิวต์ในตารางของตัวพ่น ⇒ ⛔ ไม่นับของ entry เอง"""
    ตาราง = แอตทริบิวต์ที่ยก.get(แหล่ง, {})
    ออก = []
    for e in entry.iter():
        if e is entry:
            continue
        for ชื่อ, ชนิด in ตาราง.get(ชื่อแท็ก(e), []):
            ค่า = e.get(ชื่อ)
            if ค่า is None:
                continue
            if ชนิด == "อ้าง":
                ภาษา = e.get("language")
                ค่า = ("G" if ภาษา == "GREEK" else "H" if ภาษา == "HEBREW" else "?") + str(int(ค่า))
            ออก.append((ชนิด, ค่า))
    return ออก


# ---------------------------------------------------------------- ฝั่งเว็บ
def แยกชิ้น(ชิ้น):
    """คืน (ตัวหนังสือ, [(ชนิด, ค่า)], [ชนิดที่ไม่รู้จัก])"""
    ข้อความ, แอต, แปลก = [], [], []
    for c in ชิ้น:
        if isinstance(c, str):
            ข้อความ.append(c)
        elif isinstance(c, list) and len(c) == 2 and isinstance(c[1], str):
            if c[0] in ชนิดข้อความ:
                ข้อความ.append(c[1])
            elif c[0] in ชนิดแอตทริบิวต์:
                แอต.append((c[0], c[1]))
            elif c[0] not in ชนิดหมุด:
                แปลก.append(c[0])
        else:
            แปลก.append(repr(c)[:40])
    return "".join(ข้อความ), แอต, แปลก


def จุดแรกที่ต่าง(ก, ข):
    for i, (x, y) in enumerate(zip(ก, ข)):
        if x != y:
            return i
    return min(len(ก), len(ข))


def เทียบรายการ(แหล่ง, entry, ชิ้น):
    """คืนรายการข้อผิด ⇒ ว่าง = ตรงทุกตัวอักษร"""
    ผิด = []
    ข้อความ, แอต, แปลก = แยกชิ้น(ชิ้น)
    if แปลก:
        ผิด.append(f"มีชิ้นชนิดที่ไม่รู้จัก {แปลก[:3]}")
    ต้นทาง = ตัวหนังสือต้นทาง(แหล่ง, entry)
    if ข้อความ != ต้นทาง:
        i = จุดแรกที่ต่าง(ข้อความ, ต้นทาง)
        ผิด.append(f"ตัวหนังสือต่างที่ตำแหน่ง {i} ⇒ เว็บ {ข้อความ[i:i + 30]!r} ⇒ ต้นทาง {ต้นทาง[i:i + 30]!r}"
                   f" (ยาว {len(ข้อความ)} กับ {len(ต้นทาง)})")
    แอตต้น = แอตทริบิวต์ต้นทาง(แหล่ง, entry)
    if แอต != แอตต้น:
        ผิด.append(f"ค่าจากแอตทริบิวต์ไม่ตรง ⇒ เว็บ {แอต[:4]} ⇒ ต้นทาง {แอตต้น[:4]}")
    return ผิด


def เทียบUBS(ของเว็บ, lm):
    """ช่องของ UBS ที่การ์ดแสดง ⇒ ต้องเท่าช่องใน JSON ของ UBS ทุกตัวอักษร"""
    ผิด = []
    ส = (lm.get("LEXSenses") or [{}])[0]
    ควร = {"น": ส.get("DefinitionShort") or ส.get("DefinitionLong") or "", "ก": ส.get("Glosses") or []}
    หมวด = [x["Domain"] for x in (lm.get("LEXDomains") or []) if x.get("Domain")]
    ย่อย = [x["Domain"] for x in (lm.get("LEXSubDomains") or []) if x.get("Domain")]
    if หมวด:
        ควร["ม"] = หมวด
    if ย่อย:
        ควร["ย"] = ย่อย
    if lm.get("LEXEntryCode"):
        ควร["LN"] = lm["LEXEntryCode"]
    if len(lm.get("LEXSenses") or []) > 1:
        ผิด.append("ต้นทางมีมากกว่า 1 ความหมายย่อย ⇒ การ์ดแสดงแค่ตัวแรก = ย่อ")
    for ช่อง in sorted(set(ควร) | set(ของเว็บ)):
        if ของเว็บ.get(ช่อง) != ควร.get(ช่อง):
            ผิด.append(f"ช่อง {ช่อง} ไม่ตรง ⇒ เว็บ {str(ของเว็บ.get(ช่อง))[:60]!r} ⇒ ต้นทาง {str(ควร.get(ช่อง))[:60]!r}")
    return ผิด


def ขยายรหัสUBS(ย่อ):
    return ย่อ.zfill(12) + "000"


# ---------------------------------------------------------------- ทางจากกุญแจไปหาหัวคำ (เดินดัชนีเอง)
def ทางฮีบรู(aug_xml, lex_xml):
    """คืน (กุญแจ ⇒ ชุด bdb ที่ถูกต้อง) · (กุญแจมีตัวอักษร ⇒ เลข Strong) จากดัชนีของ Open Scriptures"""
    aug = {w.get("aug"): w.text for w in aug_xml.iter(OSHB + "w")}
    xref = {}
    for e in lex_xml.iter(OSHB + "entry"):
        x = e.find(OSHB + "xref")
        xref[e.get("id")] = dict(x.attrib) if x is not None else {}
    bdb, strong = {}, {}
    for a in xref.values():
        if a.get("strong", "").isdigit() and a.get("bdb"):
            bdb.setdefault(a["strong"], set()).add(a["bdb"])
    for k, หัวคำ in aug.items():
        if re.fullmatch(r"\d+[a-z]", k) and หัวคำ in xref:
            a = xref[หัวคำ]
            if a.get("bdb"):
                bdb.setdefault(k, set()).add(a["bdb"])
            if a.get("strong", "").isdigit():
                strong[k] = a["strong"]
    return bdb, strong


def ตรวจทาง(แหล่ง, กุญแจ, ids, ดัชนี):
    """ids ที่เว็บวางไว้ใต้กุญแจนี้ ⇒ ต้องเป็นของที่เดินถึงจากกุญแจนี้ (และสำหรับ bdb ต้องครบชุด)"""
    if แหล่ง == "strong-grc":
        return [] if all(i.isdigit() and int(i) == int(กุญแจ) for i in ids) else [f"{กุญแจ} มี {ids}"]
    if แหล่ง == "abbott-smith":
        return [] if all(กุญแจ in [g.lstrip("0") for g in re.findall(r"G(\d+)", i.split("|", 1)[-1])] for i in ids) else [f"{กุญแจ} มี {ids}"]
    bdb, strong = ดัชนี
    if แหล่ง == "strong-hbo":
        ควร = "H" + (กุญแจ if กุญแจ.isdigit() else strong.get(กุญแจ, "?"))
        return [] if ids == [ควร] else [f"{กุญแจ} ควรเป็น {ควร} แต่ได้ {ids}"]
    if แหล่ง == "bdb":
        return [] if set(ids) == bdb.get(กุญแจ, set()) and len(ids) == len(set(ids)) else [f"{กุญแจ} ควรเป็น {sorted(bdb.get(กุญแจ, set()))} แต่ได้ {ids}"]
    return [f"ไม่รู้จักแหล่ง {แหล่ง}"]


# ---------------------------------------------------------------- ตรวจของจริง
def อ่านzip(zip_, ไฟล์):
    ทาง = กองต้นทาง / zip_
    if not ทาง.exists() or b"git-lfs" in ทาง.read_bytes()[:40]:
        print(f"⛔ {ทาง} ยังไม่ใช่ไบต์จริง ⇒ สั่ง  git -c lfs.fetchexclude= lfs pull -I \"source/{zip_}\"")
        raise SystemExit(1)
    with zipfile.ZipFile(ทาง) as z:
        return z.read(ไฟล์)


def ก้อนของเว็บ(ที่, แหล่ง):
    กอง = ที่ / "api" / "lex" / แหล่ง
    ไฟล์ = sorted(กอง.glob("*.json")) if กอง.is_dir() else []
    ตาม = {}
    for f in ไฟล์:
        ของ = json.loads(f.read_text(encoding="utf-8"))
        for k, v in ของ["คำ"].items():
            ตาม[k] = v
    return ไฟล์, ตาม


def ตรวจของจริง(ที่):
    ผิดรวม = 0

    def แจ้ง(หัว, ผิด):
        nonlocal ผิดรวม
        ผิดรวม += len(ผิด)
        for x in ผิด[:8]:
            print(f"   ⛔ {หัว} ⇒ {x}")
        if len(ผิด) > 8:
            print(f"   ⛔ ... อีก {len(ผิด) - 8} จุด")

    ดัชนี = ทางฮีบรู(ET.fromstring(อ่านzip(*ดัชนีฮีบรู["aug"])), ET.fromstring(อ่านzip(*ดัชนีฮีบรู["lex"])))

    for แหล่ง, (zip_, ไฟล์ใน) in ไฟล์ของแหล่ง.items():
        ราก = ET.fromstring(อ่านzip(zip_, ไฟล์ใน))
        if แหล่ง == "strong-grc":
            ของต้น = {e.get("strongs"): e for e in ราก.iter("entry")}
        elif แหล่ง == "abbott-smith":
            ของต้น = {}
            for e in ราก.iter(TEI + "entry"):
                ของต้น.setdefault(e.get("n", ""), e)
        else:
            ของต้น = {e.get("id"): e for e in ราก.iter(OSHB + "entry")}
        ไฟล์, ตาม = ก้อนของเว็บ(ที่, แหล่ง)
        if not ไฟล์:
            แจ้ง(แหล่ง, [f"⛔ ไม่มีไฟล์ใน {ที่ / 'api' / 'lex' / แหล่ง}"])
            continue
        ผิด, เห็น, นับ = [], set(), 0
        for กุญแจ, รายการ in ตาม.items():
            ids = [r.get("id", "") for r in รายการ]
            ผิด += [f"ทาง {x}" for x in ตรวจทาง(แหล่ง, กุญแจ, ids, ดัชนี)]
            for r in รายการ:
                นับ += 1
                e = ของต้น.get(r.get("id", ""))
                if e is None:
                    ผิด.append(f"{กุญแจ} ⇒ id {r.get('id')} ⛔ ไม่มีในต้นทาง")
                    continue
                เห็น.add(r["id"])
                ผิด += [f"{กุญแจ} {r['id']} ⇒ {x}" for x in เทียบรายการ(แหล่ง, e, r.get("ชิ้น", []))]
        # ข้อ 4 ⇒ ครบทุกหัวคำที่มีทางเดินมาจากชั้นคำ
        if แหล่ง == "strong-grc" or แหล่ง == "strong-hbo":
            ควรมี = set(ของต้น)
        elif แหล่ง == "abbott-smith":
            ควรมี = {n for n in ของต้น if re.search(r"G\d+", n.split("|", 1)[-1] if "|" in n else "")}
        else:
            ควรมี = set().union(*ดัชนี[0].values()) & set(ของต้น)
        ขาด = sorted(ควรมี - เห็น)
        if ขาด:
            ผิด.append(f"หัวคำหายจากเว็บ {len(ขาด)} หัว ⇒ ตัวอย่าง {ขาด[:5]}")
        print(f"{'✅' if not ผิด else '⛔'} {แหล่ง} ⇒ {len(ไฟล์)} ก้อน · {len(ตาม):,} กุญแจ · {นับ:,} รายการ ⇒ ไม่ตรง {len(ผิด)} จุด")
        แจ้ง(แหล่ง, ผิด)

    # UBS ⇒ ข้อ 5
    ทุกรหัสUBS = {}
    for แหล่ง, (zip_, ไฟล์ใน) in UBS.items():
        ต้น = {}
        for e in json.loads(อ่านzip(zip_, ไฟล์ใน).decode("utf-8-sig")):
            for bf in e["BaseForms"]:
                for lm in bf["LEXMeanings"]:
                    if lm.get("LEXID"):
                        ต้น[lm["LEXID"]] = lm
        ไฟล์, ตาม = ก้อนของเว็บ(ที่, แหล่ง)
        ทุกรหัสUBS[แหล่ง] = set(ตาม)
        ผิด = [] if ไฟล์ else [f"ไม่มีไฟล์ใน {ที่ / 'api' / 'lex' / แหล่ง}"]
        for ย่อ, ของ in ตาม.items():
            lm = ต้น.get(ขยายรหัสUBS(ย่อ))
            if lm is None:
                ผิด.append(f"{ย่อ} ⛔ ไม่มีในต้นทาง")
                continue
            ผิด += [f"{ย่อ} ⇒ {x}" for x in เทียบUBS(ของ, lm)]
        print(f"{'✅' if not ผิด else '⛔'} {แหล่ง} ⇒ {len(ไฟล์)} ก้อน · {len(ตาม):,} ความหมาย")
        แจ้ง(แหล่ง, ผิด)

    # ข้อ 6 ⇒ การ์ดชี้ไปความหมายที่มีจริง
    กองการ์ด = ที่ / "api" / "card"
    ไฟล์การ์ด = sorted(กองการ์ด.glob("*/*.json")) if กองการ์ด.is_dir() else []
    ผิด = [] if ไฟล์การ์ด else [f"ไม่มีไฟล์ใน {กองการ์ด}"]
    นับคำ = 0
    for f in ไฟล์การ์ด:
        ของ = json.loads(f.read_text(encoding="utf-8"))
        for ชั้น, ข้อทั้งหมด in ของ["ชั้น"].items():
            แหล่ง = "ubs-grc" if ชั้น == "คำกรีก" else "ubs-hbo"
            for ข้อ, คำ in ข้อทั้งหมด.items():
                for ค in คำ:
                    นับคำ += 1
                    ช่อง = ค.split("~")
                    if len(ช่อง) > 3 and ช่อง[3] and ช่อง[3] not in ทุกรหัสUBS.get(แหล่ง, set()):
                        ผิด.append(f"{f.parent.name}/{f.stem}:{ข้อ} ชี้ไปความหมาย {ช่อง[3]} ที่ไม่มีก้อน")
    print(f"{'✅' if not ผิด else '⛔'} การ์ด ⇒ {len(ไฟล์การ์ด):,} บท · {นับคำ:,} คำ ⇒ รหัส UBS ทุกตัวมีความหมายให้เปิด")
    แจ้ง("การ์ด", ผิด)

    print("\n✅ ความหมายบนเว็บตรงต้นทางทุกตัวอักษร" if not ผิดรวม else f"\n⛔ ไม่ตรง {ผิดรวม} จุด")
    return 0 if not ผิดรวม else 1


# ---------------------------------------------------------------- ฝาแฝด *ยังจับได้*
def ทดสอบตัวเอง():
    """พิสูจน์ว่าด่าน **ยังแดงได้จริง** ⇒ ใช้ entry ตัวอย่างในหน่วยความจำ ⛔ ไม่ต้องมี zip

    ⭐ ของที่ถูกต้องสร้างด้วยตัวพ่นจริง (`ยกชิ้น`) ⇒ แล้วแกล้งทำให้เพี้ยนทีละแบบ ⇒ ด่านต้องจับได้ทุกแบบ
    """
    from สร้างพจนานุกรม import ยกชิ้น
    import copy

    ตัวอย่าง = {
        "strong-grc": """<entry strongs="02532"><strongs>2532</strongs> <greek BETA="KAI/" unicode="καί" translit="kaí"/>
 <pronunciation strongs="kahee"/> <strongs_derivation>apparently a primary particle,</strongs_derivation><strongs_def> and, also,
 even</strongs_def><kjv_def>:--and.</kjv_def> Compare <strongsref language="GREEK" strongs="2228"/>.</entry>""",
        "strong-hbo": f"""<entry xmlns="{OSHB[1:-1]}" id="H7225">
		<w pos="n-f" pron="ray-sheeth'" xlit="rêʼshîyth" xml:lang="heb">רֵאשִׁית</w>
		<source>from the same as <w src="H7218">7218</w>;</source>
		<meaning>the <def>first</def>, in place, time, order or rank</meaning>
		<usage>beginning, chief(-est), first(-fruits, part, time), principal thing.</usage>
	</entry>""",
        "bdb": f"""<entry xmlns="{OSHB[1:-1]}" id="t.ad.ag"><w>רֵאשִׁית</w> <pos>n.f</pos>. <def>beginning</def>
 <sense n="1"><sense n="a"><def>beginning</def></sense><sense n="b"><def>first</def></sense></sense>
 <sense n="2"><def>first</def>, <def>chief</def></sense><status p="912">base</status></entry>""",
        "abbott-smith": f"""<entry xmlns="{TEI[1:-1]}" n="ἄδολος|G97"><note type="occurrencesNT">1</note>
 <form>* <orth>ἄδολος</orth>, <foreign xml:lang="grc">-ον</foreign>,</form>
 <sense n="1."><gloss>guileless</gloss> (Pind., Thuc).</sense><sense n="2.">Of liquids, <gloss>genuine, pure</gloss>: I Pe 2:2.†</sense></entry>""",
    }
    ผ่านหมด = True

    def คาด(ชื่อ, ผิด, ควรผิด):
        nonlocal ผ่านหมด
        ได้ = bool(ผิด)
        ok = ได้ == ควรผิด
        ผ่านหมด &= ok
        print(f"{'✅' if ok else '⛔'} {ชื่อ} ⇒ {'แดง' if ได้ else 'เขียว'} ควร{'แดง' if ควรผิด else 'เขียว'}"
              + (f" ⇒ {ผิด[0][:90]}" if ผิด else ""))

    for แหล่ง, xml in ตัวอย่าง.items():
        e = ET.fromstring(xml)
        ถูก = ยกชิ้น(แหล่ง, e)
        print(f"--- {แหล่ง}")
        คาด("ของจากตัวพ่นตรงตัว", เทียบรายการ(แหล่ง, e, ถูก), False)

        def แก้(fn):
            c = copy.deepcopy(ถูก)
            fn(c)
            return เทียบรายการ(แหล่ง, e, c)

        def ข้อความแรกที่ยาว(c):
            return next(i for i, x in enumerate(c) if isinstance(x, str) and len(x.strip()) > 3)

        def เปลี่ยนตัวอักษร(c):
            i = ข้อความแรกที่ยาว(c)
            s = c[i]
            j = next(k for k, ch in enumerate(s) if ch.isalpha())
            c[i] = s[:j] + ("X" if s[j] != "X" else "Y") + s[j + 1:]
        คาด("เปลี่ยนตัวอักษร 1 ตัว", แก้(เปลี่ยนตัวอักษร), True)
        คาด("ตัดข้อความทิ้ง 1 ชิ้น (ย่อ)", แก้(lambda c: c.pop(ข้อความแรกที่ยาว(c))), True)
        คาด("เติมคำแปลไทยเข้าไป", แก้(lambda c: c.append("แปลว่า และ")), True)
        คาด("ยุบช่องว่างกับขึ้นบรรทัด", แก้(lambda c: c.__setitem__(slice(None), [re.sub(r"\s+", " ", x) if isinstance(x, str) else x for x in c])), True)
        แอต = [i for i, x in enumerate(ถูก) if isinstance(x, list) and x[0] in ชนิดแอตทริบิวต์]
        if แอต:
            คาด("แก้ค่าจากแอตทริบิวต์", แก้(lambda c: c[แอต[0]].__setitem__(1, c[แอต[0]][1] + "9")), True)
            คาด("ทิ้งค่าจากแอตทริบิวต์", แก้(lambda c: c.pop(แอต[0])), True)
        if len(แอต) > 1:
            def สลับ(c):
                c[แอต[0]], c[แอต[1]] = c[แอต[1]], c[แอต[0]]
            คาด("สลับลำดับค่าจากแอตทริบิวต์", แก้(สลับ), True)
        ป้าย = [i for i, x in enumerate(ถูก) if isinstance(x, list) and x[0] in ชนิดข้อความ]
        if ป้าย:
            คาด("แก้ข้อความที่ติดป้าย", แก้(lambda c: c[ป้าย[0]].__setitem__(1, c[ป้าย[0]][1] + "s")), True)
        คาด("ชิ้นชนิดแปลกปลอม", แก้(lambda c: c.append(["แปล", "x"])), True)

    print("--- ทาง")
    คาด("Strong กรีกวางถูกกุญแจ", ตรวจทาง("strong-grc", "2532", ["02532"], None), False)
    คาด("Strong กรีกวางผิดกุญแจ", ตรวจทาง("strong-grc", "2533", ["02532"], None), True)
    ดัชนี = ({"7225": {"t.ad.ag"}}, {"1984a": "1984"})
    คาด("BDB ครบชุด", ตรวจทาง("bdb", "7225", ["t.ad.ag"], ดัชนี), False)
    คาด("BDB เกินชุด", ตรวจทาง("bdb", "7225", ["t.ad.ag", "b.cx.aa"], ดัชนี), True)
    คาด("BDB ขาดชุด", ตรวจทาง("bdb", "7225", [], ดัชนี), True)
    คาด("Strong ฮีบรู รหัสมีตัวอักษรตามดัชนี", ตรวจทาง("strong-hbo", "1984a", ["H1984"], ดัชนี), False)
    คาด("Strong ฮีบรู ตัดตัวอักษรทิ้งเอง", ตรวจทาง("strong-hbo", "871a", ["H871"], ดัชนี), True)
    คาด("Abbott-Smith ถูกเลข", ตรวจทาง("abbott-smith", "97", ["ἄδολος|G97"], None), False)
    คาด("Abbott-Smith ผิดเลข", ตรวจทาง("abbott-smith", "98", ["ἄδολος|G97"], None), True)

    print("--- UBS")
    lm = {"LEXID": "000002001001000", "LEXEntryCode": "93.1",
          "LEXDomains": [{"Domain": "Names of Persons and Places"}], "LEXSubDomains": [{"Domain": "Persons"}],
          "LEXSenses": [{"DefinitionShort": "the elder brother of Moses and Israel’s first high priest", "DefinitionLong": "", "Glosses": ["Aaron"]}]}
    ถูก = {"น": "the elder brother of Moses and Israel’s first high priest", "ก": ["Aaron"],
           "ม": ["Names of Persons and Places"], "ย": ["Persons"], "LN": "93.1"}
    คาด("UBS ตรงตัว", เทียบUBS(ถูก, lm), False)
    คาด("UBS แก้นิยาม 1 ตัวอักษร", เทียบUBS({**ถูก, "น": ถูก["น"].replace("’", "'")}, lm), True)
    คาด("UBS ทิ้งคำแปลสั้น", เทียบUBS({**ถูก, "ก": []}, lm), True)
    คาด("UBS ทิ้งหมวด", เทียบUBS({k: v for k, v in ถูก.items() if k != "ม"}, lm), True)
    คาด("UBS ต้นทางมี 2 ความหมายย่อย แต่การ์ดแสดงตัวเดียว", เทียบUBS(ถูก, {**lm, "LEXSenses": lm["LEXSenses"] * 2}), True)
    คาด("UBS ย่อรหัสแล้วขยายกลับได้ตัวเดิม", [] if ขยายรหัสUBS("2001001") == "000002001001000" else ["ขยายผิด"], False)

    print("\n✅ ด่านยังจับความหมายที่เพี้ยนจากต้นทางได้ทุกแบบ" if ผ่านหมด else "\n⛔ ด่านเสียแล้ว")
    return 0 if ผ่านหมด else 1


def นับบท(ที่, เล่มบท):
    """รายงาน ⛔ ไม่ใช่ด่าน ⇒ บทนั้นมีความหมายจากแต่ละแหล่งกี่คำ (เกณฑ์ข้อ 12 ของใบ)

    ⭐ นับจาก **ไฟล์ที่เว็บส่งจริง** ด้วยกติกาเดียวกับการ์ด ⇒ คำนับว่า *มี* เมื่อการ์ดจะโชว์ความหมายอย่างน้อย 1 รายการ
    """
    เล่ม, บท = เล่มบท.split("/")
    การ์ด = json.loads((ที่ / "api" / "card" / เล่ม / f"{บท}.json").read_text(encoding="utf-8"))
    คลังก้อน = {}

    def มี(แหล่ง, กุญแจ, ก้อน):
        k = (แหล่ง, ก้อน)
        if k not in คลังก้อน:
            f = ที่ / "api" / "lex" / แหล่ง / f"{ก้อน}.json"
            คลังก้อน[k] = json.loads(f.read_text(encoding="utf-8"))["คำ"] if f.exists() else {}
        return bool(คลังก้อน[k].get(กุญแจ))

    for ชั้น, ข้อทั้งหมด in การ์ด["ชั้น"].items():
        กรีก = ชั้น == "คำกรีก"
        แหล่งทั้งหมด = ["ubs", "strong", "abbott-smith"] if กรีก else ["ubs", "strong", "bdb"]
        ไฟล์ = {"ubs": "ubs-grc" if กรีก else "ubs-hbo", "strong": "strong-grc" if กรีก else "strong-hbo",
                "abbott-smith": "abbott-smith", "bdb": "bdb"}
        นับ = {x: 0 for x in แหล่งทั้งหมด}
        ทั้งหมด = 0
        for คำ in ข้อทั้งหมด.values():
            for ค in คำ:
                ทั้งหมด += 1
                ช่อง = ค.split("~") + [""] * 5
                if ช่อง[3] and มี(ไฟล์["ubs"], ช่อง[3], int(ช่อง[3]) // 10**8):
                    นับ["ubs"] += 1
                รหัส = [r for r in re.split(r"[+|]", ช่อง[1]) if r]
                for แ in แหล่งทั้งหมด[1:]:
                    if any(มี(ไฟล์[แ], r.lstrip("0") or "0", int(re.match(r"\d+", r.lstrip("0") or "0").group()) // 100)
                           for r in รหัส if re.match(r"\d", r)):
                        นับ[แ] += 1
        print(f"{เล่ม} {บท} ({ชั้น}) ⇒ ทั้งหมด {ทั้งหมด:,} คำ")
        for แ, n in นับ.items():
            print(f"   {แ:13} มีความหมาย {n:,} คำ ({n / ทั้งหมด:.1%}) · ไม่มี {ทั้งหมด - n:,} คำ")
    return 0


def main():
    ป = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ป.add_argument("--ที่", default=".output/public")
    ป.add_argument("--ทดสอบตัวเอง", action="store_true")
    ป.add_argument("--นับ", metavar="เล่ม/บท", help="รายงานว่าบทนั้นมีความหมายจากแต่ละแหล่งกี่คำ เช่น MRK/10")
    ต = ป.parse_args()
    if ต.ทดสอบตัวเอง:
        return ทดสอบตัวเอง()
    if ต.นับ:
        return นับบท(Path(ต.ที่), ต.นับ)
    return ตรวจของจริง(Path(ต.ที่))


if __name__ == "__main__":
    sys.exit(main())
