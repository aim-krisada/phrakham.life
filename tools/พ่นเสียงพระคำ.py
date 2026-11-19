#!/usr/bin/env python3
"""พ่น **เสียงอ่านพระคำรายข้อ** ของฉบับอื่นนอกจาก TCV ด้วย Google Cloud TTS ⇒ ⛔ รันบนเครื่องของพี่เอมเท่านั้น ⛔ ไม่รันในท่อ

ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/132 ⇒ มาระโกทั้งเล่มของ LSV · WEB · THKJV

รัน (บนเครื่องที่มีที่เก็บรุ่น 2 กับ ffmpeg)
  py -3.14 tools/พ่นเสียงพระคำ.py LSV                  ⇒ วางแผนให้ดู ⛔ ไม่ยิง ⛔ ไม่กินโควตา
  py -3.14 tools/พ่นเสียงพระคำ.py LSV --ยิง            ⇒ ยิงจริง ⇒ `เสียง/ข้อ/LSV/*.puck.mp3` กับ `เสียง/ที่มา/LSV.puck.json`
  py -3.14 tools/พ่นเสียงพระคำ.py LSV --ยิง --บท 1     ⇒ ยิงแค่บทเดียว ⇒ ใช้วัดอัตราอ่านก่อนยิงทั้งเล่ม ⇒ ⛔ ไม่เขียนรายการ
  py -3.14 tools/พ่นเสียงพระคำ.py LSV --ยิง --ทำใหม่ Mark.3.4 Mark.9.2
      ⇒ ทิ้งเสียงดิบของข้อเหล่านั้นแล้วยิงใหม่ ⇒ ใช้กับข้อที่เสียงสั้นผิดปกติ (ใบ #132 ข้อ 10)

## ⛔⛔ เงิน ⇒ สมุดนับโควตาตัวเดียวกับรุ่น 2

ทุกคำขอผ่าน `QuotaLedger.reserve()` ของ `etl/audio_ledger.py` ในที่เก็บรุ่น 2 **ก่อนยิง** ⇒ หักก่อน ยิงทีหลัง
⇒ สมุดอยู่ที่ OneDrive `4 Personal/claude/.tts-quota.json` ⇒ **เล่มเดียวทั้งเครื่อง** ⇒ เพดาน 700,000 ต่อเดือน
⇒ ⭐ ก่อนยิงคิดยอดทั้งรอบแล้วถาม `check()` ⇒ **ไม่พอ = ⛔ ไม่ยิงสักคำขอ** ⇒ ⛔ ไม่ทิ้งของครึ่งเล่มไว้
⇒ ยิงแล้วล้มกลางทาง ⇒ **หยุดทั้งรอบ ⛔ ไม่วนยิงซ้ำ** ⇒ เสียงดิบที่ได้แล้วเก็บไว้นอกที่เก็บ ⇒ รันใหม่ ⛔ ไม่เสียซ้ำ

## ⛔⛔ กุญแจ `GOOGLE_TTS_API_KEY`

อ่านจาก `.env` ด้วย `_read_key` ของรุ่น 2 ตอนยิงเท่านั้น ⇒ ⛔ ไม่พิมพ์ ⛔ ไม่เขียนลงไฟล์
⇒ ข้อความผิดพลาดทุกบรรทัดถูกล้างกุญแจออกก่อนพิมพ์ (`_scrub` ของรุ่น 2)

## ⭐ ของที่ยืมจากรุ่น 2 ⇒ import มาใช้ตรง ๆ ⛔ ไม่แก้ที่เก็บนั้น

`_read_key` · `_scrub` · `QuotaLedger` · `_RateLimiter` · `_encode` (ต่อเสียงแล้วเข้ารหัส mp3 48k) · `write_tags`
⇒ ⛔ **ไม่ใช้ `synthesize` ของรุ่น 2** ⇒ ตัวนั้นตรึงภาษาไว้ที่ `th-TH` ⇒ เสียงอังกฤษต้องส่ง `en-US`
  ⇒ ตัวยิงข้างล่างเขียนท่าเดียวกันทุกบรรทัด ⇒ **หักสมุดก่อนยิงทุกคำขอ** ⇒ ⛔ ไม่วนยิงซ้ำตอนล้ม

## ⭐⭐ ของที่ทำให้เชื่อไฟล์เสียงได้

1. **ข้อความที่ส่งคิดจากตัวบทใน `_data/เนื้อบท.json.gz`** ⇒ ตัวบทเดียวกับที่ตาเห็นบนเว็บ
   ⇒ สูตรอยู่ที่ `ตัวบทที่ส่งไปพ่นของฉบับ()` ใน `tools/เสียงที่พ่นไว้.py` ⇒ ลายนิ้วมือของข้อความที่ส่งจริงลงรายการทุกข้อ
2. **ทุกข้อเทียบความยาวเสียงกับจำนวนตัวอักษร** ⇒ นอกช่วงที่ยอมรับ ⇒ **⛔ ไม่เขียนรายการ** และบอกรหัสข้อให้สั่ง `--ทำใหม่`
   ⇒ อัตราอ่านกับช่วงที่ยอมรับอยู่ที่ `tools/เสียงที่พ่นไว้.py` ⇒ ด่าน `tools/ด่านเสียงทุกฉบับ.py` ใช้ชุดเดียวกัน
3. **ก้อนละไม่เกิน 300 ตัวอักษร** ⇒ เพดานของ Cloud TTS ⇒ มาระโกข้อยาวสุดราว 270 ⇒ 1 ข้อ 1 คำขอ ⇒ เกินเมื่อไร หยุดก่อนยิง

## ⭐⭐ TCV เล่มที่เหลือ ⇒ ทำวันละนิด (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/171)

  py -3.14 tools/พ่นเสียงพระคำ.py TCV --สถานะ            ⇒ ถึงเล่มไหนแล้ว ⇒ อ่านจากรายการในที่เก็บ ⛔ ไม่ยิง
  py -3.14 tools/พ่นเสียงพระคำ.py TCV --คืนนี้           ⇒ วางแผนของคืนนี้ให้ดู ⛔ ไม่ยิง
  py -3.14 tools/พ่นเสียงพระคำ.py TCV --คืนนี้ --ยิง     ⇒ ยิงจริง ⇒ ตัวที่งานตั้งเวลาเรียกผ่าน `tools/ทำเสียงTCVรายคืน.py`
  py -3.14 tools/พ่นเสียงพระคำ.py TCV --คืนนี้ --ยิง --บทมากสุด 1   ⇒ ทำแค่บทถัดไปบทเดียว

1. **ทำต่อจากบทสุดท้ายที่มีเสียง ทีละบทเต็ม** ⇒ ลำดับคือ `ลำดับเล่มTCV` ใน `tools/เสียงที่พ่นไว้.py`
   ⇒ บทที่มีเสียงต้องเรียงต่อกันจากบทแรกของลำดับ ⛔ ไม่มีรู ⇒ ตัวพ่นเช็กก่อนทำ ⇒ ด่านเช็กซ้ำในท่อ
2. **งบคืนละ `คืนละ` ตัวอักษร** ⇒ และ ⛔ ไม่ทำถ้ายอดทั้งเดือนในสมุดจะเกิน `เพดาน − กันให้เรื่องเล่า`
   ⇒ บทไหนใส่ไม่พอดีงบ ⇒ จบคืน ⇒ คืนต่อไปเริ่มที่บทนั้น ⇒ เสียงดิบที่จ่ายแล้วไม่ต้องจ่ายซ้ำ
3. **ข้อยาวเกิน 300 ตัว** (TCV มี 13 ข้อ ยาวสุด โยชูวา 8:33 = 371 ตัว) ⇒ ตัดเป็นก้อนที่ช่องว่างก่อนตัวที่ 300 ⇒ ต่อเสียงคั่นเงียบ 350 มิลลิวินาที
   ⇒ ช่วงเงียบเท่ากับที่รุ่น 2 คั่นประโยคในเสียงบทความ (`PAUSE_MS`)
4. **ข้อเพี้ยน** ⇒ ความยาวเสียงนอก `ช่วงสัดส่วนที่ยอมรับ` ⇒ **บทนั้น ⛔ ไม่เข้าเว็บ** ⇒ จดลงช่อง `redo` ของรายการ
   ⇒ ทิ้งเสียงดิบของข้อนั้น ⇒ คืนต่อไปยิงใหม่เฉพาะข้อนั้น ⇒ เพี้ยนครบ `เพี้ยนได้กี่คืน` คืน ⇒ หยุดรอคน ⛔ ไม่ยิงอีก
5. **ล้มกลางทาง** ⇒ หยุดทั้งคืน ⛔ ไม่วนยิงซ้ำ ⇒ รหัสออกบอกว่าเป็นแบบไหน (ดู `รหัสออก` ข้างล่าง)
"""
import argparse
import base64
import gzip
import hashlib
import importlib
import json
import os
import shutil
import sys
import threading
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, str(Path(__file__).resolve().parent))
from เสียงที่พ่นไว้ import (ลายนิ้วมือ, เสียงของฉบับ, เล่มที่มีเสียงของฉบับอื่น,  # noqa: E402
                           ตัวบทที่ส่งไปพ่นของฉบับ, ช่วงสัดส่วนที่ยอมรับ, อัตราอ่านของภาษา,
                           เสียงTCV, บทTCVตามลำดับ, ข้อTCVของบท, ข้อที่ขาดในบท, ช่องว่างศูนย์)

