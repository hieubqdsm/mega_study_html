# Khóa Học Git - Từ Cơ Bản Đến Nâng Cao

> Nguồn: [khoa-hoc-git.html](khoa-hoc-git.html)

---

## 📚 Tổng Quan Khóa Học

**Mục tiêu:** Trang bị kiến thức Git toàn diện từ người mới bắt đầu đến level senior - hiểu rõ workflow, branching strategies, internals, và xử lý mọi tình huống thực tế.

**Đối tượng:**
- Developer mới đi làm, cần thành thạo Git để collab team
- DevOps Engineer cần hiểu sâu Git internals
- Tech Lead muốn thiết lập workflow chuẩn cho team
- Sinh viên IT chuẩn bị đi làm

**Số chương:** 16 chương + Glossary (200+ thuật ngữ)
**Thời gian học:** 4-6 tuần (30 phút/ngày)

---

## 🗺️ Cấu Trúc Khóa Học

### PHẦN I: NỀN TẢNG (Cơ Bản)

#### Chương 1: Giới Thiệu Git & Version Control
- 1.1. Version Control System là gì?
- 1.2. Lịch sử ra đời Git (Linus Torvalds, 2005)
- 1.3. Git vs SVN vs Mercurial
- 1.4. Centralized vs Distributed VCS
- 1.5. Git ≠ GitHub - Phân biệt
- 1.6. Tại sao mọi developer phải biết Git?

#### Chương 2: Cài Đặt & Cấu Hình
- 2.1. Cài Git trên Windows/macOS/Linux
- 2.2. Cấu hình lần đầu (`git config`)
- 2.3. SSH keys vs HTTPS authentication
- 2.4. File `.gitconfig` toàn cục
- 2.5. Git GUI clients (SourceTree, GitKraken, Fork)
- 2.6. Tích hợp Git vào VS Code

#### Chương 3: Khái Niệm Nền Tảng
- 3.1. Repository (repo) là gì?
- 3.2. 3 vùng của Git: Working Directory, Staging Area, Local Repository
- 3.3. 3 trạng thái file: Modified, Staged, Committed
- 3.4. Commit hash (SHA-1) và HEAD
- 3.5. Branch & Pointer
- 3.6. Snapshot vs Delta

#### Chương 4: Lệnh Cơ Bản
- 4.1. `git init` - Khởi tạo repository
- 4.2. `git clone` - Sao chép repo
- 4.3. `git status` - Kiểm tra trạng thái
- 4.4. `git add` - Đưa file vào staging
- 4.5. `git commit` - Tạo commit
- 4.6. `git log` - Xem lịch sử
- 4.7. `git diff` - So sánh thay đổi
- 4.8. `.gitignore` - Bỏ qua file

### PHẦN II: BRANCHING & COLLABORATION (Trung Cấp)

#### Chương 5: Branching - Nhánh
- 5.1. Tại sao cần branch?
- 5.2. `git branch` - Tạo, xóa, liệt kê
- 5.3. `git checkout` vs `git switch`
- 5.4. Đặt tên branch theo convention
- 5.5. Branch tracking
- 5.6. Detached HEAD state

#### Chương 6: Merge - Hợp Nhất
- 6.1. Fast-forward merge
- 6.2. 3-way merge
- 6.3. Squash merge
- 6.4. `--no-ff` và khi nào dùng
- 6.5. Merge commit là gì?

#### Chương 7: Remote & Collaboration
- 7.1. `git remote` - Quản lý remote
- 7.2. `git fetch` vs `git pull`
- 7.3. `git push` - Đẩy code
- 7.4. Origin vs Upstream
- 7.5. Force push - khi nào dùng (cẩn thận!)
- 7.6. Pull Request / Merge Request workflow

#### Chương 8: Xử Lý Conflict
- 8.1. Tại sao xảy ra conflict?
- 8.2. Cấu trúc conflict markers (<<<<<<, ======, >>>>>>)
- 8.3. Giải quyết conflict bằng VS Code
- 8.4. `git mergetool`
- 8.5. Hủy merge: `git merge --abort`
- 8.6. Chiến lược tránh conflict

### PHẦN III: UNDO & REWRITE HISTORY (Trung Cấp Nâng)

#### Chương 9: Undo - Hoàn Tác
- 9.1. `git restore` (Git 2.23+)
- 9.2. `git reset` - soft, mixed, hard
- 9.3. `git revert` - tạo commit ngược
- 9.4. Reset vs Revert vs Restore - khi nào dùng cái nào
- 9.5. `git reflog` - Cứu mạng khi mất commit
- 9.6. `git clean` - Xóa untracked files

