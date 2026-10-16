# Techniques A: how 10 underground-rap videos were made

Research limits (read first):
- Web search worked; YouTube and most article sites could not be fetched by the page tool, so text pages (Wikipedia, IMVDb, shots.net, UMG press, Uproxx, FADER) were read via plain HTTP.
- No video or media was downloaded. Nothing was watched frame by frame.
- Almost no source describes edit technique, transitions or tools for these videos. Credits are sparse. Tags used:
  - **VERIFIED** = a source says it explicitly (URL given).
  - **INFERRED** = general knowledge of the genre or the artist's visual language, not confirmed for this specific video. Treat as hypotheses to check by eye against the official video.
- Today's date context: Oct 2026. Several credits below are from 2026 pages.

---

## 1. osamason - "ik what you did last summer"
**(a) Credits:** No solid source found for an official video or its credits. Last.fm says the track was teased on Instagram in April 2024 and shares a beat with Nettspend's "California Crazy" (VERIFIED, https://www.last.fm/music/OsamaSon/_/ik+what+you+did+last+summer/+wiki). IMVDb lists no director for it. Related, not the same video: OsamaSon's "Ref" video credited to Walker Andrews (search-result summary, https://imvdb.com/n/amason, unreliable page match, treat as weak). Kai Cranmore is credited as a director for OsamaSon in general (VERIFIED, https://en.wikipedia.org/wiki/Who_TF_Is_U), but that is not tied to this video.
**(b)-(g):** No solid source found. Plainly visible facts could not be checked (YouTube blocked). INFERRED only: scene-standard rage-rap visual language of short, high-contrast, cut-heavy clips with on-camera flash and handheld rap performance.
**(h) Takeaways (all INFERRED):** 1) Hard cuts locked to snare/kick of a distorted beat. 2) Hand-held, flash-lit, low-fidelity look via ffmpeg noise + contrast curves. 3) Minimal text, only title/lyric words.
**(i) Sources:** last.fm link above. Confidence: credits none, technique INFERRED.

## 2. nettspend - "Nothing Like U" and other visuals
**(a) Credits:** No "Nothing Like U" video found by search; may not exist as an official video or is under a different title. Verified credits for other visuals:
- "who tf is u" (Mar 2026): directed / creative direction by Kai Cranmore (also OsamaSon, RJ Pasin); shot in snowy woods in Virginia (VERIFIED, https://www.universalmusic.ca/press-releases/nettspend-drops-new-who-tf-is-u-music-video-off-new-album-early-life-crisis and https://en.wikipedia.org/wiki/Who_TF_Is_U).
- "F*ck Swag" (Oct 2024): directed by Cole Bennett (VERIFIED, https://en.wikipedia.org/wiki/Nettspend).
- "stressed" (2025): director hidjifilms (VERIFIED, https://imvdb.com/n/nettspend).
- The claim that ELC visuals are credited to @digital1aura: no solid source found (searches returned nothing). Treat as the user's own lead, unconfirmed.
**(b) Edit & pacing:** For "who tf is u" the press describes freewheeling teenage mayhem: fireworks, snowballs, donuts in a truck, fires, smashing mailboxes (VERIFIED, same UMG URL). Pace is INFERRED fast and event-driven.
**(c) Transitions:** No solid source found. INFERRED: hard cuts, no designed transitions.
**(d) VFX:** No solid source found. INFERRED: practical effects (fire, fireworks) did most of the work in this one.
**(e) Text:** No solid source found.
**(f) Grade:** Snowy, cold palette is plain from the location (VERIFIED location). Treatment INFERRED.
**(g) Footage:** Location shoot with friends in corpse paint (VERIFIED, UMG URL). Lens unknown.
**(h) Takeaways:** 1) Chaotic "event" content: stack practical-feeling action (flash, sparks overlays) over performance clips (INFERRED application). 2) Cold desaturated winter grade with crushed blacks via ffmpeg `eq`/`curves` (INFERRED). 3) Pair a single strong location motif per video rather than many sets (INFERRED).
**(i) Sources:** URLs above. Credits VERIFIED, technique mostly INFERRED.

