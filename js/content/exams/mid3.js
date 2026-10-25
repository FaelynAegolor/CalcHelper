/* Past paper: Math 091 Pre-Calculus, first exam, Spring 2021/2022 (19 April 2022).
   Official answer key supplied; every answer below agrees with it. */
CH.registerExam({
  id: 'mid3',
  title: 'First exam — Spring 2021/22',
  blurb: 'Seven long questions and ten multiple choice. Full answer key supplied.',
  questions: [
    {
      id: 'mid3-q1', part: 1, marks: 10, topic: '1.1',
      prompt: '**Q1.** Evaluate $\\dfrac{\\;\\dfrac{1}{3} + \\dfrac{3}{2}\\;}{\\;\\dfrac{7}{10} + \\dfrac{2}{5}\\;}$.',
      answer: { type: 'number', value: 5 / 3 },
      hints: [
        'Tidy the top into one fraction and the bottom into one fraction. Leave the dividing until last.',
        'Top: common bottom $6$, giving $\\tfrac26 + \\tfrac96 = \\tfrac{11}{6}$.',
        'Bottom: common bottom $10$, giving $\\tfrac{7}{10} + \\tfrac{4}{10} = \\tfrac{11}{10}$.',
        'Divide by flipping — and notice both have an $11$, which cancels.'
      ],
      solution: [
        { text: 'Combine the top over $6$.', math: '\\frac{1}{3} + \\frac{3}{2} = \\frac{2+9}{6} = \\frac{11}{6}' },
        { text: 'Combine the bottom over $10$.', math: '\\frac{7}{10} + \\frac{2}{5} = \\frac{7+4}{10} = \\frac{11}{10}' },
        { text: 'Flip and multiply; the $11$s cancel.', math: '\\frac{11}{6}\\cdot\\frac{10}{11} = \\frac{10}{6} = \\frac{5}{3}' }
      ],
      answerText: '$\\dfrac{5}{3}$',
      checklist: ['Make the top one fraction.', 'Make the bottom one fraction.', 'Flip the bottom and multiply.', 'Cancel before multiplying out.']
    },
    {
      id: 'mid3-q2', part: 1, marks: 10, topic: '1.2',
      prompt: '**Q2.** Simplify $\\left(\\dfrac{3x^2y^{-1}}{2z^{-3}}\\right)^{-3}\\left(\\dfrac{x^{-1/2}y^2}{z}\\right)^{2}$, with $x,y,z$ positive.',
      answer: { type: 'expression', value: '8*y^7/(27*x^7*z^11)', vars: ['x', 'y', 'z'], form: 'positive-exponents' },
      hints: [
        'Tidy inside the first bracket before using the outside power. $y^{-1}$ on the top and $z^{-3}$ on the bottom both want to move across the bar.',
        'Inside the first bracket that gives $\\dfrac{3x^2z^3}{2y}$. A power of $-3$ then means **flip it over** and cube.',
        'So the first part is $\\left(\\dfrac{2y}{3x^2z^3}\\right)^{3} = \\dfrac{8y^3}{27x^6z^9}$.',
        'The second is $\\dfrac{x^{-1}y^4}{z^2}$. Multiply and collect: the $x$ powers add to $-7$.'
      ],
      solution: [
        { text: 'Tidy inside the first bracket by moving the negative powers across the bar.', math: '\\frac{3x^2y^{-1}}{2z^{-3}} = \\frac{3x^2z^3}{2y}' },
        { text: 'A power of $-3$ flips the fraction, then cubes it.', math: '\\left(\\frac{2y}{3x^2z^3}\\right)^{3} = \\frac{8y^3}{27x^6z^9}' },
        { text: 'Square the second bracket.', math: '\\left(\\frac{x^{-1/2}y^2}{z}\\right)^{2} = \\frac{x^{-1}y^4}{z^2}' },
        { text: 'Multiply and collect each letter.', math: '\\frac{8y^3}{27x^6z^9}\\cdot\\frac{y^4}{x\\,z^2} = \\frac{8y^7}{27x^7z^{11}}' }
      ],
      answerText: '$\\dfrac{8y^7}{27x^7z^{11}}$',
      checklist: ['Tidy inside the bracket first — move negative powers across the bar.', 'A negative outside power flips the whole fraction.', 'Then apply the now-positive power to top and bottom.', 'Multiply the parts and collect each letter.']
    },
    {
      id: 'mid3-q3a', part: 1, marks: 7, topic: '1.3',
      prompt: '**Q3(a).** Factor completely: $8x^4y - 27xy^4$.',
      answer: { type: 'expression', value: 'x*y*(2*x-3*y)*(4*x^2+6*x*y+9*y^2)', vars: ['x', 'y'], form: 'factored' },
      hints: [
        'Common factor first, before you look for any pattern. What do both terms share?',
        'Both have an $x$ and a $y$, so take out $xy$, leaving $xy(8x^3 - 27y^3)$.',
        'Now $8x^3 = (2x)^3$ and $27y^3 = (3y)^3$ — that is a **difference of cubes**.',
        'Use $A^3 - B^3 = (A-B)(A^2+AB+B^2)$ with $A = 2x$ and $B = 3y$.'
      ],
      solution: [
        { text: 'Take out the common factor $xy$.', math: '8x^4y - 27xy^4 = xy(8x^3 - 27y^3)' },
        { text: 'Write each part as something cubed: $8x^3=(2x)^3$, $27y^3=(3y)^3$.' },
        { text: 'Apply $A^3-B^3=(A-B)(A^2+AB+B^2)$.', math: '= xy(2x-3y)(4x^2+6xy+9y^2)' }
      ],
      answerText: '$xy(2x-3y)(4x^2+6xy+9y^2)$',
      checklist: ['Pull out the common factor first.', 'Write each remaining part as something cubed.', 'Use $A^3-B^3=(A-B)(A^2+AB+B^2)$.', 'Substitute $A$ and $B$ carefully — square and multiply them properly.']
    },
    {
      id: 'mid3-q3b', part: 1, marks: 8, topic: '1.3',
      prompt: '**Q3(b).** Factor completely: $4x^3 + 12x^2 - x - 3$.',
      answer: { type: 'expression', value: '(x+3)*(2*x-1)*(2*x+1)', vars: ['x'], form: 'factored' },
      hints: [
        'Four terms and nothing common to all four — that is the signal for grouping.',
        'Pair them as $(4x^3+12x^2)$ and $(-x-3)$. Factor each pair so the same bracket appears twice.',
        'From the second pair take out $-1$: $-(x+3)$. Now $(x+3)$ is in both.',
        'You get $(x+3)(4x^2-1)$ — and $4x^2-1$ is a difference of squares.'
      ],
      solution: [
        { text: 'Split into pairs.', math: '(4x^3 + 12x^2) + (-x - 3)' },
        { text: 'Factor each pair, choosing signs so the brackets match.', math: '4x^2(x+3) - 1(x+3)' },
        { text: 'Take out the common bracket.', math: '= (x+3)(4x^2-1)' },
        { text: '$4x^2-1$ is a difference of squares.', math: '= (x+3)(2x-1)(2x+1)' }
      ],
      answerText: '$(x+3)(2x-1)(2x+1)$',
      checklist: ['Four terms with nothing common means grouping.', 'Split into two pairs and factor each.', 'Pick signs so the same bracket appears twice.', 'Check every bracket again for a pattern.']
    },
    {
      id: 'mid3-q4', part: 1, marks: 10, topic: '1.5',
      prompt: '**Q4.** Find all solutions of $x^2 - 4x - 1 = 0$.',
      answer: { type: 'set', value: [2 + Math.sqrt(5), 2 - Math.sqrt(5)], vars: ['x'] },
      hints: [
        'Try factoring: two numbers multiplying to $-1$ and adding to $-4$. There are none, so reach for the formula.',
        'Write down $a=1$, $b=-4$, $c=-1$ first.',
        'Work out $b^2-4ac = 16 + 4 = 20$ on its own.',
        '$\\sqrt{20} = 2\\sqrt5$, and every term then divides by $2$ — simplify at the end.'
      ],
      solution: [
        { text: 'Note the coefficients.', math: 'a=1,\\quad b=-4,\\quad c=-1' },
        { text: 'The discriminant.', math: 'D = 16 + 4 = 20 > 0' },
        { text: 'Substitute, then simplify the root.', math: 'x = \\frac{4 \\pm \\sqrt{20}}{2} = \\frac{4 \\pm 2\\sqrt5}{2}' },
        { text: 'Every term divides by $2$.', math: '= 2 \\pm \\sqrt5' }
      ],
      answerText: '$x = 2 \\pm \\sqrt5$',
      checklist: ['Try factoring first.', 'Write down $a$, $b$, $c$.', 'Work out $b^2-4ac$ on its own.', 'Simplify the root, then cancel the common factor.']
    },
    {
      id: 'mid3-q5', part: 1, marks: 10, topic: '1.8',
      prompt: '**Q5.** Find all solutions of $|5x+3| \\ge 2$.',
      answer: { type: 'interval', value: '(-inf, -1] U [-1/5, inf)', vars: ['x'] },
      hints: [
        '"Greater than" with bars means **outside**, not between — so it splits into two separate inequalities joined by "or".',
        'Write $5x+3 \\ge 2$ **or** $5x+3 \\le -2$. Note the sign flips in the second one.',
        'Solve each on its own. Dividing by $5$ is dividing by a positive, so nothing flips.',
        'The answer is two pieces joined with $\\cup$, not one interval.'
      ],
      solution: [
        { text: 'Greater than splits into two.', math: '5x+3 \\ge 2 \\quad\\text{or}\\quad 5x+3 \\le -2' },
        { text: 'Solve the first.', math: '5x \\ge -1 \\;\\Rightarrow\\; x \\ge -\\tfrac15' },
        { text: 'Solve the second.', math: '5x \\le -5 \\;\\Rightarrow\\; x \\le -1' },
        { text: 'Join the two pieces.', math: 'S = (-\\infty, -1] \\cup \\left[-\\tfrac15, \\infty\\right)' }
      ],
      answerText: '$S = (-\\infty,-1] \\cup \\left[-\\tfrac15,\\infty\\right)$',
      checklist: ['$|A|\\ge c$ means outside: two inequalities joined by "or".', 'Flip the sign in the second one.', 'Solve each separately.', 'Join the pieces with $\\cup$.']
    },
    {
      id: 'mid3-q6a', part: 1, marks: 7, topic: '1.9',
      prompt: '**Q6(a).** Let $A(4,2)$ and $B(5,-3)$. Find the distance between $A$ and $B$.',
      answer: { type: 'number', value: Math.sqrt(26) },
      hints: [
        'Distance between two points is Pythagoras on the right triangle joining them.',
        'Work out the step across and the step up: $5-4 = 1$ and $-3-2 = -5$.',
        'Square both (so the minus disappears), add, then take the root.'
      ],
      solution: [
        { text: 'Use the distance formula.', math: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}' },
        { text: 'Substitute the two points.', math: '= \\sqrt{(5-4)^2 + (-3-2)^2} = \\sqrt{1 + 25}' },
        { text: '$26$ has no square factor, so it will not simplify.', math: '= \\sqrt{26}' }
      ],
      answerText: '$\\sqrt{26}$',
      checklist: ['Find the step across and the step up.', 'Square both — minus signs disappear.', 'Add them, then square-root.', 'Simplify the root only if it has a square factor.']
    },
    {
      id: 'mid3-q6b', part: 1, marks: 8, topic: '1.9',
      prompt: '**Q6(b).** Find the midpoint of the segment joining $A(4,2)$ and $B(5,-3)$.',
      answer: { type: 'point', value: [4.5, -0.5] },
      hints: [
        'A midpoint is just an average — do the $x$s and the $y$s separately.',
        'The $x$ of the midpoint is $\\dfrac{4+5}{2}$.',
        'The $y$ is $\\dfrac{2+(-3)}{2}$ — careful with the minus.'
      ],
      solution: [
        { text: 'Average the coordinates separately.', math: 'M = \\left(\\frac{x_1+x_2}{2},\\ \\frac{y_1+y_2}{2}\\right)' },
        { text: 'Substitute.', math: '= \\left(\\frac{4+5}{2},\\ \\frac{2-3}{2}\\right) = \\left(\\frac92, -\\frac12\\right)' }
      ],
      answerText: '$M\\left(\\tfrac92, -\\tfrac12\\right)$',
      checklist: ['Average the two $x$ values.', 'Average the two $y$ values.', 'Keep track of minus signs.', 'Write the answer as a point.']
    },
    {
      id: 'mid3-q7', part: 1, marks: 10, topic: '1.10',
      prompt: '**Q7.** Find an equation of the line through $P(1,3)$ and $Q(-1,-4)$.',
      answer: { type: 'equation', value: '7*x - 2*y - 1 = 0', vars: ['x', 'y'], form: 'integer-coefficients' },
      hints: [
        'Two points means slope first. Subtract in the same order on top and bottom.',
        '$m = \\dfrac{-4-3}{-1-1} = \\dfrac{-7}{-2} = \\dfrac72$. Two negatives make a positive.',
        'Use $y-y_1 = m(x-x_1)$ with $(1,3)$.',
        'Multiply through by $2$ to clear the fraction, then collect onto one side.'
      ],
      solution: [
        { text: 'Find the slope.', math: 'm = \\frac{-4-3}{-1-1} = \\frac{-7}{-2} = \\frac72' },
        { text: 'Point-slope through $(1,3)$.', math: 'y - 3 = \\tfrac72(x-1)' },
        { text: 'Clear the fraction.', math: '2y - 6 = 7x - 7' },
        { text: 'Collect onto one side.', math: '7x - 2y - 1 = 0' }
      ],
      answerText: '$7x - 2y - 1 = 0$',
      checklist: ['Slope first, subtracting in the same order.', 'Two negatives divided give a positive.', 'Put a point and the slope into $y-y_1=m(x-x_1)$.', 'Clear fractions and collect onto one side.']
    },

    // --------------------------------------------------------------- Part II
    {
      id: 'mid3-q8', part: 2, marks: 2, topic: '1.1',
      prompt: '**Q8.** Simplify $\\left|4 - \\sqrt{17}\\right| + 2$.',
      answer: {
        type: 'choice', value: 'c',
        options: [{ id: 'a', label: '$6 - \\sqrt{17}$' }, { id: 'b', label: '$-2 - \\sqrt{17}$' }, { id: 'c', label: '$\\sqrt{17} - 2$' }, { id: 'd', label: '$6 + \\sqrt{17}$' }],
        wrongMessage: 'Not quite. Is $\\sqrt{17}$ bigger or smaller than $4$? That decides what the bars do.'
      },
      hints: [
        'The bars need one decision: is the inside positive or negative? So is $\\sqrt{17}$ bigger or smaller than $4$?',
        '$4^2 = 16$ and $17 > 16$, so $\\sqrt{17} > 4$ — which makes $4-\\sqrt{17}$ negative.',
        'Negative inside means the bars flip the sign: $|4-\\sqrt{17}| = \\sqrt{17}-4$. Now add the $2$.'
      ],
      solution: [
        { text: 'Since $17 > 16$, $\\sqrt{17} > 4$, so the inside is negative and the bars flip it.', math: '|4-\\sqrt{17}| = \\sqrt{17} - 4' },
        { text: 'Add the $2$.', math: '\\sqrt{17} - 4 + 2 = \\sqrt{17} - 2' }
      ],
      answerText: '(c) $\\sqrt{17}-2$'
    },
    {
      id: 'mid3-q9', part: 2, marks: 2, topic: '1.2',
      prompt: '**Q9.** Simplify $\\sqrt{18} - 3\\sqrt{50}$.',
      answer: {
        type: 'choice', value: 'a',
        options: [{ id: 'a', label: '$-12\\sqrt{2}$' }, { id: 'b', label: '$-4\\sqrt{2}$' }, { id: 'c', label: '$-5$' }, { id: 'd', label: '$-\\sqrt{2}$' }],
        wrongMessage: 'Not quite. Simplify each root first, then subtract — and do not forget the $3$ multiplies the whole thing.'
      },
      hints: [
        'Simplify each root on its own first. Look for the biggest perfect square inside each.',
        '$18 = 9\\times 2$, so $\\sqrt{18} = 3\\sqrt2$. And $50 = 25\\times 2$, so $\\sqrt{50} = 5\\sqrt2$.',
        'Careful: the second term is $3\\sqrt{50} = 3 \\times 5\\sqrt2 = 15\\sqrt2$, not $5\\sqrt2$.'
      ],
      solution: [
        { text: 'Simplify each root.', math: '\\sqrt{18} = 3\\sqrt2, \\qquad \\sqrt{50} = 5\\sqrt2' },
        { text: 'Substitute, remembering the $3$ out front.', math: '3\\sqrt2 - 3(5\\sqrt2) = 3\\sqrt2 - 15\\sqrt2' },
        { text: 'Both have $\\sqrt2$, so subtract the numbers in front.', math: '= -12\\sqrt2' }
      ],
      answerText: '(a) $-12\\sqrt2$'
    },
    {
      id: 'mid3-q10', part: 2, marks: 2, topic: '1.3',
      prompt: '**Q10.** Find the product $\\left(a - \\sqrt{a^2+b}\\right)\\left(a + \\sqrt{a^2+b}\\right)$.',
      answer: {
        type: 'choice', value: 'c',
        options: [{ id: 'a', label: '$2a^2 - b$' }, { id: 'b', label: '$b$' }, { id: 'c', label: '$-b$' }, { id: 'd', label: '$a^2 - a^4 + b^2$' }],
        wrongMessage: 'Not quite. This is $(A-B)(A+B)$ — squaring a square root just removes it.'
      },
      hints: [
        'Do not multiply term by term. Look at the shape: $(A-B)(A+B)$, which is always $A^2-B^2$.',
        'Here $A = a$ and $B = \\sqrt{a^2+b}$. Squaring a square root simply removes it.',
        'So you get $a^2 - (a^2+b)$. Watch the bracket — the minus applies to both terms inside.'
      ],
      solution: [
        { text: 'Use $(A-B)(A+B) = A^2-B^2$ with $A=a$, $B=\\sqrt{a^2+b}$.', math: 'a^2 - \\left(\\sqrt{a^2+b}\\right)^2' },
        { text: 'Squaring undoes the root.', math: '= a^2 - (a^2+b)' },
        { text: 'The minus applies to both terms inside the bracket.', math: '= a^2 - a^2 - b = -b' }
      ],
      answerText: '(c) $-b$'
    },
    {
      id: 'mid3-q11', part: 2, marks: 2, topic: '1.3',
      prompt: '**Q11.** Expand $(x+3)^3$.',
      answer: {
        type: 'choice', value: 'c',
        options: [{ id: 'a', label: '$x^3 + 27$' }, { id: 'b', label: '$x^3 + 9x^2 + 9x + 27$' }, { id: 'c', label: '$x^3 + 9x^2 + 27x + 27$' }, { id: 'd', label: '$x^3 + 9x^2 + 18x + 27$' }],
        wrongMessage: 'Not quite. Check with $x=1$: the original is $4^3 = 64$, so the terms must add to $64$.'
      },
      hints: [
        'Use $(A+B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$ with $A=x$ and $B=3$.',
        'The middle terms are $3x^2(3) = 9x^2$ and $3x(3^2) = 27x$.',
        'Quick check: put $x=1$. The original is $4^3 = 64$, so the right answer must total $64$.'
      ],
      solution: [
        { text: 'Apply the cube pattern with $A=x$, $B=3$.', math: 'x^3 + 3x^2(3) + 3x(3)^2 + 3^3' },
        { text: 'Work each term out.', math: '= x^3 + 9x^2 + 27x + 27' },
        { text: 'Check with $x=1$: $1+9+27+27 = 64 = 4^3$. ✓' }
      ],
      answerText: '(c) $x^3+9x^2+27x+27$'
    },
    {
      id: 'mid3-q12', part: 2, marks: 2, topic: '1.4',
      prompt: '**Q12.** Simplify $\\dfrac{x-9}{x^2-9} \\div \\dfrac{x^2-11x+18}{2x^2+5x-3}$.',
      answer: {
        type: 'choice', value: 'a',
        options: [{ id: 'a', label: '$\\dfrac{2x-1}{(x-3)(x-2)}$' }, { id: 'b', label: '$\\dfrac{2x+1}{(x+3)(x-2)}$' }, { id: 'c', label: '$\\dfrac{(2x+1)(x+3)}{(x+9)(x-2)}$' }, { id: 'd', label: '$\\dfrac{1}{x+3}$' }],
        wrongMessage: 'Not quite. Flip the second fraction first, then factor everything before cancelling.'
      },
      hints: [
        'Flip the second fraction and multiply, before factoring anything.',
        'Factor each piece: $x^2-9=(x-3)(x+3)$, $x^2-11x+18=(x-9)(x-2)$, $2x^2+5x-3=(2x-1)(x+3)$.',
        'Now cancel $(x-9)$ and $(x+3)$ across the product.'
      ],
      solution: [
        { text: 'Flip and multiply.', math: '\\frac{x-9}{x^2-9}\\cdot\\frac{2x^2+5x-3}{x^2-11x+18}' },
        { text: 'Factor everything.', math: '= \\frac{x-9}{(x-3)(x+3)}\\cdot\\frac{(2x-1)(x+3)}{(x-9)(x-2)}' },
        { text: 'Cancel $(x-9)$ and $(x+3)$.', math: '= \\frac{2x-1}{(x-3)(x-2)}' }
      ],
      answerText: '(a) $\\dfrac{2x-1}{(x-3)(x-2)}$'
    },
    {
      id: 'mid3-q13', part: 2, marks: 2, topic: '1.5',
      prompt: '**Q13.** Find the solution of $\\dfrac{x+1}{2} - \\dfrac{5}{3} = 2 - x$.',
      answer: {
        type: 'choice', value: 'b',
        options: [{ id: 'a', label: '$\\dfrac{9}{19}$' }, { id: 'b', label: '$\\dfrac{19}{9}$' }, { id: 'c', label: '$\\dfrac{22}{3}$' }, { id: 'd', label: '$\\dfrac{9}{4}$' }],
        wrongMessage: 'Not quite. Multiply **every** term by $6$ — including the ones on the right.'
      },
      hints: [
        'Fractions in the way. Multiply every single term by the common bottom of $2$ and $3$, which is $6$.',
        'Do not forget the right-hand side: $6(2-x) = 12 - 6x$.',
        'You should get $3(x+1) - 10 = 12 - 6x$. Expand and collect the $x$s on one side.'
      ],
      solution: [
        { text: 'Multiply every term by $6$.', math: '3(x+1) - 10 = 12 - 6x' },
        { text: 'Expand the bracket.', math: '3x + 3 - 10 = 12 - 6x' },
        { text: 'Collect.', math: '3x - 7 = 12 - 6x \\;\\Rightarrow\\; 9x = 19' },
        { text: 'Divide.', math: 'x = \\tfrac{19}{9}' }
      ],
      answerText: '(b) $\\dfrac{19}{9}$'
    },
    {
      id: 'mid3-q14', part: 2, marks: 2, topic: '1.8',
      prompt: '**Q14.** Find all solutions of $\\dfrac{x-1}{x-3} \\le 0$.',
      answer: {
        type: 'choice', value: 'd',
        options: [{ id: 'a', label: '$(1,3)$' }, { id: 'b', label: '$(-\\infty,1]\\cup(3,\\infty)$' }, { id: 'c', label: '$(-\\infty,1)\\cup(3,\\infty)$' }, { id: 'd', label: '$[1,3)$' }],
        wrongMessage: 'Not quite. A fraction is negative between its two zeros — and the endpoints are not treated the same.'
      },
      hints: [
        'The zeros are $x=1$ (top) and $x=3$ (bottom). They cut the line into three regions.',
        'Test a point in each: $x=0$ gives $\\tfrac{-1}{-3} > 0$; $x=2$ gives $\\tfrac{1}{-1} < 0$; $x=4$ gives $\\tfrac{3}{1} > 0$.',
        'Only the middle region works. Now the endpoints: $x=1$ makes the top zero, which is allowed with $\\le$. $x=3$ makes the bottom zero, which never is.'
      ],
      solution: [
        { text: 'Zeros at $1$ (top) and $3$ (bottom).' },
        { text: 'Testing shows the fraction is negative only between them.' },
        { text: 'Include $1$ (top zero, and the sign is $\\le$); exclude $3$ (bottom zero, never allowed).', math: 'S = [1, 3)' }
      ],
      answerText: '(d) $[1,3)$'
    },
    {
      id: 'mid3-q15', part: 2, marks: 2, topic: '1.9',
      prompt: '**Q15.** Find the $x$-intercept of the graph of $y = \\sqrt{x+4}$.',
      answer: {
        type: 'choice', value: 'a',
        options: [{ id: 'a', label: '$-4$' }, { id: 'b', label: '$2$' }, { id: 'c', label: '$\\pm 2$' }, { id: 'd', label: 'no $x$-intercept' }],
        wrongMessage: 'Not quite. For an $x$-intercept, set $y=0$ — not $x$.'
      },
      hints: [
        'An $x$-intercept is where the graph crosses the $x$-axis, and on that axis $y = 0$.',
        'So set $\\sqrt{x+4} = 0$.',
        'A square root is zero only when the inside is zero.'
      ],
      solution: [
        { text: 'Set $y=0$.', math: '\\sqrt{x+4} = 0' },
        { text: 'A root is zero only when its inside is zero.', math: 'x + 4 = 0 \\;\\Rightarrow\\; x = -4' }
      ],
      answerText: '(a) $-4$'
    },
    {
      id: 'mid3-q16', part: 2, marks: 2, topic: '1.9',
      prompt: '**Q16.** Find an equation of the circle with centre $(-2,5)$ and radius $\\sqrt7$.',
      answer: {
        type: 'choice', value: 'd',
        options: [{ id: 'a', label: '$(x-2)^2+(y+5)^2=7$' }, { id: 'b', label: '$(x+2)^2+(y-5)^2=\\sqrt7$' }, { id: 'c', label: '$(x+2)^2+(y-5)^2=49$' }, { id: 'd', label: '$(x+2)^2+(y-5)^2=7$' }],
        wrongMessage: 'Not quite. Check two things: the signs inside the brackets, and that the right-hand side is $r^2$.'
      },
      hints: [
        'Start from $(x-h)^2 + (y-k)^2 = r^2$ with $(h,k) = (-2,5)$.',
        'Subtracting $-2$ gives $+2$, so the first bracket is $(x+2)$. Subtracting $5$ gives $(y-5)$.',
        'The right-hand side is $r^2$, and $r = \\sqrt7$, so $r^2 = 7$ — not $\\sqrt7$ and not $49$.'
      ],
      solution: [
        { text: 'Substitute the centre, watching the signs.', math: '(x-(-2))^2 + (y-5)^2 = (x+2)^2 + (y-5)^2' },
        { text: 'Square the radius.', math: 'r^2 = (\\sqrt7)^2 = 7' },
        { text: 'Put it together.', math: '(x+2)^2+(y-5)^2 = 7' }
      ],
      answerText: '(d) $(x+2)^2+(y-5)^2=7$'
    },
    {
      id: 'mid3-q17', part: 2, marks: 2, topic: '1.10',
      prompt: '**Q17.** Which of the following pairs of lines are parallel?',
      answer: {
        type: 'choice', value: 'b',
        options: [
          { id: 'a', label: '$x+3y+1=0$ and $3x-y+1=0$' },
          { id: 'b', label: '$2x+y+2=0$ and $6x+3y-5=0$' },
          { id: 'c', label: '$x-3y+3=0$ and $3x-y+4=0$' },
          { id: 'd', label: '$x=2$ and $y=2$' }
        ],
        wrongMessage: 'Not quite. Rearrange each to $y=mx+b$ and compare the slopes — parallel means they match exactly.'
      },
      hints: [
        'Parallel means the **same** slope, so find the slope of each line by rearranging to $y = mx + b$.',
        'For (b): $2x+y+2=0$ gives $y=-2x-2$, slope $-2$. And $6x+3y-5=0$ gives $3y=-6x+5$, so $y=-2x+\\tfrac53$, slope $-2$.',
        'Check the others too: (a) and (c) give slopes that multiply to $-1$, which is perpendicular, not parallel. In (d) one line is vertical and the other horizontal.'
      ],
      solution: [
        { text: 'Rearrange each pair and compare slopes.' },
        { text: '(b) gives $y=-2x-2$ and $y=-2x+\\tfrac53$ — the same slope $-2$, so they are parallel.' },
        { text: '(a) has slopes $-\\tfrac13$ and $3$, and (c) has $\\tfrac13$ and $3$: those multiply to $-1$, so they are perpendicular. (d) is a vertical and a horizontal line.' }
      ],
      answerText: '(b) $2x+y+2=0$ and $6x+3y-5=0$'
    }
  ]
});
