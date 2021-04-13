const books = document.querySelectorAll('.book');
const booksWrapper = document.querySelector('.books');
const advertising = document.querySelector('.adv');
const body = document.querySelector('body');
const liElementsBook2 = books[0].children[1].querySelectorAll('li');
const liElementsBook5 = books[5].children[1].querySelectorAll('li');
const ulElementBook6 = books[2].children[1];

/* Восстановить порядок книг */
booksWrapper.prepend(books[1]);
books[0].after(books[4]);
booksWrapper.append(books[2]);

/* Заменить картинку заднего фона */
body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

/* Исправить заголовок в книге 3 */
books[4].children[0].firstElementChild.innerText = 'Книга 3. this и Прототипы Объектов';

/* Удалить рекламу */ 
advertising.remove();

/* Восстановиление порядка глав в Книга 2*/ 
liElementsBook2[3].after(liElementsBook2[6]);
liElementsBook2[6].after(liElementsBook2[8]);
liElementsBook2[9].after(liElementsBook2[2]);

/* Восстановиление порядка глав в Книга 5*/ 
liElementsBook5[1].after(liElementsBook5[9]);
liElementsBook5[9].after(liElementsBook5[3]);
liElementsBook5[4].after(liElementsBook5[2]);
liElementsBook5[7].after(liElementsBook5[5]);

/* Добавление главы в Книга 6*/
let chapter = document.createElement('li');
chapter.textContent = 'Глава 8: За пределами ES6';
ulElementBook6.append(chapter);