import { formatDistanceToNow } from "date-fns";
import "./Task.css";

const Task = ({ task }) => {
  const getClasses = (status) => {
    if (status === "completed") {
      return "task task_type_completed";
    }
    if (status === "editing") {
      return "task task_type_editing";
    }
    return "task";
  };

  const renderInput = (status) => {
    if (status === "editing") {
      return (
        <input type="text" className="task__edit" defaultValue="Editing task" />
      );
    }
  };

  return (
    <div className={getClasses(task.status)}>
      <div className="task__view">
        <input className="task__toggle" type="checkbox" />
        <label className="task__label">
          <span className="task__description">{task.description}</span>
          <span className="task__created">
            {formatDistanceToNow(task.createdTime, { addSuffix: true })}
          </span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {renderInput(task.status)}
    </div>
  );
};

export default Task;
