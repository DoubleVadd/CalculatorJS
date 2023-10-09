

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
        current_value =  current_value + String(Number(e.target.id));
        value.textContent = current_value;
        
    })
});

let action = '';
let brackets = false;

function checkBrackets(val){
    switch(val){
        case true: return false;
        case false: return true;
        default: false;
    }
}


const calc_history = [];
const calc_results = [];
const history_container = document.querySelector('.history');
console.log(history_container);

function historyUpdater(calc_history, calc_results){
    const his_div = document.createElement('div');
    const res_div = document.createElement('div');
    his_div.classList.add('his');
    res_div.classList.add('results');
    his_div.textContent=calc_history;
    res_div.textContent=calc_results;
    history_container.insertBefore(res_div, history_container.firstChild);
    history_container.insertBefore(his_div, history_container.firstChild);
    
}





let first_val = 0;
let second_val = 0;
let counting_val = 0;


const calc_symbols = ['+', '-', 'x', '÷'];
let current_operator = '';
operation_possible = false;

function calcEvaluator(val = 0){

    all_vals = val.split(/(-?\d*\.?\d*)|\D/).filter(i => i);
    // console.log(all_vals);
    all_vals.forEach(val => {

        if(val.charAt(0)==='-'){
            console.log('negative');
            if (current_operator === ''){
                current_operator = '+';
                operation_possible = true;
            }
        }

        // Avoid Nan values and return error
        if(val === 'NaN'){
            return 'ERROR';
        } 
        // Get operators if it exists 
        else if (calc_symbols.includes(val)){
            current_operator = val;  
            operation_possible = true;
            console.log('contains operator');    
        }
        // If there is an operator, and next number is not NaN, calculate running total 
        else if (current_operator){
            if(operation_possible && first_val !== NaN){
                second_val = Number(val);
                if (second_val !== NaN){
                    // console.log(first_val,current_operator,second_val);
                    counting_val = operate(current_operator,first_val,second_val);
                    // console.log(counting_val);
                    first_val = counting_val;
                    second_val = 0;
                    operation_possible = false;
                    current_operator = '';
                }
            } 
        }
        // Get the first Number left handside if 
        else {
            if(!counting_val){
                first_val = Number(val);
            }
                // console.log(first_val);
            }
        

        // console.log(val);
    })
    if (String(counting_val) == "NaN"){ return 'ERROR'};

    return String(counting_val);

}


const functionals = document.querySelectorAll('.functional')
functionals.forEach( (functional) => {
    functional.addEventListener('click', (e) => {
        e.stopPropagation();
        switch (e.target.id){
            case 'equal':
                current_value = calcEvaluator(value.textContent);
                historyUpdater(value.textContent, current_value);
                console.log(calc_history,calc_results);
                if(current_value == "ERROR" || current_value == "0"){
                    value.textContent = current_value;
                    current_value = '';
                } else{
                    value.textContent = current_value;
                    current_value = '';
                    brackets = false;
                }
            break;

            case 'clear': 
                counting_val = 0;
                first_val = 0;
                second_val = 0;
                current_value = '';
                value.textContent = 0;
                brackets = false;
                historyUpdater("Cleared", "0");
            break;

            case 'delete':
                if (current_value.length > 1){
                    if(['(', ')'].includes(value.textContent.charAt(value.textContent.length - 1))){
                        console.log(value.textContent.charAt(value.textContent.length - 1))
                        brackets = checkBrackets(brackets);
                    } 
                    current_value =  current_value.slice(0,-1);
                    value.textContent = current_value;

                } else {
                    counting_val = 0;
                    first_val = 0;
                    second_val = 0;
                    current_value = '';
                    value.textContent = '0';
                    brackets = false;
                }
            break;

            case 'percentage':
                if (value.textContent.includes('.')){
                } else {
                    if (value.textContent.length >2){
                        current_value = value.textContent.substring(0,1) + '.' + value.textContent.substring(1, value.textContent.length);
                        value.textContent = current_value;

                    } else if (value.textContent.length == 2){
                        current_value =  '.' + current_value ;
                        value.textContent = current_value;
                    }
                    
                    else {
                        current_value =  '.0' + current_value ;
                        value.textContent = current_value;
                    }
                }
            break;

            case 'bracket':
                if (checkBrackets(brackets)){
                    current_value =  current_value + '(';
                    value.textContent = current_value; 
                    brackets = checkBrackets(brackets);
                } else{
                    current_value =  current_value + ')';
                    value.textContent = current_value;
                    brackets = checkBrackets(brackets);
                }
            break; 
                
            default:
                action = e.target.id
                current_value =  current_value + String(e.target.textContent);
                value.textContent = current_value; 
            break;

        }
        
    })
});

