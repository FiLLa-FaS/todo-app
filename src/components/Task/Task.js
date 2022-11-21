import { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import "./Task.css";

export default class Task extends Component {
  state = {
    isEditing: false,
  };

  getClasses = (status, isEditing) => {
    let classNames = "task";
    if (status === "completed") {
      classNames += " task_type_completed";
    }
    if (isEditing) {
      classNames += " task_type_editing";
    }
    return classNames;
  };

  renderInput = (isEditing) => {
    if (isEditing) {
      return (
        <input type="text" className="task__edit" defaultValue="Editing task" />
      );
    }
  };

  renderCheckbox = (status, markComplete) => {
    if (status === "completed") {
      return (
        <input
          className="task__toggle"
          type="checkbox"
          defaultChecked
          onClick={markComplete}
        />
      );
    }
    return (
      <input className="task__toggle" type="checkbox" onClick={markComplete} />
    );
  };

  render() {
    const { task, markComplete, onDeleted } = this.props;
    return (
      <div className={this.getClasses(task.status, this.state.isEditing)}>
        <div className="task__view">
          {this.renderCheckbox(task.status, markComplete)}
          <label className="task__label">
            <span className="task__description">{task.description}</span>
            <span className="task__created">
              {formatDistanceToNow(task.createdTime, { addSuffix: true })}
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {this.renderInput(this.state.isEditing)}
      </div>
    );
  }
}
