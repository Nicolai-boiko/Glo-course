let money = +prompt('Ваш месячный доход?', 1200);
let income = 'Подработка';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','пример: Квартплата, проездной, кредит');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 50000;
let period = 6;
let expenses1 = prompt('Введите обязательную статью расходов', 'еда');
let amount1 = +prompt('Во сколько это обойдется?', 100);
let expenses2 = prompt('Введите ещё одну обязательную статью расходов', 'квартплата');
let amount2 = +prompt('Во сколько это обойдется?', 150);

function showTypeOf(data) {
    console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

function getExpensesMonth(expensesAmount1, expensesAmount2) {
    return expensesAmount1 + expensesAmount2;
}
console.log(`Расходы за месяц составят: ${getExpensesMonth(amount1, amount2)}`);

console.log(addExpenses.toLowerCase().split(', '));

let expensesMonth = getExpensesMonth(amount1, amount2);

function getAccumulatedMonth(income) {
    return income - expensesMonth;
}

let accumulatedMonth = getAccumulatedMonth(money);

function getTargetMonth(target, monthAccumulate) {
    return target / monthAccumulate;
}
console.log(`Цель будет достигнута за ${Math.ceil(getTargetMonth(mission, accumulatedMonth))} месяцев(-а)`);

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
    'Что то пошло не так'
    };
};
console.log(getStatusIncome(budgetDay));