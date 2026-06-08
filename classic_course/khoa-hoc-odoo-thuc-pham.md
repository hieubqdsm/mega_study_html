# 🏭 Odoo cho Sản Xuất Thực Phẩm & Tích Hợp Dây Chuyền

> Bản Markdown gọn. Phiên bản tương tác (Line Endpoint Generator, snippet, flashcards, quiz) ở `khoa-hoc-odoo-thuc-pham.html`. Khóa **chuyên ngành** nối tiếp [Làm chủ Odoo Framework](khoa-hoc-odoo-framework.md).

Áp dụng Odoo làm **ERP sản xuất thực phẩm đặc thù** + **tích hợp dây chuyền** (MES/IoT/PLC) ở quy mô lớn. Trọng tâm: kiến trúc & code phía Odoo.

## 💼 Community vs Enterprise
- **Community (có):** MRP (BoM, MO, work center), Lô/serial + hạn dùng + FEFO + traceability, External API.
- **Enterprise (cần trả phí):** Quality (HACCP), PLM (phiên bản công thức), Shop Floor/MES, IoT, Maintenance.
- Thay thế: module **OCA** hoặc tự phát triển. Công ty thực phẩm lớn tích hợp line gần như chắc chắn cần Enterprise.

---

# Phần 1 — Sản xuất (MRP)

## CH1. MRP & mô hình dữ liệu
- Model cốt lõi: `mrp.bom`/`mrp.bom.line`, `mrp.production` (MO), `mrp.workorder`, `mrp.workcenter`, `stock.move(.line)`, `stock.lot`.
- Luồng: BoM → MO → confirm (reserve) → work order → done (tiêu hao NVL theo FEFO, nhập thành phẩm + lô/hạn dùng).
- Mở rộng: `_inherit="mrp.production"` thêm field đặc thù (mã line, nhiệt độ mẻ...).

## CH2. BoM & công thức
- Đặc thù: by-product (phụ phẩm), scrap/hao hụt, BoM nhiều cấp (bán thành phẩm), phiên bản công thức (PLM/Enterprise).
- Mẻ biến thiên: BoM theo tỷ lệ trên 1 đơn vị → tạo MO số lượng khác, Odoo tự nhân định mức.
- Hay custom: điều chỉnh định mức theo QC nguyên liệu đầu vào (override `_get_moves_raw_values`/onchange).

## CH3. MO vòng đời & hook
- draft → confirmed → progress → to_close → done/cancel.
- Hook: override `button_mark_done` (luôn `super()`) để ghi nhận sản lượng/thông báo/đồng bộ.
- Ghi sản lượng từng phần từ line: cập nhật `qty_producing` rồi record; tần suất cao → xử lý async (ch12).
- ⚠️ Method MRP nhiều tác dụng phụ (stock move, lô) → super() + test kỹ.

## CH4. UoM & catch-weight
- Nhóm UoM cho quy đổi (kg/g/tấn). ⚠️ Bẫy làm tròn → đặt `rounding` hợp lý.
- Catch-weight (trọng lượng biến thiên, vd thùng cá): theo dõi số đơn vị + trọng lượng thực. Odoo lõi thiếu → OCA (`product_catch_weight`)/custom (chạm kho-mua-bán-kế toán).

---

# Phần 2 — Lô · Truy xuất · Chất lượng

## CH5. Lô & hạn sử dụng
- Bật tracking by Lots + Expiration Dates. `stock.lot`: `expiration_date`, `use_date`, `removal_date`, `alert_date`.
- Đặt "số ngày" trên product/category để tự tính mốc. Tự sinh lô + hạn dùng khi sản xuất (override `stock.lot.create`).
- Tem lô + hạn dùng theo **GS1**; in qua IoT (ZPL).

## CH6. FEFO & xuất kho
- Removal strategy (Location/Category): **FEFO** (hết hạn trước xuất trước — chuẩn thực phẩm), FIFO, LIFO, closest.
- Cảnh báo/chặn xuất hàng hết hạn: `@api.constrains` trên `stock.move.line`. Cân nhắc cảnh báo + quyền thay vì cấm tuyệt đối.

## CH7. Truy xuất & thu hồi (recall)
- Lô gắn ở mọi `stock.move.line` → truy xuất xuôi (lô NVL → mẻ/thành phẩm/khách) & ngược (thành phẩm → NVL/NCC).
- Báo cáo: Inventory → Reporting → Traceability. Tìm khách bị ảnh hưởng bằng search move outgoing theo lô.
- **EBR** (Electronic Batch Record): gom NVL+lô+QC+nhiệt độ+người vận hành thành hồ sơ lô ký số (custom giá trị cao).
- ⚠️ Truy xuất là yêu cầu pháp lý ("one step back/forward") — không để mất dấu lô.

## CH8. Chất lượng & HACCP
- Quality (Enterprise): `quality.point` (kiểm gì, ở đâu, kiểu gì), `quality.check` (kết quả), quality alert.
- Ánh xạ HACCP: CCP→control point; giới hạn tới hạn→ngưỡng measure; giám sát→check (tay/IoT); khắc phục→alert; hồ sơ→EBR.
- Tự tạo quality check từ cảm biến (vd nhiệt độ thanh trùng ≥72°C → pass/fail).
- Allergen/nhiễm chéo: field allergen + cảnh báo khi đổi mẻ trên cùng line (cần vệ sinh).

