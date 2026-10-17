# CUFF NO DANCER v55 - update plan (after WATCHING v54)

Frames: /tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad/cdview54/ (main_1-3 = every 3 s, seg_0 = 0-7 s at 1 s, seg_64 = 64-70 s, seg_99 = 99-105 s, s77 = 77-83 s, s11, d8 = 8-14 s at 0.5 s, d24 = 24-30 s at 0.5 s). Caveat: the labels on main_1 between 9 and 24 s run up to ~1.5 s early; every timestamp below comes from the frame-exact strips or from osa.html CAPS.

## 0. What I saw (protect this)
- 0-8: pure dark teal, "no" ghost over the beach crowd, then cuff no dancer / bands / hands / gold / outside slam in cream Playfair with a pink marker underline, and the collage title (cuff/no/dancer stacked over the barn) at 7.0-8.1. Strong, one typeface, leave alone.
- 8.1-13.25: pavement kids -> mattress slide (two shots) -> navy flower boy -> grass boy -> barn man -> swimmer -> beach hug -> boats; quote "some of us only come alive at night" rides the whole pre-hook. Hook 1 begins on a wide, low-contrast boats shot with a tiny quote ("everyone was gone by the second verse"): the song's biggest moment arrives as a plain hard cut with nothing saying "new section".
- 24-27 (end of hook 1): frosted "bands up" wall + yellow giant "up" / "hands" with RGB split. Best graphic moment of the video. Leave.
- 27-44: navy neon-edge faces, halftone faces, "count the money twice" terminal quote: lovely, protect.
- 45 "spinning" (yellow giant, readable), 51 "japan" on dark red with a "no flash" band (readable, brand red works). 63-64.5 "contraband" is pale-green on pale-blue footage: nearly invisible, the weakest giant word.
- 65.13-69.25 "alone": warm peach/amber field at golden hour, one tiny figure, bands stack one per bar (1 band at 65, 2 at 66, 3 at 67-68). It is the best colour moment, but by 67-68.5 three cream bands cover the middle of the frame and the figure is only a speck behind the glass; the word "alone" is tiny at the bottom. The vocal gap 66.6-67.7 is the quiet bar and it is not exploited.
- 69.25 "two roads" water -> 71.5-79.6 instrumental bridge: quote-driven (Frost quote, "there is nothing either good or bad", "we're all mad here", "the weather") and pale. 78-79.8 the picture is nearly white (cloud/sky + book-page "The Weather" text barely readable) then the white flash into hook 2 at 79.43-79.8. 16.37-16.97 is the same problem (white sky + X, mean luma blown).
- 79.8-83.3: selfie of a man in a doorway, warm natural colour, NOT teal and NOT halftone, under the "stay outside" wall (this is the only warm/natural clip after the alone shot and it reads as a different video).
- 84-86 3x2 tile grid (liked), 87 waves with script quote, 89.5-99.9: the red-shirt boy appears in ~four consecutive shots (back view 90, walking 93, dark pebble 96 w/ quote, close crouch 98-100). Quote "so we beat on, boats against the current..." at 98-100 is drawn straight over his torso/face, dark ink on dark shirt.
- 99-102.4: pale/white "the only way to get rid of a temptation" frame (near empty) -> pixel-scatter cut to the chrome FVLGA card 103-105.3 -> fade to black. The white frame before the dark purple card is the harshest brightness jump in the video.
- Sticker: holds spots, colour follows the scene, hidden at 'alone' and ending: working. Captions, bars (pure black) fine.
- No cut-out of the artist full-body is on screen anywhere (only halftone faces). "Less, not none" says 2-3 small ones.
- Red-shirt boy count: ~10.5 (grass), ~12 (swimmer, red top), ~90, ~93, ~96-100: 4 of 5 are in the last 10 s.

## 1. Plan: 10 changes (A = cheap, B = rebuild)

### A. Cheap (overlay osa.html, or stage-C ffmpeg on the finished picture; no re-render of the collage)

**A1. Kill the blown whites (compose).** 16.30-17.10, 78.0-79.43 (already in BAD but still pale in my frames), 101.4-102.4.
Why: 16.4 and 78-79.4 read as dropouts (white sky, unreadable text); artist-level quality issue listed in qa_v47 and still present.
How: in stage C (build_v53c.py chain, on the `[rg1]` crop branch, which is applied BEFORE the overlay so text is untouched) add a highlight clamp, separate from the BAD desaturation: `curves=all='0/0 0.55/0.5 0.85/0.66 1/0.74':enable='between(t,16.3,17.1)+between(t,78.2,79.43)+between(t,101.4,102.4)'` and add (15.4,17.8) to BAD so 16.4 also gets the teal colourbalance. Keep the intentional flash 79.43-79.8 but trim it: `eq=brightness=0.35:enable='between(t,79.43,79.57)'` (4 frames of white) then a 0.5 s teal decay is handled by A2.

