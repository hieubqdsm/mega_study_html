# HK1 — AI FOUNDATION & MODELING (6 môn)

Tài liệu trích xuất từ `lo-trinh-ai-engineer-1-nam.html` (Sổ Giáo Án Kỹ Sư AI 1 năm).
HK1 gồm 6 môn: M1 Toán cho AI, M2 Python & Dữ liệu, M3 Machine Learning, M4 Deep Learning & CV, M5 NLP & LLM, M6 SQL Thực chiến.

**Lưu ý về số lượng buổi:** Chương trình dự kiến mỗi môn có 8–10 buổi. Tuy nhiên, trong LESSON_DETAIL của file HTML, các môn được viết chi tiết đầy đủ (timeline + giảng + bài tập + BTCN) như sau:

- **M1 Toán cho AI**: chi tiết Buổi 1–4 (Buổi 5–8 theo dự kiến nhưng trong LESSON_DETAIL là skeleton "đang hoàn thiện").
- **M2 Python & Dữ liệu**: chi tiết đầy đủ 8 buổi.
- **M3 Machine Learning**: chi tiết đầy đủ 10 buổi.
- **M4 Deep Learning & CV**: chi tiết đầy đủ 10 buổi.
- **M5 NLP & LLM**: chi tiết đầy đủ 8 buổi.
- **M6 SQL Thực chiến**: chi tiết đầy đủ 8 buổi.

Toàn bộ 6 môn đều có **5 đề thi** (15'×2, 45', GK, CK) đầy đủ đáp án & thang điểm.

---

## M1 — Toán cho AI

**Mã môn:** M1 · **Học kì:** HK1 · **Số tín chỉ:** 3 · **Số buổi:** 8 · **Tiên quyết:** — · **Đánh giá:** 15'×2 · 45' · GK · CK

**Mục tiêu môn:**
- Hiểu vector/ma trận — ngôn ngữ của AI
- Nắm đạo hàm & gradient descent
- Nắm xác suất & định lý Bayes
- Dùng NumPy tính toán hiệu quả

**Đầu ra mong đợi:**
- Tính nhân ma trận, biết quy tắc shape
- Code gradient descent tay
- Giải Bayes, hiểu phân phối chuẩn
- Vector hóa thay for

### Buổi 1: Giới thiệu môn & Ôn Đại số tuyến tính

*Mục tiêu: hiểu vì sao Toán là nền AI, ôn vector/ma trận, làm quen NumPy.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–10' | Warm-up — Giới thiệu môn | Nêu mục tiêu môn, cách chấm điểm, lịch kiểm tra. Hỏi: "AI dùng toán gì?" |
| 10–25' | Bài cũ — Không có (buổi đầu) | Khảo sát đầu vào 5 câu trắc nghiệm nền toán. |
| 25–55' | Giảng — Vì sao AI cần Toán | Ảnh = tensor số; mạng nơ-ron = nhân ma trận; học = tối ưu; dự đoán = xác suất. |
| 55–90' | Giảng — Vector & ma trận | Quy tắc nhân A(m,n)@B(n,p)→(m,p). Nhiều ví dụ shape. |
| 90–100' | ☕ Giải lao | |
| 100–150' | Thực hành — NumPy nhân ma trận | Tạo mảng, tính @, kiểm tra .shape. |
| 150–170' | Dặn dò — BTCN + thông báo KT15' | Giao 3 bài tập. Đầu buổi 2: KT15' về nhân ma trận. |

#### Bài cũ tra bài (đầu buổi sau) — Chuẩn bị phát biểu

1. Cho A(3,2) và B(2,4). Tích A@B có shape gì? Có tính được B@A không?
   - *Đáp:* (3,4). B@A không được (cột 4≠dòng 3).
2. Đạo hàm f(x)=x² tại x=3?
   - *Đáp:* f'=2x, tại x=3 → 6.
3. y=x·W+b đại diện gì trong mạng nơ-ron?
   - *Đáp:* Lớp fully-connected.

#### Nội dung giảng chi tiết

**Phần 1 — Vì sao AI cần Đại số tuyến tính (25 phút)**

Câu hỏi của người mới: "Em học Python, sao phải đau đầu với ma trận?" Trả lời: **máy tính không hiểu thế giới — nó chỉ hiểu số**. Khi AI nhận ảnh con mèo, nó không "nhìn thấy" lông hay tai, chỉ nhận một khối số khổng lồ: mỗi pixel là 3 con số 0–255 (RGB). Một ảnh 224×224 là khối 3×224×224 = 150.528 con số. Toàn bộ "nhận thức" của AI là thao tác toán trên khối số này.

Khối số nhiều chiều đó gọi là **tensor**. Đại số tuyến tính là ngôn ngữ thao tác trên tensor. Khi nghe "nhân trọng số", "tích chập", "attention" — tất cả là đại số tuyến tính cải trang. Nắm 3 phép cốt lõi (cộng, nhân, chuyển vị) = nắm 80% nền toán của deep learning.

> **📌 Giáo viên nhấn mạnh:** Đừng học đại số tuyến tính như Toán đại cương thuần lý thuyết. Hãy học như *công cụ*: mỗi khái niệm có ứng dụng AI trực tiếp. Thấy lớp mạng → nghĩ "đây chỉ là nhân ma trận" — sự "phép màu" mất đi, thay vào là hiểu biết.

**Phần 2 — Vector là gì, thật ra (15 phút)**

**Vector** đơn giản là một *dãy số có thứ tự*: v = [1, 2, 3]. Hiểu 2 cách đều đúng và đều quan trọng cho AI:

- **Cách hình học:** vector là *mũi tên* từ gốc tọa độ. Nhân vô hướng (dot product) đo "độ giống nhau" về hướng — cơ chế của embedding.
- **Cách dữ liệu:** vector là một *hàng đặc trưng* của mẫu. Khách hàng tuổi=25, thu nhập=1200, đơn=3 → [25,1200,3]. Dataset là chồng nhiều vector = ma trận.

**Shape (kích thước)** là khái niệm sinh tử. Vector [1,2,3] có shape (3,). Quy tắc vàng khi code: luôn in .shape trước & sau mỗi phép toán khi chưa chắc.

**Phần 3 — Ma trận: chồng nhiều vector (15 phút)**

**Ma trận** là *bảng số* 2 chiều — danh sách các vector xếp thành hàng. Ma trận A(m,n): m = số hàng (mẫu), n = số cột (đặc trưng).

```python
import numpy as np
v = np.array([1, 2, 3])
print(v.shape)            # (3,)
A = np.array([[1,2],[3,4],[5,6]])
print(A.shape)             # (3, 2)
```

**Chuyển vị** A.T lật hàng thành cột: (3,2) → (2,3). Phép toán bạn sẽ gọi hàng nghìn lần: XᵀX, attention Q·Kᵀ.

**Phần 4 — Phép nhân ma trận: trái tim mạng nơ-ron (20 phút)**

Một lớp fully-connected tính `y = x · W + b`: vector x nhân ma trận trọng số W, cộng bias b. Toàn bộ "trí tuệ" của một lớp mạng nằm trong W — máy học cách điền W bằng gradient descent (Buổi 2).

**Quy tắc nhân — thuộc lòng!** Để nhân A @ B: số cột A *phải bằng* số dòng B. Kết quả (số hàng A, số cột B): `A(m,n) @ B(n,p) → (m,p)`.

| Phép | A | B | Kết quả | Tính? |
|---|---|---|---|---|
| A @ B | (3, **2**) | (**2**, 4) | (3, 4) | ✅ |
| B @ A | (2, **4**) | (**3**, 2) | — | ❌ |
| A @ A.T | (3, **2**) | (**2**, 3) | (3, 3) | ✅ |

> **⚠️ Lỗi #1 của người mới:** Tưởng "nhân hai ma trận thì cứ nhân" → báo `ValueError: shapes not aligned`. **Nguyên tắc dạy:** vẽ 4 ví dụ lên bảng, cho học viên đoán trước khi công bố. 90% bug Toán nằm ở đây.

**Vì sao GPU là trái tim AI?** GPU có hàng nghìn lõi, mỗi lõi giỏi *nhân ma trận*. Train mạng = nhân ma trận hàng triệu lần/giây. GPU nhanh hơn CPU 10–100 lần — không phải vì "thông minh" mà vì giỏi nhân ma trận.

> **🎯 Tổng kết buổi:** 4 ý: (1) AI thao tác trên tensor số; (2) vector = một hàng đặc trưng; (3) ma trận = nhiều mẫu; (4) y=x·W+b là trái tim mạng. Nếu chỉ nhớ một điều: **(m,n)@(n,p)→(m,p)**.

#### Thực hành trên lớp

**Bài thực hành 1 — Tích ma trận & shape**

Cho X(4,3), W(3,2), b(2,). Tính `z = X @ W + b`, in z.shape (phải (4,2)).

```python
import numpy as np
X = np.random.rand(4, 3)
W = np.random.rand(3, 2)
b = np.array([0.5, -0.5])

# tính z và in shape
```

*Lời giải:*
```python
z = X @ W + b
print(z.shape)   # (4, 2)
```

#### Bài về nhà (BTCN)

1. Cho A(2,3), B(3,4), C(4,2). Tính (A@B)@C, in shape từng bước.
2. Viết hàm is_multipliable(A,B) trả True/False.
3. Đọc trước: đạo hàm & gradient (chuẩn bị B2).

> **📢 Thông báo:** Đầu **buổi 2**: **KT 15 phút** — 5 câu về nhân ma trận & shape. Mang giấy làm.

### Buổi 2: Đạo hàm & Gradient Descent

*Hiểu đạo hàm đo độ dốc, gradient chỉ hướng tăng nhanh nhất, gradient descent là cách máy "tự học".*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — 📝 KT 15 PHÚT #1 | Phát đề (xem trang Đề thi môn). Thu chấm, trả cuối buổi. |
| 15–35' | Warm-up — Đạo hàm = độ dốc | Vẽ parabol y=x². Hỏi: "Đỉnh dốc thế nào?" → 0. |
| 35–70' | Giảng — Đạo hàm & gradient | Quy tắc đạo hàm, đạo hàm riêng, gradient = la bàn hướng tăng. |
| 70–80' | ☕ Giải lao | |
| 80–110' | Giảng — Gradient Descent | 4 bước: khởi tạo → tính gradient → cập nhật ngược → lặp. Code 1 biến. |
| 110–155' | Thực hành — Code GD 2 biến | Học viên code cho f(x,y)=x²+4y², kết quả ≈ (0,0). |
| 155–175' | Dặn dò — Trả bài 15' + tổng kết | Giao BTCN. Chuẩn bị B3: NumPy. |

#### Nội dung giảng chi tiết

**Phần 1 — Đạo hàm là gì? Đo độ dốc (25 phút)**

Hình ảnh đời thường: bạn đi trên con dốc. Đoạn dốc đứng → cảm giác mạnh; thoai thoải → nhẹ; chỗ bằng → không dốc. **Đạo hàm f'(x)** chính là số đo *độ dốc* đó.

| Dấu đạo hàm | Ý nghĩa | Ví dụ |
|---|---|---|
| f'(x) > 0 | Hàm đang **tăng** | Đi lên dốc |
| f'(x) < 0 | Hàm đang **giảm** | Đi xuống dốc |
| f'(x) = 0 | **Cực trị** (đỉnh/đáy) | Mặt đất bằng |

**Quy tắc đạo hàm cơ bản:**

| f(x) | f'(x) | Ghi nhớ |
|---|---|---|
| xⁿ | n·xⁿ⁻¹ | "Hạ n xuống, giảm mũ đi 1" |
| x² | 2x | 2·x¹ |
| 3x²+2x | 6x+2 | Đạo hàm từng số hạng |

**Ví dụ số:** f(x)=x². Tại x=3: f'(3)=6 (tăng mạnh). Tại x=−2: f'(−2)=−4 (giảm). Tại x=0: f'(0)=0 — *đáy thung lũng*, điểm thấp nhất.

> **📌 Tại sao đạo hàm=0 là mục tiêu?** AI muốn sai số nhỏ nhất. Sai số thấp nhất ở điểm đạo hàm=0 (đáy thung lũng). Gradient descent tìm điểm đó.

**Phần 2 — Hàm nhiều biến & Gradient (15 phút)**

Trong AI, hàm lỗi phụ thuộc *hàng nghìn biến*. Ta dùng **đạo hàm riêng** — đạo hàm theo từng biến. Gộp lại thành **gradient ∇f** — vector chỉ hướng hàm *tăng nhanh nhất*. f(x,y)=x²+y² → ∇f=(2x,2y).

> **✅ Trực giác la bàn:** Gradient = la bàn chỉ hướng *đi lên* nhanh nhất. Muốn *xuống đáy* (tìm điểm nhỏ nhất)? Đi **ngược la bàn**. Đó là toàn bộ gradient descent.

**Phần 3 — Gradient Descent: cách máy "tự học" (30 phút)**

Ý tưởng 1 câu: đứng ở điểm hiện tại, tính độ dốc, bước nhỏ ngược dốc, lặp đến khi dốc≈0.

1. **Khởi tạo** tham số (ngẫu nhiên) — điểm xuất phát.
2. **Tính gradient** hàm lỗi — đo độ dốc.
3. **Cập nhật**: x = x − lr·gradient — bước ngược dốc.
4. **Lặp** 2–3 đến khi gradient≈0.

Công thức duy nhất cần nhớ: `x ← x − lr · ∇f`.

```python
# Tìm cực tiểu f(x)=(x+1)². Đáy thật ở x=-1.
x = 5.0; lr = 0.1
for step in range(50):
    g = 2*x + 2          # đạo hàm f'=2x+2
    x = x - lr * g       # bước ngược gradient
print(round(x, 4))        # ≈ -1.0 ✓ máy tự tìm đáy!
```

Theo dõi: x giảm 5 → 4.2 → 2.9 → 1.3 → −1.0. Máy *không ai chỉ*, tự đi xuống đáy. Đó là "học".

**Phần 4 — Learning rate: tham số sinh tử (15 phút)**

| lr | Hiện tượng | Xử lý |
|---|---|---|
| **Quá lớn** (1.0) | Bước vượt đáy, dao động/phân kỳ | Giảm lr ngay |
| **Quá nhỏ** (0.001) | Bước li ti, chậm | Tăng lr |
| **Vừa** (0.1) | Hội tụ êm | ✅ Giữ |

> **⚠️ Lỗi #1: lr quá lớn:** Dấu hiệu: loss *tăng* hoặc thành NaN. Nguyên nhân: bước quá lớn, nhảy qua lại xa dần → phân kỳ. Xử lý đầu tiên khi train hỏng: **giảm lr 10 lần**.

**Phần 5 — Cạm bẫy: cực tiểu địa phương (10 phút)**

Đồi nhiều thung lũng → GD có thể kẹt ở thung lũng nông. Tin tốt: trong mạng sâu, cực tiểu địa phương vẫn đủ tốt. Kỹ thuật thoát: momentum, Adam, khởi tạo tốt, mini-batch (gặp lại B9 PyTorch).

> **🎯 Tổng kết:** 5 ý: đạo hàm=độ dốc; đạo hàm=0 ở cực trị; gradient chỉ hướng tăng nhanh nhất; GD: x←x−lr·∇f; lr sinh tử. Nếu chỉ nhớ 1 công thức: `x = x - lr * df(x)`.

#### Thực hành trên lớp

**Bài thực hành 2 — Gradient descent 2 biến**

f(x,y)=x²+4y² (cực tiểu (0,0)). ∂f/∂x=2x, ∂f/∂y=8y. 30 bước, lr=0.1. Kết quả ≈ (0,0).

```python
x, y = 3.0, 3.0
lr = 0.1
for step in range(30):
    # đạo hàm riêng


    # cập nhật


print(round(x,4), round(y,4))
```

*Lời giải:*
```python
dx = 2*x; dy = 8*y
x = x - lr*dx; y = y - lr*dy
```

#### Bài về nhà (BTCN)

1. GD cho f(x)=x²+2x+1, x0=5, lr=0.1, 100 bước. In kết quả + nhận xét.
2. Thử lr=1.0 cho x²+4y² → quan sát phân kỳ, viết nhận xét.
3. Ôn vector hóa NumPy (chuẩn bị B3).

### Buổi 3: NumPy nâng cao & Vector hóa

*Bỏ vòng for, dùng vector hóa nhanh 100–1000×. Hiểu cạm bẫy broadcasting.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra GD | 2 học viên lên bảng trình bày bài lr=1.0 phân kỳ. |
| 15–35' | Warm-up — Benchmark | Demo: 1 triệu phần tử, for vs np.dot. Cả lớp thấy chênh lệch. |
| 35–70' | Giảng — Vector hóa | NumPy chạy trên C+SIMD. Quy tắc: không for khi vector được. |
| 70–80' | ☕ Giải lao | |
| 80–110' | Giảng — Broadcasting | Tự trải mảng nhỏ. Quy tắc trục. Cạm bẫy A(3,2)+c(3,). |
| 110–155' | Thực hành — ReLU + lớp mạng | Viết relu bằng np.maximum. Viết y=relu(X@W+b). |
| 155–175' | Dặn dò — Tổng kết | Nhấn: maximum≠max. Chuẩn bị B4: xác suất. |

#### Nội dung giảng chi tiết

**Phần 1 — Vì sao for là "tội ác" trong AI (20 phút)**

Trong Python thường, for bình thường. Trong AI, for trên dữ liệu lớn là "tội ác" hiệu năng. Khi viết `for i in range(1000000): s += a[i]*b[i]`, Python làm *một triệu lần*: gọi interpreter, kiểm tra kiểu, lấy phần tử, nhân, cộng. Python là ngôn ngữ **thông dịch** — chậm hơn C 50–100× ở mỗi thao tác.

Giải pháp: **vector hóa** — bảo NumPy "làm phép này trên toàn mảng cùng lúc". NumPy đẩy việc xuống **C/Fortran đã biên dịch** + dùng **SIMD** (Single Instruction, Multiple Data — xử lý nhiều số trong 1 lệnh). Kết quả: nhanh hơn **100–1000×**.

