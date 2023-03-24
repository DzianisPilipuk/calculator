let displayPrevious = "";
let displayCurrent = "0";
const previousOperation = document.getElementById("previous-operation");
const currentOperation = document.getElementById("current-operation");

previousOperation.textContent = displayPrevious;
currentOperation.textContent = displayCurrent;

document.addEventListener("keydown", addDigit);
function addDigit(e) {
    if (!isNaN(e.key)) {
        displayCurrent += e.key;
        updateCurrent();
    }
}
function updateCurrent() {
    currentOperation.textContent = displayCurrent;
}