## 3. xaviersobased - "patchmade"
**(a) Credits:** No solid source found for director or editor of the "Patchmade" video. Song facts: released 20 Jul 2022 on mixtape Install, produced by Kashpaint, credited with popularising the jerk microgenre (VERIFIED, https://en.wikipedia.org/wiki/Patchmade). A FADER documentary "Keep It Going" was directed by Alex Hodor-Lee (search summary of https://www.thefader.com/2026/02/05/xaviersobased-fader-documentary-release-date), not the Patchmade video.
**(b)-(g):** No solid source found. INFERRED from the scene: low-budget DIY, friends and street/NYC settings, lo-fi digital camera look, quick cuts on the jerk bounce.
**(h) Takeaways (INFERRED):** 1) Cut or punch-zoom on the jerk beat's off-beat hits. 2) Lo-fi compression look (reduced bitrate, slight sharpening, clipped highlights). 3) Keep it short, around 1:50 like the song.
**(i) Sources:** Wikipedia link above.

## 4. 2hollis - "jeans" and "style"
**(a) Credits:** No "jeans" video found by search (may be a different title). "Style" (28 Feb 2025, Interscope): no director credit found (VERIFIED absence in https://en.wikipedia.org/wiki/Style_(2hollis_song) and https://uproxx.com/indie/2hollis-style-video/). Other 2hollis credits: "flash" (2025) directed by Noah Dillon, production co. paar, with Jacob "Kuba" Bojsza listed as a related credit (VERIFIED, https://imvdb.com/n/2hollis); "Hurt" (2026) reported as directed and edited by 2hollis himself (search summary, outlets: clashmusic, udiscovermusic; medium confidence).
**(b) Edit & pacing:** "Style" is a short (about 1:39 song) video built on a static shot of his bare torso, head cropped out of frame, wrinkled white tee and gold cross necklaces, he flips off the camera at one point (VERIFIED, https://en.wikipedia.org/wiki/Style_(2hollis_song)). So the edit is essentially one locked-off composition.
**(c)-(d)** Transitions/VFX: none described. The video appears to rely on the song's glitchy sound rather than effects (INFERRED).
**(e) Text:** No solid source found.
**(f) Grade:** No solid source found.
**(g) Footage:** Single static framing, torso crop (VERIFIED, Wikipedia above).
**(h) Takeaways:** 1) A single locked-off, deliberately awkward crop is a complete visual idea; easy to do with ffmpeg `crop` on one clip. 2) Let tiny motions (necklace sway, a gesture) carry the beat; time one gesture to the drop (INFERRED). 3) Theatrical persona over documentary lifestyle: 2hollis says he likes to keep things theatrical (VERIFIED paraphrase, Uproxx link above).
**(i) Sources:** URLs above.

## 5. Ken Carson - "Fighting My Demons"
**(a) Credits:** Directed by Cole Bennett, on the Lyrical Lemonade channel; track released 13 Oct 2023 from A Great Chaos (VERIFIED, https://en.wikipedia.org/wiki/Fighting_My_Demons). Producers: Bart How, Lvis, Outtatown, Star Boy, Warren Hunter (same URL). Editor and DP: no solid source found.
**(b) Edit & pacing:** Wikipedia describes glitchy visuals of Ken partying and rapping his own lyrics (VERIFIED, same URL). Pace INFERRED fast and montage-like.
**(c) Transitions:** No solid source found. INFERRED: glitch/stutter cuts.
**(d) VFX:** Wikipedia quotes a reviewer describing it as a montage of grainy 3D footage that resembles content shot on night-vision goggles (VERIFIED, Wikipedia above, which cites an outside review not independently opened). Cole Bennett's general style: zany special effects, playful animation, by-any-means filming (VERIFIED, https://www.xxlmag.com/cole-bennett-interview/). His early work involved colourful animated outlines over performers (VERIFIED, XXL).
**(e) Text:** No solid source found.
**(f) Grade:** Night-vision-like, grainy, likely green/monochrome cast (VERIFIED as description "night-vision goggles"; exact colour INFERRED).
**(g) Footage:** Party / performance footage, with 3D-like depth look (VERIFIED description only). Camera unknown.
**(h) Takeaways:** 1) Night-vision grade: desaturate, push green, add heavy grain, bloom on highlights (ffmpeg `colorchannelmixer`, `noise`, plus WebGL bloom). 2) Glitch layer: RGB split, scanline and slice-displacement on beat hits in a WebGL shader. 3) One coherent look across the whole video, with the glitch as seasoning on beat hits only.
**(i) Sources:** URLs above.

