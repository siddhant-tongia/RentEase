function toggleAuth(view) {
  const loginCard = document.getElementById('login-card');
  const registerCard = document.getElementById('register-card');

  if (!loginCard || !registerCard) return;

  if (view === 'register') {
    loginCard.classList.remove('active');
    registerCard.classList.add('active');
  } else {
    registerCard.classList.remove('active');
    loginCard.classList.add('active');
  }
}

function openAuth(view) {
  toggleAuth(view);

  const authSection = document.getElementById('auth-section');
  if (authSection) {
    const yOffset = -40; 
    const elementPosition = authSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset + yOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}