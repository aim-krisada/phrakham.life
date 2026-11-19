#!/usr/bin/env python3
"""ทำเสียง TCV ต่อทุกคืน แล้วส่งเข้าคำขอรวมให้ตรวจ ⇒ ⛔ รันบนเครื่องของพี่เอมเท่านั้น ⛔ ไม่รันในท่อ

ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/171

## รันยังไง

งานตั้งเวลาของวินโดวส์เรียกไฟล์นี้ **จากโต๊ะของมันเอง** ทุกคืน ⇒ โต๊ะคือ git worktree ที่แยกไว้ให้งานนี้อย่างเดียว
  py -3.14 <โต๊ะ>\\tools\\ทำเสียงTCVรายคืน.py             ⇒ ของจริง ⇒ ยิง คอมมิต ส่ง เปิดหรือต่อคำขอรวม
  py -3.14 <โต๊ะ>\\tools\\ทำเสียงTCVรายคืน.py --ไม่ส่ง     ⇒ ลองทั้งเส้นทาง แต่ ⛔ ไม่ยิง ⛔ ไม่คอมมิต ⛔ ไม่ส่ง
⇒ คำสั่งตั้งโต๊ะกับตั้งงานตั้งเวลาอยู่ในคำขอรวมของใบ #171 ⛔ ไม่จดซ้ำที่นี่

## ทำอะไรบ้าง ⇒ ทีละขั้น ⇒ **ขั้นไหนล้ม หยุดทั้งคืน ⛔ ไม่วนทำซ้ำ ⇒ เขียนแจ้งในใบ #171**

1. **ขั้นเตรียมโต๊ะ** ⇒ ดึงของใหม่ ⇒ ล้างของที่ค้างจากคืนก่อน ⇒ ยืนบน origin/main ⇒ แล้วเรียกตัวเองซ้ำจากโค้ดที่เพิ่งดึงมา
   ⇒ คืนไหน main แก้สคริปต์นี้ ⇒ คืนนั้นได้สคริปต์ใหม่ทันที ⛔ ไม่ต้องตั้งงานใหม่
2. **หากิ่ง** ⇒ มีคำขอรวมรายคืนที่ยังเปิดอยู่ ⇒ ต่อกิ่งนั้น (รวม main เข้ามาก่อน) ⇒ ไม่มี ⇒ แตกกิ่งใหม่จาก main
   ⇒ ⭐ จุดที่ทำต่อคิดจากรายการในกิ่งนั้น ⇒ คืนที่ยังไม่ได้รวมก็นับ ⇒ ⛔ ไม่ทำซ้ำ
3. **ทำเสียง** ⇒ `tools/พ่นเสียงพระคำ.py TCV --คืนนี้ --ยิง` ⇒ งบ สมุดนับโควตา ข้อเพี้ยน อยู่ที่ตัวนั้นทั้งหมด
4. **รันด่านในเครื่อง** ⇒ ด่านเสียงเล่มใหม่ · ด่านเสียงชุดเดิม · พ่นรายการเสียง ⇒ ไม่ผ่าน = ⛔ ไม่ส่ง
5. **คอมมิตในชื่อ Aim Agent** ⇒ เช็กว่าไฟล์เสียงเข้า Git LFS ทุกไฟล์ก่อนส่ง ⇒ ⛔ ไบต์จริงหลุดเข้าประวัติแล้วล้างไม่ได้
6. **ส่งเสียงคืนนี้ขึ้น GitHub Pages** ⇒ ⭐ เฉพาะเมื่อเว็บย้ายเสียงไปแล้ว (ช่อง `ที่อยู่` ใน `เสียง/ที่เก็บบนGitHub.tsv` ครบ)
   ⇒ ทำ **ก่อน** ส่งขึ้นอัมกิต ⇒ คำขอรวมที่เปิดได้ = ไฟล์อยู่บน GitHub แล้ว ⇒ รวมแล้วผู้อ่านกดฟังได้ทันที
   ⇒ ส่งไม่ได้ ⇒ หยุดทั้งคืน ⇒ ⛔ ไม่เปิดคำขอรวม ⇒ ตัวส่งคือ `tools/ที่เก็บเสียงบนGitHub.py` ⛔ ไม่เขียนซ้ำที่นี่
   ⇒ ⭐ ที่เก็บแยกตามฉบับ ⇒ ตัวส่งเลือกที่เก็บจากฉบับกับเล่มของไฟล์ ⇒ คืนนี้เป็น TCV ⇒ ไปที่ `phrakham-audio-tcv-<กลุ่ม>`
   ⇒ ⛔ ที่เก็บยังไม่มี หรือผังไม่มีแถว ⇒ ตัวส่งหยุดพร้อมชื่อที่เก็บที่ต้องสร้าง ⇒ ข้อความนั้นถูกแจ้งในใบ #171 ทั้งประโยค
7. **ส่งด้วยกุญแจของ aim-agent** ⇒ เปิดคำขอรวมใหม่ หรือเขียนคำอธิบายของคำขอรวมเดิมใหม่จากรายการในที่เก็บ

## ⛔⛔ กุญแจ

`GITLAB_TOKEN_AI` อ่านจาก `.env` บน OneDrive ⇒ ใช้ยิง API และส่งผ่าน `tools/กุญแจgitรายคืน.sh` ทางตัวแปรแวดล้อม
⇒ ⛔ ไม่พิมพ์ ⛔ ไม่เขียนลงไฟล์ ⛔ ไม่อยู่ในบรรทัดคำสั่ง ⇒ ข้อความที่ส่งเข้าใบถูกล้างกุญแจออกก่อน
⇒ `GOOGLE_TTS_API_KEY` ⇒ ตัวพ่นอ่านเอง ⇒ สคริปต์นี้ ⛔ ไม่แตะ
⇒ `GITHUB_TOKEN_PHRAKHAM` ⇒ `tools/ที่เก็บเสียงบนGitHub.py` อ่านเองตอนส่งเสียงขึ้น GitHub ⇒ สคริปต์นี้ล้างออกจากบันทึกด้วย

## บันทึก

`%LOCALAPPDATA%\\phrakham-tts-nightly\\บันทึก-YYYY-MM.log` ⇒ ทุกบรรทัดที่สคริปต์นี้กับตัวพ่นพิมพ์
"""
import argparse
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
from datetime import date, datetime
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

