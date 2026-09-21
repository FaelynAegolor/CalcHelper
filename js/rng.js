/* CalcHelper — seeded random numbers and small maths helpers shared by the
   practice generators and the checker. Works in the browser (window.CH) and
   in Node (module.exports) so the engine can be unit-tested. */
(function (root) {
  'use strict';

  // Mulberry32: tiny, fast, good enough for problem generation.
  function makeRng(seed) {
    let a = (seed >>> 0) || 0x9e3779b9;
    const next = function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const R = {
      seed: seed,
      next: next,
      // integer in [lo, hi] inclusive
      int(lo, hi) { return lo + Math.floor(next() * (hi - lo + 1)); },
      // non-zero integer in [lo, hi]
      nz(lo, hi) { let v = 0; while (v === 0) v = R.int(lo, hi); return v; },
      sign() { return next() < 0.5 ? -1 : 1; },
      bool(p) { return next() < (p === undefined ? 0.5 : p); },
      pick(arr) { return arr[Math.floor(next() * arr.length)]; },
      shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(next() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      },
      // two distinct integers
      distinct(lo, hi) {
        const a = R.int(lo, hi); let b = R.int(lo, hi);
        while (b === a) b = R.int(lo, hi);
        return [a, b];
      }
    };
    return R;
  }

  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { [a, b] = [b, a % b]; }
    return a || 1;
  }
  function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }

  // Reduce n/d, keep the sign on the numerator.
  function frac(n, d) {
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d);
    return { n: n / g, d: d / g };
  }

  // LaTeX for n/d (reduced). Integers print without a fraction bar.
  function fracTex(n, d, opts) {
    const f = frac(n, d);
    const cmd = (opts && opts.small) ? '\tfrac' : '\frac';
    if (f.d === 1) return String(f.n);
    return (f.n < 0 ? '-' : '') + cmd + '{' + Math.abs(f.n) + '}{' + f.d + '}';
  }
  // Parser-syntax string for n/d, e.g. "-2/3" or "5".
  function fracStr(n, d) {
    const f = frac(n, d);
    return f.d === 1 ? String(f.n) : f.n + '/' + f.d;
  }

  // "+ 3" / "- 3" / "" for building polynomial strings; first=true omits the plus.
  function signed(n, first) {
    if (n === 0) return '';
    if (n < 0) return (first ? '-' : '- ') + Math.abs(n);
    return (first ? '' : '+ ') + n;
  }

  // coefficient (possibly fraction {n,d}) times a monomial, in LaTeX
  function coefTex(c) { // c is number
    return String(c);
  }

  // Polynomial from coefficient array, highest degree first, e.g. [2,-7,-7,12]
  // -> "2x^{3} - 7x^{2} - 7x + 12". Variable defaults to x.
  function polyTex(coeffs, v) {
    v = v || 'x';
    const n = coeffs.length - 1;
    let out = '';
    coeffs.forEach((c, i) => {
      const deg = n - i;
      if (c === 0) return;
      const abs = Math.abs(c);
      let term;
      if (deg === 0) term = String(abs);
      else {
        const coef = abs === 1 ? '' : String(abs);
        term = coef + v + (deg === 1 ? '' : '^{' + deg + '}');
      }
      if (out === '') out = (c < 0 ? '-' : '') + term;
      else out += (c < 0 ? ' - ' : ' + ') + term;
    });
    return out === '' ? '0' : out;
  }
  // Same in parser syntax: "2x^3 - 7x^2 - 7x + 12"
  function polyStr(coeffs, v) {
    v = v || 'x';
    const n = coeffs.length - 1;
    let out = '';
    coeffs.forEach((c, i) => {
      const deg = n - i;
      if (c === 0) return;
      const abs = Math.abs(c);
      let term;
      if (deg === 0) term = String(abs);
      else term = (abs === 1 ? '' : String(abs)) + v + (deg === 1 ? '' : '^' + deg);
      if (out === '') out = (c < 0 ? '-' : '') + term;
      else out += (c < 0 ? ' - ' : ' + ') + term;
    });
    return out === '' ? '0' : out;
  }
  // Multiply two polynomials (coefficient arrays, highest first).
  function polyMul(a, b) {
    const out = new Array(a.length + b.length - 1).fill(0);
    for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) out[i + j] += a[i] * b[j];
    return out;
  }
  function polyAdd(a, b) {
    const n = Math.max(a.length, b.length);
    const pa = new Array(n - a.length).fill(0).concat(a);
    const pb = new Array(n - b.length).fill(0).concat(b);
    return pa.map((v, i) => v + pb[i]);
  }

  // Linear factor "x + 3" / "x - 3" / "2x + 1" in LaTeX and parser syntax.
  function linTex(a, b, v) { return polyTex([a, b], v); }
  function linStr(a, b, v) { return polyStr([a, b], v); }

  // Pull square factors out of sqrt(n): 72 -> {coef: 6, rad: 2}
  function sqrtSimplify(n) {
    let coef = 1, rad = n;
    for (let p = 2; p * p <= rad; p++) {
      while (rad % (p * p) === 0) { rad /= p * p; coef *= p; }
    }
    return { coef, rad };
  }
  // LaTeX for c*sqrt(n) simplified; e.g. sqrtTex(72) -> "6\sqrt{2}", sqrtTex(9) -> "3"
  function sqrtTex(n) {
    const s = sqrtSimplify(n);
    if (s.rad === 1) return String(s.coef);
    return (s.coef === 1 ? '' : s.coef) + '\sqrt{' + s.rad + '}';
  }
  function sqrtStr(n) {
    const s = sqrtSimplify(n);
    if (s.rad === 1) return String(s.coef);
    return (s.coef === 1 ? '' : s.coef + '*') + 'sqrt(' + s.rad + ')';
  }

  function pointTex(x, y) { return '(' + x + ',\, ' + y + ')'; }

  function isPerfectSquare(n) { const r = Math.round(Math.sqrt(n)); return n >= 0 && r * r === n; }

  const M = {
    makeRng, gcd, lcm, frac, fracTex, fracStr, signed, coefTex, polyTex, polyStr, polyMul, polyAdd,
    linTex, linStr, sqrtSimplify, sqrtTex, sqrtStr, pointTex, isPerfectSquare
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = M;
  root.CH = root.CH || {};
  root.CH.M = M;
})(typeof window !== 'undefined' ? window : globalThis);
