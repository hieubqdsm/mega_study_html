# Hướng Dẫn — Điều Khiển AI Xử Lý Dữ Liệu Khảo Sát Lớn

> Nguồn: [khoa-hoc-pandas-ai.html](khoa-hoc-pandas-ai.html) — bản HTML có **prompt copy-paste** (nút sao chép), **flashcards** lật thẻ, **cheatsheet context** và **theo dõi tiến độ**.

---

## 📚 Tổng Quan

**Mục tiêu:** Hướng dẫn cho team **Data Analyst xử lý khảo sát** (data hàng nghìn cột × hàng trăm nghìn dòng). Bạn **không cần biết code, không cần học git** — chỉ cần biết **đưa 3 file setup + mô tả rule cho AI**, AI tự sinh code Python để apply 20-50 cột rule và ra **cột phán quyết** (respondent đủ/không đủ chuẩn). Mọi thao tác qua **prompt tiếng Việt**.

**Bài toán thực:** Workflow cũ — tải data CSV → Excel → thêm 20-50 cột rule bằng công thức → cột phán quyết. Vấn đề: **2000 cột × 200k dòng làm Excel/PQ treo**. Lời giải: Python (do AI sinh code), xử lý theo cột (vector hóa) nên không bị.

**Đối tượng:**
- Đang xử lý data khảo sát lớn bằng Excel/Power Query, máy hay đơ
- Muốn tự chủ làm với AI thay nhờ người khác viết Python
- Không muốn trở thành lập trình viên, chỉ muốn **điều khiển AI**

**Quy mô:** 16 chương · 4 phần · 20+ prompt copy-paste · ~4–6 tuần

**Triết lý:** AI là trung tâm, **3 file setup + mô tả rule** là then chốt. Bạn chỉ cần (1) mô tả rule tiếng Việt + (2) chỉ cột liên quan — AI tự đọc setup để hiểu cột và viết code.

---

## 🗺️ Lộ Trình 4 Phần (Theo Flow Thực Tế)

| Phần | Tên | Chương | Mục tiêu |
|---|---|---|---|
| **P1** | 🟦 Nền tảng & 3 File Setup | 0–3 | Hiểu vì sao cần đổi cách; nắm vững **3 file setup** làm "context vàng" |
| **P2** | 🟩 Điều Khiển AI Xử Lý (Không Tự Code) | 4–8 | Nhờ AI giải mã → apply 20-50 rule → phán quyết → báo cáo |
| **P3** | 🟨 Vòng Đời Code: Check · Update · Commit | 9–12 | Nhờ AI review, update rule, build pipeline, **commit Git (không học git)** |
| **P4** | 🟪 Thực Chiến & Công Cụ | 13–15 | Case study full loop, thư viện prompt, cheatsheet |

---

# 🟦 PHẦN 1 — NỀN TẢNG & 3 FILE SETUP

## Chương 0: ★ AI không hiểu data nếu thiếu context

Data chỉ có cột mã hóa (`profile-qbirthyear_o1990`). AI không biết cột đó nghĩa gì, giá trị 1/0 ra sao. **Prompt "kiểm tra respondent nói xạo" sẽ thất bại** nếu thiếu 3 file setup.

**Context gồm:** data file + questionnaire.csv (giải mã code) + survey-structure.csv (loại widget) + behavior.csv (rule validation) + mô tả rule của DA.

> **Quy luật vàng:** Context càng đầy đủ → AI càng đúng ngay lần đầu. 90% lỗi là do thiếu context.

## Chương 1: Môi trường & vì sao Excel/PQ "tắc thở"

Workflow cũ (Excel + 20-50 cột rule công thức) không chịu nổi 2000 cột × 200k dòng: Excel treo, PQ tính rất lâu, kéo công thức xuống 200k dòng đơ máy. Python xử lý theo cột (vector hóa) nên chạy trong vài giây.

Cài 3 thứ (nhờ AI dẫn từng bước): Python 3.12+, VS Code + extension Python/Jupyter, `pip install pandas openpyxl`. **Thay thế:** Google Colab nếu công ty không cho cài Python.

## Chương 2: ★ 3 file setup = "context vàng"

