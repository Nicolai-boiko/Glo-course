class Validator {
    constructor({selector, pattern = {}, method}){
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
         });
         this.error = new Set();
    }

    init(){
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
        this.form.addEventListener('submit', e => {
            this.elementsForm.forEach(elem => this.checkIt({taget: elem}));
            if (this.error.size) {
                e.preventDefault();
            }
        })
    }

    isValid(elem){
        const validatorMethod = {
            notEmpty(elem){
                if(elem.value.trim() === ''){
                    return false;
                }
                return true;
            },
            pattern(elem, pattern){
                return pattern.test(elem.value);
            }
        };
        if (this.method) {
            const method = this.method[elem.dataset.attr];

            if(method){
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        }

        return true;
    }   

    checkIt(event){
        const target = event.target;
        if(this.isValid(target)){
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }
    }

    showError(elem){
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextSibling && elem.nextSibling.nodeName === '#text') {
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'Ошибка в этом поле';
            errorDiv.classList.add('validator-error');
            elem.insertAdjacentElement('afterend', errorDiv);
        }
        
    }

    showSuccess(elem){
        elem.classList.remove('error')
        elem.classList.add('success')
        if (elem.nextSibling && elem.nextSibling.classList.contains('validator-error')){
            elem.nextSibling.remove();
        }
    }

    applyStyle(){
        const style = document.createElement('style');
        style.textContent = `
        input.success {
            border: 2px solid green !important
        }
        input.error {
            border: 2px solid red !important
        }
        .validator-error {
            font-size: 12px;
            font-family: sans-serif;
            position: relative;
            top: -25px;
            color: red;
        }
        `
        document.head.appendChild(style);
    }

    setPattern(){
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78][-()]*\d{10}/;
        }
        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
        if (!this.pattern.text) {
            this.pattern.text = /[а-яА-Я\s]+/;
        }
    }
}




const valid1 = new Validator({

    selector: '#form1',
    pattern: {
        phone: /^\+375\d{9}$/,
        zip: /\d{5,6}/
    },
    method: {
        'text': [
            ['notEmpty'],
            ['pattern', 'text']
        ],
        'phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
    },
})
const valid2 = new Validator({

    selector: '#form2',
    pattern: {
        phone: /^\+375\d{9}$/,
        zip: /\d{5,6}/
    },
    method: {
        'text': [
            ['notEmpty'],
            ['pattern', 'text']
        ],
        'phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
    },
})
const valid3 = new Validator({

    selector: '#form3',
    pattern: {
        phone: /^\+375\d{9}$/,
        zip: /\d{5,6}/
    },
    method: {
        'text': [
            ['notEmpty'],
            ['pattern', 'text']
        ],
        'phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
    },
})


valid1.init();
valid2.init();
valid3.init();