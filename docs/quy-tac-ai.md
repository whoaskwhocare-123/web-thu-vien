# Quy chuẩn chung AI và yêu cầu dự án Website Quản lý Thư viện

Tài liệu tổng hợp quy tắc bảo vệ code/giao diện, prompt nền AI và yêu cầu nghiệp vụ cốt lõi theo báo cáo đồ án Website Quản lý Thư viện. Mọi thành viên và AI cần đọc trước khi làm nhiệm vụ.

## 1. Mục tiêu và phạm vi
Website thư viện trường học hỗ trợ tra cứu tài nguyên, tài khoản bạn đọc, mượn-trả-gia hạn-đặt trước sách, quản lý kho, thông báo, vi phạm, báo cáo và quản trị.

Ba vai trò:
- **Bạn đọc:** tra cứu/xem sách, quản lý tài khoản và thẻ, yêu cầu mượn, theo dõi mượn, gia hạn, đặt trước, xem thông báo và vi phạm.
- **Thủ thư:** vận hành kho, xử lý yêu cầu, cấp/duyệt thẻ, mượn-trả, quản lý bạn đọc, thông báo, thống kê.
- **Quản trị viên:** quản lý tài khoản, vai trò/quyền, cấu hình, nội dung và giám sát hoạt động.

## 2. Công nghệ và kiến trúc định hướng
Theo báo cáo: Frontend HTML5/CSS3/JavaScript ES6; Fetch API; Backend Node.js/Express RESTful API (JSON); MySQL; JWT và phân quyền theo vai trò; VS Code, Git/GitHub; Figma/Draw.io.

Luôn kiểm tra code thực tế và cấu hình hiện có. Không tự ý thêm framework/thư viện hoặc đổi kiến trúc. Nếu repository mới chỉ có frontend/demo, không được giả định backend, API, email, thanh toán hay dữ liệu thật đã hoạt động. Nêu rõ mock/demo và phần cần tích hợp.

## 3. Yêu cầu nghiệp vụ cốt lõi

### 3.1 Tài khoản và thẻ bạn đọc
- Đăng ký tài khoản, kiểm tra thông tin, email theo tên miền trường (nếu cấu hình), email duy nhất, mật khẩu hợp lệ.
- Xác thực email/OTP và trạng thái kích hoạt theo thiết kế.
- Đăng nhập email/mật khẩu; Google chỉ dành cho bạn đọc nếu triển khai.
- Điều hướng và quyền theo vai trò; quản lý thông tin cá nhân, mật khẩu, trạng thái.
- Đăng ký thẻ online; thủ thư duyệt, cấp mã thẻ/QR, xác nhận nhận thẻ.
- Mỗi bạn đọc chỉ có một thẻ đang hiệu lực; vẫn lưu lịch sử thẻ cũ/cấp lại.

### 3.2 Tra cứu và chi tiết sách
- Tìm theo tên, tác giả, thể loại, nhà xuất bản, ISBN khi dữ liệu hỗ trợ.
- Lọc, hiển thị kết quả và trạng thái không tìm thấy.
- Chi tiết có tóm tắt, tác giả, nhà xuất bản, thể loại, ISBN, vị trí lưu trữ, trạng thái bản sao; tài liệu số có xem online nếu được hỗ trợ.
- Đây là website thư viện, không phải website thương mại: không dùng nghiệp vụ giá mua/bán; thao tác là mượn/đọc tài liệu.

### 3.3 Mượn sách
- Bạn đọc gửi yêu cầu; kiểm tra thẻ còn hạn, tài khoản không khóa, không nợ/vi phạm hoặc sách quá hạn, giới hạn số sách và tình trạng bản sao.
- Thủ thư duyệt/từ chối và ghi lý do.
- Yêu cầu được duyệt có hạn nhận sách; báo cáo nêu 48 giờ.
- Khi giao sách, xác nhận barcode, tạo giao dịch, cập nhật trạng thái bản sao và hạn trả theo cấu hình.
- Hỗ trợ mượn tại quầy: quét thẻ bạn đọc và mã sách, kiểm tra điều kiện rồi xác nhận.
- Số lượng tối đa và thời hạn mượn phải lấy từ cấu hình, không hard-code tùy tiện.

### 3.4 Trả sách và vi phạm
- Tiếp nhận/scan bản sách; ghi nhận tình trạng: tốt, hỏng nhẹ, hỏng nặng hoặc mất.
- Tính ngày quá hạn và tiền phạt theo cấu hình; cập nhật giao dịch, trạng thái bản sao và vi phạm.
- Báo cáo đề cập mức mặc định 2.000 VNĐ/cuốn/ngày; ưu tiên cấu hình và cần nhóm chốt.
- Báo cáo nêu khóa tài khoản khi đủ 3 lỗi; phải áp dụng theo quy định đã chốt.
- Nếu có người đặt trước, chuyển sang giữ sách và thông báo người đầu hàng đợi; nếu không, đưa về trạng thái sẵn sàng.

