import json, subprocess, os
from concurrent.futures import ThreadPoolExecutor
from params import *
FOOT=S+'/bands/foot'
man=json.load(open('/home/user/fvlga/fvlga-visualizer/src/footage_manifest.json'))
n_of={int(m['dir'].split('/c')[1]):m['n'] for m in man}
FR=lambda t:round(t*30)
starts=[0.0]+[s[0] for s in SHOTS]; ends=[s[0] for s in SHOTS]+[DUR]
# shot 0 = black until T0
def render(i):
    t0,clip=SHOTS[i]; t1=SHOTS[i+1][0] if i+1<len(SHOTS) else DUR
    nf=FR(t1)-FR(t0); need=nf/30; n=n_of[clip]; D=n/30
    sp=min(1.0,D/need); off=(i*7)%max(1,int(n-need*30*sp)-1) if D>need*1.2 else 0   # vary the in-point so repeated clips differ
    z=f"1+0.09*on/{nf}" if i%2==0 else f"1.09-0.09*on/{nf}"
    f=f"[0:v]setpts=PTS/{sp:.4f},framerate=fps=30:interp_start=0:interp_end=255:scene=100,scale=2160:-2:flags=lanczos,crop=2160:1215:0:(ih-1215)*0.5,zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x608:fps=30,trim=end_frame={nf},setpts=PTS-STARTPTS[o]"
    out=f"{S}/cm/shots/s{i:02d}.mp4"
    cmd=['ffmpeg','-y','-v','error','-framerate','30','-start_number',str(1+off),'-i',f'{FOOT}/c{clip}/%04d.jpg','-filter_complex',f,'-map','[o]','-r','30','-c:v','libx264','-crf','12','-preset','fast','-pix_fmt','yuv420p',out]
    r=subprocess.run(cmd,capture_output=True,text=True)
    if r.returncode or not os.path.exists(out): print('ERR',i,r.stderr[-300:])
if __name__=='__main__':
    with ThreadPoolExecutor(4) as ex: list(ex.map(render,range(len(SHOTS))))
    lst=open(S+'/cm/shots.txt','w')
    for i in range(len(SHOTS)): lst.write(f"file shots/s{i:02d}.mp4\n")
    lst.close()
    # black lead-in (0 -> T0) + concat
    nb=FR(SHOTS[0][0])
    subprocess.run(['ffmpeg','-y','-v','error','-f','lavfi','-i',f'color=black:s=1080x608:r=30,format=yuv420p','-frames:v',str(nb),'-c:v','libx264','-crf','12','shots/black.mp4'],cwd=S+'/cm')
    open(S+'/cm/shots.txt','w').write("file shots/black.mp4\n"+"".join(f"file shots/s{i:02d}.mp4\n" for i in range(len(SHOTS))))
    r=subprocess.run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i','shots.txt','-c:v','libx264','-crf','12','-preset','fast','-pix_fmt','yuv420p','-t',str(DUR),'base.mp4'],cwd=S+'/cm',capture_output=True,text=True); print(r.returncode,r.stderr[-300:])
