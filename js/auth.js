/* Frontend-only demo interactions for public account pages. No real authentication or email is connected. */
(function(){
  'use strict';
  const qs=(s,root=document)=>root.querySelector(s);
  const showMessage=(el,text,type='demo')=>{
    if(!el)return;el.className='auth-note auth-note-'+type;el.textContent=text;el.hidden=false;
  };
  document.querySelectorAll('[data-password-toggle]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const input=document.getElementById(btn.dataset.passwordToggle);
      if(!input)return;const show=input.type==='password';input.type=show?'text':'password';btn.textContent=show?'Ẩn':'Hiện';
    });
  });
  const signup=qs('[data-signup-form]');
  if(signup){
    signup.addEventListener('submit',e=>{
      e.preventDefault();signup.classList.add('was-validated');
      if(!signup.checkValidity())return;
      const pw=qs('#signup-password').value,confirm=qs('#signup-confirm').value;
      if(pw!==confirm){qs('#signup-confirm').setCustomValidity('Mật khẩu xác nhận không khớp.');signup.reportValidity();return;}
      qs('#signup-confirm').setCustomValidity('');
      const otp=String(Math.floor(100000+Math.random()*900000));
      qs('[data-signup-otp]').textContent=otp;
      qs('[data-signup-step-one]').hidden=true;qs('[data-signup-step-two]').hidden=false;
      showMessage(qs('[data-signup-message]'),'Đăng ký demo: mã kích hoạt giả lập là '+otp+'. Không có email nào được gửi.','demo');
    });
    qs('[data-signup-verify]')?.addEventListener('click',()=>{
      const code=qs('#signup-otp').value,expected=qs('[data-signup-otp]').textContent;
      if(code===expected){showMessage(qs('[data-signup-message]'),'Xác nhận thành công ở chế độ demo. Khi có backend, bước này sẽ được thay bằng xác thực thật.','success');}
      else showMessage(qs('[data-signup-message]'),'Mã xác nhận chưa đúng. Hãy kiểm tra và nhập lại.','error');
    });
    qs('[data-signup-back]')?.addEventListener('click',()=>{qs('[data-signup-step-one]').hidden=false;qs('[data-signup-step-two]').hidden=true;});
  }
  const login=qs('[data-login-form]');
  if(login)login.addEventListener('submit',e=>{
    e.preventDefault();login.classList.add('was-validated');
    if(!login.checkValidity())return;
    showMessage(qs('[data-login-message]'),'Giao diện đã kiểm tra dữ liệu. Đăng nhập chưa kết nối máy chủ nên chưa thể xác thực tài khoản.','demo');
  });
  const forgot=qs('[data-forgot-form]');
  if(forgot){
    let demoCode='';
    qs('[data-forgot-send]')?.addEventListener('click',()=>{
      const email=qs('#forgot-email');
      if(!email.checkValidity()){email.reportValidity();return;}
      demoCode=String(Math.floor(100000+Math.random()*900000));
      qs('[data-forgot-step-email]').hidden=true;qs('[data-forgot-step-code]').hidden=false;
      showMessage(qs('[data-forgot-message]'),'Mã giả lập: '+demoCode+'. Hệ thống chưa gửi email thật.','demo');
    });
    qs('[data-forgot-verify]')?.addEventListener('click',()=>{
      if(qs('#forgot-code').value!==demoCode){showMessage(qs('[data-forgot-message]'),'Mã xác nhận không đúng.','error');return;}
      qs('[data-forgot-step-code]').hidden=true;qs('[data-forgot-step-reset]').hidden=false;
    });
    qs('[data-forgot-reset]')?.addEventListener('click',()=>{
      const p=qs('#new-password'),c=qs('#new-password-confirm');
      if(!p.checkValidity()){p.reportValidity();return;}
      if(p.value!==c.value){c.setCustomValidity('Mật khẩu xác nhận không khớp.');c.reportValidity();return;}
      c.setCustomValidity('');
      showMessage(qs('[data-forgot-message]'),'Đã kiểm tra mật khẩu mới ở chế độ demo. Chưa có tài khoản thật để cập nhật.','success');
    });
  }
})();
