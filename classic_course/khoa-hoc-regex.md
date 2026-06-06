# Khóa Học Regex - Từ Căn Bản Đến Nâng Cao

> Nguồn: [khoa-hoc-regex.html](khoa-hoc-regex.html) — bản HTML có **Regex Playground** (kiểm thử trực tiếp, highlight match) và **bài tập tự chấm** (gõ pattern → máy chấm theo test case). Chạy offline bằng RegExp của trình duyệt.

---

## 📚 Tổng Quan

**Regex (Regular Expression)** là "ngôn ngữ mini" để **tìm, khớp, trích xuất, thay thế** văn bản theo mẫu. Khóa học từ con số 0 đến thành thạo, có công cụ thực hành ngay.

- **13 chương · 3 phần** (Căn bản → Trung cấp → Nâng cao)
- **Regex Playground** + **bài tập tại chỗ tự chấm** + thư viện pattern + cheatsheet
- Dùng cú pháp **JavaScript RegExp** (giống ~90% Python `re`, PCRE, grep); CH12 nói rõ khác biệt

**Cách học:** đọc lý thuyết → thử pattern trong Playground → làm bài tập (gõ pattern, máy chấm theo test case). Bản Markdown này có đáp án trong thẻ thu gọn.

---

# 🟢 PHẦN 1 — CĂN BẢN

## Chương 1: Regex là gì & hoạt động ra sao?

Regex là chuỗi mô tả **mẫu (pattern)**. "Bộ máy regex" quét chuỗi từ trái sang phải, thử khớp mẫu tại từng vị trí. Pattern `cat` tìm "cat" trong "the cat sat".

**Giải quyết:** tìm kiếm · validation (email/mật khẩu đúng định dạng?) · trích xuất (mọi ngày/link/hashtag) · thay thế (ẩn số thẻ, đổi định dạng).

Cách viết — JS: `/pattern/flags`; Python: `re.search(r"pattern", text)`.

## Chương 2: Ký tự thường & escape

