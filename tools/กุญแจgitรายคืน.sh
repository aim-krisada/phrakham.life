#!/bin/sh
# ตัวตอบชื่อและกุญแจให้ git ตอนส่งของรายคืน (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/171)
#
# ⭐ git เรียกไฟล์นี้ผ่าน GIT_ASKPASS ⇒ กุญแจมาจากตัวแปร PHRAKHAM_NIGHTLY_TOKEN ที่ `tools/ทำเสียงTCVรายคืน.py`
#   ใส่ให้เฉพาะคำสั่ง git push ครั้งนั้น ⇒ ⛔ กุญแจไม่อยู่ในไฟล์ ⛔ ไม่อยู่ในบรรทัดคำสั่ง ⛔ ไม่ถูกพิมพ์
# ⇒ ท่าเดียวกับที่ส่งงานของ AI ทุกวัน ⇒ ส่งในชื่อ aim-agent
case "$1" in
  *Username*) echo aim-agent ;;
  *) printf '%s\n' "$PHRAKHAM_NIGHTLY_TOKEN" ;;
esac
