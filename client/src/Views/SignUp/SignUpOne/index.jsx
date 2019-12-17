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
      <div className="container">
        <h1 className="sign-up-title">Tell us about you</h1>
        <h3 className="sign-up-subtitle">Fill the information below</h3>
        <img
          src="https://icon-library.net/images/baby-icon/baby-icon-14.jpg"
          alt="..."
        />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            type="radio"
            value="expecting"
            name="role"
            onChange={this.handleInputChange}
          />
          Expecting
          <br />
          <input
            type="radio"
            value="gifter"
            name="role"
            onChange={this.handleInputChange}
          />
          Gifter
          <br />
          <input
            type="radio"
            value="parent"
            name="role"
            onChange={this.handleInputChange}
          />
          Parent
          <br />
          <button>Next</button>
        </form>
      </div>
    );
  }
}

export default SignUpOne;

{
  /* <div className='form-check'>
<input
            type="text"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
</div>

<div className="form-check">
  <input className="form-check-input" type="radio" id="exampleRadios1" value="expecting"
            name="role"
            onChange={this.handleInputChange} />
  <label className="form-check-label" for="exampleRadios1">
    Expecting
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" id="exampleRadios2" value="gifter"
            name="role"
            onChange={this.handleInputChange} />
  <label className="form-check-label" for="exampleRadios2">
    Parent
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" id="exampleRadios3" value="parent"
            name="role"
            onChange={this.handleInputChange}
          />
  <label className="form-check-label" for="exampleRadios3">
    Gifter
  </label>
</div> */
}
