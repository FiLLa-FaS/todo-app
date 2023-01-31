import React, { useState, useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

function Task({ task, markComplete, onDeleted, startTimer, stopTimer, editItemDescription }) {
  const [isEditing, setIsEditing] = useState(false)
  const [label, setLabel] = useState(task.description)
  const [isTimerActive, setIsTimerActive] = useState(task.isTimerActive)
  const inputEditRef = useRef(null)

  const formatSeconds = (sec = 0) => {
    let minutes = 0
    let seconds = 0

    if (sec >= 60) {
      minutes = Math.floor((sec % 3600) / 60)
    }
    seconds = sec - minutes * 60

    return `${minutes}m:${seconds}s`
  }

  const getTaskClasses = (status) => {
    let classNames = 'task'
    if (status === 'completed') {
      classNames += ' task_type_completed'
    }
    if (isEditing) {
      classNames += ' task_type_editing'
    }
    return classNames
  }

  const renderCheckbox = (status, id) => {
    if (status === 'completed') {
      return <input className="task__toggle" type="checkbox" defaultChecked onClick={markComplete} id={id} />
    }
    return <input className="task__toggle" type="checkbox" onClick={markComplete} id={id} />
  }

  const onLabelChange = (event) => {
    setLabel(event.target.value)
  }

  const handleTaskEditing = () => {
    setIsEditing(true)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    editItemDescription(task.id, label)
    setIsEditing(false)
  }

  const handleClickOutside = useCallback(
    (event) => {
      if (inputEditRef.current && !inputEditRef.current.contains(event.target)) {
        setLabel(task.description)
        setIsEditing(false)
      }
    },
    [task.description]
  )

  const handleEscKey = useCallback(
    (event) => {
      if (isEditing && event.key === 'Escape') {
        setLabel(task.description)
        setIsEditing(false)
      }
    },
    [isEditing, task.description]
  )

  const renderButton = () => {
    if (isTimerActive) {
      return <button className="icon icon-pause" type="button" onClick={stopTimer} aria-label="Stop timer button" />
    }
    return <button className="icon icon-play" type="button" onClick={startTimer} aria-label="Start timer button" />
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscKey, false)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKey, false)
    }
  }, [handleClickOutside, handleEscKey])

  useEffect(() => {
    if (inputEditRef.current) {
      inputEditRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    setIsTimerActive(task.isTimerActive)
  }, [task.isTimerActive])

  return (
    <div className={getTaskClasses(task.status)}>
      <div className="task__view">
        {renderCheckbox(task.status, task.id)}
        <label className="task__label" htmlFor={task.id}>
          <span className="task__title">{task.description}</span>
          <span className="task__description">
            {renderButton()}

            {formatSeconds(task.seconds)}
          </span>
          <span className="task__created">{formatDistanceToNow(task.createdTime, { addSuffix: true })}</span>
        </label>
        <button className="icon icon-edit" type="button" onClick={handleTaskEditing} aria-label="Edit icon" />
        <button className="icon icon-destroy" onClick={onDeleted} type="button" aria-label="Delete icon" />
      </div>
      {isEditing && (
        <form onSubmit={onSubmit}>
          <input
            ref={inputEditRef}
            type="text"
            className="task__edit"
            value={label}
            name="inputEdit"
            onChange={onLabelChange}
          />
        </form>
      )}
    </div>
  )
}

export default Task

Task.defaultProps = {
  task: {
    id: 0,
    description: 'имя задачи',
    createdTime: new Date(),
    status: 'default',
    seconds: 0,
    timerDirection: 'up',
    timer: 0,
    isTimerActive: false,
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
    isTimerActive: PropTypes.bool,
  }),
  markComplete: PropTypes.func,
  onDeleted: PropTypes.func,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
}
