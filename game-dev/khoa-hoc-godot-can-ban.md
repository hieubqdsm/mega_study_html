# 🤖 Godot 4 Căn Bản — Từ Zero Đến Game Đầu Tiên

> Bản Markdown gọn. Phiên bản tương tác (🎮 mini-game **"Né Quỷ"** chơi ngay trong trang, 🗂 **Scene Lab** dựng cây node, flashcards, quiz) ở `khoa-hoc-godot-can-ban.html`. Dùng **Godot 4.x** (GDScript 2.0).

Học làm game từ **con số 0** — không cần biết lập trình, không cần biết Godot: cài engine → tư duy node/scene → GDScript như Python → input, animation, UI, tilemap, âm thanh → tự tay làm **2 game hoàn chỉnh**: **"Né Quỷ"** (theo tutorial kinh điển *Dodge the Creeps* của docs chính thức) và **platformer mini "Hái Sao"**.

**Lộ trình:** L0 Bắt đầu từ số 0 (1–4) → L1 GDScript từ zero (5–9) → L2 Công cụ 2D nền tảng (10–15) → L3 Capstone 2 game (16–19) → L4 Đi tiếp (20).

**Nguồn chính:** Godot Docs — *Step by Step* + *Your first 2D game* · GDQuest — *Learn GDScript From Zero* (27 bài luyện tương tác miễn phí) · Clear Code — *Ultimate Introduction to Godot 4* · Brackeys — *How to make a Video Game*.

---

