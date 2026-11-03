/* 2.8 One-to-One Functions and Their Inverses
   Worksheet scope: the one-to-one definition and the horizontal line test, reading
   an inverse off a graph or a table, the inverse function property, and finding an
   inverse algebraically. */
(function () {
  const M = CH.M, V = CH.V;

  CH.registerSection({
    id: '2.8', chapter: 2, exam: 2, title: 'One-to-One Functions and Their Inverses',
    summary: 'Running a function backwards. Which functions can be reversed at all (the horizontal line test), how to check two functions undo each other, and how to find $f^{-1}$ from a formula.',

    theory: [
      { short: true, md: 'An **inverse** undoes what the function did.\n\n- Only **one-to-one** functions have one: no two inputs may share an output.\n- **Horizontal line test**: if any flat line crosses the graph twice, there is no inverse.\n- To find $f^{-1}$: write $y = f(x)$, **swap $x$ and $y$**, then solve for $y$.\n- The check: $f^{-1}(f(x)) = x$ and $f(f^{-1}(x)) = x$. Each undoes the other.\n- $f^{-1}$ does **not** mean $\\dfrac{1}{f}$. It is a name, not a power.' },

      { h: 'Which functions can be undone?' },
      'Running a function backwards only makes sense if you can tell where you came from. If two different inputs both give $9$, then being told the answer is $9$ leaves you stuck — you cannot know which one it was.',
      { def: 'One-to-one', md: 'A function is **one-to-one** if different inputs always give different outputs:\n\n$$f(x_1) \\ne f(x_2) \\quad\\text{whenever}\\quad x_1 \\ne x_2$$\n\nSaid the other way round: no output is ever used twice.' },
      { example: {
        title: 'One that is and one that is not', label: 'Worked example',
        problem: 'Show $f(x) = 3x+4$ is one-to-one, and show $g(x) = x^2$ is not.',
        steps: [
          { text: 'For $f$: suppose two inputs gave the same output.', math: '3x_1 + 4 = 3x_2 + 4' },
          { text: 'Subtract $4$, then divide by $3$.', math: '3x_1 = 3x_2 \\Rightarrow x_1 = x_2' },
          { text: 'So the only way to get the same output is to have put the same input in — one-to-one.' },
          { text: 'For $g$: one counterexample is enough.', math: 'g(2) = 4 \\quad\\text{and}\\quad g(-2) = 4' },
          { text: 'Two different inputs, same output. So $g$ is **not** one-to-one.' }
        ],
        answer: '$f$ is one-to-one; $g$ is not, since $g(2)=g(-2)=4$',
        checklist: ['To show one-to-one: assume the outputs are equal and deduce the inputs are.', 'To show it is not: find two inputs sharing an output.', 'One counterexample is enough to disprove it.', 'Squaring is the classic failure, because of $\\pm$.']
      } },

      { h: 'The horizontal line test' },
      { key: 'Flat lines this time, not upright ones', md: 'In 2.2 the **vertical** line test asked "is this a function at all?". This one asks a different question.\n\n**A function is one-to-one exactly when no horizontal line crosses its graph more than once.**\n\nA horizontal line is "all the points at this height". If it hits twice, two inputs share that output.' },
      { cols: [
        { svg: V.graph({ xmin: -4, xmax: 4, ymin: -4, ymax: 4, width: 240, tick: 2, fns: [{ f: x => x * x * x / 4 + x / 2 }], segments: [{ x1: -4, y1: 1.5, x2: 4, y2: 1.5, dashed: true, color: 'var(--viz-2)' }], alt: 'An always-increasing curve crossed once by a horizontal line' }), caption: '**One-to-one.** Every flat line hits it at most once, so it can be undone.' },
        { svg: V.graph({ xmin: -4, xmax: 4, ymin: -2, ymax: 6, width: 240, tick: 2, fns: [{ f: x => x * x }], segments: [{ x1: -4, y1: 4, x2: 4, y2: 4, dashed: true, color: 'var(--viz-2)' }], points: [{ x: -2, y: 4, color: 'var(--viz-2)' }, { x: 2, y: 4, color: 'var(--viz-2)' }], alt: 'A parabola crossed twice by a horizontal line' }), caption: '**Not one-to-one.** The height $4$ comes from both $-2$ and $2$.' }
      ] },
      { note: 'Restricting the domain can rescue it', md: '$x^2$ is not one-to-one — but $x^2$ **for $x \\ge 0$** is, because the left-hand half of the U has been thrown away. That is exactly why the worksheet writes $f(x) = 4-x^2,\\ x \\ge 0$: the restriction is doing real work.' },

      { h: 'What the inverse is' },
      { def: 'Inverse function', md: 'If $f$ is one-to-one, its **inverse** $f^{-1}$ sends each output back to the input it came from:\n\n$$f^{-1}(y) = x \\quad\\Longleftrightarrow\\quad f(x) = y$$\n\nSo the inverse just reads the arrows backwards.' },
      { warn: '$f^{-1}$ is not $\\dfrac{1}{f}$', md: 'The $-1$ here is **not** a power. $f^{-1}(x)$ means "the inverse function", not "one over $f(x)$".\n\nIt is an unfortunate piece of notation that everyone has to live with. When you see $f^{-1}$, read it as "f inverse".' },
      { key: 'The property that checks it', md: 'Two functions undo each other exactly when **both** of these hold:\n\n$$f^{-1}(f(x)) = x \\qquad\\text{and}\\qquad f(f^{-1}(x)) = x$$\n\nPut one into the other, in both orders, and you should get a bare $x$ each time. If you do, they are inverses.' },
      { example: {
        title: 'Checking a pair', label: 'Worked example',
        problem: 'Show that $f(x) = 3x+4$ and $g(x) = \\dfrac{x-4}{3}$ are inverses of each other.',
        steps: [
          { text: 'Compose one way, substituting the whole of $g$ into $f$.', math: 'f(g(x)) = 3\\left(\\frac{x-4}{3}\\right) + 4' },
          { text: 'The $3$s cancel.', math: '= (x-4) + 4 = x \\quad\\checkmark' },
          { text: 'Now the other way.', math: 'g(f(x)) = \\frac{(3x+4) - 4}{3}' },
          { text: 'The $4$s cancel, then the $3$s.', math: '= \\frac{3x}{3} = x \\quad\\checkmark' },
          { text: 'Both give back a bare $x$, so they are inverses.' }
        ],
        answer: 'Both compositions give $x$, so $g = f^{-1}$',
        checklist: ['Compose both ways round.', 'Substitute the whole function, in brackets.', 'Simplify fully.', 'You need a bare $x$ **both** times.']
      } },

      { h: 'Finding the inverse from a formula' },
      { key: 'Write, swap, solve', md: '1. Write $y = f(x)$.\n2. **Swap** $x$ and $y$.\n3. Solve the new equation for $y$.\n4. That $y$ is $f^{-1}(x)$.\n\nThe swap is the whole idea: the inverse turns outputs into inputs, so trading the letters is exactly the right move.' },
      { example: {
        title: 'A fraction inverse', label: 'Worked example',
        problem: 'Find the inverse of $f(x) = \\dfrac{2x+5}{x-7}$.',
        steps: [
          { text: 'Write $y = f(x)$, then swap the letters.', math: 'x = \\frac{2y+5}{y-7}' },
          { text: 'Multiply up to clear the fraction.', math: 'x(y-7) = 2y+5' },
          { text: 'Expand, then gather every $y$ term on one side.', math: 'xy - 7x = 2y + 5 \\Rightarrow xy - 2y = 5 + 7x' },
          { text: 'Factor $y$ out and divide — exactly the "solve for a letter" move from 1.5.', math: 'y(x-2) = 7x+5 \\Rightarrow y = \\frac{7x+5}{x-2}' }
        ],
        answer: '$f^{-1}(x) = \\dfrac{7x+5}{x-2}$',
        checklist: ['Write $y = f(x)$ and swap $x$ and $y$.', 'Clear any fraction by multiplying up.', 'Gather every $y$ term on one side.', 'Factor $y$ out, then divide.']
      } },

      { h: 'Reading an inverse off a graph or a table' },
      { tip: 'Just read the arrow backwards', md: 'From a **table**: to find $f^{-1}(5)$, look along the $f(x)$ row for a $5$, then read **up** to the $x$ above it.\n\nFrom a **graph**: to find $f^{-1}(5)$, find the height $5$ on the vertical axis, go across to the curve, then read down to the $x$.\n\nIn both cases you are doing the usual lookup in reverse.' },

      { calm: true, md: 'Two ideas here, and they are less alike than they look.\n\n**Can it be undone?** is the horizontal line test, and it is a yes/no picture question. **What is the inverse?** is write-swap-solve, and it is pure algebra you already did in 1.5 when you rearranged formulas for a letter.\n\nIf an inverse question looks hard, it is almost always the rearranging that is hard, not the inverse part. Cover up the words and ask: *can I solve this for $y$?* That is the whole task.\n\nAnd if the $f^{-1}$ notation keeps reading as "one over", you are in good company — just say "f inverse" out loud every time you see it.' },

      { sid: '2.8', title: 'Can I do this?',
        intro: 'Tick these off when you are sure. Nothing here is marked — it is just for you to see what is solid and what still needs another go.',
        checklist: [
          'Say what one-to-one means, in terms of inputs and outputs',
          'Show a linear function is one-to-one',
          'Show a function is **not** one-to-one by finding two inputs with the same output',
          'Use the horizontal line test on a graph',
          'Explain why $f^{-1}$ does not mean $1/f$',
          'Check two functions are inverses by composing them both ways',
          'Find $f^{-1}$ by writing, swapping, and solving for $y$',
          'Find an inverse when the function is a fraction',
          'Read $f^{-1}$ of a number off a table or a graph'
        ] }
    ],

    examples: [
      { title: 'An inverse with a restricted domain',
        problem: 'Find the inverse of $f(x) = 4 - x^2$ for $x \\ge 0$.',
        steps: [
          { text: 'Without the restriction this would not have an inverse at all — $f(2)$ and $f(-2)$ both give $0$. The $x \\ge 0$ throws away half the parabola and rescues it.' },
          { text: 'Write $y = f(x)$ and swap.', math: 'x = 4 - y^2' },
          { text: 'Solve for $y$.', math: 'y^2 = 4 - x' },
          { text: 'Square-rooting would normally need a $\\pm$ — but the original domain was $y \\ge 0$, so take the **positive** root only.', math: 'y = \\sqrt{4-x}' }
        ],
        answer: '$f^{-1}(x) = \\sqrt{4-x}$',
        checklist: ['Check the restriction is what makes it one-to-one.', 'Write, swap, solve.', 'When square-rooting, use the original domain to pick the sign.', 'Keep only the branch that was kept.'] },

      { title: 'Reading an inverse from a table',
        problem: 'For this one-to-one $f$, find $f^{-1}(5)$ and $f(f^{-1}(6))$.\n\n| $x$ | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| $f(x)$ | 4 | 6 | 2 | 5 | 0 | 1 |',
        steps: [
          { text: 'For $f^{-1}(5)$, hunt for $5$ in the **bottom** row.' },
          { text: 'It sits under $x = 4$, so that is where the $5$ came from.', math: 'f^{-1}(5) = 4' },
          { text: 'For $f(f^{-1}(6))$, you could look it all up — but the inverse property does it instantly.' },
          { text: 'A function and its inverse undo each other, so $f(f^{-1}(6)) = 6$ without any lookup at all.' }
        ],
        answer: '$f^{-1}(5) = 4$ and $f(f^{-1}(6)) = 6$',
        checklist: ['For $f^{-1}$, search the output row.', 'Read back up to the input above it.', 'Spot $f(f^{-1}(\\ldots))$ and use the property.', 'They cancel, leaving the number itself.'] }
    ],

    exercises: [
      { id: '2.8-e1', prompt: 'Is $g(x) = \\sqrt{x}$ one-to-one?',
        answer: { type: 'choice', value: 'yes', options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }], wrongMessage: 'Not quite — could two different inputs ever give the same root?' },
        hints: ['Could two different non-negative numbers have the same square root?', 'The graph only ever climbs, so no horizontal line hits it twice.'],
        solution: [{ text: 'The curve rises steadily, so each height is reached once.' },
          { text: 'It passes the horizontal line test, so yes — one-to-one.' }] },

      { id: '2.8-e2', prompt: 'Is $h(x) = x^2 - 2x$ one-to-one?',
        answer: { type: 'choice', value: 'no', options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }], wrongMessage: 'Not quite — this is a parabola. What shape does its graph have?' },
        hints: ['It is a parabola, so what does its graph look like?', 'A U has two sides at the same height. Try $h(0)$ and $h(2)$.'],
        solution: [{ text: 'Test two inputs.', math: 'h(0) = 0 \\quad\\text{and}\\quad h(2) = 4 - 4 = 0' },
          { text: 'Two different inputs give the same output, so it is not one-to-one.' }] },

      { id: '2.8-e3', prompt: 'Is $f(x) = \\dfrac{1}{x^2}$ one-to-one?',
        answer: { type: 'choice', value: 'no', options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }], wrongMessage: 'Not quite — try putting in a number and its negative.' },
        hints: ['Try a number and its negative.', '$f(1) = 1$ and $f(-1) = 1$, because squaring kills the sign.'],
        solution: [{ text: 'Test two inputs.', math: 'f(1) = 1 \\quad\\text{and}\\quad f(-1) = 1' },
          { text: 'Same output from different inputs, so it is not one-to-one.' }] },

      { id: '2.8-e4', prompt: 'Find the inverse of $f(x) = 3x + 5$. Give $f^{-1}(x)$ in terms of $x$.',
        answer: { type: 'expression', value: '(x-5)/3', vars: ['x'] },
        hints: ['Write $y = 3x+5$, then swap the letters: $x = 3y+5$.', 'Now solve for $y$: subtract $5$, then divide by $3$.'],
        solution: [{ text: 'Swap.', math: 'x = 3y + 5' },
          { text: 'Subtract $5$ from both sides.', math: 'x - 5 = 3y' },
          { text: 'Divide by $3$.', math: 'f^{-1}(x) = \\frac{x-5}{3}' }] },

      { id: '2.8-e5', prompt: 'Find the inverse of $f(x) = \\dfrac{1}{x+2}$. Give $f^{-1}(x)$ in terms of $x$.',
        answer: { type: 'expression', value: '1/x - 2', vars: ['x'] },
        hints: ['Swap: $x = \\dfrac{1}{y+2}$.', 'Multiply up: $x(y+2) = 1$, so $y+2 = \\dfrac1x$.', 'Then subtract $2$.'],
        solution: [{ text: 'Swap and clear the fraction.', math: 'x = \\frac{1}{y+2} \\Rightarrow y + 2 = \\frac1x' },
          { text: 'Solve for $y$.', math: 'y = \\frac1x - 2' }] },

      { id: '2.8-e6', prompt: 'Find the inverse of $f(x) = \\dfrac{2x+5}{x-7}$. Give $f^{-1}(x)$ in terms of $x$.',
        answer: { type: 'expression', value: '(7*x+5)/(x-2)', vars: ['x'] },
        hints: ['Swap first: $x = \\dfrac{2y+5}{y-7}$.', 'Multiply up: $x(y-7) = 2y+5$, then expand.', 'Gather the $y$ terms on one side, factor $y$ out, and divide.'],
        solution: [{ text: 'Swap and multiply up.', math: 'x(y-7) = 2y+5' },
          { text: 'Expand and gather the $y$ terms.', math: 'xy - 2y = 5 + 7x' },
          { text: 'Factor and divide.', math: 'y = \\frac{7x+5}{x-2}' }] },

      { id: '2.8-e7', prompt: 'Find the inverse of $f(x) = \\sqrt{5+8x}$. Give $f^{-1}(x)$ in terms of $x$.',
        answer: { type: 'expression', value: '(x^2-5)/8', vars: ['x'] },
        hints: ['Swap: $x = \\sqrt{5+8y}$.', 'Square both sides to get rid of the root: $x^2 = 5+8y$.', 'Then solve for $y$.'],
        solution: [{ text: 'Swap and square.', math: 'x^2 = 5 + 8y' },
          { text: 'Subtract $5$, then divide by $8$.', math: 'f^{-1}(x) = \\frac{x^2-5}{8}' },
          { text: 'One extra detail for full marks: a square root never gives a negative answer, so the outputs of $f$ — which become the inputs of $f^{-1}$ — are all $\\ge 0$. Write $x \\ge 0$ next to the answer.', math: 'f^{-1}(x) = \\frac{x^2-5}{8}, \\quad x \\ge 0' }] },

      { id: '2.8-e8', prompt: 'Find the inverse of $f(x) = 4 - x^2$ for $x \\ge 0$. Give $f^{-1}(x)$ in terms of $x$.',
        answer: { type: 'expression', value: 'sqrt(4-x)', vars: ['x'] },
        hints: ['Swap: $x = 4 - y^2$, so $y^2 = 4-x$.', 'Square-rooting would normally need $\\pm$ — but the original had $x \\ge 0$.', 'So take the positive root only.'],
        solution: [{ text: 'Swap and rearrange.', math: 'y^2 = 4 - x' },
          { text: 'The original domain was $x \\ge 0$, so keep the positive branch.', math: 'y = \\sqrt{4-x}' }] },

      { id: '2.8-e9', prompt: 'Using the table below, find $f^{-1}(5)$.\n\n| $x$ | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| $f(x)$ | 4 | 6 | 2 | 5 | 0 | 1 |',
        answer: { type: 'number', value: 4 },
        hints: ['Look for $5$ in the **bottom** row, not the top.', 'It appears under $x = 4$.'],
        solution: [{ text: 'The output $5$ sits below the input $4$.', math: 'f^{-1}(5) = 4' }] },

      { id: '2.8-e10', prompt: 'Using the same table, find $f(f^{-1}(6))$.',
        answer: { type: 'number', value: 6 },
        hints: ['You can look it up — but there is a shortcut.', 'A function and its inverse undo each other.'],
        solution: [{ text: 'By the inverse property, $f(f^{-1}(x)) = x$ for every $x$.', math: 'f(f^{-1}(6)) = 6' }] },

      { id: '2.8-e11', prompt: 'If $f(x) = 3x + 4$ and $g(x) = \\dfrac{x-4}{3}$, what is $f(g(x))$? Give your answer in terms of $x$.',
        answer: { type: 'expression', value: 'x', vars: ['x'] },
        hints: ['Substitute the whole of $g$ into $f$: $3\\left(\\dfrac{x-4}{3}\\right)+4$.', 'The $3$s cancel, then the $4$s.'],
        solution: [{ text: 'Substitute.', math: 'f(g(x)) = 3\\left(\\frac{x-4}{3}\\right) + 4' },
          { text: 'Cancel and tidy.', math: '= x - 4 + 4 = x' },
          { text: 'Getting a bare $x$ is exactly what says these two are inverses.' }] },

      { id: '2.8-e12', prompt: 'A one-to-one function has $f(3) = 8$. What is $f^{-1}(8)$?',
        answer: { type: 'number', value: 3 },
        hints: ['The inverse sends the output back to the input it came from.', 'The $8$ came from $3$.'],
        solution: [{ text: 'Since $f(3)=8$, the inverse reads that arrow backwards.', math: 'f^{-1}(8) = 3' }] }
    ],

    generators: [
      { id: '2.8-g-linear-inv', title: 'Inverse of a linear function', desc: 'Write, swap, solve.',
        make(r) {
          const m = r.nz(-6, 6), c = r.nz(-9, 9);
          return {
            prompt: 'Find the inverse of $f(x) = ' + M.polyTex([m, c]) + '$. Give $f^{-1}(x)$ in terms of $x$.',
            answer: { type: 'expression', value: '(x - (' + c + '))/(' + m + ')', vars: ['x'] },
            hints: ['Write $y = ' + M.polyTex([m, c]) + '$, then swap $x$ and $y$.',
              'That gives $x = ' + M.term(m, 'y') + ' ' + M.signed(c) + '$.',
              'Now undo: ' + (c < 0 ? 'add ' + (-c) : 'subtract ' + c) + (m === 1 ? '.' : ', then divide by $' + m + '$.')],
            solution: [{ text: 'Swap the letters.', math: 'x = ' + M.term(m, 'y') + ' ' + M.signed(c) },
              { text: c < 0 ? 'Add ' + (-c) + ' to both sides.' : 'Subtract ' + c + ' from both sides.', math: M.shift('x', c) + ' = ' + M.term(m, 'y') },
              m === 1 ? { text: 'That is already $y$ on its own.', math: 'f^{-1}(x) = ' + M.shift('x', c) }
                : m === -1 ? { text: 'Multiply both sides by $-1$.', math: 'f^{-1}(x) = ' + M.term(-1, 'x') + ' ' + M.signed(c) }
                : { text: 'Divide by $' + m + '$.', math: 'f^{-1}(x) = ' + (m < 0 ? '-' : '') + '\\frac{' + M.shift('x', c) + '}{' + Math.abs(m) + '}' }]
          };
        } },

      { id: '2.8-g-frac-inv', title: 'Inverse of a fraction', desc: 'Clear the fraction, gather the $y$ terms.',
        make(r) {
          const a = r.nz(-5, 5), b = r.nz(-9, 9), d = r.nz(-9, 9);
          if (a * d === b) return this.make(r);     // avoid a constant function
          // f(x) = (a x + b)/(x + d)  ->  inverse = (-d x + b)/(x - a)
          return {
            prompt: 'Find the inverse of $f(x) = \\dfrac{' + M.polyTex([a, b]) + '}{x ' + (d < 0 ? '- ' + (-d) : '+ ' + d) + '}$. Give $f^{-1}(x)$ in terms of $x$.',
            answer: { type: 'expression', value: '(' + (-d) + '*x + (' + b + '))/(x - (' + a + '))', vars: ['x'] },
            hints: ['Swap first: $x = \\dfrac{' + M.term(a, 'y') + ' ' + M.signed(b) + '}{' + M.shift('y', -d) + '}$.',
              'Multiply both sides by the bottom to clear the fraction, then expand.',
              'Gather every $y$ term on one side, factor $y$ out, then divide.'],
            solution: [{ text: 'Swap and multiply up.', math: 'x(' + M.shift('y', -d) + ') = ' + M.term(a, 'y') + ' ' + M.signed(b) },
              { text: 'Expand, then move the $y$ terms to the left and everything else to the right.', math: 'xy' + M.term(-a, 'y', false) + ' = ' + b + M.term(-d, 'x', false) },
              { text: 'Factor $y$ out of the left.', math: 'y(' + M.shift('x', a) + ') = ' + b + M.term(-d, 'x', false) },
              { text: 'Divide, and write the top in the usual order.', math: 'f^{-1}(x) = \\frac{' + M.term(-d, 'x') + ' ' + M.signed(b) + '}{' + M.shift('x', a) + '}' }]
          };
        } },

      { id: '2.8-g-onetoone', title: 'Is it one-to-one?', desc: 'Horizontal line test, or a counterexample.',
        make(r) {
          const kind = r.pick(['linear', 'even', 'root', 'even']);
          let tex, yes, why;
          if (kind === 'linear') {
            const m = r.nz(-5, 5), c = r.nz(-8, 8);
            tex = M.polyTex([m, c]); yes = true; why = 'A straight line with a non-zero slope only ever climbs, or only ever falls.';
          } else if (kind === 'root') {
            const c = r.nz(-6, 6);
            tex = '\\sqrt{x ' + (c < 0 ? '- ' + (-c) : '+ ' + c) + '}'; yes = true; why = 'A square-root curve rises steadily, so it never repeats a height.';
          } else {
            const a = r.nz(-4, 4), c = r.nz(-8, 8);
            tex = (a === 1 ? '' : a === -1 ? '-' : a) + 'x^2' + (c < 0 ? ' - ' + (-c) : ' + ' + c); yes = false;
            why = 'It is a parabola, and the two sides of a U sit at the same height — for example $x$ and $-x$ always agree.';
          }
          return {
            prompt: 'Is $f(x) = ' + tex + '$ one-to-one?',
            answer: { type: 'choice', value: yes ? 'yes' : 'no',
              options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }],
              wrongMessage: 'Not quite — picture the graph and slide a horizontal line across it.' },
            hints: ['Picture the graph, then slide a **horizontal** line across it.',
              'If any flat line hits twice, two inputs share an output.',
              yes ? 'This graph never doubles back, so every height is used at most once.' : 'Try an input and its negative and see whether they agree.'],
            solution: [{ text: why },
              { text: yes ? 'It passes the horizontal line test, so it is one-to-one.' : 'It fails the horizontal line test, so it is not one-to-one.' }]
          };
        } },

      { id: '2.8-g-readback', title: 'Read an inverse backwards', desc: 'From one known value.',
        make(r) {
          const a = r.nz(-9, 9), b = r.nz(-9, 9);
          if (a === b) return this.make(r);
          const askInv = r.bool(0.6);
          return {
            prompt: 'A one-to-one function has $f(' + a + ') = ' + b + '$. ' + (askInv ? 'What is $f^{-1}(' + b + ')$?' : 'What is $f(f^{-1}(' + b + '))$?'),
            answer: { type: 'number', value: askInv ? a : b },
            hints: [askInv ? 'The inverse sends an output back to the input it came from.' : 'A function and its inverse undo each other.',
              askInv ? 'The $' + b + '$ came from $' + a + '$.' : 'So $f(f^{-1}(\\text{anything})) $ gives that thing straight back.'],
            solution: [{ text: askInv ? 'Reading the arrow backwards.' : 'By the inverse property, the two cancel.',
              math: askInv ? 'f^{-1}(' + b + ') = ' + a : 'f(f^{-1}(' + b + ')) = ' + b }]
          };
        } }
    ]
  });
})();
