#!/bin/sh
# ส่ง **เว็บที่สร้างเสร็จแล้ว** ขึ้น GitHub (ใบงาน v3/phrakham#21)
#
# ⛔ **ไฟล์นี้เผยแพร่เว็บจริง** — เรียกจาก job `ปล่อยเว็บ` ซึ่งเป็น `when: manual` เท่านั้น
#    ⇒ ไม่มีใครกด = ไม่มีอะไรขึ้น · นี่คือด่านของกฎ "ห้ามเผยแพร่เว็บเอง"
#
# ⛔ **ส่งได้แต่โฟลเดอร์ `ที่จะปล่อย`** ซึ่ง `tools/สร้างเว็บที่จะปล่อย.sh` สร้างและตรวจมาแล้ว
#    ⇒ ซอร์สของ v3 ⛔ ไม่มีทางหลุดขึ้น GitHub เพราะเราสร้างที่เก็บใหม่ในโฟลเดอร์นั้นล้วน ๆ
#
# ⚠️ **กุญแจห้ามโผล่ในบันทึกงาน** — ส่งผ่านไฟล์ให้ git อ่านเอง
#    ⛔ ห้ามใส่ในที่อยู่แบบ `https://ผู้ใช้:กุญแจ@...` เพราะ git พิมพ์ที่อยู่ออกมาตอนรายงานผล
#
# ⏸ **ที่เก็บปลายทางกับชื่อสาขายังไม่เคาะ** ⇒ อ่านจากตัวแปรของโปรเจกต์บนอัมกิต ⛔ ไม่ฝังในโค้ด
#    (Settings › CI/CD › Variables) ⇒ พี่เอมเคาะแล้วเติมค่าอย่างเดียว ⛔ ไม่ต้องแก้ไฟล์นี้
#
# ⚠️ **ไฟล์นี้ตั้งค่า git ระดับเครื่อง (`git config --global`)** ⇒ ตั้งใจให้รันในตู้ของ CI ที่ทิ้งทุกรอบ
#    ⛔ รันบนเครื่องตัวเองแล้วผ่านด่านข้างล่างไปได้เมื่อไร มันจะทับชื่อผู้ใช้กับตัวเก็บกุญแจของเครื่อง
set -eu

OUT=ที่จะปล่อย

test -d "$OUT" || { echo "⛔ ไม่มีโฟลเดอร์ $OUT ⇒ ต้องรัน tools/สร้างเว็บที่จะปล่อย.sh ก่อน"; exit 1; }

test -n "${PUBLISH_REPO:-}" \
  || { echo "⛔ ไม่มีค่า PUBLISH_REPO ⇒ ตั้งเป็น <เจ้าของ>/<ชื่อที่เก็บ> ของ GitHub"; exit 1; }
test -n "${PUBLISH_BRANCH:-}" \
  || { echo "⛔ ไม่มีค่า PUBLISH_BRANCH ⇒ ตั้งชื่อสาขาปลายทางบน GitHub"; exit 1; }
test -n "${GITHUB_TOKEN_PHRAKHAM:-}" \
  || { echo "⛔ ไม่มีกุญแจ GITHUB_TOKEN_PHRAKHAM ⇒ ตั้งที่ Settings › CI/CD › Variables (Masked + Protected)"; exit 1; }

# ⭐⭐ **ห้ามแตะสาขาหลักของ GitHub** — ที่นั่นเป็นซอร์สของเว็บที่ผู้อ่านใช้อยู่ทุกวัน
#   ⇒ ชื่อสาขามาจากตัวแปรข้างนอก ⇒ พิมพ์ผิดครั้งเดียวก็ทับของจริงได้ ⇒ **เครื่องต้องกันเอง**
case "$PUBLISH_BRANCH" in
  main|master) echo "⛔ PUBLISH_BRANCH=$PUBLISH_BRANCH ⇒ สาขาหลักของ GitHub แตะไม่ได้ (กฎ 'v3 ซอร์สอยู่อัมกิตที่เดียว')"; exit 1 ;;
esac

# ⭐ ลบกุญแจ **ไม่ว่าจะจบทางไหน** ⛔ ไม่ใช่วางบรรทัดลบไว้ท้ายสุด
#   ⇒ push ล้มเมื่อไร `set -e` ตัดจบก่อน ⇒ ไฟล์กุญแจแบบอ่านออกค้างอยู่ในเครื่อง
#   (บทเรียนของ v3/pleng 8 ส.ค. 2569 ⛔ ไม่ทดลองซ้ำ)
trap 'rm -f "$HOME/.git-credentials"' EXIT INT TERM

git config --global user.email "v3-claude-code@aimagin.com"
git config --global user.name "v3-claude-code"
git config --global credential.helper store
printf 'https://x-access-token:%s@github.com\n' "$GITHUB_TOKEN_PHRAKHAM" > "$HOME/.git-credentials"
chmod 600 "$HOME/.git-credentials"

