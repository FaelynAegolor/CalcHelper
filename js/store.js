/* CalcHelper — progress and settings, kept in the browser's localStorage. */
(function (root) {
  'use strict';
  const KEY = 'calchelper.v1';
  const LOG_MAX = 5000;     // ~200 KB of log; oldest entries fall off the front
  let data = null;

  function load() {
    if (data) return data;
    try { data = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { data = null; }
    if (!data || typeof data !== 'object') data = {};
    data.exercises = data.exercises || {};
    data.practice = data.practice || {};
    data.settings = Object.assign({ name: 'Z', theme: 'auto' }, data.settings || {});
    data.visited = data.visited || {};
    data.log = Array.isArray(data.log) ? data.log : [];
    return data;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(load())); } catch (e) { /* private mode etc. */ }
  }
  const S = {
    get data() { return load(); },
    save,
    ex(id) { return load().exercises[id] || null; },
    setEx(id, patch) {
      const d = load();
      d.exercises[id] = Object.assign({ attempts: 0, correct: false, viewedSolution: false, hints: 0 }, d.exercises[id] || {}, patch);
      save();
      return d.exercises[id];
    },
    practice(genId) { return load().practice[genId] || { attempts: 0, correct: 0, streak: 0, best: 0 }; },
    recordPractice(genId, ok) {
      const d = load();
      const p = d.practice[genId] = Object.assign({ attempts: 0, correct: 0, streak: 0, best: 0 }, d.practice[genId] || {});
      p.attempts++;
      if (ok) { p.correct++; p.streak++; p.best = Math.max(p.best, p.streak); } else p.streak = 0;
      save();
      return p;
    },
    setting(k, v) {
      const d = load();
      if (v === undefined) return d.settings[k];
      d.settings[k] = v; save(); return v;
    },
    visit(sectionId) { const d = load(); d.visited.last = sectionId; d.visited.at = Date.now(); save(); },
    get lastVisited() { return load().visited.last || null; },
    /* Activity log. Entries are arrays rather than objects to keep localStorage small:
       [t, kind, ref, a, b] — js/insights.js documents the kinds and reads them back.
       Nothing is logged on page load, only on a real interaction, so opening the site
       without touching anything leaves no trace. */
    logEvent(kind, ref, a, b) {
      const d = load();
      const e = [Date.now(), kind, ref == null ? '' : String(ref)];
      if (a !== undefined) e.push(a);
      if (b !== undefined) e.push(b);
      d.log.push(e);
      if (d.log.length > LOG_MAX) d.log.splice(0, d.log.length - LOG_MAX);
      save();
    },
    sectionStats(section) {
      const ids = (section.exercises || []).map(e => e.id);
      const done = ids.filter(id => { const e = S.ex(id); return e && e.correct; }).length;
      const tried = ids.filter(id => { const e = S.ex(id); return e && e.attempts > 0; }).length;
      return { total: ids.length, done, tried };
    },
    exportJSON() { return JSON.stringify(load(), null, 2); },
    importJSON(text) {
      const obj = JSON.parse(text);
      if (!obj || typeof obj !== 'object' || !obj.exercises) throw new Error('That file does not look like CalcHelper progress.');
      data = obj; load(); save();
    },
    /* Clearing progress really does clear it. One marker event survives into the fresh
       log so the activity view can say "progress was reset on ..." rather than silently
       showing a gap. */
    reset() {
      data = null;
      try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
      load();
      data.log.push([Date.now(), 'r', '']);
      save();
    }
  };
  root.CH = root.CH || {};
  root.CH.S = S;
})(typeof window !== 'undefined' ? window : globalThis);
