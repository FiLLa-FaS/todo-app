import React, { Component } from "react";
import PropTypes from "prop-types";
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
    const { isEditing } = this.state;
    const { task, markComplete, onDeleted } = this.props;
    const { renderCheckbox, renderInput, getClasses } = this;

    return (
      <div className={getClasses(task.status, isEditing)}>
        <div className="task__view">
          {renderCheckbox(task.status, markComplete)}
          <label className="task__label">
            <span className="task__description">{task.description}</span>
            <span className="task__created">
              {formatDistanceToNow(task.createdTime, { addSuffix: true })}
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {renderInput(isEditing)}
      </div>
    );
  }

  static defaultProps = {
    task: {
      id: 0,
      description: "имя задачи",
      createdTime: new Date(),
      status: "default",
    },
    markComplete: () => {},
    onDeleted: () => {},
  };

  static propTypes = {
    task: PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      createdTime: PropTypes.object.isRequired,
      status: PropTypes.string.isRequired,
    }),
    markComplete: PropTypes.func,
    onDeleted: PropTypes.func,
  };
}
