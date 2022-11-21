import { Component } from "react";

import Header from "../Header";
import TaskList from "../TaskList";
import Footer from "../Footer";

import "./App.css";

export default class App extends Component {
  state = {
    tasks: [
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
        status: "default",
      },
      {
        id: 3,
        description: "Active task",
        createdTime: new Date(),
        status: "default",
      },
    ],
  };

  markComplete = (id) => {
    this.setState(({ tasks }) => {
      let newArr = tasks.concat();
      newArr.map((task) => {
        if (task.id === id) {
          if (task.status === "default") {
            task.status = "completed";
          } else {
            task.status = "default";
          }
        }
        return task;
      });
      return {
        tasks: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      let newArr = tasks.concat().filter((task) => task.id !== id);
      return {
        tasks: newArr,
      };
    });
  };

  render() {
    return (
      <section className="app">
        <Header />
        <section className="main">
          <TaskList
            tasks={this.state.tasks}
            markComplete={this.markComplete}
            onDeleted={this.deleteItem}
          />
          <Footer />
        </section>
      </section>
    );
  }
}
