#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fetch tat ca 104 trang HTML goc cua Procreate Handbook ve _source/."""
import os
import sys
import json
import time
import subprocess

BASE = "https://help.procreate.com"
ROOT = os.path.dirname(os.path.abspath(__file__))  # _source/

# Manifest: chapter -> list of (slug, title)
# slug '' = trang root (Overview) cua chapter, luu vao index.html trong thu muc chapter
HANDBOOK = [
    ("introduction", "Giới thiệu", [("", "Introduction")]),
    ("interface-gestures", "Giao diện & Cử chỉ", [
        ("", "Overview"), ("interface", "Interface"), ("gestures", "Gestures"),
        ("accessibility", "Accessibility"), ("pencil", "Apple Pencil"),
        ("keyboard", "Keyboard Shortcuts"), ("copypaste", "Copy Paste Menu"),
        ("quickmenu", "QuickMenu"), ("widgets", "Widgets"),
    ]),
    ("gallery", "Thư viện ảnh", [
        ("", "Overview"), ("gallery-create", "Create"), ("gallery-preview", "Preview"),
        ("gallery-organize", "Organize"), ("gallery-import-share", "Import and Share"),
        ("gallery-file-types", "File Types"),
    ]),
    ("colors", "Màu sắc", [
        ("", "Overview"), ("colors-interface", "Interface"), ("colors-disc", "Disc"),
        ("colors-classic", "Classic"), ("colors-harmony", "Harmony"),
        ("colors-value", "Value"), ("colors-palettes", "Palettes"),
        ("colors-profiles", "Profiles"),
    ]),
    ("brushes", "Cọ vẽ", [
        ("", "Overview"), ("paint-smudge-erase", "Paint, Smudge, and Erase"),
        ("brush-library", "Brush Libraries"), ("brush-studio", "Brush Studio"),
        ("brush-studio-settings", "Brush Studio Settings"), ("dual-brush", "Dual Brush"),
        ("brushes-share", "Import and Share"),
    ]),
    ("layers", "Lớp", [
        ("", "Overview"), ("layers-interface", "Interface"), ("layers-create", "Create"),
        ("layers-organize", "Organize"), ("layers-options", "Options"),
        ("layers-blend", "Blend Modes"), ("layers-mask", "Mask"),
        ("layers-share", "Share"),
    ]),
    ("text", "Văn bản", [
        ("", "Overview"), ("text-interface", "Interface and Basics"),
        ("text-edit", "Edit Style"), ("text-fonts", "Fonts"),
    ]),
    ("guides", "Đường dẫn & Trợ giúp vẽ", [
        ("", "Overview"), ("guide-create", "Create"), ("guides-2D", "2D Grid"),
        ("guides-isometric", "Isometric Guide"), ("guides-perspective", "Perspective Guide"),
        ("guides-symmetry", "Symmetry Guide"), ("guides-drawing-assist", "Drawing Assist"),
        ("quickshape", "QuickShape"),
    ]),
    ("animation", "Hoạt hình", [
        ("", "Overview"), ("animation-interface", "Interface and Basics"),
        ("animation-options", "Options"), ("animation-settings", "Settings"),
        ("animation-share", "Share"),
    ]),
    ("page-assist", "Trợ lý trang", [
        ("", "Overview"), ("interface", "Interface"), ("options", "Options"),
        ("organize", "Organize"),
    ]),
    ("3d-painting", "Vẽ 3D", [
        ("", "Overview"), ("import", "Import"), ("basics", "Basics"),
        ("interface-gestures", "Interface & Gestures"), ("layers", "Layers"),
        ("transform", "Transform"), ("lighting-studio", "Lighting Studio"),
        ("share", "Share"),
    ]),
    ("actions", "Hành động", [
        ("", "Overview"), ("actions-interface", "Interface"), ("actions-add", "Add"),
        ("actions-canvas", "Canvas"), ("actions-share", "Share"), ("3d", "3D"),
        ("actions-video", "Video"), ("actions-preferences", "Preferences"),
        ("actions-help", "Help"),
    ]),
    ("selections", "Vùng chọn", [
        ("", "Overview"), ("selections-interface", "Interface and Gestures"),
        ("selections-automatic", "Automatic"), ("selections-freehand", "Freehand"),
        ("selections-shape", "Rectangle and Ellipse"), ("selections-advanced", "Advanced"),
        ("selections-settings", "Settings"),
    ]),
    ("transform", "Biến đổi", [
        ("", "Overview"), ("transform-interface-gestures", "Interface and Gestures"),
        ("transform-freeform", "Freeform"), ("transform-uniform", "Uniform"),
        ("transform-distort", "Distort"), ("transform-warp", "Warp"),
        ("snapping", "Snapping"), ("transform-interpolate", "Interpolation"),
    ]),
    ("adjustments", "Điều chỉnh", [
        ("", "Overview"), ("adjustments-interface", "Interface & Gestures"),
        ("adjustments-color", "Color Adjustments"), ("adjustments-blur", "Blur"),
        ("adjustments-noise", "Noise"), ("adjustments-sharpen", "Sharpen"),
        ("bloom", "Bloom"), ("adjustments-glitch", "Glitch"), ("halftone", "Halftone"),
        ("chromatic-aberration", "Chromatic Aberration"), ("adjustments-liquify", "Liquify"),
        ("adjustments-clone", "Clone"),
    ]),
]

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"


