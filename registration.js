document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registration-form");
  const regUsername = document.getElementById("reg-username");
  const regPassword = document.getElementById("reg-password");
  const regConfirmPassword = document.getElementById("reg-confirm-password");
  const regRole = document.getElementById("reg-role");
  const registerBtn = document.getElementById("register-btn");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  function getOrCreateError(input) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
      error = document.createElement("small");
      error.classList.add("error-message");
      input.insertAdjacentElement("afterend", error);
    }
    return error;
  }

  function clearErrors() {
    [regUsername, regPassword, regConfirmPassword, regRole].forEach((input) =>
      input.classList.remove("error")
    );
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));
  }

  function registerForm() {
    clearErrors();

    let isValid = true;

    const usernameVal = regUsername.value.trim();
    const passwordVal = regPassword.value;
    const confirmPasswordVal = regConfirmPassword.value;
    const roleVal = regRole.value;

    const usernameError = getOrCreateError(regUsername);
    const passwordError = getOrCreateError(regPassword);
    const confirmError = getOrCreateError(regConfirmPassword);
    const roleError = getOrCreateError(regRole);

    if (usernameVal === "") {
      usernameError.textContent = "Username is required.";
      regUsername.classList.add("error");
      isValid = false;
    } else if (users.some((u) => u.username === usernameVal)) {
      usernameError.textContent = "Username already exists.";
      regUsername.classList.add("error");
      isValid = false;
    }

    if (passwordVal.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      regPassword.classList.add("error");
      isValid = false;
    }

    if (confirmPasswordVal !== passwordVal) {
      confirmError.textContent = "Passwords do not match.";
      regConfirmPassword.classList.add("error");
      isValid = false;
    }

    if (!roleVal) {
      roleError.textContent = "Please select a role.";
      regRole.classList.add("error");
      isValid = false;
    }

    if (!isValid) return;

    const newUser = {
      id: Date.now(),
      username: usernameVal,
      password: passwordVal,
      role: roleVal,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    registrationForm.reset();

    registerBtn.textContent = "Registered successful";
    setTimeout(() => {
      registerBtn.textContent = "Register";
    }, 2000);
  }

  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm();
  });
});
