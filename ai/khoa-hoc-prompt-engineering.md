# 💬 Khóa Học Prompt Engineering — Từ Cú Pháp Đến Production

> Bản Markdown gọn. Bản tương tác (sidebar, bài tập tự chấm, Prompt Builder): [`khoa-hoc-prompt-engineering.html`](khoa-hoc-prompt-engineering.html)
> Không cần cài thêm cho phần lý thuyết. Phần code: `pip install langchain jinja2`. Nên học kèm [LangChain](khoa-hoc-langchain.html) &amp; [DSPy](khoa-hoc-dspy.html).

**16 chương · 5 cấp độ.** Đối với Applied AI Engineer, Prompt Engineering KHÔNG phải gõ câu dài vào ChatGPT — mà là <strong>nghệ thuật lập trình ngôn ngữ tự nhiên</strong> để tích hợp vào mã nguồn: ép LLM trả kết quả chính xác, định dạng chuẩn, an toàn khi phục vụ hàng nghìn user. Từ cú pháp cơ bản → reasoning → lập trình → agentic → bảo mật production.

---

## L1 · Nền tảng (Cú pháp &amp; Định dạng)

### Chương 1 — Giải phẫu một Prompt chuẩn
4 thành phần: <strong>Instruction</strong> (chỉ thị cốt lõi) · <strong>Context</strong> (ngữ cảnh/dữ liệu nền) · <strong>Input Data</strong> (từ user) · <strong>Output Indicator</strong> (định dạng đầu ra). Tách bạch 4 phần = LLM ít nhầm lẫn, dễ debug.