โต๊ะ = Path(__file__).resolve().parent.parent
ที่บันทึก = Path(os.environ.get("LOCALAPPDATA") or Path.home()) / "phrakham-tts-nightly"
ไฟล์ล็อก = ที่บันทึก / "กำลังรัน.lock"
ไฟล์แจ้งล่าสุด = ที่บันทึก / "แจ้งล่าสุด.txt"

ฐานAPI = "https://aimgit.aimagin.com/api/v4"
โปรเจกต์ = 58
ใบงาน = 171
ที่อยู่ใบ = f"https://aimgit.aimagin.com/v3/phrakham/-/issues/{ใบงาน}"
คำนำกิ่ง = "เสียงtcv-รายคืน-"
ชื่อคนคอมมิต = ["-c", "user.name=Aim Agent", "-c", "user.email=aim-agent@aimagin.com"]
ที่กุญแจ = [Path(r"D:\OneDrive\4 Personal\claude\.env")] + (
    [Path(os.environ["OneDrive"]) / "4 Personal" / "claude" / ".env"] if os.environ.get("OneDrive") else [])

กุญแจ: str | None = None


class หยุดคืน(Exception):
    """ขั้นไหนล้ม ⇒ โยนตัวนี้ ⇒ แจ้งในใบครั้งเดียวแล้วจบคืน ⛔ ไม่วนทำซ้ำ"""

    def __init__(self, ขั้น: str, รายละเอียด: str, รหัส: int = 1):
        super().__init__(ขั้น)
        self.ขั้น, self.รายละเอียด, self.รหัส = ขั้น, รายละเอียด, รหัส


กุญแจGitHub: str | None = None


def ล้าง(ข้อความ: str) -> str:
    for k in (กุญแจ, กุญแจGitHub):
        if k:
            ข้อความ = ข้อความ.replace(k, "***")
    return ข้อความ


