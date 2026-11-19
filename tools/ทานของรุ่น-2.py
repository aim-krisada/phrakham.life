#!/usr/bin/env python3
"""ทานว่า "ข้อมูลที่รุ่น 2 แปลงไว้ มาจากต้นฉบับรุ่นเดียวกับที่เราถืออยู่ไหม"

**ทำไมต้องมี** ⇒ ใบงาน v3/phrakham#23 เกณฑ์ผ่านข้อ 7 สั่งให้ตอบทีละแหล่ง
พร้อม **วิธีพิสูจน์ที่คนอ่านรอบหน้ารันเองได้** ⛔ ไม่ใช่คำบอกเล่า

**วิธีที่ใช้ — เปิดของจริงเทียบกัน 3 ท่า ⛔ ไม่ดูวันที่ไฟล์**
  ① ไฟล์ต้นฉบับที่รุ่น 2 ยังเก็บไว้ในเครื่อง ⇒ เทียบ `sha256` ตรง ๆ
  ② ไฟล์ต้นฉบับที่รุ่น 2 ไม่มีแล้ว ⇒ **สร้างผลลัพธ์ขึ้นใหม่จากกองของเรา
     ด้วยตรรกะเดียวกับสคริปต์ของรุ่น 2** แล้วเทียบผลกับไฟล์ผลลัพธ์เก่าทีละตัวอักษร
  ③ ตัวส่งออกพจนานุกรมของรุ่น 2 เขียนไว้ดีพอจะเรียกใช้ซ้ำได้ ⇒ **เรียกของเขาเอง
     แต่ชี้ไปที่ไฟล์ของเรา** ⇒ ผลออกมาเหมือนเดิม = ต้นฉบับรุ่นเดียวกันแน่นอน

**ที่อยู่ 2 แห่งที่สคริปต์นี้อ่าน — อ่านอย่างเดียวทั้งคู่ ⛔ ไม่เขียนอะไรเลย**
  กองของเรา  ⇒ `_แตก/` ของที่เก็บนี้ (สร้างด้วย `tools/แตกกอง.py`)
  ของรุ่น 2  ⇒ `C:/gl/krisada/phrakham.life2` ⇒ เว็บที่คนใช้อยู่ทุกวัน

รัน: py -3.14 tools/ทานของรุ่น-2.py
คืน 0 เมื่อทุกแถวได้ผลตามที่ตารางในเอกสารบอกไว้ · คืน 1 เมื่อมีแถวที่เพี้ยนไปจากนั้น
"""

import collections
import csv
import importlib.util
import io
import json
import re
import sys
import xml.etree.ElementTree as ET
from hashlib import sha256
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ที่เก็บ = Path(__file__).resolve().parent.parent
กอง = ที่เก็บ / "_แตก"
รุ่น2 = Path("C:/gl/krisada/phrakham.life2")
เล่มรุ่น2 = รุ่น2 / "webdata" / "books"

ผลรวม = []


def บอก(หัวข้อ, ได้, ควรได้):
    """จดผลหนึ่งแถว แล้วบอกทันทีว่าตรงกับที่เอกสารเขียนไว้ไหม"""
    ตรง = ได้ == ควรได้
    ผลรวม.append((หัวข้อ, ได้, ควรได้, ตรง))
    print(f"{'✅' if ตรง else '⛔'} {หัวข้อ}\n     ได้ {ได้}\n     ควรได้ {ควรได้}")


def สรุปไฟล์(p):
    h = sha256()
    with open(p, "rb") as f:
        for ก้อน in iter(lambda: f.read(1 << 20), b""):
            h.update(ก้อน)
    return h.hexdigest()


