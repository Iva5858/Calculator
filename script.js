//TODO fix IO button so that the calculator cannot work while off



let on = true;
let screenNum = '0';
let runningTotal = 0;
let buffer = '0';
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {

    if (isNaN(value)) {
        handleSymbol(value);
    }
    else {
        handleNumber(value)
    }
    screen.innerText = screenNum;

}

//ADD POINT FUNCTIONALITY
function handleSymbol(symbol) {
    switch (symbol) {
        case 'I/0':
            if (on) {
                buffer = '';
                screenNum = '';
                runningTotal = 0;
                on = false;
                break;
            }
            else {
                buffer = '0';
                screenNum = '0';
                runningTotal = 0;
                on = true;
                break;
            }
        case '.':
            screenNum += '.';
            buffer += '.';
            break;
        case 'AC':
            screenNum = '0';
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toFixed(2);
            screenNum = buffer;
            runningTotal = 0;
            break;
        case 'DEL':
            if (buffer.length === 1) {
                buffer = 0;
                screenNum = '0';
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1);
                screenNum = screenNum.substring(0, screenNum.length - 1);
            }
            break;
        case '−':
            handleMath(symbol);
        case '×':
            handleMath(symbol);
        case '÷':
            handleMath(symbol);
        case '+':
            handleMath(symbol);


    }

}

function handleMath(symbol) {

    if (buffer === '0') {
        return;
    }

    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }
    previousOperator = symbol;
    buffer = '0';

}

function flushOperation(floatBuffer) {
    if (previousOperator === '−') {
        runningTotal -= floatBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= floatBuffer;
    }
    else if (previousOperator === '÷') {
        runningTotal /= floatBuffer;
    }
    else if (previousOperator === '+') {
        runningTotal += floatBuffer;
    }
    
}

function handleNumber(numberString) {

    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }

    screenNum = buffer;
}

function addCommas(value){
    let ret = "";

    for(let i = value.length - 1; i >= 0; i--){
        ret += value.substring(value - i, (value - i + 1));
        if((value.length - i) % 3 === 0)
        {
            ret += ',';
        }

    }
}

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function (event) {
            buttonClick(event.target.innerText);
        });
}

init();