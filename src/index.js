/*
Examen GRI primer módulo
Autor: Donato Ramos Martínez
*/
'use strict';
const taskList = []; // Lista de tareas inicial
const form = document.getElementById('form'); // Formulario de entrada de Tareas
const inputTask = document.getElementById('task'); // Input de entrada de Tarea
const divErrors = document.getElementById('error'); // Div en donde aparecerán los errores
const ulResponse = document.getElementById('response'); // Lista en donde se insertarán las Tareas
/**
 *
 * @param {String} value Texto que queremos que aparezca dentro del botón
 * @param {Function} callback Función que se ejecutará cuando se haga click en el botón
 * @returns Devuelve el botón debidamente creado
 */
const createButton = (value, callback) => {
    const button = document.createElement('button');
    button.textContent = value;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', callback, false);
    return button;
};
/**
 * Función que cambia el estado del objeto que almacena la tarea seleccionada
 * @param {*} event Evento que se dispara al hacer click en el botón
 */
const toggleCompleted = (event) => {
    const button = event.target;
    const li = event.target.parentElement;
    const index = parseInt(li.getAttribute('data-index'));
    taskList.forEach((taskItem, id) => {
        if (id === index) {
            taskItem.completed = !taskItem.completed;
        }
    });
    showTaskList();
};
/**
 * Función que borra la tarea seleccionada de la lista de tareas
 * @param {*} event Evento que se produce cuando se hace clic sobre el botón de borrar
 */
const deleteTask = (event) => {
    const index = Number(event.target.parentElement.getAttribute('data-index'));
    taskList.splice(index, 1);
    showTaskList();
};
/**
 * Función que muestra la lista de tareas en el DOM
 */
const showTaskList = () => {
    ulResponse.innerHTML = '';
    if (taskList.length > 0) {
        taskList.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.task;
            li.setAttribute('data-index', index);
            li.setAttribute('role', 'list-item');
            li.classList.toggle('completed', task.completed);
            li.appendChild(
                createButton(
                    task.completed ? 'deshacer' : 'completar',
                    toggleCompleted
                )
            );
            li.appendChild(createButton('borrar', deleteTask));
            ulResponse.appendChild(li);
        });
    }
};
/**
 * Función que muestra un mensaje de error temporizado en el DOM
 */
const throwError = () => {
    const TIME_ERROR = 1500; // 1.5 segundos
    const spanError = document.createElement('span');
    spanError.textContent = 'La tarea insertada no es válida';
    spanError.classList = 'error';
    divErrors.appendChild(spanError);
    const idResume = setTimeout(() => {
        divErrors.innerHTML = '';
    }, TIME_ERROR);
};
// Se controla el evento submit del formulario para ejecutar la política de negocio
form.addEventListener(
    'submit',
    (event) => {
        event.preventDefault();
        const taskValue = inputTask.value.trim();
        // Comprobamos si dentro del input de tarea hay algo escrito
        if (taskValue === '') {
            throwError();
        } else {
            taskList.push({
                task: taskValue,
                completed: false
            });
            showTaskList();
            inputTask.value = '';
        }
        inputTask.focus();
    },
    false
);
