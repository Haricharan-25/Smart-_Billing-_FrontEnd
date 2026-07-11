(() => {
    "use strict";

    // =====================================================
    // API CONFIGURATION
    // =====================================================

    const API_URL =
        "http://127.0.0.1:8000/api/admin/reports/";


    // =====================================================
    // ADMIN ACCESS CHECK
    // =====================================================

    function requireAdmin() {

        const role = localStorage.getItem("userRole");

        if (role !== "admin") {

            console.warn("Admin access required.");

            window.location.href = "login.html";

            return false;
        }

        return true;
    }


    if (!requireAdmin()) return;


    // =====================================================
    // GLOBAL DATA
    // =====================================================

    let reports = [];


    // =====================================================
    // HTML ELEMENTS
    // =====================================================

    const totalReports =
        document.getElementById("totalReports");

    const exportedReports =
        document.getElementById("exportedReports");

    const reportsThisMonth =
        document.getElementById("reportsThisMonth");

    const lastGenerated =
        document.getElementById("lastGenerated");


    const reportType =
        document.getElementById("reportType");

    const exportFormat =
        document.getElementById("exportFormat");

    const dateFrom =
        document.getElementById("dateFrom");

    const dateTo =
        document.getElementById("dateTo");


    const generateReportBtn =
        document.getElementById("generateReportBtn");

    const scrollToGeneratorBtn =
        document.getElementById("scrollToGeneratorBtn");


    const reportHistoryBody =
        document.getElementById("reportHistoryBody");

    const adminSearch =
        document.getElementById("adminSearch");


    // =====================================================
    // GET JWT TOKEN
    // =====================================================

    function getToken() {

        return localStorage.getItem("accessToken");

    }


    // =====================================================
    // SAFE HTML
    // =====================================================

    function escapeHtml(value) {

        return String(value ?? "")

            .replaceAll("&", "&amp;")

            .replaceAll("<", "&lt;")

            .replaceAll(">", "&gt;")

            .replaceAll('"', "&quot;")

            .replaceAll("'", "&#039;");
    }


    // =====================================================
    // SHOW MESSAGE
    // =====================================================

    function showMessage(message) {

        alert(message);

    }


    // =====================================================
    // LOAD REPORTS FROM DJANGO
    // =====================================================

    async function loadReports() {

        const token = getToken();


        if (!token) {

            console.error("Access token not found.");

            window.location.href = "login.html";

            return;
        }


        try {

            const response = await fetch(
                API_URL,
                {
                    method: "GET",

                    headers: {

                        "Authorization":
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json"
                    }
                }
            );


            let data;


            try {

                data = await response.json();

            } catch {

                throw new Error(
                    "Server returned invalid response."
                );
            }


            console.log(
                "Admin Reports API:",
                data
            );


            if (response.status === 401) {

                console.error(
                    "Authentication failed."
                );

                window.location.href =
                    "login.html";

                return;
            }


            if (response.status === 403) {

                showMessage(
                    "Access denied. Admin account required."
                );

                return;
            }


            if (!response.ok) {

                console.error(
                    "Reports API Error:",
                    data
                );

                showMessage(
                    data.message ||
                    "Unable to load reports."
                );

                return;
            }


            // Save reports globally

            reports = Array.isArray(data.reports)
                ? data.reports
                : [];


            // Update KPI cards

            updateKPIs(data);


            // Show report history

            renderReportHistory(reports);
            renderRecentDownloads(
    data.recent_downloads || []
);


        } catch (error) {

            console.error(
                "Load Reports Error:",
                error
            );


            showMessage(
                "Cannot connect to Django server."
            );
        }
    }


    // =====================================================
    // UPDATE KPI CARDS
    // =====================================================

    function updateKPIs(data) {

        if (totalReports) {

            totalReports.textContent =
                data.total_reports ?? 0;
        }


        if (exportedReports) {

            exportedReports.textContent =
                data.exported_reports ?? 0;
        }


        if (reportsThisMonth) {

            reportsThisMonth.textContent =
                data.reports_this_month ?? 0;
        }


        if (lastGenerated) {

            lastGenerated.textContent =
                data.last_generated || "Never";
        }
    }


    // =====================================================
    // RENDER REPORT HISTORY TABLE
    // =====================================================

    function renderReportHistory(reportList) {

        if (!reportHistoryBody) {

            console.error(
                "reportHistoryBody not found in HTML."
            );

            return;
        }


        if (!Array.isArray(reportList) ||
            reportList.length === 0) {

            reportHistoryBody.innerHTML = `

                <tr>

                    <td
                        colspan="6"
                        style="
                            text-align:center;
                            padding:30px;
                        "
                    >

                        No reports generated yet.

                    </td>

                </tr>

            `;

            return;
        }


        reportHistoryBody.innerHTML = reportList

            .map((report) => {

                return `

                    <tr>

                        <td>

                            ${escapeHtml(
                                report.report_id
                            )}

                        </td>


                        <td>

                            ${escapeHtml(
                                report.report_name
                            )}

                        </td>


                        <td>

                            ${escapeHtml(
                                report.generated_on
                            )}

                        </td>


                        <td>

                            ${escapeHtml(
                                report.export_format
                            )}

                        </td>


                        <td>

                            <span
                                class="badge badge-success"
                            >

                                ${escapeHtml(
                                    report.status
                                )}

                            </span>

                        </td>


                        <td>

                            <button
                                type="button"
                                class="
                                    icon-btn
                                    report-preview-btn
                                "
                                data-report-id="${report.id}"
                                title="Preview Report"
                            >

                                <i
                                    class="
                                        fa-solid
                                        fa-eye
                                    "
                                ></i>

                            </button>


                            <button
                                type="button"
                                class="
                                    icon-btn
                                    report-download-btn
                                "
                                data-report-id="${report.id}"
                                title="Download Report"
                            >

                                <i
                                    class="
                                        fa-solid
                                        fa-download
                                    "
                                ></i>

                            </button>

                        </td>

                    </tr>

                `;

            })

            .join("");
    }
// =====================================================
// RENDER RECENT DOWNLOADS
// =====================================================

function renderRecentDownloads(downloads) {

    const container =
        document.getElementById(
            "recentDownloads"
        );


    if (!container) {

        console.error(
            "recentDownloads element not found"
        );

        return;
    }


    if (
        !Array.isArray(downloads) ||
        downloads.length === 0
    ) {

        container.innerHTML = `

            <li class="timeline-item">

                No reports downloaded yet.

                <span class="muted">
                    Download a report to see it here.
                </span>

            </li>

        `;

        return;
    }


    container.innerHTML = downloads

        .map((report) => `

            <li class="timeline-item">

                ${escapeHtml(
                    report.file_name
                )}

                <span class="muted">

                    Downloaded
                    ${escapeHtml(
                        report.downloaded_at
                    )}

                </span>

            </li>

        `)

        .join("");
}

    // =====================================================
    // GENERATE NEW REPORT
    // =====================================================

    async function generateReport() {

        const token = getToken();


        if (!token) {

            window.location.href =
                "login.html";

            return;
        }


        const reportName =
            reportType?.value?.trim();

        const format =
            exportFormat?.value?.trim();

        const from =
            dateFrom?.value || "";

        const to =
            dateTo?.value || "";


        // Validate fields

        if (!reportName) {

            showMessage(
                "Please select a report type."
            );

            return;
        }


        if (!format) {

            showMessage(
                "Please select an export format."
            );

            return;
        }


        // Validate date range

        if (from && to && from > to) {

            showMessage(
                "From date cannot be after To date."
            );

            return;
        }


        try {

            // Disable button

            if (generateReportBtn) {

                generateReportBtn.disabled = true;

                generateReportBtn.innerHTML = `

                    <i
                        class="
                            fa-solid
                            fa-spinner
                            fa-spin
                        "
                    ></i>

                    Generating...

                `;
            }


            const response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },


                    body: JSON.stringify({

                        report_name:
                            reportName,

                        export_format:
                            format,

                        date_from:
                            from || null,

                        date_to:
                            to || null
                    })
                }
            );


            let data;


            try {

                data = await response.json();

            } catch {

                throw new Error(
                    "Invalid server response."
                );
            }


            console.log(
                "Generate Report Response:",
                data
            );


            if (!response.ok) {

                showMessage(
                    data.message ||
                    "Failed to generate report."
                );

                return;
            }


            showMessage(
                data.message ||
                "Report generated successfully."
            );


            // Clear dates

            if (dateFrom) {

                dateFrom.value = "";
            }


            if (dateTo) {

                dateTo.value = "";
            }


            // Reload reports and KPI data

            await loadReports();


        } catch (error) {

            console.error(
                "Generate Report Error:",
                error
            );


            showMessage(
                "Cannot connect to Django server."
            );


        } finally {

            // Restore button

            if (generateReportBtn) {

                generateReportBtn.disabled = false;

                generateReportBtn.innerHTML = `

                    <i
                        class="
                            fa-solid
                            fa-file-export
                        "
                    ></i>

                    Generate Report

                `;
            }
        }
    }


    // =====================================================
    // GENERATE REPORT BUTTON
    // =====================================================

    if (generateReportBtn) {

        generateReportBtn.addEventListener(
            "click",
            generateReport
        );
    }


    // =====================================================
    // TOP GENERATE BUTTON
    // =====================================================

    if (scrollToGeneratorBtn) {

        scrollToGeneratorBtn.addEventListener(
            "click",
            () => {

                generateReportBtn?.scrollIntoView({

                    behavior: "smooth",

                    block: "center"
                });

            }
        );
    }


    // =====================================================
    // SEARCH REPORTS
    // =====================================================

    if (adminSearch) {

        adminSearch.addEventListener(
            "input",
            (event) => {

                const query =
                    event.target.value
                        .trim()
                        .toLowerCase();


                if (!query) {

                    renderReportHistory(
                        reports
                    );

                    return;
                }


                const filteredReports =
                    reports.filter(
                        (report) => {

                            const reportId =
                                String(
                                    report.report_id || ""
                                )
                                .toLowerCase();


                            const reportName =
                                String(
                                    report.report_name || ""
                                )
                                .toLowerCase();


                            const format =
                                String(
                                    report.export_format || ""
                                )
                                .toLowerCase();


                            const reportStatus =
                                String(
                                    report.status || ""
                                )
                                .toLowerCase();


                            const generatedDate =
                                String(
                                    report.generated_on || ""
                                )
                                .toLowerCase();


                            return (

                                reportId.includes(query)

                                ||

                                reportName.includes(query)

                                ||

                                format.includes(query)

                                ||

                                reportStatus.includes(query)

                                ||

                                generatedDate.includes(query)

                            );
                        }
                    );


                renderReportHistory(
                    filteredReports
                );
            }
        );
    }
