# 🤗 Khóa Học Hugging Face — Transformers, Datasets & Hub

> Bản Markdown gọn. Bản tương tác (sidebar, bài tập tự chấm, Pipeline Builder): [`khoa-hoc-hugging-face.html`](khoa-hoc-hugging-face.html)
> Cài: `pip install transformers datasets accelerate torch`. Model/dataset tải tự động từ Hub.

**16 chương · 4 cấp độ.** Hugging Face = "GitHub của AI": hàng triệu model/dataset mở + thư viện để tải, suy luận & fine-tune vài dòng.

---

## L0 · Nhập môn

### Chương 1 — Hệ sinh thái HF
`transformers` (model), `datasets` (data), `tokenizers`, `accelerate` (đa GPU), `peft` (fine-tune rẻ), `huggingface_hub`. Trung tâm là **the Hub** — kho model/dataset/Spaces.

### Chương 2 — pipeline()
```python
from transformers import pipeline
clf = pipeline("sentiment-analysis")
clf("Khóa học này tuyệt vời!")   # [{'label': 'POSITIVE', 'score': 0.99}]
gen = pipeline("text-generation", model="gpt2")
```
pipeline = tokenizer + model + hậu xử lý, cho mọi tác vụ.

> **Bài tập 1:** `pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")`.

### Chương 3 — The Hub & from_pretrained
```python
from transformers import AutoTokenizer, AutoModel
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained("bert-base-uncased")
```
`Auto*` tự nhận kiến trúc đúng từ tên model.

> **Bài tập 2:** tải AutoTokenizer & AutoModel từ `"distilbert-base-uncased"`.

---

## L1 · Lõi transformers

### Chương 4 — Tokenizer
```python
enc = tokenizer("Hello world", return_tensors="pt")   # input_ids, attention_mask
batch = tokenizer(texts, padding=True, truncation=True, return_tensors="pt")
```
Subword tokenization; `attention_mask` 1=token thật, 0=padding.

> **Bài tập 3:** `tokenizer(texts, padding=True, truncation=True, return_tensors="pt")`.

### Chương 5 — Model & AutoModel
| Lớp | Dùng cho |
|---|---|
| `AutoModel` | Embedding/hidden states |
| `AutoModelForSequenceClassification` | Phân loại câu |
| `AutoModelForTokenClassification` | NER |
| `AutoModelForCausalLM` | Sinh văn bản (GPT/Llama) |
| `AutoModelForSeq2SeqLM` | Dịch/tóm tắt (T5/BART) |
```python
logits = model(**enc).logits      # logits ≠ xác suất
probs = logits.softmax(dim=-1)
```

### Chương 6 — Datasets
```python
from datasets import load_dataset
ds = load_dataset("imdb")
ds_tok = ds.map(lambda b: tokenizer(b["text"], truncation=True), batched=True)
```
`map(batched=True)` memory-mapped → nhanh; `streaming=True` cho data khổng lồ.

> **Bài tập 4:** `load_dataset("imdb")` + `ds.map(tok, batched=True)`.

### Chương 7 — Suy luận đúng cách
```python
model.to(device).eval()
with torch.no_grad():
    out = model(**enc)
pred = out.logits.argmax(-1)
```
3 thứ: `.eval()`, `torch.no_grad()`, model & input cùng device.

---

## L2 · Fine-tuning

### Chương 8 — Trainer & TrainingArguments
```python
from transformers import TrainingArguments, Trainer
args = TrainingArguments(output_dir="out", learning_rate=2e-5,
    per_device_train_batch_size=16, num_train_epochs=3,
    eval_strategy="epoch")
Trainer(model=model, args=args, train_dataset=ds_tok["train"],
    eval_dataset=ds_tok["test"], tokenizer=tokenizer).train()
```
> **Bài tập 5:** `TrainingArguments(output_dir="out", num_train_epochs=3, per_device_train_batch_size=16)`.

### Chương 9 — Data collator & metrics
```python
from transformers import DataCollatorWithPadding
import evaluate, numpy as np
collator = DataCollatorWithPadding(tokenizer)       # dynamic padding
acc = evaluate.load("accuracy")
def compute_metrics(p):
    return acc.compute(predictions=np.argmax(p.predictions, -1), references=p.label_ids)
```

