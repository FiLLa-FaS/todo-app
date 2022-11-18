import Header from "../Header";
import TaskList from "../TaskList";
import Footer from "../Footer";

import "./App.css";

const tasks = [
  {
    id: 1,
    description: "Completed task",
    createdTime: new Date(),
    status: "completed",
  },
  {
    id: 2,
    description: "Editing task",
    createdTime: new Date(),
    status: "editing",
  },
  {
    id: 3,
    description: "Active task",
    createdTime: new Date(),
    status: "default",
  },
];

const App = () => {
  return (
    <section className="app">
      <Header />
      <section className="main">
        <TaskList tasks={tasks} />
        <Footer />
      </section>
    </section>
  );
};

export default App;
