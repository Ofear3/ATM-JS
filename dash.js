// ------------------ Sidebar Navigation ------------------
const dashboardBtn = document.getElementById("dashboardBtn");
if (dashboardBtn) {
    dashboardBtn.onclick = function () {
        window.location.href = "dashboard.html";
    };
}

const historyBtn = document.getElementById("historyBtn");
if (historyBtn) {
    historyBtn.onclick = function () {
        window.location.href = "history.html";
    };
}

// ------------------ Logout ------------------
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
    logoutBtn.onclick = function () {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        window.location.href = "login.html";
    };
}

// =================== USERNAME ===================
const usernameEl = document.getElementById("username");
if (usernameEl) {
    let username = localStorage.getItem("username");
    usernameEl.innerHTML = `${username}`;
}

// =================== CHANGE PIN ===================
const pinModal = document.getElementById("pinModal");

const cngPinBtn = document.getElementById("cngPin");
if (cngPinBtn && pinModal) {
    cngPinBtn.onclick = function () {
        pinModal.style.display = "flex";
    };
}

const closePinBtn = document.getElementById("closePinBtn");
if (closePinBtn && pinModal) {
    closePinBtn.onclick = function () {
        pinModal.style.display = "none";
    };
}

const savePinBtn = document.getElementById("savePinBtn");
if (savePinBtn) {
    savePinBtn.onclick = function () {
        savePin();
    };
}

function closepin() {
    if (pinModal) pinModal.style.display = "none";
}

function savePin() {
    let pinInput = document.getElementById("newPin");
    if (!pinInput) return;

    let newPin = pinInput.value.trim();

    if (newPin.length !== 4) {
        document.getElementById("invalid_pin").innerHTML = "PIN must be 4 digits";
        setTimeout(function () {
            document.getElementById("invalid_pin").innerHTML = "";
        }, 3000);
        pinInput.value = "";
    } else {
        localStorage.setItem("password", newPin);

        // success message (dashboard page only)
        const successEl = document.getElementById("cng-pass");
        if (successEl) {
            successEl.innerHTML = "PIN changed successfully";
            setTimeout(function () {
                successEl.innerHTML = "";
            }, 2000);
        }

        closepin();
    }
}

// =================== BALANCE ===================
if (!localStorage.getItem("TA")) {
    localStorage.setItem("TA", 5000);
}
let totalAmount = Number(localStorage.getItem("TA"));

const balanceEl = document.getElementById("balance");
if (balanceEl) {
    balanceEl.innerHTML = totalAmount;
}

// =================== ADD MONEY ===================
let addmoney;

function addMoney() {
    let addInput = document.getElementById("addAmount");
    if (!addInput) return;

    addmoney = Number(addInput.value);

    if (addmoney <= 0) {
        document.getElementById("invalid_Bal").innerHTML = "Please enter a valid amount to add.";
        setTimeout(function () {
            document.getElementById("invalid_Bal").innerHTML = "";
        }, 4000);
    } else {
        totalAmount += addmoney;
        localStorage.setItem("TA", totalAmount);

        if (balanceEl) {
            balanceEl.innerHTML = totalAmount;
        }

        // Save history
        saveHistory("Added Money", addmoney);
    }
    addInput.value = "";
}

const addMoneyBtn = document.getElementById("addMoney");
if (addMoneyBtn) {
    addMoneyBtn.onclick = function () {
        addMoney();
    };
}

// =================== WITHDRAW MONEY ===================
let withdrawMoney;

function withdrawAmount() {
    let withdrawInput = document.getElementById("withdrawAmount");
    if (!withdrawInput)  return;
       

    withdrawMoney = Number(withdrawInput.value);

    if(withdrawMoney <= 0) {
        document.getElementById("low_Bal").innerHTML = "Please enter a valid amount to add."; 
    }
    else{  
    if (withdrawMoney <= totalAmount) {
        totalAmount -= withdrawMoney;
        localStorage.setItem("TA", totalAmount);

        if (balanceEl) {
            balanceEl.innerHTML = totalAmount;
        }

        // Save history
        saveHistory("Withdraw Money", withdrawMoney);
    } else {
        document.getElementById("low_Bal").innerHTML = "Your account balance is insufficient.";
        setTimeout(function () {
            document.getElementById("low_Bal").innerHTML = "";
        }, 4000);
    }
    }
    withdrawInput.value = "";
}

const withdrawMoneyBtn = document.getElementById("withdrawMoney");
if (withdrawMoneyBtn) {
    withdrawMoneyBtn.onclick = function () {
        withdrawAmount();
    };
}


// =================== HISTORY FUNCTION ===================
function saveHistory(type, amount) {
    let history = JSON.parse(localStorage.getItem("history")) || [];

    let now = new Date();
    let dateTime = now.toLocaleString();

    history.unshift({
        type: type,
        amount: amount,
        time: dateTime
    });

    localStorage.setItem("history", JSON.stringify(history));
}

function showHistory() {
    const historyList = document.getElementById("historyList");
    const noHistory = document.getElementById("noHistory");

    if (!historyList) return;

    let history = JSON.parse(localStorage.getItem("history")) || [];
    historyList.innerHTML = "";

    if (history.length === 0) {
        if (noHistory) noHistory.style.display = "block";
        return;
    }

    if (noHistory) noHistory.style.display = "none";

    history.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("history-item");

        let amountColor = item.type === "Withdraw Money" ? "red" : "green";

        li.innerHTML = `
            <div class="left">
                <div class="type">${item.type}</div>
                <div class="time">${item.time}</div>
            </div>
            <div class="amount" style="color:${amountColor};">৳ ${item.amount}</div>
        `;

        historyList.appendChild(li);
    });
}

// Clear history button
const clearBtn = document.getElementById("clearHistory");
if (clearBtn) {
    clearBtn.onclick = () => {
        localStorage.removeItem("history");
        showHistory();
    };
}

// call showHistory on history page
showHistory();
