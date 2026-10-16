# VFX TRANSITIONS + WHAT MAKES A MUSIC VIDEO GOOD
### Companion to the Transition Bible — Fvlga / Law, Oct 16 2026

The Bible covered 20 edit-based transitions. This doc covers the **VFX tier** — the After Effects moves that make people ask "how did they DO that" — plus the principles that separate a good music video/visualizer from a forgettable one. Written so your Claude can build from it.

---

## PART 1: THE VFX TRANSITIONS

These live one level above cuts and wipes. Each one lists the AE build (effects Claude can look up) and an ffmpeg approximation where one exists. Rule of thumb: if there's no clean ffmpeg recipe, pre-render the transition as its own clip (see Bible rule 6).

### 1. IMPACT SHAKE (the bass-hit transition)
**What it is:** On a bass drop or gunshot ad-lib, the frame violently shakes with directional blur for 6–10 frames while the new shot punches in underneath. The shake IS the cut — it hides inside the chaos.
**AE build:** Two shots stacked. On the incoming shot: keyframed Position jitter (±40px random, new value every 2 frames) + Directional Blur (direction = shake axis, blur length 0→60→0) + 1.1x scale punch. Add a 2-frame white flash at the impact frame. Sound design: sub drop + vinyl crackle.
**ffmpeg approx:** The shake-burst recipe from the Bible (crop + random()) with `boxblur` added, fired on the transient.
**When:** 808 drops, the hardest bar of the verse, producer tag.

### 2. ENERGY WARP
**What it is:** The image stretches and smears toward a vanishing point (usually center or the artist's face), colors separate into RGB streaks, then snaps into the new shot. Like being sucked through the screen.
**AE build:** Optics Compensation (reverse lens distortion, FOV ramping 0→80 over 8 frames) + CC Force Motion Blur + RGB channel split via Shift Channels. Easing: HARD-OUT.
**ffmpeg approx:** `zoompan` aggressive zoom (1.0→1.6 in 8 frames) + `rgbashift` ramp + `gblur`. Not true warp, but reads the same at speed.
**When:** Beat switches, entering the hook, "level up" moments.

### 3. SEAMLESS OBJECT WIPE (the Cole Bennett special)
**What it is:** An object in shot A (a hand, a car, a door, the artist walking past the lens) wipes across the frame — and shot B is revealed as if it was always behind it. The viewer never sees a "transition," just continuous motion.
**AE build:** This is 90% planning: end shot A with a foreground object crossing the lens, start shot B with a matching object crossing. In AE: mask the object, use it as a track matte for the incoming shot. Roto Brush for the object edge.
**ffmpeg:** `maskedmerge` with a hand-drawn/object matte — but honestly, shoot it right and it's just a hard cut.
**When:** Location changes, outfit changes. The classiest transition on this list. Lyrical Lemonade built an empire on it.

### 4. LIQUID MORPH
**Look:** Shot A melts like liquid — drips, ripples, warps — and reforms as shot B. Trippy, organic.
**AE build:** Reshape or Liquify with animated distortion mesh + Turbulent Displace (evolution animated fast) + a 4-frame cross-dissolve buried in the middle of the melt.
**ffmpeg approx:** `turbulent` isn't native. Poor man's: `geq` sine-wave displacement animated + `tblend`. Or pre-render the melt in Python (PIL/OpenCV remap with animated noise field).
**When:** Yeat-type trippy tracks, beat switches into melodic sections.

### 5. ROTO FREEZE + CAMERA MOVE
**What it is:** The artist freezes mid-motion (rotoscoped out), the background keeps moving or the "camera" pushes in 3D, then motion resumes into the new shot. Time stops for one person.
**AE build:** Roto Brush the artist, freeze their layer (time remap hold), animate the background layer's scale/position behind them, then release. 12–20 frames of freeze.
**ffmpeg:** Not feasible — needs roto. Note for Claude: this is the one that requires either AE or a segmentation model (BiRefNet/RMBG) to cut the person out.
**When:** The coldest moment in the video. One per video max.

### 6. LIGHT SWEEP WIPE
**What it is:** A blade of light (lens flare streak, white-hot edge) sweeps across the frame; the new shot is revealed in its wake with a brief overexposed bloom.
**AE build:** Solid layer with a linear gradient mask, animated across + Optical Flares or a simple Glow on the leading edge + 3-frame exposure bump on the incoming shot.
**ffmpeg approx:** Pre-render a white-gradient PNG, `overlay` it sliding across with `format=rgba` opacity animation, `eq=brightness` bump on the incoming.
**When:** Euphoric lifts, chorus entrances, day-to-night flips.

### 7. PARTICLE DISSOLVE
**What it is:** Shot A breaks into hundreds of particles (dust, embers, glass shards) that blow away, revealing shot B forming from particles.
**AE build:** Trapcode Particular (or free: CC Particle World) — emitter from the luminance of shot A, wind + gravity, 15–25 frames. This needs a plugin or patience.
**ffmpeg:** No. Pre-render particles with alpha (there are free stock packs) and overlay them; do a cross-dissolve underneath timed to the particle peak.
**When:** Emotional bridges, beat switches, outros. Expensive-looking, use sparingly.

### 8. 3D PUSH THROUGH
**What it is:** The camera pushes INTO the frame — through a doorway, past the artist's shoulder, into a screen — and emerges in the new location. One continuous move, no cut visible.
**AE build:** Two shots as 3D layers in AE's 3D space, camera animated through them. Or: end shot A pushing toward a dark shape, start shot B pulling out of a matching dark shape (the poor man's version — just a hard cut between two pushes).
**ffmpeg:** The poor man's version is just two zoompans + a hard cut. The full version needs AE.
**When:** Verse-to-verse location changes. Feels expensive even when it's faked.

