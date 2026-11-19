#!/usr/bin/env python3
"""สร้างท่อตรวจของ GitHub Actions จาก `.gitlab-ci.yml` ⇒ **ด่านทุกตัววิ่งบน GitHub ครบเหมือนบนอัมกิต**

**ทำไมมีไฟล์นี้** ⇒ พี่เอมเคาะ 19 พ.ย. 2569 ⇒ ย้ายเว็บขึ้น GitHub แบบที่เก็บสาธารณะ เหมือนเว็บเพลง
  ⇒ บนอัมกิตท่อหนึ่งรอบใช้ 2 ชั่วโมงขึ้นไป เพราะตัวรันวิ่งได้ทีละราว 2 งาน
  ⇒ GitHub ให้ที่เก็บสาธารณะวิ่งพร้อมกันได้ 20 งาน ⛔ ไม่เสียเงิน

**ทำไมสร้างจาก `.gitlab-ci.yml` ⛔ ไม่เขียนท่อใหม่ด้วยมือ**
  ⇒ ด่านมี 232 งาน ⇒ เขียนสองที่ด้วยมือ วันหนึ่งสองที่จะไม่ตรงกัน แล้วด่านหายไปเงียบ ๆ
  ⇒ ด่านที่ตรวจตัวท่อเอง (เช่น ด่านทุกตัวต้องมีคู่ *ยังจับได้*) ยังอ่าน `.gitlab-ci.yml` ได้เหมือนเดิม
  ⇒ ⭐ **แก้ด่านที่ `.gitlab-ci.yml` ที่เดียว แล้วรันไฟล์นี้** ⇒ `--ตรวจ` บอกว่าไฟล์ของ GitHub ค้างรุ่นไหม

## รันยังไง

  python tools/สร้างท่อGitHub.py          ⇒ เขียน `.github/workflows/gates.yml`
  python tools/สร้างท่อGitHub.py --ตรวจ   ⇒ ⛔ ไม่เขียน ⇒ ไฟล์บนดิสก์ไม่ตรงกับที่ควรเป็น = ออกด้วยรหัส 1

## แปลงยังไง ⇒ **ทุกข้อเลือกทางที่เข้มกว่าหรือเท่าเดิม ⛔ ไม่หลวมลง**

1. **งาน 1 งาน = งาน 1 งาน** ⇒ ⛔ ไม่ยุบรวม ⇒ ด่านไหนแดง เห็นชื่อด่านนั้นตรง ๆ
2. **ภาพ (image) เดิม** ⇒ วิ่งด้วย `docker run` ภาพเดียวกันทุกตัวอักษร ⇒ ⛔ ไม่ใช้ภาพของ GitHub แทน
3. **กฎ (rules)** ⇒ งานที่บนอัมกิตวิ่งในคำขอรวม ⇒ บน GitHub วิ่ง**ทุกรอบ** ⛔ ไม่ดู `changes:`
   ⇒ วิ่งมากกว่าเดิม ⛔ ไม่น้อยกว่า ⇒ งานที่ไม่วิ่งในคำขอรวมเลย (วางเว็บ · ปุ่มกด · ท่อลูก) ⇒ ยังไม่ย้าย
4. **ชิ้นงาน (artifacts)** ⇒ อัดเป็น tar ก้อนเดียว ⇒ ที่อยู่ไฟล์ตรงเดิมทุกตัว รวมโฟลเดอร์ที่ขึ้นต้นด้วยจุด
5. **ไฟล์ LFS** ⇒ งานแรกดึงครั้งเดียวแล้วเก็บแคช ⇒ งานอื่นหยิบจากแคช ⛔ ไม่ดึงจาก LFS ซ้ำทุกงาน
   ⇒ **ทำไม** ⇒ โควตาดาวน์โหลด LFS ของ GitHub มีเพดานต่อเดือน ⇒ ดึง 700 MB ทุกงานจะหมดในวันเดียว
   ⇒ ไบต์ที่งานเห็นตรงกับบนอัมกิต ⇒ `GIT_LFS_SKIP_SMUDGE=0` ได้ไบต์จริงของ `_data/` อย่างเดียว
     ⇒ `source/` กับ `เสียง/` ยังเป็นตัวชี้ จนงานสั่ง `git lfs pull` เอง ⇒ เหมือน `.lfsconfig`
6. **ตัวแปรของกิตแล็บ** ⇒ เติมค่าที่ตรงความหมายจาก GitHub ⇒ ดู `.github/actions/prep/action.yml`
7. **วิ่งในภาพเดิม** ⇒ `.github/run-job.sh`
"""
import argparse
import hashlib
import json
import os
import re
import sys
from pathlib import Path

