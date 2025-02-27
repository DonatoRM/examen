/*
Examen GRI
Autor: Donato Ramos Martínez
*/
'use strict';
const taskList = [];
const form = document.getElementById('form');
const task = document.getElementById('task');
const error = document.getElementById('error');
const response = document.getElementById('response');
const accessibility = document.getElementById('accessibility');
document.addEventListener(
    'DOMContentLoaded',
    () => {
        form.addEventListener(
            'submit',
            (event) => {
                event.preventDefault();
                const taskValue = task.value.trim();
                if (taskValue === '') {
                    const spanError = document.createElement('span');
                    spanError.classList.add('error');
                    spanError.textContent = 'Campo vacío. Introduce una tarea';
                    error.appendChild(spanError);
                    const idError = setTimeout(
                        () => (error.textContent = ''),
                        1500
                    );
                    task.focus();
                } else {
                    taskList.push({
                        task: taskValue,
                        completed: false
                    });
                    task.value = '';
                    task.focus();
                    readTasks();
                }
            },
            false
        );
        accessibility.addEventListener(
            'click',
            () => {
                const body = document.querySelector('body');
                if (body.classList.contains('accessibility')) {
                    body.classList.remove('accessibility');
                    document.querySelectorAll('button').forEach((button) => {
                        button.classList.remove('accessibility');
                    });
                    task.classList.remove('accessibility');
                } else {
                    body.classList.add('accessibility');
                    document.querySelectorAll('button').forEach((button) => {
                        button.classList.add('accessibility');
                    });
                    task.classList.add('accessibility');
                }
            },
            false
        );
    },
    false
);
const readTasks = () => {
    response.innerHTML = '';
    taskList.forEach((task) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        li.textContent = task.task;
        const buttonCompleted = document.createElement('button');
        if (task.completed) {
            buttonCompleted.setAttribute('aria-pressed', 'true');
            buttonCompleted.textContent = 'restablecer';
        } else {
            buttonCompleted.setAttribute('aria-pressed', 'false');
            buttonCompleted.textContent = 'Completar';
        }
        buttonCompleted.setAttribute('aria-label', 'Botón de completar tarea');

        const buttonDelete = document.createElement('button');
        buttonDelete.setAttribute('aria-label', 'Botón de eliminar tarea');
        buttonDelete.textContent = 'Eliminar';
        buttonCompleted.addEventListener('click', taskCompleted, false);
        buttonDelete.addEventListener('click', taskDelete, false);
        li.appendChild(buttonCompleted);
        li.appendChild(buttonDelete);
        response.appendChild(li);
    });
};
const taskCompleted = (event) => {
    const button = event.target;
    const li = button.parentElement;
    console.log('Botón:', button); // Verifica el botón
    if (button.getAttribute('aria-pressed') === 'false') {
        button.setAttribute('aria-pressed', 'true');
        taskList.forEach((task) => {
            if (task.task === li.firstChild.textContent) {
                task.completed = true;
            }
        });
    } else {
        button.setAttribute('aria-pressed', 'false');
        taskList.forEach((task) => {
            if (task.task === li.firstChild.textContent) {
                task.completed = false;
            }
        });
    }
    readTasks();
};
const taskDelete = (event) => {
    const button = event.target;
    const li = button.parentElement;
    const index = taskList.findIndex((element) => {
        return element.task === li.firstChild.textContent;
    });
    if (index !== -1) {
        taskList.splice(index, 1);
    }
    readTasks();
};
