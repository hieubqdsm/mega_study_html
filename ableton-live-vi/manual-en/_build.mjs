// Build offline mirror: download images, rewrite HTML, generate pages + index.
import fs from "node:fs";
import path from "node:path";

const ROOT = "D:/CODE/mega_study_html/ableton-live-vi/manual-en";
const RAW = path.join(ROOT, "_raw");
const IMG = path.join(ROOT, "images");

const meta = JSON.parse(fs.readFileSync(path.join(RAW, "_meta.json"), "utf-8"));
// sắp theo số chương trong H1 ("7. Session View" -> 7), không số -> cuối
const chNum = (h1) => {
  const m = h1.match(/^(\d+)\./);
  return m ? parseInt(m[1], 10) : 999;
};
meta.sort((a, b) => chNum(a.h1) - chNum(b.h1));
const ordered = meta.map((m) => m.slug);

// 1) gom mọi URL ảnh imgix từ HTML thô
const urlSet = new Map(); // bareUrl -> filename
for (const m of meta) {
  const html = fs.readFileSync(path.join(RAW, m.slug + ".html"), "utf-8");
  for (const u of html.matchAll(/https:\/\/ableton-production\.imgix\.net[^\s"'<>)]+/g)) {
    const bare = u[0].split("?")[0];
    if (!/\.(png|jpe?g|gif|webp|svg)$/i.test(bare)) continue;
    if (!urlSet.has(bare)) urlSet.set(bare, path.basename(bare));
  }
}
console.log("Ảnh unique:", urlSet.size);

// 2) tải ảnh (concurrency 8, bỏ qua file đã có)
fs.mkdirSync(IMG, { recursive: true });
const jobs = [...urlSet.entries()];
let done = 0, fail = [];
async function worker() {
  while (jobs.length) {
    const [bare, fname] = jobs.shift();
    const dest = path.join(IMG, fname);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) { done++; continue; }
    try {
      const r = await fetch(bare, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      fs.writeFileSync(dest, buf);
      done++;
      if (done % 100 === 0) console.log("  đã tải", done, "/", urlSet.size);
    } catch (e) {
      fail.push(bare + " — " + e.message);
    }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
console.log("Tải xong:", done, "thất bại:", fail.length);
fail.slice(0, 10).forEach((f) => console.log("  FAIL", f));

// 3) dựng HTML từng chương
function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
const totalKb = 0;

function rewrite(html, slug) {
  // ảnh: thay mọi URL imgix (có hoặc không query) bằng đường dẫn cục bộ, bỏ srcset
  html = html.replace(/(src|data-src)="https:\/\/ableton-production\.imgix\.net([^\s"]+)"/g, (full, attr, rest) => {
    const bare = ("https://ableton-production.imgix.net" + rest).split("?")[0];
    const fname = urlSet.get(bare);
    return fname ? `${attr}="../images/${fname}"` : full;
  });
  html = html.replace(/\s(?:data-)?srcset="[^"]*"/g, "");
  // link nội bộ giữa các chương
  html = html.replace(/href="\/en\/live-manual\/12\/([a-z0-9\-]+)\/?([^"]*)"/g, (full, s2, rest) => {
    if (!ordered.includes(s2)) return full;
    return `href="../${s2}/index.html${rest.startsWith("#") ? rest : ""}"`;
  });
  return html;
}

const sidebar = ordered
  .map((s) => {
    const m = meta.find((x) => x.slug === s);
    return `<a href="../${s}/index.html">${esc(m.h1)}</a>`;
  })
  .join("\n");

