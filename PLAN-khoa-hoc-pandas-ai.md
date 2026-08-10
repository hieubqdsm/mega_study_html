# PLAN — Khóa Học: Điều Khiển AI Xử Lý Dữ Liệu Khảo Sát (CSV Lớn) Cho Data Analyst

> Trạng thái: **BẢN THẢO ĐỂ DUYỆT (v3 — chuyên cho khảo sát HR)** — đọc xong, OK hoặc góp ý, tôi build theo đúng plan này.

---

## 1. Sự khác biệt so với bản v1

| Bản v1 (cũ) | **Bản v2 (mới — theo flow bạn yêu cầu)** |
|---|---|
| Dạy syntax Pandas, bạn phải đọc/hiểu code sâu | **Không tập trung review code** — bạn *điều khiển AI* tạo & chạy code |
| Trọng tâm = công cụ (Pandas) | **Trọng tâm = Context + Prompt** (mô tả dữ liệu đưa vào prompt) |
| Ít nói vòng đời code | Có **vòng đời đầy đủ**: tạo → check → update ngữ cảnh → commit lên Git |
| Học viên tự làm thủ công | Biết **giao việc tay chân cho AI** (merge/làm sạch/export) |

**Một câu tóm khóa:** *"Bạn không cần biết viết code Python — bạn cần biết **mô tả dữ liệu (context)** đủ rõ để AI tự viết code, tự kiểm tra, tự cập nhật rule, và tự commit lên Git."*

---

## 2. Mục tiêu & Đối tượng

**Mục tiêu (4 năng lực đầu ra):**
1. **Nền tảng dữ liệu khảo sát lớn** — hiểu CSV khảo sát lớn khác gì Excel, vì sao cần Python, file cỡ nào sẽ làm PQ treo.
2. **Context Engineering cho khảo sát** — biết "context" là gì, cách mô tả 1 bộ khảo sát (bảng câu hỏi, cấu trúc, hành vi ứng viên/nhân viên) để AI hiểu đúng.
3. **Điều khiển AI** — prompt AI làm các việc tay chân: lọc, nối, làm sạch, tổng hợp, xuất file — **không tự gõ code**.
4. **Vòng đời code** — nhờ AI **check code cũ**, **update ngữ cảnh/rule mới**, và **commit lên Git** — **tất cả qua prompt**, không bắt DA học git.

**Đối tượng:** Data Analyst đang xử lý **dữ liệu khảo sát nguồn nhân sự (HR survey)** bằng Power Query, **chưa rành Python**, không muốn trở thành lập trình viên. Chỉ cần: máy cài được Python (hướng dẫn Ch.1) + tài khoản AI (ChatGPT/Claude/Gemini).

---

## 3. Thông số khóa học

| Thông số | Giá trị |
|---|---|
| Số chương | **16 chương** (0–15) |
| Số phần | **4 phần** tuyến tính theo flow làm việc thực tế |
| Prompt copy-paste | **30+ prompt** chuẩn |
| Context template | **8 template** cho khảo sát HR (questionnaire / structure / behavior / scoring...) |
| Thời lượng | **4–6 tuần** (2–3 buổi/tuần) |
| Mức độ | 🟢 Beginner → 🔵 Tự chủ điều khiển AI |

---

## 4. Lộ trình 4 Phần — THEO FLOW LÀM VIỆC THỰC TẾ (Khảo Sát HR)

> Flow: **Hiểu dữ liệu khảo sát → Chuẩn bị context → Điều khiển AI xử lý → Bảo trì vòng đời code.** Học viên đi tuần tự, cuối khóa có 1 quy trình làm việc hoàn chỉnh cho bộ khảo sát nguồn nhân sự.

### 🟦 PHẦN 1 — NỀN TẢNG & CONTEXT KHẢO SÁT · Chương 0–3

> Học viên hiểu *tại sao* đổi cách làm, và nắm vững khái niệm **context** — then chốt của toàn khóa. Với khảo sát HR, context đặc biệt phức tạp (câu hỏi, thang đo, nhóm nhân viên) nên phần này là nền móng.

| Ch | Tiêu đề | Đầu ra | Điểm nhấn |
|---|---|---|---|
| **0** | ★ Sự thật: AI không hiểu file khảo sát của bạn — trừ khi bạn cho context | Hiểu vì sao prompt "tính điểm engagement" thất bại nếu AI không biết câu Q12 ứng với nhóm nào, thang mấy | Bài học số 1: **context = dữ liệu + mô tả bộ khảo sát** |
| **1** | Môi trường tối thiểu: Python + VS Code + mở CSV khảo sát lớn | Cài đủ, mở được file 500k dòng (10.000 nhân viên × 50 câu hỏi) không treo | CSV vs Excel, vì sao PQ chậm |
| **2** | CSV khảo sát lớn hoạt động thế nào: hàng = 1 response, cột = câu hỏi, kiểu, dấu phân tách, encoding | Đọc được metadata cơ bản của file | TCVN/UTF-8, dấu `,` vs `;`, lỗi font tên nhân viên |
| **3** | ★ **Context là gì & cách viết context cho khảo sát** | Tự viết được 1 block context hoàn chỉnh cho 1 bộ khảo sát | **8 template context HR**: questionnaire / structure / behavior / scoring / demographic / Likert / raw-vs-coded / missing-policy |

