# Khóa Học Python - Từ Newbie Đến Early Senior

> Nguồn: [khoa-hoc-python.html](khoa-hoc-python.html) — bản HTML có **chạy code trực tiếp** (Pyodide), **quiz tương tác** và **đáp án ẩn**.

---

## 📚 Tổng Quan Khóa Học

**Mục tiêu:** Lộ trình Python toàn diện theo 4 cấp độ năng lực thực tế — từ chưa biết gì đến tư duy kiến trúc của Early Senior. Mỗi chương gồm lý thuyết cô đọng, ví dụ code chạy được, bài tập có gợi ý + đáp án, và mỗi cấp độ kết thúc bằng quiz + mini-project.

**Đối tượng:**
- Người mới hoàn toàn, muốn học lập trình bài bản
- Sinh viên IT / người chuyển ngành chuẩn bị đi làm
- Junior dev muốn lên Mid/Senior có hệ thống
- Người cần nền Python cho Data/AI, Web, Automation/DevOps

**Quy mô:** 33 chương · 4 cấp độ · 4 project · ~16–24 tuần học · 100+ ví dụ chạy được

**Định hướng ví dụ:** phủ cả **Backend/Web** (FastAPI, DB), **Data/AI** (pandas, numpy), **Automation/DevOps** (script, Docker, CI/CD) và **Python thuần** (ngôn ngữ, OOP, thuật toán).

---

## 🗺️ Lộ Trình Theo Cấp Độ

| Level | Tên | Thời gian | Mục tiêu | Đầu ra |
|---|---|---|---|---|
| **L0** | 🟢 Newbie / Nền tảng | 4-6 tuần | Cú pháp, kiểu dữ liệu, if/loop, list/dict, hàm, lỗi | Tự động hóa tác vụ nhỏ, CLI đơn giản |
| **L1** | 🔵 Junior | 4-6 tuần | venv, file/JSON, OOP, exception, stdlib | Đóng góp feature vào dự án team |
| **L2** | 🟣 Mid | 6-8 tuần | decorator, generator, typing, test, async, DB, API, data | Tự build service hoàn chỉnh có test |
| **L3** | 🟠 Early Senior | 6-8 tuần | design pattern, SOLID, performance, async++, packaging, system design | Dẫn dắt thiết kế, review, scale hệ thống |

**Cách học hiệu quả:** đọc lý thuyết → tự gõ lại ví dụ → làm bài tập **không nhìn đáp án** → áp dụng vào mini-project mỗi level. Mở bản HTML để chạy code trực tiếp.

---

# 🟢 LEVEL 0 — NEWBIE / NỀN TẢNG

## Chương 1: Python & thiết lập môi trường

Python là ngôn ngữ **bậc cao, thông dịch (interpreted), gõ động (dynamic typing)** — cú pháp gần tiếng Anh, dễ đọc. Là ngôn ngữ số 1 cho Data/AI, rất mạnh cho backend web, automation, DevOps.

- **Interpreted:** chạy trực tiếp từng dòng, không cần biên dịch.
- **Dynamic typing:** không khai báo kiểu trước; `x = 5` rồi `x = "hi"` đều hợp lệ.
- **"Batteries included":** thư viện chuẩn cực giàu.

**Cài đặt:** Tải Python 3.12+ tại python.org (Windows nhớ tick *Add to PATH*). Cài VS Code + extension Python. Kiểm tra: `python --version`.

```python
# print() in nội dung ra màn hình
print("Xin chào, Python! 🐍")
ten = "Hieu"
print(f"Chào {ten}, chúc bạn học vui!")   # f-string: nhúng biến trong {}
```

> **Bài tập 1.1:** In 3 dòng: tên, năm sinh, và một câu f-string ghép cả hai.
>
> <details><summary>Đáp án</summary>
>
> ```python
> ten = "Hieu"; nam_sinh = 1998
> print(ten); print(nam_sinh)
> print(f"Tôi là {ten}, sinh năm {nam_sinh}, đang học Python.")
> ```
> </details>

---

## Chương 2: Biến & kiểu dữ liệu

Biến là tên trỏ tới giá trị; Python tự suy kiểu. Đặt tên theo `snake_case`.

| Kiểu | Ý nghĩa | Ví dụ |
|---|---|---|
| `int` | Số nguyên (không giới hạn) | `42`, `10**100` |
| `float` | Số thực | `3.14`, `1e-3` |
| `str` | Chuỗi | `"hello"` |
| `bool` | Luận lý | `True`, `False` |
| `NoneType` | Rỗng/chưa có | `None` |

```python
tuoi = 25; chieu_cao = 1.75; ten = "An"; da_ket_hon = False
print(type(tuoi), type(chieu_cao), type(ten))
# Ép kiểu (casting)
print(int("123") + 1)      # 124
print(str(99) + "%")       # "99%"
print(bool(0), bool(""), bool("x"))  # False False True
```

⚠️ `"5" + 3` → **TypeError**. Dữ liệu từ `input()` luôn là `str` — phải ép kiểu trước khi tính.

> **Bài tập 2.1:** Cho `a="10"`, `b="20"` (chuỗi). In tổng số học = 30.
>
> <details><summary>Đáp án</summary>
>
> ```python
> a = "10"; b = "20"
> print(int(a) + int(b))   # 30
> ```
> </details>

---

## Chương 3: Toán tử & biểu thức

| Toán tử | Ý nghĩa | Ví dụ → Kết quả |
|---|---|---|
| `/` | chia (luôn float) | `7/2` → `3.5` |
| `//` | chia lấy nguyên | `7//2` → `3` |
| `%` | chia lấy dư | `7%2` → `1` |
| `**` | lũy thừa | `2**10` → `1024` |

```python
print(5 > 3, 5 == 5, 5 != 2)        # so sánh -> bool
print(True and False, not True)      # logic
x = 10; x += 5; x %= 4; print(x)     # gán rút gọn -> 3
print("chẵn" if 8 % 2 == 0 else "lẻ")
```

💡 `%` rất hữu ích: kiểm tra chia hết (`n%k==0`), lấy chữ số cuối (`n%10`), xoay index (`i%len`).

> **Bài tập 3.1:** `tong = 3725` giây → in "1h 2m 5s".
>
> <details><summary>Đáp án</summary>
>
> ```python
> tong = 3725
> h = tong // 3600; m = (tong % 3600) // 60; s = tong % 60
> print(f"{h}h {m}m {s}s")   # 1h 2m 5s
> ```
> </details>

---

## Chương 4: Chuỗi (String)

Chuỗi là dãy ký tự, index từ **0**, index âm đếm từ cuối. Slice `s[start:stop:step]`.

```python
s = "Python"
print(s[0], s[-1])      # P n
print(s[0:3])           # Pyt
print(s[::-1])          # nohtyP (đảo ngược)
# Method quan trọng
t = "  Hello, World  "
print(t.strip().lower())            # hello, world
print("a,b,c".split(","))           # ['a','b','c']
print("-".join(["2024","01","15"])) # 2024-01-15
print("hello".replace("l","L"))     # heLLo
```

✅ Chuỗi **immutable** — mọi method trả về chuỗi mới. Cứ gán lại: `s = s.replace(...)`.

> **Bài tập 4.1:** Kiểm tra palindrome (bỏ qua hoa/thường). Test `"Madam"`.
>
> <details><summary>Đáp án</summary>
>
> ```python
> s = "Madam"; chuan = s.lower()
> print(chuan == chuan[::-1])   # True
> ```
> </details>

---

## Chương 5: Điều kiện if / elif / else

🚫 Python dùng **thụt lề (4 dấu cách)** thay cho `{}` để xác định khối. Sai thụt lề → IndentationError.

```python
diem = 7.5
if diem >= 9:    xep = "Giỏi"
elif diem >= 7:  xep = "Khá"
elif diem >= 5:  xep = "Trung bình"
else:            xep = "Yếu"
print(xep)   # Khá
trang_thai = "đậu" if diem >= 5 else "rớt"   # ternary
```

💡 **Truthy/Falsy:** `0`, `""`, `[]`, `{}`, `None` coi là False. Viết `if my_list:` thay vì `if len(my_list) > 0:`.

> **Bài tập 5.1:** FizzBuzz cho 1 số (test 15).
>
> <details><summary>Đáp án</summary>
>
> ```python
> n = 15
> if n % 3 == 0 and n % 5 == 0: print("FizzBuzz")
> elif n % 3 == 0: print("Fizz")
> elif n % 5 == 0: print("Buzz")
> else: print(n)
> ```
> </details>

---

## Chương 6: Vòng lặp for & while

```python
for i in range(1, 6): print(i, end=" ")   # 1 2 3 4 5
# enumerate: có cả index
for idx, ten in enumerate(["Toán","Lý","Hóa"], start=1):
    print(f"{idx}. {ten}")
# while + break/continue
n = 0
while True:
    n += 1
    if n == 3: continue
    if n > 5: break
    print(n)
```

| Công cụ | Dùng khi |
|---|---|
| `range(n)` | lặp n lần |
| `enumerate(xs)` | cần index + giá trị |
| `zip(a,b)` | duyệt 2 dãy song song |
| `break/continue` | thoát sớm / bỏ qua |

> **Bài tập 6.1:** Tổng số chẵn 1→100 (= 2550).
> <details><summary>Đáp án</summary>
>
> ```python
> print(sum(range(2, 101, 2)))   # 2550
> ```
> </details>
>
> **Bài tập 6.2:** In bảng cửu chương 2→9 (vòng for lồng nhau).

---

## Chương 7: List & Tuple

