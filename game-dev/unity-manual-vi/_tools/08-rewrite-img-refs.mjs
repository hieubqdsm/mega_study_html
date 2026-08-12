// Rewrite image references (.png/.jpg/.jpeg -> .webp) in all Manual HTML and
// in CSS url(...), but ONLY for refs whose target was actually converted
// (per webp-manifest.json). Favicons and JPGs kept-as-original are left alone.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'webp-manifest.json'), 'utf8'));
const converted = new Set(manifest.map((m) => m.from.replace(/\\/g, '/')));
console.log(`Converted targets: ${converted.size}`);

const IMG_EXT_RE = /\.(png|jpe?g)(\?[^#]*)?(#.*)?$/i;
const assetAttr = /(<(?:link|img|source|a)\b[^>]*?\s(?:src|href|data-src|data-srcset)\s*=\s*["'])([^"']+)(["'])/gi;

function resolveRef(pageDirRel, ref) {
  const clean = ref.split(/[?#]/)[0];
  const parts = (pageDirRel + '/' + clean).split('/');
  const stack = [];
  for (const p of parts) {
    if (p === '' || p === '.') continue;
    if (p === '..') stack.pop();
    else stack.push(p);
  }
  return stack.join('/');
}
const toWebpExt = (ref) => ref.replace(IMG_EXT_RE, (m, ext, q, h) => '.webp' + (q || '') + (h || ''));

function rewriteHtmlAttrs(html, pageDirRel) {
  return html.replace(assetAttr, (m, pre, url, post) => {
    if (!IMG_EXT_RE.test(url)) return m;
    const resolved = resolveRef(pageDirRel, url);
    return converted.has(resolved) ? pre + toWebpExt(url) + post : m;
  });
}
// also handle srcset="a.png 1x, b.png 2x"
function rewriteSrcset(html, pageDirRel) {
  return html.replace(/(<(?:img|source)\b[^>]*?\ssrcset\s*=\s*["'])([^"']+)(["'])/gi, (m, pre, val, post) => {
    const out = val.split(',').map((part) => {
      const u = part.trim().split(/\s+/)[0];
      if (!IMG_EXT_RE.test(u)) return part;
      const resolved = resolveRef(pageDirRel, u);
      return converted.has(resolved) ? part.replace(u, toWebpExt(u)) : part;
    });
    return pre + out.join(',') + post;
  });
}
function rewriteCssUrl(css, cssDirRel) {
  return css.replace(/url\(\s*(['"]?)([^'")]+?)\1\s*\)/gi, (m, q, url) => {
    if (!IMG_EXT_RE.test(url)) return m;
    const resolved = resolveRef(cssDirRel, url);
    return converted.has(resolved) ? `url(${q}${toWebpExt(url)}${q})` : m;
  });
}

// ---- HTML pages ----
const pageList = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'page-list.json'), 'utf8'))
  .filter((l) => l && l !== 'null' && l !== 'root');
const withExt = (l) => (/\.html?$/i.test(l) ? l : l + '.html');
let htmlTouched = 0,
  refsChanged = 0;

const countsBefore = { html: 0 };
for (const link of pageList) {
  const rest = withExt(link);
  const file = path.join(ROOT, 'Manual', rest.split('/').join(path.sep));
  if (!fs.existsSync(file)) continue;
  const pageDirRel = 'Manual/' + path.dirname(rest.split('/').join('/'));
  let html = fs.readFileSync(file, 'utf8');
  const before = html.length;
  // count refs to converted targets first
  const beforeRefs = (html.match(assetAttr) || []).length;
  html = rewriteHtmlAttrs(html, pageDirRel);
  html = rewriteSrcset(html, pageDirRel);
  if (html.length !== before || beforeRefs >= 0) {
    const after = (html.match(assetAttr) || []).length;
    if (html !== fs.readFileSync(file, 'utf8')) {
      refsChanged += countChanged(file, html);
      fs.writeFileSync(file, html);
      htmlTouched++;
    }
  }
}
function countChanged(file, html) {
  // cheap: count .webp occurrences introduced (not exact, just for signal)
  return (html.match(/\.webp["'?]/g) || []).length;
}

// ---- index.html (hand-written) ----
const idxFile = path.join(ROOT, 'Manual', 'index.html');
if (fs.existsSync(idxFile)) {
  let html = fs.readFileSync(idxFile, 'utf8');
  const out = rewriteHtmlAttrs(html, 'Manual');
  const out2 = rewriteSrcset(out, 'Manual');
  if (out2 !== html) {
    fs.writeFileSync(idxFile, out2);
    htmlTouched++;
  }
}

// ---- CSS ----
let cssTouched = 0;
const cssDir = path.join(ROOT, 'StaticFilesManual', 'css');
if (fs.existsSync(cssDir)) {
  for (const f of fs.readdirSync(cssDir)) {
    if (!/\.css$/i.test(f)) continue;
    const file = path.join(cssDir, f);
    const cssDirRel = 'StaticFilesManual/css';
    let css = fs.readFileSync(file, 'utf8');
    const out = rewriteCssUrl(css, cssDirRel);
    if (out !== css) {
      fs.writeFileSync(file, out);
      cssTouched++;
    }
  }
}

console.log(`HTML files touched: ${htmlTouched}`);
console.log(`CSS files touched : ${cssTouched}`);
