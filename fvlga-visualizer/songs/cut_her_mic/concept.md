# CUT HER MIC - video concept (creative-director, review of first build)

Note: `style.md` and `contracts.md` live in `/home/user/fvlga/.claude/agents/`. Standing rules honoured: no AI images, no cut-outs of the artist, no author names on quotes, no gun pictures, no logos, audio only turned down in the video (master has +3.2 dBTP), full video + one 15 s clip only, sticker holds one spot >= 7 s, quote cards have no backgrounds/outlines, face = ~3 small pulled-back halftone prints.

## One-line pitch
"Summer has an expiry date": a sticker-bomb summer-camp home movie (old 16 mm kids, lakes, pools) where a calendar and a "SUMMER ENDS IN ___ DAYS" counter run down from 90 to 000 while a sinking sun, slime-green accents and a rubber CUT HER stamp turn a sweet hook into a break-up.

## What the song is (3 sentences)
A boy is having the best summer of his life with a girl ("so much fun like Thugger", "this might be for the summer") and says out loud he does not know how long it lasts. The verses are the menace and the flex around that joy: slime/street talk in verse 1, then verse 2 is body, water, ocean, dive, GLE, jeans too tight, and the cold line "she wasn't on that, so I had to cut her". Joy hook against cold verse, and the hook itself already contains its own expiry date, so a countdown is the honest spine.

## Sound facts
~69.84 BPM half-time (139.7 double), bar = 3.436 s, beat = 0.859 s, T0 = 3.402. Bars: intro 1-3 (3.4-13.7), hook 1 bars 4-8 (13.71-30.89), verse 1 bars 9-11 (-41.2), short hook bar 12 (-44.64), verse 2 bars 13-19 (-68.69), hook 2 bars 20-23 (-82.44), outro bar 24 (-89.4). Energy is flat (no drops), so the edit must create its own dynamics: burst-then-hold, not a metronome. Video audio: gain about -4.5 dB then a limiter at -1.5 dBTP (alimiter `level=disabled`, AAC 256k, then re-measure; never touch the master).

## Concept A (recommended): "Summer Ends In"
Archetype: sticker-bomb maximalism (osamason "ik what you did last summer" is the direct ancestor, which fits a summer song) with Y2K chrome as the type material. Thugger = attitude of the type and slime accents only, no footage of him.

**Palette / grade** (one grade the whole video; the existing recipe is close, keep it):
- pool teal #2FD6C8, sunset orange #FF8A3D, cream #F7EDD3, slime green #B6FF2E (accent only, never a full-frame grade), stamp red #E8261C, chrome silver #E3EAEE to #7FA0AE, hot pink #FF2E7E only for the title underline and fvlga sticker.
- Grade: `eq=saturation=1.25:contrast=1.07`, warm highlights / teal-leaning shadows (current grade.txt is right), noise 6, vignette. Add a split: hook sections warm-orange, verse 1 pushed green (slime), verse 2 pushed teal (water), outro orange-to-purple dusk. Do the pushes as 1.5-bar crossfaded colorbalance windows, not hard flips.

**Spine:** calendar tile (top-left) + "SUMMER ENDS IN 089 DAYS" (top-centre) + a sun disc that sinks down the right edge. Starts at the hook drop (13.71), reaches 000 and the horizon at 82.44, final card "000 / that's the summer". Everything else plays with or against it. Make the spine react to the lyrics (see moments).

**Typography:** Playfair italic black (cream, orange/teal RGB ghosts) for giant words; Anton for the stamp and numerals; VT323 for the counter; Inter small for captions; UnifrakturMaguntia ONLY for the "Chrome Heart jeans" text sticker (text motif, no logo, no cross). Giant words: THUGGER, SUMMER, 32, SLIME, SUMMER WALKER, WATER, OTTER, GLE, 34. Water-section giant words (WATER, OTTER, ocean) get the chrome treatment (vertical silver-teal gradient with a hard highlight line) so the poolside Y2K idea is visible.

**Footage plan** (trust frames, not tags; red-shirt boy avoided entirely):
- Intro bars 1-3: pool crowd c84-c70 region already used (pool crowd tile, beach waves). Keep, but hold the first shot 2 bars (3.4-10.3) then cut every beat for the last bar for the "all ones" burst.
- Hook 1 (warm, kids/beach/skate/bike, c60-c90 minus red shirt): keep list, but cut burst-hold (below).
- Verse 1 (slime): c63,72,83,88,87,85 are fine under the green grade; 34.6-40.8 slime band stays.
- Verse 2 (water): this is the only place for river/rapids/pebbles: c10 river and c2 rapids and c7 pebbles must LAND on 55-61 (butter/cat/water/ocean/otter), and pool/dive shots (c29-type pool crowd, diving board shot, rowboat) on 58.3-61.4. City/walker clips (c34-c39) go to 61.4-68.7 (GLE, hundred, number 9 jeans, size 34).
- Hook 2: do NOT replay hook 1/intro clips (current list repeats 70,74,75,65,82,60,89,84, which are all already seen). Use unused: c3, c5, c4 flowers, c14 bridge road, c48 clouds, c34-c39 walkers, c38/c39 bike street, plus c0 sunset held on the last bar.
- Outro: c0 sunset, one long hold (82.44-89.4), sun disc sinks through the horizon.

