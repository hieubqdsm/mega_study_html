// Crawl every page listed in page-list.json (the full Unity Manual ToC),
// mirror each HTML under Manual/<link>.html preserving the original directory
// structure, collect every <img> across all pages, download the unique image
// set, then rewrite each page the same way index.html was rewritten so the
// whole tree opens offline. Resumable: existing files are skipped.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ORIGIN = 'https://docs.unity3d.com';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
const CONC = 4; // docs.unity3d.com rate-limits hard (HTTP 429); keep this low
const JITTER = 120; // ms base delay added per request to spread load

const links = JSON.parse(fs.readFileSync(path.join(__dirname, 'page-list.json'), 'utf8'))
  .filter((l) => l && l !== 'null' && l !== 'root')
  .filter((l, i, a) => a.indexOf(l) === i); // dedup, keep order

const withExt = (link) => (/\.html?$/i.test(link) ? link : link + '.html');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchBuf(url, tries = 6) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: '*/*' } });
      if (res.ok) {
        await sleep(JITTER + Math.floor(Math.random() * JITTER));
        return Buffer.from(await res.arrayBuffer());
      }
      if (res.status === 404) return null; // genuine missing page
      if (res.status === 429) {
        // Respect Retry-After if present; otherwise exponential backoff.
        const ra = parseInt(res.headers.get('retry-after') || '0', 10);
        const waitMs = ra > 0 ? ra * 1000 : Math.min(30000, 3000 * attempt);
        await sleep(waitMs);
        continue;
      }
      throw new Error('HTTP ' + res.status);
    } catch (e) {
      if (attempt === tries) throw e;
      await sleep(800 * attempt);
    }
  }
}
const ensureDir = (f) => fs.mkdirSync(path.dirname(f), { recursive: true });

