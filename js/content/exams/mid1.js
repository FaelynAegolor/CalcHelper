/* Past paper: Math 091 Pre-Calculus, first midterm (version 1).
   Questions are shaped like section exercises so the usual card renders them —
   hints appear one at a time, the answer is checked, working can be tested.

   Two things in the official solution sheet do not survive checking, and the
   `note` on those questions says so. They are flagged rather than quietly
   "corrected" so nothing contradicts her own copy of the paper without saying why. */
CH.registerExam({
  id: 'mid1',
  title: 'First midterm — version 1',
  blurb: 'Seven long questions, then ten multiple choice. The paper comes with a full solution sheet.',
  questions: [
    // ---------------------------------------------------------------- Part I
    {
      id: 'mid1-q1', part: 1, marks: 10, topic: '1.2',
      prompt: '**Q1.** Simplify $\\left(\\dfrac{3y^3z^{2/3}}{x^{1/2}}\\right)^{2}\\left(\\dfrac{x^{-3}y^6}{27z^4}\\right)^{1/3}$. All letters are positive.',
      answer: { type: 'expression', value: '3*y^8/x^2', vars: ['x', 'y', 'z'], form: 'positive-exponents' },
      hints: [
        'Two brackets, each with a power sitting outside it. Take them one at a time — what does an outside power do to **every** factor inside?',
        'Square the first bracket. A power on a power multiplies, so $(z^{2/3})^2 = z^{4/3}$ and $(x^{1/2})^2 = x$.',
        'A power of $\\tfrac13$ is a cube root. $\\sqrt[3]{27} = 3$, and $(x^{-3})^{1/3} = x^{-1}$.',
        'Multiply the two results, then collect each letter. The $z$ powers are the same on top and bottom, so they cancel completely.'
      ],
      solution: [
        { text: 'Square the first bracket — every factor inside gets the power.', math: '\\left(\\frac{3y^3z^{2/3}}{x^{1/2}}\\right)^{2} = \\frac{9\\,y^{6}z^{4/3}}{x}' },
        { text: 'Cube-root the second. $\\sqrt[3]{27} = 3$, and each power is divided by $3$.', math: '\\left(\\frac{x^{-3}y^6}{27z^4}\\right)^{1/3} = \\frac{x^{-1}y^{2}}{3\\,z^{4/3}}' },
        { text: 'Multiply them together. Write $x^{-1}$ as $\\tfrac1x$ so everything is on one line.', math: '\\frac{9\\,y^{6}z^{4/3}}{x}\\cdot\\frac{y^{2}}{3\\,x\\,z^{4/3}} = \\frac{9\\,y^{8}z^{4/3}}{3\\,x^{2}z^{4/3}}' },
        { text: 'The $z^{4/3}$ cancels top and bottom, and $9 \\div 3 = 3$.', math: '= \\frac{3y^{8}}{x^{2}}' }
      ],
      answerText: '$\\dfrac{3y^8}{x^2}$',
      checklist: ['Give each bracket its outside power first, one bracket at a time.', 'A power on a power multiplies; a power of $\\tfrac1n$ is an $n$th root.', 'Multiply the two results together.', 'Collect each letter, and cancel anything that appears top and bottom.']
    },
    {
      id: 'mid1-q2a', part: 1, marks: 5, topic: '1.3',
      prompt: '**Q2(a).** Factor completely: $\\left(a + \\dfrac{4}{b^2}\\right)^{2} - \\left(a - \\dfrac{4}{b^2}\\right)^{2}$.',
      answer: { type: 'expression', value: '16*a/b^2', vars: ['a', 'b'] },
      hints: [
        'Do not multiply anything out yet. Look at the shape: something squared, minus something else squared. Which pattern is that?',
        'It is the difference of squares, $A^2 - B^2 = (A-B)(A+B)$. Here $A = a + \\tfrac{4}{b^2}$ and $B = a - \\tfrac{4}{b^2}$.',
        'Work out $A - B$ and $A + B$ separately. In each one, a pair of terms cancels.'
      ],
      solution: [
        { text: 'Use $A^2 - B^2 = (A-B)(A+B)$ with $A = a + \\tfrac{4}{b^2}$ and $B = a - \\tfrac{4}{b^2}$.' },
        { text: 'The first bracket: the $a$s cancel and the fractions double.', math: 'A - B = \\left(a + \\frac{4}{b^2}\\right) - \\left(a - \\frac{4}{b^2}\\right) = \\frac{8}{b^2}' },
        { text: 'The second bracket: this time the fractions cancel.', math: 'A + B = \\left(a + \\frac{4}{b^2}\\right) + \\left(a - \\frac{4}{b^2}\\right) = 2a' },
        { text: 'Multiply the two results.', math: '\\frac{8}{b^2}\\cdot 2a = \\frac{16a}{b^2}' }
      ],
      answerText: '$\\dfrac{16a}{b^2}$',
      checklist: ['Spot the pattern before multiplying anything out.', 'Difference of squares: $A^2-B^2=(A-B)(A+B)$.', 'Work out $A-B$ and $A+B$ separately — things cancel in each.', 'Multiply the two brackets together.']
    },
    {
      id: 'mid1-q2b', part: 1, marks: 5, topic: '1.3',
      prompt: '**Q2(b).** Factor completely: $x^3 - 5x^2 - 4x + 20$.',
      answer: { type: 'expression', value: '(x-5)*(x-2)*(x+2)', vars: ['x'], form: 'factored' },
      hints: [
        'Four terms, and no factor is common to all four. That is the signal to try **grouping**: split them into two pairs.',
        'Pair them as $(x^3 - 5x^2)$ and $(-4x + 20)$. Factor each pair on its own and aim to make the same bracket appear twice.',
        'From the second pair take out $-4$, not $4$, so that $(x-5)$ appears both times.',
        'Once you have $(x-5)(x^2-4)$, check whether the second bracket factors further — it is a difference of squares.'
      ],
      solution: [
        { text: 'Split into two pairs.', math: '(x^3 - 5x^2) + (-4x + 20)' },
        { text: 'Factor each pair. Taking out $-4$ from the second makes both brackets match.', math: 'x^2(x-5) - 4(x-5)' },
        { text: 'Now $(x-5)$ is a common factor of the whole thing.', math: '= (x-5)(x^2-4)' },
        { text: '$x^2 - 4$ is a difference of squares, so it factors again.', math: '= (x-5)(x-2)(x+2)' }
      ],
      answerText: '$(x-5)(x-2)(x+2)$',
      checklist: ['Four terms with nothing common to all four means try grouping.', 'Split into two pairs and factor each pair.', 'Choose signs so the same bracket appears twice.', 'Check every bracket again — $x^2-4$ still factors.']
    },
    {
      id: 'mid1-q3', part: 1, marks: 10, topic: '1.4',
      prompt: '**Q3.** Simplify $\\dfrac{x^{-2} + \\dfrac{x}{y^3}}{x^{-1} + y^{-1}}$.',
      answer: { type: 'expression', value: '(x^2 - x*y + y^2)/(x*y^2)', vars: ['x', 'y'] },
      hints: [
        'Negative powers are just "one over". Rewrite $x^{-2}$ as $\\tfrac{1}{x^2}$ and $x^{-1}+y^{-1}$ as $\\tfrac1x + \\tfrac1y$ so you can see ordinary fractions.',
        'Turn the top into a single fraction, and the bottom into a single fraction. Do them separately.',
        'Top: the common bottom is $x^2y^3$, giving $\\dfrac{y^3 + x^3}{x^2y^3}$. Bottom: $\\dfrac{y+x}{xy}$.',
        'Dividing by a fraction means multiplying by it upside down. Then $x^3+y^3$ is a **sum of cubes** — factor it so something cancels.'
      ],
      solution: [
        { text: 'Rewrite the negative powers as fractions.', math: '\\frac{\\dfrac{1}{x^2} + \\dfrac{x}{y^3}}{\\dfrac{1}{x} + \\dfrac{1}{y}}' },
        { text: 'Combine the top over $x^2y^3$ and the bottom over $xy$.', math: '= \\frac{\\dfrac{y^3 + x^3}{x^2y^3}}{\\dfrac{y + x}{xy}}' },
        { text: 'Dividing by a fraction is multiplying by its reciprocal.', math: '= \\frac{y^3+x^3}{x^2y^3}\\cdot\\frac{xy}{y+x}' },
        { text: 'Factor the sum of cubes: $x^3+y^3 = (x+y)(x^2-xy+y^2)$. The $(x+y)$ cancels.', math: '= \\frac{(x+y)(x^2-xy+y^2)\\,xy}{x^2y^3(x+y)} = \\frac{x^2-xy+y^2}{xy^2}' }
      ],
      answerText: '$\\dfrac{x^2-xy+y^2}{xy^2}$',
      checklist: ['Rewrite every negative power as "one over".', 'Make the top one fraction and the bottom one fraction.', 'Divide by flipping the bottom fraction and multiplying.', 'Factor to find what cancels — here a sum of cubes.']
    },
    {
      id: 'mid1-q4', part: 1, marks: 15, topic: '1.5',
      prompt: '**Q4.** Find the solution set of $2x^2 - 5x + 1 = 0$.',
      answer: { type: 'set', value: [(5 + Math.sqrt(17)) / 4, (5 - Math.sqrt(17)) / 4], vars: ['x'] },
      hints: [
        'Try factoring first: two numbers multiplying to $2\\times 1 = 2$ and adding to $-5$. Have a go — you will not find any.',
        'When factoring will not work, the quadratic formula always does. Write down $a = 2$, $b = -5$, $c = 1$ before anything else.',
        'Work out $b^2 - 4ac$ on its own first: $(-5)^2 - 4(2)(1) = 17$.',
        '$17$ is prime, so $\\sqrt{17}$ will not simplify. Put everything into $x = \\dfrac{-b \\pm \\sqrt{b^2-4ac}}{2a}$.'
      ],
      solution: [
        { text: 'Note the three coefficients.', math: 'a = 2,\\quad b = -5,\\quad c = 1' },
        { text: 'Work out the discriminant first.', math: 'D = b^2 - 4ac = 25 - 8 = 17 > 0' },
        { text: 'It is positive, so there are two real solutions. Substitute into the formula.', math: 'x = \\frac{-(-5) \\pm \\sqrt{17}}{2(2)} = \\frac{5 \\pm \\sqrt{17}}{4}' }
      ],
      answerText: '$S = \\left\\{\\dfrac{5-\\sqrt{17}}{4},\\ \\dfrac{5+\\sqrt{17}}{4}\\right\\}$',
      checklist: ['Try factoring first — it is quicker when it works.', 'Write down $a$, $b$ and $c$ before touching the formula.', 'Work out $b^2-4ac$ on its own.', 'Substitute, then simplify the root if you can.']
    },
    {
      id: 'mid1-q5', part: 1, marks: 15, topic: '1.8',
      prompt: '**Q5.** Find the solution of the inequality $\\dfrac{x-5}{x^2-3x+2} \\le 0$.',
      answer: { type: 'interval', value: '(-inf, 1) U (2, 5]', vars: ['x'] },
      note: 'The official solution sheet factors the bottom as $(x+2)(x-1)$ and gets $(-\\infty,-2)\\cup(1,5]$. That factoring is wrong: $(x+2)(x-1) = x^2+x-2$, not $x^2-3x+2$. Multiply it out and see. The bottom really factors as $(x-1)(x-2)$, which is what is used here. If your tutor marks from that sheet, this is worth raising.',
      hints: [
        'One side is already zero and it is already a single fraction, so go straight to the zeros. Factor the bottom.',
        'Two numbers multiplying to $2$ and adding to $-3$: that is $-1$ and $-2$, so $x^2-3x+2=(x-1)(x-2)$.',
        'Mark $1$, $2$ and $5$ on a number line. Test one point in each of the four regions.',
        'Decide the endpoints last. $x=5$ makes the top zero, and $0 \\le 0$ is true, so include it. $x=1$ and $x=2$ make the bottom zero, so they can never be included.'
      ],
      solution: [
        { text: 'Factor the bottom.', math: '\\frac{x-5}{(x-1)(x-2)} \\le 0' },
        { text: 'The zeros are $x=1$ and $x=2$ (bottom) and $x=5$ (top). They cut the line into four regions.' },
        { text: 'Test a point in each region: $x=0$ gives $\\tfrac{-5}{2} < 0$; $x=1.5$ gives $\\tfrac{-3.5}{-0.25} > 0$; $x=3$ gives $\\tfrac{-2}{2} < 0$; $x=6$ gives $\\tfrac{1}{20} > 0$.' },
        { text: 'Keep the negative regions. Include $5$ (top is zero there); never include $1$ or $2$.', math: 'S = (-\\infty, 1) \\cup (2, 5]' }
      ],
      answerText: '$S = (-\\infty, 1) \\cup (2, 5]$',
      checklist: ['Get zero on one side as a single fraction — here it already is.', 'Factor, and find the zeros of the top and of the bottom.', 'Mark them all and test one point in each region.', 'Include top zeros when the sign is $\\le$; never include a bottom zero.']
    },
    {
      id: 'mid1-q6', part: 1, marks: 10, topic: '1.9',
      prompt: '**Q6.** Find an equation of the circle with centre $(7,-2)$ passing through $(4,1)$.',
      answer: { type: 'equation', value: '(x-7)^2 + (y+2)^2 = 18', vars: ['x', 'y'] },
      hints: [
        'You have the centre but not the radius. What does "passes through $(4,1)$" tell you about the distance from the centre to that point?',
        'The radius is the distance from $(7,-2)$ to $(4,1)$. Use Pythagoras.',
        'You only ever need $r^2$ in the equation, so there is no need to square-root and then square again.',
        'Put the centre into $(x-h)^2+(y-k)^2 = r^2$, watching the signs: $k=-2$ gives $(y+2)^2$.'
      ],
      solution: [
        { text: 'The radius is the distance from the centre to the given point.', math: 'r^2 = (4-7)^2 + (1-(-2))^2 = 9 + 9 = 18' },
        { text: 'Substitute the centre $(h,k)=(7,-2)$ and $r^2=18$ into the standard form.', math: '(x-h)^2 + (y-k)^2 = r^2' },
        { text: 'Mind the sign on $k$: subtracting $-2$ gives $+2$.', math: '(x-7)^2 + (y+2)^2 = 18' }
      ],
      answerText: '$(x-7)^2 + (y+2)^2 = 18$',
      checklist: ['The radius is the distance from the centre to the point on the circle.', 'Stop at $r^2$ — the equation never needs $r$ itself.', 'Put the centre into $(x-h)^2+(y-k)^2=r^2$.', 'Check the signs: a negative coordinate becomes a plus inside the bracket.']
    },
    {
      id: 'mid1-q7', part: 1, marks: 10, topic: '1.10',
      prompt: '**Q7.** Find an equation of the line through $P(-5,2)$ parallel to the line $4x - 3y - 1 = 0$.',
      answer: { type: 'equation', value: '4*x - 3*y + 26 = 0', vars: ['x', 'y'] },
      hints: [
        'You need two things to write any line: a point and a slope. You have been given the point — where does the slope come from?',
        'Parallel means the **same** slope, so find the slope of the given line by rearranging it into $y = mx + b$.',
        '$4x - 3y - 1 = 0$ gives $3y = 4x - 1$, so $y = \\tfrac43 x - \\tfrac13$ and the slope is $\\tfrac43$.',
        'Now use $y - y_1 = m(x - x_1)$ with the point $(-5,2)$, then clear the fraction.'
      ],
      solution: [
        { text: 'Rearrange the given line to find its slope.', math: '4x - 3y - 1 = 0 \\;\\Rightarrow\\; y = \\tfrac43 x - \\tfrac13, \\qquad m = \\tfrac43' },
        { text: 'Parallel lines have the same slope, so the new line also has $m = \\tfrac43$.' },
        { text: 'Use point-slope with $(-5,2)$.', math: 'y - 2 = \\tfrac43\\,(x + 5)' },
        { text: 'Multiply through by $3$ and collect everything on one side.', math: '3y - 6 = 4x + 20 \\;\\Rightarrow\\; 4x - 3y + 26 = 0' }
      ],
      answerText: '$4x - 3y + 26 = 0$  (same as $y - 2 = \\tfrac43(x+5)$)',
      checklist: ['A line needs a point and a slope — find whichever one is missing.', 'Parallel means the same slope; rearrange the given line to read it off.', 'Put the point and slope into $y-y_1=m(x-x_1)$.', 'Clear fractions and tidy into the form asked for.']
    },

    // --------------------------------------------------------------- Part II
    {
      id: 'mid1-q8', part: 2, marks: 2, topic: '1.1',
      prompt: '**Q8.** Express $0.\\overline{81}$ as a rational number.',
      answer: {
        type: 'choice', value: 'd',
        options: [{ id: 'a', label: '$\\dfrac{81}{100}$' }, { id: 'b', label: '$\\dfrac{27}{11}$' }, { id: 'c', label: '$\\dfrac{3}{11}$' }, { id: 'd', label: '$\\dfrac{9}{11}$' }],
        wrongMessage: 'Not quite. Two digits repeat, so multiply by $100$ and subtract.'
      },
      hints: [
        'Two digits repeat, so call the number $x$ and multiply by $100$ — one zero for each repeating digit.',
        '$100x = 81.8181\\ldots$ and $x = 0.8181\\ldots$. Subtract: the endless tails cancel exactly.',
        'You get $99x = 81$. Now divide and cancel down — both numbers divide by $9$.'
      ],
      solution: [
        { text: 'Name it and shift by two digits.', math: 'x = 0.8181\\ldots,\\qquad 100x = 81.8181\\ldots' },
        { text: 'Subtract — the repeating tails cancel.', math: '99x = 81' },
        { text: 'Divide and cancel by $9$.', math: 'x = \\frac{81}{99} = \\frac{9}{11}' }
      ],
      answerText: '(d) $\\dfrac{9}{11}$'
    },
    {
      id: 'mid1-q9', part: 2, marks: 2, topic: '1.2',
      prompt: '**Q9.** Simplify $\\dfrac{\\sqrt{48x^3y^2}}{\\sqrt{3x}}$, all letters positive.',
      answer: {
        type: 'choice', value: 'a',
        options: [{ id: 'a', label: '$4xy$' }, { id: 'b', label: '$2xy$' }, { id: 'c', label: '$2y\\sqrt[3]{x}$' }, { id: 'd', label: '$8xy$' }],
        wrongMessage: 'Not quite. Put both roots under one root sign and divide first.'
      },
      hints: [
        'Two square roots divided by each other can be put under a single root sign: $\\dfrac{\\sqrt{A}}{\\sqrt{B}} = \\sqrt{\\dfrac{A}{B}}$.',
        'Divide inside first — it keeps the numbers small. $\\dfrac{48x^3y^2}{3x} = 16x^2y^2$.',
        '$16x^2y^2$ is a perfect square all the way through.'
      ],
      solution: [
        { text: 'Combine under one root and divide inside.', math: '\\sqrt{\\frac{48x^3y^2}{3x}} = \\sqrt{16x^2y^2}' },
        { text: 'Everything inside is a perfect square.', math: '= 4xy' }
      ],
      answerText: '(a) $4xy$'
    },
    {
      id: 'mid1-q10', part: 2, marks: 2, topic: '1.3',
      prompt: '**Q10.** Expand $(1 + 2x)^3$.',
      answer: {
        type: 'choice', value: 'a',
        options: [{ id: 'a', label: '$1 + 6x + 12x^2 + 8x^3$' }, { id: 'b', label: '$1 + 8x^3$' }, { id: 'c', label: '$1 - 6x + 12x^2 - 8x^3$' }, { id: 'd', label: '$1 + 6x + 4x^2 + 8x^3$' }],
        wrongMessage: 'Not quite. Use the cube pattern — and remember the $2$ gets cubed too.'
      },
      hints: [
        'Use $(A+B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$ with $A = 1$ and $B = 2x$.',
        'Be careful with $B$: it is $2x$, not just $x$, so $B^2 = 4x^2$ and $B^3 = 8x^3$.',
        'A quick check: put $x = 1$. The original is $3^3 = 27$, so the right answer must also total $27$.'
      ],
      solution: [
        { text: 'Apply the pattern with $A=1$, $B=2x$.', math: '1^3 + 3(1)^2(2x) + 3(1)(2x)^2 + (2x)^3' },
        { text: 'Work each term out, cubing and squaring the $2$ as well.', math: '= 1 + 6x + 12x^2 + 8x^3' },
        { text: 'Check with $x=1$: $1+6+12+8 = 27 = 3^3$. ✓' }
      ],
      answerText: '(a) $1 + 6x + 12x^2 + 8x^3$'
    },
    {
      id: 'mid1-q11', part: 2, marks: 2, topic: '1.4',
      prompt: '**Q11.** Simplify $\\dfrac{x+5}{7x+14} \\div \\dfrac{x^2-25}{x^2-4x-12}$.',
      answer: {
        type: 'choice', value: 'c',
        options: [{ id: 'a', label: '$\\dfrac{x-6}{x-5}$' }, { id: 'b', label: '$\\dfrac{x-6}{7}$' }, { id: 'c', label: '$\\dfrac{x-6}{7(x-5)}$' }, { id: 'd', label: '$\\dfrac{x+6}{7(x+5)}$' }],
        wrongMessage: 'Not quite. Flip the second fraction, factor everything, then cancel.'
      },
      hints: [
        'Dividing by a fraction means multiplying by it upside down. Do that first, before factoring.',
        'Now factor every piece: $7x+14 = 7(x+2)$, $x^2-25 = (x-5)(x+5)$, $x^2-4x-12 = (x-6)(x+2)$.',
        'Cancel $(x+5)$ and $(x+2)$ across the product. What is left on the bottom is $7(x-5)$.'
      ],
      solution: [
        { text: 'Flip and multiply.', math: '\\frac{x+5}{7x+14}\\cdot\\frac{x^2-4x-12}{x^2-25}' },
        { text: 'Factor everything.', math: '= \\frac{x+5}{7(x+2)}\\cdot\\frac{(x-6)(x+2)}{(x-5)(x+5)}' },
        { text: 'Cancel $(x+5)$ and $(x+2)$.', math: '= \\frac{x-6}{7(x-5)}' }
      ],
      answerText: '(c) $\\dfrac{x-6}{7(x-5)}$'
    },
    {
      id: 'mid1-q12', part: 2, marks: 2, topic: '1.2',
      prompt: '**Q12.** Rationalise the denominator of $\\dfrac{3}{\\sqrt{7}-2}$.',
      answer: {
        type: 'choice', value: 'c',
        options: [{ id: 'a', label: '$\\sqrt{7}-2$' }, { id: 'b', label: '$-(\\sqrt{7}+2)$' }, { id: 'c', label: '$\\sqrt{7}+2$' }, { id: 'd', label: '$3(\\sqrt{7}+2)$' }],
        wrongMessage: 'Not quite. Multiply top and bottom by the conjugate $\\sqrt7 + 2$, then simplify the number you get on the bottom.'
      },
      note: 'The paper prints this as $\\dfrac{3}{\\sqrt7-\\sqrt2}$, but that version has no matching option — it works out to $\\tfrac{3(\\sqrt7+\\sqrt2)}{5}$. The four options only make sense for $\\sqrt7-2$, which is what the answer key marks, so that is the version shown here. Worth knowing in case the same typo appears again.',
      hints: [
        'The problem is the root on the bottom. Multiply top and bottom by the **conjugate** — the same two terms with the middle sign flipped.',
        'The conjugate of $\\sqrt7 - 2$ is $\\sqrt7 + 2$. Multiplying gives a difference of squares on the bottom.',
        'The bottom becomes $(\\sqrt7)^2 - 2^2 = 7 - 4 = 3$ — which cancels the $3$ on top completely.'
      ],
      solution: [
        { text: 'Multiply top and bottom by the conjugate.', math: '\\frac{3}{\\sqrt7-2}\\cdot\\frac{\\sqrt7+2}{\\sqrt7+2}' },
        { text: 'The bottom is a difference of squares, so the root disappears.', math: '= \\frac{3(\\sqrt7+2)}{7-4} = \\frac{3(\\sqrt7+2)}{3}' },
        { text: 'Cancel the $3$.', math: '= \\sqrt7 + 2' }
      ],
      answerText: '(c) $\\sqrt{7}+2$'
    },
    {
      id: 'mid1-q13', part: 2, marks: 2, topic: '1.5',
      prompt: '**Q13.** Find the solution of $\\dfrac{x^2}{2x+6} = \\dfrac{1}{x+3}$.',
      answer: {
        type: 'choice', value: 'c',
        options: [{ id: 'a', label: '$\\pm 1$' }, { id: 'b', label: '$\\pm 2$' }, { id: 'c', label: '$\\pm\\sqrt{2}$' }, { id: 'd', label: '$-3, \\pm 1$' }],
        wrongMessage: 'Not quite. Factor $2x+6$ first — the two bottoms are closer than they look.'
      },
      hints: [
        'The two bottoms look different, but factor the left one: $2x+6 = 2(x+3)$. Now they share $(x+3)$.',
        'Multiply both sides by $2(x+3)$ to clear the fractions.',
        'You are left with $x^2 = 2$. Remember a square root gives **two** answers.',
        'Check neither answer makes an original bottom zero — the banned value is $x=-3$, and $\\pm\\sqrt2$ is fine.'
      ],
      solution: [
        { text: 'Factor the left-hand bottom.', math: '\\frac{x^2}{2(x+3)} = \\frac{1}{x+3}' },
        { text: 'Multiply both sides by $2(x+3)$.', math: 'x^2 = 2' },
        { text: 'Square-root both sides, taking both signs.', math: 'x = \\pm\\sqrt2' },
        { text: 'Neither value is $-3$, so both are allowed.' }
      ],
      answerText: '(c) $\\pm\\sqrt{2}$'
    },
    {
      id: 'mid1-q14', part: 2, marks: 2, topic: '1.8',
      prompt: '**Q14.** Find the solution of $|2x-5| < 7$.',
      answer: {
        type: 'choice', value: 'a',
        options: [{ id: 'a', label: '$(-1, 6)$' }, { id: 'b', label: '$(-\\infty,-2)\\cup(12,\\infty)$' }, { id: 'c', label: '$(-\\infty,-2]\\cup[12,\\infty)$' }, { id: 'd', label: '$(-2, 12)$' }],
        wrongMessage: 'Not quite. "Less than" means **between** — and remember to finish solving for $x$.'
      },
      hints: [
        '$|A| < c$ means $A$ is **between** $-c$ and $c$. Write it as one double inequality.',
        'That gives $-7 < 2x - 5 < 7$.',
        'Now do the same thing to all three parts: add $5$, then divide by $2$.'
      ],
      solution: [
        { text: 'Less than means between.', math: '-7 < 2x - 5 < 7' },
        { text: 'Add $5$ to all three parts.', math: '-2 < 2x < 12' },
        { text: 'Divide all three by $2$ (positive, so no flip).', math: '-1 < x < 6' }
      ],
      answerText: '(a) $(-1, 6)$'
    },
    {
      id: 'mid1-q15', part: 2, marks: 2, topic: '1.9',
      prompt: '**Q15.** Find the $y$-intercept, if any, of the graph of $y = \\sqrt{x^2-9}$.',
      answer: {
        type: 'choice', value: 'd',
        options: [{ id: 'a', label: '$y = 9$' }, { id: 'b', label: '$y = \\pm 3$' }, { id: 'c', label: '$y = 3$' }, { id: 'd', label: 'no $y$-intercept' }],
        wrongMessage: 'Not quite. Put $x=0$ in and look carefully at what ends up under the root.'
      },
      hints: [
        'For a $y$-intercept you set $x = 0$ — the graph crosses the $y$-axis where $x$ is zero.',
        'Putting $x=0$ gives $y = \\sqrt{0 - 9} = \\sqrt{-9}$.',
        'You cannot square-root a negative number and get a real answer, so the graph never reaches the $y$-axis.'
      ],
      solution: [
        { text: 'Set $x = 0$.', math: 'y = \\sqrt{0^2 - 9} = \\sqrt{-9}' },
        { text: 'There is no real square root of a negative number, so there is no $y$-intercept. (The graph only exists where $x^2 \\ge 9$, i.e. $|x|\\ge 3$.)' }
      ],
      answerText: '(d) no $y$-intercept'
    },
    {
      id: 'mid1-q16', part: 2, marks: 2, topic: '1.9',
      prompt: '**Q16.** Which of these has a graph symmetric about the $y$-axis?',
      answer: {
        type: 'choice', value: 'b',
        options: [{ id: 'a', label: '$y = x^3$' }, { id: 'b', label: '$y = x^2 - 3$' }, { id: 'c', label: '$y^2 + 2 = x$' }, { id: 'd', label: '$y = \\sqrt{x}$' }],
        wrongMessage: 'Not quite. Replace $x$ with $-x$ and see which one comes back unchanged.'
      },
      hints: [
        'Symmetric about the $y$-axis means the left half mirrors the right half. The test: replace $x$ with $-x$ and see if the equation is unchanged.',
        'Try it on each option. $(-x)^3 = -x^3$, so that one changes.',
        '$(-x)^2 = x^2$, because squaring kills the minus sign.'
      ],
      solution: [
        { text: 'The test for $y$-axis symmetry is: replace $x$ by $-x$ and see if you get the original back.' },
        { text: 'For $y = x^2 - 3$:', math: 'y = (-x)^2 - 3 = x^2 - 3 \\quad\\checkmark' },
        { text: '$y=x^3$ becomes $y=-x^3$ (changed); $y^2+2=x$ is symmetric about the $x$-axis instead; $y=\\sqrt x$ does not even exist for negative $x$.' }
      ],
      answerText: '(b) $y = x^2 - 3$'
    },
    {
      id: 'mid1-q17', part: 2, marks: 2, topic: '1.10',
      prompt: '**Q17.** Find the equation of the line that has slope $0$.',
      answer: {
        type: 'choice', value: 'b',
        options: [{ id: 'a', label: '$x = 1$' }, { id: 'b', label: '$y = 2$' }, { id: 'c', label: '$x = y$' }, { id: 'd', label: '$x + y = 0$' }],
        wrongMessage: 'Not quite. Slope $0$ means flat — the height never changes.'
      },
      hints: [
        'Slope is how far up you go for each step to the right. If that is $0$, the line never goes up or down.',
        'A flat line keeps $y$ the same forever, so its equation says what $y$ is and never mentions $x$.',
        'Careful: $x = 1$ is the upright one, which has no slope at all — that is different from slope zero.'
      ],
      solution: [
        { text: 'Slope $0$ means the line is horizontal — the height never changes.' },
        { text: 'A horizontal line fixes $y$: its equation is $y = $ constant.', math: 'y = 2' },
        { text: '$x = 1$ is vertical, and a vertical line has **no** slope rather than slope $0$.' }
      ],
      answerText: '(b) $y = 2$'
    }
  ]
});
