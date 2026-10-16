# v19 (QA fixes, serif kinetic type, more footage, better captions) = fresh collage (name/title cards after the intro become people footage) + title intro + kaleidoscope
#       + letterboxed performance cutaways + lip-synced verse + "alone" drop + ending, warm film grade on footage
import subprocess, json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)) + '/..')
O = '/home/user/fvlga/fvlga-visualizer'; B = '..'
with open('seg/c26list.txt', 'w') as f:
    for i in range(3): f.write(f"file '{os.path.abspath(B)}/c26part{i}.mp4'\n")
subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'seg/c26list.txt', '-c', 'copy', f'{B}/c26_full.mp4'], check=True)
cuts = json.load(open('allcuts.json')); perf = json.load(open('perf_jobs.json'))
pf = []   # kaleidoscope back on all its cuts
psy = []   # v26: no kaleidoscope overlay anywhere   # half the kaleidoscope cuts are footage now
en_k = '+'.join(f'between(t,{max(a, 8.134):.3f},{b - 0.001:.3f})' for a, b in psy) or '0'
# warm "found footage" grade on every footage cut that isn't covered by a performance shot
FOOT = {'film', 'filmmirror', 'filmblue', 'filmflash', 'filmprism', 'chrome', 'gothic', 'artist', 'stack', 'smear', 'burst', 'filmtext'}
pt = [j['t0'] for j in perf]
iv = [(max(a, 8.134), b) for a, b, ty in cuts if ty in FOOT and b > 8.14 and a < 102.6 and not (65.1 < a < 69.2) and not any(abs(max(a, 8.134) - p) < 0.02 for p in pt)]
en_p = '+'.join(f'between(t,{a:.3f},{b - 0.001:.3f})' for a, b in iv)
S0, S1 = 38.2, 38.2 + 440 / 30
cues = [(a, b) for a, b, ty in cuts if ty in ('word', 'adlib', 'japan') and b > S0 and a < S1]
en_s = f'between(t,{S0},{S1:.3f})' + ''.join(f'*not(between(t,{a:.3f},{b - 0.001:.3f}))' for a, b in cues)
segs = [(f'seg/perf_{k}.mp4', j['t0']) for k, j in enumerate(perf)] + [('seg/drop_0.mp4', 65.13), ('seg/ending_0.mp4', 102.6)]
args = ['ffmpeg', '-nostdin', '-v', 'error', '-y', '-i', f'{B}/c26_full.mp4', '-i', 'intro.mp4', '-i', 'kaleido_full.mp4', '-i', f'{B}/song.mp3']
fc = ['[0:v]trim=start_frame=244,setpts=PTS-STARTPTS[rest]', '[1:v][rest]concat=n=2:v=1:a=0,fps=30[base]',
      f"[base][2:v]overlay=0:0:enable='{en_k}'[k]",
      ]
last = 'k'; k = 4
for f, a in segs:
    pad = 'tpad=start_mode=clone:start=2:stop_mode=clone:stop=3,' if 'perf' in f else ''
    off = f'({a}-2/30)' if pad else f'{a}'
    args += ['-i', f]; fc.append(f'[{k}:v]{pad}setpts=PTS-STARTPTS+{off}/TB[s{k}]')
    fc.append(f'[{last}][s{k}]overlay=0:0:eof_action=pass[v{k}]'); last = f'v{k}'; k += 1
args += ['-i', 'seg/perf_sync.mp4']
fc.append(f'[{k}:v]tpad=start_mode=clone:start=2:stop_mode=clone:stop=3,setpts=PTS-STARTPTS+({S0}-2/30)/TB[sy]')
fc.append(f"[{last}][sy]overlay=0:0:eof_action=pass:enable='{en_s}'[sv]")
# teal-cyan desaturated grade (osamason) on footage, performance and lip-sync shots; giant yellow type / colour blocks stay loud
en_perf = '+'.join(f"between(t,{j['t0'] - 0.07:.3f},{j['t0'] + j['n'] / 30:.3f})" for j in perf)
blocks = [(a, b) for a, b, ty in cuts if ty in ('word', 'adlib', 'japan')]
en_t = f"between(t,8.134,102.6)*not(between(t,65.1,69.2))*not({en_k})" + ''.join(f"*not(between(t,{a:.3f},{b - 0.001:.3f}))" for a, b in blocks)   # teal on everything but colour blocks / kaleidoscope / alone
fc.append(f"[sv]split[m2][g2];[g2]crop=1080:608:0:656,eq=saturation=0.55:contrast=1.1:gamma=0.95,colorbalance=rs=-0.28:gs=0.02:bs=0.26:rm=-0.2:gm=0.06:bm=0.16:rh=-0.06:gh=0.02:bh=0.06[tq];[m2][tq]overlay=0:656:enable='{en_t}'[gt]")
# zine/caption layer (transparent) over the strip from the end of the intro to the outro
# v21: "not alone" — the artist's cut-outs pop up as stickers on the beat over the alone shot, under the caption layer
args += ['-i', '/tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad/stick/stickers.mov']; fc.append(f'[{k + 1}:v]setpts=PTS-STARTPTS+65.133/TB[stk]'); fc.append("[gt2][stk]overlay=0:656:eof_action=pass[gs]")
# v23: hook 2 enters through the artist's own exposure burn — their stairs clip, teal-graded, 2 bars from 79.469 (frame 2385)
args += ['-i', '/tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad/stairs23.mp4']; fc.append(f'[{k + 2}:v]setpts=PTS-STARTPTS+2385/30/TB[st]'); fc.append("[gt][st]overlay=0:656:eof_action=pass[gt2]")
# v24 stage A (v23 + artist-in-the-crystal-ball kaleidoscope) (v22 + stairs burn clip + all-outfit stickers): everything under the caption layer + osamason constant 3px RGB hum after the intro -> pre22.mp4 (transitions get cut from this)
# v23: the artist's cut-outs also pop up around the Fvlga ring on the ending card, one per beat
args += ['-i', '/tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad/stick/stickers_end.mov']; fc.append(f'[{k + 3}:v]setpts=PTS-STARTPTS+102.6/TB[se]'); fc.append("[gs][se]overlay=0:656:eof_action=pass[gse]")
fc.append("[gse]rgbashift=rh=3:bh=-3:enable='between(t,8.134,102.6)'[hum]")
args += ['-filter_complex', ';'.join(fc), '-map', '[hum]', '-t', '105.9', '-c:v', 'libx264', '-preset', 'medium', '-crf', '12', '-pix_fmt', 'yuv420p', f'{B}/pre28.mp4']
print(len(segs) + 1, 'overlay shots,', len(iv), 'graded footage cuts'); subprocess.run(args, check=True)
