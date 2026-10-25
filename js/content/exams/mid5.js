/* Past paper: Math 091 Pre-Calculus, first exam (version 5).
   Handwritten working rather than an official key, and two of those answers do not
   check out — flagged on the questions concerned rather than silently replaced. */
CH.registerExam({
  id: 'mid5',
  title: 'First exam — version 5',
  blurb: 'Five questions in parts, covering sets, exponents, fractions, inequalities and circles.',
  questions: [
    {
      id: 'mid5-q1ai', part: 1, marks: 5, topic: '1.1',
      prompt: '**Q1(a)(i).** Evaluate $\\dfrac{\\;\\dfrac{2}{5} - \\dfrac{3}{10}\\;}{\\;\\dfrac{1}{2} + \\dfrac{2}{5}\\;}$.',
      answer: { type: 'number', value: 1 / 9 },
      hints: [
        'Make the top one fraction and the bottom one fraction before dividing.',
        'Top: common bottom $10$, giving $\\tfrac{4}{10} - \\tfrac{3}{10} = \\tfrac{1}{10}$.',
        'Bottom: common bottom $10$, giving $\\tfrac{5}{10} + \\tfrac{4}{10} = \\tfrac{9}{10}$.',
        'Both are over $10$, so dividing them cancels the tens completely.'
      ],
      solution: [
        { text: 'Combine the top over $10$.', math: '\\frac{2}{5} - \\frac{3}{10} = \\frac{4-3}{10} = \\frac{1}{10}' },
        { text: 'Combine the bottom over $10$.', math: '\\frac{1}{2} + \\frac{2}{5} = \\frac{5+4}{10} = \\frac{9}{10}' },
        { text: 'Flip and multiply — the tens cancel.', math: '\\frac{1}{10}\\cdot\\frac{10}{9} = \\frac{1}{9}' }
      ],
      answerText: '$\\dfrac{1}{9}$',
      checklist: ['Make the top a single fraction.', 'Make the bottom a single fraction.', 'Flip the bottom and multiply.', 'Cancel before multiplying out.']
    },
    {
      id: 'mid5-q1aii', part: 1, marks: 5, topic: '1.8',
      prompt: '**Q1(a)(ii).** Solve $|x-3| > -4$.',
      answer: { type: 'interval', value: '(-inf, inf)', vars: ['x'] },
      hints: [
        'Do not start solving. Look at the right-hand side first — it is **negative**.',
        'The bars measure a size, and a size is never negative. So $|x-3|$ is always $\\ge 0$.',
        'Something that is always at least $0$ is certainly always bigger than $-4$. So which values of $x$ work?'
      ],
      solution: [
        { text: '$|x-3|$ is a distance, so it is never negative: $|x-3| \\ge 0$ for every $x$.' },
        { text: 'Every number that is $\\ge 0$ is automatically $> -4$, so the inequality holds no matter what $x$ is.' },
        { text: 'Every real number is a solution.', math: 'S = (-\\infty, \\infty) = \\mathbb{R}' }
      ],
      answerText: 'All real numbers, $(-\\infty,\\infty)$',
      checklist: ['Check the sign of the other side before solving.', 'A size is never negative.', 'Bigger than a negative: every number works.', 'Less than a negative: no number works.']
    },
    {
      id: 'mid5-q1bi', part: 1, marks: 5, topic: '1.1',
      prompt: '**Q1(b)(i).** Let $A = \\{x: -3 < x \\le 8,\\ x \\text{ a natural number}\\}$ and $B = \\{x: 1 \\le x < 7,\\ x \\text{ an odd integer}\\}$. Find $A \\cup B$.',
      answer: { type: 'set', value: [1, 2, 3, 4, 5, 6, 7, 8], vars: ['x'] },
      note: 'The handwritten copy answers $(-3,8]$ for the union and $[1,7)$ for the intersection. Those are intervals — every number in a stretch of the line. But both $A$ and $B$ are restricted to **whole numbers**, so they are lists, and the answers should be written with curly brackets, not round ones.',
      hints: [
        'Write each set out as an actual list first. The words "natural number" and "odd integer" do most of the work.',
        '$A$: natural numbers bigger than $-3$ and up to $8$. Naturals start at $1$, so $A = \\{1,2,3,4,5,6,7,8\\}$.',
        '$B$: odd integers from $1$ up to (not including) $7$, so $B = \\{1,3,5\\}$.',
        'Union means everything in either list, with nothing written twice.'
      ],
      solution: [
        { text: 'List $A$. Natural numbers start at $1$, so the $-3$ never bites.', math: 'A = \\{1,2,3,4,5,6,7,8\\}' },
        { text: 'List $B$: odd integers with $1 \\le x < 7$.', math: 'B = \\{1,3,5\\}' },
        { text: 'The union is everything in either list. Every element of $B$ is already in $A$.', math: 'A \\cup B = \\{1,2,3,4,5,6,7,8\\}' }
      ],
      answerText: '$A \\cup B = \\{1,2,3,4,5,6,7,8\\}$',
      checklist: ['Write each set out as a list first.', 'Check what kind of number is allowed — natural, integer, odd.', 'Union: everything in either list, written once.', 'Use curly brackets for lists, round ones only for intervals.']
    },
    {
      id: 'mid5-q1bii', part: 1, marks: 5, topic: '1.1',
      prompt: '**Q1(b)(ii).** With the same $A$ and $B$, find $A \\cap B$.',
      answer: { type: 'set', value: [1, 3, 5], vars: ['x'] },
      hints: [
        'Use the same two lists: $A = \\{1,\\ldots,8\\}$ and $B = \\{1,3,5\\}$.',
        'Intersection means only the things in **both** lists.',
        'Check each element of $B$ in turn — is it also in $A$?'
      ],
      solution: [
        { text: 'The two lists are $A=\\{1,2,3,4,5,6,7,8\\}$ and $B=\\{1,3,5\\}$.' },
        { text: 'Keep only what appears in both. Every element of $B$ happens to be in $A$.', math: 'A \\cap B = \\{1,3,5\\}' }
      ],
      answerText: '$A \\cap B = \\{1,3,5\\}$',
      checklist: ['Write both sets as lists.', 'Intersection: keep only what is in both.', 'Go through the shorter list and check each one.', 'Curly brackets, not round.']
    },
    {
      id: 'mid5-q2ai', part: 1, marks: 5, topic: '1.2',
      prompt: '**Q2(a)(i).** Simplify $\\left(\\dfrac{a^4c^3}{b^2}\\right)^{-1}\\left(\\dfrac{c^2b^3}{a^{-2}}\\right)^{2}$.',
      answer: { type: 'expression', value: 'b^8*c', vars: ['a', 'b', 'c'], form: 'positive-exponents' },
      hints: [
        'A power of $-1$ just turns the fraction upside down. Do that first.',
        'So the first part is $\\dfrac{b^2}{a^4c^3}$.',
        'In the second, $a^{-2}$ on the bottom moves up top: $\\dfrac{c^2b^3}{a^{-2}} = a^2c^2b^3$. Then square it.',
        'Multiply and collect each letter — the $a$ powers cancel exactly.'
      ],
      solution: [
        { text: 'A power of $-1$ flips the fraction.', math: '\\left(\\frac{a^4c^3}{b^2}\\right)^{-1} = \\frac{b^2}{a^4c^3}' },
        { text: 'Move $a^{-2}$ up, then square.', math: '\\left(a^2c^2b^3\\right)^{2} = a^4c^4b^6' },
        { text: 'Multiply and collect.', math: '\\frac{b^2}{a^4c^3}\\cdot a^4c^4b^6 = b^{8}c^{1}' }
      ],
      answerText: '$b^8c$',
      checklist: ['A power of $-1$ flips the fraction.', 'Move negative powers across the bar before applying outside powers.', 'Multiply the parts together.', 'Add the powers of each letter separately.']
    },
    {
      id: 'mid5-q2aii', part: 1, marks: 5, topic: '1.2',
      prompt: '**Q2(a)(ii).** Simplify $\\sqrt[3]{16} + \\sqrt[3]{54}$.',
      answer: { type: 'expression', value: '5*2^(1/3)', vars: [] },
      hints: [
        'Simplify each cube root on its own first — look for the biggest perfect **cube** inside each.',
        '$16 = 8 \\times 2$ and $8 = 2^3$, so $\\sqrt[3]{16} = 2\\sqrt[3]{2}$.',
        '$54 = 27 \\times 2$ and $27 = 3^3$, so $\\sqrt[3]{54} = 3\\sqrt[3]{2}$.',
        'Both now have $\\sqrt[3]{2}$ left inside, so they can be added.'
      ],
      solution: [
        { text: 'Pull the perfect cube out of each.', math: '\\sqrt[3]{16} = \\sqrt[3]{8\\cdot 2} = 2\\sqrt[3]{2}' },
        { text: 'And the second.', math: '\\sqrt[3]{54} = \\sqrt[3]{27\\cdot 2} = 3\\sqrt[3]{2}' },
        { text: 'Same thing left inside, so add the numbers in front.', math: '2\\sqrt[3]{2} + 3\\sqrt[3]{2} = 5\\sqrt[3]{2}' }
      ],
      answerText: '$5\\sqrt[3]{2}$',
      checklist: ['Simplify each root on its own first.', 'For a cube root, hunt for a perfect cube ($8$, $27$, $64$).', 'Only roots with the same thing inside can be added.', 'Add the numbers in front; keep the root.']
    },
    {
      id: 'mid5-q2b', part: 1, marks: 10, topic: '1.3',
      prompt: '**Q2(b).** Factor completely: $3x^3 - x^2 - 12x + 4$.',
      answer: { type: 'expression', value: '(3*x-1)*(x-2)*(x+2)', vars: ['x'], form: 'factored' },
      hints: [
        'Four terms — group them into two pairs.',
        'Pair as $(3x^3-x^2)$ and $(-12x+4)$. Factor each so the same bracket appears twice.',
        'The first gives $x^2(3x-1)$. From the second take out $-4$ to get $-4(3x-1)$.',
        'That leaves $(3x-1)(x^2-4)$, and $x^2-4$ is a difference of squares.'
      ],
      solution: [
        { text: 'Split into pairs.', math: '(3x^3 - x^2) + (-12x + 4)' },
        { text: 'Factor each pair, taking out $-4$ from the second so the brackets match.', math: 'x^2(3x-1) - 4(3x-1)' },
        { text: 'Take out the common bracket.', math: '= (3x-1)(x^2-4)' },
        { text: 'Difference of squares.', math: '= (3x-1)(x-2)(x+2)' }
      ],
      answerText: '$(3x-1)(x-2)(x+2)$',
      checklist: ['Four terms means grouping.', 'Factor each pair so the brackets match.', 'Choose the sign that makes them match.', 'Factor any bracket that still can be.']
    },
    {
      id: 'mid5-q3a', part: 1, marks: 10, topic: '1.4',
      prompt: '**Q3(a).** Simplify $\\dfrac{x^3+8}{2x^2+x} \\div \\dfrac{x^2-4}{2x^2-3x-2}$.',
      answer: { type: 'expression', value: '(x^2-2*x+4)/x', vars: ['x'] },
      hints: [
        'Flip the second fraction and multiply, then factor everything.',
        '$x^3+8$ is a sum of cubes: $(x+2)(x^2-2x+4)$. And $2x^2+x = x(2x+1)$.',
        '$x^2-4=(x-2)(x+2)$ and $2x^2-3x-2 = (2x+1)(x-2)$.',
        'Now cancel $(x+2)$, $(2x+1)$ and $(x-2)$ — almost everything goes.'
      ],
      solution: [
        { text: 'Flip and multiply.', math: '\\frac{x^3+8}{2x^2+x}\\cdot\\frac{2x^2-3x-2}{x^2-4}' },
        { text: 'Factor everything.', math: '= \\frac{(x+2)(x^2-2x+4)}{x(2x+1)}\\cdot\\frac{(2x+1)(x-2)}{(x-2)(x+2)}' },
        { text: 'Cancel $(x+2)$, $(2x+1)$ and $(x-2)$.', math: '= \\frac{x^2-2x+4}{x}' }
      ],
      answerText: '$\\dfrac{x^2-2x+4}{x}$',
      checklist: ['Flip the second fraction and multiply.', 'Factor everything, watching for a sum of cubes.', 'Cancel whole brackets.', 'Leave the answer tidy.']
    },
    {
      id: 'mid5-q3b', part: 1, marks: 10, topic: '1.5',
      prompt: '**Q3(b).** Find all real solutions of $x^2 + 6x - 3 = 0$ using the quadratic formula.',
      answer: { type: 'set', value: [-3 + 2 * Math.sqrt(3), -3 - 2 * Math.sqrt(3)], vars: ['x'] },
      hints: [
        'Write down $a=1$, $b=6$, $c=-3$ first.',
        'Work out $b^2-4ac = 36 + 12 = 48$ on its own.',
        '$48 = 16 \\times 3$, so $\\sqrt{48} = 4\\sqrt3$.',
        'Then $x = \\dfrac{-6 \\pm 4\\sqrt3}{2}$, and every term divides by $2$.'
      ],
      solution: [
        { text: 'Coefficients and discriminant.', math: 'a=1,\\ b=6,\\ c=-3;\\qquad D = 36 + 12 = 48' },
        { text: 'Simplify the root: $48 = 16\\cdot 3$.', math: '\\sqrt{48} = 4\\sqrt3' },
        { text: 'Substitute and divide every term by $2$.', math: 'x = \\frac{-6 \\pm 4\\sqrt3}{2} = -3 \\pm 2\\sqrt3' }
      ],
      answerText: '$x = -3 \\pm 2\\sqrt3$',
      checklist: ['Write down $a$, $b$, $c$.', 'Work out $b^2-4ac$ on its own.', 'Simplify the square root.', 'Divide every term by the common factor.']
    },
    {
      id: 'mid5-q4a', part: 1, marks: 10, topic: '1.8',
      prompt: '**Q4(a).** Solve $\\dfrac{x^2-4x-5}{x+3} > 0$.',
      answer: { type: 'interval', value: '(-3, -1) U (5, inf)', vars: ['x'] },
      hints: [
        'Zero is already on one side and it is a single fraction, so factor and find the zeros.',
        'The top factors as $(x+1)(x-5)$, so the zeros are $-1$, $5$ (top) and $-3$ (bottom).',
        'Mark all three on a number line and test one point in each of the four regions.',
        'The sign is strict ($>$), so no endpoint is included — and $-3$ could never be included anyway.'
      ],
      solution: [
        { text: 'Factor the top.', math: '\\frac{(x+1)(x-5)}{x+3} > 0' },
        { text: 'Zeros at $-3$ (bottom), $-1$ and $5$ (top).' },
        { text: 'Test each region: $x=-4$ gives $\\tfrac{(-3)(-9)}{-1}<0$; $x=-2$ gives $\\tfrac{(-1)(-7)}{1}>0$; $x=0$ gives $\\tfrac{(1)(-5)}{3}<0$; $x=6$ gives $\\tfrac{(7)(1)}{9}>0$.' },
        { text: 'Keep the positive regions; strict inequality so nothing is included.', math: 'S = (-3,-1) \\cup (5,\\infty)' }
      ],
      answerText: '$S = (-3,-1) \\cup (5,\\infty)$',
      checklist: ['Factor and find the zeros of top and bottom.', 'Mark them all on a line.', 'Test one point in each region.', 'A strict sign means no endpoints at all.']
    },
    {
      id: 'mid5-q4bi', part: 1, marks: 5, topic: '1.9',
      prompt: '**Q4(b)(i).** Let $A(3,-1)$ and $B(6,2)$. Find the midpoint of $AB$.',
      answer: { type: 'point', value: [4.5, 0.5] },
      hints: [
        'A midpoint is an average — do the $x$s and the $y$s separately.',
        'The $x$ is $\\dfrac{3+6}{2}$.',
        'The $y$ is $\\dfrac{-1+2}{2}$ — careful with the minus.'
      ],
      solution: [
        { text: 'Average each coordinate.', math: 'M = \\left(\\frac{3+6}{2},\\ \\frac{-1+2}{2}\\right)' },
        { text: 'Work them out.', math: '= \\left(\\frac92,\\ \\frac12\\right)' }
      ],
      answerText: '$M\\left(\\tfrac92, \\tfrac12\\right)$',
      checklist: ['Average the two $x$ values.', 'Average the two $y$ values.', 'Mind the minus signs.', 'Write it as a point.']
    },
    {
      id: 'mid5-q4bii', part: 1, marks: 5, topic: '1.9',
      prompt: '**Q4(b)(ii).** With the same $A(3,-1)$ and $B(6,2)$, find the distance between them.',
      answer: { type: 'number', value: 3 * Math.sqrt(2) },
      hints: [
        'Distance is Pythagoras: square the step across, square the step up, add, then root.',
        'Step across $6-3 = 3$; step up $2-(-1) = 3$.',
        '$\\sqrt{9+9} = \\sqrt{18}$ — and $18 = 9\\times 2$, so it simplifies.'
      ],
      solution: [
        { text: 'Find the two steps and square them.', math: 'd = \\sqrt{(6-3)^2 + (2-(-1))^2} = \\sqrt{9+9}' },
        { text: 'Simplify the root: $18 = 9\\cdot 2$.', math: '= \\sqrt{18} = 3\\sqrt2' }
      ],
      answerText: '$3\\sqrt2$',
      checklist: ['Work out the step across and the step up.', 'Square both, then add.', 'Take the square root.', 'Pull out any perfect square.']
    },
    {
      id: 'mid5-q5a', part: 1, marks: 10, topic: '1.9',
      prompt: '**Q5(a).** Find the centre and radius of the circle $x^2 + y^2 - 6x + 4y - 12 = 0$.',
      answer: {
        type: 'multi', parts: [
          { type: 'point', value: [3, -2], label: 'Centre' },
          { type: 'number', value: 5, label: 'Radius' }
        ]
      },
      note: 'The handwritten copy ends with $(x-3)^2+(y+2)^2 = 1$ and radius $1$. The $-12$ has gone missing: moving it across gives $+12$, so the right-hand side is $9+4+12 = 25$ and the radius is $5$.',
      hints: [
        'Group the $x$ terms together and the $y$ terms together, and move the plain number across to the right.',
        'That gives $(x^2-6x) + (y^2+4y) = 12$. Note the $-12$ becomes $+12$ when it moves.',
        'Complete the square on each group: half of $-6$ squared is $9$; half of $4$ squared is $4$. Add **both** to both sides.',
        'The right-hand side becomes $12+9+4 = 25$, so $r^2=25$.'
      ],
      solution: [
        { text: 'Group and move the number across.', math: '(x^2-6x) + (y^2+4y) = 12' },
        { text: 'Complete the square on each group, adding to both sides.', math: '(x-3)^2 - 9 + (y+2)^2 - 4 = 12' },
        { text: 'Tidy: the $9$ and $4$ move across and add to the $12$.', math: '(x-3)^2 + (y+2)^2 = 25' },
        { text: 'Read off the centre (signs flip) and the radius.', math: '\\text{centre }(3,-2),\\qquad r = \\sqrt{25} = 5' }
      ],
      answerText: 'Centre $(3,-2)$, radius $5$',
      checklist: ['Group the $x$s and the $y$s; move the number to the right.', 'Complete the square on each group.', 'Add what you added to **both** sides.', 'Signs flip when reading the centre; square-root for the radius.']
    },
    {
      id: 'mid5-q5b', part: 1, marks: 10, topic: '1.10',
      prompt: '**Q5(b).** Find an equation of the line through $A(7,3)$ parallel to $y = 2x - 3$.',
      answer: { type: 'equation', value: 'y = 2*x - 11', vars: ['x', 'y'] },
      hints: [
        'The given line is already in $y = mx+b$ form, so its slope can be read straight off.',
        'The number multiplying $x$ is $2$, so the slope is $2$ — and parallel means the same slope.',
        'Use $y - 3 = 2(x - 7)$, then tidy into $y = mx + b$.'
      ],
      solution: [
        { text: 'Read the slope straight off $y = 2x-3$.', math: 'm = 2' },
        { text: 'Parallel means the same slope, through $(7,3)$.', math: 'y - 3 = 2(x-7)' },
        { text: 'Expand and tidy.', math: 'y = 2x - 14 + 3 = 2x - 11' }
      ],
      answerText: '$y = 2x - 11$',
      checklist: ['If the line is already $y=mx+b$, read the slope off.', 'Parallel means the same slope.', 'Use $y-y_1=m(x-x_1)$.', 'Expand and tidy into the form asked for.']
    }
  ]
});
