/* 1.1 Real Numbers */
(function () {
  const M = CH.M, V = CH.V;
  const nl = V.numberLine;

  // small number-line pictures for the interval table
  const intervalRow = (notation, ineq, svg) => '<tr><td>' + CH.R.tex(notation) + '</td><td>' + CH.R.tex(ineq) + '</td><td style="min-width:220px">' + svg + '</td></tr>';
  const intervalTable = '<div class="table-wrap"><table><tr><th>Interval</th><th>Inequality</th><th>Picture</th></tr>' +
    intervalRow('[a, b]', 'a \\le x \\le b', nl({ min: 0, max: 6, height: 60, intervals: [{ lo: 1, hi: 5, loC: true, hiC: true }], labels: { 1: 'a', 5: 'b' } })) +
    intervalRow('(a, b)', 'a < x < b', nl({ min: 0, max: 6, height: 60, intervals: [{ lo: 1, hi: 5 }], labels: { 1: 'a', 5: 'b' } })) +
    intervalRow('[a, b)', 'a \\le x < b', nl({ min: 0, max: 6, height: 60, intervals: [{ lo: 1, hi: 5, loC: true }], labels: { 1: 'a', 5: 'b' } })) +
    intervalRow('(a, \\infty)', 'x > a', nl({ min: 0, max: 6, height: 60, intervals: [{ lo: 1, hi: Infinity }], labels: { 1: 'a' } })) +
    intervalRow('(-\\infty, b]', 'x \\le b', nl({ min: 0, max: 6, height: 60, intervals: [{ lo: -Infinity, hi: 5, hiC: true }], labels: { 5: 'b' } })) +
    '</table></div>';

  CH.registerSection({
    id: '1.1', chapter: 1, title: 'Real Numbers',
    summary: 'The kinds of numbers, turning repeating decimals into fractions, working with fractions, intervals on the number line, and absolute value.',

    theory: [
      { h: 'The kinds of numbers' },
      'Every number you will meet in this course lives on the **number line**. Together they are called the **real numbers**, written $\\mathbb{R}$. Inside the real numbers there are smaller families, each one sitting inside the next:',
      { svg: V.numberSets(), caption: 'Each box sits inside the bigger one: every natural number is an integer, every integer is a rational number, and every rational number is real.' },
      '- **Natural numbers** $\\mathbb{N} = \\{1, 2, 3, \\ldots\\}$ — the counting numbers.\n- **Integers** $\\mathbb{Z} = \\{\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots\\}$ — whole numbers, including negatives and zero.\n- **Rational numbers** $\\mathbb{Q}$ — any number that can be written as a fraction $\\dfrac{p}{q}$ with $p$ and $q$ integers ($q \\ne 0$). So $\\tfrac{1}{2}$, $-\\tfrac{7}{3}$, $0.75 = \\tfrac{3}{4}$ and $5 = \\tfrac{5}{1}$ are all rational.\n- **Irrational numbers** — real numbers that *cannot* be written as a fraction, such as $\\sqrt{2}$, $\\pi$ and $\\sqrt[3]{5}$. Their decimals go on forever without repeating.',
      { svg: nl({ min: -4, max: 4, points: [{ x: -3, label: '−3' }, { x: -0.5, label: '−½' }, { x: 0, label: '0' }, { x: Math.SQRT2, label: '√2' }, { x: Math.PI, label: 'π' }] }), caption: 'Rational and irrational numbers mixed together fill up the whole line with no gaps.' },
      { key: 'How to tell rational from irrational', md: 'Write the number as a decimal.\n\n- If the decimal **stops** ($0.75$) or **repeats** forever ($0.333\\ldots$, $0.181818\\ldots$), the number is **rational**.\n- If it goes on forever with **no repeating pattern** ($\\sqrt{2} = 1.41421356\\ldots$), it is **irrational**.' },

      { h: 'Repeating decimals are fractions in disguise' },
      'A bar over a digit means it repeats forever: $0.\\overline{6} = 0.6666\\ldots$ and $0.\\overline{18} = 0.181818\\ldots$. Every repeating decimal is a fraction, and there is a neat trick to find which one: **shift the decimal so the repeating parts line up, then subtract**.',
      { example: {
        title: 'Write $0.\\overline{6}$ as a fraction',
        problem: 'Express $0.\\overline{6}$ as a fraction in lowest terms.',
        steps: [
          { text: 'Give the number a name.', math: 'x = 0.6666\\ldots' },
          { text: 'One digit repeats, so multiply by $10$ — this shifts the decimal one place, and the repeating tail still looks the same.', math: '10x = 6.6666\\ldots' },
          { text: 'Subtract the first equation from the second. The endless tails are identical, so they cancel out completely.', math: '10x - x = 6.6666\\ldots - 0.6666\\ldots \\quad\\Rightarrow\\quad 9x = 6' },
          { text: 'Divide by $9$ and simplify.', math: 'x = \\frac{6}{9} = \\frac{2}{3}' }
        ],
        answer: '$0.\\overline{6} = \\dfrac{2}{3}$'
      } },
      { key: 'How many places to shift?', md: 'Multiply by $10$ for **one** repeating digit, $100$ for **two**, $1000$ for **three** — one zero for each repeating digit. That is what lines the tails up so they cancel.' },
      { widget: 'repeating-decimal' },
      { tip: 'Non-repeating part first?', md: 'For something like $0.1\\overline{6}$, first multiply by $10$ to get past the non-repeating digit ($10x = 1.\\overline{6}$), then do the usual trick on that ($100x = 16.\\overline{6}$, subtract: $90x = 15$, so $x = \\tfrac{15}{90} = \\tfrac{1}{6}$).' },

      { h: 'Properties of real numbers' },
      'These are the rules that let you rearrange a calculation without changing its value. You already use them without thinking:',
      '| Property | What it says | Example |\n|---|---|---|\n| Commutative | order does not matter | $2 + 3 = 3 + 2$, $\\ 5 \\cdot 4 = 4 \\cdot 5$ |\n| Associative | grouping does not matter | $(2 + 3) + 4 = 2 + (3 + 4)$ |\n| Distributive | multiply into brackets | $3(x + 2) = 3x + 6$ |',
      'The **distributive property** is the one you will use constantly. Picture it as the area of a rectangle: a rectangle $3$ high and $x + 2$ wide has area $3(x+2)$, and it is also the sum of the two smaller rectangles, $3x + 6$.',
      { html: V.areaModel({ rows: ['3'], cols: ['x', '2'], cells: [['3x', '6']] }), caption: '$3(x + 2) = 3x + 6$ — the big rectangle is the two small ones added together.' },
      { warn: 'Subtraction and division are not commutative', md: '$5 - 3 \\ne 3 - 5$ and $6 \\div 2 \\ne 2 \\div 6$. Only addition and multiplication can be swapped freely.' },

      { h: 'Fractions' },
      'A fraction $\\dfrac{a}{b}$ is a division: $a$ (the **numerator**) divided by $b$ (the **denominator**). Here are the rules, all in one place:',
      '| To… | Do this | Example |\n|---|---|---|\n| multiply | multiply tops, multiply bottoms | $\\dfrac{2}{3}\\cdot\\dfrac{5}{7} = \\dfrac{10}{21}$ |\n| divide | flip the second fraction, then multiply | $\\dfrac{2}{3}\\div\\dfrac{5}{7} = \\dfrac{2}{3}\\cdot\\dfrac{7}{5} = \\dfrac{14}{15}$ |\n| add / subtract, same denominator | add the tops, keep the bottom | $\\dfrac{2}{5} + \\dfrac{1}{5} = \\dfrac{3}{5}$ |\n| add / subtract, different denominators | rewrite both with the **LCD** first | $\\dfrac{3}{8} + \\dfrac{5}{6} = \\dfrac{9}{24} + \\dfrac{20}{24} = \\dfrac{29}{24}$ |\n| cancel | divide top and bottom by the same thing | $\\dfrac{6}{9} = \\dfrac{2\\cdot 3}{3\\cdot 3} = \\dfrac{2}{3}$ |',
      'Why do we need a common denominator to add? Because you can only add pieces that are the **same size**. Eighths and sixths are different-sized pieces, but both can be cut into twenty-fourths:',
      { svg: V.fractionBars([{ n: 3, d: 8, label: '3/8' }, { n: 9, d: 24, label: '9/24' }, { n: 5, d: 6, label: '5/6' }, { n: 20, d: 24, label: '20/24' }]), caption: '$\\tfrac{3}{8}$ is the same amount as $\\tfrac{9}{24}$, and $\\tfrac{5}{6}$ is the same as $\\tfrac{20}{24}$. Now the pieces match and we can just count: $9 + 20 = 29$ twenty-fourths.' },
      { key: 'Adding fractions with different denominators', md: '1. Find the **least common denominator (LCD)** — the smallest number both denominators divide into. (For $8$ and $6$: $24$.)\n2. Ask "what do I multiply each denominator by to reach the LCD?" and multiply the **top and bottom** of that fraction by the same number.\n3. Add or subtract the numerators. Keep the denominator.\n4. Simplify if you can.' },
      { warn: 'The classic mistake', md: 'You cannot cancel across a plus or minus sign. $\\dfrac{x + 3}{3}$ is **not** $x + 1$. Cancelling only works with things that are **multiplied**: $\\dfrac{3x}{3} = x$ is fine.' },
      '**Compound fractions** are fractions inside fractions. Tidy the top into one fraction, tidy the bottom into one fraction, then divide (flip and multiply). You will see this done step by step in the examples.',

      { h: 'Sets and intervals' },
      'A **set** is just a collection of things, written in curly brackets: $A = \\{1, 2, 3\\}$. Two ways to combine sets:',
      '- **Union** $A \\cup B$ — everything that is in $A$ **or** in $B$ (or both). Think "**u**nion = **u**nite them".\n- **Intersection** $A \\cap B$ — only the things in **both** $A$ **and** $B$. Think "where they overlap".',
      'For example, if $A = \\{1, 2, 3, 4, 5, 6\\}$ and $B = \\{-6, -4, -2, 0, 2, 4\\}$ then $A \\cap B = \\{2, 4\\}$ (the shared elements) and $A \\cup B = \\{-6, -4, -2, 0, 1, 2, 3, 4, 5, 6\\}$ (everything, listed once).',
      'An **interval** is a set of *all* the real numbers between two endpoints. The bracket shape tells you whether the endpoint itself is included:',
      { key: 'Reading the brackets', md: '- A **square bracket** $[$ or $]$ means the endpoint **is included** (drawn as a filled dot ●).\n- A **round bracket** $($ or $)$ means the endpoint is **not included** (drawn as an open dot ○).\n- $\\infty$ and $-\\infty$ always get a round bracket — infinity is not a number you can reach.' },
      { html: intervalTable },
      'Unions and intersections work for intervals too. To find them, **draw both intervals on one number line**: the union is everything shaded by either; the intersection is only where the shading overlaps.',
      { svg: nl({ min: -3, max: 6, intervals: [{ lo: -2, hi: 3, hiC: true, color: 'var(--viz-1)' }, { lo: 1, hi: 5, loC: true, color: 'var(--viz-2)' }] }), caption: 'Blue: $(-2, 3]$. Pink: $[1, 5)$. Overlap (intersection): $[1, 3]$. Everything shaded (union): $(-2, 5)$.' },

      { h: 'Absolute value and distance' },
      { def: 'Absolute value', md: 'The absolute value $|a|$ is the **distance from $a$ to $0$** on the number line, so it is never negative.\n\n$$|a| = \\begin{cases} a & \\text{if } a \\ge 0 \\\\ -a & \\text{if } a < 0 \\end{cases}$$\n\nSo $|5| = 5$ and $|-5| = 5$. The second line just says "if the number is negative, flip its sign to make it positive".' },
      'Useful facts: $|ab| = |a|\\,|b|$ and $\\left|\\dfrac{a}{b}\\right| = \\dfrac{|a|}{|b|}$ — but $|a + b|$ is **not** always $|a| + |b|$ (try $a = 3$, $b = -3$).',
      { def: 'Distance between two numbers', md: 'The distance between $a$ and $b$ on the number line is $$d(a, b) = |a - b|.$$ The order does not matter, because $|a - b| = |b - a|$.' },
      { widget: 'abs-distance' },
      { warn: 'A sneaky one', md: '$|3 - \\pi|$: since $\\pi \\approx 3.14$ is bigger than $3$, the inside is negative, so $|3 - \\pi| = -(3 - \\pi) = \\pi - 3$. Always ask "is the inside positive or negative?" before dropping the bars.' }
    ],

    examples: [
      { title: 'Two repeating digits',
        problem: 'Express $0.\\overline{18}$ as a fraction in lowest terms.',
        steps: [
          { text: 'Name it.', math: 'x = 0.181818\\ldots' },
          { text: 'Two digits repeat, so multiply by $100$ (two zeros).', math: '100x = 18.181818\\ldots' },
          { text: 'Subtract: the repeating tails cancel.', math: '100x - x = 18.1818\\ldots - 0.1818\\ldots \\quad\\Rightarrow\\quad 99x = 18' },
          { text: 'Divide and simplify (both $18$ and $99$ are divisible by $9$).', math: 'x = \\frac{18}{99} = \\frac{9 \\cdot 2}{9 \\cdot 11} = \\frac{2}{11}' }
        ], answer: '$\\dfrac{2}{11}$' },
      { title: 'A whole-number part as well',
        problem: 'Express $1.\\overline{3}$ as a fraction.',
        steps: [
          { text: 'Name it and multiply by $10$ (one repeating digit).', math: 'x = 1.333\\ldots, \\qquad 10x = 13.333\\ldots' },
          { text: 'Subtract.', math: '9x = 12' },
          { text: 'Simplify.', math: 'x = \\frac{12}{9} = \\frac{4}{3}' }
        ], answer: '$\\dfrac{4}{3}$' },
      { title: 'Adding fractions',
        problem: 'Compute $\\dfrac{3}{8} + \\dfrac{5}{6}$.',
        steps: [
          { text: 'Find the LCD of $8$ and $6$. Multiples of $8$: $8, 16, 24, \\ldots$ Multiples of $6$: $6, 12, 18, 24, \\ldots$ The smallest shared one is $24$.', math: '\\text{LCD} = 24' },
          { text: '$8 \\times 3 = 24$, so multiply the first fraction top and bottom by $3$. $6 \\times 4 = 24$, so multiply the second by $4$.', math: '\\frac{3}{8} + \\frac{5}{6} = \\frac{3 \\cdot 3}{8 \\cdot 3} + \\frac{5 \\cdot 4}{6 \\cdot 4} = \\frac{9}{24} + \\frac{20}{24}' },
          { text: 'Same denominator now — add the tops.', math: '= \\frac{9 + 20}{24} = \\frac{29}{24}' },
          { text: 'Check whether it simplifies: $29$ is prime and does not divide $24$, so it is already in lowest terms.' }
        ], answer: '$\\dfrac{29}{24}$' },
      { title: 'A compound fraction',
        problem: 'Simplify $\\dfrac{\\;\\dfrac{3}{4} + \\dfrac{2}{5}\\;}{\\;\\dfrac{2}{3} - \\dfrac{3}{5}\\;}$.',
        steps: [
          { text: 'Tidy the **top** into a single fraction. LCD of $4$ and $5$ is $20$.', math: '\\frac{3}{4} + \\frac{2}{5} = \\frac{15}{20} + \\frac{8}{20} = \\frac{23}{20}' },
          { text: 'Tidy the **bottom** into a single fraction. LCD of $3$ and $5$ is $15$.', math: '\\frac{2}{3} - \\frac{3}{5} = \\frac{10}{15} - \\frac{9}{15} = \\frac{1}{15}' },
          { text: 'Now it is one fraction divided by another: flip the bottom one and multiply.', math: '\\frac{23}{20} \\div \\frac{1}{15} = \\frac{23}{20} \\cdot \\frac{15}{1} = \\frac{23 \\cdot 15}{20}' },
          { text: 'Cancel the common factor $5$ before multiplying out ($15 = 5 \\cdot 3$, $20 = 5 \\cdot 4$).', math: '= \\frac{23 \\cdot 3}{4} = \\frac{69}{4}' }
        ], answer: '$\\dfrac{69}{4}$' },
      { title: 'Union and intersection of intervals',
        problem: 'Find (a) $(-2, 3] \\cap [1, 5)$ and (b) $(-2, 3] \\cup [1, 5)$.',
        steps: [
          { text: 'Draw both on one number line. $(-2, 3]$: open dot at $-2$, filled dot at $3$. $[1, 5)$: filled dot at $1$, open dot at $5$.' },
          { text: '**(a) Intersection** = where the two shadings overlap: from $1$ to $3$. Is $1$ included? It is in $[1,5)$ and inside $(-2,3]$ — yes. Is $3$ included? It is in $(-2,3]$ and inside $[1,5)$ — yes.', math: '(-2, 3] \\cap [1, 5) = [1, 3]' },
          { text: '**(b) Union** = everything shaded by either: from $-2$ to $5$. $-2$ is not in either (open), and $5$ is not in either (open).', math: '(-2, 3] \\cup [1, 5) = (-2, 5)' }
        ], answer: '(a) $[1, 3]$ &nbsp; (b) $(-2, 5)$' },
      { title: 'Absolute values',
        problem: 'Evaluate (a) $|-3|$, (b) $|3 - \\pi|$, (c) the distance between $-2$ and $5$.',
        steps: [
          { text: '(a) $-3$ is negative, so flip the sign.', math: '|-3| = 3' },
          { text: '(b) Is the inside positive or negative? $\\pi \\approx 3.14 > 3$, so $3 - \\pi$ is negative. Flip it.', math: '|3 - \\pi| = -(3 - \\pi) = \\pi - 3' },
          { text: '(c) Distance is the absolute value of the difference.', math: 'd(-2, 5) = |-2 - 5| = |-7| = 7' }
        ], answer: '(a) $3$ &nbsp; (b) $\\pi - 3$ &nbsp; (c) $7$' }
    ],

    exercises: [
      { id: '1.1-e1', prompt: 'Express $0.\\overline{15}$ as a fraction in lowest terms.',
        answer: { type: 'number', value: 5 / 33, display: '\\tfrac{5}{33}' },
        hints: ['Two digits repeat. What should you multiply by?', 'Let $x = 0.1515\\ldots$ and $100x = 15.1515\\ldots$. Subtract them.', '$99x = 15$. Now simplify $\\tfrac{15}{99}$ — both divide by $3$.'],
        solution: [{ text: 'Let $x = 0.151515\\ldots$. Two digits repeat, so multiply by $100$.', math: '100x = 15.151515\\ldots' }, { text: 'Subtract.', math: '99x = 15' }, { text: 'Simplify.', math: 'x = \\frac{15}{99} = \\frac{5}{33}' }] },
      { id: '1.1-e2', prompt: 'Express $1.\\overline{51}$ as a fraction in lowest terms.',
        answer: { type: 'number', value: 50 / 33, display: '\\tfrac{50}{33}' },
        hints: ['Two digits repeat, so use $100$.', '$100x - x = 151.5151\\ldots - 1.5151\\ldots = 150$.'],
        solution: [{ text: 'Let $x = 1.515151\\ldots$ and multiply by $100$.', math: '100x = 151.5151\\ldots' }, { text: 'Subtract.', math: '99x = 150' }, { text: 'Simplify (divide by $3$).', math: 'x = \\frac{150}{99} = \\frac{50}{33}' }] },
      { id: '1.1-e3', prompt: 'Express $0.2\\overline{7}$ as a fraction in lowest terms.',
        answer: { type: 'number', value: 5 / 18, display: '\\tfrac{5}{18}' },
        hints: ['The $2$ does not repeat. Multiply by $10$ first to get past it: $10x = 2.\\overline{7}$.', 'Now the usual trick on $10x$: $100x = 27.\\overline{7}$. Subtract $10x$ from $100x$.'],
        solution: [{ text: 'Let $x = 0.2777\\ldots$. Get past the non-repeating digit.', math: '10x = 2.777\\ldots' }, { text: 'Shift once more so the tails line up.', math: '100x = 27.777\\ldots' }, { text: 'Subtract the two shifted versions.', math: '100x - 10x = 27.777\\ldots - 2.777\\ldots \\Rightarrow 90x = 25' }, { text: 'Simplify.', math: 'x = \\frac{25}{90} = \\frac{5}{18}' }] },
      { id: '1.1-e4', prompt: 'Compute $\\dfrac{7}{20} + \\dfrac{1}{15}$. Give your answer in lowest terms.',
        answer: { type: 'number', value: 5 / 12, display: '\\tfrac{5}{12}' },
        hints: ['Find the LCD of $20$ and $15$. List multiples of each.', 'LCD $= 60$. $\\tfrac{7}{20} = \\tfrac{21}{60}$ and $\\tfrac{1}{15} = \\tfrac{4}{60}$.'],
        solution: [{ text: 'LCD of $20$ and $15$ is $60$.', math: '\\frac{7}{20} + \\frac{1}{15} = \\frac{7 \\cdot 3}{60} + \\frac{1 \\cdot 4}{60} = \\frac{21}{60} + \\frac{4}{60}' }, { text: 'Add the numerators and simplify.', math: '= \\frac{25}{60} = \\frac{5}{12}' }] },
      { id: '1.1-e5', prompt: 'Simplify the compound fraction $\\dfrac{\\;\\dfrac{1}{2} + \\dfrac{1}{3}\\;}{\\;\\dfrac{1}{4} - \\dfrac{1}{6}\\;}$.',
        answer: { type: 'number', value: 10 },
        hints: ['Turn the top into one fraction and the bottom into one fraction first.', 'Top: $\\tfrac{5}{6}$. Bottom: $\\tfrac{1}{12}$. Then flip and multiply.'],
        solution: [{ text: 'Top:', math: '\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}' }, { text: 'Bottom:', math: '\\frac{1}{4} - \\frac{1}{6} = \\frac{3}{12} - \\frac{2}{12} = \\frac{1}{12}' }, { text: 'Divide: flip and multiply.', math: '\\frac{5}{6} \\div \\frac{1}{12} = \\frac{5}{6} \\cdot \\frac{12}{1} = \\frac{60}{6} = 10' }] },
      { id: '1.1-e6', prompt: 'Let $A = \\{1, 2, 3, 4, 5, 6\\}$ and $B = \\{-6, -4, -2, 0, 2, 4\\}$. Find $A \\cap B$ and $A \\cup B$.',
        answer: { type: 'multi', parts: [{ label: '$A \\cap B$', type: 'set', value: [2, 4] }, { label: '$A \\cup B$', type: 'set', value: [-6, -4, -2, 0, 1, 2, 3, 4, 5, 6] }] },
        hints: ['Intersection: which numbers appear in *both* lists?', 'Union: write every number that appears in *either* list, each one once.'],
        solution: [{ text: 'The numbers in both sets are $2$ and $4$, so $A \\cap B = \\{2, 4\\}$.' }, { text: 'Everything in either set, listed once: $A \\cup B = \\{-6, -4, -2, 0, 1, 2, 3, 4, 5, 6\\}$.' }] },
      { id: '1.1-e7', prompt: 'Find $(-1, 4] \\cap [2, 7)$ and $(-1, 4] \\cup [2, 7)$. Use interval notation.',
        answer: { type: 'multi', parts: [{ label: 'Intersection', type: 'interval', value: '[2, 4]' }, { label: 'Union', type: 'interval', value: '(-1, 7)' }] },
        hints: ['Sketch both on a number line.', 'The overlap runs from $2$ to $4$. Are the endpoints in both intervals?'],
        solution: [{ text: 'The two shadings overlap from $2$ to $4$; both endpoints belong to both intervals, so the intersection is $[2, 4]$.' }, { text: 'Together they cover from $-1$ (not included) to $7$ (not included): the union is $(-1, 7)$.' }] },
      { id: '1.1-e8', prompt: 'Evaluate $|3 - \\pi|$ exactly (no decimals).',
        answer: { type: 'number', value: Math.PI - 3, display: '\\pi - 3' },
        hints: ['Is $3 - \\pi$ positive or negative?', 'It is negative, so the absolute value flips the sign.'],
        solution: ['$\\pi \\approx 3.14 > 3$, so $3 - \\pi < 0$. Then $|3 - \\pi| = -(3 - \\pi) = \\pi - 3$.'] },
      { id: '1.1-e9', prompt: 'Find the distance on the number line between $-\\dfrac{3}{4}$ and $\\dfrac{5}{2}$.',
        answer: { type: 'number', value: 13 / 4, display: '\\tfrac{13}{4}' },
        hints: ['Distance $= |a - b|$.', '$\\left|-\\tfrac{3}{4} - \\tfrac{5}{2}\\right| = \\left|-\\tfrac{3}{4} - \\tfrac{10}{4}\\right|$'],
        solution: [{ text: 'Use $d(a,b) = |a - b|$ with a common denominator of $4$.', math: '\\left|-\\frac{3}{4} - \\frac{5}{2}\\right| = \\left|-\\frac{3}{4} - \\frac{10}{4}\\right| = \\left|-\\frac{13}{4}\\right| = \\frac{13}{4}' }] },
      { id: '1.1-e10', prompt: 'Which of these numbers is **irrational**?',
        answer: { type: 'choice', value: 'c', options: [{ id: 'a', label: '$0.\\overline{27}$' }, { id: 'b', label: '$\\sqrt{16}$' }, { id: 'c', label: '$\\sqrt{10}$' }, { id: 'd', label: '$-\\dfrac{22}{7}$' }], wrongMessage: 'Not quite. Repeating decimals and fractions are rational, and $\\sqrt{16} = 4$ is a whole number.' },
        hints: ['A repeating decimal is always rational.', '$\\sqrt{16} = 4$ — a perfect square root is a whole number. $10$ is not a perfect square.'],
        solution: ['$0.\\overline{27} = \\tfrac{3}{11}$ and $-\\tfrac{22}{7}$ are fractions, and $\\sqrt{16} = 4$. Only $\\sqrt{10}$ cannot be written as a fraction: it is irrational.'] }
    ],

    generators: [
      { id: '1.1-g-repeat', title: 'Repeating decimal → fraction', desc: 'Shift, subtract, simplify.',
        make(r) {
          const type = r.pick(['pure1', 'pure1', 'pure2', 'pure2', 'int', 'mixed']);
          let intPart = 0, nonRep = '', rep;
          if (type === 'pure1') rep = String(r.int(1, 8));
          else if (type === 'pure2') { rep = String(r.int(10, 98)); if (rep[0] === rep[1]) rep = '1' + rep[1]; }
          else if (type === 'int') { intPart = r.int(1, 4); rep = String(r.pick([1, 2, 3, 4, 6, 7, 8, 12, 15, 27, 36, 45])); }
          else { nonRep = String(r.int(1, 8)); rep = String(r.int(1, 9)); if (rep === nonRep) rep = String((+rep % 9) + 1); }
          const a = nonRep.length, b = rep.length;
          const shift1 = Math.pow(10, a), shift2 = Math.pow(10, a + b);
          const AB = Number(nonRep + rep), A = Number(nonRep || '0');
          const numer = intPart * (shift2 - shift1) + (AB - A), denom = shift2 - shift1;
          const dec = intPart + '.' + nonRep + '\\overline{' + rep + '}';
          const f = M.frac(numer, denom);
          const steps = [];
          const tail = (k) => { // decimal expansion after multiplying by 10^k, as a string with overline
            const s = String(intPart) + nonRep + rep + rep + rep;
            const pos = 1 + k; // digits before decimal point (intPart has 1 digit)
            let left = s.slice(0, pos).replace(/^0+(?=\d)/, ''), right = s.slice(pos);
            return left + '.' + right + '\\ldots';
          };
          steps.push({ text: 'Let $x = ' + dec + '$.', math: 'x = ' + tail(0) });
          if (a > 0) steps.push({ text: 'The digit ' + nonRep + ' does not repeat, so first multiply by $' + shift1 + '$ to move past it.', math: shift1 + 'x = ' + tail(a) });
          steps.push({ text: (b === 1 ? 'One digit repeats' : b + ' digits repeat') + ', so multiply by $' + Math.pow(10, b) + '$' + (a > 0 ? ' more' : '') + ' — that makes $' + shift2 + 'x$ with the same repeating tail.', math: shift2 + 'x = ' + tail(a + b) });
          steps.push({ text: 'Subtract ' + (a > 0 ? '$' + shift1 + 'x$ from $' + shift2 + 'x$' : '$x$ from $' + shift2 + 'x$') + ': the tails cancel.', math: shift2 + 'x - ' + (a > 0 ? shift1 + 'x' : 'x') + ' = ' + numer + ' \\quad\\Rightarrow\\quad ' + denom + 'x = ' + numer });
          steps.push({ text: 'Divide' + (M.gcd(numer, denom) > 1 ? ' and simplify (divide top and bottom by $' + M.gcd(numer, denom) + '$)' : '') + '.', math: 'x = \\frac{' + numer + '}{' + denom + '}' + (M.gcd(numer, denom) > 1 ? ' = ' + M.fracTex(numer, denom) : '') });
          return { prompt: 'Express $' + dec + '$ as a fraction in lowest terms.', answer: { type: 'number', value: numer / denom, display: M.fracTex(f.n, f.d) },
            hints: [(b === 1 ? 'One digit repeats' : b + ' digits repeat') + ' — multiply by $' + Math.pow(10, b) + '$' + (a > 0 ? ' after getting past the non-repeating digit' : '') + '.', 'Subtract so the repeating tails cancel, then simplify.'], solution: steps };
        } },
      { id: '1.1-g-fracadd', title: 'Add or subtract fractions', desc: 'Find the LCD, rewrite, combine, simplify.',
        make(r) {
          const dens = r.shuffle([4, 6, 8, 9, 10, 12, 15]).slice(0, 2);
          let [d1, d2] = dens;
          const n1 = r.int(1, d1 - 1), n2 = r.int(1, d2 - 1);
          const op = r.pick(['+', '-']);
          const L = M.lcm(d1, d2), k1 = L / d1, k2 = L / d2;
          const top = op === '+' ? n1 * k1 + n2 * k2 : n1 * k1 - n2 * k2;
          const f = M.frac(top, L);
          return { prompt: 'Compute $\\dfrac{' + n1 + '}{' + d1 + '} ' + op + ' \\dfrac{' + n2 + '}{' + d2 + '}$. Give the answer in lowest terms.',
            answer: { type: 'number', value: top / L, display: M.fracTex(f.n, f.d) },
            hints: ['The LCD of $' + d1 + '$ and $' + d2 + '$ is $' + L + '$.', 'Multiply the first fraction top and bottom by $' + k1 + '$, the second by $' + k2 + '$.'],
            solution: [{ text: 'LCD of $' + d1 + '$ and $' + d2 + '$ is $' + L + '$. Rewrite each fraction with denominator $' + L + '$.', math: '\\frac{' + n1 + '}{' + d1 + '} ' + op + ' \\frac{' + n2 + '}{' + d2 + '} = \\frac{' + (n1 * k1) + '}{' + L + '} ' + op + ' \\frac{' + (n2 * k2) + '}{' + L + '}' },
              { text: 'Combine the numerators' + (M.gcd(top, L) > 1 ? ' and simplify' : '') + '.', math: '= \\frac{' + top + '}{' + L + '}' + (M.gcd(top, L) > 1 ? ' = ' + M.fracTex(top, L) : '') }] };
        } },
      { id: '1.1-g-compound', title: 'Compound fraction', desc: 'Tidy top and bottom, then flip and multiply.',
        make(r) {
          const pickPair = () => { const d1 = r.pick([2, 3, 4, 5, 6]); let d2 = r.pick([2, 3, 4, 5, 6]); if (d2 === d1) d2 = d1 === 6 ? 5 : d1 + 1; return [r.int(1, d1 - 1), d1, r.int(1, d2 - 1), d2]; };
          let [a, b, c, d] = pickPair(), [e, f, g, k] = pickPair();
          const opT = r.pick(['+', '-']); let opB = r.pick(['+', '-']);
          const T = M.frac(opT === '+' ? a * d + c * b : a * d - c * b, b * d);
          let B = M.frac(opB === '+' ? e * k + g * f : e * k - g * f, f * k);
          if (B.n === 0) { opB = '+'; B = M.frac(e * k + g * f, f * k); }
          const ans = M.frac(T.n * B.d, T.d * B.n);
          const tex = (x, y) => '\\frac{' + x + '}{' + y + '}';
          return { prompt: 'Simplify $\\dfrac{\\;\\dfrac{' + a + '}{' + b + '} ' + opT + ' \\dfrac{' + c + '}{' + d + '}\\;}{\\;\\dfrac{' + e + '}{' + f + '} ' + opB + ' \\dfrac{' + g + '}{' + k + '}\\;}$.',
            answer: { type: 'number', value: ans.n / ans.d, display: M.fracTex(ans.n, ans.d) },
            hints: ['Make the top a single fraction, and the bottom a single fraction.', 'Top $= ' + M.fracTex(T.n, T.d) + '$, bottom $= ' + M.fracTex(B.n, B.d) + '$. Now divide: flip the bottom and multiply.'],
            solution: [{ text: 'Top:', math: tex(a, b) + ' ' + opT + ' ' + tex(c, d) + ' = ' + tex(a * d, b * d) + ' ' + opT + ' ' + tex(c * b, b * d) + ' = ' + M.fracTex(T.n, T.d) },
              { text: 'Bottom:', math: tex(e, f) + ' ' + opB + ' ' + tex(g, k) + ' = ' + tex(e * k, f * k) + ' ' + opB + ' ' + tex(g * f, f * k) + ' = ' + M.fracTex(B.n, B.d) },
              { text: 'Flip the bottom fraction and multiply, then simplify.', math: M.fracTex(T.n, T.d) + ' \\div ' + M.fracTex(B.n, B.d) + ' = ' + M.fracTex(T.n, T.d) + ' \\cdot ' + M.fracTex(B.d, B.n) + ' = ' + M.fracTex(ans.n, ans.d) }] };
        } },
      { id: '1.1-g-sets', title: 'Union and intersection of sets', desc: 'Pick out shared elements, or gather everything.',
        make(r) {
          const A = r.shuffle([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, r.int(4, 6)).sort((x, y) => x - y);
          const B = r.shuffle([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, r.int(4, 6)).sort((x, y) => x - y);
          const inter = A.filter(x => B.includes(x)), union = [...new Set(A.concat(B))].sort((x, y) => x - y);
          const which = r.pick(['cap', 'cup']);
          const setTex = s => '\\{' + s.join(', ') + '\\}';
          return { prompt: 'Let $A = ' + setTex(A) + '$ and $B = ' + setTex(B) + '$. Find $A ' + (which === 'cap' ? '\\cap' : '\\cup') + ' B$.',
            answer: { type: 'set', value: which === 'cap' ? inter : union },
            hints: [which === 'cap' ? 'Intersection ∩ = the elements that are in **both** sets.' : 'Union ∪ = every element that is in **either** set, listed once.'],
            solution: [which === 'cap' ? 'Go through $A$ and keep only the numbers that also appear in $B$: $A \\cap B = ' + (inter.length ? setTex(inter) : '\\varnothing') + '$.' : 'Write down everything in $A$, then add anything in $B$ that is not already listed: $A \\cup B = ' + setTex(union) + '$.'] };
        } },
      { id: '1.1-g-intervals', title: 'Union and intersection of intervals', desc: 'Draw both on one number line.',
        make(r) {
          const a = r.int(-6, 1), b = a + r.int(2, 5), c = r.int(a - 2, b - 1), d = c + r.int(2, 5);
          const aC = r.bool(), bC = r.bool(), cC = r.bool(), dC = r.bool();
          const I1 = { lo: a, hi: b, loC: aC, hiC: bC }, I2 = { lo: c, hi: d, loC: cC, hiC: dC };
          const which = r.pick(['cap', 'cup']);
          const tex = I => (I.loC ? '[' : '(') + I.lo + ', ' + I.hi + (I.hiC ? ']' : ')');
          const C = CH.C;
          const res = which === 'cap' ? C.parseIntervalSet(tex(I1) + ' ∩ ' + tex(I2)) : C.normalizeIntervals([I1, I2]);
          const resTex = C.intervalsToLatex(res);
          return { prompt: 'Find $' + tex(I1) + ' ' + (which === 'cap' ? '\\cap' : '\\cup') + ' ' + tex(I2) + '$. Give your answer in interval notation.',
            answer: { type: 'interval', value: C.intervalsToInput(res) },
            hints: ['Sketch both intervals on the same number line.', which === 'cap' ? 'Keep only the part shaded by **both**. Check each endpoint: is it in both intervals?' : 'Keep everything shaded by **either**. If the pieces touch or overlap they join into one interval.'],
            solution: [{ text: 'On a number line, $' + tex(I1) + '$ runs from $' + a + '$ to $' + b + '$ and $' + tex(I2) + '$ runs from $' + c + '$ to $' + d + '$. ' + (which === 'cap' ? 'The overlap is' : 'Everything covered by either is') + ' $' + resTex + '$.' }] };
        } },
      { id: '1.1-g-distance', title: 'Distance on the number line', desc: '|a − b|, with fractions and decimals.',
        make(r) {
          const kind = r.pick(['int', 'frac', 'dec']);
          let a, b, aT, bT;
          if (kind === 'int') { a = r.int(-9, 9); b = r.int(-9, 9); if (a === b) b += 3; aT = String(a); bT = String(b); }
          else if (kind === 'dec') { a = r.int(-40, 40) / 10; b = r.int(-40, 40) / 10; if (a === b) b += 1.5; aT = String(a); bT = String(b); }
          else { const d1 = r.pick([2, 3, 4, 5]), d2 = r.pick([2, 3, 4, 5]); a = r.nz(-7, 7) / d1; b = r.nz(-7, 7) / d2; if (Math.abs(a - b) < 1e-9) b += 1; aT = M.fracTex(Math.round(a * d1), d1); bT = M.fracTex(Math.round(b * d2), d2); }
          const dist = Math.abs(a - b);
          const disp = kind === 'frac' ? (function () { const L = 60; return M.fracTex(Math.round(dist * L), L); })() : String(Math.round(dist * 100) / 100);
          return { prompt: 'Find the distance on the number line between $' + aT + '$ and $' + bT + '$.',
            answer: { type: 'number', value: dist, display: disp },
            hints: ['Distance $= |a - b|$ — subtract, then take the absolute value.'],
            solution: [{ text: 'Subtract and take the absolute value.', math: 'd = \\left|' + aT + ' - \\left(' + bT + '\\right)\\right| = ' + disp }] };
        } }
    ]
  });
})();
