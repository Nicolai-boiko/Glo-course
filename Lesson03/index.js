let money = prompt('Ваш месячный доход?', 1200);
let income = 'Подработка';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','пример: Квартплата, проездной, кредит');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 50000;
let period = 6;
let expenses1 = prompt('Введите обязательную статью расходов', 'еда');
let amount1 = prompt('Во сколько это обойдется?', 100);
let expenses2 = prompt('Введите ещё одну обязательную статью расходов', 'квартплата');
let amount2 = prompt('Во сколько это обойдется?', 150);

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);

console.log(`Цель заработать за ${period} месяцев ${mission}$`);

console.log(addExpenses.toLowerCase().split(', '));

let budgetMonth  = money - amount1 - amount2;
console.log(`Бюджет на на месяц ${budgetMonth}`);

let budgetDay = Math.floor(budgetMonth / 30);
console.log(`Бюджет на день ${budgetDay}`);

console.log(`Цель будет достигнута за ${Math.ceil(mission / budgetMonth)} месяцев(-а)`);

budgetDay >= 1200 ? console.log('У вас высокий уровень дохода') :
(budgetDay >= 600 && budgetDay < 1200) ? console.log('У вас средний уровень дохода') :
(budgetDay >= 0 && budgetDay < 600) ? console.log('К сожалению у вас уровень дохода ниже среднего. Парам-парам пам, пам, пам...') :
console.log('Что то пошло не так');
