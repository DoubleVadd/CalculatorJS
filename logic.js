

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


const value = document.querySelector('#value');

let current_value = '';

const numbers = document.querySelectorAll('.number')
numbers.forEach( (number) => {
    number.addEventListener('click', (e) => {
        e.stopPropagation();
        // console.log(e.target.id);
        current_value =  current_value + String(e.target.id);
        value.textContent = current_value; 
    })
});

