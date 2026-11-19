#!/usr/bin/env python3
"""เสียงอ่านพระคำบน GitHub Pages ⇒ **อ่านผัง · คัดลอกลงที่เก็บของแต่ละฉบับและกลุ่ม · ส่งขึ้น GitHub · ตรวจว่าเปิดได้**

ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/171
⇒ พี่เอมเคาะ 15 พ.ย. 2569 ⇒ เก็บเสียงบน GitHub Pages ⇒ **ที่เก็บแยกตามฉบับ ฉบับละ 3 ที่** ⇒ ผังอยู่ที่ `เสียง/ที่เก็บบนGitHub.tsv`

## รันยังไง ⇒ **ค่าตั้งต้นคือดูแผนอย่างเดียว ⛔ ไม่แตะอะไร**

  py -3.14 tools/ที่เก็บเสียงบนGitHub.py                  ⇒ แผน ⇒ ที่เก็บละกี่ไฟล์ กี่ MB ⇒ ⛔ ไม่เขียน ⛔ ไม่ส่ง
  py -3.14 tools/ที่เก็บเสียงบนGitHub.py --เตรียม          ⇒ คัดลอกลงที่เก็บในเครื่อง แล้วคอมมิต ⇒ ⛔ ไม่ส่ง
  py -3.14 tools/ที่เก็บเสียงบนGitHub.py --เตรียม --ส่ง    ⇒ บวกส่งขึ้น GitHub และเปิด Pages ⇒ ต้องมีกุญแจ
  py -3.14 tools/ที่เก็บเสียงบนGitHub.py --ตรวจบนเว็บ     ⇒ ขอทุกไฟล์จาก Pages ⇒ ต้องได้ 200 และขนาดตรง

⇒ ที่เก็บในเครื่องอยู่ที่ `%LOCALAPPDATA%\\phrakham-audio-pages\\<ชื่อที่เก็บ>` ⇒ เปลี่ยนด้วย `--ที่ <โฟลเดอร์>`
⇒ ต้องมีไบต์จริงของเสียงก่อน ⇒ `git -c lfs.fetchexclude= lfs pull -I "เสียง/"` ⇒ เจอตัวชี้ของ LFS = หยุดทันที

## ⭐ ไฟล์ไหนไปที่เก็บไหน

⇒ ฉบับ ⇒ ไฟล์ที่รากของ `เสียง/ข้อ/` คือ TCV ⇒ ไฟล์ในโฟลเดอร์ย่อยคือฉบับตามชื่อโฟลเดอร์ (`LSV/Mark.1.1.puck.mp3` คือ LSV)
⇒ เล่ม ⇒ จากชื่อ OSIS หน้าชื่อไฟล์ ⇒ ฉบับกับเล่มรวมกัน ⇒ ได้แถวเดียวในผัง ⇒ ได้ที่เก็บเดียว
⇒ ในที่เก็บ ไฟล์อยู่ที่รากตรง ๆ ด้วยชื่อเดิม ⇒ ⛔ ไม่มีโฟลเดอร์ฉบับซ้อน ⇒ ชื่อที่เก็บบอกฉบับแล้ว
⇒ ⛔ **ฉบับหรือเล่มที่ผังไม่มีแถว ⇒ หยุด และบอกชื่อที่เก็บที่ต้องสร้าง** ⇒ ⛔ ไม่ข้ามเงียบ ๆ
⇒ ⛔ **ที่เก็บที่ยังไม่มีบน GitHub ⇒ หยุด และบอกชื่อที่เก็บที่ต้องสร้าง** เหมือนกัน

## ⛔⛔ ทำไมเป็นกิตธรรมดา ⛔ ไม่ใช่ Git LFS

GitHub Pages ⛔ เปิดไฟล์ใน LFS ไม่ได้ ⇒ ส่งไปแต่ตัวชี้ 130 ไบต์ ⇒ ผู้อ่านกดฟังแล้วเงียบ
⇒ ที่เก็บบน GitHub จึงเก็บ mp3 ตรง ๆ ⇒ ⭐ ต้นฉบับยังอยู่ใน LFS ของอัมกิตเหมือนเดิม ⇒ ที่เก็บบน GitHub เป็นแค่สำเนาให้เว็บเปิด
⇒ ใส่ `.nojekyll` ⇒ Pages ⛔ ไม่ต้องผ่าน Jekyll ⇒ คัดลอกไฟล์ตรง ๆ เร็วกว่า

## ⛔⛔ กุญแจ

`GITHUB_TOKEN_PHRAKHAM` ⇒ อ่านจากตัวแปรแวดล้อมก่อน ⇒ ไม่มีก็อ่านจาก `.env` บน OneDrive
⇒ ส่งให้ git ทาง `tools/กุญแจgitGitHub.sh` ⇒ ⛔ ไม่อยู่ในบรรทัดคำสั่ง ⛔ ไม่อยู่ในที่อยู่ของ remote ⛔ ไม่ถูกพิมพ์
⇒ กุญแจต้องเป็นแบบ fine-grained ที่ให้สิทธิ์ Contents กับ Pages เขียนได้ ของทุกที่เก็บในผัง ⇒ ดู `docs/เสียงบนGitHub-ที่พี่เอมต้องทำ.md`
"""
import argparse
import concurrent.futures
import filecmp
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ราก = Path(__file__).resolve().parent.parent
ไฟล์ผัง = ราก / "เสียง" / "ที่เก็บบนGitHub.tsv"
กองเสียง = ราก / "เสียง" / "ข้อ"
ที่ตั้งต้น = Path(os.environ.get("LOCALAPPDATA") or Path.home()) / "phrakham-audio-pages"
ตัวตอบกุญแจ = ราก / "tools" / "กุญแจgitGitHub.sh"
ชื่อกุญแจ = "GITHUB_TOKEN_PHRAKHAM"
ที่กุญแจ = [Path(r"D:\OneDrive\4 Personal\claude\.env")]
ชื่อคนคอมมิต = ["-c", "user.name=Aim Agent", "-c", "user.email=aim-agent@aimagin.com"]

