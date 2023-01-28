import React, { useState } from 'react'
import _uniqueId from 'lodash/uniqueId'

import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    {
      id: +_uniqueId(),
      description: 'Completed task',
      createdTime: new Date('2022-11-21'),
      status: 'completed',
      seconds: 3599,
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
  ])

  const [tabs, setTabs] = useState('all')

  function createTodoItem(description, min = 0, sec = 0) {
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

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec)

    setTasks((prevTasks) => [...prevTasks, newItem])
  }

  const editItemDescription = (id, label) => {
    setTasks((prevTasks) => {
      const idx = prevTasks.findIndex((el) => el.id === id)
      const oldItem = prevTasks[idx]
      const newItem = label
      const currentItem = { ...oldItem, description: newItem }

      return [...prevTasks.slice(0, idx), currentItem, ...prevTasks.slice(idx + 1)]
    })
  }

  const markComplete = (id) => {
    setTasks((prevTasks) => {
      const idx = prevTasks.findIndex((el) => el.id === id)
      const oldItem = prevTasks[idx]
      const newItem = prevTasks[idx].status === 'default' ? 'completed' : 'default'
      const currentItem = { ...oldItem, status: newItem }

      return [...prevTasks.slice(0, idx), currentItem, ...prevTasks.slice(idx + 1)]
    })
  }

  const stopTimer = (id) => {
    console.log(tasks)

    const idx = tasks.findIndex((el) => el.id === id)
    const oldItem = tasks[idx]
    console.log(oldItem.timer)
    clearInterval(oldItem.timer)
  }

  const deleteItem = (id) => {
    setTasks((prevTasks) => {
      const filteredArr = prevTasks.filter((task) => task.id !== id)
      stopTimer(id)
      return filteredArr
    })
  }

  const clearCompleted = () => {
    const completedArr = tasks.filter((el) => el.status === 'completed')
    completedArr.forEach((el) => deleteItem(el.id))
  }

  const changeFilterItems = (e) => {
    const el = e.target
    const buttons = document.querySelectorAll('.tasks-filter__button')
    buttons.forEach((button) => button.classList.remove('tasks-filter__button_selected'))
    el.classList.add('tasks-filter__button_selected')

    setTabs(el.textContent.toLowerCase())
  }

  const filterItems = () => {
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

  const countUp = (id) => {
    setTasks((prevTasks) => {
      const idx = prevTasks.findIndex((el) => el.id === id)
      const oldItem = prevTasks[idx]
      const newItem = oldItem.seconds + 1
      const currentItem = { ...oldItem, seconds: newItem }

      if (newItem === 3599) {
        stopTimer(id)
      }

      return [...prevTasks.slice(0, idx), currentItem, ...prevTasks.slice(idx + 1)]
    })
  }

  const countDown = (id) => {
    setTasks((prevTasks) => {
      const idx = prevTasks.findIndex((el) => el.id === id)
      const oldItem = prevTasks[idx]
      const newItem = oldItem.seconds - 1
      const currentItem =
        newItem === 0 ? { ...oldItem, seconds: newItem, timerDirection: 'up' } : { ...oldItem, seconds: newItem }

      if (newItem === 0) {
        console.log(id)
        stopTimer(id)
      }

      return [...prevTasks.slice(0, idx), currentItem, ...prevTasks.slice(idx + 1)]
    })
  }

  const startTimer = (id) => {
    setTasks((prevTasks) => {
      const idx = prevTasks.findIndex((el) => el.id === id)
      const oldItem = prevTasks[idx]
      if (oldItem.timer !== 0) {
        clearInterval(oldItem.timer)
      }
      const newItem =
        prevTasks[idx].timerDirection === 'up'
          ? setInterval(() => countUp(id), 1000)
          : setInterval(() => countDown(id), 1000)
      console.log(newItem)
      const currentItem = { ...oldItem, timer: newItem }
      return [...prevTasks.slice(0, idx), currentItem, ...prevTasks.slice(idx + 1)]
    })
  }

  const renderTasks = () => {
    const arr = filterItems()
    return (
      <TaskList
        tasks={arr}
        markComplete={markComplete}
        onDeleted={deleteItem}
        startTimer={startTimer}
        stopTimer={stopTimer}
        editItemDescription={editItemDescription}
      />
    )
  }

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

export default App
