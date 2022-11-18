import NewTaskForm from "../NewTaskForm";

import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">todos</h1>
      <NewTaskForm />
    </header>
  );
};

export default Header;
