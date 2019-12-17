import React, { Component } from "react";
import { signUp } from "./../../../services/user-functions";

import "./style.css";

export class SignUpThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      address: "",
      email: "",
      password: "",
      checkPassword: "hidden"
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
    const dueDate = this.props.userState.dueDate;
    const birthdayDate = this.props.userState.birthdayDate;
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
        password,
        birthdayDate
      });
      this.props.addUsertoUserState(newUser);
      this.props.history.push(`/user/${newUser._id}`);
    } catch (error) {
      throw error;
    }
  }

  checkPassword(event) {
    const passwordSecond = event.target.value;
    if (this.state.password !== passwordSecond) {
      this.setState({
        checkPassword: ""
      });
    } else {
      this.setState({
        checkPassword: "hidden"
      });
    }
  }

  render() {
    return (
      <div className="alingment-center-sign-up">
        <div className="navbar fixed-top top-navbar">
          <img className="top-nav-logo" src="../../babywishlogo.png" alt="" />
        </div>
        <div>
          <h1 className="sign-up-title">Last step!</h1>
          <h2 className="sign-up-subtitle">We are almost there.</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="sign-up-3-form">
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Address"
                  name="address"
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="phone-number"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                name="email"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: "2px" }}>
              <input
                type="password"
                className={"form-control "}
                id="password2"
                placeholder="Re-enter Password"
                name="passwordSecond"
                onChange={this.checkPassword}
                required
              />
            </div>
            <small
              className={"form-text " + this.state.checkPassword}
              id="forg-pass"
            >
              Make sure both passwords match!
            </small>
            <button className="btn btn-start btn-block">Welcome!</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpThree;

{
  /* <form></form>; */
}

{
  /* <input
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
          <button>Next</button> */
}
