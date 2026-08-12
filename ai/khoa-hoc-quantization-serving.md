# 🚀 Quantization &amp; Serving LLM — End-to-End

> Bản Markdown gọn. Bản tương tác (sidebar, bài tập tự chấm, Quantization Builder): [`khoa-hoc-quantization-serving.html`](khoa-hoc-quantization-serving.html)
> Cài: `pip install autoawq vllm` + `llama.cpp` (C++ build). Cần GPU (RTX 3090/4090 24GB cho 8B). Học fine-tune ở [PEFT/LoRA](khoa-hoc-peft-lora.html), kiến trúc ở [ML/DL Arch](khoa-hoc-ml-dl-architecture.html) trước.

**16 chương · 4 cấp độ.** Biết cách ép một mô hình nặng hàng chục GB chạy mượt trên GPU eo hẹp (RTX 3090/4090 24GB). <strong>Quantization</strong> (INT4 — GPTQ/AWQ/GGUF) nén model 4×; <strong>serving</strong> (vLLM/TGI) phục vụ hàng nghìn request. End-to-end: tải FP16 → lượng tử → serve → benchmark.

---

## L0 · Nền tảng

### Chương 1 — Vì sao cần quantization
Model 7B FP16 = ~14GB chỉ trọng số; 70B = ~140GB — vượt xa GPU phổ thông (24GB). <strong>Quantization</strong> nén trọng số từ FP16 (16-bit) xuống INT4 (4-bit) → giảm 4× → 7B chỉ ~4GB, chạy được trên GPU consumer.

| | FP16 | INT8 | INT4 |
|---|---|---|---|
| Bit/param | 16 | 8 | 4 |
| 7B model | ~14 GB | ~7 GB | **~4 GB** |
| Chất lượng | 100% | ~99% | ~96–98% |
| Tốc độ | Baseline | Nhanh hơn | Nhanh hơn (memory-bound) |

### Chương 2 — FP16 vs INT8 vs INT4
- <strong>FP16/BF16</strong>: huấn luyện gốc, độ chính xác cao.
- <strong>INT8</strong>: nén 2×, mất rất ít chất lượng.
- <strong>INT4</strong>: nén 4×, mất vài %, đủ cho hầu hết use case. Sweet spot.

### Chương 3 — Các phương pháp quantization
- <strong>PTQ (Post-Training Quantization)</strong>: lượng tử sau train, không train lại — GPTQ, AWQ, GGUF. Phổ biến.
- <strong>QAT (Quantization-Aware Training)</strong>: train lại với quantization — chất lượng cao hơn nhưng tốn kém.
- <strong>GGUF</strong>: định dạng của llama.cpp, tối ưu CPU/Apple Silicon.

### Chương 4 — Setup
```bash
pip install autoawq auto-gptq vllm transformers accelerate
# llama.cpp: clone + cmake build (hoặc tải binary)
```

&gt; **Bài tập 1:** `pip install autoawq vllm`.

---

## L1 · Lượng tử hóa

### Chương 5 — Tải &amp; đo model FP16
Đo mức ngốn VRAM trước/sau để thấy phép màu:
```python
import torch
from transformers import AutoModelForCausalLM
model = AutoModelForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-8B", torch_dtype=torch.float16, device_map="auto")
print(torch.cuda.memory_allocated()/1e9, "GB")   # ~15 GB
```

&gt; **Bài tập 2:** Load model FP16 + in VRAM đã cấp.

### Chương 6 — AutoAWQ — lượng tử INT4
```python
from awq import AutoAWQForCausalLM
model = AutoAWQForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-8B")
model.quantize("./calib-data", quant_config={"zero_point": False, "w_bit": 4, "q_group_size": 128})
model.save_quantized("./llama3-8b-awq")
```
AWQ (Activation-aware Weight Quantization) bảo vệ trọng số "quan trọng" → ít mất chất lượng hơn GPTQ ở INT4.

&gt; **Bài tập 3:** `model.quantize(...)` với `w_bit=4`.

### Chương 7 — AutoGPTQ (alternative)
GPTQ dùng xấp xỉ Gauss-Newton, từng lớp một. Cũ hơn AWQ, được hỗ trợ rộng. Khi AWQ không có cho model bạn cần → dùng GPTQ.

### Chương 8 — GGUF cho CPU/llama.cpp
```bash
python convert_llama_to_gguf.py model/ --outtype f16
./llama-quantize model-f16.gguf model-q4_k_m.gguf Q4_K_M
```
GGUF (Q4_K_M) cho chạy LLM trên CPU/MacBook không cần GPU. Lý tưởng cho local/private.

---

## L2 · Serving

