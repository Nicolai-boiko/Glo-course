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
let cancel = document.querySelector('#cancel');
let checkBox = document.querySelector('#deposit-check');
let inputPlaceholderName;
let inputPlaceholderSum;


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};


const AppData = function () {

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.moneyDeposit = 0;
    this.percentDeposit = 0;
};

AppData.prototype.start = function () {
    this.budget = +monthSalaryAmount.value;

    this.getAddExpenses();
    this.getAddIncome();
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getBudget();
    this.showResult();
};
AppData.prototype.showResult = function () {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('change', function () {  //пришлось тут удалить стрелочную хотя с ней не пришлось бы делать кастыли из сохранения конеткста в переменную, так как у неё нет конткста......
        incomePeriodValue.value = _this.calcSavedMoney();
    });
};
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.childNodes.forEach(node => node.value = '');
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesAddButton.style.display = 'none';
    }
    this.validInput();
};
AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.childNodes.forEach(node => node.value = '');
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        incomeAddButton.style.display = 'none';
    }
    this.validInput();
};
AppData.prototype.getExpenses = function () {
    /* Как по ТЗ.... */
    const _this = this;
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });

    /* Почти как по ТЗ.... 
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    }, this);*/

    /* По человечески... В остальных местах не переделывал
    expensesItems.forEach(item => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    }); */
};
AppData.prototype.getIncome = function () {
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
};
AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    })
};
AppData.prototype.getAddIncome = function () {
    additionalIncomeItem.forEach(item => {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    })
};
AppData.prototype.getInfoDeposit = function () {
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
};
AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);        
};
AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay >= 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
       console.log('У вас средний уровень дохода');
    } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
        console.log('К сожалению у вас уровень дохода ниже среднего. Парам-парам, пам...');
    } else {
        console.log('Что то пошло не так');
    };
};
AppData.prototype.getPeriodAmout = function () {
    periodAmount.innerText = periodSelect.value;
};
AppData.prototype.calcSavedMoney = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.inputNameValidation = function () {
    const regex = /[^а-яА-Я0-9\.\,]/g;
    inputPlaceholderName.forEach(input => {
        input.value = input.value.replace(regex, '');
    });
};
AppData.prototype.inputSumValidation = function () {
    const regex = /[^0-9]/;
    inputPlaceholderSum.forEach(input => {
        input.value = input.value.replace(regex, '');
    });
};
AppData.prototype.validInput = function () {
    inputPlaceholderName = document.querySelectorAll('.income-title:not(.title), .additional_income-item, .expenses-title:not(.title), .additional_expenses-item');
        inputPlaceholderName.forEach(input => input.addEventListener('input', this.inputNameValidation));
        inputPlaceholderSum = document.querySelectorAll('.income-amount, .expenses-amount, .salary-amount, .target-amount');
        inputPlaceholderSum.forEach(input => input.addEventListener('input', this.inputSumValidation));
};
AppData.prototype.reset = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.moneyDeposit = 0;
    this.percentDeposit = 0;

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
    let inputTypeText = document.querySelectorAll('input[type=text], .btn_plus, #deposit-check, .period-select');
    inputTypeText.forEach(input => input.removeAttribute("disabled"));
    incomeAddButton.style.display = 'block';
    expensesAddButton.style.display = 'block';
    checkBox.checked = false;
};

AppData.prototype.eventListners = function () {
    const _this = this;
    calculate.addEventListener('click', () => {
        if (monthSalaryAmount.value === '') {
            alert('Поле "Месячный доход должно быть заполнено"');
            return;
        } else {
            this.start();
            let inputTypeText = document.querySelectorAll('input[type=text], .btn_plus, #deposit-check, .period-select');
            inputTypeText.forEach(input => input.setAttribute("disabled", "true"));
            calculate.style.display = 'none';
            cancel.style.display = 'block';
        }
    });
    cancel.addEventListener('click', this.reset.bind(_this));
    expensesAddButton.addEventListener('click', this.addExpensesBlock.bind(_this));
    incomeAddButton.addEventListener('click', this.addIncomeBlock.bind(_this));
    periodSelect.addEventListener('input', this.getPeriodAmout.bind(_this));
    this.validInput();
};


const appData = new AppData();
appData.eventListners();








