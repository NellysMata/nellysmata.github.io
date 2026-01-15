
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
        this.clear();
        this.updateHistoryDisplay();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';

    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '0';
            this.shouldResetScreen = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;

        if (this.currentOperand === '0' && (number === '0' || number === '00')) return; // Evita 00 o 0000

        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('No se puede dividir por cero 🌸');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        // Guardar en historial
        const calculation = `${prev} ${this.operation} ${current}`;
        const result = this.roundNumber(computation);
        this.addToHistory(calculation, result);

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    roundNumber(number) {
        return Math.round(number * 100000000) / 100000000;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('es', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.textContent =
            this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            this.previousOperandElement.textContent =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }

    addToHistory(calculation, result) {
        const historyItem = {
            calculation: calculation,
            result: result,
            timestamp: new Date().toLocaleString('es-ES')
        };

        this.history.unshift(historyItem);

        if (this.history.length > 10) {
            this.history.pop();
        }

        localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const historyList = document.getElementById('historyList');

        if (this.history.length === 0) {
            historyList.innerHTML = '<div style="text-align: center; color: var(--gray); padding: 1rem;">No hay cálculos aún</div>';
            return;
        }

        historyList.innerHTML = this.history.map(item => `
                    <div class="history-item">
                        <span class="history-calculation">${item.calculation}</span>
                        <span class="history-result">= ${item.result}</span>
                    </div>
                `).join('');
    }

    clearHistory() {
        if (confirm('¿Borrar todo el historial? 🌸')) {
            this.history = [];
            localStorage.removeItem('calculatorHistory');
            this.updateHistoryDisplay();
        }
    }
}

// Inicializar calculadora
const previousOperandElement = document.getElementById('previousOperand');
const currentOperandElement = document.getElementById('currentOperand');
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Event Listeners para botones
document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
    });
});

document.querySelectorAll('[data-operator]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
        calculator.updateDisplay();
    });
});

document.querySelector('[data-action="equals"]').addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

document.querySelector('[data-action="clear"]').addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

document.querySelector('[data-action="delete"]').addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

document.getElementById('clearHistory').addEventListener('click', () => {
    calculator.clearHistory();
});

// Soporte de teclado
document.addEventListener('keydown', (e) => {
    // Números
    if (e.key >= 0 && e.key <= 9) {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
    }

    // Operadores
    if (e.key === '+' || e.key === '-') {
        calculator.chooseOperation(e.key);
        calculator.updateDisplay();
    }

    if (e.key === '*') {
        calculator.chooseOperation('×');
        calculator.updateDisplay();
    }

    if (e.key === '/') {
        e.preventDefault();
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
    }

    // Punto decimal
    if (e.key === '.' || e.key === ',') {
        calculator.appendNumber('.');
        calculator.updateDisplay();
    }

    // Igual
    if (e.key === 'Enter' || e.key === '=') {
        calculator.compute();
        calculator.updateDisplay();
    }

    // Backspace
    if (e.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }

    // Escape (limpiar)
    if (e.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
});

// Inicializar display
calculator.updateDisplay();
