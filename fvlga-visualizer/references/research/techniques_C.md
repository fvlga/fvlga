# Technique research C (artists 21-30)

Method note: web search only. Direct page fetches (WebFetch) failed in this environment (DNS errors for every host), so all VERIFIED claims come from search-result snippets, not full-article reads. No media was downloaded. YouTube was not reachable. Public sources for rap videos almost never describe edit/VFX/camera details, so most of (b)-(g) is INFERRED from genre convention and labelled as such. Treat INFERRED as hypotheses to check against the actual video, not facts. Nothing here is a timestamped breakdown.

Confidence tags: VERIFIED = a source states it (URL given). INFERRED = general genre knowledge, unconfirmed. NO SOLID SOURCE = nothing found.

---

## 21. Homixide Gang

(a) Videos: "RedRum" (2026): director Cam Erickson, VERIFIED (musicpressbox, below). "TF!" (2022): production company Spacedog Co. credited, no individual named, VERIFIED. "5G" (2025): described as inspired by Fight Club (1999); no director named, VERIFIED. Editor/DP: no solid source found.
(b) Edit and pacing: no solid source found. INFERRED: fast cuts locked to the beat, performance-heavy.
(c) Transitions: no solid source found. INFERRED: hard cuts, flash/whip cuts.
(d) VFX: no solid source found. For "RedRum" the write-up describes a bold, colour-driven world that shifts with the track's energy, VERIFIED (paraphrase) - suggests colour changes per section. For "5G", a Fight Club visual reference (INFERRED: gritty, desaturated, subliminal flash frames, as in the film).
(e) Text: no solid source found.
(f) Grade: "RedRum" strongly saturated, shifting colour palette (VERIFIED, paraphrase of press text). "5G": INFERRED green-tinted, grungy Fincher-style grade.
(g) Footage/camera: no solid source found.
(h) Copyable takeaways:
1. Section-based colour shifts: change a global hue/gradient per verse or hook (ffmpeg `hue`/`colorchannelmixer` keyed by time, or a WebGL uniform).
2. Film-reference look (Fight Club): crushed greens/teal, grain, occasional single-frame flash cuts.
3. Production-company/brand consistency: a fixed colour world per release.
(i) Sources: https://musicpressbox.antimusic.com/26/p0620watch_hxgs_redrum_video.shtml (VERIFIED, Cam Erickson, colour-driven); https://ourgenerationmusic.com/news/homixide-gang-tf-video/ (VERIFIED, Spacedog Co.); https://musicpressbox.antimusic.com/25/0712homixide_gang_sample_smashing_pumpkins_classic_for_5g.shtml (VERIFIED, Fight Club inspiration).

**FRAME-SEEN (Homixide RedRum; 4 stills):**
- Scale/lens: maxres is a medium shot, slightly high angle, shallow depth, long-lens feel, with a crowd of hooded figures in soft dark foreground and background. The other three are centred medium close-ups, eye-level, one performer each, wide-ish framing with arms spread or hand-gesturing.
- Palette: near-black with saturated red (red leather jackets, red couch); almost nothing else. Skin is the only warm midtone.
- Overlay/VFX: a black censor bar over one face in maxres (a deliberate graphic); Vevo watermark. No visible grain or glitch.
- Set/props: a void-black studio with a red leather chair; chains and watches. People: 2 plus a hooded crowd in maxres, then 1 person per frame.
- Change across frames: lighting and palette stay identical (single red-on-black world); only subject and pose change. Confirms the earlier "colour-driven world", but in these stills it is one colour (red), not several. CONFIRMS single-colour world.

## 22. Trippie Redd - "Miss The Rage" (ft. Playboi Carti), 2021

