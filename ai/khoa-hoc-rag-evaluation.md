# 📊 Đánh Giá RAG Định Lượng — RAGAS &amp; TruLens

> Bản Markdown gọn. Bản tương tác (sidebar, bài tập tự chấm, RAG Eval Builder): [`khoa-hoc-rag-evaluation.html`](khoa-hoc-rag-evaluation.html)
> Cài: `pip install ragas`. Cần LLM làm giám khảo (OpenAI GPT-4o-mini) hoặc chạy local. Học RAG ở [LangChain](khoa-hoc-langchain.html) / [LlamaIndex](khoa-hoc-llamaindex.html), retrieval ở [Hybrid Search](khoa-hoc-hybrid-search-reranking.html) trước.

**16 chương · 4 cấp độ.** "Chấm điểm" AI bằng số liệu cụ thể thay vì cảm tính. RAGAS &amp; TruLens đo RAG theo 4 trục: <strong>Faithfulness</strong> (không ảo giác), <strong>Answer Relevancy</strong> (trúng câu hỏi), <strong>Context Precision/Recall</strong> (tìm đúng tài liệu). So sánh khách quan giữa các config RAG.

---

## L0 · Nền tảng

### Chương 1 — Vì sao cần đánh giá RAG định lượng
"AI trả lời có vẻ ổn" không đủ. Khi đổi chunk size, đổi model, thêm rerank — bạn cần biết <strong>cải thiện hay làm hỏng</strong>. Đánh giá bằng cảm tính = không tái lập được. Đánh giá định lượng = unit test cho RAG: chạy lại, so sánh số, quyết định dựa dữ liệu.

### Chương 2 — 4 chỉ số cốt lõi của RAG
| Chỉ số | Đo cái gì | Cao = |
|---|---|---|
| **Faithfulness** | Đáp án có dựa vào context không (không bịa) | Ít ảo giác |
| **Answer Relevancy** | Đáp án có trúng câu hỏi không | Đánh trúng ý |
| **Context Precision** | Context lấy về có cái nào thừa không | retrieval chính xác |
| **Context Recall** | Có lấy được đủ tài liệu cần để trả lời không | retrieval đầy đủ |

### Chương 3 — RAGAS vs TruLens
- **RAGAS** — framework thuần đánh giá; không cần "trace" (chỉ cần Q/context/answer). Đơn giản, phổ biến.
- **TruLens** — đánh giá + theo dõi trace (mỗi bước pipeline). Chi tiết hơn, tích hợp instrumentation.

Khóa này tập trung RAGAS (đủ cho hầu hết), giới thiệu TruLens cuối.

### Chương 4 — Setup
```bash
pip install ragas
```
RAGAS cần 1 LLM làm "giám khảo" (judge) — thường GPT-4o-mini (rẻ, đủ tốt) hoặc Claude.

&gt; **Bài tập 1:** `from ragas import evaluate` + `from ragas.llms import LangchainLLMWrapper`.

---

## L1 · Eval Set (Golden Dataset)

### Chương 5 — Golden Dataset là gì
Tập cố định các mẫu: <code>{question, contexts (đúng), answer (chuẩn)}</code>. Mỗi lần đổi RAG, chạy lại trên cùng tập → so sánh khách quan. Đây là "test set" cho RAG.

### Chương 6 — Sinh eval set bằng LLM
Dùng LLM đọc tài liệu, tự sinh (Q, A) — nhanh hơn gán tay:
```python
prompt = f"""Đọc tài liệu sau, sinh 5 cặp câu hỏi-trả lời.
Tài liệu: {chunk}
Format: JSON list [{{"question": "...", "answer": "..."}}, ...]"""
```
Sau đó người soát lỗi (loại câu quá dễ/sai).

&gt; **Bài tập 2:** Viết prompt sinh 5 câu Q&amp;A từ 1 chunk.

### Chương 7 — Format dataset cho RAGAS
RAGAS cần dataset có cột: <code>question, contexts, answer, ground_truth</code>. Dùng Hugging Face <code>Dataset</code> hoặc dict list.

### Chương 8 — Đảm bảo chất lượng eval set
- Đa dạng câu hỏi (factual, so sánh, đếm, lý thuyết).
- Không quá dễ (AI đoán mò cũng được) / quá khó (tài liệu không có đáp án).
- <strong>Holdout</strong> — giữ 1 phần riêng, không dùng tinh chỉnh.

---

## L2 · Chạy đánh giá

### Chương 9 — Judge LLM
Cấu hình LLM giám khảo (RAGAS dùng nó để chấm Faithfulness/Relevancy — các chỉ số cần suy luận):
```python
from ragas.llms import LangchainLLMWrapper
from langchain_openai import ChatOpenAI
judge = LangchainLLMWrapper(ChatOpenAI(model="gpt-4o-mini"))
```

