/* CalcHelper — a small expression parser and evaluator for student input.
   Accepts calculator-style syntax with implicit multiplication (2x(x-5)),
   unicode symbols (√ π ² ≤ ∞ ±), absolute-value bars |x-3|, repeating
   decimals (6.666... or 0.\overline{6}) and light LaTeX (\frac{a}{b}, \sqrt{}).
   Produces an AST that can be evaluated numerically and rendered back to
   LaTeX so the student can see how their input was read. */
(function (root) {
  'use strict';

  const FUNCS = {
    sqrt: x => x < 0 ? NaN : Math.sqrt(x),
    cbrt: Math.cbrt,
    abs: Math.abs,
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    asin: Math.asin, acos: Math.acos, atan: Math.atan,
    ln: x => x <= 0 ? NaN : Math.log(x),
    log: x => x <= 0 ? NaN : Math.log10(x),
    exp: Math.exp,
    floor: Math.floor, ceil: Math.ceil,
    root: (x, n) => {
      if (n === undefined) return FUNCS.sqrt(x);
      if (Number.isInteger(n) && n % 2 === 1 && x < 0) return -Math.pow(-x, 1 / n);
      if (x < 0) return NaN;
      return Math.pow(x, 1 / n);
    }
  };
  const ALIASES = { arcsin: 'asin', arccos: 'acos', arctan: 'atan', log10: 'log', lg: 'log', nthroot: 'root' };
  const CONSTS = { pi: Math.PI, inf: Infinity, infinity: Infinity, oo: Infinity };
  const KNOWN = Object.keys(FUNCS).concat(Object.keys(ALIASES), Object.keys(CONSTS))
    .sort((a, b) => b.length - a.length);

  // ---------- normalisation ----------
  const SUPERS = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };

  // Replace \frac{a}{b} (and \dfrac, \tfrac) with ((a)/(b)); \sqrt[n]{a} -> root(a,n); \sqrt{a} -> sqrt(a)
  function matchBrace(s, i) { // s[i] === '{' ; returns index of matching '}'
    let d = 0;
    for (let j = i; j < s.length; j++) {
      if (s[j] === '{') d++;
      else if (s[j] === '}') { d--; if (d === 0) return j; }
    }
    return -1;
  }
  function replaceLatexCommands(s) {
    let guard = 0;
    while (guard++ < 200) {
      const m = /\\[dt]?frac\s*\{/.exec(s);
      if (!m) break;
      const a0 = m.index + m[0].length - 1;
      const a1 = matchBrace(s, a0); if (a1 < 0) break;
      let b0 = a1 + 1; while (b0 < s.length && s[b0] === ' ') b0++;
      if (s[b0] !== '{') break;
      const b1 = matchBrace(s, b0); if (b1 < 0) break;
      const A = s.slice(a0 + 1, a1), B = s.slice(b0 + 1, b1);
      s = s.slice(0, m.index) + '((' + A + ')/(' + B + '))' + s.slice(b1 + 1);
    }
    guard = 0;
    while (guard++ < 200) {
      const m = /\\sqrt\s*(\[([^\]]*)\])?\s*\{/.exec(s);
      if (!m) break;
      const a0 = m.index + m[0].length - 1;
      const a1 = matchBrace(s, a0); if (a1 < 0) break;
      const A = s.slice(a0 + 1, a1);
      const rep = m[2] ? 'root(' + A + ',' + m[2] + ')' : 'sqrt(' + A + ')';
      s = s.slice(0, m.index) + rep + s.slice(a1 + 1);
    }
    guard = 0;
    while (guard++ < 50) {
      const m = /\\overline\s*\{(\d+)\}/.exec(s);
      if (!m) break;
      s = s.slice(0, m.index) + '⟨' + m[1] + '⟩' + s.slice(m.index + m[0].length);
    }
    return s;
  }

  function normalize(str) {
    let s = String(str);
    s = s.replace(/[−–—]/g, '-')
      .replace(/[×⋅∙·]/g, '*')
      .replace(/÷/g, '/')
      .replace(/√/g, 'sqrt')
      .replace(/∛/g, 'cbrt')
      .replace(/π/g, 'pi')
      .replace(/∞/g, 'inf')
      .replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/≠/g, '!=')
      .replace(/…/g, '...')
      .replace(/[½]/g, '(1/2)').replace(/[⅓]/g, '(1/3)').replace(/[¼]/g, '(1/4)').replace(/[¾]/g, '(3/4)')
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, m => '^(' + m.split('').map(c => SUPERS[c]).join('') + ')');
    // LaTeX
    s = replaceLatexCommands(s);
    s = s.replace(/\\left|\\right|\\,|\\;|\\!|\\ /g, ' ')
      .replace(/\\cdot|\\times/g, '*').replace(/\\div/g, '/')
      .replace(/\\pi/g, 'pi').replace(/\\infty/g, 'inf')
      .replace(/\\leq?\b/g, '<=').replace(/\\geq?\b/g, '>=').replace(/\\neq?\b/g, '!=')
      .replace(/\\pm/g, '±').replace(/\\mp/g, '∓')
      .replace(/\\text\s*\{([^}]*)\}/g, ' $1 ')
      .replace(/\\([A-Za-z]+)/g, '$1')
      .replace(/\$/g, '')
      .replace(/\*\*/g, '^');
    return s.trim();
  }

  // ---------- repeating decimals ----------
  // intPart "6", nonRep "1", rep "6"  ->  exact value of 6.1666...
  function repeatingValue(intPart, nonRep, rep) {
    const a = nonRep.length, b = rep.length;
    const AB = Number(nonRep + rep), A = Number(nonRep || '0');
    return Number(intPart || '0') + (AB - A) / (Math.pow(10, a) * (Math.pow(10, b) - 1));
  }
  // From "51515" infer nonRep/rep pair -> {nonRep:'5', rep:'15'} or null
  function inferRepeat(dec) {
    for (let b = 1; b <= 3; b++) {
      if (dec.length < 2 * b) continue;
      const B = dec.slice(-b);
      if (!dec.endsWith(B + B)) continue;
      let A = dec;
      while (A.endsWith(B)) A = A.slice(0, A.length - b);
      return { nonRep: A, rep: B };
    }
    return null;
  }

  // ---------- tokenizer ----------
  function tokenize(s) {
    const toks = [];
    let i = 0;
    const n = s.length;
    while (i < n) {
      const c = s[i];
      if (c === ' ' || c === '\t' || c === '\n' || c === '\r') { i++; continue; }
      // number
      if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(s[i + 1] || ''))) {
        let j = i;
        while (j < n && /[0-9]/.test(s[j])) j++;
        let intPart = s.slice(i, j), dec = '';
        if (s[j] === '.' && /[0-9]/.test(s[j + 1] || '')) {
          let k = j + 1;
          while (k < n && /[0-9]/.test(s[k])) k++;
          dec = s.slice(j + 1, k); j = k;
        } else if (s[j] === '.' && !(s[j + 1] === '.')) { j++; } // "3." -> 3
        let value = Number((intPart || '0') + (dec ? '.' + dec : ''));
        let raw = s.slice(i, j);
        // repeating marker ⟨digits⟩
        if (s[j] === '⟨') {
          const k = s.indexOf('⟩', j);
          if (k > 0) {
            const rep = s.slice(j + 1, k);
            value = repeatingValue(intPart, dec, rep);
            raw = intPart + '.' + dec + '\\overline{' + rep + '}';
            j = k + 1;
          }
        } else if (s.startsWith('...', j)) {
          const inf = dec ? inferRepeat(dec) : null;
          if (inf) {
            value = repeatingValue(intPart, inf.nonRep, inf.rep);
            raw = intPart + '.' + inf.nonRep + '\\overline{' + inf.rep + '}';
          }
          j += 3;
        }
        toks.push({ t: 'num', v: value, raw });
        i = j; continue;
      }
      // identifiers / known names
      if (/[A-Za-z]/.test(c)) {
        let j = i;
        while (j < n && /[A-Za-z]/.test(s[j])) j++;
        let word = s.slice(i, j);
        // log10 / log2 with digits glued on
        if (/^log$/i.test(word) && /^(10|2)/.test(s.slice(j))) {
          const dm = /^(10|2)/.exec(s.slice(j));
          toks.push({ t: 'func', v: dm[1] === '10' ? 'log' : 'log2' });
          i = j + dm[1].length; continue;
        }
        let p = 0;
        while (p < word.length) {
          const rest = word.slice(p);
          const lower = rest.toLowerCase();
          let matched = null;
          for (const k of KNOWN) { if (lower.startsWith(k)) { matched = k; break; } }
          if (matched) {
            const name = ALIASES[matched] || matched;
            if (FUNCS[name] || name === 'log2') toks.push({ t: 'func', v: name });
            else toks.push({ t: 'const', v: name });
            p += matched.length;
          } else {
            toks.push({ t: 'var', v: rest[0] });
            p += 1;
          }
        }
        i = j; continue;
      }
      if ('+-*/^'.includes(c)) { toks.push({ t: 'op', v: c }); i++; continue; }
      if ('([{'.includes(c)) { toks.push({ t: '(' }); i++; continue; }
      if (')]}'.includes(c)) { toks.push({ t: ')' }); i++; continue; }
      if (c === '|') { toks.push({ t: '|' }); i++; continue; }
      if (c === ',') { toks.push({ t: ',' }); i++; continue; }
      if (c === '±' || c === '∓') { toks.push({ t: 'pm', v: c }); i++; continue; }
      if (c === '!') { i++; continue; }
      if (c === '.' && s.startsWith('...', i)) { i += 3; continue; }
      throw new Error('Unexpected character "' + c + '"');
    }
    return toks;
  }

  // ---------- parser ----------
  function parse(str) {
    const toks = tokenize(normalize(str));
    let pos = 0, absDepth = 0;
    const peek = () => toks[pos];
    const next = () => toks[pos++];

    function isValueStart(tok) {
      if (!tok) return false;
      if (tok.t === 'num' || tok.t === 'var' || tok.t === 'const' || tok.t === 'func' || tok.t === '(') return true;
      if (tok.t === '|') return absDepth === 0;
      return false;
    }
    function parseExpr() {
      let left = parseTerm();
      for (;;) {
        const tok = peek();
        if (tok && tok.t === 'op' && (tok.v === '+' || tok.v === '-')) {
          next();
          const right = parseTerm();
          left = { t: 'bin', op: tok.v, a: left, b: right };
        } else if (tok && tok.t === 'pm') {
          throw new Error('± is only allowed in equations and solution sets');
        } else break;
      }
      return left;
    }
    function parseTerm() {
      let left = parseUnary();
      for (;;) {
        const tok = peek();
        if (tok && tok.t === 'op' && (tok.v === '*' || tok.v === '/')) {
          next();
          const right = parseUnary();
          left = { t: 'bin', op: tok.v, a: left, b: right };
        } else if (isValueStart(tok)) {
          const right = parseUnary();
          left = { t: 'bin', op: '*', a: left, b: right, implicit: true };
        } else break;
      }
      return left;
    }
    function parseUnary() {
      const tok = peek();
      if (tok && tok.t === 'op' && tok.v === '-') { next(); return { t: 'neg', a: parseUnary() }; }
      if (tok && tok.t === 'op' && tok.v === '+') { next(); return parseUnary(); }
      return parsePower();
    }
    function parsePower() {
      const base = parseAtom();
      const tok = peek();
      if (tok && tok.t === 'op' && tok.v === '^') {
        next();
        const exp = parseUnary(); // right-assoc, allows 2^-1 and x^2^3 = x^(2^3)
        return { t: 'bin', op: '^', a: base, b: exp };
      }
      return base;
    }
    function parseAtom() {
      const tok = next();
      if (!tok) throw new Error('Unexpected end of input');
      if (tok.t === 'num') return { t: 'num', v: tok.v, raw: tok.raw };
      if (tok.t === 'var') return { t: 'var', name: tok.v };
      if (tok.t === 'const') {
        if (tok.v === 'inf' || tok.v === 'infinity' || tok.v === 'oo') return { t: 'num', v: Infinity, raw: '\\infty' };
        return { t: 'const', name: tok.v };
      }
      if (tok.t === 'func') {
        const p = peek();
        if (p && p.t === '(') {
          next();
          const args = [parseExpr()];
          while (peek() && peek().t === ',') { next(); args.push(parseExpr()); }
          if (!peek() || peek().t !== ')') throw new Error('Missing closing bracket after ' + tok.v);
          next();
          return { t: 'call', fn: tok.v, args };
        }
        // function applied without brackets: sqrt2, sin x
        const arg = parseUnary();
        return { t: 'call', fn: tok.v, args: [arg], noParen: true };
      }
      if (tok.t === '(') {
        const e = parseExpr();
        if (!peek() || peek().t !== ')') throw new Error('Missing closing bracket');
        next();
        return { t: 'group', a: e };
      }
      if (tok.t === '|') {
        absDepth++;
        const e = parseExpr();
        if (!peek() || peek().t !== '|') throw new Error('Missing closing | for absolute value');
        next(); absDepth--;
        return { t: 'call', fn: 'abs', args: [e] };
      }
      if (tok.t === ')') throw new Error('Unexpected closing bracket');
      if (tok.t === 'op') throw new Error('Unexpected operator "' + tok.v + '"');
      if (tok.t === ',') throw new Error('Unexpected comma');
      throw new Error('Could not read the expression');
    }
    if (toks.length === 0) throw new Error('Empty input');
    const ast = parseExpr();
    if (pos < toks.length) {
      const t = toks[pos];
      if (t.t === ')') throw new Error('Unexpected closing bracket');
      throw new Error('Unexpected input near "' + (t.v || t.t) + '"');
    }
    return strip(ast);
  }
  // remove 'group' nodes (they only exist to guide LaTeX rendering of parens)
  function strip(n) {
    if (!n) return n;
    if (n.t === 'group') return strip(n.a);
    if (n.t === 'neg') return { t: 'neg', a: strip(n.a) };
    if (n.t === 'bin') return { t: 'bin', op: n.op, a: strip(n.a), b: strip(n.b), implicit: n.implicit };
    if (n.t === 'call') return { t: 'call', fn: n.fn, args: n.args.map(strip) };
    return n;
  }

  // ---------- evaluation ----------
  function evaluate(n, scope) {
    scope = scope || {};
    switch (n.t) {
      case 'num': return n.v;
      case 'var':
        if (n.name in scope) return scope[n.name];
        if (n.name === 'e') return Math.E;
        return NaN;
      case 'const': return CONSTS[n.name];
      case 'neg': return -evaluate(n.a, scope);
      case 'bin': {
        const a = evaluate(n.a, scope), b = evaluate(n.b, scope);
        switch (n.op) {
          case '+': return a + b;
          case '-': return a - b;
          case '*': return a * b;
          case '/': return b === 0 ? NaN : a / b;
          case '^': {
            if (a === 0 && b < 0) return NaN;
            if (a < 0 && !Number.isInteger(b)) {
              // allow odd roots of negatives written as fractional powers, e.g. (-8)^(1/3)
              const inv = 1 / b;
              if (Math.abs(inv - Math.round(inv)) < 1e-9 && Math.round(inv) % 2 === 1) return -Math.pow(-a, b);
              return NaN;
            }
            return Math.pow(a, b);
          }
        }
        return NaN;
      }
      case 'call': {
        const args = n.args.map(x => evaluate(x, scope));
        if (n.fn === 'log2') return args[0] <= 0 ? NaN : Math.log2(args[0]);
        const f = FUNCS[n.fn];
        if (!f) return NaN;
        return f.apply(null, args);
      }
    }
    return NaN;
  }

  function vars(n, out) {
    out = out || new Set();
    if (!n) return out;
    if (n.t === 'var') out.add(n.name);
    else if (n.t === 'neg') vars(n.a, out);
    else if (n.t === 'bin') { vars(n.a, out); vars(n.b, out); }
    else if (n.t === 'call') n.args.forEach(a => vars(a, out));
    return out;
  }

  // ---------- LaTeX rendering of an AST ----------
  const PREC = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
  function prec(n) {
    if (n.t === 'bin') return n.op === '/' ? 2.5 : PREC[n.op];
    if (n.t === 'neg') return 1.5;
    return 4;
  }
  function fmtNum(v, raw) {
    if (raw && /overline/.test(raw)) return raw;
    if (!isFinite(v)) return v > 0 ? '\\infty' : '-\\infty';
    if (Number.isInteger(v)) return String(v);
    if (raw && /^[0-9.]+$/.test(raw)) return raw;
    return String(Math.round(v * 1e6) / 1e6);
  }
  const FUNC_TEX = { sin: '\\sin', cos: '\\cos', tan: '\\tan', asin: '\\arcsin', acos: '\\arccos', atan: '\\arctan', ln: '\\ln', log: '\\log', log2: '\\log_2', floor: '\\lfloor', ceil: '\\lceil' };
  function wrapIf(s, cond) { return cond ? '\\left(' + s + '\\right)' : s; }
  function toLatex(n) {
    switch (n.t) {
      case 'num': return fmtNum(n.v, n.raw);
      case 'var': return n.name;
      case 'const': return n.name === 'pi' ? '\\pi' : '\\infty';
      case 'neg': {
        const inner = toLatex(n.a);
        return '-' + (prec(n.a) <= 1.5 ? '\\left(' + inner + '\\right)' : inner);
      }
      case 'bin': {
        const A = toLatex(n.a), B = toLatex(n.b);
        const pa = prec(n.a), pb = prec(n.b);
        if (n.op === '+') {
          if (n.b.t === 'neg') return A + ' - ' + wrapIf(toLatex(n.b.a), prec(n.b.a) <= 1);
          if (n.b.t === 'num' && n.b.v < 0) return A + ' - ' + fmtNum(-n.b.v);
          return A + ' + ' + B;
        }
        if (n.op === '-') return A + ' - ' + wrapIf(B, pb <= 1.5);
        if (n.op === '*') {
          const left = wrapIf(A, pa <= 1.5);
          const right = wrapIf(B, pb <= 1.5);
          const needsDot = (n.b.t === 'num' || (n.b.t === 'neg')) || (n.a.t === 'num' && n.b.t === 'num')
            || (n.b.t === 'bin' && n.b.op === '/' && n.a.t === 'bin' && n.a.op === '/');
          return left + (needsDot ? ' \\cdot ' : ' ') + right;
        }
        if (n.op === '/') return '\\frac{' + A + '}{' + B + '}';
        if (n.op === '^') {
          const base = (n.a.t === 'num' && n.a.v >= 0) || n.a.t === 'var' || n.a.t === 'const' || (n.a.t === 'call' && n.a.fn === 'abs')
            ? A : '\\left(' + A + '\\right)';
          return base + '^{' + B + '}';
        }
        return A + n.op + B;
      }
      case 'call': {
        const a = n.args.map(toLatex);
        if (n.fn === 'sqrt') return '\\sqrt{' + a[0] + '}';
        if (n.fn === 'cbrt') return '\\sqrt[3]{' + a[0] + '}';
        if (n.fn === 'root') return '\\sqrt[' + (a[1] || '2') + ']{' + a[0] + '}';
        if (n.fn === 'abs') return '\\left|' + a[0] + '\\right|';
        if (n.fn === 'exp') return 'e^{' + a[0] + '}';
        if (n.fn === 'floor') return '\\lfloor ' + a[0] + ' \\rfloor';
        if (n.fn === 'ceil') return '\\lceil ' + a[0] + ' \\rceil';
        return (FUNC_TEX[n.fn] || ('\\operatorname{' + n.fn + '}')) + '\\left(' + a.join(', ') + '\\right)';
      }
    }
    return '?';
  }

  // ---------- relations ----------
  // "a <= x < b" -> { pieces:[ast,ast,ast], ops:['<=','<'] }
  const REL_RE = /(<=|>=|!=|<|>|=)/;
  function splitRelation(str) {
    const s = normalize(str);
    const parts = s.split(REL_RE);
    const pieces = [], ops = [];
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) pieces.push(parts[i].trim()); else ops.push(parts[i]);
    }
    return { pieces, ops };
  }
  function parseRelation(str) {
    const { pieces, ops } = splitRelation(str);
    if (ops.length === 0) return null;
    if (pieces.some(p => p === '')) throw new Error('A side of the relation is empty');
    return { t: 'rel', pieces: pieces.map(parse), ops, texts: pieces };
  }
  const EPS = 1e-9;
  function approxEq(a, b) {
    if (!isFinite(a) || !isFinite(b)) return a === b;
    return Math.abs(a - b) <= EPS * (1 + Math.max(Math.abs(a), Math.abs(b)));
  }
  // evaluate a relation at a scope -> true / false / undefined (NaN somewhere)
  function evalRelation(rel, scope) {
    const vals = rel.pieces.map(p => evaluate(p, scope));
    if (vals.some(v => Number.isNaN(v))) return undefined;
    for (let i = 0; i < rel.ops.length; i++) {
      const a = vals[i], b = vals[i + 1];
      let ok;
      switch (rel.ops[i]) {
        case '=': ok = approxEq(a, b); break;
        case '!=': ok = !approxEq(a, b); break;
        case '<': ok = a < b && !approxEq(a, b); break;
        case '>': ok = a > b && !approxEq(a, b); break;
        case '<=': ok = a < b || approxEq(a, b); break;
        case '>=': ok = a > b || approxEq(a, b); break;
      }
      if (!ok) return false;
    }
    return true;
  }
  const OP_TEX = { '<=': '\\le', '>=': '\\ge', '!=': '\\ne', '<': '<', '>': '>', '=': '=' };
  function relationToLatex(rel) {
    let s = toLatex(rel.pieces[0]);
    for (let i = 0; i < rel.ops.length; i++) s += ' ' + OP_TEX[rel.ops[i]] + ' ' + toLatex(rel.pieces[i + 1]);
    return s;
  }

  const P = { normalize, tokenize, parse, evaluate, vars, toLatex, splitRelation, parseRelation, evalRelation, relationToLatex, approxEq, EPS, FUNCS, CONSTS };
  if (typeof module !== 'undefined' && module.exports) module.exports = P;
  root.CH = root.CH || {};
  root.CH.P = P;
})(typeof window !== 'undefined' ? window : globalThis);
