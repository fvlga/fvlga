# Sound under the transitions (VFX doc principle 9), synthesized locally — no stock downloads. Writes a new mix; the master is untouched.
import json, numpy as np, subprocess, sys
S = sys.argv[1]; SR = 44100; D = 105.9
plan = json.load(open(f'{S}/trans25/trans22.json'))
song = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', f'{S}/bands/song.mp3', '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True).stdout, np.float32).reshape(-1, 2)
fx = np.zeros_like(song); rng = np.random.default_rng(5)
def env(n, a, r): t = np.arange(n) / SR; return np.minimum(1, t / a) * np.exp(-t / r)
def noise_sweep(dur, f0, f1):          # band-limited noise whose centre glides f0 -> f1 (whoosh)
    n = int(dur * SR); x = rng.standard_normal(n).astype(np.float32); X = np.fft.rfft(x); fr = np.fft.rfftfreq(n, 1 / SR)
    out = np.zeros(n, np.float32); seg = 8
    for k in range(seg):
        fc = f0 * (f1 / f0) ** (k / (seg - 1)); band = np.exp(-((np.log(fr + 1) - np.log(fc)) ** 2) / 0.35)
        y = np.fft.irfft(X * band, n); w = np.zeros(n); a, b = k * n // seg, (k + 1) * n // seg; w[a:b] = 1
        out += (y * np.convolve(w, np.hanning(n // seg) / (n // seg) * 1.0, 'same')).astype(np.float32)
    return out / (np.abs(out).max() + 1e-9)
def sub_drop(dur=0.45, f0=90, f1=32):
    n = int(dur * SR); t = np.arange(n) / SR; f = f0 * (f1 / f0) ** (t / dur); ph = 2 * np.pi * np.cumsum(f) / SR
    return (np.sin(ph) * env(n, 0.004, 0.16)).astype(np.float32)
def crackle(dur=0.3):
    n = int(dur * SR); x = (rng.random(n) > 0.9985) * rng.standard_normal(n) * 1.0 + rng.standard_normal(n) * 0.05
    return (x * env(n, 0.005, 0.12)).astype(np.float32)
def riser(dur=0.45):
    n = int(dur * SR); t = np.arange(n) / SR; w = noise_sweep(dur, 400, 6000) * (t / dur) ** 2
    return (w + 0.3 * np.sin(2 * np.pi * np.cumsum(200 * (8 ** (t / dur))) / SR) * (t / dur) ** 2).astype(np.float32)
def put(sig, t, gain, pan=0.0):
    i = int(t * SR); sig = sig[: max(0, len(song) - i)]
    fx[i:i + len(sig), 0] += sig * gain * (1 - max(0, pan)); fx[i:i + len(sig), 1] += sig * gain * (1 + min(0, pan))
cuts = {}
for p in plan: cuts.setdefault(p['type'], []).append(p['cut'])
for t in cuts.get('camera_drop', []):     put(noise_sweep(0.42, 5000, 250) * env(int(0.42 * SR), 0.12, 0.25), t - 0.2, 0.22); put(sub_drop(0.35, 70, 35), t, 0.35)
for t in cuts.get('vhs_tracking', []):    put(crackle(0.26), t, 0.35); put(noise_sweep(0.24, 1800, 900) * env(int(0.24 * SR), 0.01, 0.1), t, 0.12)
for t in cuts.get('zoom_punch', []):      put(sub_drop(0.4), t, 0.40)
for t in cuts.get('exposure_burn_in', []): put(riser(0.46), t - 0.46, 0.20); put(sub_drop(0.5, 80, 30), t, 0.40)
for t in cuts.get('ink_reveal', []):      put(noise_sweep(0.66, 300, 2500) * env(int(0.66 * SR), 0.3, 0.3), t - 0.33, 0.20, pan=-0.3)
mix = song + fx
peak = np.abs(mix).max(); print('sfx events', sum(len(v) for k, v in cuts.items() if k != 'shake_rgb'), 'peak before limiter', round(float(peak), 3))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-af', 'alimiter=limit=0.89:attack=5:release=50:level=disabled',
                '-c:a', 'pcm_s16le', f'{S}/song_sfx25.wav'], input=mix.astype(np.float32).tobytes(), check=True)
