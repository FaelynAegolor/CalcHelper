/* CalcHelper — the private activity view.
   =======================================================================
   Not linked from anywhere in the site, not a route, and it leaves nothing in the
   browser history. Two ways in, both silent:

     1. type  kestrel  anywhere outside a text box
     2. tap the 🌸 CalcHelper logo 7 times quickly (for a tablet with no keyboard)

   Change TRIGGER_WORD below to whatever you prefer. Everything is read from this
   browser's own localStorage — nothing is sent anywhere.
   ======================================================================= */
(function (root) {
  'use strict';
  const TRIGGER_WORD = 'kestrel';
  const TRIGGER_TAPS = 7;
  const TAP_WINDOW = 600;      // ms between taps for them to count as a run
  const KEY_WINDOW = 2000;     // typing pauses longer than this reset the buffer

  const doc = root.document;
  const CH = root.CH = root.CH || {};
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- formatting -------------------------------------------------
  const MIN = 60000, DAY = 86400000;
  function fmtMin(m) {
    if (!m) return '0';
    if (m < 60) return m + ' min';
    const h = Math.floor(m / 60), r = m % 60;
    return r ? h + 'h ' + r + 'm' : h + 'h';
  }
  function ago(t) {
    if (!t) return 'never';
    const d = Date.now() - t;
    if (d < 2 * MIN) return 'just now';
    if (d < 60 * MIN) return Math.round(d / MIN) + ' min ago';
    if (d < 36 * 3600000) return Math.round(d / 3600000) + 'h ago';
    const days = Math.round(d / DAY);
    if (days < 14) return days + ' days ago';
    return Math.round(days / 7) + ' weeks ago';
  }
  const dmy = t => t ? new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : '—';
  const stamp = t => new Date(t).toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

  /* accuracy -> one of the four reserved status roles. The number is always shown
     beside the dot, so the colour is never carrying the meaning on its own. */
  function band(p) {
    if (p === null || p === undefined) return { role: 'none', text: '—' };
    if (p >= 70) return { role: 'good', text: p + '%' };
    if (p >= 50) return { role: 'warning', text: p + '%' };
    if (p >= 30) return { role: 'serious', text: p + '%' };
    return { role: 'critical', text: p + '%' };
  }
  const dot = p => { const b = band(p); return '<span class="act-dot act-dot-' + b.role + '"></span>' + b.text; };

  // ---------- charts -----------------------------------------------------
  /* 8-week activity strip. Sequential single hue, lightest step = least time.
     A day with nothing on it is drawn as an empty cell, not as the palest blue, so
     "no activity" never reads as "a little activity". */
  function strip(days) {
    const CELL = 13, GAP = 3, STEP = CELL + GAP;
    const first = new Date(days[0].t).getDay();
    const cols = Math.ceil((days.length + first) / 7);
    const w = cols * STEP - GAP, h = 7 * STEP - GAP;
    let cells = '';
    days.forEach((d, i) => {
      const idx = i + first, col = Math.floor(idx / 7), r = idx % 7;
      const lvl = d.minutes === 0 ? 0 : d.minutes < 10 ? 1 : d.minutes < 25 ? 2 : d.minutes < 45 ? 3 : 4;
      const label = new Date(d.t).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }) +
        (d.minutes ? ' — ' + fmtMin(d.minutes) + ', ' + d.attempts + ' answer' + (d.attempts === 1 ? '' : 's') : ' — nothing');
      cells += '<rect class="act-cell act-l' + lvl + '" x="' + (col * STEP) + '" y="' + (r * STEP) + '" width="' + CELL + '" height="' + CELL + '" rx="3"><title>' + esc(label) + '</title></rect>';
    });
    let rows = '';
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach((n, r) => {
      if (r % 2 === 1) rows += '<text class="act-axis" x="-6" y="' + (r * STEP + CELL - 3) + '" text-anchor="end">' + n.slice(0, 1) + '</text>';
    });
    const legend = [0, 1, 2, 3, 4].map(l => '<span class="act-key act-l' + l + '"></span>').join('');
    /* role="img" means assistive tech reads the label instead of the cell titles, so the
       label has to carry the summary rather than just name the chart. */
    const on = days.filter(d => d.minutes > 0);
    const best = on.length ? on.reduce((a, d) => (d.minutes > a.minutes ? d : a)) : null;
    const alt = 'Daily activity, last 8 weeks: active on ' + on.length + ' of ' + days.length + ' days' +
      (best ? ', longest was ' + fmtMin(best.minutes) + ' on ' + dmy(best.t) : '') + '. Per-section totals are in the table below.';
    return '<figure class="act-fig"><figcaption>Time on the site, day by day — last 8 weeks</figcaption>' +
      '<svg viewBox="-14 -4 ' + (w + 18) + ' ' + (h + 8) + '" class="act-strip" role="img" aria-label="' + esc(alt) + '">' + rows + cells + '</svg>' +
      '<div class="act-legend"><span>' + dmy(days[0].t) + '</span><span class="act-keys">less ' + legend + ' more</span><span>' + dmy(days[days.length - 1].t) + '</span></div></figure>';
  }

  /* Minutes per day for the last fortnight. One series, so no legend — the caption
     names it. Only the tallest bar gets a direct label. */
  function bars(days) {
    const W = 520, H = 150, PAD_L = 30, PAD_B = 22, PAD_T = 14;
    const max = Math.max(10, ...days.map(d => d.minutes));
    const band = (W - PAD_L) / days.length;
    const bw = Math.min(24, band - 2);                       // 2px of surface between bars
    const y = v => PAD_T + (H - PAD_T - PAD_B) * (1 - v / max);
    let marks = '', labels = '';
    days.forEach((d, i) => {
      const x = PAD_L + i * band + (band - bw) / 2;
      const top = y(d.minutes), hh = y(0) - top;
      const title = '<title>' + esc(new Date(d.t).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }) + ' — ' + fmtMin(d.minutes)) + '</title>';
      if (d.minutes > 0) marks += '<path class="act-bar" d="' + barPath(x, top, bw, hh, 4) + '">' + title + '</path>';
      else marks += '<rect class="act-bar-zero" x="' + x + '" y="' + (y(0) - 1) + '" width="' + bw + '" height="1">' + title + '</rect>';
      // every third day, plus the last one only when it will not crowd its neighbour
      if (i % 3 === 0 || (i === days.length - 1 && (days.length - 1) % 3 >= 2)) labels += '<text class="act-axis" x="' + (x + bw / 2) + '" y="' + (H - 6) + '" text-anchor="middle">' + new Date(d.t).getDate() + '</text>';
      if (d.minutes === max) labels += '<text class="act-val" x="' + (x + bw / 2) + '" y="' + (top - 5) + '" text-anchor="middle">' + fmtMin(d.minutes) + '</text>';
    });
    const total = days.reduce((a, d) => a + d.minutes, 0);
    const alt = 'Minutes per day over the last fortnight: ' + fmtMin(total) + ' in total across ' +
      days.filter(d => d.minutes > 0).length + ' days, busiest ' + fmtMin(max) + '.';
    return '<figure class="act-fig"><figcaption>Minutes per day — last 14 days</figcaption>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" class="act-chart" role="img" aria-label="' + esc(alt) + '">' +
      '<line class="act-base" x1="' + PAD_L + '" y1="' + y(0) + '" x2="' + W + '" y2="' + y(0) + '"/>' +
      '<text class="act-axis" x="' + (PAD_L - 6) + '" y="' + (y(max) + 4) + '" text-anchor="end">' + max + '</text>' +
      marks + labels + '</svg></figure>';
  }
  /* a bar with its data-end rounded and its baseline end square */
  function barPath(x, y, w, h, r) {
    const rr = Math.min(r, h, w / 2);
    return 'M' + x + ' ' + (y + h) + 'V' + (y + rr) + 'a' + rr + ' ' + rr + ' 0 0 1 ' + rr + ' ' + -rr +
      'h' + (w - 2 * rr) + 'a' + rr + ' ' + rr + ' 0 0 1 ' + rr + ' ' + rr + 'V' + (y + h) + 'Z';
  }

  /* First-try accuracy, week by week. One series; a 2px line with an end marker. */
  function trendChart(trend) {
    const W = 520, H = 150, PAD_L = 34, PAD_B = 22, PAD_T = 14, PAD_R = 10;
    const x = i => PAD_L + (W - PAD_L - PAD_R) * (trend.length === 1 ? 0.5 : i / (trend.length - 1));
    const y = v => PAD_T + (H - PAD_T - PAD_B) * (1 - v / 100);
    let grid = '';
    for (const g of [0, 50, 100]) {
      grid += '<line class="act-grid" x1="' + PAD_L + '" y1="' + y(g) + '" x2="' + (W - PAD_R) + '" y2="' + y(g) + '"/>' +
        '<text class="act-axis" x="' + (PAD_L - 6) + '" y="' + (y(g) + 4) + '" text-anchor="end">' + g + '</text>';
    }
    const pts = trend.map((w, i) => x(i) + ' ' + y(w.pct));
    const last = trend[trend.length - 1];
    let dots = '', labels = '';
    trend.forEach((w, i) => {
      // the hit area is the transparent disc, not the 8px dot
      dots += '<circle class="act-hit" cx="' + x(i) + '" cy="' + y(w.pct) + '" r="12"><title>' +
        esc('Week of ' + dmy(w.t) + ' — ' + w.pct + '% right first time, out of ' + w.n) + '</title></circle>' +
        '<circle class="act-pt" cx="' + x(i) + '" cy="' + y(w.pct) + '" r="4"/>';
      // anchor the end labels inwards so neither runs past the plot
      if (i === 0 || i === trend.length - 1) {
        const end = i === 0 && trend.length > 1 ? 'start' : trend.length === 1 ? 'middle' : 'end';
        labels += '<text class="act-axis" x="' + x(i) + '" y="' + (H - 6) + '" text-anchor="' + end + '">' + esc(dmy(w.t)) + '</text>';
      }
    });
    labels += '<text class="act-val" x="' + (x(trend.length - 1)) + '" y="' + (y(last.pct) - 9) + '" text-anchor="end">' + last.pct + '%</text>';
    const dir = trend.length > 1 ? (last.pct > trend[0].pct ? 'up from ' : last.pct < trend[0].pct ? 'down from ' : 'level with ') + trend[0].pct + '%' : '';
    const alt = 'Share of answers right first time, by week: ' + trend.map(w => dmy(w.t) + ' ' + w.pct + '%').join(', ') + '. Latest ' + last.pct + '%, ' + dir + '.';
    return '<figure class="act-fig"><figcaption>Right first time, week by week — higher is better</figcaption>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" class="act-chart" role="img" aria-label="' + esc(alt) + '">' + grid +
      '<polyline class="act-line" points="' + pts.join(' ') + '"/>' + dots + labels + '</svg></figure>';
  }

  // ---------- the sheet --------------------------------------------------
  function tile(label, value, sub) {
    return '<div class="act-tile"><div class="act-tile-label">' + label + '</div><div class="act-tile-value">' + value + '</div>' +
      (sub ? '<div class="act-tile-sub">' + sub + '</div>' : '') + '</div>';
  }

  function sheet(o, name) {
    const h = [];
    h.push('<header class="act-head"><div><h2>Activity' + (name ? ' · ' + esc(name) : '') + '</h2>' +
      '<p class="act-sub">As of ' + esc(stamp(o.now)) + ' · last seen <strong>' + esc(ago(o.lastSeen)) + '</strong></p></div>' +
      '<div class="act-head-btns">' +
      (CH.Sync && CH.Sync.enabled() ? '<button class="act-btn" data-act="sync">Sync now</button>' : '') +
      '<button class="act-btn" data-act="copy">Copy data</button><button class="act-btn" data-act="close">Close</button></div></header>');

    if (!o.activityEvents) {
      h.push('<div class="act-empty"><p><strong>No activity recorded yet.</strong></p>' +
        '<p>The log starts from the moment this was added, so there is no history from before then. ' +
        'Figures will appear here the next time the site is used on this device.</p>' +
        (o.exTried ? '<p>Her earlier work is still counted below: <strong>' + o.exDone + ' of ' + o.exTotal + '</strong> exercises marked right, ' + o.exTried + ' attempted.</p>' : '') +
        '</div>');
    } else {
      const dm = o.minutes7 - o.minutes7prev;
      const delta = o.minutes7prev ? '<span class="act-delta ' + (dm >= 0 ? 'up' : 'down') + '">' + (dm >= 0 ? '▲' : '▼') + ' ' + fmtMin(Math.abs(dm)) + ' vs the 7 days before</span>' : '';
      h.push('<section class="act-hero"><div class="act-hero-label">Time on the site, last 7 days</div>' +
        '<div class="act-hero-value">' + fmtMin(o.minutes7) + '</div>' + delta + '</section>');

      h.push('<section class="act-tiles">' +
        tile('Days active, last 30', o.activeDays30 + ' <span class="act-of">/ 30</span>', o.activeDaysTotal + ' since logging began') +
        tile('Sittings, last 7 days', o.sittings7, o.sittings7prev + ' the week before') +
        tile('Typical sitting', fmtMin(o.medianSittingMin), 'median of ' + o.sittings) +
        tile('Current streak', o.streak + ' <span class="act-of">day' + (o.streak === 1 ? '' : 's') + '</span>', 'best run ' + o.longestStreak) +
        tile('Exercises marked right', o.exDone + ' <span class="act-of">/ ' + o.exTotal + '</span>', o.exTried + ' attempted') +
        tile('Right first time', dot(o.firstTryPct), o.firstTryN ? 'across ' + o.firstTryN + ' first tries' : 'no first tries logged yet') +
        tile('Solved with no help', dot(o.unaidedPct), o.solvedLogged ? 'of ' + o.solvedLogged + ' solved since logging began' : 'nothing solved yet') +
        tile('Solutions revealed', o.solutionsAll, 'hints used ' + o.hintsAll + ' times') +
        '</section>');

      h.push(strip(o.days));
      h.push(bars(o.last14));
      if (o.trend.length >= 2) h.push(trendChart(o.trend));
      else if (o.trend.length === 1) h.push('<p class="act-note">Week-by-week accuracy needs two weeks of answers before it can show a direction. One so far: <strong>' + o.trend[0].pct + '%</strong> right first time out of ' + o.trend[0].n + '.</p>');

      if (o.practiceAttempts) {
        h.push('<p class="act-note">Randomly generated practice questions: <strong>' + o.practiceAttempts + '</strong> attempted, ' +
          dot(o.practicePct) + ' right. Those are unlimited, so a high count here is a good sign.</p>');
      }
    }

    // --- per section: also the table view the charts are obliged to have ---
    h.push('<h3 class="act-h3">Section by section</h3>' +
      '<div class="act-table-wrap"><table class="act-table"><thead><tr>' +
      '<th>Section</th><th>Last opened</th><th class="n">Time</th><th class="n">Done</th><th class="n">Tried</th>' +
      '<th class="n">First try</th><th class="n">Hints</th><th class="n">Solutions</th><th class="n">Working</th></tr></thead><tbody>' +
      o.sections.map(s => '<tr' + (s.opened ? '' : ' class="act-row-cold"') + '>' +
        '<td><strong>' + esc(s.id) + '</strong> ' + esc(s.title) + '</td>' +
        '<td>' + (s.lastSeen ? esc(ago(s.lastSeen)) : '<span class="act-never">not opened</span>') + '</td>' +
        '<td class="n">' + (s.minutes ? esc(fmtMin(s.minutes)) : '—') + '</td>' +
        '<td class="n">' + s.exDone + '/' + s.exTotal + '</td>' +
        '<td class="n">' + s.exTried + '</td>' +
        '<td class="n">' + (s.firstTryN ? dot(s.firstTryPct) : '—') + '</td>' +
        '<td class="n">' + (s.hints || '—') + '</td>' +
        '<td class="n">' + (s.solutions || '—') + '</td>' +
        '<td class="n">' + (s.workingChecks || '—') + '</td></tr>').join('') +
      '</tbody></table></div>' +
      '<p class="act-note">Time and “first try” come from the activity log, so they only cover the period since logging began. ' +
      'Done / tried / hints / solutions are lifetime totals — those have been recorded since she started using the site.</p>');

    if (o.stuck.length) {
      h.push('<h3 class="act-h3">Where she is getting stuck</h3><ul class="act-list">' +
        o.stuck.map(s => '<li><strong>' + esc(s.id) + '</strong> — ' + s.attempts + ' attempt' + (s.attempts === 1 ? '' : 's') +
          (s.solution ? ', read the solution' : '') + (s.hints ? ', ' + s.hints + ' hint' + (s.hints === 1 ? '' : 's') : '') +
          ' · ' + (s.solved ? '<span class="act-ok">got there</span>' : '<span class="act-bad">not right yet</span>') +
          ' · ' + esc(ago(s.lastAt)) + '</li>').join('') + '</ul>');
    }
    if (o.neverOpened.length) {
      h.push('<p class="act-note">Not opened at all: <strong>' + o.neverOpened.map(esc).join(', ') + '</strong>.</p>');
    }
    if (o.resets.length) {
      h.push('<p class="act-note act-warn">Progress was cleared from the settings page on ' +
        o.resets.map(t => esc(stamp(t))).join(', ') + '. Anything before that is gone.</p>');
    }
    const sync = CH.Sync && CH.Sync.enabled() ? CH.Sync.status() : null;
    h.push('<p class="act-note act-foot">This view is not linked from any page, and it records what was done — never what was typed. ' +
      (sync
        ? 'A summary of these counts is sent to your Google Sheet' +
          (sync.at ? ', last ' + esc(ago(sync.at)) + (sync.ok === false ? ' <strong>(that attempt failed)</strong>' : '') : ' — nothing sent yet') +
          '. Answers and working never leave this browser.'
        : 'Nothing is uploaded: everything here is read from this browser only.') +
      '<span class="act-sync-msg"></span></p>');
    return h.join('');
  }

  // ---------- open / close ------------------------------------------------
  let el = null;
  function close() {
    if (!el) return;
    el.remove(); el = null;
    doc.removeEventListener('keydown', onEsc, true);
  }
  function onEsc(e) { if (e.key === 'Escape') { e.stopPropagation(); close(); } }

  function open() {
    if (el) return;
    const S = CH.S, I = CH.I;
    if (!S || !I) return;
    let o;
    try { o = I.compute(S.data, CH.sections || [], Date.now()); }
    catch (err) { o = null; console.error(err); }
    el = doc.createElement('div');
    el.className = 'act-overlay';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Activity');
    el.innerHTML = '<div class="act-sheet viz-root">' +
      (o ? sheet(o, S.setting('name')) : '<p class="act-note">Could not read the activity log.</p><button class="act-btn" data-act="close">Close</button>') +
      '</div>';
    doc.body.appendChild(el);
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-act]');
      if (!b) { if (e.target === el) close(); return; }
      if (b.dataset.act === 'close') close();
      if (b.dataset.act === 'sync' && CH.Sync) {
        b.disabled = true; b.textContent = 'Sending…';
        CH.Sync.syncNow().then(r => {
          b.disabled = false; b.textContent = 'Sync now';
          const msg = el && el.querySelector('.act-sync-msg');
          if (msg) { msg.textContent = ' ' + r.msg; msg.className = 'act-sync-msg ' + (r.ok ? 'act-ok' : 'act-bad'); }
        });
      }
      if (b.dataset.act === 'copy') {
        const text = S.exportJSON();
        const done = () => { b.textContent = 'Copied'; setTimeout(() => { b.textContent = 'Copy data'; }, 1500); };
        if (root.navigator && root.navigator.clipboard) root.navigator.clipboard.writeText(text).then(done, done);
        else done();
      }
    });
    doc.addEventListener('keydown', onEsc, true);
    el.querySelector('.act-sheet').scrollTop = 0;
  }

  // ---------- the two silent triggers -------------------------------------
  function install() {
    let buf = '', bufAt = 0;
    doc.addEventListener('keydown', e => {
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (!e.key || e.key.length !== 1) return;
      const now = Date.now();
      if (now - bufAt > KEY_WINDOW) buf = '';
      bufAt = now;
      buf = (buf + e.key.toLowerCase()).slice(-TRIGGER_WORD.length);
      if (buf === TRIGGER_WORD) { buf = ''; open(); }
    });

    const brand = doc.querySelector('.brand');
    if (brand) {
      let taps = 0, tapAt = 0;
      brand.addEventListener('click', e => {
        const now = Date.now();
        taps = now - tapAt < TAP_WINDOW ? taps + 1 : 1;
        tapAt = now;
        if (taps > 1) e.preventDefault();          // let a single ordinary click still go home
        if (taps >= TRIGGER_TAPS) { taps = 0; open(); }
      });
    }
  }

  CH.Activity = { open: open, close: close, install: install, sheet: sheet };
  if (doc) {
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', install);
    else install();
  }
})(typeof window !== 'undefined' ? window : globalThis);
