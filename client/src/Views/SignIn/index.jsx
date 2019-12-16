import React, { Component } from 'react';
import { signIn } from './../../services/user-functions';

import './style.css';

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const user = await signIn({ email, password });
      //console.log(user);
      this.props.addUsertoUserState(user);
      this.props.history.push(`/user/${user._id}`);
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <div className="sign-in-form">
        <h1>Sign In Page</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            name="email"
            placeholder="Email"
            className="form-control"
          />
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            name="password"
            placeholder="Password"
            className="form-control"
          />
          <button className="btn btn-start btn-blockn">Log In</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
