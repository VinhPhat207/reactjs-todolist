import React, { Component } from 'react';
import './App.css';

// IMPORT COMPONENTS
import Modal from './Components/Modal'
import Controls from './Components/Controls'
import TaskList from './Components/TaskList'

// data
import listOfTasks from './TaskModel/getList'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: null,
      isAddNewTask: true,
      taskEditting: null,
      filterType: '',   //Loai filter hien thi
      filterProgress: null,
      filterLabel: null,
      filterPriority: null,
      filterString: '',
      isAsc: -1,            // A to Z
    }
  }

  generateData = () => {
    localStorage.setItem("tasks", JSON.stringify(listOfTasks.list));

    this.setState({
      tasks: listOfTasks.list,
    })
  }

  addNewTask = (newTask) => {
    let JSONtasks = JSON.parse(localStorage.getItem("tasks"));

    JSONtasks = [...JSONtasks, newTask];

    localStorage.setItem("tasks", JSON.stringify(JSONtasks));
    if (JSONtasks) {
      this.setState({
        tasks: JSONtasks
      })
    }
  }

  componentWillMount = () => {
    localStorage.setItem("tasks", JSON.stringify(listOfTasks.list));

    let JSONtasks = JSON.parse(localStorage.getItem("tasks"));
    if (JSONtasks) {
      this.setState({
        tasks: JSONtasks,
      })
    }
  }

  // Trả về id member cần sửa
  eventClickEditButton = (item) => {
    this.setState({
      isAddNewTask: false,
      taskEditting: item,
    })
  }

  eventClickCloseButton = () => {
    this.setState({
      isAddNewTask: true,
      taskEditting: null,
    })
  }

  editTask = (afterEdit) => {
    let JSONtasks = JSON.parse(localStorage.getItem("tasks"));

    for (let index in JSONtasks) {
      if (JSONtasks[index].id === afterEdit.id) {
        JSONtasks[index] = afterEdit;
        break;
      }
    }

    localStorage.setItem("tasks", JSON.stringify(JSONtasks));
    this.setState({
      tasks: JSONtasks,
      isAddNewTask: true,
      taskEditting: null,
    })
  }

  getFilterTasks = (type, index) => {
    if (type !== 'filterPriority') {
      document.getElementById("selectPriorityBox").selectedIndex = 0;
    }

    this.setState({
      filterType: type,
      filterProgress: index,
      filterLabel: index,
      filterPriority: index,
      filterString: index,
      isAsc: index,
    })
  }

  // Quick sort
  compare = (a, b, isAsc) => {
    if (isAsc === true) {
      return a.name < b.name;
    }

    return a.name > b.name;
  }

  partition = (arr, low, high, isAsc) => {
    let pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j < high; j++) {
      if (this.compare(arr[j], pivot, isAsc)) {
        i++;

        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }

    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
  }

  quickSort = (arr, low, high, isAsc) => {
    if (low < high) {
      let pi = this.partition(arr, low, high, isAsc);

      this.quickSort(arr, low, pi - 1, isAsc);
      this.quickSort(arr, pi + 1, high, isAsc);
    }
  }

  render() {
    let { tasks, isAddNewTask, taskEditting, filterProgress, filterLabel, filterPriority, filterString, isAsc, filterType } = this.state;

    // filterProgress
    let filterTasks = [];
    switch (filterType) {
      case '': {
        filterTasks = tasks;
        break;
      }

      case 'filterProgress': {
        if (parseInt(filterProgress, 10) === -1) {
          filterTasks = tasks;
        }
        else {
          for (let item of tasks) {
            if (parseInt(item.status, 10) === parseInt(filterProgress, 10)) {
              filterTasks = [...filterTasks, item]
            }
          }
        }

        break;
      }

      case 'filterLabel': {
        for (let item of tasks) {
          for (let indexLabel of item.labelArr) {
            if (indexLabel === filterLabel) {
              filterTasks = [...filterTasks, item];
              break;
            }
          }
        }

        break;
      }

      case 'filterPriority': {
        if (parseInt(filterPriority, 10) === 0) {
          filterTasks = tasks;
        }
        else {
          for (let item of tasks) {
            if (parseInt(item.priority, 10) === parseInt(filterPriority, 10)) {
              filterTasks = [...filterTasks, item]
            }
          }
        }

        break;
      }

      case 'filterString': {
        let subNameWork = filterString;
        subNameWork = subNameWork.trim().toUpperCase();

        for (let item of tasks) {
          let nameWork = item.name.trim().toUpperCase();

          if (nameWork.search(subNameWork) !== -1) {
            filterTasks = [...filterTasks, item];
          }
        }

        break;
      }

      case 'Sort': {
        filterTasks = tasks;

        if (parseInt(isAsc, 10) === 1) {
          this.quickSort(filterTasks, 0, filterTasks.length - 1, true)
        }
        else {
          this.quickSort(filterTasks, 0, filterTasks.length - 1, false)
        }

        break;
      }

      default:
        break;
    }

    return (
      <div className="App">
        <div>
          <h1 className="text-center my-2">QUẢN LÝ CÔNG VIỆC</h1>
          <div className="container-fluid">
            <div className="row">
              {/* PANEL */}
              <Controls
                generateData={this.generateData}
                getFilterTasks={this.getFilterTasks}
              />

              {/* DISPLAY */}
              <TaskList
                tasks={filterTasks}
                getFilterTasks={this.getFilterTasks}
                eventClickEditButton={this.eventClickEditButton}
              />
            </div>
          </div>

          {/* The Modal */}
          <Modal
            addNewTask={this.addNewTask}
            editTask={this.editTask}
            isAddNewTask={isAddNewTask}
            taskEditting={taskEditting}
            eventClickCloseButton={this.eventClickCloseButton}
          />
        </div>
      </div>
    );
  }
}

export default App;
