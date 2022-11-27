import React from "react";
import PropTypes from "prop-types";

import Task from "../Task";

import "./TaskList.css";

const TaskList = ({ tasks, markComplete, onDeleted }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => {
        const { id, ...itemProps } = task;
        return (
          <li key={id}>
            <Task
              task={itemProps}
              markComplete={() => markComplete(id)}
              onDeleted={() => onDeleted(id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

TaskList.defaultProps = {
  tasks: [],
  markComplete: () => {},
  onDeleted: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  markComplete: PropTypes.func,
  onDeleted: PropTypes.func,
};

export default TaskList;
