const display = document.getElementById("display");
display.innerText = "0";
const clearButton = document.getElementById("clear");

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");


let record = "";
const expressionRegex = /\d+[\+\-\*\/]\d+/;

function clear() {
    display.innerText = "0";
    record = "";
    document.querySelectorAll("button").forEach(btn => btn.disabled = false);

}


function cleanDisplay() {
    const size = display.innerText.length;
    const value = Number(display.innerText);
    const roundedSize = String(Math.round(value)).length;
    if (size <= 16) {
        return;
    } else if (roundedSize <= 16) {
        display.innerText = value.toFixed(size - roundedSize);
    } else {
        display.innerText = "Error - overflow";
        document.querySelectorAll("button").forEach(btn => btn.disabled = true);
        clearButton.disabled = false;
    }
    
    
}


function operate(expression) {
    const operatorMatch = expression.match(/[\+\-\*\/]/);
    const leftMatch = expression.match(/^\d+/);
    const rightMatch = expression.match(/\d+$/);

    if (leftMatch && operatorMatch && leftMatch) {
        const operator = operatorMatch[0];
        const left = Number(leftMatch[0]);
        const right = Number(rightMatch[0]);
        switch (operator) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                if (right !== 0) {
                    return left / right;
                }
            default:
                return null;
        }
    } else {
        return null;
    }
}

clearButton.addEventListener("click", clear);

digitButtons.forEach(btn => btn.addEventListener("click", () => {
    if (!display.innerText || display.innerText == "0" || record.slice(-1).match(/\+\-\*\//))
    {
        display.innerText = btn.value;
    } else {
        display.innerText += btn.value;
    }
    record += btn.value;
    enableOperators();
    cleanDisplay();
    console.log(record);
}));

function disableOperators() {
    operatorButtons.forEach(btn => btn.disabled = true);
}

function enableOperators() {
    operatorButtons.forEach(btn => btn.disabled = false);
}

operatorButtons.forEach(btn => btn.addEventListener("click", () => {
    disableOperators();
    const lastResult = evaluate();
    console.log(`last result: ${lastResult}`)
    if (lastResult) {
        display.innerText = lastResult;
        record = `${lastResult}`;
    } else {
        display.innerText = "";
    }
    record += btn.value;
    console.log(record);
}))

function evaluate() {
    const expressionMatch = record.match(expressionRegex);
    
    if (expressionMatch) {
        expression = expressionMatch[0];
        console.log(`expression: ${expression}`);
        enableOperators();
        return operate(expression);
    } else {
        return null;
    }
    
}

equalsButton.addEventListener("click", () => {
    const result = evaluate();
    if (result) {
        display.innerText = result;
        record = `${result}`;
        console.log(`equals ${result}`);
    } else {
        console.log(`equals ${display.innerText}`);
    }
    cleanDisplay();
})