(a) Director Nick Walker, VERIFIED (Rolling Stone, Revolt, Complex). Editor/DP: no solid source found. Separate animated lyric video by Zach Okami and Chadwick Makela (VERIFIED per search summary of Complex coverage).
(b) Edit/pacing: no solid source. INFERRED: fast, destruction-driven cuts on the beat.
(c) Transitions: INFERRED hard cuts, impact-synced.
(d) VFX: practical effects are reported: car set on fire, windows and headlights smashed with a bat, flamethrower, Molotovs (VERIFIED, Rolling Stone). Any digital VFX: no solid source.
(e) Text: no solid source found for the main video.
(f) Grade: no solid source found. INFERRED: high-contrast, warm fire against dark.
(g) Footage/camera: setting is a junkyard / vacant lot (VERIFIED). Camera and lens: no solid source.
(h) Copyable takeaways:
1. Rage = destruction on the beat: sync impact flashes/shakes to kick hits (WebGL shake + white flash uniform driven by audio onsets).
2. Fire/orange glow overlay (screen-blend stock fire or procedural noise) against a dark base.
3. Single location, many actions: loop one environment with varied crops/zooms.
(i) Sources: https://www.rollingstone.com/music/music-news/trippie-redd-playboi-carti-miss-the-rage-video-1175344/ (VERIFIED); https://www.revolt.tv/new-music/2021/5/27/22456995/trippie-redd-playboi-carti-miss-the-rage-video (VERIFIED); https://en.wikipedia.org/wiki/Miss_the_Rage (context).

**FRAME-SEEN (Trippie Redd Miss The Rage; 4 stills):**
- Scale/lens: maxres is a medium shot with a masked figure sharp in the mid-ground and Trippie cropped at the right edge in the foreground, shallow depth. Others are tight chest-up close-ups and one wide, dark junkyard shot.
- Palette: teal/green-black shadows against orange-amber fire, with Trippie's saturated red dreads as the colour accent. Classic teal-and-orange night grade.
- VFX/damage: a real burning car with smoke in the background; heavy bokeh and soft focus; the later frames look soft/compressed. No visible text. A small corner watermark in maxres.
- Set/props: night lot, white car on fire, cluttered junk (barrels, appliances, tyres) in hq3. People: 2 in maxres, 1 per other frame.
- Change: warm orange in the fire frames, cooler green in the close-ups and junkyard, so the grade drifts teal vs orange by shot. Letterbox bars are baked into the video (scope-like). CONFIRMS fire / destruction.

## 23. Lazer Dim 700

(a) NO SOLID SOURCE FOUND. Search returned only album listings and a Boiler Room page describing a Georgia rapper with off-beat flows and gritty underground trap beats. Director/editor not found.
(b)-(g) No solid source. Plainly visible only from general knowledge (INFERRED): low-budget, performance/car/street footage in the lo-fi Atlanta-underground manner.
(h) Copyable takeaways (all INFERRED, not tied to a verified video):
1. Lo-fi on purpose: slightly crushed blacks, grain, low bitrate feel.
2. Minimal text, mostly raw footage.
3. Off-beat flow means cut slightly off-grid to mirror the vocal rather than the kick.
(i) Sources: https://deezer.com/album/675486991 (album only); https://set79.com/tracklist/soundcloud.com/platform/lazer-dim-700-dc-saturday (bio only). Consider replacing this artist with a better-documented one.

**FRAME-SEEN (Lazer Dim 700 "dealt wit"; 4 stills):**
- Scale/lens: ultra-wide, slightly fisheye, centred full-body shot in a house; ceiling fan and door frames bow at the edges. Others: low-angle close-up with a gun held up, a wide again, and a close-up pointing at the lens with a lion painting behind.
- Palette: yellowed warm interior light, sickly olive ceiling, teal-blue walls; low-saturation, slightly dirty whites. Later frames are darker and more contrasty.
- VFX: visible vignette and soft glow around a ceiling light; slight grain/compression; no text overlays. Maxres is pillarboxed with black side bars (a narrower aspect than 16:9).
- Set/props: ordinary lived-in house (fan, living room, painting, couch), two bottles held up, a firearm in hq1. People: 1 in every frame.
- Change: framing varies from distant wide to a very close low angle in the same room; light stays warm and murky. CONFIRMS lo-fi, wide-lens, single-location (earlier inferred, now seen).

## 24. Autumn!