### 🟩 PHẦN 2 — ĐIỀU KHIỂN AI XỬ LÝ (KHÔNG TỰ CODE) · Chương 4–8

> Bạn **không gõ code** — chỉ gõ prompt. AI sinh code, bạn chạy và xem kết quả. Đây là phần "giao việc tay chân cho AI". Tất cả ví dụ dùng dữ liệu khảo sát HR thật (engagement, onboarding, 360, exit interview...).

| Ch | Tiêu đề | Việc giao AI | Đầu ra |
|---|---|---|---|
| **4** | Nhờ AI đọc file & kiểm tra sức khỏe dữ liệu khảo sát | Sinh code đọc CSV, báo cáo null/duplicate/kiểu cột/tỷ lệ bỏ trống từng câu | 1 "báo cáo khám sức khỏe" cho bộ khảo sát |
| **5** | Nhờ AI lọc & tìm kiếm (theo phòng ban, mức độ, nhóm nhân viên) | Sinh code lọc theo điều kiện, nhiều tiêu chí | File kết quả lọc sẵn (vd: chỉ nhân viên R&D có điểm engagement thấp) |
| **6** | Nhờ AI nối nhiều file (questionnaire + structure + demographic) | Sinh code merge nhiều CSV theo khóa (mã nhân viên) | 1 file gộp sạch — thay VLOOKUP |
| **7** | Nhờ AI làm sạch & tạo cột mới (scoring, reverse-code, phân nhóm) | Sinh code xử lý null, chuẩn hóa text, tính điểm tổng, phân nhóm hành vi | Dữ liệu sạch đầu vào |
| **8** | Nhờ AI tổng hợp & xuất báo cáo (theo nhóm, so sánh, pivot) | Sinh code group by phòng ban, pivot theo chu kỳ, xuất Excel/CSV cuối | File báo cáo hoàn chỉnh (vd: engagement theo phòng ban × quý) |

> **Triết lý phần này:** Mỗi chương = **1 việc tay chân cụ thể** mà đội DA đang làm thủ công trên PQ. Học viên copy context + prompt → AI làm → xem kết quả. Không cần hiểu từng dòng code.

### 🟨 PHẦN 3 — VÒNG ĐỜI CODE (CHECK · UPDATE · COMMIT) · Chương 9–12

> Đây là phần **mới & quan trọng** theo flow bạn yêu cầu: code sinh ra không phải dùng 1 lần rồi quên — nó có **vòng đời**.

| Ch | Tiêu đề | Kỹ năng | Đầu ra |
|---|---|---|---|
| **9** | ★ Nhờ AI **check code cũ** (review logic & lỗi tiềm ẩn) | Đưa code cũ + context, AI phát hiện bug/inefficiency (vd: tính điểm sai vì quên reverse-code) | Danh sách vấn đề + code đã sửa |
| **10** | ★ **Update ngữ cảnh & rule xử lý mới** | Khi rule công ty đổi (vd: đổi thang điểm, thêm câu hỏi, gộp phòng ban) → thêm context mới, AI cập nhật code | Code phiên bản mới theo rule mới |
| **11** | Tổ chức code thành pipeline tái dùng (AI lo cấu trúc) | AI gom các bước thành script chạy 1 lệnh | Script `run_survey_report.py` chạy được |
| **12** | ★ Nhờ AI **commit code lên GitHub/GitLab** — KHÔNG cần học git | Dán lệnh AI cung cấp (commit/push/PR), AI giải thích từng bước bằng tiếng Việt | Code lên repo công ty an toàn |

> **Lưu ý Git (theo yêu cầu):** DA **không học git**. Chương 12 chỉ dạy **nhờ AI làm hết**: AI sinh đúng lệnh, AI giải thích, DA copy–dán–xong. Nếu sau này muốn hiểu sâu hơn, mới tham khảo khóa `khoa-hoc-git` (tùy chọn, không bắt buộc).

### 🟪 PHẦN 4 — THỰC CHIẾN & CÔNG CỤ · Chương 13–15

