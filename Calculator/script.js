class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear();
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.substr(0, this.currentOperand.length - 1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.'))
            return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperand === "") {
            this.operation = operation
            return
        }
        if (this.previousOperand !== '')
            this.compute()
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current))
            return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getFormattedNumber(number) {
        const num = number.toString()
        const integer = parseFloat(num.split('.')[0])
        const decimal = num.split('.')[1]
        let integerDisplay
        if (isNaN(integer))
            integerDisplay = ''
        else
            integerDisplay = integer.toLocaleString('en', { maximumFractionDigits: 0 })
        if (decimal != null)
            return `${integerDisplay}.${decimal}`
        else
            return integerDisplay
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getFormattedNumber(this.currentOperand)
        if (this.operation != null)
            this.previousOperandTextElement.innerText = `${this.getFormattedNumber(this.previousOperand)} ${this.operation}`
        else
            this.previousOperandTextElement.innerText = ''
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
