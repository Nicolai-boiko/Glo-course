const sendForm = () => {
        
    const forms = document.querySelectorAll('form');
    
    const errorMesage = 'Что то пошло не так';
    const successMesage = 'Спасибо! Мы скоро свяжемся с вами!';
            
    const statusMessage = document.createElement('div');

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }
    
    forms.forEach(form => form.addEventListener('submit', (e) => {
        e.preventDefault();
        statusMessage.innerHTML = `
        <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
        `;
        form.appendChild(statusMessage);

        const formData = new FormData(form);
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        })
        postData(body)
            .then((response) => {
                if (response.status !== 200){
                    throw new Error('Все пропало!')
                }
                statusMessage.style.cssText = 'font-size: 2rem; color: #fff';
                statusMessage.innerHTML = successMesage;
                let inputs = form.querySelectorAll('input');
                inputs.forEach(input => input.value = '');
            })
            .catch(error => {
                statusMessage.innerHTML = errorMesage;
                console.log(error)
            });
    }));
}

export default sendForm;