import TasksFilter from "../TasksFilter";

import "./Footer.css";

const Footer = ({ todoCount, onClearCompleted, onFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter onFilter={onFilter} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
