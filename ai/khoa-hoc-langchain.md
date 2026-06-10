# 🦜 Khóa Học LangChain — Xây Ứng Dụng LLM Từ Căn Bản Đến Nâng Cao

> Bản Markdown gọn. Bản tương tác (sidebar, bài tập tự chấm, LCEL Builder): [`khoa-hoc-langchain.html`](khoa-hoc-langchain.html)
> Cài: `pip install langchain langchain-anthropic langchain-community langchain-chroma` + đặt API key (vd `ANTHROPIC_API_KEY`).

**16 chương · 4 cấp độ.** LangChain ghép model + prompt + parser + retriever + tool thành **chuỗi** để xây chatbot, RAG, agent.

---

## L0 · Nhập môn

### Chương 1 — LangChain là gì
Framework **dàn dựng (orchestrate)** LLM với dữ liệu & tool — không huấn luyện model. Gói: `langchain-core` (Runnable, prompts), `langchain` (chains/agents), `langchain-anthropic/-openai` (model), `langchain-community` (loader, vector store), **LangGraph** (đồ thị trạng thái), **LangSmith** (tracing).

### Chương 2 — Chat models & messages
```python
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import SystemMessage, HumanMessage
llm = ChatAnthropic(model="claude-sonnet-4-6", temperature=0)
resp = llm.invoke([SystemMessage("Bạn là trợ lý súc tích."), HumanMessage("Thủ đô VN?")])
print(resp.content)
```
3 message: SystemMessage (vai trò), HumanMessage (người dùng), AIMessage (trả lời).

> **Bài tập 1:** `ChatAnthropic(model="claude-sonnet-4-6")` → `.invoke("Xin chào")` → in `.content`.

### Chương 3 — Prompt templates
```python
from langchain_core.prompts import ChatPromptTemplate
prompt = ChatPromptTemplate.from_messages([
    ("system", "Bạn là chuyên gia {linh_vuc}."),
    ("human", "Giải thích {khai_niem} trong 2 câu."),
])
prompt.invoke({"linh_vuc": "vật lý", "khai_niem": "entropy"})
```
> **Bài tập 2:** `from_messages` với dòng `"system"` và `"human"` chứa `{cau_hoi}`.

---

## L1 · LCEL & Chains

### Chương 4 — Output parsers
```python
from langchain_core.output_parsers import StrOutputParser
parser = StrOutputParser()                 # AIMessage → str

from pydantic import BaseModel
class Phim(BaseModel):
    ten: str; nam: int
structured = llm.with_structured_output(Phim)   # JSON tin cậy qua tool-calling
```
> **Bài tập 3:** `class Sach(BaseModel)` có `tieu_de: str`; `llm.with_structured_output(Sach)`.

### Chương 5 — LCEL: nối bằng `|`
Mọi thành phần là **Runnable**, nối bằng `|` (output bước trước = input bước sau).
```python
chain = prompt | llm | StrOutputParser()
chain.invoke({"linh_vuc": "sinh học", "khai_niem": "ADN"})
chain.batch([...])      # song song
chain.stream({...})     # từng phần
```
3 method: `invoke` / `batch` / `stream`.

> **Bài tập 4:** `chain = prompt | llm | StrOutputParser()`.

### Chương 6 — Runnable & rẽ nhánh
```python
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
chain = {"context": retriever, "question": RunnablePassthrough()} | prompt | llm | StrOutputParser()
upper = RunnableLambda(lambda x: x.upper())
```
`RunnablePassthrough` giữ input nguyên vẹn — khuôn mẫu RAG.

### Chương 7 — Memory / lịch sử hội thoại
```python
from langchain_core.prompts import MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
prompt = ChatPromptTemplate.from_messages([
    ("system", "Bạn là trợ lý."), MessagesPlaceholder("history"), ("human", "{input}")])
chat = RunnableWithMessageHistory(prompt | llm, get_hist,
        input_messages_key="input", history_messages_key="history")
chat.invoke({"input": "Tôi tên An"}, config={"configurable": {"session_id": "u1"}})
```

---

## L2 · RAG

### Chương 8 — Loader & text splitter
```python
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
docs = PyPDFLoader("tai-lieu.pdf").load()
chunks = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200).split_documents(docs)
```
> **Bài tập 5:** `RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)` → `.split_documents(docs)`.

### Chương 9 — Embeddings & vector store
```python
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
vectorstore = Chroma.from_documents(chunks, embedding=OpenAIEmbeddings())
vectorstore.similarity_search("câu hỏi", k=4)
```
Embedding = "tọa độ ngữ nghĩa"; câu gần nghĩa → vector gần nhau.

