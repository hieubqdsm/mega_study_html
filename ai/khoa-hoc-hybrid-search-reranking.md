# 🔍 Hybrid Search &amp; Re-ranking — Nâng Recall RAG Lên &gt;90%

> Bản Markdown gọn. Bản tương tác (sidebar, bài tập tự chấm, Hybrid Builder): [`khoa-hoc-hybrid-search-reranking.html`](khoa-hoc-hybrid-search-reranking.html)
> Cài: `pip install qdrant-client sentence-transformers FlagEmbedding rank-bm25`. Nên học RAG ở [LangChain](khoa-hoc-langchain.html) / [LlamaIndex](khoa-hoc-llamaindex.html) trước.

**16 chương · 4 cấp độ.** Kết hợp tìm kiếm từ khóa (Sparse/BM25) + ngữ nghĩa (Dense) + xếp hạng lại (Cross-encoder) để nâng **Recall@5** của RAG từ ~70% lên **&gt;90%** — tăng độ chính xác tuyệt đối.

---

## L0 · Nền tảng

### Chương 1 — Vì sao chỉ Dense Search chưa đủ
Dense (embedding) giỏi khớp ngữ nghĩa nhưng <strong>bỏ sót từ khóa chính xác</strong> (tên riêng, mã số, thuật ngữ). Query *"Thông tư 08"* — Dense có thể trả tài liệu về "quy định ngân hàng" (liên quan ngữ nghĩa) mà lỡ tài liệu thực sự chứa "Thông tư 08". BM25 lại bắt chính xác. Hybrid = cộng sức cả hai.

| | Dense | Sparse (BM25) | Hybrid + Rerank |
|---|---|---|---|
| Khớp ngữ nghĩa | ✅ | ❌ | ✅ |
| Khớp từ khóa chính xác | ❌ | ✅ | ✅ |
| Recall@5 điển hình | ~70% | ~65% | **&gt;90%** |

### Chương 2 — Sparse vs Dense Retrieval
- <strong>Sparse vector</strong>: nhiều chiều (vocabulary size), mỗi chiều 1 từ, hầu hết = 0. BM25, TF-IDF.
- <strong>Dense vector</strong>: vài trăm chiều (768/1536), tất cả mang thông tin (embedding model).

### Chương 3 — Hybrid Search là gì
Hybrid = chạy Sparse + Dense <strong>song song</strong>, rồi <strong>fusion</strong> (gộp) kết quả. Thường thêm <strong>re-ranking</strong> bằng cross-encoder cho top cuối cùng.

### Chương 4 — Setup môi trường
```bash
pip install qdrant-client sentence-transformers FlagEmbedding rank-bm25
```
Qdrant hỗ trợ cả dense &amp; sparse trong 1 collection — tiện nhất. SentenceTransformer cho dense, BM25Okapi cho sparse.

&gt; **Bài tập 1:** `QdrantClient(":memory:")` + `SentenceTransformer("BAAI/bge-small-en-v1.5")`.

---

## L1 · Retrieval

### Chương 5 — Index Dense vector vào Qdrant
Insert chunks + dense vector vào collection. Qdrant tính cosine similarity khi query.

### Chương 6 — Sparse retrieval (BM25)
```python
from rank_bm25 import BM25Okapi
bm25 = BM25Okapi([doc.split() for doc in corpus])
scores = bm25.get_scores(query.split())
```
Tokenize tiếng Việt cần `underthesea` hoặc đơn giản `.split()` cho demo.

&gt; **Bài tập 2:** `bm25.get_scores(query.split())`.

### Chương 7 — Dense retrieval
```python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer("BAAI/bge-small-en-v1.5")
q_emb = model.encode(query)
# cosine similarity với các doc_emb
```

### Chương 8 — Đo Recall@k
```
Recall@k = (số tài liệu ĐÚNG nằm trong top-k) / (tổng tài liệu ĐÚNG cho query đó)
```
Cần <strong>golden set</strong>: các câu hỏi có sẵn danh sách tài liệu đúng (do người gán).

---

## L2 · Fusion &amp; Re-ranking

### Chương 9 — Score Fusion — vì sao KHÔNG trộn điểm trực tiếp
Điểm BM25 (0–vài chục) và cosine (0–1) <strong>thang khác nhau</strong> → trộn trực tiếp (`0.5*bm25 + 0.5*dense`) vô nghĩa: BM25 luôn áp đảo. Cần fusion theo <em>thứ hạng</em> (rank), không theo điểm.

### Chương 10 — Reciprocal Rank Fusion (RRF)
RRF chấm mỗi doc theo thứ hạng nó xuất hiện trong các list, không cần normalize điểm:
```
score(doc) = Σ  1 / (k + rank_i(doc))     với k thường = 60
```

```python
def rrf(lists, k=60):
    scores = {}
    for lst in lists:
        for rank, doc in enumerate(lst, 1):
            scores[doc] = scores.get(doc, 0) + 1/(k + rank)
    return sorted(scores, key=scores.get, reverse=True)
```