```python
import time, numpy as np
N = 1_000_000
a, b = np.random.rand(N), np.random.rand(N)
t=time.time(); s1=sum(a[i]*b[i] for i in range(N)); print("for:",time.time()-t)
t=time.time(); s2=np.dot(a,b);                       print("vec:",time.time()-t)
```

Trên máy điển hình: for ~0.3s, vector ~0.001s — **nhanh 300×**. Trong DL: for → 10 giờ/epoch; vector → 2 phút. Khác biệt "chạy được" vs "không chạy được".

> **📌 Quy tắc vàng:** Trong AI: **không bao giờ dùng for khi có thể dùng numpy trên cả mảng**. Khi thấy mình viết for trên numpy, dừng và nghĩ: "Có cách làm cả mảng không?" Hầu như luôn có.

**Phần 2 — Các phép numpy thiết yếu (15 phút)**

| Phép | Ví dụ | Tác dụng |
|---|---|---|
| Số học từng phần tử | a+b, a*2 | Giữ shape |
| Tích vô hướng | np.dot(a,b) | Σ aᵢ·bᵢ — 1 số |
| Nhân ma trận | X @ W | Lớp fully-connected |
| Cực trị từng phần tử | np.maximum(0,x) | ReLU — giữ shape |
| Cực trị tổng | np.max(x) | 1 số lớn nhất |

> **🚫 Cạm bẫy #1: nhầm maximum với max:** Tên na ná nhưng khác hoàn toàn. `np.maximum(0,x)` so từng phần tử → **trả mảng cùng shape** (dùng cho ReLU). `np.max(x)` trả **1 số**. Nhầm mà code vẫn chạy → kết quả sai rất khó debug. Nhớ: *maximum giữ shape, max phẳng hóa*.

**Phần 3 — Broadcasting: phép thuật & cạm bẫy (20 phút)**

**Broadcasting**: cộng mảng lớn với mảng nhỏ, NumPy tự *trải* mảng nhỏ ra. A(3,2) + b(2,) → b cộng vào mỗi hàng. Code gọn, chạy nhanh. Đây là cơ chế cộng bias vào lớp mạng.

```python
A = np.array([[1,2],[3,4],[5,6]])   # (3,2)
b = np.array([10, 20])               # (2,)
print(A + b)
# [[11 22] [13 24] [15 26]]  ← b vào mỗi hàng
```

Quy tắc khắt khe: so khớp *từ trục cuối*. Hai trục khớp nếu bằng nhau, hoặc một cái = 1.

| Phép | A | B | Kết quả | Vì sao |
|---|---|---|---|---|
| A+b | (3, **2**) | (**2**,)| (3,2) ✅ | 2=2 |
| A+c | (3, **2**) | (**3**,)| ❌ | 2≠3 |

> **⚠️ Debug broadcasting:** Gặp lỗi `could not be broadcast together`: in A.shape và b.shape; so trục cuối — phải bằng nhau (hoặc 1 cái=1). 90% lỗi ở trục cuối không khớp. Thói quen: **in shape trước mọi phép cộng/nhân khi chưa chắc**.

**Phần 4 — Viết lớp mạng thủ công (10 phút)**

Kết hợp: một lớp fully-connected chỉ 3 dòng numpy. (PyTorch nn.Linear ở B9, nhưng biết bên trong là nền tảng.)

```python
X = np.random.rand(4, 3)         # 4 mẫu, 3 đặc trưng
W = np.random.rand(3, 2) * 0.1   # trọng số
b = np.array([0.5, -0.5])
z = X @ W + b                    # nhân + broadcasting bias
y = np.maximum(0, z)             # ReLU
print(y.shape)                  # (4, 2)
```

> **🎯 Tổng kết:** 4 ý: for là "tội ác"; vector hóa đẩy xuống C+SIMD nhanh 100–1000×; broadcasting có quy tắc trục khắt khe; lớp mạng = X@W+b + ReLU. Thói quen quan trọng: **in .shape khi debug**.

#### Thực hành trên lớp

**Bài thực hành 3 — Hàm ReLU**

Viết relu(x) dùng np.maximum (KHÔNG phải np.max). Ép âm về 0, giữ shape.

```python
import numpy as np
def relu(x):


print(relu(np.array([-3, -1, 0, 2, 5])))   # [0 0 0 2 5]
```

*Lời giải:*
```python
def relu(x):
    return np.maximum(0, x)
```

#### Bài cũ tra (đầu B4) — Chuẩn bị phát biểu

1. Vì sao vector hóa nhanh hơn for?
   - *Đáp:* Chạy trên C/Fortran+SIMD, tránh overhead Python.
2. np.maximum vs np.max?
   - *Đáp:* maximum giữ shape; max phẳng thành 1 số.

### Buổi 4: Xác suất & Định lý Bayes

*Xác suất là ngôn ngữ của dự đoán trong bất định. Bayes qua ví dụ gây bất ngờ.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra vector hóa | 2 câu tra bài. Sửa nhanh ReLU BTCN. |
| 15–35' | Warm-up — Câu đố xác suất | Ví dụ test bệnh (dương tính nhưng chỉ 16% bệnh). Học viên đoán trước. |
| 35–75' | Giảng — Xác suất & Bayes | Xác suất có điều kiện. Công thức Bayes. Giải bài test bệnh từng bước. |
| 75–85' | ☕ Giải lao | |
| 85–120' | Giảng — Liên hệ AI | Phân loại = P(nhãn|đặc trưng). Sigmoid → xác suất. Naive Bayes. |
| 120–160' | Thực hành — Code Bayes | Code tính P(bệnh|dương) với các tham số khác nhau. |
| 160–175' | Dặn dò — Tổng kết + thông báo KT | B5: KT15' về Bayes. |

#### Nội dung giảng chi tiết

**Phần 1 — Xác suất: ngôn ngữ bất định (15 phút)**

AI không bao giờ chắc 100%. Khi mô hình nói "đây là mèo", thực ra nó nói "tôi *97% chắc*". Toàn bộ AI là nghệ thuật **đo lường sự bất định** — ngôn ngữ là **xác suất**.

**Xác suất có điều kiện** P(A|B) = "xác suất A, biết B đã xảy ra". P(ung thư|dương tính) — điều bác sĩ cần biết. Bayes cho phép *đảo* điều kiện.

**Phần 2 — Định lý Bayes (25 phút)**

**Bayes** cho *cập nhật niềm tin* khi có bằng chứng mới:

```
P(A|B) = P(B|A) · P(A) / P(B)
# P(A)    = niềm tin TRƯỚC (prior)
# P(B|A)  = sức mạnh bằng chứng (likelihood)
# P(A|B)  = niềm tin SAU (posterior)
```

Đọc bằng lời: *"Niềm tin mới = niềm tin cũ × sức mạnh bằng chứng, chuẩn hóa lại."*

**Ví dụ gây bất ngờ** (GV giảng chậm): tỷ lệ bệnh X = 1%. Test nhạy 99%, dương giả 5%. Câu hỏi: test dương → xác suất thật sự bệnh? Trực giác nói 99%. Đáp án Bayes: chỉ **≈ 16%**! Vì bệnh quá hiếm: trong 100 dương tính, ~5 người khỏe bị dương giả vs ~1 người bệnh thật.

```python
P_disease = 0.01; P_pos_given_dis = 0.99; P_pos_given_ok = 0.05
P_pos = P_disease*P_pos_given_dis + (1-P_disease)*P_pos_given_ok
P_dis_given_pos = P_pos_given_dis*P_disease / P_pos
print(round(P_dis_given_pos, 3))   # ≈ 0.167
```

> **📌 Bài học cho AI:** Đây là gốc của *hiện tượng tỷ lệ cơ sở*: sự kiện hiếm, dù detector "chính xác", phần lớn cảnh báo vẫn giả. Ứng dụng: phát hiện gian lận, xâm nhập, spam — sự kiện hiếm → cảnh báo sai nhiều. Vì sao Precision quan trọng (M3).

> **⚠️ Cạm bẫy tư duy:** Người mới hay tin "mô hình bảo 99% → chắc 99% đúng". Sai. Lớp hiếm → độ tin thấp hơn nhiều. Luôn hỏi: "Tỷ lệ cơ sở?"

**Phần 3 — Phân phối chuẩn & chuẩn hóa (15 phút)**

Nhiều hiện tượng (chiều cao, sai số, nhiễu) tuân **phân phối chuẩn (Gaussian)**: hình chuông quanh trung bình. Vì sao *chuẩn hóa* (StandardScaler: trung bình 0, độ lệch 1) phổ biến? Nhiều thuật toán (Naive Bayes, GMM, PCA) *giả định* chuẩn. Đặc trưng lớn (doanh thu triệu) trộn nhỏ (tuổi) → thuật toán khoảng cách bị áp đảo. Chuẩn hóa → mọi đặc trưng công bằng.

**Phần 4 — Liên hệ AI: phân loại = đo xác suất (10 phút)**

Thuật toán phân loại không "chốt" nhãn — nó ước lượng `P(nhãn|đặc trưng)`, chọn nhãn xác suất cao nhất. **Sigmoid** σ(z)=1/(1+e⁻ᶻ) kẹp đầu ra về [0,1]. Naive Bayes áp dụng trực tiếp Bayes. Hiểu Bayes → hiểu vì sao mô hình "tự tin"/"do dự".

> **🎯 Tổng kết:** 4 ý: AI đo bất định bằng xác suất; Bayes cập nhật niềm tin; tỷ lệ cơ sở quan trọng; phân loại = P(nhãn|đặc trưng). Nếu nhớ 1 điều: **đừng tin "99% chính xác" nếu không biết tỷ lệ cơ sở**.

#### Thực hành

**Bài thực hành 4 — Tính Bayes**

Hoàn thiện code tính P_dis_given_pos theo công thức Bayes.

```python
P_disease = 0.01
P_pos_given_dis = 0.99
P_pos_given_ok  = 0.05
# P_pos = tổng xác suất dương tính


# P(bệnh | dương)


print(round(P_dis_given_pos, 3))   # mong đợi 0.167
```

*Lời giải:*
```python
P_pos = P_disease*P_pos_given_dis + (1-P_disease)*P_pos_given_ok
P_dis_given_pos = P_pos_given_dis*P_disease / P_pos
print(round(P_dis_given_pos, 3))   # 0.167
```

> **Ghi chú (Buổi 5–8):** Theo cấu trúc chương trình, M1 còn Buổi 5 (Ôn giữa kì), Buổi 6 (Giải quyết bài toán tối ưu nâng cao), Buổi 7 (GK), Buổi 8 (CK + tổng kết). Trong file HTML các buổi này được render dạng skeleton "đang hoàn thiện" theo cùng độ sâu như B1–B4. Đề thi đầy đủ của cả môn nằm ở phần "Đề thi M1" bên dưới.

### Đề thi M1

**Hệ thống đề kiểm tra — Toán cho AI:** 5 đề: 15'×2, 45', giữa kì (90'), cuối kì (120'). Mỗi đề có đáp án + thang điểm.

---

#### ĐỀ KIỂM TRA 15 PHÚT #1 — Bài cũ · Buổi 2

- ⏱ **15 phút** · Điểm tối đa: **10** · Trọng số: **5%** · Tài liệu: **không**

**Câu 1 (2đ).** Cho A(3,2) và B(2,5). Tích A@B có shape gì?
**Câu 2 (2đ).** Cho M(4,3). Có nhân được M@M không? Vì sao?
**Câu 3 (2đ).** Đạo hàm f(x)=3x²+2x. Tính f'(2).
**Câu 4 (2đ).** Ảnh RGB 2×2 pixel có shape gì? Bao nhiêu số?
**Câu 5 (2đ).** Gradient f(x,y)=x²+y² tại (1,1) chỉ hướng nào?

<details>
<summary>✅ Đáp án & thang điểm</summary>

- **C1:** (3,5).
- **C2:** Không — cột 3≠dòng 4.
- **C3:** f'=6x+2; f'(2)=14.
- **C4:** (3,2,2); 12 số.
- **C5:** (2x,2y)=(2,2) chỉ hướng tăng nhanh nhất.

*Thang điểm:* 9–10: Xuất sắc · 7–8: Khá · 5–6: Đạt, ôn đạo hàm · <5: Học lại B1–B2.
</details>

---

#### ĐỀ KIỂM TRA 15 PHÚT #2 — Bài cũ · Buổi 5

- ⏱ **15 phút** · Điểm tối đa: **10** · Trọng số: **5%** · Không tài liệu

**Câu 1 (2.5đ).** Phát biểu định lý Bayes. P(A|B) nghĩa là gì?
**Câu 2 (3đ).** Test bệnh: P(bệnh)=0.02, nhạy 99%, dương giả 8%. Tính P(bệnh|dương).
**Câu 3 (2.5đ).** Vì sao đi ngược gradient thì hàm giảm? 1 câu.
**Câu 4 (2đ).** np.maximum(0,x) vs np.max(x): cái nào giữ shape?

<details>
<summary>✅ Đáp án</summary>

- **C1:** P(A|B)=P(B|A)·P(A)/P(B); = xs A biết B xảy ra.
- **C2:** P_pos=0.02·0.99+0.98·0.08=0.0982; P(bệnh|dương)=0.0198/0.0982≈**0.202**.
- **C3:** Gradient chỉ hướng tăng nhanh nhất → ngược là giảm nhanh nhất.
- **C4:** np.maximum.
</details>

---

#### ĐỀ KIỂM TRA 45 PHÚT — Sau buổi 6

- ⏱ **45 phút** · Điểm tối đa: **10** · Trọng số: **15%** · 💻 Có máy + NumPy

**Bài 1 (3đ — code).** Viết linear_layer(X,W,b) trả X@W+b. X(5,3),W(3,4),b(4,). In shape.
**Bài 2 (3đ — code).** Viết gradient_descent(f,df,x0,lr,n) cho hàm 1 biến. Chạy f=x², x0=10, lr=0.1, n=50.
**Bài 3 (2đ — lt).** A(2,3), B(3,2). A@B và B@A có cùng shape không? Vì sao?
**Bài 4 (2đ — lt).** Vì sao lr=2.0 làm GD phân kỳ trong bài x²?

<details>
<summary>✅ Đáp án</summary>

```python
def linear_layer(X,W,b): return X@W+b   # (5,4)
def gradient_descent(f,df,x0,lr,n):
    x=x0
    for _ in range(n): x = x - lr*df(x)
    return x
```

- **Bài 3:** Khác. A@B:(2,2), B@A:(3,3).
- **Bài 4:** lr=2 → bước 2·2x=4x vượt cực tiểu (0) sang bên kia xa hơn → dao động tăng dần → phân kỳ.
</details>

---

#### ĐỀ GIỮA KÌ MÔN — Buổi 7

- ⏱ **90 phút** · Điểm tối đa: **10** · Trọng số: **30%** · 💻 Có máy + NumPy

**PHẦN 1 — Lý thuyết (4đ).**
(a) Quy tắc nhân ma trận + ví dụ shape (1đ).
(b) Gradient chỉ hướng nào? Vì sao cập nhật ngược? (1đ).
(c) Phát biểu Bayes, giải thích số hạng (1đ).
(d) Vì sao vector hóa nhanh hơn for? (1đ).

**PHẦN 2 — Tính toán (3đ).**
(a) X(4,3),W(3,2),b(2,). Shape z=X@W+b và relu(z)? (1đ).
(b) f(x,y)=3x²+2xy+y², gradient tại (1,2)? (1đ).
(c) P(A)=0.1, P(B|A)=0.8, P(B|¬A)=0.2 → P(A|B)? (1đ).

**PHẦN 3 — Code (3đ).**
(a) Tạo X(100,3),W(3,1),b. Tính y=X@W+b (1đ).
(b) ReLU (0.5đ).
(c) GD khớp w cho y≈w·x đơn biến (1.5đ).

<details>
<summary>✅ Đáp án tóm tắt</summary>

- **P2a:** (4,2).
- **P2b:** ∇f=(6x+2y,2x+2y); tại (1,2)=(10,6).
- **P2c:** P(B)=0.1·0.8+0.9·0.2=0.26; P(A|B)=0.08/0.26≈**0.308**.

```python
X=np.random.rand(100,3); W=np.random.rand(3,1); b=0.5; y=X@W+b
def relu(z): return np.maximum(0,z)
# GD đơn biến: w = w - lr*2*mean((w*x-y)*x)
```

*Thang điểm GK:* 8.5–10: A, sẵn sàng M3 · 7–8.4: B · 5.5–6.9: C, ôn đạo hàm · <5.5: D/F, học lại.
</details>

---

#### ĐỀ CUỐI KÌ MÔN — Cuối HK1

- ⏱ **120 phút** · Điểm tối đa: **10** · Trọng số: **45%** · 💻 Có máy + NumPy

**Câu 1 (1.5đ).** A(3,4), B(4,2), C(2,3). Shape ((A@B)@C) và A@(B@C)? Bằng nhau không?
**Câu 2 (2đ).** f(x,y,z)=x²+2y²+3z²+xy. Gradient? Điểm cực tiểu?
**Câu 3 (2đ).** Code GD 3 biến cho câu 2, (3,3,3), lr=0.05, 100 bước. In kết quả.
**Câu 4 (1.5đ).** Bayes: tăng độ nhạy test vs giảm dương tính giả — cái nào hiệu quả hơn khi bệnh hiếm?
**Câu 5 (3đ — code).** Lớp mạng: X(200,4), W1(4,8), W2(8,1). y=relu(X@W1+b1)@W2+b2. In shape. Tính MSE.

<details>
<summary>✅ Đáp án tóm tắt</summary>

- **C1:** Cả hai (3,3), bằng nhau (nhân ma trận có tính kết hợp).
- **C2:** ∇f=(2x+y,4y+x,6z); cực tiểu (0,0,0).
- **C3:** GD 3 biến ≈ (0,0,0).
- **C4:** Giảm dương tính giả hiệu quả hơn — bệnh hiếm thì người khỏe bị dương giả áp đảo.

