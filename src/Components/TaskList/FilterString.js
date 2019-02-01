import React, { Component } from 'react';

class FilterString extends Component {
    handleFilterString = () => {
        this.props.getFilterTasks("filterString", document.getElementById('search').value);
    }

    render() {
        return (
            <div className="col-md-6">
                <div className="form-group text-left my-0">
                    <input
                        id="search"
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm công việc"
                        onKeyUp={this.handleFilterString}
                    />
                </div>
            </div>
        );
    }
}

export default FilterString;