# v7 = fresh collage render (new lettering) + title intro + kaleidoscope + VFX/performance segments + warm film grade
import subprocess, json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)) + '/..')
O = '/home/user/fvlga/fvlga-visualizer'; B = '..'
with open('seg/c7list.txt', 'w') as f:
    for i in range(3): f.write(f"file '{os.path.abspath(B)}/c7part{i}.mp4'\n")
subprocess.run(['ffmpeg','-nostdin','-v','error','-y','-f','concat','-safe','0','-i','seg/c7list.txt','-c','copy',f'{B}/c7_full.mp4'],check=True)
segs = []
for l in open('seg/jobs.txt'):
    id, a = l.split()[:2]
    if id.startswith(('artist_', 'filmtext_')): continue      # new in-engine FVLGA card; filmtext gets its own look back
    segs.append((f'seg/{id}.mp4', a))
segs += [(f'seg/perf_{k}.mp4', str(j['t0'])) for k, j in enumerate(json.load(open('perf_jobs.json')))]
psy = [x for x in json.load(open('psyche_cuts.json')) if x[1] > 8.14]
en_k = '+'.join(f'between(t,{max(a,8.134):.3f},{b-0.001:.3f})' for a, b in psy)
iv = json.load(open('paint_cuts.json')); en_p = '+'.join(f'between(t,{a:.3f},{b-0.001:.3f})' for a, b in iv)
args = ['ffmpeg','-nostdin','-v','error','-y','-i',f'{B}/c7_full.mp4','-i','intro.mp4','-i','kaleido_full.mp4','-i',f'{B}/song.mp3']
fc = ['[0:v]trim=start_frame=244,setpts=PTS-STARTPTS[rest]', '[1:v][rest]concat=n=2:v=1:a=0,fps=30[base]',
      f"[base][2:v]overlay=0:0:enable='{en_k}'[k]"]
last = 'k'
for k, (f, a) in enumerate(segs, 4):
    args += ['-i', f]; fc.append(f'[{k}:v]setpts=PTS-STARTPTS+{a}/TB[s{k}]')
    fc.append(f'[{last}][s{k}]overlay=0:0:eof_action=pass[v{k}]'); last = f'v{k}'
fc.append(f"[{last}]split[m][g];[g]crop=1080:608:0:656,eq=gamma=1.45:saturation=2.2:contrast=1.2,colorbalance=rs=0.25:gs=0.05:bs=-0.3:rm=0.2:bm=-0.25:rh=0.1:bh=-0.15,median=radius=2,unsharp=5:5:1.0[p];[m][p]overlay=0:656:enable='{en_p}'[fin]")
args += ['-filter_complex', ';'.join(fc), '-map', '[fin]', '-map', '3:a', '-t', '105.9', '-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k', f'{O}/cuff_no_dancer_v7_full.mp4']
print(len(segs), 'segments'); subprocess.run(args, check=True)
