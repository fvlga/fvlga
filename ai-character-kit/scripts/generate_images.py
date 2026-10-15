"""Generate the Monsieur Gant character sheet with the OpenAI Images API.

Usage:
    pip install openai
    export OPENAI_API_KEY=...
    python scripts/generate_images.py explore --count 4   # candidate master looks
    python scripts/generate_images.py sheet              # 4 views from refs/gant_master.png
"""

import argparse
import base64
from pathlib import Path

from openai import OpenAI

KIT = Path(__file__).resolve().parent.parent
OUT = KIT / "output"
MASTER = KIT / "refs" / "gant_master.png"
MODEL = "gpt-image-1"
SIZE = "1024x1536"  # vertical

CHARACTER = (
    "an original fictional man, about 60 years old, tall and thin with a rigid upright "
    "posture. Long narrow face, pencil-thin grey moustache, heavy eyebrows, permanently "
    "unimpressed expression. Silver hair slicked straight back. Oversized burgundy velvet "
    "bow tie (about twice normal size), black tailcoat with brass buttons, grey waistcoat, "
    "white shirt, spotless white cotton gloves"
)

EXPLORE_PROMPT = (
    f"Photorealistic portrait of {CHARACTER}. Elegant hotel lobby background, soft natural "
    "light, shot on 50mm. No text, no logos."
)

SHEET_BASE = (
    "Use the attached image as the identity reference. Keep the exact same face, moustache, "
    "hair, proportions, oversized burgundy bow tie, black tailcoat, grey waistcoat and white "
    "gloves. Plain light-grey studio background, even soft lighting, photorealistic. "
    "No text. {view}"
)

VIEWS = {
    "sheet_portrait": "Head-and-shoulders portrait, facing the camera, neutral serious expression.",
    "sheet_fullbody": "Full body, standing straight, arms at his sides, facing the camera, shoes visible.",
    "sheet_side": "Full-body side profile facing left, perfectly upright posture.",
    "sheet_three_quarter": "Three-quarter view from the waist up, turned 45 degrees right, adjusting his left glove.",
}


def save(result, name: str) -> Path:
    path = OUT / f"{name}.png"
    path.write_bytes(base64.b64decode(result.data[0].b64_json))
    print(f"saved {path.relative_to(KIT)}")
    return path


def explore(client: OpenAI, count: int) -> None:
    for i in range(1, count + 1):
        result = client.images.generate(model=MODEL, prompt=EXPLORE_PROMPT, size=SIZE)
        save(result, f"explore_{i:02d}")
    print(f"\nPick your favourite and copy it to {MASTER.relative_to(KIT)}")


def sheet(client: OpenAI) -> None:
    if not MASTER.exists():
        raise SystemExit(f"Missing {MASTER.relative_to(KIT)} - run 'explore' and pick one first.")
    for name, view in VIEWS.items():
        with MASTER.open("rb") as ref:
            result = client.images.edit(
                model=MODEL, image=ref, prompt=SHEET_BASE.format(view=view), size=SIZE
            )
        save(result, name)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="cmd", required=True)
    exp = sub.add_parser("explore", help="generate candidate master looks")
    exp.add_argument("--count", type=int, default=4)
    sub.add_parser("sheet", help="generate the 4 character-sheet views from the master image")
    args = parser.parse_args()

    OUT.mkdir(exist_ok=True)
    client = OpenAI()
    if args.cmd == "explore":
        explore(client, args.count)
    else:
        sheet(client)


if __name__ == "__main__":
    main()
