/* 1.3 Algebraic Expressions */
(function () {
  const M = CH.M, V = CH.V;

  // helpers for generators
  const lin = (a, b) => M.polyTex([a, b]);           // "2x + 3"
  const linS = (a, b) => M.polyStr([a, b]);          // parser syntax
  const paren = s => '(' + s + ')';

  CH.registerSection({
    id: '1.3', chapter: 1, title: 'Algebraic Expressions',
    summary: 'Polynomials, multiplying out brackets, the special product patterns, and — going the other way — factoring.',

    theory: [
      { short: true, md: 'This section is about **multiplying brackets out**, and then doing that backwards.\n\n- **Expanding** means multiplying out. Every term in the first bracket multiplies every term in the second.\n- **Factoring** is the reverse: writing something as things multiplied together.\n- When factoring, always look first for something that divides *every* term and pull it out.\n- A handful of patterns keep coming back. Learning those shapes does most of the work.' },
      { h: 'Polynomials' },
      'A **polynomial** is an expression built from a variable using only **adding, subtracting, and multiplying by numbers**, with whole-number powers. Each piece is a **term**.',
      '$$2x^3 - 7x^2 - 7x + 12 \\qquad \\text{(a polynomial of degree 3: the highest power is } x^3\\text{)}$$',
      'These are **not** polynomials: $\\sqrt{x} + 1$ (a root of $x$), $\\dfrac{1}{x}$ (dividing by $x$), $x^{-2}$ (a negative power). The **degree** is the highest power that appears.',
      { key: 'Adding and subtracting', md: 'Combine **like terms** — terms with exactly the same variable part. $3x^2$ and $-5x^2$ are like terms; $3x^2$ and $3x$ are not.\n\nWhen subtracting a bracket, the minus sign flips **every** term inside it:\n\n$$(2x^3 - x^2 + 5) - (x^3 - 4x^2 - 3) = 2x^3 - x^2 + 5 - x^3 + 4x^2 + 3 = x^3 + 3x^2 + 8$$' },

      { h: 'Multiplying brackets' },
      'Every term in the first bracket must be multiplied by every term in the second. For two binomials this is often called **FOIL** (First, Outer, Inner, Last), but the area model keeps you organised for *any* size:',
      { html: V.areaModel({ rows: ['2x', '+3'], cols: ['x^2', '-5x', '+4'], cells: [['2x^3', '-10x^2', '8x'], ['3x^2', '-15x', '12']] }), caption: '$(2x + 3)(x^2 - 5x + 4)$: fill each cell with the product of its row and column, then add all six cells and combine like terms: $2x^3 - 7x^2 - 7x + 12$.' },
      { tip: 'Sanity check', md: 'A quick way to catch slips: put $x = 1$ into both the original and your answer. $(2 + 3)(1 - 5 + 4) = 5 \\cdot 0 = 0$ and $2 - 7 - 7 + 12 = 0$. ✓ (This is exactly what the answer checker does, with more values.)' },

      { h: 'Special products — patterns worth memorising' },
      'These come up constantly, forwards (expanding) and backwards (factoring). Learn the shapes:',
      '| Name | Pattern | Example |\n|---|---|---|\n| Difference of squares | $(A - B)(A + B) = A^2 - B^2$ | $(2x-3)(2x+3) = 4x^2 - 9$ |\n| Perfect square | $(A + B)^2 = A^2 + 2AB + B^2$ | $(3x+2)^2 = 9x^2 + 12x + 4$ |\n| Perfect square | $(A - B)^2 = A^2 - 2AB + B^2$ | $(5x^2 - 4)^2 = 25x^4 - 40x^2 + 16$ |\n| Cube | $(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$ | $(2x+5)^3 = 8x^3 + 60x^2 + 150x + 125$ |\n| Cube | $(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$ | $(x-2)^3 = x^3 - 6x^2 + 12x - 8$ |',
      { html: V.areaModel({ rows: ['A', '+B'], cols: ['A', '+B'], cells: [['A^2', 'AB'], ['AB', 'B^2']] }), caption: 'Why $(A+B)^2$ has a middle term: the square splits into $A^2$, $B^2$ and **two** rectangles of area $AB$. So $(A + B)^2 = A^2 + 2AB + B^2$ — never just $A^2 + B^2$.' },
      { warn: 'The number-one algebra mistake', md: '$(x + 3)^2$ is **not** $x^2 + 9$. It is $x^2 + 6x + 9$. Check with $x = 1$: $(1+3)^2 = 16$, but $1 + 9 = 10$.' },

      { h: 'The same patterns with roots and fractional powers' },
      'The special products do not care what $A$ and $B$ stand for. They work just as well when $A$ is a **root** or a **fractional power** — and that is where they become really useful, because squaring a square root removes it.',
      '| Looks like | Pattern | Result |\n|---|---|---|\n| $(\\sqrt{x} + 2)(\\sqrt{x} - 2)$ | $(A+B)(A-B)$ with $A = \\sqrt x$ | $(\\sqrt x)^2 - 2^2 = x - 4$ |\n| $(x^{1/2} + y^{1/2})(x^{1/2} - y^{1/2})$ | $(A+B)(A-B)$ | $x - y$ |\n| $\\left(\\sqrt{h^2+1} + 1\\right)\\left(\\sqrt{h^2+1} - 1\\right)$ | $(A+B)(A-B)$ | $(h^2+1) - 1 = h^2$ |',
      { key: 'Why it works', md: 'The middle terms always cancel, and then $\\left(\\sqrt{A}\\right)^2 = A$ — the root disappears. This is exactly the conjugate trick from §1.2, seen from the other side.' },
      'Distributing works the same way — just **add the exponents**, remembering $\\sqrt{x} = x^{1/2}$ and $\\dfrac{1}{\\sqrt x} = x^{-1/2}$:',
      '$$x^{3/2}\\left(\\sqrt{x} - \\frac{1}{\\sqrt{x}}\\right) = x^{3/2}x^{1/2} - x^{3/2}x^{-1/2} = x^{2} - x$$',
      { tip: 'Turn roots into powers first', md: 'Almost every one of these gets easier if you rewrite roots as fractional powers before you start. Then it is only the exponent laws from §1.2.' },

      { h: 'Factoring: multiplying in reverse' },
      'To **factor** means to write an expression as a **product** — the opposite of expanding. $x^2 + 7x + 12$ factors as $(x + 3)(x + 4)$. Factoring is the key skill for solving equations later, so it is worth getting fluent.',
      { key: 'Step 1 — always look for a common factor first', md: 'Find the biggest thing that divides **every** term and pull it out front.\n\n$$2x^3 - 50x = 2x(x^2 - 25) \\qquad\\qquad 3x^4 - 9x^3 + 6x^2 = 3x^2(x^2 - 3x + 2)$$\n\nThen look at what is left in the bracket — it may factor further.' },
      { key: 'Step 2 — count the terms in the bracket', md: '- **Two terms** → try a difference of squares $A^2 - B^2 = (A - B)(A + B)$, or a sum/difference of cubes.\n- **Three terms** → a trinomial: find two numbers (see below).\n- **Four terms** → try grouping.' },
      { key: 'Step 3 — check every factor again', md: 'Keep going until nothing factors any further. $2x(x^2 - 25)$ is not finished: $x^2 - 25 = (x - 5)(x + 5)$, so $2x^3 - 50x = 2x(x - 5)(x + 5)$.' },

      { h: 'Trinomials $x^2 + bx + c$' },
      'Because $(x + p)(x + q) = x^2 + (p + q)x + pq$, you need **two numbers that multiply to $c$ and add to $b$**.',
      { html: V.areaModel({ rows: ['x', '+3'], cols: ['x', '+4'], cells: [['x^2', '4x'], ['3x', '12']] }), caption: '$x^2 + 7x + 12$: the corners give $x^2$ and $12 = 3 \\cdot 4$; the middle rectangles give $3x + 4x = 7x$. So the two numbers multiply to $12$ and add to $7$: they are $3$ and $4$.' },
      '| Trinomial | Need: multiply to… / add to… | Numbers | Factored |\n|---|---|---|---|\n| $x^2 + 7x + 12$ | $12$ / $7$ | $3, 4$ | $(x+3)(x+4)$ |\n| $x^2 - 5x + 6$ | $6$ / $-5$ | $-2, -3$ | $(x-2)(x-3)$ |\n| $x^2 - 3x - 10$ | $-10$ / $-3$ | $-5, 2$ | $(x-5)(x+2)$ |',
      { tip: 'Reading the signs', md: 'If $c$ is **positive**, both numbers have the **same sign** (the sign of $b$). If $c$ is **negative**, the numbers have **opposite signs** — the bigger one takes the sign of $b$.' },

      { h: 'Trinomials $ax^2 + bx + c$ (with $a \\ne 1$)' },
      'When there is a number in front of $x^2$, use the **$ac$ method**: multiply $a$ and $c$, find two numbers that multiply to $ac$ and add to $b$, use them to **split the middle term**, then factor by grouping.',
      { example: {
        title: 'Factor $3x^2 + 7x + 2$',
        problem: 'Factor $3x^2 + 7x + 2$.',
        steps: [
          { text: '$a = 3$, $c = 2$, so $ac = 6$. Two numbers that multiply to $6$ and add to $7$: $1$ and $6$.' },
          { text: 'Split the middle term $7x$ into $x + 6x$.', math: '3x^2 + x + 6x + 2' },
          { text: 'Group in pairs and take out the common factor of each pair.', math: 'x(3x + 1) + 2(3x + 1)' },
          { text: 'Both pieces contain $(3x + 1)$ — pull it out.', math: '(3x + 1)(x + 2)' }
        ], answer: '$(3x + 1)(x + 2)$' } },
      'It is also fine to use **trial and error**: the first terms must multiply to $3x^2$ (so $3x$ and $x$), the last terms to $2$ (so $1$ and $2$, or $2$ and $1$), then check which arrangement gives the middle term $7x$.',

      { h: 'Squares and cubes' },
      '| Pattern | How to spot it |\n|---|---|\n| $A^2 - B^2 = (A - B)(A + B)$ | two terms, both perfect squares, a minus between |\n| $A^2 + 2AB + B^2 = (A + B)^2$ | first and last are squares, middle is twice their roots multiplied |\n| $A^3 - B^3 = (A - B)(A^2 + AB + B^2)$ | two terms, both cubes |\n| $A^3 + B^3 = (A + B)(A^2 - AB + B^2)$ | two terms, both cubes |',
      { tip: 'Remembering the cube formulas', md: 'The first bracket has the **same sign** as the original; the middle sign of the second bracket is the **opposite**; the last sign is always **plus**. Perfect cubes to recognise: $1, 8, 27, 64, 125$, and $x^3, 8x^3 = (2x)^3, 27x^3 = (3x)^3$.\n\n$$x^3 - 8 = (x - 2)(x^2 + 2x + 4) \\qquad 8x^3 + 27 = (2x + 3)(4x^2 - 6x + 9)$$' },
      { warn: 'A sum of squares does not factor', md: '$x^2 + 4$ cannot be factored using real numbers. Only a **difference** of squares splits.' },

      { h: 'When the "letter" is a whole bracket' },
      'In every rule so far, $A$ and $B$ can stand for *anything* — including a whole bracket. Once you spot that, a question that looked unfamiliar turns into one you have already done.',
      { key: 'Common factor that is a bracket', md: 'In $(z+2)^2 - 5(z+2)$ both terms contain $(z + 2)$, so pull it out exactly as you would pull out an $x$:\n\n$$(z+2)^2 - 5(z+2) = (z+2)\\big[(z+2) - 5\\big] = (z+2)(z-3)$$' },
      { key: 'Difference of squares where $A$ is a bracket', md: '$$(x+3)^2 - 4 = (x+3)^2 - 2^2 = \\big[(x+3) - 2\\big]\\big[(x+3) + 2\\big] = (x+1)(x+5)$$\n\nAnd with two brackets: $(a+b)^2 - (a-b)^2 = \\big[(a+b)-(a-b)\\big]\\big[(a+b)+(a-b)\\big] = (2b)(2a) = 4ab$.' },
      { key: 'Factoring by substitution — let $u = \\ldots$', md: 'If the same bracket appears squared and plain, give it a name. To factor $2(a+b)^2 + 5(a+b) - 3$, let $u = a + b$:\n\n$$2u^2 + 5u - 3 = (2u - 1)(u + 3)$$\n\nNow put $a + b$ back: $\\big(2(a+b) - 1\\big)(a + b + 3)$. **Always substitute back at the end.**' },
      { warn: 'Keep going until nothing factors', md: 'With $(a^2+1)^2 - 7(a^2+1) + 10$ and $u = a^2+1$ you get $(u-2)(u-5) = (a^2-1)(a^2-4)$ — and *both* of those are differences of squares:\n\n$$(a-1)(a+1)(a-2)(a+2)$$' },
      { key: 'Factor out the lowest power', md: 'When the powers are negative or fractional, take out the **smallest** one (the most negative). For $x^{-3/2} + 2x^{-1/2} + x^{1/2}$ the smallest power is $-\\tfrac32$:\n\n$$x^{-3/2}\\left(1 + 2x + x^2\\right) = x^{-3/2}(x+1)^2$$\n\nCheck by adding exponents: $x^{-3/2}\\cdot 2x = 2x^{-1/2}$ ✓.' },

      { h: 'Factoring by grouping (four terms)' },
      'Group the terms in pairs, factor each pair, and hope the same bracket appears in both. If it does, pull it out.',
      '$$x^3 - 3x^2 + 4x - 12 = x^2(x - 3) + 4(x - 3) = (x - 3)(x^2 + 4)$$',
      'Sometimes the bracket that comes out factors again: $t^3 + 3t^2 - 4t - 12 = t^2(t + 3) - 4(t + 3) = (t + 3)(t^2 - 4) = (t + 3)(t - 2)(t + 2)$.',
      { calm: true, md: 'Factoring is the part most people find hardest, and it is normal to look at one for a while before anything happens. That is not a sign you cannot do it — that is what factoring looks like for everybody.\n\nThe order never changes: **common factor first, then look for a pattern, then trial and error.** When you get stuck, go back to step one and check you really pulled out everything that was common.\n\nAnd you can always mark your own work here: multiply your answer back out. If you get the original expression, you are right.' },
    ],

    examples: [
      { title: 'Subtracting polynomials',
        problem: 'Simplify $(2x^3 - x^2 - 5x + 4) - (x^3 - 4x^2 + 3x - 1)$.',
        steps: [
          { text: 'The minus sign flips the sign of **every** term in the second bracket.', math: '2x^3 - x^2 - 5x + 4 - x^3 + 4x^2 - 3x + 1' },
          { text: 'Collect like terms, power by power.', math: '(2x^3 - x^3) + (-x^2 + 4x^2) + (-5x - 3x) + (4 + 1) = x^3 + 3x^2 - 8x + 5' }
        ], answer: '$x^3 + 3x^2 - 8x + 5$' },
      { title: 'Multiplying a binomial by a trinomial',
        problem: 'Expand $(2x + 3)(x^2 - 5x + 4)$.',
        steps: [
          { text: 'Multiply each term of the first bracket by the whole second bracket.', math: '2x(x^2 - 5x + 4) + 3(x^2 - 5x + 4)' },
          { text: 'Distribute.', math: '2x^3 - 10x^2 + 8x + 3x^2 - 15x + 12' },
          { text: 'Combine like terms.', math: '2x^3 - 7x^2 - 7x + 12' }
        ], answer: '$2x^3 - 7x^2 - 7x + 12$' },
      { title: 'Special products',
        problem: 'Expand (a) $(2x - 3)(2x + 3)$, (b) $(3x + 2)^2$, (c) $(x - 2)^3$.',
        steps: [
          { text: '(a) Difference of squares with $A = 2x$, $B = 3$.', math: '(2x)^2 - 3^2 = 4x^2 - 9' },
          { text: '(b) Perfect square with $A = 3x$, $B = 2$: $A^2 + 2AB + B^2$.', math: '(3x)^2 + 2(3x)(2) + 2^2 = 9x^2 + 12x + 4' },
          { text: '(c) Cube with $A = x$, $B = 2$: $A^3 - 3A^2B + 3AB^2 - B^3$.', math: 'x^3 - 3x^2(2) + 3x(4) - 8 = x^3 - 6x^2 + 12x - 8' }
        ], answer: '(a) $4x^2 - 9$ &nbsp; (b) $9x^2 + 12x + 4$ &nbsp; (c) $x^3 - 6x^2 + 12x - 8$' },
      { title: 'Common factor, then difference of squares',
        problem: 'Factor $2x^3 - 50x$ completely.',
        steps: [
          { text: 'Both terms contain $2x$. Pull it out.', math: '2x^3 - 50x = 2x(x^2 - 25)' },
          { text: '$x^2 - 25$ is a difference of squares: $x^2 - 5^2$.', math: '= 2x(x - 5)(x + 5)' },
          { text: 'Check: nothing factors further.' }
        ], answer: '$2x(x - 5)(x + 5)$' },
      { title: 'A trinomial with a common factor',
        problem: 'Factor $3x^4 - 9x^3 + 6x^2$ completely.',
        steps: [
          { text: 'Common factor: $3x^2$.', math: '3x^2(x^2 - 3x + 2)' },
          { text: 'Factor the trinomial: two numbers that multiply to $2$ and add to $-3$ are $-1$ and $-2$.', math: '3x^2(x - 1)(x - 2)' }
        ], answer: '$3x^2(x - 1)(x - 2)$' },
      { title: 'Trinomial with $a \\ne 1$',
        problem: 'Factor $2x^2 - 9x - 5$.',
        steps: [
          { text: '$ac = 2 \\cdot (-5) = -10$. Two numbers that multiply to $-10$ and add to $-9$: $-10$ and $1$.' },
          { text: 'Split the middle term.', math: '2x^2 - 10x + x - 5' },
          { text: 'Group and factor each pair.', math: '2x(x - 5) + 1(x - 5)' },
          { text: 'Pull out the common bracket.', math: '(x - 5)(2x + 1)' }
        ], answer: '$(2x + 1)(x - 5)$' },
      { title: 'Sum of cubes',
        problem: 'Factor $8x^3 + 27$.',
        steps: [
          { text: 'Recognise cubes: $8x^3 = (2x)^3$ and $27 = 3^3$. So $A = 2x$, $B = 3$.' },
          { text: 'Use $A^3 + B^3 = (A + B)(A^2 - AB + B^2)$.', math: '(2x + 3)\\left((2x)^2 - (2x)(3) + 3^2\\right) = (2x + 3)(4x^2 - 6x + 9)' }
        ], answer: '$(2x + 3)(4x^2 - 6x + 9)$' },
      { title: 'Grouping',
        problem: 'Factor $x^4 - 3x^3 + 8x - 24$ completely.',
        steps: [
          { text: 'Four terms: group in pairs and factor each pair.', math: 'x^3(x - 3) + 8(x - 3)' },
          { text: 'Pull out the shared bracket.', math: '(x - 3)(x^3 + 8)' },
          { text: '$x^3 + 8$ is a sum of cubes ($A = x$, $B = 2$).', math: '(x - 3)(x + 2)(x^2 - 2x + 4)' }
        ], answer: '$(x - 3)(x + 2)(x^2 - 2x + 4)$' }
    ],

    exercises: [
      { id: '1.3-e1', prompt: 'Simplify $(3x^2 - 2x + 5) - (x^2 - 4x - 1)$.',
        answer: { type: 'expression', value: '2x^2 + 2x + 6', form: 'expanded' },
        hints: ['The minus flips every sign in the second bracket.', '$3x^2 - 2x + 5 - x^2 + 4x + 1$, now collect like terms.'],
        solution: [{ math: '3x^2 - 2x + 5 - x^2 + 4x + 1 = 2x^2 + 2x + 6', text: 'Distribute the minus and combine like terms.' }] },
      { id: '1.3-e2', prompt: 'Expand $(x + 3)(x - 5)$.',
        answer: { type: 'expression', value: 'x^2 - 2x - 15', form: 'expanded' },
        hints: ['Four products: $x \\cdot x$, $x \\cdot (-5)$, $3 \\cdot x$, $3 \\cdot (-5)$.'],
        solution: [{ math: 'x^2 - 5x + 3x - 15 = x^2 - 2x - 15', text: 'FOIL, then combine the middle terms.' }] },
      { id: '1.3-e3', prompt: 'Expand $(2x + 3)(x^2 - 5x + 4)$.',
        answer: { type: 'expression', value: '2x^3 - 7x^2 - 7x + 12', form: 'expanded' },
        hints: ['Multiply $2x$ by every term, then $3$ by every term — six products in all.', 'An area model with 2 rows and 3 columns keeps it tidy.'],
        solution: [{ math: '2x^3 - 10x^2 + 8x + 3x^2 - 15x + 12 = 2x^3 - 7x^2 - 7x + 12', text: 'Distribute and combine.' }] },
      { id: '1.3-e4', prompt: 'Expand $(5x^2 - 4)^2$.',
        answer: { type: 'expression', value: '25x^4 - 40x^2 + 16', form: 'expanded' },
        hints: ['Perfect square: $A^2 - 2AB + B^2$ with $A = 5x^2$, $B = 4$.', 'Do not forget the middle term $-2(5x^2)(4)$.'],
        solution: [{ math: '(5x^2)^2 - 2(5x^2)(4) + 4^2 = 25x^4 - 40x^2 + 16', text: 'Apply the pattern.' }] },
      { id: '1.3-e5', prompt: 'Expand $(2x + 5)^3$.',
        answer: { type: 'expression', value: '8x^3 + 60x^2 + 150x + 125', form: 'expanded' },
        hints: ['$(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$ with $A = 2x$, $B = 5$.', '$3A^2B = 3(4x^2)(5) = 60x^2$ and $3AB^2 = 3(2x)(25) = 150x$.'],
        solution: [{ math: '(2x)^3 + 3(2x)^2(5) + 3(2x)(5)^2 + 5^3 = 8x^3 + 60x^2 + 150x + 125', text: 'Apply the cube pattern.' }] },
      { id: '1.3-e6', prompt: 'Factor $x^2 + 7x + 12$.',
        answer: { type: 'expression', value: '(x+3)(x+4)', form: 'factored' },
        hints: ['Two numbers that multiply to $12$ and add to $7$.'],
        solution: ['$3 \\cdot 4 = 12$ and $3 + 4 = 7$, so $x^2 + 7x + 12 = (x + 3)(x + 4)$.'] },
      { id: '1.3-e7', prompt: 'Factor $x^2 - 3x - 10$.',
        answer: { type: 'expression', value: '(x-5)(x+2)', form: 'factored' },
        hints: ['Multiply to $-10$, add to $-3$. Opposite signs; the bigger one is negative.'],
        solution: ['$-5 \\cdot 2 = -10$ and $-5 + 2 = -3$, so $x^2 - 3x - 10 = (x - 5)(x + 2)$.'] },
      { id: '1.3-e8', prompt: 'Factor $2x^2 - 9x - 5$.',
        answer: { type: 'expression', value: '(2x+1)(x-5)', form: 'factored' },
        hints: ['$ac = -10$. Two numbers multiplying to $-10$ and adding to $-9$: $-10$ and $1$.', 'Split: $2x^2 - 10x + x - 5$, then group.'],
        solution: [{ math: '2x^2 - 10x + x - 5 = 2x(x - 5) + 1(x - 5) = (2x + 1)(x - 5)', text: 'Split the middle term and group.' }] },
      { id: '1.3-e9', prompt: 'Factor $2x^3 - 50x$ completely.',
        answer: { type: 'expression', value: '2x(x-5)(x+5)', form: 'factored' },
        hints: ['Common factor first: $2x$.', 'Then $x^2 - 25$ is a difference of squares.'],
        solution: [{ math: '2x^3 - 50x = 2x(x^2 - 25) = 2x(x - 5)(x + 5)', text: 'Common factor, then difference of squares.' }] },
      { id: '1.3-e10', prompt: 'Factor $3x^4 - 9x^3 + 6x^2$ completely.',
        answer: { type: 'expression', value: '3x^2(x-1)(x-2)', form: 'factored' },
        hints: ['Common factor $3x^2$.', 'Then factor $x^2 - 3x + 2$: numbers multiplying to $2$, adding to $-3$.'],
        solution: [{ math: '3x^2(x^2 - 3x + 2) = 3x^2(x - 1)(x - 2)', text: 'Common factor, then the trinomial.' }] },
      { id: '1.3-e11', prompt: 'Factor $8x^3 + 27$.',
        answer: { type: 'expression', value: '(2x+3)(4x^2-6x+9)', form: 'factored' },
        hints: ['Both terms are cubes: $(2x)^3$ and $3^3$.', '$A^3 + B^3 = (A + B)(A^2 - AB + B^2)$.'],
        solution: [{ math: '(2x + 3)(4x^2 - 6x + 9)', text: 'Sum of cubes with $A = 2x$, $B = 3$.' }] },
      { id: '1.3-e12', prompt: 'Factor $x^3 - 3x^2 + 4x - 12$ by grouping.',
        answer: { type: 'expression', value: '(x-3)(x^2+4)', form: 'factored' },
        hints: ['Group: $(x^3 - 3x^2) + (4x - 12)$.', '$x^2(x - 3) + 4(x - 3)$.'],
        solution: [{ math: 'x^2(x - 3) + 4(x - 3) = (x - 3)(x^2 + 4)', text: 'Factor each pair, then pull out the common bracket. $x^2 + 4$ is a sum of squares and does not factor.' }] },
      { id: '1.3-e13', prompt: 'Factor $9x^2 - 12x + 4$.',
        answer: { type: 'expression', value: '(3x-2)^2', form: 'factored' },
        hints: ['First and last terms are perfect squares: $(3x)^2$ and $2^2$. Is the middle $-2(3x)(2)$?'],
        solution: ['$(3x)^2 - 2(3x)(2) + 2^2$ matches the perfect-square pattern, so $9x^2 - 12x + 4 = (3x - 2)^2$.'] },
      { id: '1.3-e14', prompt: 'Expand $(2x + 3y)^2$.',
        answer: { type: 'expression', value: '4x^2 + 12xy + 9y^2', form: 'expanded', vars: ['x', 'y'] },
        hints: ['Perfect square with $A = 2x$ and $B = 3y$.', 'The middle term is $2AB = 2(2x)(3y)$.'],
        solution: [{ math: '(2x)^2 + 2(2x)(3y) + (3y)^2 = 4x^2 + 12xy + 9y^2', text: 'Apply $A^2 + 2AB + B^2$.' }] },
      { id: '1.3-e15', prompt: 'Expand $(\\sqrt{x} + 2)(\\sqrt{x} - 2)$ (assume $x \\ge 0$).',
        answer: { type: 'expression', value: 'x - 4', vars: ['x'], assume: 'x > 0' },
        hints: ['Difference of squares with $A = \\sqrt{x}$, $B = 2$.', '$(\\sqrt{x})^2 = x$.'],
        solution: [{ math: '(\\sqrt{x})^2 - 2^2 = x - 4', text: 'The middle terms cancel and the square undoes the root.' }] },
      { id: '1.3-e16', prompt: 'Expand $\\left(\\sqrt{h^2 + 1} + 1\\right)\\left(\\sqrt{h^2 + 1} - 1\\right)$.',
        answer: { type: 'expression', value: 'h^2', vars: ['h'] },
        hints: ['Difference of squares with $A = \\sqrt{h^2+1}$ and $B = 1$.', '$\\left(\\sqrt{h^2+1}\\right)^2 = h^2 + 1$.'],
        solution: [{ math: '\\left(\\sqrt{h^2+1}\\right)^2 - 1^2 = (h^2 + 1) - 1 = h^2', text: 'Squaring removes the root.' }] },
      { id: '1.3-e17', prompt: 'Expand $\\left(x^{1/2} + y^{1/2}\\right)\\left(x^{1/2} - y^{1/2}\\right)$ (assume $x, y \\ge 0$).',
        answer: { type: 'expression', value: 'x - y', vars: ['x', 'y'], assume: 'x > 0 ' },
        hints: ['Difference of squares again.', '$\\left(x^{1/2}\\right)^2 = x^{1} = x$.'],
        solution: [{ math: '\\left(x^{1/2}\\right)^2 - \\left(y^{1/2}\\right)^2 = x - y', text: 'Multiply the exponents: $\\tfrac12 \\cdot 2 = 1$.' }] },
      { id: '1.3-e18', prompt: 'Expand and simplify $x^{3/2}\\left(\\sqrt{x} - \\dfrac{1}{\\sqrt{x}}\\right)$ (assume $x > 0$).',
        answer: { type: 'expression', value: 'x^2 - x', form: 'expanded', vars: ['x'], assume: 'x > 0' },
        hints: ['Write the bracket with powers: $\\sqrt{x} = x^{1/2}$ and $\\dfrac{1}{\\sqrt{x}} = x^{-1/2}$.', 'Multiply each term, adding exponents: $\\tfrac32 + \\tfrac12$ and $\\tfrac32 - \\tfrac12$.'],
        solution: [{ math: 'x^{3/2}x^{1/2} - x^{3/2}x^{-1/2} = x^{2} - x^{1} = x^2 - x', text: 'Distribute and add the exponents.' }] },
      { id: '1.3-e19', prompt: 'Expand and simplify $y^{1/3}\\left(y^{2/3} + y^{5/3}\\right)$.',
        answer: { type: 'expression', value: 'y + y^2', form: 'expanded', vars: ['y'], assume: 'y > 0' },
        hints: ['Multiply into the bracket, adding exponents each time.', '$\\tfrac13 + \\tfrac23 = 1$ and $\\tfrac13 + \\tfrac53 = 2$.'],
        solution: [{ math: 'y^{1/3 + 2/3} + y^{1/3 + 5/3} = y + y^2', text: 'Add the exponents term by term.' }] },
      { id: '1.3-e20', prompt: 'Factor $(z + 2)^2 - 5(z + 2)$ completely.',
        answer: { type: 'expression', value: '(z+2)(z-3)', form: 'factored', vars: ['z'] },
        hints: ['The common factor is the whole bracket $(z + 2)$.', 'Taking it out leaves $(z + 2) - 5$.'],
        solution: [{ math: '(z+2)\\big[(z+2) - 5\\big] = (z+2)(z-3)', text: 'Pull out the common bracket, then tidy what is left.' }] },
      { id: '1.3-e21', prompt: 'Factor $(x + 3)^2 - 4$ completely.',
        answer: { type: 'expression', value: '(x+1)(x+5)', form: 'factored', vars: ['x'] },
        hints: ['A difference of squares with $A = x + 3$ and $B = 2$.', '$(A - B)(A + B) = (x + 3 - 2)(x + 3 + 2)$.'],
        solution: [{ math: '(x+3)^2 - 2^2 = (x + 1)(x + 5)', text: 'Difference of squares where $A$ is a bracket.' }] },
      { id: '1.3-e22', prompt: 'Factor $(a + b)^2 - (a - b)^2$ completely.',
        answer: { type: 'expression', value: '4ab', vars: ['a', 'b'] },
        hints: ['Difference of squares with $A = a+b$ and $B = a-b$.', '$(A-B) = (a+b)-(a-b) = 2b$ and $(A+B) = 2a$.'],
        solution: [{ math: '\\big[(a+b)-(a-b)\\big]\\big[(a+b)+(a-b)\\big] = (2b)(2a) = 4ab', text: 'Difference of squares, then tidy each bracket.' }] },
      { id: '1.3-e23', prompt: 'Factor $x^2(x^2 - 1) - 9(x^2 - 1)$ completely.',
        answer: { type: 'expression', value: '(x-1)(x+1)(x-3)(x+3)', form: 'factored', vars: ['x'] },
        hints: ['Both terms share the bracket $(x^2 - 1)$.', 'You get $(x^2-1)(x^2-9)$ — and **both** of those are differences of squares.'],
        solution: [{ math: '(x^2 - 1)(x^2 - 9) = (x-1)(x+1)(x-3)(x+3)', text: 'Common bracket first, then factor both differences of squares.' }] },
      { id: '1.3-e24', prompt: 'Factor $2(a + b)^2 + 5(a + b) - 3$. (Hint: let $u = a + b$.)',
        answer: { type: 'expression', value: '(2(a+b) - 1)(a+b+3)', form: 'factored', vars: ['a', 'b'] },
        hints: ['With $u = a + b$ the expression is $2u^2 + 5u - 3$.', '$2u^2 + 5u - 3 = (2u - 1)(u + 3)$. Now put $a + b$ back in place of $u$.'],
        solution: [{ text: 'Substitute $u = a+b$.', math: '2u^2 + 5u - 3 = (2u - 1)(u + 3)' }, { text: 'Replace $u$ by $a + b$.', math: '\\big(2(a+b) - 1\\big)(a + b + 3)' }] },
      { id: '1.3-e25', prompt: 'Factor $(a^2 + 1)^2 - 7(a^2 + 1) + 10$ completely. (Hint: let $u = a^2 + 1$.)',
        answer: { type: 'expression', value: '(a-1)(a+1)(a-2)(a+2)', form: 'factored', vars: ['a'] },
        hints: ['With $u = a^2 + 1$: $u^2 - 7u + 10 = (u - 2)(u - 5)$.', 'Put $u$ back: $(a^2 + 1 - 2)(a^2 + 1 - 5) = (a^2 - 1)(a^2 - 4)$ — keep factoring!'],
        solution: [{ text: 'Substitute and factor.', math: 'u^2 - 7u + 10 = (u-2)(u-5)' }, { text: 'Put $u = a^2+1$ back and simplify each bracket.', math: '(a^2 - 1)(a^2 - 4)' }, { text: 'Both are differences of squares.', math: '(a-1)(a+1)(a-2)(a+2)' }] },
      { id: '1.3-e26', prompt: 'Factor $x^{-3/2} + 2x^{-1/2} + x^{1/2}$ by taking out the lowest power of $x$ (assume $x > 0$).',
        answer: { type: 'expression', value: 'x^(-3/2)(x+1)^2', vars: ['x'], assume: 'x > 0', display: 'x^{-3/2}(x+1)^2' },
        hints: ['The three powers are $-\\tfrac32$, $-\\tfrac12$ and $\\tfrac12$. The smallest is $-\\tfrac32$.', 'Taking out $x^{-3/2}$ leaves $1 + 2x + x^2$ — which factors.'],
        solution: [{ text: 'Take out the lowest power.', math: 'x^{-3/2}\\left(1 + 2x + x^2\\right)' }, { text: 'The bracket is a perfect square.', math: '= x^{-3/2}(x+1)^2' }] },
      { id: '1.3-e27', prompt: 'Factor $18y^3x^2 - 2xy^4$ completely.',
        answer: { type: 'expression', value: '2x y^3 (9x - y)', form: 'factored', vars: ['x', 'y'] },
        hints: ['What is the biggest thing dividing both terms? Look at the numbers, then each letter.', 'Numbers: $2$. Powers of $x$: $x$. Powers of $y$: $y^3$.'],
        solution: [{ math: '18y^3x^2 - 2xy^4 = 2xy^3(9x - y)', text: 'Take out $2xy^3$ — the lowest power of each common factor.' }] }
    ],

    generators: [
      { id: '1.3-g-expand', title: 'Expand two brackets', desc: 'FOIL / area model.',
        make(r) {
          const a = r.pick([1, 1, 2, 3]), b = r.nz(-6, 6), c = r.pick([1, 1, 2]), d = r.nz(-6, 6);
          const coeffs = M.polyMul([a, b], [c, d]);
          return { prompt: 'Expand and simplify $' + paren(lin(a, b)) + paren(lin(c, d)) + '$.',
            answer: { type: 'expression', value: M.polyStr(coeffs), form: 'expanded', display: M.polyTex(coeffs) },
            hints: ['Multiply every term in the first bracket by every term in the second (four products).', 'Then add the two middle terms together.'],
            solution: [{ text: 'Four products:', math: paren(lin(a, b)) + paren(lin(c, d)) + ' = ' + M.polyTex([a * c, 0, 0]).replace('x^{2}', 'x^{2}') + ' ' + (a * d >= 0 ? '+' : '-') + ' ' + Math.abs(a * d) + 'x ' + (b * c >= 0 ? '+' : '-') + ' ' + Math.abs(b * c) + 'x ' + (b * d >= 0 ? '+' : '-') + ' ' + Math.abs(b * d) }, { text: 'Combine the middle terms.', math: '= ' + M.polyTex(coeffs) }] };
        } },
      { id: '1.3-g-special', title: 'Special products', desc: 'Squares, difference of squares, cubes.',
        make(r) {
          const kind = r.pick(['sq+', 'sq-', 'dos', 'cube']);
          const a = r.pick([1, 1, 2, 3]), b = r.int(1, 6);
          if (kind === 'dos') {
            const coeffs = [a * a, 0, -b * b];
            return { prompt: 'Expand $' + paren(lin(a, -b)) + paren(lin(a, b)) + '$.', answer: { type: 'expression', value: M.polyStr(coeffs), form: 'expanded', display: M.polyTex(coeffs) },
              hints: ['Difference of squares: $(A - B)(A + B) = A^2 - B^2$.'], solution: [{ math: '(' + lin(a, 0) + ')^2 - ' + b + '^2 = ' + M.polyTex(coeffs), text: 'The middle terms cancel.' }] };
          }
          if (kind === 'cube') {
            const s = r.sign();
            const coeffs = M.polyMul(M.polyMul([a, s * b], [a, s * b]), [a, s * b]);
            return { prompt: 'Expand $' + paren(lin(a, s * b)) + '^3$.', answer: { type: 'expression', value: M.polyStr(coeffs), form: 'expanded', display: M.polyTex(coeffs) },
              hints: ['$(A ' + (s > 0 ? '+' : '-') + ' B)^3 = A^3 ' + (s > 0 ? '+' : '-') + ' 3A^2B + 3AB^2 ' + (s > 0 ? '+' : '-') + ' B^3$ with $A = ' + lin(a, 0) + '$, $B = ' + b + '$.'],
              solution: [{ math: '(' + lin(a, 0) + ')^3 ' + (s > 0 ? '+' : '-') + ' 3(' + lin(a, 0) + ')^2(' + b + ') + 3(' + lin(a, 0) + ')(' + b + ')^2 ' + (s > 0 ? '+' : '-') + ' ' + b + '^3 = ' + M.polyTex(coeffs), text: 'Apply the cube pattern term by term.' }] };
          }
          const s = kind === 'sq+' ? 1 : -1;
          const coeffs = M.polyMul([a, s * b], [a, s * b]);
          return { prompt: 'Expand $' + paren(lin(a, s * b)) + '^2$.', answer: { type: 'expression', value: M.polyStr(coeffs), form: 'expanded', display: M.polyTex(coeffs) },
            hints: ['$(A ' + (s > 0 ? '+' : '-') + ' B)^2 = A^2 ' + (s > 0 ? '+' : '-') + ' 2AB + B^2$ — do not forget the middle term.'],
            solution: [{ math: '(' + lin(a, 0) + ')^2 ' + (s > 0 ? '+' : '-') + ' 2(' + lin(a, 0) + ')(' + b + ') + ' + b + '^2 = ' + M.polyTex(coeffs), text: 'Apply the perfect-square pattern.' }] };
        } },
      { id: '1.3-g-trinomial', title: 'Factor x² + bx + c', desc: 'Find two numbers that multiply to c and add to b.',
        make(r) {
          const p = r.nz(-7, 7), q = r.nz(-7, 7);
          if (p === q) return this.make(r);
          const coeffs = M.polyMul([1, p], [1, q]);
          const [lo, hi] = p < q ? [p, q] : [q, p];
          return { prompt: 'Factor $' + M.polyTex(coeffs) + '$.', answer: { type: 'expression', value: paren(linS(1, lo)) + paren(linS(1, hi)), form: 'factored', display: '(' + lin(1, lo) + ')(' + lin(1, hi) + ')' },
            hints: ['Two numbers that multiply to $' + (p * q) + '$ and add to $' + (p + q) + '$.', (p * q > 0 ? 'Same signs (both ' + (p + q > 0 ? 'positive' : 'negative') + ').' : 'Opposite signs; the larger one is ' + (p + q >= 0 ? 'positive' : 'negative') + '.')],
            solution: ['$' + lo + ' \\cdot ' + hi + ' = ' + (p * q) + '$ and $' + lo + ' + ' + hi + ' = ' + (p + q) + '$, so $' + M.polyTex(coeffs) + ' = (' + lin(1, lo) + ')(' + lin(1, hi) + ')$.'] };
        } },
      { id: '1.3-g-trinomial-a', title: 'Factor ax² + bx + c', desc: 'The ac method: split the middle term, then group.',
        make(r) {
          const a1 = r.pick([2, 3, 5]), b1 = r.nz(-5, 5), a2 = r.pick([1, 1, 2]), b2 = r.nz(-5, 5);
          if (M.gcd(a1, b1) !== 1 || M.gcd(a2, b2) !== 1) return this.make(r);
          const coeffs = M.polyMul([a1, b1], [a2, b2]);
          const [A, B, Cc] = coeffs;
          // split numbers: a1*b2 and a2*b1
          const m1 = a1 * b2, m2 = a2 * b1;
          return { prompt: 'Factor $' + M.polyTex(coeffs) + '$.', answer: { type: 'expression', value: paren(linS(a1, b1)) + paren(linS(a2, b2)), form: 'factored', display: paren(lin(a1, b1)) + paren(lin(a2, b2)) },
            hints: ['$ac = ' + A + ' \\cdot ' + Cc + ' = ' + (A * Cc) + '$. Find two numbers that multiply to $' + (A * Cc) + '$ and add to $' + B + '$.', 'They are $' + m1 + '$ and $' + m2 + '$. Split the middle term and factor by grouping.'],
            solution: [{ text: 'Split the middle term using $' + m1 + '$ and $' + m2 + '$.', math: M.polyTex([A, 0, 0]) + ' ' + M.signed(m1) + 'x ' + M.signed(m2) + 'x ' + M.signed(Cc) }, { text: 'Group and factor each pair.', math: lin(a1, 0) + '(' + lin(a2, b2) + ') ' + (b1 > 0 ? '+ ' + b1 : '- ' + (-b1)) + '(' + lin(a2, b2) + ')' }, { text: 'Pull out the common bracket.', math: paren(lin(a1, b1)) + paren(lin(a2, b2)) }] };
        } },
      { id: '1.3-g-squares-cubes', title: 'Difference of squares & cubes', desc: 'Recognise the pattern, apply the formula.',
        make(r) {
          const kind = r.pick(['dos', 'dos', 'cube+', 'cube-', 'psq']);
          const a = r.pick([1, 1, 2, 3, 4]), b = r.int(1, 6);
          if (kind === 'dos') {
            const coeffs = [a * a, 0, -b * b];
            return { prompt: 'Factor $' + M.polyTex(coeffs) + '$.', answer: { type: 'expression', value: paren(linS(a, -b)) + paren(linS(a, b)), form: 'factored', display: paren(lin(a, -b)) + paren(lin(a, b)) },
              hints: ['Both terms are perfect squares: $(' + lin(a, 0) + ')^2$ and $' + b + '^2$.', '$A^2 - B^2 = (A - B)(A + B)$.'], solution: ['$' + M.polyTex(coeffs) + ' = (' + lin(a, 0) + ')^2 - ' + b + '^2 = ' + paren(lin(a, -b)) + paren(lin(a, b)) + '$.'] };
          }
          if (kind === 'psq') {
            const s = r.sign();
            const coeffs = M.polyMul([a, s * b], [a, s * b]);
            return { prompt: 'Factor $' + M.polyTex(coeffs) + '$.', answer: { type: 'expression', value: paren(linS(a, s * b)) + '^2', form: 'factored', display: paren(lin(a, s * b)) + '^2' },
              hints: ['First and last terms are squares: $(' + lin(a, 0) + ')^2$ and $' + b + '^2$. Is the middle term $\\pm 2 \\cdot ' + lin(a, 0) + ' \\cdot ' + b + '$?'], solution: ['$' + M.polyTex(coeffs) + ' = (' + lin(a, 0) + ')^2 ' + (s > 0 ? '+' : '-') + ' 2(' + lin(a, 0) + ')(' + b + ') + ' + b + '^2 = ' + paren(lin(a, s * b)) + '^2$.'] };
          }
          const s = kind === 'cube+' ? 1 : -1;
          const A = r.pick([1, 1, 2, 3]), Bv = r.pick([1, 2, 3, 4, 5]);
          const first = [A, s * Bv], second = [A * A, -s * A * Bv, Bv * Bv];
          const cubeCoeffs = [A * A * A, 0, 0, s * Bv * Bv * Bv];
          return { prompt: 'Factor $' + M.polyTex(cubeCoeffs) + '$.', answer: { type: 'expression', value: paren(linS(A, s * Bv)) + paren(M.polyStr(second)), form: 'factored', display: paren(lin(A, s * Bv)) + paren(M.polyTex(second)) },
            hints: ['Both terms are cubes: $(' + lin(A, 0) + ')^3$ and $' + Bv + '^3$.', '$A^3 ' + (s > 0 ? '+' : '-') + ' B^3 = (A ' + (s > 0 ? '+' : '-') + ' B)(A^2 ' + (s > 0 ? '-' : '+') + ' AB + B^2)$.'],
            solution: ['With $A = ' + lin(A, 0) + '$ and $B = ' + Bv + '$: $' + M.polyTex(cubeCoeffs) + ' = ' + paren(lin(A, s * Bv)) + paren(M.polyTex(second)) + '$.'] };
        } },
      { id: '1.3-g-complete', title: 'Factor completely', desc: 'Common factor first, then keep going.',
        make(r) {
          const k = r.pick([2, 3, 5]), e = r.pick([1, 1, 2]);
          const kind = r.pick(['tri', 'dos']);
          let inner, innerFactored, innerStr, hint;
          if (kind === 'tri') {
            const p = r.nz(-5, 5), q = r.nz(-5, 5); if (p === q) return this.make(r);
            const [lo, hi] = p < q ? [p, q] : [q, p];
            inner = M.polyMul([1, p], [1, q]); innerFactored = paren(lin(1, lo)) + paren(lin(1, hi)); innerStr = paren(linS(1, lo)) + paren(linS(1, hi));
            hint = 'Then factor the trinomial: two numbers that multiply to $' + (p * q) + '$ and add to $' + (p + q) + '$.';
          } else {
            const b = r.int(1, 6);
            inner = [1, 0, -b * b]; innerFactored = paren(lin(1, -b)) + paren(lin(1, b)); innerStr = paren(linS(1, -b)) + paren(linS(1, b));
            hint = 'Then the bracket is a difference of squares.';
          }
          const full = inner.map(c => c * k).concat(new Array(e).fill(0));
          const cf = k + (e === 1 ? 'x' : 'x^{' + e + '}'), cfS = k + (e === 1 ? 'x' : 'x^' + e);
          return { prompt: 'Factor $' + M.polyTex(full) + '$ completely.', answer: { type: 'expression', value: cfS + innerStr, form: 'factored', display: cf + innerFactored },
            hints: ['Every term is divisible by $' + cf + '$ — pull it out first.', hint],
            solution: [{ text: 'Common factor.', math: M.polyTex(full) + ' = ' + cf + paren(M.polyTex(inner)) }, { text: 'Factor the bracket.', math: '= ' + cf + innerFactored }] };
        } },
      { id: '1.3-g-grouping', title: 'Factor by grouping', desc: 'Four terms: pair them up.',
        make(r) {
          const p = r.nz(-5, 5), q = r.pick([1, 2, 3, 4, 5, 9]), sgn = r.pick([1, -1]);
          // (x + p)(x^2 + sgn*q)
          const coeffs = M.polyMul([1, p], [1, 0, sgn * q]);
          let factored = paren(lin(1, p)) + paren(M.polyTex([1, 0, sgn * q])), factoredS = paren(linS(1, p)) + paren(M.polyStr([1, 0, sgn * q]));
          let extra = '';
          if (sgn < 0 && M.isPerfectSquare(q)) { const s = Math.sqrt(q); factored = paren(lin(1, p)) + paren(lin(1, -s)) + paren(lin(1, s)); factoredS = paren(linS(1, p)) + paren(linS(1, -s)) + paren(linS(1, s)); extra = ' The second bracket is a difference of squares, so factor it too.'; }
          return { prompt: 'Factor $' + M.polyTex(coeffs) + '$ completely.', answer: { type: 'expression', value: factoredS, form: 'factored', display: factored },
            hints: ['Group the first two terms and the last two terms.', 'Factor $x^2$ from the first pair and $' + (sgn * q) + '$ from the second; the same bracket $(' + lin(1, p) + ')$ should appear in both.' + extra],
            solution: [{ text: 'Group and factor each pair.', math: 'x^2' + paren(lin(1, p)) + ' ' + (sgn > 0 ? '+ ' + q : '- ' + q) + paren(lin(1, p)) }, { text: 'Pull out the common bracket' + (extra ? ', then factor the difference of squares' : '') + '.', math: '= ' + factored }] };
        } },
      { id: '1.3-g-radical-products', title: 'Special products with roots and powers', desc: 'The patterns still work when A is a root.',
        make(r) {
          const kind = r.pick(['dos-root', 'dos-root', 'dos-frac', 'distribute']);
          if (kind === 'dos-root') {
            const b = r.int(1, 6);
            // inner is a polynomial in x; the answer is that polynomial with b^2 taken off the constant
            const inner = r.pick([[1, 0], [1, 0], [1, 1], [1, -3], [1, 0, 1]]);
            const innerTex = M.polyTex(inner), innerStr = M.polyStr(inner);
            const ansCoeffs = inner.slice(); ansCoeffs[ansCoeffs.length - 1] -= b * b;
            return { prompt: 'Expand $\\left(\\sqrt{' + innerTex + '} + ' + b + '\\right)\\left(\\sqrt{' + innerTex + '} - ' + b + '\\right)$ (assume the root is defined).',
              answer: { type: 'expression', value: M.polyStr(ansCoeffs), form: 'expanded', vars: ['x'], assume: 'x > 0', display: M.polyTex(ansCoeffs) },
              hints: ['Difference of squares with $A = \\sqrt{' + innerTex + '}$ and $B = ' + b + '$.', 'Squaring a square root removes it: $\\left(\\sqrt{' + innerTex + '}\\right)^2 = ' + innerTex + '$.'],
              solution: [{ math: '\\left(\\sqrt{' + innerTex + '}\\right)^2 - ' + b + '^2 = ' + innerTex + ' - ' + (b * b) + ' = ' + M.polyTex(ansCoeffs), text: 'The middle terms cancel and the square undoes the root.' }] };
          }
          if (kind === 'dos-frac') {
            const [v1, v2] = r.pick([['x', 'y'], ['a', 'b'], ['u', 'v']]);
            return { prompt: 'Expand $\\left(' + v1 + '^{1/2} + ' + v2 + '^{1/2}\\right)\\left(' + v1 + '^{1/2} - ' + v2 + '^{1/2}\\right)$ (assume both are $\\ge 0$).',
              answer: { type: 'expression', value: v1 + ' - ' + v2, form: 'expanded', vars: [v1, v2], assume: v1 + ' > 0', display: v1 + ' - ' + v2 },
              hints: ['Difference of squares.', 'Multiply the exponents: $\\left(' + v1 + '^{1/2}\\right)^2 = ' + v1 + '$.'],
              solution: [{ math: '\\left(' + v1 + '^{1/2}\\right)^2 - \\left(' + v2 + '^{1/2}\\right)^2 = ' + v1 + ' - ' + v2, text: 'Apply $(A+B)(A-B) = A^2 - B^2$.' }] };
          }
          const d = r.pick([2, 3]);
          const outer = r.int(d + 1, 2 * d + 1);        // outer power p/d
          const t1 = r.int(1, 2 * d), t2 = r.int(1, 2 * d);
          if ((outer + t1) % d !== 0 || (outer + t2) % d !== 0 || t1 === t2) return this.make(r);
          const e1 = (outer + t1) / d, e2 = (outer + t2) / d;
          const pw = (n) => n % d === 0 ? (n / d === 1 ? '' : '^{' + (n / d) + '}') : '^{' + n + '/' + d + '}';
          const term = (n, v) => v + pw(n);
          const res = M.polyStr([0, 0]) && (term(e1 * d, 'y').replace('y', 'x') + ' + ' + term(e2 * d, 'y').replace('y', 'x'));
          const value = 'x^' + e1 + ' + x^' + e2;
          return { prompt: 'Expand and simplify $x^{' + outer + '/' + d + '}\\left(x^{' + t1 + '/' + d + '} + x^{' + t2 + '/' + d + '}\\right)$ (assume $x > 0$).',
            answer: { type: 'expression', value, form: 'expanded', vars: ['x'], assume: 'x > 0', display: 'x^{' + e1 + '} + x^{' + e2 + '}' },
            hints: ['Multiply into the bracket — when you multiply powers of the same base you **add** the exponents.', '$\\tfrac{' + outer + '}{' + d + '} + \\tfrac{' + t1 + '}{' + d + '} = ' + e1 + '$ and $\\tfrac{' + outer + '}{' + d + '} + \\tfrac{' + t2 + '}{' + d + '} = ' + e2 + '$.'],
            solution: [{ math: 'x^{' + outer + '/' + d + ' + ' + t1 + '/' + d + '} + x^{' + outer + '/' + d + ' + ' + t2 + '/' + d + '} = x^{' + e1 + '} + x^{' + e2 + '}', text: 'Add the exponents term by term.' }] };
        } },
      { id: '1.3-g-bracket-factor', title: 'Factoring when A is a bracket', desc: 'Common bracket, or a difference of squares of brackets.',
        make(r) {
          const kind = r.pick(['common', 'common', 'dos']);
          const v = r.pick(['x', 'z', 't']);
          const p = r.nz(-5, 5);
          if (kind === 'common') {
            const k = r.nz(-6, 6);
            const inner = M.polyTex([1, p], v), innerS = M.polyStr([1, p], v);
            const second = M.polyTex([1, p + k], v), secondS = M.polyStr([1, p + k], v);
            return { prompt: 'Factor $' + paren(inner) + '^2 ' + (k > 0 ? '+ ' + k : '- ' + (-k)) + paren(inner) + '$ completely.',
              answer: { type: 'expression', value: paren(innerS) + paren(secondS), form: 'factored', vars: [v], display: paren(inner) + paren(second) },
              hints: ['The common factor is the whole bracket $(' + inner + ')$.', 'Taking it out leaves $(' + inner + ') ' + (k > 0 ? '+ ' + k : '- ' + (-k)) + '$.'],
              solution: [{ math: paren(inner) + '\\big[' + inner + ' ' + (k > 0 ? '+ ' + k : '- ' + (-k)) + '\\big] = ' + paren(inner) + paren(second), text: 'Pull out the common bracket and tidy up.' }] };
          }
          const b = r.int(1, 5);
          const inner = M.polyTex([1, p], v);
          const f1 = M.polyTex([1, p - b], v), f2 = M.polyTex([1, p + b], v);
          return { prompt: 'Factor $' + paren(inner) + '^2 - ' + (b * b) + '$ completely.',
            answer: { type: 'expression', value: paren(M.polyStr([1, p - b], v)) + paren(M.polyStr([1, p + b], v)), form: 'factored', vars: [v], display: paren(f1) + paren(f2) },
            hints: ['A difference of squares where $A$ is the bracket $(' + inner + ')$ and $B = ' + b + '$.', '$(A - B)(A + B) = (' + inner + ' - ' + b + ')(' + inner + ' + ' + b + ')$.'],
            solution: [{ math: paren(inner) + '^2 - ' + b + '^2 = ' + paren(f1) + paren(f2), text: 'Difference of squares, then simplify each bracket.' }] };
        } },
      { id: '1.3-g-substitution', title: 'Factor by substitution', desc: 'Let u = the repeated bracket.',
        make(r) {
          const p = r.nz(-5, 5), q = r.nz(-5, 5);
          if (p === q) return this.make(r);
          const inner = r.pick(['a + b', 'x + y', 's + t']);
          const innerS = inner;
          const vars = inner.split(' + ');
          const b = -(p + q), c = p * q;
          if (b === 0) return this.make(r);            // no middle term is not what this skill is about
          // "+ 3(a+b)" but "- (a+b)" when the coefficient is 1
          const mid = (b > 0 ? '+ ' : '- ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + '\\left(' + inner + '\\right)';
          const prompt = '$\\left(' + inner + '\\right)^2 ' + mid + ' ' + M.signed(c) + '$';
          return { prompt: 'Factor ' + prompt + '. (Hint: let $u = ' + inner + '$.)',
            answer: { type: 'expression', value: '(' + innerS + M.signed(-p) + ')(' + innerS + M.signed(-q) + ')', form: 'factored', vars, display: paren(inner + ' ' + M.signed(-p)) + paren(inner + ' ' + M.signed(-q)) },
            hints: ['With $u = ' + inner + '$ the expression becomes $' + M.polyTex([1, b, c], 'u') + '$.', 'Two numbers multiplying to $' + c + '$ and adding to $' + b + '$ are $' + p + '$ and $' + q + '$, so $' + M.polyTex([1, b, c], 'u') + ' = (u ' + M.signed(-p) + ')(u ' + M.signed(-q) + ')$. Now put $' + inner + '$ back.'],
            solution: [{ text: 'Substitute $u = ' + inner + '$ and factor.', math: M.polyTex([1, b, c], 'u') + ' = (u ' + M.signed(-p) + ')(u ' + M.signed(-q) + ')' }, { text: 'Replace $u$ again.', math: paren(inner + ' ' + M.signed(-p)) + paren(inner + ' ' + M.signed(-q)) }] };
        } }
    ]
  });
})();
