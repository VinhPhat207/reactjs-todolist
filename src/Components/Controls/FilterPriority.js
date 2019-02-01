import React, { Component } from 'react';

class FilterPriority extends Component {
    onChange = () => {
        let selectBox = document.getElementById("selectPriorityBox");
        let selectedValue = selectBox.options[selectBox.selectedIndex].value;

        this.props.getFilterTasks("filterPriority", selectedValue);
    }

    render() {
        return (
            <div className="form-group text-left">
                <label htmlFor="sel1">
                    <strong>Độ ưu tiên</strong>
                </label>
                <select
                    id="selectPriorityBox"
                    className="form-control"
                    onChange={this.onChange}
                >
                    <option
                        className="font-weight-bold"
                        value={0}
                    >
                        Tất cả
                    </option>
                    <option
                        className="text-info font-weight-bold"
                        value={1}
                    >
                        Thấp
                    </option>
                    <option
                        className="text-success font-weight-bold"
                        value={2}
                    >
                        Trung bình
                    </option>
                    <option
                        className="text-danger font-weight-bold"
                        value={3}
                    >
                        Cao
                    </option>
                </select>
            </div>
        );
    }
}

export default FilterPriority;