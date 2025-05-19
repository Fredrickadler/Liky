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

function sendCoins() {
  const fid = document.getElementById('fid').value;
  const amount = parseInt(document.getElementById('amount').value);
  const status = document.getElementById('status');

  if (!fid || isNaN(amount) || amount <= 0) {
    status.textContent = 'Invalid input.';
    return;
  }

  fetch('api/send-coins.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fid, amount })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        status.textContent = 'Coins sent successfully.';
      } else {
        status.textContent = 'Failed: ' + (data.error || JSON.stringify(data));
      }
    })
    .catch(() => {
      status.textContent = 'Server error.';
    });
}