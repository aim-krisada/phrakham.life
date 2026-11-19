"""ทำดัชนีคำที่มีความหมายทุกคำในพระคัมภีร์ ⇒ ไฟล์ตารางเดียวที่ใช้สุ่มข้อสอบได้

**ทำไมต้องมีไฟล์นี้** ⇒ ของที่ต้องดูอยู่กระจายใน 3 ที่ (ชั้นอ่าน · ชั้นวิเคราะห์ · ชั้นตรวจ)
รวม 1,189 บท ⇒ เปิดใหม่ทุกครั้งที่สุ่มจะเสียเวลาเป็นนาที ⇒ กวาดครั้งเดียวเก็บลงตาราง

⚠️ **ต้องพ่นชั้นตรวจก่อน** ⇒ `py -3.14 tools/พ่นบท.py --ออกที่ C:/gh/phrakham3 --ทั้งหมด`

รัน  py -3.14 tools/ทำดัชนีคำมีความหมาย.py --ข้อมูล C:/gh/phrakham3/public/data
"""
import json, sys, os, io, csv, collections

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ตรวจ_ราก = 'docs/ข้อมูล/ชั้นตรวจ'
ออก = 'docs/ข้อมูล/ผลตรวจความหมาย/ดัชนีคำมีความหมาย.tsv'
หัว = ['ฝั่ง', 'เล่ม', 'บท', 'ข้อ', 'ลำดับคำ', 'คำเดิม', 'รูปตั้งต้น', 'ชนิดคำ',
       'แปลอังกฤษ', 'รหัสความหมาย', 'คำในพจนานุกรม', 'ชั้นความหมายของคำนี้', 'ชี้ถูกคำเพราะ']


def โหลดคลัง(ราก):
    """คืน (รหัสความหมาย → ก้อน) และ (คำในพจนานุกรม → [รหัส...] เรียงแล้ว) แยกตามฝั่ง"""
    คลัง = {}; ชั้นของคำ = {}
    for ฝั่ง, ชื่อไฟล์ in (('ฮีบรู', 'ubs-heb.json'), ('กรีก', 'ubs-grk.json')):
        d = json.load(open(os.path.join(ราก, 'sense', ชื่อไฟล์), encoding='utf-8'))['ความหมาย']
        คลัง[ฝั่ง] = d
        g = collections.defaultdict(list)
        for รหัส in sorted(d):
            g[d[รหัส]['คำในพจนานุกรม']].append(รหัส)
        ชั้นของคำ[ฝั่ง] = dict(g)
    return คลัง, ชั้นของคำ


def main(args):
    if '--ข้อมูล' not in args:
        print(__doc__); return 1
    ราก = args[args.index('--ข้อมูล') + 1].rstrip('/')
    คลัง, ชั้นของคำ = โหลดคลัง(ราก)
    for ฝั่ง in คลัง:
        print('%-6s ความหมายในคลัง %s · คำในพจนานุกรม %s'
              % (ฝั่ง, format(len(คลัง[ฝั่ง]), ','), format(len(ชั้นของคำ[ฝั่ง]), ',')))

    สารบัญ = json.load(open(os.path.join(ราก, 'index.json'), encoding='utf-8'))['เล่ม']
    os.makedirs(os.path.dirname(ออก), exist_ok=True)
    นับ = collections.Counter()
    with open(ออก, 'w', encoding='utf-8', newline='') as f:
        w = csv.writer(f, delimiter='\t', lineterminator='\n')
        w.writerow(หัว)
        for เล่ม, ข้อมูลเล่ม in สารบัญ.items():
            ฝั่ง = ข้อมูลเล่ม['ภาษา']
            for บท in sorted(ข้อมูลเล่ม['บท'], key=int):
                ชื่อ = '%s/%03d.json' % (เล่ม, int(บท))
                อ = json.load(open(os.path.join(ราก, 'read', ชื่อ), encoding='utf-8'))['ข้อ']
                ว = json.load(open(os.path.join(ราก, 'word', ชื่อ), encoding='utf-8'))
                ต = json.load(open(os.path.join(ตรวจ_ราก, ชื่อ), encoding='utf-8'))
                iรูป = ว['หัวตาราง'].index('รูปตั้งต้น')
                iชนิด = ว['หัวตาราง'].index('ชนิดคำ')
                iแปล = ว['หัวตาราง'].index('แปลอังกฤษ')
                iรหัส = ว['หัวตาราง'].index('รหัสความหมาย')
                iเพราะ = ต['หัวตาราง'].index('ชี้ถูกคำเพราะ')
                for ข in ว['ข้อ']:
                    for i, แถว in enumerate(ว['ข้อ'][ข]):
                        รหัส = แถว[iรหัส]
                        if not รหัส: continue
                        นับ[ฝั่ง] += 1
                        lem = คลัง[ฝั่ง][รหัส]['คำในพจนานุกรม']
                        w.writerow([ฝั่ง, เล่ม, บท, ข, i, อ[ข][i][0],
                                    แถว[iรูป], แถว[iชนิด], แถว[iแปล], รหัส, lem,
                                    len(ชั้นของคำ[ฝั่ง].get(lem, [])), ต['ข้อ'][ข][i][iเพราะ]])
    print('\nเขียน %s ⇒ %s แถว (ฮีบรู %s · กรีก %s)'
          % (ออก, format(sum(นับ.values()), ','), format(นับ['ฮีบรู'], ','), format(นับ['กรีก'], ',')))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
