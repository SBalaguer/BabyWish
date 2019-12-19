import React, { Component } from "react";
import { signUp } from "../../../services/supplier-functions";

export class SupplierSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      iban: "",
      shipFrom: "",
      deliveryEtaInDays: "",
      phoneNumber: "",
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
    const name = this.state.name;
    const iban = this.state.iban;
    const shipFrom = this.state.shipFrom;
    const deliveryEtaInDays = this.state.deliveryEtaInDays;

    const phoneNumber = this.state.phoneNumber;

    const email = this.state.email;
    const password = this.state.password;
    try {
      const newUser = await signUp({
        name,
        iban,
        phoneNumber,
        email,
        password,
        shipFrom,
        deliveryEtaInDays
      });
      //console.log(newUser);
      this.props.addUsertoUserState(newUser);
      this.props.history.push(`/supplier`);
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
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                name="name"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <input
                  type="text"
                  className="form-control"
                  id="iban"
                  placeholder="IBAN"
                  name="iban"
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-4">
                <input
                  type="text"
                  className="form-control"
                  id="shipFrom"
                  placeholder="Shipping From"
                  name="shipFrom"
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-4">
                <input
                  type="number"
                  className="form-control"
                  id="deliveryEtaInDays"
                  placeholder="Delivery ETA in Days"
                  name="deliveryEtaInDays"
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
                type="number"
                className="form-control"
                id="phoneNumber"
                placeholder="Phone Number"
                name="phoneNumber"
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

export default SupplierSignUp;
