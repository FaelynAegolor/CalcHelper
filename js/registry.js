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
  CH.sectionById = id => CH.sections.find(s => s.id === id) || null;
  CH.chapterOf = s => CH.chapters.find(c => c.num === s.chapter) || null;
  CH.sectionsOf = num => CH.sections.filter(s => s.chapter === num);
})(typeof window !== 'undefined' ? window : globalThis);
