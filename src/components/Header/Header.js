import React from "react";
import PropTypes from "prop-types";

import NewTaskForm from "../NewTaskForm";

import "./Header.css";

const Header = ({ onItemAdded }) => {
  return (
    <header className="header">
      <h1 className="header__title">todos</h1>
      <NewTaskForm onItemAdded={onItemAdded} />
    </header>
  );
};

Header.defaultProps = {
  onItemAdded: () => {},
};

Header.propTypes = {
  onItemAdded: PropTypes.func,
};

export default Header;
