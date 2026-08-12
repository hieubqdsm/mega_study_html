// Convert PNG/JPG/JPEG -> WebP across the mirror (excluding _tools, favicons,
// and existing non-raster formats). Guard: keep WebP only when it is smaller
// than the source; otherwise keep the original untouched. Writes a manifest of
// converted source paths (project-relative, forward-slash) for the rewriter.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONVERT_EXT = { '.png': 85, '.jpg': 82, '.jpeg': 82 };
const SKIP = (rel) =>
  rel.startsWith('_tools/') ||
  rel.includes('node_modules') ||
  /favicon/i.test(rel); // keep favicons as PNG (browser compat)

const files = [];
const walk = (d, rel = '') => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    const r = rel ? rel + '/' + e.name : e.name;
    if (e.isDirectory()) walk(p, r);
    else {
      const ext = path.extname(e.name).toLowerCase();
      if (ext in CONVERT_EXT && !SKIP(r)) files.push({ abs: p, rel: r, ext });
    }
  }
};
walk(ROOT);

const manifest = []; // {rel} of sources that were replaced by .webp
let bytesBefore = 0,
  bytesAfter = 0,
  keptOriginal = 0,
  failed = 0;
const CONC = 6;
let idx = 0;

async function convert(f) {
  const dest = f.abs.slice(0, -path.extname(f.abs).length) + '.webp';
  const relDest = f.rel.slice(0, -f.ext.length) + '.webp';
  const srcStat = fs.statSync(f.abs).size;
  try {
    await sharp(f.abs)
      .webp({ quality: CONVERT_EXT[f.ext] })
      .toFile(dest + '.tmp');
    const dstStat = fs.statSync(dest + '.tmp').size;
    if (dstStat < srcStat) {
      fs.renameSync(dest + '.tmp', dest);
      fs.unlinkSync(f.abs);
      manifest.push({ from: f.rel, to: relDest });
      bytesBefore += srcStat;
      bytesAfter += dstStat;
    } else {
      // WebP not smaller (rare, mostly tiny JPGs) -> keep original
      fs.unlinkSync(dest + '.tmp');
      keptOriginal++;
      bytesBefore += srcStat;
      bytesAfter += srcStat;
    }
  } catch (e) {
    failed++;
    try { fs.unlinkSync(dest + '.tmp'); } catch {}
    console.error('FAIL', f.rel, String(e.message || e).slice(0, 80));
  }
}

async function worker() {
  while (idx < files.length) {
    const i = idx++;
    await convert(files[i]);
    if (i % 50 === 0) process.stdout.write(`\rconvert: ${i + 1}/${files.length}   `);
  }
}

console.log(`Converting ${files.length} images...`);
await Promise.all(Array.from({ length: CONC }, worker));
process.stdout.write(`\rconvert: ${files.length}/${files.length} done.\n`);

fs.writeFileSync(
  path.join(import.meta.dirname, 'webp-manifest.json'),
  JSON.stringify(manifest, null, 0)
);
const mb = (b) => (b / 1048576).toFixed(1);
console.log(`Converted  : ${manifest.length}`);
console.log(`Kept orig  : ${keptOriginal} (webp wasn't smaller)`);
console.log(`Failed     : ${failed}`);
console.log(`Image bytes: ${mb(bytesBefore)} MB -> ${mb(bytesAfter)} MB  (-${((1 - bytesAfter / bytesBefore) * 100).toFixed(0)}%)`);
