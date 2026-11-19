"""หาว่าเจ้าของบอกเหตุไว้ที่ไหน สำหรับคำที่ไม่มีรหัสความหมาย"""
import csv, collections, re
B='C:/gl/v3/phrakham/_แตก'
M=B+'/macula-greek-main/sources/MARBLE/SDBG'
# ① MARBLE-macula-domains-ln.xml ⇒ macula id ⇒ LN
มีLN={}
for line in open(M+'/MARBLE-macula-domains-ln.xml', encoding='utf-8'):
    m=re.search(r'macula="([^"]*)"', line)
    if m:
        ln=re.search(r'LN="([^"]*)"', line)
        มีLN[m.group(1)]=(ln.group(1) if ln else '')
print(f'ไฟล์ MARBLE-macula-domains-ln.xml ⇒ {len(มีLN):,} คำ')
ว่าง=sum(1 for v in มีLN.values() if not v.strip())
print(f'  ในนั้น ช่อง LN ว่าง = {ว่าง:,}')
# ② sdbg-senses.xml ⇒ word ที่ไม่มี sense
ไม่มีsense=set(); มีsense=set(); cur=None
for line in open(M+'/sdbg-senses.xml', encoding='utf-8'):
    m=re.match(r'\s*<word id="([^"]*)"\s*(/?)>', line)
    if m:
        if m.group(2)=='/': ไม่มีsense.add(m.group(1))
        else: cur=m.group(1)
    elif '<sense>' in line and cur: มีsense.add(cur)
print(f'\nไฟล์ sdbg-senses.xml ⇒ มีความหมาย {len(มีsense):,} · ⛔ ไม่มีความหมาย {len(ไม่มีsense):,}')
# ③ เทียบกับคำที่ไม่มี ln ในตารางของเรา
ต้นฉบับ=list(csv.DictReader(open(B+'/macula-greek-main/SBLGNT/tsv/macula-greek-SBLGNT.tsv', encoding='utf-8'), delimiter='\t'))
ไม่มีรหัส=[r for r in ต้นฉบับ if not (r['ln'] or '').strip()]
print(f'\nตารางของเรา ⇒ คำที่ไม่มีรหัส {len(ไม่มีรหัส):,}')
อธิบายได้=สูญ=0; ตย=[]
for r in ไม่มีรหัส:
    k=r['xml:id'].lstrip('n')
    if k in มีLN and not มีLN[k].strip(): อธิบายได้+=1
    elif k not in มีLN:
        สูญ+=1
        if len(ตย)<8: ตย.append((r['ref'], r['text'], r['lemma'], r['class']))
print(f'  ⇒ ต้นทางบอกว่าไม่มีความหมาย (LN ว่าง)  = {อธิบายได้:,}')
print(f'  ⇒ ต้นทางไม่มีคำนี้ในไฟล์เลย            = {สูญ:,}')
print(f'  ⇒ อื่น ๆ                                = {len(ไม่มีรหัส)-อธิบายได้-สูญ:,}')
if ตย:
    print('\n  ตัวอย่างที่ต้นทางไม่มีในไฟล์')
    for x in ตย: print('    ', ' | '.join(str(y) for y in x))
# ④ คำนาม 80 คำที่ไม่มีรหัส เป็นคำอะไร
นาม=[r for r in ไม่มีรหัส if r['class']=='noun']
print(f'\n  คำนามที่ไม่มีรหัส {len(นาม)} คำ ⇒ ตัวอย่าง')
for r in นาม[:10]: print(f"    {r['ref']:14} {r['text']:14} {r['lemma']}")
