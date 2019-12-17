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
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateUserState(this.state);
    this.props.history.push(`/sign-up/3`);
  }

  render() {
    return (
      <div className="alingment-center-sign-up">
        <div className="navbar fixed-top top-navbar">
          <img className="top-nav-logo" src="../../babywishlogo.png" alt="" />
        </div>
        <div>
          <h1 className="sign-up-title">That is beautiful</h1>
          <h2 className="sign-up-subtitle">When was the baby born?</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-check" style={{ paddingLeft: "0px" }}>
            <input
              type="date"
              name="birthdayDate"
              onChange={this.handleDateInputChange}
              className="form-control"
            />
          </div>
          <button className="btn btn-start btn-block">Next</button>
        </form>
      </div>
    );
  }
}

export default SignUpTwoParent;
