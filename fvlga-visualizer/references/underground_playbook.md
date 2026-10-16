# The Underground Rage Video Playbook
### Creative direction analysis for AI visualizers — Fvlga / Law, Oct 16 2026

**Honesty note:** YouTube put up a bot-check wall overnight ("sign in to confirm you're not a bot"), so I couldn't pull the 15 videos for frame-by-frame analysis. This playbook is built from: (a) the osamason "ik what you did last summer" video, which I DID analyze frame-by-frame tonight (145 frames); (b) sourced research on directors, crews, and stated aesthetics; (c) my knowledge of these videos. I will verify against real frames in the morning and correct anything that's off. Nothing here is presented as frame-verified except the osamason parts.

**Videos covered (16):** osamason "ik what you did last summer" (frame-verified) · nettspend "Nothing Like U" · xaviersobased "patchmade" · 2hollis "jeans" · ken carson "Fighting My Demons" · destroy lonely "NEVEREVER" · che "euphoria" · jace! "Breathe" · kankan "RRAnthem" · yeat "Monëy So Big" · prettifun "Feel Like Uzi" · septembersrich "Hellborn" · smokingskul "Vlone" · summrs "FTW" · glokk40spaz "Whatchu Sayin?!" · (+ hardrock signing clip)

---

## The 7 creative directions running the underground

