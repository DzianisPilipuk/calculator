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

currentData.textContent = 0;
document.addEventListener("keydown", addChar);

function addChar(e) {
    if (!isNaN(e.key)) {addDigit(e.key)};

    if (decimalPoint.includes(e.key)) {addDecimalPoint()};

    if (equationSymbols.includes(e.code) && firstOperand && secondOperand) {doubleEquation()}
    else if (equationSymbols.includes(e.code) && secondOperand) {singleEquation()};
    
    if (operators.includes(e.key) && firstOperand && secondOperand) {addOperatorToDouble(e.key)}
    else if (operators.includes(e.key) && secondOperand && secondOperand !== "-" && secondOperand !== "0") {addOperatorToSingle(e.key)};
    
    if ((e.key == "-") && (secondOperand == false)) {startNegative()};

    if (e.code == "Backspace") {removeLastSymbol()};

    if (e.code == "Delete") {removeAllData()};

    document.getElementById("previous-operand").textContent = firstOperand;
    document.getElementById("current-operand").textContent = secondOperand;
}
function addDigit(e) {
    if (secondOperand == "0") {
        secondOperand = "";
    }
    if (operator) {
        firstOperand = secondOperand;
        secondOperand = "";
        storedOperator = operator;
        operator = "";
    }
    secondOperand += e;
    limitDecimal();
    currentData.textContent = secondOperand;
}
function limitDecimal() {
    if (secondOperand.includes(".")) {
        secondOperand = secondOperand.slice(0, (secondOperand.indexOf(".") + decimalScale.toString().length));
    }
}
function addDecimalPoint() {
    if (!secondOperand.includes(".")) {
        secondOperand += ".";
        currentData.textContent = secondOperand;
    }
}
function startNegative() {
    secondOperand = "-";
    currentData.textContent = secondOperand;
}
function singleEquation() {
    previousData.textContent = secondOperand + "=";
    currentData.textContent = secondOperand;
    storedOperator = "";
}
function doubleEquation() {
    previousData.textContent = firstOperand + storedOperator + secondOperand + "="
    secondOperand = evaluate().toString();
    limitDecimal();
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
    currentData.textContent = "";
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
        if (secondOperand == 0) {
            alert ("Can't divide by zero");
            previousData.textContent = "";
            return (firstOperand);
        }
        else {
            return ((firstOperand*decimalScale) / (secondOperand*decimalScale));
        }
    }
}
function removeLastSymbol() {
    if (operator) {
        operator = "";
        previousData.textContent = "";
        currentData.textContent = secondOperand;
    }
    else if (secondOperand) {
        secondOperand = secondOperand.slice(0, (secondOperand.length - 1));
        currentData.textContent = secondOperand;
    }
    else {
        secondOperand = firstOperand;
        firstOperand = "";
        previousData.textContent = "";
        currentData.textContent = secondOperand;
    }
}
function removeAllData() {
    firstOperand = "";
    secondOperand = "";
    operator = "";
    previousData.textContent = "";
    currentData.textContent = 0;
}