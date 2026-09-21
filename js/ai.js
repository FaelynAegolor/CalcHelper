/* CalcHelper — optional AI marking via the Anthropic Messages API, called
   straight from the browser with the student's own key (kept in localStorage).
   Everything else on the site works without this. */
(function (root) {
  'use strict';
  const API_URL = 'https://api.anthropic.com/v1/messages';
  const MODELS = [
    { id: 'claude-opus-5', label: 'Claude Opus 5 (best feedback)' },
    { id: 'claude-sonnet-5', label: 'Claude Sonnet 5 (fast, cheaper)' },
    { id: 'claude-haiku-4-5', label: 'Claude Haiku 4.5 (cheapest)' }
  ];

  const SYSTEM = [
    'You are a patient, encouraging maths tutor helping a precalculus student called {name} check their own work.',
    'You will be given: the problem, the correct answer with a model solution, the student\'s final answer, the student\'s working (one step per line),',
    'and the results of an automatic line-by-line checker (which tests each line numerically — trust it about which lines are mathematically consistent, but it cannot judge method or presentation).',
    '',
    'Mark the work like a good teacher would:',
    '1. Start with a one-line verdict (e.g. "Correct, nicely done" or "Nearly — one slip in step 3").',
    '2. Say specifically what is done well.',
    '3. If there is an error, point to the exact line, explain in plain, simple words WHY it is wrong, and give a hint that lets the student fix it themselves. Do not just hand over the corrected line unless the final answer was already correct.',
    '4. Mention one thing that would make the working clearer or more complete (e.g. missing a check for extraneous solutions, missing a sign chart, not stating the solution set).',
    'Keep it short: under 180 words. Use simple language. Use $...$ for maths. Never invent lines the student did not write. If the working is empty, comment on the final answer only.'
  ].join('\n');

  function buildUserMessage(ctx) {
    const lines = [];
    lines.push('## Problem\n' + ctx.problem);
    lines.push('## Correct answer\n' + ctx.answer);
    if (ctx.solution) lines.push('## Model solution (for your reference only)\n' + ctx.solution);
    lines.push('## Student\'s final answer\n' + (ctx.studentAnswer || '(not given)'));
    lines.push('## Student\'s working\n' + (ctx.working && ctx.working.trim() ? ctx.working : '(no working written)'));
    if (ctx.checker) lines.push('## Automatic checker results\n' + ctx.checker);
    return lines.join('\n\n');
  }

  async function feedback(ctx, opts) {
    opts = opts || {};
    const key = opts.apiKey;
    if (!key) throw new Error('No API key set. Add one in Settings to enable AI feedback.');
    const model = opts.model || MODELS[0].id;
    const body = {
      model,
      max_tokens: 16000,
      system: SYSTEM.replace('{name}', opts.name || 'the student'),
      messages: [{ role: 'user', content: buildUserMessage(ctx) }]
    };
    // The API only accepts calls from a web page when this opt-in header is present.
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    };
    if (model === 'claude-opus-5') {
      // Route around the (rare) safety-classifier refusal server-side.
      headers['anthropic-beta'] = 'server-side-fallback-2026-07-01';
      body.fallbacks = 'default';
    }
    let res;
    try {
      res = await fetch(API_URL, { method: 'POST', headers, body: JSON.stringify(body) });
    } catch (e) {
      throw new Error('Could not reach the API (offline, or the request was blocked by the browser).');
    }
    if (!res.ok) {
      let detail = '';
      try { const j = await res.json(); detail = (j.error && j.error.message) || ''; } catch (e) { /* ignore */ }
      if (res.status === 401) throw new Error('The API key was rejected. Check it in Settings.');
      if (res.status === 429) throw new Error('Rate limit reached — wait a moment and try again.');
      if (res.status === 400 && /credit|billing/i.test(detail)) throw new Error('The API account has no credit. ' + detail);
      throw new Error('API error ' + res.status + (detail ? ': ' + detail : ''));
    }
    const json = await res.json();
    if (json.stop_reason === 'refusal') throw new Error('The model declined to answer this request.');
    const text = (json.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
    if (!text) throw new Error('The model returned an empty response.');
    return { text, model: json.model || model, usage: json.usage };
  }

  async function testKey(key, model) {
    return feedback(
      { problem: 'Compute $2 + 2$.', answer: '4', studentAnswer: '4', working: '2 + 2 = 4' },
      { apiKey: key, model: model || 'claude-haiku-4-5', name: 'Test' }
    );
  }

  root.CH = root.CH || {};
  root.CH.AI = { feedback, testKey, MODELS };
})(typeof window !== 'undefined' ? window : globalThis);
