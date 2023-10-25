document.addEventListener('DOMContentLoaded', function () {
    const todoList = document.getElementById('todo-list');
    const todoInput = document.getElementById('todo-input');
    const addTodoForm = document.getElementById('add-todo-form');
    const logoutButton = document.getElementById('logout-button'); // Get the logout button

    // Load initial tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        todoList.innerHTML = '';
        savedTasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${task}</span>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            todoList.appendChild(listItem);
        });
    }

    renderTasks();

    addTodoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const newTask = todoInput.value.trim();
        if (newTask !== '') {
            savedTasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
            todoInput.value = '';
            renderTasks();
        }
    });

    todoList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-button')) {
            const index = e.target.getAttribute('data-index');
            savedTasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
            renderTasks();
        }
    });

    // Logout action
    logoutButton.addEventListener('click', function () {
        // Perform logout action, e.g., clearing the session and redirecting to the login page
        // Replace the following line with your logout logic
        window.location.href = '/login'; // Redirect to the login page
    });
});
