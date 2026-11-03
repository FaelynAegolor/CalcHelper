/* 1.11 Solving Equations and Inequalities Graphically
   Stewart 7e §1.11. Not on either midterm, so no `exam` field. */
(function () {
  const M = CH.M, V = CH.V;

  /* Pictures for the questions — this whole section is about reading graphs, so
     every question that talks about a graph shows it. */
  // y = f(x) crossing the x-axis at a and b (a U through both, or an upside-down one)
  function rootsPic(a, b, up) {
    const k = (up === false ? -1 : 1) * 3 / Math.pow((b - a) / 2, 2), f = x => k * (x - a) * (x - b);
    const x0 = Math.min(a, b) - 2, x1 = Math.max(a, b) + 2, ext = f((a + b) / 2);
    return V.graph({ xmin: x0, xmax: x1, ymin: Math.min(-1, Math.floor(ext)) - 1, ymax: Math.max(1, Math.ceil(ext)) + 2, width: 300, height: 220,
      fns: [{ f, label: 'f' }], points: [{ x: a, y: 0, label: String(a) }, { x: b, y: 0, label: String(b) }],
      alt: 'The graph of y = f(x), crossing the x-axis at x = ' + a + ' and x = ' + b });
  }
  // a line g and a curve f crossing at p and q; f is below g between them when fBelow
  function twoPic(p, q, fBelow) {
    const gf = x => 0.5 * x + 1, kk = (fBelow ? 1 : -1) * 3 / Math.pow((q - p) / 2, 2), ff = x => gf(x) + kk * (x - p) * (x - q);
    const x0 = p - 3, x1 = q + 3, mid = ff((p + q) / 2), gl = [gf(x0), gf(x1)];
    const yLo = Math.floor(Math.min(mid, ...gl)) - 2, yHi = Math.ceil(Math.max(mid, ...gl)) + 2;
    return V.graph({ xmin: x0, xmax: x1, ymin: yLo, ymax: yHi, width: 300, height: 260,
      fns: [{ f: gf, label: 'g' }, { f: ff, color: 'var(--viz-2)' }],
      points: [{ x: p, y: gf(p), label: 'x = ' + p }, { x: q, y: gf(q), label: 'x = ' + q }],
      texts: [{ x: (p + q) / 2, y: mid + (fBelow ? -0.8 : 0.8), text: 'f', color: 'var(--viz-2)' }],
      alt: 'A line g and a curve f that cross at x = ' + p + ' and x = ' + q + ', with f ' + (fBelow ? 'below' : 'above') + ' g between the crossings' });
  }

  CH.registerSection({
    id: '1.11', chapter: 1, title: 'Solving Equations and Inequalities Graphically',
    summary: 'Finding solutions by looking instead of rearranging: where a graph crosses the axis, where two graphs meet, and which stretches of $x$ make an inequality true.',

    theory: [
      { short: true, md: 'Everything you solved in 1.5 and 1.8 can also be **read off a picture**.\n\n- Solutions of $f(x) = 0$ are where the graph **crosses the $x$-axis**.\n- Solutions of $f(x) = g(x)$ are where the two graphs **cross each other**.\n- $f(x) < g(x)$ holds wherever the graph of $f$ is **below** the graph of $g$.\n- The graphical answer is often approximate — but it works on equations that algebra cannot touch.' },

      { h: 'Why bother, when you can just solve it?' },
      'Two reasons. First, a picture shows you **how many** solutions there are before you find any, which is a useful check on algebra. Second, plenty of equations cannot be solved by rearranging at all — and then a graph is the only way in.',
      { note: 'Exact versus approximate', md: 'Algebra gives exact answers like $x = \\tfrac{3}{7}$ or $x = 1+\\sqrt5$. A graph usually gives something like "about $3.24$".\n\nNeither is better; they answer different questions. If a problem says "solve exactly", use algebra. If it says "estimate" or "use a graph", reading the picture is the method being asked for.' },

      { h: 'Solving $f(x) = 0$' },
      { key: 'Look where it crosses the $x$-axis', md: 'On the $x$-axis the height is zero. So the solutions of $f(x) = 0$ are exactly the $x$-values where the graph touches or crosses that axis.\n\nThese have three names, all meaning the same thing: **solutions**, **roots**, and **$x$-intercepts**.' },
      { svg: V.graph({ xmin: -4, xmax: 5, ymin: -5, ymax: 5, width: 320, fns: [{ f: x => (x + 2) * (x - 3) / 2 }], points: [{ x: -2, y: 0, label: 'x = -2' }, { x: 3, y: 0, label: 'x = 3', dx: 6 }], alt: 'A parabola crossing the x-axis at -2 and 3' }),
        caption: 'This curve meets the axis twice, so the equation has two solutions: $x=-2$ and $x=3$.' },
      { tip: 'Counting before solving', md: 'A quick sketch tells you how many answers to expect. If your algebra produces three solutions but the curve only crosses twice, one of them is extraneous — exactly the kind of slip the radical equations in 1.5 can produce.' },

      { h: 'Solving $f(x) = g(x)$' },
      { key: 'Look where the two graphs cross', md: 'Draw both. Wherever they meet, the two heights are equal at the same $x$ — and that is precisely what $f(x) = g(x)$ says.\n\nThe $x$-coordinate of each crossing is a solution. The height tells you nothing about the answer; ignore it.' },
      { tip: 'Or move everything to one side', md: 'The two methods are the same underneath. Solving $f(x) = g(x)$ is the same as solving $f(x) - g(x) = 0$ — so you can either draw two graphs and find the crossings, or draw one graph and find its $x$-intercepts.\n\nUse whichever is easier to sketch.' },
      { example: {
        title: 'Two ways to the same answer', label: 'Worked example',
        problem: 'Solve $x^2 = x + 2$ graphically.',
        steps: [
          { text: '**Method 1.** Draw $y = x^2$ and $y = x+2$ and find where they cross.' },
          { text: 'The parabola and the line meet at $x = -1$ and $x = 2$.' },
          { text: '**Method 2.** Move everything to one side first.', math: 'x^2 - x - 2 = 0' },
          { text: 'Draw $y = x^2-x-2$ and find where it crosses the axis — the same two values.' },
          { text: 'Check by factoring: $(x-2)(x+1) = 0$. ✓ Same answers, exactly.' }
        ],
        answer: '$x = -1$ and $x = 2$',
        checklist: ['Either draw both sides and find crossings...', '...or move everything one side and find intercepts.', 'Read the $x$-coordinates, not the heights.', 'Check against algebra when you can.']
      } },

      { h: 'Solving inequalities by eye' },
      { key: 'Which graph is on top?', md: 'Once the crossings are marked, an inequality is just a question about which curve is higher.\n\n- $f(x) < g(x)$ → the stretch of $x$ where $f$ is **below** $g$\n- $f(x) > g(x)$ → where $f$ is **above** $g$\n\nThe crossings are the boundaries. Include them for $\\le$ and $\\ge$, exclude them for strict $<$ and $>$.' },
      { svg: V.graph({ xmin: -4, xmax: 5, ymin: -3, ymax: 7, width: 340, fns: [{ f: x => x * x, label: 'y = x²', color: 'var(--viz-1)' }, { f: x => x + 2, label: 'y = x+2', color: 'var(--viz-2)' }], points: [{ x: -1, y: 1 }, { x: 2, y: 4 }], shade: [{ x1: -1, y1: -3, x2: 2, y2: 7, color: 'var(--viz-3)' }], alt: 'A parabola and a line crossing at x = -1 and x = 2, with the region between shaded' }),
        caption: 'Between the crossings the line is above the parabola, so $x^2 < x+2$ exactly on $(-1, 2)$.' },
      { warn: 'Answer with $x$ values, not heights', md: 'The solution of an inequality is a set of **inputs** — a stretch along the horizontal axis. It is never a set of heights.\n\nIf your answer mentions a $y$ value, you have read the wrong axis.' },

      { calm: true, md: 'This section asks you to do something you may already do without noticing: look at a picture and say which line is higher. That really is the whole skill.\n\nIt is also a free check on everything else. Solve an equation with algebra, then sketch it roughly and count the crossings. If the counts disagree, you have found a mistake without anyone marking your work — which is the most useful thing a method can do for you.\n\nNothing here needs a graphing calculator. A rough sketch with the right shape and the right crossings is enough.' },

      { sid: '1.11', title: 'Can I do this?',
        intro: 'Tick these off when you are sure. Nothing here is marked — it is just for you to see what is solid and what still needs another go.',
        checklist: [
          'Say why the solutions of $f(x)=0$ are the $x$-intercepts',
          'Use the words solution, root and $x$-intercept as the same thing',
          'Solve $f(x)=g(x)$ by finding where two graphs cross',
          'Rewrite $f(x)=g(x)$ as $f(x)-g(x)=0$ and use intercepts instead',
          'Read an inequality off a picture by asking which graph is higher',
          'Give the answer as an interval of $x$, not of heights',
          'Include or exclude the crossings depending on whether the sign is strict',
          'Use a sketch to check how many solutions your algebra should produce'
        ] }
    ],

    examples: [
      { title: 'Reading an inequality off two graphs',
        problem: 'The graphs of $y = x^2$ and $y = x+2$ cross at $x=-1$ and $x=2$. Solve $x^2 \\le x+2$.',
        steps: [
          { text: 'The crossings are the boundaries, at $x=-1$ and $x=2$.' },
          { text: 'The question asks where $x^2$ is **below or equal to** $x+2$ — where the parabola is not above the line.' },
          { text: 'Between the crossings the line is on top, so that is the stretch you want.' },
          { text: 'The sign is $\\le$, so the crossings themselves count.', math: '[-1, 2]' }
        ],
        answer: '$[-1, 2]$',
        checklist: ['Mark the crossings.', 'Decide which graph should be higher.', 'Read off that stretch of $x$.', 'Square brackets for $\\le$, round for $<$.'] },

      { title: 'Counting solutions before solving',
        problem: 'Without solving, how many solutions does $x^2 + 4 = 0$ have? Use a sketch.',
        steps: [
          { text: 'Sketch $y = x^2 + 4$: the usual U, lifted $4$ units up.' },
          { text: 'Its lowest point is at $(0,4)$, which is already above the axis.' },
          { text: 'So the curve never reaches the $x$-axis at all.' },
          { text: 'No crossings means no real solutions — which matches the discriminant being negative in 1.5.' }
        ],
        answer: 'None',
        checklist: ['Sketch the shape.', 'Find the turning point.', 'See whether the curve reaches the axis.', 'No crossings means no real solutions.'] }
    ],

    exercises: [
      { id: '1.11-e1', prompt: 'The graph of $y = f(x)$ is shown. It crosses the $x$-axis at $x = -3$ and $x = 5$. Give the solutions of $f(x) = 0$ as a set.',
        svg: rootsPic(-3, 5),
        answer: { type: 'set', value: [-3, 5], vars: ['x'] },
        hints: ['Crossing the $x$-axis means the height is zero there.', 'So the crossings are exactly the solutions.'],
        solution: [{ text: 'The $x$-intercepts are the solutions.', math: '\\{-3,\\ 5\\}' }] },

      { id: '1.11-e2', prompt: 'The graphs of $f$ and $g$ cross at $x = 1$ and $x = 4$. Give the solutions of $f(x) = g(x)$ as a set.',
        svg: twoPic(1, 4, true),
        answer: { type: 'set', value: [1, 4], vars: ['x'] },
        hints: ['Where the graphs cross, the two heights are equal.', 'Read the $x$-coordinates of the crossings.'],
        solution: [{ text: 'The crossings give the solutions.', math: '\\{1,\\ 4\\}' }] },

      { id: '1.11-e3', prompt: 'The graphs of $y=x^2$ and $y=x+2$ cross at $x=-1$ and $x=2$, with the line above between them. Solve $x^2 < x+2$.',
        svg: V.graph({ xmin: -4, xmax: 4, ymin: -2, ymax: 8, width: 300, fns: [{ f: x => x * x, color: 'var(--viz-2)' }, { f: x => x + 2, color: 'var(--viz-1)' }], points: [{ x: -1, y: 1, label: '(-1, 1)' }, { x: 2, y: 4, label: '(2, 4)' }], texts: [{ x: -2.9, y: 7.4, text: 'y = x²', color: 'var(--viz-2)', anchor: 'end' }, { x: -3.8, y: 0.4, text: 'y = x + 2', color: 'var(--viz-1)', anchor: 'start' }], alt: 'The parabola y = x squared and the line y = x + 2, crossing at (-1, 1) and (2, 4), with the line above the parabola between them' }),
        answer: { type: 'interval', value: '(-1, 2)', vars: ['x'] },
        hints: ['You want where the parabola is **below** the line.', 'That is between the crossings.', 'Strict $<$, so the crossings are excluded.'],
        solution: [{ text: 'Between the crossings the line is on top.', math: '(-1, 2)' }] },

      { id: '1.11-e4', prompt: 'With the same two graphs, solve $x^2 \\ge x+2$.',
        svg: V.graph({ xmin: -4, xmax: 4, ymin: -2, ymax: 8, width: 300, fns: [{ f: x => x * x, color: 'var(--viz-2)' }, { f: x => x + 2, color: 'var(--viz-1)' }], points: [{ x: -1, y: 1, label: '(-1, 1)' }, { x: 2, y: 4, label: '(2, 4)' }], texts: [{ x: -2.9, y: 7.4, text: 'y = x²', color: 'var(--viz-2)', anchor: 'end' }, { x: -3.8, y: 0.4, text: 'y = x + 2', color: 'var(--viz-1)', anchor: 'start' }], alt: 'The parabola y = x squared and the line y = x + 2, crossing at (-1, 1) and (2, 4)' }),
        answer: { type: 'interval', value: '(-inf, -1] U [2, inf)', vars: ['x'] },
        hints: ['Now you want where the parabola is **above or equal to** the line.', 'That is outside the crossings — two separate stretches.', 'The sign is $\\ge$, so the crossings are included.'],
        solution: [{ text: 'Outside the crossings the parabola is on top.' },
          { text: 'Include the endpoints for $\\ge$.', math: '(-\\infty,-1] \\cup [2,\\infty)' }] },

      { id: '1.11-e5', prompt: 'How many real solutions does $x^2 + 4 = 0$ have?',
        answer: { type: 'number', value: 0 },
        hints: ['Sketch $y = x^2+4$ — a U lifted $4$ up.', 'Its lowest point is at height $4$, above the axis.', 'If it never reaches the axis, it never equals zero.'],
        solution: [{ text: 'The lowest point is $(0,4)$, so the curve stays above the axis.' },
          { text: 'No crossings, so no real solutions.', math: '0' }] },

      { id: '1.11-e6', prompt: 'How many real solutions does $x^2 - 9 = 0$ have?',
        answer: { type: 'number', value: 2 },
        hints: ['Sketch $y = x^2-9$ — a U pushed $9$ down.', 'Its lowest point is below the axis, so it must cross on the way back up — on both sides.'],
        solution: [{ text: 'The vertex sits at $(0,-9)$, below the axis, so the curve crosses twice.' },
          { text: 'Indeed $x = \\pm 3$.', math: '2' }] },

      { id: '1.11-e7', prompt: 'Rewrite the equation $x^2 = x + 2$ so that one side is zero. Enter the non-zero side in terms of $x$.',
        answer: { type: 'expression', value: 'x^2 - x - 2', vars: ['x'] },
        hints: ['Move everything from the right across to the left.', 'Subtract $x$ and subtract $2$.'],
        solution: [{ text: 'Move everything one side.', math: 'x^2 - x - 2 = 0' },
          { text: 'Now the solutions are the $x$-intercepts of $y = x^2-x-2$.' }] },

      { id: '1.11-e8', prompt: 'The graph shown is above the $x$-axis exactly on $(-2, 3)$. Solve $f(x) > 0$.',
        svg: rootsPic(-2, 3, false),
        answer: { type: 'interval', value: '(-2, 3)', vars: ['x'] },
        hints: ['$f(x) > 0$ means the height is positive — the graph is above the axis.', 'You are told exactly where that happens.'],
        solution: [{ text: 'Above the axis means a positive height.', math: '(-2, 3)' }] },

      { id: '1.11-e9', prompt: 'That same graph is above the axis on $(-2,3)$ and below it elsewhere, touching at $-2$ and $3$. Solve $f(x) \\le 0$.',
        svg: rootsPic(-2, 3, false),
        answer: { type: 'interval', value: '(-inf, -2] U [3, inf)', vars: ['x'] },
        hints: ['$f(x) \\le 0$ means at or below the axis.', 'That is everywhere outside $(-2,3)$, plus the two crossing points themselves.'],
        solution: [{ text: 'Below the axis is outside the interval; the crossings give equality.', math: '(-\\infty,-2] \\cup [3,\\infty)' }] },

      { id: '1.11-e10', prompt: 'The line $y = 2x - 1$ crosses the $x$-axis at one point. What is its $x$-intercept?',
        svg: V.graph({ xmin: -3, xmax: 3, ymin: -4, ymax: 4, width: 280, fns: [{ f: x => 2 * x - 1 }], alt: 'The line y = 2x - 1 crossing the x-axis between 0 and 1' }),
        answer: { type: 'number', value: 0.5 },
        hints: ['Set the height to zero: $2x - 1 = 0$.', 'Solve for $x$.'],
        solution: [{ text: 'Set $y = 0$.', math: '2x - 1 = 0 \\Rightarrow x = \\tfrac12' }] }
    ],

    generators: [
      { id: '1.11-g-intercepts', title: 'Solutions from the crossings', desc: 'Read the roots off a picture.',
        make(r) {
          const a = r.nz(-6, 6), b = r.nz(-6, 6);
          if (a === b) return this.make(r);
          const s = [a, b].sort((x, y) => x - y);
          return {
            prompt: 'The graph of $y = f(x)$ is shown. It crosses the $x$-axis at $x = ' + s[0] + '$ and $x = ' + s[1] + '$. Give the solutions of $f(x) = 0$ as a set.',
            svg: rootsPic(s[0], s[1], r.bool(0.5)),
            answer: { type: 'set', value: s, vars: ['x'] },
            hints: ['On the $x$-axis the height is zero.', 'So each crossing is a solution of $f(x)=0$.'],
            solution: [{ text: 'The $x$-intercepts are exactly the solutions.', math: '\\{' + s[0] + ',\\ ' + s[1] + '\\}' }]
          };
        } },

      { id: '1.11-g-inequality', title: 'Which graph is on top?', desc: 'Read an inequality off the crossings.',
        make(r) {
          const p = r.int(-5, 0), q = r.int(1, 6);
          const inside = r.bool(0.5);   // is f below g between the crossings?
          const strict = r.bool(0.5);
          const wantBelow = r.bool(0.5);
          const lo = strict ? '(' : '[', hi = strict ? ')' : ']';
          // f is below g between the crossings when `inside`
          const answerIsBetween = (wantBelow === inside);
          return {
            svg: twoPic(p, q, inside),
            prompt: 'The graphs of $f$ and $g$ cross at $x = ' + p + '$ and $x = ' + q + '$. Between the crossings, $f$ is **' + (inside ? 'below' : 'above') + '** $g$. Solve $f(x) ' + (wantBelow ? (strict ? '<' : '\\le') : (strict ? '>' : '\\ge')) + ' g(x)$.',
            answer: { type: 'interval',
              value: answerIsBetween ? lo + p + ', ' + q + hi : '(-inf, ' + p + hi + ' U ' + lo + q + ', inf)',
              vars: ['x'] },
            hints: ['Decide which graph the question wants on top.',
              'You are told what happens between the crossings; outside them it is the other way round.',
              strict ? 'The sign is strict, so the crossings are excluded.' : 'The sign allows equality, so the crossings are included.'],
            solution: [{ text: answerIsBetween ? 'The condition holds between the crossings.' : 'The condition holds outside the crossings, which is two stretches.' },
              { text: strict ? 'Crossings excluded.' : 'Crossings included.',
                math: answerIsBetween ? lo + p + ', ' + q + hi : '(-\\infty, ' + p + hi + ' \\cup ' + lo + q + ', \\infty)' }]
          };
        } },

      { id: '1.11-g-count', title: 'How many solutions?', desc: 'Count crossings from the shape.',
        make(r) {
          const k = r.nz(-9, 9);     // y = x^2 + k
          const n = k < 0 ? 2 : (k === 0 ? 1 : 0);
          return {
            prompt: 'How many real solutions does $x^2 ' + (k < 0 ? '- ' + (-k) : '+ ' + k) + ' = 0$ have? Use the shape of the graph.',
            answer: { type: 'number', value: n },
            hints: ['Sketch $y = x^2 ' + (k < 0 ? '- ' + (-k) : '+ ' + k) + '$ — a U moved ' + (k < 0 ? 'down' : 'up') + ' by $' + Math.abs(k) + '$.',
              'Its lowest point is at height $' + k + '$.',
              k < 0 ? 'The lowest point is below the axis, so the curve must cross on both sides.' : 'The lowest point is above the axis, so it never reaches it.'],
            solution: [{ text: 'The vertex sits at $(0, ' + k + ')$.' },
              { text: k < 0 ? 'Below the axis, so the curve crosses twice.' : 'Above the axis, so there are no crossings.', math: String(n) }]
          };
        } }
    ]
  });
})();
