/* 3.4 Real Zeros of Polynomials
   Worksheet scope: the Rational Zeros Theorem, finding all the zeros, and writing
   the polynomial in factored form. */
(function () {
  const M = CH.M, V = CH.V;
  const setTex = arr => arr.length ? '\\{' + arr.join(',\\ ') + '\\}' : '\\varnothing';

  CH.registerSection({
    id: '3.4', chapter: 3, exam: 2, title: 'Real Zeros of Polynomials',
    summary: 'Finding every $x$ that makes a polynomial zero. The Rational Zeros Theorem narrows an infinite search down to a short list you can actually test.',

    theory: [
      { short: true, md: 'A **zero** is an input that makes the polynomial equal $0$ — the same thing as a solution, or an $x$-intercept.\n\n- The **Rational Zeros Theorem** gives you a short list of candidates: $\\dfrac{\\text{factors of the constant}}{\\text{factors of the leading coefficient}}$.\n- Test them one at a time until one gives zero.\n- Then **divide it out** (synthetic division is quickest) and the problem gets a degree smaller.\n- Keep going until what is left is a quadratic you can factor or solve.' },

      { h: 'What a zero is, and why you want one' },
      { def: 'Zero of a polynomial', md: 'A number $c$ is a **zero** of $P$ if $P(c) = 0$.\n\nThree names for the same thing, which is worth knowing because questions use all three:\n\n- $c$ is a **zero** of $P$\n- $c$ is a **solution** (or root) of $P(x) = 0$\n- the graph of $P$ crosses the $x$-axis at $c$' },
      'By the Factor Theorem from 3.3, every zero $c$ hands you a factor $(x-c)$ — so finding zeros and factoring are the same job.',

      { h: 'The Rational Zeros Theorem' },
      { key: 'A short list to test', md: 'If $P$ has whole-number coefficients, then **every rational zero** looks like\n\n$$\\frac{p}{q}, \\qquad p = \\text{a factor of the constant term}, \\qquad q = \\text{a factor of the leading coefficient}$$\n\nThat turns "try every number in the universe" into "try these dozen or so", which is the whole point.' },
      { tip: 'When the leading coefficient is 1', md: 'If the polynomial starts with a plain $x^3$ (or $x^4$, and so on), then $q = 1$ and the list is simply **the factors of the constant term, plus and minus**.\n\nFor $x^3 + 2x^2 - 13x + 10$ the constant is $10$, so the candidates are $\\pm1, \\pm2, \\pm5, \\pm10$. Start with $\\pm1$ — they are the quickest to test and very often work.' },
      { example: {
        title: 'Finding the candidate list', label: 'Worked example',
        problem: 'List the possible rational zeros of $P(x) = 2x^3 + x^2 - 13x + 6$.',
        steps: [
          { text: 'The constant term is $6$, so $p$ is a factor of $6$.', math: 'p = \\pm1,\\ \\pm2,\\ \\pm3,\\ \\pm6' },
          { text: 'The leading coefficient is $2$, so $q$ is a factor of $2$.', math: 'q = \\pm1,\\ \\pm2' },
          { text: 'Form every $\\tfrac{p}{q}$ and drop the repeats.', math: '\\pm1,\\ \\pm2,\\ \\pm3,\\ \\pm6,\\ \\pm\\tfrac12,\\ \\pm\\tfrac32' },
          { text: 'Twelve candidates instead of infinitely many. Now test them.' }
        ],
        answer: '$\\pm1, \\pm2, \\pm3, \\pm6, \\pm\\tfrac12, \\pm\\tfrac32$',
        checklist: ['List the factors of the constant term — that is $p$.', 'List the factors of the leading coefficient — that is $q$.', 'Form every $p/q$, both signs.', 'Cross out repeats.']
      } },

      { h: 'The method, end to end' },
      { key: 'Find one, divide it out, repeat', md: '1. Write the candidate list.\n2. Test candidates until $P(c) = 0$. (Synthetic division does the test and the division in one go.)\n3. **Divide out** $(x-c)$ — the quotient is one degree lower.\n4. Repeat on the quotient, until you are down to a **quadratic**.\n5. Factor or use the formula on that quadratic.' },
      { tip: 'Stop hunting once you reach a quadratic', md: 'There is no need to keep testing candidates all the way down. The moment the quotient is a quadratic, switch to factoring or the quadratic formula — both are faster and will not miss an irrational zero.' },
      { widget: 'zero-hunter', hint: 'Try it: click the candidates to test them' },
      { example: {
        title: 'All the way through', label: 'Worked example',
        problem: 'Find all the zeros of $P(x) = x^3 + 2x^2 - 13x + 10$ and write it in factored form.',
        steps: [
          { text: 'Leading coefficient is $1$, constant is $10$, so the candidates are the factors of $10$.', math: '\\pm1,\\ \\pm2,\\ \\pm5,\\ \\pm10' },
          { text: 'Try $x = 1$ first.', math: 'P(1) = 1 + 2 - 13 + 10 = 0 \\quad\\checkmark' },
          { text: 'So $(x-1)$ is a factor. Divide it out synthetically with $c=1$: the coefficients $1, 2, -13, 10$ become $1, 3, -10$ with remainder $0$.', math: 'P(x) = (x-1)(x^2 + 3x - 10)' },
          { text: 'The quotient is a quadratic, so stop hunting and factor it: two numbers multiplying to $-10$ and adding to $3$.', math: 'x^2+3x-10 = (x+5)(x-2)' },
          { text: 'Put it together and read off the zeros.', math: 'P(x) = (x-1)(x-2)(x+5)' }
        ],
        answer: 'Zeros $1$, $2$, $-5$; factored form $(x-1)(x-2)(x+5)$',
        checklist: ['Write the candidate list.', 'Test until one gives zero — try $\\pm1$ first.', 'Divide out that factor.', 'Once you reach a quadratic, factor it instead of testing more.']
      } },

      { h: 'Repeated zeros, and ones you can spot' },
      { note: 'A zero can appear twice', md: 'If after dividing you get something like $(x+2)^2$, the zero $-2$ is a **repeated** zero. It still only counts as one value of $x$, but the factor appears twice.\n\nFor $x^3 + 3x^2 - 4$: testing gives $P(1)=0$, and dividing leaves $x^2+4x+4 = (x+2)^2$. So $P(x) = (x-1)(x+2)^2$.' },
      { tip: 'Look for grouping first', md: 'Before reaching for the candidate list, check whether the polynomial groups. $x^3 - 3x^2 - 4x + 12$ splits into pairs:\n\n$$x^2(x-3) - 4(x-3) = (x-3)(x^2-4) = (x-3)(x-2)(x+2)$$\n\nThat is the whole question answered without testing a single candidate. The same goes for a **disguised quadratic** like $x^4 - 5x^2 + 4$, which factors as $(x^2-1)(x^2-4)$.' },

      { calm: true, md: 'This section asks you to **search**, which feels different from everything before it — there is no formula that just hands you the answer. That is normal and it is meant to feel like hunting.\n\nTwo things make it much less painful. First, always try $x = 1$ and $x = -1$ before anything else; textbook questions are built so that one of them usually works. Second, stop as soon as you are down to a quadratic — you already know three ways to finish those off.\n\nAnd if a candidate does not work, you have not made a mistake. Crossing one off is progress.' },

      { sid: '3.4', title: 'Can I do this?',
        intro: 'Tick these off when you are sure. Nothing here is marked — it is just for you to see what is solid and what still needs another go.',
        checklist: [
          'Say what a zero is, and that it means the same as a solution or an $x$-intercept',
          'Write the candidate list using factors of the constant over factors of the leading coefficient',
          'Test a candidate by substituting, or with synthetic division',
          'Divide out a factor once you find a zero',
          'Stop hunting once the quotient is a quadratic, and finish it off',
          'Write the polynomial in fully factored form',
          'Spot a repeated zero',
          'Notice when grouping or a disguised quadratic skips the search entirely'
        ] }
    ],

    examples: [
      { title: 'A disguised quadratic',
        problem: 'Find all the zeros of $P(x) = x^4 - 5x^2 + 4$ and factor it completely.',
        steps: [
          { text: 'Before hunting candidates, notice the powers: $4$ and $2$, one double the other. That is a quadratic in disguise.' },
          { text: 'Think of it as $u^2 - 5u + 4$ with $u = x^2$ — an ordinary quadratic, factored the usual way: two numbers multiplying to $4$ and adding to $-5$.', math: '(x^2 - 1)(x^2 - 4)' },
          { text: 'Each bracket is a difference of squares, so keep going.', math: '= (x-1)(x+1)(x-2)(x+2)' },
          { text: 'Read the zeros off the brackets.', math: 'x = 1,\\ -1,\\ 2,\\ -2' }
        ],
        answer: 'Zeros $\\pm1$ and $\\pm2$; $P(x) = (x-1)(x+1)(x-2)(x+2)$',
        checklist: ['Check whether the powers are double one another.', 'Substitute $u$ for the smaller power.', 'Factor the quadratic in $u$.', 'Swap back and keep factoring.'] },

      { title: 'A leading coefficient other than 1',
        problem: 'Find all the rational zeros of $P(x) = 2x^3 + x^2 - 13x + 6$ and factor it.',
        steps: [
          { text: 'Candidates: factors of $6$ over factors of $2$.', math: '\\pm1,\\ \\pm2,\\ \\pm3,\\ \\pm6,\\ \\pm\\tfrac12,\\ \\pm\\tfrac32' },
          { text: 'Try the whole numbers first. $x=2$ works.', math: 'P(2) = 16 + 4 - 26 + 6 = 0 \\quad\\checkmark' },
          { text: 'Divide out $(x-2)$ synthetically: $2, 1, -13, 6$ with $c=2$ gives $2, 5, -3$.', math: 'P(x) = (x-2)(2x^2+5x-3)' },
          { text: 'Factor the quadratic. $a \\times c = -6$; the numbers $6$ and $-1$ work.', math: '2x^2+5x-3 = (2x-1)(x+3)' },
          { text: 'So the zeros include a fraction, which is why $q$ mattered.', math: 'x = 2,\\ \\tfrac12,\\ -3' }
        ],
        answer: 'Zeros $2$, $\\tfrac12$, $-3$; $P(x) = (x-2)(2x-1)(x+3)$',
        checklist: ['Include fractions in the list when the leading coefficient is not 1.', 'Test whole numbers first — they are quicker.', 'Divide out the factor you find.', 'Finish the quadratic by factoring.'] }
    ],

    exercises: [
      { id: '3.4-e1', prompt: 'List the possible rational zeros of $P(x) = x^3 + 2x^2 - 13x + 10$. Enter them as a set, e.g. {1, -1, 2}.',
        answer: { type: 'set', value: [1, -1, 2, -2, 5, -5, 10, -10], vars: ['x'] },
        hints: ['The leading coefficient is $1$, so the list is just the factors of the constant, with both signs.', 'The constant is $10$, whose factors are $1, 2, 5, 10$.'],
        solution: [{ text: 'Factors of $10$, both signs, over factors of $1$.', math: '\\pm1,\\ \\pm2,\\ \\pm5,\\ \\pm10' }] },

      { id: '3.4-e2', prompt: 'Find all the zeros of $P(x) = x^3 + 2x^2 - 13x + 10$. Enter them as a set.',
        answer: { type: 'set', value: [1, 2, -5], vars: ['x'] },
        hints: ['Try $x=1$ first — it is the quickest candidate to test.', '$P(1) = 0$, so divide out $(x-1)$; the quotient is $x^2+3x-10$.', 'Factor that quadratic: two numbers multiplying to $-10$ and adding to $3$.'],
        solution: [{ text: 'Test $x=1$.', math: 'P(1) = 1+2-13+10 = 0' },
          { text: 'Divide out $(x-1)$ — synthetic division turns $1, 2, -13, 10$ into $1, 3, -10$ — then factor the quadratic.', math: 'P(x) = (x-1)(x^2+3x-10) = (x-1)(x+5)(x-2)' },
          { text: 'Read off the zeros.', math: 'x = 1,\\ 2,\\ -5' }] },

      { id: '3.4-e3', prompt: 'Write $P(x) = x^3 + 2x^2 - 13x + 10$ in fully factored form.',
        answer: { type: 'expression', value: '(x-1)*(x-2)*(x+5)', vars: ['x'], form: 'factored' },
        hints: ['Each zero $c$ gives a factor $(x-c)$.', 'The zeros are $1$, $2$ and $-5$, so the last bracket is $(x+5)$.'],
        solution: [{ text: 'One bracket per zero.', math: '(x-1)(x-2)(x+5)' }] },

      { id: '3.4-e4', prompt: 'Find all the zeros of $P(x) = x^3 + 3x^2 - 4$. Enter them as a set.',
        answer: { type: 'set', value: [1, -2], vars: ['x'] },
        hints: ['Candidates are the factors of $4$: $\\pm1, \\pm2, \\pm4$. Try $1$ first.', '$P(1) = 1+3-4 = 0$. Divide out $(x-1)$ to get $x^2+4x+4$.', '$x^2+4x+4$ is a perfect square, $(x+2)^2$ — so $-2$ is a repeated zero, but it is still just one value.'],
        solution: [{ text: 'Test $x=1$.', math: 'P(1) = 0' },
          { text: 'Divide out $(x-1)$: $1, 3, 0, -4$ becomes $1, 4, 4$ (note the $0$ for the missing $x$ term). Then factor the perfect square.', math: 'P(x) = (x-1)(x^2+4x+4) = (x-1)(x+2)^2' },
          { text: 'The distinct zeros are:', math: 'x = 1,\\ -2' }] },

      { id: '3.4-e5', prompt: 'Write $P(x) = x^3 + 3x^2 - 4$ in fully factored form.',
        answer: { type: 'expression', value: '(x-1)*(x+2)^2', vars: ['x'], form: 'factored' },
        hints: ['After dividing out $(x-1)$ the quotient is $x^2+4x+4$.', 'That is a perfect square, so the factor $(x+2)$ appears twice.'],
        solution: [{ text: 'The repeated factor appears squared.', math: 'P(x) = (x-1)(x+2)^2' }] },

      { id: '3.4-e6', prompt: 'Find all the zeros of $P(x) = x^3 + 11x^2 + 8x - 20$. Enter them as a set.',
        answer: { type: 'set', value: [1, -2, -10], vars: ['x'] },
        hints: ['Try $x = 1$: $1 + 11 + 8 - 20$.', 'That is $0$, so divide out $(x-1)$; the quotient is $x^2+12x+20$.', 'Factor it: two numbers multiplying to $20$ and adding to $12$.'],
        solution: [{ text: 'Test $x=1$.', math: 'P(1) = 1+11+8-20 = 0' },
          { text: 'Divide out $(x-1)$: $1, 11, 8, -20$ becomes $1, 12, 20$. Then factor the quadratic.', math: 'P(x) = (x-1)(x^2+12x+20) = (x-1)(x+2)(x+10)' },
          { text: 'Zeros:', math: 'x = 1,\\ -2,\\ -10' }] },

      { id: '3.4-e7', prompt: 'Find all the zeros of $P(x) = x^4 - 5x^2 + 4$. Enter them as a set.',
        answer: { type: 'set', value: [1, -1, 2, -2], vars: ['x'] },
        hints: ['The powers are $4$ and $2$ — one is double the other, so this is a quadratic in disguise.', 'Treat it as $u^2-5u+4$ with $u = x^2$: that factors as $(x^2-1)(x^2-4)$.', 'Each bracket is a difference of squares.'],
        solution: [{ text: 'Factor as a quadratic in $x^2$.', math: '(x^2-1)(x^2-4)' },
          { text: 'Each is a difference of squares.', math: '= (x-1)(x+1)(x-2)(x+2)' },
          { text: 'Zeros:', math: 'x = \\pm1,\\ \\pm2' }] },

      { id: '3.4-e8', prompt: 'Find all the zeros of $P(x) = x^3 - 3x^2 - 4x + 12$. Enter them as a set.',
        answer: { type: 'set', value: [3, 2, -2], vars: ['x'] },
        hints: ['Four terms — try grouping before testing any candidates.', '$x^2(x-3) - 4(x-3) = (x-3)(x^2-4)$.', 'The second bracket is a difference of squares.'],
        solution: [{ text: 'Group into pairs.', math: 'x^2(x-3) - 4(x-3) = (x-3)(x^2-4)' },
          { text: 'Factor the difference of squares.', math: '= (x-3)(x-2)(x+2)' },
          { text: 'Zeros:', math: 'x = 3,\\ 2,\\ -2' }] },

      { id: '3.4-e9', prompt: 'List the possible rational zeros of $P(x) = 2x^3 + x^2 - 13x + 6$. Enter them as a set.',
        answer: { type: 'set', value: [1, -1, 2, -2, 3, -3, 6, -6, 0.5, -0.5, 1.5, -1.5], vars: ['x'] },
        hints: ['Factors of the constant $6$ on top: $1, 2, 3, 6$.', 'Factors of the leading coefficient $2$ underneath: $1, 2$.', 'So as well as the whole numbers you get halves: $\\pm\\tfrac12$ and $\\pm\\tfrac32$.'],
        solution: [{ text: 'Form every $p/q$ with both signs.', math: '\\pm1,\\ \\pm2,\\ \\pm3,\\ \\pm6,\\ \\pm\\tfrac12,\\ \\pm\\tfrac32' }] },

      { id: '3.4-e10', prompt: 'Find all the zeros of $P(x) = 2x^3 + x^2 - 13x + 6$. Enter them as a set.',
        answer: { type: 'set', value: [2, 0.5, -3], vars: ['x'] },
        hints: ['Test the whole-number candidates first. Try $x=2$.', '$P(2) = 16+4-26+6 = 0$. Divide out $(x-2)$ to get $2x^2+5x-3$.', 'Factor that: $(2x-1)(x+3)$, which gives a fractional zero.'],
        solution: [{ text: 'Test $x = 2$.', math: 'P(2) = 0' },
          { text: 'Divide out $(x-2)$: $2, 1, -13, 6$ becomes $2, 5, -3$. Then factor that quadratic.', math: 'P(x) = (x-2)(2x^2+5x-3) = (x-2)(2x-1)(x+3)' },
          { text: 'Zeros:', math: 'x = 2,\\ \\tfrac12,\\ -3' }] },

      { id: '3.4-e11', prompt: 'Find all the rational zeros of $P(x) = 4x^3 + 4x^2 - x - 1$. Enter them as a set.',
        answer: { type: 'set', value: [-1, 0.5, -0.5], vars: ['x'] },
        hints: ['Four terms — try grouping first.', '$4x^2(x+1) - 1(x+1) = (x+1)(4x^2-1)$.', '$4x^2-1$ is a difference of squares: $(2x-1)(2x+1)$.'],
        solution: [{ text: 'Group into pairs.', math: '4x^2(x+1) - (x+1) = (x+1)(4x^2-1)' },
          { text: 'Difference of squares.', math: '= (x+1)(2x-1)(2x+1)' },
          { text: 'Zeros:', math: 'x = -1,\\ \\tfrac12,\\ -\\tfrac12' }] },

      { id: '3.4-e12', prompt: 'If $P(x) = (x-4)(x+1)^2$, how many **distinct** zeros does $P$ have?',
        answer: { type: 'number', value: 2 },
        hints: ['A repeated factor still only gives one value of $x$.', 'The zeros are $4$ and $-1$ — the $-1$ just appears twice.'],
        solution: [{ text: 'The factors give $x = 4$ and $x = -1$.' },
          { text: 'The squared factor repeats the zero $-1$, but it is still one distinct value.', math: '2' }] }
    ],

    generators: [
      { id: '3.4-g-candidates', title: 'The candidate list', desc: 'Factors of the constant over factors of the leading coefficient.',
        make(r) {
          const konst = r.pick([6, 10, 12, 15, 4, 9]);
          const facs = [];
          for (let k = 1; k <= konst; k++) if (konst % k === 0) { facs.push(k); facs.push(-k); }
          facs.sort((a, b) => a - b);
          const b2 = r.nz(-6, 6), b1 = r.nz(-9, 9);
          return {
            prompt: 'List every possible rational zero of $P(x) = ' + M.polyTex([1, b2, b1, konst]) + '$, as a set.',
            answer: { type: 'set', value: facs, vars: ['x'] },
            hints: ['The leading coefficient is $1$, so the bottoms are all $1$ — the list is just the factors of the constant. The middle coefficients do not matter.',
              'The constant is $' + konst + '$. Write down every number that divides it.',
              'Remember both signs for each.'],
            solution: [{ text: 'Factors of the constant, both signs.', math: setTex(facs.map(String)) }]
          };
        } },

      { id: '3.4-g-zeros-monic', title: 'Find the zeros', desc: 'Test, divide out, finish the quadratic.',
        make(r) {
          // one zero is always small (1, -1, 2 or -2), as in the textbook, so the
          // "try 1 and -1 first" advice really works
          const z = [r.pick([1, -1, 2, -2]), r.nz(-5, 5), r.nz(-5, 5)];
          if (z[0] === z[1] || z[1] === z[2] || z[0] === z[2]) return this.make(r);
          const c1 = M.polyMul([1, -z[0]], [1, -z[1]]);
          const co = M.polyMul(c1, [1, -z[2]]);
          const sorted = z.slice().sort((a, b) => a - b);
          const P = t => ((co[0] * t + co[1]) * t + co[2]) * t + co[3];
          // test candidates in the order she would: 1, -1, 2, -2
          const tried = [];
          let t = null;
          for (const cand of [1, -1, 2, -2]) { const v = P(cand); tried.push([cand, v]); if (v === 0) { t = cand; break; } }
          const q = [1, co[1] + t, co[2] + t * (co[1] + t)];          // synthetic division by x - t
          const rest = z.filter(v => v !== t);                        // the quadratic's zeros
          const br = v => '(' + M.shift('x', v) + ')';
          return {
            prompt: 'Find all the zeros of $P(x) = ' + M.polyTex(co) + '$. Enter them as a set.',
            answer: { type: 'set', value: sorted, vars: ['x'] },
            hints: ['The leading coefficient is $1$, so the candidates are the factors of $' + co[3] + '$, both signs.',
              'Test $x = 1$, then $x = -1$, then $\\pm 2$ — the small ones are quickest.',
              'Once one gives $0$, divide it out (synthetic division) and factor the quadratic that is left.'],
            solution: [].concat(
              tried.map(([c, v]) => ({ text: v === 0 ? 'Try $x = ' + c + '$. It gives zero, so $' + br(c) + '$ is a factor.' : 'Try $x = ' + c + '$. Not zero, so cross it off.', math: 'P(' + c + ') = ' + v + (v === 0 ? ' \\quad\\checkmark' : '') })),
              [{ text: 'Divide out $' + br(t) + '$ with synthetic division, $c = ' + t + '$. The coefficients $' + co.join(',\\ ') + '$ become $' + q.join(',\\ ') + '$ with remainder $0$.', math: 'P(x) = ' + br(t) + '(' + M.polyTex(q) + ')' },
               { text: 'Now it is a quadratic, so stop hunting and factor it: two numbers that multiply to $' + q[2] + '$ and add to $' + q[1] + '$.', math: M.polyTex(q) + ' = ' + br(rest[0]) + br(rest[1]) },
               { text: 'Each bracket gives one zero.', math: 'P(x) = ' + br(t) + br(rest[0]) + br(rest[1]) + ' \\;\\Rightarrow\\; ' + setTex(sorted.map(String)) }])
          };
        } },

      { id: '3.4-g-factored', title: 'Write it factored', desc: 'From the polynomial to its brackets.',
        make(r) {
          const z = [r.nz(-5, 5), r.nz(-5, 5)];
          if (z[0] === z[1]) return this.make(r);
          const co = M.polyMul([1, -z[0]], [1, -z[1]]);
          const br = v => '(x' + (v < 0 ? '+' + (-v) : '-' + v) + ')';
          return {
            prompt: 'Write $P(x) = ' + M.polyTex(co) + '$ in fully factored form.',
            answer: { type: 'expression', value: '(x-(' + z[0] + '))*(x-(' + z[1] + '))', vars: ['x'], form: 'factored' },
            hints: ['This is a quadratic, so no candidate testing is needed — just factor it.',
              'Find two numbers multiplying to $' + co[2] + '$ and adding to $' + co[1] + '$.',
              'Each zero $c$ gives a bracket $(x-c)$.'],
            solution: [{ text: 'Two numbers multiplying to $' + co[2] + '$ and adding to $' + co[1] + '$.', math: '' + (-z[0]) + ' \\text{ and } ' + (-z[1]) },
              { text: 'So the brackets are:', math: br(z[0]) + br(z[1]) }]
          };
        } },

      { id: '3.4-g-grouping', title: 'Zeros by grouping', desc: 'Four terms — group before you hunt.',
        make(r) {
          const a = r.nz(-5, 5), b = r.int(1, 5);
          // x^3 - a x^2 - b^2 x + a b^2  =  (x - a)(x^2 - b^2)
          const co = [1, -a, -b * b, a * b * b];
          const zeros = [a, b, -b].sort((x, y) => x - y);
          if (a === b || a === -b) return this.make(r);
          return {
            prompt: 'Find all the zeros of $P(x) = ' + M.polyTex(co) + '$. Enter them as a set.',
            answer: { type: 'set', value: zeros, vars: ['x'] },
            hints: ['Four terms with nothing common to all four — try **grouping** before testing candidates.',
              'Pair the first two and the last two, then factor each pair so the same bracket appears twice.',
              'You should reach $(x ' + (a < 0 ? '+ ' + (-a) : '- ' + a) + ')(x^2 - ' + (b * b) + ')$, and the second bracket is a difference of squares.'],
            solution: [{ text: 'Group into pairs and factor each.', math: 'x^2(x ' + (a < 0 ? '+ ' + (-a) : '- ' + a) + ') - ' + (b * b) + '(x ' + (a < 0 ? '+ ' + (-a) : '- ' + a) + ')' },
              { text: 'Take out the common bracket, then split the difference of squares.',
                math: '(x ' + (a < 0 ? '+ ' + (-a) : '- ' + a) + ')(x - ' + b + ')(x + ' + b + ')' },
              { text: 'Zeros:', math: setTex(zeros.map(String)) }]
          };
        } }
    ]
  });
})();
