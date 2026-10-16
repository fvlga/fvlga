# v16 = fresh collage (name/title cards after the intro become people footage) + title intro + kaleidoscope
#       + letterboxed performance cutaways + lip-synced verse + "alone" drop + ending, warm film grade on footage
import subprocess, json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)) + '/..')
O = '/home/user/fvlga/fvlga-visualizer'; B = '..'
with open('seg/c16list.txt', 'w') as f:
    for i in range(3): f.write(f"file '{os.path.abspath(B)}/c16part{i}.mp4'\n")
subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'seg/c16list.txt', '-c', 'copy', f'{B}/c16_full.mp4'], check=True)
cuts = json.load(open('allcuts.json')); perf = json.load(open('perf_jobs.json'))
psy = [x for x in json.load(open('psyche_cuts.json')) if x[1] > 8.14]
en_k = '+'.join(f'between(t,{max(a, 8.134):.3f},{b - 0.001:.3f})' for a, b in psy)
# warm "found footage" grade on every footage cut that isn't covered by a performance shot
FOOT = {'film', 'filmmirror', 'filmblue', 'filmflash', 'filmprism', 'chrome', 'gothic', 'artist', 'stack', 'smear', 'burst', 'filmtext'}
pt = [j['t0'] for j in perf]
iv = [(max(a, 8.134), b) for a, b, ty in cuts if ty in FOOT and b > 8.14 and a < 102.6 and not (65.1 < a < 69.2) and not any(abs(max(a, 8.134) - p) < 0.02 for p in pt)]
en_p = '+'.join(f'between(t,{a:.3f},{b - 0.001:.3f})' for a, b in iv)
S0, S1 = 38.2, 38.2 + 440 / 30
cues = [(a, b) for a, b, ty in cuts if ty in ('word', 'adlib', 'japan') and b > S0 and a < S1]
en_s = f'between(t,{S0},{S1:.3f})' + ''.join(f'*not(between(t,{a:.3f},{b - 0.001:.3f}))' for a, b in cues)
segs = [(f'seg/perf_{k}.mp4', j['t0']) for k, j in enumerate(perf)] + [('seg/drop_0.mp4', 65.13), ('seg/ending_0.mp4', 102.6)]
args = ['ffmpeg', '-nostdin', '-v', 'error', '-y', '-i', f'{B}/c16_full.mp4', '-i', 'intro.mp4', '-i', 'kaleido_full.mp4', '-i', f'{B}/song.mp3']
fc = ['[0:v]trim=start_frame=244,setpts=PTS-STARTPTS[rest]', '[1:v][rest]concat=n=2:v=1:a=0,fps=30[base]',
      f"[base][2:v]overlay=0:0:enable='{en_k}'[k]",
      f"[k]split[m][g];[g]crop=1080:608:0:656,eq=gamma=1.0:saturation=1.25:contrast=1.06,colorbalance=rs=0.1:bs=-0.12:rm=0.08:bm=-0.1,median=radius=2,unsharp=5:5:0.8[p];[m][p]overlay=0:656:enable='{en_p}'[gr]"]
last = 'gr'; k = 4
for f, a in segs:
    pad = 'tpad=start_mode=clone:start=2:stop_mode=clone:stop=3,' if 'perf' in f else ''
    off = f'({a}-2/30)' if pad else f'{a}'
    args += ['-i', f]; fc.append(f'[{k}:v]{pad}setpts=PTS-STARTPTS+{off}/TB[s{k}]')
    fc.append(f'[{last}][s{k}]overlay=0:0:eof_action=pass[v{k}]'); last = f'v{k}'; k += 1
args += ['-i', 'seg/perf_sync.mp4']
fc.append(f'[{k}:v]tpad=start_mode=clone:start=2:stop_mode=clone:stop=3,setpts=PTS-STARTPTS+({S0}-2/30)/TB[sy]')
fc.append(f"[{last}][sy]overlay=0:0:eof_action=pass:enable='{en_s}'[fin]")
args += ['-filter_complex', ';'.join(fc), '-map', '[fin]', '-map', '3:a', '-t', '105.9', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', f'{O}/cuff_no_dancer_v16_full.mp4']
print(len(segs) + 1, 'overlay shots,', len(iv), 'graded footage cuts'); subprocess.run(args, check=True)
