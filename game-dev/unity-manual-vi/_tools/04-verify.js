// Verify Manual/index.html: every asset reference (src/href on
// link/script/img/source) must either (a) resolve to a real local file, or
// (b) be a deliberately-online URL (fonts, CDNs, external nav). Reports any
// missing local files.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DOC = path.join(ROOT, 'Manual', 'index.html');
const html = fs.readFileSync(DOC, 'utf8');

function findTags(re) {
  const tags = [];
  const r = new RegExp(re, 'gi');
  let m;
  while ((m = r.exec(html)) !== null) tags.push(m[0]);
  return tags;
}
function attr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, 'i'));
  return m ? m[1] : null;
}

const tags = [
  ...findTags('<link\\b[^>]*>'),
  ...findTags('<script\\b[^>]*>'),
  ...findTags('<img\\b[^>]*>'),
  ...findTags('<source\\b[^>]*>'),
];

const refs = [];
for (const t of tags) {
  for (const a of ['href', 'src', 'data-src']) {
    const v = attr(t, a);
    if (v) refs.push({ tag: t.slice(0, 40), attr: a, url: v });
  }
}

const isAbs = (u) => /^https?:\/\//i.test(u) || u.startsWith('//');
const isData = (u) => /^data:/i.test(u);

let ok = 0,
  online = 0,
  missing = [];
for (const r of refs) {
  if (isData(r.url)) continue;
  if (isAbs(r.url)) {
    // external -> stays online (font, CDN, nav). Note but not an error.
    online++;
    continue;
  }
  // relative: resolve against Manual/index.html
  const resolved = path.normalize(path.join(ROOT, 'Manual', r.url));
  if (fs.existsSync(resolved)) ok++;
  else missing.push({ ...r, resolved });
}

console.log('Asset references in Manual/index.html:');
console.log('  resolved to local file :', ok);
console.log('  external (online)      :', online);
console.log('  MISSING local files    :', missing.length);
if (missing.length) {
  console.log('\nMissing details:');
  missing.forEach((m) => console.log('  -', m.url, '->', m.resolved, '   in:', m.tag));
}
