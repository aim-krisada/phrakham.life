# ตรวจว่า "ทุกแหล่งในบัญชี มีที่ให้โหลดได้จริง" — และของในเครื่องตรงกับที่ต้นทางแจกไหม
#
# ทำอะไร  : ยิงถามหัวไฟล์ (HEAD) ทุกที่อยู่ ⛔ ไม่โหลดตัวไฟล์ ⇒ เร็วและไม่กินเน็ต
# ใช้เมื่อ : ก่อนเชื่อบัญชี docs/บันทึก-แหล่งข้อมูล.md · หรือเมื่ออยากรู้ว่าต้นทางเปลี่ยนไหม
# รันยังไง : py -3.14 tools/ตรวจที่โหลด.py
#
# ⛔ ตัวเลขในไฟล์นี้ไม่ใช่ของจริง — ของจริงคือสิ่งที่ต้นทางตอบกลับตอนรัน
# ที่มา    : ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/2

import os
import sys
import urllib.request

# ⭐ ต้นฉบับอยู่ใน source/ ของที่เก็บนี้ (LFS) ⛔ ไม่ใช่ Downloads อีกแล้ว (ใบงาน #4)
ราก = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
กอง = os.path.join(ราก, "source")

GH = "https://github.com/{}/archive/refs/heads/{}.zip"
OB = "https://openbible-api-1.biblica.com/artifactContent/{}"

# (เลข, ชื่อ, ที่อยู่, ไฟล์ในเครื่อง, ขนาดคงที่ไหม)
# ขนาดคงที่ไหม = False สำหรับ GitHub เพราะเขาส่งไฟล์แบบ chunked ⇒ ไม่แจ้ง Content-Length มาให้เทียบ
# ⛔ ไม่ใช่เพราะ zip เปลี่ยน — ทดลองโหลดใหม่แล้ว sha256 ตรงเป๊ะ (20 ส.ค. 2569)
แหล่ง = [
    ("01", "MACULA Greek",     GH.format("Clear-Bible/macula-greek", "main"),                    "macula-greek-main.zip",             False),
    ("02", "MACULA Hebrew",    GH.format("Clear-Bible/macula-hebrew", "main"),                   "macula-hebrew-main.zip",            False),
    ("03", "morphhb",          GH.format("openscriptures/morphhb", "master"),                    "morphhb-master.zip",                False),
    ("04", "SBLGNT",           GH.format("Faithlife/SBLGNT", "master"),                          "SBLGNT-master.zip",                 False),
    ("05", "MorphGNT",         GH.format("morphgnt/sblgnt", "master"),                           "morphgnt-sblgnt-master.zip",        False),
    ("06", "OpenGNT",          GH.format("eliranwong/OpenGNT", "master"),                        None,                                False),
    ("07", "Abbott-Smith",     GH.format("translatable-exegetical-tools/Abbott-Smith", "master"), "Abbott-Smith-master.zip",          False),
    ("08", "Strong กรีก",      GH.format("morphgnt/strongs-dictionary-xml", "master"),           "strongs-dictionary-xml-master.zip", False),
    ("09", "HebrewLexicon",    GH.format("openscriptures/HebrewLexicon", "master"),              "HebrewLexicon-master.zip",          False),
    ("10", "UBS Dictionary",   GH.format("ubsicap/ubs-open-license", "main"),                    "ubs-open-license-main.zip",         False),
    ("11", "Levinsohn",        GH.format("biblicalhumanities/levinsohn", "master"),              "levinsohn-master.zip",              False),
    ("12", "TCV 2025 (USX)",   OB.format("68de930d41a2a80e0f0498cc"),                            r"tcv\usx-rev2-release.zip",         True),
    ("13", "Thai KJV (usfx)",  "https://ebible.org/Scriptures/thaKJV_usfx.zip",                  "thaKJV_usfx.zip",                   True),
    ("14", "WEB (usfx)",       "https://ebible.org/Scriptures/eng-web_usfx.zip",                 "eng-web_usfx.zip",                  True),
    ("15", "LSV (USX)",        OB.format("64bff5e9fc80f074487a4e79"),                            "lsv-rev32-release.zip",             True),
    # ⭐ ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/169 ⇒ ฉบับ KJV อังกฤษ ⇒ ตัวพ่นคือ `tools/สร้างฉบับเพิ่ม.py`
    ("16", "KJV (usfx)",       "https://ebible.org/Scriptures/eng-kjv2006_usfx.zip",             "eng-kjv2006_usfx.zip",              True),
]


