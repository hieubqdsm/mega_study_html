# 🐘 Khóa Học PostgreSQL — Từ Cơ Bản Đến Nâng Cao

> Bản Markdown gọn nhẹ. Phiên bản tương tác (chạy SQL thật trong trình duyệt qua PGlite, bài tập tự chấm, flashcards) ở file `khoa-hoc-postgresql.html`.

PostgreSQL là RDBMS mã nguồn mở mạnh nhất thế giới — vừa là SQL database, vừa làm tốt vai trò document store (JSONB), search engine, vector DB và geospatial. Khóa học đi từ 0 đến vận hành production, **so sánh thẳng với MySQL, SQLite, MongoDB, SQL Server, Oracle**.

**Lộ trình 4 cấp độ:** L0 Cơ bản (ch1–7) → L1 Trung cấp (ch8–14) → L2 Nâng cao (ch15–22) → L3 Chuyên gia (ch23–29).

---

## ⚖️ So sánh nhanh PostgreSQL vs các DB khác

| Tiêu chí | PostgreSQL | MySQL/MariaDB | SQLite | MongoDB | SQL Server/Oracle |
|---|---|---|---|---|---|
| Mô hình | Quan hệ + đối tượng + JSON | Quan hệ | Quan hệ (file) | Document (NoSQL) | Quan hệ |
| Mạnh nhất | Đúng đắn, tính năng, mở rộng | Đọc nhanh, web phổ thông | Nhúng app | Phi cấu trúc, scale ngang | Doanh nghiệp lớn |
| JSON | JSONB (index, truy vấn mạnh) | JSON (yếu hơn) | JSON1 | Bản địa (BSON) | Có |
| Mở rộng | Extension (PostGIS, pgvector...) | Hạn chế | Hạn chế | — | Đóng |
| Concurrency | MVCC | MVCC (InnoDB) | Khóa file ghi | Khóa document | MVCC |
| Scale ngang | Cần Citus/sharding | Tương tự | Không | Sharding bản địa | Đắt |
| Chi phí | Miễn phí | Miễn phí | Miễn phí | Miễn phí/Atlas | Bản quyền cao |

**Tóm tắt:** Postgres = "con dao đa năng" (chọn mặc định). MySQL = web phổ thông. SQLite = nhúng. MongoDB = document linh hoạt, scale ngang. SQL Server/Oracle = doanh nghiệp.

---

# L0 — CƠ BẢN

## CH1. PostgreSQL là gì
- **RDBMS**: dữ liệu trong bảng (dòng × cột), liên kết qua khóa, thao tác bằng SQL.
- Postgres ra đời 1986 (UC Berkeley), object-relational, tuân thủ chuẩn SQL nghiêm ngặt, **ưu tiên tính đúng đắn**.
- **ACID**: Atomicity, Consistency, Isolation, Durability — đủ ở mặc định.
- ⚖️ Postgres báo lỗi khi dữ liệu sai (vd ngày không hợp lệ); MySQL cũ từng âm thầm cho qua/cắt cụt.

```sql
SELECT version();
SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 5;
```

## CH2. Cài đặt & công cụ
- Cài: postgresql.org/download, Postgres.app (mac), `apt install postgresql`, hoặc Docker: `docker run -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres:16`.
- Cấu trúc: server → database → schema (mặc định `public`) → bảng. Cổng `5432`.
- **psql** (lệnh meta): `\l` (databases), `\c db`, `\dt` (tables), `\d ten_bang`, `\du` (roles), `\timing`, `\x`, `\q`.
- GUI: pgAdmin, **DBeaver** (miễn phí), TablePlus/DataGrip.
- ⚖️ Postgres/MySQL = client–server; **SQLite** = không server, cả DB là một file `.db`.

