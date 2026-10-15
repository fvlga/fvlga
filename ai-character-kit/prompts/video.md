# Video Prompts

## A. Motion transfer (from a clip you recorded)

Use this for gestures, timing and physical comedy. It works with Kling Motion Control or Higgsfield Genjutsu.

Inputs:
- **Appearance:** `refs/gant_master.png`
- **Motion:** your 5–8 s clip, for example `refs/motion/scene01.mp4`

```
Use the image as the appearance reference and the video as the motion reference.
Transfer the performance to this fictional character. Preserve the face, proportions,
oversized burgundy bow tie, black tailcoat and white gloves. Follow the original timing
exactly and keep the hands natural with five fingers. Setting: {SETTING}.
One character, no text, 9:16 vertical.
```

**How to record your motion clip**
- Use a phone on a tripod (or propped up) and don't move the camera.
- Wear dark clothes and something on your hands, so the model reads the hand shapes clearly.
- Start every clip with the glove tug: left hand, then right.
- Exaggerate your stiffness and slow down every movement. That slowness is the character.

## B. Image to video (simple scenes)

Use this for scenes with little movement. It works with Seedance 2.5 or Runway Gen-4 Turbo.

```
Animate the attached character. {ACTION}. Locked-off camera, realistic motion, keep the
face, bow tie and white gloves identical to the reference. {SETTING}. 8 seconds,
9:16 vertical, no text.
```

## Checklist before you keep a take

- [ ] The face matches the master image
- [ ] The gloves stay white and on his hands the whole time
- [ ] The bow tie doesn't shrink or change colour
- [ ] There are no extra fingers and nothing melts
- [ ] The ending is readable without sound
