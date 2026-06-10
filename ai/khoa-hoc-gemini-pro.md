# ✦ Khóa Học Gemini Pro cho Nghiên cứu & Dữ liệu (Không cần code)

> Bản Markdown gọn nhẹ. Phiên bản tương tác (Prompt Builder, thư viện prompt copy-paste, flashcards, quiz) ở file `khoa-hoc-gemini-pro.html`.

Dành cho **team nghiên cứu** làm việc với **database, SPSS, Excel** và **viết báo cáo** — khai thác toàn bộ Gemini Pro mà không cần lập trình. Phủ: **Gemini app, Google Workspace, NotebookLM, Google AI Studio**.

> ⚠️ Google đổi tên gói/model/tính năng rất thường xuyên. Nội dung bám trạng thái **2026** (Gemini 2.5/3 Pro, gói Google AI Plus/Pro/Ultra, hàm `=AI()` trong Sheets, Workspace Intelligence, NotebookLM Audio/Video Overview, Deep Research). Nguyên tắc vẫn đúng dù giao diện đổi.

**Lộ trình:** L0 Nhập môn (1–4) → L1 Workspace (5–9) → L2 Nghiên cứu (10–13) → L3 Dữ liệu & Báo cáo (14–19).

---

# L0 — NHẬP MÔN

## CH1. Gemini Pro là gì & bạn có gì
- **Gemini Pro** = tầng model mạnh nhất (Gemini 2.5/3 Pro), truy cập qua gói **Google AI Pro/Ultra** (trước gọi "Gemini Advanced").
- **Bản đồ hệ sinh thái:**
  - **Gemini app** (gemini.google.com): chat, Gems, Deep Research, Canvas — hỏi đáp, brainstorm, viết, phân tích file.
  - **Gemini trong Workspace**: nhúng trong Gmail/Docs/Sheets/Slides/Meet/Drive — làm việc ngay trong tài liệu.
  - **NotebookLM**: trợ lý nghiên cứu đóng khung theo nguồn của bạn, trả lời **có trích dẫn** (ít bịa nhất).
  - **Google AI Studio**: phòng thí nghiệm tinh chỉnh chi tiết, ngữ cảnh siêu dài, xử lý hàng loạt.
- **Chọn nhanh:** tài liệu của bạn → NotebookLM; chủ đề mới trên web → Deep Research; Excel/email → Workspace; kiểm soát chi tiết → AI Studio.
- **Hạn mức 2026:** theo "compute", làm mới mỗi 5 giờ, có trần tuần. Tính năng nặng tốn nhanh hơn.
- **Quyền riêng tư (quan trọng):** tài khoản cá nhân có thể bị dùng dữ liệu để cải thiện sản phẩm → tắt *Gemini Apps Activity* nếu nhạy cảm. Tài khoản **Workspace tổ chức KHÔNG** dùng dữ liệu để huấn luyện → ưu tiên cho dữ liệu nghiên cứu. Luôn ẩn danh PII.

## CH2. Giao diện & thiết lập
- Chọn model (nhanh/Flash vs Pro/Thinking), 📎 đính kèm, Deep Research, Canvas, Gems, lịch sử & bộ nhớ.
- 3 thói quen: mỗi chủ đề một chat mới; dùng Canvas cho tài liệu dài; kiểm tra model đang chọn trước việc khó.
- Thiết lập: đăng nhập đúng tài khoản (ưu tiên tổ chức), kiểm tra cài đặt quyền riêng tư, đặt ngôn ngữ.

## CH3. Nghệ thuật viết prompt (quan trọng nhất)
- **Khung V-B-N-Đ-V:** Vai trò + Bối cảnh + Nhiệm vụ + Định dạng + Ví dụ.
- 7 kỹ thuật: cụ thể hóa; cho ví dụ (few-shot); chỉ định định dạng; chia bước; yêu cầu hỏi lại khi thiếu thông tin; lặp & tinh chỉnh; gán vai trò & đối tượng.
- Mẹo: nhờ chính Gemini viết prompt giúp bạn.
- **Mẫu prompt tốt:**
```
Bạn là [vai trò].
BỐI CẢNH: [tình huống + dữ liệu].
NHIỆM VỤ: [việc cần làm cụ thể].
YÊU CẦU: - định dạng [...]; - giọng văn [...]; - [ràng buộc].
Nếu thiếu thông tin, hãy hỏi tôi trước khi trả lời.
```

