'use strict';

    import counterTimer from './modules/countTimer';
    import toggleMenu from './modules/toggleMenu';
    import togglePopup from './modules/togglePopup';
    import scrollNextSlide from './modules/scrollNextSlide';
    import tabs from './modules/tabs';
    import slider from './modules/slider';
    import changePhoto from './modules/changePhoto';
    import validation from './modules/validation';
    import calc from './modules/calc';
    import sendForm from './modules/sendForm';
    import SliderCarusel from './modules/sliderOOP';

    // Timer
    counterTimer('10 may 2021');

    // Меню
    toggleMenu();

    // Popup
    togglePopup();

    //Прокрутка по пунктам меню и кнопке с картинкой мышки
    scrollNextSlide();

    //Tabs
    tabs();

    //Слайдер
    slider();

    //Смена фоток
    changePhoto();

    //Валидация
    validation();
    
    //Калькулятор
    calc();

    //send-ajax-form
    sendForm();

    //ООП Слайдер партнеров
    const carusel = new SliderCarusel({
        main: '.companies-wrapper',
        wrap: '.companies-hor',
        slidesToShow: 4,
        infinity: true,
        responsive:[{
            breakpoint: 1024,
            slidesToShow: 3
        },
        {
            breakpoint: 768,
            slidesToShow: 2
        },
        {
            breakpoint: 576,
            slidesToShow: 1
        }        
    ]
    });

    carusel.init();