&gt; **Bài tập 3:** Hoàn thiện dòng `scores[doc] = ...` của hàm RRF.

### Chương 11 — Cross-encoder là gì
- <strong>Bi-encoder</strong>: query &amp; doc encode <em>riêng</em>, so cosine — nhanh, dùng cho retrieval giai đoạn đầu.
- <strong>Cross-encoder</strong>: query &amp; doc vào <em>cùng 1 transformer</em>, có cross-attention — chính xác hơn nhiều nhưng chậm. Dùng để re-rank top-N (N nhỏ, ~15).

### Chương 12 — Re-ranking với bge-reranker
```python
from FlagEmbedding import FlagReranker
reranker = FlagReranker("BAAI/bge-reranker-base", use_fp16=True)
scores = reranker.compute_score([[query, doc] for doc in candidates])
# scores cao = phù hợp hơn; sắp xếp lại candidates theo scores
```
Dùng `bge-reranker-m3` (đa ngữ) cho tiếng Việt.

&gt; **Bài tập 4:** Gọi `reranker.compute_score([[query, doc1], [query, doc2]])`.

---

## L3 · Thực chiến

### Chương 13 — Pipeline Hybrid đầy đủ
```
Query → BM25 top-20  ┐
        Dense top-20 ┘→ RRF top-15 → cross-encoder rerank top-5 → vào prompt LLM
```

&gt; **Bài tập 5:** Viết hàm `hybrid_search(query, top_k=5)` ráp cả 3 giai đoạn.

### Chương 14 — Đánh giá: Dense vs Hybrid+Rerank
Chạy 20 câu test (golden set), so Recall@5:
- Dense only: ~70%
- Hybrid (RRF): ~82%
- Hybrid + cross-encoder rerank: **&gt;90%**

### Chương 15 — Mẹo &amp; tối ưu
- <strong>alpha fusion</strong> — trọng số sparse vs dense (nếu cần thiên lệch).
- <strong>k RRF</strong> — 60 mặc định; giảm nếu muốn ưu tiên top đầu.
- <strong>top-k mỗi giai đoạn</strong> — quá ít = mất recall; quá nhiều = chậm reranker.
- <strong>batch reranker</strong> — gọi `compute_score` 1 lần cho list, không lặp từng cặp.
- <strong>cache embedding</strong> — doc embedding tính 1 lần, tái dùng.

### Chương 16 — Dự án: RAG tiếng Việt
1000 chunks tài liệu tiếng Việt (luật/văn bản công ty) → Hybrid pipeline → đo Recall@5 trên golden set 20 câu → tích hợp vào RAG ([LangChain](khoa-hoc-langchain.html) / [LlamaIndex](khoa-hoc-llamaindex.html)). Mở rộng: dùng Qdrant hybrid mode (dense+sparse cùng collection).

---

## 📋 Cheatsheet
| API | Tác dụng |
|---|---|
| `BM25Okapi(tokens)` | Sparse search |
| `bm25.get_scores(q_tokens)` | Điểm BM25 |
| `SentenceTransformer.encode` | Dense embedding |
| `QdrantClient` | Vector DB (dense+sparse) |
| `rrf(lists, k=60)` | Fusion theo rank |
| `FlagReranker.compute_score` | Cross-encoder rerank |

**Quy trình:** Sparse + Dense → RRF → Cross-encoder. **Kinh nghiệm:** RRF k=60, top-20 mỗi bên, rerank top-5 cuối; batch reranker để tăng tốc.

## 🃏 Flashcards
- **Dense giỏi gì?** Khớp ngữ nghĩa.
- **BM25 giỏi gì?** Khớp từ khóa chính xác (tên riêng, mã).
- **Hybrid Search?** Sparse + Dense song song + fusion.
- **Vì sao không trộn điểm?** Thang điểm BM25 &amp; cosine khác nhau.
- **RRF?** score = Σ 1/(k+rank), k=60. Dùng thứ hạng, không điểm.
- **Bi-encoder?** Encode query &amp; doc riêng, so cosine — nhanh.
- **Cross-encoder?** Query+doc cùng transformer, cross-attention — chính xác, chậm.
- **Re-rank khi nào?** Top-N nhỏ (~15) cuối cùng, sau retrieval.
- **Recall@k?** số đúng trong top-k / tổng đúng.
- **bge-reranker-m3?** Đa ngữ, tốt cho tiếng Việt.
- **alpha?** Trọng số sparse vs dense (tuỳ chọn).
- **Pipeline chuẩn?** BM25+Dense top-20 → RRF top-15 → rerank top-5 → prompt.

---
*Học kèm [LangChain](khoa-hoc-langchain.html) &amp; [LlamaIndex](khoa-hoc-llamaindex.html) · một phần của [Mega Study](../index.html).*
