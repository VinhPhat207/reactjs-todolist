import React, { Component } from 'react';

// IMPORT COMPONENTS
import THead from './TaskList/THead'
import FilterString from './TaskList/FilterString'
import TaskItem from './TaskList/TaskItem'

class TaskList extends Component {
    render() {
        let { tasks } = this.props;

        let elmTaskItem = tasks.map((item, index) => {
            return (
                <TaskItem
                    key={index}
                    STT={index + 1}
                    item={item}
                    eventClickEditButton={this.props.eventClickEditButton}
                />
            )
        })

        return (
            <div className="col-md-9 px-0">
                <div className="container-fluid px-0">
                    <div className="row header header--right d-flex align-items-center mx-0">
                        <div className="col-md-6">
                            <div className=" d-flex justify-content-between">
                                <h3 className="text-left ml-2 ">
                                    Danh sách công việc
                                </h3>
                            </div>
                        </div>

                        {/* Filter String */}
                        <FilterString
                            getFilterTasks={this.props.getFilterTasks}
                        />
                    </div>
                </div>
                <div className="px-3">
                    <table className="table table-hover">
                        {/* THead */}
                        <THead />

                        <tbody>
                            {/* TaskItem */}
                            {
                                elmTaskItem
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TaskList;