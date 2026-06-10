# Khóa Học Design Patterns — Nhận Diện & Áp Dụng (PHP · C · Python)

> Phiên bản rút gọn của `khoa-hoc-design-pattern.html`. Bản HTML có **Pattern Detector** (đố nhận diện tự chấm) và **bộ đổi ngôn ngữ PHP/C/Python** trên mọi ví dụ code.

Mục tiêu số một: **NHẬN DIỆN** — nhìn code lạ và gọi đúng tên pattern. Mỗi pattern dưới đây nhấn mạnh **Dấu hiệu nhận biết**.

---

## L0 · Nền tảng

- **Design pattern là gì:** khuôn mẫu giải pháp cho bài toán thiết kế lặp lại — *ý tưởng tổ chức lớp/đối tượng*, không phải code copy-paste hay thư viện.
- **KHÔNG phải:** không phải "càng nhiều càng tốt". Lạm dụng = over-engineering. Pattern là *thuốc chữa bệnh*, không phải *vitamin*.
- **3 nhóm GoF:**
  - **Creational (Khởi tạo):** tạo đối tượng *như thế nào*.
  - **Structural (Cấu trúc):** ghép đối tượng thành cấu trúc lớn *ra sao*.
  - **Behavioral (Hành vi):** đối tượng *giao tiếp & chia trách nhiệm* thế nào.
- **Checklist nhận diện:** ① Tên gọi (Factory/Builder/Observer…) → ② Cấu trúc (interface + nhiều hiện thực? lớp bọc lớp?) → ③ Ý đồ (giấu `new`? thêm hành vi? đổi thuật toán?) → ④ Đối chiếu dấu hiệu.
- **Mẹo:** nhiều pattern *giống nhau về cấu trúc* — phân biệt bằng **Ý ĐỒ**, không bằng sơ đồ.

---

## CR · Creational (Khởi tạo)

Dấu hiệu chung: code **không gọi `new` trực tiếp** mà qua method/đối tượng trung gian.

### Singleton
- **Ý đồ:** chỉ tồn tại đúng một instance (config, logger, connection).
- **Dấu hiệu:** method static `getInstance()`; biến static giữ instance, khởi tạo lười; constructor `private` (PHP) / `__new__` override (Python). C: biến `static` trong hàm.
- **Mặt trái:** biến toàn cục trá hình → khó test → nay thường thay bằng **Dependency Injection**.

### Factory Method
- **Ý đồ:** giấu `new` sau một method, thêm loại sản phẩm mà không sửa client.
- **Dấu hiệu:** `create()/make()` trả về **interface** (không trả lớp cụ thể); bên trong `switch/if` chọn lớp để `new`.

### Abstract Factory
- **Ý đồ:** tạo cả một **họ** sản phẩm khớp nhau (vd toàn bộ UI theme Dark).
- **Dấu hiệu:** một interface factory có **nhiều** method create (`createButton`, `createCheckbox`); nhiều factory cụ thể.

### Builder
- **Ý đồ:** dựng đối tượng phức tạp từng bước; thay constructor "khủng long".
- **Dấu hiệu:** chuỗi method trả `$this/self` (fluent) `.setX().setY().build()`; method `build()` ở cuối.

### Prototype
- **Ý đồ:** tạo mới bằng **sao chép** mẫu có sẵn thay vì `new` từ đầu.
- **Dấu hiệu:** `clone()/copy()`; PHP `__clone()`, Python `copy.deepcopy`, C copy struct. Lưu ý **shallow vs deep copy**.

---

## ST · Structural (Cấu trúc)

Dấu hiệu chung: một lớp **bọc (wrap)** lớp khác — giữ tham chiếu và chuyển tiếp/biến đổi lời gọi. Khác nhau ở *mục đích bọc*.

### Adapter
- **Ý đồ:** "ổ cắm chuyển đổi" — bọc lớp có API lệch cho khớp interface ta cần.
- **Dấu hiệu:** `XxxAdapter` implements interface bạn cần, bên trong **dịch** sang API khác (`log()` → `writeLine()`).

### Decorator
- **Ý đồ:** thêm hành vi mà không sửa lớp gốc; bọc chồng được.
- **Dấu hiệu:** **cùng interface** với đối tượng bọc, gọi `inner.op()` rồi **thêm thắt**; `new Gzip(new Encrypt(new File()))`.

### Facade
- **Ý đồ:** một API đơn giản che cả hệ thống con phức tạp.
- **Dấu hiệu:** lớp "cổng" với method đơn giản điều phối **nhiều lớp con**; không thêm hành vi, chỉ đơn giản hoá.

### Composite
- **Ý đồ:** xử lý đối tượng đơn lẻ và nhóm như nhau (cây).
- **Dấu hiệu:** interface chung cho **lá** và **nhóm**; nhóm có danh sách con cùng kiểu, method **đệ quy** xuống con (file/thư mục, menu).

