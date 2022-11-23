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

export default Header;
