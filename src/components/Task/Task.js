/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

export default class Task extends Component {
  static formatSeconds = (sec) => {
    let hours = 0
    let minutes = 0
    let seconds = 0

    if (sec >= 3600) {
      hours = Math.floor(sec / 3600)
    }
    if (sec >= 60) {
      minutes = Math.floor((sec % 3600) / 60)
    }
    seconds = sec - hours * 3600 - minutes * 60

    return `${hours}h:${minutes}m:${seconds}s`
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
    }
  }

  static getTaskClasses = (status, isEditing) => {
    let classNames = 'task'
    if (status === 'completed') {
      classNames += ' task_type_completed'
    }
    if (isEditing) {
      classNames += ' task_type_editing'
    }
    return classNames
  }

  static renderInput = (label) => <input type="text" className="task__edit" defaultValue={label} />

  static renderCheckbox = (status, id, markComplete) => {
    if (status === 'completed') {
      return <input className="task__toggle" type="checkbox" defaultChecked onClick={markComplete} id={id} />
    }
    return <input className="task__toggle" type="checkbox" onClick={markComplete} id={id} />
  }

  handleTaskEditing = () => {
    this.setState({ isEditing: true })
  }

  render() {
    const { isEditing } = this.state
    const { task, markComplete, onDeleted, startTimer, stopTimer } = this.props

    return (
      <div className={Task.getTaskClasses(task.status, isEditing)}>
        <div className="task__view">
          {Task.renderCheckbox(task.status, task.id, markComplete)}
          <label className="task__label" htmlFor={task.id}>
            <span className="task__title">{task.description}</span>
            <span className="task__description">
              <button className="icon icon-play" type="button" onClick={startTimer} />
              <button className="icon icon-pause" type="button" onClick={stopTimer} />
              {Task.formatSeconds(task.seconds)}
            </span>
            <span className="task__created">{formatDistanceToNow(task.createdTime, { addSuffix: true })}</span>
          </label>
          <button className="icon icon-edit" type="button" onClick={this.handleTaskEditing} aria-label="Edit icon" />
          <button className="icon icon-destroy" onClick={onDeleted} type="button" aria-label="Delete icon" />
        </div>
        {isEditing && Task.renderInput(task.description)}
      </div>
    )
  }
}

Task.defaultProps = {
  task: {
    id: 0,
    description: 'имя задачи',
    createdTime: new Date(),
    status: 'default',
    seconds: 0,
    timerDirection: 'up',
    timer: 0,
  },
  markComplete: () => {},
  onDeleted: () => {},
  startTimer: () => {},
  stopTimer: () => {},
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string.isRequired,
    createdTime: PropTypes.instanceOf(Date),
    status: PropTypes.string.isRequired,
    seconds: PropTypes.number,
    timerDirection: PropTypes.string,
    timer: PropTypes.number,
  }),
  markComplete: PropTypes.func,
  onDeleted: PropTypes.func,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
}
