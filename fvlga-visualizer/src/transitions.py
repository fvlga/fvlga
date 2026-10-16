# Rage transition presets (from fvlga-visualizer/references/rage_transition_bible.md), 30 fps, frame-exact.
# Each preset takes the strip frames of the window (uint8 [n,H,W,3]) and returns processed frames of the same length.
# "c" in the docs = index of the cut frame (first frame of shot B) inside the window; impact lands on it.
import numpy as np, cv2

def _rgb(f, s):          # red +x, blue -x, green locked (never vertical)
    if s <= 0: return f
    o = f.copy(); o[..., 0] = np.roll(f[..., 0], s, 1); o[..., 2] = np.roll(f[..., 2], -s, 1); return o

def _zoom(f, z, dx=0.0, dy=0.0):
    H, W = f.shape[:2]; w, h = W / z, H / z; x0 = (W - w) / 2 + dx; y0 = (H - h) / 2 + dy
    M = np.float32([[z, 0, -x0 * z], [0, z, -y0 * z]]); return cv2.warpAffine(f, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

def shake_rgb(fr, seed=0, amp=(12, 8), zoom=1.06, split=(6, 12, 12, 12)):
    """#8 shake burst + #4 RGB split burst (osamason): 8 frames from the cut, new random offset every frame, zoom hides edges."""
    r = np.random.default_rng(seed); out = []
    for i, f in enumerate(fr):
        g = _zoom(f, zoom, (r.random() - 0.5) * 2 * amp[0], (r.random() - 0.5) * 2 * amp[1])
        out.append(_rgb(g, split[i] if i < len(split) else 0))
    return np.array(out)

def zoom_punch(fr, scales=(1.18, 1.18, 1.15, 1.11, 1.08, 1.06, 1.05, 1.05)):
    """#3 zoom punch: STEP to 1.18 in the cut frame (teleport, no ramp), hold, drift back toward 1.05, hard-out."""
    return np.array([_zoom(f, scales[i]) if i < len(scales) else f for i, f in enumerate(fr)])

def camera_drop(fr, c=6, dist=0.4):
    """#15 camera drop (9:16 replacement for the whip pan): A falls with vertical blur, the cut hides at max blur,
    B rises from below and lands dead (no drift). Window = 6 frames of A + 6 of B."""
    H = fr.shape[1]; D = dist * H; out = []
    for i, f in enumerate(fr):
        if i < c: p = (i + 1) / c; off = D * p * p; k = int(1 + 48 * p)
        else: p = (i - c) / (len(fr) - c - 1); off = -D * (1 - p) ** 2; k = int(1 + 48 * (1 - p) ** 2)
        g = np.roll(f, int(round(off)), 0); k += 1 - k % 2
        out.append(cv2.blur(g, (1, k)) if k > 1 else g)
    return np.array(out)

def vhs_tracking(fr, seed=0, n_on=7):
    """#5 VHS tracking: 3 bands tear sideways (+25 / -30 / +15 px), static noise, slight roll up, then STEP back clean."""
    r = np.random.default_rng(seed); H = fr.shape[1]; bands = []
    for off in (25, -30, 15):
        h = int(H * r.uniform(0.15, 0.25)); bands.append((int(r.uniform(0, H - h)), h, off))
    out = []
    for i, f in enumerate(fr):
        if i >= n_on: out.append(f); continue
        ramp = min(1, (i + 1) / 4); g = np.roll(f, -int(i * 0.7), 0).copy()       # roll up ~8 px over the hold
        for y, h, off in bands:
            s = int(off * ramp * (1 + 0.25 * r.standard_normal())); g[y:y + h] = np.roll(g[y:y + h], s, 1)
            g[y:y + h, :, 0] = np.roll(g[y:y + h, :, 0], s // 2, 1)                 # chroma bleed in the tear
        nz = r.normal(0, 25 * ramp, g.shape[:2])[..., None]
        g = np.clip(g.astype(np.float32) + nz, 0, 255).astype(np.uint8)
        y = int(r.uniform(0, H)); g[y:y + 3] = 235                                   # tracking line
        out.append(g)
    return np.array(out)

def flash(fr, color=255):
    """#6 flash frame: pure white (impact) or black (dread), no fade. Applied to the last frames of A."""
    return np.full_like(fr, color)

BURN_IN = (1.0, 1.12, 1.3, 1.55, 1.9, 2.4, 3.1, 4.2, 5.8, 8.5, 13, 22, 60, 200)   # measured off the artist's stairs clip
BURN_OUT = tuple(reversed(BURN_IN))

def _expose(f, g):
    lin = (f.astype(np.float32) / 255) ** 2.2 * g                 # push exposure in linear light: highlights clip first
    blo = cv2.GaussianBlur(np.clip(lin - 0.8, 0, None), (0, 0), 18) * 0.6   # halation off the clipped areas
    out = np.clip(lin + blo, 0, 1) ** (1 / 2.2)
    out[..., 2] *= 1 - 0.06 * min(1, (g - 1) / 8)                   # the phone's burn runs a touch warm
    return (np.clip(out, 0, 1) * 255).astype(np.uint8)

def exposure_burn_in(fr, gains=BURN_IN):
    """The artist's 'crazy transition' (stairs clip): shot A over-exposes over ~12 frames, darks go last, ends pure white.
    Window = the last len(gains) frames of A; follow with a shot that comes out of white (exposure_burn_out or real footage)."""
    return np.array([_expose(f, gains[i]) for i, f in enumerate(fr)])

def exposure_burn_out(fr, gains=BURN_OUT):
    """Mirror: shot B resolves out of white (slow start, fast finish)."""
    return np.array([_expose(f, gains[i]) if i < len(gains) else f for i, f in enumerate(fr)])

def _fbm(h, w, seed, oct=5):
    r = np.random.default_rng(seed); out = np.zeros((h, w), np.float32); amp = 1.0
    for o in range(oct):
        s = 2 ** (o + 2); n = r.random((h // s + 2, w // s + 2)).astype(np.float32)
        out += cv2.resize(n, (w, h), interpolation=cv2.INTER_CUBIC) * amp; amp *= 0.5
    return (out - out.min()) / (out.max() - out.min())

def ink_reveal(fr, c=10, seed=0):
    """VFX #12 ink reveal (procedural, no stock): black ink blooms in from the left edge and swallows shot A,
    the cut hides under full ink, then the ink drains to the right and reveals shot B. Window = 10 frames A + 10 B."""
    n, H, W = fr.shape[:3]; noise = _fbm(H, W, seed)
    x = np.linspace(0, 1, W, dtype=np.float32)[None, :].repeat(H, 0)
    field = 0.62 * x + 0.38 * noise                                        # organic, uneven front
    out = []
    for i, f in enumerate(fr):
        if i < c: p = ((i + 1) / c) ** 1.6 * 1.05; m = np.clip((p - field) / 0.06, 0, 1)        # ink covers where field < p
        else: p = ((i - c) / (n - c - 1)) ** 0.7 * 1.05; m = np.clip((field - p) / 0.06, 0, 1)  # ink left where field > p
        bleed = cv2.GaussianBlur(m, (0, 0), 6)
        g = f.astype(np.float32) * (1 - 0.35 * bleed[..., None])          # soft dark bleed ahead of the edge
        g = g * (1 - m[..., None]) + np.array([8, 10, 12], np.float32) * m[..., None]
        out.append(np.clip(g, 0, 255).astype(np.uint8))
    return np.array(out)
