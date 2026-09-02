import re, io, os, sys

ROOT = "D:/CODE/mega_study_html/ableton-live-vi"
chap_file = ROOT + "/_ch_vi.html"
toc_label = sys.argv[1]      # ví dụ: "12. Audio Clips, Tempo & Warping"
anchor = sys.argv[2]         # ví dụ: "ch-warping"

chap = io.open(chap_file, encoding="utf-8").read()
# kiểm ký tự CJK / cyrillic lẫn vào
bad = re.findall(r"[\u4e00-\u9fff\u3040-\u30ff\u0400-\u04ff\uac00-\ud7af]", chap)
assert not bad, f"ký tự lạ: {bad[:10]}"

s = io.open(ROOT + "/index.html", encoding="utf-8").read()
assert anchor in chap
assert f'"{anchor}"' not in s.split("</article>")[0] or anchor not in s
s = s.replace("</article>", chap + "\n</article>")

# thêm vào TOC đúng theo thứ tự số
entries = list(re.finditer(r'<a href="#(ch-[a-z-]+)">(\d+)\. ([^<]+)</a>', s))
num = int(toc_label.split(".")[0])
pos = None
for e in entries:
    if int(e.group(2)) > num:
        pos = e.start()
        break
ins = f'<a href="#{anchor}">{toc_label}</a>\n    '
if pos is None:
    last = entries[-1]
    s = s[:last.end()] + "\n    " + ins.strip() + s[last.end():]
else:
    s = s[:pos] + ins + s[pos:]

io.open(ROOT + "/index.html", "w", encoding="utf-8", newline="").write(s)

# verify ảnh
body = chap
imgs = sorted(set(re.findall(r'src="images/([^"]+)"', body)))
miss = [f for f in imgs if not os.path.exists(ROOT + "/images/" + f)]
print("chèn OK:", anchor, "| ảnh:", len(imgs), "| thiếu:", miss if miss else "không", "| TOC:", toc_label)
