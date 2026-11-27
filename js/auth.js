/* Demo-only interactions for the public account pages.
 * No authentication, storage of credentials, or real email is connected.
 */
(function () {
  'use strict';

  const qs = (selector, root = document) => root.querySelector(selector);
  const showMessage = (element, text, type = 'demo') => {
    if (!element) return;
    element.className = 'auth-note auth-note-' + type;
    element.textContent = text;
    element.hidden = false;
  };

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll('[data-password-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.passwordToggle);
      if (!input) return;
      const visible = input.type === 'password';
      input.type = visible ? 'text' : 'password';
      button.textContent = visible ? 'Ẩn' : 'Hiện';
      button.setAttribute('aria-label', visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu');
    });
  });

  const signup = qs('[data-signup-form]');
  if (signup) {
    const password = qs('#signup-password');
    const confirm = qs('#signup-confirm');
    const validateMatch = () => {
      confirm.setCustomValidity(confirm.value && confirm.value !== password.value
        ? 'Mật khẩu xác nhận không khớp.' : '');
    };
    password.addEventListener('input', validateMatch);
    confirm.addEventListener('input', validateMatch);

    signup.addEventListener('submit', event => {
      event.preventDefault();
      signup.classList.add('was-validated');
      validateMatch();
      if (!signup.checkValidity()) {
        signup.reportValidity();
        return;
      }
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      qs('[data-signup-otp]').textContent = otp;
      qs('[data-signup-step-one]').hidden = true;
      qs('[data-signup-step-two]').hidden = false;
      showMessage(qs('[data-signup-message]'),
        'Mã demo: ' + otp + '. Đây chỉ là mô phỏng, không có email được gửi.', 'demo');
    });

    qs('[data-signup-verify]')?.addEventListener('click', () => {
      const input = qs('#signup-otp');
      if (!/^\d{6}$/.test(input.value)) {
        input.setCustomValidity('Vui lòng nhập mã gồm 6 chữ số.');
        input.reportValidity();
        return;
      }
      input.setCustomValidity('');
      if (input.value === qs('[data-signup-otp]').textContent) {
        showMessage(qs('[data-signup-message]'),
          'Xác nhận thành công ở chế độ demo. Chức năng tạo tài khoản thật cần backend.', 'success');
      } else {
        showMessage(qs('[data-signup-message]'), 'Mã xác nhận chưa đúng. Hãy thử lại.', 'error');
      }
    });

    qs('#signup-otp')?.addEventListener('input', event => event.target.setCustomValidity(''));
    qs('[data-signup-back]')?.addEventListener('click', () => {
      qs('[data-signup-step-one]').hidden = false;
      qs('[data-signup-step-two]').hidden = true;
    });
  }

  const login = qs('[data-login-form]');
  if (login) {
    login.addEventListener('submit', event => {
      event.preventDefault();
      login.classList.add('was-validated');
      if (!login.checkValidity()) {
        login.reportValidity();
        return;
      }
      showMessage(qs('[data-login-message]'),
        'Dữ liệu đã hợp lệ ở giao diện demo. Đăng nhập thật chưa được kết nối máy chủ.', 'demo');
    });
  }

  const forgot = qs('[data-forgot-send]');
  if (forgot) {
    let demoCode = '';
    const email = qs('#forgot-email');
    const code = qs('#forgot-code');
    const newPassword = qs('#new-password');
    const confirmPassword = qs('#new-password-confirm');

    forgot.addEventListener('click', () => {
      if (!email.checkValidity()) {
        email.reportValidity();
        return;
      }
      demoCode = String(Math.floor(100000 + Math.random() * 900000));
      qs('[data-forgot-step-email]').hidden = true;
      qs('[data-forgot-step-code]').hidden = false;
      showMessage(qs('[data-forgot-message]'),
        'Mã demo: ' + demoCode + '. Hệ thống chưa gửi email thật.', 'demo');
    });

    qs('[data-forgot-verify]')?.addEventListener('click', () => {
      if (!/^\d{6}$/.test(code.value)) {
        code.setCustomValidity('Vui lòng nhập mã gồm 6 chữ số.');
        code.reportValidity();
        return;
      }
      code.setCustomValidity('');
      if (code.value !== demoCode) {
        showMessage(qs('[data-forgot-message]'), 'Mã xác minh chưa đúng.', 'error');
        return;
      }
      qs('[data-forgot-step-code]').hidden = true;
      qs('[data-forgot-step-reset]').hidden = false;
    });
    code?.addEventListener('input', () => code.setCustomValidity(''));

    const checkNewPassword = () => {
      confirmPassword.setCustomValidity(confirmPassword.value && confirmPassword.value !== newPassword.value
        ? 'Mật khẩu xác nhận không khớp.' : '');
    };
    newPassword?.addEventListener('input', checkNewPassword);
    confirmPassword?.addEventListener('input', checkNewPassword);

    qs('[data-forgot-reset]')?.addEventListener('click', () => {
      checkNewPassword();
      if (!newPassword.checkValidity() || !confirmPassword.checkValidity()) {
        newPassword.reportValidity();
        confirmPassword.reportValidity();
        return;
      }
      showMessage(qs('[data-forgot-message]'),
        'Đã kiểm tra mật khẩu mới ở chế độ demo. Chưa có tài khoản thật để cập nhật.', 'success');
    });
  }
})();