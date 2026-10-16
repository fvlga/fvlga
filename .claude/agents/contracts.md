# Shared artifact contracts

Every agent reads this file. It defines the filenames, formats and units
agents use to talk to each other. If you need a new shared artifact, add it
here — don't invent a parallel convention.

## Units
- All times are **seconds** (float). Frames are derived: `frame = round(t * fps)`.
- `fps` comes from `analysis.json` (default 30).

## Current vs. history (the version rule)
- The **unversioned filename is always the current version**:
  `captions.json`, `analysis.json`, `qa_report.md`, `build_notes.md`.
- Versioned files (`captions_v3.json`, `qa_v2_report.md`,
  `cuff_no_dancer_v2_full.mp4`) are history. When you write a new version,
  write BOTH the versioned file AND overwrite the unversioned current file.
- Never make a downstream agent guess which version is current.

## Artifacts
| File | Written by | Shape |
|---|---|---|
| `analysis.json` | beat-analyst | `{"duration","fps","frames","bpm","t0","beats":[…],"downbeats":[…],"sections":[{"start","end","label"}],"rms":[…],"bass":[…],"mid":[…],"high":[…],"onsets":[…],"vocal":[[s,e],…],"lufs","true_peak"}` — arrays per frame at fps |
| `captions.json` | lyric-sync | `{"captions": [[start, end, "text", "high\|med"], …], "keywords": {"word": [t, …]}, "clip_offsets": {…}, "notes": "…"}` |
| `captions_review.md` | lyric-sync | med/low-confidence lines needing the artist's ears before they may render |
| `allcuts.json` | caller / card-animator | `[[start_s, end_s, "type"], …]` — the edit decision list |
| `manifest.json` | footage-scout | `[{"dir","n","tag","source","start","dur"}]` for cut clips |
| `qa_report.md` | visualizer-qa | current QA report; issues numbered `Q-001`, `Q-002`, … |
| `build_notes.md` | video-finisher | per version: what changed + which `Q-###` tickets were addressed |
| `PROVENANCE.md` | footage-scout | licence + hash/scan evidence per film |

## Limits (single place — don't hardcode elsewhere)
- Chat/upload delivery size: **30 MB** (`video-finisher`, `social-cutter`,
  `release-manager` all read it from here).
- Download quarantine cap: ~1.2 GB total, no single file over 1 GB without the
  artist's OK.
- Masters (`*_full.mp4`) stay out of git (GitHub rejects > 100 MB).

## Stage gates
- **Stage 1 is not done** until the artist confirms the BPM (beat-analyst
  reports half/double-time candidates) AND clears `captions_review.md`.
  Nothing in stage 2+ may treat a med-confidence caption as confirmed.
