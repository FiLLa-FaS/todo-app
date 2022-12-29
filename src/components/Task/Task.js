import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

export default class Task extends Component {
  static formatSeconds = (sec = 0) => {
    let minutes = 0
    let seconds = 0

    if (sec >= 60) {
      minutes = Math.floor((sec % 3600) / 60)
    }
    seconds = sec - minutes * 60

    return `${minutes}m:${seconds}s`
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

  static renderCheckbox = (status, id, markComplete) => {
    if (status === 'completed') {
      return <input className="task__toggle" type="checkbox" defaultChecked onClick={markComplete} id={id} />
    }
    return <input className="task__toggle" type="checkbox" onClick={markComplete} id={id} />
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      label: props.task.description,
    }
    this.inputEditRef = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
    document.addEventListener('keydown', this.handleEscKey, false)
  }

  componentDidUpdate(prevProps, prevState) {
    const { isEditing } = this.state
    if (prevState.isEditing !== isEditing) {
      if (this.inputEditRef.current) {
        this.inputEditRef.current.focus()
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
    document.removeEventListener('keydown', this.handleEscKey, false)
  }

  handleClickOutside = (event) => {
    const { task } = this.props
    if (this.inputEditRef.current && !this.inputEditRef.current.contains(event.target)) {
      this.setState({ isEditing: false, label: task.description })
    }
  }

  handleEscKey = (event) => {
    const { isEditing } = this.state
    const { task } = this.props
    if (isEditing && event.key === 'Escape') {
      this.setState({ isEditing: false, label: task.description })
    }
  }

  onSubmit = (e) => {
    const { editItemDescription, task } = this.props
    const { label } = this.state
    e.preventDefault()
    editItemDescription(task.id, label)
    this.setState({ isEditing: false })
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  handleTaskEditing = () => {
    this.setState({ isEditing: true })
  }

  renderInput = (onSubmit, onLabelChange) => {
    const { label } = this.state
    return (
      <form onSubmit={onSubmit}>
        <input
          ref={this.inputEditRef}
          type="text"
          className="task__edit"
          value={label}
          name="inputEdit"
          onChange={onLabelChange}
        />
      </form>
    )
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
              <button className="icon icon-play" type="button" onClick={startTimer} aria-label="Start timer button" />
              <button className="icon icon-pause" type="button" onClick={stopTimer} aria-label="Stop timer button" />
              {Task.formatSeconds(task.seconds)}
            </span>
            <span className="task__created">{formatDistanceToNow(task.createdTime, { addSuffix: true })}</span>
          </label>
          <button className="icon icon-edit" type="button" onClick={this.handleTaskEditing} aria-label="Edit icon" />
          <button className="icon icon-destroy" onClick={onDeleted} type="button" aria-label="Delete icon" />
        </div>
        {isEditing && this.renderInput(this.onSubmit, this.onLabelChange)}
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
