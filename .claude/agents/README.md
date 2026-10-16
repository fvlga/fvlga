# Music-video agent team: the efficient setup

13 Claude Code subagents, loaded automatically from `.claude/agents/` in this repo. Ask for one by name ("use visualizer-qa on v19"), or ask for a stage ("run stage 2 for the new song").

## Shared files (not agents — every agent reads these every run)
| File | What it is |
|---|---|
| `style.md` | The single source of truth for the look: typography, palette, imagery rules, name/title discipline. When the artist corrects a direction, update THIS file — prompt packs and build scripts are dated outputs, this is the living record. |
| `contracts.md` | Filenames, formats, units and limits agents share (analysis.json, captions.json, allcuts.json, QA ticket numbering, the 30 MB delivery limit, stage gates). The unversioned filename is always the current version; `_vN` files are history. |
| `fvlga-visualizer/references/underground_playbook.md` | The artist's creative-direction playbook: 7 underground archetypes + cross-cutting rules. Pick one archetype per song (see style.md). |
| `render.json` | The requested delivery format (16:9 or 9:16), fps, optional letterbox band and safe zones. Replaces the vague "format manifest" that v3 agents referred to but never defined. |
| `voice.md` | Examples of the artist's real captions, for `release-manager` to match. |

## The team
| Agent | Model | Job |
|---|---|---|
| `beat-analyst` | sonnet | Song analysis: BPM, beat/bar grid, sections, energy (`analysis.json`) |
| `lyric-sync` | sonnet | Timed captions and keyword hits; aligns phone clips to the song |
| `mix-checker` | haiku | Loudness, true-peak/clipping and A/V sync checks; safe fix commands |
| `reference-analyst` | inherit | Breaks down reference videos into a replicable style recipe |
| `art-director-prompts` | sonnet | Gemini (Nano Banana) and Veo prompt packs in the house style |
| `footage-scout` | sonnet | Public-domain film: verified, scanned, cut into clips |
| `card-animator` | inherit | Gemini image → beat-synced VFX shot; font comparison boards |
| `performance-editor` | inherit | Selfie clips: lip-sync, face-track, film/xerox/neon looks |
| `colorist` | sonnet | Grade looks and where to apply them |
| `video-finisher` | sonnet | Composites a version, compresses it under 30 MB, runs checks, scans, commits (pushes only when asked) |
| `visualizer-qa` | inherit | Frame-by-frame audit with timestamps and fixes |
| `social-cutter` | sonnet | Bar-aligned 15 s hook cut (30 s cuts and loops only on request) |
| `release-manager` | sonnet | Covers, captions, hashtags, platform spec checks and a posting plan (never posts) |

"inherit" uses whatever model the main session uses (the strongest, for jobs that need visual judgment). "sonnet" is for routine, well-specified work; "haiku" is for pure measurement. This keeps quality where it matters and cost and time low elsewhere.

## Playbook (run each stage in parallel, at most 3–5 agents at once)
1. **New song:** `beat-analyst` + `lyric-sync` + `mix-checker`, plus `reference-analyst` if the artist sent references. **Stage 1 exit gate (see contracts.md):** the artist confirms the BPM — beat-analyst reports half/double-time candidates for trap, and everything downstream inherits the pick — AND clears `captions_review.md`. Nothing in stage 2+ treats a med-confidence caption as confirmed.
2. **Gather material:** `art-director-prompts` (the artist makes images in Gemini) + `footage-scout` + `performance-editor` (if selfie clips were sent).
3. **Make shots:** one `card-animator` per new image (up to 3 at a time) + `colorist` on test frames.
4. **Build:** `video-finisher` (one at a time; it uses the whole CPU for rendering).
5. **Check:** `visualizer-qa`, then loop back to 3 or 4 with its fix list. Stop when no High and at most 3 Medium tickets are open, or after 3 loops, then ask the artist whether to ship (see contracts.md).
6. **Ship:** `social-cutter` + `release-manager` + `mix-checker` on the exports.

Why not 30 agents: rendering is CPU-bound (a few cores), so more than about 5 at once only makes everyone wait, and overlapping agents make it harder to pick the right one. For a big batch (for example 10 films to scout), launch several copies of the same agent on separate slices instead of inventing new agents.

