import cv2, sys, os, json, numpy as np
root = sys.argv[1]; out = {}
casc = cv2.CascadeClassifier(os.path.join(cv2.data.haarcascades, 'haarcascade_frontalface_default.xml'))
for clip in sys.argv[2:]:
    files = sorted(os.listdir(os.path.join(root, clip))); n = len(files); ys = np.full(n, np.nan)
    for i in range(0, n, 3):
        g = cv2.imread(os.path.join(root, clip, files[i]), cv2.IMREAD_GRAYSCALE); g = cv2.equalizeHist(g)
        f = casc.detectMultiScale(g, 1.15, 5, minSize=(120, 120))
        if len(f): x, y, w, h = max(f, key=lambda r: r[2] * r[3]); ys[i] = y + h * 0.62   # aim a bit below eye line so the mouth stays in
    idx = np.arange(n); ok = ~np.isnan(ys)
    tr = np.interp(idx, idx[ok], ys[ok]) if ok.sum() >= 2 else np.full(n, 0.42 * 1280)
    k = 21; tr = np.convolve(np.pad(tr, k // 2, mode='edge'), np.ones(k) / k, mode='valid')     # smooth the camera move
    out[clip] = [round(float(v), 1) for v in tr]; print(clip, 'detected %d/%d' % (ok.sum(), len(range(0, n, 3))), 'y range %.0f-%.0f' % (tr.min(), tr.max()))
json.dump(out, open(os.path.join(root, 'facetrack.json'), 'w'))
