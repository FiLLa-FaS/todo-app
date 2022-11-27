import React from "react";
import PropTypes from "prop-types";

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

Footer.defaultProps = {
  todoCount: 0,
  onClearCompleted: () => {},
  onFilter: () => {},
};

Footer.propTypes = {
  todoCount: PropTypes.number,
  onClearCompleted: PropTypes.func,
  onFilter: PropTypes.func,
};

export default Footer;
