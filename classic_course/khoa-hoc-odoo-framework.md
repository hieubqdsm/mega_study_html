# 🧩 Làm Chủ Odoo Framework (Python) — Từ Cơ Bản Đến Nâng Cao

> Bản Markdown gọn nhẹ. Phiên bản tương tác (Module Scaffold Generator, flashcards, quiz, cheatsheet) ở file `khoa-hoc-odoo-framework.html`.

Dành cho **lập trình viên đã biết Python, mới với Odoo**. Trọng tâm **backend Python** + phần **views XML** cần thiết (không đi sâu OWL/JS). **Trung lập phiên bản** — bám nguyên lý cốt lõi, ghi chú khác biệt (🔀) khi cần.

**Lộ trình:** L0 Nền tảng (1–4) → L1 ORM & Models (5–10) → L2 Logic & Tương tác (11–17) → L3 Nâng cao (18–24).

---

# L0 — NỀN TẢNG

## CH1. Odoo & kiến trúc
- Odoo = ERP + framework; mọi tính năng là **module/addon** lắp ghép, mở rộng được qua **kế thừa**.
- **3 tầng:** PostgreSQL (data) ↔ Server Python + ORM (logic — nơi làm chính) ↔ Client JS/OWL (giao diện). ~ MVC: Model (Python) / View (XML) / Controller (HTTP).
- Khái niệm: **module, model** (↔ bảng), **record** (dòng), **field** (cột), **recordset** (tập record), **env** (`self.env`), **ORM**.
- Community (LGPL, miễn phí) vs Enterprise (thương mại).
- **Triết lý:** đừng sửa core — tạo module riêng & kế thừa.

## CH2. Cài đặt & môi trường dev
- Cần: Python (đúng bản), PostgreSQL, wkhtmltopdf (report).
- Source: `git clone --branch 17.0`, venv, `pip install -r requirements.txt`, tạo user PG, chạy `odoo-bin -d dev -i base --addons-path=...`. Hoặc Docker.
- `odoo.conf`: addons_path, db_user, http_port, dev=all.
- Cờ: `-d` db, `-i` install, `-u` upgrade (**chạy mỗi khi sửa code/XML**), `--dev=all`, `--addons-path`, `--stop-after-init`.
- Scaffold: `odoo-bin scaffold my_module addons/` (hoặc dùng Scaffold Generator của khóa).

## CH3. Cấu trúc một module
- Thư mục: `__init__.py`, `__manifest__.py`, models/, views/, security/, data/, demo/, wizard/, report/, controllers/, static/, i18n/.
- `__manifest__.py`: name, version, depends (**luôn cần**), data (XML/CSV nạp khi cài — **THỨ TỰ quan trọng**), demo, application, installable, license.
- ⚠️ Thứ tự `data`: security trước view; action trước menu dùng nó. Sai → "External ID not found".
- Vòng đời: install (-i) / upgrade (-u) / uninstall.

## CH4. Module đầu tiên
- Model Python (`_name`, fields) → `ir.model.access.csv` (**bắt buộc**) → view + menu XML → `-i my_library`.
- Không khai view chi tiết → Odoo tự tạo view mặc định.
- 🔀 Bản mới: `<list>` thay `<tree>`, `view_mode` dùng `list`.

---

# L1 — ORM & MODELS

## CH5. Models
- `class X(models.Model)` với `_name`, `_description`, `_order`, `_rec_name`, `_inherit`, `_sql_constraints`.
- Loại: `Model` (có bảng), `TransientModel` (wizard), `AbstractModel` (mixin, không bảng).
- Field tự có: id, create_date/uid, write_date/uid, display_name.

## CH6. Fields cơ bản
- Char, Text, Html, Integer, Float, Boolean, Date, Datetime, Selection, Binary.
- Attrs: `string, required, default, help, readonly, index, copy, groups, tracking`.
- Tên đặc biệt: `active` (Boolean → archiving, tự lọc), `state` (Selection → vòng đời).
- default có thể là hàm: `default=fields.Date.context_today`.

## CH7. Relational fields
- **Many2one**(comodel, ondelete) = khóa ngoại. **One2many**(comodel, inverse_field) = ảo, ngược của Many2one. **Many2many**(comodel) = bảng trung gian tự động.
- ondelete: `set null` / `restrict` / `cascade`.
- Gán x2many bằng **Command**: `Command.set([ids])`, `.link(id)`, `.unlink(id)`, `.create({})`, `.clear()`. 🔀 cũ: tuple `(6,0,[ids])`, `(4,id)`, `(0,0,{})`.