# L0 — Bắt đầu từ số 0
## CH1. Godot là gì & vì sao đáng học
- Engine **mã nguồn mở 100% (MIT)** — miễn phí thương mại, không tính phí doanh thu, không "ràng buộc cửa hàng". Làm được cả 2D lẫn 3D; 2D rất mạnh.
- **Nhẹ**: một file thực thi ~100MB, chạy thẳng không cần cài; chạy tốt trên máy yếu. So Unity: nhỏ gọn hơn nhiều, 2D "thật" (pixel ≠ đơn vị mét), GDScript dễ hơn C# cho người mới.
- Ngôn ngữ chính: **GDScript** — cú pháp giống Python, thiết kế riêng cho Godot. (C# cũng dùng được nếu muốn.)
- Tải tại godotengine.org → mở → **Project Manager** → New Project → đặt tên, chọn thư mục → renderer: **Compatibility** (nhẹ, đa nền tảng — chọn này nếu phân vân) hoặc **Forward+** (đẹp, mạnh).
- Chạy thử: **F5** chạy game (scene chính), **F6** chạy scene đang mở. Lần đầu tạo Node2D + kéo `icon.svg` vào làm Sprite2D → F6 → thấy ảnh chạy là thành công bước 1.

## CH2. Node & Scene — viên gạch của mọi thứ
- Trong Godot **mọi thứ là Node**: mỗi node làm đúng 1 việc (hiển thị ảnh, phát âm thanh, đếm giờ, va chạm...). Node có **thuộc tính** (vị trí, màu...) và **tín hiệu**.
- Node lồng nhau thành **cây**; một cây được lưu thành **Scene** (tệp `.tscn`). Game = một cây lớn: Main → Player, Mob, HUD...
- **Instance** = nhúng scene này vào scene kia (Player.tscn nhúng vào Main). Sửa Player.tscn → mọi bản nhúng tự cập nhật. Đây chính là "prefab".
- Tên node là "địa chỉ": `$AnimatedSprite2D` trỏ tới node con cùng tên. Đặt tên rõ & không trùng nhau cùng cấp.
- Luyện nhanh (trong 🗂 Scene Lab của bản HTML): Player = CharacterBody2D + Sprite2D + CollisionShape2D; HUD = CanvasLayer + Label + Button + Timer.

## CH3. Làm quen Editor
- 5 vùng: **Scene** (cây node, trái trên) · **FileSystem** (`res://` — thư mục dự án, trái dưới) · **Viewport** (giữa, dàn cảnh) · **Inspector** (phải — thuộc tính node đang chọn) · **Dock dưới** (tab Node: Signals/Groups; tab Debugger).
- Inspector = chỉnh mọi thứ **không cần code** (vị trí, màu, tốc độ...). Ô có mũi tên = về giá trị mặc định. Biến `@export` tự hiện ở đây.
- Viewport 2D: Space+kéo = pan, lăn chuột = zoom; phím tắt **Q/W/E/R** = chọn/di chuyển/xoay/phóng; lưới & snap ở thanh công cụ.
- Tổ chức thư mục từ đầu: `player/`, `mobs/`, `ui/`, `assets/` — kéo thả trong FileSystem. **Ctrl+S** lưu scene; tạo scene mới: Scene → New Scene → chọn root.
- Tab trên cùng: **2D / 3D / Script** — F5/F6 chạy, nút ▶| dừng.

## CH4. Tư duy lập trình (dành cho người chưa từng code)
- Code = **danh sách chỉ dẫn** máy chạy lần lượt trên xuống, thụt lề = nhóm chỉ dẫn. Game = vòng lặp ~60 lần/giây: *đọc input → cập nhật → vẽ*.
- **Lỗi là bình thường**: thông báo đỏ có số dòng — bấm nhảy tới chỗ sai, sửa, chạy lại. `print("giá trị:", x)` là công cụ debug số 1.
- Tách việc lớn thành việc nhỏ (hàm): "nếu bấm trái → chạy trái" dễ đọc hơn "nếu key A scancode 65...". **Đặt tên rõ**: `move_speed` tốt hơn `ms`.
- Kiểu dữ liệu là "loại hộp chứa": số nguyên (điểm), số thập phân (máu), chữ (tên), đúng/sai (còn sống?).
- Muốn luyện thuần GDScript kiểu làm bài chấm tự động: **GDQuest "Learn GDScript From Zero"** (gdquest.github.io/learn-gdscript) — 27 bài miễn phí, chạy ngay trên trình duyệt.

---

# L1 — GDScript từ zero
## CH5. Biến, kiểu dữ liệu & toán tử
```gdscript
var ten = "Binh"            # hộp chứa, gán lại được
var diem := 0               # := tự suy kiểu (int)
var speed: float = 300.0    # khai báo kiểu tường minh
const GRAVITY := 1500.0     # hằng số — không đổi
@export var speed := 300.0  # hiện trong Inspector, chỉnh không cần sửa code
@onready var sprite := $Sprite2D   # tham chiếu node con khi scene sẵn sàng
```
- Kiểu gốc: `int` (số nguyên) · `float` (thập phân) · `String` (chữ) · `bool` (true/false) · `Vector2` (cặp số — vị trí!) · `Array` (danh sách) · `Dictionary` (tra cứu theo khóa).
- Toán tử: `+ - * / %` (chia lấy dư); so sánh `== != < > <= >=` trả về bool; nối chuỗi bằng `str("Điểm: ", diem)` hoặc `"%d điểm" % diem`.
- Ngẫu nhiên: `randi_range(1, 6)` (xúc xắc), `randf_range(0.8, 1.2)`, `randf()` (0→1). Godot 4 tự xáo số ngẫu nhiên mỗi lần chạy.
- 🎯 Thực hành: gắn script vào Node2D, `print("Xin chào Godot!")` trong `_ready()` → F6 xem Output.

## CH6. Hàm & rẽ nhánh
```gdscript
func take_damage(amount: int, is_poison: bool) -> void:
    health -= amount * (2 if is_poison else 1)
    if health <= 0:
        die()
    elif health < 30:
        print(" Nguy hiểm!")
    else:
        print("Máu: ", health)
```
- `func tên(tham số) -> kiểu:` — hàm = việc nhỏ có tên; `return` trả giá trị / thoát sớm. Thụt lề bằng **Tab**.
- Điều kiện: `if / elif / else`; ghép bằng `and`, `or`, `not`; `x if điều_kiện else y` = rút gọn 3 dòng.
- Hàm đặc biệt Godot **tự gọi**: `_ready()` (1 lần lúc khởi tạo), `_process(delta)` (mỗi frame), `_physics_process(delta)` (mỗi bước vật lý), `_input(event)`.

## CH7. Mảng, Dictionary & vòng lặp
```gdscript
var enemies := ["gai", "quỷ", "dơi"]
enemies.append("sếp")                  # thêm
for e in enemies: print("Gặp:", e)     # duyệt hết
print(enemies.size(), enemies[0])      # 4, "gai"

var config := {"speed": 300, "color": "xanh"}
config["speed"] = 350                  # tra/gán theo khóa
for k in config: print(k, "=", config[k])

for i in range(3): spawn(i)            # lặp 0,1,2
while hp > 0: hp -= 1                  # lặp khi điều kiện đúng (cẩn thận vòng lặp vô hạn!)
```
- Array = danh sách có thứ tự (danh sách quân địch, điểm từng màn). Dictionary = tra cứu nhanh theo khóa (bảng cấu hình, lưu game).
- `pick_random()` chọn ngẫu nhiên 1 phần tử — dùng hoài trong game.

## CH8. Vòng lặp game: _process, delta & Vector2
- `_process(delta)` gọi mỗi frame; `delta` = thời gian frame trước (khác nhau mỗi máy). **Luôn nhân delta**: `position += v * delta` → tốc độ như nhau trên máy 30fps lẫn 144fps.
- Physics để trong `_physics_process` (timestep cố định 60Hz). Quy tắc: hiển thị/đếm giờ → `_process`; di chuyển body/va chạm → `_physics_process`.
```gdscript
extends Node2D
@export var speed := 300.0
func _process(delta: float) -> void:
    position += Vector2.RIGHT * speed * delta        # đi phải
    rotation += delta                                 # xoay 1 radian/giây
```
- **Vector2** là kiểu quan trọng nhất của game 2D: `position`, `velocity`, hướng. Phép tính trực tiếp: `+ -`, `* số`; `.length()` (độ dài), `.normalized()` (độ dài = 1, giữ hướng — chống đi chéo nhanh hơn), `.rotated(angle)`, `.angle()`.
- Hằng có sẵn: `Vector2.ZERO / ONE / UP / DOWN / LEFT / RIGHT`; `Vector2.from_angle(a)` tạo vector hướng từ góc; `TAU` = 2π = trọn vòng.

## CH9. Signals — node nói chuyện với nhau
- Signal = **tín hiệu phát – nghe** (observer pattern): node phát sự kiện, ai quan tâm thì kết nối — node không cần biết về nhau.
- Có sẵn: Button → `pressed` · Timer → `timeout` · Area2D → `body_entered(body)` · AnimatedSprite2D → `animation_finished`.
```gdscript
signal game_over                     # tự khai báo signal
func die(): game_over.emit()         # PHÁT

func _ready():
    $StartButton.pressed.connect(_on_start)     # NGHE (Godot 4: connect bằng Callable)
func _on_start(): new_game()
```
- Kết nối 2 cách: **Node dock → Signals** (đúp chuột signal → chọn node nhận → Godot tự sinh hàm `_on_tên_node_tên_signal`) hoặc bằng code như trên.
- **Groups** — "địa chỉ nhóm": `add_to_group("mobs")`; gọi hàng loạt: `get_tree().call_group("mobs", "queue_free")`; hỏi: `is_in_group("mobs")`.
- Timer node: `wait_time`, `one_shot`, `autostart`; hoặc chờ 1 giây trong code: `await get_tree().create_timer(1.0).timeout`.

---

# L2 — Công cụ 2D nền tảng
## CH10. Input: phím, chuột, cảm ứng
- **Input Map** (Project Settings): định nghĩa *action* (`move_left`, `jump`...) rồi gán phím. Dùng action — đừng hard-code phím — để dễ đổi & chơi được bằng gamepad/touch.
```gdscript
var dir := Input.get_vector("move_left", "move_right", "move_up", "move_down")  # Vector2 sẵn
if Input.is_action_just_pressed("jump"): jump()      # bấm 1 lần
if Input.is_action_pressed("move_right"): ...        # giữ
```
- Chuột: `get_global_mouse_position()`, bắt sự kiện trong `_unhandled_input(event)` (`event.is_action_pressed("click")`, `event.position`).
- Mobile: bật **Emulate Mouse From Touch** (Project Settings) là code chuột chạy trên cảm ứng; nút ảo = `TouchScreenButton` gán action.

## CH11. Sprite & Animation
- `Sprite2D`: thả ảnh vào `texture`; `flip_h/v` lật; `modulate` nhuộm màu (làm hiệu ứng nhấp nháy đỏ); `region_enabled` cắt ô từ ảnh lớn.
- `AnimatedSprite2D` + tài nguyên `SpriteFrames`: tạo animation trong panel Animation (kéo dàn frame vào); code: `play("run")`, `stop()`, `flip_h`; `.sprite_frames.get_animation_names()`.
- `AnimationPlayer`: keyframe **mọi thuộc tính** (vị trí, màu, volume...) theo thời gian; `play("hit")`.
- **Tween** — hiệu ứng 1 dòng: `create_tween().tween_property($Sprite2D, "modulate:a", 0.0, 0.5)` (mờ dần 0.5s); `.set_trans(Tween.TRANS_BOUNCE)`, `tween_method`, chain `.set_loops()`.

## CH12. Va chạm 2D cơ bản
- 4 loại body: **StaticBody2D** (tường/nền, bất động) · **CharacterBody2D** (bạn tự lái) · **RigidBody2D** (engine mô phỏng) · **Area2D** (cảm biến — *phát hiện* chứ không chặn).
- Mỗi body cần con **CollisionShape2D**: chọn hình gần đúng (nhân vật = capsule, viên đạn = circle); chỉnh bán kính/kích thước khớp ảnh.
- **Layers/Masks**: layer = "tôi thuộc lớp nào", mask = "tôi va với lớp nào". Game nhỏ: để mặc định. Hạt cần: đạn (layer 2, mask 2) vs quái (layer 2, mask 2) không chạm player.
- Hút đồ (Area2D):
```gdscript
func _on_area_2d_body_entered(body):     # Player (body) đi vào vùng Coin
    if body.is_in_group("player"):
        body.add_score(1)
        queue_free()                     # biến mất
```
- 👉 Đi sâu RigidBody, lực, joints, layers/masks thật: khóa **Godot 2D Physics** trong repo này.

## CH13. CharacterBody2D — di chuyển kiểu platformer
```gdscript
extends CharacterBody2D
@export var speed := 300.0
@export var jump_force := -400.0
@export var gravity := 1500.0

func _physics_process(delta: float) -> void:
    velocity.x = Input.get_axis("move_left", "move_right") * speed
    if is_on_floor() and Input.is_action_just_pressed("jump"):
        velocity.y = jump_force
    velocity.y += gravity * delta          # gravity tự cộng mỗi bước
    move_and_slide()                        # di chuyển + tự trượt tường/sàn
```
- Godot 4: gán vào `velocity` rồi gọi `move_and_slide()` (không tham số). `is_on_floor()/is_on_wall()` chỉ đúng **sau** move_and_slide.
- Top-down (không trọng lực)? Bỏ gravity, gán `velocity = dir * speed` — hoặc như game "Né Quỷ": Area2D + `position += v * delta`.
- Mẹo cảm giác: **coyote time** (cho nhảy thêm ~0.1s sau rời mép), **jump buffer** (nhớ phím nhảy ~0.1s trước chạm sàn), rơi nhanh hơn bay: `gravity * 1.5` khi `velocity.y > 0`.

## CH14. TileMap & Camera2D
- **TileMapLayer** (Godot 4.3+; bản cũ là TileMap): vẽ map bằng "gạch" cắt từ ảnh lưới; tạo TileSet → kéo spritesheet vào → tự cắt ô → vẽ bằng chuột (B xóa, Shift+chuột chọn ô).
- Bật va chạm: TileSet → Physics Layers → thêm layer 0 → vẽ collision polygon cho từng tile (thường đủ ô vuông mặc định).
- Nhiều TileMapLayer: nền (không va chạm) / địa hình (có) / trang trí — z_index riêng.
- **Camera2D** (đặt làm con của Player để bám theo): `position_smoothing_enabled` + speed (mượt); `limit_left/right/top/bottom` khoá mép map; `zoom` phóng to nhỏ.

## CH15. UI, HUD & âm thanh
- Node UI đều là **Control**: `Label` (chữ), `Button` (bấm — nghe signal `pressed`!), `TextureRect` (ảnh), `ProgressBar` (máu). **Anchor preset** (menu neo ở đầu Inspector khi chọn Control) neo về góc/giữa để co giãn đẹp.
- Container tự dàn: `VBoxContainer` (xếp dọc), `HBoxContainer` (ngang), `MarginContainer`. UI luôn đặt trong **CanvasLayer** — vẽ trên gameplay, không bị camera kéo đi.
- Đổi font: Theme Overrides → Font → kéo tệp `.ttf` (dùng font pixel cho game retro); font size cũng ở đó.
- Âm thanh: `AudioStreamPlayer` (nhạc nền — `autoplay`, Loop trong Import) & `AudioStreamPlayer2D` (sfx theo vị trí — nghe nhỏ khi xa). Nút loa cạnh node trong cây = chọn audio nhanh. `volume_db`; `play()`.
- Trộn 2 bus Music/SFX trong Audio panel → chỉnh volume riêng cho từng loại.

---

# L3 — Capstone: 2 game hoàn chỉnh
> Game A **"Né Quỷ"** đi theo tutorial kinh điển *Your first 2D game — Dodge the Creeps* của docs Godot (di chuyển + né quỷ + điểm + HUD + âm thanh + particles). Game B **"Hái Sao"** là platformer mini tổng hợp L2. Assets mẫu: tải ở link "art assets" trong trang docs.

## CH16. "Né Quỷ" #1 — Scene Player
- **Player.tscn**: root `Area2D` + `AnimatedSprite2D` (animation "walk" & "up") + `CollisionShape2D`. Dùng Area2D vì cần *biết* chạm quỷ, không cần chặn.
```gdscript
# player.gd — theo docs chính thức
extends Area2D
signal hit
@export var speed := 400
var screen_size

func _ready():
    screen_size = get_viewport_rect().size
    hide()

func _process(delta):
    var velocity := Vector2.ZERO
    if Input.is_action_pressed("move_right"): velocity.x += 1
    if Input.is_action_pressed("move_left"):  velocity.x -= 1
    if Input.is_action_pressed("move_down"):  velocity.y += 1
    if Input.is_action_pressed("move_up"):    velocity.y -= 1
    if velocity.length() > 0:
        velocity = velocity.normalized() * speed
        $AnimatedSprite2D.play()
    else: $AnimatedSprite2D.stop()
    position += velocity * delta
    position = position.clamp(Vector2.ZERO, screen_size)   # không ra khỏi màn
    if velocity.x != 0:
        $AnimatedSprite2D.animation = "walk"
        $AnimatedSprite2D.flip_h = velocity.x < 0
    elif velocity.y != 0:
        $AnimatedSprite2D.animation = "up"
        $AnimatedSprite2D.flip_v = velocity.y > 0

func start(pos):           # gọi khi bắt đầu ván mới
    position = pos; show()
    $CollisionShape2D.set_deferred("disabled", false)

func _on_body_entered(_body):       # quỷ (RigidBody2D) đâm vào
    hide(); hit.emit()
    $CollisionShape2D.set_deferred("disabled", true)  # deferred: đang trong callback vật lý
```
- Bài học: `clamp` giữ trong màn; `set_deferred` khi đổi thuộc tính vật lý trong callback; animation đổi theo hướng di chuyển.

## CH17. "Né Quỷ" #2 — Mob & spawn ngẫu nhiên
- **Mob.tscn**: root `RigidBody2D` (Gravity Scale = 0 — không rơi; bỏ tick mask 1 để quỷ không dính nhau) + `AnimatedSprite2D` (animation `fly`/`swim`/`walk`, speed 3) + `CollisionShape2D` (capsule xoay 90°) + `VisibleOnScreenNotifier2D`.
```gdscript
# mob.gd
extends RigidBody2D
func _ready():
    var types := $AnimatedSprite2D.sprite_frames.get_animation_names()
    $AnimatedSprite2D.animation = types.pick_random()
    $AnimatedSprite2D.play()
func _on_visible_on_screen_notifier_2d_screen_exited():
    queue_free()          # bay khỏi màn → tự xóa (tránh rò rỉ bộ nhớ)
```
- **Main.tscn**: `Node` + Player + `MobTimer` (0.5s) + `ScoreTimer` (1s) + `StartTimer` (2s, One Shot) + `StartPosition` (Marker2D) + `MobPath` (Path2D vẽ vòng chữ nhật **theo chiều kim đồng hồ** để `+PI/2` chỉa vào trong màn) → `MobSpawnLocation` (PathFollow2D).
```gdscript
# main.gd — spawn 1 con mỗi lần MobTimer timeout
@export var mob_scene: PackedScene
func _on_mob_timer_timeout():
    var mob := mob_scene.instantiate()
    var loc := $MobPath/MobSpawnLocation
    loc.progress_ratio = randf()                      # điểm ngẫu nhiên trên đường viền
    mob.position = loc.position
    var direction := loc.rotation + PI / 2            # vuông góc path → chỉa vào trong
    direction += randf_range(-PI / 4, PI / 4)         # lệch tối đa ±45°
    mob.rotation = direction
    mob.linear_velocity = Vector2(randf_range(150.0, 250.0), 0.0).rotated(direction)
    add_child(mob)
```
- Ý tưởng lớn: **Path2D + PathFollow2D** = sinh vật từ *viền màn hình* hướng vào trong; tốc độ & góc ngẫu nhiên.

## CH18. "Né Quỷ" #3 — HUD, điểm số & hoàn thiện
- **HUD.tscn**: `CanvasLayer` + `ScoreLabel` + `Message` (Autowrap: Word) + `StartButton` + `MessageTimer` (2s, One Shot). Signal riêng `start_game` báo Main nút đã bấm.
```gdscript
# hud.gd (rút gọn)
extends CanvasLayer
signal start_game
func update_score(score): $ScoreLabel.text = str(score)
func show_message(text):
    $Message.text = text; $Message.show()
    $MessageTimer.start()
func show_game_over():
    show_message("Game Over")
    await $MessageTimer.timeout
    $Message.text = "Né Quỷ!"; $Message.show()
    await get_tree().create_timer(1.0).timeout
    $StartButton.show()
func _on_start_button_pressed():
    $StartButton.hide(); start_game.emit()
```
- **main.gd hoàn thiện**: `game_over()` → nhạc dừng, `DeathSound.play()`, timer dừng, HUD hiện; `new_game()` → score=0, `call_group("mobs","queue_free")`, player.start(...), HUD ẩn nút + "Sẵn sàng!", StartTimer chạy; `_on_start_timer_timeout` → bật Mob/ScoreTimer + nhạc; `_on_score_timer_timeout` → score += 1.
- Nối signal: StartButton.pressed → HUD; HUD.start_game → Main.new_game; Player.hit → Main.game_over; 3 Timer.timeout → 3 hàm.
- **Polish (07.finishing)**: `GPUParticles2D` cho player nổ tung (`one_shot`, `emitting`, xóa sau 1s bằng SceneTree timer); nhạc `Music` autoplay + `DeathSound`; delight: chạm quỷ → ẩn player + nổ + rung nhẹ.

## CH19. "Hái Sao" — platformer mini (tổng hợp L2)
- Mục tiêu 1 buổi tối: di chuyển + nhảy (CH13), map TileMapLayer (CH14), camera mượt, coin = Area2D (CH12), quỷ đi tuần giữa 2 Marker2D (`move_toward` + lật `flip_h` khi chạm điểm cuối), HUD đếm sao (CH15), thắng khi đủ sao → sang màn.
- Cấu trúc: `Main (Node2D)` → `TileMapLayer` + `Player (CharacterBody2D)` + `Coins (Node2D chứa nhiều instance Coin.tscn)` + `Enemies` + `HUD (CanvasLayer)` + `Goal (Area2D)`.
- Coin.tscn: Area2D + Sprite2D + CollisionShape2D + Tween xoay lặp; script: `body_entered` + group "player" → `CoinsManager.collect()` → queue_free.
- Quỷ đi tuần: hướng = `-1 ↔ 1` khi chạm tường (`is_on_wall()`), lật `flip_h`; chạm quỷ → mất tim/trở lại checkpoint (Marker2D gần nhất).
- Bài học tổng hợp: chia scene nhỏ + instance, signal `collected` tự tạo, `@export` cho tốc độ/nhảy để chỉnh "cảm giác" nhanh, save kỷ lục bằng `FileAccess` (xem bên dưới).
```gdscript
# Lưu/đọc kỷ lục (FileAccess + JSON — Godot 4)
func save_best(score: int) -> void:
    var f := FileAccess.open("user://save.json", FileAccess.WRITE)
    f.store_line(str({"best": score}))
func load_best() -> int:
    if not FileAccess.file_exists("user://save.json"): return 0
    var text := FileAccess.open("user://save.json", FileAccess.READ).get_line()
    return str_to_var(text)["best"]
```

---

# L4 — Đi tiếp
## CH20. Vẽ bản đồ phía trước
- **3D**: cùng tư duy node — `Node3D`, `MeshInstance3D`, `Camera3D`, `DirectionalLight3D`, `WorldEnvironment`. Docs có *Your first 3D game* (game bắn xe tăng đơn giản) — nên làm sau khi vững 2D.
- **Export chia sẻ**: Project → Export → thêm preset (Windows/Linux/macOS/Web) → tải Export Templates lần đầu → Export → gửi file cho bạn bè; Web export chạy Godot trên trình duyệt.
- **Đường dài hơn trong repo này**: khóa **Godot 2D Physics** (RigidBody, joints, Slinky, export mobile + ads) → hướng dẫn **Hack & Slash Isometric RPG** → khóa **Game Design** (thiết kế mức, juice, cân bằng).
- Nguồn liệu tốt: docs.godotengine.org (Step by Step, GDScript basics, Style Guide) · GDQuest learn-gdscript · Clear Code "Ultimate Introduction to Godot 4" (video 11+ tiếng, cực kỳ đầy đủ) · Brackeys.
- **Quy tắc vàng sau khóa này**: làm game nhỏ mà HOÀN CHỈNH (menu + thắng thua + âm thanh) > làm game lớn bỏ dở. Mỗi tuần 1 game nhỏ, difficulty tăng dần.

---

## 📋 Cheatsheet
```
Node 2D:   Node2D · Sprite2D · AnimatedSprite2D · Camera2D · TileMapLayer · CanvasLayer
Body:      StaticBody2D · CharacterBody2D (velocity + move_and_slide) · RigidBody2D · Area2D (+CollisionShape2D)
Callback:  _ready · _process(delta) · _physics_process(delta) · _input(e) · _unhandled_input(e)
Input:     Input.get_vector/get_axis · is_action_pressed/just_pressed · Input Map action
GDScript:  var x := 5 · const · @export · @onready $Node · signal + .emit() + .connect(fn)
Vector2:   .normalized() · .rotated(a) · .length() · .angle() · Vector2.from_angle(a) · TAU
Timer:     wait_time/one_shot/autostart · timeout · await get_tree().create_timer(1.0).timeout
UI:        Control · Label · Button(pressed) · VBox/HBox · anchors · Theme Overrides
Audio:     AudioStreamPlayer (nhạc) · AudioStreamPlayer2D (sfx) · volume_db
Spawn:     PackedScene.instantiate() + add_child · Path2D/PathFollow2D · randf_range · pick_random
Dọn dẹp:   queue_free() · VisibleOnScreenNotifier2D.screen_exited · call_group("mobs","queue_free")
Save:      FileAccess "user://" WRITE/READ + str_to_var/var_to_str (JSON)
```

---
*Godot 4 Căn Bản — biên soạn từ Godot Docs chính thức (Step by Step, Your first 2D game), GDQuest Learn GDScript From Zero, Clear Code & Brackeys. Godot là engine mã nguồn mở (MIT). Ảnh & assets mẫu "Dodge the Creeps" thuộc tài liệu chính thức Godot.*