(a) NO SOLID SOURCE FOUND for a video director. Wikipedia confirms identity (Benjamin Clarence Phillips Jr., formerly TrapGodBenji, associated with popularising pluggnb) but no video credits.
(b)-(g) No solid source. INFERRED: pluggnb visuals tend to be soft, dreamy, pastel, with slowed pacing.
(h) Copyable takeaways (INFERRED): 1. Slower cut rate and soft glow (ffmpeg `gblur` blended with screen) to match pluggnb. 2. Pastel/cool grade. 3. Slow push-ins on a still or loop.
(i) Source: https://en.wikipedia.org/wiki/Autumn_(rapper) (identity only; VERIFIED). Consider replacement.

**FRAME-SEEN (Autumn! "Grok!"; 4 stills):**
- Scale/lens: maxres is a medium side-profile shot of a man in front of a plain wall; hq1 is a medium shot of a different smiling man with fanned cash; hq2/hq3 repeat the wall setup, slightly wider. Normal lens, little distortion.
- Palette: bright, clean, near-white wall with multicolour cross-shaped stickers (red, blue, green, orange, black) and green plants; a black jacket as contrast. hq1 is a bright pastel/teal-blue and yellow mural. Sun-washed daylight look.
- VFX: a clear motion-blur ghost trail on the moving performer (maxres: smeared shape behind him) - looks like frame blending or a low shutter; no text; maxres is pillarboxed.
- Set/props: indoor staircase with hanging fern and a black figurine; cash, jewellery. People: 1 per frame, 2 different people across the set.
- Change: the colour wall repeats across three stills, with one cut to a different person and mural. So: static camera, cut between two set-ups. Does NOT show the soft dreamy pluggnb pastel look I guessed in the text; it is crisp and graphic instead. CONTRADICTS the earlier soft-glow guess; CONFIRMS bright pastel and daylight.

## 25. SoFaygo - "Knock Knock" (2019 single; video later)

(a) Director Cole Bennett (Lyrical Lemonade) credited by one weak source, a fan-style blog; treat as LOW-confidence VERIFIED-by-single-secondary-source and confirm in the YouTube credits. Editor/DP: no solid source. Producer of song: Lil Tecca (Wikipedia).
(b)-(c) No solid source. If Cole Bennett (INFERRED from his house style): bright, hyper-saturated, fast cuts, whip pans, colour-blocked sets.
(d) VFX: video reportedly has a playhouse set with haunting creatures and SoFaygo in a pinstripe suit (paraphrase of the blog; low confidence).
(e) Text: no solid source. Lyrical Lemonade branding typically includes an on-screen title card (INFERRED).
(f) Grade: INFERRED saturated, high-key, with black-and-white outfit as contrast.
(g) Camera: no solid source.
(h) Copyable takeaways: 1. Strong two-colour costume vs saturated set contrast (use colour keys). 2. Character/creature cutaways every few seconds. 3. Title card at start with the song name in bold type.
(i) Sources: https://ihhstg.wpengine.com/the-long-anticipated-video-for-sofaygos-knock-knock-has-arrived/ (single weak source); https://en.wikipedia.org/wiki/Knock_Knock_(SoFaygo_song).

**FRAME-SEEN (SoFaygo Knock Knock, Lyrical Lemonade; 4 stills):**
- Scale/lens: maxres is a tight close-up, face looking up, very shallow depth, camera slightly below eye level. hq1 is a wide, slightly fisheyed shot from a corner of a room. hq2 is an extreme close-up with radial/zoom blur (speed streaks). hq3 is a low, wide shot with blurry hands in the foreground, a push-in on the performer.
- Palette: saturated neon purple/blue and cyan-green rim lights, with orange skin tones; black-and-white stripe suit against a checkerboard floor; green and red accent lights.
- VFX/text: a Lyrical Lemonade carton logo overlay (large in maxres, small bottom-right in the others, persistent bug); zoom/radial blur; foreground defocus; no other text. Black bars on top/bottom in the small frames.
- Set/props: a haunted-house-like room with a checkered floor, people sitting in the background as extras, a window with a light. People: 1 in the foreground, 3-4 in the background in hq1.
- Change: from a calm close-up to a fast zoom-blur frame, so the camera grammar moves between static and aggressive. CONFIRMS Lyrical Lemonade branding, saturated colour, and an extra detail I had not claimed (Beetlejuice-style striped suit). I do not see the "pinstripe suit playhouse" as a creature set; extras are seated people.

