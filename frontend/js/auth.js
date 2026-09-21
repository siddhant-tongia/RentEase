document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      try {
        const response = await apiRequest(CONFIG.AUTH.LOGIN, 'POST', {
          email: email,
          password: password
        });

        alert(response.message || 'Login successful!');
        window.location.href = 'pages/dashboard.html';
      } catch (error) {
        alert(error.message || 'Login failed. Please check your credentials.');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const role = document.getElementById('reg-role').value;

      try {
        const response = await apiRequest(CONFIG.AUTH.REGISTER, 'POST', {
          name: name,
          email: email,
          password: password,
          role: role
        });

        alert(response.message || 'Account created successfully!');
        
        if (typeof toggleAuth === 'function') {
          toggleAuth('login');
        }
      } catch (error) {
        alert(error.message || 'Registration failed.');
      }
    });
  }
});

async function logoutUser() {
  try {
    await apiRequest(CONFIG.AUTH.LOGOUT, 'POST');
    alert('Logged out successfully');
    window.location.href = '../index.html';
  } catch (error) {
    alert('Logout failed');
  }
}