## 6. Destroy Lonely - "NEVEREVER"
**(a) Credits:** No solid source found for "NEVEREVER". Other Destroy Lonely credits: "If Looks Could Kill" directed by James Pereira (JMP), released 26 May 2023, shows Lonely leading emotionless villagers toward individuality (VERIFIED, https://en.wikipedia.org/wiki/If_Looks_Could_Kill_(Destroy_Lonely_song)); "How u feel?" visuals reported as JMP (search summary of https://zifmstereo.co.zw/rising-rapper-destroy-lonely-drops-cinematic-video-for-how-u-feel/); IMVDb lists "Jumanji" (2025) and "MONSTER" (2026) without credits (VERIFIED, https://imvdb.com/n/destroy-lonely).
**(b)-(g):** No solid source found for NEVEREVER. For reference, the JMP videos are narrative/cinematic (VERIFIED description).
**(h) Takeaways (INFERRED):** 1) Cinematic widescreen-feel framing can be faked in 9:16 with letterbox bars and slow push-ins. 2) Dark, low-key lighting plus dim colour grade. 3) Group-in-formation staging with a single central figure.
**(i) Sources:** URLs above.

## 7. che - "euphoria"
**(a) Credits:** No "euphoria" video found. Che's videos on IMVDb: most directed by noahsocold ("Pizza Time", "Miley Cyrus", "Bae", "Japan"); "HELLRAISER" (2025) credited to noahsocold, GK, Stan Smith and Gavin Matson (VERIFIED, https://imvdb.com/n/che). "I Rot, I Rot." from the album Sayso Says was directed by AMD of Lyrical Lemonade (VERIFIED, https://en.wikipedia.org/wiki/Sayso_Says). Pitchfork described the album's sound as glitchy, fast-paced textures (Wikipedia summary of the review).
**(b)-(g):** No solid source found for "euphoria". INFERRED: the noahsocold style is DIY, fast, chaotic cuts.
**(h) Takeaways (INFERRED):** 1) Match visual glitch density to the sonic glitch density. 2) Fast cuts with randomly flashed inserts (a frame or two). 3) Raw, party-lit footage, direct flash look.
**(i) Sources:** URLs above.

## 8. jace! - "Breathe"
**(a) Credits:** No solid source found; searches returned only unrelated "Breathe" videos and spam pages. Known: jace! (also stylised iAYZE) is a Fort Worth rapper born 2003 (weak source). A "goose creek (official video)" credit line "shot by @jmoney1041, edit by ..." appeared in a snippet from a spam site (do not rely on it).
**(b)-(g):** No solid source found.
**(h) Takeaways (INFERRED):** 1) Credit a shooter and a separate editor in the description like the scene does. 2) Keep to the short DIY format. 3) Simple repeated hook cut to chorus.
**(i) Sources:** none solid.

## 9. kankan - "RRAnthem"
**(a) Credits:** No solid source found for "RRAnthem" video. Context: Kankan is a Dallas rapper whose debut album RR (2021) featured Yeat (search summary of https://en.wikipedia.org/wiki/Kankan_(rapper); Wikipedia page did not mention "RRAnthem"). No IMVDb entry found.
**(b)-(g):** No solid source found.
**(h) Takeaways (INFERRED):** 1) "RR" (Really Rich) as repeated logo/brand text element. 2) Hyperpop-adjacent, bright, saturated colours. 3) Loop-friendly short cuts.
**(i) Sources:** Wikipedia link above (weak for this topic).

