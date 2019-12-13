import React, { Component } from "react";

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
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
    //CHECK IN HERE IN OUR DB IF THERE IS A USER WITH THAT EMAIL AND PASSWORD
    //THEN UPDATE THE STATE WITH THE USER OBJECT IN APP USING PROPS
  }

  render() {
    return (
      <div>
        <h1>Sign In Page</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            name="email"
            placeholder="Email"
          />
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            name="password"
            placeholder="Password"
          />
          <button>Log In</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