// ---- tag/attr helpers (same approach as 01) ----
function findTags(html, re) {
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

// ---- Phase A: download all HTML, collect image URLs ----
const stats = { pagesOk: 0, pagesCached: 0, pagesFail: 0, pages404: 0, images: 0 };
const failures = [];
const imageSet = new Set(); // absolute same-origin image URLs

async function doPage(link) {
  const rest = withExt(link);
  const url = ORIGIN + '/Manual/' + rest;
  const dest = path.join(ROOT, 'Manual', rest.split('/').join(path.sep));
  let html;
  if (fs.existsSync(dest)) {
    html = fs.readFileSync(dest, 'utf8');
    stats.pagesCached++;
  } else {
    const buf = await fetchBuf(url);
    if (buf === null) {
      stats.pages404++;
      return;
    }
    html = buf.toString('utf8');
    ensureDir(dest);
    fs.writeFileSync(dest, html);
    stats.pagesOk++;
  }
  // collect images: resolve src/data-src/srcset against the page's <base>
  const baseMatch = html.match(/<base\s+href=["']([^"']+)["']/i);
  const baseUrl = baseMatch ? new URL(baseMatch[1], url).href : url;
  for (const t of findTags(html, '<img\\b[^>]*>')) {
    for (const a of ['src', 'data-src']) {
      const v = attr(t, a);
      if (!v || /^data:/i.test(v)) continue;
      try {
        const abs = new URL(v, baseUrl).href;
        if (abs.startsWith(ORIGIN)) imageSet.add(abs);
      } catch {}
    }
    const ss = attr(t, 'srcset');
    if (ss) {
      for (const part of ss.split(',')) {
        const u = part.trim().split(/\s+/)[0];
        if (!u || /^data:/i.test(u)) continue;
        try {
          const abs = new URL(u, baseUrl).href;
          if (abs.startsWith(ORIGIN)) imageSet.add(abs);
        } catch {}
      }
    }
  }
}

// ---- Phase B: download unique images ----
function localTarget(absUrl) {
  const u = new URL(absUrl);
  return path.join(ROOT, u.pathname.split('/').join(path.sep));
}
async function doImage(absUrl) {
  const dest = localTarget(absUrl);
  if (fs.existsSync(dest)) return;
  try {
    const buf = await fetchBuf(absUrl);
    if (buf === null) return;
    ensureDir(dest);
    fs.writeFileSync(dest, buf);
    stats.images++;
  } catch (e) {
    failures.push({ url: absUrl, error: String(e.message || e) });
  }
}

async function runPool(items, worker, label) {
  let i = 0;
  const total = items.length;
  async function w() {
    while (i < items.length) {
      const idx = i++;
      try {
        await worker(items[idx]);
      } catch (e) {
        failures.push({ item: items[idx], error: String(e.message || e) });
        stats.pagesFail++;
      }
      if (idx % 50 === 0) process.stdout.write(`\r${label}: ${idx + 1}/${total}   `);
    }
  }
  await Promise.all(Array.from({ length: CONC }, w));
  process.stdout.write(`\r${label}: ${total}/${total} done.\n`);
}

// ---- Phase C: rewrite every page (generalized index rewrite, depth-aware) ----
function rewritePage(html, rest) {
  const slashes = (rest.match(/\//g) || []).length;
  const prefix = '../'.repeat(slashes + 1); // up to project root
  let out = html;

  // 1) drop <base>
  out = out.replace(/<base\b[^>]*>\s*/i, '');

  // 2) root-absolute same-origin asset paths -> relative by depth
  out = out.replace(
    /(<(?:link|script|img|source)\b[^>]*?\s(?:src|href)\s*=\s*["'])\/((?:StaticFiles(?:Manual|Config)|uploads|Manual)\/[^"']*)["']/gi,
    (m, pre, p) => pre + prefix + p + '"'
  );

  // 3) favicon unity.com -> local
  out = out.replace(
    /https:\/\/unity\.com\/themes\/contrib\/unity_base\/images\/favicons\/favicon\.ico/g,
    prefix + 'StaticFilesManual/images/favicons/favicon.png'
  );

  // 4) strip cache-bust query on relative asset refs
  out = out.replace(
    /(<(?:link|script|img|source)\b[^>]*?\s(?:src|href)\s*=\s*["'])([^"']+)(["'])/gi,
    (m, pre, u, post) => {
      if (/^[a-z][a-z0-9+.-]*:/i.test(u) || u.startsWith('//') || u.startsWith('/') || u.startsWith('data:')) return m;
      const q = u.indexOf('?');
      return q === -1 ? m : pre + u.slice(0, q) + post;
    }
  );

  // 5) remove OneTrust cookie stub
  out = out.replace(/<script\b[^>]*src=["']https:\/\/cdn\.cookielaw\.org\/[^"']*["'][^>]*><\/script>\s*/gi, '');
  out = out.replace(/<script\b[^>]*>\s*function\s+OptanonWrapper\s*\(\s*\)\s*\{\s*\}\s*<\/script>\s*/gi, '');
  return out;
}

(async () => {
  console.log(`Phase A: download ${links.length} HTML pages...`);
  await runPool(links, doPage, 'pages');
  console.log(`  new:${stats.pagesOk} cached:${stats.pagesCached} 404:${stats.pages404} fail:${stats.pagesFail}`);

  console.log(`\nPhase B: download ${imageSet.size} unique images...`);
  await runPool([...imageSet], doImage, 'imgs');
  console.log(`  new images:${stats.images}`);

  console.log(`\nPhase C: rewrite all HTML in place...`);
  let rewritten = 0;
  for (const link of links) {
    const rest = withExt(link);
    const dest = path.join(ROOT, 'Manual', rest.split('/').join(path.sep));
    if (!fs.existsSync(dest)) continue;
    const html = fs.readFileSync(dest, 'utf8');
    fs.writeFileSync(dest, rewritePage(html, rest));
    rewritten++;
  }
  console.log(`  rewritten:${rewritten}`);

  const report = { stats, imageSetSize: imageSet.size, failures: failures.slice(0, 50), failureCount: failures.length };
  fs.writeFileSync(path.join(__dirname, 'crawl-report.json'), JSON.stringify(report, null, 2));
  console.log('\n=== DONE ===');
  console.log(JSON.stringify({ stats, imagesUnique: imageSet.size, failures: failures.length }, null, 2));
})();
