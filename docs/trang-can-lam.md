# Danh sách trang cần làm

Mỗi dòng: tên file, lấy khung từ trang nào của template, thành phần chính, quy tắc áp dụng (mục trong `docs/quy-tac.md`). Làm theo thứ tự ưu tiên P0 → P4, mỗi lần một trang.

## Ghép Folio với nghiệp vụ thư viện
| Trong Folio | Dùng cho thư viện |
|---|---|
| Thanh thông báo trên cùng | Tin nhanh của thư viện |
| Giá sách mới (`index.html`) | Sách mới nhập |
| Ô thể loại | Thể loại sách |
| Sự kiện tác giả và đặt chỗ | Sự kiện thư viện |
| Giờ mở cửa và bản đồ | Giờ mở cửa thư viện |
| Danh mục có lọc, sắp xếp (`shop.html`) | Tìm kiếm sách |
| Chi tiết sách, sách liên quan (`book.html`) | Chi tiết sách, nút “Yêu cầu mượn” |
| Giỏ hàng bên cạnh | “Sách muốn mượn” (tối đa 5 cuốn) |
| Giá tiền, thanh toán, giao hàng, book club, bản tin | Bỏ hoặc đổi nghĩa |

## P0. Chuẩn bị chung
| Việc | Nội dung |
|---|---|
| Dọn template Folio | Đổi `lang="en"` thành `vi`; thay chữ tiếng Anh, tên “Folio & Fern”, thanh thông báo, logo, ảnh trong `img/`; bỏ phần bán sách (giá, giao hàng, thanh toán, bản tin, book club); giỏ hàng đổi thành “Sách muốn mượn” tối đa 5 cuốn; sửa các liên kết trống |
| `js/layout.js` | Tách navbar và footer thành đoạn dùng chung; menu đổi theo vai trò (khách, bạn đọc, thủ thư, admin); có nút Đăng nhập/Đăng xuất |
| `js/services.js` | Khung các hàm nghiệp vụ, mỗi hàm trả `{ok, msg, data}`; thêm dần theo từng trang |

## P1. Trang công khai (chưa cần đăng nhập)
| File | Lấy khung từ | Thành phần |
|---|---|---|
| `index.html` | `index.html` | Carousel giới thiệu, ô tìm kiếm, sách mới, tin tức mới |
| `tim-kiem.html` | `shop.html` | Ô tìm kiếm, bộ lọc thể loại và còn sách, danh sách thẻ sách, nút Xem chi tiết (mục 3) |
| `chi-tiet-sach.html` | `book.html` | Thông tin sách, trạng thái các bản, nút "Yêu cầu mượn" (cần đăng nhập), nút "Đọc online" nếu có tài liệu số (mục 3, 4) |
| `gioi-thieu.html`, `lien-he.html`, `tin-tuc.html` | khối Visit và Events của `index.html` | Nội dung thư viện, biểu mẫu liên hệ, danh sách thông báo từ `announcements` |
| `dang-nhap.html` | trang mới theo khung | Email, mật khẩu, Đăng nhập, Quên mật khẩu, Đăng nhập bằng Google (chỉ bạn đọc); lỗi theo mục 1 |
| `dang-ky.html` | trang mới | Họ tên, email, mật khẩu, xác nhận; lỗi tại từng ô; bước nhập mã kích hoạt (mã giả hiển thị trên trang) |
| `quen-mat-khau.html` | trang mới | Nhập email → nhập mã → đặt mật khẩu mới |

## P2. Bạn đọc (đã đăng nhập, vai trò `bandoc`)
| File | Thành phần |
|---|---|
| `dang-ky-the.html` | Form bổ sung thông tin, nêu phí 20.000đ, trạng thái yêu cầu thẻ (mục 9) |
| `ho-so.html` | Thông tin cá nhân, đổi mật khẩu, thẻ thư viện kèm mã QR giả |
| `sach-dang-muon.html` | Sách đang mượn và hạn trả, nút Gia hạn (mục 6), yêu cầu đang chờ nhận (mục 4), lịch sử mượn trả |
| `vi-pham.html` | Số lỗi n/3, danh sách khoản phạt, hạn nộp, hướng dẫn nộp tại quầy hoặc QR (mục 8) |
| `thong-bao.html` | Danh sách thông báo của tôi (mục 10) |
| `doc-tai-lieu.html` | Xem tài liệu số trực tuyến |