### 3.5 Gia hạn
- Gửi yêu cầu gia hạn sách đang mượn.
- Kiểm tra tài khoản/thẻ hợp lệ, không bị quá hạn/nợ cản trở, không có người đặt trước và chưa vượt số lần gia hạn.
- Mặc định báo cáo nêu tối đa 2 lần/cuốn; cập nhật hạn trả và lịch sử sau khi được xử lý.

### 3.6 Đặt trước
- Đặt trước khi sách đang được mượn và bạn đọc đủ điều kiện.
- Xếp hàng theo thứ tự; khi sách được trả, ưu tiên người đầu, thông báo và giữ trong thời hạn cấu hình.
- Nếu người nhận không đến hoặc hủy, chuyển lượt cho người kế tiếp; nếu hết hàng đợi, sách trở về sẵn sàng.

### 3.7 Thông báo và tin tức
- Thông báo yêu cầu mượn/trả/gia hạn/đặt trước, sách sắp hạn/quá hạn, thẻ và vi phạm.
- Tin tức/sự kiện, sách mới, thay đổi giờ mở cửa/bảo trì do người có quyền đăng.
- Email/SMS chỉ được xem là tích hợp thật khi có dịch vụ cấu hình; không giả vờ đã gửi.

### 3.8 Vi phạm và thanh toán
- Bạn đọc xem khoản phạt, nguyên nhân, số tiền và trạng thái.
- Có thể ghi nhận nộp tại quầy hoặc tích hợp QR/cổng thanh toán khi backend và dịch vụ sẵn sàng.
- Chỉ cập nhật đã thanh toán hoặc mở quyền mượn sau khi xác minh giao dịch thật; demo phải ghi rõ mô phỏng.

### 3.9 Thủ thư và quản trị
- Thủ thư: quản lý sách/đầu sách/bản sao, phân loại, tác giả/nhà xuất bản, bạn đọc, yêu cầu, mượn-trả-gia hạn, đặt trước, vi phạm, thông báo, kiểm kê.
- Quản trị: quản lý tài khoản, vai trò/quyền, cấu hình, nội dung, nhật ký, báo cáo và giám sát.
- Báo cáo định hướng gồm mượn-trả, sách quá hạn, tiền phạt, thống kê bạn đọc; xuất PDF/Excel nếu được xây dựng.
- Không tạo nút/tác vụ giả cho nhắc hạn, sao lưu, audit log hoặc các chức năng hệ thống.

## 4. Thông số định hướng trong báo cáo
Các giá trị là mặc định tham khảo; ưu tiên cấu hình và cần xác nhận nếu tài liệu mâu thuẫn:
- Tối đa 5 cuốn đang mượn.
- Thời hạn chuẩn 14 ngày (một phần báo cáo ghi khác; nhóm cần thống nhất).
- Gia hạn tối đa 2 lần/cuốn.
- Phạt quá hạn 2.000 VNĐ/cuốn/ngày.
- Nhắc hạn dự kiến chạy 08:00; báo cáo có các mốc nhắc khác nhau (1 ngày/3 ngày), cần chốt.
- Phí đăng ký thẻ 20.000 VNĐ theo báo cáo, thu khi nhận thẻ nếu nghiệp vụ được duyệt.
- Hạn nhận sách đặt trước theo cấu hình; yêu cầu mượn đã duyệt có mốc 48 giờ trong báo cáo.

Khi báo cáo mâu thuẫn/thiếu chi tiết, không tự suy đoán. Nêu điểm cần chốt, đề xuất phương án và hỏi người phụ trách.

## 5. Quy tắc bảo vệ code và giao diện gốc (bắt buộc)
1. **Không tự ý thay đổi giao diện gốc:** giữ bố cục, màu sắc, font, header, footer, sidebar, spacing và phong cách đã thống nhất. Chỉ đổi khi nhiệm vụ yêu cầu hoặc nhóm chấp thuận.
2. **Không ghi đè code người khác:** đọc và hiểu trước khi sửa; không xóa/viết lại toàn bộ file chỉ để làm tính năng nhỏ.
3. **Không sửa ngoài phạm vi:** chỉ chỉnh file/chức năng liên quan. Nếu cần sửa file dùng chung hoặc phần người khác, báo trước lý do và phạm vi.
4. **Không xóa chức năng hiện có:** chức năng cũ phải tiếp tục hoạt động.
5. **Không tự đổi tên file, thư mục, biến, hàm, ID, class, selector, API contract:** kiểm tra tham chiếu và xin thống nhất nếu cần.
6. **Không tự đổi công nghệ, framework, thư viện hoặc cấu trúc dự án.**
7. **Ưu tiên bổ sung/tái sử dụng:** tránh code, component, CSS hoặc dữ liệu trùng lặp.
8. **CSS có phạm vi:** tránh selector toàn cục như *, body, header, button, input gây ảnh hưởng trang khác; ưu tiên class/component cụ thể.
9. **Không tự thay schema/dữ liệu/API dùng chung:** rà soát nơi sử dụng và báo trước nếu có tác động.
10. **Không tự merge, push nhánh chung, xóa branch hoặc sửa branch người khác:** làm trên branch được giao, tích hợp qua Pull Request.
11. **Kiểm thử:** kiểm tra chức năng mới/cũ, desktop/mobile, đường dẫn, Console và luồng liên quan. Không tuyên bố đã test nếu chưa chạy.
12. **Thay đổi lớn phải xin xác nhận:** nếu viết lại, đổi kiến trúc, đổi UI chung hoặc sửa nhiều file ngoài phạm vi, dừng và nêu phương án/rủi ro/file ảnh hưởng.
13. **Không commit thông tin bí mật:** mật khẩu, token, API key, dữ liệu cá nhân thật; dùng dữ liệu mẫu ẩn danh.
14. **Không giả lập backend như thật:** ghi rõ mock/demo và những phần chưa tích hợp.

