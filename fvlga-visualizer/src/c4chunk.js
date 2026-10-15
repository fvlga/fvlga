// usage: node chunk.js <start_s> <dur_s> <out.mp4>  (video only; audio muxed afterwards)
const { chromium } = require(process.env.PW); const { spawn } = require('child_process'); const path = require('path');
const [start, dur, out] = [parseFloat(process.argv[2]), parseFloat(process.argv[3]), process.argv[4]];
const FPS = 30, total = Math.round(dur * FPS), BATCH = 6;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.error('page:', e.message));
  await p.goto('file://' + path.resolve('collage4d.html'));
  await p.waitForFunction(() => window.ready || window.err, null, { timeout: 120000 }); const e = await p.evaluate(() => window.err); if (e) throw new Error(e);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = 0; f < total; f += BATCH) { const n = Math.min(BATCH, total - f);
    const frames = await p.evaluate(([a, n, fps]) => renderBatch(a, n, fps, 0.93), [start + f / FPS, n, FPS]);
    for (const d of frames) if (!ff.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 150 === 0) console.log(`${f}/${total} frames, ${((Date.now() - t0) / 1000).toFixed(0)}s`); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('done', out, ((Date.now() - t0) / 1000).toFixed(0) + 's');
})().catch(e => { console.error(e); process.exit(1); });
