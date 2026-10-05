/* CalcHelper — Google Apps Script endpoint.
   Paste this into Extensions > Apps Script on the Google Sheet you want the
   activity written to, set TOKEN below, then deploy it as a Web App.
   Full walkthrough: tools/apps-script/README.md

   It only ever writes. Nothing here can read the Sheet back out to the browser,
   so the Sheet's own Google permissions are what keep it private to you. */

var TOKEN = 'H8YJYTEnpfKrvWCNTDKkBKuCbstn3iDMXEfGuAmM';

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return out({ ok: false, error: 'empty request' });
    var body = JSON.parse(e.postData.contents);
    if (String(body.token || '') !== TOKEN) return out({ ok: false, error: 'bad token' });

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);                       // two devices syncing at once must not interleave
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      writeSummary(ss, body);
      writeDaily(ss, body);
      writeSections(ss, body);
    } finally {
      lock.releaseLock();
    }
    return out({ ok: true, at: new Date().toISOString() });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

/* Opening the URL in a browser should say something useful rather than error. */
function doGet() {
  return out({ ok: true, hint: 'This endpoint accepts POSTs from CalcHelper.' });
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---------------------------------------------------------------- sheets

var SUMMARY_HEADERS = ['device', 'name', 'updated', 'last seen', 'streak', 'best streak',
  'min last 7', 'min last 30', 'min total', 'sittings last 7', 'sittings total', 'typical sitting',
  'active days last 7', 'active days last 30', 'exercises done', 'exercises total', 'exercises tried',
  'right first time %', 'first tries', 'solved unaided %', 'hints used', 'solutions revealed',
  'practice attempts', 'practice %', 'not opened', 'getting stuck'];

var DAILY_HEADERS = ['date', 'device', 'minutes', 'answers checked'];
var SECTION_HEADERS = ['device', 'section', 'title', 'minutes', 'last opened',
  'done', 'total', 'tried', 'right first time %', 'hints', 'solutions'];

function writeSummary(ss, b) {
  var sh = sheetFor(ss, 'Summary', SUMMARY_HEADERS);
  upsert(sh, SUMMARY_HEADERS, [0], [
    b.device, b.name, new Date(), b.lastSeen ? new Date(b.lastSeen) : '',
    num(b.streak), num(b.longestStreak),
    num(b.minutes7), num(b.minutes30), num(b.minutesTotal),
    num(b.sittings7), num(b.sittingsTotal), num(b.medianSittingMin),
    num(b.activeDays7), num(b.activeDays30),
    num(b.exDone), num(b.exTotal), num(b.exTried),
    pct(b.firstTryPct), num(b.firstTryN), pct(b.unaidedPct),
    num(b.hintsAll), num(b.solutionsAll),
    num(b.practiceAttempts), pct(b.practicePct),
    b.neverOpened || '', b.stuck || ''
  ]);
}

function writeDaily(ss, b) {
  var sh = sheetFor(ss, 'Daily', DAILY_HEADERS);
  var days = b.days || [];
  for (var i = 0; i < days.length; i++) {
    upsert(sh, DAILY_HEADERS, [0, 1], [days[i].date, b.device, num(days[i].minutes), num(days[i].attempts)]);
  }
  sortByFirstColumn(sh);
}

function writeSections(ss, b) {
  var sh = sheetFor(ss, 'Sections', SECTION_HEADERS);
  var secs = b.sections || [];
  for (var i = 0; i < secs.length; i++) {
    var s = secs[i];
    upsert(sh, SECTION_HEADERS, [0, 1], [
      b.device, s.id, s.title, num(s.minutes), s.lastSeen ? new Date(s.lastSeen) : '',
      num(s.exDone), num(s.exTotal), num(s.exTried), pct(s.firstTryPct), num(s.hints), num(s.solutions)
    ]);
  }
}

function num(v) { return (v === null || v === undefined || v === '') ? 0 : v; }
function pct(v) { return (v === null || v === undefined) ? '' : v / 100; }   // real % so Sheets can format it

function sheetFor(ss, name, headers) {
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

/* Replace the row whose key columns match, otherwise append one. */
function upsert(sh, headers, keyCols, row) {
  var rows = sh.getLastRow() - 1;
  if (rows > 0) {
    var vals = sh.getRange(2, 1, rows, headers.length).getValues();
    for (var i = 0; i < vals.length; i++) {
      var hit = true;
      for (var k = 0; k < keyCols.length; k++) {
        if (String(vals[i][keyCols[k]]) !== String(row[keyCols[k]])) { hit = false; break; }
      }
      if (hit) { sh.getRange(i + 2, 1, 1, headers.length).setValues([row]); return; }
    }
  }
  sh.appendRow(row);
}

function sortByFirstColumn(sh) {
  var rows = sh.getLastRow() - 1;
  if (rows > 1) sh.getRange(2, 1, rows, sh.getLastColumn()).sort({ column: 1, ascending: false });
}