&gt; **Bài tập 3:** Tạo <code>judge = LangchainLLMWrapper(ChatOpenAI(model="gpt-4o-mini"))</code>.

### Chương 10 — Chạy RAGAS
```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision, context_recall
result = evaluate(dataset=samples, metrics=[faithfulness, answer_relevancy,
              context_precision, context_recall], llm=judge)
print(result)   # điểm trung bình mỗi chỉ số (0-1)
```

&gt; **Bài tập 4:** Gọi <code>evaluate(dataset=samples, metrics=[...], llm=judge)</code>.

### Chương 11 — Đọc kết quả
Điểm 0-1 mỗi chỉ số. <strong>Faithfulness &lt; 0.5</strong> = RAG hay bịa → cần fix (chunking, system prompt). <strong>Context Recall thấp</strong> = retrieval hỏng → xem [Hybrid Search](khoa-hoc-hybrid-search-reranking.html).

### Chương 12 — TruLens (alternative)
TruLens tích hợp sâu hơn: instrument từng bước (retrieve → generate), vẽ trace, dashboard. Khi cần debug "tại sao câu này sai", TruLens cho thấy bước nào hỏng.

---

## L3 · Thực chiến

### Chương 13 — So sánh 2 config (Naive vs Advanced)
- **Config A (Naive):** chunk 1000 tokens, Dense top-3.
- **Config B (Advanced):** chunk 250 tokens, Hybrid + rerank top-5.
Chạy RAGAS trên cả 2 cùng eval set → bảng so sánh. Config B thường nhỉnh hơn toàn diện.

&gt; **Bài tập 5:** Viết vòng lặp chạy RAGAS cho 2 config &amp; in bảng so sánh.

### Chương 14 — Phân tích điểm yếu
Lọc các mẫu có điểm thấp (Faithfulness &lt; 0.5), đọc từng câu để tìm pattern: phải thu hẹp chunk? thêm system prompt "chỉ trả lời dựa context"? đổi embedding model?

### Chương 15 — Mẹo &amp; cạm bẫy
- **Judge LLM cũng sai** — kết hợp spot-check người.
- **Tốn token** — Faithfulness/Relevancy gọi judge nhiều lần; giới hạn mẫu nếu budget eo hẹp.
- **Overfit eval set** — giữ holdout, đánh giá định kỳ.
- **Đừng chỉ tối ưu 1 chỉ số** — Faithfulness 1.0 nhưng Answer Relevancy 0.2 = vô dụng.

### Chương 16 — Dự án: eval pipeline đầy đủ
Sinh eval set 50 mẫu từ tài liệu công ty → chạy RAG (Config A naive) → RAGAS → cải thiện (chunking/hybrid/rerank → Config B) → RAGAS lại → báo cáo so sánh + phân tích điểm yếu → CI chặn tụt điểm.

---

## 📋 Cheatsheet
| API | Tác dụng |
|---|---|
| `from ragas import evaluate` | Chạy đánh giá |
| `from ragas.metrics import ...` | Các chỉ số |
| `LangchainLLMWrapper(ChatOpenAI(...))` | Judge LLM |
| `evaluate(dataset, metrics, llm)` | Chấm điểm |

**4 chỉ số:** Faithfulness · Answer Relevancy · Context Precision · Context Recall. **Quy trình:** eval set → RAG config → RAGAS → so sánh.

## 🃏 Flashcards
- **Vì sao đánh giá định lượng?** Tái lập được, so sánh khách quan giữa các config.
- **Faithfulness?** Đáp án dựa vào context không (không bịa) — đo ảo giác.
- **Answer Relevancy?** Đáp án có trúng câu hỏi không.
- **Context Precision?** Context lấy về có thừa không.
- **Context Recall?** Lấy đủ tài liệu cần để trả lời không.
- **RAGAS vs TruLens?** RAGAS thuần eval; TruLens thêm trace/instrument.
- **Judge LLM?** LLM giám khảo (GPT-4o-mini), chấm Faithfulness/Relevancy.
- **Eval set?** Tập Q/context/answer chuẩn, cố định để so sánh.
- **Sinh eval set?** LLM đọc tài liệu tự sinh Q-A, người soát lỗi.
- **Config Naive?** Chunk lớn, dense top-3.
- **Config Advanced?** Chunk nhỏ, hybrid + rerank.
- **Faithfulness thấp?** RAG hay bịa — fix chunking/system prompt.

---
*Học kèm [LangChain](khoa-hoc-langchain.html) / [LlamaIndex](khoa-hoc-llamaindex.html) / [Hybrid Search](khoa-hoc-hybrid-search-reranking.html) · một phần của [Mega Study](../index.html).*
