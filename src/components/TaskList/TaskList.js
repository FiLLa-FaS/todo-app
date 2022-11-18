import Task from "../Task";

import "./TaskList.css";

const TaskList = ({ tasks }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => {
        return <Task task={task} />;
      })}
    </ul>
  );
};

export default TaskList;
