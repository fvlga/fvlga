# CUT HER MIC - v4 direction ideas (engine test, 2026-10-17). Nothing rendered; v3 files untouched.
Looked at: v3 frames (10 stills in scratchpad/cdview_cm4/sheet.png), footage contact sheet (c0-c102), lyrics_timed, concept.md, fade_plan.md, learnings. Sparks: ideation.py seeds 1 and 2.

## 1. This song is about ___ but it feels like ___
This song is about a summer fling he already plans to cut, but it feels like a shopping spree: every good thing (fun, jeans, GLE, her) is a purchase, and the bill comes due when the summer ends.

## v3 baseline (what I saw)
Warm sepia/teal 16 mm kids, paper ticket "SUMMER ENDS IN n DAYS" top centre, round green/orange seal, Playfair giant words (SUMMER, GLOCK, GLE), teal frosted band "water", red CUT HER stamp (strong, keep), final "000 / that's the summer". Weak spots: sections look the same, the ticket is a pure clock (no cost, no consequence), captions are tiny Inter, giant words are the same treatment all song.

## 2. Spark roll: used / rejected
Seed 1: USED structure "the video is a list/receipt that gets filled in" (R5), USED constraint "type is always physical, written on a surface" (R3), USED palette-in-spirit "chrome silver + tomato red" for Concept B, USED CCTV monitor wall (B). Rejected: mall closing down (the footage is 1960s kids outdoors, not a mall), x-ray lightbox/prescription label (clinical, wrong warmth), wedding lower third (cute but not about loss), contact-sheet-at-each-drop (energy is flat, no drops).
Seed 2: USED "something is slowly removed from the frame" (B: the second lane goes away), USED price tag / ticket stub as native object (A), USED "a counter runs and the last number matters" (A: balance). Rejected: gas station, kitchen at night (no footage), cereal box, yearbook, game HUD (childish per artist), olive+cream.