Ký tự thường khớp chính nó. Các ký tự đặc biệt cần `\` để khớp nghĩa đen:
`. ^ $ * + ? ( ) [ ] { } | \ /`

| Pattern | Khớp |
|---|---|
| `.` | ký tự **bất kỳ** (trừ xuống dòng) |
| `\.` | dấu chấm nghĩa đen |
| `a\+b` | chuỗi "a+b" |

⚠️ `.` không phải "dấu chấm" — nó khớp **mọi ký tự**. Muốn khớp dấu chấm thật (file.txt) phải dùng `\.`.

> **BT 2.1:** Khớp đúng chuỗi `a.b` (dấu chấm nghĩa đen).
> <details><summary>Đáp án</summary> <code>a\.b</code> — viết <code>a.b</code> thì "axb" cũng khớp (sai). </details>

## Chương 3: Character class `[ ]`

| Pattern | Khớp một ký tự là |
|---|---|
| `[abc]` | a, b hoặc c |
| `[a-z]` | chữ thường bất kỳ |
| `[A-Za-z0-9]` | chữ hoặc số |
| `[^0-9]` | **KHÔNG** phải số |

**Lớp viết tắt:** `\d`=[0-9], `\w`=[A-Za-z0-9_], `\s`=khoảng trắng. Viết hoa = phủ định: `\D \W \S`.

✅ Bên trong `[ ]` đa số metacharacter mất nghĩa đặc biệt: `[.+]` khớp dấu chấm hoặc cộng (không cần escape).

> **BT 3.1:** Khớp đúng một nguyên âm thường. <details><summary>Đáp án</summary> <code>[aeiou]</code> </details>
>
> **BT 3.2:** Chuỗi chỉ gồm chữ/số/_ (≥1). <details><summary>Đáp án</summary> <code>\w+</code> </details>

## Chương 4: Lượng từ (Quantifiers)

| Lượng từ | Ý nghĩa | Ví dụ |
|---|---|---|
| `*` | 0+ | `ab*` = a, ab, abbb |
| `+` | 1+ | `\d+` = 5, 2024 |
| `?` | 0 hoặc 1 | `colou?r` = color, colour |
| `{3}` | đúng 3 | `\d{3}` |
| `{2,5}` | 2→5 lần | |
| `{2,}` | ≥2 lần | |

⚠️ `a*` khớp cả chuỗi rỗng (0 lần). Cần "ít nhất 1" → dùng `+`.

> **BT 4.1:** Chuỗi chỉ gồm chữ số (≥1). <details><summary>Đáp án</summary> <code>\d+</code> (không phải <code>\d*</code>) </details>
>
> **BT 4.2:** Ngày YYYY-MM-DD. <details><summary>Đáp án</summary> <code>\d{4}-\d{2}-\d{2}</code> </details>

## Chương 5: Neo & ranh giới (Anchors)

Anchor khớp **vị trí**, không khớp ký tự.

| Anchor | Vị trí |
|---|---|
| `^` | đầu chuỗi (đầu dòng nếu cờ `m`) |
| `$` | cuối chuỗi (cuối dòng nếu cờ `m`) |
| `\b` | ranh giới từ |
| `\B` | không phải ranh giới từ |

Để **validate cả chuỗi**, bọc `^...$`: `^\d+$` = "toàn bộ chuỗi chỉ gồm số". `\bcat\b` chỉ khớp từ "cat" độc lập (không khớp "category").

> **BT 5.1:** Dòng bắt đầu bằng "ERROR". <details><summary>Đáp án</summary> <code>^ERROR</code> </details>
>
> **BT 5.2:** Từ "cat" độc lập. <details><summary>Đáp án</summary> <code>\bcat\b</code> </details>

---

# 🟣 PHẦN 2 — TRUNG CẤP

## Chương 6: Nhóm `( )` & lựa chọn `|`

`( )` gom thành phần để áp lượng từ lên cả cụm + "bắt" (capture) phần khớp để trích/dùng lại.

| Pattern | Ý nghĩa |
|---|---|
| `(ab)+` | "ab" lặp 1+ lần |
| `(\d{4})-(\d{2})` | nhóm 1=năm, nhóm 2=tháng |
| `cat\|dog` | "cat" hoặc "dog" |
| `gr[ae]y` | gray hoặc grey |
| `(?:ab)+` | nhóm **không bắt** (chỉ gom) |

💡 Dùng `( )` khi cần **trích**; dùng `(?:...)` khi chỉ cần **gom nhóm** (không lưu).

> **BT 6.1:** Đúng một trong cat/dog/fish. <details><summary>Đáp án</summary> <code>cat|dog|fish</code> </details>
>
> **BT 6.2:** gray hoặc grey. <details><summary>Đáp án</summary> <code>gr[ae]y</code> </details>

## Chương 7: Nhóm có tên & Backreference

**Nhóm tên** — JS: `(?<y>\d{4})` → `m.groups.y`; Python: `(?P<y>\d{4})` → `m.group("y")`.

**Backreference** `\1` khớp **lại đúng nội dung** nhóm 1 đã bắt.

| Pattern | Khớp |
|---|---|
| `(\w+) \1` | từ lặp 2 lần: "the the" |
| `<(\w+)>.*</\1>` | cặp thẻ mở/đóng cùng tên |

> **BT 7.1:** Phát hiện từ lặp liền kề. <details><summary>Đáp án</summary> <code>\b(\w+)\s+\1\b</code> </details>

## Chương 8: Greedy vs Lazy

Mặc định lượng từ **tham lam** (ăn nhiều nhất). Thêm `?` để **lười**.

| Pattern | Trên `<a><b>` |
|---|---|
| `<.+>` (greedy) | `<a><b>` — ăn cả chuỗi! |
| `<.+?>` (lazy) | `<a>` rồi `<b>` |
| `<[^>]+>` (tốt nhất) | từng thẻ, không cần lazy |

🎯 Thường **không** nên dùng `.+?` mà dùng **lớp phủ định** `[^>]+` — rõ ràng hơn, nhanh hơn, tránh backtracking.

> **BT 8.1:** Khớp đúng một thẻ HTML, không nuốt nhiều thẻ. <details><summary>Đáp án</summary> <code>&lt;[^&gt;]+&gt;</code> </details>

## Chương 9: Cờ (Flags)

| Cờ | Tác dụng |
|---|---|
| `i` | không phân biệt hoa/thường |
| `g` | tìm tất cả |
| `m` | `^ $` theo mỗi dòng |
| `s` | `.` khớp cả `\n` |

⚠️ `m` KHÔNG làm `.` khớp xuống dòng (đó là `s`). `m` chỉ đổi nghĩa `^ $` sang đầu/cuối mỗi dòng. Python: `re.findall(pat, text, re.I | re.M)`.

---

# 🟠 PHẦN 3 — NÂNG CAO

## Chương 10: Lookaround

Kiểm tra điều kiện xung quanh mà **không tiêu thụ** ký tự.

| Cú pháp | Ý nghĩa |
|---|---|
| `(?=...)` | lookahead dương — theo sau phải là |
| `(?!...)` | lookahead âm — theo sau không là |
| `(?<=...)` | lookbehind dương — phía trước phải là |
| `(?<!...)` | lookbehind âm — phía trước không là |

Ví dụ: `\d+(?=px)` lấy số trước "px"; `(?<=\$)\d+` lấy số sau "$". Mật khẩu mạnh xếp chồng lookahead: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$`.

> **BT 10.1:** Số ngay trước "px". <details><summary>Đáp án</summary> <code>\d+(?=px)</code> </details>
>
> **BT 10.2:** Mật khẩu ≥8 ký tự, có thường + HOA + số. <details><summary>Đáp án</summary> <code>(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}</code> </details>

## Chương 11: Backtracking & ReDoS

Khi một nhánh không khớp, engine **lùi lại (backtrack)** thử cách khác. Pattern mơ hồ kiểu lượng từ lồng lượng từ → số cách thử bùng nổ.

🚫 **ReDoS:** `(a+)+$` gặp `"aaaa...a!"` thử hàng tỉ tổ hợp → treo CPU (Denial of Service). Lỗ hổng bảo mật thật.