#### Chương 10: Stash & Tag
- 10.1. `git stash` - Cất tạm thay đổi
- 10.2. Stash list, pop, apply, drop
- 10.3. `git tag` - Lightweight vs Annotated
- 10.4. Semantic Versioning (semver)
- 10.5. Push tag lên remote
- 10.6. GitHub Releases

#### Chương 11: Rebase - Nghệ Thuật Viết Lại Lịch Sử
- 11.1. Rebase vs Merge - Bản chất
- 11.2. `git rebase <branch>`
- 11.3. Interactive rebase: `rebase -i`
- 11.4. Pick, squash, fixup, reword, edit, drop
- 11.5. The Golden Rule of Rebasing
- 11.6. `git rebase --onto`

#### Chương 12: Cherry-pick & Bisect
- 12.1. `git cherry-pick` - Chọn commit
- 12.2. Cherry-pick range, mainline
- 12.3. `git bisect` - Tìm commit gây bug
- 12.4. Bisect tự động với script

### PHẦN IV: NÂNG CAO (Advanced)

#### Chương 13: Git Internals - Bên Trong Git
- 13.1. `.git` directory - bên trong có gì?
- 13.2. Git Objects: Blob, Tree, Commit, Tag
- 13.3. Refs và HEAD
- 13.4. Pack files & loose objects
- 13.5. Plumbing vs Porcelain commands
- 13.6. Garbage collection (`git gc`)

#### Chương 14: Hooks & Automation
- 14.1. Client-side hooks
- 14.2. Server-side hooks
- 14.3. pre-commit, commit-msg, pre-push
- 14.4. Husky + lint-staged
- 14.5. Conventional Commits + commitlint
- 14.6. CI/CD integration

#### Chương 15: Workflows - Chiến Lược Quản Lý Nhánh
- 15.1. Gitflow (Vincent Driessen)
- 15.2. GitHub Flow
- 15.3. GitLab Flow
- 15.4. Trunk-Based Development
- 15.5. Forking Workflow
- 15.6. Chọn workflow phù hợp dự án

#### Chương 16: Tips, Best Practices & Troubleshooting
- 16.1. Commit message chuẩn (Conventional Commits)
- 16.2. Git aliases - Tăng tốc làm việc
- 16.3. Git LFS - Quản lý file lớn
- 16.4. Submodules & Worktree
- 16.5. GPG signing commits
- 16.6. Recovery scenarios (mất commit, sai branch, push nhầm)
- 16.7. Performance: monorepo, partial clone, sparse checkout

### PHẦN V: GLOSSARY (Tra cứu)

#### Bảng Thuật Ngữ Git (200+ terms)
- Tích hợp ô tìm kiếm real-time
- Phân loại theo nhóm: Cơ bản, Nâng cao, Remote, Internal, Workflow
- Ví dụ cụ thể cho mỗi thuật ngữ
- Cross-reference giữa các thuật ngữ liên quan

---

## 🎯 Lộ Trình Học Đề Xuất

| Tuần | Nội Dung | Mục Tiêu |
|------|----------|----------|
| Tuần 1 | Chương 1-4 | Cài đặt, commit cơ bản, hiểu workflow Working → Staging → Repository |
| Tuần 2 | Chương 5-8 | Thành thạo branching, merge, push/pull, xử lý conflict |
| Tuần 3 | Chương 9-12 | Undo nâng cao, rebase, cherry-pick |
| Tuần 4 | Chương 13-14 | Git internals, hooks |
| Tuần 5 | Chương 15-16 | Workflows, best practices, troubleshooting |
| Tuần 6 | Thực hành | Áp dụng vào dự án thực tế, đóng góp open-source |

---

## 💼 Kỹ Năng Đầu Ra

Sau khóa học, học viên có thể:

✅ Sử dụng Git thuần thục trong công việc hàng ngày
✅ Hiểu rõ branching strategy & chọn workflow phù hợp
✅ Xử lý conflict, undo, rebase nâng cao
✅ Setup CI/CD với Git hooks
✅ Trả lời được câu hỏi phỏng vấn về Git (mọi level)
✅ Đọc hiểu Git Internals - phân biệt plumbing/porcelain
✅ Recovery khi gặp sự cố (mất commit, push nhầm, conflict phức tạp)
✅ Đóng góp được vào open-source projects (Pull Request workflow)

---

## 📊 Số Liệu Khóa Học

- **16 Chapters** - Trải dài từ Beginner → Expert
- **150+ Commands** - Mọi lệnh Git thường dùng
- **200+ Glossary Terms** - Tra cứu mọi thuật ngữ
- **50+ Real Examples** - Tình huống thực tế
- **20+ Diagrams** - Sơ đồ trực quan
- **Cheatsheet** - Bảng tổng hợp lệnh thường dùng
