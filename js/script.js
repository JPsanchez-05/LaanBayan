// ---------------------------------------------------------
// SCROLL-REVEAL SECTIONS
// ---------------------------------------------------------
const sections = document.querySelectorAll('.page-section');

if (sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15 });

  sections.forEach((section) => observer.observe(section));
}

// ---------------------------------------------------------
// NAV SMOOTH-SCROLL (only relevant if .nav-links buttons exist)
// ---------------------------------------------------------
document.querySelectorAll('.nav-links button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ---------------------------------------------------------
// PASSWORD SHOW/HIDE TOGGLE
// Works for any .toggle-password button paired with the
// input inside its .input-wrap (login page has one, the
// registration page has two — Password + Confirm Password)
// ---------------------------------------------------------
document.querySelectorAll('.toggle-password').forEach((btn) => {
  const input = btn.parentElement.querySelector('input');
  if (!input) return;

  btn.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });
});

// ---------------------------------------------------------
// LOGIN / REGISTER PANEL SWITCH
// Only wired up if loginPanel/registerPanel/showRegister/showLogin
// actually exist on the page (they don't in the current index.html,
// which uses a single login panel with just a "Register here" link)
// ---------------------------------------------------------
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

if (showRegister && loginPanel && registerPanel) {
  showRegister.addEventListener("click", function (e) {
    e.preventDefault();
    loginPanel.style.display = "none";
    registerPanel.style.display = "block";
  });
}

if (showLogin && loginPanel && registerPanel) {
  showLogin.addEventListener("click", function (e) {
    e.preventDefault();
    registerPanel.style.display = "none";
    loginPanel.style.display = "block";
  });
}

// ---------------------------------------------------------
// LOGIN FORM SUBMIT — redirect to dashboard
// ---------------------------------------------------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    window.location.href = "dashb.html";
  });
}

// ---------------------------------------------------------
// REGISTRATION FORM SUBMIT (registration.html)
// ---------------------------------------------------------
const registerForm = document.getElementById("registerForm");
const registerError = document.getElementById("registerError");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("regPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const agreeTerms = document.getElementById("agreeTerms");

    const passwordsMatch = password && confirmPassword && password.value === confirmPassword.value;
    const formIsValid = registerForm.checkValidity() && passwordsMatch;

    if (!formIsValid) {
      if (registerError) registerError.hidden = false;
      return;
    }

    if (registerError) registerError.hidden = true;

    // No backend yet — once Supabase auth is wired up, submit the
    // form data here instead of redirecting straight to login.
    window.location.href = "index.html";
  });
}

// ---------------------------------------------------------
// SIDEBAR TOGGLE (dashb.html)
// ---------------------------------------------------------
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');

if (sidebar && sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    const isExpanded = sidebar.classList.toggle('expanded');
    sidebarToggle.setAttribute('aria-expanded', isExpanded);
  });
}

document.querySelectorAll('.sidebar-link[data-page]').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-link[data-page]').forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
  });
});