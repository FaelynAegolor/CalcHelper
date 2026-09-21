# CalcHelper — Z's Precalculus Companion

A gentle, interactive precalculus textbook that runs entirely in the browser and is hosted on GitHub Pages.

- **Learn** — short, plain-English explanations with diagrams and interactive explorers.
- **Examples** — worked examples revealed one step at a time.
- **Exercises** — type an answer and it is marked instantly (any algebraically equivalent form is accepted).
- **Check my working** — write your steps one per line; each line is tested against the correct answer so slips are pinpointed.
- **Practice** — endless randomised questions with generated solutions, plus a mixed-practice mode.

Progress is saved in the browser (localStorage) and can be exported/imported from Settings.

## Running locally

It is a static site — no build step. Open `index.html` directly, or serve the folder:

```
python -m http.server 8000
```

and visit http://localhost:8000.

## Checking the content

```
node tools/validate-content.js
```

loads every section in Node, checks each exercise's reference answer, and runs every practice generator 60 times.

```
npm install --no-save katex
node tools/check-latex.js
```

renders every formula on the site (including generated ones) through KaTeX and reports anything that does not parse.

## Adding content

Each section is one file in `js/content/ch1/` and registers itself with `CH.registerSection({...})`. Add the file to the script list in `index.html`. A section has:

- `theory` — an array of blocks: markdown strings (with `$…$` maths), `{h: 'Heading'}`, callouts (`{def|key|tip|warn|note|why: 'Title', md: '…'}`), figures (`{svg: CH.V.numberLine({...})}`, `{html: CH.V.signChart({...})}`), inline `{example: {...}}`, and `{widget: 'name'}` for the interactive explorers in `js/widgets.js`.
- `examples` — `{title, problem, steps: [{text, math}], answer}`.
- `exercises` — `{id, prompt, answer, hints, solution}` where `answer` is one of
  `{type:'number', value}`, `{type:'expression', value:'2x(x-5)', form?:'factored'}`, `{type:'set', value:[…]}`,
  `{type:'interval', value:'[-2,0] U [7,inf)'}`, `{type:'equation', value:'5x+2y=-1'}`, `{type:'point', value:[3,-1]}`,
  `{type:'choice', value:'b', options:[{id,label}]}` or `{type:'multi', parts:[…]}`.
- `generators` — `{id, title, make(rng) → {prompt, answer, hints, solution}}` using the seeded `rng` from `js/rng.js`.

Answers are checked numerically (`js/checker.js`): expressions by sampling, equations by proportionality, sets and intervals structurally.
