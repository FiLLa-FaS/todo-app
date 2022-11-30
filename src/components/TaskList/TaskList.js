import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

function TaskList({ tasks, markComplete, onDeleted }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => {
        const { id, ...itemProps } = task
        return (
          <li key={id}>
            <Task task={itemProps} markComplete={() => markComplete(id)} onDeleted={() => onDeleted(id)} />
          </li>
        )
      })}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string.isRequired,
      createdTime: PropTypes.instanceOf(Date),
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  markComplete: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
}

export default TaskList
