# HK0 — MODULE PREP: KỸ THUẬT CƠ BẢN CHO AI ENGINEER

## Thông tin môn

- **Mã môn:** M0
- **Tên môn:** Kỹ thuật cơ bản cho AI
- **Icon:** ⚙️
- **Học kì:** 0 (HK0 — mở đầu)
- **Số tín chỉ:** 4 TC
- **Số buổi:** 16 buổi × 3 giờ (2 buổi/tuần)
- **Tiên quyết:** —
- **Đánh giá:** 15'×3 · 45' · GK · CK + Project

### 🎯 Mục tiêu môn

- Thao tác Linux/CLI thành thạo
- Git/GitHub PR workflow
- Python env/packaging + code quality
- Hiểu RAM/VRAM/GPU tránh OOM
- DSA thực dụng (Big-O, Hash Map, Queue)
- Networking/API/JSON + Docker cơ bản

### 🏆 Đầu ra

- Vibe code chuẩn công ty trước khi học AI
- Merge PR, viết test, format code
- Deploy mini-service với Docker
- Nền vững cho 12 môn sau

---

## Tuần 1: OS & Terminal Survival

### Buổi 1: 🖥️ Linux/OS & Terminal — Giao tiếp với "linh hồn" máy tính

**Mô tả:** Không có GUI bóng bẩy trên server AI. 99% production chạy Linux — màn hình đen chữ trắng. Buổi đầu HK0: làm quen terminal, các lệnh sinh tử, và tư duy "nối ống" (pipe) định hình mọi công việc AI sau này.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | Warm-up | Giới thiệu HK0 (16 buổi nền móng). Tại sao AI Engineer bắt buộc biết Linux — server GPU/cloud/Docker không có GUI. |
| 15-55 | Giảng | Cây thư mục Linux & dòng lệnh cốt lõi: cd, ls, pwd, mkdir, rm, cp, mv, cat, touch. Tuyệt đối vs tương đối. |
| 55-65 | ☕ Giải lao | Nghỉ 10'. |
| 65-110 | Giảng | Tam bảo sức mạnh: grep, pipe (|), redirect (> >>). Quan sát hệ thống: htop, ps, kill, df, du, nvidia-smi. |
| 110-155 | Thực hành | Bài tập lọc log server AI: đếm ERROR, top IP, trích dòng OOM. Trên Ubuntu/WSL thật. |
| 155-175 | Dặn dò | Tổng kết 3 ý. Giao 3 BTCN. Thông báo: B2 có KT15' về quyền file (chmod). |

#### Nội dung giảng chi tiết

##### Phần 1 — Vì sao AI Engineer phải biết Linux (15 phút)

99% dự án AI production chạy trên **Linux** — server GPU trong phòng máy, instance cloud (AWS EC2, GCP, Azure), container Docker, cả cluster Kubernetes. Không có thanh taskbar, không có cửa sổ kéo thả. Khi bạn `ssh` vào server train mô hình, chỉ có *màn hình đen chữ trắng*. Mọi thao tác — cài CUDA, start Jupyter, xem log, kill tiến trình treo — đều bằng dòng lệnh.

Hơn nữa, khi xây AI Agent tự động hoá (M6, M7), LLM không có chuột hay bàn phím — nó **tương tác với hệ thống qua chính các lệnh CLI** này. Một Agent "triệu tập" trình duyệt, soạn file, chạy test, deploy… tất cả qua terminal. Nếu không rành CLI, bạn không thể viết tool cho Agent, cũng không debug được khi Agent sai.

> 📌 **"Vibe code" công ty bắt đầu từ đây** — Senior gõ 5 lệnh xong việc trong 10 giây; người mới mở 5 cửa sổ GUI loay hoay 5 phút. Học CLI không phải để "ngầu" — nó là **đường ngắn nhất** giữa ý nghĩ và kết quả trên máy.

##### Phần 2 — Cây thư mục & dòng lệnh sinh tử (25 phút)

Linux tổ chức mọi thứ thành **một cây thư mục gốc `/`**, không có ổ C:/D: như Windows. Vài vị trí cần thuộc: `/home/<user>` (cá nhân, viết tắt `~`), `/etc` (cấu hình hệ thống), `/var/log` (log), `/usr/local` (phần mềm tự cài), `/tmp` (tạm, tự xoá). Vị trí hiện tại biết được bằng `pwd`.

Phân biệt **tuyệt đối** (bắt đầu `/`, ví dụ `/home/an/project`) và **tương đối** (so với hiện tại: `./project` cùng cấp, `../` lên một tầng). `cd -` quay lại thư mục trước — cực tiện khi nhảy qua lại.

```bash
# Vị trí & di chuyển
pwd                       # tôi đang ở đâu?
cd ~/projects/ai          # vào thư mục (tuyệt đối ~)
cd ../data                # lên 1 tầng rồi vào data
cd -                      # quay lại thư mục vừa rồi

# Liệt kê & tạo
ls -la                    # -l chi tiết, -a kẻ cả file ẩn
mkdir -p src/models       # -p tạo cả thư mục cha nếu thiếu
touch train.py            # tạo file rỗng / cập nhật mtime

# Sao chép / di chuyển / xoá
cp config.yaml config.bak     # copy
cp -r folder1 folder2         # -r: đệ quy (cho thư mục)
mv old.py new.py              # đổi tên / di chuyển
rm -rf .venv                  # XOÁ — cẩn thận! không có Thùng rác

# Xem nội dung
cat config.yaml           # in toàn bộ
head -n 20 bigfile.log    # 20 dòng đầu
tail -f app.log           # -f: theo dõi real-time
```

> 🚫 **rm -rf KHÔNG có Ctrl+Z** — `rm` xoá thẳng, không vào Thùng rác. `rm -rf /` xoá sạch máy. Khi dùng biến: `rm -rf $DIR/*` mà `$DIR` rỗng → thành `rm -rf /*`. **Luôn echo biến trước khi rm**, và tab-complete thay vì gõ tay đường dẫn dài.

##### Phần 3 — Tam bảo sức mạnh: grep, pipe, redirect (25 phút)

Ba công cụ biến terminal từ "máy gõ lệnh" thành **dòng xử lý dữ liệu**. `grep` lọc dòng khớp mẫu; **pipe** `|` nối stdout lệnh này thành stdin lệnh kia; **redirect** `>` ghi file (chép đè), `>>` nối tiếp. Kết hợp: bạn đếm, gom, sắp xếp text chỉ trong 1 dòng — đúng kiểu ETL thủ công mà AI Agent hay dùng.

Ví dụ kinh điển ops AI: file log vài GB, cần biết *có bao nhiêu lỗi*, *lỗi nào gặp nhiều nhất*, *5 phút cuối có OOM không*. Mở bằng editor thì treo; pipeline dưới đây xử lý trong vài giây vì mỗi lệnh đọc streaming, không load hết vào RAM.

```bash
# Đếm dòng có chữ "ERROR"
grep "ERROR" app.log | wc -l

# Top 5 loại lỗi gặp nhiều nhất
grep -oE "ERROR: \w+" app.log | sort | uniq -c | sort -rn | head -5

# Theo dõi log real-time, chỉ hiện OOM/CUDA
tail -f app.log | grep --line-buffered "OOM\|CUDA"

# Redirect: lưu kết quả ra file
grep "WARN" app.log > warnings.txt       # chép đè
date >> runlog.txt                       # nối tiếp
```

Cờ hay dùng: `grep -i` (không phân biệt hoa thường), `-v` (đảo), `-n` (số dòng), `-r` (đệ quy), `-E` (regex mở rộng). `uniq -c` đếm nhưng yêu cầu `sort` trước (chỉ gộp dòng liền kề giống nhau).

> 🎯 **Combo "5 sao" phân tích log** — Ghi nhớ: `grep` (lọc) → `sort` → `uniq -c` (gom đếm) → `sort -rn` (xếp) → `head` (top). Bát thuật giải 80% câu hỏi "thống kê nhanh" trên text — và là pattern AI Agent hay bắt chước khi viết shell tool.

##### Phần 4 — Quan sát & điều khiển hệ thống (10 phút)

Khi train mô hình, cần biết: GPU có chạy không, RAM còn bao nhiêu, tiến trình nào ăn RAM, kill cái treo. Vài lệnh tối thiểu phải thuộc:

| Lệnh | Tác dụng | Khi nào dùng |
|------|----------|--------------|
| `htop` / `top` | CPU/RAM theo tiến trình, real-time | Máy chậm, tìm thủ phạm ăn RAM |
| `nvidia-smi` | Trạng thái GPU: VRAM, % util, PID | Check GPU train không, OOM? |
| `ps aux \| grep python` | Liệt kê tiến trình python | Tìm PID để kill |
| `kill -9 <pid>` | Ép kill tiến trình | Train treo, giải phóng GPU |
| `df -h` | Dung lượng ổ đĩa | Trước khi tải dataset nặng |
| `du -sh *` | Kích thước từng thư mục con | Tìm folder ăn chỗ |
| `free -h` | RAM tổng/đã dùng/còn | Trước khi load data lớn |

> ⚠️ **Kill đúng tiến trình** — `kill -9` là SIGKILL — **giết ngay, không cho dọn dẹp**. Tiến trình Python đang ghi file có thể để file hỏng. Khi có thời gian, dùng `kill <pid>` (SIGTERM) trước; không nghe mới `-9`. Lấy PID GPU: cột PID trong `nvidia-smi`.

> 🎯 **Tổng kết buổi** — 3 ý: (1) Linux là sân production của AI — phải rành CLI; (2) cây thư mục + lệnh sinh tử (cd/ls/mkdir/rm/cat); (3) **grep + pipe + redirect** biến terminal thành công cụ xử lý dữ liệu. Combo mang đi: `grep … | sort | uniq -c | sort -rn | head`.

#### Thực hành trên lớp — Lọc log server AI

**Tình huống:** File `app.log` (giáo viên phát) là log server inference, dòng dạng: `2026-08-04 10:23:11 ERROR model_x OOM batch=64` hoặc `... INFO req ip=1.2.3.4 ms=120`. Viết pipeline trả lời 3 câu hỏi trong 15 phút.

```bash
# Q1: Có bao nhiêu dòng ERROR?
grep -c "ERROR" app.log

# Q2: Top 3 IP gửi request nhiều nhất?
grep -oE "ip=[0-9.]+" app.log | sort | uniq -c | sort -rn | head -3

# Q3: Dòng OOM nào có batch lớn nhất?
grep "OOM" app.log | grep -oE "batch=[0-9]+" | sort -t= -k2 -rn | head -1
```

#### Bài về nhà (BTCN)

1. **Cài môi trường:** Windows → bật WSL2 + Ubuntu; Mac/Linux → Terminal sẵn. Mở terminal, chụp `ls -la ~`.
2. **Tạo sandbox:** `mkdir -p ~/ai_sandbox/{data,src,logs}`, tạo 3 file .txt trong `data`; viết 1 pipeline đếm từ "CUDA" trong `logs/train.log` (tự tạo vài dòng có/chưa có chữ CUDA).
3. **Đọc trước** quyền file: `rwx`, user/group/other, ý nghĩa 3 số trong `chmod 755` — đầu B2 có **KT 15 phút**.

> 📢 **Thông báo** — Đầu **buổi 2**: **KT 15 phút** — quy tắc `rwx`, đổi quyền bằng `chmod` (symbolic `u+x` & octal `755`), đọc kết quả `ls -l`. Mang giấy.

---

### Buổi 2: 🔐 File System, Quyền hệ thống & Bash Scripting

**Mô tả:** chmod/chown, biến môi trường, .bashrc, và viết script tự động hoá — bộ kỹ năng "admin" giúp AI Engineer không chết yểu trên server.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | 📝 KT 15 PHÚT #1 | Quyền file & lệnh cơ bản B1. Phát đề, thu chấm, trả cuối buổi. |
| 15-55 | Giảng | Mô hình quyền Unix: user/group/other, rwx, đọc ls -l, chmod (symbolic & octal), chown. |
| 55-65 | ☕ Giải lao | Nghỉ 10'. |
| 65-110 | Giảng | Biến môi trường: export, PATH, .bashrc/.profile. Bash scripting cơ bản: shebang, biến, $1, if, for. |
| 110-155 | Thực hành | chmod file + set API_KEY vào .bashrc + viết script backup tự động. |
| 155-175 | Dặn dò | Trả KT. Giao 3 BTCN. Thông báo B4 có KT15' về Git. |

#### Nội dung giảng chi tiết

##### Phần 1 — Mô hình quyền Unix: ai được làm gì (25 phút)

Mọi file/thư mục trong Linux có **3 lớp người**: `user` (chủ sở hữu), `group` (nhóm), `other` (tất cả còn lại). Với mỗi lớp, có **3 quyền**: `r` (read), `w` (write), `x` (execute — với file là chạy, với thư mục là "được vào"). Lệnh `ls -l` hiện trạng thái này ở cột đầu tiên: `-rwxr-xr--`.

Đọc chuỗi đó: ký tự đầu `-` là file thường (`d` là thư mục); rồi 3 nhóm 3 ký tự cho *user* (`rwx`), *group* (`r-x`), *other* (`r--`). Nghĩa là: user được đọc/ghi/chạy, group được đọc/chạy (không ghi), other chỉ đọc. Đây là ngôn ngữ quyền của mọi hệ thống Unix — từ laptop đến supercomputer.

| ls -l | Loại | user | group | other |
|-------|------|------|-------|-------|
| `-rwxr-xr-x` | file | rwx | r-x | r-x |
| `-rw-r--r--` | file | rw | r | r |
| `drwxrwxr-x` | thư mục | rwx | rwx | r-x |
| `-rw-------` | file | rw | — | — |

**Đổi quyền — 2 cú pháp:** *symbolic* (dễ đọc) và *octal* (ngắn gọn, phổ biến). Octal mã hoá mỗi lớp bằng 1 số 0–7: r=4, w=2, x=1, cộng lại. `7=4+2+1=rwx`, `5=4+0+1=r-x`, `6=4+2+0=rw-`, `0=---`. Vậy `755` = rwx cho user, r-x cho group & other.

```bash
# Octal — phổ biến nhất
chmod 755 deploy.sh      # user=rwx, group/other=r-x
chmod 644 config.json    # user=rw, group/other=r (file config chuẩn)
chmod 600 id_rsa         # CHỈ user đọc/ghi — bắt buộc cho SSH key
chmod +x train.py        # thêm quyền chạy cho tất cả (= a+x)

# Symbolic — rõ ràng
chmod u+x script.sh      # user được execute
chmod g-w data.txt       # group mất write
chmod o-r secret.key     # other mất read
chmod a+r README.md      # all được read

# Đổi chủ sở hữu (cần sudo)
sudo chown an:staff file.log   # user=an, group=staff
chmod -R 755 project/          # -R: đệ quy cả thư mục
```

> 🚫 **SSH key PHẢI 600** — File private key `~/.ssh/id_rsa` bắt buộc `chmod 600`. Nếu 644 hay 755 → SSH từ chối với lỗi *"permissions too open"* — đây là lỗi #1 khi copy key sang máy mới. Lệnh sửa: `chmod 600 ~/.ssh/id_rsa`. Tương tự `~/.ssh` phải `700`.

##### Phần 2 — Biến môi trường & .bashrc (25 phút)

**Biến môi trường** (environment variable) là "biến toàn cục" mà mọi tiến trình con đều đọc được — đây là cách Python lấy API key, cách shell tìm được `python3`. Hai biến quan trọng nhất với AI Engineer: `PATH` (danh sách thư mục shell tìm lệnh) và các `API_KEY`/`DATABASE_URL` mang bí mật.

Phân biệt **tạm** (`export VAR=...` — mất khi đóng terminal) và **vĩnh viễn** (thêm dòng `export` vào `~/.bashrc` — shell nạp lại mỗi phiên). File `.bashrc` cũng là nơi định nghĩa alias (viết tắt lệnh), hàm, prompt — cá nhân hoá môi trường làm việc.

```bash
# Set tạm (chỉ phiên hiện tại)
export API_KEY="sk-abc123"
export PATH=$PATH:/usr/local/cuda/bin   # thêm thư mục vào PATH
echo $API_KEY                            # đọc giá trị ($ trước tên)

# Vĩnh viễn: thêm vào ~/.bashrc
echo 'export API_KEY="sk-abc123"' >> ~/.bashrc
source ~/.bashrc                         # nạp lại ngay (không cần mở terminal mới)

# Xem tất cả biến môi trường
env | grep API
printenv PATH

# Alias — viết tắt lệnh dài
echo 'alias ll="ls -lah"' >> ~/.bashrc
echo 'alias gs="git status"' >> ~/.bashrc

# Python đọc biến môi trường
python -c "import os; print(os.environ['API_KEY'])"
```

> ⚠️ **Không bao giờ hardcode key trong code** — Mọi API key, password, token → biến môi trường hoặc file `.env` (B6 học sâu hơn với python-dotenv). Hardcode rồi push lên Git = rò rỉ vĩnh viễn — Git lưu lịch sử, kẻ gian có history = có key. Liên hệ môn M9 (Security).

##### Phần 3 — Bash scripting: tự động hoá công việc lặp (20 phút)

Khi bạn gõ cùng 5 lệnh mỗi sáng (pull code, activate venv, export key, chạy train, push log), đã đến lúc viết **script**. File `.sh` chỉ là chuỗi lệnh shell, chạy tuần tự. Dòng đầu tiên `#!/bin/bash` (shebang) báo hệ thống dùng bash để diễn dịch. Cấp quyền chạy (`chmod +x`) rồi gọi `./script.sh` — hoặc `bash script.sh` không cần chmod.

Script nhận tham số qua `$1, $2, ...` (tham số dòng lệnh), `$@` (tất cả), `$#` (số lượng). Cấu trúc điều khiển: `if/then/fi`, `for var in ...; do ...; done`. Đây là xương sống của CI/CD và mọi workflow DevOps mà AI Agent thường tự sinh ra.

```bash
#!/bin/bash
# Backup thư mục model — chạy: ./backup.sh /path/to/models
# $1 = tham số thứ nhất (thư mục nguồn)

SRC="$1"
DEST="~/backups/backup-$(date +%Y%m%d).tar.gz"

if [ -z "$SRC" ]; then
  echo "❌ Thiếu thư mục nguồn. Dùng: ./backup.sh <dir>"
  exit 1
fi

echo "Đang nén $SRC → $DEST ..."
tar -czf "$DEST" -C "$SRC" .

# Duyệt qua từng file .pt và in kích thước
for f in "$SRC"/*.pt; do
  echo "$(du -h "$f" | cut -f1)  $(basename "$f")"
done

echo "✅ Xong. Backup tại: $DEST"
```

> 🎯 **Quy trình chạy script** — (1) Tạo `script.sh`; (2) `chmod +x script.sh`; (3) chạy `./script.sh tham_so`. Lỗi quen thuộc: *"permission denied"* → quên `chmod +x`. Lỗi *"$1: unbound variable"* → chạy thiếu tham số, nên luôn check `[ -z "$1" ]` trước.

> 🎯 **Tổng kết buổi** — 3 ý: (1) quyền Unix = 3 lớp × 3 quyền, octal (`755`) là ngôn ngữ de-facto; (2) env var + `.bashrc` = nơi chứa cấu hình & bí mật, không hardcode; (3) bash script tự động hoá việc lặp — AI Agent hay sinh ra đúng kiểu này. Nếu chỉ nhớ một số: **755 cho script, 600 cho key**.

#### Bài thực hành — chmod cho SSH key

Viết lệnh chmod cho file `~/.ssh/id_rsa` sao cho CHỈ user được đọc/ghi (rw), group & other không có quyền gì. Đáp án là số octal 3 chữ số.

**Lời giải:**
```bash
chmod 600 ~/.ssh/id_rsa    # 6=rw-, 0=---, 0=---
```

#### Bài về nhà (BTCN)

