// node osachunk.js <start> <frames> <out.mov>   (transparent PNG frames -> PNG-in-MOV with alpha)
const { chromium } = require(process.env.PW); const { spawn } = require('child_process'); const path = require('path');
const [start, frames, out] = [parseFloat(process.argv[2]), parseInt(process.argv[3]), process.argv[4]], FPS = 30;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 608 } });
  await p.goto('file://' + path.resolve(__dirname, 'osa.html')); await p.waitForFunction(() => window.ready || window.err); const e = await p.evaluate(() => window.err); if (e) throw new Error(e);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-c:v', 'png', '-framerate', String(FPS), '-i', '-', '-c:v', 'png', '-pix_fmt', 'rgba', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < frames; f += 10) { const n = Math.min(10, frames - f);
    const fr = await p.evaluate(([a, n, fps]) => renderBatch(a, n, fps), [start + f / FPS, n, FPS]);
    for (const d of fr) if (!ff.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => ff.stdin.once('drain', r)); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('done', out);
})().catch(e => { console.error(e); process.exit(1); });
