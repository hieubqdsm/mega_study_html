#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Convert 73 screenshot PNG (2752x2064, nang) -> JPG q=82, GIU NGUYEN kich thuoc.
- PNG cử chỉ tay (Point/Left/Right/Finger) va icon: GIU NGUYEN.
- JPG content: GIU NGUYEN (da nen san).
- Sau do cap nhat _image-map.json (doi .png -> .jpg cho cac screenshot).
- Xoa PNG goc cua screenshot (da co backup).
"""
import os
import glob
import json
from PIL import Image

PHB = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # procreate-handbook/
IMG_DIR = os.path.join(PHB, "assets", "img")
QUALITY = 82

# Screenshot: PNG co "-2752x2064" trong ten (anh chup man hinh Procreate)
screenshots = glob.glob(os.path.join(IMG_DIR, "*-2752x2064*.png"))
print(f"Screenshot PNG tim thay: {len(screenshots)}")

converted = []
total_before = 0
total_after = 0
for png in screenshots:
    before = os.path.getsize(png)
    total_before += before
    jpg = png[:-4] + ".jpg"   # doi .png -> .jpg
    try:
        im = Image.open(png).convert("RGB")
        # giu nguyen kich thuoc
        im.save(jpg, "JPEG", quality=QUALITY, optimize=True)
        after = os.path.getsize(jpg)
        total_after += after
        # xoa PNG goc (da co backup)
        os.remove(png)
        converted.append((os.path.basename(png), os.path.basename(jpg)))
    except Exception as e:
        print(f"  LOI {png}: {e}")

print(f"Convert xong: {len(converted)} file")
print(f"Dung luong: {total_before//1024//1024}MB -> {total_after//1024//1024}MB "
      f"(giam {100 - total_after*100//total_before}%)")

# Cap nhat _image-map.json: doi value .png -> .jpg cho screenshot
map_path = os.path.join(PHB, "assets", "_image-map.json")
with open(map_path, encoding="utf-8") as f:
    img_map_data = json.load(f)
url_to_local = img_map_data["url_to_local"]
changed = 0
for png_name, jpg_name in converted:
    # png_name la "xxx.png", value trong map co dang "assets/img/xxx.png"
    for url, rel in list(url_to_local.items()):
        if rel.endswith(png_name):
            url_to_local[url] = rel[:-4] + ".jpg"
            changed += 1
img_map_data["url_to_local"] = url_to_local
with open(map_path, "w", encoding="utf-8") as f:
    json.dump(img_map_data, f, ensure_ascii=False, indent=2)
print(f"Cap nhat _image-map.json: {changed} entry doi .png -> .jpg")