1. **Bài chmod:** Cho file `app.py` hiện `-rw-r--r--`. Viết 2 lệnh (octal & symbolic) để chuyển thành `-rwxr-xr-x`. Giải thích mỗi số.
2. **Bài env:** Set `HF_TOKEN="hf_xxx"` vĩnh viễn qua `.bashrc`, `source` lại, rồi viết 1 dòng Python in giá trị đó ra (dùng `os.environ`). Chụp kết quả.
3. **Bài script:** Viết `gitpull.sh` nhận 1 tham số là đường dẫn repo, vào repo đó, `git pull`, in ra 3 commit gần nhất (`git log --oneline -3`). `chmod +x` và chạy thử.

---

## Tuần 2: Git & Python Env

### Buổi 3: 🔀 Git Core & Tư duy lịch sử — "Save game" cho code

**Mô tả:** Không Git = không teamwork được. Mọi dòng code công ty đều qua Git. Buổi này học mô hình 3 vùng + dòng lệnh cốt lõi + .gitignore.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | Tra bài | Hỏi 3 câu: chmod octal 755 nghĩa gì? env var thay hardcode vì sao? shebang làm gì? |
| 15-55 | Giảng | Git là gì. Mô hình 3 vùng: Working dir ↔ Staging ↔ Repository. init/clone/add/commit/status/log. |
| 55-65 | ☕ Giải lao | Nghỉ 10'. |
| 65-110 | Giảng | Branch/checkout/merge. Remote: push/pull/fetch. .gitignore. Commit message chuẩn Conventional Commits. |
| 110-155 | Thực hành | Tạo repo "hello-git" trên máy, 5 commit có ý nghĩa, tạo branch feature, merge. |
| 155-175 | Dặn dò | Giao 3 BTCN. Chuẩn bị B4: PR workflow (có KT15'). |

#### Nội dung giảng chi tiết

##### Phần 1 — Git là "save game" có lịch sử (15 phút)

Vấn đề quen thuộc: `train_v1.py`, `train_v2_final.py`, `train_v2_FINAL_FINAL.py`… rồi một ngày code hỏng, không nhớ đổi gì. **Git** giải quyết: nó lưu *ảnh chụp* (snapshot) toàn bộ project tại mỗi commit, kèm thông điệp. Bất cứ lúc nào bạn có thể **quay lui** về thời điểm bất kỳ — như save game.

Quan trọng hơn, Git cho phép **nhiều người làm song song** trên cùng codebase mà không đè lên nhau: mỗi người nhánh (branch) riêng, sau đó gộp (merge). Đây là *xương sống* của mọi teamwork phần mềm. Không biết Git = không push code công ty, không review, không collaborate. 99% repo AI trên Hugging Face, GitHub, nội bộ công ty đều dùng Git.

> 📌 **Phân biệt Git vs GitHub** — **Git** là công cụ (chạy trên máy bạn, có/không có mạng đều dùng). **GitHub** là dịch vụ web *lưu trữ* repo Git + thêm tính năng (PR, issue, CI). Còn có GitLab, Bitbucket. Hôm nay học Git (công cụ); B4 học GitHub (workflow PR).

##### Phần 2 — Mô hình 3 vùng: hiểu được là dùng được (25 phút)

Sai lầm phổ biến nhất: gõ `git add . && git commit` như "voodoo" không hiểu. Hiểu **3 vùng** thì mọi lệnh Git sáng tỏ. Có 3 trạng thái file có thể nằm trong:

| Vùng | Tên | Ý nghĩa | Lệnh liên quan |
|------|-----|---------|----------------|
| 1 | Working directory | File trên đĩa bạn đang sửa | `git status` thấy "modified" |
| 2 | Staging area (index) | "Giỏ" chứa thay đổi sắp commit | `git add` để đưa vào |
| 3 | Repository (.git) | Lịch sử các commit đã chốt | `git commit` để đóng gói |

Luồng: bạn sửa file (Working) → `git add` đưa vào Staging → `git commit` chốt vào Repository. Tại sao tách 2 bước? Vì bạn có thể **chọn lọc**: sửa 3 file, add 2 file liên quan, commit chỉ 2 đó — commit gọn gàng theo chủ đề. `git add -p` (patch) còn cho phép chọn từng *khối* thay đổi trong 1 file.

```bash
# Khởi tạo repo (chỉ 1 lần đầu)
git init                          # tạo .git/ trong thư mục
git clone <url>                    # HOẶC tải repo có sẵn về

# Vòng lặp làm việc (lặp lại mỗi lần đổi code)
git status                        # xem file nào thay đổi (luôn mở terminal này!)
git add train.py                  # đưa 1 file vào staging
git add .                         # đưa tất cả thay đổi vào staging
git add -p                        # chọn từng khối (pro!)
git commit -m "feat: thêm lớp dropout"  # chốt commit + thông điệp

# Xem lại
git log --oneline --graph         # lịch sử dạng cây thu gọn
git diff                          # chưa add: hiện thay đổi Working
git diff --staged                 # đã add: hiện thay đổi Staging

# Đẩy/lấy từ remote (server GitHub)
git push origin main              # đẩy commit lên remote
git pull                          # kéo commit mới từ remote về
```

> ⚠️ **commit message là tài liệu** — Một commit tốt trả lời "thay đổi CÁI GÌ, VÌ SAO". `git commit -m "update"` là tội ác — 3 tháng sau không ai (kể cả bạn) biết "update" gì. Theo **Conventional Commits**: `feat:` tính năng mới, `fix:` sửa bug, `docs:` tài liệu, `refactor:` dọn code, `test:` thêm test, `chore:` việc vặt. Ví dụ tốt: `fix: xử lý OOM khi batch>32 trên GPU 8GB`.

##### Phần 3 — Branch: song song hoá công việc (20 phút)

**Branch** (nhánh) là "vũ trụ song song" — bạn rẽ nhánh từ main, thử nghiệm thoải mái (thêm feature, sửa bug) mà không đụng main. Xong thì **merge** quay lại. Đây là cách 10 người cùng code 1 project mà không giẫm chân. Branch rẻ — tạo/xoá bao nhiêu cũng được.

Workflow phổ biến: `main` luôn chạy được (production). Mỗi tính năng mới → branch riêng (`feature/login`), code & commit trên đó, xong merge về main. Lệnh `git checkout -b` tạo + chuyển trong 1 bước; `git switch` (Git 2.23+) là cú pháp hiện đại, an toàn hơn.

```bash
git branch                        # xem các branch, * là branch hiện tại
git branch feature/data-loader    # tạo branch (chưa chuyển)
git switch feature/data-loader    # chuyển sang branch đó
git checkout -b feature/x         # tạo + chuyển (cũ nhưng phổ biến)

# Code, commit nhiều lần trên feature/data-loader...

git switch main                   # quay về main
git merge feature/data-loader     # gộp nhánh feature vào main
git branch -d feature/data-loader # xoá branch đã merge
```

##### Phần 4 — .gitignore: không đẩy rác & bí mật (10 phút)

Không phải file nào cũng nên commit: `.env` (bí mật!), `__pycache__/` (cache tự sinh), `.venv/` (môi trường nặng), `data/` (dataset GB), `*.pt` (mô hình nặng), `.DS_Store` (rác Mac). File `.gitignore` liệt kê các mẫu *bỏ qua* — Git không theo dõi chúng.

```gitignore
# Bí mật — quan trọng nhất!
.env
.env.local
*.pem

# Python
__pycache__/
*.pyc
.venv/
venv/

# Dữ liệu & mô hình nặng
data/raw/
*.pt
*.ckpt
wandb/

# IDE & OS
.vscode/
.idea/
.DS_Store
Thumbs.db

# Notebook output (tuỳ chọn)
.ipynb_checkpoints/
```

> 🚫 **Đưa .env lên Git = rò rỉ vĩnh viễn** — Git **lưu lịch sử**: commit rồi xoá, history vẫn còn — kẻ gian clone repo cũ là có key. Lời nguyền thực tế: công ty mất API key OpenAI, bị quét sạch $50K trong đêm. **Quy tắc:** thêm `.env` vào `.gitignore` *NGAY* khi tạo repo, trước commit đầu tiên. Đã lỡ push? (1) đổi key ngay, (2) xoá khỏi history bằng `git filter-repo` hoặc BFG. Còn tốt hơn: dùng tool quét (git-secrets, gitleaks) trước khi push.

> 🎯 **Tổng kết buổi** — 4 ý: (1) Git = save game + lịch sử + teamwork; (2) **3 vùng** Working→Staging→Repo, hiểu là dùng được; (3) branch cho phép song song hoá; (4) `.gitignore` bảo vệ bí mật & giữ repo sạch. Nếu chỉ nhớ: `status → add → commit -m "feat: ..." → push`.

#### Thực hành trên lớp — Tạo repo "hello-git"

**Yêu cầu:** Trong 25 phút: tạo repo local, 5 commit có thông điệp chuẩn, tạo branch feature thêm 1 file, merge về main, xem log dạng cây.

```bash
mkdir hello-git && cd hello-git
git init
echo "# Hello Git" > README.md
echo ".env" >> .gitignore
git add .gitignore README.md
git commit -m "feat: khởi tạo project + gitignore"

echo "print('hi')" > main.py
git add main.py
git commit -m "feat: thêm main.py hello world"

git switch -c feature/readme-images
echo "![demo](demo.png)" >> README.md
git add README.md
git commit -m "docs: thêm ảnh demo vào README"
git switch main
git merge feature/readme-images
git log --oneline --graph --all
```

#### Bài về nhà (BTCN)

1. **Bài 3 vùng:** Giải thích bằng lời riêng: sau `git add file.py` nhưng CHƯA commit, file nằm ở vùng nào? Nếu giờ sửa thêm file.py, `git status` hiện gì?
2. **Bài repo cá nhân:** Tạo repo `ai-notes` trên GitHub (public), clone về, thêm 1 file `notes.md`, 3 commit chuẩn Conventional Commits, push lên. Dán link repo vào bài nộp.
3. **Bài branch:** Trong repo trên, tạo branch `feature/week1`, thêm nội dung, merge vào main, xoá branch. `git log --graph` chụp lại.

---

### Buổi 4: 🐙 GitHub Flow, Pull Request & Merge Conflict

**Mô tả:** Workflow chuẩn công ty: feature branch → Pull Request → code review → merge. Xử lý conflict bằng VSCode — kỹ năng sống còn khi làm nhóm.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | 📝 KT 15 PHÚT #2 | Git cơ bản (3 vùng, add/commit/branch). Phát đề, thu chấm. |
| 15-55 | Giảng | GitHub Flow: branch → commit → push → PR → review → merge. Vì sao không code trực tiếp trên main. |
| 55-65 | ☕ Giải lao | Nghỉ 10'. |
| 65-110 | Giảng | Merge conflict: vì sao xảy ra, xử lý bằng VSCode 3-click, commit merge. Pull thường để tránh conflict. |
| 110-155 | Thực hành | Tạo PR thật lên repo chung lớp, review chéo 2 bạn, xử lý 1 conflict cố ý. |
| 155-175 | Dặn dò | Trả KT. Giao 3 BTCN. Chuẩn bị B5: Python env. |

#### Nội dung giảng chi tiết

##### Phần 1 — GitHub Flow: workflow chuẩn công ty (25 phút)

Ở công ty, **không ai code trực tiếp trên `main`**. Branch `main` phải luôn chạy được — là "sự thật" production. Mọi thay đổi đi qua **Pull Request** (PR): một "yêu cầu gộp" branch feature vào main, kèm mô tả thay đổi, được **đồng nghiệp review** trước khi merge. Đây gọi là **GitHub Flow**, workflow phổ biến nhất ngành.

Tại sao quan trọng? Review bắt lỗi sớm (trước khi vào production), lan truyền kiến thức (reviewer học từ code của bạn), và để lại *dấu vết* (ai đổi gì, vì sao, khi nào). Một PR tốt có: tiêu đề rõ (`feat: thêm data loader cho JSONL`), mô tả "thay đổi GÌ, VÌ SAO, cách test", và review tận tâm (không "LGTM" blind).

```bash
# 1. Cập nhật main mới nhất
git switch main
git pull origin main

# 2. Tạo branch feature từ main
git switch -c feature/jsonl-loader

# 3. Code, commit nhiều lần trên branch
# ...sửa file...
git add .
git commit -m "feat: thêm hàm read_jsonl()"

# 4. Push branch lên remote
git push -u origin feature/jsonl-loader

# 5. Mở trình duyệt → GitHub → "Compare & pull request"
#    Viết tiêu đề + mô tả → Create pull request

# 6. Đồng nghiệp review → comment → bạn sửa → push thêm
#    (code edit, commit, push lại — PR tự cập nhật)

# 7. Reviewer approve → Merge (trên GitHub)
# 8. Về máy: pull main + xoá branch cũ
git switch main && git pull
git branch -d feature/jsonl-loader
```

> 📌 **Cờ -u khi push lần đầu** — `git push -u origin feature/x` — cờ `-u` (set-upstream) "kết nối" branch local với remote. Lần sau chỉ cần `git push` (ngắn gọn). Quên `-u` → Git báo "no upstream branch" và chỉ cách fix.

##### Phần 2 — Code review: đọc code như đánh giá rượu (15 phút)

Review không phải bắt bẻ — là hợp tác nâng chất code. Người review kiểm: **logic đúng không**, **edge case** (input rỗng, file thiếu), **đặt tên** rõ, **test** đủ, **an toàn** (key hardcode?). Comment theo nguyên tắc: khen cái tốt, góp ý cụ thể (*"ở đây nếu list rỗng thì sao?"*), tách *blocking* (phải sửa) với *nitpick* (tuỳ).

Người được review: **đừng phòng thủ**. Comment "tại sao lại thế" thường là tín hiệu đặt tên/comment chưa rõ — sửa thay than vãn. Trả lời từng comment, "resolve" khi xong. Đây là nơi kỹ năng trưởng thành nhanh nhất: đọc code người khác = học pattern mới mỗi ngày.

| Loại comment | Ví dụ | Mức ưu tiên |
|--------------|-------|-------------|
| Blocking (bug) | "Nếu file rỗng → crash, cần check" | Phải sửa |
| Suggestion | "Dùng dict.get(k, default) gọn hơn" | Nên sửa |
| Question | "Tại sao chọn lr=0.01?" | Giải thích |
| Nitpick | "thiếu dấu cách sau #" | Tuỳ |
| Praise | "Cách xử lý OOM hay!" | Khích lệ |

##### Phần 3 — Merge Conflict: đừng sợ, hiểu là dễ (25 phút)

**Conflict** xảy ra khi 2 nhánh sửa *cùng dòng* (hoặc gần nhau) của cùng file — Git không tự quyết định lấy bên nào. May thay, conflict **hiếm** nếu team chia file rõ và pull thường; và khi xảy ra, **VSCode giải quyết trong 30 giây**.

Trông conflict thế nào? Git chèn marker vào file: `<<<<<<<` (đầu), `=======` (ngăn), `>>>>>>>` (cuối). Phần trên là "đầu vào 1" (thường branch hiện tại), phần dưới là "đầu vào 2" (nhánh gộp). Bạn chọn giữ cái nào (hoặc kết hợp), xoá marker, lưu.

```text
def learning_rate():
<<<<<<< HEAD
    return 0.01          # bên main (HEAD)
=======
    return 0.001         # bên feature/jsonl-loader
>>>>>>> feature/jsonl-loader
```

VSCode tô màu conflict và hiện **4 nút** phía trên mỗi khối: `Accept Current` (giữ HEAD), `Accept Incoming` (giữ feature), `Accept Both` (ghép cả), `Compare` (xem chi tiết). Click → sửa tay nếu cần → lưu → `git add` file → `git commit` (hoặc `git merge --continue`).

> 🎯 **Quy trình xử lý conflict 5 bước** — (1) `git status` xem file nào conflict; (2) mở file trong VSCode, tìm marker `<<<<<<<`; (3) click Accept hoặc sửa tay, **xoá hết marker**; (4) chạy/test xem code còn đúng; (5) `git add file` rồi `git commit`. Nếu hoảng: `git merge --abort` quay lại trạng thái trước merge.

> ⚠️ **Phòng hơn chữa** — Conflict ít khi xảy ra nếu: (a) `git pull` thường xuyên (đừng để branch lệch xa main hàng tuần); (b) team chia file/module rõ, ít đụng cùng file; (c) commit nhỏ, thường xuyên. Khi bắt đầu 1 feature, luôn `git pull origin main` trước rồi mới tạo branch.

> 🎯 **Tổng kết buổi** — 3 ý: (1) **GitHub Flow** = branch → PR → review → merge, không code trên main; (2) review là hợp tác, dùng loại comment đúng mức; (3) conflict hiểu là dễ — VSCode 4 nút giải trong 30 giây, phòng bằng pull thường. Nếu chỉ nhớ: **pull trước, branch riêng, PR có mô tả**.

#### Bài thực hành — GitHub Flow 4 lệnh

Viết 4 lệnh Git: (1) tạo+chuyển branch `feature/x`, (2) stage tất cả, (3) commit "feat: add model", (4) push branch lên origin (lần đầu, có set upstream).

**Lời giải:**
```bash
git switch -c feature/x       # hoặc: git checkout -b feature/x
git add .
git commit -m "feat: add model"
git push -u origin feature/x
```

#### Bài về nhà (BTCN)

1. **Bài PR:** Trên repo `ai-notes` (B3), tạo branch `feature/tuan-2`, thêm file note tuần 2, push, mở PR trên GitHub với mô tả đầy đủ (thay đổi gì / vì sao / cách test). Dán link PR.
2. **Bài review:** Review PR của 2 bạn cùng lớp — mỗi PR ít nhất 2 comment cụ thể (1 suggestion + 1 praise/question). Chụp lại.
3. **Bài conflict:** (Có hướng dẫn video) Tạo repo test, tạo branch A sửa dòng 5 file `x.py`, trên main cũng sửa dòng 5 khác, merge A → conflict. Dùng VSCode giải, chụp 3 trạng thái: conflict / Accept Both / sau commit merge.

> 📢 **Thông báo** — Đầu **buổi 5** *không* có KT15' (B4 là đợt KT cuối HK0-phase-1). Nhưng giáo viên sẽ **ngẫu nhiên gọi 2 bạn lên bảng** thực hiện GitHub Flow 4 lệnh + giải 1 conflict mẫu. Chuẩn bị kỹ bài 3.

---

## Tuần 3: Python & File I/O

### Buổi 5: 🐍 Môi trường Python — Venv vs Conda & Packaging

**Mô tả:** Mỗi project 1 môi trường riêng. venv/conda tách thư viện, pip pin phiên bản, requirements.txt/pyproject.toml — bộ kỹ năng để code "chạy máy tôi, chạy máy bạn".

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | Tra bài | Hỏi: vì sao không code trên main? Conflict xảy ra khi nào? |
| 15-55 | Giảng | Vấn đề dependency hell. venv: tạo/kích hoạt/cài. requirements.txt & pip freeze. Version pinning. |
| 55-65 | ☕ Giải lao | Nghỉ 10'. |
| 65-110 | Giảng | Conda vs venv: khi nào dùng cái nào. pyproject.toml & moderne packaging. Virtual env best practice. |
| 110-155 | Thực hành | Tạo venv cho project, cài pandas+numpy, freeze; rồi tạo env conda khác. |
| 155-175 | Dặn dò | Giao 3 BTCN. Chuẩn bị B6: File I/O & bảo mật env. |

#### Nội dung giảng chi tiết

##### Phần 1 — Dependency hell & vì sao cần môi trường ảo (15 phút)

Tình huống quen thuộc: project A cần TensorFlow 2.10, project B cần PyTorch + numpy mới nhất. Cài chung trên 1 Python hệ thống → xung đột, nâng cấp cái này hỏng cái kia. Đây gọi là **dependency hell**. Giải pháp: mỗi project có **môi trường ảo** (virtual environment) riêng — thư mục chứa Python + bộ thư viện riêng, hoàn toàn cô lập.

Môi trường ảo cho phép: chạy nhiều project với thư viện khác nhau trên cùng máy; pin chính xác phiên bản (code chạy giống mọi nơi); xoá sạch chỉ bằng xoá thư mục (không để lại rác hệ thống); chia sẻ qua 1 file (`requirements.txt`) để đồng đội cài lại y hệt. Đây là **thói quen đầu tiên** của Python developer chuyên nghiệp — luôn khởi động project bằng tạo env.

> 🚫 **Tội ác #1: pip install vào Python hệ thống** — Cài `pip install pandas` khi chưa activate env → cài vào Python toàn máy. Hệ quả: dần dần conflict, nâng cấp hỏng tool hệ thống (Ubuntu dùng Python cho apt!). **Luôn activate venv trước khi pip install.** Dấu hiệu: tên env hiện ở đầu prompt (`(.venv) user@host:~$`).

##### Phần 2 — venv + pip + requirements.txt (25 phút)

**venv** là công cụ tạo môi trường ảo *có sẵn* trong Python (module `venv` từ Python 3.3). Nhẹ, nhanh, chuẩn — đây là lựa chọn mặc định cho 90% project Python. Lệnh: tạo env `python -m venv .venv`, kích hoạt (*Linux/Mac* `source .venv/bin/activate`, *Windows* `.venv\Scripts\activate`), thoát `deactivate`.

**pip** là trình cài package từ PyPI (kho 500K+ thư viện). **requirements.txt** liệt kê thư viện + phiên bản — file này là "công thức" để dựng lại môi trường. Lệnh: `pip install pandas` (cài 1), `pip install -r requirements.txt` (cài theo file), `pip freeze > requirements.txt` (xuất hiện tại ra file).

```bash
# 1. Tạo môi trường ảo (1 lần/project)
python -m venv .venv

# 2. Kích hoạt
source .venv/bin/activate        # Linux/Mac
.venv\Scripts\activate           # Windows (Git Bash / cmd / PowerShell)

# 3. (đã activate) Cài thư viện
pip install pandas numpy scikit-learn matplotlib
pip install torch                # heavy — xem CPU/GPU version tại pytorch.org

# 4. Xuất "công thức" môi trường
pip freeze > requirements.txt

# 5. Đồng đội clone repo → dựng lại y hệt
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# 6. Thoát môi trường
deactivate
```

```text
# Pin phiên bản chính xác — code chạy giống mọi máy
pandas==2.1.4
numpy==1.26.2
scikit-learn==1.3.2
matplotlib==3.8.2
torch==2.1.0

# Hoặc chỉ cho phép patch cập nhật (an toàn hơn)
# pandas~=2.1.0   ← cho phép 2.1.x, không nhảy 2.2
```

> ⚠️ **Version pinning là bắt buộc** — Không pin (`pandas` không phiên bản) → 6 tháng sau cài lại được pandas 3.0, API đổi, code hỏng, không biết tại sao. Luôn pin (`pandas==2.1.4`) trong `requirements.txt` production. Lời nguyền "works on my machine" xuất phát từ đây.

##### Phần 3 — Conda vs venv: chọn cái nào (20 phút)

**Conda** là bộ quản lý môi trường + package khác, phổ biến trong giới AI/khoa học dữ liệu vì: cài được cả thư viện *non-Python* (CUDA toolkit, R, GCC); có sẵn trong distribution Anaconda/Miniconda; quản lý phiên bản Python luôn (venv dùng Python của máy). Phù hợp khi cần stack khoa học nặng.

Nhưng conda **nặng hơn** (env vài GB), chậm hơn khi giải dependency, và license Anaconda có rắc rối thương mại (nên dùng **Miniconda** + channel conda-forge). Quy tắc chọn: **web/API/data nhỏ** → venv + pip; **deep learning nặng, cần CUDA/công cụ C** → conda (hoặc venv + pip cũng được, PyTorch hỗ trợ tốt cả hai ngày nay).

| Tiêu chí | venv + pip | conda |
|----------|-----------|-------|
| Có sẵn trong Python? | Có (module venv) | Không (cài riêng) |
| Kích thước env | Nhẹ (~10-100MB) | Nặng (~500MB-GB) |
| Quản lý phiên bản Python | Dùng Python máy | Tự cài Python riêng |
| Cài non-Python (CUDA, R) | Không | Có |
| License | Miễn phí | Anaconda thương mại — dùng Miniconda |
| Phù hợp | Web, API, data nhỏ | Deep learning, khoa học nặng |

```bash
conda create -n dl python=3.11      # tạo env "dl" với Python 3.11
conda activate dl                   # kích hoạt
conda install pytorch torchvision -c pytorch   # cài từ channel pytorch
conda env export > environment.yml  # xuất công thức (tương đương freeze)
conda env create -f environment.yml # dựng lại
conda deactivate                    # thoát
conda env remove -n dl              # xoá env
```

##### Phần 4 — pyproject.toml: packaging moderne (10 phút)

`requirements.txt` đơn giản nhưng giới hạn. **pyproject.toml** là chuẩn hiện đại (PEP 517/518) — 1 file khai báo *tất cả*: metadata project, dependency, dev-dependency, cấu hình tool (ruff/black/pytest). Khi bạn muốn đóng gói thư viện publish lên PyPI, `pyproject.toml` là bắt buộc.

```toml
[project]
name = "my-ai-tool"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = [
    "pandas>=2.0,<3.0",
    "numpy>=1.24",
    "scikit-learn>=1.3",
]

[project.optional-dependencies]
dev = ["pytest>=7.0", "ruff>=0.1"]
gpu = ["torch>=2.1"]

[tool.ruff]
line-length = 100

[tool.pytest.ini_options]
testpaths = ["tests"]
```

Cài dev-dependency: `pip install -e ".[dev]"` (cờ `-e` = editable, sửa code là có hiệu lực). Tool quản lý moderne: **uv** (siêu nhanh, Rust-based, đang lên), **poetry**, **pip-tools**. Bạn không cần học hết — biết `venv + pip + requirements.txt` là đủ bắt đầu; `pyproject.toml` khi publish thư viện.

> 🎯 **Best practice 4 ý** — (1) `.venv/` luôn nằm trong `.gitignore` — không commit env; (2) commit `requirements.txt`/`environment.yml`; (3) 1 project = 1 env, đỡ nhầm; (4) ghi README hướng dẫn dựng env (`python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`).

> 🎯 **Tổng kết buổi** — 3 ý: (1) môi trường ảo cô lập dependency — **luôn activate trước khi pip install**; (2) `requirements.txt` pin phiên bản = code chạy giống mọi máy; (3) venv cho 90% project, conda cho DL nặng; `pyproject.toml` khi publish. Nếu chỉ nhớ: `python -m venv .venv → activate → pip install → pip freeze`.

#### Thực hành trên lớp — Setup 2 môi trường

**Yêu cầu:** Trong 30 phút: (1) tạo venv `.venv`, cài pandas+numpy, chạy `import pandas; print(pandas.__version__)`, freeze ra `requirements.txt`; (2) tạo conda env `test-conda` Python 3.11, cài matplotlib, chạy script vẽ 1 đường cong, export `environment.yml`.

```bash
# Part 1: venv
mkdir env-lab && cd env-lab
python -m venv .venv
source .venv/bin/activate            # Windows: .venv\Scripts\activate
pip install pandas numpy
python -c "import pandas; print(pandas.__version__)"
pip freeze > requirements.txt
deactivate

# Part 2: conda
conda create -n test-conda python=3.11 -y
conda activate test-conda
conda install matplotlib -y
python -c "import matplotlib.pyplot as plt; plt.plot([1,2,3]); plt.savefig('t.png')"
conda env export > environment.yml
```

#### Bài về nhà (BTCN)

1. **Bài setup:** Tạo repo `my-first-ai`, tạo venv, cài `pandas numpy scikit-learn`, viết `main.py` load 1 CSV nhỏ (tự tạo) và in `df.shape`. Freeze `requirements.txt`, commit (kèm `.gitignore` bỏ `.venv/`).
2. **Bài reproducbility:** Xoá `.venv` đi, tạo lại từ `requirements.txt` (`python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`), chạy lại `main.py`. Chụp 2 lần chạy cho version giống nhau.
3. **Bài chọn env:** Viết 1 đoạn (5-7 dòng) trình bày: cho project AI cần PyTorch + CUDA 12 + dataset 50GB, bạn chọn venv hay conda? Vì sao? Nêu 1 trade-off.

---

### Buổi 6: 📂 File I/O & Bảo mật biến môi trường

**Mô tả:** Đọc/ghi JSON, CSV, TXT an toàn bằng `with open`; giấu API key khỏi code bằng `python-dotenv` & `.env`. Hai kỹ năng "vibe" mà mọi pipeline AI đều dùng.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | Tra bài | Hỏi: vì sao phải pin phiên bản? venv vs conda khác gì? Vì sao .venv trong .gitignore? |
| 15-55 | Giảng | File I/O: with open, mode r/w/a, encoding utf-8. Đọc/ghi TXT, JSON (json.load/dump), CSV (module csv, pandas 1 dòng). |
| 55-65 | ☕ Giải lao | Nghỉ 10'. |
| 65-110 | Giảng | Bảo mật: hardcode key là tội; .env + python-dotenv; os.environ; .gitignore; luật 12-factor. |
| 110-155 | Thực hành | Bóc tách file JSON config + giấu OpenAI key vào .env + đọc từ Python. |
| 155-175 | Dặn dò | Giao 3 BTCN. Chuẩn bị B7: Computer Architecture. |

#### Nội dung giảng chi tiết

##### Phần 1 — File I/O với `with open` (25 phút)

Đọc/ghi file là thao tác cơ bản nhất: load dataset, đọc config, ghi log, lưu kết quả. Python dùng hàm `open()` với các chế độ: `"r"` (read), `"w"` (write, chép đè), `"a"` (append, nối tiếp), `"b"` (binary — cho file không phải text như ảnh/mô hình). Quy tắc **bắt buộc**: luôn dùng cú pháp `with open(...) as f:` — nó tự đóng file dù có lỗi, tránh rò rỉ tài nguyên.

Tại sao quan trọng? Quên `f.close()` → file bị "khoá", tiến trình khác không ghi được, leak descriptor (mở quá nhiều file → lỗi `Too many open files`). `with` giải quyết: khi thoát khối (kể cả do exception), Python tự gọi `close()`. Đây là pattern **context manager** — bạn sẽ gặp lại với `torch.no_grad()`, `matplotlib`... trong các môn AI.

```python
# ĐỌC file text
with open("data.txt", "r", encoding="utf-8") as f:
    text = f.read()           # toàn bộ về 1 string
    lines = f.readlines()     # list các dòng (có \n)

# Đọc từng dòng tiết kiệm RAM (file lớn)
with open("big.log", encoding="utf-8") as f:
    for line in f:                # streaming, không load hết
        if "ERROR" in line:
            process(line)

# GHI file
with open("out.txt", "w", encoding="utf-8") as f:
    f.write("kết quả\n")     # "w" chép đè

with open("log.txt", "a", encoding="utf-8") as f:
    f.write("dòng mới\n")    # "a" nối tiếp (cho log!)
```

> ⚠️ **Luôn khai báo encoding** — Mặc định `open()` dùng encoding hệ thống — Windows thường `cp1252`, Mac/Linux `utf-8`. Đọc file UTF-8 trên Windows mà không khai báo → `UnicodeDecodeError` với tiếng Việt/emoji. **Luôn ghi `encoding="utf-8"`** khi mở file text — thói quen này tiết kiệm hàng giờ debug.

##### Phần 2 — JSON & CSV: định dạng của dữ liệu (25 phút)

**JSON** là lingua franca của web & AI: API trả JSON, config là JSON, file label dataset JSON. Python có module `json` sẵn: `json.load(f)` (đọc file → dict/list), `json.dump(obj, f)` (ghi obj → file), `json.loads(s)`/`json.dumps(obj)` cho string. JSON maps tự nhiên sang dict/list/str/number/bool/None của Python.

**CSV** cho dữ liệu dạng bảng. Python có module `csv` (DictReader tiện lợi, đọc mỗi dòng thành dict), hoặc dùng `pandas` cho 1 dòng (`pd.read_csv`/`df.to_csv`) khi cần xử lý. Với dataset lớn (>RAM), dùng `chunksize` trong pandas hoặc `csv.DictReader` streaming.

```python
import json

# Đọc config JSON
with open("config.json", encoding="utf-8") as f:
    cfg = json.load(f)
print(cfg["model"]["name"])      # truy cập dict lồng nhau
print(cfg["learning_rate"])

# Ghi JSON — indent cho dễ đọc
result = {"acc": 0.92, "epochs": 10, "loss": [0.5, 0.3, 0.1]}
with open("result.json", "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)
    # ensure_ascii=False: giữ nguyên tiếng Việt (không mã hóa ASCII)
```

```python
import csv
# Cách 1: module csv (streaming, ít RAM)
with open("data.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)       # mỗi dòng là dict theo header
    for row in reader:
        print(row["age"], row["income"])

# Cách 2: pandas (tiện, nhưng load hết vào RAM)
import pandas as pd
df = pd.read_csv("data.csv")
print(df.shape, df["age"].mean())
df.to_csv("out.csv", index=False)
```

##### Phần 3 — Bảo mật: giấu API key khỏi code (25 phút)

Tội ác phổ biến: hardcode `api_key = "sk-abc123..."` ngay trong `main.py`, rồi commit lên GitHub public. Bot quét GitHub tìm key 24/7 — trung bình key OpenAI bị đánh cắp trong **vài phút** sau push. Hậu quả: tài khoản bị quét sạch tiền, key bị bán trên dark web. **Không bao giờ hardcode bí mật.**

Giải pháp chuẩn (luật **12-factor app**): tách cấu hình khỏi code, để bí mật vào **biến môi trường**. Trong development, dùng file `.env` (text, mỗi dòng `KEY=VALUE`); thư viện `python-dotenv` nạp file này vào `os.environ`. File `.env` luôn trong `.gitignore`; thay vào đó commit `.env.example` (chỉ key, không value) làm template cho đồng nghiệp.

```bash
# .env  (KHÔNG commit!)
OPENAI_API_KEY=sk-abc123secretXYZ456
HUGGINGFACE_TOKEN=hf_def456ghi789
DATABASE_URL=postgresql://user:pass@localhost:5432/db
MODEL_PATH=/data/models/llama-7b
```

```bash
# .env.example  (commit cái này)
OPENAI_API_KEY=
HUGGINGFACE_TOKEN=
DATABASE_URL=
MODEL_PATH=
```

```python
# main.py
import os
from dotenv import load_dotenv

load_dotenv()                          # nạp .env vào os.environ

api_key = os.environ["OPENAI_API_KEY"]    # đọc — sẽ KeyError nếu thiếu
api_key = os.getenv("OPENAI_API_KEY")    # đọc — trả None nếu thiếu

if not api_key:
    raise RuntimeError("Thiếu OPENAI_API_KEY trong .env")

# Dùng key gọi API...
print(f"Đã load key (length={len(api_key)})")  # KHÔNG in raw key!
```

> 🚫 **5 nguyên tắc bảo mật bí mật** — (1) **Không hardcode** trong code; (2) **.env luôn trong .gitignore**; (3) commit `.env.example` làm template; (4) **không in/log raw key** (in length thôi, hoặc mask `sk-...***789`); (5) **đã lỡ push → đổi key ngay** + xoá khỏi Git history. Production thực thụ dùng vault (AWS Secrets Manager, HashiCorp Vault) thay file .env.

##### Phần 4 — Pipeline mẫu: load config + gọi API (10 phút)

Kết hợp 3 phần: pipeline nhỏ đọc config JSON + key từ .env, "gọi API" (mock), ghi kết quả JSON. Đây là khung mọi dự án AI bạn sẽ viết trong 12 môn sau.

```python
# pipeline.py
import json, os
from dotenv import load_dotenv

load_dotenv()
with open("config.json", encoding="utf-8") as f:
    cfg = json.load(f)

api_key = os.getenv("OPENAI_API_KEY")
# ...gọi API với api_key & cfg["model"]...

with open("result.json", "w", encoding="utf-8") as f:
    json.dump({"status": "ok", "model": cfg["model"]}, f, indent=2)
```

> 🎯 **Tổng kết buổi** — 3 ý: (1) `with open(..., encoding="utf-8")` cho file I/O an toàn; (2) JSON/CSV là định dạng dữ liệu chủ đạo — `json.load/dump`, `csv.DictReader`, `pd.read_csv`; (3) bí mật → `.env` + `python-dotenv`, không bao giờ hardcode hay in raw key. Nếu chỉ nhớ một câu: **code sạch trong repo, bí mật trong .env, .env trong .gitignore**.

#### Bài thực hành — Đọc .env & gọi key

Viết 3 dòng Python: (1) nạp file `.env` bằng dotenv, (2) đọc `OPENAI_API_KEY` từ `os.environ`, (3) in ra chiều dài của key (KHÔNG in raw key).

**Lời giải:**
```python
load_dotenv()
api_key = os.environ["OPENAI_API_KEY"]
print(f"key length = {len(api_key)}")
```

#### Bài về nhà (BTCN)

1. **Bài JSON:** Cho file `products.json` (giáo viên phát, dạng `[{"name":"...", "price":..., "tags":[...]}]`) — viết script đọc file, in ra: (a) số sản phẩm, (b) tên sản phẩm giá cao nhất, (c) danh sách tag không trùng lặp.
2. **Bài bảo mật:** Tạo repo có `main.py` đọc `FAKE_KEY` từ `.env` (dùng dotenv). Đảm bảo `.env` trong `.gitignore`, commit `.env.example`. Chụp `git status` cho thấy `.env` bị bỏ qua.
3. **Bài CSV:** Đọc `sales.csv` bằng pandas, tính tổng doanh thu, ghi kết quả (JSON) ra `summary.json` với `ensure_ascii=False, indent=2`.

---

## Tuần 4: Computer Architecture & Concurrency

### Buổi 7: 🔥 Computer Architecture: CPU, GPU & Phân cấp bộ nhớ

**Mô tả:** Làm AI là đốt phần cứng. Hiểu phân cấp bộ nhớ (Disk→RAM→VRAM) để không sập server (OOM), hiểu vì sao GPU "ăn" AI, và kỹ thuật batching.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | Tra bài | Hỏi: with open vì sao hơn open/close tay? .env làm gì? vì sao ensure_ascii=False? |
| 15-60 | Giảng | Phân cấp bộ nhớ: Disk→RAM→Cache→VRAM. Tốc độ vs dung lượng trade-off. Vì sao load data 100GB vào RAM 16GB = crash. |
| 60-70 | ☕ Giải lao | Nghỉ 10'. |
| 70-110 | Giảng | CPU vs GPU: vì sao GPU là trái tim AI. Batching. OOM & 5 cách chống. |
| 110-155 | Thực hành | Tính memory cần cho batch tensor + mô phỏng OOM trong Python. |
| 155-175 | Dặn dò | Giao 3 BTCN. Chuẩn bị B8: Concurrency. |

#### Nội dung giảng chi tiết

##### Phần 1 — Phân cấp bộ nhớ: kim tự tháp tốc độ (25 phút)

Bộ nhớ máy tính không đồng nhất — là **kim tự tháp**: tầng đáy rộng & chậm (ổ cứng TB), tầng đỉnh hẹp & cực nhanh (cache CPU). Nguyên lý: tầng càng gần CPU càng nhanh nhưng càng nhỏ & đắt. AI Engineer phải biết vì sao data đi qua các tầng này, vì bottleneck thường nằm ở chuyển giữa tầng, không phải tính toán.

| Tầng | Tốc độ (độ trễ) | Dung lượng | Vai trò AI |
|------|-----------------|-----------|------------|
| Thanh ghi (register) | ~1 ns | byte | CPU/GPU thao tác trực tiếp |
| CPU Cache L1/L2/L3 | 1-30 ns | KB-MB | Tự động, hiếm khi can thiệp |
| RAM | ~100 ns | 16-256 GB | Load dataset trước xử lý |
| VRAM (GPU memory) | ~500 ns (băng thông cực cao) | 8-80 GB | Chứa tensor khi train |
| SSD (NVMe) | ~100 μs | 0.5-8 TB | Lưu dataset/mô hình |
| HDD / network | ~10 ms | HB-TB | Lưu trữ lạnh |

Ý nghĩa thực tiễn: load 100GB CSV vào RAM 16GB → **crash** (Out of Memory). Load mô hình 12GB vào GPU 8GB → `CUDA out of memory`. Chênh lệch 1000× giữa RAM và SSD nghĩa là "đọc từ ổ cứng mỗi batch" = chậm chết. Giải pháp: **prefetch** (đọc batch tiếp theo trong khi GPU train batch hiện tại), **cache** (giữ dữ liệu nóng trong RAM), **streaming** (đọc từng phần, không load hết).

> ⚠️ **Quy tắc ngón tay cái** — Dữ liệu phải ở tầng *gần* thiết bị xử lý. Train trên GPU mà data nằm HDD → 90% thời gian GPU *chờ* đọc đĩa. Đo bằng `nvidia-smi` (GPU util thấp = bottleneck I/O, không phải compute). Giải: đẩy data lên SSD NVMe, prefetch, hoặc cache vào RAM.

##### Phần 2 — CPU vs GPU: vì sao GPU là trái tim AI (20 phút)

**CPU** (Central Processing Unit) có vài lõi (4-64), mỗi lõi mạnh, giỏi việc phức tạp tuần tự: chạy OS, database, logic. **GPU** (Graphics Processing Unit) có *hàng nghìn lõi*, mỗi lõi yếu, nhưng làm *cùng một phép* trên hàng nghìn dữ liệu song song — gọi là **SIMD** (Single Instruction, Multiple Data). Hóa ra train mạng nơ-ron = nhân ma trận = SIMD hoàn hảo → GPU thắng CPU 10-100×.

Phép nhân ma trận `Y = X @ W` với X(1024, 1024) có ~1 tỷ phép nhân-cộng. CPU làm tuần tự chậm; GPU chia cho hàng nghìn lõi làm cùng lúc. Đó là vì sao deep learning bùng nổ sau 2012 khi GPU đủ mạnh (AlexNet). Ngày nay, mọi mô hình lớn (GPT, Llama) train trên cụm hàng nghìn GPU.

| | CPU | GPU |
|---|-----|-----|
| Số lõi | 4-64 | hàng nghìn |
| Sức mỗi lõi | Mạnh | Yếu |
| Kiểu | Phức tạp, tuần tự | SIMD, song song |
| Bộ nhớ | RAM (lớn) | VRAM (nhỏ hơn, băng thông cao) |
| Giỏi | OS, logic, branch nhiều | Nhân ma trận, tensor |
| AI | Data loading, tiền xử lý | Train, inference mô hình |

> 📌 **TPU & NPU** — Ngoài GPU còn có **TPU** (Tensor Processing Unit, của Google) và **NPU** (Neural Processing Unit, trên chip điện thoại/Mac) — chuyên biệt hơn GPU cho tensor, ít linh hoạt nhưng tiết kiệm năng lượng. Apple Silicon (M1/M2/M3) có Neural Engine; điện thoại flagship có NPU cho AI on-device.

##### Phần 3 — OOM & batching: 5 cách chống cháy (25 phút)

**Out of Memory** là kẻ thù #1 của AI Engineer. Hai dạng: RAM OOM (load data lớn) và VRAM OOM (mô hình/batch quá to cho GPU). Phương pháp "vũ khí đa năng": **batching** — chia dữ liệu thành khối nhỏ, xử lý từng khối. Thay vì load 1 triệu mẫu vào RAM, ta load 128 mẫu/lần (1 batch), xử lý, bỏ, lấy batch kế.

Vì sao batching tăng tốc? Ngoài tránh OOM, nó tận dụng **tính song song của GPU**: 1 mẫu → GPU "chơi vơi"; 128 mẫu cùng lúc → hàng nghìn lõi chạy hết công suất. Đây là vì sao code AI luôn có khái niệm `batch_size`. Cân bằng: batch lớn = GPU tận dụng tốt nhưng tốn VRAM; batch nhỏ = vừa VRAM nhưng kém hiệu quả. Thường thử 16, 32, 64, 128 đến khi gần đầy VRAM.

```python
# Công thức: bytes = numel × bytes_per_element
# float32 = 4 bytes, float16 = 2 bytes, int8 = 1 byte

batch_size = 64
seq_len = 512        # token
hidden = 768         # dimension (BERT-base)

numel = batch_size * seq_len * hidden     # số phần tử
bytes_f32 = numel * 4                      # float32
gb = bytes_f32 / (1024**3)
print(f"1 tensor kích hoạt: {gb:.2f} GB")
# → 1 tensor kích hoạt ≈ 23.4 GB (float32) — thậm chí chưa tính trọng số!
```

| Kỹ thuật | Ý nghĩa | Giảm |
|----------|---------|------|
| **Batching** | Xử lý theo lô nhỏ | RAM/VRAM |
| **Mixed precision** (fp16/bf16) | Dùng 2 byte thay 4 byte | VRAM 2× & tăng tốc |
| **Gradient checkpointing** | Tính lại activation thay vì lưu | VRAM, chậm hơn |
| **Generator/DataLoader** | Streaming, yield từng batch | RAM |
| **Chunking** | Chia file lớn thành phần | RAM/đĩa |
| **LoRA / PEFT** | Train ít tham số | VRAM (M6 học) |

> 🚫 **Khi gặp "CUDA out of memory"** — Đừng hoảng. Bước xử lý: (1) **giảm batch_size** một nửa; (2) bật `torch.cuda.amp` (mixed precision); (3) giảm seq_len / kích thước mô hình; (4) bật gradient checkpointing; (5) giải phóng VRAM: `del tensor; torch.cuda.empty_cache()`. Quy tắc: **luôn code có batch_size tham số**, không hardcode — để có thể giảm khi OOM.

##### Phần 4 — Mô phỏng OOM trong Python (10 phút)

Để "cảm" OOM, ta mô phỏng: thử cấp một list ngày càng lớn trong RAM, bắt `MemoryError`. Bài học: RAM hữu hạn, không có "magic" — phải thiết kế code biết giới hạn.

```python
# CẢNH BÁO: có thể chậm máy — chạy trong môi trường an toàn
import sys
chunks = []
try:
    while True:
        chunks.append([0.0] * 10_000_000)   # mỗi chunk ~80MB float
        print(f"Đã cấp {len(chunks)} chunks ≈ {len(chunks)*80} MB")
except MemoryError:
    print("💥 RAM OOM!")
finally:
    print("Bài học: phải chia nhỏ, không load hết.")
```

> 🎯 **Tổng kết buổi** — 4 ý: (1) bộ nhớ là kim tự tháp — data phải ở tầng gần thiết bị xử lý; (2) GPU thắng CPU ở AI nhờ SIMD song song; (3) **batching** là vũ khí chống OOM & tăng tốc; (4) gặp `CUDA OOM` → giảm batch + mixed precision. Nếu chỉ nhớ: **luôn có batch_size tham số, luôn đo bằng nvidia-smi**.

#### Thực hành trên lớp — Tính memory + mô phỏng OOM

**Yêu cầu:** (1) Tính bytes cho tensor (batch=32, seq=256, hidden=1024) ở float32 & float16 — so sánh. (2) Chạy đoạn mô phỏng OOM trên, ghi nhận máy bạn RAM bao nhiêu thì nổ. (3) Viết generator đọc "CSV lớn" (tạo 100K dòng) theo chunk 10K, in RAM không tăng đột biến.

```python
# Q1: tính memory
b, s, h = 32, 256, 1024
print(f"fp32: {b*s*h*4 / 1024**3:.2f} GB")   # 2 GB
print(f"fp16: {b*s*h*2 / 1024**3:.2f} GB")   # 1 GB (tiết kiệm 1 nửa!)

# Q3: generator streaming
def read_chunks(path, chunk=10_000):
    import pandas as pd
    for df in pd.read_csv(path, chunksize=chunk):
        yield df          # yield từng chunk — RAM chỉ chứa 1 chunk

for chunk_df in read_chunks("big.csv"):
    process(chunk_df)          # xử lý rồi bỏ, RAM ổn định
```

#### Bài về nhà (BTCN)

1. **Bài tính memory:** Một mô hình có 7 tỷ tham số (7B params). Hỏi: (a) cần bao nhiêu GB VRAM để *load* ở float32? (b) ở float16? (c) nếu train (thêm gradient + optimizer state ~3× tham số) ở fp16 cần khoảng bao nhiêu? Viết công thức.
2. **Bài mô phỏng OOM:** Chạy đoạn mô phỏng RAM OOM trên máy bạn. Ghi: RAM tổng (lệnh `free -h` hoặc Task Manager), lúc nổ ở bao nhiêu MB, vì sao nổ trước khi chạm RAM tổng (OS cần RAM).
3. **Bài batching:** Viết hàm `batch_generator(items, batch_size)` yield từng batch (dùng `yield`), test với list 1000 phần tử, batch=50, in ra 5 batch đầu. Giải thích vì sao generator ít RAM hơn list đầy đủ.

---

### Buổi 8: ⚡ Concurrency: Process, Thread & Async

**Mô tả:** Hiểu tiến trình/luồng, GIL Python, phân biệt I/O bound vs CPU bound, và async/await — để code AI không bị nghẽn, chạy song song đúng cách.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | Tra bài | Hỏi: phân cấp bộ nhớ vì sao quan trọng? gặp CUDA OOM xử lý sao? batching vì sao tăng tốc? |
| 15-55 | Giảng | Đồng thời vs song song. Process vs Thread. Multiprocessing vs threading. |
| 55-65 | ☕ Giải lao | Nghỉ 10'. |
| 65-105 | Giảng | GIL Python — vì sao threading không tăng tốc CPU. I/O bound vs CPU bound. |
| 105-145 | Giảng | Async/await: coroutine, asyncio, khi nào thắng threading. |
| 145-165 | Thảo luận | Chọn công cụ cho 4 tình huống AI (đọc file, train, gọi API, scrape). |
| 165-175 | Dặn dò | Giao 3 BTCN. Chuẩn bị B9: DSA Big-O (KT15'). |

#### Nội dung giảng chi tiết

##### Phần 1 — Đồng thời vs Song song: 2 khái niệm khác nhau (15 phút)

Nhầm lẫn phổ biến: **concurrency** (đồng thời) ≠ **parallelism** (song song). *Concurrency* là *xử lý nhiều việc* (có thể xen kẽ) — 1 đầu bếp làm 2 món, lúc đợi nồi sôi thì thái rau. *Parallelism* là *làm nhiều việc cùng một thời điểm vật lý* — 2 đầu bếp, mỗi người 1 món. Concurrency là về **cấu trúc** (chia việc), parallelism về **thực thi** (chạy thật cùng lúc).

Ví dụ đời AI: gọi 10 API request. *Sequential*: gọi lần lượt, mỗi cái 1 giây → 10 giây. *Concurrent* (async): gửi 10 cái, trong lúc chờ API phản hồi thì gửi cái kế → ~1 giây (cùng đợi). *Parallel* (multiprocessing): 10 CPU chạy thật sự song song → ~1 giây nhưng tốn 10× CPU. Tình huống quyết định kỹ thuật.

| Tình huống | Bottleneck | Kỹ thuật đúng |
|-----------|-----------|---------------|
| Gọi 100 API | Mạng (I/O) | async / threading |
| Train 4 mô hình song song | CPU/GPU | multiprocessing |
| Đọc 1000 file CSV | Đĩa (I/O) | async / threading |
| Tính nặng (transform data) | CPU | multiprocessing |

##### Phần 2 — Process vs Thread (25 phút)

**Process** (tiến trình) là chương trình đang chạy, có **bộ nhớ riêng** — 2 process không thấy bộ nhớ nhau (trừ khi dùng IPC: queue, shared memory). Tạo process nặng (fork/spawn), tốn tài nguyên, nhưng chạy *thật song song* trên nhiều CPU.

**Thread** (luồng) là đơn vị nhỏ hơn, **chung bộ nhớ** với process mẹ — các thread thấy biến của nhau. Tạo thread nhẹ, chuyển đổi nhanh, nhưng cần đồng bộ hoá (lock) để không đè lên nhau. Trong Python, có cạm bẫy lớn tên gọi **GIL** (Phần 3).

| | Process | Thread |
|---|---------|--------|
| Bộ nhớ | Riêng biệt | Chung (cùng process) |
| Tạo mới | Nặng (ms) | Nhẹ (μs) |
| Truyền dữ liệu | IPC (Queue, Pipe) | Đọc/ghi biến chung |
| Python | `multiprocessing` | `threading` (GIL hạn chế) |
| Song song thật | Có (đa CPU) | Không (GIL trong Python) |
| Crash 1 cái | Không ảnh hưởng process khác | Có thể kéo cả process |
| AI dùng khi | Train nhiều mô hình, data processing nặng | I/O (API, file, network) |

```python
from multiprocessing import Pool
import time

def train_one(lr):
    # giả lập train nặng (CPU bound)
    time.sleep(2)
    return f"model_lr={lr}_done"

lrs = [0.001, 0.01, 0.1, 1.0]

# Tuần tự: ~8s
# Parallel với 4 process: ~2s (chạy thật song song trên đa CPU)
if __name__ == "__main__":
    with Pool(4) as p:
        results = p.map(train_one, lrs)
    print(results)
```

##### Phần 3 — GIL: vì sao Python thread không song song CPU (25 phút)

**GIL** (Global Interpreter Lock) là khoá toàn cục của CPython: tại một thời điểm **chỉ 1 thread chạy bytecode Python**. Nghĩa là dù máy bạn 16 CPU, 16 thread Python vẫn *không* chạy song song được cho việc **CPU-bound** — chúng luân phiên, thậm chí chậm hơn do overhead chuyển đổi.

Tuy nhiên, GIL **được thả** khi chờ I/O (đọc file, gọi API, sleep). Vậy threading vẫn hữu ích cho **I/O-bound**: 1 thread chờ mạng thì thread khác chạy. Quy tắc chọn trong Python: **I/O-bound** (API, file, scrape) → threading hoặc async; **CPU-bound** (tính toán, train) → multiprocessing (nếu phải dùng CPU). NumPy/PyTorch thả GIL khi chạy C underneath, nên vẫn song song được phần nào.

```python
import threading, time, requests

urls = ["https://api.example.com/1", "https://api.example.com/2", "https://api.example.com/3"]

def fetch(url):
    r = requests.get(url, timeout=5)
    print(f"{url} → {r.status_code}")

# Tuần tự: 3 × (độ trễ mạng) — chậm
# Threading: cả 3 chờ mạng cùng lúc — nhanh hơn nhiều
threads = [threading.Thread(target=fetch, args=(u,)) for u in urls]
for t in threads: t.start()
for t in threads: t.join()      # đợi tất cả xong
```

> 🚫 **Cạm bẫy GIL** — Nhiều người mới tưởng "thêm thread = nhanh hơn" cho vòng lặp tính toán → thực tế **chậm hơn** vì GIL chặn + overhead. Đo thực tế bằng `time.time()`. Nếu CPU-bound và muốn song song *thật* → `multiprocessing` (mỗi process có GIL riêng). Lưu ý: multiprocessing tốn RAM hơn (mỗi process copy dữ liệu) — cân nhắc với dataset lớn.

##### Phần 4 — Async/await: concurrency "hiện đại" cho I/O (25 phút)

**Async/await** là cách viết concurrency gọn gàng hơn threading cho I/O. Cốt lõi: **coroutine** — hàm có thể "tạm dừng" (await) nhường CPU khi chờ I/O, rồi tiếp tục. Khác thread, async chạy trên **1 thread duy nhất**, không có overhead chuyển đổi thread, không cần lock (vì 1 thread). Lý tưởng cho **nhiều I/O**: gọi 1000 API, scrape web, chat server.

Cú pháp: khai báo `async def`, gọi `await` khi chờ I/O, chạy bằng `asyncio.run()`. Thư viện phải *async-aware* (`httpx`, `aiohttp` thay `requests`; `aiofiles` thay `open`). Async không phải đạn bạc — code phức tạp hơn, khó debug, và **không** giúp CPU-bound (vẫn 1 thread, vẫn GIL).

```python
import asyncio, time

# Coroutine: hàm async, có thể await
async def fetch(url):
    await asyncio.sleep(1)    # giả lập I/O (không chặn thread!)
    print(f"{url} done")
    return url.upper()

async def main():
    urls = ["a.com", "b.com", "c.com"]
    # Chạy 3 fetch CONCURRENT (cùng chờ) — tổng ~1s, không phải 3s
    results = await asyncio.gather(*[fetch(u) for u in urls])
    print(results)

# Tuần tự: 3s. Async gather: ~1s.
asyncio.run(main())
```

> ⚠️ **Blocking trong async = giết concurrency** — Trong hàm async, nếu gọi hàm *blocking* (như `time.sleep(1)`, `requests.get()` đồng bộ, `open().read()` file lớn) → nó **chặn toàn bộ event loop**, mọi coroutine khác phải chờ. Phải dùng phiên bản async (`await asyncio.sleep`, `httpx.AsyncClient`, `aiofiles`) hoặc đẩy việc blocking ra thread (`asyncio.to_thread`). Đây là bug thầm lặng nhất của người mới async.

##### Phần 5 — Quyết định: bảng chọn công cụ (5 phút)

| Tình huống AI | Công cụ | Vì sao |
|--------------|---------|--------|
| Gọi 1000 LLM API | asyncio + httpx | I/O-bound, nhiều request, 1 thread đủ |
| Preprocess 100GB ảnh (CPU nặng) | multiprocessing.Pool | CPU-bound, cần đa CPU thật |
| DataLoader trong PyTorch | torch DataLoader (num_workers) | Đã wrap multiprocessing + prefetch |
| Train nhiều hyperparams | multiprocessing hoặc joblib | Mỗi mô hình 1 process |
| Web server AI (FastAPI) | async (FastAPI native) | Xử lý nhiều request I/O |
| Đọc 10K file CSV nhỏ | threading hoặc asyncio | I/O-bound, disk |

> 🎯 **Tổng kết buổi** — 4 ý: (1) concurrency ≠ parallelism; (2) **Process** = bộ nhớ riêng, song song thật; **Thread** = bộ nhớ chung, nhẹ; (3) **GIL** chặn Python thread ở CPU-bound → dùng multiprocessing; (4) **async/await** cho I/O-bound nhiều. Quy tắc ngón tay cái: **I/O → async/threading; CPU → multiprocessing**. Đo bằng `time` trước khi tối ưu!

#### Thảo luận trên lớp — Chọn công cụ

**4 tình huống** — Chia 4 nhóm, mỗi nhóm 1 tình huống, thảo luận 5 phút rồi trình bày: (1) Scrape 500 trang web lấy giá; (2) Train grid search 12 mô hình; (3) Chatbot server phục 100 user; (4) Đọc và tokenize 50K văn bản. Mỗi nhóm nói: bottleneck là gì (I/O hay CPU), công cụ nào, vì sao, 1 cạm bẫy.

#### Bài về nhà (BTCN)

1. **Bài multiprocessing:** Viết hàm tính bình phương cho 1 list 1 triệu số. So sánh thời gian: (a) tuần tự `[x*x for x in nums]`, (b) `multiprocessing.Pool(4).map`. Dùng `time.time()` đo, ghi nhận tỷ lệ. Vì sao (b) có thể không nhanh hơn nhiều cho phép đơn giản? (overhead)
2. **Bài async:** Viết async fetch "gọi" 5 API giả lập (mỗi cái `await asyncio.sleep(1)`). So sánh thời gian: tuần tự (5s) vs `asyncio.gather` (~1s). In ra để chứng minh concurrency.
3. **Bài phân tích:** Đọc tình huống: "script Python load 10GB CSV, transform từng dòng (regex nặng), rồi ghi ra JSON." Trả lời: bottleneck chính là I/O hay CPU? Chọn threading/multiprocessing/async? Vì sao? (gợi ý: chia 2 giai đoạn, mỗi giai đoạn bottleneck khác nhau).

---

## Tuần 5: DSA & Clean Code

### Buổi 9: 📊 DSA: Big-O & Hash Map Thực chiến — Đo nhanh chậm & tìm O(1)

**Mô tả:** Không cày LeetCode vô định. Học Big-O + Hash Map như *công cụ sinh tồn*: biến O(n²) chết người thành O(n) mượt mà.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | 📝 KT 15 PHÚT #3 | Concurrency / Process / Thread / async — B8. |
| 15-35 | Warm-up | Đố vui: đoán code nào nhanh hơn khi n=1 triệu. |
| 35-70 | Giảng | Big-O là gì: O(1), O(n), O(n²), O(log n). Cách đo bằng time. |
| 70-80 | ☕ Giải lao | |
| 80-120 | Giảng | Hash Map: dict & set. Vì sao lookup O(1). Bài deduplicate. |
| 120-160 | Thực hành | So sánh list vs set trên 100k phần tử. Đếm tần suất word. |
| 160-175 | Dặn dò | Trả KT15'. BTCN 3 bài. Chuẩn bị B10: Queue/Stack. |

#### Nội dung giảng chi tiết

##### Phần 1 — Big-O: ngôn ngữ đo nhanh chậm (25 phút)

Câu chuyện đời thường: bạn viết một hàm xử lý 1 triệu dòng log. Chạy xong trong 0.1 giây — "tốt quá!". Nhưng hôm sau dữ liệu tăng lên 10 triệu dòng, hàm chạy 10 giây. Tuần sau 100 triệu → treo 1000 giây. Tại sao thời gian tăng phi mã như vậy? Vì thuật toán của bạn có **độ phức tạp O(n²)** — thời gian tăng theo *bình phương* kích thước dữ liệu. Đó chính là Big-O: nó không đo "code chạy bao lâu", mà đo *cách thời gian tăng khi dữ liệu lớn lên*.

Big-O bỏ qua hằng số, chỉ giữ "hình dáng" tăng trưởng. Một thuật toán O(n) với hệ số chậm vẫn thắng O(n²) khi n đủ lớn — vì bình phương luôn vượt tuyến tính. Trong AI, dữ liệu (dataset, token, batch) luôn khổng lồ, nên Big-O không phải "lý thuyết sáo rỗng" mà quyết định script chạy 1 giây hay 1 giờ.

| Big-O | Tên | Ví dụ kinh điển | n = 10.000 | n = 1.000.000 |
|-------|-----|-----------------|-----------|----------------|
| **O(1)** | Hằng số | Dict/set lookup | 1 thao tác | 1 thao tác |
| **O(log n)** | Logarit | Binary search | ~14 | ~20 |
| **O(n)** | Tuyến tính | For 1 vòng | 10.000 | 1.000.000 |
| **O(n log n)** | Sắp xếp tốt | `sorted()`, merge sort | ~130.000 | ~20 triệu |
| **O(n²)** | Bình phương | 2 vòng for lồng nhau | 100.000.000 | 1.000.000.000.000! |

**Quy tắc đọc Big-O:** đếm vòng lặp. 1 vòng for trên n phần tử = O(n). 2 vòng lồng nhau = O(n²). Một phép dict lookup không lặp = O(1). Hàm gọi 3 lần O(n) = vẫn O(n) (cộng hằng số bị bỏ). Khi đánh giá code, luôn hỏi: "*nếu dữ liệu gấp 10 lần, thời gian tăng mấy lần?*" — O(n) → 10 lần, O(n²) → 100 lần.

> ⚠️ **Kẻ thù số một: O(n²) ẩn** — Lỗi phổ biến: kiểm tra membership bằng `if x in list` bên trong for. Mỗi `in list` là O(n), lặp n lần → tổng O(n²). Với n=1 triệu = 1 nghìn tỷ phép so sánh. Máy treo. Giải pháp: đổi list thành set → O(1) mỗi lần → tổng O(n).

##### Phần 2 — Đo Big-O thực tế bằng time (15 phút)

Lý thuyết phải kiểm chứng. Python có module `time` và `timeit` để đo. Hãy viết cùng một bài toán (tìm trùng) hai cách rồi đo thời gian thực để "cảm" được chênh lệch O(n²) vs O(n) trên da thịt.

```python
import time, random
data = [random.randint(0, 1_000_000) for _ in range(100_000)]

# CÁCH 1 — O(n²): kiểm tra trong list
t0 = time.perf_counter()
seen_list, out1 = [], []
for x in data:
    if x not in seen_list:   # O(n) mỗi lần!
        seen_list.append(x); out1.append(x)
print(f"O(n^2): {time.perf_counter()-t0:.3f}s")   # rất chậm

# CÁCH 2 — O(n): kiểm tra trong set
t0 = time.perf_counter()
seen_set, out2 = set(), []
for x in data:
    if x not in seen_set:      # O(1) mỗi lần!
        seen_set.add(x); out2.append(x)
print(f"O(n):   {time.perf_counter()-t0:.3f}s")    # siêu nhanh
```

Chạy thử: cách O(n²) có thể mất hàng chục giây, cách O(n) xong trong mili-giây — chênh lệch hàng nghìn lần. Đây không phải "tối ưu đẹp": đây là ranh giới **chạy được hay không chạy được**. Trong pipeline AI xử lý triệu bản ghi, chọn sai cấu trúc dữ liệu = script không bao giờ xong.

> 🎯 **Nguyên tắc vàng** — Trước khi viết thuật toán, hỏi: "*vol dữ liệu lớn nhất là bao nhiêu? Thuật toán này O(bao nhiêu)?*". Nếu O(n²) với n=triệu → phải nghĩ cách O(n) hoặc O(n log n). Đừng để phòng máy tính quyết định.

##### Phần 3 — Hash Map: dict & set, vì sao lookup O(1) (25 phút)

**Hash Map** (bảng băm) là cấu trúc dữ liệu "vua" của AI engineering. Python triển khai nó qua hai kiểu: `dict` (ánh xạ key→value) và `set` (tập hợp key, không value). Điểm thần kỳ: tra cứu theo key mất **O(1)** — không phụ thuộc số phần tử. Tra trong dict 10 phần tử hay 10 triệu phần tử đều cùng thời gian (gần như).

Sức mạnh đến từ *hàm băm (hash function)*. Khi bạn thêm key vào dict, Python tính `hash(key)` — một số nguyên — rồi dùng nó để tính vị trí lưu trữ trực tiếp (như số nhà). Khi tra cứu, không cần lặp từng phần tử; chỉ tính lại hash rồi nhảy thẳng đến vị trí. Đó là vì sao lookup O(1). Hình dung: tìm tên trong danh sách 1000 người (O(n), đọc từng tên) vs trong sổ bưu điện biết số nhà (O(1), mở thẳng trang).

```python
# Đếm tần suất từ — dict là Hash Map
def word_count(words: list[str]) -> dict[str, int]:
    freq: dict[str, int] = {}
    for w in words:
        freq[w] = freq.get(w, 0) + 1   # O(1) mỗi lần → tổng O(n)
    return freq

# Tìm phần tử chung 2 tập — set intersection O(n)
a_users = {"u1", "u2", "u3", "u4"}
b_users = {"u3", "u4", "u5"}
common = a_users & b_users            # {"u3","u4"} — O(min(m,n))

# Lọc trùng giữ thứ tự — kết hợp set + list
def dedupe_ordered(seq):
    seen, out = set(), []
    for x in seq:
        if x not in seen:
            seen.add(x); out.append(x)
    return out
```

**Dict vs set, chọn cái nào?** Cần ánh xạ (đếm, gán giá trị) → dict. Chỉ cần biết "có hay không" (lọc trùng, kiểm tra tồn tại) → set (nhẹ hơn). Cả hai đều Hash Map, đều O(1). **Lưu ý key phải hashable**: str, int, tuple OK; list, dict, set KHÔNG được (vì mutable). Muốn set các tuple → được; set các list → lỗi `TypeError: unhashable type`.

> 🚫 **Sai lầm: thay đổi dict khi đang lặp** — Không bao giờ thêm/xóa key của dict/set *đang được for* → `RuntimeError: dictionary changed size during iteration`. Muốn lọc key, hãy duyệt bản sao: `for k in list(d):`. Bug này khiến pipeline AI chết giữa chừng.

##### Phần 4 — Bài toán kinh điển: Two Sum (15 phút)

**Two Sum** là bài toán tuyển dụng nổi tiếng: cho mảng `nums` và số `target`, tìm 2 chỉ số sao cho `nums[i] + nums[j] == target`. Cách ngây thơ: 2 vòng for lồng nhau, thử mọi cặp → O(n²). Cách Hash Map: một vòng for, mỗi phần tử kiểm tra phần bù `target - x` đã thấy chưa → O(n). Đây là ví dụ textbook cho thấy Hash Map biến O(n²) thành O(n).

```python
def two_sum(nums: list[int], target: int) -> tuple[int, int] | None:
    seen: dict[int, int] = {}        # value -> index
    for i, x in enumerate(nums):
        need = target - x
        if need in seen:           # O(1) lookup
            return (seen[need], i)
        seen[x] = i
    return None

print(two_sum([2, 7, 11, 15], 9))   # (0, 1) vì nums[0]+nums[1]=9
```

Mẫu thiết kế này lặp đi lặp lại: "*tra cứu cái đã thấy*" — Hash Map chính là vũ khí. Trong AI: cache embedding đã tính, khử trùng sample, build vocab từ corpus, map token→id... tất cả đều là biến thể Two Sum.

> 🎯 **Tổng kết buổi** — 3 ý mang về: (1) Big-O đo *cách* thời gian tăng, không đo thời gian tuyệt đối; (2) Hash Map (dict/set) lookup O(1) — biến O(n²) thành O(n); (3) trước khi code, hỏi "vol dữ liệu bao nhiêu, Big-O của thuật toán gì". Nếu chỉ nhớ một câu: **nghi ngờ mọi `in list` trong vòng lặp**.

#### Bài thực hành — Lọc trùng bằng Hash Map O(n)

Viết hàm `dedupe(seq)` dùng set để lọc trùng, giữ thứ tự đầu tiên. Không được dùng list lồng for (O(n²) bị cấm).

**Lời giải:**
```python
if x not in seen:
    seen.add(x)
    result.append(x)
```

#### Bài về nhà (BTCN)

1. Viết `word_count(text)` nhận chuỗi, trả dict tần suất từng từ (dùng `split()`). Đo thời gian trên 1 triệu từ.
2. Viết `two_sum(nums, target)` bằng Hash Map (như trên). So sánh thời gian với cách O(n²) trên 100.000 phần tử.
3. Cho 2 file log (mỗi file 1 triệu dòng). Tìm dòng xuất hiện ở *cả hai* file dùng set intersection. In số dòng chung.

> 📢 **Nhắc** — Đầu buổi 14 sẽ có **KT 15 phút #4** về HTTP/REST/JSON. Trong thời gian tới, ôn dần B13 (HTTP/REST/JSON Schema) để chuẩn bị. Buổi 10-13 là DSA tiếp + Clean Code + Testing + HTTP.

---

### Buổi 10: 🔄 DSA: Queue & Stack Pipelines — Xếp hàng & hoàn tác

**Mô tả:** Hai cấu trúc dữ liệu tối giản nhưng là "cột sống" của mọi pipeline: Queue (FIFO) xếp hàng xử lý, Stack (LIFO) quay lui/hoàn tác.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | Tra bài | Hỏi: Big-O của `in set` vs `in list`? Vì sao? |
| 15-35 | Warm-up | Minh hoạ: xếp hàng mua vé (Queue) vs chồng đĩa (Stack). |
| 35-70 | Giảng | Queue FIFO vs Stack LIFO. collections.deque. Big-O enqueue/dequeue. |
| 70-80 | ☕ Giải lao | |
| 80-120 | Giảng | Task queue pipeline cho AI: xếp hàng upload, xử lý batch. Backtracking bằng stack. |
| 120-160 | Thực hành | Viết pipeline xử lý batch bằng deque + BFS/DFS đơn giản. |
| 160-175 | Dặn dò | BTCN 3 bài. Chuẩn bị B11: Clean Code & Linters (KT15'). |

#### Nội dung giảng chi tiết

##### Phần 1 — Queue (FIFO) & Stack (LIFO): triết lý hai đầu (25 phút)

**Queue** (hàng đợi) theo nguyên tắc **FIFO — First In, First Out**: phần tử vào trước thì ra trước, giống xếp hàng mua vé. **Stack** (ngăn xếp) theo **LIFO — Last In, First Out**: phần tử vào sau lại ra trước, giống chồng đĩa — lấy đĩa trên cùng trước. Hai nguyên tắc này rất đơn giản nhưng định hình cách tổ chức gần như mọi luồng xử lý trong phần mềm: queue cho tác vụ tuần tự, stack cho cơ chế "quay lui".

Khi nào dùng cái nào? **Queue** khi thứ tự vào/ra phải công bằng và theo thời gian: xử lý yêu cầu user theo thứ tự gửi, upload tài liệu, in ấn. **Stack** khi cần "phản hồi" (undo), duyệt theo chiều sâu (DFS), hoặc parse cấu trúc lồng nhau (ngoặc đơn, JSON, AST). Sai cấu trúc = sai logic nghiệp vụ.

| | Queue (FIFO) | Stack (LIFO) |
|---|--------------|--------------|
| Nguyên tắc | Vào trước, ra trước | Vào sau, ra trước |
| Thao tác | `enqueue` / `dequeue` | `push` / `pop` |
| Python nên dùng | `collections.deque` | `list` (`append`/`pop`) |
| Big-O 2 đầu | O(1) cả enqueue & dequeue | O(1) cả push & pop |
| AI use case | Task queue, BFS, batch upload | Undo, DFS, backtracking, parse JSON |

> ⚠️ **Đừng dùng list làm Queue!** — `list.pop(0)` là **O(n)** — phải dịch toàn bộ phần tử còn lại. Với queue 1 triệu phần tử → 1 triệu phép dịch mỗi lần → O(n²) tổng. Dùng `collections.deque` thì `popleft()` là O(1). Đây là lỗi Big-O ẩn rất phổ biến.

##### Phần 2 — collections.deque: queue/stack hiệu năng cao (20 phút)

Python chuẩn có `collections.deque` (double-ended queue) — cấu trúc tối ưu cho cả queue lẫn stack. Cả hai đầu đều O(1) cho thêm/xóa, khác hẳn list (list chỉ O(1) ở cuối). Khi viết pipeline xử lý tác vụ, deque là lựa chọn mặc định.

```python
from collections import deque

# QUEUE (FIFO): append bên phải, popleft bên trái
q = deque()
q.append("task1")      # enqueue
q.append("task2")
first = q.popleft()    # "task1" — O(1)

# STACK (LIFO): append & pop cùng bên phải
s = deque()
s.append("frame1")     # push
s.append("frame2")
top = s.pop()          # "frame2" — O(1)

# Đặt giới hạn kích thước — tự động loại phần tử cũ
recent = deque(maxlen=5)   # sliding window 5 phần tử
```

**deque vs list khi nào?** Cần stack thuần → list cũng được (vì chỉ thao tác cuối). Cần queue, hoặc cần thao tác cả hai đầu, hoặc cần sliding window (maxlen) → deque. Quy tắc nhớ: *"cần pop đầu không? → deque"*.

##### Phần 3 — Task queue pipeline cho AI (25 phút)

Trong pipeline AI thật, không phải lúc nào cũng xử lý ngay: 1000 user upload tài liệu cùng lúc, GPU chỉ đủ xử lý 4 file song song. Giải pháp: cho tác vụ vào **queue**, worker lấy ra xử lý từng cái (hoặc theo batch). Đây chính là kiến trúc Celery, RQ, hoặc Kafka ở quy mô lớn — nhưng cốt lõi vẫn là một queue. Hiểu được deque = hiểu được một nửa ý tưởng của mọi message broker.

```python
from collections import deque

def process_batch(tasks, batch_size=4, handler=lambda t: print("handled", t)):
    queue = deque(tasks)          # enqueue tất cả
    while queue:                  # còn tác vụ
        batch = [queue.popleft() for _ in range(min(batch_size, len(queue)))]
        for t in batch:
            handler(t)            # xử lý từng file

process_batch(["doc1.pdf", "doc2.pdf", "doc3.pdf", "doc4.pdf", "doc5.pdf"],
              batch_size=2)
```

Mẫu thiết kế này: *đẩy hết vào queue, vòng lặp lấy ra đến khi rỗng* — đó chính là **BFS (Breadth-First Search)** trên đồ thị. Thay queue bằng stack → thành **DFS (Depth-First)**. Cùng một khung code, đổi cấu trúc dữ liệu → đổi chiến lược duyệt. Đây là vì sao queue/stack là nền của mọi thuật toán duyệt.

> 📌 **Queue = vũ khí Agent** — Khi 1000 user gọi Agent cùng lúc, không thể spawn 1000 process → đẩy yêu cầu vào queue, xử lý từng mẻ mà không quá tải. Đây là cốt lõi của hệ thống Agent production (HK2 liên hệ LangGraph worker, HK3 liên hệ RAG batch).

##### Phần 4 — Stack & backtracking (15 phút)

**Backtracking** (quay lui) là kỹ thuật giải bài toán "thử — sai — quay lại". Mỗi bước thử một lựa chọn, đẩy vào stack; nếu đi vào ngõ cụt, `pop()` để quay lui thử nhánh khác. Ứng dụng: sinh hoán vị, giải Sudoku, parse biểu thức, kiểm tra ngoặc đúng. Trong AI/Agent, stack cũng chính là "bộ nhớ gọi đệ quy" khi Agent suy luận nhiều bước.

```python
def is_valid_parens(s: str) -> bool:
    stack = []
    pairs = {")": "(", "]": "[", "}": "{"}
    for ch in s:
        if ch in pairs.values():       # mở → push
            stack.append(ch)
        elif ch in pairs:               # đóng → kiểm tra khớp
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack                # stack rỗng = cân bằng

print(is_valid_parens("([]){}"))   # True
print(is_valid_parens("([)]"))     # False
```

> 🎯 **Tổng kết buổi** — 4 ý: (1) Queue = FIFO (công bằng theo thời gian), Stack = LIFO (quay lui); (2) dùng `collections.deque`, không dùng `list.pop(0)`; (3) task queue pipeline = enqueue + vòng lặp popleft — nền của mọi message broker; (4) stack là khung của backtracking/DFS/parse. Nếu chỉ nhớ một điều: **cần pop đầu → deque**.

#### Bài thực hành — Task queue pipeline

Dùng `collections.deque` làm queue. Viết `run_pipeline(tasks, batch_size)`: vòng lặp `while queue:`, mỗi vòng lấy `batch_size` tác vụ bằng `popleft()`, in ra. Không dùng `list.pop(0)`.

**Lời giải:**
```python
batch = [queue.popleft() for _ in range(min(batch_size, len(queue)))]
```

#### Bài về nhà (BTCN)

1. Viết `is_valid_parens(s)` dùng stack như trên. Test với `"((()))"`, `"([)]"`, `""`.
2. Viết `process_batch(tasks, batch_size, handler)` dùng deque. Mô phỏng: handler = lambda t: time.sleep(0.01). Đo tổng thời gian với 1000 tác vụ, batch_size=8.
3. Viết BFS trên đồ thị (dict ánh xạ node → danh sách neighbor) dùng deque làm frontier. In thứ tự duyệt.

---

### Buổi 11: ✨ Clean Code & Linters — "Vibe code" chuẩn công ty

**Mô tả:** Code đẹp không phải để khoe: nó để người sau (và AI) đọc được. Type hints + black + ruff + mypy + pre-commit = PR không bị reject.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | Tra bài | Hỏi: Queue dùng khi nào? Vì sao `list.pop(0)` là O(n)? |
| 15-35 | Warm-up | Đọc 2 đoạn code cùng chức năng: 1 rối, 1 sạch. Bình chọn. |
| 35-75 | Giảng | Type hints: vì sao, cú pháp cơ bản, Optional/Union/generic. |
| 75-85 | ☕ Giải lao | |
| 85-125 | Giảng | Linter toolchain: black (format), ruff (lint+fix), mypy (type check). |
| 125-165 | Thực hành | Dọn 1 file code bẩn: type hints + black + ruff --fix + mypy. Cài pre-commit. |
| 165-175 | Dặn dò | BTCN 3 bài. Chuẩn bị B12: Testing (pytest). |

#### Nội dung giảng chi tiết

##### Phần 1 — Clean Code & vì sao "code dễ đọc" quan trọng (20 phút)

Quy tắc vàng của kỹ sư giỏi: **code được đọc nhiều lần hơn viết**. Một hàm bạn viết trong 5 phút có thể được đọc hàng trăm lần — bởi đồng nghiệp review, bởi bạn vài tháng sau khi quên, và ngày nay bởi AI coding assistant. Code "chạy được" là tiêu chuẩn tối thiểu; code *dễ đọc, dễ sửa, dễ kiểm thử* mới là chuẩn công ty. Khi reviewer mở PR và phải mất 30 phút hiểu một hàm 50 dòng — đó là lỗi thiết kế, không phải lỗi ngôn ngữ.

Một số nguyên tắc clean code thiết yếu: **tên biến/hàm nói lên ý đồ** (`load_users()` tốt hơn `f()` hay `proc()`); **một hàm làm một việc** (hàm dài quá 30 dòng là tín hiệu cảnh báo); **tránh "số ma thuật"** (dùng hằng số có tên: `MAX_RETRIES = 3` thay vì `3` rải rác); **xóa code chết** (Git đã nhớ lịch sử, không cần comment-out). Đây không phải "đẹp trai" — nó trực tiếp giảm bug và tăng tốc độ phát triển.

> 📌 **Nguyên tắc Boy Scout** — "Để lại khu cắm trại sạch hơn khi bạn đến." Mỗi lần sửa code, làm cho nó dễ đọc hơn một chút — đổi tên biến mơ hồ, tách hàm dài, thêm type hint. Sau vài tháng, codebase tự nhiên trở nên trong trẻo. Đây là sự khác biệt giữa code "vibe" và code rác.

##### Phần 2 — Type hints: cho Python "có kiểu" (25 phút)

Python là ngôn ngữ động — biến không cần khai báo kiểu. Tự do, nhưng nguy hiểm: gọi `len(42)` không lỗi lúc viết, chỉ nổ lúc chạy. **Type hints** thêm chú thích kiểu *tùy chọn*, giúp IDE, AI và công cụ (mypy) bắt lỗi *trước khi chạy*. Trong project AI lớn với hàng trăm hàm, type hints là ranh giới giữa "refactor sợ hãi" và "refactor tự tin".

Type hints không ép buộc lúc runtime — Python vẫn chạy dù type sai. Nhưng mypy sẽ báo lỗi khi kiểm tra, IDE sẽ gạch chân đỏ, AI sẽ cảnh báo. Đây là lớp an toàn "xây trên nền" chứ không phá vỡ tính linh hoạt của Python.

```python
# Cú pháp cơ bản: tham số: kiểu, -> kiểu trả về
def load_data(path: str, nrows: int = 100) -> pd.DataFrame:
    """Load CSV, trả DataFrame tối đa nrows dòng."""
    return pd.read_csv(path, nrows=nrows)

# Collection: list[int], dict[str, int], tuple[int, ...]
def word_count(words: list[str]) -> dict[str, int]:
    ...

# Có thể None — dùng Optional hoặc X | None (Python 3.10+)
from typing import Optional
def find_user(uid: int) -> Optional[dict]:    # hoặc dict | None
    ...

# Generic cho reusability
from typing import TypeVar
T = TypeVar("T")
def first(xs: list[T]) -> T:
    return xs[0]
```

> ⚠️ **Type hints không miễn dịch runtime** — Dù ghi `def f(x: int)`, gọi `f("abc")` *vẫn chạy* (không lỗi runtime). Type chỉ là chú thích. Để **thực sự ép kiểu**, cần chạy mypy trong CI, hoặc dùng thư viện `pydantic` (validate lúc runtime). Đừng tưởng ghi type là an toàn — phải có mypy kiểm.

##### Phần 3 — Toolchain: black, ruff, mypy (25 phút)

Ba công cụ tạo nên "bộ ba vàng" chất lượng Python. **black** là formatter tự động — nó không hỏi ý kiến, chỉ định dạng lại code theo quy ước cố định (chỉnh thụt lề, dấu ngoặc, độ dài dòng). Lợi ích lớn: cả team code trông như một người viết, không còn tranh cãi "dấu cách trước dấu hai chấm". **ruff** (thay thế flake8 + isort) là linter cực nhanh: tìm lỗi style, import không dùng, biến không xác định, vòng lặp thừa... và có thể tự sửa bằng `--fix`. **mypy** kiểm tra type — báo lỗi khi type hints bị vi phạm.

```bash
# Cài cả bộ (ruff thay thế flake8+isort+pyupgrade)
pip install black ruff mypy pre-commit

black .                      # format toàn bộ file .py
black --check .              # chỉ kiểm tra, không sửa (cho CI)

ruff check .                 # lint: liệt kê vi phạm
ruff check . --fix           # tự sửa những gì sửa được
ruff check . --select E,F,I  # chọn rule groups: Error, pyFlake, Import

mypy .                       # kiểm tra type trên toàn project
mypy --strict .              # mode khắt khe
```

Cách tổ chức tiêu chuẩn: đặt cấu hình trong `pyproject.toml` để cả máy cá nhân lẫn CI dùng chung quy tắc. Ví dụ: đặt `line-length = 88` cho cả black và ruff để chúng không "cãi nhau" về độ dài dòng. Khi cả 3 tool chạy xanh, PR gần như chắc chắn được approve nhanh.

##### Phần 4 — Pre-commit hooks: tự động hóa "không commit code bẩn" (15 phút)

**Pre-commit** là "vệ sĩ" đứng trước `git commit`. Mỗi lần commit, nó tự chạy black, ruff, mypy (và nhiều hook khác). Nếu có lỗi → commit bị từ chối → bạn bắt buộc phải sửa. Điều này bảo vệ lịch sử Git: không bao giờ có code bẩn lọt vào repo. Đây là tiêu chuẩn bắt buộc ở mọi công ty software nghiêm túc.

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace      # xóa khoảng trắng cuối dòng
      - id: end-of-file-fixer        # đảm bảo có newline cuối file
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.5.0
    hooks:
      - id: ruff
        args: [--fix]
  - repo: https://github.com/psf/black
    rev: 24.4.2
    hooks:
      - id: black
```

```bash
# bash · cài pre-commit
pip install pre-commit
pre-commit install            # gắn hook vào .git/
pre-commit run --all-files    # chạy thử trên mọi file
```

> 🎯 **Tự động hóa là sức mạnh** — Một khi pre-commit đã cài, bạn *không cần nhớ* chạy black/ruff — nó tự chạy. Đây là tư duy "design for laziness": cấu hình một lần, lợi ích vĩnh viễn. Mọi công cụ quality (CI, lint, test) đều nên đặt ở "cửa soát" tự động, không dựa vào kỷ luật con người.

> 🎯 **Tổng kết buổi** — 4 ý: (1) code được đọc nhiều hơn viết — clean code là đầu tư; (2) type hints + mypy bắt lỗi trước runtime; (3) black + ruff định dạng/lint tự động, cấu hình trong `pyproject.toml`; (4) pre-commit chặn code bẩn ở cửa commit. Nếu chỉ nhớ một điều: **cài pre-commit ngay hôm nay**.

#### Bài thực hành — Thêm type hints & format

Cho hàm `clean_text(s)` không có type. Thêm type hints đúng: tham số `s: str`, trả về `str`. Sau đó chạy `black` & `ruff check --fix`.

**Lời giải:**
```python
def clean_text(s: str) -> str:
    return " ".join(s.split()).strip()

# Sau đó chạy:
# black clean_text.py
# ruff check clean_text.py --fix
# mypy clean_text.py
```

#### Bài về nhà (BTCN)

1. Lấy một script Python cũ của bạn (≥ 50 dòng). Thêm type hints cho mọi hàm. Chạy `black`, `ruff check --fix`, `mypy` cho đến khi xanh. Nộp diff before/after.
2. Tạo `pyproject.toml` cấu hình black (line-length 88) và ruff. Viết `.pre-commit-config.yaml` và cài `pre-commit install`.
3. Refactor một hàm dài > 30 dòng thành 2-3 hàm nhỏ, mỗi hàm có docstring + type hints. Giải thích vì sao dễ đọc hơn.

---

## Tuần 6: Testing & Networking

### Buổi 12: 🧪 Testing (Pytest) & Mocking — Code có "lưới an toàn"

**Mô tả:** Không có test = sửa code trong bóng tối. pytest + mock cho phép refactor can đảm và test không gọi API thật.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | Tra bài | Hỏi: 3 công cụ quality (black/ruff/mypy) làm gì? Vì sao pre-commit? |
| 15-35 | Warm-up | Tưởng tượng: sửa hàm core, làm sao biết không phá tính năng khác? |
| 35-75 | Giảng | pytest cơ bản: viết test, assert, chạy, fixture. |
| 75-85 | ☕ Giải lao | |
| 85-130 | Giảng | TDD nhẹ. Mocking: thay thế phụ thuộc (API, DB) bằng "đối tượng giả". |
| 130-165 | Thực hành | Viết unit test có mock cho hàm gọi API. |
| 165-175 | Dặn dò | BTCN 3 bài. Chuẩn bị B13: HTTP/REST/JSON. |

#### Nội dung giảng chi tiết

##### Phần 1 — Vì sao phải test? assert & pytest cơ bản (25 phút)

Không có test, mỗi lần sửa code bạn đang "thử may rủi": mong rằng thay đổi nhỏ không vô tình phá tính năng cũ. Khi codebase lớn lên, nỗi sợ này thành *"đừng đụng vào, chạy được là may rồi"* — dấu hiệu của code mốc meo. Test tự động là **lưới an toàn**: một bộ test tốt chạy trong vài giây, báo ngay khi bạn phá thứ gì. Có test, bạn dám refactor; không có, bạn sợ đổi một dòng.

**pytest** là framework test phổ biến nhất Python vì cú pháp cực đơn giản: viết hàm tên bắt đầu bằng `test_`, dùng `assert` bình thường. pytest tự tìm mọi file `test_*.py`, chạy mọi hàm `test_*`, báo pass/fail chi tiết. Không cần class, không cần boilerplate — test nhanh gọn như viết code thường.

```python
# utils.py — hàm cần test
def clean_text(s: str) -> str:
    return " ".join(s.split()).strip()

# test_utils.py — file test (đặt cùng thư mục hoặc tests/)
from utils import clean_text

def test_clean_removes_extra_spaces():
    assert clean_text("  hello   world  ") == "hello world"

def test_clean_empty_string():
    assert clean_text("") == ""

def test_clean_raises_on_none():
    import pytest
    with pytest.raises(AttributeError):
        clean_text(None)     # None.split() → AttributeError

# Chạy: pytest test_utils.py -v
# Output: 3 passed in 0.02s
```

**Nguyên tắc viết test tốt:** (1) mỗi test kiểm *một hành vi*, tên test mô tả hành vi đó (`test_clean_removes_extra_spaces` tốt hơn `test1`); (2) cấu trúc **AAA — Arrange, Act, Assert**: chuẩn bị dữ liệu, gọi hàm, kiểm kết quả; (3) test *cả trường hợp bình thường lẫn biên* (rỗng, None, dữ liệu lớn). Một hàm có test 5 trường hợp biên thì đáng tin hơn 1 test "happy path".

> 📌 **pytest.raises cho lỗi** — Để test rằng một hàm *phải ném exception*, dùng `with pytest.raises(SomeError):`. Nếu hàm không ném → test fail. Đây là cách test error handling đúng, thay vì bắt try/except rồi im lặng.

##### Phần 2 — Fixture: setup/teardown dùng chung (15 phút)

Nhiều test cần cùng dữ liệu chuẩn (DataFrame mẫu, user giả, file tạm). Viết lại trong mỗi test thì lặp. **Fixture** là hàm setup dùng chung — pytest tự inject kết quả vào test cần nó. Khi test kết thúc, fixture có thể dọn dẹp (xóa file tạm, đóng kết nối DB). Đây là cách giữ test DRY (Don't Repeat Yourself).

```python
import pytest

@pytest.fixture
def sample_users():
    return [{"id": 1, "name": "An"}, {"id": 2, "name": "Bình"}]

def test_count(sample_users):     # pytest tự truyền fixture vào
    assert len(sample_users) == 2

def test_first_user(sample_users):
    assert sample_users[0]["name"] == "An"
```

##### Phần 3 — TDD nhẹ: viết test trước, code sau (15 phút)

**TDD (Test-Driven Development)** là vòng lặp 3 bước: **Red — Green — Refactor**. (1) Viết test mô tả hành vi mong muốn → chạy, fail (Red, vì chưa có code). (2) Viết code tối giản để test pass (Green). (3) Refactor code cho đẹp, test vẫn xanh (Refactor). Lợi ích: test định nghĩa "đúng" trước khi code, nên bạn không bao giờ viết thừa; và mỗi dòng code đều có test bảo vệ.

Trong thực tế công ty, không phải ai cũng TDD 100%, nhưng nguyên tắc "*mỗi hàm quan trọng phải có test*" là phổ biến. Đặc biệt với AI engineering — hàm parse JSON, tokenize, normalize dữ liệu — viết test trước giúp bạn nghĩ rõ về mọi edge case (input rỗng, thiếu field, kiểu sai) trước khi đụng tay vào code.

> ✅ **Khi nào test đủ?** — Không có con số ma thuật, nhưng tiêu chuẩn thực dụng: **mỗi hàm public nên có ít nhất 1 test happy path + 2-3 test edge case**. Đo coverage (`pytest --cov`) để biết bao nhiêu dòng được test — mục tiêu 70-80% là tốt, 100% thường phi thực tế.

##### Phần 4 — Mocking: test không gọi API/DB thật (25 phút)

Đây là phần quan trọng nhất của buổi. Hãy tưởng tượng: bạn viết hàm `get_weather(city)` gọi API thời tiết thật. Nếu test gọi API thật → (1) chậm (mỗi test tốn 1 request mạng), (2) phụ thuộc mạng/server online, (3) tốn quota API, (4) kết quả thay đổi (nhiệt độ hôm nay khác mai) nên không thể assert cố định. **Mocking** giải quyết: thay thế lời gọi API bằng "đối tượng giả" trả về dữ liệu cố định — test chạy tức thì, không cần mạng, kết quả xác định.

**Mock** là "thùng rác giả mạo" — một đối tượng ghi nhớ mọi lời gọi và trả về gì bạn bảo nó trả. **patch** là kỹ thuật "đổi" một đối tượng thật thành mock trong phạm vi test. Khi test kết thúc, đối tượng gốc tự phục hồi. Đây là cách test code gọi API/DB/file mà không thực sự chạm tới chúng.

```python
from unittest.mock import patch
import pytest

# Hàm cần test — gọi API thật
def get_weather(city: str) -> dict:
    import requests
    resp = requests.get(f"https://api.weather.example/{city}")
    resp.raise_for_status()
    return resp.json()

# Test KHÔNG gọi API thật — mock requests.get
def test_get_weather_parses_json():
    fake = {"city": "Hanoi", "temp": 30}
    with patch("requests.get") as mock_get:
        mock_get.return_value.json.return_value = fake
        mock_get.return_value.raise_for_status.return_value = None
        result = get_weather("Hanoi")
    assert result == fake
    mock_get.assert_called_once_with("https://api.weather.example/Hanoi")

# Test trường hợp API lỗi 500
def test_get_weather_raises_on_server_error():
    import requests
    with patch("requests.get") as mock_get:
        mock_get.return_value.raise_for_status.side_effect = requests.HTTPError("500")
        with pytest.raises(requests.HTTPError):
            get_weather("Hanoi")
```

Hai test trên chạy trong mili-giây, không cần mạng, không tốn quota, và test được *cả trường hợp thành công lẫn lỗi server* — điều mà test gọi API thật không thể làm tin cậy. Trong project AI, mock đặc biệt quan trọng khi test code gọi LLM (tốn tiền, chậm, kết quả ngẫu nhiên) — mock `openai.ChatCompletion.create` trả response giả định, test tức thì và miễn phí.

> 🚫 **Sai lầm: mock quá nhiều** — Mock mọi thứ → test không còn kiểm tra hệ thống thật, chỉ kiểm tra mock tự nói với mock. Nguyên tắc: mock *ranh giới ngoài* (API, DB, file system, LLM), giữ *logic bên trong* thật. Đừng mock hàm utils bạn tự viết — test nó thật.

> 🎯 **Tổng kết buổi** — 4 ý: (1) test là lưới an toàn cho refactor; (2) pytest + assert, cấu trúc AAA; (3) TDD Red-Green-Refactor; (4) mocking thay thế API/DB/LLM để test nhanh, xác định, miễn phí. Nếu chỉ nhớ một điều: **mock ranh giới ngoài, test logic thật**.

#### Bài thực hành — Unit test có mock

Cho hàm `fetch_user(uid)` gọi API. Viết test dùng `patch` để mock `requests.get`, không gọi API thật. Assert kết quả parse đúng.

**Lời giải:**
```python
with patch("requests.get") as mock_get:
    mock_get.return_value.json.return_value = fake
    ...
```

#### Bài về nhà (BTCN)

1. Cho `clean_text(s)`. Viết 4 test pytest: happy path, chuỗi rỗng, chỉ khoảng trắng, đầu vào None (dùng `pytest.raises`). Chạy `pytest -v` và nộp output.
2. Cho hàm `get_price(symbol)` gọi API giá cổ phiếu. Viết 2 test: (a) mock trả giá 150.5, assert đúng; (b) mock trả lỗi `ConnectionError`, assert hàm ném exception.
3. Viết fixture `sample_df()` trả DataFrame pandas 3 dòng. Viết 2 test dùng fixture đó. Chạy `pytest --cov` báo coverage.

---

### Buổi 13: 🌐 HTTP, REST & JSON Schema — Ngôn ngữ của Web

**Mô tả:** Mọi hệ thống AI giao tiếp qua HTTP + JSON. Hiểu REST & JSON Schema = hiểu Function Calling của LLM (HK2) và thiết kế API đúng.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | Tra bài | Hỏi: mocking thay thế cái gì? Vì sao test không gọi API thật? |
| 15-35 | Warm-up | Đổ vai: client hỏi "lấy user số 5" — server trả gì? Vẽ luồng request/response. |
| 35-75 | Giảng | Client-Server, HTTP methods (GET/POST/PUT/DELETE), status code 2xx/4xx/5xx. |
| 75-85 | ☕ Giải lao | |
| 85-130 | Giảng | REST principle. JSON. JSON Schema & Function Calling. Postman/cURL. |
| 130-165 | Thực hành | Dùng cURL/Postman gọi API công khai. Viết JSON Schema validate. |
| 165-175 | Dặn dò | BTCN 3 bài. Chuẩn bị B14: Calling API & Error Handling (KT15'). |

#### Nội dung giảng chi tiết

##### Phần 1 — HTTP: giao thức của web (25 phút)

Mỗi lần bạn mở trang web, gọi API, tải model từ HuggingFace — đều là một **HTTP request**. Mô hình rất đơn giản: **client** (trình duyệt, code Python, app mobile) gửi request tới **server**, server trả **response**. Request mang theo: *method* (GET/POST/...), *URL* (địa chỉ), *headers* (metadata: auth token, content-type), và có thể *body* (dữ liệu gửi đi, thường là JSON). Response mang: *status code* (thành công/lỗi), headers, và body (thường JSON).

**Method** nói lên *ý định* của request. Đây không phải quy tắc cứng — server có thể làm gì cũng được — nhưng theo quy ước REST, mỗi method có ngữ nghĩa rõ.

| Method | Ý nghĩa | Có body? | Ví dụ | An toàn/Lặp lại |
|--------|---------|----------|-------|-----------------|
| **GET** | Lấy dữ liệu | Không | Lấy danh sách user | Idempotent (lặp lại OK) |
| **POST** | Tạo mới | Có | Tạo đơn hàng mới | Không idempotent |
| **PUT** | Thay thế toàn bộ | Có | Cập nhật toàn user | Idempotent |
| **PATCH** | Sửa một phần | Có | Đổi email | Không guaranteed |
| **DELETE** | Xóa | Không | Xóa user 5 | Idempotent |

> 📌 **Idempotent là gì?** — Một method idempotent = gọi nhiều lần cho cùng kết quả. `DELETE /users/5` lần đầu xóa user, lần 2-3 không còn gì để xóa nhưng vẫn OK. `POST /orders` gọi 2 lần = tạo 2 đơn. Đây là vì sao nút "Thanh toán" luôn POST và phải chống double-click ở frontend.

##### Phần 2 — Status code: ngôn ngữ lỗi của HTTP (15 phút)

Mỗi response kèm **status code** — 3 chữ số nói lên kết quả. Hiểu các nhóm chính là kỹ năng sinh tồn khi debug API.

| Nhóm | Ý nghĩa | Ví dụ phổ biến | Xử lý |
|------|---------|----------------|-------|
| **2xx** | Thành công | 200 OK, 201 Created, 204 No Content | Tiến hành parse body |
| **3xx** | Chuyển hướng | 301 Moved, 304 Not Modified | Theo redirect (thường tự động) |
| **4xx** | Lỗi client (request sai) | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests | Sửa request của bạn |
| **5xx** | Lỗi server | 500 Internal, 502 Bad Gateway, 503 Service Unavailable | Thử lại / báo admin server |

Quy tắc debug: **4xx = lỗi của bạn** (sai URL, thiếu auth, body sai format), **5xx = lỗi của server** (bug bên kia, server quá tải). 401 vs 403: `401 Unauthorized` = chưa đăng nhập / token sai; `403 Forbidden` = đã đăng nhập nhưng không có quyền. `429` = bị rate-limit — phải backoff và thử lại chậm hơn.

> ⚠️ **requests không tự ném lỗi cho 4xx/5xx!** — Mặc định, `requests.get(...)` *không* raise exception khi server trả 404 hay 500 — nó vẫn trả object response bình thường. Bạn phải gọi `resp.raise_for_status()` để ép raise. Quên bước này = code im lặng chạy tiếp với dữ liệu rác. (Sẽ thực hành chi tiết ở B14.)

##### Phần 3 — REST & JSON (25 phút)

**REST** (Representational State Transfer) là phong cách thiết kế API dùng HTTP để thao tác "*resource*" (tài nguyên: user, order, document). Ý tưởng cốt lõi: URL đại diện cho tài nguyên, method đại diện cho hành động. `GET /users` lấy danh sách user, `GET /users/5` lấy user cụ thể, `POST /users` tạo user mới, `DELETE /users/5` xóa. Đây là quy ước phổ biến — khi bạn gọi API của OpenAI, HuggingFace, GitHub... đều theo REST.

**JSON** (JavaScript Object Notation) là định dạng trao đổi dữ liệu trên web. Gần như mọi API hiện đại trả JSON vì nó nhẹ, dễ đọc, hỗ trợ mọi ngôn ngữ. JSON chỉ có vài kiểu: *object* `{}`, *array* `[]`, *string* (luôn nháy kép), *number*, *boolean*, *null*. Không có comment, không có date type (ngày phải thành string ISO). Python `json` module chuyển qua lại giữa dict Python và JSON text.

```python
import json

# dict Python → chuỗi JSON
data = {"name": "An", "age": 25, "skills": ["python", "ai"]}
text = json.dumps(data, ensure_ascii=False, indent=2)

# chuỗi JSON → dict Python
parsed = json.loads(text)
print(parsed["skills"][0])   # "python"
```

##### Phần 4 — JSON Schema & Function Calling (20 phút)

**JSON Schema** là "mô tả cấu trúc" của một JSON — tương tự type hint cho dict. Nó chỉ rõ: field nào bắt buộc, kiểu gì, giá trị hợp lệ. Khi LLM gọi tool (Function Calling, HK2), bạn phải cung cấp JSON Schema mô tả tham số — LLM sẽ trả JSON tuân theo schema đó. Hiểu JSON Schema = hiểu cốt lõi của Function Calling, Structured Output, và validation API.

```json
{
  "type": "object",
  "properties": {
    "city": {"type": "string", "description": "Tên thành phố"},
    "days": {"type": "integer", "minimum": 1, "maximum": 7}
  },
  "required": ["city"]
}
```

Trong Python, thư viện `pydantic` là cách "Python-native" để định nghĩa schema và validate JSON. Bạn viết class Python với type hints, pydantic tự kiểm tra dữ liệu đầu vào — nếu sai kiểu/thiếu field → ném exception với thông báo rõ ràng. Đây chính là nền của FastAPI (HK4) và của structured output với LLM.

```python
from pydantic import BaseModel

class WeatherRequest(BaseModel):
    city: str
    days: int = 1

req = WeatherRequest(**{"city": "Hanoi", "days": 3})   # OK
req = WeatherRequest(**{"days": 3})              # ValidationError: city required
req = WeatherRequest(**{"city": "Hanoi", "days": "abc"})  # ValidationError: days phải int
```

##### Phần 5 — cURL & Postman: test API bằng tay (10 phút)

**cURL** là công cụ dòng lệnh gửi HTTP request — có sẵn mọi hệ điều hành, không cần cài. Là cách nhanh nhất để "thử" một API trước khi viết code. **Postman** (hoặc alternatives: Insomnia, Bruno) là GUI thân thiện cho việc này: lưu request, set header, xem response đẹp.

```bash
# GET đơn giản
curl https://api.github.com/users/torvalds

# GET với query param & header auth
curl "https://api.example.com/users?limit=10" \
  -H "Authorization: Bearer sk-..."

# POST với body JSON
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "An", "age": 25}'

# -i: hiện header response · -v: verbose · -o file.json: lưu body
```

> 🎯 **JSON cho Function Calling** — Khi LLM gọi tool (HK2), nó trả JSON tuân theo **JSON Schema** bạn cung cấp. Hiểu JSON chặt chẽ (object/array/string, required field, nested) = Function Calling đúng, structured output đúng. Đây là kỹ năng nền cho toàn bộ HK2 (Agent) và HK4 (LLMOps API).

> 🎯 **Tổng kết buổi** — 5 ý: (1) client↔server qua HTTP request/response; (2) method nói ý định, status code nói kết quả; (3) REST = URL là resource, method là hành động; (4) JSON là format trao đổi, JSON Schema/pydantic validate cấu trúc; (5) cURL/Postman test API nhanh. Nếu chỉ nhớ một điều: **4xx lỗi của bạn, 5xx lỗi server**.

#### Bài thực hành — Viết JSON Schema cho tool

LLM cần gọi tool `search_docs(query, top_k)`. Viết JSON Schema (object): `query` string required, `top_k` integer default 5. Dùng cURL gọi 1 API công khai (jsonplaceholder) và parse JSON.

**Lời giải:**
```json
{
  "type": "object",
  "properties": {
    "query": {"type": "string"},
    "top_k": {"type": "integer", "default": 5}
  },
  "required": ["query"]
}

# cURL gọi API công khai:
# curl https://jsonplaceholder.typicode.com/users/1
```

#### Bài về nhà (BTCN)

1. Dùng cURL gọi `https://jsonplaceholder.typicode.com/posts`. Lưu body vào `posts.json`. Viết script Python đọc file, dùng `json.load`, in 3 post đầu.
2. Viết JSON Schema cho object `{"username": str, "email": str, "age": int}` với `username` và `email` required, `age` minimum 13. Dùng `jsonschema` hoặc pydantic validate 2 sample (1 hợp lệ, 1 sai).
3. Trong Postman/cURL: gọi 1 API cần auth token (dùng GitHub Personal Access Token). Quan sát status 401 khi thiếu token, 200 khi có. Ghi lại observations.

---

## Tuần 7: API & Docker

### Buổi 14: 🔌 Calling API & Error Handling — Code không chết giữa chừng

**Mô tả:** requests/httpx để gọi API. try/except, timeout, raise_for_status, retry — viết code chịu đựng mạng chập chờn, server sập, JSON lỗi.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | 📝 KT 15 PHÚT #4 | HTTP/REST/JSON — method, status code, JSON Schema. |
| 15-35 | Warm-up | Sửa script gọi API "chạy tốt hôm qua, hôm nay treo". Tại sao? |
| 35-75 | Giảng | requests/httpx: get/post, headers, params, parse .json(). |
| 75-85 | ☕ Giải lao | |
| 85-130 | Giảng | Error handling: try/except, timeout, raise_for_status, retry/backoff. |
| 130-165 | Thực hành | Viết hàm gọi API bền vững: timeout + retry + raise_for_status. |
| 165-175 | Dặn dò | Trả KT. BTCN 3 bài. Chuẩn bị B15: Docker. |

#### Nội dung giảng chi tiết

##### Phần 1 — requests & httpx: gọi HTTP từ Python (25 phút)

**requests** là thư viện HTTP "con người dành cho con người" — API rõ ràng, dễ đọc, mặc định hợp lý. Hầu hết tutorial và code cũ dùng requests. **httpx** là em út hiện đại hơn: API gần như giống hệt requests, nhưng hỗ trợ *async* (gọi đồng thời nhiều request — quan trọng cho throughput cao) và HTTP/2. Trong project AI mới, httpx đang trở thành mặc định; với code học tập, requests vẫn hoàn toàn chấp nhận được.

Cấu trúc gọi API cơ bản: tạo request với URL (+ params, + headers, + body), nhận response, kiểm tra status, parse JSON. Quy trình tưởng đơn giản nhưng mỗi bước có cạm bẫy — bài này đi qua từng cái.

```python
import requests

# GET với query param & header
resp = requests.get(
    "https://api.github.com/users/torvalds",
    params={"per_page": 10},
    headers={"Authorization": "Bearer ghp_..."},
    timeout=10,                       # LUÔN đặt timeout!
)
resp.raise_for_status()               # ném lỗi nếu 4xx/5xx
data = resp.json()                    # parse body JSON → dict
print(data["login"])

# POST với body JSON
resp = requests.post(
    "https://api.example.com/orders",
    json={"item": "book", "qty": 2},   # json= tự set header & serialize
    timeout=10,
)
resp.raise_for_status()
```

**json= vs data=:** truyền `json={...}` thì requests tự serialize và set `Content-Type: application/json` — đây là cách đúng. Truyền `data={...}` thì gửi dạng form, thường không phải ý bạn. Khi gọi API LLM (OpenAI, Anthropic), luôn dùng `json=`.

##### Phần 2 — timeout: chống treo vĩnh viễn (15 phút)

Bom giấu lớn nhất của người mới: gọi API *không đặt timeout*. requests mặc định **không có timeout** — nếu server im lặng (gói tin mất, server treo), code chờ *vĩnh viễn*. Trong pipeline chạy batch, một request treo = cả pipeline đứng. **Quy tắc tuyệt đối: mỗi request phải có timeout.**

```python
import requests

# Timeout đơn (số giây tổng)
requests.get(url, timeout=10)

# Timeout đôi: (connect, read) — connect để kết nối, read để nhận data
requests.get(url, timeout=(5, 30))   # 5s kết nối, 30s đọc

# Timeout quá → raise requests.exceptions.ReadTimeout/ConnectTimeout
```

> 🚫 **Không bao giờ bỏ timeout!** — Một dòng `requests.get(url)` không timeout trong CI = CI treo 6 tiếng rồi bị kill. Trong production = thread pool cạn kiệt, service sập. Đây là lỗi "yên lặng chết người". Luôn đặt timeout, ngay cả khi "chỉ test thử".

##### Phần 3 — raise_for_status & try/except (20 phút)

Như đã nói ở B13: requests *không tự* raise exception khi status là 4xx/5xx. Nếu bạn quên kiểm tra, code parse body rác (thường là JSON lỗi `{"error": "..."}`) và tiếp tục như không có chuyện gì → bug khó tìm vì không báo lỗi. **`resp.raise_for_status()`** là cách chuẩn: nó raise `HTTPError` nếu status ≥ 400.

Nhưng raise rồi phải *bắt*. Khối **try/except** cho phép bạn phản ứng khác nhau tùy loại lỗi: timeout → thử lại, 401 → refresh token, 404 → bỏ qua, 500 → báo admin. Đây là cốt lõi của "error handling" — không phải bắt mọi exception chung một chỗ, mà xử lý từng loại phù hợp.

```python
import requests, time

def fetch_user(uid: int) -> dict | None:
    url = f"https://api.example.com/users/{uid}"
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()          # raise nếu 4xx/5xx
        return resp.json()
    except requests.exceptions.HTTPError as e:
        if resp.status_code == 404:
            print(f"user {uid} không tồn tại")
            return None
        print(f"HTTP error: {e}")
        raise                            # lỗi nghiêm trọng → re-raise
    except requests.exceptions.Timeout:
        print("timeout, thử lại...")
        return fetch_user(uid)             # retry đơn giản
    except requests.exceptions.RequestException as e:
        print(f"lỗi mạng: {e}")
        raise
```

> ⚠️ **Đừng bắt Exception trần!** — `except Exception:` (hoặc `except:` trần) nuốt *mọi* lỗi kể cả bug logic, KeyboardInterrupt → code "chạy nhưng sai âm thầm". Bắt *cụ thể* từng loại exception (HTTPError, Timeout, ConnectionError), để bug thật sự nổi lên.

##### Phần 4 — Retry & backoff: chịu đựng mạng tồi (15 phút)

API thật không ổn định: đôi khi 500, 429 (rate limit), timeout. Code production phải **thử lại** với chiến lược *backoff* — chờ lâu dần giữa các lần thử (1s, 2s, 4s, 8s) để tránh "đánh" server khi nó đang quá tải. Có thể viết tay (như trên) hoặc dùng thư viện `tenacity` / `httpx-retries` cho code sạch hơn.

```python
from tenacity import retry, stop_after_attempt, wait_exponential
import requests

@retry(stop=stop_after_attempt(4), wait=wait_exponential(multiplier=1, max=10))
def fetch_with_retry(url: str) -> dict:
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()       # raise → tenacity tự retry
    return resp.json()

# Thử tối đa 4 lần, chờ 1s → 2s → 4s → 8s (capped 10s)
```

> 🎯 **Pattern production** — Pipeline AI gọi API thường: (1) timeout ngắn (5-30s), (2) retry 3 lần với backoff, (3) bỏ qua lỗi 4xx (client sai, retry vô ích), (4) retry lỗi 5xx/timeout/mạng, (5) ghi log mỗi lần retry. Đây chính là pattern mà LangChain/LlamaIndex dùng nội bộ khi gọi LLM.

> 🎯 **Tổng kết buổi** — 4 ý: (1) requests/httpx gọi HTTP, dùng `json=` cho body; (2) **luôn** đặt timeout; (3) `raise_for_status()` + try/except cụ thể để xử lý lỗi đúng; (4) retry với backoff cho mạng tồi. Nếu chỉ nhớ một điều: **timeout + raise_for_status cho mọi request**.

#### Bài thực hành — Hàm gọi API bền vững

Viết `safe_get(url)`: dùng requests.get với `timeout=10`, gọi `raise_for_status()` trong try, except HTTPError trả `None`, except Timeout trả `None`. Trả `.json()` nếu OK.

**Lời giải:**
```python
resp = requests.get(url, timeout=10)
resp.raise_for_status()
return resp.json()
```

#### Bài về nhà (BTCN)

1. Viết `fetch_all(pages)` gọi `https://jsonplaceholder.typicode.com/posts?_page=N` cho N từ 1..pages. Mỗi request timeout 5s, raise_for_status, parse JSON. Trả list tất cả post. In tổng số post lấy được.
2. Thêm retry: dùng `tenacity` decorator `@retry(stop=stop_after_attempt(3), wait=wait_exponential())` cho hàm gọi API. Test bằng cách gọi 1 URL chắc chắn 404 → quan sát retry.
3. Viết unit test (pytest) cho hàm `safe_get`: mock `requests.get` trả (a) status 200 + JSON, (b) raise HTTPError, (c) raise Timeout. Assert hành vi đúng cho mỗi case.

---

### Buổi 15: 🐳 Docker Mastery & Compose — "Chạy ở đâu cũng giống nhau"

**Mô tả:** Chấm dứt câu nói đau lòng "trên máy tôi chạy được". Dockerfile đóng gói code + môi trường; docker-compose chạy nhiều service cùng lúc. Nền cho deploy (HK4 LLMOps).

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | Tra bài | Hỏi: 3 layer error handling khi gọi API? Vì sao phải timeout? |
| 15-35 | Warm-up | Tưởng tượng: đồng nghiệp gửi project, bạn cài 2 ngày vẫn lỗi env. Docker giải quyết thế nào? |
| 35-80 | Giảng | Image vs container. Dockerfile: FROM/WORKDIR/COPY/RUN/CMD. build & run, port mapping -p, volumes -v. |
| 80-90 | ☕ Giải lao | |
| 90-130 | Giảng | docker-compose.yml: nhiều service (app + db), networks, environment. |
| 130-165 | Thực hành | Đóng gói script Python thành image, run với -p & -v. Viết compose 2 service. |
| 165-175 | Dặn dò | BTCN 3 bài. Chuẩn bị B16: Mini-Capstone (tổng hợp HK0). |

#### Nội dung giảng chi tiết

##### Phần 1 — Vì sao Docker? Image vs Container (20 phút)

Vấn đề kinh điển: bạn viết code trên máy Windows với Python 3.12, đẩy lên server Ubuntu có Python 3.9 — crash vì khác phiên bản thư viện. Hoặc mô hình AI cần CUDA 11.8, server có CUDA 12.1 — không tương thích. Mỗi môi trường là một tổ hợp: hệ điều hành, trình thông dịch, thư viện hệ thống, gói Python. "*Trên máy tôi chạy được*" vì môi trường của tôi khác môi trường của bạn. **Docker** giải quyết tận gốc: đóng gói *code + toàn bộ môi trường* thành một **image** bất biến. Image chạy ở đâu — laptop, server, cloud — cũng cho kết quả giống hệt.

Phân biệt hai khái niệm then chốt: **image** là "bản gốc" chỉ-đọc (template), chứa filesystem đầy đủ (OS + Python + thư viện + code). **container** là "instance đang chạy" của image — giống như class vs object, hay recipe vs món ăn đã nấu. Một image có thể spawn nhiều container cùng chạy. `docker build` tạo image từ Dockerfile, `docker run` chạy container từ image.

| Khái niệm | Ảnh | Tương đương Python |
|----------|-----|---------------------|
| Dockerfile | Công thức nấu | requirements.txt + setup.py |
| Image | Bản gốc chỉ-đọc | Class |
| Container | Instance đang chạy | Object |
| Registry (Docker Hub) | Kho tải ảnh | PyPI |

> 📌 **Docker cho AI** — Deploy mô hình AI = đóng gói code + Python + PyTorch/TensorFlow + weights thành 1 image → chạy ở đâu cũng giống nhau. Cloud AI (AWS SageMaker, GCP Vertex, Azure ML) đều nhận Docker image. HK4 LLMOps dựa hoàn toàn trên Docker + Kubernetes.

##### Phần 2 — Dockerfile: công thức đóng gói (25 phút)

**Dockerfile** là file text mô tả cách xây image. Mỗi dòng là một *instruction* (chỉ thị), tạo ra một "lớp" (layer) mới. Docker cache layer nên rebuild sau khi đổi code rất nhanh (chỉ layer bị thay đổi rebuild). Thứ tự instruction quan trọng: đặt layer ít đổi (cài thư viện) trước, layer hay đổi (code) sau — để tận dụng cache.

```dockerfile
# Image cơ sở — luôn có tag cụ thể, tránh :latest
FROM python:3.11-slim

# Thư mục làm việc trong container
WORKDIR /app

# Copy requirements TRƯỚC code → cache khi code đổi
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy code SAU (layer này đổi nhiều, không phá cache pip)
COPY . .

# Lệnh chạy khi container khởi động
CMD ["python", "main.py"]
```

Các instruction phổ biến: **FROM** (image cơ sở), **WORKDIR** (thư mục làm việc), **COPY** (chép file từ máy vào image), **RUN** (chạy lệnh shell khi build — thường cài đặt), **CMD** (lệnh mặc định khi container chạy), **ENV** (biến môi trường), **EXPOSE** (khai báo port). Phân biệt RUN (lúc build) vs CMD (lúc chạy) là điểm hay nhầm.

> ⚠️ **Cạm bẫy phổ biến** — (1) Dùng `FROM python:latest` → version đổi bất ngờ, image khác nhau giữa các build. Luôn pin tag cụ thể. (2) `COPY . .` đầu tiên → mỗi lần đổi code rebuild cả `pip install` (chậm). Copy requirements trước. (3) Quên `.dockerignore` → copy cả `.git`, `__pycache__`, data lớn vào image → image phình to.

##### Phần 3 — build, run, port mapping -p, volumes -v (20 phút)

Sau khi viết Dockerfile, build thành image rồi run thành container. Hai cờ cực quan trọng: **-p** (port mapping) và **-v** (volume mapping). Port mapping kết nối port máy thật với port container (vì container có network riêng, không tự thấy được từ ngoài). Volume mapping gắn thư mục máy thật vào container — để data tồn tại sau khi container xóa, và để code sửa tức thì (không cần rebuild).

```bash
# Build image từ Dockerfile trong thư mục hiện tại, đặt tên myapp:v1
docker build -t myapp:v1 .

# Run container, map port 8000 máy thật → 8000 container
docker run -p 8000:8000 myapp:v1

# Run với volume: gắn ./data (máy) → /app/data (container)
docker run -p 8000:8000 -v $(pwd)/data:/app/data myapp:v1

# Run nền (-d), với env var (-e), tự xóa khi xong (--rm)
docker run -d -e API_KEY=sk-... --rm -p 8000:8000 myapp:v1

# Xem container đang chạy
docker ps                       # đang chạy
docker ps -a                    # tất cả (kể cả đã dừng)
docker logs <container_id>      # xem log
docker stop <id> && docker rm <id>   # dừng & xóa
```

**Port mapping `-p HOST:CONTAINER`:** ứng dụng trong container nghe ở port 8000 (của container), nhưng từ trình duyệt máy bạn truy cập `localhost:8000` — cần `-p 8000:8000` để Docker "chuyển tiếp". Không có `-p`, container chạy nhưng không ai gọi được từ ngoài.

**Volume `-v HOST:CONTAINER`:** container có filesystem riêng, tách biệt máy thật — khi container xóa, data mất. Để data tồn tại (DB, file đã xử lý), gắn volume: data thực sự nằm ở máy thật, container chỉ "nhìn" vào. Trong dev AI, volume cũng cho phép sửa code máy thật → container thấy ngay (không rebuild).

##### Phần 4 — docker-compose: điều phối nhiều service (20 phút)

Một ứng dụng thật hiếm khi chỉ 1 service: thường có app + database + cache + queue. Chạy từng `docker run` thủ công với port/volume/env thật dài là đau khổ. **docker-compose** giải quyết: định nghĩa toàn bộ stack trong 1 file `docker-compose.yml`, một lệnh `docker compose up` chạy tất cả cùng lúc, `down` dừng tất cả.

```yaml
# docker-compose.yml
services:
  app:
    build: .                      # build từ Dockerfile cùng thư mục
    ports:
      - "8000:8000"
    volumes:
      - ./src:/app/src            # code mount để hot-reload
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
      - API_KEY=${API_KEY}        # đọc từ .env máy thật
    depends_on:
      - db                        # đợi db lên trước

  db:
    image: postgres:16-alpine     # dùng image có sẵn
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data   # volume có tên (persistent)

volumes:
  pgdata:                         # khai báo volume có tên
```

```bash
# bash · docker compose
docker compose up -d              # build + chạy tất cả service, nền
docker compose logs -f app        # xem log service app realtime
docker compose down               # dừng & xóa container/network
docker compose down -v            # xóa luôn volume (mất data!)
```

> 🎯 **Production pattern** — Trong thực tế, file compose định nghĩa *toàn bộ* môi trường dev: ai clone repo về chỉ cần `docker compose up` là chạy được — không cài đặt thủ công, không "trên máy tôi được". Đây là tiêu chuẩn open-source project hiện đại. HK4 LLMOps mở rộng pattern này ra Kubernetes cho scale.

> 🎯 **Tổng kết buổi** — 4 ý: (1) image = template bất biến, container = instance chạy; (2) Dockerfile: FROM/WORKDIR/COPY(requirements trước)/RUN/CMD, pin tag; (3) `-p HOST:CONTAINER` cho port, `-v HOST:CONTAINER` cho volume; (4) compose định nghĩa nhiều service, `up/down` điều phối. Nếu chỉ nhớ một điều: **copy requirements.txt trước code**.

#### Bài thực hành — Đóng gói script Python

Viết Dockerfile cho app đọc CSV & in số dòng: `FROM python:3.11-slim`, `WORKDIR /app`, `RUN pip install pandas`, `COPY app.py .`, `CMD ["python","app.py"]`.

**Lời giải:**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
RUN pip install pandas
COPY app.py .
CMD ["python", "app.py"]

# Build & run:
# docker build -t csvapp .
# docker run -v $(pwd)/data:/app/data csvapp
```

#### Bài về nhà (BTCN)

1. Viết `Dockerfile` cho script Python (FastAPI đơn giản hoặc script xử lý). Build image `myapp:v1`, run với `-p 8000:8000`, curl `localhost:8000` thấy response. Viết `.dockerignore` loại trừ `.git`, `__pycache__`, `.venv`.
2. Viết `docker-compose.yml` 2 service: `app` (build từ Dockerfile của bạn) + `redis` (image `redis:7-alpine`). `docker compose up -d`, kiểm tra cả 2 chạy. `docker compose down`.
3. Thử nghiệm cache layer: đổi 1 dòng code Python, rebuild (`docker build`). Quan sát rằng layer `RUN pip install` dùng cache (nhanh). Sau đó đổi `requirements.txt`, rebuild — quan sát layer pip phải chạy lại.

---

## Tuần 8: Capstone

### Buổi 16: 🏆 Survival Pipeline — Tổng hợp toàn HK0 (Mini-Capstone)

**Mô tả:** Dựng 1 pipeline thật: kéo data từ API → xử lý bằng Hash Map → xuất JSON → đóng gói Docker → nộp qua Pull Request. Mọi kỹ năng B1-B15 hội tụ.

#### Timeline

| Thời gian | Hoạt động | Mô tả |
|-----------|-----------|-------|
| 0-15 | Khởi động | Tổng kết nhanh HK0: 15 buổi học được gì. Đề bài Capstone. |
| 15-40 | Hướng dẫn | Kiến trúc pipeline: fetch → transform → export. Review checklist rubric. |
| 40-90 | Làm Capstone (phần 1) | Setup repo + Git branch + hàm fetch API có retry + Hash Map transform. |
| 90-100 | ☕ Giải lao | |
| 100-145 | Làm Capstone (phần 2) | Xuất JSON + pytest (mock API) + Dockerfile + docker run. |
| 145-165 | Demo & PR | Mỗi học viên mở PR, review chéo 1 bạn, demo `docker run`. |
| 165-175 | Tổng kết HK0 | Nhận xét chung. Bàn giao HK1: Toán cho AI. |

#### Nội dung giảng chi tiết

##### Phần 1 — Tại sao Capstone? (15 phút)

Học từng kỹ năng rời rạc (Git, Python, API, Docker...) như học từng nhạc cụ riêng. Capstone là dịp **kết hợp tất cả** thành một bản hòa tấu — và đó chính là cách công ty đánh giá kỹ sư: không phải "biết Docker", mà là "có thể dựng 1 pipeline Docker hóa chạy được, có test, qua code review". Học sinh ra HK0 với một project concrete để khoe trên CV/GitHub, chứng minh "*tôi có thể ship*".

Bài Capstone này tên **Survival Pipeline** — vì nó tổng hợp đúng những kỹ năng "sinh tồn" trong công việc AI Engineer hằng ngày: kéo dữ liệu từ API (rất nhiều API nội bộ và ngoài), làm sạch/biến đổi (Hash Map, dedupe), xuất kết quả (JSON), đóng gói (Docker), và làm việc nhóm (Git PR). Nếu làm được bài này, bạn sẽ không bị "ngợp" khi vào project thật ở HK1 trở đi.

> 🎯 **Triết lý Capstone** — Mục tiêu KHÔNG phải làm mô hình AI phức tạp — mà là **workflow production**: code sạch, có test, đóng gói được, chạy được trên máy khác, review được. Đây là ranh giới giữa "script chạy trên laptop tôi" và "software thật sự".

##### Phần 2 — Kiến trúc pipeline & checklist rubric (25 phút)

Pipeline theo pattern kinh điển **ETL — Extract, Transform, Load**: (1) **Extract**: gọi API lấy dữ liệu (B14 calling API, có timeout/retry). (2) **Transform**: làm sạch, dedupe bằng Hash Map (B9), đếm tần suất, tổng hợp (B10 queue nếu cần batch). (3) **Load**: xuất ra file JSON (B13) để service khác tiêu thụ. Đây chính là kiến trúc của mọi data pipeline, RAG ingestion, batch processing — lặp đi lặp lại trong toàn bộ hành trình AI.

```python
# pipeline.py — khung ETL
import json, logging
from tenacity import retry, stop_after_attempt, wait_exponential
import requests

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, max=8))
def extract(url: str) -> list[dict]:
    """Gọi API có retry. Raise nếu 4xx/5xx."""
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    return resp.json()

