// node i2chunk.js <frames> <out.mp4>  -> 1080x1920 (strip centred on black) like the old intro.mp4
const { chromium } = require(process.env.PW); const { spawn } = require('child_process'); const path = require('path');
const [frames, out] = [parseInt(process.argv[2]), process.argv[3]], FPS = 30;
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 608 } });
  await p.goto('file://' + path.resolve(__dirname, 'intro2.html')); await p.waitForFunction(() => window.ready || window.err, null, { timeout: 90000 }); const e = await p.evaluate(() => window.err); if (e) throw new Error(e);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-', '-vf', 'pad=1080:1920:0:656:black,format=yuv420p', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < frames; f += 6) { const n = Math.min(6, frames - f); const fr = await p.evaluate(([a, n, fps]) => renderBatch(a, n, fps, 0.95), [f / FPS, n, FPS]);
    for (const d of fr) if (!ff.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => ff.stdin.once('drain', r)); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('done', out); })().catch(e => { console.error(e); process.exit(1); });
