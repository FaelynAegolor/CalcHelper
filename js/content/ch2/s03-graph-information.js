/* 2.3 Getting Information from the Graph of a Function
   Worksheet scope: reading values, domain and range off a picture; comparing two
   graphs to solve equations and inequalities; increasing and decreasing intervals;
   local maxima and minima. Every question here is about a drawn curve, so the
   generators draw one and ask about it. */
(function () {
  const M = CH.M, V = CH.V;

  /* a parabola with a known vertex, used by the examples and the generators */
  function parab(a, h, k, o) {
    return V.graph(Object.assign({
      xmin: -6, xmax: 6, ymin: -6, ymax: 6, width: 300, tick: 2,
      fns: [{ f: x => a * (x - h) * (x - h) + k }],
      points: [{ x: h, y: k, label: '(' + h + ', ' + k + ')' }],
      alt: 'A parabola with its turning point at (' + h + ', ' + k + ')'
    }, o || {}));
  }

  CH.registerSection({
    id: '2.3', chapter: 2, exam: 2, title: 'Getting Information from the Graph',
    summary: 'Reading a function off its picture: values, domain and range, where it climbs and where it falls, its peaks and troughs, and comparing two graphs to solve $f(x) = g(x)$ or $f(x) < g(x)$ by eye.',

    theory: [
      { short: true, md: 'Everything here is **reading a picture**, not algebra.\n\n- $f(c)$: go across to $x = c$, then up or down to the curve, then read the height.\n- **Domain** is how far the graph spreads **left to right**. **Range** is how far it spreads **up and down**.\n- **Increasing** means the curve goes *up* as you read left to right; decreasing means it goes *down*. Both are written as intervals of $x$.\n- A **local maximum** is the height at a peak; a **local minimum** is the height at a trough.\n- To solve $f(x) = g(x)$ by eye, find where the two curves **cross**.' },

      { h: 'Reading a value off the graph' },
      { key: 'Across, then up, then read the height', md: 'To find $f(c)$ from a picture:\n\n1. Find $c$ on the **across** axis.\n2. Go straight up (or down) until you hit the curve.\n3. Read off the **height** — that is $f(c)$.\n\nThe input is always a left-to-right position. The output is always a height.' },
      { svg: V.graph({ xmin: -5, xmax: 5, ymin: -3, ymax: 5, width: 320, fns: [{ f: x => 0.4 * x * x - 1 }], segments: [{ x1: 2, y1: -3, x2: 2, y2: 0.6, dashed: true, color: 'var(--viz-2)' }, { x1: -5, y1: 0.6, x2: 2, y2: 0.6, dashed: true, color: 'var(--viz-2)' }], points: [{ x: 2, y: 0.6, color: 'var(--viz-2)' }], alt: 'Finding f(2) by going across to x = 2 then up to the curve' }),
        caption: 'Finding $f(2)$: across to $2$, up to the curve, then across to read the height.' },

      { h: 'Domain and range from a picture' },
      { def: 'Domain and range, read off a graph', md: '- The **domain** is the set of $x$ values the graph covers — how far it reaches **left and right**.\n- The **range** is the set of heights it reaches — how far it spreads **up and down**.\n\nA filled dot means that end **is** included; an open (hollow) dot means it is **not**.' },
      { tip: 'Squash it against the axes', md: 'Imagine the whole curve squashed flat down onto the $x$-axis: the shadow it casts is the **domain**. Now squash it sideways onto the $y$-axis: that shadow is the **range**.' },

      { h: 'Increasing and decreasing' },
      { key: 'Read left to right, like a sentence', md: 'Put your finger on the curve at the far left and trace it rightwards.\n\n- Going **uphill** → the function is **increasing** there.\n- Going **downhill** → it is **decreasing**.\n\nAnswer with intervals of **$x$**, not of height. This is the part people get backwards: you report *where* it climbs, not *how high* it climbs.' },
      { warn: 'Always left to right', md: 'It does not matter whether the curve is above or below the axis. A curve can be entirely below zero and still be increasing, as long as it is heading upwards as you read rightwards.' },

      { h: 'Local maximum and local minimum' },
      { def: 'Peaks and troughs', md: 'A **local maximum** is the height at the top of a hump — a point higher than everything immediately around it. A **local minimum** is the height at the bottom of a dip.\n\n"Local" because it only has to beat its neighbours, not the whole graph.' },
      { note: 'The value is the height', md: 'If the peak is at the point $(2, 5)$, then the local maximum **value** is $5$, and it **occurs at** $x = 2$. Questions ask for one or the other, so read carefully which.' },
      { svg: V.graph({ xmin: -4, xmax: 4, ymin: -4, ymax: 5, width: 320, fns: [{ f: x => x * x * x / 3 - 3 * x }], points: [{ x: -1.732, y: 3.46, label: 'local max', dx: -30, dy: -12, color: 'var(--viz-3)' }, { x: 1.732, y: -3.46, label: 'local min', dx: 8, dy: 16, color: 'var(--viz-2)' }], alt: 'A curve with one peak and one trough' }),
        caption: 'Up to the peak, down to the trough, then up again. Increasing, then decreasing, then increasing.' },

      { h: 'Comparing two graphs' },
      { key: 'Crossing points and which one is on top', md: 'When two curves $f$ and $g$ are drawn together:\n\n- $f(x) = g(x)$ where the graphs **cross**.\n- $f(x) < g(x)$ where the graph of $g$ is **above** the graph of $f$.\n- $f(x) > g(x)$ where $f$ is above $g$.\n\nSo solving an inequality by eye is just asking "which curve is higher here?" and reading off the stretch of $x$ where that is true.' },

      { calm: true, md: 'There is no algebra in this section at all. Every answer is read straight off a picture, and the only real skill is keeping two things apart: **across** is the input, **up** is the output.\n\nAlmost every mistake here is answering with heights when the question wanted $x$ values, or the other way round. Before writing anything, ask yourself: *is this asking me where, or how high?*\n\nDomain and increasing/decreasing are **where** questions. Range and maximum/minimum values are **how high** questions.' },

      { sid: '2.3', title: 'Can I do this?',
        intro: 'Tick these off when you are sure. Nothing here is marked — it is just for you to see what is solid and what still needs another go.',
        checklist: [
          'Read $f(c)$ off a graph by going across then up',
          'Read the domain off a graph (how far it goes left to right)',
          'Read the range off a graph (how far it goes up and down)',
          'Tell an included endpoint from an excluded one by the dot',
          'Give the intervals where a function is increasing and decreasing, in terms of $x$',
          'Find a local maximum or minimum value, and say where it happens',
          'Use two graphs to solve $f(x)=g(x)$ and $f(x) < g(x)$'
        ] }
    ],

    examples: [
      { title: 'Reading a parabola',
        problem: 'The graph shown is $f(x) = (x-1)^2 - 4$. Find (a) the local minimum value, (b) where $f$ is decreasing, (c) the range.',
        steps: [
          { text: '**(a)** The lowest point of the curve is the trough, at $(1, -4)$. The local minimum **value** is the height there.', math: '-4' },
          { text: '**(b)** Trace from the left: the curve falls until it reaches $x = 1$, then climbs. So it is decreasing for every $x$ below $1$.', math: '(-\\infty, 1)' },
          { text: '**(c)** The lowest height reached is $-4$, and it climbs forever upwards from there.', math: '[-4, \\infty)' },
          { text: 'Note (b) is an interval of $x$ and (c) is an interval of heights. Same picture, two different axes.' }
        ],
        answer: '(a) $-4$  (b) $(-\\infty, 1)$  (c) $[-4,\\infty)$',
        checklist: ['Find the turning point first.', 'Minimum value = its height; it occurs at its $x$.', 'Decreasing / increasing are intervals of $x$.', 'Range is an interval of heights.'] },

      { title: 'Which graph is higher?',
        problem: 'Two graphs cross at $x = -2$ and $x = 3$, with $g$ above $f$ between them. Solve (a) $f(x) = g(x)$ and (b) $f(x) < g(x)$.',
        steps: [
          { text: '**(a)** The graphs are equal exactly where they cross.', math: 'x = -2 \\text{ and } x = 3' },
          { text: '**(b)** $f(x) < g(x)$ asks where $f$ is **below** $g$ — that is, where $g$ is on top.' },
          { text: 'That is the stretch between the crossing points.', math: '(-2, 3)' },
          { text: 'Round brackets, because at the crossings they are equal rather than one being strictly below.' }
        ],
        answer: '(a) $x = -2$ and $x = 3$  (b) $(-2, 3)$',
        checklist: ['Equal where they cross.', 'Less than where that graph is lower.', 'Read off the stretch of $x$, not the heights.', 'Strict inequality means the crossings are excluded.'] }
    ],

    exercises: [
      { id: '2.3-e1', prompt: 'The graph of $f(x) = (x-1)^2 - 4$ is shown. What is the local minimum **value**?',
        answer: { type: 'number', value: -4 },
        hints: ['Find the lowest point of the curve.', 'The turning point is at $(1,-4)$. The value is the height, not the $x$.'],
        solution: [{ text: 'The trough is at $(1,-4)$, so the minimum value is its height.', math: '-4' }] },

      { id: '2.3-e2', prompt: 'For that same $f(x) = (x-1)^2-4$, at what value of $x$ does the minimum occur?',
        answer: { type: 'number', value: 1 },
        hints: ['This time the question wants **where**, not how high.', 'The turning point is at $(1,-4)$, so read off the $x$.'],
        solution: [{ text: 'The turning point sits at $x = 1$.', math: 'x = 1' }] },

      { id: '2.3-e3', prompt: 'For $f(x) = (x-1)^2 - 4$, on which interval is $f$ **increasing**?',
        answer: { type: 'interval', value: '(1, inf)', vars: ['x'] },
        hints: ['Trace the curve left to right and find where it goes uphill.', 'It falls until $x=1$, then climbs from there onwards.'],
        solution: [{ text: 'To the right of the turning point the curve climbs.', math: '(1, \\infty)' }] },

      { id: '2.3-e4', prompt: 'For $f(x) = (x-1)^2 - 4$, what is the range?',
        answer: { type: 'interval', value: '[-4, inf)', vars: ['x'] },
        hints: ['Range is about heights — how far up and down the graph reaches.', 'The lowest height is $-4$, and it goes up forever. Is $-4$ itself reached?'],
        solution: [{ text: 'The lowest height reached is $-4$, at the turning point, and it climbs without limit.', math: '[-4, \\infty)' },
          { text: 'Square bracket because the height $-4$ really is reached.' }] },

      { id: '2.3-e5', prompt: 'A graph starts at the filled point $(-3, 2)$ and ends at the filled point $(4, 5)$, with no breaks. What is its domain?',
        answer: { type: 'interval', value: '[-3, 4]', vars: ['x'] },
        hints: ['Domain is how far it spreads left to right.', 'It runs from $x=-3$ to $x=4$. Filled dots mean both ends are included.'],
        solution: [{ text: 'The graph covers every $x$ from $-3$ to $4$.' },
          { text: 'Both dots are filled, so both ends are included.', math: '[-3, 4]' }] },

      { id: '2.3-e6', prompt: 'Two graphs cross at $x = -2$ and $x = 3$, and $g$ is above $f$ between them. Find the values of $x$ where $f(x) < g(x)$.',
        answer: { type: 'interval', value: '(-2, 3)', vars: ['x'] },
        hints: ['$f(x) < g(x)$ means $f$ is **below** $g$.', 'That happens between the two crossing points.', 'Strict inequality, so the crossings themselves are not included.'],
        solution: [{ text: '$f$ is below $g$ exactly between the crossings.', math: '(-2, 3)' },
          { text: 'At the crossings they are equal, so a strict $<$ excludes them.' }] },

      { id: '2.3-e7', prompt: 'For $f(x) = -(x+2)^2 + 9$, what is the local maximum value?',
        answer: { type: 'number', value: 9 },
        hints: ['The minus in front flips the U upside down, so this one has a peak.', 'The turning point is at $(-2, 9)$.'],
        solution: [{ text: 'The negative coefficient makes it an upside-down U, peaking at $(-2,9)$.' },
          { text: 'The maximum value is the height.', math: '9' }] },

      { id: '2.3-e8', prompt: 'For $f(x) = -(x+2)^2 + 9$, on which interval is $f$ **decreasing**?',
        answer: { type: 'interval', value: '(-2, inf)', vars: ['x'] },
        hints: ['It is an upside-down U peaking at $x = -2$.', 'Reading left to right: it climbs up to the peak, then falls away after it.'],
        solution: [{ text: 'After the peak at $x=-2$ the curve heads downwards.', math: '(-2, \\infty)' }] },

      { id: '2.3-e9', prompt: 'For $f(x) = -(x+2)^2 + 9$, what is the range?',
        answer: { type: 'interval', value: '(-inf, 9]', vars: ['x'] },
        hints: ['The highest height is $9$, at the peak.', 'From there it falls away forever downwards.'],
        solution: [{ text: 'The greatest height is $9$ and the curve drops without limit below it.', math: '(-\\infty, 9]' }] },

      { id: '2.3-e10', prompt: 'A graph has a peak at $(1, 4)$ and a trough at $(3, 0)$. On which interval is it decreasing?',
        answer: { type: 'interval', value: '(1, 3)', vars: ['x'] },
        hints: ['Between a peak and the trough that follows it, the curve must be heading downhill.', 'So the answer runs from the peak at $x=1$ to the trough at $x=3$.'],
        solution: [{ text: 'From the peak down to the trough the curve falls.', math: '(1, 3)' }] }
    ],

    generators: [
      { id: '2.3-g-vertex', title: 'Peak or trough from a graph', desc: 'Read the turning point off the picture.',
        make(r) {
          const up = r.bool(0.5);
          const a = (up ? 1 : -1) * r.pick([1, 1, 2]);
          const h = r.int(-3, 3), k = r.int(-4, 4);
          const askValue = r.bool(0.5);
          return {
            prompt: 'The graph below is $f(x) = ' + (a === 1 ? '' : a === -1 ? '-' : a) + '(x ' + (h < 0 ? '+ ' + (-h) : '- ' + h) + ')^2 ' + (k < 0 ? '- ' + (-k) : '+ ' + k) + '$.\n\n' +
              (askValue ? 'What is the local ' + (up ? 'minimum' : 'maximum') + ' **value**?' : 'At what value of **$x$** does the local ' + (up ? 'minimum' : 'maximum') + ' occur?'),
            answer: { type: 'number', value: askValue ? k : h },
            hints: [up ? 'The coefficient is positive, so it is a U with a lowest point.' : 'The coefficient is negative, so it is an upside-down U with a highest point.',
              'The turning point is at $(' + h + ', ' + k + ')$.',
              askValue ? 'The **value** is the height there, so read off the second coordinate.' : 'The question asks **where**, so read off the first coordinate.'],
            solution: [{ text: 'The turning point is at $(' + h + ', ' + k + ')$.' },
              { text: askValue ? 'The value is its height.' : 'It occurs at that $x$.', math: askValue ? String(k) : 'x = ' + h }]
          };
        } },

      { id: '2.3-g-monotone', title: 'Increasing or decreasing', desc: 'Which way does the curve go?',
        make(r) {
          const up = r.bool(0.5);
          const h = r.int(-4, 4), k = r.int(-4, 4);
          const a = up ? 1 : -1;
          const askInc = r.bool(0.5);
          // U: decreasing left of h, increasing right. Upside-down U: the reverse.
          const rightIsInc = up;
          const wantRight = (askInc === rightIsInc);
          return {
            prompt: 'For $f(x) = ' + (up ? '' : '-') + '(x ' + (h < 0 ? '+ ' + (-h) : '- ' + h) + ')^2 ' + (k < 0 ? '- ' + (-k) : '+ ' + k) + '$, on which interval is $f$ **' + (askInc ? 'increasing' : 'decreasing') + '**?',
            answer: { type: 'interval', value: wantRight ? '(' + h + ', inf)' : '(-inf, ' + h + ')', vars: ['x'] },
            hints: [up ? 'A positive coefficient gives a U, with its lowest point at $x = ' + h + '$.' : 'A negative coefficient gives an upside-down U, peaking at $x = ' + h + '$.',
              'Trace the curve left to right and watch where it climbs and where it falls.',
              'Answer with an interval of **$x$**, not of heights.'],
            solution: [{ text: 'The turning point is at $x = ' + h + '$.' },
              { text: 'Reading left to right, the curve ' + (askInc ? 'climbs' : 'falls') + ' on the ' + (wantRight ? 'right' : 'left') + ' of it.',
                math: wantRight ? '(' + h + ', \\infty)' : '(-\\infty, ' + h + ')' }]
          };
        } },

      { id: '2.3-g-range', title: 'Range of a parabola', desc: 'How far up and down does it reach?',
        make(r) {
          const up = r.bool(0.5);
          const h = r.int(-4, 4), k = r.int(-4, 4);
          return {
            prompt: 'Find the range of $f(x) = ' + (up ? '' : '-') + '(x ' + (h < 0 ? '+ ' + (-h) : '- ' + h) + ')^2 ' + (k < 0 ? '- ' + (-k) : '+ ' + k) + '$.',
            answer: { type: 'interval', value: up ? '[' + k + ', inf)' : '(-inf, ' + k + ']', vars: ['x'] },
            hints: ['Range is about **heights**, not about $x$.',
              up ? 'It is a U, so there is a lowest height and nothing above it is out of reach.' : 'It is an upside-down U, so there is a highest height and it falls away below.',
              'The turning point is at height $' + k + '$, and that height **is** reached — so use a square bracket.'],
            solution: [{ text: 'The turning point is at $(' + h + ', ' + k + ')$, so the ' + (up ? 'lowest' : 'highest') + ' height is $' + k + '$.' },
              { text: 'From there the curve runs ' + (up ? 'upwards' : 'downwards') + ' without limit.',
                math: up ? '[' + k + ', \\infty)' : '(-\\infty, ' + k + ']' }]
          };
        } },

      { id: '2.3-g-compare', title: 'Comparing two graphs', desc: 'Where is one above the other?',
        make(r) {
          const p = r.int(-5, 0), q = r.int(1, 5);
          const below = r.bool(0.5);   // is g above f between the crossings?
          const strict = r.bool(0.5);
          const want = below ? 'f(x) ' + (strict ? '<' : '\\le') + ' g(x)' : 'f(x) ' + (strict ? '>' : '\\ge') + ' g(x)';
          const lo = strict ? '(' : '[', hi = strict ? ')' : ']';
          return {
            prompt: 'Two graphs cross at $x = ' + p + '$ and $x = ' + q + '$, and **$g$ is above $f$** between them. Find the values of $x$ for which $' + want + '$.',
            answer: { type: 'interval', value: below ? lo + p + ', ' + q + hi : '(-inf, ' + p + hi + ' U ' + lo + q + ', inf)', vars: ['x'] },
            hints: [below ? 'You want where $f$ is **below** $g$.' : 'You want where $f$ is **above** $g$.',
              below ? '$g$ is on top between the crossings, so that is the stretch you want.' : '$g$ is on top between the crossings, so $f$ must be on top **outside** them — two pieces.',
              strict ? 'Strict inequality, so the crossing points are excluded.' : 'Not strict, so the crossing points are included — at those the two are equal.'],
            solution: [{ text: below ? '$f$ sits below $g$ between the crossings.' : '$f$ sits above $g$ outside the crossings, which is two separate stretches.' },
              { text: strict ? 'The crossings are excluded.' : 'The crossings are included, since equal counts.',
                math: below ? lo + p + ', ' + q + hi : '(-\\infty, ' + p + hi + ' \\cup ' + lo + q + ', \\infty)' }]
          };
        } }
    ]
  });
})();