# ที่เก็บใหม่ทุกครั้ง ⛔ ไม่สะสมประวัติ — สาขานี้เป็น**ที่วางของ** ไม่ใช่ที่เก็บงาน
# ⇒ `--force` จึงถูกต้อง และทำให้ที่เก็บไม่โตไปเรื่อย ๆ
cd "$OUT"
rm -rf .git
git init -q
git add -A
git commit -qm "เว็บพระคำจาก ${CI_COMMIT_SHORT_SHA:-local} (อัมกิต pipeline ${CI_PIPELINE_ID:-?})"
# ⛔ **ชื่อสาขาปลายทางเขียนเต็ม** `refs/heads/<ชื่อ>` ⇒ git ⛔ ไม่มีทางเดาไปลงสาขาอื่น
git push --force "https://github.com/$PUBLISH_REPO.git" "HEAD:refs/heads/$PUBLISH_BRANCH"
cd ..
echo "✅ ส่งขึ้นสาขา $PUBLISH_BRANCH ของ $PUBLISH_REPO แล้ว"

# ---------------------------------------------------------------------------
# ⭐ ปลุกให้ GitHub สร้างเว็บใหม่ — **การดันสาขาอย่างเดียวอาจไม่พอ**
#
# GitHub อ่านไฟล์ท่อปล่อยเว็บ **จาก ref ที่ถูกดัน** ⛔ ไม่ใช่จากสาขาหลัก
# ส่วนสาขาที่เราดันมีแต่ไฟล์เว็บล้วน ⇒ ไม่มีไฟล์ท่ออยู่บน ref นั้น ⇒ **ไม่มี run เกิดขึ้นเลย**
# ⇒ และไม่มีอะไรแดงให้เห็น เพราะไม่มี run ตั้งแต่แรก ⇒ **ผิดแบบดูน่าเชื่อ**
#   (ของจริงที่พังมาแล้วอยู่ที่ v3/pleng ⛔ ไม่ทดลองซ้ำ)
#
# ⇒ ยิง `repository_dispatch` ซึ่งสั่งให้ GitHub ใช้ไฟล์ท่อ **บนสาขาหลัก** เสมอ
#   ⛔ ไม่ใช้ `workflow_dispatch` เพราะอันนั้นต้องเพิ่มสิทธิ์ Actions ให้กุญแจ
#
# ⏸ **ชื่อเหตุการณ์ยังไม่เคาะ** เพราะยังไม่รู้ว่าที่เก็บปลายทางมีไฟล์ท่อชื่ออะไร
#   ⇒ ไม่ตั้ง `PUBLISH_DISPATCH_EVENT` = **ข้ามการปลุก** แต่ต้อง**พูดออกมาดัง ๆ**
#   ⛔ ห้ามเงียบ — คนกดจะนึกว่าเว็บเปลี่ยนแล้วทั้งที่ยังไม่เปลี่ยน
# ---------------------------------------------------------------------------
if [ -z "${PUBLISH_DISPATCH_EVENT:-}" ]; then
  echo "⚠️ ไม่ได้ตั้ง PUBLISH_DISPATCH_EVENT ⇒ **ข้ามการปลุก GitHub**"
  echo "   ⇒ ของขึ้นสาขา $PUBLISH_BRANCH แล้ว แต่ถ้าที่เก็บนั้นใช้ GitHub Actions สร้างเว็บ"
  echo "     เว็บจะยัง ⛔ ไม่เปลี่ยน จนกว่าจะมีคนไปสั่งเอง"
  exit 0
fi

code=$(curl -sS -o /tmp/dispatch.out -w '%{http_code}' -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN_PHRAKHAM" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/$PUBLISH_REPO/dispatches" \
  -d "{\"event_type\":\"$PUBLISH_DISPATCH_EVENT\"}")

# ⛔ **ต้องดัง** ถ้าปลุกไม่สำเร็จ — ไม่งั้นกลับไปเป็นความพังเงียบแบบเดิมเป๊ะ ๆ
if [ "$code" != "204" ]; then
  echo "⛔ ปลุก GitHub ไม่สำเร็จ (ตอบ $code) ⇒ ของขึ้นสาขา $PUBLISH_BRANCH แล้วแต่เว็บจะยังไม่เปลี่ยน"
  echo "   ⇒ ตอบ 403 แปลว่ากุญแจสิทธิ์ไม่พอ · 404 แปลว่ากุญแจมองไม่เห็นที่เก็บนี้"
  cat /tmp/dispatch.out
  exit 1
fi

echo "✅ ปลุก GitHub แล้ว (เหตุการณ์ $PUBLISH_DISPATCH_EVENT)"
echo "⇒ ดูว่ามันวิ่งจริงไหมที่ https://github.com/$PUBLISH_REPO/actions"
