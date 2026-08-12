// Download every same-origin asset listed in manifest.json into a mirror
// structure under the project root. Then scan downloaded CSS for url(...) and
// download those secondary assets too (fonts, bg images). Cross-origin URLs
// (CDNs) are left untouched.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
const ORIGIN = manifest.origin; // https://docs.unity3d.com

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchBuf(url, tries = 3) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: '*/*' } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const ab = await res.arrayBuffer();
      return Buffer.from(ab);
    } catch (e) {
      if (attempt === tries) throw e;
      await sleep(400 * attempt);
    }
  }
}

function ensureDir(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

// url(...) finder for CSS. Resolves relative to the CSS file's own URL.
function cssUrls(cssText, cssUrl) {
  const out = [];
  const re = /url\(\s*['"]?([^'")]+?)['"]?\s*\)/g;
  let m;
  while ((m = re.exec(cssText))) {
    const raw = m[1];
    if (/^data:/i.test(raw)) continue;
    let abs;
    try {
      abs = new URL(raw, cssUrl).href;
    } catch {
      continue;
    }
    out.push(abs);
  }
  return [...new Set(out)];
}

function localTarget(absUrl) {
  const u = new URL(absUrl);
  // strip query, mirror pathname from site root
  return path.join(ROOT, u.pathname);
}

const results = { ok: [], fail: [], skip: [] };

async function downloadOne(absUrl) {
  // Only same-origin (docs.unity3d.com) assets are mirrored.
  if (!absUrl.startsWith(ORIGIN)) {
    results.skip.push(absUrl);
    return null;
  }
  const dest = localTarget(absUrl);
  if (fs.existsSync(dest)) {
    results.ok.push({ absUrl, dest, cached: true });
    return dest;
  }
  try {
    const buf = await fetchBuf(absUrl);
    ensureDir(dest);
    fs.writeFileSync(dest, buf);
    results.ok.push({ absUrl, dest, cached: false, bytes: buf.length });
    return dest;
  } catch (e) {
    results.fail.push({ absUrl, error: String(e.message || e) });
    return null;
  }
}

(async () => {
  console.log(`Downloading ${manifest.assets.length} primary assets...`);
  // small concurrency pool
  const pool = manifest.assets.map((a) => a.absolute);
  const CONC = 6;
  let i = 0;
  async function worker() {
    while (i < pool.length) {
      const url = pool[i++];
      await downloadOne(url);
      process.stdout.write('.');
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  console.log('\nPrimary pass done.');

  // Second pass: scan downloaded CSS files for url(...) references.
  const cssFiles = results.ok
    .filter((r) => /\.css(\?|$)/i.test(r.absUrl) || r.dest.endsWith('.css'))
    .map((r) => r.dest);
  console.log(`Scanning ${cssFiles.length} CSS files for url() assets...`);

  const secondary = new Set();
  for (const cssPath of cssFiles) {
    const text = fs.readFileSync(cssPath, 'utf8');
    // Reconstruct the CSS file's original URL to resolve relative urls.
    const relFromRoot = path.relative(ROOT, cssPath).split(path.sep).join('/');
    const cssUrl = ORIGIN + '/' + relFromRoot;
    for (const u of cssUrls(text, cssUrl)) secondary.add(u);
  }

  console.log(`Found ${secondary.size} secondary assets (fonts/bg images).`);
  const secArr = [...secondary];
  let j = 0;
  async function worker2() {
    while (j < secArr.length) {
      const url = secArr[j++];
      await downloadOne(url);
      process.stdout.write('.');
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker2));
  console.log('\nSecondary pass done.');

  const sum = {
    ok: results.ok.length,
    cached: results.ok.filter((r) => r.cached).length,
    failed: results.fail.length,
    skippedForeign: results.skip.length,
    failures: results.fail,
  };
  console.log('\n=== SUMMARY ===');
  console.log(JSON.stringify(sum, null, 2));
  fs.writeFileSync(path.join(__dirname, 'download-report.json'), JSON.stringify(sum, null, 2));
})();
