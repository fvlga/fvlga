# THE TRANSITION BIBLE
### 20 underground rage transitions, spec'd to the frame — for Claude to reproduce
Fvlga / Law — Oct 16, 2026

**Note:** YouTube is bot-walling downloads tonight, so new-video frame pulls are pending. Transition specs 1, 4, 8, 14 are verified against the 145-frame osamason "ikwydls" analysis. The rest are the documented genre vocabulary (nettspend/xavier/yeat/2hollis/ken carson/opium scene) — every spec below is implementation-ready; frame-verify in the morning.

**Conventions used throughout:**
- All frame counts at **30fps**. (At 24fps, multiply by 0.8 and round.)
- "The cut" = the exact frame where shot A is fully replaced by shot B.
- Easing: `STEP` = instant jump, `HARD-OUT` = fast start then abrupt stop (no soft landing — the underground never eases softly).
- ffmpeg recipes assume two inputs: `[a]` (outgoing) and `[b]` (incoming), and time `t` in seconds.

---

## 1. HARD CUT (the foundation)
**Look:** No transition at all. One frame is shot A, the next frame is shot B. The aggression IS the point.
**Frame anatomy:** Frame N = 100% shot A. Frame N+1 = 100% shot B. Zero blend frames. Ever.
**Parameters:** Cut lands EXACTLY on the transient (kick/snare/808 hit), never before it. Cutting 1–2 frames early reads as a mistake; on the transient reads as impact. In rage videos, hard cuts fire every 2–4 beats during hooks.
**ffmpeg:** Just concat. `ffmpeg -i a.mp4 -i b.mp4 -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0" out.mp4`
**Use it when:** Every section change, every beat drop, every bar. This should be 70% of all your transitions. Everything below is seasoning.

## 2. WHIP PAN
**Look:** The camera violently pans sideways; the image dissolves into horizontal motion streaks, then the new shot resolves out of the streaks. Feels like someone yanked the camera.
**Frame anatomy (12 frames total):**
- Frames 1–3: shot A, horizontal blur ramps 0 → 40px, image starts sliding in pan direction.
- Frames 4–8: pure streaks — no recognizable image, just horizontal smears of shot A's colors. The cut hides in here (frame 6).
- Frames 9–12: shot B, blur ramps 40px → 0, image settles.
**Parameters:** Direction: left-to-right OR right-to-left (pick one per video, stay consistent). Blur peak: 30–50px. Total: 10–14 frames. HARD-OUT on the settle (frames 9–12 decelerate fast, then STOP dead — no drift).
**ffmpeg (practical approximation):**
```
[a]boxblur=lr=1:lp=0:cr=0:cp=0:ar=0[b1];  # placeholder — real recipe:
```
Honest recipe — build it as three pieces and concat: (a) last 3 frames of A with `boxblur` ramping via `gblur=sigma='min(40,(t-T0)*400)'`, (b) 4 frames of pure streaks = shot A frame with `gblur=sigma=50` + `hue` shift, (c) first 4 frames of B with blur ramping down. The cut lives inside (b).
**Use it when:** Verse → hook, location changes, energy jumps. Never twice in a row.

## 3. ZOOM PUNCH
**Look:** On the beat, the image violently punches IN (or OUT) by 10–20% in 2 frames, holds, then either stays or eases back. Like the camera got punched.
**Frame anatomy (8 frames):**
- Frames 1–2: scale jumps 1.00 → 1.18 (STEP — no gradual zoom, it TELEPORTS).
- Frames 3–8: hold at 1.18, or drift back to 1.05.
**Parameters:** Punch magnitude: 1.12–1.25. Punch IN on drops and snare hits; punch OUT on releases and beat switch-ups. The 2-frame jump is non-negotiable — a gradual zoom is a different (weaker) effect.
**ffmpeg:** `zoompan=z='1+0.18*gte(mod(t,2),1.99)':...` — better: split the clip, apply `scale=iw*1.18:ih*1.18,crop=iw:ih` to the 2-frame punch segment, concat.
**Use it when:** 808 drops, ad-lib hits, the first beat of every 4 bars in the hook.

