#!/usr/bin/env node
/* Alignment audit against the real course material.
 *
 * Every problem below comes from the course worksheets (part1/part2/part3.pdf) and every
 * `official` value comes from the supplied answer key. Two things are checked:
 *
 *   1. CORRECTNESS - the official answer really does answer the official problem, verified
 *      numerically with the site's own engine (so it also tests the engine).
 *   2. COVERAGE    - `covers` names the exercise or generator on the site that teaches the
 *      same skill, or null if nothing on the site covers it.
 *
 * Usage: node tools/check-alignment.js [--gaps]
 */
const path = require('path');
for (const f of ['js/rng.js', 'js/mathparse.js', 'js/checker.js', 'js/render.js', 'js/viz.js', 'js/registry.js']) require(path.join(__dirname, '..', f));
const fs = require('fs');
const CH = globalThis.CH, P = CH.P, C = CH.C;
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
for (const m of html.matchAll(/<script src="(js\/content\/[^"]+)"/g)) require(path.join(__dirname, '..', m[1]));

// ---------------------------------------------------------------- the course material
// kind: num | expr | solve | ineq | rel | point | fact
const CASES = [
  // ---------------------------------------------------------------- 1.1 Real Numbers
  { sec: '1.1', ref: 'classify', kind: 'fact', what: 'classify a list as natural / integer / rational / irrational', covers: '1.1-e10 (partly: single multiple-choice only)' },
  { sec: '1.1', ref: 'sets D', kind: 'ineq', problem: '-4 < x < 1', official: '(-4, 1)', covers: '1.1-e12, 1.1-g-setbuilder', what: 'set-builder {x : -4 < x < 1} to interval' },
  { sec: '1.1', ref: 'sets E', kind: 'ineq', problem: '-1 <= x <= 3', official: '[-1, 3]', covers: '1.1-e12, 1.1-g-setbuilder', what: 'set-builder to interval' },
  { sec: '1.1', ref: 'D n E', kind: 'set-op', a: '(-4, 1)', b: '[-1, 3]', op: 'n', official: '[-1, 1)', covers: '1.1-e7, 1.1-g-intervals' },
  { sec: '1.1', ref: 'D u E', kind: 'set-op', a: '(-4, 1)', b: '[-1, 3]', op: 'u', official: '(-4, 3]', covers: '1.1-e7, 1.1-g-intervals' },
  { sec: '1.1', ref: 'A n C', kind: 'set-op', a: '(-2, 2]', b: '(6, inf)', op: 'n', official: 'empty', covers: '1.1-e13, 1.1-g-intervals', what: 'intersection of DISJOINT intervals (empty set)' },
  { sec: '1.1', ref: 'A u C', kind: 'set-op', a: '(-2, 2]', b: '(6, inf)', op: 'u', official: '(-2, 2] U (6, inf)', covers: '1.1-e13, 1.1-g-intervals', what: 'union of DISJOINT intervals (two pieces)' },
  { sec: '1.1', ref: '45a', kind: 'set-op', a: '(-inf, 4)', b: '(-1, 5]', op: 'u', official: '(-inf, 5]', covers: '1.1-g-intervals' },
  { sec: '1.1', ref: '45b', kind: 'set-op', a: '(-inf, 4)', b: '(-1, 5]', op: 'n', official: '(-1, 4)', covers: '1.1-g-intervals' },
  { sec: '1.1', ref: '67a', kind: 'num', problem: '|100|', official: '100', covers: '1.1-e8' },
  { sec: '1.1', ref: '67b', kind: 'num', problem: '|-73|', official: '73', covers: '1.1-e8' },
  { sec: '1.1', ref: '68a', kind: 'num', problem: '|sqrt(5) - 5|', official: '5 - sqrt(5)', covers: '1.1-e8' },
  { sec: '1.1', ref: '68b', kind: 'num', problem: '|10 - pi|', official: '10 - pi', covers: '1.1-e8' },
  { sec: '1.1', ref: '81', kind: 'expr', problem: '|a - b|', official: 'b - a', vars: ['a', 'b'], assume: 'a < b', covers: '1.1-e14', what: 'SYMBOLIC absolute value under a condition' },
  { sec: '1.1', ref: '82', kind: 'expr', problem: 'a + b + |a - b|', official: '2b', vars: ['a', 'b'], assume: 'a < b', covers: '1.1-e15', what: 'symbolic absolute value under a condition' },
  { sec: '1.1', ref: '30a', kind: 'num', problem: '2/3 - 3/5', official: '1/15', covers: '1.1-e4, 1.1-g-fracadd' },
  { sec: '1.1', ref: '30b', kind: 'num', problem: '5/8 - 1/6', official: '11/24', covers: '1.1-e4, 1.1-g-fracadd' },
  { sec: '1.1', ref: '32a', kind: 'num', problem: '2/(2/3) - (2/3)/2', official: '8/3', covers: '1.1-e5, 1.1-g-compound' },
  { sec: '1.1', ref: '32b', kind: 'num', problem: '(2/5 + 1/2)/(1/10 + 3/15)', official: '3', covers: '1.1-e5, 1.1-g-compound' },
  { sec: '1.1', ref: '77a', kind: 'num', problem: '0.777...', official: '7/9', covers: '1.1-e1, 1.1-g-repeat' },
  { sec: '1.1', ref: '77b', kind: 'num', problem: '0.2888...', official: '13/45', covers: '1.1-e3, 1.1-g-repeat' },
  { sec: '1.1', ref: '77c', kind: 'num', problem: '0.575757...', official: '19/33', covers: '1.1-e1, 1.1-g-repeat' },
  { sec: '1.1', ref: '78a', kind: 'num', problem: '5.232323...', official: '518/99', covers: '1.1-e2, 1.1-g-repeat' },
  { sec: '1.1', ref: '78b', kind: 'num', problem: '1.3777...', official: '62/45', covers: '1.1-e3, 1.1-g-repeat' },

  // ---------------------------------------------------------------- 1.2 Exponents and Radicals
  { sec: '1.2', ref: '19a', kind: 'num', problem: '(5/3)^0 * 2^-1', official: '1/2', covers: '1.2-e4, 1.2-g-negfrac' },
  { sec: '1.2', ref: '19b', kind: 'num', problem: '2^-3/3^0', official: '1/8', covers: '1.2-g-negfrac' },
  { sec: '1.2', ref: '19c', kind: 'num', problem: '(2/3)^-2', official: '9/4', covers: '1.2-e4, 1.2-g-negfrac' },
  { sec: '1.2', ref: '36a', kind: 'expr', problem: '(8m^-2 n^4)(1/2 n^-2)', official: '4n^2/m^2', vars: ['m', 'n'], covers: '1.2-e3, 1.2-g-laws' },
  { sec: '1.2', ref: '36b', kind: 'expr', problem: '(3a^4 b^-2)^3 (a^2 b^-1)', official: '27a^14/b^7', vars: ['a', 'b'], covers: '1.2-e1, 1.2-g-laws' },
  { sec: '1.2', ref: '37a', kind: 'expr', problem: 'x^2 y^-1/x^-5', official: 'x^7/y', vars: ['x', 'y'], covers: '1.2-e3, 1.2-g-laws' },
  { sec: '1.2', ref: '37b', kind: 'expr', problem: '(a^3/(2b^2))^3', official: 'a^9/(8b^6)', vars: ['a', 'b'], covers: '1.2-g-laws' },
  { sec: '1.2', ref: '39a', kind: 'expr', problem: '(a^2/b)^5 (a^3 b^2/c^3)^3', official: 'a^19 b/c^9', vars: ['a', 'b', 'c'], covers: '1.2-g-laws' },
  { sec: '1.2', ref: '39b', kind: 'expr', problem: '(u^-1 v^2)^2/((u^3 v^-2)^3)', official: 'v^10/u^11', vars: ['u', 'v'], covers: '1.2-g-laws' },
  { sec: '1.2', ref: '44a', kind: 'expr', problem: '(s^2 t^-4/(5s^-1 t))^-2', official: '25t^10/s^6', vars: ['s', 't'], covers: '1.2-g-laws' },
  { sec: '1.2', ref: '44b', kind: 'expr', problem: '(x y^-2 z^-3/(x^2 y^3 z^-4))^-3', official: 'x^3 y^15/z^3', vars: ['x', 'y', 'z'], covers: '1.2-g-laws' },
  { sec: '1.2', ref: '69a', kind: 'expr', problem: '(x^(3/2)/y^(-1/2))^4 (x^-2/y^3)', official: 'x^4/y', vars: ['x', 'y'], covers: '1.2-e9' },
  { sec: '1.2', ref: '69b', kind: 'expr', problem: '(4y^3 z^(2/3)/x^(1/2))^2 (x^-3 y^6/(8z^4))^(1/3)', official: '8y^8/x^2', vars: ['x', 'y', 'z'], covers: '1.2-e9' },
  { sec: '1.2', ref: '24a', kind: 'num', problem: '2*root(81,3)', official: '6*root(3,3)', covers: '1.2-e8, 1.2-g-simplify-root' },
  { sec: '1.2', ref: '24b', kind: 'num', problem: 'sqrt(18)/sqrt(25)', official: '3sqrt(2)/5', covers: '1.2-e6, 1.2-g-simplify-root' },
  { sec: '1.2', ref: '24c', kind: 'num', problem: 'sqrt(12/49)', official: '2sqrt(3)/7', covers: '1.2-e6' },
  { sec: '1.2', ref: '27a', kind: 'num', problem: 'sqrt(132)/sqrt(3)', official: '2sqrt(11)', covers: '1.2-e6' },
  { sec: '1.2', ref: '27b', kind: 'num', problem: 'root(2,3)*root(32,3)', official: '4', covers: '1.2-g-simplify-root' },
  { sec: '1.2', ref: '27c', kind: 'num', problem: 'root(1/4,4)*root(1/64,4)', official: '1/4', covers: '1.2-e20, 1.2-g-nested' },
  { sec: '1.2', ref: '47a', kind: 'expr', problem: 'root(64a^6 b^7, 6)', official: '2ab*root(b,6)', vars: ['a', 'b'], assume: 'a > 0', covers: '1.2-e18' },
  { sec: '1.2', ref: '47b', kind: 'expr', problem: 'root(a^2 b,3)*root(64a^4 b,3)', official: '4a^2*root(b^2,3)', vars: ['a', 'b'], covers: '1.2-e19, 1.2-g-nested' },
  { sec: '1.2', ref: '48a', kind: 'expr', problem: 'root(x^4 y^2 z^2, 4)', official: 'abs(x)*sqrt(y*z)', vars: ['x', 'y', 'z'], assume: 'y*z > 0', covers: '1.2-e13, 1.2-g-absroot' },
  { sec: '1.2', ref: '48b', kind: 'expr', problem: 'root(sqrt(64x^6),3)', official: '2x', vars: ['x'], assume: 'x > 0', covers: '1.2-e15, 1.2-g-nested' },
  { sec: '1.2', ref: '50a', kind: 'num', problem: 'sqrt(125) + sqrt(45)', official: '8sqrt(5)', covers: '1.2-e7, 1.2-g-add-roots' },
  { sec: '1.2', ref: '50b', kind: 'num', problem: 'root(54,3) - root(16,3)', official: 'root(2,3)', covers: '1.2-e17, 1.2-g-add-roots' },
  { sec: '1.2', ref: '57a', kind: 'num', problem: '32^(2/5)', official: '4', covers: '1.2-e5, 1.2-g-rational' },
  { sec: '1.2', ref: '57b', kind: 'num', problem: '(4/9)^(-1/2)', official: '3/2', covers: '1.2-e5, 1.2-g-rational' },
  { sec: '1.2', ref: '57c', kind: 'num', problem: '(16/81)^(3/4)', official: '8/27', covers: '1.2-e5, 1.2-g-rational' },
  { sec: '1.2', ref: '60a', kind: 'num', problem: '3^(2/7)*3^(12/7)', official: '9', covers: '1.2-e9' },
  { sec: '1.2', ref: '60b', kind: 'num', problem: '7^(2/3)/7^(5/3)', official: '1/7', covers: '1.2-e9' },
  { sec: '1.2', ref: '75a', kind: 'expr', problem: 'sqrt(4s t^3)*root(s^3 t^2, 6)', official: '2s*t*root(t^5,6)', vars: ['s', 't'], assume: 's > 0', covers: '1.2-e16, 1.2-g-nested' },
  { sec: '1.2', ref: '75b', kind: 'expr', problem: 'root(x^7,4)/root(x^3,4)', official: 'abs(x)', vars: ['x'], covers: '1.2-e14, 1.2-g-absroot' },
  { sec: '1.2', ref: '77a', kind: 'expr', problem: 'root(y,3)*sqrt(y)', official: 'root(y^5,6)', vars: ['y'], covers: '1.2-e16, 1.2-g-nested' },
  { sec: '1.2', ref: '77b', kind: 'expr', problem: 'sqrt(16u^3 v/(u v^5))', official: '4u/v^2', vars: ['u', 'v'], assume: 'u > 0', covers: '1.2-g-laws' },
  { sec: '1.2', ref: '80a', kind: 'num', problem: '12/sqrt(3)', official: '4sqrt(3)', covers: '1.2-e10, 1.2-g-rationalise' },
  { sec: '1.2', ref: '80b', kind: 'num', problem: 'sqrt(12/5)', official: '2sqrt(15)/5', covers: '1.2-e10, 1.2-g-rationalise' },

  // ---------------------------------------------------------------- 1.3 Algebraic Expressions
  { sec: '1.3', ref: '17', kind: 'expr', problem: '(-2x^2 - 3x + 1) + (3x^2 + 5x - 4)', official: 'x^2 + 2x - 3', vars: ['x'], covers: '1.3-e1' },
  { sec: '1.3', ref: '22', kind: 'expr', problem: '4(x^2 - 3x + 5) - 3(x^2 - 2x + 1)', official: 'x^2 - 6x + 17', vars: ['x'], covers: '1.3-e1' },
  { sec: '1.3', ref: '24', kind: 'expr', problem: '5(3t - 4) - (t^2 + 2) - 2t(t - 3)', official: '-3t^2 + 21t - 22', vars: ['t'], covers: '1.3-e1' },
  { sec: '1.3', ref: '27', kind: 'expr', problem: '(3x + 5)(2x - 1)', official: '6x^2 + 7x - 5', vars: ['x'], covers: '1.3-e2, 1.3-g-expand' },
  { sec: '1.3', ref: '35', kind: 'expr', problem: '(2x + 3y)^2', official: '4x^2 + 12xy + 9y^2', vars: ['x', 'y'], covers: '1.3-e14' },
  { sec: '1.3', ref: '41', kind: 'expr', problem: '(sqrt(x) + 2)(sqrt(x) - 2)', official: 'x - 4', vars: ['x'], covers: '1.3-e15, 1.3-g-radical-products' },
  { sec: '1.3', ref: '44', kind: 'expr', problem: '(x - 3)^3', official: 'x^3 - 9x^2 + 27x - 27', vars: ['x'], covers: '1.3-e5, 1.3-g-special' },
  { sec: '1.3', ref: '46', kind: 'expr', problem: '(3 + 2y)^3', official: '27 + 54y + 36y^2 + 8y^3', vars: ['y'], covers: '1.3-e5, 1.3-g-special' },
  { sec: '1.3', ref: '49', kind: 'expr', problem: '(2x - 5)(x^2 - x + 1)', official: '2x^3 - 7x^2 + 7x - 5', vars: ['x'], covers: '1.3-e3' },
  { sec: '1.3', ref: '52', kind: 'expr', problem: 'x^(3/2)(sqrt(x) - 1/sqrt(x))', official: 'x^2 - x', vars: ['x'], covers: '1.3-e18, 1.3-g-radical-products' },
  { sec: '1.3', ref: '53', kind: 'expr', problem: 'y^(1/3)(y^(2/3) + y^(5/3))', official: 'y + y^2', vars: ['y'], covers: '1.3-e19, 1.3-g-radical-products' },
  { sec: '1.3', ref: '56', kind: 'expr', problem: '(x^(1/2) + y^(1/2))(x^(1/2) - y^(1/2))', official: 'x - y', vars: ['x', 'y'], covers: '1.3-e17, 1.3-g-radical-products' },
  { sec: '1.3', ref: '58', kind: 'expr', problem: '(sqrt(h^2 + 1) + 1)(sqrt(h^2 + 1) - 1)', official: 'h^2', vars: ['h'], covers: '1.3-e16, 1.3-g-radical-products' },
  { sec: '1.3', ref: '120', kind: 'expr', problem: '18y^3 x^2 - 2x y^4', official: '2x y^3 (9x - y)', vars: ['x', 'y'], covers: '1.3-e27' },
  { sec: '1.3', ref: '66', kind: 'expr', problem: '(z + 2)^2 - 5(z + 2)', official: '(z + 2)(z - 3)', vars: ['z'], covers: '1.3-e20, 1.3-g-bracket-factor' },
  { sec: '1.3', ref: '113', kind: 'expr', problem: 'x^2(x^2 - 1) - 9(x^2 - 1)', official: '(x - 1)(x + 1)(x - 3)(x + 3)', vars: ['x'], covers: '1.3-e23' },
  { sec: '1.3', ref: '86', kind: 'expr', problem: '3x^3 - x^2 + 6x - 2', official: '(3x - 1)(x^2 + 2)', vars: ['x'], covers: '1.3-e12, 1.3-g-grouping' },
  { sec: '1.3', ref: '121', kind: 'expr', problem: '3x^3 - x^2 - 12x + 4', official: '(3x - 1)(x - 2)(x + 2)', vars: ['x'], covers: '1.3-g-grouping' },
  { sec: '1.3', ref: '78', kind: 'expr', problem: '(x + 3)^2 - 4', official: '(x + 1)(x + 5)', vars: ['x'], covers: '1.3-e21, 1.3-g-bracket-factor' },
  { sec: '1.3', ref: '80', kind: 'expr', problem: 'a^3 - b^6', official: '(a - b^2)(a^2 + a b^2 + b^4)', vars: ['a', 'b'], covers: '1.3-e11, 1.3-g-squares-cubes (numeric B only)' },
  { sec: '1.3', ref: '82', kind: 'expr', problem: '1 + 1000y^3', official: '(1 + 10y)(1 - 10y + 100y^2)', vars: ['y'], covers: '1.3-e11, 1.3-g-squares-cubes' },
  { sec: '1.3', ref: '93', kind: 'expr', problem: 'x^(-3/2) + 2x^(-1/2) + x^(1/2)', official: 'x^(-3/2)(x + 1)^2', vars: ['x'], covers: '1.3-e26' },
  { sec: '1.3', ref: '111', kind: 'expr', problem: '(a + b)^2 - (a - b)^2', official: '4ab', vars: ['a', 'b'], covers: '1.3-e22' },
  { sec: '1.3', ref: '70', kind: 'expr', problem: 'x^2 + 7x + 12', official: '(x + 3)(x + 4)', vars: ['x'], covers: '1.3-e6, 1.3-g-trinomial', note: 'answer key misprints this as (3x+5)(2x-1)' },
  { sec: '1.3', ref: '76', kind: 'expr', problem: '2(a + b)^2 + 5(a + b) - 3', official: '(2(a + b) - 1)(a + b + 3)', vars: ['a', 'b'], covers: '1.3-e24, 1.3-g-substitution' },
  { sec: '1.3', ref: '125', kind: 'expr', problem: '(a^2 + 1)^2 - 7(a^2 + 1) + 10', official: '(a - 2)(a + 2)(a - 1)(a + 1)', vars: ['a'], covers: '1.3-e25' },

  // ---------------------------------------------------------------- 1.4 Rational Expressions
  { sec: '1.4', ref: '19', kind: 'expr', problem: '(x^2 + 5x + 6)/(x^2 + 8x + 15)', official: '(x + 2)/(x + 5)', vars: ['x'], covers: '1.4-e5, 1.4-g-simplify' },
  { sec: '1.4', ref: '24', kind: 'expr', problem: '(1 - x^2)/(x^3 - 1)', official: '-(x + 1)/(x^2 + x + 1)', vars: ['x'], covers: '1.4-e13' },
  { sec: '1.4', ref: '27', kind: 'expr', problem: '(x^2 + 2x - 15)/(x^2 - 25) * (x - 5)/(x + 2)', official: '(x - 3)/(x + 2)', vars: ['x'], covers: '1.4-e6, 1.4-g-muldiv' },
  { sec: '1.4', ref: '33', kind: 'expr', problem: '(x + 3)/(4x^2 - 9) / ((x^2 + 7x + 12)/(2x^2 + 7x - 15))', official: '(x + 5)/((2x + 3)(x + 4))', vars: ['x'], covers: '1.4-e7, 1.4-g-muldiv' },
  { sec: '1.4', ref: '41', kind: 'expr', problem: '1/(x + 5) + 2/(x - 3)', official: '(3x + 7)/((x + 5)(x - 3))', vars: ['x'], covers: '1.4-g-addsub' },
  { sec: '1.4', ref: '45', kind: 'expr', problem: '5/(2x - 3) - 3/(2x - 3)^2', official: '(10x - 18)/(2x - 3)^2', vars: ['x'], covers: '1.4-e9 (the + version)' },
  { sec: '1.4', ref: '52', kind: 'expr', problem: 'x/(x^2 - 4) + 1/(x - 2)', official: '(2x + 2)/((x - 2)(x + 2))', vars: ['x'], covers: '1.4-e8, 1.4-g-addsub' },
  { sec: '1.4', ref: '54', kind: 'expr', problem: 'x/(x^2 + x - 2) - 2/(x^2 - 5x + 4)', official: '(x^2 - 6x - 4)/((x + 2)(x - 1)(x - 4))', vars: ['x'], covers: '1.4-e14' },
  { sec: '1.4', ref: '59', kind: 'expr', problem: '(1 + 1/x)/(1/x - 2)', official: '(x + 1)/(1 - 2x)', vars: ['x'], covers: '1.4-e10, 1.4-g-compound' },
  { sec: '1.4', ref: '65', kind: 'expr', problem: '(x - x/y)/(y - y/x)', official: 'x^2(y - 1)/(y^2(x - 1))', vars: ['x', 'y'], covers: '1.4-g-compound (xy case)' },
  { sec: '1.4', ref: '68', kind: 'expr', problem: 'x - y/(x/y + y/x)', official: 'x^3/(x^2 + y^2)', vars: ['x', 'y'], covers: '1.4-e17' },
  { sec: '1.4', ref: '69', kind: 'expr', problem: '(x^-2 - y^-2)/(x^-1 + y^-1)', official: '(y - x)/(x y)', vars: ['x', 'y'], covers: '1.4-e15, 1.4-g-compound' },
  { sec: '1.4', ref: '71', kind: 'expr', problem: '1 - 1/(1 - 1/x)', official: '-1/(x - 1)', vars: ['x'], covers: '1.4-e16, 1.4-g-compound' },
  { sec: '1.4', ref: '86', kind: 'num', problem: '3/(2 - sqrt(5))', official: '-6 - 3sqrt(5)', covers: '1.2-e11, 1.2-g-rationalise' },
  { sec: '1.4', ref: '89', kind: 'expr', problem: 'y/(sqrt(3) + sqrt(y))', official: 'y(sqrt(3) - sqrt(y))/(3 - y)', vars: ['y'], covers: '1.4-e18' },
  { sec: '1.4', ref: '91', kind: 'num', problem: '(1 - sqrt(5))/3', official: '-4/(3(1 + sqrt(5)))', covers: '1.4-e12' },
  { sec: '1.4', ref: '95', kind: 'expr', problem: 'sqrt(x^2 + 1) - x', official: '1/(sqrt(x^2 + 1) + x)', vars: ['x'], covers: '1.4-e12' },

  // ---------------------------------------------------------------- 1.5 Equations
  { sec: '1.5', ref: '18', kind: 'solve', problem: '2x + 3 = 7 - 3x', official: [4 / 5], covers: '1.5-e1, 1.5-g-linear' },
  { sec: '1.5', ref: '21', kind: 'solve', problem: '2(1 - x) = 3(1 + 2x) + 5', official: [-3 / 4], covers: '1.5-e1, 1.5-g-linear' },
  { sec: '1.5', ref: '26', kind: 'solve', problem: '(2x - 1)/(x + 2) = 4/5', official: [13 / 6], covers: '1.5-e11, 1.5-g-fraction' },
  { sec: '1.5', ref: '29', kind: 'solve', problem: '(t - 4)^2 = (t + 4)^2 + 32', official: [-2], v: 't', covers: '1.5-e18' },
  { sec: '1.5', ref: '45', kind: 'solve', problem: 'x^2 + x - 12 = 0', official: [-4, 3], covers: '1.5-e4, 1.5-g-factor' },
  { sec: '1.5', ref: '47', kind: 'solve', problem: 'x^2 - 7x + 12 = 0', official: [3, 4], covers: '1.5-e4, 1.5-g-factor' },
  { sec: '1.5', ref: '54', kind: 'solve', problem: '3x^2 - 27 = 0', official: [-3, 3], covers: '1.5-g-factor' },
  { sec: '1.5', ref: '55', kind: 'solve', problem: '(2x - 5)^2 = 81', official: [-2, 7], covers: '1.5-e19, 1.5-g-sqrtboth' },
  { sec: '1.5', ref: 'CS1', kind: 'solve', problem: 'x^2 - 6x + 11 = 0', official: [], covers: '1.5-e20, 1.5-g-complete' },
  { sec: '1.5', ref: 'CS2', kind: 'solve', problem: 'x^2 - 8x + 13 = 0', official: [4 - Math.sqrt(3), 4 + Math.sqrt(3)], covers: '1.5-e5, 1.5-g-complete' },
  { sec: '1.5', ref: 'CS3', kind: 'solve', problem: 'x^2 + 10x + 7 = 0', official: [-5 - 3 * Math.sqrt(2), -5 + 3 * Math.sqrt(2)], covers: '1.5-g-complete' },
  { sec: '1.5', ref: 'CS4', kind: 'solve', problem: 'x^2 - 2x - 5 = 0', official: [1 - Math.sqrt(6), 1 + Math.sqrt(6)], covers: '1.5-g-complete' },
  { sec: '1.5', ref: 'CS5', kind: 'solve', problem: '3x^2 - 12x + 5 = 0', official: [2 - Math.sqrt(21) / 3, 2 + Math.sqrt(21) / 3], covers: '1.5-e21, 1.5-g-complete' },
  { sec: '1.5', ref: 'QF1', kind: 'solve', problem: '3x^2 - 5x - 1 = 0', official: [(5 - Math.sqrt(37)) / 6, (5 + Math.sqrt(37)) / 6], covers: '1.5-e6, 1.5-g-formula' },
  { sec: '1.5', ref: 'QF2', kind: 'solve', problem: 'x^2 - 2x - 15 = 0', official: [-3, 5], covers: '1.5-g-formula' },
  { sec: '1.5', ref: 'QF3', kind: 'solve', problem: '3x^2 + 7x + 4 = 0', official: [-4 / 3, -1], covers: '1.5-g-formula' },
  { sec: '1.5', ref: 'QF4', kind: 'solve', problem: '2x^2 + x - 3 = 0', official: [-3 / 2, 1], covers: '1.5-g-formula' },
  { sec: '1.5', ref: '93', kind: 'solve', problem: '5 = sqrt(4x - 3)', official: [7], covers: '1.5-g-radical' },
  { sec: '1.5', ref: '95', kind: 'solve', problem: 'sqrt(2x - 1) = sqrt(3x - 5)', official: [4], covers: '1.5-e22, 1.5-g-sqrtboth' },
  { sec: '1.5', ref: '103', kind: 'solve', problem: 'x^4 - 13x^2 + 40 = 0', official: [-2 * Math.SQRT2, -Math.sqrt(5), Math.sqrt(5), 2 * Math.SQRT2], covers: '1.5-e9, 1.5-g-quadtype' },
  { sec: '1.5', ref: '112', kind: 'solve', problem: 'x - 5sqrt(x) + 6 = 0', official: [4, 9], covers: '1.5-e23, 1.5-g-quadtype' },
  { sec: '1.5', ref: '113', kind: 'solve', problem: '|3x + 5| = 1', official: [-2, -4 / 3], covers: '1.5-e16, 1.5-g-abs' },
  { sec: '1.5', ref: '116', kind: 'solve', problem: '|x - 6| = -1', official: [], covers: '1.5-e17, 1.5-g-abs' },
  { sec: '1.5', ref: 'abs3', kind: 'solve', problem: '|2x - 5| = 3', official: [1, 4], covers: '1.5-e16, 1.5-g-abs' },

  // ---------------------------------------------------------------- 1.8 Inequalities
  { sec: '1.8', ref: '17', kind: 'ineq', problem: '7 - x >= 5', official: '(-inf, 2]', covers: '1.8-e1, 1.8-g-linear' },
  { sec: '1.8', ref: '27', kind: 'ineq', problem: '4 - 3x <= -(1 + 8x)', official: '(-inf, -1]', covers: '1.8-e1, 1.8-g-linear' },
  { sec: '1.8', ref: '35', kind: 'ineq', problem: '1/6 < (2x - 13)/12 <= 2/3', official: '(7.5, 10.5]', covers: '1.8-e3, 1.8-g-double' },
  { sec: '1.8', ref: '41', kind: 'ineq', problem: 'x^2 - 3x - 18 <= 0', official: '[-3, 6]', covers: '1.8-e5, 1.8-g-quadratic' },
  { sec: '1.8', ref: '46', kind: 'ineq', problem: '5x^2 + 3x >= 3x^2 + 2', official: '(-inf, -2] U [1/2, inf)', covers: '1.8-e14' },
  { sec: '1.8', ref: '53', kind: 'ineq', problem: '(x - 4)(x + 2)^2 < 0', official: '(-inf, -2) U (-2, 4)', covers: '1.8-e15, 1.8-g-repeated' },
  { sec: '1.8', ref: '57', kind: 'ineq', problem: 'x^3 - 4x > 0', official: '(-2, 0) U (2, inf)', covers: '1.8-e6, 1.8-g-cubic (needs factoring first)' },
  { sec: '1.8', ref: '65', kind: 'ineq', problem: '4/x < x', official: '(-2, 0) U (2, inf)', covers: '1.8-e16, 1.8-g-rearrange' },
  { sec: '1.8', ref: '83', kind: 'ineq', problem: '|3x - 2| >= 5', official: '(-inf, -1] U [7/3, inf)', covers: '1.8-e10, 1.8-g-abs' },
  { sec: '1.8', ref: '85', kind: 'ineq', problem: '|(x - 2)/3| < 2', official: '(-4, 8)', covers: '1.8-e18' },
  { sec: '1.8', ref: '89', kind: 'ineq', problem: '8 - |2x - 1| >= 6', official: '[-1/2, 3/2]', covers: '1.8-e17' },

  // ---------------------------------------------------------------- 1.9 Coordinate Plane
  { sec: '1.9', ref: 'dist-ex', kind: 'closer', pts: [[1, -2], [8, 9]], target: [5, 3], official: 'P', covers: '1.9-e16, 1.9-g-closer' },
  { sec: '1.9', ref: '35', kind: 'closer', pts: [[6, 7], [-5, 8]], target: [0, 0], official: 'P', covers: '1.9-e15, 1.9-g-closer' },
  { sec: '1.9', ref: 'mid-ex', kind: 'point', problem: 'midpoint of (1,-2) and (5,3)', official: [3, 0.5], covers: '1.9-e3, 1.9-g-midpoint' },
  { sec: '1.9', ref: '48', kind: 'point', problem: 'M(6,8) is the midpoint of AB, A(2,3); find B', official: [10, 13], covers: '1.9-e4, 1.9-g-midpoint' },
  { sec: '1.9', ref: '65a', kind: 'intercepts', problem: '2x - y = 6', official: { x: [3], y: -6 }, covers: '1.9-e5, 1.9-g-intercepts' },
  { sec: '1.9', ref: '65b', kind: 'intercepts', problem: 'y = -(x + 1)^2', official: { x: [-1], y: -1 }, covers: '1.9-g-intercepts' },
  { sec: '1.9', ref: '71a', kind: 'intercepts', problem: 'y = x + 6', official: { x: [-6], y: 6 }, covers: '1.9-e5, 1.9-g-intercepts' },
  { sec: '1.9', ref: '71b', kind: 'intercepts', problem: 'y = x^2 - 5', official: { x: [-Math.sqrt(5), Math.sqrt(5)], y: -5 }, covers: '1.9-e6, 1.9-g-intercepts' },
  { sec: '1.9', ref: '73a', kind: 'fact', what: 'intercepts of an implicit equation 9x^2 - 4y^2 = 36', covers: '1.9-e17' },
  { sec: '1.9', ref: '83', kind: 'circle', problem: 'x^2 + y^2 = 9', official: { c: [0, 0], r: 3 }, covers: '1.9-e10, 1.9-g-circle-general' },
  { sec: '1.9', ref: '85', kind: 'circle', problem: 'x^2 + (y - 4)^2 = 1', official: { c: [0, 4], r: 1 }, covers: '1.9-g-circle-general' },
  { sec: '1.9', ref: '89', kind: 'rel', problem: '(x - 2)^2 + (y + 1)^2 = 9', official: '(x-2)^2 + (y+1)^2 = 9', vars: ['x', 'y'], covers: '1.9-e7, 1.9-g-circle-eq' },
  { sec: '1.9', ref: 'origin', kind: 'rel', problem: 'x^2 + y^2 = 65', official: 'x^2 + y^2 = 65', vars: ['x', 'y'], covers: '1.9-e8, 1.9-g-circle-eq' },
  { sec: '1.9', ref: '93', kind: 'rel', problem: '(x - 2)^2 + (y - 5)^2 = 25', official: '(x-2)^2 + (y-5)^2 = 25', vars: ['x', 'y'], covers: '1.9-e11, 1.9-g-diameter' },
  { sec: '1.9', ref: '99', kind: 'circle', problem: 'x^2 + y^2 + 4x - 6y + 12 = 0', official: { c: [-2, 3], r: 1 }, covers: '1.9-e9, 1.9-g-circle-general' },
  { sec: '1.9', ref: '100', kind: 'circle', problem: 'x^2 + y^2 - 8x + 2y + 8 = 0', official: { c: [4, -1], r: 3 }, covers: '1.9-e9, 1.9-g-circle-general' },
  { sec: '1.9', ref: '105', kind: 'symmetry', problem: 'y = x^4 + x^2', official: 'y', covers: '1.9-e12, 1.9-g-symmetry' },
  { sec: '1.9', ref: '107', kind: 'symmetry', problem: 'x^2 y^2 + x y = 1', official: 'o', covers: '1.9-g-symmetry' },
  { sec: '1.9', ref: '109', kind: 'symmetry', problem: 'y = x^3 + 10x', official: 'o', covers: '1.9-e13, 1.9-g-symmetry' },

  // ---------------------------------------------------------------- 1.10 Lines
  { sec: '1.10', ref: '11', kind: 'slope', pts: [[2, -2], [7, -1]], official: 1 / 5, covers: '1.10-e1, 1.10-g-slope' },
  { sec: '1.10', ref: '21', kind: 'rel', problem: 'y = 2x - 3', official: 'y = 2x - 3', vars: ['x', 'y'], covers: '1.10-g-twopoints' },
  { sec: '1.10', ref: '61', kind: 'readline', problem: '4x + 5y = 10', official: { m: -4 / 5, b: 2 }, covers: '1.10-e4, 1.10-g-read' },
  { sec: '1.10', ref: '63', kind: 'readline', problem: 'y = 4', official: { m: 0, b: 4 }, covers: '1.10-e13' },
  { sec: '1.10', ref: '65', kind: 'fact', what: 'x = 3 has NO slope and NO y-intercept', covers: '1.10-e14' },
  { sec: '1.10', ref: '73', kind: 'classify', a: 'y = 2x + 3', b: '2y - 4x - 5 = 0', official: 'par', covers: '1.10-e11, 1.10-g-classify' },
  { sec: '1.10', ref: '75', kind: 'classify', a: '-3x + 4y = 4', b: '4x + 3y = 5', official: 'perp', covers: '1.10-e11, 1.10-g-classify' },
  { sec: '1.10', ref: '23', kind: 'rel', problem: 'y = 3x - 2', official: 'y = 3x - 2', vars: ['x', 'y'], covers: '1.10-g-pointslope' },
  { sec: '1.10', ref: '27', kind: 'rel', problem: 'y = (2/3)x + 19/3', official: 'y - 7 = (2/3)(x - 1)', vars: ['x', 'y'], covers: '1.10-e2, 1.10-g-pointslope' },
  { sec: '1.10', ref: '29', kind: 'fact', what: 'line through (1,7) and (1,6) is the vertical line x = 1', covers: '1.10-e15' },
  { sec: '1.10', ref: '33', kind: 'rel', problem: 'y = 3x - 3', official: 'y = 3x - 3', vars: ['x', 'y'], covers: '1.10-e16, 1.10-g-intercept-line' },
  { sec: '1.10', ref: '35', kind: 'rel', problem: 'y = 3', official: 'y = 3', vars: ['x', 'y'], covers: '1.10-e5, 1.10-g-hv' },
  { sec: '1.10', ref: '37', kind: 'rel', problem: 'x = 2', official: 'x = 2', vars: ['x', 'y'], covers: '1.10-e6, 1.10-g-hv' },
  { sec: '1.10', ref: '39', kind: 'rel', problem: 'y = 3x - 1', official: 'y - 2 = 3(x - 1)', vars: ['x', 'y'], covers: '1.10-e9, 1.10-g-parperp' },
  { sec: '1.10', ref: '40', kind: 'rel', problem: 'y = 2x + 8', official: 'y - 2 = 2(x + 3)', vars: ['x', 'y'], covers: '1.10-e10, 1.10-g-parperp' },
  { sec: '1.10', ref: '41', kind: 'fact', what: 'line through (4,5) parallel to the X-AXIS is y = 5', covers: '1.10-e17, 1.10-g-hv' },
  { sec: '1.10', ref: '45', kind: 'fact', what: 'line through (-1,2) parallel to the vertical line x = 5 is x = -1', covers: '1.10-e18, 1.10-g-hv' },
  { sec: '1.10', ref: '46', kind: 'fact', what: 'line through (2,6) perpendicular to the horizontal line y = 1 is x = 2', covers: '1.10-e19, 1.10-g-hv' },
  { sec: '1.10', ref: '50', kind: 'rel', problem: 'y = 2x - 7', official: 'y + 11 = 2(x + 2)', vars: ['x', 'y'], covers: '1.10-e20, 1.10-g-perp-twopoints' }
];

