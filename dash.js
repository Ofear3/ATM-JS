
//==================DASHBOARD PAGE==================//
let username = localStorage.getItem("username");
document.getElementById("username").innerHTML = `${username}`;


//-------------Change Pin popup----------//
const pinModal = document.getElementById("pinModal");

document.getElementById("cngPin").onclick = function () {
    pinModal.style.display = "flex";
};

document.getElementById("closePinBtn").onclick = function () {
    pinModal.style.display = "none";
};

document.getElementById("savePinBtn").onclick = function () {
    savePin();
};

function closepin(){ 
    pinModal.style.display = "none";
}

//-------------save the  Pin popup----------//
function savePin() {
    let pinInput = document.getElementById("newPin");
    let newPin = pinInput.value.trim();

    if(newPin.length !== 4){
        document.getElementById("invalid_pin").innerHTML = "PIN must be 4 digits"
        setTimeout(function () {
            document.getElementById("invalid_pin").innerHTML = "";
            }, 3000);

        pinInput.value = "";   
    }
    else {
            localStorage.setItem("password", newPin); 
            document.getElementById("cng-pass").innerHTML = "PIN changed successfully"
            setTimeout(function () {
            document.getElementById("cng-pass").innerHTML = "";
            }, 2000);
        closepin();
        // alert("PIN changed successfully");
    }    
    
}


if (!localStorage.getItem("TA")) {
    localStorage.setItem("TA", 5000);
}
let totalAmount = Number(localStorage.getItem("TA"));

document.getElementById("balance").innerHTML = totalAmount;

//-------------Add Money-------------//

let addmoney;

function addMoney(){
    let addInput = document.getElementById("addAmount"); 
    addmoney = Number(addInput.value);

    totalAmount += addmoney;
    localStorage.setItem("TA", totalAmount);
    document.getElementById("balance").innerHTML = totalAmount;
    addInput.value = ""; 
}



document.getElementById("addMoney").onclick = function() {
    addMoney();
};

//-------------Withdraw Money-------------//


let withdrawMoney;

function withdrawAmount(){
    let withdrawInput = document.getElementById("withdrawAmount");
    withdrawMoney = Number(withdrawInput.value);
    if(withdrawMoney <= totalAmount){
        totalAmount -= withdrawMoney;
        localStorage.setItem("TA", totalAmount);   
        if(totalAmount!=0){ 
        document.getElementById("balance").innerHTML = totalAmount;
        }
        else
           document.getElementById("balance").innerHTML = totalAmount; 
    }
    else{
        document.getElementById("low_Bal").innerHTML = "Your account balance is insufficient.";
        
        setTimeout(function () {
        low_Bal.innerHTML = "";
        }, 4000);


    }

    withdrawInput.value = ""; 
}

document.getElementById("withdrawMoney").onclick = function() {
    withdrawAmount();
};



// -----------------------Log out ----------------- //
document.getElementById("logout").onclick = function() {
    window.location.href  = "login.html";
}