## CH3. Kiểu dữ liệu
- Số: `SMALLINT/INTEGER/BIGINT`, tự tăng `GENERATED ALWAYS AS IDENTITY` (hoặc `SERIAL`).
- Thập phân: **`NUMERIC(p,s)` cho tiền** (KHÔNG dùng float vì sai số).
- Chuỗi: mặc định **`TEXT`**; `VARCHAR(n)` khi cần giới hạn.
- Bool: `BOOLEAN`. Thời gian: **`TIMESTAMPTZ`** (có múi giờ), `DATE`, `INTERVAL`.
- Khác: `UUID`, `JSONB`, `ARRAY`, `ENUM`, `RANGE`, `INET`, geometry (PostGIS).
- Ép kiểu: `42::TEXT`, `'3.14'::NUMERIC`.
- ⚖️ Postgres kho kiểu phong phú nhất; SQLite "type affinity" rất lỏng (nhét chuỗi vào cột INT được).

## CH4. Tạo bảng & ràng buộc
```sql
CREATE TABLE accounts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  age INT CHECK (age >= 0 AND age < 150),
  balance NUMERIC(12,2) NOT NULL DEFAULT 0,
  dept_id INT REFERENCES departments(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```
- Ràng buộc: `PRIMARY KEY`, `FOREIGN KEY (REFERENCES)`, `UNIQUE`, `NOT NULL`, `CHECK`, `DEFAULT`.
- FK on delete: `CASCADE` / `SET NULL` / `RESTRICT`.
- `ALTER TABLE ... ADD/DROP/RENAME COLUMN`, `ALTER COLUMN ... SET DEFAULT`.
- ⚖️ Postgres có **transactional DDL** (rollback được CREATE/ALTER); MySQL <8.0 tự commit mỗi DDL.

## CH5. INSERT / UPDATE / DELETE
```sql
INSERT INTO products (name, price) VALUES ('A', 10), ('B', 20) RETURNING id, name;
UPDATE employees SET salary = salary * 1.10 WHERE dept_id = 1 RETURNING name, salary;
DELETE FROM products WHERE stock = 0 RETURNING name;
-- UPSERT
INSERT INTO customers (name, email) VALUES ('Lan','lan@mail.com')
ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;
```
- ⚠️ UPDATE/DELETE **không WHERE** → tác động toàn bảng. Test bằng SELECT trước.
- ⚖️ `RETURNING` là điểm mạnh Postgres (MySQL không có). UPSERT: Postgres `ON CONFLICT`, MySQL `ON DUPLICATE KEY UPDATE`.

## CH6. Truy vấn SELECT
- **Thứ tự thực thi logic**: FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT.
- Hệ quả: WHERE không dùng được alias cột (chạy trước SELECT); ORDER BY thì được.
```sql
SELECT name, salary,
  CASE WHEN salary >= 2200 THEN 'Cao'
       WHEN salary >= 1500 THEN 'Trung bình'
       ELSE 'Thấp' END AS muc_luong
FROM employees
WHERE salary BETWEEN 1500 AND 2300 AND dept_id IN (1,2) AND name ILIKE '%n%'
ORDER BY salary DESC LIMIT 10 OFFSET 0;
```
- `DISTINCT`, `LIMIT/OFFSET` (phân trang), `BETWEEN`, `IN`, `LIKE/ILIKE`.

## CH7. Hàm, toán tử & NULL
- Chuỗi: `upper()`, `length()`, `||` (nối), `substring()`. Số: `round()`. Ngày: `now()`, `age()`, `date_trunc()`, `extract()`.
- **NULL = "không biết"**: mọi so sánh `=` với NULL ra NULL. Dùng `IS NULL`/`IS NOT NULL`.
- `COALESCE(a,b,c)` = giá trị đầu khác NULL; `NULLIF(x,y)` = NULL nếu x=y.
- ⚠️ `WHERE col != 1` bỏ sót dòng `col IS NULL`.
- ⚖️ Postgres: `NULL` ≠ `''`. Oracle: coi `''` chính là NULL.

---

# L1 — TRUNG CẤP

