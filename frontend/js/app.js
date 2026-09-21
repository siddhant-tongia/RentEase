let currentUser = null;

document.addEventListener('DOMContentLoaded', async () => {
  await checkUserSession();
});

async function checkUserSession() {
  try {
    currentUser = await apiRequest(CONFIG.AUTH.ME, 'GET');
    updateUIWithUserInfo(currentUser);
  } catch (error) {
    alert('Session expired or unauthorized. Please login first.');
    window.location.href = '../index.html';
  }
}

function updateUIWithUserInfo(user) {
  const userGreeting = document.getElementById('user-greeting');
  if (userGreeting) {
    userGreeting.innerHTML = `Logged in as <strong>${user.email}</strong> (${user.role})`;
  }
}