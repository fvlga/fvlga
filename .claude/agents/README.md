# Music-video agent team (Claude Code subagents)

Ten reusable subagents built from the CUFF NO DANCER visualizer sessions. Claude Code loads them automatically from `.claude/agents/` in this repo. Ask for one by name, e.g. "use the visualizer-qa agent on v19", or "spawn footage-scout and lyric-sync in parallel".

| Agent | Use it when |
|---|---|
| `visualizer-qa` | After every render: frame-by-frame audit with timestamps and fixes |
| `video-finisher` | "Build vN": composite all layers, compress under 30 MB, run leak checks, scan, commit |
| `card-animator` | A new Gemini image arrives: turn it into a beat-synced VFX shot; font comparison boards |
| `performance-editor` | The artist sends selfie / performance clips: lip-sync, face-track, stylise |
| `footage-scout` | You need more public-domain film (people outdoors, etc.), downloaded safely |
| `lyric-sync` | Captions and keyword hit-times; aligning phone clips to the song |
| `colorist` | Grade look development (teal, warm) and applying it to the right intervals |
| `social-cutter` | 15 s / 30 s TikTok-Reels-Shorts cuts and loops on bar lines |
| `reference-analyst` | The artist sends reference videos: style inventory and replication recipe |
| `art-director-prompts` | Prompt packs for Gemini (Nano Banana) images and Veo clips in the house style |

Standing rule for every agent: anything downloaded is hash-verified against its published checksum and virus-scanned (`clamscan`) before use, never executed, and anything over 1 GB needs the artist's OK.
