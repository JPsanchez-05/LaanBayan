// SCROLL-REVEAL SECTIONS
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

// NAV SMOOTH-SCROLL (only relevant if .nav-links buttons exist)
document.querySelectorAll('.nav-links button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// PASSWORD SHOW/HIDE TOGGLE
// Works for any .toggle-password button paired with the
// input inside its .input-wrap (login page has one, the
// registration page has two — Password + Confirm Password)
document.querySelectorAll('.toggle-password').forEach((btn) => {
  const input = btn.parentElement.querySelector('input');
  if (!input) return;

  btn.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });
});

// LOGIN / REGISTER PANEL SWITCH
// Only wired up if loginPanel/registerPanel/showRegister/showLogin
// actually exist on the page (they don't in the current index.html,
// which uses a single login panel with just a "Register here" link)
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

// LOGIN FORM SUBMIT — redirect to dashboard
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    window.location.href = "dashb.html";
  });
}

// REGISTRATION FORM SUBMIT (registration.html)
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

// MAIN DASHBOOARD

// SIDEBAR TOGGLE (dashb.html)
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');

if (sidebar && sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    const isExpanded = sidebar.classList.toggle('expanded');
    sidebarToggle.setAttribute('aria-expanded', isExpanded);
  });
}

document.querySelectorAll('.sidebar-link[data-page]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelectorAll('.sidebar-link[data-page]').forEach((l) => l.classList.remove('active'));
    link.classList.add('active');

    const targetPage = link.dataset.page;
    document.querySelectorAll('.dash-section').forEach((section) => {
      section.classList.toggle('active', section.dataset.section === targetPage);
    });
  });
});

// Live clock
// Live clock — now updates every .dash-clock element on the page
function updateDashClock() {
  const clockEls = document.querySelectorAll('.dash-clock');
  if (!clockEls.length) return;

  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const formatted = `${hours}:${minutes} ${period}`;
  clockEls.forEach((el) => { el.textContent = formatted; });
}

updateDashClock();
setInterval(updateDashClock, 30 * 1000);

// ANNOUNCEMENT CARDS — expand/collapse on click
document.querySelectorAll('.announcement-card').forEach((card) => {
  card.addEventListener('click', () => {
    const isOpen = card.classList.toggle('is-open');
    card.setAttribute('aria-expanded', isOpen);
  });
});


//QUEUE PAGE

// MY QUEUE — data-driven, backend-ready
//
// Replace fetchActiveQueue() with a real Supabase query once the
// `Appointment` table exists, filtered to the logged-in resident and
// status in ('processing', 'in_queue', 'served'), e.g.:
//   const { data } = await supabase.from('appointments')
//     .select('*').eq('resident_id', currentResidentId).neq('status', 'done');
//
// Replace fetchAppointmentHistory() with a query for that resident's
// completed/cancelled appointments, ordered by date descending.

const QUEUE_STATUS_LABELS = {
  processing: 'Processing',
  in_queue: 'In Queue',
  served: 'Served',
};

async function fetchActiveQueue() {
  // PLACEHOLDER DATA — swap for Supabase fetch above
  return [
    {
      id: 'q1',
      serviceName: 'Certificate of Indigency',
      estimatedMinutes: 20,
      status: 'processing',
      requirements: ['Valid ID', 'Proof of Residency', 'Sworn Affidavit'],
      queueNumber: '14-081',
    },
    {
      id: 'q2',
      serviceName: 'Cedula',
      estimatedMinutes: 15,
      status: 'in_queue',
      requirements: ['Valid ID', 'Previous Year Cedula (if applicable)'],
      queueNumber: '15-021',
    },
    {
      id: 'q3',
      serviceName: 'Barangay ID',
      estimatedMinutes: 10,
      status: 'served',
      requirements: ['PSA Birth Certificate', '2×2 Picture', 'Proof of Residency'],
      queueNumber: '12-015',
    },
  ];
}

async function fetchAppointmentHistory() {
  // PLACEHOLDER DATA — swap for Supabase fetch above
  return [
    { service: 'Cedula Request', date: '02/14/26', status: 'Cancelled' },
    { service: 'Certificate of Indigency', date: '07/10/26', status: 'Done' },
    { service: 'Business Permit', date: '09/11/26', status: 'Done' },
  ];
}

function renderActiveQueue(queueItems) {
  const list = document.getElementById('queueActiveList');
  if (!list) return;

  list.innerHTML = '';

  queueItems.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'queue-card';
    card.dataset.queueId = item.id;

    const chipsHtml = item.requirements
      .map((req) => {
        const match = req.match(/^(.*)\s\((.*)\)$/);
        if (match) {
          return `<span class="queue-chip">${match[1]} <span class="queue-chip-note">(${match[2]})</span></span>`;
        }
        return `<span class="queue-chip">${req}</span>`;
      })
      .join('');

    card.innerHTML = `
      <div class="queue-card-top">
        <span class="queue-card-name">${item.serviceName}</span>
        <span class="queue-status queue-status--${item.status.replace('_', '-')}">${QUEUE_STATUS_LABELS[item.status] || item.status}</span>
      </div>
      <div class="queue-card-duration">${item.estimatedMinutes} mins</div>
      <div class="queue-chips">${chipsHtml}</div>
      <div class="queue-card-footer">
        <span class="queue-number">${item.queueNumber}</span>
      </div>
    `;

    list.appendChild(card);
  });
}

function renderQueueHistory(historyItems, minRows = 6) {
  const body = document.getElementById('queueHistoryBody');
  if (!body) return;

  body.innerHTML = '';

  historyItems.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.service}</td>
      <td>${row.date}</td>
      <td>${row.status}</td>
    `;
    body.appendChild(tr);
  });

  const emptyRowsNeeded = Math.max(0, minRows - historyItems.length);
  for (let i = 0; i < emptyRowsNeeded; i++) {
    const tr = document.createElement('tr');
    tr.className = 'is-empty-row';
    tr.innerHTML = `<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>`;
    body.appendChild(tr);
  }
}

async function initQueue() {
  const [activeQueue, history] = await Promise.all([
    fetchActiveQueue(),
    fetchAppointmentHistory(),
  ]);
  renderActiveQueue(activeQueue);
  renderQueueHistory(history);
}

initQueue();