def ถาม(ที่อยู่):
    """ยิงถามหัวไฟล์ ⇒ คืน (รหัสตอบ, ชื่อไฟล์ที่เขาตั้ง, ขนาดที่เขาแจ้ง)"""
    ขอ = urllib.request.Request(ที่อยู่, method="HEAD")
    ขอ.add_header("User-Agent", "phrakham-source-check")
    try:
        with urllib.request.urlopen(ขอ, timeout=60) as ตอบ:
            cd = ตอบ.headers.get("Content-Disposition") or ""
            ชื่อ = ""
            if "filename=" in cd:
                ชื่อ = cd.split("filename=", 1)[1].strip().strip('"')
            if not ชื่อ:
                ชื่อ = ตอบ.url.rsplit("/", 1)[-1]
            ขนาด = ตอบ.headers.get("Content-Length")
            return ตอบ.status, ชื่อ, int(ขนาด) if ขนาด else None
    except Exception as ผิด:  # ต้นทางล่ม หรือที่อยู่เปลี่ยน
        return None, str(ผิด)[:60], None


ผ่าน = พลาด = 0
print(f"{'#':<3} {'แหล่ง':<18} {'ตอบ':<5} {'ชื่อไฟล์ที่ต้นทางแจก':<38} {'ขนาดที่แจ้ง':>12}  ของในเครื่อง")
print("-" * 118)

for เลข, ชื่อ, ที่อยู่, ในเครื่อง, ขนาดคงที่ in แหล่ง:
    รหัส, ไฟล์, ขนาด = ถาม(ที่อยู่)
    ok = รหัส == 200
    ผ่าน, พลาด = (ผ่าน + 1, พลาด) if ok else (ผ่าน, พลาด + 1)

    # ⏸ ในเครื่อง = None ⇒ แถวที่ **ตั้งใจไม่เก็บลง source/** ⛔ ไม่ใช่ของหาย
    #    เหตุผลของแต่ละแถวอยู่ docs/บันทึก-แหล่งข้อมูล.md หัวข้อ ④ ⛔ ไม่เขียนซ้ำที่นี่
    if ในเครื่อง is None:
        print(f"{เลข:<3} {ชื่อ:<18} {str(รหัส or 'ล่ม'):<5} {ไฟล์[:38]:<38} {(f'{ขนาด:,}' if ขนาด else '-'):>12}  ⏸ ตั้งใจไม่เก็บ (ดู ④)")
        continue
    ทาง = os.path.join(กอง, ในเครื่อง)
    if os.path.exists(ทาง):
        ของเรา = os.path.getsize(ทาง)
        if ขนาดคงที่ and ขนาด is not None:
            หมายเหตุ = f"{ของเรา:,} ⇒ {'ตรงกัน' if ของเรา == ขนาด else 'ไม่ตรง ⛔ ของเก่า'}"
        else:
            หมายเหตุ = f"{ของเรา:,} (GitHub ไม่แจ้งขนาดมา ⇒ เทียบไม่ได้)"
    else:
        หมายเหตุ = "⛔ ยังไม่มีในเครื่อง"

    print(f"{เลข:<3} {ชื่อ:<18} {str(รหัส or 'ล่ม'):<5} {ไฟล์[:38]:<38} {(f'{ขนาด:,}' if ขนาด else '-'):>12}  {หมายเหตุ}")

print("-" * 118)
print(f"ที่อยู่ที่โหลดได้ {ผ่าน} จาก {len(แหล่ง)} · โหลดไม่ได้ {พลาด}")
sys.exit(1 if พลาด else 0)
