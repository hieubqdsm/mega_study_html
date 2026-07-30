#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bước 3: Sinh 104 trang HTML khung tieng Anh (chua dich) voi:
- sidebar menu 14 chuong (tu _manifest.json) dung chung
- noi dung boc tu <main> cua trang goc (BeautifulSoup)
- link anh da doi sang local (tu _image-map.json)
- CSS/JS rieng biet trong assets/style.css + assets/app.js
Trang duoc luu tai procreate-handbook/<chapter>/<slug|index>.html
"""
import os
import re
import json
import html as html_lib
from bs4 import BeautifulSoup, NavigableString

ROOT = os.path.dirname(os.path.abspath(__file__))            # _source/
PHB = os.path.dirname(ROOT)                                   # procreate-handbook/

with open(os.path.join(ROOT, "_manifest.json"), encoding="utf-8") as f:
    manifest = json.load(f)
with open(os.path.join(PHB, "assets", "_image-map.json"), encoding="utf-8") as f:
    img_map = json.load(f)["url_to_local"]

# Map: chapter -> {vi_title, pages:[{slug,title,file,url}]}
chapters = {}
order = []
for p in manifest["pages"]:
    c = p["chapter"]
    if c not in chapters:
        chapters[c] = {"vi_title": p["vi_title"], "pages": []}
        order.append(c)
    chapters[c]["pages"].append(p)


def full_res_url(url):
    url = html_lib.unescape(url)
    if "cdn.sanity.io" in url:
        return url.split("?")[0]
    return url


def slug_to_file(chapter, slug):
    return (slug + ".html") if slug else "index.html"


def relpath_from(chapter, slug):
    """Duong dan tu 1 trang con den trang muc tieu (de dung trong menu)."""
    return slug_to_file(chapter, slug)


def page_rel_output(p):
    """Duong dan output tu goc PHB cua trang (giong _source nhung bo _source/)."""
    return p["file"]  # vi _source/<chapter>/<file> -> output cung <chapter>/<file>


def normalize_img_src(src):
    """Tra ve URL full-res hoac None."""
    if not src:
        return None
    if src.startswith("//"):
        src = "https:" + src
    if not src.startswith("http"):
        return None
    return full_res_url(src)


def rewrite_img(img, this_chapter):
    """Doi src/srcset/data-src cua 1 tag <img> sang local. Tra True neu thanh cong."""
    def drop(*attrs):
        for a in attrs:
            if img.has_attr(a):
                del img[a]
    # uu tien data-src (lazy)
    for attr in ("data-src", "src"):
        src = img.get(attr)
        fu = normalize_img_src(src)
        if fu and fu in img_map:
            rel = img_map[fu]  # vd assets/img/xxx.jpg (tu goc PHB)
            img["src"] = "../" + rel
            drop("data-src", "data-srcset", "srcset")
            img["loading"] = "lazy"
            return True
    # Neu khong tim trong map -> thu full-res url roi bo src (de tran loi)
    src = img.get("src") or img.get("data-src")
    fu = normalize_img_src(src)
    if fu and fu not in img_map:
        # anh khong tai duoc -> danh dau de biet
        img["src"] = ""
        img["data-missing"] = fu
    drop("data-src", "data-srcset", "srcset")
    return False


def clean_main_content(html_text):
    """Boc NOI DUNG THAT cua trang: cat tu <h1> dau tien den </main> (bo het
    sidebar TOC nam truoc h1), roi don dep CTA/related o cuoi. Tra (html, tieu_de)."""
    # ---- Cat bang regex: chi lay [h1 .. end main] ----
    # (BeautifulSoup parse ca trang roi boc <main> se bi nhan ca TOC vi h1 nam
    #  sau TOC trong main; cat text truoc la de dang & chinh xac.)
    h1_pos = html_text.find("<h1")
    main_end = html_text.rfind("</main>")
    if h1_pos == -1 or main_end == -1 or main_end < h1_pos:
        # Fallback: boc toan bo main
        soup_f = BeautifulSoup(html_text, "lxml")
        main_f = soup_f.find("main")
        if not main_f:
            return "", ""
        chunk = str(main_f)
    else:
        chunk = html_text[h1_pos:main_end]

    soup = BeautifulSoup(chunk, "lxml")

    # Tieu de = text h1 dau tien; bo h1 (template chen rieng)
    h1 = soup.find("h1")
    title = h1.get_text(strip=True) if h1 else ""
    if h1:
        h1.decompose()

    # Xoa svg/script/style con (co the con sot do parse tu string)
    for t in soup.find_all(["script", "style", "svg", "template", "button", "noscript"]):
        t.decompose()

    # ---- Loai bo khoi CTA / footer cuoi trang ----
    cta_keywords = ["talk to the team", "still have questions", "search our resources",
                    "sorry. we", "copying to your clipboard"]
    for a in soup.find_all("a"):
        txt = (a.get_text(strip=True) or "").lower()
        if any(k in txt for k in cta_keywords):
            parent = a.find_parent(["div", "section"])
            if parent is not None and parent.name != "[document]":
                parent.decompose()

    # Xoa cac khoi chua nhieu link TOC handbook (related nav cuoi trang)
    for div in soup.find_all(["div", "section", "nav", "ul"]):
        handbook_links = div.find_all("a", href=re.compile(r"/procreate/handbook/"))
        if len(handbook_links) >= 3:
            div.decompose()

    # ---- Xu ly anh ----
    for img in soup.find_all("img"):
        rewrite_img(img, None)

    # ---- Bo thuoc tinh Alpine.js + class tailwind + id ngau nhien ----
    # (LUU Y: phai lam TRUOC khi tao span POI, neu khong class poi-num se bi xoa)
    alpine_attr_re = re.compile(r"^(x-|@|:)")
    for tag in soup.find_all(True):
        for a in list(tag.attrs):
            if alpine_attr_re.match(a):
                del tag[a]
        if tag.has_attr("class"):
            del tag["class"]
        if tag.has_attr("id"):
            del tag["id"]

    # ---- Points of Interest (POI): chuyen <a data-number="N">Text</a> thanh ----
    # <span class="poi-num" data-num="N">Text</span> — pill chua text + vong tron so
    # truoc no (qua ::before), giong design goc Procreate (pill xam + so).
    for a in soup.find_all("a", attrs={"data-number": True}):
        num = a.get("data-number", "")
        # Tao span pill giu nguyen text heading, them data-num cho ::before
        span = soup.new_tag("span", attrs={"class": "poi-num", "data-num": num})
        span.string = a.get_text(strip=True)
        a.replace_with(span)

    # ---- Tao lai id cho heading h2/h3 (cho anchor) ----
    used = set()
    for h in soup.find_all(["h2", "h3"]):
        base = re.sub(r"[^a-z0-9]+", "-", h.get_text(strip=True).lower()).strip("-")
        if not base:
            base = "sec"
        slug = base
        n = 2
        while slug in used:
            slug = f"{base}-{n}"; n += 1
        used.add(slug)
        h["id"] = slug

    return str(soup), title


# ============ TEMPLATE ============
# Icon emoji cho mỗi chương (trợ lực trực quan trong sidebar)
CHAPTER_ICON = {
    "introduction": "👋",
    "interface-gestures": "🖐️",
    "gallery": "🖼️",
    "colors": "🎨",
    "brushes": "🖌️",
    "layers": "🗂️",
    "text": "🔤",
    "guides": "📐",
    "animation": "🎞️",
    "page-assist": "📄",
    "3d-painting": "🧊",
    "actions": "⚙️",
    "selections": "✂️",
    "transform": "🔀",
    "adjustments": "🎛️",
}


def build_sidebar(active_chapter, active_slug):
    """HTML sidebar menu. summary = tieu de chuong (chi mo/dong), link nam trong sub-list."""
    items = []
    # Link trang chu
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
        # summary: chi la tieu de chuong (click mo/dong), khong chua link
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


PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — Procreate Handbook (tiếng Việt)</title>
<link rel="stylesheet" href="../assets/style.css">
</head>
<body>
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
      <button class="menu-toggle" id="menuToggle" aria-label="Mở menu">☰</button>
      <div class="breadcrumb">{crumb}</div>
      <button class="theme-toggle" id="themeToggle" aria-label="Đổi giao diện">🌓</button>
    </header>
    <main class="content">
      <article>
        <p class="lang-note">📖 Nội dung bên dưới là bản gốc tiếng Anh (chưa dịch). Ảnh đã cache offline.</p>
        <h1>{title}</h1>
{content}
      </article>
      <nav class="pager">
{pager}
      </nav>
    </main>
  </div>
</div>
<button class="to-top" id="toTop" aria-label="Lên đầu trang" title="Lên đầu trang">↑</button>
<script src="../assets/app.js"></script>
</body>
</html>
"""


