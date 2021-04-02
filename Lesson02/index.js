let money = 1200;
let income = 'Подработка';
let addExpenses = 'Телефон, интернет, топливо';
let deposit = false;
let mission = 50000;
let period = 6;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);

console.log(`Цель заработать за ${period} месяцев ${mission}$`);

const arr = addExpenses.toLowerCase().split(', ');
console.log(arr);

let budgetDay = money / 30;
console.log(budgetDay);


