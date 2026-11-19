import json, csv, unicodedata, re, collections
B='C:/gl/v3/phrakham/_แตก'
N=lambda s: unicodedata.normalize('NFC', s or '')
def พยัญชนะ(s):
    s=unicodedata.normalize('NFD', s or '')
    return ''.join(c for c in s if not (0x0591<=ord(c)<=0x05C7))
def เลข(s):
    out=set()
    for p in re.split(r'[+/]', s or ''):
        m=re.search(r'(\d+)', p)
        if m: out.add(m.group(1).lstrip('0') or '0')
    return out
ub=json.load(open(B+'/ubs-open-license-main/dictionaries/hebrew/JSON/UBSHebrewDic-v0.9.2-en.JSON', encoding='utf-8'))
# Strong จริงของคำที่ MACULA ใช้
mstrong={}
for r in csv.DictReader(open(B+'/macula-hebrew-main/WLC/tsv/macula-hebrew.tsv', encoding='utf-8'), delimiter='\t'):
    lem=N(r['lemma'])
    if lem not in mstrong and r['strongnumberx']: mstrong[lem]=เลข(r['strongnumberx'])
for w in ['בּוֹא','קוֹל','נָכָה','תָּוֶךְ','לָקַח']:
    k=พยัญชนะ(N(w)); sm=mstrong.get(N(w), set())
    print('='*66)
    print(f'MACULA {w}  Strong {sorted(sm)}')
    เจอ=[e for e in ub if พยัญชนะ(N(e['Lemma']))==k]
    if not เจอ: print('  ⛔ ไม่มีรายการที่พยัญชนะตรงกันในเล่มเลย'); continue
    for e in เจอ:
        su=set()
        for s in (e['StrongCodes'] or []): su|=เลข(s)
        ชั้น=sum(len(bf['LEXMeanings']) for bf in e['BaseForms'])
        ตรง='⭐ Strong ตรงกัน' if (sm & su) else '⛔ Strong ไม่ตรง'
        print(f"  เล่มมี {e['Lemma']}  Strong {sorted(su)}  ชั้นความหมาย {ชั้น}  {ตรง}")
        if sm & su:
            for bf in e['BaseForms']:
                for lm in bf['LEXMeanings'][:3]:
                    ss=lm['LEXSenses'][0] if lm['LEXSenses'] else {}
                    print(f"      ตัวอย่างชั้น {lm['LEXEntryCode']}: {ss.get('DefinitionShort','')[:70]}")
