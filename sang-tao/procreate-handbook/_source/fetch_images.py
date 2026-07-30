#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Boc toan bo anh tu 104 trang HTML goc va tai ve assets/img/ (full-res).
Quy tac full-res:
  - cdn.sanity.io: bo tat ca query (?...) de lay anh goc (kich thuoc goc ghi trong filename).
  - assets.procreate.art, cloudfront: lay nguyen URL.
Chi tai icon/cloudfront 1 lan (de-dupe), bo qua file .js/.css (khong phai anh).
"""
import os
import re
import html
import json
import time
import hashlib
import subprocess

ROOT = os.path.dirname(os.path.abspath(__file__))            # _source/
PHB = os.path.dirname(ROOT)                                   # procreate-handbook/
IMG_DIR = os.path.join(PHB, "assets", "img")
ICON_DIR = os.path.join(PHB, "assets", "icons")
os.makedirs(IMG_DIR, exist_ok=True)
os.makedirs(ICON_DIR, exist_ok=True)

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"

# Doc manifest
with open(os.path.join(ROOT, "_manifest.json"), encoding="utf-8") as f:
    manifest = json.load(f)

IMG_EXT_RE = re.compile(r"\.(png|jpe?g|webp|gif|svg)$", re.I)


def full_res_url(url):
    """Tao URL full-res tu URL lazy/srcset."""
    url = html.unescape(url)
    # sanity: bo query
    if "cdn.sanity.io" in url:
        return url.split("?")[0]
    return url


def local_relpath(url):
    """Tra (abs_dest, rel_from_phb) dua tren url. De-dupe theo hash url."""
    # Phan biet icon vs image
    parsed_path = url.split("?")[0]
    base = os.path.basename(parsed_path)
    if not IMG_EXT_RE.search(base):
        return None, None  # bo qua .js/.css
    # Icon (cloudfront icons) -> icons/
    if "cloudfront.net" in url and "/icons/" in url:
        dest = os.path.join(ICON_DIR, base)
        rel = "assets/icons/" + base
    else:
        # them prefix hash nho de tranh trung ten giua cac nguon
        h = hashlib.md5(url.encode()).hexdigest()[:6]
        name, ext = os.path.splitext(base)
        dest = os.path.join(IMG_DIR, f"{name}_{h}{ext}")
        rel = "assets/img/" + f"{name}_{h}{ext}"
    return dest, rel


def extract_image_urls(html_text):
    """Lay tat ca url anh: data-src, src, data-srcset, srcset (lay moi variant)."""
    urls = []
    # data-src / src (1 url)
    for m in re.findall(r'(?:data-src|src)="(https://[^"]+)"', html_text):
        urls.append(m)
    # data-srcset / srcset (nhieu url co dau phay)
    for m in re.findall(r'(?:data-srcset|srcset)="([^"]+)"', html_text):
        for part in html.unescape(m).split(","):
            part = part.strip().split(" ")[0]
            if part.startswith("http"):
                urls.append(part)
    return [u for u in urls if IMG_EXT_RE.search(u.split("?")[0])]


def curl_download(url, dest):
    if os.path.exists(dest) and os.path.getsize(dest) > 100:
        return "cached", os.path.getsize(dest)
    tmp = dest + ".tmp"
    try:
        proc = subprocess.Popen(
            ["curl", "-sL", "-A", UA, "--compressed",
             "-H", "Referer: https://help.procreate.com/",
             "-o", tmp, "-w", "%{http_code}", url],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = proc.communicate()
        code = out.decode("utf-8", "ignore").strip()
        size = os.path.getsize(tmp) if os.path.exists(tmp) else 0
        if proc.returncode == 0 and code.startswith("2") and size > 50:
            os.replace(tmp, dest)
            return "ok" if code == "200" else code, size
        if os.path.exists(tmp):
            os.remove(tmp)
        return "fail:" + code, 0
    except Exception as e:
        return "err:" + str(e)[:60], 0


def main():
    # 1) Thu thap tat ca url unique + ghi page->urls
    all_urls = {}      # full_res_url -> dest,rel
    page_urls = {}     # rel_page -> [rel_img,...]
    for p in manifest["pages"]:
        if p["status"] not in ("ok", "cached"):
            continue
        src = os.path.join(ROOT, p["file"])
        if not os.path.exists(src):
            continue
        txt = open(src, encoding="utf-8", errors="replace").read()
        rels = []
        for u in extract_image_urls(txt):
            fu = full_res_url(u)
            if fu not in all_urls:
                dest, rel = local_relpath(fu)
                if dest is None:
                    continue
                all_urls[fu] = (dest, rel)
            rels.append(fu)
        page_urls[p["file"]] = rels
    print(f"Tong url anh unique: {len(all_urls)}")

    # 2) Tai ve
    ok = 0
    fail = []
    img_map = {}   # full_res_url -> rel
    for i, (url, (dest, rel)) in enumerate(sorted(all_urls.items()), 1):
        status, size = curl_download(url, dest)
        if status in ("ok", "cached"):
            ok += 1
            img_map[url] = rel
        else:
            fail.append({"url": url, "status": status})
        if i % 25 == 0 or i == len(all_urls):
            print(f"[{i}/{len(all_urls)}] ok={ok} fail={len(fail)}")
        time.sleep(0.05)

    # 3) Ghi image map (URL goc -> rel path) va page map
    with open(os.path.join(PHB, "assets", "_image-map.json"), "w", encoding="utf-8") as f:
        json.dump({"url_to_local": img_map,
                   "total_unique": len(all_urls),
                   "ok": ok, "fail": len(fail)}, f, ensure_ascii=False, indent=2)
    with open(os.path.join(PHB, "assets", "_page-images.json"), "w", encoding="utf-8") as f:
        json.dump({pg: urls for pg, urls in page_urls.items()}, f, ensure_ascii=False, indent=2)

    print(f"\n=== DONE: {ok}/{len(all_urls)} anh OK, {len(fail)} fail ===")
    if fail:
        for x in fail[:20]:
            print("  FAIL", x["status"], x["url"])


if __name__ == "__main__":
    main()
