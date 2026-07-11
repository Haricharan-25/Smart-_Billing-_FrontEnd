(() => {
    'use strict';


    // =====================================================
    // ADMIN ACCESS CHECK
    // =====================================================

    function requireAdmin() {

        const role = localStorage.getItem('userRole');

        if (role !== 'admin') {

            window.location.href = 'login.html';

            return false;
        }

        return true;
    }


    if (!requireAdmin()) return;



    // =====================================================
    // API URL
    // =====================================================

    const API_URL =
        'http://127.0.0.1:8000/api/admin/business-analytics/';



    // =====================================================
    // CHART VARIABLES
    // =====================================================

    let revenueChart = null;

    let userGrowthChart = null;

    let gstTrendChart = null;

    let revenueVsGstChart = null;



    // =====================================================
    // NUMBER FORMAT
    // =====================================================

    function formatCurrency(value) {

        return Number(value || 0).toLocaleString(
            'en-IN',
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }
        );
    }



    // =====================================================
    // GROWTH TEXT
    // =====================================================

    function growthText(value, label) {

        const growth = Number(value || 0);

        if (growth > 0) {

            return `▲ ${growth.toFixed(1)}% ${label}`;
        }

        if (growth < 0) {

            return `▼ ${Math.abs(growth).toFixed(1)}% ${label}`;
        }

        return `0% ${label}`;
    }



    // =====================================================
    // PROFILE
    // =====================================================

    function loadProfile() {

        try {

            const currentUser = JSON.parse(
                localStorage.getItem('currentUser') || 'null'
            );

            if (!currentUser) return;


            const profileName =
                document.getElementById('profileName');

            const profileAvatar =
                document.getElementById('profileAvatar');

            const profileRole =
                document.getElementById('profileRole');


            const name =
                currentUser.name ||
                currentUser.username ||
                currentUser.email ||
                'Admin';


            if (profileName) {

                profileName.textContent = name;
            }


            if (profileRole) {

                profileRole.textContent =
                    currentUser.role || 'Admin';
            }


            if (profileAvatar) {

                profileAvatar.textContent = name
                    .split(' ')
                    .filter(Boolean)
                    .map(word => word[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();
            }

        } catch (error) {

            console.error(
                'Profile Error:',
                error
            );
        }
    }



    // =====================================================
    // UPDATE KPI CARDS
    // =====================================================

    function updateKPIs(data) {

        const totalUsers =
            document.getElementById(
                'analyticsTotalUsers'
            );

        const totalRevenue =
            document.getElementById(
                'analyticsTotalRevenue'
            );

        const gstCollected =
            document.getElementById(
                'analyticsGstCollected'
            );

        const businessGrowth =
            document.getElementById(
                'analyticsBusinessGrowth'
            );


        if (totalUsers) {

            totalUsers.textContent =
                Number(data.total_users || 0)
                    .toLocaleString('en-IN');
        }


        if (totalRevenue) {

            totalRevenue.textContent =
                `₹${formatCurrency(
                    data.total_revenue
                )}`;
        }


        if (gstCollected) {

            gstCollected.textContent =
                `₹${formatCurrency(
                    data.gst_collected
                )}`;
        }


        if (businessGrowth) {

            businessGrowth.textContent =
                `${Number(
                    data.business_growth || 0
                ).toFixed(1)}%`;
        }



        // Growth descriptions

        const usersGrowth =
            document.getElementById(
                'analyticsUsersGrowth'
            );

        const revenueGrowth =
            document.getElementById(
                'analyticsRevenueGrowth'
            );

        const gstGrowth =
            document.getElementById(
                'analyticsGstGrowth'
            );


        if (usersGrowth) {

            usersGrowth.textContent =
                growthText(
                    data.users_growth,
                    'vs last month'
                );
        }


        if (revenueGrowth) {

            revenueGrowth.textContent =
                growthText(
                    data.revenue_growth,
                    'vs last month'
                );
        }


        if (gstGrowth) {

            gstGrowth.textContent =
                growthText(
                    data.gst_growth,
                    'vs last month'
                );
        }
    }



    // =====================================================
    // REVENUE CHART
    // =====================================================

  function renderRevenueChart(chartData) {

    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;

    const labels = chartData.map(item => item.month);
    const values = chartData.map(item => item.amount);

    if (revenueChart) {
        revenueChart.destroy();
    }

    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 340);
    gradient.addColorStop(0, 'rgba(0, 212, 255, 0.45)');
    gradient.addColorStop(1, 'rgba(0, 212, 255, 0.02)');

    revenueChart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: labels,

            datasets: [{
                label: 'Revenue',
                data: values,

                borderColor: '#00D4FF',
                backgroundColor: gradient,

                fill: true,
                tension: 0.45,

                borderWidth: 3,

                pointRadius: 4,
                pointHoverRadius: 8,

                pointBackgroundColor: '#00D4FF',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: 'index'
            },

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    backgroundColor: '#071A33',
                    titleColor: '#FFFFFF',
                    bodyColor: '#CBD5E1',
                    borderColor: 'rgba(0,212,255,.35)',
                    borderWidth: 1,
                    padding: 12,

                    callbacks: {
                        label: context =>
                            `Revenue: ₹${formatCurrency(context.parsed.y)}`
                    }
                }
            },

            scales: {
                x: {
                    ticks: {
                        color: '#94A3B8'
                    },

                    grid: {
                        display: false
                    }
                },

                y: {
                    beginAtZero: true,

                    ticks: {
                        color: '#94A3B8',

                        callback: value =>
                            `₹${formatCurrency(value)}`
                    },

                    grid: {
                        color: 'rgba(148,163,184,.08)'
                    }
                }
            }
        }
    });
}


    // =====================================================
    // USER GROWTH CHART
    // =====================================================