```python
X=np.random.rand(200,4); W1=np.random.rand(4,8)*0.1; W2=np.random.rand(8,1)*0.1
h=relu(X@W1); y=h@W2
mse=np.mean((y-np.random.rand(200,1))**2)
```
</details>

---

## M2 — Python & Dữ liệu

**Mã môn:** M2 · **Học kì:** HK1 · **Số tín chỉ:** 3 · **Số buổi:** 8 · **Tiên quyết:** — (song song M1) · **Đánh giá:** 15'×2 · 45' · GK · CK

**Mục tiêu môn:**
- Cài môi trường đúng (Conda)
- Nắm 4 cấu trúc dữ liệu Python
- Viết class theo interface ML
- Dùng NumPy & Pandas

**Đầu ra mong đợi:**
- Tự tạo env, chạy Jupyter
- Code OOP có cấu trúc
- Vector hóa thay for
- Làm sạch DataFrame

### Buổi 1: Môi trường (Conda/Jupyter/Git) & Python cơ bản

*Biến người mới thành người cài đặt môi trường đúng, viết Python có cấu trúc. Buổi nền cho toàn bộ chương trình.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Warm-up — Giới thiệu môn | Mục tiêu M2, cách chấm, lịch KT. Hỏi: "Em đã cài Python chưa?" |
| 15–35' | Bài cũ — Liên hệ M1 | Nhắc nhanh: Toán (M1) cần công cụ để tính → Python là công cụ đó. |
| 35–75' | Giảng — Môi trường ảo | Vì sao bắt buộc Conda. Tạo env, cài numpy/pandas/jupyter. Git init. |
| 75–85' | ☕ Giải lao | |
| 85–120' | Giảng — Python cơ bản | Biến, kiểu, hàm, list/dict/tuple/set, list comprehension. |
| 120–160' | Thực hành — Jupyter + Python | Mở Jupyter, viết cell đầu, list comprehension trích đặc trưng. |
| 160–175' | Dặn dò — BTCN + thông báo KT | B2: KT15' về OOP. Cài env xong trước buổi sau. |

#### Nội dung giảng chi tiết

**Phần 1 — Môi trường ảo: vì sao bắt buộc (25 phút)**

Câu hỏi: "Em cài Python rồi, sao phải thêm Conda?" Trả lời nằm ở một sự thật đau: mỗi dự án AI cần tổ hợp thư viện & phiên bản khác nhau. Hôm nay cần `torch 2.0`, tháng sau cần `torch 2.3`. Cài chung hệ thống → sau 2 tuần gặp lỗi *"incompatible dependency"* không hiểu từ đâu. **Môi trường ảo** cô lập từng dự án thành "bong bóng" riêng.

```bash
# Tạo môi trường riêng tên "ai" với Python 3.11
conda create -n ai python=3.11 -y
conda activate ai

# Cài bộ công cụ cho cả M2
pip install numpy pandas matplotlib jupyter scikit-learn

# Khởi chạy Jupyter Lab
jupyter lab

# Git — không bao giờ code AI mà không có Git
git init && git add . && git commit -m "init"
```

> **📌 Vì sao Python 3.11?** Điểm cân bằng: nhanh hơn 3.9 ~25% (tối ưu interpreter) và vẫn tương thích wheel của thư viện AI. 3.13 mới hơn đôi khi chưa có wheel cho torch/transformers — tránh nếu chưa rành build từ source.

> **🚫 Lỗi #1 người mới: cài vào base:** Đừng `pip install` thẳng vào base của conda. Khi base hỏng, toàn bộ conda bị ảnh hưởng. Luôn `conda create -n <tên>` rồi activate trước khi cài.

**Phần 2 — Python cơ bản: biến, kiểu, hàm (20 phút)**

Python là ngôn ngữ **động kiểu**: không cần khai báo kiểu, gán thẳng. Kiểm tra kiểu bằng `type()`. Điều này linh hoạt nhưng dễ bug nếu không cẩn thận — AI code nhiều, nên thói quen rõ ràng quan trọng.

| Kiểu | Ví dụ | Dùng cho |
|---|---|---|
| int / float | 42, 3.14 | Số |
| str | "hello" | Chuỗi |
| bool | True/False | Điều kiện |
| list | [1,2,3] | Tập động |
| dict | {"a":1} | Ánh xạ |

```python
def chao(ten):
    return f"Xin chao {ten}, ban hoc AI!"

print(chao("An"))   # Xin chao An, ban hoc AI!
```

**Phần 3 — 4 cấu trúc dữ liệu cốt lõi (25 phút)**

Bốn cấu trúc gặp mỗi ngày. Hiểu đặc tính giúp chọn đúng & tránh bug:

| Cấu trúc | Đặc tính | Dùng khi |
|---|---|---|
| `list` | Động, đa kiểu, có thứ tự | Tập mẫu, danh sách |
| `dict` | key→value, tra O(1) | One mẫu nhiều trường |
| `tuple` | Bất biến | Khóa dict, trả nhiều giá trị |
| `set` | Loại trùng | Từ vựng duy nhất |

**List comprehension** — cú pháp tạo list từ list khác trong 1 dòng. Kỹ năng then chốt trong AI:

```python
samples = [{"age":25,"label":"low"}, {"age":47,"label":"high"}]
# Trích đặc trưng — đừng dùng for thủ công
ages = [s["age"] for s in samples]      # [25, 47]
labels = {s["label"] for s in samples}    # {'low','high'}
```

> **🎯 Tổng kết:** Môi trường ảo = bắt buộc; 4 cấu trúc (list/dict/tuple/set); list comprehension = kỹ năng hàng ngày. Cuối buổi: KT15' B2 về OOP.

#### Bài về nhà (BTCN)

1. Cài xong môi trường `ai`, chạy được `jupyter lab` (chụp màn hình).
2. Viết list comprehension đếm số mẫu có age > 30.
3. Đọc trước: OOP & class (chuẩn bị B2).

### Buổi 2: OOP & Cấu trúc dữ liệu nâng cao

*Hiểu class/__init__/self/@property — để đọc source sklearn/PyTorch & viết pipeline có cấu trúc.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — 📝 KT 15 PHÚT #1 | Phát đề (trang Đề thi môn). Thu chấm, trả cuối buổi. |
| 15–35' | Warm-up — Vì sao cần OOP | Sklearn/PyTorch toàn OOP. Không hiểu → không đọc source. |
| 35–75' | Giảng — Class & 4 ý cốt lõi | __init__, self, method, @property. |
| 75–85' | ☕ Giải lao | |
| 85–120' | Giảng — Interface fit/transform | Quy ước sklearn. Đặt nền cho Pipeline (M3). |
| 120–160' | Thực hành — Class DataPreprocessor | Viết class có __init__ + clean(). |
| 160–175' | Dặn dò — Trả bài + tổng kết | Trả KT15'. Chuẩn bị B3: NumPy. |

#### Nội dung giảng chi tiết

**Phần 1 — Vì sao AI toàn OOP (15 phút)**

Scikit-learn, PyTorch, transformers — toàn bộ hệ sinh thái AI thiết kế theo **OOP**. Khi bạn gọi `LinearRegression().fit(X,y)`, thực ra bạn đang tạo object & gọi method. Không hiểu `__init__`, `self`, `@property` → bạn không đọc được source thư viện, không viết được pipeline có cấu trúc. Tin vui: chỉ cần 4 ý là đủ đi xuyên chương trình.

**Phần 2 — 4 ý cốt lõi của OOP (35 phút)**

- **`__init__`** — hàm dựng, chạy 1 lần khi tạo object, lưu trạng thái nội tại.
- **`self`** — tham chiếu "chính object này"; biến gán cho `self.x` tồn tại suốt đời object.
- **Phương thức** — hàm trong class, thao tác trên `self`.
- **`@property`** — biến method thành thuộc tính, truy cập không cần ngoặc.

```python
class DataLoader:
    def __init__(self, path, target_col):
        self.path = path              # trạng thái nội tại
        self.target_col = target_col
    def load(self):
        return f"load {self.path}, target={self.target_col}"

dl = DataLoader("data.csv", "label")
print(dl.load())   # gọi method
```

> **📌 self là gì, thật ra:** Khi gọi `dl.load()`, Python tự truyền `dl` vào tham số `self`. Nên `self.path` bên trong = `dl.path`. self là "chính object này".

**Phần 3 — Quy ước fit/transform: đặt nền sklearn (25 phút)**

Khi viết class xử lý dữ liệu, hãy đặt tên hàm theo **interface sklearn**: `fit()` (học tham số từ data) & `transform()` (áp dụng). Luyện sớm → M3 bạn nhúng class vào `Pipeline` sklearn mà không sửa code.

> **🎯 Tổng kết:** OOP chỉ cần 4 ý: __init__, self, method, @property. Interface fit/transform giúp hòa vào sklearn. Cuối buổi: làm class DataPreprocessor.

#### Thực hành

**Bài thực hành — Class DataPreprocessor**

Viết class `DataPreprocessor` có `__init__(self, fill_value)` & `clean(self, rows)` thay None bằng self.fill_value (list comprehension). Test → `[1, 0, 3, 0]`.

```python
class DataPreprocessor:
    def __init__(self, fill_value):



    def clean(self, rows):



pp = DataPreprocessor(fill_value=0)
print(pp.clean([1, None, 3, None]))   # mong đợi [1, 0, 3, 0]
```

*Lời giải:*
```python
class DataPreprocessor:
    def __init__(self, fill_value):
        self.fill_value = fill_value
    def clean(self, rows):
        return [self.fill_value if r is None else r for r in rows]
```

### Buổi 3: NumPy theo góc dữ liệu

*Indexing, boolean mask, reshape, axis — góc nhìn dữ liệu (bổ sung cho góc Toán ở M1-B3).*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra OOP | 2 học viên trình bày class DataPreprocessor. |
| 15–35' | Warm-up — Recap M1-B3 | NumPy từ góc Toán (vector hóa). Hôm nay: góc dữ liệu. |
| 35–75' | Giảng — Indexing & mask | Cắt mảng, boolean mask (lọc theo điều kiện). |
| 75–85' | ☕ Giải lao | |
| 85–120' | Giảng — Reshape & axis | Đổi shape, tổng theo trục (axis=0/1). |
| 120–160' | Thực hành — Lọc & reshape | List comprehension + boolean mask + reshape. |
| 160–175' | Dặn dò — Tổng kết | Chuẩn bị B4: Pandas. |

#### Nội dung giảng chi tiết

**Phần 1 — Boolean mask: lọc dữ liệu siêu nhanh (25 phút)**

Trong AI bạn liên tục cần lọc: "lấy các mẫu có giá > 100", "loại outlier". NumPy có **boolean mask** — tạo mảng True/False rồi dùng để index. Nhanh & gọn hơn for rất nhiều.

```python
import numpy as np
arr = np.array([50, 120, 30, 200, 80])
mask = arr > 100            # [False, True, False, True, False]
print(arr[mask])           # [120 200] — lọc nhanh!
```

**Phần 2 — Reshape & axis (25 phút)**

**Reshape** đổi shape mà không đổi dữ liệu: `arr.reshape(2,3)`. Quan trọng khi feed dữ liệu vào mô hình (phải đúng shape). **Axis**: `axis=0` = theo cột (xuống), `axis=1` = theo hàng (ngang).

```python
M = np.array([[1,2,3],[4,5,6]])   # shape (2,3)
print(M.sum(axis=0))             # [5 7 9] — tổng mỗi cột
print(M.sum(axis=1))             # [6 15] — tổng mỗi hàng
print(M.reshape(3,2))            # đổi shape
```

> **⚠️ Nhầm axis:** Người mới hay nhầm: `axis=0` là *xuống theo cột* (gộp các hàng), `axis=1` là *ngang theo hàng* (gộp các cột). Nhầm → kết quả sai mà không báo lỗi.

> **🎯 Tổng kết:** Boolean mask lọc nhanh; reshape đổi shape; axis quyết định tổng theo hướng nào. Đây là vũ cụ dữ liệu cho M3 (ML).

#### Thực hành

**Bài thực hành 1 — List comprehension**

Cho samples (list of dict). Viết `ages` (list) & `unique_labels` (set) bằng comprehension.

```python
samples = [
    {"age": 25, "label": "low"},
    {"age": 47, "label": "high"},
    {"age": 33, "label": "low"},
]
ages =
unique_labels =
print(ages, unique_labels)
```

*Lời giải:*
```python
ages = [s["age"] for s in samples]
unique_labels = {s["label"] for s in samples}
```

**Bài thực hành 2 — Boolean mask**

Cho `arr`. Tạo `mask = arr > 100`, lọc ra `arr[mask]`.

```python
import numpy as np
arr = np.array([50, 120, 30, 200, 80])
mask =
print(arr[mask])   # mong đợi [120 200]
```

*Lời giải:*
```python
mask = arr > 100
print(arr[mask])   # [120 200]
```

### Buổi 4: Pandas — Đọc & lọc dữ liệu

*DataFrame, read_csv, head/describe, lọc, groupby — bộ não xử lý bảng.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra NumPy | Sửa nhanh bài mask BTCN. |
| 15–35' | Warm-up — Từ NumPy → Pandas | NumPy cho số thuần; Pandas cho bảng có tên cột. |
| 35–75' | Giảng — DataFrame & read_csv | Đọc CSV 1 dòng. head, describe, dtypes, shape. |
| 75–85' | ☕ Giải lao | |
| 85–120' | Giảng — Lọc & groupby | Lọc theo điều kiện, groupby + aggregate. |
| 120–160' | Thực hành — Phân tích dataset | Đọc dataset thật, lọc, groupby. |
| 160–175' | Dặn dò — Tổng kết + thông báo KT | B5: KT15' về làm sạch. Tải dataset Kaggle. |

#### Nội dung giảng chi tiết

**Phần 1 — DataFrame: bảng trong code (25 phút)**

Pandas là thư viện dùng mỗi ngày. Đối tượng chính là **DataFrame** — giống bảng Excel nhưng trong code, có tên cột & tên hàng. Đọc file CSV chỉ 1 dòng.

```python
import pandas as pd
df = pd.read_csv("sales.csv")
print(df.shape)        # (dòng, cột)
print(df.head())      # 5 dòng đầu
print(df.describe())   # thống kê: mean/std/min/max
print(df.dtypes)      # kiểu mỗi cột
```

**Phần 2 — Lọc & groupby (30 phút)**

**Lọc**: giống boolean mask nhưng đọc tự nhiên hơn. **Groupby**: gom theo giá trị của một cột rồi tính aggregate (mean, sum, count) — cực mạnh cho phân tích.

```python
# Lọc: khách hàng thu nhập cao
rich = df[df["income"] > 5000]

# Groupby: doanh thu trung bình theo thành phố
print(df.groupby("city")["revenue"].mean())
```

> **🎯 Tổng kết:** Pandas: read_csv, head/describe, lọc [df[...]], groupby+mean. Đây là công cụ EDA cho Mini-project B8.

#### Thực hành

**Bài thực hành 1 — Đọc CSV**

Đọc `"sales.csv"` vào `df`, in `df.head()` và `df.shape`.

```python
import pandas as pd
df = pd.
```

*Lời giải:*
```python
df = pd.read_csv("sales.csv")
print(df.head())
print(df.shape)
```

**Bài thực hành 2 — Groupby**

Tính doanh thu (`revenue`) trung bình theo `city` bằng groupby + mean.

```python
print(df.groupby(
```

*Lời giải:*
```python
print(df.groupby("city")["revenue"].mean())
```

### Buổi 5: Làm sạch dữ liệu (NaN, Outliers, Encoding)

*Dữ liệu bẩn vào → mô hình rác. Học 3 thao tác thiết yếu + lỗi chết người data leakage.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — 📝 KT 15 PHÚT #2 | Phát đề. Thu chấm, trả cuối buổi. |
| 15–35' | Warm-up — GIGO | Garbage In Garbage Out — dữ liệu bẩn → mô hình rác. |
| 35–80' | Giảng — 3 thao tác làm sạch | NaN (fillna), outlier (IQR), encoding (get_dummies). |
| 80–90' | ☕ Giải lao | |
| 90–120' | Giảng — Data leakage | Lỗi chết người: fillna trước chia train/test. Pipeline giải quyết. |
| 120–160' | Thực hành — Làm sạch DataFrame | fillna + one-hot encoding. |
| 160–175' | Dặn dò — Trả bài + tổng kết | Chuẩn bị B6: ôn GK. |

#### Nội dung giảng chi tiết

**Phần 1 — NaN: giá trị thiếu (20 phút)**

NaN ("Not a Number") làm mô hình crash hoặc sai. Cách xử lý: điền giá trị thay thế (mean/median/0) hoặc bỏ dòng. Quy tắc: **median** cho cột có outlier (không bị kéo), **mean** khi phân phối chuẩn.

```python
df["income"] = df["income"].fillna(df["income"].median())
print(df["income"].isna().sum())   # 0
```

**Phần 2 — Outlier: quy tắc IQR (20 phút)**

Outlier làm mô hình lệch. Quy tắc **IQR**: Q1, Q3, IQR=Q3−Q1; điểm ngoài `[Q1−1.5·IQR, Q3+1.5·IQR]` là outlier.

```python
Q1, Q3 = df["income"].quantile([0.25, 0.75])
IQR = Q3 - Q1
mask = (df["income"] >= Q1-1.5*IQR) & (df["income"] <= Q3+1.5*IQR)
df = df[mask]
```

**Phần 3 — Encoding: chữ → số (20 phút)**

Mô hình chỉ hiểu số. Cột chữ (city: HN/ĐN/SG) phải mã hóa. Cách phổ biến: **one-hot** — tạo cột 0/1 cho mỗi giá trị.

```python
# drop_first tránh đa cộng tuyến
df = pd.get_dummies(df, columns=["city"], drop_first=True)
```

