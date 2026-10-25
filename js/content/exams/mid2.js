/* Past paper: Math 091 Pre-Calculus, first exam, Fall 2024/2025. Official solutions
   came with this one and every answer below agrees with them. */
CH.registerExam({
  id: 'mid2',
  title: 'First exam — Fall 2024/25',
  blurb: 'Four questions, each in parts. Comes with the official solution sheet.',
  questions: [
    {
      id: 'mid2-q1a', part: 1, marks: 10, topic: '1.2',
      prompt: '**Q1(a).** Simplify $\\left(\\dfrac{3x^{-2}}{y^{1/3}z^{2}}\\right)^{3}\\left(\\dfrac{xy}{2}\\right)^{4}$.',
      answer: { type: 'expression', value: '27*y^3/(16*x^2*z^6)', vars: ['x', 'y', 'z'], form: 'positive-exponents' },
      hints: [
        'Two brackets with powers outside. Give each bracket its power separately before you try to combine anything.',
        'Cubing the first: $3^3 = 27$, $(x^{-2})^3 = x^{-6}$, $(y^{1/3})^3 = y$, $(z^2)^3 = z^6$.',
        'The second gives $\\dfrac{x^4y^4}{16}$ — remember the $2$ on the bottom gets the power too.',
        'Multiply, then collect each letter. $x^{-6}\\cdot x^4 = x^{-2}$, which belongs on the bottom.'
      ],
      solution: [
        { text: 'Cube the first bracket. The $\\tfrac13$ power on $y$ becomes $1$.', math: '\\left(\\frac{3x^{-2}}{y^{1/3}z^{2}}\\right)^{3} = \\frac{27\\,x^{-6}}{y\\,z^{6}}' },
        { text: 'Raise the second to the fourth — the $2$ on the bottom as well.', math: '\\left(\\frac{xy}{2}\\right)^{4} = \\frac{x^4y^4}{16}' },
        { text: 'Multiply and collect each letter.', math: '\\frac{27\\,x^{-6}}{y\\,z^{6}}\\cdot\\frac{x^4y^4}{16} = \\frac{27\\,x^{-2}y^{3}}{16\\,z^{6}}' },
        { text: 'A negative power moves across the bar and becomes positive.', math: '= \\frac{27\\,y^{3}}{16\\,x^{2}z^{6}}' }
      ],
      answerText: '$\\dfrac{27y^3}{16x^2z^6}$',
      checklist: ['Give each bracket its outside power on its own.', 'Every factor inside gets it, including plain numbers.', 'Multiply the results and collect each letter.', 'Move negative powers across the bar so none are left.']
    },
    {
      id: 'mid2-q1b', part: 1, marks: 5, topic: '1.1',
      prompt: '**Q1(b).** Simplify $|s-t| + 2(s-t)$, where $s < t$.',
      answer: { type: 'expression', value: 's - t', vars: ['s', 't'], assume: 's < t' },
      hints: [
        'The bars are the only hard part. Ask the one question that always decides them: is the inside positive or negative?',
        'You are told $s < t$. So $s - t$ is **negative**, and the bars flip its sign.',
        '$|s-t| = -(s-t) = t - s$. Now substitute that in and collect like terms.'
      ],
      solution: [
        { text: 'Since $s < t$, the inside $s-t$ is negative, so the bars flip the sign.', math: '|s-t| = -(s-t) = t-s' },
        { text: 'Substitute and expand.', math: '-(s-t) + 2(s-t) = -s+t+2s-2t' },
        { text: 'Collect like terms.', math: '= s - t' }
      ],
      answerText: '$s - t$',
      checklist: ['Ask whether the inside of the bars is positive or negative.', 'Negative inside means the bars flip the sign.', 'Substitute the un-barred version in.', 'Expand and collect like terms.']
    },
    {
      id: 'mid2-q1c', part: 1, marks: 5, topic: '1.1',
      prompt: '**Q1(c).** Simplify $\\dfrac{\\;\\dfrac{3}{2} - \\dfrac{1}{3}\\;}{\\;\\dfrac{2}{5} + 1\\;}$.',
      answer: { type: 'number', value: 5 / 6 },
      hints: [
        'A fraction with fractions inside it. Tidy the top into one fraction, then the bottom into one fraction, and only then divide.',
        'Top: the common bottom of $2$ and $3$ is $6$, giving $\\tfrac96 - \\tfrac26 = \\tfrac76$.',
        'Bottom: write $1$ as $\\tfrac55$, giving $\\tfrac25 + \\tfrac55 = \\tfrac75$.',
        'Now divide: flip the bottom fraction and multiply. The $7$s cancel.'
      ],
      solution: [
        { text: 'Combine the top over $6$.', math: '\\frac{3}{2} - \\frac{1}{3} = \\frac{9-2}{6} = \\frac{7}{6}' },
        { text: 'Combine the bottom over $5$.', math: '\\frac{2}{5} + 1 = \\frac{2+5}{5} = \\frac{7}{5}' },
        { text: 'Divide by flipping and multiplying — the $7$s cancel.', math: '\\frac{7}{6} \\cdot \\frac{5}{7} = \\frac{5}{6}' }
      ],
      answerText: '$\\dfrac{5}{6}$',
      checklist: ['Make the top a single fraction.', 'Make the bottom a single fraction.', 'Flip the bottom one and multiply.', 'Cancel anything common before multiplying out.']
    },
    {
      id: 'mid2-q2a', part: 1, marks: 10, topic: '1.4',
      prompt: '**Q2(a).** Simplify $\\dfrac{3x-15}{x^2-9} \\div \\dfrac{x^2-4x-5}{x-3}$.',
      answer: { type: 'expression', value: '3/((x+1)*(x+3))', vars: ['x'] },
      hints: [
        'First move: turn the division into a multiplication by flipping the second fraction. Do that before factoring anything.',
        'Now factor every piece. $3x-15 = 3(x-5)$, $x^2-9 = (x-3)(x+3)$, $x^2-4x-5 = (x-5)(x+1)$.',
        'Cancel $(x-5)$ and $(x-3)$ across the whole product.'
      ],
      solution: [
        { text: 'Flip the second fraction and multiply.', math: '\\frac{3x-15}{x^2-9}\\cdot\\frac{x-3}{x^2-4x-5}' },
        { text: 'Factor everything in sight.', math: '= \\frac{3(x-5)}{(x-3)(x+3)}\\cdot\\frac{x-3}{(x-5)(x+1)}' },
        { text: 'Cancel $(x-5)$ and $(x-3)$.', math: '= \\frac{3}{(x+3)(x+1)}' }
      ],
      answerText: '$\\dfrac{3}{(x+1)(x+3)}$',
      checklist: ['Flip the second fraction and multiply — before factoring.', 'Factor every top and every bottom.', 'Cancel whole brackets that appear on both sides.', 'Leave the answer factored.']
    },
    {
      id: 'mid2-q2bi', part: 1, marks: 5, topic: '1.3',
      prompt: '**Q2(b)(i).** Factor completely: $(a-2)^2 - 7(a-2) + 6$.',
      answer: { type: 'expression', value: '(a-8)*(a-3)', vars: ['a'], form: 'factored' },
      hints: [
        'Do not multiply the bracket out. Notice that $(a-2)$ appears squared and on its own — that is the shape of an ordinary quadratic.',
        'Let $t = a-2$. The expression becomes $t^2 - 7t + 6$, which you can factor the usual way.',
        'Two numbers multiplying to $6$ and adding to $-7$: that is $-6$ and $-1$. So $t^2-7t+6 = (t-6)(t-1)$.',
        'Now swap $t$ back for $a-2$ and tidy each bracket.'
      ],
      solution: [
        { text: 'Substitute $t = a-2$ so the shape is obvious.', math: 't^2 - 7t + 6' },
        { text: 'Two numbers multiplying to $6$, adding to $-7$.', math: '= (t-6)(t-1)' },
        { text: 'Swap back and simplify each bracket.', math: '= (a-2-6)(a-2-1) = (a-8)(a-3)' }
      ],
      answerText: '$(a-8)(a-3)$',
      checklist: ['Spot a repeated bracket — do not expand it.', 'Let $t$ stand for that bracket.', 'Factor the ordinary quadratic in $t$.', 'Swap back and tidy each bracket.']
    },
    {
      id: 'mid2-q2bii', part: 1, marks: 5, topic: '1.3',
      prompt: '**Q2(b)(ii).** Factor completely: $x^3y - xy^3$.',
      answer: { type: 'expression', value: 'x*y*(x-y)*(x+y)', vars: ['x', 'y'], form: 'factored' },
      hints: [
        'Before any pattern-spotting, look for something that divides **both** terms.',
        'Both terms contain an $x$ and a $y$, so take out $xy$.',
        'That leaves $xy(x^2 - y^2)$ — and $x^2-y^2$ is a difference of squares.'
      ],
      solution: [
        { text: 'Take out the common factor $xy$.', math: 'x^3y - xy^3 = xy(x^2 - y^2)' },
        { text: 'The bracket is a difference of squares.', math: '= xy(x-y)(x+y)' }
      ],
      answerText: '$xy(x-y)(x+y)$',
      checklist: ['Pull out the common factor first, every time.', 'Then look at what is left for a pattern.', 'Difference of squares: $A^2-B^2=(A-B)(A+B)$.', 'Check nothing factors further.']
    },
    {
      id: 'mid2-q3a', part: 1, marks: 10, topic: '1.5',
      prompt: '**Q3(a).** Find the solution of $2x^2 - x - 6 = 0$.',
      answer: { type: 'set', value: [-1.5, 2], vars: ['x'] },
      hints: [
        'One side is already zero, so try to factor the other side.',
        'There is a number in front of $x^2$, so use the $ac$ method: $a\\times c = 2\\times(-6) = -12$.',
        'Two numbers multiplying to $-12$ and adding to $-1$: that is $-4$ and $3$. Split the middle term with them.',
        'After factoring, set each bracket to zero and solve the two small equations.'
      ],
      solution: [
        { text: 'Multiply $a$ by $c$: $2 \\times (-6) = -12$. Find two numbers multiplying to $-12$, adding to $-1$: $-4$ and $3$.' },
        { text: 'Split the middle term and factor in pairs.', math: '2x^2 - 4x + 3x - 6 = 2x(x-2) + 3(x-2) = (2x+3)(x-2)' },
        { text: 'Set each bracket to zero.', math: '2x+3 = 0 \\;\\Rightarrow\\; x = -\\tfrac32; \\qquad x-2 = 0 \\;\\Rightarrow\\; x = 2' }
      ],
      answerText: '$S = \\left\\{-\\tfrac32,\\ 2\\right\\}$',
      checklist: ['Make one side zero.', 'With a number in front of $x^2$, use the $ac$ method.', 'Split the middle term and factor in pairs.', 'Set each bracket to zero and solve.']
    },
    {
      id: 'mid2-q3b', part: 1, marks: 10, topic: '1.8',
      prompt: '**Q3(b).** Find the solution of $x(x+2)(3-x) \\le 0$.',
      answer: { type: 'interval', value: '[-2, 0] U [3, inf)', vars: ['x'] },
      hints: [
        'It is already factored with zero on the other side, so go straight to the zeros of each factor.',
        'The zeros are $x = 0$, $x = -2$ and $x = 3$. Mark them on a number line — they cut it into four regions.',
        'Watch the third factor: $(3-x)$ is **positive** when $x$ is small and negative when $x > 3$ — the opposite way round to the others.',
        'Test a point in each region, keep the negative ones, and include all three zeros because the sign is $\\le$.'
      ],
      solution: [
        { text: 'The zeros are $-2$, $0$ and $3$.' },
        { text: 'Test one point in each region: $x=-3$ gives $(-3)(-1)(6) > 0$; $x=-1$ gives $(-1)(1)(4) < 0$; $x=1$ gives $(1)(3)(2) > 0$; $x=4$ gives $(4)(6)(-1) < 0$.' },
        { text: 'Keep the regions where the product is negative, and include the zeros since the sign is $\\le$.', math: 'S = [-2, 0] \\cup [3, \\infty)' }
      ],
      answerText: '$S = [-2,0] \\cup [3,\\infty)$',
      checklist: ['Find the zero of every factor.', 'Mark them on a line and test one point per region.', 'Watch factors written backwards, like $(3-x)$.', 'Include the zeros when the sign is $\\le$ or $\\ge$.']
    },
    {
      id: 'mid2-q4a', part: 1, marks: 10, topic: '1.5',
      prompt: '**Q4(a).** Solve for $a$: $2ab - 4ac + b = 5cb + a$.',
      answer: { type: 'expression', value: '(5*c*b - b)/(2*b - 4*c - 1)', vars: ['a', 'b', 'c'] },
      hints: [
        'Treat every letter except $a$ as if it were an ordinary number. Your job is to get $a$ on its own.',
        'Move every term containing $a$ to one side and everything else to the other. Note the lone $a$ on the right has to come across too.',
        'You should have $2ab - 4ac - a = 5cb - b$. Now factor $a$ out of the left-hand side.',
        'That gives $a(2b - 4c - 1) = 5cb - b$. Divide by the whole bracket.'
      ],
      solution: [
        { text: 'Collect the $a$ terms on the left, the rest on the right.', math: '2ab - 4ac - a = 5cb - b' },
        { text: 'Factor $a$ out of every term on the left.', math: 'a(2b - 4c - 1) = 5cb - b' },
        { text: 'Divide both sides by the bracket.', math: 'a = \\frac{5cb - b}{2b - 4c - 1}' }
      ],
      answerText: '$a = \\dfrac{5cb-b}{2b-4c-1}$',
      checklist: ['Treat every other letter as a number.', 'Gather every term containing your letter on one side.', 'Factor that letter out.', 'Divide by whatever bracket is left beside it.']
    },
    {
      id: 'mid2-q4b', part: 1, marks: 10, topic: '1.10',
      prompt: '**Q4(b).** Find an equation of the line through $P(2,1)$ and $Q(-5,3)$. Write it in standard form.',
      answer: { type: 'equation', value: '2*x + 7*y = 11', vars: ['x', 'y'], form: 'integer-coefficients' },
      hints: [
        'Two points, so the slope comes first. Subtract in the same order on the top and the bottom.',
        '$m = \\dfrac{3-1}{-5-2} = \\dfrac{2}{-7} = -\\dfrac{2}{7}$.',
        'Now use $y - y_1 = m(x-x_1)$ with either point — $(2,1)$ keeps the numbers small.',
        'Standard form means no fractions and everything tidy, so multiply through by $7$.'
      ],
      solution: [
        { text: 'Find the slope.', math: 'm = \\frac{3-1}{-5-2} = -\\frac{2}{7}' },
        { text: 'Point-slope through $(2,1)$.', math: 'y - 1 = -\\tfrac{2}{7}(x-2)' },
        { text: 'Multiply by $7$ to clear the fraction.', math: '7y - 7 = -2x + 4' },
        { text: 'Collect into standard form.', math: '2x + 7y = 11' }
      ],
      answerText: '$2x + 7y = 11$',
      checklist: ['Find the slope first, subtracting in the same order top and bottom.', 'Use $y-y_1=m(x-x_1)$ with either point.', 'Multiply through to clear fractions.', 'Collect into the form the question asks for.']
    }
  ]
});