| File | Vai trò | Dùng để |
|---|---|---|
| **questionnaire.csv** | Codebook: map `survey-code` → nhãn VI/EN + "Chọn/Không chọn" | Giải mã cột `..._o1990` vô nghĩa thành "respondent chọn 1990" |
| **survey-structure.csv** | Cây cấu trúc: mã câu + **WIDGET TYPE** (multiple_choice/scale/list_box...) + "belong question" (cha) | Biết loại câu hỏi → đọc đúng cách truy cập |
| **behavior.csv** | Rule validation: `va_at_least 1`, `va_force_response`, `dlogic_show_element_when...` | Hiểu ràng buộc (bắt buộc chọn, hiện theo điều kiện) |

**Quan trọng:** Đưa AI cả **4 file** mỗi lần (3 setup + data), không chỉ data. Tạo 1 folder dự án cho mỗi đợt, bỏ đủ 4 file vào.

**Đọc cột multiple_choice:** `_o{value}=1` → chọn option đó (khác single_choice/list_box dùng giá trị trực tiếp). Cần survey-structure.csv để biết loại → đọc đúng.

## Chương 3: ★ Viết context block chuẩn (4 phần)

```
[1. MÔ TẢ DATA] file, số dòng, 3 setup đính kèm
[2. CÁCH ĐỌC CỘT] code_o{val}=1 → chọn option; cột gốc = giá trị trực tiếp
[3. DANH SÁCH RULE] mỗi rule = mô tả VI + cột liên quan
[4. ĐỊNH DẠNG ĐẦU RA] cột rule_* (1/0) + cột phán quyết
```

> **Nguyên tắc cốt lõi:** Chỉ cần 2 thứ cho mỗi rule — (1) mô tả tiếng Việt, (2) tên cột liên quan. AI tự đọc setup để biết cách truy cập cột, tự viết code. **Không cần học syntax.**

---

# 🟩 PHẦN 2 — ĐIỀU KHIỂN AI XỬ LÝ (KHÔNG TỰ CODE)

## Chương 4: ★ Chọn AI & công cụ (ChatGPT / Claude / Gemini)

**Quy tắc chọn nhanh:**
- **Khám nhanh 1 đợt data** → ChatGPT (Advanced Data Analysis tự chạy code)
- **Viết/review pipeline dài** → Claude Sonnet 5 (code chuẩn, rẻ, context 1M)
- **Nạp cả bộ 4 file** (data + 3 setup) → Gemini 3.6 Flash (context 1M, nhanh, rẻ)

**Từng version (8/2026):**
- ChatGPT: GPT-5.2 (flagship), GPT-5.6 (Sol/Terra/Luna — mới nhất). Flagship cho rule phức tạp.
- Claude: Opus 5 (suy luận sâu) / **Sonnet 5 (code & agentic — chọn cho 90% việc code pandas)**
- Gemini: Gemini 3 / **Gemini 3.6 Flash (dẫn đầu bảng xếp hạng — chọn cho đa số việc)**

**Tool đi kèm:** **Claude Code** (plugin VS Code — DA nên cài, sửa file trực tiếp + duyệt diff). **Antigravity** (Google, IDE desktop — thường quá mức cho DA xử lý CSV).

## Chương 5: Nhờ AI giải mã data file

Đừng vội viết rule — để AI đọc 3 file setup, tóm tắt cấu trúc (phần nào có câu gì, loại gì). Biết rõ: có bao nhiêu phần, mỗi câu multiple_choice có option nào, mỗi câu scale thang mấy. Từ đó bạn định vị nhanh cột để viết rule. Nếu data quá lớn, dùng mẫu 100 dòng đầu để AI đọc cấu trúc.

## Chương 6: ★ Nhờ AI apply 20-50 cột rule

**Trọng tâm.** Quy trình: viết danh sách rule → đưa AI 4 file → AI sinh code tạo từng cột rule_* → verify 5 dòng → chạy data thật.

**Ví dụ rule "SV 2007 năm 3-4 → nói xạo":**
- Mô tả VI + 2 cột (`profile-qbirthyear`, `profile-qyear-of-study`)
- Mock code: `if(birthyear=2007 AND yearofstudy in [3,4], 1, 0)`
- AI đọc setup → biết `_o2007=1` (multiple) vs giá trị trực tiếp (list_box) → tự dịch sang Python

**Batch:** Gom 20-50 rule thành 1 danh sách, AI sinh script tạo tất cả cột cùng lúc. **Bẫy:** nhầm multiple_choice (dùng `_o{value}=1`) với single_choice (giá trị trực tiếp) — luôn đính kèm survey-structure.csv.

