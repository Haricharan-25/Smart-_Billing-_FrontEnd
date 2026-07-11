(() => {
  'use strict';

  let users = [];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return iso;
      return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });
    } catch {
      return iso;
    }
  };

 const escapeHtml = (s) => String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const initials = (name) =>
    String(name || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('');

  const toastEl = $('#toast');
  const toast = (message, type = 'success') => {
    if (!toastEl) return;
    toastEl.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'check' : type === 'danger' ? 'xmark' : 'circle-info'}"></i> ${escapeHtml(message)}`;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove('show'), 2500);
  };

  const sidebar = $('#sidebar');
  const drawerBackdrop = $('#drawerBackdrop');
  const menuBtn = $('#menuBtn');

  const topSearch = $('#topSearch');
  const tableSearch = $('#tableSearch');
  const filterStatus = $('#filterStatus');
  const filterCity = $('#filterCity');
  const filterState = $('#filterState');
  const sortBy = $('#sortBy');
  const resetBtn = $('#resetBtn');

  const kpiTotal = $('#kpiTotal');
  const kpiActive = $('#kpiActive');
  const kpiNew = $('#kpiNew');
  const kpiInactive = $('#kpiInactive');

  const tableBody = $('#tableBody');
  const customerTable = $('#customerTable');
  const emptyState = $('#emptyState');
  const resultCount = $('#resultCount');
  const pagination = $('#pagination');

  const activityList = $('#activityList');
  const locationList = $('#locationList');

  const exportBtn = $('#exportBtn');

  const profilePanel = $('#profilePanel');
  const panelBackdrop = $('#panelBackdrop');
  const closePanel = $('#closePanel');
  const panelBody = $('#panelBody');

  if (menuBtn && sidebar && drawerBackdrop) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      drawerBackdrop.classList.add('open');
    });

    drawerBackdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      drawerBackdrop.classList.remove('open');
    });
  }

  const openProfile = (user) => {

    if (!profilePanel || !panelBackdrop || !panelBody) {
        return;
    }

    const fullName =
        `${user.first_name || ""} ${user.last_name || ""}`.trim()
        || user.username
        || "User";

    const statusText = user.is_active
        ? "Active"
        : "Inactive";

    const statusClass = user.is_active
        ? "badge badge-active"
        : "badge badge-blocked";

    const html = `
        <div class="panel-hero">

            <div class="panel-avatar">
                ${escapeHtml(initials(fullName))}
            </div>

            <div class="panel-name">
                ${escapeHtml(fullName)}
            </div>

            <div class="panel-company">
                ${escapeHtml(user.email || "—")}
            </div>

        </div>


        <div class="panel-section">

            <h4>Overview</h4>

            <div class="panel-row">

                <i class="fa-solid fa-id-card"></i>

                <div>
                    <div class="lbl">User ID</div>

                    <div class="val">
                        ${escapeHtml(user.id)}
                    </div>
                </div>

            </div>


            <div class="panel-row">

                <i class="fa-solid fa-user"></i>

                <div>
                    <div class="lbl">Username</div>

                    <div class="val">
                        ${escapeHtml(user.username || "—")}
                    </div>
                </div>

            </div>


            <div class="panel-row">

                <i class="fa-solid fa-clipboard-check"></i>

                <div>
                    <div class="lbl">Status</div>

                    <div class="val">

                        <span class="${statusClass}">
                            ${statusText}
                        </span>

                    </div>
                </div>

            </div>

        </div>


        <div class="panel-section">

            <h4>Contact</h4>

            <div class="panel-row">

                <i class="fa-solid fa-envelope"></i>

                <div>
                    <div class="lbl">Email</div>

                    <div class="val">
                        ${escapeHtml(user.email || "—")}
                    </div>
                </div>

            </div>


            <div class="panel-row">

                <i class="fa-solid fa-phone"></i>

                <div>
                    <div class="lbl">Phone</div>

                    <div class="val">
                        ${escapeHtml(user.phone || "—")}
                    </div>
                </div>

            </div>

        </div>


        <div class="panel-section">

            <h4>Timeline</h4>

            <div class="panel-row">

                <i class="fa-solid fa-clock"></i>

                <div>
                    <div class="lbl">Registered</div>

                    <div class="val">

                        ${
                            user.date_joined
                                ? escapeHtml(formatDate(user.date_joined))
                                : "—"
                        }

                    </div>
                </div>

            </div>


            <div class="panel-row">

                <i class="fa-solid fa-bolt"></i>

                <div>
                    <div class="lbl">Last Login</div>

                    <div class="val">

                        ${
                            user.last_login
                                ? escapeHtml(formatDate(user.last_login))
                                : "Never"
                        }

                    </div>
                </div>

            </div>

        </div>


        <div style="display:flex; gap:10px; align-items:center; justify-content:flex-end">

            <button class="btn-ghost" id="panelCloseBtn">
                <i class="fa-solid fa-arrow-left"></i>
                Back
            </button>

            <button class="btn-primary" id="panelExportBtn">
                <i class="fa-solid fa-file-export"></i>
                Export
            </button>

        </div>
    `;


    panelBody.innerHTML = html;

    profilePanel.classList.add("open");
    panelBackdrop.classList.add("open");


    const close = () => {

        profilePanel.classList.remove("open");
        panelBackdrop.classList.remove("open");

    };


    if (closePanel) {
        closePanel.onclick = close;
    }


    const panelCloseBtn = $("#panelCloseBtn");

    if (panelCloseBtn) {
        panelCloseBtn.addEventListener("click", close);
    }


    const panelExportBtn = $("#panelExportBtn");

    if (panelExportBtn) {

        panelExportBtn.addEventListener("click", () => {

            const blob = new Blob(
                [JSON.stringify(user, null, 2)],
                {
                    type: "application/json"
                }
            );

            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;
            a.download = `user_${user.id}.json`;

            a.click();

            URL.revokeObjectURL(url);

            toast(
                "User exported successfully",
                "success"
            );

        });
    }
};
const state = {
    query: '',
    status: '',
    city: '',
    region: '',
    sort: 'newest',
    page: 1,
    perPage: 8,
    filtered: []
};

 const applyFilters = () => {

    const q = state.query.trim().toLowerCase();

    let out = [...users];


    // ==========================
    // STATUS FILTER
    // ==========================

    if (state.status === "Active") {

        out = out.filter(
            (user) => user.is_active === true
        );

    } else if (state.status === "Inactive") {

        out = out.filter(
            (user) => user.is_active === false
        );
    }


    // ==========================
    // SEARCH
    // ==========================

    if (q) {

        out = out.filter((user) => {

            const fullName =
                `${user.first_name || ""} ${user.last_name || ""}`
                    .trim();

           const searchableText = [
    user.id,
    user.username,
    fullName,
    user.email
]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableText.includes(q);

        });
    }


    // ==========================
    // SORTING
    // ==========================

    switch (state.sort) {

        case "az":

            out.sort((a, b) => {

                const nameA =
                    `${a.first_name || ""} ${a.last_name || ""}`.trim()
                    || a.username
                    || "";

                const nameB =
                    `${b.first_name || ""} ${b.last_name || ""}`.trim()
                    || b.username
                    || "";

                return nameA.localeCompare(nameB);

            });

            break;


        case "za":

            out.sort((a, b) => {

                const nameA =
                    `${a.first_name || ""} ${a.last_name || ""}`.trim()
                    || a.username
                    || "";

                const nameB =
                    `${b.first_name || ""} ${b.last_name || ""}`.trim()
                    || b.username
                    || "";

                return nameB.localeCompare(nameA);

            });

            break;


        case "oldest":

            out.sort(
                (a, b) =>
                    new Date(a.date_joined) -
                    new Date(b.date_joined)
            );

            break;


        case "newest":

        default:

            out.sort(
                (a, b) =>
                    new Date(b.date_joined) -
                    new Date(a.date_joined)
            );

            break;
    }


    state.filtered = out;
};

 const renderKPIs = () => {

    const total = users.length;

    const active = users.filter(
        (user) => user.is_active === true
    ).length;

    const inactive = users.filter(
        (user) => user.is_active === false
    ).length;

    const now = new Date();

    const newThisMonth = users.filter((user) => {

        if (!user.date_joined) return false;

        const joinedDate = new Date(user.date_joined);

        return (
            joinedDate.getFullYear() === now.getFullYear() &&
            joinedDate.getMonth() === now.getMonth()
        );

    }).length;

    if (kpiTotal) {
        kpiTotal.textContent = String(total);
    }

    if (kpiActive) {
        kpiActive.textContent = String(active);
    }

    if (kpiInactive) {
        kpiInactive.textContent = String(inactive);
    }

    if (kpiNew) {
        kpiNew.textContent = String(newThisMonth);
    }
};
  const renderLocations = () => {
    if (!locationList) return;
    const map = new Map();

    users.forEach((c) => {

    if (!c.city) return;

    map.set(
        c.city,
        (map.get(c.city) || 0) + 1
    );

});
    const top = [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
    const max = top[0]?.[1] || 1;

    locationList.innerHTML = top
      .map(([city, count], i) => {
        const width = Math.round((count / max) * 100);
        return `
          <li class="rank-item">
            <div class="rank-num">#${i + 1}</div>
            <div class="rank-name">${escapeHtml(city)}</div>
            <div class="rank-bar"><span style="width:${width}%"></span></div>
            <div class="rank-count">${count}</div>
          </li>
        `;
      })
      .join('');
  };

  const renderActivity = () => {
    if (!activityList) return;
    const items = [
      { text: 'New customer added', tone: 'blue' },
      { text: 'GST details verified', tone: 'green' },
      { text: 'Status updated for a customer', tone: 'warn' },
      { text: 'Monthly customer report generated', tone: 'blue' }
    ];

    activityList.innerHTML = items
      .map((it) => {
        const dotClass = it.tone === 'green' ? 'green' : it.tone === 'warn' ? 'warn' : 'blue';
        return `
          <li class="tl-item">
            <div class="tl-dot ${dotClass}"></div>
            <div class="tl-body">
              <div class="tl-title">${escapeHtml(it.text)}</div>
              <div class="tl-meta">Just now</div>
            </div>
          </li>
        `;
      })
      .join('');
  };

  const fillFilterOptions = () => {
    if (filterCity) {
      const uniqueCities = [
    ...new Set(
        users.map((c) => c.city).filter(Boolean)
    )
].sort((a, b) => a.localeCompare(b));
      filterCity.innerHTML = `<option value="">All Cities</option>` + uniqueCities.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
    }
    if (filterState) {
     const uniqueStates = [
    ...new Set(
        users.map((c) => c.state).filter(Boolean)
    )
].sort((a, b) => a.localeCompare(b));
      filterState.innerHTML = `<option value="">All States</option>` + uniqueStates.map((s) => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
    }
  };
// =====================================================
// EDIT USER MODAL
// =====================================================

const editModalBackdrop = $("#editModalBackdrop");
const editModalClose = $("#editModalClose");
const editCancelBtn = $("#editCancelBtn");
const editUserForm = $("#editUserForm");

const editUserId = $("#editUserId");
const editFirstName = $("#editFirstName");
const editLastName = $("#editLastName");
const editEmail = $("#editEmail");
const editStatus = $("#editStatus");


const editUser = (user) => {

    editUserId.value = user.id;

    editFirstName.value =
        user.first_name || "";

    editLastName.value =
        user.last_name || "";

    editEmail.value =
        user.email || "";

    editStatus.value =
        user.is_active ? "true" : "false";

    editModalBackdrop.classList.add("open");
};


const closeEditModal = () => {

    editModalBackdrop.classList.remove("open");

    editUserForm.reset();
};


if (editModalClose) {

    editModalClose.addEventListener(
        "click",
        closeEditModal
    );
}


if (editCancelBtn) {

    editCancelBtn.addEventListener(
        "click",
        closeEditModal
    );
}


if (editModalBackdrop) {

    editModalBackdrop.addEventListener(
        "click",
        (e) => {

            if (e.target === editModalBackdrop) {
                closeEditModal();
            }

        }
    );
}


// =====================================================
// SAVE EDITED USER
// =====================================================

if (editUserForm) {

    editUserForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const userId = editUserId.value;

            const payload = {

                first_name:
                    editFirstName.value.trim(),

                last_name:
                    editLastName.value.trim(),

                email:
                    editEmail.value.trim(),

                is_active:
                    editStatus.value === "true"
            };


            try {

                const token =
                    localStorage.getItem(
                        "accessToken"
                    );


                const response = await fetch(

                    `http://127.0.0.1:8000/api/admin/users/${userId}/`,

                    {
                        method: "PATCH",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`
                        },

                        body:
                            JSON.stringify(payload)
                    }

                );


                const data =
                    await response.json();


                if (!response.ok) {

                    console.error(
                        "Update User Error:",
                        data
                    );

                    toast(
                        data.error ||
                        "Failed to update user",
                        "danger"
                    );

                    return;
                }


                const index =
                    users.findIndex(

                        (u) =>
                            Number(u.id) ===
                            Number(userId)

                    );


                if (index !== -1) {

                    users[index] =
                        data.user;

                }


                closeEditModal();

                renderKPIs();

                renderTable();

                toast(
                    "User updated successfully",
                    "success"
                );


            } catch (error) {

                console.error(
                    "Edit User Error:",
                    error
                );

                toast(
                    "Cannot connect to server",
                    "danger"
                );
            }

        }
    );
}
  const renderTable = () => {
    if (!tableBody || !pagination) return;

    applyFilters();

    const total = state.filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / state.perPage));
    state.page = Math.min(state.page, totalPages);

    const start = (state.page - 1) * state.perPage;
    const rows = state.filtered.slice(start, start + state.perPage);

   if (emptyState) {
    emptyState.style.display = total === 0 ? "flex" : "none";
}

if (resultCount) {
    resultCount.textContent = `${total} records`;
}

   tableBody.innerHTML = rows
    .map((c) => {

        const fullName =
            `${c.first_name || ""} ${c.last_name || ""}`.trim()
            || c.username;

        const statusBadge = c.is_active
            ? '<span class="badge badge-active">Active</span>'
            : '<span class="badge badge-blocked">Inactive</span>';

        return `
            <tr data-user-id="${c.id}">

                <td>${c.id}</td>

                <td>${escapeHtml(fullName)}</td>

                <td>${escapeHtml(c.email || "-")}</td>

               

                <td>
                    ${
                        c.date_joined
                            ? escapeHtml(formatDate(c.date_joined))
                            : "-"
                    }
                </td>

                <td>
                    ${
                        c.last_login
                            ? escapeHtml(formatDate(c.last_login))
                            : "Never"
                    }
                </td>

                <td>${statusBadge}</td>

                <td>
                  <div class="actions">

    <button
        class="act-btn act-edit"
        title="Edit"
    >
        <i class="fa-solid fa-pen"></i>
    </button>

    <button
        class="act-btn act-del"
        title="Delete"
    >
        <i class="fa-solid fa-trash"></i>
    </button>

</div>
                </td>

            </tr>
        `;
    })
    .join('');

    const makeBtn = (label, page, disabled = false, active = false) => {
      const cls = ['page-btn', active ? 'active' : ''].filter(Boolean).join(' ');
      return `<button class="${cls}" ${disabled ? 'disabled' : ''} data-page="${page}">${label}</button>`;
    };

    const pageButtons = [];
    pageButtons.push(makeBtn('Prev', Math.max(1, state.page - 1), state.page === 1));

    const windowSize = 5;
    const startPage = Math.max(1, state.page - Math.floor(windowSize / 2));
    const endPage = Math.min(totalPages, startPage + windowSize - 1);

    for (let p = startPage; p <= endPage; p++) pageButtons.push(makeBtn(String(p), p, false, p === state.page));

    pageButtons.push(makeBtn('Next', Math.min(totalPages, state.page + 1), state.page === totalPages));

    const info = `<div class="page-info">Page <b>${state.page}</b> of <b>${totalPages}</b></div>`;
    pagination.innerHTML = `${info}<div class="page-buttons">${pageButtons.join('')}</div>`;
$$('.page-btn', pagination).forEach((btn) => {

    btn.addEventListener('click', () => {

        const p = Number(
            btn.getAttribute('data-page')
        );

        if (!Number.isFinite(p)) return;

        state.page = p;

        renderTable();
    });

});

}; // END renderTable


// =====================================================
// TABLE ACTION BUTTONS
// =====================================================
if (tableBody) {

    tableBody.addEventListener("click", (e) => {

        const button = e.target.closest(".act-btn");

        if (!button) return;

        const row = button.closest("tr");

        if (!row) return;

        const userId = Number(
            row.getAttribute("data-user-id")
        );

        const user = users.find(
            (u) => Number(u.id) === userId
        );

        if (!user) {
            console.error("User not found:", userId);
            return;
        }


        // EDIT
        if (button.classList.contains("act-edit")) {

            editUser(user);

            return;
        }


        // DELETE
       if (button.classList.contains("act-del")) {

    deleteUser(user);

    return;
}

    });

}
// =====================================================
// DELETE USER
// =====================================================

const deleteUser = async (user) => {

    const fullName =
        `${user.first_name || ""} ${user.last_name || ""}`.trim()
        || user.username;

    const confirmed = confirm(
        `Are you sure you want to delete ${fullName}?`
    );

    if (!confirmed) return;


    try {

        const token =
            localStorage.getItem("accessToken");


        const response = await fetch(
            `http://127.0.0.1:8000/api/admin/users/${user.id}/`,
            {
                method: "DELETE",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        const data = await response.json();


        if (!response.ok) {

            console.error(
                "Delete User Error:",
                data
            );

            toast(
                data.message ||
                data.error ||
                "Failed to delete user",
                "danger"
            );

            return;
        }


        // Remove deleted user from frontend array
        users = users.filter(
            (u) => Number(u.id) !== Number(user.id)
        );


        // Re-render UI
        renderKPIs();
        renderTable();


        toast(
            data.message ||
            "User deleted successfully",
            "success"
        );


    } catch (error) {

        console.error(
            "Delete User Error:",
            error
        );

        toast(
            "Cannot connect to server",
            "danger"
        );
    }
};
  const syncSearch = (val) => {
    state.query = val;
    state.page = 1;
    renderTable();
  };

  if (topSearch) topSearch.addEventListener('input', (e) => syncSearch(e.target.value));

  if (tableSearch) {
    tableSearch.addEventListener('input', (e) => {
      if (topSearch && topSearch.value !== e.target.value) topSearch.value = e.target.value;
      syncSearch(e.target.value);
    });
  }

  if (filterStatus) filterStatus.addEventListener('change', (e) => { state.status = e.target.value; state.page = 1; renderTable(); });
  if (filterCity) filterCity.addEventListener('change', (e) => { state.city = e.target.value; state.page = 1; renderTable(); });
  if (filterState) filterState.addEventListener('change', (e) => { state.region = e.target.value; state.page = 1; renderTable(); });
  if (sortBy) sortBy.addEventListener('change', (e) => { state.sort = e.target.value; state.page = 1; renderTable(); });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.query = '';
      state.status = '';
      state.city = '';
      state.region = '';
      state.sort = 'newest';
      state.page = 1;

      if (topSearch) topSearch.value = '';
      if (tableSearch) tableSearch.value = '';
      if (filterStatus) filterStatus.value = '';
      if (filterCity) filterCity.value = '';
      if (filterState) filterState.value = '';
      if (sortBy) sortBy.value = 'newest';

      renderTable();
      toast('Filters reset', 'success');
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      applyFilters();
      const payload = state.filtered;
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'customers_export.json';
      a.click();
      URL.revokeObjectURL(url);
      toast('Exported customers successfully', 'success');
    });
  }

  if (panelBackdrop) {
    panelBackdrop.addEventListener('click', () => {
      if (profilePanel) profilePanel.classList.remove('open');
      panelBackdrop.classList.remove('open');
    });
  }

  if (closePanel) {
    closePanel.addEventListener('click', () => {
      if (profilePanel) profilePanel.classList.remove('open');
      if (panelBackdrop) panelBackdrop.classList.remove('open');
    });
  }

const init = async () => {

    try {

        const token = localStorage.getItem("accessToken");

        if (!token) {
            window.location.replace("login.html");
            return;
        }

        const response = await fetch(
            "http://127.0.0.1:8000/api/admin/users/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Users API Error:", errorData);
            return;
        }

        users = await response.json();

        console.log("Users from backend:", users);

        state.filtered = [...users];

       renderKPIs();
renderTable();
fillFilterOptions();
renderLocations();
renderActivity();

    } catch (error) {

        console.error("Failed to load users:", error);

    }

};
// =====================================================
// SECURE LOGOUT
// =====================================================

async function logout() {

    const accessToken =
        localStorage.getItem("accessToken");

    const refreshToken =
        localStorage.getItem("refreshToken");

    try {

        if (accessToken && refreshToken) {

            const response = await fetch(
                "http://127.0.0.1:8000/api/logout/",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },

                    body: JSON.stringify({
                        refresh: refreshToken
                    })
                }
            );

            let data = {};

            try {
                data = await response.json();
            } catch {
                data = {};
            }

            console.log(
                "Logout response:",
                response.status,
                data
            );
        }

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    } finally {

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userRole");

        window.location.replace("login.html");
    }
}


// Make function accessible to HTML onclick
window.logout = logout;


// =====================================================
// START ADMIN PAGE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const token =
            localStorage.getItem("accessToken");

        const role =
            localStorage.getItem("userRole");

        if (!token || role !== "admin") {

            window.location.replace("login.html");

            return;
        }

        init();
    }
);

})();