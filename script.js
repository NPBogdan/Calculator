let number1 = '', number2 = '', operator = '';
let result = '';
let equal = false;
let operationHelper = false;
let symbols = ['+', '-', 'x', '/', '%'];

function add(number1, number2) {
    return +number1 + +number2;
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

function modulus(number1, number2) {
    return number1 % number2;
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
            result = add(number1, number2);
            break;
        case "-":
            result = subtract(number1, number2);
            break;
        case "x":
            result = multiply(number1, number2);
            break;
        case "/":
            result = divide(number1, number2);
            break;
        case '%':
            result = modulus(number1, number2);
            break;
    }
}

document.querySelectorAll(".buttons div div").forEach(function (node) {
    node.addEventListener('click', function (event) {
        const elementTextCliked = event.target.textContent;
        if (symbols.includes(elementTextCliked) && number1 != '' && number2 != '' && operator != '') {
            operate(operator, number1, number2);
            operator = elementTextCliked;
            populateCalculatorDisplay(elementTextCliked, number1, number2, operator);
            number1 = result;
            number2 = '';
            operationHelper = true;
            console.log("A intrat la primul If ");

        }
        //If it is = and we have the numbers set
        else if (elementTextCliked === '=' && number1 != '' && number2 != '' && operator != '') {
            operate(operator, number1, number2);
            populateCalculatorDisplay(elementTextCliked, number1, number2, operator);
            number1 = result;
            number2 = '';
            console.log("A intrat la = ");
        }
        //If it is a number
        else if (elementTextCliked <= 10 && elementTextCliked >= 0) {
            if (operator === '') {
                formNumber1(elementTextCliked);
                populateCalculatorDisplay(elementTextCliked, number1, number2, operator);
            }
            else {
                formNumber2(elementTextCliked);
                console.log(`${number1} --- ${number2} --- ${operator}`);
                populateCalculatorDisplay(elementTextCliked, number1, number2, operator);
            }
        }
        //If it is All Clear
        else if (elementTextCliked === 'AC') {
            number1 = '';
            number2 = '';
            operator = '';
            result = '';
            const calculatorDisplay = document.querySelector(".display");
            while (calculatorDisplay.firstChild) {
                calculatorDisplay.removeChild(calculatorDisplay.firstChild);
            }
        }
        //If it is Delete
        else if (elementTextCliked === "DEL") {
            if (number1 != '' && operator === '') {
                editNumber1();
                populateCalculatorDisplay('', number1, number2, operator);
            }
            else if (number2 != '' && operator !== '') {
                editNumber2();
                populateCalculatorDisplay('', number1, number2, operator);
            }
        }
        //If we add Zecimals
        else if (elementTextCliked === '.') {
            if (operator === '' && number1 != '') {
                if (!number1.includes('.')) {
                    editNumber1(true);
                    populateCalculatorDisplay('.', number1, number2, operator);
                }
            }
            else {
                if (!number2.includes('.') && number2 != '') {
                    editNumber2(true);
                    populateCalculatorDisplay('.', number1, number2, operator);
                }
            }
        }
        //Else we just change the operator
        else {
            operator = elementTextCliked;
            document.querySelector('.display').textContent = operator;
        }
        // console.table([number1, operator, number2, result]);
    })
    node.addEventListener('mousedown', function (e) {
        e.target.style.opacity = 0.33;
        e.target.style.cssText = "background-image: radial-gradient(circle, #3d6cb1, #504a7c, #442e4b, #291923, #000000);";
    })
    node.addEventListener('mouseup', function (e) {
        e.target.style.opacity = 1;
        e.target.style.background = 'radial-gradient(circle, rgba(0,0,0,1) 12%, rgba(48,116,195,1) 89%)';
    })
});

//Populate the calculator display 
function populateCalculatorDisplay(clickedElement = '', number1 = '', number2 = '', operator = '') {
    if (clickedElement === '=') {
        document.querySelector('.display').textContent = result;
    }
    else if (number1 != '' && number2 != '' && operator != '' && result != '') {
        if (operationHelper === true) {
            document.querySelector('.display').textContent = `${result} ${operator} ${number2}`;
        }
        else {
            document.querySelector('.display').textContent = result;
        }
    }
    else if (operator != '') {
        document.querySelector('.display').textContent = number2;
    }
    else if (operator == '') {
        document.querySelector('.display').textContent = number1;
    }
}