#: ⭐ ฉบับที่ไฟล์อยู่ที่รากของ `เสียง/ข้อ/` ⇒ ของเดิมจากเว็บรุ่น 2 ⇒ ฉบับอื่นอยู่ในโฟลเดอร์ชื่อฉบับ
ฉบับที่ราก = "TCV"
#: ⭐ กลุ่มที่ทุกฉบับต้องมี ⇒ ฉบับละ 3 ที่เก็บ ⇒ เล่มของแต่ละกลุ่มต้องเหมือนกันทุกฉบับ
กลุ่มที่ต้องมี = ("ot1", "ot2", "nt")

#: ⭐ **เพดานของ GitHub Pages คือ 1 GB ต่อที่** ⇒ คิดเป็นเมกะไบต์ฐานสิบ (1 MB = 1,000,000 ไบต์) แบบที่ GitHub เขียน
เพดานMB = 1000
#: ⛔ **เส้นหยุด** ⇒ ที่เก็บไหนเกินนี้ ⇒ ด่านแดง และตัวนี้ ⛔ ไม่ส่ง ⇒ เหลือ 100 MB ให้ทันเปิดที่เก็บใหม่
เส้นหยุดMB = 900
#: ⭐ **เส้นของแผน** ⇒ ขนาดที่คาดเมื่อฉบับนั้นครบทั้งเล่ม ต้อง ⛔ ไม่เกินนี้
เส้นแผนMB = 800

_รูปที่เก็บ = re.compile(r"^([A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)/([A-Za-z0-9._-]+)$")
_หัวผัง = ["ฉบับ", "กลุ่ม", "ที่เก็บ", "ที่อยู่", "เล่ม"]


class ไม่มีที่เก็บ(RuntimeError):
    """ไฟล์ที่ผังไม่มีที่ให้ หรือที่เก็บที่ยังไม่มีบน GitHub ⇒ ข้อความบอกชื่อที่เก็บที่ต้องสร้างเสมอ"""


# ---------------------------------------------------------------------------
# ผัง ⇒ อ่าน · หาที่เก็บของไฟล์ · ตัวสร้างฐานที่อยู่
# ---------------------------------------------------------------------------
def อ่านกลุ่ม(ทาง: Path = ไฟล์ผัง) -> list[dict]:
    """อ่านผัง ⇒ แถวละที่เก็บ ⇒ ⛔ ไม่ตรวจความถูกต้อง ⇒ นั่นเป็นงานของ `tools/ด่านที่เก็บเสียงบนGitHub.py`"""
    แถว = [x for x in ทาง.read_text(encoding="utf-8").replace("\r\n", "\n").split("\n") if x and not x.startswith("#")]
    if แถว[0].split("\t") != _หัวผัง:
        raise ValueError(f"หัวตารางของ {ทาง.name} ผิด ⇒ ได้ {แถว[0].split(chr(9))} ⇒ ต้องเป็น {_หัวผัง}")
    ผล = []
    for x in แถว[1:]:
        ช่อง = x.split("\t")
        if len(ช่อง) != len(_หัวผัง):
            raise ValueError(f"{ทาง.name} แถว {ช่อง[:2]} มี {len(ช่อง)} ช่อง ⇒ ต้องมี {len(_หัวผัง)}")
        ผล.append({"ฉบับ": ช่อง[0], "กลุ่ม": ช่อง[1], "ที่เก็บ": ช่อง[2], "ที่อยู่": ช่อง[3], "เล่ม": ช่อง[4].split()})
    return ผล


def ชื่อที่เก็บที่ถูก(เจ้าของ: str, ฉบับ: str, กลุ่ม: str) -> str:
    """⭐ รูปที่พี่เอมเคาะ ⇒ `<เจ้าของ>/phrakham-audio-<ฉบับตัวเล็ก>-<กลุ่ม>`"""
    return f"{เจ้าของ}/phrakham-audio-{ฉบับ.lower()}-{กลุ่ม}"