## CH4. Làm việc đa phương thức
- Đính kèm PDF/Word/ảnh/ảnh màn hình/Excel/CSV/file Drive. Model Pro đọc tài liệu rất dài.
- Dùng cho: tóm tắt bài báo, trích bảng từ ảnh thành dữ liệu gõ được, đọc output phần mềm.
- ⚠️ Luôn kiểm chứng số liệu trích từ ảnh (AI có thể đọc sai/đoán).

---

# L1 — WORKSPACE & NĂNG SUẤT

## CH5. Gemini trong Gmail
- Side panel ✦, "Help me write", nút tóm tắt luồng.
- Việc: tóm tắt email dài, soạn thư, trả lời nhanh, trích việc cần làm, tìm email.
- Luôn đọc lại trước khi gửi.

## CH6. Gemini trong Docs
- "Help me write" + side panel. Dàn ý báo cáo, viết nháp từng mục, chỉnh giọng/độ dài, tóm tắt.
- **Quy trình viết:** dàn ý → bổ sung dữ liệu → AI viết nháp → bạn biên tập & kiểm chứng → soát lỗi.

## CH7. Gemini trong Sheets & =AI() (trọng tâm dữ liệu)
- **Side panel:** mô tả việc bằng lời → Gemini tính thống kê, vẽ biểu đồ, dựng pivot, conditional formatting, thậm chí xây cả dashboard.
- **Hàm `=AI("hướng dẫn", ô)`:** phân loại, phân tích cảm xúc, trích xuất, tóm tắt hàng loạt.
```
=AI("Phân loại phản hồi vào: Giá, Chất lượng, Dịch vụ, Khác", A2)
=AI("Cảm xúc? Trả lời: Tích cực/Trung lập/Tiêu cực", A2)
```
- ⚠️ Kết quả =AI() do model sinh → rà soát mẫu, cân nhắc "paste as values".

## CH8. Workspace Intelligence, Drive & Meet
- **Workspace Intelligence (2026):** Gemini đọc xuyên Drive/Gmail/Chat/Lịch để trả lời (có công tắc quản trị).
- Gemini trong Drive (tóm tắt file không cần mở); Meet ("take notes for me" → biên bản & việc cần làm).
- Chỉ đọc dữ liệu bạn có quyền; cẩn trọng tài liệu nhạy cảm.

## CH9. Tạo Gems tùy chỉnh
- Gem = phiên bản Gemini cấu hình sẵn (vai trò + hướng dẫn + tài liệu nền). Chuẩn hóa quy trình lặp cho team.
- Cấu trúc: vai trò & mục tiêu / quy trình / định dạng / ràng buộc / tài liệu nền.
- Ý tưởng: trợ lý tóm tắt bài báo, viết biên bản họp, chuẩn hóa thuật ngữ, "reviewer khó tính".

---

# L2 — NGHIÊN CỨU

## CH10. NotebookLM — nền tảng
- Đóng khung theo **nguồn bạn tải lên**, trả lời **có trích dẫn** → tin cậy nhất cho nghiên cứu.
- Nguồn: PDF, Docs, Slides, URL, YouTube, audio, EPUB (mỗi nguồn ~500k từ).
- Quy trình: tạo notebook → add sources → hỏi (có trích dẫn) → tạo nhanh tóm tắt/FAQ/study guide/timeline/briefing → lưu Notes.
- Vẫn bấm vào trích dẫn để xác minh đoạn gốc.

## CH11. NotebookLM nâng cao
- **Audio Overview:** "podcast" 2 người dẫn AI từ tài liệu của bạn (tùy chỉnh chủ đề/độ dài, tham gia hỏi).
- **Video Overview (2026):** video deep-dive có hình minh họa.
- **Deep Research trong NotebookLM:** chủ động tìm nguồn mới (agentic), vẫn giữ trích dẫn.
- Briefing doc 1 trang cho cả nhóm.

