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
    mission: 50000,
    period: 6,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','Квартплата, еда, топливо');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        (function (monthExpensesAmount) {
            for (let i = 0; i < 2; i++) {
                let key = prompt('Введите обязательную статью расходов', 'еда');
                do {
                    monthExpensesAmount[key] = prompt('Во сколько это обойдется?', 150);
                }
                while (!isNumber(monthExpensesAmount[key]));
            }
        })(appData.expenses);
    },
    getExpensesMonth: function(expenses) {
        let sum = 0;
        for (let key in expenses) {
           sum += +expenses[key];
        }
        appData.expensesMonth = sum;
        console.log(`Расходы за месяц составят: ${appData.expensesMonth}`);
    },
    getBudget: function (moneyIncome, monthExpens) {
        appData.budgetMonth = moneyIncome - monthExpens;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);        
    },
    getTargetMonth: function (target, monthAccumulate) {
        if ((target / monthAccumulate) >= 0) {
            console.log(`Цель будет достигнута за ${Math.ceil(target / monthAccumulate)} месяцев(-а)`);
        } else if ((target / monthAccumulate) <= 0) {
            console.log(`Цель не будет достигнута`);
        }
    },
    getStatusIncome: function (dayExpenses) {
        if (dayExpenses >= 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (dayExpenses >= 600 && dayExpenses < 1200) {
           console.log('У вас средний уровень дохода');
        } else if (dayExpenses >= 0 && dayExpenses < 600) {
            console.log('К сожалению у вас уровень дохода ниже среднего. Парам-парам, пам...');
        } else {
            console.log('Что то пошло не так');
        };
    },

};

appData.asking();
appData.getExpensesMonth(appData.expenses);
appData.getBudget(appData.budget, appData.expensesMonth);
appData.getTargetMonth(appData.mission, appData.budgetMonth);
appData.getStatusIncome(appData.budgetDay);
