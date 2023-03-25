let previousOperand;
let currentOperand = "";
let operator;
const previousData = document.getElementById("previous-data");
const currentData = document.getElementById("current-data");
let operatorAvailable = false;
const operators = ["/", "*", "-", "+"];
const equationSymbols = ["Enter", "Equal", "NumpadEnter"]
let unlock = true;

document.addEventListener("keydown", addChar);

// get the number
function addChar(e) {
    if (!isNaN(e.key)) {addDigit(e.key)};
    if (equationSymbols.includes(e.code) && currentOperand) {equation()};
    if (operators.includes(e.key)) {addOperator(e.key)};
}
function addDigit(e) {
    if (operator && unlock) {
        previousOperand = currentOperand;
        previousData.textContent = previousOperand + operator;
        currentOperand = "";
        unlock = false;
    }
    currentOperand += e;
    currentData.textContent = currentOperand;
}
function equation() {
    previousData.textContent = previousOperand + operator + currentOperand + "="
    previousOperand = evaluate();
    currentData.textContent = previousOperand;
    unlock = true;
}
function addOperator(e) {
    operator = e;
    if (currentOperand) {
        previousData.textContent = currentOperand + e;
    }
    else {
        previousData.textContent = previousOperand + e;
    }
    currentData.textContent = "0";
    unlock = true;
}
function evaluate() {
    if (operator == "+") {
        return ~~previousOperand + ~~currentOperand
    }
    if (operator == "-") {
        return ~~previousOperand - ~~currentOperand
    }
    if (operator == "*") {
        return ~~previousOperand * ~~currentOperand
    }
    if (operator == "/") {
        return ~~previousOperand / ~~currentOperand
    }
}
// proceed operation

// function addChar(e) {
//     if (!isNaN(e.key)) {
//         if (displayCurrent == 0) {
//             displayCurrent = "";
//             updateCurrent();
//         }
//         displayCurrent += e.key;
//         updateCurrent();
//         operatorAvailable = true;
//     }
//     if (operators.includes(e.key) && operatorAvailable) {
//         displayPrevious = displayCurrent;
//         if (operator) {
//             operand_2 = displayCurrent;
//         }
//         else {
//             operand_1 = displayCurrent;
//         }
//         displayCurrent = 0;
//         if (operator) {
//             displayPrevious = evaluate();
//             updatePrevious();
//             operand_1 = displayPrevious;
//         }
//         displayPrevious += e.key;
//         updatePrevious();
//         operator = e.key;
//         currentOperation.textContent = displayCurrent + ".";
//         displayCurrent = "0";
//     }
// }