## CH8. JOIN
- `INNER` (khớp cả 2), `LEFT` (giữ hết bên trái), `RIGHT`, `FULL OUTER`, `CROSS`, self-join.
```sql
SELECT e.name, d.name AS phong_ban
FROM employees e JOIN departments d ON e.dept_id = d.id;

-- anti-join: bên trái không có bên phải
SELECT c.name FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL;

-- self join: nhân viên ↔ quản lý
SELECT e.name, m.name AS quan_ly
FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;
```
- ⚖️ JOIN là sức mạnh RDBMS; MongoDB khuyến khích nhúng dữ liệu, JOIN qua `$lookup` (chậm hơn).

## CH9. Gộp nhóm (GROUP BY)
- Aggregate: `COUNT, SUM, AVG, MIN, MAX`.
- **WHERE lọc dòng (trước gộp), HAVING lọc nhóm (sau gộp).**
- Quy tắc: cột SELECT không nằm trong aggregate phải có trong GROUP BY (Postgres báo lỗi nếu vi phạm).
```sql
SELECT d.name, COUNT(*) AS n, ROUND(AVG(e.salary),0) AS luong_tb
FROM employees e JOIN departments d ON e.dept_id = d.id
GROUP BY d.name HAVING COUNT(*) > 1;

-- gộp có điều kiện
SELECT COUNT(*) FILTER (WHERE status='paid') AS da_tt FROM orders;
```

## CH10. Subquery & CTE
```sql
-- subquery
SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);
SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id=c.id);

-- CTE (WITH) — đặt tên truy vấn con cho dễ đọc
WITH dt AS (SELECT order_id, SUM(qty*price) tong FROM ... GROUP BY order_id)
SELECT * FROM dt WHERE tong > 200;

-- recursive CTE — duyệt cây phân cấp
WITH RECURSIVE org AS (
  SELECT id, name, manager_id, 1 AS cap FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, org.cap+1
  FROM employees e JOIN org ON e.manager_id = org.id)
SELECT * FROM org;
```
- ⚖️ CTE/recursive: Postgres & SQLite có lâu; MySQL chỉ từ 8.0.

## CH11. Phép toán tập hợp
- `UNION` (loại trùng), `UNION ALL` (giữ trùng, nhanh), `INTERSECT` (giao), `EXCEPT` (hiệu).
- Điều kiện: cùng số cột & kiểu tương thích; `ORDER BY` đặt cuối.

## CH12. View & Materialized View
```sql
CREATE OR REPLACE VIEW v_nv AS SELECT e.name, d.name AS phong FROM employees e JOIN departments d ON e.dept_id=d.id;
CREATE MATERIALIZED VIEW mv_dt AS SELECT category, SUM(...) FROM ... GROUP BY category;
REFRESH MATERIALIZED VIEW mv_dt;  -- (CONCURRENTLY để không khóa)
```
- View = truy vấn ảo (chạy lại mỗi lần). Materialized = lưu kết quả vật lý, đọc nhanh, phải REFRESH.
- ⚖️ MySQL không có materialized view bản địa.

## CH13. Index cơ bản
- Không index → seq scan (quét toàn bảng). Index mặc định **B-tree**.
- Đánh index ở cột trong WHERE/JOIN ON/ORDER BY; **FK không tự có index, phải tự thêm**; PK/UNIQUE tự có.
- ⚠️ Mỗi index làm chậm ghi + tốn chỗ; đừng lạm dụng.
```sql
CREATE INDEX idx_emp_dept ON employees(dept_id);
EXPLAIN SELECT * FROM employees WHERE dept_id = 1;
```

## CH14. Transaction & ACID
```sql
BEGIN;
  UPDATE accounts SET balance = balance - 200 WHERE username='alice';
  UPDATE accounts SET balance = balance + 200 WHERE username='bob';
COMMIT;   -- hoặc ROLLBACK; / SAVEPOINT s; ROLLBACK TO s;
```
- Isolation: `READ COMMITTED` (mặc định) → `REPEATABLE READ` → `SERIALIZABLE`.
- ⚖️ Postgres: transactional DDL + SERIALIZABLE thật (SSI). SQLite khóa toàn DB khi ghi.

