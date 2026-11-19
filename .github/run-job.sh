#!/bin/bash
# วิ่งสคริปต์ของงานหนึ่งงานในภาพ (image) เดียวกับบนอัมกิตทุกตัวอักษร ⇒ เรียกจาก .github/workflows/gates.yml
#   ⇒ สคริปต์มาทางตัวแปร JOB_SCRIPT ⇒ ตัวแปรที่ส่งเข้าภาพมีแค่ของกิตแล็บ กับที่งานตั้งเอง (JOB_VARS)
#   ⇒ ⛔ ไม่ส่งตัวแปรอื่นของเครื่อง GitHub เข้าไป ⇒ งานเห็นสภาพเหมือนบนตัวรันของอัมกิต
set -euo pipefail
IMAGE="$1"
printf '%s' "$JOB_SCRIPT" > "$RUNNER_TEMP/job.sh"
PAT='^(CI|CI_[A-Z0-9_]+|GIT_LFS_SKIP_SMUDGE'
for k in ${JOB_VARS:-}; do PAT="$PAT|$k"; done
PAT="$PAT)="
env | grep -E "$PAT" > "$RUNNER_TEMP/job.env" || true
exec docker run --rm --network host \
  -v "$GITHUB_WORKSPACE:/builds/w" -w /builds/w \
  -v "$RUNNER_TEMP/job.sh:/tmp/job.sh:ro" \
  --env-file "$RUNNER_TEMP/job.env" \
  -e GIT_CONFIG_COUNT=1 -e GIT_CONFIG_KEY_0=safe.directory -e GIT_CONFIG_VALUE_0='*' \
  "$IMAGE" sh /tmp/job.sh
