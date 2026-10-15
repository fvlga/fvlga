import sys,json,numpy as np
sr=22050; x=np.frombuffer(sys.stdin.buffer.read(),dtype=np.float32)
hop=256; win=1024; n=(len(x)-win)//hop; fps=sr/hop; w=np.hanning(win)
S=np.array([np.abs(np.fft.rfft(x[i*hop:i*hop+win]*w)) for i in range(n)])
L=np.log1p(S*10); flux=np.maximum(0,np.diff(L,axis=0)).sum(1); flux=np.concatenate([[0],flux])
flux=flux-np.convolve(flux,np.ones(32)/32,'same'); flux=np.maximum(flux,0)
def score(bpm):
    p=60*fps/bpm; best=(0,0)
    for ph in np.linspace(0,p,40,endpoint=False):
        idx=np.arange(ph,n-1,p).astype(int); s=flux[idx].mean()
        if s>best[0]: best=(s,ph)
    return best
bpms=np.arange(60,190,0.25); sc=np.array([score(b)[0] for b in bpms])
top=bpms[np.argsort(sc)[::-1][:10]]; print('top',[float(b) for b in top])
for b in sorted(set(np.round(top))):
    print(b,'score %.3f'%score(b)[0],' half %.3f'%score(b/2)[0] if b/2>=40 else '', ' double %.3f'%score(b*2)[0] if b*2<400 else '')
b=float(top[0]); s,ph=score(b)
json.dump({'bpm':round(b,2),'t0':round(ph/fps,3)},open('grid.json','w')); print('chosen',b,'t0',ph/fps)
