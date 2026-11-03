/* 1.7 Modeling with Equations
   Stewart 7e §1.7: turning a worded situation into an equation. Interest, area and
   length, mixtures, work rates, and distance-rate-time.
   Not on either midterm, so no `exam` field — hidden unless extra topics are on. */
(function () {
  const M = CH.M, V = CH.V;

  CH.registerSection({
    id: '1.7', chapter: 1, title: 'Modeling with Equations',
    summary: 'Turning a worded problem into an equation you can actually solve. The same five steps every time, applied to interest, area, mixtures, work rates and journeys.',

    theory: [
      { short: true, md: 'Word problems are not a different kind of maths. They are **the same algebra with a translation step in front**.\n\n- Name the unknown with a letter, and write down in words exactly what it means.\n- Write everything else in terms of that letter.\n- Find the sentence that says two things are equal — that is your equation.\n- Solve it with the methods from 1.5.\n- Check your answer makes sense, and answers the question actually asked.' },

      { h: 'The five steps, every time' },
      { key: 'A method you can follow when you are stuck', md: '1. **Read it twice.** The first read is for the story, the second for the numbers.\n2. **Name the unknown.** Write "let $x$ = the number of ..." — including the units.\n3. **Write everything else in terms of $x$.** A table helps.\n4. **Find the "equals".** Somewhere the problem says two things are the same. That sentence becomes your equation.\n5. **Solve, then check.** Does the answer make sense? And is it the thing the question asked for?' },
      { warn: 'Step 2 is where most marks are lost', md: '"Let $x$ = speed" is not enough. **Whose** speed, and in what units?\n\nWriting "let $x$ = the car\'s speed in km/h" takes five extra seconds and prevents the single most common disaster: solving perfectly and then giving the wrong quantity as the answer.' },

      { h: 'Interest' },
      { def: 'Simple interest', md: '$$I = Prt$$\n\n$P$ is the amount invested (the principal), $r$ is the rate **as a decimal** ($6\\% = 0.06$), and $t$ is the time in years.\n\nIf a question asks for the total amount rather than the interest, that is $P + I$.' },
      { example: {
        title: 'Splitting an investment', label: 'Worked example',
        problem: 'Someone invests £10,000, part at $4\\%$ and the rest at $7\\%$. The total interest after one year is £550. How much went into each?',
        steps: [
          { text: 'Name the unknown carefully.', math: '\\text{let } x = \\text{the amount invested at } 4\\% \\text{, in pounds}' },
          { text: 'The rest must make up the £10,000, so that part is $10000 - x$. That is the trick: one letter does both jobs.' },
          { text: 'Interest from each part, using $I = Prt$ with $t=1$.', math: '0.04x \\quad\\text{and}\\quad 0.07(10000 - x)' },
          { text: 'The "equals" sentence: the two interests together make £550.', math: '0.04x + 0.07(10000-x) = 550' },
          { text: 'Expand and solve.', math: '0.04x + 700 - 0.07x = 550 \\Rightarrow -0.03x = -150 \\Rightarrow x = 5000' },
          { text: 'Check: £5000 at $4\\%$ gives £200, £5000 at $7\\%$ gives £350, total £550. ✓' }
        ],
        answer: '£5000 at $4\\%$ and £5000 at $7\\%$',
        checklist: ['Name the unknown with its units.', 'Write the other quantity as "total minus $x$".', 'Use $I = Prt$ on each part.', 'Set the total equal to what you are told, then check.']
      } },

      { h: 'Area and length' },
      { tip: 'Draw it', md: 'For anything geometric, sketch it and label the sides with your letter before writing a single equation. Thirty seconds of drawing replaces a lot of confusion.\n\nThe two facts you need almost every time: a rectangle has perimeter $2l + 2w$ and area $lw$.' },
      { example: {
        title: 'A rectangle from its perimeter', label: 'Worked example',
        problem: 'A rectangular garden is $3$ m longer than it is wide, and its perimeter is $46$ m. Find its dimensions.',
        steps: [
          { text: 'Name the unknown. Choose the **width**, because the length is described in terms of it.', math: '\\text{let } w = \\text{the width in metres}' },
          { text: 'Then the length is $3$ more.', math: 'l = w + 3' },
          { text: 'The "equals" sentence is the perimeter.', math: '2w + 2(w+3) = 46' },
          { text: 'Expand and solve.', math: '2w + 2w + 6 = 46 \\Rightarrow 4w = 40 \\Rightarrow w = 10' },
          { text: 'The question asked for **both** dimensions, so finish the job.', math: 'w = 10 \\text{ m}, \\qquad l = 13 \\text{ m}' }
        ],
        answer: '$10$ m by $13$ m',
        checklist: ['Sketch and label it.', 'Name the quantity the others are described from.', 'Write the other side in terms of it.', 'Answer every part of the question.']
      } },

      { h: 'Mixtures' },
      { key: 'Count the pure stuff, not the liquid', md: 'The idea that makes every mixture problem work:\n\n$$\\text{amount of the pure thing} = \\text{concentration} \\times \\text{total volume}$$\n\nSo $5$ litres of $20\\%$ acid contains $0.20 \\times 5 = 1$ litre of actual acid.\n\nThen: **the pure stuff you start with equals the pure stuff you end with.** The water moves around; the acid is conserved.' },

      { h: 'Work rates' },
      { key: 'Add the rates, not the times', md: 'If someone takes $a$ hours to do a job alone, their **rate** is $\\tfrac1a$ of the job per hour.\n\nRates add up. So two people working together take $t$ hours, where\n\n$$\\frac1a + \\frac1b = \\frac1t$$' },
      { warn: 'Times do not add', md: 'If one person takes 4 hours and another takes 6, together they do **not** take 10 hours, or 5. They take less than 4, because two people are faster than either alone.\n\nIf your answer is bigger than the fastest person\'s time on their own, something has gone wrong.' },
      { example: {
        title: 'Two people on one job', label: 'Worked example',
        problem: 'Alone, one painter takes $6$ hours to paint a room and the other takes $3$ hours. How long together?',
        steps: [
          { text: 'Turn each time into a rate — the fraction of the job done per hour.', math: '\\frac16 \\quad\\text{and}\\quad \\frac13' },
          { text: 'Add the rates to get the combined rate.', math: '\\frac16 + \\frac13 = \\frac16 + \\frac26 = \\frac36 = \\frac12' },
          { text: 'Half the job per hour, so the whole job takes the reciprocal.', math: 't = 2 \\text{ hours}' },
          { text: 'Sanity check: $2$ is less than $3$, the faster painter\'s solo time. ✓' }
        ],
        answer: '$2$ hours',
        checklist: ['Turn each time into a rate, $1/\\text{time}$.', 'Add the rates.', 'Flip the combined rate to get the time.', 'Check the answer beats the fastest person alone.']
      } },

      { h: 'Distance, rate and time' },
      { def: 'The one formula', md: '$$d = rt$$\n\nRearranged as needed: $r = \\tfrac dt$ and $t = \\tfrac dr$.\n\nFor a there-and-back journey, the distance each way is the same — and that equality is usually the equation you are looking for.' },
      { tip: 'Make a table', md: 'Three columns — distance, rate, time — and one row per leg of the journey. Fill in what you know, put $x$ where you do not, and the equation usually writes itself from the column you have not used yet.' },

      { calm: true, md: 'Word problems feel harder than everything else because you have to decide what to do, instead of being told. That is genuinely a different skill, and finding it harder does not mean you are worse at maths.\n\nThe five steps are there precisely so you never face a blank page. Even if you cannot see the whole route, you can always do step 2: write down "let $x$ = ..." with units. Then step 3. Each one makes the next one visible.\n\nAnd if you get stuck mid-problem, re-read the question looking only for the word **is**, or **equals**, or **total**. That sentence is nearly always the equation.' },

      { sid: '1.7', title: 'Can I do this?',
        intro: 'Tick these off when you are sure. Nothing here is marked — it is just for you to see what is solid and what still needs another go.',
        checklist: [
          'Follow the five steps without needing to be told what to do',
          'Name an unknown properly, with units',
          'Write a second quantity as "total minus $x$"',
          'Use $I = Prt$, turning a percentage into a decimal',
          'Set up a rectangle problem from its perimeter or area',
          'Use "pure amount = concentration $\\times$ volume" for a mixture',
          'Add **rates** rather than times for a shared job',
          'Use $d = rt$, and spot when two distances are equal',
          'Check the answer is sensible and answers what was asked'
        ] }
    ],

    examples: [
      { title: 'A mixture problem',
        problem: 'How many litres of pure water must be added to $10$ litres of a $30\\%$ acid solution to dilute it to $20\\%$?',
        steps: [
          { text: 'Name the unknown.', math: '\\text{let } x = \\text{litres of water added}' },
          { text: 'Track the **acid**, which is the thing that does not change. Start with $30\\%$ of $10$ litres.', math: '0.30 \\times 10 = 3 \\text{ litres of acid}' },
          { text: 'Adding water changes the total volume but not the acid.', math: '\\text{new volume} = 10 + x' },
          { text: 'The new mixture is $20\\%$ acid, and the acid is still $3$ litres.', math: '0.20(10+x) = 3' },
          { text: 'Solve.', math: '2 + 0.2x = 3 \\Rightarrow 0.2x = 1 \\Rightarrow x = 5' },
          { text: 'Check: $15$ litres containing $3$ litres of acid is $\\tfrac{3}{15} = 20\\%$. ✓' }
        ],
        answer: '$5$ litres of water',
        checklist: ['Name the unknown with units.', 'Work out the pure amount you start with.', 'Note what changes and what does not.', 'Set the final concentration equal and solve.'] },

      { title: 'A there-and-back journey',
        problem: 'A cyclist rides $30$ km to a town at $15$ km/h and returns along the same road at $10$ km/h. How long is the whole trip?',
        steps: [
          { text: 'Two legs, so handle them separately with $t = \\tfrac dr$.' },
          { text: 'Out.', math: 't_1 = \\frac{30}{15} = 2 \\text{ hours}' },
          { text: 'Back.', math: 't_2 = \\frac{30}{10} = 3 \\text{ hours}' },
          { text: 'Add them.', math: '2 + 3 = 5 \\text{ hours}' },
          { text: 'Note the average speed is **not** $12.5$ km/h — more time is spent at the slower speed. That is why you add times rather than averaging speeds.' }
        ],
        answer: '$5$ hours',
        checklist: ['Split the journey into legs.', 'Use $t = d/r$ on each.', 'Add the times.', 'Never average the speeds directly.'] }
    ],

    exercises: [
      { id: '1.7-e1', prompt: 'A rectangle is $3$ m longer than it is wide and has perimeter $46$ m. Find its **width** in metres.',
        answer: { type: 'number', value: 10 },
        hints: ['Let $w$ be the width; then the length is $w+3$.', 'Perimeter is $2w + 2(w+3) = 46$.', 'Expand: $4w + 6 = 46$.'],
        solution: [{ text: 'Set up the perimeter.', math: '2w + 2(w+3) = 46' },
          { text: 'Solve.', math: '4w = 40 \\Rightarrow w = 10' }] },

      { id: '1.7-e2', prompt: 'For that same rectangle, find its **length** in metres.',
        answer: { type: 'number', value: 13 },
        hints: ['The length is $3$ more than the width.', 'The width came out as $10$.'],
        solution: [{ text: 'Add 3 to the width.', math: 'l = 10 + 3 = 13' }] },

      { id: '1.7-e3', prompt: 'What is the simple interest on £2000 invested at $5\\%$ for $3$ years? Give the answer in pounds.',
        answer: { type: 'number', value: 300 },
        hints: ['Use $I = Prt$, with the rate as a decimal.', '$5\\% = 0.05$, so $I = 2000 \\times 0.05 \\times 3$.'],
        solution: [{ text: 'Substitute into $I = Prt$.', math: 'I = 2000(0.05)(3) = 300' }] },

      { id: '1.7-e4', prompt: '£8000 is split between an account paying $3\\%$ and one paying $6\\%$. The total interest after one year is £330. How much went into the $3\\%$ account?',
        answer: { type: 'number', value: 5000 },
        hints: ['Let $x$ be the amount at $3\\%$; the rest is $8000 - x$.', 'Interest: $0.03x + 0.06(8000-x) = 330$.', 'Expand: $0.03x + 480 - 0.06x = 330$.'],
        solution: [{ text: 'Set up the total interest.', math: '0.03x + 0.06(8000-x) = 330' },
          { text: 'Expand the bracket.', math: '0.03x + 480 - 0.06x = 330' },
          { text: 'Collect the $x$ terms, and move the $480$ across.', math: '-0.03x = -150' },
          { text: 'Solve.', math: 'x = 5000' }] },

      { id: '1.7-e5', prompt: 'How many litres of acid are in $10$ litres of a $30\\%$ acid solution?',
        answer: { type: 'number', value: 3 },
        hints: ['Pure amount = concentration $\\times$ volume.', '$0.30 \\times 10$.'],
        solution: [{ text: 'Multiply.', math: '0.30 \\times 10 = 3 \\text{ litres}' }] },

      { id: '1.7-e6', prompt: 'How many litres of pure water must be added to $10$ litres of $30\\%$ acid to dilute it to $20\\%$?',
        answer: { type: 'number', value: 5 },
        hints: ['The amount of acid does not change — it stays at $3$ litres.', 'The new volume is $10 + x$, and $20\\%$ of it must be $3$.', 'Solve $0.20(10+x) = 3$.'],
        solution: [{ text: 'Acid is conserved.', math: '0.20(10+x) = 3' },
          { text: 'Solve.', math: '2 + 0.2x = 3 \\Rightarrow x = 5' }] },

      { id: '1.7-e7', prompt: 'One painter takes $6$ hours to paint a room, another takes $3$ hours. How many hours together?',
        answer: { type: 'number', value: 2 },
        hints: ['Turn each time into a rate: $\\tfrac16$ and $\\tfrac13$ of the job per hour.', 'Add the rates: $\\tfrac16 + \\tfrac13 = \\tfrac12$.', 'Half a job per hour means the whole job takes the reciprocal.'],
        solution: [{ text: 'Add the rates.', math: '\\frac16 + \\frac13 = \\frac12' },
          { text: 'Flip to get the time.', math: 't = 2 \\text{ hours}' }] },

      { id: '1.7-e8', prompt: 'One tap fills a tank in $4$ hours, another in $12$ hours. How many hours together?',
        answer: { type: 'number', value: 3 },
        hints: ['Rates are $\\tfrac14$ and $\\tfrac1{12}$.', 'Common bottom of $12$: $\\tfrac{3}{12} + \\tfrac{1}{12} = \\tfrac{4}{12} = \\tfrac13$.', 'A third of the tank per hour.'],
        solution: [{ text: 'Add the rates.', math: '\\frac14 + \\frac1{12} = \\frac13' },
          { text: 'Flip.', math: 't = 3 \\text{ hours}' },
          { text: 'Sensible: faster than the $4$-hour tap on its own.' }] },

      { id: '1.7-e9', prompt: 'A car travels $180$ km at $60$ km/h. How many hours does it take?',
        answer: { type: 'number', value: 3 },
        hints: ['Rearrange $d = rt$ to $t = \\tfrac dr$.', '$180 \\div 60$.'],
        solution: [{ text: 'Use $t = d/r$.', math: 't = \\frac{180}{60} = 3' }] },

      { id: '1.7-e10', prompt: 'A cyclist rides $30$ km out at $15$ km/h and back at $10$ km/h. How many hours is the whole trip?',
        answer: { type: 'number', value: 5 },
        hints: ['Work out each leg separately with $t = d/r$.', 'Out: $30/15 = 2$. Back: $30/10 = 3$.', 'Add the two times — do not average the speeds.'],
        solution: [{ text: 'Each leg.', math: 't_1 = 2, \\qquad t_2 = 3' },
          { text: 'Add.', math: '5 \\text{ hours}' }] },

      { id: '1.7-e11', prompt: 'The sum of two consecutive whole numbers is $57$. What is the **smaller** one?',
        answer: { type: 'number', value: 28 },
        hints: ['Let $x$ be the smaller; the next one is $x+1$.', '$x + (x+1) = 57$.'],
        solution: [{ text: 'Set it up.', math: 'x + (x+1) = 57' },
          { text: 'Solve.', math: '2x + 1 = 57 \\Rightarrow x = 28' }] },

      { id: '1.7-e12', prompt: 'A rectangle is twice as long as it is wide and has area $72$ m². Find its **width** in metres.',
        answer: { type: 'number', value: 6 },
        hints: ['Let $w$ be the width; the length is $2w$.', 'Area: $w \\times 2w = 72$, so $2w^2 = 72$.', 'Solve $w^2 = 36$ — and take the positive answer, since a width cannot be negative.'],
        solution: [{ text: 'Set up the area.', math: '2w^2 = 72' },
          { text: 'Solve, keeping the positive root.', math: 'w^2 = 36 \\Rightarrow w = 6' }] }
    ],

    generators: [
      { id: '1.7-g-interest', title: 'Simple interest', desc: 'Use $I = Prt$.',
        make(r) {
          const P = r.pick([1000, 1500, 2000, 2500, 4000, 5000]);
          const pct = r.pick([2, 3, 4, 5, 6, 8]);
          const t = r.int(1, 5);
          const I = P * (pct / 100) * t;
          return {
            prompt: 'Find the simple interest on £' + P + ' invested at $' + pct + '\\%$ for $' + t + '$ year' + (t === 1 ? '' : 's') + '. Give the answer in pounds.',
            answer: { type: 'number', value: I },
            hints: ['Use $I = Prt$.', 'Turn the percentage into a decimal: $' + pct + '\\% = ' + (pct / 100) + '$.',
              'So $I = ' + P + ' \\times ' + (pct / 100) + ' \\times ' + t + '$.'],
            solution: [{ text: 'Substitute into $I = Prt$.', math: 'I = ' + P + '(' + (pct / 100) + ')(' + t + ') = ' + I }]
          };
        } },

      { id: '1.7-g-rectangle', title: 'Rectangle from its perimeter', desc: 'One side described from the other.',
        make(r) {
          const w = r.int(4, 20), extra = r.int(1, 9);
          const per = 2 * w + 2 * (w + extra);
          const askLength = r.bool(0.4);
          return {
            prompt: 'A rectangle is $' + extra + '$ m longer than it is wide, and its perimeter is $' + per + '$ m. Find its **' + (askLength ? 'length' : 'width') + '** in metres.',
            answer: { type: 'number', value: askLength ? w + extra : w },
            hints: ['Let $w$ be the width; then the length is $w + ' + extra + '$.',
              'Perimeter: $2w + 2(w + ' + extra + ') = ' + per + '$.',
              'Expand: $4w + ' + (2 * extra) + ' = ' + per + '$.' + (askLength ? ' Then remember to add $' + extra + '$ at the end.' : '')],
            solution: [{ text: 'Set up the perimeter.', math: '2w + 2(w+' + extra + ') = ' + per },
              { text: 'Solve for the width.', math: '4w = ' + (per - 2 * extra) + ' \\Rightarrow w = ' + w },
              { text: askLength ? 'The question asked for the **length**, which is ' + extra + ' more than the width.' : 'That is the width the question asked for.', math: askLength ? 'l = ' + w + ' + ' + extra + ' = ' + (w + extra) : 'w = ' + w }]
          };
        } },

      { id: '1.7-g-work', title: 'Two working together', desc: 'Add the rates, then flip.',
        make(r) {
          const t1 = r.pick([2, 3, 4, 6, 12]);
          const t2 = r.pick([3, 4, 6, 12, 20]);
          if (t1 === t2) return this.make(r);
          const t = 1 / (1 / t1 + 1 / t2);
          if (Math.abs(t - Math.round(t * 2) / 2) > 1e-9) return this.make(r);
          return {
            prompt: 'One worker takes $' + t1 + '$ hours to finish a job alone, and another takes $' + t2 + '$ hours. How many hours does it take them working together?',
            answer: { type: 'number', value: Math.round(t * 1000) / 1000 },
            hints: ['Turn each time into a rate: $\\tfrac1{' + t1 + '}$ and $\\tfrac1{' + t2 + '}$ of the job per hour.',
              'Add the rates over a common bottom.',
              'Then flip the total rate to get the time. It must come out **less** than $' + Math.min(t1, t2) + '$.'],
            solution: (() => {
              // rates over the common bottom L, summed and reduced: 1/t1 + 1/t2 = n/d
              const L = M.lcm(t1, t2), top = L / t1 + L / t2, g = M.gcd(top, L), n = top / g, d = L / g;
              const tt = Math.round(t * 1000) / 1000;
              return [{ text: 'Write both rates over the common bottom $' + L + '$, and add.', math: '\\frac1{' + t1 + '} + \\frac1{' + t2 + '} = \\frac{' + (L / t1) + '}{' + L + '} + \\frac{' + (L / t2) + '}{' + L + '} = \\frac{' + top + '}{' + L + '}' + (g > 1 ? ' = ' + (d === 1 ? n : '\\frac{' + n + '}{' + d + '}') : '') },
                { text: 'That is how much of the job gets done in one hour. Flip it to get the time for the whole job.', math: 't = ' + (n === 1 ? d : '\\frac{' + d + '}{' + n + '}' + (Number.isInteger(tt) ? ' = ' + tt : ' = ' + tt)) + ' \\text{ hours}' }];
            })()
          };
        } },

      { id: '1.7-g-drt', title: 'Distance, rate and time', desc: 'One journey, one missing piece.',
        make(r) {
          const rate = r.pick([30, 40, 50, 60, 80, 100]);
          const time = r.int(2, 6);
          const dist = rate * time;
          const ask = r.pick(['t', 'r', 'd']);
          const prompt = ask === 't' ? 'A car travels $' + dist + '$ km at $' + rate + '$ km/h. How many **hours** does it take?'
            : ask === 'r' ? 'A car travels $' + dist + '$ km in $' + time + '$ hours. What is its **speed** in km/h?'
              : 'A car travels at $' + rate + '$ km/h for $' + time + '$ hours. How far does it go, in **km**?';
          return {
            prompt: prompt,
            answer: { type: 'number', value: ask === 't' ? time : ask === 'r' ? rate : dist },
            hints: ['Start from $d = rt$ and rearrange for what you need.',
              ask === 't' ? 'You want time, so $t = \\tfrac dr$.' : ask === 'r' ? 'You want rate, so $r = \\tfrac dt$.' : 'You want distance, so multiply.',
              'Keep the units straight: km and hours give km/h.'],
            solution: [{ text: 'Rearrange $d = rt$.', math: ask === 't' ? 't = \\frac{' + dist + '}{' + rate + '} = ' + time : ask === 'r' ? 'r = \\frac{' + dist + '}{' + time + '} = ' + rate : 'd = ' + rate + ' \\times ' + time + ' = ' + dist }]
          };
        } }
    ]
  });
})();
