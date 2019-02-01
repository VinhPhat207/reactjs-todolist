export default class ListOfTasks {
    constructor() {
        this.list = [];
    }

    addNewTask = (newTask) => {
        this.list = [...this.list, newTask];
    }
}