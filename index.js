// To-do methods for the to-do list with local storage

export let todos = JSON.parse(localStorage.getItem('todos')) || [];

const todoForm = document.querySelector('.todo-form');
const clearCompletedBtn = document.querySelector('.clear-completed');
const todoList = document.querySelector('.todo-list');

// reorganize todo ids after deleting
const updateTodoIds = () => {
    for (let i = 0; i < todos.length; i++) {
        todos[i].id = i + 1;
    }
};

export const displayTodos = (tasks, taskList) => {
    while (taskList?.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    tasks?.forEach((task, i) => {
        const listItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.dataset.index = i;
        checkbox.id = `task${i}`;
        checkbox.checked = task.completed;

        const label = document.createElement('label');
        label.htmlFor = `task${i}`;
        label.textContent = task.description;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.dataset.index = i;
        deleteBtn.textContent = 'x';

        listItem.append(checkbox, label, deleteBtn);
        taskList.append(listItem);
    });
};

export const addTodo = (todo) => {
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

export const toggleTodo = (index) => {
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
};

export const deleteTodo = (index) => {
    todos.splice(index, 1);
    updateTodoIds();
    localStorage.setItem('todos', JSON.stringify(todos));
};

export const clearCompleted = () => {
    todos = todos.filter(todo => !todo.completed);
    updateTodoIds();
    localStorage.setItem('todos', JSON.stringify(todos));
};

window.addEventListener('DOMContentLoaded', displayTodos(todos, todoList));

clearCompletedBtn?.addEventListener('click', () => {
    clearCompleted();
    displayTodos(todos, todoList);
});

todoForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('[name=task]');
    const description = input.value;
    const todo = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        description,
        completed: false,
    };
    addTodo(todo);
    displayTodos(todos, todoList);
    input.value = '';
});

todoList?.addEventListener('click', (e) => {
    if (e.target.classList.contains('checkbox')) {
        toggleTodo(e.target.dataset.index);
        displayTodos(todos, todoList);
    }
    if (e.target.classList.contains('delete-btn')) {
        deleteTodo(e.target.dataset.index);
        displayTodos(todos, todoList);
    }
});