### 1. Manufactured DIY — "I'm really from here"
**Who:** nettspend, xaviersobased, early osamason
**The direction:** The whole point is authenticity signaling. Fisheye lenses, VHS tracking lines, harsh direct flash, suburban streets and bedrooms — every choice says "no label, no budget, no permission." The irony (verified via nettspend's "early life crisis" credits: director, DP, colorist, stylist, MUA — a full crew) is that the DIY look is now a *produced* aesthetic. They spend money to look like they didn't.
**Techniques:** fisheye/skate lens, camcorder timestamps, flash photography freeze-frames, crew cameos, day-in-the-life montages, hard cuts on beat drops.
**Steal it for AI:** Stop generating "cinematic." Generate fisheye-distorted, flash-blown, timestamped footage. Then DEGRADE it: VHS tracking, chromatic aberration, interlacing. The recipe is generate-then-damage, not generate-pretty. Prompt pattern: "fisheye lens photo, direct flash, Richmond Virginia suburb at night, raw, unedited" — then ffmpeg: noise, rgbashift, vignette.

### 2. Sticker-bomb maximalism — irony as identity
**Who:** osamason "ikwydls" (frame-verified tonight)
**The direction:** Three voices colliding on purpose — raw street lyrics (tiny lowercase captions), dead-serious self-help book pages ("Purpose," "A Promise"), and French New Wave film credits ("un film de," PHOTOGRAPHIE). Plus meme stickers: gradient pills, badges, film strips, tracking squares. The creative bet: Gen-Z irony where sincerity and meme are the same thing. The video is "saying" five things at once and that's the personality.
**Techniques:** teal-desaturated grade, giant condensed yellow type flashing on beats, serif book overlays, sticker layer popping in/out with hard cuts, film grain.
**Steal it for AI:** The LAYERING is the idea, not any single asset. Build in passes: (1) footage/plates, (2) caption track, (3) giant type hits, (4) sticker pass, (5) grade+grain. Never bake text into the AI image — always composite it after. Fonts: condensed sans (Anton/Oswald) for hype, serif (Baskerville) for the fake-deep pages, clean grotesk (Inter) for captions.

### 3. Y2K chrome surrealism — "serious unseriousness"
**Who:** 2hollis ("jeans," "style")
**The direction:** 2hollis's own phrase for it (via critics): serious unseriousness. High-gloss Y2K chrome, liquid metal, early-internet UI, mall-goth fashion — played completely straight while being absurd. The "style" video is literally one static torso shot; fans called it "aura farming." The direction trusts charisma over production.
**Techniques:** chrome/liquid 3D, Y2K web graphics, minimal sets, static or slow camera, fashion-first styling (eyeliner, cross necklaces), deadpan performance.
**Steal it for AI:** This is the easiest archetype for AI — surreal chrome scenes are what generators do best. Prompt pattern: "liquid chrome 3D render, Y2K aesthetic, iridescent, black background." Keep the CAMERA static; let the weirdness be in the materials, not the motion.

### 4. Opium high-fashion darkness — vampire luxury
**Who:** ken carson, destroy lonely
**The direction:** Red and black everything. Concert/riot footage mixed with cathedral imagery, leather, smoke. The bet: rage music as dark luxury — it's not a mosh pit, it's a fashion show in hell. Destroy Lonely's videos lean cinematic (real locations, real cinematography); Ken's lean on performance energy.
**Techniques:** red gel lighting, heavy smoke/haze, black leather and cross jewelry, gothic architecture, aggressive strobe cutting, letterboxed 16:9.
**Steal it for AI:** Red is doing 80% of the work. Prompt pattern: "figure in black leather under red gel lighting, cathedral interior, smoke, cinematic." Grade: crush the blacks, push reds. Strobe-cut on beat drops (hard cuts every 2-4 beats in the hook).

### 5. Trippy surrealism — the dreamscape
**Who:** yeat ("Monëy So Big" era)
**The direction:** Surrealist CGI worlds — neon, anime, cyberpunk, glitch art, video-game logic. Yeat's whole persona is a cartoon character who happens to rap; the videos match by abandoning reality entirely. No pretense of authenticity — the opposite of archetype 1.
**Techniques:** full-CGI environments, neon palettes, anime/cartoon inserts, glitch transitions, impossible physics, mascot-like character design.
**Steal it for AI:** This is where AI generation genuinely beats filming — nobody can film a neon dreamscape cheaply, but you can generate one. Go fully synthetic; don't mix with real footage or it breaks the spell. Video generators (not just stills) matter here — motion sells the dream.

### 6. Jerk dance documentary — the scene films itself
**Who:** xaviersobased ("patchmade" — "Shot By @andivauss"), nettspend early
**The direction:** The jerk revival's visual language is the dance itself. Videographer-tag culture ("Shot By ___") — the filmer is a character. Day-in-the-life NYC footage, dance clips, the crew. The creative direction is barely a direction: point the camera at the scene and don't get in the way.
**Techniques:** handheld following shots, dance-circle framing, videographer watermark tags, natural light, minimal grading, compilation pacing.
**Steal it for AI:** You can't AI-generate "the scene." This archetype is the argument for filming yourself (like your 5 clips). If you must generate: prompt for movement and crowds, fisheye, daytime. But honestly — this one you shoot on your phone.

### 7. Gothic horror — the underground's metal side
**Who:** the "cuff no dancer" reference aesthetic, city-morgue-adjacent
**The direction:** Blackletter typography, kaleidoscope/mandala patterns, VHS damage, halftone portraits, occult-ish symbols (smiley faces, crosses). It borrows from black metal and horror movies to make rap feel dangerous again.
**Techniques:** blackletter fonts (Pirata One/Unifraktur), RGB-split/chromatic aberration on type, kaleidoscope backgrounds, scanlines, halftone/duotone portraits, jitter bursts.
**Steal it for AI:** Generators do great kaleidoscope/dark-pattern backgrounds. But the PORTRAITS must be real photos of you (halftone treatment in post). Text always composited after, never baked in. This is the archetype your cuff-no-dancer final used.

---

## Cross-cutting rules (the real siphon)

1. **The artist's face/body is the anchor.** Every one of these videos is built around the artist's physical presence. Our failed visualizers had zero you in them — that's the #1 fix, and your 5 clips proved it.
2. **Text is a main character, not decoration.** Kinetic type carries verses in osamason, yeat, and the gothic videos. Budget your effort accordingly: typography pass > background pass.
3. **Degrade, don't polish.** VHS lines, grain, chromatic aberration, interlacing, compression artifacts — the underground aesthetic is damage. A clean AI render reads as "AI"; a damaged one reads as "real."
4. **One strong idea per video.** Each video above commits to ONE direction. Our mistake was stacking five weak ideas (plates + stickers + books + captions + grade). Pick one archetype per song.
5. **Vertical is the native format.** The underground lives on TikTok/Reels. Shoot and cut 9:16 first; 16:9 is for the "official" statement videos.
6. **The grade is the brand.** Teal (osamason), red/black (opium), chrome (2hollis), neon (yeat) — pick a palette and never leave it for the whole video.
7. **Edit on the drums.** Hard cuts on beat drops, type flashing on snares, jitter on 808s. The edit rhythm IS the creative direction in rage videos.

## Concrete starter recipes

**For your next cuff-no-dancer-style video:** film yourself (done) → blackletter hook words (done, in text-overlays/) → RGB-split + scanlines + jitter → red/black grade option.
**For a yh-yhhh redo:** pick ONE archetype — I'd go sticker-bomb maximalism with your footage as the base layer instead of AI plates → captions + giant yellow type + sticker pass.
**For a new song:** pick the archetype FIRST (which of the 7 fits the song's energy?), then build only that.

---
*Sources: frame analysis of osamason "ikwydls" (Oct 15); Vimeo credits for nettspend ELC visuals (dir. @digital1aura); Dazed/Pitchfork/nobells on 2hollis; Last.fm bios for xaviersobased; web sources on yeat's visual aesthetic. Frame verification of the 15 videos pending (YouTube bot-wall).*
