/* CalcHelper — answer checking and line-by-line working checking.
   Everything is numeric: two expressions are "the same" if they agree at a
   fixed set of sample points; an equation step is "still right" if the true
   solutions still satisfy it; an inequality step is "still right" if it
   agrees with the true solution set at a set of test points. */
(function (root) {
  'use strict';
  const P = (root.CH && root.CH.P) || require('./mathparse.js');

  // ---------- helpers ----------
  const fmt = v => {
    if (!isFinite(v)) return v > 0 ? '∞' : '-∞';
    const r = Math.round(v * 1000) / 1000;
    return String(r);
  };
  const fmtTex = v => {
    if (!isFinite(v)) return v > 0 ? '\\infty' : '-\\infty';
    if (Number.isInteger(v)) return String(v);
    // try to show a nice fraction
    for (let d = 2; d <= 64; d++) {
      const n = v * d;
      if (Math.abs(n - Math.round(n)) < 1e-9) {
        const num = Math.round(n);
        return (num < 0 ? '-' : '') + '\\tfrac{' + Math.abs(num) + '}{' + d + '}';
      }
    }
    return String(Math.round(v * 10000) / 10000);
  };
  const isConstVar = name => name === 'e';
  function freeVars(ast) {
    const s = new Set();
    P.vars(ast).forEach(v => { if (!isConstVar(v)) s.add(v); });
    return s;
  }

  // deterministic pseudo-random sample points for a list of variables
  function samplePoints(varList, count) {
    count = count || 16;
    let seed = 12345;
    const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    const pts = [];
    for (let i = 0; i < count; i++) {
      const pt = {};
      for (const v of varList) {
        let x;
        if (i % 2 === 0) x = 0.3 + rnd() * 2.7;          // positive: keeps roots/logs defined
        else { x = -3 + rnd() * 6; if (Math.abs(x) < 0.2) x += 0.7; }
        pt[v] = x;
      }
      pts.push(pt);
    }
    return pts;
  }
  const num = v => typeof v === 'number' && !Number.isNaN(v);

  // Compare two expression ASTs on sample points (reference decides the domain).
  function compareExpr(astS, astR, varList) {
    const pts = samplePoints(varList);
    let tested = 0;
    for (const pt of pts) {
      const r = P.evaluate(astR, pt);
      if (!num(r) || !isFinite(r)) continue;
      const s = P.evaluate(astS, pt);
      tested++;
      if (!num(s) || !isFinite(s) || !P.approxEq(s, r)) {
        return { equal: false, tested, point: pt, s, r };
      }
    }
    if (tested < 3) return { equal: null, tested };
    return { equal: true, tested };
  }

  // Equations: lhs - rhs must be a non-zero constant multiple of the reference's.
  function compareProportional(relS, relR, varList) {
    const fS = pt => P.evaluate(relS.pieces[0], pt) - P.evaluate(relS.pieces[1], pt);
    const fR = pt => P.evaluate(relR.pieces[0], pt) - P.evaluate(relR.pieces[1], pt);
    const pts = samplePoints(varList, 20);
    let ratio = null, tested = 0;
    for (const pt of pts) {
      const r = fR(pt);
      if (!num(r) || !isFinite(r)) continue;
      const s = fS(pt);
      tested++;
      if (!num(s) || !isFinite(s)) return { equal: false, point: pt };
      if (Math.abs(r) < 1e-9) { if (Math.abs(s) > 1e-7) return { equal: false, point: pt }; continue; }
      const q = s / r;
      if (Math.abs(q) < 1e-9) return { equal: false, point: pt };
      if (ratio === null) ratio = q;
      else if (!P.approxEq(q, ratio)) return { equal: false, point: pt };
    }
    if (tested < 3) return { equal: null };
    return { equal: true, ratio };
  }

  // ---------- interval sets ----------
  const INF = Infinity;
  function mkInt(lo, hi, loC, hiC) { return { lo, hi, loC: !!loC && isFinite(lo), hiC: !!hiC && isFinite(hi) }; }
  function normalizeIntervals(list) {
    const L = list.filter(I => I.lo < hi(I) || (I.lo === I.hi && I.loC && I.hiC)).map(I => ({ ...I }));
    function hi(I) { return I.hi; }
    L.sort((a, b) => a.lo - b.lo || (a.loC === b.loC ? 0 : a.loC ? -1 : 1));
    const out = [];
    for (const I of L) {
      const last = out[out.length - 1];
      if (last && (I.lo < last.hi || (P.approxEq(I.lo, last.hi) && (I.loC || last.hiC)))) {
        if (I.hi > last.hi || (P.approxEq(I.hi, last.hi) && I.hiC)) { last.hi = I.hi; last.hiC = I.hiC; }
        if (P.approxEq(I.lo, last.lo) && I.loC) last.loC = true;
      } else out.push(I);
    }
    return out;
  }
  function intersectIntervals(A, B) {
    const out = [];
    for (const a of A) for (const b of B) {
      let lo, loC, hi, hiC;
      if (a.lo > b.lo) { lo = a.lo; loC = a.loC; } else if (b.lo > a.lo) { lo = b.lo; loC = b.loC; } else { lo = a.lo; loC = a.loC && b.loC; }
      if (a.hi < b.hi) { hi = a.hi; hiC = a.hiC; } else if (b.hi < a.hi) { hi = b.hi; hiC = b.hiC; } else { hi = a.hi; hiC = a.hiC && b.hiC; }
      if (lo < hi || (lo === hi && loC && hiC)) out.push(mkInt(lo, hi, loC, hiC));
    }
    return normalizeIntervals(out);
  }
  function inInterval(x, I) {
    if (x < I.lo || x > I.hi) return false;
    if (P.approxEq(x, I.lo)) return I.loC;
    if (P.approxEq(x, I.hi)) return I.hiC;
    return true;
  }
  const inSet = (x, set) => set.some(I => inInterval(x, I));
  function intervalsEqual(A, B) {
    if (A.length !== B.length) return false;
    for (let i = 0; i < A.length; i++) {
      const a = A[i], b = B[i];
      if (!(P.approxEq(a.lo, b.lo) && P.approxEq(a.hi, b.hi) && a.loC === b.loC && a.hiC === b.hiC)) return false;
    }
    return true;
  }
  function intervalsToLatex(set) {
    if (!set.length) return '\\varnothing';
    return set.map(I => {
      if (I.lo === I.hi) return '\\{' + fmtTex(I.lo) + '\\}';
      return (I.loC ? '[' : '(') + fmtTex(I.lo) + ',\\, ' + fmtTex(I.hi) + (I.hiC ? ']' : ')');
    }).join(' \\cup ');
  }

  // plain-text form the answer parser accepts, e.g. "[-2, 0] U [7, inf)"
  function intervalsToInput(set) {
    if (!set.length) return 'empty';
    const n = v => isFinite(v) ? String(Math.round(v * 1e6) / 1e6) : (v > 0 ? 'inf' : '-inf');
    return set.map(I => I.lo === I.hi ? '{' + n(I.lo) + '}' : (I.loC ? '[' : '(') + n(I.lo) + ', ' + n(I.hi) + (I.hiC ? ']' : ')')).join(' U ');
  }

  const EMPTY_RE = /^\s*(∅|Ø|\{\s*\}|phi|Φ|φ|no\s+solutions?|none|empty(\s+set)?|nothing)\s*\.?\s*$/i;
  const REALS_RE = /^\s*(R|ℝ|reals|all\s+reals|all\s+real\s+numbers|\(\s*-\s*(inf|infinity|∞|oo)\s*,\s*(inf|infinity|∞|oo)\s*\))\s*$/i;

  // strip "S =", "x ∈", "Domain:" style labels
  function stripLabel(s) {
    return s.replace(/^\s*(S|D|domain|solution(\s+set)?|answer|ans|set|sol)\s*(=|:|∈)\s*/i, '')
      .replace(/^\s*x\s*(∈|in)\s*/i, '').trim();
  }
  const evalConst = txt => {
    const ast = P.parse(txt);
    const fv = freeVars(ast);
    if (fv.size) throw new Error('"' + txt.trim() + '" should be a number but contains ' + [...fv].join(', '));
    const v = P.evaluate(ast, {});
    if (Number.isNaN(v)) throw new Error('"' + txt.trim() + '" is not a real number');
    return v;
  };

  // Split on top-level connectors (outside brackets): returns [{piece, conn}] where conn joins to the previous.
  function splitTop(s, connectors) {
    const out = []; let depth = 0, cur = '', i = 0;
    const lower = s.toLowerCase();
    while (i < s.length) {
      const c = s[i];
      if ('([{'.includes(c)) depth++;
      if (')]}'.includes(c)) depth--;
      let matched = null;
      if (depth === 0) {
        for (const k of connectors) {
          if (lower.startsWith(k.text, i)) {
            const before = i === 0 ? ' ' : s[i - 1], after = s[i + k.text.length] || ' ';
            if (!k.word || (/[\s\]\)\}]/.test(before) && /[\s\(\[\{\-0-9x]/.test(after))) { matched = k; break; }
          }
        }
      }
      if (matched) { out.push(cur); out.push(matched.kind); cur = ''; i += matched.text.length; }
      else { cur += c; i++; }
    }
    out.push(cur);
    return out; // alternating piece, conn, piece, ...
  }
  const UNION_CONN = [{ text: '∪', kind: 'u' }, { text: '∩', kind: 'n' }, { text: ' u ', kind: 'u' }, { text: ' or ', kind: 'u' }, { text: ' and ', kind: 'n' },
    { text: 'u', kind: 'u', word: true }, { text: 'or', kind: 'u', word: true }, { text: 'and', kind: 'n', word: true }];

  // parse one interval piece -> array of intervals
  function parseIntervalPiece(txt, v) {
    let s = txt.trim();
    if (EMPTY_RE.test(s)) return [];
    if (REALS_RE.test(s)) return [mkInt(-INF, INF)];
    let m = /^([\(\[\]])\s*(.+?)\s*[,;]\s*(.+?)\s*([\)\]\[])$/.exec(s);
    if (m) {
      const lo = evalConst(m[2]), hi = evalConst(m[3]);
      if (lo > hi) throw new Error('In an interval the smaller number comes first: ' + s);
      return [mkInt(lo, hi, m[1] === '[', m[4] === ']')];
    }
    m = /^\{\s*(.*?)\s*\}$/.exec(s);
    if (m) {
      if (!m[1].trim()) return [];
      return m[1].split(/[,;]/).map(t => { const x = evalConst(t); return mkInt(x, x, true, true); });
    }
    // inequality in one variable
    const rel = P.parseRelation(s);
    if (!rel) throw new Error('Could not read "' + s + '" as an interval or inequality');
    const isVar = a => a.t === 'var' && (!v || a.name === v);
    const val = a => { const fv = freeVars(a); if (fv.size) throw new Error('Bounds must be numbers'); return P.evaluate(a, {}); };
    const flip = { '<': '>', '<=': '>=', '>': '<', '>=': '<=', '=': '=', '!=': '!=' };
    if (rel.pieces.length === 2) {
      let op = rel.ops[0], bound;
      if (isVar(rel.pieces[0])) bound = val(rel.pieces[1]);
      else if (isVar(rel.pieces[1])) { bound = val(rel.pieces[0]); op = flip[op]; }
      else throw new Error('Write the inequality with the variable on its own, e.g. x < 3');
      switch (op) {
        case '<': return [mkInt(-INF, bound, false, false)];
        case '<=': return [mkInt(-INF, bound, false, true)];
        case '>': return [mkInt(bound, INF, false, false)];
        case '>=': return [mkInt(bound, INF, true, false)];
        case '=': return [mkInt(bound, bound, true, true)];
        case '!=': return [mkInt(-INF, bound, false, false), mkInt(bound, INF, false, false)];
      }
    }
    if (rel.pieces.length === 3 && isVar(rel.pieces[1])) {
      let a = val(rel.pieces[0]), b = val(rel.pieces[2]);
      let o1 = rel.ops[0], o2 = rel.ops[1];
      if (o1[0] === '>' && o2[0] === '>') { [a, b] = [b, a]; [o1, o2] = [flip[o2], flip[o1]]; }
      if (o1[0] !== '<' || o2[0] !== '<') throw new Error('A double inequality must point the same way, e.g. -1 < x <= 4');
      return [mkInt(a, b, o1 === '<=', o2 === '<=')];
    }
    throw new Error('Could not read "' + s + '" as an interval');
  }
  function parseIntervalSet(text, v) {
    let s = stripLabel(P.normalize(text));
    if (EMPTY_RE.test(s)) return [];
    const parts = splitTop(s, UNION_CONN);
    let acc = null;
    for (let i = 0; i < parts.length; i += 2) {
      const piece = parseIntervalPiece(parts[i], v);
      if (acc === null) acc = normalizeIntervals(piece);
      else if (parts[i - 1] === 'u') acc = normalizeIntervals(acc.concat(piece));
      else acc = intersectIntervals(acc, normalizeIntervals(piece));
    }
    return acc || [];
  }

  // ---------- finite sets of numbers ----------
  function expandPM(txt) {
    if (!/[±∓]/.test(txt)) return [txt];
    const a = txt.replace(/±/g, '+').replace(/∓/g, '-');
    const b = txt.replace(/±/g, '-').replace(/∓/g, '+');
    return [a, b];
  }
  function parseNumberSet(text, v) {
    let s = stripLabel(P.normalize(text));
    if (EMPTY_RE.test(s)) return [];
    s = s.replace(/^\{\s*/, '').replace(/\s*\}$/, '').trim();
    if (s === '') return [];
    const pieces = s.split(/\s*(?:,|;|\bor\b)\s*/i).filter(Boolean);
    const out = [];
    for (let p of pieces) {
      p = p.replace(new RegExp('^\\s*' + (v || '[a-zA-Z]') + '\\s*=\\s*'), '').trim();
      for (const q of expandPM(p)) out.push(evalConst(q));
    }
    out.sort((a, b) => a - b);
    return out;
  }
  function numberSetsEqual(A, B) {
    if (A.length !== B.length) return false;
    for (let i = 0; i < A.length; i++) if (!P.approxEq(A[i], B[i])) return false;
    return true;
  }
  const setToLatex = S => S.length ? '\\{' + S.map(fmtTex).join(',\\ ') + '\\}' : '\\varnothing';

  // ---------- points ----------
  function parsePoint(text) {
    let s = P.normalize(text).trim();
    s = s.replace(/^[A-Za-z]\w*\s*(=|:)?\s*(?=\()/, '');
    s = s.replace(/^\(\s*/, '').replace(/\s*\)$/, '');
    const parts = s.split(/\s*[,;]\s*/);
    if (parts.length !== 2) throw new Error('A point needs two coordinates, like (3, -1)');
    return parts.map(evalConst);
  }

  // ---------- statements (one line of working) ----------
  const LOGIC_CONN = [{ text: ' or ', kind: 'or' }, { text: ' and ', kind: 'and' }, { text: '∨', kind: 'or' }, { text: '∧', kind: 'and' },
    { text: 'or', kind: 'or', word: true }, { text: 'and', kind: 'and', word: true }];
  function parseStatement(text, v) {
    let s = stripLabel(P.normalize(text));
    if (EMPTY_RE.test(s)) return { kind: 'empty', tex: '\\varnothing' };
    if (/^\{.*\}$/.test(s)) {
      const vals = parseNumberSet(s, v);
      return { kind: 'set', values: vals, tex: setToLatex(vals) };
    }
    const looksInterval = /[\(\[\]]\s*[^,()\[\]]+,\s*[^,()\[\]]+\s*[\)\]\[]/.test(s) && !/[<>=]/.test(s);
    if (looksInterval || REALS_RE.test(s)) {
      const set = parseIntervalSet(s, v);
      return { kind: 'interval', set, tex: intervalsToLatex(set) };
    }
    const parts = splitTop(s, LOGIC_CONN);
    if (parts.length > 1) {
      // or binds looser than and
      const orGroups = [[]];
      for (let i = 0; i < parts.length; i += 2) {
        if (i > 0 && parts[i - 1] === 'or') orGroups.push([]);
        orGroups[orGroups.length - 1].push(parts[i]);
      }
      const items = orGroups.map(g => {
        const rels = g.map(t => parseStatement(t, v));
        return rels.length === 1 ? rels[0] : { kind: 'and', items: rels, tex: rels.map(r => r.tex).join(' \\text{ and } ') };
      });
      if (items.length === 1) return items[0];
      return { kind: 'or', items, tex: items.map(r => r.tex).join(' \\text{ or } ') };
    }
    const alts = expandPM(s);
    if (alts.length === 2) {
      const items = alts.map(t => parseStatement(t, v));
      return { kind: 'or', items, tex: items.map(r => r.tex).join(' \\text{ or } '), pm: true };
    }
    const rel = P.parseRelation(s);
    if (rel) return { kind: 'rel', rel, tex: P.relationToLatex(rel) };
    const ast = P.parse(s);
    return { kind: 'expr', ast, tex: P.toLatex(ast) };
  }
  function statementVars(st, out) {
    out = out || new Set();
    if (st.kind === 'rel') st.rel.pieces.forEach(p => freeVars(p).forEach(x => out.add(x)));
    else if (st.kind === 'expr') freeVars(st.ast).forEach(x => out.add(x));
    else if (st.kind === 'or' || st.kind === 'and') st.items.forEach(i => statementVars(i, out));
    return out;
  }
  // true / false / undefined
  function evalStatement(st, scope, v) {
    switch (st.kind) {
      case 'empty': return false;
      case 'set': return st.values.some(x => P.approxEq(x, scope[v]));
      case 'interval': return inSet(scope[v], st.set);
      case 'rel': return P.evalRelation(st.rel, scope);
      case 'expr': return undefined;
      case 'or': {
        let und = false;
        for (const it of st.items) { const r = evalStatement(it, scope, v); if (r === true) return true; if (r === undefined) und = true; }
        return und ? undefined : false;
      }
      case 'and': {
        let und = false;
        for (const it of st.items) { const r = evalStatement(it, scope, v); if (r === false) return false; if (r === undefined) und = true; }
        return und ? undefined : true;
      }
    }
    return undefined;
  }
  // If a statement is "x = a or x = b" (or a set), return the numbers, else null.
  function statementAsSet(st, v) {
    if (st.kind === 'set') return st.values;
    if (st.kind === 'empty') return [];
    const one = r => {
      if (r.kind !== 'rel' || r.rel.ops.length !== 1 || r.rel.ops[0] !== '=') return null;
      const [a, b] = r.rel.pieces;
      if (a.t === 'var' && a.name === v && freeVars(b).size === 0) return P.evaluate(b, {});
      if (b.t === 'var' && b.name === v && freeVars(a).size === 0) return P.evaluate(a, {});
      return null;
    };
    if (st.kind === 'rel') { const x = one(st); return x === null ? null : [x]; }
    if (st.kind === 'or') {
      const vals = [];
      for (const it of st.items) { const x = one(it); if (x === null) return null; vals.push(x); }
      return vals.sort((a, b) => a - b);
    }
    return null;
  }

  // ---------- form checks for expression answers ----------
  function stripNeg(n) { while (n.t === 'neg') n = n.a; return n; }
  const isSum = n => n.t === 'bin' && (n.op === '+' || n.op === '-');
  function hasNode(n, pred) {
    if (pred(n)) return true;
    if (n.t === 'neg') return hasNode(n.a, pred);
    if (n.t === 'bin') return hasNode(n.a, pred) || hasNode(n.b, pred);
    if (n.t === 'call') return n.args.some(a => hasNode(a, pred));
    return false;
  }
  function checkForm(ast, form) {
    const r = stripNeg(ast);
    switch (form) {
      case 'factored':
        if (isSum(r)) return { ok: false, msg: 'This is equivalent, but it is not written as a product of factors.' };
        if (r.t === 'bin' && r.op === '/') return { ok: false, msg: 'This is equivalent, but the answer should be a product of factors, not a fraction.' };
        return { ok: true };
      case 'expanded':
        if (hasNode(r, n => n.t === 'bin' && n.op === '*' && (isSum(n.a) || isSum(n.b))) || hasNode(r, n => n.t === 'bin' && n.op === '^' && isSum(n.a)))
          return { ok: false, msg: 'This is equivalent, but it still has brackets to multiply out.' };
        return { ok: true };
      case 'single-fraction': {
        let count = 0; hasNode(r, n => { if (n.t === 'bin' && n.op === '/') count++; return false; });
        if (count > 1 || (count === 1 && !(r.t === 'bin' && r.op === '/')))
          return { ok: false, msg: 'This is equivalent, but it should be written as a single simplified fraction.' };
        return { ok: true };
      }
      case 'simplified-radical': {
        let bad = null;
        const squareFree = (n, k) => { for (let p = 2; Math.pow(p, k) <= n; p++) if (n % Math.pow(p, k) === 0) return false; return true; };
        hasNode(r, n => {
          if (n.t === 'call' && (n.fn === 'sqrt' || n.fn === 'cbrt' || n.fn === 'root') && n.args[0].t === 'num' && Number.isInteger(n.args[0].v)) {
            const k = n.fn === 'sqrt' ? 2 : n.fn === 'cbrt' ? 3 : (n.args[1] && n.args[1].t === 'num' ? n.args[1].v : 2);
            if (!squareFree(n.args[0].v, k) || n.args[0].v === 1) bad = n.args[0].v;
          }
          if (n.t === 'bin' && n.op === '/' && n.b.t === 'call' && n.b.fn === 'sqrt') bad = bad || 'den';
          return false;
        });
        if (bad === 'den') return { ok: false, msg: 'This is equivalent, but there is still a root in the denominator.' };
        if (bad !== null) return { ok: false, msg: 'This is equivalent, but the root of ' + bad + ' can be simplified further — look for a perfect-square (or cube) factor.' };
        return { ok: true };
      }
      case 'positive-exponents': {
        let bad = false;
        hasNode(r, n => { if (n.t === 'bin' && n.op === '^' && ((n.b.t === 'num' && n.b.v < 0) || n.b.t === 'neg')) bad = true; return false; });
        if (bad) return { ok: false, msg: 'This is equivalent, but the answer should use positive exponents only (move negative powers to the other side of the fraction bar).' };
        return { ok: true };
      }
      case 'no-radical-denominator': {
        let bad = false;
        hasNode(r, n => { if (n.t === 'bin' && n.op === '/' && hasNode(n.b, m => (m.t === 'call' && (m.fn === 'sqrt' || m.fn === 'root' || m.fn === 'cbrt')) || (m.t === 'bin' && m.op === '^' && m.b.t === 'bin' && m.b.op === '/'))) bad = true; return false; });
        if (bad) return { ok: false, msg: 'This is equivalent, but there is still a root in the denominator — rationalise it.' };
        return { ok: true };
      }
    }
    return { ok: true };
  }

  // ---------- answer checking ----------
  // spec: {type, value, vars?, form?, solveFor?}
  function checkAnswer(input, spec) {
    const text = String(input || '').trim();
    if (!text) return { ok: false, message: 'Type an answer first.' };
    try {
      switch (spec.type) {
        case 'number': {
          const v = evalConst(text);
          const ok = P.approxEq(v, spec.value) || (spec.tolerance != null && Math.abs(v - spec.value) <= spec.tolerance);
          return { ok, readAs: P.toLatex(P.parse(text)), message: ok ? 'Correct!' : 'Not quite — your answer works out to ' + fmt(v) + '.' };
        }
        case 'expression': {
          const astS = P.parse(text), astR = P.parse(spec.value);
          const allowed = new Set(spec.vars || [...freeVars(astR)]);
          const extra = [...freeVars(astS)].filter(x => !allowed.has(x));
          if (extra.length) return { ok: false, readAs: P.toLatex(astS), message: 'Your answer uses ' + extra.join(', ') + ', which should not appear here.' };
          const cmp = compareExpr(astS, astR, [...allowed]);
          if (cmp.equal === null) return { ok: false, readAs: P.toLatex(astS), message: 'Could not compare — is the expression defined for ordinary values?' };
          if (!cmp.equal) return { ok: false, readAs: P.toLatex(astS), message: 'Not equivalent to the correct answer. For example, when ' + Object.entries(cmp.point).map(([k, x]) => k + ' = ' + fmt(x)).join(', ') + ' yours gives ' + fmt(cmp.s) + ' but the answer gives ' + fmt(cmp.r) + '.' };
          if (spec.form) { const f = checkForm(astS, spec.form); if (!f.ok) return { ok: false, readAs: P.toLatex(astS), message: f.msg, equivalent: true }; }
          return { ok: true, readAs: P.toLatex(astS), message: 'Correct!' };
        }
        case 'set': {
          const S = parseNumberSet(text, spec.vars ? spec.vars[0] : 'x');
          const R = spec.value.slice().sort((a, b) => a - b);
          const ok = numberSetsEqual(S, R);
          let message = 'Correct!';
          if (!ok) {
            const missing = R.filter(r => !S.some(s => P.approxEq(s, r)));
            const extra = S.filter(s => !R.some(r => P.approxEq(s, r)));
            const bits = [];
            if (extra.length) bits.push(fmtList(extra) + (extra.length > 1 ? ' are not solutions' : ' is not a solution') + ' of the original equation' + (spec.extraneousHint ? ' — did you check for extraneous solutions?' : '.'));
            if (missing.length) bits.push('You are missing ' + (missing.length > 1 ? 'solutions' : 'a solution') + '.');
            message = 'Not quite. ' + bits.join(' ');
          }
          return { ok, readAs: setToLatex(S), message };
        }
        case 'interval': {
          const v = spec.vars ? spec.vars[0] : 'x';
          const S = parseIntervalSet(text, v);
          const R = parseIntervalSet(spec.value, v);
          const ok = intervalsEqual(S, R);
          let message = 'Correct!';
          if (!ok) {
            // find a witness point
            const pts = testPointsFor(R).concat(testPointsFor(S));
            const w = pts.find(t => inSet(t, R) !== inSet(t, S));
            message = 'Not quite.' + (w !== undefined ? ' For example, ' + v + ' = ' + fmt(w) + (inSet(w, R) ? ' should be included but is not.' : ' is included but should not be.') : '');
          }
          return { ok, readAs: intervalsToLatex(S), message };
        }
        case 'equation': {
          const relS = P.parseRelation(text);
          if (!relS || relS.ops.length !== 1 || relS.ops[0] !== '=') return { ok: false, message: 'Write an equation with a single = sign.' };
          const relR = P.parseRelation(spec.value);
          const allowed = new Set(spec.vars || [...freeVars(relR.pieces[0]), ...freeVars(relR.pieces[1])]);
          const used = new Set([...freeVars(relS.pieces[0]), ...freeVars(relS.pieces[1])]);
          const extra = [...used].filter(x => !allowed.has(x));
          if (extra.length) return { ok: false, readAs: P.relationToLatex(relS), message: 'Your equation uses ' + extra.join(', ') + ', which should not appear here.' };
          const cmp = compareProportional(relS, relR, [...allowed]);
          if (cmp.equal === null) return { ok: false, readAs: P.relationToLatex(relS), message: 'Could not compare the equations.' };
          if (!cmp.equal) return { ok: false, readAs: P.relationToLatex(relS), message: 'This equation does not describe the same set of points as the correct answer.' };
          if (spec.form === 'integer-coefficients' && cmp.ratio && Math.abs(Math.abs(cmp.ratio) - Math.round(Math.abs(cmp.ratio))) > 1e-9)
            return { ok: true, readAs: P.relationToLatex(relS), message: 'Correct (equivalent). The model answer clears fractions — compare the forms.' };
          return { ok: true, readAs: P.relationToLatex(relS), message: 'Correct!' };
        }
        case 'point': {
          const p = parsePoint(text);
          const ok = P.approxEq(p[0], spec.value[0]) && P.approxEq(p[1], spec.value[1]);
          return { ok, readAs: '(' + fmtTex(p[0]) + ',\\, ' + fmtTex(p[1]) + ')', message: ok ? 'Correct!' : 'Not quite — check each coordinate.' };
        }
        case 'choice': {
          const ok = text === String(spec.value);
          return { ok, message: ok ? 'Correct!' : (spec.wrongMessage || 'Not quite.') };
        }
        case 'text': {
          const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
          const ok = [].concat(spec.value).some(v => norm(v) === norm(text));
          return { ok, message: ok ? 'Correct!' : 'Not quite.' };
        }
      }
      return { ok: false, message: 'Unknown answer type' };
    } catch (e) {
      return { ok: false, error: true, message: 'Could not read your answer: ' + e.message };
    }
  }
  function fmtList(arr) { return arr.map(fmt).join(', '); }

  // test points that probe the endpoints of an interval set
  function testPointsFor(set) {
    const pts = new Set([-7, -1.5, 0, 1.5, 7]);
    for (const I of set) {
      if (isFinite(I.lo)) [I.lo, I.lo - 0.001, I.lo + 0.001, I.lo - 0.5, I.lo + 0.5].forEach(x => pts.add(x));
      if (isFinite(I.hi)) [I.hi, I.hi - 0.001, I.hi + 0.001, I.hi - 0.5, I.hi + 0.5].forEach(x => pts.add(x));
      if (isFinite(I.lo) && isFinite(I.hi)) pts.add((I.lo + I.hi) / 2);
      if (!isFinite(I.lo) && isFinite(I.hi)) pts.add(I.hi - 3);
      if (isFinite(I.lo) && !isFinite(I.hi)) pts.add(I.lo + 3);
    }
    return [...pts];
  }

  // ---------- working checker ----------
  const NOTE_WORDS = /\b(multiply|divide|subtract|add|both|sides|let|so|then|check|lcm|lcd|factor|expand|square|because|since|zeros?|test|sign|chart|substitute|plug|note|reject|extraneous|not|is|a|the|by|of|to|from|solution|answer)\b/i;
  function cleanLine(raw) {
    let s = raw.trim();
    if (!s) return { skip: true };
    if (/^(#|\/\/)/.test(s)) return { note: true, text: s.replace(/^(#|\/\/)\s*/, '') };
    // inline comments
    s = s.split(/\s(#|\/\/)\s?/)[0];
    // leading markers
    let prev;
    do {
      prev = s;
      s = s.replace(/^\s*(step\s*\d+\s*[:.)]?|\d+\s*[.)]\s|[*•]|-\s+(?=[A-Za-z(|])|=>|⇒|→|->|∴|therefore|so|then|thus|hence|and so|we get|gives|giving|i\.e\.|lhs|rhs|let|now)\s*[:,]?\s*/i, '');
      s = s.replace(/^\s*=(?!=)\s*/, ''); // continuation line "= 29/24"
    } while (s !== prev);
    // trailing parenthetical explanation, e.g. "(multiply both sides by 10)"
    s = s.replace(/\(\s*[A-Za-z][^()]*\s[A-Za-z][^()]*\)\s*$/, '').trim();
    s = s.replace(/[,;:]+$/, '').replace(/(?<!\.)\.$/, '').trim();
    if (!s) return { skip: true };
    if (/(≠|!=)/.test(s)) return { note: true, text: s };
    // mostly words? then it's a comment
    const words = s.match(/[A-Za-z]{2,}/g) || [];
    const mathy = /^(sqrt|cbrt|abs|sin|cos|tan|ln|log|exp|pi|inf|infinity|or|and|root|frac|le|ge|cdot|left|right|overline|infty|cup|text)$/i;
    const wordCount = words.filter(w => !mathy.test(w)).length;
    if (wordCount >= 2) return { note: true, text: s };
    return { text: s };
  }

  function modeFor(spec) {
    if (spec.working && spec.working.mode) return spec.working.mode;
    if (spec.type === 'expression') return spec.solveFor ? 'solvefor' : 'expression';
    return { number: 'value', set: 'solve', interval: 'inequality', equation: 'equation' }[spec.type] || 'none';
  }

  function checkWorking(text, spec) {
    const mode = modeFor(spec);
    const v = spec.solveFor || (spec.vars && spec.vars[0]) || 'x';
    const lines = String(text || '').split(/\r?\n/);
    const out = [];
    let prevAst = null, prevBad = false, checked = 0, bad = 0, ok = 0, firstBad = null;

    // reference objects
    let refAst = null, refRel = null, refSet = null, refInts = null, refVars = [];
    try {
      if (mode === 'expression' || mode === 'solvefor') { refAst = P.parse(spec.value); refVars = spec.vars || [...freeVars(refAst)]; }
      if (mode === 'equation') { refRel = P.parseRelation(spec.value); refVars = spec.vars || [...new Set([...freeVars(refRel.pieces[0]), ...freeVars(refRel.pieces[1])])]; }
      if (mode === 'solve') refSet = spec.value.slice().sort((a, b) => a - b);
      if (mode === 'inequality') refInts = parseIntervalSet(spec.value, v);
    } catch (e) { return { lines: [], summary: 'Internal error: bad reference (' + e.message + ')', mode }; }
    const testPts = refInts ? testPointsFor(refInts) : null;

    lines.forEach((raw, idx) => {
      const c = cleanLine(raw);
      const item = { n: idx + 1, raw, status: 'skip', message: '' };
      if (c.skip) return;
      if (c.note) { item.status = 'note'; item.message = 'Comment — not checked.'; out.push(item); return; }
      let st;
      try { st = parseStatement(c.text, v); item.tex = st.tex; }
      catch (e) { item.status = 'error'; item.message = 'Could not read this line: ' + e.message; out.push(item); return; }

      const res = checkLine(st, c.text);
      Object.assign(item, res);
      if (item.status === 'ok') { ok++; checked++; }
      if (item.status === 'bad') { bad++; checked++; if (firstBad === null) firstBad = item.n; }
      out.push(item);
    });

    function checkLine(st, txt) {
      const pieces = st.kind === 'expr' ? [st.ast] : (st.kind === 'rel' && st.rel.ops.every(o => o === '=') ? st.rel.pieces : null);
      const isLabel = a => a.t === 'var' && !refVars.includes(a.name) && a.name !== v;

      if (mode === 'expression') {
        if (!pieces) return { status: 'skip', message: 'Not an expression or equality — not checked.' };
        const extra = [...statementVars(st)].filter(x => !refVars.includes(x) && !(st.kind === 'rel' && st.rel.pieces.some(p => isLabel(p) && p.name === x)));
        if (extra.length) return { status: 'skip', message: 'Uses ' + extra.join(', ') + ' — not checked.' };
        let firstFail = null, lastAst = null;
        for (const p of pieces) {
          if (isLabel(p)) continue;
          lastAst = p;
          const cmp = compareExpr(p, refAst, refVars);
          if (cmp.equal === false && !firstFail) firstFail = { p, cmp };
        }
        if (!lastAst) return { status: 'skip', message: 'Nothing to check on this line.' };
        const r = { lastAst };
        if (firstFail) {
          const { cmp } = firstFail;
          let msg = 'Not equivalent to the original. At ' + Object.entries(cmp.point).map(([k, x]) => k + ' = ' + fmt(x)).join(', ') + ' this gives ' + fmt(cmp.s) + ' but the original gives ' + fmt(cmp.r) + '.';
          if (prevAst && prevBad) { const c2 = compareExpr(firstFail.p, prevAst, refVars); if (c2.equal) msg += ' (It does follow on from the previous line, so the slip is earlier.)'; }
          prevAst = lastAst; prevBad = true;
          return Object.assign(r, { status: 'bad', message: msg });
        }
        prevAst = lastAst; prevBad = false;
        return Object.assign(r, { status: 'ok', message: 'Equivalent to the original ✓' });
      }

      if (mode === 'value') {
        const target = spec.value;
        const sv = statementVars(st);
        if (st.kind === 'expr' && sv.size) return { status: 'skip', message: 'Contains ' + [...sv].join(', ') + ' — not checked.' };
        if (st.kind === 'expr' || (pieces && sv.size === 0)) {
          for (const p of pieces) {
            if (isLabel(p)) continue;
            const val = P.evaluate(p, {});
            if (Number.isNaN(val)) return { status: 'skip', message: 'Could not evaluate this line.' };
            if (!P.approxEq(val, target)) return { status: 'bad', message: 'This works out to ' + fmt(val) + ', not the final answer ' + fmt(target) + ' (fine if it is a side calculation).' };
          }
          return { status: 'ok', message: 'Equals the final answer ✓' };
        }
        if (sv.size === 1) {
          const name = [...sv][0];
          const r = evalStatement(st, { [name]: target }, name);
          if (r === undefined) return { status: 'skip', message: 'Could not evaluate this line.' };
          return r ? { status: 'ok', message: 'Holds when ' + name + ' = ' + fmt(target) + ' ✓' } : { status: 'bad', message: 'Does not hold when ' + name + ' = ' + fmt(target) + ' — the correct value should still satisfy every line.' };
        }
        return { status: 'skip', message: 'Several variables — not checked.' };
      }

      if (mode === 'solve') {
        if (st.kind === 'expr') return { status: 'skip', message: 'No = sign — not checked. Write each step as an equation.' };
        const claimed = statementAsSet(st, v);
        if (claimed !== null) {
          if (numberSetsEqual(claimed, refSet)) return { status: 'ok', message: 'Correct solution set ✓' };
          const extra = claimed.filter(s => !refSet.some(r => P.approxEq(s, r)));
          const missing = refSet.filter(r => !claimed.some(s => P.approxEq(s, r)));
          let msg = '';
          if (extra.length) msg += fmtList(extra) + (extra.length > 1 ? ' do not satisfy' : ' does not satisfy') + ' the original equation. ';
          if (missing.length) msg += 'A solution is missing. ';
          if (extra.length && spec.extraneousHint) msg += 'Substitute back into the original to reject extraneous solutions.';
          return { status: 'bad', message: msg.trim() };
        }
        const sv = statementVars(st);
        const others = [...sv].filter(x => x !== v);
        if (others.length) return { status: 'skip', message: 'Uses ' + others.join(', ') + ' — not checked.' };
        if (!refSet.length) return { status: 'skip', message: 'The original has no solutions, so intermediate lines cannot be tested.' };
        for (const s of refSet) {
          const r = evalStatement(st, { [v]: s }, v);
          if (r === false) return { status: 'bad', message: v + ' = ' + fmt(s) + ' is a solution of the original, but it does not satisfy this line — look at the step before this one.' };
        }
        return { status: 'ok', message: 'Consistent with the true solution' + (refSet.length > 1 ? 's' : '') + ' ✓' };
      }

      if (mode === 'solvefor') {
        // reference: v = refAst(other vars). Each equation must hold when v takes that value.
        if (st.kind === 'expr') return { status: 'skip', message: 'No = sign — not checked.' };
        if (st.kind === 'rel' && st.rel.ops.length === 1 && st.rel.ops[0] === '=') {
          const [a, b] = st.rel.pieces;
          const side = (a.t === 'var' && a.name === v) ? b : (b.t === 'var' && b.name === v) ? a : null;
          if (side && !freeVars(side).has(v)) {
            const cmp = compareExpr(side, refAst, refVars);
            if (cmp.equal) return { status: 'ok', message: 'Correct expression for ' + v + ' ✓' };
            if (cmp.equal === false) return { status: 'bad', message: 'This expression for ' + v + ' is not equivalent to the correct one.' };
          }
        }
        const pts = samplePoints(refVars, 10);
        let tested = 0;
        for (const pt of pts) {
          const val = P.evaluate(refAst, pt);
          if (!num(val) || !isFinite(val)) continue;
          const r = evalStatement(st, Object.assign({ [v]: val }, pt), v);
          if (r === undefined) continue;
          tested++;
          if (r === false) return { status: 'bad', message: 'The correct value of ' + v + ' does not satisfy this line (checked with ' + Object.entries(pt).map(([k, x]) => k + ' = ' + fmt(x)).join(', ') + ').' };
        }
        if (!tested) return { status: 'skip', message: 'Could not test this line.' };
        return { status: 'ok', message: 'Consistent with the correct solution ✓' };
      }

      if (mode === 'inequality') {
        if (st.kind === 'expr') return { status: 'skip', message: 'No inequality sign — not checked.' };
        if (st.kind === 'rel' && st.rel.ops.every(o => o === '=')) return { status: 'info', message: 'Equation step (finding boundary points) — not checked.' };
        const sv = statementVars(st);
        const others = [...sv].filter(x => x !== v);
        if (others.length) return { status: 'skip', message: 'Uses ' + others.join(', ') + ' — not checked.' };
        let tested = 0;
        for (const t of testPts) {
          const expected = inSet(t, refInts);
          const got = evalStatement(st, { [v]: t }, v);
          if (got === undefined) continue;
          tested++;
          if (got !== expected) return { status: 'bad', message: 'Not equivalent to the original: at ' + v + ' = ' + fmt(t) + ' the original is ' + (expected ? 'true' : 'false') + ' but this line is ' + (got ? 'true' : 'false') + '.' };
        }
        if (!tested) return { status: 'skip', message: 'Could not test this line.' };
        return { status: 'ok', message: 'Same solution set as the original ✓' };
      }

      if (mode === 'equation') {
        if (st.kind !== 'rel' || st.rel.ops.length !== 1 || st.rel.ops[0] !== '=') return { status: 'skip', message: 'Not a single equation — not checked.' };
        const sv = statementVars(st);
        const others = [...sv].filter(x => !refVars.includes(x));
        if (others.length) return { status: 'info', message: 'Involves ' + others.join(', ') + ' — not checked.' };
        if (sv.size === 0) return { status: 'skip', message: 'Numeric — not checked.' };
        const cmp = compareProportional(st.rel, refRel, refVars);
        if (cmp.equal) return { status: 'ok', message: 'Equivalent to the correct equation ✓' };
        if (cmp.equal === false) return { status: 'bad', message: 'This equation does not describe the same line/curve as the correct answer.' };
        return { status: 'skip', message: 'Could not compare.' };
      }
      return { status: 'skip', message: 'This exercise type does not support step checking.' };
    }

    let summary;
    if (!out.length) summary = 'Nothing to check yet — type your steps, one per line.';
    else if (mode === 'none') summary = 'Step checking is not available for this exercise type, but you can still get AI feedback.';
    else if (checked === 0) summary = 'No lines could be checked. Write each step as a full equation or expression.';
    else if (bad === 0) summary = 'All ' + checked + ' checked line' + (checked > 1 ? 's are' : ' is') + ' consistent with the correct answer.';
    else summary = bad + ' of ' + checked + ' checked lines look wrong. The first problem is on line ' + firstBad + '.';
    return { lines: out, summary, mode, ok, bad, checked, firstBad };
  }

  const C = { checkAnswer, checkWorking, parseIntervalSet, parseNumberSet, parsePoint, parseStatement, intervalsToLatex, intervalsToInput, setToLatex, compareExpr, compareProportional, normalizeIntervals, fmtTex, fmt, checkForm, freeVars };
  if (typeof module !== 'undefined' && module.exports) module.exports = C;
  root.CH = root.CH || {};
  root.CH.C = C;
})(typeof window !== 'undefined' ? window : globalThis);