**A2. Section colour decays instead of identical cuts (overlay).** Hook 1 13.25, verse 27.3, verse 2 53.7, hook 2 79.6, after-alone 69.25. Learned from CUT HER MIC: the grade stays teal; the colour is a 0.4-0.6 s wash that dies, hard cut underneath.
In osa.html render(t), immediately after `ctx.clearRect(0,0,W,H);` and before the early `return` for t<8.134 stays valid (all times >8.134), add:
`const WASH=[[13.25,'228,255,63',.38,.55],[27.3,'27,42,138',.45,.6],[53.7,'107,15,18',.38,.5],[69.25,'255,196,150',.34,.55],[79.6,'228,255,63',.42,.6]]; for(const [t0,c,a,d] of WASH){const u=(t-t0)/d; if(u>=0&&u<1){ctx.fillStyle='rgba('+c+','+(a*(1-u)*(1-u))+')'; ctx.fillRect(0,0,W,H);}}`
Colours = brand set: neon yellow #E4FF3F for both hooks (same colour = same idea), deep navy #1B2A8A for verse 1 (faces are navy already), dark red #6B0F12 for verse 2 (japan block red arrives at 51), warm peach after the alone shot (continues its golden light). It is drawn before captions/quotes so type stays crisp. Hard cuts stay hard.

**A3. Let "alone" breathe (overlay).** 65.13-69.25.
Why: the three bands bury the speck of a figure at 67-68.9 which is the whole point of the breakdown; vocal gap 66.6-67.7 is the quiet bar.
In osa.html, in the `if (inDrop)` loop: multiply the band alpha by a ramp-out `const fade=t<66.6?1:Math.max(0.3,1-(t-66.6)/1.2)` for bands 0 and 1 and keep only band 2 (the lowest) full until 68.9, so the figure shows from 67.0; then add a vignette: `{const v=Math.min(1,Math.max(0,(t-66.6)/0.8))*0.45; const g=ctx.createRadialGradient(W/2,H/2,H*0.35,W/2,H/2,H*0.85); g.addColorStop(0,'rgba(20,10,0,0)'); g.addColorStop(1,'rgba(20,10,0,'+v+')'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);}` (inside inDrop, drawn first). The caption lift (H-120) stays. Last half-beat before 69.25: let the vignette snap off with the cut. Optional 1 s sound dip belongs to the audio mix (sfx), not the master.

**A4. Ending: dip through black instead of white pixel-scatter (compose).** 101.4-104.0.
Why: pale frame (mean ~200) -> dark purple card is a flash-bang; the CUT HER MIC fade_plan rule (dips at the ending) applies. The song ends on "boats against the current / borne back into the past", so a sinking dip fits the lyric.
How: stage C, right after the final overlay `fin` (applies to the strip only; bars are black anyway): `fade=t=out:st=100.9:d=1.2:color=black,fade=t=in:st=102.6:d=0.9:color=black` on the picture layer, and shift the pixel-scatter earlier or drop it (it would now play in black). Keep the existing last fade-to-black at ~105.2-105.9. Audio: `ffmpeg -ss 103 -i song_sfx30.wav -af volumedetect -f null -`; if the tail past 104.5 is above -40 dB add `afade=t=out:st=104.4:d=1.5` in the video's `-af` chain before alimiter (master untouched, keep < -1 dBTP).
Also add one slow glint on the chrome card (see A5-b in the build list): a diagonal white gradient band (alpha .25) sweeping once across 103.2-105.0 in osa.html is NOT possible (overlay returns at t>=102.6): so drop the `if (t<8.134||t>=102.6) return;` limit to 105.9 and draw only the glint beyond 102.6. Cost: 10 lines.

**A5. Selfie 79.8-83.3 back into the teal world (compose).**
Why: warm natural clip after the teal/halftone world; artist asked for halftone/teal on every face.
How: add (79.8, 83.8) to BAD (existing desaturate 0.34 + teal colourbalance + curves). It stays recognisably him, not halftone (true halftone = rebuild, optional). Keep the "stay outside" band.

