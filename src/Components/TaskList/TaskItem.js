import React, { Component } from 'react';

class TaskItem extends Component {
    getLabelColor = (labelName) => {
        if (labelName === "Frontend") {
            return "#389E0D";
        }
        else if (labelName === "Backend") {
            return "#722ED1";
        }
        else if (labelName === "API") {
            return "#13C2C2";
        }
        else if (labelName === "Issue") {
            return "#CF1322";
        }
    }

    getPriority = (priority) => {
        let result = {};
        let text, type;
                
        if (parseInt(priority, 10) === 1) {
            text = "Thấp";
            type = "text-info";
            result = {...result, text};
            result = {...result, type};
        }
        else if (parseInt(priority, 10)  === 2) {
            text = "Trung bình";
            type = "text-success";
            result = {...result, text};
            result = {...result, type};
        }
        else if (parseInt(priority, 10)  === 3) {
            text = "Cao";
            type = "text-danger";
            result = {...result, text};
            result = {...result, type};
        }
                
        return result;
    }

    getStatus = (status) => {
        if (parseInt(status, 10) === 1) {
            return "fa-spinner";
        }
        else if (parseInt(status, 10) === 2) {
            return "fa-anchor";
        }
        else if (parseInt(status, 10) === 3) {
            return "fa-check-square-o";
        }
        else if (parseInt(status, 10) === 4) {
            return "fa-trash";
        }
    }

    handleEventClickEditButton = () => {
        this.props.eventClickEditButton(this.props.item);
    }

    render() {
        let { item, STT } = this.props;
        
        // Label
        let elmLabel = item.labelArr.map((elm, index) => {
            return (
                <i
                    key={index}
                    className="fa fa-circle"
                    style={{color: `${this.getLabelColor(elm)}`}}
                />
            )
        })

        // priority
        let priority = this.getPriority(item.priority);
        
        // Người thục hiện
        let elmMember = item.memberIDArr.map((member, index) => {
            return (
                <img
                    key={index}
                    src={`./img/${member}.jpg`}
                    className="user" alt=""
                />
            )
        })
        return (
            <tr>
                {/* STT */}
                <td className="text-center">{STT}</td>

                {/* Công việc */}
                <td className="text-center">{item.name}</td>

                {/* Nhãn */}
                <td className="text-center">
                    {
                        elmLabel
                    }
                </td>

                {/* Độ yêu tiên */}
                <td className={`${priority.type} font-weight-bold text-center`}>
                    {
                        priority.text
                    }
                </td>

                {/* Người thực hiện */}
                <td className="text-center">
                    {
                        elmMember
                    }
                </td>

                {/* Tình trạng */}
                <td className="text-center">
                    <i className={`fa ${this.getStatus(item.status)} mr-2`} />
                </td>

                {/* Xử lý */}
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        data-toggle="modal"
                        data-target="#modalTask"
                        onClick={this.handleEventClickEditButton}
                    >
                        Sửa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;