## 4. RGB SPLIT BURST ✅ frame-verified (osamason)
**Look:** The red channel slides right, the blue channel slides left, image stays. 3D-glasses-without-glasses. Lasts a blink.
**Frame anatomy (6 frames):**
- Frames 1–2: split ramps 0 → 12px.
- Frames 3–4: hold at 12px.
- Frames 5–6: snaps back to 0 (STEP back, no ease).
**Parameters:** Split: 8–15px horizontal (never vertical — vertical split reads as a mistake). Red +X, blue −X. Green stays locked. Duration: 4–8 frames. In osamason's video this runs nearly CONSTANT at low intensity (2–4px) with bursts to 12px on hits.
**ffmpeg:** `rgbashift=rh=12:rv=0:bh=-12:bv=0:gh=0:gv=0:enable='between(t,12.0,12.2)'` — for the constant low hum: `rgbashift=rh=3:bh=-3` on the whole timeline.
**Use it when:** Snare hits, glitch moments, under giant type slams. The constant 3px hum + burst pattern is the osamason signature — steal exactly that.

## 5. VHS TRACKING GLITCH
**Look:** 2–4 horizontal bands of the image tear sideways at different offsets, heavy static noise, maybe a rolling bar. Then it snaps perfectly clean — the snap is what sells it.
**Frame anatomy (16 frames):**
- Frames 1–4: bands appear — band 1 shifts +25px, band 2 shifts −30px, band 3 shifts +15px. Noise ramps up.
- Frames 5–12: hold the tear, noise at max, slight vertical roll (image drifts up 5–10px).
- Frames 13–16: STEP back to clean. Zero transition frames. The violence of the snap matters more than the glitch.
**Parameters:** Bands: 2–4, each 15–25% of frame height, at random Y positions. Offsets: ±15–40px. Noise: `noise=alls=25:allf=t` during the glitch. Total: 12–20 frames.
**ffmpeg (3-band recipe):**
```
[0:v]split=4[o][b1][b2][b3];
[b1]crop=iw:ih*0.25:0:ih*0.10,setpts=PTS+0.05/TB[x1];  # timeshift = tear
...
```
Practical version: pre-render the glitch segment — take the frames, apply `crop` with per-band x-offsets via `geq`, add noise, concat back in. Full recipe is long; the key numbers are the band offsets and the STEP snap-back.
**Use it when:** Beat switches, producer-tag moments, once per verse max. Overuse kills it.

## 6. FLASH FRAME
**Look:** 2–3 frames of pure white (or pure black) between shots. A visual exclamation mark.
**Frame anatomy:** 2 frames white at 100% opacity. That's it. No fade in, no fade out.
**Parameters:** White = impact, energy, shock. Black = dread, weight, emptiness. 2 frames is standard; 3 frames starts to feel like a blink; 1 frame is subliminal (also valid). Never fade — fades are for weddings.
**ffmpeg:** `color=c=white:s=1920x1080:d=0.067` (2 frames at 30fps), concat between shots.
**Use it when:** The single biggest hit in the song. Gunshot ad-libs. One per hook.

## 7. SPIN
**Look:** The image spins 90–180° with motion blur while shrinking slightly; the new shot spins in from the opposite direction. Disorienting, playful.
**Frame anatomy (16 frames):**
- Frames 1–8: shot A rotates 0 → 120°, scale 1.0 → 0.85, rotational blur on.
- Frame 8: the cut (hidden at max blur).
- Frames 9–16: shot B rotates −120° → 0, scale 0.85 → 1.0.
**Parameters:** Rotation: 90–180° total. Direction: alternate per use (clockwise then counter). Scale dip: 0.8–0.9 (prevents edge reveal). HARD-OUT landing.
**ffmpeg:** `rotate=a='2.1*min(t/0.27\,1)':fillcolor=black` on the outgoing (0.27s = 8 frames), mirrored on incoming.
**Use it when:** Playful/jerk tracks, dance breaks. Never on a dark/emotional song — the vibe mismatch is fatal.

