function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const msg = document.getElementById('login-msg');

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const foundUser = users.find(u => u.username === username && u.password === password);

  if (!foundUser) {
    msg.textContent = 'Invalid credentials';
    msg.style.color = 'red';
    return;
  }

  localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
  msg.textContent = 'Login successful! Redirecting...';
  msg.style.color = 'green';

  setTimeout(() => {
    if (foundUser.role === 'admin') {
      window.location.href = '/src/pages/Admin.html';
    } else {
      window.location.href = '/src/pages/postBlog.html';
    }
  }, 1500);
}
