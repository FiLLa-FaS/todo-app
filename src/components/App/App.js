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
        createdTime: new Date("2017-01-26"),
        status: "completed",
      },
      {
        id: 2,
        description: "Editing task",
        createdTime: new Date("2017-01-27"),
        status: "default",
      },
      {
        id: 3,
        description: "Active task",
        createdTime: new Date("2017-01-28"),
        status: "default",
      },
    ],
  };

  markComplete = (id) => {
    this.setState(({ tasks }) => {
      let newArr = tasks.map((a) => {
        return { ...a };
      });
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
      let newArr = tasks.map((a) => {
        return { ...a };
      });
      let filteredArr = newArr.concat().filter((task) => task.id !== id);
      return {
        tasks: filteredArr,
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
