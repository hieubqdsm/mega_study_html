// Produce Manual/index.html from index.original.html with minimal rewrites
// so the page renders correctly when opened offline (file://) from the
// mirrored folder. Translation is a LATER phase — this keeps the page
// byte-for-byte the original English content otherwise.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'index.original.html'), 'utf8');
let out = src;
const notes = [];

// 1) Drop <base href="/Manual/index.html">. With the file living at
//    Manual/index.html, relative URLs (../uploads/..., docdata/toc.js)
//    already resolve correctly without a base, and a base with an absolute
//    path breaks under file://.
const baseBefore = out.match(/<base[^>]*>/i);
if (baseBefore) {
  out = out.replace(baseBefore[0], '');
  notes.push('removed: ' + baseBefore[0]);
}

// 2) Root-absolute asset paths (src|href on link/script/img/source) under
//    same origin need to become ../-relative so they resolve from Manual/.
//    We deliberately do NOT touch <a href="/..."> navigation links.
const rootAbsAsset = /(<(?:link|script|img|source)\b[^>]*?)(\s(?:src|href)\s*=\s*["'])\/((?:StaticFiles(?:Manual|Config)|uploads|Manual)\/[^"']*)["']/gi;
out = out.replace(rootAbsAsset, (m, tag, attr, rest) => {
  notes.push('rewrote asset: /' + rest + ' -> ../' + rest);
  return tag + attr + '../' + rest + '"';
});

// 3) Cross-origin favicon (unity.com) not mirrored -> point at the local copy.
const favBefore = 'https://unity.com/themes/contrib/unity_base/images/favicons/favicon.ico';
if (out.includes(favBefore)) {
  out = out.replace(favBefore, '../StaticFilesManual/images/favicons/favicon.png');
  notes.push('rewrote favicon -> ../StaticFilesManual/images/favicons/favicon.png');
}

// 4) Strip cache-bust query strings from local asset URLs. On a web server
//    `core.css?ts=...` resolves to core.css, but under file:// the query is
//    treated as part of the filename, so the file isn't found. Only strip on
//    local (relative) asset refs, never on external http(s)/data URLs.
const assetAttr = /(<(?:link|script|img|source)\b[^>]*?\s(?:src|href)\s*=\s*["'])([^"']+)(["'])/gi;
out = out.replace(assetAttr, (m, pre, url, post) => {
  if (/^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('//') || url.startsWith('/') || url.startsWith('data:')) {
    return m;
  }
  const qIdx = url.indexOf('?');
  if (qIdx === -1) return m;
  const clean = url.slice(0, qIdx);
  notes.push('stripped query: ' + url + ' -> ' + clean);
  return pre + clean + post;
});

// 5) Neutralize external blocking resources that hang offline. The OneTrust
//    cookie-consent stub loads synchronously from a CDN; when unreachable it
//    stalls page parsing and breaks screenshots. It is irrelevant to an
//    offline mirror, so drop the stub + its callback. Google Fonts is kept
//    (it fails fast and degrades to the system sans-serif fallback).
const beforeCookielaw = out.length;
out = out.replace(
  /<script\b[^>]*src=["']https:\/\/cdn\.cookielaw\.org\/[^"']*["'][^>]*><\/script>\s*/gi,
  ''
);
out = out.replace(/<script\b[^>]*>\s*function\s+OptanonWrapper\s*\(\s*\)\s*\{\s*\}\s*<\/script>\s*/gi, '');
if (out.length !== beforeCookielaw) notes.push('removed: OneTrust cookie-consent stub (blocks offline)');

fs.mkdirSync(path.join(ROOT, 'Manual'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'Manual', 'index.html'), out, 'utf8');

console.log('Wrote Manual/index.html');
console.log('Changes:');
notes.forEach((n) => console.log('  - ' + n));
