// CUFF NO DANCER: story visualizer. Stateless: drawFrame(ctx, W, H, t, A, L) depends only on time t,
// the audio analysis A ({fps, rms, bass, high, duration, bpm, t0}) and optional lyrics L ({segments:[{start,end,text,words}]}).
(function (root) {
  const TAU = Math.PI * 2;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  const ease = x => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };
  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function feat(A, key, t) { const f = clamp(t * A.fps, 0, A.frames - 1), i = Math.floor(f), j = Math.min(i + 1, A.frames - 1), u = f - i; return A[key][i] * (1 - u) + A[key][j] * u; }

  const FONT_D = 'CNDisplay, Impact, sans-serif', FONT_B = 'CNBody, "Arial Narrow", sans-serif';

  // ---------- cast ----------
  const CAST = {
    hero:   { skin: '#8d5524', top: '#e63946', bottom: '#1d3557', hair: '#151515', cap: '#ffd166', h: 1.0 },
    crew1:  { skin: '#c68642', top: '#2a9d8f', bottom: '#264653', hair: '#2b1d14', h: 1.08 },
    crew2:  { skin: '#f1c27d', top: '#f4a261', bottom: '#3d405b', hair: '#6b3e26', glasses: true, h: 0.94 },
    dancer: { skin: '#e0ac69', top: '#9b5de5', bottom: '#f15bb5', hair: '#f15bb5', pony: true, skirt: true, h: 0.98 },
    rival:  { skin: '#5c3a21', top: '#111111', bottom: '#111111', hair: '#0a0a0a', shades: true, chain: true, h: 1.15 },
  };

  // ---------- poses ----------
  // Angles in radians: 0 = limb pointing straight down; positive = rotated toward the facing direction.
  // a* = [upper arm, forearm (relative)], l* = [thigh, shin (relative)].
  const P = (o) => Object.assign({ lean: 0, tilt: 0, bob: 0, aF: [0.15, 0.2], aB: [-0.15, 0.2], lF: [0.06, 0], lB: [-0.06, 0] }, o);
  function mix(p, q, k) {
    const m = (a, b) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
    return { lean: lerp(p.lean, q.lean, k), tilt: lerp(p.tilt, q.tilt, k), bob: lerp(p.bob, q.bob, k),
      aF: m(p.aF, q.aF), aB: m(p.aB, q.aB), lF: m(p.lF, q.lF), lB: m(p.lB, q.lB) };
  }
  const POSE = {
    stand: () => P({}),
    walk: (ph) => { const s = Math.sin(ph * TAU); return P({ bob: -Math.abs(s) * 10, aF: [-0.5 * s, 0.4], aB: [0.5 * s, 0.4], lF: [0.45 * s, Math.max(0, -s) * 0.6], lB: [-0.45 * s, Math.max(0, s) * 0.6] }); },
    bounce: (ph) => { const s = Math.sin(ph * TAU); return P({ bob: -Math.abs(Math.sin(ph * Math.PI)) * 18, lean: 0.06 * s, aF: [-0.2 + 0.25 * s, 1.7], aB: [0.2 + 0.25 * s, -1.7], lF: [0.15, -0.25 * Math.abs(s)], lB: [-0.15, 0.25 * Math.abs(s)] }); },
    pump: (ph) => { const k = Math.sin(ph * TAU); return P({ bob: -Math.abs(Math.sin(ph * Math.PI)) * 14, aF: [2.7 + 0.25 * k, 0.3 + 0.3 * k], aB: [-0.3, -1.4], lF: [0.12, 0], lB: [-0.12, 0] }); },
    twostep: (ph, b) => { const side = (b % 2 ? 1 : -1), s = Math.sin(ph * Math.PI); return P({ bob: -s * 12, lean: 0.1 * side, aF: [0.6 * side, 1.2], aB: [-0.6 * side, -1.2], lF: [0.35 * side * s, 0.3 * s], lB: [-0.1, 0] }); },
    dancer: (ph, b) => { const s = Math.sin(ph * TAU), side = b % 2 ? 1 : -1; return P({ bob: -Math.abs(Math.sin(ph * Math.PI)) * 16, lean: 0.14 * side, tilt: 0.12 * side, aF: [2.9 + 0.2 * s, 0.6 * s], aB: [-2.9 + 0.2 * s, -0.6 * s], lF: [0.25 * side, 0.1], lB: [-0.2, -0.15] }); },
    clumsy: (ph, b) => { const s = Math.sin(ph * TAU * 1.5 + b); return P({ bob: -Math.abs(s) * 22, lean: 0.25 * s, tilt: -0.3 * s, aF: [1.6 + 1.2 * s, 0.9 * s], aB: [-1.8 + 1.0 * s, -1.2], lF: [0.7 * s, 0.6], lB: [-0.4, 0.3 * s] }); },
    kneel: (ph) => P({ bob: 95, lean: 0.05, aF: [1.45 + 0.05 * Math.sin(ph * TAU), -0.1], aB: [-0.1, 0.2], lF: [1.5, -1.5], lB: [-0.35, 1.9] }),
    offer: (ph) => P({ lean: 0.12, aF: [1.35, 0.15 + 0.08 * Math.sin(ph * TAU)], aB: [-0.2, 0.3], lF: [0.15, 0], lB: [-0.15, 0] }),
    facepalm: () => P({ lean: 0.08, tilt: 0.25, aF: [2.25, 2.4], aB: [-0.15, 0.25] }),
    slump: (ph) => P({ lean: 0.32, tilt: 0.45, bob: 10 + 3 * Math.sin(ph * TAU * 0.5), aF: [0.25, 0.05], aB: [0.15, 0.05], lF: [0.12, 0.1], lB: [-0.05, 0.1] }),
    wag: (ph) => P({ aF: [2.0, -0.4 + 0.45 * Math.sin(ph * TAU * 2)], aB: [-0.3, -1.6], lean: -0.05, tilt: -0.1 }),
    cheer: (ph) => { const s = Math.abs(Math.sin(ph * Math.PI)); return P({ bob: -s * 40, aF: [2.9, 0.2], aB: [-2.9, -0.2], lF: [0.3 * s, 0.5 * s], lB: [-0.3 * s, 0.5 * s] }); },
    lead: (ph) => P({ aF: [1.6, 0.1], aB: [-0.3, 0.3], lean: 0.18, ...{ bob: -Math.abs(Math.sin(ph * TAU)) * 6 } }),
    pulled: (ph) => P({ lean: -0.35, tilt: -0.2, aF: [1.6, 0.0], aB: [-0.5, 0.4], lF: [0.5, 0.2], lB: [-0.4, 0.5], bob: -Math.abs(Math.sin(ph * TAU)) * 8 }),
    hype: (ph, b) => { const s = Math.sin(ph * TAU), side = b % 2 ? 1 : -1; return P({ bob: -Math.abs(Math.sin(ph * Math.PI)) * 30, lean: 0.12 * side, aF: [2.5 + 0.3 * s, 0.8], aB: [-0.8 * side, -1.6], lF: [0.5 * side * Math.abs(s), 0.5], lB: [-0.3, 0.4 * Math.abs(s)] }); },
  };

  // ---------- drawing primitives ----------
  function limb(ctx, x, y, dir, len1, len2, a1, a2, w, col) {
    const x1 = x + Math.sin(a1) * len1 * dir, y1 = y + Math.cos(a1) * len1;
    const x2 = x1 + Math.sin(a1 + a2) * len2 * dir, y2 = y1 + Math.cos(a1 + a2) * len2;
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    return [x2, y2];
  }
  function heart(ctx, x, y, r, col) {
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y + r * 0.9);
    ctx.bezierCurveTo(x - r * 1.6, y - r * 0.2, x - r * 0.7, y - r * 1.4, x, y - r * 0.45);
    ctx.bezierCurveTo(x + r * 0.7, y - r * 1.4, x + r * 1.6, y - r * 0.2, x, y + r * 0.9); ctx.fill();
  }
  function shade(hex, f) { const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; r = clamp(Math.round(r * f), 0, 255); g = clamp(Math.round(g * f), 0, 255); b = clamp(Math.round(b * f), 0, 255); return `rgb(${r},${g},${b})`; }

  // x = feet center, y = ground; s = scale; dir = 1 faces right, -1 faces left; face = expression; spin 0..1 squashes for a turn.
  function person(ctx, who, x, y, s, dir, pose, face, opt) {
    opt = opt || {}; const c = CAST[who], hs = s * c.h;
    const thigh = 88 * hs, shin = 86 * hs, torso = 135 * hs, up = 70 * hs, fore = 64 * hs, headR = 50 * s;
    const hipY = y - thigh - shin + pose.bob * s;
    ctx.save(); ctx.translate(x, 0);
    if (opt.spin !== undefined) ctx.scale(Math.cos(opt.spin * TAU) || 0.001, 1);
    if (opt.alpha !== undefined) ctx.globalAlpha = opt.alpha;
    if (opt.rot) { ctx.translate(0, y); ctx.rotate(opt.rot); ctx.translate(0, -y); }
    // shadow
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(0, y + 6 * s, 70 * s, 12 * s, 0, 0, TAU); ctx.fill();
    const lw = 26 * s;
    // back limbs
    limb(ctx, -6 * s * dir, hipY, dir, thigh, shin, pose.lB[0], pose.lB[1], lw, shade(c.bottom, 0.75));
    const shX = Math.sin(pose.lean) * torso * dir, shY = hipY - Math.cos(pose.lean) * torso;
    limb(ctx, shX - 8 * s * dir, shY + 14 * s, dir, up, fore, pose.aB[0], pose.aB[1], lw * 0.85, shade(c.skin, 0.8));
    // legs front
    const foot = limb(ctx, 6 * s * dir, hipY, dir, thigh, shin, pose.lF[0], pose.lF[1], lw, c.bottom);
    ctx.fillStyle = '#f5f5f5'; ctx.beginPath(); ctx.ellipse(foot[0] + 10 * s * dir, foot[1] + 4 * s, 22 * s, 11 * s, 0, 0, TAU); ctx.fill();
    // torso
    ctx.save(); ctx.translate(0, hipY); ctx.rotate(pose.lean * dir);
    ctx.fillStyle = c.top; const tw = 74 * hs;
    ctx.beginPath(); ctx.roundRect(-tw / 2, -torso - 6 * s, tw, torso + 18 * s, 26 * s); ctx.fill();
    if (c.skirt) { ctx.fillStyle = c.bottom; ctx.beginPath(); ctx.moveTo(-tw * 0.6, 12 * s); ctx.lineTo(tw * 0.6, 12 * s); ctx.lineTo(tw * 0.42, -28 * s); ctx.lineTo(-tw * 0.42, -28 * s); ctx.fill(); }
    if (c.chain) { ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.arc(0, -torso + 10 * s, 26 * s, 0.2, Math.PI - 0.2); ctx.stroke(); }
    if (who === 'hero') { ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.font = `${Math.round(34 * s)}px ${FONT_D}`; ctx.textAlign = 'center'; ctx.fillText('C', 0, -torso * 0.45); }
    ctx.restore();
    // head
    const hx = shX + Math.sin(pose.lean + pose.tilt) * (headR + 6 * s) * dir, hy = shY - Math.cos(pose.lean + pose.tilt) * (headR + 6 * s);
    if (c.pony) { const sw = Math.sin((opt.t || 0) * 8) * 0.5; ctx.strokeStyle = c.hair; ctx.lineWidth = 22 * s; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(hx - headR * 0.7 * dir, hy - headR * 0.5); ctx.quadraticCurveTo(hx - headR * (1.8 + sw) * dir, hy, hx - headR * (1.3 + sw) * dir, hy + headR * 1.4); ctx.stroke(); }
    ctx.fillStyle = c.skin; ctx.beginPath(); ctx.arc(hx, hy, headR, 0, TAU); ctx.fill();
    ctx.fillStyle = c.hair; ctx.beginPath(); ctx.arc(hx, hy, headR, Math.PI * 1.05, Math.PI * 1.95); ctx.closePath(); ctx.fill();
    if (c.cap) { ctx.fillStyle = c.cap; ctx.beginPath(); ctx.arc(hx, hy - 6 * s, headR * 1.02, Math.PI * 1.08, Math.PI * 1.92); ctx.closePath(); ctx.fill();
      ctx.fillRect(hx - headR * 1.25 * dir - (dir < 0 ? 0 : 0), hy - headR * 0.62, headR * 0.6 * dir, 10 * s); }
    faceDraw(ctx, hx, hy, headR, dir, face, c, opt.t || 0);
    // front arm (drawn last, over the torso)
    const hand = limb(ctx, shX + 8 * s * dir, shY + 14 * s, dir, up, fore, pose.aF[0], pose.aF[1], lw * 0.85, c.skin);
    ctx.restore();
    return { hand: [x + hand[0], hand[1]], head: [x + hx, hy], headR };
  }
  function faceDraw(ctx, x, y, r, dir, face, c, t) {
    const ex = x + r * 0.35 * dir, ey = y - r * 0.05, gap = r * 0.42;
    ctx.fillStyle = '#111'; ctx.strokeStyle = '#111'; ctx.lineWidth = r * 0.09; ctx.lineCap = 'round';
    if (face === 'heart') { heart(ctx, ex - gap / 2, ey, r * 0.2, '#ff2e63'); heart(ctx, ex + gap / 2, ey, r * 0.2, '#ff2e63'); }
    else if (face === 'laugh' || face === 'happy') { for (const k of [-1, 1]) { ctx.beginPath(); ctx.arc(ex + k * gap / 2, ey + r * 0.06, r * 0.12, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); } }
    else if (face === 'cool' || c.shades) { ctx.fillStyle = '#050505'; ctx.beginPath(); ctx.roundRect(ex - gap * 0.95, ey - r * 0.16, gap * 1.9, r * 0.3, r * 0.1); ctx.fill(); }
    else { for (const k of [-1, 1]) { ctx.beginPath(); ctx.arc(ex + k * gap / 2, ey, r * (face === 'shock' ? 0.12 : 0.08), 0, TAU); ctx.fill(); } }
    if (c.glasses && face !== 'cool') { ctx.lineWidth = r * 0.06; for (const k of [-1, 1]) { ctx.beginPath(); ctx.arc(ex + k * gap / 2, ey, r * 0.17, 0, TAU); ctx.stroke(); } }
    ctx.lineWidth = r * 0.09; const mx = x + r * 0.42 * dir, my = y + r * 0.42;
    ctx.beginPath();
    if (face === 'sad') { ctx.arc(mx, my + r * 0.12, r * 0.18, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
      ctx.fillStyle = '#7ec8ff'; ctx.beginPath(); ctx.ellipse(ex - gap / 2, ey + r * 0.25 + (t * 60 % 20), r * 0.06, r * 0.1, 0, 0, TAU); ctx.fill(); }
    else if (face === 'shock') { ctx.fillStyle = '#111'; ctx.ellipse(mx, my, r * 0.1, r * 0.14, 0, 0, TAU); ctx.fill(); }
    else if (face === 'laugh') { ctx.fillStyle = '#5a0d16'; ctx.arc(mx, my - r * 0.05, r * 0.2, 0, Math.PI); ctx.fill(); }
    else if (face === 'meh') { ctx.moveTo(mx - r * 0.14, my); ctx.lineTo(mx + r * 0.14, my); ctx.stroke(); }
    else { ctx.arc(mx, my - r * 0.08, r * 0.17, Math.PI * 0.15, Math.PI * 0.85); ctx.stroke(); }
  }

  // ---------- backgrounds ----------
  function sky(ctx, W, H, top, bot) { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
  function exterior(ctx, W, H, t, beat, k) {
    sky(ctx, W, H, '#0d0b2a', '#2a1446');
    const r = rng(3); ctx.fillStyle = '#fff'; for (let i = 0; i < 70; i++) { const x = r() * W, y = r() * H * 0.45, tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 2 + i)); ctx.globalAlpha = tw * 0.8; ctx.fillRect(x, y, 3, 3); } ctx.globalAlpha = 1;
    ctx.fillStyle = '#1b1530'; ctx.fillRect(80, 520, W - 160, 1000); // building
    ctx.fillStyle = '#120e22'; for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) ctx.fillRect(150 + i * 210, 600 + j * 170, 120, 100);
    const on = 0.65 + 0.35 * Math.abs(Math.sin(beat * Math.PI)); // neon flicker on beat
    ctx.save(); ctx.shadowColor = '#ff2e9a'; ctx.shadowBlur = 40 * on; ctx.fillStyle = `rgba(255,70,170,${on})`;
    ctx.font = `150px ${FONT_D}`; ctx.textAlign = 'center'; ctx.fillText('VELVET', W / 2, 520); ctx.restore();
    ctx.fillStyle = '#ff2e9a'; ctx.globalAlpha = 0.25 * on; ctx.fillRect(W / 2 - 110, 1150, 220, 370); ctx.globalAlpha = 1;
    ctx.fillStyle = '#05040c'; ctx.fillRect(W / 2 - 95, 1170, 190, 350);
    ctx.fillStyle = '#c9a227'; for (const px of [W / 2 - 260, W / 2 + 260]) ctx.fillRect(px - 8, 1380, 16, 140);
    ctx.strokeStyle = '#b5172f'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(W / 2 - 260, 1395); ctx.quadraticCurveTo(W / 2 - 160, 1450, W / 2 - 110, 1400); ctx.stroke();
    ctx.fillStyle = '#26223a'; ctx.fillRect(0, 1520, W, H - 1520);
  }
  function club(ctx, W, H, t, beat, A, opts) {
    opts = opts || {};
    const dark = opts.dark || 0;
    sky(ctx, W, H, '#14051f', '#2b0b3a');
    const bass = feat(A, 'bass', t);
    // sweeping beams
    if (dark < 0.9) { const cols = ['255,46,154', '0,229,255', '255,209,102', '155,93,229'];
      for (let i = 0; i < 4; i++) { const a = Math.sin(t * 0.9 + i * 1.7) * 0.5, x0 = 150 + i * 260;
        ctx.save(); ctx.translate(x0, 0); ctx.rotate(a); const g = ctx.createLinearGradient(0, 0, 0, 1500);
        g.addColorStop(0, `rgba(${cols[i]},${(0.35 + 0.35 * bass) * (1 - dark)})`); g.addColorStop(1, `rgba(${cols[i]},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(20, 0); ctx.lineTo(180, 1500); ctx.lineTo(-180, 1500); ctx.fill(); ctx.restore(); } }
    // disco ball
    ctx.save(); ctx.translate(W / 2, 170); ctx.fillStyle = '#bfc6d6'; ctx.beginPath(); ctx.arc(0, 0, 70, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#7d8597'; ctx.lineWidth = 3; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.ellipse(0, 0, Math.abs(Math.cos(t * 1.5 + i * 0.45)) * 70, 70, 0, 0, TAU); ctx.stroke(); }
    ctx.restore(); ctx.strokeStyle = '#7d8597'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, 100); ctx.stroke();
    // crowd silhouettes bobbing on the beat
    if (!opts.noCrowd) { const r = rng(11); for (let i = 0; i < 14; i++) { const x = r() * W, sc = 0.6 + r() * 0.3, ph = (beat + r()) % 1;
      const yb = 1290 - Math.abs(Math.sin(ph * Math.PI)) * 18 * (1 - dark); ctx.fillStyle = `rgba(10,4,18,${0.85})`;
      ctx.beginPath(); ctx.arc(x, yb - 230 * sc, 42 * sc, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.roundRect(x - 40 * sc, yb - 190 * sc, 80 * sc, 220 * sc, 30 * sc); ctx.fill();
      if (r() > 0.5 && dark < 0.5) { ctx.strokeStyle = 'rgba(10,4,18,.85)'; ctx.lineWidth = 22 * sc; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 30 * sc, yb - 170 * sc); ctx.lineTo(x + 70 * sc, yb - 300 * sc - Math.sin(ph * TAU) * 30 * sc); ctx.stroke(); } } }
    // light-up dance floor
    const bi = Math.floor(beat);
    for (let i = 0; i < 8; i++) for (let j = 0; j < 4; j++) {
      const lit = rng(bi * 131 + i * 7 + j * 3)() > 0.55 && dark < 0.5;
      const y0 = 1300 + j * 85, skew = (j * 85) * 0.35, x0 = -skew + i * (W + 2 * skew) / 8, w = (W + 2 * skew) / 8;
      const cols = ['#ff2e9a', '#00e5ff', '#ffd166', '#9b5de5'];
      ctx.fillStyle = lit ? cols[(i + j + bi) % 4] : '#1d0f2b'; ctx.globalAlpha = lit ? 0.55 + 0.3 * bass : 1;
      ctx.fillRect(x0 + 3, y0 + 3, w - 6, 79); ctx.globalAlpha = 1;
    }
    ctx.fillStyle = '#12081c'; ctx.fillRect(0, 1640, W, H - 1640);
    if (dark) { ctx.fillStyle = `rgba(0,0,0,${dark * 0.75})`; ctx.fillRect(0, 0, W, H); }
  }
  function stage(ctx, W, H, x, w, t, glow) {
    ctx.fillStyle = '#2e1a3f'; ctx.fillRect(x - w / 2, 1180, w, 70); ctx.fillStyle = '#4a2a63'; ctx.fillRect(x - w / 2, 1170, w, 16);
    const g = ctx.createLinearGradient(x, 0, x, 1180); g.addColorStop(0, `rgba(255,240,200,${0.05 * glow})`); g.addColorStop(1, `rgba(255,240,200,${0.4 * glow})`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 30, 0); ctx.lineTo(x + 30, 0); ctx.lineTo(x + w * 0.45, 1180); ctx.lineTo(x - w * 0.45, 1180); ctx.fill();
  }

  // ---------- props / fx ----------
  function floatingHearts(ctx, x, y, t, n, seed) { const r = rng(seed); for (let i = 0; i < n; i++) { const p = (t * 0.6 + r()) % 1; heart(ctx, x + Math.sin(p * 6 + i) * 60 + (r() - 0.5) * 140, y - p * 420, 16 + r() * 18, `rgba(255,46,99,${1 - p})`); } }
  function bouquet(ctx, x, y, s) { ctx.strokeStyle = '#2d6a4f'; ctx.lineWidth = 6 * s; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + i * 14 * s, y - 60 * s); ctx.stroke(); }
    const cols = ['#ff2e63', '#ffd166', '#f15bb5', '#ff8fab', '#ffffff']; for (let i = -2; i <= 2; i++) { ctx.fillStyle = cols[i + 2]; ctx.beginPath(); ctx.arc(x + i * 14 * s, y - 66 * s - Math.abs(i) * -4 * s, 15 * s, 0, TAU); ctx.fill(); } }
  function ringBox(ctx, x, y, s, open, t) { ctx.fillStyle = '#7b1e3a'; ctx.fillRect(x - 28 * s, y - 18 * s, 56 * s, 34 * s);
    ctx.save(); ctx.translate(x - 28 * s, y - 18 * s); ctx.rotate(-open * 1.9); ctx.fillStyle = '#9a2a4c'; ctx.fillRect(0, -16 * s, 56 * s, 16 * s); ctx.restore();
    if (open > 0.5) { ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.arc(x, y - 22 * s, 13 * s, 0, TAU); ctx.stroke();
      ctx.fillStyle = '#bff8ff'; ctx.beginPath(); ctx.moveTo(x, y - 48 * s); ctx.lineTo(x + 9 * s, y - 37 * s); ctx.lineTo(x, y - 30 * s); ctx.lineTo(x - 9 * s, y - 37 * s); ctx.fill();
      for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + t * 2; ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * 30 * s, y - 40 * s + Math.sin(a) * 30 * s); ctx.lineTo(x + Math.cos(a) * 42 * s, y - 40 * s + Math.sin(a) * 42 * s); ctx.stroke(); } } }
  function rainCloud(ctx, x, y, t) { ctx.fillStyle = '#5b5f73'; for (const [dx, dy, r] of [[-60, 0, 55], [0, -25, 70], [65, 0, 55], [0, 15, 60]]) { ctx.beginPath(); ctx.arc(x + dx, y + dy, r, 0, TAU); ctx.fill(); }
    ctx.strokeStyle = 'rgba(126,200,255,.8)'; ctx.lineWidth = 5; const r = rng(5); for (let i = 0; i < 14; i++) { const px = x - 90 + r() * 180, p = (t * 1.6 + r()) % 1; ctx.beginPath(); ctx.moveTo(px, y + 50 + p * 380); ctx.lineTo(px - 6, y + 80 + p * 380); ctx.stroke(); } }
  function confetti(ctx, W, H, t, n, seed) { const r = rng(seed), cols = ['#ff2e9a', '#00e5ff', '#ffd166', '#9b5de5', '#06d6a0']; for (let i = 0; i < n; i++) { const x = r() * W, sp = 180 + r() * 220, y = ((t * sp + r() * H) % (H + 100)) - 50, a = t * (2 + r() * 4) + i;
    ctx.save(); ctx.translate(x + Math.sin(t * 2 + i) * 30, y); ctx.rotate(a); ctx.fillStyle = cols[i % 5]; ctx.fillRect(-9, -5, 18, 10 * Math.abs(Math.cos(a))); ctx.restore(); } }
  function bubble(ctx, x, y, text, s) { ctx.font = `${Math.round(44 * s)}px ${FONT_B}`; const w = ctx.measureText(text).width + 50 * s, h = 76 * s;
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.roundRect(x - w / 2, y - h, w, h, 24 * s); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - 14 * s, y - 2); ctx.lineTo(x + 6 * s, y + 26 * s); ctx.lineTo(x + 18 * s, y - 2); ctx.fill();
    ctx.fillStyle = '#14051f'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y - h / 2 + 2); ctx.textBaseline = 'alphabetic'; }

  // ---------- story ----------
  // Scene boundaries (seconds) are tied to the song: one long hype run 0–65.1, a drop-out 65.1–69.2, final run 69.2–105.9.
  const SCENES = [
    { id: 'arrive', end: 8.6, cap: 'Friday night. The crew pulls up.' },
    { id: 'inside', end: 17.3, cap: 'Inside the Velvet.' },
    { id: 'spot',   end: 30.3, cap: 'Then he sees her.' },
    { id: 'dance',  end: 43.3, cap: 'He tries to impress her...' },
    { id: 'gifts',  end: 56.3, cap: 'He falls. Hard.' },
    { id: 'ring',   end: 65.1, cap: 'All in.' },
    { id: 'gone',   end: 69.2, cap: '' },
    { id: 'back',   end: 82.2, cap: 'The crew pulls him back.' },
    { id: 'star',   end: 99.5, cap: 'Now HE runs the floor.' },
    { id: 'end',    end: 999,  cap: '' },
  ];
  function sceneAt(t) { let s0 = 0; for (let i = 0; i < SCENES.length; i++) { if (t < SCENES[i].end) return { ...SCENES[i], i, start: s0, local: t - s0, len: SCENES[i].end - s0 }; s0 = SCENES[i].end; } }

  function drawFrame(ctx, W, H, t, A, L) {
    const bp = 60 / A.bpm, beatF = (t - A.t0) / bp, beat = Math.max(0, beatF);
    const half = beat / 2, ph = half % 1, hb = Math.floor(half); // body moves on the half-time (74 BPM) groove
    const ph2 = beat % 1, b2 = Math.floor(beat);
    const S = sceneAt(t), k = S.local, len = S.len, u = k / len;
    const kick = Math.exp(-((beat % 1) * bp) * 8);
    ctx.save(); ctx.setTransform(W / 1080, 0, 0, H / 1920, 0, 0);
    const GY = 1560; // ground line
    const opt = { t };

    switch (S.id) {
      case 'arrive': {
        exterior(ctx, 1080, 1920, t, beat, kick);
        const walkIn = ease(u / 0.75), wp = (t * 1.2) % 1;
        const xs = [lerp(-250, 380, walkIn), lerp(-420, 200, walkIn), lerp(-90, 560, walkIn)];
        const moving = walkIn < 1, pose = moving ? POSE.walk(wp) : POSE.bounce(ph);
        person(ctx, 'crew2', xs[1], GY, 0.9, 1, moving ? POSE.walk((wp + 0.3) % 1) : POSE.bounce((ph + 0.25) % 1), 'happy', opt);
        person(ctx, 'crew1', xs[2], GY, 0.9, moving ? 1 : -1, moving ? POSE.walk((wp + 0.6) % 1) : POSE.bounce((ph + 0.5) % 1), 'smile', opt);
        person(ctx, 'hero', xs[0], GY, 1, 1, pose, 'smile', opt);
        // title card
        const ta = clamp(k / 0.6, 0, 1) * clamp((len - k) / 0.8, 0, 1);
        ctx.save(); ctx.globalAlpha = ta; ctx.textAlign = 'center'; const sc = 1 + kick * 0.05; ctx.translate(540, 150); ctx.scale(sc, sc);
        ctx.font = `150px ${FONT_D}`; ctx.fillStyle = '#000'; ctx.fillText('CUFF NO', 6, 6); ctx.fillText('DANCER', 6, 156);
        ctx.fillStyle = '#ffd166'; ctx.fillText('CUFF NO', 0, 0); ctx.fillStyle = '#ff2e9a'; ctx.fillText('DANCER', 0, 150); ctx.restore();
        break;
      }
      case 'inside': {
        club(ctx, 1080, 1920, t, beat, A);
        person(ctx, 'crew1', 240, GY, 0.9, 1, POSE.pump(ph), 'happy', opt);
        person(ctx, 'crew2', 840, GY, 0.9, -1, POSE.twostep(ph2, b2), 'laugh', opt);
        const look = Math.sin(k * 1.4) > 0 ? 1 : -1;
        person(ctx, 'hero', 540, GY, 1, look, POSE.bounce(ph), 'smile', opt);
        break;
      }
      case 'spot': {
        club(ctx, 1080, 1920, t, beat, A, { dark: 0.25 * ease(k / 1.5) });
        const glow = ease(k / 1.2); stage(ctx, 1080, 1920, 760, 420, t, glow);
        person(ctx, 'dancer', 760, 1180, 0.82, -1, POSE.dancer(ph2, b2), 'happy', { t, spin: (b2 % 8 === 7) ? ph2 : undefined });
        const freeze = k > 2.2;
        const hp = freeze ? mix(POSE.bounce(ph), POSE.stand(), ease((k - 2.2) / 0.5)) : POSE.bounce(ph);
        const hr = person(ctx, 'hero', 300, GY, 1, 1, hp, freeze ? 'heart' : 'smile', opt);
        if (freeze) floatingHearts(ctx, hr.head[0], hr.head[1] - 40, t, 8, 21);
        person(ctx, 'crew1', 110, GY, 0.85, 1, POSE.bounce((ph + 0.3) % 1), 'smile', opt);
        if (k > 6) bubble(ctx, hr.head[0] + 40, hr.head[1] - 90, 'WHO is THAT?!', 1);
        break;
      }
      case 'dance': {
        club(ctx, 1080, 1920, t, beat, A);
        stage(ctx, 1080, 1920, 790, 380, t, 0.7);
        const laughing = k > 8.5;
        person(ctx, 'dancer', 790, 1180, 0.8, -1, laughing ? POSE.stand() : POSE.dancer(ph2, b2), laughing ? 'laugh' : 'happy', opt);
        // hero attempts moves, trips at 8.2s, gets up
        let hp = POSE.clumsy(ph2, b2), rot = 0, face = 'smile';
        if (k > 8.2 && k < 10.8) { const f = ease((k - 8.2) / 0.35); rot = -1.45 * f; hp = mix(POSE.clumsy(ph2, b2), POSE.stand(), f); face = 'shock'; }
        if (k >= 10.8) { hp = mix(POSE.stand(), POSE.bounce(ph), ease((k - 10.8) / 1)); face = 'meh'; rot = -1.45 * (1 - ease((k - 10.8) / 0.5)); }
        person(ctx, 'hero', 420, GY, 1, 1, hp, face, { t, rot });
        person(ctx, 'crew2', 150, GY, 0.85, 1, k > 8.4 ? POSE.facepalm() : POSE.bounce(ph), k > 8.4 ? 'meh' : 'happy', opt);
        if (k > 8.6 && k < 11) bubble(ctx, 820, 900, 'HAHA', 0.9);
        break;
      }
      case 'gifts': {
        club(ctx, 1080, 1920, t, beat, A);
        // three tries: flowers, drink, phone number; she spins away each time
        const tryLen = len / 3, ti = Math.min(2, Math.floor(k / tryLen)), tk = (k - ti * tryLen) / tryLen;
        const dx = 760 + ti * 0; const turned = tk > 0.55;
        person(ctx, 'dancer', dx, GY, 0.95, turned ? 1 : -1, POSE.dancer(ph2, b2), turned ? 'meh' : 'happy', { t, spin: tk > 0.5 && tk < 0.62 ? (tk - 0.5) / 0.12 * 0.5 : undefined });
        const hx = lerp(260, 470, ease(tk / 0.4));
        const hr = person(ctx, 'hero', hx, GY, 1, 1, tk < 0.4 ? POSE.walk((t * 1.2) % 1) : POSE.offer(ph), turned ? 'sad' : 'heart', opt);
        const hand = hr.hand;
        if (ti === 0) bouquet(ctx, hand[0] + 10, hand[1] + 10, 1.1);
        if (ti === 1) { ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(hand[0] - 18, hand[1] - 60, 36, 64); ctx.fillStyle = '#ff6b9a'; ctx.fillRect(hand[0] - 15, hand[1] - 34, 30, 36); }
        if (ti === 2) { ctx.fillStyle = '#fff'; ctx.save(); ctx.translate(hand[0], hand[1] - 30); ctx.rotate(-0.2); ctx.fillRect(-40, -26, 80, 52); ctx.fillStyle = '#14051f'; ctx.font = `20px ${FONT_B}`; ctx.textAlign = 'center'; ctx.fillText('CALL ME', 0, 8); ctx.restore(); }
        if (!turned) floatingHearts(ctx, hr.head[0], hr.head[1] - 40, t, 5, 40 + ti);
        if (turned) bubble(ctx, dx - 20, 760, ['nah', 'not tonight', 'lol no'][ti], 0.9);
        break;
      }
      case 'ring': {
        club(ctx, 1080, 1920, t, beat, A, { dark: 0.35 });
        stage(ctx, 1080, 1920, 540, 1000, t, 0.5 + 0.5 * ease(k / 2));
        person(ctx, 'dancer', 780, GY, 0.95, -1, k < 5 ? POSE.stand() : POSE.dancer(ph2, b2), k < 5 ? 'shock' : 'meh', opt);
        const hr = person(ctx, 'hero', 420, GY, 1, 1, mix(POSE.stand(), POSE.kneel(ph), ease(k / 1.5)), 'heart', opt);
        ringBox(ctx, hr.hand[0] + 10, hr.hand[1] + 6, 1.3, ease((k - 2) / 1), t);
        if (k > 2) floatingHearts(ctx, 600, 1200, t, 10, 77);
        person(ctx, 'crew1', 110, GY, 0.85, 1, POSE.facepalm(), 'meh', opt);
        if (k > 5) bubble(ctx, 780, 880, '...a RING??', 0.9);
        break;
      }
      case 'gone': {
        club(ctx, 1080, 1920, t, beat, A, { dark: 0.85, noCrowd: true });
        // spotlight on hero only
        const g = ctx.createRadialGradient(400, 1380, 20, 400, 1380, 420); g.addColorStop(0, 'rgba(160,170,210,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1920);
        const leave = ease(k / len);
        person(ctx, 'rival', lerp(820, 1300, leave), GY, 1, 1, POSE.walk((t * 1.1) % 1), 'cool', opt);
        person(ctx, 'dancer', lerp(700, 1180, leave), GY, 0.95, 1, POSE.walk((t * 1.1 + 0.5) % 1), 'happy', opt);
        person(ctx, 'hero', 400, GY, 1, 1, POSE.slump(ph), 'sad', opt);
        rainCloud(ctx, 420, 760, t);
        break;
      }
      case 'back': {
        club(ctx, 1080, 1920, t, beat, A, { dark: 0.6 * (1 - ease(k / 4)) });
        const pull = ease((k - 1) / 3);
        const hx = lerp(400, 540, pull);
        const hp = k < 1 ? POSE.slump(ph) : k < 5 ? POSE.pulled(ph) : mix(POSE.stand(), POSE.bounce(ph), ease((k - 5) / 1.5));
        person(ctx, 'crew1', lerp(1200, 760, ease(k / 1.2)), GY, 0.9, -1, k < 5 ? POSE.lead(ph) : POSE.pump(ph), 'happy', opt);
        person(ctx, 'crew2', lerp(-200, 260, ease(k / 1.2)), GY, 0.88, 1, k < 5 ? POSE.lead(ph) : POSE.twostep(ph2, b2), 'laugh', opt);
        person(ctx, 'hero', hx, GY, 1, 1, hp, k < 3 ? 'sad' : k < 6 ? 'meh' : 'smile', opt);
        if (k > 1 && k < 4.5) bubble(ctx, 760, 960, 'forget her, bro!', 0.9);
        if (k < 3) rainCloud(ctx, 420, lerp(760, 300, ease(k / 3)), t);
        break;
      }
      case 'star': {
        club(ctx, 1080, 1920, t, beat, A);
        const r = ctx.createRadialGradient(540, 1450, 30, 540, 1450, 520); r.addColorStop(0, `rgba(255,209,102,${0.25 + 0.25 * kick})`); r.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = r; ctx.fillRect(0, 0, 1080, 1920);
        // cheering ring of crowd + crew
        person(ctx, 'crew1', 170, GY - 60, 0.75, 1, POSE.cheer(ph2), 'laugh', opt);
        person(ctx, 'crew2', 910, GY - 60, 0.75, -1, POSE.cheer((ph2 + 0.5) % 1), 'laugh', opt);
        const late = k > 11;
        if (late) { const a = ease((k - 11) / 1.5); person(ctx, 'dancer', lerp(1250, 900, a), GY, 0.9, -1, POSE.stand(), 'shock', opt); }
        const spin = (b2 % 8 === 6 || b2 % 8 === 7) ? ((beat % 2) / 2) : undefined;
        const wag = late && k > 13;
        person(ctx, 'hero', 540, GY, 1.08, 1, wag ? POSE.wag(ph2) : POSE.hype(ph2, b2), wag ? 'cool' : 'laugh', { t, spin: wag ? undefined : spin });
        confetti(ctx, 1080, 1920, t, 60, 9);
        if (wag) bubble(ctx, 540, 860, 'nah, I\'m good', 1);
        break;
      }
      case 'end': {
        club(ctx, 1080, 1920, t, beat, A, { dark: 0.5 });
        person(ctx, 'crew2', 260, GY, 0.9, 1, POSE.bounce(ph), 'laugh', opt);
        person(ctx, 'crew1', 820, GY, 0.9, -1, POSE.bounce((ph + 0.5) % 1), 'happy', opt);
        person(ctx, 'hero', 540, GY, 1, 1, POSE.cheer(ph2), 'cool', opt);
        const a = ease(k / 0.8); ctx.save(); ctx.globalAlpha = a; ctx.textAlign = 'center'; ctx.translate(540, 520); const sc = 1 + kick * 0.05; ctx.scale(sc, sc);
        ctx.font = `190px ${FONT_D}`; ctx.fillStyle = '#000'; ctx.fillText('CUFF NO', 7, 7); ctx.fillText('DANCER', 7, 197);
        ctx.fillStyle = '#ffd166'; ctx.fillText('CUFF NO', 0, 0); ctx.fillStyle = '#ff2e9a'; ctx.fillText('DANCER', 0, 190); ctx.restore();
        break;
      }
    }

    // story caption (top) and lyric subtitle (bottom)
    if (S.cap) { const a = clamp(k / 0.4, 0, 1) * clamp((Math.min(len, 4.5) - k) / 0.5, 0, 1);
      if (a > 0) { ctx.save(); ctx.globalAlpha = a; ctx.font = `54px ${FONT_B}`; ctx.textAlign = 'center'; const w = ctx.measureText(S.cap).width + 60;
        ctx.fillStyle = 'rgba(10,4,18,.75)'; ctx.beginPath(); ctx.roundRect(540 - w / 2, S.id === 'arrive' ? 560 : 90, w, 84, 14); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.fillText(S.cap, 540, (S.id === 'arrive' ? 560 : 90) + 60); ctx.restore(); } }
    if (L && L.segments) lyricLine(ctx, t, L);

    // scene cut flash
    if (k < 0.18 && S.i > 0) { ctx.fillStyle = `rgba(0,0,0,${1 - k / 0.18})`; ctx.fillRect(0, 0, 1080, 1920); }
    ctx.restore();
  }

  function lyricLine(ctx, t, L) {
    const seg = L.segments.find(s => t >= s.start - 0.15 && t <= s.end + 0.3); if (!seg) return;
    const words = seg.words && seg.words.length ? seg.words : [{ w: seg.text, s: seg.start, e: seg.end }];
    ctx.save(); ctx.font = `58px ${FONT_B}`; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    // wrap into lines of max 900px
    const lines = [[]]; let lw = 0; const sp = ctx.measureText(' ').width;
    for (const w of words) { const ww = ctx.measureText(w.w).width; if (lw + ww > 900 && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push({ ...w, ww }); lw += ww + sp; }
    const y0 = 1760 - (lines.length - 1) * 72;
    lines.forEach((ln, li) => { const tw = ln.reduce((a, w) => a + w.ww + sp, -sp); let x = 540 - tw / 2; const y = y0 + li * 72;
      ctx.fillStyle = 'rgba(10,4,18,.7)'; ctx.fillRect(x - 20, y - 56, tw + 40, 74);
      for (const w of ln) { ctx.fillStyle = t >= w.s ? '#ffd166' : 'rgba(255,255,255,.75)'; ctx.fillText(w.w, x, y); x += w.ww + sp; } });
    ctx.restore();
  }

  root.CuffStory = { drawFrame, SCENES };
})(typeof window !== 'undefined' ? window : globalThis);
