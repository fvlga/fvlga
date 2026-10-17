# v22 stage C: pre22 (all picture layers + RGB hum) + each transition clip at its frame + caption/zine layer + song
import json, subprocess
S = '/tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad'; V = f'{S}/bands/vfx'
tr = json.load(open(f'{S}/trans30/trans22.json'))
args = ['ffmpeg', '-nostdin', '-v', 'error', '-y', '-i', f'{S}/bands/pre33.mp4', '-i', f'{S}/song_sfx30.wav']
fc, last = [], '0:v'
for k, t in enumerate(tr):
    args += ['-i', t['clip']]; i = k + 2
    fc.append(f"[{i}:v]setpts=PTS-STARTPTS+{t['start_frame']}/30/TB[c{i}]"); fc.append(f"[{last}][c{i}]overlay=0:656:eof_action=pass[x{i}]"); last = f'x{i}'
# 3x2 tile-grid cards (osamason banner look) on two held shots
GR = [(31.7, 33.253), (84.334, 86.4)]
args += ['-loop','1','-framerate','30','-i', f'{S}/grid_a.png', '-loop','1','-framerate','30','-i', f'{S}/grid_b.png']
ia, ib = len(tr) + 2, len(tr) + 3
for gi, (a, b) in enumerate(GR):
    fc.append(f"[{last}][{ia}:v]overlay=0:656:enable='between(t,{a},{a+0.13})'[ga{gi}]")
    fc.append(f"[ga{gi}][{ib}:v]overlay=0:656:enable='between(t,{a+0.13},{b})'[gb{gi}]"); last = f'gb{gi}'
BAD = [(15.4, 17.8), (79.8, 83.8), (8.0, 15.4), (21.2, 22.4), (36.4, 37.2), (58.2, 58.6), (101.4, 102.4), (17.8, 21.2), (22.4, 24.7), (28.2, 29.9), (31.6, 34.9), (35.8, 36.5), (53.4, 58.2), (61.0, 65.0), (70.5, 71.6), (71.9, 77.5), (78.0, 79.4), (83.8, 84.4), (86.4, 87.9), (91.0, 95.2), (95.0, 102.4)]
en = '+'.join(f'between(t,{a},{b})' for a, b in BAD)
fc.append(f"[{last}]split[rg0][rg1]")
fc.append(f"[rg1]crop=1080:608:0:656,eq=saturation=0.34:contrast=0.98:gamma=1.05:enable='{en}',colorbalance=rs=-0.28:gs=0.02:bs=0.28:rm=-0.2:gm=0.04:bm=0.2:rh=-0.1:bh=0.1:enable='{en}',curves=all='0/0 0.8/0.74 1/0.84':enable='{en}',curves=all='0/0 0.55/0.5 0.85/0.66 1/0.74':enable='between(t,16.3,17.1)+between(t,78.2,79.43)+between(t,101.4,102.4)',eq=gamma=1.35:brightness=0.035:enable='between(t,27.5,28.5)+between(t,37.7,38.2)+between(t,49.0,49.6)+between(t,69.7,70.3)+between(t,77.4,77.95)+between(t,85.5,86.1)+between(t,99.7,100.3)'[rgs]")
fc.append("[rg0][rgs]overlay=0:656[rgo]"); last = 'rgo'
i = len(tr) + 4; args += ['-i', f'{V}/osa_full_v55.mov']
fc.append(f'[{i}:v]setpts=PTS-STARTPTS+8.134/TB[oz]'); fc.append(f'[{last}][oz]overlay=0:656:eof_action=pass[fz];[fz]drawbox=0:0:1080:656:black:fill,drawbox=0:1264:1080:656:black:fill,fade=t=in:st=0:d=0.8:color=black,eq=brightness=-if(lt(t\\,100.9)\\,0\\,if(lt(t\\,102.1)\\,(t-100.9)/1.2\\,if(lt(t\\,102.6)\\,1\\,if(lt(t\\,103.5)\\,1-(t-102.6)/0.9\\,0)))):eval=frame,fade=t=out:st=104.3:d=1.6:color=black[fin]')
args += ['-filter_complex', ';'.join(fc), '-map', '[fin]', '-map', '1:a', '-t', '105.9', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
         '-pix_fmt', 'yuv420p', '-af', 'alimiter=limit=0.84:attack=2:release=40', '-c:a', 'aac', '-b:a', '192k', '/home/user/fvlga/fvlga-visualizer/cuff_no_dancer_v55_full.mp4']
print(len(tr), 'transition clips'); subprocess.run(args, check=True)
