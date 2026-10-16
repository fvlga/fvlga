# Replace the neon smiley in the kaleidoscope bubble with the artist's face: blue-cyan duotone "crystal ball" + one clean neon outline.
import cv2, numpy as np, sys
src, cut, out, top, frac = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4]), float(sys.argv[5])
K = cv2.imread(src); H, W = K.shape[:2]; cx, cy, R = 512, 286, 128
yy, xx = np.mgrid[:H, :W]; rr = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2); disk = rr < R
strokes = cv2.dilate(((K.max(2) > 150) & disk).astype(np.uint8) * 255, np.ones((7, 7), np.uint8))
base = cv2.inpaint(K, strokes, 9, cv2.INPAINT_TELEA).astype(np.float32)
c = cv2.imread(cut, cv2.IMREAD_UNCHANGED)
c = c[:int(c.shape[0] * frac)]                                           # head (+ a bit of shoulder)
ys, xs = np.where(c[..., 3] > 128); c = c[ys.min():, max(0, xs.min()):xs.max()]
s = 2 * R * top / c.shape[0]; c = cv2.resize(c, None, fx=s, fy=s, interpolation=cv2.INTER_AREA)
a = c[..., 3].astype(np.float32) / 255
g = cv2.createCLAHE(2.5, (4, 4)).apply(cv2.cvtColor(c[..., :3], cv2.COLOR_BGR2GRAY)).astype(np.float32) / 255
g = np.clip((g - 0.08) / 0.75, 0, 1) ** 0.85
lo, hi = np.array([60, 18, 4], np.float32), np.array([255, 240, 190], np.float32)   # BGR navy -> icy cyan-white
duo = lo + (hi - lo) * g[..., None]
ph, pw = a.shape; x0, y0 = cx - pw // 2, cy + R - ph                       # sits on the bottom of the ball
L = np.zeros((H, W, 4), np.float32); L[y0:y0 + ph, x0:x0 + pw, :3] = duo; L[y0:y0 + ph, x0:x0 + pw, 3] = a
L[..., 3] *= np.clip((R - 4 - rr) / 10, 0, 1)                            # clipped inside the glass
col = base * (1 - 0.92 * L[..., 3:]) + L[..., :3] * 0.92 * L[..., 3:]
edge = cv2.morphologyEx((L[..., 3] > 0.5).astype(np.uint8), cv2.MORPH_GRADIENT, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))).astype(np.float32)
edge *= (rr < R - 8)
halo = cv2.GaussianBlur(edge, (0, 0), 3) * 1.5 + cv2.GaussianBlur(edge, (0, 0), 8) * 1.0
col += np.dstack([halo * 255, halo * 180, halo * 70])
col = col * (1 - edge[..., None]) + np.array([255, 248, 240]) * edge[..., None]
col = np.clip(col, 0, 255).astype(np.uint8)
cv2.imwrite(out, col, [cv2.IMWRITE_JPEG_QUALITY, 95])
cv2.imwrite(out.replace('.jpg', '_zoom.jpg'), cv2.resize(col[cy - R - 10:cy + R + 10, cx - R - 10:cx + R + 10], None, fx=2, fy=2))
