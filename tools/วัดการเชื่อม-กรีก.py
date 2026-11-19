"""วัดการเชื่อมฝั่งกรีก — รอบสุดท้าย

⭐ ใช้ **ช่องรหัสความหมายในตาราง** (ช่อง ln) ⇒ ครบกว่าและแม่นกว่าตารางแมปของ Clear
   และง่ายกว่า เพราะรหัสติดมาในตารางเดียวกับคำ ⛔ ไม่ต้องเปิดไฟล์ที่สอง

กฎเทียบ 6 ข้อ ⇒ ทุกข้อเป็นเรื่องที่ต้นฉบับกับพจนานุกรมเขียนคนละแบบ ⛔ ไม่ใช่ผิด

รันซ้ำ  py -3.14 วัดกรีก2.py
"""
import json, csv, collections, unicodedata, re
B='C:/gl/v3/phrakham/_แตก'
N=lambda s: unicodedata.normalize('NFC', s or '')
def ถอด(s): return ''.join(c for c in unicodedata.normalize('NFD',s or '') if not unicodedata.combining(c)).lower()
def ราก(s):
    """ตัดท้ายที่ผันได้ออก ⇒ เทียบรากคำ"""
    t=ถอด(s); return t[:-2] if len(t)>4 else t
def เลข(s):
    out=set()
    for p in re.split(r'[+/]', s or ''):
        m=re.search(r'(\d+)', p)
        if m: out.add(m.group(1).lstrip('0') or '0')
    return out

ต้นฉบับ={r['xml:id']: r for r in csv.DictReader(open(B+'/macula-greek-main/SBLGNT/tsv/macula-greek-SBLGNT.tsv', encoding='utf-8'), delimiter='\t')}
byCode=collections.defaultdict(set); strongของคำ=collections.defaultdict(set); คำในเล่ม=set()
for e in json.load(open(B+'/ubs-open-license-main/dictionaries/greek/JSON/UBSGreekNTDic-v1.1-en.JSON', encoding='utf-8')):
    lem=N(e['Lemma']); คำในเล่ม.add(ถอด(lem))
    for s in (e['StrongCodes'] or []): strongของคำ[lem] |= เลข(s)
    for bf in e['BaseForms']:
        for lm in bf['LEXMeanings']: byCode[lm['LEXEntryCode']].add(lem)

เหตุ=collections.Counter(); ผิด=0; ตย=[]; ไม่มีรหัส=collections.Counter(); เปิดไม่เจอ=0
for k,r in ต้นฉบับ.items():
    ln=(r['ln'] or '').strip()
    if not ln: ไม่มีรหัส[r['class'] or '(ว่าง)']+=1; continue
    lems=set()
    for c in ln.split(): lems |= byCode.get(c, set())
    if not lems: เปิดไม่เจอ+=1; continue
    ml=N(r['lemma']); mt=N(r['text']); sM=เลข(r['strong'])
    พบ=None
    for lem in lems:
        if ถอด(lem)==ถอด(ml): พบ='ตรงตัว'; break
        if ถอด(lem)==ถอด(mt) or ถอด(lem) in ถอด(mt): พบ='ตรงกับตัวอักษรในข้อ'; break
        if sM & strongของคำ.get(lem,set()): พบ='รหัส Strong ยืนยัน (คำมีสองรูป)'; break
        if ราก(lem) and ราก(lem)==ราก(ml): พบ='รากคำเดียวกัน'; break
        if ราก(lem) and (ราก(lem) in ถอด(ml) or ราก(ml) in ถอด(lem)): พบ='พจนานุกรมยกรากศัพท์คนละตัว'; break
    if พบ: เหตุ[พบ]+=1
    else:
        ผิด+=1
        if len(ตย)<10: ตย.append((r['ref'], mt, ml, sorted(lems)[0], r['class']))
ถูก=sum(เหตุ.values()); รวม=ถูก+ผิด
print('### ฝั่งกรีก — ช่องรหัสความหมายในตาราง')
print(f'  ความครบ  {รวม:,} จาก {len(ต้นฉบับ):,} = {รวม*100/len(ต้นฉบับ):.2f}%')
print(f'  ความแม่น {ถูก:,} จาก {รวม:,} = {ถูก*100/รวม:.4f}%  ⇒ ชี้ไม่ตรง {ผิด:,}')
for k,v in เหตุ.most_common(): print(f'     {k:36} {v:>8,}')
print(f'\n  ไม่มีรหัสในช่อง ln = {sum(ไม่มีรหัส.values()):,} · เปิดรหัสไม่เจอ = {เปิดไม่เจอ:,}')
print('  ไม่มีรหัส แยกตามชนิดคำ')
for k,v in ไม่มีรหัส.most_common(8): print(f'     {k:14} {v:>7,}')
print('\nที่ยังชี้ไม่ตรง (ที่อยู่|ตัวอักษร|ต้นฉบับว่า|พจนานุกรมว่า|ชนิด)')
for x in ตย: print('  ', ' | '.join(str(y) for y in x))
