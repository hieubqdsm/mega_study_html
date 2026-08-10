# Khóa Học — AI Xử Lý Dữ Liệu Khảo Sát (CSV Lớn) Cho Data Analyst

> Nguồn: [khoa-hoc-pandas-ai.html](khoa-hoc-pandas-ai.html) — bản HTML có **prompt copy-paste** (nút sao chép), **flashcards** lật thẻ, **cheatsheet context** và **theo dõi tiến độ**.

---

## 📚 Tổng Quan

**Mục tiêu:** Khóa cho team **Data Analyst xử lý khảo sát nguồn nhân sự** (engagement, onboarding, 360, exit interview…). Bạn **không cần biết code, không cần học git** — chỉ cần biết **mô tả dữ liệu (context)** đủ rõ để AI tự sinh code Python (pandas), tự check, tự update rule, và tự commit lên Git. Mọi thao tác qua **prompt tiếng Việt**.

**Đối tượng:**
- Đang dùng Power Query xử lý CSV khảo sát, chưa rành Python
- Muốn tăng tốc khi file lớn (hàng trăm nghìn response) — PQ bắt đầu chậm/treo
- Không muốn trở thành lập trình viên, chỉ muốn **tự chủ điều khiển AI**

**Quy mô:** 16 chương · 4 phần · 30+ prompt copy-paste · 8 context template HR · ~4–6 tuần

**Triết lý:** AI là trung tâm, context là then chốt. Code chỉ là hệ quả — bạn không gõ code, bạn **mô tả dữ liệu và đặt câu hỏi**.

---

## 🗺️ Lộ Trình 4 Phần (Theo Flow Thực Tế)

| Phần | Tên | Chương | Mục tiêu |
|---|---|---|---|
| **P1** | 🟦 Nền tảng & Context Khảo Sát | 0–3 | Hiểu dữ liệu CSV lớn, nắm vững **context** — gốc rễ toàn khóa |
| **P2** | 🟩 Điều Khiển AI Xử Lý (Không Tự Code) | 4–8 | Nhờ AI làm việc tay chân: khám/lọc/merge/làm sạch/scoring/báo cáo |
| **P3** | 🟨 Vòng Đời Code: Check · Update · Commit | 9–12 | Nhờ AI review code, update rule, build pipeline, **commit Git (không học git)** |
| **P4** | 🟪 Thực Chiến & Công Cụ | 13–15 | Case study full loop, thư viện prompt, cheatsheet context |

---

# 🟦 PHẦN 1 — NỀN TẢNG & CONTEXT KHẢO SÁT

## Chương 0: ★ Sự thật — AI không hiểu file nếu thiếu context

AI chỉ thấy các con số và tên cột mã hóa (Q1, Q2...). Nó không biết Q12 nghĩa là gì, thang mấy, câu nào reverse-code. **Prompt "tính điểm engagement" sẽ sai gần như chắc chắn** nếu thiếu context.

**Context gồm 5 phần:** (1) mô tả file, (2) bản câu hỏi, (3) cấu trúc nhóm, (4) quy tắc chấm điểm/hành vi, (5) chính sách dữ liệu.

> **Quy luật vàng:** Context càng đầy đủ → AI càng đúng ngay lần đầu. 90% lỗi khi dùng AI là do thiếu context.

Ví dụ cùng yêu cầu "tính engagement theo phòng ban": prompt nghèo context → AI đoán sai; prompt đủ context (thang Likert, câu reverse, nhóm nào tính, ngưỡng phân loại) → đúng ngay lần đầu.

---

## Chương 1: Môi trường tối thiểu — Python + VS Code + CSV lớn

So sánh PQ vs Python khi file khảo sát lớn:

| Tình huống | Power Query | Python (AI sinh code) |
|---|---|---|
| 50k dòng | OK | OK |
| 500k dòng × 50 cột | Chậm, đôi khi treo | Vài giây |
| Ghép 5 file năm | Cấu hình phức tạp | 1 dòng `pd.concat()` |
| Chạy lại mỗi tháng | Refresh thủ công | `python run_report.py` |

Cài 3 thứ (nhờ AI dẫn từng bước): Python 3.12+, VS Code + extension Python/Jupyter, `pip install pandas openpyxl matplotlib`. **Thay thế:** Google Colab nếu công ty không cho cài Python.

---

## Chương 2: CSV khảo sát lớn hoạt động thế nào

Cấu trúc điển hình — mỗi dòng = 1 response, mỗi cột = 1 câu hỏi:

