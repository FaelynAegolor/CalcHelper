/* 2.6 Transformations of Functions
   Worksheet scope: vertical and horizontal shifts, combining them, reflections in
   both axes, and even/odd functions. */
(function () {
  const M = CH.M, V = CH.V;

  const pair = (f1, l1, f2, l2, alt) => V.graph({
    xmin: -5, xmax: 5, ymin: -5, ymax: 6, width: 300, tick: 2,
    fns: [{ f: f1, label: l1, color: 'var(--viz-1)', dashed: true }, { f: f2, label: l2, color: 'var(--viz-2)' }],
    alt: alt
  });

  CH.registerSection({
    id: '2.6', chapter: 2, exam: 2, title: 'Transformations of Functions',
    summary: 'Taking a shape you already know and moving it: up, down, left, right, or flipped over an axis. Plus how to tell at a glance whether a function is even, odd, or neither.',

    theory: [
      { short: true, md: 'You already know the four basic shapes. This section **moves them about** so you never have to build a table again.\n\n- $f(x) + c$ moves the graph **up** by $c$. $f(x) - c$ moves it **down**.\n- $f(x - c)$ moves it **right** by $c$. $f(x + c)$ moves it **left**. (Yes, that feels backwards. There is a reason.)\n- $-f(x)$ flips it **upside down**. $f(-x)$ flips it **left-to-right**.\n- **Even** means it mirrors in the $y$-axis. **Odd** means it looks the same after a half-turn about the origin.' },

      { h: 'Shifting up and down' },
      { key: 'Outside the function, so it does what you expect', md: 'Adding to the **whole output** moves the graph vertically.\n\n$$y = f(x) + c \\ \\text{goes } c \\text{ up}, \\qquad y = f(x) - c \\ \\text{goes } c \\text{ down}$$\n\nThat makes sense: every height is bigger by $c$, so every point lifts by $c$.' },
      { svg: pair(x => x * x, 'y = x²', x => x * x + 2, 'y = x² + 2', 'The parabola y equals x squared, and the same parabola moved two units up'),
        caption: 'Adding $2$ to the output lifts every point by $2$.' },

      { h: 'Shifting left and right' },
      { warn: 'This one genuinely looks backwards', md: '$$y = f(x - c) \\ \\text{moves } c \\text{ to the } \\textbf{right}$$\n\nA **minus** moves it **right**. Almost everyone expects the opposite, so it is worth understanding rather than memorising.' },
      { why: 'Why a minus moves it right', md: 'Ask where the new graph does what the old one did at $x = 0$.\n\nFor $y = f(x-3)$, the function only sees $0$ when $x - 3 = 0$, which is at $x = 3$. So whatever used to happen at $0$ now happens at $3$ — the graph has moved **right** by $3$.\n\nThe bracket is "running late": it needs a bigger $x$ before it catches up.' },
      { svg: pair(x => Math.abs(x), 'y = |x|', x => Math.abs(x - 2), 'y = |x - 2|', 'The V shape and the same V moved two units right'),
        caption: '$|x-2|$ is the V with its corner at $2$ instead of $0$ — a shift to the **right**.' },
      { tip: 'Reading the shift straight off', md: 'Look at what makes the bracket zero.\n\n- $(x-5)$ is zero at $x=5$ → shifted **right** $5$.\n- $(x+4)$ is zero at $x=-4$ → shifted **left** $4$.' },

      { h: 'Doing both at once' },
      { key: 'Inside moves sideways, outside moves up and down', md: 'In $y = f(x - h) + k$:\n\n- the $h$ **inside** the bracket moves it sideways (right if $h$ is positive)\n- the $k$ **outside** moves it up and down (up if $k$ is positive)\n\nSo $g(x) = |x-2| + 3$ is the V shifted $2$ right and $3$ up, putting its corner at $(2, 3)$.' },
      { example: {
        title: 'Two shifts together', label: 'Worked example',
        problem: 'Describe how to get the graph of $g(x) = (x-1)^2 + 3$ from the graph of $y = x^2$, and say where the lowest point ends up.',
        steps: [
          { text: 'Look inside the bracket first. $(x-1)$ is zero at $x = 1$, so the graph moves **1 to the right**.' },
          { text: 'Now look outside. The $+3$ lifts everything by **3**.' },
          { text: 'The lowest point of $y=x^2$ is at the origin $(0,0)$. Move it right 1 and up 3.', math: '(0,0) \\longrightarrow (1, 3)' },
          { text: 'So it is the same U shape, with its lowest point at $(1,3)$.' }
        ],
        answer: 'Shift $1$ right and $3$ up; the lowest point lands at $(1,3)$',
        checklist: ['Deal with the inside of the bracket first — sideways.', 'Then the outside — up and down.', 'A minus inside means right.', 'Track one easy point, like the corner or the vertex.']
      } },

      { h: 'Flipping' },
      { key: 'Minus outside flips vertically; minus inside flips horizontally', md: '- $y = -f(x)$: every height changes sign, so the graph flips **upside down** (reflected in the $x$-axis).\n- $y = f(-x)$: every input changes sign, so the graph flips **left to right** (reflected in the $y$-axis).\n\nSame rule as the shifts: **outside affects heights, inside affects sideways**.' },
      { cols: [
        { svg: pair(x => x * x, 'y = x²', x => -x * x, 'y = -x²', 'A parabola and the same parabola turned upside down'), caption: '$-f(x)$ — flipped upside down.' },
        { svg: pair(x => Math.sqrt(x), 'y = √x', x => Math.sqrt(-x), 'y = √(-x)', 'A square root curve and its mirror image across the y axis'), caption: '$f(-x)$ — flipped left to right.' }
      ] },
      { note: 'Watch where the minus sits', md: '$-\\sqrt{x}$ and $\\sqrt{-x}$ are completely different. The first is the usual curve turned upside down (still only for $x \\ge 0$). The second is the usual curve mirrored leftwards (now only for $x \\le 0$).' },

      { h: 'Even and odd functions' },
      { def: 'Even and odd', md: 'Replace $x$ with $-x$ and simplify. Then compare with the original:\n\n- Get the **same thing** back, $f(-x) = f(x)$ → **even**. The graph mirrors in the $y$-axis.\n- Get **everything negated**, $f(-x) = -f(x)$ → **odd**. The graph is unchanged by a half-turn about the origin.\n- Neither → **neither**. Most functions are neither, and that is a perfectly good answer.' },
      { tip: 'A quick shortcut for polynomials', md: 'If **every** power of $x$ is even (including a constant, which is $x^0$), the function is even. If **every** power is odd, it is odd. A mixture is neither.\n\nSo $x^4 + 3x^2$ is even, $x^3 - x$ is odd, and $x^2 + x$ is neither. The names come from exactly this.' },
      { example: {
        title: 'Even, odd or neither', label: 'Worked example',
        problem: 'Decide whether each is even, odd or neither: (a) $f(x)=x^4$, (b) $f(x)=x^2+x$, (c) $f(x)=x^3-x$.',
        steps: [
          { text: '**(a)** Replace $x$ with $-x$.', math: 'f(-x) = (-x)^4 = x^4 = f(x)' },
          { text: 'Same thing back, so **even**.' },
          { text: '**(b)** Replace and simplify.', math: 'f(-x) = (-x)^2 + (-x) = x^2 - x' },
          { text: 'That is neither $f(x) = x^2+x$ nor $-f(x) = -x^2-x$, so **neither**. (Mixed powers.)' },
          { text: '**(c)** Replace and simplify.', math: 'f(-x) = (-x)^3 - (-x) = -x^3 + x = -(x^3 - x) = -f(x)' },
          { text: 'Everything negated, so **odd**.' }
        ],
        answer: '(a) even  (b) neither  (c) odd',
        checklist: ['Replace every $x$ with $-x$.', 'Simplify fully.', 'Same as $f(x)$ → even; same as $-f(x)$ → odd.', 'For polynomials, check whether all powers are even, all odd, or mixed.']
      } },

      { calm: true, md: 'There is only one rule in this whole section, and it is worth saying plainly: **outside the function affects up and down, inside affects left and right — and inside behaves backwards.**\n\nIf you ever lose track, do not try to remember. Take one easy point, like the corner of the V at $(0,0)$, and ask where it goes. $|x-2|+3$: the corner needs $x-2=0$, so $x=2$, and the height is $0+3=3$. Corner at $(2,3)$. Done, without recalling a single rule.\n\nThat trick works for every transformation question on the paper.' },

      { sid: '2.6', title: 'Can I do this?',
        intro: 'Tick these off when you are sure. Nothing here is marked — it is just for you to see what is solid and what still needs another go.',
        checklist: [
          'Shift a graph up or down using $f(x) \\pm c$',
          'Shift it left or right using $f(x \\mp c)$, getting the direction right',
          'Explain why a minus inside the bracket moves the graph to the **right**',
          'Combine a sideways and an up-down shift, and say where a key point lands',
          'Flip a graph upside down with $-f(x)$',
          'Flip it left to right with $f(-x)$, and tell the two flips apart',
          'Test whether a function is even, odd or neither',
          'Use the all-even / all-odd powers shortcut on a polynomial'
        ] }
    ],

    examples: [
      { title: 'Building a graph from a known shape',
        problem: 'Describe how to obtain $g(x) = -(x-2)^2 + 3$ from $y = x^2$, and give the coordinates of its turning point.',
        steps: [
          { text: 'Three things are happening. Take them in order: inside, then the minus, then outside.' },
          { text: 'Inside: $(x-2)$ is zero at $x=2$, so shift **2 right**.' },
          { text: 'The minus in front flips it **upside down**, so the U becomes a peak rather than a trough.' },
          { text: 'Outside: $+3$ lifts it **3 up**.' },
          { text: 'Track the vertex $(0,0)$: right 2 gives $(2,0)$, the flip leaves it there, up 3 gives $(2,3)$.' }
        ],
        answer: 'Shift $2$ right, flip upside down, shift $3$ up — turning point $(2,3)$, a maximum',
        checklist: ['Inside the bracket: sideways.', 'Minus in front: flip vertically.', 'Outside: up or down.', 'Follow one easy point all the way through.'] },

      { title: 'An odd function with a fraction',
        problem: 'Is $f(x) = x + \\dfrac{1}{x}$ even, odd, or neither?',
        steps: [
          { text: 'Replace every $x$ with $-x$.', math: 'f(-x) = (-x) + \\frac{1}{-x} = -x - \\frac{1}{x}' },
          { text: 'Factor out the minus sign to compare with $f(x)$.', math: '= -\\left(x + \\frac{1}{x}\\right)' },
          { text: 'That is exactly $-f(x)$, so the function is **odd**.' },
          { text: 'The shortcut agrees: $x$ is an odd power, and $\\tfrac1x = x^{-1}$ is also odd.' }
        ],
        answer: 'Odd',
        checklist: ['Substitute $-x$ everywhere.', 'Simplify, including inside fractions.', 'Try to pull out a minus sign.', 'Matching $-f(x)$ means odd.'] }
    ],

    exercises: [
      { id: '2.6-e1', prompt: 'The graph of $y = x^2$ is shifted $4$ units **up**. Write the new equation (use $y = \\ldots$ form, in terms of $x$).',
        answer: { type: 'expression', value: 'x^2 + 4', vars: ['x'] },
        hints: ['Up and down happens **outside** the function.', 'Add $4$ to the whole thing.'],
        solution: [{ text: 'Add to the output.', math: 'y = x^2 + 4' }] },

      { id: '2.6-e2', prompt: 'The graph of $y = x^2$ is shifted $3$ units to the **right**. Write the new equation in terms of $x$.',
        answer: { type: 'expression', value: '(x-3)^2', vars: ['x'] },
        hints: ['Left and right happens **inside** the bracket, and it behaves backwards.', 'Right by $3$ means $(x - 3)$, not $(x+3)$.'],
        solution: [{ text: 'A minus inside shifts right.', math: 'y = (x-3)^2' },
          { text: 'Check: the bracket is zero at $x=3$, so the vertex sits at $3$.' }] },

      { id: '2.6-e3', prompt: 'The graph of $y = |x|$ is shifted $5$ units to the **left**. Write the new equation in terms of $x$.',
        answer: { type: 'expression', value: 'abs(x+5)', vars: ['x'] },
        hints: ['Left means a **plus** inside.', 'Type it as abs(x+5).'],
        solution: [{ text: 'A plus inside shifts left.', math: 'y = |x+5|' },
          { text: 'Check: the corner needs $x+5=0$, so $x=-5$.' }] },

      { id: '2.6-e4', prompt: 'For $g(x) = (x-1)^2 + 3$, give the $x$-coordinate of the turning point.',
        answer: { type: 'number', value: 1 },
        hints: ['The bracket is zero at the turning point.', '$x - 1 = 0$ gives $x = 1$.'],
        solution: [{ text: 'The bracket vanishes at $x=1$, which is where the vertex sits.', math: 'x = 1' }] },

      { id: '2.6-e5', prompt: 'For $g(x) = (x-1)^2 + 3$, give the $y$-coordinate of the turning point.',
        answer: { type: 'number', value: 3 },
        hints: ['At the turning point the squared bracket is $0$.', 'So the height is whatever is left outside: the $+3$.'],
        solution: [{ text: 'With the bracket zero, the height is the constant.', math: 'y = 0 + 3 = 3' }] },

      { id: '2.6-e6', prompt: 'The graph of $y = \\sqrt{x}$ is reflected in the $x$-axis (turned upside down). Write the new equation in terms of $x$.',
        answer: { type: 'expression', value: '-sqrt(x)', vars: ['x'] },
        hints: ['Upside down means every height changes sign.', 'Put the minus **outside**: $-\\sqrt{x}$.'],
        solution: [{ text: 'Negate the whole output.', math: 'y = -\\sqrt{x}' }] },

      { id: '2.6-e7', prompt: 'The graph of $y = \\sqrt{x}$ is reflected in the $y$-axis (flipped left to right). Write the new equation in terms of $x$.',
        answer: { type: 'expression', value: 'sqrt(-x)', vars: ['x'] },
        hints: ['Left-to-right flips happen **inside**.', 'Replace $x$ with $-x$: $\\sqrt{-x}$.'],
        solution: [{ text: 'Negate the input.', math: 'y = \\sqrt{-x}' },
          { text: 'This now only exists for $x \\le 0$ — the mirror image of the original.' }] },

      { id: '2.6-e8', prompt: 'Is $f(x) = x^4$ even, odd or neither?',
        answer: { type: 'choice', value: 'even', options: [{ id: 'even', label: 'Even' }, { id: 'odd', label: 'Odd' }, { id: 'neither', label: 'Neither' }], wrongMessage: 'Not quite — work out $f(-x)$ and compare it with $f(x)$.' },
        hints: ['Replace $x$ with $-x$ and simplify.', '$(-x)^4 = x^4$, because an even power kills the minus.'],
        solution: [{ text: 'Substitute.', math: 'f(-x) = (-x)^4 = x^4 = f(x)' },
          { text: 'Same as the original, so even.' }] },

      { id: '2.6-e9', prompt: 'Is $f(x) = x^2 + x$ even, odd or neither?',
        answer: { type: 'choice', value: 'neither', options: [{ id: 'even', label: 'Even' }, { id: 'odd', label: 'Odd' }, { id: 'neither', label: 'Neither' }], wrongMessage: 'Not quite — check whether $f(-x)$ matches $f(x)$ **or** $-f(x)$.' },
        hints: ['Replace $x$ with $-x$: you get $x^2 - x$.', 'Is that the same as $x^2+x$? Or as $-(x^2+x) = -x^2-x$?', 'Neither — and the powers are mixed, one even and one odd.'],
        solution: [{ text: 'Substitute.', math: 'f(-x) = x^2 - x' },
          { text: 'That matches neither $f(x)$ nor $-f(x)$, so it is neither.' },
          { text: 'The shortcut agrees: $x^2$ is an even power and $x$ is odd, so the powers are mixed.' }] },

      { id: '2.6-e10', prompt: 'Is $f(x) = x^3 - x$ even, odd or neither?',
        answer: { type: 'choice', value: 'odd', options: [{ id: 'even', label: 'Even' }, { id: 'odd', label: 'Odd' }, { id: 'neither', label: 'Neither' }], wrongMessage: 'Not quite — try pulling a minus sign out of $f(-x)$.' },
        hints: ['Substitute $-x$: $(-x)^3 - (-x) = -x^3 + x$.', 'Try factoring out a minus: $-(x^3 - x)$.', 'That is exactly $-f(x)$.'],
        solution: [{ text: 'Substitute and simplify.', math: 'f(-x) = -x^3 + x = -(x^3-x) = -f(x)' },
          { text: 'Everything negated, so odd. Both powers are odd, which agrees.' }] },

      { id: '2.6-e11', prompt: 'For $y = -x^2 + 3$, give the $y$-coordinate of the turning point.',
        answer: { type: 'number', value: 3 },
        hints: ['The minus flips the U upside down, so this is a peak.', 'With $x=0$ the squared term vanishes, leaving the $+3$.'],
        solution: [{ text: 'The flip puts the vertex at the top; it sits where $x^2 = 0$.', math: 'y = 3' }] },

      { id: '2.6-e12', prompt: 'The graph of $y = |x|$ is shifted $2$ right and $2$ up. Give the $x$-coordinate of the corner.',
        answer: { type: 'number', value: 2 },
        hints: ['The corner of $|x|$ starts at the origin.', 'Shifting $2$ right moves its $x$ from $0$ to $2$; the vertical shift does not change $x$.'],
        solution: [{ text: 'The corner moves from $(0,0)$ to $(2,2)$.', math: 'x = 2' }] }
    ],

    generators: [
      { id: '2.6-g-describe', title: 'Which way does it move?', desc: 'Read a shift off the equation.',
        make(r) {
          const base = r.pick([{ t: 'x^2', f: 'x^2' }, { t: '|x|', f: 'abs' }, { t: '\\sqrt{x}', f: 'sqrt' }]);
          const h = r.nz(-5, 5);
          const horizontal = r.bool(0.5);
          const inner = horizontal ? '(x ' + (h < 0 ? '+ ' + (-h) : '- ' + h) + ')' : 'x';
          const expr = base.t === 'x^2' ? inner + '^2' : base.t === '|x|' ? '|' + (horizontal ? 'x ' + (h < 0 ? '+ ' + (-h) : '- ' + h) : 'x') + '|' : '\\sqrt{' + (horizontal ? 'x ' + (h < 0 ? '+ ' + (-h) : '- ' + h) : 'x') + '}';
          const shown = horizontal ? expr : expr + (h < 0 ? ' - ' + (-h) : ' + ' + h);
          const dir = horizontal ? (h > 0 ? 'right' : 'left') : (h > 0 ? 'up' : 'down');
          return {
            prompt: 'The graph of $y = ' + base.t + '$ is transformed into $y = ' + shown + '$. Which way does it move, and by how much?',
            answer: { type: 'choice', value: dir + Math.abs(h),
              options: ['right', 'left', 'up', 'down'].map(d => ({ id: d + Math.abs(h), label: d.charAt(0).toUpperCase() + d.slice(1) + ' by ' + Math.abs(h) })),
              wrongMessage: 'Not quite — is the change inside the bracket or outside it?' },
            hints: [horizontal ? 'The change is **inside**, so it moves sideways — and sideways behaves backwards.' : 'The change is **outside**, so it moves up or down, exactly as it looks.',
              horizontal ? 'The bracket is zero when $x = ' + h + '$, so that is where the old $x=0$ ends up.' : 'Every height changes by $' + h + '$.'],
            solution: [{ text: horizontal ? 'Inside the bracket means a sideways move.' : 'Outside the function means a vertical move.' },
              { text: 'So it moves ' + dir + ' by ' + Math.abs(h) + '.' }]
          };
        } },

      { id: '2.6-g-vertex', title: 'Where does the key point land?', desc: 'Track the vertex or corner through the shifts.',
        make(r) {
          const base = r.pick(['x^2', '|x|']);
          const h = r.nz(-5, 5), k = r.nz(-5, 5);
          const askX = r.bool(0.5);
          const inner = 'x ' + (h < 0 ? '+ ' + (-h) : '- ' + h);
          const expr = base === 'x^2' ? '(' + inner + ')^2' : '|' + inner + '|';
          return {
            prompt: 'For $y = ' + expr + (k < 0 ? ' - ' + (-k) : ' + ' + k) + '$, give the **$' + (askX ? 'x' : 'y') + '$-coordinate** of the ' + (base === 'x^2' ? 'turning point' : 'corner') + '.',
            answer: { type: 'number', value: askX ? h : k },
            hints: ['Track the point that starts at the origin.',
              'The bracket is zero when $x = ' + h + '$, so that is the new $x$.',
              askX ? 'The up-down shift does not change the $x$.' : 'With the bracket zero, the height is whatever is left outside: $' + k + '$.'],
            solution: [{ text: 'The key point starts at $(0,0)$ and moves to $(' + h + ', ' + k + ')$.' },
              { text: 'So the answer is $' + (askX ? h : k) + '$.' }]
          };
        } },

      { id: '2.6-g-evenodd', title: 'Even, odd or neither', desc: 'Substitute $-x$ and compare.',
        make(r) {
          const kind = r.pick(['even', 'odd', 'neither', 'neither']);
          let tex, ans, neg;   // neg = f(-x), simplified
          if (kind === 'even') {
            const a = r.nz(-5, 5), p = r.pick([2, 4]), c = r.nz(-6, 6);
            tex = M.term(a, 'x^' + p) + ' ' + M.signed(c); ans = 'even';
            neg = tex;
          } else if (kind === 'odd') {
            const a = r.nz(-5, 5), p = r.pick([3, 5]), b = r.nz(-5, 5);
            tex = M.term(a, 'x^' + p) + M.term(b, 'x', false); ans = 'odd';
            neg = M.term(-a, 'x^' + p) + M.term(-b, 'x', false);
          } else {
            const a = r.nz(-5, 5), b = r.nz(-5, 5);
            tex = M.term(a, 'x^2') + M.term(b, 'x', false); ans = 'neither';
            neg = M.term(a, 'x^2') + M.term(-b, 'x', false);
          }
          return {
            prompt: 'Is $f(x) = ' + tex + '$ even, odd or neither?',
            answer: { type: 'choice', value: ans,
              options: [{ id: 'even', label: 'Even' }, { id: 'odd', label: 'Odd' }, { id: 'neither', label: 'Neither' }],
              wrongMessage: 'Not quite — work out $f(-x)$ and compare it with both $f(x)$ and $-f(x)$.' },
            hints: ['Replace every $x$ with $-x$ and simplify.',
              'Even powers survive the minus; odd powers flip sign.',
              'Shortcut: all powers even → even; all odd → odd; mixed → neither. (A constant counts as an even power.)'],
            solution: [{ text: 'Substitute $-x$ for every $x$. Even powers lose the minus; odd powers keep it.', math: 'f(-x) = ' + neg },
              { text: 'Compare with $f(x) = ' + tex + '$.' },
              { text: ans === 'even' ? 'Every power is even, so $f(-x) = f(x)$ — even.'
                : ans === 'odd' ? 'Every power is odd, so $f(-x) = -f(x)$ — odd.'
                : 'The powers are mixed, so $f(-x)$ matches neither $f(x)$ nor $-f(x)$ — neither.' }]
          };
        } },

      { id: '2.6-g-reflect', title: 'Which flip is it?', desc: 'Tell the two reflections apart.',
        make(r) {
          // Only lopsided shapes: for x^3 or |x| the two flips give the SAME picture,
          // which makes "which reflection is it?" a trick question.
          const base = r.pick([{ t: '\\sqrt{x}', neg: '-\\sqrt{x}', inn: '\\sqrt{-x}' }, { t: '(x-2)^2', neg: '-(x-2)^2', inn: '(-x-2)^2' },
            { t: 'x^3 + 1', neg: '-(x^3 + 1)', inn: '(-x)^3 + 1' }, { t: '2^x', neg: '-2^x', inn: '2^{-x}' }]);
          const outside = r.bool(0.5);
          return {
            prompt: 'The graph of $y = ' + base.t + '$ becomes $y = ' + (outside ? base.neg : base.inn) + '$. Which reflection is that?',
            answer: { type: 'choice', value: outside ? 'x' : 'y',
              options: [{ id: 'x', label: 'Reflected in the $x$-axis (flipped upside down)' }, { id: 'y', label: 'Reflected in the $y$-axis (flipped left to right)' }],
              wrongMessage: 'Not quite — look at whether the minus is inside the function or outside it.' },
            hints: ['Look at where the minus sign sits.',
              outside ? 'The minus is **outside**, so every height changes sign.' : 'The minus is **inside**, so every input changes sign.',
              'Outside affects heights — that is the $x$-axis flip. Inside affects sideways — the $y$-axis flip.'],
            solution: [{ text: outside ? 'The minus is applied to the whole output, so every height flips.' : 'The minus is applied to the input, so the graph flips sideways.' },
              { text: 'That is a reflection in the $' + (outside ? 'x' : 'y') + '$-axis.' }]
          };
        } }
    ]
  });
})();
