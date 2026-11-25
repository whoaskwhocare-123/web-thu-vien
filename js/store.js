/* Lớp truy cập dữ liệu của bản mẫu. Các trang chỉ gọi Store và Auth, không đọc localStorage trực tiếp.
   Khi làm backend thật, chỉ cần thay phần bên trong các hàm này bằng lệnh gọi API. */
(function () {
  var KEY = "thuvien_db_v1";
  var SESSION = "thuvien_session_v1";
  var C = window.CONST;

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  var Store = {
    load: function () {
      try {
        var raw = localStorage.getItem(KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) { console.error("Không đọc được dữ liệu", e); }
      var db = clone(window.SEED);
      Store.save(db);
      return db;
    },
    save: function (db) {
      try { localStorage.setItem(KEY, JSON.stringify(db)); }
      catch (e) { console.error("Không lưu được dữ liệu", e); }
    },
    // Đưa dữ liệu về như ban đầu (dùng cho nút "khôi phục dữ liệu mẫu")
    reset: function () {
      try { localStorage.removeItem(KEY); localStorage.removeItem(SESSION); }
      catch (e) { console.error(e); }
    },
    // Sinh mã mới, ví dụ nextId(db.loans, "L", 3) -> "L007"
    nextId: function (list, prefix, pad) {
      var max = 0;
      list.forEach(function (x) {
        var n = parseInt(String(x.id).replace(prefix, ""), 10);
        if (!isNaN(n) && n > max) max = n;
      });
      return prefix + String(max + 1).padStart(pad || 3, "0");
    },
    // Phiếu đang mượn mà quá hạn trả
    isOverdue: function (loan) {
      return loan.status === C.LOAN_STATUS.BORROWING && new Date(loan.dueDate) < new Date();
    },
    fmtDate: function (iso) {
      if (!iso) return "";
      var t = new Date(iso);
      return String(t.getDate()).padStart(2, "0") + "/" + String(t.getMonth() + 1).padStart(2, "0") + "/" + t.getFullYear();
    },
    fmtMoney: function (n) { return Number(n || 0).toLocaleString("vi-VN") + "đ"; }
  };

  var Auth = {
    // Trang chủ theo vai trò sau khi đăng nhập
    homeFor: function (role) {
      if (role === C.ROLE.ADMIN) return "admin.html";
      if (role === C.ROLE.LIBRARIAN) return "thu-thu.html";
      return "index.html";
    },
    current: function () {
      try {
        var s = JSON.parse(localStorage.getItem(SESSION) || "null");
        if (!s) return null;
        var u = Store.load().users.find(function (x) { return x.id === s.userId; });
        return u && u.status === C.USER_STATUS.ACTIVE ? u : null;
      } catch (e) { return null; }
    },
    login: function (email, password) {
      email = String(email || "").trim().toLowerCase();
      if (!email || !password) return { ok: false, msg: "Vui lòng nhập đầy đủ email và mật khẩu." };
      var db = Store.load();
      var s = db.settings;
      var u = db.users.find(function (x) { return x.email.toLowerCase() === email; });

      if (u && u.lockedUntil && new Date(u.lockedUntil) > new Date()) {
        var m = Math.ceil((new Date(u.lockedUntil) - new Date()) / 60000);
        return { ok: false, msg: "Tài khoản bị khóa tạm, vui lòng thử lại sau " + m + " phút." };
      }
      if (!u || u.password !== password) {
        if (u) {
          u.failedLogins = (u.failedLogins || 0) + 1;
          if (u.failedLogins >= s.maxLoginFails) {
            u.lockedUntil = new Date(Date.now() + s.lockMinutes * 60000).toISOString();
            u.failedLogins = 0;
          }
          Store.save(db);
        }
        return { ok: false, msg: "Email hoặc mật khẩu không đúng." };
      }
      u.failedLogins = 0;
      u.lockedUntil = null;
      Store.save(db);
      if (u.status === C.USER_STATUS.PENDING) return { ok: false, msg: "Tài khoản chưa được kích hoạt. Vui lòng nhập mã xác thực." };
      if (u.status !== C.USER_STATUS.ACTIVE) return { ok: false, msg: "Tài khoản không thể đăng nhập. Vui lòng liên hệ thư viện." };

      try { localStorage.setItem(SESSION, JSON.stringify({ userId: u.id, at: Date.now() })); } catch (e) { console.error(e); }
      return { ok: true, user: u, home: Auth.homeFor(u.role), mustChangePassword: !!u.mustChangePassword };
    },
    logout: function () {
      try { localStorage.removeItem(SESSION); } catch (e) { console.error(e); }
    },
    // Dùng đầu mỗi trang cần đăng nhập. Sai vai trò thì chuyển về trang đăng nhập.
    requireRole: function (roles, loginPage) {
      var u = Auth.current();
      if (!u || roles.indexOf(u.role) === -1) {
        window.location.href = loginPage || "dang-nhap.html";
        return null;
      }
      return u;
    }
  };

  window.Store = Store;
  window.Auth = Auth;
})();