### Proxy
- **Ý đồ:** người đại diện cùng interface để **kiểm soát truy cập** (lazy, cache, quyền, từ xa).
- **Dấu hiệu:** `XxxProxy` cùng interface với đối tượng thật; làm thêm việc trước khi chuyển tiếp. ORM lazy loading, CDN, RPC stub.

### Bridge & Flyweight
- **Bridge:** tách abstraction khỏi implementation; abstraction giữ tham chiếu tới interface implementation và uỷ quyền (tránh bùng nổ lớp con).
- **Flyweight:** chia sẻ object qua **pool/cache** thay vì tạo mới; tách trạng thái chung (chia sẻ) khỏi riêng (truyền vào). Vd: glyph font, tile map.

---

## BE · Behavioral (Hành vi)

Nhóm dễ nhầm nhất — phân biệt bằng **ý đồ**.

### Strategy
- **Ý đồ:** nhiều thuật toán hoán đổi được, chọn lúc chạy; thay `if/else`.
- **Dấu hiệu:** interface 1 method (`execute/sort/pay`), nhiều hiện thực; context có `setStrategy()`. Python: thường chỉ là một hàm.

### Observer
- **Ý đồ:** một-tới-nhiều; đổi trạng thái → tự báo cho mọi subscriber.
- **Dấu hiệu:** `subscribe/notify`; `notify()` **lặp danh sách** gọi `update()`. Event listener, signals, pub/sub.

### Command
- **Ý đồ:** đóng gói yêu cầu thành object để xếp hàng/log/undo.
- **Dấu hiệu:** interface `execute()` (+`undo()`); có history stack/queue; command giữ sẵn dữ liệu & receiver để chạy sau.

### State
- **Ý đồ:** đối tượng đổi hành vi khi trạng thái nội bộ đổi (FSM object-hoá).
- **Dấu hiệu:** nhiều lớp trạng thái; **chính state tự gọi `setState()`** để chuyển A→B→C.

### Template Method
- **Ý đồ:** lớp cha định khung thuật toán, lớp con điền vài bước.
- **Dấu hiệu:** method không-abstract ở cha gọi tuần tự, vài bước **abstract**; con chỉ override bước (dựa **kế thừa**).

### Iterator
- **Ý đồ:** duyệt tập hợp mà không lộ cấu trúc trong.
- **Dấu hiệu:** `hasNext/next` hoặc `__iter__`/`IteratorAggregate`. `foreach`, `for..in`, generator.

### Chain of Responsibility
- **Ý đồ:** chuyền yêu cầu qua chuỗi handler; mỗi cái xử lý hoặc đẩy tiếp.
- **Dấu hiệu:** handler giữ `next`, quyết định tự xử lý hay chuyển tiếp. **Middleware** (Express/Laravel/Django).

### Mediator · Memento · Visitor · Interpreter
- **Mediator:** trung tâm điều phối; component gọi `mediator.notify()` thay vì gọi nhau. Chat room, dialog.
- **Memento:** `save()/restore()` snapshot mờ đục; lõi undo/redo, save game.
- **Visitor:** `accept(visitor)` → `visitor.visitX(this)` (double dispatch); thêm thao tác lên cây mà không sửa lớp. AST compiler.
- **Interpreter:** mỗi luật ngữ pháp = một lớp với `interpret(context)`; máy tính biểu thức.

---

## Anti-pattern & nhầm lẫn

**Anti-pattern hay gặp:** God Object (lớp biết tuốt), Singleton lạm dụng, Over-engineering (nhồi pattern), Poltergeist (lớp ma), Golden Hammer (một pattern cho mọi việc).

**Quy tắc vàng:** đừng hỏi "dùng pattern nào?" mà hỏi **"vấn đề thực tế là gì?"** (lặp lại? khó mở rộng? khó test?). Khi nỗi đau rõ, pattern tự lộ ra.

**Cặp dễ nhầm (phân biệt bằng ý đồ):**

| Cặp | Khác nhau |
|---|---|
| Strategy ↔ State | Strategy: client chọn cách làm. State: tự chuyển trạng thái A→B→C. |
| Adapter ↔ Decorator | Adapter: đổi *giao diện*. Decorator: giữ giao diện, *thêm hành vi*. |
| Decorator ↔ Proxy | Decorator: thêm tính năng. Proxy: kiểm soát truy cập. |
| Facade ↔ Adapter | Facade: gom *nhiều* lớp thành API mới. Adapter: khớp *một* lớp vào interface. |
| Factory Method ↔ Abstract Factory | FM: 1 loại sản phẩm. AF: cả 1 họ. |
| Strategy ↔ Template Method | Strategy: composition, đổi lúc chạy. Template: kế thừa, override bước. |
| Command ↔ Strategy | Command: 1 yêu cầu kèm dữ liệu (hoãn/undo). Strategy: 1 cách làm. |

---

*Thuộc bộ Studies. Mở bản HTML để dùng Pattern Detector & xem code 3 ngôn ngữ.*