## CH12. Deep Research (Gemini app)
- Chế độ "đại lý": lập kế hoạch → duyệt nhiều nguồn web (+ file bạn tải) → báo cáo dài có trích dẫn.
- Quy trình: bật Deep Research → nhập chủ đề → duyệt/chỉnh kế hoạch → chạy → báo cáo → đưa vào Canvas.
- **NotebookLM vs Deep Research:** đã có tài liệu & cần chính xác → NotebookLM; chưa có & cần khảo sát web → Deep Research. Kết hợp: Deep Research tìm nguồn → NotebookLM khai thác sâu.
- ⚠️ Kiểm chứng nguồn web (chất lượng không đồng đều).

## CH13. Literature review end-to-end
- 6 bước: (1) phác thảo phạm vi [Gemini] → (2) khảo sát rộng [Deep Research] → (3) thu thập & sàng lọc [bạn] → (4) khai thác sâu [NotebookLM: bảng so sánh, tìm gap] → (5) viết [Docs+Gemini] → (6) hoàn thiện & kiểm chứng.
- **Liêm chính:** AI có thể bịa trích dẫn ("citation ảo") — **tự kiểm tra mọi trích dẫn**. Tuân thủ quy định dùng AI của tạp chí/đơn vị.

---

# L3 — DỮ LIỆU · THỐNG KÊ · BÁO CÁO

## CH14. Phân tích dữ liệu không cần code
- Đính kèm CSV/Excel → EDA: mô tả cấu trúc, thống kê mô tả, giá trị thiếu/ngoại lai, phát hiện chính, gợi ý biểu đồ.
- Quy trình "hỏi dữ liệu": mô tả dữ liệu → khám phá → câu hỏi nghiệp vụ → trực quan & báo cáo.
- ⚠️ File lớn AI có thể chỉ xem mẫu — hỏi "đã dùng bao nhiêu dòng?"; đối chiếu số với Sheets/SPSS.

## CH15. Database không cần SQL
- Mô tả nhu cầu tiếng Việt → Gemini viết **SQL**, giải thích, sửa lỗi.
- **Bí quyết:** dán **schema** (tên bảng & cột), không cần dán dữ liệu thật → query chính xác hơn.
- ⚠️ Chỉ chạy SQL bạn hiểu; cực thận trọng UPDATE/DELETE/DROP; thử trên bản sao. (Xem khóa PostgreSQL trong thư viện này.)

## CH16. Trợ lý SPSS & thống kê
- Gemini = cố vấn thống kê: chọn phép kiểm định, viết **SPSS syntax**, kiểm tra giả định, **đọc hộ output** (kể cả ảnh chụp).
- Mẫu: tư vấn chọn test (nêu giả định + phương án thay thế); sinh syntax (ANOVA + post-hoc + Levene); diễn giải kết quả thành câu đưa vào báo cáo.
- ⚠️ Cẩn trọng gấp đôi: AI có thể nhầm khái niệm/đọc sai số. Kết luận cuối do bạn xác nhận. "Ý nghĩa thống kê ≠ thực tiễn"; "tương quan ≠ nhân quả".

## CH17. Quy trình tạo Report hoàn chỉnh
- 6 giai đoạn: chuẩn bị dữ liệu [Sheets+=AI] → phân tích [Gemini/SPSS] → cấu trúc [Docs+Gemini] → trực quan [Sheets] → trình bày [Slides+Gemini] → rà soát.
- Mẫu: tóm tắt điều hành (~200 từ) cho lãnh đạo; dàn ý 10 slide.
- Mẹo: tạo Gem "Trợ lý báo cáo của nhóm" chứa style guide để đồng nhất.

