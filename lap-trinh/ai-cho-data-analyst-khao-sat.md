# Hướng Dẫn — Điều Khiển AI Xử Lý Dữ Liệu Khảo Sát Lớn

> Nguồn: [ai-cho-data-analyst-khao-sat.html](ai-cho-data-analyst-khao-sat.html) — bản HTML có **prompt copy-paste** (nút sao chép), **flashcards** lật thẻ, **cheatsheet** và **theo dõi tiến độ**.

---

## 📚 Tổng Quan

**Mục tiêu:** Hướng dẫn cho team **Data Analyst xử lý khảo sát** (data hàng nghìn cột × hàng trăm nghìn dòng). Bạn **chưa biết code hay git cũng không sao** — hãy **nhờ AI viết trước, rồi nhờ AI giải thích từng bước để hiểu và biết AI sai chỗ nào mà sửa**. Qua vài vòng bạn tự chủ làm chủ công nghệ. Mọi thao tác qua **prompt tiếng Việt**.

> **Cách tiếp cận:** Không phải "không cần học gì". Cách đúng: *không cần biết ngay* → nhờ AI viết → nhờ AI giải thích cái nó vừa viết để hiểu → đọc hiểu đủ để bắt lỗi AI và yêu cầu sửa. Học qua làm, chủ động, từng bước.

**Bài toán thực:** Workflow cũ — tải data CSV → Excel → thêm 20-50 cột rule bằng công thức → cột phán quyết. Vấn đề: **2000 cột × 200k dòng làm Excel/PQ treo**. Lời giải: Python (do AI sinh code), xử lý theo cột (vector hóa) nên không bị.

**🚨 Bảo mật PII:** TUYỆT ĐỐI KHÔNG upload raw data có thông tin cá nhân (Tên, Email, SĐT...) lên AI công cộng (ChatGPT/Claude/Gemini web). Nguyên tắc "Chỉ xin Code - Chạy Local".

**Quy mô:** 18 phần · 4 nhóm chủ đề · 20+ prompt copy-paste · ~4–6 tuần

---

## 🗺️ Lộ Trình 4 Nhóm Chủ Đề (18 phần)

| Nhóm | Tên | Phần | Mục tiêu |
|---|---|---|---|
| **P1** | 🟦 Nền tảng & Context | 1–5 | Hiểu các file context; quy trình tương tác; ghi nhớ vào MD |
| **P2** | 🟩 Điều khiển AI xử lý | 6–11 | Chọn AI + bảo mật; giải mã; apply rule; phán quyết; báo cáo |
| **P3** | 🟨 Vòng đời Code & Git | 12–15 | Review code; cập nhật rule; pipeline; Git + PII |
| **P4** | 🟪 Thực chiến & Công cụ | 16–18 | Case study; thư viện prompt; cheatsheet |

---

# 🟦 P1 — NỀN TẢNG & CONTEXT

## Phần 1: ★ AI không hiểu data nếu thiếu context
Data chỉ có cột mã hóa (`profile-qbirthyear`). AI không biết cột đó chứa giá trị gì. **Context không phải "1 phát ăn ngay"** — là quá trình xây qua tương tác: mention 3 file setup → AI đọc tóm tắt → kiểm tra hiểu đúng → đưa rule+file bổ sung → xem kết quả tinh chỉnh. Context đến từ nhiều nguồn: 3 file setup (nền) + file rule + bảng merge ngành + file context cũ...

## Phần 2: Môi trường & vì sao Excel/PQ "tắc thở"
Excel/PQ không chịu nổi 2000 cột × 200k dòng (giới hạn RAM, xử lý từng dòng). Python xử lý theo cột (vector hóa) → vài giây. Cài: Python 3.12+, VS Code + extension Python/Jupyter, `pip install pandas openpyxl` (nhờ AI dẫn từng bước). **Thay thế:** Google Colab.

## Phần 3: ★ Nhận diện các file context & tác dụng
**3 file setup (nền):** questionnaire.csv (giải mã cột & giá trị), survey-structure.csv (loại câu hỏi), behavior.csv (rule validation). **File bổ sung (tùy dự án):** file rule DA, bảng merge ngành, bảng quota, file context cũ. Mention file kèm 1 câu mô tả tác dụng → AI tích hợp đúng. *Bạn biết file nào dùng làm gì — AI đọc nội dung.*

## Phần 4: ★ Quy trình tương tác & đưa rule cho AI
**4 lượt tương tác:** (1) Mention 3 file setup + data → AI đọc tóm tắt; (2) QA kiểm tra hiểu đúng; (3) Mention file rule + bổ sung → áp rule, in 5 dòng; (4) Xem kết quả, tinh chỉnh. Mỗi rule chỉ cần: mô tả tiếng Việt + tên cột liên quan. AI tự đọc setup để viết code.

## Phần 5: ★ Nhờ AI ghi nhớ context vào MD
Sau khi AI hiểu đúng → nhờ nó ghi vào `context_*.md`, `rules_*.md`, `README.md`. Lần sau chỉ cần mention MD — không phải quét lại 3 file setup. Context & rule là **tài sản dự án**, commit lên Git.

---

# 🟩 P2 — ĐIỀU KHIỂN AI XỬ LÝ

## Phần 6: ★ Chọn AI & Bảo mật Dữ liệu
**🚨 CẢNH BÁO ĐỎ PII:** KHÔNG upload raw data có thông tin cá nhân lên AI công cộng. Chỉ xin code → chạy local.

**Chọn model nhanh:** Khám nhanh data → ChatGPT (Advanced Data Analysis). Viết/review pipeline → Claude Sonnet 5. Nạp cả bộ 4 file → Gemini 3.6 Flash (context 1M). Dùng luân phiên được.

