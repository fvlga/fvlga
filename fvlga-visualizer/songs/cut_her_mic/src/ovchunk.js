// node ovchunk.js <start s> <frames> <out> <mode rgba|mask>
const { chromium } = require(process.env.PW); const { spawn } = require('child_process'); const path = require('path');
const [start, frames, out, mode] = [parseFloat(process.argv[2]), parseInt(process.argv[3]), process.argv[4], process.argv[5] || 'rgba'], FPS = 30;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 608 } });
  await p.goto('file://' + path.resolve(__dirname, 'ov.html')); await p.waitForFunction(() => window.ready || window.err); const e = await p.evaluate(() => window.err); if (e) throw new Error(e);
  const args = mode === 'mask' ? ['-c:v', 'libx264', '-crf', '8', '-pix_fmt', 'gray'] : ['-c:v', 'png', '-pix_fmt', 'rgba'];
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-c:v', 'png', '-framerate', String(FPS), '-i', '-', ...args, out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < frames; f += 10) { const n = Math.min(10, frames - f);
    const fr = await p.evaluate(([a, n, fps, m]) => renderBatch(a, n, fps, m), [start + f / FPS, n, FPS, mode]);
    for (const d of fr) if (!ff.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => ff.stdin.once('drain', r)); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('done', out);
})().catch(e => { console.error(e); process.exit(1); });
