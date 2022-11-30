import React from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

function TasksFilter({ onFilter }) {
  return (
    <ul className="tasks-filter">
      <li className="tasks-filter__item">
        <button className="tasks-filter__button tasks-filter__button_selected" onClick={onFilter} type="button">
          All
        </button>
      </li>
      <li className="tasks-filter__item">
        <button className="tasks-filter__button" onClick={onFilter} type="button">
          Active
        </button>
      </li>
      <li className="tasks-filter__item">
        <button className="tasks-filter__button" onClick={onFilter} type="button">
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.defaultProps = {
  onFilter: () => {},
}

TasksFilter.propTypes = {
  onFilter: PropTypes.func,
}

export default TasksFilter
