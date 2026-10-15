const { chromium } = require(process.env.PW); const { spawn } = require('child_process'); const path = require('path');
const [frames, out] = [parseInt(process.argv[2]), process.argv[3]], FPS = 30, LEN = frames / FPS;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'vfx.html')); await p.waitForFunction(() => window.ready || window.err); const e = await p.evaluate(() => window.err); if (e) throw new Error(e);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < frames; f += 6) { const n = Math.min(6, frames - f);
    const fr = await p.evaluate(([a, n, fps, len]) => renderBatch(a, n, fps, 0.94, len), [f / FPS, n, FPS, LEN]);
    for (const d of fr) if (!ff.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => ff.stdin.once('drain', r)); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('done', out);
})().catch(e => { console.error(e); process.exit(1); });
