# Project style — the single source of truth

Every agent reads this file at the start of every run. When the artist
corrects a direction ("no blackletter", "more grain", "name only in the
intro"), update THIS file — not just the prompt pack or the build script.
Prompt packs, grades and QA reports are dated outputs; this file is the
living record of what "on-brand" means.

## Creative direction (read first)
The artist's playbook is `fvlga-visualizer/references/underground_playbook.md`:
7 archetypes (manufactured DIY, sticker-bomb maximalism, Y2K chrome, opium
red/black, yeat dreamscape, jerk documentary, gothic horror) and 7 cross-cutting
rules. Binding rules for every song:
1. Pick ONE archetype per song before building anything; record it in the
   per-project notes below. Don't stack weak ideas from several archetypes.
2. The artist's own face/body is the anchor: their clips or cut-outs appear in
   every section of the song.
3. Text is a main character (typography pass > background pass); never bake
   text into AI images, always composite it after.
4. Degrade, don't polish: grain, chroma split, scanlines, compression damage.
5. One palette for the whole video (the grade is the brand).
6. Edit on the drums: hard cuts on drops, type on snares, jitter on 808s.
Cha Ching playbook with MEASURED cut rhythm (burst-then-hold), 13 text-card formats, two alternating grades,
watermark layer: `fvlga-visualizer/references/chaching_playbook.md` (reference, not a rulebook; copy formats,
never the wording — many source cards quote self-harm lines, write original text).
Reference breakdowns (user-supplied, unverified by Claude): `fvlga-visualizer/references/cha_ching_breakdown.md`
(persistent watermark system, split-screens, iMessage/ticker/questionnaire collage). Ideas only — don't add
a permanent overlay unless the artist asks (they just removed always-on overlays).
Transitions: follow `fvlga-visualizer/references/rage_transition_bible.md`,
deployment rules first — 70% hard cuts / 20% ONE workhorse / 10% spectacle,
impact frame ON the transient, never the same transition on adjacent cuts,
render each transition as its own clip then assemble.
VFX tier + quality principles: `fvlga-visualizer/references/vfx_transitions_and_quality.md`
(song is the script, cut on the beat ~80%, one palette, first 3 seconds, text with
purpose, sound under transitions, build order ending in a 30% restraint pass).
Sound design: synthesized locally in `src/sfx25.py` (no stock downloads); never alter the
master file — write a new mix and limit to -1 dBTP. Reusable presets:
`fvlga-visualizer/src/transitions.py` (shake_rgb, zoom_punch, camera_drop,
vhs_tracking, flash); planner example: `src/plan22.py`.
Where the playbook and the per-project notes disagree, the artist's later
direct corrections (per-project notes) win.

## Frame spec
- Full-bleed music video frame in the requested delivery format: 1920x1080 landscape (16:9) or 1080x1920 vertical (9:16).
- It is NOT a card, poster, tarot card or mockup: no borders, no frame edges, no margins.

## Typography (in priority order)
1. **Primary:** high-contrast italic serif (Didot / Bodoni italic), elegant, sexy.
2. **Secondary:** flowing calligraphic script.
3. **Accent:** liquid chrome — for titles and emphasis only.
4. **Blackletter/gothic:** ONLY when the artist explicitly asks for it on a
   specific piece. It is not a default, even for titles. (Learned the hard
   way: a full set of ad-lib slides had to be regenerated after a generator
   defaulted to blackletter.)
- Never: blocky, condensed or bold sans-serif.

## Palette
- Core: acid green, hot pink, deep purple, black.
- Brand accents to PROTECT (never let a grade wash these out): neon yellow,
  dark red, chrome.
- Texture: heavy film grain, soft glow, light leaks, slight chromatic aberration.

## Imagery rules
- Everything original: no real logos/brands, no recognisable real people.
- Figures far away, from behind, or silhouetted — no visible faces unless the
  artist asks.
- Should look expensive and handmade, not clip-art or template.

## Name / title discipline
- Artist name and song title appear rarely (intro + ending) unless the artist
  asks otherwise.

## Per-project notes — FVLGA "CUFF NO DANCER" (updated Oct 16)
- Archetype: sticker-bomb maximalism (osamason "ikwydls") with gothic-chrome
  bookends (intro title, ending). Intro is a 5-bar beat-sequenced title (v20).
- Transitions (v22): workhorse = shake + RGB split burst on snare cuts; spectacle =
  camera drop into verse (27.2) and pre-chorus (69.27), VHS tear on the tag (64.9),
  white flash into hook 2 (79.47), zoom punches on hook 4-bar marks; constant 3px
  RGB hum after the intro. No spin / light-leak burn (wrong vibe for this track).
- Kaleidoscope (v26): RETIRED ENTIRELY — artist: the crystal-ball scene "doesn't fit with the
  vibe of the video". Its ~20 cuts are now 1960s footage / footage with the artist
  composited in. Don't bring back the smiley, the neon skull mandala, or the ball.
  (history) Kaleidoscope bubble (v24): the neon smiley is retired (artist: "doesn't fit any more");
  the bubble now holds the artist's face, blue-cyan duotone + neon silhouette
  (src/crystal_ball_face.py). Don't bring the smiley back.
  The loud red/yellow/blue neon skull pattern around it is also retired: the
  mandala is now folded from teal-graded 1960s rapids footage, no hue cycling.
- Zine layer (v28): NO red film strip and NO volume-meter pills (artist, Oct 16). Quote boxes
  must change spot AND look every time (book page / receipt / sticky note / neon script /
  ransom cut-outs / terminal) — artist wants variety, even whole new art styles.
- Watermark (v33): the pink "fvlga" sticker POPS everywhere like the quote cards — a new random spot every half bar
  (sometimes two), clear of caption/badge/quote box — and its lettering changes FONT and COLOUR every time (pink oval stays).
  Artist (Oct 16): "popping every where... colour and font of the fvlga changes each time".
- Opening (v33): artist likes the new opening but NOT the part where his cut-outs pop up — no cut-out pile in the intro
- Opening lettering (v37): ONE typeface only (Playfair italic black, cream) — artist rejected the multi-font per-letter collage. Word slams in with RGB ghosts then a pink marker underline draws under it. Artist gave creative control on the intro.
- Tile-grid card (v34): a held shot split into a 3x2 grid of rounded tiles with black gaps (osamason banner look), used on only ~2 scenes. Masks src/grid_a.png/grid_b.png, overlay in src/build_v34c.py.
- Sticker (v35): back to hopping to a new spot every bar, same lettering; its colour follows the scene (palette sampled per cut, src/vfx/scn_colors.json). Known issue: lands on faces — see references/fix_plan_v36.md.
- v36 fixes (from references/fix_plan_v36.md): micro-text, status list, barcode bars, blue badge removed; sticker uses edge anchors + per-frame person keep-out (faces.json); off-teal windows re-graded; bars hard-matted black; giant words 86% width; grid B shortened. Not fixed: repeated shots, per-tile crop variety, quote placement inside tiles.
  (bar 4 is footage + words instead). Cut-outs stay for the 'alone' shot and the ending.
- (history) Watermark (v32): the pink "fvlga" oval sticker is BACK (artist: "i like the sticker, the pink one") but it must MOVE:
  it hops to a new spot every bar, clear of caption/badge/quote box. (history: briefly removed in v31.) Original: small pink oval "fvlga" sticker bottom-left through the whole video (from the Cha Ching
  reference), hidden on the alone shot and the ending. Artist can veto with "no sticker". The green
  banknote block / right-edge bars from the reference are NOT used (artist removed right-edge bars).
  Quote styles are now 9 (adds highlight-bar caps, repeating-word wall, chat thread).
- Intro (v32): the chrome-gothic title opener is SCRAPPED (artist: "doesn't fit"). New opening is built from the video's own
  language: teal 1960s footage, giant serif words (cuff / no / dancer) slamming on beats, you in the scene, you piling up as
  stickers, the pink sticker, white-out into the first cut. Source: src/vfx/intro2.html.
- (superseded) Intro (v28): first bar is a flash-montage of title variants with squiggly neon lines; the
  rest eases in (soft-attack beat envelope, no hard strobe).
- Deliverables: the full-song video + the 15 s clip ONLY. No 30 s versions (artist, Oct 16).
- Alone shot (65.13–69.25): the artist's cut-outs pop up as stickers on the beat (v21).
- Picture layout: the legacy 16:9 strip, explicitly requested by the artist:
  1080x608 centred in a 1080x1920 black frame at y=656 (see
  fvlga-visualizer/render.json; bars must stay pure black). Selfie clips are face-tracked
  into the same strip.
- Grade direction: osamason "ik what you did last summer" — teal-cyan
  desaturated on footage and performance shots; brand colours protected on
  graphics (neon yellow #E4FF3F giant words, dark red #6b0f12 / #4a0709 blocks).
- Giant kinetic words: black-italic serif (Playfair Display Italic 900) — thin
  dark outline + slight red/cyan split over footage, plain on colour blocks.
- Lyric captions: tiny lowercase cream #F5E9A8 sans (Inter) bottom-centre on a
  dark pill; use the artist's OFFICIAL lyrics (captions_official.json).
- Footage: 1960s public-domain 16mm of people outdoors (the boy in the red
  shirt, kids in nature). Artist wants it — but not wall-to-wall: aim for about
  half footage, half graphics (Oct 16: "now it's a lot").
- Chrome gothic title is allowed for the intro title and the ending only (the
  artist's own Gemini art).
- Rejected (don't bring back): blackletter ad-lib slides; blocky condensed
  type (Anton) for name/title or ad-libs; swirl/emboss leftovers; FVLGA name
  cards mid-video; warm/orange grade on footage; heavy distortion on footage.
- v37 notes: quotes never get a dark box/scrim (book page = cream paper, terminal = mint card, yellow highlighter caps replaced by red graffiti scrawl). Sticker only jumps on a new scene (colour distance + min 0.85 s; ~28% chance to jump on similar scenes). References: references/13_video_breakdowns.md (more tips coming from the artist).
- v38: artist loves the halftone/xerox face look — use it on every shot of his face (perf cutaways + lip-sync) EXCEPT the dark/black neon-edge ones, which stay as they are. Sticker holds a fixed spot for >= 7 s (jumps only on a clearly new scene after that); its COLOUR still follows the scene even while it stays put.
- v39: lyric pop-ups (keyword -> small picture when the word is sung, ~23 in the song). Colour emoji looked childish (artist) -> now black-ink halftone dot prints on torn cream paper with tape and a typewriter tag, same family as the xerox face look. Keep them away from face, caption, quote box and the fvlga sticker.
- v40: lyric pop-ups use real photos (Unsplash via connector, scanned) turned into black-ink halftone prints on torn paper — emoji/cartoon icons read as childish and were dropped. Keep the look xerox/zine, never cartoon.
- v41: lyric pop-ups have NO container: subject-only halftone ink (pics2/, dots only where the photo differs from its background), feathered edge, 0.45 s fade in / 0.4 s fade out, ink dark or cream by the scene's brightness. Artist wants every final clip to score >= 8/10 in the scored QA pass.
- v44/v45: quote cards have NO backgrounds (plain lettering, dark/cream ink by scene brightness, soft halo, fade in). Lip-sync face (38-53 s) stays on screen — only 3 lyric cards cut in; look cycle halftone/halftone/natural/halftone. Sticker plans one spot per >=7 s hold away from faces/quote boxes; intro sticker holds one spot. Name composites off mid-video. Strict scored QA history: v41 6.4, v43 6.8 (target >= 8).
- v46-v48: strict scored QA plateaued at 7.3/10 (target 8). Done: quote ink from luminance under the slot + halo stroke, name text suppressed mid-video, pop-ups cut to 4 clear subjects, graffiti note in scene colour, extended teal windows, audio limiter (alimiter must use level=disabled or it re-amplifies; AAC 256k keeps true peak under -1 dBTP). Still open: repeated house/bike/river clips, selfie 79.8-83 not halftone/teal, 79.43-79.8 flash 11 frames, orphan blown cards at 16.4/98.9/101.4, notes box over hair 79.8-80.8, off-teal 24.5 and 86.
- v49: face shots (lip-sync + halftone cutaways) are pulled back to 62% size with a blurred dark fill at the sides — the face was too close on a phone. The dark neon-edge faces (e.g. the 1:25 tile grid) stay exactly as they were (artist likes them). The old "alone" shot with the cut-out pile (65.1-69.25) is gone; replaced by a 3x2 outfit contact sheet (src/gridalone.py): six full-body cut-outs on halftone teal tiles, one per beat, slow push-in.
- v50: ALL quotes are real, attributed, public-domain lines (Frost, Eliot, Whitman, Dickinson, Henley, Hughes, Wilde, Nietzsche, Shakespeare, Fitzgerald, Emerson, Tennyson, Brontë, Carroll — list in src/vfx/osa.html QUOTES/PAGES); no invented quotes or fake receipts/book pages. Quote cards appear ~2x as often (88% of 2-bar windows). Lyric-song quotes are never used as decoration. Wording was written from memory of the public-domain works — double-check before posting captions.
- v51: NO cut-outs of the artist anywhere on screen (artist dislikes them popping up): the alone scene is now four generated stills (src/genart, made with the Figma image connector — Canva's generate-image only returned a 199 px preview, too small) cut on the beat with push-ins; the ending card has no cut-outs. Quotes have no outline (soft glow only). Use image-gen connectors for visuals that are hard to draw in code.
- v52: artist does NOT want the AI-generated images (removed genart + alone2). The frosted translucent "bands up" band is liked: three full-width bands across the screen (quote style 7, and stacked one per bar over the field shot 65.1-69.25 s). Quote pool = original lines in the old voice (the artist liked those; write MORE of the same mood) + real attributed public-domain quotes; author line only on the real ones. Quotes have no outline.
- v53: no author names on any quote or book page (artist: "we don't need the auteur"). Quotes are just the line.

## Per-song vibe + font discipline (artist, Oct 2026)
- The guidelines are guardrails, not a template: every song gets its own vibe, sticker, type treatment and motion. Don't copy the last video's devices.
- Fonts throw the artist off when mixed: maximum 2 families per video (one display serif italic + one UI sans). Numbers, stamps, tags, calendars and counters use the UI sans, not novelty/mono/condensed faces.
- Run `preflight-checker` before every full render.
- CUT HER MIC (summer/countdown, sticker-bomb): spine = "SUMMER ENDS IN n DAYS" counter + calendar tile + sinking sun; round rotating "fv" seal as the sticker; warm summer grade with teal water; red-shirt boy retired from cuts.
