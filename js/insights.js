/* CalcHelper — turns the raw activity log into the numbers the private activity view
   shows. Pure functions: no DOM, no storage, no network. Node requires this directly
   in the tests.

   Log entry shape (see CH.S.logEvent):
     [t, kind, ref, a, b]
       t     ms timestamp
       kind  'v' opened a section tab   ref = section id,  a = tab name
             'a' checked an exercise    ref = exercise id, a = 1 right / 0 wrong, b = attempt no.
             'p' checked a practice Q   ref = generator id, a = 1 right / 0 wrong
             'h' revealed a hint        ref = exercise id, a = hint number
             'x' revealed a solution    ref = exercise id
             'w' checked working        ref = exercise id, a = 1 all lines ok / 0 not
             'r' progress was reset     ref = ''

   Time is estimated by charging the gap between one event and the next to whatever she
   was looking at when the earlier one happened. A gap longer than SITTING_GAP means she
   walked away, so it is charged as TAIL instead and the next event starts a new sitting.
   Every minutes figure in here comes from that one pass, so the totals agree with each
   other by construction.

   Two different horizons live in here, and the view keeps them apart:
     - the log starts the day logging was added, so usage/time figures only go back that far
     - data.exercises has always carried attempts/correct/hints/viewedSolution, so the
       performance totals cover everything she has ever done. */
