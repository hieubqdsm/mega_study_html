# Unity 6.5 Manual — mirror offline toàn cây (chuẩn bị việt hoá)

Mirror **cục bộ toàn bộ** Unity 6.5 User Manual:
<https://docs.unity3d.com/Manual/index.html>

Mục tiêu: tải trọn UI / nội dung / hình ảnh / CSS / JS / cây sidebar mục lục
của **toàn bộ 3.534 trang** về máy, mở offline nhìn giống hệt bản gốc, làm
nền tảng cho việc **việt hoá** ở giai đoạn sau (text vẫn nguyên tiếng Anh).

## Con số

| | |
|---|---|
| Trang HTML | **3.534** (toàn bộ cây ToC) |
| Ảnh nội dung | **2.244** |
| Thư mục trang | 71 (cấu trúc subdir như site gốc) |
| Tổng dung lượng | **~335 MB** (5.831 file) |
| Trang thiếu | 1 (`urp/2d-pixelperfect` — redirect loop trên chính site Unity) |

## Cách xem

Mirror dùng **đường dẫn tương đối** toàn bộ (không còn link tuyệt đối nào),
nên chạy được trên **GitHub Pages / static host ở subpath** mà không cần server.

**GitHub Pages:** push cả thư mục `unity-manual-vi/` lên repo, link từ `index.html`
gốc repo tới `game-dev/unity-manual-vi/Manual/index.html` là mở được ngay.

**Xem local (tuỳ chọn):**

```bash
cd mega_study_html          # serve từ REPO ROOT để giả lập subpath github pages
python -m http.server 8765 --bind 127.0.0.1
# → http://127.0.0.1:8765/game-dev/unity-manual-vi/Manual/index.html
```

Hoặc double-click `Manual/index.html` để mở qua `file://` (cũng chạy, vì mọi path
đều relative).

## Cấu trúc

```
unity-manual-vi/
├── Manual/                          ← 3.534 trang, cấu trúc subdir y hệt site gốc
│   ├── index.html                   ← trang chủ (rewrite tay, individual)
│   ├── docdata/toc.js               ← dữ liệu sidebar mục lục
│   ├── PhysicsSection.html          ← trang phẳng (depth 1)
│   ├── 2d-physics/collider/...       ← trang lồng sâu (depth 3-4)
│   └── urp/, accessibility/, best-practice-guides/, ...
├── StaticFilesManual/               ← CSS, JS, font icon, ảnh UI (dùng chung)
├── StaticFilesConfig/               ← UnityVersionsInfo.js, feedback.js
├── uploads/Main/                    ← 2.244 ảnh nội dung (gồm subdir bpg/uitk/, ...)
├── index.original.html              ← HTML gốc trang chủ (y nguyên, chưa sửa)
└── _tools/                          ← script crawl/rewrite/verify
```

## Đã làm gì với mỗi trang

Áp dụng cùng 5 phép rewrite cho **mọi trang** (`_tools/05-crawl-pages.js`,
hàm `rewritePage`, depth-aware theo cấp thư mục):

1. Bỏ `<base href="/Manual/...">` (path tuyệt đối, mở offline sẽ resolve sai).
2. Đổi asset path tuyệt đối `/StaticFiles*/...` → `../`×depth (số cấp phụ
   thuộc thư mục chứa trang: trang ở `a/b/c.html` cần `../../../`).
3. Rewrite favicon cross-origin `unity.com/...` → favicon local.
4. Strip cache-bust query `?ts=...` (trên filesystem `core.css?ts=` là tên
   file khác, không tìm được).
5. Bỏ OneTrust cookie-consent stub (CDN ngoài, synchronous blocking, khi
   offline làm treo cả trang).

Nội dung text + ảnh vẫn **nguyên tiếng Anh**, y hệt bản gốc.

## Các script (`_tools/`)

