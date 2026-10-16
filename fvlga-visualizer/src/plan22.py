# v22 transition pass: map the song, apply the bible's deployment rules, render each transition as its own clip.
import json, math, subprocess, numpy as np, sys
sys.path.insert(0, sys.argv[1]); import transitions as T
V, OUT = sys.argv[2], sys.argv[3]
FPS, W, H, Y = 30, 1080, 608, 656; bp = 60 / 148; bar = 4 * bp
cuts = json.load(open(sys.argv[4]))
cue = {round(a, 3) for a, b, ty in cuts if ty in ('word', 'adlib', 'japan')}
bounds = sorted({round(a, 3) for a, b, ty in cuts if 8.3 < a < 102.4})
cf = lambda t: math.ceil(t * FPS - 1e-6)                    # first frame of the new shot
beat = lambda t: (t - 0.01) / bp
near = lambda t: min(bounds, key=lambda b: abs(b - t))
# ---- 1. structure map -> spectacle (10%; the giant-word cards already act as text slams) ----
# VHS tear on the beat-switch tag, cut to 7 frames so it snaps clean exactly on the drop frame (65.133)
spec = [('camera_drop', near(27.3)), ('vhs_tracking', near(64.65)), ('camera_drop', 69.267), ('flash', near(79.64))]
for n in (8, 12, 16, 52, 56, 60):                           # zoom punch on the 4-bar marks in both hooks
    spec.append(('zoom_punch', round(0.01 + n * bar, 3)))
# ---- 2. workhorse (20%): shake + RGB burst, on-beat cuts, snares first, never twice in a row ----
taken = [t for _, t in spec]; work = []
def ok(t):
    if any(abs(t - x) < 0.6 for x in taken + work): return False
    if t in cue or 64.4 < t < 69.6: return False
    i = bounds.index(t)
    return not any(b in work for b in bounds[max(0, i - 1):i + 2])  # never the same transition on adjacent cuts
target = round(0.2 * len(bounds))
for snare_pass in (True, False):
    for t in bounds:
        if len(work) >= target: break
        b = beat(t)
        if abs(b - round(b)) > 0.05: continue                  # only cuts ON a beat (transient), not 8ths
        if snare_pass and round(b) % 2 == 0: continue          # beats 2 and 4 first
        if t not in work and ok(t): work.append(t)
plan = sorted(spec + [('shake_rgb', t) for t in work], key=lambda x: x[1])
for a, b in zip(plan, plan[1:]): assert not (a[0] == b[0] and bounds.index(near(b[1])) - bounds.index(near(a[1])) <= 1), (a, b)
print(f'{len(bounds)} cuts: {len(bounds) - len(plan)} hard ({100 - 100 * len(plan) / len(bounds):.0f}%), '
      f'{len(work)} shake+rgb ({100 * len(work) / len(bounds):.0f}%), {len(spec)} spectacle ({100 * len(spec) / len(bounds):.0f}%)')
# ---- 3. render each transition as its own clip ----
WIN = {'shake_rgb': (0, 8), 'zoom_punch': (0, 8), 'camera_drop': (-6, 6), 'vhs_tracking': (0, 7), 'flash': (-2, 0)}
def read(f0, n):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{f0 / FPS - 0.001:.4f}', '-i', V, '-frames:v', str(n),
                          '-vf', f'crop={W}:{H}:0:{Y}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(n, H, W, 3)
out = []
for k, (ty, t) in enumerate(plan):
    c = cf(t); a, b = WIN[ty]; f0 = c + a; fr = read(f0, b - a)
    fn = getattr(T, ty); res = fn(fr, seed=k) if ty in ('shake_rgb', 'vhs_tracking') else fn(fr)
    p = f'{OUT}/t{k:03d}_{ty}.mp4'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                    '-c:v', 'libx264', '-crf', '12', '-pix_fmt', 'yuv420p', p], input=res.tobytes(), check=True)
    out.append({'type': ty, 'cut': t, 'start_frame': f0, 'frames': b - a, 'clip': p})
json.dump(out, open(f'{OUT}/trans22.json', 'w'), indent=1)
print(json.dumps([(o['type'], o['cut']) for o in out if o['type'] != 'shake_rgb']))
