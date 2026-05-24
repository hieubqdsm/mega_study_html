# Khóa Học Tester / QA - Từ Cơ Bản Đến Nâng Cao

> Nguồn: [khoa-hoc-tester-qa.html](khoa-hoc-tester-qa.html)

---

🐛
★ Quality Assurance Master Class ★
# KHÓA HỌC QA TESTER
Từ Manual Tester mới vào nghề đến Automation Engineer & QA Lead - 24 chương đầy đủ phủ Manual, Automation (Selenium), API (Postman), Performance (JMeter), Security, Mobile, AI testing & ISTQB
24CHAPTERS
100+CONCEPTS
50+REAL EXAMPLES
0BUGS LEFT
Chương 1
## Giới Thiệu QA Tester
### 1.1. Software Testing là gì?
**Software Testing** là quá trình *đánh giá chất lượng* của phần mềm bằng cách tìm ra **lỗi (bugs)**, đảm bảo sản phẩm đáp ứng **yêu cầu** và mang lại trải nghiệm tốt cho người dùng.
> **🎯 Định nghĩa ISTQB**
>
> 
Testing là một quá trình bao gồm tất cả các hoạt động **lifecycle**, cả tĩnh và động, liên quan đến lập kế hoạch, chuẩn bị và đánh giá phần mềm để xác định nó đáp ứng yêu cầu và phù hợp với mục đích sử dụng.
### 1.2. QA vs QC vs Tester - Khác biệt
| Vai trò | Định nghĩa | Hoạt động |
| --- | --- | --- |
| QA (Quality Assurance) | Đảm bảo quy trình tạo ra chất lượng | Process-oriented, prevent bugs (proactive) |
| QC (Quality Control) | Kiểm soát sản phẩm đầu ra | Product-oriented, find bugs (reactive) |
| Tester | Người thực hiện kiểm thử cụ thể | Execute test cases, log bugs |
**Trong thực tế tại VN**: 3 khái niệm thường dùng lẫn lộn. Mọi người nói "QA" nhưng làm việc của Tester. Đừng quá lăn tăn.
### 1.3. Vì Sao Cần Testing?
💰
#### Tiết kiệm chi phí
Bug phát hiện ở Production tốn gấp **100 lần** ở giai đoạn dev. (IBM Systems Sciences Institute)
🛡️
#### Bảo vệ uy tín
1 bug nghiêm trọng có thể phá hủy thương hiệu (như Boeing 737 MAX, NASA Mars Climate Orbiter).
😊
#### User Experience
App có bug = user uninstall trong 24h. 88% users abandon app sau 1 bug nghiêm trọng.
⚖️
#### Tuân thủ pháp lý
Một số ngành (banking, healthcare) bắt buộc kiểm thử theo tiêu chuẩn.
🚀
#### Performance
App chậm 1 giây → Amazon mất 1.6 tỷ USD/năm. Performance test crucial.
🔒
#### Security
Data breach trung bình tốn 4.45 triệu USD (IBM 2023). Security test bắt buộc.
### 1.4. Các thảm họa kinh điển do thiếu Testing
NASA mất tàu vũ trụ trị giá **$327 triệu USD**. Lý do: Lockheed Martin dùng đơn vị Imperial (pound-seconds), NASA dùng metric (newton-seconds). Bug đơn vị đo lường không được test → tàu đâm vào Mars.
Công ty trading mất **$440 triệu USD trong 45 phút**. Lý do: Deploy code mới, nhưng quên xóa code cũ trên 1 server. Không có regression test → bot trading điên loạn.
Máy xạ trị y tế. Race condition bug khiến bệnh nhân nhận liều xạ **100 lần** liều bình thường. **6 người chết**. Đây là case study #1 về importance of testing.
Update của CrowdStrike crash 8.5 triệu máy Windows toàn cầu. Hãng hàng không, ngân hàng, bệnh viện dừng hoạt động. Thiệt hại ước tính **$5+ tỷ USD**. Lý do: thiếu staged rollout testing.
### 1.5. 7 Nguyên Tắc Cơ Bản (ISTQB)
#### Testing chỉ ra Defect, không chứng minh hoàn hảo
Test thành công = tìm thấy bug, không phải "không bug". Không thể test hết mọi trường hợp.
#### Exhaustive testing là bất khả thi
Test mọi combination = vô hạn. Phải prioritize, dùng techniques.
#### Test sớm
Bug phát hiện sớm = rẻ. Test từ giai đoạn requirement, không chờ code xong.
#### Defect Clustering (Pareto 80/20)
80% bugs nằm trong 20% modules. Focus vào module "rủi ro cao".
#### Pesticide Paradox
Lặp lại cùng test case → không tìm thêm bug. Phải đa dạng hóa.
#### Testing phụ thuộc Context
Test app banking khác app game. Không có "one-size-fits-all".
#### "Absence-of-errors" là Fallacy
Không có bug ≠ software hữu ích. Phải đáp ứng đúng yêu cầu user.
### 1.6. Thị Trường QA tại Việt Nam 2026
- **Demand cao:** Mỗi project software đều cần QA. Việt Nam có 200,000+ tester
- **Outsourcing hub:** VN là top destination cho QA outsourcing (FPT, KMS, Saigon Technology, Axon Active)
- **Entry barrier thấp:** Manual tester có thể vào nghề từ non-IT background
- **Lương cạnh tranh:**
Junior Manual: 8-15 triệu/tháng
- Mid Manual: 15-25 triệu/tháng
- Junior Automation: 15-25 triệu/tháng
- Senior Automation: 30-50 triệu/tháng
- QA Lead/Manager: 40-80 triệu/tháng
- Remote (US/EU): $30-80/hour
> **🎓 Lộ trình học cho người mới**
>
> 
- **Tháng 1-2:** Học fundamentals (SDLC, STLC, test types, techniques)
- **Tháng 3-4:** Manual testing thực hành (test case, bug report)
- **Tháng 5-6:** Tools (JIRA, TestRail, Postman cơ bản)
- **Tháng 7-9:** Apply Junior Manual Tester
- **Tháng 10-12:** Học automation (Selenium + Java/Python)
- **Năm 2:** API testing, CI/CD, ISTQB Foundation
- **Năm 3+:** Specialize - Performance/Security/Mobile/AI
Chương 2
## Software Testing Fundamentals
### 2.1. Error - Defect - Failure - Khác biệt
Đây là 3 khái niệm CỰC KỲ quan trọng, hay được hỏi interview.
#### 👨‍💻 Error / Mistake
Lỗi của **con người**. Developer hiểu sai requirement, code sai.
*Ví dụ: Dev viết `if (a < b)` thay vì `if (a > b)`*
#### 🐛 Defect / Bug
Lỗi xuất hiện trong **code**. Hậu quả của Error.
*Logic sai trong source code (chưa run)*
#### ❌ Failure
Khi software **chạy** và behavior khác expected.
*User nhập 2 số, app tính sai → user thấy*
> **🔄 Mối quan hệ**
>
> 
**Error → Defect → Failure****
Developer mắc Error → tạo Defect (Bug) trong code → khi run thì gây Failure.
Note: Không phải mọi Defect đều gây Failure (có thể không bao giờ chạy đến đoạn code đó).
### 2.2. Verification vs Validation
| Verification | Validation |
| --- | --- |
| "Are we building the product RIGHT ?" | "Are we building the RIGHT product?" |
| Kiểm tra theo specification | Kiểm tra theo user needs |
| Static testing (review, walkthrough) | Dynamic testing (execute software) |
| Trước khi code xong | Sau khi code xong |
| Code review, requirement review | Unit test, system test, UAT |
### 2.3. Static Testing vs Dynamic Testing
#### 📄 Static Testing
KHÔNG chạy code.** Review documents, code.
- Requirement review
- Design review
- Code review (peer review)
- Walkthrough
- Inspection (formal)
- Static analysis tools (SonarQube, ESLint)
**Ưu:** Phát hiện sớm, rẻ.
#### ⚡ Dynamic Testing
**CHẠY code, software**. Quan sát behavior.
- Unit testing
- Integration testing
- System testing
- UAT (User Acceptance Test)
**Ưu:** Phát hiện runtime bug.
### 2.4. Severity vs Priority - Phân loại Bug
| Severity (Mức nghiêm trọng) | Priority (Mức ưu tiên) |
| --- | --- |
| Đánh giá impact của bug lên hệ thống | Đánh giá thứ tự cần fix |
| Quyết định bởi Tester | Quyết định bởi PM/PO |
| Mang tính kỹ thuật | Mang tính business |
#### 4 cấp độ Severity:
- CRITICAL System crash, data loss, không thể tiếp tục
- HIGH Major function không hoạt động, có workaround
- MEDIUM Minor function lỗi, không quan trọng
- LOW Cosmetic (UI), typo, alignment
#### 4 cấp độ Priority:
- P1 - Urgent Fix ngay (block release)
- P2 - High Fix trong sprint hiện tại
- P3 - Medium Fix trong sprint tiếp
- P4 - Low Fix sau, hoặc backlog
#### Ma trận Severity vs Priority - Ví dụ thực tế:
| Tình huống | Severity | Priority |
| --- | --- | --- |
| Tên CEO bị viết sai trên homepage | Low (chỉ cosmetic) | P1 (sếp giận!) |
| Crash khi user click nút ít dùng | Critical (crash) | P3 (ít người dùng) |
| Login không hoạt động | Critical | P1 |
| Font hơi lệch ở email confirmation | Low | P4 |
### 2.5. Quality Attributes (ISO 25010)
Phần mềm tốt phải đạt 8 thuộc tính:
#### ✅ Functional Suitability
Đáp ứng requirement đúng
#### ⚡ Performance Efficiency
Tốc độ, tài nguyên
#### 🤝 Compatibility
Hoạt động với hệ thống khác
#### 👥 Usability
Dễ sử dụng
#### 🛡️ Reliability
Ổn định, không crash
#### 🔒 Security
Bảo mật dữ liệu
#### 🔧 Maintainability
Dễ sửa, mở rộng
#### 📦 Portability
Chuyển qua môi trường khác
Chương 3
## SDLC & STLC - Vòng Đời Phần Mềm
### 3.1. SDLC - Software Development Life Cycle
**SDLC** = chu trình phát triển phần mềm. Tester phải hiểu mọi giai đoạn để biết mình ở đâu.
#### Requirement Analysis
Thu thập, phân tích yêu cầu từ khách hàng. Output: SRS (Software Requirement Specification).
**Tester làm gì:** Review SRS, đặt câu hỏi clarify, identify testable requirements.
#### Planning
Lên kế hoạch: timeline, resource, budget.
**Tester làm gì:** Test planning, estimate test effort.
#### Design
Thiết kế architecture, database, UI/UX.
**Tester làm gì:** Review design docs, prepare test cases.
#### Development / Coding
Developers code.
**Tester làm gì:** Setup test environment, prepare test data, write test scripts.
#### Testing
Execute test cases, log bugs, retest.
**Tester làm gì:** CORE PHASE - test execution.
#### Deployment
Release to production.
**Tester làm gì:** Smoke test on production, sanity check.
#### Maintenance
Hỗ trợ sau release, fix bug production.
**Tester làm gì:** Test patches, regression test.
### 3.2. SDLC Models
#### 🌊 Waterfall
Tuần tự, từng giai đoạn xong mới qua bước tiếp.
**Pros:** Đơn giản, doc đầy đủ.
**Cons:** Không linh hoạt, test cuối cùng.
**Phù hợp:** Requirement rõ ràng, không đổi (banking core, government).
#### 🌀 Agile / Scrum
Iterative, sprint 2-4 tuần. Test continuously.
**Pros:** Adapt nhanh, customer feedback liên tục.
**Cons:** Doc ít, khó plan dài hạn.
**Phù hợp:** Hầu hết software hiện nay (90%+).
#### 🔁 V-Model
Mỗi giai đoạn dev có giai đoạn test tương ứng.
**Pros:** Test sớm, defect tìm sớm.
**Cons:** Vẫn rigid như Waterfall.
#### 🚀 DevOps / Continuous
Continuous Integration / Delivery. Test tự động liên tục.
**Phù hợp:** Web app, microservices, SaaS.
### 3.3. STLC - Software Testing Life Cycle
STLC là quy trình chi tiết của việc testing. Có 6 giai đoạn:
#### Requirement Analysis
Đọc, hiểu requirement. Identify testable items.
**Deliverable:** RTM (Requirement Traceability Matrix)
#### Test Planning
Strategy, scope, resources, schedule, risks.
**Deliverable:** Test Plan document, Test Strategy
#### Test Case Development
Viết test cases, test scripts, test data.
**Deliverable:** Test Cases, Test Scripts, Test Data
#### Test Environment Setup
Setup hardware, software, network để test.
**Deliverable:** Test environment ready, smoke test pass
#### Test Execution
Run test cases, log results, report bugs.
**Deliverable:** Test execution report, Bug reports
#### Test Closure
Tổng kết, retrospective, lessons learned.
**Deliverable:** Test Closure Report, metrics
### 3.4. Entry & Exit Criteria
Mỗi STLC phase có điều kiện vào (Entry) và ra (Exit).
#### 🚪 Entry Criteria (Test Execution)
- Code đã được unit test pass
- Test cases đã review & approved
- Test environment ready
- Test data prepared
- Smoke test passed
#### 🏁 Exit Criteria (Test Execution)
- 100% test cases executed
- ≥ 95% test cases passed
- No Critical/High bugs open
- All bugs documented
- Test execution report signed
### 3.5. RTM - Requirement Traceability Matrix
**RTM** là bảng map giữa Requirements và Test Cases. Đảm bảo:
- Mọi requirement đều có test case cover
- Mọi test case đều trace về requirement
- Identify gap, redundancy
| Req ID | Description | Test Case IDs | Status |
| --- | --- | --- | --- |
| REQ-001 | User login với email/password | TC-001, TC-002, TC-003 | Pass |
| REQ-002 | Reset password qua email | TC-004, TC-005 | Pass |
| REQ-003 | 2FA authentication | TC-006, TC-007, TC-008 | Fail |
| REQ-004 | Logout | TC-009 | Pass |
Chương 4
## Test Levels - Các Cấp Độ Kiểm Thử
Có 4 cấp độ testing theo thứ tự từ nhỏ đến lớn. Mỗi cấp test một phần khác nhau của hệ thống.
### 4.1. Testing Pyramid - Kim tự tháp Testing
🎨 UI / E2E Tests (10%) - Slow, Expensive
🔗 Integration Tests (20%)
🧩 Component Tests (30%)
⚙️ Unit Tests (40%+) - Fast, Cheap
**Nguyên tắc:** Càng xuống dưới càng nhiều test (fast, cheap). Càng lên trên càng ít test (slow, expensive). Anti-pattern: "Ice Cream Cone" - nhiều UI test, ít unit test → maintenance hell.
### 4.2. Unit Testing
Test **đơn vị nhỏ nhất** của code - thường là 1 function/method.
#### 🎯 Đặc điểm
- Do **Developer** viết & chạy
- Cô lập, không có dependencies (mock)
- Chạy NHANH (millisecond)
- White box - thấy code
- Frameworks: JUnit, NUnit, pytest, Jest
#### 📝 Ví dụ
// JavaScript Jest
function add(a, b) {
return a + b;
}
test('adds 1 + 2 = 3', () => {
expect(add(1, 2)).toBe(3);
});
test('add 0', () => {
expect(add(0, 5)).toBe(5);
});
### 4.3. Integration Testing
Test khi **kết hợp** nhiều unit/module. Kiểm tra interaction.
#### 🎯 Đặc điểm
- Test interaction giữa modules
- Database integration
- API integration
- Có thể có dependencies thật
#### 📊 Approaches
- **Big Bang:** Test tất cả cùng lúc. Khó debug.
- **Top-Down:** Test module cao trước, stub cho module thấp.
- **Bottom-Up:** Test module thấp trước, dùng driver.
- **Sandwich:** Combine top-down + bottom-up.
> **🤔 Stub vs Driver?**
>
> 
**Stub:** Module giả để thay thế module CHƯA xong (caller gọi nó).**
Driver:** Module giả để gọi module cần test (caller).**
Ví dụ: Test module A gọi B (chưa xong) → tạo Stub B. Test module B nhưng A chưa xong → tạo Driver A.
### 4.4. System Testing
Test toàn bộ hệ thống** đã tích hợp xong. End-to-end.
#### 🌐 Bao gồm
- **Functional:** Mọi feature hoạt động đúng
- **Non-functional:** Performance, security, usability
- **End-to-End:** User flow từ đầu đến cuối
- **Regression:** Đảm bảo feature cũ không hỏng
Black box - không cần biết code bên trong.
### 4.5. Acceptance Testing
Test cuối cùng trước khi go-live. **Khách hàng / User** test.
#### 👤 UAT (User Acceptance)
End user test. Đảm bảo software meet business need.
#### 🏢 BAT (Business Acceptance)
Business owner test. Có ROI không?
#### 📜 Contract Acceptance
Test theo hợp đồng.
#### 🏛️ Regulation Acceptance
Tuân thủ luật pháp (banking, healthcare).
#### 🎯 Alpha Testing
Test bên trong công ty trước khi release.
#### 🌐 Beta Testing
Test với người dùng thật ngoài (limited).
Chương 5
## Test Types - Các Loại Kiểm Thử
Có 2 nhóm chính: **Functional** (chức năng) và **Non-Functional** (phi chức năng).
### 5.1. Functional Testing
Test *"WHAT does the system do"* - có làm đúng chức năng không?
#### 🚬 Smoke Testing
Test nhanh các chức năng chính. "Build có run không?"
*Ví dụ: Login work, homepage load, search work.*
**Khi nào:** Build mới deploy.
#### 🧪 Sanity Testing
Test nhanh sau bug fix. "Fix đã work chưa, có break gì không?"
*Subset của regression.*
**Khi nào:** Sau khi fix bug.
#### 🔄 Regression Testing
Test lại feature cũ sau khi có thay đổi.
**Mục tiêu:** Đảm bảo code mới không break code cũ.
**Tốt cho automation.**
#### 🔁 Re-testing
Test lại bug đã fix.
**Khác Regression:** Retest cùng test case, Regression test rộng hơn.
#### 🎯 Exploratory Testing
Test không có script - tester explore app, học, find bug bằng intuition.
**Pros:** Tìm bug bất ngờ.
**Cons:** Khó reproduce, khó measure.
#### 🐒 Monkey Testing
Random input, không có pattern. "Bấm linh tinh".
*Phù hợp tìm crash, edge cases.*
#### 🦍 Gorilla Testing
Test một module/feature ĐẾN CHẾT. Test mọi possible input.
#### 🎭 Ad-hoc Testing
Test ngẫu nhiên, không kế hoạch, không doc.
*Khác Exploratory: ad-hoc completely random.*
### 5.2. Non-Functional Testing
Test *"HOW WELL does the system work"* - hoạt động tốt thế nào?
#### ⚡ Performance Testing
Test tốc độ, response time, throughput.
**Tools:** JMeter, LoadRunner, K6, Gatling.
#### 📊 Load Testing
Test với số user EXPECTED (1000 user concurrent).
"Hệ thống chịu được load bình thường không?"
#### 💥 Stress Testing
Test với load CAO HƠN bình thường, đến khi BREAK.
"Đến đâu thì hệ thống sụp?"
#### 📈 Scalability Testing
Test khả năng mở rộng (thêm server, user).
#### ⏱️ Endurance / Soak Testing
Test thời gian dài (24h, 1 tuần). Tìm memory leak.
#### 🚀 Spike Testing
Test đột ngột tăng load (Black Friday traffic).
#### 🔒 Security Testing
Test vulnerabilities: SQL injection, XSS, CSRF.
**Tools:** OWASP ZAP, Burp Suite.
#### 👥 Usability Testing
UI/UX có thân thiện không? User có hoàn thành task không?
#### ♿ Accessibility Testing
Test cho người khuyết tật (screen reader, keyboard navigation).
WCAG 2.1 standard.
#### 🌐 Compatibility Testing
Test trên nhiều browsers, OS, devices, screen sizes.
#### 🔧 Maintainability
Dễ sửa, mở rộng không?
#### 📦 Portability
Chuyển sang env khác có dễ không?
### 5.3. Specialized Testing Types
#### 🌍 Localization (L10N)
Test phiên bản cho ngôn ngữ/quốc gia cụ thể: VN, JP, KR.
Test: ngôn ngữ, format ngày tháng, tiền tệ, văn hóa.
#### 🌎 Internationalization (I18N)
Test app có sẵn sàng cho mọi ngôn ngữ không?
Test: Unicode, RTL languages, encoding.
#### 🤝 Compatibility Testing
Cross-browser (Chrome, Firefox, Safari), Cross-OS (Win, Mac, Linux), Cross-device.
#### 🔧 Installation Testing
Test quá trình cài đặt, uninstall, upgrade.
#### ♻️ Recovery Testing
Test khả năng recover sau crash, network loss.
#### 📊 A/B Testing
Test 2 version cùng lúc, so sánh metric.
Chương 6
## Black Box vs White Box vs Gray Box
3 phương pháp tiếp cận testing dựa trên **mức độ thông tin về code**.
### 6.1. Black Box Testing
#### ⬛ Black Box - "Không thấy bên trong"
Tester KHÔNG cần biết code. Chỉ quan tâm Input → Output.
**Ai làm:** Manual Tester, QA Engineer
**Cần biết:** Requirements, expected behavior
**Cấp độ:** System, Acceptance Testing
#### Techniques chính
- Equivalence Partitioning
- Boundary Value Analysis
- Decision Table
- State Transition
- Use Case Testing
- Pairwise Testing
### 6.2. White Box Testing
#### ⬜ White Box - "Thấy hết code"
Tester biết code, test internal structure, logic.
**Ai làm:** Developer, SDET (Software Dev in Test)
**Cần biết:** Programming, code structure
**Cấp độ:** Unit, Integration
#### Techniques chính
- Statement Coverage
- Branch Coverage
- Path Coverage
- Condition Coverage
- Loop Testing
- Mutation Testing
### 6.3. Code Coverage Metrics
| Metric | Định nghĩa | Ví dụ |
| --- | --- | --- |
| Statement Coverage | % statement đã execute | 10/15 line = 67% |
| Branch Coverage | % nhánh (if/else, switch) đã test | 3/4 branch = 75% |
| Path Coverage | % path đã test (mọi combination) | 4/8 path = 50% |
| Condition Coverage | % điều kiện boolean đã test true & false | 5/6 condition = 83% |
// Code example
function checkAge(age) {
if (age >= 18) { // Branch 1
if (age >= 65) { // Branch 2
return "Senior";
}
return "Adult";
}
return "Minor"; // Branch 3
}
// Statement coverage 100%: cần test cases cho mọi line
// Branch coverage 100%: cần test 3 case (Minor, Adult, Senior)
// Path coverage 100%: cần test mọi đường (3 paths trong này)
### 6.4. Gray Box Testing
#### 🌫️ Gray Box - "Thấy một phần"
Combination của Black + White. Tester biết một phần code, system architecture.
- **Ai làm:** Mid-Senior QA, SDET
- **Cần biết:** Database schema, API specs, system flow
- **Phù hợp:** Integration testing, API testing, Security testing
**Ví dụ:** Test API - biết endpoint, request/response structure (white-ish), nhưng không quan tâm code implementation (black-ish).
### 6.5. Bảng so sánh
| | Black Box | White Box | Gray Box |
| --- | --- | --- | --- |
| Code knowledge | Không | Đầy đủ | Một phần |
| Người làm | QA Tester | Developer | QA Senior, SDET |
| Level | System, UAT | Unit, Integration | Integration, API |
| Time | Nhanh | Chậm | Trung bình |
| Cost | Thấp | Cao | Trung bình |
| Coverage | Functional | Logic, Code | Cả 2 partial |
Chương 7
## Manual Testing - Kiểm Thử Thủ Công
90% người mới vào nghề bắt đầu từ **Manual Testing**. Đây là foundation. Hiểu Manual giỏi rồi mới nên qua Automation.
### 7.1. Manual Testing là gì?
Tester thực hiện test cases **bằng tay**, không dùng automation. Click, gõ, observe, ghi kết quả.
#### ✅ Khi nào DÙNG Manual
- Exploratory testing
- UI/UX testing (cần con mắt người)
- Usability testing
- Ad-hoc testing
- Test mới (feature mới, chưa stable)
- Short-term project (không đáng automate)
- Visual testing nhiều
#### ❌ Khi nào KHÔNG nên Manual
- Regression testing (lặp lại liên tục)
- Load/Performance testing
- Test với big data
- Test repetitive (1000 input)
- CI/CD pipeline
### 7.2. Skills của Manual Tester
#### 🔍 Attention to Detail
Phát hiện 1 pixel sai, 1 ký tự thiếu.
#### 🧠 Critical Thinking
"Điều gì có thể sai?". Think like a hacker, like a stupid user.
#### 📝 Documentation
Viết bug report rõ ràng, reproducible.
#### 💬 Communication
Trao đổi với dev, BA, PM.
#### 🎯 Domain Knowledge
Hiểu business: banking, healthcare, e-commerce.
#### 🤔 Curiosity
"What if...?". Thử mọi thứ unusual.
### 7.3. Mindset của Tester giỏi
"A developer thinks of 5 ways to make something work. A good tester thinks of 50 ways to break it."
- **Destructive mindset:** Cố gắng PHÁ phần mềm
- **User empathy:** Nghĩ như user thực, không phải dev
- **Skepticism:** Đừng tin "It works on my machine"
- **Patience:** Repeat 100 lần để confirm bug
- **Persistence:** Đào sâu, không bỏ cuộc dễ dàng
### 7.4. Một ngày của Manual Tester
09:00 - Daily standup (15 min)
Update task tuần trước, plan hôm nay
09:30 - Check email, JIRA tickets new
Mới có bug Critical từ Prod cần check
10:00 - Smoke test build mới release
✓ Login pass
✓ Home page pass
✗ Checkout broken - log bug ngay!
11:00 - Test feature mới (Sprint backlog)
Execute 15 test cases - 12 pass, 3 fail
13:00 - Lunch break
14:00 - Retest 3 bug đã fix
2 pass, 1 still failing
15:00 - Meeting với BA về feature mới
Clarify edge cases
16:00 - Write test cases cho feature next sprint
17:30 - Update test execution report
Send daily summary
18:00 - Hết ca
### 7.5. Common Mistakes của Manual Tester mới
> **❌ Tránh**
>
> 
- **Test theo happy path only:** Chỉ test "đúng cách dùng", quên edge cases
- **Không document:** Tìm bug nhưng quên ghi lại
- **Bug report quá ít info:** "Login broken" - dev đoán mò
- **Không reproduce:** Tìm bug 1 lần, không thử lại
- **Quá tin dev:** "Dev nói fix rồi", không retest
- **Skip regression:** "Feature này không liên quan", thực ra liên quan
- **Không hỏi:** Requirement không rõ → đoán → test sai
Chương 8
## Test Case Design - Thiết Kế Test Case
**Test Case** là tài liệu mô tả *cách test một feature cụ thể*. Đây là sản phẩm chính của tester.
### 8.1. Cấu trúc Test Case chuẩn
TC-001: User Login với valid credentials
Test Case IDTC-001
ModuleAuthentication
TitleLogin thành công với email/password đúng
PriorityHigh
Test TypeFunctional, Smoke
Pre-conditions
1. User account đã tồn tại**
2. App đang chạy
3. User chưa login
Test Steps
1. Navigate to /login
2. Enter email: user@test.com
3. Enter password: Pass@123
4. Click Login button
Test Data
Email: user@test.com
Password: Pass@123
Expected Result
1. Login successful
2. Redirect to /dashboard
3. Username displayed at top-right
4. Welcome message shown
Actual Result[Fill during execution]
Status[Pass/Fail/Blocked]
Bug ID[If failed, link bug]
Tested ByNguyen Van A
Date2026-05-15
### 8.2. Đặc điểm Test Case tốt
#### ✅ Test case tốt
- Clear:** Anyone có thể đọc và execute
- **Concise:** Ngắn gọn, đến điểm
- **Specific:** Cụ thể, không mơ hồ
- **Repeatable:** Cùng input → cùng output
- **Independent:** Không phụ thuộc TC khác
- **Traceable:** Link đến requirement
- **Maintainable:** Dễ update
#### ❌ Test case tệ
- "Test login" - quá chung chung
- Steps mơ hồ: "Try various inputs"
- Expected result không rõ
- Phụ thuộc nhiều TC khác
- Không có precondition
- Quá dài (50+ steps)
- Test 5 thứ trong 1 TC
### 8.3. Các loại Test Cases theo Scenario
#### 😊 Positive Test Cases
Test với valid input. Expected: hệ thống work.
*Ví dụ: Login với đúng email/password → success*
#### 😟 Negative Test Cases
Test với invalid input. Expected: hệ thống handle gracefully.
*Ví dụ: Login với password sai → error message*
#### 🎯 Edge Cases
Test boundary, extreme values.
*Ví dụ: Password 1 char, 1000 char, empty*
#### 🌀 Corner Cases
Multiple edge cases cùng lúc.
*Ví dụ: Max length email + min length password + đặc biệt chars*
### 8.4. Ví dụ Test Cases cho Login feature
Một feature đơn giản như Login cần **20-50 test cases**:
#### 📋 Positive Cases (5-10)
- TC-001: Login valid email + valid password
- TC-002: Login với "Remember me" checked
- TC-003: Login from "Forgot password" flow
- TC-004: Login sau khi register
- TC-005: Login từ social (Google, Facebook)
#### 📋 Negative Cases (15-20)
- TC-006: Empty email + empty password
- TC-007: Empty email + valid password
- TC-008: Valid email + empty password
- TC-009: Invalid email format (no @)
- TC-010: Email không tồn tại trong DB
- TC-011: Wrong password
- TC-012: Password case-sensitive (Pass vs pass)
- TC-013: SQL injection attempt: ' OR 1=1 --
- TC-014: XSS attempt: <script>alert('x')</script>
- TC-015: Account đã bị lock
- TC-016: Account chưa verify email
- TC-017: 5 lần sai password → lockout
#### 📋 Edge Cases (10-15)
- TC-018: Email 256 ký tự (max length)
- TC-019: Email 1 ký tự
- TC-020: Password 1 ký tự, 1000 ký tự
- TC-021: Email với leading/trailing spaces
- TC-022: Email Unicode: 用户@example.com
- TC-023: Password đặc biệt: `!@#$%^&*`
- TC-024: Login concurrent (2 device cùng lúc)
- TC-025: Session timeout
#### 📋 UI/UX Cases (5-10)
- TC-026: Password masked với asterisk
- TC-027: Show/hide password toggle work
- TC-028: Tab order Email → Password → Login
- TC-029: Enter key submit form
- TC-030: Loading spinner show khi submit
- TC-031: Error message clear khi user gõ lại
### 8.5. Test Case Review Process
#### Self-review
Tester re-read test case trước khi submit.
#### Peer Review
Tester khác review.
#### BA / Lead Review
BA check business logic. Lead check structure.
#### Dev Review (optional)
Dev có thể spot missing edge cases.
#### Approval
Sign off, ready to execute.
Chương 9
## Test Design Techniques
Không thể test mọi combination. Đây là **techniques chuẩn ISTQB** để chọn test cases hiệu quả.
### 9.1. Equivalence Partitioning (EP)
Chia input thành các **nhóm tương đương** - mỗi nhóm chỉ cần test 1 đại diện.
#### 🎯 Ví dụ: Test tuổi từ 0-120
Nếu test mọi tuổi → 121 test cases. Dùng EP:
- **Partition 1 (Invalid):** < 0 → Test với -1
- **Partition 2 (Child):** 0-17 → Test với 10
- **Partition 3 (Adult):** 18-64 → Test với 30
- **Partition 4 (Senior):** 65-120 → Test với 80
- **Partition 5 (Invalid):** > 120 → Test với 121
5 test cases thay vì 121. Coverage tương đương.
### 9.2. Boundary Value Analysis (BVA)
Bug thường ở **biên giới**. Test min, max, min-1, max+1, min+1, max-1.
#### 🎯 Ví dụ: Password 8-20 ký tự
| Test | Length | Expected |
| --- | --- | --- |
| Below min | 7 chars | Reject |
| Min | 8 chars | Accept |
| Min+1 | 9 chars | Accept |
| Max-1 | 19 chars | Accept |
| Max | 20 chars | Accept |
| Above max | 21 chars | Reject |
> **💡 EP + BVA kết hợp**
>
> 
EP và BVA luôn được dùng cùng nhau. EP chọn nhóm, BVA test biên của mỗi nhóm. Đây là 2 technique cơ bản nhất - phải master.
### 9.3. Decision Table Testing
Khi có nhiều condition combine, dùng **Decision Table** để cover mọi case.
#### 🎯 Ví dụ: Bảo hiểm xe theo tuổi & có lái xe an toàn
| Conditions | R1 | R2 | R3 | R4 |
| --- | --- | --- | --- | --- |
| Age ≥ 25 | T | T | F | F |
| Clean record | T | F | T | F |
| Actions: | | | | |
| Discount | 20% | 10% | 5% | 0% |
| Approval | Auto | Auto | Manual | Reject |
4 rules → 4 test cases. Mọi combination được cover.
### 9.4. State Transition Testing
Test khi hệ thống có **states** (trạng thái) và transitions giữa chúng.
#### 🎯 Ví dụ: Login với 3 lần sai password
States:
- S1: Initial (chưa login attempt)
- S2: After 1st wrong
- S3: After 2nd wrong
- S4: Locked (sau 3 lần sai)
- S5: Logged in
Transitions test:
- S1 → S5 (login đúng ngay)
- S1 → S2 → S3 → S4 (sai 3 lần)
- S2 → S5 (đúng sau 1 lần sai)
- S4 → S4 (login khi đã lock)
### 9.5. Use Case Testing
Test theo **user scenario** end-to-end thực tế.
#### 🎯 Use Case: User mua hàng online
- Browse products
- Add to cart
- Update quantity
- Apply coupon
- Checkout
- Enter shipping info
- Choose payment
- Confirm order
- Receive email confirmation
Mỗi step có alternative flows (coupon invalid, payment fail, address invalid...). Test main flow + alternative flows.
### 9.6. Pairwise Testing (All-Pairs)
Khi có nhiều variables, mỗi variable có nhiều values, test mọi PAIR thay vì mọi combination.
#### 🎯 Ví dụ: Test 3 browsers × 3 OS × 3 screen sizes
**Full combination:** 3 × 3 × 3 = 27 test cases
**Pairwise:** Cover mọi pair → chỉ cần 9 test cases
**Coverage:** Phát hiện 65-85% bugs với 1/3 effort.
**Tools:** PICT (Microsoft), AllPairs.
### 9.7. Error Guessing
Dựa trên **kinh nghiệm**, đoán bugs có thể có.
- Empty inputs (NULL, "", undefined)
- Số 0, số âm
- Maximum/minimum values
- Special characters: `'`, `"`, `<`, `>`
- SQL injection, XSS
- Network slow/lost
- Browser back button
- Refresh during operation
- Double-click
- Timezone differences
### 9.8. Tổng kết Techniques
| Technique | Khi nào dùng |
| --- | --- |
| Equivalence Partitioning | Input range, categories |
| Boundary Value Analysis | Min/max boundary |
| Decision Table | Multiple conditions combine |
| State Transition | Hệ thống có states |
| Use Case | End-to-end scenarios |
| Pairwise | Combinatorial explosion |
| Error Guessing | Bổ sung experience-based |
Chương 10
## Test Documentation
Tester chuyên nghiệp **document everything**. Đây là deliverables chính của QA.
### 10.1. Các loại Test Documents
#### 📋 Test Strategy
High-level approach cho toàn project. Long-term.
Viết bởi: QA Manager / Lead
Update: Hiếm
#### 📝 Test Plan
Detailed plan cho 1 release/sprint.
Viết bởi: Test Lead
Update: Mỗi release
#### 📊 RTM
Mapping requirement ↔ test case.
#### ✅ Test Cases
Detail steps test.
#### 🐛 Bug Report
Document defects.
#### 📈 Test Execution Report
Status execution daily/weekly.
#### 🏁 Test Closure Report
Summary cuối release.
#### 📚 Test Metrics
Numbers: pass rate, bug rate, coverage.
### 10.2. Test Plan Template
#### 📄 IEEE 829 Test Plan Structure
- **Test Plan Identifier:** Unique ID
- **Introduction:** Brief overview
- **Test Items:** What to test (modules, features)
- **Features to be Tested:** List in-scope
- **Features NOT to be Tested:** List out-of-scope
- **Approach:** Strategy (manual/auto, levels, types)
- **Pass/Fail Criteria:** When test passes/fails
- **Suspension/Resumption Criteria:** When to stop, when to continue
- **Test Deliverables:** Documents output
- **Test Tasks:** Activities & timeline
- **Environmental Needs:** Hardware, software, network
- **Responsibilities:** Who does what
- **Staffing & Training:** Resources
- **Schedule:** Timeline với milestones
- **Risks & Contingencies:** Rủi ro + mitigation
- **Approvals:** Sign-off
### 10.3. Test Strategy vs Test Plan
| | Test Strategy | Test Plan |
| --- | --- | --- |
| Scope | Organization-wide | Project/release-specific |
| Level | High-level | Detailed |
| Frequency | 1 lần/năm | Mỗi release/sprint |
| Author | QA Director, CTO | Test Lead |
| Length | Short (5-10 pages) | Detailed (20-50 pages) |
### 10.4. Test Metrics quan trọng
#### 📊 Test Coverage
% requirement có test case
Coverage = (# TC executed / # TC total) × 100%
#### ✅ Pass Rate
% TC pass
Pass Rate = (# Pass / # Executed) × 100%
Target: ≥ 95%
#### 🐛 Defect Density
Số bug / KLOC (1000 lines of code)
Industry: 1-25 defects/KLOC
#### 🎯 Defect Removal Efficiency (DRE)
% bug tìm trước khi release
DRE = (Bugs in test / Total bugs) × 100%
Target: ≥ 85%
#### ⏱️ Mean Time Between Failures (MTBF)
Thời gian trung bình giữa 2 lỗi production
#### 🚀 Mean Time To Detect (MTTD)
Thời gian phát hiện bug
### 10.5. Test Summary Report
================================
TEST EXECUTION REPORT - Sprint 24
Release: v2.5.0 | Date: 2026-05-15
================================
TOTAL TEST CASES: 247
EXECUTED: 245 (99.2%)
Status:
✓ PASS: 223 (90.6%)
✗ FAIL: 18 (7.3%)
⏭ SKIPPED: 2 (0.8%)
🚫 BLOCKED: 4 (1.6%)
BUGS FOUND: 18
Critical: 1
High: 3
Medium: 8
Low: 6
BUGS FIXED: 14
BUGS OPEN: 4 (re-test pending)
ENVIRONMENT: Staging
BROWSERS: Chrome 120, Firefox 121, Edge 119
NOTES:
- All Critical bugs fixed before release
- 4 Open bugs are Low priority (UI cosmetic)
- Performance test: avg response 1.2s (target < 2s) ✓
================================
Chương 11
## Bug Reporting
**Bug Report** là sản phẩm quan trọng nhất của tester. Bug report tốt = developer fix nhanh. Bug report tệ = wasted time, ping-pong.
### 11.1. Anatomy of a Good Bug Report
#### 🐛 BUG-2024-1234: Login button không hoạt động trên Safari iOS
**Reporter:** Nguyen Van A (QA)
**Assignee:** Tran Van B (Dev)
**Date:** 2026-05-15 10:30
**Severity:** High
**Priority:** P1
**Status:** Open
**Environment:** iPhone 14 Pro, iOS 17.2, Safari 17, App v2.5.0
**Build:** staging-2024.05.15-rc1
**📝 Description:**
Login button không respond khi tap trên Safari iOS. User không thể đăng nhập từ mobile Safari.
**🔁 Steps to Reproduce:**
- Mở Safari trên iPhone
- Navigate to https://staging.example.com/login
- Enter valid email: test@example.com
- Enter valid password: Pass@123
- Tap "Login" button
**✅ Expected Result:**
Login thành công, redirect to /dashboard.
**❌ Actual Result:**
Button không respond. Không có loading. Không có error. User stuck on login page.
**📷 Attachments:**
- screenshot_login_page.png
- screen_recording.mp4 (15s)
- safari_console_log.txt
**💡 Additional Info:**
- Reproducible: 10/10 lần
- Test trên Chrome iOS: PASS
- Test trên Safari macOS: PASS
- Issue chỉ xuất hiện trên Safari iOS
- Console error: `Uncaught TypeError: undefined is not an object (evaluating 'navigator.userAgentData.brands')`
**🎯 Suspected Cause:**
Code dùng `navigator.userAgentData` - Safari iOS chưa support.
### 11.2. 7 Yếu tố BẮT BUỘC của Bug Report
#### Clear & Concise Title
Một câu mô tả ngắn bug. Ai đọc cũng hiểu ngay.**❌ "Bug login" / ✅ "Login button không respond trên Safari iOS"
#### Steps to Reproduce
Liệt kê chi tiết, người khác có thể làm theo và GẶP CÙNG bug.
#### Expected vs Actual Result
Phải có CẢ 2. So sánh rõ ràng.
#### Environment
OS, browser, device, app version, network.
#### Severity & Priority
Đánh giá ban đầu.
#### Attachments
Screenshot, video, logs - càng nhiều càng tốt.
#### Reproducibility
3/3, 5/10, 1/100? Dev cần biết.
### 11.3. Bug Life Cycle
[NEW] (vừa report)
↓
[ASSIGNED] (assign cho dev)
↓
[OPEN] (dev đang fix)
↓
[FIXED] (dev báo đã fix)
↓
[RETEST] (tester verify)
↓
├─→ [CLOSED] (verified, fix ok)
├─→ [REOPENED] (vẫn còn bug)
└─→ [DEFERRED] (fix sau)
Other statuses:
[DUPLICATE] - đã có bug tương tự
[REJECTED] - không phải bug
[CANNOT REPRODUCE] - dev không tái hiện được
[BY DESIGN] - feature, không phải bug
### 11.4. Common Mistakes trong Bug Reporting
> **❌ Tránh**
>
> 
- Title quá chung:** "Doesn't work" - dev không hiểu
- **Thiếu Steps:** Dev phải đoán cách reproduce
- **Thiếu Environment:** Bug đặc thù browser/device không được note
- **Cảm xúc trong report:** "This is stupid, fix it!" - unprofessional
- **Multiple bugs trong 1 report:** Khó track, khó assign
- **Không attach screenshot:** "Bug visual nhưng không có hình"
- **Đoán nguyên nhân quá nhiều:** Đoán có thể, nhưng đừng claim. "Suspected" instead of "It's because..."
### 11.5. Tips viết Bug Report Pro
> **💡 Pro tips**
>
> 
- **Screenshot có markup:** Vẽ đỏ vào chỗ bug. Dùng Lightshot, Snagit.
- **Video screen recording:** Hơn 1000 chữ. Dùng Loom, OBS.
- **HAR file:** Chrome DevTools → Network → Save HAR. Dev xem được full request/response.
- **Console logs:** Copy console error.
- **Reproduce trên 2 environment:** Confirm không phải fluke.
- **Bisect issue:** Tìm build/commit mà bug xuất hiện đầu tiên.
- **Tag stakeholders:** @PM @TechLead cho Critical bugs.
Chương 12
## Test Management Tools
### 12.1. Bug Tracking Tools
#### 🎯 JIRA (Atlassian)
Industry standard. 90% công ty dùng.
- Workflow customizable
- Integration với mọi tool
- Roadmap, sprint planning
- Reports đa dạng
**Cost:** $7-12/user/month
#### 🦅 Bugzilla
Open source, free. Mozilla phát triển.
UI cũ nhưng functional. Dùng nhiều ở enterprise.
#### 🌟 Azure DevOps
Microsoft. Tích hợp với Azure cloud.
Mạnh cho .NET projects.
#### 🦁 Redmine
Open source. Phổ biến tại VN.
Plugin phong phú.
#### 💎 ClickUp
All-in-one project management.
Hot trong startups.
#### 📋 Linear
Modern, fast. Hot 2024-2026.
Trending trong tech companies.
### 12.2. Test Case Management
#### 🚂 TestRail
Industry standard cho test case management.
Integration với JIRA tốt.
**Cost:** $34/user/month
#### 🐱 qTest
Tricentis. Mạnh cho enterprise.
#### 🦊 Zephyr
JIRA plugin. Test cases trong JIRA.
#### 🚀 Xray
JIRA plugin. Competitor của Zephyr.
#### 📊 TestLink
Open source. Free.
#### 📝 Excel / Google Sheets
Vẫn dùng cho project nhỏ. Đừng coi thường.
### 12.3. Browser DevTools - Must Know
Mọi tester WEB phải master Chrome DevTools (F12):
#### 🛠️ Chrome DevTools Tabs
- **Elements:** Inspect HTML, CSS. Tìm element selector cho automation.
- **Console:** Xem JavaScript errors, run commands.
- **Network:** Xem API calls, response time, status code. Save HAR.
- **Performance:** Profile load time.
- **Application:** Cookies, localStorage, sessionStorage.
- **Lighthouse:** Audit performance, accessibility, SEO.
- **Device Mode:** Test responsive, mobile view.
- **Sources:** Debug JS với breakpoints.
### 12.4. API Testing Tools
#### 📮 Postman
Industry standard. Free + paid.
GUI, easy to learn. Collection sharing.
#### 🌪️ Bruno
Open source. Local-first.
Trending 2024-2026.
#### 🦋 Insomnia
Postman alternative. Cleaner UI.
#### 🌐 cURL
Command line. Power user tool.
#### ⚡ REST Assured
Java library cho API automation.
#### 📊 SoapUI
Cho SOAP/REST API.
### 12.5. Other Essential Tools
- **Screenshot:** Lightshot, Snagit, ShareX, Greenshot
- **Screen recording:** Loom, OBS, ScreenRec
- **Annotation:** Markup Hero, Skitch
- **Mind mapping:** XMind, Miro, MindMeister (cho test planning)
- **Wiki/Doc:** Confluence, Notion
- **Communication:** Slack, Microsoft Teams
- **Version control:** Git (mandatory cho automation)
- **SQL clients:** DBeaver, HeidiSQL, MySQL Workbench (cho database testing)
Chương 13
## Agile & Scrum Testing
90%+ project hiện đại theo Agile. Tester PHẢI hiểu Agile/Scrum để làm việc hiệu quả.
### 13.1. Agile Manifesto (2001)
"We are uncovering better ways of developing software by doing it and helping others do it.**
Through this work we have come to value:
Individuals and interactions** over processes and tools**
Working software** over comprehensive documentation**
Customer collaboration** over contract negotiation**
Responding to change** over following a plan"
### 13.2. Scrum Framework
#### 👥 Roles
- **Product Owner:** Quyết định WHAT
- **Scrum Master:** Facilitator, remove blockers
- **Development Team:** Devs + Testers + Designers
#### 📦 Artifacts
- **Product Backlog:** Master list features
- **Sprint Backlog:** Features cho sprint hiện tại
- **Increment:** Software working sau sprint
#### 📅 Events
- **Sprint Planning:** Plan sprint mới
- **Daily Standup:** 15 min daily sync
- **Sprint Review:** Demo cuối sprint
- **Retrospective:** Lessons learned
### 13.3. Sprint Lifecycle (2 tuần)
#### Day 1: Sprint Planning
Team commit user stories cho sprint. Tester estimate test effort.
#### Day 1-3: Story Refinement
Tester làm rõ acceptance criteria, viết draft test cases.
#### Day 4-9: Dev + Test Parallel
Dev code, Tester viết detailed test cases, test sub-task.
#### Day 8-10: Integration Test
Test integration features.
#### Day 10-13: Full Sprint Testing
System test, regression, exploratory.
#### Day 14: Sprint Review + Retro
Demo to PO, feedback. Retrospective.
### 13.4. User Story Format
#### 📜 Story Format
As a [type of user]
I want [some goal]
So that [some reason]
EXAMPLE:
As a registered user
I want to reset my password via email
So that I can regain access when I forget it
ACCEPTANCE CRITERIA:
✓ Click "Forgot password" link on login page
✓ Enter email, click Submit
✓ Receive email with reset link within 1 minute
✓ Reset link expires after 24 hours
✓ Reset link is single-use
✓ New password follows password policy
✓ Old sessions logged out after reset
### 13.5. Definition of Done (DoD)
**DoD** = checklist khi nào 1 story được coi là "DONE". Mọi team có DoD riêng.
- Code reviewed (peer review pass)
- Unit tests written & passing
- Code merged to develop branch
- Acceptance criteria met
- Manual test cases executed - all pass
- Regression test pass
- No critical/high bugs open
- Documentation updated
- Demo to PO completed
- PO approval received
### 13.6. QA Role trong Scrum
#### 📝 Planning Phase
- Story estimation (effort + risk)
- Identify test scenarios
- Question acceptance criteria
- Define edge cases
#### ⚙️ Development Phase
- Pair with dev for testability
- Write detailed test cases
- Prepare test data
- Setup test environment
#### 🧪 Testing Phase
- Execute test cases
- Log bugs
- Retest fixes
- Exploratory testing
#### 📊 Closure Phase
- Sign-off feature
- Update RTM
- Sprint demo participation
- Retrospective input
### 13.7. Test in Shift-Left Approach
> **🎯 Shift-Left Testing**
>
> 
Concept: **Test SỚM trong SDLC**, không chờ cuối. QA tham gia từ requirement phase.**
Benefits:**
- Phát hiện bug sớm → fix rẻ hơn 100x
- QA hiểu requirement sâu hơn
- Avoid surprises cuối sprint
- Better collaboration
Chương 14
## Automation Testing - Giới Thiệu
Automation = lương cao hơn 2x. Manual tester chuyển sang Automation là **career path phổ biến nhất**.
### 14.1. Manual vs Automation
| | Manual | Automation |
| --- | --- | --- |
| Initial cost | Thấp | Cao (setup framework) |
| Long-term cost | Cao (lặp lại) | Thấp (chạy nhiều lần) |
| Speed | Chậm (giờ) | Nhanh (phút) |
| Accuracy | Human error | Consistent |
| Coverage | Limited | Có thể rất rộng |
| UI/UX | Tốt (mắt người) | Kém |
| Exploratory | Tốt | Không phù hợp |
| Regression | Tệ (lặp lại) | Lý tưởng |
| Skills | Domain knowledge | Programming |
### 14.2. Khi nào nên Automate?
#### ✅ NÊN automate
- Regression test (lặp lại nhiều)
- Smoke test (mỗi build)
- Performance test
- API test
- Test với big data
- Cross-browser testing
- Repetitive test (1000 inputs)
- Long-term project (2+ năm)
#### ❌ KHÔNG nên automate
- Exploratory testing
- UI/UX testing
- Usability testing
- One-off tests
- Volatile features (đang thay đổi nhiều)
- Tests cần human judgment
- Short-term project (< 6 tháng)
- Visual testing complex
### 14.3. ROI của Automation
#### 📊 Tính ROI
**Automation worth it khi:**
- Test cases run ≥ 5 lần
- Feature stable (không đổi nhiều)
- Long-term project
**Ví dụ:**
- Manual: 1 test case = 5 phút × 20 lần/năm = 100 phút/năm
- Automation: 30 phút setup + 1 phút/lần × 20 lần = 50 phút/năm
- Saving: 50 phút/năm/test case
- 500 test cases → 25,000 phút = ~52 ngày saved/năm
### 14.4. Automation Pyramid Strategy
🎨 UI E2E (10%) - Selenium, Cypress, Playwright
🔗 Integration (20%) - Component tests
🌐 API (30%) - REST Assured, Postman, Pytest
⚙️ Unit (40%+) - JUnit, NUnit, Jest, pytest
### 14.5. Programming Languages cho Automation
#### ☕ Java
**Pros:** Mạnh, ecosystem khổng lồ (Selenium, REST Assured, TestNG).
**Cons:** Verbose, learning curve.
**Phổ biến VN:** #1
#### 🐍 Python
**Pros:** Dễ học, syntax clean, pytest amazing.
**Cons:** Slower runtime.
**Phổ biến VN:** #2, growing fast.
#### 🌐 JavaScript
**Pros:** Frontend dev hiểu ngay, Cypress + Playwright.
**Cons:** Async confusing for beginners.
**Phổ biến:** Web testing modern.
#### 🔷 C#
**Pros:** .NET ecosystem, Microsoft tools.
**Khi nào:** Project .NET
#### 💎 Ruby
**Pros:** Cucumber BDD nguyên thủy.
**Cons:** Đang giảm popularity.
#### 🦀 Rust / Go
Hiếm dùng cho testing.
### 14.6. Test Automation Framework Types
- **Linear Framework:** Record & Playback. Đơn giản, không scalable.
- **Modular Framework:** Code chia modules. Reusable.
- **Data-Driven:** Test cases tách khỏi data. Excel/CSV input.
- **Keyword-Driven:** Tester viết keywords (no code). Manager-friendly.
- **Hybrid:** Kết hợp các loại trên. Phổ biến nhất.
- **BDD (Behavior-Driven):** Cucumber/SpecFlow. Given-When-Then format.
- **Page Object Model (POM):** Best practice cho UI automation.
### 14.7. BDD - Behavior Driven Development
#### 🎯 Gherkin Syntax (Cucumber)
Feature: User Login
Scenario: Successful login with valid credentials
Given I am on the login page
When I enter "user@test.com" as email
And I enter "Pass@123" as password
And I click the Login button
Then I should be redirected to dashboard
And I should see "Welcome, John"
Scenario Outline: Login with invalid credentials
Given I am on the login page
When I enter "<email>" as email
And I enter "<password>" as password
And I click the Login button
Then I should see error "<message>"
Examples:
| email | password | message |
| wrong@test.com | Pass@123 | User not found |
| user@test.com | wrong | Invalid password |
| | Pass@123 | Email is required |
| user@test.com | | Password is required |
Business stakeholders đọc hiểu. Bridge giữa BA và Dev/QA.
Chương 15
## Selenium WebDriver
**Selenium** là tool automation web phổ biến nhất thế giới. 80%+ web automation dùng Selenium hoặc inspired by it.
### 15.1. Selenium Ecosystem
#### 🚗 Selenium WebDriver
Core. Điều khiển browser thật.
#### 🌐 Selenium Grid
Chạy test song song trên nhiều máy.
#### 📹 Selenium IDE
Record & playback (cho người mới).
### 15.2. Modern Alternatives (2026)
#### 🎭 Playwright (Microsoft)
HOT 2024-2026. Faster, better than Selenium.
Auto-wait, multiple browsers, network mocking.
#### 🌲 Cypress
Frontend dev love. JS only. Excellent DX.
Time-travel debugging.
#### 🥚 WebdriverIO
Node.js wrapper for Selenium.
#### 🐶 Puppeteer (Google)
Chrome only. Web scraping mạnh.
#### 🌪️ TestCafe
No WebDriver needed. JS/TS.
#### 🦄 Katalon Studio
Low-code. Cho non-programmers.
### 15.3. Selenium WebDriver - Code Example
// Java + Selenium + TestNG example
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;
public class LoginTest {
private WebDriver driver;
private WebDriverWait wait;
@BeforeMethod
public void setUp() {
driver = new ChromeDriver();
wait = new WebDriverWait(driver, Duration.ofSeconds(10));
driver.manage().window().maximize();
}
@Test
public void testSuccessfulLogin() {
// Navigate
driver.get("https://example.com/login");
// Find elements & interact
WebElement emailField = driver.findElement(By.id("email"));
WebElement passwordField = driver.findElement(By.id("password"));
WebElement loginButton = driver.findElement(By.cssSelector("button[type='submit']"));
emailField.sendKeys("user@test.com");
passwordField.sendKeys("Pass@123");
loginButton.click();
// Wait & assert
wait.until(ExpectedConditions.urlContains("/dashboard"));
WebElement welcome = driver.findElement(By.className("welcome-msg"));
Assert.assertEquals(driver.getCurrentUrl(), "https://example.com/dashboard");
Assert.assertTrue(welcome.isDisplayed());
Assert.assertEquals(welcome.getText(), "Welcome, John");
}
@AfterMethod
public void tearDown() {
if (driver != null) {
driver.quit();
}
}
}
### 15.4. Selenium Locator Strategies
| Locator | Speed | Stability | Example |
| --- | --- | --- | --- |
| ID | ⚡⚡⚡ | ★★★ | By.id("login-btn") |
| Name | ⚡⚡⚡ | ★★★ | By.name("username") |
| Class Name | ⚡⚡ | ★★ | By.className("btn-primary") |
| CSS Selector | ⚡⚡⚡ | ★★★ | By.cssSelector("#login-form input[type='text']") |
| XPath | ⚡ | ★★ | By.xpath("//button[contains(text(), 'Login')]") |
| Link Text | ⚡⚡ | ★★ | By.linkText("Forgot password?") |
| Tag Name | ⚡⚡ | ★ | By.tagName("input") |
> **🎯 Best Practice**
>
> 
Priority: **ID > Name > CSS Selector > XPath**. ID nhanh nhất, stable nhất. XPath slow + brittle - dùng khi không có cách khác.
### 15.5. Page Object Model (POM)
**POM** = best practice. Tách locators & actions vào class riêng cho mỗi page.
// LoginPage.java
public class LoginPage {
private WebDriver driver;
// Locators
private By emailField = By.id("email");
private By passwordField = By.id("password");
private By loginButton = By.cssSelector("button[type='submit']");
private By errorMessage = By.className("error-msg");
public LoginPage(WebDriver driver) {
this.driver = driver;
}
// Actions
public void enterEmail(String email) {
driver.findElement(emailField).sendKeys(email);
}
public void enterPassword(String password) {
driver.findElement(passwordField).sendKeys(password);
}
public DashboardPage clickLogin() {
driver.findElement(loginButton).click();
return new DashboardPage(driver);
}
public String getErrorMessage() {
return driver.findElement(errorMessage).getText();
}
public DashboardPage login(String email, String password) {
enterEmail(email);
enterPassword(password);
return clickLogin();
}
}
// Test class - much cleaner!
@Test
public void testLogin() {
LoginPage loginPage = new LoginPage(driver);
DashboardPage dashboard = loginPage.login("user@test.com", "Pass@123");
Assert.assertTrue(dashboard.isDisplayed());
}
### 15.6. Common Selenium Pitfalls
> **❌ Tránh**
>
> 
- **Thread.sleep():** Hard wait. Tệ nhất. Dùng WebDriverWait instead.
- **Locator hard-coded trong test:** Dùng POM.
- **Không cleanup driver:** Browser zombie.
- **Test phụ thuộc nhau:** Mỗi test phải độc lập.
- **Selenium IDE for big project:** Record không scalable.
- **StaleElementException:** Element bị refresh, cần re-locate.
- **Test data hard-coded:** Dùng external file.
Chương 16
## API Testing
API testing là **kỹ năng must-have**. Modern app = frontend + backend qua API. API test fast, stable hơn UI test.
### 16.1. API là gì?
**API (Application Programming Interface)** = cách 2 hệ thống "nói chuyện" với nhau. RESTful API là phổ biến nhất.
### 16.2. HTTP Methods
| Method | Mục đích | Idempotent | Safe |
| --- | --- | --- | --- |
| GET | Đọc data | ✓ | ✓ |
| POST | Tạo mới | ✗ | ✗ |
| PUT | Update full | ✓ | ✗ |
| PATCH | Update partial | ✗ | ✗ |
| DELETE | Xóa | ✓ | ✗ |
### 16.3. HTTP Status Codes - Must Know
#### ✅ 2xx Success
- **200 OK** - GET success
- **201 Created** - POST success
- **204 No Content** - DELETE success
#### ↪️ 3xx Redirect
- **301 Moved Permanently**
- **302 Found (Temporary)**
- **304 Not Modified** - cached
#### ❌ 4xx Client Error
- **400 Bad Request** - invalid input
- **401 Unauthorized** - chưa login
- **403 Forbidden** - login but no permission
- **404 Not Found**
- **409 Conflict** - duplicate
- **422 Unprocessable Entity** - validation fail
- **429 Too Many Requests** - rate limit
#### 💥 5xx Server Error
- **500 Internal Server Error**
- **502 Bad Gateway**
- **503 Service Unavailable**
- **504 Gateway Timeout**
### 16.4. API Request/Response
// REQUEST
POST /api/v1/users
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
{
"email": "user@test.com",
"password": "Pass@123",
"name": "John Doe",
"age": 25
}
// RESPONSE
HTTP/1.1 201 Created
Content-Type: application/json
Date: Thu, 15 May 2026 10:30:00 GMT
{
"id": "usr_abc123",
"email": "user@test.com",
"name": "John Doe",
"age": 25,
"createdAt": "2026-05-15T10:30:00Z"
}
### 16.5. Postman - Tool số 1
#### What to test cho mỗi API endpoint:
#### 📋 Checklist API Testing
- **Status code:** Đúng 200/201/etc?
- **Response body:** Schema đúng? Data đúng?
- **Response headers:** Content-Type, etc.
- **Response time:** < 2 giây?
- **Authentication:** Token required? Expired token?
- **Authorization:** Permission level?
- **Validation:** Required fields, format, length?
- **Edge cases:** Null, empty, max value, special chars?
- **Error handling:** Error messages clear?
- **Rate limiting:** 429 sau quá nhiều request?
- **Idempotency:** GET/PUT/DELETE gọi nhiều lần OK?
- **Pagination:** Limit, offset, page work?
### 16.6. Postman Test Script
// Postman Tests tab - JavaScript
// 1. Status code
pm.test("Status code is 200", function () {
pm.response.to.have.status(200);
});
// 2. Response time
pm.test("Response time below 2000ms", function () {
pm.expect(pm.response.responseTime).to.be.below(2000);
});
// 3. Schema validation
pm.test("Response has required fields", function () {
const json = pm.response.json();
pm.expect(json).to.have.property("id");
pm.expect(json).to.have.property("email");
pm.expect(json).to.have.property("name");
});
// 4. Value validation
pm.test("Email is correct", function () {
const json = pm.response.json();
pm.expect(json.email).to.eql("user@test.com");
});
// 5. Header check
pm.test("Content-Type is JSON", function () {
pm.response.to.have.header("Content-Type", "application/json; charset=utf-8");
});
// 6. Save to variable for next request
pm.test("Save user ID", function () {
const json = pm.response.json();
pm.environment.set("user_id", json.id);
});
### 16.7. API Test Automation - REST Assured (Java)
// REST Assured - Java
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.testng.annotations.Test;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
public class UserApiTest {
@Test
public void testCreateUser() {
String requestBody = "{"
+ "\"email\":\"user@test.com\","
+ "\"password\":\"Pass@123\","
+ "\"name\":\"John Doe\""
+ "}";
given()
.baseUri("https://api.example.com")
.header("Authorization", "Bearer " + getToken())
.contentType(ContentType.JSON)
.body(requestBody)
.when()
.post("/api/v1/users")
.then()
.statusCode(201)
.time(lessThan(2000L))
.body("id", notNullValue())
.body("email", equalTo("user@test.com"))
.body("name", equalTo("John Doe"));
}
@Test
public void testGetUser() {
given()
.baseUri("https://api.example.com")
.header("Authorization", "Bearer " + getToken())
.pathParam("userId", "usr_abc123")
.when()
.get("/api/v1/users/{userId}")
.then()
.statusCode(200)
.body("id", equalTo("usr_abc123"));
}
}
### 16.8. API Testing Best Practices
- **Test API trước UI:** API test nhanh hơn 10x
- **Independent tests:** Mỗi test setup data riêng, không share state
- **Use environments:** Dev, staging, prod - khác config
- **Mock external APIs:** Không phụ thuộc 3rd party
- **Contract testing:** Pact, OpenAPI/Swagger validation
- **Performance test API:** JMeter, K6
- **Security:** Test SQL injection, XSS qua API
- **Document collections:** Share Postman collection với team
Chương 17
## Performance Testing
Performance test = đảm bảo app **NHANH, ỔN ĐỊNH, SCALABLE**. Đây là specialized field - lương cao.
### 17.1. Loại Performance Test
| Loại | Mục đích | Khi nào |
| --- | --- | --- |
| Load Test | Test với expected load | Trước release |
| Stress Test | Test đến break point | Capacity planning |
| Spike Test | Test sudden traffic surge | Sale events, Black Friday |
| Endurance/Soak | Test thời gian dài (24h+) | Memory leak detection |
| Volume Test | Test với big data | Database scale |
| Scalability | Test khả năng mở rộng | Cloud scaling |
### 17.2. Metrics quan trọng
#### ⏱️ Response Time
Thời gian từ request → response.
- **Average:** Trung bình
- **P50 (median):** 50% requests dưới
- **P95:** 95% requests dưới
- **P99:** 99% requests dưới (worst case)
Target: P95 < 2s
#### 🔄 Throughput
Số requests/giây (RPS) hoặc transactions/giây (TPS).
Cao = tốt.
#### ❌ Error Rate
% requests fail (5xx, timeout).
Target: < 0.1%
#### 👥 Concurrent Users
Số user simultaneous app handle được.
#### 💻 CPU Usage
% CPU server.
Healthy: < 70%
#### 💾 Memory Usage
RAM usage.
Watch for memory leak.
### 17.3. Apache JMeter - Tool phổ biến nhất
#### 🚀 JMeter Setup Test
- **Thread Group:** Define users (10 users, ramp up 10s, loop 100 times)
- **HTTP Request:** Define URL, method, params
- **Listeners:** View Results Tree, Aggregate Report, Graph
- **Assertions:** Check response (status code, content)
- **Timers:** Add delay between requests
- **Run:** Execute test, analyze results
### 17.4. K6 - Modern Performance Tool
// K6 - JavaScript based
import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
stages: [
{ duration: '30s', target: 100 }, // Ramp up to 100 users
{ duration: '1m', target: 100 }, // Stay at 100 users
{ duration: '30s', target: 0 }, // Ramp down to 0
],
thresholds: {
http_req_duration: ['p(95)<2000'], // 95% under 2s
http_req_failed: ['rate<0.01'], // Error rate < 1%
},
};
export default function () {
const res = http.get('https://api.example.com/users');
check(res, {
'status is 200': (r) => r.status === 200,
'response time < 1s': (r) => r.timings.duration < 1000,
});
sleep(1);
}
### 17.5. Bottleneck Identification
- **Database:** Slow queries, missing indexes
- **Network:** Bandwidth, latency, geo-distance
- **CPU:** Insufficient compute
- **Memory:** Leak, garbage collection
- **I/O:** Disk read/write slow
- **Code:** N+1 queries, inefficient algorithms
- **Caching:** Not enough cache hits
### 17.6. Real World Performance Numbers
> **⚡ Industry Benchmarks**
>
> 
- **Google search:** Avg response 0.2s
- **Amazon:** Every 100ms delay = -1% sales = $1.6B/year
- **User patience:** 53% bỏ trang nếu > 3s loading
- **Mobile:** < 2s ideal, < 4s acceptable
- **API:** < 500ms ideal, < 1s acceptable
- **Database query:** < 100ms typical
Chương 18
## Security Testing
Security testing là **specialized career path** với mức lương cao nhất ngành QA.
### 18.1. OWASP Top 10 (2021) - Phải biết
- **Broken Access Control:** User truy cập data không được phép
- **Cryptographic Failures:** Data nhạy cảm không encrypt
- **Injection:** SQL, NoSQL, OS command injection
- **Insecure Design:** Flaw trong thiết kế
- **Security Misconfiguration:** Default password, debug mode on prod
- **Vulnerable Components:** Library cũ với CVE
- **Authentication Failures:** Weak password, session hijack
- **Data Integrity Failures:** Insecure deserialization
- **Logging Failures:** Không log security events
- **Server-Side Request Forgery (SSRF)**
### 18.2. Common Attacks & Cách Test
#### 💉 SQL Injection
Inject SQL qua input.
// Payload examples:
' OR '1'='1
admin' --
'; DROP TABLE users; --
' UNION SELECT * FROM users--
Test mọi input field.
#### 🎯 XSS (Cross-Site Scripting)
Inject JavaScript qua input.
// Payloads:
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
javascript:alert(1)
"><script>alert(1)</script>
#### 🔓 CSRF
Force user execute unwanted action.
Test CSRF token mỗi form quan trọng.
#### 🎭 Session Hijacking
Steal session cookie.
Test: HttpOnly, Secure, SameSite flags.
#### 🔑 Brute Force
Try passwords liên tục.
Test: rate limit, account lockout.
#### 📁 IDOR (Insecure Direct Object Reference)
Đổi URL param truy cập data khác.
Test: /user/123 → /user/124 (không phải mình)
### 18.3. Security Testing Checklist
#### 🔒 Authentication
- Password complexity enforced
- Password hashed (bcrypt, không MD5)
- Account lockout sau X attempts
- Session timeout
- Logout invalidate session server-side
- 2FA available cho sensitive accounts
#### 🛡️ Authorization
- Role-based access control (RBAC)
- User A không truy cập data của User B
- Admin endpoints protected
- JWT validation server-side
#### 🔐 Data Protection
- HTTPS (TLS 1.2+) cho mọi page
- Sensitive data encrypted at rest
- PII không leaked trong logs
- API responses không expose internal IDs unnecessarily
#### 📝 Input Validation
- Server-side validation (không chỉ client)
- Whitelist tốt hơn blacklist
- File upload: check type, size, content
- Parameterized queries (chống SQL injection)
### 18.4. Security Testing Tools
#### 🦁 OWASP ZAP
Free. Scan vulnerabilities web app.
#### 🐂 Burp Suite
Industry standard. Free + Pro $399/year.
#### 🦊 Metasploit
Penetration testing framework.
#### 🔍 Nmap
Network scanner.
#### 🐍 SQLMap
Automated SQL injection.
#### 🛡️ Snyk / Dependabot
Scan dependencies for CVE.
Chương 19
## Mobile Testing
Mobile testing có đặc thù riêng - phải hiểu cả iOS lẫn Android, network conditions, device diversity.
### 19.1. Native vs Hybrid vs Web App
#### 📱 Native App
Built cho specific platform (iOS Swift, Android Kotlin).
**Pros:** Performance, full features.
#### 🔀 Hybrid App
Web tech wrapped (React Native, Flutter, Ionic).
**Pros:** Cross-platform.
#### 🌐 Mobile Web
Website chạy trên mobile browser.
**Pros:** No install.
### 19.2. Mobile-Specific Testing Areas
#### 📱 Device Diversity
- iOS: iPhone SE → iPhone 15 Pro Max
- Android: 24,000+ device models
- Screen sizes: 4" → 12.9"
- OS versions: iOS 14+, Android 9+
#### 📶 Network Conditions
- WiFi (fast)
- 4G/5G
- 3G (slow)
- 2G/Edge (very slow)
- Offline mode
- Switching networks
#### 🔋 Battery & Performance
- Battery drain rate
- App startup time
- Memory usage (low RAM device)
- CPU usage
- Heat generation
#### 📲 Interruptions
- Phone calls during app
- SMS notification
- Battery low alert
- Push notification
- App switched to background
- Screen rotation
#### 📍 Permissions
- Location
- Camera
- Microphone
- Contacts
- Push notifications
- Permission denied scenarios
#### 👆 Gestures & Touch
- Tap, double tap
- Long press
- Swipe, pinch, zoom
- Multi-touch
### 19.3. Mobile Testing Tools
#### 🤖 Appium
Cross-platform automation. iOS + Android.
Industry standard mobile automation.
#### 🐉 Espresso
Native Android testing.
#### 🍎 XCUITest
Native iOS testing.
#### ☁️ BrowserStack / Sauce Labs
Cloud device farms. Real devices.
#### 📊 Firebase Test Lab
Google cloud testing.
#### 🧪 TestFlight (iOS) / Internal Track (Android)
Beta testing distribution.
### 19.4. Mobile Test Strategy
- **Real device + Emulator/Simulator combo:** Real cho final, emulator cho speed
- **Device coverage:** Top 5-10 devices của target market
- **OS coverage:** Latest + 2 versions trước
- **Field testing:** Test trong real environment (đi xe bus, thang máy)
- **Crash analytics:** Firebase Crashlytics, Sentry
Chương 20
## CI/CD & DevOps Cho Tester
Modern QA phải hiểu CI/CD. Automation test integrate vào pipeline = giá trị thực sự.
### 20.1. CI vs CD vs CD
#### 🔄 Continuous Integration
Developers merge code thường xuyên. Auto build + test.
#### 🚚 Continuous Delivery
Code luôn ready to deploy. Manual trigger.
#### 🚀 Continuous Deployment
Auto deploy sau khi test pass. No human.
### 20.2. CI/CD Pipeline Stages
#### Source
Code push to Git (GitHub, GitLab, Bitbucket).
#### Build
Compile code, install dependencies.
#### Unit Test
Run unit tests. Fast feedback.
#### Code Quality
SonarQube, ESLint, security scan.
#### Integration Test
Test components integration.
#### Deploy to Staging
Auto deploy to staging environment.
#### E2E Test
Run Selenium/Cypress tests.
#### Performance Test
Run load tests (smoke level).
#### Security Scan
OWASP ZAP, dependency check.
#### Deploy to Production
Manual approve or auto.
#### Smoke Test Prod
Validate production.
### 20.3. CI/CD Tools
#### 🐙 GitHub Actions
Free for public repos. Trending.
#### 🦊 GitLab CI
Integrated with GitLab.
#### 🏗️ Jenkins
Oldie but goldie. Most popular.
#### ⚪ CircleCI
Cloud CI/CD.
#### 🟢 Travis CI
Popular for open source.
#### 🔵 Azure DevOps
Microsoft ecosystem.
### 20.4. GitHub Actions Example
# .github/workflows/test.yml
name: Test Pipeline
on:
push:
branches: [ main, develop ]
pull_request:
branches: [ main ]
jobs:
test:
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v3
- name: Setup Java
uses: actions/setup-java@v3
with:
java-version: '17'
distribution: 'temurin'
- name: Build
run: mvn clean install -DskipTests
- name: Run Unit Tests
run: mvn test
- name: Run Selenium Tests
run: mvn verify -Pselenium
- name: Upload Test Reports
if: always()
uses: actions/upload-artifact@v3
with:
name: test-results
path: target/surefire-reports/
- name: SonarCloud Scan
run: mvn sonar:sonar
env:
SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
### 20.5. Containerization với Docker
Modern QA biết Docker để chạy test trong containers.
# Dockerfile cho test environment
FROM selenium/standalone-chrome:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "test"]
### 20.6. DevOps Skills cho QA
- **Git:** Branch, merge, pull request
- **Docker:** Containerize tests
- **Cloud:** AWS, GCP, Azure basics
- **Linux:** Bash, SSH
- **Monitoring:** Grafana, Datadog, New Relic
- **Logging:** ELK stack, Splunk
- **Infrastructure as Code:** Terraform basics
Chương 21
## AI Trong Testing - Tương Lai 2026+
AI đang thay đổi ngành QA. Tester KHÔNG biết AI sẽ bị thay thế trong 5 năm.
### 21.1. Cách AI giúp Tester
#### 📝 Generate Test Cases
ChatGPT/Claude tạo test cases từ requirement.
Tiết kiệm 50-70% time.
#### 🤖 Auto Bug Triage
AI phân loại bugs, suggest priority/severity.
#### 🔍 Visual Testing
Applitools, Percy - AI compare screenshots.
#### 🛡️ Self-Healing Tests
AI fix broken locators tự động (testim, Mabl).
#### 💡 Code Review
GitHub Copilot review test code.
#### 📊 Predictive Analysis
Predict bug locations dựa trên code changes.
### 21.2. AI-Powered Testing Tools
#### 🤖 Testim
AI-powered E2E. Self-healing locators.
#### 🎯 Mabl
Auto-heal, ML-based.
#### 👁️ Applitools
Visual AI testing.
#### 🔥 Functionize
Natural language tests.
#### 🌊 Tricentis Tosca
Model-based AI testing.
#### ⚡ Katalon Platform
AI features integrated.
### 21.3. Sử dụng ChatGPT / Claude cho Testing
#### 💬 Prompts hữu ích
- **Generate test cases:** "Generate test cases for login feature with email and password fields. Include positive, negative, edge, and security cases."
- **Boundary analysis:** "What are the boundary values to test for an age field accepting 18-120?"
- **Convert manual to automation:** "Convert this manual test case to Selenium Java code: [paste test case]"
- **Review test code:** "Review this Selenium code for best practices and bugs: [code]"
- **Bug analysis:** "Given this error log, what could be the root cause? [paste log]"
- **Test data generation:** "Generate 20 realistic Vietnamese names and addresses for testing."
### 21.4. Tester có bị AI replace không?
> **🤔 Sự thật**
>
> 
**AI sẽ KHÔNG thay thế tester, nhưng tester DÙNG AI sẽ thay thế tester KHÔNG DÙNG AI.****
AI làm tốt:** Repetitive tasks, generate test cases, regression automation.**
AI làm kém:** Critical thinking, exploratory testing, UX judgment, business context, stakeholder communication.**
Future tester:** Strategic, AI-powered, focus on quality engineering, không phải click button.
Chương 22
## ISTQB Certification
**ISTQB (International Software Testing Qualifications Board)** = chứng chỉ testing được công nhận quốc tế. Nhiều công ty yêu cầu, đặc biệt outsourcing.
### 22.1. ISTQB Roadmap
#### Foundation Level (CTFL)
Entry level. Tất cả tester nên có. 40 câu, 60 phút, pass 65%.
Chi phí: ~$200-300 USD
#### Agile Tester Extension
Cho Agile environment. Phổ biến.
#### Advanced Level
3 sub-certs: Test Manager, Test Analyst, Technical Test Analyst.
#### Specialist Level
Performance, Security, Mobile, Usability, AI Testing.
#### Expert Level
Top tier. Test Management, Improving Test Process.
### 22.2. ISTQB Foundation Syllabus
Foundation Level cover 6 chapters:
- **Fundamentals of Testing** (chapter 1-2 trong khóa này)
- **Testing Throughout the Software Lifecycle** (SDLC, STLC)
- **Static Testing** (review, static analysis)
- **Test Techniques** (EP, BVA, Decision Table...)
- **Test Management** (planning, monitoring, control)
- **Tool Support for Testing**
### 22.3. Cách Học & Thi
#### 📚 Resources
- **Official Syllabus (free):** istqb.org
- **Sample exam questions:** Free download
- **Book:** "Foundations of Software Testing" - Dorothy Graham
- **Online courses:** Udemy, LinkedIn Learning
- **Vietnam training:** VNPro, Saigon CTT
### 22.4. Có Đáng Học ISTQB?
#### ✅ Pros
- Standard vocabulary
- Pass HR filter
- Cần cho outsourcing project
- Lương cao hơn ~10-20%
- Cấu trúc học systematic
#### ❌ Cons
- Lý thuyết > thực hành
- Một số kiến thức outdated
- Đắt ($200+)
- Không dạy automation/programming
**Khuyến nghị:** Foundation đáng học (entry level). Advanced chỉ khi đã có 3+ năm kinh nghiệm.
### 22.5. Other Certifications
- **Certified Agile Tester (CAT):** Cho Agile
- **Certified Selenium Tester:** Specific tool
- **CSM (Certified Scrum Master):** Cho QA lead
- **AWS/Azure cert:** Cho cloud testing
- **CEH (Certified Ethical Hacker):** Security testing
- **OSCP:** Advanced security
Chương 23
## Career & Salary
### 23.1. QA Career Path
#### 🌱 Junior Manual Tester (0-2 năm)
- Execute test cases
- Log bugs
- Retest fixes
**VN:** 8-15tr | **US:** $50-70k
#### 🌿 Mid-level Tester (2-5 năm)
- Design test cases
- Mentor juniors
- Có thể automate basic
- Cross-functional collaboration
**VN:** 15-25tr | **US:** $70-95k
#### 🌳 Senior QA / Automation Engineer (5-8 năm)
- Lead test efforts
- Design test framework
- CI/CD integration
- API + UI automation
**VN:** 25-50tr | **US:** $95-140k
#### 🎯 QA Lead / Manager (8+ năm)
- Manage team
- Strategy, planning
- Hiring
- Stakeholder communication
**VN:** 50-100tr | **US:** $140-200k+
#### 🏆 Director of QA / VP Quality (10+ năm)
- Company-wide quality strategy
- Process improvement
- Multiple teams
**VN:** 80-200tr | **US:** $200-350k+
#### 🚀 SDET (Software Dev in Test)
- Build test infrastructure
- Code-heavy role
- Half dev, half QA
**VN:** 30-70tr | **US:** $120-180k
### 23.2. Specialized Career Paths
#### ⚡ Performance Tester
JMeter, K6, Gatling expert.
Cao hơn average ~20%.
#### 🔒 Security Tester / Pen Tester
OWASP, Burp Suite, Metasploit.
Lương cao nhất ngành QA.
#### 📱 Mobile QA
iOS/Android, Appium.
#### 🤖 AI/ML Test Engineer
Test ML models, data quality.
Hot trend 2024-2026.
#### ☁️ Cloud Test Engineer
AWS, Azure, GCP testing.
#### 📊 Test Data Engineer
Data quality, ETL testing.
### 23.3. Lộ trình từ Junior → Senior trong 5 năm
#### Năm 1: Foundation
Master manual testing. ISTQB Foundation. JIRA, Postman.
#### Năm 2: Automation Basics
Learn Java/Python. Selenium WebDriver. POM. Git.
#### Năm 3: Specialization
Pick: API automation, Performance, Security, hoặc Mobile. Deep dive.
#### Năm 4: CI/CD & DevOps
Jenkins/GitHub Actions. Docker. Cloud basics.
#### Năm 5: Leadership / Senior
Mentor others. Architecture test framework. Strategic thinking.
### 23.4. Tìm Việc QA tại Việt Nam
#### 🇻🇳 Top Companies VN
- FPT Software
- KMS Technology
- Saigon Technology
- NashTech
- Axon Active
- TMA Solutions
- VNG, Tiki, Shopee VN
- Grab, Lazada
- VNPay, MoMo
- Garena
#### 🌐 Job Sites
- TopCV, VietnamWorks
- ITviec.com (IT-specific)
- LinkedIn
- JobStreet
- Glassdoor
- Facebook groups: "QA/Tester Việt Nam"
### 23.5. Interview Questions Phổ Biến
#### ❓ Junior Level
- SDLC vs STLC?
- Severity vs Priority?
- Black/White/Gray box?
- Smoke vs Sanity?
- Test case mẫu cho login feature?
- Bug life cycle?
- Tốt nhất bug report cần gì?
#### ❓ Mid Level
- Test techniques khi nào dùng cái nào?
- Khi nào automate khi nào không?
- Page Object Model là gì?
- Wait strategies trong Selenium?
- Test API với Postman/REST Assured?
- How handle flaky tests?
#### ❓ Senior Level
- Design test framework from scratch?
- Test strategy cho microservices?
- CI/CD test integration?
- Test pyramid cho mobile app?
- How measure test effectiveness?
- Performance test strategy?
- Lead a team có conflict?
### 23.6. 10 Tips Thành Công
> **🏆 Success Mantras**
>
> 
- **Master Manual trước, rồi mới Automation.** Đừng vội học code.
- **Học programming sớm.** Python or Java - 6 tháng đủ basic.
- **Build portfolio:** GitHub với automation projects.
- **Contribute open source:** Selenium, Cypress test repos.
- **Networking:** LinkedIn, conferences, meetups.
- **Learn domain:** Banking, e-commerce, healthcare - chuyên 1 lĩnh vực.
- **Communication skills:** Quan trọng hơn technical đôi khi.
- **Stay current:** Theo dõi Ministry of Testing, dev.to, blogs.
- **Get certified:** ISTQB Foundation minimum.
- **Mindset:** Quality champion, không chỉ "bug finder".
### 23.7. Resources không thể bỏ qua
> **📚 Reading list**
>
> 
#### 📖 Books
- "Lessons Learned in Software Testing" - Cem Kaner
- "The Art of Software Testing" - Glenford Myers
- "Agile Testing" - Lisa Crispin & Janet Gregory
- "Foundations of Software Testing" - Dorothy Graham
- "How Google Tests Software" - James Whittaker
#### 🌐 Websites
- Ministry of Testing (ministryoftesting.com)
- Software Testing Help (softwaretestinghelp.com)
- Guru99
- Test Bash conferences
- dev.to / Medium - QA tags
#### 📺 YouTube Channels
- Automation Step by Step
- SDET-QA Automation Techie
- Naveen AutomationLabs
- Software Testing Academy
- Joe Colantonio (TestGuild)
Chương 24
## Bài Kiểm Tra Cuối Khóa
15 câu hỏi kiểm tra kiến thức QA Tester.
Câu 1: Sự khác biệt giữa Error, Defect, Failure?
A. Cùng nghĩa
B. Error = mistake của người; Defect = lỗi trong code; Failure = lỗi khi chạy
C. Error nhỏ hơn Defect, Defect nhỏ hơn Failure
D. Error trong test, Defect trong dev, Failure trong prod
Câu 2: Severity vs Priority - khác biệt chính?
A. Cùng nghĩa
B. Severity = impact lên hệ thống; Priority = thứ tự cần fix
C. Severity quyết định bởi dev, Priority bởi tester
D. Severity về UI, Priority về backend
Câu 3: Smoke testing là gì?
A. Test cách app xử lý khói
B. Test nhanh các chức năng chính - kiểm tra build có chạy không
C. Test khả năng chống khói
D. Test trong môi trường lửa khói
Câu 4: Boundary Value Analysis test giá trị nào?
A. Giữa khoảng (giữa min và max)
B. Min, Max, Min-1, Max+1 và các giá trị biên
C. Random values
D. Tất cả giá trị
Câu 5: HTTP Status code 401 có ý nghĩa gì?
A. Server error
B. Unauthorized - chưa authenticate
C. Not Found
D. Bad Request
Câu 6: Test Pyramid - test nào nên có NHIỀU NHẤT?
A. UI/E2E Test
B. Integration Test
C. Unit Test
D. Manual Test
Câu 7: Trong Agile, Definition of Done là gì?
A. Khi developer code xong
B. Checklist các điều kiện để 1 story coi là "DONE"
C. Khi tester finish test
D. Cuối sprint
Câu 8: Page Object Model (POM) là gì?
A. Cách design website
B. Pattern tách locators và actions vào class riêng cho mỗi page
C. Loại object trong JavaScript
D. Cấu trúc database
Câu 9: Regression vs Re-testing khác nhau?
A. Cùng nghĩa
B. Re-testing = test lại bug đã fix; Regression = test rộng hơn đảm bảo không break feature cũ
C. Regression chỉ manual, Re-testing chỉ automation
D. Re-testing rộng hơn Regression
Câu 10: Selenium locator nào FASTEST và STABLEST?
A. XPath
B. ID
C. Class Name
D. Tag Name
Câu 11: Load Testing vs Stress Testing?
A. Cùng nghĩa
B. Load = expected load; Stress = vượt expected đến break point
C. Load test code, Stress test database
D. Load test web, Stress test mobile
Câu 12: SQL Injection là loại tấn công gì?
A. Tấn công bằng DDoS
B. Inject SQL code qua input fields để access/modify database
C. Inject JavaScript
D. Tấn công vào server vật lý
Câu 13: 7 nguyên tắc của ISTQB - đâu là NGUYÊN TẮC?
A. Testing đảm bảo phần mềm không có bug
B. Testing chỉ ra defect, không chứng minh hoàn hảo
C. Exhaustive testing là khả thi
D. Testing chỉ làm khi code xong
Câu 14: Trong CI/CD pipeline, khi nào chạy Unit Test?
A. Cuối cùng
B. Sớm nhất - ngay sau build
C. Trước deploy
D. Chỉ chạy weekly
Câu 15: Career path lý tưởng cho QA mới?
A. Học automation ngay từ đầu
B. Master Manual trước, sau đó học programming + automation
C. Chỉ học theory, không cần practice
D. Tập trung vào ISTQB advanced ngay
> **🎓 Chúc mừng hoàn thành khóa học!**
>
> 
**Bạn vừa hoàn thành 24 chương QA Testing toàn diện.**
**Action items sau khóa học:**
- Tải Postman, làm 10 bài API test thực hành
- Apply ISTQB Foundation cert (chuẩn bị 1-2 tháng)
- Tạo GitHub portfolio với 1 Selenium project
- Học Java/Python basics (3-6 tháng)
- Tham gia Ministry of Testing community
- Apply Junior QA position
- Track bugs found trong daily work
- Theo dõi YouTube: Automation Step by Step, Naveen Automation
🐛
"Quality is everyone's responsibility,
but it's the tester's job to remind them."
🐛 Khóa Học QA Tester Toàn Diện | © 2026
"A test that passes 100% might be hiding bugs you haven't found yet."