```python
nums = [3, 1, 4, 1, 5]
nums.append(9); nums.insert(0, 0); nums.remove(1)
last = nums.pop(); nums.sort()
print(len(nums), sum(nums), max(nums), min(nums), 4 in nums)
# Tuple - cố định (immutable)
x, y = (10.5, 20.3)        # unpacking
a, b = 1, 2; a, b = b, a   # hoán đổi Pythonic
```

⚠️ **Bẫy tham chiếu:** `b = a` (list) KHÔNG copy — cả hai trỏ cùng list. Copy: `b = a.copy()` / `a[:]`; lồng sâu: `copy.deepcopy`.

> **Bài tập 7.1:** Cho `[5,3,8,1,9,2]` — in max, min, list sắp giảm dần mà không đổi gốc.
> <details><summary>Đáp án</summary>
>
> ```python
> xs = [5,3,8,1,9,2]
> print(max(xs), min(xs))
> print(sorted(xs, reverse=True))   # không đổi gốc
> ```
> </details>

---

## Chương 8: Dict & Set

```python
sv = {"ten": "An", "tuoi": 20}
print(sv["ten"], sv.get("sdt", "N/A"))   # get an toàn nếu thiếu key
sv["email"] = "an@x.com"
for k, v in sv.items(): print(k, "=>", v)
# Đếm tần suất - pattern phổ biến
dem = {}
for ch in "abracadabra": dem[ch] = dem.get(ch, 0) + 1
# Set
a = {1,2,3}; b = {2,3,4}
print(a | b, a & b, a - b)            # hợp, giao, hiệu
print(list(set([1,1,2,3,3])))         # loại trùng
```

✅ **Khi nào dùng gì:** List (dãy có thứ tự) · Dict (tra cứu theo key, O(1)) · Set (loại trùng + kiểm tra tồn tại, O(1)) · Tuple (cố định, làm key dict).

> **Bài tập 8.1:** Đếm từ trong câu, in từ xuất hiện nhiều nhất.
> <details><summary>Đáp án</summary>
>
> ```python
> from collections import Counter
> dem = Counter("the cat sat on the mat the cat ran".split())
> print(dem.most_common(1))   # [('the', 3)]
> ```
> </details>

---

## Chương 9: Hàm (Function)

```python
def chao(ten, loi="Xin chào"):       # tham số mặc định
    return f"{loi}, {ten}!"
print(chao("Bình", loi="Hi"))         # keyword argument

def tong(*nums): return sum(nums)     # *args
def info(**kw): return kw             # **kwargs
print(tong(1,2,3,4), info(ten="An", tuoi=20))
```

🚫 **Bẫy mutable default:** đừng `def f(x, acc=[])` — list bị chia sẻ giữa các lần gọi. Dùng `acc=None; acc = acc or []`.

💡 Viết **docstring** (`"""..."""`) ngay dòng đầu hàm — truy cập qua `help(ham)`.

> **Bài tập 9.1:** Hàm `la_nguyen_to(n)`. Test 1,2,17,18.
> <details><summary>Đáp án</summary>
>
> ```python
> def la_nguyen_to(n):
>     if n < 2: return False
>     for i in range(2, int(n**0.5)+1):
>         if n % i == 0: return False
>     return True
> ```
> </details>

---

## Chương 10: Lỗi & try/except

```python
def chia(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Lỗi: chia cho 0!"
    except TypeError:
        return "Lỗi: sai kiểu!"
    finally:
        print("-- đã thử --")   # LUÔN chạy
```

| Exception | Khi nào |
|---|---|
| `ValueError` | `int("abc")` |
| `TypeError` | `"a" + 1` |
| `KeyError` | key dict không có |
| `IndexError` | index vượt phạm vi |
| `FileNotFoundError` | mở file không tồn tại |

⚠️ Đừng "nuốt" lỗi (`except: pass`). Bắt đúng loại lỗi bạn lường trước.

> **Bài tập 10.1:** `to_int_an_toan(s)` → int nếu hợp lệ, ngược lại None.
> <details><summary>Đáp án</summary>
>
> ```python
> def to_int_an_toan(s):
>     try: return int(s)
>     except (ValueError, TypeError): return None
> ```
> </details>

### 🧠 Quiz L0
1. `7 // 2` = ? → **3** (chia lấy nguyên)
2. Cấu trúc loại trùng tự động? → **set**
3. `"5" + 3` → **TypeError**

### 🏆 Mini-project L0 — Quản lý chi tiêu CLI
Dùng list/dict, vòng lặp, hàm, if, try/except.

<details><summary>Lời giải khung</summary>

```python
giao_dich = []
def them(mo_ta, so_tien, loai):
    giao_dich.append({"mo_ta": mo_ta, "so_tien": so_tien, "loai": loai})
def tong(loai):
    return sum(g["so_tien"] for g in giao_dich if g["loai"] == loai)
def so_du(): return tong("thu") - tong("chi")

them("Lương", 15000000, "thu"); them("Ăn uống", 2000000, "chi")
print(f"Số dư: {so_du():,}đ")
```
**Mở rộng:** menu `while`, lưu file (Ch12), xếp hạng khoản chi lớn nhất.
</details>

---

# 🔵 LEVEL 1 — JUNIOR

## Chương 11: Module, pip & virtual environment

Mỗi file `.py` là một **module**. `if __name__ == "__main__":` chỉ chạy khi file được chạy trực tiếp.

```python
import math
from random import randint, choice
import datetime as dt          # alias
print(math.sqrt(16), randint(1,6), choice(["đỏ","xanh"]))
```

**venv** cô lập môi trường mỗi dự án (kỹ năng bắt buộc của junior):

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows
source .venv/bin/activate       # macOS/Linux
pip install requests rich
pip freeze > requirements.txt
pip install -r requirements.txt
```

✅ Mỗi dự án 1 venv. Commit `requirements.txt`, KHÔNG commit `.venv/` (thêm `.gitignore`).

> **Bài tập 11.1:** Mô phỏng tung xu 1000 lần, in tỉ lệ % mặt ngửa.
> <details><summary>Đáp án</summary>
>
> ```python
> import random
> ngua = sum(1 for _ in range(1000) if random.choice(["H","T"]) == "H")
> print(f"Ngửa: {ngua/10:.1f}%")
> ```
> </details>

---

## Chương 12: File I/O, JSON & CSV

```python
# 'with' tự đóng file kể cả khi lỗi
with open("note.txt", "w", encoding="utf-8") as f:
    f.write("Dòng 1\n")
with open("note.txt", encoding="utf-8") as f:
    for i, line in enumerate(f, 1): print(i, line.rstrip())
```

| Mode | Ý nghĩa |
|---|---|
| `r` | đọc (mặc định) |
| `w` | ghi, xóa nội dung cũ |
| `a` | ghi nối tiếp |

```python
import json
data = {"ten": "An", "diem": [8,9,10]}
s = json.dumps(data, ensure_ascii=False, indent=2)  # dict -> JSON string
lai = json.loads(s)                                   # JSON -> dict
# Với file: json.dump(data, f) / json.load(f)
```

💡 **pathlib** hiện đại: `Path("data/note.txt").read_text(encoding="utf-8")`.

> **Bài tập 12.1:** Ghi list sinh viên ra JSON, đọc lại, lọc TB ≥ 8.

---

## Chương 13: Comprehensions

```python
[x**2 for x in range(1,6)]                  # [1,4,9,16,25]
[x for x in range(10) if x % 2 == 0]        # [0,2,4,6,8]
{x: x**2 for x in range(1,4)}               # dict comp
{len(w) for w in ["a","bb","cc"]}           # set comp
[x for row in [[1,2],[3,4]] for x in row]   # phẳng hóa
```

⚠️ Đừng lạm dụng: comprehension lồng nhiều tầng khó đọc hơn for thường.

> **Bài tập 13.1:** `["  An ","BÌNH","  cường  "]` → strip + title case.
> <details><summary>Đáp án</summary>
>
> ```python
> print([t.strip().title() for t in ["  An ","BÌNH","  cường  "]])
> ```
> </details>

---

## Chương 14: OOP cơ bản — Class & Object

```python
class TaiKhoan:
    """Tài khoản ngân hàng đơn giản."""
    lai_suat = 0.05                  # class attribute
    def __init__(self, chu, so_du=0):
        self.chu = chu               # instance attribute
        self.so_du = so_du
    def nap(self, tien):
        if tien <= 0: raise ValueError("Số tiền phải dương")
        self.so_du += tien
        return self.so_du
    def __str__(self):
        return f"TK({self.chu}: {self.so_du:,}đ)"

tk = TaiKhoan("An", 1000); tk.nap(500); print(tk)
```

| Khái niệm | Ý nghĩa |
|---|---|
| `class` | khuôn mẫu |
| object/instance | thực thể cụ thể |
| `__init__` | hàm khởi tạo |
| `self` | tham chiếu chính instance |

> **Bài tập 14.1:** Class `HinhChuNhat(rong, cao)` với `dien_tich()`, `chu_vi()`.

---

## Chương 15: OOP nâng cao

```python
class DongVat:
    def __init__(self, ten): self.ten = ten
    def keu(self): raise NotImplementedError
class Cho(DongVat):
    def keu(self): return "Gâu gâu"
class Meo(DongVat):
    def keu(self): return "Meo meo"
# Đa hình: cùng lời gọi, hành vi khác nhau
for con in [Cho("Mực"), Meo("Mun")]:
    print(con.ten, con.keu())

# @property: truy cập method như thuộc tính
class NhietDo:
    def __init__(self, c): self._c = c
    @property
    def fahrenheit(self): return self._c * 9/5 + 32
    @fahrenheit.setter
    def fahrenheit(self, f): self._c = (f - 32) * 5/9
