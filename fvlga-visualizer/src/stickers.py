# "Not alone": cut-outs of the artist pop up as stickers on the beat over the "alone" field shot until the cut.
import cv2, numpy as np, os, sys, math
D = sys.argv[1]; CUT = f'{D}/cut'; FR = f'{D}/fr'
T0, T1, FPS, W, H = 65.133, 69.25, 30, 1080, 608
beat = lambda k: 0.01 + k * 60 / 148
pops = [beat(k) for k in range(161, 169)] + [beat(168) + 0.5 * i * 60 / 148 for i in range(1, 6)]   # 8 on the beat, then 8ths
# (cut-out, x centre, y bottom, height px, rotation deg) — sides first, closing in on the lone figure
PLAN = [('p07', 150, 650, 540, -4), ('p04', 935, 650, 520, 5), ('m0.6', 330, 330, 300, -10), ('p01', 770, 640, 470, -3),
        ('p09', 50, 640, 400, 8), ('m7.4', 1010, 330, 320, 12), ('p05', 420, 650, 430, -6), ('p10', 640, 660, 470, 4),
        ('p02', 245, 640, 380, 10), ('p08', 860, 650, 410, -8), ('m2.6', 560, 320, 290, -5), ('p06', 110, 470, 300, -12),
        ('p03', 990, 640, 380, 7)]
def sticker(name, h):
    im = cv2.imread(f'{CUT}/{name}.png', cv2.IMREAD_UNCHANGED).astype(np.float32)
    if name.startswith('m'):    # selfie frames: drop leftover sky
        b, g, r = im[..., 0], im[..., 1], im[..., 2]; im[..., 3] *= 1 - np.clip((b - np.maximum(r, g) - 25) / 30, 0, 1)
    s = h / im.shape[0]; im = cv2.resize(im, (max(1, int(im.shape[1] * s)), h), interpolation=cv2.INTER_AREA)
    # film match: a touch of warm sepia + contrast so they sit in the golden field shot
    rgb = im[..., :3]; y = rgb @ np.array([0.114, 0.587, 0.299], np.float32)
    rgb = 0.85 * rgb + 0.15 * np.dstack([y * 0.78, y * 0.92, y * 1.08]); rgb = np.clip((rgb - 128) * 1.06 + 132, 0, 255)
    pad = 24; a = cv2.copyMakeBorder(im[..., 3], pad, pad, pad, pad, cv2.BORDER_CONSTANT) / 255
    rgb = cv2.copyMakeBorder(rgb, pad, pad, pad, pad, cv2.BORDER_CONSTANT)
    hard = (a > 0.5).astype(np.uint8)
    border = cv2.GaussianBlur(cv2.dilate(hard, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))).astype(np.float32), (0, 0), 1.0)
    out_rgb = rgb * a[..., None] + np.array([228, 238, 245], np.float32) * (1 - a[..., None])   # cream-white sticker edge
    return np.dstack([out_rgb, np.clip(np.maximum(a, border), 0, 1) * 255]).astype(np.float32)
ST = [sticker(n, h) for n, _, _, h, _ in PLAN]
def place(canvas, shadow, st, cx, yb, sc, rot, flash):
    h, w = st.shape[:2]; M = cv2.getRotationMatrix2D((w / 2, h - 24), rot, sc); M[0, 2] += cx - w / 2; M[1, 2] += yb - (h - 24)
    s = st.copy(); s[..., :3] = s[..., :3] * (1 - flash) + 255 * flash
    wp = cv2.warpAffine(s, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT)
    a = wp[..., 3:] / 255
    sh = cv2.warpAffine(st[..., 3], M, (W, H)); sh = np.roll(np.roll(sh, 9, 0), 7, 1) / 255
    shadow[:] = np.maximum(shadow, cv2.GaussianBlur(sh, (0, 0), 6) * 0.5)
    canvas[..., :3] = wp[..., :3] * a + canvas[..., :3] * (1 - a); canvas[..., 3:] = a + canvas[..., 3:] * (1 - a)
rng = np.random.default_rng(7)
for f in range(int(round((T1 - T0) * FPS))):
    t = T0 + f / FPS; layer = np.zeros((H, W, 4), np.float32)
    bp = 60 / 148; kick = math.exp(-(((t - 0.01) / bp) % 1) * bp * 9)
    for i, (pt, (n, cx, yb, h, rot)) in enumerate(zip(pops, PLAN)):
        if t < pt: continue
        u = min(1, (t - pt) / 0.14); c1, c3 = 1.70158, 2.70158
        sc = 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2 if u < 1 else 1.0          # ease-out-back pop
        sc = max(0.05, sc) * (1 + 0.025 * kick)
        r = rot + 14 * (1 - u) * (1 if i % 2 else -1)
        shadow = np.zeros((H, W), np.float32)
        tmp = np.zeros_like(layer); place(tmp, shadow, ST[i], cx, yb, sc, r, max(0, 1 - (t - pt) / 0.07) * 0.8)
        # shadow under this sticker, then the sticker, over what's already stacked
        layer[..., :3] *= (1 - shadow[..., None] * (1 - layer[..., 3:] / 1)) ** 0  # keep earlier stickers' colour
        sa = shadow[..., None]; layer[..., :3] = layer[..., :3] * (1 - sa) ; layer[..., 3:] = sa + layer[..., 3:] * (1 - sa)
        a = tmp[..., 3:]; layer[..., :3] = tmp[..., :3] * a + layer[..., :3] * (1 - a); layer[..., 3:] = a + layer[..., 3:] * (1 - a)
    g = rng.normal(0, 7, (H, W, 1)).astype(np.float32); layer[..., :3] = np.clip(layer[..., :3] + g, 0, 255)
    out = np.dstack([layer[..., :3], layer[..., 3:] * 255]).clip(0, 255).astype(np.uint8)
    cv2.imwrite(f'{FR}/s_{f:04d}.png', out)
print('frames', f + 1, 'pops', [round(p, 3) for p in pops])
