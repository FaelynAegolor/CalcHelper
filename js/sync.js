/* CalcHelper — sends a small activity summary to a Google Sheet.
   =====================================================================
   Inert until js/sync-config.js has an ENDPOINT. What goes out is counts only:
   minutes, attempt tallies, accuracy percentages, exercise ids. Never an answer she
   typed, never her working — those stay in this browser.

   Sending uses Content-Type: text/plain so the browser treats it as a simple request
   and skips the CORS preflight that Apps Script cannot answer. The reply is opaque,
   so a send that does not throw is reported as "sent", not as "confirmed" — the Sheet
   itself is the confirmation. "Sync now" in the activity view tries a readable
   request first and reports what actually came back.
   ===================================================================== */
(function (root) {
  'use strict';
  const CH = root.CH = root.CH || {};
  const cfg = CH.syncConfig || { ENDPOINT: '', TOKEN: '', MIN_INTERVAL_MIN: 10 };
  const DEBOUNCE_MS = 30000;
  let timer = null, inFlight = false;

  const enabled = () => !!(cfg.ENDPOINT && /^https:\/\//.test(cfg.ENDPOINT));

  function deviceId() {
    const S = CH.S;
    let id = S.setting('deviceId');
    if (!id) {
      id = (root.crypto && root.crypto.randomUUID) ? root.crypto.randomUUID()
        : 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
      S.setting('deviceId', id);
    }
    return id;
  }

  /* Counts only — build the payload explicitly rather than shipping the whole
     stats object, so nothing new leaks in if insights.js grows a field later. */
  function payload() {
    const S = CH.S, o = CH.I.compute(S.data, CH.sections || [], Date.now());
    return {
      v: 1,
      token: cfg.TOKEN || '',
      device: deviceId(),
      name: S.setting('name') || '',
      at: Date.now(),
      lastSeen: o.lastSeen,
      streak: o.streak, longestStreak: o.longestStreak,
      minutes7: o.minutes7, minutes30: o.minutes30, minutesTotal: o.minutesTotal,
      sittings7: o.sittings7, sittings30: o.sittings30, sittingsTotal: o.sittings,
      medianSittingMin: o.medianSittingMin,
      activeDays7: o.activeDays7, activeDays30: o.activeDays30,
      exDone: o.exDone, exTotal: o.exTotal, exTried: o.exTried,
      firstTryPct: o.firstTryPct, firstTryN: o.firstTryN,
      unaidedPct: o.unaidedPct,
      hintsAll: o.hintsAll, solutionsAll: o.solutionsAll,
      practiceAttempts: o.practiceAttempts, practicePct: o.practicePct,
      neverOpened: o.neverOpened.join(', '),
      stuck: o.stuck.map(s => s.id + '(' + s.attempts + (s.solved ? '' : '!') + ')').join(' '),
      days: o.last14.map(d => ({ date: d.date, minutes: d.minutes, attempts: d.attempts })),
      sections: o.sections.map(s => ({
        id: s.id, title: s.title, minutes: s.minutes, lastSeen: s.lastSeen,
        exDone: s.exDone, exTotal: s.exTotal, exTried: s.exTried,
        firstTryPct: s.firstTryPct, hints: s.hints, solutions: s.solutions
      }))
    };
  }

  function note(patch) {
    const S = CH.S;
    S.setting('sync', Object.assign({}, S.setting('sync') || {}, patch));
  }
  const status = () => (CH.S.setting('sync') || {});

  /* fire-and-forget; never let a sync failure surface to whoever is using the site */
  function send(beacon) {
    if (!enabled() || inFlight) return Promise.resolve({ ok: false, why: 'off' });
    let body;
    try { body = JSON.stringify(payload()); }
    catch (e) { return Promise.resolve({ ok: false, why: 'payload' }); }
    const lastEvent = (CH.S.data.log.slice(-1)[0] || [])[0] || 0;

    if (beacon && root.navigator && root.navigator.sendBeacon) {
      try {
        const okq = root.navigator.sendBeacon(cfg.ENDPOINT, new Blob([body], { type: 'text/plain;charset=UTF-8' }));
        note({ at: Date.now(), upTo: lastEvent, how: 'beacon', ok: !!okq });
        return Promise.resolve({ ok: !!okq, why: 'beacon' });
      } catch (e) { /* fall through to fetch */ }
    }
    inFlight = true;
    return fetch(cfg.ENDPOINT, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: body })
      .then(() => { note({ at: Date.now(), upTo: lastEvent, how: 'sent', ok: true }); return { ok: true, why: 'sent' }; })
      .catch(() => { note({ at: Date.now(), upTo: lastEvent, how: 'failed', ok: false }); return { ok: false, why: 'network' }; })
      .then(r => { inFlight = false; return r; });
  }

  /* Used by the "Sync now" button: asks for a readable reply so a misconfigured
     token or endpoint can actually be reported instead of failing silently. */
  function syncNow() {
    if (!enabled()) return Promise.resolve({ ok: false, msg: 'No endpoint configured yet.' });
    let body;
    try { body = JSON.stringify(payload()); } catch (e) { return Promise.resolve({ ok: false, msg: 'Could not build the summary.' }); }
    return fetch(cfg.ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: body })
      .then(r => r.text())
      .then(t => {
        let j = null; try { j = JSON.parse(t); } catch (e) { /* not json */ }
        note({ at: Date.now(), upTo: (CH.S.data.log.slice(-1)[0] || [])[0] || 0, how: 'sync now', ok: !(j && j.ok === false) });
        if (j && j.ok === false) return { ok: false, msg: 'The Sheet refused it: ' + (j.error || 'unknown') };
        if (j && j.ok) return { ok: true, msg: 'Sheet updated.' };
        return { ok: true, msg: 'Sent — check the Sheet.' };
      })
      .catch(() => send(false).then(r => ({ ok: r.ok, msg: r.ok ? 'Sent — check the Sheet. (No readable reply, which is normal.)' : 'Could not reach the endpoint.' })));
  }

  function schedule() {
    if (!enabled()) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const s = status();
      const gap = (cfg.MIN_INTERVAL_MIN || 10) * 60000;
      if (s.at && Date.now() - s.at < gap) return;   // the page-hide handler will catch up
      send(false);
    }, DEBOUNCE_MS);
  }

  function install() {
    if (!enabled() || !CH.S || !CH.I) return;
    const S = CH.S;
    const orig = S.logEvent.bind(S);
    S.logEvent = function () { orig.apply(null, arguments); schedule(); };
    const flush = () => {
      const last = (S.data.log.slice(-1)[0] || [])[0] || 0;
      if (last && last > (status().upTo || 0)) send(true);
    };
    root.document.addEventListener('visibilitychange', () => { if (root.document.visibilityState === 'hidden') flush(); });
    root.addEventListener('pagehide', flush);
  }

  CH.Sync = { enabled: enabled, syncNow: syncNow, status: status, install: install, payload: payload };
  if (root.document) {
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', install);
    else install();
  }
})(typeof window !== 'undefined' ? window : globalThis);
