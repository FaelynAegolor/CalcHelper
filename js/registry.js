/* CalcHelper — content registry. Content files call these as they load. */
(function (root) {
  'use strict';
  const CH = root.CH = root.CH || {};
  CH.chapters = [];
  CH.sections = [];
  CH.registerChapter = function (c) { CH.chapters.push(c); return c; };
  /* Generated questions are built by gluing numbers into templates, so a 1 or a 0
     or a negative lands where a person would never write it: 1x, -1(x - 5), x^{1},
     (x - 0)^2, -5 + -3. Each is correct, but to a nervous reader it looks like a
     typo — or a trick. tidyTex rewrites those spots in LaTeX. It is applied only to
     what a generator DISPLAYS; the answer value the checker uses is never touched. */
  CH.tidyTex = function (t) {
    if (typeof t !== 'string') return t;
    return t
      .replace(/(^|[^\d.}{^_\w\\])1(?=[a-zA-Z(]|\\sqrt|\\left)/g, '$1')       // 1x, 1(…), 1\sqrt → x, (…), \sqrt
      .replace(/\^\{1\}|\^1(?![\d./])/g, '')                                  // x^{1} → x
      .replace(/\+\s*-\s*/g, '- ')                                              // a + -b → a - b
      .replace(/-\s*-\s*(?=\d)/g, '+ ')                                         // a - -3 → a + 3
      .replace(/([a-z])\s*[-+]\s*0(?![\d.])(?=\s*[)}])/g, '$1')                 // (x - 0), \sqrt{x - 0} → (x), \sqrt{x}
      .replace(/\(([a-z])\)\^/g, '$1^')                                         // (x)^2 → x^2 (but f(x) is left alone)
      .replace(/(^|[^a-zA-Z])\(([a-z])\)(?=\()/g, '$1$2')                        // (x)(x - 6) → x(x - 6)
      .replace(/([a-z)}])\s*[+-]\s*0(?![\d.])(?=\s*(=|\)|$|,))/g, '$1');       // x + 0 = … → x = …
  };
  // only inside $…$ for prose; maths fields are LaTeX throughout
  const tidyProse = s => typeof s === 'string' ? s.replace(/(\$\$?)([^$]+)\1/g, (m, d, body) => d + CH.tidyTex(body) + d) : s;
  function tidyQuestion(q) {
    if (!q || typeof q !== 'object') return q;
    q.prompt = tidyProse(q.prompt);
    if (q.hints) q.hints = q.hints.map(tidyProse);
    if (q.solution) q.solution = q.solution.map(st => typeof st === 'string' ? tidyProse(st)
      : Object.assign({}, st, { text: tidyProse(st.text), math: CH.tidyTex(st.math) }));
    if (q.answer) {
      const fix = a => { if (a.display) a.display = CH.tidyTex(a.display); if (a.label) a.label = tidyProse(a.label); if (a.options) a.options.forEach(o => { o.label = tidyProse(o.label); }); if (a.parts) a.parts.forEach(fix); };
      fix(q.answer);
    }
    return q;
  }
  CH.registerSection = function (s) {
    s.exercises = s.exercises || [];
    s.examples = s.examples || [];
    s.generators = s.generators || [];
    s.theory = s.theory || [];
    s.generators.forEach(g => {
      const make = g.make;
      g.make = function (r) { return tidyQuestion(make.call(this, r)); };
    });
    CH.sections.push(s);
    return s;
  };
  /* Past exam papers. A question is shaped exactly like a section exercise, so the
     same card renders it: answer checking, hints one at a time, working checker. */
  CH.exams = [];
  CH.registerExam = function (e) {
    e.questions = e.questions || [];
    CH.exams.push(e);
    return e;
  };
  CH.examById = id => CH.exams.find(e => e.id === id) || null;
  /* A section carries `exam: 1` or `exam: 2` when it is examined on that midterm.
     Anything without one is extra reading — in the textbook but not on either
     paper. Those are hidden by default so the site only ever shows what is
     examinable; Settings has a switch to bring them back. */
  CH.isExtra = s => !s || !s.exam;
  CH.showExtra = () => !!(CH.S && CH.S.setting('showExtra'));
  CH.visibleSections = () => CH.showExtra() ? CH.sections.slice() : CH.sections.filter(s => !CH.isExtra(s));
  CH.extraCount = () => CH.sections.filter(CH.isExtra).length;
  CH.sectionById = id => CH.sections.find(s => s.id === id) || null;
  CH.chapterOf = s => CH.chapters.find(c => c.num === s.chapter) || null;
  /* Chapter listings follow the same rule, so nothing has to remember to filter. */
  CH.sectionsOf = num => CH.visibleSections().filter(s => s.chapter === num);
  CH.allSectionsOf = num => CH.sections.filter(s => s.chapter === num);
})(typeof window !== 'undefined' ? window : globalThis);