## 26. Rich Amiri

(a) Videos with credits, VERIFIED via audibletreats press posts (search summaries): "Can't Die" (2022) directed by Declan Kyle, with visual references to The Matrix and Dexter; "Dirty Money" (2022) directed by Tycho Burwell, jail-escape plot; "Feelings" ft. Desire (2022) directed by Sienna Burmess, Houston hotel; "FORZA FREESTYLE" (Dec 2023) directed by Keaton Jones, Tesla and hillside L.A. mansion. "One Call" (2023) set in the California desert, director not found.
(b)-(c) No solid source on cut rate. INFERRED: narrative/cinematic cutting for "Can't Die" and "Dirty Money".
(d) VFX: "Can't Die" uses film references (Matrix, Dexter) - INFERRED green-tinted/slow-motion homage, unverified.
(e) Text: no solid source.
(f) Grade: INFERRED cinematic, teal/green for Matrix reference.
(g) Camera: no solid source.
(h) Copyable takeaways: 1. Film-homage structure: pick one movie look and apply consistently (grade plus a few signature framings). 2. Narrative mini-plot (escape, drive up, arrive) gives a visualizer progression. 3. Luxury-location b-roll (car, mansion) intercut with performance.
(i) Sources: https://audibletreats.com/rich-amiri_pr14/ , https://audibletreats.com/rich-amiri_pr2/ , https://audibletreats.com/rich-amiri_pr4/ , https://audibletreats.com/rich-amiri_pr12/ (VERIFIED credits via search summaries; not re-read in full).

**FRAME-SEEN (Rich Amiri "Can't Die"; 4 stills):**
- Scale/lens: maxres is a tight close-up, very low key, face emerging from black, centred, flat-on eye level. hq1 is a handheld, wide-angle close-up in a tight wooden room, lens at the face. hq2 is a wide medium shot, symmetrical, in a small corridor. hq3 returns to the black-and-white close-up.
- Palette: monochrome black-and-white (maxres, hq3); the middle frames are dark, desaturated green-brown, with blood-red spatter on translucent plastic sheeting.
- VFX/text: strong film grain in the B&W frames; high-contrast single key light. A tiny "Alexander McQueen" brand name is legible on the jacket sleeve. No overlays.
- Set/props: a plastic-wrapped, blood-streaked room (a "kill room" look, which matches the Dexter reference in the credits); wooden shed interior. People: 1 per frame.
- Change: B&W void portraits cut with colour-less green rooms, so the grade alternates between pure monochrome and a dirty teal/green. CONFIRMS a Dexter-style plastic kill-room image; I do not see a Matrix-style green tint, only dark green walls.

## 27. Evilgiane

(a) NO SOLID SOURCE FOUND for a named director. "40" with Nettspend and Xaviersobased (2024) has a YouTube video per Wikipedia, director not named. Surf Gang is described as a label and creative agency; producers there also direct, but that does not confirm credits.
(b)-(g) No solid source. INFERRED: Surf Gang/internet-rap visuals are DIY, cam-footage, glitchy, with low-res texture and fast cuts.
(h) Copyable takeaways (INFERRED): 1. DIY digicam look: low-res, over-sharpened, date-stamp style overlay. 2. Chaotic collage cuts. 3. Minimal colour grading, raw flash.
(i) Source: https://en.wikipedia.org/wiki/40_(single) (existence of video only). Consider replacing.

**FRAME-SEEN (Evilgiane, Surf Gang clip ft. xaviersobased and nettspend, "40"; 4 stills):**
- Scale/lens: the clip is shot vertical-style, pillarboxed in the 16:9 player (side bars). Medium shots at head-to-waist, eye level, a normal phone lens; a subject holds a fan of cash toward the lens.
- Palette: natural daylight, blue sky, black and grey hoodies; very little grade. Slightly blown-out highlights.
- VFX/text: none visible; low-res, phone-camera compression; no overlay text.
- Set/props: car, graffiti truck, a waterfront with a distant city skyline, yellow school buses; cash, a glass bottle. People: 2 to 3 per frame.
- Change: the location changes (car, waterfront, bus lot) but the look stays constant; three kids in hoodies. CONFIRMS DIY/phone-native look and does NOT show glitch or collage effects, so my earlier "chaotic collage cuts" guess is not supported by these stills.

