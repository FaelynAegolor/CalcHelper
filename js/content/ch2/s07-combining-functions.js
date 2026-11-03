/* 2.7 Combining Functions
   Worksheet scope: the algebra of functions and their domains, domains of combined
   expressions, and composition — evaluated at points, from graphs and tables, and
   as a formula. */
(function () {
  const M = CH.M, V = CH.V;
  /* worked substitution lines for the generators: subLin(2, 5, -4) gives "2(-4) + 5 = -8 + 5" */
  const coef = a => a === 1 ? '' : a === -1 ? '-' : String(a);
  const subLin = (a, b, x) => coef(a) + '(' + x + ') ' + M.signed(b) + ' = ' + (a * x) + ' ' + M.signed(b);
  const subSq = (c, d, x) => coef(c) + '(' + x + ')^2 ' + M.signed(d) + ' = ' + (c * x * x) + ' ' + M.signed(d);

  CH.registerSection({
    id: '2.7', chapter: 2, exam: 2, title: 'Combining Functions',
    summary: 'Adding, subtracting, multiplying and dividing two functions — and the one that is genuinely new, **composition**: feeding the output of one straight into the other.',

    theory: [
      { short: true, md: 'Two ways to put functions together.\n\n- **Arithmetic**: $(f+g)(x)$ just means $f(x) + g(x)$. Same for $-$, $\\times$ and $\\div$.\n- The domain of a combination is **wherever both work**, and for $f/g$ you must also throw out where $g(x) = 0$.\n- **Composition** $(f \\circ g)(x) = f(g(x))$ means run $g$ first, then put its answer into $f$.\n- $f \\circ g$ and $g \\circ f$ are almost never the same. Order matters.' },

      { h: 'Adding, subtracting, multiplying, dividing' },
      { key: 'Exactly what it looks like', md: '$$(f+g)(x) = f(x) + g(x) \\qquad (f-g)(x) = f(x) - g(x)$$\n$$(fg)(x) = f(x)\\,g(x) \\qquad \\left(\\frac{f}{g}\\right)(x) = \\frac{f(x)}{g(x)}$$\n\nThere is no trick here. Write out each function, then do the arithmetic.' },
      { key: 'The domain is where **both** work', md: 'A combination can only be worked out where both functions are defined. So take the domain of $f$, take the domain of $g$, and keep the **overlap**.\n\nFor $\\dfrac{f}{g}$ there is one extra job: also throw out any $x$ where $g(x) = 0$, because that would divide by zero.' },
      { example: {
        title: 'Four combinations and their domains', label: 'Worked example',
        problem: 'Let $f(x) = \\dfrac{1}{x-2}$ and $g(x) = \\sqrt{x}$. Find $f+g$, $fg$ and $f/g$, with domains.',
        steps: [
          { text: 'First the two domains separately. $f$ needs $x \\ne 2$; $g$ needs $x \\ge 0$.' },
          { text: 'The overlap: start at $0$ and go up, but punch out $2$.', math: '[0,2) \\cup (2,\\infty)' },
          { text: 'Now the formulas — just write them out.', math: '(f+g)(x) = \\frac{1}{x-2} + \\sqrt{x}, \\qquad (fg)(x) = \\frac{\\sqrt{x}}{x-2}' },
          { text: 'For $f/g$ there is the extra condition $g(x) \\ne 0$, and $\\sqrt{x}=0$ at $x=0$. So $0$ comes out too.', math: '\\left(\\frac{f}{g}\\right)(x) = \\frac{1}{(x-2)\\sqrt{x}}, \\qquad (0,2)\\cup(2,\\infty)' }
        ],
        answer: '$f+g$ and $fg$ on $[0,2)\\cup(2,\\infty)$; $f/g$ on $(0,2)\\cup(2,\\infty)$',
        checklist: ['Write down each domain separately.', 'Keep the overlap.', 'Write out the combined formula.', 'For $f/g$, also remove where the bottom function is zero.']
      } },

      { h: 'Domains of combined expressions' },
      { tip: 'Collect every condition, then take the overlap', md: 'When one expression has several danger spots, deal with them one at a time and then combine:\n\n- every even root → inside $\\ge 0$\n- every denominator → not zero\n- a root **on the bottom** → inside strictly $> 0$, because it must not be zero either' },
      { example: {
        title: 'Three trickier domains', label: 'Worked example',
        problem: 'Find the domain of (a) $\\sqrt{x} + \\sqrt{3-x}$, (b) $(x-3)^{-1/4}$, (c) $\\dfrac{\\sqrt{x+3}}{x-1}$.',
        steps: [
          { text: '**(a)** Two roots, so two conditions.', math: 'x \\ge 0 \\quad\\text{and}\\quad 3 - x \\ge 0 \\Rightarrow x \\le 3' },
          { text: 'Both at once gives a closed stretch.', math: '[0, 3]' },
          { text: '**(b)** A negative fractional power means a fourth root **on the bottom**.', math: '(x-3)^{-1/4} = \\frac{1}{\\sqrt[4]{x-3}}' },
          { text: 'The inside must be $\\ge 0$ for the root, but also $\\ne 0$ because it is on the bottom. So strictly positive.', math: '(3, \\infty)' },
          { text: '**(c)** Root on top needs $x+3 \\ge 0$; bottom needs $x \\ne 1$.', math: '[-3, 1) \\cup (1, \\infty)' }
        ],
        answer: '(a) $[0,3]$  (b) $(3,\\infty)$  (c) $[-3,1)\\cup(1,\\infty)$',
        checklist: ['List every root and every bottom.', 'Root: inside $\\ge 0$. Bottom: not zero.', 'A root on the bottom needs **both**, so strictly $> 0$.', 'Keep only what satisfies every condition.']
      } },

      { h: 'Composition: one machine feeding another' },
      { def: 'Composition', md: '$$(f \\circ g)(x) = f(g(x))$$\n\nRun $g$ on $x$ first. Whatever comes out, put **that** into $f$.' },
      { warn: 'Read it right to left', md: 'In $f \\circ g$, the one **nearest the $x$** goes first. That is $g$.\n\nIt reads backwards compared with how it is written, which is why so many people do it the wrong way round. If it helps: the brackets in $f(g(x))$ make the order obvious — you always work from the inside out, exactly like arithmetic.' },
      { widget: 'composition-chain', hint: 'Try it: change x, then swap the order' },
      { example: {
        title: 'Composition at a point', label: 'Worked example',
        problem: 'Let $f(x) = 2x-3$ and $g(x) = 4 - x^2$. Find $f(g(0))$ and $g(f(0))$.',
        steps: [
          { text: 'For $f(g(0))$, work from the inside out. Start with $g(0)$.', math: 'g(0) = 4 - 0^2 = 4' },
          { text: 'Now put that answer into $f$.', math: 'f(4) = 2(4) - 3 = 5' },
          { text: 'For $g(f(0))$ the order swaps. Start with $f(0)$.', math: 'f(0) = 2(0) - 3 = -3' },
          { text: 'Now put $-3$ into $g$, in brackets.', math: 'g(-3) = 4 - (-3)^2 = 4 - 9 = -5' },
          { text: 'Different answers from the same two functions — that is the point.' }
        ],
        answer: '$f(g(0)) = 5$ and $g(f(0)) = -5$',
        checklist: ['Work from the inside out.', 'Do the inner function first and get a number.', 'Put that number into the outer function.', 'Expect the two orders to disagree.']
      } },

      { h: 'Composition as a formula' },
      { key: 'Substitute the whole function', md: 'To find $(f \\circ g)(x)$ as a formula, write out $f$ and put the **entire expression for $g$** wherever $x$ appeared — in brackets.\n\nIt is the same move as $f(a-1)$ in 2.1, only now the thing going in is itself a function.' },
      { example: {
        title: 'Both orders as formulas', label: 'Worked example',
        problem: 'For $f(x) = 2x+3$ and $g(x) = 4x-1$, find $(f \\circ g)(x)$ and $(g \\circ f)(x)$.',
        steps: [
          { text: 'For $f \\circ g$, put the whole of $g$ into $f$.', math: 'f(g(x)) = 2(4x-1) + 3' },
          { text: 'Expand and tidy.', math: '= 8x - 2 + 3 = 8x + 1' },
          { text: 'For $g \\circ f$, put the whole of $f$ into $g$.', math: 'g(f(x)) = 4(2x+3) - 1' },
          { text: 'Expand and tidy.', math: '= 8x + 12 - 1 = 8x + 11' },
          { text: 'Same $8x$, different constants — so $f \\circ g \\ne g \\circ f$.' }
        ],
        answer: '$(f\\circ g)(x) = 8x+1$ and $(g\\circ f)(x) = 8x+11$',
        checklist: ['Decide which function goes first.', 'Substitute the whole of it, in brackets.', 'Expand and collect.', 'Check the two orders give different answers.']
      } },

      { calm: true, md: 'The arithmetic half of this section is easier than it looks — $(f+g)(x)$ really is just $f(x)+g(x)$, with no hidden rule.\n\nComposition is the only genuinely new idea, and the one thing to hold on to is **inside first**. When you see $f(g(2))$, cover up the $f$ with your finger, work out $g(2)$, then uncover it and put the number in. That finger trick gets this right every time, and it never stops working.\n\nIf you catch yourself doing $f$ first, you are not bad at this — you are reading left to right, which is what reading usually means.' },

      { sid: '2.7', title: 'Can I do this?',
        intro: 'Tick these off when you are sure. Nothing here is marked — it is just for you to see what is solid and what still needs another go.',
        checklist: [
          'Write down $f+g$, $f-g$, $fg$ and $f/g$ as formulas',
          'Find the domain of a combination by taking the overlap',
          'Remember the extra condition $g(x) \\ne 0$ for $f/g$',
          'Handle a domain with several roots and bottoms at once',
          'Work out $f(g(a))$ at a number, inside first',
          'Say why $f \\circ g$ and $g \\circ f$ are usually different',
          'Find $(f \\circ g)(x)$ as a formula by substituting the whole function',
          'Read a composition off a table or a pair of graphs'
        ] }
    ],

    examples: [
      { title: 'Composition from a table',
        problem: 'The table gives $f$ and $g$. Find $g(f(2))$ and $(f \\circ g)(6)$.\n\n| $x$ | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| $f(x)$ | 2 | 3 | 5 | 1 | 6 | 3 |\n| $g(x)$ | 3 | 5 | 6 | 2 | 1 | 4 |',
        steps: [
          { text: 'For $g(f(2))$, start inside. Read $f(2)$ from the table.', math: 'f(2) = 3' },
          { text: 'Now look up $g$ at that answer.', math: 'g(3) = 6' },
          { text: 'For $(f\\circ g)(6)$, that means $f(g(6))$, so start with $g(6)$.', math: 'g(6) = 4' },
          { text: 'Then look up $f$ there.', math: 'f(4) = 1' }
        ],
        answer: '$g(f(2)) = 6$ and $(f\\circ g)(6) = 1$',
        checklist: ['Identify the inner function.', 'Look its value up in the table.', 'Take that answer as the new input.', 'Look up the outer function at it.'] },

      { title: 'A composition that simplifies',
        problem: 'For $f(x) = x^2$ and $g(x) = \\sqrt{x-3}$, find $(f \\circ g)(x)$ and say what its domain is.',
        steps: [
          { text: 'Put the whole of $g$ into $f$ — that means squaring it.', math: 'f(g(x)) = \\left(\\sqrt{x-3}\\right)^2' },
          { text: 'Squaring undoes the square root.', math: '= x - 3' },
          { text: 'But the domain is **not** everything. The inner function had to work first, and $\\sqrt{x-3}$ needs $x-3 \\ge 0$.' },
          { text: 'So the formula is $x-3$, but only for $x \\ge 3$.', math: '[3, \\infty)' }
        ],
        answer: '$(f\\circ g)(x) = x-3$, with domain $[3,\\infty)$',
        checklist: ['Substitute the inner function in full.', 'Simplify if it tidies up.', 'The inner function still has to be defined.', 'So check its domain even when the formula looks harmless.'] }
    ],

    exercises: [
      { id: '2.7-e1', prompt: 'Let $f(x) = x^2$ and $g(x) = 3x - 1$. Find $(f+g)(2)$.',
        answer: { type: 'number', value: 9 },
        hints: ['$(f+g)(2)$ means $f(2) + g(2)$.', '$f(2) = 4$ and $g(2) = 5$.'],
        solution: [{ text: 'Work out each, then add.', math: 'f(2) + g(2) = 4 + 5 = 9' }] },

      { id: '2.7-e2', prompt: 'Let $f(x) = x^2$ and $g(x) = 3x-1$. Find $(fg)(x)$ as a formula, expanded.',
        answer: { type: 'expression', value: '3*x^3 - x^2', vars: ['x'], form: 'expanded' },
        hints: ['$(fg)(x)$ means $f(x) \\times g(x)$.', 'Multiply $x^2$ by $(3x-1)$ and expand.'],
        solution: [{ text: 'Multiply the two.', math: 'x^2(3x-1)' },
          { text: 'Expand.', math: '= 3x^3 - x^2' }] },

      { id: '2.7-e3', prompt: 'Let $f(x) = 2x - 3$ and $g(x) = 4 - x^2$. Find $f(g(0))$.',
        answer: { type: 'number', value: 5 },
        hints: ['Inside first: work out $g(0)$.', '$g(0) = 4$. Now put $4$ into $f$.'],
        solution: [{ text: 'Inner function first.', math: 'g(0) = 4 - 0 = 4' },
          { text: 'Now the outer.', math: 'f(4) = 2(4) - 3 = 5' }] },

      { id: '2.7-e4', prompt: 'With the same $f(x)=2x-3$ and $g(x)=4-x^2$, find $g(f(0))$.',
        answer: { type: 'number', value: -5 },
        hints: ['This time $f$ goes first.', '$f(0) = -3$. Now put $-3$ into $g$, in brackets.', '$(-3)^2 = 9$, so $g(-3) = 4 - 9$.'],
        solution: [{ text: 'Inner function first.', math: 'f(0) = -3' },
          { text: 'Now the outer, with brackets.', math: 'g(-3) = 4 - (-3)^2 = 4 - 9 = -5' }] },

      { id: '2.7-e5', prompt: 'With $f(x)=2x-3$ and $g(x)=4-x^2$, find $(f \\circ g)(-2)$.',
        answer: { type: 'number', value: -3 },
        hints: ['$(f\\circ g)(-2)$ means $f(g(-2))$, so start with $g$.', '$g(-2) = 4 - 4 = 0$.', 'Now put $0$ into $f$.'],
        solution: [{ text: 'Inner first.', math: 'g(-2) = 4 - (-2)^2 = 0' },
          { text: 'Then outer.', math: 'f(0) = -3' }] },

      { id: '2.7-e6', prompt: 'With $f(x)=2x-3$ and $g(x)=4-x^2$, find $(f \\circ g)(x)$ as a formula in $x$.',
        answer: { type: 'expression', value: '5 - 2*x^2', vars: ['x'] },
        hints: ['Put the whole of $g$ into $f$, in brackets: $2(4-x^2) - 3$.', 'Expand and collect.'],
        solution: [{ text: 'Substitute the whole function.', math: 'f(g(x)) = 2(4-x^2) - 3' },
          { text: 'Expand and tidy.', math: '= 8 - 2x^2 - 3 = 5 - 2x^2' }] },

      { id: '2.7-e7', prompt: 'For $f(x) = 2x+3$ and $g(x) = 4x-1$, find $(f \\circ g)(x)$ in terms of $x$.',
        answer: { type: 'expression', value: '8*x + 1', vars: ['x'] },
        hints: ['$g$ goes first, so substitute $4x-1$ into $f$.', '$2(4x-1)+3$ — now expand.'],
        solution: [{ text: 'Substitute.', math: 'f(g(x)) = 2(4x-1)+3' },
          { text: 'Expand and collect.', math: '= 8x - 2 + 3 = 8x+1' }] },

      { id: '2.7-e8', prompt: 'For the same $f(x)=2x+3$ and $g(x)=4x-1$, find $(g \\circ f)(x)$ in terms of $x$.',
        answer: { type: 'expression', value: '8*x + 11', vars: ['x'] },
        hints: ['Now $f$ goes first: substitute $2x+3$ into $g$.', '$4(2x+3)-1$ — expand.'],
        solution: [{ text: 'Substitute the other way round.', math: 'g(f(x)) = 4(2x+3)-1' },
          { text: 'Expand and collect.', math: '= 8x+12-1 = 8x+11' },
          { text: 'Different from $8x+1$, which shows the order matters.' }] },

      { id: '2.7-e9', prompt: 'For $f(x) = x^2$ and $g(x) = \\sqrt{x-3}$, find $(f \\circ g)(x)$ in terms of $x$.',
        answer: { type: 'expression', value: 'x - 3', vars: ['x'] },
        hints: ['Squaring a square root undoes it.', '$\\left(\\sqrt{x-3}\\right)^2 = x-3$.'],
        solution: [{ text: 'Substitute and simplify.', math: 'f(g(x)) = \\left(\\sqrt{x-3}\\right)^2 = x-3' },
          { text: 'The domain is still only $x \\ge 3$, because $g$ has to work first.' }] },

      { id: '2.7-e10', prompt: 'Find the domain of $f(x) = \\sqrt{x} + \\sqrt{3-x}$.',
        answer: { type: 'interval', value: '[0, 3]', vars: ['x'] },
        hints: ['Two roots means two conditions, and both must hold.', 'First root: $x \\ge 0$. Second root: $3-x \\ge 0$, so $x \\le 3$.', 'Keep only the $x$ that satisfy both.'],
        solution: [{ text: 'Each root needs its inside non-negative.', math: 'x \\ge 0 \\quad\\text{and}\\quad x \\le 3' },
          { text: 'Both at once.', math: '[0,3]' }] },

      { id: '2.7-e11', prompt: 'Find the domain of $k(x) = \\dfrac{\\sqrt{x+3}}{x-1}$.',
        answer: { type: 'interval', value: '[-3, 1) U (1, inf)', vars: ['x'] },
        hints: ['There are two things to check: the root on top and the bottom.', 'Root: $x+3 \\ge 0$, so $x \\ge -3$. Bottom: $x \\ne 1$.', 'Start at $-3$ (included) and go up, punching out $1$.'],
        solution: [{ text: 'The root needs $x \\ge -3$; the bottom needs $x \\ne 1$.' },
          { text: 'Both together.', math: '[-3,1) \\cup (1,\\infty)' }] },

      { id: '2.7-e12', prompt: 'Find the domain of $h(x) = (x-3)^{-1/4}$.',
        answer: { type: 'interval', value: '(3, inf)', vars: ['x'] },
        hints: ['A negative power means it is on the bottom: $\\dfrac{1}{\\sqrt[4]{x-3}}$.', 'A fourth root needs its inside $\\ge 0$ — but it is also a denominator, so it cannot be $0$.', 'So the inside must be strictly positive.'],
        solution: [{ text: 'Rewrite it.', math: '(x-3)^{-1/4} = \\frac{1}{\\sqrt[4]{x-3}}' },
          { text: 'Even root needs $\\ge 0$; being on the bottom needs $\\ne 0$. Together, $> 0$.', math: 'x > 3 \\Rightarrow (3,\\infty)' }] }
    ],

    generators: [
      { id: '2.7-g-arith', title: 'Combine two functions', desc: 'Add, subtract or multiply at a point.',
        make(r) {
          const a = r.nz(-4, 4), b = r.nz(-6, 6), c = r.nz(-4, 4), d = r.nz(-6, 6);
          const x = r.nz(-4, 4);
          const op = r.pick(['+', '-', '*']);
          const fv = a * x + b, gv = c * x + d;
          const val = op === '+' ? fv + gv : op === '-' ? fv - gv : fv * gv;
          const name = op === '+' ? '(f+g)' : op === '-' ? '(f-g)' : '(fg)';
          return {
            prompt: 'Let $f(x) = ' + M.polyTex([a, b]) + '$ and $g(x) = ' + M.polyTex([c, d]) + '$. Find $' + name + '(' + x + ')$.',
            answer: { type: 'number', value: val },
            hints: ['Work out $f(' + x + ')$ and $g(' + x + ')$ separately first.',
              '$f(' + x + ') = ' + fv + '$ and $g(' + x + ') = ' + gv + '$.',
              'Now ' + (op === '+' ? 'add them' : op === '-' ? 'subtract, in that order' : 'multiply them') + '.'],
            solution: [{ text: 'Put $' + x + '$ into $f$, in brackets.', math: 'f(' + x + ') = ' + subLin(a, b, x) + ' = ' + fv },
              { text: 'And into $g$.', math: 'g(' + x + ') = ' + subLin(c, d, x) + ' = ' + gv },
              { text: op === '+' ? 'Add the two answers.' : op === '-' ? 'Subtract, $f$ minus $g$.' : 'Multiply the two answers.', math: name + '(' + x + ') = ' + fv + (op === '+' ? ' + ' : op === '-' ? ' - ' : ' \\times ') + M.paren(gv) + ' = ' + val }]
          };
        } },

      { id: '2.7-g-compose-point', title: 'Composition at a point', desc: 'Inside first, then outside.',
        make(r) {
          const a = r.nz(-4, 4), b = r.nz(-6, 6), c = r.nz(-3, 3), d = r.nz(-6, 6);
          const x = r.nz(-3, 3);
          const fFirst = r.bool(0.5);
          const f = t => a * t + b, g = t => c * t * t + d;
          const inner = fFirst ? f(x) : g(x);
          // keep the second step small: g(-15) = -678 tests arithmetic, not composition
          if (Math.abs(inner) > 5) return this.make(r);
          const val = fFirst ? g(inner) : f(inner);
          return {
            prompt: 'Let $f(x) = ' + M.polyTex([a, b]) + '$ and $g(x) = ' + M.polyTex([c, 0, d]) + '$. Find $' + (fFirst ? 'g(f(' + x + '))' : 'f(g(' + x + '))') + '$.',
            answer: { type: 'number', value: val },
            hints: ['Work from the inside out — the function nearest the number goes first.',
              'That is $' + (fFirst ? 'f' : 'g') + '$, and $' + (fFirst ? 'f' : 'g') + '(' + x + ') = ' + inner + '$.',
              'Now put $' + inner + '$ into $' + (fFirst ? 'g' : 'f') + '$, in brackets.'],
            solution: [{ text: 'Inner function first. Put $' + x + '$ into $' + (fFirst ? 'f' : 'g') + '$, in brackets.', math: (fFirst ? 'f' : 'g') + '(' + x + ') = ' + (fFirst ? subLin(a, b, x) : subSq(c, d, x)) + ' = ' + inner },
              { text: 'Now put that answer, $' + inner + '$, into $' + (fFirst ? 'g' : 'f') + '$.', math: (fFirst ? 'g' : 'f') + '(' + inner + ') = ' + (fFirst ? subSq(c, d, inner) : subLin(a, b, inner)) + ' = ' + val }]
          };
        } },

      { id: '2.7-g-compose-formula', title: 'Composition as a formula', desc: 'Substitute the whole function.',
        make(r) {
          const a = r.nz(-5, 5), b = r.nz(-7, 7), c = r.nz(-5, 5), d = r.nz(-7, 7);
          const fFirst = r.bool(0.5);
          // f(x)=ax+b, g(x)=cx+d.  f(g(x)) = a c x + a d + b ; g(f(x)) = c a x + c b + d
          const m = a * c, k = fFirst ? c * b + d : a * d + b;
          return {
            prompt: 'Let $f(x) = ' + M.polyTex([a, b]) + '$ and $g(x) = ' + M.polyTex([c, d]) + '$. Find $(' + (fFirst ? 'g \\circ f' : 'f \\circ g') + ')(x)$ in terms of $x$.',
            answer: { type: 'expression', value: '(' + m + ')*x + (' + k + ')', vars: ['x'] },
            hints: ['In $' + (fFirst ? 'g \\circ f' : 'f \\circ g') + '$, the function nearest the $x$ goes first — that is $' + (fFirst ? 'f' : 'g') + '$.',
              'So substitute the whole of $' + (fFirst ? 'f' : 'g') + '$ into $' + (fFirst ? 'g' : 'f') + '$, in brackets.',
              'Then expand and collect.'],
            solution: [{ text: 'Substitute the inner function in full.',
              math: fFirst ? 'g(f(x)) = ' + coef(c) + '(' + M.polyTex([a, b]) + ') ' + M.signed(d)
                : 'f(g(x)) = ' + coef(a) + '(' + M.polyTex([c, d]) + ') ' + M.signed(b) },
              { text: 'Multiply out the bracket.', math: '= ' + M.term(m, 'x') + ' ' + M.signed(fFirst ? c * b : a * d) + ' ' + M.signed(fFirst ? d : b) },
              { text: 'Collect the numbers.', math: '= ' + M.polyTex([m, k]) }]
          };
        } },

      { id: '2.7-g-domain-combo', title: 'Domain of a combination', desc: 'Every condition at once.',
        make(r) {
          const p = r.int(-6, 2), q = r.int(3, 7);
          // sqrt(x - p) / (x - q)  ->  [p, q) u (q, inf)
          return {
            prompt: 'Find the domain of $f(x) = \\dfrac{\\sqrt{' + M.shift('x', p) + '}}{' + M.shift('x', q) + '}$.',
            answer: { type: 'interval', value: '[' + p + ', ' + q + ') U (' + q + ', inf)', vars: ['x'] },
            hints: ['Two separate things can break: the root on top and the bottom.',
              'Root: the inside must be $\\ge 0$, so $x \\ge ' + p + '$.',
              'Bottom: it must not be zero, so $x \\ne ' + q + '$. Both conditions must hold together.'],
            solution: [{ text: 'The root needs its inside non-negative.', math: 'x \\ge ' + p },
              { text: 'The bottom must not vanish.', math: 'x \\ne ' + q },
              { text: 'Put them together.', math: '[' + p + ', ' + q + ') \\cup (' + q + ', \\infty)' }]
          };
        } }
    ]
  });
})();
