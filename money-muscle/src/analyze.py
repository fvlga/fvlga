import sys, json, numpy as np
sr=22050; fps=30
x=np.frombuffer(sys.stdin.buffer.read(),dtype=np.float32)
hop=sr//fps; win=2048; n=len(x)//hop
pad=np.concatenate([x,np.zeros(win)])
w=np.hanning(win); freqs=np.fft.rfftfreq(win,1/sr)
bands={'bass':(25,160),'mid':(160,2000),'high':(2000,9000)}
out={k:[] for k in ['rms','bass','mid','high']}; flux=[]; prev=None
for i in range(n):
    f=pad[i*hop:i*hop+win]*w; mag=np.abs(np.fft.rfft(f))
    out['rms'].append(float(np.sqrt((x[i*hop:(i+1)*hop]**2).mean()) if i*hop<len(x) else 0))
    for k,(a,b) in bands.items(): out[k].append(float(mag[(freqs>=a)&(freqs<b)].mean()))
    lb=np.log1p(mag[freqs<200]); flux.append(0 if prev is None else float(np.maximum(0,lb-prev).sum())); prev=lb
for k in out:
    v=np.array(out[k]); v=v/np.percentile(v,99.5); out[k]=np.clip(v,0,1).round(3).tolist()
flux=np.array(flux); flux=flux/np.percentile(flux,99.5)
# beats: peak picking on bass flux with adaptive threshold, min gap 0.25s
beats=[]; gap=int(0.25*fps)
for i in range(2,n-2):
    loc=flux[max(0,i-15):i+15]
    if flux[i]==loc.max() and flux[i]>loc.mean()+0.35 and flux[i]>0.25 and (not beats or i-beats[-1]>=gap):
        beats.append(i)
# sections from smoothed energy
rms=np.array(out['rms']); sm=np.convolve(rms,np.ones(fps*2)/(fps*2),'same')
quiet=sm<0.45*np.median(sm[sm>0.1])
secs=[]; cur=quiet[0]; start=0
for i in range(1,n):
    if quiet[i]!=cur and i-start>fps*4:
        secs.append({'start':round(start/fps,2),'end':round(i/fps,2),'kind':'calm' if cur else 'hype'}); start=i; cur=quiet[i]
secs.append({'start':round(start/fps,2),'end':round(n/fps,2),'kind':'calm' if cur else 'hype'})
json.dump({'fps':fps,'frames':n,'duration':round(len(x)/sr,3),'beats':[round(b/fps,3) for b in beats],'sections':secs,**out},open('analysis.json','w'),separators=(',',':'))
print('frames',n,'beats',len(beats)); [print(s) for s in secs]
ib=np.diff(beats)/fps; print('median beat gap %.3fs -> %.1f BPM'%(np.median(ib),60/np.median(ib)))