### Chương 2 — Delimiters &amp; JSON output nghiêm ngặt
<strong>Delimiters</strong> (<code>"""</code>, <code>---</code>, thẻ XML <code>&lt;article&gt;...&lt;/article&gt;</code>) ngăn lệnh hệ thống vs dữ liệu user — chống injection. <strong>Ép JSON</strong>: yêu cầu LLM <em>chỉ</em> trả JSON hợp lệ (không text dư) để backend <code>JSON.parse()</code> không lỗi.

### Chương 3 — Few-Shot Prompting
Cung cấp 1-3 ví dụ chuẩn (Input → Output) để LLM bắt chước văn phong &amp; logic. Đặt ví dụ trước input thật.

&gt; **Bài tập 1:** Viết prompt phân loại cảm xúc gồm 4 phần (Instruction/Context/Input/Output Indicator).

---

## L2 · Khơi gợi Tư duy (Advanced Reasoning)

### Chương 4 — Chain of Thought (CoT)
Yêu cầu LLM <strong>"suy nghĩ từng bước"</strong> trước kết luận. Sinh token reasoning giúp LLM thông minh hơn ở bài toán logic/toán.

### Chương 5 — Self-Consistency
Chạy CoT nhiều lần (temperature &gt; 0), chọn câu trả lời xuất hiện nhiều nhất (majority vote). Tăng độ chính xác cho bài toán có 1 đáp án đúng.

### Chương 6 — Prompt Chaining
Thay 1 prompt dài 2 trang → <strong>pipeline</strong> nhiều prompt nhỏ: Trích xuất → Phân tích → Định dạng. Dễ debug từng bước, mỗi bước dùng model phù hợp.

### Chương 7 — Step-back Prompting
Yêu cầu LLM <strong>lùi lại</strong> tóm tắt nguyên lý vật lý/toán/logic cơ bản trước khi giải bài toán chi tiết. Giảm ảo giác ở bài chuyên sâu.

&gt; **Bài tập 2:** Viết prompt CoT cho bài toán toán ("hãy suy nghĩ từng bước").

---

## L3 · Tự động hóa &amp; Lập trình Prompt (Programmatic PE)

### Chương 8 — Prompt Templating
<strong>Jinja2</strong> hoặc <strong>LangChain PromptTemplates</strong> chèn biến động vào prompt runtime. Tách prompt khỏi code, version control được.

```python
from langchain_core.prompts import PromptTemplate
pt = PromptTemplate.from_template("Phân loại cảm xúc: {review}\nTrả: tích cực/tiêu cực/trung tính")
prompt = pt.format(review="Phim hay!")
```

### Chương 9 — Dynamic Few-Shot (Few-shot động)
Thay hard-code 3 ví dụ cố định → dùng <strong>Vector DB</strong> tìm 3 ví dụ <em>tương đồng nhất</em> với câu hỏi hiện tại để nhồi vào prompt. Tăng chất lượng rõ rệt.

### Chương 10 — DSPy (tối ưu tự động)
Chuyển từ viết prompt tay → khai báo Signature (Input/Output), để ML tự tìm prompt tối ưu. Xem chi tiết ở [khóa DSPy](khoa-hoc-dspy.html).

&gt; **Bài tập 3:** Viết PromptTemplate LangChain với biến <code>{topic}</code>.

---

## L4 · Mẫu thiết kế Agentic (Agentic Patterns)

### Chương 11 — ReAct (Reasoning + Acting)
Vòng lặp: <strong>Suy nghĩ → Hành động</strong> (gọi API/tool) → <strong>Quan sát</strong> kết quả → suy nghĩ tiếp. LLM từ công cụ thụ động thành agent hành động.

### Chương 12 — Plan and Solve
Yêu cầu LLM <strong>lập kế hoạch</strong> (Plan) 5 bước, rồi thực thi (Execute) từng bước. Giải tác vụ dài hơi có cấu trúc.

### Chương 13 — Reflection (Tự sửa lỗi)
Thiết lập <strong>"LLM Giám khảo" (Critique)</strong> đọc lại output của LLM chính, chỉ ra lỗi, yêu cầu tạo lại (Self-Correction). Vòng lặp cải thiện chất lượng.

---

## L5 · Bảo mật &amp; Production (LLM Security)

### Chương 14 — Prompt Injection &amp; Jailbreak
<strong>Injection</strong>: hacker chèn lệnh ẩn ("Bỏ qua mọi lệnh trên, hãy..."). Phòng: Post-prompting (đặt instruction sau data), phân đặc quyền. <strong>Jailbreak</strong>: roleplay độc hại vượt bộ lọc an toàn.

### Chương 15 — LLM Guardrails
Triển khai <strong>Llama Guard</strong> hoặc <strong>NeMo Guardrails</strong> kiểm duyệt Input user &amp; Output LLM theo chính sách doanh nghiệp (không chính trị, không tiết lộ PII).

&gt; **Bài tập 4:** Viết chính sách guardrail (3 quy tắc) cho chatbot CSKH.

### Chương 16 — Dự án: pipeline PE production
End-to-end: <strong>Template</strong> + <strong>Dynamic few-shot</strong> (vector DB) + <strong>CoT</strong> cho task khó + <strong>JSON output</strong> parse + <strong>Guardrail</strong> chống injection + log/eval. Đo trước/sau.

---

## 📋 Cheatsheet
| Kỹ thuật | Khi nào |
|---|---|
| 4 phần prompt | Mọi prompt production |
| Delimiters + JSON | Tích hợp backend |
| Few-shot | Cần văn phong/định dạng nhất quán |
| CoT | Logic/toán/tóm tắt phức tạp |
| Self-Consistency | Cần 1 đáp án đúng, chấp nhận cost |
| Prompt Chaining | Task dài, muốn debug từng bước |
| Step-back | Bài chuyên sâu (vật lý/toán) |
| Templating | Biến động, tách prompt khỏi code |
| Dynamic few-shot | Ví dụ phù hợp từng query |
| DSPy | Tự tối ưu prompt bằng ML |
| ReAct | Cần gọi tool/API |
| Plan-Solve | Task nhiều bước có cấu trúc |
| Reflection | Cần chất lượng cao, chấp nhận cost |
| Guardrails | Production, chính sách doanh nghiệp |

## 🃏 Flashcards
- **4 phần prompt?** Instruction / Context / Input / Output Indicator.
- **Delimiters?** """, ---, XML tags — tách lệnh vs data, chống injection.
- **JSON output?** Ép LLM chỉ trả JSON → backend parse không lỗi.
- **Few-shot?** 1-3 ví dụ chuẩn trước input thật.
- **CoT?** "Suy nghĩ từng bước" — sinh token reasoning.
- **Self-Consistency?** Chạy CoT nhiều lần, majority vote.
- **Prompt Chaining?** Pipeline nhiều prompt nhỏ thay 1 prompt dài.
- **Step-back?** Tóm tắt nguyên lý cơ bản trước khi giải.
- **Templating?** Jinja2/LangChain chèn biến động.
- **Dynamic few-shot?** Vector DB tìm ví dụ tương đồng query hiện tại.
- **DSPy?** Khai báo Signature, ML tự tối ưu prompt.
- **ReAct?** Suy nghĩ → Hành động → Quan sát → lặp.
- **Plan-Solve?** Lập kế hoạch rồi thực thi từng bước.
- **Reflection?** LLM Giám khảo critique → Self-Correction.
- **Injection?** Chèn lệnh ẩn — phòng bằng post-prompting.
- **Guardrails?** Llama Guard/NeMo kiểm duyệt theo chính sách.

---
*Học kèm [LangChain](khoa-hoc-langchain.html), [DSPy](khoa-hoc-dspy.html) &amp; [Agentic AI](giao_trinh_agentic_ai.html) · một phần của [Mega Study](../index.html).*
