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