**Face plan:** three halftone prints, small (existing f1 at 17.3, f2 at 46.0 and 71.8; keep, they sit on "I look in her eyes" and "Summer Walker"). Never a cut-out, never lip-synced.

**Intro:** 0-3.4 black with a ticking calendar tile flipping to JUN 1 on the first kick (3.4); title "Cut Her Mic" slams at 3.4 (existing), "racks in the air" frosted bands on the 1s, slime-green "1"s thrown up on each line (existing, good: "all ones" also reads as day-ones). No counter yet; it switches on at the 13.71 drop with a hard "089 DAYS" slam.

**Ending:** 82.44 hold on c0 sunset, counter runs 003 > 000, sun sinks, quote fades, tail fade to black by 89.4. No stamp here except a tiny faint "EXPIRED"-less restraint: leave it quiet.

**Transitions:** hard cuts on beats everywhere (rage bible), with three planned exceptions: (1) 1.5-bar colour crossfades between graded sections, (2) a slime-green drip wipe at 30.89 (hook > verse 1) and 40.9 (verse 1 > hook), (3) a 2-frame white flash on the CUT HER hits. Dissolves nowhere else.

**Moments (the signature table)**

| t | line | visual event | sync | transition |
|---|---|---|---|---|
| 3.40 | (beat enters) | calendar flips to JUN 1, title slam | kick, bar 1 | hard cut |
| 8.7-13.5 | racks in the air x3 | frosted word bands + green 1s fall, cuts every beat | each line start | bursts into drop |
| 13.71 | Shawty made me... | counter slams to 089, sun appears, warm grade | downbeat bar 4 | hard cut + flash |
| 15.15 | Thugger | giant THUGGER, chrome-free cream, quick shake | vocal | |
| 20.4 | "how long we'll last" | counter stutters/glitches (skips 3 days), sun jerks down | line | counter glitch |
| 22.5 | "for the summer" | counter jumps 15 days in 1 s, SUMMER giant | line | |
| 24.3 | Chrome Heart jeans... size 32 | blackletter "Chrome Heart jeans" text sticker + 32 size tag | line | |
| 30.89 | I got a Glock on my waist | slime drip wipe, green grade; "GLOCK" as text only | bar 9 | drip wipe |
| 34.6-40.8 | slime x3 | slime bands, calendar tile turns green | beats | |
| 44.64 | built like Summer Walker | halftone face print + SUMMER WALKER | bar 13 | |
| 49.55 and 50.9 | had to cut her | CUT HER stamp: full-centre slam (scale 2.4 > 1 in 3 frames), screen jolts 6 px, 2 frames RGB-tear + invert, music-matched thump; second hit bigger | the word "cut" | hard |
| 54.2 | butter | BUTTER chrome-gold giant; hold shot | | |
| 55-61.4 | cat / water / ocean / dive / otter | teal grade, water bands, chrome WATER and OTTER, pool/diving shots, ripple distort on the cut | beats | crossfade into teal |
| 62.9 | GLE | GLE giant (car emoji removed, see fixes) | | |
| 66.7 | back to size 34 | tag flips 32 to 34 | line | |
| 68.69 | hook 2 | warm grade returns, counter 033 > 000 faster (speeds up) | bar 20 | hard + flash |
| 79.0-82.4 | for the summer | counter races to 003 | | |
| 82.44-89.4 | outro | sunset hold, 000, "that's the summer", quote | bar 24 | fade |

**Quote lines** (original, old voice, no author): 
1. the first warm day is a promise with a date on it (10.6-13.3, NEW)
2. the summer keeps its own count (18.2-22.0)
3. everything good is rented (32.0-35.6)
4. swim while the water is warm (44.9-48.7)
5. enjoy it like it is borrowed (66.3-68.5)
6. what the sun gives, the evening takes back (NEW, 72.8-75.8 is face time, so place 76.0-77.3 only if clear; otherwise drop it)
7. the sun is always already leaving (83.2-88.2)

**What NOT to do:** no red-shirt boy; no colour emoji or cartoon icons (artist: childish); no guns, no logos or Chrome Hearts crosses; no full-frame slime-green grade; do not add a second spine; no always-on overlays beyond the spine and the sticker; no hook-2 clip reuse; no cut-outs; no author names; no dark boxes on quotes.

## Concept B (alternative): "Lookbook" 
Archetype: Y2K chrome, fashion film. Static, slow, symmetrical shots (rowboat, pool, bikes) with fake lookbook slates "LOOK 01 - SIZE 32 - SUMMER", chrome type, minimal counter. Quieter, more 2hollis; loses the break-up bite.

## Concept C (alternative): "Slime Season"
Archetype: trippy/yeat-ish but real footage only. Lime-green solarise, melting drip transitions every bar, giant slime type; the counter replaced by a filling green meter. Loud and weird, ignores the water verse.

