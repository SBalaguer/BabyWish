import React, { Component } from "react";

import "./style.css";

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
      <div className="alingment-center-sign-up">
        <div className="navbar fixed-top top-navbar">
          <img className="top-nav-logo" src="../../babywishlogo.png" alt="" />
        </div>
        <div>
          <h1 className="sign-up-title">Welcome!</h1>
          <h2 className="sign-up-subtitle">Please tell us a bit about you</h2>
        </div>
        <div className="profile-pic-container">
          <img
            className="profile-pic"
            src="../../default-profile-pic.png"
            alt="..."
          />
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-check" style={{ paddingLeft: "0px" }}>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="exampleRadios1"
              value="expecting"
              name="role"
              onChange={this.handleInputChange}
            />
            <label className="form-check-label" htmlFor="exampleRadios1">
              Expecting
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="exampleRadios2"
              value="parent"
              name="role"
              onChange={this.handleInputChange}
            />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Parent
            </label>
          </div>
          <div className="form-check" style={{ marginBottom: "3em" }}>
            <input
              className="form-check-input"
              type="radio"
              id="exampleRadios3"
              value="gifter"
              name="role"
              onChange={this.handleInputChange}
            />
            <label className="form-check-label" htmlFor="exampleRadios3">
              Gifter
            </label>
          </div>
          <button className="btn btn-start btn-block">Next</button>
        </form>
      </div>
    );
  }
}

export default SignUpOne;
