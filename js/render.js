/* CalcHelper — text rendering: a tiny markdown dialect plus KaTeX maths.
   Inline maths goes in $...$, display maths in $$...$$. */
(function (root) {
  'use strict';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function tex(src, display) {
    if (typeof katex !== 'undefined') {
      try {
        return katex.renderToString(src, { displayMode: !!display, throwOnError: false, strict: 'ignore', trust: false });
      } catch (e) { /* fall through */ }
    }
    return '<code class="tex-fallback">' + esc(src) + '</code>';
  }

  // Pull maths out so markdown never touches it, then put it back rendered.
  function extractMath(text) {
    const slots = [];
    let s = text.replace(/\$\$([\s\S]+?)\$\$/g, (m, t) => { slots.push(tex(t.trim(), true)); return '\u0000' + (slots.length - 1) + '\u0000'; });
    s = s.replace(/\$([^$\n]+?)\$/g, (m, t) => { slots.push(tex(t.trim(), false)); return '\u0000' + (slots.length - 1) + '\u0000'; });
    return { s, slots };
  }
  function restoreMath(html, slots) {
    return html.replace(/\u0000(\d+)\u0000/g, (m, i) => slots[+i]);
  }

  function inline(s) {
    s = esc(s);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s.,;:)!?]|$)/g, '$1<em>$2</em>');
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    return s;
  }

  function md(text) {
    if (text == null) return '';
    const { s, slots } = extractMath(String(text));
    const blocks = s.replace(/\r/g, '').split(/\n{2,}/);
    const out = [];
    for (const raw of blocks) {
      const b = raw.replace(/^\n+|\n+$/g, '');
      if (!b.trim()) continue;
      const lines = b.split('\n');
      if (/^#{2,4}\s/.test(lines[0])) {
        const m = /^(#{2,4})\s+(.*)$/.exec(lines[0]);
        const lvl = m[1].length + 1; // ## -> h3
        out.push('<h' + lvl + '>' + inline(m[2]) + '</h' + lvl + '>');
        const rest = lines.slice(1).join('\n');
        if (rest.trim()) out.push(md(restoreMath(rest, slots)));
        continue;
      }
      if (lines.every(l => /^\s*-\s+/.test(l) || /^\s{2,}\S/.test(l))) {
        const items = [];
        for (const l of lines) {
          if (/^\s*-\s+/.test(l)) items.push(l.replace(/^\s*-\s+/, ''));
          else items[items.length - 1] += ' ' + l.trim();
        }
        out.push('<ul>' + items.map(i => '<li>' + inline(i) + '</li>').join('') + '</ul>');
        continue;
      }
      if (lines.every(l => /^\s*\d+[.)]\s+/.test(l) || /^\s{2,}\S/.test(l))) {
        const items = [];
        for (const l of lines) {
          if (/^\s*\d+[.)]\s+/.test(l)) items.push(l.replace(/^\s*\d+[.)]\s+/, ''));
          else items[items.length - 1] += ' ' + l.trim();
        }
        out.push('<ol>' + items.map(i => '<li>' + inline(i) + '</li>').join('') + '</ol>');
        continue;
      }
      if (lines.every(l => /^\s*\|/.test(l))) {
        const rows = lines.filter(l => !/^\s*\|\s*:?-+/.test(l)).map(l => l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
        let html = '<div class="table-wrap"><table>';
        rows.forEach((r, i) => {
          const tag = i === 0 ? 'th' : 'td';
          html += '<tr>' + r.map(c => '<' + tag + '>' + inline(c) + '</' + tag + '>').join('') + '</tr>';
        });
        out.push(html + '</table></div>');
        continue;
      }
      if (lines.every(l => /^\s*>/.test(l))) {
        out.push('<blockquote>' + md(restoreMath(lines.map(l => l.replace(/^\s*>\s?/, '')).join('\n'), slots)) + '</blockquote>');
        continue;
      }
      // a lone display-maths block stays on its own
      if (/^\u0000\d+\u0000$/.test(b.trim())) { out.push('<div class="math-block">' + b.trim() + '</div>'); continue; }
      out.push('<p>' + inline(lines.join(' ')) + '</p>');
    }
    return restoreMath(out.join('\n'), slots);
  }

  // A content block from a section's "theory" array.
  //   string                    -> markdown
  //   {h: 'Heading'}            -> section heading
  //   {def|tip|warn|note|key: 'Title', md: '...'} -> callout
  //   {svg: '<svg...>'}         -> figure, optional caption
  //   {html: '...'}             -> raw html (sign charts, area models)
  //   {widget: 'name'}          -> interactive widget (mounted by app)
  //   {example: {...}}          -> inline worked example
  //   {cols: [block, block]}    -> two columns
  function block(b) {
    if (typeof b === 'string') return md(b);
    if (b.h) return '<h3 class="theory-h">' + inline(b.h) + '</h3>';
    for (const kind of ['short', 'def', 'key', 'tip', 'warn', 'note', 'why', 'calm']) {
      if (b[kind] !== undefined) {
        const titles = { short: 'The short version', def: 'What it means', key: 'The main idea', tip: 'Tip', warn: 'Watch out', note: 'Note', why: 'Why it works', calm: 'Feeling stuck?' };
        const title = b[kind] === true || b[kind] === '' ? titles[kind] : b[kind];
        return '<div class="callout callout-' + kind + '"><div class="callout-title">' + inline(title) + '</div>' + md(b.md) + '</div>';
      }
    }
    if (b.svg) return '<figure class="fig">' + b.svg + (b.caption ? '<figcaption>' + md(b.caption) + '</figcaption>' : '') + '</figure>';
    if (b.html) return '<div class="fig-html">' + b.html + (b.caption ? '<div class="figcaption">' + md(b.caption) + '</div>' : '') + '</div>';
    if (b.widget) return '<div class="widget" data-widget="' + esc(b.widget) + '"></div>';
    if (b.example) return exampleHtml(b.example, true);
    if (b.cols) return '<div class="cols">' + b.cols.map(c => '<div class="col">' + block(c) + '</div>').join('') + '</div>';
    return '';
  }

  // Worked example. steps: [{text, math}] or strings (markdown). Rendered with reveal buttons.
  function exampleHtml(ex, inlineMode) {
    const steps = (ex.steps || []).map(s => typeof s === 'string' ? { text: s } : s);
    let html = '<div class="example' + (inlineMode ? ' example-inline' : '') + '">';
    html += '<div class="example-head"><span class="example-label">' + (ex.label || 'Worked example') + '</span>' + (ex.title ? ' <span class="example-title">' + inline(ex.title) + '</span>' : '') + '</div>';
    html += '<div class="example-problem">' + md(ex.problem) + '</div>';
    html += '<div class="steps" data-revealed="0">';
    steps.forEach((s, i) => {
      html += '<div class="step" data-step="' + i + '" hidden><div class="step-n">' + (i + 1) + '</div><div class="step-body">' + md(s.text) + (s.math ? '<div class="step-math">' + tex(s.math, true) + '</div>' : '') + '</div></div>';
    });
    html += '</div>';
    if (ex.answer) html += '<div class="example-answer" hidden><strong>Answer:</strong> ' + md(ex.answer) + '</div>';
    html += '<div class="example-controls"><button class="btn btn-sm" data-act="next-step">Show next step</button> <button class="btn btn-sm btn-ghost" data-act="all-steps">Show all</button> <button class="btn btn-sm btn-ghost" data-act="hide-steps" hidden>Hide</button></div>';
    html += '</div>';
    return html;
  }

  const R = { esc, tex, md, inline, block, exampleHtml };
  if (typeof module !== 'undefined' && module.exports) module.exports = R;
  root.CH = root.CH || {};
  root.CH.R = R;
})(typeof window !== 'undefined' ? window : globalThis);
