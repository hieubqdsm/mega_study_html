// Parse index.original.html, list every asset URL grouped by type.
// Pure node (no deps). Output: a JSON manifest for the downloader.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const htmlPath = path.join(ROOT, 'index.original.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const uniq = (arr) => [...new Set(arr.filter(Boolean))];

function findTags(re) {
  const tags = [];
  let m;
  const r = new RegExp(re, 'gi');
  while ((m = r.exec(html)) !== null) tags.push(m[0]);
  return tags;
}
function attr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, 'i'));
  return m ? m[1] : null;
}

const linkTags = findTags('<link\\b[^>]*>');
const scriptTags = findTags('<script\\b[^>]*>');
const imgTags = findTags('<img\\b[^>]*>');
const sourceTags = findTags('<source\\b[^>]*>'); // for <picture>/video if any

const css = linkTags.map((t) => attr(t, 'href')).filter((u) => u && /\.css(\?|$)/i.test(u));
const icons = linkTags
  .filter((t) => /rel\s*=\s*["'][^"']*icon/i.test(t))
  .map((t) => attr(t, 'href'))
  .filter(Boolean);
const js = scriptTags.map((t) => attr(t, 'src')).filter((u) => u && !/^chrome-extension:/.test(u));
const imgSrc = imgTags.map((t) => attr(t, 'src')).filter(Boolean);
const imgDataSrc = imgTags.map((t) => attr(t, 'data-src')).filter(Boolean);
const srcset = imgTags
  .map((t) => attr(t, 'srcset'))
  .filter(Boolean)
  .flatMap((s) => s.split(',').map((p) => p.trim().split(/\s+/)[0]));

const isAbs = (u) => /^https?:\/\//i.test(u);
const isData = (u) => /^data:/i.test(u);

const categorize = (u) => {
  if (isData(u)) return 'data';
  if (isAbs(u)) return 'absolute';
  if (u.startsWith('//')) return 'protocol-relative';
  return 'relative';
};

const report = (name, list) => {
  console.log(`\n=== ${name} (${list.length}) ===`);
  list.forEach((u) => console.log(`  [${categorize(u)}] ${u}`));
};

report('CSS', css);
report('JS', js);
report('IMG src', imgSrc);
report('IMG data-src', imgDataSrc);
report('IMG srcset', srcset);
report('Icons', icons);

const all = uniq([...css, ...js, ...imgSrc, ...imgDataSrc, ...srcset, ...icons]).filter(
  (u) => !isData(u)
);

const BASE = '/Manual/index.html';
const ORIGIN = 'https://docs.unity3d.com';
const baseResolved = ORIGIN + BASE;
const manifest = {
  base: BASE,
  origin: ORIGIN,
  counts: {
    css: css.length,
    js: js.length,
    img: imgSrc.length + imgDataSrc.length + srcset.length,
    icons: icons.length,
  },
  assets: all.map((u) => {
    let absolute;
    if (isAbs(u)) absolute = u;
    else if (u.startsWith('//')) absolute = 'https:' + u;
    else absolute = new URL(u, baseResolved).href; // respect <base>
    const urlObj = new URL(absolute);
    return { original: u, absolute, localPath: urlObj.pathname };
  }),
};

fs.writeFileSync(path.join(ROOT, '_tools', 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\nManifest written: ${manifest.assets.length} unique assets`);
console.log('Counts:', manifest.counts);