import yaml

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ราก = Path(__file__).resolve().parent.parent
ไฟล์ท่อเดิม = ราก / ".gitlab-ci.yml"
ไฟล์ท่อใหม่ = ราก / ".github" / "workflows" / "gates.yml"

ภาพที่รู้จัก = {
    "python:3.13-alpine",
    "node:24-alpine",
    "mcr.microsoft.com/playwright:v1.62.1-noble",
}


class เส้นยาว(str):
    """ข้อความหลายบรรทัด ⇒ เขียนออกเป็น `|` ให้คนอ่านได้"""


def _เขียนเส้นยาว(dumper, data):
    return dumper.represent_scalar("tag:yaml.org,2002:str", data, style="|")


yaml.add_representer(เส้นยาว, _เขียนเส้นยาว, Dumper=yaml.SafeDumper)


def แบน(รายการ):
    """anchor อย่าง `*pull_audio` ซ้อนเป็นรายการในรายการ ⇒ กิตแล็บแบนให้เอง ⇒ ที่นี่ต้องแบนเอง"""
    for x in รายการ or []:
        if isinstance(x, list):
            yield from แบน(x)
        else:
            yield str(x)


def วิ่งในคำขอรวมไหม(rules):
    """จำลองกฎของกิตแล็บตอน `CI_PIPELINE_SOURCE=merge_request_event` ⇒ ตอบ True/False

    ⇒ ⛔ ไม่ดู `changes:` ⇒ ถือว่าเปลี่ยนเสมอ ⇒ วิ่งมากกว่าเดิม ⛔ ไม่น้อยกว่า
    ⇒ ในคำขอรวม กิตแล็บ ⛔ ไม่ตั้ง `CI_COMMIT_BRANCH` ⇒ เงื่อนไขที่ต้องมีมัน = ไม่จริง
    """
    if rules is None:
        return True
    for r in rules:
        เงื่อนไข = r.get("if")
        if เงื่อนไข is None:
            จริง = True
        elif 'merge_request_event"' in เงื่อนไข and "==" in เงื่อนไข:
            จริง = "!=" not in เงื่อนไข
        elif "$CI_COMMIT_BRANCH" in เงื่อนไข or "parent_pipeline" in เงื่อนไข:
            จริง = False
        else:
            raise SystemExit(f"⛔ อ่านกฎนี้ไม่ออก ⇒ เติมการแปลให้ตรงความหมายก่อน ⇒ {เงื่อนไข}")
        if จริง:
            return r.get("when", "on_success") not in ("never", "manual")
    return False


def อ่านงาน():
    d = yaml.safe_load(ไฟล์ท่อเดิม.read_text(encoding="utf-8"))
    ตัวแปรกลาง = d.get("variables", {}) or {}
    ลำดับขั้น = d["stages"]
    งาน = {}
    for ชื่อ, v in d.items():
        if not isinstance(v, dict) or ชื่อ.startswith(".") or ชื่อ in ("variables",):
            continue
        if "trigger" in v or "script" not in v:
            continue
        if not วิ่งในคำขอรวมไหม(v.get("rules")):
            continue
        งาน[ชื่อ] = v
    return งาน, ตัวแปรกลาง, ลำดับขั้น


def รหัสงาน(ชื่อ):
    """ชื่องานของ GitHub ต้องเป็น a-z 0-9 _ - ⇒ ชื่อไทยใช้ไม่ได้ ⇒ ใช้ลายของชื่อแทน (คงที่ทุกรอบ)"""
    return "j" + hashlib.sha1(ชื่อ.encode("utf-8")).hexdigest()[:10]


def นาที(ข้อความ):
    if not ข้อความ:
        return 60
    m = re.fullmatch(r"\s*(\d+)\s*(minutes?|m|hours?|h)\s*", str(ข้อความ))
    if not m:
        raise SystemExit(f"⛔ อ่าน timeout ไม่ออก ⇒ {ข้อความ}")
    n = int(m.group(1))
    return n * 60 if m.group(2).startswith("h") else n


def สคริปต์ของงาน(v):
    บรรทัด = list(แบน(v.get("before_script"))) + list(แบน(v.get("script")))
    # ⭐ เหมือนตัวรันของกิตแล็บ ⇒ คำสั่งไหนล้ม งานจบทันที
    หัว = ["set -e", "(set -o pipefail) 2>/dev/null && set -o pipefail"]
    return "\n".join(หัว + บรรทัด) + "\n"


