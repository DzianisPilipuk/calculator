let displayPrevious = "";
let operand_1;
let operand_2;
let operator;
let displayCurrent = "0";
const previousOperation = document.getElementById("previous-operation");
const currentOperation = document.getElementById("current-operation");
let operatorAvailable = false;
const operators = ["/", "*", "-", "+"];

currentOperation.textContent = displayCurrent;

document.addEventListener("keydown", addDigit);
function addDigit(e) {
    if (!isNaN(e.key)) {
        if (displayCurrent == 0) {
            displayCurrent = "";
            updateCurrent();
        }
        displayCurrent += e.key;
        updateCurrent();
        operatorAvailable = true;
    }
    if (operators.includes(e.key) && operatorAvailable) {
        displayPrevious = displayCurrent;
        if (operator) {
            operand_2 = displayCurrent;
        }
        else {
            operand_1 = displayCurrent;
        }
        displayCurrent = 0;
        if (operator) {
            displayPrevious = evaluate();
            updatePrevious();
            operand_1 = displayPrevious;
        }
        displayPrevious += e.key;
        updatePrevious();
        operator = e.key;
        currentOperation.textContent = displayCurrent + ".";
        displayCurrent = "0";
        operatorAvailable = false;
    }
}
function evaluate() {
    if (operator == "+") {
        return ~~operand_1 + ~~operand_2
    }
    if (operator == "-") {
        return ~~operand_1 - ~~operand_2
    }
    if (operator == "*") {
        return ~~operand_1 * ~~operand_2
    }
    if (operator == "/") {
        return ~~operand_1 / ~~operand_2
    }
}
function updateCurrent() {
    currentOperation.textContent = displayCurrent;
}
function updatePrevious() {
    previousOperation.textContent = displayPrevious;
}