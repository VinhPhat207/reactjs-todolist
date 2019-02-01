import React, { Component } from 'react';

class InitializeData extends Component {
    handleGenerateData = () => {
        this.props.generateData();
    }

    render() {
        return (
            <button
                type="button"
                className="btn btn-info"
                onClick={this.handleGenerateData}
            >
                <i className="fa fa-pencil-square-o" />
                Tạo data ban đầu cho LocalStorage
            </button>
        );
    }
}

export default InitializeData;