**Phần 4 — Lỗi chết người: data leakage (25 phút)**

> **🚫 fillna TRƯỚC khi chia train/test = lỗi chết người:** Nếu tính median trên toàn dataset rồi mới chia, thông tin test "rỉ" vào train → điểm ảo. Đúng: tính trên train, áp dụng cho cả hai. Pipeline (M3) giải quyết tự động.

> **🎯 Tổng kết:** 3 thao tác: fillna (median), IQR outlier, get_dummies. Quy tắc vàng: **fit trên train, transform trên test**.

#### Thực hành

**Bài thực hành 1 — Điền NaN**

Điền NaN cột `price` bằng median, đếm NaN còn lại (phải = 0).

```python
import pandas as pd
df = pd.DataFrame({"price": [100, 150, None, 200, None, 175]})
# điền NaN bằng median

print(df["price"].isna().sum())
```

*Lời giải:*
```python
df["price"] = df["price"].fillna(df["price"].median())
print(df["price"].isna().sum())   # 0
```

**Bài thực hành 2 — One-hot encoding**

Mã hóa cột `city` bằng `pd.get_dummies` (drop_first=True).

```python
df = pd.get_dummies(


print(df.columns.tolist())
```

*Lời giải:*
```python
df = pd.get_dummies(df, columns=["city"], drop_first=True)
print(df.columns.tolist())
```

### Buổi 6: Ôn tập giữa kì môn

*Ôn toàn bộ B1–B5: môi trường, Python, OOP, NumPy, Pandas, làm sạch. Làm mẫu đề GK.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra làm sạch | Hỏi 2 câu về data leakage. |
| 15–40' | Ôn — B1–B3: môi trường + Python | Conda, list/dict, comprehension, class. |
| 40–55' | ☕ Giải lao | |
| 55–90' | Ôn — B4–B5: Pandas + làm sạch | read_csv, groupby, fillna, IQR, encoding. |
| 90–130' | Thực hành — Làm mẫu đề GK | Cả lớp làm đề GK mẫu cùng giáo viên. |
| 130–175' | Dặn dò — Giải đáp + ôn tiếp | Chuẩn bị B7: thi GK. |

> **📌 Trọng tâm ôn:** 5 chủ đề: (1) môi trường ảo; (2) 4 cấu trúc dữ liệu + comprehension; (3) OOP (__init__/self/method); (4) NumPy (mask/reshape/axis); (5) Pandas (read_csv/groupby/fillna/encoding) + data leakage.

### Buổi 7: Kiểm tra Giữa kì môn

*Thi GK 90 phút theo đề (xem trang Đề thi môn). Trọng số 30%.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–10' | Phát đề | Phát đề GK, dặn quy tắc. |
| 10–100' | 📝 Làm bài 90' | Lý thuyết + code Pandas/NumPy. |
| 100–130' | Thu bài | Thu, dọn dẹp. |
| 130–175' | Sau thi — Nhận xét chung | Nhận xét nhanh các lỗi phổ biến. |

> **Quy tắc thi:** Mang laptop có môi trường `ai`. Không Internet (trừ tài liệu đã cho). Có máy tính + Jupyter.

### Buổi 8: Mini-project EDA + DataCleaner

*Tổng hợp M2: EDA đầy đủ + class DataCleaner có fit/transform. Chuẩn bị ôn CK môn.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Trả bài GK | Trả GK, nhận xét từng người. |
| 15–40' | Hướng dẫn — Mini-project | Yêu cầu EDA + DataCleaner class. |
| 40–55' | ☕ Giải lao | |
| 55–150' | Thực hành — Làm project | Học viên làm, giáo viên đi vòng hỗ trợ. |
| 150–175' | Dặn dò — Nộp project + ôn CK | Nộp GitHub. Thông báo lịch CK môn. |

#### 🏆 MINI-PROJECT M2 — EDA & DataCleaner (Cá nhân)

Tổng hợp kỹ năng B1–B5 thành một pipeline xử lý dữ liệu.

- Tải dataset Kaggle (House Prices / Telco Churn).
- EDA: ≥ 5 biểu đồ + nhận xét (matplotlib/seaborn).
- Class `DataCleaner` có `fit()` + `transform()`: xử lý NaN + outlier + encoding.
- Notebook + `.py` + README; đẩy GitHub.

*Tiêu chí nghiệm thu:* · EDA ≥ 5 biểu đồ có nhận xét · DataCleaner xử lý NaN + outlier + encoding · Fit trên train, transform test đúng quy tắc · Có README · Code trên GitHub.

### Đề thi M2

**Hệ thống đề kiểm tra — Python & Dữ liệu:** 5 đề: 15'×2, 45', giữa kì (90'), cuối kì (120'). Có đáp án + thang điểm.

---

#### ĐỀ KT 15 PHÚT #1 — B2 · OOP

- ⏱ **15'** · Điểm tối đa: **10** · Trọng số: **5%**

**C1 (2đ).** Vì sao bắt buộc môi trường ảo trong dự án AI?
**C2 (2đ).** `self` trong class Python có vai trò gì?
**C3 (3đ).** Viết class `Counter` có `__init__(self)` tạo `self.count=0` và `add(self,n)` tăng count.
**C4 (3đ).** Cho samples. Viết list comprehension lấy các age.

<details>
<summary>✅ Đáp án</summary>

- **C1:** Cô lập dependency, tránh xung đột phiên bản.
- **C2:** Tham chiếu chính object, self.x tồn tại suốt đời object.
- **C3:** `def __init__(self): self.count=0` & `def add(self,n): self.count+=n`.
- **C4:** `[s["age"] for s in samples]`.
</details>

---

#### ĐỀ KT 15 PHÚT #2 — B5 · Làm sạch

- ⏱ **15'** · Điểm tối đa: **10** · Trọng số: **5%**

**C1 (3đ).** Vì sao dùng median thay mean khi cột có outlier?
**C2 (3đ).** Quy tắc IQR phát hiện outlier dùng ngưỡng gì?
**C3 (4đ).** Vì sao không nên fillna trên toàn dataset trước chia train/test?

<details>
<summary>✅ Đáp án</summary>

- **C1:** Median không bị kéo bởi outlier.
- **C2:** [Q1−1.5·IQR, Q3+1.5·IQR].
- **C3:** Data leakage — thông tin test rỉ vào train → điểm ảo.
</details>

---

#### ĐỀ KT 45 PHÚT — Sau B6

- ⏱ **45'** · Điểm tối đa: **10** · Trọng số: **15%** · 💻 Có máy + Pandas

**B1 (3đ).** Đọc CSV, in shape, dtypes, describe. Lọc dòng có income > 5000.
**B2 (3đ).** Groupby theo city, tính mean revenue.
**B3 (2đ).** Điền NaN cột "age" bằng median.
**B4 (2đ).** One-hot encode cột "city" (drop_first).

<details>
<summary>✅ Đáp án</summary>

```python
df = pd.read_csv("x.csv"); print(df.shape, df.dtypes, df.describe())
rich = df[df["income"]>5000]
print(df.groupby("city")["revenue"].mean())
df["age"]=df["age"].fillna(df["age"].median())
df=pd.get_dummies(df,columns=["city"],drop_first=True)
```
</details>

---

#### ĐỀ GIỮA KÌ MÔN — B7 · 90'

- ⏱ **90'** · Điểm tối đa: **10** · Trọng số: **30%** · 💻 Có máy + Jupyter

**PHẦN 1 — Lý thuyết (3đ).** (a) Vì sao môi trường ảo bắt buộc (1đ). (b) self & __init__ làm gì (1đ). (c) Data leakage là gì, cách tránh (1đ).
**PHẦN 2 — Pandas/NumPy (4đ).** (a) Đọc CSV, lọc income>5000, groupby city mean (1.5đ). (b) NumPy: tạo arr 1D, boolean mask >100, in kết quả (1đ). (c) reshape (2,3)→(3,2), sum axis=0 và axis=1 (1.5đ).
**PHẦN 3 — Code (3đ).** Viết class `DataCleaner`: fit(X) tính median mỗi cột số; transform(X) điền NaN bằng median đã tính. Test với df có NaN.

<details>
<summary>✅ Đáp án tóm tắt</summary>

```python
class DataCleaner:
    def fit(self, X):
        self.medians_ = X.select_dtypes('number').median()
        return self
    def transform(self, X):
        return X.fillna(self.medians_)
```

*Thang điểm GK:* 8.5–10: A · 7–8.4: B · 5.5–6.9: C · <5.5: D/F học lại.
</details>

---

#### ĐỀ CUỐI KÌ MÔN — 120'

- ⏱ **120'** · Điểm tối đa: **10** · Trọng số: **45%** · 💻 Có máy + Jupyter

**C1 (2đ).** Phân biệt list/dict/tuple/set. Cho ví dụ mỗi loại trong AI.
**C2 (2đ).** Vẽ output của `np.array([[1,2,3],[4,5,6]]).sum(axis=0)` và axis=1.
**C3 (3đ — code).** Class `Pipeline` đơn giản: nhận list transformer (mỗi cái có fit/transform), fit tuần tự, transform tuần tự.
**C4 (3đ — code).** Đọc dataset, EDA: đếm NaN mỗi cột, vẽ histogram 1 cột, groupby + mean, encoding. Viết report ngắn.

<details>
<summary>✅ Đáp án tóm tắt</summary>

- **C2:** axis=0 → [5,7,9]; axis=1 → [6,15].
- **C3:** class với fit lặp transformers, transform lặp tương tự.
</details>

---

## M3 — Machine Learning

**Mã môn:** M3 · **Học kì:** HK1 · **Số tín chỉ:** 4 · **Số buổi:** 10 · **Tiên quyết:** M1, M2 · **Đánh giá:** 15'×2 · 45' · GK · CK + Mid-term

**Mục tiêu môn:**
- Hiểu bài toán hồi quy & phân loại
- Nắm Linear/Logistic, sigmoid
- Tree, RF, XGBoost
- K-Means, PCA; metrics; CV

**Đầu ra mong đợi:**
- Train mô hình ML bảng
- Chọn đúng thuật toán
- Đánh giá trung thực
- Mid-term HK1

### Buổi 1: ML & scikit-learn là gì

*Bức tranh tổng thể, 3 loại bài toán, API fit/predict đồng nhất. Nền cho toàn M3.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Warm-up — Giới thiệu M3 | Mục tiêu, cách chấm, lịch KT. Liên hệ M1 Toán + M2 Python. |
| 15–40' | Giảng — ML là gì | Học từ dữ liệu thay lập trình tay. 3 loại bài toán. |
| 40–55' | ☕ Giải lao | |
| 55–95' | Giảng — scikit-learn API | fit/predict/transform đồng nhất. train_test_split. |
| 95–155' | Thực hành — End-to-end đầu tiên | Đọc dữ liệu, chia train/test, fit mô hình đầu tiên. |
| 155–175' | Dặn dò — BTCN + thông báo KT | B2: KT15' về Linear/Logistic. |

#### Nội dung giảng

**Phần 1 — ML là gì (25 phút)**

Lập trình truyền thống: bạn viết *quy tắc* để máy xử lý dữ liệu. Machine Learning **đảo ngược**: bạn cho máy *dữ liệu + đáp án*, máy *tự tìm quy tắc*. Ví dụ: khó viết quy tắc "đây là email spam" — nhưng cho máy 10000 email đã dán nhãn, nó tự học được pattern.

**3 loại bài toán:**

| Loại | Mục tiêu | Ví dụ |
|---|---|---|
| Học có giám sát (supervised) | Dự đoán nhãn đã biết | Giá nhà, churn, phân loại ảnh |
| Học không giám sát (unsupervised) | Tìm cấu trúc ẩn (không nhãn) | Gom cụm khách hàng, PCA |
| Học tăng cường (reinforcement) | Học qua thử-sai-phần thưởng | Game AI, robot |

M3 tập trung 2 loại đầu (có/không giám sát). Reinforcement ngoài phạm vi.

**Phần 2 — scikit-learn: API đẹp nhất (25 phút)**

