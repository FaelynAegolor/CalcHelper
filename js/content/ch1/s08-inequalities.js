/* 1.8 Inequalities */
(function () {
  const M = CH.M, V = CH.V, C = CH.C;
  const lin = (a, b) => M.polyTex([a, b]);
  const paren = s => '(' + s + ')';
  const nl = V.numberLine;
  const OPS = { '<': '<', '<=': '\\le', '>': '>', '>=': '\\ge' };
  const flipOp = { '<': '>', '<=': '>=', '>': '<', '>=': '<=' };

  CH.registerSection({
    id: '1.8', chapter: 1, title: 'Inequalities',
    summary: 'Solving inequalities: the sign-flip rule, sign charts for products and quotients, and absolute-value inequalities — with answers as intervals.',

    theory: [
      { short: true, md: 'This section is like solving equations, but with $<$ or $>$ instead of $=$.\n\n- Solve it the same way, with **one extra rule**: multiplying or dividing by a negative number **flips** the sign round.\n- The answer is not one number, it is a whole **range**, written as an interval.\n- If there is an $x^2$ or a fraction, do not try to solve it directly. Find the values where it could change sign, then test each region.\n- $|x| < 5$ means "**between**". $|x| > 5$ means "**outside**".' },
      { h: 'Inequalities have whole ranges of solutions' },
      'An equation like $2x = 6$ has one answer. An inequality like $2x < 6$ is satisfied by **every** $x$ less than $3$ — a whole interval, $(-\\infty, 3)$. So the answer to an inequality is a **set**, and we write it in interval notation (see §1.1) or draw it on a number line.',
      { svg: nl({ min: -3, max: 6, intervals: [{ lo: -Infinity, hi: 3 }] }), caption: '$2x < 6 \\iff x < 3$: the solution set $(-\\infty, 3)$. Open dot at $3$ because $3$ itself is not included.' },

      { h: 'The rules — and the one that bites' },
      '| You may… | Effect on the inequality sign | Example |\n|---|---|---|\n| add or subtract the same thing on both sides | **unchanged** | $x - 2 \\le 5 \\Rightarrow x \\le 7$ |\n| multiply or divide both sides by a **positive** number | **unchanged** | $3x \\le 6 \\Rightarrow x \\le 2$ |\n| multiply or divide both sides by a **negative** number | **flips** | $-3x < 6 \\Rightarrow x > -2$ |\n| swap the two sides | **flips** | $3 < x \\Rightarrow x > 3$ |',
      { svg: nl({ min: -4, max: 4, points: [{ x: 2, label: '2' }, { x: 3, label: '3' }, { x: -2, label: '−2', color: 'var(--viz-2)' }, { x: -3, label: '−3', color: 'var(--viz-2)' }] }), caption: 'Why multiplying by a negative flips the sign: $2 < 3$, but multiply both by $-1$ and you get $-2$ and $-3$, and now $-2 > -3$. Multiplying by a negative **mirrors** the number line, so left and right swap.' },
      { warn: 'The classic slip', md: 'From $-x \\le 6$ you get $x \\ge -6$ (dividing by $-1$ flips the sign). Forgetting the flip gives the exact opposite of the right answer. The working checker on the exercises will catch it — try it.' },

      { h: 'Linear inequalities' },
      'Solve them exactly like linear equations, keeping the rules above in mind, and finish with interval notation.',
      { example: {
        title: 'A linear inequality',
        problem: 'Solve $2x - 2 + 3 \\le 3x + 7$.',
        steps: [
          { text: 'Tidy the left side.', math: '2x + 1 \\le 3x + 7' },
          { text: 'Subtract $3x$ and $1$ from both sides.', math: '-x \\le 6' },
          { text: 'Divide by $-1$ — **flip** the sign.', math: 'x \\ge -6' },
          { text: 'Interval notation.', math: 'S = [-6, \\infty)' }
        ], answer: '$[-6, \\infty)$' } },
      'A **double inequality** like $-2 \\le 2x - 3 < 10$ is two inequalities at once. Do the same thing to **all three parts** until $x$ is alone in the middle: add $3$ everywhere ($1 \\le 2x < 13$), divide by $2$ everywhere ($\\tfrac12 \\le x < \\tfrac{13}{2}$). Answer: $[\\tfrac12, \\tfrac{13}{2})$.',

      { h: 'Non-linear inequalities: the sign chart' },
      'For something like $(x - 2)(x - 3) \\le 0$ you **cannot** just solve each bracket. The trick is to find where the expression can **change sign** — its zeros — and test the sign in between.',
      { key: 'The sign-chart method', md: '1. Get **zero on one side** and **factor** the other side.\n2. Find the **zeros** of every factor (and of the denominator, if there is one). Mark them on a number line. They cut the line into regions.\n3. In each region, work out the sign of **each factor** (pick any test point), then multiply the signs to get the sign of the whole expression.\n4. Read off the regions where the sign is what you want ($\\le 0$: negative or zero; $> 0$: positive, and so on).\n5. Decide the **endpoints**: include a zero of the numerator if the inequality has $\\le$ or $\\ge$; **never** include a zero of the denominator.' },
      { html: V.signChart({ zeros: [2, 3], rows: [{ label: 'x - 2', signs: ['-', '+', '+'] }, { label: 'x - 3', signs: ['-', '-', '+'] }], result: { label: '(x-2)(x-3)', signs: ['+', '-', '+'] }, solution: [false, true, false], includeZeros: [true, true] }), caption: 'Sign chart for $(x-2)(x-3) \\le 0$. The product is negative only between the zeros, and $\\le$ lets us keep the zeros themselves: $S = [2, 3]$.' },
      { svg: V.graph({ xmin: -1, xmax: 6, ymin: -2, ymax: 5, width: 360, id: 'sc', fns: [{ f: x => (x - 2) * (x - 3), label: 'y = (x−2)(x−3)' }], shade: [{ x1: 2, x2: 3, y1: -2, y2: 5, color: 'var(--viz-2)' }], points: [{ x: 2, y: 0, label: '2' }, { x: 3, y: 0, label: '3' }] }), caption: 'The same thing as a picture: the parabola is **below** the axis exactly between $2$ and $3$.' },
      { widget: 'sign-explorer' },
      { tip: 'Reading signs without a calculator', md: 'A factor $x - a$ is **negative to the left** of $a$ and **positive to the right**. So each row of the chart is just "$-$ until its zero, then $+$". Then count the minuses in each column: an odd number of minuses makes the product negative.' },
      { key: 'Get zero on one side first', md: 'The sign chart only works against **zero**. If the inequality has terms on both sides, move everything over before you factor:\n\n$$5x^2 + 3x \\ge 3x^2 + 2 \\;\\Rightarrow\\; 2x^2 + 3x - 2 \\ge 0 \\;\\Rightarrow\\; (2x - 1)(x + 2) \\ge 0$$\n\nNow the zeros are $\\tfrac12$ and $-2$, and the answer is $(-\\infty, -2] \\cup [\\tfrac12, \\infty)$.' },
      { warn: 'A squared factor does NOT change the sign', md: 'A factor like $(x+2)^2$ is a square, so it is **never negative**. It is positive everywhere except at $x = -2$, where it is $0$.\n\nSo crossing $-2$ does **not** flip the sign of the product.' },
      'Take $(x - 4)(x + 2)^2 < 0$. The sign is decided entirely by $(x - 4)$, so the answer is everything to the left of $4$ — **except** $x = -2$ itself, where the whole product is $0$ and a strict $<$ is not satisfied:',
      { note: 'The rule in one line', md: '$$S = (-\\infty, -2) \\cup (-2, 4)$$\n\nThat one missing point is the thing almost everybody forgets, so it is worth a deliberate check every time. A factor raised to an **even** power never flips the sign; an **odd** power flips it as usual.' },

      { h: 'Quotients (fractions)' },
      'The same method works when there is a denominator — with two extra cares: the **denominator\'s zero** is also a place where the sign can change, and it can **never** be included (division by zero), even with $\\le$ or $\\ge$.',
      { html: V.signChart({ zeros: [-3, 1, 3], rows: [{ label: 'x + 3', signs: ['-', '+', '+', '+'] }, { label: 'x - 1', signs: ['-', '-', '+', '+'] }, { label: 'x - 3', signs: ['-', '-', '-', '+'] }], result: { label: '\\frac{(x-3)(x+3)}{x-1}', signs: ['-', '+', '-', '+'] }, solution: [true, false, true, false], includeZeros: [true, false, true], excludeZeros: [false, true, false] }), caption: '$\\dfrac{(x-3)(x+3)}{x-1} \\le 0$. Negative in the first and third regions. Include $-3$ and $3$ (zeros of the top, $\\le$), exclude $1$ (zero of the bottom): $S = (-\\infty, -3] \\cup (1, 3]$.' },
      { warn: 'Never multiply both sides by something with x in it', md: 'It is tempting to clear the fraction in $\\dfrac{4x - 5}{x + 2} \\le 0$ by multiplying by $x + 2$. But $x + 2$ might be negative — and then the sign should flip — and you do not know which. Use the sign chart instead. (The working checker flags this step as not equivalent.)' },
      { key: 'When the fraction is not against zero yet', md: 'Move everything to one side and combine into a **single** fraction first. For $\\dfrac{4}{x} < x$:\n\n$$\\frac{4}{x} - x < 0 \\;\\Rightarrow\\; \\frac{4 - x^2}{x} < 0 \\;\\Rightarrow\\; \\frac{(2-x)(2+x)}{x} < 0$$\n\nZeros at $-2$, $0$ (from the bottom) and $2$. Testing each region gives $S = (-2, 0) \\cup (2, \\infty)$. Note $x = 0$ is excluded because the original fraction is undefined there.' },

      { h: 'Absolute value inequalities' },
      '$|A| < c$ says "$A$ is within $c$ of zero", which is a **single stretch** around $0$. $|A| > c$ says "$A$ is further than $c$ from zero" — **two pieces**, one on each side.',
      { key: 'Two shapes to remember', md: '$$|A| < c \\iff -c < A < c \\qquad\\qquad |A| > c \\iff A < -c \\;\\text{ or }\\; A > c$$\n\nThe same shapes work with $\\le$ and $\\ge$ — just keep the "or equal" part. Think **"less than: between"** and **"greater than: outside"**.' },
      { key: 'Get the bars on their own first', md: 'The two shapes only work when the absolute value is **alone** on one side. If it is not, rearrange before you split:\n\n$$8 - |2x - 1| \\ge 6 \\;\\Rightarrow\\; -|2x-1| \\ge -2 \\;\\Rightarrow\\; |2x - 1| \\le 2$$\n\n(Dividing by $-1$ flipped the sign, as always.) Now it is a "less than: between" problem: $-2 \\le 2x - 1 \\le 2$, giving $\\left[-\\tfrac12, \\tfrac32\\right]$.' },
      { tip: 'A fraction inside the bars', md: '$\\left|\\dfrac{x-2}{3}\\right| < 2$ works exactly the same way — "less than: between" gives $-2 < \\dfrac{x-2}{3} < 2$, then multiply all three parts by $3$: $-6 < x - 2 < 6$, so $(-4, 8)$.' },
      { widget: 'abs-inequality' },
      { example: {
        title: 'Less than: a single interval',
        problem: 'Solve $|3x - 2| \\le 4$.',
        steps: [
          { text: 'Less than → "between".', math: '-4 \\le 3x - 2 \\le 4' },
          { text: 'Add $2$ to all three parts.', math: '-2 \\le 3x \\le 6' },
          { text: 'Divide all three parts by $3$.', math: '-\\tfrac23 \\le x \\le 2 \\qquad S = \\left[-\\tfrac23, 2\\right]' }
        ], answer: '$\\left[-\\tfrac23, 2\\right]$' } },
      { example: {
        title: 'Greater than: two pieces',
        problem: 'Solve $|2x - 3| \\ge 5$.',
        steps: [
          { text: 'Greater than → "outside": two separate inequalities joined by **or**.', math: '2x - 3 \\le -5 \\quad\\text{or}\\quad 2x - 3 \\ge 5' },
          { text: 'Solve each.', math: '2x \\le -2 \\Rightarrow x \\le -1 \\qquad\\qquad 2x \\ge 8 \\Rightarrow x \\ge 4' },
          { text: 'The solution set is the **union** of the two pieces.', math: 'S = (-\\infty, -1] \\cup [4, \\infty)' }
        ], answer: '$(-\\infty, -1] \\cup [4, \\infty)$' } },
      { svg: nl({ min: -4, max: 7, intervals: [{ lo: -Infinity, hi: -1, hiC: true }, { lo: 4, hi: Infinity, loC: true, color: 'var(--viz-1)' }], points: [{ x: 1.5, label: '3/2', color: 'var(--viz-5)', open: true }] }), caption: '$|2x - 3| \\ge 5$ means $|x - \\tfrac32| \\ge \\tfrac52$: at least $\\tfrac52$ away from $\\tfrac32$, on either side.' },
      { key: 'Special cases — think before you compute', md: 'An absolute value is always $\\ge 0$. So:\n\n- $|A| < c$ with $c \\le 0$ (e.g. $|2x + 7| \\le -5$): **no solution**, $\\varnothing$.\n- $|A| > c$ with $c < 0$ (e.g. $|3x - 4| \\ge -7$): **always true**, $S = \\mathbb{R} = (-\\infty, \\infty)$.\n- $|A| \\le 0$: only when $A = 0$ — a single number.' },
      { calm: true, md: 'If sign charts feel fiddly, that is a fair reaction — there are a lot of small steps. But they are **mechanical**, and that is the good news: you follow the same five steps every time, and none of them ask you to be clever.\n\nWhen it goes wrong it is nearly always one of two things: forgetting to **flip the sign** after dividing by a negative, or including a value that makes the **bottom** of a fraction zero.\n\nIf you practise one thing here, practise marking the zeros on a number line and testing one point in each region.' },
    ],

    examples: [
      { title: 'Clearing fractions in an inequality',
        problem: 'Solve $\\dfrac{x}{3} + 1 \\ge \\dfrac{x - 1}{2}$.',
        steps: [
          { text: 'Multiply every term by the LCD, $6$ — a positive number, so the sign stays.', math: '2x + 6 \\ge 3(x - 1)' },
          { text: 'Expand and collect.', math: '2x + 6 \\ge 3x - 3 \\;\\Rightarrow\\; -x \\ge -9' },
          { text: 'Divide by $-1$: flip.', math: 'x \\le 9 \\qquad S = (-\\infty, 9]' }
        ], answer: '$(-\\infty, 9]$' },
      { title: 'A double inequality',
        problem: 'Solve $-2 \\le 2x - 3 < 10$.',
        steps: [
          { text: 'Add $3$ to all three parts.', math: '1 \\le 2x < 13' },
          { text: 'Divide all three parts by $2$.', math: '\\tfrac12 \\le x < \\tfrac{13}{2} \\qquad S = \\left[\\tfrac12, \\tfrac{13}{2}\\right)' }
        ], answer: '$\\left[\\tfrac12, \\tfrac{13}{2}\\right)$' },
      { title: 'Three factors',
        problem: 'Solve $x(x + 2)(x - 7) \\le 0$.',
        steps: [
          { text: 'Already factored with $0$ on the right. Zeros: $x = -2$, $x = 0$, $x = 7$. They cut the line into four regions.' },
          { text: 'Sign of each factor in each region (each factor is $-$ to the left of its zero, $+$ to the right), then multiply:', math: '\\begin{array}{c|cccc} & x<-2 & -2<x<0 & 0<x<7 & x>7 \\\\ \\hline x & - & - & + & + \\\\ x+2 & - & + & + & + \\\\ x-7 & - & - & - & + \\\\ \\hline \\text{product} & - & + & - & + \\end{array}' },
          { text: 'We want $\\le 0$: the negative regions, plus the zeros themselves.', math: 'S = (-\\infty, -2] \\cup [0, 7]' }
        ], answer: '$(-\\infty, -2] \\cup [0, 7]$' },
      { title: 'A quotient',
        problem: 'Solve $\\dfrac{4x - 5}{x + 2} \\le 0$.',
        steps: [
          { text: 'Zero of the numerator: $4x - 5 = 0 \\Rightarrow x = \\tfrac54$. Zero of the denominator: $x = -2$.' },
          { text: 'Sign chart with regions $x < -2$, $-2 < x < \\tfrac54$, $x > \\tfrac54$:', math: '\\begin{array}{c|ccc} & x<-2 & -2<x<\\tfrac54 & x>\\tfrac54 \\\\ \\hline 4x-5 & - & - & + \\\\ x+2 & - & + & + \\\\ \\hline \\text{quotient} & + & - & + \\end{array}' },
          { text: 'We want $\\le 0$: the middle region. Include $\\tfrac54$ (numerator zero, $\\le$); exclude $-2$ (denominator).', math: 'S = \\left(-2, \\tfrac54\\right]' }
        ], answer: '$\\left(-2, \\tfrac54\\right]$' },
      { title: 'Absolute value special cases',
        problem: 'Solve (a) $|2x + 7| \\le -5$, (b) $|3x - 4| \\ge -7$, (c) $|x - 2| < 12$.',
        steps: [
          { text: '(a) An absolute value is never negative, so it can never be $\\le -5$.', math: 'S = \\varnothing' },
          { text: '(b) An absolute value is always $\\ge 0 > -7$, so this is true for every $x$.', math: 'S = (-\\infty, \\infty)' },
          { text: '(c) Ordinary "less than → between".', math: '-12 < x - 2 < 12 \\;\\Rightarrow\\; -10 < x < 14 \\;\\Rightarrow\\; S = (-10, 14)' }
        ], answer: '(a) $\\varnothing$ &nbsp; (b) $\\mathbb{R}$ &nbsp; (c) $(-10, 14)$' }
    ],

    exercises: [
      { id: '1.8-e1', prompt: 'Solve $2x - 2 + 3 \\le 3x + 7$. Give the answer in interval notation.',
        answer: { type: 'interval', value: '[-6, inf)' },
        hints: ['Collect the $x$ terms on one side.', 'You will divide by a negative — flip the sign.'],
        solution: [{ math: '2x + 1 \\le 3x + 7 \\Rightarrow -x \\le 6 \\Rightarrow x \\ge -6', text: 'Simplify, collect, flip when dividing by $-1$.' }, { math: 'S = [-6, \\infty)' }] },
      { id: '1.8-e2', prompt: 'Solve $\\dfrac{x}{3} + 1 \\ge \\dfrac{x - 1}{2}$.',
        answer: { type: 'interval', value: '(-inf, 9]' },
        hints: ['Multiply everything by $6$.', '$2x + 6 \\ge 3x - 3$'],
        solution: [{ math: '2x + 6 \\ge 3x - 3 \\Rightarrow -x \\ge -9 \\Rightarrow x \\le 9', text: 'Clear fractions, collect, flip.' }, { math: 'S = (-\\infty, 9]' }] },
      { id: '1.8-e3', prompt: 'Solve $-2 \\le 2x - 3 < 10$.',
        answer: { type: 'interval', value: '[1/2, 13/2)' },
        hints: ['Do the same thing to all three parts.', 'Add $3$, then divide by $2$.'],
        solution: [{ math: '1 \\le 2x < 13 \\Rightarrow \\tfrac12 \\le x < \\tfrac{13}{2}', text: 'Add $3$ everywhere, divide by $2$ everywhere.' }, { math: 'S = [\\tfrac12, \\tfrac{13}{2})' }] },
      { id: '1.8-e4', prompt: 'Solve $(x - 2)(x - 3) \\le 0$.',
        answer: { type: 'interval', value: '[2, 3]' },
        hints: ['Zeros at $2$ and $3$. Test the sign in each of the three regions.', 'The product is negative only between the zeros.'],
        solution: ['Zeros $2$ and $3$. For $x < 2$ both factors are negative (product $+$); between, one is negative (product $-$); for $x > 3$ both positive. We want $\\le 0$, including the zeros: $S = [2, 3]$.'] },
      { id: '1.8-e5', prompt: 'Solve $x^2 - x - 6 > 0$.',
        answer: { type: 'interval', value: '(-inf, -2) U (3, inf)' },
        hints: ['Factor first: $(x - 3)(x + 2)$.', 'Strict inequality — the zeros are not included.'],
        solution: ['$(x - 3)(x + 2) > 0$. Zeros $-2$ and $3$. The product is positive outside the zeros: $S = (-\\infty, -2) \\cup (3, \\infty)$.'] },
      { id: '1.8-e6', prompt: 'Solve $x(x + 2)(x - 7) \\le 0$.',
        answer: { type: 'interval', value: '(-inf, -2] U [0, 7]' },
        hints: ['Three zeros: $-2$, $0$, $7$ — four regions.', 'Count minus signs in each region; an odd number gives a negative product.'],
        solution: ['Zeros $-2, 0, 7$. Signs of the product in the four regions: $-, +, -, +$. We want $\\le 0$: $S = (-\\infty, -2] \\cup [0, 7]$.'] },
      { id: '1.8-e7', prompt: 'Solve $\\dfrac{(x - 3)(x + 3)}{x - 1} \\le 0$.',
        answer: { type: 'interval', value: '(-inf, -3] U (1, 3]' },
        hints: ['Zeros of the top: $\\pm 3$. Zero of the bottom: $1$. Four regions.', 'Include $-3$ and $3$; never include $1$.'],
        solution: ['Regions cut at $-3, 1, 3$; the quotient has signs $-, +, -, +$. We want $\\le 0$: $(-\\infty, -3] \\cup (1, 3]$ — the $1$ is excluded because it makes the denominator zero.'] },
      { id: '1.8-e8', prompt: 'Solve $\\dfrac{4x - 5}{x + 2} \\le 0$.',
        answer: { type: 'interval', value: '(-2, 5/4]' },
        hints: ['Numerator zero at $\\tfrac54$, denominator zero at $-2$.', 'Do **not** multiply both sides by $x + 2$.'],
        solution: ['Signs of the quotient: $+$ for $x < -2$, $-$ between, $+$ for $x > \\tfrac54$. We want $\\le 0$: $S = (-2, \\tfrac54]$ (open at $-2$, closed at $\\tfrac54$).'] },
      { id: '1.8-e9', prompt: 'Solve $|3x - 2| \\le 4$.',
        answer: { type: 'interval', value: '[-2/3, 2]' },
        hints: ['Less than → between: $-4 \\le 3x - 2 \\le 4$.'],
        solution: [{ math: '-4 \\le 3x - 2 \\le 4 \\Rightarrow -2 \\le 3x \\le 6 \\Rightarrow -\\tfrac23 \\le x \\le 2', text: 'Rewrite without the bars and solve the double inequality.' }] },
      { id: '1.8-e10', prompt: 'Solve $|2x - 3| \\ge 5$.',
        answer: { type: 'interval', value: '(-inf, -1] U [4, inf)' },
        hints: ['Greater than → outside: $2x - 3 \\le -5$ or $2x - 3 \\ge 5$.'],
        solution: [{ math: '2x - 3 \\le -5 \\Rightarrow x \\le -1 \\qquad 2x - 3 \\ge 5 \\Rightarrow x \\ge 4', text: 'Two cases, joined by "or".' }, { math: 'S = (-\\infty, -1] \\cup [4, \\infty)' }] },
      { id: '1.8-e11', prompt: 'Solve $|2x + 7| \\le -5$.',
        answer: { type: 'interval', value: 'empty' },
        hints: ['Can an absolute value be less than a negative number?'],
        solution: ['An absolute value is never negative, so it cannot be $\\le -5$: $S = \\varnothing$.'] },
      { id: '1.8-e12', prompt: 'Solve $|3x - 4| \\ge -7$.',
        answer: { type: 'interval', value: '(-inf, inf)' },
        hints: ['Every absolute value is $\\ge 0$, and $0 \\ge -7$.'],
        solution: ['It is true for every real number: $S = (-\\infty, \\infty)$.'] },
      { id: '1.8-e13', prompt: 'Solve $x^2 < 9$.',
        answer: { type: 'interval', value: '(-3, 3)' },
        hints: ['Careful — the answer is **not** $x < 3$. Rewrite as $x^2 - 9 < 0$ and factor.', '$(x - 3)(x + 3) < 0$: negative between the zeros.'],
        solution: ['$x^2 - 9 < 0 \\Rightarrow (x-3)(x+3) < 0$, which holds between the zeros: $S = (-3, 3)$. (Check: $x = -5$ gives $25 < 9$, false — so $x < 3$ alone is wrong.)'] },
      { id: '1.8-e14', prompt: 'Solve $5x^2 + 3x \\ge 3x^2 + 2$.',
        answer: { type: 'interval', value: '(-inf, -2] U [1/2, inf)' },
        hints: ['Move everything to one side first: $2x^2 + 3x - 2 \\ge 0$.', 'Factor: $(2x - 1)(x + 2) \\ge 0$. Zeros at $\\tfrac12$ and $-2$.'],
        solution: [{ text: 'Collect on one side.', math: '5x^2 + 3x - 3x^2 - 2 \\ge 0 \\Rightarrow 2x^2 + 3x - 2 \\ge 0' }, { text: 'Factor and read the sign chart — the product is positive outside the zeros.', math: '(2x - 1)(x + 2) \\ge 0 \\Rightarrow S = (-\\infty, -2] \\cup [\\tfrac12, \\infty)' }] },
      { id: '1.8-e15', prompt: 'Solve $(x - 4)(x + 2)^2 < 0$.',
        answer: { type: 'interval', value: '(-inf, -2) U (-2, 4)' },
        hints: ['$(x+2)^2$ is a **square** — it is never negative, so it cannot flip the sign of the product.', 'So the sign is decided by $(x - 4)$ alone: the product is negative when $x < 4$.', 'But at $x = -2$ the whole product is $0$, and $0 < 0$ is false — so that one point must be left out.'],
        solution: [{ text: 'The squared factor is positive everywhere except at $x = -2$, where it is $0$. So the sign comes from $(x-4)$.' }, { text: 'That gives $x < 4$, but $x = -2$ makes the product $0$, which does not satisfy a strict $<$.', math: 'S = (-\\infty, -2) \\cup (-2, 4)' }] },
      { id: '1.8-e16', prompt: 'Solve $\\dfrac{4}{x} < x$.',
        answer: { type: 'interval', value: '(-2, 0) U (2, inf)' },
        hints: ['Do **not** multiply both sides by $x$ — you do not know its sign. Move everything to one side instead.', '$\\dfrac{4}{x} - x < 0 \\Rightarrow \\dfrac{4 - x^2}{x} < 0$.', 'Zeros at $x = \\pm 2$, and the denominator is zero at $x = 0$ — four regions.'],
        solution: [{ text: 'Put everything over one denominator.', math: '\\frac{4}{x} - x < 0 \\Rightarrow \\frac{4 - x^2}{x} < 0' }, { text: 'The sign changes at $-2$, $0$ and $2$. Testing each region gives negative on $(-2, 0)$ and $(2, \\infty)$.', math: 'S = (-2, 0) \\cup (2, \\infty)' }] },
      { id: '1.8-e17', prompt: 'Solve $8 - |2x - 1| \\ge 6$.',
        answer: { type: 'interval', value: '[-1/2, 3/2]' },
        hints: ['Get the absolute value on its own first.', '$-|2x-1| \\ge -2$, and dividing by $-1$ flips the sign: $|2x - 1| \\le 2$.'],
        solution: [{ text: 'Isolate the bars (dividing by $-1$ flips the inequality).', math: '-|2x-1| \\ge -2 \\Rightarrow |2x - 1| \\le 2' }, { text: 'Less than → between.', math: '-2 \\le 2x - 1 \\le 2 \\Rightarrow -1 \\le 2x \\le 3 \\Rightarrow -\\tfrac12 \\le x \\le \\tfrac32' }] },
      { id: '1.8-e18', prompt: 'Solve $\\left|\\dfrac{x - 2}{3}\\right| < 2$.',
        answer: { type: 'interval', value: '(-4, 8)' },
        hints: ['Less than → between: $-2 < \\dfrac{x-2}{3} < 2$.', 'Multiply all three parts by $3$.'],
        solution: [{ math: '-2 < \\frac{x-2}{3} < 2 \\Rightarrow -6 < x - 2 < 6 \\Rightarrow -4 < x < 8', text: 'Between, then clear the fraction from all three parts.' }] }
    ],

    generators: [
      { id: '1.8-g-linear', title: 'Linear inequalities', desc: 'Watch for the sign flip.',
        make(r) {
          const op = r.pick(['<', '<=', '>', '>=']);
          const a = r.int(-4, 6), c = r.int(-4, 6);
          if (a === c) return this.make(r);
          const b = r.int(-8, 8), d = r.int(-8, 8);
          // a x + b op c x + d  -> (a - c) x op d - b
          const k = a - c, rhs = d - b;
          const bound = rhs / k;
          const finalOp = k > 0 ? op : flipOp[op];
          const closed = finalOp.includes('=');
          const val = finalOp[0] === '<' ? '(-inf, ' + bound + (closed ? ']' : ')') : (closed ? '[' : '(') + bound + ', inf)';
          const bTex = C.fmtTex(bound);
          return { prompt: 'Solve $' + lin(a, b) + ' ' + OPS[op] + ' ' + lin(c, d) + '$. Give the answer in interval notation.', answer: { type: 'interval', value: val },
            hints: ['Collect the $x$ terms on the left and numbers on the right.', k < 0 ? 'You will divide by a negative number — the sign flips.' : 'Dividing by a positive number keeps the sign.'],
            solution: [{ math: k + 'x ' + OPS[op] + ' ' + rhs, text: 'Subtract $' + lin(c, 0) + '$ and $' + b + '$ from both sides.' }, { math: 'x ' + OPS[finalOp] + ' ' + bTex, text: 'Divide by $' + k + '$' + (k < 0 ? ' — negative, so flip the sign.' : '.') }, { math: 'S = ' + C.intervalsToLatex(C.parseIntervalSet(val)) }] };
        } },
      { id: '1.8-g-double', title: 'Double inequalities', desc: 'Do the same to all three parts.',
        make(r) {
          const b = r.pick([2, 3, 4, 5, -2, -3]), c = r.int(-6, 6);
          const lo = r.int(-8, 4), hi = lo + r.int(2, 10);
          const o1 = r.pick(['<', '<=']), o2 = r.pick(['<', '<=']);
          // lo o1 b x + c o2 hi
          const L = (lo - c) / b, H = (hi - c) / b;
          let I;
          if (b > 0) I = (o1 === '<=' ? '[' : '(') + L + ', ' + H + (o2 === '<=' ? ']' : ')');
          else I = (o2 === '<=' ? '[' : '(') + H + ', ' + L + (o1 === '<=' ? ']' : ')');
          return { prompt: 'Solve $' + lo + ' ' + OPS[o1] + ' ' + lin(b, c) + ' ' + OPS[o2] + ' ' + hi + '$.', answer: { type: 'interval', value: I },
            hints: ['Subtract $' + c + '$ from all three parts.', 'Then divide all three parts by $' + b + '$' + (b < 0 ? ' — negative, so both signs flip (and the ends swap).' : '.')],
            solution: [{ math: (lo - c) + ' ' + OPS[o1] + ' ' + b + 'x ' + OPS[o2] + ' ' + (hi - c), text: 'Subtract $' + c + '$ everywhere.' }, { math: b > 0 ? C.fmtTex(L) + ' ' + OPS[o1] + ' x ' + OPS[o2] + ' ' + C.fmtTex(H) : C.fmtTex(L) + ' ' + OPS[flipOp[o1]] + ' x ' + OPS[flipOp[o2]] + ' ' + C.fmtTex(H), text: 'Divide by $' + b + '$' + (b < 0 ? ', flipping both signs.' : '.') }, { math: 'S = ' + C.intervalsToLatex(C.parseIntervalSet(I)) }] };
        } },
      { id: '1.8-g-quadratic', title: 'Quadratic inequalities', desc: 'Factor, find zeros, sign chart.',
        make(r) {
          const p = r.int(-6, 4), q = p + r.int(1, 6);
          const op = r.pick(['<', '<=', '>', '>=']);
          const factored = r.bool(0.4);
          const coeffs = M.polyMul([1, -p], [1, -q]);
          const lhs = factored ? paren(lin(1, -p)) + paren(lin(1, -q)) : M.polyTex(coeffs);
          const closed = op.includes('=');
          const between = op[0] === '<';
          const val = between ? (closed ? '[' : '(') + p + ', ' + q + (closed ? ']' : ')') : '(-inf, ' + p + (closed ? ']' : ')') + ' U ' + (closed ? '[' : '(') + q + ', inf)';
          return { prompt: 'Solve $' + lhs + ' ' + OPS[op] + ' 0$.', answer: { type: 'interval', value: val },
            hints: [factored ? 'The zeros are $' + p + '$ and $' + q + '$.' : 'Factor: $' + M.polyTex(coeffs) + ' = ' + paren(lin(1, -p)) + paren(lin(1, -q)) + '$, so the zeros are $' + p + '$ and $' + q + '$.', 'The product is negative **between** the zeros and positive **outside**. ' + (closed ? 'Include the zeros.' : 'Do not include the zeros.')],
            solution: [{ text: (factored ? '' : 'Factor: $' + paren(lin(1, -p)) + paren(lin(1, -q)) + '$. ') + 'Zeros $' + p + '$ and $' + q + '$ split the line into three regions with signs $+, -, +$.' }, { text: 'We want ' + (between ? 'negative' : 'positive') + (closed ? ' or zero' : '') + ':', math: 'S = ' + C.intervalsToLatex(C.parseIntervalSet(val)) }] };
        } },
      { id: '1.8-g-cubic', title: 'Three factors', desc: 'Four regions, count the minuses.',
        make(r) {
          const zs = r.shuffle([-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]).slice(0, 3).sort((a, b) => a - b);
          const op = r.pick(['<', '<=', '>', '>=']);
          const closed = op.includes('='), wantNeg = op[0] === '<';
          const factor = z => z === 0 ? 'x' : paren(lin(1, -z));
          const lhs = zs.map(factor).join('');
          // signs of product in regions: region i (0..3) has (3 - i) negative factors -> sign = (-1)^(3-i)
          const regions = [[-Infinity, zs[0]], [zs[0], zs[1]], [zs[1], zs[2]], [zs[2], Infinity]];
          const chosen = regions.filter((reg, i) => ((3 - i) % 2 === 1) === wantNeg);
          const ints = chosen.map(([lo, hi]) => ({ lo, hi, loC: closed && isFinite(lo), hiC: closed && isFinite(hi) }));
          const val = C.intervalsToInput(C.normalizeIntervals(ints));
          return { prompt: 'Solve $' + lhs + ' ' + OPS[op] + ' 0$.', answer: { type: 'interval', value: val },
            hints: ['Zeros: $' + zs.join(', ') + '$. That makes four regions.', 'In the leftmost region all three factors are negative (product $-$); each time you pass a zero, one factor changes sign.'],
            solution: [{ text: 'Zeros $' + zs.join(', ') + '$. The product\'s sign in the four regions, left to right, is $-, +, -, +$.' }, { text: 'We want ' + (wantNeg ? 'negative' : 'positive') + (closed ? ' or zero (include the zeros)' : ' (exclude the zeros)') + ':', math: 'S = ' + C.intervalsToLatex(C.parseIntervalSet(val)) }] };
        } },
      { id: '1.8-g-quotient', title: 'Quotient inequalities', desc: 'Never include the denominator\'s zero.',
        make(r) {
          const a = r.pick([1, 1, 2, 3]), p = r.nz(-6, 6), q = r.nz(-6, 6);
          const zn = -p / a, zd = -q; // numerator zero, denominator zero
          if (Math.abs(zn - zd) < 1e-9) return this.make(r);
          const op = r.pick(['<', '<=', '>', '>=']);
          const closed = op.includes('='), wantNeg = op[0] === '<';
          const [lo, hi] = zn < zd ? [zn, zd] : [zd, zn];
          // quotient sign: + outside, - between (both factors linear with positive leading coeff)
          let ints;
          if (wantNeg) ints = [{ lo, hi, loC: closed && lo === zn, hiC: closed && hi === zn }];
          else ints = [{ lo: -Infinity, hi: lo, hiC: closed && lo === zn }, { lo: hi, hi: Infinity, loC: closed && hi === zn }];
          const val = C.intervalsToInput(C.normalizeIntervals(ints));
          return { prompt: 'Solve $\\dfrac{' + lin(a, p) + '}{' + lin(1, q) + '} ' + OPS[op] + ' 0$.', answer: { type: 'interval', value: val },
            hints: ['Zero of the numerator: $x = ' + C.fmtTex(zn) + '$. Zero of the denominator: $x = ' + zd + '$.', 'Sign chart with three regions. ' + (closed ? 'Include the numerator\'s zero, but never the denominator\'s.' : 'Neither endpoint is included.')],
            solution: [{ text: 'The quotient can change sign at $x = ' + C.fmtTex(zn) + '$ (top) and $x = ' + zd + '$ (bottom). Its sign is $+$ outside these two values and $-$ between them.' }, { text: 'We want ' + (wantNeg ? 'negative' : 'positive') + (closed ? ' or zero. The numerator zero $' + C.fmtTex(zn) + '$ is included; $' + zd + '$ is excluded (division by zero).' : '.'), math: 'S = ' + C.intervalsToLatex(C.parseIntervalSet(val)) }] };
        } },
      { id: '1.8-g-repeated', title: 'Repeated (squared) factors', desc: 'A squared factor never changes the sign.',
        make(r) {
          const p = r.int(-6, 2), q = p + r.int(2, 6);       // q is the simple zero, p the squared one
          const sqFirst = r.bool();
          const [zsq, zlin] = sqFirst ? [p, q] : [q, p];
          const op = r.pick(['<', '<=', '>', '>=']);
          const closed = op.includes('='), wantNeg = op[0] === '<';
          const wrap = t => /^[a-z]$/.test(t) ? t : paren(t);   // don't write "(x)" for a bare x
          const lhs = wrap(lin(1, -zlin)) + paren(lin(1, -zsq)) + '^2';
          // the sign of the product follows (x - zlin) alone; the squared factor only adds a zero at zsq
          let set = wantNeg ? [{ lo: -Infinity, hi: zlin, loC: false, hiC: closed }]
            : [{ lo: zlin, hi: Infinity, loC: closed, hiC: false }];
          const inside = set.some(I => zsq > I.lo && zsq < I.hi);
          if (!closed) {
            // strict: at zsq the whole product is 0, so punch that single point out of the interval
            set = set.flatMap(I => (zsq > I.lo && zsq < I.hi)
              ? [{ lo: I.lo, hi: zsq, loC: I.loC, hiC: false }, { lo: zsq, hi: I.hi, loC: false, hiC: I.hiC }]
              : [I]);
          } else if (!inside) {
            // "or equal": the product IS 0 at zsq, so that single point is a solution on its own
            set = CH.C.normalizeIntervals(set.concat([{ lo: zsq, hi: zsq, loC: true, hiC: true }]));
          }
          const val = CH.C.intervalsToInput(set);
          const isolated = closed && !inside;
          return { prompt: 'Solve $' + lhs + ' ' + OPS[op] + ' 0$.',
            answer: { type: 'interval', value: val },
            hints: ['$' + paren(lin(1, -zsq)) + '^2$ is a **square**, so it is never negative — it cannot flip the sign of the product.', 'So the sign comes from $' + lin(1, -zlin) + '$ alone. Now think about $x = ' + zsq + '$ separately: there the whole product is $0$.',
              closed ? 'The inequality allows $0$, so $x = ' + zsq + '$ **is** a solution' + (isolated ? ' — an extra single point on its own, away from the main interval.' : ' (it already sits inside the main interval).') : 'A strict inequality does **not** allow $0$, so $x = ' + zsq + '$ must be left out.'],
            solution: [{ text: 'The squared factor is positive everywhere except at $x = ' + zsq + '$, where the product is $0$. So the sign is decided by $' + lin(1, -zlin) + '$.' },
              { text: closed ? (isolated ? 'The inequality allows $0$, so $x = ' + zsq + '$ is a solution all by itself — do not forget it.' : 'The inequality allows $0$, and $x = ' + zsq + '$ already lies in the interval.') : 'Exclude $x = ' + zsq + '$, because there the product equals $0$.', math: 'S = ' + CH.C.intervalsToLatex(set) }] };
        } },
      { id: '1.8-g-rearrange', title: 'Rational inequalities to rearrange', desc: 'Get one fraction against zero first.',
        make(r) {
          const c = r.pick([1, 4, 9]), k = Math.sqrt(c);
          const flip = r.bool();
          // c/x < x   (or  c/x > x)  ->  (c - x^2)/x  <  0
          const op = flip ? '>' : '<';
          let set;
          if (!flip) set = CH.C.parseIntervalSet('(' + (-k) + ', 0) U (' + k + ', inf)');
          else set = CH.C.parseIntervalSet('(-inf, ' + (-k) + ') U (0, ' + k + ')');
          return { prompt: 'Solve $\\dfrac{' + c + '}{x} ' + OPS[op] + ' x$.',
            answer: { type: 'interval', value: CH.C.intervalsToInput(set) },
            hints: ['Do **not** multiply both sides by $x$ — its sign is unknown. Move everything to one side instead.', '$\\dfrac{' + c + '}{x} - x ' + OPS[op] + ' 0 \\Rightarrow \\dfrac{' + c + ' - x^2}{x} ' + OPS[op] + ' 0$.', 'The sign can change at $x = -' + k + '$, $x = 0$ (the denominator) and $x = ' + k + '$.'],
            solution: [{ text: 'Put everything over one denominator.', math: '\\frac{' + c + '}{x} - x ' + OPS[op] + ' 0 \\Rightarrow \\frac{' + c + ' - x^2}{x} ' + OPS[op] + ' 0' },
              { text: 'Factor the top and test each of the four regions. Remember $x = 0$ can never be included.', math: '\\frac{(' + k + ' - x)(' + k + ' + x)}{x} ' + OPS[op] + ' 0 \\Rightarrow S = ' + CH.C.intervalsToLatex(set) }] };
        } },
      { id: '1.8-g-abs', title: 'Absolute value inequalities', desc: 'Less-than: between. Greater-than: outside.',
        make(r) {
          const a = r.pick([1, 2, 3, 4]), b = r.nz(-9, 9), c = r.pick([-3, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
          const op = r.pick(['<', '<=', '>', '>=']);
          const closed = op.includes('='), less = op[0] === '<';
          let val, sol;
          if (c < 0) {
            val = less ? 'empty' : '(-inf, inf)';
            sol = [less ? 'An absolute value is never negative, so it cannot be ' + OPS[op].replace('\\le', '≤') + ' ' + c + ': $S = \\varnothing$.' : 'An absolute value is always $\\ge 0$, which is already greater than $' + c + '$: true for every $x$, $S = (-\\infty, \\infty)$.'];
          } else {
            const x1 = (-c - b) / a, x2 = (c - b) / a;
            val = less ? (closed ? '[' : '(') + x1 + ', ' + x2 + (closed ? ']' : ')') : '(-inf, ' + x1 + (closed ? ']' : ')') + ' U ' + (closed ? '[' : '(') + x2 + ', inf)';
            sol = less ? [{ math: '-' + c + ' ' + OPS[op] + ' ' + lin(a, b) + ' ' + OPS[op] + ' ' + c, text: 'Less than → between.' }, { math: (-c - b) + ' ' + OPS[op] + ' ' + a + 'x ' + OPS[op] + ' ' + (c - b) + ' \\Rightarrow ' + C.fmtTex(x1) + ' ' + OPS[op] + ' x ' + OPS[op] + ' ' + C.fmtTex(x2), text: 'Subtract $' + b + '$, divide by $' + a + '$.' }, { math: 'S = ' + C.intervalsToLatex(C.parseIntervalSet(val)) }]
              : [{ math: lin(a, b) + ' ' + OPS[flipOp[op]] + ' -' + c + ' \\quad\\text{or}\\quad ' + lin(a, b) + ' ' + OPS[op] + ' ' + c, text: 'Greater than → outside: two cases.' }, { math: 'x ' + OPS[flipOp[op]] + ' ' + C.fmtTex(x1) + ' \\quad\\text{or}\\quad x ' + OPS[op] + ' ' + C.fmtTex(x2), text: 'Solve each.' }, { math: 'S = ' + C.intervalsToLatex(C.parseIntervalSet(val)) }];
          }
          return { prompt: 'Solve $|' + lin(a, b) + '| ' + OPS[op] + ' ' + c + '$.', answer: { type: 'interval', value: val },
            hints: [c < 0 ? 'Think about what an absolute value can be before doing any algebra.' : (less ? 'Rewrite as $-' + c + ' ' + OPS[op] + ' ' + lin(a, b) + ' ' + OPS[op] + ' ' + c + '$.' : 'Rewrite as two cases: $' + lin(a, b) + ' ' + OPS[flipOp[op]] + ' -' + c + '$ or $' + lin(a, b) + ' ' + OPS[op] + ' ' + c + '$.')],
            solution: sol };
        } }
    ]
  });
})();
