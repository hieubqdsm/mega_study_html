# ⚡ Khóa Học DSPy — Lập Trình & Tối Ưu Prompt Bằng Code

> Bản Markdown gọn. Bản tương tác (sidebar, bài tập tự chấm, Signature Builder): [`khoa-hoc-dspy.html`](khoa-hoc-dspy.html)
> Cài: `pip install dspy`. Cần API key của một LLM provider (OpenAI/Anthropic) hoặc chạy local (Ollama).

**16 chương · 4 cấp độ.** DSPy là framework của Stanford NLP — thay "gõ prompt bằng text" bằng **khai báo code** rồi để framework **tự tìm prompt/few-shot tối ưu** bằng machine learning. Học xong đổi tư duy từ "Kỹ sư gõ text" sang "Kỹ sư lập trình AI".

---

## L0 · Nhập môn

### Chương 1 — DSPy là gì
DSPy (Declarative Self-improving Language Programs, python) = framework của Stanford NLP (2023). Triết lý: thay vì viết prompt bằng text & thử-nhầm nhiều lần, **khai báo luồng chương trình bằng code**, rồi để framework **tự sinh & tối ưu prompt** (instruction + few-shot) bằng ML.

| | Manual Prompting | DSPy |
|---|---|---|
| Viết prompt | Tay, thử-nhầm | Khai báo Signature, code tự sinh |
| Few-shot | Chọn tay, cố định | Tự sinh + chắt lọc (Bootstrap) |
| Đổi model | Viết lại prompt | Compile lại, prompt tự thích ứng |
| Scale | Chắp vá | Version control được, tái lập |

### Chương 2 — Sự cạn kiệt của prompt truyền thống
Prompt text dài: khó bảo trì, phụ thuộc cảm tính, không tái dùng giữa model, khó tối ưu. DSPy tách **luồng chương trình** (program flow) khỏi **tham số** (prompt strings) — giống nguyên lý *separation of concerns* trong kỹ thuật phần mềm. Bạn lo logic; DSPy lo wordsmithing.

### Chương 3 — Cài đặt & config LM
```python
import dspy
lm = dspy.LM("openai/gpt-4o-mini", api_key="sk-...")
dspy.configure(lm=lm)        # đặt làm LM mặc định toàn cục
```
Hỗ trợ nhiều provider: `openai/...`, `anthropic/...`, `ollama/...` (local). Một LM duy nhất dùng cho mọi module.

> **Bài tập 1:** `dspy.LM("openai/gpt-4o-mini")` rồi `dspy.configure(lm=lm)`.

### Chương 4 — Pipeline đầu tiên (Predict)
```python
classify = dspy.Predict("sentence -> sentiment")
r = classify(sentence="Phim này hay quá!")
print(r.sentiment)   # "tích cực"
```
Signature `"sentence -> sentiment"` đủ để DSPy tự sinh prompt hoàn chỉnh. Không viết 1 dòng text prompt nào.

---

## L1 · Primitives (các khối xây dựng)

### Chương 5 — Signature
Signature = khai báo Input/Output. Hai dạng:

**Dạng chuỗi** — gọn cho việc nhanh:
```python
qa = dspy.Predict("question -> answer")
```

**Dạng class (typed)** — đầy đủ, có docstring & mô tả trường:
```python
class QA(dspy.Signature):
    """Trả lời câu hỏi事实, ngắn gọn."""
    question = dspy.InputField()
    answer = dspy.OutputField(desc="tối đa 1 câu, chính xác")
```

### Chương 6 — Module Predict
`Predict` = module đơn giản nhất: gọi LLM đúng 1 lần theo signature. Là "viên gạch nền" — mọi module khác mở rộng từ đây.

### Chương 7 — Module ChainOfThought
`ChainOfThought` = thêm trường **reasoning** trước output. DSPy tự chèn bước suy luận (tương đương "Let's think step by step") — tăng chất lượng cho bài toán khó.

```python
solve = dspy.ChainOfThought("question -> answer")
print(solve(question="2+2?").reasoning)   # "2 cộng 2 bằng..."
```

> **Bài tập 2:** Tạo module `dspy.ChainOfThought("question -> answer")`.

### Chương 8 — Module ReAct & compose
`ReAct` = module dùng **tool** (Reason + Act): LLM suy luận → gọi tool → đọc kết quả → lặp. Module có thể **compose** (lồng nhau) — ghép nhiều bước thành pipeline phức tạp (giống function composition).

---

## L2 · Tối ưu hóa (Teleprompter)

### Chương 9 — Teleprompter là gì
**Teleprompter** = "trình biên dịch prompt". Nhận (module gốc + trainset + metric) → trả về module **đã tối ưu**: prompt/few-shot được sinh & chọn tự động. Quá trình gọi là **compile** — giống compile code: code → bytecode tối ưu.

### Chương 10 — BootstrapFewShot
`BootstrapFewShot` chạy module trên trainset, giữ lại các ví dụ **thành công** (đạt metric) làm few-shot demos. Tự động chọn ví dụ tốt — không cần đoán.

