"""นับใหม่บนตารางของ MACULA ⇒ ชิ้นไหนไม่ได้ความหมาย และเป็นคำแบบไหน"""
import json, csv, collections, unicodedata
B='C:/gl/v3/phrakham/_แตก'
N=lambda s: unicodedata.normalize('NFC', s or '')
def พยัญชนะ(s):
    s=unicodedata.normalize('NFD', s or '')
    return ''.join(c for c in s if not (0x0591<=ord(c)<=0x05C7))
ต้นฉบับ={r['xml:id']: r for r in csv.DictReader(open(B+'/macula-hebrew-main/WLC/tsv/macula-hebrew.tsv', encoding='utf-8'), delimiter='\t')}
พจนานุกรม=set(); เล่มมีคำ=set()
for e in json.load(open(B+'/ubs-open-license-main/dictionaries/hebrew/JSON/UBSHebrewDic-v0.9.2-en.JSON', encoding='utf-8')):
    เล่มมีคำ.add(พยัญชนะ(N(e['Lemma'])))
    for bf in e['BaseForms']:
        for lm in bf['LEXMeanings']:
            for r in (lm.get('LEXReferences') or []): พจนานุกรม.add(r.split('{')[0])
ได้=set()
with open(B+'/macula-hebrew-main/mappings/tsv/macula_to_marble_map.tsv', encoding='utf-8') as f:
    next(f)
    for line in f:
        a,_,b=line.rstrip('\n').partition('\t')
        if any(y in พจนานุกรม for y in b.split()):
            ได้.update(a.split())
ชนิด=collections.Counter(); เนื้อหา=collections.Counter(); เล่มมี=collections.Counter()
for k,r in ต้นฉบับ.items():
    if k in ได้: continue
    p=r['pos'] or '(ว่าง)'
    ชนิด[p]+=1
    if p in ('verb','noun','adjective'):
        lem=N(r['lemma'])
        (เล่มมี if พยัญชนะ(lem) in เล่มมีคำ else เนื้อหา)[lem]+=1
ไม่ได้=sum(ชนิด.values())
print(f'ต้นฉบับ {len(ต้นฉบับ):,} ชิ้น · ได้ความหมาย {len(ได้):,} ({len(ได้)*100/len(ต้นฉบับ):.2f}%)')
print(f'⛔ ไม่ได้ความหมาย {ไม่ได้:,} ({ไม่ได้*100/len(ต้นฉบับ):.2f}%)\n')
print('แยกตามชนิดคำ')
for k,v in ชนิด.most_common(12): print(f'   {k:16} {v:>8,}')
ไวยากรณ์=('preposition','conjunction','suffix','particle','pronoun','adverb')
เล็ก=sum(v for k,v in ชนิด.items() if k in ไวยากรณ์)
print(f'\n  ชิ้นส่วนไวยากรณ์ (ไม่มีความหมายให้อธิบาย) = {เล็ก:,}')
print(f'  คำเนื้อหา                                = {ไม่ได้-เล็ก:,}')
print(f'     ⓐ เล่มมีคำนี้ แต่ตำแหน่งนี้ไม่ได้ = {sum(เล่มมี.values()):,} ({len(เล่มมี):,} คำ)')
print(f'     ⓑ เล่มไม่เก็บคำนี้เลย            = {sum(เนื้อหา.values()):,} ({len(เนื้อหา):,} คำ)')
print('\nⓑ 12 คำที่โผล่บ่อยสุด (เล่มไม่เก็บ)')
for w,v in เนื้อหา.most_common(12): print(f'   {w:16} {v:>6,}')
print('\nⓐ 12 คำที่โผล่บ่อยสุด (เล่มมีแต่ไม่ได้)')
for w,v in เล่มมี.most_common(12): print(f'   {w:16} {v:>6,}')
