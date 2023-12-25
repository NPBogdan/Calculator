let number1 = '', number2 = '', operator = '';
let result = '';

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

//We form out numbers
function formNumber1(value) {
    number1 += value;
}

function formNumber2(value) {
    number2 += value;
}

//Edit the number deleting last value
function editNumber1(dot = false) {
    if (dot === false) {
        number1 = number1.slice(0, number1.length - 1);
    }
    else {
        number1 += '.';
    }
}

function editNumber2(dot = false) {
    if (dot === false) {
        number2 = number2.slice(0, number2.length - 1);
    }
    else {
        number2 += '.';
    }
}

//A function to make the calculation based on the symbol
function operate(operator, number1, number2) {
    switch (operator) {
        case "+":
            add(number1, number2);
            break;
        case "-":
            subtract(number1, number2);
            break;
        case "*":
            multiply(number1, number2);
            break;
        case "/":
            divide(number1, number2);
            break;
    }
}

document.querySelectorAll(".buttons div div").forEach(function (node) {
    node.addEventListener('click', function (event) {
        const elementTextCliked = event.target.textContent;
        //If it is = and we have the numbers set
        if (elementTextCliked === '=' && number1 != '' && number2 != '' && operator != '') {
            let calculationResult = operator(operator, number1, number2);
            populateCalculatorDisplay(elementTextCliked, number1, number2, operator, calculationResult);
        }
        //If it is a number
        else if (elementTextCliked <= 10 && elementTextCliked >= 0) {
            if (operator === '') {
                formNumber1(elementTextCliked);
            }
            else {
                formNumber2(elementTextCliked);
            }
        }
        //If it is All Clear
        else if (elementTextCliked === 'AC') {
            number1 = '';
            number2 = '';
            operator = '';
            const calculatorDisplay = document.querySelector(".display");
            while (calculatorDisplay.firstChild) {
                calculatorDisplay.removeChild(calculatorDisplay.firstChild);
            }
        }
        //If it is delete
        else if (elementTextCliked === "DEL") {
            if (number1 != '' && operator === '') {
                editNumber1();
            }
            else if (number2 != '' && operator !== '') {
                editNumber2();
            }
        }
        else if (elementTextCliked === '.') {
            if (operator === '' && number1 != '') {
                if (!number1.includes('.')) {
                    editNumber1(true);
                }
            }
            else {
                if (!number2.includes('.') && number2 != '') {
                    editNumber2(true);
                }
            }
        }
        else {
            operator = elementTextCliked;
        }
        console.table(number1, operator, number2);
    })
});

//Populate display content
function populateCalculatorDisplay(clickedElement, number1 = '', number2 = '', operator = '',) {
    let newElement = document.createElement("div");
    newElement.textContent = elementTextCliked;
    let calculatorDisplay = document.querySelector(".display");
    calculatorDisplay.insertBefore(newElement, calculatorDisplay.firstElementChild);
}