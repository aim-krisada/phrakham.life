"""ดึงคำที่ UBS ล็อกความหมายไว้ ใน สดุดี 32 (ฮีบรู) กับ 1 ยอห์น 1 (กรีก)

ใบงาน #46 ⇒ ต้องรู้ก่อนว่า "ทุกคำที่ UBS ครอบคลุมในสองบท" มีคำไหนบ้าง
⛔ เลือกคำเองไม่ได้ ⇒ ตัวเลขทั้งใบจะเชื่อไม่ได้

วิธีเชื่อมของสองภาษาไม่เหมือนกัน ⇒ ของจริงอยู่ที่ docs/ข้อมูล/แหล่ง/ubs.json ช่อง "ขั้นตอน"
  ฮีบรู  ต้นฉบับ ⇒ ตารางแมป ⇒ พจนานุกรม
  กรีก   ต้นฉบับมีรหัสความหมายติดมาแล้วในช่อง ln ⇒ เปิดพจนานุกรมได้เลย

รัน  py -3.14 tools/ทดลอง-ดึงคำที่ubsล็อก.py <โฟลเดอร์ต้นทาง> <ไฟล์ออก.tsv>
     py -3.14 tools/ทดลอง-ดึงคำที่ubsล็อก.py C:/gl/v3/_ต้นทาง docs/ข้อมูล/ทดลอง-คำที่ubsล็อก.tsv
"""
import collections
import csv
import json
import sys
import unicodedata
from pathlib import Path

สองบท = [("PSA 32:", "ฮีบรู", "สดุดี 32"), ("1JN 1:", "กรีก", "1 ยอห์น 1")]
NFC = lambda s: unicodedata.normalize("NFC", s or "")


def ความหมาย(lem, lm):
    """ย่อ LEXMeaning หนึ่งก้อนให้เหลือช่องที่เราใช้"""
    s = (lm.get("LEXSenses") or [{}])[0]
    return {
        "คำต้นทาง": lem,
        "รหัสความหมาย": lm.get("LEXID") or "",
        "รหัสหมวด": lm.get("LEXEntryCode") or "",
        "คำอังกฤษ": "; ".join(s.get("Glosses") or []),
        "นิยามubs": " ".join((s.get("DefinitionShort") or "").split()),
        "หมวด": "; ".join(d["Domain"] for d in (lm.get("LEXDomains") or [])),
    }


def พจนานุกรมกรีก(ฐาน):
    """คืน {(คำต้นทาง, รหัสหมวด): ความหมาย} ⇒ ช่อง ln ในต้นฉบับชี้เข้าตารางนี้"""
    ออก = {}
    for e in json.load(open(ฐาน / "ubs-open-license/dictionaries/greek/JSON/UBSGreekNTDic-v1.1-en.JSON",
                            encoding="utf-8")):
        lem = NFC(e["Lemma"])
        for bf in e["BaseForms"]:
            for lm in bf["LEXMeanings"]:
                ออก[(lem, lm.get("LEXEntryCode"))] = ความหมาย(lem, lm)
    return ออก


def พจนานุกรมฮีบรู(ฐาน):
    """คืน {รหัสอ้างอิงของ MARBLE: [ความหมาย, ...]} ⇒ ตารางแมปชี้เข้าตารางนี้"""
    ออก = collections.defaultdict(list)
    for e in json.load(open(ฐาน / "ubs-open-license/dictionaries/hebrew/JSON/UBSHebrewDic-v0.9.2-en.JSON",
                            encoding="utf-8")):
        lem = NFC(e["Lemma"])
        for bf in e["BaseForms"]:
            for lm in bf["LEXMeanings"]:
                รายการ = ความหมาย(lem, lm)
                for r in (lm.get("LEXReferences") or []):
                    ออก[r.split("{")[0]].append(รายการ)
    return ออก


def ตารางแมป(ฐาน):
    ออก = collections.defaultdict(set)
    with open(ฐาน / "macula-hebrew/mappings/tsv/macula_to_marble_map.tsv", encoding="utf-8") as f:
        next(f)
        for บรรทัด in f:
            ซ้าย, _, ขวา = บรรทัด.rstrip("\n").partition("\t")
            for x in ซ้าย.split():
                ออก[x] |= set(ขวา.split())
    return ออก


def อ่านต้นฉบับ(ที่อยู่, นำหน้า):
    with open(ที่อยู่, encoding="utf-8") as f:
        return [r for r in csv.DictReader(f, delimiter="\t") if r["ref"].startswith(นำหน้า)]