**Viết an toàn:** tránh `(a+)+`, `(.*)*`; dùng lớp phủ định `[^"]*` thay `.*?`; neo `^ $` + giới hạn `{1,100}`; input không tin cậy → timeout/kiểm độ dài. *Quy tắc: một mẫu con chỉ nên khớp một chuỗi theo một cách duy nhất.*

> **BT 11.1:** Email đơn giản & an toàn (dùng lớp phủ định). <details><summary>Đáp án</summary> <code>[^@\s]+@[^@\s]+\.[^@\s]+</code> </details>

## Chương 12: Unicode & flavors

| Tính năng | JS | Python `re` |
|---|---|---|
| Nhóm tên | `(?<n>)` | `(?P<n>)` |
| Backref tên | `\k<n>` | `(?P=n)` |
| Unicode prop | `\p{...}` (cờ `u`) | module `regex` |

⚠️ `\w` trong JS mặc định không tính chữ có dấu (à, ê...). Khớp Unicode: cờ `u` + `\p{L}` (vd `/\p{L}+/u`). Python 3 thì `\w` đã hỗ trợ Unicode sẵn. Kiến thức cốt lõi giống ~90% giữa các flavor.

## Chương 13: Regex thực chiến

**Python:**
```python
import re
re.findall(r"[\w.]+@[\w.]+", text)   # tất cả email
re.search(r"\d{10}", text).group()    # khớp đầu tiên
re.sub(r"\d", "*", text)               # ẩn mọi số
pat = re.compile(r"\bERROR\b")        # compile để dùng lại
```
Luôn dùng raw string `r"..."`. `findall`/`search`/`match`/`sub`/`compile`.

**Terminal:**
```bash
grep -E "ERROR|WARN" app.log
grep -oE "[0-9]{4}-[0-9]{2}-[0-9]{2}" data.txt
sed -E "s/[0-9]+/#/g" file.txt
```

🚫 **KHÔNG dùng regex parse cấu trúc lồng nhau** (HTML/JSON/XML/code) — dùng parser chuyên dụng (BeautifulSoup, json, ast). Regex hợp cho: validate, trích token đơn giản, tìm/thay thế.

> **BT 13.1:** Tìm SĐT VN (0 hoặc +84, theo sau 9 số). <details><summary>Đáp án</summary> <code>(?:\+84|0)\d{9}</code> </details>

---

## 📋 Thư viện pattern thực dụng

| Mục đích | Pattern |
|---|---|
| Email (đơn giản) | `[^@\s]+@[^@\s]+\.[^@\s]+` |
| URL | `https?://[^\s]+` |
| SĐT Việt Nam | `(?:\+84\|0)\d{9}` |
| Ngày YYYY-MM-DD | `\d{4}-\d{2}-\d{2}` |
| Hashtag | `#\w+` |
| IPv4 (thô) | `\b\d{1,3}(\.\d{1,3}){3}\b` |
| Khoảng trắng thừa | `\s+` |

💡 Mẫu thô đủ cho tìm/lọc/dọn hằng ngày. Validate nghiêm ngặt (email RFC, IP 0-255) cần pattern phức tạp — cân nhắc thư viện chuyên dụng.

---

## 🏆 Thử thách tổng hợp

**TT1 · IPv4 hợp lệ** (mỗi octet 0-255).
<details><summary>Đáp án</summary>

```
(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}
```
</details>

**TT2 · Giờ 24h HH:MM** (00:00–23:59).
<details><summary>Đáp án</summary> <code>(?:[01]\d|2[0-3]):[0-5]\d</code> </details>

**TT3 · Username** 3-16 ký tự, chữ/số/_, bắt đầu bằng chữ cái.
<details><summary>Đáp án</summary> <code>[A-Za-z]\w{2,15}</code> </details>

---

## 📑 Cheatsheet

**Lớp ký tự:** `.` bất kỳ · `\d \D` · `\w \W` · `\s \S` · `[abc]` · `[^abc]` · `[a-z]`
**Lượng từ:** `*` 0+ · `+` 1+ · `?` 0/1 · `{3}` · `{2,5}` · `{2,}` · thêm `?` = lazy
**Neo:** `^` đầu · `$` cuối · `\b \B` ranh giới từ
**Nhóm:** `(...)` bắt · `(?:...)` không bắt · `(?<n>...)` có tên · `a|b` · `\1` backref
**Lookaround:** `(?=)` `(?!)` `(?<=)` `(?<!)`
**Cờ:** `i` hoa/thường · `g` tất cả · `m` mỗi dòng · `s` . khớp \n

> 🎯 Regex giỏi đến từ **nghịch nhiều**. Bắt đầu từ mẫu thô rồi siết dần bằng test case. Comment pattern phức tạp (Python: `re.VERBOSE`). *Regex dễ viết hơn đọc!*

---

*Khóa học thuộc bộ Studies · Bản HTML có Playground & bài tập tự chấm: [khoa-hoc-regex.html](khoa-hoc-regex.html)*
