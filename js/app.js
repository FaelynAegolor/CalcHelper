/* CalcHelper — the app: routing, pages, exercise cards, practice, settings. */
(function () {
  'use strict';
  const CH = window.CH, S = CH.S, R = CH.R, C = CH.C, P = CH.P, V = CH.V, M = CH.M;
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));
  const h = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = R.esc;
  const main = () => $('#main');

  // ---------- theme ----------
  function applyTheme() {
    const t = S.setting('theme') || 'auto';
    if (t === 'auto') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = t;
  }

  // ---------- answer spec helpers ----------
  const PRIMARY_TYPES = ['number', 'expression', 'set', 'interval', 'equation'];
  function partsOf(ex) { return ex.answer.type === 'multi' ? ex.answer.parts : [ex.answer]; }
  function primarySpec(ex) {
    const parts = partsOf(ex);
    if (ex.answer.type === 'multi' && ex.working && ex.working.part != null) return parts[ex.working.part];
    return parts.find(p => PRIMARY_TYPES.includes(p.type)) || parts[0];
  }
  function specAnswerTex(spec) {
    if (spec.display) return spec.display;
    switch (spec.type) {
      case 'number': return C.fmtTex(spec.value);
      case 'expression': { try { return P.toLatex(P.parse(spec.value)); } catch (e) { return spec.value; } }
      case 'set': return C.setToLatex(spec.value.slice().sort((a, b) => a - b));
      case 'interval': { try { return C.intervalsToLatex(C.parseIntervalSet(spec.value)); } catch (e) { return spec.value; } }
      case 'equation': { try { return P.relationToLatex(P.parseRelation(spec.value)); } catch (e) { return spec.value; } }
      case 'point': return '(' + C.fmtTex(spec.value[0]) + ',\\, ' + C.fmtTex(spec.value[1]) + ')';
      case 'choice': { const o = (spec.options || []).find(o => o.id === spec.value); return o ? '\\text{' + o.label.replace(/\$/g, '') + '}' : String(spec.value); }
      case 'text': return '\\text{' + [].concat(spec.value)[0] + '}';
    }
    return '';
  }
  function answerHintText(spec) {
    if (spec.hint) return spec.hint;
    switch (spec.type) {
      case 'number': return 'a number, e.g. 2/3 or 4+sqrt(3)';
      case 'expression': return spec.form === 'factored' ? 'e.g. 2x(x-5)(x+5)' : 'an expression, e.g. (x+3)/(x-1)';
      case 'set': return 'e.g. {-8, 3}  or  x = -8 or x = 3  or  no solution';
      case 'interval': return 'e.g. [-2, 0] U [7, inf)  or  x >= 7';
      case 'equation': return 'an equation, e.g. 5x + 2y = -1';
      case 'point': return 'a point, e.g. (3, -1)';
    }
    return '';
  }

  // ---------- exercise card ----------
  // ex: {id, prompt, answer, hints, solution, working, gen?, seed?}
  function exerciseCard(ex, opts) {
    opts = opts || {};
    const parts = partsOf(ex);
    const isMulti = ex.answer.type === 'multi';
    const stored = opts.practice ? null : S.ex(ex.id);
    const card = h('<article class="ex" data-id="' + esc(ex.id) + '"></article>');
    const status = stored && stored.correct ? 'done' : stored && stored.attempts ? 'tried' : 'new';
    card.innerHTML =
      '<div class="ex-head"><span class="ex-num">' + esc(opts.label || 'Exercise') + '</span>' +
      (opts.practice ? '' : '<span class="badge badge-' + status + '">' + { done: '✓ done', tried: 'in progress', new: 'not started' }[status] + '</span>') + '</div>' +
      '<div class="ex-prompt">' + R.md(ex.prompt) + '</div>' +
      '<div class="ex-answer"></div>' +
      '<div class="ex-feedback" hidden></div>' +
      '<div class="ex-tools">' +
      (ex.hints && ex.hints.length ? '<button class="btn btn-ghost btn-sm act-hint">💡 Hint <span class="hint-count"></span></button>' : '') +
      '<button class="btn btn-ghost btn-sm act-working">✍️ Check my working</button>' +
      '<button class="btn btn-ghost btn-sm act-solution">📖 Show solution</button>' +
      (opts.practice ? '<button class="btn btn-ghost btn-sm act-next">🔄 New question</button>' : '') +
      '</div>' +
      '<div class="ex-hints"></div>' +
      '<div class="ex-working" hidden></div>' +
      '<div class="ex-solution" hidden></div>';

    // answer inputs
    const ansBox = $('.ex-answer', card);
    const inputs = [];
    parts.forEach((spec, i) => {
      const row = h('<div class="ans-row"></div>');
      if (isMulti) row.appendChild(h('<label class="ans-label">' + R.md(spec.label || 'Part ' + (i + 1)).replace(/^<p>|<\/p>$/g, '') + '</label>'));
      if (spec.type === 'choice') {
        const name = 'c-' + ex.id.replace(/[^a-z0-9]/gi, '') + '-' + i;
        const box = h('<div class="choices"></div>');
        spec.options.forEach(o => box.appendChild(h('<label class="choice"><input type="radio" name="' + name + '" value="' + esc(o.id) + '"><span>' + R.md(o.label).replace(/^<p>|<\/p>$/g, '') + '</span></label>')));
        row.appendChild(box);
        inputs.push({ spec, get: () => { const r = $('input:checked', box); return r ? r.value : ''; }, el: box });
      } else {
        const inp = h('<input type="text" class="ans-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + esc(answerHintText(spec)) + '">');
        const readas = h('<div class="readas"></div>');
        row.appendChild(inp); row.appendChild(readas);
        inputs.push({ spec, get: () => inp.value, el: inp, readas });
        let timer;
        inp.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => showReadAs(inp.value, spec, readas), 250); });
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); check(); } });
        inp.addEventListener('focus', () => { card._lastInput = inp; });
      }
      ansBox.appendChild(row);
    });
    if (stored && stored.last && !isMulti && inputs[0].el.tagName === 'INPUT') inputs[0].el.value = stored.last;
    const ctrl = h('<div class="ans-ctrl"><div class="palette"></div><button class="btn btn-primary act-check">Check answer</button></div>');
    ansBox.appendChild(ctrl);
    const pal = $('.palette', ctrl);
    if (inputs.some(i => i.el.tagName === 'INPUT')) {
      [['√', 'sqrt('], ['²', '^2'], ['x^', '^'], ['π', 'pi'], ['∞', 'inf'], ['≤', '<='], ['≥', '>='], ['∪', ' U '], ['±', '±'], ['|x|', '|'], ['{ }', '{'], ['( )', '(']].forEach(([lab, txt]) => {
        const b = h('<button type="button" class="pal-btn" title="insert">' + esc(lab) + '</button>');
        b.addEventListener('mousedown', e => e.preventDefault());
        b.addEventListener('click', () => insertAtCursor(card._lastInput || inputs.find(i => i.el.tagName === 'INPUT').el, txt));
        pal.appendChild(b);
      });
    } else pal.remove();
    $('.act-check', card).addEventListener('click', check);

    let checkedOnce = false;
    function check() {
      const fb = $('.ex-feedback', card);
      const results = inputs.map(i => C.checkAnswer(i.get(), i.spec));
      const allOk = results.every(r => r.ok);
      let html = '';
      results.forEach((r, i) => {
        const label = isMulti ? '<strong>' + esc((inputs[i].spec.label || 'Part ' + (i + 1)).replace(/\$/g, '')) + ':</strong> ' : '';
        html += '<div class="fb-line ' + (r.ok ? 'fb-ok' : r.error ? 'fb-err' : 'fb-bad') + '">' + (r.ok ? '✓ ' : '✗ ') + label + esc(r.message) +
          (r.readAs && !r.ok && !r.error ? ' <span class="fb-readas">(read as ' + R.tex(r.readAs) + ')</span>' : '') + '</div>';
      });
      if (allOk) html += '<div class="fb-celebrate">' + pick(['Nice work! 🎉', 'Correct — well done! 🌟', 'Yes! That’s right. ✨', 'Great — you’ve got it. 💪']) + '</div>';
      fb.innerHTML = html; fb.hidden = false;
      if (opts.practice) {
        if (!checkedOnce) { S.recordPractice(ex.gen, allOk); checkedOnce = true; if (opts.onResult) opts.onResult(allOk); }
      } else {
        const rec = S.ex(ex.id) || {};
        S.setEx(ex.id, { attempts: (rec.attempts || 0) + 1, correct: !!(rec.correct || allOk), last: isMulti ? undefined : inputs[0].get() });
        updateBadge();
        if (opts.onProgress) opts.onProgress();
      }
      card._lastResults = results;
    }
    function updateBadge() {
      const st = S.ex(ex.id); const b = $('.badge', card); if (!b) return;
      const s = st && st.correct ? 'done' : st && st.attempts ? 'tried' : 'new';
      b.className = 'badge badge-' + s; b.textContent = { done: '✓ done', tried: 'in progress', new: 'not started' }[s];
    }

    // hints
    if (ex.hints && ex.hints.length) {
      let shown = (stored && stored.hints) || 0;
      const btn = $('.act-hint', card), box = $('.ex-hints', card);
      const render = () => {
        box.innerHTML = ex.hints.slice(0, shown).map((t, i) => '<div class="hint"><span class="hint-n">Hint ' + (i + 1) + '</span>' + R.md(t) + '</div>').join('');
        $('.hint-count', btn).textContent = shown < ex.hints.length ? '(' + shown + '/' + ex.hints.length + ')' : '(all shown)';
        btn.disabled = shown >= ex.hints.length;
      };
      btn.addEventListener('click', () => { shown++; if (!opts.practice) S.setEx(ex.id, { hints: shown }); render(); });
      render();
    }

    // solution
    $('.act-solution', card).addEventListener('click', () => {
      const box = $('.ex-solution', card);
      if (!box.hidden) { box.hidden = true; $('.act-solution', card).textContent = '📖 Show solution'; return; }
      box.innerHTML = solutionHtml(ex);
      box.hidden = false; $('.act-solution', card).textContent = '📖 Hide solution';
      if (!opts.practice) S.setEx(ex.id, { viewedSolution: true });
    });

    // working
    $('.act-working', card).addEventListener('click', () => {
      const box = $('.ex-working', card);
      if (!box.hidden) { box.hidden = true; return; }
      if (!box.innerHTML) buildWorking(box);
      box.hidden = false;
      $('textarea', box).focus();
    });
    function buildWorking(box) {
      const spec = primarySpec(ex);
      const ph = (ex.working && ex.working.placeholder) || defaultPlaceholder(spec);
      box.innerHTML = '<div class="working-intro">Write your working <strong>one step per line</strong>. Each line is tested against the correct answer, so you can see exactly where a slip happens. Plain-English notes are fine — they are skipped.</div>' +
        '<textarea class="working-text" rows="7" spellcheck="false" placeholder="' + esc(ph) + '"></textarea>' +
        '<div class="working-ctrl"><button class="btn btn-primary act-check-working">Check my working</button> <button class="btn act-ai">🤖 AI feedback</button> <span class="working-mode">' + modeLabel(spec) + '</span></div>' +
        '<div class="working-results"></div><div class="ai-results"></div>';
      const ta = $('textarea', box);
      ta.addEventListener('focus', () => { card._lastInput = ta; });
      if (stored && stored.working) ta.value = stored.working;
      $('.act-check-working', box).addEventListener('click', () => {
        const res = C.checkWorking(ta.value, spec);
        if (!opts.practice) S.setEx(ex.id, { working: ta.value });
        $('.working-results', box).innerHTML = workingHtml(res);
        card._lastWorking = res;
      });
      $('.act-ai', box).addEventListener('click', () => aiFeedback(ex, spec, ta.value, box));
    }
    function aiFeedback(ex, spec, working, box) {
      const out = $('.ai-results', box);
      if (!S.apiKey) { out.innerHTML = '<div class="ai-box ai-warn">To use AI feedback, add your Anthropic API key in <a href="#/settings">Settings</a>. The built-in checker above works without it.</div>'; return; }
      const res = C.checkWorking(working, spec);
      const checkerText = res.lines.length ? res.lines.map(l => 'line ' + l.n + ' [' + l.status + ']: ' + l.raw + '  -> ' + l.message).join('\n') + '\nSummary: ' + res.summary : '(no working)';
      const studentAnswer = inputs.map((i, k) => (isMulti ? (i.spec.label || 'part ' + (k + 1)) + ': ' : '') + (i.get() || '(blank)')).join('; ');
      const answerText = parts.map((p, k) => (isMulti ? (p.label || 'part ' + (k + 1)) + ': ' : '') + '$' + specAnswerTex(p) + '$').join('; ');
      const solutionText = solutionPlain(ex);
      out.innerHTML = '<div class="ai-box ai-loading">Asking ' + esc(S.setting('model')) + '… (this usually takes a few seconds)</div>';
      CH.AI.feedback({ problem: ex.prompt, answer: answerText, solution: solutionText, studentAnswer, working, checker: checkerText },
        { apiKey: S.apiKey, model: S.setting('model'), name: S.setting('name') })
        .then(r => { out.innerHTML = '<div class="ai-box"><div class="ai-title">🤖 Feedback from ' + esc(r.model) + '</div>' + R.md(r.text) + '</div>'; })
        .catch(e => { out.innerHTML = '<div class="ai-box ai-warn">' + esc(e.message) + '</div>'; });
    }
    if (opts.practice) $('.act-next', card).addEventListener('click', () => opts.onNext && opts.onNext());
    return card;
  }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function insertAtCursor(inp, txt) {
    if (!inp) return;
    const s = inp.selectionStart ?? inp.value.length, e = inp.selectionEnd ?? s;
    inp.value = inp.value.slice(0, s) + txt + inp.value.slice(e);
    inp.focus(); inp.selectionStart = inp.selectionEnd = s + txt.length;
    inp.dispatchEvent(new Event('input'));
  }
  function showReadAs(text, spec, box) {
    if (!text.trim()) { box.innerHTML = ''; return; }
    try {
      let tex;
      switch (spec.type) {
        case 'number': case 'expression': tex = P.toLatex(P.parse(text)); break;
        case 'set': tex = C.setToLatex(C.parseNumberSet(text, spec.vars ? spec.vars[0] : 'x')); break;
        case 'interval': tex = C.intervalsToLatex(C.parseIntervalSet(text, spec.vars ? spec.vars[0] : 'x')); break;
        case 'equation': { const r = P.parseRelation(text); tex = r ? P.relationToLatex(r) : null; break; }
        case 'point': { const p = C.parsePoint(text); tex = '(' + C.fmtTex(p[0]) + ',\\, ' + C.fmtTex(p[1]) + ')'; break; }
      }
      box.innerHTML = tex ? '<span class="readas-label">read as</span> ' + R.tex(tex) : '';
      box.classList.remove('readas-err');
    } catch (e) { box.innerHTML = '<span class="readas-label">hmm:</span> ' + esc(e.message); box.classList.add('readas-err'); }
  }
  function defaultPlaceholder(spec) {
    switch (spec.type) {
      case 'set': return 'x^2 + 5x - 24 = 0\n(x + 8)(x - 3) = 0\nx = -8 or x = 3';
      case 'interval': return '2x + 1 <= 3x + 7\n-x <= 6\nx >= -6\n[-6, inf)';
      case 'equation': return 'y + 3 = -5/2 (x - 1)\n2y + 6 = -5x + 5\n5x + 2y = -1';
      case 'expression': return spec.solveFor ? '2xy + 5 = 3x + 3\nx(2y - 3) = -2\nx = -2/(2y - 3)' : '1/(x-3) - 6/((x-3)(x+3))\n= (x + 3 - 6)/((x-3)(x+3))\n= 1/(x+3)';
      default: return 'let x = 0.1515...\n100x = 15.1515...\n99x = 15\nx = 15/99 = 5/33';
    }
  }
  function modeLabel(spec) {
    const m = { number: 'each line should equal the answer', expression: 'each line should stay equivalent', set: 'true solutions must satisfy every line', interval: 'each line should keep the same solution set', equation: 'each line should describe the same line/curve' };
    if (spec.solveFor) return 'each equation must hold for the correct ' + spec.solveFor;
    return m[spec.type] || 'step checking not available for this type';
  }
  function workingHtml(res) {
    if (!res.lines.length) return '<div class="wk-summary">' + esc(res.summary) + '</div>';
    const icon = { ok: '✓', bad: '✗', note: '…', skip: '–', info: 'i', error: '?' };
    let html = '<div class="wk-summary ' + (res.bad ? 'wk-bad' : res.checked ? 'wk-ok' : '') + '">' + esc(res.summary) + '</div><ol class="wk-lines">';
    for (const l of res.lines) {
      html += '<li class="wk-' + l.status + '"><span class="wk-icon">' + icon[l.status] + '</span><div class="wk-body"><div class="wk-line">' + (l.tex ? R.tex(l.tex) : esc(l.raw)) + '</div><div class="wk-msg">' + esc(l.message) + '</div></div></li>';
    }
    return html + '</ol>';
  }
  function solutionHtml(ex) {
    const steps = ex.solution ? (Array.isArray(ex.solution) ? ex.solution : [ex.solution]) : [];
    let html = '<div class="solution-title">Worked solution</div>';
    if (steps.length) html += '<ol class="solution-steps">' + steps.map(s => { const st = typeof s === 'string' ? { text: s } : s; return '<li>' + R.md(st.text) + (st.math ? '<div class="step-math">' + R.tex(st.math, true) + '</div>' : '') + '</li>'; }).join('') + '</ol>';
    const parts = partsOf(ex);
    html += '<div class="solution-answer"><strong>Answer:</strong> ' + parts.map(p => (parts.length > 1 ? R.md(p.label || '').replace(/^<p>|<\/p>$/g, '') + ' ' : '') + R.tex(specAnswerTex(p))).join('; &nbsp;') + '</div>';
    return html;
  }
  function solutionPlain(ex) {
    const steps = ex.solution ? (Array.isArray(ex.solution) ? ex.solution : [ex.solution]) : [];
    return steps.map(s => typeof s === 'string' ? s : s.text + (s.math ? ' $$' + s.math + '$$' : '')).join('\n');
  }

  // ---------- generated practice ----------
  function makeGenerated(section, gen, seed) {
    seed = seed || (Math.floor(Math.random() * 1e9) + 1);
    const rng = M.makeRng(seed);
    const q = gen.make(rng);
    return Object.assign({ id: 'gen:' + gen.id + ':' + seed, gen: gen.id, seed, hints: [] }, q);
  }
  function practiceStatsHtml(genId) {
    const p = S.practice(genId);
    if (!p.attempts) return '<span class="pstat">not tried yet</span>';
    return '<span class="pstat">' + p.correct + '/' + p.attempts + ' correct' + (p.streak >= 3 ? ' · 🔥 streak ' + p.streak : '') + '</span>';
  }

  // ---------- pages ----------
  function setMode(mode) { document.body.dataset.mode = mode; }
  function progressBar(stats) {
    const pct = stats.total ? Math.round(100 * stats.done / stats.total) : 0;
    return '<div class="progress" title="' + stats.done + ' of ' + stats.total + ' exercises done"><div class="progress-fill" style="width:' + pct + '%"></div></div><span class="progress-txt">' + stats.done + '/' + stats.total + '</span>';
  }

  function renderHome() {
    setMode('learn');
    const name = S.setting('name') || 'Z';
    const last = S.lastVisited && CH.sectionById(S.lastVisited);
    let html = '<div class="page home">';
    html += '<section class="hero"><h1>Hi ' + esc(name) + ' 👋</h1><p class="lead">Your own precalculus textbook — read a topic, watch it worked through step by step, then practise with instant marking of your answers <em>and</em> your working.</p>';
    html += '<div class="hero-actions">' + (last ? '<a class="btn btn-primary" href="#/s/' + last.id + '">Continue: ' + esc(last.id + ' ' + last.title) + '</a>' : '<a class="btn btn-primary" href="#/s/' + (CH.sections[0] ? CH.sections[0].id : '') + '">Start at the beginning</a>') +
      '<a class="btn" href="#/practice/1">🎲 Mixed practice</a><a class="btn btn-ghost" href="#/help">How to type maths</a></div></section>';
    html += '<section class="how"><div class="how-step"><div class="how-n">1</div><div><strong>Learn</strong><br>Short, plain-English explanations with pictures.</div></div><div class="how-step"><div class="how-n">2</div><div><strong>See examples</strong><br>Reveal worked solutions one step at a time.</div></div><div class="how-step"><div class="how-n">3</div><div><strong>Practise</strong><br>Type an answer to get it marked; write your steps to find slips.</div></div></section>';
    for (const ch of CH.chapters) {
      html += '<section class="chapter"><h2><span class="ch-num">Chapter ' + ch.num + '</span> ' + esc(ch.title) + '</h2>' + (ch.blurb ? '<p class="muted">' + esc(ch.blurb) + '</p>' : '') + '<div class="section-grid">';
      for (const s of CH.sectionsOf(ch.num)) {
        const st = S.sectionStats(s);
        html += '<a class="section-card" href="#/s/' + s.id + '"><div class="sc-id">' + s.id + '</div><div class="sc-title">' + esc(s.title) + '</div><div class="sc-summary">' + esc(s.summary || '') + '</div><div class="sc-progress">' + progressBar(st) + '</div></a>';
      }
      html += '</div></section>';
    }
    html += '</div>';
    main().innerHTML = html;
  }

  function renderSection(id, tab) {
    const s = CH.sectionById(id);
    if (!s) { main().innerHTML = '<div class="page"><p>Section not found.</p></div>'; return; }
    S.visit(id);
    const isPractice = tab === 'exercises' || tab === 'practice';
    setMode(isPractice ? 'practice' : 'learn');
    const ch = CH.chapterOf(s);
    const list = CH.sectionsOf(s.chapter);
    const idx = list.indexOf(s);
    const st = S.sectionStats(s);
    const tabs = [['learn', '📘 Learn'], ['examples', '🧭 Examples (' + s.examples.length + ')'], ['exercises', '✏️ Exercises (' + st.done + '/' + s.exercises.length + ')'], ['practice', '🎲 Practice']];
    let html = '<div class="page section-page"><div class="section-head"><div class="crumb"><a href="#/">Home</a> › Chapter ' + s.chapter + (ch ? ': ' + esc(ch.title) : '') + '</div><h1><span class="sec-id">' + s.id + '</span> ' + esc(s.title) + '</h1>' + (s.summary ? '<p class="lead">' + esc(s.summary) + '</p>' : '') + '</div>';
    html += '<nav class="tabs">' + tabs.map(([k, label]) => '<a class="tab' + (k === tab ? ' active' : '') + '" href="#/s/' + s.id + '/' + k + '">' + label + '</a>').join('') + '</nav>';
    html += '<div class="tab-body" id="tab-body"></div>';
    html += '<nav class="pager">' + (idx > 0 ? '<a href="#/s/' + list[idx - 1].id + '/' + tab + '">← ' + list[idx - 1].id + ' ' + esc(list[idx - 1].title) + '</a>' : '<span></span>') + (idx < list.length - 1 ? '<a href="#/s/' + list[idx + 1].id + '/' + tab + '">' + list[idx + 1].id + ' ' + esc(list[idx + 1].title) + ' →</a>' : '<span></span>') + '</nav></div>';
    main().innerHTML = html;
    const body = $('#tab-body');
    if (tab === 'learn') {
      body.innerHTML = '<div class="theory">' + s.theory.map(R.block).join('\n') + '</div>' +
        '<div class="next-up">Ready to see it in action? <a class="btn btn-primary" href="#/s/' + s.id + '/examples">Worked examples →</a></div>';
      mountWidgets(body);
    } else if (tab === 'examples') {
      body.innerHTML = s.examples.length ? s.examples.map((ex, i) => R.exampleHtml(Object.assign({ label: 'Example ' + (i + 1) }, ex))).join('') + '<div class="next-up">Now try it yourself. <a class="btn btn-primary" href="#/s/' + s.id + '/exercises">Exercises →</a></div>' : '<p class="muted">No worked examples yet.</p>';
    } else if (tab === 'exercises') {
      body.innerHTML = '<div class="ex-intro">Type your answer and press <strong>Check</strong>. Open <em>Check my working</em> to have each step tested. Progress is saved in this browser.</div><div class="ex-list"></div>' +
        '<div class="next-up">Want more? Every question here has an endless randomised version. <a class="btn btn-primary" href="#/s/' + s.id + '/practice">Practice →</a></div>';
      const list = $('.ex-list', body);
      s.exercises.forEach((ex, i) => list.appendChild(exerciseCard(ex, { label: 'Exercise ' + (i + 1), onProgress: () => { const st2 = S.sectionStats(s); $$('.tab', main())[2].textContent = '✏️ Exercises (' + st2.done + '/' + s.exercises.length + ')'; refreshSidebar(); } })));
    } else if (tab === 'practice') {
      body.innerHTML = '<div class="ex-intro">Each generator makes a fresh question every time. Answers, hints and full solutions are generated with it.</div><div class="gen-list"></div>';
      const list = $('.gen-list', body);
      s.generators.forEach(gen => {
        const box = h('<div class="gen"><div class="gen-head"><div><div class="gen-title">' + esc(gen.title) + '</div>' + (gen.desc ? '<div class="gen-desc muted">' + R.md(gen.desc) + '</div>' : '') + '</div><div class="gen-right"><span class="gen-stats">' + practiceStatsHtml(gen.id) + '</span><button class="btn btn-primary btn-sm act-gen">New question</button></div></div><div class="gen-body"></div></div>');
        const show = () => {
          const ex = makeGenerated(s, gen);
          const bodyEl = $('.gen-body', box);
          bodyEl.innerHTML = '';
          bodyEl.appendChild(exerciseCard(ex, { practice: true, label: gen.title, onNext: show, onResult: () => { $('.gen-stats', box).innerHTML = practiceStatsHtml(gen.id); } }));
        };
        $('.act-gen', box).addEventListener('click', show);
        list.appendChild(box);
      });
      if (!s.generators.length) list.innerHTML = '<p class="muted">No practice generators for this section yet.</p>';
    }
    refreshSidebar();
    window.scrollTo({ top: 0 });
  }

  function mountWidgets(rootEl) {
    $$('.widget[data-widget]', rootEl).forEach(el => {
      const w = CH.widgets && CH.widgets[el.dataset.widget];
      if (w) { try { w(el); } catch (e) { el.innerHTML = '<p class="muted">Widget error: ' + esc(e.message) + '</p>'; } }
    });
  }

  function renderMixedPractice(chNum) {
    setMode('practice');
    chNum = parseInt(chNum, 10) || (CH.chapters[0] && CH.chapters[0].num);
    const ch = CH.chapters.find(c => c.num === chNum);
    const secs = CH.sectionsOf(chNum);
    const gens = [];
    secs.forEach(s => s.generators.forEach(g => gens.push({ s, g })));
    let html = '<div class="page"><div class="section-head"><div class="crumb"><a href="#/">Home</a> › Mixed practice</div><h1>🎲 Mixed practice' + (ch ? ' — ' + esc(ch.title) : '') + '</h1><p class="lead">Random questions from across the chapter, like a revision test. Tick the topics you want.</p></div>';
    html += '<div class="mix-filters">' + secs.map(s => '<label class="chk"><input type="checkbox" checked data-sec="' + s.id + '"> ' + s.id + ' ' + esc(s.title) + '</label>').join('') + '</div>';
    html += '<div class="mix-score" id="mix-score"></div><div id="mix-body"></div><div class="mix-ctrl"><button class="btn btn-primary" id="mix-next">Next question →</button></div></div>';
    main().innerHTML = html;
    let score = { n: 0, ok: 0 };
    const next = () => {
      const chosen = new Set($$('.mix-filters input:checked').map(i => i.dataset.sec));
      const pool = gens.filter(x => chosen.has(x.s.id));
      if (!pool.length) { $('#mix-body').innerHTML = '<p class="muted">Tick at least one topic.</p>'; return; }
      const { s, g } = pool[Math.floor(Math.random() * pool.length)];
      const ex = makeGenerated(s, g);
      const body = $('#mix-body'); body.innerHTML = '';
      body.appendChild(exerciseCard(ex, { practice: true, label: s.id + ' · ' + g.title, onNext: next, onResult: ok => { score.n++; if (ok) score.ok++; $('#mix-score').textContent = 'This session: ' + score.ok + ' / ' + score.n + ' correct'; } }));
      window.scrollTo({ top: 0 });
    };
    $('#mix-next').addEventListener('click', next);
    next();
  }

  function renderSettings() {
    setMode('learn');
    const models = CH.AI.MODELS;
    let html = '<div class="page settings"><h1>Settings</h1>';
    html += '<section class="card"><h2>You</h2><label class="field">Name <input type="text" id="set-name" value="' + esc(S.setting('name') || '') + '"></label>' +
      '<label class="field">Theme <select id="set-theme">' + ['auto', 'light', 'dark'].map(t => '<option value="' + t + '"' + (S.setting('theme') === t ? ' selected' : '') + '>' + t + '</option>').join('') + '</select></label></section>';
    html += '<section class="card"><h2>AI feedback (optional)</h2><p>Everything on this site works without AI. If you add an <a href="https://console.anthropic.com/" target="_blank" rel="noopener">Anthropic API key</a>, the <em>AI feedback</em> button on each exercise sends the question, the model answer, and your working to Claude and shows its comments. The key is stored only in this browser (localStorage) and is sent only to <code>api.anthropic.com</code>. Use a key with a spending limit.</p>' +
      '<label class="field">API key <span class="key-row"><input type="password" id="set-key" value="' + esc(S.apiKey) + '" placeholder="sk-ant-…" autocomplete="off"><button class="btn btn-sm" id="key-show" type="button">show</button></span></label>' +
      '<label class="field">Model <select id="set-model">' + models.map(m => '<option value="' + m.id + '"' + (S.setting('model') === m.id ? ' selected' : '') + '>' + esc(m.label) + '</option>').join('') + '</select></label>' +
      '<div class="row"><button class="btn" id="key-test">Test the key</button> <span id="key-status" class="muted"></span></div></section>';
    html += '<section class="card"><h2>Progress</h2><p>Progress lives in this browser. Export it to move to another device.</p><div class="row"><button class="btn" id="prog-export">Export progress</button> <label class="btn">Import progress <input type="file" id="prog-import" accept="application/json" hidden></label> <button class="btn btn-danger" id="prog-reset">Reset all progress</button></div><p id="prog-status" class="muted"></p></section></div>';
    main().innerHTML = html;
    $('#set-name').addEventListener('input', e => S.setting('name', e.target.value.trim() || 'Z'));
    $('#set-theme').addEventListener('change', e => { S.setting('theme', e.target.value); applyTheme(); });
    $('#set-key').addEventListener('input', e => { S.apiKey = e.target.value.trim(); });
    $('#key-show').addEventListener('click', () => { const i = $('#set-key'); i.type = i.type === 'password' ? 'text' : 'password'; $('#key-show').textContent = i.type === 'password' ? 'show' : 'hide'; });
    $('#set-model').addEventListener('change', e => S.setting('model', e.target.value));
    $('#key-test').addEventListener('click', () => {
      const st = $('#key-status'); st.textContent = 'Testing…';
      CH.AI.testKey(S.apiKey, S.setting('model')).then(r => { st.textContent = '✓ Works (' + r.model + ')'; }).catch(e => { st.textContent = '✗ ' + e.message; });
    });
    $('#prog-export').addEventListener('click', () => {
      const blob = new Blob([S.exportJSON()], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'calchelper-progress.json'; a.click();
    });
    $('#prog-import').addEventListener('change', e => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then(t => { S.importJSON(t); $('#prog-status').textContent = 'Imported.'; refreshSidebar(); }).catch(err => { $('#prog-status').textContent = err.message; });
    });
    $('#prog-reset').addEventListener('click', () => { if (confirm('Really delete all saved progress?')) { S.reset(); $('#prog-status').textContent = 'Progress reset.'; refreshSidebar(); } });
  }

  function renderHelp() {
    setMode('learn');
    const rows = [
      ['Multiply', '`2x`, `3(x+1)`, `2*x`, `xy`', '$2x,\\ 3(x+1),\\ 2x,\\ xy$'],
      ['Divide / fraction', '`3/8`, `(x+1)/(x-2)`', '$\\tfrac{3}{8},\\ \\tfrac{x+1}{x-2}$'],
      ['Power', '`x^2`, `2^-1`, `x^(1/2)`, or `x²`', '$x^2,\\ 2^{-1},\\ x^{1/2}$'],
      ['Square root', '`sqrt(2)`, `√2`, `sqrt(x+1)`', '$\\sqrt2,\\ \\sqrt{x+1}$'],
      ['Cube / nth root', '`cbrt(8)`, `root(32, 5)`, `27^(1/3)`', '$\\sqrt[3]{8},\\ \\sqrt[5]{32}$'],
      ['Absolute value', '`|x-3|`, `abs(x-3)`', '$|x-3|$'],
      ['Repeating decimal', '`0.666...`, `0.181818...`', '$0.\\overline{6},\\ 0.\\overline{18}$'],
      ['π and ∞', '`pi`, `inf` (or `π`, `∞`)', '$\\pi,\\ \\infty$'],
      ['Solution set', '`{-8, 3}` or `x = -8 or x = 3` or `no solution`', '$\\{-8, 3\\}$'],
      ['Interval', '`[-2, 0] U [7, inf)` or `x >= 7` or `-2 <= x <= 0`', '$[-2,0]\\cup[7,\\infty)$'],
      ['Plus-or-minus', '`x = 4 ± sqrt(3)` (in sets and working)', '$x = 4 \\pm \\sqrt3$'],
      ['Point', '`(3, -1)`', '$(3,-1)$'],
      ['Equation of a line/circle', '`5x + 2y = -1`, `(x-2)^2 + (y+5)^2 = 25`', '$5x+2y=-1$']
    ];
    let html = '<div class="page help"><h1>How to type maths</h1><p class="lead">Type answers the way you would on a calculator. The little <em>read as</em> preview under each box shows how your answer was understood — check it if something is marked wrong.</p>';
    html += '<div class="table-wrap"><table><tr><th>To write…</th><th>Type</th><th>Means</th></tr>' + rows.map(r => '<tr><td>' + r[0] + '</td><td>' + R.inline(r[1]) + '</td><td>' + R.md(r[2]).replace(/^<p>|<\/p>$/g, '') + '</td></tr>').join('') + '</table></div>';
    html += R.md('## Good to know\n\n- `1/2x` means $\\tfrac12 x$. For $\\tfrac{1}{2x}$ type `1/(2x)`.\n- `-x^2` means $-(x^2)$, as in maths. For $(-x)^2$ use brackets.\n- Any answer that is **algebraically equivalent** is accepted (e.g. `(x+3)(x+4)` and `x^2+7x+12`), unless the question asks for a particular form such as *factored* or *simplified*.\n- Decimals are fine when exact: `0.5` for $\\tfrac12$. But `0.33` is not $\\tfrac13$ — use `1/3` or `0.333...`.\n\n## How “Check my working” works\n\nWrite one step per line. The checker does not read your mind — it tests each line numerically:\n\n- **Simplifying:** every line must still be equal to the original expression (tested at random values).\n- **Solving an equation:** the true solutions must still satisfy every line. If a line fails, the slip is on that line or just before it. A line like `x = 4 or x = -1` is compared with the real solution set, so extraneous solutions get flagged.\n- **Inequalities:** each line must have the same solution set as the original (tested at points around the boundaries — this catches a forgotten sign flip).\n- **Lines and circles:** each equation must describe the same graph.\n\nSentences such as “multiply both sides by 10” are skipped, so feel free to annotate your steps.');
    html += '</div>';
    main().innerHTML = html;
  }

  // ---------- sidebar ----------
  function buildSidebar() {
    const sb = $('#sidebar');
    let html = '';
    for (const ch of CH.chapters) {
      html += '<div class="sb-ch">Chapter ' + ch.num + ' · ' + esc(ch.title) + '</div><ul class="sb-list">';
      for (const s of CH.sectionsOf(ch.num)) html += '<li><a href="#/s/' + s.id + '" data-sec="' + s.id + '"><span class="sb-id">' + s.id + '</span><span class="sb-title">' + esc(s.title) + '</span><span class="sb-dot" data-dot="' + s.id + '"></span></a></li>';
      html += '</ul>';
    }
    html += '<div class="sb-ch">More</div><ul class="sb-list"><li><a href="#/practice/1">🎲 Mixed practice</a></li><li><a href="#/help">⌨️ Typing maths</a></li><li><a href="#/settings">⚙️ Settings</a></li></ul>';
    sb.innerHTML = html;
    refreshSidebar();
  }
  function refreshSidebar() {
    const cur = (location.hash.match(/^#\/s\/([^/]+)/) || [])[1];
    $$('#sidebar a[data-sec]').forEach(a => a.classList.toggle('active', a.dataset.sec === cur));
    $$('#sidebar [data-dot]').forEach(d => {
      const s = CH.sectionById(d.dataset.dot); if (!s) return;
      const st = S.sectionStats(s);
      d.className = 'sb-dot ' + (st.total && st.done === st.total ? 'dot-done' : st.done ? 'dot-part' : '');
      d.title = st.done + '/' + st.total + ' done';
    });
  }

  // ---------- global click handling (worked examples) ----------
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const ex = btn.closest('.example'); if (!ex) return;
    const steps = $$('.step', ex), ans = $('.example-answer', ex);
    const revealed = () => steps.filter(s => !s.hidden).length;
    const act = btn.dataset.act;
    const showUpTo = n => { steps.forEach((s, i) => { s.hidden = i >= n; }); if (ans) ans.hidden = n < steps.length; $('[data-act=hide-steps]', ex).hidden = n === 0; $('[data-act=next-step]', ex).hidden = n >= steps.length; $('[data-act=all-steps]', ex).hidden = n >= steps.length; };
    if (act === 'next-step') showUpTo(revealed() + 1);
    else if (act === 'all-steps') showUpTo(steps.length);
    else if (act === 'hide-steps') showUpTo(0);
  });

  // ---------- routing ----------
  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
    $('#sidebar').classList.remove('open');
    try {
      if (!parts.length) renderHome();
      else if (parts[0] === 's') renderSection(parts[1], parts[2] || 'learn');
      else if (parts[0] === 'practice') renderMixedPractice(parts[1]);
      else if (parts[0] === 'settings') renderSettings();
      else if (parts[0] === 'help') renderHelp();
      else renderHome();
    } catch (e) {
      main().innerHTML = '<div class="page"><h1>Something went wrong</h1><pre>' + esc(e.stack || e.message) + '</pre></div>';
      console.error(e);
    }
    refreshSidebar();
  }

  function init() {
    applyTheme();
    buildSidebar();
    $('#menu-btn').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
    $('#theme-btn').addEventListener('click', () => {
      const cur = S.setting('theme') || 'auto';
      const dark = cur === 'dark' || (cur === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      S.setting('theme', dark ? 'light' : 'dark'); applyTheme();
    });
    window.addEventListener('hashchange', route);
    route();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
