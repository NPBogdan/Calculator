let number1, operator, number2;

function add(number1, number2){
    return number1 + number2;
}

function subtract(number1, number2){
    return number1 - number2;
}

function multiply(number1,number2){
    return number1 - number2;
}

function divide(number1,number2){
    return number1 / number2;
}

function operate(operator, number1, number2){
    switch(operator){
        case "+":
            add(number1,number2);
        break;
        case "-":
            subtract(number1,number2);
        break;
        case "*":
            multiply(number1, number2);
        break;
        case "/":
            divide(number1, number2);
        break;
    }
}