scikit-learn có một **API đồng nhất** tuyệt đẹp: mọi mô hình đều dùng `fit()` để học, `predict()` để dự đoán. Học 1 lần, dùng cho hàng trăm thuật toán.

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(Xtr, ytr)              # học
pred = model.predict(Xte)        # dự đoán
print(model.score(Xte, yte))   # đánh giá
```

> **📌 train_test_split — vì sao:** Đánh giá mô hình trên chính dữ liệu đã train = "tự chấm tự": vô nghĩa. Phải chia: train để học, test (chưa thấy) để đánh giá khả năng tổng quát. `random_state=42` để kết quả lặp lại được.

> **🎯 Tổng kết:** ML = học từ dữ liệu thay quy tắc tay. 3 loại bài toán. sklearn API: fit/predict đồng nhất. train_test_split bắt buộc.

#### Thực hành

> **Làm chung:** đọc dataset mẫu, chia train/test, fit LinearRegression đầu tiên, in score. Giáo viên code cùng, giải thích từng dòng.

### Buổi 2: Linear & Logistic Regression

*2 thuật toán nền: hồi quy tuyến tính & phân loại với sigmoid.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — 📝 KT 15 PHÚT #1 | Linear/Logistic cơ bản. |
| 15–40' | Giảng — Linear Regression | y=w·x+b. Máy khớp bằng bình phương tối thiểu. R². |
| 40–55' | ☕ Giải lao | |
| 55–95' | Giảng — Logistic + Sigmoid | σ(z)=1/(1+e⁻ᶻ). Kẹp về [0,1] → xác suất. |
| 95–155' | Thực hành — Train cả 2 mô hình | Linear dự đoán giá, Logistic phân loại. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B3: đánh giá model. |

#### Nội dung giảng

**Phần 1 — Linear Regression (25 phút)**

Mô hình đơn giản nhất: tìm đường thẳng `ŷ = w·x + b` sao cho tổng bình phương sai số nhỏ nhất. Đây chính là bài gradient descent ở M1-B2, nhưng sklearn giải trực tiếp. **R²** đo phần phương sai giải thích được: 1.0 hoàn hảo, 0 = bằng đoán trung bình.

**Phần 2 — Logistic Regression & Sigmoid (30 phút)**

Để phân loại, ta "kẹp" đầu ra về [0,1] bằng **sigmoid** `σ(z)=1/(1+e⁻ᶻ)` → diễn dịch thành xác suất. ≥0.5 → nhãn 1. **"Logistic Regression" thực ra là phân loại**, không phải hồi quy (tên dễ nhầm).

> **⚠️ Tên gây nhầm:** Logistic Regression là thuật toán *phân loại*. "Regression" vì nó dùng hồi quy tuyến tính rồi qua sigmoid.

#### Thực hành

**Bài thực hành 1 — Linear Regression**

Khởi tạo `LinearRegression()`, fit Xtr/ytr, predict Xte.

```python
from sklearn.linear_model import LinearRegression
model =
pred =
```

*Lời giải:*
```python
model = LinearRegression().fit(Xtr, ytr)
pred = model.predict(Xte)
```

**Bài thực hành 2 — Logistic Regression**

Khởi tạo `LogisticRegression(max_iter=1000)`, fit, predict_proba.

```python
from sklearn.linear_model import LogisticRegression
clf =
```

*Lời giải:*
```python
clf = LogisticRegression(max_iter=1000).fit(Xtr, ytr)
print(clf.predict_proba(Xte)[:2])
```

### Buổi 3: Đánh giá mô hình (Accuracy/Precision/Recall/F1)

*Mô hình "chạy tốt" trên train chưa nói gì. Học đo khả năng tổng quát trung thực.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra bài KT | Trả KT15', nhận xét. |
| 15–45' | Giảng — Ma trận đánh giá | Accuracy/Precision/Recall/F1. Khi nào dùng cái nào. |
| 45–55' | ☕ Giải lao | |
| 55–90' | Giảng — Confusion matrix | Lớp mất cân bằng → accuracy lừa. Ví dụ fraud. |
| 90–155' | Thực hành — classification_report | In metrics, phân tích confusion matrix. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B4: Decision Tree. |

#### Nội dung giảng

**Phần 1 — Bốn chỉ số cốt lõi (30 phút)**

| Chỉ số | Ý nghĩa | Quan trọng khi |
|---|---|---|
| **Accuracy** | Tỷ lệ đúng | Lớp cân bằng |
| **Precision** | Trong các dương đoán, đúng bao nhiêu | Dương tính giả tốn kém (spam) |
| **Recall** | Trong các dương thật, phát hiện bao nhiêu | Bỏ sót nguy hiểm (ung thư, fraud) |
| **F1** | Trung bình điều hòa P&R | Lớp mất cân bằng |

> **📌 Base rate lại xuất hiện:** Liên hệ M1-B4 (Bayes): khi lớp hiếm (fraud 1%), accuracy 99% có thể vô nghĩa — mô hình đoán toàn "không fraud" cũng 99% đúng! Cần Recall/F1.

**Phần 2 — Confusion matrix (20 phút)**

Bảng 2×2: TP/FP/FN/TN. Trực quan xem mô hình sai kiểu nào — đoán dương sai (FP) hay bỏ sót (FN).

```python
from sklearn.metrics import classification_report, confusion_matrix
print(classification_report(yte, pred, digits=3))
print(confusion_matrix(yte, pred))
```

> **🎯 Tổng kết:** Accuracy lừa khi lớp mất cân bằng. Fraud → Recall. Spam → Precision. Cân bằng → F1.

### Buổi 4: Decision Tree & Random Forest

*Cây quyết định & bagging — "vua" dữ liệu bảng.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra metrics | Hỏi: fraud dùng chỉ số nào? |
| 15–45' | Giảng — Decision Tree | Chia theo ngưỡng (Gini/Entropy). Dễ overfit. |
| 45–55' | ☕ Giải lao | |
| 55–90' | Giảng — Random Forest | Nhiều cây + bagging → giảm phương sai. |
| 90–155' | Thực hành — Train RF | So sánh với Logistic. |
| 155–175' | Dặn dò — BTCN + thông báo KT | B5: KT15' về XGBoost. |

#### Nội dung giảng

**Phần 1 — Decision Tree (25 phút)**

Cây chia dữ liệu theo ngưỡng từng đặc trưng (vd `income>5000?`) sao cho nhánh con đồng nhất nhất. Tiêu chí chia: **Gini** hoặc **Entropy**. Dễ hiểu, nhưng dễ *overfit* nếu cây quá sâu (học thuộc nhiễu).

**Phần 2 — Random Forest: bagging (25 phút)**

Trồng *nhiều cây* trên mẫu ngẫu nhiên + lấy biểu quyết → giảm phương sai (variance). Kỹ thuật **bagging**. RF mạnh, ít cần tune, là baseline lý tưởng.

```python
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=200, random_state=42).fit(Xtr, ytr)
print(rf.score(Xte, yte))
```

#### Thực hành

**Bài thực hành — Random Forest**

`RandomForestClassifier(n_estimators=200, random_state=42)`, fit, score trên Xte/yte.

```python
from sklearn.ensemble import RandomForestClassifier
rf =
print(rf.score(Xte, yte))
```

*Lời giải:*
```python
rf = RandomForestClassifier(n_estimators=200, random_state=42).fit(Xtr, ytr)
print(rf.score(Xte, yte))
```

### Buổi 5: XGBoost / LightGBM

*Gradient Boosting — "bá chủ" Kaggle dữ liệu bảng.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — 📝 KT 15 PHÚT #2 | XGBoost/boosting. |
| 15–50' | Giảng — Gradient Boosting | Cây tuần tự sửa lỗi cây trước. RF vs GB. |
| 50–60' | ☕ Giải lao | |
| 60–155' | Thực hành — Train XGBoost | So sánh RF vs XGBoost trên cùng dataset. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B6: K-Means/PCA. |

#### Nội dung giảng

**Gradient Boosting — khác RF cốt lõi (25 phút)**

Khác RF (cây song song độc lập, bagging), **Boosting** trồng cây *tuần tự*, mỗi cây sửa lỗi của chuỗi trước (boosting). Kết quả: thường chính xác hơn RF trên dữ liệu bảng. **XGBoost/LightGBM** là hiện thực hóa nhanh & mạnh nhất — "vua" Kaggle.

> **📌 Khi nào dùng gì:** Bắt đầu = Random Forest (dễ, ít tune). Cần vắt thêm độ chính xác → XGBoost/LightGBM. Dữ liệu lớn (>1M dòng) → LightGBM nhanh hơn. Luôn là baseline trước deep learning.

#### Thực hành

**Bài thực hành — XGBoost**

`XGBClassifier(n_estimators=300, learning_rate=0.05, max_depth=6)`, fit.

```python
from xgboost import XGBClassifier
xgb =
```

*Lời giải:*
```python
xgb = XGBClassifier(n_estimators=300, learning_rate=0.05, max_depth=6).fit(Xtr, ytr)
```

### Buổi 6: K-Means & PCA

*Học không giám sát: gom cụm & giảm chiều.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra bài KT | Trả KT15', nhận xét XGBoost. |
| 15–45' | Giảng — K-Means | Gom cụm không nhãn. Elbow chọn k. |
| 45–55' | ☕ Giải lao | |
| 55–90' | Giảng — PCA | Giảm chiều giữ phương sai. Scale trước! |
| 90–155' | Thực hành — K-Means + PCA | Phân khúc khách hàng + visualize 2D. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B7: Cross-validation. |

#### Nội dung giảng

**Phần 1 — K-Means (25 phút)**

Không cần nhãn, K-Means chia dữ liệu thành `k` cụm sao cho điểm trong cụm giống nhau nhất. Ứng dụng: phân khúc khách hàng. Chọn k bằng **elbow method**.

**Phần 2 — PCA (25 phút)**

Ép dữ liệu 2000 cột xuống 50 cột mà *giữ phần lớn phương sai* (thông tin). Tăng tốc training, visualize 2D/3D, giảm nhiễu.

> **⚠️ Scale trước!** Cả K-Means & PCA dựa khoảng cách. Cột lớn (doanh thu triệu) áp đảo cột nhỏ (tuổi). Luôn StandardScaler trước.

#### Thực hành

**Bài thực hành 1 — K-Means**

`KMeans(n_clusters=4, random_state=42, n_init=10)`, fit_predict.

```python
from sklearn.cluster import KMeans
km =
labels =
```

*Lời giải:*
```python
km = KMeans(n_clusters=4, random_state=42, n_init=10)
labels = km.fit_predict(X)
```

**Bài thực hành 2 — PCA**

`PCA(n_components=0.95)`, fit_transform, in shape mới.

```python
from sklearn.decomposition import PCA
pca =
Xp =
```

*Lời giải:*
```python
pca = PCA(n_components=0.95)
Xp = pca.fit_transform(X)
print(Xp.shape)
```

### Buổi 7: Cross-validation & Pipeline

*Đánh giá trung thực (CV) + chống data leakage (Pipeline).*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra K-Means/PCA | Hỏi: vì sao phải scale trước PCA? |
| 15–50' | Giảng — Cross-validation | Chia k-fold, đánh giá đáng tin hơn. |
| 50–60' | ☕ Giải lao | |
| 60–95' | Giảng — Pipeline | Ghép tiền xử lý + model. Chống leakage. |
| 95–155' | Thực hành — CV + Pipeline | cross_val_score trên Pipeline. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B8: GridSearch + ôn GK. |

#### Nội dung giảng

**Cross-validation (30 phút)**

Một lần chia train/test có thể may rủi. **Cross-validation** chia dữ liệu thành k phần, train k−1 đánh giá phần còn lại, xoay vòng k lần → điểm trung bình đáng tin hơn nhiều.

```python
from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5)
print(f"{scores.mean():.3f} ± {scores.std():.3f}")
```

**Pipeline — chống data leakage (25 phút)**

Ghép tiền xử lý + model thành 1 khối. Khi CV, Pipeline tự **fit trên từng fold train**, tránh leakage (rõ hơn tự làm tay). Liên hệ M2-B5.

#### Thực hành

**Bài thực hành — Pipeline + CV**

Pipeline([StandardScaler, RandomForest]), fit trên Xtr/ytr.

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
pipe = Pipeline([
    ("scaler", ),
    ("clf", ),
])
```

*Lời giải:*
```python
pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("clf", RandomForestClassifier()),
])
pipe.fit(Xtr, ytr)
```

**Bài thực hành — Cross-validation**

`cross_val_score(pipe, X, y, cv=5)`, in mean & std.

```python
from sklearn.model_selection import cross_val_score
scores =
print(f"{scores.mean():.3f} +- {scores.std():.3f}")
```

*Lời giải:*
```python
scores = cross_val_score(pipe, X, y, cv=5)
print(f"{scores.mean():.3f} +- {scores.std():.3f}")
```

### Buổi 8: GridSearchCV + Ôn giữa kì

*Tinh chỉnh siêu tham số + ôn toàn M3 cho GK.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra CV/Pipeline | Sửa bài Pipeline BTCN. |
| 15–50' | Giảng — GridSearchCV | Thử tổ hợp siêu tham số + CV, chọn tốt nhất. |
| 50–60' | ☕ Giải lao | |
| 60–100' | Ôn — Toàn M3 | B1–B7 tóm tắt. Làm mẫu đề GK. |
| 100–155' | Thực hành — Đề GK mẫu | Cả lớp làm đề GK mẫu. |
| 155–175' | Dặn dò — Chuẩn bị GK | B9: thi GK. |

```python
from sklearn.model_selection import GridSearchCV
grid = GridSearchCV(pipe, {"clf__n_estimators":[100,200,400]}, cv=5)
grid.fit(X, y)
print(grid.best_params_, grid.best_score_)
```

### Buổi 9: Kiểm tra Giữa kì môn

*Thi GK 90' (xem trang Đề thi môn). Trọng số 30%.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–10' | Phát đề | |
| 10–100' | 📝 Làm bài 90' | |
| 100–175' | Sau thi — Nhận xét | |

### Buổi 10: Mid-term Project HK1 — XGBoost

*Dự đoán dữ liệu kinh doanh. Mốc giữa HK1.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Trả bài GK | |
| 15–55' | Hướng dẫn — Project | |
| 55–160' | Thực hành — Làm project | Giáo viên đi vòng hỗ trợ. |
| 160–175' | Nộp | Nộp GitHub. Chuẩn bị M4. |

#### 🏆 MID-TERM PROJECT HK1 — XGBoost (Cá nhân · Bảo vệ)

Dùng toàn bộ M3 giải bài toán dự đoán kinh doanh trên dữ liệu bảng.

- Dataset Kaggle: giá nhà / churn / doanh thu.
- EDA → Pipeline → so sánh ≥ 3 mô hình → GridSearchCV.
- Báo cáo: metrics + feature importance + confusion matrix.

*Tiêu chí:* · Đạt baseline Kaggle · Pipeline đúng quy tắc · So sánh ≥ 3 mô hình · Feature importance · Bảo vệ 15'.

### Đề thi M3

**Hệ thống đề kiểm tra — Machine Learning:** 5 đề: 15'×2, 45', GK (90'), CK (120'). Có đáp án + thang điểm.

---

#### ĐỀ KT 15' #1 — B2 · Linear/Logistic

- ⏱ **15'** · Điểm tối đa: **10** · Trọng số: **5%**

**C1 (2đ).** Phân biệt học có giám sát vs không giám sát. Ví dụ mỗi loại.
**C2 (2đ).** Vì sao phải chia train/test?
**C3 (3đ).** Hàm σ(z)=1/(1+e⁻ᶻ) (sigmoid) tác dụng gì?
**C4 (3đ).** "Logistic Regression" là hồi quy hay phân loại? Vì sao tên gây nhầm?

<details>
<summary>✅ Đáp án</summary>

- **C1:** Có giám sát = có nhãn (phân loại/hồi quy); không = không nhãn (gom cụm/PCA).
- **C2:** Đánh giá khả năng tổng quát trên dữ liệu chưa thấy.
- **C3:** Kẹp đầu ra về [0,1] → xác suất.
- **C4:** Phân loại; tên vì dùng hồi quy tuyến tính rồi qua sigmoid.
</details>

---

#### ĐỀ KT 15' #2 — B5 · Boosting

- ⏱ **15'** · Điểm tối đa: **10** · Trọng số: **5%**

**C1 (3đ).** Khác RF vs Gradient Boosting (cốt lõi)?
**C2 (3đ).** Khi nào nên bắt đầu bằng RF thay vì XGBoost?
**C3 (4đ).** Fraud (rất hiếm): dùng Accuracy hay Recall? Vì sao?

<details>
<summary>✅ Đáp án</summary>

- **C1:** RF = bagging (cây song song độc lập); GB = boosting (cây tuần tự sửa lỗi).
- **C2:** RF dễ, ít tune, là baseline lý tưởng.
- **C3:** Recall — bỏ sót gian lận nguy hiểm; accuracy lừa vì lớp "không fraud" 99%+.
</details>

---

#### ĐỀ KT 45' — Sau B8

- ⏱ **45'** · Điểm tối đa: **10** · Trọng số: **15%** · 💻 Có máy + sklearn

**B1 (3đ).** Đọc CSV, train_test_split, fit RandomForest, in score.
**B2 (2đ).** In classification_report + confusion_matrix.
**B3 (3đ).** Pipeline([StandardScaler, LogisticRegression]), cross_val_score cv=5.
**B4 (2đ).** PCA(n_components=0.95), in shape mới.

<details>
<summary>✅ Đáp án</summary>

```python
Xtr,Xte,ytr,yte=train_test_split(X,y,test_size=0.2,random_state=42)
rf=RandomForestClassifier(n_estimators=200,random_state=42).fit(Xtr,ytr)
print(rf.score(Xte,yte))
print(classification_report(yte,rf.predict(Xte)))
pipe=Pipeline([("s",StandardScaler()),("c",LogisticRegression(max_iter=1000))])
print(cross_val_score(pipe,X,y,cv=5).mean())
Xp=PCA(n_components=0.95).fit_transform(X); print(Xp.shape)
```
</details>

---

#### ĐỀ GIỮA KÌ MÔN — B9 · 90'

- ⏱ **90'** · Điểm tối đa: **10** · Trọng số: **30%** · 💻 Có máy

**PHẦN 1 — Lý thuyết (4đ).**
(a) 3 loại bài toán ML (1đ).
(b) Accuracy lừa khi nào, dùng gì thay (1đ).
(c) RF vs GB (1đ).
(d) Data leakage & cách Pipeline tránh (1đ).

**PHẦN 2 — Code (6đ).**
Trên dataset cho sẵn:
(a) EDA + train_test_split (1đ).
(b) So sánh Logistic vs RF vs XGBoost bằng CV (2đ).
(c) Pipeline đúng quy tắc (1đ).
(d) GridSearchCV tinh chỉnh (1đ).
(e) Phân tích feature importance + confusion matrix (1đ).

<details>
<summary>✅ Đáp án tóm tắt</summary>

*Thang điểm GK:* 8.5–10: A · 7–8.4: B · 5.5–6.9: C · <5.5: D/F.
</details>

---

#### ĐỀ CUỐI KÌ MÔN — 120'

- ⏱ **120'** · Điểm tối đa: **10** · Trọng số: **45%** · 💻 Có máy

**C1 (2đ).** Giải thích Precision vs Recall. Bài toán nào ưu tiên cái nào?
**C2 (2đ).** Vì sao K-Means/PCA cần scale trước?
**C3 (3đ — code).** Pipeline đầy đủ: imputer + scaler + PCA + XGBoost, cross_val_score, in mean/std.
**C4 (3đ — phân tích).** Cho confusion matrix. Tính Precision/Recall/F1 tay. Đề xuất cải thiện nếu Recall thấp.

<details>
<summary>✅ Đáp án tóm tắt</summary>

- **C1:** Precision = đúng trong các đoán dương; Recall = phát hiện trong các dương thật. Spam→Precision, ung thư→Recall.
- **C2:** Cả hai dựa khoảng cách, cột lớn áp đảo.
- **C3:** Pipeline([('imp',SimpleImputer()),('s',StandardScaler()),('p',PCA(0.95)),('x',XGBClassifier())]) + CV.
- **C4:** P=TP/(TP+FP), R=TP/(TP+FN), F1=2PR/(P+R); tăng Recall = giảm ngưỡng / class_weight / resample.
</details>

---

## M4 — Deep Learning & CV

**Mã môn:** M4 · **Học kì:** HK1 · **Số tín chỉ:** 4 · **Số buổi:** 10 · **Tiên quyết:** M1, M2, M3 · **Đánh giá:** 15'×2 · 45' · GK · CK + Project YOLO

**Mục tiêu môn:**
- Chuyển sklearn → PyTorch
- Tự viết training loop
- Xây CNN, hiểu conv/pooling
- Train YOLO

**Đầu ra mong đợi:**
- Train CNN trên MNIST/CIFAR
- Train YOLO nhận diện
- Auto-labeling
- Project tháng 3

### Buổi 1: ANN & PyTorch nn.Module

*Chuyển từ sklearn sang PyTorch — tự build kiến trúc mạng, tự viết forward.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Warm-up — Giới thiệu M4 | "Tháng bản lề". Liên hệ M1 Toán + M3 ML. |
| 15–45' | Giảng — Từ Perceptron đến MLP | Nơ-ron = σ(w·x+b). Nhiều lớp = mạng sâu. |
| 45–55' | ☕ Giải lao | |
| 55–95' | Giảng — PyTorch nn.Module | __init__ + forward. nn.Sequential, nn.Linear. |
| 95–155' | Thực hành — Build MLP | Viết class mạng nơ-ron đầu tiên. |
| 155–175' | Dặn dò — BTCN + thông báo KT | B2: KT15' về activation/loss. |

#### Nội dung giảng

**Phần 1 — Từ Perceptron đến mạng sâu (30 phút)**

Một **nơ-ron**: `y = σ(w·x + b)` — chính hồi quy tuyến tính (M3) + hàm kích hoạt. Nối nhiều nơ-ron thành lớp, nhiều lớp thành mạng Feedforward (MLP). "Sâu" = nhiều lớp. Phép toán cốt lõi bạn đã biết ở M1-B1: `y = X·W + b`.

**Phần 2 — Hàm kích hoạt & loss (20 phút)**

| Hàm | Công thức | Dùng khi |
|---|---|---|
| ReLU | max(0,x) | Lớp ẩn (mặc định) |
| Sigmoid | 1/(1+e⁻ˣ) | Đầu ra nhị phân |
| Softmax | e^xi/Σe^xj | Đầu ra đa lớp |

**Loss** đo sai số: MSE cho hồi quy, CrossEntropy cho phân loại. Máy giảm loss bằng gradient descent (M1-B2).

**Phần 3 — PyTorch nn.Module (25 phút)**

Khác sklearn giấu training loop, PyTorch bắt bạn *tự viết* — khó hơn nhưng tường minh. Mọi mạng kế thừa `nn.Module`, có `__init__` (định nghĩa lớp) & `forward` (luồng dữ liệu).

```python
import torch.nn as nn
class MLP(nn.Module):
    def __init__(self, in_dim, hidden, out_dim):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, hidden), nn.ReLU(),
            nn.Linear(hidden, out_dim),
        )
    def forward(self, x): return self.net(x)
```

#### Thực hành

**Bài thực hành — Build MLP**

Hoàn thiện class MLP: nn.Sequential với Linear(20,64)+ReLU+Linear(64,3), def forward.

```python
import torch.nn as nn
class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(


        )
    def forward(self, x):
```

*Lời giải:*
```python
self.net = nn.Sequential(
    nn.Linear(20, 64), nn.ReLU(),
    nn.Linear(64, 3),
)
def forward(self, x): return self.net(x)
```

### Buổi 2: Training loop PyTorch