### Chương 9 — vLLM — engine phục vụ nhanh nhất
vLLM tải model đã quantize + phục vụ qua API tương thích OpenAI:
```bash
vllm serve ./llama3-8b-awq --quantization awq --port 8000
```
Client gọi y hệt OpenAI: <code>POST /v1/completions</code>.

&gt; **Bài tập 4:** Lệnh <code>vllm serve ./model --quantization awq</code>.

### Chương 10 — PagedAttention — vì sao vLLM nhanh
vLLM dùng <strong>PagedAttention</strong>: quản lý KV cache như virtual memory (paging) → không phân mảnh, batch được nhiều request hơn. Throughput cao hơn HF Transformers 10–20×.

### Chương 11 — OpenAI-compatible API
vLLM/TGI đều expose API giống OpenAI → code sẵn của bạn (langchain, openai SDK) đổi base_url là chạy. Không lock-in.

### Chương 12 — TGI (HuggingFace) — alternative
TGI (Text Generation Inference) chạy qua Docker, tích hợp sâu HF Hub. Ít tinh chỉnh hơn vLLM nhưng dễ deploy enterprise.

---

## L3 · Benchmark &amp; thực chiến

### Chương 13 — Stress test
```python
# Bắn 100 request đồng thời vào API vLLM
import asyncio, httpx, time
async def fire(c, q): ...
# Đo: throughput (tokens/s), TTFT (time to first token)
```

&gt; **Bài tập 5:** Viết hàm đếm tokens/giây từ 1 request.

### Chương 14 — Peak VRAM &amp; tránh OOM
- Đo bằng <code>nvidia-smi</code> trong lúc serve.
- Batch lớn → VRAM cao hơn nhưng throughput tốt hơn.
- OOM → giảm <code>max_model_len</code>, giảm <code>gpu_memory_utilization</code>, dùng INT4.

### Chương 15 — Mẹo chọn phương pháp
| Tình huống | Chọn |
|---|---|
| GPU consumer (24GB), serve nhiều user | AWQ INT4 + vLLM |
| CPU/MacBook private | GGUF Q4_K_M + llama.cpp |
| Cần chất lượng tối đa, GPU lớn | FP16/BF16 (không quantize) |
| Edge/mobile | INT4 + llama.cpp |

### Chương 16 — Dự án: serve Llama-3-8B trên RTX 3090
Tải FP16 (đo 15GB) → AutoAWQ INT4 (4GB) → vLLM serve → stress test 100 request → báo cáo throughput/TTFT/peak VRAM. So sánh: chỉ chạy được với INT4 (FP16 vừa VRAM nhưng không còn dư cho KV cache/batch).

---

## 📋 Cheatsheet
| Tool | Tác dụng |
|---|---|
| `AutoAWQForCausalLM.quantize` | Lượng tử INT4 (AWQ) |
| `auto-gptq` | Lượng tử INT4 (GPTQ) |
| `llama-quantize` | Tạo GGUF Q4_K_M |
| `vllm serve` | Phục vụ API nhanh |
| `nvidia-smi` | Đo VRAM |

**Quy trình:** FP16 → quantize (AWQ/GGUF) → serve (vLLM/llama.cpp) → benchmark. **Sweet spot:** INT4 AWQ + vLLM cho GPU consumer.

## 🃏 Flashcards
- **Vì sao quantization?** Nén model 4× để chạy GPU eo hẹp (24GB).
- **FP16/INT8/INT4?** 16/8/4 bit mỗi param. INT4 = sweet spot.
- **PTQ vs QAT?** PTQ lượng tử sau train (đa số); QAT train lại.
- **AWQ?** Activation-aware, bảo vệ trọng số quan trọng — ít mất chất lượng INT4.
- **GPTQ?** Xấp xỉ Gauss-Newton từng lớp, cũ hơn, hỗ trợ rộng.
- **GGUF?** Định dạng llama.cpp, tối ưu CPU/Mac.
- **vLLM?** Engine serve nhanh nhất, API tương thích OpenAI.
- **PagedAttention?** Quản lý KV cache như virtual memory → throughput 10-20×.
- **TTFT?** Time To First Token — tốc độ phản hồi chữ đầu.
- **TGI?** Text Generation Inference (HF), Docker, enterprise.
- **Q4_K_M?** Biến thể GGUF INT4 cân bằng tốc/chất lượng.
- **OOM serve?** Giảm max_model_len, gpu_memory_utilization, dùng INT4.

---
*Học kèm [PEFT/LoRA](khoa-hoc-peft-lora.html) &amp; [ML/DL Arch](khoa-hoc-ml-dl-architecture.html) · một phần của [Mega Study](../index.html).*
