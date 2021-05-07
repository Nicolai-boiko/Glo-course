const validation = () => {
        
    const body = document.querySelector('body');
    const inputs = document.querySelectorAll('.footer-form-input > .row > div > input, .main-form-input > .row > div > input');

    function maskPhone(selector, masked = '+7 (___) ___-__-__') {
        const elems = document.querySelectorAll(selector);
    
        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            let i = 0,
                newValue = template.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i != -1) {
                newValue = newValue.slice(0, i);
            }
            let reg = template.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }
            if (event.type == "blur" && this.value.length < 5) {
                this.value = "";
            }
    
        }
    
        for (const elem of elems) {
            elem.addEventListener("input", mask);
            elem.addEventListener("focus", mask);
            elem.addEventListener("blur", mask);
        }
        
    }
    maskPhone('.form-phone');

    function validForm (e) {
        if (e.target.name === 'user_name') {
            if (e.target.value.length < 3) {
                e.target.setCustomValidity('Имя не может быть короче 3 букв')
            } else {
                e.target.setCustomValidity('');
            }
            const regexpText = /[^а-яА-Я\s]/g;
            e.target.value = e.target.value.replace(regexpText, '');
        } else if (e.target.name === 'user_message') {
            const regexpText = /[^а-яА-Я0-9.,!?;:'" ]/g;
            e.target.value = e.target.value.replace(regexpText, '');
        } else if (e.target.type === 'email') {
            let validEmail = e.target.value;
            e.target.value = '';
            e.target.value = validEmail;
            const regexpEmail = /[^a-zA-Z0-9-@_.!~*']/g;
            e.target.value = e.target.value.replace(regexpEmail, '');
            e.target.value = e.target.value.replace(/-{2,}/, '-');
            e.target.value = e.target.value.replace(/\.{2,}/, '.');
        } else if (e.target.type === 'number') {
            const regexpCalc = /\D/gi;
            e.target.value = e.target.value.replace(regexpCalc, '');
        } else if (e.target.type === 'tel') {
            if (e.target.value.length < 18) {
                e.target.setCustomValidity('Не полный номер телефона')
            } else {
                e.target.setCustomValidity('');
            }
        }
    }

    body.addEventListener('input', (e) => validForm (e));
    inputs.forEach(input => input.addEventListener('blur', (e) => {
        validForm (e)
        if (e.target.type !== 'email') {
            e.target.value = e.target.value.trim();
            if(e.target.value !== ''){
                e.target.value = e.target.value.replace(/\s{2,}/, ' ');
                e.target.value = e.target.value[0].toUpperCase() + e.target.value.slice(1).toLowerCase();
            }
        } else {
            e.target.value = e.target.value.replace(/(^-|-$)/g, '')
            e.target.value = e.target.value.replace(/^\./g, '')
        };
    }));
}

export default validation;