import React, { Component } from "react";

import "./NewTaskForm.css";

export default class NewTaskForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    const { label } = this.state;
    const { onSubmit, onLabelChange } = this;
    return (
      <form onSubmit={onSubmit}>
        <input
          className="new-task-form"
          placeholder="What needs to be done?"
          autoFocus
          value={label}
          onChange={onLabelChange}
        />
      </form>
    );
  }
}
