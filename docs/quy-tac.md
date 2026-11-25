# Quy tắc nghiệp vụ (nguồn duy nhất cho bản mẫu)

## 1. Vai trò và tài khoản
- Vai trò: bạn đọc (sinh viên, giảng viên), thủ thư, quản trị viên.
- Bạn đọc tự đăng ký bằng email thuộc tên miền của trường (tham số `allowedEmailDomains`). Không có khách ngoài.
- Thủ thư do quản trị viên cấp tài khoản, mật khẩu tạm, bắt buộc đổi ở lần đăng nhập đầu. Thủ thư và quản trị viên không tự đăng ký, không có nút đăng nhập Google.
- Quản trị viên chỉ chỉnh quyền khi cần; mỗi vai trò có quyền mặc định.
- Đăng ký: nhập họ tên, email, mật khẩu (ít nhất 8 ký tự, gồm chữ và số), xác nhận mật khẩu. Tài khoản mới ở trạng thái "Chờ kích hoạt", nhập mã 6 số (hiệu lực 10 phút) thì thành "Hoạt động". Lỗi hiển thị ngay tại ô sai, giữ lại dữ liệu đã nhập.
- Đăng nhập: sai thông tin thì báo chung "Email hoặc mật khẩu không đúng"; sai 5 lần liên tiếp thì khóa tạm 15 phút. Đăng nhập Google chỉ cho bạn đọc có email thuộc tên miền của trường.
- Quên mật khẩu: nhập email, nhận mã xác thực, nhập mã rồi tự đặt mật khẩu mới.
- Xóa tài khoản là xóa mềm ("Đã xóa"), không xóa lịch sử. Không xóa bạn đọc còn sách chưa trả.
- **Khóa tài khoản** (admin, chặn đăng nhập) khác **khóa quyền mượn** (do đủ 3 lỗi hoặc còn nợ phạt; vẫn đăng nhập và tra cứu được).

## 2. Tham số hệ thống (admin chỉnh được, giá trị mặc định)
| Tham số | Giá trị |
|---|---|
| Số sách mượn tối đa | 5 cuốn |
| Hạn mượn chuẩn | 30 ngày, chốt lúc 23:59 |
| Gia hạn | tối đa 1 lần, mỗi lần 14 ngày |
| Giữ sách chờ nhận | 48 giờ |
| Đơn giá phạt trả trễ | 1.000đ / cuốn / ngày (0 = không phạt tiền) |
| Trễ quá 30 ngày | xử lý như mất sách |
| Phạt hỏng nhẹ | 30%, 40% hoặc 50% giá bìa |
| Phạt hỏng nặng hoặc mất | 100% giá bìa |
| Số lỗi tối đa | 3 lỗi, mỗi lỗi hiệu lực 12 tháng |
| Hạn nộp phạt | 3 ngày kể từ ngày thông báo |
| Nhắc hạn trả | trước 3 ngày, lúc 09:00, qua email và SMS |
| Phí làm thẻ, cấp lại thẻ | 20.000đ |
| Hạn nhận thẻ | 7 ngày sau khi được duyệt |
| Đăng nhập sai | tối đa 5 lần, khóa tạm 15 phút |

## 3. Tìm kiếm và tài liệu
- Tìm theo tên sách, tác giả, nhà xuất bản, ISBN, thể loại; có lọc theo thể loại và trạng thái còn sách.
- Sách vật lý: mượn trước trên web rồi nhận tại quầy. Tài liệu số: xem trực tuyến, không cần mượn.
- Trạng thái bản sách: Có sẵn, Đã giữ, Đang mượn, Hỏng, Mất, Chỉ đọc tại chỗ, Bảo trì. Trạng thái hiển thị của đầu sách là tổng hợp từ các bản (còn ít nhất một bản "Có sẵn" thì là "Còn sách").

## 4. Mượn sách
Điều kiện chung (hệ thống tự kiểm tra, cả mượn online lẫn tại quầy): tài khoản "Hoạt động"; thẻ "Hoạt động" và còn hạn; không bị khóa quyền mượn; không có sách quá hạn; không có khoản phạt chưa nộp; tổng số cuốn đang mượn, đang giữ chờ nhận và đang mượn thêm không vượt 5.

**Mượn trước trên web:** bạn đọc yêu cầu mượn một đầu sách → hệ thống chọn một bản "Có sẵn" (hoặc bản đang giữ đúng cho bạn đọc) → bản sách thành "Đã giữ" 48 giờ, yêu cầu "Chờ duyệt" → thủ thư duyệt (kiểm tra vi phạm) hoặc từ chối (bản về "Có sẵn", gửi thông báo lý do) → bạn đọc đến quầy nhận sách → thành "Đang mượn", hạn trả = ngày nhận + 30 ngày. Quá 48 giờ không nhận thì tự hủy.