```python
from dspy.teleprompt import BootstrapFewShot
tele = BootstrapFewShot(metric=my_metric, max_bootstrapped_demos=4)
compiled = tele.compile(student=classify, trainset=trainset)
```

> **Bài tập 3:** Gọi `tele.compile(student=classify, trainset=trainset)`.

### Chương 11 — MIPRO / COPRO
- **MIPRO** — tối ưu cả *instruction* (prefix) lẫn few-shot bằng tìm kiếm Bayesian. Mạnh nhưng tốn token.
- **COPRO** — tối ưu instruction, rẻ hơn MIPRO. Đủ cho hầu hết bài toán.

### Chương 12 — Metrics (hàm đánh giá)
Metric nhận `(example, pred, trace)` → trả số/bool. Có thể exact-match, hoặc dùng **LLM-as-judge** cho output tự do.

```python
def exact_match(example, pred, trace=None):
    return example.answer.strip().lower() == pred.answer.strip().lower()
```

---

## L3 · Thực chiến

### Chương 13 — Inspect: xem prompt DSPy sinh
Sau khi gọi module, `dspy.inspect_history(n=1)` in prompt **thật sự** gửi cho LLM. Quan trọng để hiểu DSPy đã sinh instruction/few-shot gì — không còn "hộp đen".

> **Bài tập 4:** Gọi `dspy.inspect_history(n=1)` để xem prompt cuối cùng.

### Chương 14 — So sánh manual vs DSPy
Đo accuracy trên tập eval: **baseline** (Predict không compile) vs **compiled** (Bootstrap). Thường compiled nhỉnh hơn vài %, ổn định hơn, và — quan trọng — **tự động** thay vì đoán prompt.

### Chương 15 — Mẹo & lỗi thường gặp
- **Metric phải xác đáng** — metric sai = tối ưu sai hướng.
- **Trainset đủ đa dạng** — vài chục example tốt hơn rất nhiều ví dụ giống nhau.
- **Compile tốn token** — chạy nhiều lần trên trainset; giới hạn `max_*` để kiểm soát chi phí.
- **Overfit trainset** — giữ holdout eval riêng; đừng compile trên chính tập eval.
- **Đổi model → compile lại** — prompt tối ưu khác nhau giữa GPT-4o-mini và Claude.

### Chương 16 — Dự án: classification/QA pipeline
End-to-end: dataset → `Signature` typed → `ChainOfThought` → `BootstrapFewShot` compile → `Evaluate` trên testset → so sánh baseline vs compiled → inspect prompt.

> **Bài tập 5:** Khởi tạo module Predict với signature `"review -> sentiment"`.

---

## 📋 Cheatsheet
| API | Tác dụng |
|---|---|
| `dspy.LM("openai/...")` | Config model |
| `dspy.configure(lm=...)` | Đặt LM toàn cục |
| `dspy.Predict("in -> out")` | Module cơ bản |
| `dspy.ChainOfThought(sig)` | Module có reasoning |
| `dspy.ReAct(sig, tools=[...])` | Module dùng tool |
| `class X(dspy.Signature)` | Signature typed |
| `BootstrapFewShot(metric=...)` | Teleprompter few-shot |
| `tele.compile(student=, trainset=)` | Tối ưu module |
| `dspy.inspect_history(n=)` | Xem prompt sinh |
| `Evaluate(devset=, metric=)` | Đánh giá |

**Quy trình:** Khai báo Signature → Module → (tuỳ chọn) Compile với metric → Evaluate. **Kinh nghiệm:** metric chuẩn > nhiều data; compile tốn token nên giới hạn demos.

## 🃏 Flashcards
- **DSPy là gì?** Framework Stanford: khai báo luồng bằng code, tự tối ưu prompt bằng ML.
- **Manual vs DSPy?** Manual: gõ text thử-nhầm. DSPy: khai báo Signature, code sinh prompt.
- **Signature?** Khai báo Input → Output (chuỗi hoặc class typed).
- **Predict?** Module cơ bản: gọi LLM 1 lần theo signature.
- **ChainOfThought?** Module tự thêm trường reasoning trước output.
- **ReAct?** Module dùng tool (reason + act).
- **Teleprompter?** "Trình biên dịch" — tối ưu prompt/few-shot tự động.
- **Compile?** Quá trình teleprompter trả về module đã tối ưu.
- **BootstrapFewShot?** Sinh few-shot từ ví dụ thành công trên trainset.
- **MIPRO vs COPRO?** MIPRO tối ưu instruction+few-shot (Bayesian); COPRO chỉ instruction (rẻ hơn).
- **Metric?** Hàm (example, pred, trace) → số/bool; có thể LLM-as-judge.
- **inspect_history?** Xem prompt thật DSPy gửi cho LLM.
- **Đổi model?** Compile lại — prompt tối ưu khác nhau giữa các model.

---
*Học kèm [LangChain](khoa-hoc-langchain.html) & [MCP](khoa-hoc-mcp.html) · một phần của [Mega Study](../index.html).*
