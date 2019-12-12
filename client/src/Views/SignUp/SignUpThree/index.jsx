import React, { Component } from "react";

export class SignUpThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      address: "",
      email: "",
      password: "",
      passwordSecond: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    // console.dir(event.target);
    // console.log(value);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    //console.log(this.state);
    this.props.updateUserState({
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      email: this.state.email,
      password: this.state.password
    });
    this.props.history.push(`/`); //ATTENTION: Should redirect to profile
  }

  checkPassword() {
    if (this.state.password !== this.state.passwordSecond) {
      console.log("Check passwords"); //ATTENTION: Should make a more visibile flag for consumer
    }
  }

  render() {
    return (
      <div>
        <h1>We are almost Done!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="address"
            onChange={this.handleInputChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="phoneNumber"
            onChange={this.handleInputChange}
            placeholder="Phone Number"
          />
          <input
            type="email"
            name="email"
            onChange={this.handleInputChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={this.handleInputChange}
            placeholder="Password"
          />
          <input
            type="password"
            name="passwordSecond"
            onChange={this.checkPassword}
            placeholder="Re-Enter Password"
          />
          <button>Next</button>
        </form>
      </div>
    );
  }
}

export default SignUpThree;