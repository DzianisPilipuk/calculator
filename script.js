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

// buttons input
const allButtons = document.querySelectorAll('button');
allButtons.forEach(element => {
    element.addEventListener('keydown', (e) => { if (e.key === "Enter") {e.preventDefault()}});
})
const digitButtons = document.querySelectorAll('#digit-button');
digitButtons.forEach(element => {
    element.addEventListener('click', (e) => addDigit(e.target.value));
})
const operatorButtons = document.querySelectorAll('#operator-button');
operatorButtons.forEach(element => {
    element.addEventListener('click', (e) => {
        if ((e.target.value == "-") && (secondOperand == false)) {startNegative()};
        if (firstOperand && secondOperand) {addOperatorToDouble(e.target.value)}
        else if (secondOperand && secondOperand !== "-" && secondOperand !== "0") {addOperatorToSingle(e.target.value)};
    });
})
const equationButton = document.getElementById('equation-button');
equationButton.addEventListener('click', () => {
    if (firstOperand && secondOperand) {doubleEquation()}
    else if (secondOperand) {singleEquation()};
})
const decimalPointButton = document.getElementById('decimal-point-button');
decimalPointButton.addEventListener('click', () => {addDecimalPoint()});
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {removeLastSymbol()});
const clearEntryButton = document.getElementById('clear-entry-button');
clearEntryButton.addEventListener('click', () => {removeAllData()});
const githubButton = document.getElementById('github-button');
githubButton.addEventListener('click', () => {location.href='https://github.com/DzianisPilipuk'});


// keyboard input
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
            previousData.textContent = "can't divide by zero";
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