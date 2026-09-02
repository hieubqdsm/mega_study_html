import re, io, os, shutil, sys

ROOT = "D:/CODE/mega_study_html/ableton-live-vi"
slug = sys.argv[1]
h = io.open(ROOT + "/manual-en/" + slug + "/index.html", encoding="utf-8").read()
art = h.split("<article>", 1)[1]
art = art.split('<div class="pager">')[0]

art = re.sub(r'\sclass="[^"]*"', "", art)
art = re.sub(r'\s(sizes|data-src)="[^"]*"', "", art)
art = re.sub(r'<span class="header-section-number">[^<]*</span>\s*', "", art)
art = re.sub(r'\sdata-number="[^"]*"', "", art)
art = re.sub(r"(</(?:p|h2|h3|h4|h5|li|tr|figure|table|ul|ol|div)>)", r"\1\n", art)
art = re.sub(r"(<(?:h2|h3|h4|h5|p|li|figure|table)[ >])", r"\n\1", art)

imgs = sorted(set(re.findall(r'src="\.\./images/([^"]+)"', art)))
copied = 0
for f in imgs:
    src = ROOT + "/manual-en/images/" + f
    dst = ROOT + "/images/" + f
    if os.path.exists(src) and not os.path.exists(dst):
        shutil.copy2(src, dst)
        copied += 1

io.open(ROOT + "/_ch_clean.html", "w", encoding="utf-8").write(art)
print(slug, "| ảnh:", len(imgs), "| copy mới:", copied, "| độ dài:", len(art))
