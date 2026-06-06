# 📘 GIÁO TRÌNH THỰC CHIẾN CHUYÊN SÂU: AI ENGINEER & GROWTH AUTOMATION (2026)
*Khóa học thiết kế theo chuẩn yêu cầu Remote Job Quốc tế*
*Tỷ lệ: 40% Lý thuyết chuyên sâu - 60% Dự án thực tế*

---

## 🎯 YÊU CẦU DÀNH CHO AI (PROMPT ĐỂ AI LÊN KẾ HOẠCH)
> **Lệnh dành cho AI:** "Bạn là một Mentor đào tạo Kỹ sư AI cao cấp. Dựa vào giáo trình chi tiết dưới đây, hãy thiết kế cho tôi một lộ trình học tập và thực hành cụ thể. Tôi có thể dành ra [X] giờ mỗi ngày. Hãy chia nhỏ các task theo từng ngày/tuần, gợi ý tài liệu cần đọc thêm và cách sử dụng Cursor/Windsurf để đẩy nhanh tốc độ code cho các dự án thực tế này."

---

## 📘 MODULE 1: KIẾN TRÚC MÔ HÌNH & KỸ NGHỆ NGỮ CẢNH (CON-TEXT ENGINEERING)
**Mục tiêu:** Hiểu cách LLM tư duy, cách kiểm soát dữ liệu đầu ra có cấu trúc và tối ưu hóa chi phí API.

### 1. Lý thuyết chuyên sâu cần nắm vững
*   **Tokenomics & Context Window:** Bản chất của "Token". Cách tính chi phí API và cơ chế hoạt động của Attention Mechanism trong giới hạn cửa sổ ngữ cảnh. Tại sao prompt quá dài lại làm giảm độ chính xác (Hiện tượng *Lost in the Middle*).
*   **Determinism vs. Creativity:** Hiểu sâu về `Temperature`, `Top-p`, `Frequency & Presence Penalties`. Khi nào thiết lập `Temperature = 0` (cho code/data) và `> 0.7` (cho creative).
*   **Structured Outputs Theory:** Cơ chế hoạt động của JSON Mode và Function Calling ở tầng dưới. Cách mô hình tính toán xác suất để khớp với Pydantic/JSON Schema.

### 🛠️ Dự án thực tế 1: "SaaS Competitor Analytics Engine"
*   **Yêu cầu:** Tự động nhận diện danh sách sản phẩm, cào dữ liệu thô từ Web/Social Media của đối thủ, ép LLM trả về sơ đồ JSON chuẩn chứa: *Tính năng cốt lõi, Điểm yếu khách hàng phàn nàn, Định hướng Marketing*.
*   **Kỹ năng:** Tối ưu hóa Token, Xử lý Exception, Pydantic validation.

---

## 🧠 MODULE 2: TOÁN HỌC VECTOR & KIẾN TRÚC RAG (RETRIEVAL-AUGMENTED GENERATION)
**Mục tiêu:** Hiểu cách biến văn bản thành vector và xây dựng kho tri thức chống "ảo tưởng" (Hallucination).

### 1. Lý thuyết chuyên sâu cần nắm vững
*   **Vector Embeddings & Không gian đa chiều:** Bản chất biến văn bản thành vector. Hiểu khoảng cách toán học: *Cosine Similarity, Dot Product, Euclidean Distance*.
*   **Kiến trúc RAG Pipeline 4 bước:**
    *   *Chunking Strategy:* Các thuật toán chia nhỏ văn bản (Recursive Character, Semantic Chunking).
    *   *Indexing:* Cách Vector DB (ChromaDB, PGVector) lập chỉ mục nhanh.
    *   *Retrieval & Reranking:* Lọc bớt nhiễu dữ liệu bằng các mô hình Reranker (như Cohere Rerank).

### 🛠️ Dự án thực tế 2: "AI Customer Support & Knowledge Base"
*   **Yêu cầu:** Nạp tài liệu PDF hướng dẫn, chính sách vào ChromaDB. Xây dựng bot hỗ trợ giải đáp thắc mắc, cam kết AI chỉ trả lời dựa trên tài liệu, nếu không có phải trả lời "Tôi không biết".
*   **Kỹ năng:** Chunking dữ liệu thô, Tính Cosine Similarity, Thiết lập System Prompt an toàn.

