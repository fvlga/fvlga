# CUT HER MIC - fade plan (creative director, after WATCHING cm_v1.mp4)

## 0. Honesty: what I looked at before vs now
Last time I only read params.py / ov.html / concept.md. I had not seen one frame. This time I extracted the strip (y=656 h=608) every 3 s (30 frames, 3 contact sheets), plus 6-frame strips around 13.7, 30.9, 41.2, 44.6, 68.7, 82.4, plus 16-frame strips over the intro, the 20-31 s hook, the 47.6-52.6 burst/stamp and the 54-67 water verse. Files in /tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad/cdview/ (sheet_*.png, sec_*.png, burst.png, intro.png, hook1.png, v2.png).

## 1. What I actually saw
- 0-3.4: pure dark navy/black, only the caption and falling green "1"s. At 3.40 the pool-crowd shot is FULL strength on the very next frame (3.50) with the title ghost-slamming on top: a hard pop from black. Then a 6.9 s hold on one shot (3.4-10.29), good.
- 8.7-13.5 racks bands + burst of beat cuts (10.29, 11.15, 12.0, 12.87): works, it is punchy. Several clips show accidental motion-interpolation ghosting (10.0 doubled heads; 45.1-45.6 rapids/pebbles with an orange smear): the `framerate=interp` in shots.py already makes accidental double exposures, so a deliberate dissolve must look different (clean, symmetrical, 50% mix on purpose).
- 13.70 drop is a hard cut (waterski woman -> air-mattress), counter "092 DAYS" ghost-fades in over ~0.4 s (13.85 frame) and the seal fades in. The drop lands, but the counter arrival is soft.
- 30.94 hook to verse 1 is a hard cut from kids on grass to a man on a bike; the previous seal (green, bottom-right) and new seal (orange, bottom-left) cross-fade in ~0.15 s (visible at 30.80/30.90/31.05) and the quote dies under the cut. No colour change: the grade is the same warm sepia-green everywhere (verse 1 is not green, verse 2 is not teal, concept's section pushes were never built).
- 41.27 and 44.71 are plain hard cuts (diving pier -> man with fishing rod; surf -> rapids ghost). 68.8 hard cut 34-sign -> wall -> couple. All fine, but all of the section changes look identical to ordinary beat cuts: nothing says "new section".
- 49.55 / 50.9 stamp: white-wash hit, RGB tear, CUT HER at full centre; 3.4 s of 1-beat cuts underneath. Very strong. Leave it alone.
- 54-61.4: BUTTER, then dark river (c10, 3.4 s) then pool dive (c73, 3.4 s) with WATER/OTTER chrome and teal bands. Calm enough that two dissolves would suit it, but both cuts are hard now.
- 82.40-83.4: the worst moment. Bright foliage with a small red-top figure (check: could be the red-shirt kid, c58 at 82.3) hard-cuts to a NEAR-BLACK frame with only "000 DAYS" and a tiny sun disc; sunset c0 is almost black for the first ~1 s (82.4-83.4), it looks like a dropout, not a sunset. Sunset does not read until ~84.5. Final fade-to-black (86.9 +2.5 s, compose.sh) works and by 88.5 text sits on near black (good).
- Overlays that already fade (do not touch): quotes (1.0 s in/out), faces (0.5 s), title (0.35/0.6), outro text, sun disc, giant words (0.25 s out), size tags (0.2/0.3). Things that still pop: counter at the drop is soft (0.5 s, I want it hard), captions 0.04 s, seal handover 0.15 s, first footage frame at 3.40, the outro cut at 82.44.

## 2. Principle
The song has flat energy, so the edit supplies the dynamics. Hard cuts = flex/menace/burst. Fades = the song's one soft idea: "I don't really know how long we'll last" (summer is melting away). So fades go ONLY on: the entrance, the lines about "last/each other", the water verse, section-change decays, and the ending. Target: about 12 fades in 89 s against 49 shots (more than 75 % of cuts stay hard).

## 3. Hard cuts that MUST stay hard
- 10.287-13.729 racks burst (cuts at 10.287, 11.147, 12.008, 12.868) and the drop 13.729.
- 21.474-24.056 "for the summer" burst (21.474, 22.334, 23.195, 24.056), counter glitch/jump at 20.4/22.5/77.4.
- 48.151-51.594 burst (48.151, 49.012, 49.873, 50.733, 51.594), both stamps 49.55 / 50.9, their white hits, RGB tear (GL in compose.sh).
- 44.709 (start of verse 2), 61.921 (GLE), 77.411 (counter jump), 79.132/80.853 (summer/32 words).
- Every other 2-beat cut not listed below.

## 4. Fade list

| # | When (s) | What | Length | Why | Implementation |
|---|---|---|---|---|---|
| F1 | 3.402-4.60 | Slow rise of the first footage from black. Title slams on the kick over black, the pool crowd surfaces underneath | 36 f (1.2 s) | sells "first beat" as an entrance without losing the slam (title is the impact, not the clip) | compose.sh footage chain, directly after `tpad=...,${G}`: add `fade=t=in:st=3.402:d=1.2:color=black,` before the existing `fade=t=out`. Overlay (title, ones, caption) is composited after, unaffected |
| F2 | 18.892 | Dissolve shot 7 (c66 boat) into shot 8 (c69 horse), under "We might just be made for each other" | 18 f (0.6 s), starts ON the cut time | romance line, soft; quote "the summer keeps its own count" is on screen | xfade pre-build, see section 5 (DISSOLVE) key 8 -> 18 |
| F3 | 20.613-21.474 | Melt/double exposure: c68 (rowboats) dissolves in from the previous c69 and is replaced by the hard burst at 21.474 | 20 f (0.67 s) over a 26-frame shot | "how long we'll last": the picture literally does not finish forming. Then burst resumes hard | DISSOLVE key 9 -> 20 |
| F4 | 55.036 stays HARD; 58.478 | c10 river -> c73 pool/dive as dissolve on "ocean" (band starts 58.3) | 18 f | water verse, the one place for a calm cross-fade; teal bands already sit on 56.5-60.3 | DISSOLVE key 35 -> 18 |
| F5 | 75.69 | c14 bridge/road -> c48 clouds dissolve on "how long we'll last" (75.1); clouds are the best frame in hook 2 | 20 f | mirrors F3 in hook 2, gives the 2nd hook a different feel from hook 1 | DISSOLVE key 44 -> 20; leave 77.411 hard |
| C1 | 30.94 | Hook -> verse 1: colour decay. Green wash rgba(182,255,46) alpha .40 on the cut frame, easing to 0 over 0.5 s; hard cut underneath | 15 f decay | slime verse needs a different colour feel; no grade change exists today | ov.html render(t), right after the "kick breath" line: `{const u=(t-30.94)/0.5; if(u>=0&&u<1){ctx.fillStyle='rgba(182,255,46,'+(0.40*(1-ease(u)))+')';ctx.fillRect(0,0,W,H);}}` (drawn before bands, so text stays crisp) |
| C2 | 41.267 | Verse 1 -> short hook: warm-white decay #FFF1D6 alpha .45 -> 0 | 12 f | "light comes back" at "Shawty made me.."; cut stays hard | same block, colour rgba(255,241,214,...), t0=41.267, len 0.4 |
| C3 | 68.805 | Hook 2 entry: warm orange decay #FF8A3D alpha .35 -> 0 | 18 f | hook 2 should feel like dusk arriving (counter runs faster, sun lower) | same block, t0=68.805, len 0.6 |
| O1 | 13.71 | HARDEN the counter: it should slam with the drop, not ghost in over 0.4 s | 0.08 s in | the drop is a hard event; I saw the soft ghost at 13.85 | ov.html line ~109: `win(t, P.HOOK1, 86, 0.5, 1.0)` -> `win(t, P.HOOK1, 86, 0.08, 1.0)` |
| O2 | seal handovers 13.71/30.89/44.64/68.69 | Seal cross-fades between spots 0.15 s -> 0.5 s (still holds >= 7 s per spot) | 15 f | the pop at the section is the one overlay that looks like a glitch | where STICK windows are consumed (grep STICK in ov.html), set fade-in/out 0.5 |
| O3 | captions | in 0.04 -> 0.10 s, out 0.06 -> 0.12 s, EXCEPT 47.7-51.6 (burst) keep as is | 3 f | softer, less flicker on long lines | ov.html line ~118 `(t-cap[0])/0.04`, `(cap[1]-t)/0.06` |
| O4 | WATER 57.2, OTTER 60.9 | giant chrome words fade out 0.25 -> 0.5 s | 15 f | calm verse, chrome should linger | giantWord(): `dur - 0.25` -> `dur - 0.5` for those two words (add a per-word flag) |
| E1 | 81.5-82.44 + 82.44-84.4 | OUTRO: footage dips to black ending exactly on the bar (82.44), the sunset rises out of black over 2 s with its in-point moved ~1 s later so the glow is visible. Counter 000 and sun disc stay (they are overlay) | out 28 f, in 60 f | removes the dead near-black second; makes the cut to the final image deliberate | compose.sh chain: `fade=t=out:st=81.5:d=0.94:color=black,fade=t=in:st=82.44:d=2.0:color=black,fade=t=out:st=86.9:d=2.5:color=black` (several `fade` filters can be chained; the ones before the last must not clash in time). shots.py: for shot 48 (clip 0) set `off=30` (start_number +30) so the sun is already on the horizon |
| E2 | 86.4-89.4 | Audio fade-out matched to the picture (video only, master untouched) | 3 s | picture already fades; check the audio does too | first run `ffmpeg -ss 86 -i audio48.wav -af volumedetect -f null -`; if the last 2 s are above -40 dB add `-af afade=t=out:st=86.4:d=3.0` before the existing limiter chain |

## 5. Implementation of the dissolves (F2, F3, F4, F5) - shots.py, no change to length or timing
1. In params.py add `DISSOLVE={8:18, 9:20, 35:18, 44:20}` (key = INDEX of the incoming shot in SHOTS, value = frames).
2. In shots.py render(i): if `(i+1) in DISSOLVE`, render the shot with `nf+DISSOLVE[i+1]` frames (the footage simply keeps running, trim end_frame = nf+d; zoompan d=1 expression uses nf so keep it as the nominal count).
3. Build each transition clip: `ffmpeg -i s{i-1}.mp4 -i s{i}.mp4 -filter_complex "[0:v]trim=start_frame=NF_PREV:end_frame=NF_PREV+D,setpts=PTS-STARTPTS[a];[1:v]trim=end_frame=D,setpts=PTS-STARTPTS[b];[a][b]xfade=transition=fade:duration=D/30:offset=0,format=yuv420p" dx{i}.mp4` (NF_PREV = frames the previous shot nominally owns).
4. Assemble: for each shot write `s{i}` body = frames [d_in .. nf), where d_in = DISSOLVE.get(i,0); between bodies insert dx{i}. Re-encode once (crf 12) as the existing concat already does. Total frame count stays identical, so counter/overlay timing does not move.
5. Shot 9 is only 26 frames: F3 with D=20 leaves 6 frames of the shot visible; OK, it is meant as a melt.

## 6. Not doing (and why)
- No dissolve at 13.729, the stamp burst, or any beat-cut that carries a giant word: they would make the punch mushy.
- No fade-through-colour at 44.709: verse 2 should arrive as a clean hard cut after the quote and face.
- No 30-60 % double exposure of two mid-song shots beyond F3: the interpolation ghosting already gives accidental overlaps (10.0, 45.1-45.6), too many deliberate ones would look like the same artefact.
- Face prints, quotes, size tags, title already fade; do not add more fade time to them.

## 7. Build order and checks
1. compose.sh edits (F1, E1, E2) - cheap, no rerender of shots. 2. ov.html edits (C1-C3, O1-O4) then re-run render_ov.sh (all 4 chunks, rgba + mask). 3. params.py/shots.py DISSOLVE + c0 `off`, rebuild base.mp4, then compose. 4. Re-extract frames at 3.4/4.0/4.6, 18.9/19.2/19.6, 20.6/21.0/21.4, 30.9/31.1/31.4, 41.27/41.5, 58.5/58.8, 68.8/69.1, 75.7/76.1, 81.5/82.4/83/84, and the 15 s cut 44.3-59.3 (it contains F4 neither; unchanged except O4). 5. Verify true-peak < -1 dBTP on the video audio. 6. Verify c58 at 81-82.4 for the red-shirt boy (red top seen at 82.3) and swap clip if it is him.
