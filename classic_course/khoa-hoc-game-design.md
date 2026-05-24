# Khóa Học Game Design Toàn Diện - Từ Cơ Bản Đến Nâng Cao

> Nguồn: [khoa-hoc-game-design.html](khoa-hoc-game-design.html)

---

🎮
# GAME DESIGN MASTERY
Hành trình từ người chơi đến nhà thiết kế game chuyên nghiệp - 21 chương đầy đủ từ lý thuyết cơ bản đến kỹ thuật pro trong ngành công nghiệp $300 tỷ USD
21Chương học
200+Khái niệm
50+Case study
$300BThị trường 2026
CHƯƠNG 1
## Giới Thiệu Về Game Design
### 1.1. Game Design là gì?
**Game Design** là nghệ thuật và khoa học của việc tạo ra **các quy tắc, hệ thống, và trải nghiệm** cho một trò chơi. Đây KHÔNG phải là lập trình, KHÔNG phải là vẽ - mà là **thiết kế trải nghiệm chơi**.
"A game is a series of interesting choices."**
*— Sid Meier (cha đẻ Civilization)*
### 1.2. Game Designer làm gì?
Game Designer là "kiến trúc sư"** của trò chơi. Họ quyết định:
- **Game sẽ chơi như thế nào?** (Mechanics - Cơ chế)
- **Người chơi sẽ làm gì?** (Actions - Hành động)
- **Mục tiêu là gì?** (Objectives - Mục tiêu)
- **Luật chơi ra sao?** (Rules - Luật)
- **Người chơi sẽ cảm thấy gì?** (Aesthetics - Cảm xúc)
- **Tiến trình phát triển thế nào?** (Progression - Tiến trình)
### 1.3. Game Design vs Game Development
| Game Design | Game Development |
| --- | --- |
| Thiết kế WHAT (cái gì) | Thực hiện HOW (làm thế nào) |
| Quyết định cơ chế, luật, balance | Lập trình, vẽ, làm âm thanh |
| GDD, prototype giấy, blockout | Code, art, audio, build |
| Người: Designer, Director | Người: Programmer, Artist, Sound Designer |
### 1.4. Các vị trí trong Game Design
🎯
#### Game Designer (Tổng quát)
Định hướng tổng thể: cơ chế, gameplay, hệ thống. Lương: 15-50tr/tháng tại VN.
🗺️
#### Level Designer
Thiết kế màn chơi, pacing, encounters. Cần spatial thinking tốt.
⚖️
#### System Designer
Thiết kế hệ thống combat, kinh tế, progression. Cần toán giỏi, Excel pro.
📖
#### Narrative Designer
Cốt truyện, dialogue, world-building. Cần kỹ năng viết.
🎮
#### Combat Designer
Hệ thống chiến đấu: weapons, skills, balance. Quan trọng trong RPG/FPS.
💰
#### Monetization Designer
Hệ thống IAP, gacha, battle pass. Hot trong mobile game.
🧪
#### Technical Designer
Cầu nối giữa Design và Programming. Biết code cơ bản.
📊
#### Game Director
Lead toàn bộ team design. Vision của game. 5-10+ năm kinh nghiệm.
🎨
#### UX Designer
Trải nghiệm người dùng, UI flow, accessibility.
### 1.5. Kỹ năng cần thiết của Game Designer
#### 🧠 Hard Skills
- Excel/Google Sheets nâng cao (balance)
- Tư duy hệ thống (Systems thinking)
- Toán & xác suất (cho balance)
- Tâm lý học người chơi
- Game engines (Unity, Unreal, Godot)
- Scripting cơ bản (C#, Lua, Python)
- Tools: Miro, Figma, Notion, Confluence
#### 💪 Soft Skills
- Communication - viết GDD rõ ràng
- Empathy - hiểu người chơi
- Critical thinking - phân tích game
- Creativity - ý tưởng mới mẻ
- Iteration mindset - chấp nhận sửa
- Teamwork - làm việc với art, code, sound
- Presentation - pitch ý tưởng
### 1.6. Thị trường Game tại Việt Nam
- **Doanh thu:** ~600 triệu USD/năm (2025), tăng 12-15%/năm
- **Số người chơi:** 50+ triệu (top 10 thế giới về mobile gamers)
- **Mobile chiếm 70%** tổng doanh thu
- **Top studio:** VNG, Garena, Sky Mavis (Axie Infinity), Amanotes, Wolffun (Tank Royale)
- **Thu nhập Game Designer:**
Junior: 12-20 triệu/tháng
- Senior: 25-50 triệu/tháng
- Lead: 50-100+ triệu/tháng
- Director: 80-250+ triệu/tháng
- Remote (US/EU): 3,000-15,000 USD/tháng
> **🎓 Lộ trình học cho người mới**
>
> 
- **Tháng 1-2:** Đọc lý thuyết (sách "The Art of Game Design" - Jesse Schell)
- **Tháng 3-4:** Phân tích 10 game yêu thích - làm "Game Analysis Document"
- **Tháng 5-6:** Làm 3 prototype giấy (board game / card game)
- **Tháng 7-9:** Học Unity / Godot, làm clone Flappy Bird, Pong, Tetris
- **Tháng 10-12:** Làm game gốc đầu tiên + Game Jam (Ludum Dare, GMTK)
- **Năm 2:** Portfolio 3-5 game + apply intern/junior
CHƯƠNG 2
## Lịch Sử Phát Triển Game
Hiểu lịch sử giúp bạn nắm vững **WHY** - tại sao game hiện đại được thiết kế như vậy. Mỗi thế hệ đều giải quyết vấn đề mà thế hệ trước để lại.
### 2.1. Các kỷ nguyên Game
#### 🕹️ Kỷ nguyên Arcade (1971-1983)
**Game tiêu biểu:** Pong, Space Invaders, Pac-Man, Donkey Kong
**Bài học design:** Học cách thiết kế gameplay đơn giản nhưng gây nghiện. Mỗi xu phải đáng giá - tạo "1 more try" feeling.
#### 🎮 Kỷ nguyên Home Console (1983-1995)
**Game tiêu biểu:** Super Mario Bros, Zelda, Final Fantasy
**Bài học design:** Game dài hơn, có save/load. Bắt đầu narrative. Mario - chuẩn mực platformer đến nay.
#### 🌐 Kỷ nguyên 3D & Internet (1995-2005)
**Game tiêu biểu:** Doom, Quake, GTA III, Half-Life, World of Warcraft
**Bài học design:** Không gian 3D, FPS, MMO. Half-Life - chuẩn mực storytelling không cutscene.
#### 📱 Kỷ nguyên Mobile & F2P (2007-2015)
**Game tiêu biểu:** Angry Birds, Clash of Clans, Candy Crush, Pokemon Go
**Bài học design:** Free-to-play, microtransaction, daily login. Thiết kế cho phiên chơi 5-15 phút.
#### 🎬 Kỷ nguyên Cinematic & Open World (2015-2020)
**Game tiêu biểu:** Witcher 3, Red Dead Redemption 2, Breath of the Wild
**Bài học design:** Open world emergent, narrative điện ảnh, AAA budget >100tr USD.
#### 🚀 Kỷ nguyên Live Service & UGC (2020-nay)
**Game tiêu biểu:** Fortnite, Roblox, Genshin Impact, Helldivers 2, Palworld
**Bài học design:** Game-as-a-service, content liên tục, cộng đồng tạo nội dung (UGC).
### 2.2. Các sự kiện then chốt thay đổi ngành
- **1983 - "Video Game Crash":** Thị trường Mỹ sụp đổ vì quá nhiều game kém chất lượng. Bài học: *Quality control quan trọng.*
- **1985 - Super Mario Bros:** Nintendo cứu ngành. Chuẩn mực level 1-1 dạy player without tutorial.
- **1996 - Tomb Raider:** 3D thật sự bùng nổ. Female protagonist trở thành mainstream.
- **1998 - StarCraft:** eSports khai sinh. Hàn Quốc trở thành cường quốc game.
- **2004 - World of Warcraft:** MMO định nghĩa lại "game suốt đời".
- **2007 - iPhone ra đời:** Mobile gaming sinh ra.
- **2009 - Angry Birds + Farmville:** Casual gaming + microtransaction.
- **2012 - League of Legends bùng nổ:** F2P + eSports = công thức vàng.
- **2017 - PUBG + Battle Royale:** Một thể loại mới chiếm lĩnh.
- **2020 - Fall Guys + Among Us:** Indie có thể đánh bại AAA với ý tưởng đột phá.
- **2023 - Generative AI:** AI tạo art, code, narrative - thay đổi quy trình.
> **📚 Game Designers huyền thoại nên biết**
>
> 
- **Shigeru Miyamoto:** Mario, Zelda, Donkey Kong - Nintendo
- **Hideo Kojima:** Metal Gear, Death Stranding - bậc thầy narrative
- **Sid Meier:** Civilization - "interesting choices"
- **Will Wright:** The Sims, SimCity - emergent gameplay
- **Hidetaka Miyazaki:** Dark Souls, Elden Ring - difficult design
- **Jonathan Blow:** Braid, The Witness - puzzle design
- **Toby Fox:** Undertale - solo developer thay đổi narrative game
- **Nguyễn Hà Đông:** Flappy Bird - solo VN, viral toàn cầu
CHƯƠNG 3
## Các Thể Loại Game
Hiểu rõ thể loại giúp bạn xác định **khuôn mẫu thiết kế**, kỳ vọng người chơi và tiêu chuẩn ngành.
### 3.1. Phân loại theo Gameplay Mechanics
#### 🏃 Action
Phản xạ, combat real-time.
**Sub-genres:** Platformer (Mario), Hack & Slash (Devil May Cry), Beat 'em up (Streets of Rage)
**Design focus:** Game feel, responsiveness, satisfying feedback.
#### 🎯 Shooter
Bắn súng - FPS hoặc TPS.
**Sub-genres:** FPS (Call of Duty), TPS (Gears of War), Battle Royale (PUBG), Hero Shooter (Overwatch), Tactical (Valorant)
**Design focus:** Gunfeel, time-to-kill (TTK), map design.
#### 🗡️ RPG (Role-Playing Game)
Nhập vai, phát triển nhân vật.
**Sub-genres:** JRPG (Final Fantasy), WRPG (Skyrim), Action RPG (Witcher), MMORPG (WoW), CRPG (Baldur's Gate)
**Design focus:** Stats, progression, narrative, character builds.
#### 🧩 Puzzle
Giải đố, logic.
**Sub-genres:** Match-3 (Candy Crush), Physics (Portal), Logic (Sudoku), Hidden Object
**Design focus:** Difficulty curve, "aha moments", elegant solutions.
#### 🏗️ Strategy
Tư duy chiến lược, quản lý.
**Sub-genres:** RTS (StarCraft), Turn-based (Civilization), 4X (Stellaris), Tower Defense, Auto-battler
**Design focus:** Decision depth, faction balance, snowball control.
#### ⚽ Sports & Racing
Mô phỏng thể thao, đua xe.
**Sub-genres:** FIFA, NBA 2K, Forza, Gran Turismo, Rocket League (hybrid)
**Design focus:** Physics realism, controls, online multiplayer.
#### 🏘️ Simulation
Mô phỏng đời sống/hệ thống.
**Sub-genres:** Life sim (The Sims), City builder (Cities: Skylines), Farming (Stardew Valley), Tycoon (RollerCoaster)
**Design focus:** Emergent systems, sandbox freedom.
#### 🎴 Card & Board
Bài, board game digital.
**Sub-genres:** Collectible Card Game/CCG (Hearthstone), Deck-builder (Slay the Spire), Auto-chess
**Design focus:** Card balance, deck variety, meta evolution.
#### 🌐 MMO
Multiplayer khổng lồ.
**Sub-genres:** MMORPG (FFXIV), MMO Shooter (Destiny 2), Social MMO (Roblox)
**Design focus:** Endgame, social loops, economy.
#### 🎭 Adventure
Khám phá, story-driven.
**Sub-genres:** Point & click, Visual Novel, Walking Sim (Firewatch), Interactive Drama (Detroit)
**Design focus:** Story, pacing, exploration rewards.
#### 👻 Horror
Tâm lý kinh dị, sinh tồn.
**Sub-genres:** Survival Horror (Resident Evil), Psychological (Silent Hill), Jumpscare (FNAF)
**Design focus:** Tension pacing, atmosphere, resource scarcity.
#### 🏆 Fighting
Đối kháng 1v1.
**Sub-genres:** 2D fighter (Street Fighter), 3D fighter (Tekken), Platform fighter (Smash Bros)
**Design focus:** Frame data, character balance, combos.
### 3.2. Hybrid Genres - Xu hướng 2026
Game hiện đại thường lai 2-3 thể loại để tạo trải nghiệm độc đáo:
- **Roguelike Deck-builder:** Slay the Spire = Roguelike + Card
- **Survivors-like:** Vampire Survivors = Action + Auto-shooter + Roguelite
- **Extraction Shooter:** Escape from Tarkov = FPS + Survival + Loot
- **Souls-like:** Elden Ring = Action RPG + Open World + Punishing difficulty
- **Cozy Sim:** Stardew Valley = Farming + RPG + Life sim
- **Boomer Shooter:** DUSK = Classic FPS + Modern QoL
### 3.3. Phân loại theo Player Count
| Player Count | Đặc điểm thiết kế | Ví dụ |
| --- | --- | --- |
| Singleplayer | Story trọng tâm, AI làm đối thủ, pacing tự do | Witcher, Hollow Knight |
| Co-op (2-4) | Đồng đội, không có competition, social fun | It Takes Two, Helldivers 2 |
| PvP (1v1, 2v2) | Balance cực kỳ quan trọng, ranked system | Street Fighter, StarCraft |
| Team PvP (5v5) | Role-based, team coordination, meta | League of Legends, Valorant |
| Battle Royale (60-100) | Map shrinking, last man standing, RNG loot | PUBG, Fortnite |
| MMO (1000+) | Shared persistent world, social, economy | WoW, Final Fantasy XIV |
### 3.4. Phân loại theo Phiên chơi
- **Hyper-casual (1-3 phút):** Subway Surfers, Helix Jump - phù hợp khi rảnh 30 giây
- **Casual (5-15 phút):** Candy Crush, Clash Royale - giờ giải lao
- **Mid-core (30-60 phút):** League of Legends, Genshin daily - hardcore mobile
- **Hardcore (2-4+ giờ):** RPG, Strategy - cần ngồi PC/Console
CHƯƠNG 4
## Framework MDA - Nền Tảng Lý Thuyết
**MDA** là framework lý thuyết quan trọng nhất trong Game Design - do *Robin Hunicke, Marc LeBlanc và Robert Zubek* phát triển năm 2004. Mọi game designer chuyên nghiệp đều phải hiểu MDA.
### 4.1. Ba thành phần MDA
#### 🔧 M - Mechanics (Cơ chế)
**Designer tạo ra**
Các quy tắc, hệ thống, hành động cơ bản trong game.
**Ví dụ:** Mario nhảy cao 4 ô, tốc độ 5 unit/s, mất 1 mạng khi chạm enemy.
#### ⚡ D - Dynamics (Động lực)
**Phát sinh khi chơi**
Hành vi, chiến thuật, tương tác xuất hiện khi cơ chế chạy.
**Ví dụ:** Player học cách "long jump" combo, tránh enemy bằng cách nhảy chéo.
#### 🎨 A - Aesthetics (Cảm xúc)
**Player cảm nhận**
Trải nghiệm cảm xúc cuối cùng mà player nhận được.
**Ví dụ:** Niềm vui, sự hồi hộp, cảm giác thành tựu khi vượt qua thử thách.
### 4.2. Hai góc nhìn quan trọng
DESIGNER: Mechanics → Dynamics → Aesthetics**
PLAYER: Aesthetics ← Dynamics ← Mechanics
Designer thiết kế từ trái sang phải. Player trải nghiệm từ phải sang trái. Bài học:** Bắt đầu thiết kế bằng *cảm xúc muốn tạo*, rồi mới chọn cơ chế phù hợp.
### 4.3. 8 loại Aesthetics (Cảm xúc)
MDA xác định 8 loại cảm xúc cốt lõi mà game có thể tạo ra. Hầu hết game tốt có 2-4 cảm xúc chủ đạo.
#### 1. 💫 Sensation - Cảm giác
Cảm giác thị giác/âm thanh/xúc giác. *Game tập trung graphics, sound đẹp.*
**Ví dụ:** Crysis (đồ họa), Beat Saber (cảm giác đánh)
#### 2. 🎬 Fantasy - Tưởng tượng
Trở thành điều mà đời thực không thể. *Roleplay, escapism.*
**Ví dụ:** Skyrim, GTA, Final Fantasy
#### 3. 📖 Narrative - Kể chuyện
Drama, câu chuyện diễn ra. *Trải nghiệm cảm xúc cốt truyện.*
**Ví dụ:** The Last of Us, Disco Elysium
#### 4. 🧠 Challenge - Thử thách
Vượt qua khó khăn. *Test kỹ năng, kiên trì.*
**Ví dụ:** Dark Souls, Cuphead, Super Meat Boy
#### 5. 🤝 Fellowship - Đồng đội
Kết nối xã hội, cảm giác cộng đồng. *Multiplayer co-op.*
**Ví dụ:** WoW, It Takes Two, Among Us
#### 6. 🔍 Discovery - Khám phá
Tìm ra cái mới. *Open world, exploration.*
**Ví dụ:** Breath of the Wild, No Man's Sky, Subnautica
#### 7. 🎭 Expression - Thể hiện bản thân
Sáng tạo, customization. *"Đây là tôi".*
**Ví dụ:** Minecraft, The Sims, Roblox
#### 8. 🎪 Submission - Giải trí thuần
Thư giãn, "tắt não". *Casual entertainment.*
**Ví dụ:** Candy Crush, Animal Crossing, idle games
> **💡 Áp dụng thực tế**
>
> 
Khi pitch ý tưởng game, hãy nói: *"Game này tạo aesthetics chính là Discovery + Challenge"* thay vì *"Game này có map to và combat khó"*. Cảm xúc bán game, không phải tính năng.
### 4.4. Ví dụ phân tích MDA - Tetris
| Tầng | Tetris |
| --- | --- |
| Mechanics | Khối tetromino rơi xuống, xoay được, hàng đầy tự xóa, tăng tốc theo level |
| Dynamics | Player học chừa chỗ cho thanh I, push limit khi tốc độ tăng, panic khi gần đỉnh |
| Aesthetics | Challenge (kỹ năng) + Sensation (line clear satisfying) + Submission (chơi liên tục) |
CHƯƠNG 5
## Core Loop & Game Mechanics
**Core Loop** (Vòng lặp cốt lõi) là *trái tim của mọi game*. Nếu Core Loop không vui, game không vui. Đây là khái niệm **QUAN TRỌNG NHẤT** trong game design.
### 5.1. Core Loop là gì?
Là chuỗi hành động **lặp đi lặp lại** mà player thực hiện **liên tục** trong suốt phiên chơi. Mỗi vòng lặp phải:
- **Hành động (Action):** Player làm gì đó
- **Phần thưởng (Reward):** Nhận lại điều gì đó
- **Tiến bộ (Progress):** Player tiến bộ hoặc học được điều mới
### 5.2. Ví dụ Core Loop nổi tiếng
#### 🍬 Candy Crush
Swap kẹo**↓
Match 3+
↓
Combo / Special
↓
Đạt mục tiêu
↓
Sao + Reward
#### 🔫 Call of Duty
Spawn
↓
Tìm enemy
↓
Engage / Kill
↓
XP + Score
↓
Level up weapon
#### 🗡️ Diablo (ARPG)
Kill monsters
↓
Loot items
↓
Equip better gear
↓
Kill stronger monsters
↓
Repeat at higher difficulty
#### 🚜 Stardew Valley
Plant crops
↓
Wait / Water
↓
Harvest
↓
Sell + Buy seeds
↓
Upgrade tools
### 5.3. Core Loop nhiều tầng
Game phức tạp có nhiều loop lồng nhau:
#### Ví dụ: League of Legends
Micro Loop (3-5 giây):** Last hit minion → nhận gold
**Mid Loop (1-2 phút):** Push lane → kill enemy → win trade
**Macro Loop (5-10 phút):** Take objective (Dragon, Baron) → snowball
**Match Loop (30-40 phút):** Win match → climb rank
**Meta Loop (mùa):** Rank up → unlock skin/reward → next season
### 5.4. Mechanics - Cơ chế cụ thể
Mechanics là **các hành động cụ thể** player có thể thực hiện. Phân loại:
#### 🎮 Core Mechanics
Cơ chế chính, dùng > 80% thời gian.
**Ví dụ:** Mario - chạy & nhảy. FPS - di chuyển & bắn. RTS - build & command.
#### 🎯 Secondary Mechanics
Cơ chế phụ, bổ sung depth.
**Ví dụ:** Mario - đập gạch, gom đồng xu. FPS - reload, grenade, melee.
#### ⚡ Special Mechanics
Cơ chế đặc biệt, ít dùng nhưng quan trọng.
**Ví dụ:** Power-ups, ultimate abilities, vehicle sections.
#### 🎪 Meta Mechanics
Ngoài gameplay - progression, customization.
**Ví dụ:** Skill tree, inventory, crafting.
### 5.5. Đánh giá Core Loop tốt
> **✅ Checklist Core Loop tốt**
>
> 
- **Đơn giản:** Giải thích trong 1 câu
- **Có depth:** Player giỏi hơn theo thời gian
- **Phần thưởng tức thời + dài hạn:** Vừa cảm giác mỗi vòng, vừa progress lớn
- **Có variety:** Không nhàm chán sau 100 lần
- **Tự lựa chọn:** Player có thể tiếp cận theo nhiều cách
- **Tốc độ phù hợp:** Loop không quá ngắn (nhàm) hay quá dài (mệt)
### 5.6. The "Core Pillars" - Trụ cột thiết kế
Mỗi game nên có **3-5 Core Pillars** - các giá trị thiết kế then chốt mà mọi quyết định phải phù hợp.
#### Ví dụ Core Pillars của Dark Souls:
- **Methodical Combat:** Mỗi đòn đánh có trọng lượng, cần tính toán
- **Punishing but Fair:** Player chết nhiều, nhưng luôn vì lỗi của họ
- **Interconnected World:** Map liên kết, không cần fast travel
- **Storytelling via Environment:** Lore qua đồ vật, không cutscene
*Mọi tính năng mới đều phải pass qua 4 pillar này. Easy mode? KHÔNG vì vi phạm "Punishing".*
CHƯƠNG 6
## Game Feel & Juiciness
**Game Feel** (hay "Juice") là sự khác biệt giữa game "ok" và game "wow!". Đó là *cảm giác vật lý* khi tương tác với game - thứ khó định nghĩa nhưng dễ nhận biết.
"The juiciness is the icing on the cake. But you cannot have cake without icing."**
*— Jan Willem Nijman (Vlambeer - Nuclear Throne)*
### 6.1. Game Feel gồm những gì?
#### 👆 Input Response
Player nhấn nút → game phản hồi NGAY LẬP TỨC**. Độ trễ > 50ms = cảm giác "lag".
- Input buffering (lưu input cho frame tiếp)
- Coyote time (cho phép nhảy sau khi rời edge 0.1s)
- Jump cancelling
#### 📷 Camera Movement
Camera "kể chuyện" về hành động.
- Screen shake khi explosion
- Zoom in khi finishing move
- Camera follow with smoothing
- Tilt camera khi nhân vật chạy nhanh
#### 💥 Visual Effects
Phản hồi thị giác.
- Particle effects (bụi, lửa, ma thuật)
- Hit flash (nháy trắng khi trúng đòn)
- Screen flash khi quan trọng
- Trail effect cho weapon swings
- Damage numbers bay lên
#### 🔊 Sound Design
Âm thanh = 50% game feel.
- Sound khác nhau cho từng surface
- Layered sound (footstep + cloth + weapon)
- Pitch variation cho mỗi action
- Spatial 3D audio
- Reactive music
#### ⏸️ Hit Pause / Hit Stop
Tạm dừng game 50-200ms khi va chạm mạnh → cảm giác "weight" và impact.
*Game không có: cảm giác như đập vào không khí. Có: cảm giác như đập vào tường.*
#### 📳 Controller Haptics
Rung phản hồi tinh tế.
- Rung mạnh khi explosion
- Rung nhẹ khi walk vs heavy khi sprint
- Adaptive triggers (PS5)
### 6.2. Case study: Vampire Survivors
Game indie bán 5+ triệu copy với art tệ. Bí mật? **Game Feel cực tốt:**
- Hàng trăm số damage bay lên cùng lúc - dopamine rush
- Screen shake nhẹ liên tục - cảm giác "powerful"
- Sound của weapon ngắn, snappy, layered nhiều
- Mỗi level up có animation pause + flash + sound
- Pickup XP gem có tiếng "ting" satisfying
### 6.3. The "Juice it or lose it" Principle
Pong cơ bản: 2 thanh + 1 bóng. Khô khan? Thêm juice sẽ thay đổi:
#### ❌ Pong "khô"
- Bóng đập vào tường - không gì xảy ra
- Player ghi điểm - chỉ số thay đổi
- Im lặng hoàn toàn
#### ✅ Pong "juicy"
- Bóng đập tường: screen shake, particle bay ra, tường nhấp nháy
- Player ghi điểm: zoom in, slow motion, fireworks, fanfare music
- Mỗi hit có pitch tăng dần
- Bóng kéo trail màu cầu vồng khi tốc độ cao
- Background phản ứng theo nhịp
### 6.4. 14 Kỹ thuật Game Feel cụ thể
- **Squash & Stretch:** Object biến dạng khi va chạm
- **Anticipation:** Animation chuẩn bị trước action
- **Follow-through:** Animation kéo dài sau action
- **Easing:** Movement không tuyến tính (ease-in/out)
- **Hit Stop:** Pause khi va chạm
- **Screen Shake:** Camera rung
- **Chromatic Aberration:** Tách màu khi mạnh
- **Particle Burst:** Hạt bụi/lửa
- **Damage Numbers:** Số bay lên
- **Sound Pitch Variation:** Tránh lặp
- **Speed Lines:** Đường tốc độ
- **Zoom Punch:** Camera giật về phía action
- **Slow Motion:** Khoảnh khắc đặc biệt
- **Knockback:** Đối tượng bị đẩy lùi
> **🎓 Bài tập thực hành**
>
> 
Mở Unity/Godot, làm 1 game đơn giản (clone Asteroids). Chia làm 2 version: **không juice** và **juiced**. Cho 10 người chơi thử - 100% sẽ chọn version juiced. Đây là bài học khắc cốt ghi tâm.
CHƯƠNG 7
## Level Design - Thiết Kế Màn Chơi
Level Design là **nghệ thuật xây dựng không gian chơi** để dẫn dắt cảm xúc và quyết định của player. Đây là vị trí có nhu cầu cao thứ 2 trong ngành (sau System Designer).
### 7.1. Mục tiêu của Level Design
- **Dẫn dắt** player qua trải nghiệm
- **Dạy** mechanics mới
- **Thử thách** kỹ năng đã học
- **Pacing** cảm xúc (căng - thư giãn - căng)
- **Tạo memory moments**
- **Reward** exploration
### 7.2. Quy tắc vàng: World 1-1 của Super Mario
Đây là 30 giây thiết kế hoàn hảo nhất lịch sử game. Phân tích kỹ:
#### 🍄 Phân tích từng giây của Mario 1-1
- **0-3s:** Mario đứng giữa màn hình, không gian trống. Player tự thử nút - học di chuyển.
- **3-5s:** Goomba (enemy đầu tiên) xuất hiện từ phải. Player tự nhiên muốn tránh.
- **5-7s:** Block ? phía trên buộc player nhảy → tìm thấy mushroom.
- **7-10s:** Mushroom bay về phía Mario - 80% sẽ chạm phải → học "powerup is good".
- **10-15s:** Pit (hố) đầu tiên - dạy timing nhảy.
- **15-20s:** Goombas thành đàn - apply kỹ năng đã học.
- **20-25s:** Pipe + Goomba trên đầu pipe - thêm depth.
**Bài học:** Mario 1-1 dạy 100% mechanics của game KHÔNG cần text. Đây là "show don't tell" hoàn hảo.
### 7.3. Các nguyên tắc Level Design
#### 🎯 Affordance
Object trông như chức năng của nó.
**Ví dụ:** Cửa có nắm = mở được. Mép vàng = leo được. Crate trông gỗ = đập được.
#### 🧭 Wayfinding
Dẫn đường mà không cần GPS.
**Kỹ thuật:** Ánh sáng dẫn đường, màu sắc tương phản, landmark cao, camera hint.
#### 🍞 Breadcrumbing
Thưởng nhỏ liên tục để player muốn đi tiếp.
**Ví dụ:** Đồng xu rải đường, ammo trước boss, dialogue trigger khi đi qua.
#### 📏 The 30-30-30 Rule
30% mới (mechanic mới) + 30% thử thách (mechanic cũ ở độ khó cao) + 30% nghỉ (let player breathe). 10% surprise.
#### 🌊 Pacing & Rhythm
Đan xen căng thẳng và thư giãn.
Combat → Puzzle → Story → Combat → Boss → Cutscene → Quiet exploration → Combat.
#### 🔁 Loop & Vista
Tạo những "khoảnh khắc dừng" để player ngắm cảnh, hít thở, ghi nhớ.
**Ví dụ:** Mỗi đỉnh núi trong Breath of the Wild có vista đẹp.
### 7.4. Các kỹ thuật Level Design nâng cao
#### Three-Lane Combat Design (Halo)
Combat space có 3 đường tiếp cận - player luôn có 3 lựa chọn chiến thuật:
- Đường thẳng (rush)
- Đường flank trái (sneaky)
- Đường cao (sniper position)
#### Conker's Loop (Backtracking thông minh)
Map thiết kế hình tròn → player kết thúc gần điểm xuất phát mà không feel lặp lại. Tốt cho Metroidvania.
#### Funnel Design
Hành lang rộng → hẹp → mở rộng. Tạo cảm giác lo lắng (hẹp) → relief (rộng).
#### Foreshadowing
Cho player thấy area sau qua window/skybox trước khi đến. Tạo anticipation.
#### Risk vs Reward
Path ngắn an toàn ít loot. Path xa nguy hiểm nhiều loot. Player tự chọn.
### 7.5. Quy trình Level Design
#### Concept & Story Beat
Định nghĩa: Level này dạy/test cái gì? Cảm xúc chủ đạo?
#### Bubble Diagram
Vẽ các "khu vực" như bong bóng, nối với nhau bằng đường. Chưa lo hình dạng cụ thể.
#### 2D Top-down Sketch
Vẽ map 2D với mũi tên đi, ký hiệu enemy/pickup/checkpoint.
#### Greybox / Blockout
Dựng level trong engine bằng khối hộp xám đơn giản. KHÔNG art. Focus gameplay.
#### Playtest Greybox
Cho 5-10 người chơi. Quan sát kỹ. Ghi notes mỗi giây.
#### Iterate
Sửa, thử, sửa. 80% thời gian là iterate.
#### Art Pass
Khi gameplay đã ổn, mới đến Environment Artist làm đẹp.
#### Polish & Optimization
VFX, audio, performance.
> **⚠️ Lỗi phổ biến của người mới**
>
> 
**Đừng làm art trước gameplay!** 90% người mới sai lầm này. Greybox phải vui đã, art chỉ là cherry on top. Một level greybox vui sẽ vui hơn 100 lần khi có art. Một level đẹp nhưng gameplay tệ vẫn tệ.
CHƯƠNG 8
## Character Design
Character Design (góc nhìn Game Designer) không chỉ là *vẽ đẹp* - mà là thiết kế **identity**, **moveset**, và **role** sao cho player gắn bó và nhớ mãi.
### 8.1. Visual Character Design Principles
#### 👁️ Readability
Player nhận ra character ngay từ silhouette. Test: che color, xem có còn nhận ra không?
#### 🎨 Color Hierarchy
Màu mạnh ở phần quan trọng nhất (mặt, vũ khí). Tránh đều màu khắp body.
#### 📐 Shape Language
Hình tròn = thân thiện. Vuông = vững chắc. Tam giác = nguy hiểm/quyết đoán.
#### 📊 Proportions
Cường điệu giúp dễ nhớ. Mario đầu to. Goku tóc dựng đứng. Master Chief mũ to.
#### 🏷️ Personality at a glance
Mỗi character cần "1 thuộc tính nổi bật" - posture, costume detail, signature item.
#### ♿ Accessibility
Color blind friendly. Phân biệt character bằng SHAPE + COLOR (không chỉ color).
### 8.2. Functional Character Design (Game Design view)
#### 📋 Character Design Sheet (Designer)
**Identity:**
- Name, age, background
- Personality (1-2 traits chính)
- Motivation (Want vs Need)
- Voice & speaking style
**Gameplay Role:**
- Class / Role (Tank, DPS, Support)
- Playstyle (Aggressive, Defensive, Tricky)
- Skill ceiling (Low/Med/High)
- Counter & Synergy với các character khác
**Moveset:**
- Basic attack
- 3-5 skills/abilities với cooldown
- Ultimate / Special
- Passive trait
**Stats Baseline:**
- HP, ATK, DEF, SPD
- Damage type (physical/magical/true)
- Range (melee/mid/long)
### 8.3. Archetypes - Mẫu nhân vật phổ biến
#### 🛡️ Tank
HP cao, DEF cao, DMG thấp. Chặn cho team.
*Ví dụ: Reinhardt (OW), Garen (LoL), Doomslayer*
#### ⚔️ DPS Melee
Cận chiến, damage cao, fragile.
*Ví dụ: Yasuo, Genji, Bayonetta*
#### 🏹 DPS Ranged
Xa, kite, positioning.
*Ví dụ: Jhin, Hanzo, Sniper Elite*
#### 💚 Healer / Support
Hồi máu, buff đồng đội.
*Ví dụ: Mercy, Soraka, Aerith*
#### 🌀 Mage / Caster
Phép, AoE, control.
*Ví dụ: Lux, Zhongli, Gandalf*
#### 🥷 Assassin
Burst damage, mobility, squishy.
*Ví dụ: Zed, Reaper, Ezio*
### 8.4. Character Progression Design
Character không thể đứng yên. Phải có progression:
- **Linear leveling:** Level 1 → 100, stats tăng theo công thức
- **Skill tree:** Player chọn build (Path of Exile - 2000+ nodes)
- **Class change:** FFV, FF Tactics - chuyển job
- **Gear-based:** Diablo - character mạnh nhờ items
- **Constellation/Ascension:** Genshin Impact - dupes mở khóa power
### 8.5. Companion Characters & NPCs
NPC tốt = world cảm thấy sống. Yếu tố quan trọng:
- **Memorable design:** Mỗi NPC quan trọng phải có 1 hook visual
- **Voice acting / typing style:** Mỗi character có "giọng" riêng
- **Routine/Schedule:** NPC làm việc khác nhau theo giờ (Stardew Valley)
- **Relationship system:** Player có thể build mối quan hệ (Persona, Stardew)
- **Reactive dialogue:** NPC phản ứng với hành động player (Witcher, Disco Elysium)
CHƯƠNG 9
## Narrative & Storytelling
Kể chuyện trong game KHÁC kể chuyện trong phim/sách. Game có **tương tác** - và đây vừa là sức mạnh, vừa là thử thách lớn nhất.
### 9.1. Ba cách kể chuyện trong game
#### 📖 Explicit Narrative
Kể trực tiếp qua cutscene, dialogue, text.
**Ưu:** Kiểm soát hoàn toàn, dễ truyền cảm xúc.
**Nhược:** Cắt rời gameplay, "ludonarrative dissonance".
*Ví dụ: Final Fantasy, Metal Gear*
#### 🌍 Environmental Storytelling
Kể qua bối cảnh, đồ vật, props.
**Ưu:** Không cắt rời, sâu hơn.
**Nhược:** Khó với người không quan sát.
*Ví dụ: Dark Souls, BioShock, Half-Life*
#### 🎮 Emergent Narrative
Câu chuyện sinh ra từ gameplay.
**Ưu:** Mỗi player có "câu chuyện riêng".
**Nhược:** Khó thiết kế, không đảm bảo.
*Ví dụ: Minecraft, Dwarf Fortress, RimWorld*
### 9.2. Ludonarrative Dissonance
> **⚠️ Khái niệm quan trọng**
>
> 
**Ludonarrative Dissonance** là khi *cốt truyện và gameplay mâu thuẫn nhau*.**
Ví dụ điển hình:** Uncharted - Nathan Drake là người tử tế trong cutscene, nhưng trong gameplay giết hàng trăm người không chớp mắt.**
Cách tránh:** Đồng bộ tone gameplay với narrative. Nếu nhân vật là pacifist, đừng cho gameplay là mass murderer.
### 9.3. Hero's Journey trong Game
Cấu trúc Hero's Journey của Joseph Campbell áp dụng cho 80% game:
- **Ordinary World:** Hyrule yên bình - làng Mario
- **Call to Adventure:** Princess bị bắt cóc
- **Refusal of Call:** Player có thể từ chối (rarely)
- **Meeting Mentor:** Old man dạy basics (Zelda)
- **Crossing Threshold:** Rời nhà, vào dungeon đầu
- **Tests, Allies, Enemies:** Toàn bộ middle game
- **Approach Inmost Cave:** Cuối game, chuẩn bị
- **Ordeal:** Boss khó nhất, mất 1 thứ quan trọng
- **Reward:** Lấy được sword/key cuối
- **Road Back:** Phải về home với power mới
- **Resurrection:** Final boss
- **Return with Elixir:** Win, save world
### 9.4. Branching Narrative - Câu chuyện phân nhánh
#### 🌳 True Branching
Player chọn → câu chuyện thật sự rẽ khác.
**Khó khăn:** Tốn budget cực lớn (mỗi nhánh phải làm content). Thường có 3-5 endings.
*Ví dụ: Detroit Become Human, Until Dawn, Disco Elysium*
#### 🍃 Illusion of Choice
Player tưởng có choice, nhưng kết quả tương tự.
**Ưu:** Budget hợp lý, player vẫn cảm thấy agency.
*Ví dụ: Mass Effect (95% cảm xúc, 5% kết quả thực)*
### 9.5. Worldbuilding
Thế giới game cần có **"iceberg principle"** - 10% hiện ra, 90% chìm dưới (lore sâu).
- **Lịch sử:** Đã có gì xảy ra trước khi game bắt đầu? Tại sao thế giới như hiện tại?
- **Địa lý:** Map có hợp lý? Climate, biome khác nhau?
- **Văn hóa:** Các phe phái, tôn giáo, ngôn ngữ
- **Kinh tế:** Tiền là gì? Trade routes? Tài nguyên?
- **Magic/Tech system:** Luật chơi (Sanderson's laws: hard magic vs soft magic)
- **Đời thường:** Người dân làm gì? Ăn gì? Vui chơi gì?
### 9.6. Show Don't Tell - The Game Way
Game tốt KỂ qua hành động, không qua exposition:
#### Ví dụ: God of War (2018)
**❌ Cách tệ:** "Kratos đã giết vợ con mình trong cơn điên, giờ anh ấy hối hận"
**✅ Cách hay:** Player thấy Kratos cố kiềm chế khi Atreus tức giận. Mỗi lần Atreus đề cập mẹ, Kratos im lặng nhìn xa xăm. Khi Atreus hỏi về quá khứ, Kratos đổi chủ đề.
### 9.7. Tools cho Narrative Designer
- **Twine:** Free, viết branching narrative nhanh
- **Ink (Inkle):** Scripting language cho dialogue (dùng trong 80 Days, Heaven's Vault)
- **Yarn Spinner:** Tích hợp Unity, dùng trong Night in the Woods
- **articy:draft:** Pro tool, có price tag
- **Celtx / Final Draft:** Viết script truyền thống
CHƯƠNG 10
## UI/UX Cho Game
UI tệ có thể phá hỏng game hay. UI tốt vô hình - player không nhận ra nhưng cảm thấy mọi thứ "natural". Đây là 1 art form riêng.
### 10.1. 4 Loại UI trong Game
#### 1. Non-Diegetic UI
UI tách rời world, chỉ player thấy.
**Ví dụ:** Health bar trên cùng màn hình, mini-map góc, score
**Ưu:** Rõ ràng, dễ đọc.
**Nhược:** Phá vỡ immersion.
#### 2. Diegetic UI
UI tồn tại trong world, nhân vật cũng thấy.
**Ví dụ:** Health trên áo Dead Space, đồng hồ trên cổ tay nhân vật.
**Ưu:** Immersive cực đỉnh.
**Nhược:** Khó thiết kế, đôi khi khó đọc.
#### 3. Spatial UI
UI trong 3D space nhưng không phải vật thực.
**Ví dụ:** Nameplate trên đầu enemy, marker quest 3D, damage numbers
#### 4. Meta UI
UI thể hiện trạng thái nhân vật.
**Ví dụ:** Màn hình đỏ khi máu thấp (Call of Duty), blur khi say.
### 10.2. Nguyên tắc UX trong Game
> **💡 10 Nguyên tắc vàng**
>
> 
- **Information Hierarchy:** Quan trọng nhất to nhất, ở vị trí mắt nhìn đầu tiên
- **Consistency:** Cùng action = cùng button. Cùng concept = cùng icon.
- **Feedback:** Mọi action phải có phản hồi (visual + audio + haptic)
- **Affordance:** Button trông như button (có border, shadow). Clickable thấy được.
- **Discoverability:** Tính năng quan trọng dễ tìm. Không giấu trong menu sâu.
- **Forgiveness:** Cho undo. Confirm trước action không thể hoàn tác.
- **Accessibility:** Color blind mode, subtitle, font size, control remap
- **Performance:** UI mượt 60fps. Lag UI = game cảm thấy lag.
- **Onboarding:** Dạy từ từ. Đừng dump 20 tooltips trong 1 phút.
- **Goal-driven:** UI luôn cho player biết "Tôi nên làm gì tiếp theo?"
### 10.3. HUD Design (Heads-Up Display)
HUD = info hiển thị suốt gameplay. Phải:
- **Tối thiểu cần thiết:** Hiển thị TỐI THIỂU cần thiết. Hide khi không cần.
- **Vùng an toàn:** Đặt UI ở corner (safe zone) - không che gameplay
- **Đối xứng/cân bằng:** 4 corners thường được dùng cho 4 loại info
- **Context-sensitive:** Reload prompt chỉ hiện khi cần
- **Color coding:** Đỏ = nguy hiểm, xanh = an toàn, vàng = warning
### 10.4. Menu Design
Menu game thường gồm:
- **Main Menu:** Play, Continue, Settings, Quit. Càng ít option càng tốt.
- **Pause Menu:** Resume ở vị trí dễ nhấn (default focus). Tránh khoá player.
- **Inventory:** Grid layout, drag-drop, sort/filter, tooltip kỹ.
- **Map:** Zoom, fast travel, marker, fog of war.
- **Skill tree:** Visual hierarchy, preview effect, requirements clear.
- **Shop:** Compare with current gear, total cost visible, confirm purchase.
### 10.5. Mobile UI - Đặc thù
- **Thumb zones:** Đặt button quan trọng trong vùng ngón cái chạm dễ (corner dưới)
- **Touch target ≥ 44px:** Đủ to để chạm chính xác
- **Avoid double-tap:** Tap hold đôi khi nhầm với scroll
- **Portrait vs Landscape:** Một số game support cả 2 - UI phải responsive
- **Limited screen real estate:** Mobile screen nhỏ - giảm UI tối đa
### 10.6. Onboarding - Dạy player chơi
#### Quy tắc Onboarding hiện đại
- **Just-in-time tutorial:** Dạy khi cần, không trước
- **Contextual hint:** Hint xuất hiện khi player gặp đúng tình huống
- **Show don't tell:** Cho thấy bằng animation, không text dài
- **Safe sandbox:** Đầu game cho player thử mà không penalty
- **Optional skip:** Veteran player có thể skip tutorial
- **Layered complexity:** Mỗi 30 phút mới giới thiệu 1 mechanic mới
CHƯƠNG 11
## Game Balancing - Cân Bằng Game
Balance là **khoa học và nghệ thuật** của game design. Đây là kỹ năng phân biệt Senior Designer với Junior. Cần toán giỏi, Excel pro, và rất nhiều iteration.
### 11.1. Các loại Balance
#### ⚖️ Symmetric Balance
2 phe có units/abilities y hệt nhau. Khác biệt chỉ ở kỹ năng player.
**Ví dụ:** Chess, Pong, hầu hết Fighting games
#### ⚖️ Asymmetric Balance
Mỗi phe có units/abilities khác nhau nhưng "equal in power".
**Ví dụ:** StarCraft (Terran vs Zerg vs Protoss), Dead by Daylight
*Khó hơn nhưng thú vị hơn nhiều.*
#### 📈 Progressive Balance
Difficulty tăng theo skill player (Dynamic Difficulty Adjustment).
**Ví dụ:** Resident Evil 4, Left 4 Dead (AI Director)
#### 🎲 Stochastic Balance
Cân bằng qua xác suất - RNG làm equalizer.
**Ví dụ:** Mario Kart (item phụ thuộc rank), Card games
### 11.2. Counter Triangle (Rock-Paper-Scissors)
Mọi unit/character nên có:
- **1 thứ nó counter (mạnh hơn)**
- **1 thứ counter nó (yếu hơn)**
- **Vài thứ neutral**
#### Ví dụ: StarCraft
- **Marine** (ranged) → Counter **Zerglings** (melee)
- **Zerglings** → Counter **Workers/Tanks**
- **Siege Tank** → Counter **Marines**
### 11.3. Toán học cho Game Designer
#### Damage Formula cơ bản
// Simple
damage = attack - defense
// Multiplicative (tốt hơn cho scaling)
damage = attack * (100 / (100 + defense))
// Pokemon-style (phức tạp hơn)
damage = ((2 * level / 5 + 2) * power * attack / defense) / 50 + 2
* STAB * type_effectiveness * critical * random(0.85-1.0)
#### HP & TTK (Time To Kill)
TTK = HP / DPS**
DPS = (damage_per_shot × shots_per_second) × accuracy
Designer phải quyết: TTK của game là bao nhiêu?
- CS:GO:** TTK rất ngắn (~0.5s) - hardcore, 1-shot headshot
- **Apex Legends:** TTK trung bình (~2-3s) - chiến đấu kéo dài
- **Overwatch:** TTK ngắn (~1.5s) - team play
- **WoW PvP:** TTK dài (~10-30s) - rotation, skill
#### Cost Curves & Progression
// Linear (không tốt cho progression)
cost(level) = base * level
// Exponential (phổ biến nhất)
cost(level) = base * (multiplier ^ level)
ví dụ: cost = 100 * (1.5 ^ level)
// Polynomial
cost(level) = base * (level ^ exponent)
ví dụ: cost = 50 * (level ^ 2.2)
// Common multipliers:
// 1.07-1.15: gentle (Cookie Clicker)
// 1.5-2.0: steep (Clash of Clans)
// 2.5+: aggressive (gacha)
### 11.4. Excel - Vũ khí chính của System Designer
System Designer pro dành 80% thời gian trong Excel/Google Sheets:
- **Stat tables:** HP/ATK/DEF của từng unit theo level
- **Cost tables:** Giá upgrade, time đợi
- **Drop rate tables:** Xác suất loot
- **Damage simulators:** Tính DPS theo build
- **Win rate predictions:** Monte Carlo simulation
- **Curve generators:** Tự sinh XP curve, level curve
### 11.5. Power Creep - Lạm phát sức mạnh
> **⚠️ Power Creep - Kẻ thù của Live Game**
>
> 
Live game thường ra unit/character mới. Để bán được, content mới phải **mạnh hơn cũ** (creep). Sau 1 năm, các unit cũ trở nên vô dụng.**
Cách giải quyết:**
- Buff lại unit cũ định kỳ (rebalance)
- Roster cycling (Heroes of the Storm)
- Power sideway thay vì up (cùng power, tính cách khác)
- Honest reset (Hearthstone Standard format)
### 11.6. Patch Notes - Cách balance Live Game
Mỗi patch là cơ hội balance. Quy tắc:
- **Buff trước, Nerf sau:** Buff làm player vui, Nerf làm player giận. Ưu tiên buff.
- **Small changes:** Đổi 5-10% thôi. Big changes phá meta.
- **Transparent reasoning:** Giải thích TẠI SAO đổi. Player thông minh sẽ accept.
- **Data-driven:** Dùng telemetry, không phải cảm giác. Tracking win rate, pick rate, ban rate.
- **Meta diversity:** Tốt = 60-80% character/build playable. Tệ = chỉ 5-10 picks dominant.
CHƯƠNG 12
## Player Psychology - Tâm Lý Người Chơi
Hiểu psychology = hiểu player. Đây là **secret sauce** của các designer xuất sắc.
### 12.1. Flow State - Trạng thái dòng chảy
Khái niệm của **Mihaly Csikszentmihalyi** - trạng thái "in the zone" khi:
- Mất khái niệm thời gian
- Tập trung tuyệt đối
- Cảm giác kiểm soát hoàn toàn
- Vui sướng tự thân
FLOW = khi (Challenge ≈ Skill)**
Challenge >> Skill → ANXIETY (lo lắng, bỏ cuộc)
Challenge << Skill → BOREDOM (chán)
Challenge ≈ Skill → FLOW (mê đắm)
Designer phải:** Tăng difficulty đúng tốc độ player tăng skill. Cho player feel "tôi vừa đủ giỏi để làm được điều này, nhưng phải cố gắng".
### 12.2. Bartle's Taxonomy - 4 loại player
Richard Bartle phân tích MMO và phát hiện 4 mô-típ player:
#### 🏆 Achievers (40%)
Muốn **đạt được**: clear 100%, level cap, all achievements.
**Thiết kế cho họ:** Achievement system, leaderboard, completion bar
#### 🔍 Explorers (10%)
Muốn **khám phá**: hidden secrets, lore, edge cases.
**Thiết kế cho họ:** Easter eggs, hidden areas, deep lore, optional content
#### 🤝 Socializers (80%)
Muốn **tương tác**: chat, guild, drama. Đông nhất.
**Thiết kế cho họ:** Chat system, guilds, social features, gifts
#### ⚔️ Killers (10%)
Muốn **thắng người khác**: PvP, rank, dominate.
**Thiết kế cho họ:** PvP modes, ranking, kill feeds, victory celebrations
*(% chồng lấp, total > 100% vì 1 người có thể thuộc nhiều loại)*
### 12.3. Variable Reward Schedule
Khái niệm từ **B.F. Skinner** (hộp Skinner). Đây là **vũ khí gây nghiện nhất** trong game design - cũng là vấn đề đạo đức.
| Schedule | Hành vi | Ví dụ |
| --- | --- | --- |
| Fixed Ratio | Predictable, chán nhanh | Cứ kill 10 mob được 1 loot |
| Fixed Interval | Rush vào lúc cuối | Daily reward, daily quest |
| Variable Ratio | Gây nghiện nhất | Drop rate ngẫu nhiên, gacha, loot box |
| Variable Interval | Check thường xuyên | Pokemon Go spawn ngẫu nhiên |
> **⚠️ Đạo đức trong Design**
>
> 
Variable Ratio cùng với "near miss" và "sunk cost" được dùng trong gacha/lootbox và bị cấm/giới hạn ở Bỉ, Hà Lan, Trung Quốc. Designer cần cân nhắc đạo đức - chỉ vì có thể làm KHÔNG có nghĩa là NÊN làm.
### 12.4. Cognitive Biases trong Game
#### 💎 Loss Aversion
Người ta sợ mất 100đ hơn vui khi được 100đ.
**Áp dụng:** Streak bonus (mất khi nghỉ 1 ngày), wager system trong card games.
#### 🪙 Sunk Cost Fallacy
Đã invest nhiều → cảm thấy phải tiếp tục.
**Áp dụng:** Battle pass, character upgrade requiring more after each level.
#### 🎯 Goal Gradient
Càng gần goal càng motivated.
**Áp dụng:** XP bar gần đầy, "1 more chest", boss máu sắp 0.
#### 🌟 Endowment Effect
Người ta đánh giá đồ của mình cao hơn.
**Áp dụng:** Cho free trial character/skin. Khi muốn lấy lại, player sẽ trả tiền.
#### 🎲 Near Miss Effect
"Suýt thắng" tạo cảm giác phải thử lại.
**Áp dụng:** Slot machines, gacha có hint "gần 5★ rồi".
#### 👑 Social Proof
Người khác làm = đáng làm.
**Áp dụng:** "10,000 player đã claim reward này", leaderboard, friend activity.
### 12.5. Self-Determination Theory (SDT)
Theo Deci & Ryan, 3 nhu cầu cơ bản của con người:
- **Autonomy (Tự chủ):** "Tôi có lựa chọn". Designer cho meaningful choices.
- **Competence (Năng lực):** "Tôi giỏi". Designer cho progression có thể nhìn thấy.
- **Relatedness (Kết nối):** "Tôi không cô đơn". Designer cho social features.
**Game tốt thỏa mãn cả 3.** Witcher 3, Stardew Valley, Animal Crossing - đều hit hard cả 3.
### 12.6. The Dopamine Loop
#### Cách game "hack" não bộ:
- **Cue (Trigger):** Push notification, daily reset, friend online
- **Craving:** Player muốn vào game
- **Response:** Player chơi
- **Reward:** XP, loot, social interaction
- **Loop:** Quay lại bước 1, mạnh hơn
*Quá trình này tương tự cờ bạc và social media. Power lớn = responsibility lớn.*
CHƯƠNG 13
## Progression Systems
Progression = **cảm giác tiến bộ theo thời gian**. Đây là động cơ chính khiến player quay lại game ngày này qua ngày khác.
### 13.1. Các loại Progression
#### 📈 Power Progression
Player mạnh hơn: stats tăng, skill mới, gear tốt hơn.
*Ví dụ: RPG levelling, gear upgrade*
#### 🧠 Skill Progression
Player **thực sự** giỏi hơn. Không phải số tăng.
*Ví dụ: Souls-like, fighting games, esports*
#### 🗺️ World Progression
Mở khóa khu vực, story mới.
*Ví dụ: Metroidvania, open world unlock*
#### 🎨 Cosmetic Progression
Skin, title, frame - không ảnh hưởng power.
*Ví dụ: League of Legends, Fortnite*
#### 📚 Knowledge Progression
Player biết nhiều hơn về game.
*Ví dụ: Outer Wilds, Return of the Obra Dinn*
#### 🤝 Social Progression
Rank, ranking, guild rep.
*Ví dụ: Competitive games, MMOs*
### 13.2. XP Curve Design
Curve tăng XP cần thiết để lên level là trái tim của RPG.
// Linear (không tốt)
XP_needed(L) = 100 * L
→ Level 100 cần 10,000 XP. Cảm thấy nhàm.
// Exponential (phổ biến)
XP_needed(L) = 50 * (L ^ 2)
→ Level 1 cần 50, Level 100 cần 500,000
// Logarithmic (cho early game nhanh, late slow)
XP_needed(L) = 1000 * log(L + 1)
// Hybrid (best - phổ biến trong MMO)
- Early (Lv 1-30): nhanh để hook player
- Mid (Lv 30-60): vừa phải
- Late (Lv 60+): chậm để cảm giác achievement
### 13.3. The "Power Fantasy"
Diablo, Vampire Survivors, idle games - đều cho player cảm giác **"tôi siêu mạnh"**.
#### Cách tạo Power Fantasy:
- **Start weak:** Để player cảm thấy growth
- **Numbers go up:** Damage 100 → 1,000 → 100,000 → 1M
- **Visual escalation:** Spell ban đầu nhỏ → fill cả màn hình
- **Bigger enemies:** Goblin → Dragon → God
- **Time compression:** Boss khó tuần trước giờ 1-shot
### 13.4. Endgame Design
Cái mà player làm sau khi "hết game" - đặc biệt quan trọng cho live service.
- **Daily/Weekly Quests:** Lý do log-in mỗi ngày (Genshin daily commission)
- **Battle Pass:** Mua 1 lần, grind 90 ngày
- **Raid:** Co-op khó cần 4-40 người (WoW, Destiny)
- **Ranked PvP:** Climb rank vĩnh viễn
- **Crafting/Trading:** Player economy
- **Roguelite runs:** Replay với perma upgrades
- **Achievement hunting:** Cho completionists
- **UGC (User Generated Content):** Roblox, Fortnite Creative
### 13.5. Pacing Progression
Quá nhanh → Player overwhelmed, không enjoy**
Quá chậm → Player bored, quit
Chuẩn → Reward mỗi 5-15 phút (mobile), 30-60 phút (PC/console)
### 13.6. Treadmill Design - "Bánh xe chuột hamster"
> **⚠️ Vấn đề đạo đức**
>
> 
Một số game thiết kế progression bất tận - không bao giờ thấy "đỉnh". Player chạy mãi không bao giờ tới.
Ví dụ:** Mobile RPG với gear power level vô tận, MMO grind 1000+ hours.**
Designer cần cân nhắc: *Game có phải là "thời gian được trân trọng" hay "thời gian bị đánh cắp"?*
CHƯƠNG 14
## Economy & Monetization
In-game economy là khoa học**, monetization là **nghệ thuật**. Hiểu sai = game chết. Hiểu đúng = $1B+ doanh thu.
### 14.1. Game Economy 101
#### Sources & Sinks (Nguồn & Cống)
Mọi nền kinh tế cần 2 loại:
- **Sources:** Nơi tiền/resource xuất hiện. (Quest reward, monster drop)
- **Sinks:** Nơi tiền/resource biến mất. (Repair cost, upgrade cost, marketplace fee)
Sources > Sinks → Inflation (lạm phát, tiền vô giá)**
Sources < Sinks → Grinding tedious
Sources ≈ Sinks → Healthy economy
### 14.2. Các loại Currency
| Loại | Đặc điểm | Ví dụ |
| --- | --- | --- |
| Soft Currency | Kiếm dễ, dùng nhiều, không mua được | Gold trong WoW |
| Hard Currency | Hiếm, ít kiếm, mua bằng tiền thật | Genesis Crystal (Genshin), VP (Valorant) |
| Premium Currency | Chỉ mua bằng tiền thật | Robux, V-Bucks |
| Event Currency | Có thời hạn, đổi item event | Trick or Treat tokens |
| Reputation | Build với 1 phe, đổi unique item | WoW factions, GTA V reputation |
### 14.3. Monetization Models
#### 💵 Premium (Buy-to-Play)
Mua 1 lần, chơi hết.
Ưu:** Đơn giản, fair, không pay-to-win.
**Nhược:** Cap doanh thu = (price × số copies).
*Ví dụ: Elden Ring, Hollow Knight*
#### 🆓 Free-to-Play (F2P)
Miễn phí, kiếm tiền qua IAP/Ads.
**Ưu:** Tệp player khổng lồ, doanh thu vô hạn.
**Nhược:** Phụ thuộc whale, dễ pay-to-win.
*Ví dụ: Fortnite, Genshin, LoL*
#### 📅 Subscription
Trả $X/tháng.
**Ưu:** Doanh thu ổn định.
**Nhược:** Khó duy trì content liên tục.
*Ví dụ: WoW, FFXIV, Xbox Game Pass*
#### 🎫 Battle Pass
Mua pass, grind 60-90 ngày unlock reward.
**Ưu:** Doanh thu định kỳ, không pay-to-win (nếu cosmetic).
**Nhược:** FOMO, áp lực chơi.
*Ví dụ: Fortnite, Apex, COD*
#### 🎰 Gacha / Loot Box
Spin để có RNG reward.
**Ưu:** Doanh thu cực cao (whale).
**Nhược:** Đạo đức, bị regulate ở nhiều nước.
*Ví dụ: Genshin Impact, FGO, Hearthstone*
#### 📺 Ads
Xem ad để nhận reward / không có ad.
**Ưu:** Không cần player trả tiền.
**Nhược:** Doanh thu thấp/user, có thể gây khó chịu.
*Ví dụ: Hyper-casual games*
### 14.4. Whale, Dolphin, Minnow
#### Cấu trúc spending trong F2P:
- **Whales (1-2%):** Chi $500-50,000+/tháng. Tạo 50-70% doanh thu.
- **Dolphins (5-10%):** Chi $20-200/tháng. Tạo 20-30% doanh thu.
- **Minnows (10-20%):** Chi $1-20/tháng. Tạo 5-10% doanh thu.
- **F2P (70-85%):** Không chi. Tạo content/community cho whale flex.
### 14.5. The "Whale Hunting" Ethics Problem
> **⚠️ Cẩn thận**
>
> 
Một số game design "săn whale" - target người có vấn đề (compulsive spending, gambling addiction). Đã có case lawsuit, vụ tự tử liên quan đến gacha.**
Best practice:** Set spending limit, transparency về drop rate, pity system, không target trẻ em.
### 14.6. The "Player-friendly" Monetization
Có những game thành công cực lớn mà không hack tâm lý:
- **Path of Exile:** Hoàn toàn F2P, chỉ bán cosmetic + storage. Doanh thu vẫn cao.
- **Warframe:** Mọi thứ farm được, premium chỉ là time skip.
- **Deep Rock Galactic:** Premium nhưng có DLC cosmetic optional.
- **Helldivers 2:** Battle pass không hết hạn, nhân từ.
### 14.7. KPIs Kinh tế quan trọng
| KPI | Định nghĩa | Mục tiêu chuẩn (mobile) |
| --- | --- | --- |
| ARPU | Avg Revenue Per User | $1-5/tháng |
| ARPPU | Avg Revenue Per Paying User | $30-100/tháng |
| Conversion Rate | % F2P → Pay | 3-8% |
| D1/D7/D30 Retention | % quay lại sau 1/7/30 ngày | 40%/20%/10% là tốt |
| LTV | Lifetime Value (tổng chi/player) | Cao hơn CPI |
| CPI | Cost Per Install (chi phí marketing/install) | $0.5-5 |
| K-factor | Viral coefficient (mỗi player kéo thêm bn) | >1 = viral |
CHƯƠNG 15
## Multiplayer & Social Design
Game đông người chơi mở ra trải nghiệm mà single-player không bao giờ có. Cũng kèm theo cực kỳ nhiều thử thách thiết kế.
### 15.1. Các kiểu Multiplayer
#### 🛋️ Local Co-op (Couch)
2-4 người cùng máy. Đang revival.
*Ví dụ: It Takes Two, Mario Party*
#### 🌐 Online Co-op
Cùng team, vs AI hoặc environment.
*Ví dụ: Deep Rock Galactic, Helldivers 2*
#### ⚔️ PvP Symmetric
2 phe giống nhau, kỹ năng quyết định.
*Ví dụ: Chess, Counter-Strike*
#### ⚔️ PvP Asymmetric
2 phe khác nhau, role khác.
*Ví dụ: Dead by Daylight (1v4), Evolve*
#### 👥 Team vs Team
Phổ biến nhất trong eSports.
*Ví dụ: LoL 5v5, Overwatch 6v6*
#### 🎯 Free-for-All / Battle Royale
Tất cả vs tất cả, ai sống cuối thắng.
*Ví dụ: PUBG, Fortnite, Fall Guys*
#### 🌍 MMO
Hàng nghìn player trong 1 thế giới.
*Ví dụ: WoW, FFXIV, EVE Online*
#### 📱 Async Multiplayer
Player tương tác không cần online cùng lúc.
*Ví dụ: Clash of Clans (raid base offline), Words with Friends*
### 15.2. Skill-based Matchmaking (SBMM)
Hệ thống ghép player với người cùng skill.
#### Elo / MMR System
// Đơn giản hóa Elo
expected_score_A = 1 / (1 + 10^((rating_B - rating_A) / 400))
new_rating_A = rating_A + K * (actual - expected)
K = 32 (cao = volatile, thấp = stable)
Kết quả: Win player rank thấp → ít point. Lose player rank cao → ít point mất. Win = match đúng skill → ~25 point.
### 15.3. Toxicity Management
Multiplayer đông = drama. Designer phải plan trước:
- **Report system:** Player dễ report, xử nhanh
- **Mute/Block:** Mute chat dễ dàng
- **Behavioral score:** LoL Honor system, Overwatch Endorsement
- **Communication wheel:** Hạn chế text chat, dùng pre-set messages (Valorant, R6)
- **Surrender vote:** Cho thoát match thua sớm
- **AFK detection:** Phát hiện và phạt
- **Cheat detection:** Anti-cheat (Vanguard, Vac, EAC)
### 15.4. Social Features
- **Friend list, party, voice chat:** Cơ bản
- **Guild/Clan:** Long-term social group
- **Gifting:** Tặng item/skin/currency
- **Spectator:** Xem friend chơi
- **Tournament/Custom games:** Tổ chức event riêng
- **Profile customization:** Thể hiện bản thân
- **Trading/Auction:** Player economy
- **Marriage/Pet/Companion system:** Đặc thù MMO
### 15.5. Technical Multiplayer Challenges
> **📡 Net Code 101**
>
> 
**Latency (Ping):** Thời gian round-trip giữa player và server. <50ms = excellent, >100ms = noticeable, >200ms = bad.**
Tick Rate:** Server cập nhật bao nhiêu lần/giây. CS:GO chính thức 64Hz, FACEIT 128Hz.**
Client-side prediction:** Game đoán trước action local, sync với server sau.**
Rollback netcode:** Tốt nhất cho fighting game (GGPO).**
Lag compensation:** Server tính "shooter saw" khi player nhấn shoot, để fair với high-ping player.
### 15.6. Designing for Communities
Game thành công có cộng đồng mạnh. Cách build:
- **Memorable moments:** Mỗi match phải có 1 khoảnh khắc đáng share
- **Streamer-friendly:** Game đẹp khi xem, twitch chat tương tác
- **Modding support:** Skyrim, Minecraft - mod community giữ game alive 10+ năm
- **Community tools:** Replay, screenshot mode, photo mode
- **Developer presence:** Dev comment Reddit, AMA, transparent
- **Esports support:** Tournament tool, observer mode, prize pool
CHƯƠNG 16
## Prototyping - Tạo Mẫu
Prototype = **chứng minh ý tưởng vui**. Nguyên tắc số 1 của game design: *"Fail fast, fail cheap"*. Đừng đầu tư 6 tháng vào idea trước khi biết nó có vui không.
### 16.1. Các loại Prototype
#### 📝 Paper Prototype
Card, giấy, dice. 30 phút làm xong.
**Phù hợp:** Test core mechanic, balance, decision space.
**Ví dụ:** Civilization được prototype trên paper trước.
#### 💻 Digital Prototype
Trong engine (Unity/Godot). 1-2 tuần.
**Phù hợp:** Test feel, timing, real-time mechanics.
**Style:** Greybox - không art.
#### 🎬 Vertical Slice
Mini section của game thực, có art & sound.
**Phù hợp:** Pitch cho publisher, gauge production cost.
**Thời gian:** 1-3 tháng.
#### 🎮 MVP (Minimum Viable Product)
Phiên bản nhỏ nhất nhưng playable từ đầu đến cuối.
**Phù hợp:** Soft launch, early access.
**Thời gian:** 6-12 tháng.
### 16.2. The Prototype Mindset
> **🎯 Quy tắc Prototype**
>
> 
- **"Ugly is OK":** Đừng làm đẹp. Dùng asset miễn phí, hình hộp xám.
- **"Throwaway code":** Code có thể vứt - đừng try to perfect.
- **"One question at a time":** Mỗi prototype trả lời 1 câu hỏi.
- **"Time-box":** Đặt deadline cứng. 1 tuần là 1 tuần.
- **"Fail loud":** Phát hiện không vui sớm = thành công.
- **"Test with humans":** Cho người khác chơi NGAY, không chỉ self-test.
### 16.3. Câu hỏi mỗi Prototype trả lời
- **Core loop có vui không?** Người chơi muốn lặp lại không?
- **Game feel có ổn không?** Tương tác có satisfying?
- **Cơ chế có depth không?** Master được không?
- **Player có hiểu không?** Tutorial cần gì?
- **Có scale được không?** Còn vui sau 1 giờ chơi?
- **Multiplayer có hoạt động?** Có balance được?
### 16.4. Quy trình Prototype 1 tuần
#### Ngày 1: Idea & Scope
Viết 1 câu pitch. Liệt kê 3 core mechanics. Xác định "vertical slice" sẽ làm.
#### Ngày 2-3: Build Core Loop
Implement chỉ core loop. Player có thể chơi 1 vòng từ đầu đến cuối.
#### Ngày 4: Add 1 Variation
Thêm 1 thứ tạo variety (enemy mới, biome mới, power-up).
#### Ngày 5: Polish & Juice
Thêm screen shake, particle, sound. Đầu tư vào feel.
#### Ngày 6: Playtest
5 người chơi, quan sát kỹ. Take notes.
#### Ngày 7: Decision
Iterate hay scrap? Nếu iterate, làm tiếp 1 tuần. Nếu scrap, rút bài học.
### 16.5. Game Jam - Cách học Prototyping nhanh
Game Jam = sự kiện làm game trong 48 giờ với 1 theme. Đây là **cách tốt nhất** để học game design.
- **Ludum Dare:** Cũ nhất, 48-72h, 4 lần/năm
- **Global Game Jam:** Lớn nhất, tháng 1 hàng năm
- **GMTK Game Jam:** Mark Brown, 48h, theme thú vị
- **Brackeys Game Jam:** Indie friendly
- **Itch.io Jams:** Hàng trăm jam mỗi tháng, mọi chủ đề
**Bài học từ Game Jam:**
- Scope cực nhỏ - đôi khi 1 mechanic là đủ
- Hoàn thành quan trọng hơn perfect
- Học làm việc với team dưới áp lực
- Portfolio xây nhanh
- Một số game viral đã từ game jam (Goat Simulator, Surgeon Simulator, Superhot)
CHƯƠNG 17
## Tools & Game Engines
Game Designer không cần code giỏi, nhưng phải biết engine cơ bản để prototype, scripting hệ thống, và communicate với programmer.
### 17.1. Top Game Engines 2026
#### 🟢 Unity
DỄ HỌC
- Phổ biến nhất, 50%+ mobile game
- Ngôn ngữ: C#
- 2D & 3D đều mạnh
- Asset Store khổng lồ
- Free cho dự án < $200k revenue
**Phù hợp:** Mobile, indie, prototype, AR/VR
#### 🟦 Unreal Engine 5
TRUNG BÌNH
- AAA standard - đồ họa khủng
- Blueprint visual scripting
- C++ cho performance
- Free, 5% royalty > $1M
- Nanite + Lumen revolutionary
**Phù hợp:** AAA, FPS, photorealistic, large team
#### 🟧 Godot
DỄ HỌC
- Open source 100%, free forever
- GDScript (Python-like)
- Lightweight, mở nhanh
- Growing rapidly
- Tuyệt cho 2D
**Phù hợp:** Indie, 2D, learners, open source
#### 🎲 GameMaker
RẤT DỄ
- 2D specialist
- GML (custom) hoặc drag-drop
- Made: Undertale, Hyper Light Drifter
**Phù hợp:** 2D indie, beginner
#### 🏗️ Roblox Studio
DỄ
- Lua scripting
- 200M+ daily active player
- Built-in monetization
- Easy publish
**Phù hợp:** Trẻ em, UGC, fast monetization
#### 🧊 Bevy / Custom Engines
PRO
- Rust-based modern engine
- ECS architecture
- Lập trình viên hardcore
**Phù hợp:** Tech demo, learning, niche
### 17.2. Design Tools - Không phải engine
#### 📊 Excel / Google Sheets
Số 1 tool của Game Designer. Balance, economy, drop rate.
#### 📝 Notion / Confluence
Viết GDD, wiki, knowledge base team.
#### 🎨 Figma / Miro
UI mockup, flow diagram, brainstorm visual.
#### 🗺️ Tiled / LDtk
Level editor 2D độc lập, export sang engine.
#### 🌳 Twine / Ink / Yarn
Narrative scripting cho dialogue branching.
#### 🎵 FMOD / Wwise
Audio middleware - thiết kế sound system phức tạp.
#### 📐 Blockbench / MagicaVoxel
3D model nhanh cho prototype.
#### 🎲 Jira / Trello / ClickUp
Project management, task tracking.
### 17.3. Lập trình cho Game Designer
Bạn KHÔNG cần là programmer, nhưng nên hiểu:
- **Visual scripting:** Unreal Blueprint, Unity Bolt - prototype không cần code
- **Scripting languages:** Lua, Python - dễ học, đủ cho hầu hết game logic
- **Basic concepts:** Variable, function, loop, if/else, array
- **Game patterns:** Update loop, state machine, event system, observer
- **Math:** Vector, trigonometry, basic linear algebra
> **📚 Lộ trình học code**
>
> 
- **Tháng 1:** Brackeys YouTube Unity tutorials
- **Tháng 2:** Catlike Coding tutorials (Unity sâu hơn)
- **Tháng 3:** Làm clone Tetris, Snake, Breakout
- **Tháng 4:** Sebastian Lague YouTube (algorithms)
- **Tháng 5-6:** Game riêng, đăng itch.io
CHƯƠNG 18
## Playtesting
Playtest là **kỹ năng quan trọng nhất** mà không trường nào dạy. Game tốt được làm bằng 20% inspiration + 80% playtest iteration.
"Your first idea is always wrong. Your fifth idea is usually good. Your fiftieth is great."**
*— Industry wisdom*
### 18.1. Các loại Playtest
#### 🤝 Internal Playtest
Team chơi với nhau. Hàng ngày.
Vấn đề:** Team biết game quá rõ, bias.
#### 👥 Friends & Family
Người ngoài team, nhưng quen.
**Vấn đề:** Họ "lịch sự" - không nói thẳng.
#### 🎯 Targeted Playtest
Tìm đúng target demographic.
**Ưu:** Insight chính xác từ user thực.
#### 🌐 Public Playtest (Open Beta)
1000-100,000 player online.
**Ưu:** Telemetry data lớn.
#### 🔬 Focus Group
6-12 người ngồi bàn, có moderator.
**Ưu:** Discussion sâu.
#### 📊 A/B Test
Live game, chia player ra 2 nhóm, so sánh.
**Ưu:** Quantitative, scientific.
### 18.2. Cách Playtest đúng cách
#### Define câu hỏi cụ thể
Đừng "playtest game". Hỏi: "Tutorial có hiểu không?" / "Boss có quá khó không?" / "Combat có vui không sau 30 phút?"
#### Tìm đúng người
Target audience. Trẻ em test game trẻ em. Hardcore gamer test hardcore game.
#### Chuẩn bị môi trường
PC/console hoạt động, save có sẵn, có ghi chú. Bí mật giữ playtest cho team.
#### Đừng giúp
QUY TẮC VÀNG: KHÔNG giải thích, KHÔNG hint. Khi player kẹt = vấn đề thiết kế.
#### Quan sát thầm
Ghi: chỗ nào im lặng (chán), cười (vui), chửi thề (frustrated), nhíu mày (confused).
#### Phỏng vấn sau
"Cảm xúc của bạn?" "Phần nào nhớ nhất?" "Phần nào tệ nhất?" KHÔNG hỏi "Bạn có thích game?" - quá chung chung.
#### Analyze & Iterate
1 player feedback = anecdote. 5 player cùng feedback = pattern. Sửa.
### 18.3. Lắng nghe HÀNH ĐỘNG, không phải LỜI NÓI
> **⚠️ Quy tắc của Shigeru Miyamoto**
>
> 
Player nói thường KHÔNG đúng những gì họ cần.**
Ví dụ thật:** Player nói "Tôi muốn dễ hơn". Designer giảm difficulty → player chán. Thực ra player muốn "thử thách phù hợp với skill của tôi".**
Quan sát body language, facial expression, time spent stuck quan trọng hơn lời nói.
### 18.4. Telemetry & Analytics
Khi có game live, tracking data:
- Funnel:** % player vượt qua mỗi level
- **Drop-off point:** Player quit ở đâu?
- **Retention:** D1, D7, D30
- **Session length:** Trung bình bao lâu/session
- **Heatmap:** Player chết ở đâu trong map
- **Win rate per character:** Imbalance detection
- **Economy flow:** Currency vào/ra
- **Crash rate:** Bug priority
**Tools:** Unity Analytics, GameAnalytics, AppsFlyer, Adjust, Amplitude.
### 18.5. Common Playtest Pitfalls
- **Test với người đã chơi:** Họ biết quá nhiều
- **Hỏi yes/no:** Phải hỏi mở
- **Defensive:** Không argue với feedback
- **Listen to vocal minority:** 1 người gáy to ≠ majority view
- **Skip the data:** Always look at both qualitative + quantitative
- **Test too late:** Phải test SỚM trong development
CHƯƠNG 19
## Game Design Document (GDD)
GDD là **văn bản** mô tả game cho cả team. Khả năng viết GDD rõ ràng = kỹ năng phân biệt Designer chuyên nghiệp với amateur.
### 19.1. Modern GDD - Không phải sách 500 trang
> **📚 GDD thời nay**
>
> 
Quá khứ: GDD = 1 file Word 500 trang, "the bible". Vấn đề: Nobody reads it, outdated nhanh.**
Hiện đại: GDD = living wiki** trên Notion/Confluence với:
- One-pager pitch
- 10-pager design overview
- Nhiều "feature spec" riêng cho từng tính năng
- Update theo iteration
### 19.2. Structure của GDD hiệu quả
#### 📄 1-Pager (Pitch Document)
- **Title:** Tên game
- **Tagline:** 1 câu mô tả
- **Genre:** Thể loại
- **Platform:** PC, Console, Mobile?
- **Target audience:** Tuổi, gender, interest
- **USP (Unique Selling Points):** 3 điểm khác biệt
- **Inspiration:** "Like X meets Y"
- **Visual style:** Mood board, 3-5 reference images
- **Scope & Budget:** Estimated
#### 📚 Design Overview (5-10 pages)
- **Vision & Pillars:** Tại sao game này tồn tại? 3-5 core pillars
- **Core Loop:** Diagram + giải thích
- **Player Experience:** First 10 phút, first 1 giờ, first 10 giờ
- **Key Mechanics:** Top 5 mechanics chính
- **Progression:** Player làm gì trong 1, 10, 100 giờ?
- **Narrative:** High-level story (nếu có)
- **Art Direction:** Style guide
- **Audio Direction:** Mood, references
- **Monetization:** Business model
- **Comparison:** So với competitors
#### 🔧 Feature Spec (mỗi feature 1 doc)
**Cấu trúc 1 Feature Spec:**
- **Goal:** Mục tiêu của feature này
- **User Story:** "As a player, I want to ... so that ..."
- **Wireframe / Mockup:** Visual
- **Flow Diagram:** Step-by-step user flow
- **Edge Cases:** Tình huống đặc biệt
- **Dependencies:** Feature này cần gì
- **Acceptance Criteria:** Khi nào coi là "done"
- **Open Questions:** Chưa rõ
### 19.3. Tips viết GDD pro
- **Concrete > Abstract:** "Player can double-jump để vượt over 3-tile gaps" thay vì "Player có khả năng vận động cao"
- **Numbers everywhere:** Damage 50, cooldown 3s, range 500 units
- **Reference existing games:** "Combat như Hades, exploration như Hollow Knight"
- **Visual heavy:** Diagram, screenshot, mockup nhiều hơn text
- **Active voice:** "Player jumps" thay vì "Jumping is performed"
- **Define jargon:** Mỗi thuật ngữ mới phải có định nghĩa
- **Version & date:** Mỗi doc có version + last updated
- **TBD is fine:** "TBD" tốt hơn placeholder fake info
### 19.4. Example Pitch - Hades
#### 🔥 Hades - 1 Pager Sample
**Title:** Hades
**Tagline:** "Defy the god of the dead as you hack and slash out of the Underworld"
**Genre:** Roguelike action RPG
**Platform:** PC, Switch, then PS, Xbox
**USP:**
- Story integrated với roguelike - mỗi death tiến triển narrative
- Fast, fluid combat từ studio Bastion/Transistor/Pyre
- Greek mythology với art direction độc đáo
**Inspiration:** Dead Cells (combat) meets Slay the Spire (progression) meets Greek tragedy.
### 19.5. Anti-patterns trong GDD
> **❌ Tránh xa**
>
> 
- **"Bible mentality":** 500 trang viết 1 năm, không ai đọc
- **Marketing language:** "Stunning graphics", "amazing gameplay" - vô nghĩa
- **"It's like X but better":** Lười suy nghĩ
- **Too vague:** "Game sẽ vui" không phải design
- **Too specific too early:** "Đạn rocket damage 47.3" trước khi test
- **No iteration tracking:** Không biết version nào mới
CHƯƠNG 20
## Portfolio & Career
Game industry là ngành **portfolio-driven**. Bằng cấp ít quan trọng. Cái bạn ĐÃ LÀM mới là tiền tệ.
### 20.1. Portfolio cho Game Designer
#### 📋 Nội dung Portfolio nên có:
- **3-5 game đã làm** (đăng itch.io / Steam)
- **1 game riêng solo** chứng minh end-to-end skill
- **1-2 game làm team** chứng minh teamwork
- **Game Jam entries** chứng minh nhanh nhạy
- **Design analysis** của 5+ game thương mại
- **Sample GDD** hoặc feature spec
- **Mod / community work** nếu có
### 20.2. Cách build Portfolio
#### Bắt đầu nhỏ
Clone Pong, Snake, Tetris. Mục tiêu: hoàn thành, học engine.
#### Game Jam x 3-5
Mỗi jam = 1 game small. Portfolio nhanh có 3-5 entry.
#### 1 Solo Project hoàn chỉnh
Game 1-3 tháng. Có start menu, gameplay, end screen. Đăng itch.io.
#### Team project
Tham gia team indie / mod community. Chứng minh teamwork.
#### Design Documentation
Viết Medium/Substack/Blog phân tích game. Pin GDD samples.
#### Website Portfolio
Notion, Webflow, hay HTML đơn giản. Có: About, Projects, Blog, Contact.
### 20.3. Lộ trình Career
#### 🌱 Junior Designer (0-2 năm)
- Implement design đã sẵn
- Documentation tasks
- Balance tweaking
- Support senior
- **Lương:** 12-22tr VN, $50-80k US
#### 🌿 Mid-level (2-5 năm)
- Own feature từ A-Z
- Lead small team
- Cross-discipline communication
- **Lương:** 25-45tr VN, $80-130k US
#### 🌳 Senior (5-10 năm)
- Lead major systems
- Mentor junior
- Strategic decisions
- **Lương:** 45-80tr VN, $130-200k US
#### 🎯 Lead / Director (10+ năm)
- Vision của game
- Lead team 5-50+
- Stakeholder communication
- **Lương:** 80tr-250tr+ VN, $200-500k+ US
### 20.4. Phỏng vấn Game Designer
#### Câu hỏi thường gặp:
- "Tell me about your favorite game and what design lessons you learn"
- "How would you improve [popular game]?"
- "Design a game in 5 minutes" (whiteboard)
- "Walk through your design process"
- "How do you handle disagreement with engineer/artist?"
- "What would you do if your design isn't fun in playtest?"
- "Critique this game" (cho 1 game cụ thể)
#### Design Test (Take-home)
Studio sẽ gửi 1 design challenge - viết spec hoặc làm prototype trong 1-7 ngày.
- Đừng over-engineer
- Trình bày clear, có hình minh họa
- Show iteration ("V1 tôi nghĩ X, sau khi xem xét, V2 là Y vì Z")
- Acknowledge limitations
### 20.5. Studios & Networks tại VN
#### 🏢 Top Studios VN
- **VNG:** Mobile games, casino-style
- **Garena (Sea):** Publish, không phát triển nhiều
- **Sky Mavis:** Axie Infinity, Web3
- **Amanotes:** Music game (Magic Tiles 3)
- **Wolffun:** Tank Royale, blockchain
- **Gameloft VN:** Outsourcing cho parent
- **Hiker Games:** 7554, dò mìn
- **Sparx*:** Outsource AAA (cho Naughty Dog, Crystal Dynamics)
#### 🌐 Remote & International
- LinkedIn jobs ("Remote Game Designer")
- Hitmarker.net (gaming jobs)
- Work With Indies
- Gamasutra Jobs
- Twitter/X #gamedevjobs
- Game developer subreddits
### 20.6. Học liệu & Cộng đồng
> **📚 Resources không thể bỏ qua**
>
> 
#### 📖 Sách must-read:
- "The Art of Game Design" - Jesse Schell (Bible)
- "A Theory of Fun for Game Design" - Raph Koster
- "Rules of Play" - Salen & Zimmerman
- "Game Feel" - Steve Swink
- "Designing Games" - Tynan Sylvester
- "Level Up!" - Scott Rogers
- "Hooked" - Nir Eyal (psychology, controversial)
#### 🎥 YouTube channels:
- Game Maker's Toolkit (Mark Brown)
- Extra Credits
- Architect of Games
- Adam Millard - The Architect of Games
- Snoman Gaming
- Masahiro Sakurai on Creating Games
#### 🌐 Web:
- Gamasutra / Game Developer (articles)
- GDC Vault (talks miễn phí)
- r/gamedesign subreddit
- itch.io devlog
- Lost Garden blog (Daniel Cook)
### 20.7. Bí quyết success
> **🏆 Mantra của Industry**
>
> 
- **Ship games:** Hoàn thành quan trọng hơn perfect. 1 game finished > 10 game half-done.
- **Play widely:** Chơi nhiều thể loại. Bad game cũng dạy bạn nhiều.
- **Analyze, don't just play:** Mỗi game hỏi "Tại sao họ làm vậy?"
- **Be a communicator:** Designer giỏi nhất giỏi GIẢI THÍCH hơn THIẾT KẾ.
- **Network:** Game industry nhỏ. Reputation là tất cả.
- **Stay humble:** Game của bạn không vui = vấn đề của bạn, không phải player.
- **Iterate:** First idea always wrong. Second usually wrong. Tenth often right.
- **Take care of yourself:** Burn-out là epidemic trong ngành. Pace yourself.
CHƯƠNG 21
## Bài Kiểm Tra Cuối Khóa
15 câu hỏi kiểm tra kiến thức Game Design. Click vào đáp án để biết kết quả ngay.
Câu 1: MDA framework gồm những thành phần nào?
A. Mechanics, Design, Art
B. Mechanics, Dynamics, Aesthetics
C. Money, Design, Audience
D. Method, Data, Analytics
Câu 2: "Core Loop" trong game design là gì?
A. Vòng lặp chính của code
B. Chuỗi hành động lặp lại mà player thực hiện liên tục
C. Hệ thống save/load
D. Vòng đời nhân vật
Câu 3: "Flow state" xảy ra khi:
A. Challenge thấp hơn skill
B. Challenge cao hơn skill
C. Challenge tương đương với skill
D. Player chơi 10+ giờ liên tục
Câu 4: "Ludonarrative dissonance" là gì?
A. Game lag
B. Âm thanh trong game
C. Mâu thuẫn giữa gameplay và narrative
D. Player rage quit
Câu 5: Theo Bartle Taxonomy, ai chiếm tỉ lệ cao nhất?
A. Achievers
B. Explorers
C. Socializers
D. Killers
Câu 6: "Greybox" trong level design có nghĩa là?
A. Level chỉ có 1 màu xám
B. Level dựng bằng khối hộp xám, focus gameplay trước art
C. Level bị bug
D. Level cuối game
Câu 7: Trong F2P, "Whales" là gì?
A. Player chơi nhiều giờ
B. Player chi nhiều tiền (chiếm 1-2% nhưng 50-70% doanh thu)
C. Boss trong game
D. Game thể loại sinh tồn
Câu 8: Variable Ratio reward schedule gây nghiện nhất là khái niệm của ai?
A. Jesse Schell
B. Sid Meier
C. B.F. Skinner
D. Shigeru Miyamoto
Câu 9: "TTK" trong shooter có nghĩa là?
A. Total Trigger Kicks
B. Time To Kill
C. Top Tier Kill
D. Target Tracking Key
Câu 10: Loại UI nào "tồn tại trong world của nhân vật"?
A. Non-diegetic
B. Diegetic
C. Spatial
D. Meta
Câu 11: Trong playtest, nguyên tắc vàng là?
A. Giải thích cho player chơi đúng
B. Hỏi player có thích game không
C. Không can thiệp, quan sát hành động
D. Cho player chơi với cheat
Câu 12: "Power Creep" là vấn đề khi:
A. Game chạy chậm
B. Unit mới luôn mạnh hơn unit cũ, khiến cũ vô dụng
C. Player level lên quá nhanh
D. Boss quá khó
Câu 13: Engine nào phù hợp nhất cho người mới học game design?
A. Custom C++ engine
B. Unreal Engine 5
C. Unity hoặc Godot
D. CryEngine
Câu 14: "Hit Stop" hay "Hit Pause" có mục đích gì?
A. Cho game đỡ lag
B. Tạo cảm giác trọng lượng và impact khi va chạm
C. Cho player nghỉ ngơi
D. Hiển thị quảng cáo
Câu 15: Cách build portfolio tốt nhất cho Game Designer mới là?
A. Học 5 năm đại học game design
B. Đọc 100 cuốn sách lý thuyết
C. Ship nhiều game nhỏ + tham gia Game Jam
D. Mua portfolio template đẹp
> **🎓 Chúc mừng hoàn thành khóa học!**
>
> 
**Bạn vừa hoàn thành 21 chương Game Design toàn diện.** Đây mới là *khởi đầu* - game design là hành trình học suốt đời.
**Hành động ngay sau khóa học:**
- Chọn 1 engine (Unity/Godot) và làm theo 5 tutorial cơ bản
- Tham gia 1 Game Jam (Ludum Dare, GMTK) trong 90 ngày tới
- Phân tích 5 game yêu thích - viết Game Analysis trên Medium
- Đọc "The Art of Game Design" - Jesse Schell (sách bible)
- Subscribe Game Maker's Toolkit, Extra Credits trên YouTube
- Tham gia r/gamedesign, server Discord cộng đồng VN/quốc tế
- Bắt đầu blog/devlog cá nhân - document hành trình của bạn
- Apply intern ở 1 studio sau 6-12 tháng practice
🎮
"Every great game started as a small idea. What's yours?"
🎮 Khóa Học Game Design Toàn Diện | © 2026
"Players don't remember features. They remember moments."