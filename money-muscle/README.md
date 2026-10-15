# MONEY MUSCLE visualizer

Beat-synced 9:16 visualizer for the track *MONEY MUSCLE* (2:55, ~78 BPM).

- `money_muscle_30s.mp4`: 1080×1920 clip covering 1:24–1:54
- Live version: https://claude.ai/artifact/NPZNegoWs8Bi6BSkPuiS5Y

## Re-render
Put the track in `src/song.mp3`, then from `src/`:

```sh
ffmpeg -v error -i song.mp3 -ac 1 -ar 22050 -f f32le - | python3 analyze.py   # -> analysis.json
PW=/path/to/node_modules/playwright node render.js 0 175.5 money_muscle_full.mp4
```

`viz.js` is stateless (each frame depends only on time and `analysis.json`), so any time range renders identically.
Fonts: Anton and Oswald (SIL Open Font License).
