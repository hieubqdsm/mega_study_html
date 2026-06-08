# 🤖 Godot 2D Physics — Từ Căn Bản Đến Slinky & Xuất Bản Mobile

> Bản Markdown gọn. Phiên bản tương tác (🌀 **Slinky Lab** mô phỏng sống, flashcards, quiz) ở `khoa-hoc-godot-2d-physics.html`. Dùng **Godot 4.x** (GDScript 2.0).

Làm game 2D tương tác vật lý: scene/node → physics 2D → **mô phỏng lò xo Slinky** → xuất bản **Android/iOS** có **quảng cáo**.

**Lộ trình:** L0 Nhập môn (1–4) → L1 Vật lý 2D (5–9) → L2 Lò xo & Slinky 🌀 (10–16) → L3 Nâng cao (17–20) → L4 Mobile & Ads (21–24).

---

# L0 — Nhập môn Godot
## CH1. Godot là gì & cài đặt
- Engine mã nguồn mở (MIT), nhẹ, GDScript giống Python, kiến trúc node. Có physics 2D & node lò xo/khớp sẵn.
- Tải từ godotengine.org (không cần cài). Giao diện: Scene / FileSystem / Viewport / Inspector / Script editor. F5 chạy game, F6 chạy scene.
- 🔀 Godot 4 vs 3: `KinematicBody2D`→`CharacterBody2D`, `export`→`@export`, `@onready`, `signal.connect(callable)`, `Sprite`→`Sprite2D`.

## CH2. Scene, Node & cây cảnh
- Mọi thứ là Node; node ghép thành cây = Scene; scene nhúng (instance) vào scene khác (= prefab).
- Node 2D: Node2D, Sprite2D, Camera2D, CollisionShape2D, Line2D (vẽ Slinky), các physics body.
- Signals = observer pattern (phát/lắng nghe) để node giao tiếp lỏng.

## CH3. GDScript căn bản
```gdscript
extends Node2D
@export var speed: float = 200.0
@onready var sprite: Sprite2D = $Sprite2D
func _ready() -> void: pass            # 1 lần
func _process(delta) -> void: position += velocity * delta   # mỗi frame
func _physics_process(delta) -> void: pass                   # mỗi bước vật lý (DÙNG cho physics)
```
- `queue_free()` xóa node. Luôn nhân `delta`. Signal: `$Button.pressed.connect(_on_pressed)`.

## CH4. Game 2D đầu tiên
- Input Map (action move_left/right/up/down). `Input.get_vector(...)` / `Input.get_axis(...)`.
- `sprite.position += dir * speed * delta`. Cảm ứng: TouchScreenButton hoặc Emulate Mouse From Touch.

---

# L1 — Vật lý 2D nền tảng
## CH5. Tổng quan Physics 2D
- Body: **StaticBody2D** (bất động), **RigidBody2D** (engine mô phỏng), **CharacterBody2D** (bạn điều khiển), **Area2D** (cảm biến). Mỗi body cần CollisionShape2D.
- Layers/Masks: A thấy B khi mask(A) chứa layer(B). Vật lý chạy ở `_physics_process`.

## CH6. RigidBody2D
- Tác động bằng lực/xung lực: `apply_central_impulse(v)` (tức thời), `apply_central_force(v)` (liên tục). KHÔNG đặt position trực tiếp.
- `linear_velocity`, `freeze`, PhysicsMaterial (bounce/friction). Gravity ở Project Settings.

## CH7. CharacterBody2D
- Tự đặt `velocity` → `move_and_slide()` (Godot 4). `is_on_floor()`. Tự cộng gravity vào velocity.y.

## CH8. Area2D & va chạm
- Signals: `body_entered/exited(body)`, `area_entered(area)`. `signal collected` tự định nghĩa, `emit()`.
- Groups: `add_to_group("player")` + `is_in_group(...)`.

## CH9. Input chuột & cảm ứng — kéo thả
- `input_pickable=true` + signal `input_event`. Kéo "mềm" RigidBody: đặt `linear_velocity = (chuột - pos) * k` (KHÔNG gán position trực tiếp → nổ vật lý).
- Cảm ứng: Emulate Mouse From Touch, hoặc `InputEventScreenTouch/Drag`.

---

# L2 — Lò xo & Slinky 🌀 (trọng tâm)
## CH10. Lý thuyết
- Hooke: `F = −k·x`; giảm chấn `F = −c·v`. Slinky = chuỗi khối lượng nối lò xo → **sóng lan truyền**.
- 2 hướng: **engine joint** (RigidBody + DampedSpringJoint2D — va chạm sẵn, dễ rung) vs **Verlet tùy chỉnh** (ổn định, nhẹ, kiểm soát cao — khuyến nghị).
- Verlet (position-based): `x' = x + (x−x_cũ)·damp + a·dt²`, rồi áp ràng buộc khoảng cách.