## Output-format contract
- Default to native full-frame 16:9 landscape (1920x1080) for YouTube and native full-frame 9:16 vertical (1080x1920) for TikTok/Reels/Shorts.
- When both are requested, recompose for each ratio and verify both; do not simply letterbox landscape footage into vertical.
- Only use the legacy centred 16:9 strip (1080x608 at y=656 inside a 1080x1920 frame) when explicitly requested.
- Keep important type and focal elements within the appropriate platform safe zones (vertical: bottom ~20% and right ~15% are covered by platform UI).

## What changed in v4
1. **`render.json` is now a real file.** v3's format contract pointed at "the manifest" in six agents, but `manifest.json` is the footage clip list. One file now defines format, fps, letterbox band, safe zones and delivery size.
2. **Every agent now reads the shared files on its first line.** In v3 only 2 of 13 agents were told to read `style.md`, and the "standing rules" lived only in this README, which subagents never see. The rules moved into `contracts.md` and each agent file opens with a read-first line.
3. **Blackletter contradiction removed.** `style.md` says blackletter is opt-in, but `art-director-prompts` and `card-animator` still said "gothic blackletter for titles". Both now defer to `style.md`.
4. **footage-scout's 640x480 @ 15 fps working format is retired.** It was sized for the old 1080x608 strip. Clips now keep source resolution and frame rate, and the manifest records them so you know the effective pixels per format (a 9:16 window of 4:3 SD footage is only about 270x480).
5. **Stage gates are machine-checkable.** `analysis.json` carries `bpm_confirmed`; `card-animator`, `social-cutter` and `video-finisher` stop if it isn't true. Caption clearing is defined (write back as `high`), and `video-finisher` refuses to render any non-`high` caption.
6. **QA tickets can't drift.** Numbering continues from the highest existing ID, every report opens with a "Carried over" table, and QA verifies fixes on frames instead of trusting `build_notes.md`.
7. **Version rule made unambiguous:** write `_v<N>` first, then copy over the unversioned file (beat-analyst and lyric-sync worded this differently).
8. **video-finisher:** bitrate is computed from `delivery_mb` and duration instead of a hardcoded 1950k; it pushes only when asked and never to main; missing layers (collage, intro, caption/zine) are named as caller-owned build-script outputs and block the build instead of being guessed.
9. **release-manager** treats an unfilled `voice.md` as missing and pauses only the copy step.
10. **Stage 5 has an exit rule** (no High, at most 3 Medium, or 3 loops) so the QA loop can't run forever.

Still yours to do: paste 5 to 10 real captions into `voice.md`. (Per-project notes for CUFF NO DANCER are filled in.)

## What changed in v3 (merged with the ChatGPT pass)
- **Output-format contract** (from the ChatGPT pass): native 16:9 or 9:16 full-frame by default; the old letterbox-strip default is gone from every agent; dual-format delivery means recomposing, not auto-cropping.
- Everything from v2 is kept: `style.md`, `contracts.md`, `voice.md`, the stage-1 exit gate, the caption-confidence rule, QA ticket tracking.

## What changed in v2
1. **New `style.md`** — the single source of truth for typography, palette, imagery rules and name/title discipline. Every agent reads it every run; corrections go here, not into scattered prompt packs. (This kills the blackletter-default bug that burned a full round of ad-lib slides.)
2. **New `contracts.md`** — shared filenames, units (seconds everywhere), the version rule (unversioned filename = current, `_vN` = history), the 30 MB delivery limit in one place, and the stage gates.
3. **New `voice.md`** — real examples of the artist's captions for `release-manager` to match, instead of an invented voice.
4. **Stage 1 exit gate** — the artist confirms the BPM (half/double-time trap ambiguity) and clears `captions_review.md` before anything downstream runs.
5. **Confidence rule** — med-confidence captions are unconfirmed: they sit in `captions_review.md` and must not render until cleared.
6. **QA fix tracking** — issues are numbered (`Q-001`…), and `video-finisher` checks them off in `build_notes.md` per version.
7. Small fixes: footage-scout's 640x480@15fps working format is now a documented conscious choice; the 30 MB limit is read from `contracts.md` (not hardcoded in three agents); card-animator scaffolds new harnesses from a shared template.

## Standing rules for every agent
They live in `contracts.md` now. Every agent reads that file first, and each agent file says so in its opening line. This README is for humans; subagents never see it.
