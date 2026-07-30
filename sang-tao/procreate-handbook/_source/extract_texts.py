#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extract tat ca text segments (p/h2/h3/li) tu _source -> translations.json
Format: { "text_goc_normalize": { "vi": "ban_dich", "tag": "p|h2|h3|li" } }
Bo POI heading (data-number), bo text da la tieng Viet, bo text ngan <8 ky tu.
Chi ghi key voi vi = "" (chua dich) de lan sau dien.
"""
import os
import re
import json

ROOT = os.path.dirname(os.path.abspath(__file__))  # _source/
PHB = os.path.dirname(ROOT)
OUT = os.path.join(PHB, "_source", "translations.json")

segments = {}  # text_norm -> {"count", "tags"}
for r, d, fs in os.walk(ROOT):
    if "__pycache__" in r:
        continue
    for f in fs:
        if not f.endswith(".html"):
            continue
        s = open(os.path.join(r, f), encoding="utf-8", errors="replace").read()
        # CHI lay noi dung tu <h1> den </main> (bo sidebar/TOC/UI text)
        h1 = s.find("<h1")
        me = s.rfind("</main>")
        if h1 == -1 or me == -1 or me < h1:
            continue
        content = s[h1:me]
        for m in re.finditer(r"<(p|h2|h3|li)([^>]*)>(.*?)</\1>", content, re.S):
            tag, attrs, inner = m.group(1), m.group(2), m.group(3)
            if "data-number" in attrs:
                continue
            txt = re.sub(r"<[^>]+>", "", inner)
            txt = re.sub(r"\s+", " ", txt).strip()
            if len(txt) < 8:
                continue
            # bo text UI (Skip to Content, Community, Talk to the team...)
            ui_kw = ["skip to content", "talk to the team", "community", "search community",
                     "table of contents", "procreate.com", "choose language", "still have questions"]
            if any(k in txt.lower()[:50] for k in ui_kw):
                continue
            # bo text da tieng Viet
            if re.search(r"[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]", txt) and not re.search(r"\b(the|and|with|your|this|that|from|using|when|you|tap|drag)\b", txt, re.I):
                continue
            if not re.search(r"[a-zA-Z]{3,}", txt):
                continue
            if txt not in segments:
                segments[txt] = {"count": 0, "tags": set()}
            segments[txt]["count"] += 1
            segments[txt]["tags"].add(tag)

# Ghi JSON: key -> {"vi": "", "tags": [...], "count": n}
out = {}
for txt, info in segments.items():
    out[txt] = {"vi": "", "tags": sorted(info["tags"]), "count": info["count"]}

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

print(f"Extract xong: {len(out)} segments unique -> {OUT}")
# thong ke theo tag
from collections import Counter
tagc = Counter()
for info in out.values():
    for t in info["tags"]:
        tagc[t] += 1
print("Theo tag:", dict(tagc))