**Mượn tại quầy:** thủ thư quét thẻ (hoặc nhập mã bạn đọc), quét mã vạch từng cuốn, bấm Xác nhận. Hệ thống tự kiểm tra điều kiện chung và từng cuốn rồi tạo phiếu "Đang mượn", không cần duyệt riêng. Cuốn nào lỗi (đang giữ cho người khác, đang mượn, hỏng, mất, chỉ đọc tại chỗ, bảo trì) thì báo riêng, các cuốn còn lại vẫn mượn được. Bản "Đã giữ" cho chính bạn đọc thì hợp lệ và đóng yêu cầu tương ứng.

## 5. Trả sách (tại quầy, do thủ thư thực hiện)
Quét mã sách → kiểm tra tình trạng (tốt, hỏng nhẹ, hỏng nặng, mất) → nếu trễ thì ghi 1 lỗi và tính tiền → cập nhật bản sách (có người đặt trước thì chuyển "Đã giữ" cho người đứng đầu hàng đợi, ngược lại "Có sẵn"). Bạn đọc chỉ xem trạng thái, không tự bấm trả.

## 6. Gia hạn
Bạn đọc gửi đơn **trước hạn trả** → hệ thống kiểm tra (không bị khóa, chưa quá hạn, chưa hết số lần, không có người đặt trước đầu sách đó, không nợ phạt) → thủ thư duyệt → cộng 14 ngày vào hạn trả, ghi lịch sử → thông báo kết quả cho bạn đọc.

## 7. Đặt trước (làm sau cùng, là chức năng mở rộng)
Khi mọi bản của một đầu sách đang được mượn, bạn đọc đặt trước và vào hàng đợi. Khi có bản được trả, bản đó "Đã giữ" cho người đứng đầu 48 giờ. Đến nhận đúng hạn thì mượn; chủ động hủy hoặc quá 48 giờ thì hủy lượt và chuyển người kế.

## 8. Lỗi và tiền phạt
- Trả sau 23:59 ngày hạn là trễ. Mỗi **lần** trả trễ ghi 1 lỗi (trả nhiều cuốn trễ cùng lần vẫn là 1 lỗi).
- Tiền phạt mỗi cuốn trễ = 1.000đ × số ngày trễ (ngày lịch), không vượt giá bìa. Trễ quá 30 ngày thì xử lý như mất sách.
- Hỏng nhẹ: 30–50% giá bìa (thủ thư chọn mức). Hỏng nặng hoặc mất: 100% giá bìa. Hỏng và mất không tính vào số lỗi.
- Đủ 3 lỗi: tự khóa quyền mượn. Thủ thư mở khóa sau khi xử lý và số lỗi về 0. Lỗi tự hết hiệu lực sau 12 tháng.
- Phải nộp phạt trong 3 ngày; quá hạn thì khóa quyền mượn đến khi nộp. Nộp bằng tiền mặt tại quầy hoặc chuyển khoản QR, thủ thư xác nhận. Không làm cổng thanh toán online.
- Trạng thái khoản phạt: "Chưa nộp", "Đã nộp".

## 9. Thẻ thư viện
Bạn đọc có tài khoản "Hoạt động" đăng ký thẻ trên web → yêu cầu "Chờ duyệt" → thủ thư duyệt (hệ thống sinh mã thẻ và mã QR, yêu cầu thành "Chờ nhận thẻ") → bạn đọc đến quầy mang giấy tờ, nộp 20.000đ, thủ thư xác nhận → thẻ "Hoạt động". Quá 7 ngày không nhận thì tự hủy. Thẻ chưa "Hoạt động" thì chưa mượn được. Đăng ký tại quầy: thủ thư nhập thông tin, thu phí, thẻ "Hoạt động" ngay.

## 10. Thông báo
- Nhắc trước hạn trả 3 ngày lúc 09:00 (email, SMS, thông báo web). Bản mẫu mô phỏng bằng danh sách thông báo trong trang, không gửi thật.
- Gửi thông báo khi: yêu cầu mượn được duyệt hoặc từ chối, gia hạn được duyệt hoặc từ chối, có vi phạm mới (kèm số lỗi n/3), khoản phạt sắp đến hạn, thẻ được duyệt.

## 11. Báo cáo
- Thủ thư tổng hợp vi phạm hằng tuần và lập báo cáo tháng; quản trị viên tổng hợp báo cáo tháng của thủ thư.
- Thống kê: tổng bạn đọc, đầu sách, bản sách, sách đang mượn, sách quá hạn, khoản phạt chưa nộp; lọc theo khoảng thời gian; in và xuất Excel, PDF.