### 9. DISPLACEMENT RIPPLE
**What it is:** A shockwave ripple distorts the image outward from a point (usually the bass hit), like dropping a stone in water — the new shot is under the ripple.
**AE build:** Radio Waves or Ripple effect centered on the impact point, amplitude ramping 0→100→0 over 12 frames, then the cut under peak distortion.
**ffmpeg approx:** `geq` with radial sine displacement animated — doable, ~10 lines of expression. Or Python pre-render with OpenCV remap.
**When:** Bass drops, literally any 808 moment. Pairs with impact shake.

### 10. PROJECTOR ROLL
**What it is:** The image rolls vertically like a broken film projector (with the black bar and frame lines visible), then locks into the new shot. Pure cinema nostalgia.
**AE build:** Offset effect animated vertically + a black bar layer + slight vertical blur during the roll. 12–18 frames, the roll decelerates HARD into lock.
**ffmpeg:** `crop`/`overlay` with animated y-offset is fiddly; easier: `scroll` filter or pre-render. Add `noise` + vignette for the projector feel.
**When:** Retro/lo-fi videos, intro→verse, skit sections.

### 11. VENETIAN BLIND / SLIT REVEAL
**What it is:** The new shot is revealed through animated horizontal (or vertical) slits that widen — like blinds opening.
**AE build:** Venetian Blinds transition effect (built into Premiere/AE), 10–14 frames, direction matched to the music's energy.
**ffmpeg:** `xstack`/`crop` bands animated — or the `tile` + crop trick. Very doable: split incoming into N horizontal strips, animate each strip's width.
**When:** Clean, rhythmic reveals. Works on any genre.

### 12. INK / SMOKE REVEAL
**What it is:** Black ink (or smoke) blooms across the frame from an edge, swallowing shot A; it clears to reveal shot B. Organic, dark, premium.
**AE build:** Stock ink-footage with luma matte: ink clip as track matte for the incoming shot, 15–25 frames.
**ffmpeg:** Same idea without AE: download a free ink-reveal stock clip (black ink on white), use it as mask: `[ink]format=gray[mask]; [a][b][mask]maskedmerge`. Totally doable in ffmpeg.
**When:** Dark/opium/gothic tracks, intros, beat switches. Your lane.

---

## PART 2: WHAT MAKES A MUSIC VIDEO / VISUALIZER GOOD

Transitions are seasoning. These are the meal. Every great underground video nails most of these; every forgettable one misses them.