def transform(records: list[dict]) -> dict:
    """Dedupe + đếm tần suất theo userId — Hash Map O(n)."""
    seen_ids = set()                      # Hash Map (set) để dedupe
    freq: dict[int, int] = {}             # Hash Map (dict) đếm tần suất
    unique = []
    for r in records:
        uid = r.get("userId")
        if r["id"] in seen_ids:        # O(1) lookup
            continue
        seen_ids.add(r["id"])
        unique.append(r)
        freq[uid] = freq.get(uid, 0) + 1
    return {"unique_count": len(unique), "per_user": freq}

def load(result: dict, path: str) -> None:
    """Xuất JSON."""
    with open(path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    log.info("wrote %s", path)

def main():
    data = extract("https://jsonplaceholder.typicode.com/posts")
    result = transform(data)
    load(result, "/app/output/result.json")

if __name__ == "__main__":
    main()
```

**Checklist rubric Capstone** (mỗi mục là kỹ năng từ 1 buổi):

| Yêu cầu | Kỹ năng | Từ buổi |
|---------|---------|---------|
| Repo Git có branch + commit convention + PR | Git workflow | B3-B4 |
| Hàm fetch API có timeout + raise_for_status + retry | Calling API + error handling | B14 |
| Transform dùng Hash Map (dedupe O(n), không O(n²)) | DSA Big-O + Hash Map | B9 |
| Xuất JSON đúng format (json.dump, ensure_ascii=False) | HTTP/REST/JSON | B13 |
| Type hints + chạy đen black/ruff/mypy | Clean code | B11 |
| pytest ≥ 3 test, có mock API (không gọi thật) | Testing + mocking | B12 |
| Dockerfile + `docker run` chạy được | Docker | B15 |
| README ngắn + .env.example (không hardcode key) | Env vars / security | B2, B7 |

##### Phần 3 — Test pipeline với mock (15 phút)

Capstone yêu cầu test KHÔNG gọi API thật (B12 mocking). Mock `requests.get` trả data giả, test transform/load chạy đúng. Đây là cơ hội thực hành pattern "mock ranh giới ngoài, test logic thật".

```python
# test_pipeline.py
from unittest.mock import patch
import json, os, pytest
from pipeline import extract, transform, load

SAMPLE = [
    {"id": 1, "userId": 1, "title": "a"},
    {"id": 2, "userId": 1, "title": "b"},
    {"id": 1, "userId": 1, "title": "dup"},   # trùng id
]

def test_transform_dedupes_and_counts():
    result = transform(SAMPLE)
    assert result["unique_count"] == 2          # bỏ 1 trùng
    assert result["per_user"] == {1: 2}

def test_extract_uses_retry_and_parses():
    with patch("requests.get") as mock_get:
        mock_get.return_value.json.return_value = SAMPLE
        mock_get.return_value.raise_for_status.return_value = None
        out = extract("http://x")
    assert out == SAMPLE
    mock_get.assert_called_once_with("http://x", timeout=10)

def test_load_writes_valid_json(tmp_path):
    fp = tmp_path / "out.json"
    load({"unique_count": 5}, str(fp))
    assert json.loads(fp.read_text())["unique_count"] == 5
```

##### Phần 4 — Đóng gói Docker & nộp PR (15 phút)

Bước cuối: đóng gói pipeline thành Docker image, `docker run` chạy được trên máy khác (B15). Mọi API key qua biến môi trường (B2/B7), không hardcode. Sau đó mở Pull Request để review — chính là workflow công ty (B4).

```dockerfile
# Dockerfile · Capstone
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY pipeline.py .
RUN mkdir -p /app/output
ENV OUTPUT_DIR=/app/output
CMD ["python", "pipeline.py"]
```

```bash
# bash · build, run, nộp PR
# Build & chạy pipeline trong Docker, mount volume lấy output
docker build -t survival-pipeline:v1 .
docker run --rm -v $(pwd)/output:/app/output survival-pipeline:v1
cat output/result.json

# Workflow Git PR
git checkout -b feature/survival-pipeline
git add .
git commit -m "feat: add survival pipeline (ETL + test + Docker)"
git push origin feature/survival-pipeline
# → Mở PR trên GitHub, gắn @reviewer, mô tả + screenshot docker run
```

> 🚫 **Không hardcode API key trong code!** — Mọi URL/key/secret → biến môi trường + `.env` (loại trừ khỏi Git bằng `.gitignore`). Nộp kèm `.env.example` với giá trị giả. Hardcode key rồi push lên GitHub = key bị scrape bot trong vài phút. (Liên hệ HK1 M9 Security.)

#### MINI-CAPSTONE HK0 — Survival Pipeline (Cá nhân)

Dựng 1 ETL pipeline chạy được end-to-end, đóng gói Docker, nộp qua PR. Tổng hợp toàn bộ B1-B15.

- **Extract**: hàm gọi API công khai (jsonplaceholder hoặc tương tự), có timeout + raise_for_status + retry (tenacity).
- **Transform**: dedupe bằng Hash Map (set), đếm tần suất (dict). O(n), không O(n²).
- **Load**: xuất `result.json` (json.dump, ensure_ascii=False).
- **Code quality**: type hints đầy đủ, black + ruff + mypy chạy xanh.
- **Test**: pytest ≥ 3 test, mock API (không gọi thật). `pytest --cov` ≥ 70%.
- **Docker**: Dockerfile + `docker run` chạy được trên máy khác, output qua volume.
- **Git**: branch riêng, commit convention, PR có mô tả + screenshot.
- **README**: hướng dẫn build/run, `.env.example` không có key thật.

**Rubric chấm:** Pipeline chạy đúng output · Hash Map O(n) · Test pass ≥ 3 + mock · Docker run được · Type hints + lint xanh · PR có review · README rõ · Không hardcode key. **Trọng số: 30% HK0.**

#### Bài về nhà (hoàn thiện Capstone)

1. Hoàn thiện pipeline: thêm xử lý edge case (API rỗng, JSON thiếu field) với try/except cụ thể. Thêm logging (`logging` module) thay vì print.
2. Thêm 2 test nữa: (a) test transform với input rỗng → trả `unique_count=0`; (b) test extract raise khi mock trả HTTPError 500 (dùng `pytest.raises`).
3. Mở PR chính thức, gắn link repo + link PR vào bài nộp LMS. Review chéo 1 bạn khác (comment ít nhất 2 góp ý). Sau khi approve, merge vào main. Đây là deliverable cuối HK0.

> 🎓 **Hoàn tất HK0 — Bạn đã sẵn sàng!** Bạn giờ có khả năng **"vibe code" chuẩn công ty**: terminal Linux, Git/PR workflow, Python env/packaging, hiểu phần cứng (tránh OOM), DSA thực dụng (Big-O + Hash Map + Queue/Stack), code quality (type hints + black/ruff/mypy + pre-commit), testing + mocking, networking/API/JSON, error handling bền vững, Docker đóng gói. **Nền móng vững** — sẵn sàng bước vào HK1 (Toán cho AI) mà không bị kẹt môi trường hay workflow. Toàn bộ năng lượng từ đây dành cho AI, không còn lo "code không chạy được".

---

## Đề thi

### 📝 ĐỀ KT 15' #1 — B2 · Linux/CLI

- ⏱ **15'** · Điểm tối đa: **10** · Trọng số: **5%**

**Câu hỏi:**

- **C1 (2đ).** Lệnh nào liệt kê file kèm quyền? Mã quyền 755 nghĩa là gì?
- **C2 (2đ).** Vì sao file SSH private key phải `chmod 600`?
- **C3 (3đ).** Pipe là gì? `cat log.txt | grep ERROR | wc -l` làm gì?
- **C4 (3đ).** Vì sao dùng env var thay hardcode API key?

**✅ Đáp án:**
- **C1:** `ls -la`. 755 = user rwx, group rx, other rx.
- **C2:** SSH từ chối nếu key quá mở (bảo mật).
- **C3:** Nối output→input. Đếm dòng có "ERROR".
- **C4:** Bảo mật — không lên Git, đổi được theo môi trường.

---

### 📝 ĐỀ KT 15' #2 — B8 · DSA

- ⏱ **15'** · Điểm tối đa: **10** · Trọng số: **5%**

**Câu hỏi:**

- **C1 (3đ).** O(n²) với 10000 phần tử = bao nhiêu thao tác? Có chậm không?
- **C2 (3đ).** Vì sao `set` lookup O(1) mà `list` lookup O(n)?
- **C3 (4đ).** Queue (FIFO) dùng khi nào trong AI Agent?

**✅ Đáp án:**
- **C1:** 100 triệu. Rất chậm.
- **C2:** set dùng hash table → tra O(1); list phải quét từng phần tử → O(n).
- **C3:** Xếp hàng task/upload, xử lý từng mẻ không quá tải.

---

### 📝 ĐỀ GIỮA KÌ MÔN — B15 · 90'

- ⏱ **90'** · Điểm tối đa: **10** · Trọng số: **30%** · 💻 Có máy

**Câu hỏi:**

- **PHẦN 1 — Lý thuyết (4đ).**
  - (a) Linux CLI: 5 lệnh cốt lõi + tác dụng (1đ).
  - (b) Git workflow: branch→PR→merge (1đ).
  - (c) Big-O: O(1) vs O(n) vs O(n²) (1đ).
  - (d) Docker: container vs image (1đ).
- **PHẦN 2 — Thực hành (6đ).**
  - (a) Tạo Git repo, branch, commit, push (2đ).
  - (b) Viết hàm Python + pytest test (2đ).
  - (c) Viết Dockerfile cho app Python (2đ).

**✅ Đáp án tóm tắt (Thang điểm GK):**
- 8.5–10: A, ready for HK1
- 7–8.4: B
- 5.5–6.9: C, ôn Git/Docker
- <5.5: D/F

---

### 📝 ĐỀ CUỐI KÌ MÔN — B16 · 120'

- ⏱ **120'** · Điểm tối đa: **10** · Trọng số: **45%** · 💻 Có máy

**Câu hỏi:**

- **C1 (2đ).** Phân cấp bộ nhớ: Disk → RAM → VRAM. Vì sao load 100GB vào RAM 16GB crash?
- **C2 (2đ).** HTTP GET vs POST. Status 200 vs 404 vs 500.
- **C3 (3đ — code).** Viết FastAPI endpoint POST /process nhận JSON, trả kết quả. Kèm pytest.
- **C4 (3đ).** Viết Dockerfile cho endpoint C3. Build + run + curl test.

**✅ Đáp án tóm tắt:**
- **C1:** RAM nhỏ hơn dữ liệu → OOM. Cần batching/chunking.
- **C2:** GET=lấy, POST=tạo. 200=OK, 404=không tìm, 500=lỗi server.