## 28. Lucki

(a) Frequent director: Lonewolf (Zac Matias, from Griffith, Indiana): "2019", "GOODFELLAS", "Meet Me There", "I Don't Care", and "Politics" (Freewave 3) - VERIFIED (Highsnobiety interview, Our Generation Music, audibletreats). Others: Walker Flocker ("Role Play", 2020), Lestyn Park ("LIFE MOCKS ART"), Walker Andrews ("Gemini Love", 2023), Plu2o Nash ("Love It", 2013) - VERIFIED via search summaries.
(b) Edit/pacing: Lonewolf's style uses sporadic jump cuts (VERIFIED, These Days Mag, paraphrased).
(c) Transitions: jump cuts; superimposed images (VERIFIED, same).
(d) VFX: distorted camera shots, grainy footage, superimposed magazine cutouts or hand-drawn art, abstract-looking animations, constantly moving subjects (VERIFIED, These Days Mag and Flood Magazine, paraphrased). An Anghami podcast ("Talking Video Editing, DIY Effects" with Zac Matias) exists but its contents were not readable.
(e) Text: no solid source.
(f) Grade: INFERRED desaturated, muted, grainy.
(g) Camera: DIY approach (VERIFIED, Flood); lens and format not found.
(h) Copyable takeaways:
1. Paper-cutout collage overlays with jittery stepped motion (cut-out PNGs, 6-8 fps stepped transforms).
2. Grain plus distortion: ffmpeg `noise`, plus WebGL wobble/chromatic offset.
3. Sporadic jump cuts instead of regular beat cuts, to match his laid-back vocal.
(i) Sources: https://highsnobiety.com/p/lonewolf-video-interview ; https://thesedaysmag.com/features/lonewolf ; https://floodmagazine.com/90722/in-conversation-lonewolf/ ; https://hypebeast.com/2020/3/lucki-role-play-music-video ; https://ourgenerationmusic.com/news/lucki-meet-me-there/ (all via search summaries).

**FRAME-SEEN (Lucki "MORE THAN EVER"; 4 stills):**
- Scale/lens: maxres is a close-up of a person in the back seat of a car, very dark, harsh fill, a flared white cup at lower right. hq1 is a low-angle, wide-angle, night street with a lamp and a brick building. hq2 is the B&W car shot again, slightly wider. hq3 is a tight close-up of a smoker with a smoke plume.
- Palette: heavy desaturated black-and-white with crushed blacks in the car frames; the others are deep red/maroon night, with a green beanie logo and a green sign as the only green; warm skin tones in hq3.
- VFX: very coarse film-style grain/noise (maxres is clearly noisy), strong vignette, blown highlights on the cup and chain; letterbox bars baked in. No text or collage cutouts visible.
- Set/props: car interior, a night street, a plain room; a foam cup, chains. People: 1 per frame, with a shoulder or arm of someone else at the edge in the car frame.
- Change: B&W grain in the car shots against colour-tinted red night frames, so there is both a monochrome and a coloured grade. CONFIRMS heavy grain and DIY handheld look; the stills show NO superimposed magazine cutouts or distortion, so that earlier (Lonewolf-style, from text) claim does not apply to this particular video.

## 29. BKTHERULA

