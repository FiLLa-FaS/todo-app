import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
    }
  }

  static getClasses = (status, isEditing) => {
    let classNames = 'task'
    if (status === 'completed') {
      classNames += ' task_type_completed'
    }
    if (isEditing) {
      classNames += ' task_type_editing'
    }
    return classNames
  }

  handleTaskEditing = () => {
    this.setState({ isEditing: true })
  }

  static renderInput = (label) => <input type="text" className="task__edit" defaultValue={label} />

  static renderCheckbox = (status, id, markComplete) => {
    if (status === 'completed') {
      return <input className="task__toggle" type="checkbox" defaultChecked onClick={markComplete} id={id} />
    }
    return <input className="task__toggle" type="checkbox" onClick={markComplete} id={id} />
  }

  render() {
    const { isEditing } = this.state
    const { task, markComplete, onDeleted } = this.props

    return (
      <div className={Task.getClasses(task.status, isEditing)}>
        <div className="task__view">
          {Task.renderCheckbox(task.status, task.id, markComplete)}
          <label className="task__label" htmlFor={task.id}>
            <span className="task__description">{task.description}</span>
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
  },
  markComplete: () => {},
  onDeleted: () => {},
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string.isRequired,
    createdTime: PropTypes.instanceOf(Date),
    status: PropTypes.string.isRequired,
  }),
  markComplete: PropTypes.func,
  onDeleted: PropTypes.func,
}
