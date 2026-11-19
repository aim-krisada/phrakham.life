import csv, collections
B='C:/gl/v3/phrakham/_แตก'
ต้นฉบับ=list(csv.DictReader(open(B+'/macula-greek-main/SBLGNT/tsv/macula-greek-SBLGNT.tsv', encoding='utf-8'), delimiter='\t'))
# คำเนื้อหาที่ไม่มีรหัส (ไม่ใช่คำจำพวกไวยากรณ์)
ไวยากรณ์={'conj','prep','pron','adv','det','ptcl','num'}
เป้า=[(i,r) for i,r in enumerate(ต้นฉบับ) if not (r['ln'] or '').strip() and r['class'] not in ไวยากรณ์]
มีข้างหน้า=0; ก่อนหน้าเป็นบุพบท=0
for i,r in เป้า:
    if i==0: continue
    ก=ต้นฉบับ[i-1]
    if ก['ref'].rsplit('!',1)[0]==r['ref'].rsplit('!',1)[0]:  # ข้อเดียวกัน
        if (ก['ln'] or '').strip(): มีข้างหน้า+=1
        if ก['class']=='prep': ก่อนหน้าเป็นบุพบท+=1
print(f'คำเนื้อหาที่ไม่มีรหัส {len(เป้า)} คำ')
print(f'  คำข้างหน้าในข้อเดียวกัน มีรหัส = {มีข้างหน้า} ({มีข้างหน้า*100//len(เป้า)}%)')
print(f'  คำข้างหน้าเป็นคำบุพบท          = {ก่อนหน้าเป็นบุพบท} ({ก่อนหน้าเป็นบุพบท*100//len(เป้า)}%)')
print('\nแยกตามชนิดคำ')
for k,v in collections.Counter(r['class'] for _,r in เป้า).most_common(): print(f'   {k:10} {v:>5}')
print('\nรูปตั้งต้นที่โผล่บ่อยสุด')
for k,v in collections.Counter(r['lemma'] for _,r in เป้า).most_common(10): print(f'   {k:14} {v:>4}')
