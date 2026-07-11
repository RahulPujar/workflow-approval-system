const requestToken = localStorage.getItem("token");

loadRequests();

async function loadRequests() {

    const response = await fetch(

        "http://127.0.0.1:8000/requests",

        {
            headers: {
                Authorization: "Bearer " + requestToken
            }
        }

    );

    const requests =
        await response.json();

    const table =
        document.getElementById(
            "requestTable"
        );

    table.innerHTML = "";

    if (requests.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="4">
                    No requests found.
                </td>
            </tr>
        `;

        return;
    }

    requests.forEach(request => {

        let statusClass = "";
        let priorityClass = "";

        switch (request.status) {

            case "Pending":
                statusClass = "pending";
                break;

            case "Approved":
                statusClass = "approved";
                break;

            case "Rejected":
                statusClass = "rejected";
                break;

        }

        switch (request.priority) {

            case "High":
                priorityClass = "high";
                break;

            case "Medium":
                priorityClass = "medium";
                break;

            case "Low":
                priorityClass = "low";
                break;

        }

        table.innerHTML += `

        <tr onclick='showDetails(${JSON.stringify(request)})'>

            <td>${request.title}</td>

            <td>
                <span class="priority ${priorityClass}">
                    ${request.priority}
                </span>
            </td>

            <td>
                <span class="status ${statusClass}">
                    ${request.status}
                </span>
            </td>

            <td>
                ${new Date(request.created_date).toLocaleDateString()}
            </td>

        </tr>

        `;

    });

}

function showDetails(request) {

    document.getElementById(
        "modalTitle"
    ).innerText =
        request.title;

    document.getElementById(
        "modalPriority"
    ).innerHTML =
        `<span class="priority ${request.priority.toLowerCase()}">
            ${request.priority}
        </span>`;

    document.getElementById(
        "modalStatus"
    ).innerHTML =
        `<span class="status ${request.status.toLowerCase()}">
            ${request.status}
        </span>`;

    document.getElementById(
        "modalDescription"
    ).innerText =
        request.description;

    document.getElementById(
        "modal"
    ).style.display =
        "flex";

}

function closeModal() {

    document.getElementById(
        "modal"
    ).style.display =
        "none";

}