## CH18. Google AI Studio cho người không code
- Web **miễn phí** (aistudio.google.com), dùng được không cần code.
- **Bắt đầu:** đăng nhập → Create Prompt → gõ ở giữa, chỉnh ở **Run settings** (phải) → Run. **Save** lưu vào Drive/chia sẻ team.
- **Bản đồ:** Model (trên phải) · System instructions (ô trên) · khung prompt + đếm token (giữa) · Run settings (phải) · Run/Save.
- **3 núm chính:** **Temperature 0–2** (phân tích → 0–0.3 ổn định) · **Structured output** (luôn trả JSON theo khuôn → đổ vào Sheets) · **Grounding with Google Search** (tra web, bớt bịa).
- **Ví dụ thực chiến — trích thông tin từ nhiều bài báo thành bảng:** đặt System instructions (trích đúng trường, không bịa) → Temperature=0 → bật Structured output với khuôn JSON (tac_gia_nam, muc_tieu, mau, phuong_phap, ket_qua_chinh, han_che) → đính kèm từng PDF, Run, copy JSON → gộp các dòng JSON thành bảng trong Sheets.
- Dùng AI Studio khi cần: kết quả đều khuôn lặp lại / temperature thấp / tài liệu cực dài / so sánh model. Hỏi đáp thường ngày → app tiện hơn.
- ⚠️ **Dữ liệu nhạy cảm:** free tier có thể **dùng prompt & output của bạn để cải thiện model** → KHÔNG dán dữ liệu chưa ẩn danh. Dùng môi trường trả phí/doanh nghiệp (**Vertex AI**/cấu hình tổ chức) cho dữ liệu thật; giữ bí mật **API key**.

## CH19. Kiểm chứng, đạo đức & bảo mật (quan trọng nhất)
- **Hallucination:** AI tự tin nói sai/bịa (số liệu, tên bài báo, DOI). Thói quen kiểm chứng:
  - Mọi số liệu → đối chiếu nguồn/công cụ chính xác.
  - Mọi trích dẫn → tự kiểm tra có thật & đúng nội dung.
  - Ưu tiên NotebookLM (có trích dẫn) cho khẳng định quan trọng.
  - Hỏi "nguồn nào? độ chắc chắn?"; kết luận khoa học cần người chuyên môn rà soát.
- **Bảo mật:** ẩn danh PII trước; dùng tài khoản tổ chức; tuân thủ quy định (đồng thuận, IRB, bảo vệ dữ liệu); cân nhắc chỉ dán metadata.
- **Liêm chính & thiên kiến:** khai báo việc dùng AI nếu được yêu cầu; AI hỗ trợ quy trình không thay tư duy; cảnh giác thiên kiến, kiểm tra chéo nguồn.
- **Nguyên tắc vàng:** *Bạn là tác giả & người chịu trách nhiệm.* Mọi số liệu/trích dẫn/kết luận phải do bạn kiểm chứng & đứng tên.

---

## 📦 Thư viện Prompt (rút gọn — xem HTML để copy nhanh)
- **Nghiên cứu:** phản biện lập luận; giải thích khái niệm 3 cấp độ; soạn câu hỏi phỏng vấn/khảo sát.
- **Dữ liệu/Excel:** đề xuất biểu đồ; nhờ viết công thức Sheets; phát hiện vấn đề chất lượng dữ liệu.
- **Thống kê/SPSS:** kiểm tra giả định; viết phần "Kết quả" từ số liệu.
- **Báo cáo/Email:** rút gọn theo độ dài; báo cáo → email cập nhật; chuẩn hóa thuật ngữ.

## 📋 Cheatsheet
**Chọn công cụ:** tài liệu của bạn → NotebookLM • web mới → Deep Research • Excel → Gemini in Sheets • email/doc → Gmail/Docs • quy trình lặp → Gems • đều khuôn/dài/chi tiết → AI Studio.

**Câu lệnh chỉnh nhanh:** "Rút còn N từ" • "Trang trọng hơn" • "Giải thích cho người không chuyên" • "Chuyển thành bảng" • "Chỉ tập trung phần X" • "Nguồn nào? Chỗ nào không chắc?".

**Quy tắc 3 chữ V:** **Vai trò** (AI đóng vai ai) · **Văn cảnh** (bối cảnh + dữ liệu) · **Verify** (luôn kiểm chứng).

---
*Khóa học Gemini Pro cho nghiên cứu & dữ liệu — không cần code. Tham khảo tài liệu chính thức Google tới 2026; tính năng có thể thay đổi.*
