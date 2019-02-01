// data
import data from './Data';

// components
import ListOfTasks from './ListOfTasks';

let listOfTasks = new ListOfTasks();
for (let item of data) {
    listOfTasks.addNewTask(item);
}

export default listOfTasks;