---

# L2 — NÂNG CAO

## CH15. Index nâng cao
| Loại | Dùng cho |
|---|---|
| B-tree | `=`, `<`, `>`, BETWEEN, ORDER BY |
| GIN | JSONB, mảng, full-text |
| GiST | hình học, range, gần đúng (PostGIS) |
| BRIN | bảng cực lớn sắp xếp tự nhiên (time-series) |
```sql
CREATE INDEX idx_paid ON orders(customer_id) WHERE status='paid';     -- partial
CREATE INDEX idx_lower ON customers(LOWER(email));                    -- expression
CREATE INDEX idx_dept_sal ON employees(dept_id, salary DESC);         -- composite
CREATE INDEX idx_cov ON t(a) INCLUDE (b);                            -- covering
```
- ⚖️ Đa dạng index là nơi Postgres bỏ xa MySQL (chủ yếu B-tree).

## CH16. Window Functions
- Tính tổng hợp theo nhóm nhưng **giữ nguyên từng dòng**: `hàm() OVER (PARTITION BY ... ORDER BY ...)`.
- `ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, SUM/AVG OVER, NTILE`.
```sql
SELECT name, dept_id, salary,
  RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS hang,
  SUM(salary) OVER (ORDER BY hired_at) AS cong_don
FROM employees;
-- top-1 mỗi nhóm: ROW_NUMBER trong CTE rồi lọc = 1
```
- ⚖️ MySQL chỉ có từ 8.0.

## CH17. JSON & JSONB
- Dùng **JSONB** (nhị phân, index được). `->` lấy JSONB, `->>` lấy TEXT, `#>>'{a,b}'` đường dẫn.
- `@>` chứa, `?` tồn tại key. Index `USING GIN (data)`.
```sql
SELECT data->>'user', (data->>'amount')::numeric FROM events WHERE data @> '{"action":"purchase"}';
SELECT * FROM events WHERE data->'tags' ? 'web';
```
- ⚖️ vs MongoDB: Postgres trộn được JSON + quan hệ + ACID trong 1 hệ; MongoDB thắng ở sharding bản địa.

## CH18. Array & kiểu phức hợp
```sql
CREATE TABLE articles (tags TEXT[]);
SELECT * FROM articles WHERE 'db' = ANY(tags);
SELECT unnest(ARRAY['a','b','c']);
CREATE TYPE mood AS ENUM ('low','ok','high');
```
- ⚖️ Postgres có mảng bản địa (index GIN, `ANY`, `@>`); MySQL không có.

## CH19. Full-text Search
```sql
SELECT to_tsvector('english', body) @@ to_tsquery('english','database & index:*');
SELECT id, ts_rank(to_tsvector('english',body), to_tsquery('english','database')) AS diem
FROM docs WHERE to_tsvector('english',body) @@ to_tsquery('english','database') ORDER BY diem DESC;
```
- `tsvector`/`tsquery`, xếp hạng `ts_rank`, fuzzy với `pg_trgm`, index GIN.
- ⚖️ Đủ tốt cho hầu hết app → đỡ vận hành Elasticsearch; ES vẫn vượt ở quy mô search rất lớn.

## CH20. Hàm & PL/pgSQL
```sql
CREATE OR REPLACE FUNCTION xep_loai(p NUMERIC) RETURNS TEXT AS $$
BEGIN
  IF p >= 2200 THEN RETURN 'Cao';
  ELSIF p >= 1500 THEN RETURN 'Trung bình';
  ELSE RETURN 'Thấp'; END IF;
END; $$ LANGUAGE plpgsql;
```
- Hàm SQL (`LANGUAGE sql`) hoặc PL/pgSQL (có biến, IF, vòng lặp).
- ⚖️ Postgres còn hỗ trợ PL/Python, PL/v8 (JS)... qua extension.

