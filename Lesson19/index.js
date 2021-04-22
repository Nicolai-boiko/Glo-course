window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    


    // Timer
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
    counterTimer('01 may 2021');

    // Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');
        const closeBtn = document.querySelector('.close-btn');
        const menuItem = menu.querySelectorAll('ul > li > a');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }


        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItem.forEach(item => item.addEventListener('click', handlerMenu));
    }

    toggleMenu();

    // Popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popupClose = document.querySelector('.popup-close');
        const popupContent = document.querySelector('.popup .popup-content');

        function animate({duration, draw, timing}) {

            let start = performance.now();
          
            requestAnimationFrame(function animate(time) {
              let timeFraction = (time - start) / duration;
              if (timeFraction > 1) timeFraction = 1;
          
              let progress = timing(timeFraction)
          
              draw(progress);
          
              if (timeFraction < 1) {
                requestAnimationFrame(animate);
              }
          
            });
        }


        popupBtn.forEach(btn => btn.addEventListener('click', () => {
            if (document.documentElement.clientWidth > 768) {
                animate({
                    duration: 300,
                    timing: function(timeFraction) {
                    return timeFraction;
                    },
                    draw: function(progress) {
                        popup.style.display = 'block';
                        popupContent.style.top = 100 - (progress * 90) + '%';
                    }
                });
            } else {
                popup.style.display = 'block';
            }
        }));
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
        popup.addEventListener('click', (e) => {
            if (e.target === document.querySelector('.popup')) {
                popup.style.display = 'none';
            }
        });
    };
    togglePopup();
});
