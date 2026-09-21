/* CalcHelper — small interactive explorers embedded in the textbook pages.
   Each widget is a function (el) that fills the element and wires up sliders. */
(function (root) {
  'use strict';
  const V = root.CH.V, R = root.CH.R, M = root.CH.M;
  const W = {};

  function slider(id, label, min, max, step, value) {
    return '<label class="slider"><span class="slider-label">' + label + ' = <output id="' + id + '-out">' + value + '</output></span>' +
      '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + value + '"></label>';
  }
  function wire(el, ids, draw) {
    const get = () => Object.fromEntries(ids.map(id => [id, parseFloat(el.querySelector('#' + id).value)]));
    ids.forEach(id => el.querySelector('#' + id).addEventListener('input', () => {
      el.querySelector('#' + id + '-out').textContent = el.querySelector('#' + id).value;
      draw(get());
    }));
    draw(get());
  }
  const fr = (n, d) => M.fracTex(n, d);
  const num = v => Number.isInteger(v) ? String(v) : (Math.round(v * 100) / 100).toString();
  const signed = v => v < 0 ? '- ' + num(-v) : '+ ' + num(v);

  // y = mx + b
  W['line-explorer'] = function (el) {
    el.innerHTML = '<div class="widget-controls">' + slider('m', 'slope m', -4, 4, 0.5, 2) + slider('b', 'intercept b', -5, 5, 1, -1) + '</div><div class="widget-fig"></div><div class="widget-text"></div>';
    wire(el, ['m', 'b'], ({ m, b }) => {
      const x0 = 1, y0 = m * x0 + b;
      el.querySelector('.widget-fig').innerHTML = V.graph({
        xmin: -6, xmax: 6, ymin: -6, ymax: 6, width: 360, id: 'le',
        fns: [{ f: x => m * x + b, label: 'y = ' + num(m) + 'x ' + signed(b) }],
        segments: m !== 0 ? [
          { x1: x0, y1: y0, x2: x0 + 1, y2: y0, color: 'var(--viz-3)', label: 'run 1', dy: 14 },
          { x1: x0 + 1, y1: y0, x2: x0 + 1, y2: y0 + m, color: 'var(--viz-2)', label: 'rise ' + num(m), dx: 6 }] : [],
        points: [{ x: 0, y: b, label: '(0, ' + num(b) + ')', color: 'var(--viz-5)' }]
      });
      el.querySelector('.widget-text').innerHTML = R.md(
        'Equation: $y = ' + num(m) + 'x ' + signed(b) + '$. ' +
        (m > 0 ? 'The slope is **positive**, so the line goes **up** as you move right. ' : m < 0 ? 'The slope is **negative**, so the line goes **down** as you move right. ' : 'The slope is **zero**, so the line is **flat** (horizontal). ') +
        'For every 1 step right, the line moves ' + num(Math.abs(m)) + (m >= 0 ? ' up' : ' down') + '. It crosses the $y$-axis at $(0, ' + num(b) + ')$.');
    });
  };

  // distance, midpoint and slope between two points
  W['two-points'] = function (el) {
    el.innerHTML = '<div class="widget-controls">' + slider('x1', 'x₁', -6, 6, 1, -3) + slider('y1', 'y₁', -6, 6, 1, 0) + slider('x2', 'x₂', -6, 6, 1, 5) + slider('y2', 'y₂', -6, 6, 1, 6) + '</div><div class="widget-fig"></div><div class="widget-text"></div>';
    wire(el, ['x1', 'y1', 'x2', 'y2'], ({ x1, y1, x2, y2 }) => {
      const dx = x2 - x1, dy = y2 - y1, d2 = dx * dx + dy * dy;
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      el.querySelector('.widget-fig').innerHTML = V.graph({
        xmin: -7, xmax: 7, ymin: -7, ymax: 7, width: 380, id: 'tp',
        segments: [
          { x1, y1, x2, y2, color: 'var(--viz-1)', width: 2.6 },
          { x1, y1, x2, y2: y1, color: 'var(--viz-3)', dashed: true, label: 'Δx = ' + num(dx), dy: 16 },
          { x1: x2, y1, x2, y2, color: 'var(--viz-2)', dashed: true, label: 'Δy = ' + num(dy), dx: 6 }],
        points: [{ x: x1, y: y1, label: 'A(' + x1 + ', ' + y1 + ')' }, { x: x2, y: y2, label: 'B(' + x2 + ', ' + y2 + ')' }, { x: mx, y: my, label: 'M', color: 'var(--viz-5)' }]
      });
      const dist = M.sqrtTex(d2);
      const slope = dx === 0 ? '\\text{undefined (vertical line)}' : fr(dy, dx);
      el.querySelector('.widget-text').innerHTML = R.md(
        '**Distance** (Pythagoras on the dashed triangle): $d = \\sqrt{(' + num(dx) + ')^2 + (' + num(dy) + ')^2} = \\sqrt{' + d2 + '} = ' + dist + '$\n\n' +
        '**Midpoint** (average each coordinate): $M = \\left(\\frac{' + x1 + ' + ' + x2 + '}{2},\\ \\frac{' + y1 + ' + ' + y2 + '}{2}\\right) = (' + num(mx) + ',\\ ' + num(my) + ')$\n\n' +
        '**Slope** (rise over run): $m = \\frac{' + num(dy) + '}{' + num(dx) + '} = ' + slope + '$');
    });
  };

  // circle centre-radius form
  W['circle-explorer'] = function (el) {
    el.innerHTML = '<div class="widget-controls">' + slider('h', 'h', -4, 4, 1, 2) + slider('k', 'k', -4, 4, 1, -1) + slider('r', 'r', 1, 5, 1, 3) + '</div><div class="widget-fig"></div><div class="widget-text"></div>';
    wire(el, ['h', 'k', 'r'], ({ h, k, r }) => {
      el.querySelector('.widget-fig').innerHTML = V.graph({
        xmin: -8, xmax: 8, ymin: -8, ymax: 8, width: 360, id: 'ce', tick: 2,
        circles: [{ cx: h, cy: k, r, fill: true }],
        segments: [{ x1: h, y1: k, x2: h + r, y2: k, color: 'var(--viz-2)', label: 'r = ' + r, dy: -8 }],
        points: [{ x: h, y: k, label: '(' + h + ', ' + k + ')' }]
      });
      const c = h * h + k * k - r * r;
      el.querySelector('.widget-text').innerHTML = R.md(
        '**Centre–radius form:** $(x ' + signed(-h) + ')^2 + (y ' + signed(-k) + ')^2 = ' + (r * r) + '$\n\n' +
        '**Expanded (general) form:** $x^2 + y^2 ' + signed(-2 * h) + 'x ' + signed(-2 * k) + 'y ' + signed(c) + ' = 0$\n\n' +
        'Every point on the circle is exactly $r = ' + r + '$ away from the centre — that is all the equation says (it is the distance formula squared).');
    });
  };

  // |x - a| < b  /  |x - a| > b
  W['abs-inequality'] = function (el) {
    el.innerHTML = '<div class="widget-controls">' + slider('a', 'a', -5, 5, 1, 1) + slider('b', 'b', 0, 5, 0.5, 2) +
      '<label class="slider"><span class="slider-label">type</span><select id="kind"><option value="lt">|x − a| &lt; b</option><option value="le">|x − a| ≤ b</option><option value="gt">|x − a| &gt; b</option><option value="ge">|x − a| ≥ b</option></select></label></div><div class="widget-fig"></div><div class="widget-text"></div>';
    const draw = () => {
      const a = +el.querySelector('#a').value, b = +el.querySelector('#b').value, kind = el.querySelector('#kind').value;
      const closed = kind === 'le' || kind === 'ge';
      const inside = kind === 'lt' || kind === 'le';
      const intervals = inside ? [{ lo: a - b, hi: a + b, loC: closed, hiC: closed }] : [{ lo: -Infinity, hi: a - b, hiC: closed }, { lo: a + b, hi: Infinity, loC: closed, color: 'var(--viz-1)' }];
      el.querySelector('.widget-fig').innerHTML = V.numberLine({ min: -8, max: 8, intervals, points: [{ x: a, label: 'a = ' + a, color: 'var(--viz-5)', open: true }] });
      const sym = { lt: '<', le: '\\le', gt: '>', ge: '\\ge' }[kind];
      const ans = inside ? (closed ? '[' : '(') + num(a - b) + ', ' + num(a + b) + (closed ? ']' : ')')
        : '(-\\infty, ' + num(a - b) + (closed ? ']' : ')') + ' \\cup ' + (closed ? '[' : '(') + num(a + b) + ', \\infty)';
      el.querySelector('.widget-text').innerHTML = R.md(
        '$|x - ' + a + '| ' + sym + ' ' + num(b) + '$ means: *the distance from $x$ to ' + a + ' is ' + (inside ? 'at most' : 'at least') + ' ' + num(b) + '*.\n\n' +
        (inside ? 'So $x$ stays **between** $' + a + ' - ' + num(b) + ' = ' + num(a - b) + '$ and $' + a + ' + ' + num(b) + ' = ' + num(a + b) + '$: ' : 'So $x$ is **far from** ' + a + ', on either side: ') +
        '$\\;S = ' + ans + '$');
    };
    ['a', 'b'].forEach(id => el.querySelector('#' + id).addEventListener('input', () => { el.querySelector('#' + id + '-out').textContent = el.querySelector('#' + id).value; draw(); }));
    el.querySelector('#kind').addEventListener('change', draw);
    draw();
  };

  // ax^2 + bx + c and the discriminant
  W['quadratic-explorer'] = function (el) {
    el.innerHTML = '<div class="widget-controls">' + slider('a', 'a', -3, 3, 1, 1) + slider('b', 'b', -6, 6, 1, 2) + slider('c', 'c', -6, 6, 1, -4) + '</div><div class="widget-fig"></div><div class="widget-text"></div>';
    wire(el, ['a', 'b', 'c'], ({ a, b, c }) => {
      if (a === 0) a = 1e-9;
      const D = b * b - 4 * a * c;
      const roots = D > 0 ? [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)] : D === 0 ? [-b / (2 * a)] : [];
      el.querySelector('.widget-fig').innerHTML = V.graph({
        xmin: -6, xmax: 6, ymin: -8, ymax: 8, width: 360, id: 'qe', tick: 2,
        fns: [{ f: x => a * x * x + b * x + c }],
        points: roots.map(r => ({ x: r, y: 0, label: 'x = ' + num(r), color: 'var(--viz-5)' }))
      });
      const aa = Math.abs(a) < 1e-6 ? 0 : a;
      el.querySelector('.widget-text').innerHTML = R.md(
        '$y = ' + M.polyTex([aa, b, c]) + '$. Discriminant $D = b^2 - 4ac = ' + b + '^2 - 4(' + num(aa) + ')(' + c + ') = ' + num(D) + '$.\n\n' +
        (D > 0 ? '$D > 0$: **two** real solutions — the parabola crosses the $x$-axis twice, at $x = ' + num(roots[0]) + '$ and $x = ' + num(roots[1]) + '$.'
          : D === 0 ? '$D = 0$: **exactly one** real solution — the parabola just touches the $x$-axis at $x = ' + num(roots[0]) + '$.'
            : '$D < 0$: **no** real solutions — the parabola never reaches the $x$-axis.'));
    });
  };

  // sign of (x - p)(x - q): chart + parabola
  W['sign-explorer'] = function (el) {
    el.innerHTML = '<div class="widget-controls">' + slider('p', 'p', -5, 5, 1, -2) + slider('q', 'q', -5, 5, 1, 3) + '</div><div class="widget-fig"></div><div class="widget-chart"></div><div class="widget-text"></div>';
    wire(el, ['p', 'q'], ({ p, q }) => {
      const [lo, hi] = p <= q ? [p, q] : [q, p];
      el.querySelector('.widget-fig').innerHTML = V.graph({
        xmin: -7, xmax: 7, ymin: -10, ymax: 10, width: 360, id: 'se', tick: 2,
        fns: [{ f: x => (x - p) * (x - q) }],
        shade: lo < hi ? [{ x1: lo, x2: hi, y1: -10, y2: 10, color: 'var(--viz-2)' }] : [],
        points: [{ x: p, y: 0, label: num(p), color: 'var(--viz-5)' }, { x: q, y: 0, label: num(q), color: 'var(--viz-5)' }]
      });
      if (lo < hi) {
        el.querySelector('.widget-chart').innerHTML = V.signChart({
          zeros: [lo, hi],
          rows: [{ label: M.polyTex([1, -lo]), signs: ['-', '+', '+'] }, { label: M.polyTex([1, -hi]), signs: ['-', '-', '+'] }],
          result: { label: '(' + M.polyTex([1, -lo]) + ')(' + M.polyTex([1, -hi]) + ')', signs: ['+', '-', '+'] },
          solution: [false, true, false], includeZeros: [true, true]
        });
        el.querySelector('.widget-text').innerHTML = R.md('Between the zeros one factor is negative and one is positive, so the product is **negative** there — that is exactly where the parabola dips **below** the $x$-axis. So $(' + M.polyTex([1, -lo]) + ')(' + M.polyTex([1, -hi]) + ') \\le 0$ has solution $[' + lo + ', ' + hi + ']$, and $> 0$ has solution $(-\\infty, ' + lo + ') \\cup (' + hi + ', \\infty)$.');
      } else {
        el.querySelector('.widget-chart').innerHTML = '';
        el.querySelector('.widget-text').innerHTML = R.md('With $p = q$ the expression is $(x - ' + p + ')^2$, which is never negative: it is $0$ at $x = ' + p + '$ and positive everywhere else.');
      }
    });
  };

  // repeating decimal -> fraction
  W['repeating-decimal'] = function (el) {
    el.innerHTML = '<div class="widget-controls"><label class="slider"><span class="slider-label">repeating digits</span><input type="text" id="rep" value="18" maxlength="3" pattern="[0-9]{1,3}" class="text-input-sm"></label></div><div class="widget-text"></div>';
    const draw = () => {
      const rep = (el.querySelector('#rep').value.match(/^\d{1,3}$/) || ['6'])[0];
      const n = rep.length, pow = Math.pow(10, n), N = parseInt(rep, 10);
      const f = M.frac(N, pow - 1);
      el.querySelector('.widget-text').innerHTML = R.md(
        'Let $x = 0.\\overline{' + rep + '}$. There ' + (n === 1 ? 'is 1 repeating digit' : 'are ' + n + ' repeating digits') + ', so multiply by $10^{' + n + '} = ' + pow + '$:\n\n' +
        '$$' + pow + 'x = ' + rep + '.\\overline{' + rep + '}$$\n\n' +
        'Subtract the original ($x = 0.\\overline{' + rep + '}$) — the repeating tails cancel:\n\n' +
        '$$' + pow + 'x - x = ' + N + ' \\quad\\Rightarrow\\quad ' + (pow - 1) + 'x = ' + N + ' \\quad\\Rightarrow\\quad x = ' + M.fracTex(N, pow - 1) + (f.d !== pow - 1 || f.n !== N ? '' : '') + '$$' +
        (M.gcd(N, pow - 1) > 1 ? '\n\n(after cancelling the common factor ' + M.gcd(N, pow - 1) + ' from $\\frac{' + N + '}{' + (pow - 1) + '}$)' : ''));
    };
    el.querySelector('#rep').addEventListener('input', draw);
    draw();
  };

  // absolute value as distance
  W['abs-distance'] = function (el) {
    el.innerHTML = '<div class="widget-controls">' + slider('a', 'a', -6, 6, 1, -2) + slider('b', 'b', -6, 6, 1, 5) + '</div><div class="widget-fig"></div><div class="widget-text"></div>';
    wire(el, ['a', 'b'], ({ a, b }) => {
      el.querySelector('.widget-fig').innerHTML = V.numberLine({ min: -7, max: 7, intervals: [{ lo: Math.min(a, b), hi: Math.max(a, b), loC: true, hiC: true, color: 'var(--viz-2)' }], labels: { [a]: 'a', [b]: 'b' } });
      el.querySelector('.widget-text').innerHTML = R.md('The distance between $a = ' + a + '$ and $b = ' + b + '$ is $|a - b| = |' + a + ' - (' + b + ')| = |' + (a - b) + '| = ' + Math.abs(a - b) + '$. The order does not matter: $|b - a| = |' + (b - a) + '| = ' + Math.abs(a - b) + '$ too.');
    });
  };

  root.CH.widgets = W;
})(typeof window !== 'undefined' ? window : globalThis);
