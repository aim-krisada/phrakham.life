#!/usr/bin/env python3
"""ตัดฟอนต์ Noto ที่ฝากมากับเว็บ ⇒ ไทยไม่มีหัว · ไทยมีหัว · อักษรอังกฤษ · และเครื่องหมายไม่กี่ตัว

ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/174

รัน  py -3.14 tools/ตัดฟอนต์.py <โฟลเดอร์พักไฟล์ต้นทาง>
     ⇒ โหลดไฟล์ต้นทางจาก google/fonts ที่คอมมิตตรึงไว้ข้างล่าง (มีแล้วไม่โหลดซ้ำ)
     ⇒ ทานลายนิ้วมือต้นทางทุกไฟล์ ⛔ ไม่ตรง = หยุด
     ⇒ เขียน `public/fonts/*.woff2` กับไฟล์สัญญา `*-OFL.txt` แล้วพิมพ์ขนาดกับลายนิ้วมือ

⭐ **ทำไมใช้ชุดนี้** ⇒ เว็บเพลง https://pleng.phrakham.life/ ใช้ 3 ชุดนี้ ⇒ สองเว็บของพระคำ.ชีวิตหน้าตาเป็นชุดเดียวกัน
   (ใบ #174 เกณฑ์ข้อ 2) ⇒ ไม่มีหัว = Noto Sans Thai · มีหัว = Noto Sans Thai Looped · อังกฤษ = Noto Sans

⭐ **ตัดอย่างไร** ⇒ ท่าเดียวกับเว็บเพลง v3 (`v3/pleng` → `app/assets/css/main.css` หัวไฟล์)
   ① ต้นทางเป็นฟอนต์แปรผัน 2 แกน (ความกว้าง · น้ำหนัก) ⇒ **ตรึงความกว้างไว้ที่ 100** ⇒ เว็บไม่เคยบีบหรือขยายตัวอักษร
   ② **เหลือน้ำหนัก 400 ถึง 700** ⇒ เท่าที่หน้าเว็บวาดจริง (`docs/ฟอนต์ที่ฝากมากับเว็บ.md`) ⇒ ไฟล์เดียวคลุมทุกน้ำหนัก
   ③ **เก็บเฉพาะตัวอักษรในช่วงของมัน** ⇒ ไทยเก็บแค่ตัวไทย · อังกฤษเก็บแค่ตัวละติน ⇒ ช่วงเดียวกับ `unicode-range` ใน `main.css`
      ⇒ ⛔ ช่วงสองที่นี้ต้องตรงกัน ⇒ แก้ที่นี่แล้วต้องแก้ที่นั่น
   ⇒ ⛔ ไม่ได้แก้รูปตัวอักษรตัวไหนเลย ⇒ ตัวที่เก็บไว้ได้รูปเดียวกับต้นทางทุกตัว

⭐ **ทำไมมีเครื่องหมายอีก 2 ไฟล์** ⇒ Sarabun ที่เลิกใช้มี → กับ ▶ ⇒ Noto Sans ทั้ง 3 ชุด ⛔ ไม่มี
   ⇒ ⛔ ไม่ฝาก = → บนหน้าแหล่งข้อมูลกับ ▶ บนปุ่มฟังตกไปใช้ฟอนต์ของเครื่อง (ด่านฟอนต์มากับเว็บข้อ ① จับได้เอง 15 พ.ย. 2569)
   ⇒ หยิบจากตระกูล Noto เดียวกัน ⇒ ลูกศรจาก Noto Sans Math · สามเหลี่ยมกับขีดหยุดจาก Noto Sans Symbols 2
   ⇒ ต้นทางเป็นฟอนต์น้ำหนักเดียว ⇒ ⛔ ไม่มีแกนให้ตรึง ⇒ ตัดตัวอักษรอย่างเดียว ⇒ เหลือไฟล์ละไม่กี่ร้อยไบต์
"""
import hashlib
import io
import shutil
import sys
import urllib.request
from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ราก = Path(__file__).resolve().parent.parent
ที่ออก = ราก / "public" / "fonts"

# ⭐ คอมมิตของ google/fonts ที่โหลดมา ⇒ ตรึงไว้ ⇒ รันซ้ำวันไหนก็ได้ไฟล์เดิม
คอมมิต = "cc39c4c2c304bc368c9b7c311ea2bcc6013299fe"
ฐาน = f"https://raw.githubusercontent.com/google/fonts/{คอมมิต}/ofl"