def ขั้นของงาน(ชื่อ, v, ตัวแปรกลาง, งานทั้งหมด):
    ตัวแปร = dict(ตัวแปรกลาง)
    ตัวแปร.update(v.get("variables") or {})
    ลึก = int(ตัวแปร.pop("GIT_DEPTH", 1) or 1)
    ข้ามsmudge = str(ตัวแปร.get("GIT_LFS_SKIP_SMUDGE", "1")) != "0"
    ภาพ = v.get("image")
    if ภาพ not in ภาพที่รู้จัก:
        raise SystemExit(f"⛔ งาน {ชื่อ} ใช้ภาพ {ภาพ} ที่ตัวแปลงยังไม่รู้จัก ⇒ เติมใน ภาพที่รู้จัก ก่อน")

    ต้องการ = v.get("needs")
    if ต้องการ is None:
        raise SystemExit(f"⛔ งาน {ชื่อ} ไม่มี needs ⇒ ตัวแปลงยังไม่รองรับการหยิบชิ้นงานทั้ง stage")
    ต้องการ = [n if isinstance(n, str) else n["job"] for n in ต้องการ]
    for n in ต้องการ:
        if n not in งานทั้งหมด:
            raise SystemExit(f"⛔ งาน {ชื่อ} รอ {n} ซึ่ง ⛔ ไม่ได้ย้ายมา ⇒ ด่านนี้จะวิ่งไม่ได้")

    ขั้น = [
        {
            "uses": "actions/checkout@v4",
            "with": {"lfs": False, "fetch-depth": ลึก},
            "env": {"GIT_LFS_SKIP_SMUDGE": "1"},
        },
        {
            "name": "เตรียมงาน",
            "uses": "./.github/actions/prep",
            "with": {"lfs-key": "${{ needs.lfs.outputs.key }}", "data": "0" if ข้ามsmudge else "1"},
        },
    ]
    if v.get("cache"):
        ขั้น.append(
            {
                "name": "แคช npm",
                "uses": "actions/cache@v4",
                "with": {"path": ".npm", "key": "npm-${{ hashFiles('package-lock.json') }}"},
            }
        )
    มีชิ้นงาน = [n for n in ต้องการ if งานทั้งหมด[n].get("artifacts")]
    for n in มีชิ้นงาน:
        ขั้น.append(
            {
                "name": f"หยิบชิ้นงานของ {n}",
                "uses": "actions/download-artifact@v4",
                "with": {"name": f"a-{รหัสงาน(n)}", "path": f"/tmp/ชิ้นงาน/{รหัสงาน(n)}"},
            }
        )
        ขั้น.append({"name": f"แกะชิ้นงานของ {n} ลงที่เดิม", "run": f'tar -xf "/tmp/ชิ้นงาน/{รหัสงาน(n)}/ชิ้นงาน.tar"'})

    env_ส่ง = {k: str(x) for k, x in ตัวแปร.items() if not (k.startswith("FF_") or k.endswith("_COMPRESSION_LEVEL"))}
    ขั้น.append(
        {
            "name": ชื่อ,
            "env": {"JOB_SCRIPT": เส้นยาว(สคริปต์ของงาน(v)), "JOB_VARS": " ".join(env_ส่ง), **env_ส่ง},
            "run": f"bash .github/run-job.sh {ภาพ}",
        }
    )
    if v.get("artifacts"):
        a = v["artifacts"]
        เส้นทาง = " ".join(f"'{p}'" for p in a["paths"])
        ขั้น.append(
            {
                "name": "อัดชิ้นงาน",
                "if": "always()" if a.get("when") == "always" else "success()",
                "run": เส้นยาว(
                    'mkdir -p "$RUNNER_TEMP/ชิ้นงาน"\n'
                    f'sudo tar -cf "$RUNNER_TEMP/ชิ้นงาน/ชิ้นงาน.tar" --ignore-failed-read {เส้นทาง} 2>/dev/null || '
                    f'sudo tar -cf "$RUNNER_TEMP/ชิ้นงาน/ชิ้นงาน.tar" -T /dev/null\n'
                ),
            }
        )
        ขั้น.append(
            {
                "name": "ส่งชิ้นงาน",
                "if": "always()" if a.get("when") == "always" else "success()",
                "uses": "actions/upload-artifact@v4",
                "with": {
                    "name": f"a-{รหัสงาน(ชื่อ)}",
                    "path": "${{ runner.temp }}/ชิ้นงาน/ชิ้นงาน.tar",
                    "retention-days": 7 if "week" in str(a.get("expire_in", "")) else 1,
                },
            }
        )
    return {
        "name": ชื่อ,
        "needs": ["lfs"] + [รหัสงาน(n) for n in ต้องการ],
        "runs-on": "ubuntu-latest",
        "timeout-minutes": นาที(v.get("timeout")),
        "steps": ขั้น,
    }


