const toggleMenu = () => {
    const menu = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const body = document.querySelector('body');
    const menuItem = [...menu.querySelectorAll('ul > li > a')];

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    }

    body.addEventListener('click', (e) => {
        if (e.target.closest('.menu') || e.target === closeBtn ||  menuItem.find(item => item === e.target) || menu.matches('.active-menu') && !e.target.closest('menu')) {
            handlerMenu();
        }
    })
}

export default toggleMenu;