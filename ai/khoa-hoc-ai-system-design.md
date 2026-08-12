# 🏗️ AI System Design — Thiết Kế Hệ Thống AI Quy Mô Lớn

> Bản Markdown gọn. Bản tương tác (sidebar, bài tập tự chấm, Capacity Estimator): [`khoa-hoc-ai-system-design.html`](khoa-hoc-ai-system-design.html)
> Không cần cài thêm — đây là khóa tư duy thiết kế. Nên ôn [Mạng máy tính](../lap-trinh/khoa-hoc-mang-may-tinh.html), [Hệ điều hành](../lap-trinh/khoa-hoc-he-dieu-hanh.html), [MLOps](lo-trinh-ai-engineer-1-nam.html) trước.

**16 chương · 4 cấp độ.** Định dạng phỏng vấn Senior ở công ty công nghệ lớn: thiết kế hệ thống AI phục vụ triệu user. <strong>Capacity estimation</strong>, <strong>trade-off</strong> (SQL/NoSQL/Vector DB, cache, queue), <strong>scale</strong> (sharding/LB/rate limit) — áp dụng cho Recommender, ChatGPT clone, AI Search.

---

## L0 · Khung System Design

### Chương 1 — System Design AI là gì
Khác ML system design truyền thống ở chỗ: ngoài latency/throughput, phải lo <strong>GPU cost</strong>, <strong>model serving</strong>, <strong>context window</strong>, <strong>vector DB</strong>. Mục tiêu phỏng vấn: không có đáp án "đúng" — bạn cần <em>justify trade-off</em>.

### Chương 2 — Khung phỏng vấn 4 bước
1. **Clarify** — functional &amp; non-functional requirements.
2. **Capacity** — DAU, QPS, storage, bandwidth.
3. **High-level Design** — vẽ diagram các thành phần.
4. **Deep Dive** — focus 1-2 bottleneck, defend trade-off.

### Chương 3 — Functional &amp; Non-functional Requirements
- <strong>Functional</strong>: hệ thống LÀM gì (vd chatbot trả lời dựa tài liệu).
- <strong>Non-functional</strong>: scale (1M user), latency (&lt;2s), availability (99.9%), cost.

### Chương 4 — Capacity Estimation
Đo bằng số trước khi vẽ:
```
DAU = 1,000,000
requests/user/day = 10
→ total/day = 10M requests
QPS = 10M / 86400 ≈ 116 req/s    (peak ~3× = 350 QPS)
storage/day = 10M × 1KB = 10 GB/day → 3.6 TB/năm
bandwidth = 116 × 1KB = 116 KB/s ≈ 1 Mbps
```

&gt; **Bài tập 1:** QPS = (DAU × req/user/day) / 86400.

---

## L1 · Thành phần &amp; Trade-off

### Chương 5 — Database choice
| Loại | Khi nào | Ví dụ AI |
|---|---|---|
| **SQL** | Cấu trúc, transaction, quan hệ | User, billing |
| **NoSQL** | Linh hoạt schema, scale ngang | Lịch sử chat (Cassandra) |
| **Vector DB** | Tìm ngữ nghĩa (embedding) | RAG, search |
| **In-memory** | Cache nóng, low latency | Redis (feature store) |

### Chương 6 — Caching
- <strong>Redis/Memcached</strong>: cache kết quả truy vấn/nội dung nóng.
- <strong>Semantic caching</strong> (LLM): cache theo ý nghĩa câu — query tương tự → trả đáp án cũ. Giảm 30-60% LLM call.

### Chương 7 — Message Queue
<strong>Kafka/RabbitMQ</strong> decouple: request → queue → worker xử lý async. Dùng cho: batch job, train offline, email gửi sau. Tránh client timeout khi tác vụ lâu.

&gt; **Bài tập 2:** Vì sao đẩy tác vụ LLM lâu vào queue?

### Chương 8 — Scale: Sharding, LB, Rate Limiting
- <strong>Sharding</strong>: chia DB theo key (user_id) → mỗi shard 1 phần.
- <strong>Load Balancer</strong>: L4 (TCP) hoặc L7 (HTTP) — phân tải.
- <strong>Rate Limiting</strong>: Token Bucket — chống bot sập API.

---

## L2 · Case Study AI

### Chương 9 — Case Study: Recommender System
<strong>Two-tower model</strong>: retrieval (candidate từ triệu item → top-1000) → ranking (model chi tiết) → re-ranking (filter logic kinh doanh). Near-line (feature realtime qua Redis) vs offline (train nightly Spark).

&gt; **Bài tập 3:** Nêu 3 giai đoạn của pipeline recommender.