def ที่อยู่ที่ถูกของที่เก็บ(ที่เก็บ: str) -> str:
    """`aim-krisada/phrakham-audio-tcv-nt` ⇒ `https://aim-krisada.github.io/phrakham-audio-tcv-nt/`"""
    m = _รูปที่เก็บ.match(ที่เก็บ)
    if not m:
        raise ValueError(f"ชื่อที่เก็บ {ที่เก็บ!r} ⛔ ไม่ใช่รูป เจ้าของ/ชื่อ")
    return f"https://{m.group(1).lower()}.github.io/{m.group(2)}/"


def เจ้าของ(กลุ่ม: list[dict]) -> str:
    return กลุ่ม[0]["ที่เก็บ"].split("/")[0] if กลุ่ม else "aim-krisada"


def ย้ายแล้วไหม(กลุ่ม: list[dict]) -> bool:
    """⭐ ช่อง `ที่อยู่` ครบทุกแถว = ย้ายแล้ว · ว่างทุกแถว = ยังไม่ย้าย · ⛔ มีบางแถว = โยนข้อผิดพลาด"""
    มี = [g["ที่เก็บ"] for g in กลุ่ม if g["ที่อยู่"]]
    if มี and len(มี) != len(กลุ่ม):
        raise ValueError(f"ช่อง ที่อยู่ ของ {ไฟล์ผัง.name} มีแค่ {len(มี)} จาก {len(กลุ่ม)} แถว ⇒ ต้องครบทุกแถว หรือว่างทุกแถว")
    return bool(มี)


def ฐานของฉบับ(กลุ่ม: list[dict]) -> dict[str, dict[str, str]]:
    """⭐⭐ **ตัวสร้างที่อยู่ฝั่งไพทอน** ⇒ ฉบับ ⇒ รหัสเล่ม ⇒ ฐานที่อยู่ของที่เก็บที่ฉบับกับเล่มนั้นอยู่

    ⇒ ยังไม่ย้าย ⇒ คืน `{}` ⇒ ตัวพ่นรายการ ⛔ ไม่ใส่กุญแจ `ฐานของฉบับ` ⇒ เว็บใช้ `audio/` ของตัวเองเหมือนเดิม
    ⇒ ย้ายแล้ว ⇒ ไฟล์อยู่ที่รากของที่เก็บ ⇒ ที่อยู่ไฟล์ = ฐาน + ชื่อไฟล์ ⇒ ⛔ ไม่ต่อโฟลเดอร์ฉบับ (`LSV/`)
    ⇒ ตัวต่อที่อยู่ฝั่งหน้าเว็บคือ `server/utils/เสียงของเล่ม.ts` กับ `app/utils/คิวเสียง.ts` ⇒ ด่านคือ `tools/ด่านที่อยู่ไฟล์เสียง.mjs`
    """
    if not ย้ายแล้วไหม(กลุ่ม):
        return {}
    ผล: dict[str, dict[str, str]] = {}
    for g in กลุ่ม:
        ของฉบับ = ผล.setdefault(g["ฉบับ"], {})
        for เล่ม in g["เล่ม"]:
            if เล่ม in ของฉบับ:
                raise ValueError(f"ฉบับ {g['ฉบับ']} เล่ม {เล่ม} อยู่มากกว่า 1 ที่เก็บ")
            ของฉบับ[เล่ม] = g["ที่อยู่"]
    return ผล


def osisเป็นรหัสเล่ม() -> dict[str, str]:
    """ชื่อไฟล์เสียงขึ้นต้นด้วยชื่อ OSIS (`Matt.1.1.puck.mp3`) ⇒ แปลงกลับเป็นรหัสเล่มของเรา ⇒ ครบ 66 เล่ม"""
    sys.path.insert(0, str(ราก / "tools"))
    from เสียงที่พ่นไว้ import เล่มที่มีเสียง, ลำดับเล่มTCV  # noqa: E402
    return {osis: k for k, osis in [*ลำดับเล่มTCV, *เล่มที่มีเสียง.items()]}


def ไฟล์เสียงทั้งหมด(กอง: Path = กองเสียง) -> list[Path]:
    """ทุก mp3 ใต้ `เสียง/ข้อ/` รวมโฟลเดอร์ของฉบับอื่น"""
    return sorted(p for p in กอง.rglob("*.mp3") if p.is_file())


def ฉบับของไฟล์(ทางย่อย: str) -> str:
    """`Mark.1.1.puck.mp3` ⇒ TCV · `LSV/Mark.1.1.puck.mp3` ⇒ LSV"""
    ส่วน = ทางย่อย.split("/")
    if len(ส่วน) == 1:
        return ฉบับที่ราก
    if len(ส่วน) == 2:
        return ส่วน[0]
    raise ValueError(f"{ทางย่อย} ⇒ ลึกเกินหนึ่งโฟลเดอร์ ⇒ ไม่รู้ว่าเป็นฉบับไหน")


