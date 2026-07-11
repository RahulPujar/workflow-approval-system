const createToken = localStorage.getItem("token");

async function createRequest() {

    const title = document.getElementById("title").value.trim();

    const description = document.getElementById("description").value.trim();

    const priority = document.getElementById("priority").value;

    const message = document.getElementById("message");

    message.innerHTML = "";

    if (title === "" || description === "") {

        message.innerHTML = "Please fill all fields.";

        return;

    }

    const response = await fetch(

        "http://127.0.0.1:8000/requests",

        {
            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization":"Bearer "+createToken

            },

            body: JSON.stringify({

                title,

                description,

                priority

            })

        }

    );

    const data = await response.json();

    if (response.ok) {

        alert("✅ Request Created Successfully");

        window.location.href = "dashboard.html";

    }

    else {

        message.innerHTML = data.detail;

    }

}