// Verify every image reference in all Manual HTML resolves to a real file.
// Catches any .png/.jpg ref whose source was converted to .webp but the ref
// wasn't rewritten (would show as a broken image).
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const IMG_EXT = /\.(png|jpe?g|webp|gif|svg|ico)/i;
const attrRe = /(<(?:link|img|source|a)\b[^>]*?\s(?:src|href|data-src)\s*=\s*["'])([^"']+)(["'])/gi;

function resolveRef(pageDirRel, ref) {
  const clean = ref.split(/[?#]/)[0];
  const parts = (pageDirRel + '/' + clean).split('/');
  const stack = [];
  for (const p of parts) { if (p===''||p==='.') continue; if (p==='..') stack.pop(); else stack.push(p); }
  return stack.join('/');
}

const pageList = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'page-list.json'), 'utf8'))
  .filter((l) => l && l !== 'null' && l !== 'root');
const withExt = (l) => (/\.html?$/i.test(l) ? l : l + '.html');

let checked = 0, missing = 0;
const missingSamples = [];
const allHtml = ['Manual/index.html', ...pageList.map((l) => 'Manual/' + withExt(l))];

for (const rel of allHtml) {
  const file = path.join(ROOT, rel.split('/').slice(0,-1).join(path.sep), path.basename(rel));
  if (!fs.existsSync(file)) continue;
  const pageDirRel = rel.split('/').slice(0, -1).join('/');
  const html = fs.readFileSync(file, 'utf8');
  let m;
  attrRe.lastIndex = 0;
  while ((m = attrRe.exec(html))) {
    const url = m[2];
    if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:')) continue; // external/data
    if (!IMG_EXT.test(url)) continue;
    const resolved = resolveRef(pageDirRel, url);
    const abs = path.join(ROOT, resolved.split('/').join(path.sep));
    checked++;
    if (!fs.existsSync(abs)) {
      missing++;
      if (missingSamples.length < 12) missingSamples.push({ page: rel, ref: url, resolved });
    }
  }
}

console.log(`Checked refs : ${checked}`);
console.log(`Missing files: ${missing}`);
if (missing) {
  console.log('\nSample missing:');
  missingSamples.forEach((s) => console.log(`  [${s.page}] ${s.ref}  ->  ${s.resolved}`));
}