*Tự viết vòng lặp huấn luyện: forward → loss → backward → step.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — 📝 KT 15 PHÚT #1 | Activation/loss. |
| 15–45' | Giảng — 4 bước training | zero_grad → forward → backward → step. Liên hệ M1-B2 GD. |
| 45–55' | ☕ Giải lao | |
| 55–155' | Thực hành — Train MLP trên dữ liệu | Viết loop đầy đủ, quan sát loss giảm. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B3: Dataset/DataLoader. |

#### Nội dung giảng

**Training loop — 4 dòng thiêng (30 phút)**

PyTorch giấu autograd (tự tính đạo hàm), nhưng bắt bạn viết loop. 4 dòng cốt lõi:

```python
for xb, yb in loader:
    opt.zero_grad()           # xoá gradient cũ
    out = model(xb)           # forward
    loss = loss_fn(out, yb)   # tính sai số
    loss.backward()           # backward (autograd tính ∇)
    opt.step()                # cập nhật trọng số
```

> **📌 Liên hệ M1-B2:** `opt.step()` chính là `x = x - lr·∇f` của gradient descent! PyTorch chỉ tự tính ∇ (autograd) cho bạn, còn cập nhật vẫn là công thức đó.

#### Thực hành

**Bài thực hành — Training loop**

Hoàn thiện 4 bước: model.train, zero_grad, forward, backward, step.

```python
for xb, yb in loader:
    # set train mode

    # forward + loss


    # backward + step


```

*Lời giải:*
```python
model.train()
opt.zero_grad()
out = model(xb)
loss = loss_fn(out, yb)
loss.backward()
opt.step()
```

### Buổi 3: Custom Dataset & DataLoader

*Cách feed dữ liệu vào mô hình PyTorch đúng cách.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra bài KT | Trả KT15', nhận xét training loop. |
| 15–50' | Giảng — Dataset/DataLoader | __len__, __getitem__, batch, shuffle. |
| 50–60' | ☕ Giải lao | |
| 60–155' | Thực hành — Custom Dataset | Viết Dataset cho dữ liệu bảng, feed vào DataLoader. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B4: training full. |

#### Nội dung giảng

PyTorch dùng **Dataset** (định nghĩa cách lấy 1 mẫu) & **DataLoader** (gom thành batch, shuffle). Tách 2 khối này giúp xử lý dữ liệu lớn hiệu quả.

```python
from torch.utils.data import Dataset, DataLoader
class MyDS(Dataset):
    def __init__(self, X, y): self.X, self.y = torch.tensor(X, dtype=torch.float32), torch.tensor(y)
    def __len__(self): return len(self.X)
    def __getitem__(self, i): return self.X[i], self.y[i]
loader = DataLoader(MyDS(X, y), batch_size=32, shuffle=True)
```

#### Thực hành

**Bài thực hành — Custom Dataset**

Hoàn thiện class MyDS: __init__, __len__, __getitem__, DataLoader.

```python
from torch.utils.data import Dataset, DataLoader
class MyDS(Dataset):
    def __init__(self, X, y): self.X, self.y = torch.tensor(X, dtype=torch.float32), torch.tensor(y)


loader = DataLoader(
```

*Lời giải:*
```python
def __len__(self): return len(self.X)
def __getitem__(self, i): return self.X[i], self.y[i]
loader = DataLoader(MyDS(X, y), batch_size=32, shuffle=True)
```

### Buổi 4: Training loop hoàn chỉnh

*Ghép Module + Dataset + loop → train end-to-end, quan sát loss giảm.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra Dataset | Sửa bài DataLoader BTCN. |
| 15–55' | Giảng — Ghép tất cả | Model + loader + loop + eval. |
| 55–160' | Thực hành — Train end-to-end | Train MLP trên MNIST nhỏ, in loss/epoch. |
| 160–175' | Dặn dò — BTCN + thông báo KT | B5: KT15' về CNN. |

> **Buổi tổng hợp:** Hôm nay ghép mọi thứ đã học (Module B1, loop B2, Dataset B3) thành pipeline train đầy đủ. Học viên chạy đầu tiên trên dữ liệu thật, thấy loss giảm dần — khoảnh khắc "nó hoạt động!".

```python
for epoch in range(10):
    model.train()
    for xb, yb in loader:
        opt.zero_grad()
        loss = loss_fn(model(xb), yb)
        loss.backward(); opt.step()
    print(f"epoch {epoch}: loss={loss:.4f}")
```

### Buổi 5: CNN & Convolution

*Mạng tích chập — kiến trúc mở đường computer vision. Hiểu vì sao AI "nhìn" ảnh.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — 📝 KT 15 PHÚT #2 | CNN/convolution. |
| 15–50' | Giảng — Convolution | Kernel trượt, feature map. Lớp sâu học đặc trưng phức tạp. |
| 50–60' | ☕ Giải lao | |
| 60–95' | Giảng — Pooling | Max pooling giảm kích thước, bất biến dịch. |
| 95–155' | Thực hành — Build CNN | Conv2d + ReLU + MaxPool. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B6: MNIST. |

#### Nội dung giảng

**Phần 1 — Convolution (25 phút)**

Một **bộ lọc (kernel)** nhỏ (3×3) trượt qua ảnh, nhân từng vùng → "bản đồ đặc trưng". Lớp sâu học đặc trưng phức tạp dần: cạnh → texture → bộ phận → vật thể. Mỗi kernel là tham số được học bằng gradient descent.

**Phần 2 — Pooling (25 phút)**

**Max Pooling** lấy giá trị lớn nhất trong cửa sổ 2×2 → giảm kích thước, giữ đặc trưng nổi bật, tạo bất biến dịch (vật thể dịch chút vẫn nhận ra).

```python
class TinyCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
        )
    def forward(self, x): return self.features(x)
```

#### Thực hành

**Bài thực hành — CNN block**

Viết block: Conv2d(3→32, kernel 3, padding 1) + ReLU + MaxPool2d(2).

```python
import torch.nn as nn
block = nn.Sequential(



)
```

*Lời giải:*
```python
block = nn.Sequential(
    nn.Conv2d(3, 32, kernel_size=3, padding=1),
    nn.ReLU(),
    nn.MaxPool2d(2),
)
```

### Buổi 6: MNIST — CNN đầu tiên

*Luyện CNN trên chữ số MNIST, đạt >99% accuracy.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra CNN | Trả KT15', nhận xét CNN. |
| 15–40' | Giảng — MNIST & DataLoader ảnh | Tải torchvision MNIST, transform. |
| 40–55' | ☕ Giải lao | |
| 55–155' | Thực hành — Train CNN MNIST | Full pipeline, mục tiêu >99%. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B7: Object detection. |

> **📌 Bắt đầu từ đâu:** MNIST (chữ số) hoặc CIFAR-10 — ảnh nhỏ, train nhanh trên CPU. Đạt >99% (MNIST) trước khi sang ảnh lớn. Đây là "hello world" của CV.

```python
from torchvision import datasets, transforms
tf = transforms.Compose([transforms.ToTensor()])
train = datasets.MNIST(".", train=True, download=True, transform=tf)
loader = DataLoader(train, batch_size=64, shuffle=True)
```

### Buổi 7: Object Detection — IoU & mAP

*Phân loại chỉ nói "đây là gì"; phát hiện vật thể còn chỉ "ở đâu".*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra MNIST | Hỏi: accuracy MNIST của bạn? |
| 15–50' | Giảng — BBox, IoU, mAP | Bounding box, IoU, mAP. |
| 50–60' | ☕ Giải lao | |
| 60–95' | Giảng — Two-stage vs One-stage | Faster R-CNN vs YOLO. |
| 95–155' | Thực hành — Code hàm IoU | Tính IoU tay bằng NumPy. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B8: YOLO. |

#### Nội dung giảng

**BBox, IoU, mAP (30 phút)**

Phát hiện vật thể = phân loại + định vị. Mỗi dự đoán là hình chữ nhật (bbox) + nhãn + độ tin. **IoU** = giao/phần hợp giữa bbox dự đoán & thật; ≥0.5 coi đúng. **mAP** = chỉ số xếp hạng detector.

**Two-stage vs One-stage (25 phút)**

| Họ | Đại diện | Đặc điểm |
|---|---|---|
| Two-stage | Faster R-CNN | Đề xuất vùng → phân loại. Chính xác, chậm. |
| One-stage | YOLO | Dự đoán trực tiếp 1 lần. Nhanh, realtime. |

> **📌 YOLO thống trị công nghiệp:** Tốc độ realtime + đủ chính xác cho hầu hết ứng dụng (an ninh, tự lái, OCR kỹ thuật). YOLOv8/YOLOX hiện đại dùng anchor-free + augment mạnh.

#### Thực hành

**Bài thực hành — Hàm IoU**

Hoàn thiện `iou(a,b)`, mỗi box (x1,y1,x2,y2): giao, hợp, trả IoU. Test → 1/7≈0.143.

```python
def iou(a, b):
    ix1 = max(a[0], b[0]); iy1 = max(a[1], b[1])
    ix2 = min(a[2], b[2]); iy2 = min(a[3], b[3])
    inter = max(0, ix2-ix1) * max(0, iy2-iy1)
    area_a = (a[2]-a[0]) * (a[3]-a[1])
    area_b = (b[2]-b[0]) * (b[3]-b[1])
    union =
    return

print(iou((0,0,2,2), (1,1,3,3)))   # ≈ 0.143
```

*Lời giải:*
```python
union = area_a + area_b - inter
return inter / union
```

### Buổi 8: YOLOv8 — Train thực chiến

*Pipeline train YOLO với Ultralytics. Case Study bản vẽ PDF.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra IoU | Sửa bài IoU BTCN. |
| 15–50' | Giảng — Anchor-free & augment | YOLO hiện đại, Mosaic augmentation. |
| 50–60' | ☕ Giải lao | |
| 60–100' | Giảng — Pipeline Ultralytics | Train 1 dòng, auto-labeling. |
| 100–155' | Thực hành — Train YOLO | Train trên dataset ký hiệu nhỏ. |
| 155–175' | Dặn dò — BTCN + ôn GK | Chuẩn bị B9: GK. |

#### Nội dung giảng

**Anchor-free & Mosaic (20 phút)**

YOLO hiện đại bỏ anchor box cố định, dự đoán trực tiếp tâm + kích thước. **Mosaic**: ghép 4 ảnh thành 1 → học vật thể nhiều tỷ lệ/bối cảnh.

**Pipeline Ultralytics (30 phút)**

```python
from ultralytics import YOLO
model = YOLO("yolov8n.pt")
model.train(data="symbols.yaml", epochs=100, imgsz=640, batch=16)
metrics = model.val()   # mAP50, mAP50-95
```

**Auto-labeling & Human-in-the-loop (15 phút)**

Gán nhãn thủ công tốn thời gian. Quy trình: train bản nháp → dự đoán phần còn lại → người sửa bbox sai → train lại. Công cụ: Roboflow, CVAT, Label Studio.

> **⚠️ Bản vẽ PDF ≠ ảnh tự nhiên:** Nền trắng, nét mảnh, ký hiệu bị nhiễu/nghiêng/scan mờ. Cần: raster đúng DPI (≥300), augment (rotation, noise, contrast).

#### Thực hành

**Bài thực hành — Train YOLO**

`YOLO("yolov8n.pt")`, train với data="symbols.yaml", epochs=50, imgsz=640.

```python
from ultralytics import YOLO
model =
model.train(
```

*Lời giải:*
```python
model = YOLO("yolov8n.pt")
model.train(data="symbols.yaml", epochs=50, imgsz=640)
```

### Buổi 9: Kiểm tra Giữa kì môn

*Thi GK 90' (xem trang Đề thi môn). Trọng số 30%.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–10' | Phát đề | |
| 10–100' | 📝 Làm bài 90' | |
| 100–175' | Sau thi — Nhận xét | |

### Buổi 10: Project YOLO — Nhận diện ký hiệu kỹ thuật

*Case Study cốt lõi: Bơm/Van/Bình khí trên bản vẽ PDF.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Trả GK | |
| 15–55' | Hướng dẫn — Project | |
| 55–160' | Thực hành — Làm project | |
| 160–175' | Nộp | Chuẩn bị M5. |

#### 🏆 PROJECT YOLO — Nhận diện ký hiệu kỹ thuật (Cá nhân / Nhóm 2)

Case Study cốt lõi: nhận diện Bơm/Van/Bình khí trên bản vẽ PDF.

- 200–500 ảnh (PDF→PNG 300 DPI); gán nhãn CVAT/Roboflow.
- Train YOLOv8n/s; report mAP50 & mAP50-95.
- Augment rotation/noise/contrast → đo cải thiện.
- Script inference trên file PDF mới.

*Tiêu chí:* · mAP50 ≥ 0.75 · Bảng so sánh trước/sau augment · Inference trên PDF mới · Confusion matrix.

### Đề thi M4

**Hệ thống đề kiểm tra — Deep Learning & CV:** 5 đề: 15'×2, 45', GK (90'), CK (120'). Có đáp án + thang điểm.

---

#### ĐỀ KT 15' #1 — B2 · Activation/Loss

- ⏱ **15'** · Điểm tối đa: **10** · Trọng số: **5%**

**C1 (2đ).** Một nơ-ron tính gì? Viết công thức.
**C2 (2đ).** ReLU dùng cho lớp ẩn vì sao?
**C3 (3đ).** 4 bước training loop PyTorch (tên hàm).
**C4 (3đ).** Softmax khác Sigmoid ở đâu?

<details>
<summary>✅ Đáp án</summary>

- **C1:** y=σ(w·x+b).
- **C2:** Nhanh, đạo hàm 0/1 tránh gradient biến mất.
- **C3:** zero_grad → forward → backward → step.
- **C4:** Softmax cho đa lớp (tổng=1); Sigmoid cho nhị phân [0,1].
</details>

---

#### ĐỀ KT 15' #2 — B5 · CNN

- ⏱ **15'** · Điểm tối đa: **10** · Trọng số: **5%**

**C1 (3đ).** Convolution làm gì? Kernel là gì?
**C2 (3đ).** Max Pooling lợi ích?
**C3 (4đ).** IoU=0 nghĩa gì? IoU=1 nghĩa gì?

<details>
<summary>✅ Đáp án</summary>

- **C1:** Kernel trượt qua ảnh, nhân từng vùng → feature map.
- **C2:** Giảm kích thước, giữ đặc trưng nổi bật, bất biến dịch.
- **C3:** 0 = không giao (trật hoàn toàn); 1 = trùng khít.
</details>

---

#### ĐỀ KT 45' — Sau B8

- ⏱ **45'** · Điểm tối đa: **10** · Trọng số: **15%** · 💻 Có máy + PyTorch

**B1 (3đ).** Viết class MLP (nn.Module) 2 lớp, forward.
**B2 (3đ).** Viết training loop 5 epoch trên loader cho trước.
**B3 (2đ).** Viết block CNN: Conv2d(3,32,3,padding=1)+ReLU+MaxPool2d(2).
**B4 (2đ).** Hàm IoU(a,b) trả inter/union.

<details>
<summary>✅ Đáp án</summary>

```python
class MLP(nn.Module):
    def __init__(self):
        super().__init__(); self.net=nn.Sequential(nn.Linear(784,128),nn.ReLU(),nn.Linear(128,10))
    def forward(self,x): return self.net(x)
for _ in range(5):
    for xb,yb in loader:
        opt.zero_grad(); loss=loss_fn(model(xb),yb); loss.backward(); opt.step()
```
</details>

---

#### ĐỀ GIỮA KÌ MÔN — B9 · 90'

- ⏱ **90'** · Điểm tối đa: **10** · Trọng số: **30%** · 💻 Có máy

**PHẦN 1 — Lý thuyết (4đ).**
(a) Nơ-ron & vì sao cần hàm kích hoạt (1đ).
(b) Convolution vs Fully-connected (1đ).
(c) IoU & mAP (1đ).
(d) Two-stage vs One-stage (1đ).

**PHẦN 2 — Code (6đ).**
(a) CNN cho MNIST: Conv→Pool→Conv→Pool→FC, train 3 epoch (3đ).
(b) Hàm IoU NumPy, test 2 box (1.5đ).
(c) Inference 1 ảnh, vẽ kết quả (1.5đ).

<details>
<summary>✅ Đáp án tóm tắt</summary>

*Thang điểm GK:* 8.5–10: A · 7–8.4: B · 5.5–6.9: C · <5.5: D/F.
</details>

---

#### ĐỀ CUỐI KÌ MÔN — 120'

- ⏱ **120'** · Điểm tối đa: **10** · Trọng số: **45%** · 💻 Có máy

**C1 (2đ).** Vì sao GPU là trái tim của deep learning?
**C2 (2đ).** Autograd tính gì? Liên hệ gradient descent (M1).
**C3 (3đ — code).** CNN đầy đủ cho CIFAR-10: 2 khối Conv+Pool + FC, train 5 epoch, in accuracy.
**C4 (3đ).** Giải thích pipeline YOLO: anchor-free, Mosaic, mAP. Đề xuất cải thiện nếu mAP thấp.

<details>
<summary>✅ Đáp án tóm tắt</summary>

- **C1:** GPU có nhiều lõi giỏi nhân ma trận → train nhanh.
- **C2:** Autograd tự tính gradient; opt.step() = x−lr·∇f (M1-B2).
- **C4:** Thêm dữ liệu, augment, thử mô hình lớn hơn (yolov8s/m), tinh chỉnh lr.
</details>

---

## M5 — NLP & LLM

**Mã môn:** M5 · **Học kì:** HK1 · **Số tín chỉ:** 3 · **Số buổi:** 8 · **Tiên quyết:** M4 · **Đánh giá:** 15'×2 · 45' · GK · CK + Final HK1

**Mục tiêu môn:**
- Hiểu token hóa & embedding
- RNN/LSTM & giới hạn
- Self-Attention & Transformer
- Gọi API LLM

**Đầu ra mong đợi:**
- Code attention tay
- Gọi OpenAI/Claude
- Few-shot prompting
- Final HK1 (Web App)

### Buổi 1: NLP cốt lõi & Tokenization

