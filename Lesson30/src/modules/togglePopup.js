import animate from './animate';

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

export default togglePopup;