# -*- coding: utf-8 -*-
"""ใบ #58 — ไฟล์ TCV ที่เราถือ เป็นฉบับเดียวกับของสมาคมพระคริสตธรรมไทยไหม

ทำสองอย่าง
หนึ่ง อ่านคำประกาศตัวตนจาก metadata.xml กับแฟ้มงาน Paratext ที่ติดมาในซิป
สอง สุ่มข้อ 22 ข้อ แล้ววัดว่าถ้อยคำเหมือนฉบับไทยอื่นที่มีในเครื่องแค่ไหน

ผลออกเป็น JSON ⛔ ไม่มีตัวเลขไหนพิมพ์ด้วยมือ
สั่ง  py -3.14 tools/tcvฉบับไหน.py
"""
import sqlite3
import os
import re
import json
import zipfile
import difflib

# ที่อยู่ของจริง ⇒ อ่านอย่างเดียว ไม่มีการเขียนกลับ
USX = r"C:\gl\v3\phrakham\_แตก\tcv\usx-rev2-release\release\USX_1"
META = r"C:\gl\v3\phrakham\_แตก\tcv\usx-rev2-release\metadata.xml"
PTZIP = r"C:\gl\v3\phrakham\_แตก\tcv\usx-rev2-release\source\paratext-resource.zip"
MYB = r"C:\gl\krisada\phrakham.life2\_resources\mybible-backups"

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "docs", "ข้อมูล", "tcv-ฉบับไหน.json")

# เลขเล่มของโปรแกรม MyBible ⇒ ใช้เปิดข้อในฐานข้อมูลฉบับอื่น
BOOKNUM = {
    "GEN": 10, "EXO": 20, "DEU": 50, "RUT": 80, "PSA": 230, "PRO": 240,
    "ISA": 290, "JER": 300, "MAT": 470, "MRK": 480, "LUK": 490, "JHN": 500,
    "ACT": 510, "ROM": 520, "1CO": 530, "EPH": 560, "PHP": 570, "REV": 730,
}

# ข้อที่สุ่ม ⇒ กระจายทั้งเล่มเดิมและเล่มใหม่ ทั้งร้อยแก้วและบทกวี
SAMPLE = [
    ("GEN", 1, 1), ("GEN", 12, 1), ("EXO", 20, 3), ("DEU", 6, 4),
    ("RUT", 1, 16), ("PSA", 23, 1), ("PSA", 119, 105), ("PRO", 3, 5),
    ("ISA", 53, 5), ("JER", 29, 11), ("MAT", 5, 3), ("MAT", 6, 9),
    ("MRK", 1, 1), ("LUK", 2, 11), ("JHN", 1, 1), ("JHN", 3, 16),
    ("ACT", 2, 38), ("ROM", 8, 28), ("1CO", 13, 4), ("EPH", 2, 8),
    ("PHP", 4, 13), ("REV", 21, 4),
]

# ฉบับไทยที่มีอยู่ในเครื่อง ⇒ ชื่อที่แสดง : ชื่อโฟลเดอร์
VERSIONS = {
    "thSV'71 · สมาคมพระคริสตธรรมไทย 1971": "thSV'71",
    "thOV'83 · สมาคมพระคริสตธรรมไทย": "thOV'83",
    "thSV'11 · สมาคมพระคริสตธรรมไทย ฉบับมาตรฐาน 2011": "thSV'11",
    "thNCV · Biblica ฉบับอมตธรรมร่วมสมัย 2007": "thNCV",
    "ERV-th · Bible League ฉบับอ่านเข้าใจง่าย": "ERV-th",
    "thKJV · Philip Pope 2003": "thKJV",
}


def ล้าง(s):
    """ตัดป้าย ตัดเลขเชิงอรรถ ตัดช่องว่าง ⇒ เหลือแต่ตัวหนังสือ"""
    s = re.sub(r"<[^>]+>", "", s)
    s = re.sub(r"\[[0-9]+\]", "", s)
    s = s.replace("\u200b", "").replace("\u00a0", "")
    return re.sub(r"\s+", "", s).strip()