## 10. Yeat - "Monëy So Big"
**(a) Credits:** The song is from Up 2 Më (2021), produced by Trgc and Nest; popular via TikTok (VERIFIED, https://en.wikipedia.org/wiki/Money_So_Big). No official music video credit found; IMVDb lists no "Monëy So Big" video (VERIFIED absence, https://imvdb.com/n/yeat). The 2021 IMVDb-listed Yeat videos include "Monëy Twerk" (DP Jack Rottier per search summary), "Sorry Bout That" (JayJay Thakar, Speederrr), "Turban" (DotComNirvan), "Mad Bout That" (MOSHPXT, Jack Rottier) (VERIFIED, https://imvdb.com/n/yeat). So I could not identify an official video for this song; the best-known version may be a lyric/visualizer or fan content.
Better documented Yeat video, useful as a technique reference: "Breathe" (Mar 2024), directed by Felix Brady (Stink); edit company Church Edit, editor Mykyta Bereg, colourist Alex Gregory, DP Pat Aldinger; VFX/CG by a crowdsourced collective of 20+ VFX artists (Abyss Digital Studio, Method & Madness, others); concept: AI-run dystopia from the album 2093; less than three days to pitch and assemble on a small budget (VERIFIED, https://shots.net/news/view/felix-brady-breathes-life-into-yeat). No AI tool names given. Also "bigger thën everything" directed by Cole Bennett (VERIFIED, https://www.thefader.com/2023/08/10/yeat--bigger-then-everything).
**(b)-(g) for "Monëy So Big":** No solid source found. INFERRED: the song's TikTok life means it's mostly experienced as a 15-second hook, so visuals around it are short, looped, high-contrast.
**(h) Takeaways:** 1) Crowdsource/modularise: build separate shader "shots" (bell, logo, glitch) and assemble in ffmpeg (from the Breathe workflow, VERIFIED concept, INFERRED application). 2) Build an in-universe brand (Lyfestyle, 2093) and reuse its logo as recurring text. 3) Design the loopable 10-15 s hook section first.
**(i) Sources:** URLs above.

---

## Technique frequency across the 10 videos

Counts include only videos where there is a verified description or an explicit statement. "Inferred" counts are shown separately because the evidence base is thin. Important: with 10 videos and mostly missing sources, these counts are a weak signal.

| Technique | Verified (of 10) | Inferred-only (of 10) | Which |
|---|---|---|---|
| Glitch / digital distortion look | 2 | 4 | Verified: Ken Carson (reviewer), Che album sound (audio, not video); inferred: Osamason, 2hollis, Xavier, Yeat |
| Hard cuts locked to beat, no designed transitions | 0 | 8 | Inferred across all except 2hollis "Style" (single static shot) and Ken Carson |
| Lo-fi / grainy / night-vision or camcorder texture | 1 | 5 | Verified: Ken Carson; inferred: Osamason, Xavier, Nettspend, Che, jace! |
| Practical location / lifestyle footage with friends | 1 | 4 | Verified: Nettspend "who tf is u"; inferred: Osamason, Xavier, Che, jace! |
| Static / locked-off single composition | 1 | 0 | Verified: 2hollis "Style" |
| Narrative / cinematic staging | 1 | 1 | Verified: Destroy Lonely "If Looks Could Kill" (related video); Nettspend "who tf is u" partly |
| Heavy VFX / CG pipeline (crowdsourced) | 1 | 0 | Verified: Yeat "Breathe" (not the requested video) |
| Brand / logo text element | 0 | 3 | Inferred: Kankan RR, Yeat Lyfestyle, Che |
| Cole Bennett / Lyrical Lemonade involvement | 3 | 0 | Ken Carson, Nettspend "F*ck Swag", Che "I Rot, I Rot." (AMD), Yeat "bigger thën everything" (related videos) |

Overall confidence: credits for 5 (Ken Carson), 2 (flash/Style partial), 7 and 10 (related videos) are the most solid. Videos 1, 3, 6, 8, 9 have no solid source for how they were made; the next step should be a manual look at the official videos (frame stills, YouTube descriptions) by the user.
