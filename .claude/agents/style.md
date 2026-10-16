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
