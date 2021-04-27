'use strict';


class ToDo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
        this.todoContainer = document.querySelector(todoContainer);
    }
    animate({duration, draw, timing}, callback) {
    
        let start = performance.now();
    
        requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
    
        let progress = timing(timeFraction)
    
        draw(progress);
    
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
        if (timeFraction === 1) callback();
        });
    }

    addToStorage(){
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]))
    }

    render(){
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }
    createItem(todo){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e){
        e.preventDefault();
        if(this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            }
            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.input.value = '';
        } else alert('Нельзя добавить пустое дело');
    }

    generateKey(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(elem){
        this.animate({
            duration: 350,
            timing: function(timeFraction) {
            return timeFraction;
            },
            draw: function(progress) {
                elem.style.left = progress * -110 + '%';
            }
        }, this.render.bind(this));

        this.todoData.forEach((item) => {
            if (item.key === elem.key) this.todoData.delete(item.key);
        })
    }

    completedItem(elem){
        this.todoData.forEach((item) => {
            if (item.key === elem.key) {
                item.completed = !item.completed;
            }
        })
        this.animate({
            duration: 350,
            timing: function(timeFraction) {
                return timeFraction;
            },
            draw: function(progress) {
                elem.style.left = progress * 110 + '%';
            }
        }, this.render.bind(this));
    }

    editItem(elem){
        elem.children[0].setAttribute('contenteditable', 'true');
        elem.children[0].focus();
        elem.children[0].addEventListener('blur', () => {
            if (elem.children[0].innerText.trim() === '') {
                elem.style.border = '1px solid red';
                elem.children[0].focus();
                document.querySelectorAll('.todo-buttons > button').forEach(btn => btn.setAttribute('disabled', 'true'));
            } else {
                elem.children[0].removeAttribute('contenteditable')
                this.todoData.forEach((item) => {
                    if (item.key === elem.key) {
                        item.value = elem.children[0].innerText;
                    }
                }) 
                this.render();
            }
        })
    }
    
    handler(){
        this.todoContainer.addEventListener('click', (e) => {
            e.preventDefault();
            let elem = e.target.closest('.todo-item');
            if(e.target.matches('.todo-remove')) this.deleteItem(elem);
            if(e.target.matches('.todo-complete')) this.completedItem(elem);
            if(e.target.matches('.todo-edit')) this.editItem(elem);
        })
    }

    init(){
        this.form.addEventListener('submit', this.addTodo.bind(this))
        this.render();
        this.handler();
    }
}

const todo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();