## CH8. Computed, related, onchange
- **Computed:** `compute="_m"`, lặp `for rec in self`, `@api.depends(...)`, `store=True` nếu cần search/sort.
- **Related:** `fields.Char(related="author_id.city", store=True)`.
- **onchange:** `@api.onchange("x")` — gợi ý trên form (chưa lưu); có thể trả `warning`.
- Xu hướng: ưu tiên computed (+ inverse) hơn onchange vì đúng trên mọi luồng.

## CH9. ORM API & recordset
- CRUD: `create({}/[{}])`, `search(domain)`, `search_count`, `search_read`, `write({})`, `unlink()`, `browse(ids)`.
- Recordset: `for rec in self`, `ensure_one()`, `mapped("f")`, `filtered(lambda)`, `sorted(key)`, slicing, tập hợp `| & -`.
- ⚠️ **Không** gọi ORM trong vòng lặp (N+1) → thao tác cả recordset.
- `self.env`: `["model"]`, `.user`, `.company`, `.context`, `.ref("xmlid")`, `.cr`.

## CH10. Domains & search
- Domain = list tuple `(field, op, value)`, mặc định AND.
- Op: `=, !=, >, >=, <, <=, like, ilike, in, not in, child_of`.
- Logic tiền tố: `"|"` (OR), `"&"` (AND), `"!"` (NOT) — mỗi cái "ăn" 2 mệnh đề sau.
- Lần theo quan hệ: `("author_id.city", "=", "HN")`. Tham số: order, limit, offset.

---

# L2 — LOGIC & TƯƠNG TÁC

## CH11. Methods & decorators
- Method thường: `self` là recordset → `for rec in self`. Action gắn nút: `<button name="m" type="object"/>`.
- Decorators: `@api.depends`, `@api.onchange`, `@api.constrains`, `@api.model`, `@api.model_create_multi`.
- Ghi đè: `create(self, vals_list)` / `write(self, vals)` → **luôn `super()`** & trả kết quả.

## CH12. Constraints & exceptions
- SQL: `_sql_constraints = [("isbn_unique","UNIQUE(isbn)","msg")]`.
- Python: `@api.constrains("x")` → raise `ValidationError`.
- Exceptions: `ValidationError`, `UserError`, `AccessError`, `RedirectWarning`. Raise → rollback.

## CH13. Inheritance
- **Extension:** `_inherit="x"` (không `_name`) → thêm field/method vào model có sẵn (phổ biến nhất).
- **Prototype:** `_inherit` + `_name` mới → copy. **Delegation:** `_inherits={"x":"x_id"}`.
- **View inherit:** `inherit_id` ref + `<xpath expr=... position="after|before|inside|replace|attributes">`.

## CH14. Security
- 2 tầng: **Access Rights** (`ir.model.access.csv` — CRUD theo model×nhóm) + **Record Rules** (`ir.rule` — lọc record theo domain).
- `res.groups` định nghĩa nhóm; `domain_force` cho rule (vd `[('create_uid','=',user.id)]`).
- `sudo()` (bỏ qua quyền — **thận trọng**), `with_user(u)`, `check_access_rights`.

## CH15. Actions & menus
- `ir.actions.act_window` (mở model), `.server` (chạy code), `.report`, `.act_url`, `.client`.
- act_window: name, res_model, view_mode, domain, context (`default_x`), help.
- Menu 3 cấp (menuitem cha→con→action). Python trả dict action cho smart button.

## CH16. Views (XML)
- Form: `<header>` (button, statusbar) + `<sheet>` (`<group>`, `<notebook>/<page>`). List: `<list>` (field, `sum=`). Search: field + `<filter>` + group_by.
- 🔀 **Odoo 17+**: bỏ `attrs`/`states` → viết trực tiếp `invisible="state != 'done'"`, `readonly=`, `required=`.
- Widget: statusbar, monetary, many2many_tags, badge, handle, image, priority.

