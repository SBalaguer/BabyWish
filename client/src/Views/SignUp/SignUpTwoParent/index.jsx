import React, { Component } from "react";

export class SignUpTwoParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthdayDate: null
    };
    this.handleDateInputChange = this.handleDateInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDateInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.dir(event.target);
    console.log(value);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.props.updateUserState(this.state);
    this.props.history.push(`/sign-up/3`);
  }

  render() {
    return (
      <div>
        <h1>Tell us more!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="date"
            name="birthdayDate"
            onChange={this.handleDateInputChange}
          />
          <button>Next</button>
        </form>
      </div>
    );
  }
}

export default SignUpTwoParent;
