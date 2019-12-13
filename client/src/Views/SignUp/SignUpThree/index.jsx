import React, { Component } from 'react';
import { signUp } from './../../../services/user-functions';

export class SignUpThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      address: '',
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    console.log(this.props);
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

  async handleSubmit(event) {
    event.preventDefault();
    //console.log(this.state);
    const name = this.props.userState.name;
    const dueDate = this.props.userState.dueDate;
    const firstPregnancy = this.props.userState.firstPregnancy;
    const role = this.props.userState.role;
    const phoneNumber = this.state.phoneNumber;
    const address = this.state.address;
    const email = this.state.email;
    const password = this.state.password;
    try {
      const newUser = await signUp({
        name,
        dueDate,
        firstPregnancy,
        role,
        phoneNumber,
        address,
        email,
        password
      });
      console.log(newUser);
      //   await this.props.updateUserState({
      //   phoneNumber: this.state.phoneNumber,
      //   address: this.state.address,
      //   email: this.state.email,
      //   password: this.state.password
      // });
    } catch (error) {
      throw error;
    }

    this.props.history.push(`/`); //ATTENTION: Should redirect to profile
  }

  checkPassword(event) {
    const passwordSecond = event.target.value;
    if (this.state.password !== passwordSecond) {
      console.log('Check passwords'); //ATTENTION: Should make a more visibile flag for consumer
    } else {
      console.log('Same passwords'); //ATTENTION: Should make a more visibile flag for consumer
    }
  }

  render() {
    return (
      <div>
        <h1>We are almost Done!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            required
            type="text"
            name="address"
            onChange={this.handleInputChange}
            placeholder="Address"
          />
          <input
            required
            type="text"
            name="phoneNumber"
            onChange={this.handleInputChange}
            placeholder="Phone Number"
          />
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
      </div>
    );
  }
}

export default SignUpThree;
