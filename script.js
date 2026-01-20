// ------------Login Page------------//

localStorage.setItem("username", "admin");
let userAdmin = localStorage.getItem("username");

if (!localStorage.getItem("password")) {
    localStorage.setItem("password", "1234");
}

let adminPassword = localStorage.getItem("password");

function handleLogin() {
    let username = document.getElementById("username").value.trim();
    localStorage.setItem("username", username);
    let password = document.getElementById("password").value.trim();
    let adminPassword = localStorage.getItem("password");
    if(password==adminPassword) {
        window.location.href = "dashboard.html";
        // console.log("Login Successfull");
    }
    else{
        document.getElementById("invalid__").innerHTML = "Invalid Username or Password";
        // console.log("Password is invalid");
        setTimeout(function () {
        invalid__.innerHTML = "";
        }, 4000);
    }
}

//-------------Login Form Submission-------------//
document.getElementById("loginForm").addEventListener("submit", preventForm);

function preventForm(e) {
    e.preventDefault();
    handleLogin();
}