**Nguyên tắc cốt lõi:** Giữ phần đang hoạt động → bổ sung đúng nhiệm vụ → tránh ảnh hưởng phần người khác → kiểm tra trước bàn giao.

## 6. Quy trình AI làm việc
Trước khi code:
1. Đọc tài liệu này, README, quy tắc Git và tài liệu nghiệp vụ liên quan.
2. Kiểm tra branch, thay đổi chưa commit và file liên quan; không xóa thay đổi người dùng.
3. Phân tích nhiệm vụ, nêu kế hoạch.
4. Liệt kê file dự kiến tạo/sửa và nguy cơ ảnh hưởng.
5. Chờ xác nhận nếu thay đổi lớn hoặc ngoài phạm vi.

Sau khi code:
1. Liệt kê file tạo/sửa.
2. Nêu chức năng hoàn thành và cách kiểm tra.
3. Báo cáo test đã chạy thực tế và kết quả; nêu test chưa chạy.
4. Kiểm tra responsive, đường dẫn, Console và chức năng liên quan.
5. Nêu giới hạn/mock/backend cần tích hợp.
6. Không tự commit/merge/push nếu chưa được yêu cầu.

## 7. Prompt nền AI — copy dùng trước khi giao nhiệm vụ

Bạn là AI hỗ trợ phát triển dự án Website Quản lý Thư viện trường học.

Trước tiên hãy đọc docs/quy-tac-ai.md, README, tài liệu nghiệp vụ và code hiện tại có liên quan. Tuân thủ yêu cầu báo cáo, công nghệ, cấu trúc repository và quy tắc nhóm.

**Bảo vệ code và giao diện:** Không tự ý thay đổi giao diện gốc; không viết lại toàn bộ file; không ghi đè/xóa code hiện có hoặc của thành viên khác; không sửa ngoài phạm vi; không tự đổi cấu trúc, công nghệ, file, tên biến/hàm/ID/class, schema hay API contract; không làm hỏng chức năng cũ. Đọc code trước khi sửa, ưu tiên bổ sung/tái sử dụng. CSS phải giới hạn phạm vi, không gây ảnh hưởng toàn website.

Không tự merge, push nhánh chung hay xóa branch. Không commit secrets. Không giả lập backend/API/email/thanh toán như chức năng thật.

**Quy trình:** (1) phân tích yêu cầu; (2) kiểm tra code và branch; (3) trình bày kế hoạch, file dự kiến sửa/tạo, rủi ro; (4) chờ xác nhận nếu thay đổi lớn/ngoài phạm vi; (5) code đúng nhiệm vụ; (6) kiểm tra chức năng cũ/mới, responsive, đường dẫn, Console; (7) báo cáo file thay đổi, kết quả test thực tế, phần chưa làm và cách kiểm tra.

Nếu nghiệp vụ báo cáo mâu thuẫn/thiếu, không tự suy đoán; nêu vấn đề và hỏi người phụ trách. Tôi sẽ gửi nhiệm vụ cụ thể sau. Trước mắt hãy phân tích, chưa sửa code cho đến khi trình bày kế hoạch.

## 8. Checklist trước khi chấp nhận Pull Request
- [ ] Đúng nhiệm vụ, không sửa lan module.
- [ ] Không đổi giao diện gốc ngoài yêu cầu.
- [ ] Không xóa/ghi đè code cũ.
- [ ] Chức năng cũ vẫn hoạt động.
- [ ] Không thay đổi ngoài dự kiến về dependency/schema/API.
- [ ] Không chứa secret hoặc dữ liệu cá nhân thật.
- [ ] Kiểm tra desktop và mobile.
- [ ] Console không có lỗi nghiêm trọng.
- [ ] Có danh sách file thay đổi và hướng dẫn test.
- [ ] Nêu rõ mock/demo và phần chưa hoàn thành.
