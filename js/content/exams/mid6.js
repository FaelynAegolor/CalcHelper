/* Past paper: Math 091 Pre-Calculus, first exam (version 6).
   This paper came with no solutions at all, so every answer here was worked out and
   then checked by the site's own answer checker. */
CH.registerExam({
  id: 'mid6',
  title: 'First exam — version 6',
  blurb: 'Five questions in parts. No solutions came with this paper — these were worked out and checked here.',
  questions: [
    {
      id: 'mid6-q1a', part: 1, marks: 10, topic: '1.2',
      prompt: '**Q1(a).** Simplify $\\left(27x^6y^{-12}\\right)^{1/3}\\left(3x^{-2}y^{5}\\right)^{-2}$.',
      answer: { type: 'expression', value: 'x^6/(3*y^14)', vars: ['x', 'y'], form: 'positive-exponents' },
      hints: [
        'Take each bracket separately. A power of $\\tfrac13$ is a cube root — including of the number.',
        '$\\sqrt[3]{27} = 3$, and each power inside is divided by $3$: $x^6 \\to x^2$, $y^{-12} \\to y^{-4}$.',
        'For the second, a power of $-2$ squares everything and then flips it: $(3x^{-2}y^5)^{-2} = \\dfrac{x^4}{9y^{10}}$.',
        'Multiply and collect. The numbers give $\\tfrac39 = \\tfrac13$, and the $y$ powers add to $-14$.'
      ],
      solution: [
        { text: 'Cube-root the first bracket.', math: '\\left(27x^6y^{-12}\\right)^{1/3} = 3x^2y^{-4}' },
        { text: 'The $-2$ squares everything and flips it.', math: '\\left(3x^{-2}y^{5}\\right)^{-2} = \\frac{1}{9x^{-4}y^{10}} = \\frac{x^4}{9y^{10}}' },
        { text: 'Multiply and collect each letter.', math: '3x^2y^{-4}\\cdot\\frac{x^4}{9y^{10}} = \\frac{3x^6}{9y^{14}}' },
        { text: 'Tidy the numbers.', math: '= \\frac{x^6}{3y^{14}}' }
      ],
      answerText: '$\\dfrac{x^6}{3y^{14}}$',
      checklist: ['Handle each bracket separately.', 'A power of $\\tfrac1n$ is an $n$th root, of the number too.', 'A negative power flips after applying the size of the power.', 'Collect each letter; make every power positive.']
    },
    {
      id: 'mid6-q1bi', part: 1, marks: 5, topic: '1.1',
      prompt: '**Q1(b)(i).** Let $A = \\{x: x \\in \\mathbb{Z},\\ -2 \\le x < 6\\}$ and $B = \\{y: y \\in \\mathbb{N},\\ y \\text{ odd},\\ 0 < y \\le 10\\}$. Find $A \\cap B$.',
      answer: { type: 'set', value: [1, 3, 5], vars: ['x'] },
      hints: [
        'Write both sets out as lists first — the symbols $\\mathbb{Z}$ (integers) and $\\mathbb{N}$ (naturals) tell you what kind of number is allowed.',
        '$A$: integers from $-2$ up to but not including $6$, so $A = \\{-2,-1,0,1,2,3,4,5\\}$.',
        '$B$: odd naturals from $1$ to $10$, so $B = \\{1,3,5,7,9\\}$.',
        'Intersection keeps only what is in both — so check which of $1,3,5,7,9$ are below $6$.'
      ],
      solution: [
        { text: 'List $A$ — integers, so negatives are allowed.', math: 'A = \\{-2,-1,0,1,2,3,4,5\\}' },
        { text: 'List $B$ — odd natural numbers up to $10$.', math: 'B = \\{1,3,5,7,9\\}' },
        { text: 'Keep only what appears in both. $7$ and $9$ are too big for $A$.', math: 'A \\cap B = \\{1,3,5\\}' }
      ],
      answerText: '$A \\cap B = \\{1,3,5\\}$',
      checklist: ['Write each set out as a list.', '$\\mathbb{Z}$ allows negatives; $\\mathbb{N}$ starts at $1$.', 'Watch $<$ versus $\\le$ at each end.', 'Intersection: only what is in both.']
    },
    {
      id: 'mid6-q1bii', part: 1, marks: 5, topic: '1.1',
      prompt: '**Q1(b)(ii).** With the same $A$ and $B$, find $A \\cup B$.',
      answer: { type: 'set', value: [-2, -1, 0, 1, 2, 3, 4, 5, 7, 9], vars: ['x'] },
      hints: [
        'Use the same two lists: $A = \\{-2,\\ldots,5\\}$ and $B = \\{1,3,5,7,9\\}$.',
        'Union means everything in either list, each written once.',
        'Start with all of $A$, then add anything from $B$ that is not already there — that is $7$ and $9$.'
      ],
      solution: [
        { text: 'Start with every element of $A$.', math: '\\{-2,-1,0,1,2,3,4,5\\}' },
        { text: 'Add anything from $B$ not already present: $7$ and $9$.', math: 'A \\cup B = \\{-2,-1,0,1,2,3,4,5,7,9\\}' },
        { text: 'Note $6$ and $8$ are in neither — $A$ stops before $6$ and $B$ only has odd numbers.' }
      ],
      answerText: '$A \\cup B = \\{-2,-1,0,1,2,3,4,5,7,9\\}$',
      checklist: ['Write both sets as lists.', 'Union: everything in either, written once.', 'Take one list, then add what is missing from the other.', 'Check nothing is listed twice.']
    },
    {
      id: 'mid6-q2a', part: 1, marks: 10, topic: '1.4',
      prompt: '**Q2(a).** Simplify $\\dfrac{x}{x-3} + \\dfrac{2x+1}{x^2-5x+6}$.',
      answer: { type: 'expression', value: '(x^2+1)/((x-2)*(x-3))', vars: ['x'] },
      hints: [
        'The two bottoms look different. Can the second one be factored so they share something?',
        '$x^2-5x+6 = (x-2)(x-3)$ — so the first bottom is already part of the second.',
        'The common bottom is $(x-2)(x-3)$. The first fraction needs an extra $(x-2)$ on top and bottom.',
        'Add the tops and collect. The $-2x$ and $+2x$ cancel, which is the neat part.'
      ],
      solution: [
        { text: 'Factor the second bottom.', math: 'x^2-5x+6 = (x-2)(x-3)' },
        { text: 'Multiply the first fraction up to the common bottom.', math: '\\frac{x(x-2)}{(x-2)(x-3)} + \\frac{2x+1}{(x-2)(x-3)}' },
        { text: 'Add the tops.', math: '= \\frac{x^2-2x+2x+1}{(x-2)(x-3)}' },
        { text: 'Collect — the $x$ terms cancel. $x^2+1$ does not factor, so this is finished.', math: '= \\frac{x^2+1}{(x-2)(x-3)}' }
      ],
      answerText: '$\\dfrac{x^2+1}{(x-2)(x-3)}$',
      checklist: ['Factor every bottom first.', 'Build the common bottom from all the distinct factors.', 'Multiply each fraction up to it.', 'Add the tops, collect, then check whether anything cancels.']
    },
    {
      id: 'mid6-q2b', part: 1, marks: 5, topic: '1.3',
      prompt: '**Q2(b).** Factor completely: $x^3 - 4x^2 - 9x + 36$.',
      answer: { type: 'expression', value: '(x-4)*(x-3)*(x+3)', vars: ['x'], form: 'factored' },
      hints: [
        'Four terms — group into two pairs.',
        'Pair as $(x^3-4x^2)$ and $(-9x+36)$.',
        'The first gives $x^2(x-4)$. From the second take out $-9$ to get $-9(x-4)$.',
        'That leaves $(x-4)(x^2-9)$, and $x^2-9$ is a difference of squares.'
      ],
      solution: [
        { text: 'Split into pairs.', math: '(x^3 - 4x^2) + (-9x + 36)' },
        { text: 'Factor each, choosing $-9$ so the brackets match.', math: 'x^2(x-4) - 9(x-4)' },
        { text: 'Take out the common bracket.', math: '= (x-4)(x^2-9)' },
        { text: 'Difference of squares.', math: '= (x-4)(x-3)(x+3)' }
      ],
      answerText: '$(x-4)(x-3)(x+3)$',
      checklist: ['Four terms means grouping.', 'Factor each pair so the brackets match.', 'Pick the sign that makes them match.', 'Factor any bracket that still can be.']
    },
    {
      id: 'mid6-q2c', part: 1, marks: 5, topic: '1.3',
      prompt: '**Q2(c).** Expand $(h+4)^3$.',
      answer: { type: 'expression', value: 'h^3 + 12*h^2 + 48*h + 64', vars: ['h'], form: 'expanded' },
      hints: [
        'Use the cube pattern $(A+B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$ with $A=h$ and $B=4$.',
        'The middle terms are $3h^2(4) = 12h^2$ and $3h(4^2) = 48h$.',
        'Check with $h=1$: the original is $5^3 = 125$, so the terms must add to $125$.'
      ],
      solution: [
        { text: 'Apply the pattern with $A=h$, $B=4$.', math: 'h^3 + 3h^2(4) + 3h(4)^2 + 4^3' },
        { text: 'Work each term out.', math: '= h^3 + 12h^2 + 48h + 64' },
        { text: 'Check with $h=1$: $1+12+48+64 = 125 = 5^3$. ✓' }
      ],
      answerText: '$h^3+12h^2+48h+64$',
      checklist: ['Use the cube pattern rather than multiplying three brackets.', 'Square and cube the number as well as the letter.', 'Write the terms in order of decreasing power.', 'Check by putting in a simple value.']
    },
    {
      id: 'mid6-q3a', part: 1, marks: 10, topic: '1.5',
      prompt: '**Q3(a).** Find the solution of $|2x-5| - 2 = 4$.',
      answer: { type: 'set', value: [5.5, -0.5], vars: ['x'] },
      hints: [
        'Before splitting anything, get the bars on their own. What is being done to $|2x-5|$?',
        'Add $2$ to both sides first, giving $|2x-5| = 6$.',
        'Now $6$ is positive, so it splits into two: $2x-5 = 6$ **or** $2x-5 = -6$.',
        'Solve each one separately.'
      ],
      solution: [
        { text: 'Get the bars alone.', math: '|2x-5| = 6' },
        { text: 'Positive on the right, so split into two.', math: '2x-5 = 6 \\quad\\text{or}\\quad 2x-5 = -6' },
        { text: 'Solve each.', math: '2x = 11 \\Rightarrow x = \\tfrac{11}{2}; \\qquad 2x = -1 \\Rightarrow x = -\\tfrac12' }
      ],
      answerText: '$S = \\left\\{-\\tfrac12,\\ \\tfrac{11}{2}\\right\\}$',
      checklist: ['Get the bars on their own first.', 'Check the other side is not negative.', 'Split into two equations, $+c$ and $-c$.', 'Solve both.']
    },
    {
      id: 'mid6-q3b', part: 1, marks: 10, topic: '1.8',
      prompt: '**Q3(b).** Find the solution of $\\dfrac{x-2}{(x+1)(x+4)} \\ge 0$.',
      answer: { type: 'interval', value: '(-4, -1) U [2, inf)', vars: ['x'] },
      hints: [
        'Already a single fraction with zero on the other side and already factored — go straight to the zeros.',
        'The zeros are $-4$ and $-1$ (bottom) and $2$ (top). Mark all three.',
        'Test one point in each of the four regions.',
        'Endpoints: include $2$ (top zero, and the sign is $\\ge$), never include $-4$ or $-1$.'
      ],
      solution: [
        { text: 'The zeros are $-4$, $-1$ (bottom) and $2$ (top).' },
        { text: 'Test each region: $x=-5$ gives $\\tfrac{-7}{(-4)(-1)}<0$; $x=-2$ gives $\\tfrac{-4}{(-1)(2)}>0$; $x=0$ gives $\\tfrac{-2}{(1)(4)}<0$; $x=3$ gives $\\tfrac{1}{(4)(7)}>0$.' },
        { text: 'Keep the positive regions. Include $2$; exclude the bottom zeros.', math: 'S = (-4,-1) \\cup [2,\\infty)' }
      ],
      answerText: '$S = (-4,-1) \\cup [2,\\infty)$',
      checklist: ['Find the zeros of the top and of the bottom.', 'Mark them and test one point per region.', 'Keep the regions with the sign you want.', 'Include top zeros with $\\ge$; never include a bottom zero.']
    },
    {
      id: 'mid6-q4a', part: 1, marks: 10, topic: '1.5',
      prompt: '**Q4(a).** Solve for $s$: $t(2s+7) = 3rs + tr$.',
      answer: { type: 'expression', value: 't*(r-7)/(2*t-3*r)', vars: ['r', 's', 't'] },
      hints: [
        'Treat $r$ and $t$ as ordinary numbers. Your job is to get $s$ alone.',
        'Expand the left first: $2st + 7t = 3rs + tr$.',
        'Now move every term containing $s$ to one side and everything else to the other.',
        'You should have $s(2t - 3r) = tr - 7t$. Factor the right side too if you like — $t(r-7)$.'
      ],
      solution: [
        { text: 'Expand the bracket.', math: '2st + 7t = 3rs + tr' },
        { text: 'Gather the $s$ terms on the left, the rest on the right.', math: '2st - 3rs = tr - 7t' },
        { text: 'Factor $s$ out of the left and $t$ out of the right.', math: 's(2t - 3r) = t(r - 7)' },
        { text: 'Divide by the bracket.', math: 's = \\frac{t(r-7)}{2t-3r}' }
      ],
      answerText: '$s = \\dfrac{t(r-7)}{2t-3r}$',
      checklist: ['Expand any brackets first.', 'Treat every other letter as a number.', 'Gather your letter on one side.', 'Factor it out, then divide by the bracket.']
    },
    {
      id: 'mid6-q4b', part: 1, marks: 10, topic: '1.10',
      prompt: '**Q4(b).** Find an equation of the line through $P(-2,3)$ parallel to $2x-3y=5$. Write it in standard form.',
      answer: { type: 'equation', value: '2*x - 3*y = -13', vars: ['x', 'y'], form: 'integer-coefficients' },
      hints: [
        'Find the slope of the given line by rearranging it to $y = mx+b$.',
        '$2x-3y=5$ gives $3y = 2x-5$, so $y = \\tfrac23 x - \\tfrac53$ and the slope is $\\tfrac23$.',
        'Parallel means the same slope. Use $y-3 = \\tfrac23(x+2)$.',
        'Multiply by $3$ to clear the fraction, then collect into standard form.'
      ],
      solution: [
        { text: 'Rearrange to find the slope.', math: '3y = 2x - 5 \\;\\Rightarrow\\; y = \\tfrac23 x - \\tfrac53,\\qquad m = \\tfrac23' },
        { text: 'Same slope, through $(-2,3)$.', math: 'y - 3 = \\tfrac23(x+2)' },
        { text: 'Multiply by $3$.', math: '3y - 9 = 2x + 4' },
        { text: 'Collect into standard form.', math: '2x - 3y = -13' }
      ],
      answerText: '$2x - 3y = -13$',
      checklist: ['Rearrange the given line to read off its slope.', 'Parallel means the same slope.', 'Use $y-y_1=m(x-x_1)$.', 'Clear fractions and collect into the form asked for.']
    },
    {
      id: 'mid6-q5a', part: 1, marks: 10, topic: '1.9',
      prompt: '**Q5(a).** Find an equation of the circle with centre $(-1,5)$ passing through $(2,1)$.',
      answer: { type: 'equation', value: '(x+1)^2 + (y-5)^2 = 25', vars: ['x', 'y'] },
      hints: [
        'The radius is the distance from the centre to the point it passes through.',
        'Step across: $2-(-1) = 3$. Step down: $1-5 = -4$.',
        '$r^2 = 9 + 16 = 25$ — you only ever need $r^2$.',
        'Substitute the centre into $(x-h)^2+(y-k)^2=r^2$, minding the signs.'
      ],
      solution: [
        { text: 'Radius squared is the squared distance.', math: 'r^2 = (2-(-1))^2 + (1-5)^2 = 9 + 16 = 25' },
        { text: 'Substitute the centre $(-1,5)$.', math: '(x+1)^2 + (y-5)^2 = 25' }
      ],
      answerText: '$(x+1)^2+(y-5)^2 = 25$',
      checklist: ['Radius = distance from the centre to the point.', 'Stop at $r^2$.', 'Substitute the centre into the standard form.', 'A negative coordinate becomes a plus in the bracket.']
    },
    {
      id: 'mid6-q5b', part: 1, marks: 5, topic: '1.9',
      prompt: '**Q5(b).** Find the $x$- and $y$-intercepts, if any, of $y = \\sqrt{x^2-9}$.',
      answer: {
        type: 'multi', parts: [
          { type: 'set', value: [-3, 3], vars: ['x'], label: '$x$-intercepts' },
          { type: 'choice', value: 'none', label: '$y$-intercept', options: [{ id: 'none', label: 'There is none' }, { id: 'three', label: '$y = 3$' }, { id: 'nine', label: '$y = -9$' }] }
        ]
      },
      hints: [
        'Two separate calculations. For the $x$-intercepts set $y=0$; for the $y$-intercept set $x=0$.',
        'With $y=0$: $\\sqrt{x^2-9}=0$, and a root is zero only when its inside is zero.',
        '$x^2 = 9$ gives **two** answers, $x = 3$ and $x = -3$.',
        'With $x=0$: $y = \\sqrt{-9}$, which is not a real number — so there is no $y$-intercept.'
      ],
      solution: [
        { text: 'Set $y=0$ for the $x$-intercepts.', math: '\\sqrt{x^2-9} = 0 \\;\\Rightarrow\\; x^2 = 9 \\;\\Rightarrow\\; x = \\pm 3' },
        { text: 'Set $x=0$ for the $y$-intercept.', math: 'y = \\sqrt{0-9} = \\sqrt{-9}' },
        { text: 'No real square root of a negative, so there is no $y$-intercept. The graph only exists where $|x| \\ge 3$.' }
      ],
      answerText: '$x$-intercepts $x = \\pm3$; no $y$-intercept',
      checklist: ['For $x$-intercepts set $y=0$; for $y$-intercepts set $x=0$.', 'A square root is zero only when its inside is zero.', '$x^2 = c$ has two answers.', 'A negative under a square root means no real point there.']
    },
    {
      id: 'mid6-q5c', part: 1, marks: 5, topic: '1.9',
      prompt: '**Q5(c).** Determine whether $y^2 = x^2 - 4x$ is symmetric about the $y$-axis.',
      answer: {
        type: 'choice', value: 'no',
        options: [{ id: 'yes', label: 'Yes — it is symmetric about the $y$-axis' }, { id: 'no', label: 'No — it is not' }],
        wrongMessage: 'Not quite. Replace $x$ with $-x$ and compare carefully — look at what happens to the $-4x$ term.'
      },
      hints: [
        'The test for $y$-axis symmetry: replace every $x$ with $-x$ and see whether you get the original equation back.',
        'Replacing gives $y^2 = (-x)^2 - 4(-x)$.',
        '$(-x)^2 = x^2$ (unchanged), but $-4(-x) = +4x$ — the sign of that term has flipped.',
        '$y^2 = x^2 + 4x$ is not the same as $y^2 = x^2 - 4x$, so the test fails.'
      ],
      solution: [
        { text: 'Replace $x$ with $-x$.', math: 'y^2 = (-x)^2 - 4(-x) = x^2 + 4x' },
        { text: 'Compare with the original $y^2 = x^2 - 4x$. The $4x$ term has changed sign, so they are different.' },
        { text: 'The equation is **not** symmetric about the $y$-axis. (It is symmetric about the $x$-axis, since replacing $y$ by $-y$ leaves $y^2$ unchanged.)' }
      ],
      answerText: 'No — replacing $x$ by $-x$ gives $y^2 = x^2+4x$, which is different',
      checklist: ['For $y$-axis symmetry, replace $x$ with $-x$.', 'Even powers of $x$ survive; odd ones flip sign.', 'Compare with the original, term by term.', 'One term differing is enough to fail the test.']
    }
  ]
});
