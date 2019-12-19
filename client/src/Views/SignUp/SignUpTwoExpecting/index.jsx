import React, { Component } from "react";

export class SignUpTwoExpecting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: null,
      firstPregnancy: false
    };
    this.handleDateInputChange = this.handleDateInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkboxToggle = this.checkboxToggle.bind(this);
  }

  handleDateInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  checkboxToggle(event) {
    const firstPregnancy = event.target.checked;
    this.setState({
      firstPregnancy
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateUserState(this.state);
    this.props.history.push(`/sign-up/3`);
  }

  render() {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    return (
      <div className="alingment-center-sign-up container">
        <div className="navbar fixed-top top-navbar">
          <img className="top-nav-logo" src="../../babywishlogo.png" alt="" />
        </div>
        <div>
          <h1 className="sign-up-title">We are so happy for you!</h1>
          <h2 className="sign-up-subtitle">When is your due date?</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div
            className="form-check"
            style={{ paddingLeft: "0px", marginBottom: "1em" }}
          >
            <input
              type="date"
              name="dueDate"
              onChange={this.handleDateInputChange}
              className="form-control"
              min={date}
            />
          </div>
          <div
            className="form-check"
            style={{ paddingLeft: "0px", marginBottom: "10em" }}
          >
            <label class="form-check-label">
              <input
                type="checkbox"
                name="firstPregnancy"
                vale="true"
                onChange={this.checkboxToggle}
                style={{ marginRight: "1em" }}
              />
              First Pregnancy
            </label>
          </div>
          <button className="btn btn-start btn-block">Next</button>
        </form>
      </div>
    );
  }
}

export default SignUpTwoExpecting;
