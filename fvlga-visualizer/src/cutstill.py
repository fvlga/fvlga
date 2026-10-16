# Still cut-outs: u2net_human_seg -> biggest person blob -> RGBA cropped to the person
import onnxruntime as ort, numpy as np, cv2, sys, os, glob
model, src, dst = sys.argv[1:4]; os.makedirs(dst, exist_ok=True)
sess = ort.InferenceSession(model, providers=['CPUExecutionProvider']); inp = sess.get_inputs()[0].name
for f in sorted(glob.glob(os.path.join(src, '*.jpg'))):
    im = cv2.imread(f); h, w = im.shape[:2]
    x = (cv2.resize(im[:, :, ::-1], (320, 320)).astype(np.float32) / 255.0 - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
    o = sess.run(None, {inp: x.transpose(2, 0, 1)[None].astype(np.float32)})[0][0, 0]
    o = (o - o.min()) / (o.max() - o.min() + 1e-8); a = cv2.resize(o, (w, h))
    m = (a > 0.5).astype(np.uint8); n, lab, st, _ = cv2.connectedComponentsWithStats(m, 8)
    if n > 1:   # keep the person nearest the centre with a big area (the artist), drop crew in the background
        cand = [(st[k, cv2.CC_STAT_AREA] * (1.5 - abs((st[k, 0] + st[k, 2] / 2) / w - 0.5)), k) for k in range(1, n)]
        k = max(cand)[1]; a = a * cv2.dilate((lab == k).astype(np.uint8), np.ones((9, 9), np.uint8))
    a = cv2.GaussianBlur(np.clip((a - 0.3) / 0.4, 0, 1), (0, 0), 1.0)
    ys, xs = np.where(a > 0.05); y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    out = np.dstack([im, (a * 255).astype(np.uint8)])[y0:y1, x0:x1]
    cv2.imwrite(os.path.join(dst, os.path.basename(f)[:-4] + '.png'), out); print(os.path.basename(f), out.shape)
