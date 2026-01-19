function openPinPopup(){
    document.getElementById("pinModal").style.display = "flex";
}

function closePinPopup(){
    document.getElementById("pinModal").style.display = "none";
}


// ------------Login Page------------//

let username,password;


const userAdmin = "admin";
const adminPassword = 1234;

function handleLogin() {
    let username = document.getElementById("username").value.trim();
    let password = Number(document.getElementById("password").value);
    if(username===userAdmin && password==adminPassword) {
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





//==================DASHBOARD PAGE==================//

//-------------Add Money-------------//
let totalAmount = 5000;
let addmoney;

function addMoney(){
    addmoney = Number(document.getElementById("addAmount").value);
    totalAmount += addmoney;
    document.getElementById("balance").innerHTML = totalAmount;
}


document.getElementById("addMoney").onclick = function() {
    addMoney();
};

//-------------Withdraw Money-------------//
let withdrawMoney;

function withdrawAmount(){
    withdrawMoney = Number(document.getElementById("withdrawAmount").value);
    if(withdrawMoney <= totalAmount){
        totalAmount -= withdrawMoney;
        if(totalAmount!=0){
        document.getElementById("balance").innerHTML = totalAmount;
        }
        else
           document.getElementById("balance").innerHTML = "0"; 
    }
    else{
        document.getElementById("low_Bal").innerHTML = "Your account balance is insufficient.";
        
        setTimeout(function () {
        low_Bal.innerHTML = "";
        }, 4000);


    }
}

document.getElementById("withdrawMoney").onclick = function() {
    withdrawAmount();
};



        
