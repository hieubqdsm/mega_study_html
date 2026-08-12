// Make the mirror work on a subpath host (GitHub Pages), where root-absolute
// URLs resolve against the host root instead of the repo. Two cases:
//   <a href="/Manual/...">   -> relative path (target IS mirrored; stay offline)
//   <a href="/<other>/...">  -> absolute https://docs.unity3d.com/<other>/... (not mirrored; point live)
// Asset tags were already made relative in 05; this pass only fixes <a href>.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ORIGIN = 'https://docs.unity3d.com';
const links = JSON.parse(fs.readFileSync(path.join(__dirname, 'page-list.json'), 'utf8'))
  .filter((l) => l && l !== 'null' && l !== 'root');
const withExt = (l) => (/\.html?$/i.test(l) ? l : l + '.html');

let touched = 0;
let manualLinks = 0;
let foreignLinks = 0;

const manualRe = /(<a\b[^>]*?\shref\s*=\s*["'])\/Manual\/([^"']*)["']/gi;
const otherRe = /(<a\b[^>]*?\shref\s*=\s*["'])\/((?!Manual\/)[^"']+)["']/gi;

for (const link of links) {
  const rest = withExt(link);
  const file = path.join(ROOT, 'Manual', rest.split('/').join(path.sep));
  if (!fs.existsSync(file)) continue;
  const pageDir = path.dirname(path.join('Manual', rest)); // relative to ROOT
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  // /Manual/<x>  -> relative from this page's dir to Manual/<x>
  html = html.replace(manualRe, (m, pre, x) => {
    manualLinks++;
    const target = path.join('Manual', x.split('/').join(path.sep));
    const rel = path.relative(pageDir, target).split(path.sep).join('/');
    return pre + rel + '"';
  });

  // /<other>  -> absolute live Unity URL (cn/ja/kr/etc., not mirrored)
  html = html.replace(otherRe, (m, pre, rest2) => {
    foreignLinks++;
    return pre + ORIGIN + '/' + rest2 + '"';
  });

  if (html !== before) {
    fs.writeFileSync(file, html);
    touched++;
  }
}

// also fix the hand-written index
const idx = path.join(ROOT, 'Manual', 'index.html');
if (fs.existsSync(idx)) {
  const pageDir = 'Manual';
  let html = fs.readFileSync(idx, 'utf8');
  const before = html;
  html = html.replace(manualRe, (m, pre, x) => {
    manualLinks++;
    const target = path.join('Manual', x.split('/').join(path.sep));
    const rel = path.relative(pageDir, target).split(path.sep).join('/');
    return pre + rel + '"';
  });
  html = html.replace(otherRe, (m, pre, rest2) => {
    foreignLinks++;
    return pre + ORIGIN + '/' + rest2 + '"';
  });
  if (html !== before) fs.writeFileSync(idx, html);
}

console.log(`Files touched      : ${touched}`);
console.log(`/Manual/ -> relative: ${manualLinks}`);
console.log(`/other  -> live abs : ${foreignLinks}`);