## 3. Three divergent concepts
| | A "SUMMER MART / non-refundable" | B "TWO CAMERAS" | C "CARE LABEL / fit check" |
|---|---|---|---|
| Lane | DIY thermal receipt + sticker (1+3) | one-conceit + CCTV/documentary (2+6) | opium-luxury/Y2K chrome lookbook (4) |
| Grade | faded mustard highlights / dark teal shadows, grain, flash-print (#D9A32B / #0F3B3D) | cold chrome-silver desaturation + one tomato red (#E5391F) | indigo denim + cream + chrome, black-heavy |
| Spine | a receipt prints one line per lyric, each priced in DAYS; BALANCE 089 to 000; the prices sum to 89 | two lanes of the same footage, one a beat behind, lag grows 0 to 3 bars; she is cut = lane 2 goes black | a tailor tape runs along the bottom, position = time, 32 to 34 in. |
| Native object | receipt, price-gun sticker, dashed "cut here" coupon line | pool-lane rope divider + CCTV timecode "CAM2 -00:01:12" | woven care label ("100% SUMMER. DO NOT KEEP.") |
| Outside-media | pharmacy/shop receipt | CCTV wall | garment care label / sewing pattern |
| Striking moment | at 49.55 the frame itself is cut along a dashed line, lower half slips, then the CUT HER stamp | at 49.55 lane 2 drops to black for the rest of verse 2 | the tape is snipped at 49.55 and its end falls out of frame |
Weakness: A covers 28% of the picture; B loses the stamp and the humour; C is pretty but has no cost/consequence and lyric coverage is thin.

**Fusion = A with two thefts.** From B: the "twin" (picture duplicated one beat late) used ONCE, on "how long we'll last" (the lovers drift out of sync). From C: the care label as the 3-second ending card. A stays the spine. Max 3 ingredients: footage + receipt + dashed-cut. (Twin and label are accents, not systems.)

**RECOMMENDED: Fusion A "SUMMER MART".** It keeps what the artist loved (days countdown, stamp, summer footage) but gives the countdown a consequence: it is a balance you spend, and hook 2 hits "CARD DECLINED", the right joke for a rapper who flexes racks and is out of days.

## 4. Concept language (one grade, 2 families, one object family)
- Grade: sepia-teal base from v3 pushed to mustard highlights / teal shadows (grade() in the animatic), grain, vignette. One grade for all sections, only light washes at section changes (as fade_plan C1-C3).
- Type: Playfair Italic Black (giant words, title) + VT323 (receipt, captions, price labels). Captions become receipt-paper tags (answers "I don't like that font"). Anton only inside the two red stamps (they are rubber stamps, not a font family in the layout: if the artist objects, stamps become VT323 bold).
- Objects: receipt paper (hangs from top-right, prints on lyric, tears off when full), price-gun sticker for fvlga (yellow round, "SALE 100%", holds each spot >= 7 s), dashed coupon line, rubber stamps (CUT HER, VOID, CARD DECLINED), torn paper scrap, a care label on the end card.
- Transitions: hard cuts on beat (as v3 plan); dissolves only at 18.9, 20.6 (last), 58.5, 75.7 per fade_plan; dashed-line CUT as the one new transition (49.55); end = dip + sunset rise. Receipt tear-off sound = synthesised print-chirp (src/sfx25.py style), video mix only.
- Receipt hygiene (from the board): paper height = lines printed (no empty cream); it RETRACTS upward for 0.3 s when a giant word is on screen; older lines fade pale like thermal paper (rewatch detail).

## 5. Metaphor mapping (3 biggest words)
- summer: literal sun/beach; metaphor sinking sun (v3); ONLY-THIS: the thing you pay for in days: a receipt balance 089 DAYS you spend line by line.
- cut: literal scissors; metaphor split screen; ONLY-THIS: a coupon's dashed CUT HERE line that slices the actual frame, the item HER marked VOID, and she stays on the receipt as a printed scar.
- jeans/size 32 to 34: literal denim; metaphor body; ONLY-THIS: a price-gun label SIZE 32 that is crossed out in biro and rewritten 34 at 66.7, charged +02 days (gets bigger = costs more days).
- (bonus) water: thermal paper ink fades when wet and in time, so the early lines pale as the water verse plays.

## 6. Item ledger (prices in days sum to 89, math checks on rewatch)
ones x7 = 07; so much fun 12; her eyes 06; each other 05; summer only 07; jeans 32 09; street tax 08 (verse 1; no gun/slur text on receipt); Summer Walker fit 05; HER = VOID (no charge); butter 03; water 02; ocean/dive 04; otter 01; GLE 10; x100 04; no.9 jeans 04; size 34 +02. Total 89. Balance after 66.7 = 000, so hook 2 starts overdrawn.

## 7. Lyric-to-moment table (recommended)
| t | line | visual event | sync | transition | reaction |
|---|---|---|---|---|---|
| 0-3.4 | (silence/black) | black, paper feeds out of a slot at top-right, one printer chirp | before kick | none | rewatch: slot sound is a tape-stop |
| 3.4 | kick | header prints SUMMER MART / REG 01 / 06-01, title slams, footage rises (F1) | kick bar 1 | rise from black | hook |
| 8.7-13.5 | racks, all ones x7 | ONES x7 .. 07 prints, green-less: "1"s become price digits | each line | hard cuts last bar | smile |
| 13.71 | Shawty... fun like Thugger | BALANCE 089 slams (0.08 s), FUN 12 prints, price-gun fvlga sticker | downbeat bar 4 | hard cut + flash | |
| 17.3 | I look in her eyes | HER EYES 06 prints; one small halftone face | line | hard | |
| 19.2 | made for each other | EACH OTHER 05; dissolve c66 to c69 | line | dissolve (F2) | |
| 20.4 | how long we'll last | LAST ... ??? prints; picture TWINS (copy one beat late) until 24.3 | line | twin in | GASP 1 (format break) |
| 22.5 | for the summer | price jumps; SUMMER giant; twin collapses back at 24.3 on "32" | beat | twin out | |
| 24.3 | Chrome Heart jeans, size 32 | price-gun SIZE 32 sticker, giant 32 (receipt retracts), JEANS 09 | line | hard | |
| 30.9 | Glock on my waist / choppa | NO gun word on paper: receipt prints STREET TAX 08 in red ink; green wash decay C1 | bar 9 | hard + wash | rewatch: euphemism |
| 34.6-40.8 | slime x3 | SLIME giant, receipt scrolls fast (3 lines in 3 beats) | beats | hard | |
| 40.9 | Shawty... Thugger (short hook) | warm wash, receipt re-hangs | bar 12 | hard | |
| 44.64 | built like Summer Walker | halftone face + SUMMER WALKER, FIT 05 | bar 13 | hard | |
| 48.15-49.5 | she wasn't on that | burst 1-beat cuts, receipt prints HER in black | beats | hard | tension |
| 49.55 | had to cut her | dashed line zips across, frame splits, lower half slips 48 px, 2-frame white, receipt line HER ... VOID in red, CUT HER stamp lands on the next beat | "cut" | CUT | GASP 2 |
| 50.9 | I had to cut her | second, bigger stamp; receipt paper tears at its perforation and drops | beat | hard | |
| 51.4-54.2 | fat like butter | BUTTER chrome-gold giant, 03 prints | beat | hard | smile |
| 55-60 | cat, water, ocean, otter | teal wash, chrome WATER/OTTER, old lines fade pale; dissolve 58.5 | long holds | dissolve F4 | rewatch: ink fade |
| 61.4 | GLE | GLE giant, 10 prints | beat | hard | |
| 65.1-66.7 | jeans too tight / size 34 | SIZE 32 crossed by biro, 34 written, +02 | line | hard | rewatch |
| 66.7 | balance | BALANCE 000 (red) | beat | hard | |
| 68.69 | hook 2 | warm orange decay, receipt blank, new paper | bar 20 | hard + C3 | |
| 75.1 | how long we'll last | dissolve to clouds; "?????" | | dissolve F5 | |
| 77.4 | for the summer | EXTEND SUMMER? CARD DECLINED stamp | counter jump slot | hard | GASP 3 (joke) |
| 82.44 | outro | dip to black, paper pulled off right, sunset rises, TOTAL 89 DAYS / REFUND NONE / thank you come again | bar 24 | fade (E1) | quiet |
| 86.9-89.4 | tail | care label woven tag fades in: 100% SUMMER / DO NOT KEEP, then black | | fade | rewatch |
Quotes: reuse concept.md list (7), set as printed receipt footers only at 18.2, 44.9, 83.2 (3 of them); the rest as v3 free text.

## 8. Three planned surprises (and nothing else breaks the rules)
1. 20.4-24.3 THE TWIN: the picture duplicates, copy one beat late (format break; lovers drift).
2. 49.55 THE CUT: the frame is actually cut along a coupon dashed line (changed rule: until now graphics never touched the picture).
3. 77.4 CARD DECLINED: the money joke, with balance 000 since 66.7; then a silence: at 82.44 every graphic leaves except three quiet lines.

## 9. Anti-cliche list (banned unless twisted)
1. Literal sunset-and-beach summer montage (twisted: it is the final reveal under a receipt). 2. Floating neon countdown (v3 lesson; the number lives on paper). 3. Scissors icon or emoji cut (the frame is cut instead). 4. Spinning vinyl / mic on stage for "mic" (no performer, mic never shown; the title is the only mic). 5. Default glitch/RGB on every hit (only the stamp). 6. Money rain / cash emoji for "racks" (receipt digits instead). 7. Gun image/emoji for the Glock line (a receipt euphemism line only).

## 10. Stress test
- First 3 s: black + printer slot is intentional; weak on its own muted. Fix: print the header on the kick at 3.4, add a faint 2-frame paper-feed flash at 1.0 s (decide in build).
- Middle changes: yes (twin, cut, chrome water, overdrawn) but verse 1 (31-41) has only the green wash + slime; add a second receipt (a different paper stock, pink) for verse 1? Default: no; let the 3-line scroll carry it. WEAKEST point.
- Ending resolves spine: yes, TOTAL 89 matches the ledger.
- Muted: works (prices, stamps, receipt tell the story). 
- 15 s clip 44.3-59.3: contains Summer Walker, VOID, CUT, butter, water start; receipt has to be mid-state at 44.3 (pre-print 5 lines).
- Risk found on the board: receipt (300 px wide) overlaps giant words (WATER in frame 6) -> retract rule; receipt is a heavy cream block vs the dark grade -> make the paper slightly translucent-dim (85%) and warm (#E9E0C8), shadow stays.

## 11. Animatic
/home/user/fvlga/fvlga-visualizer/cut_her_mic_v4_animatic.jpg (8 strips 1080x608, half scale, real frames c84,c70,c89,c37,c38,c73,c48,c0 with quick mock overlays: PIL; the footage grade is a mock, not the ffmpeg grade) and the same frames inside the 1080x1920 layout: cut_her_mic_v4_animatic_layout_1-4.jpg, _5-8.jpg. Honest crit: receipt text now reads (34 px VT323 on 1080); frame 3 twin reads as two kids walking, fine; frame 5 the split offset is mocked and reads weaker than it will move; red-shirt boy appears in 0 frames; frame 8 (ending) is the strongest.
Mock limits: no motion, no print animation, dissolves not shown.

## 12. Open questions (defaults)
1. Is a cream receipt block (about 28% of picture width) OK, or should it be narrower/semi-transparent? Default: 280 px, 85% opacity, retracts for giant words.
2. Keep the CUT HER rubber stamp as is (artist: fire) and ADD the dashed frame-cut before it? Default: yes, both.
3. Anton inside stamps counts as a third family? Default: stamps in Anton stay (v3 had them, no complaint); if objected, VT323.
Build brief: card-animator: receipt layer (canvas, per-line print animation with a keyed line list from section 6), stamps, price-gun sticker, care label; video-finisher: twin (tpad/overlay copy delayed 0.859 s), frame-cut transition (two crops + offset, 12 frames), dips; sfx: print chirp + tear (src/sfx25.py).
