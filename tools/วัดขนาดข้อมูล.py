#!/usr/bin/env python3
"""วัดขนาดข้อมูลของรุ่น 2 เพื่อตอบว่าแผนฟรีของ Supabase พอไหม — ใบงาน #41

**ทุกตัวเลขใน `docs/ข้อมูล/วัดขนาดข้อมูล.md` ออกมาจากสคริปต์ตัวนี้ตัวเดียว**
⇒ รันแล้วเทียบกับเอกสารได้ทีละบรรทัด ⛔ ไม่ต้องเชื่อเอกสาร

**เปิดฐานข้อมูลแบบอ่านอย่างเดียว** (`mode=ro`) ⇒ พลาดยังไงก็เขียนทับกองของรุ่น 2 ไม่ได้
⛔ ตอนวัดขนาดรายตาราง ต้องถ่ายสำเนาออกมาก่อน เพราะต้องลบตารางทิ้งจริง ๆ ถึงจะรู้ว่ามันกินที่เท่าไร
⇒ สำเนาไปอยู่ที่พักชั่วคราวของเครื่อง และลบทิ้งเมื่อวัดเสร็จ

**หน่วยเดียวทั้งไฟล์คือ MB ที่หมายถึง 1,048,576 ไบต์** ⇒ ปนหน่วยเมื่อไร ยอดย่อยจะบวกไม่เท่ายอดรวม
"""

import argparse
import os
import shutil
import sqlite3
import sys
import tempfile

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

MB = 1048576

# Postgres เก็บของกินที่ไม่เท่า SQLite ⇒ ตัวเลขที่เอามาคูณมาจากวิธีเก็บของ Postgres
หัวแถว = 28        # หัวแถว 24 ไบต์ + ตัวชี้ในหน้า 4 ไบต์
จำนวนเต็ม = 4      # ช่องตัวเลขจำนวนเต็มกิน 4 ไบต์เสมอ ⛔ ไม่ใช่ความยาวตอนพิมพ์
พ่วงดัชนี = 14     # หัวแถวของดัชนี 8 ไบต์ + ตัวชี้ 6 ไบต์
หน้าเต็ม = 0.9     # ใบของดัชนีไม่เคยอัดเต็ม 100%


def ช่องจำนวนเต็ม(c, ตาราง):
    """ช่องไหนเป็นตัวเลขจำนวนเต็ม — ถามฐานข้อมูลสด ⛔ ไม่จดชื่อช่องไว้เอง

    ฐานข้อมูลเป็นเจ้าของความจริงข้อนี้ จดไว้เองเมื่อไร วันหนึ่งช่องเปลี่ยนแล้วสำเนาจะค้าง
    """
    return [r[1] for r in c.execute(f"PRAGMA table_info({ตาราง})") if "INT" in r[2].upper()]


def ดัชนีของตาราง(c, ตาราง):
    """ตารางนี้มีดัชนีอะไรบ้าง แต่ละตัวใช้ช่องไหนเป็นกุญแจ — ถามฐานข้อมูลสดเช่นกัน

    กุญแจหลักของ SQLite ก็นับเป็นดัชนีตัวหนึ่ง (`sqlite_autoindex_*`) ⇒ `PRAGMA index_list` เห็นครบ
    """
    return [
        [r[2] for r in c.execute(f'PRAGMA index_info("{ดัชนี[1]}")')]
        for ดัชนี in c.execute(f"PRAGMA index_list({ตาราง})").fetchall()
    ]


def หัวข้อ(ข้อความ):
    print()
    print("=" * 72)
    print(ข้อความ)
    print("=" * 72)


def เปิดอ่านอย่างเดียว(ไฟล์):
    return sqlite3.connect("file:" + ไฟล์.replace("\\", "/") + "?mode=ro", uri=True)


def เนื้อของช่อง(c, ตาราง, ช่อง, เงื่อนไข=None):
    """ไบต์จริงที่ช่องนี้เก็บ รวมทุกแถว (ใส่เงื่อนไขเพื่อนับเฉพาะบางแถวได้)"""
    ที่ = f" WHERE {เงื่อนไข}" if เงื่อนไข else ""
    return c.execute(
        f'SELECT COALESCE(SUM(LENGTH(CAST("{ช่อง}" AS BLOB))),0) FROM {ตาราง}{ที่}'
    ).fetchone()[0]