# ⭐ ช่วงตัวอักษร ⇒ ⛔ ต้องตรงกับ `unicode-range` ใน `app/assets/css/main.css`
ช่วงไทย = [(0x0E00, 0x0E7F), (0x200B, 0x200D), (0x25CC, 0x25CC)]
ช่วงละติน = [
    # ⭐ **เลือกช่วงจากตัวอักษรที่ข้อมูลใช้จริง** ⇒ นับทุกตัวใน `_data/` ⇒ ⛔ ไม่ลากทั้งช่วงมา
    #   ⇒ วัดแล้ว ช่วงเครื่องหมายกำกับทั้งก้อน (0300-036F) หนักขึ้น 16 KB · IPA ทั้งก้อน 15 KB ⇒ แต่ข้อมูลใช้แค่ไม่กี่ตัว
    #   ⇒ ตัวที่ ⛔ ไม่อยู่ในช่วง ⇒ เบราว์เซอร์วาดด้วยฟอนต์สำรองของเครื่อง ⇒ ⛔ ไม่เป็นสี่เหลี่ยมเปล่า
    (0x0000, 0x017F),  # อังกฤษ · ละตินเสริม A ⇒ ตัวอักษรของ WEB LSV KJV ⇒ ⛔ ไม่เอาละตินเสริม B (0180-024F) ⇒ ข้อมูลไม่มีสักตัว
    (0x0259, 0x0259),  # ə ⇒ คำถอดเสียงฮีบรูในการ์ดคำ (นับจาก `_data/` ได้ราว 8 หมื่นตัว)
    (0x02BC, 0x02BC),
    (0x02BE, 0x02BF),  # ʾ ʿ ⇒ คำถอดเสียงฮีบรู
    (0x0300, 0x0304),  # เครื่องหมายกำกับที่ใช้บ่อย ⇒ ข้อมูลใช้ ̄ (0304) ราว 9 พันตัว
    (0x0308, 0x0308),
    (0x0331, 0x0331),  # ̱ ⇒ คำถอดเสียงฮีบรู
    (0x034F, 0x034F),
    (0x1E00, 0x1E9F),  # ḇ ḏ ḥ ḵ ṣ ṭ ṯ ⇒ คำถอดเสียงภาษาเดิม ⇒ ⛔ ไม่เอา 1EA0-1EFF (ตัวเวียดนาม) ⇒ ข้อมูลมีแค่ 3 ตัว
    (0x2000, 0x206F),  # เครื่องหมายวรรคตอน ⇒ “ ” ‘ ’ – — …
    (0x20AC, 0x20AC),
    (0x2122, 0x2122),  # ™ ในเครดิตของ Biblica บนหน้าแหล่งข้อมูล
    (0x2212, 0x2212),  # − ⇒ ปุ่ม ก− ในแผง Aa
]
ช่วงลูกศร = [(0x2190, 0x2193)]  # ← ↑ → ↓ ⇒ ลิงก์ *→ open.bible* บนหน้าแหล่งข้อมูล
# ▶ ► ◄ ▾ ● ⇒ ปุ่มฟัง · ลูกศรในตัวบท ⇒ ❚ ⇒ ปุ่มหยุด ❚❚ ⇒ ✓ ⇒ นับจาก `_data/` กับ `app/`
ช่วงเครื่องหมาย = [(0x25B6, 0x25B6), (0x25BA, 0x25BA), (0x25BE, 0x25BE), (0x25C4, 0x25C4), (0x25CF, 0x25CF),
                   (0x2713, 0x2713), (0x275A, 0x275A)]

ชุด = [
    # (โฟลเดอร์ใน google/fonts, ไฟล์ต้นทาง, ไฟล์ที่ออก, ไฟล์สัญญา, ช่วง)
    ("notosansthai", "NotoSansThai[wdth,wght].ttf", "NotoSansThai-400-700.woff2", "NotoSansThai-OFL.txt", ช่วงไทย),
    ("notosansthailooped", "NotoSansThaiLooped[wdth,wght].ttf", "NotoSansThaiLooped-400-700.woff2",
     "NotoSansThaiLooped-OFL.txt", ช่วงไทย),
    ("notosans", "NotoSans[wdth,wght].ttf", "NotoSans-400-700.woff2", "NotoSans-OFL.txt", ช่วงละติน),
    ("notosansmath", "NotoSansMath-Regular.ttf", "NotoSansMath-arrows.woff2", "NotoSansMath-OFL.txt", ช่วงลูกศร),
    ("notosanssymbols2", "NotoSansSymbols2-Regular.ttf", "NotoSansSymbols2-marks.woff2", "NotoSansSymbols2-OFL.txt",
     ช่วงเครื่องหมาย),
]
# ⭐ ลายนิ้วมือต้นทาง ⇒ อ่านจากไฟล์ที่โหลดครั้งแรก (15 พ.ย. 2569) ⇒ รอบหน้าโหลดได้ไม่ตรง = หยุด
ลายต้นทาง = {
    "NotoSansThai[wdth,wght].ttf": "5a1c559bb539583c8a1fd99d1c5b9491e5e14478c9cd2bd0970d5c3096cc9ef8",
    "NotoSansThaiLooped[wdth,wght].ttf": "a6d220ea215bc2c4bfcd5c5efc4103e20302443f87f6dca7a9ce733a11f2cfbd",
    "NotoSans[wdth,wght].ttf": "bfb7bb691513f12e734dc346c03a03f784912432d7e3fa8e56efcf906fe86b3d",
    "NotoSansMath-Regular.ttf": "3f495fe933c06786e4d5f6d86b8ee70b6753a68ee3b9d87528726de0f6e2c47d",
    "NotoSansSymbols2-Regular.ttf": "7d5fb73b7ca67a6798101741f5d280a3d016a56a197afcd4199dbb57b4b82a21",
}


