# Cha Ching (Osamason & Nettspend) — visual playbook

Reference for the visualizer agents (style, reference-analyst, card-animator, colorist, visualizer-qa).
Read this when planning cut-aways, text cards, color grades, or branding. It is a reference, not a rulebook.

**Source:** "Osamason & Nettspend - Cha Ching (Official Music Video)", https://www.youtube.com/watch?v=p0aH9vofRrI
**Local files:** `reference/chaching/chaching.mp4` (1276x720, ~29.97 fps, 64.26 s), `sheets/s_01..06.jpg` (2 fps contact sheets, 24 frames each, 12 s per sheet), `cuts/` (frames at detected changes), `f2/` (every 0.5 s).

## Confidence labels
- **MEASURED** = computed with ffmpeg (scene filter `gt(scene,0.2)`, 149 detections).
- **OBSERVED** = seen in still frames at 2 fps.
- **INFERRED** = guessed from stills; motion/audio not verified. Confirm before treating as fact.
- Audio was NOT analysed. No beat-sync claims are made. Run beat-analyst against the track before copying any rhythm.

## 1. Cut rhythm (MEASURED)
- ~149 detected changes in 64 s (avg one per 0.43 s), but very bursty.
- Rapid bursts, changes every ~0.13 s: 0.5-1.6 s, 11.5-12.6 s, 19-20.9 s, 22.5-23.4 s, 32.5-34.6 s, 49.1-51 s, 63.3-63.9 s.
- Holds of 1-3 s between bursts (e.g. 14.2 -> 15.9 -> 17.5 s; 39.3 -> 44.6 s is the longest gap at ~5 s).
- Pattern: **burst, then hold**. The hold gives a card or a lyric room to be read.
- Use: fits the existing 70-20-10 deployment as a contrast rule. Never run uniform cut speed.

## 2. Two alternating looks (OBSERVED)
| Look | Description | Where |
|---|---|---|
| Night pool | green/teal/cyan cast, floodlights, blown highlights, people at a pool | most of the footage |
| Red club | whole frame crushed to red monochrome, near-black shadows, hot white highlights | many cuts, often tight on faces and hands |
| Graphic cards | flat full-frame color: yellow, hot pink, pastel blue, near-black | text cut-aways |

- The grade swaps hard between cuts (no gradual fade). Colorist: build two presets, `teal_night` and `red_mono`, and let the planner alternate them.

## 3. Branding layer (OBSERVED)
- A small oval "Lil Flux's" logo sits bottom-left on essentially every frame, in a fixed position.
- A small green grid icon appears bottom-right from ~0:35 onward and stays.
- Use: a persistent watermark layer composited last, plus an icon that appears partway through (a mid-video "state change").

## 4. Text card formats (OBSERVED)
Text is the main device. Formats seen, safe to reuse as templates:
1. **Fake multiple choice**: `i ____ you` with a) to g) options, small, over footage.
2. **Giant single word** filling the frame, semi-transparent over footage (`ME`).
3. **Name card**: huge lowercase word with a period (`lil nett.`) over the performer.
4. **Repetition stack**: the same line 5 times in a column, shifted slightly per row (`FUCK THE CULTURE` x5). Good for a hype or hook line.
5. **Poem/quote card**: small serif or mono text on flat yellow, pink or blue.
6. **Chat screenshot**: an iMessage-style panel beside the footage.
7. **Survey/quiz list**: 15-20 numbered questions in small type, color-coded, over footage.
8. **Highlighted word in a repeating wall** (`self hate` tiled, one phrase highlighted).
9. **Fake paint-program UI**: tool icons around the frame with hand-drawn text.
10. **Kaomoji/emoticon** (`:3`, shrug face) in a pop color.
11. **Lyric caption**: small italic, bottom-center, white or yellow, over the red look.
12. **Slogan poster**: bold block text on a flat color (`flex time`, `smoke mad blunts.`).
13. **Fake clickbait button text** in bold yellow, centered.
- Palette for text: yellow, hot pink, mint/pastel green, white. Heavy sans-serif (grotesk) for slogans, small serif or mono for quotes and lists.
- Use: card-animator gets these as templates; planner drops a card for 2-6 frames inside a burst or 1-3 s during a hold.

## 5. Footage treatments (OBSERVED unless stated)
- **Striped color-shift bars** over footage (vertical slices, rainbow offset). INFERRED to animate.
- **Face-tracking circle**: thin pale outline around a face. Needs OpenCV face tracking (opencv + opencv_contrib in the toolkit).
- **Blown-out white flash**: whole frame goes to white around 0:11. Maps to existing `flash` / `exposure_burn_in/out`.
- **Vertical stretch / flipped tinted face**: warped or mirrored clip. INFERRED.
- **Split frame**: two panels (cut-out graphic next to footage).
- **Picture-in-frame**: a smaller clip or poster inside a colored frame.

## 6. Mapping to the visualizer toolkit
| Idea from this video | Existing piece | Gap to build |
|---|---|---|
| burst-then-hold rhythm | 70-20-10 rule in `rage_transition_bible.md` | add a "min hold after a burst" rule |
| white flash | `flash`, `exposure_burn_*` in `transitions.py` | none |
| shake/zoom bursts | `shake_rgb`, `zoom_punch` | none |
| cut-out stickers | `stickers.py`, `cutstill.py` | none |
| text cut-aways | none | text-card templates (section 4) |
| two grades | colorist agent | `teal_night`, `red_mono` presets |
| fixed watermark + late icon | none | overlay step at render time |
| face circle | none | OpenCV tracked overlay |
| fake UI panels | none | chat panel, quiz list, paint toolbar templates |

## 7. Content note
Many cards in the source quote self-harm and suicide lines. Copy the card **formats**, not the wording. Write original text for the artist's own project.

## 8. Not verified
- Beat alignment, BPM, and audio-reactive behavior.
- Exact animation curves (slide, scale, shake) because only stills were reviewed.
- Resolution on the 9:16 strip: this source is 16:9 only.
