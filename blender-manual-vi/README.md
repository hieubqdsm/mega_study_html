# Blender Manual — Bản dịch tiếng Việt

Bản dịch tiếng Việt **toàn bộ** Blender User Manual (snapshot ngày 29/09/2026, tương ứng Blender 5.3 dev), clone y hệt site chính thức `docs.blender.org/manual/en/latest/` và chạy offline hoàn toàn.

## Cách xem

```bash
cd blender-manual-vi
python -m http.server 8000
# mở http://localhost:8000/html/index.html
```

Hoặc mở trực tiếp `html/index.html` — Sphinx/furo sinh HTML tĩnh, hầu hết chức năng (điều hướng, ảnh) chạy được qua `file://`; **tìm kiếm** cần chạy qua HTTP server như trên.

## Số liệu

| Hạng mục | Giá trị |
|---|---|
| Trang HTML | 2.418 |
| Ảnh gốc (Git LFS, đã xác minh sha256) | 3.175 |
| Entry dịch (gettext) | 72.167 / 72.187 (99,97%) |
| File .po | 2.416 (61 batch, validator PASS 100%) |
| Theme | furo (đúng theme site chính thức) |
| Dung lượng | ~354MB (đã dedupe menu sidebar — mỗi trang chỉ giữ loader nhỏ, cây menu dùng chung 1 file `_static/sidebar_tree.js`) |
| Nguồn | projects.blender.org/blender/blender-manual @ main |

**Ghi chú kỹ thuật sidebar:** furo nhúng nguyên cây mục lục (~430KB) vào mỗi trang — bản chính thức nén gzip khi truyền, còn bản offline sẽ tốn 1.4GB nếu giữ nguyên. Script `work/slim_nav.py` tách cây menu thành 1 file JS chung + loader 1KB mỗi trang, tái tạo đúng trạng thái furo (highlight trang hiện tại, tự mở nhánh chứa trang đó, link rewrite theo độ sâu). Đã đối chiếu hành vi khớp 100% với bản build gốc.

20 entry chưa điền là số/ký hiệu thuần (giống hệt ở cả hai ngôn ngữ, fallback tự động về tiếng Anh).

## Nguyên tắc dịch

- Thuật ngữ kỹ thuật Blender **giữ tiếng Anh** (mesh, vertex, modifier, shader, keyframe, render…) theo thông lệ cộng đồng Blender Việt; tên menu/nút/panel giữ nguyên.
- Câu văn dịch tự nhiên; mọi token RST (`:ref:`, `:kbd:`, `:menuselection:`…), placeholder, code block bảo toàn 100% — có [validator](work/po_check.py) kiểm tra tự động sau mỗi file.
- Giấy phép: tài liệu gốc Blender Manual thuộc Blender Foundation, phát hành dưới giấy phép mở (CC-BY-SA); bản dịch này kế thừa theo đúng điều khoản Share-Alike.

## Cấu trúc thư mục

```
blender-manual-vi/
├── index.html          # landing → html/index.html
├── html/               # SITE TIẾNG VIỆT (sản phẩm chính — mở cái này)
└── work/               # hạ tầng build + dịch (không cần khi xem)
    ├── blender-manual/ # repo nguồn (rst + ảnh + locale/vi/*.po)
    ├── .venv/          # sphinx 9.1 + furo
    ├── build/en_html/  # bản English đối chiếu
    ├── batches/        # 61 batch dịch
    ├── TRANSLATION_GUIDE.md  # style guide dịch
    ├── po_check.py     # validator
    ├── build_vi.py     # lệnh build lại bản VI
    └── progress.py     # đo tiến độ dịch
```

## Build lại / cập nhật

```bash
cd work
# sau khi sửa bất kỳ file .po nào trong work/blender-manual/locale/vi/
python build_vi.py
```

Để lấy bản manual mới hơn từ Blender: tải lại zip từ projects.blender.org (qua trình duyệt vì Cloudflare), resolve LFS bằng work-flow trong lịch sử session, rồi `sphinx-build -b gettext` + msgmerge các .po hiện có.
