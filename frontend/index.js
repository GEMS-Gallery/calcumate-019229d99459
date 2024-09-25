import { backend } from 'declarations/backend';

let currentValue = '';
let operator = '';
let previousValue = '';

const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentValue += button.textContent;
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentValue !== '') {
            operator = button.textContent;
            previousValue = currentValue;
            currentValue = '';
            updateDisplay();
        }
    });
});

equalsButton.addEventListener('click', async () => {
    if (previousValue !== '' && currentValue !== '' && operator !== '') {
        const x = parseFloat(previousValue);
        const y = parseFloat(currentValue);
        let result;

        try {
            switch (operator) {
                case '+':
                    result = await backend.add(x, y);
                    break;
                case '-':
                    result = await backend.subtract(x, y);
                    break;
                case '*':
                    result = await backend.multiply(x, y);
                    break;
                case '/':
                    const divisionResult = await backend.divide(x, y);
                    result = divisionResult[0] !== null ? divisionResult[0] : 'Error';
                    break;
            }

            currentValue = result.toString();
            previousValue = '';
            operator = '';
            updateDisplay();
        } catch (error) {
            console.error('Error performing calculation:', error);
            currentValue = 'Error';
            updateDisplay();
        }
    }
});

clearButton.addEventListener('click', () => {
    currentValue = '';
    previousValue = '';
    operator = '';
    updateDisplay();
});

function updateDisplay() {
    display.value = currentValue || '0';
}

updateDisplay();