// =====================================================
// DOWNLOAD REPORT FILE
// =====================================================

async function downloadReport(
    reportId,
    reportCode,
    exportFormat
) {

    const token = getToken();


    if (!token) {

        window.location.href =
            "login.html";

        return;
    }


    try {

        const downloadUrl =
            `http://127.0.0.1:8000/api/admin/reports/${reportId}/download/`;


        const response = await fetch(
            downloadUrl,
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        // Handle API error response

        if (!response.ok) {

            let errorMessage =
                "Failed to download report.";


            try {

                const errorData =
                    await response.json();


                errorMessage =
                    errorData.message ||
                    errorMessage;

            } catch (error) {

                console.error(
                    "Cannot read error response:",
                    error
                );
            }


            showMessage(
                errorMessage
            );

            return;
        }


        // Convert response into downloadable file

        const blob =
            await response.blob();


        const blobUrl =
            window.URL.createObjectURL(
                blob
            );


        const link =
            document.createElement("a");


        // File extension

        let extension = "csv";


        if (
            String(exportFormat)
                .toLowerCase() === "pdf"
        ) {

            extension = "pdf";

        } else if (

            String(exportFormat)
                .toLowerCase() === "excel"

        ) {

            extension = "xlsx";
        }


        link.href = blobUrl;


        link.download =
            `${reportCode}.${extension}`;


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        window.URL.revokeObjectURL(
            blobUrl
        );


        console.log(
            "Report downloaded:",
            reportCode
        );


        // Refresh KPI cards because
        // exported_reports changes

        await loadReports();


    } catch (error) {

        console.error(
            "Download Report Error:",
            error
        );


        showMessage(
            "Cannot connect to Django server."
        );
    }
}

    // =====================================================
    // PREVIEW AND DOWNLOAD BUTTONS
    // =====================================================

    if (reportHistoryBody) {

        reportHistoryBody.addEventListener(
            "click",
            (event) => {

                // -----------------------------
                // PREVIEW BUTTON
                // -----------------------------

                const previewButton =
                    event.target.closest(
                        ".report-preview-btn"
                    );


                if (previewButton) {

                    const reportId =
                        Number(
                            previewButton.dataset.reportId
                        );


                    const report =
                        reports.find(
                            (item) =>
                                Number(item.id)
                                ===
                                reportId
                        );


                    if (!report) {

                        showMessage(
                            "Report not found."
                        );

                        return;
                    }


                    showMessage(

                        `Report ID: ${report.report_id}\n\n` +

                        `Report Name: ${report.report_name}\n\n` +

                        `Format: ${report.export_format}\n\n` +

                        `Generated On: ${report.generated_on}\n\n` +

                        `Status: ${report.status}`

                    );


                    return;
                }

// -----------------------------
// DOWNLOAD BUTTON
// -----------------------------

const downloadButton =
    event.target.closest(
        ".report-download-btn"
    );


if (downloadButton) {

    const reportId =
        Number(
            downloadButton.dataset.reportId
        );


    const report =
        reports.find(
            (item) =>
                Number(item.id) === reportId
        );


    if (!report) {

        showMessage(
            "Report not found."
        );

        return;
    }


    downloadReport(
        report.id,
        report.report_id,
        report.export_format
    );
}
            }
        );
    }


    // =====================================================
    // PROFILE INFORMATION
    // =====================================================

    function loadProfile() {

        let currentUser = null;


        try {

            currentUser = JSON.parse(

                localStorage.getItem(
                    "currentUser"
                )

                ||

                "null"
            );

        } catch (error) {

            console.error(
                "Invalid currentUser data:",
                error
            );
        }


        if (!currentUser) return;


        const profileName =
            document.getElementById(
                "profileName"
            );


        const profileAvatar =
            document.getElementById(
                "profileAvatar"
            );


        const profileRole =
            document.getElementById(
                "profileRole"
            );


        const fullName =

            currentUser.name

            ||

            `${currentUser.first_name || ""} ${
                currentUser.last_name || ""
            }`.trim()

            ||

            currentUser.username

            ||

            "Admin";


        if (profileName) {

            profileName.textContent =
                fullName;
        }


        if (profileRole) {

            profileRole.textContent =
                "Administrator";
        }


        if (profileAvatar) {

            const initials = fullName

                .split(" ")

                .filter(Boolean)

                .map(
                    (word) => word[0]
                )

                .slice(0, 2)

                .join("")

                .toUpperCase();


            profileAvatar.textContent =
                initials || "AD";
        }
    }


    // =====================================================
    // LOGOUT
    // =====================================================

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "loggedIn"
                );

                localStorage.removeItem(
                    "currentUser"
                );

                localStorage.removeItem(
                    "userRole"
                );

                localStorage.removeItem(
                    "accessToken"
                );

                localStorage.removeItem(
                    "refreshToken"
                );


                window.location.href =
                    "login.html";
            }
        );
    }


    // =====================================================
    // START PAGE
    // =====================================================

    loadProfile();

    loadReports();

})();