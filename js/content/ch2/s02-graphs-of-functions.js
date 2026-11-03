/* 2.2 Graphs of Functions
   Worksheet scope: graphing from a table, the four shapes worth knowing by heart,
   the vertical line test, and deciding whether an equation gives y as a function of x. */
(function () {
  const M = CH.M, V = CH.V;

  const shape = (f, label, opts) => V.graph(Object.assign({
    xmin: -4, xmax: 4, ymin: -4, ymax: 4, width: 240, tick: 2,
    fns: [{ f: f, label: label }], alt: 'The graph of ' + label
  }, opts || {}));

  CH.registerSection({
    id: '2.2', chapter: 2, exam: 2, title: 'Graphs of Functions',
    summary: 'Turning a rule into a picture. Building a table of values, the handful of shapes worth knowing by heart, and the vertical line test for whether a curve — or an equation — is a function at all.',

    theory: [
      { short: true, md: 'The graph of $f$ is just **every point $(x, f(x))$** plotted.\n\n- To draw one from scratch: pick some $x$ values, work out each $f(x)$, plot, join.\n- Four shapes are worth knowing without thinking: $x^2$ (a U), $x^3$ (an S), $\\sqrt{x}$ (half a U on its side), $|x|$ (a V).\n- **Vertical line test**: if any upright line crosses the curve twice, it is not a function.\n- For an equation, solve for $y$. If a $\\pm$ appears, it is not a function.' },

      { h: 'What a graph actually is' },
      'The graph of $f$ is the set of all points $(x, f(x))$. The across-coordinate is what you put in, and the up-coordinate is what came out. That is the whole definition.',
      { key: 'Drawing one from a table', md: '1. Choose some $x$ values — the question often tells you which range.\n2. Work out $f(x)$ for each, writing them in a table.\n3. Plot each pair as a point.\n4. Join them up.\n\nIf the question gives a range like $-1 \\le x \\le 2$, your graph **stops** at those ends.' },
      { example: {
        title: 'From a table to a line', label: 'Worked example',
        problem: 'Sketch $f(x) = x + 1$ for $-1 \\le x \\le 2$ by first making a table of values.',
        steps: [
          { text: 'Work out each value in turn.', math: 'f(-1) = 0,\\quad f(0) = 1,\\quad f(1) = 2,\\quad f(2) = 3' },
          { text: 'That gives the points $(-1,0)$, $(0,1)$, $(1,2)$, $(2,3)$.' },
          { text: 'They line up, because the rule is linear. Join them — but stop at the ends, because the domain stops there.' }
        ],
        answer: 'A straight line segment from $(-1,0)$ to $(2,3)$',
        checklist: ['Pick the $x$ values the question asks for.', 'Work out each $f(x)$ carefully.', 'Plot the pairs as points.', 'Join them, stopping at the ends of the domain.']
      } },
      { svg: V.graph({ xmin: -4, xmax: 4, ymin: -3, ymax: 5, width: 300, fns: [{ f: x => x + 1, domain: [-1, 2] }], points: [{ x: -1, y: 0, label: '(-1,0)' }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3, label: '(2,3)' }], alt: 'The line y = x + 1 drawn only between x = -1 and x = 2' }),
        caption: '$f(x)=x+1$ on $-1 \\le x \\le 2$. The line really does stop — the domain is part of the function.' },

      { h: 'The four shapes worth knowing by heart' },
      'You will meet these again and again, and in 2.6 you will shift and flip them. Learning the four basic pictures now saves a lot of table-making later.',
      { cols: [
        { svg: shape(x => x * x, 'y = x²'), caption: '$y = x^2$ — a **U**. Symmetric about the $y$-axis, never goes below $0$.' },
        { svg: shape(x => x * x * x, 'y = x³'), caption: '$y = x^3$ — an **S**. Goes down to the left and up to the right.' }
      ] },
      { cols: [
        { svg: shape(x => Math.sqrt(x), 'y = √x', { fns: [{ f: x => Math.sqrt(x), domain: [0, 4], label: 'y = √x' }] }), caption: '$y = \\sqrt{x}$ — half a U lying on its side. **Only exists for $x \\ge 0$.**' },
        { svg: shape(x => Math.abs(x), 'y = |x|'), caption: '$y = |x|$ — a **V** with its point at the origin. Never goes below $0$.' }
      ] },
      { note: 'Why $\\sqrt{x}$ stops dead at the origin', md: 'There is no real square root of a negative number, so the graph simply does not exist to the left of $0$. That is the domain doing its job, not a mistake in your drawing.' },

      { h: 'The vertical line test' },
      { key: 'One input, one output — so one height per $x$', md: 'A function gives **exactly one** output for each input. On a graph that means: directly above any $x$ there can be at most **one** point.\n\nSo slide an upright line across the picture. If it ever hits the curve **twice at once**, the curve is not the graph of a function.' },
      { widget: 'vertical-line-test', hint: 'Try it: pick a curve and slide the line across' },
      { cols: [
        { svg: V.graph({ xmin: -4, xmax: 4, ymin: -4, ymax: 4, width: 240, tick: 2, fns: [{ f: x => x * x * x / 6 + 1 }], segments: [{ x1: 1.5, y1: -4, x2: 1.5, y2: 4, dashed: true, color: 'var(--viz-2)' }], points: [{ x: 1.5, y: 1.5625, color: 'var(--viz-2)' }], alt: 'A curve crossed once by a vertical line' }), caption: '**A function.** Every upright line hits it at most once.' },
        { svg: V.graph({ xmin: -4, xmax: 4, ymin: -4, ymax: 4, width: 240, tick: 2, fns: [{ f: x => Math.sqrt(x + 3), domain: [-3, 4] }, { f: x => -Math.sqrt(x + 3), domain: [-3, 4], color: 'var(--viz-1)' }], segments: [{ x1: 1, y1: -4, x2: 1, y2: 4, dashed: true, color: 'var(--viz-2)' }], points: [{ x: 1, y: 2, color: 'var(--viz-2)' }, { x: 1, y: -2, color: 'var(--viz-2)' }], alt: 'A sideways parabola crossed twice by a vertical line' }), caption: '**Not a function.** At $x = 1$ there are two heights, so one input would have two outputs.' }
      ] },

      { h: 'Does an equation give $y$ as a function of $x$?' },
      { key: 'Solve for $y$ and look for a $\\pm$', md: 'Rearrange until $y$ is on its own. Then:\n\n- One clean answer for $y$ → **yes**, it is a function.\n- A $\\pm$ appears (because you square-rooted) → **no**, it is not.\n\nThe giveaway is a **$y^2$** in the original. Taking its square root forces the $\\pm$, which hands you two outputs for one input.' },
      { tip: 'An odd power is fine', md: '$y^3$ causes no trouble: cube-rooting gives exactly one answer, with no $\\pm$. So $x = y^3$ **is** a function of $x$ — it rearranges to $y = \\sqrt[3]{x}$.\n\nIt is specifically **even** powers of $y$ that break things.' },
      { example: {
        title: 'Four equations', label: 'Worked example',
        problem: 'Which of these define $y$ as a function of $x$? (a) $3x - 5y = 7$, (b) $2x - 4y^2 = 3$, (c) $2|x| + y = 0$, (d) $x = y^3$.',
        steps: [
          { text: '**(a)** Solve for $y$.', math: '-5y = 7 - 3x \\Rightarrow y = \\frac{3x-7}{5}' },
          { text: 'One clean answer, so **yes**.' },
          { text: '**(b)** There is a $y^2$. Solving gives a square root.', math: '4y^2 = 2x - 3 \\Rightarrow y = \\pm\\sqrt{\\frac{2x-3}{4}}' },
          { text: 'The $\\pm$ means two outputs for one input, so **no**.' },
          { text: '**(c)** Already nearly solved.', math: 'y = -2|x| \\quad\\text{— one answer, so } \\textbf{yes}' },
          { text: '**(d)** An odd power, so no $\\pm$ appears.', math: 'y = \\sqrt[3]{x} \\quad\\text{— one answer, so } \\textbf{yes}' }
        ],
        answer: '(a) yes, (b) no, (c) yes, (d) yes',
        checklist: ['Rearrange to get $y$ on its own.', 'An even power of $y$ forces a $\\pm$.', 'A $\\pm$ means it is not a function.', 'An odd power of $y$ is fine.']
      } },

      { calm: true, md: 'Nothing on this page needs a graphing calculator or a steady hand. Plotting four points and joining them is enough for every question you will be asked.\n\nThe vertical line test sounds technical but it is just the definition drawn out: one input, one output means one height above each $x$. If you can picture sliding a ruler across the page, you already know it.\n\nIf the four shapes will not stick, make the table yourself once for each. Doing it beats memorising it.' },

      { sid: '2.2', title: 'Can I do this?',
        intro: 'Tick these off when you are sure. Nothing here is marked — it is just for you to see what is solid and what still needs another go.',
        checklist: [
          'Build a table of values and plot the points',
          'Stop the graph at the ends when the domain is restricted',
          'Sketch $y=x^2$, $y=x^3$, $y=\\sqrt{x}$ and $y=|x|$ without working them out',
          'Say why $\\sqrt{x}$ does not exist to the left of $0$',
          'Use the vertical line test on a picture',
          'Decide whether an equation gives $y$ as a function of $x$ by solving for $y$',
          'Spot that an even power of $y$ is what breaks it, and an odd power does not'
        ] }
    ],

    examples: [
      { title: 'A table for a power function',
        problem: 'Make a table of values for $f(x) = x^2$ using $x = -2, -1, 0, 1, 2$, and say what shape the graph is.',
        steps: [
          { text: 'Square each value. Squaring kills the minus signs.', math: 'f(-2)=4,\\ f(-1)=1,\\ f(0)=0,\\ f(1)=1,\\ f(2)=4' },
          { text: 'Plot $(-2,4)$, $(-1,1)$, $(0,0)$, $(1,1)$, $(2,4)$.' },
          { text: 'The heights come in matching pairs either side of $0$, which is why the shape is a symmetric U.' }
        ],
        answer: 'A U-shaped curve (a parabola) with its lowest point at the origin',
        checklist: ['Square each $x$, keeping track of signs.', 'Notice matching values either side of zero.', 'Plot and join smoothly.', 'Expect a symmetric U.'] },

      { title: 'Reading the vertical line test',
        problem: 'A curve passes through both $(2,3)$ and $(2,-3)$. Can it be the graph of a function?',
        steps: [
          { text: 'Both points sit directly above and below $x = 2$ — the same input.' },
          { text: 'So the input $2$ would have to produce two different outputs, $3$ and $-3$.' },
          { text: 'A function gives exactly one output per input, so this cannot be a function. The upright line $x=2$ hits the curve twice.' }
        ],
        answer: 'No — one input with two outputs',
        checklist: ['Look for two points sharing an $x$.', 'That means one input, two outputs.', 'Which the definition forbids.', 'Equivalently, a vertical line hits twice.'] }
    ],

    exercises: [
      { id: '2.2-e1', prompt: 'For $f(x) = x + 1$, find the value of $f(x)$ when $x = -1$ (the first row of the table).',
        answer: { type: 'number', value: 0 },
        hints: ['Substitute $-1$ into $x+1$.'],
        solution: [{ text: 'Substitute.', math: 'f(-1) = -1 + 1 = 0' }] },

      { id: '2.2-e2', prompt: 'For $f(x) = x^2$, find $f(-3)$.',
        answer: { type: 'number', value: 9 },
        hints: ['Square the whole of $-3$, brackets included.', '$(-3)^2 = 9$, not $-9$.'],
        solution: [{ text: 'Square it.', math: 'f(-3) = (-3)^2 = 9' }] },

      { id: '2.2-e3', prompt: 'For $f(x) = x^3$, find $f(-2)$.',
        answer: { type: 'number', value: -8 },
        hints: ['Cubing keeps the minus sign, unlike squaring.', '$(-2)^3 = -2 \\times -2 \\times -2$.'],
        solution: [{ text: 'Cube it.', math: 'f(-2) = (-2)^3 = -8' },
          { text: 'An odd power keeps the sign — that is why $x^3$ goes below the axis but $x^2$ never does.' }] },

      { id: '2.2-e4', prompt: 'For $f(x) = |x|$, find $f(-5)$.',
        answer: { type: 'number', value: 5 },
        hints: ['The bars mean "distance from zero", which is never negative.'],
        solution: [{ text: 'The bars strip the sign.', math: 'f(-5) = |-5| = 5' }] },

      { id: '2.2-e5', prompt: 'For $f(x) = \\sqrt{x}$, find $f(9)$.',
        answer: { type: 'number', value: 3 },
        hints: ['What number squared gives $9$?'],
        solution: [{ text: 'Take the root.', math: 'f(9) = \\sqrt9 = 3' }] },

      { id: '2.2-e6', prompt: 'A curve passes through $(4, 1)$ and $(4, -1)$. Is it the graph of a function of $x$?',
        answer: { type: 'choice', value: 'no', options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }], wrongMessage: 'Not quite — look at what the two points have in common.' },
        hints: ['Both points have the same $x$. What does that mean for the input $4$?', 'One input would give two different outputs, which a function cannot do.'],
        solution: [{ text: 'Both points sit above $x=4$, so the vertical line $x=4$ hits the curve twice.' },
          { text: 'That is one input with two outputs, so it is not a function.' }] },

      { id: '2.2-e7', prompt: 'Does $3x - 5y = 7$ define $y$ as a function of $x$?',
        answer: { type: 'choice', value: 'yes', options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }], wrongMessage: 'Not quite — rearrange for $y$ and see whether a $\\pm$ appears.' },
        hints: ['Solve for $y$ and see how many answers you get.', '$y = \\dfrac{3x-7}{5}$ — just one, with no $\\pm$.'],
        solution: [{ text: 'Rearrange.', math: '-5y = 7 - 3x \\Rightarrow y = \\frac{3x-7}{5}' },
          { text: 'One clean answer, so yes — it is a function.' }] },

      { id: '2.2-e8', prompt: 'Does $2x - 4y^2 = 3$ define $y$ as a function of $x$?',
        answer: { type: 'choice', value: 'no', options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }], wrongMessage: 'Not quite — there is a $y^2$, so what happens when you solve for $y$?' },
        hints: ['There is a $y^2$. What do you have to do to get $y$ on its own?', 'Square-rooting forces a $\\pm$, which gives two outputs for one input.'],
        solution: [{ text: 'Solve for $y$.', math: '4y^2 = 2x-3 \\Rightarrow y = \\pm\\sqrt{\\frac{2x-3}{4}}' },
          { text: 'The $\\pm$ means two outputs, so it is not a function.' }] },

      { id: '2.2-e9', prompt: 'Does $x = y^3$ define $y$ as a function of $x$?',
        answer: { type: 'choice', value: 'yes', options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }], wrongMessage: 'Not quite — a cube root behaves differently from a square root.' },
        hints: ['Solve for $y$ by cube-rooting.', 'A cube root gives exactly one answer, with no $\\pm$ — unlike a square root.'],
        solution: [{ text: 'Cube-root both sides.', math: 'y = \\sqrt[3]{x}' },
          { text: 'One answer for every $x$, so yes. Odd powers are safe; even ones are not.' }] },

      { id: '2.2-e10', prompt: 'Does $2|x| + y = 0$ define $y$ as a function of $x$?',
        answer: { type: 'choice', value: 'yes', options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }], wrongMessage: 'Not quite — the bars are around $x$, not $y$.' },
        hints: ['Get $y$ on its own. The bars are around $x$, which is the input, not the output.', '$y = -2|x|$ — one answer for each $x$.'],
        solution: [{ text: 'Rearrange.', math: 'y = -2|x|' },
          { text: 'One output per input, so yes. Bars around the **input** never break the function rule.' }] },

      { id: '2.2-e11', prompt: 'Solve $3x - 5y = 7$ for $y$. Give your answer in terms of $x$.',
        answer: { type: 'expression', value: '(3*x-7)/5', vars: ['x'] },
        hints: ['Move the $3x$ across, then divide by $-5$.', 'Dividing both sides by $-5$ flips the signs on the top.'],
        solution: [{ text: 'Isolate the $y$ term.', math: '-5y = 7 - 3x' },
          { text: 'Divide by $-5$.', math: 'y = \\frac{3x-7}{5}' }] },

      { id: '2.2-e12', prompt: 'For $f(x) = \\sqrt{x}$, what is the smallest value of $x$ you are allowed to use?',
        answer: { type: 'number', value: 0 },
        hints: ['You cannot square-root a negative and get a real answer.', 'So the inside must be at least zero.'],
        solution: [{ text: 'The inside of a square root cannot be negative, so $x \\ge 0$.' },
          { text: 'The smallest allowed value is $0$, which is where the graph starts.' }] }
    ],

    generators: [
      { id: '2.2-g-table', title: 'Table of values', desc: 'One row of a table for a basic shape.',
        make(r) {
          const kind = r.pick(['square', 'cube', 'abs', 'linear']);
          const x = r.nz(-5, 5);
          let tex, val, sub;   // sub = the substituted line, before the answer
          const bx = x < 0 ? '(' + x + ')' : String(x);
          if (kind === 'square') { tex = 'x^2'; val = x * x; sub = bx + '^2'; }
          else if (kind === 'cube') { tex = 'x^3'; val = x * x * x; sub = bx + '^3'; }
          else if (kind === 'abs') { tex = '|x|'; val = Math.abs(x); sub = '|' + x + '|'; }
          else { const m = r.nz(-4, 4), c = r.nz(-6, 6); tex = M.polyTex([m, c]); val = m * x + c; sub = (m === 1 ? '' : m === -1 ? '-' : m) + '(' + x + ') ' + M.signed(c) + ' = ' + (m * x) + ' ' + M.signed(c); }
          return {
            prompt: 'For $f(x) = ' + tex + '$, find $f(' + x + ')$.',
            answer: { type: 'number', value: val },
            hints: ['Put $' + x + '$ in, in brackets.',
              kind === 'square' ? 'Squaring makes the answer positive whatever the sign of the input.'
                : kind === 'cube' ? 'Cubing **keeps** the sign, unlike squaring.'
                : kind === 'abs' ? 'The bars just strip off any minus sign.' : 'Multiply first, then add.'],
            solution: [{ text: 'Substitute, then work it out.', math: 'f(' + x + ') = ' + sub + ' = ' + val }]
          };
        } },

      { id: '2.2-g-vlt', title: 'Is it a function?', desc: 'Two points, one decision.',
        make(r) {
          const x1 = r.nz(-5, 5), y1 = r.nz(-5, 5);
          const same = r.bool(0.5);
          const x2 = same ? x1 : x1 + r.pick([-2, -1, 1, 2]);
          const y2 = same ? -y1 : r.nz(-5, 5);
          return {
            prompt: 'A curve passes through $(' + x1 + ', ' + y1 + ')$ and $(' + x2 + ', ' + y2 + ')$. Could it be the graph of a function of $x$?',
            answer: { type: 'choice', value: same ? 'no' : 'yes',
              options: [{ id: 'yes', label: 'Yes, it could' }, { id: 'no', label: 'No, it cannot' }],
              wrongMessage: 'Not quite — compare the two $x$-coordinates.' },
            hints: ['Compare the two across-coordinates.',
              same ? 'They share the same $x$, so that one input would need two outputs.' : 'They have different $x$ values, so there is no clash — each input still has one output.'],
            solution: [{ text: same ? 'Both points sit above $x = ' + x1 + '$, so a vertical line hits the curve twice.' : 'The points have different $x$ values, so no vertical line hits twice because of them.' },
              { text: same ? 'One input with two outputs — not a function.' : 'Nothing here breaks the rule, so it could be a function.' }]
          };
        } },

      { id: '2.2-g-solve-y', title: 'Does the equation give a function?', desc: 'Solve for $y$ and look for a $\\pm$.',
        make(r) {
          const a = r.nz(-6, 6), b = r.nz(-6, 6), c = r.nz(-9, 9);
          const pow = r.pick([1, 1, 2, 3]);
          const yTex = pow === 1 ? 'y' : 'y^' + pow;
          const isFn = pow !== 2;
          // b·y^p = c - a·x, so y^p = (c - a·x)/b — kept with a positive bottom
          const sg = b < 0 ? -1 : 1;
          const top = String(sg * c) + M.term(-sg * a, 'x', false);
          const iso = Math.abs(b) === 1 ? top : '\\dfrac{' + top + '}{' + Math.abs(b) + '}';
          return {
            prompt: 'Does $' + M.term(a, 'x') + M.term(b, yTex, false) + ' = ' + c + '$ define $y$ as a function of $x$?',
            answer: { type: 'choice', value: isFn ? 'yes' : 'no',
              options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }],
              wrongMessage: 'Not quite — rearrange for $y$ and see whether a $\\pm$ has to appear.' },
            hints: ['Get the $y$ term on its own, then undo its power.',
              pow === 1 ? 'Just divide — one clean answer, no $\\pm$.'
                : pow === 2 ? 'Square-rooting forces a $\\pm$, so one input would give two outputs.'
                : 'A cube root gives exactly one answer, so no $\\pm$ appears.'],
            solution: [{ text: b === 1 ? 'Move the $x$ term to the other side.' : 'Move the $x$ term to the other side, then divide by $' + b + '$.', math: yTex + ' = ' + iso },
              { text: pow === 2 ? 'To undo the square you must take a square root, and that needs a $\\pm$.'
                  : 'To undo the cube, take a cube root. Cube roots have only one answer, so no $\\pm$.',
                math: 'y = ' + (pow === 2 ? '\\pm\\sqrt{' + iso + '}' : '\\sqrt[3]{' + iso + '}') },
              { text: pow === 2 ? 'The $\\pm$ gives two outputs for one input — **not** a function.' : 'Exactly one output for each input — so **yes**, it is a function.' }]
              .filter((st, i) => !(pow === 1 && i === 1))
          };
        } }
    ]
  });
})();
