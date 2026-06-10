# 🦙 Khóa Học LlamaIndex — RAG & Data Framework Cho LLM

> Bản Markdown gọn. Bản tương tác (sidebar, bài tập tự chấm, RAG Pipeline Builder): [`khoa-hoc-llamaindex.html`](khoa-hoc-llamaindex.html)
> Cài: `pip install llama-index` (+ `llama-index-llms-anthropic` để dùng Claude) + đặt API key.

**16 chương · 4 cấp độ.** LlamaIndex chuyên **kết nối LLM với dữ liệu của bạn**: nạp → index → truy vấn. Trọng tâm RAG.

---

## L0 · Nhập môn

### Chương 1 — LlamaIndex là gì
Data framework chuyên RAG. So với LangChain (đa năng), LlamaIndex tối giản & chuyên sâu cho hỏi-đáp tài liệu. Khái niệm: **Reader** (nạp → Document), **Node** (chunk), **Index**, **Retriever**, **Query/Chat engine**.

### Chương 2 — Document & Node
```python
from llama_index.core import Document
doc = Document(text="...", metadata={"nguon": "sotay.pdf", "trang": 1})
```
Document = cả tài liệu; Node = đoạn nhỏ (do node parser cắt) — thứ được nhúng & truy hồi.

> **Bài tập 1:** `Document(text="Xin chào", metadata={"nguon": "test"})`.

### Chương 3 — Settings (LLM & embedding)
```python
from llama_index.core import Settings
from llama_index.llms.anthropic import Anthropic
from llama_index.embeddings.openai import OpenAIEmbedding
Settings.llm = Anthropic(model="claude-sonnet-4-6")
Settings.embed_model = OpenAIEmbedding(model="text-embedding-3-small")
Settings.chunk_size = 512
```
> **Bài tập 2:** `Settings.llm = Anthropic(model="claude-sonnet-4-6")` và `Settings.chunk_size = 512`.

---

## L1 · RAG cơ bản

### Chương 4 — VectorStoreIndex (RAG 5 dòng)
```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)   # cắt + nhúng + lưu
print(index.as_query_engine().query("Tài liệu nói gì về bảo hành?"))
```
> **Bài tập 3:** `index = VectorStoreIndex.from_documents(documents)`.

### Chương 5 — Query engine
```python
qe = index.as_query_engine(similarity_top_k=4)
resp = qe.query("Chính sách đổi trả?")
print(resp); print(resp.source_nodes)   # nguồn để dẫn/kiểm chứng
```
> **Bài tập 4:** `index.as_query_engine(similarity_top_k=3)` → `.query("...")`.

### Chương 6 — Nạp dữ liệu (Reader)
```python
from llama_index.core import SimpleDirectoryReader
docs = SimpleDirectoryReader("data", recursive=True).load_data()
```
**LlamaHub**: hàng trăm reader (Notion, Slack, SQL, web, GitHub...) — cài `llama-index-readers-*`.

> **Bài tập 5:** `SimpleDirectoryReader("data").load_data()`.

### Chương 7 — Lưu & nạp lại index
```python
from llama_index.core import StorageContext, load_index_from_storage
index.storage_context.persist(persist_dir="./storage")
ctx = StorageContext.from_defaults(persist_dir="./storage")
index = load_index_from_storage(ctx)
```
> Tránh embedding lại (tốn tiền). Production: dùng vector DB thật (Chroma/Qdrant/pgvector).

---

## L2 · Tùy chỉnh RAG

### Chương 8 — Node parser / chunking
```python
from llama_index.core.node_parser import SentenceSplitter
nodes = SentenceSplitter(chunk_size=512, chunk_overlap=50).get_nodes_from_documents(documents)
index = VectorStoreIndex(nodes)
```
Parser: SentenceSplitter (mặc định), SentenceWindow, SemanticSplitter, MarkdownNodeParser.

> **Bài tập 6:** `SentenceSplitter(chunk_size=256, chunk_overlap=20)` → `.get_nodes_from_documents(documents)`.

### Chương 9 — Retriever & chế độ
```python
retriever = index.as_retriever(similarity_top_k=5)
retriever.retrieve("câu hỏi")
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.postprocessor import SimilarityPostprocessor
qe = RetrieverQueryEngine.from_args(retriever,
        node_postprocessors=[SimilarityPostprocessor(similarity_cutoff=0.7)])
```
Postprocessor: lọc ngưỡng, **rerank** (tăng chất lượng đáng kể), mở rộng ngữ cảnh.

### Chương 10 — Response synthesizer
| response_mode | Cách | Dùng khi |
|---|---|---|
| `compact` (mặc định) | Nhồi nhiều Node 1 lần | Nhanh, rẻ |
| `refine` | Lặp tinh chỉnh từng Node | Cần đầy đủ |
| `tree_summarize` | Tóm tắt phân cấp | Tổng hợp tài liệu lớn |
```python
qe = index.as_query_engine(response_mode="tree_summarize")
```

