/* 2.1 Functions
   Scoped to the midterm-2 worksheet: the definition, evaluating at numbers and at
   expressions, piecewise functions, the difference quotient, and domains. */
(function () {
  const M = CH.M, V = CH.V;
  const paren = s => '(' + s + ')';

  /* the machine picture: input -> rule -> output */
  function machine(input, rule, output) {
    return '<svg viewBox="0 0 340 120" class="viz" role="img" aria-label="A function machine: ' + input + ' goes in, the rule ' + rule + ' is applied, ' + output + ' comes out">' +
      '<defs><marker id="fm-ar" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="var(--muted)"/></marker></defs>' +
      '<text x="18" y="66" font-size="19" fill="var(--text)" font-weight="700">' + input + '</text>' +
      '<line x1="52" y1="60" x2="108" y2="60" stroke="var(--muted)" stroke-width="2" marker-end="url(#fm-ar)"/>' +
      '<rect x="115" y="30" width="110" height="60" rx="12" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>' +
      '<text x="170" y="66" font-size="16" fill="var(--accent-text)" font-weight="700" text-anchor="middle">' + rule + '</text>' +
      '<line x1="232" y1="60" x2="288" y2="60" stroke="var(--muted)" stroke-width="2" marker-end="url(#fm-ar)"/>' +
      '<text x="298" y="66" font-size="19" fill="var(--text)" font-weight="700">' + output + '</text>' +
      '<text x="35" y="96" font-size="11" fill="var(--muted)">input</text>' +
      '<text x="296" y="96" font-size="11" fill="var(--muted)">output</text>' +
      '</svg>';
  }

  CH.registerSection({
    id: '2.1', chapter: 2, exam: 2, title: 'Functions',
    summary: 'What a function is, and how to read $f(x)$. Putting numbers and whole expressions in, piecewise rules, the difference quotient, and working out which inputs are allowed.',

    theory: [
      { short: true, md: 'A **function** is a machine: one number goes in, one number comes out.\n\n- $f(x)$ does **not** mean $f$ times $x$. It means "the output when the input is $x$".\n- To evaluate, **replace every $x$** with whatever is in the brackets. Use brackets when you do it.\n- You can put a letter or a whole expression in, not just a number.\n- A **piecewise** function has different rules for different inputs — check the condition first, then use that rule.\n- The **domain** is the list of inputs you are allowed to use. Only two things are ever banned: dividing by zero, and square-rooting a negative.' },

      { h: 'What a function actually is' },
      'You have been using functions all the way through chapter 1 without the name. "Double it and add three" is a function. So is "square it". The only new thing here is the notation.',
      { def: 'Function', md: 'A **function** $f$ is a rule that takes each input $x$ and gives back **exactly one** output, written $f(x)$.\n\nThe "exactly one" is the whole point. A rule that could give you two different answers for the same input is not a function.' },
      { svg: machine('3', 'double, add 1', '7'), caption: 'The function $f(x) = 2x+1$ with $3$ put in. Same input, same output, every time.' },

      { h: 'Reading the notation' },
      { warn: '$f(x)$ is not $f$ times $x$', md: 'This trips almost everyone up at first. In $f(x)$, the $f$ is the **name of the machine** and the $x$ is **what you put in**. There is no multiplying going on.\n\nSo $f(3)$ means "the output when the input is $3$". It does not mean $f \\times 3$.' },
      'The letter inside the brackets is a placeholder. $f(x) = 2x+1$ and $f(t) = 2t+1$ describe exactly the same machine.',

      { h: 'Putting a number in' },
      { key: 'Replace every $x$, and use brackets', md: 'To work out $f(\\text{something})$, write out the rule and put that something everywhere $x$ appeared — **inside brackets**.\n\nThe brackets are not optional. For $f(x)=x^2$, forgetting them turns $f(-3)$ into $-3^2 = -9$ instead of $(-3)^2 = 9$.' },
      { example: {
        title: 'Evaluating at numbers and letters', label: 'Worked example',
        problem: 'For $f(x) = \\dfrac{1-2x}{3}$, find $f(2)$, $f(-2)$ and $f(a-1)$.',
        steps: [
          { text: 'Put $2$ in place of $x$.', math: 'f(2) = \\frac{1 - 2(2)}{3} = \\frac{1-4}{3} = -1' },
          { text: 'Now $-2$. The brackets matter: $-2(-2) = +4$.', math: 'f(-2) = \\frac{1 - 2(-2)}{3} = \\frac{1+4}{3} = \\frac{5}{3}' },
          { text: 'A letter works exactly the same way. Put $a-1$ in, in brackets.', math: 'f(a-1) = \\frac{1 - 2(a-1)}{3}' },
          { text: 'Expand the top and tidy.', math: '= \\frac{1 - 2a + 2}{3} = \\frac{3 - 2a}{3}' }
        ],
        answer: '$f(2) = -1$, $f(-2) = \\tfrac53$, $f(a-1) = \\dfrac{3-2a}{3}$',
        checklist: ['Write the rule out again.', 'Put the input in everywhere $x$ appeared.', 'Always put it in brackets.', 'Expand and tidy.']
      } },

      { h: 'Putting a whole expression in' },
      { warn: '$f(x+2)$ and $f(x) + f(2)$ are different things', md: 'This is the single most common mistake in this section, and it is worth getting straight now.\n\n- $f(x+2)$ means put $x+2$ **into the machine**.\n- $f(x) + f(2)$ means run the machine twice and **add the two outputs**.\n\nThey almost never come out the same. Try $f(x) = x^2$: $f(x+2) = (x+2)^2 = x^2+4x+4$, but $f(x)+f(2) = x^2 + 4$.' },
      { note: 'Same story for $f(x^2)$ and $(f(x))^2$', md: '$f(x^2)$ puts $x^2$ **in**. $(f(x))^2$ takes the output and **squares it**. For $f(x)=x+4$: $f(x^2) = x^2+4$, but $(f(x))^2 = (x+4)^2 = x^2+8x+16$.' },

      { h: 'Piecewise functions' },
      { key: 'Check the condition first, then use that rule', md: 'A **piecewise** function gives you two or three rules, each with a condition. Only one rule applies to any given input.\n\nSo the order is: look at the input, find which condition it satisfies, then use **that** rule and ignore the others.' },
      { example: {
        title: 'A piecewise function', label: 'Worked example',
        problem: 'Let $f(x) = \\begin{cases} x^2 + 2x & \\text{if } x \\le -1 \\\\ x & \\text{if } -1 < x \\le 1 \\\\ -1 & \\text{if } x > 1 \\end{cases}$  Find $f(-4)$, $f(0)$ and $f(25)$.',
        steps: [
          { text: 'For $f(-4)$: is $-4 \\le -1$? Yes, so use the **first** rule.', math: 'f(-4) = (-4)^2 + 2(-4) = 16 - 8 = 8' },
          { text: 'For $f(0)$: is $0 \\le -1$? No. Is $-1 < 0 \\le 1$? Yes, so use the **second** rule.', math: 'f(0) = 0' },
          { text: 'For $f(25)$: $25 > 1$, so use the **third** rule. That rule ignores the input entirely.', math: 'f(25) = -1' }
        ],
        answer: '$f(-4) = 8$, $f(0) = 0$, $f(25) = -1$',
        checklist: ['Take one input at a time.', 'Work down the conditions until one is true.', 'Use only that rule.', 'Watch $\\le$ versus $<$ at the join points.']
      } },

      { h: 'The difference quotient' },
      'This one looks strange and has no obvious point yet. It is the single most important expression in the whole course, because next year it becomes the derivative. For now it is just careful algebra.',
      { def: 'The difference quotient', md: '$$\\frac{f(a+h) - f(a)}{h}, \\qquad h \\ne 0$$\n\nWork out the two pieces on top separately, subtract them, then cancel the $h$. The $h$ **always** cancels in the end — if it does not, something has gone wrong above.' },
      { example: {
        title: 'A difference quotient', label: 'Worked example',
        problem: 'For $f(x) = 5 - 2x$, find $f(a)$, $f(a+h)$, and then $\\dfrac{f(a+h)-f(a)}{h}$.',
        steps: [
          { text: 'First $f(a)$ — just replace $x$ with $a$.', math: 'f(a) = 5 - 2a' },
          { text: 'Now $f(a+h)$, with $a+h$ in brackets.', math: 'f(a+h) = 5 - 2(a+h) = 5 - 2a - 2h' },
          { text: 'Subtract. Put the whole of $f(a)$ in brackets so every sign flips.', math: '(5 - 2a - 2h) - (5 - 2a) = -2h' },
          { text: 'Divide by $h$ — it cancels.', math: '\\frac{-2h}{h} = -2' }
        ],
        answer: '$-2$',
        checklist: ['Work out $f(a)$ on its own.', 'Work out $f(a+h)$, keeping $a+h$ in brackets.', 'Subtract, bracketing the whole of $f(a)$.', 'Cancel the $h$ — it always goes.']
      } },

      { h: 'Domain: which inputs are allowed' },
      { def: 'Domain', md: 'The **domain** is the set of all inputs the function is allowed to take.\n\nUnless a question says otherwise, the domain is "everything that does not break". And only two things ever break:' },
      { key: 'The only two banned moves', md: '1. **Dividing by zero.** Set any bottom equal to zero and throw those values out.\n2. **Square-rooting a negative.** Set whatever is under an even root to be $\\ge 0$ and solve.\n\nIf a question hands you a restriction like $0 \\le x \\le 2$, that *is* the domain — nothing to work out.' },
      { example: {
        title: 'Three domains', label: 'Worked example',
        problem: 'Find the domain of (a) $f(x) = \\dfrac{1}{x-3}$, (b) $g(x) = \\sqrt{1-2x}$, (c) $h(x) = \\dfrac{x+2}{x^2-1}$.',
        steps: [
          { text: '**(a)** The only danger is the bottom being zero.', math: 'x - 3 = 0 \\Rightarrow x = 3 \\text{ is banned}' },
          { text: 'Everything else is fine.', math: '(-\\infty, 3) \\cup (3, \\infty)' },
          { text: '**(b)** Under a square root, so the inside must be $\\ge 0$.', math: '1 - 2x \\ge 0 \\Rightarrow -2x \\ge -1 \\Rightarrow x \\le \\tfrac12' },
          { text: 'Dividing by $-2$ flipped the sign.', math: '\\left(-\\infty, \\tfrac12\\right]' },
          { text: '**(c)** Factor the bottom and throw out both zeros.', math: 'x^2 - 1 = (x-1)(x+1) \\Rightarrow x \\ne 1, -1' },
          { text: 'That cuts the line into three pieces.', math: '(-\\infty,-1) \\cup (-1,1) \\cup (1,\\infty)' }
        ],
        answer: '(a) $(-\\infty,3)\\cup(3,\\infty)$  (b) $\\left(-\\infty,\\tfrac12\\right]$  (c) $(-\\infty,-1)\\cup(-1,1)\\cup(1,\\infty)$',
        checklist: ['Look for a bottom — set it to zero and ban those values.', 'Look for an even root — set the inside $\\ge 0$ and solve.', 'Flip the sign if you divide by a negative.', 'Write the answer as intervals joined by $\\cup$.']
      } },

      { calm: true, md: 'The notation is the hard part of this section, not the maths. Underneath, every single question is "put this in place of $x$ and tidy up" — which you have been doing since 1.3.\n\nIf $f(a+h)$ looks frightening, try it with a number first. Work out $f(5)$, then $f(5+2)$, and watch what you actually did. Then do the same thing with letters.\n\nAnd if you only remember one warning from this page, make it this: **$f(x+2)$ is not $f(x)+f(2)$.**' },

      { sid: '2.1', title: 'Can I do this?',
        intro: 'Tick these off when you are sure. Nothing here is marked — it is just for you to see what is solid and what still needs another go.',
        checklist: [
          'Say what a function is, and why "exactly one output" matters',
          'Read $f(x)$ as "the output when the input is $x$", not as multiplication',
          'Evaluate $f$ at a number, remembering the brackets',
          'Evaluate $f$ at a letter or a whole expression, like $f(a-1)$ or $f(x+2)$',
          'Explain why $f(x+2)$ is not the same as $f(x)+f(2)$',
          'Pick the right rule in a piecewise function by checking the conditions',
          'Work out a difference quotient and cancel the $h$',
          'Find a domain by banning division by zero and negative square roots'
        ] }
    ],

    examples: [
      { title: 'Evaluating at an expression',
        problem: 'For $f(x) = x^2 + 1$, find $f(x+2)$ and $f(x) + f(2)$, and check they differ.',
        steps: [
          { text: 'For $f(x+2)$, put $x+2$ into the machine — in brackets.', math: 'f(x+2) = (x+2)^2 + 1' },
          { text: 'Expand the bracket.', math: '= x^2 + 4x + 4 + 1 = x^2 + 4x + 5' },
          { text: 'For $f(x)+f(2)$, run the machine twice and add. $f(2) = 2^2+1 = 5$.', math: 'f(x) + f(2) = (x^2+1) + 5 = x^2 + 6' },
          { text: 'They are different — the first has a $4x$ in it. Putting something in is not the same as adding outputs.' }
        ],
        answer: '$f(x+2) = x^2+4x+5$, while $f(x)+f(2) = x^2+6$',
        checklist: ['For $f(\\text{stuff})$, put the stuff in, in brackets.', 'For $f(x)+f(a)$, work out each output and add.', 'Expand carefully.', 'Expect them to be different.'] },

      { title: 'A difference quotient with a fraction',
        problem: 'For $f(x) = \\dfrac{1}{x}$, find $\\dfrac{f(a+h)-f(a)}{h}$.',
        steps: [
          { text: 'Write both pieces.', math: 'f(a+h) = \\frac{1}{a+h}, \\qquad f(a) = \\frac{1}{a}' },
          { text: 'Subtract them over a common bottom of $a(a+h)$.', math: '\\frac{1}{a+h} - \\frac{1}{a} = \\frac{a - (a+h)}{a(a+h)} = \\frac{-h}{a(a+h)}' },
          { text: 'Now divide by $h$, which means multiply by $\\tfrac1h$.', math: '\\frac{-h}{a(a+h)}\\cdot\\frac{1}{h}' },
          { text: 'The $h$ cancels, as it always does.', math: '= \\frac{-1}{a(a+h)}' }
        ],
        answer: '$-\\dfrac{1}{a(a+h)}$',
        checklist: ['Write $f(a+h)$ and $f(a)$ separately.', 'Combine the top over a common bottom.', 'Dividing by $h$ is multiplying by $\\tfrac1h$.', 'The $h$ must cancel — if it does not, check the subtraction.'] },

      { title: 'A domain with a root and a bottom',
        problem: 'Find the domain of $k(x) = \\dfrac{\\sqrt{x+3}}{x-1}$.',
        steps: [
          { text: 'There are two things to check here, not one. Start with the root.', math: 'x + 3 \\ge 0 \\Rightarrow x \\ge -3' },
          { text: 'Now the bottom, which must not be zero.', math: 'x - 1 \\ne 0 \\Rightarrow x \\ne 1' },
          { text: 'Both conditions have to hold at once: start at $-3$ and go up, but punch out $1$.' },
          { text: 'Write it as intervals.', math: '[-3, 1) \\cup (1, \\infty)' }
        ],
        answer: '$[-3,1) \\cup (1,\\infty)$',
        checklist: ['Find every root and every bottom.', 'Root: inside $\\ge 0$. Bottom: not zero.', 'Both conditions must hold together.', 'Punch the banned values out of the interval.'] }
    ],

    exercises: [
      { id: '2.1-e1', prompt: 'For $f(x) = 3x - 5$, find $f(4)$.',
        answer: { type: 'number', value: 7 },
        hints: ['Put $4$ wherever $x$ appears.'],
        solution: [{ text: 'Substitute.', math: 'f(4) = 3(4) - 5 = 7' }] },

      { id: '2.1-e2', prompt: 'For $f(x) = x^2 + 2x$, find $f(-3)$.',
        answer: { type: 'number', value: 3 },
        hints: ['Put $-3$ in, **in brackets** — that matters for the square.', '$(-3)^2 = 9$, not $-9$.'],
        solution: [{ text: 'Substitute with brackets.', math: 'f(-3) = (-3)^2 + 2(-3) = 9 - 6 = 3' }] },

      { id: '2.1-e3', prompt: 'For $f(x) = \\dfrac{1-2x}{3}$, find $f\\left(\\tfrac12\\right)$.',
        answer: { type: 'number', value: 0 },
        hints: ['Put $\\tfrac12$ in place of $x$.', '$2 \\times \\tfrac12 = 1$, so the top becomes $1-1$.'],
        solution: [{ text: 'Substitute.', math: 'f\\left(\\tfrac12\\right) = \\frac{1 - 2\\left(\\tfrac12\\right)}{3} = \\frac{0}{3} = 0' }] },

      { id: '2.1-e4', prompt: 'For $f(x) = x^2 + 2x$, find $f(a)$. Give your answer in terms of $a$.',
        answer: { type: 'expression', value: 'a^2 + 2*a', vars: ['a'] },
        hints: ['A letter goes in exactly like a number would.', 'Replace every $x$ with $a$.'],
        solution: [{ text: 'Substitute $a$ for $x$.', math: 'f(a) = a^2 + 2a' }] },

      { id: '2.1-e5', prompt: 'For $f(x) = x^2 + 2x$, find $f(-x)$. Give your answer in terms of $x$.',
        answer: { type: 'expression', value: 'x^2 - 2*x', vars: ['x'] },
        hints: ['Put $-x$ in, in brackets, everywhere $x$ appeared.', '$(-x)^2 = x^2$ because squaring kills the minus, but $2(-x) = -2x$.'],
        solution: [{ text: 'Substitute $-x$ with brackets.', math: 'f(-x) = (-x)^2 + 2(-x)' },
          { text: 'Simplify each part.', math: '= x^2 - 2x' }] },

      { id: '2.1-e6', prompt: 'For $f(x) = \\dfrac{1-2x}{3}$, find $f(a-1)$. Give your answer in terms of $a$.',
        answer: { type: 'expression', value: '(3 - 2*a)/3', vars: ['a'] },
        hints: ['Put $a-1$ in, in brackets: $\\dfrac{1-2(a-1)}{3}$.', 'Expand the top: $-2(a-1) = -2a+2$.'],
        solution: [{ text: 'Substitute in brackets.', math: 'f(a-1) = \\frac{1 - 2(a-1)}{3}' },
          { text: 'Expand and collect the top.', math: '= \\frac{1 - 2a + 2}{3} = \\frac{3-2a}{3}' }] },

      { id: '2.1-e7', prompt: 'For $g(x) = \\dfrac{1-x}{1+x}$, find $g(2)$.',
        answer: { type: 'number', value: -1 / 3 },
        hints: ['Put $2$ in on the top and on the bottom.', 'Top: $1-2 = -1$. Bottom: $1+2 = 3$.'],
        solution: [{ text: 'Substitute.', math: 'g(2) = \\frac{1-2}{1+2} = -\\frac13' }] },

      { id: '2.1-e8', prompt: 'For $f(x) = x^2 + 1$, find $f(x+2)$. Give your answer expanded.',
        answer: { type: 'expression', value: 'x^2 + 4*x + 5', vars: ['x'], form: 'expanded' },
        hints: ['Put $x+2$ into the machine, in brackets: $(x+2)^2 + 1$.', 'Expand $(x+2)^2 = x^2+4x+4$, then add the $1$.'],
        solution: [{ text: 'Substitute in brackets.', math: 'f(x+2) = (x+2)^2 + 1' },
          { text: 'Expand and collect.', math: '= x^2 + 4x + 4 + 1 = x^2+4x+5' }] },

      { id: '2.1-e9', prompt: 'For $f(x) = x^2 + 1$, find $f(x) + f(2)$. Give your answer in terms of $x$.',
        answer: { type: 'expression', value: 'x^2 + 6', vars: ['x'] },
        hints: ['This is **not** $f(x+2)$. Work out each output separately, then add.', '$f(2) = 2^2+1 = 5$, and $f(x) = x^2+1$.'],
        solution: [{ text: 'Work out $f(2)$.', math: 'f(2) = 2^2 + 1 = 5' },
          { text: 'Add the two outputs.', math: 'f(x) + f(2) = (x^2+1) + 5 = x^2 + 6' },
          { text: 'Compare with $f(x+2) = x^2+4x+5$ — genuinely different.' }] },

      { id: '2.1-e10', prompt: 'For $f(x) = x + 4$, find $(f(x))^2$. Give your answer expanded.',
        answer: { type: 'expression', value: 'x^2 + 8*x + 16', vars: ['x'], form: 'expanded' },
        hints: ['This means take the output and square it: $(x+4)^2$.', 'Expand using the perfect-square pattern.'],
        solution: [{ text: 'Square the whole output.', math: '(f(x))^2 = (x+4)^2' },
          { text: 'Expand.', math: '= x^2 + 8x + 16' },
          { text: 'Note $f(x^2) = x^2+4$ instead — putting in is not the same as squaring the output.' }] },

      { id: '2.1-e11', prompt: 'Let $f(x) = \\begin{cases} x^2 + 2x & \\text{if } x \\le -1 \\\\ x & \\text{if } -1 < x \\le 1 \\\\ -1 & \\text{if } x > 1 \\end{cases}$  Find $f(-4)$.',
        answer: { type: 'number', value: 8 },
        hints: ['Which condition does $-4$ satisfy?', '$-4 \\le -1$, so use the first rule, $x^2+2x$.'],
        solution: [{ text: '$-4 \\le -1$, so the first rule applies.', math: 'f(-4) = (-4)^2 + 2(-4) = 16 - 8 = 8' }] },

      { id: '2.1-e12', prompt: 'With the same piecewise $f$ as above, find $f\\left(-\\tfrac32\\right)$.',
        answer: { type: 'number', value: -0.75 },
        hints: ['Is $-\\tfrac32 \\le -1$? Yes — $-1.5$ is to the left of $-1$.', 'So use $x^2+2x$ with $x = -1.5$.'],
        solution: [{ text: '$-\\tfrac32 \\le -1$, so use the first rule.', math: 'f\\left(-\\tfrac32\\right) = \\left(-\\tfrac32\\right)^2 + 2\\left(-\\tfrac32\\right)' },
          { text: 'Work it out.', math: '= \\tfrac94 - 3 = -\\tfrac34' }] },

      { id: '2.1-e13', prompt: 'For $f(x) = 5 - 2x$, find $\\dfrac{f(a+h)-f(a)}{h}$ (with $h \\ne 0$).',
        answer: { type: 'number', value: -2 },
        hints: ['Work out $f(a+h)$ first, keeping $a+h$ in brackets.', '$f(a+h) = 5-2(a+h) = 5-2a-2h$, and $f(a) = 5-2a$.', 'Subtracting leaves just $-2h$. Now divide by $h$.'],
        solution: [{ text: 'The two pieces.', math: 'f(a+h) = 5-2a-2h, \\qquad f(a) = 5-2a' },
          { text: 'Subtract, bracketing $f(a)$.', math: '(5-2a-2h) - (5-2a) = -2h' },
          { text: 'Divide by $h$.', math: '\\frac{-2h}{h} = -2' }] },

      { id: '2.1-e14', prompt: 'Find the domain of $f(x) = \\dfrac{1}{x-3}$.',
        answer: { type: 'interval', value: '(-inf, 3) U (3, inf)', vars: ['x'] },
        hints: ['The only thing that can break is the bottom being zero.', 'Set $x-3=0$ to find the banned value.'],
        solution: [{ text: 'Ban the value that makes the bottom zero.', math: 'x - 3 = 0 \\Rightarrow x = 3' },
          { text: 'Everything else is allowed.', math: '(-\\infty,3) \\cup (3,\\infty)' }] },

      { id: '2.1-e15', prompt: 'Find the domain of $f(x) = \\sqrt{1-2x}$.',
        answer: { type: 'interval', value: '(-inf, 1/2]', vars: ['x'] },
        hints: ['Under a square root, the inside must be $\\ge 0$.', 'Solve $1-2x \\ge 0$.', 'Dividing by $-2$ **flips** the inequality sign.'],
        solution: [{ text: 'The inside must not be negative.', math: '1 - 2x \\ge 0' },
          { text: 'Solve, flipping the sign when dividing by $-2$.', math: '-2x \\ge -1 \\Rightarrow x \\le \\tfrac12' },
          { text: 'As an interval, including the endpoint.', math: '\\left(-\\infty, \\tfrac12\\right]' }] },

      { id: '2.1-e16', prompt: 'Find the domain of $f(x) = \\dfrac{x+2}{x^2-1}$.',
        answer: { type: 'interval', value: '(-inf,-1) U (-1,1) U (1,inf)', vars: ['x'] },
        hints: ['Factor the bottom first.', '$x^2-1 = (x-1)(x+1)$, so two values are banned.', 'That cuts the number line into three pieces.'],
        solution: [{ text: 'Factor and set the bottom to zero.', math: 'x^2 - 1 = (x-1)(x+1) = 0 \\Rightarrow x = 1, -1' },
          { text: 'Remove both from the line.', math: '(-\\infty,-1) \\cup (-1,1) \\cup (1,\\infty)' }] }
    ],

    generators: [
      { id: '2.1-g-eval', title: 'Evaluate at a number', desc: 'Substitute, minding the brackets.',
        make(r) {
          const a = r.nz(-4, 5), b = r.nz(-9, 9), x = r.nz(-5, 5);
          const val = a * x * x + b * x;
          return {
            prompt: 'For $f(x) = ' + M.polyTex([a, b, 0]) + '$, find $f(' + x + ')$.',
            answer: { type: 'number', value: val },
            hints: ['Put $' + x + '$ in wherever $x$ appears — in brackets.',
              x < 0 ? 'Careful: $(' + x + ')^2 = ' + (x * x) + '$, a positive number.' : 'Work out the square first, then the rest.'],
            solution: [{ text: 'Substitute with brackets.', math: 'f(' + x + ') = ' + (a === 1 ? '' : a === -1 ? '-' : a) + '(' + x + ')^2 ' + (b < 0 ? '-' : '+') + ' ' + (Math.abs(b) === 1 ? '' : Math.abs(b)) + '(' + x + ')' },
              { text: 'Work it out.', math: '= ' + (a * x * x) + ' ' + (b * x < 0 ? '-' : '+') + ' ' + Math.abs(b * x) + ' = ' + val }]
          };
        } },

      { id: '2.1-g-eval-expr', title: 'Evaluate at an expression', desc: 'Put a whole bracket into the machine.',
        make(r) {
          const m = r.nz(-5, 5), c = r.nz(-9, 9), k = r.nz(-5, 5);
          // f(x) = m x + c, find f(x + k) = m x + m k + c
          return {
            prompt: 'For $f(x) = ' + M.polyTex([m, c]) + '$, find $f(x ' + (k < 0 ? '-' : '+') + ' ' + Math.abs(k) + ')$. Give your answer in terms of $x$.',
            answer: { type: 'expression', value: '(' + m + ')*x + (' + (m * k + c) + ')', vars: ['x'] },
            hints: ['Put the whole bracket $x ' + (k < 0 ? '-' : '+') + ' ' + Math.abs(k) + '$ in wherever $x$ appeared.',
              'That gives $' + m + '(x ' + (k < 0 ? '-' : '+') + ' ' + Math.abs(k) + ') ' + (c < 0 ? '-' : '+') + ' ' + Math.abs(c) + '$. Now expand.'],
            solution: [{ text: 'Substitute the bracket.', math: 'f(x ' + (k < 0 ? '-' : '+') + ' ' + Math.abs(k) + ') = ' + m + '(x ' + (k < 0 ? '-' : '+') + ' ' + Math.abs(k) + ')' + (c < 0 ? ' - ' : ' + ') + Math.abs(c) },
              { text: 'Expand and collect.', math: '= ' + M.polyTex([m, m * k + c]) }]
          };
        } },

      { id: '2.1-g-piecewise', title: 'Piecewise functions', desc: 'Check the condition, then use that rule.',
        make(r) {
          const cut = r.nz(-3, 3);
          const a = r.nz(-4, 4), b = r.nz(-6, 6), c = r.nz(-6, 6);
          const below = r.bool(0.5);
          const x = below ? cut - r.int(1, 4) : cut + r.int(1, 4);
          const val = below ? a * x + b : c;
          return {
            prompt: 'Let $f(x) = \\begin{cases} ' + M.polyTex([a, b]) + ' & \\text{if } x \\le ' + cut + ' \\\\ ' + c + ' & \\text{if } x > ' + cut + ' \\end{cases}$  Find $f(' + x + ')$.',
            answer: { type: 'number', value: val },
            hints: ['Compare $' + x + '$ with $' + cut + '$ to see which rule applies.',
              below ? '$' + x + ' \\le ' + cut + '$, so use the first rule.' : '$' + x + ' > ' + cut + '$, so use the second rule — which ignores the input entirely.'],
            solution: [{ text: below ? 'Is $' + x + ' \\le ' + cut + '$? Yes — so the **first** rule applies.' : 'Is $' + x + ' \\le ' + cut + '$? No, $' + x + ' > ' + cut + '$ — so the **second** rule applies.' },
              below ? { text: 'Put $' + x + '$ into that rule, in brackets.', math: 'f(' + x + ') = ' + (a === 1 ? '' : a === -1 ? '-' : a) + '(' + x + ') ' + M.signed(b) + ' = ' + (a * x) + ' ' + M.signed(b) + ' = ' + val }
                : { text: 'That rule is just the number $' + c + '$ — it ignores the input completely.', math: 'f(' + x + ') = ' + val }]
          };
        } },

      { id: '2.1-g-diffquot', title: 'The difference quotient', desc: 'Build it, then cancel the $h$.',
        make(r) {
          const m = r.nz(-6, 6), c = r.nz(-9, 9);
          return {
            prompt: 'For $f(x) = ' + M.polyTex([m, c]) + '$, find $\\dfrac{f(a+h) - f(a)}{h}$, where $h \\ne 0$.',
            answer: { type: 'number', value: m },
            hints: ['Work out $f(a+h)$ first, keeping $a+h$ in brackets.',
              '$f(a+h) = ' + (m === 1 ? '' : m === -1 ? '-' : m) + '(a+h) ' + M.signed(c) + '$, and $f(a) = ' + M.term(m, 'a') + ' ' + M.signed(c) + '$.',
              'Subtracting leaves $' + M.term(m, 'h') + '$. Now divide by $h$.'],
            solution: [{ text: 'The two pieces. Multiply the bracket out in the first.', math: 'f(a+h) = ' + M.term(m, 'a') + M.term(m, 'h', false) + ' ' + M.signed(c) + ', \\qquad f(a) = ' + M.term(m, 'a') + ' ' + M.signed(c) },
              { text: 'Subtract — the $a$ terms cancel and so do the numbers, leaving only the $h$ term.', math: 'f(a+h) - f(a) = ' + M.term(m, 'h') },
              { text: 'Divide by $h$.', math: '\\frac{' + M.term(m, 'h') + '}{h} = ' + m }]
          };
        } },

      { id: '2.1-g-domain-frac', title: 'Domain of a fraction', desc: 'Ban whatever makes the bottom zero.',
        make(r) {
          const p = r.nz(-6, 6), q = r.nz(-6, 6);
          if (p === q) return this.make(r);
          const lo = Math.min(-p, -q), hi = Math.max(-p, -q);
          return {
            prompt: 'Find the domain of $f(x) = \\dfrac{x + 1}{(x ' + (p < 0 ? '-' : '+') + ' ' + Math.abs(p) + ')(x ' + (q < 0 ? '-' : '+') + ' ' + Math.abs(q) + ')}$.',
            answer: { type: 'interval', value: '(-inf,' + lo + ') U (' + lo + ',' + hi + ') U (' + hi + ',inf)', vars: ['x'] },
            hints: ['The only danger is the bottom being zero. It is already factored.',
              'Set each bracket to zero: $x = ' + (-p) + '$ and $x = ' + (-q) + '$.',
              'Those two banned values cut the line into three pieces.'],
            solution: [{ text: 'Set each factor to zero.', math: 'x = ' + (-p) + ' \\quad\\text{and}\\quad x = ' + (-q) },
              { text: 'Remove both from the number line.', math: '(-\\infty, ' + lo + ') \\cup (' + lo + ', ' + hi + ') \\cup (' + hi + ', \\infty)' }]
          };
        } },

      { id: '2.1-g-domain-root', title: 'Domain of a square root', desc: 'The inside must not be negative.',
        make(r) {
          const m = r.nz(-5, 5), c = r.nz(-9, 9);
          // m x + c >= 0  ->  x >= -c/m  (flip if m < 0)
          const bound = -c / m;
          const nice = Math.abs(bound * 2 - Math.round(bound * 2)) < 1e-9 ? bound : null;
          if (nice === null) return this.make(r);
          const txt = Number.isInteger(bound) ? String(bound) : (bound * 2) + '/2';
          return {
            prompt: 'Find the domain of $f(x) = \\sqrt{' + M.polyTex([m, c]) + '}$.',
            answer: { type: 'interval', value: m > 0 ? '[' + txt + ', inf)' : '(-inf, ' + txt + ']', vars: ['x'] },
            hints: ['Under a square root, whatever is inside must be $\\ge 0$.',
              'So solve $' + M.polyTex([m, c]) + ' \\ge 0$.',
              m < 0 ? 'You will divide by a negative, so remember to **flip** the inequality sign.' : 'Dividing by a positive, so the sign stays as it is.'],
            solution: [{ text: 'The inside must not be negative.', math: M.polyTex([m, c]) + ' \\ge 0' },
              { text: 'Move the number across.', math: M.term(m, 'x') + ' \\ge ' + (-c) },
              { text: m === 1 ? 'That is already $x$ on its own.' : m < 0 ? 'Divide by $' + m + '$. It is negative, so the sign **flips**.' : 'Divide by $' + m + '$. It is positive, so the sign stays.', math: 'x ' + (m > 0 ? '\\ge ' : '\\le ') + M.fracTex(-c, m) },
              { text: 'Write it as an interval. The endpoint is allowed (the root of $0$ is fine), so use a square bracket.', math: m > 0 ? '\\left[' + M.fracTex(-c, m) + ', \\infty\\right)' : '\\left(-\\infty, ' + M.fracTex(-c, m) + '\\right]' }]
          };
        } }
    ]
  });
})();