# ---------------------------------------------------------------- ชั้นคำฮีบรู
เล่มฮีบรู = {
    "GEN": "Gen", "EXO": "Exod", "LEV": "Lev", "NUM": "Num", "DEU": "Deut",
    "JOS": "Josh", "JDG": "Judg", "RUT": "Ruth", "1SA": "1Sam", "2SA": "2Sam",
    "1KI": "1Kgs", "2KI": "2Kgs", "1CH": "1Chr", "2CH": "2Chr", "EZR": "Ezra",
    "NEH": "Neh", "EST": "Esth", "JOB": "Job", "PSA": "Ps", "PRO": "Prov",
    "ECC": "Eccl", "SNG": "Song", "ISA": "Isa", "JER": "Jer", "LAM": "Lam",
    "EZK": "Ezek", "DAN": "Dan", "HOS": "Hos", "JOL": "Joel", "AMO": "Amos",
    "OBA": "Obad", "JON": "Jonah", "MIC": "Mic", "NAM": "Nah", "HAB": "Hab",
    "ZEP": "Zeph", "HAG": "Hag", "ZEC": "Zech", "MAL": "Mal",
}


def ชั้นคำฮีบรูของเรา():
    """สร้างชั้นคำฮีบรูขึ้นใหม่จาก macula-hebrew.tsv ของเรา
    ⇒ เดินตาม `etl/build_ot.py` กับ `etl/export_json.py` ของรุ่น 2 ทุกข้อ
      gloss ว่าง ⇒ ถอยไปใช้ช่อง english · รหัสที่มีขีด `|` ⇒ เปลี่ยนเป็น `_`
      ช่อง after ว่าง ⇒ ติดธง j · ภาษาเป็น A (อาราเมค) ⇒ ติดธง ar"""
    out = collections.defaultdict(list)
    ไฟล์ = กอง / "macula-hebrew-main" / "WLC" / "tsv" / "macula-hebrew.tsv"
    with io.open(ไฟล์, encoding="utf-8", newline="") as f:
        for x in csv.DictReader(f, delimiter="\t"):
            try:
                รหัสเล่ม, ที่เหลือ = x["ref"].split(" ", 1)
                บทข้อ, _ = ที่เหลือ.split("!", 1)
                บท, ข้อ = บทข้อ.split(":", 1)
            except ValueError:
                continue
            if รหัสเล่ม not in เล่มฮีบรู:
                continue
            รหัส = (x["strongnumberx"] or "").strip().replace("|", "_")
            คำ = {"s": x["text"], "t": x["transliteration"], "le": x["lemma"],
                  "id": ("H" + รหัส) if รหัส else ("hlemma:" + x["lemma"]),
                  "m": x["morph"], "g": x["gloss"] or x["english"] or ""}
            if x["after"] == "":
                คำ["j"] = 1
            if x["lang"] == "A":
                คำ["ar"] = 1
            out[(เล่มฮีบรู[รหัสเล่ม], บท, ข้อ)].append(คำ)
    return out


def ทานฮีบรู():
    print("\n=== #02 MACULA Hebrew — ชั้นคำของพันธสัญญาเดิม")
    เก่า = รุ่น2 / "_resources" / "07-lemma-hebrew" / "macula-hebrew-main" / "WLC" / "tsv" / "macula-hebrew.tsv"
    ใหม่ = กอง / "macula-hebrew-main" / "WLC" / "tsv" / "macula-hebrew.tsv"
    if เก่า.exists():
        บอก("sha256 ของ macula-hebrew.tsv สองฝั่ง",
            "ตรงกัน" if สรุปไฟล์(เก่า) == สรุปไฟล์(ใหม่) else "ไม่ตรง", "ตรงกัน")
    ของเรา = ชั้นคำฮีบรูของเรา()
    ตรง = ต่าง = 0
    for osis in sorted(set(เล่มฮีบรู.values())):
        d = json.load(io.open(เล่มรุ่น2 / f"{osis}.json", encoding="utf-8"))
        for บท, vv in d.items():
            for ข้อ, เนื้อ in vv.items():
                # ⛔ ตัดช่อง sym ทิ้ง — รุ่น 2 คำนวณเอาเอง ⛔ ไม่ได้มาจากต้นฉบับ
                g = [{k: v for k, v in w.items() if k != "sym"} for w in (เนื้อ.get("g") or [])]
                if not g:
                    continue
                if g == (ของเรา.get((osis, บท, ข้อ)) or []):
                    ตรง += 1
                else:
                    ต่าง += 1
    บอก("ข้อที่สร้างใหม่แล้วตรงกับของรุ่น 2 ทุกตัวอักษร", f"{ตรง} ตรง · {ต่าง} ต่าง", "23213 ตรง · 0 ต่าง")