**5 loại interface (từ dễ → chuyên dụng):** ① chat web · ② desktop app (Claude/ChatGPT Desktop, đọc file local) · ③ CLI/terminal · ④ VS Code extension (xem diff — DA nên bắt đầu đây khi viết pipeline) · ⑤ IDE agent (Antigravity/Copilot Agent — quá mức cho CSV). Hành trình: bắt đầu ①② → pipeline chuyển ④ → ổn dùng ③/① review.

## Phần 7: ★ Cẩm nang CHỈ DÙNG CHAT (Web Interface)
Cho DA chỉ mở ChatGPT/Claude/Gemini trên trình duyệt (không cài VS Code, không CLI). Nguyên tắc **"Chỉ xin Code - Chạy Local"**: xin code từ AI → chạy trên máy mình → dán kết quả/lỗi lại cho AI sửa. Không bao giờ đẩy raw data lên web.

## Phần 8: Nhờ AI giải mã data file
AI đọc 3 file setup → tóm tắt cấu trúc (phần nào có câu gì, loại gì, option nào). Bạn định vị nhanh cột để viết rule. Nếu data quá lớn, dùng mẫu 100 dòng đầu để AI đọc cấu trúc.

## Phần 9: ★ Nhờ AI apply 20-50 cột rule (trọng tâm)
Quy trình: viết danh sách rule → đưa AI 3 file setup + data → AI sinh code tạo từng cột rule_* → verify 5 dòng → chạy data thật. **Ví dụ:** "SV 2007 năm 3-4 → nói xạo" (cột profile-qbirthyear + profile-qyear-of-study). AI tự so questionnaire để biết cách đọc giá trị. **Batch:** gom 20-50 rule thành 1 danh sách, AI sinh script tạo tất cả cột.

## Phần 10: ★ Nhờ AI tạo cột phán quyết cuối
Tổng hợp 20-50 cột rule → 1 cột (QUALIFIED/REVIEW/REJECT). Tùy dự án: đếm rule pass, hard fail, tính tổng điểm, composite. Luôn in phân bố + top lý do REJECT để "cảm" chất lượng (90% REJECT → rule quá khắt; 0% → quá lỏng).

## Phần 11: Nhờ AI thống kê & xuất file kết quả
Báo cáo: tỷ lệ đạt, top rule vi phạm, theo phân khúc, quota check. Xuất `qualified_data.csv` (chỉ QUALIFIED) + `report.xlsx`. Luôn yêu cầu AI viết 3 insight tiếng Việt ở đầu báo cáo.

---

# 🟨 P3 — VÒNG ĐỜI CODE & GIT

## Phần 12: ★ Nhờ AI check code rule cũ
Khi tỷ lệ REJECT bất thường hoặc nghi rule sai — nhờ AI review. Prompt tốt: dán 3 setup + code + mô tả triệu chứng cụ thể. AI bắt: đọc sai cách lưu data, NaN, quy chiếu câu cha. Nếu AI đọc cột sai → gửi 5 dòng data mẫu.

## Phần 13: ★ Cập nhật Rule khi DA đổi
Thêm/đổi/bỏ rule → cập nhật `context.md` trước, rồi nhờ AI sửa code. AI đánh dấu `# MỚI`, giải thích thay đổi, in lại phân bố để so sánh.

## Phần 14: Xây dựng Pipeline
Gom các bước thành `run_report.py`: load_setup → load_data → apply_rules → make_verdict → report. Chạy `python run_report.py surveys/q3_2025/`. Đợt sau thay folder → 10 phút thay 1.5 ngày.

## Phần 15: ★ Git cho Data lớn & PII
**Git = Google Drive cho code.** Chưa thuộc lệnh cũng được — nhờ AI sinh lệnh → copy–dán. Nhưng đừng dán mù: nhờ AI giải thích từng lệnh để dần hiểu. **`.gitignore` chuẩn:** loại trừ `*.csv`, `*.xlsx` data thật — KHÔNG push PII lên Git. Muốn học git bài bản: tham khảo `khoa-hoc-git.html` (tùy chọn).

---

# 🟪 P4 — THỰC CHIẾN & CÔNG CỤ

## Phần 16: Case study — 1 đợt khảo sát full loop
Nhận đợt Q3/2025 (48k respondents × 1850 cột) + 3 setup. **8 bước trong 2 giờ** (thay 1.5 ngày): chọn AI → giải mã → viết context + 35 rule → apply rule → phán quyết → báo cáo → pipeline → commit. Có meta-prompt kickoff để AI dẫn qua từng bước.

## Phần 17: Thư viện Prompt (copy-paste)
5 nhóm: giải mã & đọc setup, apply batch rule, phán quyết + báo cáo, review + update, commit Git. Tất cả có nút sao chép trong bản HTML.

## Phần 18: Cheatsheet (1 trang)
12 card: 4 file cần đưa AI, cách data lưu, context block, mô tả rule, mock code → Python, cột phán quyết, chọn model, prompt review, prompt update, pipeline, prompt Git, `.gitignore`, bảo mật PII.

---

## 🎯 Cách Học Hiệu Quả

1. **Đọc theo thứ tự P1→P4** — mỗi nhóm xây nền cho nhóm sau
2. **Hoàn thành Phần 3-4 trước** (file context + quy trình tương tác) — gốc rễ toàn bộ
3. Mỗi phần: đọc lý thuyết → copy prompt → chạy thử trên đợt khảo sát thật
4. **Phần 6 (bảo mật PII)** đọc kỹ ngay — tránh rò rỉ dữ liệu cá nhân
5. Cuối khóa, làm **Case study Phần 16** để xác nhận tự chủ

> Bản HTML có nút **"Đã học"** ở mỗi phần, lưu tiến độ trong trình duyệt.
