# New "alone" scene (v49): a 3x2 contact-sheet grid of the artist's outfits (cut-outs, full body so the face stays small),
# one tile landing per beat on halftone teal backdrops, hold, slow push-in. Opaque 1080x608 strip, 124 frames @30.
import cv2, numpy as np, math, os, subprocess, sys
S = '/tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad'; ST = S + '/stick'
W, H, FPS, N = 1080, 608, 30, 124; T0 = 65.133; g = 14
tw, th = (W - 4 * g) // 3, (H - 3 * g) // 2
bp = 60 / 148; beat = lambda k: 0.01 + k * bp
land = [beat(161) - T0 + 0.0, beat(162) - T0, beat(163) - T0, beat(164) - T0, beat(165) - T0, beat(166) - T0]
order = [(0, 0), (2, 1), (1, 0), (0, 1), (2, 0), (1, 1)]            # (col,row) in the order they land
PEOPLE = ['n03', 'n08', 'n02', 'n09', 'p01', 'n01']
BG = [(112, 106, 70), (82, 70, 40), (150, 150, 120), (58, 44, 28), (118, 120, 88), (160, 170, 150)]   # BGR teal family
def load(n):
    p = f'{ST}/cut/{n}.png'; p = p if os.path.exists(p) else f'{ST}/cut2/{n}.png'
    im = cv2.imread(p, cv2.IMREAD_UNCHANGED).astype(np.float32); s = (th * 1.06) / im.shape[0]
    im = cv2.resize(im, (max(1, int(im.shape[1] * s)), int(th * 1.06)), interpolation=cv2.INTER_AREA)
    y = im[..., :3] @ np.array([0.114, 0.587, 0.299], np.float32)                  # teal film match: desaturate + cool cast
    im[..., :3] = 0.55 * im[..., :3] + 0.45 * np.dstack([y * 1.05, y * 0.95, y * 0.72]); return im
PIX = [load(n) for n in PEOPLE]
def halftone_bg(i):
    b = np.full((th, tw, 3), BG[i], np.float32); yy, xx = np.mgrid[0:th, 0:tw]
    u = (xx * 0.7071 + yy * 0.7071) % 9 - 4.5; v = (xx * 0.7071 - yy * 0.7071) % 9 - 4.5
    r = 2.6 + 1.6 * (yy / th)                                                        # dots grow toward the bottom
    m = (np.hypot(u, v) < r).astype(np.float32)[..., None]
    return b * (1 - 0.22 * m) + 0 * m
BGS = [halftone_bg(i) for i in range(6)]
mask = np.zeros((th, tw), np.float32); cv2.rectangle(mask, (0, 0), (tw - 1, th - 1), 1, -1)
rr = 16; rm = np.zeros((th, tw), np.uint8)
for (cx, cy) in ((rr, rr), (tw - 1 - rr, rr), (rr, th - 1 - rr), (tw - 1 - rr, th - 1 - rr)): cv2.circle(rm, (cx, cy), rr, 1, -1)
cv2.rectangle(rm, (rr, 0), (tw - 1 - rr, th - 1), 1, -1); cv2.rectangle(rm, (0, rr), (tw - 1, th - 1 - rr), 1, -1); rmask = rm.astype(np.float32)[..., None]
def tile_img(i, age, t):
    img = BGS[i].copy(); p = PIX[i]; ph, pw = p.shape[:2]; drift = 6 * math.sin(t * 1.3 + i)
    x0 = int(tw / 2 - pw / 2 + drift); y0 = th - ph + 4
    a = p[..., 3:] / 255.
    # cream edge (sticker-like) around the cut-out
    hard = (p[..., 3] > 127).astype(np.uint8); edge = cv2.GaussianBlur(cv2.dilate(hard, np.ones((9, 9), np.uint8)).astype(np.float32), (0, 0), 1.0)
    for src_rgb, src_a in (((np.array([228, 238, 245], np.float32) * np.ones((ph, pw, 3), np.float32)), edge[..., None]), (p[..., :3], a)):
        xs, xe = max(0, x0), min(tw, x0 + pw); ys, ye = max(0, y0), min(th, y0 + ph)
        if xs >= xe or ys >= ye: continue
        sub = src_rgb[ys - y0:ye - y0, xs - x0:xe - x0]; sa = src_a[ys - y0:ye - y0, xs - x0:xe - x0]
        img[ys:ye, xs:xe] = img[ys:ye, xs:xe] * (1 - sa) + sub * sa
    return img
tmp = f'{S}/gridalone'; os.makedirs(tmp, exist_ok=True)
for f in range(N):
    t = f / FPS; canvas = np.zeros((H, W, 3), np.float32)
    zoom = 1 + 0.045 * min(1, max(0, (t - land[-1]) / 2.4))                          # slow push-in once the sheet is full
    for k, ((c, r), i) in enumerate(zip(order, range(6))):
        if t < land[k]: continue
        age = t - land[k]; u = min(1, age / 0.16); pop = 1 + 2.7 * (u - 1) ** 3 + 1.7 * (u - 1) ** 2 if u < 1 else 1
        flash = max(0, 1 - age / 0.08) * 0.85
        ti = tile_img(i, age, t) * rmask; ti = ti * (1 - flash) + 255 * flash * rmask
        sc = 0.88 + 0.12 * pop; cw, ch = int(tw * sc), int(th * sc)
        ti2 = cv2.resize(ti, (cw, ch), interpolation=cv2.INTER_LINEAR); m2 = cv2.resize(rmask[..., 0], (cw, ch))[..., None]
        x = g + c * (tw + g) + (tw - cw) // 2; y = g + r * (th + g) + (th - ch) // 2
        canvas[y:y + ch, x:x + cw] = canvas[y:y + ch, x:x + cw] * (1 - m2) + ti2 * m2
    M = cv2.getRotationMatrix2D((W / 2, H / 2), 0, zoom); canvas = cv2.warpAffine(canvas, M, (W, H), flags=cv2.INTER_LINEAR)
    # film grain + faint scanlines to sit with the rest
    canvas += np.random.default_rng(f).normal(0, 3.2, canvas.shape); canvas[::3] *= 0.96
    cv2.imwrite(f'{tmp}/f{f:04d}.png', np.clip(canvas, 0, 255).astype(np.uint8))
subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-y', '-framerate', str(FPS), '-i', f'{tmp}/f%04d.png', '-c:v', 'libx264', '-crf', '10', '-preset', 'medium', '-pix_fmt', 'yuv420p', f'{S}/grid_alone.mp4'], check=True)
print('ok', N)
