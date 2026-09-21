/* 1.9 The Coordinate Plane; Graphs of Equations; Circles */
(function () {
  const M = CH.M, V = CH.V, C = CH.C;
  const pt = (x, y) => '(' + x + ',\\ ' + y + ')';
  const sh = v => v < 0 ? '+ ' + (-v) : '- ' + v;           // (x - h): sh(h)
  const circleTex = (h, k, r2) => '(x ' + sh(h) + ')^2 + (y ' + sh(k) + ')^2 = ' + r2;
  const circleStr = (h, k, r2) => '(x ' + sh(h) + ')^2 + (y ' + sh(k) + ')^2 = ' + r2;
  const sym = { x: 'the x-axis only', y: 'the y-axis only', o: 'the origin only', all: 'the x-axis, the y-axis and the origin', none: 'none of them' };

  CH.registerSection({
    id: '1.9', chapter: 1, title: 'The Coordinate Plane; Graphs; Circles',
    summary: 'Points as pairs of numbers, the distance and midpoint formulas, intercepts, the equation of a circle, and testing a graph for symmetry.',

    theory: [
      { h: 'Points in the plane' },
      'Two number lines at right angles — the **$x$-axis** (horizontal) and the **$y$-axis** (vertical) — meet at the **origin** $O(0, 0)$. Every point has an address $(x, y)$: go $x$ across, then $y$ up. The axes split the plane into four **quadrants**, numbered anticlockwise from the top right.',
      { svg: V.graph({ xmin: -6, xmax: 6, ymin: -6, ymax: 6, width: 360, id: 'quad', points: [{ x: 3, y: 2, label: '(3, 2)' }, { x: -4, y: 3, label: '(−4, 3)' }, { x: -2, y: -4, label: '(−2, −4)' }, { x: 4, y: -3, label: '(4, −3)' }], texts: [{ x: 4.3, y: 5.2, text: 'I' }, { x: -5.5, y: 5.2, text: 'II' }, { x: -5.5, y: -5.2, text: 'III' }, { x: 4.3, y: -5.2, text: 'IV' }] }), caption: 'In quadrant I both coordinates are positive; in II $x$ is negative; in III both are negative; in IV $y$ is negative.' },

      { h: 'Distance between two points' },
      'Draw the line joining $A(x_1, y_1)$ and $B(x_2, y_2)$, then a horizontal leg and a vertical leg. You get a right triangle, and **Pythagoras** gives the length of the diagonal:',
      { def: 'Distance formula', md: '$$d(A, B) = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$\n\nIt is just $\\sqrt{(\\text{horizontal change})^2 + (\\text{vertical change})^2}$. The order of subtraction does not matter, because squaring removes the sign.' },
      { def: 'Midpoint formula', md: 'The point halfway between $A$ and $B$ is the **average** of the coordinates:\n\n$$M = \\left(\\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2}\\right)$$' },
      { widget: 'two-points' },
      { example: {
        title: 'Distance and midpoint',
        problem: 'For $A(-3, 0)$ and $B(5, 6)$, find $d(A, B)$ and the midpoint.',
        steps: [
          { text: 'Horizontal change $5 - (-3) = 8$, vertical change $6 - 0 = 6$.', math: 'd(A, B) = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10' },
          { text: 'Average the coordinates.', math: 'M = \\left(\\frac{-3 + 5}{2}, \\frac{0 + 6}{2}\\right) = (1, 3)' }
        ], answer: '$d = 10$, $M = (1, 3)$' } },

      { h: 'Graphs of equations' },
      'The **graph** of an equation in $x$ and $y$ is the set of all points $(x, y)$ that make it true. The most basic way to draw one is to **plot points**: pick some $x$ values, work out $y$, plot, and join up.',
      '| $x$ | $-2$ | $-1$ | $0$ | $1$ | $2$ | $3$ |\n|---|---|---|---|---|---|---|\n| $y = x^2 - 2$ | $2$ | $-1$ | $-2$ | $-1$ | $2$ | $7$ |',
      { svg: V.graph({ xmin: -4, xmax: 4, ymin: -3, ymax: 7, width: 340, id: 'plot', fns: [{ f: x => x * x - 2 }], points: [-2, -1, 0, 1, 2].map(x => ({ x, y: x * x - 2 })) }), caption: 'Plot the points from the table and join them with a smooth curve: the graph of $y = x^2 - 2$.' },
      { def: 'Intercepts', md: 'Where the graph crosses the axes:\n\n- **$x$-intercepts**: where it crosses the $x$-axis. There $y = 0$, so **put $y = 0$ and solve for $x$**.\n- **$y$-intercept**: where it crosses the $y$-axis. There $x = 0$, so **put $x = 0$ and solve for $y$**.\n\nFor $y = x^2 - 2$: $y = 0 \\Rightarrow x^2 = 2 \\Rightarrow x = \\pm\\sqrt2$; and $x = 0 \\Rightarrow y = -2$.' },

      { h: 'Circles' },
      'A circle is the set of points at a fixed distance $r$ (the **radius**) from a fixed point $(h, k)$ (the **centre**). Put that sentence into the distance formula and square it, and you get the equation:',
      { def: 'Standard form of a circle', md: '$$(x - h)^2 + (y - k)^2 = r^2$$\n\nCentre $(h, k)$, radius $r$. Read the signs carefully: $(x - 2)^2 + (y + 5)^2 = 25$ has centre $(2, -5)$ — the opposite of the signs you see — and radius $\\sqrt{25} = 5$.' },
      { widget: 'circle-explorer' },
      { key: 'General form → standard form', md: 'A circle can also appear multiplied out: $x^2 + y^2 - 4x + 6y + 9 = 0$. To find the centre and radius, **complete the square** in $x$ and in $y$ separately:\n\n$$(x^2 - 4x + 4) + (y^2 + 6y + 9) = -9 + 4 + 9 \\;\\Rightarrow\\; (x - 2)^2 + (y + 3)^2 = 4$$\n\nCentre $(2, -3)$, radius $2$. (Shortcut: for $x^2 + y^2 + ax + by + c = 0$ the centre is $\\left(-\\tfrac{a}{2}, -\\tfrac{b}{2}\\right)$ and $r = \\sqrt{\\tfrac{a^2}{4} + \\tfrac{b^2}{4} - c}$.)' },
      { tip: 'Circle from a diameter', md: 'If $A$ and $B$ are the ends of a diameter, the **centre is the midpoint** of $AB$ and the **radius is the distance from the centre to $A$** (or half of $d(A,B)$).' },

      { h: 'Symmetry' },
      'A graph can be a mirror image of itself. Three kinds to test for, each with a simple rule:',
      '| Symmetry about… | Picture | Test: the equation is unchanged when you… |\n|---|---|---|\n| the $x$-axis | top half mirrors bottom half | replace $y$ with $-y$ |\n| the $y$-axis | left half mirrors right half | replace $x$ with $-x$ |\n| the origin | rotate $180^\\circ$ and it looks the same | replace $x$ with $-x$ **and** $y$ with $-y$ |',
      { cols: [
        { svg: V.graph({ xmin: -4, xmax: 4, ymin: -3, ymax: 3, width: 220, id: 'sy', fns: [{ f: x => x * x / 3 - 2 }], grid: false }), caption: '$y = \\tfrac{x^2}{3} - 2$: $y$-axis symmetry (only even powers of $x$).' },
        { svg: V.graph({ xmin: -4, xmax: 4, ymin: -3, ymax: 3, width: 220, id: 'sx', fns: [{ f: x => Math.sqrt(x + 3), domain: [-3, 4] }, { f: x => -Math.sqrt(x + 3), domain: [-3, 4], color: 'var(--viz-1)' }], grid: false }), caption: '$x = y^2 - 3$: $x$-axis symmetry (only even powers of $y$).' },
        { svg: V.graph({ xmin: -4, xmax: 4, ymin: -3, ymax: 3, width: 220, id: 'so', fns: [{ f: x => (x * x * x - 4 * x) / 4 }], grid: false }), caption: '$y = \\tfrac{x^3 - 4x}{4}$: origin symmetry (all odd powers).' }
      ] },
      { example: {
        title: 'Testing for symmetry',
        problem: 'Test $x = y^2 - y$ for symmetry about the $x$-axis, and $3x^2 + y^2 = 5x$ for symmetry about the $y$-axis.',
        steps: [
          { text: '$x = y^2 - y$: replace $y$ with $-y$.', math: 'x = (-y)^2 - (-y) = y^2 + y' },
          { text: 'That is a **different** equation ($y^2 + y$ instead of $y^2 - y$), so the graph is **not** symmetric about the $x$-axis. (Compare $x = y^2$, which stays the same and **is** symmetric.)' },
          { text: '$3x^2 + y^2 = 5x$: replace $x$ with $-x$.', math: '3(-x)^2 + y^2 = 5(-x) \\;\\Rightarrow\\; 3x^2 + y^2 = -5x' },
          { text: 'The right side changed sign, so it is not the same equation: **not** symmetric about the $y$-axis.' }
        ], answer: 'Neither symmetry holds.' } }
    ],

    examples: [
      { title: 'Finding the other endpoint',
        problem: '$M(5, 1)$ is the midpoint of $AB$, where $A = (2, -3)$. Find $B$.',
        steps: [
          { text: 'Let $B = (x, y)$. The midpoint formula gives two little equations.', math: '\\frac{2 + x}{2} = 5, \\qquad \\frac{-3 + y}{2} = 1' },
          { text: 'Solve each.', math: '2 + x = 10 \\Rightarrow x = 8, \\qquad -3 + y = 2 \\Rightarrow y = 5' }
        ], answer: '$B = (8, 5)$' },
      { title: 'Intercepts',
        problem: 'Find the intercepts of $y = x^2 - 4$.',
        steps: [
          { text: '$x$-intercepts: set $y = 0$.', math: '0 = x^2 - 4 \\Rightarrow x = \\pm 2 \\quad\\text{points } (-2, 0), (2, 0)' },
          { text: '$y$-intercept: set $x = 0$.', math: 'y = 0 - 4 = -4 \\quad\\text{point } (0, -4)' }
        ], answer: '$x$-intercepts $\\pm 2$; $y$-intercept $-4$' },
      { title: 'Circle from centre and radius',
        problem: 'Find the equation of the circle with centre $(2, -5)$ and radius $5$.',
        steps: [
          { text: 'Substitute $h = 2$, $k = -5$, $r = 5$ into $(x - h)^2 + (y - k)^2 = r^2$. Note $y - (-5) = y + 5$.', math: '(x - 2)^2 + (y + 5)^2 = 25' }
        ], answer: '$(x - 2)^2 + (y + 5)^2 = 25$' },
      { title: 'Circle from centre and a point',
        problem: 'Find the equation of the circle with centre $C(-2, 1)$ that passes through $P(4, 3)$.',
        steps: [
          { text: 'The radius is the distance from the centre to the point. We only need $r^2$, so skip the square root.', math: 'r^2 = (4 - (-2))^2 + (3 - 1)^2 = 36 + 4 = 40' },
          { text: 'Write the equation.', math: '(x + 2)^2 + (y - 1)^2 = 40' }
        ], answer: '$(x + 2)^2 + (y - 1)^2 = 40$' },
      { title: 'Centre and radius from the general form',
        problem: 'Find the centre and radius of $x^2 + y^2 - 6x + 4 = 0$.',
        steps: [
          { text: 'Group the $x$ terms and move the constant over. There is no $y$ term, so $y^2$ is already a perfect square.', math: '(x^2 - 6x) + y^2 = -4' },
          { text: 'Complete the square in $x$: half of $-6$ is $-3$, and $(-3)^2 = 9$. Add $9$ to both sides.', math: '(x^2 - 6x + 9) + y^2 = -4 + 9 \\;\\Rightarrow\\; (x - 3)^2 + y^2 = 5' },
          { text: 'Read off the centre and radius.', math: 'C(3, 0), \\qquad r = \\sqrt{5}' }
        ], answer: 'Centre $(3, 0)$, radius $\\sqrt5$' },
      { title: 'Circle from a diameter',
        problem: 'Find the equation of the circle that has $A(2, 1)$ and $B(4, -3)$ as the endpoints of a diameter.',
        steps: [
          { text: 'The centre is the midpoint of $AB$.', math: 'C = \\left(\\frac{2 + 4}{2}, \\frac{1 + (-3)}{2}\\right) = (3, -1)' },
          { text: 'The radius is the distance from $C$ to $A$ (squared, since we need $r^2$).', math: 'r^2 = (3 - 2)^2 + (-1 - 1)^2 = 1 + 4 = 5' },
          { text: 'Equation.', math: '(x - 3)^2 + (y + 1)^2 = 5' }
        ], answer: '$(x - 3)^2 + (y + 1)^2 = 5$' },
      { title: 'Symmetry about the origin',
        problem: 'Is the graph of $y = x^3 - x$ symmetric about the origin?',
        steps: [
          { text: 'Replace $x$ with $-x$ and $y$ with $-y$.', math: '-y = (-x)^3 - (-x) = -x^3 + x' },
          { text: 'Multiply both sides by $-1$.', math: 'y = x^3 - x' },
          { text: 'That is the original equation, so **yes** — symmetric about the origin.' }
        ], answer: 'Yes' }
    ],

    exercises: [
      { id: '1.9-e1', prompt: 'Find the distance between $A(-3, 0)$ and $B(5, 6)$.',
        answer: { type: 'number', value: 10 },
        hints: ['Horizontal change $8$, vertical change $6$.', '$\\sqrt{8^2 + 6^2}$'],
        solution: [{ math: 'd = \\sqrt{(5 + 3)^2 + (6 - 0)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10' }] },
      { id: '1.9-e2', prompt: 'Find the distance between $A(2, 1)$ and $B(4, -3)$. Give an exact, simplified answer.',
        answer: { type: 'number', value: Math.sqrt(20), display: '2\\sqrt5' },
        hints: ['$\\sqrt{(4-2)^2 + (-3-1)^2}$', '$\\sqrt{20} = \\sqrt{4 \\cdot 5}$'],
        solution: [{ math: 'd = \\sqrt{2^2 + (-4)^2} = \\sqrt{4 + 16} = \\sqrt{20} = 2\\sqrt{5}' }] },
      { id: '1.9-e3', prompt: 'Find the midpoint of $A(2, 1)$ and $B(4, -3)$.',
        answer: { type: 'point', value: [3, -1] },
        hints: ['Average the $x$-coordinates, then average the $y$-coordinates.'],
        solution: [{ math: 'M = \\left(\\frac{2 + 4}{2}, \\frac{1 - 3}{2}\\right) = (3, -1)' }] },
      { id: '1.9-e4', prompt: '$M(5, 1)$ is the midpoint of $AB$ and $A = (2, -3)$. Find $B$.',
        answer: { type: 'point', value: [8, 5] },
        hints: ['Let $B = (x, y)$ and write the midpoint formula: $\\frac{2 + x}{2} = 5$ and $\\frac{-3 + y}{2} = 1$.'],
        solution: [{ math: '2 + x = 10 \\Rightarrow x = 8, \\qquad -3 + y = 2 \\Rightarrow y = 5', text: 'So $B = (8, 5)$.' }] },
      { id: '1.9-e5', prompt: 'Find the $x$-intercept and the $y$-intercept of $2x + 3y = 6$.',
        answer: { type: 'multi', parts: [{ label: '$x$-intercept', type: 'number', value: 3 }, { label: '$y$-intercept', type: 'number', value: 2 }] },
        hints: ['$x$-intercept: put $y = 0$. $y$-intercept: put $x = 0$.'],
        solution: ['$y = 0$: $2x = 6 \\Rightarrow x = 3$. $\\;x = 0$: $3y = 6 \\Rightarrow y = 2$.'] },
      { id: '1.9-e6', prompt: 'Find the $x$-intercepts and the $y$-intercept of $y = x^2 - 4$.',
        answer: { type: 'multi', parts: [{ label: '$x$-intercepts (as a set)', type: 'set', value: [-2, 2] }, { label: '$y$-intercept', type: 'number', value: -4 }] },
        hints: ['$y = 0 \\Rightarrow x^2 = 4$.', 'There are two $x$-intercepts.'],
        solution: ['$y = 0$: $x^2 - 4 = 0 \\Rightarrow x = \\pm 2$. $\\;x = 0$: $y = -4$.'] },
      { id: '1.9-e7', prompt: 'Write the equation of the circle with centre $(2, -5)$ and radius $5$.',
        answer: { type: 'equation', value: '(x-2)^2 + (y+5)^2 = 25' },
        hints: ['$(x - h)^2 + (y - k)^2 = r^2$ with $h = 2$, $k = -5$.', 'Careful: $y - (-5) = y + 5$, and $r^2 = 25$.'],
        solution: [{ math: '(x - 2)^2 + (y + 5)^2 = 25' }] },
      { id: '1.9-e8', prompt: 'Write the equation of the circle with centre $(-2, 1)$ that passes through $(4, 3)$.',
        answer: { type: 'equation', value: '(x+2)^2 + (y-1)^2 = 40' },
        hints: ['$r^2$ is the squared distance from the centre to the point.', '$r^2 = 6^2 + 2^2 = 40$'],
        solution: [{ math: 'r^2 = (4 + 2)^2 + (3 - 1)^2 = 40 \\;\\Rightarrow\\; (x + 2)^2 + (y - 1)^2 = 40' }] },
      { id: '1.9-e9', prompt: 'Find the centre and radius of the circle $x^2 + y^2 - 4x + 6y + 9 = 0$.',
        answer: { type: 'multi', parts: [{ label: 'Centre', type: 'point', value: [2, -3] }, { label: 'Radius', type: 'number', value: 2 }] },
        hints: ['Complete the square in $x$ (add $4$) and in $y$ (add $9$) — on both sides.', '$(x - 2)^2 + (y + 3)^2 = 4$'],
        solution: [{ math: '(x^2 - 4x + 4) + (y^2 + 6y + 9) = -9 + 4 + 9 \\Rightarrow (x - 2)^2 + (y + 3)^2 = 4', text: 'Centre $(2, -3)$, radius $2$.' }] },
      { id: '1.9-e10', prompt: 'Find the centre and radius of the circle $x^2 + y^2 - 6x + 4 = 0$.',
        answer: { type: 'multi', parts: [{ label: 'Centre', type: 'point', value: [3, 0] }, { label: 'Radius', type: 'number', value: Math.sqrt(5), display: '\\sqrt5' }] },
        hints: ['Only the $x$ part needs completing: add $9$ to both sides.'],
        solution: [{ math: '(x - 3)^2 + y^2 = 5', text: 'Centre $(3, 0)$, radius $\\sqrt5$.' }] },
      { id: '1.9-e11', prompt: 'Find the equation of the circle with $A(2, 1)$ and $B(4, -3)$ as endpoints of a diameter.',
        answer: { type: 'equation', value: '(x-3)^2 + (y+1)^2 = 5' },
        hints: ['Centre = midpoint of $AB$ = $(3, -1)$.', '$r^2$ = squared distance from the centre to $A$ $= 1 + 4 = 5$.'],
        solution: [{ math: 'C = (3, -1), \\quad r^2 = (3-2)^2 + (-1-1)^2 = 5 \\;\\Rightarrow\\; (x - 3)^2 + (y + 1)^2 = 5' }] },
      { id: '1.9-e12', prompt: 'The graph of $x = y^2 - 4$ is symmetric about…',
        answer: { type: 'choice', value: 'x', options: [{ id: 'x', label: 'the $x$-axis only' }, { id: 'y', label: 'the $y$-axis only' }, { id: 'o', label: 'the origin only' }, { id: 'none', label: 'none of these' }], wrongMessage: 'Replace $y$ by $-y$: $(-y)^2 = y^2$, so the equation is unchanged.' },
        hints: ['Try each test: replace $y$ by $-y$; replace $x$ by $-x$; replace both.'],
        solution: ['Replacing $y$ by $-y$ gives $x = (-y)^2 - 4 = y^2 - 4$, the same equation: symmetric about the $x$-axis. Replacing $x$ by $-x$ gives $-x = y^2 - 4$, different; so not the $y$-axis, and not the origin.'] },
      { id: '1.9-e13', prompt: 'The graph of $y = x^3 - x$ is symmetric about…',
        answer: { type: 'choice', value: 'o', options: [{ id: 'x', label: 'the $x$-axis only' }, { id: 'y', label: 'the $y$-axis only' }, { id: 'o', label: 'the origin only' }, { id: 'none', label: 'none of these' }], wrongMessage: 'Replace both: $-y = (-x)^3 - (-x) = -x^3 + x$, which is the original multiplied by $-1$.' },
        hints: ['Every power of $x$ is odd.'],
        solution: ['Replacing $x \\to -x$ and $y \\to -y$: $-y = -x^3 + x$, i.e. $y = x^3 - x$ — unchanged, so symmetric about the origin. The single-axis tests fail.'] },
      { id: '1.9-e14', prompt: 'Is the point $(3, -4)$ on the circle $x^2 + y^2 = 25$?',
        answer: { type: 'choice', value: 'yes', options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }], wrongMessage: 'Substitute: $3^2 + (-4)^2 = 9 + 16 = 25$.' },
        hints: ['A point is on the graph if its coordinates make the equation true.'],
        solution: ['$3^2 + (-4)^2 = 9 + 16 = 25$ ✓, so yes.'] }
    ],

    generators: [
      { id: '1.9-g-distance', title: 'Distance between points', desc: 'Pythagoras in disguise.',
        make(r) {
          const x1 = r.int(-6, 6), y1 = r.int(-6, 6);
          const [dx, dy] = r.pick([[3, 4], [4, 3], [6, 8], [5, 12], [2, 4], [1, 3], [2, 6], [3, 3], [4, 2], [1, 2], [8, 6], [5, 5]]);
          const x2 = x1 + r.sign() * dx, y2 = y1 + r.sign() * dy;
          const d2 = dx * dx + dy * dy;
          return { prompt: 'Find the distance between $A' + pt(x1, y1) + '$ and $B' + pt(x2, y2) + '$. Give an exact, simplified answer.', answer: { type: 'number', value: Math.sqrt(d2), display: M.sqrtTex(d2) },
            hints: ['$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.', 'Horizontal change $' + (x2 - x1) + '$, vertical change $' + (y2 - y1) + '$.'],
            solution: [{ math: 'd = \\sqrt{(' + x2 + ' - (' + x1 + '))^2 + (' + y2 + ' - (' + y1 + '))^2} = \\sqrt{' + (dx * dx) + ' + ' + (dy * dy) + '} = \\sqrt{' + d2 + '} = ' + M.sqrtTex(d2) }] };
        } },
      { id: '1.9-g-midpoint', title: 'Midpoints', desc: 'Average the coordinates — or work backwards.',
        make(r) {
          const x1 = r.int(-7, 7), y1 = r.int(-7, 7), x2 = r.int(-7, 7), y2 = r.int(-7, 7);
          if (r.bool(0.6)) {
            const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
            return { prompt: 'Find the midpoint of $A' + pt(x1, y1) + '$ and $B' + pt(x2, y2) + '$.', answer: { type: 'point', value: [mx, my] },
              hints: ['Average the $x$-coordinates; average the $y$-coordinates.'], solution: [{ math: 'M = \\left(\\frac{' + x1 + ' + (' + x2 + ')}{2}, \\frac{' + y1 + ' + (' + y2 + ')}{2}\\right) = ' + pt(C.fmtTex(mx), C.fmtTex(my)) }] };
          }
          const mx = r.int(-5, 5), my = r.int(-5, 5);
          const bx = 2 * mx - x1, by = 2 * my - y1;
          return { prompt: '$M' + pt(mx, my) + '$ is the midpoint of $AB$, and $A = ' + pt(x1, y1) + '$. Find $B$.', answer: { type: 'point', value: [bx, by] },
            hints: ['Let $B = (x, y)$: then $\\frac{' + x1 + ' + x}{2} = ' + mx + '$ and $\\frac{' + y1 + ' + y}{2} = ' + my + '$.'], solution: [{ math: x1 + ' + x = ' + (2 * mx) + ' \\Rightarrow x = ' + bx + ', \\qquad ' + y1 + ' + y = ' + (2 * my) + ' \\Rightarrow y = ' + by, text: 'So $B = ' + pt(bx, by) + '$.' }] };
        } },
      { id: '1.9-g-intercepts', title: 'Intercepts', desc: 'Set y = 0, then set x = 0.',
        make(r) {
          if (r.bool(0.5)) {
            const a = r.nz(-5, 5), b = r.nz(-5, 5), cc = r.nz(-12, 12);
            return { prompt: 'Find the $x$-intercept and the $y$-intercept of $' + M.polyTex([a, 0]) + ' ' + (b > 0 ? '+ ' + (b === 1 ? '' : b) : '- ' + (b === -1 ? '' : -b)) + 'y = ' + cc + '$.', answer: { type: 'multi', parts: [{ label: '$x$-intercept', type: 'number', value: cc / a, display: C.fmtTex(cc / a) }, { label: '$y$-intercept', type: 'number', value: cc / b, display: C.fmtTex(cc / b) }] },
              hints: ['$x$-intercept: put $y = 0$ and solve. $y$-intercept: put $x = 0$ and solve.'], solution: ['$y = 0$: $' + a + 'x = ' + cc + ' \\Rightarrow x = ' + C.fmtTex(cc / a) + '$. $\\;x = 0$: $' + b + 'y = ' + cc + ' \\Rightarrow y = ' + C.fmtTex(cc / b) + '$.'] };
          }
          const p = r.nz(-5, 5), q = r.nz(-5, 5); if (p === q) return this.make(r);
          const coeffs = M.polyMul([1, -p], [1, -q]);
          return { prompt: 'Find the $x$-intercepts and the $y$-intercept of $y = ' + M.polyTex(coeffs) + '$.', answer: { type: 'multi', parts: [{ label: '$x$-intercepts (set)', type: 'set', value: [p, q].sort((a, b) => a - b) }, { label: '$y$-intercept', type: 'number', value: coeffs[2] }] },
            hints: ['$y = 0$: factor $' + M.polyTex(coeffs) + '$.', '$x = 0$: just the constant term.'], solution: ['$y = 0$: $(x ' + M.signed(-p) + ')(x ' + M.signed(-q) + ') = 0 \\Rightarrow x = ' + p + '$ or $' + q + '$. $\\;x = 0$: $y = ' + coeffs[2] + '$.'] };
        } },
      { id: '1.9-g-circle-eq', title: 'Equation of a circle', desc: 'From the centre and radius, or centre and a point.',
        make(r) {
          const h = r.int(-5, 5), k = r.int(-5, 5);
          if (r.bool(0.5)) {
            const rad = r.int(1, 7);
            return { prompt: 'Write the equation of the circle with centre $' + pt(h, k) + '$ and radius $' + rad + '$.', answer: { type: 'equation', value: circleStr(h, k, rad * rad), display: circleTex(h, k, rad * rad) },
              hints: ['$(x - h)^2 + (y - k)^2 = r^2$. Watch the signs: $x - (' + h + ')$ and $y - (' + k + ')$.', 'Remember to square the radius: $r^2 = ' + (rad * rad) + '$.'], solution: [{ math: circleTex(h, k, rad * rad) }] };
          }
          const dx = r.nz(-5, 5), dy = r.nz(-5, 5), px = h + dx, py = k + dy, r2 = dx * dx + dy * dy;
          return { prompt: 'Write the equation of the circle with centre $' + pt(h, k) + '$ that passes through the point $' + pt(px, py) + '$.', answer: { type: 'equation', value: circleStr(h, k, r2), display: circleTex(h, k, r2) },
            hints: ['The radius is the distance from the centre to the point — but you only need $r^2$.', '$r^2 = (' + px + ' - (' + h + '))^2 + (' + py + ' - (' + k + '))^2 = ' + r2 + '$.'], solution: [{ math: 'r^2 = ' + (dx * dx) + ' + ' + (dy * dy) + ' = ' + r2 + ' \\;\\Rightarrow\\; ' + circleTex(h, k, r2) }] };
        } },
      { id: '1.9-g-circle-general', title: 'Centre and radius from the general form', desc: 'Complete the square twice.',
        make(r) {
          const h = r.int(-5, 5), k = r.int(-5, 5), r2 = r.pick([1, 4, 9, 16, 25, 2, 5, 10, 13]);
          const a = -2 * h, b = -2 * k, c = h * h + k * k - r2;
          const eq = 'x^2 + y^2 ' + (a ? M.signed(a) + 'x ' : '') + (b ? M.signed(b) + 'y ' : '') + (c ? M.signed(c) + ' ' : '') + '= 0';
          return { prompt: 'Find the centre and radius of the circle $' + eq + '$.', answer: { type: 'multi', parts: [{ label: 'Centre', type: 'point', value: [h, k] }, { label: 'Radius', type: 'number', value: Math.sqrt(r2), display: M.sqrtTex(r2) }] },
            hints: ['Group $x$ terms and $y$ terms, move the constant to the right.', 'Complete the square: add $' + (h * h) + '$ for $x$ and $' + (k * k) + '$ for $y$ — to both sides.'],
            solution: [{ math: '(x^2 ' + (a ? M.signed(a) + 'x ' : '') + '+ ' + (h * h) + ') + (y^2 ' + (b ? M.signed(b) + 'y ' : '') + '+ ' + (k * k) + ') = ' + (-c) + ' + ' + (h * h) + ' + ' + (k * k), text: 'Complete both squares.' }, { math: circleTex(h, k, r2), text: 'Centre $' + pt(h, k) + '$, radius $\\sqrt{' + r2 + '} = ' + M.sqrtTex(r2) + '$.' }] };
        } },
      { id: '1.9-g-diameter', title: 'Circle from a diameter', desc: 'Midpoint for the centre, distance for the radius.',
        make(r) {
          const h = r.int(-4, 4), k = r.int(-4, 4), dx = r.nz(-4, 4), dy = r.nz(-4, 4);
          const A = [h - dx, k - dy], B = [h + dx, k + dy], r2 = dx * dx + dy * dy;
          return { prompt: 'Find the equation of the circle with $A' + pt(A[0], A[1]) + '$ and $B' + pt(B[0], B[1]) + '$ as the endpoints of a diameter.', answer: { type: 'equation', value: circleStr(h, k, r2), display: circleTex(h, k, r2) },
            hints: ['The centre is the midpoint of $AB$.', 'The radius is the distance from the centre to $A$; $r^2 = ' + r2 + '$.'],
            solution: [{ math: 'C = \\left(\\frac{' + A[0] + ' + ' + B[0] + '}{2}, \\frac{' + A[1] + ' + ' + B[1] + '}{2}\\right) = ' + pt(h, k), text: 'Centre = midpoint.' }, { math: 'r^2 = (' + A[0] + ' - ' + h + ')^2 + (' + A[1] + ' - ' + k + ')^2 = ' + r2 + ' \\;\\Rightarrow\\; ' + circleTex(h, k, r2), text: 'Radius from centre to $A$.' }] };
        } },
      { id: '1.9-g-symmetry', title: 'Symmetry tests', desc: 'Replace x by −x, y by −y, or both.',
        make(r) {
          const bank = [
            { eq: 'y = x^2 - 3', s: 'y', why: 'only even powers of $x$: replacing $x$ by $-x$ changes nothing.' },
            { eq: 'x = y^2 + 1', s: 'x', why: 'only even powers of $y$: replacing $y$ by $-y$ changes nothing.' },
            { eq: 'y = x^3 - 4x', s: 'o', why: 'all powers of $x$ are odd: replacing both $x$ and $y$ by their negatives gives $-y = -x^3 + 4x$, the same equation.' },
            { eq: 'x^2 + y^2 = 16', s: 'all', why: 'both variables appear only squared, so every test leaves it unchanged.' },
            { eq: 'y = x^2 + x', s: 'none', why: '$x \\to -x$ gives $y = x^2 - x$ (different); $y \\to -y$ gives $-y = x^2 + x$ (different); both gives $-y = x^2 - x$ (different).' },
            { eq: 'xy = 4', s: 'o', why: '$(-x)(-y) = xy$, so replacing both leaves it unchanged; replacing just one gives $-xy = 4$.' },
            { eq: 'y = |x|', s: 'y', why: '$|-x| = |x|$.' },
            { eq: 'x^2 - y^2 = 1', s: 'all', why: 'only even powers of both variables.' },
            { eq: 'y = x^4 - 2x^2', s: 'y', why: 'only even powers of $x$.' },
            { eq: 'x = y^3', s: 'o', why: 'replacing both: $-x = -y^3$, i.e. $x = y^3$.' },
            { eq: 'x = y^2 - y', s: 'none', why: '$y \\to -y$ gives $x = y^2 + y$, different; the other tests fail too.' },
            { eq: '3x^2 + y^2 = 5x', s: 'none', why: '$x \\to -x$ gives $3x^2 + y^2 = -5x$, different; $y \\to -y$ leaves it unchanged so it **is** symmetric about the $x$-axis — but not the others.' }
          ];
          // fix the last item's answer: it is x-axis symmetric
          bank[bank.length - 1].s = 'x';
          const it = r.pick(bank);
          const opts = [['x', sym.x], ['y', sym.y], ['o', sym.o], ['all', sym.all], ['none', sym.none]].map(([id, label]) => ({ id, label }));
          return { prompt: 'The graph of $' + it.eq + '$ is symmetric about…', answer: { type: 'choice', value: it.s, options: opts, wrongMessage: 'Apply each test: replace $y$ by $-y$ (x-axis), $x$ by $-x$ (y-axis), both (origin), and compare with the original.' },
            hints: ['x-axis test: replace $y$ with $-y$. y-axis test: replace $x$ with $-x$. Origin test: replace both.'],
            solution: ['Answer: ' + sym[it.s] + ' — ' + it.why] };
        } }
    ]
  });
})();