# ------------------------------------------------------------------ ตัวบทแปล
พธใ = ["Matt", "Mark", "Luke", "John", "Acts", "Rom", "1Cor", "2Cor", "Gal", "Eph",
       "Phil", "Col", "1Thess", "2Thess", "1Tim", "2Tim", "Titus", "Phlm", "Heb",
       "Jas", "1Pet", "2Pet", "1John", "2John", "3John", "Jude", "Rev"]
พธใ_USFM = ["MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH",
            "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS",
            "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV"]
พธด = [เล่มฮีบรู[k] for k in ["GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT",
       "1SA", "2SA", "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST", "JOB", "PSA",
       "PRO", "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO",
       "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "ZEC", "MAL"]]
พธด_USFM = ["GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA",
            "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST", "JOB", "PSA", "PRO",
            "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO",
            "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "ZEC", "MAL"]
USFM2OSIS = dict(zip(พธใ_USFM, พธใ))
USFM2OSIS.update(dict(zip(พธด_USFM, พธด)))

# เครื่องหมายคำพูดที่รุ่น 2 เล็มออกจากหัวท้ายข้อ ⇒ ลอกมาจาก build_translations.py
คำพูด = "\"“”„‟«»‹›「」『』"


def เล็ม(t):
    return (t or "").strip().strip(คำพูด).strip()


def ชื่อสั้น(t):
    return t.split("}")[-1]


def อ่าน_usx(โฟลเดอร์):
    """อ่านตัวบททีละข้อจากไฟล์ USX ⇒ ลอก usx_verses() ของรุ่น 2 มาทั้งดุ้น"""
    out = {}
    for usfm, osis in USFM2OSIS.items():
        p = Path(โฟลเดอร์) / f"{usfm}.usx"
        if not p.exists():
            continue
        ที่อยู่, ข้อ = [None], {}

        def เดิน(el):
            t = ชื่อสั้น(el.tag)
            if t == "verse":
                if el.get("sid"):
                    ที่อยู่[0] = el.get("sid")
                elif el.get("eid"):
                    ที่อยู่[0] = None
                if el.tail and ที่อยู่[0]:
                    ข้อ.setdefault(ที่อยู่[0], []).append(el.tail)
                return
            if t == "note":                       # เชิงอรรถของผู้แปล ⛔ ไม่ใช่ตัวบท
                if el.tail and ที่อยู่[0]:
                    ข้อ.setdefault(ที่อยู่[0], []).append(el.tail)
                return
            if el.text and ที่อยู่[0]:
                ข้อ.setdefault(ที่อยู่[0], []).append(el.text)
            for c in el:
                เดิน(c)
            if el.tail and ที่อยู่[0]:
                ข้อ.setdefault(ที่อยู่[0], []).append(el.tail)

        เดิน(ET.parse(p).getroot())
        for sid, ชิ้น in ข้อ.items():
            _, บทข้อ = sid.split(" ")
            บท, ข = บทข้อ.split(":")
            out[f"{osis}.{บท}.{ข}"] = เล็ม("".join(ชิ้น).strip())
    return out


def ตัวบทของรุ่น2():
    out = collections.defaultdict(dict)
    for f in sorted(เล่มรุ่น2.glob("*.json")):
        for บท, vv in json.load(io.open(f, encoding="utf-8")).items():
            for ข้อ, เนื้อ in vv.items():
                for รหัส, ตัวบท in (เนื้อ.get("v") or {}).items():
                    out[รหัส][f"{f.stem}.{บท}.{ข้อ}"] = ตัวบท
    return out


def ทานตัวบท(เก็บ):
    print("\n=== #12 TCV · #15 LSV — ตัวบทแปลที่อ่านจากไฟล์ USX")
    for รหัส, โฟลเดอร์, ควร in [
        ("TCV", กอง / "tcv" / "usx-rev2-release" / "release" / "USX_1",
         "31094 ตรง · 0 ต่าง · 0 ข้อที่รุ่น 2 ไม่มี"),
        ("LSV", กอง / "lsv-rev32-release" / "release" / "USX_1",
         "30971 ตรง · 0 ต่าง · 133 ข้อที่รุ่น 2 ไม่มี"),
    ]:
        ของเรา = อ่าน_usx(โฟลเดอร์)
        เก่า = เก็บ[รหัส]
        ร่วม = set(ของเรา) & set(เก่า)
        ตรง = sum(1 for k in ร่วม if ของเรา[k] == เก่า[k])
        บอก(f"{รหัส} เทียบทีละตัวอักษร",
            f"{ตรง} ตรง · {len(ร่วม) - ตรง} ต่าง · {len(set(ของเรา) - set(เก่า))} ข้อที่รุ่น 2 ไม่มี", ควร)


# ------------------------------------------------------------------ WEB (usfx)
ข้ามใน_usfx = {"f", "x", "fr", "ft", "fk", "fq", "fqa", "fv", "xo", "xt", "rq", "ref"}


def ทาน_web(เก็บ):
    print("\n=== #14 World English Bible — ตัวบทที่อ่านจากไฟล์ usfx ของเรา")
    ไฟล์ = กอง / "eng-web_usfx" / "eng-web_usfx.xml"
    เก็บข้อ = collections.defaultdict(list)
    ที่อยู่ = [None]

    def เดิน(el):
        t = el.tag
        if t == "v":
            ที่อยู่[0] = el.get("bcv")
            if el.tail and ที่อยู่[0]:
                เก็บข้อ[ที่อยู่[0]].append(el.tail)
            return
        if t == "ve":
            ที่อยู่[0] = None
            return
        if t in ข้ามใน_usfx:
            if el.tail and ที่อยู่[0]:
                เก็บข้อ[ที่อยู่[0]].append(el.tail)
            return
        if el.text and ที่อยู่[0]:
            เก็บข้อ[ที่อยู่[0]].append(el.text)
        for c in el:
            เดิน(c)
        if el.tail and ที่อยู่[0]:
            เก็บข้อ[ที่อยู่[0]].append(el.tail)

    เดิน(ET.parse(ไฟล์).getroot())
    ของเรา = {}
    for bcv, ชิ้น in เก็บข้อ.items():
        try:
            bk, บท, ข้อ = bcv.split(".")
        except ValueError:
            continue
        osis = USFM2OSIS.get(bk)
        if not osis:                       # เล่มนอกสารบบ ⇒ กรองทิ้งตรงนี้
            continue
        ของเรา[f"{osis}.{int(บท)}.{int(ข้อ)}"] = เล็ม(re.sub(r"\s+", " ", "".join(ชิ้น)).strip())
    เก่า = เก็บ["WEB"]
    ร่วม = set(ของเรา) & set(เก่า)
    ตรง = sum(1 for k in ร่วม if ของเรา[k] == เก่า[k])
    บอก("WEB เทียบทีละตัวอักษร", f"{ตรง} ตรง · {len(ร่วม) - ตรง} ต่าง จาก {len(ร่วม)} ข้อ",
        "25206 ตรง · 5897 ต่าง จาก 31103 ข้อ")


# ------------------------------------------------------------------ พจนานุกรม
def ทานพจนานุกรม():
    print("\n=== #07 Abbott-Smith · #08 Strong กรีก · #09 HebrewLexicon")
    print("    เรียกตัวส่งออกของรุ่น 2 เอง แต่ชี้ไปที่ไฟล์ต้นฉบับของเรา")
    spec = importlib.util.spec_from_file_location("xl", รุ่น2 / "etl" / "export_lexicon.py")
    xl = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(xl)
    xl.AS_XML = กอง / "Abbott-Smith-master" / "abbott-smith.tei_lemma.xml"
    xl.SG_XML = กอง / "strongs-dictionary-xml-master" / "strongsgreek.xml"
    xl.BDB_DIR = กอง / "HebrewLexicon-master"
    xl.LI_XML = xl.BDB_DIR / "LexicalIndex.xml"
    xl.BDB_XML = xl.BDB_DIR / "BrownDriverBriggs.xml"
    xl.HS_XML = xl.BDB_DIR / "HebrewStrong.xml"
    xl.DB = รุ่น2 / "data" / "phrakham.sqlite"
    xl.SHARDS = {}
    ab, sg = xl.load_abbott(), xl.load_strong()
    ใหม่ = {}
    for gid in sorted(g for g in (set(ab) | set(sg)) if xl.GID.match(g)):
        a, s = ab.get(gid), sg.get(gid)
        ใหม่[gid] = {"id": gid, "lemma": (a or s or {}).get("lemma", ""),
                     "abbott_html": a["html"] if a else "",
                     "abbott_occ": a["occ"] if a else "",
                     "abbott_refs": a["refs"] if a else [],
                     "strong_html": s["html"] if s else ""}
    xl.export_hebrew()
    for ก้อน in xl.SHARDS.values():
        ใหม่.update(ก้อน)
    เก่า = {}
    for f in sorted((รุ่น2 / "webdata" / "lexicon").glob("*.json")):
        เก่า.update(json.load(io.open(f, encoding="utf-8")))
    ร่วม = set(ใหม่) & set(เก่า)
    ตรง = sum(1 for k in ร่วม if ใหม่[k] == เก่า[k])
    บอก("รายการพจนานุกรมที่สร้างใหม่แล้วตรงกับของเดิม",
        f"{ตรง} ตรง · {len(ร่วม) - ตรง} ต่าง · เดิมมี {len(เก่า)} · ใหม่มี {len(ใหม่)}",
        "14994 ตรง · 0 ต่าง · เดิมมี 14994 · ใหม่มี 14994")


# ------------------------------------- แหล่งที่รุ่น 2 ไม่มีผลลัพธ์ให้ยกมาเลย
def ทานของที่ยกไม่ได้():
    print("\n=== แหล่งที่ยกของเก่ามาไม่ได้เพราะต้นทางคนละตัว")
    สคริปต์ = (รุ่น2 / "etl" / "build_nt.py").read_text(encoding="utf-8")
    บอก("สคริปต์ที่สร้างชั้นคำกรีกของรุ่น 2 อ่านจากแหล่งไหน",
        "OpenGNT" if "OpenGNT" in สคริปต์ else "ไม่ใช่ OpenGNT", "OpenGNT")
    ส่งออก = (รุ่น2 / "etl" / "export_json.py").read_text(encoding="utf-8")
    บอก("ป้ายเน้นของพันธสัญญาใหม่ อ่านจากไฟล์ไหน",
        "OpenGNT_DictLGNTDF.csv" if "OpenGNT_DictLGNTDF.csv" in ส่งออก else "ไฟล์อื่น",
        "OpenGNT_DictLGNTDF.csv")
    บอก("OpenGNT อยู่ในกองของเราไหม",
        "ไม่มี" if not (กอง / "OpenGNT-master").exists() else "มี", "ไม่มี")
    บอก("ตัวบทไทย KJV อยู่ในกองของเราไหม",
        "ไม่มี" if not list(กอง.glob("*thaKJV*")) else "มี", "ไม่มี")


def main():
    if not กอง.exists():
        raise SystemExit("ยังไม่มีโฟลเดอร์ _แตก/ ⇒ สร้างก่อนด้วย tools/แตกกอง.py")
    if not เล่มรุ่น2.exists():
        raise SystemExit(f"ไม่พบผลลัพธ์ของรุ่น 2 ที่ {เล่มรุ่น2}")
    ทานฮีบรู()
    เก็บ = ตัวบทของรุ่น2()
    ทานตัวบท(เก็บ)
    ทาน_web(เก็บ)
    ทานพจนานุกรม()
    ทานของที่ยกไม่ได้()
    เพี้ยน = [r for r in ผลรวม if not r[3]]
    print(f"\n{'=' * 60}\nทานทั้งหมด {len(ผลรวม)} แถว · ตรงกับที่เอกสารเขียนไว้ {len(ผลรวม) - len(เพี้ยน)} · เพี้ยน {len(เพี้ยน)}")
    if เพี้ยน:
        print("⛔ แถวที่เพี้ยน ⇒ ต้นฉบับหรือของรุ่น 2 ขยับ ⇒ เปิดดูเองก่อนแก้ตัวเลขในเอกสาร")
        for หัวข้อ, ได้, ควร, _ in เพี้ยน:
            print(f"   {หัวข้อ}: ได้ {ได้} · ควรได้ {ควร}")
    return 1 if เพี้ยน else 0


if __name__ == "__main__":
    sys.exit(main())
