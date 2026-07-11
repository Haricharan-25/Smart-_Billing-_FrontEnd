(() => {
  'use strict';
  async function loadAdminDashboard() {

    try {
const token = localStorage.getItem("accessToken");

const response = await fetch(
    "http://127.0.0.1:8000/api/dashboard/admin/",
    {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
);

    if (!response.ok) {
    throw new Error("Failed to load dashboard");
}

const data = await response.json();

        // KPI Cards
        document.getElementById("kpiCustomers").textContent =
            data.total_users;

        document.getElementById("kpiActiveUsers").textContent =
            data.active_users;

        document.getElementById("kpiReports").textContent =
            data.reports;

        document.getElementById("kpiRevenue").textContent =
            "₹" + Number(data.total_revenue).toLocaleString("en-IN");
window.monthlyRevenue = data.monthly_revenue || [];
if (window.revenueChart) {
    window.revenueChart.data.datasets[0].data = data.monthly_revenue;
    window.revenueChart.update();
}
        // Recent Registrations
        const recentUsers =
            document.getElementById("recentRegistrations");

        recentUsers.innerHTML = "";

        data.recent_users.forEach(user => {

            const fullName =
                (`${user.first_name} ${user.last_name}`).trim()
                || user.username;

            recentUsers.innerHTML += `

            <li class="customer-item">

                <div class="customer-info">

                    <div class="customer-avatar">

                        ${fullName.charAt(0).toUpperCase()}

                    </div>

                    <div>

                        <div class="customer-name">

                            ${fullName}

                        </div>

                        <div class="customer-email">

                            ${user.email}

                        </div>

                    </div>

                </div>

                <div class="customer-amount">

                    ${user.role}

                </div>

            </li>

            `;

        });
        // ==========================
// Logged In Users
// ==========================

const usersList = document.getElementById("usersList");
const loggedCount = document.getElementById("loggedCount");

if (usersList) {

    usersList.innerHTML = "";

    data.logged_users.forEach(user => {

        const fullName =
            (`${user.first_name} ${user.last_name}`).trim()
            || user.username;

        usersList.innerHTML += `

        <li class="customer-item">

            <div class="customer-info">

                <div class="customer-avatar">

                    ${fullName.charAt(0).toUpperCase()}

                </div>

                <div>

                    <div class="customer-name">

                        ${fullName}

                    </div>

                    <div class="customer-email">

                        ${user.email}

                    </div>

                </div>

            </div>

            <div class="customer-amount">

                ${user.role}

            </div>

        </li>

        `;

    });
  

    loggedCount.textContent = data.logged_users.length;
  }
    // ==========================
// Recent Reports
// ==========================

const recentReports = document.getElementById("recentReports");

if (recentReports) {

    recentReports.innerHTML = "";

    data.recent_reports.forEach(report => {

        recentReports.innerHTML += `

        <li class="customer-item">

            <div class="customer-info">

                <div>

                    <div class="customer-name">
                        ${report.invoice_number}
                    </div>

                    <div class="customer-email">
                        ${report.customer}
                    </div>

                </div>

            </div>

            <div class="customer-amount">
                ₹${Number(report.amount).toLocaleString("en-IN")}
            </div>

        </li>

        `;

    });



}
// ==========================
// System Logs
// ==========================

const systemLogs = document.getElementById("systemLogs");

if (systemLogs) {

    systemLogs.innerHTML = "";

    data.system_logs.forEach(log => {

        systemLogs.innerHTML += `

        <li class="timeline-item">

           <div class="activity-title">

<i class="fa-solid fa-file-circle-check"></i>

${log.title}

</div>

            <div class="activity-time">
                ${log.time}
            </div>

        </li>

        `;

    });

  }

    }

    catch(error){

        console.error("Dashboard Error:",error);

    }

}

// =====================================================
// AUDIT LOG ICON
// =====================================================

function getAuditLogIcon(action) {

    const icons = {

        LOGIN_SUCCESS:
            "fa-solid fa-right-to-bracket",

        LOGIN_FAILED:
            "fa-solid fa-triangle-exclamation",

        LOGOUT:
            "fa-solid fa-right-from-bracket",

        PASSWORD_RESET_REQUEST:
            "fa-solid fa-key",

        PASSWORD_RESET_SUCCESS:
            "fa-solid fa-shield-halved",
    };


    return (
        icons[action]
        ||
        "fa-solid fa-circle-info"
    );
}


// =====================================================
// FORMAT AUDIT TIME
// =====================================================

function formatAuditTime(dateString) {

    if (!dateString) {
        return "";
    }


    const date =
        new Date(dateString);


    return date.toLocaleString(
        "en-IN",
        {
            timeZone:
                "Asia/Kolkata",

            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric",

            hour:
                "2-digit",

            minute:
                "2-digit",

            hour12:
                true
        }
    );
}


// =====================================================
// SAFE HTML OUTPUT
// =====================================================

function escapeHtml(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );
}
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user || user.role !== "admin") {
    window.location.replace("login.html");
}

  // ============================
  // Background particles labels
  // ============================
  const bg = document.getElementById('bgParticles');
  if (bg) {
    const words = ['Customers', 'Products', 'Reports', 'Revenue', 'Analytics'];
    for (let i = 0; i < 12; i++) {
      const el = document.createElement('span');
      el.className = 'particle';
      el.textContent = words[i % words.length];
      el.style.left = Math.random() * 100 + '%';
      el.style.top = 60 + Math.random() * 80 + '%';
      el.style.animationDuration = 28 + Math.random() * 20 + 's';
      bg.appendChild(el);
    }
  }

  // ============================
  // Mobile sidebar + drawer backdrop
  // ============================
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('drawerBackdrop');
  const toggle = document.getElementById('menuToggle');

  if (toggle && sidebar && backdrop) {
    toggle.addEventListener('click', () => {
      sidebar.classList.add('open');
      backdrop.classList.add('show');
    });

    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
    });
  }

  // ============================
  // Charts defaults
  // ============================
  if (window.Chart) {
    Chart.defaults.color = '#B8C7D9';
    Chart.defaults.font.family = "'Inter', sans-serif";
  }