(a) "Uh Huh" (Jan 2023): directed and edited by Timeless; creative direction by Maliputyouon, Benjididit, Creezed (VERIFIED per Revolt, via search summary; a second search could not corroborate "Timeless"). "Crazy Girl" (May 2023): director Jordan Margolin, described as cinematic (VERIFIED, Antimusic). "Big Feeling" (2025): shot in Atlanta, directed by Mali (VERIFIED, Clash).
(b)-(c) No solid source on cut rate. INFERRED: "Uh Huh" is a quick performance/lifestyle cut; "Crazy Girl" is more cinematic.
(d) VFX: no solid source. "Big Feeling" is described as a viral moment (Clash); no edit details found.
(e) Text: no solid source.
(f) Grade: INFERRED pink/pastel Atlanta-girl palette; unverified.
(g) Camera: no solid source.
(h) Copyable takeaways (mostly INFERRED): 1. Pair a trending hook-section loop with 9:16 safe framing. 2. Pastel/pink grade with soft glow. 3. Credit structure: separate "creative director" from director - allows a theme brief per video.
(i) Sources: https://www.revolt.tv/article/2023-01-04/265300/bktherula-uh-huh-video/ ; https://antimusic.com/musicpressbox/amp/bktherula_delivers_crazy_girl_video-052323 ; https://www.clashmusic.com/?p=444219

**FRAME-SEEN (BKTHERULA "UH HUH"; 4 stills):**
- Scale/lens: maxres is a wide-angle close-up from a low angle, face in focus, head tilted, hair motion-blurred, in front of a pale dusk sky. hq1 is a handheld selfie-style close-up. hq2 is a medium group shot, wide lens, subject at centre. hq3 is a near-black title card.
- Palette: cool pale blue dusk sky with warm orange/peach skin and orange clothing accents; hq1 is teal and cyan LED (or club) lighting; hq3 black with red and orange.
- VFX/text: motion blur on hair, bokeh, lens-streak lights. hq3 shows a small white logo mark and a placeholder date ("XX:XX:23") on black, with a spark/firework streak - so the video opens or closes on a logo card. Letterbox bars baked in.
- Set/props: a street/parking lot at golden hour, a car, a construction building; a car or room with LED strip lights. People: 1 in the foreground, 4-5 friends behind.
- Change: daytime dusk pastel versus indoor neon teal, plus a dark logo card, so the grade varies by scene. CONFIRMS a stylised (not DIY-lo-fi) look, and the "creative-direction" credit makes sense; my guess of pink/pastel is partly wrong: the stills read blue/orange and teal.

## 30. Chief Keef (Almighty So 2 era)

(a) "Dirty Nachos" with Mike WiLL Made-It (Feb 2024): director Medet; shot almost entirely on iPhone (VERIFIED, Complex). "Runner" (May 2024, from Almighty So 2): Keef in a confession booth with manager Peeda Pan as priest, and riding in a Rolls Royce (VERIFIED, The Source); director not found.
(b) Edit/pacing: no solid source. INFERRED: relaxed cuts for "Runner", performance-first.
(c)-(d) No solid source.
(e) Text: no solid source.
(f) Grade: no solid source.
(g) Camera: iPhone-shot "Dirty Nachos" (VERIFIED, one source; not corroborated by director).
(h) Copyable takeaways: 1. Phone-native aesthetic: vertical 9:16 iPhone look is a legit style, so no need to fake cinema. 2. Single-concept set (confession booth) as a structuring device for a whole video. 3. Wide-angle, close-to-face handheld feel (apply gentle handheld shake and slight barrel distort in WebGL; INFERRED).
(i) Sources: https://985-content-prod.adc-blue.infra.complex.com/music/a/tracewilliamcowen/chief-keef-mike-will-made-it-dirty-nachos ; https://thesource.com/?p=718197 ; https://www.thefader.com/2024/02/08/chief-keef-and-mike-will-made-it-share-dirty-nachos


