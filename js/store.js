/* CalcHelper — progress and settings, kept in the browser's localStorage. */
(function (root) {
  'use strict';
  const KEY = 'calchelper.v1';
  const KEY_API = 'calchelper.apikey';
  let data = null;

  function load() {
    if (data) return data;
    try { data = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { data = null; }
    if (!data || typeof data !== 'object') data = {};
    data.exercises = data.exercises || {};
    data.practice = data.practice || {};
    data.settings = Object.assign({ name: 'Z', theme: 'auto', model: 'claude-opus-5' }, data.settings || {});
    data.visited = data.visited || {};
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
    get apiKey() { try { return localStorage.getItem(KEY_API) || ''; } catch (e) { return ''; } },
    set apiKey(v) { try { if (v) localStorage.setItem(KEY_API, v); else localStorage.removeItem(KEY_API); } catch (e) { /* ignore */ } },
    visit(sectionId) { const d = load(); d.visited.last = sectionId; d.visited.at = Date.now(); save(); },
    get lastVisited() { return load().visited.last || null; },
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
    reset() { data = null; try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } load(); save(); }
  };
  root.CH = root.CH || {};
  root.CH.S = S;
})(typeof window !== 'undefined' ? window : globalThis);
