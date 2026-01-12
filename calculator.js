let currentNumber = "0";
let shouldResetScreen = false;
let firstOperand = "";
let currentOperator = null;

const screenElement = document.querySelector(".curr-operand");
const numberButtons = document.querySelectorAll('.btn-number, .btn-number-zero');
const clearButton = document.querySelector('[data-action="clear"]');
const backspaceButton = document.querySelector('[data-action="backspace"]');
const additionButton = document.querySelector('[data-action="addition"]');
const subtractButton = document.querySelector('[data-action="subtract"]');
const divideButton = document.querySelector('[data-action="divide"]');
const multiplyButton = document.querySelector('[data-action="multiply"]');
const equalButton = document.querySelector('[data-action="equals"]');

function updateScreen() {
    screenElement.textContent = currentNumber;
}

updateScreen();

numberButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const number = button.getAttribute('data-number');

        if (number === '.') {
            if (currentNumber.includes('.')) {
                return;
            }

            if (currentNumber === '0' || currentNumber === '') {
                currentNumber = '0.';
            } else {
                currentNumber += '.';
            }
        }

        else {
            if (currentNumber === "0" || shouldResetScreen) {
                currentNumber = number;
                shouldResetScreen = false;
            } else {
                currentNumber += number;
            }
        }
    
        updateScreen();
    })
})

function clearAll() {
    currentNumber = "0";
    firstOperand = "";
    currentOperator = null;
    shouldResetScreen = false;
    updateScreen();
}

clearButton.addEventListener('click', clearAll);

backspaceButton.addEventListener('click', function() {
    if (currentNumber === "0" || currentNumber.length === 1) {
        currentNumber = "0";
    } else {
        currentNumber = currentNumber.slice(0, -1);
    }

    updateScreen();
})

additionButton.addEventListener('click', function() {
    handleOperator('addition');
})

subtractButton.addEventListener('click', function() {
    handleOperator('subtract');
})

divideButton.addEventListener('click', function() {
    handleOperator('divide');
})

multiplyButton.addEventListener('click', function() {
    handleOperator('multiply');
})

function handleOperator(operator) {
    firstOperand = currentNumber;
    currentOperator = operator;

    shouldResetScreen = true;
}

equalButton.addEventListener('click', function() {
    compute();
})

function compute() {
    const firstNumber = parseFloat(firstOperand);
    const secondNumber = parseFloat(currentNumber);
    let result;

    if (currentOperator === 'addition') {
        result = firstNumber + secondNumber;
    } else if (currentOperator === 'subtract') {
        result = firstNumber - secondNumber;
    } else if (currentOperator === 'divide') {
        if (secondNumber === 0) {
            alert("can not divide 0");
            clearAll();
            return;
        }
        result = firstNumber / secondNumber;
    } else if (currentOperator === 'multiply') {
        result = firstNumber * secondNumber;
    }

    currentNumber = result.toString();
    updateScreen();

    firstOperand = "";
    currentOperator = null;
    shouldResetScreen = true;
}