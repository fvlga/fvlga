# CUT HER MIC v4 FUSION: "SUMMER MART" (A receipt + one B twin + C end label)
Written 2026-10-17 by the creative director. Nothing is rendered. The artist's direction ("put all the ideas into one, guide it") is followed point by point. Disagreements are marked DISAGREE (one line each) and followed anyway.
Boards: `/home/user/fvlga/fvlga-visualizer/cut_her_mic_v4_fusion_animatic.jpg` (9 strip frames 1080x608 shown at 540 + legend) and `/home/user/fvlga/fvlga-visualizer/cut_her_mic_v4_fusion_layout.jpg` (4 frames in the 1080x1920 layout: twin, cut, declined, end label). Scripts: `/tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad/cm4f/` (plan.py = ledger + object-count checker, board.py).
Board honesty: footage = real frames with the REAL `grade.txt` run through ffmpeg; overlays, twin blend and slice are PIL mocks, no motion, no dissolves. Phone-size check was done on a 390 px contact sheet.

## 1. Pitch (one sentence)
A summer you pay for in days: a thermal receipt prints one priced line per lyric, the big DAYS LEFT number runs 092 to 000 at 82.44 s, the card is declined one day short at "for the summer" (77.4), and the video ends on a sunset with a care label that says SIZE 34 / DO NOT KEEP.

## 2. This song is about ___ but feels like ___
A fling he already plans to cut, but it feels like a shopping spree: every good thing is a purchase and the bill is the calendar.

## 3. Direction check (artist's 9 points)
1. ONE spine: the receipt replaces the v3 ticket (same top-right job, same "days" number, now with a consequence). Number is Inter ExtraBold 92 px (about 33 px on a phone) and never leaves the screen, even when giant words retract the item rows. Start 092, total spent 80 + 12 expired = 92, 000 at 82.44.
2. B = the twin at 20.4-24.3 only. The lane-black idea is folded into the cut at 49.55 (the lower half of the sliced frame slips away and leaves a black wedge). No two-lane layout, no rope.
3. C = end card only (woven label, SIZE 32 struck, 34 woven on, over the sunset) + the 32>34 line on the receipt at 66.7. No tape, no indigo.
4. Kept from v3: warm grade (grade.txt unchanged), frosted bands, chrome giants (WATER, OTTER, SUMMER), CUT HER stamp + glitch, fade_plan dissolves/fades (F1-F5, C1-C3, O1-O4, E1-E2), the round seal, 3 small halftone faces, red-shirt boy x3 short, no cut-outs of the artist (0 used; allowed, not needed).
5. Fonts: Inter + Playfair italic only. VT323 and Anton are gone (stamps are Inter Black). No outlines on words (stamp rectangles are the stamp shape). No boxes behind quotes. Receipt paper is an object. Caption pill (v3) stays, Inter 29 px.
6. Max 3 objects: receipt + seal + ONE other, enforced by `plan.py` (scans the timeline every 10 ms: max = 3, zero violations). Giants retract the item rows only.
7. Exactly 3 surprises: twin 20.4; slice+stamp 49.55; CARD DECLINED 77.4 then everything leaves at 82.44 except three quiet lines.
8. Verse 1 idea: SLIME TAX (section 6).
9. First 3 s: black strip, paper feeds down from the strip's top edge and prints, number ticks 092 > 091 at 0.8 (works muted).

DISAGREE 1: the receipt number stays visible through all 10 giants, so the top-right corner is never empty; I would let it leave entirely, but your "readable number" rule wins.
DISAGREE 2: four objects at once is where the v3 chaos came from; 3 is right but it forced me to cut 7 giants and 3 quotes (list in section 9), more than the 30% asked.
DISAGREE 3: the twin on a flat-energy beat may read as a glitch on phone; I made it a clean ghost with a seam-free offset, but it is the riskiest surprise.