def คำประกาศตัวตน():
    """ดึงช่องที่บอกว่าฉบับนี้คือใคร ออกมาจากไฟล์ที่เจ้าของแจก"""
    s = open(META, encoding="utf-8-sig").read()

    def ช่อง(tag):
        m = re.search("<%s>(.*?)</%s>" % (tag, tag), s, re.S)
        return m.group(1).strip() if m else None

    ptc = zipfile.ZipFile(PTZIP).read("Settings.xml").decode("utf-8-sig", "replace")

    def ptช่อง(tag):
        m = re.search("<%s>(.*?)</%s>" % (tag, tag), ptc, re.S)
        return m.group(1).strip() if m else None

    คำที่ตามหา = ["Thailand Bible Society", "United Bible Societies",
                  "Bible Society", "สมาคมพระคริสตธรรม", "UBS",
                  "Good News", "BHS", "Nestle", "Aland", "NIV"]
    เจอ = {}
    for w in คำที่ตามหา:
        n = len(re.findall(re.escape(w), s, re.I))
        n += len(re.findall(re.escape(w), ptc, re.I))
        for f in sorted(os.listdir(USX)):
            n += len(re.findall(re.escape(w), open(os.path.join(USX, f),
                                                   encoding="utf-8-sig").read(), re.I))
        เจอ[w] = n

    return {
        "ชื่อฉบับอังกฤษ": ช่อง("name"),
        "ชื่อฉบับไทย": ช่อง("nameLocal"),
        "ชื่อย่อ": ช่อง("abbreviation"),
        "รหัสงานแปลใน Paratext": ptช่อง("Name"),
        "ชนิดงานแปลที่เจ้าของประกาศ": ช่อง("translationType"),
        "ระดับผู้อ่านที่เจ้าของประกาศ": ช่อง("audience"),
        "วันที่แปลเสร็จ": ช่อง("dateCompleted"),
        "เจ้าของลิขสิทธิ์": re.search(r"<rightsHolder>.*?<name>(.*?)</name>",
                                      s, re.S).group(1),
        "ช่องบอกฉบับที่เป็นต้นทาง": ptช่อง("BaseTranslation"),
        "ช่องความสัมพันธ์กับฉบับอื่นใน metadata": ช่อง("relationships"),
        "จำนวนครั้งที่เจอคำเหล่านี้ในซิปทั้งซิป": เจอ,
    }


def ข้อของotcv():
    out = {}
    for bk in sorted({b for b, _, _ in SAMPLE}):
        raw = open(os.path.join(USX, bk + ".usx"), encoding="utf-8-sig").read()
        pat = (r'<verse number="(\d+)"[^>]*?sid="%s (\d+):(\d+)"\s*/>'
               r'(.*?)(?=<verse |</para>|<chapter )') % bk
        for m in re.finditer(pat, raw, re.S):
            ch, vs, body = int(m.group(2)), int(m.group(3)), m.group(4)
            body = re.sub(r"<note.*?</note>", "", body, flags=re.S)
            out[(bk, ch, vs)] = out.get((bk, ch, vs), "") + ล้าง(body)
    return out


def เปิดฐาน(mod):
    p = os.path.join(MYB, mod, "book-%s.SQLite3" % mod)
    if not os.path.exists(p):
        return None
    return sqlite3.connect("file:" + p.replace(os.sep, "/") + "?mode=ro", uri=True)


def main():
    ot = ข้อของotcv()
    conns = {k: เปิดฐาน(v) for k, v in VERSIONS.items()}
    คะแนน = {k: [] for k in VERSIONS}
    เป๊ะ = {k: 0 for k in VERSIONS}
    รายข้อ = []
    for bk, ch, vs in SAMPLE:
        a = ot.get((bk, ch, vs), "")
        row = {"ข้อ": "%s %d.%d" % (bk, ch, vs), "จำนวนอักษรของOTCV": len(a),
               "ค่าความเหมือน": {}}
        for name, c in conns.items():
            if c is None:
                row["ค่าความเหมือน"][name] = None
                continue
            r = c.execute("select text from verses where book_number=? "
                          "and chapter=? and verse=?",
                          (BOOKNUM[bk], ch, vs)).fetchone()
            if not r:
                row["ค่าความเหมือน"][name] = None
                continue
            b = ล้าง(r[0])
            ratio = round(difflib.SequenceMatcher(None, a, b).ratio(), 3)
            row["ค่าความเหมือน"][name] = ratio
            คะแนน[name].append(ratio)
            if a and a == b:
                เป๊ะ[name] += 1
        รายข้อ.append(row)

    res = {
        "ใบงาน": 58,
        "คำถาม": "ไฟล์ TCV ที่เราถือ เป็นฉบับเดียวกับฉบับภาษาไทยกลางของสมาคมพระคริสตธรรมไทยไหม",
        "คำประกาศตัวตนในไฟล์": คำประกาศตัวตน(),
        "ฉบับไทยที่มีให้เทียบในเครื่อง": sorted(VERSIONS),
        "หมายเหตุเรื่องของที่ขาด": ("ในเครื่องไม่มีฉบับภาษาไทยกลาง (ประชานิยม) "
                                     "ของสมาคมพระคริสตธรรมไทย ⇒ เทียบตรงตัวไม่ได้"),
        "จำนวนข้อที่สุ่ม": len(SAMPLE),
        "วิธีวัด": ("ตัดป้ายกับช่องว่างออกทั้งสองฝั่ง แล้ววัดด้วย "
                    "difflib.SequenceMatcher ⇒ 1.0 คือเหมือนทุกตัวอักษร"),
        "ค่าเฉลี่ยรายฉบับ": {k: (round(sum(v) / len(v), 3) if v else None)
                              for k, v in คะแนน.items()},
        "จำนวนข้อที่เหมือนทุกตัวอักษร": เป๊ะ,
        "รายข้อ": รายข้อ,
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(res, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("เขียนแล้ว", OUT)
    print(json.dumps(res["ค่าเฉลี่ยรายฉบับ"], ensure_ascii=False, indent=2))
    print(json.dumps(res["จำนวนข้อที่เหมือนทุกตัวอักษร"], ensure_ascii=False, indent=2))
    print(json.dumps(res["คำประกาศตัวตนในไฟล์"], ensure_ascii=False, indent=2))


main()
