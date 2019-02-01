import React, { Component } from 'react';

// IMPORT COMPONENTS
import AddNewTask from './Controls/AddNewTask';
import InitializeData from './Controls/InitializeData';
import FilterProgress from './Controls/FilterProgress';
import FilterLabel from './Controls/FilterLabel';
import FilterPriority from './Controls/FilterPriority';
import Sort from './Controls/Sort';

class Controls extends Component {
    handleClick = () => {
        this.props.getFilterTasks("", -1);
    }

    render() {
        return (
            // Panel
            <div className="col-md-3 text-center px-0">
                <div className="header header--left d-flex align-items-center">
                    <img src="./img/user_1.jpg" className="ml-2 user" alt="" />
                    <h3 className="text-white d-inline font-weight-light ml-2">
                        Lê Quang Song
                  </h3>
                </div>

                {/* Add new task */}
                <AddNewTask />

                {/* Lấy dữ liệu từ Local Storage */}
                <InitializeData
                    generateData={this.props.generateData}
                />

                {/* Filter */}
                <div className="px-3">
                    {/* Tất cả */}
                    <div className="filter filter--progress mt-4">
                        <ul className="list-unstyled text-left">
                            <li
                                className="py-1 display-5 lead"
                                onClick={this.handleClick.bind(this)}
                            >
                                <i className="fa fa-home mr-2" />Tất cả
                            </li>
                        </ul>
                    </div>

                    {/* Filter Progress */}
                    <FilterProgress
                        getFilterTasks={this.props.getFilterTasks}
                    />

                    {/* Filter Label */}
                    <FilterLabel
                        getFilterTasks={this.props.getFilterTasks}
                    />

                    {/* Filter Priority */}
                    <FilterPriority
                        getFilterTasks={this.props.getFilterTasks}
                    />

                    {/* Sort */}
                    <Sort
                        getFilterTasks={this.props.getFilterTasks}
                    />
                </div>
            </div>
        );
    }
}

export default Controls;