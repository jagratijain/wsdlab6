const form = document.getElementById("registration-form");
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const dobInput = document.getElementById("dob");
const submitBtn = document.getElementById("submit-btn");

const errorMessages = {
  fullName: document.getElementById("full-name-error"),
  email: document.getElementById("email-error"),
  password: document.getElementById("password-error"),
  confirmPassword: document.getElementById("confirm-password-error"),
  dob: document.getElementById("dob-error"),
};

// Real-time validation for each input
fullNameInput.addEventListener("input", validateFullName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validateConfirmPassword);
dobInput.addEventListener("input", validateDOB);

// Password match validation
confirmPasswordInput.addEventListener("input", checkPasswordMatch);

// Form submission
form.addEventListener("submit", handleSubmit);

// Validation functions
function validateFullName() {
  const fullName = fullNameInput.value.trim();
  if (/^[A-Za-z ]{3,}$/.test(fullName)) {
    setError("fullName", "");
  } else {
    setError("fullName", "Full name must have at least 3 alphabetic characters.");
  }
}

function validateEmail() {
  const email = emailInput.value.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "");
  } else {
    setError("email", "Enter a valid email address.");
  }
}

function validatePassword() {
  const password = passwordInput.value;
  if (/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
    setError("password", "");
  } else {
    setError("password", "Password must be at least 8 characters and include letters and numbers.");
  }
}

function validateConfirmPassword() {
  const confirmPassword = confirmPasswordInput.value;
  const password = passwordInput.value;
  if (confirmPassword === password) {
    setError("confirmPassword", "");
  } else {
    setError("confirmPassword", "Passwords do not match.");
  }
}

function validateDOB() {
  const dob = new Date(dobInput.value);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dob.getFullYear();
  if (age >= 18) {
    setError("dob", "");
    submitBtn.removeAttribute("disabled");
  } else {
    setError("dob", "You must be at least 18 years old.");
    submitBtn.setAttribute("disabled", "true");
  }
}

function checkPasswordMatch() {
  const confirmPassword = confirmPasswordInput.value;
  const password = passwordInput.value;
  if (confirmPassword === password) {
    setError("confirmPassword", "");
  } else {
    setError("confirmPassword", "Passwords do not match.");
  }
}

function setError(field, message) {
  errorMessages[field].textContent = message;
}

function handleSubmit(event) {
  event.preventDefault();
  // Perform final validation before submitting data to the server
  validateFullName();
  validateEmail();
  validatePassword();
  validateConfirmPassword();
  validateDOB();

  // If there are no error messages, the form is valid and can be submitted
  if (!errorMessages.fullName.textContent &&
      !errorMessages.email.textContent &&
      !errorMessages.password.textContent &&
      !errorMessages.confirmPassword.textContent &&
      !errorMessages.dob.textContent) {
    alert("Form submitted successfully!");
    // You can add code here to send the form data to the server
  }
}
