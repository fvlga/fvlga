# v51 "alone" replacement: four generated stills (Figma image gen) cut on the beat with push-ins, flash + RGB-split hits, grain. 124 frames @30.
import cv2, numpy as np, os, subprocess, math
S = '/tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad'; G = S + '/genart_quarantine'
W, H, FPS, N = 1080, 608, 30, 124; bp = 60 / 148
names = ['chair', 'phone', 'cuffs', 'boombox', 'chair']
cuts = [0, 2 * bp, 4 * bp, 6 * bp, 8 * bp, 99]
IM = []
for n in names:
    im = cv2.imread(f'{G}/{n}.png', cv2.IMREAD_COLOR); h, w = im.shape[:2]
    s = max(W * 1.2 / w, H * 1.2 / h); IM.append(cv2.resize(im, (int(w * s), int(h * s)), interpolation=cv2.INTER_CUBIC))
FOC = [(0.35, 0.55), (0.78, 0.45), (0.5, 0.58), (0.5, 0.62), (0.3, 0.6)]    # push-in focus per image
tmp = S + '/alone2'; os.makedirs(tmp, exist_ok=True)
for f in range(N):
    t = f / FPS; k = max(i for i in range(5) if t >= cuts[i]); lt = t - cuts[k]; seg = (cuts[k + 1] - cuts[k]) if k < 4 else 0.9
    im = IM[k]; ih, iw = im.shape[:2]; z = 1.0 + 0.14 * min(1, lt / seg) if k != 4 else 1.35 + 0.1 * min(1, lt / 0.9)
    cw, ch = W / z * (iw / (W * 1.2)) * 1.0, H / z * (iw / (W * 1.2)) * 1.0
    fx, fy = FOC[k]; cx = fx * iw; cy = fy * ih
    cw = min(cw, iw); ch = cw * H / W
    x0 = int(np.clip(cx - cw / 2, 0, iw - cw)); y0 = int(np.clip(cy - ch / 2, 0, ih - ch))
    crop = im[y0:y0 + int(ch), x0:x0 + int(cw)]; fr = cv2.resize(crop, (W, H), interpolation=cv2.INTER_AREA).astype(np.float32)
    hit = max(0.0, 1 - lt / 0.12)                                  # impact on every cut
    if hit > 0:
        sh = int(14 * hit); b, g, r = cv2.split(fr); M1 = np.float32([[1, 0, sh], [0, 1, 0]]); M2 = np.float32([[1, 0, -sh], [0, 1, 0]])
        b = cv2.warpAffine(b, M1, (W, H), borderMode=cv2.BORDER_REPLICATE); r = cv2.warpAffine(r, M2, (W, H), borderMode=cv2.BORDER_REPLICATE); fr = cv2.merge([b, g, r])
        fr = fr * (1 - 0.8 * hit ** 2) + 255 * 0.8 * hit ** 2
    # teal film grade + grain + scanlines + vignette (keeps it in the video's one palette)
    y = fr @ np.array([0.114, 0.587, 0.299], np.float32); fr = 0.62 * fr + 0.38 * np.dstack([y * 1.08, y * 0.97, y * 0.8])
    yy, xx = np.mgrid[0:H, 0:W]; vig = 1 - 0.35 * (((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2) / 2; fr *= vig[..., None]
    fr += np.random.default_rng(f).normal(0, 4.5, fr.shape); fr[::3] *= 0.95
    cv2.imwrite(f'{tmp}/f{f:04d}.png', np.clip(fr, 0, 255).astype(np.uint8))
subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-y', '-framerate', str(FPS), '-i', f'{tmp}/f%04d.png', '-c:v', 'libx264', '-crf', '10', '-preset', 'medium', '-pix_fmt', 'yuv420p', f'{S}/alone2.mp4'], check=True)
print('ok')