## 8. SHAKE BURST ✅ frame-verified (osamason pattern)
**Look:** The whole frame shudders — random horizontal/vertical jitter for a few frames, like the camera got kicked.
**Frame anatomy (10 frames):** Every frame gets a random offset: x ±12px, y ±8px, new random values each frame. Often paired with a 1.03–1.05 zoom so edges never show.
**Parameters:** Amplitude: 8–15px (small) to 20–30px (violent). Duration: 6–15 frames. Always zoom ≥1.03 underneath to hide the frame edges. Random per frame — never a smooth sine wave (smooth shake reads as cheap).
**ffmpeg:** `scale=iw*1.06:ih*1.06,crop=iw:ih:x='(in_w-out_w)/2+(random(1)-0.5)*24*between(t,5.0,5.33)':y='(in_h-out_h)/2+(random(1)-0.5)*16*between(t,5.0,5.33)'` — this is the exact recipe used in your cuff-no-dancer final.
**Use it when:** 808 slides, bass drops, any "impact" moment. The underground's salt — goes on everything.

## 9. STROBE CUT
**Look:** Two shots alternate every 3–4 frames for about half a second: A-B-A-B-A. Aggressive flicker.
**Frame anatomy:** 3 frames A, 3 frames B, 3 frames A, 3 frames B, then land on B. Total ~15 frames.
**Parameters:** 3 frames per side is the sweet spot. 2 frames = seizure territory (use deliberately). 4+ frames = just fast cutting. Pair the two shots for contrast (close-up vs wide, dark vs light).
**ffmpeg:** Pre-cut both shots into 3-frame segments, concat alternating.
**Use it when:** Rapid hi-hat rolls, double-time flows, the last 4 bars before a drop. Photosensitivity warning if you post it — actually mean that.

## 10. MASK WIPE
**Look:** A rough-edged shape (brush stroke, torn paper, diagonal slash) wipes across the frame, revealing the new shot underneath. The edge texture is everything.
**Frame anatomy (12 frames):** Frame 1: 0% revealed. Frames 2–11: the wipe edge travels across (rough, textured edge — never a clean straight line unless you're doing corporate work). Frame 12: 100% new shot.
**Parameters:** Travel: full frame width in 10–14 frames. Edge: rough/textured (generate a grunge brush PNG as the wipe matte). Direction: any, but diagonal wipes feel most "underground."
**ffmpeg:** `maskedmerge` with an animated mask: generate a white-on-black wipe PNG sequence (or one wide PNG and `crop` it across), then `[a][b][mask]maskedmerge`.
**Use it when:** Location changes, "scene" transitions. The matte texture should match your video's grime level.

## 11. DATAMOSH SMEAR
**Look:** Pixels from shot A bleed and smear into shot B — blocky, melty compression artifacts. The digital equivalent of paint mixing.
**Frame anatomy (15 frames):** Shot A's macroblocks stretch and drag in the direction of motion, shot B pushes through from underneath. Peak smear around frame 8.
**Parameters:** This is REAL datamoshing (P-frame manipulation) — the honest recipe needs `ffglitch` or manual motion-vector editing. Poor-man's version: `tblend=all_mode=average` across 10 frames + `noise` + a brutal low-bitrate pass (`-b:v 200k`) on just the transition zone, then concat.
**Use it when:** Trippy/yeat-type tracks, transitions into CGI sections. One per video — it's a strong flavor.

## 12. ZOOM BLUR
**Look:** Radial blur explodes from the center while the image scales up — like reality is rushing toward you.
**Frame anatomy (10 frames):**
- Frames 1–7: scale 1.0 → 1.35, radial blur 0 → 30px, centered on the subject's face (or screen center).
- Frames 8–10: cut hidden at max blur; new shot at scale 1.35 blur 30px → scale 1.0 blur 0.
**Parameters:** Blur center MUST be on the subject, not screen center (rookie mistake). Peak blur: 25–40px. Total: 8–12 frames.
**ffmpeg:** True radial blur isn't native — approximate: `zoompan` for the scale + `gblur` for overall blur (loses the radial quality, acceptable at speed) OR pre-render the radial blur in Python (PIL has no radial blur; use OpenCV's `cv2` — not installed by default; note for Claude: `pip install opencv-python-headless`).
**Use it when:** Beat drops, "level up" moments, hook entrances.

