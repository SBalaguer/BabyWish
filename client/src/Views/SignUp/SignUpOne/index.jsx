import React, { Component } from "react";

export class SignUpOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      role: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateUserState(this.state);
    if (this.state.role !== "gifter") {
      this.props.history.push(`/sign-up/${this.state.role}/2`);
    } else {
      this.props.history.push(`/sign-up/${this.state.role}/3`);
    }
  }

  render() {
    return (
      <div>
        <h1>What is your Name</h1>
        <img
          src="https://icon-library.net/images/baby-icon/baby-icon-14.jpg"
          alt="..."
        />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            type="radio"
            value="expecting"
            name="role"
            onChange={this.handleInputChange}
          />
          Expecting
          <br />
          <input
            type="radio"
            value="gifter"
            name="role"
            onChange={this.handleInputChange}
          />
          Gifter
          <br />
          <input
            type="radio"
            value="parent"
            name="role"
            onChange={this.handleInputChange}
          />
          Parent
          <br />
          <button>Next</button>
        </form>
      </div>
    );
  }
}

export default SignUpOne;
