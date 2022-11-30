import React, { Component } from 'react'

import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default class App extends Component {
  static maxId = 4

  static createTodoItem(description, maxId) {
    let minId = maxId
    const item = {
      id: (minId += 1),
      description,
      createdTime: new Date(),
      status: 'default',
    }
    return item
  }

  constructor(props) {
    super(props)
    this.state = {
      tasks: [
        {
          id: 1,
          description: 'Completed task',
          createdTime: new Date('2022-11-21'),
          status: 'completed',
        },
        {
          id: 2,
          description: 'Editing task',
          createdTime: new Date('2022-11-20'),
          status: 'default',
        },
        {
          id: 3,
          description: 'Active task',
          createdTime: new Date('2022-11-19'),
          status: 'default',
        },
      ],

      tabs: 'all',
    }
  }

  addItem = (text) => {
    const newItem = App.createTodoItem(text, this.maxId)

    this.setState(({ tasks }) => {
      const newArray = [...tasks, newItem]

      return {
        tasks: newArray,
      }
    })
  }

  markComplete = (id) => {
    this.setState(({ tasks }) => {
      const newArr = tasks.map((a) => ({ ...a }))
      newArr.map((task) => {
        const newTask = { ...task }
        if (newTask.id === id) {
          if (newTask.status === 'default') {
            newTask.status = 'completed'
          } else {
            newTask.status = 'default'
          }
        }
        return newTask
      })
      return {
        tasks: newArr,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const newArr = tasks.map((a) => ({ ...a }))
      const filteredArr = newArr.filter((task) => task.id !== id)
      return {
        tasks: filteredArr,
      }
    })
  }

  clearCompleted = () => {
    const { tasks } = this.state
    const completedArr = tasks.filter((el) => el.status === 'completed')
    completedArr.forEach((el) => this.deleteItem(el.id))
  }

  changeFilterItems = (e) => {
    this.setState(() => {
      const el = e.target
      const buttons = document.querySelectorAll('.tasks-filter__button')
      buttons.forEach((button) => button.classList.remove('tasks-filter__button_selected'))
      el.classList.add('tasks-filter__button_selected')
      return {
        tabs: el.textContent.toLowerCase(),
      }
    })
  }

  filterItems = () => {
    const { tabs, tasks } = this.state
    if (tabs === 'active') {
      const activeArr = tasks.filter((el) => el.status === 'default')
      return activeArr
    }
    if (tabs === 'completed') {
      const completedArr = tasks.filter((el) => el.status === 'completed')
      return completedArr
    }
    return tasks
  }

  renderTasks = () => {
    const arr = this.filterItems()
    return <TaskList tasks={arr} markComplete={this.markComplete} onDeleted={this.deleteItem} />
  }

  render() {
    const { tasks } = this.state
    const { addItem, clearCompleted, changeFilterItems, renderTasks } = this

    const doneCount = tasks.filter((el) => el.status === 'completed')
    const todoCount = tasks.length - doneCount.length

    return (
      <section className="app">
        <Header onItemAdded={addItem} />
        <section className="main">
          {renderTasks()}
          <Footer onClearCompleted={clearCompleted} todoCount={todoCount} onFilter={changeFilterItems} />
        </section>
      </section>
    )
  }
}
