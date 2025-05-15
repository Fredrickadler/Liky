// ایجاد ستاره‌های متحرک
function createStars() {
  const starsContainer = document.getElementById('stars');
  if (!starsContainer) return;

  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 3 + 1}px`;
    star.style.height = star.style.width;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.animationDuration = `${Math.random() * 30 + 20}s`;
    starsContainer.appendChild(star);
  }
}

document.addEventListener('DOMContentLoaded', createStars);
