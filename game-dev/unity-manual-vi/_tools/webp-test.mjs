// Test WebP conversion settings on a representative PNG (text/ UI heavy).
import sharp from 'sharp';
import fs from 'node:fs';

const src = process.argv[2];
const buf = fs.readFileSync(src);
const origKB = (buf.length / 1024).toFixed(0);
const meta = await sharp(buf).metadata();
const settings = {
  'lossless': { lossless: true },
  'nearLossless@60': { nearLossless: true, quality: 60 },
  'lossy@85': { quality: 85 },
  'lossy@75': { quality: 75 },
};
console.log(`Source: ${src}  (${origKB} KB, ${meta.width}x${meta.height}, ${meta.hasAlpha ? 'alpha' : 'no-alpha'})`);
const out = {};
for (const [name, opt] of Object.entries(settings)) {
  const res = await sharp(buf).webp(opt).toBuffer();
  const kb = (res.length / 1024).toFixed(0);
  out[name] = res.length;
  const pct = ((1 - res.length / buf.length) * 100).toFixed(0);
  console.log(`  ${name.padEnd(18)} ${kb} KB  (-${pct}%)`);
  fs.writeFileSync(`_sample-${name.replace('@','')}.webp`, res);
}