*Máy không hiểu chữ — chỉ hiểu số. NLP là nghệ thuật biến chữ thành vector có ý nghĩa.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Warm-up — Giới thiệu M5 | Đỉnh HK1. Cầu nối sang HK2 (Agent). |
| 15–45' | Giảng — Tokenization | Tách câu thành token. Word/subword. |
| 45–55' | ☕ Giải lao | |
| 55–95' | Giảng — TF-IDF | Đánh giá tầm quan trọng từ. |
| 95–155' | Thực hành — Tokenize + TF-IDF | Xử lý văn bản tiếng Việt đơn giản. |
| 155–175' | Dặn dò — BTCN + thông báo KT | B2: KT15' về Word2Vec. |

#### Nội dung giảng

**Tokenization (25 phút)**

**Token hóa**: tách câu thành đơn vị (từ/subword). Bước đầu tiên — máy chỉ hiểu số. Các LLM hiện đại dùng subword (vd BPE) để cân bằng từ hiếm/phổ biến.

**TF-IDF (25 phút)**

**TF-IDF**: đánh giá tầm quan trọng của từ trong văn bản so với corpus. Từ xuất hiện nhiều trong 1 văn bản nhưng ít trong corpus → quan trọng. Cơ bản, cho văn bản ngắn.

> **📌 Hạn chế TF-IDF:** TF-IDF chỉ đếm tần suất, không hiểu ngữ nghĩa. "Vua" và "nữ hoàng" là 2 vector hoàn toàn khác. Word2Vec (B2) giải quyết điều này.

### Buổi 2: Word2Vec & Embedding

*Vector từ có ý nghĩa — vec(vua)−vec(nam)+vec(nữ)≈vec(nữ hoàng).*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — 📝 KT 15 PHÚT #1 | Word2Vec/embedding. |
| 15–50' | Giảng — Word2Vec | Học vector từ ngữ nghĩa. Không gian embedding. |
| 50–60' | ☕ Giải lao | |
| 60–155' | Thực hành — TF-IDF + Word2Vec | So sánh 2 cách biểu diễn. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B3: RNN/LSTM. |

#### Nội dung giảng

**Word2Vec — embedding có ngữ nghĩa (30 phút)**

**Word2Vec** học vector từ sao cho từ gần nghĩa → gần nhau trong không gian. Phép toán vector phản ánh quan hệ: `vec(vua)−vec(nam)+vec(nữ)≈vec(nữ_hoàng)`. Đây là gốc của mọi embedding hiện đại.

#### Thực hành

**Bài thực hành — TF-IDF**

`TfidfVectorizer()`, fit_transform(docs), in shape.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
docs = ["AI la tuong lai", "AI thay doi the gioi"]
vec =
X =
```

*Lời giải:*
```python
vec = TfidfVectorizer()
X = vec.fit_transform(docs)
print(X.shape)
```

### Buổi 3: RNN & LSTM

*Xử lý chuỗi với "bộ nhớ". Giới hạn dẫn tới Transformer.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra bài KT | Trả KT15', nhận xét Word2Vec. |
| 15–50' | Giảng — RNN | Đọc tuần tự, truyền trạng thái ẩn. |
| 50–60' | ☕ Giải lao | |
| 60–95' | Giảng — LSTM & giới hạn | Cổng nhớ/quên. Vanishing gradient → Transformer. |
| 95–155' | Thực hành — RNN đơn giản | PyTorch nn.RNN/nn.LSTM cơ bản. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B4: Attention. |

#### Nội dung giảng

**RNN — bộ nhớ tuần tự (25 phút)**

RNN đọc chuỗi từng bước, truyền "trạng thái ẩn" từ bước này sang bước kia → có "bộ nhớ". Nhưng RNN **quên xa** (vanishing gradient).

**LSTM & giới hạn (25 phút)**

**LSTM** bổ sung cổng (gates) kiểm soát nhớ/quên → xử lý chuỗi dài hơn. **Nhưng**: xử lý tuần tự → không song song, chậm với văn bản dài. Điểm yếu này dẫn tới Transformer (B4).

### Buổi 4: Self-Attention

*Linh hồn của ChatGPT. Mỗi token nhìn tất cả token khác để hoàn thiện ý nghĩa.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra RNN/LSTM | Hỏi: giới hạn RNN là gì? |
| 15–50' | Giảng — Self-Attention | Q,K,V. Mỗi token nhìn tất cả. |
| 50–60' | ☕ Giải lao | |
| 60–155' | Thực hành — Code attention | Viết scaled dot-product attention tay. |
| 155–175' | Dặn dò — BTCN + thông báo KT | B5: KT15' về Transformer. |

#### Nội dung giảng

**Self-Attention (35 phút)**

Ý tưởng: mỗi token *nhìn* tất cả token khác để tự hoàn thiện ý nghĩa, có trọng số. `Attention(Q,K,V)=softmax(Q·Kᵀ/√d)·V`. So với RNN: xử lý **song song toàn chuỗi**, nắm phụ thuộc xa dù khoảng cách lớn.

> **📌 Q, K, V là gì:** Query (hỏi), Key (chìa), Value (giá trị). Mỗi token dùng Q của mình hỏi tất cả K, tính độ liên quan, rồi lấy tổng có trọng số của V. Giống tra cứu "mềm" trong database.

#### Thực hành

**Bài thực hành — Scaled dot-product attention**

Hoàn thiện: scores=Q@K.transpose/√d, softmax, ×V.

```python
import torch, torch.nn.functional as F
def attention(Q, K, V):
    d = K.size(-1)
    scores =
    weights =
    return
```

*Lời giải:*
```python
scores = Q @ K.transpose(-2,-1) / (d**0.5)
weights = F.softmax(scores, dim=-1)
return weights @ V
```

### Buổi 5: Transformer & Encoder-Decoder

*Kiến trúc đổi đời AI: song song + scale + attention toàn cục.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — 📝 KT 15 PHÚT #2 | Transformer. |
| 15–55' | Giảng — Kiến trúc Transformer | Encoder-Decoder. BERT vs GPT. |
| 55–65' | ☕ Giải lao | |
| 65–155' | Thực hành — Dùng pretrained | Gọi transformer pretrained qua HuggingFace. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B6: gọi LLM API. |

#### Nội dung giảng

**Kiến trúc Transformer (40 phút)**

Bài gốc 2017: **Encoder** (hiểu đầu vào) + **Decoder** (sinh đầu ra). BERT = chỉ Encoder. GPT = chỉ Decoder. Hầu hết LLM hôm nay (GPT, Llama, Claude) là *Decoder-only*.

> **Vì sao Transformer thay đổi mọi thứ:** (1) Song song → train trên GPU khổng lồ; (2) Attention nắm ngữ cảnh toàn cục; (3) Scale lên hàng tỷ tham số. Cơ sở của mọi LLM.

### Buổi 6: Gọi LLM API & Prompt Engineering

*Cầu nối sang HK2 — từ hiểu LLM sang xây hệ thống trên LLM.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra bài KT | Trả KT15', nhận xét Transformer. |
| 15–50' | Giảng — Gọi API | OpenAI/Claude. Quản lý key an toàn. |
| 50–60' | ☕ Giải lao | |
| 60–95' | Giảng — Prompt Engineering | Zero-shot, few-shot, CoT. |
| 95–155' | Thực hành — Few-shot | Phân loại cảm xúc bằng prompt. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B7: GK. |

#### Nội dung giảng

**Gọi API + key an toàn (25 phút)**

```python
from openai import OpenAI
import os
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role":"user","content":"Tóm tắt hợp đồng..."}])
```

> **🚫 Không hardcode key!** Để trong .env, load bằng dotenv. Đưa lên Git = rò rỉ tiền + dữ liệu. (Lỗ hổng T25 sẽ học chống sâu hơn.)

**Prompt Engineering (25 phút)**

| Kỹ thuật | Mô tả | Khi nào |
|---|---|---|
| Zero-shot | Hỏi trực tiếp | Task đơn giản |
| Few-shot | Cho 2-5 ví dụ | Cần định dạng nhất quán |
| Chain-of-Thought | "Suy luận từng bước" | Toán, logic phức tạp |

#### Thực hành

**Bài thực hành — Few-shot prompt**

Viết messages few-shot: system + 2 ví dụ user/assistant + câu mới.

```python
messages = [
    {"role": "system", "content": "Phan loai cam xuc."},
    # vi du 1


    # vi du 2


    # cau moi

]
```

*Lời giải:*
```python
messages = [
    {"role":"system","content":"Phan loai cam xuc."},
    {"role":"user","content":"Mon an ngon!"},
    {"role":"assistant","content":"tich_cuc"},
    {"role":"user","content":"Giao cham."},
    {"role":"assistant","content":"tieu_cuc"},
    {"role":"user","content":"Den lay ban."},
]
```

### Buổi 7: Kiểm tra Giữa kì môn

*Thi GK 90' (xem trang Đề thi môn). Trọng số 30%.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–10' | Phát đề | |
| 10–100' | 📝 Làm bài 90' | |
| 100–175' | Sau thi — Nhận xét | |

### Buổi 8: Final Project HK1 — Web App AI

*Mốc cuối HK1: đóng gói mô hình thành Web App demo được.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Trả GK | |
| 15–55' | Hướng dẫn — Streamlit/Gradio | Đóng gói mô hình thành web app. |
| 55–160' | Thực hành — Build app + deploy | Deploy HF Spaces / Streamlit Cloud. |
| 160–175' | Nộp | Bảo vệ cuối kì. |

#### 🏆 FINAL PROJECT HK1 — Web App AI demo (Cá nhân · Bảo vệ cuối kì)

Tự train mô hình CV (YOLO) hoặc ML bảng, đóng gói thành Web App công khai.

- Hướng A: app nhận diện ảnh YOLO bạn train. Hướng B: app dự đoán dữ liệu bảng.
- Streamlit/Gradio + README + deploy công khai.
- Trình bày 20': bài toán, dữ liệu, mô hình, demo sống.

*Tiêu chí:* · Public link · Mô hình tự train · README · Demo sống · Trả lời kỹ thuật.

### Đề thi M5

**Hệ thống đề kiểm tra — NLP & LLM:** 5 đề: 15'×2, 45', GK (90'), CK (120'). Có đáp án + thang điểm.

---

#### ĐỀ KT 15' #1 — B2 · Word2Vec

- ⏱ **15'** · Điểm tối đa: **10** · Trọng số: **5%**

**C1 (3đ).** TF-IDF hạn chế gì mà Word2Vec giải quyết được?
**C2 (3đ).** Word2Vec học được điều gì?
**C3 (4đ).** Ví dụ phép toán vector Word2Vec cho thấy quan hệ ngữ nghĩa?

<details>
<summary>✅ Đáp án</summary>

- **C1:** TF-IDF chỉ đếm tần suất, không hiểu ngữ nghĩa; Word2Vec học vector có ngữ nghĩa.
- **C2:** Vector từ sao cho từ gần nghĩa gần nhau.
- **C3:** vec(vua)−vec(nam)+vec(nữ)≈vec(nữ_hoàng).
</details>

---

#### ĐỀ KT 15' #2 — B5 · Transformer

- ⏱ **15'** · Điểm tối đa: **10** · Trọng số: **5%**

**C1 (3đ).** Self-Attention công thức?
**C2 (3đ).** Vì sao Transformer thắng RNN?
**C3 (4đ).** BERT vs GPT khác gì (Encoder/Decoder)?

<details>
<summary>✅ Đáp án</summary>

- **C1:** softmax(Q·Kᵀ/√d)·V.
- **C2:** Xử lý song song toàn chuỗi + nắm phụ thuộc xa.
- **C3:** BERT = Encoder (hiểu); GPT = Decoder (sinh).
</details>

---

#### ĐỀ KT 45' — Sau B6

- ⏱ **45'** · Điểm tối đa: **10** · Trọng số: **15%** · 💻 Có máy

**B1 (3đ).** TF-IDF cho 5 câu, in shape + top từ quan trọng.
**B2 (3đ).** Code hàm attention(Q,K,V) bằng NumPy/torch.
**B3 (4đ).** Gọi OpenAI API few-shot phân loại cảm xúc, in kết quả.

<details>
<summary>✅ Đáp án</summary>

```python
vec=TfidfVectorizer(); X=vec.fit_transform(docs)
def attention(Q,K,V):
    d=K.shape[-1]
    return np.softmax(Q@K.T/(d**0.5))@V
```
</details>

---

#### ĐỀ GIỮA KÌ MÔN — B7 · 90'

- ⏱ **90'** · Điểm tối đa: **10** · Trọng số: **30%** · 💻 Có máy

**PHẦN 1 — Lý thuyết (4đ).**
(a) Tokenization & vì sao subword (1đ).
(b) Word2Vec vs TF-IDF (1đ).
(c) RNN giới hạn & Transformer giải quyết (1đ).
(d) Self-Attention Q,K,V (1đ).

**PHẦN 2 — Code (6đ).**
(a) TF-IDF + phân cụm văn bản (2đ).
(b) Code attention NumPy (2đ).
(c) Gọi LLM API few-shot, đánh giá 5 mẫu (2đ).

<details>
<summary>✅ Đáp án tóm tắt</summary>

*Thang điểm GK:* 8.5–10: A · 7–8.4: B · 5.5–6.9: C · <5.5: D/F.
</details>

---

#### ĐỀ CUỐI KÌ MÔN — 120'

- ⏱ **120'** · Điểm tối đa: **10** · Trọng số: **45%** · 💻 Có máy

**C1 (2đ).** Trình bày tiến hóa: TF-IDF → Word2Vec → RNN → Transformer. Mỗi bước giải quyết gì?
**C2 (2đ).** Vì sao Transformer scale được lên tỷ tham số mà RNN không?
**C3 (3đ — code).** Multi-head attention: code attention + lặp 4 head + concat.
**C4 (3đ).** Xây hệ thống RAG đơn giản: embedding + similarity search + prompt. Giải thích vì sao RAG giảm ảo giác.

<details>
<summary>✅ Đáp án tóm tắt</summary>

- **C2:** Transformer song song → train trên GPU khổng lồ; RNN tuần tự không scale.
- **C4:** RAG đưa ngữ cảnh thật vào prompt → LLM trả lời dựa dữ liệu thực, có nguồn, ít bịa.
</details>

---

## M6 — SQL Thực chiến cho AI & Data

**Mã môn:** M6 (code `ssql`) · **Học kì:** HK1 · **Số tín chỉ:** 3 · **Số buổi:** 8 · **Tiên quyết:** M2 · **Đánh giá:** 15'×2 · 45' · GK · CK + Mini-project

**Mục tiêu môn:**
- Hiểu CSDL quan hệ (Table, PK, FK)
- Nắm SELECT/WHERE/GROUP BY/JOIN
- Subquery, CTE, Window Functions
- Kết nối SQL ↔ Python

**Đầu ra mong đợi:**
- Truy vấn & nối bảng thành thạo
- Tính toán trên DB trước khi kéo về
- pandas.read_sql() kéo data sạch
- Mini-project EDA từ DB

### Buổi 1: CSDL quan hệ & SELECT cơ bản

*Hiểu Table, Primary Key, Foreign Key. Cú pháp SELECT/FROM/LIMIT. Nền cho toàn M6.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Warm-up — Giới thiệu M6 | Vì sao AI/Data Engineer cần SQL. Liên hệ M2 (Pandas). |
| 15–50' | Giảng — CSDL quan hệ | Table, PK, FK. Mô hình quan hệ. |
| 50–60' | ☕ Giải lao | |
| 60–100' | Giảng — SELECT/FROM/LIMIT | Cú pháp cốt lõi. Cột, alias. |
| 100–155' | Thực hành — Query đầu tiên | Dùng DB mẫu (DVD Rental / Chinook). |
| 155–175' | Dặn dò — BTCN + thông báo KT | B2: KT15' về WHERE. |

#### Nội dung giảng

**CSDL quan hệ (30 phút)**

**Database quan hệ** lưu dữ liệu trong các **bảng (table)** — giống sheet Excel nhưng có cấu trúc nghiêm ngặt & quan hệ. Mỗi bảng có **Primary Key (PK)** — mã duy nhất định danh mỗi dòng; & **Foreign Key (FK)** — tham chiếu tới PK bảng khác, tạo quan hệ. Ví dụ bảng `orders` có `customer_id` (FK) trỏ tới `customers.id` (PK).

> **📌 Vì sao AI cần SQL:** Trong doanh nghiệp, dữ liệu nằm trong DB, không phải file CSV. Kéo toàn bộ về Python rồi lọc = chậm & tốn RAM. SQL cho phép **truy xuất & biến đổi ngay trên DB** — chỉ kéo về đúng kết quả cần. Đây là kỹ năng sinh tồn của DA/AI Engineer.

**SELECT / FROM / LIMIT (25 phút)**

```sql
-- Cú pháp cơ bản nhất
SELECT id, name, email        -- cột cần lấy
FROM customers                -- bảng
LIMIT 10;                     -- chỉ 10 dòng đầu

-- Lấy tất cả cột
SELECT * FROM orders LIMIT 5;

-- Alias — đổi tên cột kết quả
SELECT name AS ten_khach FROM customers;
```

> **⚠️ Đừng SELECT * trên bảng lớn:** `SELECT *` trên bảng hàng triệu dòng = kéo toàn bộ, chậm & tốn tài nguyên. Luôn `LIMIT` khi khám phá, & chỉ chọn cột cần.

#### Bài về nhà (BTCN)

1. Cài DB mẫu (PostgreSQL + pgAdmin, hoặc DBeaver).
2. Restore DVD Rental / Chinook dataset.
3. Viết 5 SELECT khác nhau trên bảng customer.

### Buổi 2: WHERE & kỹ thuật lọc

*Lọc nhiễu: AND, OR, IN, BETWEEN, LIKE/ILIKE + wildcard.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — 📝 KT 15 PHÚT #1 | WHERE/lọc. |
| 15–50' | Giảng — WHERE + AND/OR/IN/BETWEEN | Lọc theo điều kiện. |
| 50–60' | ☕ Giải lao | |
| 60–100' | Giảng — LIKE & wildcard | %, _. Tìm text mập mờ. |
| 100–155' | Thực hành — Lọc | AND/OR/IN/BETWEEN/LIKE. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B3: Aggregate. |

#### Nội dung giảng

**WHERE + toán tử (25 phút)**

```sql
-- AND / OR
SELECT * FROM customers WHERE age > 25 AND city = 'HN';