def build_url(chapter, slug):
    if slug == "":
        return f"{BASE}/procreate/handbook/{chapter}"
    return f"{BASE}/procreate/handbook/{chapter}/{slug}"


def local_path(chapter, slug):
    """Duong dan luu local: _source/<chapter>/<slug|index>.html"""
    d = os.path.join(ROOT, chapter)
    os.makedirs(d, exist_ok=True)
    name = (slug + ".html") if slug else "index.html"
    return os.path.join(d, name)


def fetch_one(url, dest):
    """Dung curl de fetch. Tra (ok, http_code, size, err)."""
    tmp = dest + ".tmp"
    try:
        proc = subprocess.Popen(
            ["curl", "-sL", "-A", UA, "--compressed",
             "-H", "Accept: text/html,application/xhtml+xml",
             "-o", tmp, "-w", "%{http_code}", url],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = proc.communicate()
        http_code = out.decode("utf-8", "ignore").strip()
        size = os.path.getsize(tmp) if os.path.exists(tmp) else 0
        ok = proc.returncode == 0 and http_code.startswith("2") and size > 1000
        if ok:
            os.replace(tmp, dest)
        else:
            if os.path.exists(tmp):
                os.remove(tmp)
        return (ok, http_code, size, err.decode("utf-8", "ignore")[:200] if err else "")
    except Exception as e:
        return (False, 0, 0, str(e))


def main():
    manifest = []
    total = 0
    ok_count = 0
    fail = []
    for chapter, vi_title, subs in HANDBOOK:
        for slug, title in subs:
            total += 1
            url = build_url(chapter, slug)
            dest = local_path(chapter, slug)
            rel = os.path.relpath(dest, ROOT).replace("\\", "/")
            if os.path.exists(dest) and os.path.getsize(dest) > 1000:
                # Da fetch roi, skip
                ok_count += 1
                manifest.append({"chapter": chapter, "vi_title": vi_title,
                                 "slug": slug, "title": title, "url": url,
                                 "file": rel, "status": "cached", "size": os.path.getsize(dest)})
                continue
            res, code, size, err = fetch_one(url, dest)
            status = "ok" if res else "fail"
            if res:
                ok_count += 1
            else:
                fail.append({"url": url, "http_code": code, "size": size, "err": err})
            manifest.append({"chapter": chapter, "vi_title": vi_title,
                             "slug": slug, "title": title, "url": url,
                             "file": rel, "status": status, "size": size,
                             "http_code": code})
            print(f"[{total:3d}] {status:5s} {code} {size:>8d}  {url}")
            time.sleep(0.15)  # don't hammer server

    # Ghi manifest
    with open(os.path.join(ROOT, "_manifest.json"), "w", encoding="utf-8") as f:
        json.dump({"total": total, "ok": ok_count, "fail": len(fail),
                   "chapters": len(HANDBOOK), "pages": manifest, "failures": fail},
                  f, ensure_ascii=False, indent=2)
    print(f"\n=== DONE: {ok_count}/{total} ok, {len(fail)} fail ===")
    if fail:
        print("Failures:")
        for x in fail:
            print("  ", x["url"], x["http_code"])


if __name__ == "__main__":
    main()
