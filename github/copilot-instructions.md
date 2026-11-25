# Hướng dẫn cho AI – Website quản lý thư viện (bản mẫu)

## Dự án
Website quản lý thư viện trường học: tra cứu, mượn, trả, gia hạn sách, thẻ thư viện, khoản phạt. Có 3 vai trò: bạn đọc (`bandoc`), thủ thư (`thuthu`), quản trị viên (`admin`).
Đây là **bản mẫu chạy trên trình duyệt**: dữ liệu giả, lưu bằng `localStorage`, chưa có backend.

## Công nghệ và giới hạn
- Dựa trên template Folio (Bootstrap 5.3 lưu sẵn trong `css/vendor` và `js/vendor`, JavaScript thuần, không jQuery). Giữ nguyên bố cục, class Bootstrap, CSS trong `css/style.css` và các biến màu, font ở `:root`.
- `js/main.js` là của template: chứa mảng `BOOKS` và hành vi giỏ hàng. Chỉ sửa khi được yêu cầu; dữ liệu nghiệp vụ lấy từ `Store`, không lấy từ `BOOKS`. Template vốn là hiệu sách nên cần chuyển nghĩa: giỏ hàng thành “Sách muốn mượn” (tối đa 5 cuốn), bỏ giá tiền, giao hàng, thanh toán.
- Chỉ dùng HTML, CSS, JavaScript thuần. Không thêm framework, không tải thư viện mới từ internet, không dùng npm.
- Không gọi API bên ngoài, không có máy chủ. Mọi dữ liệu đi qua `js/data.js` (dữ liệu mẫu) và `js/store.js` (đọc, ghi, đăng nhập).
- Không đọc hoặc ghi `localStorage` trực tiếp trong trang; luôn gọi `Store` và `Auth`.

## Thứ tự nạp script trong mỗi trang
`js/data.js` → `js/store.js` → `js/services.js` (logic nghiệp vụ) → `js/layout.js` (menu, chân trang) → script riêng của trang.

## Cấu trúc
- `js/services.js`: mọi hàm nghiệp vụ (tìm sách, yêu cầu mượn, duyệt, trả, gia hạn, tính phạt…). Mỗi hàm trả về `{ ok: true/false, msg: "thông báo tiếng Việt", data }`. Trang chỉ hiển thị kết quả, không tự tính nghiệp vụ.
- `js/layout.js`: vẽ thanh menu và chân trang dùng chung, menu thay đổi theo vai trò đang đăng nhập.
- Tên file trang: chữ thường, không dấu, nối bằng dấu gạch ngang (ví dụ `chi-tiet-sach.html`).

## Quy ước
- Toàn bộ giao diện và thông báo bằng tiếng Việt. Ngày hiển thị dd/mm/yyyy, tiền hiển thị `1.000đ`.
- Dùng đúng tên trạng thái trong `window.CONST` (data.js), không tự đặt tên khác.
- Quy tắc nghiệp vụ nằm ở `docs/quy-tac.md`. Đó là nguồn duy nhất; nếu có chỗ chưa rõ thì hỏi, đừng tự suy đoán.
- Danh sách trang và thành phần từng trang nằm ở `docs/trang-can-lam.md`.
- Mật khẩu trong dữ liệu mẫu là mật khẩu giả. Không dùng dữ liệu thật.

## Cách làm việc
1. Mỗi lần chỉ làm **một trang** (hoặc một nhóm nhỏ).
2. Trước khi sửa, nêu kế hoạch: file nào sẽ tạo hoặc sửa, và vì sao.
3. Không sửa file ngoài phạm vi yêu cầu, không xóa dữ liệu mẫu.
4. Sau khi xong, liệt kê file đã thay đổi và các bước tự kiểm tra bằng trình duyệt.