| Ch | Tiêu đề | Nội dung |
|---|---|---|
| **13** | Case study: Thay 1 quy trình Power Query bằng quy trình AI + Python cho báo cáo engagement quý | Walkthrough từ file raw → context → prompt → báo cáo → commit (full loop) |
| **14** | Thư viện Prompt (copy-paste, phân loại) | 15+ prompt tổng hợp cho khảo sát HR: đọc/lọc/merge/làm sạch/scoring/check/commit |
| **15** | Cheatsheet Context (1 trang) | Template mô tả bộ khảo sát nhanh — dán vào mọi prompt |

---

## 5. Format nội dung mỗi chương (theo pattern repo hiện có)

Mỗi chương HTML dùng **đúng bộ component** của `khoa-hoc-excel-ai.html` (đồng bộ visual):

- `h2.ch-title` + `span.num` — tiêu đề + số chương
- `div.ch-sub` — mô tả 1 câu
- `div.box.tip / .pro / .warn / .danger / .info` — callout (mẹo/chuyên gia/cảnh báo/nguy/hiểu biết)
- `div.prompt` với `.ph` (header) + `.pbody[id]` + `.pbtns` (nút copy) — prompt copy-paste
- `div.code` / `pre.code-block` — ví dụ code AI sinh ra (chỉ để *minh họa kết quả*, **không bắt học viên gõ**)
- `h3.sec` — tiêu đề phụ
- Bảng `<table>` — cho context template, so sánh PQ vs AI-Python
- `<details><summary>Đáp án</summary>` — cho bài tập tự kiểm tra

**Mỗi chương kết thúc:** 1 bài thực hành nhỏ (copy context + prompt → chạy → nộp kết quả).

---

## 6. Quy ước kỹ thuật (build đúng pattern repo)

### 6.1 File sẽ tạo
```
lap-trinh/
  khoa-hoc-pandas-ai.html      ← bản chính (dark theme, sidebar, prompt copy)
  khoa-hoc-pandas-ai.md        ← bản Markdown (đọc nhanh)
```

> **Đặc điểm bản HTML:** Trọng tâm hiển thị **prompt + context** (không phải code editor). Code chỉ xuất hiện dưới dạng *kết quả AI sinh* để học viên biết hình thù, **không** nhúng Pyodide chạy code trong trình duyệt (khóa này không dạy gõ code, chạy thật trên máy qua AI). File gọn hơn khóa v1.

### 6.2 Cấu trúc HTML (clone từ `khoa-hoc-excel-ai.html`, đổi palette)
- **Palette:** Xanh dương Python/Pandas (`#150458` dark + `#704dff` glow + `#ffd33d` vàng accent).
- **Logo sidebar:** 🐼 + tiêu đề "AI Xử Lý Dữ Liệu Lớn (CSV)"
- **Sidebar nav:** 4 section (P1–P4) + mục Công cụ (Thư viện Prompt / Cheatsheet Context / Tiến độ)
- **JS giữ nguyên:** `copyPrompt()`, `markChapter()` (localStorage), nav search, scroll-spy active, progress bar.

### 6.3 Đăng ký vào `index.html`
Thêm card `class="card feat"` cạnh card Excel-AI (cùng nhóm "Dành cho Data Analyst"), style xanh dương:
```html
<a class="card feat" href="lap-trinh/khoa-hoc-pandas-ai.html" style="border-color:#704dff;...">
  <span class="badge" style="background:#704dff;color:#fff">MỚI</span>
  <div class="ic">🐼</div>
  <span class="tag t-prog" style="background:rgba(112,77,255,.18);color:#a78bfa">Dành cho Data Analyst</span>
  <h3>AI Xử Lý Dữ Liệu Khảo Sát (CSV Lớn) — Thay Power Query</h3>
  <p>Cho DA xử lý <strong>khảo sát nguồn nhân sự</strong>: học <strong>điều khiển AI</strong> xử lý CSV lớn — <strong>Context Engineering</strong> (questionnaire, structure, behavior), prompt sinh/lọc/ghép/làm sạch/scoring, <strong>vòng đời code</strong> (check, update rule, commit lên Git — <em>nhờ AI hết, không học git</em>).</p>
  <div class="meta"><span>📖 16 chương</span><span>🤖 30+ prompt</span><span>📝 8 context template HR</span></div>
</a>
```

### 6.4 Sidebar nav (16 chương)
```
P1 · NỀN TẢNG & CONTEXT (Ch 0–3)
P2 · ĐIỀU KHIỂN AI XỬ LÝ (Ch 4–8)
P3 · VÒNG ĐỜI CODE: CHECK · UPDATE · COMMIT (Ch 9–12)
P4 · THỰC CHIẾN & CÔNG CỤ (Ch 13–15)
Công cụ: Thư viện Prompt · Cheatsheet Context · Tiến độ
```

