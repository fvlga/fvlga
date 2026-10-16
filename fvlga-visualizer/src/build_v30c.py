# v22 stage C: pre22 (all picture layers + RGB hum) + each transition clip at its frame + caption/zine layer + song
import json, subprocess
S = '/tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad'; V = f'{S}/bands/vfx'
tr = json.load(open(f'{S}/trans30/trans22.json'))
args = ['ffmpeg', '-nostdin', '-v', 'error', '-y', '-i', f'{S}/bands/pre30.mp4', '-i', f'{S}/song_sfx30.wav']
fc, last = [], '0:v'
for k, t in enumerate(tr):
    args += ['-i', t['clip']]; i = k + 2
    fc.append(f"[{i}:v]setpts=PTS-STARTPTS+{t['start_frame']}/30/TB[c{i}]"); fc.append(f"[{last}][c{i}]overlay=0:656:eof_action=pass[x{i}]"); last = f'x{i}'
i = len(tr) + 2; args += ['-i', f'{V}/osa_full.mov']
fc.append(f'[{i}:v]setpts=PTS-STARTPTS+8.134/TB[oz]'); fc.append(f'[{last}][oz]overlay=0:656:eof_action=pass[fin]')
args += ['-filter_complex', ';'.join(fc), '-map', '[fin]', '-map', '1:a', '-t', '105.9', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
         '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '/home/user/fvlga/fvlga-visualizer/cuff_no_dancer_v30_full.mp4']
print(len(tr), 'transition clips'); subprocess.run(args, check=True)
