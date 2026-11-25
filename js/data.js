/* Dữ liệu mẫu cho bản mô phỏng. TOÀN BỘ là dữ liệu GIẢ.
   Mật khẩu để dạng chữ thường chỉ vì đây là bản mẫu; bản thật phải mã hóa.
   Đổi tên miền email, ảnh bìa và nội dung cho đúng với trường của bạn. */
(function () {
  // Trả về chuỗi ISO lệch so với hôm nay (offset ngày, giờ, phút)
  function d(offsetDays, hh, mm) {
    var t = new Date();
    t.setDate(t.getDate() + offsetDays);
    t.setHours(hh == null ? 0 : hh, mm == null ? 0 : mm, 0, 0);
    return t.toISOString();
  }

  // Tên trạng thái dùng thống nhất toàn dự án. "Quá hạn" không lưu, được tính từ hạn trả (xem Store.isOverdue).
  window.CONST = {
    ROLE: { READER: "bandoc", LIBRARIAN: "thuthu", ADMIN: "admin" },
    USER_STATUS: { PENDING: "Chờ kích hoạt", ACTIVE: "Hoạt động", LOCKED: "Đã khóa", DELETED: "Đã xóa" },
    CARD_STATUS: { REVIEW: "Chờ duyệt", PICKUP: "Chờ nhận thẻ", ACTIVE: "Hoạt động", EXPIRED: "Hết hạn", LOCKED: "Đã khóa" },
    COPY_STATUS: { AVAILABLE: "Có sẵn", HELD: "Đã giữ", BORROWED: "Đang mượn", DAMAGED: "Hỏng", LOST: "Mất", REFERENCE: "Chỉ đọc tại chỗ", MAINTENANCE: "Bảo trì" },
    LOAN_STATUS: { PENDING: "Chờ duyệt", APPROVED: "Đã duyệt", BORROWING: "Đang mượn", RETURNED: "Đã trả", REJECTED: "Từ chối", CANCELLED: "Đã hủy" },
    FINE_STATUS: { UNPAID: "Chưa nộp", PAID: "Đã nộp" },
    VIOLATION: { LATE: "Trả trễ", DAMAGED: "Hỏng sách", LOST: "Mất sách" }
  };

  window.SEED = {
    settings: {
      maxBooks: 5, loanDays: 30, dueTime: "23:59",
      maxRenewals: 1, renewDays: 14, holdHours: 48,
      lateFeePerBookPerDay: 1000, lostAfterDays: 30,
      damageLightRates: [30, 40, 50], damageHeavyRate: 100,
      maxStrikes: 3, strikeValidMonths: 12, finePayDays: 3,
      remindDaysBefore: 3, remindTime: "09:00", channels: ["email", "sms"],
      cardFee: 20000, cardReissueFee: 20000, cardPickupDays: 7,
      allowedEmailDomains: ["school.edu.vn", "student.school.edu.vn"],
      maxLoginFails: 5, lockMinutes: 15, codeValidMinutes: 10
    },

    users: [
      { id: "AD001", name: "Quản trị viên", email: "admin@school.edu.vn", phone: "0900000001", password: "Admin@123", role: "admin", status: "Hoạt động", createdAt: d(-200), failedLogins: 0, lockedUntil: null, mustChangePassword: false },
      { id: "TT001", name: "Nguyễn Thị Hoa", email: "hoa.nt@school.edu.vn", phone: "0900000002", password: "Thuthu@123", role: "thuthu", status: "Hoạt động", createdAt: d(-180), failedLogins: 0, lockedUntil: null, mustChangePassword: false },
      { id: "DG00101", name: "Trần Văn A", email: "a.tv@student.school.edu.vn", phone: "0900000101", password: "Docgia@123", role: "bandoc", readerType: "Sinh viên", studentCode: "SV001", status: "Hoạt động", createdAt: d(-120), failedLogins: 0, lockedUntil: null, borrowLocked: false },
      { id: "DG00102", name: "Lê Thị B", email: "b.lt@school.edu.vn", phone: "0900000102", password: "Docgia@123", role: "bandoc", readerType: "Giảng viên", studentCode: "GV001", status: "Hoạt động", createdAt: d(-110), failedLogins: 0, lockedUntil: null, borrowLocked: false },
      { id: "DG00103", name: "Phạm Văn C", email: "c.pv@student.school.edu.vn", phone: "0900000103", password: "Docgia@123", role: "bandoc", readerType: "Sinh viên", studentCode: "SV002", status: "Hoạt động", createdAt: d(-100), failedLogins: 0, lockedUntil: null, borrowLocked: true, borrowLockReason: "Đủ 3 lỗi trả trễ" },
      { id: "DG00104", name: "Võ Thị D", email: "d.vt@student.school.edu.vn", phone: "0900000104", password: "Docgia@123", role: "bandoc", readerType: "Sinh viên", studentCode: "SV003", status: "Chờ kích hoạt", createdAt: d(-1), failedLogins: 0, lockedUntil: null, activationCode: "123456" },
      { id: "DG00105", name: "Đặng Văn E", email: "e.dv@student.school.edu.vn", phone: "0900000105", password: "Docgia@123", role: "bandoc", readerType: "Sinh viên", studentCode: "SV004", status: "Hoạt động", createdAt: d(-3), failedLogins: 0, lockedUntil: null, borrowLocked: false }
    ],

    cards: [
      { id: "TH0001", userId: "DG00101", status: "Hoạt động", issuedAt: d(-120), expiresAt: d(245), fee: 20000 },
      { id: "TH0002", userId: "DG00102", status: "Hoạt động", issuedAt: d(-110), expiresAt: d(255), fee: 20000 },
      { id: "TH0003", userId: "DG00103", status: "Hoạt động", issuedAt: d(-100), expiresAt: d(265), fee: 20000 },
      { id: "TH0004", userId: "DG00105", status: "Chờ duyệt", requestedAt: d(-2), issuedAt: null, expiresAt: null, fee: 20000 }
    ],

    categories: ["Công nghệ thông tin", "Toán – Lý", "Kinh tế", "Ngoại ngữ", "Tài liệu số"],

    titles: [
      { id: "T001", title: "Nhập môn Công nghệ phần mềm", authors: ["Nguyễn Văn An"], publisher: "NXB Giáo dục", year: 2022, isbn: "9780000000011", category: "Công nghệ thông tin", price: 85000, summary: "Giáo trình nhập môn về quy trình và phân tích thiết kế phần mềm.", cover: null, digitalUrl: null },
      { id: "T002", title: "Cơ sở dữ liệu", authors: ["Trần Thị Bình"], publisher: "NXB Đại học Quốc gia", year: 2021, isbn: "9780000000028", category: "Công nghệ thông tin", price: 95000, summary: "Mô hình quan hệ, SQL và thiết kế cơ sở dữ liệu.", cover: null, digitalUrl: null },
      { id: "T003", title: "Lập trình Web", authors: ["Lê Minh Cường"], publisher: "NXB Thông tin và Truyền thông", year: 2023, isbn: "9780000000035", category: "Công nghệ thông tin", price: 120000, summary: "HTML, CSS, JavaScript và xây dựng website.", cover: null, digitalUrl: null },
      { id: "T004", title: "Cấu trúc dữ liệu và giải thuật", authors: ["Phạm Quốc Dũng"], publisher: "NXB Giáo dục", year: 2020, isbn: "9780000000042", category: "Công nghệ thông tin", price: 110000, summary: "Các cấu trúc dữ liệu cơ bản và phân tích độ phức tạp.", cover: null, digitalUrl: null },
      { id: "T005", title: "Giải tích 1", authors: ["Hoàng Thị Em"], publisher: "NXB Đại học Quốc gia", year: 2019, isbn: "9780000000059", category: "Toán – Lý", price: 70000, summary: "Giới hạn, đạo hàm, tích phân hàm một biến.", cover: null, digitalUrl: null },
      { id: "T006", title: "Kinh tế vi mô", authors: ["Vũ Văn Giang"], publisher: "NXB Kinh tế", year: 2021, isbn: "9780000000066", category: "Kinh tế", price: 90000, summary: "Cung cầu, hành vi người tiêu dùng và doanh nghiệp.", cover: null, digitalUrl: null },
      { id: "T007", title: "Tiếng Anh chuyên ngành CNTT", authors: ["Đỗ Thị Hạnh"], publisher: "NXB Giáo dục", year: 2022, isbn: "9780000000073", category: "Ngoại ngữ", price: 65000, summary: "Từ vựng và đọc hiểu tiếng Anh chuyên ngành.", cover: null, digitalUrl: null },
      { id: "T008", title: "Hướng dẫn nghiên cứu khoa học (bản số)", authors: ["Bộ môn Phương pháp"], publisher: "Thư viện trường", year: 2024, isbn: "", category: "Tài liệu số", price: 0, summary: "Tài liệu số xem trực tuyến, không cần mượn.", cover: null, digitalUrl: "tai-lieu/nghien-cuu-khoa-hoc.pdf" }
    ],

    copies: [
      { barcode: "BC0001", titleId: "T001", status: "Đang mượn", shelf: "A1-01" },
      { barcode: "BC0002", titleId: "T001", status: "Có sẵn", shelf: "A1-01" },
      { barcode: "BC0003", titleId: "T002", status: "Có sẵn", shelf: "A1-02" },
      { barcode: "BC0004", titleId: "T002", status: "Có sẵn", shelf: "A1-02" },
      { barcode: "BC0005", titleId: "T003", status: "Đang mượn", shelf: "A1-03" },
      { barcode: "BC0006", titleId: "T004", status: "Đang mượn", shelf: "A1-04" },
      { barcode: "BC0007", titleId: "T005", status: "Có sẵn", shelf: "B2-01" },
      { barcode: "BC0008", titleId: "T005", status: "Đã giữ", shelf: "B2-01" },
      { barcode: "BC0009", titleId: "T005", status: "Đang mượn", shelf: "B2-01" },
      { barcode: "BC0010", titleId: "T006", status: "Có sẵn", shelf: "C3-01" },
      { barcode: "BC0011", titleId: "T006", status: "Chỉ đọc tại chỗ", shelf: "C3-01" },
      { barcode: "BC0012", titleId: "T007", status: "Có sẵn", shelf: "D4-01" },
      { barcode: "BC0013", titleId: "T007", status: "Hỏng", shelf: "D4-01" }
    ],

    // Phiếu mượn. dueDate = borrowDate + 30 ngày, chốt 23:59.
    loans: [
      { id: "L001", userId: "DG00101", barcode: "BC0001", status: "Đang mượn", source: "online", requestedAt: d(-10), approvedAt: d(-10), borrowDate: d(-9), dueDate: d(21, 23, 59), renewals: 0, processedBy: "TT001" },
      { id: "L002", userId: "DG00101", barcode: "BC0005", status: "Đang mượn", source: "quầy", requestedAt: d(-28), approvedAt: d(-28), borrowDate: d(-28), dueDate: d(2, 23, 59), renewals: 0, processedBy: "TT001" },
      { id: "L003", userId: "DG00103", barcode: "BC0009", status: "Đang mượn", source: "quầy", requestedAt: d(-35), approvedAt: d(-35), borrowDate: d(-35), dueDate: d(-5, 23, 59), renewals: 0, processedBy: "TT001" },
      { id: "L004", userId: "DG00102", barcode: "BC0003", status: "Đã trả", source: "online", requestedAt: d(-40), approvedAt: d(-40), borrowDate: d(-38), dueDate: d(-8, 23, 59), returnedAt: d(-12), renewals: 0, processedBy: "TT001" },
      { id: "L005", userId: "DG00102", barcode: "BC0008", status: "Đã duyệt", source: "online", requestedAt: d(-1), approvedAt: d(0), holdUntil: d(1), renewals: 0, processedBy: "TT001" },
      { id: "L006", userId: "DG00102", barcode: "BC0006", status: "Đang mượn", source: "quầy", requestedAt: d(-20), approvedAt: d(-20), borrowDate: d(-20), dueDate: d(10, 23, 59), renewals: 0, processedBy: "TT001" }
    ],

    renewals: [],

    reservations: [
      { id: "R001", userId: "DG00101", titleId: "T004", status: "Đang chờ", position: 1, createdAt: d(-2) }
    ],

    // Vi phạm và tiền phạt. strike = 1 nghĩa là tính vào số lỗi.
    violations: [
      { id: "V001", userId: "DG00103", loanId: "LX01", type: "Trả trễ", strike: 1, fineAmount: 0, fineStatus: "Đã nộp", createdAt: d(-200) },
      { id: "V002", userId: "DG00103", loanId: "LX02", type: "Trả trễ", strike: 1, fineAmount: 0, fineStatus: "Đã nộp", createdAt: d(-120) },
      { id: "V003", userId: "DG00103", loanId: "LX03", type: "Trả trễ", strike: 1, fineAmount: 15000, fineStatus: "Chưa nộp", createdAt: d(-1), payDueDate: d(2, 23, 59) }
    ],

    announcements: [
      { id: "N001", title: "Thư viện mở cửa trở lại sau kỳ nghỉ", category: "Thông báo", content: "Thư viện phục vụ bình thường từ thứ Hai.", createdAt: d(-5), author: "TT001" },
      { id: "N002", title: "Sách mới học kỳ này", category: "Sách mới", content: "Thư viện vừa nhập thêm giáo trình Công nghệ thông tin.", createdAt: d(-3), author: "TT001" },
      { id: "N003", title: "Bảo trì hệ thống cuối tuần", category: "Bảo trì", content: "Website tạm ngừng từ 22:00 thứ Bảy đến 06:00 Chủ nhật.", createdAt: d(-1), author: "AD001" }
    ],

    notifications: [
      { id: "TB001", userId: "DG00101", message: "Sách Lập trình Web sẽ đến hạn trả trong 2 ngày.", createdAt: d(0, 9, 0), read: false },
      { id: "TB002", userId: "DG00103", message: "Bạn đã bị ghi nhận 3/3 lỗi. Quyền mượn sách tạm bị khóa.", createdAt: d(-1), read: false }
    ],

    logs: []
  };
})();
