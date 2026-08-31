// Fix lazy images offline: đảm bảo mọi <img> có src thật (lấy từ data-src).
import fs from "node:fs";
import path from "node:path";

const ROOT = "D:/CODE/mega_study_html/ableton-live-vi/manual-en";
let fixedTags = 0, pages = 0;
for (const dir of fs.readdirSync(ROOT, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const f = path.join(ROOT, dir.name, "index.html");
  if (!fs.existsSync(f)) continue;
  let html = fs.readFileSync(f, "utf-8");
  const before = html;
  html = html.replace(/<img[^>]*>/g, (tag) => {
    const dm = tag.match(/\sdata-src="([^"]+)"/);
    if (!dm) return tag;
    let out = tag;
    if (/\ssrc="[^"]*"/.test(out)) out = out.replace(/\ssrc="[^"]*"/, ` src="${dm[1]}"`);
    else out = out.replace("<img", `<img src="${dm[1]}"`);
    if (out !== tag) fixedTags++;
    return out;
  });
  if (html !== before) { fs.writeFileSync(f, html, "utf-8"); pages++; }
}
console.log("Đã vá", pages, "trang,", fixedTags, "thẻ img.");
