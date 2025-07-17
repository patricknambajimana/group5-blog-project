
function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value.trim();
  const role = document.getElementById('reg-role').value;
  const msg = document.getElementById('reg-msg');

  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.some(u => u.username === username)) {
    msg.textContent = 'Username already exists';
    msg.style.color = 'red';
    return;
  }

  const newUser = { id: Date.now(), username, password, role };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  msg.textContent = 'Registered successfully! Redirecting to login...';
  msg.style.color = 'green';

  setTimeout(() => {
    window.location.href = 'Login.html';
  }, 1500);
}

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
      window.location.href = 'AdminDashboard.html';
    } else {
      window.location.href = 'AuthorDashboard.html';
    }
  }, 1500);
}