## CH11. Joints
- PinJoint2D (bản lề), **DampedSpringJoint2D** (rest_length, stiffness, damping), GrooveJoint2D (rãnh). `node_a/node_b` = NodePath.

## CH12. Slinky bằng RigidBody + DampedSpringJoint2D
- Sinh N RigidBody2D (đốt) + nối liên tiếp bằng DampedSpringJoint2D; đốt đầu `freeze=true`. Nhiều đốt → dễ rung/nặng; tăng mass/solver iterations hoặc chuyển Verlet.

## CH13. Slinky bằng Verlet (chính)
```gdscript
# _physics_process: _integrate(delta) → lặp iterations: _solve_constraints() → queue_redraw()
# integrate:  v=(pos[i]-prev[i])*damping; prev[i]=pos[i]; pos[i]+=v + Vector2(0,gravity)*dt*dt
# constraint: d=pos[i+1]-pos[i]; diff=(d.length()-rest)/d.length()*0.5*stiffness
#             pos[i]+=d*diff; pos[i+1]-=d*diff   (bỏ qua điểm pinned)
```
- `pinned[0]=true` (ghim đầu). `iterations` cao = cứng & ổn định (Position-Based Dynamics). Dùng `PackedVector2Array`.

## CH14. Vẽ & coil
- `_draw()` hoặc Line2D. Coil: đường tâm + lệch vuông góc `off = coil_radius * sin(t * coils * TAU)` với t=0..1 dọc thân → nén/giãn thì vòng tự bó/giãn.

## CH15. Tương tác & wave
- Kéo điểm: `_nearest_point(mouse)` → set `pos[idx]=mouse`. Va chạm sàn: clamp `pos[i].y`. "Đi cầu thang" xuất hiện tự nhiên từ mass-spring + bậc StaticBody2D. Điều khiển đầu treo cho sóng truyền xuống.

## CH16. Tinh chỉnh
- iterations/stiffness↑ = cứng; damping 0.96–0.99 = "sống"; 16–28 đốt đẹp & nhẹ; gravity quá cao → "sập".
- Ổn định: sub-stepping, kẹp vận tốc, `_physics_process` (timestep cố định), stiffness≤1 (tăng iterations để cứng hơn).
- Quy trình: chỉnh trong Slinky Lab → ghi tham số → đưa vào `@export`.

---

# L3 — Nâng cao 2D
## CH17. Soft body & rope
- "Điểm + ràng buộc" = nền mọi soft-body 2D: rope (chuỗi thẳng), cloth (lưới ngang/dọc/chéo), jelly (vòng + giữ thể tích), cầu/giàn (ràng buộc cứng).

## CH18. Tối ưu
- Physics ở `_physics_process`; `PackedVector2Array`; giảm điểm/iterations; vẽ bằng 1 Line2D/_draw (ít draw call); object pooling; Profiler; test thiết bị thật (mobile yếu hơn PC).

## CH19. Polish & juice
- GPUParticles2D, Tween, camera shake, Line2D trail, AudioStreamPlayer, squash & stretch. Slinky: âm "boing" theo độ căng, đổi màu theo lực, particle va chạm.

## CH20. Kiến trúc
- Autoload/Singleton (score, AudioManager, **AdsManager**), scene riêng từng phần, Resource (.tres) cho config, signals giảm phụ thuộc, save/load (FileAccess+JSON).

---

# L4 — Xuất bản Mobile & Ads
## CH21. Chuẩn bị mobile
- Cảm ứng; Stretch mode=canvas_items/aspect=expand; orientation; safe area; renderer Mobile/Compatibility; test thiết bị thật; tiết kiệm pin.

## CH22. Export Android
- Export Templates + Android SDK/JDK (OpenJDK 17). Preset Android: package name, icon, version, arm64-v8a.
- Debug → .apk (one-click deploy). Release → **release keystore** (GIỮ KỸ — mất = không update được) → bật Gradle Build → **.aab** lên Play Store.

## CH23. Export iOS
- **Cần macOS + Xcode + Apple Developer**. Export ra dự án Xcode → ký (provisioning/certificate) → build test → Archive → App Store Connect → nộp duyệt. Không build iOS trên Windows/Linux.

