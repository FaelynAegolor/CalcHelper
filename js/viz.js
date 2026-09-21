/* CalcHelper — visualisations (SVG / HTML) used by the textbook pages.
   All colours come from CSS variables so figures work in light and dark mode. */
(function (root) {
  'use strict';
  const R = (root.CH && root.CH.R) || require('./render.js');
  const esc = R.esc;

  const COLORS = ['var(--viz-1)', 'var(--viz-2)', 'var(--viz-3)', 'var(--viz-4)', 'var(--viz-5)'];
  const nice = v => (Math.round(v * 100) / 100).toString();

  // ---------- number line ----------
  // opts: {min, max, step, intervals:[{lo,hi,loC,hiC,color}], points:[{x,label,open,color}], labels:{x:'txt'}, height}
  function numberLine(o) {
    o = o || {};
    const min = o.min ?? -5, max = o.max ?? 5, step = o.step ?? 1;
    const W = 560, H = o.height || 78, pad = 34, y = 44;
    const sx = x => pad + (Math.max(min - 0.6, Math.min(max + 0.6, x)) - min) / (max - min) * (W - 2 * pad);
    let s = '<svg class="viz viz-numberline" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.alt || 'number line') + '">';
    s += '<defs><marker id="nl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>';
    // shaded intervals
    (o.intervals || []).forEach((I, i) => {
      const col = I.color || COLORS[i % COLORS.length];
      const a = isFinite(I.lo) ? sx(I.lo) : pad - 14, b = isFinite(I.hi) ? sx(I.hi) : W - pad + 14;
      s += '<line x1="' + a + '" y1="' + y + '" x2="' + b + '" y2="' + y + '" stroke="' + col + '" stroke-width="7" stroke-linecap="butt" opacity="0.85"' + (!isFinite(I.lo) ? ' marker-start="url(#nl-arrow)"' : '') + (!isFinite(I.hi) ? ' marker-end="url(#nl-arrow)"' : '') + '/>';
    });
    // axis
    s += '<line x1="' + (pad - 18) + '" y1="' + y + '" x2="' + (W - pad + 18) + '" y2="' + y + '" stroke="currentColor" stroke-width="1.6" marker-start="url(#nl-arrow)" marker-end="url(#nl-arrow)"/>';
    for (let x = Math.ceil(min / step) * step; x <= max + 1e-9; x += step) {
      const X = sx(x);
      s += '<line x1="' + X + '" y1="' + (y - 5) + '" x2="' + X + '" y2="' + (y + 5) + '" stroke="currentColor" stroke-width="1.2"/>';
      s += '<text x="' + X + '" y="' + (y + 20) + '" text-anchor="middle" class="viz-tick">' + nice(x) + '</text>';
    }
    // interval endpoints
    (o.intervals || []).forEach((I, i) => {
      const col = I.color || COLORS[i % COLORS.length];
      [[I.lo, I.loC], [I.hi, I.hiC]].forEach(([x, closed]) => {
        if (!isFinite(x)) return;
        s += '<circle cx="' + sx(x) + '" cy="' + y + '" r="6" stroke="' + col + '" stroke-width="2.4" fill="' + (closed ? col : 'var(--bg)') + '"/>';
      });
    });
    (o.points || []).forEach((p, i) => {
      const col = p.color || 'var(--viz-point)';
      s += '<circle cx="' + sx(p.x) + '" cy="' + y + '" r="6" stroke="' + col + '" stroke-width="2.4" fill="' + (p.open ? 'var(--bg)' : col) + '"/>';
      if (p.label) s += '<text x="' + sx(p.x) + '" y="' + (y - 13) + '" text-anchor="middle" class="viz-label" fill="' + col + '">' + esc(p.label) + '</text>';
    });
    if (o.labels) for (const [x, txt] of Object.entries(o.labels)) {
      s += '<text x="' + sx(+x) + '" y="' + (y - 13) + '" text-anchor="middle" class="viz-label">' + esc(txt) + '</text>';
    }
    if (o.title) s += '<text x="' + (W / 2) + '" y="' + (H - 4) + '" text-anchor="middle" class="viz-caption">' + esc(o.title) + '</text>';
    return s + '</svg>';
  }

  // ---------- sign chart (HTML table) ----------
  // opts: {zeros:[numbers ascending], rows:[{label(tex), signs:['-','+',...]}], result:{label, signs},
  //        solution:[bool per region], includeZeros:[bool per zero] , excludeZeros:[bool] (open at zero, e.g. denominators)}
  function signChart(o) {
    const zeros = o.zeros;
    const n = zeros.length + 1;
    const hdr = ['<th class="sc-corner"></th>'];
    const regionLabel = i => {
      if (i === 0) return '$x < ' + zeros[0] + '$';
      if (i === n - 1) return '$x > ' + zeros[n - 2] + '$';
      return '$' + zeros[i - 1] + ' < x < ' + zeros[i] + '$';
    };
    for (let i = 0; i < n; i++) {
      hdr.push('<th class="sc-region">' + R.md(regionLabel(i)).replace(/^<p>|<\/p>$/g, '') + '</th>');
      if (i < n - 1) hdr.push('<th class="sc-zero">' + R.tex('x=' + zeros[i]) + '</th>');
    }
    let html = '<div class="table-wrap sign-chart"><table><tr>' + hdr.join('') + '</tr>';
    const rowHtml = (r, isResult) => {
      let h = '<tr class="' + (isResult ? 'sc-result' : '') + '"><th>' + R.tex(r.label) + '</th>';
      for (let i = 0; i < n; i++) {
        const sign = r.signs[i];
        const sol = isResult && o.solution && o.solution[i];
        h += '<td class="sc-sign sc-' + (sign === '+' ? 'pos' : 'neg') + (sol ? ' sc-sol' : '') + '">' + (sign === '+' ? '+' : '−') + '</td>';
        if (i < n - 1) {
          let z = '0';
          if (isResult) {
            if (o.excludeZeros && o.excludeZeros[i]) z = 'undef.';
            const inc = o.includeZeros && o.includeZeros[i];
            h += '<td class="sc-zero-cell' + (inc ? ' sc-sol' : '') + '">' + z + '</td>';
          } else {
            const rz = r.zero !== undefined ? r.zero : null;
            h += '<td class="sc-zero-cell">' + (rz !== null && Math.abs(rz - zeros[i]) < 1e-9 ? '0' : (r.signsAtZero ? r.signsAtZero[i] : '')) + '</td>';
          }
        }
      }
      return h + '</tr>';
    };
    (o.rows || []).forEach(r => { html += rowHtml(r, false); });
    if (o.result) html += rowHtml(o.result, true);
    html += '</table></div>';
    if (o.caption) html += '<div class="figcaption">' + R.md(o.caption) + '</div>';
    return html;
  }

  // ---------- coordinate graph ----------
  // opts: {xmin,xmax,ymin,ymax, fns:[{f, color, label, dashed}], points:[{x,y,label,color,open}],
  //        segments:[{x1,y1,x2,y2,color,dashed,label}], circles:[{cx,cy,r,color}], texts:[{x,y,text,color,anchor}],
  //        shade:[{x1,y1,x2,y2}], size}
  function graph(o) {
    o = o || {};
    const xmin = o.xmin ?? -6, xmax = o.xmax ?? 6, ymin = o.ymin ?? -6, ymax = o.ymax ?? 6;
    const W = o.width || 420, H = o.height || Math.round(W * (ymax - ymin) / (xmax - xmin));
    const pad = 8;
    const sx = x => pad + (x - xmin) / (xmax - xmin) * (W - 2 * pad);
    const sy = y => H - pad - (y - ymin) / (ymax - ymin) * (H - 2 * pad);
    let s = '<svg class="viz viz-graph" viewBox="0 0 ' + W + ' ' + H + '" style="max-width:' + W + 'px" role="img" aria-label="' + esc(o.alt || 'graph') + '">';
    s += '<defs><marker id="g-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker><clipPath id="clip-' + (o.id || 'g') + '"><rect x="0" y="0" width="' + W + '" height="' + H + '"/></clipPath></defs>';
    // grid
    if (o.grid !== false) {
      for (let x = Math.ceil(xmin); x <= xmax; x++) s += '<line x1="' + sx(x) + '" y1="0" x2="' + sx(x) + '" y2="' + H + '" class="viz-grid"/>';
      for (let y = Math.ceil(ymin); y <= ymax; y++) s += '<line x1="0" y1="' + sy(y) + '" x2="' + W + '" y2="' + sy(y) + '" class="viz-grid"/>';
    }
    (o.shade || []).forEach(r => {
      s += '<rect x="' + sx(r.x1) + '" y="' + sy(r.y2) + '" width="' + (sx(r.x2) - sx(r.x1)) + '" height="' + (sy(r.y1) - sy(r.y2)) + '" fill="' + (r.color || 'var(--viz-1)') + '" opacity="0.15"/>';
    });
    // axes
    if (xmin < 0 && xmax > 0) s += '<line x1="' + sx(0) + '" y1="' + (H - 2) + '" x2="' + sx(0) + '" y2="2" stroke="currentColor" stroke-width="1.4" marker-end="url(#g-arrow)"/>';
    if (ymin < 0 && ymax > 0) s += '<line x1="2" y1="' + sy(0) + '" x2="' + (W - 2) + '" y2="' + sy(0) + '" stroke="currentColor" stroke-width="1.4" marker-end="url(#g-arrow)"/>';
    // tick labels
    const tickEvery = o.tick || (xmax - xmin > 14 ? 2 : 1);
    for (let x = Math.ceil(xmin); x <= xmax; x++) if (x !== 0 && x % tickEvery === 0 && xmin < 0 && xmax > 0)
      s += '<text x="' + sx(x) + '" y="' + (sy(0) + 13) + '" text-anchor="middle" class="viz-tick">' + x + '</text>';
    for (let y = Math.ceil(ymin); y <= ymax; y++) if (y !== 0 && y % tickEvery === 0 && ymin < 0 && ymax > 0)
      s += '<text x="' + (sx(0) - 5) + '" y="' + (sy(y) + 4) + '" text-anchor="end" class="viz-tick">' + y + '</text>';
    s += '<text x="' + (W - 12) + '" y="' + (sy(0) - 6) + '" class="viz-axis-label">x</text><text x="' + (sx(0) + 7) + '" y="12" class="viz-axis-label">y</text>';
    // functions
    (o.fns || []).forEach((fn, i) => {
      const col = fn.color || COLORS[i % COLORS.length];
      const a = fn.domain ? fn.domain[0] : xmin, b = fn.domain ? fn.domain[1] : xmax;
      const N = 300; let d = '', pen = false;
      for (let k = 0; k <= N; k++) {
        const x = a + (b - a) * k / N;
        const y = fn.f(x);
        if (!isFinite(y) || y < ymin - 20 || y > ymax + 20) { pen = false; continue; }
        d += (pen ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + sy(y).toFixed(1) + ' ';
        pen = true;
      }
      s += '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="2.4" clip-path="url(#clip-' + (o.id || 'g') + ')"' + (fn.dashed ? ' stroke-dasharray="6 4"' : '') + '/>';
      if (fn.label) { const lx = fn.labelAt ?? (b - (b - a) * 0.15); const ly = fn.f(lx); if (isFinite(ly)) s += '<text x="' + (sx(lx) + 6) + '" y="' + (sy(ly) - 6) + '" class="viz-label" fill="' + col + '">' + esc(fn.label) + '</text>'; }
    });
    (o.circles || []).forEach((c, i) => {
      const col = c.color || COLORS[i % COLORS.length];
      s += '<circle cx="' + sx(c.cx) + '" cy="' + sy(c.cy) + '" r="' + (c.r * (W - 2 * pad) / (xmax - xmin)) + '" fill="' + (c.fill ? col : 'none') + '" fill-opacity="0.12" stroke="' + col + '" stroke-width="2.4"' + (c.dashed ? ' stroke-dasharray="6 4"' : '') + '/>';
    });
    (o.segments || []).forEach((g, i) => {
      const col = g.color || COLORS[i % COLORS.length];
      s += '<line x1="' + sx(g.x1) + '" y1="' + sy(g.y1) + '" x2="' + sx(g.x2) + '" y2="' + sy(g.y2) + '" stroke="' + col + '" stroke-width="' + (g.width || 2.2) + '"' + (g.dashed ? ' stroke-dasharray="6 4"' : '') + (g.arrow ? ' marker-end="url(#g-arrow)"' : '') + '/>';
      if (g.label) s += '<text x="' + ((sx(g.x1) + sx(g.x2)) / 2 + (g.dx || 6)) + '" y="' + ((sy(g.y1) + sy(g.y2)) / 2 + (g.dy || -6)) + '" class="viz-label" fill="' + col + '">' + esc(g.label) + '</text>';
    });
    (o.points || []).forEach((p, i) => {
      const col = p.color || 'var(--viz-point)';
      s += '<circle cx="' + sx(p.x) + '" cy="' + sy(p.y) + '" r="5" fill="' + (p.open ? 'var(--bg)' : col) + '" stroke="' + col + '" stroke-width="2.2"/>';
      if (p.label) s += '<text x="' + (sx(p.x) + (p.dx ?? 8)) + '" y="' + (sy(p.y) + (p.dy ?? -8)) + '" class="viz-label" fill="' + col + '">' + esc(p.label) + '</text>';
    });
    (o.texts || []).forEach(t => {
      s += '<text x="' + sx(t.x) + '" y="' + sy(t.y) + '" class="viz-label" text-anchor="' + (t.anchor || 'start') + '" fill="' + (t.color || 'currentColor') + '">' + esc(t.text) + '</text>';
    });
    return s + '</svg>';
  }

  // ---------- area model for multiplying brackets ----------
  // rows/cols: arrays of LaTeX terms; cells: 2D array of LaTeX (row-major)
  function areaModel(o) {
    let h = '<div class="table-wrap area-model"><table><tr><th class="am-corner">×</th>';
    o.cols.forEach(c => { h += '<th>' + R.tex(c) + '</th>'; });
    h += '</tr>';
    o.rows.forEach((r, i) => {
      h += '<tr><th>' + R.tex(r) + '</th>';
      o.cells[i].forEach(c => { h += '<td>' + R.tex(c) + '</td>'; });
      h += '</tr>';
    });
    h += '</table></div>';
    if (o.caption) h += '<div class="figcaption">' + R.md(o.caption) + '</div>';
    return h;
  }

  // ---------- nested number sets ----------
  function numberSets() {
    const W = 560, H = 250;
    let s = '<svg class="viz viz-sets" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Nested sets of numbers">';
    const box = (x, y, w, h, col, label, sub) => {
      s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="' + col + '" fill-opacity="0.12" stroke="' + col + '" stroke-width="2"/>';
      s += '<text x="' + (x + 12) + '" y="' + (y + 22) + '" class="viz-label viz-bold" fill="' + col + '">' + label + '</text>';
      if (sub) s += '<text x="' + (x + 12) + '" y="' + (y + 40) + '" class="viz-tick" fill="' + col + '">' + sub + '</text>';
    };
    box(8, 8, W - 16, H - 16, 'var(--viz-4)', 'ℝ  Real numbers', 'every point on the number line');
    box(20, 52, 330, 186, 'var(--viz-1)', 'ℚ  Rational numbers', 'fractions p/q, e.g. ½, −3, 0.75, 0.333…');
    box(32, 100, 220, 126, 'var(--viz-2)', 'ℤ  Integers', '…, −2, −1, 0, 1, 2, …');
    box(44, 150, 150, 66, 'var(--viz-3)', 'ℕ  Natural', '1, 2, 3, …');
    s += '<text x="372" y="90" class="viz-label viz-bold" fill="var(--viz-5)">Irrational</text>';
    s += '<text x="372" y="112" class="viz-tick">cannot be written as p/q</text>';
    s += '<text x="372" y="140" class="viz-label">√2 = 1.4142…</text><text x="372" y="165" class="viz-label">π = 3.14159…</text><text x="372" y="190" class="viz-label">∛5,  e, …</text>';
    return s + '</svg>';
  }

  // ---------- fraction bars ----------
  // parts: [{n, d, color}] — draws each fraction as a shaded bar
  function fractionBars(parts, caption) {
    const W = 560, barH = 30, gap = 18, H = parts.length * (barH + gap) + 6;
    let s = '<svg class="viz viz-fractions" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="fraction bars">';
    parts.forEach((p, i) => {
      const y = 6 + i * (barH + gap), x0 = 90, w = W - x0 - 20;
      const col = p.color || COLORS[i % COLORS.length];
      s += '<text x="' + (x0 - 10) + '" y="' + (y + 20) + '" text-anchor="end" class="viz-label">' + esc(p.label || (p.n + '/' + p.d)) + '</text>';
      for (let k = 0; k < p.d; k++) {
        s += '<rect x="' + (x0 + k * w / p.d) + '" y="' + y + '" width="' + (w / p.d) + '" height="' + barH + '" fill="' + (k < p.n ? col : 'none') + '" fill-opacity="0.7" stroke="currentColor" stroke-width="1"/>';
      }
    });
    s += '</svg>';
    return s + (caption ? '<div class="figcaption">' + R.md(caption) + '</div>' : '');
  }

  const V = { numberLine, signChart, graph, areaModel, numberSets, fractionBars, COLORS };
  if (typeof module !== 'undefined' && module.exports) module.exports = V;
  root.CH = root.CH || {};
  root.CH.V = V;
})(typeof window !== 'undefined' ? window : globalThis);
