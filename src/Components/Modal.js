import React, { Component } from 'react';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

let randomid = require('randomid');

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: randomid(5),
            name: "",
            labelArr: [],
            priority: 1,
            memberIDArr: [],
            status: 1,
            description: ""
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    memberIDArrChanged = (newMemberID) => {
        this.setState({
            memberIDArr: newMemberID,
        });
    }

    labelArrChanged = (newLabel) => {
        this.setState({
            labelArr: newLabel,
        });
    }

    handleAddNewTask = () => {
        this.props.addNewTask(this.state);
    }

    handleEditTask = () => {
        this.props.editTask(this.state);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.taskEditting) {
            let { id, name, labelArr, priority, memberIDArr, status, description } = nextProps.taskEditting;

            this.setState({
                id: id,
                name: name,
                description: description,
                priority: priority,
                memberIDArr: memberIDArr,
                labelArr: labelArr,
                status: status,
            })
        }

        // Xoa form
        if (nextProps.isAddNewTask) {
            this.setState({
                id: randomid(5),
                name: "",
                labelArr: [],
                priority: 1,
                memberIDArr: [],
                status: 1,
                description: ""
            })
        }
    }

    handleEventClickCloseButton = () => {
        this.props.eventClickCloseButton();
    }

    render() {
        let { name, labelArr, priority, memberIDArr, status, description } = this.state;
        let { isAddNewTask } = this.props;

        return (
            // The Modal
            <div className="modal fade" id="modalTask" >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">
                                {isAddNewTask ? "Thêm công việc" : "Sửa công việc"}
                            </h4>
                        </div>

                        {/* Modal body */}
                        <form
                            onSubmit={this.onSubmit}
                        >

                            <div className="modal-body">
                                {/* Tên công việc */}
                                <div className="form-group">
                                    <h6>Tên công việc</h6>
                                    <input
                                        id="name"
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={this.onChange}
                                    />
                                </div>

                                {/* Mô tả */}
                                <div className="form-group">
                                    <h6>Mô tả</h6>
                                    <textarea
                                        id="description"
                                        className="form-control"
                                        rows={2}
                                        name="description"
                                        value={description}
                                        onChange={this.onChange}
                                    />
                                </div>

                                {/* Độ ưu tiên */}
                                <div className="form-group">
                                    <h6>Độ ưu tiên</h6>
                                    <select
                                        id="priority"
                                        className="form-control ml-2"
                                        name="priority"
                                        value={priority}
                                        onChange={this.onChange}
                                    >
                                        <option value={1}>Thấp</option>
                                        <option value={2}>Trung bình</option>
                                        <option value={3}>Cao</option>
                                    </select>
                                </div>
                                <br />

                                {/* Người thực hiện */}
                                <CheckboxGroup
                                    id="memberIDArr"
                                    checkboxDepth={2} // This is needed to optimize the checkbox group
                                    name="memberIDArr"
                                    value={memberIDArr}
                                    onChange={this.memberIDArrChanged}
                                >
                                    <h6>Người thực hiện</h6>
                                    <label><Checkbox className={"ml-4"} value="user_2" /> Nghĩa Văn</label>
                                    <label><Checkbox className={"ml-4"} value="user_3" /> Minh Tuấn</label>
                                    <label><Checkbox className={"ml-4"} value="user_4" /> Trung Hiếu</label>
                                    <label><Checkbox className={"ml-4"} value="user_5" /> Tấn Khải</label>
                                </CheckboxGroup>
                                <br />

                                {/* Nhãn */}
                                <CheckboxGroup
                                    id="labelArr"
                                    checkboxDepth={2} // This is needed to optimize the checkbox group
                                    name="labelArr"
                                    value={labelArr}
                                    onChange={this.labelArrChanged}
                                >
                                    <h6>Nhãn</h6>
                                    <label><Checkbox className={"ml-4"} value="Frontend" /> Frontend</label>
                                    <label><Checkbox className={"ml-4"} value="Backend" /> Backend</label>
                                    <label><Checkbox className={"ml-4"} value="API" /> API</label>
                                    <label><Checkbox className={"ml-4"} value="Issue" /> Issue</label>
                                </CheckboxGroup>
                                <br />

                                {/* Tình trạng */}
                                <div className="form-group">
                                    <h6>Tình trạng</h6>
                                    <select
                                        id="status"
                                        className="form-control ml-2"
                                        name="status"
                                        value={status}
                                        onChange={this.onChange}
                                    >
                                        <option value={1}>Đang tiến hành</option>
                                        <option value={2}>Chưa bắt đầu</option>
                                        <option value={3}>Hoàn thành</option>
                                        <option value={4}>Hủy bỏ</option>
                                    </select>
                                </div>
                            </div>
                        </form>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-success"
                                data-dismiss="modal"
                                onClick={isAddNewTask ? this.handleAddNewTask : this.handleEditTask}
                            >
                                Accept
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={this.handleEventClickCloseButton}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Modal;