// FVLGA — "CUFF NO DANCER" expressive collage visualizer (2D only).
// Layered, off-centre compositions; mixed type (gothic / chunky / VHS); chrome+drip lettering; boiling marker scribbles;
// per-cut pixel distortions (twirl / bulge / wave / slit-scan / mirror / xerox); hard beat cuts in a 16:9 strip.
(function (root) {
  const TAU = Math.PI * 2, clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, k) => a + (b - a) * k;
  const ease = x => { x = clamp(x, 0, 1); return 1 - Math.pow(1 - x, 3); };
  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const FS = 'CNSerif, serif', FK = 'CNSerifBlack, serif', FP = 'CNScript, cursive', FM = 'CNMarker, cursive', FD = 'CNDisplay, Impact, sans-serif', FB = 'CNBody, "Arial Narrow", sans-serif', FG = 'CNGoth, serif', FV = 'CNVcr, monospace';
  const ARTIST = 'FVLGA';
  const C = { acid: '#39ff14', sage: '#9bc48a', purple: '#a51cf0', pink: '#ff2fa8', yellow: '#ffe600', red: '#ff1a2a', blue: '#2a3cff', cyan: '#19f0ff', ink: '#050505', white: '#ffffff', grey: '#bdbdbd' };
  const MARKERS = [C.pink, C.yellow, C.acid, C.cyan, C.red, '#ffffff'];
  let A, out, o, SW, SH, SY, W, H, S, s, tmp, tctx, noiseC, noiseX, BOIL = 0, KICK = 0, G2, g2, LO, lo, PREV, pv;

  // ---------- cue sheet (transcript word timings) ----------
  const CUES = [
    [22.51, 'word', 'BANDS UP'], [24.97, 'word', 'HANDS UP'], [25.79, 'word', 'HANDS UP'], [26.55, 'adlib', 'HUH'],
    [35.59, 'adlib', 'UH'], [36.19, 'adlib', 'YAH'], [36.93, 'adlib', 'YAH'], [38.63, 'adlib', 'HUH'], [42.83, 'adlib', 'HUH'], [44.21, 'adlib', 'HUH'],
    [44.89, 'word', 'IN LOVE'], [45.27, 'word', 'BANDS'], [45.91, 'adlib', 'HUH'], [46.31, 'word', 'SPINNING'], [46.93, 'word', 'BLOCK'], [48.57, 'word', 'FAN'], [48.81, 'adlib', 'HUH'],
    [51.77, 'japan', 'JAPAN'], [52.65, 'japan', 'JAPAN'], [53.21, 'japan', 'JAPAN'], [58.51, 'adlib', 'HUH'],
    [63.41, 'word', 'CRIB'], [64.31, 'word', 'CONTRABAND'], [67.83, 'adlib', 'uh'],
    [91.54, 'word', 'HANDS UP'], [92.36, 'word', 'HANDS UP'], [93.16, 'adlib', 'HUH'],
  ];
  const CAPTIONS = [[20.1, 23.2, 'go and get yo bands up'], [23.2, 26.6, 'make him put his hands up'], [44.7, 46.0, 'in love with the bands'], [61.8, 65.0, "can't come up in my crib"]];
  const FX = ['twirl', 'bulge', 'wave', 'slit', 'mirror', 'xerox', 'none', 'wave', 'twirl', 'none'];

  let CUTS = [];
  function buildSchedule() {
    const bp = 60 / A.bpm, dur = A.duration, times = new Set([0, 2.4]);
    const fast = t => (t > 20 && t < 27.5) || (t > 69.2 && t < 101.5) || (t > 34.6 && t < 49.5);
    for (let b = 0; ; b++) { const t = A.t0 + b * bp; if (t > dur) break; if (t < 4.5) continue; if (fast(t) || b % 2 === 0) times.add(+t.toFixed(3)); }
    CUES.forEach(c => times.add(c[0])); [65.13, 69.17, 102.6].forEach(x => times.add(x));
    let list = [...times].filter(x => !(x > 65.13 && x < 69.17) && !(x > 102.6)).sort((a, b) => a - b);
    { const isCue = x => CUES.some(c => Math.abs(c[0] - x) < 0.01) || [2.4, 65.13, 69.17, 102.6].includes(x); const keep = [];
      for (const x of list) { const last = keep[keep.length - 1]; if (last === undefined || x - last > 0.18) keep.push(x); else if (isCue(x) && !isCue(last)) keep[keep.length - 1] = x; }
      list = keep; }
    const r = rng(9090), pool = ['film', 'gothic', 'filmmirror', 'psyche', 'film', 'filmflash', 'chrome', 'filmxerox', 'artist', 'filmblue', 'stack', 'filmprism', 'emboss', 'film', 'filmtext', 'burst', 'smear', 'filmmirror', 'psyche', 'film'];
    let prev = '';
    CUTS = list.map((t0, i) => {
      const t1 = i < list.length - 1 ? list[i + 1] : dur; let type, text = '';
      const cue = CUES.find(c => Math.abs(c[0] - t0) < 0.01);
      if (t0 < 2.3) type = 'filmtext'; else if (t0 < 4.6) type = 'artist';
      else if (Math.abs(t0 - 65.13) < 0.01) type = 'drop'; else if (Math.abs(t0 - 102.6) < 0.01) type = 'end';
      else if (cue) { type = cue[1]; text = cue[2]; } else if (Math.abs(t0 - 69.17) < 0.01) type = 'filmtext';
      else { do { type = pool[Math.floor(r() * pool.length)]; } while (type === prev); }
      prev = type;
      const TEXTY = ['chrome', 'artist', 'adlib', 'word', 'japan', 'stack', 'smear', 'filmtext'], SAFE = ['none', 'bulge', 'wave', 'none', 'xerox'];
      const FILMFX = { film: ['none', 'wave', 'none', 'bulge'], filmmirror: ['mirror'], filmflash: ['none'], filmxerox: ['xerox'], filmblue: ['none', 'wave'], filmprism: ['none', 'bulge'] };
      const fx = FILMFX[type] ? FILMFX[type][Math.floor(r() * FILMFX[type].length)] : (type === 'end' || type === 'drop') ? 'none' : type === 'psyche' ? (r() > 0.6 ? 'bulge' : 'none') : TEXTY.includes(type) ? SAFE[Math.floor(r() * SAFE.length)] : FX[Math.floor(r() * FX.length)];
      return { t0, t1, type, text, seed: Math.floor(r() * 1e6), bg: Math.floor(r() * 6), icon: Math.floor(r() * 8), k: r(), fx, rot: (r() - 0.5) * 0.5, clip: Math.floor(r() * 1000), clip2: Math.floor(r() * 1000), off: r() * 3 };
    });
  }
  function cutAt(t) { let lo = 0, hi = CUTS.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (CUTS[m].t0 <= t) lo = m; else hi = m - 1; } return CUTS[lo]; }

  // ---------- boiling helpers (hand-animated jitter, 12 fps) ----------
  const jit = (i, amt) => { const r = rng(BOIL * 977 + i * 131); return (r() - 0.5) * amt; };

  // ---------- clip-art ----------
  function strokeFill(pass, r, fill) { if (pass === 'white') { s.strokeStyle = '#fff'; s.lineWidth = r * 0.24; s.stroke(); } else if (pass === 'ink') { s.strokeStyle = C.ink; s.lineWidth = r * 0.09; s.stroke(); } else if (pass === 'flat') { s.fillStyle = fill; s.fill(); } else { s.fillStyle = fill; s.fill(); } }
  const ICONS = [
    function skull(r, p, f) { s.beginPath(); s.arc(0, -r * 0.15, r * 0.75, Math.PI * 0.85, Math.PI * 2.15); s.lineTo(r * 0.45, r * 0.55); s.lineTo(-r * 0.45, r * 0.55); s.closePath(); strokeFill(p, r, f || '#f2f2f2');
      if (p === 'fill') { s.fillStyle = C.ink; for (const k of [-1, 1]) { s.beginPath(); s.ellipse(k * r * 0.3, -r * 0.15, r * 0.2, r * 0.24, 0, 0, TAU); s.fill(); }
        s.beginPath(); s.moveTo(0, r * 0.08); s.lineTo(-r * 0.09, r * 0.25); s.lineTo(r * 0.09, r * 0.25); s.fill(); s.lineWidth = r * 0.05; s.strokeStyle = C.ink; for (let i = -2; i <= 2; i++) { s.beginPath(); s.moveTo(i * r * 0.14, r * 0.36); s.lineTo(i * r * 0.14, r * 0.55); s.stroke(); } } },
    function cuffs(r, p) { for (const k of [-1, 1]) { s.beginPath(); s.arc(k * r * 0.48, r * 0.12, r * 0.42, 0, TAU); s.arc(k * r * 0.48, r * 0.12, r * 0.26, 0, TAU, true); strokeFill(p, r, '#d4d8e2'); }
      if (p === 'fill') { s.strokeStyle = '#7d8290'; s.lineWidth = r * 0.07; for (let i = -1; i <= 1; i++) { s.beginPath(); s.ellipse(i * r * 0.16, -r * 0.42, r * 0.09, r * 0.06, 0, 0, TAU); s.stroke(); } } },
    function star(r, p, f) { s.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.42 : r; s.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } s.closePath(); strokeFill(p, r, f || C.pink); },
    function grin(r, p) { s.beginPath(); s.arc(0, 0, r, 0, TAU); strokeFill(p, r, '#fafafa');
      if (p === 'fill') { s.fillStyle = C.ink; for (const k of [-1, 1]) { s.beginPath(); s.ellipse(k * r * 0.35, -r * 0.25, r * 0.22, r * 0.3, k * 0.3, 0, TAU); s.fill(); s.fillStyle = C.red; s.beginPath(); s.arc(k * r * 0.33, -r * 0.2, r * 0.08, 0, TAU); s.fill(); s.fillStyle = C.ink; }
        s.beginPath(); s.moveTo(-r * 0.7, r * 0.15); s.quadraticCurveTo(0, r * 0.95, r * 0.7, r * 0.15); s.quadraticCurveTo(0, r * 0.45, -r * 0.7, r * 0.15); s.fill();
        s.fillStyle = '#fff'; for (let i = -3; i <= 3; i++) { s.beginPath(); s.moveTo(i * r * 0.17 - r * 0.07, r * 0.32); s.lineTo(i * r * 0.17 + r * 0.07, r * 0.32); s.lineTo(i * r * 0.17, r * 0.48); s.fill(); }
        s.strokeStyle = C.ink; s.lineWidth = r * 0.1; for (const k of [-1, 1]) { s.beginPath(); s.moveTo(k * r * 0.62, -r * 0.62); s.lineTo(k * r * 0.12, -r * 0.48); s.stroke(); } } },
    function money(r, p) { for (let i = 2; i >= 0; i--) { s.beginPath(); s.rect(-r + i * r * 0.1, -r * 0.45 - i * r * 0.18, r * 2, r * 0.9); strokeFill(p, r, i ? '#2d8a4e' : '#46c06e'); }
      if (p === 'fill') { s.fillStyle = '#d9f5df'; s.beginPath(); s.ellipse(0, 0, r * 0.3, r * 0.34, 0, 0, TAU); s.fill(); s.fillStyle = '#1f6b3a'; s.font = `${r * 0.55}px ${FD}`; s.textAlign = 'center'; s.textBaseline = 'middle'; s.fillText('$', 0, r * 0.03); } },
    function heart(r, p) { s.beginPath(); s.moveTo(0, r * 0.8); s.bezierCurveTo(-r * 1.6, -r * 0.2, -r * 0.7, -r * 1.3, 0, -r * 0.4); s.lineTo(-r * 0.15, -r * 0.05); s.lineTo(r * 0.12, r * 0.2); s.lineTo(-r * 0.05, r * 0.45); s.closePath(); strokeFill(p, r, C.red);
      s.beginPath(); s.moveTo(r * 0.08, r * 0.82); s.bezierCurveTo(r * 1.65, -r * 0.2, r * 0.75, -r * 1.3, r * 0.1, -r * 0.38); s.lineTo(-r * 0.05, -r * 0.03); s.lineTo(r * 0.22, r * 0.22); s.lineTo(r * 0.04, r * 0.47); s.closePath(); strokeFill(p, r, C.red); },
    function diamond(r, p) { s.beginPath(); s.moveTo(-r * 0.8, -r * 0.2); s.lineTo(-r * 0.45, -r * 0.65); s.lineTo(r * 0.45, -r * 0.65); s.lineTo(r * 0.8, -r * 0.2); s.lineTo(0, r * 0.85); s.closePath(); strokeFill(p, r, '#8fefff');
      if (p === 'fill') { s.strokeStyle = 'rgba(0,60,80,.6)'; s.lineWidth = r * 0.04; s.beginPath(); s.moveTo(-r * 0.8, -r * 0.2); s.lineTo(r * 0.8, -r * 0.2); s.moveTo(-r * 0.25, -r * 0.2); s.lineTo(0, r * 0.85); s.lineTo(r * 0.25, -r * 0.2); s.stroke(); } },
    function dancerSil(r, p) { s.beginPath(); s.arc(0, -r * 0.72, r * 0.2, 0, TAU); s.moveTo(-r * 0.12, -r * 0.5); s.lineTo(r * 0.12, -r * 0.5); s.lineTo(r * 0.3, 0); s.lineTo(r * 0.55, r * 0.95); s.lineTo(r * 0.35, r * 0.95); s.lineTo(0, r * 0.25); s.lineTo(-r * 0.2, r * 0.95); s.lineTo(-r * 0.4, r * 0.95); s.lineTo(-r * 0.25, 0);
      s.lineTo(-r * 0.75, -r * 0.95); s.lineTo(-r * 0.6, -r * 1.0); s.lineTo(-r * 0.1, -r * 0.4); s.closePath(); s.rect(r * 0.62, -r * 1.2, r * 0.08, r * 2.2); strokeFill(p, r, C.ink); },
  ];
  // sticker with boil jitter, drop shadow and an offset colour ghost
  function sticker(i, x, y, r, rot, opt) { opt = opt || {}; const id = (i * 7 + Math.round(x)) | 0;
    x += jit(id, r * 0.06); y += jit(id + 1, r * 0.06); rot = (rot || 0) + jit(id + 2, 0.08);
    s.save(); s.translate(x, y); s.rotate(rot); if (opt.flip) s.scale(-1, 1); s.lineJoin = 'round'; s.lineCap = 'round';
    if (opt.ghost) { s.save(); s.translate(r * 0.12, r * 0.08); s.globalAlpha = 0.85; ICONS[i](r, 'flat', opt.ghost); s.restore(); }
    s.save(); s.translate(r * 0.1, r * 0.14); s.globalAlpha = 0.45; ICONS[i](r, 'flat', '#000'); s.restore();
    ICONS[i](r, 'white'); ICONS[i](r, 'ink'); ICONS[i](r, 'fill'); s.restore(); }

  // marker scribbles that boil at 12 fps
  function scribble(seed, n, cols, wMul) { const r = rng(seed); for (let k = 0; k < n; k++) { const col = cols[Math.floor(r() * cols.length)], x0 = r() * SW, y0 = r() * SH, kind = Math.floor(r() * 4);
      s.save(); s.strokeStyle = col; s.lineWidth = (6 + r() * 10) * (wMul || 1); s.lineCap = 'round'; s.lineJoin = 'round'; s.beginPath();
      if (kind === 0) { for (let i = 0; i < 14; i++) { const a = i * 0.9; s.lineTo(x0 + Math.cos(a) * (30 + i * 4) + jit(seed + k * 50 + i, 10), y0 + Math.sin(a) * (24 + i * 3) + jit(seed + k * 50 + i + 99, 10)); } }
      else if (kind === 1) { for (let i = 0; i < 8; i++) s.lineTo(x0 + i * 26 + jit(seed + k * 40 + i, 8), y0 + (i % 2 ? -26 : 26) + jit(seed + k * 40 + i + 77, 8)); }
      else if (kind === 2) { const rr = 40 + r() * 50; s.ellipse(x0 + jit(seed + k, 6), y0 + jit(seed + k + 3, 6), rr, rr * 0.6, r() * 3, 0, TAU * 0.95); }
      else { s.moveTo(x0 - 30 + jit(k + seed, 6), y0 - 30); s.lineTo(x0 + 30, y0 + 30 + jit(k + seed + 5, 6)); s.moveTo(x0 + 30, y0 - 30); s.lineTo(x0 - 30 + jit(k + seed + 9, 6), y0 + 30); }
      s.stroke(); s.restore(); } }
  function sparkles(seed, n, col) { const r = rng(seed); for (let i = 0; i < n; i++) { const x = r() * SW, y = r() * SH, sz = 8 + r() * 22 + jit(i + seed, 6);
      s.save(); s.translate(x, y); s.rotate(BOIL * 0.3 + i); s.fillStyle = col || '#fff'; s.beginPath(); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, rr = k % 2 ? sz * 0.18 : sz; s.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } s.fill(); s.restore(); } }

  // thin line-art sigils (tribal sun, peace, barbed ring, spiky star), glowing
  function sigil(kind, x, y, r, rot, col) { s.save(); s.translate(x, y); s.rotate(rot); s.strokeStyle = col || 'rgba(230,230,230,.9)'; s.lineWidth = 3; s.shadowColor = col || '#fff'; s.shadowBlur = 10; s.lineCap = 'round';
    s.beginPath();
    if (kind === 0) { s.arc(0, 0, r * 0.4, 0, TAU); for (let i = 0; i < 12; i++) { const a = i * TAU / 12, a2 = a + 0.13; s.moveTo(Math.cos(a) * r * 0.45, Math.sin(a) * r * 0.45); s.quadraticCurveTo(Math.cos(a + 0.2) * r * 0.8, Math.sin(a + 0.2) * r * 0.8, Math.cos(a2) * r * (1 + jit(i, 0.08)), Math.sin(a2) * r * (1 + jit(i, 0.08))); } }
    else if (kind === 1) { s.arc(0, 0, r * 0.6, 0, TAU); s.moveTo(0, -r * 0.6); s.lineTo(0, r * 0.6); s.moveTo(0, 0); s.lineTo(-r * 0.42, r * 0.42); s.moveTo(0, 0); s.lineTo(r * 0.42, r * 0.42); }
    else if (kind === 2) { s.arc(0, 0, r * 0.8, 0, TAU); for (let i = 0; i < 18; i++) { const a = i * TAU / 18; s.moveTo(Math.cos(a) * r * 0.7, Math.sin(a) * r * 0.7); s.lineTo(Math.cos(a + 0.12) * r * 0.92, Math.sin(a + 0.12) * r * 0.92); s.moveTo(Math.cos(a) * r * 0.9, Math.sin(a) * r * 0.9); s.lineTo(Math.cos(a + 0.12) * r * 0.68, Math.sin(a + 0.12) * r * 0.68); } }
    else { for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, rr = i % 2 ? r * 0.25 : r * (i % 4 ? 0.7 : 1.05); s.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } s.closePath(); s.moveTo(r * 0.12, 0); s.arc(0, 0, r * 0.12, 0, TAU); }
    s.stroke(); s.restore(); }
  function graffiti(text, x, y, size, col, rot) { s.save(); s.translate(x + jit(91, 4), y + jit(92, 4)); s.rotate(rot); s.font = `${size}px ${FM}`; s.textAlign = 'center'; s.textBaseline = 'middle';
    s.shadowColor = col; s.shadowBlur = 24; s.fillStyle = col; s.fillText(text, 0, 0); s.shadowBlur = 0; s.globalAlpha = 0.6; s.fillStyle = '#fff'; s.fillText(text, -2, -2); s.restore(); }
  function flame(x, y, h, col) { s.fillStyle = col; s.beginPath(); s.moveTo(x - h * 0.25, y); s.bezierCurveTo(x - h * 0.35, y - h * 0.5, x - h * 0.05, y - h * 0.6, x + jit(Math.round(x), h * 0.1), y - h); s.bezierCurveTo(x + h * 0.15, y - h * 0.55, x + h * 0.4, y - h * 0.45, x + h * 0.25, y); s.closePath(); s.fill(); }
  function psycheTexture(t, seed, pal) { // dense skull + flame wallpaper, drawn into the strip
    bgEmboss(t, seed, pal.bg); const r = rng(seed);
    for (let i = 0; i < 26; i++) { const x = r() * SW, y = r() * SH, sz = SH * (0.06 + r() * 0.08);
      for (let k = 0; k < 4; k++) flame(x + (k - 1.5) * sz * 0.5, y + sz * 0.5, sz * (1.4 + jit(i * 9 + k, 0.4)), k % 2 ? pal.f1 : pal.f2);
      s.save(); s.translate(x, y); s.rotate((r() - 0.5) * 0.8); s.lineJoin = 'round'; ICONS[0](sz, 'ink'); ICONS[0](sz, 'fill', pal.skull); s.restore(); } }
  function radialKaleido(n, rot) { tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.clearRect(0, 0, SW, SH); tctx.drawImage(S, 0, 0); const R = Math.hypot(SW, SH) / 2, a = TAU / n;
    s.save(); s.fillStyle = '#000'; s.fillRect(0, 0, SW, SH); s.translate(SW / 2, SH / 2); s.rotate(rot);
    for (let i = 0; i < n; i++) { s.save(); s.rotate(i * a); if (i % 2) s.scale(1, -1); s.beginPath(); s.moveTo(0, 0); s.arc(0, 0, R, -a / 2 - 0.01, a / 2 + 0.01); s.closePath(); s.clip(); s.drawImage(tmp, -SW * 0.25, -SH * 0.5); s.restore(); } s.restore(); }
  function edgeGlow() { // neon "find edges": difference with a blurred copy, screened back on
    tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.filter = 'blur(3px)'; tctx.clearRect(0, 0, SW, SH); tctx.drawImage(S, 0, 0); tctx.filter = 'none';
    tctx.globalCompositeOperation = 'difference'; tctx.drawImage(S, 0, 0); tctx.globalCompositeOperation = 'source-over';
    s.save(); s.globalCompositeOperation = 'screen'; s.filter = 'brightness(3.5) saturate(2)'; s.drawImage(tmp, 0, 0); s.filter = 'none'; s.restore(); }
  function finish(cut, t, kick, lt) { // lo-fi video finishing: soften, bloom, zoom/vertical blur, trails
    lo.setTransform(1, 0, 0, 1, 0, 0); lo.imageSmoothingEnabled = true; lo.drawImage(S, 0, 0, LO.width, LO.height);
    s.save(); s.imageSmoothingEnabled = true; s.globalAlpha = 0.3; s.drawImage(LO, 0, 0, SW, SH); s.restore();
    g2.setTransform(1, 0, 0, 1, 0, 0); g2.filter = 'blur(14px) brightness(1.3)'; g2.clearRect(0, 0, SW, SH); g2.drawImage(S, 0, 0); g2.filter = 'none';
    s.save(); s.globalCompositeOperation = 'screen'; s.globalAlpha = 0.28 + 0.3 * kick; s.drawImage(G2, 0, 0); s.restore();
    const zb = lt < 0.1 ? 1 - lt / 0.1 : (kick > 0.6 && cut.k > 0.4 ? (kick - 0.6) * 1.5 : 0);
    if (zb > 0.02) { tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.clearRect(0, 0, SW, SH); tctx.drawImage(S, 0, 0); s.save();
      for (let i = 1; i <= 6; i++) { const z = 1 + i * 0.035 * zb; s.globalAlpha = 0.22; s.setTransform(z, 0, 0, z, SW / 2 * (1 - z), SH / 2 * (1 - z)); s.drawImage(tmp, 0, 0); } s.restore(); }
    if (cut.type === 'smear') { tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.clearRect(0, 0, SW, SH); tctx.drawImage(S, 0, 0); s.save();
      for (let i = 1; i <= 8; i++) { s.globalAlpha = 0.12; s.drawImage(tmp, 0, i * 9 * (0.5 + kick)); s.drawImage(tmp, 0, -i * 9 * (0.5 + kick)); } s.restore(); }
    s.save(); s.globalAlpha = (cut.type === 'psyche' || cut.type === 'smear') ? 0.4 : 0.18; s.drawImage(PREV, 0, 0); s.restore();
    pv.drawImage(S, 0, 0);
  }

  // ---------- footage (public-domain Prelinger films, pre-extracted at 15 fps) ----------
  let CLIPS = [], DREAMY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], CITY = [12, 13, 14, 15];
  const IMGS = new Map();
  function loadFrame(ci, f) { const c = CLIPS[ci], idx = 1 + (((f % c.n) + c.n) % c.n), key = ci + ':' + idx; if (IMGS.has(key)) return IMGS.get(key);
    const pr = new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = `${c.dir}/${String(idx).padStart(4, '0')}.jpg`; });
    IMGS.set(key, pr); if (IMGS.size > 120) IMGS.delete(IMGS.keys().next().value); return pr; }
  function cover(img, alpha, comp, filter) { const sc = Math.max(SW / img.width, SH / img.height), w = img.width * sc, h = img.height * sc; s.save(); s.globalAlpha = alpha === undefined ? 1 : alpha; if (comp) s.globalCompositeOperation = comp; if (filter) s.filter = filter; s.drawImage(img, (SW - w) / 2, (SH - h) / 2, w, h); s.restore(); }
  async function film(ci, time, mode, cut, ci2) {
    const f = Math.floor((time + (cut.off || 0)) * 15), img = await loadFrame(ci, f);
    if (mode === 'dream') { cover(img, 1, null, 'saturate(2.7) contrast(1.22) brightness(1.28)');
      lo.setTransform(1, 0, 0, 1, 0, 0); lo.filter = 'blur(2px) saturate(2)'; lo.drawImage(S, 0, 0, LO.width, LO.height); lo.filter = 'none';
      s.save(); s.globalCompositeOperation = 'screen'; s.globalAlpha = 0.55; s.drawImage(LO, 0, 0, SW, SH); s.restore();
      if (ci2 !== undefined) { const img2 = await loadFrame(ci2, f + 20); cover(img2, 0.42, 'screen', 'saturate(1.8)'); }
      const g = s.createLinearGradient(0, 0, SW, SH); g.addColorStop(0, 'rgba(255,80,160,.6)'); g.addColorStop(0.5, 'rgba(255,190,60,.45)'); g.addColorStop(1, 'rgba(110,70,255,.55)');
      s.save(); s.globalCompositeOperation = 'overlay'; s.fillStyle = g; s.fillRect(0, 0, SW, SH); s.restore(); }
    else if (mode === 'flash') { cover(img, 1, null, 'grayscale(1) contrast(2.6) brightness(1.55)'); }
    else if (mode === 'xerox') { cover(img, 1, null, 'grayscale(1) contrast(1.8)'); }
    else if (mode === 'blue') { cover(img, 1, null, 'grayscale(1) contrast(1.4) brightness(1.1)');
      s.save(); s.globalCompositeOperation = 'multiply'; const g = s.createLinearGradient(0, 0, 0, SH); g.addColorStop(0, '#5a6bff'); g.addColorStop(1, '#b45cff'); s.fillStyle = g; s.fillRect(0, 0, SW, SH);
      s.globalCompositeOperation = 'screen'; s.fillStyle = 'rgba(40,20,120,.35)'; s.fillRect(0, 0, SW, SH); s.restore();
      s.fillStyle = 'rgba(0,0,0,.25)'; for (let y = 0; y < SH; y += 4) s.fillRect(0, y, SW, 2); }
    else { cover(img, 1, null, mode === 'sepia' ? 'sepia(0.6) contrast(1.3)' : null); }
  }
  function serifCaption(text, x, y) { s.save(); s.font = `${Math.round(SH * 0.06)}px ${FS}`; s.letterSpacing = '4px'; s.fillStyle = 'rgba(255,255,255,.92)'; s.shadowColor = 'rgba(0,0,0,.6)'; s.shadowBlur = 6; s.textBaseline = 'alphabetic'; s.fillText(text, x, y); s.restore(); }
  function prism(t, amt) { s.save(); s.globalCompositeOperation = 'screen'; s.filter = 'blur(18px)'; s.globalAlpha = amt;
    const x0 = ((t * 260) % (SW * 1.6)) - SW * 0.3, g = s.createLinearGradient(x0, 0, x0 + SW * 0.5, SH);
    ['#ff0040', '#ff9a00', '#fff200', '#00ff6a', '#00c8ff', '#7a00ff', '#ff00c8'].forEach((c, i, a) => g.addColorStop(i / (a.length - 1), c));
    s.fillStyle = g; s.beginPath(); s.moveTo(x0, 0); s.lineTo(x0 + SW * 0.35, 0); s.lineTo(x0 + SW * 0.15, SH); s.lineTo(x0 - SW * 0.2, SH); s.fill(); s.restore(); }

  // ---------- backgrounds ----------
  function bgFlat(col) { s.fillStyle = col; s.fillRect(0, 0, SW, SH); }
  function bgBurst(t, c1, c2, cx, cy) { // spiral rays: each ray bends into a swirling arm; the twist breathes and lurches on kicks
    s.save(); s.translate(cx === undefined ? SW / 2 : cx, cy === undefined ? SH / 2 : cy); s.rotate(t * 0.6);
    const R = SW * 1.3, N = 28, ST = 22, tw = 2.4 + 1.2 * Math.sin(t * 0.9) + 0.8 * KICK;
    for (let i = 0; i < N; i++) { s.fillStyle = i % 2 ? c1 : c2; s.beginPath(); s.moveTo(0, 0);
      for (let k = 1; k <= ST; k++) { const r = R * k / ST, a = i * TAU / N + tw * Math.pow(r / R, 0.8); s.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
      for (let k = ST; k >= 1; k--) { const r = R * k / ST, a = (i + 1) * TAU / N + tw * Math.pow(r / R, 0.8); s.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
      s.closePath(); s.fill(); }
    s.restore(); }
  function bgEmboss(t, seed, palette) {
    const w = noiseC.width, h = noiseC.height, img = noiseX.createImageData(w, h), d = img.data, ph = seed * 0.001;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const v = Math.sin(x * 0.11 + Math.sin(y * 0.07 + t * 1.3 + ph) * 3) * Math.sin(y * 0.13 + Math.cos(x * 0.05 - t + ph) * 2.5) + Math.sin((x + y) * 0.04 + t * 2) * 0.5;
      const q = v > 0.55 ? 0 : v > 0.1 ? 1 : v > -0.4 ? 2 : 3, c = palette[q], i = (y * w + x) * 4; d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255; }
    noiseX.putImageData(img, 0, 0); s.imageSmoothingEnabled = false; s.drawImage(noiseC, 0, 0, SW, SH); s.imageSmoothingEnabled = true; }
  function bgHalftone(col, dot, t) { bgFlat('#f6f6f0'); s.fillStyle = col; const g = 18; for (let y = 0; y < SH + g; y += g) for (let x = 0; x < SW + g; x += g) { const v = 0.5 + 0.5 * Math.sin(x * 0.01 + t) * Math.cos(y * 0.013 - t * 0.7); s.beginPath(); s.arc(x + (y / g % 2) * g / 2, y, g * 0.5 * v * dot, 0, TAU); s.fill(); } }
  function bgTiles(t, icon, rot) { const n = 6, sz = SW / n; for (let y = -1; y < SH / sz + 1; y++) for (let x = -1; x < n + 1; x++) {
      s.save(); s.translate(x * sz + sz / 2 + ((t * 60) % sz) + (y % 2) * sz / 2, y * sz + sz / 2); s.rotate(rot ? t * 2 * (x % 2 ? 1 : -1) : 0); ICONS[icon](sz * 0.3, 'fill'); s.restore(); } }
  function bgStripes(c1, c2, t) { // wavy diagonal stripes that ripple and flow
    s.save(); s.translate(SW / 2, SH / 2); s.rotate(-0.5);
    for (let i = -30; i < 30; i++) { s.fillStyle = i % 2 ? c1 : c2; s.beginPath(); const x0 = i * 40 + ((t * 80) % 80);
      for (let y = -SW; y <= SW; y += 24) s.lineTo(x0 + 26 * Math.sin(y * 0.006 + t * 2.2 + i * 0.15), y);
      for (let y = SW; y >= -SW; y -= 24) s.lineTo(x0 + 40 + 26 * Math.sin(y * 0.006 + t * 2.2 + (i + 1) * 0.15), y);
      s.closePath(); s.fill(); }
    s.restore(); }

  // ---------- type ----------
  function chromeGrad(y0, y1) { const g = s.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#ffffff'); g.addColorStop(0.38, '#d8dde6'); g.addColorStop(0.5, '#3a3f4a'); g.addColorStop(0.56, '#9aa2b4'); g.addColorStop(0.8, '#ffffff'); g.addColorStop(1, '#6d7486'); return g; }
  function word(text, x, y, size, font, opt) { opt = opt || {}; s.save(); s.font = `${size}px ${font}`; s.textAlign = 'center'; s.textBaseline = 'middle';
    const w = s.measureText(text).width, sx = opt.maxW ? Math.min(opt.maxW / w, opt.stretch || 1.8) : (opt.stretch || 1);
    s.translate(x, y); s.rotate(opt.rot || 0); s.transform(1, 0, opt.skew || 0, 1, 0, 0); s.scale(sx, opt.sy || 1); s.lineJoin = 'round';
    if (opt.echo) for (let i = opt.echo; i > 0; i--) { s.save(); s.scale(1 + i * 0.07, 1 + i * 0.07); s.lineWidth = size * 0.035; s.strokeStyle = opt.echoCol || '#fff'; s.globalAlpha = 0.7 - i * 0.12; s.strokeText(text, 0, 0); s.restore(); }
    if (opt.extrude) for (let i = opt.extrude; i > 0; i--) { s.fillStyle = opt.extrudeCol || C.ink; s.fillText(text, i * 2.2, i * 2.6); }
    s.lineWidth = size * (opt.thick || 0.12); s.strokeStyle = opt.stroke || C.ink; s.strokeText(text, 0, 0);
    s.fillStyle = opt.chrome ? chromeGrad(-size * 0.5, size * 0.5) : (opt.fill || '#fff'); if (!opt.outline) s.fillText(text, 0, 0);
    if (opt.drips) { const r = rng(opt.drips), half = w / 2; s.fillStyle = opt.dripCol || (opt.chrome ? '#cfd5e0' : opt.fill); for (let i = 0; i < 9; i++) { const dx = -half + r() * w, len = size * (0.2 + r() * 0.5) * (0.7 + 0.3 * Math.sin(BOIL * 0.4 + i));
        s.beginPath(); s.moveTo(dx - 6, size * 0.3); s.lineTo(dx - 4, size * 0.3 + len); s.arc(dx, size * 0.3 + len, 6, Math.PI, 0, true); s.lineTo(dx + 6, size * 0.3); s.fill(); } }
    s.restore(); return w * sx; }
  function liquid(text, t, amp, fg, bg, font) {
    tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.clearRect(0, 0, SW, SH); tctx.fillStyle = bg; tctx.fillRect(0, 0, SW, SH); tctx.font = `${SH * 0.8}px ${font || FK}`; tctx.textAlign = 'center'; tctx.textBaseline = 'middle';
    const w = tctx.measureText(text).width; tctx.save(); tctx.translate(SW / 2, SH / 2 + SH * 0.05); tctx.scale(Math.min((SW * 0.98) / w, 1.5), 1.2);
    tctx.lineWidth = SH * 0.05; tctx.strokeStyle = fg === '#fff' ? '#000' : '#fff'; tctx.strokeText(text, 0, 0); tctx.fillStyle = fg; tctx.fillText(text, 0, 0); tctx.restore();
    const sl = 6; for (let x = 0; x < SW; x += sl) { const dy = Math.sin(x * 0.012 + t * 7) * amp + Math.sin(x * 0.031 - t * 5) * amp * 0.4; s.drawImage(tmp, x, 0, sl, SH, x, dy, sl, SH); } }
  function caption(text) { s.save(); s.font = `${Math.round(SH * 0.085)}px ${FS}`; s.textAlign = 'center'; s.textBaseline = 'middle'; s.lineJoin = 'round'; s.letterSpacing = '1px';
    s.shadowColor = 'rgba(255,60,170,.8)'; s.shadowBlur = 14; s.lineWidth = 5; s.strokeStyle = C.ink; s.strokeText(text, SW / 2, SH * 0.88); s.fillStyle = '#fff'; s.fillText(text, SW / 2, SH * 0.88); s.restore(); }
  function ticker(text, y, size, col, speed, t) { s.save(); s.font = `${size}px ${FS}`; s.letterSpacing = '3px'; s.fillStyle = col; s.textBaseline = 'middle'; const w = s.measureText(text + '   ').width, off = -((t * speed) % w);
    for (let x = off; x < SW; x += w) s.fillText(text + '   ', x, y); s.restore(); }

  // ---------- pixel distortion + grade (post) ----------
  function post(cut, t, kick, lt) {
    const img = s.getImageData(0, 0, SW, SH), d = img.data, src = new Uint8ClampedArray(d), fx = cut.fx, cx = SW / 2, cy = SH / 2;
    const shift = Math.round(4 + kick * 20 + (lt < 0.07 ? 26 : 0)), r = rng(Math.floor(t * 30) * 13 + 1);
    const strength = 0.6 + 0.8 * kick, tw = (cut.k - 0.5) * 3.2 * strength, rad = SH * 0.75;
    const isFilm = cut.type.startsWith('film') || cut.type === 'drop' || cut.type === 'end'; const xerox = fx === 'xerox', inv = !isFilm && (cut.k > 0.86 || (lt < 0.05 && cut.k > 0.55)), post4 = !isFilm && cut.k < 0.3;
    const sample = (sx, sy) => { sx = clamp(sx | 0, 0, SW - 1); sy = clamp(sy | 0, 0, SH - 1); return (sy * SW + sx) * 4; };
    for (let y = 0; y < SH; y++) { const tear = r() < 0.003 + kick * 0.02 ? (r() - 0.5) * 90 : 0, scan = y % 3 === 0 ? 0.82 : 1;
      for (let x = 0; x < SW; x++) { let sx = x + tear, sy = y;
        if (fx === 'twirl' || fx === 'bulge') { const dx = x - cx, dy = y - cy, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < rad) { const f = 1 - dist / rad; if (fx === 'twirl') { const a = Math.atan2(dy, dx) + tw * f * f, rr = dist; sx = cx + Math.cos(a) * rr + tear; sy = cy + Math.sin(a) * rr; }
            else { const k = 1 - 0.45 * strength * f * f; sx = cx + dx * k + tear; sy = cy + dy * k; } } }
        else if (fx === 'wave') { sx += Math.sin(y * 0.03 + t * 9) * 22 * strength; sy += Math.sin(x * 0.02 + t * 6) * 10 * strength; }
        else if (fx === 'slit') { if (x > SW * (0.55 + 0.2 * Math.sin(t * 2))) sx = SW * (0.55 + 0.2 * Math.sin(t * 2)); }
        else if (fx === 'mirror') { if (x > cx) sx = SW - x; }
        const i = (y * SW + x) * 4, ci = sample(sx, sy), ri = sample(sx + shift, sy), bi = sample(sx - shift, sy);
        let R = src[ri], G = src[ci + 1], B = src[bi + 2];
        if (xerox) { const l = 0.3 * R + 0.59 * G + 0.11 * B + (r() - 0.5) * 70; const v = l > 128 ? 245 : 15; R = G = B = v; }
        else if (post4) { R = (R >> 6) * 85; G = (G >> 6) * 85; B = (B >> 6) * 85; }
        if (inv) { R = 255 - R; G = 255 - G; B = 255 - B; }
        const n = (r() - 0.5) * 30; d[i] = (R + n) * scan; d[i + 1] = (G + n) * scan; d[i + 2] = (B + n) * scan; } }
    s.putImageData(img, 0, 0);
  }

  // ---------- cards ----------
  async function render(t) {
    const bp = 60 / A.bpm, beat = Math.max(0, (t - A.t0) / bp), kick = Math.exp(-((beat % 1) * bp) * 9), cut = cutAt(t), lt = t - cut.t0, r = rng(cut.seed); KICK = kick;
    BOIL = Math.floor(t * 12);
    o.setTransform(1, 0, 0, 1, 0, 0); o.fillStyle = C.ink; o.fillRect(0, 0, W, H);
    s.setTransform(1, 0, 0, 1, 0, 0); s.globalAlpha = 1; s.globalCompositeOperation = 'source-over';
    const BG = [C.acid, C.sage, C.purple, C.pink, C.ink, C.blue], pick = a => a[Math.floor(r() * a.length)];
    switch (cut.type) {
      case 'chrome': { // liquid-chrome gothic title over stripes, echoes, drips, scribbles
        if (cut.t0 < 1) bgFlat(C.sage); else bgStripes(C.ink, '#1d1d1d', t);
        sparkles(cut.seed, 14, '#fff');
        word('cuff no', SW * 0.45, SH * 0.32, SH * 0.42, FG, { chrome: true, echo: 3, echoCol: C.acid, rot: -0.06 + jit(1, 0.02), drips: cut.seed, stroke: C.ink, thick: 0.06 });
        word('dancer', SW * 0.56, SH * 0.68, SH * 0.46, FG, { chrome: true, echo: 3, echoCol: C.pink, rot: 0.04 + jit(2, 0.02), drips: cut.seed + 1, stroke: C.ink, thick: 0.06 });
        word('Fvlga', SW * 0.84, SH * 0.13, SH * 0.17, FP, { fill: '#fff', stroke: C.ink, thick: 0.04, rot: -0.06 });
        scribble(cut.seed, 3, [C.acid, C.pink], 1); sigil(0, SW * 0.12, SH * 0.78, SH * 0.2, t * 0.5, 'rgba(255,255,255,.8)'); break; }
      case 'artist': { // FVLGA stacked echoes, giant + cropped, mixed type
        bgFlat(cut.bg % 2 ? C.acid : C.purple); bgTiles(t, 2, true); s.fillStyle = 'rgba(0,0,0,.25)'; s.fillRect(0, 0, SW, SH);
        for (let i = 3; i >= 0; i--) if (i < 3) word('Fvlga', SW / 2 + i * 22 * Math.sin(t * 2 + i), SH * 0.42 - i * 10, SH * 0.6 * (1 + i * 0.06), FS, { outline: i > 0, stroke: i ? [C.pink, C.acid][i - 1] : C.ink, thick: i ? 0.012 : 0.025, fill: '#fff', rot: -0.05 });
        word('cuff no dancer', SW * 0.64, SH * 0.84, SH * 0.22, FP, { fill: '#fff', rot: -0.06, stroke: '#ff3fb8', thick: 0.09 });
        sigil(2, SW * 0.5, SH * 0.5, SH * 0.48, -t * 0.3, 'rgba(255,255,255,.55)'); break; }
      case 'adlib': { // huge, cropped off the frame, burst behind, echoes
        bgBurst(t * 2, cut.bg % 2 ? C.acid : C.yellow, cut.bg % 2 ? '#0a3a00' : C.pink, SW * (0.3 + cut.k * 0.4), SH * 0.5);
        word(cut.text.toLowerCase(), SW / 2 + jit(3, 30), SH * 0.52, SH * 0.95, FG, { chrome: true, echo: 3, echoCol: C.pink, drips: cut.seed, stroke: C.ink, thick: 0.05, rot: cut.rot * 0.6, maxW: SW * 0.95 });
        scribble(cut.seed, 4, [C.ink, C.red], 1.3); break; }
      case 'word': { // liquid lyric word + gothic overlay + ticker
        liquid(cut.text, t, 16 + kick * 30, cut.bg % 2 ? '#fff' : C.ink, cut.bg % 2 ? C.ink : '#f2f2f2');
        ticker(cut.text.toLowerCase() + ' * fvlga * ', SH * 0.08, SH * 0.07, cut.bg % 2 ? C.acid : C.red, 400, t);
        word(cut.text.toLowerCase(), SW * 0.72, SH * 0.82, SH * 0.2, FG, { fill: cut.bg % 2 ? C.pink : C.red, rot: -0.15, stroke: cut.bg % 2 ? C.ink : '#fff', thick: 0.05 }); break; }
      case 'japan': { bgBurst(t, C.red, '#fff');
        word('Japan', SW / 2, SH / 2, SH * 0.62, FK, { fill: '#fff', extrude: 5, echo: 3, echoCol: C.red, rot: cut.rot * 0.6, maxW: SW * 0.85, stretch: 1.6 });
        word('tokyo', SW * 0.82, SH * 0.2, SH * 0.2, FG, { fill: C.ink, stroke: '#fff', thick: 0.1 });
        sigil(3, SW * 0.12, SH * 0.78, SH * 0.14, t, '#fff'); break; }
      case 'collage': { // cut-out collage: 5-6 overlapping stickers, off-centre hero icon, scribbles, gothic stamp
        bgFlat(BG[cut.bg]); if (cut.k > 0.5) bgHalftone(pick([C.pink, C.blue, C.ink]), 1, t);
        for (let i = 0; i < 5; i++) sticker(Math.floor(r() * 8), r() * SW, r() * SH, SH * (0.1 + r() * 0.14), r() * 6, { ghost: r() > 0.5 ? pick(MARKERS) : null, flip: r() > 0.5 });
        sticker(cut.icon, SW * (0.3 + cut.k * 0.4), SH * 0.52, SH * 0.42 * (1 + kick * 0.12), cut.rot, { ghost: pick([C.cyan, C.pink, C.acid]) });
        scribble(cut.seed, 4, MARKERS, 1); if (cut.k > 0.5) sigil(3, SW * 0.85, SH * 0.25, SH * 0.18, t, 'rgba(255,255,255,.85)');
        word(pick(['cuff no dancer', 'fvlga', 'no dancer', 'bands']), SW * (0.2 + r() * 0.6), SH * (0.15 + r() * 0.7), SH * 0.2, FG, { fill: pick([C.yellow, '#fff', C.acid]), rot: (r() - 0.5) * 0.6, stroke: C.ink, thick: 0.06 }); break; }
      case 'gothic': { // gothic word art, repeated echo rings, burst
        bgFlat(C.ink); bgBurst(t * 0.4, '#141414', '#000');
        const wd = pick(['fvlga', 'cuff', 'dancer', 'bandz']);
        for (let i = 0; i < 6; i++) word(wd, SW / 2, SH * 0.52, SH * (0.25 + i * 0.12), FG, { outline: true, stroke: i % 2 ? C.acid : C.pink, thick: 0.02, rot: Math.sin(t + i) * 0.05 });
        word(wd, SW / 2, SH * 0.52, SH * 0.55, FG, { chrome: true, stroke: C.ink, thick: 0.05, drips: cut.seed });
        sparkles(cut.seed, 10, C.acid); graffiti('fvlga', SW * 0.82, SH * 0.82, SH * 0.13, C.red, -0.1); break; }
      case 'pattern': { bgFlat(C.ink); bgTiles(t, cut.icon % 2 ? 0 : 1, true);
        sticker(3, SW * (0.25 + cut.k * 0.5), SH * 0.55, SH * 0.5 * (1 + kick * 0.15), Math.sin(t * 4) * 0.15, { ghost: C.red });
        word('Fvlga', SW * 0.5, SH * 0.13, SH * 0.18, FP, { fill: C.acid, stroke: C.ink, thick: 0.04 }); break; }
      case 'emboss': bgEmboss(t, cut.seed, cut.bg % 2 ? [[255, 255, 255], [70, 110, 255], [20, 30, 160], [5, 5, 30]] : [[255, 255, 255], [255, 70, 190], [120, 20, 160], [10, 0, 20]]);
        word(['fvlga', 'cuff', 'dancer'][cut.bg % 3], SW * (0.35 + cut.k * 0.3), SH * 0.5, SH * 0.5, FG, { chrome: true, stroke: C.ink, thick: 0.05, rot: cut.rot * 0.4 }); sigil(cut.bg % 4, SW * 0.5, SH * 0.5, SH * 0.45, t * 0.3, 'rgba(255,255,255,.5)');
        ticker('CUFF NO DANCER  FVLGA', SH * 0.93, SH * 0.07, '#fff', 300, t); scribble(cut.seed, 2, ['#fff'], 0.8); break;
      case 'burst': bgBurst(t, C.pink, '#ffd1ef', SW * 0.3, SH * 0.6);
        sigil(0, SW * 0.3, SH * 0.6, SH * 0.45 * (1 + kick * 0.1), t * 0.6, '#fff'); word('fvlga', SW * 0.3, SH * 0.6, SH * 0.26, FG, { chrome: true, stroke: C.ink, thick: 0.05 });
        word('cuff no', SW * 0.75, SH * 0.35, SH * 0.2, FG, { fill: C.ink, stroke: '#fff', thick: 0.06, rot: 0.1 }); word('dancer', SW * 0.75, SH * 0.6, SH * 0.2, FG, { fill: C.red, stroke: '#fff', thick: 0.06, rot: 0.1 });
        sparkles(cut.seed, 12, '#fff'); break;
      case 'kaleido': { bgEmboss(t, cut.seed, [[255, 255, 255], [57, 255, 20], [20, 120, 10], [5, 10, 5]]); sticker(cut.icon, SW * 0.28, SH * 0.3, SH * 0.25, t, { ghost: C.pink });
        word('fvlga', SW * 0.2, SH * 0.15, SH * 0.14, FG, { fill: '#fff' });
        const half = s.getImageData(0, 0, SW / 2, SH / 2); tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.clearRect(0, 0, SW, SH); tctx.putImageData(half, 0, 0);
        s.save(); for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) { s.setTransform(sx, 0, 0, sy, sx < 0 ? SW : 0, sy < 0 ? SH : 0); s.drawImage(tmp, 0, 0, SW / 2, SH / 2, 0, 0, SW / 2, SH / 2); } s.restore();
        break; }
      case 'stack': { bgFlat(cut.bg % 2 ? C.ink : C.purple); bgTiles(t, 0, false); s.fillStyle = 'rgba(0,0,0,.55)'; s.fillRect(0, 0, SW, SH);
        const fonts = [FS, FP, FS], cols = ['#fff', '#fff', '#fff'];
        ['Cuff', 'no', 'Dancer'].forEach((w, i) => { if (lt > i * 0.08) word(w, SW * (0.38 + i * 0.12), SH * (0.24 + i * 0.27), SH * (i === 1 ? 0.5 : 0.34), fonts[i], { fill: cols[i], stroke: i === 1 ? '#ff3fb8' : C.ink, thick: i === 1 ? 0.09 : 0.03, rot: -0.06, chrome: i === 2 }); });
        sigil(0, SW * 0.12, SH * 0.75, SH * 0.2, t * 0.5, 'rgba(255,255,255,.8)'); break; }
      case 'xeroxface': { bgHalftone(C.ink, 1.1, t); sticker(3, SW * 0.5, SH * 0.5, SH * 0.48 * (1 + kick * 0.15), cut.rot);
        word('no', SW * 0.15, SH * 0.3, SH * 0.4, FP, { fill: C.red, extrude: 5, rot: -0.2 }); word('Dancer', SW * 0.8, SH * 0.75, SH * 0.25, FK, { fill: C.red, extrude: 5, rot: 0.15, maxW: SW * 0.35 });
        scribble(cut.seed, 3, [C.red], 1.2); cut.fx = 'xerox'; break; }
      case 'ticker': { bgFlat(C.ink); for (let i = 0; i < 7; i++) ticker(i % 2 ? 'FVLGA FVLGA FVLGA' : 'CUFF NO DANCER', SH * (0.08 + i * 0.14), SH * 0.13, i % 3 === 0 ? C.acid : i % 3 === 1 ? '#fff' : C.pink, (i % 2 ? -1 : 1) * (300 + i * 60), t);
        sticker(cut.icon, SW / 2, SH / 2, SH * 0.36 * (1 + kick * 0.15), cut.rot, { ghost: C.acid }); break; }
      case 'film': { const a = DREAMY[cut.clip % DREAMY.length], b = DREAMY[cut.clip2 % DREAMY.length]; await film(a, lt, 'dream', cut, b !== a && cut.k > 0.4 ? b : undefined);
        serifCaption('CUFF NO DANCER', SW * 0.035, SH * 0.94); break; }
      case 'filmmirror': { await film(DREAMY[cut.clip % DREAMY.length], lt, 'dream', cut); sigil(cut.bg % 4, SW / 2, SH / 2, SH * 0.3 * (1 + 0.1 * kick), t * 0.4, 'rgba(255,255,255,.9)');
        word('fvlga', SW / 2, SH / 2, SH * 0.13, FG, { fill: '#fff', stroke: C.ink, thick: 0.05 }); break; }
      case 'filmflash': { await film(DREAMY[cut.clip % DREAMY.length], lt, 'flash', cut); if (lt < 0.07) { s.fillStyle = '#fff'; s.fillRect(0, 0, SW, SH); } break; }
      case 'filmxerox': { await film((cut.k > 0.5 ? CITY : DREAMY)[cut.clip % (cut.k > 0.5 ? CITY.length : DREAMY.length)], lt, 'xerox', cut);
        scribble(cut.seed, 1, [C.ink], 1.4); s.save(); s.strokeStyle = C.ink; s.lineWidth = 9; s.lineCap = 'round'; const x = SW * (0.3 + cut.k * 0.4), y = SH * 0.35;
        s.beginPath(); s.moveTo(x - 40 + jit(1, 6), y - 50); s.lineTo(x + 40, y + 50 + jit(2, 6)); s.moveTo(x + 45, y - 45); s.lineTo(x - 45 + jit(3, 6), y + 45); s.stroke(); s.restore();
        word('Fvlga', SW * 0.88, SH * 0.1, SH * 0.12, FP, { fill: C.ink, stroke: '#fff', thick: 0.05 }); break; }
      case 'filmblue': { await film([12, 13, 14, 15, 7, 8, 5, 3][cut.clip % 8], lt, 'blue', cut);
        s.save(); s.translate(SW * 0.04, SH * 0.06); s.rotate(Math.PI / 2); s.font = `${Math.round(SH * 0.07)}px ${FS}`; s.letterSpacing = '5px'; s.fillStyle = 'rgba(255,255,255,.85)'; s.fillText('cuff no dancer', 0, 0); s.restore();
        s.save(); s.font = `${Math.round(SH * 0.11)}px ${FP}`; s.fillStyle = 'rgba(255,255,255,.9)'; s.textAlign = 'right'; s.fillText('Fvlga', SW * 0.96, SH * 0.13); s.restore(); break; }
      case 'filmprism': { await film(DREAMY[cut.clip % DREAMY.length], lt, 'dream', cut); prism(t, 0.6 + 0.3 * kick); prism(t + 2.3, 0.4);
        serifCaption('fvlga', SW * 0.035, SH * 0.94); break; }
      case 'filmtext': { await film(cut.t0 < 1 ? 0 : DREAMY[cut.clip % DREAMY.length], lt, 'dream', cut); s.fillStyle = 'rgba(0,0,0,.25)'; s.fillRect(0, 0, SW, SH);
        word('cuff no', SW * 0.46, SH * 0.34, SH * 0.36, FG, { chrome: true, echo: 2, echoCol: 'rgba(255,255,255,.6)', rot: -0.05 + jit(1, 0.015), drips: cut.seed, stroke: C.ink, thick: 0.06 });
        word('dancer', SW * 0.55, SH * 0.68, SH * 0.4, FG, { chrome: true, echo: 2, echoCol: 'rgba(255,255,255,.6)', rot: 0.04 + jit(2, 0.015), drips: cut.seed + 1, stroke: C.ink, thick: 0.06 });
        serifCaption('FVLGA', SW * 0.035, SH * 0.94); break; }
      case 'psyche': { // dense skull/flame wallpaper -> 8-way radial kaleidoscope -> neon edges -> glowing smiley
        const pals = [{ bg: [[255, 255, 255], [70, 110, 255], [20, 30, 160], [5, 5, 30]], f1: '#ff3b1a', f2: '#ffd21a', skull: '#ff4040' },
          { bg: [[255, 255, 255], [40, 230, 255], [10, 120, 160], [0, 20, 30]], f1: '#ffee00', f2: '#ff7a00', skull: '#ffef7a' },
          { bg: [[255, 220, 255], [255, 60, 200], [110, 0, 140], [10, 0, 20]], f1: '#39ff14', f2: '#00e5ff', skull: '#e6fffb' }];
        psycheTexture(t, cut.seed, pals[cut.bg % 3]); radialKaleido(8, t * 0.35 * (cut.k > 0.5 ? 1 : -1)); edgeGlow();
        s.save(); s.shadowColor = '#fff'; s.shadowBlur = 30; s.lineWidth = 7; s.strokeStyle = '#fff'; const R = SH * 0.33 * (1 + 0.1 * kick);
        s.beginPath(); s.arc(SW / 2, SH / 2, R, 0, TAU); s.stroke(); s.fillStyle = 'rgba(40,60,255,.55)'; s.fill();
        s.fillStyle = '#fff'; for (const k of [-1, 1]) { s.beginPath(); s.ellipse(SW / 2 + k * R * 0.32, SH / 2 - R * 0.25, R * 0.1, R * 0.2, 0, 0, TAU); s.fill(); }
        s.beginPath(); s.arc(SW / 2, SH / 2 + R * 0.05, R * 0.55, 0.2, Math.PI - 0.2); s.stroke(); s.restore();
        if (cut.k > 0.6) graffiti(['no dancer', 'cuffin?', 'fvlga'][cut.bg % 3], SW * 0.75, SH * 0.2, SH * 0.14, C.red, -0.15); break; }
      case 'smear': { // vertically smeared title strip + sigil + graffiti (finish() adds the vertical blur)
        bgFlat(C.ink); s.fillStyle = C.acid; s.fillRect(0, SH * 0.52, SW * (0.7 + 0.3 * ease(lt / 0.3)), SH * 0.48);
        word('Cuff no Dancer', SW * 0.38, SH * 0.27, SH * 0.24, FS, { fill: '#e8e8e8', stroke: C.ink, thick: 0.03, maxW: SW * 0.7 });
        word('Fvlga', SW * 0.33, SH * 0.76, SH * 0.42, FP, { fill: C.ink, stroke: C.acid, thick: 0.02, maxW: SW * 0.6 });
        sigil(cut.bg % 4, SW * 0.34, SH * 0.5, SH * 0.42, t * 0.4, 'rgba(200,200,200,.85)');
        graffiti(['getting', 'no dancer', 'cuffed', 'bands'][cut.bg % 4], SW * 0.72, SH * 0.2, SH * 0.17, C.red, -0.12);
        break; }
      case 'drop': { await film(1, lt * 0.45, 'dream', cut, 2); s.fillStyle = 'rgba(20,0,40,.18)'; s.fillRect(0, 0, SW, SH);
        word('alone', SW * 0.5, SH * 0.85, SH * 0.12, FG, { fill: '#9a9a9a', stroke: C.ink, thick: 0.05 });
        if (t > 67.8) word('uh', SW / 2, SH * 0.45, SH * 0.5, FK, { fill: '#fff', extrude: 6 }); break; }
      case 'end': { await film(11, lt * 0.6, 'dream', cut); s.fillStyle = `rgba(0,0,0,${0.35 + 0.5 * clamp(lt / 2, 0, 1)})`; s.fillRect(0, 0, SW, SH); s.save(); s.translate(SW / 2, SH / 2); s.rotate(lt * 1.6); const txt = '@' + ARTIST.toLowerCase() + ' · cuff no dancer · '; s.font = `${Math.round(SH * 0.07)}px ${FS}`; s.fillStyle = '#fff'; s.textAlign = 'center';
        const rad = SH * 0.3 * ease(lt / 0.6); [...txt].forEach((ch, i) => { s.save(); s.rotate(i * TAU / txt.length); s.translate(0, -rad); s.fillText(ch, 0, 0); s.restore(); }); s.restore();
        s.globalAlpha = ease((lt - 0.8) / 0.6); word('fvlga', SW / 2, SH / 2, SH * 0.24, FG, { chrome: true, stroke: C.ink, thick: 0.05 }); s.globalAlpha = 1; break; }
    }
    const cap = CAPTIONS.find(c => t >= c[0] && t <= c[1]); if (cap && cut.type !== 'word' && cut.type !== 'adlib') caption(cap[2]);
    if (cut.type !== 'end') post(cut, t, kick, lt);
    finish(cut, t, kick, lt);
    const z = 1 + 0.14 * (1 - ease(lt / 0.16)) + 0.03 * kick, jr = rng(Math.floor(t * 30)), jx = (jr() - 0.5) * 12 * kick, jy = (jr() - 0.5) * 10 * kick, rz = (cut.type === 'adlib' ? cut.rot * 0.15 : 0) + jit(5, 0.01);
    o.save(); o.translate(W / 2 + jx, SY + SH / 2 + jy); o.rotate(rz); o.scale(z, z); o.drawImage(S, -SW / 2, -SH / 2); o.restore();
    o.fillStyle = C.ink; o.fillRect(0, 0, W, SY - 1); o.fillRect(0, SY + SH + 1, W, H - SY - SH);
  }
  function init(outCanvas, analysis, clips) {
    CLIPS = clips || [];
    A = analysis; out = outCanvas; o = out.getContext('2d'); W = out.width; H = out.height; SW = W; SH = Math.round(W * 9 / 16); SY = Math.round((H - SH) / 2);
    S = document.createElement('canvas'); S.width = SW; S.height = SH; s = S.getContext('2d', { willReadFrequently: true });
    tmp = document.createElement('canvas'); tmp.width = SW; tmp.height = SH; tctx = tmp.getContext('2d', { willReadFrequently: true });
    noiseC = document.createElement('canvas'); noiseC.width = 180; noiseC.height = 101; noiseX = noiseC.getContext('2d');
    G2 = document.createElement('canvas'); G2.width = SW; G2.height = SH; g2 = G2.getContext('2d'); LO = document.createElement('canvas'); LO.width = Math.round(SW / 2.2); LO.height = Math.round(SH / 2.2); lo = LO.getContext('2d');
    PREV = document.createElement('canvas'); PREV.width = SW; PREV.height = SH; pv = PREV.getContext('2d'); buildSchedule();
  }
  root.Collage = { init, render, get cuts() { return CUTS; } };
})(window);
