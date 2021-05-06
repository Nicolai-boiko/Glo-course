import animate from './animate';

const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const clacType = document.querySelector('.calc-type');
    const clacSquare = document.querySelector('.calc-square');
    const clacCount = document.querySelector('.calc-count');
    const clacDay = document.querySelector('.calc-day');
    const totalValue = document.querySelector('#total');

    const countSum = () => {
        let total = 0;
        let countValue = 1;
        let dayValue = 1;
        const typeValue = clacType.options[clacType.selectedIndex].value;
        const squareValue = +clacSquare.value;

        if(clacCount.value > 1) {
            countValue += (clacCount.value - 1) / 10;
        }

        if (clacDay.value && clacDay.value < 5) {
            dayValue *= 2;
        } else if (clacDay.value && clacDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
        }

        animate({
            duration: 1000,
            timing: function(timeFraction) {
            return timeFraction;
            },
            draw: function(progress) {
                totalValue.textContent = Math.floor(progress * total);
            }
        });
        
    }

    calcBlock.addEventListener('change', (e) => {
        let target = e.target;
        if (target.matches('select') || target.matches('input')){
            countSum();
        }
    })
}

export default calc;