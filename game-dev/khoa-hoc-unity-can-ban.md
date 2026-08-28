# 🎮 Unity 6 Căn Bản — Từ Zero Đến Game 2D & 3D Đầu Tiên

> Bản Markdown gọn. Phiên bản tương tác (🎮 mini-game **"Cứu Robot"** chơi ngay, 🗂 **Component Lab** luyện ghép component, flashcards, quiz) ở `khoa-hoc-unity-can-ban.html`. Dùng **Unity 6 (6000.x LTS)** + **C#**.

Học làm game từ **con số 0** — chưa code bao giờ cũng học được: cài Unity Hub → tư duy **GameObject/Component** → **C#** từ đầu → sprite, tilemap, animation, UI, âm thanh → **2 game hoàn chỉnh**: **"Ruby"** (RPG 2D theo project chính thức *Ruby's Adventure*) và **"Nhà Ma"** (stealth 3D theo course chính thức *Haunted House*, Unity 6.3). Lớp tra cứu: **Unity 6.5 Manual 3.534 trang offline** có sẵn trong repo.

**Lộ trình:** L0 Bắt đầu từ số 0 (1–4) → L1 C# từ zero (5–9) → L2 Công cụ 2D + Ruby (10–16) → L3 3D + Nhà Ma (17–20) → L4 Đi tiếp (21).

**Nguồn chính (đều miễn phí):** Unity Learn — *Unity Essentials* · *Create with Code* · *Ruby's Adventure 2D Beginner* (video full `youtube.com/watch?v=mkBPGC0BVXg`) · *3D Stealth Game: Haunted House* (Unity 6.3) · pathway *Junior Programmer*. Tham khảo cũ tốt: Brackeys (lưu ý version ≤2022).

---

# L0 — Bắt đầu từ số 0
## CH1. Unity là gì & vì sao đáng học
- Engine **thị trường nhất thế giới** (mobile game, indie, AAA-nhẹ); ngôn ngữ **C#** — kỹ năng chuyển dịch được sang web/app doanh nghiệp. Miễn phí cá nhân (Personal, doanh thu <$200k/năm).
- So Godot (khóa cùng repo): Unity nặng hơn (Hub + Editor ~GB), chỉnh sửa nhanh hơn nhờ asset store khổng lồ + việc làm nhiều hơn; Godot nhẹ, mã mở 100%, 2D "thật". Học cả hai = hiểu tư duy engine.
- Phiên bản khóa dùng: **Unity 6 LTS (6000.x)** qua **Unity Hub**. Sau này gặp tutorial cũ (2019–2022) vẫn đọc được — đổi vài chỗ (vd `rb.velocity` → `rb.linearVelocity` ở Unity 6).