const page = (m, prev, next) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(m.h1)} — Ableton Live 12 Manual (Offline Mirror)</title>
<style>
  :root{--bg:#f6f4ee;--panel:#fffdf8;--ink:#23211c;--soft:#5b554b;--accent:#0d7a5f;--rule:#e2dccb;--code:#f0ece0;}
  *{box-sizing:border-box;}
  body{margin:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:var(--bg);color:var(--ink);line-height:1.7;font-size:16px;}
  a{color:var(--accent);text-decoration:none;} a:hover{text-decoration:underline;}
  .topbar{position:sticky;top:0;z-index:40;background:rgba(246,244,238,.94);backdrop-filter:blur(8px);border-bottom:1px solid var(--rule);}
  .topbar-inner{max-width:1180px;margin:0 auto;padding:8px 18px;display:flex;gap:12px;align-items:center;}
  .brand{font-weight:800;font-size:14px;} .brand small{display:block;font-weight:500;color:var(--soft);font-size:11.5px;}
  .topbar-actions{margin-left:auto;display:flex;gap:8px;}
  .btn{font-size:12.5px;font-weight:600;border:1px solid var(--rule);background:var(--panel);color:var(--ink);padding:5px 11px;border-radius:7px;cursor:pointer;}
  .btn:hover{border-color:var(--accent);color:var(--accent);text-decoration:none;}
  .layout{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:280px 1fr;gap:0;}
  .toc{position:sticky;top:49px;align-self:start;max-height:calc(100vh - 49px);overflow-y:auto;padding:22px 14px 40px;font-size:12.5px;border-right:1px solid var(--rule);}
  .toc h3{font-size:11px;text-transform:uppercase;letter-spacing:.8px;color:var(--soft);margin:0 0 8px;}
  .toc a{display:block;padding:3px 8px;border-radius:6px;color:var(--ink);}
  .toc a:hover{background:var(--code);text-decoration:none;}
  article{padding:26px 34px 60px;max-width:860px;}
  article h1{font-size:26px;font-weight:900;margin:0 0 18px;}
  article h2{font-size:20px;font-weight:800;margin:34px 0 10px;padding-top:14px;border-top:1px solid var(--rule);scroll-margin-top:70px;}
  article h3{font-size:16.5px;font-weight:700;color:var(--accent);margin:24px 0 8px;scroll-margin-top:70px;}
  article h4{font-size:14.5px;margin:18px 0 6px;}
  article img{max-width:100%;height:auto;border:1px solid var(--rule);border-radius:8px;margin:10px 0;display:block;background:#fff;}
  article figure{margin:14px 0;}
  article figcaption{font-size:12px;color:var(--soft);font-style:italic;margin-top:-4px;}
  article table{border-collapse:collapse;width:100%;font-size:13.5px;margin:12px 0;}
  article th,article td{border:1px solid var(--rule);padding:6px 10px;text-align:left;vertical-align:top;}
  article th{background:var(--code);}
  article code,article kbd{font-family:Consolas,monospace;background:var(--code);border-radius:4px;padding:1px 5px;font-size:.92em;}
  article pre{background:var(--code);border-radius:8px;padding:12px 16px;overflow-x:auto;font-size:13px;}
  article pre code{background:none;padding:0;}
  article ul,article ol{padding-left:22px;}
  article li{margin:3px 0;}
  article hr{border:none;border-top:1px solid var(--rule);margin:26px 0;}
  .pager{display:flex;gap:10px;margin-top:40px;padding-top:16px;border-top:1px solid var(--rule);}
  .pager a{flex:1;border:1px solid var(--rule);border-radius:10px;padding:10px 14px;font-size:13px;background:var(--panel);}
  .pager a:hover{border-color:var(--accent);text-decoration:none;}
  .pager .next{text-align:right;}
  .pager small{display:block;color:var(--soft);font-size:11px;}
  @media (max-width:840px){ .layout{grid-template-columns:1fr;} .toc{display:none;} article{padding:20px 18px 50px;} }
</style>
</head>
<body>
<div class="topbar"><div class="topbar-inner">
  <div class="brand">Ableton Live 12 — Reference Manual<small>Offline mirror · English · © Ableton AG</small></div>
  <div class="topbar-actions">
    <a class="btn" href="../index.html">☰ Mục lục</a>
    <a class="btn" href="../../../index.html">← Thư viện</a>
  </div>
</div></div>
<div class="layout">
<nav class="toc"><h3>Chapters</h3>
${sidebar}
</nav>
<article>
${rewrite(fs.readFileSync(path.join(RAW, m.slug + ".html"), "utf-8"), m.slug)}
<div class="pager">
  ${prev ? `<a href="../${prev.slug}/index.html"><small>← Previous</small>${esc(prev.h1)}</a>` : ""}
  ${next ? `<a class="next" href="../${next.slug}/index.html"><small>Next →</small>${esc(next.h1)}</a>` : ""}
</div>
</article>
</div>
</body>
</html>`;

for (let i = 0; i < meta.length; i++) {
  const m = meta[i];
  const dir = path.join(ROOT, m.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page(m, meta[i - 1], meta[i + 1]), "utf-8");
}
console.log("Đã dựng", meta.length, "trang chương.");

// 4) trang mục lục tổng
const rows = meta
  .map(
    (m) =>
      `<a class="ch" href="${m.slug}/index.html"><b>${esc(m.h1)}</b><span>${m.text.toLocaleString("en-US")} ký tự · ${(m.bytes / 1024).toFixed(0)} KB HTML</span></a>`
  )
  .join("\n");
const totalText = meta.reduce((s, m) => s + m.text, 0);
fs.writeFileSync(
  path.join(ROOT, "index.html"),
  `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ableton Live 12 Reference Manual — Offline Mirror (English)</title>
<style>
  :root{--bg:#f6f4ee;--panel:#fffdf8;--ink:#23211c;--soft:#5b554b;--accent:#0d7a5f;--rule:#e2dccb;--code:#f0ece0;}
  *{box-sizing:border-box;}
  body{margin:0;font-family:'Segoe UI',Tahoma,sans-serif;background:var(--bg);color:var(--ink);line-height:1.6;}
  .wrap{max-width:880px;margin:0 auto;padding:40px 22px 60px;}
  h1{font-size:28px;font-weight:900;margin:0 0 6px;}
  p.lead{color:var(--soft);font-size:14.5px;max-width:640px;}
  .pdf{display:inline-block;margin:14px 0 26px;background:var(--accent);color:#fff;font-weight:700;font-size:14px;padding:10px 18px;border-radius:10px;}
  .pdf:hover{filter:brightness(1.08);text-decoration:none;}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  @media (max-width:640px){.grid{grid-template-columns:1fr;}}
  a.ch{display:flex;flex-direction:column;gap:2px;border:1px solid var(--rule);background:var(--panel);border-radius:10px;padding:12px 15px;font-size:14px;}
  a.ch:hover{border-color:var(--accent);text-decoration:none;}
  a.ch b{font-weight:700;}
  a.ch span{color:var(--soft);font-size:11.5px;}
  footer{margin-top:34px;padding-top:16px;border-top:1px solid var(--rule);font-size:12px;color:var(--soft);}
</style>
</head>
<body>
<div class="wrap">
  <h1>Ableton Live 12 — Reference Manual (Offline)</h1>
  <p class="lead">Mirror đầy đủ ${meta.length} chương của bản chính thức tiếng Anh trên ableton.com — để đọc offline &amp; làm nguồn dịch tiếng Việt dần. Nội dung © Ableton AG.</p>
  <a class="pdf" href="live12-manual-en.pdf" download>⬇ Tải PDF chính thức (92 MB)</a>
  <div class="grid">
${rows}
  </div>
  <footer>
    Nguồn: ableton.com/en/live-manual/12 (bản 2026-08-11) · PDF chính thức đi kèm trong thư mục này.
    Bản dịch tiếng Việt 10 chương &amp; cheatsheet: <a href="../index.html">ableton-live-vi</a> · Về thư viện: <a href="../../index.html">Mega Study</a>
  </footer>
</div>
</body>
</html>`,
  "utf-8"
);
console.log("Tổng dung lượng text:", (totalText / 1000).toFixed(0), "K ký tự. Xong build.");
if (fail.length) { console.log("CẢNH BÁO:", fail.length, "ảnh lỗi"); process.exit(2); }
