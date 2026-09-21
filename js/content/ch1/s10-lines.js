/* 1.10 Lines */
(function () {
  const M = CH.M, V = CH.V, C = CH.C;
  const pt = (x, y) => '(' + x + ',\\ ' + y + ')';
  const fr = (n, d) => M.fracTex(n, d);
  // standard form Ax + By = C from a point and slope n/d (slope = n/d): d(y - y1) = n(x - x1) -> n x - d y = n x1 - d y1
  function standardForm(x1, y1, n, d) {
    let A = n, B = -d, Cc = n * x1 - d * y1;
    const g = M.gcd(M.gcd(Math.abs(A), Math.abs(B)), Math.abs(Cc) || 1);
    A /= g; B /= g; Cc /= g;
    if (A < 0 || (A === 0 && B < 0)) { A = -A; B = -B; Cc = -Cc; }
    return { A, B, C: Cc };
  }
  const lineTex = ({ A, B, C: Cc }) => M.polyTex([A, 0]).replace(/^0$/, '') .replace('x', 'x') + ' ' + (B >= 0 ? '+ ' : '- ') + (Math.abs(B) === 1 ? '' : Math.abs(B)) + 'y = ' + Cc;
  const lineStr = ({ A, B, C: Cc }) => A + 'x + ' + B + 'y = ' + Cc;

  CH.registerSection({
    id: '1.10', chapter: 1, title: 'Lines',
    summary: 'Slope as steepness, the different forms of the equation of a line, horizontal and vertical lines, and parallel and perpendicular lines.',

    theory: [
      { h: 'Slope: how steep is it?' },
      'The **slope** of a line measures how much it rises for each step to the right. Pick any two points on the line and divide the change in $y$ by the change in $x$:',
      { def: 'Slope', md: '$$m = \\frac{\\text{rise}}{\\text{run}} = \\frac{y_2 - y_1}{x_2 - x_1}$$\n\nIt does not matter which point you call "point 1" — just subtract in the same order on top and bottom.' },
      { widget: 'line-explorer' },
      '| Slope | Line | Example |\n|---|---|---|\n| positive | goes **up** to the right | $m = 2$: up $2$ for every $1$ across |\n| negative | goes **down** to the right | $m = -\\tfrac12$: down $1$ for every $2$ across |\n| zero | **horizontal** (flat) | $y = 4$ |\n| undefined | **vertical** (run is $0$, and you cannot divide by $0$) | $x = 3$ |',
      { svg: V.graph({ xmin: -5, xmax: 5, ymin: -5, ymax: 5, width: 340, id: 'slopes', fns: [{ f: x => 2 * x - 1, label: 'm = 2' }, { f: x => -x / 2 + 1, color: 'var(--viz-2)', label: 'm = −½' }, { f: x => 3, color: 'var(--viz-3)', label: 'm = 0' }], segments: [{ x1: -3, y1: -5, x2: -3, y2: 5, color: 'var(--viz-4)', label: 'undefined', dx: 6, dy: -40 }] }), caption: 'Steeper lines have bigger slopes (ignoring sign). A vertical line has no slope at all.' },

      { h: 'Writing the equation of a line' },
      'There are several forms. They all describe the same lines — pick whichever matches the information you have.',
      { key: 'Point–slope form (use when you know a point and the slope)', md: '$$y - y_1 = m(x - x_1)$$\n\nThis is just the slope formula rearranged: any other point $(x, y)$ on the line must satisfy $\\dfrac{y - y_1}{x - x_1} = m$.' },
      { key: 'Slope–intercept form (use to read off the slope and where it crosses the y-axis)', md: '$$y = mx + b$$\n\n$m$ is the slope and $b$ is the **$y$-intercept** — the line passes through $(0, b)$. To get this form from any other, just **solve for $y$**.' },
      { key: 'General (standard) form', md: '$$Ax + By = C \\qquad\\text{or}\\qquad Ax + By + C = 0$$\n\nUsually written with whole-number coefficients and $A \\ge 0$. Its slope is $m = -\\dfrac{A}{B}$ (from solving for $y$).' },
      { example: {
        title: 'From a point and a slope to standard form',
        problem: 'Find the equation of the line through $(1, -3)$ with slope $-\\tfrac52$. Write it in standard form.',
        steps: [
          { text: 'Point–slope form with $x_1 = 1$, $y_1 = -3$, $m = -\\tfrac52$. Note $y - (-3) = y + 3$.', math: 'y + 3 = -\\tfrac52(x - 1)' },
          { text: 'Clear the fraction: multiply everything by $2$.', math: '2y + 6 = -5(x - 1) = -5x + 5' },
          { text: 'Move the $x$ term to the left and the number to the right.', math: '5x + 2y = -1' }
        ], answer: '$5x + 2y = -1$' } },
      { tip: 'Two points? Find the slope first', md: 'For the line through $(-1, 2)$ and $(3, 4)$: $m = \\dfrac{4 - 2}{3 - (-1)} = \\dfrac{2}{4} = \\dfrac12$. Then use point–slope with **either** point: $y - 2 = \\tfrac12(x + 1)$, which tidies to $x - 2y = -5$.' },
      { key: 'Horizontal and vertical lines', md: '- **Horizontal** through $(a, b)$: every point has the same $y$, so the equation is $y = b$. Slope $0$.\n- **Vertical** through $(a, b)$: every point has the same $x$, so the equation is $x = a$. Slope undefined.\n\nThrough $(3, 4)$: horizontal line $y = 4$, vertical line $x = 3$.' },

      { h: 'Reading a line from its equation' },
      'To find the slope and $y$-intercept of $3y - 2x = 1$, **solve for $y$**: $3y = 2x + 1$, so $y = \\tfrac23 x + \\tfrac13$. Slope $\\tfrac23$, $y$-intercept $\\tfrac13$.',
      'To sketch $2x - 3y - 12 = 0$ quickly, find the **intercepts**: $y = 0$ gives $x = 6$; $x = 0$ gives $y = -4$. Plot $(6, 0)$ and $(0, -4)$ and join them.',
      { svg: V.graph({ xmin: -2, xmax: 8, ymin: -6, ymax: 3, width: 340, id: 'ints', fns: [{ f: x => (2 * x - 12) / 3, label: '2x − 3y − 12 = 0' }], points: [{ x: 6, y: 0, label: '(6, 0)' }, { x: 0, y: -4, label: '(0, −4)', dx: 8 }] }), caption: 'Two intercepts are enough to draw the line. Its slope is $-\\tfrac{A}{B} = -\\tfrac{2}{-3} = \\tfrac23$.' },

      { h: 'Parallel and perpendicular lines' },
      { key: 'Parallel', md: 'Two lines are **parallel** exactly when they have the **same slope**. (Two vertical lines are also parallel.)' },
      { key: 'Perpendicular', md: 'Two lines (neither vertical) are **perpendicular** exactly when their slopes multiply to $-1$:\n\n$$m_1 m_2 = -1 \\qquad\\text{i.e.}\\qquad m_2 = -\\frac{1}{m_1}$$\n\nFlip the fraction **and** change the sign: a slope of $\\tfrac23$ is perpendicular to $-\\tfrac32$; a slope of $-2$ is perpendicular to $\\tfrac12$.' },
      { svg: V.graph({ xmin: -5, xmax: 5, ymin: -5, ymax: 5, width: 340, id: 'perp', fns: [{ f: x => 2 * x / 3 + 1, label: 'm = ⅔' }, { f: x => 2 * x / 3 - 2, label: 'parallel, m = ⅔', color: 'var(--viz-1)', dashed: true }, { f: x => -3 * x / 2 + 1, color: 'var(--viz-2)', label: 'perpendicular, m = −³⁄₂', labelAt: -2.5 }] }), caption: 'Parallel lines never meet — same slope. The perpendicular line has the flipped, opposite-sign slope.' },
      { example: {
        title: 'A perpendicular line through a point',
        problem: 'Find the equation of the line through $(-1, 3)$ that is perpendicular to $2x + y + 1 = 0$.',
        steps: [
          { text: 'Find the slope of the given line by solving for $y$.', math: 'y = -2x - 1 \\quad\\Rightarrow\\quad m_1 = -2' },
          { text: 'Perpendicular slope: flip and change sign.', math: 'm_2 = -\\frac{1}{-2} = \\frac12' },
          { text: 'Point–slope form through $(-1, 3)$.', math: 'y - 3 = \\tfrac12(x + 1)' },
          { text: 'Tidy (multiply by $2$).', math: '2y - 6 = x + 1 \\;\\Rightarrow\\; x - 2y = -7' }
        ], answer: '$x - 2y = -7$ (or $y = \\tfrac12 x + \\tfrac72$)' } }
    ],

    examples: [
      { title: 'Slope from two points',
        problem: 'Find the slope of the line through $(-1, 2)$ and $(3, 4)$.',
        steps: [
          { text: 'Rise over run, subtracting in the same order.', math: 'm = \\frac{4 - 2}{3 - (-1)} = \\frac{2}{4} = \\frac12' }
        ], answer: '$m = \\tfrac12$' },
      { title: 'Line through two points',
        problem: 'Find an equation of the line through $(-1, 2)$ and $(3, 4)$, in standard form.',
        steps: [
          { text: 'Slope first (from the previous example): $m = \\tfrac12$.' },
          { text: 'Point–slope with $(-1, 2)$.', math: 'y - 2 = \\tfrac12(x + 1)' },
          { text: 'Multiply by $2$ and rearrange.', math: '2y - 4 = x + 1 \\;\\Rightarrow\\; x - 2y = -5' }
        ], answer: '$x - 2y = -5$' },
      { title: 'Slope and intercept from an equation',
        problem: 'Find the slope and $y$-intercept of (a) $y = 3x - 2$ and (b) $3y - 2x = 1$.',
        steps: [
          { text: '(a) Already in $y = mx + b$ form.', math: 'm = 3, \\quad b = -2' },
          { text: '(b) Solve for $y$.', math: '3y = 2x + 1 \\;\\Rightarrow\\; y = \\tfrac23 x + \\tfrac13 \\;\\Rightarrow\\; m = \\tfrac23, \\quad b = \\tfrac13' }
        ], answer: '(a) $m = 3$, $b = -2$ &nbsp; (b) $m = \\tfrac23$, $b = \\tfrac13$' },
      { title: 'Horizontal and vertical lines',
        problem: 'Find the equations of the horizontal and the vertical line through $(3, 4)$.',
        steps: [
          { text: 'Horizontal: every point has $y = 4$.', math: 'y = 4' },
          { text: 'Vertical: every point has $x = 3$.', math: 'x = 3' }
        ], answer: '$y = 4$ and $x = 3$' },
      { title: 'Slope from the general form',
        problem: 'Find the slope of $5y = -2x + 3$ and of $2x + 5y - 3 = 0$.',
        steps: [
          { text: 'First one: divide by $5$.', math: 'y = -\\tfrac25 x + \\tfrac35 \\;\\Rightarrow\\; m = -\\tfrac25' },
          { text: 'Second one: use $m = -\\tfrac{A}{B}$ with $A = 2$, $B = 5$ — or solve for $y$ again.', math: 'm = -\\tfrac25' },
          { text: 'They have the same slope, so the two lines are parallel (in fact, they are the same line).' }
        ], answer: 'Both have slope $-\\tfrac25$' },
      { title: 'A parallel line through a point',
        problem: 'Find the equation of the line through $(5, 2)$ parallel to $4x + 6y + 5 = 0$.',
        steps: [
          { text: 'Slope of the given line.', math: 'm = -\\frac{A}{B} = -\\frac{4}{6} = -\\frac23' },
          { text: 'Parallel means the same slope. Point–slope through $(5, 2)$.', math: 'y - 2 = -\\tfrac23(x - 5)' },
          { text: 'Multiply by $3$ and tidy.', math: '3y - 6 = -2x + 10 \\;\\Rightarrow\\; 2x + 3y = 16' }
        ], answer: '$2x + 3y = 16$' }
    ],

    exercises: [
      { id: '1.10-e1', prompt: 'Find the slope of the line through $(-1, 2)$ and $(3, 4)$.',
        answer: { type: 'number', value: 0.5, display: '\\tfrac12' },
        hints: ['$m = \\dfrac{y_2 - y_1}{x_2 - x_1}$.'],
        solution: [{ math: 'm = \\frac{4 - 2}{3 - (-1)} = \\frac{2}{4} = \\frac12' }] },
      { id: '1.10-e2', prompt: 'Find the equation of the line through $(1, -3)$ with slope $-\\dfrac52$. Give it in standard form $Ax + By = C$.',
        answer: { type: 'equation', value: '5x + 2y = -1' },
        hints: ['Point–slope: $y + 3 = -\\tfrac52(x - 1)$.', 'Multiply by $2$ to clear the fraction, then move terms.'],
        solution: [{ math: 'y + 3 = -\\tfrac52(x - 1) \\Rightarrow 2y + 6 = -5x + 5 \\Rightarrow 5x + 2y = -1' }] },
      { id: '1.10-e3', prompt: 'Find the equation of the line through $(-1, 2)$ and $(3, 4)$ in standard form.',
        answer: { type: 'equation', value: 'x - 2y = -5' },
        hints: ['Slope first: $m = \\tfrac12$.', 'Then point–slope with either point.'],
        solution: [{ math: 'y - 2 = \\tfrac12(x + 1) \\Rightarrow 2y - 4 = x + 1 \\Rightarrow x - 2y = -5' }] },
      { id: '1.10-e4', prompt: 'Find the slope and $y$-intercept of $3y - 2x = 1$.',
        answer: { type: 'multi', parts: [{ label: 'Slope $m$', type: 'number', value: 2 / 3, display: '\\tfrac23' }, { label: '$y$-intercept $b$', type: 'number', value: 1 / 3, display: '\\tfrac13' }] },
        hints: ['Solve for $y$.'],
        solution: [{ math: 'y = \\tfrac23 x + \\tfrac13 \\Rightarrow m = \\tfrac23,\\ b = \\tfrac13' }] },
      { id: '1.10-e5', prompt: 'Write the equation of the **horizontal** line through $(3, 4)$.',
        answer: { type: 'equation', value: 'y = 4' },
        hints: ['On a horizontal line every point has the same $y$-coordinate.'],
        solution: ['$y = 4$'] },
      { id: '1.10-e6', prompt: 'Write the equation of the **vertical** line through $(3, 4)$.',
        answer: { type: 'equation', value: 'x = 3' },
        hints: ['On a vertical line every point has the same $x$-coordinate.'],
        solution: ['$x = 3$'] },
      { id: '1.10-e7', prompt: 'Find the slope of the line $5y = -2x + 3$.',
        answer: { type: 'number', value: -0.4, display: '-\\tfrac25' },
        hints: ['Divide everything by $5$ to get $y = mx + b$.'],
        solution: [{ math: 'y = -\\tfrac25 x + \\tfrac35 \\Rightarrow m = -\\tfrac25' }] },
      { id: '1.10-e8', prompt: 'For the line $2x - 3y - 12 = 0$, find the $x$-intercept, the $y$-intercept and the slope.',
        answer: { type: 'multi', parts: [{ label: '$x$-intercept', type: 'number', value: 6 }, { label: '$y$-intercept', type: 'number', value: -4 }, { label: 'Slope', type: 'number', value: 2 / 3, display: '\\tfrac23' }] },
        hints: ['$y = 0$ for the $x$-intercept; $x = 0$ for the $y$-intercept.', 'Slope $= -\\tfrac{A}{B}$ with $A = 2$, $B = -3$.'],
        solution: ['$y = 0$: $2x = 12$, $x = 6$. $x = 0$: $-3y = 12$, $y = -4$. Slope: $y = \\tfrac23 x - 4$, so $m = \\tfrac23$.'] },
      { id: '1.10-e9', prompt: 'Find the equation of the line through $(5, 2)$ that is **parallel** to $4x + 6y + 5 = 0$.',
        answer: { type: 'equation', value: '2x + 3y = 16' },
        hints: ['Slope of the given line: $-\\tfrac{4}{6} = -\\tfrac23$. Parallel → same slope.', '$y - 2 = -\\tfrac23(x - 5)$'],
        solution: [{ math: 'y - 2 = -\\tfrac23(x - 5) \\Rightarrow 3y - 6 = -2x + 10 \\Rightarrow 2x + 3y = 16' }] },
      { id: '1.10-e10', prompt: 'Find the equation of the line through $(-1, 3)$ that is **perpendicular** to $2x + y + 1 = 0$.',
        answer: { type: 'equation', value: 'x - 2y = -7' },
        hints: ['Given slope $-2$. Perpendicular slope: flip and change sign → $\\tfrac12$.', '$y - 3 = \\tfrac12(x + 1)$'],
        solution: [{ math: 'y - 3 = \\tfrac12(x + 1) \\Rightarrow 2y - 6 = x + 1 \\Rightarrow x - 2y = -7' }] },
      { id: '1.10-e11', prompt: 'Are the lines $3x - y = 2$ and $x + 3y = 5$ parallel, perpendicular, or neither?',
        answer: { type: 'choice', value: 'perp', options: [{ id: 'par', label: 'Parallel' }, { id: 'perp', label: 'Perpendicular' }, { id: 'neither', label: 'Neither' }], wrongMessage: 'Find both slopes: $3$ and $-\\tfrac13$. Multiply them.' },
        hints: ['Find each slope by solving for $y$.', '$m_1 = 3$, $m_2 = -\\tfrac13$. What is $m_1 m_2$?'],
        solution: ['$3x - y = 2 \\Rightarrow y = 3x - 2$, slope $3$. $x + 3y = 5 \\Rightarrow y = -\\tfrac13 x + \\tfrac53$, slope $-\\tfrac13$. Since $3 \\cdot (-\\tfrac13) = -1$, they are perpendicular.'] },
      { id: '1.10-e12', prompt: 'Find the equation of the line through the origin that is perpendicular to $y = -\\dfrac32 x + 1$.',
        answer: { type: 'equation', value: 'y = 2/3 x' },
        hints: ['Perpendicular slope to $-\\tfrac32$ is $\\tfrac23$.', 'Through $(0, 0)$: $y - 0 = \\tfrac23(x - 0)$.'],
        solution: [{ math: 'y = \\tfrac23 x \\quad (\\text{or } 2x - 3y = 0)' }] }
    ],

    generators: [
      { id: '1.10-g-slope', title: 'Slope from two points', desc: 'Rise over run.',
        make(r) {
          const x1 = r.int(-6, 6), y1 = r.int(-6, 6); let x2 = r.int(-6, 6), y2 = r.int(-6, 6);
          if (x2 === x1) x2 += 2;
          const f = M.frac(y2 - y1, x2 - x1);
          return { prompt: 'Find the slope of the line through $' + pt(x1, y1) + '$ and $' + pt(x2, y2) + '$.', answer: { type: 'number', value: (y2 - y1) / (x2 - x1), display: fr(f.n, f.d) },
            hints: ['$m = \\dfrac{y_2 - y_1}{x_2 - x_1}$ — subtract in the same order top and bottom.'], solution: [{ math: 'm = \\frac{' + y2 + ' - (' + y1 + ')}{' + x2 + ' - (' + x1 + ')} = \\frac{' + (y2 - y1) + '}{' + (x2 - x1) + '} = ' + fr(f.n, f.d) }] };
        } },
      { id: '1.10-g-pointslope', title: 'Line from a point and a slope', desc: 'Point–slope form, then tidy up.',
        make(r) {
          const x1 = r.int(-5, 5), y1 = r.int(-5, 5);
          const d = r.pick([1, 1, 2, 3, 4, 5]), n = r.nz(-5, 5);
          const f = M.frac(n, d);
          const L = standardForm(x1, y1, f.n, f.d);
          return { prompt: 'Find the equation of the line through $' + pt(x1, y1) + '$ with slope $' + fr(f.n, f.d) + '$. Give it in standard form $Ax + By = C$ (any equivalent form is accepted).', answer: { type: 'equation', value: lineStr(L), display: lineTex(L) },
            hints: ['Start with $y - y_1 = m(x - x_1)$.', 'Multiply through by the denominator of the slope to clear fractions, then move the $x$ term across.'],
            solution: [{ math: 'y - (' + y1 + ') = ' + fr(f.n, f.d) + '(x - (' + x1 + '))', text: 'Point–slope form.' }, { math: lineTex(L), text: (f.d > 1 ? 'Multiply by $' + f.d + '$, then rearrange.' : 'Rearrange.') }] };
        } },
      { id: '1.10-g-twopoints', title: 'Line through two points', desc: 'Slope first, then point–slope.',
        make(r) {
          const x1 = r.int(-5, 5), y1 = r.int(-5, 5); let x2 = r.int(-5, 5), y2 = r.int(-5, 5);
          if (x2 === x1) x2 += 3; if (y2 === y1) y2 += 2;
          const f = M.frac(y2 - y1, x2 - x1);
          const L = standardForm(x1, y1, f.n, f.d);
          return { prompt: 'Find the equation of the line through $' + pt(x1, y1) + '$ and $' + pt(x2, y2) + '$.', answer: { type: 'equation', value: lineStr(L), display: lineTex(L) },
            hints: ['Find the slope: $m = \\dfrac{' + y2 + ' - (' + y1 + ')}{' + x2 + ' - (' + x1 + ')} = ' + fr(f.n, f.d) + '$.', 'Then use point–slope with either point.'],
            solution: [{ math: 'm = \\frac{' + (y2 - y1) + '}{' + (x2 - x1) + '} = ' + fr(f.n, f.d), text: 'Slope.' }, { math: 'y - (' + y1 + ') = ' + fr(f.n, f.d) + '(x - (' + x1 + ')) \\;\\Rightarrow\\; ' + lineTex(L), text: 'Point–slope, then tidy.' }] };
        } },
      { id: '1.10-g-read', title: 'Slope and intercept from an equation', desc: 'Solve for y.',
        make(r) {
          const A = r.nz(-6, 6), B = r.nz(-6, 6), Cc = r.nz(-10, 10);
          const m = M.frac(-A, B), b = M.frac(Cc, B);
          const eq = r.bool() ? M.polyTex([A, 0]) + ' ' + (B > 0 ? '+ ' : '- ') + (Math.abs(B) === 1 ? '' : Math.abs(B)) + 'y = ' + Cc : (Math.abs(B) === 1 ? (B < 0 ? '-' : '') : B) + 'y = ' + M.polyTex([-A, Cc]);
          return { prompt: 'Find the slope and the $y$-intercept of the line $' + eq + '$.', answer: { type: 'multi', parts: [{ label: 'Slope $m$', type: 'number', value: -A / B, display: fr(m.n, m.d) }, { label: '$y$-intercept $b$', type: 'number', value: Cc / B, display: fr(b.n, b.d) }] },
            hints: ['Get $y$ by itself: $y = mx + b$.'], solution: [{ math: 'y = ' + fr(m.n, m.d) + 'x ' + (b.n >= 0 ? '+ ' : '- ') + fr(Math.abs(b.n), b.d) + ' \\;\\Rightarrow\\; m = ' + fr(m.n, m.d) + ',\\ b = ' + fr(b.n, b.d), text: 'Solve for $y$ and read off.' }] };
        } },
      { id: '1.10-g-parperp', title: 'Parallel and perpendicular lines', desc: 'Same slope, or flipped and negated.',
        make(r) {
          const A = r.pick([1, 2, 3, 4, 5]), B = r.nz(-5, 5), Cc = r.int(-8, 8);
          const x1 = r.int(-5, 5), y1 = r.int(-5, 5);
          const perp = r.bool();
          const m0 = M.frac(-A, B);
          const m = perp ? M.frac(-m0.d, m0.n) : m0;
          const L = standardForm(x1, y1, m.n, m.d);
          const given = M.polyTex([A, 0]) + ' ' + (B > 0 ? '+ ' : '- ') + (Math.abs(B) === 1 ? '' : Math.abs(B)) + 'y ' + (Cc >= 0 ? '+ ' + Cc : '- ' + (-Cc)) + ' = 0';
          return { prompt: 'Find the equation of the line through $' + pt(x1, y1) + '$ that is **' + (perp ? 'perpendicular' : 'parallel') + '** to $' + given + '$.', answer: { type: 'equation', value: lineStr(L), display: lineTex(L) },
            hints: ['Slope of the given line: $-\\tfrac{A}{B} = ' + fr(m0.n, m0.d) + '$.', perp ? 'Perpendicular slope: flip it and change the sign → $' + fr(m.n, m.d) + '$.' : 'Parallel → use the same slope $' + fr(m.n, m.d) + '$.', 'Then point–slope through $' + pt(x1, y1) + '$.'],
            solution: [{ math: 'm_{\\text{given}} = ' + fr(m0.n, m0.d) + (perp ? ' \\;\\Rightarrow\\; m_\\perp = ' + fr(m.n, m.d) : ' \\;\\Rightarrow\\; m_\\parallel = ' + fr(m.n, m.d)), text: 'Find the slope you need.' }, { math: 'y - (' + y1 + ') = ' + fr(m.n, m.d) + '(x - (' + x1 + ')) \\;\\Rightarrow\\; ' + lineTex(L), text: 'Point–slope, then tidy.' }] };
        } },
      { id: '1.10-g-classify', title: 'Parallel, perpendicular or neither?', desc: 'Compare the slopes.',
        make(r) {
          const A1 = r.nz(-4, 4), B1 = r.nz(-4, 4), C1 = r.int(-6, 6);
          const kind = r.pick(['par', 'perp', 'neither']);
          let A2, B2;
          if (kind === 'par') { const k = r.pick([-2, 2, 3]); A2 = k * A1; B2 = k * B1; }
          else if (kind === 'perp') { A2 = -B1; B2 = A1; if (r.bool()) { A2 = -A2; B2 = -B2; } }
          else { A2 = r.nz(-4, 4); B2 = r.nz(-4, 4); if (A2 * B1 === A1 * B2 || A1 * A2 + B1 * B2 === 0) return this.make(r); }
          const C2 = r.int(-6, 6);
          const eq = (A, B, Cc) => M.polyTex([A, 0]) + ' ' + (B > 0 ? '+ ' : '- ') + (Math.abs(B) === 1 ? '' : Math.abs(B)) + 'y = ' + Cc;
          const m1 = M.frac(-A1, B1), m2 = M.frac(-A2, B2);
          return { prompt: 'Are the lines $' + eq(A1, B1, C1) + '$ and $' + eq(A2, B2, C2) + '$ parallel, perpendicular, or neither?', answer: { type: 'choice', value: kind, options: [{ id: 'par', label: 'Parallel' }, { id: 'perp', label: 'Perpendicular' }, { id: 'neither', label: 'Neither' }], wrongMessage: 'Slopes: $' + fr(m1.n, m1.d) + '$ and $' + fr(m2.n, m2.d) + '$. Equal → parallel; product $-1$ → perpendicular.' },
            hints: ['Find both slopes ($m = -A/B$).', 'Same slope → parallel. Product $-1$ → perpendicular.'],
            solution: ['Slopes are $' + fr(m1.n, m1.d) + '$ and $' + fr(m2.n, m2.d) + '$. ' + (kind === 'par' ? 'They are equal, so the lines are parallel.' : kind === 'perp' ? 'Their product is $-1$, so the lines are perpendicular.' : 'They are not equal and their product is not $-1$: neither.')] };
        } },
      { id: '1.10-g-hv', title: 'Horizontal and vertical lines', desc: 'y = b or x = a.',
        make(r) {
          const a = r.int(-6, 6), b = r.int(-6, 6), horiz = r.bool();
          return { prompt: 'Write the equation of the **' + (horiz ? 'horizontal' : 'vertical') + '** line through $' + pt(a, b) + '$.', answer: { type: 'equation', value: horiz ? 'y = ' + b : 'x = ' + a },
            hints: [horiz ? 'Every point on a horizontal line has the same $y$-coordinate.' : 'Every point on a vertical line has the same $x$-coordinate.'], solution: [horiz ? '$y = ' + b + '$ (slope $0$).' : '$x = ' + a + '$ (slope undefined).'] };
        } }
    ]
  });
})();