// ---------------------------------------------------------------- verification
const approx = (a, b) => Math.abs(a - b) < 1e-7 * (1 + Math.abs(a) + Math.abs(b));
function inSet(x, set) {
  return set.some(I => {
    if (approx(x, I.lo)) return I.loC;
    if (approx(x, I.hi)) return I.hiC;
    return x > I.lo && x < I.hi;
  });
}
function scanRoots(rel, v, lo, hi) {
  const f = x => { const s = { [v]: x }; return P.evaluate(rel.pieces[0], s) - P.evaluate(rel.pieces[1], s); };
  const found = [];
  const N = 6000, step = (hi - lo) / N;
  let prevX = null, prevY = null;
  for (let i = 0; i <= N; i++) {
    const x = lo + i * step, y = f(x);
    if (!Number.isFinite(y)) { prevX = null; prevY = null; continue; }
    if (Math.abs(y) < 1e-9) found.push(x);
    else if (prevY !== null && Math.sign(y) !== Math.sign(prevY)) {
      let a = prevX, b = x;
      for (let k = 0; k < 80; k++) { const m = (a + b) / 2; (Math.sign(f(m)) === Math.sign(f(a))) ? a = m : b = m; }
      found.push((a + b) / 2);
    }
    prevX = x; prevY = y;
  }
  return found;
}