def ที่เก็บของไฟล์(ทางย่อย: str, กลุ่ม: list[dict], osis: dict[str, str]) -> dict:
    """⭐⭐ **ฉบับ + เล่ม ⇒ แถวเดียวในผัง** ⇒ ⛔ หาไม่เจอ ⇒ โยน `ไม่มีที่เก็บ` พร้อมชื่อที่เก็บที่ต้องสร้าง"""
    ฉบับ = ฉบับของไฟล์(ทางย่อย)
    เล่ม = osis.get(Path(ทางย่อย).name.split(".")[0])
    if เล่ม is None:
        raise ไม่มีที่เก็บ(f"{ทางย่อย} ⇒ หาเล่มจากชื่อไฟล์ไม่เจอ ⇒ ชื่อไฟล์ต้องขึ้นต้นด้วยชื่อ OSIS ของเล่ม")
    for g in กลุ่ม:
        if g["ฉบับ"] == ฉบับ and เล่ม in g["เล่ม"]:
            return g
    # ⇒ บอกชื่อที่เก็บที่ควรมี ⇒ กลุ่มดูจากการแบ่งเล่มของฉบับอื่น (ทุกฉบับแบ่งเหมือนกัน)
    รหัสกลุ่ม = next((g["กลุ่ม"] for g in กลุ่ม if เล่ม in g["เล่ม"]), "?")
    ควร = ชื่อที่เก็บที่ถูก(เจ้าของ(กลุ่ม), ฉบับ, รหัสกลุ่ม)
    raise ไม่มีที่เก็บ(
        f"เสียง {ทางย่อย} ⇒ ฉบับ {ฉบับ} เล่ม {เล่ม} ⇒ ผังยังไม่มีที่เก็บให้\n"
        f"   ⇒ ให้พี่เอมสร้างที่เก็บ {ควร} บน GitHub (Public)\n"
        f"   ⇒ แล้วเพิ่มแถว {ฉบับ} {รหัสกลุ่ม} {ควร} ใน เสียง/{ไฟล์ผัง.name}")


def แบ่งไฟล์(กลุ่ม: list[dict], ไฟล์: list[Path]) -> dict[str, list[str]]:
    """ที่เก็บ ⇒ ทางย่อยของไฟล์ (แบบ `LSV/Mark.1.1.puck.mp3`) ⇒ ไฟล์ที่หาที่เก็บไม่เจอ = หยุด"""
    osis = osisเป็นรหัสเล่ม()
    ผล: dict[str, list[str]] = {g["ที่เก็บ"]: [] for g in กลุ่ม}
    for p in ไฟล์:
        ย่อย = p.relative_to(กองเสียง).as_posix()
        ผล[ที่เก็บของไฟล์(ย่อย, กลุ่ม, osis)["ที่เก็บ"]].append(ย่อย)
    return ผล


def ชื่อในที่เก็บ(ทางย่อย: str) -> str:
    """⭐ ในที่เก็บ ไฟล์อยู่ที่ราก ⇒ `LSV/Mark.1.1.puck.mp3` ⇒ `Mark.1.1.puck.mp3`"""
    return Path(ทางย่อย).name


def เป็นตัวชี้LFS(p: Path) -> bool:
    with p.open("rb") as f:
        return f.read(40).startswith(b"version https://git-lfs")


# ---------------------------------------------------------------------------
# กุญแจกับ git
# ---------------------------------------------------------------------------
def อ่านกุญแจ() -> str | None:
    if os.environ.get(ชื่อกุญแจ):
        return os.environ[ชื่อกุญแจ].strip()
    for ทาง in ที่กุญแจ:
        if ทาง.exists():
            for บรรทัด in ทาง.read_text(encoding="utf-8", errors="ignore").splitlines():
                if บรรทัด.startswith(f"{ชื่อกุญแจ}="):
                    return บรรทัด.split("=", 1)[1].strip().strip('"').strip("'") or None
    return None


def git(ที่: Path, *args: str, กุญแจ: str | None = None) -> str:
    env = {**os.environ, "GIT_TERMINAL_PROMPT": "0"}
    if กุญแจ:
        env |= {"GIT_ASKPASS": str(ตัวตอบกุญแจ), "PHRAKHAM_GITHUB_TOKEN": กุญแจ}
    ผล = subprocess.run(["git", "-C", str(ที่), "-c", "credential.helper=", *args], capture_output=True, text=True,
                        encoding="utf-8", errors="replace", env=env)
    if ผล.returncode != 0:
        ข้อความ = f"git {' '.join(args)}\n{ผล.stdout[-1500:]}\n{ผล.stderr[-1500:]}"
        raise RuntimeError(ข้อความ.replace(กุญแจ, "***") if กุญแจ else ข้อความ)
    return ผล.stdout.strip()