ราก = Path(__file__).resolve().parent.parent
ซองเนื้อบท = ราก / "_data" / "เนื้อบท.json.gz"
กองเสียง = ราก / "เสียง" / "ข้อ"
ที่มา = ราก / "เสียง" / "ที่มา"

ETL_รุ่น2 = Path(os.environ.get("PHRAKHAM_LIFE2_ETL", r"D:\aimgit.aimagin.com\krisada\phrakham.life2\etl"))
ที่ของ_ffmpeg = os.environ.get("PHRAKHAM_FFMPEG_DIR", r"C:\Program Files\ShareX")
ที่พักเสียงดิบ = Path(os.environ.get("PHRAKHAM_TTS_CACHE", Path(os.environ.get("TEMP", "/tmp")) / "phrakham-tts-cache"))

เครื่องพ่น_ = "Google Cloud Text-to-Speech v1 text:synthesize"
ที่ยิง = "https://texttospeech.googleapis.com/v1/text:synthesize"
ก้อนยาวสุด = 300
คนยิงพร้อมกัน = 6
ชื่อเล่มไทย = {"MRK": "มาระโก"}

# ⭐⭐ **ที่มาและสัญญาอนุญาตของแต่ละฉบับ** (ใบ #132 ข้อ 17) ⇒ ทานจากหน้าของเจ้าของฉบับเอง 4 พ.ย. 2569
#   ⇒ ประโยค `notice` ขึ้นจอใต้หัว *เสียงอ่านนี้มาจากไหน* และฝังใน ID3 ของทุกไฟล์ ⇒ ไฟล์ที่ถูกโหลดออกไปพกเครดิตไปด้วย
#   ⛔ ห้ามมี `⇒` `⛔` ⇒ ฟอนต์ที่ฝากมากับเว็บ ⛔ ไม่มีตัวอักษรพวกนั้น (`tools/ด่านฟอนต์มากับเว็บ.mjs`)
#   ⭐ ถ้อยคำ G ร่าง ⇒ N ตรวจผ่าน 4 พ.ย. 2569 (เซสชัน `a132-ฟัง`) ⇒ **รอพี่เอมอนุมัติในคำขอรวมของใบ #132**
แหล่งของฉบับ = {
    "LSV": {
        "name": "Literal Standard Version (LSV)",
        "publisher": "Covenant Press",
        "url": "https://open.bible/bibles/english-covenant-text-bible",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
        # ⭐ BY-SA ยอมให้ดัดแปลง ⇒ ถือเป็นของดัดแปลงไว้ก่อนแบบเดียวกับ TCV ⇒ เสียงจึงอยู่ใต้ BY-SA 4.0 ด้วย
        "adapted": True,
        "adaptedLicense": "CC BY-SA 4.0",
        "permission": "CC BY-SA 4.0 อนุญาตให้ทำซ้ำ ดัดแปลง และเผยแพร่ เมื่อให้เครดิตและใช้สัญญาเดียวกัน",
        "notice": (
            "ข้อความจาก Literal Standard Version (LSV) ของ Covenant Press\n"
            "เผยแพร่ภายใต้สัญญาอนุญาต CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0/\n"
            "ต้นฉบับ https://open.bible/bibles/english-covenant-text-bible\n"
            "เสียงอ่านนี้แปลงข้อความข้างต้นเป็นเสียงพูดด้วยเครื่องอ่านออกเสียงของ Google และเผยแพร่ภายใต้ CC BY-SA 4.0 เช่นกัน\n"
            "เผยแพร่ตามสภาพ ไม่มีการรับประกันใด ๆ ทั้งสิ้น"
        ),
    },
    "WEB": {
        "name": "World English Bible (WEB)",
        "publisher": "eBible.org",
        "url": "https://ebible.org/find/details.php?id=eng-web",
        "license": "สาธารณสมบัติ",  # ⭐ คำเดียวกับบรรทัด สัญญา ของหน้าแหล่งข้อมูล ⇒ `ด่านแผนภาพตรงรายชื่อ` ข้อ ⑨ เทียบตรงตัว
        "licenseUrl": "https://ebible.org/find/details.php?id=eng-web",
        "adapted": False,
        "permission": "สาธารณสมบัติ ทำซ้ำและเผยแพร่ได้ ชื่อ World English Bible เป็นเครื่องหมายการค้าของ eBible.org"
                      " ใช้ชื่อนี้ได้เมื่อไม่เปลี่ยนคำของตัวบท",
        "notice": (
            "ข้อความจาก World English Bible (WEB) ซึ่งเป็นสาธารณสมบัติ\n"
            "ต้นฉบับ https://ebible.org/find/details.php?id=eng-web\n"
            "World English Bible เป็นเครื่องหมายการค้าของ eBible.org\n"
            "เสียงอ่านนี้แปลงข้อความข้างต้นเป็นเสียงพูดด้วยเครื่องอ่านออกเสียงของ Google อ่านคำต่อคำ ไม่เปลี่ยนคำ"
        ),
    },
    "THKJV": {
        "name": "Thai KJV 2003",
        "publisher": "Philip Pope",
        "url": "https://ebible.org/find/details.php?id=thaKJV",
        "license": "CC BY-NC-ND 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
        # ⛔⛔ **ND ห้ามดัดแปลง** ⇒ เสียงนี้ ⛔ ไม่ใช่ของดัดแปลง ⇒ อ่านคำต่อคำ ⛔ ไม่เปลี่ยนคำหรือเครื่องหมาย
        #   ⇒ เหตุผลเต็มอยู่ที่ `permission` ข้างล่าง ⇒ **รอพี่เอมเคาะในคำขอรวมของใบ #132**
        "adapted": False,
        "permission": "ผู้ให้สัญญาอนุญาตให้แจกจ่ายในทุกรูปแบบ (any format) เมื่อให้เครดิต ไม่ขายหากำไร"
                      " และไม่เปลี่ยนคำหรือเครื่องหมายวรรคตอน ข้อ 2(a)(4) ของ CC 4.0 บอกว่าการเปลี่ยนรูปแบบ"
                      " ไม่นับเป็นการดัดแปลง เสียงนี้อ่านคำต่อคำ ไม่เปลี่ยนคำ ไม่ขาย",
        "notice": (
            "ข้อความจาก Thai KJV 2003 copyright © 2003 Philip Pope จาก ebible.org\n"
            "เผยแพร่ภายใต้สัญญาอนุญาต CC BY-NC-ND 4.0 https://creativecommons.org/licenses/by-nc-nd/4.0/\n"
            "ต้นฉบับ https://ebible.org/find/details.php?id=thaKJV\n"
            "เสียงอ่านนี้อ่านข้อความข้างต้นคำต่อคำด้วยเครื่องอ่านออกเสียงของ Google ไม่เปลี่ยนคำหรือเครื่องหมายวรรคตอน ไม่มีการขาย"
        ),
    },
}