```

💡 `super().__init__(...)` gọi lớp cha. Magic methods (`__len__`, `__eq__`, `__add__`, `__repr__`) cho object hoạt động như built-in.

> **Bài tập 15.1:** `Vector2D(x,y)` hỗ trợ `+` và `print()` đẹp.
> <details><summary>Đáp án</summary>
>
> ```python
> class Vector2D:
>     def __init__(self, x, y): self.x, self.y = x, y
>     def __add__(self, o): return Vector2D(self.x+o.x, self.y+o.y)
>     def __repr__(self): return f"Vector2D({self.x}, {self.y})"
> ```
> </details>

---

## Chương 16: Exception chuyên sâu

```python
class SoDuKhongDu(Exception):
    def __init__(self, thieu):
        self.thieu = thieu
        super().__init__(f"Thiếu {thieu:,}đ")

def rut(so_du, tien):
    if tien > so_du: raise SoDuKhongDu(tien - so_du)
    return so_du - tien
```

💡 **EAFP** ("Easier to Ask Forgiveness than Permission"): cứ thử rồi bắt lỗi — Pythonic hơn kiểm tra mọi điều kiện trước (LBYL).

🎯 **Senior:** tạo cây exception riêng cho domain (kế thừa `AppError`); dùng `raise ... from e` để giữ nguyên nhân gốc.

> **Bài tập 16.1:** `parse_tuoi(s)` raise ValueError với thông điệp phù hợp khi không phải số / ngoài [0,150].

---

## Chương 17: Standard Library tour

```python
from collections import Counter, defaultdict, deque
from datetime import datetime, timedelta
import itertools as it
print(Counter("banana"))                      # đếm
nhom = defaultdict(list); nhom["x"].append(2) # dict tự khởi tạo value
print(list(it.combinations(["A","B","C"], 2)))# tổ hợp
import re
print(re.findall(r"[\w.]+@[\w.]+", "a@x.com b@y.vn"))  # regex
```

| Module | Dùng để |
|---|---|
| `collections` | Counter, defaultdict, deque, namedtuple |
| `itertools` | tổ hợp, chain, groupby |
| `datetime` | ngày giờ |
| `pathlib` | đường dẫn/file hiện đại |
| `re` | regex |
| `functools` | cache, reduce, partial |

> **Bài tập 17.1:** Tính tổng tiền theo nhóm bằng `defaultdict`.

### 🧠 Quiz L1
1. `with open(...)` lợi ích? → **tự đóng file kể cả khi lỗi**
2. `self` là? → **instance đang gọi method**
3. `[x*2 for x in range(3)]` → **[0,2,4]**

### 🏆 Mini-project L1 — Todo App lưu JSON (OOP)
Class `TodoApp` với `add/complete/remove/save/load`, lưu `todos.json`, bắt `FileNotFoundError` lần đầu.

<details><summary>Lời giải khung</summary>

```python
import json
class TodoApp:
    def __init__(self, path="todos.json"):
        self.path = path; self.tasks = self.load()
    def load(self):
        try:
            with open(self.path, encoding="utf-8") as f: return json.load(f)
        except FileNotFoundError: return []
    def save(self):
        with open(self.path, "w", encoding="utf-8") as f:
            json.dump(self.tasks, f, ensure_ascii=False, indent=2)
    def add(self, tieu_de):
        nid = max([t["id"] for t in self.tasks], default=0) + 1
        self.tasks.append({"id": nid, "tieu_de": tieu_de, "xong": False})
    def complete(self, tid):
        for t in self.tasks:
            if t["id"] == tid: t["xong"] = True
```
</details>

---

# 🟣 LEVEL 2 — MID

## Chương 18: Decorators

Hàm "bọc" hàm khác để thêm hành vi — nền tảng framework (Flask, FastAPI).

```python
import functools, time
def do_thoi_gian(func):
    @functools.wraps(func)           # giữ tên/docstring gốc
    def wrapper(*args, **kwargs):
        t0 = time.perf_counter()
        kq = func(*args, **kwargs)
        print(f"[{func.__name__}] {(time.perf_counter()-t0)*1000:.2f}ms")
        return kq
    return wrapper

@do_thoi_gian
def tinh_tong(n): return sum(range(n))
```

💡 Decorator sẵn có: `@functools.lru_cache` (memoize), `@property`, `@staticmethod`, `@classmethod`, `@dataclass`.

> **Bài tập 18.1:** `@retry(n)` thử lại tối đa n lần khi hàm raise.
> <details><summary>Đáp án</summary>
>
> ```python
> import functools
> def retry(n):
>     def deco(func):
>         @functools.wraps(func)
>         def wrapper(*a, **k):
>             for lan in range(1, n+1):
>                 try: return func(*a, **k)
>                 except Exception:
>                     if lan == n: raise
>         return wrapper
>     return deco
> ```
> </details>

---

## Chương 19: Generators & Iterators

```python
def dem_lon(n):
    i = 1
    while i <= n:
        yield i * i        # "trả tạm" và tạm dừng
        i += 1
tong = sum(x*x for x in range(1_000_000))   # generator expr - không tốn RAM
```

💡 Generator giữ **1 phần tử trong RAM tại một thời điểm** → xử lý file lớn, stream, dãy vô hạn.

> **Bài tập 19.1:** Generator `fibonacci()` vô hạn, in 10 số đầu.
> <details><summary>Đáp án</summary>
>
> ```python
> from itertools import islice
> def fibonacci():
>     a, b = 0, 1
>     while True: yield a; a, b = b, a+b
> print(list(islice(fibonacci(), 10)))
> ```
> </details>

---

## Chương 20: Functional Programming

```python
from functools import reduce, partial
nums = [1,2,3,4,5]
list(map(lambda x: x*2, nums))       # [2,4,6,8,10]
list(filter(lambda x: x%2, nums))    # [1,3,5]
reduce(lambda a,b: a*b, nums)        # 120
sorted([("An",25),("Bình",20)], key=lambda p: p[1])  # theo tuổi
nhan_ba = partial(lambda a,b: a*b, 3); nhan_ba(10)   # 30
```

✅ Trong Python, comprehension thường dễ đọc hơn map/filter. Nhưng `sorted(key=...)`, `max(key=...)`, `reduce`, `partial` rất giá trị.

> **Bài tập 20.1:** Sắp sản phẩm theo giá giảm dần, in tên đắt nhất.

---

## Chương 21: Type Hints & mypy

```python
from typing import Optional
from dataclasses import dataclass

def tim(xs: list[int], target: int) -> Optional[int]:
    for i, x in enumerate(xs):
        if x == target: return i
    return None

@dataclass
class User:
    ten: str
    tuoi: int
    email: str = ""
```

💡 Python KHÔNG kiểm tra kiểu khi chạy — dùng `mypy app.py` / pyright để check tĩnh. Cú pháp hiện đại: `str | None`, `list[int]`, `dict[str, int]`.

🎯 **Senior:** `@dataclass(frozen=True, slots=True)`. Validation runtime mạnh hơn → **Pydantic** (nền FastAPI).

> **Bài tập 21.1:** dataclass `SanPham` + hàm `gia_tri_kho(sp) -> float`.

---

## Chương 22: Testing & pytest

```python
# pytest dựa trên assert
def cong(a, b): return a + b
def test_cong(): assert cong(2, 3) == 5

# Cấu trúc thật:
import pytest
@pytest.mark.parametrize("a,b,kq", [(10,2,5),(9,3,3)])
def test_chia(a, b, kq): assert chia(a, b) == kq
def test_chia_cho_0():
    with pytest.raises(ZeroDivisionError): chia(1, 0)
# Chạy: pytest -v   | coverage: pytest --cov=app
```

💡 Mô hình **AAA**: Arrange → Act → Assert. Dùng `fixture` tái sử dụng setup, `parametrize` chạy nhiều bộ dữ liệu.

> **Bài tập 22.1:** `la_nam_nhuan(y)` + 4 assert (2000, 1900, 2024, 2023).
> <details><summary>Đáp án</summary>
>
> ```python
> def la_nam_nhuan(y):
>     return y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)
> ```
> </details>

---

## Chương 23: Concurrency & async

| Mô hình | Phù hợp | Vì sao |
|---|---|---|
| `threading` | I/O-bound | bị GIL giới hạn với CPU-bound |
| `multiprocessing` | CPU-bound | chạy tiến trình thật, vượt GIL |
| `asyncio` | I/O-bound số lượng lớn | 1 thread, hàng nghìn task |

```python
import asyncio
async def tai(ten, giay):
    await asyncio.sleep(giay)        # I/O không chặn
    return f"{ten} xong"
async def main():
    kq = await asyncio.gather(tai("A",1), tai("B",2), tai("C",1))
    print(kq)   # tổng thời gian = task lâu nhất (~2s)
asyncio.run(main())
```

🚫 **GIL:** CPython chỉ cho 1 thread chạy bytecode tại một thời điểm → threading KHÔNG tăng tốc CPU-bound, phải dùng multiprocessing.

> **Bài tập 23.1:** `asyncio.gather` 3 task sleep 1s, đo tổng ~1s.

---

## Chương 24: Database & ORM

```python
import sqlite3
con = sqlite3.connect(":memory:"); cur = con.cursor()
cur.execute("CREATE TABLE sv(id INTEGER PRIMARY KEY, ten TEXT, diem REAL)")
cur.executemany("INSERT INTO sv(ten,diem) VALUES(?,?)",
                [("An",8.5),("Bình",6.0)])
