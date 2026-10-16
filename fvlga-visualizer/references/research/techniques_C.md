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

## 23. Lazer Dim 700

(a) NO SOLID SOURCE FOUND. Search returned only album listings and a Boiler Room page describing a Georgia rapper with off-beat flows and gritty underground trap beats. Director/editor not found.
(b)-(g) No solid source. Plainly visible only from general knowledge (INFERRED): low-budget, performance/car/street footage in the lo-fi Atlanta-underground manner.
(h) Copyable takeaways (all INFERRED, not tied to a verified video):
1. Lo-fi on purpose: slightly crushed blacks, grain, low bitrate feel.
2. Minimal text, mostly raw footage.
3. Off-beat flow means cut slightly off-grid to mirror the vocal rather than the kick.
(i) Sources: https://deezer.com/album/675486991 (album only); https://set79.com/tracklist/soundcloud.com/platform/lazer-dim-700-dc-saturday (bio only). Consider replacing this artist with a better-documented one.

## 24. Autumn!

(a) NO SOLID SOURCE FOUND for a video director. Wikipedia confirms identity (Benjamin Clarence Phillips Jr., formerly TrapGodBenji, associated with popularising pluggnb) but no video credits.
(b)-(g) No solid source. INFERRED: pluggnb visuals tend to be soft, dreamy, pastel, with slowed pacing.
(h) Copyable takeaways (INFERRED): 1. Slower cut rate and soft glow (ffmpeg `gblur` blended with screen) to match pluggnb. 2. Pastel/cool grade. 3. Slow push-ins on a still or loop.
(i) Source: https://en.wikipedia.org/wiki/Autumn_(rapper) (identity only; VERIFIED). Consider replacement.

## 25. SoFaygo - "Knock Knock" (2019 single; video later)

(a) Director Cole Bennett (Lyrical Lemonade) credited by one weak source, a fan-style blog; treat as LOW-confidence VERIFIED-by-single-secondary-source and confirm in the YouTube credits. Editor/DP: no solid source. Producer of song: Lil Tecca (Wikipedia).
(b)-(c) No solid source. If Cole Bennett (INFERRED from his house style): bright, hyper-saturated, fast cuts, whip pans, colour-blocked sets.
(d) VFX: video reportedly has a playhouse set with haunting creatures and SoFaygo in a pinstripe suit (paraphrase of the blog; low confidence).
(e) Text: no solid source. Lyrical Lemonade branding typically includes an on-screen title card (INFERRED).
(f) Grade: INFERRED saturated, high-key, with black-and-white outfit as contrast.
(g) Camera: no solid source.
(h) Copyable takeaways: 1. Strong two-colour costume vs saturated set contrast (use colour keys). 2. Character/creature cutaways every few seconds. 3. Title card at start with the song name in bold type.
(i) Sources: https://ihhstg.wpengine.com/the-long-anticipated-video-for-sofaygos-knock-knock-has-arrived/ (single weak source); https://en.wikipedia.org/wiki/Knock_Knock_(SoFaygo_song).

## 26. Rich Amiri

(a) Videos with credits, VERIFIED via audibletreats press posts (search summaries): "Can't Die" (2022) directed by Declan Kyle, with visual references to The Matrix and Dexter; "Dirty Money" (2022) directed by Tycho Burwell, jail-escape plot; "Feelings" ft. Desire (2022) directed by Sienna Burmess, Houston hotel; "FORZA FREESTYLE" (Dec 2023) directed by Keaton Jones, Tesla and hillside L.A. mansion. "One Call" (2023) set in the California desert, director not found.
(b)-(c) No solid source on cut rate. INFERRED: narrative/cinematic cutting for "Can't Die" and "Dirty Money".
(d) VFX: "Can't Die" uses film references (Matrix, Dexter) - INFERRED green-tinted/slow-motion homage, unverified.
(e) Text: no solid source.
(f) Grade: INFERRED cinematic, teal/green for Matrix reference.
(g) Camera: no solid source.
(h) Copyable takeaways: 1. Film-homage structure: pick one movie look and apply consistently (grade plus a few signature framings). 2. Narrative mini-plot (escape, drive up, arrive) gives a visualizer progression. 3. Luxury-location b-roll (car, mansion) intercut with performance.
(i) Sources: https://audibletreats.com/rich-amiri_pr14/ , https://audibletreats.com/rich-amiri_pr2/ , https://audibletreats.com/rich-amiri_pr4/ , https://audibletreats.com/rich-amiri_pr12/ (VERIFIED credits via search summaries; not re-read in full).

