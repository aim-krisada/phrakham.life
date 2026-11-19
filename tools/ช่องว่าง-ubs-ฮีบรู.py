"""คำเนื้อหาที่ "ไม่มีความหมายชี้มา" แยกเป็นสองพวก ⇒ พวกไหนเป็นช่องว่างจริง

⚠️ เทียบรูปตั้งต้นต้อง **ถอดสระออกก่อน** ⇒ MACULA กับ UBS ใส่สระคนละแบบ
   เช่น נָתַן กับ נָתָן เป็นคำเดียวกัน ⇒ เทียบทั้งสระแล้วไม่ตรง = ตรวจผิด

รันซ้ำ  py -3.14 ช่องว่าง-ฮีบรู.py
"""
import json, csv, glob, collections, unicodedata
B='C:/gl/v3/phrakham/_แตก'
N=lambda s: unicodedata.normalize('NFC', s or '')
def พยัญชนะ(s):
    s=unicodedata.normalize('NFD', s or '')
    return ''.join(c for c in s if not (0x0591<=ord(c)<=0x05C7))

mac={r['xml:id']: r for r in csv.DictReader(open(B+'/macula-hebrew-main/WLC/tsv/macula-hebrew.tsv', encoding='utf-8'), delimiter='\t')}
เล่ม=set()
for e in json.load(open(B+'/ubs-open-license-main/dictionaries/hebrew/JSON/UBSHebrewDic-v0.9.2-en.JSON', encoding='utf-8')):
    เล่ม.add(พยัญชนะ(N(e['Lemma'])))
ถูกชี้=set()
for p in sorted(glob.glob(B+'/ubs-open-license-main/index/WLC/JSON/MARBLELinks-*.json')):
    for e in json.load(open(p, encoding='utf-8')):
        ถูกชี้.update(e['ID'].split())

มี=collections.Counter(); ไม่มี=collections.Counter()
for k,r in mac.items():
    if k in ถูกชี้ or r['pos'] not in ('verb','noun','adjective'): continue
    lem=N(r['lemma']); key=พยัญชนะ(lem)
    (มี if key in เล่ม else ไม่มี)[lem]+=1

รวม=sum(มี.values())+sum(ไม่มี.values())
print(f'คำเนื้อหาที่ไม่มีความหมายชี้มา รวม {รวม:,} ชิ้น\n')
print(f'ⓐ ⛔ ช่องว่างจริง — เล่มมีคำนี้ แต่ตำแหน่งนี้ไม่ถูกชี้')
print(f'   {sum(มี.values()):,} ชิ้น จาก {len(มี):,} คำต่างกัน  ({sum(มี.values())*100/รวม:.1f}% ของกองนี้)')
print(f'\nⓑ ✔ ไม่ใช่ช่องว่าง — เล่มไม่เก็บคำนี้เลย (เล่มตัดสินว่าไม่ต้องอธิบาย)')
print(f'   {sum(ไม่มี.values()):,} ชิ้น จาก {len(ไม่มี):,} คำต่างกัน  ({sum(ไม่มี.values())*100/รวม:.1f}% ของกองนี้)')
print('\nⓑ คำที่เล่มไม่เก็บ เรียงจากโผล่บ่อยสุด 20 คำ')
for w,v in ไม่มี.most_common(20): print(f'   {w:16} {v:>6,}')
print('\nⓐ ช่องว่างจริง เรียงจากโผล่บ่อยสุด 20 คำ')
for w,v in มี.most_common(20): print(f'   {w:16} {v:>6,}')
with open('ช่องว่าง-ฮีบรู.tsv','w',encoding='utf-8',newline='') as f:
    w_=csv.writer(f, delimiter='\t'); w_.writerow(['พวก','รูปตั้งต้น','จำนวนชิ้น'])
    for w,v in มี.most_common(): w_.writerow(['ⓐ ช่องว่างจริง', w, v])
    for w,v in ไม่มี.most_common(): w_.writerow(['ⓑ เล่มไม่เก็บคำนี้', w, v])
print('\nเขียนรายการครบทุกคำลง ช่องว่าง-ฮีบรู.tsv')
