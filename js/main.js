// متغیرهای سراسری
let currentPage = 'home-page';
let previousPage = 'home-page';
let currentOrder = null;
let rulesAccepted = false;

// توابع مدیریت صفحه
function showPage(pageId) {
  previousPage = currentPage;
  currentPage = pageId;
  
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  document.getElementById(pageId).classList.add('active');
  
  if (['home-page', 'leaderboard-page', 'profile-page'].includes(pageId)) {
    const tabBtn = document.querySelector(`.tab-btn[onclick="showPage('${pageId}')"]`);
    if (tabBtn) tabBtn.classList.add('active');
  }
}

function goBack() {
  showPage(previousPage);
}

// توابع مربوط به پست‌ها
function skipPost() {
  alert('Post skipped! Loading next...');
}

function viewPost() {
  window.open('https://warpcast.com/faruser1/0x0a6d75f4', '_blank');
}

function likePost() {
  const confirmed = confirm('Did you like this post on Warpcast?');
  if (confirmed) {
    alert('+1 COIN earned!');
  } else {
    alert('Please like the post first!');
  }
}

// توابع مربوط به سفارشات
function startOrder(type, coins, inputType) {
  if (!window.address) {
    alert('Please connect your wallet first!');
    return;
  }
  
  currentOrder = { type, coins, inputType };
  document.getElementById('order-form-title').textContent = `Order: ${type}`;
  document.getElementById('package-name').value = type;
  document.getElementById('package-price').value = `${coins} COINS`;
  document.getElementById('wallet-address').value = window.address;
  
  if (inputType === 'post') {
    document.getElementById('order-link-label').textContent = 'Post Link';
    document.getElementById('order-link').placeholder = 'https://warpcast.com/yourusername/0x123456';
  } else {
    document.getElementById('order-link-label').textContent = 'Profile Link';
    document.getElementById('order-link').placeholder = 'https://warpcast.com/yourusername';
  }
  
  showPage('order-form-page');
}

function submitOrder() {
  const link = document.getElementById('order-link').value.trim();
  const submitBtn = document.getElementById('submit-order-btn');
  
  if (!link) {
    submitBtn.textContent = 'Please enter a valid link';
    submitBtn.classList.add('error');
    setTimeout(() => {
      submitBtn.textContent = 'Confirm Order';
      submitBtn.classList.remove('error');
    }, 2000);
    return;
  }
  
  const hasEnoughCoins = true;
  
  if (!hasEnoughCoins) {
    submitBtn.textContent = 'Not enough coins!';
    submitBtn.classList.add('error');
    setTimeout(() => {
      submitBtn.textContent = 'Confirm Order';
      submitBtn.classList.remove('error');
    }, 2000);
    return;
  }
  
  submitBtn.textContent = 'Order Submitted!';
  submitBtn.classList.add('success');
  
  setTimeout(() => {
    showPage('profile-page');
    submitBtn.textContent = 'Confirm Order';
    submitBtn.classList.remove('success');
  }, 2000);
}

// توابع مربوط به آموزش
function toggleRule(ruleNumber) {
  const checkbox = document.getElementById(`rule${ruleNumber}-checkbox`);
  checkbox.classList.toggle('checked');
  
  const allRulesAccepted = 
    document.getElementById('rule1-checkbox').classList.contains('checked') &&
    document.getElementById('rule2-checkbox').classList.contains('checked') &&
    document.getElementById('rule3-checkbox').classList.contains('checked');
  
  if (allRulesAccepted) {
    document.getElementById('tutorial-submit-btn').classList.add('active');
    rulesAccepted = true;
  } else {
    document.getElementById('tutorial-submit-btn').classList.remove('active');
    rulesAccepted = false;
  }
}

function closeTutorial() {
  if (rulesAccepted) {
    document.getElementById('tutorial-overlay').style.display = 'none';
    localStorage.setItem('tutorialAccepted', 'true');
  }
}

// بارگذاری اولیه
document.addEventListener('DOMContentLoaded', () => {
  // نمایش صفحه قوانین اگر اولین بار است
  if (!localStorage.getItem('tutorialAccepted')) {
    document.getElementById('tutorial-overlay').style.display = 'flex';
  }
  
  // شبیه‌سازی تغییر دکمه عمل
  setTimeout(() => {
    const actionBtn = document.querySelector('.action-buttons .action-btn.primary');
    if (actionBtn) {
      actionBtn.innerHTML = '<i class="fas fa-user-plus"></i><span>FOLLOW</span>';
      actionBtn.onclick = function() {
        const confirmed = confirm('Did you follow this user on Warpcast?');
        if (confirmed) {
          alert('+2 COINS earned!');
        } else {
          alert('Please follow the user first!');
        }
      };
    }
  }, 3000);
});
