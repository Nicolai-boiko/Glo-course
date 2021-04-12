let calculateButton = document.getElementById('start');
let incomeAddButton = document.getElementsByTagName('button')[0];
let expensesAddButton = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.getElementsByClassName('budget_month-value');
let budgetDayValue = document.getElementsByClassName('budget_day-value');
let expensesMonthValue = document.getElementsByClassName('expenses_month-value');
let additionalIncomeValue = document.getElementsByClassName('additional_income-value');
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
let incomePeriodValue = document.getElementsByClassName('income_period-value');
let targetMonthValue = document.getElementsByClassName('target_month-value');
let monthSalaryAmount = document.querySelector('.salary-amount');
let additionalIncomeTitle = document.querySelector('.income-title');
let additionalIncomeAmount = document.querySelector('.income-amount');
let mandatoryExpensesTitle = document.querySelector('.expenses-title');
let mandatoryExpensesAmount = document.querySelector('.expenses-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');



let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money;

(function (){
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
})();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 6,
    asking: function () {
        if (confirm('Есть ли у вас допольнительный заработок?')) {
            let itemIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок', 'Халтура');
            }
            while (isNumber(itemIncome) || itemIncome === '' || itemIncome === null || itemIncome.trim() === '');
            let cashIncome;
            do {
                cashIncome = prompt('Сколько вы на этом поднимаете?', 10000);
            }
            while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        let addExpensesStr = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','Квартплата, еда, топливо');
        appData.addExpenses = addExpensesStr.toLowerCase().split(', ');
        (function showAddExpenses () {
        let dataExpensesArr = [];
        appData.addExpenses.forEach(str => {
            dataExpensesArr.push(str[0].toUpperCase() + str.slice(1));
        });
        console.log(`addExpenses выглядит вот так: ${dataExpensesArr.join(', ')}`);
        })();
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
                let itemExpenses;
                do {
                    itemExpenses = prompt('Введите обязательную статью расходов', 'еда');
                }
                while (isNumber(itemExpenses) || itemExpenses === '' || itemExpenses === null || itemExpenses.trim() === '');
                let cashExpenses;
                do {
                    cashExpenses = prompt('Во сколько это обойдется?', 150);
                }
                while (!isNumber(cashExpenses));
                appData.expenses[itemExpenses] = cashExpenses;
            }
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
        console.log(`Расходы за месяц составят: ${appData.expensesMonth}`);
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);        
    },
    getTargetMonth: function () {
        if ((appData.mission / appData.budgetMonth) >= 0) {
            console.log(`Цель будет достигнута за ${Math.ceil(appData.mission / appData.budgetMonth)} месяцев(-а)`);
        } else if ((appData.mission / appData.budgetMonth) <= 0) {
            console.log(`Цель не будет достигнута`);
        }
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
           console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
            console.log('К сожалению у вас уровень дохода ниже среднего. Парам-парам, пам...');
        } else {
            console.log('Что то пошло не так');
        };
    },
    valuesInclude: function () {
        let arr = [];
        for (let k in appData) {
            if (typeof(appData[k]) === 'function') continue;
            if (typeof(appData[k]) === 'object') {
                appData[k] = JSON.stringify(appData[k])
            }
            arr.push(appData[k]);
        }
        console.log(`Наша программа включает в себя данные: ${arr.join('; ')}`);
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
                do {
                    appData.percentDeposit = prompt('Какой годовой процент?', 10);
                }
                while (!isNumber(cashExpenses));
            
                do {
                    appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                }
                while (!isNumber(cashExpenses));
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }

};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.valuesInclude();