```
emp_id,phong_ban,Q1,Q2,...,Q50,submit_time
NV001,R&D,4,5,...,4,2025-06-15 10:23:00
```

**Đọc đúng file:** encoding (font TCVN → `encoding='utf-8'`), dấu phân tách (`;` vs `,`). Nhờ AI in cấu trúc (tên cột + kiểu + 5 giá trị phổ biến mỗi cột) để nhận diện thang đo — rồi ghi vào context. **Lưu ý:** làm sạch dữ liệu bẩn đã do team thu thập lo theo quy trình của họ; DA chỉ cần hiểu cấu trúc để viết context.

---

## Chương 3: ★ Context là gì & viết context chuẩn

**Template context chuẩn — 5 phần:**

```
[1. MÔ TẢ FILE] tên, số dòng, nguồn
[2. BẢN CÂU HỎI] Q1: "..." — thang Likert 1-5
[3. CẤU TRÚC NHÓM] Q1-10=Môi trường; Q11-20=Lãnh đạo...
[4. QUY TẮC CHẤM ĐIỂM] ← DA tự định nghĩa: reverse-code Q5,Q15; engagement=avg(Q11-30); phân loại ngưỡng
[5. GHI CHÚ TỪ TEAM THU THẬP] ← do team cung cấp: dữ liệu đã clean, phiên bản, người liên hệ
```

**8 template theo tình huống:** Questionnaire, Structure, Behavior/Scoring, Demographic, Likert, Raw-vs-coded, Missing-policy (tham khảo từ team), Multi-wave.

> **Mẹo vàng:** Lưu context vào 1 file `context.md` trong folder dự án. Mỗi lần dùng AI, copy nội dung này dán vào prompt đầu tiên → tiết kiệm hàng giờ debug.

---

# 🟩 PHẦN 2 — ĐIỀU KHIỂN AI XỬ LÝ (KHÔNG TỰ CODE)

## Chương 4: ★ Chọn AI & công cụ phù hợp (ChatGPT / Claude / Gemini)

Công ty bạn thường có 3 lựa chọn. Chọn đúng model cho đúng việc sẽ đỡ công sửa lại. **Quy tắc chọn nhanh:**
- **Khám nhanh 1 file CSV** → ChatGPT (Advanced Data Analysis tự chạy code, trả Excel/biểu đồ, không cần cài Python)
- **Viết/review pipeline dài** → Claude Sonnet 5 (code chuẩn, giá tốt, context 1M)
- **Nạp cả bộ (raw + questionnaire + structure + behavior + demographics)** → Gemini 3.6 Flash (context 1M, nhanh, rẻ)

**Từng version (8/2026):**
- ChatGPT: GPT-5.2 (flagship), GPT-5.6 (Sol/Terra/Luna — mới nhất). Flagship cho logic phức tạp; bản nhỏ cho việc đơn giản.
- Claude: Opus 5 (suy luận sâu, nặng) / **Sonnet 5 (code & agentic, nhanh, rẻ — chọn cho 90% việc code pandas)**
- Gemini: Gemini 3 / **Gemini 3.6 Flash (dẫn đầu bảng xếp hạng, nhanh, rẻ — chọn cho đa số việc)**

**Công cụ đi kèm:**
- **Claude Code** (Anthropic): plugin VS Code & JetBrains — DA nên cài plugin VS Code, Claude sửa `run_report.py` trực tiếp, bạn duyệt diff, không phải copy–dán.
- **Antigravity** (Google): IDE desktop agent 1M context. Thường quá mức cho DA xử lý CSV — chỉ cân nhắc nếu build app báo cáo có giao diện.

## Chương 5: Nhờ AI lọc & tìm kiếm theo nhóm nhân viên

Thay "Filter Rows" của PQ — bằng tiếng Việt. Vd: "R&D + engagement <3.0 + thâm niên ≥2 năm". Dùng ngôn ngữ tự nhiên rõ ràng, AI dịch sang code chính xác hơn bạn viết tay.

## Chương 6: Nhờ AI nối nhiều file (thay VLOOKUP)

Ghép survey_raw + demographics + salary_band + manager_rating theo `emp_id`. **Dùng LEFT JOIN** (giữ mọi response), check duplicate ở file phụ trước. 2 bẫy: INNER JOIN mất response, duplicate tạo dòng ảo.

## Chương 7: Nhờ AI scoring (tính điểm thang Likert)

