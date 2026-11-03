/* 1.12 Modeling Variation
   Stewart 7e §1.12: direct variation, inverse variation, and joint/combined.
   Not on either midterm, so no `exam` field. */
(function () {
  const M = CH.M, V = CH.V;

  CH.registerSection({
    id: '1.12', chapter: 1, title: 'Modeling Variation',
    summary: 'Writing "one thing depends on another" as an equation. Direct variation (both grow together), inverse variation (one grows as the other shrinks), and finding the constant from a single known pair.',

    theory: [
      { short: true, md: 'Variation is a short way of saying **how two quantities are linked**.\n\n- **Direct**: $y = kx$. Double $x$ and $y$ doubles too.\n- **Inverse**: $y = \\dfrac{k}{x}$. Double $x$ and $y$ **halves**.\n- **Joint**: $y$ depends on two things at once, like $y = kxz$.\n- $k$ is the **constant of proportionality**. Every question gives you one matching pair so you can find it.\n- The method is always the same: write the shape, find $k$, then use it.' },

      { h: 'The three-step method' },
      { key: 'Shape, then $k$, then answer', md: '1. **Write the shape** from the words, with $k$ in it.\n2. **Find $k$** by substituting the pair of values you are given.\n3. **Rewrite** the equation with that $k$ filled in, and use it to answer the question.\n\nEvery variation question on any paper is these three steps. The only thing that changes is the shape in step 1.' },

      { h: 'Direct variation' },
      { def: 'Direct variation', md: '"$y$ varies directly as $x$", or "$y$ is proportional to $x$", means\n\n$$y = kx$$\n\nfor some fixed number $k$. The two rise and fall together: double $x$ and $y$ doubles.' },
      { note: 'It is just a line through the origin', md: '$y = kx$ is the straight line from 1.10 with gradient $k$ and intercept $0$. So "varies directly" is another way of saying "straight line through the origin", and $k$ is its slope.' },
      { example: {
        title: 'Direct variation', label: 'Worked example',
        problem: '$y$ varies directly as $x$, and $y = 12$ when $x = 3$. Find $y$ when $x = 7$.',
        steps: [
          { text: '**Shape.** Direct variation means $y = kx$.' },
          { text: '**Find $k$** by substituting the pair you were given.', math: '12 = k(3) \\Rightarrow k = 4' },
          { text: '**Rewrite** with $k$ filled in.', math: 'y = 4x' },
          { text: 'Now answer the question.', math: 'x = 7 \\Rightarrow y = 28' }
        ],
        answer: '$y = 28$',
        checklist: ['Write $y = kx$.', 'Substitute the given pair to find $k$.', 'Rewrite the equation with $k$ in it.', 'Substitute the new value.']
      } },

      { h: 'Inverse variation' },
      { def: 'Inverse variation', md: '"$y$ varies inversely as $x$" means\n\n$$y = \\frac{k}{x}$$\n\nNow they pull against each other: double $x$ and $y$ **halves**. The bigger one gets, the smaller the other.' },
      { tip: 'Which one is it?', md: 'Read the situation and ask: as one goes up, does the other go up or down?\n\n- More hours worked, more pay → **direct**.\n- More people sharing a cake, smaller slice each → **inverse**.\n- Faster speed, less time for a fixed journey → **inverse**.\n\nGetting this right is most of the question; the algebra afterwards is short.' },
      { example: {
        title: 'Inverse variation', label: 'Worked example',
        problem: '$y$ varies inversely as $x$, and $y = 5$ when $x = 4$. Find $y$ when $x = 10$.',
        steps: [
          { text: '**Shape.** Inverse variation means $y = \\dfrac{k}{x}$.' },
          { text: '**Find $k$.** Multiply up rather than dividing — it is easier.', math: '5 = \\frac{k}{4} \\Rightarrow k = 20' },
          { text: '**Rewrite.**', math: 'y = \\frac{20}{x}' },
          { text: 'Answer the question.', math: 'x = 10 \\Rightarrow y = 2' },
          { text: 'Sensible check: $x$ went up, so $y$ came down. ✓' }
        ],
        answer: '$y = 2$',
        checklist: ['Write $y = k/x$.', 'Substitute and multiply up to find $k$.', 'Rewrite with $k$ in place.', 'Check the answer moved the opposite way.']
      } },

      { h: 'Powers, and more than one variable' },
      { key: 'The words tell you the shape', md: 'The phrase maps straight onto the formula:\n\n| The words | The equation |\n|---|---|\n| $y$ varies directly as $x$ | $y = kx$ |\n| $y$ varies inversely as $x$ | $y = \\dfrac{k}{x}$ |\n| $y$ varies directly as $x^2$ | $y = kx^2$ |\n| $y$ varies inversely as $x^2$ | $y = \\dfrac{k}{x^2}$ |\n| $y$ varies jointly as $x$ and $z$ | $y = kxz$ |\n| $y$ varies directly as $x$ and inversely as $z$ | $y = \\dfrac{kx}{z}$ |\n\n"Directly" puts it on **top**; "inversely" puts it on the **bottom**.' },
      { example: {
        title: 'Two variables at once', label: 'Worked example',
        problem: '$z$ varies directly as $x$ and inversely as $y$. When $x=6$ and $y=2$, $z=9$. Find $z$ when $x=4$ and $y=3$.',
        steps: [
          { text: '**Shape.** Directly as $x$ puts it on top; inversely as $y$ puts it on the bottom.', math: 'z = \\frac{kx}{y}' },
          { text: '**Find $k$** using all three given values.', math: '9 = \\frac{k(6)}{2} = 3k \\Rightarrow k = 3' },
          { text: '**Rewrite.**', math: 'z = \\frac{3x}{y}' },
          { text: 'Answer the question.', math: 'z = \\frac{3(4)}{3} = 4' }
        ],
        answer: '$z = 4$',
        checklist: ['Put "directly" quantities on top, "inversely" on the bottom.', 'Substitute every given value to find $k$.', 'Rewrite with $k$ in place.', 'Substitute the new values.']
      } },

      { calm: true, md: 'This is one of the most mechanical sections in the book, which is good news. There is no decision to agonise over once you know the shape: substitute, find $k$, substitute again.\n\nThe only genuine thinking is step 1 — top or bottom. One question settles it: **as one goes up, does the other go up or down?** Up together means directly, on top. Opposite ways means inversely, on the bottom.\n\nIf you are unsure, test your finished equation with the numbers you were given. If it does not reproduce them, the shape is wrong, and you will catch it before it costs anything.' },

      { sid: '1.12', title: 'Can I do this?',
        intro: 'Tick these off when you are sure. Nothing here is marked — it is just for you to see what is solid and what still needs another go.',
        checklist: [
          'Write $y = kx$ for direct variation',
          'Write $y = k/x$ for inverse variation',
          'Decide which one a worded situation describes',
          'Find $k$ by substituting the given pair',
          'Use the finished equation to answer the question',
          'Handle a power, like varies directly as $x^2$',
          'Handle two variables at once, with one on top and one on the bottom',
          'Check the answer moved in the direction you would expect'
        ] }
    ],

    examples: [
      { title: 'Variation with a square',
        problem: '$y$ varies directly as the square of $x$. When $x = 3$, $y = 45$. Find $y$ when $x = 2$.',
        steps: [
          { text: '**Shape.** "Directly as the square of $x$" puts $x^2$ on the top.', math: 'y = kx^2' },
          { text: '**Find $k$.** Work out the square first.', math: '45 = k(3)^2 = 9k \\Rightarrow k = 5' },
          { text: '**Rewrite.**', math: 'y = 5x^2' },
          { text: 'Answer the question.', math: 'y = 5(2)^2 = 20' }
        ],
        answer: '$y = 20$',
        checklist: ['Square goes with the variable, not with $k$.', 'Work out the power before dividing.', 'Rewrite with $k$ filled in.', 'Substitute the new value.'] },

      { title: 'Spotting which kind it is',
        problem: 'Four people share a cake and each gets $200$ g. If ten people share the same cake, how much does each get?',
        steps: [
          { text: 'As the number of people goes **up**, the share goes **down** — so this is inverse variation.', math: 's = \\frac{k}{n}' },
          { text: 'Find $k$ from the pair given.', math: '200 = \\frac{k}{4} \\Rightarrow k = 800' },
          { text: '$k$ is the whole cake, $800$ g — which is a nice check that the shape is right.', math: 's = \\frac{800}{n}' },
          { text: 'Now answer.', math: 's = \\frac{800}{10} = 80 \\text{ g}' }
        ],
        answer: '$80$ g each',
        checklist: ['Ask which way the second quantity moves.', 'Opposite directions means inverse.', 'Find $k$ and see whether it means something.', 'Substitute the new value.'] }
    ],

    exercises: [
      { id: '1.12-e1', prompt: '$y$ varies directly as $x$, and $y = 12$ when $x = 3$. Find the constant $k$.',
        answer: { type: 'number', value: 4 },
        hints: ['Direct variation means $y = kx$.', 'Substitute: $12 = k(3)$.'],
        solution: [{ text: 'Substitute into $y = kx$.', math: '12 = 3k \\Rightarrow k = 4' }] },

      { id: '1.12-e2', prompt: 'With that same relationship, find $y$ when $x = 7$.',
        answer: { type: 'number', value: 28 },
        hints: ['You found $k = 4$, so the equation is $y = 4x$.', 'Substitute $x = 7$.'],
        solution: [{ text: 'Use the finished equation.', math: 'y = 4(7) = 28' }] },

      { id: '1.12-e3', prompt: '$y$ varies inversely as $x$, and $y = 5$ when $x = 4$. Find the constant $k$.',
        answer: { type: 'number', value: 20 },
        hints: ['Inverse variation means $y = k/x$.', 'Substitute: $5 = k/4$, then multiply up.'],
        solution: [{ text: 'Substitute and multiply up.', math: '5 = \\frac{k}{4} \\Rightarrow k = 20' }] },

      { id: '1.12-e4', prompt: 'With that same relationship, find $y$ when $x = 10$.',
        answer: { type: 'number', value: 2 },
        hints: ['The equation is $y = 20/x$.', 'Substitute $x = 10$.'],
        solution: [{ text: 'Use the finished equation.', math: 'y = \\frac{20}{10} = 2' },
          { text: '$x$ went up and $y$ came down, as inverse variation should.' }] },

      { id: '1.12-e5', prompt: '$y$ varies directly as the square of $x$. When $x=3$, $y=45$. Find $k$.',
        answer: { type: 'number', value: 5 },
        hints: ['The shape is $y = kx^2$.', 'Substitute: $45 = k(9)$.'],
        solution: [{ text: 'Substitute, squaring first.', math: '45 = 9k \\Rightarrow k = 5' }] },

      { id: '1.12-e6', prompt: 'With $y = 5x^2$, find $y$ when $x = 2$.',
        answer: { type: 'number', value: 20 },
        hints: ['Square the $2$ first, then multiply by $5$.'],
        solution: [{ text: 'Substitute.', math: 'y = 5(4) = 20' }] },

      { id: '1.12-e7', prompt: 'Four people share a cake and get $200$ g each. If ten people share it, how many grams does each get?',
        answer: { type: 'number', value: 80 },
        hints: ['More people means a smaller share, so this is inverse variation: $s = k/n$.', '$200 = k/4$ gives $k = 800$ — the whole cake.', 'Now divide by $10$.'],
        solution: [{ text: 'Find the constant.', math: '200 = \\frac{k}{4} \\Rightarrow k = 800' },
          { text: 'Share it among ten.', math: 's = \\frac{800}{10} = 80' }] },

      { id: '1.12-e8', prompt: '$z$ varies directly as $x$ and inversely as $y$. When $x=6$ and $y=2$, $z=9$. Find $k$.',
        answer: { type: 'number', value: 3 },
        hints: ['The shape is $z = \\dfrac{kx}{y}$.', 'Substitute all three: $9 = \\dfrac{6k}{2} = 3k$.'],
        solution: [{ text: 'Substitute every given value.', math: '9 = \\frac{6k}{2} = 3k \\Rightarrow k = 3' }] },

      { id: '1.12-e9', prompt: 'With $z = \\dfrac{3x}{y}$, find $z$ when $x = 4$ and $y = 3$.',
        answer: { type: 'number', value: 4 },
        hints: ['Substitute both values.', '$\\dfrac{3(4)}{3}$.'],
        solution: [{ text: 'Substitute.', math: 'z = \\frac{12}{3} = 4' }] },

      { id: '1.12-e10', prompt: 'If $y$ varies directly as $x$ and $x$ is doubled, what happens to $y$?',
        answer: { type: 'choice', value: 'double', options: [{ id: 'double', label: 'It doubles' }, { id: 'half', label: 'It halves' }, { id: 'same', label: 'It stays the same' }], wrongMessage: 'Not quite — try it with $y = 2x$ and a number.' },
        hints: ['Try it with a concrete equation, say $y = 3x$, and $x = 1$ then $x = 2$.', 'Direct variation means the two move together.'],
        solution: [{ text: 'With $y = kx$, replacing $x$ by $2x$ gives $2kx$.' },
          { text: 'So $y$ doubles as well.' }] },

      { id: '1.12-e11', prompt: 'If $y$ varies inversely as $x$ and $x$ is doubled, what happens to $y$?',
        answer: { type: 'choice', value: 'half', options: [{ id: 'double', label: 'It doubles' }, { id: 'half', label: 'It halves' }, { id: 'same', label: 'It stays the same' }], wrongMessage: 'Not quite — try it with $y = 12/x$ and a number.' },
        hints: ['Try $y = 12/x$ with $x=2$ then $x=4$.', 'Inverse variation means they move in opposite directions.'],
        solution: [{ text: 'With $y = k/x$, replacing $x$ by $2x$ gives $\\dfrac{k}{2x}$.' },
          { text: 'That is half of what it was.' }] },

      { id: '1.12-e12', prompt: 'A car travels a fixed distance. Does the time taken vary directly or inversely with the speed?',
        answer: { type: 'choice', value: 'inverse', options: [{ id: 'direct', label: 'Directly' }, { id: 'inverse', label: 'Inversely' }], wrongMessage: 'Not quite — if you drive faster, does the journey take more time or less?' },
        hints: ['If you drive faster, does the journey take longer or shorter?', 'Faster means less time, so they move in opposite directions.'],
        solution: [{ text: 'From $d = rt$ with $d$ fixed, $t = \\dfrac{d}{r}$.' },
          { text: 'The speed is on the bottom, so the time varies inversely with it.' }] }
    ],

    generators: [
      { id: '1.12-g-direct', title: 'Direct variation', desc: 'Find $k$, then the new value.',
        make(r) {
          const k = r.int(2, 9), x1 = r.int(2, 9), x2 = r.int(2, 12);
          if (x2 === x1) return this.make(r);    // "find y when x = 3" given y at x = 3 is no question at all
          const y1 = k * x1;
          const askK = r.bool(0.4);
          return {
            prompt: '$y$ varies directly as $x$, and $y = ' + y1 + '$ when $x = ' + x1 + '$. ' + (askK ? 'Find the constant $k$.' : 'Find $y$ when $x = ' + x2 + '$.'),
            answer: { type: 'number', value: askK ? k : k * x2 },
            hints: ['Direct variation means $y = kx$.',
              'Substitute the given pair: $' + y1 + ' = k(' + x1 + ')$, so $k = ' + k + '$.',
              askK ? 'That is the answer.' : 'Now use $y = ' + k + 'x$ with $x = ' + x2 + '$.'],
            solution: [{ text: 'Find the constant.', math: '' + y1 + ' = ' + x1 + 'k \\Rightarrow k = ' + k },
              askK ? { text: 'That is what was asked.' } : { text: 'Use the finished equation.', math: 'y = ' + k + '(' + x2 + ') = ' + (k * x2) }]
          };
        } },

      { id: '1.12-g-inverse', title: 'Inverse variation', desc: 'On the bottom this time.',
        make(r) {
          const x1 = r.int(2, 10), x2 = r.pick([2, 4, 5, 10, 20]);
          const y1 = r.int(2, 12);
          const k = x1 * y1;
          if (k % x2 !== 0) return this.make(r);
          const askK = r.bool(0.4);
          return {
            prompt: '$y$ varies inversely as $x$, and $y = ' + y1 + '$ when $x = ' + x1 + '$. ' + (askK ? 'Find the constant $k$.' : 'Find $y$ when $x = ' + x2 + '$.'),
            answer: { type: 'number', value: askK ? k : k / x2 },
            hints: ['Inverse variation means $y = \\dfrac{k}{x}$.',
              'Substitute and multiply up: $' + y1 + ' = \\dfrac{k}{' + x1 + '}$, so $k = ' + k + '$.',
              askK ? 'That is the answer.' : 'Now use $y = \\dfrac{' + k + '}{x}$ with $x = ' + x2 + '$.'],
            solution: [{ text: 'Find the constant by multiplying up.', math: 'k = ' + y1 + ' \\times ' + x1 + ' = ' + k },
              askK ? { text: 'That is what was asked.' } : { text: 'Use the finished equation.', math: 'y = \\frac{' + k + '}{' + x2 + '} = ' + (k / x2) }]
          };
        } },

      { id: '1.12-g-shape', title: 'Which shape is it?', desc: 'Turn the words into an equation.',
        make(r) {
          const kind = r.pick(['direct', 'inverse', 'square', 'joint']);
          const text = { direct: '$y$ varies directly as $x$', inverse: '$y$ varies inversely as $x$',
            square: '$y$ varies directly as the square of $x$', joint: '$y$ varies jointly as $x$ and $z$' }[kind];
          const opts = [{ id: 'direct', label: '$y = kx$' }, { id: 'inverse', label: '$y = \\dfrac{k}{x}$' },
            { id: 'square', label: '$y = kx^2$' }, { id: 'joint', label: '$y = kxz$' }];
          return {
            prompt: 'Write the equation for: **' + text + '**.',
            answer: { type: 'choice', value: kind, options: opts, wrongMessage: 'Not quite — "directly" puts it on top, "inversely" puts it on the bottom.' },
            hints: ['"Directly" means it goes on the **top**; "inversely" means the **bottom**.',
              '"Jointly" means two variables multiplied together, both on top.',
              'A power in the words becomes the same power in the equation.'],
            solution: [{ text: 'Translate the phrase straight into symbols.' },
              { text: 'So the equation is:', math: { direct: 'y = kx', inverse: 'y = \\frac{k}{x}', square: 'y = kx^2', joint: 'y = kxz' }[kind] }]
          };
        } }
    ]
  });
})();
