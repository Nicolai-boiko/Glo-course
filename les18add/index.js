let text = document.querySelector('.text');
let daysArr = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
let newYearDate = new Date('1 january 2022').getTime();

function getTime() {
    let date = new Date();
    let hours = date.getHours();
    let day = date.getDay();
    let time = date.toLocaleTimeString('en');
    let daysLeft = Math.floor((newYearDate - date.getTime()) / 1000 / 3600 / 24);
    return {hours, day, time, daysLeft}
}


function showTime() {
    let timeData = getTime();
    text.innerText = `${timeData.hours > 5 && timeData.hours < 12 ? 'Доброе утро' :
    timeData.hours > 12 && timeData.hours < 18 ? 'Добрый день' :
    timeData.hours > 18 && timeData.hours < 23 ? 'Добрый день' :
    'Доброй ночи'}
    Сегодня: ${daysArr[timeData.day]}
    Текущее время: ${timeData.time}
    До нового года осталось ${timeData.daysLeft} дней
    `
}
setInterval(showTime, 1000);
