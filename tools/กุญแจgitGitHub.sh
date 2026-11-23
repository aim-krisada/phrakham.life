#!/bin/sh
# ตัวตอบชื่อและกุญแจให้ git ตอนส่งเสียงขึ้นที่เก็บบน GitHub (ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/171)
#
# ⭐ git เรียกไฟล์นี้ผ่าน GIT_ASKPASS ⇒ กุญแจมาจากตัวแปร PHRAKHAM_GITHUB_TOKEN ที่ `tools/ที่เก็บเสียงบนGitHub.py`
#   ใส่ให้เฉพาะคำสั่ง git ที่คุยกับ GitHub ครั้งนั้น ⇒ ⛔ กุญแจไม่อยู่ในไฟล์ ⛔ ไม่อยู่ในบรรทัดคำสั่ง ⛔ ไม่ถูกพิมพ์
# ⇒ กุญแจแบบ fine-grained ของ GitHub ใช้ชื่อผู้ใช้อะไรก็ได้ ⇒ ใส่ x-access-token ตามที่ GitHub เขียนไว้
case "$1" in
  *Username*) echo x-access-token ;;
  *) printf '%s\n' "$PHRAKHAM_GITHUB_TOKEN" ;;
esac
