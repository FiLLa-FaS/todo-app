import React, { useState } from 'react'

import './NewTaskForm.css'

function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinChange = (e) => {
    setMin(e.target.value)
  }

  const onSecChange = (e) => {
    setSec(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onItemAdded(label, min, sec)
    setLabel('')
    setMin('')
    setSec('')
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input type="text" className="new-todo" placeholder="Task" value={label} onChange={onLabelChange} />
      <input
        type="number"
        className="new-todo-form__timer"
        value={min}
        placeholder="Min"
        onChange={onMinChange}
        min="0"
        max="59"
      />
      <input
        type="number"
        className="new-todo-form__timer"
        value={sec}
        placeholder="Sec"
        onChange={onSecChange}
        min="0"
        max="59"
      />
      <input type="submit" hidden />
    </form>
  )
}

export default NewTaskForm