class หยุดรอบ(Exception):
    pass


def อ่านซอง() -> dict:
    ไบต์ = ซองเนื้อบท.read_bytes()
    if ไบต์[:40].startswith(b"version https://git-lfs"):
        sys.exit(f'⛔ {ซองเนื้อบท} เป็นตัวชี้ของ Git LFS ⇒ สั่ง git lfs pull -I "_data/" ก่อน')
    return json.loads(gzip.decompress(ไบต์).decode("utf-8"))["บท"]


def วางแผน(ฉบับ: str, เฉพาะบท: int | None) -> list[dict]:
    บท = อ่านซอง()
    แผน = []
    for รหัสเล่ม, osis in เล่มที่มีเสียงของฉบับอื่น.items():
        c = 1
        while f"{รหัสเล่ม}/{c}" in บท:
            if เฉพาะบท is None or เฉพาะบท == c:
                ชั้น = (บท[f"{รหัสเล่ม}/{c}"].get(ฉบับ) or {})
                for v in sorted(ชั้น, key=int):
                    ข้อความ = ตัวบทที่ส่งไปพ่นของฉบับ(ฉบับ, ชั้น[v])
                    แผน.append({
                        "id": f"{osis}.{c}.{v}", "osis": osis, "c": c, "v": int(v),
                        "ref": f"{ชื่อเล่มไทย[รหัสเล่ม]} {c}:{v}", "text": ข้อความ,
                    })
            c += 1
    return แผน


def โหลดรุ่น2():
    # ⭐ ffmpeg ⇒ ตั้งเองได้ด้วย PHRAKHAM_FFMPEG_DIR ⇒ ไม่ตั้ง ⇒ ลองที่ของ ShareX แล้วตัวที่มากับ SnapDownloader
    #   ⇒ 15 พ.ย. 2569 เครื่องพี่เอม ⛔ ไม่มี ShareX แล้ว ⇒ ตัวที่ยังอยู่คือของ SnapDownloader (มี libmp3lame กับ loudnorm ครบ)
    #   ⛔ **หาไม่เจอ = หยุดก่อนยิง** ⇒ ใบ #171 ลองจริงครั้งแรกจ่ายค่ายิงไปแล้วค่อยมาตายตอนเข้ารหัส ⇒ เสียงดิบอยู่ที่พักจึงไม่เสียซ้ำ
    os.environ["PATH"] = os.pathsep.join([ที่ของ_ffmpeg, os.environ.get("PATH", ""),
                                          r"C:\Program Files\SnapDownloader\resources\win"])
    if not shutil.which("ffmpeg"):
        sys.exit("⛔ หา ffmpeg ไม่เจอ ⇒ ตั้ง PHRAKHAM_FFMPEG_DIR เป็นโฟลเดอร์ที่มี ffmpeg.exe ⇒ ยังไม่ได้ยิงอะไร")
    sys.dont_write_bytecode = True  # ⛔ ไม่ทิ้ง .pyc ลงที่เก็บรุ่น 2
    sys.path.insert(0, str(ETL_รุ่น2))
    try:
        return importlib.import_module("gen_audio")
    except ImportError as e:
        sys.exit(f"⛔ เปิด gen_audio ของรุ่น 2 ที่ {ETL_รุ่น2} ไม่ได้ ({e}) ⇒ ตั้ง PHRAKHAM_LIFE2_ETL")


def ที่เก็บดิบของ(เสียง: str, ภาษา: str, ข้อความ: str) -> Path:
    return ที่พักเสียงดิบ / f"{hashlib.sha256(f'{เครื่องพ่น_}|{เสียง}|{ภาษา}|{ข้อความ}'.encode()).hexdigest()}.pcm"