## 4. Fused look rules
- Grade: v3 `grade.txt` (eq sat 1.25, warm highlights, teal-leaning shadows, grain 6, vignette) for the whole video. Section washes C1 green 30.94, C2 warm 41.27, C3 orange 68.8. Teal water, orange sunset come from the footage plus this grade.
- Type: Playfair Black Italic = giant words, header "Summer Mart", quotes (Medium italic 37 px), "thank you, come again", "fvlga" on the label. Inter = everything else (receipt, captions, stamps, label). Max 2 families.
- Objects (one family: paper/ink/stamp): receipt (cream #ECE4CC, ink #1C140D, brown #7A6242; red #DD261C = void/declined/under 10 days; green ink #1E802C = slime tax only), round seal, rubber stamps, woven label, frosted bands, chrome giants, 3 halftone faces.
- Receipt spec: 340 px wide, top edge flush with the strip top, x = 714; label "DAYS LEFT", number 92 px with fixed digit advance 58 px, dashed rule, 3 rows newest first (rows fade 100/72/50 %), zigzag bottom, soft shadow. Rows 27 px label + 29 px price with dot leaders. Retracted state = number block only (about 120 px tall).
- Transitions: hard cuts on the grid for burst bars (10.29-13.73, 21.47-24.06, 48.15-51.59, 77.41 on); dissolves only F2 18.89, F3 20.61, F4 58.48, F5 75.69; fade-throughs only F1 3.4 rise and E1 dip before the sunset at 82.44; the new transition is the dashed-line slice at 49.55 (plus the 12-frame receipt drop at 50.9). No other transitions.
- Seal: v3 round seal, fixed spot >= 7 s, handovers 13.71 BR, 30.89 BL, 44.64 BR, 68.69 BL with 0.5 s fades (O2). Leaves at 82.44. Slime band moved up to y 404 so the BL seal does not touch it.

## 5. Ledger (every price in days; checked by plan.py: 092 - 80 spent = 012, then 12 burn)
Intro ticks 6 x 01 (0.8, 3.3, 5.0, 8.7, 10.2, 11.9: each "one" is one day, "all ones" = day-ones) > 086. FUN 08 (13.5) 078, HER EYES 04 074, EACH OTHER 03 071, LAST ?? (no price) 071, THE SUMMER 05 066, JEANS 32 06 060. SLIME TAX 3 x 03 > 051. FUN AGAIN 02 049, WALKER FIT 03 046, HER ?? then HER VOID (no charge), BUTTER 02 044, WATER 02 042, OCEAN 03 039, OTTER 01 038, GLE 08 030, A HUNDRED 03 027, NO.9 JEANS 03 024, SIZE 32>34 +02 022. Hook 2 re-ups: FUN x2 04 018, HER EYES x2 03 015, EACH OTHER x2 03 012. THE SUMMER now costs 13 (peak season): DECLINED, short by 01. The 12 unused days burn off one per half-beat (0.43 s) from 77.72 to 000 on 82.44. End: TOTAL 92 DAYS, REFUND NONE.

## 6. Verse 1 (31-41 s): SLIME TAX
One idea: the verse owns the colour green and the paper charges a tax. Frosted green glass band "slime" (34.6-40.8, the only object besides receipt+seal), a green wash decay at 30.94, and the receipt prints a green-ink SLIME TAX 03 line exactly on each of the three slime lines (34.6, 37.5, 39.5), stamped with a thump and a 0.1 s number shake. Before it, 31.3-34.0 (Glock / choppa) stays quiet except the quote "everything good is rented" (31.6-34.4). No gun word or picture on the receipt (the captions carry the artist's words as before). Giants SLIME x2 and GLOCK are deleted so the receipt rows stay visible and legible for the tax.

## 7. Lyric-to-moment table
Bar.beat counted from the first kick 3.402 (bar 1). Objects always include receipt (R) and seal (S, from 13.71).
| t | line | visual event | sync | transition | reaction |
|---|---|---|---|---|---|
| 0.0-0.3 | (silence) | black strip, printer slot line at the top edge | before kick | none | curiosity |
| 0.3-3.4 | racks, ones | paper feeds down from the strip top, centre, 1.18x, prints SUMMER MART / NON-REFUNDABLE / DAYS LEFT 092; 0.8 ONE 01 tick 091 | 0.8 vocal | feed | works muted |
| 3.4 (1.1) | kick | footage F1 rise (1.2 s), paper docks top-right in 0.35 s, title slams, 3.3 tick 090 | kick | rise from black | hook |
| 5.0-11.9 | racks x3 | ticks at 5.0, 8.7, 10.2, 11.9 (089 > 086); frosted "racks in the air" bands 8.7 / 10.2 / 11.9; cuts every beat 10.29-13.73 | each line | hard | smile |
| 13.5-13.73 (3.4) | Shawty... fun | FUN 08, number slams 086>078 on the drop, seal arrives, hard cut + flash | downbeat | hard | the number is the hit |
| 15.15 (4.2) | Thugger | giant THUGGER, rows retract to the number | vocal | hard | |
| 17.3 (5.1) | I look in her eyes | HER EYES 04 (074); halftone face print small | line | hard | |
| 19.2 (5.3) | made for each other | EACH OTHER 03 (071); dissolve F2 at 18.89 | line | dissolve | |
| 20.4 (5.4) | how long we'll last | SURPRISE 1 twin: picture sheds a ghost copy one beat (0.859 s) late, slides in over 6 frames; LAST .. ?? prints with no price; F3 melt at 20.61 | line | twin in | GASP 1 |
| 22.5 (6.3) | for the summer | THE SUMMER 05 (066) while twin holds (no band, no giant here) | line | hard burst 21.47-24.06 | |
| 24.3 (7.1) | Chrome Heart jeans, size 32 | twin collapses back on the beat (6 frames), JEANS 32 06 (060) | bar line | twin out | relief |
| 25.3 (7.2) | size 32 | giant 32 (rows retract) | vocal | hard | |
| 27.9 (8.1) | (waist) | quote "the first warm day is a promise with a date on it" | | fade | quiet |
| 30.9 (9.1) | I got a Glock on my waist | hook>verse hard cut, green wash C1, seal to BL; receipt holds still | bar | hard | quiet |
| 31.6 | choppa | quote "everything good is rented" 31.6-34.4 | | fade | rewatch (rent/price) |
| 34.6 (10.1) | slime x3 | green band "slime"; SLIME TAX 03 at 34.6 / 37.5 / 39.5 (057, 054, 051) | each slime line | hard | smile (the tax) |
| 40.9 (11.4) | short hook | warm wash C2, FUN AGAIN 02 (049) | bar | hard | |
| 44.3 (12.4) | Summer Walker | WALKER FIT 03 (046), seal BR, hard cut 44.71, halftone face at 47.5 | bar | hard | |
| 45.6 (13.2) | built like | giant SUMMER WALKER, rows retract | vocal | hard | |
| 47.7 (13.4) | she wasn't on that | HER .. ?? prints (no price), burst of beat cuts 48.15-49.87 | line | hard | tension |
| 49.55 (14.2) | had to cut her | SURPRISE 2: dashed coupon line zips across (6 f), picture slices, lower half slips 64 px right / 40 px down leaving a black wedge, white hit + RGB tear (GL), CUT HER stamp lands, HER ?? inks to HER ... VOID in red | "cut" | CUT | GASP 2 |
| 50.9 (14.4) | I had to cut her | second, bigger stamp (receipt tears off and drops in 12 f so the stamp is clear), fresh paper at 51.4 | beat | hard | |
| 51.4 (14.4) | fat like butter | BUTTER 02 (044) on the new paper; giant BUTTER 54.2 | vocal | hard | smile |
| 56.5 (16.2) | cat / water | WATER 02 (042), giant WATER chrome 57.2, rows retract, old rows pale | vocal | hold | rewatch (ink fades) |
| 58.3 (16.4) | ocean | OCEAN 03, frosted band "ocean" 58.3-60.3; dissolve F4 at 58.48 | | dissolve | |
| 60.3 (17.3) | otter | OTTER 01 (038); giant OTTER chrome 60.9 | | hard | |
| 61.4 (17.4) | GLE | GLE 08 (030), giant GLE 62.9 | | hard | |
| 63.7-65.1 | a hundred / number 9 | A HUNDRED 03, NO.9 JEANS 03 (024) | line | hard | |
| 66.7 (19.2) | size 34 | SIZE 32>34 +02: the 32 gets a red biro strike, price goes UP (022); giant 34 at 67.6 | line | hard | rewatch / gag 1 |
| 68.7 (20.1) | hook 2 | warm wash C3, FUN x2 04 (018) | bar 20 | hard | |
| 71.8 / 74.0 | eyes / each other | HER EYES x2 03 (015), EACH OTHER x2 03 (012); face print 71.8 | line | hard | |
| 75.1 (21.4) | how long we'll last | LAST ?? again; dissolve to clouds F5 75.69; quote "enjoy it like it is borrowed" 75.3-77.3 | line | dissolve | tension |
| 77.4 (22.3) | for the summer | SURPRISE 3: THE SUMMER 13 prints in red, number 012 red, CARD DECLINED stamp (1.4 s), counter glitch jump; quote gone before (77.3) | line | hard | GASP 3 (joke) |
| 77.7-82.44 | for the summer / Chrome Heart | 12 days burn off at 0.43 s per tick (011 ... 001); giant SUMMER chrome 79.0-80.7 (number stays) | half-beats | | the number melts |
| 82.44 (24.1) | outro | 000 lands on the bar over the E1 dip; receipt pulled up and out in 0.3 s, seal and giants gone; sunset rises out of black | bar 24 | fade-through | silence |
| 83.1-84.5 | (instrumental) | three quiet lines print: TOTAL ... 92 DAYS / REFUND ... NONE / "thank you, come again." (Playfair) | beats | | quiet |
| 85.6-89.4 | tail | lines fade 85.3-85.7; woven care label fades in (0.5 s); 87.2 the 32 is struck by thread and 34 woven on; label fades 89.0; picture dips to black 86.9-89.4 | | fade | rewatch / gag 2 |
Quotes kept: 3 (27.9, 31.6, 75.3). Faces: 3 (17.3, 47.5, 71.8). Red-shirt boy (c80) 3 short shots: 17.17-18.89, 65.36-67.08, 80.85-82.44 (spaced 15+ s apart).

## 8. Surprise budget and phone reading
1. Twin 20.4-24.3 (ghost copy, offset 90 px, 62 % cool-desaturated, trails one beat). On a phone (board frame 3) it reads as a double exposure: fine, but it is the weakest; if it looks like an artefact the fix is a harder seam, not more effects.
2. Slice + stamp 49.55 (board frame 5): dashed line, black wedge and stamp are all readable at 390 px; stamp narrowed to 132 px type and moved left so it clears the receipt.
3. CARD DECLINED 77.4 (board frame 7): red stamp, red 012, "SHORT 01" are readable; the silence after is the 12-tick burn.

## 9. Restraint pass: what was cut (about 35% of effects)
Giants 16 > 10 (cut SUMMER 23.35, GLOCK 31.5, SLIME 35.0, SLIME 38.3, THUGGER 42.6, SUMMER 78.0, 32 80.9; SUMMER moved to 79.0). Bands 8 > 6 (cut "for the summer" at 22.5 and 77.4, "water" 56.5). Quotes 6 > 3. Also cut: sun disc on the right edge, falling green "1"s (replaced by the day ticks), size tag, chrome-heart text sticker, ending frosted glass closing, ending "000 / that's the summer", "FVLGA CUT HER MIC" outro text, the v3 three-style countdown code, VT323/Anton, the receipt tear-off at 50.9 beyond the drop. Quiet bars (31.3-34.0, 41-44, 61-66 except tick lines, 75-77.3) stay quiet.

## 10. Build plan (existing canvas + ffmpeg pipeline, src in `songs/cut_her_mic/src/`)
Order of build (look at real frames after each step):
1. params.py: replace WORDS/BANDS/QUOTES/FACES; add LEDGER (from plan.py), BURN, CUT/STAMP times; swap three clips for c80 (shots 7, 38, 47) and add per-shot flip/zoom override in shots.py (c80 is only 60 frames, so all three uses would otherwise be the same 52 frames). Rebuild base.mp4. (about 1 h)
2. ov.html: delete drawTicket/drawFlip/drawBand/sunDisc/ones/sizeTag/chrome-heart/outro glass/000 text. Add `drawReceipt(t)` (rows from LEDGER, number tick pop using the existing dayAge pattern, retract = lerp of the item block height driven by `__giantOn`, paperTex cached, feed animation 0.3-3.4 centred then dock 3.4-3.75, exit 82.44-82.8, tear-drop 50.9-51.3). (about 3 h, the biggest piece)
3. ov.html: generalise stamp() (text, colour, size) for CUT HER (Inter 900, x 330) and CARD DECLINED; VOID ink; dashed cut line (draw at 49.5-49.75); green SLIME TAX pre-ink; moved seal/band y. (about 1.5 h)
4. ov.html: care label (woven rows via 1 px stripes, stitched border, struck 32 / woven 34 at 87.2) + three quiet lines. (about 1.5 h)
5. compose.sh (ffmpeg): (a) twin: after the grade, `split` the picture; delayed branch `setpts=PTS+0.859/TB`, `colorchannelmixer` desaturate/cool + `format=rgba,colorchannelmixer=aa=0.6`, `overlay=x='90*...'` with `enable=between(t,20.4,24.3)` and a 6-frame slide; (b) slice: two PNG masks (diagonal top/bottom), `alphamerge` the lower piece, `overlay=x/y` expressions in t for 49.55-49.95 over a black base (the existing GL glitch window stays); (c) the existing E1/E2 fades. (about 2 h)
6. Preflight-checker, re-extract frames at: 0.5, 2.9, 3.4-3.8, 13.7, 21.6, 36, 49.5-50.0, 51.4, 57.9, 66.7, 77.4-77.8, 82.2, 82.6, 84.7, 87.4, 89.2; run `plan.py` objects check against the real ov (screenshots at 10 random times); fix; re-check. (about 2 h)
7. 15 s clip 44.3-59.3 (contains Summer Walker, VOID, both stamps, slice, butter, water; the number block is always on, so the clip needs no pre-roll).
Cost estimate (honest, not measured): about 11-13 working hours of build and iteration including one full fix round; the twin and the slice are the likeliest to need a second round. Render time: v3 overlay chunks run 4 in parallel; the receipt adds one cached texture and a few text draws per frame, so overlay time should stay within about +20 % of v3, compose adds two branches (about +15-25 %). I did not time v3, so treat "5-7 min total" as a guess to confirm on the first run. New tools: none (masks are two PIL PNGs).
Sound: print chirp per tick (very short, quiet), tear on 50.9, one low thud on the CARD DECLINED stamp; synthesised in sfx25.py style; video mix only, limit stays under -1 dBTP.

## 11. Stress test
- First 3 s: black strip + a printing paper whose number ticks. Muted it reads as "a receipt counting down". Weakness: a mostly black strip for 3.4 s; mitigation is the 1.18x paper, the title slam and the footage rise F1.
- Middle changes: yes (green tax verse, slice, water giants, declined).
- Ending: resolves the spine (000 on the bar, TOTAL 92 matches the ledger, size gag lands).
- Muted: works (numbers, stamps, receipt).
- 15 s clip: works, number always visible.
- Weakest answer: the twin (glitch vs gesture) and the 82.44 to 85 span: sunset plus three lines is very quiet after a loud 77.4; that is intended.
- Colour check: slime band y moved so the BL seal clears it; stamp narrowed so the receipt clears; board black bars checked = 0 before JPEG.

## 12. Open questions (default if no answer)
1. Receipt starts at 092 and the intro "all ones" each cost 1 day: keep, or start the counter only at the 13.7 drop like v3? Default: keep (first 3 s needs it).
2. OK to lose 7 giant words and 3 quotes for the 3-object rule? Default: yes; SLIME and GLOCK giants are the ones I would restore first (only if the green band is dropped).
