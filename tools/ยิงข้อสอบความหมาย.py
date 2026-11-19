"""ยิงข้อสอบไปให้ตัวตรวจทีละชุด แล้วเก็บคำตอบดิบลงไฟล์

⭐ **เก็บลงไฟล์ทุกชุด ⛔ ไม่อมไว้ในหัว** ⇒ ล้มกลางทางแล้วสั่งซ้ำได้ ชุดที่มีไฟล์แล้วจะข้าม
⚠️ **สมุดของ NotebookLM มีบทสนทนาเดียว** ⇒ ชุดหลังเห็นชุดก่อน
   ⇒ จึงคละชนิดข้อสอบในทุกชุดตอนสร้าง (ดู `ทำข้อสอบความหมาย.py`) ⛔ ไม่เรียงชนิดติดกัน
⛔ **ห้ามเติมแหล่งลงสมุด** ⇒ สคริปต์นี้ไม่ส่ง `--add-source` ⇒ ตัวตรวจไม่เห็นคำตอบของเรา

รัน  py -3.14 tools/ยิงข้อสอบความหมาย.py --งาน ก้าว1
     py -3.14 tools/ยิงข้อสอบความหมาย.py --งาน ก้าว1 --ชุด 3 5
"""
import json, sys, os, io, subprocess, time

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ราก = 'docs/ข้อมูล/ผลตรวจความหมาย'
สมุด = 'c171b5c6-6dd2-4af8-9d98-58a2f6296845'
bridge = r'C:\gl\krisada\ceo\tools\aibridge\bridge.py'


def ยิง(ชื่อsession, คำถาม):
    """คืน (คำตอบ, บรรทัดที่บอกว่าใช้ทางไหน) ⇒ ⚠️ ต้องอ่านบรรทัดทางก่อนเชื่อคำตอบ

    **ค้างเกิน 15 นาทีก็ยังคืนค่า ⛔ ไม่โยนข้อผิดพลาดออกไป**
    ⇒ ถ้าปล่อยให้โยน สคริปต์จะตายทั้งตัว แล้ว **ชุดที่ยิงสำเร็จมาก่อนหน้าจะไม่ถูกเขียนลงไฟล์**
    ⇒ คืนเป็นข้อความบอกว่าค้าง แล้วไปชุดถัดไป ⇒ ชุดที่ค้างสั่งซ้ำทีหลังได้ด้วย `--ชุด`
    """
    คำสั่ง = ['py', '-3.14', bridge, 'ask', 'N', ชื่อsession, คำถาม, '--notebook', สมุด]
    try:
        p = subprocess.run(คำสั่ง, capture_output=True, text=True, encoding='utf-8', timeout=900)
    except subprocess.TimeoutExpired:
        return '⛔ ค้างเกิน 900 วินาที ⇒ ไม่ได้คำตอบ', '(ค้าง)', 124
    out = (p.stdout or '') + (p.stderr or '')
    ทาง = next((l for l in out.splitlines() if 'route' in l.lower() or 'N via' in l), '(ไม่บอกทาง)')
    return out, ทาง, p.returncode


def main(args):
    if '--งาน' not in args: print(__doc__); return 1
    งาน = args[args.index('--งาน') + 1]
    ข้อสอบ = json.load(open(os.path.join(ราก, งาน + '-ข้อสอบ.json'), encoding='utf-8'))
    ขอ = None
    if '--ชุด' in args:
        ขอ = {int(a) for a in args[args.index('--ชุด') + 1:] if a.isdigit()}
    ที่เก็บ = os.path.join(ราก, งาน + '-ผลดิบ')
    os.makedirs(ที่เก็บ, exist_ok=True)
    เริ่ม = time.time()
    for s in ข้อสอบ['ชุดคำถาม']:
        if ขอ is not None and s['ชุด'] not in ขอ: continue
        # ชุดที่ถูกยกเลิกคือชุดที่ยาวเกินจนตัวตรวจไม่ตอบ ⇒ ของมันถูกแบ่งไปเป็นชุดใหม่แล้ว
        # ⇒ ยิงซ้ำมีแต่จะพลาดเหมือนเดิม (ดู `แบ่งชุดที่ยาวเกิน.py`)
        if s.get('ยกเลิก'):
            print('ข้าม ชุด %02d ⇒ %s' % (s['ชุด'], s['ยกเลิก'])); continue
        ปลาย = os.path.join(ที่เก็บ, 'ชุด%02d.md' % s['ชุด'])
        # ข้ามเฉพาะชุดที่ยิง**สำเร็จ**แล้ว ⇒ ชุดที่ค้างหรือพลาดจะถูกยิงซ้ำ
        # ⛔ ถ้าดูแค่ว่ามีไฟล์ ชุดที่พลาดจะถูกข้ามตลอดไป แล้วเราจะขาดผลโดยไม่รู้ตัว
        if os.path.exists(ปลาย) and 'รหัสจบงาน: 0' in open(ปลาย, encoding='utf-8').read(400):
            print('ข้าม ชุด %02d ⇒ ยิงสำเร็จแล้ว' % s['ชุด']); continue
        คำถาม = open(os.path.join(ราก, งาน + '-คำถาม', s['ไฟล์']), encoding='utf-8').read()
        ชื่อ = 'phrakham49-%s-set%02d' % (งาน.replace('ก้าว', 'step'), s['ชุด'])
        t0 = time.time()
        out, ทาง, rc = ยิง(ชื่อ, คำถาม)
        with open(ปลาย, 'w', encoding='utf-8', newline='\n') as f:
            f.write('# ผลดิบ %s ชุด %02d\n\n- ฝั่ง: %s\n- เลขข้อสอบ: %s\n- session: %s\n'
                    '- ทางที่ใช้: %s\n- รหัสจบงาน: %d\n- ใช้เวลา: %.0f วินาที\n\n## คำตอบดิบ\n\n'
                    % (งาน, s['ชุด'], s['ฝั่ง'], s['เลขข้อสอบ'], ชื่อ, ทาง.strip(), rc, time.time() - t0))
            f.write(out)
        print('ชุด %02d %s · %.0f วินาที · รวม %.0f นาที · %s'
              % (s['ชุด'], 'สำเร็จ' if rc == 0 else '⛔ พลาด', time.time() - t0,
                 (time.time() - เริ่ม) / 60, ทาง.strip()[:60]), flush=True)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
