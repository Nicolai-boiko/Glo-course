import animate from './animate';

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

export default scrollNextSlide;