### 1. THE SONG IS THE SCRIPT
Before a single frame: map the song. Intro / verse / pre / hook / bridge / outro. Each section gets ONE visual idea and ONE palette shift. The intro sets the world, verses add information, the pre builds tension (tighter framing, more contrast, faster movement), the hook goes biggest (wider scale, larger type, more motion), the outro settles (sparser, brighter, or emptier). If your edit doesn't change when the song changes, it's wallpaper.

### 2. RHYTHM: CUT ON THE BEAT, BREAK ON PURPOSE
Default: cuts land on transients (kicks, snares, 808s). But cutting on EVERY beat gets predictable — the pros deliberately let some shots linger past a musical change to create tension, then release with a hard cut. Rule: cut on the beat 80% of the time; the 20% where you don't is what makes the 80% hit.

### 3. ONE PALETTE = ONE BRAND
Teal (osamason), red/black (opium), chrome (2hollis), neon (yeat). Pick the grade before you shoot and never leave it. A video that wanders between grades looks like a compilation; a video locked to one grade looks like a world. For AI visualizers: write the palette INTO every generation prompt, then unify with one final grade pass.

### 4. SHOT SCALE VARIETY
Wide → medium → close-up → extreme close-up, constantly rotating. The #1 amateur tell is five medium shots in a row. For visualizers (no camera): vary your "shot scale" with type size and background density — giant type = close-up, tiny captions + wide plate = wide shot. Same psychology.

### 5. PERFORMANCE TRUTH
The artist has to look like they mean it. Dead eyes kill million-dollar videos; conviction sells phone footage. For your videos: perform to the camera like it's a person. (Your 5 clips have this — that's why the rebuild worked.)

### 6. THE FIRST 3 SECONDS
Nobody "watches" anymore — they decide. The opening frame must be the most striking image in the video, and something must MOVE within the first second. No slow fades in. No title cards. Cold open on the hardest visual, then earn the rest.

### 7. TEXT WITH PURPOSE
Every word on screen must do a job: lyric caption (information), hook word (impact), or texture (vibe). Random words are wallpaper. And: never bake text into AI generations — composite it after, always, so you control timing, font, and placement.

### 8. RESTRAINT (THE 70-20-10 ECHO)
70% of the video should be "just" the artist + grade + hard cuts. 20% is your workhorse device (one transition, one text style). 10% is spectacle. The underground videos that last are the restrained ones — nettspend's fisheye clips are 90% just him and a camera.

### 9. SOUND DESIGN IN THE EDIT
Transitions need sound: whooshes under whip pans, sub drops under impact shakes, vinyl crackle under VHS glitches, risers into drops. A transition with no sound design feels like a PowerPoint. This is the cheapest upgrade in this whole doc — a whoosh pack costs nothing.

### 10. THE LOOP / THUMBNAIL FACTOR (visualizer-specific)
A visualizer lives on a small screen, often muted, often looped. Design for it: strong central composition (the middle 50% of the frame is all that matters on a phone), readable type at thumbnail size (if you can't read it at 2 inches, it's too small), and an end state that flows back into the start state for clean loops.

---

## CLAUDE'S BUILD ORDER (for your Claude)
1. Map the song structure. Assign one visual idea + one palette per section.
2. Cut the footage to the beat grid FIRST (hard cuts only). No effects yet.
3. Lock the grade across everything.
4. Add the text pass (captions, then hook words).
5. Add transitions per the 70-20-10 rule, each landing on a transient.
6. Sound-design the transitions (whooshes, drops, risers).
7. One restraint pass: remove 30% of the effects. What's left is the video.

*Sources: AE tutorial ecosystem (EditingVisuals/Pelle Sjöberg impact + energy warp builds, MOSH Edit whip/zoom/match-cut, cineff_visuals slide, Asim Nauwag Lyrical Lemonade/Cole Bennett breakdowns); DMME.net genre-editing guide; vectree.io music-video production notes; fleetdjradio editing analysis; UrduPure AI-visualizer structure guide. Frame-verification of cited videos pending (YouTube bot-wall).*
