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

export default slider;