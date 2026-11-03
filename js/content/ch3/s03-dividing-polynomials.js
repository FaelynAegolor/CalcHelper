/* 3.3 Dividing Polynomials
   Worksheet scope: long division and the division algorithm, synthetic division,
   the Factor Theorem, and building a polynomial from its zeros. */
(function () {
  const M = CH.M, V = CH.V;

  CH.registerSection({
    id: '3.3', chapter: 3, exam: 2, title: 'Dividing Polynomials',
    summary: 'Long division for polynomials, the quicker synthetic version, and the Factor Theorem — the shortcut that tells you whether $x-c$ divides in exactly, without dividing at all.',

    theory: [
      { short: true, md: 'Dividing polynomials works just like dividing numbers, leftover and all.\n\n- $\\dfrac{P}{D} = Q + \\dfrac{R}{D}$, exactly like $\\tfrac{38}{7} = 5 + \\tfrac37$.\n- **Long division**: divide the leading terms, multiply back, subtract, bring down. Repeat.\n- **Synthetic division** is a much faster version, but it only works when you are dividing by $x - c$.\n- **Factor Theorem**: $P(c) = 0$ exactly when $(x-c)$ is a factor. One substitution replaces a whole division.' },

      { h: 'The same idea as dividing numbers' },
      'When $7$ does not go into $38$ exactly you write $38 = 7 \\times 5 + 3$, or $\\tfrac{38}{7} = 5 + \\tfrac37$. Polynomials behave the same way.',
      { def: 'The division algorithm', md: '$$\\frac{P(x)}{D(x)} = Q(x) + \\frac{R(x)}{D(x)} \\qquad\\text{or}\\qquad P(x) = D(x)\\,Q(x) + R(x)$$\n\n- $P$ is the **dividend** (what you are dividing)\n- $D$ is the **divisor** (what you are dividing by)\n- $Q$ is the **quotient** (the answer)\n- $R$ is the **remainder**, and it is always a **lower degree** than $D$\n\nThat last point is the stopping rule: keep going until what is left is too small to divide.' },

      { h: 'Long division' },
      { key: 'Divide, multiply, subtract, bring down', md: '1. Divide the **leading term** of what is left by the leading term of $D$.\n2. Multiply that answer by the whole of $D$.\n3. **Subtract** it — every sign flips, which is where most slips happen.\n4. Bring down the next term and repeat.\n\nStop when what remains has a lower degree than $D$.' },
      { warn: 'Leave gaps for missing powers', md: 'If a power is missing, write it in with a zero coefficient. Dividing $2x^3 - 7x^2 + 5$ means treating it as\n\n$$2x^3 - 7x^2 + 0x + 5$$\n\nSkipping the $0x$ shunts every later column one place left and quietly ruins the whole calculation.' },
      { example: {
        title: 'Long division with a remainder', label: 'Worked example',
        problem: 'Divide $P(x) = 2x^2 - 5x - 7$ by $D(x) = x - 2$, and write the answer in the form $Q(x) + \\dfrac{R}{D(x)}$.',
        steps: [
          { text: 'Divide the leading terms: $2x^2 \\div x = 2x$. That is the first piece of the quotient.' },
          { text: 'Multiply back and subtract.', math: '2x(x-2) = 2x^2 - 4x; \\qquad (2x^2 - 5x) - (2x^2-4x) = -x' },
          { text: 'Bring down the $-7$, then divide again: $-x \\div x = -1$.' },
          { text: 'Multiply back and subtract once more.', math: '-1(x-2) = -x+2; \\qquad (-x-7) - (-x+2) = -9' },
          { text: '$-9$ has lower degree than $x-2$, so stop.', math: '\\frac{2x^2-5x-7}{x-2} = 2x - 1 + \\frac{-9}{x-2}' }
        ],
        answer: '$Q(x) = 2x-1$, $R = -9$',
        checklist: ['Divide the leading terms.', 'Multiply back and subtract — flip every sign.', 'Bring down the next term and repeat.', 'Stop when the remainder is of lower degree than the divisor.']
      } },

      { h: 'Synthetic division' },
      { key: 'Only for dividing by $x - c$', md: 'When the divisor is $x - c$, you can drop all the letters and work with the coefficients alone.\n\n1. Write the coefficients of $P$, **including zeros** for missing powers.\n2. Put $c$ at the left. Careful: for $x + 1$ the value of $c$ is $-1$.\n3. Bring the first coefficient straight down.\n4. Multiply it by $c$, add to the next coefficient, and repeat.\n5. The last number is the **remainder**; the rest are the coefficients of $Q$, one degree lower.' },
      { example: {
        title: 'Synthetic division', label: 'Worked example',
        problem: 'Use synthetic division to divide $2x^3 - 7x^2 + 5$ by $x - 3$.',
        steps: [
          { text: 'Coefficients, with a zero for the missing $x$ term.', math: '2,\\ -7,\\ 0,\\ 5 \\qquad\\text{and}\\qquad c = 3' },
          { text: 'Bring down the $2$. Multiply by $3$ and add to $-7$.', math: '2 \\times 3 = 6; \\quad -7 + 6 = -1' },
          { text: 'Multiply that by $3$ and add to $0$.', math: '-1 \\times 3 = -3; \\quad 0 + (-3) = -3' },
          { text: 'Multiply by $3$ and add to $5$.', math: '-3 \\times 3 = -9; \\quad 5 + (-9) = -4' },
          { text: 'The last number is the remainder; the rest are the quotient, one degree down.', math: 'Q(x) = 2x^2 - x - 3, \\qquad R = -4' }
        ],
        answer: '$Q(x) = 2x^2-x-3$ with remainder $-4$',
        checklist: ['Write every coefficient, zeros included.', 'For $x - c$ use $c$; for $x + c$ use $-c$.', 'Bring down, multiply, add, repeat.', 'Last number is the remainder; the rest drop one degree.']
      } },
      { warn: 'The sign of $c$ catches everyone', md: 'Synthetic division divides by $x - c$. So:\n\n- for $x - 3$, use $c = 3$\n- for $x + 1$, use $c = -1$, because $x+1 = x - (-1)$\n\nGet this wrong and every number afterwards is wrong.' },

      { h: 'The Remainder and Factor Theorems' },
      { def: 'Remainder Theorem', md: 'When you divide $P(x)$ by $x - c$, the remainder is exactly $P(c)$.\n\nSo you can find a remainder by **substituting a number**, with no division at all.' },
      { def: 'Factor Theorem', md: '$$c \\text{ is a zero of } P \\quad\\Longleftrightarrow\\quad (x-c) \\text{ is a factor of } P(x)$$\n\nIn other words: $P(c) = 0$ exactly when $x-c$ divides in with nothing left over. It is the Remainder Theorem with the remainder being zero.' },
      { example: {
        title: 'Using the Factor Theorem', label: 'Worked example',
        problem: 'Show that $x - 2$ is a factor of $P(x) = x^3 + 2x^2 - 3x - 10$, and state the remainder.',
        steps: [
          { text: 'The divisor is $x - 2$, so $c = 2$. Substitute rather than divide.', math: 'P(2) = 2^3 + 2(2)^2 - 3(2) - 10' },
          { text: 'Work it out carefully.', math: '= 8 + 8 - 6 - 10 = 0' },
          { text: 'The remainder is $P(2) = 0$.' },
          { text: 'A remainder of zero means it divides in exactly, so $x-2$ **is** a factor.' }
        ],
        answer: 'Remainder $0$, so $x-2$ is a factor',
        checklist: ['Read $c$ off the divisor $x-c$.', 'Substitute $c$ into $P$.', 'The value you get **is** the remainder.', 'Zero means it is a factor.']
      } },

      { h: 'Building a polynomial from its zeros' },
      { key: 'Each zero gives you a bracket', md: 'Running the Factor Theorem backwards: if you want zeros at $c_1, c_2, \\ldots$, write down one bracket for each.\n\n$$P(x) = a(x - c_1)(x - c_2)\\cdots$$\n\nThe $a$ out front is free — every choice gives the same zeros. A question pins it down by telling you a coefficient.' },
      { example: {
        title: 'From zeros to a polynomial', label: 'Worked example',
        problem: 'Find a polynomial of degree $3$ with zeros $-1$, $1$ and $3$, whose leading coefficient is $2$.',
        steps: [
          { text: 'One bracket per zero, watching the signs: a zero at $-1$ gives $(x+1)$.', math: 'P(x) = a(x+1)(x-1)(x-3)' },
          { text: 'Three brackets gives degree $3$, as required.' },
          { text: 'The leading coefficient is whatever multiplies $x^3$, which is just $a$.' },
          { text: 'So $a = 2$.', math: 'P(x) = 2(x+1)(x-1)(x-3)' }
        ],
        answer: '$P(x) = 2(x+1)(x-1)(x-3)$',
        checklist: ['One bracket per zero.', 'A zero at $-c$ gives the bracket $(x+c)$.', 'Count the brackets to check the degree.', 'Use the given coefficient to pin down $a$.']
      } },

      { calm: true, md: 'Long division looks like the most intimidating thing on the page, and it is genuinely fiddly — but it is fiddly in a way that rewards being slow and neat rather than clever. Line the columns up, write in the missing zeros, and flip every sign when you subtract.\n\nThe good news is that most questions do not need it. If you are dividing by something of the form $x - c$, synthetic division is far quicker. And if the question only asks whether something is a factor, the Factor Theorem turns the whole job into **one substitution**.\n\nSo before dividing anything, check: is there a shortcut here?' },

      { sid: '3.3', title: 'Can I do this?',
        intro: 'Tick these off when you are sure. Nothing here is marked — it is just for you to see what is solid and what still needs another go.',
        checklist: [
          'Write a division as $P = D \\cdot Q + R$, naming each part',
          'Do a long division, remembering to flip signs when subtracting',
          'Write in zeros for missing powers before dividing',
          'Know when to stop — when the remainder drops below the divisor\'s degree',
          'Do a synthetic division, getting the sign of $c$ right',
          'Use the Remainder Theorem to find a remainder by substituting',
          'Use the Factor Theorem to test whether $x-c$ is a factor',
          'Build a polynomial from its zeros and a given coefficient'
        ] }
    ],

    examples: [
      { title: 'Synthetic division with $x + 1$',
        problem: 'Use synthetic division to divide $4x^2 + 12x + 5$ by $x + 1$.',
        steps: [
          { text: 'The divisor is $x+1$, which is $x - (-1)$, so $c = -1$. This is the step to get right.' },
          { text: 'Coefficients are $4, 12, 5$. Bring the $4$ down.' },
          { text: 'Multiply by $-1$ and add.', math: '4 \\times (-1) = -4; \\quad 12 + (-4) = 8' },
          { text: 'Again.', math: '8 \\times (-1) = -8; \\quad 5 + (-8) = -3' },
          { text: 'Quotient drops one degree; last number is the remainder.', math: 'Q(x) = 4x + 8, \\qquad R = -3' }
        ],
        answer: '$Q(x) = 4x+8$, remainder $-3$',
        checklist: ['Convert $x+1$ into $x-(-1)$ to read off $c$.', 'List the coefficients.', 'Bring down, multiply, add.', 'Read the quotient one degree lower.'] },

      { title: 'Pinning down the leading coefficient',
        problem: 'Find a polynomial of degree $4$ with zeros $-2$, $1$, $0$ and $3$, where the coefficient of $x^3$ is $4$.',
        steps: [
          { text: 'One bracket per zero. The zero at $0$ gives a bare $x$.', math: 'P(x) = a\\,x(x+2)(x-1)(x-3)' },
          { text: 'This time the condition is on $x^3$, not on $x^4$, so expand enough to see that term.' },
          { text: 'Multiplying the three brackets gives $x^3 - 2x^2 - 5x + 6$, so with the extra $x$:', math: 'P(x) = a\\left(x^4 - 2x^3 - 5x^2 + 6x\\right)' },
          { text: 'The coefficient of $x^3$ is therefore $-2a$, and that must equal $4$.', math: '-2a = 4 \\Rightarrow a = -2' },
          { text: 'So the polynomial is:', math: 'P(x) = -2x(x+2)(x-1)(x-3)' }
        ],
        answer: '$P(x) = -2x(x+2)(x-1)(x-3)$',
        checklist: ['One bracket per zero; a zero at $0$ gives a plain $x$.', 'Check which coefficient the question fixes.', 'Expand only as far as you need.', 'Solve for $a$ and write the answer.'] }
    ],

    exercises: [
      { id: '3.3-e1', prompt: 'Divide $2x^2 - 5x - 7$ by $x - 2$. Enter the **quotient** $Q(x)$ in terms of $x$.',
        answer: { type: 'expression', value: '2*x - 1', vars: ['x'] },
        hints: ['Start by dividing the leading terms: $2x^2 \\div x$.', 'That gives $2x$. Multiply back, subtract, then repeat.'],
        solution: [{ text: 'First term of the quotient.', math: '2x^2 \\div x = 2x' },
          { text: 'After subtracting and repeating, the second term is $-1$.', math: 'Q(x) = 2x - 1' }] },

      { id: '3.3-e2', prompt: 'For that same division, what is the **remainder**?',
        answer: { type: 'number', value: -9 },
        hints: ['You can finish the long division — or use the Remainder Theorem.', 'The divisor is $x-2$, so the remainder is $P(2)$.', '$P(2) = 2(4) - 5(2) - 7$.'],
        solution: [{ text: 'By the Remainder Theorem, substitute $c = 2$.', math: 'P(2) = 8 - 10 - 7 = -9' }] },

      { id: '3.3-e3', prompt: 'Use synthetic division to divide $2x^3 - 7x^2 + 5$ by $x-3$. Enter the quotient $Q(x)$ in terms of $x$.',
        answer: { type: 'expression', value: '2*x^2 - x - 3', vars: ['x'] },
        hints: ['Write the coefficients with a zero for the missing $x$ term: $2, -7, 0, 5$.', 'With $c = 3$: bring down $2$; $-7+6 = -1$; $0-3 = -3$; $5-9 = -4$.', 'The last number is the remainder, so the quotient is $2x^2 - x - 3$.'],
        solution: [{ text: 'Coefficients with the gap filled.', math: '2,\\ -7,\\ 0,\\ 5' },
          { text: 'Synthetic division with $c=3$ gives $2, -1, -3$ and remainder $-4$.', math: 'Q(x) = 2x^2 - x - 3' }] },

      { id: '3.3-e4', prompt: 'For that same synthetic division, what is the remainder?',
        answer: { type: 'number', value: -4 },
        hints: ['It is the last number in the synthetic division row.', 'Or substitute: $P(3) = 2(27) - 7(9) + 5$.'],
        solution: [{ text: 'Substitute $c=3$.', math: 'P(3) = 54 - 63 + 5 = -4' }] },

      { id: '3.3-e5', prompt: 'Use synthetic division to divide $4x^2 + 12x + 5$ by $x+1$. Enter the quotient in terms of $x$.',
        answer: { type: 'expression', value: '4*x + 8', vars: ['x'] },
        hints: ['Careful with the sign: $x+1$ means $c = -1$, not $+1$.', 'Coefficients $4, 12, 5$. Bring down $4$; $12 - 4 = 8$; $5 - 8 = -3$.'],
        solution: [{ text: 'Use $c = -1$.', math: '4,\\ 12,\\ 5 \\longrightarrow 4,\\ 8 \\text{ remainder } -3' },
          { text: 'Quotient drops one degree.', math: 'Q(x) = 4x + 8' }] },

      { id: '3.3-e6', prompt: 'Find the remainder when $P(x) = x^3 + 2x^2 - 3x - 10$ is divided by $x - 2$.',
        answer: { type: 'number', value: 0 },
        hints: ['Use the Remainder Theorem instead of dividing: the remainder is $P(2)$.', '$P(2) = 8 + 8 - 6 - 10$.'],
        solution: [{ text: 'Substitute $c=2$.', math: 'P(2) = 8 + 8 - 6 - 10 = 0' },
          { text: 'A remainder of zero means $x-2$ is a factor.' }] },

      { id: '3.3-e7', prompt: 'Is $x - 3$ a factor of $P(x) = x^3 - 4x^2 + x + 6$?',
        answer: { type: 'choice', value: 'yes', options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }], wrongMessage: 'Not quite — substitute $x = 3$ and see whether you get zero.' },
        hints: ['Use the Factor Theorem: substitute $c = 3$.', '$P(3) = 27 - 36 + 3 + 6$.'],
        solution: [{ text: 'Substitute.', math: 'P(3) = 27 - 36 + 3 + 6 = 0' },
          { text: 'Zero, so by the Factor Theorem $x-3$ is a factor.' }] },

      { id: '3.3-e8', prompt: 'Find the remainder when $P(x) = x^3 + 2x^2 - 3x - 10$ is divided by $x + 1$.',
        answer: { type: 'number', value: -6 },
        hints: ['$x+1$ means $c = -1$.', '$P(-1) = -1 + 2 + 3 - 10$.'],
        solution: [{ text: 'Substitute $c = -1$, in brackets.', math: 'P(-1) = (-1)^3 + 2(-1)^2 - 3(-1) - 10' },
          { text: 'Work it out.', math: '= -1 + 2 + 3 - 10 = -6' }] },

      { id: '3.3-e9', prompt: 'Find a polynomial of degree $3$ with zeros $-1$, $1$ and $3$ and leading coefficient $2$. Give it in factored form.',
        answer: { type: 'expression', value: '2*(x+1)*(x-1)*(x-3)', vars: ['x'], form: 'factored' },
        hints: ['One bracket per zero. A zero at $-1$ gives $(x+1)$.', 'The leading coefficient is the number out front, so it is $2$.'],
        solution: [{ text: 'One bracket per zero, with the $2$ in front.', math: 'P(x) = 2(x+1)(x-1)(x-3)' }] },

      { id: '3.3-e10', prompt: 'Write a polynomial with zeros $0$, $2$ and $-5$ and leading coefficient $1$, in factored form.',
        answer: { type: 'expression', value: 'x*(x-2)*(x+5)', vars: ['x'], form: 'factored' },
        hints: ['A zero at $0$ gives a plain $x$ as the bracket.', 'A zero at $-5$ gives $(x+5)$.'],
        solution: [{ text: 'One bracket per zero.', math: 'P(x) = x(x-2)(x+5)' }] },

      { id: '3.3-e11', prompt: 'When $P(x)$ is divided by $x - 4$ the remainder is $0$. What is $P(4)$?',
        answer: { type: 'number', value: 0 },
        hints: ['The Remainder Theorem says the remainder **is** $P(c)$.', 'Here $c = 4$.'],
        solution: [{ text: 'The remainder equals $P(4)$, and we are told it is $0$.', math: 'P(4) = 0' },
          { text: 'Equivalently, $x-4$ is a factor.' }] },

      { id: '3.3-e12', prompt: 'Divide $x^2 + 5x + 6$ by $x + 2$. Enter the quotient in terms of $x$.',
        answer: { type: 'expression', value: 'x + 3', vars: ['x'] },
        hints: ['The top factors as $(x+2)(x+3)$, so this divides exactly.', 'Or use synthetic division with $c = -2$.'],
        solution: [{ text: 'Factor the top.', math: 'x^2+5x+6 = (x+2)(x+3)' },
          { text: 'The $(x+2)$ cancels, leaving the quotient with no remainder.', math: 'Q(x) = x+3' }] }
    ],

    generators: [
      { id: '3.3-g-remainder', title: 'Remainder by substitution', desc: 'The Remainder Theorem in one step.',
        make(r) {
          const a = r.nz(-4, 4), b = r.nz(-6, 6), c0 = r.nz(-9, 9), c = r.nz(-4, 4);
          const val = a * c * c * c + b * c * c + c0;
          const dTex = 'x ' + (c < 0 ? '+ ' + (-c) : '- ' + c);
          return {
            prompt: 'Find the remainder when $P(x) = ' + M.polyTex([a, b, 0, c0]) + '$ is divided by $' + dTex + '$.',
            answer: { type: 'number', value: val },
            hints: ['Use the Remainder Theorem rather than dividing — the remainder is $P(c)$.',
              'Here the divisor is $x - (' + c + ')$, so $c = ' + c + '$.',
              'Substitute $' + c + '$ into $P$, keeping it in brackets.'],
            solution: [{ text: 'Read $c$ off the divisor.', math: 'c = ' + c },
              { text: 'Substitute.', math: 'P(' + c + ') = ' + val }]
          };
        } },

      { id: '3.3-g-isfactor', title: 'Is it a factor?', desc: 'The Factor Theorem as a yes/no test.',
        make(r) {
          const root = r.nz(-5, 5), other = r.nz(-5, 5);
          const isFactor = r.bool(0.5);
          const c = isFactor ? root : root + r.pick([-2, -1, 1, 2]);
          // P(x) = (x - root)(x - other)
          const coeffs = M.polyMul([1, -root], [1, -other]);
          const val = c * c + coeffs[1] * c + coeffs[2];
          return {
            prompt: 'Is $x ' + (c < 0 ? '+ ' + (-c) : '- ' + c) + '$ a factor of $P(x) = ' + M.polyTex(coeffs) + '$?',
            answer: { type: 'choice', value: val === 0 ? 'yes' : 'no',
              options: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }],
              wrongMessage: 'Not quite — substitute and see whether you get zero.' },
            hints: ['The Factor Theorem turns this into one substitution.',
              'The divisor is $x - (' + c + ')$, so work out $P(' + c + ')$.',
              'Zero means it is a factor; anything else means it is not.'],
            solution: [{ text: 'Substitute $c = ' + c + '$.', math: 'P(' + c + ') = ' + val },
              { text: val === 0 ? 'It is zero, so by the Factor Theorem it is a factor.' : 'Not zero, so it is not a factor — that value is the remainder.' }]
          };
        } },

      { id: '3.3-g-synthetic', title: 'Synthetic division', desc: 'Divide by $x - c$ using coefficients only.',
        make(r) {
          const q1 = r.nz(-4, 4), q0 = r.nz(-8, 8), c = r.nz(-4, 4), rem = r.nz(-8, 8);
          // P(x) = (x - c)(q1 x + q0) + rem
          const p2 = q1, p1 = q0 - c * q1, p0 = rem - c * q0;
          return {
            prompt: 'Use synthetic division to divide $' + M.polyTex([p2, p1, p0]) + '$ by $x ' + (c < 0 ? '+ ' + (-c) : '- ' + c) + '$. Enter the **quotient** in terms of $x$.',
            answer: { type: 'expression', value: '(' + q1 + ')*x + (' + q0 + ')', vars: ['x'] },
            hints: ['Write the coefficients: $' + p2 + ', ' + p1 + ', ' + p0 + '$.',
              'The divisor is $x - (' + c + ')$, so use $c = ' + c + '$' + (c < 0 ? ' — note the sign.' : '.'),
              'Bring down $' + p2 + '$, multiply by $' + c + '$ and add to $' + p1 + '$ to get $' + q0 + '$.'],
            solution: [{ text: 'Bring down, multiply by $' + c + '$, add.', math: '' + p2 + ',\\ ' + q0 + ' \\quad\\text{remainder } ' + rem },
              { text: 'The quotient is one degree lower.', math: M.polyTex([q1, q0]) }]
          };
        } },

      { id: '3.3-g-fromzeros', title: 'Build it from its zeros', desc: 'One bracket per zero.',
        make(r) {
          const z = [r.nz(-5, 5), r.nz(-5, 5), r.nz(-5, 5)];
          if (z[0] === z[1] || z[1] === z[2] || z[0] === z[2]) return this.make(r);
          const a = r.nz(-4, 4);
          const br = v => '(x ' + (v < 0 ? '+ ' + (-v) : '- ' + v) + ')';
          return {
            prompt: 'Find a polynomial of degree $3$ with zeros $' + z[0] + '$, $' + z[1] + '$ and $' + z[2] + '$, and leading coefficient $' + a + '$. Give it in factored form.',
            answer: { type: 'expression', value: '(' + a + ')*(x-(' + z[0] + '))*(x-(' + z[1] + '))*(x-(' + z[2] + '))', vars: ['x'], form: 'factored' },
            hints: ['One bracket per zero. A zero at $c$ gives the bracket $(x - c)$.',
              'So a zero at a negative number gives a **plus** inside the bracket.',
              'The leading coefficient is just the number in front.'],
            solution: [{ text: 'One bracket per zero.', math: br(z[0]) + br(z[1]) + br(z[2]) },
              { text: 'Put the leading coefficient in front.', math: '' + a + br(z[0]) + br(z[1]) + br(z[2]) }]
          };
        } }
    ]
  });
})();