---

# Phần 3 — Tích hợp dây chuyền

## CH9. Shop Floor / MES (Enterprise)
- Giao diện tablet cho công nhân: start/pause/done work order, nhập sản lượng, QC, in tem — cập nhật MO realtime.
- Thiết kế để vừa nhận thao tác tay vừa nhận dữ liệu máy; tránh bắt nhập tay thứ máy đã đo.

## CH10. IoT Box & thiết bị (Enterprise)
- IoT Box (Raspberry Pi) cầu nối thiết bị ↔ Odoo: cân, máy in nhãn ZPL, scanner, cảm biến nhiệt/đo lường, camera/footswitch.
- Cold chain: cảm biến nhiệt đẩy log + cảnh báo vượt ngưỡng; tần suất cao → kiến trúc time-series riêng.

## CH11. Tích hợp PLC/SCADA
- **Ranh giới OT/IT**: PLC & mạng OT = kỹ sư tự động hóa; khóa dạy phía Odoo (IT). Gặp nhau ở **gateway**.
- Kiến trúc: `PLC/SCADA --(OPC-UA/Modbus/MQTT)--> Gateway --(REST/JSON-RPC)--> Odoo`.
- Vì sao cần gateway: phiên dịch giao thức, đệm tần suất cao, cách ly an ninh, retry khi Odoo offline.
- Gateway: Node-RED / service Python (asyncua, pymodbus) / MQTT broker / nền tảng IIoT.

## CH12. Dữ liệu realtime & async
- Nguyên tắc: **nhận nhanh** (lưu thô, trả ngay) → **xử lý nền** (queue_job, retry) → **idempotency** (chống trùng theo line_ref) → **batching**.
- Endpoint: `@http.route(type="json", auth=..., csrf=False)` → lưu bản ghi đệm → `with_delay().process()`.
- ⚠️ Đừng để PLC gọi create/write mỗi giây đồng bộ → khóa DB. Đệm ở gateway, gửi theo lô.
- Không có queue_job? Tối thiểu `ir.cron` quét bảng đệm.

## CH13. Báo cáo vận hành & OEE
- **OEE = Availability × Performance × Quality** (work center, từ log chạy/dừng + sản lượng + QC). Downtime nhập tay hoặc auto từ PLC.
- Báo cáo khối lượng lớn: `read_group` (gộp SQL) thay vì lặp Python.
- Dashboard realtime nặng: materialized view PostgreSQL / bảng tổng hợp qua cron.

---

# Phần 4 — Vận hành quy mô lớn

## CH14. Performance
- Nhà máy lớn = hàng chục–trăm nghìn stock move/ngày.
- Tối ưu: xử lý theo lô (`create([...])`/write 1 lần), queue_job, giao dịch ngắn, index, read_group, hạn chế computed store nặng, dọn bảng đệm, VACUUM, read replica cho báo cáo, nhiều worker (job/cron tách riêng).
- Đo trước khi tối ưu (log SQL chậm, profiling).

## CH15. Kiểm thử, audit & compliance
- Test TransactionCase cho logic SX/lô/truy xuất; test idempotency & kịch bản recall; chạy trên bản sao prod.
- Audit trail: `mail.thread` + `tracking=True`. Compliance (ISO 22000/BRC/FSSC/21 CFR Part 11): nhật ký không sửa, định danh người thao tác, e-signature/phê duyệt, truy xuất đầy đủ — thiết kế từ đầu.

## CH16. Deploy & migration an toàn
- Production-critical: ERP dừng → line có thể dừng.
- Quy trình: dev→staging(bản sao prod)→prod; test + migration trên bản sao; backup DB+filestore; nâng cấp giờ dừng line; rollback rõ ràng; HA (replica/failover).
- Migration scripts `migrations/<version>/`; version hóa qua git.
- **Gateway đệm** giúp line không mất dữ liệu khi Odoo bảo trì.

---

## 🧰 Snippet hay dùng
- Hook `button_mark_done` → tạo lô + đặt hạn dùng theo shelf life.
- Đẩy sản lượng line vào MO (idempotent qua line_ref).
- Cảnh báo allergen khi đổi mẻ trên cùng work center.

## 📋 Cheatsheet
```
Model: mrp.bom/mrp.production/mrp.workcenter/stock.lot/stock.move.line/quality.point
Chiến lược: removal=FEFO (Location/Category); tracking by Lots; bật Expiration Dates
Truy xuất: Inventory → Reporting → Traceability
Tích hợp: PLC --(OPC-UA/Modbus/MQTT)--> Gateway --(JSON-RPC)--> Odoo
  controller @http.route(type="json") → bản ghi đệm (idempotent) → with_delay().process() (queue_job)
  Nguyên tắc: nhận nhanh • xử lý nền • chống trùng • gom lô • đệm khi offline
```

---
*Khóa chuyên ngành mở rộng từ Làm chủ Odoo Framework. Tham khảo Odoo Developer Documentation & OCA. PLC/OT thuộc kỹ sư tự động hóa.*
