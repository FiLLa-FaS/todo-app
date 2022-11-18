import Task from "../Task";

import "./TaskList.css";

const TaskList = ({ tasks }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => {
        const { id, ...itemProps } = task;
        return (
          <li key={id}>
            <Task task={itemProps} />
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