**Phạm vi:** Dữ liệu đã được team thu thập làm sạch (null/duplicate/outlier — theo quy trình rule của họ). Chương này chỉ tập trung **scoring** — việc của DA: biến câu trả lời 1–5 thành điểm nhóm + tổng + phân loại.

**Reverse-code** (câu chiều ngược): `giá_trị_mới = 6 − giá_trị_cũ` cho thang 1–5. Quên reverse → điểm tính ngược → nhân viên "nguy cơ" thành "gắn kết cao".

**4 bước scoring chuẩn:** reverse-code → tính điểm từng nhóm chủ đề (Môi trường, Lãnh đạo...) → tính engagement tổng theo context → phân loại theo ngưỡng. **Luôn verify 5 dòng trước/sau reverse bằng mắt.**

## Chương 8: Nhờ AI tổng hợp & xuất báo cáo

Loại báo cáo: theo phòng ban, theo cấp bậc, theo nhóm chủ đề, so sánh năm, heatmap. Xuất Excel nhiều sheet + PNG. **Luôn yêu cầu AI viết insight tiếng Việt ở đầu báo cáo** — quản lý đọc phần này trước.

---

# 🟨 PHẦN 3 — VÒNG ĐỜI CODE: CHECK · UPDATE · COMMIT

## Chương 9: ★ Nhờ AI check code cũ

Khi kết quả "lạ", code chậm, hoặc đổi rule — nhờ AI review. Prompt tốt: dán **context + code + mô tả triệu chứng cụ thể**. AI bắt được: quên reverse, `.mean()` không bỏ null, merge duplicate, ép kiểu khi có null.

## Chương 10: ★ Update ngữ cảnh & rule xử lý mới

Khi công ty đổi (thang 1–5→1–7, thêm câu, gộp phòng, đổi định nghĩa engagement): **cập nhật `context.md` TRƯỚC**, rồi nhờ AI sửa code. Context là "nguồn sự thật", code chỉ là hệ quả. Lưu nhiều phiên bản: `context_2024.md`, `context_2025.md`.

## Chương 11: Pipeline tái dùng

Gom các bước thành script chạy 1 lệnh: `python run_report.py data/q3.csv 3 2025`. Cấu trúc hàm: `load_data()` → `clean()` → `score()` → `report()`. **Thay 1 ngày/thành 10 phút mỗi quý.** Test với dữ liệu nhỏ trước khi chạy file thật.

## Chương 12: ★ Nhờ AI commit lên Git — KHÔNG cần học git

**Git = Google Drive cho code.** Bạn không cần thuộc 1 lệnh nào. Mỗi lần muốn commit/push: mở AI, mô tả việc → AI sinh lệnh → bạn copy–dán terminal → lỗi dán lại cho AI.

**Nguyên tắc bảo mật:** KHÔNG commit dữ liệu nhân viên thật (tên/email/lương). Chỉ commit code + context đã ẩn danh. Dùng `.gitignore` loại trừ data thô.

---

# 🟪 PHẦN 4 — THỰC CHIẾN & CÔNG CỤ

## Chương 13: Case study — báo cáo engagement quý (full loop)

Nhận file 52.000 responses → **6 bước trong 2 giờ** (thay 1.5 ngày cũ): khám → merge → scoring → báo cáo → pipeline → commit. Có "meta-prompt" kickoff để AI dẫn bạn qua từng bước.

## Chương 14: Thư viện Prompt (copy-paste)

5 nhóm prompt: (A) khám & đọc, (B) làm sạch & scoring, (C) phân tích & báo cáo, (D) review + update rule, (E) commit Git. Tất cả có nút sao chép trong bản HTML.

## Chương 15: Cheatsheet Context (1 trang)

12 card cheatsheet: template context 5 phần, reverse-code, tính điểm nhóm, phân loại, lọc, merge, missing policy, pipeline, prompt review, prompt update, prompt Git, `.gitignore`.

---

## 🎯 Cách Học Hiệu Quả

1. **Đọc theo thứ tự P1→P4** — mỗi phần xây nền cho phần sau
2. Mỗi chương: đọc lý thuyết → **copy prompt** → chạy thử trên file thật của công ty (ẩn danh)
3. **Hoàn thành Chương 3 trước** (context chuẩn) — đây là gốc rễ toàn khóa
4. Lưu `context.md` ngay từ đầu, cập nhật xuyên suốt
5. Cuối khóa, làm **Case study Chương 13** để xác nhận tự chủ

> Bản HTML có nút **"Đã học chương này"** ở mỗi chương, lưu tiến độ trong trình duyệt.
