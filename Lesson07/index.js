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
            console.log(appData.expenses);
        })(appData.expenses);
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
            arr.push(appData[k]);
        }
        console.log(`Наша программа включает в себя данные: ${arr.join('; ')}`);
    }

};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.valuesInclude();