**FRAME-SEEN (Chief Keef "Dirty Nachos", BigGucci Sosa upload; 4 stills):**
- Scale/lens: maxres is a medium-full shot, straight on, eye level, with two men and a third partly visible, lit like a candid photograph (it may be a photo rather than a video frame). hq1 is an extreme macro of a heavily jewelled piece, blurred. hq2 is a close-up profile of a man in sunglasses driving a convertible. hq3 is a medium wide at an outdoor basketball court.
- Palette: warm and natural: a bright orange fur hood, olive/camouflage vest, denim, pink drinks, an orange-brown warm cast and a green/olive hallway. The outdoor shot is washed, pale-grey sky.
- VFX/text: no text or overlays; shallow depth of field, soft focus, lens flare and reflections on glasses; black letterbox bars on the 3 video frames.
- Set/props: a dim warehouse corridor with a white wall, a convertible car, a basketball court with hoops; jewellery, cups. People: 3 in maxres, 1 per other frame, plus crowd at the court.
- Change: portrait, macro jewellery, car, then court, so each frame is a new location and subject, in a consistent warm natural look. Appears cinematic; I cannot see the claimed "iPhone" origin from stills, and the look reads closer to a graded, stabilised cinema-style edit than a rough phone clip. The iPhone claim therefore stays VERIFIED-by-one-source but is NOT visually confirmed.

---

## Technique frequency table (10 videos; counts include INFERRED, so treat as hypotheses; "verified" column counts only source-backed cases)

| Technique | Appears in (of 10) | Which | Source-backed |
|---|---|---|---|
| Grain / lo-fi / DIY texture | 6 | 23, 24(soft variant), 27, 28, 30, 21 (5G) | 28, 30 |
| Hard / jump cuts, beat-synced | 8 | 21, 22, 23, 25, 26, 27, 28, 29 | 28 (jump cuts) |
| Strong colour-world per section or release | 5 | 21, 24, 25, 26, 29 | 21 |
| Film/movie-reference look | 3 | 21 (Fight Club), 26 (Matrix, Dexter), 29 (cinematic Crazy Girl) | 21, 26, 29 |
| Practical effects (fire, destruction) | 1 | 22 | 22 |
| Collage / superimposed cutouts | 2 | 27 (inferred), 28 | 28 |
| Single-concept location / set | 4 | 22, 25, 26, 30 | 22, 25, 30 |
| Phone-native / handheld look | 3 | 27, 29, 30 | 30 |
| Title / on-screen text | 1 | 25 (inferred) | none |
| Narrative mini-plot | 2 | 26, 29 | 26 |

Top 5 by count: (1) hard/jump cuts synced to beat; (2) grain/lo-fi texture; (3) strong colour-world; (4) single-concept location; (5) film-reference look / phone-native look (tie at 3). Videos 23, 24, 27 have no usable source; consider swapping them.

### Frame-confirmed counts (FRAME-SEEN, from the 40 stills; stills cannot show cuts or transitions)

| Visual pattern seen in stills | Count of 10 | Which |
|---|---|---|
| Dominant single colour or two-colour palette, strongly graded | 8 | 21 (red on black), 22 (teal/orange), 25 (neon purple/cyan), 26 (B&W + green), 28 (B&W + red), 29 (blue/orange/teal), 24 (pastel multicolour wall), 30 (warm orange/olive) |
| Wide-angle lens close to the face (edge distortion) | 5 | 23 (Lazer Dim), 25 (SoFaygo), 27 (Rich Amiri hq1), 29 (BKTHERULA), 28 (Lucki hq1) |
| Black-and-white / monochrome frames | 2 | 26, 28 |
| Visible film grain / noise / compression softness | 4 | 22, 23, 26, 28 |
| Motion blur / zoom blur (seen in a still) | 3 | 24 (ghost trail), 25 (radial zoom), 29 (hair blur) |
| Logo/brand overlay or title card | 2 | 25 (Lyrical Lemonade bug), 29 (logo + date card) |
| Real fire / practical set dressing | 2 | 22 (burning car), 26 (blood-spattered plastic room) |
| Baked-in letterbox or pillarbox bars | 10 | all |
| Single central subject, centred framing | 9 | all except 30 Chief Keef (multi-person medium shots) |
| Phone/DIY look | 1 | 27 Evilgiane (earlier "Chief Keef = iPhone" claim is not visible in stills) |

Corrections to the first table from the stills: Lucki collage/magazine cutouts: not seen (0 of 4 stills). BKTHERULA pastel pink: not seen (blue/orange/teal instead). Evilgiane glitch/collage: not seen (plain daylight phone footage). Autumn! soft dreamy glow: not seen (crisp, bright). Chief Keef iPhone origin: not visible.