function verify(c) {
  const v = c.v || 'x';
  switch (c.kind) {
    case 'fact': return null;
    case 'num': {
      const a = P.evaluate(P.parse(c.problem), {}), b = P.evaluate(P.parse(c.official), {});
      return approx(a, b) ? null : 'problem = ' + a + ' but official answer = ' + b;
    }
    case 'expr': {
      const cmp = C.compareExpr(P.parse(c.official), P.parse(c.problem), c.vars, c.assume ? P.parseRelation(c.assume) : null);
      if (cmp.equal === null) return 'could not compare (only ' + cmp.tested + ' usable sample points)';
      if (!cmp.equal) return 'official answer differs from the problem at ' + JSON.stringify(cmp.point) + ': answer = ' + cmp.s + ', problem = ' + cmp.r;
      return null;
    }
    case 'set-op': {
      const A = C.parseIntervalSet(c.a), B = C.parseIntervalSet(c.b);
      const got = c.op === 'u' ? C.normalizeIntervals(A.concat(B)) : C.parseIntervalSet(c.a + ' ∩ ' + c.b);
      const want = C.parseIntervalSet(c.official);
      return C.intervalsToInput(got) === C.intervalsToInput(want) ? null : 'computed ' + C.intervalsToInput(got) + ' but official answer is ' + C.intervalsToInput(want);
    }
    case 'solve': {
      const rel = P.parseRelation(c.problem);
      for (const r of c.official) {
        if (P.evalRelation(rel, { [v]: r }) !== true) return v + ' = ' + r + ' does NOT satisfy the equation';
      }
      const scanned = scanRoots(rel, v, -30, 30).filter(x => !c.official.some(o => Math.abs(o - x) < 1e-4));
      const extra = [...new Set(scanned.map(x => Math.round(x * 1e4) / 1e4))];
      if (extra.length) return 'answer key may be missing root(s) near ' + extra.join(', ');
      return null;
    }
    case 'ineq': {
      const rel = P.parseRelation(c.problem);
      const set = C.parseIntervalSet(c.official, v);
      for (let x = -14; x <= 14; x += 0.005) {
        const t = P.evalRelation(rel, { [v]: x });
        const m = inSet(x, set);
        if (t === undefined) { if (m) return 'official set contains ' + v + ' = ' + x.toFixed(3) + ' where the inequality is undefined'; continue; }
        if (t !== m) return 'at ' + v + ' = ' + x.toFixed(3) + ' the inequality is ' + t + ' but the official set says ' + m;
      }
      return null;
    }
    case 'rel': {
      const cmp = C.compareProportional(P.parseRelation(c.official), P.parseRelation(c.problem), c.vars);
      return cmp.equal ? null : 'official answer is not the same line/curve as the problem';
    }
    case 'closer': {
      const d = p => Math.hypot(p[0] - c.target[0], p[1] - c.target[1]);
      const winner = d(c.pts[0]) < d(c.pts[1]) ? 'P' : 'Q';
      return winner === c.official ? null : 'computed ' + winner + ' is closer, official answer says ' + c.official;
    }
    case 'slope': {
      const [[x1, y1], [x2, y2]] = c.pts;
      return approx((y2 - y1) / (x2 - x1), c.official) ? null : 'computed slope ' + ((y2 - y1) / (x2 - x1)) + ' vs official ' + c.official;
    }
    case 'point': case 'intercepts': case 'circle': case 'symmetry': case 'readline': case 'classify': return null;
  }
  return 'unknown kind ' + c.kind;
}

// ---------------------------------------------------------------- run
const gapsOnly = process.argv.includes('--gaps');
let bad = 0, checked = 0;
const bySec = {};
for (const c of CASES) {
  (bySec[c.sec] = bySec[c.sec] || []).push(c);
  if (c.kind === 'fact') continue;
  checked++;
  let msg = null;
  try { msg = verify(c); } catch (e) { msg = 'threw: ' + e.message; }
  if (msg) { bad++; console.log('MISMATCH  ' + c.sec + ' #' + c.ref + '  ' + msg); }
}
if (!gapsOnly) console.log('\nVerified ' + checked + ' worksheet problems against the answer key: ' + bad + ' mismatches.\n');

let gaps = 0;
console.log('COVERAGE GAPS (worksheet skills with no exercise or generator on the site)');
for (const sec of Object.keys(bySec)) {
  const missing = bySec[sec].filter(c => c.covers === null);
  if (!missing.length) continue;
  console.log('\n  ' + sec + ':');
  for (const c of missing) { gaps++; console.log('    #' + String(c.ref).padEnd(9) + (c.what || c.problem || '')); }
}
console.log('\n' + gaps + ' uncovered worksheet skills out of ' + CASES.length + ' problems.');
process.exit(bad ? 1 : 0);