con.commit()
# LUÔN dùng tham số ? chống SQL Injection
for row in cur.execute("SELECT ten,diem FROM sv WHERE diem>=? ORDER BY diem DESC", (8,)):
    print(row)
```

🚫 **SQL Injection:** KHÔNG BAO GIỜ nối chuỗi f-string vào SQL. Luôn tham số hóa (`?` / `:name`).

```python
# SQLAlchemy ORM (chạy trên máy)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
class Base(DeclarativeBase): pass
class SinhVien(Base):
    __tablename__ = "sv"
    id: Mapped[int] = mapped_column(primary_key=True)
    ten: Mapped[str]
    diem: Mapped[float]
```

> **Bài tập 24.1:** sqlite in-memory — tạo bảng sản phẩm, tính `SUM(gia)`.

---

## Chương 25: Web API với FastAPI

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
app = FastAPI()
db: dict[int, dict] = {}

class Item(BaseModel):       # Pydantic validate tự động
    ten: str
    gia: float

@app.post("/items/{item_id}")
def create(item_id: int, item: Item):
    if item_id in db: raise HTTPException(409, "Đã tồn tại")
    db[item_id] = item.model_dump()
    return {"ok": True, "item": db[item_id]}
# Mở /docs để test Swagger
```

💡 FastAPI: validate request tự động (type hints + Pydantic), sinh Swagger miễn phí, async native. **REST:** GET đọc, POST tạo, PUT/PATCH sửa, DELETE xóa. Status: 200/201/400/404/409/500.

> **Bài tập 25.1:** `GET /items/{id}` trả item hoặc `HTTPException(404)`.

---

## Chương 26: Data — pandas & numpy

```python
import numpy as np
a = np.array([1,2,3,4])
print(a * 2, a.mean(), a.sum())   # vectorized

import pandas as pd
df = pd.DataFrame({"ten":["An","Bình","Cường"],
                   "lop":["A","B","A"], "diem":[8.5,6.0,9.2]})
print(df[df.diem >= 7])                  # lọc
print(df.groupby("lop").diem.mean())     # TB mỗi lớp
df.to_csv("diem.csv", index=False)
```

🎯 **Senior — data:** load → clean (NaN, kiểu) → transform (groupby, merge, pivot) → analyze → export. Dữ liệu lớn: Polars / chunking. Nền tảng cho ML (scikit-learn, PyTorch).

> **Bài tập 26.1:** numpy — 10 số ngẫu nhiên, in max, TB, số phần tử > 50.

### 🧠 Quiz L2
1. `yield` → **biến hàm thành generator, sinh giá trị lười**
2. CPU-bound nặng → **multiprocessing**
3. Chống SQL Injection → **tham số hóa (?, :name)**

### 🏆 Mini-project L2 — REST API "URL Shortener" có test
FastAPI + SQLAlchemy + Pydantic + pytest. `POST /shorten` → mã ngắn; `GET /{code}` → redirect 307 / 404; đếm click; ≥3 test.

**Đạt Mid:** type hints đầy đủ, tách module (models/db/routes), test pass, xử lý lỗi rõ, README. *Bonus:* Dockerfile.

---

# 🟠 LEVEL 3 — EARLY SENIOR

## Chương 27: Design Patterns

```python
from abc import ABC, abstractmethod
# Strategy: hoán đổi thuật toán lúc chạy
class GiamGia(ABC):
    @abstractmethod
    def tinh(self, gia): ...
class GiamPhanTram(GiamGia):
    def __init__(self, pct): self.pct = pct
    def tinh(self, gia): return gia * (1 - self.pct/100)
class DonHang:
    def __init__(self, gia, cs): self.gia, self.cs = gia, cs
    def thanh_tien(self): return self.cs.tinh(self.gia)
```

| Pattern | Giải quyết |
|---|---|
| Factory | tạo object không lộ class cụ thể |
| Strategy | hoán đổi thuật toán lúc chạy |
| Singleton | 1 instance toàn cục (Python: module) |
| Observer | thông báo nhiều subscriber |
| Dependency Injection | truyền phụ thuộc từ ngoài vào |

🎯 Python linh hoạt → Strategy = truyền **hàm**; Singleton = **module object**; Factory = **dict**. Đừng over-engineer.

> **Bài tập 27.1:** Factory `tao_thong_bao(kenh)` cho email/sms, raise nếu kênh lạ.

---

## Chương 28: SOLID & Clean Architecture

| | Nguyên tắc | Ý nghĩa |
|---|---|---|
| **S** | Single Responsibility | mỗi class 1 lý do thay đổi |
| **O** | Open/Closed | mở mở rộng, đóng sửa đổi |
| **L** | Liskov Substitution | lớp con thay được lớp cha |
| **I** | Interface Segregation | nhiều interface nhỏ > 1 lớn |
| **D** | Dependency Inversion | phụ thuộc abstraction |

```python
from typing import Protocol
class KhoLuuTru(Protocol):
    def luu(self, user: dict) -> None: ...
class UserService:
    def __init__(self, kho: KhoLuuTru):   # inject từ ngoài
        self.kho = kho
    def dang_ky(self, ten):
        self.kho.luu({"ten": ten})
```

🎯 **Clean Architecture:** domain (business rule, không phụ thuộc gì) ← use case ← adapter (DB, web). Phụ thuộc hướng vào trong.

> **Bài tập 28.1:** Class `Report` vừa tính + format + gửi email vi phạm nguyên tắc nào? → **S** (Single Responsibility); tách thành ReportData / Formatter / Notifier + DI.

---

## Chương 29: Performance & Profiling

```python
# Kiểm tra tồn tại: list O(n) vs set O(1)
big_set = set(range(1_000_000))
(999999 in big_set)        # nhanh
"".join(str(i) for i in range(100000))   # join O(n), tránh += O(n²)
```

| Công cụ | Dùng để |
|---|---|
| `timeit` | micro-benchmark |
| `cProfile` + snakeviz | tìm hàm tốn thời gian |
| `memory_profiler` | đo RAM từng dòng |
| `@lru_cache` | memoize |
| `__slots__` | giảm RAM cho class nhiều instance |

🎯 **Quy trình:** (1) mục tiêu đo được → (2) profile tìm nút thắt (80/20) → (3) tối ưu thuật toán/cấu trúc trước → (4) cache → (5) cuối cùng mới C-extension/song song. *Đo, đừng đoán.*

> **Bài tập 29.1:** Tìm phần tử chung 2 list O(n·m) → viết lại O(n+m) bằng set.
> <details><summary>Đáp án</summary>
>
> ```python
> chung = set(a) & set(b)   # 'in set' là O(1), thay O(m) quét list
> ```
> </details>

---

## Chương 30: Async nâng cao

```python
import asyncio
async def worker(name, q, sem):
    while not q.empty():
        item = await q.get()
        async with sem:                  # giới hạn đồng thời
            await asyncio.sleep(0.1)
        q.task_done()
async def main():
    q = asyncio.Queue()
    for i in range(6): q.put_nowait(i)
    sem = asyncio.Semaphore(2)            # tối đa 2 cùng lúc
    workers = [asyncio.create_task(worker(f"W{n}", q, sem)) for n in range(3)]
    await q.join()
    for w in workers: w.cancel()
```

🚫 **Bẫy async:** (1) gọi blocking (`requests`, `time.sleep`) trong coroutine → chặn event loop; dùng `httpx`/`asyncio.sleep` hoặc `run_in_executor`. (2) quên `await`. (3) không xử lý timeout/cancel.

🎯 `Semaphore` (rate-limit), `asyncio.timeout()` (3.11+), `TaskGroup` (3.11+, structured concurrency).

> **Bài tập 30.1:** `fetch_all(urls)` tải đồng thời, giới hạn 3 request bằng Semaphore.

---

## Chương 31: Metaclass & Descriptor

```python
# Descriptor: tái sử dụng logic get/set
class SoDuong:
    def __set_name__(self, owner, name): self.name = f"_{name}"
    def __get__(self, obj, t=None): return getattr(obj, self.name)
    def __set__(self, obj, value):
        if value < 0: raise ValueError("Phải >= 0")
        setattr(obj, self.name, value)
class SanPham:
    gia = SoDuong(); ton = SoDuong()      # validate tự động
    def __init__(self, gia, ton): self.gia, self.ton = gia, ton
```

💡 `type` là metaclass mặc định ("class của class"). Hiểu nó giúp đọc code Django ORM / Pydantic / ABC.

🎯 **Khi nào:** `@property` cho 1 thuộc tính · descriptor khi tái dùng nhiều · metaclass chỉ khi xây framework. "Nếu phân vân có cần metaclass — thì bạn không cần."

> **Bài tập 31.1:** Descriptor `ChuoiKhongRong` đảm bảo chuỗi không rỗng.

---

## Chương 32: Packaging, Tooling & CI/CD

Cấu trúc dự án chuẩn (`src/` layout) + `pyproject.toml`:

```toml
[project]
name = "my-package"
version = "0.1.0"
dependencies = ["requests>=2.31"]
[project.optional-dependencies]
dev = ["pytest", "ruff", "mypy"]
```

💡 **Tooling 2024+:** `uv` (quản lý gói/venv siêu nhanh), `ruff` (lint+format), `mypy/pyright` (type check), `pre-commit`.

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

```yaml
# .github/workflows/ci.yml
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: {python-version: "3.12"}
      - run: pip install -e ".[dev]"
      - run: ruff check . && mypy src && pytest --cov
```

