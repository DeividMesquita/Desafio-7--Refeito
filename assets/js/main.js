// Simples calculadora em JavaScript
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
const dark = document.querySelector('.dark-mode');
const light = document.getElementById('light');
const body = document.body;


light.addEventListener('click', function () {
    light.style.display = 'none';
    dark.style.display = 'block';
    body.classList.add('active');
});

dark.addEventListener('click', function () {
    dark.style.display = 'none';
    light.style.display = 'block';
    body.classList.remove('active');
});


let current = '';
let previous = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '.') {
            // Evita múltiplos pontos decimais no mesmo número
            if (value === '.' && current.includes('.')) return;
            current += value;
            display.value = previous + operator + current;
        } else if (value === 'C') {
            current = '';
            previous = '';
            operator = '';
            display.value = '';
        } else if (value === '←') {
            current = current.slice(0, -1);
            display.value = previous + operator + current;
        } else if (value === '=') {
            if (previous && operator && current) {
                let result = 0;
                const a = parseFloat(previous);
                const b = parseFloat(current);
                if (operator === '+') result = a + b;
                if (operator === '-') result = a - b;
                if (operator === '*') result = a * b;
                if (operator === '/') result = b !== 0 ? a / b : 'Erro';

                // Corrige possíveis imprecisões de ponto flutuante
                result = parseFloat(result.toFixed(10));

                display.value = result;
                current = result.toString();
                previous = '';
                operator = '';
            }
        } else {
            if (current === '') return; // Evita operador sem número antes
            if (previous && operator && current) {
                // Faz cálculo automático se já tiver tudo
                let result = 0;
                const a = parseFloat(previous);
                const b = parseFloat(current);
                if (operator === '+') result = a + b;
                if (operator === '-') result = a - b;
                if (operator === '*') result = a * b;
                if (operator === '/') result = b !== 0 ? a / b : 'Erro';

                // Corrige possíveis imprecisões de ponto flutuante
                result = parseFloat(result.toFixed(10));

                previous = result.toString();
                current = '';
                operator = value;
                display.value = previous + operator;
            } else {
                operator = value;
                previous = current;
                current = '';
                display.value = previous + operator;
            }
        }
    });
});