def ยิง(ga, ข้อความ: str, กุญแจ: str, เสียง: str, ภาษา: str, สมุด) -> bytes:
    """1 ข้อ ⇒ เสียงดิบ 16 บิต โมโน ⇒ **หักสมุดก่อนยิงทุกครั้ง** ⇒ ล้ม = โยนต่อ ⛔ ไม่วนยิงซ้ำ"""
    ตัว = json.dumps({
        "input": {"text": ข้อความ},
        "voice": {"languageCode": ภาษา, "name": เสียง},
        "audioConfig": {"audioEncoding": "LINEAR16", "sampleRateHertz": ga.SAMPLE_RATE},
    }).encode("utf-8")
    คำขอ = urllib.request.Request(f"{ที่ยิง}?key={กุญแจ}", data=ตัว,
                                  headers={"Content-Type": "application/json"}, method="POST")
    สมุด.reserve(len(ข้อความ))  # ⛔ เกินเพดาน ⇒ QuotaExceeded ⇒ คำขอนี้ ⛔ ไม่ได้ออกไป
    try:
        with urllib.request.urlopen(คำขอ, timeout=90) as ตอบ:
            ผล = json.loads(ตอบ.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise ga.SynthesisError(f"HTTP {e.code}: {ga._scrub(e.read().decode('utf-8', 'replace')[:300], กุญแจ)}") from None
    except (urllib.error.URLError, TimeoutError) as e:
        raise ga.SynthesisError(ga._scrub(str(e), กุญแจ)) from None
    return ga._pcm_from_wav(base64.b64decode(ผล["audioContent"]))


# ===========================================================================
# ⭐⭐ TCV เล่มที่เหลือ ⇒ ทำวันละนิด (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/171)
# ===========================================================================

รายการTCVเดิม = ที่มา / "verses.puck.json"   # ⛔ ของรุ่น 2 ⇒ อ่านอย่างเดียว ⇒ เป็นหลักฐานของชุดมาระโกกับกิจการ
รายการTCV = ที่มา / "TCV.puck.json"

#: ⭐⭐ **งบคืนละ 15,000 ตัวอักษร** ⇒ 31 คืนได้มากสุด 465,000 ⇒ ต่ำกว่าเพดาน 700,000 ของสมุด
#:   ⇒ บทยาวสุดของ TCV คือสดุดี 119 ราว 13,300 ตัว ⇒ งบนี้ใส่บทไหนก็ได้ทั้งบท ⇒ ⛔ ไม่มีบทที่ติดค้างตลอดไป
คืนละ = 15_000
#: ⭐⭐ **กันไว้ให้เสียงเรื่องเล่าอย่างน้อยเท่านี้ต่อเดือน** (ใบ #171 เกณฑ์ข้อ 2)
#:   ⇒ คืนไหนยอดทั้งเดือนในสมุดจะเกิน เพดาน − ค่านี้ (550,000) ⇒ คืนนั้น ⛔ ไม่ทำ ⇒ เรื่องเล่ายังมีที่เหลือ
กันให้เรื่องเล่า = 150_000
#: ข้อเดียวกันเพี้ยนกี่คืนแล้วหยุดรอคน ⇒ Chirp 3 HD พูดไม่เหมือนเดิมทุกครั้ง ⇒ คืนที่สองมักผ่าน ⇒ 3 คืนยังเพี้ยน = ต้องมีคนดู
เพี้ยนได้กี่คืน = 3
#: ช่วงเงียบระหว่างก้อนของข้อที่ยาวเกิน 300 ⇒ เท่ากับ `PAUSE_MS` ของรุ่น 2 ที่คั่นประโยคในเสียงบทความ
เงียบระหว่างก้อน_มิลลิ = 350

#: ⭐ **รหัสออก** ⇒ ตัวรายคืนอ่านตัวเลขนี้ตัดสินว่าจะทำอะไรต่อ ⛔ ไม่อ่านข้อความ
รหัสออก = {
    "ได้ของใหม่": 0,      # ได้บทใหม่ หรือจดข้อเพี้ยนลงรายการ ⇒ มีของให้คอมมิต
    "ไม่มีงาน": 10,       # ครบแล้ว หรืองบคืนนี้ไม่พอแม้แต่บทเดียว ⇒ ⛔ ไม่ใช่ความผิด ⇒ ⛔ ไม่แจ้งในใบ
    "ล้ม": 3,             # ยิงไม่ผ่าน ⇒ หยุดทั้งคืน ⛔ ไม่ยิงซ้ำ
    "รอคน": 4,            # ข้อเดียวกันเพี้ยนครบ `เพี้ยนได้กี่คืน` คืน ⇒ ⛔ ไม่ยิงอีก
    "รายการพัง": 5,       # รายการกับตัวบทไม่ลงรอยกัน ⇒ ⛔ ไม่ยิง
    "เครื่องไม่พร้อม": 6,  # หา ffmpeg ไม่เจอ หรือเข้ารหัส mp3 ไม่ได้ ⇒ ⛔ ไม่ยิง
}


def เข้ารหัสmp3(ga, pcms: list[bytes], เงียบ: bytes, ไฟล์: Path) -> None:
    """ท่าเดียวกับ `_encode` ของรุ่น 2 ทุกค่า ⇒ ต่อเสียงดิบ ⇒ loudnorm ⇒ mp3 โมโน 48k ⇒ **เพิ่มแค่ `-c:a libmp3lame`**

    ⛔ **ทำไมไม่เรียก `_encode` ของรุ่น 2 ตรง ๆ** ⇒ มัน ⛔ ไม่ระบุตัวเข้ารหัส ⇒ ffmpeg เลือกเอง
      ⇒ ตัวที่มากับ SnapDownloader เลือก `mp3_mf` ของวินโดวส์ ⇒ รับเสียง 24 kHz ไม่ได้ ⇒ ล้มทุกไฟล์ (ลองจริง 15 พ.ย. 2569)
      ⇒ ระบุ `libmp3lame` เอง ⇒ ได้ตัวเข้ารหัสเดียวกับไฟล์ชุดมาระโกกับกิจการ ไม่ว่าเครื่องจะมี ffmpeg ตัวไหน
    """
    import subprocess
    import tempfile
    import wave
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as fh:
        tmp = fh.name
    try:
        with wave.open(tmp, "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(ga.SAMPLE_RATE)
            w.writeframes(เงียบ.join(pcms))
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", tmp, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
                        "-ac", "1", "-c:a", "libmp3lame", "-b:a", ga.MP3_BITRATE, str(ไฟล์)], check=True)
    finally:
        os.unlink(tmp)


def อ่านซองเต็ม() -> dict:
    ไบต์ = ซองเนื้อบท.read_bytes()
    if ไบต์[:40].startswith(b"version https://git-lfs"):
        sys.exit(f'⛔ {ซองเนื้อบท} เป็นตัวชี้ของ Git LFS ⇒ สั่ง git lfs pull -I "_data/" ก่อน')
    return json.loads(gzip.decompress(ไบต์).decode("utf-8"))


def ชื่อเล่มไทยจากซอง(ซอง: dict) -> dict[str, str]:
    """ชื่อเล่มภาษาไทยจากบัญชีของซองตัวบท ⇒ ชื่อเดียวกับที่หน้าเว็บแสดง ⇒ ถอดช่องว่างศูนย์ออก เพราะไปอยู่ในป้ายของไฟล์"""
    return {e["รหัส"]: e["ชื่อไทย"].replace(ช่องว่างศูนย์, "") for e in ซอง["บัญชี"]["เล่ม"]}


def ตัดก้อน(ข้อความ: str) -> list[str]:
    """ข้อที่ยาวเกิน `ก้อนยาวสุด` ⇒ ตัดที่ช่องว่างตัวสุดท้ายก่อนถึงเพดาน ⇒ ช่องว่างตรงรอยตัดหายไป ⛔ ไม่ส่ง
    ⇒ ⛔ ไม่มีช่องว่างให้ตัด = หยุดก่อนยิง ⇒ ตัดกลางคำแล้วเสียงไทยอ่านผิด แย่กว่าไม่มีเสียง
    """
    ก้อน, เหลือ = [], ข้อความ
    while len(เหลือ) > ก้อนยาวสุด:
        ที่ตัด = เหลือ.rfind(" ", 0, ก้อนยาวสุด + 1)
        if ที่ตัด <= 0:
            raise ValueError(f"ข้อนี้ยาว {len(ข้อความ)} ตัว และ ⛔ ไม่มีช่องว่างให้ตัดก่อนตัวที่ {ก้อนยาวสุด}")
        ก้อน.append(เหลือ[:ที่ตัด])
        เหลือ = เหลือ[ที่ตัด + 1:]
    ก้อน.append(เหลือ)
    return ก้อน


def แผนTCV(ซอง: dict) -> list[dict]:
    """ทุกบทของเล่มที่เหลือตามลำดับ ⇒ แต่ละบทพกข้อ ข้อความที่ส่ง และก้อนที่จะยิง"""
    บท = ซอง["บท"]
    ชื่อ = ชื่อเล่มไทยจากซอง(ซอง)
    ได้ = []
    for รหัสเล่ม, osis, c in บทTCVตามลำดับ(บท):
        ข้อ = ข้อTCVของบท(บท, รหัสเล่ม, c)
        ได้.append({
            "เล่ม": รหัสเล่ม, "osis": osis, "c": c, "ชื่อ": ชื่อ[รหัสเล่ม], "รหัสบท": f"{osis}.{c}",
            "ข้อ": [{"id": f"{osis}.{c}.{v}", "v": v, "ref": f"{ชื่อ[รหัสเล่ม]} {c}:{v}",
                     "text": t, "ก้อน": ตัดก้อน(t)} for v, t in ข้อ.items()],
            "ขาด": ข้อที่ขาดในบท(ข้อ),
        })
    return ได้


