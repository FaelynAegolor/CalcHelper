/* CalcHelper — content registry. Content files call these as they load. */
(function (root) {
  'use strict';
  const CH = root.CH = root.CH || {};
  CH.chapters = [];
  CH.sections = [];
  CH.registerChapter = function (c) { CH.chapters.push(c); return c; };
  CH.registerSection = function (s) {
    s.exercises = s.exercises || [];
    s.examples = s.examples || [];
    s.generators = s.generators || [];
    s.theory = s.theory || [];
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
