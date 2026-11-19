"""วัด "ความครบ" กับ "ความแม่น" ของสองตาราง บนหน่วยเดียวกัน — รอบสุดท้าย

กฎเทียบรองรับ 5 อย่าง ⇒ ทุกอย่างเป็นเรื่องที่ต้นฉบับกับพจนานุกรมเขียนคนละแบบ ⛔ ไม่ใช่ผิด
  ① สรรพนามต่อท้าย เกาะคำหลัก ⇒ เทียบกับทุกชิ้นในคำเดียวกัน
  ② เขียนสระเต็ม/ย่อ ⇒ יוֹנָתָן กับ יְהֹונָתָן คนเดียวกัน
  ③ ชื่อเฉพาะหลายคำ ⇒ בֵּית לֶחֶם เก็บเป็นชื่อเดียว
  ④ ชื่อเขียนติดกัน/แยกกัน ⇒ תּוּבַלקַיִן กับ תּוּבַל קַיִן
  ⑤ คำที่มีสองรูป ⇒ אֲנִי กับ אָנֹכִי แปลว่าข้าพเจ้าทั้งคู่ · ยืนยันด้วยรหัส Strong

รันซ้ำ  py -3.14 วัดสองตาราง2.py
"""
import json, csv, glob, collections, unicodedata, re
B='C:/gl/v3/phrakham/_แตก'
N=lambda s: unicodedata.normalize('NFC', s or '')
def พยัญชนะ(s):
    s=unicodedata.normalize('NFD', s or '')
    return ''.join(c for c in s if not (0x0591<=ord(c)<=0x05C7))
def แกน(s): return ''.join(c for c in พยัญชนะ(s) if c not in 'ויהא')
def เลข(s):
    out=set()
    for p in re.split(r'[+/]', s or ''):
        m=re.search(r'(\d+)', p)
        if m: out.add(m.group(1).lstrip('0') or '0')
    return out
ชิ้นส่วน=lambda l: [x for x in พยัญชนะ(l).replace('־',' ').split() if x]

ต้นฉบับ={}; ตามคำ=collections.defaultdict(list)
for r in csv.DictReader(open(B+'/macula-hebrew-main/WLC/tsv/macula-hebrew.tsv', encoding='utf-8'), delimiter='\t'):
    ต้นฉบับ[r['xml:id']]=r; ตามคำ[r['ref']].append(r)

พจนานุกรม={}; strongของคำ=collections.defaultdict(set)
for e in json.load(open(B+'/ubs-open-license-main/dictionaries/hebrew/JSON/UBSHebrewDic-v0.9.2-en.JSON', encoding='utf-8')):
    lem=N(e['Lemma'])
    for s in (e['StrongCodes'] or []): strongของคำ[lem] |= เลข(s)
    for bf in e['BaseForms']:
        for lm in bf['LEXMeanings']:
            for r in (lm.get('LEXReferences') or []): พจนานุกรม[r.split('{')[0]]=lem

tM=collections.defaultdict(set)
with open(B+'/macula-hebrew-main/mappings/tsv/macula_to_marble_map.tsv', encoding='utf-8') as f:
    next(f)
    for line in f:
        a,_,b=line.rstrip('\n').partition('\t')
        lems={พจนานุกรม[y] for y in b.split() if y in พจนานุกรม}
        if lems:
            for x in a.split(): tM[x] |= lems
tU=collections.defaultdict(set)
for p in sorted(glob.glob(B+'/ubs-open-license-main/index/WLC/JSON/MARBLELinks-*.json')):
    for e in json.load(open(p, encoding='utf-8')):
        lems={N(l.split(':',3)[1]) for l in e['LexicalLinks']}
        if lems:
            for c in e['ID'].split(): tU[c] |= lems

def ตรงไหม(lem, r, เพื่อน, เพื่อนlem, sMac):
    if พยัญชนะ(lem)==พยัญชนะ(N(r['lemma'])) or พยัญชนะ(lem) in พยัญชนะ(N(r['text'])): return 'ตรงตัว'
    if แกน(lem) and แกน(lem)==แกน(r['lemma']): return 'เขียนสระเต็ม/ย่อ'
    if แกน(lem) and any(แกน(lem)==แกน(z) for z in เพื่อนlem): return 'สรรพนามต่อท้ายเกาะคำหลัก'
    if แกน(lem) and แกน(lem) in แกน(เพื่อน): return 'ชื่อหลายคำ/ต้นฉบับแยกชิ้น'
    if any(แกน(s)==แกน(r['lemma']) for s in ชิ้นส่วน(lem)): return 'ชื่อประกอบ'
    ก=แกน(lem).replace(' ','')
    if ก and (ก==แกน(r['lemma']).replace(' ','') or ก in แกน(เพื่อน).replace(' ','')): return 'ชื่อเขียนติด/แยก'
    if sMac & strongของคำ.get(lem,set()): return 'รหัส Strong ยืนยัน (คำมีสองรูป)'
    return None

def วัด(ชื่อ, ตาราง):
    เหตุ=collections.Counter(); ผิด=0; ตย=[]
    for รหัส,lems in ตาราง.items():
        r=ต้นฉบับ.get(รหัส)
        if not r: continue
        เพื่อน=''.join(N(x['text']) for x in ตามคำ.get(r['ref'],[]))
        เพื่อนlem=[N(x['lemma']) for x in ตามคำ.get(r['ref'],[])]
        sMac=เลข(r['strongnumberx'])
        ผลนี้=None
        for lem in lems:
            ผลนี้=ตรงไหม(lem, r, เพื่อน, เพื่อนlem, sMac)
            if ผลนี้: break
        if ผลนี้: เหตุ[ผลนี้]+=1
        else:
            ผิด+=1
            if len(ตย)<10: ตย.append((r['ref'], N(r['text']), N(r['lemma']), sorted(lems)[0], r['pos']))
    ถูก=sum(เหตุ.values()); รวม=ถูก+ผิด
    print(f'\n### {ชื่อ}')
    print(f'  ความครบ  {รวม:,} จาก {len(ต้นฉบับ):,} = {รวม*100/len(ต้นฉบับ):.2f}%')
    print(f'  ความแม่น {ถูก:,} จาก {รวม:,} = {ถูก*100/รวม:.4f}%   ⇒ ชี้ไม่ตรง {ผิด:,}')
    for k,v in เหตุ.most_common(): print(f'     {k:34} {v:>8,}')
    return ตย
ตยM=วัด('ตารางของ MACULA', tM)
ตยU=วัด('ตารางของ UBS', tU)
print('\nที่ยังชี้ไม่ตรง — ตารางของ MACULA (ที่อยู่|ตัวอักษร|ต้นฉบับว่า|พจนานุกรมว่า|ชนิด)')
for x in ตยM: print('  ', ' | '.join(str(y) for y in x))
