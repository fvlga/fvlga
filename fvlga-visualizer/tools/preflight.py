#!/usr/bin/env python3
"""Pre-render check. Usage: preflight.py WORKDIR [extra_t ...]
WORKDIR holds ov.html, params.json, base.mp4 (graded base is applied from grade.txt), stills.js, tstill.sh.
Writes WORKDIR/preflight/sheet_N.jpg (labelled composite stills of every lyric/word/stamp/quote/band/face moment
+ every 5 s) and report.json (fonts used, event times). It does NOT render the video. Read the sheets and fix before rendering."""
import json, os, re, subprocess, sys
from PIL import Image, ImageDraw
W=os.path.abspath(sys.argv[1]); P=json.load(open(W+'/params.json')); out=W+'/preflight'; os.makedirs(out,exist_ok=True)
ts=set(round(float(x),1) for x in sys.argv[2:])
for c in P.get('CAPS',[]): ts.add(round(c[0]+0.4,1))
for w in P.get('WORDS',[]): ts.add(round(w[0]+0.45,1))
for s in P.get('STAMPS',[]): ts.add(round(s+0.3,1))
for q in P.get('QUOTES',[]): ts.add(round((q[0]+q[1])/2,1))
for b in P.get('BANDS',[]): ts.add(round((b[0]+b[1])/2,1))
for f in P.get('FACES',[]): ts.add(round((f[0]+f[1])/2,1))
t=0.5
while t<P['DUR']: ts.add(round(t,1)); t+=5
ts=sorted(x for x in ts if 0<=x<P['DUR']-0.1)
env=dict(os.environ,PW=os.environ.get('PW','/opt/node22/lib/node_modules/playwright'))
for f in os.listdir(W):
    if f.startswith(('st_','comp_')): os.remove(W+'/'+f)
names=[('%g'%x) for x in ts]
subprocess.run(['node','stills.js']+names,cwd=W,env=env,check=True,capture_output=True)
subprocess.run(['./tstill.sh']+names,cwd=W,check=True,capture_output=True)
sheets=[]; per=12
for n in range(0,len(names),per):
    grp=names[n:n+per]; sh=Image.new('RGB',(540*4,304*3),'black')
    for i,nm in enumerate(grp):
        im=Image.open(f'{W}/comp_{nm}.jpg').resize((540,304)); ImageDraw.Draw(im).text((6,290),f't={nm}s',fill='yellow'); sh.paste(im,((i%4)*540,(i//4)*304))
    p=f'{out}/sheet_{n//per}.jpg'; sh.save(p); sheets.append(p)
src=open(W+'/ov.html').read(); faces=sorted(set(re.findall(r"font-family:(\w+);src:url\(([^)]+)\)",src)))
used=set(re.findall(r"px\s+(\w+)['\"]",src)); 
rep=dict(times=ts,sheets=sheets,font_files=[f[1] for f in faces],font_families_declared=[f[0] for f in faces],font_families_used=sorted(used & {f[0] for f in faces}),
 note='More than 2 text families on screen reads as messy. Read every sheet before rendering.')
json.dump(rep,open(out+'/report.json','w'),indent=1); print(json.dumps(rep,indent=1))
