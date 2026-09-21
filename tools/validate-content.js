#!/usr/bin/env node
/* Loads the engine + all content files in Node and checks that every exercise's
   reference answer is well-formed and every generator runs cleanly.
   Usage: node tools/validate-content.js  */
const path = require('path');
const fs = require('fs');
const root = path.join(__dirname, '..');
global.window = undefined;
require(path.join(root, 'js/rng.js'));
require(path.join(root, 'js/mathparse.js'));
require(path.join(root, 'js/checker.js'));
require(path.join(root, 'js/render.js'));
require(path.join(root, 'js/viz.js'));
require(path.join(root, 'js/registry.js'));
const CH = globalThis.CH;
const C = CH.C, P = CH.P;

// load content in the order index.html lists it
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="(js\/content\/[^"]+)"/g)].map(m => m[1]);
for (const f of files) require(path.join(root, f));

let errors = 0, warnings = 0;
const err = (ctx, msg) => { errors++; console.log('ERROR ' + ctx + ': ' + msg); };
const warn = (ctx, msg) => { warnings++; console.log('warn  ' + ctx + ': ' + msg); };

function refInput(spec) {
  switch (spec.type) {
    case 'number': return String(spec.value);
    case 'expression': case 'interval': case 'equation': return spec.value;
    case 'set': return spec.value.length ? '{' + spec.value.join(', ') + '}' : 'no solution';
    case 'point': return '(' + spec.value[0] + ', ' + spec.value[1] + ')';
    case 'choice': return String(spec.value);
    case 'text': return [].concat(spec.value)[0];
  }
  return null;
}
function checkSpec(ctx, spec) {
  if (!spec || !spec.type) return err(ctx, 'answer has no type');
  if (spec.type === 'multi') { spec.parts.forEach((p, i) => checkSpec(ctx + ' part ' + (i + 1), p)); return; }
  const inp = refInput(spec);
  if (inp == null) return err(ctx, 'unknown answer type ' + spec.type);
  const r = C.checkAnswer(inp, spec);
  if (!r.ok) err(ctx, 'reference answer does not check as correct: ' + r.message + ' (input: ' + inp + ')');
  if (spec.type === 'number' && !isFinite(spec.value)) err(ctx, 'non-finite number');
  if (spec.type === 'choice' && !(spec.options || []).some(o => o.id === spec.value)) err(ctx, 'choice value not among options');
  if (spec.display) { try { CH.R.tex(spec.display); } catch (e) { err(ctx, 'bad display latex'); } }
}
function checkText(ctx, s) {
  if (typeof s !== 'string') return;
  const n = (s.match(/\$/g) || []).length;
  if (n % 2) warn(ctx, 'odd number of $ signs: ' + s.slice(0, 60));
}
function checkSteps(ctx, steps) {
  if (!steps) return;
  [].concat(steps).forEach((st, i) => {
    if (typeof st === 'string') checkText(ctx + ' step ' + (i + 1), st);
    else { checkText(ctx + ' step ' + (i + 1), st.text); if (st.math) { try { P.normalize(st.math); } catch (e) { err(ctx, 'bad math'); } } }
  });
}

for (const s of CH.sections) {
  const ctx = s.id;
  if (!s.title) err(ctx, 'no title');
  s.theory.forEach((b, i) => { if (typeof b === 'string') checkText(ctx + ' theory[' + i + ']', b); else if (b.md) checkText(ctx + ' theory[' + i + ']', b.md); });
  s.examples.forEach((ex, i) => { checkText(ctx + ' example ' + (i + 1), ex.problem); checkSteps(ctx + ' example ' + (i + 1), ex.steps); });
  const ids = new Set();
  s.exercises.forEach((ex, i) => {
    const c = ctx + ' exercise ' + (i + 1) + ' (' + ex.id + ')';
    if (!ex.id) err(c, 'no id'); else if (ids.has(ex.id)) err(c, 'duplicate id'); ids.add(ex.id);
    checkText(c, ex.prompt); checkSpec(c, ex.answer); checkSteps(c, ex.solution); (ex.hints || []).forEach(h => checkText(c + ' hint', h));
  });
  s.generators.forEach(g => {
    const c = ctx + ' generator ' + g.id;
    for (let k = 1; k <= 60; k++) {
      let q;
      try { q = g.make(CH.M.makeRng(k * 7919)); } catch (e) { err(c + ' seed ' + k, 'threw: ' + e.message); break; }
      if (!q.prompt) err(c + ' seed ' + k, 'no prompt');
      checkText(c + ' seed ' + k, q.prompt); checkSpec(c + ' seed ' + k, q.answer); checkSteps(c + ' seed ' + k, q.solution);
      if (errors > 40) break;
    }
  });
  console.log(ctx.padEnd(5), s.title.padEnd(42), 'theory', String(s.theory.length).padStart(2), ' examples', String(s.examples.length).padStart(2), ' exercises', String(s.exercises.length).padStart(2), ' generators', s.generators.length);
}
console.log('\n' + CH.sections.length + ' sections, ' + errors + ' errors, ' + warnings + ' warnings');
process.exit(errors ? 1 : 0);