def เปิดรายการTCV() -> dict:
    if รายการTCV.exists():
        return json.loads(รายการTCV.read_text(encoding="utf-8"))
    เดิม = json.loads(รายการTCVเดิม.read_text(encoding="utf-8"))
    # ⭐ เริ่มรายการใหม่ ⇒ **ที่มาและสัญญาอนุญาตยกมาจากรายการของรุ่น 2 ทั้งก้อน** ⛔ ไม่พิมพ์ใหม่
    #   ⇒ ประกาศในไฟล์และบนจอของเล่มใหม่ต้องตรงกับมาระโกกับกิจการทุกตัวอักษร ⇒ ด่านชนสองก้อนนี้ทุกท่อ
    return {
        "v": 1, "version": "TCV", "voice": เสียงTCV, "languageCode": "th-TH",
        "rateHz": None, "bitrate": None, "engine": เครื่องพ่น_,
        "generator": "tools/พ่นเสียงพระคำ.py TCV --คืนนี้", "generated": None, "dir": "",
        "source": เดิม["source"], "verses": {}, "gaps": [], "redo": {}, "nights": [],
    }


def บทที่เสร็จ(รายการ: dict, แผน: list[dict]) -> tuple[int, list[str]]:
    """นับบทที่มีเสียงครบทุกข้อ **ต่อกันจากบทแรกของลำดับ** ⇒ คืน (จำนวนบท, ปัญหา)

    ⛔ บทที่มีเสียงแค่บางข้อ หรือบทที่มีเสียงหลังรู = รายการพัง ⇒ ตัวพ่น ⛔ ไม่ยิงต่อ ⇒ ต้องมีคนดู
    """
    มี = set(รายการ.get("verses") or {})
    ปัญหา, ต่อกัน, เจอรู = [], 0, False
    for บ in แผน:
        ของบท = {x["id"] for x in บ["ข้อ"]}
        ครบ = ของบท <= มี
        บางข้อ = bool(ของบท & มี) and not ครบ
        if บางข้อ:
            ปัญหา.append(f"{บ['รหัสบท']} มีเสียงแค่ {len(ของบท & มี)} จาก {len(ของบท)} ข้อ")
        if ครบ and not เจอรู:
            ต่อกัน += 1
        elif ครบ and เจอรู:
            ปัญหา.append(f"{บ['รหัสบท']} มีเสียง แต่บทก่อนหน้าบางบทยังไม่มี ⇒ ข้ามบท")
        else:
            เจอรู = True
    รู้จัก = {x["id"] for บ in แผน for x in บ["ข้อ"]}
    for รหัส in sorted(มี - รู้จัก):
        ปัญหา.append(f"{รหัส} อยู่ในรายการ แต่ ⛔ ไม่มีตัวบทในเล่มที่เหลือ")
    return ต่อกัน, ปัญหา


def สรุปTCV() -> list[str]:
    """ความคืบหน้าเป็นข้อ ๆ ⇒ อ่านจากรายการในที่เก็บอย่างเดียว ⇒ ตัวรายคืนเอาไปเขียนในคำขอรวมทุกคืน"""
    ซอง = อ่านซองเต็ม()
    แผน = แผนTCV(ซอง)
    รายการ = เปิดรายการTCV()
    เสร็จ, ปัญหา = บทที่เสร็จ(รายการ, แผน)
    ตัวทั้งหมด = sum(len(x["text"]) for บ in แผน for x in บ["ข้อ"])
    ตัวเสร็จ = sum(len(x["text"]) for บ in แผน[:เสร็จ] for x in บ["ข้อ"])
    เล่มครบ = [แผน[i]["ชื่อ"] for i in range(เสร็จ) if i + 1 == len(แผน) or แผน[i + 1]["เล่ม"] != แผน[i]["เล่ม"]]
    บรรทัด = [
        f"1. ทำเสียงแล้ว {เสร็จ:,} จาก {len(แผน):,} บท ⇒ {ตัวเสร็จ:,} จาก {ตัวทั้งหมด:,} ตัวอักษร ({100 * ตัวเสร็จ / ตัวทั้งหมด:.1f}%)",
        f"2. เล่มที่ครบแล้ว {len(เล่มครบ)} จาก {len({บ['เล่ม'] for บ in แผน})} เล่ม ⇒ "
        + (" · ".join(เล่มครบ) if เล่มครบ else "ยังไม่มี") + " ⇒ มาระโกกับกิจการมีเสียงอยู่ก่อนแล้ว",
    ]
    if เสร็จ < len(แผน):
        ถัดไป = แผน[เสร็จ]
        ของเล่ม = [บ for บ in แผน if บ["เล่ม"] == ถัดไป["เล่ม"]]
        ได้แล้ว = sum(1 for บ in แผน[:เสร็จ] if บ["เล่ม"] == ถัดไป["เล่ม"])
        บรรทัด.append(f"3. กำลังทำ {ถัดไป['ชื่อ']} ⇒ ได้ {ได้แล้ว} จาก {len(ของเล่ม)} บท ⇒ บทถัดไปคือ {ถัดไป['ชื่อ']} {ถัดไป['c']}")
    else:
        บรรทัด.append("3. ครบทุกเล่มแล้ว")
    รอ = รายการ.get("redo") or {}
    บรรทัด.append(f"4. ข้อที่เสียงเพี้ยนรอทำใหม่ {len(รอ)} ข้อ" + ("".join(
        f"\n- 4.{i} {e['ref']} ⇒ เพี้ยนมาแล้ว {e['nights']} คืน ⇒ ยาว {e['ratio']} เท่าของที่ควรได้"
        for i, e in enumerate(รอ.values(), 1))))
    คืน = รายการ.get("nights") or []
    if คืน:
        ท้าย = คืน[-1]
        บรรทัด.append(f"5. คืนล่าสุด {ท้าย['date']} ⇒ {len(ท้าย['chapters'])} บท ⇒ ส่งไปพ่น {ท้าย['chars']:,} ตัวอักษร")
    if ปัญหา:
        บรรทัด.append("6. ⛔ รายการพัง ⇒ " + " · ".join(ปัญหา[:5]))
    return บรรทัด


