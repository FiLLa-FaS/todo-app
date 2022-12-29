import React, { Component } from 'react'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      min: '',
      sec: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { onItemAdded } = this.props
    const { label, min, sec } = this.state
    e.preventDefault()
    onItemAdded(label, min, sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { label, min, sec } = this.state
    const { onSubmit, onLabelChange, onMinChange, onSecChange } = this
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
}
