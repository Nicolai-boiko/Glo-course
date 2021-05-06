function counterTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours');
    let timerMinutes = document.querySelector('#timer-minutes');
    let timerSeconds = document.querySelector('#timer-seconds');
    let timerDays = document.querySelector('#timer-days');
    let timerNumbers = document.querySelectorAll('.timer-numbers');


    function getTimeRemaining (){
        let dateStop = new Date(deadline).getTime();
        let dateNow = new Date().getTime();
        let timeRemaining = (dateStop - dateNow) / 1000;
        let seconds = Math.floor(timeRemaining % 60);
        let minutes = Math.floor((timeRemaining / 60) % 60);
        let hours = Math.floor((timeRemaining / 3600) % 24);
        let days = Math.floor(timeRemaining / 3600 / 24);
        return {timeRemaining, hours, minutes, seconds, days}
    }
    function updateClock() {
        function addZero(x) {
            return (parseInt(x, 10) < 10 && parseInt(x, 10) >= 0 ? '0' : '') + x;
        }
        let timer = getTimeRemaining();
        if (timer.timeRemaining < 0) {
            timerNumbers.forEach(num => num.style.color = 'red');
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
            timerDays.textContent = '0';
        } else {        
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);
            timerDays.textContent = timer.days;
        }
    }
    updateClock();
    setInterval(updateClock, 1000);
}

export default counterTimer;