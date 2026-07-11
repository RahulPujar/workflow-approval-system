const approvalToken = localStorage.getItem("token");
const approvalRole = localStorage.getItem("role");

if (!approvalToken) {
    window.location.href = "login.html";
}

if (approvalRole !== "Manager") {
    alert("Access Denied");
    window.location.href = "dashboard.html";
}

loadPending();

async function loadPending() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/requests",
            {
                headers: {
                    Authorization: "Bearer " + approvalToken
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch requests");
        }

        const requests = await response.json();

        const table = document.getElementById("approvalTable");
        table.innerHTML = "";

        const pendingRequests = requests.filter(
            request => request.status === "Pending"
        );

        if (pendingRequests.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="4">
                        🎉 No Pending Requests
                    </td>
                </tr>
            `;

            return;
        }

        pendingRequests.forEach(request => {

            let priorityClass = "";

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
                <tr>
                    <td>${request.title}</td>
                    <td>${request.created_by}</td>
                    <td>
                        <span class="priority ${priorityClass}">
                            ${request.priority}
                        </span>
                    </td>
                    <td>
                        <button
                            class="approve-btn"
                            onclick="approve(${request.id})">
                            Approve
                        </button>

                        <button
                            class="reject-btn"
                            onclick="reject(${request.id})">
                            Reject
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error loading pending requests:", error);
    }
}

async function approve(id) {

    if (!confirm("Approve this request?")) {
        return;
    }

    const response = await fetch(
        "http://127.0.0.1:8000/approve/" + id,
        {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + approvalToken
            }
        }
    );

    if (response.ok) {
        alert("✅ Request Approved Successfully");
        loadPending();
    }
}

async function reject(id) {

    if (!confirm("Reject this request?")) {
        return;
    }

    const response = await fetch(
        "http://127.0.0.1:8000/reject/" + id,
        {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + approvalToken
            }
        }
    );

    if (response.ok) {
        alert("❌ Request Rejected");
        loadPending();
    }
}