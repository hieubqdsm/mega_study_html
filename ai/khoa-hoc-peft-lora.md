# 🧩 Khóa Học PEFT & LoRA — Fine-Tune LLM Tiết Kiệm

> Bản Markdown gọn. Bản tương tác (sidebar, bài tập tự chấm, LoRA Config Builder): [`khoa-hoc-peft-lora.html`](khoa-hoc-peft-lora.html)
> Cài: `pip install peft transformers datasets accelerate bitsandbytes`. Nên có GPU (Colab T4 đủ cho QLoRA ~7B). Học [Hugging Face](khoa-hoc-hugging-face.html) trước.

**16 chương · 4 cấp độ.** PEFT chỉ train một phần rất nhỏ tham số; LoRA là phương pháp phổ biến nhất; QLoRA fine-tune model lớn trên 1 GPU.

---

## L0 · Nhập môn

### Chương 1 — Vì sao cần PEFT
Full fine-tune 7B = cập nhật 7 tỉ tham số → hàng chục/trăm GB VRAM (gradient + Adam state). PEFT đóng băng model gốc, chỉ train ~0.1–1% tham số → giảm VRAM & lưu trữ hàng trăm lần, chất lượng gần tương đương.

| | Full FT | LoRA/PEFT |
|---|---|---|
| Tham số train | 100% | ~0.1–1% |
| VRAM | Rất lớn | Nhỏ (QLoRA: 1 GPU) |
| Lưu | Cả model (GB) | Adapter (vài MB) |
| Nhiều tác vụ | Mỗi tác vụ 1 model | 1 model + N adapter nhỏ |

### Chương 2 — LoRA là gì
Giữ `W` đóng băng, học `ΔW = B·A` (hai ma trận nhỏ, hạng `r` nhỏ 4–64):
```
h = W·x + (α/r)·B·A·x
  A: r×d (ngẫu nhiên);  B: d×r (khởi tạo 0 → ΔW=0 lúc đầu)
  chỉ train A,B → ~2·r·d tham số (nhỏ hơn d² rất nhiều)
```
"Low-rank" hiệu quả vì phần thay đổi cần thiết có hạng nội tại thấp.

### Chương 3 — Siêu tham số
| Tham số | Ý nghĩa | Khởi đầu |
|---|---|---|
| `r` | Dung lượng adapter | 8–16 |
| `lora_alpha` | Scale (hiệu lực ∝ α/r) | 16–32 (≈2r) |
| `lora_dropout` | Chống overfit | 0.05 |
| `target_modules` | Lớp gắn LoRA | q_proj,v_proj / "all-linear" |

> **Bài tập 1:** dict `{"r": 16, "lora_alpha": 32, "lora_dropout": 0.05}`.

---

## L1 · LoRA với HF peft

### Chương 4 — LoraConfig & get_peft_model
```python
from peft import LoraConfig, get_peft_model, TaskType
config = LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05,
    target_modules=["q_proj", "v_proj"], task_type=TaskType.CAUSAL_LM)
model = get_peft_model(base, config)
model.print_trainable_parameters()   # trainable%: ~0.09
```
> **Bài tập 2:** `LoraConfig(r=8, lora_alpha=16, target_modules=["q_proj","v_proj"], task_type=TaskType.CAUSAL_LM)` + `get_peft_model`.

### Chương 5 — Train bằng Trainer
```python
args = TrainingArguments(output_dir="lora-out", per_device_train_batch_size=4,
    gradient_accumulation_steps=4, learning_rate=2e-4,   # LoRA dùng LR cao hơn
    num_train_epochs=3, fp16=True)
Trainer(model=model, args=args, train_dataset=ds_tok).train()
```
LoRA LR ~1e-4–3e-4 (cao hơn 2e-5 của full FT).

### Chương 6 — Lưu/load adapter
```python
model.save_pretrained("my-adapter")     # CHỈ A,B (vài MB)
from peft import PeftModel
model = PeftModel.from_pretrained(base, "my-adapter")
```
Adapter không chứa model gốc → nạp cần cùng base.

> **Bài tập 3:** `save_pretrained("my-adapter")` + `PeftModel.from_pretrained(base, "my-adapter")`.

### Chương 7 — Merge adapter
```python
merged = model.merge_and_unload()    # W ← W + (α/r)·B·A
```
Merge → suy luận nhanh, dễ export, nhưng mất "adapter vài MB" & tính hoán đổi tác vụ.

> **Bài tập 4:** `model.merge_and_unload()`.

---

## L2 · QLoRA & thực chiến

### Chương 8 — QLoRA (4-bit)
Base lượng tử 4-bit (đóng băng) + LoRA adapter (độ chính xác cao) → fine-tune 7B–70B trên 1 GPU.
```python
from transformers import BitsAndBytesConfig
from peft import prepare_model_for_kbit_training, get_peft_model, LoraConfig
import torch
bnb = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.bfloat16, bnb_4bit_use_double_quant=True)
base = AutoModelForCausalLM.from_pretrained(MODEL, quantization_config=bnb, device_map="auto")
base = prepare_model_for_kbit_training(base)
model = get_peft_model(base, LoraConfig(r=16, lora_alpha=32,
        target_modules="all-linear", task_type="CAUSAL_LM"))
```
`nf4` (NormalFloat4) + double quant = công thức QLoRA gốc.

> **Bài tập 5:** `BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4")` + `prepare_model_for_kbit_training(base)`.

