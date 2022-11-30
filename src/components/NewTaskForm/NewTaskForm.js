import React, { Component } from 'react'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { onItemAdded } = this.props
    const { label } = this.state
    e.preventDefault()
    onItemAdded(label)
    this.setState({
      label: '',
    })
  }

  render() {
    const { label } = this.state
    const { onSubmit, onLabelChange } = this
    return (
      <form onSubmit={onSubmit}>
        <input className="new-task-form" placeholder="What needs to be done?" value={label} onChange={onLabelChange} />
      </form>
    )
  }
}