def บันทึก(ข้อความ: str) -> None:
    ข้อความ = ล้าง(ข้อความ)
    print(ข้อความ, flush=True)
    ที่บันทึก.mkdir(parents=True, exist_ok=True)
    with (ที่บันทึก / f"บันทึก-{date.today():%Y-%m}.log").open("a", encoding="utf-8") as f:
        f.write(f"[{datetime.now():%Y-%m-%d %H:%M:%S}] {ข้อความ}\n")


def git(*args: str, env: dict | None = None, ขั้น: str = "git") -> str:
    ผล = subprocess.run(["git", "-C", str(โต๊ะ), *args], capture_output=True, text=True, encoding="utf-8",
                        errors="replace", env={**os.environ, "GIT_TERMINAL_PROMPT": "0", **(env or {})})
    if ผล.returncode != 0:
        raise หยุดคืน(ขั้น, f"git {' '.join(args)}\n{ผล.stdout[-1500:]}\n{ผล.stderr[-1500:]}")
    return ผล.stdout.strip()


def git_ผ่านเน็ต(*args: str, ขั้น: str) -> str:
    """git ที่ต้องคุยกับอัมกิต ⇒ ใช้กุญแจของ aim-agent ผ่าน `tools/กุญแจgitรายคืน.sh` เสมอ
    ⇒ `-c credential.helper=` ปิดตัวเก็บกุญแจของเครื่อง ⇒ ⛔ ไม่หลุดไปใช้กุญแจของพี่เอม"""
    return git("-c", "credential.helper=", *args, ขั้น=ขั้น,
               env={"GIT_ASKPASS": str(โต๊ะ / "tools" / "กุญแจgitรายคืน.sh"), "PHRAKHAM_NIGHTLY_TOKEN": กุญแจ or ""})


def อ่านกุญแจ() -> str:
    for ทาง in ที่กุญแจ:
        if ทาง.exists():
            for บรรทัด in ทาง.read_text(encoding="utf-8", errors="ignore").splitlines():
                if บรรทัด.startswith("GITLAB_TOKEN_AI="):
                    return บรรทัด.split("=", 1)[1].strip().strip('"').strip("'")
    raise หยุดคืน("อ่านกุญแจ", f"หา GITLAB_TOKEN_AI ไม่เจอใน {[str(p) for p in ที่กุญแจ]}")


