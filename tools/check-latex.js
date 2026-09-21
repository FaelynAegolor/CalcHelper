#!/usr/bin/env node
/* Renders every formula in the content (theory, examples, exercises, and 25
   seeds of every generator) through real KaTeX and reports parse errors.
   Needs the katex package:  npm install --no-save katex   then  node tools/check-latex.js */
const path = require('path');
const fs = require('fs');
let katex;
try { katex = require('katex'); } catch (e) { console.log('katex is not installed. Run: npm install --no-save katex'); process.exit(2); }
const root = path.join(__dirname, '..');
for (const f of ['js/rng.js', 'js/mathparse.js', 'js/checker.js', 'js/render.js', 'js/viz.js', 'js/registry.js']) require(path.join(root, f));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const m of html.matchAll(/<script src="(js\/content\/[^"]+)"/g)) require(path.join(root, m[1]));
const CH = globalThis.CH, R = CH.R;
let n = 0, bad = 0;
function tryTex(src, disp, ctx) {
  n++;
  try {
    katex.renderToString(src, { displayMode: !!disp, throwOnError: true, strict: (code, msg) => { if (code === 'unicodeTextInMathMode') return 'ignore'; bad++; console.log('WARN', ctx, code, msg, '|', src.slice(0, 80)); return 'ignore'; } });
  } catch (e) { bad++; console.log('ERR ', ctx, e.message.slice(0, 110), '|', src.slice(0, 100)); }
}
let ctx = '';
R.tex = (src, disp) => { tryTex(src, disp, ctx); return '<i>' + src + '</i>'; };
const steps = (arr, c) => [].concat(arr || []).forEach(st => { if (typeof st === 'string') R.md(st); else { R.md(st.text || ''); if (st.math) tryTex(st.math, true, c); } });
const specs = (ans, c) => (ans.type === 'multi' ? ans.parts : [ans]).forEach(p => { if (p.display) tryTex(p.display, false, c + ' display'); if (p.label) R.md(p.label); (p.options || []).forEach(o => R.md(o.label)); if (p.wrongMessage) R.md(p.wrongMessage); });
function walk(b) {
  if (typeof b === 'string') R.md(b);
  else if (b.md) R.md(b.md);
  else if (b.example) R.exampleHtml(b.example);
  else if (b.cols) b.cols.forEach(walk);
  if (b && b.caption) R.md(b.caption);
}
for (const s of CH.sections) {
  ctx = s.id;
  s.theory.forEach(walk);
  s.examples.forEach(e => R.exampleHtml(e));
  s.exercises.forEach(e => { ctx = s.id + ' ' + e.id; R.md(e.prompt); (e.hints || []).forEach(h => R.md(h)); steps(e.solution, ctx); specs(e.answer, ctx); });
  s.generators.forEach(g => {
    for (let k = 1; k <= 25; k++) {
      ctx = s.id + ' ' + g.id + ' seed ' + k;
      const q = g.make(CH.M.makeRng(k * 31337));
      R.md(q.prompt); (q.hints || []).forEach(h => R.md(h)); steps(q.solution, ctx); specs(q.answer, ctx);
    }
  });
}
console.log('KaTeX renders checked:', n, ' problems:', bad);
process.exit(bad ? 1 : 0);
