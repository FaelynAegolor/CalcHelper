/* 1.5 Equations */
(function () {
  const M = CH.M, V = CH.V;
  const lin = (a, b) => M.polyTex([a, b]);
  const linS = (a, b) => M.polyStr([a, b]);
  const paren = s => '(' + s + ')';
  const setTex = arr => arr.length ? '\\{' + arr.join(',\\ ') + '\\}' : '\\varnothing';
  const sq = M.sqrtTex;

  CH.registerSection({
    id: '1.5', chapter: 1, title: 'Equations',
    summary: 'Solving for x: linear equations, formulas with several letters, quadratics (factoring, completing the square, the formula), equations with fractions, roots and absolute values.',

    theory: [
      { h: 'The one big rule' },
      'An equation is a statement that two things are equal. **Whatever you do to one side, do to the other** and the two sides stay equal. Solving means using this rule to peel everything away from $x$ until it stands alone.',
      { example: {
        title: 'A linear equation with brackets',
        problem: 'Solve $4(x + 3) = 3(6 - 4x) + 10$.',
        steps: [
          { text: 'Expand the brackets so there is nothing hiding.', math: '4x + 12 = 18 - 12x + 10' },
          { text: 'Tidy each side.', math: '4x + 12 = 28 - 12x' },
          { text: 'Get all the $x$ terms on one side (add $12x$ to both sides) and the numbers on the other (subtract $12$).', math: '16x = 16' },
          { text: 'Divide both sides by $16$.', math: 'x = 1' },
          { text: 'Check: $4(1 + 3) = 16$ and $3(6 - 4) + 10 = 16$. ✓' }
        ], answer: '$x = 1$' } },
      { tip: 'Always check', md: 'Substitute your answer back into the **original** equation. It takes ten seconds and catches most slips. (The working checker on each exercise does exactly this to every line you write.)' },

      { h: 'Solving for one letter in terms of the others' },
      'Formulas have several letters. "Solve for $h$" just means: treat every other letter as if it were a known number, and get $h$ alone. The steps are the same as for a linear equation.',
      { key: 'When the letter appears more than once', md: 'Get every term containing that letter on one side and everything else on the other, then **factor the letter out** and divide.\n\n$$2xy + 5 = 3x + 3 \\;\\Rightarrow\\; 2xy - 3x = 3 - 5 \\;\\Rightarrow\\; x(2y - 3) = -2 \\;\\Rightarrow\\; x = \\frac{-2}{2y - 3}$$' },

      { h: 'Quadratic equations' },
      'A **quadratic equation** has an $x^2$ in it: $ax^2 + bx + c = 0$. It can have **two**, **one** or **no** real solutions — you can see why from the graph of $y = ax^2 + bx + c$, which is a U-shape (a parabola). The solutions are where the curve crosses the $x$-axis.',
      { widget: 'quadratic-explorer' },
      { key: 'Method 1 — factoring (try this first)', md: 'Move everything to one side so the other side is $0$, factor, and use the **zero-product rule**: if $A \\cdot B = 0$ then $A = 0$ or $B = 0$.\n\n$$x^2 + 5x - 24 = 0 \\;\\Rightarrow\\; (x + 8)(x - 3) = 0 \\;\\Rightarrow\\; x = -8 \\text{ or } x = 3$$\n\nThe **solution set** is $\\{-8, 3\\}$.' },
      { warn: 'It must be equal to zero', md: 'The zero-product rule only works with $0$. From $(x + 8)(x - 3) = 6$ you can **not** conclude anything about the factors. Expand, move the $6$ over, and factor again.' },
      { warn: 'Check whether it is really quadratic', md: 'Some equations look quadratic but are not. In $(t-4)^2 = (t+4)^2 + 32$, expanding gives $t^2 - 8t + 16 = t^2 + 8t + 48$ — the $t^2$ appears on **both** sides and cancels, leaving the linear equation $-16t = 32$, so $t = -2$. Always expand first and see what survives.' },
      { key: 'Method 0 — just take the square root', md: 'If the equation is already in the shape $(\\text{something})^2 = \\text{number}$, you do not need any method: square-root both sides and remember **both** signs.\n\n$$(2x - 5)^2 = 81 \\;\\Rightarrow\\; 2x - 5 = \\pm 9 \\;\\Rightarrow\\; 2x = 14 \\text{ or } 2x = -4 \\;\\Rightarrow\\; x = 7 \\text{ or } x = -2$$\n\nForgetting the $\\pm$ loses half the answers.' },
      { key: 'Method 2 — completing the square', md: 'Turns any quadratic into the shape $(x + p)^2 = q$, which you can solve by taking a square root of both sides (remembering $\\pm$).\n\n1. Get the $x^2$ and $x$ terms on the left, the number on the right: $x^2 - 8x = -13$.\n2. Take **half** the $x$-coefficient and **square** it: $\\left(\\tfrac{-8}{2}\\right)^2 = 16$. Add it to **both** sides: $x^2 - 8x + 16 = 3$.\n3. The left side is now a perfect square: $(x - 4)^2 = 3$.\n4. Square-root both sides: $x - 4 = \\pm\\sqrt{3}$, so $x = 4 \\pm \\sqrt{3}$.\n\n**If the $x^2$ has a coefficient, divide the whole equation by it first.** For $3x^2 - 12x + 5 = 0$, dividing by $3$ gives $x^2 - 4x + \\tfrac53 = 0$; then $x^2 - 4x = -\\tfrac53$, add $4$ to both sides, $(x-2)^2 = \\tfrac73$, so $x = 2 \\pm \\sqrt{\\tfrac73} = 2 \\pm \\tfrac{\\sqrt{21}}{3}$.' },
      { warn: 'What if the right-hand side comes out negative?', md: 'Completing the square on $x^2 - 6x + 11 = 0$ gives $(x-3)^2 = -2$. A square is never negative, so there is **no real solution** — the same verdict the discriminant gives ($D = 36 - 44 = -8 < 0$).' },
      { html: V.areaModel({ rows: ['x', '-4'], cols: ['x', '-4'], cells: [['x^2', '-4x'], ['-4x', '16']] }), caption: 'Why $16$? $x^2 - 8x$ is the square minus the corner: the two rectangles give $-8x$, and the missing corner is $(-4)^2 = 16$. Adding it "completes the square".' },
      { key: 'Method 3 — the quadratic formula (always works)', md: 'For $ax^2 + bx + c = 0$:\n\n$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\nIt is exactly what you get by completing the square in general. Write down $a$, $b$, $c$ **with their signs** before substituting.' },
      { def: 'The discriminant', md: 'The part under the root, $D = b^2 - 4ac$, tells you how many solutions there are **before** you solve:\n\n- $D > 0$: **two** real solutions (the parabola crosses the axis twice)\n- $D = 0$: **one** real solution (it just touches the axis)\n- $D < 0$: **no** real solutions (it never reaches the axis)' },

      { h: 'Equations of quadratic type' },
      'Some equations are quadratics in disguise. If you see a power and its **square** — like $x^2$ and $x^4$, or $x^{1/3}$ and $x^{2/3}$, or $\\sqrt{x}$ and $x$ — let $u$ be the smaller power and you get an ordinary quadratic in $u$.',
      '$$x^4 - 2x^2 - 8 = 0 \\;\\xrightarrow{u = x^2}\\; u^2 - 2u - 8 = 0 \\;\\Rightarrow\\; (u - 4)(u + 2) = 0 \\;\\Rightarrow\\; x^2 = 4 \\text{ or } x^2 = -2$$',
      '$x^2 = 4$ gives $x = \\pm 2$; $x^2 = -2$ is impossible. Solution set $\\{-2, 2\\}$. Always **translate back** to $x$ at the end — $u$ was only a helper.',
      { key: 'The $\\sqrt{x}$ version', md: 'Since $x = \\left(\\sqrt{x}\\right)^2$, an equation like $x - 5\\sqrt{x} + 6 = 0$ is a quadratic in $u = \\sqrt{x}$:\n\n$$u^2 - 5u + 6 = 0 \\;\\Rightarrow\\; (u-2)(u-3) = 0 \\;\\Rightarrow\\; \\sqrt{x} = 2 \\text{ or } \\sqrt{x} = 3$$\n\nSquaring gives $x = 4$ or $x = 9$. **A square root can never be negative**, so if a value of $u$ comes out negative, throw it away.' },

      { h: 'Equations with fractions' },
      'Multiply **every term** by the LCD of all the denominators. This clears the fractions in one move. Afterwards, check that your answer does not make any original denominator zero.',
      '$$\\frac{3}{x} - \\frac{2}{x + 1} = 1 \\;\\xrightarrow{\\times\\, x(x+1)}\\; 3(x + 1) - 2x = x(x + 1) \\;\\Rightarrow\\; x + 3 = x^2 + x \\;\\Rightarrow\\; x^2 = 3 \\;\\Rightarrow\\; x = \\pm\\sqrt{3}$$',

      { h: 'Equations with square roots' },
      { key: 'Isolate, square, solve, CHECK', md: '1. Get the root **by itself** on one side.\n2. Square both sides (the root disappears).\n3. Solve the resulting equation.\n4. **Check every answer in the original equation.** Squaring can create fake solutions, called **extraneous** solutions, and the only way to catch them is to substitute back.' },
      { svg: V.graph({ xmin: -3, xmax: 6, ymin: -6, ymax: 6, width: 380, id: 'rad', fns: [{ f: x => Math.sqrt(3 * x + 4), label: 'y = √(3x + 4)', domain: [-4 / 3, 6] }, { f: x => -x, color: 'var(--viz-2)', label: 'y = −x', labelAt: -2.5 }], points: [{ x: -1, y: 1, label: 'x = −1 ✓' }, { x: 4, y: 4, label: '(4, 4)', color: 'var(--viz-5)' }, { x: 4, y: -4, label: 'x = 4 ✗', color: 'var(--viz-5)', open: true, dy: 16 }] }), caption: 'Solving $\\sqrt{3x+4} = -x$. The curves meet only at $x = -1$. Squaring also produces $x = 4$, where $\\sqrt{3x+4} = 4$ but $-x = -4$: same size, opposite sign. Squaring cannot tell $4$ from $-4$, which is exactly why extraneous solutions appear.' },
      { why: 'Why squaring creates extra solutions', md: '$3 = -3$ is false, but square both sides and you get $9 = 9$, which is true. Squaring turns a false equation into a true one whenever the two sides are opposites. So after squaring, some "solutions" may be solving the wrong equation.' },
      { tip: 'Root equals root', md: 'When **both** sides are square roots, squaring is especially clean — the roots simply vanish:\n\n$$\\sqrt{2x - 1} = \\sqrt{3x - 5} \\;\\Rightarrow\\; 2x - 1 = 3x - 5 \\;\\Rightarrow\\; x = 4$$\n\nStill check: both insides must come out $\\ge 0$. At $x = 4$ they are $7$ and $7$ ✓.' },

      { h: 'Absolute value equations' },
      '$|{\\rm something}| = c$ means the something is at distance $c$ from $0$, so it is either $c$ or $-c$:',
      { key: 'Absolute value equation', md: '$$|A| = c \\;(c \\ge 0) \\quad\\Rightarrow\\quad A = c \\;\\text{ or }\\; A = -c$$\n\nSolve both little equations. If $c < 0$ there is **no solution** — an absolute value is never negative.\n\n$$|2x - 5| = 3 \\;\\Rightarrow\\; 2x - 5 = 3 \\text{ or } 2x - 5 = -3 \\;\\Rightarrow\\; x = 4 \\text{ or } x = 1$$' },
      { svg: V.numberLine({ min: -1, max: 6, points: [{ x: 1, label: 'x = 1' }, { x: 4, label: 'x = 4' }, { x: 2.5, label: '5/2', color: 'var(--viz-5)', open: true }], intervals: [{ lo: 1, hi: 4, loC: true, hiC: true, color: 'var(--viz-2)' }] }), caption: 'Another view: $|2x - 5| = 3$ is $2|x - \\tfrac52| = 3$, i.e. $x$ is at distance $\\tfrac32$ from $\\tfrac52$. That gives $1$ and $4$ — one on each side.' }
    ],

    examples: [
      { title: 'Solving for a letter',
        problem: 'Solve $y(5x - 7) = 3x$ for $x$.',
        steps: [
          { text: 'Expand so you can see every term with an $x$.', math: '5xy - 7y = 3x' },
          { text: 'Collect the $x$ terms on the left, everything else on the right.', math: '5xy - 3x = 7y' },
          { text: 'Factor out $x$.', math: 'x(5y - 3) = 7y' },
          { text: 'Divide by the bracket.', math: 'x = \\frac{7y}{5y - 3}' }
        ], answer: '$x = \\dfrac{7y}{5y - 3}$' },
      { title: 'A formula from geometry',
        problem: 'The surface area of a box is $A = 2lw + 2wh + 2lh$. Solve for $h$.',
        steps: [
          { text: 'Put the terms containing $h$ on one side, the rest on the other.', math: '2wh + 2lh = A - 2lw' },
          { text: 'Factor out $h$.', math: 'h(2w + 2l) = A - 2lw' },
          { text: 'Divide.', math: 'h = \\frac{A - 2lw}{2w + 2l}' }
        ], answer: '$h = \\dfrac{A - 2lw}{2l + 2w}$' },
      { title: 'Quadratic by factoring',
        problem: 'Solve $x^2 + 5x - 24 = 0$.',
        steps: [
          { text: 'Two numbers that multiply to $-24$ and add to $5$: $8$ and $-3$.', math: '(x + 8)(x - 3) = 0' },
          { text: 'Zero-product rule.', math: 'x + 8 = 0 \\;\\text{ or }\\; x - 3 = 0' },
          { text: 'Solve each.', math: 'x = -8 \\;\\text{ or }\\; x = 3 \\qquad S = \\{-8, 3\\}' }
        ], answer: '$S = \\{-8, 3\\}$' },
      { title: 'Completing the square',
        problem: 'Solve $x^2 + 6x - 3 = 0$ by completing the square.',
        steps: [
          { text: 'Move the number to the right.', math: 'x^2 + 6x = 3' },
          { text: 'Half of $6$ is $3$; $3^2 = 9$. Add $9$ to both sides.', math: 'x^2 + 6x + 9 = 12' },
          { text: 'Left side is a perfect square.', math: '(x + 3)^2 = 12' },
          { text: 'Square root both sides — don\'t forget $\\pm$ — and simplify $\\sqrt{12} = 2\\sqrt{3}$.', math: 'x + 3 = \\pm 2\\sqrt{3} \\;\\Rightarrow\\; x = -3 \\pm 2\\sqrt{3}' }
        ], answer: '$S = \\{-3 - 2\\sqrt3,\\ -3 + 2\\sqrt3\\}$' },
      { title: 'The quadratic formula',
        problem: 'Solve $x^2 + 2x - 4 = 0$.',
        steps: [
          { text: 'Identify $a = 1$, $b = 2$, $c = -4$, and compute the discriminant first.', math: 'D = b^2 - 4ac = 4 - 4(1)(-4) = 20 > 0 \\quad\\text{(two real solutions)}' },
          { text: 'Substitute into the formula.', math: 'x = \\frac{-2 \\pm \\sqrt{20}}{2}' },
          { text: 'Simplify the root: $\\sqrt{20} = 2\\sqrt{5}$. Then divide every term by $2$.', math: 'x = \\frac{-2 \\pm 2\\sqrt{5}}{2} = -1 \\pm \\sqrt{5}' }
        ], answer: '$S = \\{-1 - \\sqrt5,\\ -1 + \\sqrt5\\}$' },
      { title: 'Using the discriminant',
        problem: 'How many real solutions do (a) $4x^2 - 4x + 1 = 0$ and (b) $5x^2 - 2x + 1 = 0$ have?',
        steps: [
          { text: '(a) $a = 4$, $b = -4$, $c = 1$.', math: 'D = (-4)^2 - 4(4)(1) = 16 - 16 = 0 \\;\\Rightarrow\\; \\text{exactly one solution: } x = \\tfrac{-b}{2a} = \\tfrac{4}{8} = \\tfrac12' },
          { text: '(b) $a = 5$, $b = -2$, $c = 1$.', math: 'D = (-2)^2 - 4(5)(1) = 4 - 20 = -16 < 0 \\;\\Rightarrow\\; \\text{no real solutions, } S = \\varnothing' }
        ], answer: '(a) one solution, $x = \\tfrac12$ &nbsp; (b) none' },
      { title: 'Quadratic type with fractional powers',
        problem: 'Solve $x^{2/3} - 2x^{1/3} - 8 = 0$.',
        steps: [
          { text: 'Notice $x^{2/3} = (x^{1/3})^2$. Let $u = x^{1/3}$.', math: 'u^2 - 2u - 8 = 0 \\;\\Rightarrow\\; (u - 4)(u + 2) = 0' },
          { text: 'So $u = 4$ or $u = -2$. Translate back: $u = x^{1/3} = \\sqrt[3]{x}$.', math: '\\sqrt[3]{x} = 4 \\;\\Rightarrow\\; x = 64 \\qquad \\sqrt[3]{x} = -2 \\;\\Rightarrow\\; x = -8' }
        ], answer: '$S = \\{-8, 64\\}$' },
      { title: 'Clearing fractions',
        problem: 'Solve $\\dfrac{3x + 1}{x - 2} = \\dfrac{4}{5}$.',
        steps: [
          { text: 'LCD is $5(x - 2)$. Multiply both sides by it.', math: '5(3x + 1) = 4(x - 2)' },
          { text: 'Expand and solve.', math: '15x + 5 = 4x - 8 \\;\\Rightarrow\\; 11x = -13 \\;\\Rightarrow\\; x = -\\frac{13}{11}' },
          { text: 'Check the denominator: $x = -\\tfrac{13}{11} \\ne 2$, so it is allowed.' }
        ], answer: '$x = -\\dfrac{13}{11}$' },
      { title: 'A radical equation with an extraneous solution',
        problem: 'Solve $\\sqrt{3x + 4} + x = 0$.',
        steps: [
          { text: 'Isolate the root.', math: '\\sqrt{3x + 4} = -x' },
          { text: 'Square both sides.', math: '3x + 4 = x^2' },
          { text: 'Rearrange and factor.', math: 'x^2 - 3x - 4 = 0 \\;\\Rightarrow\\; (x - 4)(x + 1) = 0 \\;\\Rightarrow\\; x = 4 \\text{ or } x = -1' },
          { text: '**Check** $x = 4$: $\\sqrt{16} + 4 = 8 \\ne 0$. ✗ Extraneous — reject it.' },
          { text: '**Check** $x = -1$: $\\sqrt{1} + (-1) = 0$. ✓', math: 'S = \\{-1\\}' }
        ], answer: '$S = \\{-1\\}$' },
      { title: 'Radical equation, square of a binomial',
        problem: 'Solve $\\sqrt{2x + 7} = x + 2$.',
        steps: [
          { text: 'The root is already alone. Square both sides — carefully, $(x+2)^2$ has three terms.', math: '2x + 7 = x^2 + 4x + 4' },
          { text: 'Rearrange and factor.', math: 'x^2 + 2x - 3 = 0 \\;\\Rightarrow\\; (x + 3)(x - 1) = 0' },
          { text: 'Check $x = -3$: $\\sqrt{1} = 1$ but $x + 2 = -1$. ✗ Check $x = 1$: $\\sqrt{9} = 3 = 1 + 2$. ✓', math: 'S = \\{1\\}' }
        ], answer: '$S = \\{1\\}$' },
      { title: 'Absolute value equations',
        problem: 'Solve (a) $|2x - 5| = 3$ and (b) $|2x - 5| = -7$.',
        steps: [
          { text: '(a) Split into two equations.', math: '2x - 5 = 3 \\;\\text{ or }\\; 2x - 5 = -3' },
          { text: 'Solve each.', math: '2x = 8 \\Rightarrow x = 4 \\qquad 2x = 2 \\Rightarrow x = 1 \\qquad S = \\{1, 4\\}' },
          { text: '(b) An absolute value can never be negative, so there is nothing to solve.', math: 'S = \\varnothing' }
        ], answer: '(a) $\\{1, 4\\}$ &nbsp; (b) $\\varnothing$' }
    ],

    exercises: [
      { id: '1.5-e1', prompt: 'Solve $4(x + 3) = 3(6 - 4x) + 10$.',
        answer: { type: 'set', value: [1] },
        hints: ['Expand both sides first.', '$4x + 12 = 28 - 12x$'],
        solution: [{ math: '4x + 12 = 18 - 12x + 10 \\Rightarrow 16x = 16 \\Rightarrow x = 1', text: 'Expand, collect, divide.' }] },
      { id: '1.5-e2', prompt: 'Solve $2xy + 5 = 3x + 3$ for $x$ (in terms of $y$).',
        answer: { type: 'expression', value: '-2/(2y-3)', solveFor: 'x', vars: ['y'], display: '\\frac{-2}{2y - 3}' },
        hints: ['Get both terms with $x$ on one side.', '$2xy - 3x = -2$, then factor out $x$.'],
        solution: [{ math: '2xy - 3x = 3 - 5 \\Rightarrow x(2y - 3) = -2 \\Rightarrow x = \\frac{-2}{2y - 3}', text: 'Collect, factor, divide.' }] },
      { id: '1.5-e3', prompt: 'Solve $A = 2lw + 2wh + 2lh$ for $h$.',
        answer: { type: 'expression', value: '(A - 2lw)/(2l + 2w)', solveFor: 'h', vars: ['A', 'l', 'w'], display: '\\frac{A - 2lw}{2l + 2w}' },
        hints: ['Move $2lw$ (the only term without $h$) to the other side.', 'Factor $h$ out of $2wh + 2lh$.'],
        solution: [{ math: '2wh + 2lh = A - 2lw \\Rightarrow h(2w + 2l) = A - 2lw \\Rightarrow h = \\frac{A - 2lw}{2l + 2w}', text: 'Isolate the $h$ terms, factor, divide.' }] },
      { id: '1.5-e4', prompt: 'Solve $x^2 + 5x - 24 = 0$.',
        answer: { type: 'set', value: [-8, 3] },
        hints: ['Factor: two numbers multiplying to $-24$, adding to $5$.', '$(x + 8)(x - 3) = 0$'],
        solution: [{ math: '(x + 8)(x - 3) = 0 \\Rightarrow x = -8 \\text{ or } x = 3', text: 'Factor and use the zero-product rule.' }] },
      { id: '1.5-e5', prompt: 'Solve $x^2 - 8x + 13 = 0$ by completing the square. Give exact answers.',
        answer: { type: 'set', value: [4 - Math.sqrt(3), 4 + Math.sqrt(3)], display: '\\{4 - \\sqrt3,\\ 4 + \\sqrt3\\}' },
        hints: ['Move $13$ to the right: $x^2 - 8x = -13$.', 'Half of $-8$ is $-4$; add $(-4)^2 = 16$ to both sides.', '$(x - 4)^2 = 3$'],
        solution: [{ math: 'x^2 - 8x + 16 = -13 + 16 \\Rightarrow (x - 4)^2 = 3 \\Rightarrow x = 4 \\pm \\sqrt{3}', text: 'Complete the square and square-root both sides.' }] },
      { id: '1.5-e6', prompt: 'Solve $x^2 + 2x - 4 = 0$. Give exact answers.',
        answer: { type: 'set', value: [-1 - Math.sqrt(5), -1 + Math.sqrt(5)], display: '\\{-1 - \\sqrt5,\\ -1 + \\sqrt5\\}' },
        hints: ['It does not factor nicely — use the formula (or complete the square).', '$D = 4 + 16 = 20$, and $\\sqrt{20} = 2\\sqrt5$.'],
        solution: [{ math: 'x = \\frac{-2 \\pm \\sqrt{20}}{2} = \\frac{-2 \\pm 2\\sqrt5}{2} = -1 \\pm \\sqrt5', text: 'Quadratic formula, then simplify.' }] },
      { id: '1.5-e7', prompt: 'Solve $4x^2 - 4x + 1 = 0$.',
        answer: { type: 'set', value: [0.5], display: '\\{\\tfrac12\\}' },
        hints: ['Compute the discriminant first.', '$D = 0$, so there is exactly one solution. Also: $4x^2 - 4x + 1 = (2x - 1)^2$.'],
        solution: [{ math: '(2x - 1)^2 = 0 \\Rightarrow x = \\tfrac12', text: 'A perfect square trinomial; one (repeated) solution.' }] },
      { id: '1.5-e8', prompt: 'Without solving, how many real solutions does $5x^2 - 2x + 1 = 0$ have?',
        answer: { type: 'choice', value: 'c', options: [{ id: 'a', label: 'Two' }, { id: 'b', label: 'Exactly one' }, { id: 'c', label: 'None' }], wrongMessage: 'Compute $D = b^2 - 4ac$ and look at its sign.' },
        hints: ['$D = b^2 - 4ac$ with $a = 5$, $b = -2$, $c = 1$.'],
        solution: ['$D = (-2)^2 - 4(5)(1) = 4 - 20 = -16 < 0$, so there are no real solutions.'] },
      { id: '1.5-e9', prompt: 'Solve $x^4 - 2x^2 - 8 = 0$.',
        answer: { type: 'set', value: [-2, 2] },
        hints: ['Let $u = x^2$: $u^2 - 2u - 8 = 0$.', '$(u - 4)(u + 2) = 0$. Only $u = 4$ is possible for $u = x^2$.'],
        solution: [{ math: '(x^2 - 4)(x^2 + 2) = 0 \\Rightarrow x^2 = 4 \\Rightarrow x = \\pm 2', text: '$x^2 = -2$ has no real solution.' }] },
      { id: '1.5-e10', prompt: 'Solve $x^{2/3} - 2x^{1/3} - 8 = 0$.',
        answer: { type: 'set', value: [-8, 64] },
        hints: ['Let $u = x^{1/3}$, so $x^{2/3} = u^2$.', '$u = 4$ or $u = -2$. Now cube to get $x$.'],
        solution: [{ math: '(x^{1/3} - 4)(x^{1/3} + 2) = 0 \\Rightarrow x^{1/3} = 4 \\text{ or } -2 \\Rightarrow x = 64 \\text{ or } -8', text: 'Factor in terms of $u = x^{1/3}$, then cube.' }] },
      { id: '1.5-e11', prompt: 'Solve $\\dfrac{3x + 1}{x - 2} = \\dfrac{4}{5}$.',
        answer: { type: 'set', value: [-13 / 11], display: '\\{-\\tfrac{13}{11}\\}' },
        hints: ['Multiply both sides by $5(x - 2)$.', '$5(3x + 1) = 4(x - 2)$'],
        solution: [{ math: '15x + 5 = 4x - 8 \\Rightarrow 11x = -13 \\Rightarrow x = -\\tfrac{13}{11}', text: 'Clear fractions and solve. $x \\ne 2$, so the answer is valid.' }] },
      { id: '1.5-e12', prompt: 'Solve $\\dfrac{3}{x} - \\dfrac{2}{x + 1} = 1$. Give exact answers.',
        answer: { type: 'set', value: [-Math.sqrt(3), Math.sqrt(3)], display: '\\{-\\sqrt3,\\ \\sqrt3\\}' },
        hints: ['LCD is $x(x + 1)$. Multiply every term by it.', '$3(x + 1) - 2x = x(x + 1)$'],
        solution: [{ math: '3(x+1) - 2x = x(x+1) \\Rightarrow x + 3 = x^2 + x \\Rightarrow x^2 = 3 \\Rightarrow x = \\pm\\sqrt3', text: 'Clear denominators; neither answer makes a denominator zero.' }] },
      { id: '1.5-e13', prompt: 'Solve $\\sqrt{3x + 4} + x = 0$.',
        answer: { type: 'set', value: [-1], extraneousHint: true },
        hints: ['Isolate the root: $\\sqrt{3x + 4} = -x$. Then square.', '$x^2 - 3x - 4 = 0$ gives two candidates. Check both in the original!'],
        solution: [{ math: '3x + 4 = x^2 \\Rightarrow (x - 4)(x + 1) = 0', text: 'Isolate and square.' }, { text: 'Check: $x = 4$ gives $4 + 4 = 8 \\ne 0$ (extraneous); $x = -1$ gives $1 - 1 = 0$ ✓. So $S = \\{-1\\}$.' }] },
      { id: '1.5-e14', prompt: 'Solve $\\sqrt{2x + 7} = x + 2$.',
        answer: { type: 'set', value: [1], extraneousHint: true },
        hints: ['Square both sides: $(x + 2)^2 = x^2 + 4x + 4$.', 'Candidates $-3$ and $1$ — check them.'],
        solution: [{ math: '2x + 7 = x^2 + 4x + 4 \\Rightarrow x^2 + 2x - 3 = 0 \\Rightarrow (x + 3)(x - 1) = 0', text: 'Square and solve.' }, { text: '$x = -3$: $\\sqrt{1} = 1 \\ne -1$, extraneous. $x = 1$: $\\sqrt9 = 3 = 3$ ✓. $S = \\{1\\}$.' }] },
      { id: '1.5-e15', prompt: 'Solve $\\sqrt{2x + 1} = x - 1$.',
        answer: { type: 'set', value: [4], extraneousHint: true },
        hints: ['Square: $2x + 1 = x^2 - 2x + 1$.', '$x^2 - 4x = 0$ gives $x = 0$ or $x = 4$. Check!'],
        solution: [{ math: '2x + 1 = x^2 - 2x + 1 \\Rightarrow x(x - 4) = 0', text: 'Square and solve.' }, { text: '$x = 0$: $\\sqrt1 = 1 \\ne -1$, extraneous. $x = 4$: $\\sqrt9 = 3 = 3$ ✓. $S = \\{4\\}$.' }] },
      { id: '1.5-e16', prompt: 'Solve $|3x - 5| = 1$.',
        answer: { type: 'set', value: [4 / 3, 2], display: '\\{\\tfrac43,\\ 2\\}' },
        hints: ['Two cases: $3x - 5 = 1$ or $3x - 5 = -1$.'],
        solution: [{ math: '3x - 5 = 1 \\Rightarrow x = 2 \\qquad 3x - 5 = -1 \\Rightarrow x = \\tfrac43', text: 'Solve both cases.' }] },
      { id: '1.5-e17', prompt: 'Solve $|2x - 5| = -7$.',
        answer: { type: 'set', value: [] },
        hints: ['Can an absolute value ever be negative?'],
        solution: ['An absolute value is never negative, so there is no solution: $S = \\varnothing$.'] },
      { id: '1.5-e18', prompt: 'Solve $(t - 4)^2 = (t + 4)^2 + 32$.',
        answer: { type: 'set', value: [-2], vars: ['t'], solveFor: 't' },
        hints: ['Expand both squares before deciding what kind of equation this is.', '$t^2 - 8t + 16 = t^2 + 8t + 16 + 32$ — the $t^2$ terms cancel, so it is only linear.'],
        solution: [{ text: 'Expand both sides.', math: 't^2 - 8t + 16 = t^2 + 8t + 48' }, { text: 'The $t^2$ cancels from both sides.', math: '-8t + 16 = 8t + 48 \\Rightarrow -16t = 32 \\Rightarrow t = -2' }] },
      { id: '1.5-e19', prompt: 'Solve $(2x - 5)^2 = 81$.',
        answer: { type: 'set', value: [-2, 7] },
        hints: ['It is already a square equal to a number — take the square root of both sides.', 'Remember **both** signs: $2x - 5 = 9$ or $2x - 5 = -9$.'],
        solution: [{ math: '2x - 5 = \\pm 9', text: 'Square-root both sides, keeping both signs.' }, { math: '2x = 14 \\Rightarrow x = 7 \\qquad 2x = -4 \\Rightarrow x = -2', text: 'Solve each case.' }] },
      { id: '1.5-e20', prompt: 'Solve $x^2 - 6x + 11 = 0$ by completing the square.',
        answer: { type: 'set', value: [] },
        hints: ['Half of $-6$ is $-3$, and $(-3)^2 = 9$.', 'You reach $(x - 3)^2 = -2$. Can a square be negative?'],
        solution: [{ math: 'x^2 - 6x + 9 = -11 + 9 \\Rightarrow (x-3)^2 = -2', text: 'Complete the square.' }, { text: 'A square is never negative, so there is **no real solution**: $S = \\varnothing$.' }] },
      { id: '1.5-e21', prompt: 'Solve $3x^2 - 12x + 5 = 0$ by completing the square. Give exact answers. (Hint: divide by $3$ first.)',
        answer: { type: 'set', value: [2 - Math.sqrt(21) / 3, 2 + Math.sqrt(21) / 3], display: '\\{2 - \\tfrac{\\sqrt{21}}{3},\\ 2 + \\tfrac{\\sqrt{21}}{3}\\}' },
        hints: ['Divide every term by $3$: $x^2 - 4x + \\tfrac53 = 0$.', 'Then $x^2 - 4x = -\\tfrac53$; half of $-4$ is $-2$, so add $4$ to both sides.', '$(x-2)^2 = 4 - \\tfrac53 = \\tfrac73$.'],
        solution: [{ text: 'Divide through by $3$ so the $x^2$ has coefficient 1.', math: 'x^2 - 4x + \\tfrac53 = 0 \\Rightarrow x^2 - 4x = -\\tfrac53' }, { text: 'Add $(-2)^2 = 4$ to both sides.', math: '(x - 2)^2 = 4 - \\tfrac53 = \\tfrac73' }, { text: 'Square-root both sides.', math: 'x = 2 \\pm \\sqrt{\\tfrac73} = 2 \\pm \\tfrac{\\sqrt{21}}{3}' }] },
      { id: '1.5-e22', prompt: 'Solve $\\sqrt{2x - 1} = \\sqrt{3x - 5}$.',
        answer: { type: 'set', value: [4], extraneousHint: true },
        hints: ['Both sides are roots — squaring removes both at once.', '$2x - 1 = 3x - 5$.'],
        solution: [{ math: '2x - 1 = 3x - 5 \\Rightarrow x = 4', text: 'Square both sides.' }, { text: 'Check: both insides are $7 \\ge 0$ and $\\sqrt7 = \\sqrt7$ ✓.' }] },
      { id: '1.5-e23', prompt: 'Solve $x - 5\\sqrt{x} + 6 = 0$.',
        answer: { type: 'set', value: [4, 9] },
        hints: ['Let $u = \\sqrt{x}$, so $x = u^2$: the equation becomes $u^2 - 5u + 6 = 0$.', '$(u-2)(u-3) = 0$, so $\\sqrt x = 2$ or $\\sqrt x = 3$. Now square to get $x$.'],
        solution: [{ text: 'Substitute $u = \\sqrt{x}$.', math: 'u^2 - 5u + 6 = 0 \\Rightarrow (u - 2)(u - 3) = 0' }, { text: 'Translate back and square (both values are positive, so both are allowed).', math: '\\sqrt x = 2 \\Rightarrow x = 4, \\qquad \\sqrt x = 3 \\Rightarrow x = 9' }] }
    ],

    generators: [
      { id: '1.5-g-linear', title: 'Linear equations with brackets', desc: 'Expand, collect, divide.',
        make(r) {
          const sol = r.int(-6, 6);
          const a = r.pick([2, 3, 4, 5]), b = r.nz(-5, 5), c = r.pick([2, 3]), e = r.pick([1, 2, 3]);
          // a(x + b) = c(d - e x) + f  with chosen solution: pick d, then f to make it work
          const d = r.int(-5, 5);
          const f = a * (sol + b) - c * (d - e * sol);
          const lhs = a + '(' + lin(1, b) + ')', rhs = c + '(' + M.polyTex([-e, d]) + ')' + (f === 0 ? '' : ' ' + M.signed(f));
          const L = [a, a * b], R = [-c * e, c * d + f];
          return { prompt: 'Solve $' + lhs + ' = ' + rhs + '$.', answer: { type: 'set', value: [sol] },
            hints: ['Expand both sides.', 'Left: $' + M.polyTex(L) + '$. Right: $' + M.polyTex(R) + '$. Now move the $x$ terms to one side.'],
            solution: [{ math: M.polyTex(L) + ' = ' + M.polyTex(R), text: 'Expand.' }, { math: (L[0] - R[0]) + 'x = ' + (R[1] - L[1]) + ' \\Rightarrow x = ' + sol, text: 'Collect the $x$ terms on the left and numbers on the right, then divide.' }] };
        } },
      { id: '1.5-g-literal', title: 'Solve for a letter', desc: 'Formulas with several variables.',
        make(r) {
          const items = [
            { eq: 'P = 2l + 2w', v: 'w', vars: ['P', 'l'], ans: '(P - 2l)/2', tex: '\\frac{P - 2l}{2}', steps: ['2w = P - 2l', 'w = \\frac{P - 2l}{2}'] },
            { eq: 'A = \\tfrac{1}{2}bh', v: 'h', vars: ['A', 'b'], ans: '2A/b', tex: '\\frac{2A}{b}', steps: ['2A = bh', 'h = \\frac{2A}{b}'] },
            { eq: 'F = \\tfrac{9}{5}C + 32', v: 'C', vars: ['F'], ans: '5(F - 32)/9', tex: '\\frac{5(F - 32)}{9}', steps: ['F - 32 = \\tfrac95 C', 'C = \\tfrac59(F - 32)'] },
            { eq: 'V = lwh', v: 'w', vars: ['V', 'l', 'h'], ans: 'V/(lh)', tex: '\\frac{V}{lh}', steps: ['w = \\frac{V}{lh}'] },
            { eq: 'S = 2\\pi r^2 + 2\\pi rh', v: 'h', vars: ['S', 'r'], ans: '(S - 2pi r^2)/(2pi r)', tex: '\\frac{S - 2\\pi r^2}{2\\pi r}', steps: ['2\\pi rh = S - 2\\pi r^2', 'h = \\frac{S - 2\\pi r^2}{2\\pi r}'] },
            { eq: 'a = \\dfrac{v - u}{t}', v: 'u', vars: ['a', 'v', 't'], ans: 'v - at', tex: 'v - at', steps: ['at = v - u', 'u = v - at'] },
            { eq: 'A = 2lw + 2wh + 2lh', v: 'l', vars: ['A', 'w', 'h'], ans: '(A - 2wh)/(2w + 2h)', tex: '\\frac{A - 2wh}{2w + 2h}', steps: ['2lw + 2lh = A - 2wh', 'l(2w + 2h) = A - 2wh', 'l = \\frac{A - 2wh}{2w + 2h}'] },
            { eq: 'y = \\dfrac{x + 1}{x - 1}', v: 'x', vars: ['y'], ans: '(y + 1)/(y - 1)', tex: '\\frac{y + 1}{y - 1}', steps: ['y(x - 1) = x + 1', 'xy - y = x + 1', 'xy - x = y + 1', 'x(y - 1) = y + 1', 'x = \\frac{y + 1}{y - 1}'] },
            { eq: 'm = \\dfrac{ab}{a + b}', v: 'a', vars: ['m', 'b'], ans: 'mb/(b - m)', tex: '\\frac{mb}{b - m}', steps: ['m(a + b) = ab', 'ma + mb = ab', 'ab - ma = mb', 'a(b - m) = mb', 'a = \\frac{mb}{b - m}'] }
          ];
          const it = r.pick(items);
          return { prompt: 'Solve $' + it.eq + '$ for $' + it.v + '$.', answer: { type: 'expression', value: it.ans, solveFor: it.v, vars: it.vars, display: it.tex },
            hints: ['Treat every other letter as a known number.', it.steps.length > 2 ? 'Get every term containing $' + it.v + '$ on one side, then factor $' + it.v + '$ out.' : 'Undo what has been done to $' + it.v + '$, one step at a time.'],
            solution: it.steps.map((s, i) => ({ text: i === it.steps.length - 1 ? 'Divide to finish.' : 'Rearrange.', math: s })) };
        } },
      { id: '1.5-g-factor', title: 'Quadratics by factoring', desc: 'Set equal to zero, factor, zero-product rule.',
        make(r) {
          const p = r.nz(-7, 7), q = r.nz(-7, 7);
          if (p === q) return this.make(r);
          const a = r.pick([1, 1, 1, 2, 3]);
          const coeffs = M.polyMul([a, p], [1, q]);
          const roots = [-p / a, -q].sort((x, y) => x - y);
          const moved = r.bool(0.35);
          const k = moved ? r.nz(-6, 6) : 0;
          const lhs = moved ? M.polyTex([coeffs[0], coeffs[1], coeffs[2] + k]) : M.polyTex(coeffs);
          const rhs = moved ? String(k) : '0';
          return { prompt: 'Solve $' + lhs + ' = ' + rhs + '$.', answer: { type: 'set', value: roots, display: setTex(roots.map(x => CH.C.fmtTex(x))) },
            hints: [moved ? 'First move the $' + k + '$ across so the right side is $0$.' : 'Factor the left side.', 'It factors as $' + paren(lin(a, p)) + paren(lin(1, q)) + '$.'],
            solution: [moved ? { math: M.polyTex(coeffs) + ' = 0', text: 'Get zero on one side.' } : { text: 'The right side is already $0$.' }, { math: paren(lin(a, p)) + paren(lin(1, q)) + ' = 0', text: 'Factor.' }, { math: lin(a, p) + ' = 0 \\text{ or } ' + lin(1, q) + ' = 0 \\Rightarrow S = ' + setTex(roots.map(x => CH.C.fmtTex(x))), text: 'Zero-product rule.' }] };
        } },
      { id: '1.5-g-complete', title: 'Completing the square', desc: 'Exact answers with square roots.',
        make(r) {
          const variant = r.pick(['monic', 'monic', 'monic', 'noreal', 'lead']);
          if (variant === 'noreal') {
            // (x - h)^2 = -q, which cannot happen
            const h = r.nz(-5, 5), q = r.int(1, 9);
            const b = -2 * h, c = h * h + q;
            return { prompt: 'Solve $' + M.polyTex([1, b, c]) + ' = 0$ by completing the square.',
              answer: { type: 'set', value: [] },
              hints: ['Move the constant across: $x^2 ' + M.signed(b) + 'x = ' + (-c) + '$.', 'Half of $' + b + '$ is $' + (-h) + '$; add $' + (h * h) + '$ to both sides. What do you get on the right?'],
              solution: [{ text: 'Complete the square.', math: 'x^2 ' + M.signed(b) + 'x + ' + (h * h) + ' = ' + (-c) + ' + ' + (h * h) + ' \\Rightarrow ' + paren(lin(1, -h)) + '^2 = ' + (-q) },
                { text: 'A square can never be negative, so there is **no real solution**.', math: 'S = \\varnothing' }] };
          }
          if (variant === 'lead') {
            // a x^2 + b x + c = 0 that needs dividing by a first; (x - h)^2 = m/a
            const a = r.pick([2, 3, 5]), h = r.nz(-4, 4), m = r.pick([1, 2, 3, 5, 6, 7, 10, 11]);
            if (m % a === 0) return this.make(r);
            const b = -2 * a * h, c = a * h * h - m;
            const roots = [h - Math.sqrt(m / a), h + Math.sqrt(m / a)];
            const s = M.sqrtSimplify(m * a);            // sqrt(m/a) = sqrt(ma)/a
            const g = M.gcd(s.coef, a);
            const rootTex = (s.coef / g === 1 ? '' : s.coef / g) + '\\sqrt{' + s.rad + '}' + (a / g === 1 ? '' : '/' + (a / g));
            const disp = a / g === 1 ? (s.coef / g === 1 ? '\\sqrt{' + s.rad + '}' : (s.coef / g) + '\\sqrt{' + s.rad + '}') : '\\tfrac{' + (s.coef / g === 1 ? '' : s.coef / g) + '\\sqrt{' + s.rad + '}}{' + (a / g) + '}';
            return { prompt: 'Solve $' + M.polyTex([a, b, c]) + ' = 0$ by completing the square. Give exact answers. (Hint: divide by $' + a + '$ first.)',
              answer: { type: 'set', value: roots, display: '\\{' + h + ' - ' + disp + ',\\ ' + h + ' + ' + disp + '\\}' },
              hints: ['Divide every term by $' + a + '$ so the $x^2$ has coefficient $1$.', 'You get $x^2 ' + M.signed(-2 * h) + 'x = ' + M.fracTex(m - a * h * h, a) + '$; now add $' + (h * h) + '$ to both sides.', '$' + paren(lin(1, -h)) + '^2 = ' + M.fracTex(m, a) + '$.'],
              solution: [{ text: 'Divide through by $' + a + '$.', math: 'x^2 ' + M.signed(-2 * h) + 'x ' + M.signed(0) + ' = ' + M.fracTex(m - a * h * h, a) },
                { text: 'Add $' + (h * h) + '$ to both sides to complete the square.', math: paren(lin(1, -h)) + '^2 = ' + M.fracTex(m, a) },
                { text: 'Square-root both sides and simplify.', math: 'x = ' + h + ' \\pm ' + disp }] };
          }
          const h = r.nz(-5, 5), q = r.pick([2, 3, 5, 6, 7, 8, 10, 12]); // (x - h)^2 = q
          const b = -2 * h, c = h * h - q;
          const roots = [h - Math.sqrt(q), h + Math.sqrt(q)];
          const s = M.sqrtSimplify(q);
          const rootTex = sq(q);
          return { prompt: 'Solve $' + M.polyTex([1, b, c]) + ' = 0$ by completing the square. Give exact answers.', answer: { type: 'set', value: roots, display: '\\{' + h + ' - ' + rootTex + ',\\ ' + h + ' + ' + rootTex + '\\}' },
            hints: ['Move the constant to the right: $x^2 ' + M.signed(b) + 'x = ' + (-c) + '$.', 'Half of $' + b + '$ is $' + (-h) + '$; add $(' + (-h) + ')^2 = ' + (h * h) + '$ to both sides.'],
            solution: [{ math: 'x^2 ' + M.signed(b) + 'x + ' + (h * h) + ' = ' + (-c) + ' + ' + (h * h), text: 'Add $' + (h * h) + '$ to both sides.' }, { math: paren(lin(1, -h)) + '^2 = ' + q, text: 'The left side is a perfect square.' }, { math: lin(1, -h) + ' = \\pm' + rootTex + ' \\Rightarrow x = ' + h + ' \\pm ' + rootTex, text: 'Square-root both sides' + (s.coef > 1 ? ' and simplify $\\sqrt{' + q + '} = ' + rootTex + '$' : '') + '.' }] };
        } },
      { id: '1.5-g-formula', title: 'The quadratic formula', desc: 'Identify a, b, c; compute D; simplify the root.',
        make(r) {
          const a = r.pick([1, 1, 2, 3]), b = r.nz(-7, 7), c = r.nz(-6, 6);
          const D = b * b - 4 * a * c;
          if (D <= 0 || M.isPerfectSquare(D)) return this.make(r);
          const roots = [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)];
          const s = M.sqrtSimplify(D);
          const g = M.gcd(M.gcd(Math.abs(b), s.coef), 2 * a);
          const disp = g > 1 ? '\\frac{' + (-b / g) + ' \\pm ' + (s.coef / g === 1 ? '' : s.coef / g) + '\\sqrt{' + s.rad + '}}{' + (2 * a / g) + '}' : '\\frac{' + (-b) + ' \\pm ' + sq(D) + '}{' + (2 * a) + '}';
          const disp2 = (2 * a / g === 1) ? (-b / g) + ' \\pm ' + (s.coef / g === 1 ? '' : s.coef / g) + '\\sqrt{' + s.rad + '}' : disp;
          return { prompt: 'Solve $' + M.polyTex([a, b, c]) + ' = 0$ using the quadratic formula. Give exact, simplified answers.', answer: { type: 'set', value: roots, display: 'x = ' + disp2 },
            hints: ['$a = ' + a + '$, $b = ' + b + '$, $c = ' + c + '$.', '$D = b^2 - 4ac = ' + D + '$' + (s.coef > 1 ? ', and $\\sqrt{' + D + '} = ' + sq(D) + '$.' : '.')],
            solution: [{ math: 'D = (' + b + ')^2 - 4(' + a + ')(' + c + ') = ' + D, text: 'Discriminant first: positive, so two solutions.' }, { math: 'x = \\frac{' + (-b) + ' \\pm \\sqrt{' + D + '}}{' + (2 * a) + '}', text: 'Substitute into the formula.' }, { math: 'x = ' + disp2, text: (s.coef > 1 ? 'Simplify $\\sqrt{' + D + '} = ' + sq(D) + '$' : 'Simplify') + (g > 1 ? ' and cancel the common factor $' + g + '$.' : '.') }] };
        } },
      { id: '1.5-g-discriminant', title: 'How many solutions?', desc: 'Use the discriminant without solving.',
        make(r) {
          const kind = r.pick(['two', 'one', 'none']);
          let a = r.pick([1, 2, 3, 4, 5]), b, c;
          if (kind === 'one') { const k = r.nz(-4, 4); const sgn = r.sign(); // (sqrt(a) x + k)^2: a must be a perfect square
            a = r.pick([1, 4, 9]); b = 2 * Math.sqrt(a) * k * sgn; c = k * k; }
          else { b = r.nz(-7, 7); c = r.nz(-7, 7); const D = b * b - 4 * a * c; if ((kind === 'two' && D <= 0) || (kind === 'none' && D >= 0)) return this.make(r); }
          const D = b * b - 4 * a * c;
          const ans = D > 0 ? 'two' : D === 0 ? 'one' : 'none';
          return { prompt: 'Without solving, how many real solutions does $' + M.polyTex([a, b, c]) + ' = 0$ have?', answer: { type: 'choice', value: ans, options: [{ id: 'two', label: 'Two' }, { id: 'one', label: 'Exactly one' }, { id: 'none', label: 'None' }], wrongMessage: 'Compute $D = b^2 - 4ac$ and check its sign.' },
            hints: ['$D = b^2 - 4ac$ with $a = ' + a + '$, $b = ' + b + '$, $c = ' + c + '$.'],
            solution: ['$D = (' + b + ')^2 - 4(' + a + ')(' + c + ') = ' + D + '$, which is ' + (D > 0 ? 'positive: two real solutions.' : D === 0 ? 'zero: exactly one real solution.' : 'negative: no real solutions.')] };
        } },
      { id: '1.5-g-quadtype', title: 'Equations of quadratic type', desc: 'Substitute u for the smaller power.',
        make(r) {
          const kind = r.pick(['x4', 'x4', 'cube', 'sqrt']);
          if (kind === 'sqrt') {
            // x - (p+q)sqrt(x) + pq = 0, with u = sqrt(x); p, q > 0 so both roots survive
            const p = r.int(1, 5), q = r.int(1, 6);
            if (p === q) return this.make(r);
            const b = -(p + q), c = p * q;
            const roots = [p * p, q * q].sort((a, b2) => a - b2);
            return { prompt: 'Solve $x ' + M.signed(b) + '\\sqrt{x} ' + M.signed(c) + ' = 0$.',
              answer: { type: 'set', value: roots },
              hints: ['Let $u = \\sqrt{x}$. Since $x = u^2$, the equation becomes $' + M.polyTex([1, b, c], 'u') + ' = 0$.', 'It factors as $(u - ' + p + ')(u - ' + q + ') = 0$, so $\\sqrt{x} = ' + p + '$ or $\\sqrt{x} = ' + q + '$. Now square.'],
              solution: [{ text: 'Substitute $u = \\sqrt{x}$ and factor.', math: M.polyTex([1, b, c], 'u') + ' = (u - ' + p + ')(u - ' + q + ') = 0' },
                { text: 'Both values are positive, so both are allowed square roots. Square to get $x$.', math: '\\sqrt{x} = ' + p + ' \\Rightarrow x = ' + (p * p) + ', \\qquad \\sqrt{x} = ' + q + ' \\Rightarrow x = ' + (q * q) }] };
          }
          if (kind === 'x4') {
            const p = r.pick([1, 4, 9, 16]), q = r.pick([1, 2, 3, 5, 6, 7]); // (x^2 - p)(x^2 + q)
            const coeffs = M.polyMul([1, 0, -p], [1, 0, q]);
            const s = Math.sqrt(p);
            return { prompt: 'Solve $' + M.polyTex(coeffs) + ' = 0$.', answer: { type: 'set', value: [-s, s] },
              hints: ['Let $u = x^2$: $u^2 ' + M.signed(coeffs[2]) + 'u ' + M.signed(coeffs[4]) + ' = 0$.', 'It factors as $(u - ' + p + ')(u + ' + q + ')$. Only $u = ' + p + '$ can equal $x^2$.'],
              solution: [{ math: '(x^2 - ' + p + ')(x^2 + ' + q + ') = 0', text: 'Factor as a quadratic in $x^2$.' }, { math: 'x^2 = ' + p + ' \\Rightarrow x = \\pm ' + s + ' \\qquad (x^2 = -' + q + ' \\text{ is impossible})', text: 'Translate back to $x$.' }] };
          }
          const p = r.pick([1, 2, 3, 4]), q = r.pick([-1, -2, -3, 1, 2, 3].filter(x => x !== p)); // (u - p)(u - q), u = x^{1/3}
          const b = -(p + q), c = p * q;
          return { prompt: 'Solve $x^{2/3} ' + M.signed(b) + 'x^{1/3} ' + M.signed(c) + ' = 0$.', answer: { type: 'set', value: [p * p * p, q * q * q].sort((x, y) => x - y) },
            hints: ['Let $u = x^{1/3}$, so $x^{2/3} = u^2$.', 'Factor: $(u - ' + p + ')(u ' + M.signed(-q) + ') = 0$. Then cube each value of $u$.'],
            solution: [{ math: 'u^2 ' + M.signed(b) + 'u ' + M.signed(c) + ' = 0 \\Rightarrow (u - ' + p + ')(u ' + M.signed(-q) + ') = 0', text: 'Substitute $u = x^{1/3}$ and factor.' }, { math: 'x^{1/3} = ' + p + ' \\Rightarrow x = ' + (p * p * p) + ' \\qquad x^{1/3} = ' + q + ' \\Rightarrow x = ' + (q * q * q), text: 'Cube to get back to $x$.' }] };
        } },
      { id: '1.5-g-fraction', title: 'Equations with fractions', desc: 'Multiply through by the LCD.',
        make(r) {
          const a = r.int(1, 6), b = r.int(1, 6), p = r.nz(-5, 5), q = r.nz(-5, 5);
          if (a === b || p === q) return this.make(r);
          // a/(x+p) = b/(x+q)  ->  a(x+q) = b(x+p) -> x(a-b) = bp - aq
          const sol = (b * p - a * q) / (a - b);
          if (sol === -p || sol === -q) return this.make(r);
          const f = M.frac(b * p - a * q, a - b);
          return { prompt: 'Solve $\\dfrac{' + a + '}{' + lin(1, p) + '} = \\dfrac{' + b + '}{' + lin(1, q) + '}$.', answer: { type: 'set', value: [sol], display: '\\{' + M.fracTex(f.n, f.d) + '\\}' },
            hints: ['Multiply both sides by $(' + lin(1, p) + ')(' + lin(1, q) + ')$ — or cross-multiply.', '$' + a + '(' + lin(1, q) + ') = ' + b + '(' + lin(1, p) + ')$'],
            solution: [{ math: a + '(' + lin(1, q) + ') = ' + b + '(' + lin(1, p) + ')', text: 'Clear the fractions.' }, { math: M.polyTex([a, a * q]) + ' = ' + M.polyTex([b, b * p]) + ' \\Rightarrow ' + (a - b) + 'x = ' + (b * p - a * q) + ' \\Rightarrow x = ' + M.fracTex(f.n, f.d), text: 'Expand and solve. Check it does not make a denominator zero: fine.' }] };
        } },
      { id: '1.5-g-sqrtboth', title: 'Square-root method and root = root', desc: '(ax+b)^2 = c, and equations with a root on each side.',
        make(r) {
          if (r.bool(0.5)) {
            const a = r.pick([1, 1, 2, 3]), b = r.nz(-9, 9), c = r.pick([1, 4, 9, 16, 25, 36, 49, 81]);
            const k = Math.sqrt(c);
            const roots = [(-b - k) / a, (-b + k) / a].sort((x, y) => x - y);
            return { prompt: 'Solve $' + paren(lin(a, b)) + '^2 = ' + c + '$.',
              answer: { type: 'set', value: roots, display: setTex(roots.map(x => CH.C.fmtTex(x))) },
              hints: ['It is already a square equal to a number — square-root both sides.', 'Keep **both** signs: $' + lin(a, b) + ' = ' + k + '$ or $' + lin(a, b) + ' = -' + k + '$.'],
              solution: [{ text: 'Square-root both sides, keeping both signs.', math: lin(a, b) + ' = \\pm ' + k },
                { text: 'Solve each case.', math: 'x = ' + CH.C.fmtTex(roots[0]) + ' \\quad\\text{or}\\quad x = ' + CH.C.fmtTex(roots[1]) }] };
          }
          // sqrt(ax + b) = sqrt(cx + d), meeting at x = s with both insides >= 0
          const a = r.pick([2, 3, 4]), c = r.pick([1, 5, 6, 7].filter(x => x !== a)), s = r.int(1, 6);
          const b = r.int(-3, 3), d = (a - c) * s + b;
          if (a * s + b < 0) return this.make(r);
          return { prompt: 'Solve $\\sqrt{' + lin(a, b) + '} = \\sqrt{' + lin(c, d) + '}$.',
            answer: { type: 'set', value: [s], extraneousHint: true },
            hints: ['Both sides are square roots — squaring removes both at once.', 'That leaves the linear equation $' + lin(a, b) + ' = ' + lin(c, d) + '$.'],
            solution: [{ text: 'Square both sides.', math: lin(a, b) + ' = ' + lin(c, d) },
              { text: 'Solve, then check both insides come out $\\ge 0$.', math: 'x = ' + s + ' \\quad (\\text{both sides give } \\sqrt{' + (a * s + b) + '}\\ \\checkmark)' }] };
        } },
      { id: '1.5-g-radical', title: 'Radical equations', desc: 'Isolate, square, solve, check for extraneous solutions.',
        make(r) {
          // sqrt(x + m) = x - k, true root s with s > k; other root s' = 2k + 1 - s
          const k = r.int(-3, 4), s = k + r.int(1, 4);
          const m = (s - k) * (s - k) - s;
          const s2 = 2 * k + 1 - s;
          const extraneous = s2 - k < 0;
          const sol = extraneous ? [s] : [s, s2].sort((x, y) => x - y);
          const inside = lin(1, m), rhs = lin(1, -k);
          const quad = M.polyTex([1, -(2 * k + 1), k * k - m]);
          return { prompt: 'Solve $\\sqrt{' + inside + '} = ' + rhs + '$.', answer: { type: 'set', value: sol, extraneousHint: true },
            hints: ['The root is already alone. Square both sides — remember $(' + rhs + ')^2$ has three terms.', 'You should get $' + quad + ' = 0$, with candidates $' + s + '$ and $' + s2 + '$. **Check both** in the original.'],
            solution: [{ math: inside + ' = ' + M.polyTex(M.polyMul([1, -k], [1, -k])), text: 'Square both sides.' }, { math: quad + ' = 0 \\Rightarrow (x - ' + s + ')(x ' + M.signed(-s2) + ') = 0', text: 'Rearrange and factor.' },
              { text: 'Check $x = ' + s + '$: $\\sqrt{' + (s + m) + '} = ' + (s - k) + '$ and $' + s + ' - ' + k + ' = ' + (s - k) + '$ ✓. Check $x = ' + s2 + '$: $\\sqrt{' + (s2 + m) + '} = ' + Math.abs(s2 - k) + '$ but $' + rhs.replace('x', '(' + s2 + ')') + ' = ' + (s2 - k) + '$ ' + (extraneous ? '✗ — extraneous, reject it.' : '✓.') + ' So $S = ' + setTex(sol) + '$.' }] };
        } },
      { id: '1.5-g-abs', title: 'Absolute value equations', desc: 'Two cases — or none.',
        make(r) {
          const a = r.pick([1, 2, 3, 4]), b = r.nz(-9, 9), c = r.pick([-4, 0, 1, 2, 3, 5, 6, 7, 8]);
          const sols = c < 0 ? [] : c === 0 ? [-b / a] : [(c - b) / a, (-c - b) / a].sort((x, y) => x - y);
          return { prompt: 'Solve $|' + lin(a, b) + '| = ' + c + '$.', answer: { type: 'set', value: sols, display: setTex(sols.map(x => CH.C.fmtTex(x))) },
            hints: [c < 0 ? 'Can an absolute value be negative?' : 'Split into two cases: $' + lin(a, b) + ' = ' + c + '$ or $' + lin(a, b) + ' = -' + c + '$.'],
            solution: c < 0 ? ['An absolute value is never negative, so $S = \\varnothing$.'] : [{ math: lin(a, b) + ' = ' + c + ' \\Rightarrow x = ' + CH.C.fmtTex((c - b) / a) + ' \\qquad ' + lin(a, b) + ' = ' + (-c) + ' \\Rightarrow x = ' + CH.C.fmtTex((-c - b) / a), text: 'Solve both cases.' + (c === 0 ? ' (Both give the same value.)' : '') }] };
        } }
    ]
  });
})();
