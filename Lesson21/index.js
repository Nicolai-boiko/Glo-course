window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    //Анимация
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
        const menu = document.querySelector('menu');
        const closeBtn = document.querySelector('.close-btn');
        const body = document.querySelector('body');
        const menuItem = [...menu.querySelectorAll('ul > li > a')];

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }

        body.addEventListener('click', (e) => {
            if (e.target.closest('.menu') || e.target === closeBtn ||  menuItem.find(item => item === e.target) || menu.matches('.active-menu') && !e.target.closest('menu')) {
                handlerMenu();
            }
        })
    }

    toggleMenu();

    // Popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popupClose = document.querySelector('.popup-close');
        const popupContent = document.querySelector('.popup .popup-content');

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
        popup.addEventListener('click', (e) => {
            if (e.target === popup || e.target === popupClose) {
                popup.style.display = 'none';
            }
        });
    };
    togglePopup();

    //Прокрутка по пунктам меню и кнопке с картинкой мышки
    const scrollNextSlide = () => {
        const nextSlideBtn = document.querySelector('[href="#service-block"]');
        const mainHeight = document.querySelector('main').getBoundingClientRect().height;
        const menu = document.querySelector('menu');
        const menuItem = menu.querySelectorAll('ul > li > a');
        let arrHeight = [];
        menuItem.forEach((item, i) => {
            let attr = item.getAttribute('href');
            let elemHeight = document.querySelector(`${attr}`).getBoundingClientRect().height;
            arrHeight.push(elemHeight);
            let neededHeight = arrHeight.reduce((acc, value) => acc + value, 0);
            item.addEventListener('click', (e) => {
                e.preventDefault();
                animate({
                    duration: 500,
                    timing: function(timeFraction) {
                    return timeFraction;
                    },
                    draw: function(progress) {
                        if (document.documentElement.scrollTop === 0){
                            document.documentElement.scrollTop = progress * (neededHeight - elemHeight);
                        } else {
                            window.scrollBy(0, progress * (neededHeight - elemHeight - document.documentElement.scrollTop))
                        }
                    }
                });
            })
        })

        nextSlideBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            animate({
                duration: 500,
                timing: function(timeFraction) {
                return timeFraction;
                },
                draw: function(progress) {
                    if (document.documentElement.scrollTop === 0){
                        document.documentElement.scrollTop = progress * mainHeight;
                    } else {
                        window.scrollBy(0, progress * (mainHeight - document.documentElement.scrollTop))
                    }
                }
            });
        })
    }
    scrollNextSlide();

    //Tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header');
        const tab = tabHeader.querySelectorAll('.service-header-tab');
        const tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if(index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        }

        tabHeader.addEventListener('click', (e) => {
            let target = e.target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    }
    tabs();
    //Слайдер
    const slider = () => {
        const slider = document.querySelector('.portfolio-content');
        const slide = document.querySelectorAll('.portfolio-item');
        const ulDots = document.querySelector('.portfolio-dots');

        
        for (let i = 0; i < slide.length; i++) {
            let li = document.createElement('li');
            li.className = 'dot';
            if (i === 0) {
                li.classList.add('dot-active');
                ulDots.append(li);
            } else {
                ulDots.append(li);
            }
        }
        
        const dot = document.querySelectorAll('.dot');

        let currentSlide = 0;
        let interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        }

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        }

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++
            if (currentSlide >= slide.length) currentSlide = 0;
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 1000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };
        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return
            };

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((dot, index) => {
                    if (dot === target) {
                        currentSlide = index;
                    }
                });
            }
            if(currentSlide >= slide.length) currentSlide = 0;
            if(currentSlide < 0) currentSlide = slide.length - 1;
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });
        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn, .dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn, .dot')) {
                startSlide();
            }
        });
        startSlide(4000);
    }
    slider();
});