-- IN — nằm trong tập
SELECT * FROM orders WHERE status IN ('paid', 'shipped');

-- BETWEEN — khoảng
SELECT * FROM products WHERE price BETWEEN 100 AND 500;
```

**LIKE & wildcard (25 phút)**

**LIKE** tìm text mập mờ — cực hữu ích khi lọc log. `%` = bất kỳ chuỗi nào, `_` = đúng 1 ký tự.

```sql
-- Tên bắt đầu bằng "Nguyễn"
SELECT * FROM customers WHERE name LIKE 'Nguyễn%';

-- Email có đuôi gmail
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- ILIKE — không phân biệt hoa thường (PostgreSQL)
SELECT * FROM logs WHERE message ILIKE '%error%';
```

#### Thực hành

**Bài thực hành 1 — WHERE + IN + BETWEEN**

Viết query: chọn đơn hàng status IN ('paid','shipped') AND total BETWEEN 100 AND 500.

```sql
SELECT * FROM orders
WHERE
```

*Lời giải:*
```sql
SELECT * FROM orders
WHERE status IN ('paid', 'shipped')
  AND total BETWEEN 100 AND 500;
```

**Bài thực hành 2 — LIKE wildcard**

Tìm khách hàng tên bắt đầu bằng "Nguyễn" bằng LIKE + %.

```sql
SELECT * FROM customers
WHERE name
```

*Lời giải:*
```sql
WHERE name LIKE 'Nguyễn%'
```

### Buổi 3: Aggregate & GROUP BY

*COUNT/SUM/AVG/MAX/MIN + GROUP BY + HAVING. Phần dùng nhiều nhất khi đi làm.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra bài KT | Trả KT15', nhận xét WHERE. |
| 15–50' | Giảng — Aggregate | COUNT/SUM/AVG/MAX/MIN. |
| 50–60' | ☕ Giải lao | |
| 60–100' | Giảng — GROUP BY vs HAVING | Khác sống còn. |
| 100–155' | Thực hành — Gom nhóm | GROUP BY + HAVING. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B4: JOIN. |

#### Nội dung giảng

**Hàm tổng hợp (25 phút)**

```sql
SELECT
  COUNT(*) AS so_don,
  SUM(total) AS tong_doanh_thu,
  AVG(total) AS trung_binh,
  MAX(total) AS don_cao_nhat,
  MIN(total) AS don_thap_nhat
FROM orders;
```

**GROUP BY vs HAVING — khác sống còn (30 phút)**

**GROUP BY** gom dòng theo giá trị cột, rồi tính aggregate mỗi nhóm. **HAVING** lọc *sau khi group* — khác WHERE (lọc trước group). Đây là điểm nhiều người nhầm.

```sql
-- Doanh thu trung bình mỗi thành phố
SELECT city, AVG(total) AS avg_rev
FROM orders
JOIN customers ON orders.customer_id = customers.id
GROUP BY city
HAVING AVG(total) > 1000      -- lọc NHÓM (sau group)
ORDER BY avg_rev DESC;
```

> **🚫 WHERE vs HAVING — lỗi thường gặp:** `WHERE` không thể dùng hàm aggregate (vd `WHERE AVG(total)>1000` → LỖI). Muốn lọc theo kết quả aggregate phải dùng `HAVING`. Quy tắc: WHERE lọc dòng gốc, HAVING lọc nhóm đã gom.

#### Thực hành

**Bài thực hành — GROUP BY + HAVING**

Đếm đơn (COUNT) theo city, GROUP BY city, HAVING COUNT(*) > 5.

```sql
SELECT city, COUNT(*) AS so_don
FROM orders
JOIN customers ON orders.customer_id = customers.id


```

*Lời giải:*
```sql
GROUP BY city
HAVING COUNT(*) > 5;
```

### Buổi 4: JOIN — Nối bảng

*INNER / LEFT / RIGHT / FULL OUTER JOIN. LEFT JOIN dùng nhiều nhất.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — 📝 KT 15 PHÚT #2 | JOIN. |
| 15–55' | Giảng — Các loại JOIN | Venn diagram. INNER/LEFT/RIGHT/FULL. |
| 55–65' | ☕ Giải lao | |
| 65–100' | Giảng — UNION | Gộp kết quả. |
| 100–155' | Thực hành — JOIN | Nối orders + customers + products. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B5: Subquery/CTE. |

#### Nội dung giảng

**Các loại JOIN (35 phút)**

| JOIN | Giữ gì | Dùng khi |
|---|---|---|
| **INNER JOIN** | Chỉ dòng khớp ở cả 2 bảng | Mặc định |
| **LEFT JOIN** | Toàn bộ bảng trái + khớp phải (null nếu không) | Dùng nhiều nhất |
| **RIGHT JOIN** | Toàn bộ bảng phải + khớp trái | Hiếm (đảo LEFT) |
| **FULL OUTER** | Toàn bộ cả 2 | Khi cần tất cả |

```sql
-- LEFT JOIN: tất cả khách + đơn của họ (null nếu chưa mua)
SELECT c.name, o.total
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;
```

> **📌 LEFT JOIN dùng nhiều nhất:** Khi muốn "tất cả X, kèm Y nếu có" — ví dụ tất cả khách hàng, kể cả chưa mua (total = NULL). Rất phổ biến trong báo cáo.

#### Thực hành

**Bài thực hành — LEFT JOIN**

LEFT JOIN customers và orders ON customer_id = id, lấy name và total.

```sql
SELECT c.name, o.total
FROM customers c

ON o.customer_id = c.id;
```

*Lời giải:*
```sql
LEFT JOIN orders o ON o.customer_id = c.id
```

### Buổi 5: Subquery & CTE

*Truy vấn lồng & WITH — chia nhỏ khối SQL khổng lồ thành logic dễ đọc.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra JOIN | Trả KT15', nhận xét JOIN. |
| 15–55' | Giảng — Subquery | SELECT trong SELECT. |
| 55–65' | ☕ Giải lao | |
| 65–155' | Thực hành — CTE | WITH chia khối logic. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B6: Window. |

#### Nội dung giảng

**Subquery (25 phút)**

```sql
-- Khách có tổng đơn > trung bình
SELECT customer_id, SUM(total) AS tong
FROM orders
GROUP BY customer_id
HAVING SUM(total) > (
    SELECT AVG(total) FROM orders      -- subquery
);
```

**CTE — WITH (30 phút)**

**CTE (Common Table Expression)** dùng `WITH` tạo "bảng tạm" có tên, chia khối SQL 100 dòng thành các khối logic dễ đọc/debug. Ưu việt hơn subquery lồng nhau khi phức tạp.

```sql
WITH rev_by_city AS (
    SELECT city, SUM(total) AS rev
    FROM orders JOIN customers ON ...
    GROUP BY city
),
top_cities AS (
    SELECT * FROM rev_by_city WHERE rev > 10000
)
SELECT * FROM top_cities ORDER BY rev DESC;
```

#### Thực hành

**Bài thực hành — CTE**

Viết CTE: WITH top_customers AS (SELECT ...) SELECT * FROM top_customers.

```sql
WITH top_customers AS (
    SELECT customer_id, SUM(total) AS tong
    FROM orders GROUP BY customer_id
)
SELECT * FROM top_customers WHERE tong > 10000;
```

*Lời giải:* CTE đúng cú pháp `WITH tên AS (SELECT ...) SELECT ... FROM tên`. Bài trên đã đúng.

### Buổi 6: Window Functions

*Vũ khí hạng nặng: ROW_NUMBER, RANK, LAG, LEAD, OVER(PARTITION BY).*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Tra CTE | Hỏi: lợi ích CTE? |
| 15–55' | Giảng — Window | OVER, PARTITION BY, ROW_NUMBER/RANK/LAG/LEAD. |
| 55–65' | ☕ Giải lao | |
| 65–155' | Thực hành — Window | So sánh tháng này vs tháng trước. |
| 155–175' | Dặn dò — BTCN | Chuẩn bị B7: GK. |

#### Nội dung giảng

**Window Functions (40 phút)**

**Window function** tính toán trên một "cửa sổ" (tập dòng liên quan) *mà không gộp dòng* (khác GROUP BY). Đây là "vũ khí hạng nặng" của DA/AI Engineer — tính lũy kế, so sánh tháng này vs tháng trước, xếp hạng.

```sql
-- Đánh số đơn theo khách, mới nhất trước
SELECT customer_id, created_at,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC) AS rn
FROM orders;

-- So sánh đơn này vs đơn trước (cùng khách)
SELECT customer_id, total,
  LAG(total) OVER (PARTITION BY customer_id ORDER BY created_at) AS don_truoc,
  total - LAG(total) OVER (PARTITION BY customer_id ORDER BY created_at) AS chenh_lech
FROM orders;
```

> **📌 Window vs GROUP BY:** GROUP BY gộp nhiều dòng thành 1 (mất chi tiết). Window giữ nguyên số dòng, chỉ thêm cột tính toán. Khi cần "xếp hạng", "lũy kế", "so sánh với dòng kề" mà không mất chi tiết → Window.

#### Thực hành

**Bài thực hành — ROW_NUMBER + PARTITION BY**

Đánh số đơn (ROW_NUMBER) theo customer_id, sắp xếp created_at DESC.

```sql
SELECT customer_id, created_at,
  ROW_NUMBER() (
  
  ) AS rn
FROM orders;
```

*Lời giải:*
```sql
ROW_NUMBER() OVER (
  PARTITION BY customer_id ORDER BY created_at DESC
)
```

### Buổi 7: Kiểm tra Giữa kì môn

*Thi GK 90' (xem trang Đề thi môn). Trọng số 30%.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–10' | Phát đề | |
| 10–100' | 📝 Làm bài 90' | |
| 100–175' | Sau thi — Nhận xét | |

### Buổi 8: SQL + Python & Mini-project

*pandas.read_sql() bắn query thẳng vào DataFrame. Mini-project EDA từ DB.*

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|---|---|---|
| 0–15' | Bài cũ — Trả GK | |
| 15–55' | Giảng — SQL ↔ Python | psycopg2, SQLAlchemy, read_sql. |
| 55–65' | ☕ Giải lao | |
| 65–160' | Thực hành — Mini-project | Kéo data từ DB về, làm sạch, EDA. |
| 160–175' | Nộp | Hoàn tất HK1. Chuẩn bị HK2. |

#### Nội dung giảng

**Kết nối SQL ↔ Python (35 phút)**

```python
from sqlalchemy import create_engine
import pandas as pd

engine = create_engine("postgresql://user:pass@localhost/db")

# Bắn query SQL thẳng vào DataFrame!
df = pd.read_sql("""
    SELECT c.city, AVG(o.total) AS avg_rev
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    WHERE o.status = 'paid'
    GROUP BY c.city
    HAVING AVG(o.total) > 500
    ORDER BY avg_rev DESC
""", engine)

# Giờ dùng Pandas làm sạch/visualize như bình thường
print(df.head())
```

> **📌 Tuyệt chiêu cuối:** `pd.read_sql(query, engine)` = cầu nối hoàn hảo giữa sức mạnh SQL (truy xuất/JOIN/aggregate trên DB) và Python (làm sạch/ML/visualize). Viết query phức tạp ở SQL, kéo đúng kết quả về DataFrame — không kéo nguyên bảng rồi mới xử lý.

#### 🏆 MINI-PROJECT M6 — EDA từ Database (Cá nhân)

Kết nối DB thật, viết query phức tạp, kéo về DataFrame, EDA + làm sạch.

- Kết nối PostgreSQL/SQLite bằng SQLAlchemy.
- Viết query có JOIN + GROUP BY + Window Function.
- `pd.read_sql()` kéo kết quả về.
- Làm sạch NaN/outlier + EDA (≥ 4 biểu đồ).

*Tiêu chí:* · Query có JOIN + GROUP BY + Window · Kết nối thành công · DataFrame sạch · EDA có nhận xét · Nộp notebook.

#### Thực hành

**Bài thực hành — read_sql**

Kết nối DB bằng create_engine, dùng pd.read_sql kéo kết quả query vào df.

```python
from sqlalchemy import create_engine
import pandas as pd

engine =
df = pd.
```

*Lời giải:*
```python
engine = create_engine("postgresql://user:pass@localhost/db")
df = pd.read_sql("SELECT * FROM orders LIMIT 10", engine)
```

### Đề thi M6 (SQL)

**Hệ thống đề kiểm tra — SQL Thực chiến:** 5 đề: 15'×2, 45', GK (90'), CK (120'). Có đáp án + thang điểm.

---

#### ĐỀ KT 15' #1 — B2 · WHERE

- ⏱ **15'** · Điểm tối đa: **10** · Trọng số: **5%**

**C1 (2đ).** Phân biệt Primary Key và Foreign Key.
**C2 (2đ).** Vì sao không nên SELECT * trên bảng lớn?
**C3 (3đ).** Viết WHERE: status IN ('paid','shipped') AND total > 100.
**C4 (3đ).** LIKE '%error%' tìm gì? Khác gì với '_error_'?

<details>
<summary>✅ Đáp án</summary>

- **C1:** PK = mã duy nhất mỗi dòng; FK = tham chiếu tới PK bảng khác.
- **C2:** Kéo toàn bộ, chậm + tốn RAM.
- **C3:** `WHERE status IN ('paid','shipped') AND total>100`.
- **C4:** %error% = chứa "error" ở bất kỳ đâu; _error_ = đúng 5 ký tự, "error" ở giữa.
</details>

---

#### ĐỀ KT 15' #2 — B4 · JOIN

- ⏱ **15'** · Điểm tối đa: **10** · Trọng số: **5%**

**C1 (3đ).** Khác WHERE vs HAVING?
**C2 (3đ).** LEFT JOIN giữ gì mà INNER JOIN không?
**C3 (4đ).** Viết: GROUP BY city, COUNT(*), HAVING COUNT(*) > 5.

<details>
<summary>✅ Đáp án</summary>

- **C1:** WHERE lọc dòng trước group; HAVING lọc nhóm sau group (dùng được aggregate).
- **C2:** LEFT JOIN giữ toàn bộ bảng trái kể cả không khớp (NULL).
- **C3:** `GROUP BY city HAVING COUNT(*)>5`.
</details>

---

#### ĐỀ KT 45' — Sau B6

- ⏱ **45'** · Điểm tối đa: **10** · Trọng số: **15%** · 💻 Có máy + DB

**B1 (2đ).** SELECT name, email WHERE city='HN' LIMIT 20.
**B2 (3đ).** JOIN orders+customers, GROUP BY city, AVG(total), HAVING > 1000.
**B3 (2đ).** CTE: WITH top AS (SELECT...) SELECT * FROM top.
**B4 (3đ).** Window: ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total DESC).

<details>
<summary>✅ Đáp án</summary>

```sql
SELECT name, email FROM customers WHERE city='HN' LIMIT 20;
SELECT c.city, AVG(o.total) FROM orders o JOIN customers c ON o.customer_id=c.id GROUP BY c.city HAVING AVG(o.total)>1000;
WITH top AS (SELECT customer_id, SUM(total) tong FROM orders GROUP BY customer_id) SELECT * FROM top;
SELECT *, ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY total DESC) rn FROM orders;
```
</details>

---

#### ĐỀ GIỮA KÌ MÔN — B7 · 90'

- ⏱ **90'** · Điểm tối đa: **10** · Trọng số: **30%** · 💻 Có máy + DB

**PHẦN 1 — Lý thuyết (4đ).**
(a) Table/PK/FK (1đ).
(b) WHERE vs HAVING (1đ).
(c) 4 loại JOIN (1đ).
(d) Window vs GROUP BY (1đ).

**PHẦN 2 — Code (6đ).**
Trên DB cho sẵn:
(a) SELECT+WHERE+LIKE (1đ).
(b) JOIN 3 bảng + GROUP BY + HAVING (2đ).
(c) CTE nhiều bước (1.5đ).
(d) Window: LAG so sánh tháng này/trước (1.5đ).

<details>
<summary>✅ Đáp án tóm tắt</summary>

*Thang điểm GK:* 8.5–10: A · 7–8.4: B · 5.5–6.9: C · <5.5: D/F.
</details>

---

#### ĐỀ CUỐI KÌ MÔN — 120'

- ⏱ **120'** · Điểm tối đa: **10** · Trọng số: **45%** · 💻 Có máy + DB + Python

**C1 (2đ).** Vì sao nên tính toán (JOIN/aggregate) trên DB thay vì kéo về Python?
**C2 (2đ).** Giải thích PARTITION BY trong Window. Ví dụ dùng.
**C3 (3đ — SQL).** Báo cáo: top 3 khách mua nhiều nhất mỗi tháng (CTE + Window ROW_NUMBER + PARTITION BY).
**C4 (3đ — Python).** Kết nối DB bằng SQLAlchemy, read_sql kéo kết quả C3 về DataFrame, vẽ biểu đồ top khách.

<details>
<summary>✅ Đáp án tóm tắt</summary>

- **C1:** DB tối ưu cho query (index, engine C); kéo nguyên bảng về Python chậm + tốn RAM.
- **C2:** PARTITION BY chia cửa sổ theo nhóm (vd customer_id), tính toán trong nhóm.
- **C3:** CTE tính SUM theo khách/tháng → ROW_NUMBER() OVER(PARTITION BY month ORDER BY tong DESC) → WHERE rn<=3.
</details>

---

*Hết HK1. HK2 bắt đầu với M7 AI Agent (xem file gốc `lo-trinh-ai-engineer-1-nam.html`).*