def sha(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()


def โหลด(ที่อยู่: str, ปลาย: Path) -> None:
    if ปลาย.exists():
        return
    คำขอ = urllib.request.Request(ที่อยู่, headers={"User-Agent": "font-fetch"})
    with urllib.request.urlopen(คำขอ) as r, open(ปลาย, "wb") as f:
        shutil.copyfileobj(r, f)


def ตัด(ต้นทาง: Path, ปลาย: Path, ช่วง) -> None:
    # ⛔ ตัดตัวอักษรหลังตรึงแกนในก้อนเดียวกัน ⇒ fontTools 4.67 ล้มที่ `gvar` (KeyError) ⇒ บันทึกลงหน่วยความจำแล้วเปิดใหม่ก่อน
    # ⭐ `recalcTimestamp=False` ⇒ ⛔ ไม่ประทับเวลาที่รันลงไฟล์ ⇒ รันซ้ำได้ไฟล์เดิมทุกไบต์ ⇒ ลายนิ้วมือใน `docs/` ทานได้
    ฟอนต์ = TTFont(ต้นทาง, recalcTimestamp=False)
    if "fvar" in ฟอนต์:
        ฟอนต์ = instancer.instantiateVariableFont(ฟอนต์, {"wdth": 100, "wght": (400, 700)})
    พักไว้ = io.BytesIO()
    ฟอนต์.save(พักไว้)
    พักไว้.seek(0)
    ฟอนต์ = TTFont(พักไว้, recalcTimestamp=False)
    ตัวที่มี = set(ฟอนต์.getBestCmap())
    เก็บ = sorted(c for c in ตัวที่มี if any(ต่ำ <= c <= สูง for ต่ำ, สูง in ช่วง))
    ตัว = Options()
    ตัว.flavor = "woff2"
    ตัว.layout_features = ["*"]  # ⭐ เก็บกฎวางสระ วรรณยุกต์ และตัวควบทุกข้อ ⇒ ⛔ ตัดแล้วสระลอยผิดที่
    ตัว.name_IDs = ["*"]
    ตัว.name_languages = ["*"]
    ตัว.notdef_outline = True
    ตัว.hinting = False
    s = Subsetter(ตัว)
    s.populate(unicodes=เก็บ)
    s.subset(ฟอนต์)
    ฟอนต์.flavor = "woff2"
    ฟอนต์.save(ปลาย)
    print(f"  {ปลาย.name}: เก็บ {len(เก็บ)} ตัว จากที่มี {len(ตัวที่มี)} ตัว")


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    พัก = Path(sys.argv[1])
    พัก.mkdir(parents=True, exist_ok=True)
    ที่ออก.mkdir(parents=True, exist_ok=True)
    พลาด = False
    for โฟลเดอร์, ไฟล์, ออก, สัญญา, ช่วง in ชุด:
        ต้น = พัก / ไฟล์
        โหลด(f"{ฐาน}/{โฟลเดอร์}/{urllib.request.quote(ไฟล์)}", ต้น)
        โหลด(f"{ฐาน}/{โฟลเดอร์}/OFL.txt", พัก / f"{โฟลเดอร์}-OFL.txt")
        ลาย = sha(ต้น)
        if ลายต้นทาง[ไฟล์] and ลายต้นทาง[ไฟล์] != ลาย:
            print(f"⛔ {ไฟล์} ลายนิ้วมือไม่ตรง ⇒ ได้ {ลาย} ⇒ ต้องเป็น {ลายต้นทาง[ไฟล์]}")
            พลาด = True
            continue
        print(f"{ไฟล์} sha256 {ลาย}")
        ตัด(ต้น, ที่ออก / ออก, ช่วง)
        # ⭐ สัญญาคัดไบต์มาตรง ๆ ⛔ ไม่พิมพ์ตาม ⇒ ชื่อไฟล์ขึ้นต้นด้วยชื่อฟอนต์ ⇒ วางคู่ไฟล์ฟอนต์ของมัน
        shutil.copyfile(พัก / f"{โฟลเดอร์}-OFL.txt", ที่ออก / สัญญา)
    if พลาด:
        return 1
    print("\nไฟล์ที่ออก")
    for p in sorted(ที่ออก.iterdir()):
        print(f"  {p.name}  {p.stat().st_size:,} ไบต์  sha256 {sha(p)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
