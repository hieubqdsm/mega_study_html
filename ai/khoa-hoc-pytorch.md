# 🔥 Khóa Học PyTorch — Từ Căn Bản Đến Nâng Cao

> Bản Markdown gọn của khóa học. Bản tương tác (sidebar, bài tập tự chấm, nn.Module Builder): [`khoa-hoc-pytorch.html`](khoa-hoc-pytorch.html)
> Thực hành trên [Google Colab](https://colab.research.google.com) (có sẵn PyTorch + GPU) hoặc local: `pip install torch torchvision`.

**16 chương · 4 cấp độ.** Phong cách "Pythonic, tường minh": bạn tự viết vòng lặp huấn luyện.

---

## L0 · Nhập môn

### Chương 1 — PyTorch là gì & cài đặt
- **PyTorch** (Meta): học sâu dựa trên tensor với **autograd động** (define-by-run) — đồ thị dựng khi chạy, debug như Python thường. Ưa chuộng trong nghiên cứu & phần lớn dự án LLM.
- `torch` (tensor/autograd), `torch.nn` (lớp/loss), `torch.optim` (optimizer), `torch.utils.data` (Dataset/DataLoader), `torchvision` (ảnh).

```bash
pip install torch torchvision
python -c "import torch; print(torch.__version__, torch.cuda.is_available())"
```
**PyTorch vs TF:** ở PyTorch *bạn* viết training loop (tường minh); ở Keras `model.fit` làm hộ.

### Chương 2 — Tensor: shape, dtype, device
```python
import torch
a = torch.tensor([[1., 2.], [3., 4.]])
a @ b; a.mean(); a.sum(dim=0); a.view(4)
device = 'cuda' if torch.cuda.is_available() else 'cpu'
a = a.to(device)              # model & batch phải CÙNG device
n = a.cpu().numpy(); t = torch.from_numpy(np.ones(3))
```
> ⚠️ `Expected all tensors to be on the same device` = quên `.to(device)`.

> **Bài tập 1:** `x = torch.ones(3, 4)`, tính `x.sum(dim=0)` → `[3,3,3,3]`.

### Chương 3 — Autograd: backward()
```python
w = torch.tensor(3.0, requires_grad=True)
y = w ** 2
y.backward()        # tính dy/dw
print(w.grad)       # 6.0
with torch.no_grad():
    w -= 0.1 * w.grad
w.grad.zero_()      # XÓA grad (PyTorch cộng dồn!)
```
> 🚫 Gradient bị cộng dồn → mỗi vòng phải `optimizer.zero_grad()`.

> **Bài tập 2:** `x = torch.tensor(2.0, requires_grad=True)`; `y = x**3 + 2*x`; `y.backward()`; `x.grad` (=14).

---

## L1 · Cơ bản

### Chương 4 — nn.Module — model đầu tiên
```python
import torch.nn as nn
import torch.nn.functional as F
class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.drop = nn.Dropout(0.2)
        self.fc2 = nn.Linear(128, 10)
    def forward(self, x):
        x = x.view(x.size(0), -1)
        x = F.relu(self.fc1(x))
        x = self.drop(x)
        return self.fc2(x)        # trả logits (KHÔNG softmax)
```
> `nn.CrossEntropyLoss` đã gộp softmax → forward trả logits thô.

> **Bài tập 3:** `MLP(nn.Module)` với `nn.Linear(64,32)`, `nn.Linear(32,1)`, forward `self.fc2(F.relu(self.fc1(x)))`. Nhớ `super().__init__()`.

### Chương 5 — Vòng lặp huấn luyện chuẩn (5 bước)
```python
model = Net().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
for epoch in range(EPOCHS):
    model.train()
    for X, y in train_loader:
        X, y = X.to(device), y.to(device)
        optimizer.zero_grad()      # 1
        out = model(X)             # 2
        loss = criterion(out, y)   # 3
        loss.backward()            # 4
        optimizer.step()           # 5
```
**Học thuộc:** `zero_grad → forward → loss → backward → step`.

> **Bài tập 4:** điền đúng 5 bước trên.

### Chương 6 — Dataset & DataLoader
```python
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
tf = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])
train_ds = datasets.MNIST('.', train=True, download=True, transform=tf)
train_loader = DataLoader(train_ds, batch_size=64, shuffle=True, num_workers=2)
```
> PyTorch dùng **CHW**: `(batch, channels, H, W)` (khác TF channels-last). `ToTensor()` tự hoán vị.

> **Bài tập 5:** `DataLoader(train_ds, batch_size=64, shuffle=True)`.

### Chương 7 — Loss, Optimizer, Scheduler
| Bài toán | Loss |
|---|---|
| Phân loại nhiều lớp | `nn.CrossEntropyLoss` (nhận logits) |
| Nhị phân | `nn.BCEWithLogitsLoss` |
| Hồi quy | `nn.MSELoss` / `nn.L1Loss` |
```python
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3, weight_decay=1e-4)  # weight_decay = L2
scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=10, gamma=0.1)
```
> **Bài tập 6:** `criterion = nn.CrossEntropyLoss()`; `optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)`.

---

## L2 · Trung cấp

### Chương 8 — CNN cho ảnh
```python
class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool  = nn.MaxPool2d(2)
        self.fc    = nn.Linear(64 * 8 * 8, 10)
    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = torch.flatten(x, 1)
        return self.fc(x)
```
> Tự tính chiều vào Linear (32×32 → 8×8 sau 2 pool, 64 kênh ⇒ 64*8*8) hoặc dùng `nn.LazyLinear`.

> **Bài tập 7:** `nn.Conv2d(3, 16, 3, padding=1)` + `nn.MaxPool2d(2)`.

### Chương 9 — Transfer learning
```python
from torchvision import models
model = models.resnet18(weights='IMAGENET1K_V1')
for p in model.parameters(): p.requires_grad = False     # đóng băng
model.fc = nn.Linear(model.fc.in_features, 5)            # thay đầu 5 lớp
optimizer = torch.optim.Adam(model.fc.parameters(), lr=1e-3)
```

### Chương 10 — Lưu/Load, GPU, eval()
```python
torch.save(model.state_dict(), 'model.pth')   # lưu state_dict (khuyên dùng)
model.load_state_dict(torch.load('model.pth'))
model.eval()                                   # TẮT dropout, BN inference
with torch.no_grad():
    preds = model(X.to(device))
```
> 🚫 Quên `model.eval()` → dropout vẫn bật, kết quả suy luận sai. Luôn cặp `eval()` + `no_grad()`.

> **Bài tập 8:** save state_dict, load_state_dict, eval.

### Chương 11 — Regularization
```python
nn.Sequential(nn.Linear(256,128), nn.BatchNorm1d(128), nn.ReLU(), nn.Dropout(0.3))
```
Early stopping tự cài: theo dõi `val_loss`, lưu best, dừng sau `patience` epoch không cải thiện.

### Chương 12 — Custom Dataset & loss
```python
from torch.utils.data import Dataset
class MyDataset(Dataset):
    def __init__(self, X, y): self.X, self.y = X, y
    def __len__(self): return len(self.X)
    def __getitem__(self, i): return self.X[i], self.y[i]
```
3 method bắt buộc: `__init__`, `__len__`, `__getitem__`. Loss tùy biến = hàm `(pred, target)` trả scalar `backward()` được.

---

## L3 · Nâng cao & triển khai

### Chương 13 — RNN/LSTM & NLP
```python
class TextClassifier(nn.Module):
    def __init__(self, vocab, emb=128, hid=64):
        super().__init__()
        self.emb = nn.Embedding(vocab, emb)
        self.lstm = nn.LSTM(emb, hid, batch_first=True, bidirectional=True)
        self.fc = nn.Linear(hid * 2, 1)
    def forward(self, x):
        x = self.emb(x)
        _, (h, _) = self.lstm(x)
        return self.fc(torch.cat([h[-2], h[-1]], dim=1))
```
> `batch_first=True` cho `(batch, seq, feature)`. Câu dài ngắn khác nhau: `pad_sequence`.

### Chương 14 — Mixed precision & đa GPU
```python
scaler = torch.cuda.amp.GradScaler()
for X, y in loader:
    optimizer.zero_grad()
    with torch.autocast(device_type='cuda'):
        loss = criterion(model(X), y)
    scaler.scale(loss).backward(); scaler.step(optimizer); scaler.update()
```
Khác: `torch.compile(model)` (PyTorch 2.x), `DistributedDataParallel` (đa GPU chuẩn), `pin_memory=True`.

### Chương 15 — TorchScript / ONNX / mobile
```python
torch.jit.script(model).save('model.pt')         # TorchScript
torch.onnx.export(model, sample_input, 'model.onnx')   # ONNX
```
| Đích | Công cụ |
|---|---|
| Server | TorchScript / `torch.export` |
| Đa nền tảng | ONNX + ONNX Runtime |
| Điện thoại | ExecuTorch / LiteRT |
> `trace` ghi 1 lần chạy (mất nhánh động); `script` phân tích cả luồng điều khiển.

### Chương 16 — Dự án thực chiến
`ImageFolder` + transform → DataLoader → `resnet18` đóng băng, thay `model.fc` = Linear(...,5) → CrossEntropyLoss + Adam → vòng 5 bước + early stopping → `eval()`+`no_grad()` đánh giá → xuất ONNX/TorchScript.

> **Bài tập 9:**
> ```python
> model.eval()
> with torch.no_grad():
>     for X, y in val_loader:
>         out = model(X)
> ```

---

## 📋 Cheatsheet
| 5 bước train | Lệnh |
|---|---|
| Xóa grad | `optimizer.zero_grad()` |
| Forward | `out = model(X)` |
| Loss | `loss = criterion(out, y)` |
| Backward | `loss.backward()` |
| Cập nhật | `optimizer.step()` |

| Khác | |
|---|---|
| `nn.Linear / Conv2d / LSTM` | Lớp |
| `CrossEntropyLoss / MSELoss` | Loss |
| `model.eval()` + `torch.no_grad()` | Suy luận |
| `state_dict()` | Lưu trọng số |
| `torch.jit.script` / `torch.onnx.export` | Triển khai |

## 🃏 Flashcards
- **Tensor khác NumPy?** Chạy GPU + autograd.
- **requires_grad?** Theo dõi để tính đạo hàm.
- **Vì sao zero_grad mỗi vòng?** Grad bị cộng dồn.
- **5 bước?** zero_grad → forward → loss → backward → step.
- **nn.Module override?** `__init__` + `forward`.
- **CrossEntropyLoss nhận?** Logits thô + nhãn số nguyên.
- **CHW hay HWC?** CHW (channels trước).
- **model.eval()?** Tắt dropout, BN inference.
- **no_grad()?** Tắt autograd khi suy luận.
- **Lưu model?** state_dict() + load_state_dict.
- **weight_decay?** L2 regularization.
- **Xuất đa nền tảng?** TorchScript / ONNX.

---
*Học kèm [TensorFlow](khoa-hoc-tensorflow.html) & [scikit-learn](khoa-hoc-scikit-learn.html) · một phần của [Mega Study](../index.html).*
