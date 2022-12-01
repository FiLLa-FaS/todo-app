import React, { Component } from 'react'
import _uniqueId from 'lodash/uniqueId'

import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default class App extends Component {
  static createTodoItem(description) {
    const item = {
      id: +_uniqueId(),
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
          id: +_uniqueId(),
          description: 'Completed task',
          createdTime: new Date('2022-11-21'),
          status: 'completed',
        },
        {
          id: +_uniqueId(),
          description: 'Editing task',
          createdTime: new Date('2022-11-20'),
          status: 'default',
        },
        {
          id: +_uniqueId(),
          description: 'Active task',
          createdTime: new Date('2022-11-19'),
          status: 'default',
        },
      ],

      tabs: 'all',
    }
  }

  addItem = (text) => {
    const newItem = App.createTodoItem(text)

    this.setState(({ tasks }) => {
      const newArray = [...tasks, newItem]

      return {
        tasks: newArray,
      }
    })
  }

  markComplete = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldItem = tasks[idx]
      const newItem = tasks[idx].status === 'default' ? 'completed' : 'default'
      const currentItem = { ...oldItem, status: newItem }

      return {
        tasks: [...tasks.slice(0, idx), currentItem, ...tasks.slice(idx + 1)],
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
