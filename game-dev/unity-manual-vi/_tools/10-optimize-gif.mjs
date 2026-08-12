// Lossy-optimize all GIFs in the mirror in place with gifsicle.
// Only replaces the original when the optimized version is smaller.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const GS = path.join(import.meta.dirname, 'node_modules', 'gifsicle', 'vendor', 'gifsicle.exe');
const OPT = ['-O3', '--lossy=120', '--colors=256'];

const gifs = [];
const walk = (d, rel = '') => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    const r = rel ? rel + '/' + e.name : e.name;
    if (e.isDirectory()) {
      if (r === '_tools' || r.includes('node_modules')) continue;
      walk(p, r);
    } else if (/\.gif$/i.test(e.name)) gifs.push({ abs: p, rel: r });
  }
};
walk(ROOT);

let before = 0, after = 0, improved = 0, kept = 0, failed = 0;
const tmp = path.join(import.meta.dirname, '_gif.tmp');
for (const g of gifs) {
  const s0 = fs.statSync(g.abs).size;
  try {
    execFileSync(GS, [...OPT, g.abs, '-o', tmp], { stdio: 'ignore' });
    const s1 = fs.statSync(tmp).size;
    if (s1 < s0) {
      fs.copyFileSync(tmp, g.abs);
      before += s0; after += s1; improved++;
    } else {
      before += s0; after += s0; kept++;
    }
  } catch (e) {
    failed++;
  }
}
try { fs.unlinkSync(tmp); } catch {}
const mb = (b) => (b / 1048576).toFixed(1);
console.log(`GIFs processed : ${gifs.length}`);
console.log(`  improved    : ${improved}`);
console.log(`  kept orig   : ${kept}`);
console.log(`  failed      : ${failed}`);
console.log(`GIF bytes     : ${mb(before)} MB -> ${mb(after)} MB  (-${((1 - after / before) * 100).toFixed(0)}%)`);
