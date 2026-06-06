# 📚 Mega Study — Thư Viện Tài Liệu Học Tập

Bộ sưu tập tài liệu &amp; khóa học tự học, đóng gói dưới dạng **trang HTML tĩnh tương tác** — mở trực tiếp trên trình duyệt, không cần cài đặt. Một số khóa có tính năng **chạy code trực tiếp** trong trình duyệt và **bài tập tự chấm**.

> 🏠 **Trang chủ:** mở [`index.html`](index.html) để xem toàn bộ thư viện.

---

## 🎓 Khóa học nổi bật

### 🐍 Khóa Học Python — Từ Newbie Đến Early Senior
Lộ trình Python toàn diện theo 4 cấp độ năng lực + chuyên đề Data/AI.
- **37 chương** · 4 cấp độ (Newbie → Junior → Mid → Early Senior)
- Chuyên đề **Data/ML & Agentic AI** (agent loop, tool calling, RAG, MCP, multi-agent)
- **Chạy code Python trực tiếp** trong trình duyệt (Pyodide/WebAssembly)
- 38 flashcards · ngân hàng bài tập · **3 đề thi mô phỏng phỏng vấn** (Junior/Mid/Senior) · rubric chấm điểm
- 📂 [`classic_course/khoa-hoc-python.html`](classic_course/khoa-hoc-python.html) · [bản Markdown](classic_course/khoa-hoc-python.md)

### 🔤 Khóa Học Regex — Từ Căn Bản Đến Nâng Cao
Làm chủ biểu thức chính quy với công cụ thực hành ngay.
- 3 phần: Căn bản → Trung cấp → Nâng cao
- **Regex Playground** — kiểm thử pattern trực tiếp, highlight match theo thời gian thực
- **Bài tập tại chỗ tự chấm** — gõ pattern, bấm kiểm tra, máy chấm theo test case
- 📂 [`classic_course/khoa-hoc-regex.html`](classic_course/khoa-hoc-regex.html) · [bản Markdown](classic_course/khoa-hoc-regex.md)

---

## 🗂️ Cấu trúc thư mục

```
mega_study_html/
├── index.html                    # 🏠 Trang chủ tổng hợp
├── README.md                     # File này
│
├── classic_course/               # Bộ khóa học bài bản (HTML + Markdown)
│   ├── index.html                # Mục lục bộ classic_course
│   ├── INDEX.md
│   ├── khoa-hoc-python.html/.md  # 🐍 Python (interactive)
│   ├── khoa-hoc-regex.html/.md   # 🔤 Regex (interactive)
│   ├── khoa-hoc-in-3d.*          # In 3D
│   ├── khoa-hoc-game-design.*    # Game Design
│   ├── khoa-hoc-tester-qa.*      # Tester / QA
│   └── ...                       # các khóa khác
│
├── claude-course/                # Chuyên đề Claude & ứng dụng AI
│   └── index.html, foundations.html, coding.html, ...
│
└── *.html                        # Tài liệu chuyên đề rời:
    ├── aec-domain-knowledge.html       # Kiến thức ngành AEC
    ├── autocad-lsp-dictionary_v2.html  # Từ điển LSP AutoCAD
    ├── security-glossary.html          # Từ điển Bảo mật
    ├── unity_glossary.html             # Unity RPG Glossary
    ├── godot-hackslash-rpg-guide.html  # Godot 4 RPG
    ├── lo-trinh-hoc-ve.html            # Lộ trình học vẽ
    ├── procreate-guide.html            # Thuật ngữ Procreate
    └── tu-dien-nhac-ly.html            # Nhạc lý Piano & Violin
```

---

## 🚀 Cách dùng

### Cách 1 — Mở trực tiếp (đơn giản nhất)
Double-click bất kỳ file `.html` để mở trên trình duyệt. Đủ cho hầu hết tài liệu.

### Cách 2 — Chạy qua máy chủ tĩnh (khuyến nghị cho khóa có "chạy code")
Một số trình duyệt **chặn tải tài nguyên ngoài** (như Pyodide của khóa Python) khi mở bằng `file://`. Nếu nút **▶ Run** trong khóa Python không hoạt động, hãy chạy một máy chủ tĩnh:

```bash
# Tại thư mục gốc mega_study_html/
python -m http.server 8000
```

Rồi mở trình duyệt tới: **http://localhost:8000** → trang chủ hiện ra, mọi tính năng tương tác hoạt động đầy đủ.

> 💡 Khóa **Regex** dùng RegExp gốc của trình duyệt (JavaScript) nên **chạy được ngay cả khi mở bằng `file://`** — không cần internet hay máy chủ.

---

## ✨ Tính năng tương tác theo khóa

| Khóa | Chạy code | Bài tập tự chấm | Khác |
|------|-----------|-----------------|------|
| 🐍 Python | ✅ Pyodide (cần internet/server) | đáp án ẩn | quiz, flashcards, đề thi, rubric |
| 🔤 Regex | ✅ RegExp trình duyệt (offline) | ✅ tự chấm theo test case | playground, thư viện pattern, cheatsheet |
| Khác | — | — | tra cứu, lộ trình |

---

## 📝 Ghi chú

- Tất cả là **HTML tĩnh** — không backend, không build step, không phụ thuộc cài đặt.
- Mỗi khóa trong `classic_course/` có **2 bản**: HTML (giao diện tương tác) và Markdown (đọc trên editor/GitHub).
- Nội dung bằng **tiếng Việt**.

*Cập nhật: 2026-06-06*
