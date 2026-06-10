# 🔶 Khóa Học TensorFlow & Keras — Từ Căn Bản Đến Nâng Cao

> Bản Markdown gọn của khóa học. Bản tương tác (sidebar, bài tập tự chấm, Model Builder): [`khoa-hoc-tensorflow.html`](khoa-hoc-tensorflow.html)
> Thực hành trên [Google Colab](https://colab.research.google.com) (có sẵn TF + GPU) hoặc local: `pip install tensorflow`.

**16 chương · 4 cấp độ.** TF/PyTorch không chạy trong trình duyệt được, nên hãy copy code chạy trên Colab/local.

---

## L0 · Nhập môn

### Chương 1 — TensorFlow là gì & cài đặt
- **TensorFlow** (Google): thư viện học sâu trên tensor, autograd, chạy CPU/GPU/TPU, triển khai đa nền tảng.
- **Keras** = API cấp cao chính thức *bên trong* TF (`tf.keras`) — cách dựng model dễ nhất.
- Hệ sinh thái: `tf.keras` (model), `tf.data` (pipeline), `tf.function` (graph), TF Lite (mobile), TF Serving (server), TensorFlow.js (web).

```bash
pip install tensorflow
python -c "import tensorflow as tf; print(tf.__version__)"
```

### Chương 2 — Tensor: shape, dtype, phép toán
Tensor = mảng nhiều chiều, dtype đồng nhất. 0D vô hướng, 1D vector, 2D ma trận, 4D batch ảnh `(batch, H, W, C)`.

```python
import tensorflow as tf
a = tf.constant([[1., 2.], [3., 4.]])
a @ b                    # nhân ma trận
tf.reduce_mean(a)        # trung bình
tf.reshape(a, [4])       # đổi shape
w = tf.Variable([[0.5, 0.5]]); w.assign_add([[0.1, 0.1]])  # Variable thay đổi được
```
**Broadcasting:** TF tự "nong" chiều kích thước 1 cho khớp.

> **Bài tập 1:** Tạo `x` float32 shape (3,4) toàn số 1 (`tf.ones`), tính tổng theo cột (`axis=0`).
> ```python
> x = tf.ones([3, 4], dtype=tf.float32)
> col_sum = tf.reduce_sum(x, axis=0)   # → [3., 3., 3., 3.]
> ```

### Chương 3 — Autograd với GradientTape
```python
w = tf.Variable(3.0)
with tf.GradientTape() as tape:
    y = w ** 2
dy_dw = tape.gradient(y, w)   # 2w = 6.0
w.assign_sub(0.1 * dy_dw)     # một bước gradient descent
```
Mọi optimizer Keras dùng cơ chế này bên dưới.

> **Bài tập 2:** `x = tf.Variable(2.0)`, tính đạo hàm của `y = x**3 + 2*x` (= 14).
> ```python
> with tf.GradientTape() as tape:
>     y = x**3 + 2*x
> grad = tape.gradient(y, x)   # 3x² + 2 = 14.0
> ```

---

## L1 · Keras cơ bản

### Chương 4 — Mạng đầu tiên (Sequential)
```python
from tensorflow import keras
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation='softmax'),
])
```
Activation: `relu` (ẩn), `softmax` (phân loại nhiều lớp), `sigmoid` (nhị phân), linear (hồi quy).

> **Bài tập 3:** Sequential hồi quy: Input(8) → Dense(64,relu) → Dense(64,relu) → Dense(1).
> ```python
> model = keras.Sequential([
>     layers.Input(shape=(8,)),
>     layers.Dense(64, activation='relu'),
>     layers.Dense(64, activation='relu'),
>     layers.Dense(1)])
> ```

### Chương 5 — compile / fit / evaluate / predict
```python
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
history = model.fit(x_train, y_train, epochs=5, validation_split=0.1)
model.evaluate(x_test, y_test)
model.predict(x_test[:3])
```

| Bài toán | Loss | Activation cuối |
|---|---|---|
| Phân loại nhiều lớp (nhãn số) | `sparse_categorical_crossentropy` | softmax |
| Phân loại nhiều lớp (one-hot) | `categorical_crossentropy` | softmax |
| Nhị phân | `binary_crossentropy` | sigmoid |
| Hồi quy | `mse` / `mae` | linear |

> **Bài tập 4:** compile nhị phân — optimizer adam, loss binary_crossentropy, metrics accuracy.
> ```python
> model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
> ```

### Chương 6 — Dữ liệu với tf.data
```python
ds = tf.data.Dataset.from_tensor_slices((x_train, y_train))
ds = ds.shuffle(10_000).batch(32).prefetch(tf.data.AUTOTUNE)
model.fit(ds, epochs=5)
```
Thứ tự vàng: `map → cache → shuffle → batch → prefetch`.

> **Bài tập 5:** `ds.shuffle(1000).batch(64).prefetch(tf.data.AUTOTUNE)`

### Chương 7 — Overfitting & callbacks
Overfit = loss train giảm nhưng loss val tăng. Chống: thêm dữ liệu, Dropout, L1/L2, dừng sớm.
```python
from tensorflow.keras import callbacks
cbs = [
    callbacks.EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True),
    callbacks.ModelCheckpoint('best.keras', save_best_only=True),
    callbacks.ReduceLROnPlateau(factor=0.5, patience=2),
]
model.fit(x_train, y_train, epochs=100, validation_split=0.2, callbacks=cbs)
```

---

## L2 · Trung cấp

### Chương 8 — Functional API
```python
inputs = keras.Input(shape=(784,))
x = keras.layers.Dense(128, activation='relu')(inputs)
outputs = keras.layers.Dense(10, activation='softmax')(x)
model = keras.Model(inputs, outputs)
```
Mỗi lớp là một hàm `y = Layer(...)(x)` → dựng đồ thị tùy ý (ResNet, U-Net, đa nhánh).

> **Bài tập 6:** Input(32) → Dense(16,relu) → Dense(1,sigmoid), gói `keras.Model`.

### Chương 9 — CNN cho ảnh
```python
model = keras.Sequential([
    keras.layers.Input(shape=(32, 32, 3)),
    keras.layers.Conv2D(32, 3, activation='relu'),
    keras.layers.MaxPooling2D(),
    keras.layers.Conv2D(64, 3, activation='relu'),
    keras.layers.MaxPooling2D(),
    keras.layers.Flatten(),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(10, activation='softmax'),
])
```
Càng sâu, filter càng tăng (32→64→128), không gian giảm qua pooling.

> **Bài tập 7:** thêm khối `Conv2D(64, 3, relu)` + `MaxPooling2D()`.

### Chương 10 — Transfer learning & augmentation
```python
base = keras.applications.MobileNetV2(input_shape=(160,160,3), include_top=False, weights='imagenet')
base.trainable = False
model = keras.Sequential([
    keras.layers.RandomFlip('horizontal'), keras.layers.RandomRotation(0.1),
    base, keras.layers.GlobalAveragePooling2D(),
    keras.layers.Dropout(0.2), keras.layers.Dense(5, activation='softmax'),
])
```
**Fine-tune 2 pha:** (1) train đầu mới với backbone đóng băng; (2) mở băng vài lớp cuối với lr rất nhỏ.

### Chương 11 — Lưu/Load & TensorBoard
```python
model.save('my_model.keras')
model = keras.models.load_model('my_model.keras')
tb = keras.callbacks.TensorBoard(log_dir='./logs')   # tensorboard --logdir ./logs
```
`.keras` là chuẩn mới; `SavedModel` (thư mục) cho TF Serving.

### Chương 12 — Custom loop & subclass
```python
opt = keras.optimizers.Adam(); loss_fn = keras.losses.SparseCategoricalCrossentropy()
for x_batch, y_batch in train_ds:
    with tf.GradientTape() as tape:
        loss = loss_fn(y_batch, model(x_batch, training=True))
    grads = tape.gradient(loss, model.trainable_variables)
    opt.apply_gradients(zip(grads, model.trainable_variables))
```

> **Bài tập 8:**
> ```python
> grads = tape.gradient(loss, model.trainable_variables)
> opt.apply_gradients(zip(grads, model.trainable_variables))
> ```

---

## L3 · Nâng cao & triển khai

### Chương 13 — RNN/LSTM & văn bản
```python
model = keras.Sequential([
    keras.layers.TextVectorization(max_tokens=20000, output_sequence_length=200),
    keras.layers.Embedding(20000, 128),
    keras.layers.Bidirectional(keras.layers.LSTM(64)),
    keras.layers.Dense(1, activation='sigmoid'),
])
```
`Embedding`: token → vector học được. `LSTM`/`GRU`: xử lý thứ tự & phụ thuộc xa.

### Chương 14 — tf.function & hiệu năng
```python
@tf.function                       # biên dịch Python → graph (nhanh hơn)
def train_step(x, y): ...
keras.mixed_precision.set_global_policy('mixed_float16')   # nhanh ~2-3x trên GPU mới
```
Đa GPU: `tf.distribute.MirroredStrategy`.

### Chương 15 — Triển khai: Lite / Serving / JS
```python
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]   # lượng tử hóa
open('model.tflite', 'wb').write(converter.convert())
```
| Đích | Công cụ |
|---|---|
| Điện thoại/IoT | TF Lite / LiteRT |
| Server/API | TF Serving (SavedModel) |
| Trình duyệt | TensorFlow.js |

### Chương 16 — Dự án thực chiến
Phân loại ảnh hoa 5 lớp: `image_dataset_from_directory` → augment + MobileNetV2 đóng băng + Dense(5,softmax) → compile Adam/sparse_categorical_crossentropy → train với EarlyStopping + ModelCheckpoint → fine-tune → xuất `.tflite`.

> **Bài tập 9:**
> ```python
> history = model.fit(train_ds, validation_data=val_ds, epochs=20, callbacks=[early_stop])
> ```

---

## 📋 Cheatsheet
| Lệnh | Tác dụng |
|---|---|
| `keras.Sequential([...])` | Xếp chồng lớp |
| `model.compile(opt, loss, metrics)` | Cấu hình học |
| `model.fit / evaluate / predict` | Train / đánh giá / suy luận |
| `Dense / Conv2D / LSTM / Dropout` | Lớp hay dùng |
| `model.save('m.keras')` | Lưu model |
| `TFLiteConverter` | Xuất mobile |
| `@tf.function` | Biên dịch graph |
| `prefetch(AUTOTUNE)` | Pipeline nhanh |

## 🃏 Flashcards
- **Tensor?** Mảng nhiều chiều dtype đồng nhất.
- **Variable vs constant?** Variable đổi được (trọng số); constant cố định.
- **GradientTape?** Ghi phép tính → tự tính đạo hàm.
- **3 thứ trong compile?** optimizer, loss, metrics.
- **Activation phân loại nhiều lớp?** softmax.
- **Sequential vs Functional?** Xếp chồng tuyến tính vs đồ thị tùy ý.
- **Overfitting?** Loss train giảm, loss val tăng.
- **EarlyStopping?** Dừng khi metric ngừng cải thiện.
- **Transfer learning?** Dùng lại model ImageNet, đóng băng backbone.
- **Xuất mobile?** TFLiteConverter → `.tflite`.

---
*Học kèm [PyTorch](khoa-hoc-pytorch.html) & [scikit-learn](khoa-hoc-scikit-learn.html) · một phần của [Mega Study](../index.html).*