🎯 Pipeline: **lint → type check → test (+coverage) → build image → deploy**. Mọi PR phải xanh mới merge. Thêm: `pip-audit`, `bandit`, semantic versioning, publish PyPI (`build`+`twine` / `uv publish`).

> **Bài tập 32.1:** (máy thật) Tạo package `src/`, 1 hàm + 1 test, `ruff check .` và `pytest` đều xanh.

---

## Chương 33: System Design với Python

**Các trụ cột:**
- **Caching:** Redis cho session/kết quả nặng; `@lru_cache` trong process; hiểu invalidation.
- **Queue:** Celery/RQ/Dramatiq cho tác vụ nền (email, xử lý ảnh) — tách việc nặng khỏi request.
- **DB scaling:** index đúng, connection pool, read replica, tránh N+1, transaction, migration (Alembic).
- **API design:** versioning, pagination, rate limiting, idempotency, auth (JWT/OAuth2).
- **Observability:** logging có cấu trúc (JSON), metrics (Prometheus), tracing, health check.
- **Reliability:** retry + backoff, circuit breaker, timeout, graceful shutdown, 12-factor.

```python
import logging, json
class JsonFormatter(logging.Formatter):
    def format(self, r):
        return json.dumps({"level": r.levelname, "msg": r.getMessage()})
# Log có cấu trúc -> dễ giám sát trên ELK/Datadog
```

🎯 **Tư duy:** bắt đầu từ yêu cầu & ràng buộc (QPS, dữ liệu, độ trễ, nhất quán) → vẽ luồng dữ liệu → tìm nút thắt & SPOF → chọn đánh đổi có chủ đích → đơn giản hóa, đừng scale sớm.

> **Bài tập 33.1:** Thiết kế dịch vụ "gửi 100k email/giờ" — tách tầng, queue, idempotency, retry, giám sát.
> <details><summary>Gợi ý lời giải</summary>
>
> API mỏng → đẩy job vào queue (Celery+Redis), trả 202. Worker gọi nhà cung cấp. Idempotency: key duy nhất + lưu trạng thái. Retry: backoff + giới hạn + dead-letter queue. Rate limit theo hạn mức. Giám sát: metrics sent/failed/queue depth + alert. Scale: autoscale worker theo độ sâu hàng đợi.
> </details>

### 🧠 Quiz L3
1. "D" trong SOLID → **phụ thuộc abstraction, không vào implementation**
2. Bước đầu tối ưu hiệu năng → **profile/đo tìm nút thắt thật**
3. Tác vụ nền nặng → **đẩy vào message queue**

### 🏆 Capstone — "Task Queue Service" production-ready
- **API (FastAPI):** `POST /jobs`, `GET /jobs/{id}` (queued/running/done/failed)
- **Worker (asyncio/Celery):** retry + backoff, idempotency
- **Persistence:** SQLAlchemy + Alembic, connection pool
- **Chất lượng:** mypy sạch, test ≥80% coverage, ruff sạch
- **Vận hành:** Docker + compose (app+db+redis), structured logging, health check, CI
- **Tài liệu:** README kiến trúc, sơ đồ luồng

**Đạt Early Senior:** thiết kế rõ ràng, tách tầng, test & CI đầy đủ, xử lý lỗi/giám sát, giải thích được mọi đánh đổi và biết hệ thống sẽ vỡ ở đâu khi tải tăng 10×.

---

# 🎯 THỰC CHIẾN & PHỎNG VẤN

2 chương chuyên sâu (Regex, CLI) thường bị bỏ qua nhưng xuất hiện liên tục trong công việc thật; ngân hàng bài tập lấy cảm hứng từ đề phỏng vấn & task thật; và 3 đề thi cuối khóa mô phỏng vòng phỏng vấn Junior / Mid / Senior.

## Chương 34: Regex chuyên sâu

| Mẫu | Khớp | Mẫu | Khớp |
|---|---|---|---|
| `.` | ký tự bất kỳ | `\d` | chữ số |
| `\w` | chữ/số/_ | `\s` | khoảng trắng |
| `*` | 0+ | `+` | 1+ |
| `?` | 0/1 (hoặc lười) | `{2,5}` | 2→5 lần |
| `^ $` | đầu/cuối | `\b` | ranh giới từ |
| `( )` | nhóm bắt | `(?P<ten> )` | nhóm có tên |
| `a|b` | a hoặc b | `(?=...)` | lookahead |

⚠️ Luôn dùng **raw string** `r"..."` cho mẫu regex.

```python
import re
text = "Đơn #1024 ngày 2024-03-15, đơn #2048"
re.findall(r"#(\d+)", text)              # ['1024','2048']
m = re.search(r"(?P<y>\d{4})-(?P<m>\d{2})-(?P<d>\d{2})", text)
print(m.groupdict())                      # nhóm có tên
re.sub(r"#\d+", "#****", text)            # thay thế
# Greedy vs Lazy
re.findall(r"<.*>", "<a><b>")             # ['<a><b>'] - tham lam
re.findall(r"<.*?>", "<a><b>")            # ['<a>','<b>'] - tối thiểu
```

🚫 **ReDoS:** mẫu như `(a+)+$` gây catastrophic backtracking → treo CPU. Tránh nhóm lặp lồng nhau mơ hồ với input không tin cậy.

🎯 Đừng dùng regex parse cấu trúc lồng nhau (HTML/JSON) — dùng parser chuyên dụng. Mẫu phức tạp: thêm `re.VERBOSE`.

> **BT 34.1 (data/job):** Trích SĐT VN. <details><summary>Đáp án</summary>
>
> ```python
> re.findall(r"(?:\+84|0)\d{9,10}", text)
> ```
> </details>
>
> **BT 34.2 (phỏng vấn Mid):** Parse log Nginx (IP, method, path, status). <details><summary>Đáp án</summary>
>
> ```python
> pat = re.compile(r'(?P<ip>\S+) .*?"(?P<method>\w+) (?P<path>\S+) [^"]+" (?P<status>\d{3})')
> print(pat.search(line).groupdict())
> ```
> </details>
>
> **BT 34.3 (validation):** Mật khẩu mạnh bằng lookahead. <details><summary>Đáp án</summary>
>
> ```python
> PAT = re.compile(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$")
> ```
> `(?=...)` = lookahead: kiểm tra điều kiện mà không tiêu thụ ký tự.
> </details>

---

## Chương 35: CLI chuyên sâu — xây công cụ dòng lệnh

```python
# Mức 1: sys.argv + exit code
import sys
args = sys.argv[1:]
try: a, b = int(args[0]), int(args[1])
except (ValueError, IndexError):
    print("Cách dùng: prog <a> <b>", file=sys.stderr)
    sys.exit(2)          # exit code != 0 = lỗi
print(a + b)
```

💡 Công cụ tốt: lỗi ra **stderr**, **exit code ≠ 0** khi lỗi, dữ liệu ra **stdout** để `| pipe`.

```python
# Mức 2: argparse (thư viện chuẩn)
import argparse
p = argparse.ArgumentParser(description="Thống kê số")
p.add_argument("numbers", type=int, nargs="+")
p.add_argument("-o", "--op", choices=["sum","avg","max"], default="sum")
p.add_argument("-v", "--verbose", action="store_true")
args = p.parse_args()
# Tự sinh --help, validate, exit code 2 khi sai. Subcommand qua add_subparsers().
```

```python
# Mức 3: Typer (production) - pip install typer
import typer
app = typer.Typer()
@app.command()
def add(ten: str, uu_tien: int = 1):
    typer.echo(f"✓ {ten} (ưu tiên {uu_tien})")
if __name__ == "__main__": app()
# python cli.py add "Mua sữa" --uu-tien 3
```

🎯 **CLI production:** Typer/Click, thêm `--dry-run`, `--json`, đọc config env/file, progress bar (`rich`), đóng gói thành lệnh qua `[project.scripts]` trong pyproject.toml.

> **BT 35.1 (devops/job):** CLI đọc file + cờ `--count`, exit 1 nếu file thiếu. <details><summary>Đáp án</summary>
>
> ```python
> import argparse, sys
> from pathlib import Path
> p = argparse.ArgumentParser(); p.add_argument("file"); p.add_argument("--count", action="store_true")
> args = p.parse_args(); path = Path(args.file)
> if not path.exists():
>     print(f"Lỗi: không thấy {path}", file=sys.stderr); sys.exit(1)
> lines = path.read_text(encoding="utf-8").splitlines()
> print(len(lines) if args.count else "\n".join(lines))
> ```
> </details>
>
> **BT 35.2 (thiết kế):** CLI `backup` với 3 subcommand. → dùng `add_subparsers(dest="command")`, cờ chung qua `parent` parser + `parents=[...]`, điều phối bằng `set_defaults(func=...)` rồi `args.func(args)`.

---

## 📚 Ngân hàng bài tập thực chiến (theo chương)

Bài tập mô phỏng đề phỏng vấn thật và task công việc trên JD tuyển dụng. Tự bấm giờ như phỏng vấn: coding 15-25 phút, thiết kế 10-15 phút.

### 🟢 Newbie (CH 1-10)

**B1 · Reverse words** *(Fresher)* — `"hello world foo"` → `"foo world hello"`.
<details><summary>Đáp án</summary>

```python
print(" ".join(s.split()[::-1]))
```
</details>

**B2 · Two Sum** *(LeetCode Easy, hỏi rất nhiều)* — trả index 2 số bằng target, O(n).
<details><summary>Đáp án</summary>

```python
def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        if target - x in seen: return [seen[target-x], i]
        seen[x] = i
```
Họ test: bạn có nghĩ tới dict để hạ O(n²)→O(n) không.
</details>

