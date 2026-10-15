// MONEY MUSCLE visualizer core. Stateless: drawFrame(ctx, W, H, t, A) depends only on t and analysis A,
// so the browser preview and the offline video render produce identical frames.
(function (root) {
  const GOLD = ['#fff4c2', '#ffd75e', '#e6a817', '#9c6a06'];
  const GREEN = '#2f8f4e', GREEN_DK = '#174d2a', INK = '#0b0906';

  function rng(seed) { // mulberry32
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = x => 1 - Math.pow(1 - clamp(x, 0, 1), 3);

  function feat(A, key, t) {
    const f = clamp(t * A.fps, 0, A.frames - 1), i = Math.floor(f), j = Math.min(i + 1, A.frames - 1), u = f - i;
    return A[key][i] * (1 - u) + A[key][j] * u;
  }
  function sectionAt(A, t) {
    let hypeIdx = -1;
    for (let k = 0; k < A.sections.length; k++) {
      const s = A.sections[k]; if (s.kind === 'hype') hypeIdx++;
      if (t < s.end || k === A.sections.length - 1) return { s, k, hypeIdx: s.kind === 'hype' ? hypeIdx : -1, local: t - s.start };
    }
  }
  function lastBeat(A, t) { // binary search: index of last beat <= t
    let lo = 0, hi = A.beats.length - 1, r = -1;
    while (lo <= hi) { const m = (lo + hi) >> 1; if (A.beats[m] <= t) { r = m; lo = m + 1; } else hi = m - 1; }
    return r;
  }
  function goldGrad(ctx, x0, y0, x1, y1) {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, GOLD[0]); g.addColorStop(0.35, GOLD[1]); g.addColorStop(0.7, GOLD[2]); g.addColorStop(1, GOLD[3]);
    return g;
  }

  function drawCoin(ctx, x, y, r, spin, alpha) {
    const sx = Math.max(0.12, Math.abs(Math.cos(spin)));
    ctx.save(); ctx.globalAlpha = alpha; ctx.translate(x, y); ctx.scale(sx, 1);
    ctx.fillStyle = GOLD[3]; ctx.beginPath(); ctx.arc(0, r * 0.08, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = goldGrad(ctx, -r, -r, r, r); ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(120,80,0,.55)'; ctx.lineWidth = r * 0.1; ctx.beginPath(); ctx.arc(0, 0, r * 0.78, 0, Math.PI * 2); ctx.stroke();
    if (sx > 0.45) { ctx.fillStyle = 'rgba(110,70,0,.75)'; ctx.font = `${Math.round(r * 1.15)}px MMDisplay, Impact, sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('$', 0, r * 0.06); }
    ctx.restore();
  }
  function drawBill(ctx, x, y, w, rot, flip, alpha) {
    const h = w * 0.43;
    ctx.save(); ctx.globalAlpha = alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, Math.max(0.15, Math.abs(Math.cos(flip))));
    ctx.fillStyle = GREEN_DK; ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.fillStyle = GREEN; ctx.fillRect(-w / 2 + w * 0.04, -h / 2 + h * 0.09, w * 0.92, h * 0.82);
    ctx.strokeStyle = 'rgba(220,255,220,.35)'; ctx.lineWidth = Math.max(1, w * 0.012); ctx.strokeRect(-w / 2 + w * 0.08, -h / 2 + h * 0.18, w * 0.84, h * 0.64);
    ctx.fillStyle = 'rgba(230,255,230,.85)'; ctx.beginPath(); ctx.ellipse(0, 0, h * 0.26, h * 0.3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = GREEN_DK; ctx.font = `${Math.round(h * 0.42)}px MMDisplay, Impact, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('$', 0, h * 0.02);
    ctx.fillStyle = 'rgba(230,255,230,.8)'; ctx.font = `${Math.round(h * 0.2)}px MMDisplay, Impact, sans-serif`;
    ctx.fillText('100', -w * 0.36, -h * 0.28); ctx.fillText('100', w * 0.36, h * 0.3);
    ctx.restore();
  }

  // Stylized flexing arm (line art) for calm sections. flex 0..1.
  function drawArm(ctx, cx, cy, s, flex, alpha, lw) {
    const k = ease(flex);
    ctx.save(); ctx.globalAlpha = alpha; ctx.translate(cx, cy); ctx.scale(s, s);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = lw / s; ctx.strokeStyle = goldGrad(ctx, -200, -300, 200, 200);
    const peak = 60 + 70 * k; // biceps bulge height
    const fx = 150 - 30 * k, fy = -40 - 230 * k; // forearm end (fist)
    ctx.beginPath(); // upper edge: shoulder -> bicep peak -> elbow -> forearm -> fist
    ctx.moveTo(-260, 40);
    ctx.bezierCurveTo(-200, -40 - peak * 0.6, -60, -40 - peak, 40, -20 - peak * 0.5);
    ctx.bezierCurveTo(90, -10, 110 - 40 * k, -20 - 60 * k, fx - 20, fy + 30);
    ctx.stroke();
    ctx.beginPath(); // lower edge: armpit -> under arm -> elbow -> forearm
    ctx.moveTo(-240, 140);
    ctx.bezierCurveTo(-120, 150, 40, 140, 130, 90);
    ctx.bezierCurveTo(200, 60, 210 - 20 * k, -10 - 130 * k, fx + 40, fy + 20);
    ctx.stroke();
    ctx.beginPath(); ctx.ellipse(fx + 10, fy - 5, 52, 46, -0.4 - 0.6 * k, 0, Math.PI * 2); ctx.stroke(); // fist
    ctx.beginPath(); ctx.moveTo(fx - 18, fy - 30); ctx.lineTo(fx - 18, fy + 22); ctx.moveTo(fx + 10, fy - 38); ctx.lineTo(fx + 10, fy + 26); ctx.stroke();
    ctx.globalAlpha = alpha * 0.6; ctx.beginPath(); // bicep shine
    ctx.arc(-70, -10 - peak * 0.55, 34 + 10 * k, Math.PI * 1.1, Math.PI * 1.6); ctx.stroke();
    ctx.restore();
  }

  function drawFrame(ctx, W, H, t, A, opts) {
    opts = opts || {};
    const u = W / 1080; // scale unit
    const sec = sectionAt(A, t), calm = sec.s.kind === 'calm';
    const bass = feat(A, 'bass', t), rms = feat(A, 'rms', t), high = feat(A, 'high', t);
    const bi = lastBeat(A, t), since = bi >= 0 ? t - A.beats[bi] : 9;
    const kick = Math.exp(-since * 7); // 1 on the beat, decays fast
    const style = sec.hypeIdx; // 0 coins, 1 bills, 2 everything

    // camera shake on strong kicks
    const shake = calm ? 0 : kick * 10 * u * (style === 2 ? 1.4 : 1);
    const sr = rng(Math.floor(t * 60) + 7);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = INK; ctx.fillRect(0, 0, W, H);
    ctx.translate((sr() - 0.5) * shake, (sr() - 0.5) * shake);

    // background glow
    const cy = H * 0.44;
    const glow = ctx.createRadialGradient(W / 2, cy, 0, W / 2, cy, H * 0.7);
    const gA = calm ? 0.10 + rms * 0.12 : 0.18 + bass * 0.35;
    glow.addColorStop(0, `rgba(255,190,60,${gA})`); glow.addColorStop(0.45, `rgba(120,70,10,${gA * 0.45})`); glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow; ctx.fillRect(-50, -50, W + 100, H + 100);

    // light rays in final section
    if (style === 2) {
      ctx.save(); ctx.translate(W / 2, cy); ctx.rotate(t * 0.15);
      for (let i = 0; i < 14; i++) {
        ctx.rotate(Math.PI * 2 / 14);
        ctx.fillStyle = `rgba(255,215,94,${0.035 + 0.05 * bass})`;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(H, -60 * u); ctx.lineTo(H, 60 * u); ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    }

    // falling bills (section B and final), seeded lanes
    if (style >= 1) {
      const n = style === 2 ? 26 : 20;
      for (let i = 0; i < n; i++) {
        const r = rng(1000 + i * 31);
        const speed = (120 + r() * 160) * u, w = (110 + r() * 90) * u;
        const x = r() * W, phase = r() * 40;
        const y = ((t + phase) * speed) % (H + 400 * u) - 200 * u;
        drawBill(ctx, x + Math.sin(t * 1.3 + i) * 40 * u, y, w, Math.sin(t * 0.9 + i) * 0.6, t * (1.5 + r() * 2) + i, 0.35 + 0.35 * r());
      }
    }

    // radial energy ring built from the last ~2.5 s of real loudness history
    const ringR = (calm ? 230 : 250 + bass * 70 + kick * 40) * u;
    const bars = 96, hist = Math.round(A.fps * 2.5);
    ctx.save(); ctx.translate(W / 2, cy);
    for (let i = 0; i < bars; i++) {
      const fi = clamp(Math.round(t * A.fps) - Math.round(i / bars * hist), 0, A.frames - 1);
      const v = (A.rms[fi] * 0.6 + A.bass[fi] * 0.4);
      const len = (14 + v * (calm ? 60 : 150)) * u;
      const a = i / bars * Math.PI * 2 - Math.PI / 2 + (style === 1 ? t * 0.4 : 0);
      ctx.strokeStyle = i % 2 ? GOLD[1] : GOLD[2]; ctx.globalAlpha = 0.45 + v * 0.55;
      ctx.lineWidth = 9 * u; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(Math.cos(a) * ringR, Math.sin(a) * ringR);
      ctx.lineTo(Math.cos(a) * (ringR + len), Math.sin(a) * (ringR + len)); ctx.stroke();
    }
    ctx.globalAlpha = 1; ctx.lineWidth = (6 + kick * 8) * u; ctx.strokeStyle = goldGrad(ctx, -ringR, -ringR, ringR, ringR);
    ctx.beginPath(); ctx.arc(0, 0, ringR - 18 * u, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();

    // centre: arm in calm sections, big coin in hype
    if (calm) {
      const flex = 0.5 - 0.5 * Math.cos(sec.local * 1.6);
      drawArm(ctx, W / 2 + 25 * u, cy + 45 * u, 0.78 * u, flex, 0.55 + rms * 0.6, 9 * u);
    } else {
      drawCoin(ctx, W / 2, cy, (150 + kick * 22 + bass * 15) * u, t * 1.2, 1);
    }

    // coin bursts on recent beats (sections A and final)
    if (style === 0 || style === 2) {
      const g = 1500 * u;
      for (let b = Math.max(0, bi - 3); b <= bi; b++) {
        const dt = t - A.beats[b]; if (dt < 0 || dt > 1.6) continue;
        if (sectionAt(A, A.beats[b]).s.kind === 'calm') continue;
        const r = rng(b * 97 + 13), count = style === 2 ? 16 : 12;
        for (let i = 0; i < count; i++) {
          const ang = r() * Math.PI * 2, sp = (500 + r() * 900) * u;
          const x = W / 2 + Math.cos(ang) * (ringR * 0.6 + sp * dt);
          const y = cy + Math.sin(ang) * (ringR * 0.6) + Math.sin(ang) * sp * dt - 300 * u * dt + 0.5 * g * dt * dt;
          drawCoin(ctx, x, y, (26 + r() * 30) * u, dt * (6 + r() * 8) + i, clamp(1.6 - dt, 0, 1));
        }
      }
    }

    // title
    const punch = calm ? 0 : kick;
    ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    const ty = H * 0.78, sc = 1 + punch * 0.06;
    ctx.translate(W / 2, ty); ctx.scale(sc, sc);
    ctx.font = `${Math.round(190 * u)}px MMDisplay, Impact, sans-serif`;
    const tw = ctx.measureText('MUSCLE').width;
    ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillText('MONEY', 6 * u, -150 * u + 8 * u); ctx.fillText('MUSCLE', 6 * u, 40 * u + 8 * u);
    ctx.fillStyle = goldGrad(ctx, 0, -310 * u, 0, 50 * u);
    ctx.globalAlpha = calm ? 0.55 + rms * 0.5 : 1;
    ctx.fillText('MONEY', 0, -150 * u); ctx.fillText('MUSCLE', 0, 40 * u);
    if (!calm && high > 0.5) { // glint sweeping across the letters
      ctx.globalCompositeOperation = 'lighter';
      const gx = ((t * 0.7) % 1.6 - 0.3) * tw;
      const gl = ctx.createLinearGradient(-tw / 2 + gx - 80 * u, 0, -tw / 2 + gx + 80 * u, 0);
      gl.addColorStop(0, 'rgba(255,255,255,0)'); gl.addColorStop(0.5, `rgba(255,255,230,${(high - 0.5) * 0.9})`); gl.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gl; ctx.fillText('MONEY', 0, -150 * u); ctx.fillText('MUSCLE', 0, 40 * u);
    }
    ctx.restore();

    // footer: progress + timecode + tempo
    const pad = 70 * u, by = H - 150 * u, prog = clamp(t / A.duration, 0, 1);
    ctx.fillStyle = 'rgba(255,215,94,.18)'; ctx.fillRect(pad, by, W - pad * 2, 6 * u);
    ctx.fillStyle = GOLD[1]; ctx.fillRect(pad, by, (W - pad * 2) * prog, 6 * u);
    for (const s of A.sections) { if (s.start > 0) { ctx.fillStyle = 'rgba(255,240,200,.6)'; ctx.fillRect(pad + (W - pad * 2) * s.start / A.duration - 1.5 * u, by - 8 * u, 3 * u, 22 * u); } }
    const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
    ctx.font = `${Math.round(34 * u)}px MMBody, 'Arial Narrow', sans-serif`; ctx.fillStyle = 'rgba(255,235,190,.85)';
    ctx.textAlign = 'left'; ctx.fillText(`${mmss(t)} / ${mmss(A.duration)}`, pad, by + 60 * u);
    ctx.textAlign = 'right'; ctx.fillText(`${opts.bpmLabel || '78 BPM'}  ·  ${calm ? 'FLEX' : 'STACK ' + ['I', 'II', 'III'][Math.max(0, style)]}`, W - pad, by + 60 * u);

    // flash when a hype section lands
    if (!calm && sec.local < 0.45) { ctx.fillStyle = `rgba(255,240,200,${0.7 * (1 - sec.local / 0.45)})`; ctx.fillRect(-50, -50, W + 100, H + 100); }

    // vignette
    const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.65)');
    ctx.fillStyle = vg; ctx.fillRect(-50, -50, W + 100, H + 100);
    ctx.restore();
  }

  root.MoneyMuscle = { drawFrame, lastBeat, sectionAt };
})(typeof window !== 'undefined' ? window : globalThis);
