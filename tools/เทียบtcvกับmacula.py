#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""เทียบว่า TCV กับ MACULA มีข้อครบเท่ากันไหม

ทำอะไร
  1. อ่านข้อทั้งหมดใน TCV (ไฟล์ USX) แยกว่าข้อไหนมีเนื้อ ข้อไหนมีแต่เลข
  2. แปลงเลขข้อของ TCV เป็นเลขข้อของต้นฉบับ ด้วยตาราง versification.vrs ที่มากับ TCV
  3. อ่านข้อทั้งหมดใน MACULA ฝั่งฮีบรู (WLC) กับฝั่งกรีก (SBLGNT)
  4. นับว่าข้อไหนมีฝั่งเดียว

ผลออกเป็น JSON ทาง stdout — ตัวเลขทุกตัวมาจากการรันนี้ ไม่มีการพิมพ์มือ
"""
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ราก = Path(r"C:\gl\v3\phrakham\_แตก")
ทีซีวี = ราก / "tcv" / "usx-rev2-release" / "release"
กรีก = ราก / "macula-greek-main" / "SBLGNT" / "tsv" / "macula-greek-SBLGNT.tsv"
ฮีบรู = ราก / "macula-hebrew-main" / "WLC" / "tsv" / "macula-hebrew.tsv"

เล่มเดิม = "GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER LAM EZK DAN HOS JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL".split()
เล่มใหม่ = "MAT MRK LUK JHN ACT ROM 1CO 2CO GAL EPH PHP COL 1TH 2TH 1TI 2TI TIT PHM HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV".split()


def อ่านตารางแปลงเลข(ไฟล์):
    """คืน dict เลขข้อ TCV -> เลขข้อต้นฉบับ

    บรรทัดในไฟล์เป็นแบบ `GEN 31:55 = GEN 32:1` หรือ `GEN 32:1-32 = GEN 32:2-33`
    ฝั่งซ้ายคือเลขของฉบับนี้ ฝั่งขวาคือเลขต้นฉบับ (ตามรูปแบบ .vrs ของ Paratext)
    """
    แปลง = {}
    ลาย = re.compile(r"^(\S+) (\d+):(\d+)(?:-(\d+))?$")
    for บรรทัด in ไฟล์.read_text(encoding="utf-8-sig").splitlines():
        บรรทัด = บรรทัด.strip()
        if not บรรทัด or บรรทัด.startswith("#") or "=" not in บรรทัด:
            continue
        ซ้าย, ขวา = [ส.strip() for ส in บรรทัด.split("=", 1)]
        กซ, กข = ลาย.match(ซ้าย), ลาย.match(ขวา)
        if not กซ or not กข:
            continue
        บซ, ชซ, ตซ, จซ = กซ.group(1), กซ.group(2), int(กซ.group(3)), int(กซ.group(4) or กซ.group(3))
        บข, ชข, ตข, จข = กข.group(1), กข.group(2), int(กข.group(3)), int(กข.group(4) or กข.group(3))
        if จซ - ตซ != จข - ตข:
            continue
        for i in range(จซ - ตซ + 1):
            แปลง[f"{บซ} {ชซ}:{ตซ + i}"] = f"{บข} {ชข}:{ตข + i}"
    return แปลง


def อ่านทีซีวี(โฟลเดอร์):
    """คืน (ข้อที่มีเนื้อ, ข้อที่มีแต่เลขไม่มีเนื้อ) เป็น dict เล่ม -> set ของ 'BOOK c:v'"""
    มีเนื้อ, ว่าง = set(), set()
    for ไฟล์ in sorted(โฟลเดอร์.glob("USX_1/*.usx")):
        ราก_ = ET.parse(ไฟล์).getroot()
        เล่ม = ราก_.find("book").get("code")
        # เชิงอรรถไม่ใช่เนื้อข้อ — จำไว้ว่าโหนดไหนอยู่ข้างใน <note>
        ในเชิงอรรถ = set()
        for น in ราก_.iter("note"):
            for ลูก in น.iter():
                if ลูก is not น:
                    ในเชิงอรรถ.add(id(ลูก))

        เปิดอยู่ = None       # ข้อที่กำลังเปิดค้างอยู่
        เก็บ = {}            # ข้อ -> จำนวนตัวอักษรที่นับได้
        for โหนด in ราก_.iter():
            if id(โหนด) in ในเชิงอรรถ:
                continue
            if โหนด.tag == "verse":
                sid = โหนด.get("sid")
                if sid:      # เปิดข้อ
                    บท = sid.split()[1].split(":")[0]
                    เปิดอยู่ = [f"{เล่ม} {บท}:{ตัว}" for ตัว in ขยายเลขข้อ(โหนด.get("number"))]
                    for คีย์ in เปิดอยู่:
                        เก็บ.setdefault(คีย์, 0)
                else:        # ปิดข้อ
                    เปิดอยู่ = None
            if not เปิดอยู่:
                continue
            ยาว = 0
            if โหนด.tag != "note":   # ตัว <note> เองไม่นับเนื้อข้างใน
                ยาว += len((โหนด.text or "").strip())
            # ข้อความที่ห้อยหลังโหนด (tail) เป็นของข้อที่เปิดอยู่ตอนนั้น
            ยาว += len((โหนด.tail or "").strip())
            for คีย์ in เปิดอยู่:
                เก็บ[คีย์] += ยาว
        for คีย์, ยาว in เก็บ.items():
            (มีเนื้อ if ยาว > 0 else ว่าง).add(คีย์)
    return มีเนื้อ, ว่าง


def ขยายเลขข้อ(เลข):
    """`1` -> [1] · `1-2` -> [1,2] · `3a` -> [3]"""
    ออก = []
    for ส่วน in str(เลข).split(","):
        ส่วน = ส่วน.strip()
        ก = re.match(r"^(\d+)[a-z]?(?:-(\d+)[a-z]?)?$", ส่วน)
        if not ก:
            continue
        ต้น = int(ก.group(1))
        ปลาย = int(ก.group(2) or ก.group(1))
        ออก.extend(range(ต้น, ปลาย + 1))
    return ออก


def อ่านมาคูลา(ไฟล์):
    """คืน set ของ 'BOOK c:v' จากคอลัมน์ ref ของไฟล์ TSV"""
    ข้อ = set()
    with ไฟล์.open(encoding="utf-8") as f:
        หัว = f.readline().rstrip("\n").split("\t")
        ช่อง = หัว.index("ref")
        for บรรทัด in f:
            ส่วน = บรรทัด.split("\t")
            if len(ส่วน) <= ช่อง:
                continue
            ข้อ.add(ส่วน[ช่อง].split("!")[0])
    return ข้อ


def เทียบ(ชื่อ, ทีซีวีมีเนื้อ, ทีซีวีว่าง, มาคูลา, แปลง, เล่ม):
    เล่มชุด = set(เล่ม)
    def กรอง(ชุด):
        return {ร for ร in ชุด if ร.split()[0] in เล่มชุด}
    มีเนื้อ = กรอง(ทีซีวีมีเนื้อ)
    ว่าง = กรอง(ทีซีวีว่าง)
    ม = กรอง(มาคูลา)

    # ข้อ TCV สองข้อที่แปลงแล้วไปตกเลขเดียวกัน — ทำให้ยอดหลังแปลงหดลง
    ชน = {}
    for ร in มีเนื้อ:
        ชน.setdefault(แปลง.get(ร, ร), []).append(ร)
    ชนกัน = sorted([f"{ค} <= {'+'.join(sorted(v))}" for ค, v in ชน.items() if len(v) > 1])

    แปลงแล้ว = {แปลง.get(ร, ร) for ร in มีเนื้อ}
    ว่างแปลงแล้ว = {แปลง.get(ร, ร) for ร in ว่าง}
    ดิบ = มีเนื้อ

    เกิน = sorted(แปลงแล้ว - ม, key=เรียง)
    ขาด = sorted(ม - แปลงแล้ว, key=เรียง)
    ขาดแต่มีเลข = [ร for ร in ขาด if ร in ว่างแปลงแล้ว]
    ขาดจริง = [ร for ร in ขาด if ร not in ว่างแปลงแล้ว]
    return {
        "ฝั่ง": ชื่อ,
        "จำนวนเล่ม": len(เล่ม),
        "ข้อที่ TCV มีเนื้อ": len(มีเนื้อ),
        "ข้อที่ TCV มีเลขแต่ไม่มีเนื้อ": len(ว่าง),
        "ข้อใน MACULA": len(ม),
        "ตรงกันก่อนแปลงเลข": len(ดิบ & ม),
        "ตรงกันหลังแปลงเลข": len(แปลงแล้ว & ม),
        "ข้อ TCV ที่แปลงแล้วชนเลขเดียวกัน": ชนกัน,
        "ข้อว่างของ TCV ที่ MACULA ก็ไม่มี": sorted(
            [ร for ร in ว่าง if แปลง.get(ร, ร) not in ม], key=เรียง),
        "ข้อว่างของ TCV ที่ MACULA มี": sorted(
            [ร for ร in ว่าง if แปลง.get(ร, ร) in ม], key=เรียง),
        "TCV มี MACULA ไม่มี": len(เกิน),
        "MACULA มี TCV ไม่มีเลย": len(ขาดจริง),
        "MACULA มี TCV ใส่เลขไว้แต่ไม่มีเนื้อ": len(ขาดแต่มีเลข),
        "ตัวอย่าง TCV มี MACULA ไม่มี": เกิน[:10],
        "ตัวอย่าง MACULA มี TCV ไม่มีเลย": ขาดจริง[:10],
        "ตัวอย่าง MACULA มี TCV ใส่เลขไว้แต่ไม่มีเนื้อ": ขาดแต่มีเลข[:20],
        "รายการเต็ม TCV มี MACULA ไม่มี": เกิน,
        "รายการเต็ม MACULA มี TCV ไม่มีเลย": ขาดจริง,
    }


def เรียง(ร):
    บ, ชต = ร.split(" ", 1)
    ช, ต = ชต.split(":")
    ลำดับ = (เล่มเดิม + เล่มใหม่)
    return (ลำดับ.index(บ) if บ in ลำดับ else 99, int(ช), int(ต))


def main():
    แปลง = อ่านตารางแปลงเลข(ทีซีวี / "versification.vrs")
    มีเนื้อ, ว่าง = อ่านทีซีวี(ทีซีวี)
    ผล = {
        "จำนวนบรรทัดแปลงเลขที่อ่านได้": len(แปลง),
        "พันธสัญญาเดิม": เทียบ("พันธสัญญาเดิม", มีเนื้อ, ว่าง, อ่านมาคูลา(ฮีบรู), แปลง, เล่มเดิม),
        "พันธสัญญาใหม่": เทียบ("พันธสัญญาใหม่", มีเนื้อ, ว่าง, อ่านมาคูลา(กรีก), แปลง, เล่มใหม่),
    }
    json.dump(ผล, sys.stdout, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
