/* CalcHelper — interactive explorers for chapters 2–4.
   Same contract as widgets.js: CH.widgets[name] = function (el) { fill el, wire it }.
   Each one is aimed at the single misunderstanding its section is built around,
   rather than at showing everything — see the comment above each. */
(function (root) {
  'use strict';
  const CH = root.CH, V = CH.V, R = CH.R, M = CH.M;
  const W = CH.widgets = CH.widgets || {};

  // ---------- shared bits ----------
  const num = v => { if (!isFinite(v)) return String(v); const r = Math.round(v * 100) / 100; return Object.is(r, -0) ? '0' : String(r); };
  const signed = v => v < 0 ? '- ' + num(-v) : '+ ' + num(v);
  const br = v => '(' + num(v) + ')';                       // a number substituted in, always in brackets
  const shiftTex = (v, h) => h === 0 ? v : v + (h > 0 ? ' - ' + num(h) : ' + ' + num(-h));
  const evalPoly = (co, x) => co.reduce((s, c) => s * x + c, 0);
  const md = s => R.md(s);
  // dropdown options are plain text (no maths rendering), so write powers as x², x³
  const sup = s => s.replace(/\^\{?(\d)\}?/g, (m, d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
  const q = (el, s) => el.querySelector(s);

  function slider(id, label, min, max, step, value) {
    return '<label class="slider"><span class="slider-label">' + label + ' = <output id="' + id + '-out">' + value + '</output></span>' +
      '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + value + '"></label>';
  }
  function select(id, label, opts) {
    return '<label class="slider"><span class="slider-label">' + label + '</span><select id="' + id + '">' +
      opts.map(([v, t]) => '<option value="' + v + '">' + t + '</option>').join('') + '</select></label>';
  }
  const check = (id, label) => '<label class="check-ctl"><input type="checkbox" id="' + id + '"> ' + label + '</label>';
  // read every control in the widget and redraw whenever any of them changes
  function controls(el, draw) {
    const read = () => {
      const v = {};
      el.querySelectorAll('.widget-controls input, .widget-controls select').forEach(c => {
        v[c.id] = c.type === 'checkbox' ? c.checked : c.type === 'range' ? parseFloat(c.value) : c.value;
      });
      return v;
    };
    const update = () => {
      el.querySelectorAll('.widget-controls input[type=range]').forEach(r => { const o = q(el, '#' + r.id + '-out'); if (o) o.textContent = r.value; });
      draw(read());
    };
    el.querySelectorAll('.widget-controls input, .widget-controls select').forEach(c =>
      c.addEventListener(c.tagName === 'SELECT' || c.type === 'checkbox' ? 'change' : 'input', update));
    update();
  }
  const shell = ctrls => '<div class="widget-controls">' + ctrls + '</div><div class="widget-fig"></div><div class="widget-text"></div>';

  /* ------------------------------------------------------------------ 2.1
     Function machine. The section's biggest warning is that f(x + 2) is not
     f(x) + f(2) — so in "x + a number" mode both are worked out side by side. */
  const MACHINES = {
    a: { t: 'X^2 + 1', co: [1, 0, 1] },
    b: { t: '2X - 3', co: [2, -3] },
    c: { t: 'X^2 - 2X', co: [1, -2, 0] },
    d: { t: '3 - X^2', co: [-1, 0, 3] }
  };
  W['function-machine'] = function (el) {
    el.innerHTML = shell(
      select('fn', 'the function', Object.entries(MACHINES).map(([k, m]) => [k, sup('f(x) = ' + m.t.replace(/X/g, 'x'))])) +
      select('mode', 'put in', [['num', 'a number'], ['shift', 'x + a number']]) +
      slider('c', 'the number', -4, 4, 1, 2));
    controls(el, ({ fn, mode, c }) => {
      const m = MACHINES[fn], rule = m.t.replace(/X/g, 'x');
      let out;
      if (mode === 'num') {
        const sub = m.t.replace(/X/g, br(c));
        out = '$f(x) = ' + rule + '$\n\nPut $' + num(c) + '$ in **everywhere** you see $x$, in brackets:\n\n' +
          '$$f(' + num(c) + ') = ' + sub + ' = ' + num(evalPoly(m.co, c)) + '$$';
      } else {
        const inp = shiftTex('x', -c);                       // x + c
        // f(x + c): Horner's rule with polynomials instead of numbers
        let comp = [0];
        m.co.forEach(k => { comp = M.polyAdd(M.polyMul(comp, [1, c]), [k]); });
        const fc = evalPoly(m.co, c), sep = M.polyAdd(m.co, [fc]);
        const same = comp.length === sep.length && comp.every((v, i) => Math.abs(v - sep[i]) < 1e-9);
        out = '$f(x) = ' + rule + '$\n\n' +
          '**Putting $' + inp + '$ in:** replace every $x$ with $(' + inp + ')$, then expand.\n\n' +
          '$$f(' + inp + ') = ' + m.t.replace(/X/g, '(' + inp + ')') + ' = ' + M.polyTex(comp) + '$$\n\n' +
          '**Running the machine twice and adding:** $f(x)$ plus $f(' + num(c) + ') = ' + num(fc) + '$.\n\n' +
          '$$f(x) + f(' + num(c) + ') = ' + M.polyTex(sep) + '$$\n\n' +
          (c === 0 ? 'With $0$ they agree — but only because adding $0$ changes nothing. Move the slider.'
            : same ? 'These happen to agree for this one.' : 'They are **different**. Putting something in is not the same as adding outputs.');
      }
      q(el, '.widget-text').innerHTML = md(out);
    });
  };

  /* ------------------------------------------------------------------ 2.2 / 2.8
     Line tests. Slide an upright line (is it a function?) or a flat line (is it
     one-to-one?) and watch the crossing points light up when there are two. */
  const sq = x => Math.sqrt(x);
  const CURVES = {
    U: { name: 'a U shape: y = ½x² − 2', br: [{ f: x => x * x / 2 - 2 }], fn: true, oneone: false },
    S: { name: 'an S shape: y = x³ ÷ 8', br: [{ f: x => x * x * x / 8 }], fn: true, oneone: true },
    wave: { name: 'a wave: y = x³ ÷ 6 − 1.5x', br: [{ f: x => x * x * x / 6 - 1.5 * x }], fn: true, oneone: false },
    circle: { name: 'a circle: x² + y² = 9', br: [{ f: x => sq(9 - x * x), domain: [-3, 3] }, { f: x => -sq(9 - x * x), domain: [-3, 3] }], fn: false },
    side: { name: 'a sideways U: x = ½y² − 3', br: [{ f: x => sq(2 * (x + 3)), domain: [-3, 6] }, { f: x => -sq(2 * (x + 3)), domain: [-3, 6] }], fn: false },
    root: { name: 'a half-U: y = √(x + 4)', br: [{ f: x => sq(x + 4), domain: [-4, 6] }], fn: true, oneone: true },
    line: { name: 'a line: y = ½x + 1', br: [{ f: x => x / 2 + 1 }], fn: true, oneone: true },
    vee: { name: 'a V: y = |x| − 2', br: [{ f: x => Math.abs(x) - 2 }], fn: true, oneone: false }
  };
  function hits(curve, t, vertical) {
    const pts = [];
    const add = (x, y) => { if (isFinite(y) && !pts.some(p => Math.abs(p.x - x) < 0.06 && Math.abs(p.y - y) < 0.06)) pts.push({ x, y }); };
    curve.br.forEach(b => {
      const lo = b.domain ? b.domain[0] : -6, hi = b.domain ? b.domain[1] : 6;
      if (vertical) { if (t >= lo && t <= hi) add(t, b.f(t)); return; }
      const g = x => b.f(x) - t;
      for (let x = Math.max(lo, -6); x < Math.min(hi, 6); x += 0.01) {
        const a = g(x), c = g(x + 0.01);
        if (!isFinite(a) || !isFinite(c)) continue;
        if (a === 0) { add(x, t); continue; }
        if (a * c < 0) { let u = x, v = x + 0.01; for (let k = 0; k < 40; k++) { const m = (u + v) / 2; if (g(u) * g(m) <= 0) v = m; else u = m; } add((u + v) / 2, t); }
      }
      if (Math.abs(g(Math.min(hi, 6))) < 1e-9) add(Math.min(hi, 6), t);
    });
    return pts;
  }
  function lineTest(el, vertical) {
    const set = vertical ? ['U', 'circle', 'S', 'side', 'wave'] : ['U', 'line', 'wave', 'root', 'S', 'vee'];
    el.innerHTML = shell(select('cv', 'the curve', set.map(k => [k, CURVES[k].name])) +
      slider('t', vertical ? 'line at x' : 'line at height y', -5, 5, 0.5, 1));
    controls(el, ({ cv, t }) => {
      const C = CURVES[cv], pts = hits(C, t, vertical), many = pts.length >= 2;
      q(el, '.widget-fig').innerHTML = V.graph({
        xmin: -6, xmax: 6, ymin: -6, ymax: 6, width: 340, id: vertical ? 'vlt' : 'hlt',
        fns: C.br.map(b => Object.assign({ color: 'var(--viz-1)' }, b)),
        segments: [vertical ? { x1: t, y1: -6, x2: t, y2: 6, color: 'var(--viz-5)', width: 2.4 } : { x1: -6, y1: t, x2: 6, y2: t, color: 'var(--viz-5)', width: 2.4 }],
        points: pts.map(p => ({ x: p.x, y: p.y, color: many ? 'var(--bad)' : 'var(--ok)', label: vertical ? '(' + num(p.x) + ', ' + num(p.y) + ')' : 'x = ' + num(p.x) }))
      });
      const verdict = vertical
        ? (C.fn ? 'Slide it all the way across: it never hits twice, so this **is** a function.' : 'Somewhere the line hits twice, so this is **not** a function.')
        : (C.oneone ? 'Slide it all the way up and down: it never hits twice, so this function **is** one-to-one — it has an inverse.' : 'Somewhere the line hits twice, so this is **not** one-to-one — it has no inverse.');
      let now;
      if (vertical) {
        now = pts.length === 0 ? 'Right now the line misses the curve: there is no point with $x = ' + num(t) + '$ at all. That is allowed.'
          : pts.length === 1 ? 'Right now it hits **once**: the input $x = ' + num(t) + '$ has exactly one output, $y = ' + num(pts[0].y) + '$.'
          : 'Right now it hits **' + pts.length + ' times**: the input $x = ' + num(t) + '$ would need ' + pts.length + ' outputs (' + pts.map(p => '$' + num(p.y) + '$').join(' and ') + '). A function cannot do that.';
      } else {
        now = pts.length === 0 ? 'Right now the line misses: no input gives the output $' + num(t) + '$.'
          : pts.length === 1 ? 'Right now it hits **once**: only $x = ' + num(pts[0].x) + '$ gives the output $' + num(t) + '$.'
          : 'Right now it hits **' + pts.length + ' times**: ' + pts.map(p => '$x = ' + num(p.x) + '$').join(' and ') + ' all give the output $' + num(t) + '$. Told only the answer $' + num(t) + '$, you could not tell which input it came from.';
      }
      q(el, '.widget-text').innerHTML = md(now + '\n\n' + verdict);
    });
  }
  W['vertical-line-test'] = el => lineTest(el, true);
  W['horizontal-line-test'] = el => lineTest(el, false);

  /* ------------------------------------------------------------------ 2.3
     Graph reader. Almost every mistake in 2.3 is answering with heights when the
     question wanted x, or the other way round — so the across-reading and the
     up-reading are drawn as two separate dashed lines, and climbing and falling
     stretches are coloured differently. */
  const GK = 15 / 32, GC = 2.21875;
  const gf = x => GK * (x * x * x / 3 - x * x - 3 * x) + GC;   // domain [-3, 5]; peak (-1, 3), trough (3, -2)
  W['graph-reader'] = function (el) {
    el.innerHTML = shell(slider('x', 'input x', -3, 5, 0.5, 0));
    controls(el, ({ x }) => {
      const y = gf(x);
      q(el, '.widget-fig').innerHTML = V.graph({
        xmin: -4, xmax: 6, ymin: -3, ymax: 4, width: 360, id: 'gr',
        fns: [{ f: gf, domain: [-3, -1], color: 'var(--ok)' }, { f: gf, domain: [-1, 3], color: 'var(--bad)' }, { f: gf, domain: [3, 5], color: 'var(--ok)' }],
        segments: [{ x1: x, y1: 0, x2: x, y2: y, color: 'var(--viz-5)', dashed: true }, { x1: x, y1: y, x2: 0, y2: y, color: 'var(--viz-4)', dashed: true }],
        points: [{ x: -3, y: -2 }, { x: 5, y: 3 }, { x: -1, y: 3, label: 'peak (-1, 3)' }, { x: 3, y: -2, label: 'trough (3, -2)' }, { x, y, color: 'var(--viz-5)' }]
      });
      const where = x === -3 || x === 5 ? 'at an **end** of the graph'
        : x < -1 ? 'on a **green** stretch — climbing as you read left to right'
        : x === -1 ? 'exactly at the **peak**: local maximum value $3$, which occurs at $x = -1$'
        : x < 3 ? 'on the **pink** stretch — falling as you read left to right'
        : x === 3 ? 'exactly at the **trough**: local minimum value $-2$, which occurs at $x = 3$'
        : 'on a **green** stretch — climbing again';
      q(el, '.widget-text').innerHTML = md(
        'Across to $x = ' + num(x) + '$ (orange), then up or down to the curve, then across to read the height (purple): $f(' + num(x) + ') \\approx ' + num(y) + '$.\n\nYou are ' + where + '.\n\n' +
        '| Asks **where** (answer in $x$) | Asks **how high** (answer in $y$) |\n|---|---|\n' +
        '| domain $[-3, 5]$ | range $[-2, 3]$ |\n' +
        '| increasing on $(-3, -1) \\cup (3, 5)$ | local maximum **value** $3$ |\n' +
        '| decreasing on $(-1, 3)$ | local minimum **value** $-2$ |');
    });
  };

  /* ------------------------------------------------------------------ 2.6
     Transformations. The section's hardest idea is that a minus inside moves the
     graph right; dragging h to +3 and watching it go right settles it. The
     original shape stays drawn faintly behind, and the key point is tracked. */
  const pw = (i, n) => (i === 'x' ? 'x' : '(' + i + ')') + '^' + n;
  const SHAPES = {
    sq: { name: 'x² (a U)', f: x => x * x, tex: i => pw(i, 2), key: 'lowest point' },
    abs: { name: '|x| (a V)', f: Math.abs, tex: i => '|' + i + '|', key: 'corner' },
    root: { name: '√x (half a U)', f: x => x < 0 ? NaN : Math.sqrt(x), tex: i => '\\sqrt{' + i + '}', key: 'starting point' },
    cube: { name: 'x³ (an S)', f: x => x * x * x, tex: i => pw(i, 3), key: 'centre point' }
  };
  W['transform-explorer'] = function (el) {
    el.innerHTML = shell(select('shape', 'start from', Object.entries(SHAPES).map(([k, s]) => [k, s.name])) +
      slider('h', 'h (inside)', -4, 4, 1, 2) + slider('k', 'k (outside)', -4, 4, 1, 1) +
      check('fv', 'flip upside down') + check('fh', 'flip left to right'));
    controls(el, ({ shape, h, k, fv, fh }) => {
      const S = SHAPES[shape], A = fv ? -1 : 1, B = fh ? -1 : 1;
      const g = x => A * S.f(B * (x - h)) + k;
      let inner = shiftTex('x', h);
      if (B < 0) inner = h === 0 ? '-x' : '-(' + inner + ')';
      const eq = 'y = ' + (A < 0 ? '-' : '') + S.tex(inner) + (k === 0 ? '' : ' ' + signed(k));
      q(el, '.widget-fig').innerHTML = V.graph({
        xmin: -8, xmax: 8, ymin: -8, ymax: 8, width: 360, id: 'tx', tick: 2,
        fns: [{ f: S.f, color: 'var(--muted)', dashed: true }, { f: g, color: 'var(--viz-2)' }],
        points: [{ x: 0, y: 0, color: 'var(--muted)' }, { x: h, y: k, label: '(' + h + ', ' + k + ')' }]
      });
      const lines = [];
      lines.push(h === 0 ? 'Nothing is added inside the bracket, so there is no sideways move.'
        : 'Inside, $' + shiftTex('x', h) + '$ is zero when $x = ' + h + '$, so the ' + S.key + ' moved **' + Math.abs(h) + ' to the ' + (h > 0 ? 'right' : 'left') + '**' +
          (h > 0 ? ' — yes, a **minus** inside moves it **right**.' : ' — a **plus** inside moves it **left**.'));
      lines.push(k === 0 ? 'Nothing is added outside, so there is no move up or down.' : 'The $' + signed(k) + '$ outside moves every point **' + Math.abs(k) + (k > 0 ? ' up' : ' down') + '** — outside does what it looks like.');
      if (fv) lines.push('The minus **in front** changes the sign of every height, so it is flipped **upside down**.');
      if (fh) lines.push('The minus **inside** changes the sign of every input, so it is flipped **left to right**.');
      q(el, '.widget-text').innerHTML = md('$$' + eq + '$$\n\n' + lines.map(l => '- ' + l).join('\n') +
        '\n\nThe dashed curve is where it started. The ' + S.key + ' moved from $(0, 0)$ to $(' + h + ', ' + k + ')$.');
    });
  };

  /* ------------------------------------------------------------------ 2.7
     Composition chain. Two machines in a row, inside one first; the swap shows
     the other order giving a different answer. Same f and g as the section. */
  const cf = x => 2 * x - 3, cg = x => 4 - x * x;
  const subF = v => '2' + br(v) + ' - 3', subG = v => '4 - ' + br(v) + '^2';
  W['composition-chain'] = function (el) {
    el.innerHTML = shell(select('ord', 'work out', [['fg', 'f(g(x))  —  g first'], ['gf', 'g(f(x))  —  f first']]) + slider('x', 'x', -3, 3, 1, 0));
    controls(el, ({ ord, x }) => {
      const gFirst = ord === 'fg';
      const n1 = gFirst ? 'g' : 'f', n2 = gFirst ? 'f' : 'g';
      const v1 = gFirst ? cg(x) : cf(x), v2 = gFirst ? cf(v1) : cg(v1);
      const o1 = gFirst ? cf(x) : cg(x), o2 = gFirst ? cg(o1) : cf(o1);   // the other order, for comparison
      const box = (name, rule) => '<div class="chain-box"><b>' + name + '</b><span>' + R.tex(rule) + '</span></div>';
      q(el, '.widget-fig').innerHTML = '<div class="chain">' +
        '<div class="chain-val">' + R.tex(num(x)) + '</div><div class="chain-arrow">→</div>' +
        box(n1, gFirst ? '4 - x^2' : '2x - 3') + '<div class="chain-arrow">→</div>' +
        '<div class="chain-val">' + R.tex(num(v1)) + '</div><div class="chain-arrow">→</div>' +
        box(n2, gFirst ? '2x - 3' : '4 - x^2') + '<div class="chain-arrow">→</div>' +
        '<div class="chain-val chain-out">' + R.tex(num(v2)) + '</div></div>';
      q(el, '.widget-text').innerHTML = md(
        '$f(x) = 2x - 3$ and $g(x) = 4 - x^2$.\n\n' +
        '**Inside first:** $' + n1 + '(' + num(x) + ') = ' + (gFirst ? subG(x) : subF(x)) + ' = ' + num(v1) + '$.\n\n' +
        '**Then put that answer in:** $' + n2 + '(' + num(v1) + ') = ' + (gFirst ? subF(v1) : subG(v1)) + ' = ' + num(v2) + '$.\n\n' +
        'The other order gives $' + (gFirst ? 'g(f(' : 'f(g(') + num(x) + ')) = ' + num(o2) + '$' +
        (o2 === v2 ? ' — the same, by coincidence, at this one $x$. Move the slider and it will not last.' : ' — **different**. The order matters.') +
        '\n\nAs formulas: $f(g(x)) = 5 - 2x^2$ but $g(f(x)) = -4x^2 + 12x - 5$.');
    });
  };

  /* ------------------------------------------------------------------ 2.8
     Inverse mirror. "Swap x and y" made visible: a point (a, b) on f and its
     partner (b, a) on the inverse, reflected across the line y = x. */
  const INV = {
    lin: { name: 'f(x) = 2x + 1', f: x => 2 * x + 1, g: x => (x - 1) / 2, ft: '2x + 1', gt: '\\dfrac{x - 1}{2}', lo: -3, hi: 2.5 },
    cube: { name: 'f(x) = x³ ÷ 4', f: x => x * x * x / 4, g: x => Math.cbrt(4 * x), ft: '\\frac{x^3}{4}', gt: '\\sqrt[3]{4x}', lo: -2.5, hi: 2.5 },
    root: { name: 'f(x) = √x', f: x => x < 0 ? NaN : Math.sqrt(x), g: x => x < 0 ? NaN : x * x, ft: '\\sqrt{x}', gt: 'x^2, \\ x \\ge 0', lo: 0, hi: 6, dom: [0, 6] },
    sq: { name: 'f(x) = x², x ≥ 0', f: x => x < 0 ? NaN : x * x, g: x => x < 0 ? NaN : Math.sqrt(x), ft: 'x^2, \\ x \\ge 0', gt: '\\sqrt{x}', lo: 0, hi: 2.4, dom: [0, 6] }
  };
  W['inverse-mirror'] = function (el) {
    el.innerHTML = shell(select('fn', 'the function', Object.entries(INV).map(([k, s]) => [k, s.name])) +
      slider('p', 'move the point', 0, 100, 5, 70) + check('show', 'show the inverse'));
    q(el, '#show').checked = true;
    controls(el, ({ fn, p, show }) => {
      const F = INV[fn], a = F.lo + (F.hi - F.lo) * p / 100, b = F.f(a);
      q(el, '#p-out').textContent = 'a = ' + num(a);
      const fns = [{ f: x => x, color: 'var(--muted)', dashed: true }, { f: F.f, color: 'var(--viz-1)', domain: F.dom }];
      if (show) fns.push({ f: F.g, color: 'var(--viz-2)', domain: F.dom });
      const pts = [{ x: a, y: b, color: 'var(--viz-1)', label: '(' + num(a) + ', ' + num(b) + ')' }];
      if (show) pts.push({ x: b, y: a, color: 'var(--viz-2)', label: '(' + num(b) + ', ' + num(a) + ')' });
      q(el, '.widget-fig').innerHTML = V.graph({
        xmin: -6, xmax: 6, ymin: -6, ymax: 6, width: 340, id: 'inv',
        fns, points: pts, segments: show ? [{ x1: a, y1: b, x2: b, y2: a, color: 'var(--viz-5)', dashed: true }] : [],
        texts: [{ x: 4.6, y: 5.4, text: 'y = x', color: 'var(--muted)' }]
      });
      q(el, '.widget-text').innerHTML = md(
        'The blue point $(' + num(a) + ', ' + num(b) + ')$ is on $f(x) = ' + F.ft + '$: put in $' + num(a) + '$, get out $' + num(b) + '$.\n\n' +
        (show ? 'The inverse runs that backwards — put in $' + num(b) + '$, get back $' + num(a) + '$ — so its point is $(' + num(b) + ', ' + num(a) + ')$: the **same two numbers, swapped**. ' +
          'Swapping the coordinates is exactly a reflection in the dashed line $y = x$. Here $f^{-1}(x) = ' + F.gt + '$.'
          : 'Tick **show the inverse** to see where its partner point lands.'));
    });
  };

  /* ------------------------------------------------------------------ 3.3
     Synthetic division, one move at a time. It is a procedure, so the useful
     thing is to step through it slowly and see where each number comes from. */
  const SYN = [
    { P: [2, -7, 0, 5], c: 3 },
    { P: [1, 2, -13, 10], c: 1 },
    { P: [4, 12, 5], c: -1 },
    { P: [1, 0, 0, -8], c: 2 }
  ];
  W['synthetic-stepper'] = function (el) {
    el.innerHTML = '<div class="widget-controls">' + select('pr', 'the division', SYN.map((s, i) => [i, sup('(' + M.polyTex(s.P) + ') ÷ (' + shiftTex('x', s.c) + ')')])) + '</div>' +
      '<div class="widget-btns"><button type="button" class="btn btn-ghost btn-sm w-back">◀ Back</button><button type="button" class="btn btn-primary btn-sm w-next">Next step ▶</button><button type="button" class="btn btn-ghost btn-sm w-reset">Start again</button></div>' +
      '<div class="widget-fig"></div><div class="widget-text"></div>';
    let s = 0;
    const draw = () => {
      const { P, c } = SYN[+q(el, '#pr').value], n = P.length;
      const mid = [null], bot = [P[0]];
      for (let i = 1; i < n; i++) { mid.push(bot[i - 1] * c); bot.push(P[i] + mid[i]); }
      const last = 2 * n;
      s = Math.max(0, Math.min(s, last));
      // which cells are visible at step s: bottom[0] at 1; mid[i] at 2i; bottom[i] at 2i + 1
      const showMid = i => i > 0 && s >= 2 * i, showBot = i => i === 0 ? s >= 1 : s >= 2 * i + 1;
      // highlight exactly the numbers this step uses:
      //   step 1: P[0] and its copy below; multiply step 2i: bot[i-1] and the new mid[i];
      //   add step 2i+1: P[i], mid[i] and the new bot[i]
      const isMul = s >= 2 && s % 2 === 0 && s < last, isAdd = s >= 3 && s % 2 === 1, i0 = isMul ? s / 2 : isAdd ? (s - 1) / 2 : -1;
      const hl = (row, i) => (s === 1 && i === 0 && row !== 'mid') ||
        (isMul && ((row === 'bot' && i === i0 - 1) || (row === 'mid' && i === i0))) ||
        (isAdd && i === i0);
      const cell = (v, show, now, cls) => '<td class="' + (cls || '') + (now ? ' synth-now' : '') + '">' + (show ? num(v) : '') + '</td>';
      q(el, '.widget-fig').innerHTML = '<table class="synth"><tr><td class="synth-c' + (s === 0 || isMul ? ' synth-now' : '') + '">' + num(c) + '</td>' + P.map((v, i) => cell(v, true, hl('top', i))).join('') + '</tr>' +
        '<tr><td></td>' + P.map((v, i) => cell(mid[i], showMid(i), hl('mid', i))).join('') + '</tr>' +
        '<tr class="synth-bottom"><td></td>' + P.map((v, i) => cell(bot[i], showBot(i), hl('bot', i), s === last ? (i === n - 1 ? 'synth-rem' : 'synth-q') : '')).join('') + '</tr></table>';
      let t;
      if (s === 0) t = 'Write down the coefficients of $' + M.polyTex(P) + '$' + (P.includes(0) ? ', with a $0$ for each missing power' : '') + '. The divisor is $' + shiftTex('x', c) + ' = x - ' + br(c) + '$, so $c = ' + num(c) + '$ goes in the corner.';
      else if (s === 1) t = 'Bring the first coefficient, $' + num(P[0]) + '$, **straight down**.';
      else if (s === last) {
        const Q = bot.slice(0, n - 1), Rm = bot[n - 1];
        t = 'Done. The last number, $' + num(Rm) + '$, is the **remainder**. The others, $' + Q.map(num).join(',\\ ') + '$, are the quotient\'s coefficients — one power lower than $P$.\n\n' +
          '$$Q(x) = ' + M.polyTex(Q) + ', \\qquad R = ' + num(Rm) + '$$' + (Rm === 0 ? '\n\nA remainder of $0$ means $' + shiftTex('x', c) + '$ **is** a factor.' : '');
      } else if (s % 2 === 0) { const i = s / 2; t = '**Multiply** the last bottom number by $c$: $' + num(bot[i - 1]) + ' \\times ' + br(c) + ' = ' + num(mid[i]) + '$. Write it under the next coefficient.'; }
      else { const i = (s - 1) / 2; t = '**Add** down the column: $' + num(P[i]) + ' + ' + br(mid[i]) + ' = ' + num(bot[i]) + '$.'; }
      q(el, '.widget-text').innerHTML = md('**Step ' + s + ' of ' + last + '.** ' + t);
      q(el, '.w-back').disabled = s === 0; q(el, '.w-next').disabled = s === last;
    };
    q(el, '.w-next').addEventListener('click', () => { s++; draw(); });
    q(el, '.w-back').addEventListener('click', () => { s--; draw(); });
    q(el, '.w-reset').addEventListener('click', () => { s = 0; draw(); });
    q(el, '#pr').addEventListener('change', () => { s = 0; draw(); });
    draw();
  };

  /* ------------------------------------------------------------------ 3.4
     Zero hunter. The search is the part that feels unfamiliar, so she does the
     search: click a candidate, see P(c), cross it off or divide it out — and
     stop the moment a quadratic is left. A miss is shown as progress. */
  const HUNT = [
    { P: [1, 2, -13, 10], final: '(x - 1)(x - 2)(x + 5)' },
    { P: [1, -3, -4, 12], final: '(x - 3)(x - 2)(x + 2)' },
    { P: [2, 1, -13, 6], final: '(x - 2)(2x - 1)(x + 3)' },
    { P: [1, 3, 0, -4], final: '(x - 1)(x + 2)^2' }
  ];
  const factorsOf = n => { const f = []; for (let k = 1; k <= Math.abs(n); k++) if (n % k === 0) f.push(k); return f; };
  function candidates(P) {
    const ps = factorsOf(P[P.length - 1]), qs = factorsOf(P[0]), seen = new Map();
    ps.forEach(p => qs.forEach(qq => [1, -1].forEach(sg => {
      const v = sg * p / qq, g = M.gcd(p, qq);
      if (!seen.has(v)) seen.set(v, (sg < 0 ? '−' : '') + (qq / g === 1 ? p / g : p / g + '/' + qq / g));
    })));
    return [...seen.entries()].sort((a, b) => Math.abs(a[0]) - Math.abs(b[0]) || b[0] - a[0]);
  }
  W['zero-hunter'] = function (el) {
    el.innerHTML = '<div class="widget-controls">' + select('pr', 'the polynomial', HUNT.map((h, i) => [i, sup('P(x) = ' + M.polyTex(h.P))])) + '</div>' +
      '<div class="widget-text hunt-head"></div><div class="cands"></div><div class="widget-btns"><button type="button" class="btn btn-ghost btn-sm w-reset">Start again</button></div><div class="widget-text hunt-log"></div>';
    let cur, log, marks;
    const start = () => { cur = HUNT[+q(el, '#pr').value].P.slice(); log = []; marks = {}; draw(); };
    const draw = () => {
      const H = HUNT[+q(el, '#pr').value], cands = candidates(H.P), done = cur.length <= 3;
      q(el, '.hunt-head').innerHTML = md('$P(x) = ' + M.polyTex(H.P) + '$. Candidates: factors of $' + Math.abs(H.P[H.P.length - 1]) + '$ over factors of $' + Math.abs(H.P[0]) + '$, both signs. **Click one to test it** — the small ones first.');
      q(el, '.cands').innerHTML = cands.map(([v, lab]) => '<button type="button" class="cand' + (marks[v] ? ' cand-' + marks[v] : '') + '" data-v="' + v + '"' + (done || marks[v] ? ' disabled' : '') + '>' + lab + '</button>').join('');
      let tail = '';
      if (done) {
        tail = '\n\n**What is left, $' + M.polyTex(cur) + '$, is a quadratic — so stop hunting** and factor it the usual way. That finishes the job:\n\n$$P(x) = ' + H.final + '$$';
      } else tail = '\n\nStill to factor: $' + M.polyTex(cur) + '$.';
      q(el, '.hunt-log').innerHTML = md(log.map(l => '- ' + l).join('\n') + tail);
      el.querySelectorAll('.cand').forEach(b => b.addEventListener('click', () => test(+b.dataset.v, b.textContent)));
    };
    const test = (c, lab) => {
      const v = evalPoly(cur, c);
      // the candidate in LaTeX: "-3" or "\tfrac{1}{2}" (labels come from candidates(), never from typing)
      const mag = lab.replace('−', ''), cTex = (c < 0 ? '-' : '') + (mag.includes('/') ? '\\tfrac{' + mag.split('/')[0] + '}{' + mag.split('/')[1] + '}' : mag);
      const factorTex = 'x ' + (c < 0 ? '+ ' : '- ') + cTex.replace('-', '');
      // P(c) is shown for the ORIGINAL P while nothing has been divided out yet; after that, for what is left
      const name = cur.length === HUNT[+q(el, '#pr').value].P.length ? 'P' : 'Q';
      if (Math.abs(v) < 1e-9) {
        const Q = [cur[0]]; for (let i = 1; i < cur.length - 1; i++) Q.push(cur[i] + Q[i - 1] * c);
        log.push('$' + name + '(' + cTex + ') = 0$ ✓ — so $' + factorTex + '$ is a factor. Synthetic division leaves $Q(x) = ' + M.polyTex(Q) + '$.');
        cur = Q; marks[c] = 'hit';
      } else {
        log.push('$' + name + '(' + cTex + ') = ' + num(v) + '$ — not zero, so cross it off. That is progress, not a mistake.');
        marks[c] = 'miss';
      }
      draw();
    };
    q(el, '.w-reset').addEventListener('click', start);
    q(el, '#pr').addEventListener('change', start);
    start();
  };

  /* ------------------------------------------------------------------ 4.1
     Exponential explorer. One slider for the base shows climb vs fall turning
     over at a = 1; a second moves a point left so she can watch the height get
     tiny but never negative — the asymptote, felt rather than defined. */
  W['exp-explorer'] = function (el) {
    el.innerHTML = shell(slider('a', 'base a', 0.2, 4, 0.1, 2) + slider('x', 'input x', -6, 3, 0.5, -2));
    controls(el, ({ a, x }) => {
      a = Math.round(a * 10) / 10;
      const y = Math.pow(a, x), flat = Math.abs(a - 1) < 1e-9;
      const yTxt = y >= 0.01 ? num(y) : y.toPrecision(2);
      q(el, '.widget-fig').innerHTML = V.graph({
        xmin: -6, xmax: 4, ymin: -2, ymax: 9, width: 360, id: 'ex',
        fns: [{ f: t => Math.pow(a, t), color: 'var(--viz-2)' }],
        points: [{ x: 0, y: 1, label: '(0, 1)', color: 'var(--viz-4)' }, { x, y: Math.min(y, 9), color: 'var(--viz-5)', label: y <= 9 ? '(' + num(x) + ', ' + yTxt + ')' : '' }],
        texts: [{ x: -5.8, y: -1.45, text: '↑ y = 0: gets close, never touches', color: 'var(--muted)', anchor: 'start' }]
      });
      q(el, '.widget-text').innerHTML = md(
        '$y = ' + num(a) + '^x$. ' +
        (flat ? 'With $a = 1$ every power is $1$, so it is a flat line — which is why $a = 1$ is not allowed.'
          : a > 1 ? 'The base is **bigger than 1**, so the graph **climbs** from left to right.'
          : 'The base is **between 0 and 1**, so the graph **falls** from left to right.') +
        '\n\n$' + num(a) + '^{' + num(x) + '} = ' + yTxt + '$' +
        (x < 0 ? ' — a negative power makes it **small**, never negative.' : x === 0 ? ' — anything to the power $0$ is $1$, which is why every one of these passes through $(0, 1)$.' : '.') +
        (flat ? '' : '\n\nDrag $x$ far to the ' + (a > 1 ? 'left' : 'right') + ': the height shrinks towards $0$ but always stays positive. That is the **horizontal asymptote** $y = 0$.'));
    });
  };
})(typeof window !== 'undefined' ? window : globalThis);