## CH21. Trigger
```sql
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at := now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER trg BEFORE INSERT OR UPDATE ON notes
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```
- Biến: `NEW`, `OLD`, `TG_OP`. Dùng cho audit, timestamp, ràng buộc phức tạp.
- ⚠️ Logic ẩn, khó debug — dùng có chừng mực.

## CH22. Tối ưu & EXPLAIN
- `EXPLAIN` (ước lượng), `EXPLAIN ANALYZE` (chạy thật + thời gian).
- Node: **Seq Scan** (quét toàn bảng — chậm), Index Scan/Index Only Scan (tốt), Bitmap Heap Scan, Nested Loop/Hash Join/Merge Join.
- Quy trình: tìm query chậm (`pg_stat_statements`) → EXPLAIN ANALYZE → thêm index/viết lại/ANALYZE → đo lại. Không tối ưu mò.

---

# L3 — CHUYÊN GIA & VẬN HÀNH

## CH23. MVCC & khóa
- **MVCC**: UPDATE/DELETE tạo phiên bản mới (không ghi đè) → **đọc không chặn ghi**. Sinh dead tuples → cần VACUUM.
- `SELECT ... FOR UPDATE` khóa dòng để cập nhật an toàn (chống race).
- ⚖️ Postgres lưu version trong heap (cần VACUUM); Oracle/InnoDB dùng undo log; SQLite khóa toàn DB.

## CH24. VACUUM & bảo trì
- `VACUUM` thu hồi dead tuples; `ANALYZE` cập nhật thống kê; `VACUUM FULL` nén (khóa bảng); `REINDEX`.
- **autovacuum** chạy nền tự động (tinh chỉnh ngưỡng cho bảng ghi nhiều).
- Theo dõi `pg_stat_user_tables` (`n_dead_tup`, `last_autovacuum`).

## CH25. Partitioning
```sql
CREATE TABLE logs (created_at DATE, ...) PARTITION BY RANGE (created_at);
CREATE TABLE logs_2024 PARTITION OF logs FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```
- Partition pruning (chỉ chạm partition liên quan); xóa cũ = DROP partition.
- ⚖️ Time-series lớn: TimescaleDB (trên Postgres) tự động hóa; ClickHouse cho analytic thuần.

## CH26. Replication & HA
- **WAL** (Write-Ahead Log) là nền tảng. Streaming replication (physical) / logical replication (publish-subscribe).
- Primary (ghi) + read replica (đọc). Sync (an toàn) vs Async (nhanh). Failover: Patroni/repmgr.
- Scale **đọc** dễ (replica); scale **ghi** khó (1 primary) → cần sharding (Citus).
- ⚖️ MongoDB sharding bản địa dễ scale ghi hơn; đa số dự án thì 1 primary + replica là quá đủ.

## CH27. Extensions
| Extension | Biến Postgres thành |
|---|---|
| PostGIS | Geospatial DB |
| pgvector | Vector DB (AI/RAG/embedding) |
| TimescaleDB | Time-series |
| pg_trgm | Fuzzy / chịu lỗi chính tả |
| Citus | Sharding phân tán |
| pg_stat_statements | Theo dõi query chậm |
```sql
CREATE EXTENSION IF NOT EXISTS vector;
SELECT * FROM pg_extension;
```
- Lý do "Just use Postgres": một hệ thay được nhiều DB chuyên dụng.

## CH28. Backup & Bảo mật
- Backup: `pg_dump -Fc db > db.dump` / `pg_restore`; `pg_dumpall`; **PITR** (base backup + WAL); pgBackRest/Barman.
- Roles: `CREATE ROLE ... LOGIN`, `GRANT/REVOKE`, least privilege (không dùng superuser cho app).
- **Row Level Security** (multi-tenant): `ENABLE ROW LEVEL SECURITY` + `CREATE POLICY`.
- Bật SSL/TLS, cấu hình `pg_hba.conf`, mã hóa cột nhạy cảm (`pgcrypto`).
- ⚖️ RLS bản địa (MySQL thiếu); mô hình role thống nhất.

