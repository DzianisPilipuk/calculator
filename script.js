let firstOperand;
let secondOperand = "";
let operator;
let storedOperator;
let result;
const previousData = document.getElementById("previous-data");
const currentData = document.getElementById("current-data");
const operators = ["/", "*", "-", "+"];
const equationSymbols = ["Enter", "Equal", "NumpadEnter"];
const decimalPoint = [".", ","];
const decimalScale = 10000;

document.addEventListener("keydown", addChar);

// get the number
function addChar(e) {
    if (!isNaN(e.key)) {addDigit(e.key)};
    if (decimalPoint.includes(e.key)) {addDecimalPoint()};
    if (equationSymbols.includes(e.code) && firstOperand && secondOperand) {doubleEquation()}
    else if (equationSymbols.includes(e.code) && secondOperand) {singleEquation()};
    if (operators.includes(e.key) && firstOperand && secondOperand) {addOperatorToDouble(e.key)}
    else if (operators.includes(e.key) && secondOperand) {addOperatorToSingle(e.key)};
    document.getElementById("previous-operand").textContent = firstOperand;
    document.getElementById("current-operand").textContent = secondOperand;
}
function addDigit(e) {
    if (operator) {
        firstOperand = secondOperand;
        secondOperand = "";
        storedOperator = operator;
        operator = "";
    }
    secondOperand += e;
    // secondOperand = (~~(secondOperand*decimalScale))/decimalScale;
    currentData.textContent = secondOperand;
}
function addDecimalPoint() {
    if (!secondOperand.includes(".")) {
        secondOperand += ".";
        // secondOperand = (~~(secondOperand*decimalScale))/decimalScale;
        currentData.textContent = secondOperand;
    }
}
function singleEquation() {
    previousData.textContent = secondOperand + "=";
    currentData.textContent = secondOperand;
    storedOperator = "";
}
function doubleEquation() {
    previousData.textContent = firstOperand + storedOperator + secondOperand + "="
    secondOperand = evaluate();
    firstOperand = "";
    currentData.textContent = secondOperand;
    storedOperator = "";
}
function addOperatorToSingle(e) {
    operator = e;
    previousData.textContent = secondOperand + e;
    currentData.textContent = "";
}
function addOperatorToDouble(e) {
    secondOperand = evaluate();
    firstOperand = "";
    operator = e;
    previousData.textContent = secondOperand + e;
}
function evaluate() {
    if (storedOperator == "+") {
        return (firstOperand*decimalScale + secondOperand*decimalScale)/decimalScale
    }
    if (storedOperator == "-") {
        return (firstOperand*decimalScale - secondOperand*decimalScale)/decimalScale
    }
    if (storedOperator == "*") {
        return ((firstOperand*decimalScale) * (secondOperand*decimalScale))/decimalScale/decimalScale;
    }
    if (storedOperator == "/") {
        return ((firstOperand*decimalScale) / (secondOperand*decimalScale));
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
