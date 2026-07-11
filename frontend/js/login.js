async function login(){

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const message =
        document.getElementById("message");

    message.innerText = "";

    if(username==="" || password===""){

        message.innerText =
        "Please enter username and password";

        return;
    }

    const response = await fetch(
        "http://127.0.0.1:8000/login",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                username,
                password
            })
        }
    );

    const data = await response.json();

    if(response.ok){

        localStorage.setItem(
            "token",
            data.access_token
        );

        localStorage.setItem(
            "role",
            data.role
        );

        window.location.href =
        "dashboard.html";
    }

    else{

        message.innerText =
        data.detail;
    }

}