### Chương 10 — Case Study: ChatGPT Clone
- <strong>Streaming</strong>: SSE/WebSocket trả token từng chữ.
- <strong>Context window</strong>: lưu lịch sử chat ở Cassandra/DynamoDB, lazy-load khi cần.
- <strong>Model serving</strong>: vLLM multi-tenant, PagedAttention.

### Chương 11 — Case Study: AI Search Engine (Perplexity)
Pipeline: <strong>crawling</strong> → <strong>indexing</strong> (vector + inverted) → <strong>vector DB sharding</strong> (HNSW/IVF). Trade-off <strong>Recall vs Latency</strong>: HNSW nhanh nhưng tốn RAM; IVF ít RAM hơn.

&gt; **Bài tập 4:** HNSW vs IVF — đánh đổi gì?

### Chương 12 — ML-specific: serving, A/B, feature store
- <strong>Model serving</strong>: canary deploy (5% traffic trước), rollback nhanh.
- <strong>A/B test</strong>: so model mới vs cũ trên metric (retention, CTR).
- <strong>Feature store</strong>: đảm bảo feature train &amp; serve nhất quán (training-serving skew).

---

## L3 · Thực chiến

### Chương 13 — High-level Design: vẽ &amp; communicate
Vẽ layer: client → LB → API gateway → service → DB/cache/queue/model. <strong>Communicate</strong> suy nghĩ thành tiếng — interviewer cần thấy quá trình, không chỉ kết quả.

### Chương 14 — Bottleneck deep dive
Focus 1-2 điểm: vd "độ trễ inference" → batch + quantize + cache. "Vector search chậm" → sharding + HNSW. Đừng cố cover tất cả — chiều sâu &gt; bề rộng.

### Chương 15 — Mẹo phỏng vấn Senior
- <strong>Clarify trước khi vẽ</strong> — 5 phút hỏi requirements đáng giá.
- <strong>State assumptions</strong> rõ ràng.
- <strong>Back-of-envelope</strong> math (capacity) cho thấy tư duy quy mô.
- <strong>Trade-off</strong> thay vì "đáp án đúng".
- <strong>Đừng im lặng</strong> — nghĩ thành tiếng.

### Chương 16 — Dự án: mock interview
Chọn 1 bài (vd "thiết kế chatbot CSKH 1M user"): clarify → capacity → high-level → deep dive (streaming + RAG + caching). Viết solution doc 2 trang. Mock với bạn/mentor 45 phút.

&gt; **Bài tập 5:** Ước lượng storage/năm cho chatbot 1M DAU, mỗi user 10 msg/day, mỗi msg 2KB.

---

## 📋 Cheatsheet
| Khái niệm | Tóm tắt |
|---|---|
| 4 bước phỏng vấn | Clarify → Capacity → High-level → Deep dive |
| DAU→QPS | ×req/user/day / 86400, ×3 cho peak |
| DB | SQL/NoSQL/Vector/In-memory theo use case |
| Cache | Redis + semantic cache cho LLM |
| Queue | Kafka decouple tác vụ lâu |
| Sharding | Chia DB theo key |
| Rate limit | Token Bucket |
| Two-tower | Retrieval → ranking → re-rank |
| Vector index | HNSW (nhanh, RAM) vs IVF (ít RAM) |

**Quy tắc phỏng vấn:** clarify trước, state assumptions, trade-off &gt; đáp án đúng, nghĩ thành tiếng.

## 🃏 Flashcards
- **4 bước phỏng vấn?** Clarify → Capacity → High-level → Deep dive.
- **Functional vs Non-functional?** Làm gì / scale, latency, availability, cost.
- **DAU→QPS?** DAU × req/user/day / 86400 (×3 peak).
- **SQL/NoSQL/Vector?** Quan hệ / linh hoạt / ngữ nghĩa.
- **Semantic caching?** Cache theo ý nghĩa câu — giảm 30-60% LLM call.
- **Queue dùng khi?** Tác vụ lâu, async, decouple.
- **Sharding?** Chia DB theo key (user_id) → scale ngang.
- **Token Bucket?** Thuật toán rate limiting.
- **Two-tower recommender?** Retrieval → ranking → re-ranking.
- **HNSW vs IVF?** HNSW nhanh/tốn RAM; IVF ít RAM hơn.
- **Canary deploy?** 5% traffic model mới trước, rollback nếu lỗi.
- **Training-serving skew?** Feature store đảm bảo feature nhất quán train/serve.

---
*Ôn [Mạng máy tính](../lap-trinh/khoa-hoc-mang-may-tinh.html) &amp; [Hệ điều hành](../lap-trinh/khoa-hoc-he-dieu-hanh.html) · một phần của [Mega Study](../index.html).*
