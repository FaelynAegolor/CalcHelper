/* Past paper: Math 091 Pre-Calculus, first exam (version 4).
   This copy came back with handwritten working rather than an official key, and two
   of those handwritten answers do not check out. The `note` on those questions says
   which, and why — so the working on the paper can still be read without being
   quietly trusted. */
CH.registerExam({
  id: 'mid4',
  title: 'First exam — version 4',
  blurb: 'Seven long questions and six multiple choice. The copy has handwritten working; two answers on it are wrong.',
  questions: [
    {
      id: 'mid4-q1', part: 1, marks: 10, topic: '1.2',
      prompt: '**Q1.** Simplify $\\left(\\dfrac{2x}{y^{-2}}\\right)^{-3}\\left(\\dfrac{8y^{-6}}{x^{-12}}\\right)^{1/3}$.',
      answer: { type: 'expression', value: 'x/(4*y^8)', vars: ['x', 'y'], form: 'positive-exponents' },
      note: 'The handwritten working on this paper finishes at $\\tfrac{4x}{y^8}$. That is not right — the $2^{-3}$ gives $\\tfrac18$ on the bottom and the cube root gives $2$ on the top, so the numbers come to $\\tfrac28 = \\tfrac14$, not $4$. The correct answer is $\\tfrac{x}{4y^8}$.',
      hints: [
        'Tidy inside each bracket first. A negative power on the bottom moves up to the top: $\\dfrac{2x}{y^{-2}} = 2xy^2$.',
        'A power of $-3$ means flip the whole thing over, then cube: $(2xy^2)^{-3} = \\dfrac{1}{8x^3y^6}$.',
        'For the second, $\\dfrac{8y^{-6}}{x^{-12}} = 8x^{12}y^{-6}$, and a power of $\\tfrac13$ is a cube root: $2x^4y^{-2}$.',
        'Multiply and collect. The numbers give $\\tfrac{2}{8} = \\tfrac14$ — check that part carefully.'
      ],
      solution: [
        { text: 'Tidy inside the first bracket, then apply the $-3$.', math: '\\left(2xy^2\\right)^{-3} = \\frac{1}{8x^3y^6}' },
        { text: 'Tidy inside the second, then take the cube root.', math: '\\left(8x^{12}y^{-6}\\right)^{1/3} = 2x^4y^{-2}' },
        { text: 'Multiply the two.', math: '\\frac{1}{8x^3y^6}\\cdot\\frac{2x^4}{y^2} = \\frac{2x^4}{8x^3y^8}' },
        { text: 'Cancel: $\\tfrac28 = \\tfrac14$ and $x^4/x^3 = x$.', math: '= \\frac{x}{4y^8}' }
      ],
      answerText: '$\\dfrac{x}{4y^8}$',
      checklist: ['Tidy inside each bracket before using the outside power.', 'A negative outside power flips the whole fraction.', 'A power of $\\tfrac13$ is a cube root — of the number as well.', 'Do the numbers separately and carefully at the end.']
    },
    {
      id: 'mid4-q2', part: 1, marks: 15, topic: '1.4',
      prompt: '**Q2.** Simplify completely: $\\dfrac{x^2+x-6}{x^2-4} \\div \\dfrac{x^2-2x+4}{x^3+8}$.',
      answer: { type: 'expression', value: 'x+3', vars: ['x'] },
      hints: [
        'Flip the second fraction and multiply first.',
        'Factor everything. The one to spot is $x^3+8$, which is a **sum of cubes**: $(x+2)(x^2-2x+4)$.',
        'Also $x^2+x-6=(x+3)(x-2)$ and $x^2-4=(x-2)(x+2)$.',
        'Now almost everything cancels — the $(x^2-2x+4)$ goes, and so do $(x-2)$ and $(x+2)$.'
      ],
      solution: [
        { text: 'Flip and multiply.', math: '\\frac{x^2+x-6}{x^2-4}\\cdot\\frac{x^3+8}{x^2-2x+4}' },
        { text: 'Factor everything, using the sum of cubes on $x^3+8$.', math: '= \\frac{(x+3)(x-2)}{(x-2)(x+2)}\\cdot\\frac{(x+2)(x^2-2x+4)}{x^2-2x+4}' },
        { text: 'Cancel $(x-2)$, $(x+2)$ and $(x^2-2x+4)$.', math: '= x+3' }
      ],
      answerText: '$x+3$',
      checklist: ['Flip the second fraction and multiply.', 'Factor everything — watch for a sum or difference of cubes.', 'Cancel whole brackets.', 'Check whether anything is left on the bottom at all.']
    },
    {
      id: 'mid4-q3a', part: 1, marks: 7, topic: '1.3',
      prompt: '**Q3(a).** Factor completely: $3x^3 - 6x^2 + 8x - 16$.',
      answer: { type: 'expression', value: '(x-2)*(3*x^2+8)', vars: ['x'], form: 'factored' },
      hints: [
        'Four terms, nothing common to all four — group them into two pairs.',
        'Pair as $(3x^3-6x^2)$ and $(8x-16)$. Factor each so the same bracket appears twice.',
        'The first gives $3x^2(x-2)$ and the second gives $8(x-2)$.',
        'Take out $(x-2)$. Check whether $3x^2+8$ factors further — it does not, because it is a **sum** of squares.'
      ],
      solution: [
        { text: 'Split into pairs.', math: '(3x^3 - 6x^2) + (8x - 16)' },
        { text: 'Factor each pair.', math: '3x^2(x-2) + 8(x-2)' },
        { text: 'Take out the common bracket.', math: '= (x-2)(3x^2+8)' },
        { text: '$3x^2+8$ is a sum, not a difference, so it does not factor any further.' }
      ],
      answerText: '$(x-2)(3x^2+8)$',
      checklist: ['Four terms means try grouping.', 'Factor each pair so the brackets match.', 'Pull out the common bracket.', 'A **sum** of squares does not factor — stop there.']
    },
    {
      id: 'mid4-q3b', part: 1, marks: 8, topic: '1.3',
      prompt: '**Q3(b).** Factor completely: $2x^{1/2} - 5x^{-1/2} - 3x^{-3/2}$.',
      answer: { type: 'expression', value: '(2*x+1)*(x-3)/x^(3/2)', vars: ['x'] },
      hints: [
        'Even with fractional powers, the rule is the same: take out the common factor first. Which power is the **smallest**?',
        'The smallest is $x^{-3/2}$, so take that out of every term.',
        'Dividing by $x^{-3/2}$ means **adding** $\\tfrac32$ to each power: $x^{1/2}\\to x^2$, $x^{-1/2}\\to x$, $x^{-3/2}\\to x^0=1$.',
        'That leaves $x^{-3/2}(2x^2-5x-3)$, and the bracket is an ordinary quadratic.'
      ],
      solution: [
        { text: 'Take out the smallest power, $x^{-3/2}$. Each remaining power goes up by $\\tfrac32$.', math: 'x^{-3/2}\\left(2x^2 - 5x - 3\\right)' },
        { text: 'Factor the quadratic: $a\\times c = -6$, and $-6$ and $1$ multiply to $-6$ and add to $-5$.', math: '2x^2-5x-3 = (2x+1)(x-3)' },
        { text: 'Write the negative power as a bottom.', math: '= \\frac{(2x+1)(x-3)}{x^{3/2}}' }
      ],
      answerText: '$\\dfrac{(2x+1)(x-3)}{x^{3/2}}$',
      checklist: ['Take out the smallest power, even when it is negative or fractional.', 'Dividing by a negative power adds to each remaining power.', 'Factor the ordinary quadratic that is left.', 'Write the negative power as a denominator at the end.']
    },
    {
      id: 'mid4-q4', part: 1, marks: 10, topic: '1.5',
      prompt: '**Q4.** Find the solutions of $3x^2 - 6x + 2 = 0$ and simplify.',
      answer: { type: 'set', value: [1 + Math.sqrt(3) / 3, 1 - Math.sqrt(3) / 3], vars: ['x'] },
      hints: [
        'Try factoring: two numbers multiplying to $3\\times2=6$ and adding to $-6$. None work, so use the formula.',
        'Write down $a=3$, $b=-6$, $c=2$, then $b^2-4ac = 36-24 = 12$.',
        '$\\sqrt{12} = 2\\sqrt3$, so $x = \\dfrac{6 \\pm 2\\sqrt3}{6}$.',
        'Every term divides by $2$: $x = \\dfrac{3\\pm\\sqrt3}{3}$, which is $1 \\pm \\dfrac{\\sqrt3}{3}$.'
      ],
      solution: [
        { text: 'Coefficients and discriminant.', math: 'a=3,\\ b=-6,\\ c=2; \\qquad D = 36-24 = 12' },
        { text: 'Substitute and simplify the root.', math: 'x = \\frac{6 \\pm \\sqrt{12}}{6} = \\frac{6 \\pm 2\\sqrt3}{6}' },
        { text: 'Divide every term by $2$.', math: '= \\frac{3 \\pm \\sqrt3}{3} = 1 \\pm \\frac{\\sqrt3}{3}' }
      ],
      answerText: '$x = 1 \\pm \\dfrac{\\sqrt3}{3}$',
      checklist: ['Try factoring first.', 'Write $a$, $b$, $c$, then $b^2-4ac$.', 'Simplify the square root.', 'Cancel the common factor from **every** term, not just some.']
    },
    {
      id: 'mid4-q5', part: 1, marks: 10, topic: '1.8',
      prompt: '**Q5.** Find the solution set of $x^2 + 4x + 3 \\ge 0$.',
      answer: { type: 'interval', value: '(-inf, -3] U [-1, inf)', vars: ['x'] },
      hints: [
        'Zero is already on one side, so factor the other side.',
        'Two numbers multiplying to $3$ and adding to $4$: that is $1$ and $3$, so $(x+1)(x+3)$.',
        'The zeros are $-3$ and $-1$. Test a point in each of the three regions.',
        'You want where it is **positive or zero**, so keep the outer two regions and include both endpoints.'
      ],
      solution: [
        { text: 'Factor.', math: '(x+1)(x+3) \\ge 0' },
        { text: 'The zeros are $-3$ and $-1$. Test: $x=-4$ gives $(-3)(-1)>0$; $x=-2$ gives $(-1)(1)<0$; $x=0$ gives $(1)(3)>0$.' },
        { text: 'Keep the positive regions, and include the endpoints because of the $\\ge$.', math: 'S = (-\\infty,-3] \\cup [-1,\\infty)' }
      ],
      answerText: '$S = (-\\infty,-3] \\cup [-1,\\infty)$',
      checklist: ['Get zero on one side and factor.', 'Find the zeros and mark them.', 'Test one point in each region.', 'Include the endpoints when the sign is $\\ge$.']
    },
    {
      id: 'mid4-q6', part: 1, marks: 10, topic: '1.10',
      prompt: '**Q6.** Find an equation of the line through $(-4,3)$ parallel to $7x-5y+1=0$. Write it in general form.',
      answer: { type: 'equation', value: '7*x - 5*y + 43 = 0', vars: ['x', 'y'], form: 'integer-coefficients' },
      hints: [
        'You have the point; the slope has to come from the given line. Rearrange it into $y = mx+b$.',
        '$7x-5y+1=0$ gives $5y = 7x+1$, so $y = \\tfrac75 x + \\tfrac15$ and the slope is $\\tfrac75$.',
        'Parallel means the same slope. Use $y-3 = \\tfrac75(x+4)$.',
        'General form means everything on one side equal to zero, with no fractions — multiply by $5$ first.'
      ],
      solution: [
        { text: 'Rearrange the given line to find its slope.', math: '5y = 7x+1 \\;\\Rightarrow\\; y = \\tfrac75x + \\tfrac15, \\qquad m = \\tfrac75' },
        { text: 'Same slope, through $(-4,3)$.', math: 'y - 3 = \\tfrac75(x+4)' },
        { text: 'Multiply by $5$.', math: '5y - 15 = 7x + 28' },
        { text: 'Collect onto one side.', math: '7x - 5y + 43 = 0' }
      ],
      answerText: '$7x - 5y + 43 = 0$',
      checklist: ['Rearrange the given line to read off its slope.', 'Parallel means the same slope.', 'Use $y-y_1=m(x-x_1)$ with the point.', 'Clear fractions, then collect to one side for general form.']
    },
    {
      id: 'mid4-q7', part: 1, marks: 12, topic: '1.9',
      prompt: '**Q7.** Find an equation of the circle centred at $(-3,2)$ and passing through $(0,-4)$.',
      answer: { type: 'equation', value: '(x+3)^2 + (y-2)^2 = 45', vars: ['x', 'y'] },
      hints: [
        'The radius is the distance from the centre to the point it passes through.',
        'Step across: $0-(-3) = 3$. Step down: $-4-2 = -6$.',
        'You need $r^2$, which is $3^2 + (-6)^2 = 9+36 = 45$ — no need to take the square root.',
        'Substitute the centre into $(x-h)^2+(y-k)^2=r^2$, minding the signs.'
      ],
      solution: [
        { text: 'The radius squared is the squared distance from the centre to the point.', math: 'r^2 = (0-(-3))^2 + (-4-2)^2 = 9 + 36 = 45' },
        { text: 'Substitute the centre $(-3,2)$.', math: '(x-(-3))^2 + (y-2)^2 = 45' },
        { text: 'Tidy the signs.', math: '(x+3)^2 + (y-2)^2 = 45' }
      ],
      answerText: '$(x+3)^2+(y-2)^2 = 45$',
      checklist: ['Radius = distance from centre to the given point.', 'Stop at $r^2$ — that is all the equation needs.', 'Substitute the centre into the standard form.', 'A negative coordinate becomes a plus inside the bracket.']
    },

    // --------------------------------------------------------------- Part II
    {
      id: 'mid4-q8', part: 2, marks: 3, topic: '1.1',
      prompt: '**Q8.** Express $0.\\overline{15}$ as a rational number.',
      answer: {
        type: 'choice', value: 'b',
        options: [{ id: 'a', label: '$\\dfrac{5}{30}$' }, { id: 'b', label: '$\\dfrac{5}{33}$' }, { id: 'c', label: '$\\dfrac{3}{20}$' }, { id: 'd', label: '$\\dfrac{3}{21}$' }],
        wrongMessage: 'Not quite. Two digits repeat, so multiply by $100$ and subtract.'
      },
      hints: [
        'Two digits repeat, so call it $x$ and multiply by $100$.',
        '$100x = 15.1515\\ldots$ and $x = 0.1515\\ldots$. Subtract to kill the tail.',
        'You get $99x = 15$. Cancel the fraction — both numbers divide by $3$.'
      ],
      solution: [
        { text: 'Name it and shift two places.', math: 'x = 0.1515\\ldots,\\qquad 100x = 15.1515\\ldots' },
        { text: 'Subtract.', math: '99x = 15' },
        { text: 'Divide and cancel by $3$.', math: 'x = \\frac{15}{99} = \\frac{5}{33}' }
      ],
      answerText: '(b) $\\dfrac{5}{33}$'
    },
    {
      id: 'mid4-q9', part: 2, marks: 3, topic: '1.2',
      prompt: '**Q9.** Simplify $\\sqrt[4]{16x^5y^8 + 32x^4y^5}$, for $x, y \\ge 0$.',
      answer: {
        type: 'choice', value: 'd',
        options: [
          { id: 'a', label: '$2xy^2\\sqrt[4]{x} + 2xy\\sqrt[4]{2y}$' },
          { id: 'b', label: '$2xy^2\\sqrt[4]{x+2y}$' },
          { id: 'c', label: '$2xy\\sqrt{xy^4+2y}$' },
          { id: 'd', label: '$2xy\\sqrt[4]{xy^4+2y}$' }
        ],
        wrongMessage: 'Not quite. Factor inside first, pull out the fourth power — and the root left behind is still a **fourth** root.'
      },
      note: 'The handwritten copy circles (c). That answer has a square root, but the question is a fourth root and nothing in the working changes that, so (d) is the one that is right. Only the part pulled outside loses its root.',
      hints: [
        'You cannot split a root over a $+$. Factor what is inside first and look for a perfect fourth power.',
        'Both terms share $16x^4y^4$: $16x^5y^8 + 32x^4y^5 = 16x^4y^4(xy^4 + 2y)$.',
        '$\\sqrt[4]{16x^4y^4} = 2xy$, so that part comes outside.',
        'What stays inside keeps the **fourth** root — it does not become a square root.'
      ],
      solution: [
        { text: 'Factor out the largest perfect fourth power.', math: '16x^5y^8 + 32x^4y^5 = 16x^4y^4\\left(xy^4 + 2y\\right)' },
        { text: 'Take the fourth root of the part that is a perfect fourth power.', math: '\\sqrt[4]{16x^4y^4} = 2xy' },
        { text: 'The rest stays under a fourth root.', math: '= 2xy\\sqrt[4]{xy^4+2y}' }
      ],
      answerText: '(d) $2xy\\sqrt[4]{xy^4+2y}$'
    },
    {
      id: 'mid4-q10', part: 2, marks: 3, topic: '1.2',
      prompt: '**Q10.** Rationalise the denominator of $\\dfrac{8}{3-\\sqrt5}$.',
      answer: {
        type: 'choice', value: 'c',
        options: [{ id: 'a', label: '$-4(3+\\sqrt5)$' }, { id: 'b', label: '$2(3-\\sqrt5)$' }, { id: 'c', label: '$2(3+\\sqrt5)$' }, { id: 'd', label: '$-4(3-\\sqrt5)$' }],
        wrongMessage: 'Not quite. Multiply by the conjugate $3+\\sqrt5$, and check the sign of the bottom you get.'
      },
      hints: [
        'Multiply top and bottom by the conjugate: the same two terms with the middle sign flipped, so $3+\\sqrt5$.',
        'The bottom becomes $3^2 - (\\sqrt5)^2 = 9-5 = 4$ — positive, so no minus sign appears.',
        'Then $\\tfrac{8}{4} = 2$, leaving $2(3+\\sqrt5)$.'
      ],
      solution: [
        { text: 'Multiply by the conjugate.', math: '\\frac{8}{3-\\sqrt5}\\cdot\\frac{3+\\sqrt5}{3+\\sqrt5}' },
        { text: 'The bottom is a difference of squares.', math: '= \\frac{8(3+\\sqrt5)}{9-5} = \\frac{8(3+\\sqrt5)}{4}' },
        { text: 'Cancel.', math: '= 2(3+\\sqrt5)' }
      ],
      answerText: '(c) $2(3+\\sqrt5)$'
    },
    {
      id: 'mid4-q11', part: 2, marks: 3, topic: '1.5',
      prompt: '**Q11.** Find the solution set of $|6-2x| = 14$.',
      answer: {
        type: 'choice', value: 'a',
        options: [{ id: 'a', label: '$\\{-4,\\ 10\\}$' }, { id: 'b', label: '$\\left\\{-\\tfrac83,\\ 2\\right\\}$' }, { id: 'c', label: '$\\{-10,\\ 4\\}$' }, { id: 'd', label: '$\\left\\{-2,\\ \\tfrac83\\right\\}$' }],
        wrongMessage: 'Not quite. Split into two equations — and watch the sign when you divide by $-2$.'
      },
      hints: [
        'The bars are already on their own, and $14$ is positive, so this splits into two equations.',
        'Write $6-2x = 14$ **or** $6-2x = -14$.',
        'Solve each. Both involve dividing by $-2$, so take care with signs.'
      ],
      solution: [
        { text: 'Split into two.', math: '6-2x = 14 \\quad\\text{or}\\quad 6-2x = -14' },
        { text: 'First: $-2x = 8$, so $x = -4$.' },
        { text: 'Second: $-2x = -20$, so $x = 10$.', math: 'S = \\{-4,\\ 10\\}' }
      ],
      answerText: '(a) $\\{-4, 10\\}$'
    },
    {
      id: 'mid4-q12', part: 2, marks: 3, topic: '1.9',
      prompt: '**Q12.** The point $(-3,7)$ lies on a graph symmetric about the $x$-axis. Which point is also on the graph?',
      answer: {
        type: 'choice', value: 'b',
        options: [{ id: 'a', label: '$(3,-7)$' }, { id: 'b', label: '$(-3,-7)$' }, { id: 'c', label: '$(3,7)$' }, { id: 'd', label: '$(0,0)$' }],
        wrongMessage: 'Not quite. Symmetry about the $x$-axis mirrors top to bottom, so only the $y$ changes.'
      },
      hints: [
        'Symmetric about the $x$-axis means the graph mirrors top to bottom across the horizontal axis.',
        'Mirroring up-and-down changes the height but not the across. So which coordinate flips?',
        'Only the $y$ flips sign; the $x$ stays as it is.'
      ],
      solution: [
        { text: 'Reflecting in the $x$-axis sends $(x,y)$ to $(x,-y)$ — the $x$ is unchanged.' },
        { text: 'So $(-3,7)$ gives $(-3,-7)$. (Flipping the $x$ instead would be $y$-axis symmetry.)' }
      ],
      answerText: '(b) $(-3,-7)$'
    },
    {
      id: 'mid4-q13', part: 2, marks: 3, topic: '1.9',
      prompt: '**Q13.** Find the $x$- and $y$-intercepts of $2x + y^3 = 8$.',
      answer: {
        type: 'choice', value: 'a',
        options: [
          { id: 'a', label: '$x$-intercept is $4$ and $y$-intercept is $2$' },
          { id: 'b', label: 'No $x$-intercept and $y$-intercept is $2$' },
          { id: 'c', label: '$x$-intercept is $4$ and no $y$-intercept' },
          { id: 'd', label: '$x$-intercept is $2$ and $y$-intercept is $4$' }
        ],
        wrongMessage: 'Not quite. Set one letter to zero at a time — and remember a cube root of a positive number exists.'
      },
      hints: [
        'Two separate calculations. For the $x$-intercept set $y=0$; for the $y$-intercept set $x=0$.',
        'With $y=0$: $2x = 8$, so $x=4$.',
        'With $x=0$: $y^3 = 8$. Unlike a square root, a cube root of a positive number is fine — $y=2$.'
      ],
      solution: [
        { text: 'Set $y=0$ for the $x$-intercept.', math: '2x = 8 \\;\\Rightarrow\\; x = 4' },
        { text: 'Set $x=0$ for the $y$-intercept.', math: 'y^3 = 8 \\;\\Rightarrow\\; y = 2' }
      ],
      answerText: '(a) $x$-intercept $4$, $y$-intercept $2$'
    }
  ]
});