## CH2. Cài đặt — Unity Hub & project đầu tiên
- Tải **Unity Hub** (unity.com/download) → cài **Unity 6 LTS** từ tab Installs (kèm module Visual Studio/VS Code nếu chưa có — viết C# cần IDE).
- Hub → **New Project** → chọn template: **Universal 2D** (làm 2D) hoặc **Universal 3D** (URP — render hiện đại); đặt tên `hoc-unity` → Create.
- Mặc định mở Scene `SampleScene` trong `Assets/Scenes/`. **Ctrl+S** lưu scene. ▶ **Play** (Ctrl+P) chạy thử — **Pause** (Ctrl+Shift+P) đóng băng frame để soi, **Step** tiến từng bước.
- Làm quen nhanh: tạo GameObject 3D (Hierarchy → chuột phải → 2D Object/Sprite hoặc 3D Object/Cube) → bấm ▶ nhìn Game view.

## CH3. Làm quen Editor
- 6 vùng: **Hierarchy** (trái trên — mọi GameObject trong scene) · **Scene** (giữa — dàn cảnh) · **Game** (giữa — hình người chơi thấy) · **Inspector** (phải — component của object đang chọn) · **Project** (dưới — Assets: code, ảnh, prefab) · **Console** (dưới — log/lỗi của `Debug.Log`).
- Phím giống Godot: **Q** pan · **W** di chuyển · **E** xoay · **R** scale · **F** tập trung vào object đang chọn · chuột phải + WASD bay quanh scene 3D.
- Inspector = chuỗi **component** của GameObject — mọi thứ thêm/bớt/sửa ở đây; Reset component bằng bánh răng ⚙.
- Tổ chức Project: `Scripts/`, `Sprites/`, `Prefabs/`, `Scenes/` — tạo folder chuột phải → Create → Folder. **Đừng** để file lỏng lẻo ở Assets root.

## CH4. GameObject, Component & Prefab — viên gạch của Unity
- **GameObject** = vật chứa; hành vi nằm trong **Component** ghép vào: `Transform` (vị trí/xoay/scale — có sẵn mọi object), `SpriteRenderer` (hiện ảnh), `Rigidbody2D` (vật lý), `BoxCollider2D` (va chạm), script tự viết cũng là 1 component.
- Khác Godot (node lồng cây): Unity **phẳng** — 1 object + nhiều component; cha–con chỉ qua Transform hierarchy.
- **Prefab** = kéo GameObject từ Hierarchy vào Project → thành khuôn tái sử dụng; sửa prefab (bấm đúp vào Prefab Mode) → mọi bản trong các scene tự cập nhật.
- Tag & Layer: đánh dấu nhóm object (tag "Player") và điều khiển va chạm theo layer (phần L2).
- 🗂 Component Lab (trong bản HTML): luyện ghép đúng component cho Player Ruby / Robot / Enemy / Main Camera.

---

# L1 — C# từ zero
## CH5. Script đầu tiên
```csharp
using UnityEngine;

public class Hello : MonoBehaviour   // class tên TRÙNG tên file
{
    public float speed = 5f;         // public → hiện trong Inspector, chỉnh không sửa code
    void Start()                     // chạy 1 LẦN trước frame đầu
    {
        Debug.Log("Xin chào Unity!");
    }
    void Update()                    // chạy MỖI frame
    {
        transform.position += Vector3.right * speed * Time.deltaTime;
    }
}
```
- Gắn script: kéo file script vào GameObject (hoặc Add Component → tên script). Sai cú pháp → Console báo đỏ kèm **số dòng**, bấm nhảy tới.
- Khác GDScript: C# **có dấu `;` cuối lệnh**, khối bằng **`{ }`** (không thụt lề), **khởi tạo phải kiểu tường minh**.

## CH6. Biến, kiểu dữ liệu & toán tử
```csharp
int diem = 0;                        // số nguyên
float speed = 2.5f;                  // thập phân — PHẢI có chữ f
bool conSong = true;
string ten = "Bình";
int[] mang = new int[3];            // mảng
List<int> ds = new List<int>();     // danh sách — cần using System.Collections.Generic;
ds.Add(10);
Debug.Log($"Điểm: {diem}");          // nội suy chuỗi $"" — tiện nhất
```
- Quy ước đặt tên: biến `camelCase`, hàm/lớp `PascalCase`, hằng `UPPER_CASE`/`const`.
- `[SerializeField] private int mau = 3;` — private mà vẫn hiện Inspector (chuẩn mực).

## CH7. Rẽ nhánh, vòng lặp & hàm
```csharp
void Mau(int damage, bool doc = false)
{
    mau -= damage * (doc ? 2 : 1);           // if rút gọn
    if (mau <= 0) Chet();
    else if (mau < 30) Debug.Log("Nguy hiểm!");
}
void Chet() { /* ... */ }
// vòng lặp
for (int i = 0; i < 3; i++) Spawn(i);
foreach (var q in dsQuy) q.DiChuyen();
```
- Các hàm đặc biệt Unity tự gọi: `Start()` (1 lần) · `Update()` (mỗi frame) · `FixedUpdate()` (mỗi bước vật lý 0.02s) · `OnTriggerEnter2D(other)` (va chạm — L2) · `OnDestroy()`.

## CH8. OOP căn bản cho game
- Class = bản vẽ object: field (dữ liệu) + method (hành vi). `public/private` kiểm soát truy cập; `static` thuộc lớp không cần thể hiện.
- **Kế thừa**: `class EnemyController : MonoBehaviour` — mọi script Unity kế thừa MonoBehaviour (nên có Start/Update).
- `GetComponent<Rigidbody2D>()` — lấy component khác trên cùng object; cache 1 lần trong Start là chuẩn:
```csharp
private Rigidbody2D rb;
void Start() { rb = GetComponent<Rigidbody2D>(); }
```
- Đối tượng UnityEngine hay dùng: `Transform`, `GameObject`, `Vector2/3` (+ `-Distance`, `.normalized`, `.Lerp`), `Quaternion.Euler(0,0,angle)` cho xoay 2D.

## CH9. Vòng lặp game, delta & input
- `Update()` mỗi frame (thời gian thay đổi); `FixedUpdate()` timestep cố định 50Hz — **vật lý để đây**. Luôn nhân `Time.deltaTime` khi chuyển động trong Update.
- Input (hệ cũ — đơn giản, tutorial chính thức dùng): `Input.GetAxisRaw("Horizontal")` (-1/0/1), `Input.GetKeyDown(KeyCode.Space)`. Unity còn Input System mới (event-driven) — gặp sau.
```csharp
void Update()
{
    float x = Input.GetAxisRaw("Horizontal");
    float y = Input.GetAxisRaw("Vertical");
    transform.position += new Vector3(x, y, 0) * speed * Time.deltaTime;
}
```
- Chuột: `Input.mousePosition`, `Camera.main.ScreenToWorldPoint(...)`, `OnMouseDown()` trong collider 2D.

---

# L2 — Công cụ 2D & Capstone "Ruby"
## CH10. Sprite & Sprite Editor
- Thả PNG vào Project → import; kéo vào Scene = tự tạo object có SpriteRenderer. **Pixels Per Unit** (mặc định 100) quyết định "to nhỏ" — cả project nên dùng 1 PPU.
- **Sprite Editor → Slice** (Automatic/Grid) cắt spritesheet thành nhiều sprite con — bộ ảnh nhân vật chạy/nhảy nằm trong 1 file.
- Sắp chồng: `Sorting Layer` + `Order in Layer` (2D vẽ theo thứ tự này, không theo Z như 3D).
- `flipX`, `color` (nhuộm), `size` chỉnh trong Inspector của SpriteRenderer.

## CH11. Tilemap — vẽ map bằng "gạch"
- Hierarchy → 2D Object → Tilemap → Rectangular (tạo Grid + Tilemap con) → mở cửa sổ **Tile Palette** (Window > 2D > Tile Palette) → kéo spritesheet vào tạo palette → **bấm chọn ô vẽ**, chuột phải xóa, Shift+chuột hút mẫu.
- Va chạm: Add Component **Tilemap Collider 2D** (+ **Composite Collider 2D** gộp biên liền mạch) — gạch nào có collider thành tường.
- Nhiều Tilemap con: Background (không collider) / Ground (có) — giống Godot.

## CH12. Animation — Animator Controller
- Chọn object có SpriteRenderer → Window > Animation > Animation → Create clip "Idle"/"Walk" → kéo dàn frame vào timeline (đổi Samples đổi tốc độ).
- Tự sinh **Animator Controller** với state đầu là mặc định; thêm state → kéo transition; thêm **Parameter** (Bool `isWalking`, Trigger `hit`) điều khiển chuyển state từ code:
```csharp
animator.SetBool("isWalking", x != 0);
animator.SetTrigger("hit");
```
- Lưu ý: transition mặc định có **Exit Time** — tắt nếu muốn đổi state tức thì theo parameter.

## CH13. UI — Canvas, TMP & nút bấm
- **Canvas** (Overlay) chứa mọi UI; mọi UI phải là con Canvas. **TextMeshPro** (TMP) cho chữ đẹp (lần đầu dùng sẽ hỏi Import Essentials — đồng ý).
- **Anchor** neo UI theo góc/giữa màn; **Button** có sự kiện `OnClick` kéo GameObject + chọn hàm public — không cần code nối.
- Thanh máu: **Slider** (ẩn handle) hoặc Image loại **Filled**; cập nhật từ code `slider.value = mau / mauMax;`
- Text đổi số: `textUI.text = $"⭐ {diem}/10";`

## CH14. Âm thanh
- GameObject → Add Component **Audio Source**: kéo AudioClip, `Play On Awake` (nhạc nền), `Loop`, **Spatial Blend** 0 = 2D (nhạc/UI) — 1 = 3D (âm theo vị trí).
- `AudioListener` thường nằm trên Main Camera (1 scene 1 cái). Code: `audioSource.Play()` / `.PlayOneShot(clip)` (chồng tiếng) / `.Stop()`.
- Định dạng: `.ogg` nhạc (loop nhẹ), `.wav` sfx ngắn.

## CH15. Vật lý 2D & trigger — mảnh ghép quan trọng nhất
- **Rigidbody2D** (Dynamic = engine mô phỏng; Kinematic = bạn tự lái) + Collider2D (Box/Circle). Nhân vật Ruby kiểu **Kinematic/Rigidbody hybrid**: dùng `rb.linearVelocity` (Unity 6; bản cũ là `velocity`) cho mượt + đẩy object.
- **Trigger**: tick `Is Trigger` = "không chặn, chỉ phát hiện" → callback:
```csharp
void OnTriggerEnter2D(Collider2D other)
{
    if (other.CompareTag("Robot")) other.GetComponent<Robot>().SuaChua();
    if (other.CompareTag("Gai")) mau -= 1;
}
```
- Damage zone, vùng nhặt đồ, cửa — đều là trigger. Gửi sát thương lên player: `other.transform.GetComponent<RubyController>().ChangeHealth(-1);`

## CH16. Capstone 2D — "Ruby" (Ruby's Adventure rút gọn)
- **P1 — Ruby & thế giới**: project 2D; Ruby = Sprite + Rigidbody2D + CircleCollider2D + `RubyController` (di chuyển chuẩn hóa, `linearVelocity`, giới hạn tốc độ, bắn "cog" bánh răng sửa robot từ xa), Tilemap thế giới, camera follow (con của player hoặc script bám mượt), animation Walk/Idle theo hướng.
- **P2 — Robot, gai & UI**: robot hỏng (trigger + `OnTriggerEnter2D` → sửa, hiện particle, đếm hết → thắng), damage zone (gai) trừ máu + i-frames 1s, Enemy bug đi tuần chạm = mất máu (Rigidbody2D + đảo chiều khi chạm tường), thanh máu Slider, đếm robot TMP, nhạc + sfx, popup "thắng".
- **P3 — Build & chia sẻ**: File > Build Settings → thêm scene → WebGL → Build → mở `index.html` hoặc upload **Unity Play** (unity.com/play) để gửi link bạn bè.
- Source chính thức kèm assets: project *Ruby's Adventure 2D Beginner* trên Unity Learn + video full (mkBPGC0BVXg). Làm trọn = bạn đã đi hết L2.

---

# L3 — 3D & Capstone "Nhà Ma"
## CH17. 3D căn bản — từ 2D sang 3D
- Thêm chiều Z: Transform 3D (position/rotation/scale xyz), camera **Perspective** (FOV), ánh sáng (Directional Light = mặt trời + ambient).
- GameObject 3D: Cube/Sphere/Capsule = Mesh Filter + **Mesh Renderer** + material (URP: tạo Material trong Project, kéo màu/emission vào object).
- Di chuyển 3D: `Vector3`, `transform.forward/right` (hướng local); camera nhìn theo player bằng cách làm con hoặc script `LookAt`.
- Lưới & collider 3D: Box/Capsule Collider; trọng lực = Rigidbody (3D). Làm quen: quả bóng rơi + nảy (bouncy material).

## CH18. Capstone 3D #1 — Nhà Ma: người chơi & camera
- Theo course chính thức *3D Stealth Game: Haunted House* (Unity 6.3, 9 tutorial + publish). Scene: nhà kiểu tạo từ Cube tường + sàn + material tối; ánh sáng điểm (Point Light) tạo không khí.
- **Player**: model nhân vật (assets kèm sẵn course, hoặc Capsule tạm + thay sau) + **Animator** (Idle/Walk, nhân vật Humanoid dùng animation có sẵn course), di chuyển theo hướng camera, **Capsule Collider + Rigidbody** (khóa xoay), camera bám sau lưng (con của player + offset).
- Chữ 3D "bạn thua/thắng": giữ tối giản — UI TMP overlay.

## CH19. Capstone 3D #2 — Kẻ địch, kết thúc & audio
- **Enemy tĩnh** (gargoyle): xoay theo quét vùng nhìn — phát hiện player (đơn giản: góc + khoảng cách `Vector3.Distance` / `Dot`) → đuổi bằng **NavMeshAgent** (Window > AI > Navigation → bake lưới; agent đi theo `SetDestination(player.position)`); chạm → thua.
- **Enemy động** (ghost bay): di chuyển theo waypoint vòng lặp, không cần NavMesh.
- **Kết thúc**: trigger vùng thoát (OnTriggerEnter 3D) → hiện "Thắng!". **Audio**: nhạc căng + footsteps (AudioSource 3D spatial blend 1).
- Vị trí thất bại/thắng: respawn đầu scene (`SceneManager.LoadScene(SceneManager.GetActiveScene().name)`).

## CH20. Build & xuất bản (cả 2D lẫn 3D)
- **Build Settings**: File > Build Settings → kéo scene theo thứ tự → chọn Platform (PC/WebGL/Android) → **Build** (WebGL ra thư mục chạy web; Unity 6 còn **Build And Run** local server).
- **Unity Play** (unity.com/play): đăng Unity ID → upload bản WebGL → có link chơi ngay trên trình duyệt để chia sẻ — như itch.io mini của riêng bạn.
- Mobile (Android/iOS): thêm module trong Hub, Player Settings (package name, orientation), qua các bước build xem khóa Godot 2D Physics tương tự về khái niệm (keystore Android...).

---

# L4 — Đi tiếp
## CH21. Bản đồ phía trước
- **Pathway chính thức**: *Unity Essentials* (đã âm thầm đi qua L0) → **Junior Programmer** (12 tuần, zero→job-ready: OOP, data persistence, portfolio) → chuyên môn 2D/3D tùy đam mê.
- **Tra cứu trong repo**: `unity-manual-vi/` — **3.534 trang Unity 6.5 Manual offline** (mỗi chương khóa này đều có trang tương ứng trong đó) + `unity_glossary.html` (thuật ngữ RPG).
- Kỹ năng next: **Cinemachine** (camera điện ảnh), **Timeline**, **DOTween**, Input System mới, **Addressables**; Asset Store có asset miễn phí hằng tháng.
- So engine trong repo: đã có **Godot căn bản → 2D Physics → Hack&Slash**; hiểu cả 2 engine = tuyển chọn đúng công cụ cho từng game (Godot nhẹ 2D/mobile; Unity mạnh hệ sinh thái/việc làm 3D).
- **Quy tắc vàng** như Godot: mỗi tuần 1 game nhỏ HOÀN CHỈNH (menu + thắng thua + âm thanh) > game lớn bỏ dở.

---

## 📋 Cheatsheet
```
Editor:    Hierarchy · Scene/Game · Inspector · Project · Console | Q pan · W/E/R · F focus | Ctrl+P Play
GameObject: Transform (luôn có) + SpriteRenderer · Rigidbody2D · Box/CircleCollider2D · Animator · AudioSource
Prefab:    kéo object vào Project → sửa ở Prefab Mode → mọi bản cập nhật
Script:    class X : MonoBehaviour · Start() 1 lần · Update() mỗi frame · FixedUpdate() vật lý
Timing:    Time.deltaTime (Update) · Time.fixedDeltaTime · Invoke("TenHam", 1f) · StartCoroutine
Input cũ:  Input.GetAxisRaw("Horizontal") · GetKeyDown(KeyCode.Space) · CompareTag("Player")
Physics2D: rb.linearVelocity (Unity 6; cũ: velocity) · AddForce · Is Trigger → OnTriggerEnter2D(other)
UI:        Canvas + TextMeshPro · Button.OnClick · Slider máu · anchor preset
Anim:      Animator.SetTrigger("hit") · animator.SetBool("isWalking", x!=0) · tắt Exit Time
Build:     File > Build Settings → scene + platform → Build | WebGL → Unity Play
Debug:     Debug.Log($"x={x}") · console bấm nhảy dòng · Pause + Step soi frame
```

---
*Unity Căn Bản — biên soạn từ Unity Learn chính thức (Unity Essentials, Create with Code, Ruby's Adventure 2D Beginner, 3D Stealth Game: Haunted House) + Unity 6.5 Manual (mirror trong repo). Unity® là nhãn hiệu của Unity Technologies; khóa học này không liên kết chính thức.*