def git_GitHub(ที่: Path, ที่เก็บ: str, กุญแจ: str, *args: str) -> str:
    """git ที่คุยกับ GitHub ⇒ ⛔ ที่เก็บยังไม่มี ⇒ แปลงเป็นข้อความไทยที่บอกชื่อที่เก็บที่ต้องสร้าง"""
    try:
        return git(ที่, *args, กุญแจ=กุญแจ)
    except RuntimeError as e:
        if re.search(r"not found|does not exist|404", str(e), re.I):
            raise ไม่มีที่เก็บ(f"ที่เก็บ {ที่เก็บ} ยังไม่มีบน GitHub หรือกุญแจมองไม่เห็น\n"
                               f"   ⇒ ให้พี่เอมสร้างที่เก็บ {ที่เก็บ} (Public)\n"
                               f"   ⇒ และเพิ่มที่เก็บนี้ในกุญแจ {ชื่อกุญแจ} ⇒ ดู docs/เสียงบนGitHub-ที่พี่เอมต้องทำ.md") from None
        raise


def เตรียมที่เก็บในเครื่อง(g: dict, ที่: Path, กุญแจ: str | None) -> Path:
    """⭐ มีอยู่แล้ว ⇒ ใช้ต่อ ⇒ ไม่มี ⇒ มีกุญแจ = โคลนจาก GitHub · ไม่มีกุญแจ = ตั้งที่เก็บเปล่า
    ⇒ ที่อยู่ของ remote ⛔ ไม่มีกุญแจติดอยู่ ⇒ กุญแจมาทาง `GIT_ASKPASS` ตอนคุยกับ GitHub เท่านั้น"""
    โฟลเดอร์ = ที่ / g["ที่เก็บ"].split("/")[1]
    remote = f"https://github.com/{g['ที่เก็บ']}.git"
    if not (โฟลเดอร์ / ".git").exists():
        โฟลเดอร์.parent.mkdir(parents=True, exist_ok=True)
        if กุญแจ:
            git_GitHub(โฟลเดอร์.parent, g["ที่เก็บ"], กุญแจ, "clone", "-q", remote, โฟลเดอร์.name)
        else:
            โฟลเดอร์.mkdir(parents=True, exist_ok=True)
            git(โฟลเดอร์, "init", "-q", "-b", "main")
            git(โฟลเดอร์, "remote", "add", "origin", remote)
    # ⭐ ที่เก็บเปล่าที่เพิ่งโคลนมายังไม่มีกิ่ง ⇒ ตั้งชื่อกิ่งเป็น main ให้ตรงกับที่ Pages อ่าน
    git(โฟลเดอร์, "symbolic-ref", "HEAD", "refs/heads/main")
    return โฟลเดอร์


def ประโยคหน้าแรก(g: dict) -> str:
    return (f"# เสียงอ่านพระคำ ฉบับ {g['ฉบับ']} กลุ่ม {g['กลุ่ม']}\n\n"
            f"เล่ม {' '.join(g['เล่ม'])}\n\n"
            "เสียงอ่านทีละข้อ ของเว็บ พระคำ.ชีวิต ⇒ ไฟล์ในที่เก็บนี้คัดลอกมาจาก "
            "https://aimgit.aimagin.com/v3/phrakham (โฟลเดอร์ เสียง/ข้อ/) ⇒ ⛔ อย่าแก้ที่นี่ ⇒ แก้ที่ต้นทางแล้วส่งใหม่\n\n"
            "ที่มาและสัญญาอนุญาตของฉบับนี้อยู่ใน /api/audio.json ของเว็บ\n")


def คัดลอกลงที่เก็บ(g: dict, โฟลเดอร์: Path, ทางย่อย: list[str], ลบไฟล์เกิน: bool) -> tuple[int, int]:
    """คัดลอกไฟล์ที่ใหม่หรือต่างจากเดิม ⇒ คืน (คัดลอกกี่ไฟล์, ลบกี่ไฟล์)
    ⇒ `ลบไฟล์เกิน` ⇒ ไฟล์ในที่เก็บที่ต้นทาง ⛔ ไม่มีแล้ว ⇒ ลบทิ้ง ⇒ ใช้ตอนคัดลอกทั้งกอง ⛔ ไม่ใช้ตอนส่งรายคืน"""
    (โฟลเดอร์ / ".nojekyll").write_bytes(b"")
    (โฟลเดอร์ / "README.md").write_text(ประโยคหน้าแรก(g), encoding="utf-8")
    คัด = 0
    for ย่อย in ทางย่อย:
        if ฉบับของไฟล์(ย่อย) != g["ฉบับ"]:
            raise RuntimeError(f"{ย่อย} เป็นของฉบับ {ฉบับของไฟล์(ย่อย)} ⛔ ห้ามลงที่เก็บของฉบับ {g['ฉบับ']} ({g['ที่เก็บ']})")
        ต้น, ปลาย = กองเสียง / ย่อย, โฟลเดอร์ / ชื่อในที่เก็บ(ย่อย)
        if เป็นตัวชี้LFS(ต้น):
            raise RuntimeError(f"{ต้น} เป็นตัวชี้ของ Git LFS ⛔ ไม่ใช่ไบต์จริง ⇒ สั่ง git -c lfs.fetchexclude= lfs pull -I \"เสียง/\" ก่อน")
        if ปลาย.exists() and filecmp.cmp(ต้น, ปลาย, shallow=False):
            continue
        shutil.copyfile(ต้น, ปลาย)
        คัด += 1
    ลบ = 0
    if ลบไฟล์เกิน:
        ควรมี = {ชื่อในที่เก็บ(x) for x in ทางย่อย}
        for p in โฟลเดอร์.rglob("*.mp3"):
            if ".git" not in p.parts and p.relative_to(โฟลเดอร์).as_posix() not in ควรมี:
                p.unlink()
                ลบ += 1
    return คัด, ลบ


