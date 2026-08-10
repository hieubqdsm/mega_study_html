# Hướng Dẫn — Điều Khiển AI Xử Lý Dữ Liệu Khảo Sát Lớn

> Nguồn: [khoa-hoc-pandas-ai.html](khoa-hoc-pandas-ai.html) — bản HTML có **prompt copy-paste** (nút sao chép), **flashcards** lật thẻ, **cheatsheet context** và **theo dõi tiến độ**.

---

## 📚 Tổng Quan

**Mục tiêu:** Hướng dẫn cho team **Data Analyst xử lý khảo sát** (data hàng nghìn cột × hàng trăm nghìn dòng). Bạn **chưa biết code hay git cũng không sao** — hãy **nhờ AI viết trước, rồi nhờ AI giải thích từng bước để hiểu và biết AI sai chỗ nào mà sửa**. Qua vài vòng bạn tự chủ làm chủ công nghệ. Mọi thao tác qua **prompt tiếng Việt**.

> **Cách tiếp cận:** Không phải "không cần học gì". Cách đúng: *không cần biết ngay* → nhờ AI viết → nhờ AI giải thích cái nó vừa viết để hiểu → đọc hiểu đủ để bắt lỗi AI và yêu cầu sửa. Học qua làm, chủ động, từng bước.

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
| **P1** | 🟦 Nền tảng & Context qua Tương tác | 0–3+★ | Hiểu các file context (3 setup + bổ sung); quy trình tương tác; ghi nhớ vào MD |
| **P2** | 🟩 Điều Khiển AI Xử Lý (Không Tự Code) | 4–8 | Nhờ AI giải mã → apply 20-50 rule → phán quyết → báo cáo |
| **P3** | 🟨 Vòng Đời Code: Check · Update · Commit | 9–12 | Nhờ AI review, update rule, build pipeline, **commit Git (chưa biết git cũng OK)** |
| **P4** | 🟪 Thực Chiến & Công Cụ | 13–15 | Case study full loop, thư viện prompt, cheatsheet |

---

# 🟦 PHẦN 1 — NỀN TẢNG & CONTEXT QUA TƯƠNG TÁC

## Chương 0: ★ AI không hiểu data nếu thiếu context

Data chỉ có cột mã hóa (`profile-qbirthyear`). AI không biết cột đó chứa giá trị gì. **Prompt "kiểm tra respondent nói xạo" sẽ thất bại** nếu thiếu context.

**Quan trọng: context KHÔNG phải "1 phát ăn ngay".** Nó là quá trình xây qua tương tác: mention 3 file setup → AI đọc tóm tắt → kiểm tra hiểu đúng → đưa rule+file bổ sung → xem kết quả tinh chỉnh.

**Context đến từ nhiều nguồn (không chỉ 3 file setup):** 3 file setup là *nền*. Có thể thêm file rule Excel, bảng merge ngành, bảng quota, file context cũ từ đợt trước...

> **Quy luật vàng:** Context càng đầy đủ → AI càng đúng. Nhưng xây qua tương tác, không nhồi 1 lần.

## Chương 1: Môi trường & vì sao Excel/PQ "tắc thở"

Workflow cũ (Excel + 20-50 cột rule công thức) không chịu nổi 2000 cột × 200k dòng. Python xử lý theo cột (vector hóa) nên chạy trong vài giây.

Cài 3 thứ (nhờ AI dẫn từng bước): Python 3.12+, VS Code + extension Python/Jupyter, `pip install pandas openpyxl`. **Thay thế:** Google Colab.

## Chương 2: ★ Nhận diện các file context & tác dụng

Hiểu logic từng loại file để biết khi nào mention cái nào — **không cần đọc cặn kẽ, AI đọc cho bạn.**

**3 file setup (nền — luôn mention lượt đầu):**
| File | Tác dụng |
|---|---|
| **questionnaire.csv** | "Bản dịch" mã cột → ý nghĩa + giá trị |
| **survey-structure.csv** | Loại câu hỏi (multiple_choice/scale/list_box) + cấu trúc cha-con |
| **behavior.csv** | Rule validation/logic hiển thị (bắt buộc, hiện theo điều kiện) |