### Chương 9 — target_modules
| Lựa chọn | Hiệu quả |
|---|---|
| `["q_proj","v_proj"]` | LoRA gốc, ít tham số |
| + k,o_proj | Toàn attention |
| + MLP (gate/up/down) | Mạnh hơn, nhiều tham số |
| `"all-linear"` | Mọi lớp tuyến tính — khuyên dùng |
> Tên lớp khác theo model; `"all-linear"` để khỏi đoán.

> **Bài tập 6:** `LoraConfig(r=16, lora_alpha=32, target_modules="all-linear", task_type="CAUSAL_LM")`.

### Chương 10 — Nhiều adapter
```python
model.load_adapter("adapter-dich", adapter_name="dich")
model.set_adapter("dich")     # hoán đổi tác vụ, không tải lại base
```
1 base + N adapter nhỏ → tiết kiệm khổng lồ ở production.

### Chương 11 — PEFT theo tác vụ
`CAUSAL_LM` (sinh/chat), `SEQ_2_SEQ_LM` (dịch/tóm tắt), `SEQ_CLS` (phân loại), `TOKEN_CLS` (NER). Instruction-tune LLM: dùng `SFTTrainer` (trl) + PEFT.

### Chương 12 — Inference & deploy
```python
model = PeftModel.from_pretrained(base, "me/my-lora-adapter").eval()
model.generate(**ids, max_new_tokens=128)
```
Phục vụ: vLLM (multi-LoRA động) hoặc `merge_and_unload` → GGUF/ONNX.

---

## L3 · Nâng cao

### Chương 13 — Phương pháp PEFT khác
| Phương pháp | Ý tưởng | Khi nào |
|---|---|---|
| **QLoRA** | LoRA + base 4-bit | Model lớn, GPU nhỏ |
| **DoRA** | Tách độ lớn & hướng | Tốt hơn LoRA (`use_dora=True`) |
| **AdaLoRA** | Rank động theo tầm quan trọng | Tối ưu ngân sách |
| **Prompt/Prefix tuning** | Soft token trước input | Tác vụ nhẹ |
| **IA³** | Vector nhân vào activation | Cực nhẹ |

### Chương 14 — Mẹo & lỗi thường gặp
- **Loss không giảm:** LR quá thấp (cần 1e-4–3e-4) hoặc target_modules sai → kiểm `print_trainable_parameters()` > 0.
- **Hết VRAM:** gradient_checkpointing, giảm batch + tăng accumulation, QLoRA 4-bit.
- **Overfit:** tăng dropout, giảm epoch/r. **Học kém:** tăng r, mở rộng target_modules.
- **LLM decoder-only:** đặt `tokenizer.pad_token = tokenizer.eos_token`.
- 🚫 **trainable 0%** = target_modules không khớp tên lớp → dùng `"all-linear"`.

### Chương 15 — Đánh giá & so sánh
| | Full FT | LoRA | QLoRA |
|---|---|---|---|
| Chất lượng | ★★★★★ | ★★★★☆ | ★★★★☆ |
| VRAM | Rất cao | Trung bình | Thấp (1 GPU) |
| Lưu | Cả model | Adapter MB | Adapter MB |
> Đo trên tác vụ thật (acc/F1/BLEU/ROUGE, `lm-eval-harness`). LoRA thường đạt 95–100% chất lượng full FT.

### Chương 16 — Dự án: QLoRA một LLM nhỏ
Data instruction → BitsAndBytesConfig(nf4) + prepare_model_for_kbit_training → LoraConfig(r=16, all-linear) + get_peft_model → SFTTrainer/Trainer (LR 2e-4, bf16, grad checkpointing) → save adapter → PeftModel + generate → giữ adapter hoặc merge & export.

> **Bài tập 7:** `get_peft_model(base, LoraConfig(r=16, lora_alpha=32, target_modules="all-linear", task_type="CAUSAL_LM"))`.

---

## 📋 Cheatsheet
| API | Tác dụng |
|---|---|
| `LoraConfig` | Cấu hình |
| `get_peft_model` | Bọc model |
| `print_trainable_parameters` | Kiểm % |
| `save_pretrained` / `PeftModel.from_pretrained` | Lưu/nạp adapter |
| `merge_and_unload` | Gộp vào gốc |
| `prepare_model_for_kbit_training` | QLoRA |

**Khởi đầu:** r=8–16, alpha=2r, dropout=0.05, target_modules="all-linear", lr=2e-4.

## 🃏 Flashcards
- **PEFT?** Freeze gốc, train ít tham số thêm.
- **LoRA?** h = Wx + (α/r)·B·A·x; chỉ train A,B.
- **B khởi tạo 0?** ΔW=0 lúc đầu, không phá model.
- **r/alpha?** Dung lượng / scale (∝ α/r).
- **QLoRA?** Base 4-bit (nf4) + LoRA → model lớn trên 1 GPU.
- **Adapter?** A,B vài MB, cần base để nạp.
- **merge_and_unload?** Gộp vào W → nhanh, mất hoán đổi.
- **target_modules?** Lớp gắn LoRA; "all-linear" an toàn.
- **LR LoRA?** Cao hơn full FT (~2e-4).
- **trainable 0%?** target_modules sai.
- **DoRA?** use_dora=True, tốt hơn ở rank thấp.

---
*Học kèm [Hugging Face](khoa-hoc-hugging-face.html) & [PyTorch](khoa-hoc-pytorch.html) · một phần của [Mega Study](../index.html).*
