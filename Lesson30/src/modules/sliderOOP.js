class SliderCarusel{
    constructor({main, wrap, next, prev, infinity = false, slidesToShow = 3, position = 0, responsive = []}){
        if(!main || !wrap){
            console.warn('slider-carusel: Необходимо 2 селектора, "main" и "wrap"');
        }
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.options = {
            infinity,
            position,
            widthSlide: Math.floor(100 / this.slidesToShow)

        };
        this.responsive = responsive;
    }

    init(){
        this.addGloClass();
        this.addStyle();
        if(this.prev && this.next) {
            this.controlSlider();
        } else {
            this.addArrow();
            this.controlSlider();
        }
        if (this.responsive) {
            this.responsiveInit();
        }
    }

    addGloClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');
        for (let item of this.slides) {
            item.classList.add('glo-slider__item');
        }
    }

    addStyle(){
        let style = document.getElementById('sliderCarusel-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarusel-style';
        }
        style.textContent = `
            .glo-slider{
                overflow: hidden !important;
                position: relative;
            }
            .glo-slider__wrap{
                display: flex !important;
                transition: transform 0.5s !important;
                will-change: transfrom !important;
            }
            .glo-slider__item{
                display: flex !important;
                justify-content: center;
                align-items: center;
                flex: 0 0 ${this.options.widthSlide}% !important;
                margin: auto 0 !important;
            }
            .glo-slider__button{
                margin: 0 10px;
                border: 20px solid transparent;
                background: transparent;
                cursor: pointer;
                position: absolute;
                bottom: 55%;
            }
            .glo-slider__next{
                border-left-color: grey;
                right: 0px;
            }
            .glo-slider__prev{
                border-right-color: grey;
                left: 0px;
            }
            .glo-slider__next:hover,
            .glo-slider__prev:hover,
            .glo-slider__next:focus,
            .glo-slider__prev:focus{
                background: transparent;
                outline: transparent;
            }
        `;

        document.head.appendChild(style);
    }
    controlSlider(){
        this.prev.addEventListener('click', this.prevSlider);
        this.next.addEventListener('click', this.nextSlider);
    }
    prevSlider = () => {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.slides.length - this.slidesToShow;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }
    nextSlider = () => {
        if(this.options.infinity || this.options.position < this.slides.length - this.slidesToShow){
            ++this.options.position;
            if (this.options.position > this.slides.length - this.slidesToShow) {
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }
    addArrow(){
        this.prev = document.createElement('button');
        this.next = document.createElement('button');
        this.prev.className = 'glo-slider__button glo-slider__prev';
        this.next.className = 'glo-slider__button glo-slider__next';

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);
    }
    responsiveInit(){
        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allResponse);

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if (widthWindow < maxResponse){
                for(let i = 0; i < allResponse.length; i++){
                    if(widthWindow < allResponse[i]){
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                        this.addStyle();
                    } 
                }
            } else {
                this.slidesToShow = slidesToShowDefault;
                this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                this.addStyle();
            }
        }
        checkResponse();
        window.addEventListener('resize', checkResponse)
    }
}





export default SliderCarusel;