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
          <h1 className="sign-up-title">You are amazing!</h1>
          <h2 className="sign-up-subtitle">Tell us more about you.</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="sign-up-3-form">
            <div className="form-group">
              <input
                required
                type="email"
                name="email"
                onChange={this.handleInputChange}
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                required
                type="password"
                name="password"
                onChange={this.handleInputChange}
                placeholder="Password"
                className="form-control"
              />
            </div>
            <div className="form-group" style={{ marginBottom: "2px" }}>
              <input
                required
                type="password"
                name="passwordSecond"
                onChange={this.checkPassword}
                placeholder="Re-Enter Password"
                className="form-control"
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
        <Link to="">Continue as Guest</Link>
      </div>
    );
  }
}

export default SignUpThree;
