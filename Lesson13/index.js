let calculate = document.getElementById('start');
let incomeAddButton = document.getElementsByTagName('button')[0];
let expensesAddButton = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let accumulatedMothValue = document.getElementsByClassName('accumulated_moth-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let monthSalaryAmount = document.querySelector('.salary-amount');
let additionalIncomeTitle = document.querySelector('.income-title');
let mandatoryExpensesTitle = document.querySelector('.expenses-title');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');
let periodSelect = document.querySelector('.period-select');
let inputPlaceholderName = document.querySelectorAll('.income-title:not(.title), .additional_income-item, .expenses-title:not(.title)');
let inputPlaceholderSum = document.querySelectorAll('.income-amount, .expenses-amount, .salary-amount, .target-amount');
let cancel = document.querySelector('#cancel');


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function () {
        
        this.budget = +monthSalaryAmount.value;

        /* appData.getTargetMonth();
        appData.getStatusIncome();
        appData.valuesInclude(); */
        this.getAddExpenses();
        this.getAddIncome();
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getBudget();
        this.showResult();
    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcSavedMoney();
        });
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.childNodes.forEach(node => node.value = '');
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesAddButton.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.childNodes.forEach(node => node.value = '');
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomeAddButton.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(item => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach(item => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        })
    },
    getInfoDeposit: function () {
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        if (this.deposit) {
                do {
                    this.percentDeposit = prompt('Какой годовой процент?', 10);
                }
                while (!isNumber(cashExpenses));
            
                do {
                    this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                }
                while (!isNumber(cashExpenses));
        }
    },
    getExpensesMonth: function() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);        
    },
    getTargetMonth: function () {
        return targetAmount.value / this.budgetMonth;
    },
    getStatusIncome: function () {
        if (this.budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
           console.log('У вас средний уровень дохода');
        } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
            console.log('К сожалению у вас уровень дохода ниже среднего. Парам-парам, пам...');
        } else {
            console.log('Что то пошло не так');
        };
    },
    getPeriodAmout: function () {
        periodAmount.innerText = periodSelect.value;
    },
    calcSavedMoney: function () {
        return this.budgetMonth * periodSelect.value;
    },
    inputNameValidation: function () {
        const regex = /[^а-яА-Я0-9\.\,]/g;
        inputPlaceholderName.forEach(input => {
            input.value = input.value.replace(regex, '');
        });
    },
    inputSumValidation: function () {
        const regex = /[^0-9]/;
        inputPlaceholderSum.forEach(input => {
            input.value = input.value.replace(regex, '');
        });
    },
    reset: function () {
        this.budgetMonth = 0;
        this.budgetDay = 0;
        this.expensesMonth = 0;
        periodSelect.value = 1;
        let inputClear = document.querySelectorAll('.income-title:not(.title), .additional_income-item, .additional_expenses-item, .expenses-title:not(.title), .result-total, .income-amount, .expenses-amount, .salary-amount, .target-amount');
        inputClear.forEach(input => input.value = '');
        calculate.style.display = 'block';
        cancel.style.display = 'none';
        this.getPeriodAmout();
        let deletedIncomeItems = document.querySelectorAll('.income > div:nth-of-type(n+3)');
        deletedIncomeItems.forEach(input => input.remove());
        let deletedExpenseItems = document.querySelectorAll('.expenses > div:nth-of-type(n+3)');
        deletedExpenseItems.forEach(input => input.remove());
        let inputTypeText = document.querySelectorAll('input[type=text]');
        inputTypeText.forEach(input => input.removeAttribute("readonly"));
    },
};
calculate.addEventListener('click', () => {
    if (monthSalaryAmount.value === '') {
        alert('Поле "Месячный доход должно быть заполнено"');
        return;
    } else {
        appData.start();
        let inputTypeText = document.querySelectorAll('input[type=text]');
        inputTypeText.forEach(input => input.setAttribute("readonly", "readonly"));
        calculate.style.display = 'none';
        cancel.style.display = 'block';
    }
});
cancel.addEventListener('click', () => {
    appData.reset()
});
expensesAddButton.addEventListener('click', appData.addExpensesBlock);
incomeAddButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriodAmout);
inputPlaceholderName.forEach(input => input.addEventListener('input', appData.inputNameValidation));
inputPlaceholderSum.forEach(input => input.addEventListener('input', appData.inputSumValidation));