def ขนาดในที่เก็บMB(โฟลเดอร์: Path) -> float:
    return sum(p.stat().st_size for p in โฟลเดอร์.rglob("*.mp3") if ".git" not in p.parts) / 1e6


def คอมมิต(โฟลเดอร์: Path, ข้อความ: str) -> bool:
    git(โฟลเดอร์, "add", "-A")
    if not git(โฟลเดอร์, "status", "--porcelain"):
        return False
    git(โฟลเดอร์, *ชื่อคนคอมมิต, "commit", "-q", "-m", ข้อความ)
    return True


def เปิดPages(ที่เก็บ: str, กุญแจ: str) -> str:
    """⭐ เปิด GitHub Pages ให้อ่านจากกิ่ง main ที่ราก ⇒ เปิดอยู่แล้ว (409) = ไม่ต้องทำอะไร ⇒ คืนที่อยู่ของ Pages"""
    หัว = {"Authorization": f"Bearer {กุญแจ}", "Accept": "application/vnd.github+json",
           "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "phrakham-audio-tool"}
    ฐาน = f"https://api.github.com/repos/{ที่เก็บ}/pages"
    ตัว = json.dumps({"build_type": "legacy", "source": {"branch": "main", "path": "/"}}).encode()
    try:
        with urllib.request.urlopen(urllib.request.Request(ฐาน, data=ตัว, method="POST",
                                                           headers={**หัว, "Content-Type": "application/json"}), timeout=60) as r:
            return json.loads(r.read()).get("html_url", "")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            raise ไม่มีที่เก็บ(f"เปิด Pages ไม่ได้ ⇒ ที่เก็บ {ที่เก็บ} ยังไม่มี หรือกุญแจไม่มีสิทธิ์ Pages ⇒ ดู docs/เสียงบนGitHub-ที่พี่เอมต้องทำ.md")
        if e.code != 409:
            raise RuntimeError(f"เปิด Pages ของ {ที่เก็บ} ไม่ได้ ⇒ HTTP {e.code} {e.read().decode('utf-8', 'replace')[:300]}")
    with urllib.request.urlopen(urllib.request.Request(ฐาน, headers=หัว), timeout=60) as r:
        return json.loads(r.read()).get("html_url", "")


# ---------------------------------------------------------------------------
# งานใหญ่ 3 อย่าง ⇒ แผน · เตรียมและส่ง · ตรวจบนเว็บ
# ---------------------------------------------------------------------------
def แผน(กลุ่ม: list[dict]) -> int:
    แบ่ง = แบ่งไฟล์(กลุ่ม, ไฟล์เสียงทั้งหมด())
    ชี้ = 0
    for g in กลุ่ม:
        ไฟล์ = แบ่ง[g["ที่เก็บ"]]
        ขนาด = sum((กองเสียง / x).stat().st_size for x in ไฟล์) / 1e6
        ชี้ += sum(1 for x in ไฟล์ if เป็นตัวชี้LFS(กองเสียง / x))
        print(f"{g['ฉบับ']:>5} {g['กลุ่ม']:<3} ⇒ {g['ที่เก็บ']} ⇒ {len(ไฟล์):,} ไฟล์ · {ขนาด:,.1f} MB")
    print(f"ย้ายแล้วหรือยัง ⇒ {'ย้ายแล้ว หน้าเว็บขอไฟล์จาก GitHub' if ย้ายแล้วไหม(กลุ่ม) else 'ยัง ⇒ หน้าเว็บใช้ /audio/ ของตัวเอง'}")
    if ชี้:
        print(f"⚠️ มีตัวชี้ของ LFS {ชี้:,} ไฟล์ ⇒ ขนาดข้างบนยังไม่ใช่ของจริง ⇒ สั่ง git -c lfs.fetchexclude= lfs pull -I \"เสียง/\" ก่อน --เตรียม")
    print("⇒ ดูแผนอย่างเดียว ⛔ ไม่ได้เขียนอะไร ⇒ ใส่ --เตรียม เพื่อคัดลอกลงที่เก็บในเครื่อง")
    return 0


def เผยแพร่(กลุ่ม: list[dict], ทางย่อย: list[str] | None, ที่: Path, ส่งด้วย: bool, ข้อความ: str,
            พิมพ์=print) -> None:
    """⭐⭐ **ตัวเดียวที่เขียนลงที่เก็บบน GitHub** ⇒ ใช้ทั้งตอนคัดลอกทั้งกอง (`ทางย่อย=None`) และตอนส่งรายคืน

    ⇒ ทั้งกอง ⇒ ทุกไฟล์ใต้ `เสียง/ข้อ/` ทุกที่เก็บในผัง และลบไฟล์ที่ต้นทางไม่มีแล้ว
    ⇒ รายคืน ⇒ เฉพาะไฟล์ที่ส่งมา ⇒ ⛔ ไม่ลบอะไร
    ⛔ แบ่งไฟล์ให้ครบก่อนแตะที่เก็บไหน ⇒ ไฟล์ที่ไม่มีที่เก็บ ⇒ หยุดตั้งแต่ต้น ⇒ ⛔ ไม่ส่งไปครึ่งเดียว
    ⛔ ล้มตรงไหน ⇒ โยน `RuntimeError` (รวม `ไม่มีที่เก็บ`) ⇒ คนเรียกเป็นคนตัดสินว่าจะหยุดยังไง
    """
    กุญแจ = อ่านกุญแจ() if ส่งด้วย else None
    if ส่งด้วย and not กุญแจ:
        raise RuntimeError(f"ไม่มีกุญแจ {ชื่อกุญแจ} ทั้งในตัวแปรแวดล้อมและใน {[str(p) for p in ที่กุญแจ]} ⇒ ส่งไม่ได้")
    ทั้งกอง = ทางย่อย is None
    แบ่ง = แบ่งไฟล์(กลุ่ม, ไฟล์เสียงทั้งหมด() if ทั้งกอง else [กองเสียง / x for x in ทางย่อย])
    for g in กลุ่ม:
        ไฟล์ = แบ่ง[g["ที่เก็บ"]]
        if not ไฟล์ and not ทั้งกอง:
            continue
        โฟลเดอร์ = เตรียมที่เก็บในเครื่อง(g, ที่, กุญแจ)
        คัด, ลบ = คัดลอกลงที่เก็บ(g, โฟลเดอร์, ไฟล์, ลบไฟล์เกิน=ทั้งกอง)
        ขนาด = ขนาดในที่เก็บMB(โฟลเดอร์)
        พิมพ์(f"{g['ที่เก็บ']} ⇒ คัดลอก {คัด:,} · ลบ {ลบ:,} ⇒ รวม {ขนาด:,.1f} MB")
        # ⛔ **เกินเส้นหยุด ⇒ ⛔ ไม่คอมมิต ⛔ ไม่ส่ง** ⇒ ของที่ส่งขึ้นไปแล้วลดขนาดประวัติไม่ได้
        if ขนาด > เส้นหยุดMB:
            raise RuntimeError(f"{g['ที่เก็บ']} จะมี {ขนาด:,.1f} MB เกินเส้นหยุด {เส้นหยุดMB} MB ⇒ ต้องเปิดที่เก็บใหม่ "
                               f"แล้วแบ่งกลุ่มใน {ไฟล์ผัง.name} ใหม่ก่อน")
        if คอมมิต(โฟลเดอร์, f"{ข้อความ}\n\n{g['ที่เก็บ']} ⇒ คัดลอก {คัด} ไฟล์ · ลบ {ลบ} ไฟล์ ⇒ รวม {ขนาด:.1f} MB\n"):
            พิมพ์(f"  คอมมิตแล้ว {git(โฟลเดอร์, 'rev-parse', '--short', 'HEAD')}")
        if ส่งด้วย:
            git_GitHub(โฟลเดอร์, g["ที่เก็บ"], กุญแจ, "push", "-q", "origin", "HEAD:refs/heads/main")
            พิมพ์(f"  ส่งขึ้น https://github.com/{g['ที่เก็บ']} แล้ว")
            if ทั้งกอง:
                พิมพ์(f"  Pages ⇒ {เปิดPages(g['ที่เก็บ'], กุญแจ) or ที่อยู่ที่ถูกของที่เก็บ(g['ที่เก็บ'])}")


#: ชนิดที่ Pages ส่งมาแล้วนับว่าเป็นไฟล์เสียง mp3 ⇒ ดูเหตุผลใน `ตรวจบนเว็บ`
ชนิดเสียงที่รับ = ("audio/mpeg", "audio/mp3")


def ตรวจบนเว็บ(กลุ่ม: list[dict], งานพร้อมกัน: int = 16) -> int:
    """⭐ ขอทุกไฟล์จาก Pages แบบ HEAD ⇒ ต้องได้ 200 ชนิดเสียง mp3 และขนาดเท่าไฟล์ต้นทาง
    ⇒ ชนิดที่รับ ⇒ `audio/mpeg` (ชื่อมาตรฐาน) กับ `audio/mp3` ⇒ GitHub Pages ส่งแบบหลัง
      ⇒ ลองจริง 16 พ.ย. 2569 ⇒ Chrome เล่นได้ · ขอช่วงไฟล์ได้ 206 · เปิดให้ทุกเว็บ `*`
    ⇒ ต้องผ่านก่อนเติมช่อง `ที่อยู่` ⇒ ช่องว่างอยู่ก็ใช้ที่อยู่ที่ควรเป็นจากชื่อที่เก็บ"""
    แบ่ง = แบ่งไฟล์(กลุ่ม, ไฟล์เสียงทั้งหมด())
    งาน = []
    for g in กลุ่ม:
        ฐาน = g["ที่อยู่"] or ที่อยู่ที่ถูกของที่เก็บ(g["ที่เก็บ"])
        for x in แบ่ง[g["ที่เก็บ"]]:
            ต้น = กองเสียง / x
            if เป็นตัวชี้LFS(ต้น):
                print(f"⛔ {ต้น} เป็นตัวชี้ของ LFS ⇒ เทียบขนาดไม่ได้ ⇒ ดึงไบต์จริงก่อน")
                return 1
            งาน.append((ฐาน + ชื่อในที่เก็บ(x), ต้น.stat().st_size))

    def ขอ(คู่):
        ที่อยู่, ขนาด = คู่
        try:
            with urllib.request.urlopen(urllib.request.Request(ที่อยู่, method="HEAD",
                                                               headers={"User-Agent": "phrakham-audio-tool"}), timeout=30) as r:
                ได้ = int(r.headers.get("Content-Length") or -1)
                ชนิด = r.headers.get("Content-Type", "")
                if ได้ != ขนาด or not ชนิด.startswith(ชนิดเสียงที่รับ):
                    return f"{ที่อยู่} ⇒ ขนาด {ได้} (ต้นทาง {ขนาด}) ชนิด {ชนิด}"
        except (urllib.error.URLError, TimeoutError) as e:
            return f"{ที่อยู่} ⇒ {e}"
        return None

    with concurrent.futures.ThreadPoolExecutor(งานพร้อมกัน) as ex:
        เสีย = [x for x in ex.map(ขอ, งาน) if x]
    for x in เสีย[:30]:
        print(f"⛔ {x}")
    if เสีย:
        print(f"⛔ เปิดไม่ได้หรือไม่ตรง {len(เสีย):,} จาก {len(งาน):,} ไฟล์ ⇒ ⛔ ยังห้ามเติมช่อง ที่อยู่")
        return 1
    print(f"✅ เปิดได้และขนาดตรงครบ {len(งาน):,} ไฟล์ ⇒ เติมช่อง ที่อยู่ ใน {ไฟล์ผัง.name} ได้แล้ว")
    for g in กลุ่ม:
        print(f"   {g['ฉบับ']} {g['กลุ่ม']} ⇒ {g['ที่อยู่'] or ที่อยู่ที่ถูกของที่เก็บ(g['ที่เก็บ'])}")
    return 0


def main() -> int:
    ป = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ป.add_argument("--เตรียม", action="store_true", help="คัดลอกลงที่เก็บในเครื่องแล้วคอมมิต")
    ป.add_argument("--ส่ง", action="store_true", help="บวกส่งขึ้น GitHub และเปิด Pages ⇒ ใช้คู่กับ --เตรียม")
    ป.add_argument("--ตรวจบนเว็บ", action="store_true", help="ขอทุกไฟล์จาก Pages ⇒ ต้องเปิดได้และขนาดตรง")
    ป.add_argument("--ที่", type=Path, default=ที่ตั้งต้น, help=f"โฟลเดอร์ของที่เก็บในเครื่อง ⇒ ตั้งต้น {ที่ตั้งต้น}")
    อ = ป.parse_args()
    if อ.ส่ง and not อ.เตรียม:
        ป.error("--ส่ง ต้องใช้คู่กับ --เตรียม")
    try:
        กลุ่ม = อ่านกลุ่ม()
        if อ.ตรวจบนเว็บ:
            return ตรวจบนเว็บ(กลุ่ม)
        if not อ.เตรียม:
            return แผน(กลุ่ม)
        เผยแพร่(กลุ่ม, None, อ.ที่, อ.ส่ง, "คัดลอกเสียงทั้งกองจาก v3/phrakham เสียง/ข้อ/ (ใบ #171)")
    except (RuntimeError, ValueError) as e:
        print(f"⛔ {e}")
        return 1
    if not อ.ส่ง:
        print("⇒ ⛔ ยังไม่ได้ส่ง ⇒ ใส่ --ส่ง เมื่อมีกุญแจและที่เก็บบน GitHub แล้ว")
    return 0


if __name__ == "__main__":
    sys.exit(main())
