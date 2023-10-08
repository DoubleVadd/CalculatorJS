

//  Operation Functions
const operation = {
    add: (a,b) => Number(a)+Number(b),
    substract: (a,b) => Number(a)-Number(b),
    multiply: (a,b) => Number(a)*Number(b),
    divide: (a,b) => Number(a)/Number(b),
}

const operator_translate = {
    '+': 'add',
    '-': 'substract',
    'x': 'multiply',
    '÷': 'divide',
}

function operate(symbol, num1, num2){
    return operation[operator_translate[symbol]](num1,num2);
}

