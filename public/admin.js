// public/admin.js
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
        status.textContent = 'Failed: ' + data.error;
      }
    })
    .catch(() => {
      status.textContent = 'Server error.';
    });
}