def เก็บ(แถว, ชิ้น, รายการ, บท):
    """ใส่ชิ้นคำหนึ่งชิ้นลงถังรวม ⇒ นับซ้ำและจำข้อที่พบไว้ด้วย"""
    เดี่ยว = "เดี่ยว" if len(รายการ) == 1 else "หลายความหมาย"
    for r in รายการ:
        กุญแจ = (บท, r["คำต้นทาง"], r["รหัสความหมาย"])
        # ⛔ ห้ามส่งชื่อช่องเป็นคีย์เวิร์ดของ dict() ⇒ ไพทอนจัดรูปชื่อตัวแปรเป็น NFKC
        # ทำให้ "จำ" กลายเป็นคนละสายอักขระกับสตริง "จำ" ที่เราเอาไปอ่านทีหลัง
        ช่อง = แถว.setdefault(กุญแจ, {**r, "บท": บท, "ยูบีเอสล็อก": เดี่ยว,
                                      "จำนวนครั้ง": 0, "ข้อที่พบ": [], "รูปในข้อ": []})
        ช่อง["จำนวนครั้ง"] += 1
        ข้อ = ชิ้น["ref"].split(":")[1].split("!")[0]
        if ข้อ not in ช่อง["ข้อที่พบ"]:
            ช่อง["ข้อที่พบ"].append(ข้อ)
        if ชิ้น["text"] not in ช่อง["รูปในข้อ"]:
            ช่อง["รูปในข้อ"].append(ชิ้น["text"])
        if เดี่ยว == "หลายความหมาย":
            ช่อง["ยูบีเอสล็อก"] = "หลายความหมาย"


def หลัก(ฐาน, ออก):
    ฐาน = Path(ฐาน)
    แถว, ไม่มีความหมาย = {}, collections.Counter()

    หา = พจนานุกรมฮีบรู(ฐาน)
    แมป = ตารางแมป(ฐาน)
    for ชิ้น in อ่านต้นฉบับ(ฐาน / "macula-hebrew/WLC/tsv/macula-hebrew.tsv", "PSA 32:"):
        รายการ = []
        for m in sorted(แมป.get(ชิ้น["xml:id"], ())):
            for r in หา.get(m, []):
                if r not in รายการ:
                    รายการ.append(r)
        if รายการ:
            เก็บ(แถว, ชิ้น, รายการ, "สดุดี 32")
        else:
            ไม่มีความหมาย[("สดุดี 32", NFC(ชิ้น["lemma"]))] += 1

    หาก = พจนานุกรมกรีก(ฐาน)
    for ชิ้น in อ่านต้นฉบับ(ฐาน / "macula-greek/SBLGNT/tsv/macula-greek-SBLGNT.tsv", "1JN 1:"):
        lem = NFC(ชิ้น["lemma"])
        รายการ = [หาก[(lem, c)] for c in (ชิ้น["ln"] or "").split() if (lem, c) in หาก]
        if รายการ:
            เก็บ(แถว, ชิ้น, รายการ, "1 ยอห์น 1")
        else:
            ไม่มีความหมาย[("1 ยอห์น 1", lem)] += 1

    ช่อง = ["บท", "คำต้นทาง", "รหัสความหมาย", "รหัสหมวด", "ยูบีเอสล็อก",
            "จำนวนครั้ง", "ข้อที่พบ", "รูปในข้อ", "คำอังกฤษ", "นิยามubs", "หมวด"]
    Path(ออก).parent.mkdir(parents=True, exist_ok=True)
    with open(ออก, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, ช่อง, delimiter="\t", extrasaction="ignore")
        w.writeheader()
        for กุญแจ in sorted(แถว, key=lambda k: (k[0], -แถว[k]["จำนวนครั้ง"], k[1])):
            r = dict(แถว[กุญแจ])
            r["ข้อที่พบ"] = ",".join(r["ข้อที่พบ"])
            r["รูปในข้อ"] = " ".join(r["รูปในข้อ"])
            w.writerow(r)

    for _, ชื่อบท in [(p, b) for p, _, b in สองบท]:
        ของบท = [v for k, v in แถว.items() if k[0] == ชื่อบท]
        print(f"{ชื่อบท}: ความหมายไม่ซ้ำ {len(ของบท)} "
              f"(ล็อกเดี่ยว {sum(1 for v in ของบท if v['ยูบีเอสล็อก'] == 'เดี่ยว')} · "
              f"หลายความหมาย {sum(1 for v in ของบท if v['ยูบีเอสล็อก'] != 'เดี่ยว')})")
        ขาด = {k[1]: v for k, v in ไม่มีความหมาย.items() if k[0] == ชื่อบท}
        print(f"  ชิ้นคำที่ UBS ไม่ครอบคลุม {sum(ขาด.values())} ชิ้น จาก {len(ขาด)} คำต้นทาง")
    print("เขียนแล้ว", ออก)


if __name__ == "__main__":
    หลัก(sys.argv[1], sys.argv[2])