**B3 · Anagram** *(Fresher)* — `Counter(a) == Counter(b)`.

**B4 · Concept — mutable default** *(câu lọc miệng)* — `def them(x, ds=[])` in `[1]` rồi `[1,2]` vì list mặc định tạo 1 lần, chia sẻ giữa các lần gọi. Sửa: `ds=None`.

### 🔵 Junior (CH 11-17)

**B5 · Group anagrams** *(LeetCode Medium)*.
<details><summary>Đáp án</summary>

```python
from collections import defaultdict
def group_anagrams(words):
    nhom = defaultdict(list)
    for w in words: nhom["".join(sorted(w))].append(w)
    return list(nhom.values())
```
</details>

**B6 · Parse & thống kê CSV** *(take-home Junior)* — doanh thu mỗi sản phẩm từ list "tên,sl,giá".
<details><summary>Đáp án</summary>

```python
from collections import defaultdict
doanh_thu = defaultdict(int)
for r in rows:
    ten, sl, gia = r.split(",")
    doanh_thu[ten] += int(sl) * int(gia)
print(max(doanh_thu, key=doanh_thu.get))
```
Họ chấm: tách hàm, xử lý dòng lỗi, có test.
</details>

**B7 · OOP — hệ thống mượn sách** *(phỏng vấn OOP)* — `Book`/`Member`/`Library` với `borrow/return_book`, sách đang mượn không cho mượn tiếp. Nêu trade-off lưu trạng thái ở `Book` hay `Library`.

### 🟣 Mid (CH 18-26)

**B8 · LRU Cache O(1)** *(hỏi cực nhiều ở Mid)*.
<details><summary>Đáp án</summary>

```python
from collections import OrderedDict
class LRUCache:
    def __init__(self, cap): self.cap=cap; self.d=OrderedDict()
    def get(self, k):
        if k not in self.d: return -1
        self.d.move_to_end(k); return self.d[k]
    def put(self, k, v):
        if k in self.d: self.d.move_to_end(k)
        self.d[k] = v
        if len(self.d) > self.cap: self.d.popitem(last=False)
```
</details>

**B9 · Rate limiter (sliding window)** *(backend Mid/Senior)*.
<details><summary>Đáp án</summary>

```python
from collections import deque
class RateLimiter:
    def __init__(self, max_calls, per): self.max=max_calls; self.per=per; self.calls=deque()
    def allow(self, now):
        while self.calls and now - self.calls[0] >= self.per: self.calls.popleft()
        if len(self.calls) < self.max: self.calls.append(now); return True
        return False
```
Follow-up: phân tán nhiều server → Redis (token bucket / sorted set).
</details>

**B10 · Take-home API** *(bài về nhà Mid điển hình)* — CRUD `products` FastAPI+SQLite. **Checklist điểm cao:** tách module (models/schemas/crud/main), validation Pydantic, status code đúng, test happy+error path, type hints, ruff/mypy sạch, README, git commit có ý nghĩa, bonus Dockerfile.

**B11 · Concurrency** *(phỏng vấn Mid)* — tải 50 URL, tối đa 5 đồng thời bằng `asyncio.Semaphore`. Lý do chọn asyncio: tải URL là I/O-bound.

### 🟠 Senior (CH 27-35)

**B12 · Find the bug** *(code review Senior)* — đọc-sửa-ghi `counter` không atomic → **race condition** (lost update). Sửa: `threading.Lock`. GIL không cứu thao tác nhiều bước.

**B13 · System Design — URL Shortener** *(vòng system design)* — 100M link, 10k redirect/s.
<details><summary>Khung trả lời</summary>

- **Sinh mã:** base62 của ID tự tăng hoặc hash + chống va chạm.
- **Lưu trữ:** key-value mã→URL, index, cân nhắc sharding.
- **Đọc >> ghi:** cache (Redis/CDN) mã hot, DB khi miss.
- **Scale:** service stateless + LB, read replica.
- **Đo lường:** đếm click bất đồng bộ (queue) để không chặn redirect.
- **Trade-off:** ID tăng dần (lộ thứ tự) vs hash (riêng tư, xử lý va chạm).
</details>

**B14 · Plugin/extensible system** *(OOP nâng cao Senior)* — xuất báo cáo nhiều định dạng, thêm mới không sửa code cũ → **Open/Closed + registry**.
<details><summary>Đáp án</summary>

```python
REGISTRY = {}
def register(name):
    def deco(cls): REGISTRY[name] = cls; return cls
    return deco
@register("csv")
class CsvExporter:
    def export(self, rows): return "\n".join(",".join(r) for r in rows)
def get_exporter(name): return REGISTRY[name]()
```
</details>

---

## 📝 ĐỀ THI CUỐI KHÓA

### 🔵 Đề Junior Python Developer

**Phần A — Coding online (45 phút):**
1. List số → list số chẵn, tăng dần, loại trùng.
2. Đếm ký tự, trả dict sắp theo tần suất giảm.
3. List dict nhân viên → lương TB theo phòng ban.

**Phần B — Hỏi miệng:** (1) list/tuple/set/dict khác nhau & khi nào dùng; (2) `is` vs `==`; (3) `"5" == 5` trả gì; (4) `if __name__ == "__main__"`.

**Phần C — Về nhà:** CLI đọc CSV đơn hàng, in tổng doanh thu + top 3 sản phẩm; dùng argparse, xử lý file thiếu, có test.

<details><summary>Đáp án A + thang điểm</summary>

```python
def chan_sap_xep(xs): return sorted({x for x in xs if x % 2 == 0})

from collections import Counter, defaultdict
def dem_ky_tu(s): return dict(Counter(s).most_common())
def luong_tb(nv):
    tong, dem = defaultdict(int), defaultdict(int)
    for p in nv: tong[p["phong"]] += p["luong"]; dem[p["phong"]] += 1
    return {k: tong[k]/dem[k] for k in tong}
```
**Đạt Junior:** ≥2/3 câu A, trả lời rõ B, bài C chạy + test + code sạch. **Đáp B:** (1) list sửa được/tuple cố định/set loại trùng O(1)/dict key→value; (2) `is`=danh tính, `==`=giá trị; (3) `False` (khác kiểu, không lỗi); (4) chỉ chạy khi file chạy trực tiếp.
</details>

### 🟣 Đề Mid Python Developer

**Phần A — Coding (60 phút):** (1) LRU Cache O(1) + giải thích độ phức tạp; (2) decorator `@timed_cache(seconds)` hết hạn sau N giây; (3) trung bình động trên luồng lớn — vì sao generator.

**Phần B — Hỏi sâu:** (1) GIL & threading/multiprocessing/asyncio; (2) decorator hoạt động & vì sao `functools.wraps`; (3) staticmethod vs classmethod vs method thường; (4) `__str__` vs `__repr__`.

**Phần C — Take-home (4-6h):** microservice Short URL FastAPI+SQLAlchemy, test ≥80% coverage, Dockerfile, README. Bonus: rate limiting, structured logging.

<details><summary>Đáp án A2 + chấm</summary>

```python
import functools, time
def timed_cache(seconds):
    def deco(func):
        store = {}
        @functools.wraps(func)
        def wrapper(*args):
            now = time.monotonic()
            if args in store and store[args][1] > now: return store[args][0]
            val = func(*args); store[args] = (val, now + seconds); return val
        return wrapper
    return deco
```
**Đáp B:** GIL=1 thread bytecode/lúc (threading vô dụng CPU-bound, dùng multiprocessing; asyncio cho I/O lượng lớn). `wraps` giữ `__name__`/`__doc__`. static không nhận self/cls, class nhận cls (factory), thường nhận self. `__repr__` cho dev, `__str__` cho user. **Đạt Mid:** code đúng + nói độ phức tạp; B chắc; C kiến trúc tách lớp, test thật, Docker.
</details>

### 🟠 Đề (Early) Senior Python Engineer

**Phần A — System Design (45 phút):** thiết kế hệ thống gửi 1 triệu thông báo/giờ (email+push): queue, worker scale, idempotency, retry/backoff, rate limit theo nhà cung cấp, giám sát, SPOF.

**Phần B — Code review:** tìm ≥4 vấn đề:
```python
def get_users(ids):
    for id in ids:
        u = db.execute(f"SELECT * FROM users WHERE id = {id}")  # (1)
def process(data=[]):                                            # (3)
    try: risky(data)
    except: pass                                                 # (4)
```

**Phần C — Chuyên sâu & lãnh đạo:** (1) quy trình tối ưu service chậm; (2) asyncio vs multiprocessing vs ThreadPoolExecutor + ví dụ; (3) thiết lập CI/CD cho team; (4) review hàm 200 dòng của junior thế nào.

<details><summary>Đáp án B + tiêu chí Senior</summary>

1. **(1) SQL Injection** (f-string vào SQL) → tham số hóa; đồng thời **N+1 query** → `WHERE id IN (...)`.
2. **(2)** không xử lý id thiếu; `id` trùng built-in.
3. **(3) Mutable default** `data=[]` → `data=None`.
4. **(4) Bare except + pass** nuốt mọi lỗi → bắt đúng loại, log lại.

**Đạt Early Senior:** Phần A có cấu trúc (queue+worker+idempotency+retry+observability) & nói được đánh đổi/SPOF; B tìm ≥4 lỗi và phân loại mức độ (bảo mật > đúng đắn > phong cách); C thể hiện "đo trước khi tối ưu", chọn concurrency đúng bản chất, và cách mentor/giao tiếp khi review.
</details>

> 💡 Nếu tự tin với đề tương ứng cấp độ → bạn đã sẵn sàng phỏng vấn vị trí đó. Ghi âm phần "nói" (design/review) và nghe lại — phỏng vấn Senior chấm cách lập luận nhiều như kết quả.

