import {
    addTodo,
    todos,
    displayTodos,
    toggleTodo,
    deleteTodo,
    clearCompleted,
} from "../index";

describe("Todo-list manipulation", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form class="todo-form">
                <input type="text" name="task">
                <button type="submit">Add</button>
            </form>
            <ul class="todo-list"></ul>
            <button class="clear-completed">CLEAR COMPLETED</button>
        `;
    });

    test("addTodo() should add a todo to the todos array", () => {
        addTodo({
            id: 1,
            description: "First",
            completed: false,
        });

        expect(todos).toHaveLength(1);
    });

    test("addTodo() should add a todo to the localStorage", () => {
        addTodo({
            id: 2,
            description: "Second",
            completed: false,
        });

        expect(JSON.parse(localStorage.getItem("todos"))).toHaveLength(2);
    });

    test("displayTodos() should display todos on the DOM", () => {

        const taskList = document.querySelector(".todo-list");
        displayTodos(todos, taskList);
        expect(document.querySelectorAll(".todo-list li")).toHaveLength(2);
        expect(document.querySelectorAll(".todo-list li")[0].textContent).toContain("First");
    });

    test("toggleTodo() should toggle the completed property of a todo", () => {
        toggleTodo(0);
        expect(todos[0].completed).toBeTruthy();
        toggleTodo(0);
        expect(todos[0].completed).toBeFalsy();
    });

    test("deleteTodo() should delete a todo from the todos array", () => {
        deleteTodo(0);
        expect(todos).toHaveLength(1);
    });

    test("clearCompleted() should clear all completed todos", () => {
        toggleTodo(0);
        clearCompleted();
        expect(todos).toHaveLength(0);
    });


    test("form submission should display a todo on the DOM", () => {
        const taskList = document.querySelector(".todo-list");
        const taskForm = document.querySelector(".todo-form");
        const taskInput = document.querySelector("input");

        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            addTodo({
                id: 1,
                description: taskInput.value,
                completed: false,
            });
            displayTodos(todos, taskList);
        });

        taskInput.value = "Third";
        taskForm.dispatchEvent(new Event("submit"));
        expect(document.querySelectorAll(".todo-list li")).toHaveLength(1);
        expect(document.querySelector(".todo-list li").textContent).toContain("Third");
    });

    test("clear completed button should clear all completed todos", () => {
        const clearCompletedBtn = document.querySelector(".clear-completed");
        toggleTodo(0);
        clearCompletedBtn.addEventListener("click", clearCompleted);
        clearCompletedBtn.dispatchEvent(new Event("click"));
        expect(document.querySelectorAll(".todo-list li")).toHaveLength(0);
    });

});