### Chương 11 — Metadata & lọc
```python
from llama_index.core.vector_stores import MetadataFilters, ExactMatchFilter
filters = MetadataFilters(filters=[ExactMatchFilter(key="nam", value=2026)])
qe = index.as_query_engine(filters=filters)
```
Lọc metadata (tác giả/năm/quyền) trước rồi tìm ngữ nghĩa → chính xác & an toàn (phân quyền).

### Chương 12 — Chat engine
```python
chat_engine = index.as_chat_engine(chat_mode="condense_plus_context")
chat_engine.chat("Bảo hành bao lâu?")
chat_engine.chat("Thế còn đổi trả?")   # nhớ lượt trước
```
Query engine = 1 lượt không nhớ; Chat engine = có lịch sử.

> **Bài tập 7:** `index.as_chat_engine(chat_mode="condense_plus_context")` → `.chat("...")`.

---

## L3 · Agent & nâng cao

### Chương 13 — Agents & tools
```python
from llama_index.core.tools import FunctionTool, QueryEngineTool
from llama_index.core.agent import ReActAgent
tools = [
    FunctionTool.from_defaults(fn=nhan),
    QueryEngineTool.from_defaults(query_engine, name="tai_lieu",
        description="Trả lời câu hỏi về tài liệu công ty"),
]
agent = ReActAgent.from_tools(tools, verbose=True)
agent.chat("Bảo hành mấy năm, nhân 12 ra mấy tháng?")
```
`QueryEngineTool` biến một RAG index thành tool → nền **multi-document agent**.

> **Bài tập 8:** `FunctionTool.from_defaults(fn=nhan)` + `ReActAgent.from_tools(tools)`.

### Chương 14 — Workflows
```python
from llama_index.core.workflow import Workflow, step, StartEvent, StopEvent
class RAGFlow(Workflow):
    @step
    async def run(self, ev: StartEvent) -> StopEvent:
        return StopEvent(result=str(query_engine.query(ev.query)))
```
Pipeline nhiều bước theo event (thay Query Pipeline cũ) — cho RAG nâng cao, agent tự sửa.

### Chương 15 — Đánh giá & quan sát
```python
from llama_index.core.evaluation import FaithfulnessEvaluator, RelevancyEvaluator
faith = FaithfulnessEvaluator()   # bám nguồn không (chống bịa)?
rel = RelevancyEvaluator()        # liên quan câu hỏi không?
```
Truy hồi: hit-rate, MRR. Tracing: LlamaTrace, Arize Phoenix, LangSmith.

### Chương 16 — Dự án: Hỏi-đáp tài liệu công ty
Reader (recursive) → SentenceSplitter + metadata → VectorStoreIndex vào Qdrant + persist → retriever + rerank + response_mode + lọc quyền → `as_chat_engine` (kèm source_nodes) → Faithfulness/Relevancy + Streamlit.

> **Bài tập 9:**
> ```python
> documents = SimpleDirectoryReader("data").load_data()
> index = VectorStoreIndex.from_documents(documents)
> resp = index.as_query_engine().query("Câu hỏi của bạn?")
> ```

---

## 📋 Cheatsheet
| Lệnh | Tác dụng |
|---|---|
| `SimpleDirectoryReader().load_data()` | Nạp |
| `VectorStoreIndex.from_documents` | Index |
| `as_query_engine().query()` | Hỏi-đáp |
| `resp.source_nodes` | Dẫn nguồn |
| `Settings.llm / embed_model` | Cấu hình |
| `SentenceSplitter` | Chunking |
| `as_retriever(top_k)` | Truy hồi |
| `response_mode` | compact/refine/tree |
| `persist / load_index_from_storage` | Lưu/nạp |
| `as_chat_engine` | Hội thoại |
| `FunctionTool/QueryEngineTool/ReActAgent` | Tool & agent |
| `FaithfulnessEvaluator` | Đánh giá |

## 🃏 Flashcards
- **LlamaIndex?** Data framework cho RAG: nạp → index → truy vấn.
- **Document vs Node?** Cả tài liệu vs chunk được nhúng/truy hồi.
- **RAG mấy dòng?** ~5: load → from_documents → as_query_engine → query.
- **source_nodes?** Node nguồn của câu trả lời (dẫn nguồn/debug).
- **Vì sao persist?** Tránh embedding lại tốn tiền.
- **response_mode compact vs refine?** Nhồi 1 lần (nhanh) vs lặp tinh chỉnh (đầy đủ).
- **Query vs Chat engine?** 1 lượt không nhớ vs có lịch sử.
- **QueryEngineTool?** RAG index thành tool cho agent.
- **Faithfulness?** Đo bám nguồn/chống bịa.
- **LlamaIndex vs LangChain?** Chuyên RAG/data vs đa năng dàn dựng; thường dùng cả hai.

---
*Học kèm [LangChain](khoa-hoc-langchain.html) & [Agentic AI](giao_trinh_agentic_ai.html) · một phần của [Mega Study](../index.html).*