(function (root) {
  'use strict';
  const MIN = 60000, DAY = 86400000;
  const SITTING_GAP = 25 * MIN;  // a quiet stretch this long means she stopped
  const TAIL = 1 * MIN;          // credit for whatever she was reading when a sitting ended

  const sectionOf = ref => { const m = /^(\d+\.\d+)/.exec(String(ref || '')); return m ? m[1] : null; };
  const pad = n => (n < 10 ? '0' : '') + n;
  const dayKey = t => { const d = new Date(t); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  const startOfDay = t => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : null);
  const mins = ms => (ms > 0 ? Math.max(1, Math.round(ms / MIN)) : 0);
  function median(xs) {
    if (!xs.length) return 0;
    const s = xs.slice().sort((a, b) => a - b), m = s.length >> 1;
    return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
  }

  /* data: the raw CH.S.data object. sections: CH.sections. now: override for tests. */
  function compute(data, sections, now) {
    now = now || Date.now();
    sections = sections || [];
    const exData = (data && data.exercises) || {};
    const log = ((data && data.log) || [])
      .filter(e => Array.isArray(e) && Number.isFinite(e[0]) && typeof e[1] === 'string')
      .slice().sort((a, b) => a[0] - b[0]);

    const o = {
      now: now,
      events: log.length,
      // reset markers are bookkeeping, not activity: a log holding only those is empty
      activityEvents: log.filter(e => e[1] !== 'r').length,
      logFrom: log.length ? log[0][0] : null,
      lastSeen: log.length ? log[log.length - 1][0] : null,
      resets: log.filter(e => e[1] === 'r').map(e => e[0])
    };

    // ---- one pass: charge each gap to its day, its section and its sitting ----
    const perDay = new Map(), perSection = new Map(), perEx = new Map();
    const sittings = [];
    const touchDay = t => {
      const k = dayKey(t);
      if (!perDay.has(k)) perDay.set(k, { date: k, ms: 0, attempts: 0, right: 0, firstTry: 0, firstTryRight: 0, sittings: 0 });
      return perDay.get(k);
    };
    const touchSection = id => {
      if (!id) return null;
      if (!perSection.has(id)) perSection.set(id, { id: id, views: 0, ms: 0, attempts: 0, right: 0, firstTry: 0, firstTryRight: 0, hints: 0, solutions: 0, working: 0, practice: 0, practiceRight: 0, lastSeen: null });
      return perSection.get(id);
    };
    const touchEx = id => {
      if (!perEx.has(id)) perEx.set(id, { id: id, attempts: 0, right: 0, hints: 0, solution: false, firstRightAt: null, helpBeforeRight: false, lastAt: null });
      return perEx.get(id);
    };

    for (let i = 0; i < log.length; i++) {
      const t = log[i][0], kind = log[i][1], ref = log[i][2], a = log[i][3], b = log[i][4];
      const next = log[i + 1];
      const cont = !!next && next[0] - t <= SITTING_GAP;
      const gap = cont ? next[0] - t : TAIL;

      let sit = sittings[sittings.length - 1];
      if (!sit || sit.closed) { sit = { start: t, end: t, n: 0, ms: 0, closed: false }; sittings.push(sit); touchDay(t).sittings++; }
      sit.end = t; sit.n++; sit.ms += gap;
      if (!cont) sit.closed = true;

      touchDay(t).ms += gap;

      const sec = touchSection(kind === 'v' ? ref : sectionOf(ref));
      if (sec) { sec.ms += gap; sec.lastSeen = Math.max(sec.lastSeen || 0, t); }

      const day = touchDay(t);
      if (kind === 'v') { if (sec) sec.views++; }
      else if (kind === 'a') {
        const e = touchEx(ref);
        e.attempts++; e.lastAt = t;
        day.attempts++; if (sec) sec.attempts++;
        if (b === 1) { day.firstTry++; if (sec) sec.firstTry++; }
        if (a === 1) {
          e.right++; day.right++; if (sec) sec.right++;
          if (e.firstRightAt === null) { e.firstRightAt = t; if (e.hints > 0 || e.solution) e.helpBeforeRight = true; }
          if (b === 1) { day.firstTryRight++; if (sec) sec.firstTryRight++; }
        }
      } else if (kind === 'h') {
        const e = touchEx(ref);
        if (e.firstRightAt === null) e.hints = Math.max(e.hints, a || 1);
        if (sec) sec.hints++;
      } else if (kind === 'x') {
        const e = touchEx(ref);
        if (e.firstRightAt === null) e.solution = true;
        if (sec) sec.solutions++;
      } else if (kind === 'w') { if (sec) sec.working++; }
      else if (kind === 'p') { if (sec) { sec.practice++; if (a === 1) sec.practiceRight++; } }
    }

    o.sittings = sittings.length;
    o.minutesTotal = mins(sittings.reduce((acc, s) => acc + s.ms, 0));
    o.medianSittingMin = median(sittings.map(s => mins(s.ms)));
    o.minutes7 = mins(sittings.filter(s => s.start > now - 7 * DAY).reduce((acc, s) => acc + s.ms, 0));
    o.minutes30 = mins(sittings.filter(s => s.start > now - 30 * DAY).reduce((acc, s) => acc + s.ms, 0));
    o.sittings7 = sittings.filter(s => s.start > now - 7 * DAY).length;
    o.sittings30 = sittings.filter(s => s.start > now - 30 * DAY).length;
    // the week before last, so the view can show "up 12 min on the previous 7 days"
    const prev = sittings.filter(s => s.start > now - 14 * DAY && s.start <= now - 7 * DAY);
    o.minutes7prev = mins(prev.reduce((acc, s) => acc + s.ms, 0));
    o.sittings7prev = prev.length;

    o.byHour = new Array(24).fill(0);
    o.byWeekday = new Array(7).fill(0);
    for (const s of sittings) { o.byHour[new Date(s.start).getHours()]++; o.byWeekday[new Date(s.start).getDay()]++; }

    // ---- 8-week strip, 14-day bar, active days ------------------------------
    const today = startOfDay(now);
    o.days = [];
    for (let i = 55; i >= 0; i--) {
      const t = today - i * DAY, d = perDay.get(dayKey(t));
      o.days.push({ date: dayKey(t), t: t, minutes: d ? mins(d.ms) : 0, attempts: d ? d.attempts : 0, sittings: d ? d.sittings : 0 });
    }
    o.last14 = o.days.slice(-14);
    o.activeDays7 = o.days.slice(-7).filter(d => d.minutes > 0).length;
    o.activeDays30 = o.days.slice(-30).filter(d => d.minutes > 0).length;
    o.activeDaysTotal = [...perDay.values()].filter(d => d.ms > 0).length;

    // ---- streaks: today not yet active does not break a run -----------------
    const active = new Set([...perDay.keys()].filter(k => perDay.get(k).ms > 0));
    let anchor = null;
    if (active.has(dayKey(today))) anchor = today;
    else if (active.has(dayKey(today - DAY))) anchor = today - DAY;
    let cur = 0;
    while (anchor !== null && cur < 400 && active.has(dayKey(anchor - cur * DAY))) cur++;
    o.streak = cur;

    let longest = 0, run = 0, prevT = null;
    for (const k of [...active].sort()) {
      const t = new Date(k + 'T00:00:00').getTime();
      run = prevT !== null && t - prevT <= DAY * 1.5 ? run + 1 : 1;   // 1.5 absorbs DST
      longest = Math.max(longest, run);
      prevT = t;
    }
    o.longestStreak = longest;

    // ---- performance from data.exercises (all time, not just the log) -------
    let exTotal = 0, exDone = 0, exTried = 0, attemptsAll = 0, hintsAll = 0, solutionsAll = 0;
    o.sections = sections.map(s => {
      const ids = (s.exercises || []).map(e => e.id);
      const li = perSection.get(s.id) || {};
      let done = 0, tried = 0, attempts = 0, hints = 0, sols = 0;
      for (const id of ids) {
        const r = exData[id];
        if (!r) continue;
        if (r.correct) done++;
        if (r.attempts > 0) tried++;
        attempts += r.attempts || 0;
        hints += r.hints || 0;
        if (r.viewedSolution) sols++;
      }
      exTotal += ids.length; exDone += done; exTried += tried;
      attemptsAll += attempts; hintsAll += hints; solutionsAll += sols;
      return {
        id: s.id, title: s.title,
        exTotal: ids.length, exDone: done, exTried: tried,
        attempts: attempts, hints: hints, solutions: sols,
        views: li.views || 0,
        minutes: mins(li.ms || 0),
        lastSeen: li.lastSeen || null,
        firstTryPct: pct(li.firstTryRight || 0, li.firstTry || 0),
        firstTryN: li.firstTry || 0,
        workingChecks: li.working || 0,
        practice: li.practice || 0,
        practicePct: pct(li.practiceRight || 0, li.practice || 0),
        opened: !!(li.views || tried || attempts)
      };
    });
    o.exTotal = exTotal; o.exDone = exDone; o.exTried = exTried;
    o.attemptsAll = attemptsAll; o.hintsAll = hintsAll; o.solutionsAll = solutionsAll;
    o.attemptsPerDone = exDone ? Math.round((attemptsAll / exDone) * 10) / 10 : null;
    o.neverOpened = o.sections.filter(r => !r.opened).map(r => r.id);

    let ftN = 0, ftRight = 0;
    for (const r of perSection.values()) { ftN += r.firstTry || 0; ftRight += r.firstTryRight || 0; }
    o.firstTryN = ftN; o.firstTryPct = pct(ftRight, ftN);

    const solved = [...perEx.values()].filter(e => e.firstRightAt !== null);
    o.solvedLogged = solved.length;
    o.unaidedPct = pct(solved.filter(e => !e.helpBeforeRight).length, solved.length);

    // ---- where she is getting stuck -----------------------------------------
    o.stuck = [...perEx.values()]
      .filter(e => (e.attempts >= 3 && e.firstRightAt === null) || e.solution || e.attempts >= 5)
      .map(e => ({ id: e.id, section: sectionOf(e.id), attempts: e.attempts, solved: e.firstRightAt !== null, hints: e.hints, solution: e.solution, lastAt: e.lastAt }))
      .sort((x, y) => (x.solved - y.solved) || (y.attempts - x.attempts))
      .slice(0, 12);

    // ---- first-try accuracy week by week ------------------------------------
    const weeks = new Map();
    for (const ev of log) {
      if (ev[1] !== 'a' || ev[4] !== 1) continue;
      const d = new Date(startOfDay(ev[0]));
      d.setDate(d.getDate() - ((d.getDay() + 6) % 7));     // back to Monday
      const k = dayKey(d.getTime());
      if (!weeks.has(k)) weeks.set(k, { week: k, t: d.getTime(), n: 0, right: 0 });
      const w = weeks.get(k); w.n++; if (ev[3] === 1) w.right++;
    }
    o.trend = [...weeks.values()].sort((x, y) => x.t - y.t)
      .map(w => ({ week: w.week, t: w.t, n: w.n, pct: pct(w.right, w.n) }));

    // ---- generated practice -------------------------------------------------
    o.practice = Object.entries((data && data.practice) || {})
      .map(([id, p]) => ({ id: id, section: sectionOf(id), attempts: p.attempts || 0, correct: p.correct || 0, best: p.best || 0, pct: pct(p.correct || 0, p.attempts || 0) }))
      .filter(p => p.attempts > 0)
      .sort((x, y) => y.attempts - x.attempts);
    o.practiceAttempts = o.practice.reduce((acc, p) => acc + p.attempts, 0);
    o.practiceCorrect = o.practice.reduce((acc, p) => acc + p.correct, 0);
    o.practicePct = pct(o.practiceCorrect, o.practiceAttempts);

    return o;
  }

  root.CH = root.CH || {};
  root.CH.I = { compute: compute, sectionOf: sectionOf, dayKey: dayKey };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.CH.I;
})(typeof window !== 'undefined' ? window : globalThis);