## Chương 7: ★ Nhờ AI tạo cột phán quyết cuối

Sau 20-50 cột rule, tổng hợp thành 1 cột (QUALIFIED/REVIEW/REJECT). **Tùy dự án**, không hard code:
- Đếm rule pass (≥80% → QUALIFIED)
- Rule chặn / hard fail (phạm → REJECT ngay)
- Tính tổng điểm (có trọng số)
- Composite (kết hợp)

Luôn yêu cầu AI in **phân bố + top lý do REJECT** để "cảm" chất lượng (90% REJECT → rule quá khắt; 0% → quá lỏng).

## Chương 8: Nhờ AI thống kê & xuất file kết quả

Báo cáo: tỷ lệ đạt, top rule vi phạm, tỷ lệ theo phân khúc, quota check. Xuất 2 file: `qualified_data.csv` (chỉ QUALIFIED) + `report.xlsx` (bảng + biểu đồ). **Luôn yêu cầu AI viết 3 insight tiếng Việt** ở đầu báo cáo.

---

# 🟨 PHẦN 3 — VÒNG ĐỜI CODE: CHECK · UPDATE · COMMIT

## Chương 9: ★ Nhờ AI check code rule cũ

Khi tỷ lệ REJECT bất thường hoặc nghi rule sai — nhờ AI review. Prompt tốt: dán **3 setup + code + mô tả triệu chứng cụ thể**. AI bắt được: nhầm loại cột, NaN xử lý sai, hiểu sai `_o{value}`, quy chiếu câu cha.

## Chương 10: ★ Update rule khi DA đổi

Khi thêm/đổi/bỏ rule: **cập nhật `context.md` trước**, rồi nhờ AI sửa code. Ví dụ: thêm `rule_ai_overuse`, đổi ngưỡng sinh 2006 cũng coi nói xạo. AI đánh dấu `# MỚI`, giải thích thay đổi, in lại phân bố để so sánh.

## Chương 11: Pipeline tái dùng

Gom các bước thành `run_report.py`: `load_setup()` → `load_data()` → `apply_rules()` → `make_verdict()` → `report()`. Chạy `python run_report.py surveys/q3_2025/`. **Đợt sau thay folder + data → 10 phút thay 1.5 ngày.**

## Chương 12: ★ Nhờ AI commit lên Git — KHÔNG cần học git

**Git = Google Drive cho code.** Bạn không cần thuộc 1 lệnh. Mỗi lần commit/push: mở AI → mô tả → AI sinh lệnh → copy–dán terminal → lỗi dán lại.

**Bảo mật:** KHÔNG commit data respondent thật. Chỉ commit code + context ẩn danh. Dùng `.gitignore` loại trừ `*.csv` data.

---

# 🟪 PHẦN 4 — THỰC CHIẾN & CÔNG CỤ

## Chương 13: Case study — 1 đợt khảo sát full loop

Nhận đợt Q3/2025 (48k respondents × 1850 cột) + 3 setup. **8 bước trong 2 giờ** (thay 1.5 ngày): chọn AI → giải mã → viết context + 35 rule → apply rule → phán quyết → báo cáo → pipeline → commit. Có meta-prompt kickoff để AI dẫn qua từng bước.

## Chương 14: Thư viện Prompt (copy-paste)

5 nhóm: (A) giải mã & đọc setup, (B) apply batch rule, (C) phán quyết + báo cáo, (D) review + update, (E) commit Git. Tất cả có nút sao chép trong bản HTML.

## Chương 15: Cheatsheet Context (1 trang)

12 card: 4 file cần đưa AI, đọc cột multiple_choice, context block 4 phần, mô tả 1 rule, mock code → Python, cột phán quyết, chọn model, prompt review, prompt update, pipeline, prompt Git, `.gitignore`.

---

## 🎯 Cách Học Hiệu Quả

1. **Đọc theo thứ tự P1→P4** — mỗi phần xây nền cho phần sau
2. **Hoàn thành Chương 2-3 trước** (3 file setup + context block) — gốc rễ toàn bộ
3. Mỗi chương: đọc lý thuyết → copy prompt → chạy thử trên đợt khảo sát thật
4. Cuối khóa, làm **Case study Chương 13** để xác nhận tự chủ

> Bản HTML có nút **"Đã học chương này"** ở mỗi chương, lưu tiến độ trong trình duyệt.
