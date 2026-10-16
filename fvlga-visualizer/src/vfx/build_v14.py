# v14 = v13 + re-rendered performance cutaways (8-clip pool) + lip-synced verse (clip 4, 38.2-52.87s)
#       with the word/ad-lib/Japan cue cards still flashing through on their lyric hits
import subprocess, json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)) + '/..')
O = '/home/user/fvlga/fvlga-visualizer'
S0, S1 = 38.2, 38.2 + 440 / 30
cues = [(a, b) for a, b, ty in json.load(open('allcuts.json')) if ty in ('word', 'adlib', 'japan') and b > S0 and a < S1]
en = f'between(t,{S0},{S1:.3f})' + ''.join(f'*not(between(t,{a:.3f},{b - 0.001:.3f}))' for a, b in cues)
segs = [(f'seg/perf_{k}.mp4', str(j['t0'])) for k, j in enumerate(json.load(open('perf_jobs.json')))]
args = ['ffmpeg', '-nostdin', '-v', 'error', '-y', '-i', f'{O}/cuff_no_dancer_v13_full.mp4']
fc = []; last = '0:v'
for k, (f, a) in enumerate(segs, 1):
    args += ['-i', f]; fc.append(f'[{k}:v]setpts=PTS-STARTPTS+{a}/TB[s{k}]')
    fc.append(f'[{last}][s{k}]overlay=0:0:eof_action=pass[v{k}]'); last = f'v{k}'
k = len(segs) + 1; args += ['-i', 'seg/perf_sync.mp4']
fc.append(f'[{k}:v]setpts=PTS-STARTPTS+{S0}/TB[sy]'); fc.append(f"[{last}][sy]overlay=0:0:eof_action=pass:enable='{en}'[fin]")
args += ['-filter_complex', ';'.join(fc), '-map', '[fin]', '-map', '0:a', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'copy', f'{O}/cuff_no_dancer_v14_full.mp4']
print(len(cues), 'cue cards kept in the lip-sync verse'); subprocess.run(args, check=True)
