// usage: node render.js <start_s> <dur_s> <out.mp4>
const { chromium } = require(process.env.PW || 'playwright');
const { spawn } = require('child_process'); const path = require('path');
const [start, dur, out] = [parseFloat(process.argv[2]), parseFloat(process.argv[3]), process.argv[4]];
const FPS = 30, total = Math.round(dur * FPS), BATCH = 15;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('console', m => m.type() === 'error' && console.error('page:', m.text()));
  await p.goto('file://' + path.resolve('render.html'));
  await p.waitForFunction(() => window.A && document.fonts.check('40px CNDisplay') && document.fonts.check('20px CNBody'));
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-',
    '-ss', String(start), '-t', String(dur), '-i', 'song.mp3', '-map', '0:v', '-map', '1:a',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k',
    '-movflags', '+faststart', '-shortest', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = 0; f < total; f += BATCH) {
    const n = Math.min(BATCH, total - f);
    const frames = await p.evaluate(([a, n, fps]) => renderBatch(a, n, fps, 0.92), [start + f / FPS, n, FPS]);
    for (const d of frames) if (!ff.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 300 === 0) console.log(`${f}/${total} frames, ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close();
  console.log('done', out, ((Date.now() - t0) / 1000).toFixed(0) + 's');
})().catch(e => { console.error(e); process.exit(1); });
