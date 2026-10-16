# Music-video agent team: the efficient setup

13 Claude Code subagents, loaded automatically from `.claude/agents/` in this repo. Ask for one by name ("use visualizer-qa on v19"), or ask for a stage ("run stage 2 for the new song").

## Shared files (not agents — every agent reads these every run)
| File | What it is |
|---|---|
| `style.md` | The single source of truth for the look: typography, palette, imagery rules, name/title discipline. When the artist corrects a direction, update THIS file — prompt packs and build scripts are dated outputs, this is the living record. |
| `contracts.md` | Filenames, formats, units and limits agents share (analysis.json, captions.json, allcuts.json, QA ticket numbering, the 30 MB delivery limit, stage gates). The unversioned filename is always the current version; `_vN` files are history. |
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
| `video-finisher` | sonnet | Composites a version, compresses it under 30 MB, runs checks, scans, commits |
| `visualizer-qa` | inherit | Frame-by-frame audit with timestamps and fixes |
| `social-cutter` | sonnet | Bar-aligned 15 s / 30 s cuts and loops |
| `release-manager` | sonnet | Covers, captions, hashtags, platform spec checks and a posting plan (never posts) |

"inherit" uses whatever model the main session uses (the strongest, for jobs that need visual judgment). "sonnet" is for routine, well-specified work; "haiku" is for pure measurement. This keeps quality where it matters and cost and time low elsewhere.

## Playbook (run each stage in parallel, at most 3–5 agents at once)
1. **New song:** `beat-analyst` + `lyric-sync` + `mix-checker`, plus `reference-analyst` if the artist sent references. **Stage 1 exit gate (see contracts.md):** the artist confirms the BPM — beat-analyst reports half/double-time candidates for trap, and everything downstream inherits the pick — AND clears `captions_review.md`. Nothing in stage 2+ treats a med-confidence caption as confirmed.
2. **Gather material:** `art-director-prompts` (the artist makes images in Gemini) + `footage-scout` + `performance-editor` (if selfie clips were sent).
3. **Make shots:** one `card-animator` per new image (up to 3 at a time) + `colorist` on test frames.
4. **Build:** `video-finisher` (one at a time; it uses the whole CPU for rendering).
5. **Check:** `visualizer-qa`, then loop back to 3 or 4 with its fix list.
6. **Ship:** `social-cutter` + `release-manager` + `mix-checker` on the exports.

Why not 30 agents: rendering is CPU-bound (a few cores), so more than about 5 at once only makes everyone wait, and overlapping agents make it harder to pick the right one. For a big batch (for example 10 films to scout), launch several copies of the same agent on separate slices instead of inventing new agents.

## What changed in v2
1. **New `style.md`** — the single source of truth for typography, palette, imagery rules and name/title discipline. Every agent reads it every run; corrections go here, not into scattered prompt packs. (This kills the blackletter-default bug that burned a full round of ad-lib slides.)
2. **New `contracts.md`** — shared filenames, units (seconds everywhere), the version rule (unversioned filename = current, `_vN` = history), the 30 MB delivery limit in one place, and the stage gates.
3. **New `voice.md`** — real examples of the artist's captions for `release-manager` to match, instead of an invented voice.
4. **Stage 1 exit gate** — the artist confirms the BPM (half/double-time trap ambiguity) and clears `captions_review.md` before anything downstream runs.
5. **Confidence rule** — med-confidence captions are unconfirmed: they sit in `captions_review.md` and must not render until cleared.
6. **QA fix tracking** — issues are numbered (`Q-001`…), and `video-finisher` checks them off in `build_notes.md` per version.
7. Small fixes: footage-scout's 640x480@15fps working format is now a documented conscious choice; the 30 MB limit is read from `contracts.md` (not hardcoded in three agents); card-animator scaffolds new harnesses from a shared template.

## Standing rules for every agent
- Read `style.md` and `contracts.md` at the start of every run. When the artist corrects a direction, update `style.md` — don't just fix the one output.
- Anything downloaded is hash-verified against its published checksum (PyPI sha256, archive.org md5, or two independent mirrors), virus-scanned with `clamscan`, kept in its own quarantine folder and never executed. Anything over 1 GB needs the artist's OK.
- The artist's originals (images, clips, master audio) are never overwritten; edits go to new files.
- Typography, palette and name/title discipline come from `style.md` — never re-derive them from old prompt packs or guess them.
- Large masters (`*_full.mp4`) stay out of git; deliverables respect the size limit in `contracts.md` and are scanned before sending.