**A6. Quote placement fixes (overlay).** 98-100 and 45-46.
Why: at 98.1-100 the quote sits on the boy's chest (ink on shirt), at 45 the small quote overlaps the start of giant "spinning", at 1:33 "hold fast to dreams" is the smallest text in the video.
In osa.html add after `quoteSlot` a pin table: `const QPIN={29:[4]...}` is bar-indexed, so use k = floor((t - A.t0)/(8*bp)); pin the two windows to the opposite side from the subject: 98-100 -> slot index 1 (top-right, W-470,40) if the boy is bottom-left, else 0; 45-46 -> slot 4 (bottom-left, above caption). Easier rule: in quoteSlot() treat the whole picture region of the last 12 s and the giant-word bars (45, 51, 63, 25) as "face boxes" by pushing synthetic boxes into `facesBetween()`: `if (t0<46&&t1>44.8) r.push([20,140,W-20,380])` for the giant word band; for 98-100 push the boy box [300,120,820,H] so the slot loop moves the quote to the free corner. Also raise the font of style 5/4 quotes from 25px to 28px when `lum<0.45`.

### B. Rebuild-level (re-render collage / swap footage)

**B1. Red-shirt boy: spread, don't stack (89.5-100).**
Why: 4 of his ~5 shots are in the last 10 s (back 90, walking 93, dark pebble 96, close crouch 98-100) and the quote lands on him; artist wants less, not none.
How: keep 10.5 (grass, intro run-in), keep ONE ending shot (the 98-100 crouch is the best "borne back into the past" picture; its quote moves per A6), replace the 90, 93 and 96 shots with non-boy footage (river/boats/girl-on-bike/barn-field clips from footage_manifest.json that are not used after 70 s; use the beach-run and the girl on the bike) and also drop the ~12 swimmer if it is the same boy. Target total: 3 short shots (10.5, ~55 s one if a calm place exists, 98-100), never adjacent. Check footage_people.txt for the clip ids marked "boy/red".

**B2. Repeated barn/fisherman shot.** The barn + man at the fence shows at 7.0 (title), ~11.0, ~57, ~75. Keep 7.0 and 11.0; swap 57 and 75 for fresh footage (boats, water, pavement kids from later windows are all taken, so pull 2 new 1960s clips; give footage-scout this brief if none left: Prelinger/archive.org 16mm "picnic", "lake swimming", "bicycle street", teal-gradable, no readable faces). Also fixes "repeated shots" open in qa_v48.

**B3. "contraband" giant word (63.0-64.7) and a second giant word per hook.**
Why: pale green on pale blue, unreadable, while "spinning" and "japan" read fine. Hooks 1 and 2 have almost no giant words except at 24.5-26.5, so hook 2 (79.6-95) feels like mostly selfie + wall.
How: in the collage builder re-style "contraband" as the same neon yellow #E4FF3F italic 900 with the red/cyan split used on "spinning", drop the 0.55 opacity, 86% width. Add two giant words at the same style: "cuff" at 83.1-83.7 (lyric "i know i can not cuff no dancer", also echoes the title; first time the title word is seen after the intro) and "alone"-free hook 1: "bands" at 19.5-20.2. Beat-align to bar starts (bar=1.62 s, t0 from analysis.json).

**B4. Artist cut-outs: two small ones, nowhere else (style.md: 2-3 short moments, never the intro, never key words).**
Where: (1) 36.0-37.6 under "the city sounds better from a distance": small full-body cut-out, 62% pulled back, halftone teal, bottom-right, 0.6 s; (2) 91.5-92.3 in place of one swapped boy shot (B1) as a second small walking figure, same treatment; skip 'alone' (keep the pure figure on the field). Use the existing halftone pipeline (src/cutstill.py + gridalone.py cut-outs); both fade in 0.3 s/out 0.3 s, never lip-synced.

## 2. Not touching
Intro 0-8, 24-27 wall + giant words, navy/halftone faces 27-44, "japan" red block, 84.3-86.4 tile grid, sticker logic (holds >= 7 s, colour follows scene), black bars, caption style, quote style (no backgrounds, no author names), audio master.

## 3. Build order and checks
1. A1, A4, A5 in stage C (new build_v55c.py copied from v53c, change the output name); 2. A2, A3, A6, A4-glint in osa.html, re-run the 4 osachunk renders into osa_full.mov; 3. Stage C once; verify frames 16.4, 69.3, 78.6, 79.5-80, 83, 101.5-103, 105.5; true peak < -1 dBTP. 4. Then B1-B4 as the second pass (re-render pre33 layers), re-run A.
Open questions (defaults): (1) wash colours as listed? default yes; (2) second giant words "cuff"/"bands" ok? default yes; (3) cut-out budget 2? default 2.
