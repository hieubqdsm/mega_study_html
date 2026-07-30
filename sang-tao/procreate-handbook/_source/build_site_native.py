#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dựng trang GẦN NHƯ NGUYÊN CON từ HTML gốc Procreate:
- Giữ nguyên toàn bộ class Tailwind + Alpine.js (POI, sidebar, modal hoạt động y gốc)
- Chỉ cắt phần TOC/related thừa (như build cũ)
- Đổi link ảnh -> local (theo _image-map.json)
- Đổi link CSS/JS CloudFront -> assets/orig/ (da tai ve)
- Them sidebar menu tieng Viet cua minh nhu BỔ SUNG (khong xoa sidebar goc)
Muc tieu: layout POI/sidebar/cta = y goc, chi thay anh local + them phan dich.
"""
import os
import re
import json
import html as html_lib
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.abspath(__file__))            # _source/
PHB = os.path.dirname(ROOT)                                   # procreate-handbook/

with open(os.path.join(ROOT, "_manifest.json"), encoding="utf-8") as f:
    manifest = json.load(f)
with open(os.path.join(PHB, "assets", "_image-map.json"), encoding="utf-8") as f:
    img_map = json.load(f)["url_to_local"]

# Load translations (key = text Anh, value = {"vi": ...}) - chi lay entry da co ban dich
TRANS_PATH = os.path.join(ROOT, "translations.json")
_translations = {}
if os.path.exists(TRANS_PATH):
    with open(TRANS_PATH, encoding="utf-8") as f:
        _raw = json.load(f)
    _translations = {k: v["vi"] for k, v in _raw.items() if v.get("vi")}


def apply_translations(html_text):
    """Thay text trong <p>/<h2>/<h3>/<li> bang ban dich (neu co).
    Bo POI heading (data-number). Match theo prefix 40 ky tu de chiu text dai/ngan."""
    if not _translations:
        return html_text
    PREFIX = {en[:40]: vi for en, vi in _translations.items()}

    def repl(m):
        tag = m.group(1)
        attrs = m.group(2)
        inner = m.group(3)
        if "data-number" in attrs:
            return m.group(0)  # POI heading giu nguyen
        txt = re.sub(r"<[^>]+>", "", inner)
        txt = re.sub(r"\s+", " ", txt).strip()
        vi = _translations.get(txt)
        if vi is None:
            vi = PREFIX.get(txt[:40])
        if vi:
            return f"<{tag}{attrs}> {vi} </{tag}>"
        return m.group(0)

    html_text = re.sub(r"<(p|h2|h3|li)([^>]*)>(.*?)</\1>", repl, html_text, flags=re.S)
    return html_text

chapters = {}
order = []
for p in manifest["pages"]:
    c = p["chapter"]
    if c not in chapters:
        chapters[c] = {"vi_title": p["vi_title"], "pages": []}
        order.append(c)
    chapters[c]["pages"].append(p)

CHAPTER_ICON = {
    "introduction": "👋", "interface-gestures": "🖐️", "gallery": "🖼️",
    "colors": "🎨", "brushes": "🖌️", "layers": "🗂️", "text": "🔤",
    "guides": "📐", "animation": "🎞️", "page-assist": "📄", "3d-painting": "🧊",
    "actions": "⚙️", "selections": "✂️", "transform": "🔀", "adjustments": "🎛️",
}


def slug_to_file(chapter, slug):
    return (slug + ".html") if slug else "index.html"


def build_sidebar(active_chapter, active_slug):
    """Sidebar menu tieng Viet (dung chung, style rieng trong native-sidebar.css)."""
    items = []
    home_active = "active" if not active_chapter else ""
    items.append(
        f'<li class="nav-home"><a href="../index.html" class="{home_active}">'
        f'<span class="nav-ic">🏠</span><span>Procreate Handbook</span></a></li>'
    )
    for c in order:
        info = chapters[c]
        subs = info["pages"]
        is_open = (c == active_chapter)
        ov = subs[0]
        ov_href = f"../{c}/" + slug_to_file(c, ov["slug"])
        icon = CHAPTER_ICON.get(c, "📖")
        items.append(
            f'<li class="nav-chapter">'
            f'<details{" open" if is_open else ""}>'
            f'<summary><span class="nav-ic">{icon}</span>'
            f'<span class="nav-label">{info["vi_title"]}</span>'
            f'<span class="nav-count">{len(subs)}</span></summary>'
            f'<ul class="nav-sub">'
        )
        for p in subs:
            href = f"../{c}/" + slug_to_file(c, p["slug"])
            cls = "active" if (c == active_chapter and p["slug"] == active_slug) else ""
            label = p["title"] if p["slug"] else "Tổng quan"
            items.append(f'<li><a href="{href}" class="{cls}">{label}</a></li>')
        items.append("</ul></details></li>")
    return "\n".join(items)

CLOUDFRONT_BASE = "https://d1tq2834awssza.cloudfront.net/24717aef-2db0-4a9b-9b27-f5d2ae35871d/build/assets/"


def full_res_url(url):
    url = html_lib.unescape(url)
    if "cdn.sanity.io" in url:
        return url.split("?")[0]
    return url


def rewrite_urls_in_html(html_text):
    """Doi link anh -> local, CSS/JS cloudfront -> assets/orig/, VA fix lazy-load:
    copy data-src -> src (xoa base64 placeholder). Dung BeautifulSoup cho chinh xac."""
    soup = BeautifulSoup(html_text, "lxml")

    # 1. Anh: xu ly tung <img>
    for img in soup.find_all("img"):
        # uu tien data-src (lazy) -> local
        ds = img.get("data-src")
        local_src = None
        if ds:
            fu = full_res_url(ds)
            if fu in img_map:
                local_src = "../" + img_map[fu]
        # neu data-src khong co trong map, thu src
        if local_src is None:
            s = img.get("src")
            if s and not s.startswith("data:"):
                fu = full_res_url(s)
                if fu in img_map:
                    local_src = "../" + img_map[fu]
        if local_src:
            img["src"] = local_src
            # xoa base64 placeholder va thuoc tinh lazy
            if img.has_attr("data-src"):
                del img["data-src"]
            if img.has_attr("data-srcset"):
                del img["data-srcset"]
            if img.has_attr("srcset"):
                del img["srcset"]

    # 2. CSS/JS cloudfront -> assets/orig/<ten file>
    for tag in soup.find_all(["link", "script"]):
        for attr in ("href", "src"):
            val = tag.get(attr)
            if val and "d1tq2834awssza" in val:
                base = os.path.basename(val.split("?")[0])
                if os.path.exists(os.path.join(PHB, "assets", "orig", base)):
                    tag[attr] = "../assets/orig/" + base

    return str(soup)


def _maybe_local(url, keep_query=True):
    fu = full_res_url(url)
    if fu in img_map:
        return "../" + img_map[fu]
    return url


def clean_content_keep_classes(html_text):
    """Cat tu <h1> den </main>, GIU NGUYEN class/Alpine. Tra (html, title)."""
    h1_pos = html_text.find("<h1")
    main_end = html_text.rfind("</main>")
    if h1_pos == -1 or main_end == -1 or main_end < h1_pos:
        return "", ""
    chunk = html_text[h1_pos:main_end + len("</main>")]
    # Loai CTA/related (Talk to the team...) + khoi chua nhieu link handbook
    soup = BeautifulSoup(chunk, "lxml")
    cta_kw = ["talk to the team", "still have questions", "search our resources",
              "sorry. we", "copying to your clipboard"]
    for a in soup.find_all("a"):
        t = (a.get_text(strip=True) or "").lower()
        if any(k in t for k in cta_kw):
            pr = a.find_parent(["div", "section"])
            if pr is not None:
                pr.decompose()
    for div in soup.find_all(["div", "section", "nav", "ul"]):
        hl = div.find_all("a", href=re.compile(r"/procreate/handbook/"))
        if len(hl) >= 3:
            div.decompose()
    # Loai <template x-teleport> (modal/drawer — khong dung, gay loi Alpine)
    for t in soup.find_all("template", attrs={"x-teleport": True}):
        t.decompose()
    title = soup.find("h1").get_text(strip=True) if soup.find("h1") else ""
    return str(soup), title


def main():
    ok = 0
    for p in manifest["pages"]:
        if p["status"] not in ("ok", "cached"):
            continue
        src = os.path.join(ROOT, p["file"])
        if not os.path.exists(src):
            continue
        raw = open(src, encoding="utf-8", errors="replace").read()
        # Doi URL anh/CSS/JS truoc
        raw = rewrite_urls_in_html(raw)
        # Cat noi dung tu h1 (bo TOC), GIU NGUYEN class Tailwind + POI
        content, title = clean_content_keep_classes(raw)
        if not title:
            title = p["title"]

        # Bọc content native vào template có sidebar Việt.
        chapter = p["chapter"]
        slug = p["slug"]
        sidebar = build_sidebar(chapter, slug)
        out_html = NATIVE_TEMPLATE.format(
            title=title, content=content, sidebar=sidebar
        )
        # Áp dụng bản dịch (nếu có trong translations.json)
        out_html = apply_translations(out_html)
        # Cập nhật lang-note
        out_html = out_html.replace(
            "📖 Nội dung bên dưới là bản gốc tiếng Anh (chưa dịch). Ảnh đã cache offline.",
            "📖 Đã dịch sang tiếng Việt. Thuật ngữ chuyên môn giữ tiếng Anh — <b>rê chuột</b> để xem nghĩa (tooltip)."
        )
        out_path = os.path.join(PHB, p["file"])
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        open(out_path, "w", encoding="utf-8").write(out_html)
        ok += 1
        if ok <= 2:
            print(f"[{ok}] {p['file']}  title={title!r}")
    print(f"\nDựng {ok} trang (native, giữ class gốc).")


# Template: sidebar Việt (của mình) + content native (giữ class Tailwind gốc).
NATIVE_TEMPLATE = """<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — Procreate Handbook (tiếng Việt)</title>
<link rel="stylesheet" href="../assets/orig/app.css">
<link rel="stylesheet" href="../assets/style.css">
<link rel="stylesheet" href="../assets/native.css">
</head>
<body>
<button class="menu-toggle" id="menuToggle" aria-label="Mở menu">☰</button>
<div class="layout">
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-head">
      <a href="../index.html" class="brand"><span class="brand-ic">🖌️</span> Procreate <b>Handbook</b></a>
    </div>
    <nav>
      <ul class="nav">
{sidebar}
      </ul>
    </nav>
    <div class="sidebar-foot">
      <p>Bản dịch cộng đồng — chưa hoàn thiện.<br>Nội dung tiếng Anh gốc © Procreate.</p>
    </div>
  </aside>
  <div class="main-wrap">
    <header class="topbar">
      <div class="breadcrumb"><a href="../index.html">Handbook</a></div>
      <button class="theme-toggle" id="themeToggle" aria-label="Đổi giao diện">🌓</button>
    </header>
    <main class="native-content">
      <p class="lang-note">📖 Nội dung bên dưới là bản gốc tiếng Anh (chưa dịch). Ảnh đã cache offline.</p>
      <div class="document-item-spacing document-container">
{content}
      </div>
    </main>
  </div>
</div>
<button class="to-top" id="toTop" aria-label="Lên đầu trang">↑</button>
<!-- Teleport targets rỗng (tránh lỗi Alpine nếu còn sót template x-teleport) -->
<div id="drawers-go-here"></div>
<div id="modals-go-here"></div>
<script src="../assets/orig/app.js"></script>
<script src="../assets/app.js"></script>
</body>
</html>
"""


if __name__ == "__main__":
    main()
