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
