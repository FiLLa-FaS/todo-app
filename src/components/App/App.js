import React, { Component } from 'react'
import _uniqueId from 'lodash/uniqueId'

import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default class App extends Component {
  static createTodoItem(description, min = 0, sec = 0) {
    let seconds = 0
    let timerDirection = ''
    if (!min && !sec) {
      seconds = 0
      timerDirection = 'up'
    } else {
      seconds = +min * 60 + +sec
      timerDirection = 'down'
    }

    const item = {
      id: +_uniqueId(),
      description,
      createdTime: new Date(),
      status: 'default',
      seconds,
      timerDirection,
      timer: 0,
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
          seconds: 3600,
          timerDirection: 'down',
          timer: 0,
        },
        {
          id: +_uniqueId(),
          description: 'Editing task',
          createdTime: new Date('2022-11-20'),
          status: 'default',
          seconds: 1200,
          timerDirection: 'down',
          timer: 0,
        },
        {
          id: +_uniqueId(),
          description: 'Active task',
          createdTime: new Date('2022-11-19'),
          status: 'default',
          seconds: 50,
          timerDirection: 'down',
          timer: 0,
        },
      ],

      tabs: 'all',
    }
  }

  addItem = (text, min, sec) => {
    const newItem = App.createTodoItem(text, min, sec)

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

  startTimer = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldItem = tasks[idx]
      if (oldItem.timer !== 0) {
        clearInterval(oldItem.timer)
      }
      const newItem =
        tasks[idx].timerDirection === 'up'
          ? setInterval(() => this.countUp(id), 1000)
          : setInterval(() => this.countDown(id), 1000)
      const currentItem = { ...oldItem, timer: newItem }

      return {
        tasks: [...tasks.slice(0, idx), currentItem, ...tasks.slice(idx + 1)],
      }
    })
  }

  stopTimer = (id) => {
    const { tasks } = this.state
    const idx = tasks.findIndex((el) => el.id === id)
    const oldItem = tasks[idx]
    clearInterval(oldItem.timer)
  }

  countUp = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldItem = tasks[idx]
      const newItem = oldItem.seconds + 1
      const currentItem = { ...oldItem, seconds: newItem }

      return {
        tasks: [...tasks.slice(0, idx), currentItem, ...tasks.slice(idx + 1)],
      }
    })
  }

  countDown = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldItem = tasks[idx]
      const newItem = oldItem.seconds - 1
      const currentItem =
        newItem === 0 ? { ...oldItem, seconds: newItem, timerDirection: 'up' } : { ...oldItem, seconds: newItem }

      if (newItem === 0) {
        this.stopTimer(id)
      }

      return {
        tasks: [...tasks.slice(0, idx), currentItem, ...tasks.slice(idx + 1)],
      }
    })
  }

  renderTasks = () => {
    const arr = this.filterItems()
    return (
      <TaskList
        tasks={arr}
        markComplete={this.markComplete}
        onDeleted={this.deleteItem}
        startTimer={this.startTimer}
        stopTimer={this.stopTimer}
      />
    )
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
