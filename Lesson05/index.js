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

function getExpensesMonth(a, b) {
    return a + b;
}
console.log(`Расходы за месяц составят: ${getExpensesMonth(amount1, amount2)}`);

console.log(addExpenses.toLowerCase().split(', '));

function getAccumulatedMonth(a) {
    return a - getExpensesMonth(amount1, amount2);
}

let accumulatedMonth = getAccumulatedMonth(money);

function getTargetMonth(a, b) {
    return a / b;
}
console.log(`Цель будет достигнута за ${Math.ceil(getTargetMonth(mission, accumulatedMonth))} месяцев(-а)`);

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log(`Бюджет на день ${budgetDay}`);

let getStatusIncome = function (a) {
    if (a >= 1200) {
        return 'У вас высокий уровень дохода'
    } else if (a >= 600 && a < 1200) {
       return 'У вас средний уровень дохода'
    } else if (a >= 0 && a < 600) {
        return 'К сожалению у вас уровень дохода ниже среднего. Парам-парам, пам...'
    } else {
    'Что то пошло не так'
    };
};
console.log(getStatusIncome(budgetDay));