## CH24. Tích hợp quảng cáo
- Godot lõi KHÔNG có ads → dùng **plugin** (AdMob/AppLovin). AdMob phổ biến + **mediation** gọi Unity Ads/AppLovin. Chọn 1 SDK mediation làm cửa chính.
- 3 loại: **banner** (dải nhỏ), **interstitial** (toàn màn ở điểm dừng tự nhiên), **rewarded** (tự chọn xem nhận thưởng — eCPM cao, thân thiện nhất).
- Quy trình: tạo Ad Unit ID → cài plugin (Android cần **Gradle Build**) → khai App ID → **consent/GDPR (UMP)** → init/load/show + xử lý signal → **test ad ID** khi dev.
- Bọc trong Autoload `AdsManager`: game chỉ gọi `Ads.show_interstitial()` / `Ads.show_rewarded()`.
```gdscript
# gameplay
if levels_done % 3 == 0: Ads.show_interstitial()   # cách quãng, không spam
func _on_revive(): Ads.show_rewarded()              # opt-in
```
- ⚠️ Không interstitial giữa lúc chơi/khi mở app; ưu tiên rewarded; tuân thủ consent & COPPA nếu hướng trẻ em; KHÔNG bấm ad thật của mình (bị khóa tài khoản).

---

# 🎮 Capstone — Mini-game "Slinky Goal"
Game hoàn chỉnh (bản web chơi được trong file HTML + source Godot từng bước).
- **Luật:** kéo đầu treo (chấm vàng) → đưa **đuôi (chấm cam)** chạm **đích xanh**, né **gai đỏ**. 3 màn tăng dần.
- **Cấu trúc Godot:** `Main(Node2D, main.gd)` → `Slinky(slinky.gd)` + `HUD(CanvasLayer)` [LevelLabel, MsgLabel, RetryButton, SkipButton]. Autoload `Ads` (ch24).
- **slinky.gd:** Verlet (ch13) + vẽ coil (ch14); thêm `anchor: Vector2` (đầu treo do main set), `setup(start)`, `get_tail()`.
- **main.gd:** mảng `levels` ({anchor, goal, goal_r, obstacles:[Rect2]}); `_physics_process`: nếu dragging thì `slinky.anchor = clamp(mouse)`; `_check()`: đuôi chạm goal → `_win()`; bất kỳ điểm trong obstacle Rect2 → `_fail()`; vẽ goal/obstacle ở `_draw()`.
- **Thắng/thua:** `_win()` chờ 0.8s → màn kế; `_fail()` reset màn. `RetryButton`→load_level, `SkipButton`→`Ads.show_rewarded()` → callback gọi `skip_level()`.
- **Mobile/ads:** cảm ứng qua `InputEventScreenTouch` + Emulate Mouse From Touch; interstitial sau mỗi 3 màn (`if current % 3 == 0: Ads.show_interstitial()`).
- **Cơ chế puzzle (bản web màn 3 + Godot):** **hộp đẩy** (RigidBody2D, slinky huých bằng `apply_central_impulse`) → đè **công tắc** (Area2D `body_entered`) → mở **cổng** (StaticBody2D, tắt collision + ẩn).
- **Giờ + sao + lưu kỷ lục:** đồng hồ, ⭐ theo `par`, lưu best — web dùng localStorage; Godot dùng `FileAccess` + JSON ở `user://save.json`.
- **🧩 Level Editor (trong file HTML):** vẽ màn (đầu treo/đích/gai/hộp/công tắc/cổng) → **▶ Chơi thử** ngay hoặc **⬇ Xuất Godot** (Vector2/Rect2) → dán vào mảng `levels` của `main.gd`.
- **Mở rộng thêm:** âm thanh/particle, level từ `.tres`, va chạm thân với nhiều RigidBody2D, mỗi đốt là RigidBody (ch12) để đẩy vật "thật" hơn.

---

## 📋 Cheatsheet
```
Body: StaticBody2D · RigidBody2D · CharacterBody2D · Area2D (+CollisionShape2D)
Joint: PinJoint2D · DampedSpringJoint2D · GrooveJoint2D
Callbacks: _ready · _process(delta) · _physics_process(delta) · _draw · _unhandled_input
RigidBody: apply_central_impulse/force · linear_velocity      Character: velocity + move_and_slide()
Slinky Verlet: v=(p-prev)*damp; prev=p; p+=v+g*dt²;  constraint diff=(len-rest)/len*0.5*stiff
Coil: off = coil_radius * sin(t*coils*TAU)
Export: Android .aab (Gradle+keystore) · iOS (macOS+Xcode) · Ads: plugin + Autoload AdsManager
```

---
*Godot 2D Physics — tham khảo docs.godotengine.org. Godot là engine mã nguồn mở (MIT). Plugin ads (AdMob/Unity/AppLovin) là của bên thứ ba, API có thể đổi.*
