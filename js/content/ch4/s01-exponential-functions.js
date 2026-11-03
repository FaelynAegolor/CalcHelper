/* 4.1 Exponential Functions
   The midterm-2 worksheet reaches only the opening of this section: the definition,
   the shape of the graph, and finding a from a point on the curve. */
(function () {
  const M = CH.M, V = CH.V;

  const expGraph = (a, label) => V.graph({
    xmin: -3, xmax: 3, ymin: -1, ymax: 8, width: 260, tick: 1,
    fns: [{ f: x => Math.pow(a, x), label: label }],
    points: [{ x: 0, y: 1, label: '(0, 1)' }],
    segments: [{ x1: -3, y1: 0, x2: 3, y2: 0, dashed: true, color: 'var(--muted)' }],
    alt: 'The graph of ' + label + ', passing through (0, 1) and never touching the x-axis'
  });

  CH.registerSection({
    id: '4.1', chapter: 4, exam: 2, title: 'Exponential Functions',
    summary: 'What changes when the variable moves into the exponent: $f(x) = a^x$. The shape of the graph, why it never reaches the axis, and how to find $a$ from one point.',

    theory: [
      { short: true, md: 'Up to now the variable has been the **base**, as in $x^2$. Now it moves up into the **exponent**: $a^x$.\n\n- $f(x) = a^x$ with $a > 0$ and $a \\ne 1$.\n- Every one of these passes through $(0, 1)$, because anything to the power $0$ is $1$.\n- $a > 1$ → the graph **climbs**. $0 < a < 1$ → it **falls**.\n- The $x$-axis is a **horizontal asymptote**: the curve gets closer and closer but never touches.\n- Domain is every real number; range is $(0, \\infty)$ — the output is always positive.' },

      { h: 'The variable moves upstairs' },
      'Compare $x^2$ and $2^x$. They look similar but behave completely differently. In $x^2$ the variable is the base and the power is fixed. In $2^x$ the base is fixed and the **variable is the power**.',
      { def: 'Exponential function', md: '$$f(x) = a^x, \\qquad a > 0, \\quad a \\ne 1$$\n\nThe number $a$ is the **base**.\n\nWhy the restrictions? If $a$ were negative, something like $(-4)^{1/2}$ would be a square root of a negative and the function would fall apart. And $1^x$ is just $1$ forever, which is a flat line rather than anything interesting.' },

      { h: 'What the graph looks like' },
      { cols: [
        { svg: expGraph(3, 'y = 3ˣ'), caption: '$a > 1$: the curve **climbs**, slowly at first and then very fast.' },
        { svg: expGraph(1 / 3, 'y = (1/3)ˣ'), caption: '$0 < a < 1$: the curve **falls**. It is the mirror image of the other.' }
      ] },
      { key: 'Four facts true of every one of them', md: '1. It passes through $(0, 1)$ — because $a^0 = 1$ for every base.\n2. The **domain** is all real numbers: you can raise $a$ to anything.\n3. The **range** is $(0, \\infty)$: the output is always positive, never zero.\n4. The $x$-axis ($y = 0$) is a **horizontal asymptote**.' },
      { def: 'Horizontal asymptote', md: 'A line the curve creeps towards without ever reaching. For $y = a^x$ with $a>1$, as $x$ heads left the heights shrink — $2^{-10}$ is about $0.001$ — but they never actually hit zero, because a positive number raised to any power stays positive.' },
      { warn: 'A negative input does not give a negative output', md: 'This catches people out. $2^{-3}$ is **not** negative — it is $\\tfrac{1}{2^3} = \\tfrac18$, which is small and positive.\n\nA negative exponent means "one over", exactly as in 1.2. It never flips the sign of the answer.' },

      { h: 'Finding the base from a point' },
      { key: 'Substitute the point and solve for $a$', md: 'If you are told the graph of $f(x) = a^x$ passes through a point, put that point in and solve.\n\nThe exponent is usually small, so you end up with something like $a^2 = 9$ — a short equation you can already handle.' },
      { example: {
        title: 'Reading the base off a graph', label: 'Worked example',
        problem: 'The graph of $f(x) = a^x$ passes through $(2, 9)$. Find $a$.',
        steps: [
          { text: 'Substitute the point: $x = 2$ gives an output of $9$.', math: 'a^2 = 9' },
          { text: 'Square-root both sides.', math: 'a = \\pm 3' },
          { text: 'But the definition insists $a > 0$, so the negative answer is not allowed.', math: 'a = 3' },
          { text: 'Check it: $3^2 = 9$. ✓' }
        ],
        answer: '$a = 3$',
        checklist: ['Substitute the point into $a^x$.', 'Solve the short equation for $a$.', 'Throw out any negative answer — the base must be positive.', 'Check by substituting back.']
      } },
      { tip: 'When the point gives a fraction', md: 'A point like $\\left(2, \\tfrac{1}{16}\\right)$ gives $a^2 = \\tfrac{1}{16}$, so $a = \\tfrac14$.\n\nA base between $0$ and $1$ is exactly what makes the curve fall instead of climb — so a falling graph tells you to expect a fractional base before you calculate anything.' },

      { calm: true, md: 'This is the very start of a new topic, and the midterm only reaches the opening of it. So there is less to learn here than the page length suggests.\n\nIf you can say what $a^0$ is, sketch whether a curve climbs or falls from the size of $a$, and solve a one-line equation like $a^2 = 9$, you have what the paper is asking for.\n\nThe one thing genuinely worth fixing in your head: **the output of $a^x$ is always positive**, no matter how negative $x$ gets. That is the fact behind the asymptote, and it is the one most likely to be tested.' },

      { sid: '4.1', title: 'Can I do this?',
        intro: 'Tick these off when you are sure. Nothing here is marked — it is just for you to see what is solid and what still needs another go.',
        checklist: [
          'Tell $a^x$ apart from $x^a$, and say which one is exponential',
          'Say why the base must be positive and not $1$',
          'State that every graph of $a^x$ goes through $(0,1)$',
          'Say whether a graph climbs or falls from the size of $a$',
          'Give the domain and range of $a^x$',
          'Explain what a horizontal asymptote is, and why $y=0$ is one here',
          'Work out a negative exponent without making the answer negative',
          'Find $a$ from a point on the graph'
        ] }
    ],

    examples: [
      { title: 'A falling exponential',
        problem: 'The graph of $f(x) = a^x$ passes through $\\left(2, \\tfrac{1}{16}\\right)$. Find $a$, and say whether the graph climbs or falls.',
        steps: [
          { text: 'Substitute the point.', math: 'a^2 = \\frac{1}{16}' },
          { text: 'Square-root both sides, keeping only the positive answer.', math: 'a = \\frac14' },
          { text: 'Since $0 < \\tfrac14 < 1$, the graph **falls** as you read left to right.' },
          { text: 'That matches the point: at $x=2$ the height has already dropped to $\\tfrac{1}{16}$, well below the $1$ it started at.' }
        ],
        answer: '$a = \\tfrac14$; the graph falls',
        checklist: ['Substitute the point.', 'Solve for $a$, keeping the positive root.', 'Compare $a$ with $1$.', 'Bigger than 1 climbs; between 0 and 1 falls.'] },

      { title: 'Values on both sides of zero',
        problem: 'For $f(x) = 2^x$, work out $f(3)$, $f(0)$ and $f(-3)$.',
        steps: [
          { text: 'A positive exponent is ordinary repeated multiplication.', math: 'f(3) = 2^3 = 8' },
          { text: 'Anything to the power zero is $1$.', math: 'f(0) = 2^0 = 1' },
          { text: 'A negative exponent means "one over" — not a negative answer.', math: 'f(-3) = 2^{-3} = \\frac{1}{2^3} = \\frac18' },
          { text: 'All three outputs are positive, which is the range $(0,\\infty)$ in action.' }
        ],
        answer: '$8$, $1$ and $\\tfrac18$',
        checklist: ['Positive exponent: multiply out.', 'Zero exponent: the answer is 1.', 'Negative exponent: one over the positive version.', 'Check every output came out positive.'] }
    ],

    exercises: [
      { id: '4.1-e1', prompt: 'For $f(x) = 3^x$, find $f(0)$.',
        answer: { type: 'number', value: 1 },
        hints: ['Anything (except zero) to the power $0$ is $1$.'],
        solution: [{ text: 'Any base to the power zero gives 1.', math: 'f(0) = 3^0 = 1' },
          { text: 'This is why every graph of $a^x$ passes through $(0,1)$.' }] },

      { id: '4.1-e2', prompt: 'For $f(x) = 2^x$, find $f(5)$.',
        answer: { type: 'number', value: 32 },
        hints: ['Multiply $2$ by itself five times.'],
        solution: [{ text: 'Work it out.', math: '2^5 = 32' }] },

      { id: '4.1-e3', prompt: 'For $f(x) = 2^x$, find $f(-3)$.',
        answer: { type: 'number', value: 0.125 },
        hints: ['A negative exponent means "one over", not a negative answer.', '$2^{-3} = \\dfrac{1}{2^3}$.'],
        solution: [{ text: 'Flip it.', math: '2^{-3} = \\frac{1}{2^3} = \\frac18' },
          { text: 'Positive, as every output of an exponential must be.' }] },

      { id: '4.1-e4', prompt: 'The graph of $f(x) = a^x$ passes through $(2, 9)$. Find $a$.',
        answer: { type: 'number', value: 3 },
        hints: ['Substitute the point: $a^2 = 9$.', 'Square-root both sides — but the base must be positive.'],
        solution: [{ text: 'Substitute.', math: 'a^2 = 9' },
          { text: 'Take the positive root, since $a>0$.', math: 'a = 3' }] },

      { id: '4.1-e5', prompt: 'The graph of $f(x) = a^x$ passes through $\\left(2, \\tfrac{1}{16}\\right)$. Find $a$.',
        answer: { type: 'number', value: 0.25 },
        hints: ['Substitute: $a^2 = \\tfrac{1}{16}$.', 'What positive number squared gives $\\tfrac{1}{16}$?'],
        solution: [{ text: 'Substitute and solve.', math: 'a^2 = \\tfrac{1}{16} \\Rightarrow a = \\tfrac14' },
          { text: 'A base below $1$, which is why that graph falls.' }] },

      { id: '4.1-e6', prompt: 'The graph of $f(x) = a^x$ passes through $(3, 125)$. Find $a$.',
        answer: { type: 'number', value: 5 },
        hints: ['Substitute: $a^3 = 125$.', 'What number cubed gives $125$?'],
        solution: [{ text: 'Substitute and cube-root.', math: 'a^3 = 125 \\Rightarrow a = 5' }] },

      { id: '4.1-e7', prompt: 'For $f(x) = a^x$ with $a = \\tfrac12$, does the graph climb or fall as $x$ increases?',
        answer: { type: 'choice', value: 'fall', options: [{ id: 'climb', label: 'It climbs' }, { id: 'fall', label: 'It falls' }], wrongMessage: 'Not quite — compare the base with $1$.' },
        hints: ['Compare the base with $1$.', '$\\tfrac12$ is between $0$ and $1$, so each step right multiplies by a half.'],
        solution: [{ text: 'Every step to the right halves the height, so the curve falls.' },
          { text: 'A base between $0$ and $1$ always gives a falling graph.' }] },

      { id: '4.1-e8', prompt: 'What is the range of $f(x) = 4^x$? Give it as an interval.',
        answer: { type: 'interval', value: '(0, inf)', vars: ['x'] },
        hints: ['Can the output ever be zero or negative?', 'A positive base raised to any power stays positive — but it never actually reaches $0$.'],
        solution: [{ text: 'Outputs are always positive, and never zero.', math: '(0, \\infty)' },
          { text: 'The $x$-axis is an asymptote, approached but never touched.' }] },

      { id: '4.1-e9', prompt: 'What is the domain of $f(x) = 4^x$? Give it as an interval.',
        answer: { type: 'interval', value: '(-inf, inf)', vars: ['x'] },
        hints: ['Is there any number you are not allowed to raise $4$ to?', 'No — nothing breaks for any real exponent.'],
        solution: [{ text: 'Any real number works as an exponent.', math: '(-\\infty, \\infty)' }] },

      { id: '4.1-e10', prompt: 'The graph of $y = a^x$ has a horizontal asymptote. What is its equation?',
        answer: { type: 'equation', value: 'y = 0', vars: ['x', 'y'] },
        hints: ['Which line does the curve creep towards without reaching?', 'It flattens out along the $x$-axis.'],
        solution: [{ text: 'The heights shrink towards zero but never get there.', math: 'y = 0' }] },

      { id: '4.1-e11', prompt: 'For $f(x) = 3^x$, find $f(-2)$.',
        answer: { type: 'number', value: 1 / 9 },
        hints: ['Negative exponent means one over.', '$3^{-2} = \\dfrac{1}{3^2}$.'],
        solution: [{ text: 'Flip it.', math: '3^{-2} = \\frac19' }] },

      { id: '4.1-e12', prompt: 'Which of $x^3$ and $3^x$ is an exponential function?',
        answer: { type: 'choice', value: 'b', options: [{ id: 'a', label: '$x^3$' }, { id: 'b', label: '$3^x$' }], wrongMessage: 'Not quite — which one has the variable in the exponent?' },
        hints: ['An exponential function has the variable **in the exponent**.', 'In $x^3$ the variable is the base; in $3^x$ it is the power.'],
        solution: [{ text: 'In $3^x$ the variable sits in the exponent, which is what makes it exponential.' },
          { text: '$x^3$ is a power function — the variable is the base there.' }] }
    ],

    generators: [
      { id: '4.1-g-evaluate', title: 'Evaluate an exponential', desc: 'Including negative and zero exponents.',
        make(r) {
          const a = r.pick([2, 3, 4, 5]);
          const x = r.int(-3, 4);
          const val = Math.pow(a, x);
          return {
            prompt: 'For $f(x) = ' + a + '^x$, find $f(' + x + ')$.',
            answer: { type: 'number', value: val },
            hints: [x === 0 ? 'Anything to the power zero is $1$.' : x < 0 ? 'A negative exponent means "one over" — the answer stays positive.' : 'Multiply the base by itself that many times.',
              x < 0 ? '$' + a + '^{' + x + '} = \\dfrac{1}{' + (x === -1 ? a : a + '^{' + (-x) + '}') + '}$.' : x === 0 ? 'So $f(0) = 1$, whatever the base.' : '$' + a + '^{' + x + '}$ means ' + (x === 1 ? 'just $' + a + '$' : '$' + Array(x).fill(a).join(' \\times ') + '$') + '.'],
            solution: [{ text: x === 0 ? 'Any base to the power zero gives 1.' : x < 0 ? 'Flip it to make the exponent positive.' : 'Multiply it out.',
              math: a + '^{' + x + '} = ' + (x < 0 ? '\\frac{1}{' + Math.pow(a, -x) + '}' : String(val)) }]
          };
        } },

      { id: '4.1-g-findbase', title: 'Find the base from a point', desc: 'Substitute and solve for $a$.',
        make(r) {
          const a = r.pick([2, 3, 4, 5]);
          const n = r.pick([2, 3]);
          const flip = r.bool(0.4);
          const y = Math.pow(a, n);
          return {
            prompt: 'The graph of $f(x) = a^x$ passes through $\\left(' + n + ', ' + (flip ? '\\tfrac{1}{' + y + '}' : y) + '\\right)$. Find $a$.',
            answer: { type: 'number', value: flip ? 1 / a : a },
            hints: ['Substitute the point to get an equation in $a$.',
              '$a^{' + n + '} = ' + (flip ? '\\frac{1}{' + y + '}' : y) + '$.',
              flip ? 'A height below $1$ means the base is a fraction — this graph falls.' : 'Take the positive root, since the base must be positive.'],
            solution: [{ text: 'Substitute the point.', math: 'a^{' + n + '} = ' + (flip ? '\\frac{1}{' + y + '}' : y) },
              { text: 'Solve, keeping the positive answer.', math: 'a = ' + (flip ? '\\frac{1}{' + a + '}' : String(a)) }]
          };
        } },

      { id: '4.1-g-shape', title: 'Climbs or falls?', desc: 'Read the direction off the base.',
        make(r) {
          const up = r.bool(0.5);
          const a = r.pick([2, 3, 4, 5, 10]);
          const shown = up ? String(a) : '\\tfrac{1}{' + a + '}';
          return {
            prompt: 'Does the graph of $f(x) = ' + (/frac/.test(shown) ? '\\left(' + shown + '\\right)' : shown) + '^x$ climb or fall as $x$ increases?',
            answer: { type: 'choice', value: up ? 'climb' : 'fall',
              options: [{ id: 'climb', label: 'It climbs' }, { id: 'fall', label: 'It falls' }],
              wrongMessage: 'Not quite — compare the base with $1$.' },
            hints: ['Compare the base with $1$.',
              up ? 'A base bigger than $1$ multiplies the height each step, so it grows.' : 'A base between $0$ and $1$ shrinks the height each step.'],
            solution: [{ text: up ? 'The base is above $1$, so each step right multiplies the height — it climbs.' : 'The base is between $0$ and $1$, so each step right shrinks the height — it falls.' }]
          };
        } }
    ]
  });
})();
