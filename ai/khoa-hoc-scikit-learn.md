# 📊 Khóa Học scikit-learn — Machine Learning Từ Căn Bản Đến Nâng Cao

> Bản Markdown gọn của khóa học. Bản tương tác (sidebar, bài tập tự chấm, Pipeline Builder): [`khoa-hoc-scikit-learn.html`](khoa-hoc-scikit-learn.html)
> Nhẹ, chạy local trên CPU: `pip install scikit-learn pandas` (hoặc [Colab](https://colab.research.google.com)).

**16 chương · 4 cấp độ.** scikit-learn = ML "cổ điển" cho **dữ liệu bảng**, API `fit/predict` đồng nhất.

---

## L0 · Nhập môn

### Chương 1 — ML & scikit-learn là gì
| Loại bài toán | Mục tiêu | Thuật toán |
|---|---|---|
| Hồi quy | Dự đoán số liên tục | LinearRegression, RandomForestRegressor |
| Phân loại | Dự đoán nhãn rời rạc | LogisticRegression, SVC, RandomForest |
| Không giám sát | Tìm cấu trúc (không nhãn) | KMeans, PCA |

Quy trình: EDA → chia train/test → tiền xử lý (fit trên train) → `fit` model → đánh giá (CV) → tinh chỉnh → triển khai.

### Chương 2 — Estimator API: fit / predict
```python
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(X_train, y_train)        # học
model.predict(X_test)              # dự đoán
model.predict_proba(X_test)        # xác suất
model.score(X_test, y_test)        # accuracy
```
> `X` luôn 2D `(n_samples, n_features)`, `y` là 1D. Một đặc trưng: `X.reshape(-1, 1)`.

### Chương 3 — Dữ liệu & train_test_split
```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)
```
> ⚠️ **Data leakage:** scale/encode *trước* khi chia → điểm ảo. Chia trước, fit tiền xử lý chỉ trên train (Pipeline tự lo).

> **Bài tập 1:** `train_test_split(X, y, test_size=0.2, random_state=42)`.

---

## L1 · Học có giám sát

### Chương 4 — Hồi quy tuyến tính
```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
model = LinearRegression(); model.fit(X_train, y_train)
pred = model.predict(X_test)
mean_squared_error(y_test, pred) ** 0.5   # RMSE
r2_score(y_test, pred)                     # R²
```
> R²: 1 hoàn hảo, 0 = bằng đoán trung bình. `Ridge`/`Lasso` = hồi quy có regularization L2/L1.

> **Bài tập 2:** `LinearRegression()` → `fit(X_train, y_train)` → `predict(X_test)`.

### Chương 5 — Phân loại: Logistic & KNN
```python
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
LogisticRegression(max_iter=1000).fit(X_train, y_train)
KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
```
> "Logistic Regression" thực ra là model **phân loại**. KNN nhạy scaling → chuẩn hóa trước.

> **Bài tập 3:** `KNeighborsClassifier(n_neighbors=3)` → fit → predict.

### Chương 6 — Đánh giá model
```python
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import cross_val_score
accuracy_score(y_test, pred)
classification_report(y_test, pred)          # precision/recall/F1
cross_val_score(model, X, y, cv=5).mean()    # đáng tin hơn 1 lần chia
```
| Metric | Dùng khi |
|---|---|
| Accuracy | Lớp cân bằng |
| Precision | Chi phí báo nhầm cao |
| Recall | Bỏ sót nguy hiểm |
| F1 | Lớp mất cân bằng |
> 🚫 Bẫy accuracy: dữ liệu 99% lớp A → "luôn đoán A" đạt 99% nhưng vô dụng. Nhìn recall/F1 lớp hiếm.

> **Bài tập 4:** in `accuracy_score(y_test, pred)` và `classification_report(y_test, pred)`.

### Chương 7 — Tiền xử lý & Pipeline
```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
pipe = Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression())])
pipe.fit(X_train, y_train)     # scale + train trong 1 lệnh, KHÔNG leakage
```
Tiền xử lý: `StandardScaler`, `MinMaxScaler`, `OneHotEncoder`, `SimpleImputer`.

> **Bài tập 5:** Pipeline `('scaler', StandardScaler())` + `('clf', LogisticRegression())`.

---

## L2 · Trung cấp

### Chương 8 — Cây quyết định & Random Forest
```python
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1)
rf.fit(X_train, y_train)
rf.feature_importances_     # đặc trưng quan trọng
```
> RF = ensemble nhiều cây trên mẫu/đặc trưng ngẫu nhiên → giảm overfit. Ít cần scaling, mạnh cho dữ liệu bảng.

> **Bài tập 6:** `RandomForestClassifier(n_estimators=100, random_state=42)` → fit.

### Chương 9 — SVM
```python
from sklearn.svm import SVC
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
svm = make_pipeline(StandardScaler(), SVC(kernel='rbf', C=1.0, gamma='scale'))
```
> SVM nhạy scale → luôn bọc scaler. `C` lớn = dễ overfit; `rbf` cho ranh giới phi tuyến.

### Chương 10 — Gradient Boosting
```python
from sklearn.ensemble import HistGradientBoostingClassifier
HistGradientBoostingClassifier(max_iter=300, learning_rate=0.1).fit(X_train, y_train)
```
> Boosting: cây **tuần tự** sửa lỗi cây trước (vs Random Forest bagging song song). Thường chính xác hơn, cần tinh chỉnh. Mạnh ngang XGBoost/LightGBM.

### Chương 11 — ColumnTransformer
```python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
pre = ColumnTransformer([
    ('num', StandardScaler(), ['age', 'income']),
    ('cat', OneHotEncoder(handle_unknown='ignore'), ['city']),
])
full = Pipeline([('pre', pre), ('clf', RandomForestClassifier())])
```
> Mẫu chuẩn production: số → scale, hạng mục → one-hot, tất cả trong 1 Pipeline → lưu là xong.

### Chương 12 — Tinh chỉnh: GridSearchCV
```python
from sklearn.model_selection import GridSearchCV
param_grid = {'n_estimators': [100, 300], 'max_depth': [None, 10, 20]}
grid = GridSearchCV(RandomForestClassifier(random_state=42), param_grid, cv=5, scoring='f1_macro', n_jobs=-1)
grid.fit(X_train, y_train)
grid.best_params_, grid.best_estimator_
```
> `RandomizedSearchCV` hiệu quả hơn khi không gian lớn. Trong Pipeline: key dạng `'clf__n_estimators'`.

> **Bài tập 7:** `GridSearchCV(estimator, param_grid, cv=5)` → fit.

---

## L3 · Nâng cao

### Chương 13 — Học không giám sát: KMeans & PCA
```python
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
labels = KMeans(n_clusters=3, random_state=42, n_init='auto').fit_predict(X)
X2 = PCA(n_components=2).fit_transform(X)   # giảm chiều để vẽ/nén
```
> KMeans gom k cụm theo khoảng cách (chọn k bằng elbow/silhouette). PCA giữ phương sai lớn nhất. Cả hai nhạy scale.

### Chương 14 — Mất cân bằng & feature selection
| Vấn đề | Giải pháp |
|---|---|
| Lớp mất cân bằng | `class_weight='balanced'`; SMOTE (imbalanced-learn) |
| Quá nhiều đặc trưng | `SelectKBest`, `RFE`, importance cây |
| Under/overfit | `learning_curve`, `validation_curve` |
| Giá trị thiếu | `SimpleImputer`, `KNNImputer` |
```python
from sklearn.feature_selection import SelectKBest, f_classif
X_new = SelectKBest(f_classif, k=10).fit_transform(X, y)
```

### Chương 15 — Lưu model & triển khai
```python
import joblib
joblib.dump(pipe, 'model.joblib')          # lưu CẢ pipeline (gồm tiền xử lý)
loaded = joblib.load('model.joblib')
loaded.predict(new_raw_data)               # tiền xử lý chạy tự động
```
> 🚫 joblib chỉ nạp được trên cùng phiên bản sklearn/Python → ghim version. Đa nền tảng: `skl2onnx`.

> **Bài tập 8:** `joblib.dump(pipe, 'model.joblib')`; `joblib.load('model.joblib')`.

### Chương 16 — Dự án thực chiến (churn)
`read_csv` → tách X/y → `train_test_split(stratify=y)` → `ColumnTransformer` (impute+scale số, one-hot hạng mục) → Pipeline + `HistGradientBoostingClassifier` → `GridSearchCV(cv=5, scoring='f1')` → `classification_report` → `joblib.dump`.

> **Bài tập 9:**
> ```python
> pipe = Pipeline([('pre', pre), ('clf', HistGradientBoostingClassifier())])
> scores = cross_val_score(pipe, X, y, cv=5)
> ```

---

## 📋 Cheatsheet
| Lệnh | Tác dụng |
|---|---|
| `train_test_split` | Chia train/test |
| `.fit(X, y)` / `.predict(X)` | Học / dự đoán |
| `.transform(X)` | Biến đổi |
| `cross_val_score` | Kiểm định chéo |
| `Pipeline` / `ColumnTransformer` | Ghép bước |
| `StandardScaler` / `OneHotEncoder` | Tiền xử lý |
| `RandomForest` / `HistGradientBoosting` | Model bảng mạnh |
| `GridSearchCV` | Tinh chỉnh |
| `joblib.dump` | Lưu model |

## 🃏 Flashcards
- **sklearn mạnh ở đâu?** ML cổ điển cho dữ liệu bảng.
- **API chung?** fit/predict (+ transform).
- **Vì sao train_test_split?** Đánh giá khái quát hóa.
- **Data leakage?** Test rò vào train → điểm ảo (Pipeline ngăn).
- **F1 thay accuracy khi?** Lớp mất cân bằng.
- **Pipeline?** Ghép tiền xử lý + model, chống leakage.
- **RF vs Gradient Boosting?** Bagging song song vs boosting tuần tự.
- **Model nhạy scaling?** KNN, SVM, KMeans, PCA.
- **ColumnTransformer?** Số (scale) vs hạng mục (one-hot).
- **GridSearchCV?** Tìm siêu tham số tốt nhất qua CV.
- **KMeans vs PCA?** Gom cụm vs giảm chiều.
- **Lưu model?** `joblib.dump(pipeline)`.

---
*Học kèm [TensorFlow](khoa-hoc-tensorflow.html) & [PyTorch](khoa-hoc-pytorch.html) cho deep learning · một phần của [Mega Study](../index.html).*
