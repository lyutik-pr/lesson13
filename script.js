"use strict";

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const todoDeleted = [];

var toDoData = [
    /*{
        text: 'Сварить кофе',
        completed: false,
    },
    {
        text: 'Помыть посуду',
        completed: true,
    },*/
];

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = ''; //очищаем список для нового ввода

    toDoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>'; //добавили в верстку, а из самого файла HTML удаляем

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed; //меняем значение кнопки на противоположное
            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', function () {
            item.removed = 'no';  
            
                let search = 'no';
                let n = toDoData.findIndex(i => i.removed === search); 
                toDoData.splice(n, 1);
                //delete toDoData[n];
                render(); 
                    
        });
        localStorage.setItem("toDoData", JSON.stringify(toDoData));
        console.dir(toDoData);
    });

    localStorage.setItem("toDoData", JSON.stringify(toDoData));
};

todoControl.addEventListener('submit', function (event) {
    toDoData = JSON.parse(localStorage.getItem("toDoData"));
    event.preventDefault(); // submit без перезагрузки
    
    if (headerInput.value) {
        const newToDo = {
            text: headerInput.value,
            completed: false,
            removed: 'yes',
        }
        toDoData.push(newToDo);
        headerInput.value = '';
        render();
        
    } else {
        alert('One more try');
    };

});


console.log(typeof toDoData); // объект
console.log(toDoData); // [1, 2, 3]

