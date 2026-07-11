const dashboardToken = localStorage.getItem("token");

loadDashboard();

async function loadDashboard() {

    const response = await fetch(

        "http://127.0.0.1:8000/dashboard",

        {
            headers: {
                Authorization: "Bearer " + dashboardToken
            }
        }

    );

    if (!response.ok) {

        localStorage.clear();

        window.location.href = "login.html";

        return;

    }

    const data = await response.json();

    document.getElementById("welcome").innerHTML =
        "Welcome, " + data.username + " 👋";

    document.getElementById("total").innerText =
        data.total_requests;

    document.getElementById("pending").innerText =
        data.pending_requests;

    document.getElementById("approved").innerText =
        data.approved_requests;

    document.getElementById("rejected").innerText =
        data.rejected_requests;

}