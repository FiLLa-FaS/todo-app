import "./TasksFilter.css";

const TasksFilter = ({ onFilter }) => {
  return (
    <ul className="tasks-filter">
      <li className="tasks-filter__item">
        <button
          className="tasks-filter__button tasks-filter__button_selected"
          onClick={onFilter}
        >
          All
        </button>
      </li>
      <li className="tasks-filter__item">
        <button className="tasks-filter__button" onClick={onFilter}>
          Active
        </button>
      </li>
      <li className="tasks-filter__item">
        <button className="tasks-filter__button" onClick={onFilter}>
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TasksFilter;