---

## 🤖 MODULE 3: LÝ THUYẾT AI AGENTS TUYẾN TÍNH (CREWAI)
**Mục tiêu:** Chuyển từ "Viết Prompt" sang "Phân vai và Giao việc" cho tổ chức ảo.

### 1. Lý thuyết chuyên sâu cần nắm vững
*   **ReAct Framework (Reasoning and Acting):** Chu kỳ hoạt động của Agent: *Thought -> Action -> Observation -> Repeat*.
*   **Multi-Agent Collaboration:** Mô hình Sequential và Hierarchical. Cách truyền dữ liệu (State) giữa các Agent.
*   **Tool Usage & Memory Theory:** Tầng Memory: *Short-term memory*, *Long-term memory*, *Entity memory*.

### 🛠️ Dự án thực tế 3: "Autonomous Content & SEO Factory"
*   **Yêu cầu:** Xây dựng Crew gồm 3 Agents:
    1.  *SEO Analyst:* Tìm keyword, search Google trích xuất outline đối thủ.
    2.  *Copywriter:* Viết bài blog chuẩn SEO dựa trên outline.
    3.  *Chief Editor:* Kiểm duyệt bài viết, yêu cầu sửa đổi nếu chưa đạt tiêu chuẩn.
*   **Kỹ năng:** Custom Tools, Quản lý bộ nhớ Crew, Define `Expected Output`.

---

## ⚡ MODULE 4: ĐỒ THỊ TRẠNG THÁI & LUỒNG AGENT PHỨC TẠP (LANGGRAPH)
**Mục tiêu:** Xây dựng AI tự tư duy rẽ nhánh, tự sửa lỗi, phối hợp với con người.

### 1. Lý thuyết chuyên sâu cần nắm vững
*   **Finite State Machines (FSM):** Lý thuyết đồ thị (`Nodes`, `Edges`, `State` là sổ cái lưu trữ dữ liệu chung).
*   **Conditional Routing & Loops Theory:** Thiết lập Router kiểm tra trạng thái, quyết định đi tiếp hay tạo vòng lặp.
*   **Human-in-the-loop (HITL):** Thiết lập điểm ngắt (`Interrupts`), lưu trạng thái vào Checkpointer chờ con người phê duyệt.

### 🛠️ Dự án thực tế 4: "Self-Healing Data Pipeline"
*   **Yêu cầu:** Xây dựng hệ thống tự cập nhật giá đối thủ:
    *   *Node 1 & 2:* Viết code cào dữ liệu và chạy thử nghiệm.
    *   *Conditional Router:* Nếu code lỗi -> Quay lại Node 1 bắt AI đọc log tự sửa (max 3 lần).
    *   *Node 3 (Human Interrupt):* Gửi thông báo phê duyệt qua UI/Slack trước khi cập nhật vào Database.
*   **Kỹ năng:** Kiến trúc Graph phức tạp, Reducer trong State, Checkpointer.

---

## 🌐 MODULE 5: PRODUCTIONALIZATION & BUDGET CONTROL
**Mục tiêu:** Đưa Agent thành ứng dụng thương mại, giao diện mượt mà và kiểm soát chi phí.

### 1. Lý thuyết chuyên sâu cần nắm vững
*   **Server-Sent Events (SSE) vs WebSockets:** Cơ chế Stream dữ liệu (real-time streaming) từ Backend lên Frontend cải thiện UX.
*   **Guardrails & Token Budgeting:** Chống `Prompt Injection`. Thuật toán ngắt tiến trình (kill process) khi AI rơi vào vòng lặp vô hạn (Infinite Loop).

### 🛠️ Dự án thực tế 5 (Capstone Project): "Hệ Điều Hành Doanh Nghiệp Nhỏ Bằng AI"
*   **Yêu cầu:** Đóng gói LangGraph thành SaaS:
    *   **Backend:** FastAPI (Python) hỗ trợ Streaming.
    *   **Frontend:** Next.js / Streamlit hiển thị Graph UI.
    *   **DevOps:** Docker, Deploy lên Render / Hugging Face Spaces.
*   **Kỹ năng:** `async/await` Python, Dockerization, Deployment.