---

## 🃏 Flashcards ôn nhanh trước phỏng vấn

Câu hỏi bật nhanh hay gặp ở vòng hỏi miệng. Tự trả lời thành tiếng trước khi xem đáp án. (Bản HTML lật thẻ tương tác + lọc theo cấp độ.)

### 🟢 Newbie
| Câu hỏi | Đáp án |
|---|---|
| `list` vs `tuple`? | list mutable; tuple immutable, nhẹ hơn, làm key dict được |
| `is` vs `==`? | `==` so giá trị; `is` so danh tính (cùng object). `is` chỉ dùng với None/True/False |
| Giá trị "falsy"? | `0`, `0.0`, `""`, `[]`, `{}`, `()`, `set()`, `None`, `False` |
| `"5" + 3`? | TypeError — phải ép kiểu `int("5") + 3` |
| `7/2`, `7//2`, `7%2`? | `3.5`, `3`, `1` |
| `*args` / `**kwargs`? | gom tham số vị trí → tuple / keyword → dict |
| Khi nào dùng `set`? | loại trùng + kiểm tra tồn tại O(1); hợp/giao/hiệu `\| & -` |

### 🔵 Junior
| Câu hỏi | Đáp án |
|---|---|
| Shallow vs deep copy? | `a.copy()`/`a[:]` copy nông (object lồng dùng chung); `copy.deepcopy` copy sâu; `b=a` không copy |
| Bẫy mutable default? | `def f(x, acc=[])` chia sẻ list giữa các lần gọi → dùng `acc=None` |
| Vì sao set/dict tra cứu nhanh hơn list? | `in list` O(n) vs `in set/dict` O(1) nhờ hash table |
| `@property` để làm gì? | truy cập method như thuộc tính, kèm getter/setter logic |
| Thứ tự `try/except/else/finally`? | try → except (nếu lỗi) / else (nếu không) → finally luôn chạy cuối |
| List comp vs generator expr? | `[...]` tạo cả list trong RAM; `(...)` lười, sinh từng phần tử |
| EAFP? | "Cứ thử rồi bắt lỗi" — Pythonic hơn kiểm tra trước (LBYL) |

### 🟣 Mid
| Câu hỏi | Đáp án |
|---|---|
| GIL? | 1 thread chạy bytecode/lúc → threading vô dụng CPU-bound (dùng multiprocessing), tốt I/O |
| threading vs multiprocessing vs asyncio? | asyncio: I/O lượng lớn; multiprocessing: CPU-bound; threading: I/O đơn giản |
| Decorator + vì sao `functools.wraps`? | hàm bọc hàm; wraps giữ `__name__`/`__doc__` để introspection |
| `yield`? | biến hàm thành generator, sinh giá trị lười, tiết kiệm RAM |
| static vs class vs method thường? | thường nhận self; classmethod nhận cls (factory); static không nhận gì |
| `__str__` vs `__repr__`? | str cho user; repr cho dev (debug/log, lý tưởng tái tạo object) |
| Closure? | hàm con nhớ biến từ scope bao quanh — nền tảng decorator |
| Type hints kiểm tra runtime? | Không — chỉ chú thích; check bằng mypy/pyright (Pydantic là cơ chế khác) |
| Context manager / `with`? | dọn tài nguyên kể cả khi lỗi qua `__enter__`/`__exit__` |

### 🟠 Senior
| Câu hỏi | Đáp án |
|---|---|
| SOLID? | Single Responsibility · Open/Closed · Liskov · Interface Segregation · Dependency Inversion |
| N+1 query? | 1 query lấy N + N query phụ → dùng JOIN/`WHERE IN`/eager loading |
| Quy trình tối ưu service chậm? | mục tiêu đo được → profile → tối ưu thuật toán/cấu trúc → cache → song song. Đo, đừng đoán |
| `__slots__`? | bỏ `__dict__` mỗi instance → giảm RAM, truy cập nhanh (nhiều object) |
| Idempotency? | làm nhiều lần = một lần (không gửi mail/trừ tiền 2 lần) → retry an toàn, dùng idempotency key |

---

## 📊 Rubric chấm điểm chi tiết (3 đề thi)

Cách người phỏng vấn thật chấm. Dùng để tự đánh giá sau khi làm đề: cộng điểm theo trọng số, đối chiếu ngưỡng. Thang 100 điểm/đề. Chú ý **cờ đỏ** — có thể loại thẳng dù tổng điểm cao.

### 🔵 Junior Python Developer
| Tiêu chí | Tối đa | Mức "Đạt" |
|---|---|---|
| Tính đúng đắn (coding A) | 35 | ≥2/3 câu đúng cả test biên (rỗng, trùng, không nghiệm) |
| Idiom Python | 15 | comprehension, `dict.get`, `Counter/defaultdict`, f-string đúng chỗ |
| Chất lượng code | 15 | tên rõ, tách hàm, không lặp, không magic number |
| Hiểu khái niệm (B) | 20 | chắc mutable/immutable, `is` vs `==`; biết *vì sao* |
| Bài về nhà (C) | 15 | chạy được, argparse, xử lý lỗi file, ≥2 test, README |

**Dải điểm:** <50 Chưa đạt · 50-64 cần kèm cặp · **65-84 Đạt Junior** · ≥85 chạm Mid.
**⚑ Cờ đỏ:** không viết được vòng lặp/điều kiện không cần gợi ý; không phân biệt list & dict; code không chạy & không tự debug.

### 🟣 Mid Python Developer
| Tiêu chí | Tối đa | Mức "Đạt" |
|---|---|---|
| Thuật toán & độ phức tạp (A) | 25 | giải đúng + **nói được Big-O** & lý do chọn cấu trúc |
| Chiều sâu ngôn ngữ (B) | 20 | chắc GIL, decorator+wraps, generator, dunder |
| Kiến trúc take-home (C) | 25 | tách lớp, DI, validation, status code đúng |
| Testing & coverage | 15 | happy + error path, test có ý nghĩa |
| Tooling & vận hành | 10 | type hints, ruff/mypy sạch, Docker, README |
| Giao tiếp | 5 | trình bày đánh đổi mạch lạc, hỏi làm rõ yêu cầu |

**Dải điểm:** <55 Chưa đạt · 55-69 chưa tới Mid · **70-87 Đạt Mid** · ≥88 chạm Senior.
**⚑ Cờ đỏ:** không hiểu GIL/concurrency; gộp tất cả 1 file không test; lộ `f"...{var}"` trong SQL.

### 🟠 (Early) Senior Python Engineer
| Tiêu chí | Tối đa | Mức "Đạt" |
|---|---|---|
| System Design (A) | 30 | từ yêu cầu/ràng buộc; queue+worker+idempotency+retry+observability; chỉ ra SPOF & đánh đổi |
| Chiều sâu code review (B) | 20 | tìm ≥4 lỗi & **phân loại mức độ** (bảo mật > đúng đắn > phong cách) |
| Concurrency & performance | 15 | chọn đúng mô hình; "đo trước khi tối ưu"; hiểu trade-off |
| Kiến trúc & SOLID | 15 | áp dụng hợp lý, *không over-engineer* |
| Lãnh đạo & mentoring | 15 | review xây dựng, truyền đạt rõ, quyết định có lý do |
| Độ chín vận hành | 5 | logging có cấu trúc, CI/CD, monitoring |

**Dải điểm:** <60 Chưa đạt · 60-74 chưa tới Senior · **75-89 Đạt Early Senior** · ≥90 Senior vững.
**⚑ Cờ đỏ:** nhảy vào giải pháp không hỏi ràng buộc; bỏ qua lỗ hổng bảo mật khi review; thái độ review trịch thượng.

> **Lưu ý:** Cấp càng cao, điểm "cách lập luận" càng nặng hơn "đáp án đúng". Junior chấm chủ yếu correctness; Mid cân bằng correctness + thiết kế; Senior chấm chủ yếu tư duy hệ thống, đánh đổi & giao tiếp.

---

# 🤖 CHUYÊN ĐỀ DATA/AI & AGENTIC AI

Nhánh chuyên môn hóa sau khi vững Python nền tảng — cho hướng Data/AI Engineer hoặc xây sản phẩm AI.

## Chương 36: Data & Machine Learning nền tảng

Quy trình ML kinh điển: **thu thập → làm sạch (pandas) → chia train/val/test → huấn luyện → đánh giá → triển khai → giám sát**. 80% công việc nằm ở làm sạch & feature engineering.

| Khái niệm | Ý nghĩa |
|---|---|
| Supervised | học từ dữ liệu có nhãn (phân loại, hồi quy) |
| Unsupervised | tìm cấu trúc dữ liệu không nhãn (phân cụm) |
| Classification vs Regression | dự đoán nhãn rời rạc vs giá trị liên tục |
| Overfitting | thuộc lòng train, kém trên dữ liệu mới |
| Train/Val/Test | huấn luyện / tinh chỉnh / đánh giá cuối (không đụng test khi train) |

```python
# scikit-learn (chạy trên máy)
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=100); model.fit(X_train, y_train)
print(classification_report(y_test, model.predict(X_test)))
```

🎯 Hệ sinh thái: pandas/polars → scikit-learn → PyTorch → LLM/agents. Tránh data leakage, chọn metric đúng (accuracy vô nghĩa khi lệch lớp → precision/recall/F1), set seed, versioning (DVC/MLflow).

