// Smoke test: fetch 3 representative pages, run rewritePage, assert correctness.
import fs from 'node:fs';

function rewritePage(html, rest) {
  const slashes = (rest.match(/\//g) || []).length;
  const prefix = '../'.repeat(slashes + 1);
  let out = html;
  out = out.replace(/<base\b[^>]*>\s*/i, '');
  out = out.replace(
    /(<(?:link|script|img|source)\b[^>]*?\s(?:src|href)\s*=\s*["'])\/((?:StaticFiles(?:Manual|Config)|uploads|Manual)\/[^"']*)["']/gi,
    (m, pre, p) => pre + prefix + p + '"'
  );
  out = out.replace(
    /https:\/\/unity\.com\/themes\/contrib\/unity_base\/images\/favicons\/favicon\.ico/g,
    prefix + 'StaticFilesManual/images/favicons/favicon.png'
  );
  out = out.replace(
    /(<(?:link|script|img|source)\b[^>]*?\s(?:src|href)\s*=\s*["'])([^"']+)(["'])/gi,
    (m, pre, u, post) => {
      if (/^[a-z][a-z0-9+.-]*:/i.test(u) || u.startsWith('//') || u.startsWith('/') || u.startsWith('data:')) return m;
      const q = u.indexOf('?');
      return q === -1 ? m : pre + u.slice(0, q) + post;
    }
  );
  out = out.replace(/<script\b[^>]*src=["']https:\/\/cdn\.cookielaw\.org\/[^"']*["'][^>]*><\/script>\s*/gi, '');
  out = out.replace(/<script\b[^>]*>\s*function\s+OptanonWrapper\s*\(\s*\)\s*\{\s*\}\s*<\/script>\s*/gi, '');
  return out;
}

const cases = [
  'PhysicsSection.html',
  'best-practice-guides/ui-toolkit-for-advanced-unity-developers/layouts.html',
  'accessibility/_index.html',
];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
for (const rest of cases) {
  const r = await fetch('https://docs.unity3d.com/Manual/' + rest, { headers: { 'User-Agent': UA } });
  const html = await r.text();
  const out = rewritePage(html, rest);
  const slashes = (rest.match(/\//g) || []).length;
  const prefix = '../'.repeat(slashes + 1);
  const img = out.match(/<img[^>]*src="[^"]*uploads[^"]*"/i);
  const sf = out.match(new RegExp('<script[^>]*' + prefix.replaceAll('/', '\\/') + 'StaticFilesConfig[^>]*>'));
  console.log('### ' + rest + '  (prefix=' + JSON.stringify(prefix) + ')');
  console.log('  HTTP              ', r.status);
  console.log('  base removed      ', !/<base\b/i.test(out));
  console.log('  cookielaw removed ', !/cookielaw/i.test(out));
  console.log('  has ../uploads img', !!out.match(/<img[^>]*src="\.\.\/[^"]*uploads/i));
  console.log('  sample img        ', img ? img[0].slice(0, 90) : '(none)');
  console.log('  StaticFilesConfig ', sf ? sf[0].slice(0, 90) : '(none)');
}
