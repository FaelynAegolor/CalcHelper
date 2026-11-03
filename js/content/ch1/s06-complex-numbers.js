/* 1.6 Complex Numbers
   Stewart 7e §1.6: arithmetic on complex numbers, square roots of negative numbers,
   complex solutions of quadratic equations.
   Answers set `complex: true` so they can be typed naturally as a + bi. */
(function () {
  const M = CH.M, V = CH.V;
  const setTex = arr => arr.length ? '\\{' + arr.join(',\\ ' ) + '\\}' : '\\varnothing';

  /* a + bi as LaTeX, tidied: drops zero parts, hides a coefficient of 1 */
  function cxTex(a, b) {
    if (!b) return String(a);
    const mag = Math.abs(b) === 1 ? '' : String(Math.abs(b));
    const im = mag + 'i';
    if (!a) return (b < 0 ? '-' : '') + im;
    return a + (b < 0 ? ' - ' : ' + ') + im;
  }
  /* the same thing as something the parser will accept */
  function cxStr(a, b) {
    if (!b) return String(a);
    return '(' + a + ') + (' + b + ')*i';
  }
  /* a small Argand diagram: axes, the point, and its two parts marked off */
  function argand(a, b, label) {
    const W = 300, H = 230, cx = 150, cy = 115, u = 26;
    const px = cx + a * u, py = cy - b * u;
    const g = [];
    for (let k = -5; k <= 5; k++) {
      if (!k) continue;
      g.push('<line x1="' + (cx + k * u) + '" y1="' + (cy - 4) + '" x2="' + (cx + k * u) + '" y2="' + (cy + 4) + '" stroke="var(--grid)"/>');
      g.push('<line x1="' + (cx - 4) + '" y1="' + (cy - k * u) + '" x2="' + (cx + 4) + '" y2="' + (cy - k * u) + '" stroke="var(--grid)"/>');
    }
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="viz" role="img" aria-label="The complex number ' + label + ' plotted on the complex plane, ' + a + ' across and ' + b + ' up">' +
      '<line x1="10" y1="' + cy + '" x2="' + (W - 10) + '" y2="' + cy + '" stroke="var(--axis)" stroke-width="1.5"/>' +
      '<line x1="' + cx + '" y1="10" x2="' + cx + '" y2="' + (H - 18) + '" stroke="var(--axis)" stroke-width="1.5"/>' +
      g.join('') +
      '<line x1="' + cx + '" y1="' + cy + '" x2="' + px + '" y2="' + py + '" stroke="var(--viz-1)" stroke-width="2" stroke-dasharray="4 3"/>' +
      '<line x1="' + px + '" y1="' + cy + '" x2="' + px + '" y2="' + py + '" stroke="var(--viz-2)" stroke-width="2" stroke-dasharray="3 3"/>' +
      '<circle cx="' + px + '" cy="' + py + '" r="5" fill="var(--viz-point)"/>' +
      '<text x="' + (px + 9) + '" y="' + (py - 7) + '" fill="var(--text)" font-size="13" font-weight="700">' + label + '</text>' +
      '<text x="' + (W - 14) + '" y="' + (cy - 8) + '" fill="var(--muted)" font-size="11" text-anchor="end">real</text>' +
      '<text x="' + (cx + 7) + '" y="20" fill="var(--muted)" font-size="11">imaginary</text>' +
      '<text x="' + ((cx + px) / 2) + '" y="' + (cy + 15) + '" fill="var(--viz-1)" font-size="11" text-anchor="middle">' + a + '</text>' +
      '<text x="' + (px + 7) + '" y="' + ((cy + py) / 2) + '" fill="var(--viz-2)" font-size="11">' + b + '</text>' +
      '</svg>';
  }

  CH.registerSection({
    id: '1.6', chapter: 1, title: 'Complex Numbers',
    summary: 'A new number, $i$, whose square is $-1$ — so that every quadratic has solutions. Adding, multiplying and dividing with it, square roots of negative numbers, and quadratics whose answers are not real.',

    theory: [
      { short: true, md: 'This section invents **one new number** and everything else follows from it.\n\n- $i$ is the number whose square is $-1$. That is the whole idea.\n- A **complex number** looks like $a + bi$: a real bit and an $i$ bit.\n- Add and subtract by keeping the two bits apart, exactly like collecting $x$ terms.\n- Multiply by expanding brackets as usual, then replace every $i^2$ with $-1$.\n- Divide by multiplying top and bottom by the **conjugate** — the same trick as getting roots off the bottom in 1.2.\n- A quadratic with $b^2-4ac$ negative has no *real* answers, but it does have complex ones.' },

      { h: 'Why bother inventing a new number?' },
      'Think about the equation $x^2 + 4 = 0$. Rearranged, it says $x^2 = -4$. No real number works: squaring anything real gives something positive or zero, never $-4$. In 1.5 you met this as "$b^2-4ac$ is negative, so there are no real solutions."',
      'Mathematicians did the only thing they could: they made up a number that does work, and checked that nothing broke. That number is called $i$.',
      { def: 'The imaginary unit', md: '$$i = \\sqrt{-1}, \\qquad\\text{so}\\qquad i^2 = -1$$\n\nThat second line is the one you actually use. Every single thing in this section comes from replacing $i^2$ with $-1$.' },
      { calm: true, md: '"Imaginary" is a terrible name and it puts people off. It does not mean fake or pretend — $i$ obeys all the ordinary rules of algebra and engineers use it every day to describe real electrical circuits.\n\nIf it helps, think of $i$ as just another letter, like $x$, that happens to come with one extra fact: whenever you see $i^2$, you are allowed to write $-1$ instead. That one permission is the whole section.' },

      { h: 'What a complex number looks like' },
      { def: 'Complex number', md: 'A **complex number** is anything of the form\n\n$$a + bi$$\n\nwhere $a$ and $b$ are ordinary real numbers.\n\n- $a$ is called the **real part**\n- $b$ is called the **imaginary part** — note it is just $b$, *not* $bi$' },
      'So for $5 - 7i$ the real part is $5$ and the imaginary part is $-7$. Take the sign with it.',
      { note: 'Ordinary numbers are complex too', md: 'If $b = 0$ you get $a + 0i$, which is just $a$. So every real number is already a complex number with no $i$ part. Nothing you learned before has been thrown away.\n\nIf $a = 0$ you get something like $3i$, which is called **purely imaginary**.' },
      { svg: argand(3, 2, '3 + 2i'), caption: 'A complex number is a **point**, not a position on a line. Go $3$ along the real axis, then $2$ up the imaginary axis. This picture is called the complex plane.' },

      { h: 'Adding and subtracting' },
      { key: 'Keep the two parts apart', md: 'Add the real parts together, and add the imaginary parts together. Nothing else happens.\n\n$$(a+bi) + (c+di) = (a+c) + (b+d)i$$\n\nIt is exactly like collecting like terms: the real numbers are one kind of term and the $i$s are another, and they never mix.' },
      { example: {
        title: 'A sum and a difference', label: 'Worked example',
        problem: 'Work out (a) $(4+7i) + (5-10i)$ and (b) $(4+7i) - (5-10i)$.',
        steps: [
          { text: '**(a)** Add the real parts: $4+5$. Add the imaginary parts: $7 + (-10)$.', math: '(4+5) + (7-10)i = 9 - 3i' },
          { text: '**(b)** Subtracting means every term in the second bracket changes sign. This is where most slips happen — $-(-10i)$ becomes $+10i$.', math: '(4-5) + (7-(-10))i' },
          { text: 'Tidy up.', math: '= -1 + 17i' }
        ],
        answer: '(a) $9-3i$  (b) $-1+17i$',
        checklist: ['Add or subtract the real parts.', 'Add or subtract the imaginary parts.', 'When subtracting, change the sign of **both** parts of the second bracket.', 'Write the answer as $a+bi$.']
      } },

      { h: 'Multiplying' },
      { key: 'Expand, then swap $i^2$ for $-1$', md: 'Multiply the brackets out exactly as you would in 1.3 — every term by every term. Then you will have an $i^2$ somewhere, and you replace it with $-1$.\n\n$$(a+bi)(c+di) = ac + adi + bci + bd\\,i^2 = (ac - bd) + (ad+bc)i$$\n\nYou do **not** need to memorise that last line. Expanding and then tidying is quicker and harder to get wrong.' },
      { example: {
        title: 'A product', label: 'Worked example',
        problem: 'Work out $(2+5i)(3-4i)$.',
        steps: [
          { text: 'Multiply every term by every term, just like any two brackets.', math: '(2)(3) + (2)(-4i) + (5i)(3) + (5i)(-4i)' },
          { text: 'Work each piece out. The last one gives $-20i^2$.', math: '= 6 - 8i + 15i - 20i^2' },
          { text: 'Now use the one fact: $i^2 = -1$, so $-20i^2 = -20(-1) = +20$.', math: '= 6 - 8i + 15i + 20' },
          { text: 'Collect the real parts and the $i$ parts.', math: '= 26 + 7i' }
        ],
        answer: '$26 + 7i$',
        checklist: ['Expand as you would any two brackets.', 'Find the $i^2$ term.', 'Replace $i^2$ with $-1$ — watch the sign.', 'Collect real parts and $i$ parts separately.']
      } },

      { h: 'Powers of $i$' },
      'Powers of $i$ go round in a cycle of four, and then repeat forever:',
      { md: '| Power | Working | Value |\n|---|---|---|\n| $i^1$ | — | $i$ |\n| $i^2$ | the definition | $-1$ |\n| $i^3$ | $i^2 \\cdot i = -1 \\cdot i$ | $-i$ |\n| $i^4$ | $i^2 \\cdot i^2 = (-1)(-1)$ | $1$ |\n| $i^5$ | $i^4 \\cdot i = 1 \\cdot i$ | back to $i$ |' },
      { tip: 'A shortcut for big powers', md: 'Divide the power by $4$ and keep only the **remainder**. Then read it off: remainder $0 \\to 1$, $1 \\to i$, $2 \\to -1$, $3 \\to -i$.\n\nFor $i^{27}$: $27 \\div 4 = 6$ remainder $3$, so $i^{27} = i^3 = -i$.' },

      { h: 'Square roots of negative numbers' },
      { key: 'Pull the $i$ out first', md: 'For any positive number $r$,\n\n$$\\sqrt{-r} = i\\sqrt{r}$$\n\nSo $\\sqrt{-25} = 5i$, and $\\sqrt{-50} = i\\sqrt{50} = 5i\\sqrt2$. Deal with the minus sign first, then simplify the root exactly as you did in 1.2.' },
      { warn: 'The rule $\\sqrt{A}\\sqrt{B} = \\sqrt{AB}$ breaks here', md: 'With negative numbers inside, that rule from 1.2 stops working. Watch:\n\n$$\\sqrt{-4}\\,\\sqrt{-9} = (2i)(3i) = 6i^2 = -6$$\n\nBut if you had carelessly written $\\sqrt{(-4)(-9)} = \\sqrt{36} = 6$, you would get the wrong sign.\n\n**So always convert to $i$ form first, then multiply.** Never multiply under the root signs when anything inside is negative.' },

      { h: 'The conjugate, and dividing' },
      { def: 'Complex conjugate', md: 'The **conjugate** of $a+bi$ is $a-bi$ — the same number with the sign of the $i$ part flipped. It is written $\\overline{z}$.\n\nThe useful thing about it: multiplying a complex number by its conjugate always gives a **real** answer.' },
      { why: 'Why the conjugate kills the $i$', md: 'It is the difference of squares from 1.3, with $A=a$ and $B=bi$:\n\n$$(a+bi)(a-bi) = a^2 - (bi)^2 = a^2 - b^2i^2 = a^2 + b^2$$\n\nThe $i^2$ turns the $-$ into a $+$, and nothing imaginary survives. That is exactly what you need to clear the bottom of a fraction.' },
      { key: 'Dividing complex numbers', md: 'Multiply the top and the bottom by the conjugate of the **bottom**. This is the same move you used in 1.2 to get roots off the denominator, for the same reason.' },
      { example: {
        title: 'A quotient', label: 'Worked example',
        problem: 'Write $\\dfrac{1+2i}{3-4i}$ in the form $a+bi$.',
        steps: [
          { text: 'The bottom is $3-4i$, so its conjugate is $3+4i$. Multiply top and bottom by that.', math: '\\frac{1+2i}{3-4i}\\cdot\\frac{3+4i}{3+4i}' },
          { text: 'Bottom first — it is a difference of squares, so the $i$ disappears.', math: '(3-4i)(3+4i) = 9 + 16 = 25' },
          { text: 'Now the top, expanding as usual.', math: '(1+2i)(3+4i) = 3 + 4i + 6i + 8i^2 = 3 + 10i - 8 = -5 + 10i' },
          { text: 'Put them together and split into two parts.', math: '\\frac{-5+10i}{25} = -\\frac{5}{25} + \\frac{10}{25}i = -\\frac15 + \\frac25 i' }
        ],
        answer: '$-\\tfrac15 + \\tfrac25 i$',
        checklist: ['Write down the conjugate of the **bottom**.', 'Multiply top and bottom by it.', 'The bottom becomes $a^2+b^2$, a real number.', 'Expand the top, then divide both parts by that number.']
      } },

      { h: 'Quadratics that have no real answers' },
      'Back in 1.5, a negative discriminant meant "no real solutions" and you stopped. Now you can keep going.',
      { key: 'When $b^2-4ac$ is negative', md: 'Use the quadratic formula exactly as before. The only new step is turning the square root of a negative number into $i$ form.\n\nThe two answers always come out as a **conjugate pair**: $p+qi$ and $p-qi$.' },
      { example: {
        title: 'Complex solutions', label: 'Worked example',
        problem: 'Solve $x^2 - 6x + 25 = 0$.',
        steps: [
          { text: 'Note the coefficients and work out the discriminant first.', math: 'a=1,\\ b=-6,\\ c=25; \\qquad b^2-4ac = 36 - 100 = -64' },
          { text: 'It is negative, so there are no real solutions — but there are complex ones. Put it into the formula.', math: 'x = \\frac{6 \\pm \\sqrt{-64}}{2}' },
          { text: 'Convert the root: $\\sqrt{-64} = 8i$.', math: 'x = \\frac{6 \\pm 8i}{2}' },
          { text: 'Divide **both** parts by $2$.', math: 'x = 3 \\pm 4i' }
        ],
        answer: '$x = 3 + 4i$ or $x = 3 - 4i$',
        checklist: ['Work out $b^2-4ac$ first.', 'Negative means the answers are complex, not that there are none.', 'Use the formula, then turn $\\sqrt{-r}$ into $i\\sqrt{r}$.', 'Divide every part by $2a$ — the answers are a conjugate pair.']
      } },

      { sid: '1.6', title: 'Can I do this?',
        intro: 'Tick these off when you are sure. Nothing here is marked — it is just for you to see what is solid and what still needs another go.',
        checklist: [
          'Say what $i$ is, and that $i^2 = -1$',
          'Pick out the real part and the imaginary part of something like $5-7i$',
          'Add and subtract complex numbers, changing both signs when subtracting',
          'Multiply two complex numbers by expanding and replacing $i^2$ with $-1$',
          'Work out a power of $i$ using the remainder when you divide by $4$',
          'Write $\\sqrt{-r}$ as $i\\sqrt{r}$, and simplify the root',
          'Divide by multiplying top and bottom by the conjugate of the bottom',
          'Solve a quadratic whose discriminant is negative, giving a conjugate pair'
        ] }
    ],

    examples: [
      { title: 'Real and imaginary parts',
        problem: 'Find the real and imaginary parts of (a) $5 - 7i$, (b) $4i$, (c) $-3$.',
        steps: [
          { text: 'Compare each with $a + bi$. For (a) that is $a=5$ and $b=-7$ — the sign belongs to the imaginary part.' },
          { text: 'For (b), write $4i$ as $0 + 4i$, so the real part is $0$.' },
          { text: 'For (c), write $-3$ as $-3 + 0i$, so the imaginary part is $0$. Every real number is a complex number with no $i$ part.' }
        ],
        answer: '(a) real $5$, imaginary $-7$; (b) real $0$, imaginary $4$; (c) real $-3$, imaginary $0$',
        checklist: ['Line the number up against $a+bi$.', 'The imaginary part is $b$, not $bi$.', 'Take the sign with it.', 'Fill in a $0$ for whichever part is missing.'] },

      { title: 'A power and a radical',
        problem: 'Evaluate (a) $i^{27}$ and (b) $\\sqrt{-50}$.',
        steps: [
          { text: '**(a)** Divide the power by $4$ and keep the remainder.', math: '27 = 4 \\times 6 + 3, \\qquad\\text{so}\\qquad i^{27} = i^{3}' },
          { text: 'And $i^3 = i^2 \\cdot i = -i$.', math: 'i^{27} = -i' },
          { text: '**(b)** Take the minus out first as an $i$.', math: '\\sqrt{-50} = i\\sqrt{50}' },
          { text: 'Then simplify the root as usual: $50 = 25 \\times 2$.', math: '= 5i\\sqrt2' }
        ],
        answer: '(a) $-i$  (b) $5i\\sqrt2$',
        checklist: ['For a power, divide by $4$ and use the remainder.', 'Remainder $0,1,2,3$ gives $1, i, -1, -i$.', 'For a root, pull the $i$ out first.', 'Then simplify the root the ordinary way.'] },

      { title: 'The conjugate product is always real',
        problem: 'Show that $(3+2i)(3-2i)$ is a real number, and say what it is.',
        steps: [
          { text: 'This is a difference of squares with $A=3$ and $B=2i$.', math: '(3+2i)(3-2i) = 3^2 - (2i)^2' },
          { text: 'Square the second part carefully: $(2i)^2 = 4i^2$.', math: '= 9 - 4i^2' },
          { text: 'Replace $i^2$ with $-1$. Subtracting $-4$ adds $4$.', math: '= 9 + 4 = 13' },
          { text: 'No $i$ survives, so the answer is real. In general $(a+bi)(a-bi) = a^2+b^2$.' }
        ],
        answer: '$13$ — a real number',
        checklist: ['Spot the difference-of-squares shape.', 'Square both parts, including the $i$.', '$-b^2i^2$ becomes $+b^2$.', 'Check no $i$ is left.'] }
    ],

    exercises: [
      { id: '1.6-e1', prompt: 'Find the real part of $8 - 3i$.',
        answer: { type: 'number', value: 8 },
        hints: ['Line it up against $a + bi$.', 'The real part is the bit with no $i$ attached.'],
        solution: [{ text: 'Comparing with $a+bi$ gives $a = 8$.' }] },

      { id: '1.6-e2', prompt: 'Find the imaginary part of $8 - 3i$.',
        answer: { type: 'number', value: -3 },
        hints: ['The imaginary part is $b$, not $bi$ — so no $i$ in your answer.', 'Take the sign with it: the number is $8 + (-3)i$.'],
        solution: [{ text: 'Comparing with $a+bi$ gives $b = -3$. The minus sign belongs to it.' }] },

      { id: '1.6-e3', prompt: 'Evaluate $(3 - 5i) + (2 + 8i)$. Give your answer in the form $a+bi$.',
        answer: { type: 'expression', value: '5+3*i', vars: ['i'], complex: true, display: '5 + 3i' },
        hints: ['Add the real parts, then add the imaginary parts. They never mix.', '$3+2$ for the real part, and $-5+8$ for the imaginary part.'],
        solution: [{ text: 'Add each part separately.', math: '(3+2) + (-5+8)i = 5 + 3i' }] },

      { id: '1.6-e4', prompt: 'Evaluate $(6 + 2i) - (9 - 4i)$. Give your answer in the form $a+bi$.',
        answer: { type: 'expression', value: '-3+6*i', vars: ['i'], complex: true, display: '-3 + 6i' },
        hints: ['Subtracting changes the sign of **both** terms in the second bracket.', 'So the $-4i$ becomes $+4i$. That is the step people miss.'],
        solution: [{ text: 'Change both signs in the second bracket.', math: '6 + 2i - 9 + 4i' },
          { text: 'Collect each part.', math: '= -3 + 6i' }] },

      { id: '1.6-e5', prompt: 'Evaluate $(2 + 3i)(4 + 5i)$. Give your answer in the form $a+bi$.',
        answer: { type: 'expression', value: '-7+22*i', vars: ['i'], complex: true, display: '-7 + 22i' },
        hints: ['Expand as you would any two brackets — every term by every term.', 'You will get $15i^2$. Replace $i^2$ with $-1$, so that term becomes $-15$.'],
        solution: [{ text: 'Expand.', math: '8 + 10i + 12i + 15i^2' },
          { text: 'Replace $i^2$ with $-1$.', math: '= 8 + 22i - 15' },
          { text: 'Collect.', math: '= -7 + 22i' }] },

      { id: '1.6-e6', prompt: 'Evaluate $(5 - 2i)(5 + 2i)$.',
        answer: { type: 'number', value: 29 },
        hints: ['These two are conjugates — the same number with the sign of the $i$ flipped.', 'Use the difference of squares: $5^2 - (2i)^2$. The answer will be real.'],
        solution: [{ text: 'Difference of squares.', math: '5^2 - (2i)^2 = 25 - 4i^2' },
          { text: 'Replace $i^2$ with $-1$, so $-4i^2$ becomes $+4$.', math: '= 25 + 4 = 29' }] },

      { id: '1.6-e7', prompt: 'Write $\\dfrac{2}{1+i}$ in the form $a+bi$.',
        answer: { type: 'expression', value: '1-1*i', vars: ['i'], complex: true, display: '1 - i' },
        hints: ['The bottom has an $i$ in it. What do you multiply top and bottom by to clear it?', 'The conjugate of $1+i$ is $1-i$. Multiply top and bottom by that.', 'The bottom becomes $1^2 + 1^2 = 2$.'],
        solution: [{ text: 'Multiply top and bottom by the conjugate.', math: '\\frac{2}{1+i}\\cdot\\frac{1-i}{1-i}' },
          { text: 'The bottom is $1^2+1^2 = 2$; the top is $2(1-i)$.', math: '= \\frac{2 - 2i}{2}' },
          { text: 'Divide both parts by $2$.', math: '= 1 - i' }] },

      { id: '1.6-e8', prompt: 'Write $\\dfrac{3+i}{2-i}$ in the form $a+bi$.',
        answer: { type: 'expression', value: '1+i', vars: ['i'], complex: true, display: '1 + i' },
        hints: ['Multiply top and bottom by the conjugate of the bottom, which is $2+i$.', 'Bottom: $2^2 + 1^2 = 5$. Top: expand $(3+i)(2+i)$.', 'The top comes to $6 + 3i + 2i + i^2 = 5 + 5i$.'],
        solution: [{ text: 'Multiply by the conjugate of the bottom.', math: '\\frac{3+i}{2-i}\\cdot\\frac{2+i}{2+i}' },
          { text: 'Bottom: $4+1 = 5$. Top: $6+3i+2i+i^2 = 5+5i$.', math: '= \\frac{5+5i}{5}' },
          { text: 'Divide both parts by $5$.', math: '= 1 + i' }] },

      { id: '1.6-e9', prompt: 'Evaluate $i^{45}$.',
        answer: { type: 'expression', value: 'i', vars: ['i'], complex: true, display: 'i' },
        hints: ['Powers of $i$ repeat every four. Divide by $4$ and keep the remainder.', '$45 = 4\\times 11 + 1$, so $i^{45} = i^1$.'],
        solution: [{ text: 'Divide the power by $4$.', math: '45 = 4(11) + 1' },
          { text: 'Remainder $1$, so it is the same as $i^1$.', math: 'i^{45} = i' }] },

      { id: '1.6-e10', prompt: 'Evaluate $i^{38}$.',
        answer: { type: 'number', value: -1 },
        hints: ['Divide $38$ by $4$ and keep the remainder.', '$38 = 4\\times 9 + 2$, and remainder $2$ means $i^2$.'],
        solution: [{ text: 'Divide by $4$.', math: '38 = 4(9) + 2' },
          { text: 'Remainder $2$, so it equals $i^2 = -1$.', math: 'i^{38} = -1' }] },

      { id: '1.6-e11', prompt: 'Simplify $\\sqrt{-72}$. Write it in the form $bi\\sqrt{c}$ with $c$ as small as possible.',
        answer: { type: 'expression', value: '6*i*sqrt(2)', vars: ['i'], complex: true, form: 'simplified-radical',display: '6i\\sqrt{2}' },
        hints: ['Deal with the minus sign first: $\\sqrt{-r} = i\\sqrt{r}$.', 'So this is $i\\sqrt{72}$. Now simplify $\\sqrt{72}$ the usual way.', '$72 = 36 \\times 2$, and $36$ is a perfect square.'],
        solution: [{ text: 'Take the $i$ out first.', math: '\\sqrt{-72} = i\\sqrt{72}' },
          { text: 'Pull out the biggest perfect square.', math: '= i\\sqrt{36 \\cdot 2} = 6i\\sqrt2' }] },

      { id: '1.6-e12', prompt: 'Evaluate $\\sqrt{-4}\\,\\sqrt{-25}$.',
        answer: { type: 'number', value: -10 },
        hints: ['Do **not** multiply under the root signs — that rule fails when the insides are negative.', 'Convert each one to $i$ form first: $\\sqrt{-4}=2i$ and $\\sqrt{-25}=5i$.', 'Then multiply: $(2i)(5i) = 10i^2$.'],
        solution: [{ text: 'Convert each root separately.', math: '\\sqrt{-4} = 2i, \\qquad \\sqrt{-25} = 5i' },
          { text: 'Multiply, then replace $i^2$.', math: '(2i)(5i) = 10i^2 = -10' },
          { text: 'Note that $\\sqrt{(-4)(-25)} = \\sqrt{100} = 10$ would have given the wrong sign.' }] },

      { id: '1.6-e13', prompt: 'Find all solutions of $x^2 + 9 = 0$. Give them in the form $a+bi$.',
        answer: { type: 'expression', value: '3*i', vars: ['i'], complex: true, display: '\\pm 3i' },
        working: { placeholder: 'x^2 = -9\nx = 3i' },
        hints: ['Rearrange to get $x^2$ on its own.', '$x^2 = -9$, so $x = \\pm\\sqrt{-9}$.', 'Enter the positive one, $3i$. (The other solution is $-3i$.)'],
        solution: [{ text: 'Rearrange.', math: 'x^2 = -9' },
          { text: 'Square-root both sides, taking both signs.', math: 'x = \\pm\\sqrt{-9} = \\pm 3i' }] },

      { id: '1.6-e14', prompt: 'Solve $x^2 - 4x + 13 = 0$. Enter the solution with the **positive** imaginary part.',
        answer: { type: 'expression', value: '2+3*i', vars: ['i'], complex: true, display: '2 + 3i' },
        hints: ['Work out $b^2-4ac$ first: $16 - 52$.', 'It is $-36$, which is negative — so the answers are complex, not non-existent.', '$x = \\dfrac{4 \\pm \\sqrt{-36}}{2} = \\dfrac{4 \\pm 6i}{2}$. Now divide both parts by $2$.'],
        solution: [{ text: 'Discriminant first.', math: 'b^2-4ac = 16 - 52 = -36' },
          { text: 'Into the formula, converting the root.', math: 'x = \\frac{4 \\pm 6i}{2}' },
          { text: 'Divide both parts by $2$.', math: 'x = 2 \\pm 3i' }] },

      { id: '1.6-e15', prompt: 'Solve $2x^2 - 2x + 5 = 0$. Enter the solution with the **positive** imaginary part.',
        answer: { type: 'expression', value: '1/2 + (3/2)*i', vars: ['i'], complex: true, display: '\\tfrac12 + \\tfrac32 i' },
        hints: ['Here $a=2$, so remember to divide by $2a = 4$ at the end.', '$b^2-4ac = 4 - 40 = -36$, so $\\sqrt{-36} = 6i$.', '$x = \\dfrac{2 \\pm 6i}{4}$ — now cancel each part by $2$.'],
        solution: [{ text: 'Discriminant.', math: 'b^2-4ac = 4 - 40 = -36' },
          { text: 'Into the formula with $2a = 4$.', math: 'x = \\frac{2 \\pm 6i}{4}' },
          { text: 'Divide both parts by $2$.', math: 'x = \\frac{1}{2} \\pm \\frac{3}{2}i' }] },

      { id: '1.6-e16', prompt: 'If $z = 4 - 3i$, find $z\\overline{z}$ (that is, $z$ times its own conjugate).',
        answer: { type: 'number', value: 25 },
        hints: ['The conjugate flips the sign of the $i$ part, so $\\overline{z} = 4+3i$.', 'Multiplying a number by its conjugate always gives $a^2+b^2$.', 'So it is $4^2 + 3^2$.'],
        solution: [{ text: 'The conjugate is $4+3i$.' },
          { text: 'Use $(a+bi)(a-bi) = a^2+b^2$.', math: '4^2 + (-3)^2 = 16 + 9 = 25' }] }
    ],

    generators: [
      { id: '1.6-g-parts', title: 'Real and imaginary parts', desc: 'Read $a$ and $b$ off a complex number.',
        make(r) {
          const a = r.nz(-9, 9), b = r.nz(-9, 9);
          const which = r.pick(['real', 'imag']);
          return {
            prompt: 'Find the **' + (which === 'real' ? 'real' : 'imaginary') + ' part** of $' + cxTex(a, b) + '$.',
            answer: { type: 'number', value: which === 'real' ? a : b },
            hints: ['Line the number up against $a + bi$.',
              which === 'real' ? 'The real part is the term with no $i$.' : 'The imaginary part is $b$ on its own — do not include the $i$, and keep the sign.'],
            solution: [{ text: 'Comparing with $a+bi$ gives $a = ' + a + '$ and $b = ' + b + '$.' },
              { text: 'So the ' + (which === 'real' ? 'real' : 'imaginary') + ' part is $' + (which === 'real' ? a : b) + '$.' }]
          };
        } },

      { id: '1.6-g-addsub', title: 'Sums and differences', desc: 'Add or subtract, keeping the parts apart.',
        make(r) {
          const a = r.nz(-9, 9), b = r.nz(-9, 9), c = r.nz(-9, 9), d = r.nz(-9, 9);
          const sub = r.bool(0.5);
          const ra = sub ? a - c : a + c, rb = sub ? b - d : b + d;
          return {
            prompt: 'Evaluate $(' + cxTex(a, b) + ') ' + (sub ? '-' : '+') + ' (' + cxTex(c, d) + ')$. Give your answer in the form $a+bi$.',
            answer: { type: 'expression', value: cxStr(ra, rb), vars: ['i'], complex: true, display: cxTex(ra, rb) },
            hints: [sub ? 'Subtracting changes the sign of **both** terms in the second bracket.' : 'Add the real parts, then add the imaginary parts.',
              'Real: $' + a + (sub ? ' - ' : ' + ') + '(' + c + ')$. Imaginary: $' + b + (sub ? ' - ' : ' + ') + '(' + d + ')$.'],
            solution: [{ text: sub ? 'Change both signs in the second bracket, then collect each part.' : 'Collect the real parts and the imaginary parts separately.',
              math: '(' + a + (sub ? ' - ' : ' + ') + M.paren(c) + ') + (' + b + (sub ? ' - ' : ' + ') + M.paren(d) + ')i' },
              { text: 'Tidy up.', math: cxTex(ra, rb) }]
          };
        } },

      { id: '1.6-g-product', title: 'Products', desc: 'Expand, then replace $i^2$ with $-1$.',
        make(r) {
          const a = r.nz(-7, 7), b = r.nz(-7, 7), c = r.nz(-7, 7), d = r.nz(-7, 7);
          const ra = a * c - b * d, rb = a * d + b * c;
          return {
            prompt: 'Evaluate $(' + cxTex(a, b) + ')(' + cxTex(c, d) + ')$. Give your answer in the form $a+bi$.',
            answer: { type: 'expression', value: cxStr(ra, rb), vars: ['i'], complex: true, display: cxTex(ra, rb) },
            hints: ['Expand it like any two brackets — every term by every term.',
              'The last term gives $' + (b * d) + 'i^2$. Replace $i^2$ with $-1$, so it becomes $' + (-b * d) + '$.'],
            solution: [{ text: 'Expand.', math: '(' + a + ')(' + c + ') + (' + a + ')(' + d + ')i + (' + b + ')(' + c + ')i + (' + b + ')(' + d + ')i^2' },
              { text: 'Work out each product.', math: '= ' + (a * c) + M.term(a * d, 'i', false) + M.term(b * c, 'i', false) + M.term(b * d, 'i^2', false) },
              { text: 'Replace $i^2$ with $-1$, so $' + M.term(b * d, 'i^2') + '$ becomes $' + (-b * d) + '$.', math: '= ' + (a * c) + M.term(a * d + b * c, 'i', false) + ' ' + M.signed(-b * d) },
              { text: 'Collect.', math: cxTex(ra, rb) }]
          };
        } },

      { id: '1.6-g-quotient', title: 'Quotients', desc: 'Divide using the conjugate of the bottom.',
        make(r) {
          // keep the answer tidy: pick a bottom whose a^2+b^2 divides the top nicely
          const c = r.pick([1, 2, 3, 1, 2]), d = r.pick([1, 2, 3, 1, 2]) * r.sign();
          const den = c * c + d * d;
          const ra = r.nz(-4, 4), rb = r.nz(-4, 4);           // the intended answer
          const a = ra * c - rb * d, b = ra * d + rb * c;      // so top = answer x bottom
          return {
            prompt: 'Write $\\dfrac{' + cxTex(a, b) + '}{' + cxTex(c, d) + '}$ in the form $a+bi$.',
            answer: { type: 'expression', value: cxStr(ra, rb), vars: ['i'], complex: true, display: cxTex(ra, rb) },
            hints: ['The bottom has an $i$ in it. Multiply top and bottom by the conjugate of the **bottom**.',
              'The conjugate of $' + cxTex(c, d) + '$ is $' + cxTex(c, -d) + '$.',
              'The bottom becomes $' + c + '^2 + (' + d + ')^2 = ' + den + '$.'],
            solution: [{ text: 'Multiply top and bottom by the conjugate of the bottom.', math: '\\frac{' + cxTex(a, b) + '}{' + cxTex(c, d) + '}\\cdot\\frac{' + cxTex(c, -d) + '}{' + cxTex(c, -d) + '}' },
              { text: 'The bottom becomes a real number.', math: '(' + cxTex(c, d) + ')(' + cxTex(c, -d) + ') = ' + den },
              { text: 'Expand the top the same way as any product, replacing $i^2$ with $-1$.', math: '(' + cxTex(a, b) + ')(' + cxTex(c, -d) + ') = ' + cxTex(a * c + b * d, b * c - a * d) },
              { text: 'Divide both parts by ' + den + '.', math: '\\frac{' + cxTex(a * c + b * d, b * c - a * d) + '}{' + den + '} = ' + cxTex(ra, rb) }]
          };
        } },

      { id: '1.6-g-power', title: 'Powers of $i$', desc: 'Use the remainder when the power is divided by 4.',
        make(r) {
          const n = r.int(5, 60);
          const k = n % 4;
          const vals = ['1', 'i', '-1', '-i'];
          const isReal = (k === 0 || k === 2);
          return {
            prompt: 'Evaluate $i^{' + n + '}$.',
            answer: isReal
              ? { type: 'number', value: k === 0 ? 1 : -1 }
              : { type: 'expression', value: k === 1 ? 'i' : '-1*i', vars: ['i'], complex: true, display: vals[k] },
            hints: ['Powers of $i$ repeat every four, so divide the power by $4$ and keep only the remainder.',
              '$' + n + ' = 4 \\times ' + Math.floor(n / 4) + ' + ' + k + '$, so $i^{' + n + '} = i^{' + k + '}$.',
              'Remainder $0,1,2,3$ gives $1,\\ i,\\ -1,\\ -i$.'],
            solution: [{ text: 'Divide the power by $4$.', math: '' + n + ' = 4(' + Math.floor(n / 4) + ') + ' + k },
              { text: 'Every four powers of $i$ bring you back to $1$, so only the remainder matters.', math: 'i^{' + n + '} = ' + (k === 1 ? 'i' : 'i^{' + k + '} = ' + vals[k]) }]
          };
        } },

      { id: '1.6-g-radical', title: 'Square roots of negatives', desc: 'Pull the $i$ out, then simplify the root.',
        make(r) {
          const sq = r.pick([4, 9, 16, 25, 36, 49]), rest = r.pick([2, 3, 5, 6, 7, 10]);
          const n = sq * rest, root = Math.sqrt(sq);
          return {
            prompt: 'Simplify $\\sqrt{-' + n + '}$. Write it as a whole number times $i$ times a square root.',
            answer: { type: 'expression', value: root + '*i*sqrt(' + rest + ')', vars: ['i'], complex: true, form: 'simplified-radical', display: root + 'i\\sqrt{' + rest + '}' },
            hints: ['Deal with the minus sign first: $\\sqrt{-r} = i\\sqrt{r}$.',
              'So this is $i\\sqrt{' + n + '}$. Now simplify that root the ordinary way.',
              '$' + n + ' = ' + sq + ' \\times ' + rest + '$, and $' + sq + '$ is a perfect square.'],
            solution: [{ text: 'Take the $i$ out first.', math: '\\sqrt{-' + n + '} = i\\sqrt{' + n + '}' },
              { text: 'Pull out the biggest perfect square.', math: '= i\\sqrt{' + sq + ' \\cdot ' + rest + '} = ' + root + 'i\\sqrt{' + rest + '}' }]
          };
        } },

      { id: '1.6-g-quadratic', title: 'Quadratics with complex solutions', desc: 'Negative discriminant, conjugate pair.',
        make(r) {
          const p = r.nz(-5, 5), q = r.int(1, 6);          // roots p +- qi
          const b = -2 * p, c = p * p + q * q;              // x^2 + bx + c
          const bt = b === 0 ? '' : (b > 0 ? ' + ' + b + 'x' : ' - ' + Math.abs(b) + 'x');
          return {
            prompt: 'Solve $x^2' + bt + ' + ' + c + ' = 0$. Enter the solution with the **positive** imaginary part.',
            answer: { type: 'expression', value: cxStr(p, q), vars: ['i'], complex: true, display: cxTex(p, q) },
            hints: ['Work out $b^2-4ac$ first — you should get a negative number.',
              '$b^2-4ac = ' + (b * b - 4 * c) + '$, so $\\sqrt{b^2-4ac} = ' + (2 * q) + 'i$.',
              'Then $x = \\dfrac{' + (-b) + ' \\pm ' + (2 * q) + 'i}{2}$. Divide **both** parts by $2$.'],
            solution: [{ text: 'Discriminant first.', math: 'b^2-4ac = ' + (b * b) + ' - ' + (4 * c) + ' = ' + (b * b - 4 * c) },
              { text: 'Negative, so the answers are complex. Convert the root.', math: 'x = \\frac{' + (-b) + ' \\pm ' + (2 * q) + 'i}{2}' },
              { text: 'Divide both parts by $2$ — the answers are a conjugate pair.', math: 'x = ' + cxTex(p, q) + ' \\text{ or } x = ' + cxTex(p, -q) }]
          };
        } }
    ]
  });
})();
