import Task from './task.js';

export default class ToDoList {
    constructor() {
        this.tasks = this.loadTasks() || [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
    }

    editTask(taskId, updatedTask) {
        this.tasks = this.tasks.map(task => 
            task.id === taskId ? { ...task, ...updatedTask } : task
        );
        this.saveTasks();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    }

    toggleTaskComplete(taskId) {
        this.tasks = this.tasks.map(task => 
            task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
        );
        this.saveTasks();
    }

    filterTasks(filter) {
        switch (filter) {
            case 'completed':
                return this.tasks.filter(task => task.isComplete);
            case 'incomplete':
                return this.tasks.filter(task => !task.isComplete);
            default:
                return this.tasks;
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        return JSON.parse(localStorage.getItem('tasks'));
    }

    fetchTasks(apiEndpoint) {
        return fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                this.tasks = data.map(task => new Task(task.title, task.description, task.isComplete));
                this.saveTasks();
            });
    }
}