def พ่นTCV(อ) -> int:
    ซอง = อ่านซองเต็ม()
    แผน = แผนTCV(ซอง)
    รายการ = เปิดรายการTCV()
    เสร็จ, ปัญหา = บทที่เสร็จ(รายการ, แผน)
    if ปัญหา:
        print("⛔ รายการ เสียง/ที่มา/TCV.puck.json ไม่ลงรอยกับตัวบท ⇒ ⛔ ไม่ยิง")
        for p in ปัญหา[:20]:
            print("   " + p)
        return รหัสออก["รายการพัง"]
    เหลือ = แผน[เสร็จ:]
    if not เหลือ:
        print("✅ TCV ครบทุกบทแล้ว ⇒ ไม่มีงาน")
        return รหัสออก["ไม่มีงาน"]

    รอ = รายการ.setdefault("redo", {})
    ติด = [e for e in รอ.values() if e["nights"] >= เพี้ยนได้กี่คืน]
    if ติด:
        print(f"⛔ ข้อเหล่านี้เสียงเพี้ยนครบ {เพี้ยนได้กี่คืน} คืนแล้ว ⇒ ⛔ ไม่ยิงอีก ⇒ ต้องมีคนฟังแล้วตัดสิน")
        for e in ติด:
            print(f"   {e['ref']} ⇒ {e['nights']} คืน ⇒ ล่าสุดยาว {e['ratio']} เท่าของที่ควรได้")
        return รหัสออก["รอคน"]

    ga = โหลดรุ่น2()
    # ⭐ กันซ้ำด้วยนโยบายตัวอักษรของรุ่น 2 ⇒ ตัวบทที่มีอักษรที่ไม่มีการตัดสินไว้ ⇒ หยุดก่อนยิง ⛔ ไม่ส่งเงียบ ๆ
    import audio_text  # noqa: E402  (มาจากที่เก็บรุ่น 2 ⇒ `โหลดรุ่น2()` ใส่ทางให้แล้ว)
    ที่พักเสียงดิบ.mkdir(parents=True, exist_ok=True)
    # ⭐ ลองเข้ารหัสเสียงเงียบ 0.1 วินาทีก่อน ⇒ เครื่องเข้ารหัสไม่ได้ = รู้ก่อนจ่ายค่ายิง
    ลองไฟล์ = ที่พักเสียงดิบ / "ลองเข้ารหัส.mp3"
    try:
        เข้ารหัสmp3(ga, [b"\x00\x00" * (ga.SAMPLE_RATE // 10)], b"", ลองไฟล์)
    except Exception as e:  # noqa: BLE001
        print(f"⛔ เครื่องนี้เข้ารหัส mp3 ไม่ได้ ⇒ {e} ⇒ ยังไม่ได้ยิงอะไร")
        return รหัสออก["เครื่องไม่พร้อม"]
    ลองไฟล์.unlink(missing_ok=True)

    def ดิบของ(ก้อน):
        return ที่เก็บดิบของ(เสียงTCV, "th-TH", ก้อน)

    # ⭐ ข้อที่เพี้ยนคืนก่อน ⇒ ทิ้งเสียงดิบก่อนวางแผน ⇒ คืนนี้ยิงใหม่เฉพาะข้อนั้น
    if อ.ยิง:
        ทุกข้อ = {x["id"]: x for บ in เหลือ for x in บ["ข้อ"]}
        for รหัส in รอ:
            for ก้อน in ทุกข้อ.get(รหัส, {}).get("ก้อน", []):
                ดิบของ(ก้อน).unlink(missing_ok=True)

    สมุด = ga.QuotaLedger()
    งบเดือน = สมุด.ceiling - กันให้เรื่องเล่า - สมุด.spent
    งบ = min(อ.งบ if อ.งบ is not None else คืนละ, งบเดือน)
    เลือก, จะใช้ = [], 0
    for บ in เหลือ:
        ค่า = sum(len(ก้อน) for x in บ["ข้อ"] for ก้อน in x["ก้อน"] if not ดิบของ(ก้อน).exists())
        if จะใช้ + ค่า > งบ or (อ.บทมากสุด is not None and len(เลือก) >= อ.บทมากสุด):
            break
        เลือก.append(บ)
        จะใช้ += ค่า
    print(f"TCV ⇒ เสร็จแล้ว {เสร็จ:,}/{len(แผน):,} บท ⇒ บทถัดไป {เหลือ[0]['ชื่อ']} {เหลือ[0]['c']}"
          f" ⇒ งบคืนนี้ {max(งบ, 0):,} ตัว (คืนละ {คืนละ:,} · ที่เหลือของเดือนหลังกันให้เรื่องเล่า {max(งบเดือน, 0):,})")
    if not เลือก:
        print("⏸ งบคืนนี้ไม่พอแม้แต่บทเดียว ⇒ ไม่มีงาน ⇒ คืนต่อไปหรือเดือนหน้าทำต่อ")
        return รหัสออก["ไม่มีงาน"]
    for บ in เลือก:
        for x in บ["ข้อ"]:
            พูด, _ = audio_text.apply_script_policy(x["text"])
            if พูด != x["text"]:
                print(f"⛔ {x['ref']} มีอักษรที่นโยบายของรุ่น 2 ตัดทิ้ง ⇒ ต้องตัดสินก่อน ⇒ ⛔ ยังไม่ได้ยิงอะไร")
                return รหัสออก["รายการพัง"]
    ต้องยิง = [ก้อน for บ in เลือก for x in บ["ข้อ"] for ก้อน in x["ก้อน"] if not ดิบของ(ก้อน).exists()]
    ต้องยิง = list(dict.fromkeys(ต้องยิง))
    print(f"คืนนี้ ⇒ {len(เลือก)} บท ({เลือก[0]['รหัสบท']} ถึง {เลือก[-1]['รหัสบท']})"
          f" · {sum(len(บ['ข้อ']) for บ in เลือก)} ข้อ · ต้องยิง {len(ต้องยิง)} ก้อน {จะใช้:,} ตัวอักษร ⇒ {สมุด.summary(จะใช้)}")
    if not อ.ยิง:
        print("⛔ ยังไม่ได้ยิง ⇒ ใส่ --ยิง เมื่อพร้อม")
        return รหัสออก["ไม่มีงาน"]
    try:
        สมุด.check(จะใช้)
    except ga.QuotaExceeded as e:
        print(f"⛔ เกินเพดานรายเดือน ⇒ {e} ⇒ ยังไม่ได้ยิงอะไร")
        return รหัสออก["ไม่มีงาน"]

    if ต้องยิง:
        กุญแจ = ga._read_key()
        คุมจังหวะ = ga._RateLimiter(ga.REQ_PER_MIN)

        def หนึ่งก้อน(ก้อน):
            คุมจังหวะ.wait()
            ดิบของ(ก้อน).write_bytes(ยิง(ga, ก้อน, กุญแจ, เสียงTCV, "th-TH", สมุด))

        with ThreadPoolExecutor(max_workers=คนยิงพร้อมกัน) as กอง:
            งาน = [กอง.submit(หนึ่งก้อน, ก) for ก in ต้องยิง]
            try:
                for f in as_completed(งาน):
                    f.result()
            except BaseException as e:
                for f in งาน:
                    f.cancel()
                print(f"⛔ หยุดทั้งคืน ⛔ ไม่ยิงซ้ำ ⇒ {ga._scrub(str(e), กุญแจ)}")
                print(f"⇒ {สมุด.summary()}")
                return รหัสออก["ล้ม"]
        print(f"ยิงแล้ว {len(ต้องยิง)} ก้อน")

    # ⭐ วัดทุกข้อ ⇒ บทที่มีข้อเพี้ยน ⛔ ไม่เข้าเว็บ ⇒ หยุดคืนตรงนั้น ⇒ บทหลังจากนั้นเก็บเสียงดิบไว้ ⇒ คืนต่อไปไม่ต้องจ่ายซ้ำ
    อัตรา = อัตราอ่านของภาษา["th-TH"]
    ต่ำสุด, สูงสุด = ช่วงสัดส่วนที่ยอมรับ
    เงียบ = b"\x00\x00" * int(ga.SAMPLE_RATE * เงียบระหว่างก้อน_มิลลิ / 1000)
    วันนี้ = date.today().isoformat()
    ได้บท, เพี้ยนบท = [], None
    for บ in เลือก:
        วัด, เพี้ยน = {}, []
        for x in บ["ข้อ"]:
            pcms = [ดิบของ(ก).read_bytes() for ก in x["ก้อน"]]
            วินาที = (sum(len(p) for p in pcms) + len(เงียบ) * (len(pcms) - 1)) / (2.0 * ga.SAMPLE_RATE)
            สัดส่วน = วินาที / (len(x["text"]) / อัตรา)
            วัด[x["id"]] = (pcms, วินาที)
            if not (ต่ำสุด <= สัดส่วน <= สูงสุด):
                เพี้ยน.append((x, วินาที, สัดส่วน))
        if เพี้ยน:
            เพี้ยนบท = บ
            print(f"⛔ {บ['ชื่อ']} {บ['c']} มี {len(เพี้ยน)} ข้อเสียงยาวนอกช่วง {ต่ำสุด}–{สูงสุด} ⇒ บทนี้ ⛔ ไม่เข้าเว็บ ⇒ จดไว้ทำใหม่คืนต่อไป")
            for x, วินาที, สัดส่วน in เพี้ยน:
                print(f"   {x['ref']} ⇒ {len(x['text'])} ตัว ⇒ {วินาที:.2f} วินาที ⇒ {สัดส่วน:.2f} เท่า")
                เดิม = รอ.get(x["id"], {})
                รอ[x["id"]] = {"ref": x["ref"], "chars": len(x["text"]), "d": round(วินาที, 3),
                               "ratio": round(สัดส่วน, 2), "nights": เดิม.get("nights", 0) + 1, "last": วันนี้}
                for ก in x["ก้อน"]:
                    ดิบของ(ก).unlink(missing_ok=True)
            break

        def เข้ารหัส(x):
            ไฟล์ = กองเสียง / f"{x['id']}.puck.mp3"
            เข้ารหัสmp3(ga, วัด[x["id"]][0], เงียบ, ไฟล์)
            ga.write_tags(ไฟล์, {
                "title": x["ref"], "album": f"{บ['ชื่อ']} {บ['c']} (TCV)",
                "artist": ga.ID3_ARTIST, "album_artist": ga.ID3_ARTIST, "genre": ga.ID3_GENRE,
                "track": str(x["v"]), "comment": รายการ["source"]["notice"],
            })
            return ไฟล์.name

        with ThreadPoolExecutor(max_workers=คนยิงพร้อมกัน) as กอง:
            ชื่อไฟล์ = dict(zip((x["id"] for x in บ["ข้อ"]), กอง.map(เข้ารหัส, บ["ข้อ"])))
        for x in บ["ข้อ"]:
            รายการ["verses"][x["id"]] = {
                "ref": x["ref"], "osis": บ["osis"], "c": บ["c"], "v": x["v"], "file": ชื่อไฟล์[x["id"]],
                "d": round(วัด[x["id"]][1], 3), "chars": len(x["text"]), "h": ลายนิ้วมือ(x["text"]),
                **({"parts": len(x["ก้อน"])} if len(x["ก้อน"]) > 1 else {}),
            }
            รอ.pop(x["id"], None)
        for v in บ["ขาด"]:
            รายการ["gaps"].append({"id": f"{บ['osis']}.{บ['c']}.{v}", "ref": f"{บ['ชื่อ']} {บ['c']}:{v}",
                                   "reason": "no TCV text in _data/เนื้อบท.json.gz"})
        ได้บท.append(บ["รหัสบท"])
        print(f"✅ {บ['ชื่อ']} {บ['c']} ⇒ {len(บ['ข้อ'])} ไฟล์")

    if not ได้บท and เพี้ยนบท is None:
        return รหัสออก["ไม่มีงาน"]
    ลำดับ = {x["id"]: i for i, บ in enumerate(แผน) for x in บ["ข้อ"]}
    รายการ["verses"] = dict(sorted(รายการ["verses"].items(), key=lambda kv: ลำดับ[kv[0]]))
    รายการ["rateHz"], รายการ["bitrate"] = ga.SAMPLE_RATE, ga.MP3_BITRATE
    รายการ["generated"] = วันนี้
    รายการ["nights"].append({"date": วันนี้, "chapters": ได้บท, "chars": จะใช้,
                             **({"redo": เพี้ยนบท["รหัสบท"]} if เพี้ยนบท else {})})
    ที่มา.mkdir(parents=True, exist_ok=True)
    รายการTCV.write_text(json.dumps(รายการ, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"✅ คืนนี้ได้ {len(ได้บท)} บท ⇒ เสียง/ที่มา/TCV.puck.json ⇒ {สมุด.summary()}")
    return รหัสออก["ได้ของใหม่"]


def main() -> int:
    ป = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ป.add_argument("ฉบับ", choices=sorted(เสียงของฉบับ) + ["TCV"])
    ป.add_argument("--ยิง", action="store_true", help="ยิงจริง ⇒ หักสมุดนับโควตาของรุ่น 2")
    ป.add_argument("--บท", type=int, help="ยิงแค่บทเดียว ⇒ ⛔ ไม่เขียนรายการ")
    ป.add_argument("--ทำใหม่", nargs="*", default=[], dest="ทิ้งดิบ", help="รหัสข้อที่ทิ้งเสียงดิบแล้วยิงใหม่ ⇒ dest ⛔ ใช้ชื่อมีสระอำไม่ได้ เพราะไพทอนแปลงสระอำในชื่อตัวแปร")
    ป.add_argument("--คืนนี้", action="store_true", help="TCV ⇒ ทำต่อจากบทสุดท้ายที่มีเสียง ภายในงบของคืน")
    ป.add_argument("--บทมากสุด", type=int, help="TCV ⇒ คืนนี้ทำไม่เกินกี่บท")
    ป.add_argument("--งบ", type=int, help=f"TCV ⇒ งบคืนนี้เป็นตัวอักษร ⇒ ไม่ใส่ = {คืนละ:,} ⇒ ⛔ เกินเพดานเดือนไม่ได้อยู่ดี")
    ป.add_argument("--สถานะ", action="store_true", help="TCV ⇒ ถึงเล่มไหนแล้ว ⇒ ⛔ ไม่ยิง")
    อ = ป.parse_args()

    if อ.ฉบับ == "TCV":
        if อ.สถานะ:
            print("\n".join(สรุปTCV()))
            return 0
        if not อ.คืนนี้:
            sys.exit("⛔ TCV ทำได้ทางเดียว ⇒ --คืนนี้ (หรือ --สถานะ)")
        return พ่นTCV(อ)
    ฉบับ = อ.ฉบับ
    เสียง, ภาษา = เสียงของฉบับ[ฉบับ]["เสียง"], เสียงของฉบับ[ฉบับ]["ภาษา"]
    อัตรา = อัตราอ่านของภาษา[ภาษา]
    ต่ำสุด, สูงสุด = ช่วงสัดส่วนที่ยอมรับ
    แผน = วางแผน(ฉบับ, อ.บท)
    ยาวสุด = max(len(e["text"]) for e in แผน)
    print(f"{ฉบับ} ⇒ {len(แผน)} ข้อ · {sum(len(e['text']) for e in แผน):,} ตัวอักษร · ข้อยาวสุด {ยาวสุด} ตัว · เสียง {เสียง}")
    if ยาวสุด > ก้อนยาวสุด:
        sys.exit(f"⛔ มีข้อยาวเกิน {ก้อนยาวสุด} ตัว ⇒ ต้องแบ่งก้อนก่อน ⇒ ยังไม่ได้ยิงอะไร")
    ไม่รู้จัก = set(อ.ทิ้งดิบ) - {e["id"] for e in แผน}
    if ไม่รู้จัก:
        sys.exit(f"⛔ ไม่รู้จักรหัสข้อ {sorted(ไม่รู้จัก)}")

    ga = โหลดรุ่น2()
    ที่พักเสียงดิบ.mkdir(parents=True, exist_ok=True)
    for รหัส in อ.ทิ้งดิบ:
        e = next(x for x in แผน if x["id"] == รหัส)
        ที่เก็บดิบของ(เสียง, ภาษา, e["text"]).unlink(missing_ok=True)
    ต้องยิง = [e for e in แผน if not ที่เก็บดิบของ(เสียง, ภาษา, e["text"]).exists()]
    จะใช้ = sum(len(e["text"]) for e in ต้องยิง)
    สมุด = ga.QuotaLedger()
    print(f"ต้องยิง {len(ต้องยิง)} ข้อ · {จะใช้:,} ตัวอักษร ⇒ {สมุด.summary(จะใช้)}")
    if not อ.ยิง:
        print("⛔ ยังไม่ได้ยิง ⇒ ใส่ --ยิง เมื่อพร้อม")
        return 0
    try:
        สมุด.check(จะใช้)
    except ga.QuotaExceeded as e:
        sys.exit(f"⛔ เกินเพดานรายเดือน ⇒ {e} ⇒ ยังไม่ได้ยิงอะไร")

    if ต้องยิง:
        กุญแจ = ga._read_key()
        คุมจังหวะ = ga._RateLimiter(ga.REQ_PER_MIN)
        ล็อก = threading.Lock()
        เสร็จ = [0]

        def หนึ่งข้อ(e):
            คุมจังหวะ.wait()
            pcm = ยิง(ga, e["text"], กุญแจ, เสียง, ภาษา, สมุด)
            ที่เก็บดิบของ(เสียง, ภาษา, e["text"]).write_bytes(pcm)
            with ล็อก:
                เสร็จ[0] += 1
                if เสร็จ[0] % 50 == 0 or เสร็จ[0] == len(ต้องยิง):
                    print(f"  ยิงแล้ว {เสร็จ[0]}/{len(ต้องยิง)}", flush=True)

        with ThreadPoolExecutor(max_workers=คนยิงพร้อมกัน) as กอง:
            งาน = [กอง.submit(หนึ่งข้อ, e) for e in ต้องยิง]
            try:
                for f in as_completed(งาน):
                    f.result()
            except BaseException as e:
                for f in งาน:
                    f.cancel()
                print(f"⛔ หยุดทั้งรอบ ⇒ {ga._scrub(str(e), กุญแจ)}")
                print(f"⇒ {สมุด.summary()}")
                return 3

    # ⭐ วัดความยาวเสียงทุกข้อ ⇒ นอกช่วง = ⛔ ไม่เขียนรายการ (ใบ #132 ข้อ 10)
    วัด = {}
    ผิดปกติ = []
    for e in แผน:
        pcm = ที่เก็บดิบของ(เสียง, ภาษา, e["text"]).read_bytes()
        วินาที = len(pcm) / (2.0 * ga.SAMPLE_RATE)
        สัดส่วน = วินาที / (len(e["text"]) / อัตรา)
        วัด[e["id"]] = (pcm, วินาที, สัดส่วน)
        if not (ต่ำสุด <= สัดส่วน <= สูงสุด):
            ผิดปกติ.append((e["id"], len(e["text"]), round(วินาที, 2), round(สัดส่วน, 2)))
    รวมตัว = sum(len(e["text"]) for e in แผน)
    รวมวินาที = sum(x[1] for x in วัด.values())
    print(f"วัดแล้ว ⇒ {รวมตัว / รวมวินาที:.3f} ตัวอักษรต่อวินาที (อัตราอ้างอิง {อัตรา})"
          f" · สัดส่วนต่ำสุด {min(x[2] for x in วัด.values()):.2f} · สูงสุด {max(x[2] for x in วัด.values()):.2f}")
    if ผิดปกติ:
        print(f"⛔ {len(ผิดปกติ)} ข้อเสียงยาวนอกช่วง {ต่ำสุด}–{สูงสุด} เท่าของที่ควรได้ ⇒ ⛔ ไม่เขียนรายการ")
        for x in ผิดปกติ:
            print(f"   {x[0]} ⇒ {x[1]} ตัว ⇒ {x[2]} วินาที ⇒ {x[3]} เท่า")
        print("⇒ สั่ง --ทำใหม่ " + " ".join(x[0] for x in ผิดปกติ))
        return 4
    if อ.บท is not None:
        print("⭐ ยิงบทเดียว ⇒ ⛔ ไม่เขียน mp3 ⛔ ไม่เขียนรายการ")
        return 0

    # ⭐ เข้ารหัส mp3 ทีละข้อ + ติดป้าย ID3 ⇒ เครดิตเดินทางไปกับไฟล์
    กองฉบับ = กองเสียง / ฉบับ
    กองฉบับ.mkdir(parents=True, exist_ok=True)
    แหล่ง = แหล่งของฉบับ[ฉบับ]

    def เข้ารหัส(e):
        ไฟล์ = กองฉบับ / f"{e['id']}.puck.mp3"
        ga._encode([วัด[e["id"]][0]], b"", ไฟล์)
        ga.write_tags(ไฟล์, {
            "title": e["ref"], "album": f"{e['ref'].rsplit(' ', 1)[0]} ({ฉบับ})",
            "artist": ga.ID3_ARTIST, "album_artist": ga.ID3_ARTIST, "genre": ga.ID3_GENRE,
            "track": str(e["v"]), "comment": แหล่ง["notice"],
        })
        return ไฟล์.name

    with ThreadPoolExecutor(max_workers=คนยิงพร้อมกัน) as กอง:
        ชื่อไฟล์ = dict(zip((e["id"] for e in แผน), กอง.map(เข้ารหัส, แผน)))
    ควรมี = set(ชื่อไฟล์.values())
    for ไฟล์ in กองฉบับ.glob("*.mp3"):
        if ไฟล์.name not in ควรมี:
            ไฟล์.unlink()  # ไฟล์ที่แผนนี้ ⛔ ไม่รู้จัก ⇒ ด่านนับเป็นไฟล์กำพร้า

    รายการ = {
        "v": 1,
        "version": ฉบับ,
        "voice": เสียง,
        "languageCode": ภาษา,
        "rateHz": ga.SAMPLE_RATE,
        "bitrate": ga.MP3_BITRATE,
        "engine": เครื่องพ่น_,
        "generated": date.today().isoformat(),
        "generator": "tools/พ่นเสียงพระคำ.py",
        "dir": f"{ฉบับ}/",
        "source": แหล่ง,
        "verses": {
            e["id"]: {
                "ref": e["ref"], "osis": e["osis"], "c": e["c"], "v": e["v"],
                "file": ชื่อไฟล์[e["id"]], "d": round(วัด[e["id"]][1], 3),
                "chars": len(e["text"]), "h": ลายนิ้วมือ(e["text"]),
            }
            for e in แผน
        },
        # ⭐ ข้อที่จงใจไม่มีเสียง ⇒ ฉบับนี้มีตัวบทครบทุกข้อของมาระโก ⇒ ว่าง ⇒ ด่านนับยืนยันจากตัวบทเอง
        "gaps": [],
    }
    ที่มา.mkdir(parents=True, exist_ok=True)
    (ที่มา / f"{ฉบับ}.puck.json").write_text(json.dumps(รายการ, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"✅ {ฉบับ} ⇒ {len(แผน)} ไฟล์ · {รวมวินาที / 3600:.2f} ชั่วโมง ⇒ เสียง/ที่มา/{ฉบับ}.puck.json")
    print(f"⇒ {สมุด.summary()}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