### Chương 10 — Retriever
```python
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
retriever.invoke("LangChain là gì?")   # list[Document]; là Runnable → ghép | được
```
> **Bài tập 6:** `vectorstore.as_retriever(search_kwargs={"k": 3})`.

### Chương 11 — RAG chain hoàn chỉnh
```python
def format_docs(docs): return "\n\n".join(d.page_content for d in docs)
rag = ({"context": retriever | format_docs, "question": RunnablePassthrough()}
       | prompt | llm | StrOutputParser())
rag.invoke("Chính sách bảo hành?")
```
Prompt buộc "chỉ dựa vào ngữ cảnh" để giảm bịa.

### Chương 12 — Tools & function calling
```python
from langchain_core.tools import tool
@tool
def cong(a: int, b: int) -> int:
    """Cộng hai số nguyên."""
    return a + b
ai = llm.bind_tools([cong]).invoke("2 cộng 3?")
print(ai.tool_calls)
```
> **Bài tập 7:** `@tool` cho `def nhan(a: int, b: int) -> int` có docstring; `llm.bind_tools([nhan])`.

---

## L3 · Agents & triển khai

### Chương 13 — Agents
```python
from langgraph.prebuilt import create_react_agent
agent = create_react_agent(llm, tools=[cong, nhan, search_tool])
agent.invoke({"messages": [("user", "Giá BTC nhân 2?")]})
```
Vòng ReAct: suy luận → gọi tool → đọc kết quả → ... → trả lời.

> **Bài tập 8:** `create_react_agent(llm, tools=[cong, nhan])` → `.invoke({"messages": [...]})`.

### Chương 14 — LangGraph
```python
from langgraph.graph import StateGraph, START, END
from typing import TypedDict
class State(TypedDict):
    input: str; output: str
g = StateGraph(State)
g.add_node("llm", lambda s: {"output": llm.invoke(s["input"]).content})
g.add_edge(START, "llm"); g.add_edge("llm", END)
app = g.compile()
```
LCEL = chuỗi thẳng; LangGraph = đồ thị có trạng thái, vòng lặp, điều kiện.

### Chương 15 — Streaming & LangSmith
```python
for chunk in chain.stream({"question": "..."}):
    print(chunk, end="", flush=True)
# LangSmith: LANGSMITH_TRACING=true; LANGSMITH_API_KEY=... → trace đầy đủ
```

### Chương 16 — Dự án: RAG chatbot
Loader → splitter → Chroma (persist) → retriever(k=4) → RAG chain (dẫn nguồn) → `RunnableWithMessageHistory` → Streamlit + stream + LangSmith.

> **Bài tập 9:**
> ```python
> rag = ({"context": retriever, "question": RunnablePassthrough()}
>        | prompt | llm | StrOutputParser())
> ```

---

## 📋 Cheatsheet
| Lệnh | Tác dụng |
|---|---|
| `ChatAnthropic/ChatOpenAI` | Model |
| `ChatPromptTemplate` | Prompt |
| `StrOutputParser` / `with_structured_output` | Lấy text / JSON |
| `a \| b \| c` | Nối LCEL |
| `invoke/batch/stream` | Chạy Runnable |
| `RecursiveCharacterTextSplitter` | Cắt đoạn |
| `Chroma` / `as_retriever` | Vector store / truy hồi |
| `RunnablePassthrough` | Giữ input (RAG) |
| `@tool` / `bind_tools` / `create_react_agent` | Tool & agent |
| LangGraph / LangSmith | Đồ thị / tracing |

## 🃏 Flashcards
- **LangChain?** Dàn dựng LLM + dữ liệu + tool, không huấn luyện.
- **LCEL?** Nối Runnable bằng `|`.
- **3 method Runnable?** invoke/batch/stream.
- **with_structured_output?** Ép JSON đúng schema qua tool-calling.
- **Khuôn RAG?** {context: retriever, question: passthrough} | prompt | llm | parser.
- **@tool?** Hàm Python + docstring → tool cho LLM.
- **Agent ReAct?** LLM + tools + vòng lặp suy luận-gọi tool.
- **LangGraph vs LCEL?** Đồ thị trạng thái vs chuỗi thẳng.

---
*Học kèm [LlamaIndex](khoa-hoc-llamaindex.html) & [Agentic AI](giao_trinh_agentic_ai.html) · một phần của [Mega Study](../index.html).*
