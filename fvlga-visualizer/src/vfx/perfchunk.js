// node perfchunk.js jobs.json outdir [stills]  -> outdir/perf_<k>.mp4 per job (or one still per job)
const { chromium } = require(process.env.PW); const { spawn } = require('child_process'); const path = require('path'), fs = require('fs');
const jobs = JSON.parse(fs.readFileSync(process.argv[2])), od = process.argv[3], stills = process.argv[4] === 'stills', FPS = 30, MAXF = { A: 294, B: 383 };
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'perf.html')); await p.waitForFunction(() => window.ready || window.err); const e = await p.evaluate(() => window.err); if (e) throw new Error(e);
  for (const [k, job] of jobs.entries()) {
    if (stills) { const [d] = await p.evaluate(([j, i, m]) => renderBatch(j, i, 1, 30, 0.9, m), [job, Math.floor(job.n / 2), MAXF[job.clip]]); fs.writeFileSync(path.join(od, `ps_${k}.jpg`), Buffer.from(d, 'base64')); continue; }
    const out = path.join(od, `perf_${job.k ?? k}.mp4`);
    const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let f = 0; f < job.n; f += 6) { const n = Math.min(6, job.n - f);
      const fr = await p.evaluate(([j, i, n, m]) => renderBatch(j, i, n, 30, 0.94, m), [job, f, n, MAXF[job.clip]]);
      for (const d of fr) if (!ff.stdin.write(Buffer.from(d, 'base64'))) await new Promise(r => ff.stdin.once('drain', r)); }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('done', out);
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
