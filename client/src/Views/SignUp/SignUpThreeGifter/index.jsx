import React, { Component } from "react";
import { signUp } from "./../../../services/user-functions";
import { Link } from "react-router-dom";

export class SignUpThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      address: "",
      email: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const name = this.props.userState.name;
    const role = this.props.userState.role;
    const email = this.state.email;
    const password = this.state.password;
    try {
      const newUser = await signUp({
        name,
        role,
        email,
        password
      });
      this.props.addUsertoUserState(newUser);
      this.props.history.push(`/`); //ATTENTION: Should redirect to profile
      //console.log(newUser);
    } catch (error) {
      throw error;
    }
  }

  checkPassword(event) {
    const passwordSecond = event.target.value;
    if (this.state.password !== passwordSecond) {
      console.log("Check passwords"); //ATTENTION: Should make a more visibile flag for consumer
    } else {
      console.log("Same passwords"); //ATTENTION: Should make a more visibile flag for consumer
    }
  }

  render() {
    return (
      <div>
        <h1>We are almost Done!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            required
            type="email"
            name="email"
            onChange={this.handleInputChange}
            placeholder="Email"
          />
          <input
            required
            type="password"
            name="password"
            onChange={this.handleInputChange}
            placeholder="Password"
          />
          <input
            required
            type="password"
            name="passwordSecond"
            onChange={this.checkPassword}
            placeholder="Re-Enter Password"
          />
          <button>Next</button>
        </form>
        <Link to="">Continue as Guest</Link>
      </div>
    );
  }
}

export default SignUpThree;