### Chương 10 — Fine-tune phân loại
load_dataset → map(tok) → AutoModelForSequenceClassification(num_labels=N) → TrainingArguments + collator + metrics → Trainer.train() → evaluate(). Bật `fp16=True` để nhanh.

> **Bài tập 6:** `Trainer(model=model, args=args, train_dataset=ds_tok["train"], eval_dataset=ds_tok["test"]).train()`.

### Chương 11 — Push to Hub
```python
model.push_to_hub("ten/model")      # sau huggingface-cli login
tokenizer.push_to_hub("ten/model")
```
Viết model card (README.md): dữ liệu, cách dùng, giới hạn, license.

### Chương 12 — Sinh văn bản (generate)
```python
out = lm.generate(ids, max_new_tokens=50, do_sample=True, temperature=0.8, top_p=0.95)
```
`do_sample` (ngẫu nhiên vs greedy), `temperature` (sáng tạo), `top_p/top_k` (giới hạn token).

---

## L3 · Nâng cao & triển khai

### Chương 13 — Accelerate
```python
from accelerate import Accelerator
acc = Accelerator()
model, optimizer, dataloader = acc.prepare(model, optimizer, dataloader)
acc.backward(loss)        # thay loss.backward()
# accelerate launch train.py
```
Viết loop 1 lần → chạy CPU/đa GPU/TPU + mixed precision.

### Chương 14 — Lượng tử hóa (bitsandbytes)
```python
from transformers import BitsAndBytesConfig
bnb = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.bfloat16)
model = AutoModelForCausalLM.from_pretrained(NAME, quantization_config=bnb, device_map="auto")
```
4-bit → model 7B vừa ~6GB VRAM. Nền của QLoRA → khóa [PEFT & LoRA](khoa-hoc-peft-lora.html).

### Chương 15 — Spaces & triển khai
Spaces (Gradio/Streamlit demo), Inference Endpoints (API production), Serverless Inference API, `optimum`+ONNX (tối ưu tốc độ).
```python
import gradio as gr
gr.Interface(fn=lambda t: clf(t), inputs="text", outputs="label").launch()
```

### Chương 16 — Dự án thực chiến
Phân loại review đa ngữ: load_dataset → tokenize → `xlm-roberta-base` + num_labels → Trainer + F1 → push_to_hub + model card + Gradio Space.

> **Bài tập 7:** `model.push_to_hub("me/my-model")` + `tokenizer.push_to_hub("me/my-model")`.

---

## 📋 Cheatsheet
| Lệnh | Tác dụng |
|---|---|
| `pipeline("task")` | Suy luận 1 dòng |
| `AutoTokenizer/AutoModelFor*.from_pretrained` | Tải |
| `.generate(...)` | Sinh văn bản |
| `load_dataset` / `ds.map(batched=True)` | Data |
| `TrainingArguments` / `Trainer(...).train()` | Train |
| `Accelerator` | Đa GPU |
| `BitsAndBytesConfig` | 4-bit/8-bit |
| `push_to_hub` | Đăng Hub |

## 🃏 Flashcards
- **The Hub?** Kho model/dataset/Spaces mở.
- **pipeline()?** tokenizer+model+hậu xử lý, 1 dòng.
- **Auto*?** Tự nhận kiến trúc từ tên model.
- **logits?** Điểm thô; softmax→xác suất.
- **CausalLM vs Seq2Seq?** Sinh (GPT) vs dịch/tóm tắt (T5).
- **map(batched=True)?** Theo lô, memory-mapped, nhanh.
- **Trainer?** Lo vòng lặp/optimizer/checkpoint/đa GPU.
- **4-bit?** BitsAndBytesConfig → model lớn vừa GPU nhỏ (nền QLoRA).
- **3 thứ suy luận?** eval(), no_grad(), cùng device.

---
*Học kèm [PEFT & LoRA](khoa-hoc-peft-lora.html) & [PyTorch](khoa-hoc-pytorch.html) · một phần của [Mega Study](../index.html).*
