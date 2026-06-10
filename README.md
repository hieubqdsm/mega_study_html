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
- 📂 [`lap-trinh/khoa-hoc-python.html`](lap-trinh/khoa-hoc-python.html) · [bản Markdown](lap-trinh/khoa-hoc-python.md)

### 🔤 Khóa Học Regex — Từ Căn Bản Đến Nâng Cao
Làm chủ biểu thức chính quy với công cụ thực hành ngay.
- 3 phần: Căn bản → Trung cấp → Nâng cao
- **Regex Playground** — kiểm thử pattern trực tiếp, highlight match theo thời gian thực
- **Bài tập tại chỗ tự chấm** — gõ pattern, bấm kiểm tra, máy chấm theo test case
- 📂 [`lap-trinh/khoa-hoc-regex.html`](lap-trinh/khoa-hoc-regex.html) · [bản Markdown](lap-trinh/khoa-hoc-regex.md)

---

## 🗂️ Cấu trúc thư mục

Các khóa được gom theo **6 thư mục chủ đề** để trang chủ gọn gàng; trang chủ `index.html` có bộ lọc theo chủ đề.

```
mega_study_html/
├── index.html                    # 🏠 Trang chủ tổng hợp (lọc theo chủ đề)
├── README.md                     # File này
│
├── lap-trinh/                    # 🛠️ Lập trình & Dữ liệu (HTML + Markdown)
│   ├── khoa-hoc-python.*         # 🐍 Python (interactive)
│   ├── khoa-hoc-postgresql.*     # 🐘 PostgreSQL (chạy SQL)
│   ├── khoa-hoc-regex.*          # 🔤 Regex (interactive)
│   ├── khoa-hoc-git.*            # 🔀 Git
│   ├── khoa-hoc-design-pattern.* # ◇ Design Patterns
│   ├── khoa-hoc-odoo-framework.* · khoa-hoc-odoo-thuc-pham.*
│   └── khoa-hoc-tester-qa.*      # 🐛 Tester / QA
│
├── ai/                           # 🤖 Trí tuệ nhân tạo
│   ├── khoa-hoc-tensorflow.*     # 🔶 TensorFlow & Keras (bài tập tự chấm, HTML+MD)
│   ├── khoa-hoc-pytorch.*        # 🔥 PyTorch (bài tập tự chấm, HTML+MD)
│   ├── khoa-hoc-scikit-learn.*   # 📊 scikit-learn (ML dữ liệu bảng, HTML+MD)
│   ├── khoa-hoc-langchain.*      # 🦜 LangChain (ứng dụng LLM/RAG/agent, HTML+MD)
│   ├── khoa-hoc-llamaindex.*     # 🦙 LlamaIndex (RAG/data framework, HTML+MD)
│   ├── khoa-hoc-hugging-face.*   # 🤗 Hugging Face (transformers/datasets/Hub, HTML+MD)
│   ├── khoa-hoc-peft-lora.*      # 🧩 PEFT & LoRA (fine-tune LLM tiết kiệm, HTML+MD)
│   ├── claude-course/            # Bộ khóa Claude (index.html, foundations, coding, ...)
│   ├── khoa-hoc-gemini-pro.*     # ✦ Gemini Pro
│   └── giao_trinh_agentic_ai.html
│
├── game-dev/                     # 🎮 Game Development
│   ├── khoa-hoc-godot-2d-physics.* · khoa-hoc-game-design.*
│   ├── godot-hackslash-rpg-guide.html · unity_glossary.html
│
├── sang-tao/                     # 🎨 Sáng tạo nội dung
│   ├── khoa-hoc-viet-cot-truyen-game.* · khoa-hoc-sang-tac-kich-ban-phim.*
│   └── lo-trinh-hoc-ve.html · procreate-guide.html · tu-dien-nhac-ly.html
│
├── kinh-doanh/                   # 💼 Kinh doanh & Marketing
│   └── khoa-hoc-sale-dien-mat-troi.* · content-engine-dien-mat-troi.*
│
└── tham-khao/                    # 📖 Kỹ thuật & Tham khảo
    ├── khoa-hoc-in-3d.*               # In 3D
    ├── autocad-lsp-dictionary_v2.html · autocad-lsp-dictionary.html
    ├── aec-domain-knowledge.html      # Kiến thức ngành AEC
    └── security-glossary.html         # Từ điển Bảo mật
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
- Hầu hết khóa học có **2 bản**: HTML (giao diện tương tác) và Markdown (đọc trên editor/GitHub).
- Nội dung bằng **tiếng Việt**. Tất cả trang đều **thân thiện mobile** (responsive).

*Cập nhật: 2026-06-10*