## Review of the existing build (`/tmp/claude-0/.../scratchpad/cm`)
Good, keep: the counter + calendar + sinking sun spine, the title slam, frosted bands, slime band at 34.6-40.8, the "000 / that's the summer" end, the 32/34 size tags, three halftone faces, per-section sticker spots.

Change:
1. **Uniform cut rate.** Every cut is exactly 2 beats (1.72 s) from 3.4 to 82.44. Energy is flat, so the edit must supply dynamics. New cut pattern: intro hold 2 bars then beat-cuts last bar (cuts at 10.27, 11.13, 11.99, 12.85); hook 1 bars 4-8 as 4+4+2+2+1+1 beats per bar-pair; verse 1 every 2 beats; long holds (1 bar) on 55-61.4 water and on the final 82.44 sunset; burst (every beat) at 21.5-24.3 and at 48-51.5 ahead of the stamp. Put in `params.py` as an explicit list instead of `HALF*k`.
2. **Hook 2 reuses hook 1/intro clips** (CLIPS tail `70,74,75,65,82,60,89,84`). Replace with unseen footage: c3, c5, c4, c14, c48, c34, c35, c38/c39, ending on c0.
3. **Emoji pop-ups** (`EMO`/`POPS`: jeans, sun, butter, water, otter, car, dive, cash): artist rule v40 says emoji/cartoon read as childish. Delete them (the butter and car stickers show in the stills). Replace with black-ink halftone prints of real photos only if Unsplash scans exist (butter, otter, car), max 4, else drop and let the giant words carry.
4. **Stamp is too timid**: drawn at x=330 on a 1000 wide canvas, 1.1 s, glitch only 0.4 s. Make it centred, larger, with a 3-frame slam, 6 px screen jolt, 2-frame RGB tear + white flash, and a second hit at 50.9 that is bigger. Do both in `STAMPS = [49.55, 50.9]`, `GLITCH` widen to (49.5,50.05) and (50.85,51.4); also add a cut-to-black 2 frames at 49.55.
5. **Y2K chrome is missing.** Giant words are cream with orange/teal ghosts everywhere. Add a chrome fill (silver > teal vertical gradient, white highlight bar) to WATER 57.2, OTTER 60.9 and SUMMER 78.0, plus the blackletter "Chrome Heart jeans" text sticker at 24.3 and 79.0 beside the 32 tag.
6. **Counter is linear, not musical.** `prog(t)` ticks evenly. Make it react: glitch at 20.4, jump at 22.5 and 77.4, accelerate in hook 2, red from 010.
7. **Missing transitions**: add the slime drip wipe at 30.89 and 40.9 (new small canvas mask in ov.html), grade crossfades between sections.
8. **Water verse footage check.** Verify c10 river, c2 rapids, c7 pebbles actually land on 55-61.4 (currently c10 at about 56.7 and then c78/c79 for "ocean"; swap in the pool/diving shots). Verify no red-shirt boy slipped in among c60-c90 (c80 is in the avoid list; it is not in the CLIPS list, good).
9. **Quotes**: only 5; add the two new ones above (6-9 allowed). They are drawn with a heavy shadow glow; style v45 wants soft halo only, which is fine.
10. **Audio**: confirm the video audio is limited under -1 dBTP (clipped master +3.2); render check with a true-peak measure.
11. **Captions**: the explicit line is shown as the artist wrote it (artist's words, allowed). See open question 3.
12. **15 s clip**: 44.3-59.3 (Summer Walker, both CUT HER stamps, butter, start of water). It contains the biggest surprise. Fade audio in/out 0.15 s.

## Build brief (video-finisher / card-animator)
Layers, bottom to top, timing sources:
1. base footage: cut list from `params.py` (explicit beat-grid list, T0 3.402, beat 0.859), grade windows per section.
2. frosted bands (bands list), slime band, water bands (existing).
3. spine: calendar + days + sun (`prog(t)` replaced by a keyframed days-left curve: 089 at 13.71 with the glitch/jump keys above, 000 at 82.44).
4. giant words (WORDS list, chrome style flag per word).
5. text stickers: size tag 32/34, blackletter jeans sticker.
6. halftone faces (3) and max 4 halftone-ink real-photo pop-ups (no emoji).
7. quotes (7, no backgrounds).
8. stamp + glitch (new bigger stamp, jolt, RGB tear, flash; jolt/tear applied to the base video via ffmpeg `crop` expression or overlay offset at those frames).
9. captions, fvlga sticker (fixed spot >= 7 s).
10. grain/vignette; audio gain + limiter.
New tool needed: slime drip wipe (canvas mask, ~1 s) and per-word chrome gradient (canvas only, no new tool).

## Open questions (defaults if no answer)
1. Do you want the explicit lyric word shown in captions exactly as written? Default: yes, as written (your words), and the giant SLIME word carries the moment.
2. Are the pool/dive shots in c60-c90 safe to use for "ocean/dive" (some frames show children)? Default: use only wide shots with no readable faces, otherwise river c10/c2/c7.
3. Is 69.84 BPM (half-time) confirmed? Default: yes, cuts at 2-beat base; if the artist says 140, the same cut times stand (they are 4 beats of the fast grid).
