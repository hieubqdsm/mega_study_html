# 🔌 Khóa Học MCP — Model Context Protocol

> Bản Markdown gọn. Bản tương tác (sidebar, bài tập tự chấm, MCP Server Builder): [`khoa-hoc-mcp.html`](khoa-hoc-mcp.html)
> Cài: `pip install mcp` (Python SDK chính thức của Anthropic). Để test thực tế cần 1 client MCP: **Claude Desktop** (miễn phí) hoặc `mcp` CLI.

**16 chương · 4 cấp độ.** MCP là chuẩn mở của Anthropic để LLM kết nối **an toàn & thống nhất** với công cụ/dữ liệu nội bộ — thay function calling ad-hoc chắp vá. Học xong tự build MCP server, cắm vào Claude Desktop / Cursor / bất kỳ client nào.

---

## L0 · Nhập môn

### Chương 1 — MCP là gì
Model Context Protocol (MCP) = chuẩn mở (mở nguồn 2024) định nghĩa cách LLM giao tiếp với dữ liệu & công cụ bên ngoài. Tưởng như **"USB-C cho AI"**: 1 chuẩn chung, cắm đâu cũng chạy — thay vì mỗi app (OpenAI, Anthropic, Google) một function calling riêng.

| | Trước MCP | Có MCP |
|---|---|---|
| Tool cho OpenAI | Viết JSON schema riêng | 1 MCP server dùng chung |
| Đổi sang Claude | Viết lại | Cắm lại, không sửa code |
| Bảo trì | Chắp vá, rời rạc | Tập trung ở server |

### Chương 2 — Vấn đề với function calling ad-hoc
Function calling từng app là "đảo ngược control": app hardcode tool schema → khó tái dùng, bảo mật không thống nhất, đổi provider (GPT→Claude→Llama) = viết lại. MCP tách tool ra khỏi app: tool sống trong **server** độc lập, app chỉ là **client** gọi qua chuẩn chung.

### Chương 3 — Kiến trúc Client-Server
3 vai trò:
- **MCP Host** — ứng dụng AI (Claude Desktop, Cursor, IDE) nơi user giao tiếp.
- **MCP Client** — bộ chuyển nằm trong host, nói giao thức MCP.
- **MCP Server** — chương trình bạn viết, exposures Resources/Tools/Prompts.

Client ↔ Server qua **JSON-RPC 2.0**. 1 host chạy được nhiều server (mỗi server 1 nguồn dữ liệu).

### Chương 4 — Cài đặt & môi trường
Python SDK chính thức: `pip install mcp`. Node: `npx @modelcontextprotocol/create-server`. Để test cần 1 client — **Claude Desktop** (miễn phí) là dễ nhất.

> **Bài tập 1:** `pip install mcp` rồi `import mcp; print(mcp.__version__)`.

---

## L1 · Ba trụ cột (Primitives)

### Chương 5 — Resources (đọc dữ liệu)
Resource = dữ liệu **thụ động** LLM đọc (file, dòng DB, API response). Mỗi resource có URI (`file://logs/app.log`, `postgres://users/42`). LLM không "gọi" resource — host tự nạp khi cần ngữ cảnh.

```python
from mcp.server.fastmcp import FastMCP
mcp = FastMCP("ops-helper")

@mcp.resource("file:///var/log/app.log")
def app_log() -> str:
    return open("/var/log/app.log").read()
```

### Chương 6 — Tools (hành động)
Tool = hàm LLM **gọi** để thực thi: query DB, gửi email, chạy script. Khai báo `@mcp.tool()` + docstring (tự sinh schema).

```python
@mcp.tool()
def restart_service(name: str) -> str:
    """Khởi động lại dịch vụ `name` (vd: nginx)."""
    import subprocess
    subprocess.run(["systemctl", "restart", name], check=True)
    return f"✅ {name} restarted"
```

> **Bài tập 2:** Tool `get_weather(city: str) -> str` trả "nắng 32°C".

### Chương 7 — Prompts (template động)
Prompt = template quản lý tập trung phía server, thay vì hardcode mỗi client. User gõ `/` trong Claude Desktop → thấy prompt server cung cấp. Dùng cho workflow lặp (vd `/analyze-log`).

```python
@mcp.prompt()
def analyze_log(service: str) -> str:
    return f"Phân tích log của {service}, tìm 3 lỗi nghiêm trọng nhất."
```

### Chương 8 — Sampling & Roots
- **Sampling** — server **yêu cầu** client gọi LLM (đảo chiều): dùng khi server cần AI suy luận (vd tóm tắt log trước khi trả).
- **Roots** — client cho server biết scope filesystem/project (`/home/user/project`) để server giới hạn truy cập.

---

## L2 · Kiến trúc & giao tiếp

### Chương 9 — JSON-RPC 2.0
MCP dùng JSON-RPC 2.0: message là JSON `{jsonrpc, id, method, params}`. 3 loại: **request** (có response), **notification** (1 chiều), **response**. SDK che đi chi tiết — bạn hiếm khi viết JSON tay.