def ขนาดรายตาราง(ไฟล์):
    """ตารางไหนกินที่ในไฟล์เท่าไร รวมดัชนีของตารางนั้น

    SQLite ที่ติดมากับ Python ไม่มีตาราง `dbstat` ที่ใช้ถามขนาดรายตารางได้
    ⇒ จึงถ่ายสำเนาออกมา แล้วลบตารางทีละตัวและบีบไฟล์ ดูว่าไฟล์เล็กลงเท่าไร
    """
    พัก = os.path.join(tempfile.gettempdir(), "phrakham-วัดขนาด-สำเนา.sqlite")
    shutil.copy2(ไฟล์, พัก)

    def บีบ():
        con = sqlite3.connect(พัก)
        con.execute("VACUUM")
        con.close()
        return os.path.getsize(พัก)

    try:
        หลังบีบ = บีบ()
        con = sqlite3.connect(พัก)
        ตาราง = [r[0] for r in con.execute("SELECT name FROM sqlite_master WHERE type='table'")]
        con.close()
        ผล, เหลือ = {}, หลังบีบ
        for t in ตาราง:
            con = sqlite3.connect(พัก)
            con.execute(f"DROP TABLE {t}")
            con.commit()
            con.close()
            ใหม่ = บีบ()
            ผล[t] = เหลือ - ใหม่
            เหลือ = ใหม่
        return หลังบีบ, ผล, เหลือ
    finally:
        if os.path.exists(พัก):
            os.remove(พัก)


def ประมาณPostgres(c, ตาราง, เงื่อนไข=None):
    """ประมาณว่าตารางนี้จะกินที่เท่าไรถ้าย้ายไป Postgres — คืน (แถว, กองข้อมูล, ดัชนี)

    ใส่ `เงื่อนไข` เพื่อคิดเฉพาะบางแถวได้ เช่นอยากรู้ว่าฉบับ KJV กินที่เท่าไร
    ⇒ ทุกที่ที่ต้องการเลขแบบนี้เรียกตัวนี้ตัวเดียว ⛔ ไม่มีสูตรคู่ขนานที่จะเพี้ยนออกจากกันวันหลัง
    """
    ที่ = f" WHERE {เงื่อนไข}" if เงื่อนไข else ""
    n = c.execute(f"SELECT COUNT(*) FROM {ตาราง}{ที่}").fetchone()[0]
    เต็ม = ช่องจำนวนเต็ม(c, ตาราง)
    เนื้อ = 0
    for ช่อง in [r[1] for r in c.execute(f"PRAGMA table_info({ตาราง})").fetchall()]:
        if ช่อง in เต็ม:
            เนื้อ += จำนวนเต็ม * n
            continue
        # ช่องตัวหนังสือมีหัวช่องติดมาด้วย สั้นกว่า 127 ไบต์ใช้ 1 ไบต์ ยาวกว่านั้นใช้ 4 ไบต์
        ไบต์, หัวช่อง = c.execute(
            f'SELECT COALESCE(SUM(LENGTH(CAST("{ช่อง}" AS BLOB))),0),'
            f' COALESCE(SUM(CASE WHEN "{ช่อง}" IS NULL THEN 0'
            f'   WHEN LENGTH(CAST("{ช่อง}" AS BLOB))<127 THEN 1 ELSE 4 END),0) FROM {ตาราง}{ที่}'
        ).fetchone()
        เนื้อ += ไบต์ + หัวช่อง
    กอง = เนื้อ + n * หัวแถว
    ดัชนี = 0
    for ช่องกุญแจ in ดัชนีของตาราง(c, ตาราง):
        กุญแจ = sum(เนื้อของช่อง(c, ตาราง, ช่อง, เงื่อนไข) + n for ช่อง in ช่องกุญแจ)
        ดัชนี += int((กุญแจ + n * พ่วงดัชนี) / หน้าเต็ม)
    return n, กอง, ดัชนี


