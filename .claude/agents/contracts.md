# Shared artifact contracts

Every agent reads this file at the start of every run (agents that make or judge
anything visual also read `style.md` and `render.json`). It defines the
filenames, formats, units, gates and standing rules agents share. If you need a
new shared artifact, add it here — don't invent a parallel convention.

## Units
- All times are **seconds** (float). Frames are derived: `frame = round(t * fps)`.
- `fps` comes from `analysis.json` (default 30).

## Format — `render.json`
Every render request has a `render.json` in the project root, written by the
caller. If it is missing, `video-finisher` creates it from the request, and asks
when the format is unclear. Wherever an agent file says "the manifest" or "the
format manifest", it means this file (`manifest.json` below is only the footage
clip list).

```json
{"format": "16:9", "fps": 30, "letterbox": null, "safe_zones": null, "delivery_mb": 30}
```
- `format`: `"16:9"` = 1920x1080 landscape, `"9:16"` = 1080x1920 vertical.
  Dual-format delivery = two files (`render_16x9.json`, `render_9x16.json`) and
  two recomposed builds. Never auto-crop or silently letterbox one format into
  the other.
- `letterbox`: `null` = native full-frame (the default). Only set
  `{"y": <row>, "h": <height>}` when the artist explicitly asks for the legacy
  centred strip. Agents read the band from here and never hard-code it.
- `safe_zones`: `null` means use the format default — vertical: bottom 20% and
  right 15% are covered by platform UI; landscape: keep titles at least 5%
  inside the edges. Override here per project.
- `delivery_mb`: chat/upload size limit (see Limits).

## Current vs. history (the version rule)
- The **unversioned filename is always the current version**:
  `captions.json`, `analysis.json`, `qa_report.md`, `build_notes.md`.
- Versioned files (`captions_v3.json`, `qa_v2_report.md`,
  `cuff_no_dancer_v2_full.mp4`) are history.
- To write a new version: write `<name>_v<N>.<ext>` FIRST (N = highest existing
  number + 1; never rename or overwrite an older `_vN`), THEN copy it over the
  unversioned `<name>.<ext>`.
- Never make a downstream agent guess which version is current.

## Artifacts
| File | Written by | Shape |
|---|---|---|
| `render.json` | caller | see "Format" above |
| `analysis.json` | beat-analyst | `{"duration","fps","frames","bpm","bpm_confirmed","t0","beats":[…],"downbeats":[…],"sections":[{"start","end","label"}],"rms":[…],"bass":[…],"mid":[…],"high":[…],"onsets":[…],"vocal":[[s,e],…],"lufs","true_peak"}` — arrays per frame at fps. `bpm_confirmed` is written `false`; only the artist's pick flips it to `true`. |
| `captions.json` | lyric-sync | `{"captions": [[start, end, "text", "high\|med"], …], "keywords": {"word": [t, …]}, "clip_offsets": {…}, "notes": "…"}` |
| `captions_review.md` | lyric-sync | med/low-confidence lines needing the artist's ears before they may render |
| `allcuts.json` | caller / card-animator | `[[start_s, end_s, "type"], …]` — the edit decision list |
| `manifest.json` | footage-scout | `[{"dir","n","tag","source","start","dur","src_w","src_h","src_fps"}]` for cut clips |
| `PROVENANCE.md` | footage-scout | licence + hash/scan evidence per film |
| `mix_report.md` | mix-checker | measurements per file, issues with timestamps, fix commands |
| `references/underground_playbook.md` | the artist | creative-direction playbook: 7 archetypes + cross-cutting rules; style.md turns it into binding rules |
| `references/<artist>_<title>.md` | reference-analyst | style recipe from a reference video |
| `qa_report.md` | visualizer-qa | current QA report; see "QA tickets" |
| `build_notes.md` | video-finisher | per version: what changed + which `Q-###` tickets were addressed or deferred |
| `shorts/` | social-cutter | bar-aligned cuts and loops |
| `release/` | release-manager | `covers/`, `captions.md`, `checklist.md`, `plan.md` |
| `style_proposals.md` | any agent without Edit | one-line style corrections for the caller to merge into `style.md` |

## Layer producers (not agents)
`video-finisher` consumes layers this team does not make: collage chunks, the
title intro, kaleidoscope/VFX tracks, and the caption/zine alpha layer. These
come from the project's own build scripts (caller-owned). The caption layer
must be built from `captions.json` / `keywords` and must skip every caption not
marked `"high"`. If a layer is missing, `video-finisher` stops and names it; it
never substitutes.

## QA tickets
- IDs `Q-001`, `Q-002`, … are unique per project and never reused.
  `visualizer-qa` continues from the highest ID found in any `qa_v*_report.md`.
- Every report opens with a "Carried over" table: each still-open ticket from
  the previous report under its ORIGINAL ID with a status — `open`,
  `fixed in v<N>` or `deferred (reason)`. New findings get new IDs.
- `video-finisher` records each ticket in `build_notes.md` as addressed or
  deferred (with a reason). QA verifies on frames, not on `build_notes.md`.

## Limits (single place — don't hardcode elsewhere)
- Chat/upload delivery size: **30 MB** (`delivery_mb` in `render.json`;
  `video-finisher`, `social-cutter`, `release-manager` read it from there).
- Download quarantine cap: ~1.2 GB total, no single file over 1 GB without the
  artist's OK.
- Masters (`*_full.mp4`) stay out of git (GitHub rejects > 100 MB).

## Stage gates (machine-checkable)
- **Stage 1 is done** only when `analysis.json` has `"bpm_confirmed": true` AND
  `captions_review.md` has no open lines. `beat-analyst` reports half/double-time
  candidates; the artist picks.
- **Clearing a caption:** write the artist's confirmed or corrected text back to
  `captions.json` with confidence `"high"` and remove the line from
  `captions_review.md`. A caption still marked `"med"` or `"low"` is never
  rendered anywhere.
- `card-animator`, `social-cutter` and `video-finisher` stop and report if
  `bpm_confirmed` is not `true`. `video-finisher` also refuses to build if the
  caption layer contains any non-`"high"` caption.
- **Stage 5 exit (the QA → fix loop):** stop when `qa_report.md` has no High
  and at most 3 Medium tickets open, or after 3 loops, then ask the artist
  whether to ship or keep going. (Defaults; the artist can override.)

## Style changes
Agents with the Edit tool may append a dated one-line correction to `style.md`.
Agents without it append to `style_proposals.md` and say so in their final
message; the caller merges. Never rewrite `style.md` wholesale, and never fix
only the one output when the artist corrects a direction.

## Standing rules (apply to every agent)
- Typography, palette and name/title discipline come from `style.md` — never
  re-derive them from old prompt packs or guess them.
- Anything downloaded is hash-verified against its published checksum (PyPI
  sha256, archive.org md5, or two independent mirrors), virus-scanned with
  `clamscan`, kept in its own quarantine folder and never executed. Anything
  over 1 GB needs the artist's OK.
- The artist's originals (images, clips, master audio) are never overwritten;
  edits go to new files.
- Nothing is pushed, posted, uploaded or emailed unless the caller asked for it
  in this request. Sending finished files back to the artist in chat is fine.
- Large masters (`*_full.mp4`) stay out of git; deliverables respect the size
  limit above and are scanned before sending.
