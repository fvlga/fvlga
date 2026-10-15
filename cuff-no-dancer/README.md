# CUFF NO DANCER story visualizer

Animated club-crush story for the track *CUFF NO DANCER* (1:46, 148 BPM), 1080×1920.

- `cuff_no_dancer_share.mp4`: full song, compressed for sharing
- Live version: https://claude.ai/artifact/9jABaRHThnXHFDfhPGsBhi

Scenes in `src/story.js` (`SCENES`) are timed to the song: one long run to 1:05, a drop-out at 1:05–1:09, final run to the end.

## Re-render
Put the track in `src/song.mp3`, then from `src/`:

```sh
ffmpeg -v error -i song.mp3 -ac 1 -ar 22050 -f f32le - | python3 analyze.py     # -> analysis.json
ffmpeg -v error -i song.mp3 -ac 1 -ar 22050 -f f32le - | python3 beatgrid.py    # -> grid.json (merge bpm/t0 into analysis.json)
PW=/path/to/node_modules/playwright node render.js 0 105.9 cuff_no_dancer_full.mp4
```