## CH17. QWeb Reports (PDF)
- `ir.actions.report` (report_type=qweb-pdf, report_name) + `<template>` QWeb.
- Directive: `t-field`, `t-esc/t-out`, `t-foreach/t-as`, `t-if`, `t-call`. Biến: `docs`, `user`, `company`.
- Dữ liệu tùy biến → AbstractModel `report.<module>.<template>` với `_get_report_values`.

---

# L3 — NÂNG CAO & THỰC CHIẾN

## CH18. Data files & External ID
- **External ID** (`module.id`) = định danh ổn định; tham chiếu bằng `ref=` (XML) / `env.ref()` (Python).
- `<odoo noupdate="1">`: chỉ tạo khi cài, không ghi đè khi nâng cấp.
- `ir.sequence` (`next_by_code`) để sinh mã tự động. CSV nạp dữ liệu hàng loạt.

## CH19. Wizards (TransientModel)
- `models.TransientModel` — dữ liệu tạm. Lấy record đang chọn qua context: `active_ids/active_id/active_model`.
- View `<form>` + `<footer>` nút; mở bằng act_window `target="new"` (popup).

## CH20. Cron, mail & chatter
- **ir.cron**: scheduled action (state=code, code=`model._cron_x()`, interval).
- **Chatter**: `_inherit=["mail.thread","mail.activity.mixin"]` + `tracking=True` → nhật ký đổi, tin nhắn, followers, activity, email. `message_post(body=...)`.

## CH21. Controllers & External API
- Controller: `class C(http.Controller)` + `@http.route("/path", type="http|json", auth="user|public|none")`; dùng `request.env`.
- External API: XML-RPC/JSON-RPC → `authenticate` rồi `execute_kw(db, uid, pwd, "model", "search_read", [domain], {fields})`. Gọi đúng method ORM, quyền theo user.

## CH22. Performance & best practices
- Tránh N+1: thao tác cả recordset, `mapped/filtered`, `read_group`, `create([...])` hàng loạt.
- `index=True` field hay lọc; `store=True` computed cần search. Ưu tiên ORM hơn SQL thô.
- Quy ước tên: model `module.dotted`, field snake_case, Many2one `_id`, x2many `_ids`. Không sửa core; tham khảo OCA.

## CH23. Testing & debugging
- `TransactionCase` (`setUp`, `test_*`, `assertEqual`, `assertRaises`). Chạy: `--test-enable --stop-after-init`.
- Debug: logging (`_logger`), `breakpoint()`, Developer mode, `--dev=all`, `odoo-bin shell`.
- Lỗi hay gặp: "External ID not found" (thứ tự data/depends), quên `-u`, thiếu access csv, thiếu field trong `@api.depends`.

## CH24. Deploy & migration
- Version manifest `<odoo>.<major>.<minor>.<patch>`; custom addons tách riêng; dùng git theo nhánh phiên bản.
- Migration: `migrations/<version>/pre-migrate.py` & `post-migrate.py` (`def migrate(cr, version)`). OpenUpgrade (OCA) cho nâng cấp lớn.
- Production: test pass, **backup** trước nâng cấp, bỏ `--dev`, nhiều worker, proxy_mode + nginx + HTTPS, master password, tắt list DB.

---

## 📋 Cheatsheet nhanh
```python
# Field
fields.Char/Text/Integer/Float/Boolean/Date/Datetime/Selection/Binary/Monetary
fields.Many2one("m", ondelete="set null"); fields.One2many("m","inv"); fields.Many2many("m")
# Decorators
@api.depends("a") / @api.onchange("x") / @api.constrains("x") / @api.model_create_multi
# ORM
env["m"].create({}|[{}]); .search(dom,order=,limit=); .search_read(dom,flds); .browse(ids)
recs.write({}); rec.unlink(); recs.mapped("f"); recs.filtered(lambda r:...); rec.ensure_one()
env.ref("xmlid"); rec.sudo(); env.user; env.company; env.context
# Domain
[("f","=",v)]; [("name","ilike","x")]; [("id","in",[1,2])]; ["|",(A),(B)]; [("rel.f","=",v)]
```
```bash
odoo-bin -d DB -i module --addons-path=...   # cài
odoo-bin -d DB -u module                      # nâng cấp
odoo-bin -d DB --test-enable --stop-after-init
odoo-bin shell -d DB                          # REPL ORM
```

---
*Làm chủ Odoo Framework (Python). Tham khảo Odoo Developer Documentation. Odoo là sản phẩm của Odoo S.A.*
