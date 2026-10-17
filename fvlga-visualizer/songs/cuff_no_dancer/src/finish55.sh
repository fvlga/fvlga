set -e
S=/tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad; B=$S/bands; V=$B/vfx; export PW=/opt/node22/lib/node_modules/playwright
cd $V; node osachunk.js 8.134 2835 osa_full_v55.mov
python3 -I seg/v55c.py
O=/home/user/fvlga/fvlga-visualizer; cd $O; P=$S/p55
ffmpeg -nostdin -v error -y -i cuff_no_dancer_v55_full.mp4 -c:v libx264 -preset slow -b:v 1950k -pass 1 -passlogfile $P -an -f mp4 /dev/null
ffmpeg -nostdin -v error -y -i cuff_no_dancer_v55_full.mp4 -i $S/audio48.wav -map 0:v -map 1:a -c:v libx264 -preset slow -b:v 1950k -pass 2 -passlogfile $P -c:a aac -b:a 256k -movflags +faststart -shortest cuff_no_dancer_visualizer_v55.mp4
ss=14.605; d=14.594; fo=$(python3 -c "print($d-0.15)")
ffmpeg -nostdin -v error -y -ss $ss -i cuff_no_dancer_v55_full.mp4 -ss $ss -i $S/audio48.wav -t $d -map 0:v -map 1:a -c:v libx264 -preset slow -b:v 9000k -pix_fmt yuv420p -af "afade=t=in:st=0:d=0.15,afade=t=out:st=$fo:d=0.15" -c:a aac -b:a 256k -movflags +faststart shorts/cuff_no_dancer_v55_tiktok_15s.mp4
clamscan --no-summary cuff_no_dancer_visualizer_v55.mp4 shorts/cuff_no_dancer_v55_tiktok_15s.mp4
ffmpeg -nostdin -v error -i cuff_no_dancer_v55_full.mp4 -vf "crop=1080:600:0:0,scale=32:16,format=gray" -f rawvideo - | python3 -c "import sys,numpy as np;a=np.frombuffer(sys.stdin.buffer.read(),np.uint8).reshape(-1,512).mean(1);print('frames',len(a),'leaks',int((a>12).sum()))"
echo ALL-DONE55
