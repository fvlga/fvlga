#!/bin/bash
cd $(dirname $0); G=$(cat grade.txt)
GL="between(t,49.55,49.95)+between(t,50.85,51.25)"
ffmpeg -y -v error -i base.mp4 -f concat -safe 0 -i cat_rgba.txt -f concat -safe 0 -i cat_mask.txt -i audio48.wav -filter_complex "\
[0:v]tpad=stop_mode=clone:stop_duration=0.3,${G},fade=t=out:st=86.9:d=2.5:color=black,split=3[g0][g1][g2];\
[g1]crop=1080:150:0:130[s1];[g2]crop=1080:90:0:400[s2];\
[g0][s1]overlay=x=70:y=130:enable='${GL}'[t1];[t1][s2]overlay=x=-90:y=400:enable='${GL}'[t2];\
[t2]rgbashift=rh=9:bh=-9:gv=3:enable='${GL}',format=gbrp,split[a][b];[b]gblur=sigma=16[bb];[2:v]format=gbrp[m];[a][bb][m]maskedmerge[fr];\
[fr]format=rgba[f2];[f2][1:v]overlay=format=auto,pad=1080:1920:0:656:black,format=yuv420p[o]" -map "[o]" -map 3:a -c:v libx264 -crf 17 -preset medium -c:a aac -b:a 256k -t 89.42 -movflags +faststart cm_v1.mp4 && echo compose-done
