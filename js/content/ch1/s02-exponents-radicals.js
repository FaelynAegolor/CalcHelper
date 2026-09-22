/* 1.2 Exponents and Radicals */
(function () {
  const M = CH.M, V = CH.V;
  const SQ = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
  const CUBES = [8, 27, 64, 125];

  CH.registerSection({
    id: '1.2', chapter: 1, title: 'Exponents and Radicals',
    summary: 'Powers and the rules for combining them, negative and fractional exponents, simplifying square roots, and getting roots out of denominators.',

    theory: [
      { short: true, md: 'This section is about **powers** (like $x^3$) and **roots** (like $\\sqrt{x}$). They are opposites of each other.\n\n- A power tells you how many copies to multiply together.\n- Multiplying powers of the same letter? **Add** the powers. Dividing? **Subtract** them.\n- A **negative** power does not make anything negative. It means "one over": $2^{-1} = \\tfrac12$.\n- A root undoes a power. $\\sqrt{9}$ asks "what number squared gives 9?"\n- A **fraction** power does both: the bottom is the root, the top is the power.' },
      { h: 'What an exponent means' },
      'An exponent is a shorthand for **repeated multiplication**. In $a^n$, the number $a$ is the **base** and $n$ is the **exponent** (or power): it tells you how many copies of $a$ to multiply.',
      '$$3^4 = \\underbrace{3 \\cdot 3 \\cdot 3 \\cdot 3}_{4 \\text{ copies}} = 81 \\qquad\\qquad (-2)^3 = (-2)(-2)(-2) = -8$$',
      { warn: 'Where the minus sign sits matters', md: '$(-2)^4 = 16$ because the bracket puts the minus inside the power. But $-2^4 = -16$: without a bracket, the power applies to $2$ only, and the minus is put on afterwards.' },
      'Two special cases: $a^1 = a$, and $a^0 = 1$ for any $a \\ne 0$ (you will see why in a moment).',

      { h: 'The laws of exponents' },
      'Every law below is just counting copies. Cover the right-hand column and try to see why each one is true.',
      '| Law | Example | Why it works |\n|---|---|---|\n| $a^m a^n = a^{m+n}$ | $x^2 x^5 = x^7$ | $(x\\cdot x)(x \\cdot x\\cdot x\\cdot x\\cdot x)$ is $7$ copies |\n| $\\dfrac{a^m}{a^n} = a^{m-n}$ | $\\dfrac{y^8}{y^6} = y^2$ | six of the eight $y$\'s cancel with the bottom |\n| $(a^m)^n = a^{mn}$ | $(x^2)^3 = x^6$ | $x^2 \\cdot x^2 \\cdot x^2$ is $2+2+2 = 6$ copies |\n| $(ab)^n = a^n b^n$ | $(2x)^3 = 8x^3$ | $(2x)(2x)(2x) = 2\\cdot2\\cdot2\\cdot x\\cdot x\\cdot x$ |\n| $\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}$ | $\\left(\\dfrac{5}{3}\\right)^2 = \\dfrac{25}{9}$ | square the top, square the bottom |',
      { warn: 'Add exponents only when the bases match', md: '$x^2 \\cdot x^5 = x^7$, but $x^2 \\cdot y^5$ cannot be combined — different bases. And $x^2 + x^5$ is **not** $x^7$: the laws are about **multiplying**, not adding.' },

      { h: 'Negative exponents' },
      'Look at what happens as the exponent goes down by one each time:',
      '| $2^3$ | $2^2$ | $2^1$ | $2^0$ | $2^{-1}$ | $2^{-2}$ | $2^{-3}$ |\n|---|---|---|---|---|---|---|\n| $8$ | $4$ | $2$ | $1$ | $\\tfrac{1}{2}$ | $\\tfrac{1}{4}$ | $\\tfrac{1}{8}$ |',
      'Each step to the right **divides by 2**. Keep going past $2^1 = 2$ and you get $2^0 = 1$, then $2^{-1} = \\tfrac12$, and so on. So a negative exponent does **not** make anything negative — it means "one over":',
      { key: 'Negative exponent = flip it', md: '$$a^{-n} = \\frac{1}{a^n} \\qquad\\text{and}\\qquad \\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^{n}$$\n\nA factor with a negative exponent can be moved across the fraction bar, and its exponent becomes positive: $\\dfrac{x^{-3}}{y^{-2}} = \\dfrac{y^{2}}{x^{3}}$.' },
      'Example: $\\left(\\dfrac{5}{3}\\right)^{-2} = \\left(\\dfrac{3}{5}\\right)^{2} = \\dfrac{9}{25}$.',

      { h: 'Radicals (roots)' },
      'A **square root** undoes squaring: $\\sqrt{25} = 5$ because $5^2 = 25$. A **cube root** undoes cubing: $\\sqrt[3]{-8} = -2$ because $(-2)^3 = -8$. In general $\\sqrt[n]{a}$ is the number whose $n$th power is $a$.',
      { svg: V.graph({ xmin: -1, xmax: 9, ymin: -1, ymax: 9, width: 380, id: 'sq', fns: [{ f: x => x * x, label: 'y = x²', domain: [0, 3] }, { f: x => Math.sqrt(x), label: 'y = √x', domain: [0, 9] }], segments: [{ x1: 0, y1: 0, x2: 8, y2: 8, dashed: true, color: 'var(--muted)' }], points: [{ x: 2, y: 4, label: '(2, 4)' }, { x: 4, y: 2, label: '(4, 2)', dy: 16 }] }), caption: 'Squaring takes $2$ to $4$; the square root takes $4$ back to $2$. The two graphs are mirror images across the dashed line.' },
      { warn: 'Two things people forget', md: '- $\\sqrt{a}$ means the **non-negative** root: $\\sqrt{16} = 4$, not $\\pm 4$.\n- You cannot take an **even** root of a negative number (there is no real $\\sqrt{-9}$), but **odd** roots of negatives are fine: $\\sqrt[3]{-27} = -3$.' },
      'Rules for roots (they are really the exponent laws in disguise):',
      '| Rule | Example |\n|---|---|\n| $\\sqrt[n]{ab} = \\sqrt[n]{a}\\,\\sqrt[n]{b}$ | $\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$ |\n| $\\sqrt[n]{\\dfrac{a}{b}} = \\dfrac{\\sqrt[n]{a}}{\\sqrt[n]{b}}$ | $\\sqrt{\\dfrac{9}{4}} = \\dfrac{3}{2}$ |\n| $\\sqrt[n]{a^n} = a$ if $n$ is odd | $\\sqrt[3]{(-2)^3} = -2$ |\n| $\\sqrt[n]{a^n} = \\lvert a \\rvert$ if $n$ is even | $\\sqrt{(-2)^2} = 2$ |',
      { warn: 'Roots do not split over + or −', md: '$\\sqrt{9 + 16} = \\sqrt{25} = 5$, but $\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$. Roots only split over **multiplication and division**.' },
      { key: 'Simplifying a square root', md: 'Hunt for the **biggest perfect square** that divides the number, pull it out, and leave the rest inside. Perfect squares to know: $4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144$.\n\n$$\\sqrt{72} = \\sqrt{36 \\cdot 2} = \\sqrt{36}\\,\\sqrt{2} = 6\\sqrt{2}$$\n\nIf you only spot a smaller square, that is fine — just keep going: $\\sqrt{72} = \\sqrt{4 \\cdot 18} = 2\\sqrt{18} = 2\\sqrt{9 \\cdot 2} = 2 \\cdot 3\\sqrt{2} = 6\\sqrt{2}$.' },
      'Roots with the same radicand (the number inside) can be added like terms: $3\\sqrt{2} + 4\\sqrt{2} = 7\\sqrt{2}$, in the same way that $3x + 4x = 7x$. If the radicands look different, simplify first — they may turn out to be the same. The same works for cube roots: $\\sqrt[3]{54} - \\sqrt[3]{16} = 3\\sqrt[3]{2} - 2\\sqrt[3]{2} = \\sqrt[3]{2}$.',

      { h: 'When the answer needs absolute value bars' },
      'Look carefully at $\\sqrt{x^2}$. If $x = 3$ it is $\\sqrt{9} = 3$ ✓. But if $x = -3$ it is $\\sqrt{9} = 3$ — **not** $-3$. So $\\sqrt{x^2}$ is not $x$; it is $|x|$.',
      { key: 'The rule', md: '$$\\sqrt[n]{a^n} = \\begin{cases} a & \\text{if } n \\text{ is } \\textbf{odd} \\\\ |a| & \\text{if } n \\text{ is } \\textbf{even}\\end{cases}$$\n\nAn **even** root always hands back something non-negative, so if the variable might be negative it needs bars. An **odd** root keeps the sign, so it never needs them: $\\sqrt[3]{(-2)^3} = -2$.' },
      { example: {
        title: 'Simplify $\\sqrt[4]{16x^4y^9}$',
        problem: 'Simplify $\\sqrt[4]{16x^4y^9}$.',
        steps: [
          { text: 'Split the inside into perfect fourth powers times what is left over.', math: '16x^4y^9 = (2xy^2)^4 \\cdot y' },
          { text: 'Split the root over the product.', math: '\\sqrt[4]{16x^4y^9} = \\sqrt[4]{(2xy^2)^4}\\ \\sqrt[4]{y}' },
          { text: 'The index $4$ is **even**, so that first piece is $|2xy^2|$. Now $2$ is positive and $y^2$ is never negative, so only the $x$ needs bars.', math: '\\sqrt[4]{(2xy^2)^4} = |2xy^2| = 2|x|y^2' },
          { text: 'Put it together.', math: '\\sqrt[4]{16x^4y^9} = 2|x|y^2\\sqrt[4]{y}' }
        ], answer: '$2|x|y^2\\sqrt[4]{y}$' } },
      { tip: 'When you can drop the bars', md: 'Many questions say "assume all variables are positive". If so, $\\sqrt{x^2} = x$ and no bars are needed. If nothing is said and the index is **even**, play safe and keep them.' },

      { h: 'Roots inside roots, and mixed indices' },
      { key: 'A root of a root: multiply the indices', md: '$$\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[mn]{a}$$\n\nSo $\\sqrt[3]{\\sqrt{64}} = \\sqrt[6]{64} = \\sqrt[6]{2^6} = 2$. Combining the two indices first is usually quicker than working the inner root out.' },
      'When two roots have **different indices**, turn them into fractional powers, add the exponents, and turn back:',
      '$$\\sqrt[3]{y}\\cdot\\sqrt{y} = y^{1/3}\\,y^{1/2} = y^{1/3 + 1/2} = y^{5/6} = \\sqrt[6]{y^5}$$',
      { tip: 'Same index? Just multiply inside', md: 'If the indices already match, combine under one root and simplify: $\\sqrt[3]{2}\\cdot\\sqrt[3]{32} = \\sqrt[3]{64} = 4$.' },


      { h: 'Rational (fractional) exponents' },
      'What could $a^{1/2}$ mean? If the laws still work, then $a^{1/2} \\cdot a^{1/2} = a^{1/2 + 1/2} = a^1 = a$. So $a^{1/2}$ is the number that squares to $a$: it is $\\sqrt{a}$.',
      { key: 'Bottom is the root, top is the power', md: '$$a^{m/n} = \\left(\\sqrt[n]{a}\\right)^{m} = \\sqrt[n]{a^m}$$\n\nTake the root **first** (the numbers stay small), then the power: $27^{2/3} = \\left(\\sqrt[3]{27}\\right)^2 = 3^2 = 9$.\n\nA negative fractional exponent just adds a flip: $8^{-2/3} = \\dfrac{1}{8^{2/3}} = \\dfrac{1}{\\left(\\sqrt[3]{8}\\right)^2} = \\dfrac{1}{4}$.' },
      'All the exponent laws work with fractional exponents, which is often the easiest way to simplify messy roots: $\\sqrt{x}\\cdot\\sqrt[3]{x} = x^{1/2} x^{1/3} = x^{5/6}$.',

      { h: 'Rationalising the denominator' },
      'By convention an answer should not have a root in the denominator. To get rid of one, multiply top and bottom by something that turns the bottom into a whole number — this is allowed because you are multiplying by $1$.',
      '- A single root: multiply by that root. $\\quad\\dfrac{1}{\\sqrt{3}} = \\dfrac{1}{\\sqrt{3}}\\cdot\\dfrac{\\sqrt{3}}{\\sqrt{3}} = \\dfrac{\\sqrt{3}}{3}$\n- A root plus or minus a number: multiply by the **conjugate** (same two terms, opposite sign in the middle). The difference-of-squares pattern $(a-b)(a+b) = a^2 - b^2$ then kills the root.',
      { html: V.areaModel({ rows: ['\\sqrt{7}', '+2'], cols: ['\\sqrt{7}', '-2'], cells: [['7', '-2\\sqrt{7}'], ['+2\\sqrt{7}', '-4']] }), caption: '$(\\sqrt{7} - 2)(\\sqrt{7} + 2)$: the two middle terms cancel, leaving $7 - 4 = 3$ — no root left.' },
      '$$\\frac{2}{\\sqrt{7} - 2} = \\frac{2}{\\sqrt{7} - 2}\\cdot\\frac{\\sqrt{7} + 2}{\\sqrt{7} + 2} = \\frac{2(\\sqrt{7} + 2)}{7 - 4} = \\frac{2\\sqrt{7} + 4}{3}$$',
      { calm: true, md: 'There are a lot of laws on this page. You are not meant to memorise them as a list, and you do not need to.\n\nEvery one of them comes from the same idea: **a power counts how many copies you are multiplying**. If you forget a law, write it out in full — $a^3 \\cdot a^2 = a \\cdot a \\cdot a \\cdot a \\cdot a = a^5$ — and read the answer off. That works every time, and it is not cheating.\n\nIf you practise one thing here, practise adding the powers when you multiply and subtracting them when you divide.' },
    ],

    examples: [
      { title: 'Power of a product',
        problem: 'Simplify $(5yz^3)^2$.',
        steps: [
          { text: 'The power applies to **every** factor inside the bracket: $(ab)^n = a^n b^n$.', math: '(5yz^3)^2 = 5^2 \\cdot y^2 \\cdot (z^3)^2' },
          { text: 'For the power of a power, multiply the exponents: $(z^3)^2 = z^{3 \\cdot 2}$.', math: '= 25\\,y^2\\,z^6' }
        ], answer: '$25y^2z^6$' },
      { title: 'Mixed laws with negative exponents',
        problem: 'Simplify $\\dfrac{(2a^3b)^2\\; a^{-4}}{b^{-3}}$ and write the answer with positive exponents only.',
        steps: [
          { text: 'Deal with the bracket first: square every factor.', math: '(2a^3b)^2 = 4a^6b^2' },
          { text: 'Move the negative powers across the fraction bar: $a^{-4}$ goes down and becomes $a^4$; $b^{-3}$ comes up and becomes $b^3$.', math: '\\frac{4a^6b^2 \\cdot a^{-4}}{b^{-3}} = \\frac{4a^6b^2 \\cdot b^3}{a^4}' },
          { text: 'Now combine like bases by adding or subtracting exponents.', math: '= 4a^{6-4}b^{2+3} = 4a^2b^5' }
        ], answer: '$4a^2b^5$' },
      { title: 'Negative power of a fraction',
        problem: 'Evaluate $\\left(\\dfrac{5}{3}\\right)^{-2}$.',
        steps: [
          { text: 'A negative exponent flips the fraction.', math: '\\left(\\frac{5}{3}\\right)^{-2} = \\left(\\frac{3}{5}\\right)^{2}' },
          { text: 'Square the top and the bottom.', math: '= \\frac{9}{25}' }
        ], answer: '$\\dfrac{9}{25}$' },
      { title: 'Adding square roots',
        problem: 'Simplify $\\sqrt{32} + \\sqrt{18}$.',
        steps: [
          { text: 'They look different, so simplify each one. Largest perfect square in $32$ is $16$; in $18$ it is $9$.', math: '\\sqrt{32} = \\sqrt{16 \\cdot 2} = 4\\sqrt{2}, \\qquad \\sqrt{18} = \\sqrt{9 \\cdot 2} = 3\\sqrt{2}' },
          { text: 'Now they are like terms — add the coefficients, just as $4x + 3x = 7x$.', math: '4\\sqrt{2} + 3\\sqrt{2} = 7\\sqrt{2}' }
        ], answer: '$7\\sqrt{2}$' },
      { title: 'A cube root with variables',
        problem: 'Simplify $\\sqrt[3]{54x^4}$.',
        steps: [
          { text: 'Look for perfect **cubes** inside. $54 = 27 \\cdot 2$ and $x^4 = x^3 \\cdot x$.', math: '\\sqrt[3]{54x^4} = \\sqrt[3]{27 \\cdot 2 \\cdot x^3 \\cdot x}' },
          { text: 'Pull the cubes out: $\\sqrt[3]{27} = 3$ and $\\sqrt[3]{x^3} = x$. What is left stays inside.', math: '= 3x\\sqrt[3]{2x}' }
        ], answer: '$3x\\sqrt[3]{2x}$' },
      { title: 'Rational exponents',
        problem: 'Evaluate (a) $27^{2/3}$ and (b) $8^{-2/3}$.',
        steps: [
          { text: '(a) Bottom of the fraction is the root, top is the power. Root first.', math: '27^{2/3} = \\left(\\sqrt[3]{27}\\right)^2 = 3^2 = 9' },
          { text: '(b) The minus flips it, then proceed as before.', math: '8^{-2/3} = \\frac{1}{8^{2/3}} = \\frac{1}{\\left(\\sqrt[3]{8}\\right)^2} = \\frac{1}{2^2} = \\frac{1}{4}' }
        ], answer: '(a) $9$ &nbsp; (b) $\\dfrac14$' },
      { title: 'Simplifying with fractional exponents',
        problem: 'Simplify $\\dfrac{y^{5/2}\\, y^{-1/2}}{y^{3}}$.',
        steps: [
          { text: 'Same base everywhere, so add the exponents on top.', math: 'y^{5/2} \\cdot y^{-1/2} = y^{5/2 - 1/2} = y^{2}' },
          { text: 'Subtract the exponent underneath.', math: '\\frac{y^2}{y^3} = y^{2-3} = y^{-1} = \\frac{1}{y}' }
        ], answer: '$\\dfrac{1}{y}$' },
      { title: 'Rationalising with a conjugate',
        problem: 'Rationalise the denominator of $\\dfrac{2}{\\sqrt{7} - 2}$.',
        steps: [
          { text: 'The conjugate of $\\sqrt{7} - 2$ is $\\sqrt{7} + 2$. Multiply top and bottom by it.', math: '\\frac{2}{\\sqrt{7} - 2} \\cdot \\frac{\\sqrt{7} + 2}{\\sqrt{7} + 2}' },
          { text: 'The bottom is a difference of squares: $(\\sqrt7)^2 - 2^2$.', math: '= \\frac{2(\\sqrt{7} + 2)}{7 - 4} = \\frac{2(\\sqrt{7} + 2)}{3}' },
          { text: 'Expand the top if you like.', math: '= \\frac{2\\sqrt{7} + 4}{3}' }
        ], answer: '$\\dfrac{2\\sqrt{7} + 4}{3}$' }
    ],

    exercises: [
      { id: '1.2-e1', prompt: 'Simplify $(3x^2y)^3$.',
        answer: { type: 'expression', value: '27x^6y^3', form: 'expanded' },
        hints: ['The power applies to every factor: $3$, $x^2$ and $y$.', '$(x^2)^3 = x^{6}$ — multiply the exponents.'],
        solution: [{ text: 'Cube every factor.', math: '(3x^2y)^3 = 3^3 (x^2)^3 y^3 = 27x^6y^3' }] },
      { id: '1.2-e2', prompt: 'Simplify $x^5 \\cdot x^{-8}$ and write it with a positive exponent.',
        answer: { type: 'expression', value: '1/x^3', form: 'positive-exponents' },
        hints: ['Same base: add the exponents.', '$x^{-3}$ means $1/x^3$.'],
        solution: [{ text: 'Add exponents, then flip the negative power.', math: 'x^{5 + (-8)} = x^{-3} = \\frac{1}{x^3}' }] },
      { id: '1.2-e3', prompt: 'Simplify $\\dfrac{4x^2y^{-1}}{2x^{-3}y^2}$ using positive exponents only.',
        answer: { type: 'expression', value: '2x^5/y^3', form: 'positive-exponents' },
        hints: ['Move $x^{-3}$ up (becomes $x^3$) and $y^{-1}$ down (becomes $y$).', 'Then $\\dfrac{4x^2 \\cdot x^3}{2 \\cdot y^2 \\cdot y}$.'],
        solution: [{ text: 'Move negative powers across the fraction bar.', math: '\\frac{4x^2y^{-1}}{2x^{-3}y^2} = \\frac{4x^2 x^3}{2y^2 y}' }, { text: 'Combine.', math: '= \\frac{2x^5}{y^3}' }] },
      { id: '1.2-e4', prompt: 'Evaluate $\\left(\\dfrac{3}{5}\\right)^{-2}$.',
        answer: { type: 'number', value: 25 / 9, display: '\\tfrac{25}{9}' },
        hints: ['Negative exponent: flip the fraction first.'],
        solution: [{ math: '\\left(\\frac{3}{5}\\right)^{-2} = \\left(\\frac{5}{3}\\right)^{2} = \\frac{25}{9}', text: 'Flip, then square.' }] },
      { id: '1.2-e5', prompt: 'Evaluate each of these. (a) $16^{3/4}$ &nbsp; (b) $8^{-2/3}$ &nbsp; (c) $\\left(\\dfrac{4}{9}\\right)^{3/2}$',
        answer: { type: 'multi', parts: [{ label: '(a)', type: 'number', value: 8 }, { label: '(b)', type: 'number', value: 0.25, display: '\\tfrac14' }, { label: '(c)', type: 'number', value: 8 / 27, display: '\\tfrac{8}{27}' }] },
        hints: ['Root first (bottom number), then the power (top number).', '(a) $\\sqrt[4]{16} = 2$, then $2^3$. (b) flip, then $\\sqrt[3]{8} = 2$, then square. (c) $\\sqrt{4/9} = 2/3$, then cube.'],
        solution: [{ text: '(a)', math: '16^{3/4} = (\\sqrt[4]{16})^3 = 2^3 = 8' }, { text: '(b)', math: '8^{-2/3} = \\frac{1}{(\\sqrt[3]{8})^2} = \\frac{1}{4}' }, { text: '(c)', math: '\\left(\\frac{4}{9}\\right)^{3/2} = \\left(\\sqrt{\\frac{4}{9}}\\right)^3 = \\left(\\frac{2}{3}\\right)^3 = \\frac{8}{27}' }] },
      { id: '1.2-e6', prompt: 'Simplify $\\sqrt{72}$.',
        answer: { type: 'expression', value: '6sqrt(2)', form: 'simplified-radical' },
        hints: ['What is the largest perfect square that divides 72?', '$72 = 36 \\cdot 2$.'],
        solution: [{ math: '\\sqrt{72} = \\sqrt{36 \\cdot 2} = \\sqrt{36}\\sqrt{2} = 6\\sqrt{2}', text: 'Pull out the perfect square.' }] },
      { id: '1.2-e7', prompt: 'Simplify $\\sqrt{50} + \\sqrt{8}$.',
        answer: { type: 'expression', value: '7sqrt(2)', form: 'simplified-radical' },
        hints: ['Simplify each root first: $50 = 25 \\cdot 2$ and $8 = 4 \\cdot 2$.', '$5\\sqrt2 + 2\\sqrt2 = ?$'],
        solution: [{ math: '\\sqrt{50} + \\sqrt{8} = 5\\sqrt{2} + 2\\sqrt{2} = 7\\sqrt{2}', text: 'Simplify, then add like terms.' }] },
      { id: '1.2-e8', prompt: 'Simplify $\\sqrt[3]{16x^5}$. (Type the cube root as `cbrt(...)`.)',
        answer: { type: 'expression', value: '2x cbrt(2x^2)', form: 'simplified-radical' },
        hints: ['Look for perfect cubes: $16 = 8 \\cdot 2$ and $x^5 = x^3 \\cdot x^2$.'],
        solution: [{ math: '\\sqrt[3]{16x^5} = \\sqrt[3]{8 \\cdot 2 \\cdot x^3 \\cdot x^2} = 2x\\sqrt[3]{2x^2}', text: 'Pull out the cubes.' }] },
      { id: '1.2-e9', prompt: 'Simplify $\\sqrt{x}\\cdot\\sqrt[3]{x}$ using a single fractional exponent.',
        answer: { type: 'expression', value: 'x^(5/6)' },
        hints: ['Write each root as a power: $x^{1/2}$ and $x^{1/3}$.', 'Add the exponents: $\\tfrac12 + \\tfrac13 = \\tfrac{3}{6} + \\tfrac{2}{6}$.'],
        solution: [{ math: 'x^{1/2} \\cdot x^{1/3} = x^{1/2 + 1/3} = x^{5/6}', text: 'Convert to exponents and add.' }] },
      { id: '1.2-e10', prompt: 'Rationalise the denominator: $\\dfrac{5}{\\sqrt{3}}$.',
        answer: { type: 'expression', value: '5sqrt(3)/3', form: 'no-radical-denominator' },
        hints: ['Multiply top and bottom by $\\sqrt{3}$.'],
        solution: [{ math: '\\frac{5}{\\sqrt{3}} \\cdot \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{5\\sqrt{3}}{3}', text: 'Multiply by $\\sqrt3/\\sqrt3$ (which is $1$).' }] },
      { id: '1.2-e11', prompt: 'Rationalise the denominator: $\\dfrac{3}{\\sqrt{5} + 2}$.',
        answer: { type: 'expression', value: '3(sqrt(5) - 2)', form: 'no-radical-denominator' },
        hints: ['The problem is the root on the bottom. You want to multiply the bottom by something that makes the root disappear.', 'Remember $(A + B)(A - B) = A^2 - B^2$ — squaring kills a square root. So multiply top and bottom by $\\sqrt{5} - 2$.', 'The bottom becomes $(\\sqrt5)^2 - 2^2 = 5 - 4 = 1$.'],
        solution: [{ math: '\\frac{3}{\\sqrt{5} + 2} \\cdot \\frac{\\sqrt{5} - 2}{\\sqrt{5} - 2} = \\frac{3(\\sqrt{5} - 2)}{5 - 4} = 3\\sqrt{5} - 6', text: 'Conjugate on top and bottom; the denominator becomes $1$.' }] },
      { id: '1.2-e12', prompt: 'Which is equal to $-3^2$?',
        answer: { type: 'choice', value: 'b', options: [{ id: 'a', label: '$9$' }, { id: 'b', label: '$-9$' }, { id: 'c', label: '$-6$' }, { id: 'd', label: '$\\dfrac19$' }], wrongMessage: 'Without a bracket, the power applies to the 3 only: $-3^2 = -(3^2)$.' },
        hints: ['There is no bracket around $-3$.'],
        solution: ['$-3^2 = -(3 \\cdot 3) = -9$. Compare $(-3)^2 = 9$.'] },
      { id: '1.2-e13', prompt: 'Simplify $\\sqrt[4]{x^4y^2z^2}$. (Do **not** assume the variables are positive — use absolute value bars where they are needed.)',
        answer: { type: 'expression', value: 'abs(x)*sqrt(y*z)', vars: ['x', 'y', 'z'], assume: 'y*z > 0', display: '|x|\\sqrt{yz}' },
        hints: ['$x^4 = (x)^4$ and $y^2z^2 = (yz)^2$.', 'The index $4$ is even, so $\\sqrt[4]{x^4} = |x|$. And $\\sqrt[4]{(yz)^2} = \\sqrt{|yz|}$.'],
        solution: [{ text: 'Split the inside into fourth powers and squares.', math: '\\sqrt[4]{x^4 y^2 z^2} = \\sqrt[4]{x^4}\\ \\sqrt[4]{(yz)^2}' }, { text: 'The index is even, so the $x$ needs bars; the square under a fourth root becomes a square root.', math: '= |x|\\sqrt{yz}' }] },
      { id: '1.2-e14', prompt: 'Simplify $\\dfrac{\\sqrt[4]{x^7}}{\\sqrt[4]{x^3}}$, without assuming $x$ is positive.',
        answer: { type: 'expression', value: 'abs(x)', vars: ['x'], display: '|x|' },
        hints: ['Same index, so combine under one root: $\\sqrt[4]{x^7/x^3}$.', '$\\sqrt[4]{x^4}$ — is the index odd or even?'],
        solution: [{ math: '\\frac{\\sqrt[4]{x^7}}{\\sqrt[4]{x^3}} = \\sqrt[4]{\\frac{x^7}{x^3}} = \\sqrt[4]{x^4} = |x|', text: 'Combine, subtract exponents, and remember the even index needs bars.' }] },
      { id: '1.2-e15', prompt: 'Simplify $\\sqrt[3]{\\sqrt{64x^6}}$ (assume $x > 0$).',
        answer: { type: 'expression', value: '2x', vars: ['x'], assume: 'x > 0' },
        hints: ['A root of a root: multiply the indices. $3 \\times 2 = 6$.', '$\\sqrt[6]{64x^6} = \\sqrt[6]{2^6x^6}$.'],
        solution: [{ math: '\\sqrt[3]{\\sqrt{64x^6}} = \\sqrt[6]{64x^6} = \\sqrt[6]{(2x)^6} = 2x', text: 'Combine the indices, then take the sixth root.' }] },
      { id: '1.2-e16', prompt: 'Simplify $\\sqrt[3]{y}\\cdot\\sqrt{y}$, writing the answer as a single root (assume $y > 0$).',
        answer: { type: 'expression', value: 'root(y^5,6)', vars: ['y'], assume: 'y > 0', display: '\\sqrt[6]{y^5}' },
        hints: ['Different indices — write each as a fractional power.', '$y^{1/3}\\cdot y^{1/2} = y^{1/3 + 1/2}$. The LCD of $3$ and $2$ is $6$.'],
        solution: [{ math: 'y^{1/3}\\,y^{1/2} = y^{2/6 + 3/6} = y^{5/6} = \\sqrt[6]{y^5}', text: 'Convert to exponents, add, convert back.' }] },
      { id: '1.2-e17', prompt: 'Simplify $\\sqrt[3]{54} - \\sqrt[3]{16}$.',
        answer: { type: 'expression', value: 'root(2,3)', form: 'simplified-radical', display: '\\sqrt[3]{2}' },
        hints: ['Look for perfect **cubes**: $54 = 27 \\cdot 2$ and $16 = 8 \\cdot 2$.', '$3\\sqrt[3]{2} - 2\\sqrt[3]{2}$ — like terms.'],
        solution: [{ math: '\\sqrt[3]{54} - \\sqrt[3]{16} = 3\\sqrt[3]{2} - 2\\sqrt[3]{2} = \\sqrt[3]{2}', text: 'Simplify each cube root, then subtract the like terms.' }] },
      { id: '1.2-e18', prompt: 'Simplify $\\sqrt[6]{64a^6b^7}$ (assume $a > 0$ and $b > 0$).',
        answer: { type: 'expression', value: '2ab*root(b,6)', vars: ['a', 'b'], assume: 'a > 0', display: '2ab\\sqrt[6]{b}' },
        hints: ['Look for perfect **sixth** powers: $64 = 2^6$, and $a^6$ is already one.', '$b^7 = b^6 \\cdot b$.'],
        solution: [{ math: '\\sqrt[6]{64a^6b^7} = \\sqrt[6]{2^6a^6b^6 \\cdot b} = 2ab\\sqrt[6]{b}', text: 'Pull out every sixth power; the leftover $b$ stays inside.' }] },
      { id: '1.2-e19', prompt: 'Simplify $\\sqrt[3]{a^2b}\\cdot\\sqrt[3]{64a^4b}$ (assume $a > 0$, $b > 0$).',
        answer: { type: 'expression', value: '4a^2*root(b^2,3)', vars: ['a', 'b'], assume: 'a > 0', display: '4a^2\\sqrt[3]{b^2}' },
        hints: ['Same index, so combine under one cube root and multiply the insides.', '$\\sqrt[3]{64a^6b^2}$ — what are the perfect cubes?'],
        solution: [{ math: '\\sqrt[3]{a^2b}\\cdot\\sqrt[3]{64a^4b} = \\sqrt[3]{64a^6b^2} = 4a^2\\sqrt[3]{b^2}', text: 'Combine, then take out the cubes $64 = 4^3$ and $a^6 = (a^2)^3$.' }] },
      { id: '1.2-e20', prompt: 'Evaluate $\\sqrt[4]{\\dfrac{1}{4}}\\cdot\\sqrt[4]{\\dfrac{1}{64}}$.',
        answer: { type: 'number', value: 0.25, display: '\\tfrac14' },
        hints: ['Same index, so multiply the insides under one root.', '$\\tfrac14 \\cdot \\tfrac{1}{64} = \\tfrac{1}{256}$, and $256 = 4^4$.'],
        solution: [{ math: '\\sqrt[4]{\\frac{1}{4}\\cdot\\frac{1}{64}} = \\sqrt[4]{\\frac{1}{256}} = \\frac{1}{4}', text: 'Combine under one fourth root; $256 = 4^4$.' }] }
    ],

    generators: [
      { id: '1.2-g-laws', title: 'Simplify with the exponent laws', desc: 'Products, quotients and powers of monomials.',
        make(r) {
          const c = r.pick([2, 3, 4, 5]), p = r.int(2, 3);
          const m1 = r.int(1, 4), n1 = r.int(1, 3), m2 = r.nz(-4, 4), n2 = r.nz(-3, 3);
          // ( c x^m1 y^n1 )^p * x^m2 * y^n2
          const ex = m1 * p + m2, ey = n1 * p + n2, coef = Math.pow(c, p);
          const term = (v, e) => e === 0 ? '' : v + (e === 1 ? '' : '^{' + e + '}');
          const prompt = 'Simplify $\\left(' + c + 'x^{' + m1 + '}y^{' + n1 + '}\\right)^{' + p + '}\\, x^{' + m2 + '}\\, y^{' + n2 + '}$. Use positive exponents only.';
          const numParts = [String(coef)], denParts = [];
          if (ex > 0) numParts.push('x^' + ex); else if (ex < 0) denParts.push('x^' + (-ex));
          if (ey > 0) numParts.push('y^' + ey); else if (ey < 0) denParts.push('y^' + (-ey));
          const value = numParts.join('*') + (denParts.length ? '/(' + denParts.join('*') + ')' : '');
          const numTex = coef + term('x', Math.max(ex, 0)) + term('y', Math.max(ey, 0));
          const denTex = term('x', Math.max(-ex, 0)) + term('y', Math.max(-ey, 0));
          const display = denTex ? '\\frac{' + numTex + '}{' + denTex + '}' : numTex;
          return { prompt, answer: { type: 'expression', value, form: 'positive-exponents', display },
            hints: ['Deal with the bracket first: raise every factor to the power $' + p + '$.', 'Then add exponents for each base separately. A negative result means that factor belongs underneath.'],
            solution: [{ text: 'Power of a product: raise each factor.', math: '\\left(' + c + 'x^{' + m1 + '}y^{' + n1 + '}\\right)^{' + p + '} = ' + coef + 'x^{' + (m1 * p) + '}y^{' + (n1 * p) + '}' },
              { text: 'Add exponents for $x$ and for $y$.', math: coef + 'x^{' + (m1 * p) + ' + (' + m2 + ')}y^{' + (n1 * p) + ' + (' + n2 + ')} = ' + coef + 'x^{' + ex + '}y^{' + ey + '}' },
              { text: 'Write negative exponents underneath.', math: '= ' + display }] };
        } },
      { id: '1.2-g-negfrac', title: 'Negative powers of numbers', desc: 'Flip, then raise to the power.',
        make(r) {
          const kind = r.pick(['int', 'frac', 'frac']);
          const n = r.int(1, 3);
          if (kind === 'int') {
            const a = r.pick([2, 3, 4, 5, 6, 10]);
            return { prompt: 'Evaluate $' + a + '^{-' + n + '}$.', answer: { type: 'number', value: Math.pow(a, -n), display: '\\tfrac{1}{' + Math.pow(a, n) + '}' },
              hints: ['$a^{-n} = \\dfrac{1}{a^n}$ — the answer is positive.'], solution: [{ math: a + '^{-' + n + '} = \\frac{1}{' + a + '^{' + n + '}} = \\frac{1}{' + Math.pow(a, n) + '}', text: 'Flip, then compute the power.' }] };
          }
          const a = r.int(1, 7), b = r.int(2, 7);
          if (a === b) return this.make(r);
          const f = M.frac(Math.pow(b, n), Math.pow(a, n));
          return { prompt: 'Evaluate $\\left(\\dfrac{' + a + '}{' + b + '}\\right)^{-' + n + '}$.', answer: { type: 'number', value: f.n / f.d, display: M.fracTex(f.n, f.d) },
            hints: ['A negative exponent flips the fraction: $\\left(\\tfrac{a}{b}\\right)^{-n} = \\left(\\tfrac{b}{a}\\right)^{n}$.'],
            solution: [{ math: '\\left(\\frac{' + a + '}{' + b + '}\\right)^{-' + n + '} = \\left(\\frac{' + b + '}{' + a + '}\\right)^{' + n + '} = ' + M.fracTex(f.n, f.d), text: 'Flip, then raise top and bottom to the power.' }] };
        } },
      { id: '1.2-g-rational', title: 'Fractional exponents', desc: 'Root first, then power.',
        make(r) {
          const base = r.pick([4, 8, 9, 16, 25, 27, 32, 64, 81, 100, 125]);
          const roots = { 4: [2, 2], 8: [3, 2], 9: [2, 3], 16: r.pick([[2, 4], [4, 2]]), 25: [2, 5], 27: [3, 3], 32: [5, 2], 64: r.pick([[2, 8], [3, 4], [6, 2]]), 81: r.pick([[2, 9], [4, 3]]), 100: [2, 10], 125: [3, 5] };
          const [n, root] = roots[base];
          const m = r.pick([1, 2, 3].filter(x => x !== n));
          const neg = r.bool(0.4);
          const val = Math.pow(root, m);
          const expTex = (neg ? '-' : '') + '\\frac{' + m + '}{' + n + '}';
          const rootTex = n === 2 ? '\\sqrt{' + base + '}' : '\\sqrt[' + n + ']{' + base + '}';
          return { prompt: 'Evaluate $' + base + '^{' + expTex + '}$.',
            answer: { type: 'number', value: neg ? 1 / val : val, display: neg ? '\\tfrac{1}{' + val + '}' : String(val) },
            hints: ['Bottom number $' + n + '$ is the root, top number $' + m + '$ is the power.' + (neg ? ' The minus sign means "one over".' : ''), '$' + rootTex + ' = ' + root + '$.'],
            solution: [neg ? { text: 'The negative exponent flips it.', math: base + '^{' + expTex + '} = \\frac{1}{' + base + '^{' + m + '/' + n + '}}' } : { text: 'Root first, then power.', math: base + '^{' + m + '/' + n + '} = \\left(' + rootTex + '\\right)^{' + m + '}' },
              { text: '$' + rootTex + ' = ' + root + '$, then raise to the power $' + m + '$.', math: (neg ? '\\frac{1}{' + root + '^{' + m + '}} = \\frac{1}{' + val + '}' : root + '^{' + m + '} = ' + val) }] };
        } },
      { id: '1.2-g-simplify-root', title: 'Simplify a square root', desc: 'Pull out the biggest perfect square.',
        make(r) {
          const sq = r.pick([4, 9, 16, 25, 36, 49]), rest = r.pick([2, 3, 5, 6, 7, 10, 11]);
          const N = sq * rest, c = Math.sqrt(sq);
          const withVar = r.bool(0.4);
          const e = withVar ? r.pick([2, 3, 4, 5]) : 0;
          const vOut = Math.floor(e / 2), vIn = e % 2;
          const prompt = 'Simplify $\\sqrt{' + N + (withVar ? 'x^{' + e + '}' : '') + '}$' + (withVar ? ' (assume $x \\ge 0$)' : '') + '.';
          const value = c + (vOut ? 'x^' + vOut : '') + '*sqrt(' + rest + (vIn ? 'x' : '') + ')';
          const display = c + (vOut ? 'x^{' + vOut + '}' : '') + '\\sqrt{' + rest + (vIn ? 'x' : '') + '}';
          return { prompt, answer: { type: 'expression', value, form: 'simplified-radical', display },
            hints: ['Largest perfect square dividing $' + N + '$ is $' + sq + '$.' + (withVar ? ' For $x^{' + e + '}$, take out pairs: $x^{' + e + '} = x^{' + (2 * vOut) + '}' + (vIn ? '\\cdot x' : '') + '$.' : '')],
            solution: [{ text: 'Split into a perfect square times what is left.', math: '\\sqrt{' + N + (withVar ? 'x^{' + e + '}' : '') + '} = \\sqrt{' + sq + ' \\cdot ' + rest + (withVar ? ' \\cdot x^{' + (2 * vOut) + '}' + (vIn ? ' \\cdot x' : '') : '') + '}' }, { text: 'Take the square roots of the perfect squares.', math: '= ' + display }] };
        } },
      { id: '1.2-g-add-roots', title: 'Add and subtract roots', desc: 'Simplify first, then combine like terms.',
        make(r) {
          const cube = r.bool(0.35);
          const n = cube ? 3 : 2;
          const rad = cube ? r.pick([2, 3, 5, 7]) : r.pick([2, 3, 5, 6, 7]);
          const cubes = [8, 27, 64, 125], squares = [4, 9, 16, 25, 36];
          const pool = cube ? cubes : squares;
          const a = r.pick(pool), b = r.pick(pool.filter(x => x !== a));
          const op = r.pick(['+', '-']);
          const ca = Math.round(Math.pow(a, 1 / n)), cb = Math.round(Math.pow(b, 1 / n));
          const res = op === '+' ? ca + cb : ca - cb;
          const rt = x => n === 2 ? '\\sqrt{' + x + '}' : '\\sqrt[3]{' + x + '}';
          const rtS = x => n === 2 ? 'sqrt(' + x + ')' : 'root(' + x + ',3)';
          const display = (res === 0 ? '0' : (res === 1 ? '' : res === -1 ? '-' : res) + rt(rad));
          return { prompt: 'Simplify $' + rt(a * rad) + ' ' + op + ' ' + rt(b * rad) + '$.',
            answer: { type: 'expression', value: res + '*' + rtS(rad), form: 'simplified-radical', display },
            hints: ['Simplify each root: $' + (a * rad) + ' = ' + a + ' \\cdot ' + rad + '$ and $' + (b * rad) + ' = ' + b + ' \\cdot ' + rad + '$' + (cube ? ' (look for perfect **cubes**)' : '') + '.', 'Then combine $' + ca + rt(rad) + ' ' + op + ' ' + cb + rt(rad) + '$ like terms.'],
            solution: [{ text: 'Simplify each root.', math: rt(a * rad) + ' = ' + ca + rt(rad) + ', \\qquad ' + rt(b * rad) + ' = ' + cb + rt(rad) }, { text: 'Same radicand, so combine the coefficients.', math: ca + rt(rad) + ' ' + op + ' ' + cb + rt(rad) + ' = ' + display }] };
        } },
      { id: '1.2-g-rationalise', title: 'Rationalise the denominator', desc: 'Single roots and conjugates.',
        make(r) {
          const kind = r.pick(['single', 'conj', 'conj']);
          if (kind === 'single') {
            const a = r.int(1, 9), b = r.pick([2, 3, 5, 6, 7]);
            const g = M.gcd(a, b);
            const display = (a / g === 1 ? '' : a / g) + '\\sqrt{' + b + '}' + (b / g === 1 ? '' : '') ;
            const value = a + '*sqrt(' + b + ')/' + b;
            const simpTex = b / g === 1 ? (a / g === 1 ? '' : a / g) + '\\sqrt{' + b + '}' : '\\frac{' + (a / g === 1 ? '' : a / g) + '\\sqrt{' + b + '}}{' + (b / g) + '}';
            const finalTex = '\\frac{' + a + '\\sqrt{' + b + '}}{' + b + '}' + (g > 1 ? ' = ' + simpTex : '');
            return { prompt: 'Rationalise the denominator: $\\dfrac{' + a + '}{\\sqrt{' + b + '}}$.', answer: { type: 'expression', value, form: 'no-radical-denominator', display: g > 1 ? (b / g === 1 ? (a / g === 1 ? '' : a / g) + '\\sqrt{' + b + '}' : '\\frac{' + (a / g) + '\\sqrt{' + b + '}}{' + (b / g) + '}') : '\\frac{' + a + '\\sqrt{' + b + '}}{' + b + '}' },
              hints: ['Multiply top and bottom by $\\sqrt{' + b + '}$.'], solution: [{ math: '\\frac{' + a + '}{\\sqrt{' + b + '}} \\cdot \\frac{\\sqrt{' + b + '}}{\\sqrt{' + b + '}} = ' + finalTex, text: 'Multiply by $\\sqrt{' + b + '}/\\sqrt{' + b + '}$.' }] };
          }
          const a = r.int(1, 6), b = r.pick([2, 3, 5, 6, 7, 10]), c = r.int(1, 3), sgn = r.pick(['+', '-']);
          const den = b - c * c;
          if (den === 0) return this.make(r);
          const conjSgn = sgn === '+' ? '-' : '+';
          const value = a + '*(sqrt(' + b + ') ' + conjSgn + ' ' + c + ')/(' + den + ')';
          const display = den === 1 ? a + '(\\sqrt{' + b + '} ' + conjSgn + ' ' + c + ')' : den === -1 ? '-' + a + '(\\sqrt{' + b + '} ' + conjSgn + ' ' + c + ')' : '\\frac{' + a + '(\\sqrt{' + b + '} ' + conjSgn + ' ' + c + ')}{' + den + '}';
          return { prompt: 'Rationalise the denominator: $\\dfrac{' + a + '}{\\sqrt{' + b + '} ' + sgn + ' ' + c + '}$.',
            answer: { type: 'expression', value, form: 'no-radical-denominator', display },
            hints: ['Multiply top and bottom by the conjugate $\\sqrt{' + b + '} ' + conjSgn + ' ' + c + '$.', 'The bottom becomes $(\\sqrt{' + b + '})^2 - ' + c + '^2 = ' + den + '$.'],
            solution: [{ text: 'Multiply by the conjugate over itself.', math: '\\frac{' + a + '}{\\sqrt{' + b + '} ' + sgn + ' ' + c + '} \\cdot \\frac{\\sqrt{' + b + '} ' + conjSgn + ' ' + c + '}{\\sqrt{' + b + '} ' + conjSgn + ' ' + c + '}' }, { text: 'Difference of squares underneath.', math: '= \\frac{' + a + '(\\sqrt{' + b + '} ' + conjSgn + ' ' + c + ')}{' + b + ' - ' + (c * c) + '} = ' + display }] };
        } },
      { id: '1.2-g-nested', title: 'Roots inside roots, and mixed indices', desc: 'Multiply the indices, or use fractional powers.',
        make(r) {
          const kind = r.pick(['nested', 'nested', 'mixed', 'sameindex']);
          if (kind === 'nested') {
            const base = r.pick([2, 3]), m = r.pick([2, 3]), n = r.pick([2, 3]);
            const idx = m * n, val = Math.pow(base, idx);
            const inner = n === 2 ? '\\sqrt{' + val + 'x^{' + idx + '}}' : '\\sqrt[' + n + ']{' + val + 'x^{' + idx + '}}';
            const outer = m === 2 ? '\\sqrt{' + inner + '}' : '\\sqrt[' + m + ']{' + inner + '}';
            return { prompt: 'Simplify $' + outer + '$ (assume $x > 0$).',
              answer: { type: 'expression', value: base + 'x', vars: ['x'], assume: 'x > 0', display: base + 'x' },
              hints: ['A root of a root: **multiply the indices**, $' + m + ' \\times ' + n + ' = ' + idx + '$.', '$\\sqrt[' + idx + ']{' + val + 'x^{' + idx + '}} = \\sqrt[' + idx + ']{(' + base + 'x)^{' + idx + '}}$.'],
              solution: [{ math: outer + ' = \\sqrt[' + idx + ']{' + val + 'x^{' + idx + '}} = \\sqrt[' + idx + ']{(' + base + 'x)^{' + idx + '}} = ' + base + 'x', text: 'Combine the indices, then take the root.' }] };
          }
          if (kind === 'mixed') {
            const n1 = r.pick([2, 3]), n2 = r.pick([3, 4, 6].filter(x => x !== n1));
            const L = M.lcm(n1, n2), top = L / n1 + L / n2;
            const rt = (n, inside) => n === 2 ? '\\sqrt{' + inside + '}' : '\\sqrt[' + n + ']{' + inside + '}';
            return { prompt: 'Simplify $' + rt(n1, 'y') + '\\cdot' + rt(n2, 'y') + '$, writing the answer as a single root (assume $y > 0$).',
              answer: { type: 'expression', value: 'root(y^' + top + ',' + L + ')', vars: ['y'], assume: 'y > 0', display: top === L ? 'y' : '\\sqrt[' + L + ']{y^{' + top + '}}' },
              hints: ['Different indices — write each as a fractional power: $y^{1/' + n1 + '}$ and $y^{1/' + n2 + '}$.', 'Add the exponents over the common denominator $' + L + '$.'],
              solution: [{ math: 'y^{1/' + n1 + '}\\,y^{1/' + n2 + '} = y^{' + (L / n1) + '/' + L + ' + ' + (L / n2) + '/' + L + '} = y^{' + top + '/' + L + '}', text: 'Convert to fractional powers and add.' }, { math: '= ' + (top === L ? 'y' : '\\sqrt[' + L + ']{y^{' + top + '}}'), text: 'Write it back as a root.' }] };
          }
          const n = r.pick([3, 3, 4]), a = r.int(2, 4), b = r.int(2, 5);
          const A = Math.pow(a, n), B = Math.pow(b, n);
          const rt = inside => n === 2 ? '\\sqrt{' + inside + '}' : '\\sqrt[' + n + ']{' + inside + '}';
          return { prompt: 'Simplify $' + rt(A) + '\\cdot' + rt(B) + '$.',
            answer: { type: 'number', value: a * b },
            hints: ['The indices match, so combine them into one root of the product.', '$' + A + ' \\cdot ' + B + ' = ' + (A * B) + ' = ' + (a * b) + '^{' + n + '}$.'],
            solution: [{ math: rt(A) + '\\cdot' + rt(B) + ' = ' + rt(A + ' \\cdot ' + B) + ' = ' + rt(A * B) + ' = ' + (a * b), text: 'Same index: multiply the insides, then take the root.' }] };
        } },
      { id: '1.2-g-absroot', title: 'Even roots and absolute value', desc: 'Does the answer need |x| bars?',
        make(r) {
          const n = r.pick([2, 4, 6]);
          const e = n * r.pick([1, 1, 2]);
          const c = r.pick([1, 2, 3]);
          const inside = (c === 1 ? '' : Math.pow(c, n)) + 'x^{' + e + '}';
          const outPow = e / n;
          const evenOut = outPow % 2 === 0;               // x^even is never negative, so no bars needed
          const body = (c === 1 ? '' : c) + (outPow === 1 ? 'x' : 'x^{' + outPow + '}');
          const needBars = !evenOut;
          const display = needBars ? (c === 1 ? '' : c) + '|x' + (outPow === 1 ? '' : '^{' + outPow + '}') + '|' : body;
          const value = needBars ? (c === 1 ? '' : c + '*') + 'abs(x^' + outPow + ')' : (c === 1 ? '' : c + '*') + 'x^' + outPow;
          const rt = n === 2 ? '\\sqrt{' + inside + '}' : '\\sqrt[' + n + ']{' + inside + '}';
          return { prompt: 'Simplify $' + rt + '$. Do **not** assume $x$ is positive — include absolute value bars if they are needed.',
            answer: { type: 'expression', value, vars: ['x'], display },
            hints: ['The index $' + n + '$ is even, so $\\sqrt[' + n + ']{a^{' + n + '}} = |a|$.', needBars ? 'Here what comes out is $' + body + '$, and $x^{' + outPow + '}$ **can** be negative — so it needs bars.' : 'Here what comes out is $' + body + '$, and $x^{' + outPow + '}$ is never negative — so no bars are needed.'],
            solution: [{ math: rt + ' = \\sqrt[' + n + ']{\\left(' + body + '\\right)^{' + n + '}} = ' + display, text: needBars ? 'The index is even and the result could be negative, so bars are required.' : 'The index is even, but an even power is already non-negative, so no bars are needed.' }] };
        } }
    ]
  });
})();
