# Creative learnings log (read at the start of every creative-director run; append after every video)

Format: date, song/video, what worked, what failed (artist's words), steal next time, rules changed.

## 2026-10 TOO PERSONAL (65 BPM, sad, teal, frosted glass + slow footage)
- Worked: one conceit (frosted glass barrier), long holds, quotes about distance/time, a small number of pulled-back halftone faces ("A lil face not 2 much"), "not delivered" ending. Artist: "I like the video".
- Failed/risks: tempo unconfirmed; first 3 s of the intro thin.
- Steal: a physical object that carries the meaning (the glass); quiet bars stay quiet.

## 2026-10 CUT HER MIC (70 BPM, summer, countdown + sticker-bomb)
- Worked: spine = "SUMMER ENDS IN n DAYS" with the sun sinking; CUT HER rubber stamp + glitch on the lyric; frosted bands as words; chrome giant words; dissolves at lyric moments; artist: "This is fire".
- Failed (artist's words): "the captions like BUTTER I don't like that font" (display serif didn't fit the vibe; font pick still open); the countdown "looks out of place" (flat neon text floating) -> redesigned as a paper ticket stub, native to the sticker-bomb world; mixed fonts "throw me off" -> max 2 families; outlines removed from words; "less red shirt boy, not him entirely"; cut-outs "not no cut out, just less of it".
- Process failures to avoid: a fade-in filter blacked out all footage before its start time (always check frames of the real render); killed own shell with pkill -f (use pid/bracket trick); YouTube downloads are blocked by the bot check and are never bypassed.
- Steal: ticket/tag/stamp objects as UI; colour washes that decay on section changes; dip through black before a sunset ending; preflight-checker before every render.

## 2026-10 CUFF NO DANCER v54/v55 (148 BPM, teal found-footage zine)
- Worked: teal grade, frosted "bands up" wall + giant words, halftone/navy faces, tile grid, "alone" field shot.
- Failed: blown white frames (16 s, 78 s, 101 s), contraband giant word invisible, red-shirt boy ~5-8 shots with a run at the end, barn shot repeated, quote cards carried poem titles (looked like attributions).
- Done in v55: washes per section, alone shot breathes, dip ending, no outlines. Open (rebuild-level): boy moderation, barn repeat, extra giant words, 2 small cut-outs.
- Steal: protect what the artist already likes; fix at overlay/compose level first.

## Reference studies
- 2026-10: six underground videos (OsamaSon, 2hollis, Nettspend, xaviersobased, Playboi Carti, Ken Carson), DESCRIBED ONLY because YouTube blocked downloads; see underground_inspiration_2026.md. Upload screen captures to upgrade to 'watched'.

## 2026-10-17 CUT HER MIC v4 ideas (creative-director engine test, nothing rendered)
- Tested: spark tool seeds 1+2 (used receipt-structure, physical-type, price-tag, removal/counter; rejected mall, clinical, HUD, kitchen/gas-station), 3 divergent concepts + fusion, metaphor mapping, lyric table, animatic board from real frames (PIL mock). Plan: songs/cut_her_mic/v4_ideas.md.
- Steal: give a countdown a CONSEQUENCE (days as currency, ledger sums to 89, hook 2 overdrawn, CARD DECLINED); captions as native paper tags (answers the font complaint); cut that touches the picture itself (dashed line); thermal-paper fade as rewatch detail.
- Engine lessons: sparks that name a world (mall, gas station) are useless when the footage is fixed 1960s outdoor film, so pick sparks on structure/object/constraint; board v1 was unreadable (receipt text 25 px, thumbnails 400 px of mostly black bars), so animatic = strip crops at >= 540 px wide, text >= 34 px; mock receipt box needed height = printed lines; giant words collided with the receipt (needs a retract rule). Animatic grade is a mock, not verified ffmpeg output.
- Not claimed: nothing built, no audio or sync verified; the artist has not seen any of this.

## 2026-10-17 CUT HER MIC v4 Concept B board (TWO CAMERAS, animatic only)
- Built 8-strip + 4-frame layout board from real frames. Lessons: half-width lane crops cost faces and action; top/bottom dark scrims are needed or red UI is unreadable on bright footage; stale timestamps on a black lane collide with new text (hide them); wrap captions inside lane 1 so they do not cross the rope. Nothing rendered, grade is a mock; the artist has not yet reacted.

## 2026-10-17 CUT HER MIC v4 concept C board
A measuring tape whose reading is derived from the lyric (32 at size 32, 34 at size 34) is a free, checkable spine; but without a cost mechanic the song tension is only a ruler running out. Soft low-res footage suffers under a heavy indigo grade.

## 2026-10-17 CUT HER MIC v4 FUSION (A receipt + one B twin + C end label; board only, nothing rendered)
- Artist said "put all the ideas into one but guide it". Fusing worked by giving each idea ONE job: A = spine (receipt, days as currency, 000 at 82.44, declined one day short), B = one moment (twin 20.4-24.3), C = end card (care label, size 32>34). Plan: songs/cut_her_mic/v4_fusion.md; boards cut_her_mic_v4_fusion_animatic.jpg / _layout.jpg.
- Lessons: (1) a hard "max 3 objects" rule only works if it is checked by script (plan.py scans the timeline), and it forced cutting 7 giants + 3 quotes; (2) retracting a receipt to its number block keeps the spine readable under giant words; (3) a ledger must be computed, not eyeballed (92 - 80 spent = 12 burn, one per half beat to land 000 on the bar); (4) board bugs found by looking: stamp overlapped receipt, seal touched the slime band, stamp clipped at the strip edge, header collided with the label; (5) use the real grade.txt through ffmpeg for board frames instead of a numpy mock; (6) c80 (red-shirt boy) is only 60 frames, so three uses would repeat identical frames unless shots.py gets a flip/zoom override.
- Not claimed: no motion, sync, audio or render verified; twin and slice are PIL mocks; the artist has not reacted yet.
