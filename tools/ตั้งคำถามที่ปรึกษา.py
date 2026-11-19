#!/usr/bin/env python3
"""ปั้นคำถามทีละคำ จากผลสุ่มของ tools/สุ่มคำที่หัวคำไม่ตรง.py

รัน  py -3.14 tools/ตั้งคำถามที่ปรึกษา.py \
         --จากไฟล์ docs/ข้อมูล/ผลตรวจความหมาย/สุ่ม10คำ-ที่สุ่มได้.json \
         --ลงโฟลเดอร์ docs/ข้อมูล/ผลตรวจความหมาย/สุ่ม10คำ-คำถาม

ใบงาน https://aimgit.aimagin.com/v3/phrakham/-/issues/75

ทำไมต้องมีไฟล์นี้

ห้ามพิมพ์คำหรือตัวเลขในคำถามด้วยมือ เพราะพิมพ์เองแล้วสระฮีบรูหล่นหายง่ายมาก
เช่นพิมพ์ מִקְנֶה แล้วสระหล่นไปหนึ่งตัว ที่ปรึกษาจะตอบเรื่องคำอื่นโดยที่เราไม่รู้ตัว
ไฟล์นี้จึงอ่านผลสุ่มมาประกอบเป็นประโยคคำถามให้เอง

คำถามเขียนเป็นภาษาอังกฤษ

พจนานุกรมกับตำราที่ที่ปรึกษาอ่าน เป็นภาษาอังกฤษทั้งหมด
ถามเป็นไทยแล้วเขาต้องแปลกลับ เพิ่มโอกาสเพี้ยนโดยเปล่าประโยชน์
จึงถามอังกฤษ แล้วค่อยเขียนสรุปเป็นไทยในรายงาน

ถามทีละคำ

หนึ่งไฟล์เท่ากับหนึ่งคำ ถ้ารวมสิบคำเป็นคำถามเดียว ที่ปรึกษาจะตอบรวบมาก้อนเดียว
แล้วเราแยกไม่ออกว่าเขาตอบคำไหน
"""

import argparse
import json
from pathlib import Path

ที่เก็บ = Path(__file__).resolve().parent.parent

แบบคำถาม = """You are checking a Bible-study data set, not writing devotional material.

Reference: {ที่อยู่}
Language: {ภาษา}
Whole word as printed in the text: {คำเต็มในข้อ}
Our source data cuts that word into {จำนวนชิ้น} piece(s), in this order:
{รายชิ้น}
We are asking about piece number {ชิ้นที่ถาม}: {คำในข้อ}
Interlinear gloss of that piece in our source data: {คำแปลของต้นฉบับ}
Lemma our source data gives for that piece: {รูปพจนานุกรมของต้นฉบับ}

Our data attaches to that piece one dictionary entry:
  dictionary headword: {หัวคำในพจนานุกรม}
  glosses: {คำแปลสั้น}
  definition: {นิยาม}

Question: is that attached meaning really the meaning of that piece of the word,
and of the whole word, at this reference?

Answer in this shape:
1. First line: YES or NO or PARTLY.
2. Then at most four sentences saying what the piece actually means, what the whole
   word means here, and whether the attached dictionary entry is the right entry.
Do not quote more than the single word above from the Bible text."""

# แบบที่สอง ไม่บอกว่าเราแปะอะไรไว้ และไม่มีเนื้อพจนานุกรม UBS สักตัว
#    ใช้กับสมุด NotebookLM ที่ห้ามเอาของ UBS กับ Louw-Nida เข้าไป
# ผลพลอยได้คือกลายเป็นการถามแบบปิดตา เขาไม่รู้คำตอบที่เราอยากได้ จึงคล้อยตามเราไม่ได้
แบบคำถามปิดตา = """You are checking a Bible-study data set, not writing devotional material.

Reference: {ที่อยู่}
Language: {ภาษา}
Whole word as printed in the text: {คำเต็มในข้อ}
Our source data cuts that word into {จำนวนชิ้น} piece(s), in this order:
{รายชิ้น}
We are asking about piece number {ชิ้นที่ถาม}: {คำในข้อ}

Questions:
a. What does that piece mean here?
b. What does the whole word mean here?
c. If a reader taps that piece and we open one lexicon entry for it, which single
   headword should that entry be under? Write the headword in its own script.

Answer in this shape:
1. First line: the headword only, in Hebrew or Greek script.
2. Then at most four sentences answering a and b and saying why that headword.
Do not quote more than the single word above from the Bible text."""


def main():
    ก = argparse.ArgumentParser()
    ก.add_argument("--จากไฟล์", dest="src",
                   default="docs/ข้อมูล/ผลตรวจความหมาย/สุ่ม10คำ-ที่สุ่มได้.json")
    ก.add_argument("--ลงโฟลเดอร์", dest="out",
                   default="docs/ข้อมูล/ผลตรวจความหมาย/สุ่ม10คำ-คำถาม")
    ก.add_argument("--ปิดตา", dest="blind", action="store_true",
                   help="ปั้นแบบที่ไม่บอกว่าเราแปะอะไร และไม่มีเนื้อพจนานุกรม UBS")
    args = ก.parse_args()

    ของ = json.loads((ที่เก็บ / args.src).read_text(encoding="utf-8"))
    ปลายทาง = ที่เก็บ / args.out
    ปลายทาง.mkdir(parents=True, exist_ok=True)

    for ลำดับ, x in enumerate(ของ["ที่สุ่มได้"], 1):
        # ห้ามส่งเป็นชื่อช่อง อย่าง format(ที่อยู่=...) เพราะไพทอนแปลงชื่อช่องเป็นรูป NFKC
        # แต่ชื่อในวงเล็บปีกกาไม่ถูกแปลง สองฝั่งจึงชนกันไม่ติด แล้วขึ้น KeyError
        #    กับดักตัวเดียวกับที่ `tools/ทานความหมาย.py` จดไว้เรื่องชื่อช่องบรรทัดคำสั่ง
        ช่อง = dict(x)
        ช่อง["ที่อยู่"] = x["ที่อยู่"].split("#")[0]
        ช่อง["ภาษา"] = "Biblical Hebrew" if x["ฝั่ง"] == "ฮีบรู" else "Koine Greek"
        ช่อง["คำแปลของต้นฉบับ"] = x["คำแปลของต้นฉบับ"] or "(none)"
        ช่อง["คำแปลสั้น"] = "; ".join(x["คำแปลสั้น"]) or "(none)"
        ช่อง["นิยาม"] = x["นิยาม"] or "(none)"
        ช่อง["จำนวนชิ้น"] = len(x["ชิ้นของคำเต็ม"])
        ช่อง["รายชิ้น"] = "\n".join(
            f"  piece {s['ลำดับ']}: {s['ตัว']}   gloss: {s['คำแปล'] or '(none)'}"
            for s in x["ชิ้นของคำเต็ม"])
        เนื้อ = (แบบคำถามปิดตา if args.blind else แบบคำถาม).format_map(ช่อง)
        ชื่อ = f"{ลำดับ:02d}-{x['ฝั่ง']}-{x['ที่อยู่'].replace(' ', '').replace('#', '-')}.txt"
        (ปลายทาง / ชื่อ).write_text(เนื้อ, encoding="utf-8")
        print(f"เขียน {ปลายทาง / ชื่อ}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
