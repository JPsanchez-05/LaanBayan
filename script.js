const sections = document.querySelectorAll('.page-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.15 });

sections.forEach((section) => observer.observe(section));

document.querySelectorAll('.nav-links button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const toggleBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
toggleBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
});

const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");

document.getElementById("showRegister").addEventListener("click", function(e){
    e.preventDefault();

    loginPanel.style.display = "none";
    registerPanel.style.display = "block";
});

document.getElementById("showLogin").addEventListener("click", function(e){
    e.preventDefault();

    registerPanel.style.display = "none";
    loginPanel.style.display = "block";
});