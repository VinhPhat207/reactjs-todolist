import React, { Component } from 'react';

class Sort extends Component {
    onChange = () => {
        let selectBox = document.getElementById("selectSortBox");
        let selectedValue = selectBox.options[selectBox.selectedIndex].value;

        this.props.getFilterTasks("Sort", selectedValue);
    }

    render() {
        return (
            <div className="form-group text-left">
                <label>
                    <strong>Sắp xếp theo công việc</strong>
                </label>
                <select
                    className="form-control"
                    id="selectSortBox"
                    onChange={this.onChange}
                >
                    <option
                        value={1}
                    >
                        Từ A đến Z
                     </option>
                    <option
                        value={0}
                    >
                        Từ Z đến A
                    </option>
                </select>
            </div>
        );
    }
}

export default Sort;