def api(วิธี: str, ทาง: str, ข้อมูล: dict | None = None):
    หัว = {"PRIVATE-TOKEN": กุญแจ or ""}
    ตัว = None
    if ข้อมูล is not None:
        ตัว = json.dumps(ข้อมูล).encode("utf-8")
        หัว["Content-Type"] = "application/json"
    try:
        with urllib.request.urlopen(urllib.request.Request(ฐานAPI + ทาง, data=ตัว, method=วิธี, headers=หัว),
                                    timeout=60) as ตอบ:
            return json.loads(ตอบ.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise หยุดคืน("ยิง API อัมกิต", f"{วิธี} {ทาง} ⇒ HTTP {e.code} {e.read().decode('utf-8', 'replace')[:400]}")
    except (urllib.error.URLError, TimeoutError) as e:
        raise หยุดคืน("ยิง API อัมกิต", f"{วิธี} {ทาง} ⇒ {e}")


def แจ้งในใบ(ขั้น: str, รายละเอียด: str) -> None:
    """เขียนแจ้งในใบ #171 ⇒ เรื่องเดิมซ้ำคืนต่อคืน ⇒ แจ้งครั้งเดียว ⛔ ไม่ท่วมใบ"""
    ลายเซ็น = f"{ขั้น}\n{รายละเอียด.strip()[-300:]}"
    if ไฟล์แจ้งล่าสุด.exists() and ไฟล์แจ้งล่าสุด.read_text(encoding="utf-8") == ลายเซ็น:
        บันทึก("เรื่องเดียวกับที่แจ้งไว้แล้ว ⇒ ไม่แจ้งซ้ำ")
        return
    ข้อความ = (
        f"1. งานทำเสียง TCV รายคืนหยุด เมื่อ {datetime.now():%Y-%m-%d %H:%M} ⇒ ขั้น {ขั้น}\n"
        "2. ไม่ได้ทำซ้ำในคืนนี้ ⇒ คืนต่อไปงานตั้งเวลาจะเริ่มใหม่เอง ⇒ เสียงดิบที่จ่ายไปแล้วไม่ต้องจ่ายซ้ำ\n"
        f"3. บันทึกเต็มอยู่บนเครื่องพี่เอม ที่ %LOCALAPPDATA%\\phrakham-tts-nightly\n"
        "4. ข้อความท้ายของขั้นนั้น\n\n```text\n" + ล้าง(รายละเอียด.strip()[-2500:]).replace("```", "'''") + "\n```\n"
    )
    try:
        if กุญแจ:
            api("POST", f"/projects/{โปรเจกต์}/issues/{ใบงาน}/notes", {"body": ข้อความ})
            ไฟล์แจ้งล่าสุด.write_text(ลายเซ็น, encoding="utf-8")
            บันทึก(f"แจ้งในใบแล้ว ⇒ {ที่อยู่ใบ}")
    except หยุดคืน as e:
        บันทึก(f"⛔ แจ้งในใบไม่ได้ ⇒ {e.รายละเอียด}")


def รันเครื่องมือ(ขั้น: str, *args: str) -> tuple[int, str]:
    ผล = subprocess.run([sys.executable, *args], cwd=โต๊ะ, capture_output=True, text=True, encoding="utf-8",
                        errors="replace", env={**os.environ, "PYTHONIOENCODING": "utf-8"})
    ออก = (ผล.stdout or "") + (ผล.stderr or "")
    for บรรทัด in ออก.rstrip().splitlines():
        บันทึก(f"  [{ขั้น}] {บรรทัด}")
    return ผล.returncode, ออก


# ---------------------------------------------------------------------------
# ขั้นที่ 1 ⇒ เตรียมโต๊ะ แล้วเรียกตัวเองซ้ำจากโค้ดของ origin/main
# ---------------------------------------------------------------------------
def เตรียมโต๊ะ(อ) -> int:
    global กุญแจ
    ที่บันทึก.mkdir(parents=True, exist_ok=True)
    if ไฟล์ล็อก.exists() and time.time() - ไฟล์ล็อก.stat().st_mtime < 6 * 3600:
        บันทึก(f"⏸ มีอีกรอบกำลังรันอยู่ ({ไฟล์ล็อก}) ⇒ คืนนี้ไม่ทำซ้อน")
        return 0
    ไฟล์ล็อก.write_text(str(os.getpid()), encoding="utf-8")
    try:
        บันทึก(f"===== เริ่มคืน {date.today()} ⇒ โต๊ะ {โต๊ะ}")
        # ⛔ **ห้ามรันบนที่เก็บหลัก** ⇒ ขั้นนี้สั่ง checkout -f กับ clean ⇒ งานที่คนแก้ค้างไว้จะหาย
        if Path(git("rev-parse", "--absolute-git-dir")) == Path(git("rev-parse", "--path-format=absolute", "--git-common-dir")):
            raise หยุดคืน("เตรียมโต๊ะ", f"{โต๊ะ} คือที่เก็บหลัก ⛔ ไม่ใช่โต๊ะแยกของงานนี้ ⇒ ตั้งโต๊ะด้วย git worktree add ก่อน")
        กุญแจ = อ่านกุญแจ()
        git_ผ่านเน็ต("fetch", "--prune", "origin", ขั้น="เตรียมโต๊ะ")
        git("checkout", "-f", "--detach", อ.ฐาน, ขั้น="เตรียมโต๊ะ")
        git("clean", "-fdq", "--", "เสียง/", ขั้น="เตรียมโต๊ะ")
        ผล = subprocess.run([sys.executable, str(โต๊ะ / "tools" / "ทำเสียงTCVรายคืน.py"), "--ในโต๊ะ",
                             "--ฐาน", อ.ฐาน, *(["--ไม่ส่ง"] if อ.ไม่ส่ง else [])], cwd=โต๊ะ)
        return ผล.returncode
    except หยุดคืน as e:
        บันทึก(f"⛔ หยุดคืน ⇒ {e.ขั้น} ⇒ {e.รายละเอียด}")
        if not อ.ไม่ส่ง:
            try:
                กุญแจ = อ่านกุญแจ()
            except หยุดคืน:
                pass
            แจ้งในใบ(e.ขั้น, e.รายละเอียด)
        return e.รหัส
    finally:
        ไฟล์ล็อก.unlink(missing_ok=True)


# ---------------------------------------------------------------------------
# ขั้นที่ 2 ถึง 6 ⇒ รันจากโค้ดที่เพิ่งดึงมา
# ---------------------------------------------------------------------------
def หาคำขอรวม() -> dict | None:
    เปิดอยู่ = [m for m in api("GET", f"/projects/{โปรเจกต์}/merge_requests?state=opened&per_page=100")
               if m["source_branch"].startswith(คำนำกิ่ง)]
    if len(เปิดอยู่) > 1:
        raise หยุดคืน("หาคำขอรวม", "มีคำขอรวมรายคืนเปิดอยู่มากกว่า 1 อัน ⇒ "
                      + " · ".join(m["web_url"] for m in เปิดอยู่) + " ⇒ ต้องเหลืออันเดียว")
    return เปิดอยู่[0] if เปิดอยู่ else None


def รายการบนmain(ฐาน: str) -> dict:
    try:
        return json.loads(git("show", f"{ฐาน}:เสียง/ที่มา/TCV.puck.json"))
    except หยุดคืน:
        return {}


def โมดูลตัวพ่น():
    """⛔ **ห้ามเขียน `from พ่นเสียงพระคำ import ...`** ⇒ ไพทอนแปลงสระอำในชื่อที่พิมพ์ในโค้ด (NFKC)
    ⇒ ชื่อโมดูลกลายเป็นคนละตัวกับชื่อไฟล์ ⇒ หาไฟล์ไม่เจอ ⇒ ต้องเรียกด้วยชื่อที่เป็นสตริงแบบนี้ (ลองจริง 15 พ.ย. 2569)"""
    import importlib
    sys.path.insert(0, str(โต๊ะ / "tools"))
    return importlib.import_module("พ่นเสียงพระคำ")


def โมดูลที่เก็บGitHub():
    """ตัวส่งเสียงขึ้น GitHub Pages ⇒ เรียกด้วยชื่อที่เป็นสตริง ⇒ เหตุผลเดียวกับ `โมดูลตัวพ่น` ข้างบน"""
    import importlib
    sys.path.insert(0, str(โต๊ะ / "tools"))
    return importlib.import_module("ที่เก็บเสียงบนGitHub")


def ส่งขึ้นGitHub(ทางย่อย: list[str], ข้อความ: str) -> str | None:
    """⑥ ส่งเสียงคืนนี้ขึ้นที่เก็บบน GitHub ⇒ คืนประโยคสำหรับคำอธิบายคำขอรวม ⇒ ยังไม่ย้าย = `None` ⇒ ⛔ ไม่ทำอะไร"""
    global กุญแจGitHub
    try:
        ม = โมดูลที่เก็บGitHub()
        กลุ่ม = ม.อ่านกลุ่ม()
        if not ม.ย้ายแล้วไหม(กลุ่ม):
            บันทึก("เสียงยังไม่ย้ายไป GitHub Pages ⇒ ข้ามขั้นส่งขึ้น GitHub")
            return None
        กุญแจGitHub = ม.อ่านกุญแจ()
        ม.เผยแพร่(กลุ่ม, ทางย่อย, ม.ที่ตั้งต้น, True, ข้อความ, พิมพ์=lambda x: บันทึก(f"  [GitHub] {x}"))
    except (RuntimeError, ValueError, OSError) as e:
        raise หยุดคืน("ส่งเสียงขึ้น GitHub", str(e), 2)
    return f"ส่งเสียงใหม่ {len(ทางย่อย)} ไฟล์ขึ้นที่เก็บบน GitHub Pages แล้ว ⇒ ก่อนเปิดคำขอรวมนี้"


def คำอธิบายคำขอรวม(ด่าน: list[str], ฐาน: str) -> str:
    ตัวพ่น = โมดูลตัวพ่น()
    สรุปTCV, รายการTCV = ตัวพ่น.สรุปTCV, ตัวพ่น.รายการTCV
    รายการ = json.loads(รายการTCV.read_text(encoding="utf-8"))
    บนmain = len(รายการบนmain(ฐาน).get("nights") or [])
    คืน = (รายการ.get("nights") or [])[บนmain:]
    บรรทัดคืน = [f"{i}. {n['date']} ⇒ " + (", ".join(n["chapters"]) or "ไม่ได้บทใหม่")
                 + f" ⇒ ส่งไปพ่น {n['chars']:,} ตัวอักษร" + (f" ⇒ {n['redo']} มีข้อเพี้ยน รอทำใหม่" if n.get("redo") else "")
                 for i, n in enumerate(คืน, 1)]
    return "\n".join([
        "ของในคำขอรวมนี้ ทำโดยงานตั้งเวลาบนเครื่องพี่เอมทุกคืน ⇒ tools/ทำเสียงTCVรายคืน.py",
        "",
        f"ใบงาน {ที่อยู่ใบ}",
        "",
        "## ถึงไหนแล้ว",
        "",
        "อ่านจาก เสียง/ที่มา/TCV.puck.json ในกิ่งนี้ ⇒ สคริปต์เขียนส่วนนี้ใหม่ทุกคืน",
        "",
        *สรุปTCV(),
        "",
        "## คืนที่อยู่ในคำขอรวมนี้",
        "",
        *(บรรทัดคืน or ["1. ยังไม่มี"]),
        "",
        "## ตรวจในเครื่องก่อนส่ง",
        "",
        *[f"{i}. {x}" for i, x in enumerate(ด่าน, 1)],
        "",
        "## คนจ่ายงานรวมเองได้เมื่อ",
        "",
        "1. ท่อของคำขอรวมนี้เขียวทั้งหมด ⇒ ด่านเสียงTCVเล่มใหม่ ตรวจตัวบท ความยาวเสียง และบทที่เรียงต่อกัน",
        "2. คืนต่อไปจะเปิดคำขอรวมใหม่เอง ถ้าอันนี้รวมไปแล้ว",
    ]) + "\n"


def ในโต๊ะ(อ) -> int:
    global กุญแจ
    try:
        กุญแจ = อ่านกุญแจ()
        if api("GET", "/user").get("username") != "aim-agent":
            raise หยุดคืน("อ่านกุญแจ", "กุญแจ GITLAB_TOKEN_AI ไม่ใช่ของ aim-agent")

        # ② หากิ่ง
        คำขอ = หาคำขอรวม()
        if คำขอ:
            กิ่ง = คำขอ["source_branch"]
            git_ผ่านเน็ต("fetch", "origin", f"refs/heads/{กิ่ง}:refs/remotes/origin/{กิ่ง}", ขั้น="หากิ่ง")
            git("checkout", "-f", "-B", กิ่ง, f"origin/{กิ่ง}", ขั้น="หากิ่ง")
            try:
                git(*ชื่อคนคอมมิต, "merge", "--no-edit", อ.ฐาน, ขั้น="รวม main เข้ากิ่งรายคืน")
            except หยุดคืน:
                subprocess.run(["git", "-C", str(โต๊ะ), "merge", "--abort"], capture_output=True)
                raise
            บันทึก(f"ต่อคำขอรวมเดิม {คำขอ['web_url']} ⇒ กิ่ง {กิ่ง}")
        else:
            กิ่ง = f"{คำนำกิ่ง}{date.today():%Y%m%d}"
            git("checkout", "-f", "-B", กิ่ง, อ.ฐาน, ขั้น="หากิ่ง")
            บันทึก(f"ไม่มีคำขอรวมรายคืนเปิดอยู่ ⇒ แตกกิ่งใหม่ {กิ่ง}")

        # ③ ทำเสียง
        คำสั่ง = ["tools/พ่นเสียงพระคำ.py", "TCV", "--คืนนี้"] + ([] if อ.ไม่ส่ง else ["--ยิง"])
        รหัส, ออก = รันเครื่องมือ("ทำเสียง", *คำสั่ง)
        if อ.ไม่ส่ง:
            บันทึก(f"--ไม่ส่ง ⇒ ตัวพ่นวางแผนแล้ว (รหัส {รหัส}) ⇒ ⛔ ไม่ยิง ⛔ ไม่คอมมิต ⛔ ไม่ส่ง ⇒ จะใช้กิ่ง {กิ่ง}")
            try:
                ม = โมดูลที่เก็บGitHub()
                if ม.ย้ายแล้วไหม(ม.อ่านกลุ่ม()):
                    บันทึก("ส่งเสียงขึ้น GitHub ⇒ คืนจริงจะส่ง ⇒ กุญแจ "
                           + ("มีแล้ว" if ม.อ่านกุญแจ() else "⛔ ไม่มี ⇒ คืนจริงจะหยุดที่ขั้นนี้"))
                else:
                    บันทึก("ส่งเสียงขึ้น GitHub ⇒ เสียงยังไม่ย้าย ⇒ คืนจริงจะข้ามขั้นนี้")
            except (RuntimeError, ValueError, OSError) as e:
                บันทึก(f"⛔ อ่านผังที่เก็บเสียงบน GitHub ไม่ได้ ⇒ {e}")
            return 0
        if รหัส == 10:
            บันทึก("⏸ คืนนี้ไม่มีงาน ⇒ ครบแล้ว หรืองบของคืนหรือของเดือนไม่พอ ⇒ ไม่แจ้งในใบ")
            return 0
        if รหัส != 0:
            raise หยุดคืน("ทำเสียง", ออก, รหัส)

        # ④ ด่านในเครื่อง
        ผ่าน = []
        for ชื่อ, คำ in [("ด่านเสียง TCV เล่มใหม่", ["tools/ด่านเสียงTCVเล่มใหม่.py"]),
                         ("ด่านเสียง TCV ชุดเดิม", ["tools/ด่านเสียงตรงตัวบท.py"]),
                         ("พ่นรายการเสียงให้หน้าเว็บ", ["tools/สร้างรายการเสียง.py"])]:
            รหัส, ออก = รันเครื่องมือ(ชื่อ, *คำ)
            if รหัส != 0:
                raise หยุดคืน(ชื่อ, ออก, 2)
            ผ่าน.append(f"{ชื่อ} ⇒ ผ่าน ⇒ {ออก.strip().splitlines()[-1] if ออก.strip() else ''}")

        # ⑤ คอมมิต ⇒ ไฟล์เสียงต้องเข้า LFS ทุกไฟล์
        git("add", "-A", "--", "เสียง/", ขั้น="คอมมิต")
        ใหม่ = [p for p in git("diff", "--cached", "--name-only", "--diff-filter=A", "-z", "--", "เสียง/ข้อ/",
                               ขั้น="คอมมิต").split("\0") if p.endswith(".mp3")]
        # ⭐ ไฟล์เดิมที่ถูกพ่นทับ ⇒ ต้องส่งขึ้น GitHub ด้วย ⇒ ⛔ ไม่งั้นบน Pages ยังเป็นเสียงเก่า
        แก้ = [p for p in git("diff", "--cached", "--name-only", "--diff-filter=M", "-z", "--", "เสียง/ข้อ/",
                              ขั้น="คอมมิต").split("\0") if p.endswith(".mp3")]
        for p in ใหม่:
            if not git("show", f":{p}", ขั้น="คอมมิต").startswith("version https://git-lfs"):
                raise หยุดคืน("คอมมิต", f"{p} ⛔ ไม่ได้เข้า Git LFS ⇒ ไม่คอมมิต ⇒ ดู .gitattributes", 2)
        รายการTCV = โมดูลตัวพ่น().รายการTCV
        ท้าย = (json.loads(รายการTCV.read_text(encoding="utf-8")).get("nights") or [{}])[-1]
        บท = ", ".join(ท้าย.get("chapters") or []) or "ไม่ได้บทใหม่"
        git(*ชื่อคนคอมมิต, "commit", "-q", "-m",
            f"เสียง TCV คืน {ท้าย.get('date')} ⇒ {บท} (ใบ #{ใบงาน})\n\n"
            f"ไฟล์เสียงใหม่ {len(ใหม่)} ไฟล์ ⇒ ส่งไปพ่น {ท้าย.get('chars', 0):,} ตัวอักษร\n"
            + (f"{ท้าย['redo']} มีข้อเสียงเพี้ยน ⇒ ยังไม่เข้าเว็บ ⇒ จดไว้ทำใหม่คืนต่อไป\n" if ท้าย.get("redo") else "")
            + f"\nทำโดย tools/ทำเสียงTCVรายคืน.py ⇒ ใบงาน {ที่อยู่ใบ}\n", ขั้น="คอมมิต")
        บันทึก(f"คอมมิตแล้ว {git('rev-parse', '--short', 'HEAD')} ⇒ {บท}")

        # ⑥ ส่งเสียงขึ้น GitHub Pages ⇒ ก่อนส่งขึ้นอัมกิต ⇒ เหตุผลอยู่หัวไฟล์
        ทางในกอง = [Path(p).relative_to("เสียง/ข้อ").as_posix() for p in ใหม่ + แก้]
        ได้GitHub = ส่งขึ้นGitHub(ทางในกอง, f"เสียง TCV คืน {ท้าย.get('date')} ⇒ {บท} (ใบ #{ใบงาน})")
        if ได้GitHub:
            ผ่าน.append(ได้GitHub)

        # ⑦ ส่ง ⇒ เปิดหรือต่อคำขอรวม
        git_ผ่านเน็ต("push", "origin", f"HEAD:refs/heads/{กิ่ง}", ขั้น="ส่งขึ้นอัมกิต")
        คำอธิบาย = คำอธิบายคำขอรวม(ผ่าน, อ.ฐาน)
        if คำขอ:
            api("PUT", f"/projects/{โปรเจกต์}/merge_requests/{คำขอ['iid']}", {"description": คำอธิบาย})
            บันทึก(f"✅ ต่อคำขอรวม {คำขอ['web_url']}")
        else:
            ได้ = api("POST", f"/projects/{โปรเจกต์}/merge_requests", {
                "source_branch": กิ่ง, "target_branch": "main", "remove_source_branch": True,
                "title": f"เสียง TCV รายคืน เริ่ม {date.today():%Y-%m-%d} (ใบ #{ใบงาน})", "description": คำอธิบาย,
            })
            บันทึก(f"✅ เปิดคำขอรวม {ได้['web_url']}")
        ไฟล์แจ้งล่าสุด.unlink(missing_ok=True)
        return 0
    except หยุดคืน as e:
        บันทึก(f"⛔ หยุดคืน ⇒ {e.ขั้น}")
        if not อ.ไม่ส่ง:
            แจ้งในใบ(e.ขั้น, e.รายละเอียด)
        else:
            บันทึก(e.รายละเอียด)
        return e.รหัส


def main() -> int:
    ป = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ป.add_argument("--ไม่ส่ง", action="store_true", help="ลองทั้งเส้นทาง ⛔ ไม่ยิง ⛔ ไม่คอมมิต ⛔ ไม่ส่ง")
    ป.add_argument("--ในโต๊ะ", action="store_true", help=argparse.SUPPRESS)
    ป.add_argument("--ฐาน", default="origin/main",
                   help="กิ่งที่ยืนและแตกกิ่งรายคืน ⇒ ของจริงคือ origin/main เสมอ ⇒ ใส่อย่างอื่นได้ตอนลองกับ --ไม่ส่ง เท่านั้น")
    อ = ป.parse_args()
    if อ.ฐาน != "origin/main" and not อ.ไม่ส่ง:
        sys.exit("⛔ --ฐาน อื่นนอกจาก origin/main ใช้ได้คู่กับ --ไม่ส่ง เท่านั้น ⇒ ของจริงต้องแตกจาก main")
    return ในโต๊ะ(อ) if อ.ในโต๊ะ else เตรียมโต๊ะ(อ)


if __name__ == "__main__":
    sys.exit(main())