def build_pager(chapter, slug):
    """Trang truoc / sau trong cung chuong (neu co)."""
    subs = chapters[chapter]["pages"]
    idx = next((i for i, p in enumerate(subs) if p["slug"] == slug), 0)
    prev = subs[idx - 1] if idx > 0 else None
    nxt = subs[idx + 1] if idx < len(subs) - 1 else None
    parts = []
    if prev:
        href = slug_to_file(chapter, prev["slug"])
        parts.append(f'<a class="pager-prev" href="{href}">← {prev["title"]}</a>')
    else:
        parts.append('<span class="pager-prev muted">←</span>')
    parts.append(f'<span class="pager-title">{chapters[chapter]["vi_title"]}</span>')
    if nxt:
        href = slug_to_file(chapter, nxt["slug"])
        parts.append(f'<a class="pager-next" href="{href}">{nxt["title"]} →</a>')
    else:
        parts.append('<span class="pager-next muted">→</span>')
    return "\n      ".join(parts)


def build_crumb(chapter, slug):
    """Breadcrumb: Trang chu > Chương > Trang."""
    vi = chapters[chapter]["vi_title"]
    title = next((p["title"] for p in chapters[chapter]["pages"] if p["slug"] == slug), "")
    label = title if slug else "Tổng quan"
    return (f'<a href="../index.html">Handbook</a> '
            f'<span class="sep">›</span> '
            f'<a href="../{chapter}/index.html">{vi}</a> '
            f'<span class="sep">›</span> '
            f'<span class="crumb-current">{label}</span>')


def main():
    ok = 0
    fail = []
    for p in manifest["pages"]:
        if p["status"] not in ("ok", "cached"):
            continue
        src = os.path.join(ROOT, p["file"])
        if not os.path.exists(src):
            fail.append((p["file"], "source missing")); continue
        txt = open(src, encoding="utf-8", errors="replace").read()
        content_html, title = clean_main_content(txt)
        if not title:
            title = p["title"]

        chapter = p["chapter"]
        slug = p["slug"]
        sidebar = build_sidebar(chapter, slug)
        pager = build_pager(chapter, slug)
        crumb = build_crumb(chapter, slug)

        out_html = PAGE_TEMPLATE.format(
            title=title, sidebar=sidebar, content=content_html, pager=pager, crumb=crumb
        )
        out_path = os.path.join(PHB, p["file"])
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        open(out_path, "w", encoding="utf-8").write(out_html)
        ok += 1
    print(f"Sinh {ok} trang. Fail: {len(fail)}")
    for f, r in fail:
        print("  ", f, r)


if __name__ == "__main__":
    main()
