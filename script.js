// DOM Elements
const welcomeScreen = document.getElementById("welcome-screen");
const mainApp = document.getElementById("main-app");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const switchToRegister = document.getElementById("switch-to-register");
const switchToLogin = document.getElementById("switch-to-login");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const registerUsername = document.getElementById("register-username");
const registerPassword = document.getElementById("register-password");

// Handle switching between login and register forms
switchToRegister.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

switchToLogin.addEventListener("click", () => {
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

// Handle user registration
registerBtn.addEventListener("click", () => {
  const username = registerUsername.value.trim();
  const password = registerPassword.value.trim();

  if (!username || !password) {
    alert("Please fill in all fields!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username]) {
    alert("Username already exists!");
    return;
  }

  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account created successfully! You can now log in.");
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

// Handle user login
loginBtn.addEventListener("click", () => {
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username] && users[username] === password) {
    alert("Login successful!");
    welcomeScreen.classList.add("hidden");
    mainApp.classList.remove("hidden");
  } else {
    alert("Invalid username or password!");
  }
// DOM Elements
const lengthInput = document.getElementById("length");
const includeLowercase = document.getElementById("include-lowercase");
const includeUppercase = document.getElementById("include-uppercase");
const includeNumbers = document.getElementById("include-numbers");
const includeSymbols = document.getElementById("include-symbols");
const generateBtn = document.getElementById("generate-btn");
const passwordInput = document.getElementById("password");
const appNameInput = document.createElement("input");
const saveBtn = document.createElement("button");
const passwordList = document.getElementById("password-list");

// إضافة إدخال لاسم التطبيق وزر الحفظ
appNameInput.type = "text";
appNameInput.placeholder = "Enter Application Name";
appNameInput.style.marginTop = "10px";
passwordInput.parentNode.appendChild(appNameInput);

saveBtn.textContent = "Save Password";
saveBtn.style.marginTop = "10px";
passwordInput.parentNode.appendChild(saveBtn);

// الحروف والعناصر
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

// استعادة كلمات السر المحفوظة عند بدء التطبيق
function loadPasswords() {
  const savedPasswords = JSON.parse(localStorage.getItem("savedPasswords")) || [];
  passwordList.innerHTML = "";

  savedPasswords.forEach(({ appName, password }) => {
    const li = document.createElement("li");
    li.textContent = `App: ${appName} - Password: ${password}`;
    passwordList.appendChild(li);
  });
}

// حفظ كلمات السر في localStorage
function savePasswordToLocalStorage(appName, password) {
  const savedPasswords = JSON.parse(localStorage.getItem("savedPasswords")) || [];
  savedPasswords.push({ appName, password });
  localStorage.setItem("savedPasswords", JSON.stringify(savedPasswords));
}

// توليد كلمة السر
function generatePassword(length) {
  let charPool = "";

  if (includeLowercase.checked) charPool += lowercaseChars;
  if (includeUppercase.checked) charPool += uppercaseChars;
  if (includeNumbers.checked) charPool += numbers;
  if (includeSymbols.checked) charPool += symbols;

  if (!charPool) {
    return "Please select at least one character type!";
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }

  return password;
}

// نسخ كلمة السر
passwordInput.addEventListener("click", () => {
  if (passwordInput.value) {
    navigator.clipboard.writeText(passwordInput.value).then(() => {
      alert("Password copied to clipboard!");
    }).catch(err => {
      alert("Failed to copy password: " + err);
    });
  }
});

// حفظ كلمة السر مع اسم التطبيق
saveBtn.addEventListener("click", () => {
  const password = passwordInput.value;
  const appName = appNameInput.value.trim();

  if (!password) {
    alert("No password to save!");
    return;
  }

  if (!appName) {
    alert("Please enter the application name!");
    return;
  }

  savePasswordToLocalStorage(appName, password);

  const li = document.createElement("li");
  li.textContent = `App: ${appName} - Password: ${password}`;
  passwordList.appendChild(li);

  // إعادة تعيين الحقول
  appNameInput.value = "";
  passwordInput.value = "";

  alert("Password saved!");
});

// ربط الزر بوظيفة التوليد
generateBtn.addEventListener("click", () => {
  const length = parseInt(lengthInput.value, 10);

  if (!length || length < 4 || length > 20) {
    alert("Please choose a length between 4 and 20 characters.");
    return;
  }

  const password = generatePassword(length);
  passwordInput.value = password;
});

// تحميل كلمات السر عند بدء التطبيق
loadPasswords();

});

// Main app functionality remains the same...