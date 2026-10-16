# v35 problems → fix plan → prompt to give back

## What I found (from the v34 QA audit; v35 only changes the sticker)
**Fix first (looks bad)**
1. Sticker lands on the face (12–15 s mouth, 40–47 s nose/eyes, 68–70, 85.5, 91–92 s) → add a face-keep-out zone (detect face box per shot, 40 px margin) and have the sticker pick the nearest clear anchor.
2. Tiny unreadable micro-text + grey line lists + the "relationship status" list read like leftover meters (10–14, 20, 43–45, 84–87 s) → delete them, or make 28 px+ on a quote card.
3. Blue "side a / bands up" badge is off-palette and sits in the platform UI zone (18–26, 43–48, 66–67, 91–96 s) → recolour to the scene colour or drop it.
4. Off-grade shots that break the one-teal rule: 18.5–19.0 pink bleach, 29.0–29.7 yellow wash, 61.5–63.5 blown white, 72–73.8 green/orange blur, 96–101 saturated green/red → apply the teal grade after the effects pass, cap saturation, keep highlights < 235.
5. Black bars are not pure black: rows 655 and 1264 lit, ringing in the rows next to the strip → crop the picture to the strip and add a hard black matte on the edges.

**Medium**
6. Tile-grid A (31.6) starts on a bleached frame so the gaps vanish; quote/receipt straddle seams → start 2 frames later, keep text inside one tile.
7. Tile-grid B (84.3–87.6) too long and tiles nearly identical; terminal box over a gap → shorten to ~2 s, vary crop per tile, keep sticker/box inside tile interiors.
8. Repeated shots within 20 s (red-shirt boy 59/61.5/70.5/94.5; white-house kids 53.5/57.5/100.5; swimmers 62.5/88.5; halftone face 15.5/42/83.5) → swap in unused footage or change crop/flip.
9. Giant words clip their end letters at the strip edge (25, 46.5, 52–53, 91.5 s) → scale to 90 % width.
10. Halftone face (42–44.5 s) turns to crawling blocks → blur 2 px before halftone / raise bitrate.
11. Two or three stickers/cards at once crowd the caption (3, 15.5, 20.5, 41, 62, 100.5 s) → cap at 2, keep clear of the caption.

**Small**
12. Near-black dip at 51.3–51.8 → 4 frames or a beat flash. 13. Opening "cuff" low contrast; "up"/"so" clip at 3.5/5.5 s. 14. Lyric captions small, flicker near 17 s.

Strongest parts to keep: the collage opening, the alone shot with cut-outs (65–69 s), the giant yellow/red "huh" cards, the white flash into hook 2 (79.4 s), the chrome ending.

## Prompt to give me back
> Make v36 from v35 (full video + 15 s clip only). Fix, in this order: (1) keep the sticker off the face with a face keep-out zone; (2) delete the tiny micro-text, grey line lists and the "relationship status" list; (3) recolour or remove the blue "side a / bands up" badge; (4) pull every off-teal shot back into the teal grade and cap highlights; (5) make the black bars pure black (crop to the strip + hard matte). Then (6) fix tile-grid A/B timing, tile variety and text placement; (7) swap or re-crop the repeated shots; (8) scale giant words to 90 % width; (9) soften the halftone face; (10) max two stickers at once, clear of the caption. Keep the collage opening, the sticker's scene-matched colours, the alone shot and the ending as they are. Check frames at the timestamps listed, run the virus scan and leak check, and tell me anything you couldn't fix.