## 13. SPEED RAMP
**Look:** Motion suddenly drops to slow-mo (or snaps from slow-mo to full speed). Time itself stutters.
**Frame anatomy:** Shot plays at 0.25x for ~20–30 frames, then ramps to 1.0x over 6 frames (STEP-ish, fast ramp). Or the reverse: full speed slams into a 12-frame freeze.
**Parameters:** Slow factor: 0.2–0.3x. Ramp: 4–8 frames. The ramp must be FAST — a slow ramp is a nature documentary.
**ffmpeg:** Two segments concat: `setpts=4*PTS` (0.25x) for the slow part — needs `minterpolate` for smoothness: `minterpolate=fps=120` before slowing down, or it judders. Then normal speed segment.
**Use it when:** A movement peak (jump, spin, punch), the bar before the drop.

## 14. TEXT SLAM ✅ frame-verified (osamason)
**Look:** A GIANT word slams into frame (scale 3.0 → 1.0 in 4 frames, dead stop, maybe 2-frame micro-bounce) — and the CUT to the next shot happens UNDERNEATH the word. The word is the transition.
**Frame anatomy:**
- Frames 1–4: word scales 3.0 → 1.0 (STEP-ish, HARD-OUT landing).
- Frame 3: the background cut fires (hidden behind the word's impact).
- Frames 5–12: word holds, then hard-cuts out (no fade).
**Parameters:** Word scale: start 2.5–3.5x, land at 1.0. Landing: dead stop (maybe 1.0 → 1.05 → 1.0 micro-bounce over 2 frames). Word duration: 8–15 frames total. Font: condensed heavy (Anton) or blackletter (Pirata One).
**ffmpeg:** Render the word as an ASS overlay with animated scale — ASS can't animate scale per-frame easily; practical: pre-render the word PNG at large size, `scale` it down over 4 frames with `zoompan`, overlay on the timeline, and hard-cut the background underneath at frame 3.
**Use it when:** Every hook word. This is the single highest-ROI transition in the underground — it does the job of a cut AND a caption at once.

## 15. CAMERA DROP
**Look:** The frame drops vertically with blur, like the camera fell — new shot rises up from below to catch it.
**Frame anatomy (12 frames):**
- Frames 1–6: shot A slides down 0 → 400px with vertical blur ramping 0 → 30px.
- Frame 6: cut (hidden in the blur).
- Frames 7–12: shot B slides from +400px → 0, blur 30px → 0, HARD-OUT landing.
**Parameters:** Drop distance: 30–50% of frame height. Blur: vertical only. The landing must STOP dead — any drift ruins it.
**ffmpeg:** `crop` with animated y-offset + `boxblur` vertical, or `scroll` filter: `scroll=vertical=... ` — practical: two crops animated in opposite directions, concat.
**Use it when:** Vertical-format videos (it's MADE for 9:16), beat drops, "falling" lyrics.

## 16. SPLIT SCREEN
**Look:** Both shots share the frame briefly — side by side (or stacked) with a hard divider line — then the divider slides and the new shot takes over.
**Frame anatomy (10 frames):** Frames 1–3: divider at 50/50. Frames 4–8: divider slides to 0 (or 100%), wiping to the new shot. Frames 9–10: full new shot.
**Parameters:** Divider: 2–4px, white or black. Slide: 5–8 frames, linear (not eased — eased reads corporate). Split orientation: vertical split for 16:9, horizontal for 9:16.
**ffmpeg:** `[a][b]hstack` then `crop` animated, or `xstack` with layout animation.
**Use it when:** Showing two locations/times, call-and-response bars, before/after.

## 17. LIGHT LEAK BURN
**Look:** Orange-red light blooms in from a corner/edge, floods the frame to near-white, new shot emerges from the bloom as it recedes.
**Frame anatomy (18 frames):**
- Frames 1–6: bloom grows from corner, 0 → 60% frame coverage.
- Frames 7–12: full bloom (frame is 90%+ washed out) — the cut hides here at frame 10.
- Frames 13–18: bloom recedes, new shot resolves.
**Parameters:** Color: orange-red (#FF4400-ish), never pure white (pure white = flash frame, different effect). Bloom shape: organic/uneven, not a clean radial gradient. Total: 15–22 frames.
**ffmpeg:** Pre-render a light-leak PNG (orange blob, transparent edges), overlay with animated opacity: `format=rgba,colorchannelmixer=aa='...'` — or simpler: `fade` a solid orange layer in/out with `screen` blend: `[a][leak]blend=all_mode=screen:all_opacity='...'`.
**Use it when:** Euphoric/che-type tracks, sunrise/daylight scenes, emotional lifts. Never on dark opium tracks.

## 18. BLOCK GLITCH (macroblock tear)
**Look:** The image shatters into shifting rectangular blocks for a few frames — like a corrupted stream — then reassembles into the new shot.
**Frame anatomy (10 frames):**
- Frames 1–3: 8–15 random blocks (64–128px) displace ±50px.
- Frames 4–7: block count peaks, some blocks show wrong colors (channel-shifted).
- Frames 8–10: blocks snap back (STEP), revealing shot B.
**Parameters:** Block size: 64–128px (macroblock scale — smaller reads as noise, larger reads as cubism). Displacement: ±30–80px. Some blocks get `rgbashift` for color corruption.
**ffmpeg:** True macroblock manipulation needs codec surgery. Practical: Python pre-render with PIL — slice the frame into a grid, randomly offset slices, save as PNG sequence, then `ffmpeg -framerate 30 -i seq%03d.png`. ~20 lines of Python, full control. (Tell Claude: this one is a script, not a filter.)
**Use it when:** Digital/cyber tracks, 2hollis-type Y2K moments, once per video.

## 19. MATCH CUT (the invisible one)
**Look:** No visible effect at all — the cut is hidden by matching motion, shape, or color across the boundary. Shot A ends with a head turning left; shot B begins with a head turning left. The viewer feels continuity, not a cut.
**Parameters:** This is PLANNED, not applied. End shot A and start shot B with: same motion direction + speed, same subject position in frame, or same dominant color/shape. Cut exactly on the motion's peak velocity.
**ffmpeg:** It's just a hard cut (transition #1) — the work is in the shoot/edit plan.
**Use it when:** You want sophistication. One perfect match cut impresses more than ten glitch effects. Verses, storytelling sections.

## 20. ECHO TRAIL
**Look:** Shot A's motion leaves ghost trails (frame blending) that smear across the cut into shot B — like long-exposure photography.
**Frame anatomy (12 frames):** Frames 1–12: shot A with increasing frame-blend trails (each frame = average of last 4–6 frames), opacity of trails ramps up; the cut happens at frame 8 inside the smear; shot B emerges as trails decay.
**Parameters:** Trail depth: 4–8 frames averaged. `tblend=all_mode=average` chained, or `tmix=frames=6`. Works best when shot A has strong motion.
**ffmpeg:** `[a]tmix=frames=6:weights='1 1 1 1 1 1'[trailed]` for the outgoing tail, crossfade 6 frames into B.
**Use it when:** Dance/movement sections, dreamy/yeat-type passages, song outros.

---

## CLAUDE'S DEPLOYMENT RULES (how to use this bible)

1. **Map transitions to the song's structure FIRST.** Get the beat grid (or tap it out): intro / verse / pre / hook / bridge / outro. Assign: hard cuts everywhere, ONE signature transition per section boundary (e.g., whip pan into every hook, text slam on every hook word, VHS glitch on the bridge).
2. **The 70-20-10 rule.** 70% hard cuts, 20% one workhorse transition (pick ONE: zoom punch or shake burst), 10% spectacle (one whip pan, one VHS glitch, one text slam per video). More than that = ADHD edit.
3. **Never the same transition twice in a row.** Alternate. The brain notices repeats instantly.
4. **Transitions land ON transients.** Every recipe above assumes the impact frame = a kick, snare, or 808. Get the audio waveform, find the transients, place the impact frames there. A transition 3 frames off the beat looks broken.
5. **Vertical versions hit different.** Whip pan → camera drop. Split screen → horizontal stack. Zoom punch stays king in both.
6. **Render transitions as separate clips, then assemble.** Don't build one mega-filtergraph. Claude: render each transition as its own 10–20 frame clip, then concat everything. Debuggable, reusable.
7. **Keep a transition preset folder.** Save each recipe as a shell function/script with parameters (duration, direction, magnitude). Next video = call the functions, don't rebuild.

## What's verified vs. what's next
- ✅ Frame-verified: hard cut cadence, RGB split (constant 3px + bursts), shake burst params, text slam mechanics — from 145 osamason frames.
- ⏳ Pending (YouTube bot-wall): frame-verifying the other 15 videos' transitions in the morning. The specs above are the genre's documented vocabulary; timings may shift ±2 frames after verification.