**File bổ sung (tùy dự án):** file rule DA (Excel/MD), bảng merge ngành, bảng quota, file context cũ. Mention kèm 1 câu mô tả tác dụng → AI tích hợp đúng.

> **Tư duy then chốt:** Bạn biết file nào dùng làm gì — AI đọc nội dung. Mention file kèm mô tả (vd "industry_merge.csv → bảng gom ngành"), AI tự lo phần còn lại.

## Chương 3: ★ Quy trình tương tác & đưa rule cho AI

**4 lượt tương tác:**
1. **Lượt 1** — Mention 3 file setup + data → AI đọc, tóm tắt cấu trúc
2. **Lượt 2** — Kiểm tra AI hiểu đúng chưa (QA quan trọng). Sai → sửa
3. **Lượt 3** — Mention file rule + file bổ sung (bảng merge...) → áp rule, in 5 dòng ví dụ
4. **Lượt 4** — Xem kết quả, tinh chỉnh rule

> **Thường tôi chỉ mention 3 file rồi nói AI đọc để hiểu context** — đó là lượt 1. Sau khi AI tóm tắt đúng, mới mention file data + yêu cầu xử lý. **Không nhồi tất cả 1 lần.**

**Mô tả rule:** chỉ cần (1) mô tả tiếng Việt + (2) tên cột liên quan. AI tự đọc setup để viết code.

## ★ Nhờ AI ghi nhớ context vào file MD

Sau khi AI hiểu đúng data + rule → bảo nó ghi vào MD để dùng lần sau:
- `context_q3_2025.md` — cấu trúc bộ khảo sát, cách đọc cột
- `rules_q3_2025.md` — danh sách rule + cột liên quan + logic
- `README.md` — mục lục

**Lợi ích:** Lần sau review/đổi rule, chỉ cần mention MD — không phải quét lại 3 file setup + giải thích từ đầu. Context & rule là **tài sản dự án**, lưu thành MD, commit lên Git.

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
- AI tự so questionnaire để biết cách đọc giá trị "sinh 2007" trong cột → tự dịch sang Python

**Batch:** Gom 20-50 rule thành 1 danh sách, AI sinh script tạo tất cả cột cùng lúc. **Bạn không cần lo cách đọc cột** — AI đọc setup tự hiểu; nếu đọc sai, gửi 5 dòng data mẫu để nó tự kiểm chứng.

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

Khi tỷ lệ REJECT bất thường hoặc nghi rule sai — nhờ AI review. Prompt tốt: dán **3 setup + code + mô tả triệu chứng cụ thể**. AI bắt được: đọc sai cách lưu data, NaN xử lý sai, quy chiếu câu cha. Nếu AI đọc cột sai, gửi 5 dòng data mẫu để nó tự kiểm chứng.

## Chương 10: ★ Update rule khi DA đổi

Khi thêm/đổi/bỏ rule: **cập nhật `context.md` trước**, rồi nhờ AI sửa code. Ví dụ: thêm `rule_ai_overuse`, đổi ngưỡng sinh 2006 cũng coi nói xạo. AI đánh dấu `# MỚI`, giải thích thay đổi, in lại phân bố để so sánh.

## Chương 11: Pipeline tái dùng

Gom các bước thành `run_report.py`: `load_setup()` → `load_data()` → `apply_rules()` → `make_verdict()` → `report()`. Chạy `python run_report.py surveys/q3_2025/`. **Đợt sau thay folder + data → 10 phút thay 1.5 ngày.**

## Chương 12: ★ Nhờ AI commit lên Git — chưa biết git cũng làm được

**Git = Google Drive cho code.** Bạn chưa thuộc lệnh cũng không sao. Mỗi lần commit/push: nhờ AI sinh lệnh → copy–dán terminal. **Nhưng đừng dán mù** — nhờ AI giải thích từng lệnh để hiểu, qua vài lần bạn sẽ tự nhớ. Lỗi gì → dán lại cho AI sửa.

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