function renderUserGrowthChart(chartData) {

    const canvas = document.getElementById('userGrowthChart');
    if (!canvas) return;

    const labels = chartData.map(item => item.month);
    const values = chartData.map(item => item.users);

    if (userGrowthChart) {
        userGrowthChart.destroy();
    }

    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 340);
    gradient.addColorStop(0, 'rgba(167, 139, 250, 0.95)');
    gradient.addColorStop(1, 'rgba(124, 58, 237, 0.35)');

    userGrowthChart = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: labels,

            datasets: [{
                label: 'Registered Users',
                data: values,

                backgroundColor: gradient,
                borderColor: '#A78BFA',

                borderWidth: 1,
                borderRadius: 9,
                borderSkipped: false,

                hoverBackgroundColor: '#C4B5FD'
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    backgroundColor: '#071A33',
                    titleColor: '#FFFFFF',
                    bodyColor: '#CBD5E1',
                    borderColor: 'rgba(167,139,250,.40)',
                    borderWidth: 1,
                    padding: 12
                }
            },

            scales: {
                x: {
                    ticks: {
                        color: '#94A3B8'
                    },

                    grid: {
                        display: false
                    }
                },

                y: {
                    beginAtZero: true,

                    ticks: {
                        color: '#94A3B8',
                        precision: 0
                    },

                    grid: {
                        color: 'rgba(148,163,184,.08)'
                    }
                }
            }
        }
    });
}

    // =====================================================
    // GST TREND CHART
    // =====================================================
    function renderGstChart(chartData) {

    const canvas = document.getElementById('gstTrendChart');
    if (!canvas) return;

    const labels = chartData.map(item => item.month);

    const values = chartData.map(item =>
        Number(item.amount || item.gst || 0)
    );

    if (gstTrendChart) {
        gstTrendChart.destroy();
    }

    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 340);

    gradient.addColorStop(
        0,
        'rgba(34, 197, 94, 0.45)'
    );

    gradient.addColorStop(
        1,
        'rgba(34, 197, 94, 0.02)'
    );

    gstTrendChart = new Chart(ctx, {

        type: 'line',

        data: {
            labels: labels,

            datasets: [{
                label: 'GST Collected',

                data: values,

                borderColor: '#22C55E',

                backgroundColor: gradient,

                fill: true,

                tension: 0.4,

                borderWidth: 3,

                pointRadius: 4,

                pointHoverRadius: 8,

                pointBackgroundColor: '#22C55E',

                pointBorderColor: '#FFFFFF',

                pointBorderWidth: 2
            }]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: 'index'
            },

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    backgroundColor: '#071A33',

                    titleColor: '#FFFFFF',

                    bodyColor: '#CBD5E1',

                    borderColor: 'rgba(34,197,94,0.40)',

                    borderWidth: 1,

                    padding: 12,

                    callbacks: {

                        label: context =>
                            `GST: ₹${formatCurrency(
                                context.parsed.y
                            )}`
                    }
                }
            },

            scales: {

                x: {

                    ticks: {
                        color: '#94A3B8'
                    },

                    grid: {
                        display: false
                    }
                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: '#94A3B8',

                        callback: value =>
                            `₹${formatCurrency(value)}`
                    },

                    grid: {
                        color: 'rgba(148,163,184,0.08)'
                    }
                }
            }
        }
    });
}
function renderRevenueVsGst(chartData) {

    const canvas = document.getElementById('revenueVsGstChart');
    if (!canvas) return;

    const labels = chartData.map(item => item.month);
    const revenue = chartData.map(item => item.revenue);
    const gst = chartData.map(item => item.gst);

    if (revenueVsGstChart) {
        revenueVsGstChart.destroy();
    }

    revenueVsGstChart = new Chart(
        canvas.getContext('2d'),
        {
            data: {
                labels: labels,

                datasets: [
                    {
                        type: 'bar',

                        label: 'Revenue',
                        data: revenue,

                        backgroundColor: 'rgba(0,212,255,.65)',
                        borderColor: '#00D4FF',

                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false
                    },

                    {
                        type: 'line',

                        label: 'GST',
                        data: gst,

                        borderColor: '#F59E0B',
                        backgroundColor: '#F59E0B',

                        borderWidth: 3,
                        tension: 0.4,

                        pointRadius: 4,
                        pointHoverRadius: 8,

                        pointBackgroundColor: '#F59E0B',
                        pointBorderColor: '#FFFFFF',
                        pointBorderWidth: 2
                    }
                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                interaction: {
                    intersect: false,
                    mode: 'index'
                },

                plugins: {
                    legend: {
                        labels: {
                            color: '#CBD5E1',
                            usePointStyle: true,
                            padding: 20
                        }
                    },

                    tooltip: {
                        backgroundColor: '#071A33',
                        titleColor: '#FFFFFF',
                        bodyColor: '#CBD5E1',
                        borderColor: 'rgba(0,212,255,.30)',
                        borderWidth: 1,
                        padding: 12,

                        callbacks: {
                            label: context =>
                                `${context.dataset.label}: ₹${formatCurrency(
                                    context.parsed.y
                                )}`
                        }
                    }
                },

                scales: {
                    x: {
                        ticks: {
                            color: '#94A3B8'
                        },

                        grid: {
                            display: false
                        }
                    },

                    y: {
                        beginAtZero: true,

                        ticks: {
                            color: '#94A3B8',

                            callback: value =>
                                `₹${formatCurrency(value)}`
                        },

                        grid: {
                            color: 'rgba(148,163,184,.08)'
                        }
                    }
                }
            }
        }
    );
}

    // =====================================================
    // LOAD ANALYTICS FROM DJANGO
    // =====================================================

    async function loadBusinessAnalytics() {

        const token =
            localStorage.getItem('accessToken');


        if (!token) {

            console.error(
                'Access token not found'
            );

            return;
        }


        try {

            const response = await fetch(
                API_URL,
                {
                    method: 'GET',

                    headers: {

                        'Authorization':
                            `Bearer ${token}`,

                        'Content-Type':
                            'application/json'
                    }
                }
            );


           const responseText = await response.text();

if (!response.ok) {

    console.error(
        'Business Analytics API Error:',
        response.status,
        responseText
    );

    return;
}


let data;

try {

    data = JSON.parse(responseText);

} catch (error) {

    console.error(
        'Invalid JSON response from backend:',
        responseText
    );

    return;
}


console.log(
    'Business Analytics Data:',
    data
);


            updateKPIs(data);


            renderRevenueChart(
                data.revenue_chart || []
            );


            renderUserGrowthChart(
                data.user_growth_chart || []
            );


            renderGstChart(
                data.gst_chart || []
            );


            renderRevenueVsGst(
                data.revenue_vs_gst_chart || []
            );


        } catch (error) {

            console.error(
                'Cannot load Business Analytics:',
                error
            );
        }
    }



    // =====================================================
    // SEARCH
    // =====================================================

    function setupSearch() {

        const search =
            document.getElementById(
                'adminSearch'
            );


        if (!search) return;


        search.addEventListener(
            'input',
            event => {

                const query =
                    event.target.value
                        .trim()
                        .toLowerCase();


                document
                    .querySelectorAll('.card')
                    .forEach(card => {

                        const text =
                            card.textContent
                                .toLowerCase();


                        card.style.opacity =
                            !query ||
                            text.includes(query)
                                ? '1'
                                : '0.35';
                    });
            }
        );
    }



    // =====================================================
    // LOGOUT
    // =====================================================

    function setupLogout() {

        const logoutBtn =
            document.getElementById(
                'logoutBtn'
            );


        if (!logoutBtn) return;


        logoutBtn.addEventListener(
            'click',
            () => {

                localStorage.removeItem(
                    'accessToken'
                );

                localStorage.removeItem(
                    'refreshToken'
                );

                localStorage.removeItem(
                    'loggedIn'
                );

                localStorage.removeItem(
                    'currentUser'
                );

                localStorage.removeItem(
                    'userRole'
                );


                window.location.href =
                    'login.html';
            }
        );
    }



    // =====================================================
    // START PAGE
    // =====================================================

    document.addEventListener(
        'DOMContentLoaded',
        () => {

            loadProfile();

            setupSearch();

            setupLogout();

            loadBusinessAnalytics();
        }
    );

})();