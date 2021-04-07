let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};


let money;
let income = 'Подработка';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','пример: Квартплата, проездной, кредит');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 50000;
let period = 6;
let expenses = [];

(function (){
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
})();


function showTypeOf(data) {
    console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

function getExpensesMonth(monthExpensesAmount) {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        monthExpensesAmount[i] = prompt('Введите обязательную статью расходов', 'еда');
        do {
            sum += +prompt('Во сколько это обойдется?', 150);
        }
        while (!isNumber(sum));
    }
    return sum;
}
let expensesAmount = getExpensesMonth(expenses);
console.log(`Расходы за месяц составят: ${expensesAmount}`);

console.log(addExpenses.toLowerCase().split(', '));

function getAccumulatedMonth(income) {
    return income - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth(money);

function getTargetMonth(target, monthAccumulate) {
    if ((target / monthAccumulate) >= 0) {
        console.log(`Цель будет достигнута за ${Math.ceil(target / monthAccumulate)} месяцев(-а)`);
    } else if ((target / monthAccumulate) <= 0) {
        console.log(`Цель не будет достигнута`);
    }
}
getTargetMonth(mission, accumulatedMonth);

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log(`Бюджет на день ${budgetDay}`);

let getStatusIncome = function (dayExpenses) {
    if (dayExpenses >= 1200) {
        return 'У вас высокий уровень дохода'
    } else if (dayExpenses >= 600 && dayExpenses < 1200) {
       return 'У вас средний уровень дохода'
    } else if (dayExpenses >= 0 && dayExpenses < 600) {
        return 'К сожалению у вас уровень дохода ниже среднего. Парам-парам, пам...'
    } else {
        return 'Что то пошло не так'
    };
};
console.log(getStatusIncome(budgetDay));