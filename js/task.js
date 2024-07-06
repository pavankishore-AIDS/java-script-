export default class Task {
    constructor(title, description, isComplete = false) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.isComplete = isComplete;
    }

    toggleComplete() {
        this.isComplete = !this.isComplete;
    }
}