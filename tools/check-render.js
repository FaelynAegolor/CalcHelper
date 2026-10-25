#!/usr/bin/env node
/* Renders every piece of content through the real renderer and inspects the HTML that
   comes OUT, looking for things a reader would see as broken:

     - a leftover $ or $$ that never became maths (unbalanced delimiter)
     - a raw LaTeX command sitting in prose, outside any maths
     - leftover markdown markers (**bold**, a stray list dash, a table pipe)
     - an empty heading, title or callout body

   check-latex.js asks "does every formula parse?". This asks the different question
   "does the finished page read correctly?" — a formula can parse perfectly and still
   be stranded outside its dollar signs.

   Run:  node tools/check-render.js        (needs katex only for check-latex, not here) */
const path = require('path');
const fs = require('fs');
const root = path.join(__dirname, '..');

/* Stand-in for KaTeX: every rendered formula becomes an opaque marker, so anything
   still looking like maths in the output is maths that never made it in. */
const MARK_OPEN = '\u0001', MARK_CLOSE = '\u0002';
globalThis.katex = { renderToString: (src) => MARK_OPEN + src.replace(/[\u0001\u0002]/g, '') + MARK_CLOSE };

for (const f of ['js/rng.js', 'js/mathparse.js', 'js/checker.js', 'js/render.js', 'js/viz.js', 'js/registry.js']) require(path.join(root, f));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const m of html.matchAll(/<script src="(js\/content\/[^"]+)"/g)) require(path.join(root, m[1]));
const CH = globalThis.CH, R = CH.R;

const problems = [];
const report = (ctx, kind, detail, sample) =>
  problems.push({ ctx, kind, detail, sample: String(sample).replace(/\s+/g, ' ').slice(0, 110) });

/* Commands that are fine in prose because they are not LaTeX at all. */
const LATEX_CMD = /\\[a-zA-Z]{2,}/g;

function checkHtml(ctx, out) {
  if (out == null) return;
  const s = String(out);

  if (s.includes('tex-fallback')) report(ctx, 'katex-missing', 'fell back to plain code', s);

  // Strip rendered maths, then anything maths-looking left over is a real problem.
  const outside = s.replace(new RegExp(MARK_OPEN + '[^' + MARK_CLOSE + ']*' + MARK_CLOSE, 'g'), '');

  const dollars = (outside.match(/\$/g) || []).length;
  if (dollars) report(ctx, 'stray-dollar', dollars + ' unrendered $', outside);

  const cmds = outside.match(LATEX_CMD);
  if (cmds) report(ctx, 'raw-latex', 'outside maths: ' + [...new Set(cmds)].join(' '), outside);

  if (/\*\*/.test(outside)) report(ctx, 'raw-bold', 'literal ** left in output', outside);

  // A paragraph that still begins with a list dash or contains a table pipe row.
  if (/<p>\s*-\s+/.test(outside)) report(ctx, 'list-not-parsed', 'line starts with "- " inside a paragraph', outside);
  if (/<p>[^<]*\|[^<]*\|/.test(outside)) report(ctx, 'table-not-parsed', 'pipes inside a paragraph', outside);

  for (const m of outside.matchAll(/<(h[1-6]|div class="callout-title"|span class="example-title")[^>]*>\s*<\/\1>/g)) {
    report(ctx, 'empty-title', m[1], m[0]);
  }
  if (/<div class="callout-title">\s*<\/div>/.test(outside)) report(ctx, 'empty-title', 'callout title', outside);
}

const steps = (ctx, arr) => [].concat(arr || []).forEach((st, i) => {
  const c = ctx + ' step' + (i + 1);
  if (typeof st === 'string') checkHtml(c, R.md(st));
  else { checkHtml(c, R.md(st.text || '')); if (st.math) checkHtml(c + ' math', globalThis.katex.renderToString(st.math)); }
});
const specs = (ctx, ans) => (ans.type === 'multi' ? ans.parts : [ans]).forEach((p, i) => {
  const c = ctx + ' part' + (i + 1);
  if (p.label) checkHtml(c + ' label', R.md(p.label));
  (p.options || []).forEach(o => checkHtml(c + ' option', R.md(o.label)));
  if (p.wrongMessage) checkHtml(c + ' wrongMessage', R.md(p.wrongMessage));
});

let blocks = 0;
for (const s of CH.sections) {
  s.theory.forEach((b, i) => { blocks++; checkHtml(s.id + ' theory[' + i + ']', R.block(b)); });
  s.examples.forEach((e, i) => { blocks++; checkHtml(s.id + ' example' + (i + 1) + ' "' + (e.title || '') + '"', R.exampleHtml(e)); });
  for (const e of s.exercises) {
    const ctx = s.id + ' ' + e.id;
    blocks++;
    checkHtml(ctx + ' prompt', R.md(e.prompt));
    (e.hints || []).forEach((h, i) => checkHtml(ctx + ' hint' + (i + 1), R.md(h)));
    steps(ctx, e.solution);
    specs(ctx, e.answer);
  }
  for (const g of s.generators) {
    // the practice list shows these two, so they go through the renderer as well
    checkHtml(s.id + ' ' + g.id + ' title', R.inlineMath(g.title || ''));
    if (g.desc) checkHtml(s.id + ' ' + g.id + ' desc', R.md(g.desc));
    for (let k = 1; k <= 25; k++) {
      const q = g.make(CH.M.makeRng(k * 31337));
      const ctx = s.id + ' ' + g.id + ' seed' + k;
      blocks++;
      checkHtml(ctx + ' prompt', R.md(q.prompt));
      (q.hints || []).forEach((h, i) => checkHtml(ctx + ' hint' + (i + 1), R.md(h)));
      steps(ctx, q.solution);
      specs(ctx, q.answer);
    }
  }
}

for (const e of CH.exams || []) {
  for (const q of e.questions) {
    const ctx = e.id + ' ' + q.id;
    blocks++;
    checkHtml(ctx + ' prompt', R.md(q.prompt));
    (q.hints || []).forEach((hh, i) => checkHtml(ctx + ' hint' + (i + 1), R.md(hh)));
    steps(ctx, q.solution);
    specs(ctx, q.answer);
    if (q.note) checkHtml(ctx + ' note', R.md(q.note));
    if (q.answerText) checkHtml(ctx + ' answerText', R.md(q.answerText));
    (q.checklist || []).forEach((t, i) => checkHtml(ctx + ' method' + (i + 1), R.inlineMath(t)));
  }
}

/* Collapse generator seeds: one broken template reports 25 times otherwise. */
const seen = new Map();
for (const p of problems) {
  const key = p.ctx.replace(/seed\d+/, 'seed*') + '|' + p.kind + '|' + p.detail;
  if (!seen.has(key)) seen.set(key, { ...p, ctx: p.ctx.replace(/seed\d+/, 'seed*'), count: 0 });
  seen.get(key).count++;
}
const uniq = [...seen.values()];
for (const p of uniq) {
  console.log(p.kind.toUpperCase().padEnd(18), p.ctx + (p.count > 1 ? ' (x' + p.count + ')' : ''));
  console.log('   ', p.detail);
  console.log('   ', p.sample);
}
console.log('\nRendered blocks checked: ' + blocks + '   distinct problems: ' + uniq.length);
process.exit(uniq.length ? 1 : 0);
