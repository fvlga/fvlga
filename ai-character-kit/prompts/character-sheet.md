# Character Sheet Prompts

## Step 1: Explore looks

Run this 3–5 times and pick your favourite. Save it as `refs/gant_master.png`.

```
Photorealistic portrait of an original fictional man, about 60 years old, tall and thin
with a rigid upright posture. Long narrow face, pencil-thin grey moustache, heavy
eyebrows, permanently unimpressed expression. Silver hair slicked straight back.
He wears an oversized burgundy velvet bow tie (about twice normal size), a black
tailcoat with brass buttons, a grey waistcoat, a white shirt and spotless white cotton
gloves. Elegant hotel lobby background, soft natural light, 9:16 vertical, shot on 50mm.
No text, no logos.
```

## Step 2: Build the sheet from the master image

**Always attach `refs/gant_master.png` as the reference.** Change only the line that describes the view.

Base prompt:
```
Use the attached image as the identity reference. Keep the exact same face, moustache,
hair, proportions, oversized burgundy bow tie, black tailcoat, grey waistcoat and white
gloves. Plain light-grey studio background, even soft lighting, photorealistic.
No text. {VIEW}
```

| File | {VIEW} |
|---|---|
| `sheet_portrait.png` | Head-and-shoulders portrait, facing the camera, neutral serious expression. |
| `sheet_fullbody.png` | Full body, standing straight, arms at his sides, facing the camera, shoes visible. |
| `sheet_side.png` | Full-body side profile facing left, perfectly upright posture. |
| `sheet_three_quarter.png` | Three-quarter view from the waist up, turned 45° to the right, adjusting his left glove. |

## Step 3: Check consistency

Put all four images side by side and check them against this list. Regenerate any image that fails a check.

- [ ] Same face and moustache shape in every image
- [ ] The bow tie is the same colour and size
- [ ] Gloves are white and on both hands
- [ ] The tailcoat has brass buttons
- [ ] Hands have 5 fingers each and nothing is warped
