#!/usr/bin/env python3
"""ทำเสียง TCV ต่อทุกคืน แล้วส่งขึ้น GitHub ⇒ ⛔ รันบนเครื่องของพี่เอมเท่านั้น ⛔ ไม่รันในท่อ

ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/171

## ⭐ หลักที่พี่เอมเคาะ 24 พ.ย. 2569 ⇒ GitHub คือของจริง · อัมกิตคือที่สำรอง

⇒ เว็บขึ้นจาก GitHub สาขา `v3` ⇒ งานนี้จึงส่งเข้า `v3` ตรง ๆ ⇒ ด่านใน gates.yml เป็นคนตัดสินว่าขึ้นเว็บได้ไหม
⇒ แล้วส่งสำเนาไปเก็บที่อัมกิต กิ่ง `github-v3` ⇒ ของที่ GitHub มี อัมกิตต้องมีด้วย
⇒ ⛔ เดิมส่งเข้าอัมกิตแล้วเปิดคำขอรวม ⇒ หลังย้ายเว็บมา GitHub รายการเสียงเลยไม่ถึงเว็บ ⇒ มัทธิว 16 ขึ้นไปกดฟังไม่ได้อยู่ 5 วัน

## รันยังไง

งานตั้งเวลาของ systemd (`phrakham-tts-nightly.timer`) เรียกไฟล์นี้ **จากโต๊ะของมันเอง** ทุกคืน
⇒ โต๊ะคือ git worktree ของที่เก็บ GitHub ที่แยกไว้ให้งานนี้อย่างเดียว
  python3 <โต๊ะ>/tools/ทำเสียงTCVรายคืน.py             ⇒ ของจริง ⇒ ยิง คอมมิต ส่งขึ้น GitHub ส่งสำรองเข้าอัมกิต
  python3 <โต๊ะ>/tools/ทำเสียงTCVรายคืน.py --ไม่ส่ง     ⇒ ลองทั้งเส้นทาง แต่ ⛔ ไม่ยิง ⛔ ไม่คอมมิต ⛔ ไม่ส่ง
⇒ คำสั่งตั้งโต๊ะกับตั้งงานตั้งเวลาอยู่ที่ `docs/เสียงรายคืน-ตั้งเครื่อง.md`

## ทำอะไรบ้าง ⇒ ทีละขั้น ⇒ **ขั้นไหนล้ม หยุดทั้งคืน ⛔ ไม่วนทำซ้ำ ⇒ เขียนแจ้งในใบ #171**

1. **ขั้นเตรียมโต๊ะ** ⇒ ดึงของใหม่จาก GitHub ⇒ ล้างของที่ค้างจากคืนก่อน ⇒ ยืนบน origin/v3 ⇒ แล้วเรียกตัวเองซ้ำจากโค้ดที่เพิ่งดึงมา
   ⇒ คืนไหน v3 แก้สคริปต์นี้ ⇒ คืนนั้นได้สคริปต์ใหม่ทันที ⛔ ไม่ต้องตั้งงานใหม่
2. **ทำเสียง** ⇒ `tools/พ่นเสียงพระคำ.py TCV --คืนนี้ --ยิง` ⇒ งบ สมุดนับโควตา ข้อเพี้ยน อยู่ที่ตัวนั้นทั้งหมด
3. **รันด่านในเครื่อง** ⇒ ด่านเสียงเล่มใหม่ · ด่านเสียงชุดเดิม · พ่นรายการเสียง ⇒ ไม่ผ่าน = ⛔ ไม่ส่ง
4. **คอมมิตในชื่อ Aim Agent** ⇒ เช็กว่าไฟล์เสียงเข้า Git LFS ทุกไฟล์ก่อนส่ง ⇒ ⛔ ไบต์จริงหลุดเข้าประวัติแล้วล้างไม่ได้
5. **ส่งไฟล์เสียงขึ้นที่เก็บเสียงบน GitHub Pages** ⇒ ทำ **ก่อน** ส่งรายการเข้า v3 ⇒ เว็บรู้ว่ามีเสียง = ไฟล์อยู่บน Pages แล้ว
   ⇒ ตัวส่งคือ `tools/ที่เก็บเสียงบนGitHub.py` ⛔ ไม่เขียนซ้ำที่นี่ ⇒ ตัวนั้นดึงของบน GitHub มาก่อนเสมอ ⇒ ⛔ ไม่โดนปฏิเสธแบบคืน 23 พ.ย.
6. **ส่งเข้า GitHub สาขา v3** ⇒ v3 ขยับระหว่างคืน ⇒ ต่อคอมมิตคืนนี้บนของใหม่ก่อน (rebase) แล้วค่อยส่ง
7. **ส่งสำรองเข้าอัมกิต** ⇒ กิ่ง `github-v3` ⇒ ล้ม = แจ้งในใบ ⇒ แต่ของบนเว็บขึ้นไปแล้ว

## ⛔⛔ กุญแจ

อ่านจาก `.env` บน OneDrive ⇒ ⛔ ไม่พิมพ์ ⛔ ไม่เขียนลงไฟล์ ⛔ ไม่อยู่ในบรรทัดคำสั่ง ⇒ ข้อความที่ส่งเข้าใบถูกล้างกุญแจออกก่อน
⇒ `GITHUB_TOKEN_PHRAKHAM` ⇒ ส่งเข้า v3 ผ่าน `tools/กุญแจgitGitHub.sh` ⇒ ตัวส่งเสียงขึ้น Pages อ่านเองด้วย
⇒ `GITLAB_TOKEN_AI` ⇒ แจ้งในใบ #171 และส่งสำรองเข้าอัมกิตผ่าน `tools/กุญแจgitรายคืน.sh` ในชื่อ aim-agent
⇒ `GOOGLE_TTS_API_KEY` ⇒ ตัวพ่นอ่านเอง ⇒ สคริปต์นี้ ⛔ ไม่แตะ

## บันทึก

`~/phrakham-tts-nightly/บันทึก-YYYY-MM.log` (วินโดวส์ ⇒ `%LOCALAPPDATA%\\phrakham-tts-nightly`) ⇒ ทุกบรรทัดที่สคริปต์นี้กับตัวพ่นพิมพ์
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
กิ่งจริง = "v3"
#: ⭐ ที่สำรองบนอัมกิต ⇒ ⛔ ไม่ใช่ main ของอัมกิต ⇒ main นั้นประวัติแยกทางกับ GitHub ตั้งแต่บีบประวัติ 19 พ.ย. 2569
ที่สำรอง = "https://aimgit.aimagin.com/v3/phrakham.git"
กิ่งสำรอง = "github-v3"
ชื่อคนคอมมิต = ["-c", "user.name=Aim Agent", "-c", "user.email=aim-agent@aimagin.com"]
ที่กุญแจ = [Path(r"D:\OneDrive\4 Personal\claude\.env"), Path.home() / "OneDrive" / "4 Personal" / "claude" / ".env"] + (
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


def git_GitHub(*args: str, ขั้น: str) -> str:
    """git ที่คุยกับ GitHub ⇒ กุญแจ GITHUB_TOKEN_PHRAKHAM ผ่าน `tools/กุญแจgitGitHub.sh`
    ⇒ `-c credential.helper=` ปิดตัวเก็บกุญแจของเครื่อง ⇒ ⛔ ไม่หลุดไปใช้กุญแจของพี่เอม"""
    return git("-c", "credential.helper=", *args, ขั้น=ขั้น,
               env={"GIT_ASKPASS": str(โต๊ะ / "tools" / "กุญแจgitGitHub.sh"), "PHRAKHAM_GITHUB_TOKEN": กุญแจGitHub or ""})


def git_อัมกิต(*args: str, ขั้น: str) -> str:
    """git ที่คุยกับอัมกิต ⇒ กุญแจของ aim-agent ผ่าน `tools/กุญแจgitรายคืน.sh` เสมอ"""
    return git("-c", "credential.helper=", *args, ขั้น=ขั้น,
               env={"GIT_ASKPASS": str(โต๊ะ / "tools" / "กุญแจgitรายคืน.sh"), "PHRAKHAM_NIGHTLY_TOKEN": กุญแจ or ""})


def อ่านจาก_env(ชื่อ: str) -> str:
    if os.environ.get(ชื่อ):
        return os.environ[ชื่อ].strip()
    for ทาง in ที่กุญแจ:
        if ทาง.exists():
            for บรรทัด in ทาง.read_text(encoding="utf-8", errors="ignore").splitlines():
                if บรรทัด.startswith(f"{ชื่อ}="):
                    return บรรทัด.split("=", 1)[1].strip().strip('"').strip("'")
    raise หยุดคืน("อ่านกุญแจ", f"หา {ชื่อ} ไม่เจอใน {[str(p) for p in ที่กุญแจ]}")


def อ่านกุญแจ() -> str:
    """กุญแจอัมกิตของ aim-agent ⇒ ใช้แจ้งในใบกับส่งสำรอง"""
    return อ่านจาก_env("GITLAB_TOKEN_AI")


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
        f"3. บันทึกเต็มอยู่บนเครื่องพี่เอม ที่ {ที่บันทึก}\n"
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
    global กุญแจ, กุญแจGitHub
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
        กุญแจGitHub = อ่านจาก_env("GITHUB_TOKEN_PHRAKHAM")
        git_GitHub("fetch", "--prune", "origin", ขั้น="เตรียมโต๊ะ")
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
    """⑤ ส่งเสียงคืนนี้ขึ้นที่เก็บบน GitHub ⇒ คืนประโยคสำหรับบันทึก ⇒ ยังไม่ย้าย = `None` ⇒ ⛔ ไม่ทำอะไร"""
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
    return f"ส่งเสียงใหม่ {len(ทางย่อย)} ไฟล์ขึ้นที่เก็บบน GitHub Pages แล้ว ⇒ ก่อนส่งรายการเข้า v3"


def ในโต๊ะ(อ) -> int:
    global กุญแจ, กุญแจGitHub
    try:
        กุญแจ = อ่านกุญแจ()
        if api("GET", "/user").get("username") != "aim-agent":
            raise หยุดคืน("อ่านกุญแจ", "กุญแจ GITLAB_TOKEN_AI ไม่ใช่ของ aim-agent")
        กุญแจGitHub = อ่านจาก_env("GITHUB_TOKEN_PHRAKHAM")

        # ⭐ กิ่งในเครื่องชั่วคราว ⇒ ⛔ ไม่ส่งชื่อนี้ขึ้นที่ไหน ⇒ ส่งเข้า v3 ตรง ๆ
        กิ่ง = f"เสียงtcv-รายคืน-{date.today():%Y%m%d}"
        git("checkout", "-f", "-B", กิ่ง, อ.ฐาน, ขั้น="แตกกิ่งในเครื่อง")

        # ② ทำเสียง
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

        # ③ ด่านในเครื่อง
        ผ่าน = []
        for ชื่อ, คำ in [("ด่านเสียง TCV เล่มใหม่", ["tools/ด่านเสียงTCVเล่มใหม่.py"]),
                         ("ด่านเสียง TCV ชุดเดิม", ["tools/ด่านเสียงตรงตัวบท.py"]),
                         ("พ่นรายการเสียงให้หน้าเว็บ", ["tools/สร้างรายการเสียง.py"])]:
            รหัส, ออก = รันเครื่องมือ(ชื่อ, *คำ)
            if รหัส != 0:
                raise หยุดคืน(ชื่อ, ออก, 2)
            ผ่าน.append(f"{ชื่อ} ⇒ ผ่าน ⇒ {ออก.strip().splitlines()[-1] if ออก.strip() else ''}")

        # ④ คอมมิต ⇒ ไฟล์เสียงต้องเข้า LFS ทุกไฟล์
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

        # ⑤ ส่งไฟล์เสียงขึ้น GitHub Pages ⇒ ก่อนส่งรายการเข้า v3 ⇒ เหตุผลอยู่หัวไฟล์
        ทางในกอง = [Path(p).relative_to("เสียง/ข้อ").as_posix() for p in ใหม่ + แก้]
        ได้GitHub = ส่งขึ้นGitHub(ทางในกอง, f"เสียง TCV คืน {ท้าย.get('date')} ⇒ {บท} (ใบ #{ใบงาน})")
        if ได้GitHub:
            บันทึก(ได้GitHub)

        # ⑥ ส่งเข้า GitHub สาขา v3 ⇒ v3 ขยับระหว่างคืน ⇒ ต่อบนของใหม่ก่อน ⇒ ไฟล์ของคืนนี้อยู่ใน เสียง/ อย่างเดียว ⇒ ชนยาก
        git_GitHub("fetch", "origin", f"refs/heads/{กิ่งจริง}:refs/remotes/origin/{กิ่งจริง}", ขั้น="ส่งเข้า GitHub")
        try:
            git(*ชื่อคนคอมมิต, "rebase", "-q", f"origin/{กิ่งจริง}", ขั้น="ต่อบน v3 ล่าสุด")
        except หยุดคืน:
            subprocess.run(["git", "-C", str(โต๊ะ), "rebase", "--abort"], capture_output=True)
            raise
        git_GitHub("push", "origin", f"HEAD:refs/heads/{กิ่งจริง}", ขั้น="ส่งเข้า GitHub")
        บันทึก(f"✅ ส่งเข้า GitHub {กิ่งจริง} แล้ว {git('rev-parse', '--short', 'HEAD')} ⇒ ด่านใน gates.yml ตัดสินต่อว่าขึ้นเว็บได้ไหม")

        # ⑦ ส่งสำรองเข้าอัมกิต ⇒ ของที่ GitHub มี อัมกิตต้องมีด้วย
        git_อัมกิต("push", ที่สำรอง, f"HEAD:refs/heads/{กิ่งสำรอง}", ขั้น="ส่งสำรองเข้าอัมกิต (ของบน GitHub ขึ้นไปแล้ว)")
        บันทึก(f"✅ สำรองเข้าอัมกิตแล้ว ⇒ กิ่ง {กิ่งสำรอง}")
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
    ป.add_argument("--ฐาน", default="origin/v3",
                   help="กิ่งที่ยืนและแตกกิ่งรายคืน ⇒ ของจริงคือ origin/v3 เสมอ ⇒ ใส่อย่างอื่นได้ตอนลองกับ --ไม่ส่ง เท่านั้น")
    อ = ป.parse_args()
    if อ.ฐาน != "origin/v3" and not อ.ไม่ส่ง:
        sys.exit("⛔ --ฐาน อื่นนอกจาก origin/v3 ใช้ได้คู่กับ --ไม่ส่ง เท่านั้น ⇒ ของจริงต้องแตกจาก v3")
    return ในโต๊ะ(อ) if อ.ในโต๊ะ else เตรียมโต๊ะ(อ)


if __name__ == "__main__":
    sys.exit(main())
