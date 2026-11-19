"""วัดขนาดเว็บที่สร้างเสร็จ — จำนวนไฟล์ · ไบต์รวม · แยกตามชนิดของก้อน

**ทำไมต้องมี** ⇒ ใบงาน v3/phrakham#73 บอกว่า *"วัดไบต์จริงก่อนกับหลัง ⛔ ไม่ประมาณ"*
⇒ วัดด้วยมือทุกครั้งแล้วนับคนละท่า ⇒ เลขก่อนกับหลังเทียบกันไม่ได้

    py -3.14 tools/วัดขนาดเว็บ.py [โฟลเดอร์]

ค่าปริยายคือ `.output/public`
"""

import os
import sys
from collections import Counter

ราก = sys.argv[1] if len(sys.argv) > 1 else '.output/public'

รวม = 0
จำนวน = 0
ตามก้อน: Counter[str] = Counter()
นับก้อน: Counter[str] = Counter()

for โฟลเดอร์, _, ไฟล์ทั้งหลาย in os.walk(ราก):
    for ชื่อ in ไฟล์ทั้งหลาย:
        ทาง = os.path.join(โฟลเดอร์, ชื่อ)
        ขนาด = os.path.getsize(ทาง)
        รวม += ขนาด
        จำนวน += 1
        ที่อยู่ = os.path.relpath(ทาง, ราก).replace(os.sep, '/')
        if ชื่อ == '_payload.json':
            ก้อน = 'สำเนาที่ Nuxt ทำเอง (_payload.json)'
        elif ที่อยู่.startswith('api/'):
            ก้อน = 'ไฟล์ข้อมูล (api/)'
        elif ที่อยู่.startswith('_nuxt/'):
            ก้อน = 'โค้ดกับสไตล์ (_nuxt/)'
        elif ชื่อ.endswith('.html'):
            ก้อน = 'หน้าที่วาดเสร็จ (.html)'
        else:
            ก้อน = 'อื่น ๆ'
        ตามก้อน[ก้อน] += ขนาด
        นับก้อน[ก้อน] += 1

print(f'โฟลเดอร์ {ราก}')
print(f'ไฟล์ทั้งหมด {จำนวน:,} ไฟล์ · {รวม:,} ไบต์ = {รวม / 1048576:.1f} MB')
for ก้อน, ขนาด in ตามก้อน.most_common():
    print(f'  {ก้อน:38s} {นับก้อน[ก้อน]:>6,} ไฟล์ {ขนาด / 1048576:>8.1f} MB')
