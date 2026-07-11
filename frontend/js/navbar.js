const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {

    const createMenu = document.getElementById("createMenu");
    const requestMenu = document.getElementById("requestMenu");
    const approvalMenu = document.getElementById("approvalMenu");

    if (createMenu)
        createMenu.style.display = "none";

    if (requestMenu)
        requestMenu.style.display = "none";

    if (approvalMenu)
        approvalMenu.style.display = "none";

    if (role === "Employee") {

        if (createMenu)
            createMenu.style.display = "inline";

        if (requestMenu)
            requestMenu.style.display = "inline";

    }
    else if (role === "Manager") {

        if (approvalMenu)
            approvalMenu.style.display = "inline";

    }
    else if (role === "Admin") {

        // Dashboard + Logout only

    }

});

function logout() {

    localStorage.clear();

    window.location.href = "login.html";

}