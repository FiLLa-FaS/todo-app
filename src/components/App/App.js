import React, { Component } from "react";

import Header from "../Header";
import TaskList from "../TaskList";
import Footer from "../Footer";

import "./App.css";

export default class App extends Component {
  maxId = 4;

  state = {
    tasks: [
      {
        id: 1,
        description: "Completed task",
        createdTime: new Date("2022-11-21"),
        status: "completed",
      },
      {
        id: 2,
        description: "Editing task",
        createdTime: new Date("2022-11-20"),
        status: "default",
      },
      {
        id: 3,
        description: "Active task",
        createdTime: new Date("2022-11-19"),
        status: "default",
      },
    ],

    tabs: "all",
  };

  createTodoItem(description) {
    return {
      id: this.maxId++,
      description,
      createdTime: new Date(),
      status: "default",
    };
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ tasks }) => {
      const newArray = [...tasks, newItem];

      return {
        tasks: newArray,
      };
    });
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
      let filteredArr = newArr.filter((task) => task.id !== id);
      return {
        tasks: filteredArr,
      };
    });
  };

  clearCompleted = () => {
    const completedArr = this.state.tasks.filter(
      (el) => el.status === "completed"
    );
    completedArr.forEach((el) => {
      return this.deleteItem(el.id);
    });
  };

  changeFilterItems = (e) => {
    this.setState(() => {
      const el = e.target;
      let buttons = document.querySelectorAll(".tasks-filter__button");
      buttons.forEach((button) =>
        button.classList.remove("tasks-filter__button_selected")
      );
      el.classList.add("tasks-filter__button_selected");
      return {
        tabs: el.textContent.toLowerCase(),
      };
    });
  };

  filterItems = () => {
    if (this.state.tabs === "active") {
      const activeArr = this.state.tasks.filter(
        (el) => el.status === "default"
      );
      return activeArr;
    }
    if (this.state.tabs === "completed") {
      const completedArr = this.state.tasks.filter(
        (el) => el.status === "completed"
      );
      return completedArr;
    } else {
      return this.state.tasks;
    }
  };

  renderTasks = () => {
    const arr = this.filterItems();
    return (
      <TaskList
        tasks={arr}
        markComplete={this.markComplete}
        onDeleted={this.deleteItem}
      />
    );
  };

  render() {
    const { tasks } = this.state;
    const { addItem, clearCompleted, changeFilterItems, renderTasks } = this;

    const doneCount = tasks.filter((el) => el.status === "completed");
    const todoCount = tasks.length - doneCount.length;

    return (
      <section className="app">
        <Header onItemAdded={addItem} />
        <section className="main">
          {renderTasks()}
          <Footer
            onClearCompleted={clearCompleted}
            todoCount={todoCount}
            onFilter={changeFilterItems}
          />
        </section>
      </section>
    );
  }
}