---

## 7. Dữ liệu mẫu (Khảo Sát Nguồn Nhân Sự — HR Survey)

Tạo bộ file CSV giả (inline trong HTML, ~30–80 dòng) mô phỏng 1 khảo sát HR thực tế. **Quan trọng:** không chỉ có file dữ liệu (raw) mà còn có **các file mô tả** — đây chính là *nguồn context* để đưa vào prompt.

| File | Vai trò | Ví dụ cột/nội dung |
|---|---|---|
| `survey_raw.csv` | **Dữ liệu thô** — mỗi dòng = 1 nhân viên trả lời | `emp_id, Q1...Q50, submit_time` (chỉ mã, AI không biết Q12 nghĩa là gì) |
| `questionnaire.md` | **Bản câu hỏi** — dịch mã Q1…Q50 thành nội dung | `Q12 = "Tôi thấy ý kiến của mình được lắng nghe"` (Likert 1–5) |
| `survey_structure.csv` | **Cấu trúc bộ khảo sát** — nhóm câu hỏi → nhóm chủ đề | `Q1–Q10 = Môi trường; Q11–Q20 = Lãnh đạo; Q21–Q30 = Phát triển` |
| `behavior_rules.md` | **Quy tắc hành vi / chấm điểm** — cách interpret kết quả | `Q5, Q15 là câu reverse-code; điểm engagement = trung bình Q11–Q30; <3.0 = "Có nguy cơ nghỉ việc"` |
| `demographics.csv` | **Thông tin nhân viên** — để merge & phân nhóm | `emp_id, phong_ban, cap_bac, gioi_tinh, tham_nien` |

> **Đây là "điểm khác biệt" của context khảo sát:** File raw chỉ có `Q1...Q50` — vô nghĩa nếu thiếu 3 file `questionnaire` + `structure` + `behavior_rules`. Khóa dạy học viên **gom 4 file này thành context block** rồi đưa vào prompt → AI hiểu đúng ngay lần đầu.

> Nếu công ty bạn có sẵn bộ câu hỏi / structure / quy tắc chấm điểm thật, cho tôi vài ví dụ (hoặc file mẫu ẩn danh), tôi đưa vào cho **context mẫu 100% sát công ty bạn**.

---

## 8. Điểm khác biệt so với khóa "Excel-AI" đã có

| Khía cạnh | Excel-AI (đã có) | **AI-Xử-Lý-Khảo-Sát (sẽ build)** |
|---|---|---|
| Công cụ | Excel + Power Query (GUI) | **Python (do AI sinh code)** |
| Trọng tâm | Công thức + prompt | **Context engineering cho khảo sát + vòng đời code** |
| Kỹ năng cốt lõi | Đặt câu hỏi Excel | **Mô tả bộ khảo sát (questionnaire/structure/behavior) + điều khiển AI end-to-end** |
| Phù hợp | Ai không code | DA xử lý khảo sát HR cần tốc độ + tự động hóa |

→ Hai khóa bổ sung nhau. Card index ghi rõ: *"Bước tiếp của DA khi dữ liệu khảo sát lớn — từ GUI sang điều khiển AI, không cần học code/git."*

---

## 9. Deliverable (sẽ bàn giao)

1. `lap-trinh/khoa-hoc-pandas-ai.html` — bản đầy đủ
2. `lap-trinh/khoa-hoc-pandas-ai.md` — bản Markdown tóm tắt
3. Cập nhật `index.html` — thêm card + đăng ký
4. (Tùy chọn) File CSV mẫu inline hoặc thư mục `samples/`

---

## 10. Câu hỏi xác nhận trước khi build

1. **16 chương / 4 phần** theo flow (Context khảo sát → Điều khiển AI → Vòng đời code → Thực chiến) — vừa đủ chưa?
2. **Chương 12 (commit Git):** Đã fix theo hướng **nhờ AI hết, không học git** — chỉ copy-paste lệnh AI cung cấp. Vậy đủ chưa, hay muốn gộp luôn vào chương 11 cho gọn?
3. **Dữ liệu mẫu:** 5 file (raw + questionnaire + structure + behavior_rules + demographics) ở mục 7 — bạn có file/structure thật (ẩn danh) cho tôi chèn không, để context mẫu 100% sát công ty bạn?
4. **Tên bộ khảo sát:** ví dụ "Engagement", "Onboarding", "360 feedback", "Exit interview" — khóa sẽ lấy 1 bộ làm xuyên suốt. Bạn muốn bộ nào làm ví dụ chính?

---

> ✅ Khi bạn OK (hoặc sửa xong), tôi build theo đúng plan v2: HTML trước → MD → cập nhật index.html.