### Chương 10 — Transport
Cách client-server gửi byte:
- **stdio** — server là process con, giao tiếp qua stdin/stdout. Đơn giản, local (Claude Desktop mặc định).
- **Streamable HTTP** — server chạy远程 (URL), đa client. Cho deploy production/cloud.

> Chọn: dev local → stdio; production → HTTP.

### Chương 11 — Lifecycle
3 giai đoạn: (1) **Initialize** — bắt tay, trao capability; (2) **Operate** — trao đổi request/notification; (3) **Shutdown** — đóng gọn gàng. Server & client chạy song song → dùng `async def`.

### Chương 12 — Security & Human-in-the-loop
- **Control phân tách**: LLM đề nghị, code thực thi (giống function calling an toàn).
- **Human approval**: tool nguy hiểm (xóa DB, gửi tiền) → client xin user xác nhận.
- **Sandbox**: server giới hạn quyền (chỉ đọc log, không ghi hệ thống).
- **Không tin input**: mọi dữ liệu server fetch coi như đã bị ô nhiễm (RAG/indirect injection).

---

## L3 · Thực chiến

### Chương 13 — Build MCP Server Python
Mini-project: server đọc log (Resource) + restart dịch vụ (Tool).

```python
from mcp.server.fastmcp import FastMCP
import subprocess

mcp = FastMCP("ops-helper")

@mcp.resource("file:///var/log/app.log")
def app_log() -> str:
    return open("/var/log/app.log").read()

@mcp.tool()
def restart_service(name: str) -> str:
    """Restart dịch vụ `name`."""
    subprocess.run(["sudo", "systemctl", "restart", name], check=True)
    return f"restarted {name}"

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

> **Bài tập 3:** Thêm resource `config://app` trả nội dung `app.yaml`.

### Chương 14 — Cắm vào Claude Desktop
Sửa `claude_desktop_config.json` (macOS: `~/Library/Application Support/Claude/`, Windows: `%APPDATA%\Claude\`):

```json
{
  "mcpServers": {
    "ops-helper": {
      "command": "python",
      "args": ["/path/to/server.py"]
    }
  }
}
```
Khởi động lại Claude → thấy tool/resource. Ra lệnh: *"phân tích log, restart nginx nếu có lỗi OOM"*.

> **Bài tập 4:** Khối JSON khai báo server tên `docs` chạy `python docs_server.py`.

### Chương 15 — Debug bằng MCP Inspector
`npx @modelcontextprotocol/inspector python server.py` — UI web gọi thử tool, xem JSON-RPC traffic, bắt lỗi schema. Bắt buộc khi tool không hiện trong Claude.

> Lỗi thường gặp: tool không hiện → schema sai / exception trong handler / server crash (xem log Claude ở `mcp.log`).

### Chương 16 — Dự án & deploy
Capstone: server tra cứu nội bộ (RAG-lite) — Resource đọc tài liệu + Tool semantic search + Prompt `/ask-doc`. Deploy: stdio cho Claude Desktop; Streamable HTTP (FastAPI/Docker) cho web app. Mở rộng: kết nhiều server (docs + DB + calendar) cùng lúc trong 1 host.

> **Bài tập 5:** Chạy server ở transport stdio: `mcp.run(transport="stdio")`.

---

## 📋 Cheatsheet
| API | Tác dụng |
|---|---|
| `FastMCP("name")` | Tạo server (cấp cao) |
| `@mcp.resource(uri)` | Khai báo resource (đọc) |
| `@mcp.tool()` | Khai báo tool (gọi) |
| `@mcp.prompt()` | Khai báo prompt template |
| `mcp.run(transport=...)` | Chạy server (stdio/http) |
| `list_resources` / `read_resource` | API resource cấp thấp |

**Chọn transport:** local → stdio; production → Streamable HTTP. **An toàn:** LLM đề nghị → code thực thi + human approval cho tool nguy hiểm.

## 🃏 Flashcards
- **MCP là gì?** Chuẩn mở (Anthropic) cho LLM ↔ tool/dữ liệu — "USB-C cho AI".
- **3 vai trò?** Host (app AI) → Client (bộ chuyển) → Server (tool của bạn).
- **Resource vs Tool?** Resource: đọc thụ động (URI); Tool: gọi thực thi.
- **Giao thức?** JSON-RPC 2.0.
- **2 transport?** stdio (local) & Streamable HTTP (production).
- **Sampling?** Server yêu cầu client gọi LLM (đảo chiều).
- **Roots?** Client chỉ scope filesystem cho server.
- **Security?** LLM đề nghị, code thực thi, human approval tool nguy hiểm.
- **Cắm Claude Desktop?** Sửa `claude_desktop_config.json`, thêm `mcpServers`.
- **Debug?** `npx @modelcontextprotocol/inspector`.
- **Lifecycle?** Initialize → Operate → Shutdown (async).
- **Prompt primitive?** Template động phía server, user gõ `/`.

---
*Học kèm [LangChain](khoa-hoc-langchain.html) & [Agentic AI](giao_trinh_agentic_ai.html) · một phần của [Mega Study](../index.html).*