## 27. Evilgiane

(a) NO SOLID SOURCE FOUND for a named director. "40" with Nettspend and Xaviersobased (2024) has a YouTube video per Wikipedia, director not named. Surf Gang is described as a label and creative agency; producers there also direct, but that does not confirm credits.
(b)-(g) No solid source. INFERRED: Surf Gang/internet-rap visuals are DIY, cam-footage, glitchy, with low-res texture and fast cuts.
(h) Copyable takeaways (INFERRED): 1. DIY digicam look: low-res, over-sharpened, date-stamp style overlay. 2. Chaotic collage cuts. 3. Minimal colour grading, raw flash.
(i) Source: https://en.wikipedia.org/wiki/40_(single) (existence of video only). Consider replacing.

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

## 29. BKTHERULA

(a) "Uh Huh" (Jan 2023): directed and edited by Timeless; creative direction by Maliputyouon, Benjididit, Creezed (VERIFIED per Revolt, via search summary; a second search could not corroborate "Timeless"). "Crazy Girl" (May 2023): director Jordan Margolin, described as cinematic (VERIFIED, Antimusic). "Big Feeling" (2025): shot in Atlanta, directed by Mali (VERIFIED, Clash).
(b)-(c) No solid source on cut rate. INFERRED: "Uh Huh" is a quick performance/lifestyle cut; "Crazy Girl" is more cinematic.
(d) VFX: no solid source. "Big Feeling" is described as a viral moment (Clash); no edit details found.
(e) Text: no solid source.
(f) Grade: INFERRED pink/pastel Atlanta-girl palette; unverified.
(g) Camera: no solid source.
(h) Copyable takeaways (mostly INFERRED): 1. Pair a trending hook-section loop with 9:16 safe framing. 2. Pastel/pink grade with soft glow. 3. Credit structure: separate "creative director" from director - allows a theme brief per video.
(i) Sources: https://www.revolt.tv/article/2023-01-04/265300/bktherula-uh-huh-video/ ; https://antimusic.com/musicpressbox/amp/bktherula_delivers_crazy_girl_video-052323 ; https://www.clashmusic.com/?p=444219

## 30. Chief Keef (Almighty So 2 era)

(a) "Dirty Nachos" with Mike WiLL Made-It (Feb 2024): director Medet; shot almost entirely on iPhone (VERIFIED, Complex). "Runner" (May 2024, from Almighty So 2): Keef in a confession booth with manager Peeda Pan as priest, and riding in a Rolls Royce (VERIFIED, The Source); director not found.
(b) Edit/pacing: no solid source. INFERRED: relaxed cuts for "Runner", performance-first.
(c)-(d) No solid source.
(e) Text: no solid source.
(f) Grade: no solid source.
(g) Camera: iPhone-shot "Dirty Nachos" (VERIFIED, one source; not corroborated by director).
(h) Copyable takeaways: 1. Phone-native aesthetic: vertical 9:16 iPhone look is a legit style, so no need to fake cinema. 2. Single-concept set (confession booth) as a structuring device for a whole video. 3. Wide-angle, close-to-face handheld feel (apply gentle handheld shake and slight barrel distort in WebGL; INFERRED).
(i) Sources: https://985-content-prod.adc-blue.infra.complex.com/music/a/tracewilliamcowen/chief-keef-mike-will-made-it-dirty-nachos ; https://thesource.com/?p=718197 ; https://www.thefader.com/2024/02/08/chief-keef-and-mike-will-made-it-share-dirty-nachos

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
