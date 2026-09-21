/* 1.4 Rational Expressions */
(function () {
  const M = CH.M, V = CH.V, C = CH.C;
  const lin = (a, b) => M.polyTex([a, b]);
  const linS = (a, b) => M.polyStr([a, b]);
  const paren = s => '(' + s + ')';
  const frac = (n, d) => '\\frac{' + n + '}{' + d + '}';

  CH.registerSection({
    id: '1.4', chapter: 1, title: 'Rational Expressions',
    summary: 'Fractions with variables in them: where they are defined, and how to simplify, multiply, divide, add and subtract them.',

    theory: [
      { h: 'What is a rational expression?' },
      'A **rational expression** is a fraction whose top and bottom are polynomials, such as $\\dfrac{x + 3}{x^2 - 9}$. Everything you know about ordinary fractions still works — the only new skill is **factoring** so you can see what cancels.',

      { h: 'Domain: where the expression makes sense' },
      { def: 'Domain', md: 'The **domain** of an expression is the set of values of the variable that you are allowed to plug in. Two things are forbidden:\n\n- **dividing by zero** — any value that makes a denominator $0$ is out;\n- **even roots of negatives** — anything under a square root must be $\\ge 0$.' },
      '| Expression | Domain | Why |\n|---|---|---|\n| $x^2 + 3x$ | all real numbers, $(-\\infty, \\infty)$ | nothing can go wrong |\n| $\\dfrac{1}{x - 5}$ | $x \\ne 5$, i.e. $(-\\infty, 5) \\cup (5, \\infty)$ | $x = 5$ makes the bottom $0$ |\n| $\\sqrt{x - 5}$ | $x \\ge 5$, i.e. $[5, \\infty)$ | need $x - 5 \\ge 0$ |\n| $\\dfrac{1}{\\sqrt{x - 5}}$ | $x > 5$, i.e. $(5, \\infty)$ | need $x - 5 \\ge 0$ **and** $\\ne 0$ |',
      { svg: V.graph({ xmin: -2, xmax: 8, ymin: -5, ymax: 5, width: 380, id: 'dom', fns: [{ f: x => 1 / (x - 5), label: 'y = 1/(x − 5)' }, { f: x => Math.sqrt(x - 5), color: 'var(--viz-2)', label: 'y = √(x − 5)', domain: [5, 8] }], segments: [{ x1: 5, y1: -5, x2: 5, y2: 5, dashed: true, color: 'var(--muted)' }] }), caption: '$\\tfrac{1}{x-5}$ (blue) exists on both sides of $5$ but blows up **at** $5$. $\\sqrt{x-5}$ (pink) simply does not exist to the left of $5$.' },
      { key: 'Finding a domain', md: '1. Set each **denominator** equal to $0$, solve, and throw those values out.\n2. Set each thing under a **square root** $\\ge 0$ and solve.\n3. Combine the conditions, and write the answer in interval notation.\n\nExample: $\\dfrac{1}{x^2 - 5x + 6}$. Factor: $x^2 - 5x + 6 = (x - 2)(x - 3)$, which is zero at $x = 2$ and $x = 3$. Domain: all reals except $2$ and $3$, written $(-\\infty, 2) \\cup (2, 3) \\cup (3, \\infty)$.' },

      { h: 'Simplifying: factor, then cancel' },
      'A fraction is simplified by cancelling a factor that appears in **both** the top and the bottom. With rational expressions you usually have to **factor first** to see the common factor.',
      '$$\\frac{x^2 - 1}{x^2 + x - 2} = \\frac{(x - 1)(x + 1)}{(x - 1)(x + 2)} = \\frac{x + 1}{x + 2}$$',
      { warn: 'Cancel factors, never terms', md: 'In $\\dfrac{x + 3}{x + 5}$ **nothing cancels** — the $x$\'s are added to things, not multiplied. You can only cancel a whole factor that multiplies the entire top and the entire bottom. Test it: at $x = 1$, $\\dfrac{1+3}{1+5} = \\dfrac{4}{6}$, which is not $\\dfrac{3}{5}$.' },

      { h: 'Multiplying and dividing' },
      { key: 'Multiply', md: 'Factor everything, multiply tops together and bottoms together, cancel common factors. (Cancel **before** multiplying out — it is far less work.)\n\n$$\\frac{x^2 + 2x - 3}{x^2 + 8x + 16} \\cdot \\frac{3x + 12}{x - 1} = \\frac{(x+3)(x-1)}{(x+4)(x+4)} \\cdot \\frac{3(x+4)}{x-1} = \\frac{3(x+3)}{x+4}$$' },
      { key: 'Divide', md: 'Flip the second fraction and multiply — exactly as with numbers.\n\n$$\\frac{x - 4}{x^2 - 4} \\div \\frac{x^2 - 3x - 4}{x^2 + 5x + 6} = \\frac{x - 4}{(x-2)(x+2)} \\cdot \\frac{(x+2)(x+3)}{(x-4)(x+1)} = \\frac{x + 3}{(x - 2)(x + 1)}$$' },

      { h: 'Adding and subtracting' },
      'Just like with numbers you need a **common denominator**. The **LCD** is built from every factor that appears in any denominator, each raised to the highest power it has anywhere.',
      { key: 'Adding rational expressions', md: '1. **Factor** each denominator.\n2. Build the **LCD**: every distinct factor, highest power.\n3. Multiply top and bottom of each fraction by whatever its denominator is missing.\n4. Add or subtract the **numerators** (keep the LCD). Careful with a minus: it applies to the whole numerator that follows.\n5. **Simplify**: factor the new numerator and cancel if possible.' },
      { example: {
        title: 'Subtracting with a factorable denominator',
        problem: 'Simplify $\\dfrac{1}{x - 3} - \\dfrac{6}{x^2 - 9}$.',
        steps: [
          { text: 'Factor the denominators. $x^2 - 9 = (x - 3)(x + 3)$.', math: '\\frac{1}{x - 3} - \\frac{6}{(x - 3)(x + 3)}' },
          { text: 'The LCD is $(x - 3)(x + 3)$. The first fraction is missing the factor $(x + 3)$, so multiply its top and bottom by that.', math: '\\frac{1 \\cdot (x + 3)}{(x - 3)(x + 3)} - \\frac{6}{(x - 3)(x + 3)}' },
          { text: 'Same denominator now — combine the numerators.', math: '\\frac{x + 3 - 6}{(x - 3)(x + 3)} = \\frac{x - 3}{(x - 3)(x + 3)}' },
          { text: 'Cancel the common factor $(x - 3)$.', math: '= \\frac{1}{x + 3}' }
        ], answer: '$\\dfrac{1}{x + 3}$' } },
      { warn: 'Do not cancel too early', md: 'You can only cancel once the whole thing is **one fraction**. In $\\dfrac{x + 3}{(x-3)(x+3)} - \\dfrac{6}{(x-3)(x+3)}$ it is tempting to cancel the $(x+3)$ in the first fraction, but that would change the sum. Combine first, then cancel.' },

      { h: 'Compound fractions' },
      'A **compound fraction** has fractions inside the numerator or denominator. Two good methods:',
      '- **Method 1:** combine the top into one fraction, combine the bottom into one fraction, then divide (flip and multiply).\n- **Method 2:** multiply the top and bottom of the big fraction by the LCD of all the little fractions. This clears every small denominator in one move.',
      { example: {
        title: 'Compound fraction, both methods',
        problem: 'Simplify $\\dfrac{\\;\\dfrac{1}{x} + 1\\;}{\\;1 - \\dfrac{1}{x^2}\\;}$.',
        steps: [
          { text: '**Method 2.** The little denominators are $x$ and $x^2$, so the LCD is $x^2$. Multiply the top and the bottom of the big fraction by $x^2$.', math: '\\frac{x^2\\left(\\frac{1}{x} + 1\\right)}{x^2\\left(1 - \\frac{1}{x^2}\\right)} = \\frac{x + x^2}{x^2 - 1}' },
          { text: 'Factor and cancel.', math: '= \\frac{x(1 + x)}{(x - 1)(x + 1)} = \\frac{x}{x - 1}' },
          { text: '**Method 1** for comparison: top $= \\frac{1 + x}{x}$, bottom $= \\frac{x^2 - 1}{x^2}$, then $\\frac{1+x}{x} \\cdot \\frac{x^2}{(x-1)(x+1)} = \\frac{x}{x-1}$. Same answer.' }
        ], answer: '$\\dfrac{x}{x - 1}$' } },
      'A shape that appears again in calculus: $\\dfrac{\\frac{1}{a + h} - \\frac{1}{a}}{h}$. Combine the top first: $\\dfrac{1}{a+h} - \\dfrac{1}{a} = \\dfrac{a - (a + h)}{a(a+h)} = \\dfrac{-h}{a(a+h)}$. Then divide by $h$: the $h$ cancels, leaving $\\dfrac{-1}{a(a + h)}$.',

      { h: 'Rationalising with variables' },
      'The conjugate trick from §1.2 works with variables too. It is often used on the **numerator** in calculus:',
      '$$\\frac{\\sqrt{a + h} - \\sqrt{a}}{h} \\cdot \\frac{\\sqrt{a + h} + \\sqrt{a}}{\\sqrt{a + h} + \\sqrt{a}} = \\frac{(a + h) - a}{h\\left(\\sqrt{a + h} + \\sqrt{a}\\right)} = \\frac{1}{\\sqrt{a + h} + \\sqrt{a}}$$'
    ],

    examples: [
      { title: 'Finding domains',
        problem: 'Find the domain of (a) $\\dfrac{1}{x^2 - 5x + 6}$ and (b) $\\dfrac{\\sqrt{x}}{x - 2}$.',
        steps: [
          { text: '(a) Only a denominator to worry about. Factor it and find where it is zero.', math: 'x^2 - 5x + 6 = (x - 2)(x - 3) = 0 \\;\\Rightarrow\\; x = 2 \\text{ or } x = 3' },
          { text: 'Everything except those two values.', math: '\\text{Domain: } (-\\infty, 2) \\cup (2, 3) \\cup (3, \\infty)' },
          { text: '(b) The root needs $x \\ge 0$; the denominator needs $x \\ne 2$. Both at once:', math: '\\text{Domain: } [0, 2) \\cup (2, \\infty)' }
        ], answer: '(a) $(-\\infty,2)\\cup(2,3)\\cup(3,\\infty)$ &nbsp; (b) $[0,2)\\cup(2,\\infty)$' },
      { title: 'Simplifying',
        problem: 'Simplify $\\dfrac{x^2 - 1}{x^2 + x - 2}$.',
        steps: [
          { text: 'Factor the top (difference of squares) and the bottom (trinomial).', math: '\\frac{(x - 1)(x + 1)}{(x - 1)(x + 2)}' },
          { text: 'Cancel the common factor.', math: '= \\frac{x + 1}{x + 2}' }
        ], answer: '$\\dfrac{x + 1}{x + 2}$' },
      { title: 'Dividing',
        problem: 'Simplify $\\dfrac{x - 4}{x^2 - 4} \\div \\dfrac{x^2 - 3x - 4}{x^2 + 5x + 6}$.',
        steps: [
          { text: 'Flip the second fraction and multiply.', math: '\\frac{x - 4}{x^2 - 4} \\cdot \\frac{x^2 + 5x + 6}{x^2 - 3x - 4}' },
          { text: 'Factor everything.', math: '\\frac{x - 4}{(x - 2)(x + 2)} \\cdot \\frac{(x + 2)(x + 3)}{(x - 4)(x + 1)}' },
          { text: 'Cancel $(x - 4)$ and $(x + 2)$.', math: '= \\frac{x + 3}{(x - 2)(x + 1)}' }
        ], answer: '$\\dfrac{x + 3}{(x - 2)(x + 1)}$' },
      { title: 'Adding with a repeated factor',
        problem: 'Simplify $\\dfrac{5}{2x - 3} + \\dfrac{3}{(2x - 3)^2}$.',
        steps: [
          { text: 'The LCD is $(2x - 3)^2$ (the highest power of the only factor). The first fraction is missing one $(2x - 3)$.', math: '\\frac{5(2x - 3)}{(2x - 3)^2} + \\frac{3}{(2x - 3)^2}' },
          { text: 'Combine the numerators.', math: '= \\frac{10x - 15 + 3}{(2x - 3)^2} = \\frac{10x - 12}{(2x - 3)^2}' },
          { text: 'Factor the top to check for cancelling: $2(5x - 6)$ — nothing cancels.' }
        ], answer: '$\\dfrac{10x - 12}{(2x - 3)^2}$' },
      { title: 'The calculus-style compound fraction',
        problem: 'Simplify $\\dfrac{\\;\\dfrac{1}{a + h} - \\dfrac{1}{a}\\;}{h}$.',
        steps: [
          { text: 'Combine the top into one fraction (LCD is $a(a + h)$).', math: '\\frac{1}{a + h} - \\frac{1}{a} = \\frac{a - (a + h)}{a(a + h)} = \\frac{-h}{a(a + h)}' },
          { text: 'Now divide by $h$: that is multiplying by $\\frac{1}{h}$.', math: '\\frac{-h}{a(a + h)} \\cdot \\frac{1}{h} = \\frac{-1}{a(a + h)}' }
        ], answer: '$-\\dfrac{1}{a(a + h)}$' },
      { title: 'Rationalising a numerator',
        problem: 'Rationalise the numerator of $\\dfrac{\\sqrt{x + 2} - \\sqrt{x}}{2}$.',
        steps: [
          { text: 'Multiply top and bottom by the conjugate $\\sqrt{x + 2} + \\sqrt{x}$.', math: '\\frac{(\\sqrt{x + 2} - \\sqrt{x})(\\sqrt{x + 2} + \\sqrt{x})}{2(\\sqrt{x + 2} + \\sqrt{x})}' },
          { text: 'The top is a difference of squares: $(x + 2) - x = 2$.', math: '= \\frac{2}{2(\\sqrt{x + 2} + \\sqrt{x})} = \\frac{1}{\\sqrt{x + 2} + \\sqrt{x}}' }
        ], answer: '$\\dfrac{1}{\\sqrt{x + 2} + \\sqrt{x}}$' }
    ],

    exercises: [
      { id: '1.4-e1', prompt: 'Find the domain of $\\dfrac{2x}{x - 5}$. Use interval notation.',
        answer: { type: 'interval', value: '(-inf, 5) U (5, inf)' },
        hints: ['Which value makes the denominator zero?'],
        solution: ['The denominator is zero at $x = 5$, so the domain is every real number except $5$: $(-\\infty, 5) \\cup (5, \\infty)$.'] },
      { id: '1.4-e2', prompt: 'Find the domain of $\\sqrt{x - 5}$.',
        answer: { type: 'interval', value: '[5, inf)' },
        hints: ['What is under the root must be $\\ge 0$.'],
        solution: ['Need $x - 5 \\ge 0$, so $x \\ge 5$: the domain is $[5, \\infty)$.'] },
      { id: '1.4-e3', prompt: 'Find the domain of $\\dfrac{1}{x^2 - 5x + 6}$.',
        answer: { type: 'interval', value: '(-inf, 2) U (2, 3) U (3, inf)' },
        hints: ['Factor the denominator.', '$(x - 2)(x - 3) = 0$ at $x = 2$ and $x = 3$.'],
        solution: ['$x^2 - 5x + 6 = (x-2)(x-3)$ is zero at $2$ and $3$. Domain: $(-\\infty, 2) \\cup (2, 3) \\cup (3, \\infty)$.'] },
      { id: '1.4-e4', prompt: 'Find the domain of $\\dfrac{\\sqrt{x}}{x - 2}$.',
        answer: { type: 'interval', value: '[0, 2) U (2, inf)' },
        hints: ['Two conditions: $x \\ge 0$ for the root and $x \\ne 2$ for the denominator.'],
        solution: ['$x \\ge 0$ and $x \\ne 2$ together give $[0, 2) \\cup (2, \\infty)$.'] },
      { id: '1.4-e5', prompt: 'Simplify $\\dfrac{x^2 - 1}{x^2 + x - 2}$.',
        answer: { type: 'expression', value: '(x+1)/(x+2)', form: 'single-fraction' },
        hints: ['Factor top and bottom. $x^2 - 1 = (x-1)(x+1)$.', '$x^2 + x - 2 = (x - 1)(x + 2)$.'],
        solution: [{ math: '\\frac{(x - 1)(x + 1)}{(x - 1)(x + 2)} = \\frac{x + 1}{x + 2}', text: 'Factor and cancel $(x - 1)$.' }] },
      { id: '1.4-e6', prompt: 'Simplify $\\dfrac{x^2 + 2x - 3}{x^2 + 8x + 16} \\cdot \\dfrac{3x + 12}{x - 1}$.',
        answer: { type: 'expression', value: '3(x+3)/(x+4)', form: 'single-fraction' },
        hints: ['Factor all four pieces before multiplying.', '$x^2 + 2x - 3 = (x+3)(x-1)$, $x^2 + 8x + 16 = (x+4)^2$, $3x + 12 = 3(x+4)$.'],
        solution: [{ math: '\\frac{(x+3)(x-1)}{(x+4)^2} \\cdot \\frac{3(x+4)}{x-1} = \\frac{3(x+3)}{x+4}', text: 'Factor, then cancel $(x-1)$ and one $(x+4)$.' }] },
      { id: '1.4-e7', prompt: 'Simplify $\\dfrac{x - 4}{x^2 - 4} \\div \\dfrac{x^2 - 3x - 4}{x^2 + 5x + 6}$.',
        answer: { type: 'expression', value: '(x+3)/((x-2)(x+1))', form: 'single-fraction' },
        hints: ['Flip the second fraction, then factor everything.'],
        solution: [{ math: '\\frac{x - 4}{(x-2)(x+2)} \\cdot \\frac{(x+2)(x+3)}{(x-4)(x+1)} = \\frac{x+3}{(x-2)(x+1)}', text: 'Flip, factor, cancel.' }] },
      { id: '1.4-e8', prompt: 'Simplify $\\dfrac{1}{x - 3} - \\dfrac{6}{x^2 - 9}$.',
        answer: { type: 'expression', value: '1/(x+3)', form: 'single-fraction' },
        hints: ['$x^2 - 9 = (x-3)(x+3)$, so the LCD is $(x-3)(x+3)$.', 'Multiply the first fraction top and bottom by $(x+3)$, combine, then factor the numerator.'],
        solution: [{ math: '\\frac{x + 3}{(x-3)(x+3)} - \\frac{6}{(x-3)(x+3)} = \\frac{x - 3}{(x-3)(x+3)} = \\frac{1}{x+3}', text: 'Common denominator, combine, cancel.' }] },
      { id: '1.4-e9', prompt: 'Simplify $\\dfrac{5}{2x - 3} + \\dfrac{3}{(2x - 3)^2}$.',
        answer: { type: 'expression', value: '(10x-12)/(2x-3)^2', form: 'single-fraction' },
        hints: ['The LCD is $(2x-3)^2$. The first fraction needs one more factor of $(2x - 3)$.'],
        solution: [{ math: '\\frac{5(2x-3) + 3}{(2x-3)^2} = \\frac{10x - 12}{(2x-3)^2}', text: 'Rewrite over the LCD and combine.' }] },
      { id: '1.4-e10', prompt: 'Simplify $\\dfrac{\\;\\dfrac{1}{x} + 1\\;}{\\;1 - \\dfrac{1}{x^2}\\;}$.',
        answer: { type: 'expression', value: 'x/(x-1)', form: 'single-fraction' },
        hints: ['Multiply the top and bottom of the big fraction by $x^2$.', 'You get $\\dfrac{x + x^2}{x^2 - 1}$ — now factor and cancel.'],
        solution: [{ math: '\\frac{x^2(\\frac{1}{x} + 1)}{x^2(1 - \\frac{1}{x^2})} = \\frac{x + x^2}{x^2 - 1} = \\frac{x(1 + x)}{(x-1)(x+1)} = \\frac{x}{x - 1}', text: 'Clear the small denominators, factor, cancel.' }] },
      { id: '1.4-e11', prompt: 'Simplify $\\dfrac{\\;\\dfrac{1}{a + h} - \\dfrac{1}{a}\\;}{h}$.',
        answer: { type: 'expression', value: '-1/(a(a+h))', form: 'single-fraction', vars: ['a', 'h'] },
        hints: ['Combine the top over the common denominator $a(a + h)$.', 'The numerator becomes $a - (a + h) = -h$; then the $h$ cancels with the division by $h$.'],
        solution: [{ math: '\\frac{1}{a+h} - \\frac{1}{a} = \\frac{a - (a+h)}{a(a+h)} = \\frac{-h}{a(a+h)}', text: 'Combine the top.' }, { math: '\\frac{-h}{a(a+h)} \\cdot \\frac{1}{h} = \\frac{-1}{a(a+h)}', text: 'Divide by $h$.' }] },
      { id: '1.4-e12', prompt: 'Rationalise the **numerator** of $\\dfrac{\\sqrt{x + 2} - \\sqrt{x}}{2}$.',
        answer: { type: 'expression', value: '1/(sqrt(x+2) + sqrt(x))' },
        hints: ['Multiply top and bottom by $\\sqrt{x+2} + \\sqrt{x}$.', 'The top becomes $(x + 2) - x = 2$.'],
        solution: [{ math: '\\frac{(x+2) - x}{2(\\sqrt{x+2} + \\sqrt{x})} = \\frac{1}{\\sqrt{x+2} + \\sqrt{x}}', text: 'Conjugate on top and bottom; the top collapses to $2$.' }] }
    ],

    generators: [
      { id: '1.4-g-domain', title: 'Find the domain', desc: 'Denominators ≠ 0, roots ≥ 0.',
        make(r) {
          const kind = r.pick(['den', 'den2', 'root', 'rootden', 'invroot']);
          const a = r.int(-6, 6);
          const fx = (v) => M.polyTex([1, -v]);
          if (kind === 'den') return { prompt: 'Find the domain of $\\dfrac{' + r.pick(['x', '3', 'x+1', '2x']) + '}{' + fx(a) + '}$.', answer: { type: 'interval', value: '(-inf, ' + a + ') U (' + a + ', inf)' }, hints: ['Where is the denominator zero?'], solution: ['The denominator is zero at $x = ' + a + '$, so the domain is $(-\\infty, ' + a + ') \\cup (' + a + ', \\infty)$.'] };
          if (kind === 'den2') {
            let b = r.int(-6, 6); if (b === a) b = a + 2;
            const [lo, hi] = a < b ? [a, b] : [b, a];
            const den = M.polyTex(M.polyMul([1, -a], [1, -b]));
            return { prompt: 'Find the domain of $\\dfrac{' + r.pick(['1', 'x', 'x-1']) + '}{' + den + '}$.', answer: { type: 'interval', value: '(-inf, ' + lo + ') U (' + lo + ', ' + hi + ') U (' + hi + ', inf)' },
              hints: ['Factor the denominator and set it equal to zero.', '$' + den + ' = ' + paren(fx(a)) + paren(fx(b)) + '$.'], solution: ['$' + den + ' = ' + paren(fx(lo)) + paren(fx(hi)) + '$ is zero at $x = ' + lo + '$ and $x = ' + hi + '$. Remove both: $(-\\infty, ' + lo + ') \\cup (' + lo + ', ' + hi + ') \\cup (' + hi + ', \\infty)$.'] };
          }
          if (kind === 'root') return { prompt: 'Find the domain of $\\sqrt{' + fx(a) + '}$.', answer: { type: 'interval', value: '[' + a + ', inf)' }, hints: ['What is under the root must be $\\ge 0$.'], solution: ['Need $' + fx(a) + ' \\ge 0$, i.e. $x \\ge ' + a + '$: domain $[' + a + ', \\infty)$.'] };
          if (kind === 'invroot') return { prompt: 'Find the domain of $\\dfrac{1}{\\sqrt{' + fx(a) + '}}$.', answer: { type: 'interval', value: '(' + a + ', inf)' }, hints: ['Under the root must be $\\ge 0$, **and** the denominator cannot be $0$ — so strictly greater.'], solution: ['Need $' + fx(a) + ' > 0$ (not just $\\ge$, because it is in a denominator): domain $(' + a + ', \\infty)$.'] };
          let b = r.int(a - 3, a + 5); if (b === a) b = a + 1;
          const val = b > a ? '[' + a + ', ' + b + ') U (' + b + ', inf)' : '[' + a + ', inf)';
          return { prompt: 'Find the domain of $\\dfrac{\\sqrt{' + fx(a) + '}}{' + fx(b) + '}$.', answer: { type: 'interval', value: val },
            hints: ['Two conditions: $x \\ge ' + a + '$ from the root, $x \\ne ' + b + '$ from the denominator.'], solution: ['$x \\ge ' + a + '$ and $x \\ne ' + b + '$' + (b > a ? ': $[' + a + ', ' + b + ') \\cup (' + b + ', \\infty)$.' : '. Since $' + b + ' < ' + a + '$ it is already excluded: $[' + a + ', \\infty)$.')] };
        } },
      { id: '1.4-g-simplify', title: 'Simplify a rational expression', desc: 'Factor top and bottom, cancel the common factor.',
        make(r) {
          const p = r.nz(-5, 5), q = r.nz(-5, 5), s = r.nz(-5, 5);
          if (q === s || p === q || p === s) return this.make(r);
          const k = r.pick([1, 1, 1, 2, 3]);
          const top = M.polyMul([k, k * p], [1, q]), bot = M.polyMul([1, p], [1, s]);
          const ans = (k === 1 ? '' : k) + paren(linS(1, q)) + '/' + paren(linS(1, s));
          return { prompt: 'Simplify $\\dfrac{' + M.polyTex(top) + '}{' + M.polyTex(bot) + '}$.', answer: { type: 'expression', value: ans, form: 'single-fraction', display: frac((k === 1 ? '' : k) + paren(lin(1, q)), lin(1, s)) },
            hints: ['Factor the top and the bottom separately.', 'Both contain the factor $(' + lin(1, p) + ')$.'],
            solution: [{ math: frac((k === 1 ? '' : k) + paren(lin(1, p)) + paren(lin(1, q)), paren(lin(1, p)) + paren(lin(1, s))) + ' = ' + frac((k === 1 ? '' : k) + paren(lin(1, q)), lin(1, s)), text: 'Factor and cancel $(' + lin(1, p) + ')$.' }] };
        } },
      { id: '1.4-g-muldiv', title: 'Multiply or divide', desc: 'Factor first, cancel, then multiply.',
        make(r) {
          const p = r.nz(-5, 5), q = r.nz(-5, 5), s = r.nz(-5, 5), t = r.nz(-5, 5);
          if (new Set([p, q, s, t]).size < 4) return this.make(r);
          const divide = r.bool();
          // (x+p)(x+q)/(x+s) * (x+s)(x+t)/((x+p)(x+t)... keep it clean:
          // A = (x+p)/(x+q)(x+s) , B = (x+q)/(x+p)(x+t)  -> product = 1/((x+s)(x+t))? too trivial. Use:
          // A = (x^2 + (p+q)x + pq)/(x+s), B = (x+s)(x+t)/(x+p)  -> A*B = (x+q)(x+t)
          const A_top = M.polyMul([1, p], [1, q]), B_top = M.polyMul([1, s], [1, t]);
          const prodValue = paren(linS(1, q)) + paren(linS(1, t)), prodTex = paren(lin(1, q)) + paren(lin(1, t));
          if (!divide) return { prompt: 'Simplify $\\dfrac{' + M.polyTex(A_top) + '}{' + lin(1, s) + '} \\cdot \\dfrac{' + M.polyTex(B_top) + '}{' + lin(1, p) + '}$.', answer: { type: 'expression', value: prodValue, display: prodTex },
            hints: ['Factor both numerators.', '$' + M.polyTex(A_top) + ' = ' + paren(lin(1, p)) + paren(lin(1, q)) + '$ and $' + M.polyTex(B_top) + ' = ' + paren(lin(1, s)) + paren(lin(1, t)) + '$.'],
            solution: [{ math: frac(paren(lin(1, p)) + paren(lin(1, q)), lin(1, s)) + ' \\cdot ' + frac(paren(lin(1, s)) + paren(lin(1, t)), lin(1, p)) + ' = ' + prodTex, text: 'Factor, cancel $(' + lin(1, p) + ')$ and $(' + lin(1, s) + ')$.' }] };
          // division: A ÷ (x+p)/((x+s)(x+t))  = A * (x+s)(x+t)/(x+p)
          return { prompt: 'Simplify $\\dfrac{' + M.polyTex(A_top) + '}{' + lin(1, s) + '} \\div \\dfrac{' + lin(1, p) + '}{' + M.polyTex(B_top) + '}$.', answer: { type: 'expression', value: prodValue, display: prodTex },
            hints: ['Flip the second fraction and multiply.', 'Then factor: $' + M.polyTex(A_top) + ' = ' + paren(lin(1, p)) + paren(lin(1, q)) + '$ and $' + M.polyTex(B_top) + ' = ' + paren(lin(1, s)) + paren(lin(1, t)) + '$.'],
            solution: [{ math: frac(paren(lin(1, p)) + paren(lin(1, q)), lin(1, s)) + ' \\cdot ' + frac(paren(lin(1, s)) + paren(lin(1, t)), lin(1, p)) + ' = ' + prodTex, text: 'Flip, factor, cancel.' }] };
        } },
      { id: '1.4-g-addsub', title: 'Add or subtract', desc: 'Build the LCD, combine numerators, simplify.',
        make(r) {
          const kind = r.pick(['two', 'two', 'dos']);
          const a = r.int(1, 6), b = r.int(1, 6), p = r.nz(-5, 5);
          const op = r.pick(['+', '-']);
          if (kind === 'two') {
            let q = r.nz(-5, 5); if (q === p) q = -p;
            // a/(x+p) ± b/(x+q) = (a(x+q) ± b(x+p)) / ((x+p)(x+q))
            const num = op === '+' ? M.polyAdd([a, a * q], [b, b * p]) : M.polyAdd([a, a * q], [-b, -b * p]);
            const numTex = M.polyTex(num), numS = M.polyStr(num);
            return { prompt: 'Simplify $\\dfrac{' + a + '}{' + lin(1, p) + '} ' + op + ' \\dfrac{' + b + '}{' + lin(1, q) + '}$.', answer: { type: 'expression', value: paren(numS) + '/' + paren(paren(linS(1, p)) + paren(linS(1, q))), form: 'single-fraction', display: frac(numTex, paren(lin(1, p)) + paren(lin(1, q))) },
              hints: ['The LCD is $(' + lin(1, p) + ')(' + lin(1, q) + ')$.', 'Multiply the first fraction by $(' + lin(1, q) + ')$ top and bottom, the second by $(' + lin(1, p) + ')$.'],
              solution: [{ math: frac(a + paren(lin(1, q)) + ' ' + op + ' ' + b + paren(lin(1, p)), paren(lin(1, p)) + paren(lin(1, q))), text: 'Rewrite over the LCD.' }, { math: '= ' + frac(numTex, paren(lin(1, p)) + paren(lin(1, q))), text: 'Expand and combine the numerator' + (op === '-' ? ' — the minus applies to all of $' + b + '(' + lin(1, p) + ')$' : '') + '.' }] };
          }
          // a/(x-p) - b/(x^2-p^2) where result may cancel: choose b = a*p... general: (a(x+p) - b)/((x-p)(x+p))
          const P = Math.abs(p) || 2;
          const num = M.polyAdd([a, a * P], [0, op === '+' ? b : -b]);
          const g = M.gcd(num[0], num[1]);
          return { prompt: 'Simplify $\\dfrac{' + a + '}{' + lin(1, -P) + '} ' + op + ' \\dfrac{' + b + '}{x^2 - ' + (P * P) + '}$.', answer: { type: 'expression', value: paren(M.polyStr(num)) + '/' + paren(paren(linS(1, -P)) + paren(linS(1, P))), form: 'single-fraction', display: frac(M.polyTex(num), paren(lin(1, -P)) + paren(lin(1, P))) },
            hints: ['Factor: $x^2 - ' + (P * P) + ' = (' + lin(1, -P) + ')(' + lin(1, P) + ')$, so that is the LCD.', 'Only the first fraction needs adjusting: multiply top and bottom by $(' + lin(1, P) + ')$.'],
            solution: [{ math: frac(a + paren(lin(1, P)) + ' ' + op + ' ' + b, paren(lin(1, -P)) + paren(lin(1, P))), text: 'Rewrite over the LCD.' }, { math: '= ' + frac(M.polyTex(num), paren(lin(1, -P)) + paren(lin(1, P))), text: 'Combine the numerator.' + (g > 1 ? ' (A common factor of $' + g + '$ can be pulled out on top, but nothing cancels with the bottom.)' : '') }] };
        } },
      { id: '1.4-g-compound', title: 'Compound fractions', desc: 'Clear the little denominators with the LCD.',
        make(r) {
          const kind = r.pick(['xy', 'ah', 'x2']);
          if (kind === 'xy') {
            const s1 = r.pick(['+', '-']), s2 = s1 === '+' ? '-' : '+';
            const topS = 'y ' + s1 + ' x', botS = 'y ' + s2 + ' x';
            return { prompt: 'Simplify $\\dfrac{\\;\\dfrac{1}{x} ' + s1 + ' \\dfrac{1}{y}\\;}{\\;\\dfrac{1}{x} ' + s2 + ' \\dfrac{1}{y}\\;}$.', answer: { type: 'expression', value: '(' + topS + ')/(' + botS + ')', form: 'single-fraction', vars: ['x', 'y'], display: frac(topS, botS) },
              hints: ['Multiply top and bottom of the big fraction by the LCD $xy$.'], solution: [{ math: '\\frac{xy(\\frac{1}{x} ' + s1 + ' \\frac{1}{y})}{xy(\\frac{1}{x} ' + s2 + ' \\frac{1}{y})} = \\frac{' + topS + '}{' + botS + '}', text: 'Multiply through by $xy$: each $\\frac{1}{x}$ becomes $y$ and each $\\frac{1}{y}$ becomes $x$.' }] };
          }
          if (kind === 'ah') {
            const k = r.pick([1, 2, 3]);
            const kt = k === 1 ? '' : k;
            return { prompt: 'Simplify $\\dfrac{\\;\\dfrac{' + kt + (k === 1 ? '1' : '') + '}{a + h} - \\dfrac{' + kt + (k === 1 ? '1' : '') + '}{a}\\;}{h}$.', answer: { type: 'expression', value: '-' + k + '/(a(a+h))', form: 'single-fraction', vars: ['a', 'h'], display: '-' + frac(k, 'a(a + h)') },
              hints: ['Combine the top over $a(a + h)$ first.', 'The numerator becomes $' + k + 'a - ' + k + '(a + h) = -' + k + 'h$; then the $h$ cancels.'],
              solution: [{ math: '\\frac{' + k + 'a - ' + k + '(a + h)}{a(a + h)} = \\frac{-' + k + 'h}{a(a + h)}', text: 'Combine the top.' }, { math: '\\frac{-' + k + 'h}{a(a+h)} \\cdot \\frac{1}{h} = -\\frac{' + k + '}{a(a + h)}', text: 'Divide by $h$ — the $h$ cancels.' }] };
          }
          const c = r.int(1, 5);
          // (1 + c/x)/(1 - c^2/x^2) = x/(x - c)
          return { prompt: 'Simplify $\\dfrac{\\;1 + \\dfrac{' + c + '}{x}\\;}{\\;1 - \\dfrac{' + (c * c) + '}{x^2}\\;}$.', answer: { type: 'expression', value: 'x/(x-' + c + ')', form: 'single-fraction', display: frac('x', 'x - ' + c) },
            hints: ['Multiply top and bottom by $x^2$.', 'You get $\\dfrac{x^2 + ' + c + 'x}{x^2 - ' + (c * c) + '}$ — factor and cancel.'],
            solution: [{ math: '\\frac{x^2 + ' + c + 'x}{x^2 - ' + (c * c) + '} = \\frac{x(x + ' + c + ')}{(x - ' + c + ')(x + ' + c + ')} = \\frac{x}{x - ' + c + '}', text: 'Clear denominators with $x^2$, factor, cancel $(x + ' + c + ')$.' }] };
        } }
    ]
  });
})();
