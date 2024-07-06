import Task from './task.js';
import ToDoList from './todoList.js';

document.addEventListener('DOMContentLoaded', () => {
    const toDoList = new ToDoList();

    const newTaskTitle = document.getElementById('new-task-title');
    const newTaskDesc = document.getElementById('new-task-desc');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('#filters button');
    const fetchTasksBtn = document.getElementById('fetch-tasks-btn');

    let currentFilter = 'all';

    const renderTasks = () => {
        taskList.innerHTML = '';
        toDoList.filterTasks(currentFilter).forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            if (task.isComplete) taskItem.classList.add('complete');

            taskItem.innerHTML = `
                <span>
                    <strong>${task.title}</strong><br>
                    ${task.description}
                </span>
                <div>
                    <button class="complete-btn">${task.isComplete ? 'Undo' : 'Complete'}</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">X</button>
                </div>
            `;

            taskItem.querySelector('.complete-btn').addEventListener('click', () => {
                toDoList.toggleTaskComplete(task.id);
                renderTasks();
            });

            taskItem.querySelector('.edit-btn').addEventListener('click', () => {
                newTaskTitle.value = task.title;
                newTaskDesc.value = task.description;
                addTaskBtn.textContent = 'Update Task';
                addTaskBtn.dataset.editing = task.id;
            });

            taskItem.querySelector('.delete-btn').addEventListener('click', () => {
                toDoList.deleteTask(task.id);
                renderTasks();
            });

            taskList.appendChild(taskItem);
        });
    };

    addTaskBtn.addEventListener('click', () => {
        const title = newTaskTitle.value.trim();
        const description = newTaskDesc.value.trim();

        if (title && description) {
            if (addTaskBtn.dataset.editing) {
                const taskId = parseInt(addTaskBtn.dataset.editing, 10);
                toDoList.editTask(taskId, { title, description });
                addTaskBtn.textContent = 'Add Task';
                delete addTaskBtn.dataset.editing;
            } else {
                const task = new Task(title, description);
                toDoList.addTask(task);
            }
            renderTasks();
            newTaskTitle.value = '';
            newTaskDesc.value = '';
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentFilter = button.dataset.filter;
            renderTasks();
        });
    });

    fetchTasksBtn.addEventListener('click', () => {
        const apiEndpoint = 'https://jsonplaceholder.typicode.com/todos'; // Example API endpoint
        toDoList.fetchTasks(apiEndpoint).then(renderTasks);
    });

    renderTasks();
});