// ============================
// Revenue Chart
// ============================

const revenueCanvas =
    document.getElementById("revenueChart");

if (revenueCanvas && window.Chart) {

    const ctx =
        revenueCanvas.getContext("2d");

    window.revenueChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],

            datasets: [
                {
                    label: "Revenue",

                    data: [
                        0, 0, 0, 0,
                        0, 0, 0, 0,
                        0, 0, 0, 0
                    ],

                    borderColor: "#00D4FF",

                    backgroundColor:
                        "rgba(0, 212, 255, 0.12)",

                    fill: true,

                    tension: 0.15,

                    pointRadius: 3,

                    pointHoverRadius: 6,

                    borderWidth: 3
                }
            ]
        },


        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {
                mode: "index",
                intersect: false
            },


            plugins: {

                legend: {
                    display: false
                },


                tooltip: {

                    backgroundColor:
                        "rgba(10, 20, 40, 0.95)",

                    borderColor: "#00D4FF",

                    borderWidth: 1,

                    padding: 12,

                    callbacks: {

                        label: (context) => {

                            return (
                                "Revenue: ₹" +
                                Number(
                                    context.parsed.y
                                ).toLocaleString("en-IN")
                            );

                        }

                    }

                }

            },


            scales: {

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {

                        color: "#94A3B8",

                        autoSkip: false,

                        maxRotation: 0,

                        minRotation: 0

                    }

                },


                y: {

                    beginAtZero: true,

                    grid: {
                        color:
                            "rgba(255,255,255,0.04)"
                    },

                    ticks: {

                        color: "#94A3B8",

                        callback: (value) => {

                            return (
                                "₹" +
                                Number(value)
                                    .toLocaleString("en-IN")
                            );

                        }

                    }

                }

            }

        }

    });

}

  // ============================
  // Logout handling
  // ============================
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.replace("login.html");

});
  }

  // ============================
  // Search (lightweight)
  // ============================
  const searchInput = document.getElementById('adminSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.trim();
      // No backend; keep it non-intrusive.
      if (term.length === 0) return;
    });
  }

  // ============================
  // Optional: Profile data from localStorage
  // ============================
 document.addEventListener("DOMContentLoaded", () => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const fullName =
        `${currentUser.first_name} ${currentUser.last_name}`.trim()
        || currentUser.username;

    const welcome = document.querySelector('#welcomeName');
    const pn = document.getElementById('profileName');
    const pa = document.getElementById('profileAvatar');
    const pr = document.getElementById('profileRole');

    if (welcome) welcome.textContent = fullName;
    if (pn) pn.textContent = fullName;

    if (pa) {

        pa.textContent = fullName
            .split(" ")
            .map(x => x[0])
            .join("");

    }

    if (pr) pr.textContent = currentUser.role;

    // Load dashboard AFTER page loads
  // Load dashboard data
loadAdminDashboard();

// Load real audit logs
loadAuditLogs();
});
})();