> **BT 36.1:** Vì sao accuracy gây hiểu lầm với dữ liệu lệch lớp? → đoán "luôn lớp đa số" đạt accuracy cao nhưng vô dụng; dùng precision/recall/F1/ROC-AUC.

---

## Chương 37: Agentic AI với Python 🤖

Xây **AI agent**: LLM tự suy luận, gọi công cụ, lặp nhiều bước để hoàn thành mục tiêu.

### Phân biệt 3 mức
| Mức | Mô tả |
|---|---|
| Chatbot | 1 lượt hỏi-đáp, không hành động |
| Workflow | chuỗi bước **cố định** do người thiết kế |
| **Agent** | LLM **tự quyết** bước kế, dùng tool, lặp tới khi xong |

Cốt lõi: **vòng lặp Quan sát → Suy luận → Hành động** (ReAct). LLM nhận mục tiêu + tools, quyết định gọi tool nào, đọc kết quả, lặp tới khi đủ thông tin trả lời.

```python
# Agent loop tối giản (mock LLM, không cần API) - minh họa pattern
def calculator(expr): return eval(expr, {"__builtins__": {}})
TOOLS = {"calculator": calculator}
def mock_llm(goal, scratch):
    if "result" not in scratch: return {"tool": "calculator", "input": goal}
    return {"tool": "final", "input": scratch["result"]}
def run_agent(goal, max_steps=5):
    scratch = {}
    for step in range(max_steps):           # GIỚI HẠN bước - chống lặp vô hạn
        d = mock_llm(goal, scratch)
        if d["tool"] == "final": return f"✅ {d['input']}"
        scratch["result"] = TOOLS[d["tool"]](d["input"])
    return "⚠ Hết bước"
print(run_agent("2 * (3 + 4)"))   # 14
```

```python
# Tool calling thật với Claude (pip install anthropic, cần API key)
import anthropic
client = anthropic.Anthropic()
tools = [{"name": "get_weather", "description": "Thời tiết theo thành phố",
          "input_schema": {"type": "object",
              "properties": {"city": {"type": "string"}}, "required": ["city"]}}]
messages = [{"role": "user", "content": "Thời tiết Hà Nội?"}]
while True:
    resp = client.messages.create(model="claude-sonnet-4-6", max_tokens=1024,
                                  tools=tools, messages=messages)
    if resp.stop_reason != "tool_use":
        print(resp.content[0].text); break          # LLM trả lời cuối
    messages.append({"role": "assistant", "content": resp.content})
    results = [{"type": "tool_result", "tool_use_id": b.id,
                "content": get_weather(**b.input)}
               for b in resp.content if b.type == "tool_use"]
    messages.append({"role": "user", "content": results})
```

Đây chính là **agent loop**: LLM → gọi tool → bạn chạy → trả kết quả → lặp tới khi `stop_reason != "tool_use"`. Mọi framework agent đều là biến thể của vòng lặp này.

### RAG — Retrieval Augmented Generation
Embed tài liệu riêng → vector DB → tìm đoạn liên quan → chèn vào prompt làm context.

| Phương án | Khi nào |
|---|---|
| Context dài | ít tài liệu, dùng 1 lần |
| RAG | kho lớn, cập nhật liên tục, cần trích nguồn |
| Fine-tuning | đổi phong cách/hành vi, không phải thêm kiến thức |

### Framework & chuẩn
| Công cụ | Vai trò |
|---|---|
| LangChain / LangGraph | orchestrate agent & workflow (LangGraph: agent đồ thị có trạng thái) |
| LlamaIndex | chuyên RAG & lập chỉ mục |
| Pydantic AI | agent type-safe, structured output |
| CrewAI / AutoGen | multi-agent phối hợp vai trò |
| Claude Agent SDK | xây agent dùng năng lực Claude (tool, file, MCP) |
| MCP | chuẩn mở kết nối agent ↔ tools/data ("USB-C cho AI") |
| Vector DB | Chroma, Qdrant, pgvector, Pinecone |

🚫 **Bẫy & rủi ro:** Hallucination (giảm bằng RAG có nguồn, structured output, eval); Prompt injection (coi dữ liệu ngoài là data không phải lệnh, giới hạn quyền tool, sandbox); vòng lặp vô hạn & chi phí (luôn `max_steps` + ngân sách token); tool nguy hiểm phải idempotent + human-in-the-loop.

🎯 **Production:** prompt caching (giảm chi phí), structured output (ép JSON schema), observability (LangSmith/tracing), eval (test cho output không deterministic), guardrails, fallback/retry, chọn model theo bài. *Bắt đầu từ workflow đơn giản nhất — chỉ dùng agent tự chủ khi thật sự cần.*

> **BT 37.1:** Thiết kế agent "trợ lý nghiên cứu". → tools `web_search`/`fetch_url`/`finish`; `max_steps`+budget chống lặp; chống hallucination bằng bắt buộc trích URL nguồn (structured output `{claim, source_url}`) + bước verify; coi nội dung web là data (chống prompt injection).
>
> **BT 37.2:** RAG vs fine-tune vs context dài — chọn khi nào? → context dài: tài liệu nhỏ dùng 1 lần; RAG: kho lớn cần nguồn; fine-tune: đổi phong cách/hành vi. Thử theo thứ tự tăng chi phí: prompt → RAG → fine-tune.

---

## 🃏 Flashcards Data/AI & Agentic AI

| Câu hỏi | Đáp án |
|---|---|
| Supervised vs Unsupervised? | có nhãn (phân loại/hồi quy) vs không nhãn (phân cụm) |
| Overfitting & chống? | thuộc lòng train, kém data mới → thêm data, regularization, CV, early stopping |
| Accuracy lệch lớp? | đoán "luôn đa số" cao giả tạo → precision/recall/F1/ROC-AUC |
| Agent vs chatbot/workflow? | agent LLM tự quyết bước & gọi tool, lặp; workflow bước cố định; chatbot 1 lượt |
| Tool calling? | khai báo schema → LLM trả tool call → bạn thực thi → trả kết quả → lặp |
| Vòng lặp ReAct? | Quan sát→Suy luận→Hành động→đọc kết quả→lặp; đặt max_steps + budget |
| RAG? | embed tài liệu → vector DB → tìm đoạn liên quan → chèn vào prompt |
| RAG vs fine-tune vs context? | context: nhỏ 1 lần; RAG: kho lớn cần nguồn; fine-tune: đổi hành vi |
| MCP? | chuẩn mở kết nối agent ↔ tools/data ("USB-C cho AI") |
| Prompt injection & phòng? | dữ liệu ngoài "ra lệnh" agent → coi là data, giới hạn quyền tool, sandbox, human-in-loop |

---

## 📖 Glossary thuật ngữ

| Thuật ngữ | Giải thích ngắn |
|---|---|
| **PEP 8** | Quy ước style chuẩn của Python |
| **Pythonic** | Viết đúng tinh thần & idiom Python |
| **Duck typing** | Quan tâm hành vi hơn kiểu cụ thể |
| **Mutable/Immutable** | Sửa được (list/dict/set) / không (int/str/tuple) |
| **Iterable/Iterator** | Duyệt được / object trả phần tử kế tiếp |
| **Generator** | Iterator tạo bằng `yield`, lười, tiết kiệm RAM |
| **Decorator** | Hàm bọc hàm khác, cú pháp `@` |
| **Closure** | Hàm "nhớ" biến từ phạm vi bao quanh |
| **GIL** | Chỉ 1 thread chạy bytecode tại một thời điểm (CPython) |
| **Coroutine** | Hàm `async def`, tạm dừng tại `await` |
| **Context manager** | Object dùng với `with`, tự dọn dẹp |
| **Dataclass** | Tự sinh `__init__/__repr__/__eq__` |
| **Pydantic** | Validate dữ liệu dựa type hints (nền FastAPI) |
| **ORM** | Thao tác DB qua object (SQLAlchemy) |
| **venv** | Môi trường Python cô lập theo dự án |
| **EAFP/LBYL** | Cứ-thử-rồi-bắt-lỗi / Kiểm-tra-trước |
| **Memoization** | Lưu kết quả hàm khỏi tính lại (`@lru_cache`) |
| **Magic/Dunder** | Method `__x__` định nghĩa hành vi đặc biệt |
| **WSGI/ASGI** | Giao diện web server ↔ app (ASGI hỗ trợ async) |

---

## 🔗 Tài nguyên & lộ trình tiếp theo

**Tài liệu:** [Python Official Tutorial](https://docs.python.org/3/tutorial/) · [Real Python](https://realpython.com) · sách *Fluent Python*, *Effective Python*, *Python Cookbook*.

**Chuyên sâu theo hướng:**
- **Backend:** Django REST / FastAPI nâng cao, Redis, Celery, Kafka
- **Data/AI:** pandas/polars, scikit-learn, PyTorch, MLOps
- **DevOps:** Docker, Kubernetes, Terraform, Ansible, Bash
- **Nền tảng CS:** thuật toán, cấu trúc dữ liệu, hệ thống phân tán

**Luyện tập:** LeetCode / HackerRank (thuật toán) · [Exercism Python](https://exercism.org/tracks/python) (có mentor) · đóng góp open-source · xây portfolio từ 4 project trong khóa.

> **Lời khuyên cuối:** Giỏi đến từ **viết code mỗi ngày**, đọc code người khác và **build dự án thật** — không phải xem hết video. Đọc → gõ lại → làm bài tập không nhìn đáp án → áp vào project. Chúc bạn tiến xa! 🐍🚀

---

*Khóa học thuộc bộ Studies · Bản HTML có chạy code trực tiếp & quiz tương tác: [khoa-hoc-python.html](khoa-hoc-python.html)*