def งานเตรียมLFS():
    return {
        "name": "เตรียมไฟล์ LFS (ดึงครั้งเดียว แล้วเก็บแคช)",
        "runs-on": "ubuntu-latest",
        "outputs": {"key": "${{ steps.key.outputs.key }}"},
        "steps": [
            {"uses": "actions/checkout@v4", "with": {"lfs": False}, "env": {"GIT_LFS_SKIP_SMUDGE": "1"}},
            {
                "id": "key",
                "name": "ชื่อแคช = ลายของรายการไฟล์ LFS ทั้งหมด",
                "run": 'echo "key=lfs-$(git lfs ls-files -l | sha256sum | cut -c1-32)" >> "$GITHUB_OUTPUT"',
            },
            # ⭐ หยิบแคชเก่าที่ใกล้ที่สุดมาก่อน ⇒ แล้วดึงเฉพาะไฟล์ที่ยังไม่มี
            #   ⇒ เสียงรายคืนเพิ่มไฟล์ทุกคืน ⇒ ⛔ ไม่ทำแบบนี้ = ดึงใหม่ 700 MB ทุกคืน ⇒ โควตา 10 GiB/เดือนหมดในสองสัปดาห์
            {
                "id": "cache",
                "uses": "actions/cache/restore@v4",
                "with": {
                    "path": ".git/lfs/objects",
                    "key": "${{ steps.key.outputs.key }}",
                    "restore-keys": "lfs-",
                },
            },
            {
                "if": "steps.cache.outputs.cache-hit != 'true'",
                "name": "ดึงเฉพาะไฟล์ LFS ที่แคชยังไม่มี",
                "run": "git -c lfs.fetchexclude= lfs fetch origin HEAD",
            },
            {
                "if": "steps.cache.outputs.cache-hit != 'true'",
                "uses": "actions/cache/save@v4",
                "with": {"path": ".git/lfs/objects", "key": "${{ steps.key.outputs.key }}"},
            },
        ],
    }


def สร้าง():
    งาน, ตัวแปรกลาง, _ = อ่านงาน()
    jobs = {"lfs": งานเตรียมLFS()}
    for ชื่อ, v in งาน.items():
        jobs[รหัสงาน(ชื่อ)] = ขั้นของงาน(ชื่อ, v, ตัวแปรกลาง, งาน)
    ท่อ = {
        "name": "ตรวจ",
        "on": {"pull_request": None, "push": {"branches": ["main", "v3"]}, "workflow_dispatch": None},
        "concurrency": {"group": "ตรวจ-${{ github.ref }}", "cancel-in-progress": True},
        "permissions": {"contents": "read"},
        "defaults": {"run": {"shell": "bash"}},
        "jobs": jobs,
    }
    หัว = (
        "# ⛔⛔ ไฟล์นี้สร้างด้วยเครื่อง ⇒ ห้ามแก้ด้วยมือ\n"
        "#   ⇒ แก้ที่ .gitlab-ci.yml แล้วรัน `python tools/สร้างท่อGitHub.py` ⇒ เหตุผลอยู่หัวไฟล์นั้น\n"
        f"#   ⇒ ด่าน {len(งาน)} งาน จาก .gitlab-ci.yml\n"
    )
    เนื้อ = yaml.dump(ท่อ, Dumper=yaml.SafeDumper, allow_unicode=True, sort_keys=False, width=1000)
    # PyYAML เขียน `on:` เป็น `'on':` ⇒ GitHub อ่านได้ทั้งคู่ ⇒ แต่ `null` ของ pull_request ต้องว่าง
    เนื้อ = เนื้อ.replace(": null\n", ":\n")
    return หัว + เนื้อ, len(งาน)


def main():
    p = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    p.add_argument("--ตรวจ", action="store_true", help="⛔ ไม่เขียน ⇒ ไฟล์ค้างรุ่น = ออกด้วยรหัส 1")
    a = p.parse_args()
    เนื้อ, จำนวน = สร้าง()
    if getattr(a, "ตรวจ"):
        เดิม = ไฟล์ท่อใหม่.read_text(encoding="utf-8") if ไฟล์ท่อใหม่.exists() else ""
        if เดิม != เนื้อ:
            print(f"⛔ {ไฟล์ท่อใหม่.relative_to(ราก)} ไม่ตรงกับ .gitlab-ci.yml ⇒ รัน python tools/สร้างท่อGitHub.py แล้วคอมมิต")
            return 1
        print(f"✅ ท่อของ GitHub ตรงกับ .gitlab-ci.yml ({จำนวน} งาน)")
        return 0
    ไฟล์ท่อใหม่.parent.mkdir(parents=True, exist_ok=True)
    ไฟล์ท่อใหม่.write_text(เนื้อ, encoding="utf-8", newline="\n")
    print(f"✅ เขียน {ไฟล์ท่อใหม่.relative_to(ราก)} ⇒ {จำนวน} งาน")
    return 0


if __name__ == "__main__":
    sys.exit(main())
