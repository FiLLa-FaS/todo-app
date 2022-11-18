import "./TasksFilter.css";

const TasksFilter = () => {
  return (
    <ul className="tasks-filter">
      <li className="tasks-filter__item">
        <button className="tasks-filter__button tasks-filter__button_selected">
          All
        </button>
      </li>
      <li className="tasks-filter__item">
        <button className="tasks-filter__button">Active</button>
      </li>
      <li className="tasks-filter__item">
        <button className="tasks-filter__button">Completed</button>
      </li>
    </ul>
  );
};

export default TasksFilter;