## P3. Thủ thư (vai trò `thuthu`, khung có thanh menu bên trái)
| File | Thành phần |
|---|---|
| `thu-thu.html` | Tổng quan: số yêu cầu chờ duyệt, sách quá hạn, thẻ chờ duyệt |
| `muon-tai-quay.html` | Ô quét thẻ, ô quét mã sách, danh sách sách đã quét kèm lỗi từng cuốn, nút Xác nhận (mục 4) |
| `duyet-yeu-cau.html` | Tab: yêu cầu mượn, gia hạn; nút Duyệt/Từ chối kèm lý do (mục 4, 6) |
| `tra-sach.html` | Quét mã sách, chọn tình trạng, hiển thị số ngày trễ, lỗi và tiền phạt, kết quả cập nhật bản sách (mục 5, 8) |
| `quan-ly-the.html` | Duyệt yêu cầu thẻ, xác nhận nhận thẻ và thu phí, khóa/mở khóa quyền mượn, cấp lại thẻ (mục 9) |
| `ghi-nhan-vi-pham.html` | Danh sách vi phạm, thu tiền phạt và xác nhận, tổng hợp vi phạm theo tuần (mục 8) |
| `quan-ly-sach.html` | Thêm, sửa đầu sách và bản sách, phân loại, đổi trạng thái bản sách, kiểm kê đơn giản |
| `dang-thong-bao.html` | Soạn tin tức, thông báo (sách mới, bảo trì, sự kiện) |
| `bao-cao-thang.html` | Báo cáo tháng của thủ thư (số phiếu xử lý, vi phạm, tiền phạt thu, sách mới) |

## P4. Quản trị viên (vai trò `admin`, khung riêng, menu bên trái)
Folio không có khung quản trị: dùng một template quản trị riêng (ví dụ Kiaalap) hoặc tự dựng bằng Bootstrap.
| File | Thành phần |
|---|---|
| `admin.html` | Thống kê tổng quan: thẻ số liệu, biểu đồ lượt mượn/trả, bộ lọc thời gian |
| `quan-ly-tai-khoan.html` | Tab bạn đọc/thủ thư; tìm kiếm, lọc trạng thái; thêm, sửa, khóa, mở khóa, đặt lại mật khẩu, xóa mềm |
| `phan-quyen.html` | 3 nhóm quyền, ma trận quyền theo mô-đun, điều chỉnh riêng cho một tài khoản, khôi phục mặc định |
| `tham-so.html` | Form tham số theo bốn nhóm (bảng ở mục 2) và nút Lưu, Khôi phục mặc định |
| `bao-cao.html` | Chọn loại báo cáo, lọc theo ngày, in, xuất Excel/PDF (mô phỏng), báo cáo tháng của thủ thư |
| `nhat-ky.html` | Nhật ký hoạt động có bộ lọc, chỉ đọc |
| `sao-luu.html` | Sao lưu thủ công, danh sách bản sao lưu, phục hồi (mô phỏng, tải/nạp lại dữ liệu mẫu) |

## P5. Mở rộng (làm sau nếu còn thời gian)
Đặt trước và hàng đợi (mục 7), nhắc hạn tự động theo giờ, backend và CSDL thật.

## Thứ tự giao việc cho AI
1. Dọn template và tạo `js/layout.js`.
2. Kiểm tra `js/data.js`, `js/store.js`, rồi tạo `js/services.js` cho phần tìm sách và đăng nhập.
3. Làm P1 từng trang, kết thúc bằng đăng nhập thử với các tài khoản mẫu.
4. Làm P2, bắt đầu từ `sach-dang-muon.html` và logic mượn, gia hạn.
5. Làm P3 (mượn tại quầy, duyệt, trả, phạt), rồi P4.
6. Chụp màn hình từng trang để viết Chương IV và Chương V.

## Mẫu prompt cho mỗi trang
```
Làm trang <tên file>.html theo docs/trang-can-lam.md, khung lấy từ <trang template>.
Giữ nguyên navbar, footer, CSS và class Bootstrap; dùng Store/Auth và js/services.js.
Quy tắc áp dụng ở mục <số> của docs/quy-tac.md. Toàn bộ chữ bằng tiếng Việt.
Hãy nêu kế hoạch (file nào tạo hoặc sửa) trước khi viết code.
```