| Script | Chức năng |
|---|---|
| `01-list-assets.js` | Parse HTML trang chủ, sinh `manifest.json` (resolve có tính `<base>`) |
| `02-download.js` | Tải asset trang chủ + parse CSS tìm `url()` tải tiếp font/ảnh nền |
| `03-rewrite-html.js` | Rewrite riêng trang chủ |
| `04-verify.js` | Verify asset reference trang chủ resolve tới file local |
| `05-crawl-pages.js` | **Crawl toàn cây**: tải 3.537 trang theo `page-list.json`, gom và tải 2.256 ảnh unique, rewrite tất cả (depth-aware). Idempotent — chạy lại chỉ fetch thiếu |
| `06-fix-subpath-links.js` | Sửa link cho host subpath (GitHub Pages): `<a href="/Manual/...">` → relative, `<a href="/cn\|ja\|kr/...">` → live Unity |
| `07-convert-webp.mjs` | Convert PNG/JPG → WebP (PNG q85, JPG q82, có size guard). Giữ favicon + JPG không nhỏ hơn |
| `08-rewrite-img-refs.mjs` | Rewrite ref `.png/.jpg → .webp` trong HTML + CSS (chỉ ref thực sự đã convert) |
| `09-verify-img-refs.mjs` | Verify mọi image ref resolve tới file tồn tại |
| `10-optimize-gif.mjs` | Tối ưu GIF lossy in-place bằng gifsicle (--lossy=120 --colors=256) |
| `smoke-test.mjs` | Test logic rewrite trên 3 trang đại diện |

## Tối ưu ảnh (đã làm)

Ảnh đã được nén để gọn cho GitHub Pages (277 MB → 71 MB, **-73%**):

- **PNG → WebP q85** (giữ alpha): 184 MB → 39 MB.
- **JPG → WebP q82** (có guard, chỉ thay khi nhỏ hơn): ~34 MB → gộp vào 39 MB WebP.
- **GIF → gifsicle --lossy=120 --colors=256** (giữ định dạng `.gif`): 51 MB → 23 MB.
- Giữ nguyên: favicon (PNG, browser cần), SVG, vài JPG nhỏ webp không nhỏ hơn.

Text trong ảnh screenshot vẫn rõ ở q85 (đã verify thị giác). Phần mềm cần:
`sharp` + `gifsicle` (cả hai cài qua `npm install` trong `_tools/`, đã gitignore `node_modules/`).

`page-list.json` sinh từ `docdata/toc.js` (parse cây mục lục). Chạy lại toàn bộ:

```bash
node _tools/05-crawl-pages.js     # tải + rewrite toàn cây (bỏ qua file đã có)
```

## Đã biết (không phải lỗi)

- **Widget feedback đã neutralize** — `StaticFilesConfig/feedback/feedback.js`
  được thay bằng no-op (bản gốc giữ `feedback.js.original`). Lý do: widget
  "đánh giá trang" post về backend Unity (không chạy được trên static host) và
  inject asset bằng root-absolute URL gây 404 trên subpath.
- **`urp/2d-pixelperfect.html` thiếu** — trên site Unity là **redirect loop**
  (`2d-pixelperfect.html` ↔ `2d-pixelperfect-intro.html` chuyển hướng qua lại
  mãi). Mở bằng browser cũng lỗi `ERR_TOO_MANY_REDIRECTS`. Nội dung thật nằm
  ở các trang anh em (`-prep-sprites`, `-configure`, `-ref`) đều đã tải.
- **3 trang 404** — link legacy trong ToC trỏ tới trang đã gỡ (site gốc cũng 404).
- `Manual/docdata/global_toc.js` — 404 trên chính site gốc (legacy), vô hại.
- Google Fonts (Roboto) tải online khi có mạng; offline rớt về font sans-serif
  hệ thống. Muốn pixel-perfect thì tải thêm Roboto về local.
- `StaticFilesManual/css/fonts/UnityIcons.woff` 404 nhưng `icons.css` có khai
  báo `@font-face` đầu dùng path đúng (đã tải) → icon vẫn hiển thị.

## Đã verify

- **Tĩnh**: trang chủ 43/43 asset resolve tới file local.
- **Thị giác trang chủ**: header + search + sidebar ToC đầy đủ, 4 thẻ highlights,
  ảnh nền render.
- **Thị giác trang con phẳng** (`PhysicsSection.html`): sidebar tự expand đúng
  section đang xem, nội dung + điều hướng next/prev hoạt động.
- **Thị giác trang lồng sâu 3 cấp** (`best-practice-guides/.../layouts.html`):
  **20 ảnh, 0 hỏng** — các path `../../../uploads/...` resolve đúng.

## Chưa làm (giai đoạn sau)

- [ ] Việt hoá text (3.534 trang + sidebar ToC).
- [ ] Overlay/thay ảnh có chữ Anh (nếu cần).
