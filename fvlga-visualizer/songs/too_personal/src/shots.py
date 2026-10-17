import json, subprocess, os, sys
from concurrent.futures import ThreadPoolExecutor
from params import *
FOOT=S+'/bands/foot'
man=json.load(open('/home/user/fvlga/fvlga-visualizer/src/footage_manifest.json'))
n_of={int(m['dir'].split('/c')[1]):m['n'] for m in man}
FD={}  # fade duration at boundary i (between shot i-1 and i)
for i,s in enumerate(SHOTS):
    FD[i]=0.8
    if abs(s[0]-13.75)<.01: FD[i]=0.3
    if abs(s[0]-50.67)<.01 or abs(s[0]-72.83)<.01: FD[i]=1.4
    if abs(s[0]-102.36)<.01: FD[i]=1.4
FD[0]=0
N=len(SHOTS); starts=[s[0] for s in SHOTS]; ends=starts[1:]+[DUR]
def L(i):
    head=FD[i]/2 if i>0 else 0; tail=FD[i+1]/2 if i+1<N else 0
    return (ends[i]-starts[i])+head+tail
def render(i):
    t0,clip,fx,fy,zd=SHOTS[i]; need=L(i)+0.1; n=n_of[clip]; D=n/30
    sp=min(0.6,D/need); boom=False
    if sp<0.25: boom=True; sp=min(0.32,2*D/need)
    nf=int(need*30)+2
    z=f"1+0.10*on/{nf}" if zd>0 else f"1.10-0.10*on/{nf}"
    f="[0:v]"
    if boom: f+="split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0,"
    f+=f"setpts=PTS/{sp:.4f},framerate=fps=30:interp_start=0:interp_end=255:scene=100,scale=2160:-2:flags=lanczos,crop=2160:1215:0:(ih-1215)*{fy},zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x608:fps=30,trim=duration={need:.3f},setpts=PTS-STARTPTS[o]"
    out=f"{S}/tp/shots/s{i:02d}.mp4"
    cmd=['ffmpeg','-y','-v','error','-framerate','30','-i',f'{FOOT}/c{clip}/%04d.jpg','-filter_complex',f,'-map','[o]','-r','30','-c:v','libx264','-crf','12','-preset','fast','-pix_fmt','yuv420p',out]
    r=subprocess.run(cmd,capture_output=True,text=True)
    if r.returncode: print('ERR',i,r.stderr[-400:])
    else: print('shot',i,clip,f'sp={sp:.2f} boom={boom} need={need:.1f}',flush=True)
if __name__=='__main__':
    with ThreadPoolExecutor(4) as ex: list(ex.map(render,range(N)))
    # xfade chain
    inp=[]; fc=[]; cur='[0:v]'
    for i in range(N): inp+=['-i',f'{S}/tp/shots/s{i:02d}.mp4']
    for i in range(1,N):
        tb=starts[i]; off=tb-FD[i]/2-0.0
        fc.append(f"{cur}[{i}:v]xfade=transition=fade:duration={FD[i]}:offset={off:.3f}[x{i}]"); cur=f'[x{i}]'
    fc.append(f"{cur}trim=duration={DUR},setpts=PTS-STARTPTS[v]")
    cmd=['ffmpeg','-y','-v','error']+inp+['-filter_complex',';'.join(fc),'-map','[v]','-r','30','-c:v','libx264','-crf','12','-preset','fast','-pix_fmt','yuv420p',S+'/tp/base.mp4']
    r=subprocess.run(cmd,capture_output=True,text=True); print(r.returncode,r.stderr[-500:])
