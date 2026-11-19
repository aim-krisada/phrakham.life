"""ตรวจว่า "ดึงถูกไหม" ฝั่งฮีบรู — ฉบับจบ ⛔ ไม่ตัดสินความหมาย

ความรับผิดชอบของเราคือ **ดึงให้ถูก** ⛔ ไม่ใช่รับผิดชอบว่าความหมายถูก
⭐ ใช้รหัส Strong "ตรวจ" ⛔ ไม่ได้ใช้ "เชื่อม" (พี่เอมห้ามเชื่อมด้วย Strong 31 ส.ค. 2569)

รันซ้ำ  py -3.14 ตรวจดึง-จบ.py --ออกไฟล์
"""
import json, csv, glob, collections, unicodedata, sys, re

B='C:/gl/v3/phrakham/_แตก'
N=lambda s: unicodedata.normalize('NFC', s or '')
def พยัญชนะ(s):
    s=unicodedata.normalize('NFD', s or '')
    return ''.join(c for c in s if not (0x0591<=ord(c)<=0x05C7))
def แกน(s):
    return ''.join(c for c in พยัญชนะ(s) if c not in 'ויהא')
def ชิ้นส่วนชื่อ(lem):
    return [x for x in พยัญชนะ(lem).replace('־',' ').split() if x]
_เลข=re.compile(r'(\d+)')
def เลขสตรอง(s):
    """รหัส Strong มีหลายรูป ⇒ 0559 · 3807a · 3220+H5488 ⇒ คืนเป็นชุดเลขล้วน"""
    out=set()
    for part in re.split(r'[+/]', s or ''):
        m=_เลข.search(part)
        if m: out.add(m.group(1).lstrip('0') or '0')
    return out

mac={}; ตามคำ=collections.defaultdict(list)
for r in csv.DictReader(open(B+'/macula-hebrew-main/WLC/tsv/macula-hebrew.tsv', encoding='utf-8'), delimiter='\t'):
    mac[r['xml:id']]=r
    ตามคำ[r['ref']].append(r)

strongของคำ=collections.defaultdict(set)
for e in json.load(open(B+'/ubs-open-license-main/dictionaries/hebrew/JSON/UBSHebrewDic-v0.9.2-en.JSON', encoding='utf-8')):
    for s in (e['StrongCodes'] or []): strongของคำ[N(e['Lemma'])] |= เลขสตรอง(s)

ลิงก์=collections.defaultdict(list)
for p in sorted(glob.glob(B+'/ubs-open-license-main/index/WLC/JSON/MARBLELinks-*.json')):
    for e in json.load(open(p, encoding='utf-8')):
        for l in e['LexicalLinks']: ลิงก์[e['ID']].append(l)

ผล=collections.Counter(); เหลือ=[]
for รหัส,ls in ลิงก์.items():
    ชิ้น=รหัส.split(); แถว=[mac[c] for c in ชิ้น if c in mac]
    if len(แถว)!=len(ชิ้น): ผล['① ชี้แล้วหลุด']+=1; continue
    if len(set(ls))>1: ผล['③ ชี้ซ้อน (ชื่อกำกวม)']+=1
    lem=N(ls[0].split(':',3)[1]); r=แถว[0]
    ml=N(r['lemma']); mt=''.join(N(x['text']) for x in แถว)
    เพื่อน=''.join(N(x['text']) for x in ตามคำ.get(r['ref'],[]))
    sMac=เลขสตรอง(r['strongnumberx']); sUbs=strongของคำ.get(lem,set())
    if   len(ชิ้น)>1: ผล['✔ ชื่อเฉพาะเขียนหลายคำ']+=1
    elif พยัญชนะ(lem)==พยัญชนะ(ml) or พยัญชนะ(lem) in พยัญชนะ(mt): ผล['✔ ตรงตัว']+=1
    elif sMac & sUbs: ผล['✔ รหัส Strong ตรงกัน']+=1
    elif แกน(lem) and แกน(lem)==แกน(ml): ผล['✔ เขียนสระเต็ม/ย่อ']+=1
    elif ชิ้นส่วนชื่อ(lem) and any(แกน(s)==แกน(ml) for s in ชิ้นส่วนชื่อ(lem)): ผล['✔ ชื่อประกอบ เช่น เบน-']+=1
    elif แกน(lem) and แกน(lem) in แกน(เพื่อน): ผล['✔ ต้นฉบับแยกชิ้น พจนานุกรมมองรวม']+=1
    elif ชิ้นส่วนชื่อ(lem) and any(แกน(s) and แกน(s) in แกน(เพื่อน) for s in ชิ้นส่วนชื่อ(lem)): ผล['✔ ชื่อหลายคำ ต้นฉบับแยกชิ้น']+=1
    else:
        พวก='สองฝ่ายให้รหัสคนละเลข' if (sMac and sUbs) else 'ฝ่ายใดฝ่ายหนึ่งไม่มีรหัส'
        ผล[f'⛔ {พวก}']+=1
        เหลือ.append((r['ref'], mt, ml, lem, r['pos'], ','.join(sorted(sMac)), ','.join(sorted(sUbs)), พวก))

ถูก=sum(v for k,v in ผล.items() if k.startswith('✔'))
ค้าง=sum(v for k,v in ผล.items() if k.startswith('⛔'))
รวม=ถูก+ค้าง
print('='*68)
for k in sorted(ผล): print(f'  {k:40} {ผล[k]:>8,}')
print('='*68)
print(f'⭐ ชี้ถูกคำ พิสูจน์ได้    {ถูก:>8,}  ({ถูก*100/รวม:.4f}%)')
print(f'⛔ ยังค้าง                {ค้าง:>8,}  ({ค้าง*100/รวม:.4f}%)')
if '--ออกไฟล์' in sys.argv:
    with open('ค้าง-ฮีบรู.tsv','w',encoding='utf-8',newline='') as f:
        w=csv.writer(f, delimiter='\t')
        w.writerow(['ที่อยู่','ตัวอักษร','MACULAว่า','UBSว่า','ชนิดคำ','StrongMACULA','StrongUBS','พวก'])
        w.writerows(เหลือ)
    print(f'\nเขียนที่ค้าง {len(เหลือ)} แถว ลง ค้าง-ฮีบรู.tsv')
