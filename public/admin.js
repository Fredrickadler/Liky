// تابع بررسی رمز
function checkPassword() {
  const password = document.getElementById('password-input').value;
  const loginStatus = document.getElementById('login-status');

  if (password === 'admin-liky') {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
  } else {
    loginStatus.textContent = 'Incorrect password.';
  }
}

// تابع ارسال سکه
function sendCoins() {
  const fid = document.getElementById('fid').value;
  const amount = parseInt(document.getElementById('amount').value);
  const status = document.getElementById('status');

  // اعتبارسنجی اولیه
  if (!fid || isNaN(amount) || amount <= 0) {
    status.textContent = 'Invalid input.';
    return;
  }

  // ارسال درخواست به PHP
  fetch('api/send-coins.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fid, amount })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        status.textContent = 'Coins sent successfully.';
        status.style.color = 'green';
      } else {
        status.textContent = 'Failed: ' + (data.error || JSON.stringify(data));
        status.style.color = 'red';
      }
    })
    .catch((err) => {
      status.textContent = 'Server error: ' + err.message;
      status.style.color = 'red';
    });
}