## CH29. Scaling & chọn DB đúng
- Thang scale: tối ưu query/index → tăng phần cứng → PgBouncer (pooling) → Redis cache → read replica → partition → sharding (Citus).

| Tình huống | Nên chọn |
|---|---|
| Web/SaaS quan hệ, cần đúng đắn | **PostgreSQL** |
| JSON + quan hệ + search + vector | **PostgreSQL** (+ extensions) |
| App nhúng/offline | SQLite |
| Blog/CMS phổ thông, WordPress | MySQL/MariaDB |
| Document schema đổi liên tục, scale ngang ghi | MongoDB |
| Cache/session/leaderboard | Redis |
| OLAP/log khổng lồ | ClickHouse/BigQuery |
| Hệ sinh thái Microsoft/Oracle | SQL Server/Oracle |

> **Kết luận:** "Use Postgres until you can't." Bắt đầu với Postgres; chỉ đổi khi có bằng chứng đo lường rằng bài toán cần thứ khác.

---

## 🏆 Mini-projects
- **L0 — Thư viện**: tạo bảng `lib_books` (constraints), SELECT theo genre, đếm theo nhóm, INSERT RETURNING.
- **L1 — Quán cà phê**: JOIN menu/bills/items, doanh thu theo món/nhân viên, HAVING, CTE hóa đơn lớn nhất.
- **L2 — Analytics JSONB**: rút trường JSONB, tổng chi theo user, running total (window), RANK user.
- **L3 — Capstone thiết kế**: schema multi-tenant + RLS, partition log theo thời gian, composite index `(tenant_id, created_at)`, materialized view + read replica cho báo cáo, kế hoạch backup (PITR) & HA (Patroni).

## 🎯 Bài tập tự chấm (xem bản HTML để chấm tự động)
1. Sản phẩm 'Phụ kiện' giá < 100 → `name, price`.
2. Đếm nhân viên theo phòng → `dept_id, n`.
3. Lương TB mỗi phòng → `phong_ban, luong_tb`.
4. Khách + số đơn (LEFT JOIN) → `name, so_don`.
5. Sản phẩm chưa từng đặt (anti-join) → `name`.
6. Lương cao nhất mỗi phòng (ROW_NUMBER) → `name, dept_id, salary`.
7. Doanh thu mỗi category > 200 (HAVING) → `category, doanh_thu`.
8. Nhân viên + quản lý (self LEFT JOIN) → `name, quan_ly`.

## 📋 Cheatsheet
```sql
-- DDL
CREATE TABLE t (id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name TEXT NOT NULL);
ALTER TABLE t ADD COLUMN age INT;   DROP TABLE IF EXISTS t CASCADE;
-- DML
INSERT INTO t (name) VALUES ('a') RETURNING id;
INSERT ... ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
-- SELECT
SELECT col, COUNT(*) FROM t WHERE x BETWEEN 1 AND 10 GROUP BY col HAVING COUNT(*)>1
ORDER BY col DESC NULLS LAST LIMIT 10 OFFSET 20;
-- JOIN / CTE / Window
SELECT a.* FROM a LEFT JOIN b ON a.id=b.a_id WHERE b.id IS NULL;  -- anti-join
WITH x AS (SELECT ...) SELECT * FROM x;
ROW_NUMBER() OVER (PARTITION BY g ORDER BY v DESC);
-- JSONB
data->'k'  data->>'k'  data @> '{"k":1}'  data ? 'k';  CREATE INDEX ... USING GIN(data);
-- TX & bảo trì
BEGIN; ... COMMIT; | ROLLBACK; | SELECT ... FOR UPDATE;
VACUUM ANALYZE t;  EXPLAIN ANALYZE SELECT ...;
```

---
*Khóa học PostgreSQL — bản HTML tương tác kèm SQL Playground chạy thật trong trình duyệt (PGlite/WASM).*