def main():
    p = argparse.ArgumentParser(description="วัดขนาดข้อมูลของรุ่น 2 — ใบงาน #41")
    p.add_argument("--กอง", default=r"C:\gl\krisada\phrakham.life2",
                   help="โฟลเดอร์ของรุ่น 2 (ปริยาย = C:\\gl\\krisada\\phrakham.life2)")
    a = p.parse_args()

    ฐานข้อมูล = os.path.join(a.กอง, "data", "phrakham.sqlite")
    if not os.path.exists(ฐานข้อมูล):
        print(f"⛔ หาฐานข้อมูลของรุ่น 2 ไม่เจอที่ {ฐานข้อมูล}")
        print("   ⇒ บอกที่อยู่ของกองด้วย --กอง <โฟลเดอร์>")
        return 2

    con = เปิดอ่านอย่างเดียว(ฐานข้อมูล)
    c = con.cursor()

    # ① ขนาดไฟล์ทั้งก้อน กับขนาดรายตาราง
    หัวข้อ("① ไฟล์ทั้งก้อน และแต่ละตารางกินที่เท่าไร")
    ต้นฉบับ = os.path.getsize(ฐานข้อมูล)
    print(f"ไฟล์ต้นฉบับ        {ต้นฉบับ:>14,} ไบต์ = {ต้นฉบับ/MB:.1f} MB")
    หลังบีบ, ราย, เศษ = ขนาดรายตาราง(ฐานข้อมูล)
    print(f"บีบแล้วเหลือ       {หลังบีบ:>14,} ไบต์ = {หลังบีบ/MB:.1f} MB")
    print()
    print(f"{'ตาราง':20} {'แถว':>10} {'กินที่ในไฟล์':>16} {'':>9} {'เนื้อล้วน ๆ':>16} {'':>9}")
    for t, ไบต์ in sorted(ราย.items(), key=lambda x: -x[1]):
        n = c.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0]
        # ⛔ ต้องเก็บชื่อช่องให้ครบก่อน แล้วค่อยวนถาม — ถามซ้อนบนตัวอ่านตัวเดียวกัน มันจะทับของเดิม
        ช่องทั้งหมด = [x[1] for x in c.execute(f"PRAGMA table_info({t})").fetchall()]
        เนื้อ = sum(เนื้อของช่อง(c, t, ช่อง) for ช่อง in ช่องทั้งหมด)
        # พิมพ์ไบต์ดิบของเนื้อด้วย เพราะตารางเล็กอย่าง lexeme_thai ปัดเป็น 0.0 MB จนอ่านไม่ออก
        print(f"{t:20} {n:>10,} {ไบต์:>16,} {ไบต์/MB:>7.1f} MB {เนื้อ:>16,} {เนื้อ/MB:>7.1f} MB")
    print(f"{'ไฟล์เปล่าที่เหลือ':20} {'':>10} {เศษ:>16,}")

    # ② ตัวบทแปลแยกตามฉบับ
    หัวข้อ("② ตัวบทแปลแยกตามฉบับ")
    for r in c.execute("""SELECT code, COUNT(*), SUM(LENGTH(CAST(verse_ref AS BLOB))
            +LENGTH(CAST(code AS BLOB))+LENGTH(CAST(text AS BLOB)))
            FROM translation_verse GROUP BY code ORDER BY 3 DESC"""):
        print(f"  {r[0]:8} {r[1]:>8,} ข้อ {r[2]:>12,} ไบต์ = {r[2]/MB:5.1f} MB")

    # ③ ชั้นคำภาษาเดิม มาจากแหล่งไหน
    หัวข้อ("③ ชั้นคำภาษาเดิม แต่ละฝั่งมาจากแหล่งไหน")
    print("build_ot.py ของรุ่น 2 ใส่เลขประจำคำของ MACULA ลงไปตรง ๆ ⇒ แถวที่ขึ้นต้นด้วย o คือของ MACULA")
    print("morphhb เขียนรหัสรูปผันโดยมีตัว H นำหน้า ส่วน MACULA ไม่มี ⇒ นับแถวที่มี H นำได้ 0 = ไม่ใช่ของ morphhb")
    print()
    for ชื่อ, เงื่อนไข in (
        ("ฮีบรูกับอาราเมค (MACULA Hebrew)", "lang IN ('H','A')"),
        ("  ในนั้น ฮีบรู", "lang = 'H'"),
        ("  ในนั้น อาราเมค", "lang = 'A'"),
        ("  ในนั้น เลขประจำคำขึ้นต้นด้วย o", "lang IN ('H','A') AND word_id LIKE 'o%'"),
        ("  ในนั้น รหัสรูปผันขึ้นต้นด้วย H", "lang IN ('H','A') AND morph LIKE 'H%'"),
        ("กรีก (OpenGNT) — ช่อง lang ว่าง", "lang IS NULL"),
    ):
        n = c.execute(f"SELECT COUNT(*) FROM word WHERE {เงื่อนไข}").fetchone()[0]
        print(f"  {ชื่อ:38} {n:>9,} แถว")
    ทั้งหมด = c.execute("SELECT COUNT(*) FROM word").fetchone()[0]
    มาคูลา = c.execute("SELECT COUNT(*) FROM word WHERE lang IN ('H','A')").fetchone()[0]
    print(f"  ⇒ ฝั่งที่มาจาก MACULA คิดเป็น {มาคูลา*100/ทั้งหมด:.1f}% ของตาราง")

    # ④ พจนานุกรมแยกตามเล่ม
    หัวข้อ("④ คำอธิบายศัพท์แยกตามพจนานุกรม")
    for r in c.execute("SELECT source, COUNT(*) FROM lexicon_entry GROUP BY source ORDER BY 2 DESC"):
        print(f"  {r[0]:16} {r[1]:>8,} แถว")

    # ⑤ ถ้าย้ายไป Postgres จะกินที่เท่าไร — เลขคำตอบหลักของทั้งใบ
    หัวข้อ("⑤ ถ้าย้ายไป Postgres จะกินที่เท่าไร ⇒ เทียบกับโควตาแผนฟรี")
    ตารางทั้งหมด = [r[0] for r in c.execute("SELECT name FROM sqlite_master WHERE type='table'")]
    ผล = {t: ประมาณPostgres(c, t) for t in ตารางทั้งหมด}
    รวม = sum(g + d for _, g, d in ผล.values())
    print(f"{'ตาราง':20} {'แถว':>10} {'กองข้อมูล':>12} {'ดัชนี':>10} {'รวม':>10}")
    for t, (n, g, d) in sorted(ผล.items(), key=lambda x: -(x[1][1] + x[1][2])):
        print(f"{t:20} {n:>10,} {g/MB:>9.1f} MB {d/MB:>7.1f} MB {(g+d)/MB:>7.1f} MB")
    print(f"{'รวมทุกตาราง':20} {'':>10} {'':>12} {'':>10} {รวม/MB:>7.1f} MB")
    print()

    # ตัดของที่รุ่น 3 ไม่เอา — KJV อังกฤษไม่อยู่ใน 11 แหล่ง · lexeme_thai เป็นบทความของรุ่น 2
    แถวkjv, กองkjv, ดัชนีkjv = ประมาณPostgres(c, "translation_verse", "code='KJV'")
    kjv = กองkjv + ดัชนีkjv
    ไทย = ผล["lexeme_thai"][1] + ผล["lexeme_thai"][2]
    ต้องยก = รวม - kjv - ไทย
    print(f"ตัด KJV อังกฤษออก ({แถวkjv:,} แถว)   -{kjv/MB:>6.1f} MB")
    print(f"ตัด lexeme_thai ออก ({ผล['lexeme_thai'][0]} แถว)     -{ไทย/MB:>6.1f} MB")
    print(f"⇒ เหลือที่ต้องยกขึ้น Supabase   {ต้องยก/MB:>7.1f} MB")
    print()
    print(f"โควตาที่เก็บฐานข้อมูลของแผนฟรี    {500:>7.1f} MB")
    print(f"⇒ เหลือที่ว่าง                  {500 - ต้องยก/MB:>7.1f} MB")

    # ⑥ ของที่ผู้อ่านต้องโหลด ⇒ กินโควตาส่งออกเท่าไร
    หัวข้อ("⑥ ผู้อ่านโหลดเท่าไร ⇒ โควตาส่งออก 5 GB ต่อเดือน พอเปิดกี่บท")
    บท = c.execute("SELECT COUNT(*) FROM (SELECT DISTINCT book, chapter FROM verse)").fetchone()[0]
    คำ = c.execute("""SELECT SUM(LENGTH(CAST(surface AS BLOB))+LENGTH(CAST(COALESCE(translit,'') AS BLOB))
        +LENGTH(CAST(COALESCE(lemma,'') AS BLOB))+LENGTH(CAST(COALESCE(lexeme_id,'') AS BLOB))
        +LENGTH(CAST(COALESCE(morph,'') AS BLOB))+LENGTH(CAST(COALESCE(gloss,'') AS BLOB)))
        FROM word""").fetchone()[0]
    แปล = c.execute("SELECT SUM(LENGTH(CAST(text AS BLOB))) FROM translation_verse WHERE code<>'KJV'").fetchone()[0]
    รวมโหลด = คำ + แปล
    print(f"จำนวนบท                     {บท:>14,}")
    print(f"ชั้นคำภาษาเดิม              {คำ:>14,} ไบต์ = {คำ/MB:5.1f} MB")
    print(f"ตัวบทแปล 4 ฉบับ             {แปล:>14,} ไบต์ = {แปล/MB:5.1f} MB")
    print(f"รวมถ้าเปิดครบทุกบท          {รวมโหลด:>14,} ไบต์ = {รวมโหลด/MB:5.1f} MB")
    print(f"เฉลี่ยต่อบท                 {รวมโหลด/บท:>14,.0f} ไบต์ = {รวมโหลด/บท/1024:.0f} KB")
    โควตา = 5 * 1024 ** 3
    print(f"⇒ โควตา 5 GB เปิดบทได้เดือนละ {โควตา/(รวมโหลด/บท):>12,.0f} ครั้ง")

    # ⑦ ถ้าวันหนึ่งไม่พอ ตัดอะไรได้บ้าง
    หัวข้อ("⑦ ถ้าวันหนึ่งไม่พอ ตัดช่องไหนได้บ้าง (เนื้อล้วน ๆ)")
    ซ้ำ = sum(เนื้อของช่อง(c, "word", x) for x in ("book", "chapter", "verse"))
    gloss = เนื้อของช่อง(c, "word", "gloss")
    แปลPG = ผล["translation_verse"][1] + ผล["translation_verse"][2] - kjv
    print(f"ช่อง book/chapter/verse ที่ซ้ำกับ verse_ref  {ซ้ำ:>12,} ไบต์ = {ซ้ำ/MB:5.1f} MB")
    print(f"ช่อง gloss ที่ซ้ำกับตาราง lexeme            {gloss:>12,} ไบต์ = {gloss/MB:5.1f} MB")
    print(f"ย้ายตัวบทแปล 4 ฉบับออกไปเป็นไฟล์ธรรมดา      {'':>12}   ≈ {แปลPG/MB:5.1f} MB")

    # ⑧ โฟลเดอร์ไฟล์ที่เว็บรุ่น 2 ดึงไปใช้
    หัวข้อ("⑧ โฟลเดอร์ไฟล์ที่เว็บรุ่น 2 ดึงไปใช้")
    เว็บ = os.path.join(a.กอง, "webdata")
    ทั้งหมดไฟล์, ทั้งหมดไบต์ = 0, 0
    for โฟลเดอร์, _, ไฟล์ทั้งหลาย in os.walk(เว็บ):
        for ชื่อ in ไฟล์ทั้งหลาย:
            ทั้งหมดไฟล์ += 1
            ทั้งหมดไบต์ += os.path.getsize(os.path.join(โฟลเดอร์, ชื่อ))
    print(f"ทั้งโฟลเดอร์ {ทั้งหมดไฟล์:>6,} ไฟล์ {ทั้งหมดไบต์:>12,} ไบต์ = {ทั้งหมดไบต์/MB:.1f} MB")
    for ชื่อ in sorted(os.listdir(เว็บ)):
        ที่ = os.path.join(เว็บ, ชื่อ)
        if not os.path.isdir(ที่):
            continue
        n, b = 0, 0
        for โฟลเดอร์, _, ไฟล์ทั้งหลาย in os.walk(ที่):
            for f in ไฟล์ทั้งหลาย:
                n += 1
                b += os.path.getsize(os.path.join(โฟลเดอร์, f))
        print(f"  {ชื่อ:14} {n:>6,} ไฟล์ {b:>12,} ไบต์")
    return 0


if __name__ == "__main__":
    sys.exit(main())
